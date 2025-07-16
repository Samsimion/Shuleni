from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone


class Class(db.Model, SerializerMixin):
    __tablename__ = 'classes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    members = db.relationship('ClassMember', backref='class_', cascade="all, delete-orphan")
    resources = db.relationship('Resource', backref='class_')
    attendance_records = db.relationship('AttendanceRecord', backref='class_')
    exams = db.relationship('Exam', backref='class_')
    chats = db.relationship('Chat', backref='class_')
