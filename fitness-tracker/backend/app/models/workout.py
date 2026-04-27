from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from datetime import datetime, timezone
from ..database import Base

class Workout(Base):
    __tablename__ = "workouts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    activity_type = Column(String)
    duration_minutes = Column(Integer)
    intensity = Column(String)
    calories_burned = Column(Float, nullable=True)
    notes = Column(Text, nullable=True)
    logged_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
