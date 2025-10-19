$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $projectRoot

Write-Host "Starting Watch Mode: monitoring src, components, pages..."

$paths = @("$projectRoot\src", "$projectRoot\components", "$projectRoot\pages")

foreach ($p in $paths) {
    if (-not (Test-Path $p)) { New-Item -ItemType Directory -Path $p | Out-Null }
}

$fsw = New-Object System.IO.FileSystemWatcher
$fsw.Path = "$projectRoot\src"
$fsw.IncludeSubdirectories = $true
$fsw.Filter = "*.*"
$fsw.EnableRaisingEvents = $true

$action = {
    $name = $Event.SourceEventArgs.FullPath
    $changeType = $Event.SourceEventArgs.ChangeType
    $msg = "File changed: $name ($changeType)"
    Write-Host $msg
    # debounce briefly
    Start-Sleep -Milliseconds 200
    try {
        & "$projectRoot\scripts\do-validation.ps1"
    } catch {
        Write-Host "Validation script failed: $_"
    }
}

Register-ObjectEvent $fsw Changed -Action $action | Out-Null
Register-ObjectEvent $fsw Created -Action $action | Out-Null
Register-ObjectEvent $fsw Renamed -Action $action | Out-Null

Write-Host "Watch Mode running. Say 'Stop Watch Mode' to stop." -ForegroundColor Green

while ($true) { Start-Sleep -Seconds 1 }
