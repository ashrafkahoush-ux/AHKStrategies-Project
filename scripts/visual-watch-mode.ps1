# Visual Watch Mode for AHKStrategies
# Watches /public/assets/ai_visuals/ for new PNG, JPG, MP4, WEBM files
# Copies new files to /public/assets/ai_visuals/live/, updates Hero.tsx media bindings, logs syncs, and supports a stop command

param(
    [switch]$Stop
)

$watcherPath = "C:\Users\ashra\ahkstrategies-project\public\assets\ai_visuals"
$livePath = "$watcherPath\live"
$logPath = "C:\Users\ashra\ahkstrategies-project\.maintenance\visuals.log"
$heroPath = "C:\Users\ashra\ahkstrategies-project\src\components\Hero.tsx"
$indexPath = "C:\Users\ashra\ahkstrategies-project\src\pages\index.tsx"

if ($Stop) {
    if ($global:VisualWatcher) {
        $global:VisualWatcher.EnableRaisingEvents = $false
        $global:VisualWatcher.Dispose()
        $global:VisualWatcher = $null
        Write-Host "Visual Watch Mode stopped."
    } else {
        Write-Host "No active Visual Watch Mode found."
    }
    return
}

if (-not (Test-Path $livePath)) { New-Item -ItemType Directory -Path $livePath | Out-Null }

$filter = '*.png','*.jpg','*.jpeg','*.mp4','*.webm'

$onCreated = {
    $file = $Event.SourceEventArgs.FullPath
    $name = $Event.SourceEventArgs.Name
    $ext = [System.IO.Path]::GetExtension($file).ToLower()
    if ($ext -notin '.png','.jpg','.jpeg','.mp4','.webm') { return }
    Copy-Item $file -Destination $livePath -Force
    # Find latest still and motion
    $stills = Get-ChildItem $livePath -Include *.png,*.jpg,*.jpeg -File | Sort-Object LastWriteTime -Descending
    $motions = Get-ChildItem $livePath -Include *.mp4,*.webm -File | Sort-Object LastWriteTime -Descending
    $latestStill = $stills | Select-Object -First 1
    $latestMotion = $motions | Select-Object -First 1
    # Update Hero.tsx media bindings only
    $hero = Get-Content $heroPath -Raw
    $hero = $hero -replace '(?<=src=")[^"]*ai_visuals\/live\/[^\"]*', "ai_visuals/live/$($latestStill.Name)"
    if ($latestMotion) {
        $hero = $hero -replace '(?<=video src=")[^"]*ai_visuals\/live\/[^\"]*', "ai_visuals/live/$($latestMotion.Name)"
    }
    Set-Content $heroPath $hero
    # Touch index.tsx to trigger rebuild
    (Get-Content $indexPath) | Set-Content $indexPath
    # Log
    $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    Add-Content $logPath "[$timestamp] Synced $name → Hero section updated."
}

$watcher = New-Object IO.FileSystemWatcher $watcherPath, "*.*"
$watcher.IncludeSubdirectories = $false
$watcher.EnableRaisingEvents = $true
Register-ObjectEvent $watcher Created -Action $onCreated | Out-Null
$global:VisualWatcher = $watcher
Write-Host "Visual Sync Mode active for AHKStrategies."
