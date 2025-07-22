from flask_restful import Resource
from flask import request
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import auto_field
from models.school import School, db


ma = Marshmallow()

class SchoolSchema(ma.SQLAlchemySchema):
    class Meta:
        model = School
        load_instance = True

    id = ma.auto_field()
    name = auto_field()
    description = auto_field()
    created_at = auto_field()
    owner_id = auto_field()

school_schema = SchoolSchema()  
schools_schema = SchoolSchema(many=True)  

class SchoolListResource(Resource):
    def get(self):
        schools = School.query.all()
        return schools_schema.dump(schools), 200

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

class SchoolResource(Resource):
    def get(self, id):
        school= School.query.get(id)
        if not school:
            return {"error": "School not found"}, 404
        return school_schema.dump(school), 200 

    def patch(self, id):
        school = School.query.get(id)
        if not school:
            return {"error": "School not found"}, 404

        data = request.get_json()
        if "name" in data:
            school.name = data["name"]
        if "description" in data:
            school.description = data["description"] 
        if "owner_id" in data:
            school.owner_id = data["owner_id"]

        db.session.commit()
        return school_schema.dump(school), 200  
               


