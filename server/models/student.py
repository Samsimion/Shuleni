from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)
    school_id = db.Column(db.Integer, db.ForeignKey("schools.id"), nullable=False)
    admission_number = db.Column(db.String, unique=True)
    grade = db.Column(db.String)
    class_id = db.Column(db.Integer, db.ForeignKey("classes.id"))
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    

    user = db.relationship("User", backref="student_profile", uselist=False)
    class_ = db.relationship("Class", backref="students")  # optional
    school = db.relationship("School", backref="students")  # optional