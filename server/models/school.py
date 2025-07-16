from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
from datetime import timezone, datetime
from sqlalchemy_serializer import SerializerMixin


class School(db.Model, SerializerMixin):
    __tablename__ = 'schools'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    users = db.relationship('SchoolUser', back_populates='school', cascade="all, delete-orphan")
    classes = db.relationship('Class', back_populates='school', cascade="all, delete-orphan")
