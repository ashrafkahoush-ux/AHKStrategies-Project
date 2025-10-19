# --- AHKStrategies AI Visuals Watcher ---
# Monitors /public/assets/ai_visuals for new or changed files and auto-syncs with the dev server

$watchPath = "C:\Users\ashra\ahkstrategies-project\public\assets\ai_visuals"
$npm = "C:\nvm4w\nodejs\npm.cmd"

Write-Host "`n🧠 Watching $watchPath for changes..." -ForegroundColor Cyan

$fsw = New-Object IO.FileSystemWatcher $watchPath -Property @{
    IncludeSubdirectories = $true
    EnableRaisingEvents   = $true
}

$onChange = {
    $file = $Event.SourceEventArgs.FullPath
    Write-Host "`n✨ Updated asset detected: $file"
    Write-Host "🔁 Restarting Next.js dev server to reflect new visuals..."
    Stop-Process -Name "node" -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
    Start-Process $npm -ArgumentList "run", "dev" -WorkingDirectory "C:\Users\ashra\ahkstrategies-project" -NoNewWindow
}

Register-ObjectEvent $fsw Changed -Action $onChange | Out-Null
Register-ObjectEvent $fsw Created -Action $onChange | Out-Null
Register-ObjectEvent $fsw Deleted -Action $onChange | Out-Null

Write-Host "`nPress Ctrl + C to stop watching.`n" -ForegroundColor Gray
while ($true) { Start-Sleep -Seconds 10 }
