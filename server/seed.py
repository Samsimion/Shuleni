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

    # Recreate tables
    db.create_all()

    print("🌱 Seeding data...")

    

    print("✅ Seeding complete!")


if __name__ == "__main__":
    with app.app_context():
        seed_data()

