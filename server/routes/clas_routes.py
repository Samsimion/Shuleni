from flask import Flask,request,make_response, Response
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_restful import Api,Resource
from app import app,db,api,ma
from sqlalchemy import func, desc
import csv
import io
from models import Class

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
    def get(self):
        try:
            query =Class.query.all()
            response = make_response(
                classes_schema.dump(query)
            )
            return response



        except Exception as e:
            return make_response({"error":str(e)}, 500)
        

    def post(self):
        try:

            data =request.get_json()
            new_class = Class(
                name = data["name"],
                school_id = data["school_id"],
                created_by = data["created_by"]
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
    def get(self,id):
        clas = Class.query.filter(Class.id==id).first()
        if not clas:
            return make_response({"error":"Classs record not found"},404)
        response = make_response(
            class_schema.dump(clas),
            200,
        )
        return response
    
    def patch(self,id):
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