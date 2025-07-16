from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
from sqlalchemy_serializer import SerializerMixin


class Attendance(db.Model, SerializerMixin):
    __tablename__ = 'attendance'

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    educator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.Enum('present', 'absent', 'late', 'excused', name='attendance_status'), nullable=False)

    class_ = db.relationship('Class', back_populates='attendance_records')
    student = db.relationship('User', back_populates='attendances', foreign_keys=[student_id])
    educator = db.relationship('User', back_populates='marked_attendance', foreign_keys=[educator_id])

    serialize_rules = ('-class_.attendance_records', '-student.attendances', '-educator.marked_attendance')