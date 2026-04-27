from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class WorkoutBase(BaseModel):
    activity_type: str
    duration_minutes: int = Field(gt=0, le=600)
    intensity: str # low, medium, high
    calories_burned: Optional[float] = None
    notes: Optional[str] = None

class WorkoutCreate(WorkoutBase):
    logged_at: Optional[datetime] = None

class WorkoutResponse(WorkoutBase):
    id: int
    user_id: int
    logged_at: datetime

    class Config:
        from_attributes = True

class WorkoutSummary(BaseModel):
    total_sessions: int
    total_minutes: int
    calories: float
