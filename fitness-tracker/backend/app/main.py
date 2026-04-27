from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import auth, users, workouts, ai_coach

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FitCoach AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev only, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(workouts.router)
app.include_router(ai_coach.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to FitCoach AI API"}
