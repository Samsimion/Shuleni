from flask_restful import Resource
from flask_marshmallow import SQLAchemySchema, auto_field
from models.school import School

class SchoolSchema(ma.SQLAlchemySchema):
    class Meta:
        model = school
        load_instance = True

    id = ma.auto_field()
    name = auto_field()
    description = auto_field()
    created_at = auto_field()
    owner_id = auto_field()
