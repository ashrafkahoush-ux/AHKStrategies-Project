param(
    [switch]$RunOnce
)

# Simple validation script: runs TypeScript check and attempts eslint --fix if available.
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $projectRoot

$logDir = Join-Path $projectRoot '.watch'
if(-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
$logFile = Join-Path $logDir 'watch.log'

function Log($msg) {
    $line = "$(Get-Date -Format o) - $msg"
    $line | Tee-Object -FilePath $logFile -Append
    Write-Host $line
}

function Run-Checks {
    Log "Starting validation run..."

    # TypeScript check
    try {
        $tsOut = & npx tsc --noEmit 2>&1
        if ($LASTEXITCODE -eq 0) { Log "TypeScript: OK" } else { Log "TypeScript errors:`n$tsOut" }
    } catch {
        Log "TypeScript: failed to run tsc. Is TypeScript installed? $_"
    }

    # ESLint fix (if configured)
    try {
        & npx eslint --version > $null 2>&1
        if ($LASTEXITCODE -eq 0) {
            $esOut = & npx eslint --ext .ts,.tsx src components pages --fix 2>&1
            Log "ESLint output:`n$esOut"
        } else { Log "ESLint not available or not configured." }
    } catch {
        Log "ESLint: failed to run; skipping. $_"
    }

    # Check Hero and index consistency
    $hero = Get-ChildItem -Path . -Recurse -Include Hero.tsx -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($hero) {
        $c = Get-Content $hero.FullName -Raw
        if ($c -match "useEffect" -and $c -match "fetch") { Log "Hero check: OK (useEffect & fetch present)" } else { Log "Hero check: Warning - missing useEffect or fetch" }
    } else { Log "Hero check: Not found" }

    $index = Get-ChildItem -Path src -Recurse -Include index.tsx -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($index) {
        $c = Get-Content $index.FullName -Raw
        if ($c -match "dynamic\(" -and $c -match "ssr:\s*false") { Log "Index check: OK (dynamic import with ssr:false)" } else { Log "Index check: Warning - dynamic import or ssr:false missing" }
    } else { Log "Index check: Not found" }

    # Final workspace clean check (simple heuristic)
    if ($LASTEXITCODE -eq 0) { Log "Validation: Completed. TypeScript returned success in this run." } else { Log "Validation: Completed with issues." }
}

Run-Checks

if ($RunOnce) { exit 0 }

Log "do-validation.ps1 initialized (RunOnce=false)."
exit 0
