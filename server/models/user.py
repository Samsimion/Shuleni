from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('owner', 'educator', 'student', name='user_roles'), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))


    school = db.relationship('School', back_populates='users')
    class_memberships = db.relationship('ClassMember', back_populates='user', cascade='all, delete-orphan')
    attendances = db.relationship('Attendance', back_populates='student', foreign_keys='Attendance.student_id')
    marked_attendance = db.relationship('Attendance', back_populates='educator', foreign_keys='Attendance.educator_id')
    uploaded_resources = db.relationship('Resource', back_populates='uploader')
    assessments_created = db.relationship('Assessment', back_populates='creator')
    submissions = db.relationship('Submission', back_populates='student')
    messages = db.relationship('Chat', back_populates='sender')

    serialize_rules = ('-password_hash', '-school.users', '-class_memberships.user', '-attendances.student', '-marked_attendance.educator')


