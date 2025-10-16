param(
    [int]$Port = 8080,
    [int]$TimeoutSec = 20
)

Write-Host "Running in: $(Get-Location)"
if(-not (Test-Path -Path "server.js")){
    Write-Host "ERROR: server.js not found in current directory"; exit 1
}

$proc = Start-Process node -ArgumentList 'server.js' -WorkingDirectory (Get-Location) -PassThru
Write-Host "Started node PID=$($proc.Id)"

$ready = $false
for($i=0; $i -lt $TimeoutSec; $i++){
    if(Test-NetConnection -ComputerName 'localhost' -Port $Port -InformationLevel Quiet){ $ready = $true; break }
    Start-Sleep -Seconds 1
}

if(-not $ready){
    Write-Host "ERROR: server did not open port $Port within $TimeoutSec seconds"
    try{ Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue } catch {}
    exit 2
}

Write-Host "Server is listening on :$Port"
try{
    $h = curl.exe "http://localhost:$Port/health" --max-time 5
    Write-Host "health: $h"
} catch {
    Write-Host "health check failed"
}

Write-Host "Running npm test..."
Push-Location
Set-Location (Get-Location)
$env:CI = 'true'
npm test
$rc = $LASTEXITCODE
Pop-Location

Write-Host "Cypress exit code: $rc"
try{ Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue } catch {}
Write-Host "Stopped server PID=$($proc.Id)"
exit $rc
