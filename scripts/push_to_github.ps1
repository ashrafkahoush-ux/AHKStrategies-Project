$ErrorActionPreference = "Stop"

# ==== Fixed settings for this task ====
$GITHUB_OWNER   = "ashrafkahoush-ux"
$REPO_NAME      = "AHKStrategies_Website"
$VISIBILITY     = "private"            # change to "public" if desired
$DEFAULT_BRANCH = "main"
$REMOTE_NAME    = "origin"
$REMOTE_URL     = "git@github.com:$GITHUB_OWNER/$REPO_NAME.git"

# 0) SSH check (non-fatal)
try { ssh -o StrictHostKeyChecking=accept-new -T git@github.com | Out-Null } catch {}

# 1) Ensure git repo exists
if (-not (Test-Path ".git")) { git init | Out-Null }

# 2) Ensure basic files exist
if (-not (Test-Path "README.md")) { "# $REPO_NAME" | Out-File -Encoding utf8 "README.md" }
if (-not (Test-Path ".gitignore")) {
@"
# OS
.DS_Store
Thumbs.db

# Python
__pycache__/
*.py[cod]
*.egg-info/
.venv/
venv/

# Node
node_modules/
npm-debug.log*
yarn-error.log*
dist/
build/

# Others
.env
.coverage
.cache/
"@ | Out-File -Encoding utf8 ".gitignore"
}

# 3) Stage & commit if needed
git add -A
$hasHead = (git rev-parse --verify HEAD 2>$null) -ne $null
# determine if there are staged changes
git diff --cached --quiet
$hasStaged = ($LASTEXITCODE -ne 0)
if ($hasStaged) {
  if ($hasHead) { git commit -m "chore: bootstrap repo sync" | Out-Null }
  else { git commit -m "Initial commit" | Out-Null }
}

# 4) Ensure default branch
git branch -M $DEFAULT_BRANCH

# 5) Create remote repo if missing (prefer gh CLI; otherwise continue)
$gh = Get-Command gh -ErrorAction SilentlyContinue
if ($gh) {
  $exists = $true
  try { gh repo view "$GITHUB_OWNER/$REPO_NAME" | Out-Null } catch { $exists = $false }
  if (-not $exists) {
    gh repo create "$GITHUB_OWNER/$REPO_NAME" --$VISIBILITY --disable-wiki --disable-issues | Out-Null
  }
} else {
  Write-Host "⚠ gh (GitHub CLI) not found. If repo doesn't exist yet, create it at $REMOTE_URL then re-run push."
}

# 6) Set/Update remote to SSH
if (git remote get-url $REMOTE_NAME 2>$null) {
  git remote set-url $REMOTE_NAME $REMOTE_URL | Out-Null
} else {
  git remote add $REMOTE_NAME $REMOTE_URL | Out-Null
}

# 7) Push with upstream
git push -u $REMOTE_NAME $DEFAULT_BRANCH

# 8) Optional: basic branch protection (best-effort)
if ($gh) {
  try {
    gh api -X PUT `
      "repos/$GITHUB_OWNER/$REPO_NAME/branches/$DEFAULT_BRANCH/protection" `
      -H "Accept: application/vnd.github+json" `
      -F required_status_checks='null' `
      -F enforce_admins='true' `
      -F restrictions='null' `
      -F required_pull_request_reviews='{"required_approving_review_count":1}' | Out-Null
  } catch {}
}

# 9) Summary
$head = (git rev-parse --short HEAD).Trim()
$httpsURL = "https://github.com/$GITHUB_OWNER/$REPO_NAME"
Write-Host "`n✅ Repo ready:"
Write-Host "   URL: $httpsURL"
Write-Host "   Remote: $REMOTE_NAME -> $REMOTE_URL"
Write-Host "   Default branch: $DEFAULT_BRANCH"
Write-Host "   HEAD: $head"
