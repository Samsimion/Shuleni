from flask import request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_restful import Resource
from models import User, Student, Teacher, School
from extensions import db, bcrypt
from datetime import datetime, timezone
import secrets
import string


class SchoolOwnerRegister(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        
        if User.query.filter( User.email==email ).first():
            return {"error": "Email already exists"}, 409
        
        required_fields = ['full_name', 'email', 'password', 'school_name']
        for field in required_fields:
            if not data.get(field):
                return {"error": f"{field} cannot be empty"}, 400
            
        # password_hashed = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        
        # Create school first
        school = School(
            name=data['school_name'],
            description=data.get('description', ''),
            created_at=datetime.now(timezone.utc)
        )
        db.session.add(school)
        db.session.flush()  # Get school ID
        
       
        # Create owner user
        user = User(
            email=data['email'],
            full_name=data['full_name'],
            # password_hash=data['password'],
            role='owner',
            school_id=school.id,
            created_at=datetime.now(timezone.utc)
        )
        user.password_hash = data['password']
        
        # Update school owner_id
        school.owner_id = user.id
        
        db.session.add(user)
        db.session.commit()
        
        return {"message": "School and owner created successfully"}, 201
    


class AdminCreateStudent(Resource):
    """Admin creates student accounts"""
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        
        # Only owners can create students
        if current_user['role'] != 'owner':
            return {"error": "Unauthorized"}, 403
            
        data = request.get_json()
        
        required_fields = ['full_name', 'admission_number']
        for field in required_fields:
            if not data.get(field):
                return {"error": f"{field} cannot be empty"}, 400
        
        # Check if admission number already exists in this school
        existing_student = Student.query.filter_by(
            admission_number=data['admission_number'],
            school_id=current_user['school_id']
        ).first()
        
        if existing_student:
            return {"error": "Admission number already exists"}, 409
        
        # Generate temporary password
        temp_password = self.generate_temp_password()
        # password_hashed = bcrypt.generate_password_hash(temp_password).decode('utf-8')
        
        # Create user account
        user = User(
            full_name=data['full_name'],
            email=f"{data['admission_number']}@temp.school",  # Temporary email
            # password_hash=temp_password,
            role='student',
            school_id=current_user['school_id'],
            created_at=datetime.now(timezone.utc)
        )
        user.password_hash = temp_password
       
        db.session.add(user)
        db.session.flush()
        
        # Create student profile
        student = Student(
            user_id=user.id,
            school_id=current_user['school_id'],
            admission_number=data['admission_number'],
            grade=data['grade'], # Optional - can be None initially
            class_id=data.get('class_id'), # Optional - can be None initially
            created_at=datetime.now(timezone.utc)
        )
        
        db.session.add(student)
        db.session.commit()
        
        return {
            "message": "Student created successfully",
            "admission_number": data['admission_number'],
            "temporary_password": temp_password,
            "student_id": student.id
        }, 201
    
    def generate_temp_password(self):
        """Generate a secure temporary password"""
        length = 8
        characters = string.ascii_letters + string.digits
        return ''.join(secrets.choice(characters) for _ in range(length))
    
    

class AdminCreateEducator(Resource):
    """Admin creates educator accounts"""
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        
        # Only owners can create educators
        if current_user['role'] != 'owner':
            return {"error": "Unauthorized"}, 403
            
        data = request.get_json()
        
        required_fields = ['full_name', 'school_email', 'tsc_number']
        for field in required_fields:
            if not data.get(field):
                return {"error": f"{field} cannot be empty"}, 400
        
        # Check if email already exists
        if User.query.filter_by(email=data['school_email']).first():
            return {"error": "Email already exists"}, 409
        
        # Generate temporary password
        temp_password = self.generate_temp_password()
        # password_hashed = bcrypt.generate_password_hash(temp_password).decode('utf-8')
        
        # Create user account
        user = User(
            full_name=data['full_name'],
            email=data['school_email'],
            # password_hash=temp_password,
            role='educator',
            school_id=current_user['school_id'],
            created_at=datetime.now(timezone.utc)
        )
        user.password_hash = temp_password
        
        db.session.add(user)
        db.session.flush()
        
        # Create teacher profile
        teacher = Teacher(
            name=data['full_name'],
            user_id=user.id,
            school_id=current_user['school_id'],
            tsc_number=data['tsc_number'],
            class_id=data.get('class_id'),
            created_at=datetime.now(timezone.utc)
        )
        
        db.session.add(teacher)
        db.session.commit()
        
        return {
            "message": "Educator created successfully",
            "school_email": data['school_email'],
            "temporary_password": temp_password,
            "teacher_id": teacher.id
        }, 201
    
    def generate_temp_password(self):
        """Generate a secure temporary password"""
        length = 8
        characters = string.ascii_letters + string.digits
        return ''.join(secrets.choice(characters) for _ in range(length))



class Login(Resource):
    """Universal login for all user types"""
    def post(self):
        data = request.get_json()
        username = data.get('username')  # Can be email or admission_number
        password = data.get('password')
        
        if not username or not password:
            return {"error": "Username and password are required"}, 400
        
        user = None
        
        # Try to find user by email first (for owners and educators)
        user = User.query.filter_by(email=username).first()
       
        # If not found by email, try by admission number (for students)
        if not user:
            student = Student.query.filter_by(admission_number=username).first()
            if student:
                print("Found student:", student)
                print("Student.user:", student.user)
                user = student.user
        
        if user and user.authenticate(password):
            # Create additional identity info based on role
            identity = {
                "id": user.id,
                "role": user.role,
                "school_id": user.school_id,
                "full_name": user.full_name
            }
            
            # Add role-specific info
            if user.role == 'student':
                identity["admission_number"] = user.student_profile.admission_number
            elif user.role == 'educator':
                identity["school_email"] = user.email
                
            token = create_access_token(identity=identity)
            
            return {
                'token': token,
                'role': user.role,
                'full_name': user.full_name,
                'id': user.id,
                'school_id': user.school_id,
                'email': user.email if user.role != 'student' else None,
                'admission_number': user.student_profile.admission_number if user.role == 'student' else None
            }, 200
        
        return {'error': 'Invalid credentials'}, 401


class ChangePassword(Resource):
    """Allow users to change their password after first login"""
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        data = request.get_json()
        
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        
        if not old_password or not new_password:
            return {"error": "Old password and new password are required"}, 400
        
        user = User.query.get(current_user['id'])
        if not user:
            return {"error": "User not found"}, 404
        
        if not user.authenticate(old_password):
            return {"error": "Invalid old password"}, 401
        
        # Hash new password
        # new_password_hashed = bcrypt.generate_password_hash(new_password).decode('utf-8')
        user.password_hash = new_password
        
        db.session.commit()
        
        return {"message": "Password changed successfully"}, 200

class UserProfile(Resource):
    """Get current user profile"""
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        
        user = User.query.get(current_user['id'])
        if not user:
            return {"error": "User not found"}, 404
        
        profile_data = {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role,
            "school_id": user.school_id,
            "created_at": user.created_at.isoformat()
        }
        
        # Add role-specific data
        if user.role == 'student' and user.student_profile:
            profile_data.update({
                'admission_number': getattr(user.student_profile, 'admission_number', None) if user.role == 'student' else None,
                "grade": user.student_profile.grade,
                "class_id": user.student_profile.class_id
            })
        elif user.role == 'educator' and user.teacher_profile:
            profile_data.update({
                "tsc_number": user.teacher_profile.tsc_number,
                "class_id": user.teacher_profile.class_id
            })
        
        return profile_data, 200



        
        
        
        