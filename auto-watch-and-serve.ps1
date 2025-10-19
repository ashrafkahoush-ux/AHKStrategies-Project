Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

function Show-Toast {
    param($title, $message)
    $n = New-Object System.Windows.Forms.NotifyIcon
    $n.Icon = [System.Drawing.SystemIcons]::Information
    $n.BalloonTipTitle = $title
    $n.BalloonTipText = $message
    $n.Visible = $true
    $n.ShowBalloonTip(4000)
}

$projectPath = "C:\Users\ashra\ahkstrategies-project"
$publicAssets = "$projectPath\public\assets"
$npm = "C:\nvm4w\nodejs\npm.cmd"
$npmProcess = $null

function Start-NextServer {
    Write-Host "`n[START] Launching Next.js dev server..." -ForegroundColor Cyan
    Set-Location $projectPath
    $env:NODE_OPTIONS = "--max-old-space-size=4096"
    $global:npmProcess = Start-Process -FilePath $npm -ArgumentList "run","dev" -WorkingDirectory $projectPath -PassThru
    Show-Toast "AHKStrategies" "Dev server started — watching for updates."
}

function Stop-NextServer {
    if ($global:npmProcess -ne $null) {
        Write-Host "[STOP] Stopping dev server..." -ForegroundColor Red
        Stop-Process -Id $global:npmProcess.Id -Force
        $global:npmProcess = $null
    }
}

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $publicAssets
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.Filter = "*.*"

$action = {
    param($src, $e)
    $ext = [IO.Path]::GetExtension($e.FullPath)
    if ($ext -match "\.mp4|\.png|\.jpg|\.jpeg|\.webp|\.gif|\.glb|\.gltf") {
        Write-Host "`n[CHANGE] Asset changed: $($e.Name)" -ForegroundColor Yellow
        Stop-NextServer
        Start-Sleep -Seconds 2
        Start-NextServer
        [console]::beep(900,200)
        Show-Toast "AHKStrategies" "Server restarted — new asset: $($e.Name)"
    }
}

Register-ObjectEvent $watcher Changed -Action $action | Out-Null
Register-ObjectEvent $watcher Created -Action $action | Out-Null
Register-ObjectEvent $watcher Deleted -Action $action | Out-Null

Start-NextServer
Write-Host "`n[WATCHING] $publicAssets for updates..." -ForegroundColor Green
Write-Host "Press Ctrl + C to exit.`n" -ForegroundColor Gray

while ($true) {
    Start-Sleep -Seconds 10
}
