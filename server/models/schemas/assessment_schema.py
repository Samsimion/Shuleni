# schemas/assessment_schema.py
from app import ma
from models.assessment import Assessment

class AssessmentSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Assessment
        load_instance = True

    id = ma.auto_field()
    title = ma.auto_field()
    description = ma.auto_field()
    type = ma.auto_field()
    class_id = ma.auto_field()
    created_by = ma.auto_field()
    duration_minutes = ma.auto_field()
    start_time = ma.auto_field()
    questions = ma.auto_field()
    created_at = ma.auto_field()

assessment_schema = AssessmentSchema()
assessments_schema = AssessmentSchema(many=True)
