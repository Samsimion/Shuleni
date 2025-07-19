from app import app
from extensions import db
from models import School, User, Student, Teacher
from sqlalchemy import text

def seed_data():
    print("🔁 Resetting database...")
    
    # Drop all tables
    db.session.execute(text("DROP TABLE IF EXISTS chats CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS resources CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS messages CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS assessments CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS attendances CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS students CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS teachers CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS users CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS schools CASCADE"))
    db.session.commit()

    owner = User(
        full_name="Samuel Owner",
        email="owner@shuleni.com",
        password_hash=generate_password_hash("password123"),
        role="owner",
        school_id=school.id
    )
    db.session.add(owner)
    db.session.commit()

    # --- Create Educators ---
    print("👨‍🏫 Creating educators...")
    educators = []
    for i in range(1, 3):
        teacher = User(
            full_name=f"Teacher {i}",
            email=f"teacher{i}@shuleni.com",
            password_hash=generate_password_hash("password123"),
            role="educator",
            school_id=school.id
        )
        educators.append(teacher)
    db.session.add_all(educators)
    db.session.commit()

    # --- Create Students ---
    print("👩‍🎓 Creating students...")
    students = []
    for i in range(1, 6):
        student = User(
            full_name=f"Student {i}",
            email=f"student{i}@shuleni.com",
            password_hash=generate_password_hash("password123"),
            role="student",
            school_id=school.id
        )
        students.append(student)
    db.session.add_all(students)
    db.session.commit()

    # --- Create Classes ---
    print("🏫 Creating classes...")
    class_a = Class(name="Form 1A", school_id=school.id, created_by=owner.id)
    class_b = Class(name="Form 2B", school_id=school.id, created_by=owner.id)
    db.session.add_all([class_a, class_b])
    db.session.commit()

    # --- Class Members ---
    print("👥 Adding members to classes...")
    class_members = []

    # Add educators to both classes
    for educator in educators:
        class_members.append(ClassMember(class_id=class_a.id, user_id=educator.id, role_in_class="educator"))
        class_members.append(ClassMember(class_id=class_b.id, user_id=educator.id, role_in_class="educator"))

    # Add half students to class A, half to class B
    for idx, student in enumerate(students):
        target_class = class_a if idx < 3 else class_b
        class_members.append(ClassMember(class_id=target_class.id, user_id=student.id, role_in_class="student"))

    db.session.add_all(class_members)
    db.session.commit()

    # --- Add Resources ---
    print("📚 Uploading resources...")
    res1 = ResourceModel(
        title="Algebra Basics",
        description="Grade 9 math notes",
        type="files",
        file_url="https://example.com/algebra.pdf",
        uploaded_by=educators[0].id,
        class_id=class_a.id
    )
    res2 = ResourceModel(
        title="Photosynthesis Video",
        description="Biology lesson",
        type="video",
        file_url="https://example.com/bio.mp4",
        uploaded_by=educators[1].id,
        class_id=class_b.id
    )
    db.session.add_all([res1, res2])
    db.session.commit()

    # --- Attendance Records ---
    print("📆 Adding attendance...")
    today = date.today()
    attendance_records = []
    for student in students:
        target_class = class_a if student in students[:3] else class_b
        educator = educators[0] if target_class == class_a else educators[1]
        attendance_records.append(
            Attendance(
                class_id=target_class.id,
                student_id=student.id,
                educator_id=educator.id,
                date=today,
                status="present"
            )
        )
    db.session.add_all(attendance_records)
    db.session.commit()

    # --- Assessments ---
    print("📝 Creating assessments...")
    assess1 = Assessment(
        title="Math Quiz 1",
        description="Basic algebra skills",
        type="quiz",
        class_id=class_a.id,
        created_by=educators[0].id,
        duration_minutes=30,
        start_time=datetime.now(timezone.utc) + timedelta(hours=1),
        questions=[
            {"q": "2 + 2 = ?", "choices": [3, 4, 5], "answer": 4},
            {"q": "5 * 3 = ?", "choices": [15, 10, 20], "answer": 15}
        ]
    )
    db.session.add(assess1)
    db.session.commit()

    # --- Submissions ---
    print("✅ Submitting assessment...")
    sub1 = Submission(
        assessment_id=assess1.id,
        student_id=students[0].id,
        submitted_at=datetime.now(timezone.utc),
        answers={"0": 4, "1": 15},
        score=2.0
    )
    db.session.add(sub1)
    db.session.commit()

    # --- Chat Messages ---
    print("💬 Adding chat messages...")
    msg1 = Chat(
        class_id=class_a.id,
        user_id=students[0].id,
        message="Hello everyone!"
    )
    msg2 = Chat(
        class_id=class_a.id,
        user_id=educators[0].id,
        message="Welcome to Form 1A!"
    )
    db.session.add_all([msg1, msg2])
    db.session.commit()

    print("✅ Done seeding Shuleni database!")
