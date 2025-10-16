# PowerShell helper to run server detached
# Usage: .\runDetached.ps1
$script = Join-Path $PSScriptRoot '..\server.js'
# Start-Process: avoid using -NoNewWindow together with -WindowStyle
# Run node in a new process hidden from view
Start-Process -FilePath node -ArgumentList "`"$script`"" -WindowStyle Hidden -WorkingDirectory (Split-Path $script -Parent) -PassThru | Out-Null
Write-Output "Started server detached for $script"