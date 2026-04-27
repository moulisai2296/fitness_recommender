from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime, timezone
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    name = Column(String)
    age = Column(Integer)
    weight_kg = Column(Float, nullable=True)
    height_cm = Column(Float, nullable=True)
    fitness_goal = Column(String) # lose_weight, build_strength, stay_active, improve_endurance
    activity_level = Column(String) # sedentary, light, moderate, active, very_active
    medical_notes = Column(String, nullable=True)
    api_key = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
