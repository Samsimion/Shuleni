#!/usr/bin/env python3
from flask import Flask, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow

from routes import SchoolListResource, SchoolResource

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

# import models
from models import *

# define your resource class
class Home(Resource):
    def get(self):
        return make_response({"message": "Welcome to the Shuleni API"}, 200)

# register the route
api.add_resource(Home, '/api/home', endpoint='home')
api.add_resource(SchoolListResource/ "/schools")
api.add_resource(SchoolResource, "/schools/<int:id>")
