from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone


class Student(db.Model, SerializerMixin):
    __tablename__= "students"
    id= db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullale=False)
    school_id = db.Column(db.Integer, )
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    class_id = db.Column(db.Integer , db.ForeignKey("classes.id"))

