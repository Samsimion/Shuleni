from app import db
from datetime import timezone, datetime
from sqlalchemy_serializer import SerializerMixin



class School(db.Model, SerializerMixin):
    __tablename__ = 'schools'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    #owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    

    users = db.relationship('User', back_populates='school', cascade='all, delete-orphan')
    classes = db.relationship('Class', back_populates='school', cascade='all, delete-orphan')
    

    serialize_rules = ('-users.school', '-classes.school',)


    def __repr__(self):
       return f"<School id={self.id} name='{self.name}' owner_id={self.owner_id}>"
