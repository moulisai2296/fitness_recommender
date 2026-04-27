Write-Host "Starting FitCoach AI Application..." -ForegroundColor Green

Write-Host "Starting Backend API Server (Port 8000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; uv run uvicorn app.main:app --reload --port 8000"

Write-Host "Starting Frontend React Server (Port 5173)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev -- --port 5173"

Write-Host "Both servers are starting in separate windows!" -ForegroundColor Green
Write-Host "The frontend should be accessible at: http://localhost:5173" -ForegroundColor Yellow
