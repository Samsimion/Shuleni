from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db

from sqlalchemy_serializer import SerializerMixin


class Exam(db.Model, SerializerMixin):
    __tablename__ = 'exams'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    duration_minutes = db.Column(db.Integer, nullable=False)
    due_date =  db.Column(db.DateTime, nullable=False)

    questions = db.relationship('ExamQuestion', backref='exam')
    submissions = db.relationship('ExamSubmission', backref='exam')
