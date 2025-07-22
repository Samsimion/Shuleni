from extensions import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone



class Submission(db.Model, SerializerMixin):
    __tablename__ = 'submissions'

    id = db.Column(db.Integer, primary_key=True)
    
    assessment_id = db.Column(db.Integer, db.ForeignKey('assessments.id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    submitted_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    answers = db.Column(db.dialects.postgresql.JSONB, nullable=False)
    score = db.Column(db.Float)
    graded_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    remarks = db.Column(db.Text)

    assessment = db.relationship('Assessment', back_populates='submissions')
    student = db.relationship('User',  foreign_keys=[student_id],back_populates='submissions')
    grader = db.relationship(
    'User',
    back_populates='graded_submissions',
    foreign_keys=[graded_by],
    overlaps="graded_submissions",
)



    serialize_rules = ('-assessment.submissions', '-student.submissions',)

    def __repr__(self):
       return f"<Submission id={self.id} assessment_id={self.assessment_id} student_id={self.student_id} score={self.score}>"
