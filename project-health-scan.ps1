# --- AHKStrategies Project Health Scan ---
$logFile = "C:\Users\ashra\ahkstrategies-project\smartlog.txt"
$reportFile = "C:\Users\ashra\ahkstrategies-project\health-report.txt"

Write-Host "`n🔍 Running AHKStrategies Health Scan..." -ForegroundColor Cyan
Start-Transcript -Path $reportFile -Append | Out-Null

# Run TypeScript and ESLint
Write-Host "`n🧠 Checking TypeScript..."
npx tsc --noEmit | Tee-Object -FilePath $logFile -Append

Write-Host "`n🧹 Running ESLint..."
npx eslint . --ext .js,.ts,.tsx | Tee-Object -FilePath $logFile -Append

# Check for dependency drift
Write-Host "`n📦 Checking dependencies..."
npm outdated | Tee-Object -FilePath $logFile -Append

# Analyze log
$warnings = (Select-String -Path $logFile -Pattern "warning" -SimpleMatch).Count
$errors = (Select-String -Path $logFile -Pattern "error" -SimpleMatch).Count

Write-Host "`n📊 Summary:" -ForegroundColor Yellow
Write-Host "Warnings: $warnings"
Write-Host "Errors:   $errors"

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "`n✅ Project is clean and ready for deploy." -ForegroundColor Green
} else {
    Write-Host "`n⚠️ Some issues remain. Check $logFile for details." -ForegroundColor Red
    Write-Host "`n💡 Common Fixes:"
    Write-Host "  • Missing imports → Run: npx eslint . --fix"
    Write-Host "  • Unused vars → Use VS Code Quick Fix (Ctrl+.)"
    Write-Host "  • Outdated deps → Run: npm update"
}

Stop-Transcript | Out-Null
Write-Host "`n🧾 Report saved to: $reportFile"
