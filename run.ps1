# Journey - local mode
# Requires JDK 17+. Listens on 127.0.0.1:8080 only.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not (Get-Command javac -ErrorAction SilentlyContinue)) {
    Write-Host "javac not found. Install JDK 17+ and add it to PATH." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

$outDir = Join-Path $root "out"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
Write-Host "Compiling Journey..." -ForegroundColor DarkGray
& javac -encoding UTF-8 -d $outDir (Join-Path $root "TravelPlannerServer.java")
if ($LASTEXITCODE -ne 0) {
    Write-Host "Compile failed. Check the messages above." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit $LASTEXITCODE
}

Write-Host "Starting Journey at http://127.0.0.1:8080/ - press Ctrl+C to stop." -ForegroundColor Green
& java "-Dfile.encoding=UTF-8" --add-modules jdk.httpserver -cp $outDir TravelPlannerServer --open
