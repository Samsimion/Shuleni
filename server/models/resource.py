from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
from sqlalchemy_serializer import SerializerMixin
from datetime import timezone, datetime

class Resource(db.Model, SerializerMixin):
    __tablename__ = 'resources'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    file_url = db.Column(db.String(255), nullable=False)
    uploaded_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'), nullable=False)
    type = db.Column(db.String(50))  # e.g., 'pdf', 'video', etc.
    uploaded_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
