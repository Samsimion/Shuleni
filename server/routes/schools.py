from flask_restful import Resource
fromflask import request
from flask_marshmallow import MarshMallow
from marshmallow_sqlalchemy import auto_field
from models.school import School, db


class SchoolSchema(ma.SQLAlchemySchema):
    class Meta:
        model = School
        load_instance = True

    id = ma.auto_field()
    name = auto_field()
    description = auto_field()
    created_at = auto_field()
    owner_id = auto_field()

school_schema = SchoolSchema(many=True)  
single_school_schema = SchoolSchema()  

class SchoolResource(Resource):
    def get(self):
        schools = School.query.all()
        return school_schema.dump(schools), 200

    def post(self):
        data = request.get_json()
        name = data.get("name")
        description = data.get("description")
        owner_id = data.get("owner_id")  

        if not name:
            return {"error": "School name is required"}, 400

        new_school = School(name=name, description=description, owner_id=owner_id)
        db.session.add(new_school)
        db.session.commit()
        return school_schema.dump(new_school), 201      

