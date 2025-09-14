@echo off
echo ==========================================
echo   Law Assistance Platform MVP - Startup
echo ==========================================
echo.

echo Starting Backend Test Server...
echo.
start "Backend Server" powershell -ExecutionPolicy Bypass -Command "cd '%~dp0backend'; node test-server.js; pause"

echo Waiting for backend to initialize...
timeout /t 3 /nobreak >nul

echo Starting Frontend Development Server...
echo.
start "Frontend Server" powershell -ExecutionPolicy Bypass -Command "cd '%~dp0frontend'; npm start; pause"

echo.
echo ==========================================
echo   🚀 MVP Servers Starting!
echo ==========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo The frontend will automatically open in your browser.
echo.
echo Press any key to continue...
pause >nul