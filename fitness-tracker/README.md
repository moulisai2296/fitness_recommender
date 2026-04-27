# FitCoach AI — Personal Fitness Tracker

Welcome to FitCoach AI! This is a full-stack, AI-powered personal fitness tracking web application. It allows you to set up a profile, log daily workouts and activities, and receive intelligent, personalized fitness recommendations powered by Google's Gemini AI.

## ⚙️ Local Setup & Installation

If you want to run this project on another system, you will need to set up the environment first.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Python](https://www.python.org/) (v3.10+ recommended)
- `uv` package manager (`pip install uv`)

### 1. Backend Setup
Navigate to the `backend` directory and set up the Python environment:
```bash
cd backend
# Sync and install all dependencies using uv
uv sync
```
*Note: The backend requires an `.env` file. A default SQLite database is configured out of the box, but you can update `APP_SECRET_KEY` in the `.env` file for production.*

### 2. Frontend Setup
Navigate to the `frontend` directory and install the React dependencies:
```bash
cd frontend
npm install
```

### 3. Running the App
Once everything is installed, you can start both servers simultaneously using the provided script (if you are on Windows):
```powershell
.\start_app.ps1
```
Alternatively, run them manually in separate terminal windows:
- **Backend:** `cd backend` then `uv run uvicorn app.main:app --reload --port 8000`
- **Frontend:** `cd frontend` then `npm run dev -- --port 5173`

## 🚀 How to Use the App
1. **Start the Application**: 
   Use the provided `start_app.ps1` script to easily start both the backend server and the frontend client simultaneously.
   ```powershell
   .\start_app.ps1
   ```
2. **Access the Web Interface**: 
   Once the servers are running, open your web browser and navigate to [http://localhost:5173](http://localhost:5173).
3. **Register / Login**:
   Create a new account by providing your email, password, name, and age.
4. **Complete Onboarding**:
   Fill out your initial physical metrics (height, weight), select a primary fitness goal (e.g., Lose Weight, Build Strength), and set your current activity level.
5. **Log Workouts**:
   From the Dashboard or "Log Workout" page, you can log various activities (Running, Cycling, Yoga, etc.), recording the duration, intensity, and any notes about how you felt.
6. **Track Progress**:
   Visit the "Progress" page to see a visual chart of your workout durations over the last 7 active days, along with a complete history of your logged sessions.
7. **Get AI Coaching**:
   Navigate to the "AI Coach" page. Provide your personal **Google Gemini API Key**. Click "Generate My Fitness Plan" to receive a highly personalized, actionable coaching recommendation based on your recent logs, goals, and profile.

## 🎯 What Outcomes the User Gets

- **Structured Tracking**: A clean, centralized place to track workout consistency and history without manual spreadsheet logging.
- **Personalized Insights**: Tailored recommendations that take into account exactly what you've done in the past 7 days, avoiding generic advice.
- **Safety-First Guardrails**: The system intercepts unsafe conditions (e.g., overtraining patterns or medical flags) and prioritizes recovery and professional consultation.
- **Goal Alignment**: Actionable next steps are always aligned with the user's stated primary objective (e.g., specific advice for building strength versus improving endurance).

## 🛠️ Project Structure

- `backend/`: FastAPI backend utilizing SQLite, SQLAlchemy, and LangChain. Managed with `uv`.
- `frontend/`: React Vite application utilizing React Router, Axios, and Recharts. Styled with a premium dark-mode fitness aesthetic.
- `start_app.ps1`: A convenient script to boot up the application.
