@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Journey

where javac >nul 2>nul
if errorlevel 1 (
  echo javac not found. Install JDK 17+ and add it to PATH.
  pause
  exit /b 1
)

if not exist out mkdir out
echo Compiling Journey...
javac -encoding UTF-8 -d out TravelPlannerServer.java
if errorlevel 1 (
  echo.
  echo Compile failed. Check the messages above.
  pause
  exit /b 1
)

echo Starting Journey at http://127.0.0.1:8080/
java "-Dfile.encoding=UTF-8" --add-modules jdk.httpserver -cp out TravelPlannerServer --open
pause
