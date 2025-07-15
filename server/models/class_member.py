from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
from datetime import datetime, timezone
from sqlalchemy_serializer import SerializerMixin






class ClassMember(db.Model):
    __tablename__ = 'class_members'
    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)