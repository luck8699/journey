# Journey - online mode
# Starts the Java server and a public HTTPS tunnel.
# Preferred: bundled cloudflared.exe (Cloudflare Quick Tunnel).
# Fallback: ssh + localhost.run.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not (Get-Command javac -ErrorAction SilentlyContinue)) {
    Write-Host "javac not found. Install JDK 17+ and add it to PATH." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

$cloudflared = Join-Path $root "cloudflared.exe"
$hasCloudflared = Test-Path $cloudflared
$hasSsh = [bool](Get-Command ssh -ErrorAction SilentlyContinue)
if (-not $hasCloudflared -and -not $hasSsh) {
    Write-Host "No tunnel tool found. Keep cloudflared.exe in this folder, or install OpenSSH Client." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

$port = 8787
if ($env:JOURNEY_PORT -match '^\d+$') { $port = [int]$env:JOURNEY_PORT }

$code = $env:JOURNEY_PASSWORD
if ([string]::IsNullOrWhiteSpace($code)) {
    $alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    $raw = -join (1..8 | ForEach-Object { $alphabet[(Get-Random -Maximum $alphabet.Length)] })
    $code = $raw.Substring(0, 4) + "-" + $raw.Substring(4, 4)
}
$env:JOURNEY_PASSWORD = $code
$env:JOURNEY_ONLINE = "1"

$outDir = Join-Path $root "out"
$dataDir = Join-Path $root "data"
New-Item -ItemType Directory -Force -Path $outDir, $dataDir | Out-Null

Write-Host "Compiling Journey..." -ForegroundColor DarkGray
& javac -encoding UTF-8 -d $outDir (Join-Path $root "TravelPlannerServer.java")
if ($LASTEXITCODE -ne 0) {
    Write-Host "Compile failed. Check the messages above." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit $LASTEXITCODE
}

$serverOut = Join-Path $dataDir "server.log"
$serverErr = Join-Path $dataDir "server.err.log"
$tunnelOut = Join-Path $dataDir "tunnel.log"
$tunnelErr = Join-Path $dataDir "tunnel.err.log"
Remove-Item $tunnelOut, $tunnelErr -Force -ErrorAction SilentlyContinue

Write-Host "Starting local server on port $port..." -ForegroundColor DarkGray
$javaArgs = @(
    "-Dfile.encoding=UTF-8",
    "--add-modules", "jdk.httpserver",
    "-cp", $outDir,
    "TravelPlannerServer",
    "--online",
    "--port", "$port"
)
$server = Start-Process -FilePath "java" -ArgumentList $javaArgs -WorkingDirectory $root `
    -WindowStyle Hidden -PassThru -RedirectStandardOutput $serverOut -RedirectStandardError $serverErr

$healthy = $false
for ($i = 0; $i -lt 40; $i++) {
    Start-Sleep -Milliseconds 500
    try {
        $health = Invoke-WebRequest "http://127.0.0.1:$port/api/health" -UseBasicParsing -TimeoutSec 2
        if ($health.StatusCode -eq 200) { $healthy = $true; break }
    } catch { }
    if ($server.HasExited) { break }
}
if (-not $healthy) {
    Write-Host "Local server did not start. Log:" -ForegroundColor Red
    if (Test-Path $serverOut) { Get-Content $serverOut -Tail 30 }
    if (Test-Path $serverErr) { Get-Content $serverErr -Tail 30 }
    if (-not $server.HasExited) { Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue }
    Read-Host "Press Enter to exit"
    exit 1
}

$tunnelProcess = $null
$urlPattern = $null
$tunnelLabel = ""

if ($hasCloudflared) {
    Write-Host "Opening Cloudflare Tunnel..." -ForegroundColor DarkGray
    $cfArgs = @(
        "tunnel",
        "--url", "http://127.0.0.1:$port",
        "--no-autoupdate"
    )
    $tunnelProcess = Start-Process -FilePath $cloudflared -ArgumentList $cfArgs -WorkingDirectory $root `
        -WindowStyle Hidden -PassThru -RedirectStandardOutput $tunnelOut -RedirectStandardError $tunnelErr
    $urlPattern = 'https://[a-z0-9-]+\.trycloudflare\.com'
    $tunnelLabel = "Cloudflare Tunnel"
} else {
    Write-Host "Opening localhost.run tunnel..." -ForegroundColor DarkGray
    $sshArgs = @(
        "-T",
        "-o", "StrictHostKeyChecking=no",
        "-o", "UserKnownHostsFile=NUL",
        "-o", "ServerAliveInterval=30",
        "-o", "ConnectTimeout=20",
        "-R", "80:localhost:$port",
        "nokey@localhost.run"
    )
    $tunnelProcess = Start-Process -FilePath "ssh" -ArgumentList $sshArgs -WorkingDirectory $root `
        -WindowStyle Hidden -PassThru -RedirectStandardOutput $tunnelOut -RedirectStandardError $tunnelErr
    $urlPattern = 'https://[a-zA-Z0-9.-]+\.lhr\.life'
    $tunnelLabel = "localhost.run"
}

$url = $null
for ($i = 0; $i -lt 90; $i++) {
    Start-Sleep -Milliseconds 500
    $text = ""
    if (Test-Path $tunnelOut) { $text += (Get-Content $tunnelOut -Raw -ErrorAction SilentlyContinue) }
    if (Test-Path $tunnelErr) { $text += "`n" + (Get-Content $tunnelErr -Raw -ErrorAction SilentlyContinue) }
    if ($text -match $urlPattern) {
        $url = $Matches[0]
        break
    }
    if ($tunnelProcess.HasExited) { break }
}

if (-not $url) {
    Write-Host "Public tunnel failed. Log:" -ForegroundColor Red
    if (Test-Path $tunnelOut) { Get-Content $tunnelOut -Tail 25 }
    if (Test-Path $tunnelErr) { Get-Content $tunnelErr -Tail 25 }
    if ($tunnelProcess -and -not $tunnelProcess.HasExited) { Stop-Process -Id $tunnelProcess.Id -Force -ErrorAction SilentlyContinue }
    if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue }
    Write-Host "Retry later, or deploy with DEPLOY.md." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

$url | Set-Content -LiteralPath (Join-Path $dataDir "public-url.txt") -Encoding utf8
$code | Set-Content -LiteralPath (Join-Path $dataDir "access-code.txt") -Encoding utf8
try { Set-Clipboard -Value $url } catch { }

Write-Host ""
Write-Host "  JOURNEY - ONLINE" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  Phone URL   $url" -ForegroundColor White
Write-Host "  Access code $code" -ForegroundColor White
Write-Host "  Tunnel      $tunnelLabel" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  URL copied to clipboard. Send it to your phone and open it." -ForegroundColor Green
Write-Host "  Keep this window and this computer on while you are away." -ForegroundColor Yellow
Write-Host "  For a permanent URL that survives shutdown, see DEPLOY.md." -ForegroundColor DarkGray
Write-Host ""
Write-Host "  Press Ctrl+C to stop." -ForegroundColor DarkGray

try {
    while ($true) {
        Start-Sleep -Seconds 2
        if ($server.HasExited) {
            Write-Host "Local server exited." -ForegroundColor Yellow
            break
        }
        if ($tunnelProcess.HasExited) {
            Write-Host "Public tunnel disconnected. Run this script again." -ForegroundColor Yellow
            break
        }
    }
} finally {
    Write-Host "`nStopping Journey..." -ForegroundColor DarkGray
    if ($tunnelProcess -and -not $tunnelProcess.HasExited) { Stop-Process -Id $tunnelProcess.Id -Force -ErrorAction SilentlyContinue }
    if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue }
}
