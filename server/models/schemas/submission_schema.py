# schemas/submission_schema.py
from app import ma
from models.submission import Submission

class SubmissionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Submission
        load_instance = True

    id = ma.auto_field()
    assessment_id = ma.auto_field()
    student_id = ma.auto_field()
    submitted_at = ma.auto_field()
    answers = ma.auto_field()
    score = ma.auto_field()
    graded_by = ma.auto_field()
    remarks = ma.auto_field()

submission_schema = SubmissionSchema()
submissions_schema = SubmissionSchema(many=True)
