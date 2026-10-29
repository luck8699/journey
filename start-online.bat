@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Journey Online
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-online.ps1"
pause
