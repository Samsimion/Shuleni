from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone


class User(db.Model, SerializerMixin):
    __tablename__= "users"
    id= db.Column(db.Integer, primary_key = True)
    email= db.Column(db.String,nullable = False, unique=True)
    name = db.Column(db.String, nullale=False)
    password_hash=db.Column(db.String,nullable =False )
    role = db.Column(db.String, nullable =False)
    school_id = db.Column(db.Integer, )
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))


    schools = db.relationship('SchoolUser', backref='user', cascade="all, delete-orphan")
    class_memberships = db.relationship('ClassMember', backref='user', cascade="all, delete-orphan")
    uploaded_resources = db.relationship('Resource', backref='uploader')
    submitted_attendance = db.relationship('AttendanceRecord', backref='student', foreign_keys='AttendanceRecord.student_id')
    taken_attendance = db.relationship('AttendanceRecord', backref='teacher', foreign_keys='AttendanceRecord.teacher_id')
    created_exams = db.relationship('Exam', backref='creator', foreign_keys='Exam.created_by')
    exam_submissions = db.relationship('ExamSubmission', backref='student')
    messages_sent = db.relationship('Chat', backref='sender')


