# --- AHKStrategies Smart Commit + Push v1 ---
# Automatically stages changes, commits, tags, and pushes to GitHub

$branch = "feature/homepage-redesign"
$tagVersion = "v0.5.1"
$tagMessage = "Hero update"
$commitMessage = "feat: integrate dynamic Hero with fallback and Smart Logger tracking"

Write-Host "`n== Starting Smart Commit + Push..." -ForegroundColor Cyan

# Navigate to repo root (defensive)
Set-Location "C:\Users\ashra\ahkstrategies-project"

# Ensure branch exists and switch if needed
$currentBranch = git branch --show-current
if ($currentBranch -ne $branch) {
    Write-Host "Switching to branch $branch..." -ForegroundColor Yellow
    git checkout -B $branch
}

# Stage all modified files
git add -A
Write-Host "[OK] All changes staged." -ForegroundColor Green

# Commit
git commit -m "$commitMessage"
if ($LASTEXITCODE -ne 0) {
    Write-Host "[INFO] Nothing new to commit." -ForegroundColor DarkYellow
} else {
    Write-Host "[OK] Commit created successfully." -ForegroundColor Green
}

# Create tag (idempotent)
$tagFull = "$tagVersion"
if (-not (git tag --list | Select-String "^$tagFull$")) {
    git tag -a $tagFull -m "$tagMessage"
    Write-Host "[OK] Tag $tagFull created: $tagMessage" -ForegroundColor Cyan
} else {
    Write-Host "[INFO] Tag $tagFull already exists." -ForegroundColor DarkYellow
}

# Push branch and tags
Write-Host "[INFO] Pushing changes to origin/$branch..." -ForegroundColor Yellow
git push -u origin $branch
if ($LASTEXITCODE -ne 0) { Write-Host "[ERROR] Failed to push branch." -ForegroundColor Red }

git push origin --tags
if ($LASTEXITCODE -ne 0) { Write-Host "[ERROR] Failed to push tags." -ForegroundColor Red }

# Confirm status
Write-Host "`n== Smart commit and push complete!" -ForegroundColor Green
Write-Host "Branch: $branch | Tag: $tagFull | Message: $commitMessage"
