#!/usr/bin/env python3
from flask import Flask, make_response, request
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from marshmallow import ValidationError
from datetime import timedelta


from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
CORS(app)
api = Api(app)

# import routes
from routes.auth_routes import SchoolOwnerRegister, AdminCreateEducator, AdminCreateStudent, Login, ChangePassword, UserProfile
from schemas import SchoolOwnerRegistrationSchema, StudentCreationSchema, EducatorCreationSchema, LoginSchema, ChangePasswordSchema, UserProfileResponseSchema, AuthResponseSchema, UserCreationResponseSchema

# import models
from models import *



# Initialize schemas
school_owner_schema = SchoolOwnerRegistrationSchema()
student_creation_schema = StudentCreationSchema()
educator_creation_schema = EducatorCreationSchema()
login_schema = LoginSchema()
change_password_schema = ChangePasswordSchema()
user_profile_schema = UserProfileResponseSchema()
auth_response_schema = AuthResponseSchema()
user_creation_response_schema = UserCreationResponseSchema()


# Enhanced Resource classes with validation
class ValidatedSchoolOwnerRegister(SchoolOwnerRegister):
    def post(self):
        try:
            # Validate input data
            data = school_owner_schema.load(request.get_json())
            
            # Set the validated data in request for parent class
            request.validated_data = data
            
            # Call parent method
            response = super().post()
            return response
            
        except ValidationError as err:
            return {"error": "Validation failed", "messages": err.messages}, 400
        except Exception as e:
            return {"error": str(e)}, 500

class ValidatedAdminCreateStudent(AdminCreateStudent):
    @jwt_required()
    def post(self):
        try:
            # Validate input data
            data = student_creation_schema.load(request.get_json())
            
            # Set the validated data in request for parent class
            request.validated_data = data
            
            # Call parent method with validated data
            response = super().post()
            return response
            
        except ValidationError as err:
            return {"error": "Validation failed", "messages": err.messages}, 400
        except Exception as e:
            return {"error": str(e)}, 500

class ValidatedAdminCreateEducator(AdminCreateEducator):
    @jwt_required()
    def post(self):
        try:
            # Validate input data
            data = educator_creation_schema.load(request.get_json())
            
            # Set the validated data in request for parent class
            request.validated_data = data
            
            # Call parent method
            response = super().post()
            return response
            
        except ValidationError as err:
            return {"error": "Validation failed", "messages": err.messages}, 400
        except Exception as e:
            return {"error": str(e)}, 500

class ValidatedLogin(Login):
    def post(self):
        try:
            # Validate input data
            data = login_schema.load(request.get_json())
            
            # Set the validated data in request for parent class
            request.validated_data = data
            
            # Call parent method
            response = super().post()
            return response
            
        except ValidationError as err:
            return {"error": "Validation failed", "messages": err.messages}, 400
        except Exception as e:
            return {"error": str(e)}, 500

class ValidatedChangePassword(ChangePassword):
    @jwt_required()
    def post(self):
        try:
            # Validate input data
            data = change_password_schema.load(request.get_json())
            
            # Set the validated data in request for parent class
            request.validated_data = data
            
            # Call parent method
            response = super().post()
            return response
            
        except ValidationError as err:
            return {"error": "Validation failed", "messages": err.messages}, 400
        except Exception as e:
            return {"error": str(e)}, 500



# define your resource class
class Home(Resource):
    def get(self):
        return make_response({"message": "Welcome to the Shuleni API"}, 200)

# register the route
api.add_resource(Home, '/api/home', endpoint='home')
