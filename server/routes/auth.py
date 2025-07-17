from flask import request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_restful import Resource
from models import User, Student, Teacher, School
from app import db, bcrypt
from datetime import datetime, timezone


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
        
        
        
        