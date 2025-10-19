function Start-Maintenance {
    param (
        [string]$WorkspacePath = "$env:USERPROFILE\ahkstrategies-project",
        [string]$LogDir = "$WorkspacePath\.maintenance",
        [string]$LogFile = "$WorkspacePath\.maintenance\maintenance.log"
    )

    # Ensure .maintenance directory exists
    if (-not (Test-Path $LogDir)) {
        New-Item -ItemType Directory -Path $LogDir | Out-Null
    }

    # Helper: timestamped safe logging
    function Write-Timestamped {
        param ([string]$Message, [string]$Color = "White")
        $time = Get-Date -Format "HH:mm:ss"
        Write-Host "[$time] $Message" -ForegroundColor $Color
        # Use Add-Content -NoClobber inside try/catch to prevent file-lock errors
        try {
            $encodedMsg = "[$time] $Message"
            [System.IO.File]::AppendAllText($LogFile, $encodedMsg + [Environment]::NewLine, [System.Text.Encoding]::UTF8)
        } catch {
            Start-Sleep -Milliseconds 150
            try {
                [System.IO.File]::AppendAllText($LogFile, $encodedMsg + [Environment]::NewLine, [System.Text.Encoding]::UTF8)
            } catch {
                Write-Host "[WARN] Could not log due to file lock, skipping line..." -ForegroundColor DarkYellow
            }
        }
    }

    $startTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Timestamped "=== Starting Maintenance Cycle ($startTime) ===" "Cyan"

    try {
        # --- ESLint ---
        Write-Timestamped "[Lint] Running ESLint checks..." "Yellow"
        npm run lint | ForEach-Object { Write-Timestamped $_ }

        # --- TypeScript ---
        Write-Timestamped "[TypeScript] Validating project..." "Yellow"
        npx tsc --noEmit | ForEach-Object { Write-Timestamped $_ }

        # --- Git Status ---
        Write-Timestamped "[Git] Checking repository status..." "Yellow"
        git status | ForEach-Object { Write-Timestamped $_ }

        # --- Completion ---
        $endTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Write-Timestamped "=== Maintenance Completed Successfully at $endTime ===" "Green"
    }
    catch {
        $errMsg = $_.Exception.Message
        Write-Timestamped "[ERROR] $errMsg" "Red"
    }
}
