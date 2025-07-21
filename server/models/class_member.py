
from extensions import db
from datetime import datetime, timezone
from sqlalchemy_serializer import SerializerMixin




class ClassMember(db.Model, SerializerMixin):
    __tablename__ = 'class_members'

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    role_in_class = db.Column(db.Enum('student', 'educator', name='class_roles'), nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    class_ = db.relationship('Class', back_populates='members')
    user = db.relationship('User', back_populates='class_memberships',cascade='all, delete-orphan', single_parent=True)

    serialize_rules = ('-class_.members', '-user.class_memberships',)

    def __repr__(self):
        return f"<ClassMember id={self.id} user_id={self.user_id} class_id={self.class_id} role={self.role_in_class}>"