

from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column('password_hash', db.String(255), nullable=False)
    role = db.Column(db.Enum('owner', 'educator', 'student', name='user_roles'), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))


    school = db.relationship('School', back_populates='users')
    

    class_memberships = db.relationship('ClassMember', back_populates='user', cascade='all, delete-orphan')
    attendances = db.relationship('Attendance', back_populates='student', foreign_keys='Attendance.student_id')
    marked_attendance = db.relationship('Attendance', back_populates='educator', foreign_keys='Attendance.educator_id')
    uploaded_resources = db.relationship('Resource', back_populates='uploader')
    assessments_created = db.relationship('Assessment', back_populates='creator')
    submissions = db.relationship('Submission', back_populates='student', foreign_keys='Submission.student_id')
    graded_submissions = db.relationship(
    'Submission',
    back_populates='grader',
    foreign_keys='Submission.graded_by'
)
    student_profile = db.relationship("Student", back_populates="user", uselist=False)
    
    messages = db.relationship('Chat', back_populates='sender')

    serialize_rules = ('-password_hash', '-school.users', '-class_memberships.user', '-attendances.student', '-marked_attendance.educator')
    
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hash may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        hashed_password = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = hashed_password.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))


    def __repr__(self):
        return f"<User id={self.id} name='{self.full_name}' role={self.role} school_id={self.school_id}>"
    
from app import db, bcrypt
