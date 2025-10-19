Write-Host "=== 🚀 AHKStrategies Auto Repair & Launch ===" -ForegroundColor Cyan

# Ensure correct directory
Set-Location "C:\Users\ashra\ahkstrategies-project"

# Check for package.json
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json not found! Please ensure you're in the project root." -ForegroundColor Red
    exit
}

# Detect missing node_modules or next binary
if (-not (Test-Path "node_modules\.bin\next")) {
    Write-Host "📦 Installing full stack (Next, React, TS, Types)... Please wait..." -ForegroundColor Yellow
    npm install next@15.0.3 react@18.3.1 react-dom@18.3.1 typescript@5.6.3 `
      @types/react@18.3.8 @types/react-dom@18.3.0 @types/node@20.11.24 --legacy-peer-deps
}

# Confirm installation success
if (-not (Test-Path "node_modules\.bin\next")) {
    Write-Host "⚠️ Next.js binary still missing — installation may have failed." -ForegroundColor Red
    exit
}

# Clean cache
Write-Host "🧹 Cleaning cache..." -ForegroundColor Cyan
npx rimraf .next | Out-Null

# Start server
Write-Host "⚙️ Starting Next.js development server on port 3002..." -ForegroundColor Cyan
npx next dev -p 3002

Write-Host "✅ Server started! Visit http://localhost:3002" -ForegroundColor Green
