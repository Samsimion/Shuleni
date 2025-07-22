from app import app
from extensions import db
from models import (
    School, User, Student, Teacher, Class, ClassMember,
    Attendance, Chat, ResourceModel, Assessment, Submission
)
from werkzeug.security import generate_password_hash
from sqlalchemy import text
from datetime import date, datetime, timedelta, timezone
import json

def reset_database():
    print("🔁 Resetting database...")
    db.session.execute(text("DROP TABLE IF EXISTS chats CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS resources CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS messages CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS submissions CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS assessments CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS attendances CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS class_members CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS classes CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS students CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS teachers CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS users CASCADE"))
    db.session.execute(text("DROP TABLE IF EXISTS schools CASCADE"))
    db.session.commit()
    db.create_all()

def seed_schools():
    print("🏫 Creating multiple schools...")
    schools_data = [
        {"name": "Shuleni High School", "description": "Premier secondary education institution", "address": "123 Education Avenue, Nairobi"},
        {"name": "Maarifa Academy", "description": "Excellence in science and mathematics", "address": "456 Knowledge Street, Mombasa"},
        {"name": "Elimu Secondary", "description": "Holistic education for all students", "address": "789 Learning Lane, Kisumu"},
        {"name": "Ujuzi Technical School", "description": "Technical and vocational training", "address": "321 Skills Road, Nakuru"}
    ]
    
    schools = []
    for school_data in schools_data:
        school = School(**school_data)
        schools.append(school)
        db.session.add(school)
    db.session.commit()
    return schools

def seed_owners(schools):
    print("👑 Creating school owners...")
    owners = []
    owner_names = ["Samuel Mbugua", "Grace Wanjiku", "David Otieno", "Mary Achieng"]
    
    for i, (school, name) in enumerate(zip(schools, owner_names)):
        owner = User(
            full_name=name,
            email=f"owner{i+1}@{school.name.lower().replace(' ', '')}.edu",
            _password_hash="owner123",
            role="owner",
            school_id=school.id
        )
        owners.append(owner)
        db.session.add(owner)
    db.session.commit()
    return owners

def seed_educators(schools):
    print("👨‍🏫 Creating educators...")
    educators = []
    educator_subjects = [
        ("Mathematics", "Science"), ("English", "Literature"), ("Physics", "Chemistry"),
        ("Biology", "Agriculture"), ("History", "Geography"), ("Computer Science", "ICT"),
        ("Kiswahili", "French"), ("Business Studies", "Economics"), ("Art", "Music"),
        ("Physical Education", "Life Skills")
    ]
    
    educator_names = [
        "John Kamau", "Alice Nyong'o", "Peter Mwangi", "Ruth Chebet", "Michael Odhiambo",
        "Sarah Wangari", "James Kiprop", "Catherine Muthoni", "Robert Njuguna", "Elizabeth Auma",
        "Daniel Kiprotich", "Patricia Wambui", "Anthony Ochieng", "Margaret Njeri", "Francis Mutua"
    ]

    for i, school in enumerate(schools):
        # Create 4-5 educators per school
        school_educators = []
        start_idx = i * 4
        for j in range(4):
            if start_idx + j < len(educator_names):
                name = educator_names[start_idx + j]
                subjects = educator_subjects[j % len(educator_subjects)]
                
                educator = User(
                    full_name=name,
                    email=f"{name.lower().replace(' ', '.')}@{school.name.lower().replace(' ', '')}.edu",
                    _password_hash="teacher123",
                    role="educator",
                    school_id=school.id
                )
                school_educators.append(educator)
                educators.append(educator)
        
        db.session.add_all(school_educators)
    db.session.commit()

    print("👩‍🎓 Creating students...")
    
    classes = []
    form_levels = ["Form 1", "Form 2", "Form 3", "Form 4"]
    class_streams = ["A", "B", "C"]
    
    for school in schools:
        school_classes = []
        owner = next(owner for owner in owners if owner.school_id == school.id)
        
        for form in form_levels[:3]:
            for stream in class_streams[:2]:
                class_name = f"{form}{stream}"
                class_obj = Class(
                    name=class_name,
                    school_id=school.id,
                    created_by=owner.id
                )
                school_classes.append(class_obj)
                classes.append(class_obj)
        
        db.session.add_all(school_classes)
    db.session.commit()
    return classes

def seed_class_members(schools, educators, students, classes):
    print("👥 Assigning class members...")
    class_members = []
    
    school_groups = {}
    for school in schools:
        school_students = [s for s in students if s.school_id == school.id]
        school_educators = [e for e in educators if e.school_id == school.id]
        school_classes = [c for c in classes if c.school_id == school.id]
        school_groups[school.id] = {
            'students': school_students,
            'educators': school_educators,
            'classes': school_classes
        }

    for school_id, group in school_groups.items():
        students_per_class = len(group['students']) // len(group['classes'])
        
        for i, class_obj in enumerate(group['classes']):
            
            for j in range(2):
                educator_idx = (i * 2 + j) % len(group['educators'])
                educator = group['educators'][educator_idx]
                
                class_member = ClassMember(
                    class_id=class_obj.id,
                    user_id=educator.id,
                    role_in_class="educator"
                )
                class_members.append(class_member)
        
        for i, student in enumerate(group['students']):
            class_idx = i // students_per_class
            if class_idx >= len(group['classes']):
                class_idx = len(group['classes']) - 1
            
            class_obj = group['classes'][class_idx]
            class_member = ClassMember(
                class_id=class_obj.id,
                user_id=student.id,
                role_in_class="student"
            )
            class_members.append(class_member)

    db.session.add_all(class_members)
    db.session.commit()
    return class_members
        "Brian", "Faith", "Kevin", "Grace", "Victor", "Joy", "Dennis", "Mercy", "Collins", "Sharon",
        "Vincent", "Esther", "Emmanuel", "Hellen", "Felix", "Joan", "Gilbert", "Lucy", "Harrison", "Nancy",
        "Ian", "Rose", "Julius", "Vivian", "Maxwell", "Beatrice", "Oscar", "Caroline", "Patrick", "Diana"
    ]
    
    kenyan_surnames = [
        "Wanjiku", "Otieno", "Kamau", "Achieng", "Mwangi", "Chebet", "Njuguna", "Wangari", "Odhiambo", "Muthoni",
        "Kiprotich", "Nyong'o", "Kiprop", "Auma", "Mutua", "Njeri", "Ochieng", "Wambui", "Karanja", "Wairimu"
    ]

    for i, school in enumerate(schools):
        # Create 15-20 students per school
        school_students = []
        for j in range(18):
            first_name = kenyan_first_names[j % len(kenyan_first_names)]
            surname = kenyan_surnames[(i * 5 + j) % len(kenyan_surnames)]
            full_name = f"{first_name} {surname}"
            
            student = User(
                full_name=full_name,
                email=f"{first_name.lower()}.{surname.lower()}@student.{school.name.lower().replace(' ', '')}.edu",
                _password_hash="student123",
                role="student",
                school_id=school.id
            )
            school_students.append(student)
            students.append(student)
        
        db.session.add_all(school_students)
    db.session.commit()
    return educators

def seed_students(schools):
    print("👩‍🎓 Creating students...")
    classes = []
    form_levels = ["Form 1", "Form 2", "Form 3", "Form 4"]
    class_streams = ["A", "B", "C"]
    
    for school in schools:
        school_classes = []
        owner = next(owner for owner in owners if owner.school_id == school.id)
        
        # Create 3-4 forms with 2-3 streams each
        for form in form_levels[:3]:  # Forms 1-3
            for stream in class_streams[:2]:  # Streams A-B
                class_name = f"{form}{stream}"
                class_obj = Class(
                    name=class_name,
                    school_id=school.id,
                    created_by=owner.id
                )
                school_classes.append(class_obj)
                classes.append(class_obj)
        
        db.session.add_all(school_classes)
    db.session.commit()

    print("👥 Assigning class members...")
    class_members = []
    
    # Group students and educators by school
    school_groups = {}
    for school in schools:
        school_students = [s for s in students if s.school_id == school.id]
        school_educators = [e for e in educators if e.school_id == school.id]
        school_classes = [c for c in classes if c.school_id == school.id]
        school_groups[school.id] = {
            'students': school_students,
            'educators': school_educators,
            'classes': school_classes
        }

    for school_id, group in school_groups.items():
        students_per_class = len(group['students']) // len(group['classes'])
        
        # Assign educators to classes (2 educators per class)
        for i, class_obj in enumerate(group['classes']):
            # Assign 2 educators per class
            for j in range(2):
                educator_idx = (i * 2 + j) % len(group['educators'])
                educator = group['educators'][educator_idx]
                
                class_member = ClassMember(
                    class_id=class_obj.id,
                    user_id=educator.id,
                    role_in_class="educator"
                )
                class_members.append(class_member)
        
        # Assign students to classes
        for i, student in enumerate(group['students']):
            class_idx = i // students_per_class
            if class_idx >= len(group['classes']):
                class_idx = len(group['classes']) - 1
            
            class_obj = group['classes'][class_idx]
            class_member = ClassMember(
                class_id=class_obj.id,
                user_id=student.id,
                role_in_class="student"
            )
            class_members.append(class_member)

    db.session.add_all(class_members)
    db.session.commit()

    print("📚 Uploading diverse resources...")
    resources_data = [
        {"title": "Introduction to Algebra", "description": "Basic algebraic concepts and equations", "type": "files", "file_url": "https://example.com/intro-algebra.pdf"},
        {"title": "Cell Biology Fundamentals", "description": "Understanding cell structure and function", "type": "video", "file_url": "https://example.com/cell-biology.mp4"},
        {"title": "Kenyan History Timeline", "description": "Key events in Kenyan history from pre-colonial to modern times", "type": "files", "file_url": "https://example.com/kenyan-history.pdf"},
        {"title": "Chemical Reactions Lab", "description": "Virtual chemistry laboratory exercises", "type": "video", "file_url": "https://example.com/chem-lab.mp4"},
        {"title": "English Grammar Guide", "description": "Comprehensive guide to English grammar rules", "type": "files", "file_url": "https://example.com/grammar-guide.pdf"},
        {"title": "Physics Mechanics", "description": "Understanding motion, force, and energy", "type": "video", "file_url": "https://example.com/physics-mechanics.mp4"},
        {"title": "Computer Programming Basics", "description": "Introduction to Python programming", "type": "files", "file_url": "https://example.com/programming-basics.pdf"},
        {"title": "Geography of East Africa", "description": "Physical and human geography of East Africa", "type": "files", "file_url": "https://example.com/east-africa-geo.pdf"}
    ]

    resources = []
    for i, class_obj in enumerate(classes):
        # Add 2-3 resources per class
        school_educators = [e for e in educators if e.school_id == class_obj.school_id]
        
        for j in range(2):
            resource_data = resources_data[(i * 2 + j) % len(resources_data)]
            educator = school_educators[j % len(school_educators)]
            
            resource = ResourceModel(
                title=resource_data["title"],
                description=resource_data["description"],
                type=resource_data["type"],
                file_url=resource_data["file_url"],
                uploaded_by=educator.id,
                class_id=class_obj.id
            )
            resources.append(resource)

    db.session.add_all(resources)
    db.session.commit()

    print("📆 Adding comprehensive attendance records...")
    attendance_records = []
    base_date = date.today() - timedelta(days=30)  # Start from 30 days ago
    
    for class_obj in classes:
        # Get students and educators for this class
        class_students = [cm.user_id for cm in class_obj.members if cm.role_in_class == "student"]
        class_educators = [cm.user_id for cm in class_obj.members if cm.role_in_class == "educator"]
        
        if not class_educators:
            continue
            
        # Create attendance for last 20 school days
        for day_offset in range(20):
            current_date = base_date + timedelta(days=day_offset)
            # Skip weekends
            if current_date.weekday() >= 5:
                continue
                
            educator_id = class_educators[0]  # Use first educator
            
            for student_id in class_students:
                # 90% attendance rate
                import random
                status = "present" if random.random() < 0.9 else "absent"
                
                attendance = Attendance(
                    class_id=class_obj.id,
                    student_id=student_id,
                    educator_id=educator_id,
                    date=current_date,
                    status=status
                )
                attendance_records.append(attendance)

    db.session.add_all(attendance_records)
    db.session.commit()

    print("📝 Creating comprehensive assessments...")
    assessment_templates = [
        {
            "title": "Mathematics Quiz - Linear Equations",
            "description": "Test your understanding of solving linear equations",
            "type": "quiz",
            "duration_minutes": 45,
            "questions": [
                {"q": "Solve: 2x + 5 = 13", "choices": ["x = 4", "x = 6", "x = 8", "x = 9"], "answer": "x = 4"},
                {"q": "What is the slope of y = 3x + 2?", "choices": ["2", "3", "5", "1"], "answer": "3"},
                {"q": "Solve: x/4 + 3 = 7", "choices": ["x = 12", "x = 16", "x = 20", "x = 24"], "answer": "x = 16"},
                {"q": "If 5x - 10 = 0, then x = ?", "choices": ["0", "1", "2", "5"], "answer": "2"}
            ]
        },
        {
            "title": "Biology Test - Cell Structure",
            "description": "Assessment on plant and animal cell components",
            "type": "test",
            "duration_minutes": 60,
            "questions": [
                {"q": "Which organelle controls cell activities?", "choices": ["Cytoplasm", "Nucleus", "Mitochondria", "Ribosome"], "answer": "Nucleus"},
                {"q": "What produces energy in the cell?", "choices": ["Nucleus", "Cytoplasm", "Mitochondria", "Cell wall"], "answer": "Mitochondria"},
                {"q": "Which part is found only in plant cells?", "choices": ["Cell membrane", "Cell wall", "Nucleus", "Cytoplasm"], "answer": "Cell wall"}
            ]
        },
        {
            "title": "English Literature - Poetry Analysis",
            "description": "Understanding themes and literary devices in poetry",
            "type": "assignment",
            "duration_minutes": 90,
            "questions": [
                {"q": "Identify the main theme in the given poem", "choices": ["Love", "Nature", "Death", "Freedom"], "answer": "Nature"},
                {"q": "What literary device is used in 'The wind whispered'?", "choices": ["Metaphor", "Simile", "Personification", "Alliteration"], "answer": "Personification"}
            ]
        }
    ]

    assessments = []
    for class_obj in classes:
        class_educators = [cm.user_id for cm in class_obj.members if cm.role_in_class == "educator"]
        if not class_educators:
            continue
            
        # Create 2-3 assessments per class
        for i in range(2):
            template = assessment_templates[i % len(assessment_templates)]
            educator_id = class_educators[0]
            
            # Schedule assessments at different times
            start_time = datetime.now(timezone.utc) + timedelta(days=i+1, hours=i*2)
            
            assessment = Assessment(
                title=template["title"],
                description=template["description"],
                type=template["type"],
                class_id=class_obj.id,
                created_by=educator_id,
                duration_minutes=template["duration_minutes"],
                start_time=start_time,
                questions=template["questions"]
            )
            assessments.append(assessment)

    db.session.add_all(assessments)
    db.session.commit()

    print("✅ Creating student submissions...")
    submissions = []
    import random
    
    for assessment in assessments:
        # Get students in this class
        class_students = [cm.user_id for cm in assessment.class_.members if cm.role_in_class == "student"]
        
        # 70-80% of students submit
        num_submissions = int(len(class_students) * random.uniform(0.7, 0.8))
        submitting_students = random.sample(class_students, num_submissions)
        
        for student_id in submitting_students:
            # Generate realistic answers and scores
            answers = {}
            correct_answers = 0
            total_questions = len(assessment.questions)
            
            for i, question in enumerate(assessment.questions):
                # 60-90% chance of correct answer
                if random.random() < random.uniform(0.6, 0.9):
                    answers[str(i)] = question["answer"]
                    correct_answers += 1
                else:
                    # Pick a random incorrect answer
                    wrong_choices = [choice for choice in question["choices"] if choice != question["answer"]]
                    answers[str(i)] = random.choice(wrong_choices) if wrong_choices else "No answer"
            
            score = (correct_answers / total_questions) * 100
            
            submission = Submission(
                assessment_id=assessment.id,
                student_id=student_id,
                submitted_at=datetime.now(timezone.utc) - timedelta(hours=random.randint(1, 24)),
                answers=answers,
                score=score
            )
            submissions.append(submission)

    db.session.add_all(submissions)
    db.session.commit()

    print("💬 Adding realistic chat messages...")
    chat_templates = [
        "Good morning class! Ready for today's lesson?",
        "Can someone explain the homework from yesterday?",
        "I have a question about the assignment",
        "Great work on the quiz everyone!",
        "Don't forget about the test next week",
        "Can we have extra practice on this topic?",
        "The presentation was very informative",
        "What time is the parent meeting?",
        "I missed class yesterday, what did we cover?",
        "Thank you for the explanation, teacher",
        "Can you share the notes from today?",
        "The lab experiment was interesting",
        "Is there extra credit available?",
        "When are the results coming out?",
        "Can we form study groups?"
    ]

    messages = []
    for class_obj in classes:
        class_members = class_obj.members
        
        # Add 10-15 messages per class
        for i in range(random.randint(10, 15)):
            member = random.choice(class_members)
            message_text = random.choice(chat_templates)
            
            # Add variation based on role
            if member.role_in_class == "educator":
                message_text = message_text.replace("teacher", "everyone")
            
            chat_message = Chat(
                class_id=class_obj.id,
                user_id=member.user_id,
                message=message_text
            )
            messages.append(chat_message)

    db.session.add_all(messages)
    db.session.commit()

    print("✅ Extended seeding completed successfully!")
    print(f"Created:")
    print(f"  - {len(schools)} schools")
    print(f"  - {len(owners)} owners")
    print(f"  - {len(educators)} educators")
    print(f"  - {len(students)} students")
    print(f"  - {len(classes)} classes")
    print(f"  - {len(class_members)} class memberships")
    print(f"  - {len(resources)} resources")
    print(f"  - {len(attendance_records)} attendance records")
    print(f"  - {len(assessments)} assessments")
    print(f"  - {len(submissions)} submissions")
    print(f"  - {len(messages)} chat messages")

if __name__ == "__main__":
    with app.app_context():
        seed_extended_data()
