# --- AHKStrategies Self-Healing Maintenance Start Script ---
Write-Host "`n🧠 Starting Self-Healing Maintenance Mode..." -ForegroundColor Cyan

$maintenanceDir = ".maintenance"
if (!(Test-Path $maintenanceDir)) { New-Item -ItemType Directory -Path $maintenanceDir | Out-Null }
$logFile = "$maintenanceDir\maintenance.log"
Write-Host "Logging to: $logFile`n" -ForegroundColor Gray

# Helper: Write to log
function Write-Log($msg) {
    $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    "$timestamp — $msg" | Out-File -Append -FilePath $logFile -Encoding utf8
}

# Initial cleanup
Write-Host "🧹 Cleaning temporary & notebook files..." -ForegroundColor Yellow
Get-ChildItem -Recurse -Include "Untitled-*.ipynb", "*.tmp", "*.bak" | Remove-Item -Force -ErrorAction SilentlyContinue
Write-Log "Deleted temp files and notebook artifacts."

# Loop every 10 minutes
while ($true) {
    $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    Write-Host "[$timestamp] Running environment checks..." -ForegroundColor Yellow
    Write-Log "Running environment check cycle."

    # 1. Lint & Type Check
    npm run lint --silent 2>&1 | Out-File -Append $logFile
    npx tsc --noEmit 2>&1 | Out-File -Append $logFile

    # 2. Fix missing packages
    Write-Host "🔍 Checking for missing dependencies..." -ForegroundColor Cyan
    $missing = npm ls --depth=0 2>&1 | Select-String "missing"
    if ($missing) {
        Write-Host "⚙️ Detected missing packages — reinstalling..." -ForegroundColor Yellow
        npm install | Out-File -Append $logFile
        Write-Log "Auto-reinstalled missing dependencies."
    }

    # 3. Refresh node_modules every 24 hours
    $hoursSinceLastReset = ((Get-Date) - (Get-Item $logFile).CreationTime).TotalHours
    if ($hoursSinceLastReset -ge 24) {
        Write-Host "♻️ Performing daily environment refresh..." -ForegroundColor Magenta
        Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
        npm cache clean --force | Out-File -Append $logFile
        npm install | Out-File -Append $logFile
        Write-Log "Daily node_modules refresh complete."
    }

    Write-Host "✅ Maintenance cycle complete. Sleeping for 10 minutes..." -ForegroundColor Green
    Write-Log "Cycle complete — sleeping for 10 minutes."
    Start-Sleep -Seconds 600
}
