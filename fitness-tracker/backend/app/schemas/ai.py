from pydantic import BaseModel
from datetime import datetime

class AIRecommendationBase(BaseModel):
    recommendation: str

class AIRecommendationResponse(AIRecommendationBase):
    id: int
    user_id: int
    generated_at: datetime

    class Config:
        from_attributes = True

class SafetyWarning(BaseModel):
    message: str

class RecommendationOutput(BaseModel):
    recommendation: str
    safety_warning: str | None = None
