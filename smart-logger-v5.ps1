# --- AHKStrategies Smart Logger v5 ---
# Logs every change inside /public/assets and /src/components with timestamps

$logFile = "C:\Users\ashra\ahkstrategies-project\smartlog.txt"
$watchDirs = @(
  "C:\Users\ashra\ahkstrategies-project\public\assets",
  "C:\Users\ashra\ahkstrategies-project\src\components"
)

Write-Host "`n🧾 Smart Logger v5 active..." -ForegroundColor Green
Write-Host "Logging to $logFile`n"

function Write-Log($message) {
    $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    "$timestamp — $message" | Out-File -FilePath $logFile -Append -Encoding utf8
}

foreach ($dir in $watchDirs) {
    $fsw = New-Object IO.FileSystemWatcher $dir -Property @{
        IncludeSubdirectories = $true
        EnableRaisingEvents   = $true
    }

    Register-ObjectEvent $fsw Changed -Action { Write-Log "File changed: $($Event.SourceEventArgs.FullPath)" } | Out-Null
    Register-ObjectEvent $fsw Created -Action { Write-Log "File created: $($Event.SourceEventArgs.FullPath)" } | Out-Null
    Register-ObjectEvent $fsw Deleted -Action { Write-Log "File deleted: $($Event.SourceEventArgs.FullPath)" } | Out-Null
}

Write-Log "✅ Smart Logger v5 started successfully."
Write-Host "Press Ctrl + C to stop logging.`n" -ForegroundColor Gray
while ($true) { Start-Sleep -Seconds 10 }
