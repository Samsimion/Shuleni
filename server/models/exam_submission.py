from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from sqlalchemy.dialects.postgresql import JSONB



class ExamSubmission (db.Model, SerializerMixin):
    __tablename__ = 'exam_submissions'
    id = db.Column(db.Integer, primary_key=True)
    exam_id = db.Column(db.Integer, db.ForeignKey('exams.id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    answers = db.Column(JSONB, nullable=False)
    score = db.Column(db.Float)
    submitted_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
