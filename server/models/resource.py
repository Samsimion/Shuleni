from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone


class Resource(db.Model, SerializerMixin):
    __tablename__ = 'resources'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    type = db.Colum(db.Enum('files', 'video'))
    file_url = db.Column(db.String(255), nullable=False)
    uploaded_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    uploader = db.relationship('User', back_populates='uploaded_resources')
    class_ = db.relationship('Class', back_populates='resources')

    serialize_rules = ('-uploader.uploaded_resources', '-class_.resources',)
