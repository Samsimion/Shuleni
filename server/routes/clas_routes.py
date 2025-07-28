from flask import Flask,request,make_response, Response
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_restful import Api,Resource
from app import app,db,api,ma
from sqlalchemy import func, desc
from flask import jsonify
import csv
import io
from models import Class,User, ClassMember,Student 
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

migrate = Migrate(app,db)

class ClassSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Class
        load_instance =True

    id = ma.auto_field()
    name = ma.auto_field()
    school_id = ma.auto_field()
    created_by = ma.auto_field()
    created_at = ma.auto_field()


    url = ma.Hyperlinks(
        {
            "self": ma.URLFor("class_detail", values=dict(id="<id>")),
            "collection": ma.URLFor("class_list"),
        }
    )

class_schema = ClassSchema()
classes_schema= ClassSchema(many=True)

class Index2(Resource):
    def get(self):
        response_dict = {
            "index":"welcome to class api"
        }

        response = make_response(
            response_dict,
            200
        )
        return response
    
api.add_resource(Index2, "/another")

class ClassList(Resource):
    @jwt_required()
    def get(self):
        current_user = json.loads(get_jwt_identity())
        if current_user["role"] not in ["owner", "educator"]:
            return {"error": "unauthorised"}, 403
        try:
            query =Class.query

            school_id = request.args.get("school_id", type=int)
            total_students = None
            if school_id:
                query = query.filter_by(school_id=school_id)
                total_students = db.session.query(Student).join(Class).filter(Class.school_id == school_id).count()

            created_by = request.args.get("created_by", type=int)
            if created_by:
                query = query.filter_by(created_by=created_by)

            class_name = request.args.get("name")
            if class_name:
                query = query.filter(Class.name.ilike(f"%{class_name}%"))

            results = query.all()

            response_data = {
                "classes": classes_schema.dump(results),
                "total_students": total_students
            }
            response = make_response(response_data, 200)
            return response



        except Exception as e:
            return make_response({"error":str(e)}, 500)
        
    @jwt_required()
    def post(self):
        current_user = json.loads(get_jwt_identity())
        if current_user["role"] not in ["owner", "educator"]:
            return {"error": "unauthorised"}, 403
        try:

            data =request.get_json()
            new_class = Class(
                name = data["name"],
                school_id = data["school_id"],
                created_by = current_user["id"]
            )
            db.session.add(new_class)
            db.session.commit()
            response = make_response(
                class_schema.dump(new_class),
                201,
            )
            return response
        except KeyError as e:
            return make_response({"error": f"Missing field:{str(e)}"}, 400)
        except Exception as e:
            return make_response({"error":str(e)},500)

        
api.add_resource(ClassList,"/classes")


class ClassById(Resource):
    @jwt_required()
    def get(self,id):
        current_user = json.loads(get_jwt_identity())
        if current_user["role"] not in ["owner", "educator"]:
            return {"error": "unauthorised"}, 403
        clas = Class.query.filter(Class.id==id).first()
        if not clas:
            return make_response({"error":"Classs record not found"},404)
        response = make_response(
            class_schema.dump(clas),
            200,
        )
        return response
    @jwt_required()
    def patch(self,id):
        current_user = json.loads(get_jwt_identity())
        if current_user["role"] not in ["owner", "educator"]:
            return {"error": "unauthorised"}, 403
        
        data=request.get_json()
        patch_class = Class.query.filter(Class.id==id).first()
        if not patch_class:
            return make_response({"error":"Class record not found"},404)
        for attr,value in data.items():
            setattr(patch_class, attr,value)
        db.session.add(patch_class)
        db.session.commit()

        response= make_response(
            class_schema.dump(patch_class),
            200,
        )
        return response
    @jwt_required()
    def delete(self,id):
        record = Class.query.filter(Class.id==id).first()
        if not record:
            return make_response({"error":"Class record not found"})
        db.session.delete(record)
        db.session.commit()

        response_dict= {"message":"class record has een deleted succesfully"}
        response= make_response(
            response_dict,
            200
        )
        return response
    
api.add_resource(ClassById, "/classes/<int:id>")