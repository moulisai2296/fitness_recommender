# 🏋️ Personal Fitness Tracker AI Assistant — Full Project Requirements

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [System Architecture](#3-system-architecture)
4. [Directory Structure](#4-directory-structure)
5. [Environment Configuration (.env)](#5-environment-configuration-env)
6. [Database Schema](#6-database-schema)
7. [Backend — FastAPI Endpoints](#7-backend--fastapi-endpoints)
8. [AI Layer — LangChain Config & System Prompt](#8-ai-layer--langchain-config--system-prompt)
9. [Frontend — React Pages & Components](#9-frontend--react-pages--components)
10. [Safety Guardrails](#10-safety-guardrails)
11. [UI Design Prompt (for Figma / Vibe Coding Tool)](#11-ui-design-prompt-for-figma--vibe-coding-tool)
12. [Non-Functional Requirements](#12-non-functional-requirements)
13. [Future Enhancements](#13-future-enhancements)

---

## 1. Project Overview

A full-stack, AI-powered **Personal Fitness Tracker** web application. Users set up a profile, log daily workouts and activities, and receive intelligent, personalised fitness recommendations powered by a large language model (Gemini or OpenAI, switchable via a single `.env` key). The app enforces safety guardrails to prevent harmful or medically irresponsible advice.

**Core pillars:**
- User profile management (goals, demographics)
- Activity & workout logging
- AI-powered coaching recommendations
- Progress visualisation dashboard
- Safety-first AI guardrails

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | ReactJS (Vite), React Router, Axios, Recharts |
| **Backend** | Python 3.11+, FastAPI, Uvicorn |
| **ORM** | SQLAlchemy 2.x |
| **Database** | SQLite (via SQLAlchemy) |
| **AI / LLM** | LangChain (provider-agnostic), Gemini OR OpenAI |
| **Config** | python-dotenv (.env file) |
| **Auth** | JWT (python-jose + passlib) |
| **CORS** | FastAPI CORSMiddleware |

---

## 3. System Architecture

```
┌──────────────────────────────────────────────────┐
│                   React Frontend                  │
│   (Profile | Log | Dashboard | Recommendations)   │
└────────────────────┬─────────────────────────────┘
                     │ REST API (JSON)
                     ▼
┌──────────────────────────────────────────────────┐
│               FastAPI Backend                     │
│  ┌────────────┐  ┌───────────┐  ┌─────────────┐  │
│  │   Routes   │  │ Services  │  │  SQLAlchemy │  │
│  │  /auth     │  │  user     │  │    ORM      │  │
│  │  /users    │  │  workout  │  └──────┬──────┘  │
│  │  /workouts │  │  ai_coach │         │          │
│  │  /ai       │  └─────┬─────┘  ┌──────▼──────┐  │
│  └────────────┘        │        │   SQLite DB  │  │
│                        │        └─────────────┘  │
│                        ▼                         │
│              ┌──────────────────┐                │
│              │  LangChain Layer │                │
│              │  (provider swap  │                │
│              │  via .env key)   │                │
│              └────────┬─────────┘                │
└───────────────────────┼──────────────────────────┘
                        │
          ┌─────────────▼─────────────┐
          │  Gemini API  OR  OpenAI   │
          │   (set LLM_PROVIDER=      │
          │   gemini | openai)        │
          └───────────────────────────┘
```

---

## 4. Directory Structure

```
fitness-tracker/
├── backend/
│   ├── main.py                    # FastAPI app entry point
│   ├── .env                       # All secrets & config (never commit)
│   ├── requirements.txt
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py              # Loads .env, exports settings object
│   │   ├── database.py            # SQLAlchemy engine + session
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── workout.py
│   │   │   └── goal.py
│   │   ├── schemas/
│   │   │   ├── user.py
│   │   │   ├── workout.py
│   │   │   └── ai.py
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── workouts.py
│   │   │   └── ai_coach.py
│   │   ├── services/
│   │   │   ├── user_service.py
│   │   │   ├── workout_service.py
│   │   │   └── ai_service.py      # LangChain provider logic lives here
│   │   └── middleware/
│   │       └── auth_middleware.py
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api/                   # Axios instances + API calls
│       │   ├── axiosInstance.js
│       │   ├── authApi.js
│       │   ├── workoutApi.js
│       │   └── aiApi.js
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── OnboardingPage.jsx
│       │   ├── DashboardPage.jsx
│       │   ├── LogWorkoutPage.jsx
│       │   ├── ProgressPage.jsx
│       │   └── AICoachPage.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── WorkoutCard.jsx
│       │   ├── GoalBadge.jsx
│       │   ├── ProgressChart.jsx
│       │   ├── RecommendationCard.jsx
│       │   └── SafetyBanner.jsx
│       └── styles/
│           └── global.css
│
└── README.md
```

---

## 5. Environment Configuration (.env)

Place this file at `backend/.env`. **Do not commit to source control.**

```dotenv
# ─── App ─────────────────────────────────────────────
APP_SECRET_KEY=your_super_secret_jwt_key_here
APP_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# ─── Database ────────────────────────────────────────
DATABASE_URL=sqlite:///./fitness_tracker.db

# ─── AI Provider (switch between gemini | openai) ────
# Change ONLY this key to switch providers. No code change needed.
LLM_PROVIDER=gemini

# ─── Gemini ──────────────────────────────────────────
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash

# ─── OpenAI ──────────────────────────────────────────
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini

# ─── AI Behaviour ────────────────────────────────────
AI_MAX_TOKENS=1024
AI_TEMPERATURE=0.7
```

### `app/config.py` — Settings Loader

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_SECRET_KEY: str
    APP_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    DATABASE_URL: str

    LLM_PROVIDER: str = "gemini"          # "gemini" or "openai"

    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"

    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"

    AI_MAX_TOKENS: int = 1024
    AI_TEMPERATURE: float = 0.7

    class Config:
        env_file = ".env"

settings = Settings()
```

---

## 6. Database Schema

### `users` table
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PK | auto |
| email | VARCHAR UNIQUE | login identifier |
| hashed_password | VARCHAR | bcrypt |
| name | VARCHAR | display name |
| age | INTEGER | |
| weight_kg | FLOAT | nullable |
| height_cm | FLOAT | nullable |
| fitness_goal | VARCHAR | enum: lose_weight, build_strength, stay_active, improve_endurance |
| activity_level | VARCHAR | enum: sedentary, light, moderate, active, very_active |
| medical_notes | TEXT | optional; fed into safety guardrail |
| created_at | DATETIME | |

### `workouts` table
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PK | auto |
| user_id | INTEGER FK | → users.id |
| activity_type | VARCHAR | e.g. running, cycling, yoga |
| duration_minutes | INTEGER | |
| intensity | VARCHAR | low, medium, high |
| calories_burned | FLOAT | optional; user-entered or estimated |
| notes | TEXT | "how it felt" |
| logged_at | DATETIME | |

### `goals` table
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PK | auto |
| user_id | INTEGER FK | → users.id |
| description | TEXT | user-written goal |
| target_date | DATE | nullable |
| is_achieved | BOOLEAN | default False |
| created_at | DATETIME | |

### `ai_recommendations` table
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PK | auto |
| user_id | INTEGER FK | → users.id |
| prompt_context | TEXT | serialised context sent to LLM |
| recommendation | TEXT | LLM response |
| generated_at | DATETIME | |

---

## 7. Backend — FastAPI Endpoints

### Auth
| Method | Path | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login, returns JWT |
| GET | `/auth/me` | Current user info |

### Users
| Method | Path | Description |
|---|---|---|
| GET | `/users/profile` | Get profile |
| PUT | `/users/profile` | Update profile |

### Workouts
| Method | Path | Description |
|---|---|---|
| POST | `/workouts` | Log a new workout |
| GET | `/workouts` | List all workouts (paginated) |
| GET | `/workouts/{id}` | Single workout detail |
| DELETE | `/workouts/{id}` | Delete a workout entry |
| GET | `/workouts/stats/summary` | Aggregated stats (total sessions, total minutes, calories) |

### AI Coach
| Method | Path | Description |
|---|---|---|
| POST | `/ai/recommend` | Generate AI recommendation based on profile + recent logs |
| GET | `/ai/history` | Past AI recommendations for this user |

---

## 8. AI Layer — LangChain Config & System Prompt

### Provider-Agnostic LangChain Setup (`services/ai_service.py`)

```python
from langchain_core.messages import SystemMessage, HumanMessage
from app.config import settings

def get_llm():
    """
    Returns the correct LangChain LLM based on LLM_PROVIDER in .env.
    Switch provider by changing LLM_PROVIDER — no code changes needed.
    """
    if settings.LLM_PROVIDER == "gemini":
        from langchain_google_genai import ChatGoogleGenerativeAI
        return ChatGoogleGenerativeAI(
            model=settings.GEMINI_MODEL,
            google_api_key=settings.GEMINI_API_KEY,
            temperature=settings.AI_TEMPERATURE,
            max_output_tokens=settings.AI_MAX_TOKENS,
        )
    elif settings.LLM_PROVIDER == "openai":
        from langchain_openai import ChatOpenAI
        return ChatOpenAI(
            model=settings.OPENAI_MODEL,
            openai_api_key=settings.OPENAI_API_KEY,
            temperature=settings.AI_TEMPERATURE,
            max_tokens=settings.AI_MAX_TOKENS,
        )
    else:
        raise ValueError(f"Unsupported LLM_PROVIDER: {settings.LLM_PROVIDER}")


async def generate_recommendation(user_context: dict) -> str:
    llm = get_llm()
    system_prompt = build_system_prompt()
    user_message = build_user_message(user_context)

    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_message),
    ]

    response = await llm.ainvoke(messages)
    return response.content


def build_user_message(ctx: dict) -> str:
    return f"""
User Profile:
- Name: {ctx['name']}, Age: {ctx['age']}
- Goal: {ctx['fitness_goal']}, Activity Level: {ctx['activity_level']}
- Medical Notes: {ctx.get('medical_notes', 'None')}

Recent Workouts (last 7 days):
{ctx['recent_workouts']}

Weekly Summary:
- Total sessions: {ctx['total_sessions']}
- Total minutes: {ctx['total_minutes']}
- Avg intensity: {ctx['avg_intensity']}

Please give me personalised fitness coaching advice based on this data.
""".strip()
```

---

### 🤖 AI System Prompt

Copy this verbatim into `build_system_prompt()` in `ai_service.py`:

```
You are FitCoach AI, a professional, empathetic, and safety-conscious personal fitness assistant embedded in a fitness tracking app. Your role is to help users reach their health and fitness goals through personalised, practical, and evidence-based guidance.

## YOUR ROLE AND TONE
- Be encouraging, warm, and motivating — like a knowledgeable friend, not a stern trainer.
- Use clear, jargon-free language unless the user clearly understands fitness terminology.
- Keep recommendations specific, actionable, and grounded in the user's actual data.
- Acknowledge the user's effort and progress, however small.

## WHAT YOU SHOULD DO
- Analyse the user's recent workout logs, goals, and profile to give genuinely tailored advice.
- Suggest specific next steps: e.g. "Try adding 5 minutes to your Thursday run" rather than vague advice like "exercise more."
- Recommend rest and recovery when workout frequency or intensity warrants it.
- Offer variety in workout types to prevent monotony and overuse injuries.
- Motivate users who have not logged workouts recently with a compassionate nudge.
- Highlight positive trends (e.g. consistency streak, increased duration).

## RESPONSE STRUCTURE
Always structure your response using these three sections:

### 📊 Your Progress This Week
Briefly acknowledge what the user has done, with genuine positivity.

### 💡 Personalised Recommendations
Give 2–4 specific, prioritised recommendations based on their data and goal. Use a clear bullet format. Each recommendation should say WHAT, WHY, and HOW.

### ⚠️ Recovery & Wellbeing Note
Always include one note about rest, sleep, nutrition, or injury prevention. Keep it brief and practical.

## HARD SAFETY GUARDRAILS — YOU MUST ALWAYS FOLLOW THESE

1. **Never prescribe medical treatment.** If the user mentions an injury, chronic condition, or medication, always advise them to consult a qualified healthcare professional (doctor, physiotherapist, or sports medicine specialist) before following any fitness advice.

2. **Never recommend extreme caloric restriction.** Do not suggest net daily intake below 1200 kcal for women or 1500 kcal for men. Never promote crash dieting or fasting beyond 24 hours.

3. **Never recommend dangerous workout volumes.** Do not suggest training the same muscle group for more than 2 consecutive days without rest. Do not recommend more than 2 high-intensity sessions per week for beginners.

4. **Refuse harmful requests.** If a user requests advice that could cause physical harm (e.g. "help me lose 10kg in 1 week," "how do I work out with a broken arm"), decline clearly, explain why it is unsafe, and redirect to safer alternatives or professional help.

5. **Flag concerning patterns.** If the user's logs suggest overtraining (e.g. 14+ sessions in 7 days, all high intensity), gently flag this as a risk and recommend a recovery week.

6. **Never diagnose.** If the user describes symptoms that may indicate a medical issue (chest pain, dizziness, extreme fatigue), immediately recommend they stop exercising and seek medical evaluation.

7. **Be honest about your limitations.** You are an AI assistant, not a certified personal trainer or physician. Always acknowledge this when appropriate, and never claim certainty about medical or clinical outcomes.

## SCOPE RESTRICTION
You only assist with fitness, exercise, nutrition strategy (not clinical dietetics), recovery, and motivation. If the user asks about unrelated topics, politely redirect them back to their fitness journey.
```

---

## 9. Frontend — React Pages & Components

### Pages

**LandingPage** — Hero section, value proposition, CTA to register or login.

**RegisterPage / LoginPage** — Auth forms with JWT token storage in `localStorage`.

**OnboardingPage** — Guided multi-step form: Name → Age & Body Stats → Fitness Goal → Activity Level → Medical Notes (optional). Saves to `PUT /users/profile`.

**DashboardPage** — Overview cards: total workouts this week, total minutes, current goal badge. Quick-log button. Latest AI recommendation preview.

**LogWorkoutPage** — Form: activity type (dropdown), duration (slider + number), intensity (low/medium/high toggle), how it felt (text area), date. Submits to `POST /workouts`.

**ProgressPage** — Line/bar charts (Recharts) for weekly workout minutes, sessions per week, and calorie trend. List view of all past workouts with filter by activity type.

**AICoachPage** — "Generate My Plan" button calls `POST /ai/recommend`. Displays structured recommendation with progress summary, personalised tips, and recovery note. Shows history of past recommendations.

### Key Components

**Navbar** — Logo, nav links, user avatar dropdown with logout.

**WorkoutCard** — Activity icon, type, duration, intensity badge, notes preview, date.

**ProgressChart** — Recharts wrapper for weekly trends.

**RecommendationCard** — Renders AI response with section headers, formatted bullets, and timestamp.

**SafetyBanner** — Persistent soft banner: *"FitCoach AI provides general guidance only. Always consult a healthcare professional before starting a new fitness programme."* Dismissable per session but never permanently suppressed.

**GoalBadge** — Coloured badge displaying the user's current fitness goal.

---

## 10. Safety Guardrails

### Backend (enforced before AI call)

```python
SAFETY_RULES = [
    {
        "check": lambda ctx: ctx["total_sessions"] > 14 and ctx["days"] == 7,
        "message": "Overtraining detected: more than 14 sessions in 7 days. Recommending rest week."
    },
    {
        "check": lambda ctx: "broken" in (ctx.get("medical_notes") or "").lower()
                             or "fracture" in (ctx.get("medical_notes") or "").lower(),
        "message": "Injury flag: please consult a physiotherapist before continuing exercise."
    },
]

def run_safety_checks(ctx: dict) -> str | None:
    for rule in SAFETY_RULES:
        if rule["check"](ctx):
            return rule["message"]
    return None
```

If a safety check is triggered, the safety message is prepended to the AI system context so the model is aware, and also returned to the frontend to display in a highlighted warning banner.

### Frontend (UI layer)

- **SafetyBanner** component always visible on AICoachPage.
- If API response includes `safety_warning` field, render a prominent red-bordered alert above the recommendation.
- Input validation: duration cannot exceed 600 minutes; intensity must be one of three valid values.

---

## 11. UI Design Prompt (for Figma / Vibe Coding Tool)

> **Paste this prompt into your Figma AI tool, V0, Lovable, Bolt, or any UI generation tool.**

---

```
Design a production-grade fitness tracking web app called "FitCoach AI" with the following screens and design direction.

## Design Aesthetic
Dark-mode first. Athletic, modern, premium. Inspired by fitness brands like Nike and Apple Fitness+. 
Use a deep charcoal background (#0F0F0F or #111318), with electric green (#00FF85) as the primary 
accent and pure white for headings. Secondary surface cards in #1A1D23. Use sharp, geometric 
typography — a bold condensed display font (e.g. Barlow Condensed, Oswald, or similar) for headings 
and a clean modern sans (e.g. DM Sans or Nunito) for body text.

Subtle neon glow effects on CTA buttons and active states. Micro-animations on card hover (lift + 
glow). Progress bars and charts use gradient fills from green to teal. Icons are minimal and outlined.

Layout uses a left sidebar navigation on desktop (collapsible on mobile). Content area is spacious 
with a card-based grid system.

## Screens to Design

### 1. Landing Page
Hero with large headline: "Your AI-Powered Personal Coach — Finally Honest About Fitness."
Sub-headline about logging, goals, and AI guidance. Two CTAs: "Get Started Free" (filled) and 
"See How It Works" (ghost). Background: abstract mesh gradient or dark athletic photography overlay.

### 2. Registration / Login
Minimal centred card. Email + password fields with floating labels. OAuth placeholder buttons 
(Google). Toggle between Login and Register. Inline validation states.

### 3. Onboarding (Multi-Step)
4-step progress indicator at top. Each step is a single focused card:
- Step 1: Name & Age
- Step 2: Height, Weight (metric toggle)
- Step 3: Fitness Goal — 4 large icon-button cards (Lose Weight | Build Strength | Stay Active | 
  Improve Endurance). Selected card gets green border glow.
- Step 4: Activity level slider (5 positions). Optional medical notes textarea.
Animated slide transitions between steps. "Continue" button fixed at bottom.

### 4. Dashboard
Top row: 3 stat cards — "Sessions This Week", "Total Minutes", "Calories Logged". Below: 
Current Goal badge (large, coloured). Quick-log FAB (floating action button) with + icon, 
bottom-right. AI Recommendation preview card with gradient top border — shows first 2 lines, 
"See Full Plan" button. Recent workouts list: last 3 workouts as compact horizontal cards.

### 5. Log Workout Page
Centred form card. Activity type grid (8 types with icon tiles — Running, Cycling, Yoga, Weights, 
Swimming, HIIT, Walking, Other). Duration: large number input with +/- stepper. Intensity: 3-segment 
toggle (Low | Medium | High) with colour coding (green/yellow/red). "How did it feel?" text area. 
Date/time picker. Submit button full-width green.

### 6. Progress Page
Two charts stacked: (1) Weekly sessions bar chart, (2) Weekly minutes line chart. Both use 
green gradient fill. Date range selector (7D / 30D / 90D). Below charts: filterable workout history 
table with activity icon, date, duration, intensity badge, and a delete icon. Empty state illustration 
when no data.

### 7. AI Coach Page
Prominent "Generate My Fitness Plan" button — full width, neon glow. Below: AI response rendered 
in a scrollable card with three sections clearly separated: (1) Progress Summary (light teal 
background), (2) Personalised Recommendations (bulleted, each with a left green accent bar), 
(3) Recovery Note (amber-tinted background). Safety disclaimer banner pinned at top in subtle 
grey. History of past recommendations in accordion list below.

## Component Design Specs
- Buttons: 48px height, 8px radius, filled (green bg, black text) and ghost (green border, green text) variants
- Cards: 12px radius, 1px border (#2A2D35), box-shadow: 0 4px 24px rgba(0,255,133,0.06)
- Inputs: 48px height, dark fill (#1A1D23), 1px border, green focus ring
- Typography scale: Display 48px bold, H1 32px bold, H2 24px semi-bold, Body 16px regular, Caption 13px
- Sidebar width: 240px, collapsed: 64px (icons only)
- Spacing grid: 8px base unit
- Mobile: single column, bottom tab navigation (5 tabs: Home, Log, Progress, AI Coach, Profile)

## Responsive Breakpoints
- Mobile: 375px
- Tablet: 768px  
- Desktop: 1280px+

## Accessibility
High contrast ratios. Focus states on all interactive elements. ARIA labels on icon-only buttons.
```

---

## 12. Non-Functional Requirements

**Security**
- All passwords hashed with bcrypt.
- JWT tokens with expiry; stored in `httpOnly` cookies or `localStorage` with XSS awareness.
- Never log or expose raw API keys. Load exclusively from `.env`.
- Rate limit the `/ai/recommend` endpoint (max 10 requests per user per day).

**Performance**
- AI calls are async (FastAPI `async def` + `await`).
- Paginate workout history (default: 20 per page).
- Frontend uses React Query or SWR for data caching and background refetch.

**Reliability**
- Wrap all AI calls in try/except; return a graceful error message to the user on LLM failure.
- DB migrations managed via Alembic.

**Developer Experience**
- All config via `.env` — zero hardcoded secrets anywhere.
- Switching from Gemini to OpenAI: change `LLM_PROVIDER=openai` in `.env` and add the OpenAI key. No other change needed.
- Requirements split: `requirements.txt` (production), `requirements-dev.txt` (testing, linting).

---

## 13. Future Enhancements

- **Wearable Integration** — Sync with Google Fit, Apple Health, or Fitbit via OAuth.
- **Meal Logging** — Nutritional data with AI macro guidance.
- **Streak & Gamification** — Badges, streaks, weekly challenges.
- **Social** — Share progress updates (opt-in).
- **Voice Logging** — Log workouts via speech input.
- **Offline Support** — PWA with service worker for offline log entry.
- **Multi-language** — i18n support.
- **PostgreSQL migration** — Replace SQLite for production scale; change only `DATABASE_URL` in `.env`.

---

*Document version 1.0 — Generated for vibe-coding handoff. All prompts, schemas, and system configurations are production-ready and implementation-agnostic.*
