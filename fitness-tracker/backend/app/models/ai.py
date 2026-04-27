from sqlalchemy import Column, Integer, DateTime, ForeignKey, Text
from datetime import datetime, timezone
from ..database import Base

class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    prompt_context = Column(Text)
    recommendation = Column(Text)
    generated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
