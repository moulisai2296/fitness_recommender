from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta, timezone
from ..database import get_db
from ..models.user import User
from ..models.workout import Workout
from ..models.ai import AIRecommendation
from ..schemas.ai import RecommendationOutput, AIRecommendationResponse
from ..services.ai_service import generate_recommendation, run_safety_checks
from .deps import get_current_user

router = APIRouter(prefix="/ai", tags=["ai"])

@router.post("/recommend", response_model=RecommendationOutput)
async def get_recommendation(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    api_key = current_user.api_key
    if not api_key:
        raise HTTPException(status_code=400, detail="Missing API Key in profile. Please set your Gemini API Key first.")

    seven_days_ago = datetime.now(timezone.utc) - timedelta(days=7)
    recent_workouts = db.query(Workout).filter(
        Workout.user_id == current_user.id,
        Workout.logged_at >= seven_days_ago
    ).all()
    
    total_sessions = len(recent_workouts)
    total_minutes = sum(w.duration_minutes for w in recent_workouts)
    avg_intensity = "medium"
    
    if total_sessions > 0:
        intensities = {"low": 1, "medium": 2, "high": 3}
        inv_intensities = {1: "low", 2: "medium", 3: "high"}
        avg_int = sum(intensities.get(w.intensity, 2) for w in recent_workouts) / total_sessions
        avg_intensity = inv_intensities.get(round(avg_int), "medium")

    workout_list_str = "\n".join([f"- {w.activity_type} ({w.duration_minutes}m, {w.intensity})" for w in recent_workouts]) if recent_workouts else "No recent workouts logged."

    user_context = {
        "name": current_user.name,
        "age": current_user.age,
        "fitness_goal": current_user.fitness_goal,
        "activity_level": current_user.activity_level,
        "medical_notes": current_user.medical_notes,
        "recent_workouts": workout_list_str,
        "total_sessions": total_sessions,
        "total_minutes": total_minutes,
        "avg_intensity": avg_intensity,
        "days": 7
    }

    try:
        recommendation_text = await generate_recommendation(user_context, api_key)
        safety_warning = run_safety_checks(user_context)
        
        db_ai = AIRecommendation(
            user_id=current_user.id,
            prompt_context=str(user_context),
            recommendation=recommendation_text
        )
        db.add(db_ai)
        db.commit()
        db.refresh(db_ai)
        
        return RecommendationOutput(
            recommendation=recommendation_text,
            safety_warning=safety_warning
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate AI recommendation: {str(e)}")

@router.get("/history", response_model=List[AIRecommendationResponse])
def get_ai_history(skip: int = 0, limit: int = 20, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(AIRecommendation).filter(AIRecommendation.user_id == current_user.id).order_by(AIRecommendation.generated_at.desc()).offset(skip).limit(limit).all()
