from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Date
from datetime import datetime, timezone
from ..database import Base

class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    description = Column(Text)
    target_date = Column(Date, nullable=True)
    is_achieved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
