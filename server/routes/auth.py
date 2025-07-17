from flask import request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_restful import Resource
from models import User, Student, Teacher, School
from app import db, bcrypt
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
            
        password_hashed = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        
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
            password_hash=password_hashed,
            role='owner',
            school_id=school.id,
            created_at=datetime.now(timezone.utc)
        )
        
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
        password_hashed = bcrypt.generate_password_hash(temp_password).decode('utf-8')
        
        # Create user account
        user = User(
            full_name=data['full_name'],
            email=f"{data['admission_number']}@temp.school",  # Temporary email
            password_hash=password_hashed,
            role='student',
            school_id=current_user['school_id'],
            created_at=datetime.now(timezone.utc)
        )
        
        db.session.add(user)
        db.session.flush()
        
        # Create student profile
        student = Student(
            user_id=user.id,
            school_id=current_user['school_id'],
            admission_number=data['admission_number'],
            class_id=data.get('class_id'),
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
        password_hashed = bcrypt.generate_password_hash(temp_password).decode('utf-8')
        
        # Create user account
        user = User(
            full_name=data['full_name'],
            email=data['school_email'],
            password_hash=password_hashed,
            role='educator',
            school_id=current_user['school_id'],
            created_at=datetime.now(timezone.utc)
        )
        
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



