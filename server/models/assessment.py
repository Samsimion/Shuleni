from app import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone



class Assessment(db.Model, SerializerMixin):
    __tablename__ = 'assessments'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    type = db.Column(db.Enum('quiz', 'exam', 'assignment', 'cats', name='assessment_type'), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    duration_minutes = db.Column(db.Integer)
    start_time = db.Column(db.DateTime)
    questions = db.Column(db.dialects.postgresql.JSONB, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    class_ = db.relationship('Class', back_populates='assessments')
    creator = db.relationship('User', back_populates='assessments_created')
    submissions = db.relationship('Submission', back_populates='assessment')

    serialize_rules = ('-class_.assessments', '-creator.assessments_created', '-submissions.assessment')