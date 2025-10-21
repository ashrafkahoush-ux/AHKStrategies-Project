exit
# --- AHKStrategies Maintenance Stop Script ---
Write-Host "`n🧹 Stopping Maintenance Mode..." -ForegroundColor Yellow

Get-Process powershell | Where-Object { $_.MainWindowTitle -like "*maintenance-start*" } | ForEach-Object {
    Write-Host "Stopping process ID $($_.Id) — $($_.MainWindowTitle)" -ForegroundColor Gray
    Stop-Process -Id $_.Id -Force
}

Write-Host "✅ Maintenance Mode stopped successfully." -ForegroundColor Green
