# routes/submission_routes.py
from flask_restful import Resource
from flask import request, make_response
from models.submission import Submission, db
from schemas.submission_schema import submission_schema, submissions_schema

class Submissions(Resource):
    def get(self):
        submissions = Submission.query.all()
        return make_response(submissions_schema.dump(submissions), 200)

    def post(self):
        data = request.get_json()
        new = Submission(**data)
        db.session.add(new)
        db.session.commit()
        return make_response(submission_schema.dump(new), 201)

class SubmissionByID(Resource):
    def get(self, id):
        submission = Submission.query.get_or_404(id)
        return make_response(submission_schema.dump(submission), 200)

    def patch(self, id):
        submission = Submission.query.get_or_404(id)
        data = request.get_json()
        for attr, val in data.items():
            setattr(submission, attr, val)
        db.session.commit()
        return make_response(submission_schema.dump(submission), 200)

    def delete(self, id):
        submission = Submission.query.get_or_404(id)
        db.session.delete(submission)
        db.session.commit()
        return make_response({"message": "Submission deleted"}, 200)
