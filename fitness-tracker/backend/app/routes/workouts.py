from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.user import User
from ..models.workout import Workout
from ..schemas.workout import WorkoutCreate, WorkoutResponse, WorkoutSummary
from .deps import get_current_user
from sqlalchemy import func

router = APIRouter(prefix="/workouts", tags=["workouts"])

@router.post("", response_model=WorkoutResponse)
def log_workout(workout: WorkoutCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    workout_data = workout.model_dump()
    if workout_data.get("calories_burned") is None:
        intensity_factors = {"low": 5, "medium": 8, "high": 12}
        factor = intensity_factors.get(workout_data.get("intensity", "medium"), 8)
        workout_data["calories_burned"] = workout_data["duration_minutes"] * factor

    db_workout = Workout(**workout_data, user_id=current_user.id)
    db.add(db_workout)
    db.commit()
    db.refresh(db_workout)
    return db_workout

@router.get("", response_model=List[WorkoutResponse])
def get_workouts(skip: int = 0, limit: int = 20, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Workout).filter(Workout.user_id == current_user.id).order_by(Workout.logged_at.desc()).offset(skip).limit(limit).all()

@router.get("/stats/summary", response_model=WorkoutSummary)
def get_workout_summary(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = db.query(
        func.count(Workout.id).label("total_sessions"),
        func.sum(Workout.duration_minutes).label("total_minutes"),
        func.sum(Workout.calories_burned).label("calories")
    ).filter(Workout.user_id == current_user.id).first()
    
    return WorkoutSummary(
        total_sessions=result.total_sessions or 0,
        total_minutes=result.total_minutes or 0,
        calories=result.calories or 0.0
    )

@router.get("/{id}", response_model=WorkoutResponse)
def get_workout(id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    workout = db.query(Workout).filter(Workout.id == id, Workout.user_id == current_user.id).first()
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    return workout

@router.delete("/{id}")
def delete_workout(id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    workout = db.query(Workout).filter(Workout.id == id, Workout.user_id == current_user.id).first()
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    db.delete(workout)
    db.commit()
    return {"message": "Workout deleted successfully"}
