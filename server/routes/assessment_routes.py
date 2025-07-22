# routes/assessment_routes.py
from flask_restful import Resource
from flask import request, make_response
from models.assessment import Assessment, db
from models.schemas.assessment_schema import assessment_schema, assessments_schema

class Assessments(Resource):
    def get(self):
        assessments = Assessment.query.all()
        return make_response(assessments_schema.dump(assessments), 200)

    def post(self):
        data = request.get_json()
        new = Assessment(**data)
        db.session.add(new)
        db.session.commit()
        return make_response(assessment_schema.dump(new), 201)

class AssessmentByID(Resource):
    def get(self, id):
        assessment = Assessment.query.get_or_404(id)
        return make_response(assessment_schema.dump(assessment), 200)

    def patch(self, id):
        assessment = Assessment.query.get_or_404(id)
        data = request.get_json()
        for attr, val in data.items():
            setattr(assessment, attr, val)
        db.session.commit()
        return make_response(assessment_schema.dump(assessment), 200)

    def delete(self, id):
        assessment = Assessment.query.get_or_404(id)
        db.session.delete(assessment)
        db.session.commit()
        return make_response({"message": "Assessment deleted"}, 200)

