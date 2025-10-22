param(
  [switch]$Execute
)

# -------- helpers --------
$ErrorActionPreference = "Stop"
$root = (Get-Location).Path
$timestamp = (Get-Date -Format "yyyyMMdd_HHmmss")
$backupDir = Join-Path $root "_backup\$timestamp"
$reportDir = Join-Path $root "artifacts"
$reportCsv = Join-Path $reportDir "repo_hygiene_report.csv"

function Confirm-Directory($p) { if (-not (Test-Path $p)) { New-Item -ItemType Directory -Path $p | Out-Null } }
function Write-LogRow([string]$Action,[string]$Path,[string]$Target,[string]$Reason,[string]$Result) {
  $global:rows += [pscustomobject]@{
    Action=$Action; Path=$Path; Target=$Target; Reason=$Reason; Result=$Result
  }
}
function Backup-File($path) {
  if (Test-Path $path) {
    $rel = Resolve-Path $path | ForEach-Object { $_.Path.Substring($root.Length).TrimStart('\') }
    $dest = Join-Path $backupDir $rel
    Confirm-Directory (Split-Path $dest -Parent)
    Copy-Item $path $dest -Force
  }
}
function Remove-ItemSafely($path,$reason) {
  if (Test-Path $path) {
    if ($Execute) { Backup-File $path; Remove-Item $path -Recurse -Force }
    Write-LogRow "REMOVE" $path "" $reason ($(if($Execute){"removed"}else{"would-remove"}))
  }
}
function Move-ItemSafely($src,$dst,$reason) {
  if (Test-Path $src) {
    Confirm-Directory (Split-Path $dst -Parent)
    if ($Execute) { Backup-File $src; Move-Item $src $dst -Force }
    Write-LogRow "MOVE" $src $dst $reason ($(if($Execute){"moved"}else{"would-move"}))
  }
}
function Set-ContentSafely($path,$content,$reason) {
  if ($Execute) { Backup-File $path; $content | Set-Content -Path $path -Encoding UTF8 }
  Write-LogRow "WRITE" $path "" $reason ($(if($Execute){"written"}else{"would-write"}))
}

$rows = @()
Confirm-Directory $reportDir
Confirm-Directory $backupDir

# -------- standardize directories --------
$publicAssets = Join-Path $root "public\assets"
$publicImages = Join-Path $publicAssets "images"
$publicVideos = Join-Path $root "public\videos"
Confirm-Directory $publicImages
Confirm-Directory $publicVideos

# 1) migrate /assets/* -> /public/assets/*
$legacyAssets = Join-Path $root "assets"
if (Test-Path $legacyAssets) {
  Get-ChildItem $legacyAssets -Recurse | ForEach-Object {
    if (-not $_.PSIsContainer) {
      $rel = $_.FullName.Substring($legacyAssets.Length).TrimStart('\')
      $dst = Join-Path $publicAssets $rel
      Move-ItemSafely $_.FullName $dst "Unify assets under /public/assets"
    }
  }
  # remove empty legacy folder
  try { Remove-ItemSafely $legacyAssets "Legacy assets folder (now empty or migrated)" } catch {}
}

# 2) move stray root images -> public/assets/images
$rootImages = @("opening image.png","vision.png","MENA region export business.png")
$rootImages | ForEach-Object {
  $src = Join-Path $root $_
  if (Test-Path $src) {
    $dst = Join-Path $publicImages (Split-Path $src -Leaf)
    Move-ItemSafely $src $dst "Move root image into /public/assets/images"
  }
}

# 3) videos already under /public/videos (nothing to move), but verify existence
#    (no action if missing; only log)
$expectedVideos = @(
  "background.mp4","human-intelligence.mp4","innovation.mp4","intro-video.mp4",
  "legacy.mp4","people.mp4","projects-opportunities.mp4","vision.mp4"
)
$expectedVideos | ForEach-Object {
  $p = Join-Path $publicVideos $_
  if (-not (Test-Path $p)) {
    Write-LogRow "MISSING" $p "" "Referenced in UI; ensure file exists" "missing"
  } else {
    Write-LogRow "CHECK" $p "" "Video present" "ok"
  }
}

# 4) remove legacy HTML in root
$legacyHtml = @("index.html","index.html.bak","served.html","served2.html","served.inspect.txt","served-head.txt")
$legacyHtml | ForEach-Object {
  Remove-ItemSafely (Join-Path $root $_) "Legacy static HTML outside Next pipeline"
}

# 5) Tailwind: remove stray config inside src/pages
$badTailwind = Join-Path $root "src\pages\tailwind.config.js"
if (Test-Path $badTailwind) {
  Remove-ItemSafely $badTailwind "Duplicate/incorrect Tailwind config; keep root config only"
}

# 6) CSS: dedupe global.css (prefer root styles\global.css)
$rootGlobal = Join-Path $root "styles\global.css"
$srcGlobal  = Join-Path $root "src\styles\global.css"
if ((Test-Path $rootGlobal) -and (Test-Path $srcGlobal)) {
  # Keep root; remove src version
  Remove-ItemSafely $srcGlobal "Duplicate global.css (keeping styles\global.css)"
} elseif ((-not (Test-Path $rootGlobal)) -and (Test-Path $srcGlobal)) {
  # Move src -> root
  Move-ItemSafely $srcGlobal $rootGlobal "Consolidate global.css at styles\"
}

# 7) unify video paths in code: /assets/videos/ -> /assets/backgrounds/
$codeGlobs = @(
  "src\**\*.js","src\**\*.jsx","src\**\*.ts","src\**\*.tsx","**\*.mdx"
)
$pattern = "/assets/videos/"
$replacement = "/videos/"
foreach ($glob in $codeGlobs) {
  Get-ChildItem -Path (Join-Path $root $glob) -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
    $text = Get-Content $_.FullName -Raw
    if ($text -like "*$pattern*") {
      $newText = $text -replace [regex]::Escape($pattern), $replacement
      Set-ContentSafely $_.FullName $newText "Unify video src paths to /videos/"
    }
  }
}

# 8) Tailwind content globs expansion in root tailwind.config.js
$tailwindRoot = Join-Path $root "tailwind.config.js"
if (Test-Path $tailwindRoot) {
  $tw = Get-Content $tailwindRoot -Raw
  $desiredContent = @(
    '  content: [',
    '    "./app/**/*.{js,ts,jsx,tsx,mdx}",',
    '    "./pages/**/*.{js,ts,jsx,tsx,mdx}",',
    '    "./src/**/*.{js,ts,jsx,tsx,mdx}",',
    '    "./components/**/*.{js,ts,jsx,tsx,mdx}"',
    '  ],'
  ) -join "`n"
  # Replace existing content: [...] block
  $newTw = $tw -replace 'content:\s*\[[\s\S]*?\],', $desiredContent
  if ($newTw -ne $tw) {
    Set-ContentSafely $tailwindRoot $newTw "Expand Tailwind content globs to include all app/pages/src/components"
  } else {
    Write-LogRow "CHECK" $tailwindRoot "" "Tailwind content already broad or pattern not found" "ok"
  }
} else {
  Write-LogRow "WARN" $tailwindRoot "" "tailwind.config.js not found at root" "missing"
}

# 9) generate CSV report
$rows | Export-Csv -Path $reportCsv -NoTypeInformation -Encoding UTF8

# 10) optional git branch+commit
try {
  if ($Execute) {
    $isGitRepo = $false
    try {
      $null = git rev-parse --is-inside-work-tree 2>&1
      $isGitRepo = $LASTEXITCODE -eq 0
    } catch {
      $isGitRepo = $false
    }

    if ($isGitRepo) {
      try {
        $null = git checkout -b "chore/repo-hygiene" 2>&1
      } catch {
      }
      git add -A
      $null = git commit -m "chore: repo hygiene (assets unification, css dedupe, tailwind content, legacy cleanup)" 2>&1
      Write-LogRow "GIT" "$root" "" "Committed repo hygiene changes" "committed"
    }
  }
} catch {
  Write-LogRow "GIT" "$root" "" "Git commit failed: $($_.Exception.Message)" "skipped"
}

Write-Host "============================================"
Write-Host " Repo Hygiene Completed: " $(if($Execute){"EXECUTED"}else{"DRY-RUN"})
Write-Host " Backup: $backupDir"
Write-Host " Report: $reportCsv"
Write-Host "============================================"
