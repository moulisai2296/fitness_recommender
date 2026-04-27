from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class GoalBase(BaseModel):
    description: str
    target_date: Optional[date] = None

class GoalCreate(GoalBase):
    pass

class GoalResponse(GoalBase):
    id: int
    user_id: int
    is_achieved: bool
    created_at: datetime

    class Config:
        from_attributes = True
