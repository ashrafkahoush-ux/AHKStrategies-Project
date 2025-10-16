# PowerShell helper to run server detached
# Usage: .\runDetached.ps1
$script = Join-Path $PSScriptRoot '..\server.js'
Start-Process -FilePath node -ArgumentList "`"$script`"" -NoNewWindow -WindowStyle Hidden
Write-Output "Started server detached for $script"