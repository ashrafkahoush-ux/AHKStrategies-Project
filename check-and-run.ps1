exit
# AHKStrategies Environment Auto‑Check & Bootstrap
Write-Host "🔍 Starting Full Environment Check..." -ForegroundColor Cyan

$projectPath = "C:\Users\ashra\ahkstrategies-project"
Set-Location $projectPath
$checklist = @{}

function Ensure-File {
    param($name, $content)
    $path = Join-Path $projectPath $name
    if (!(Test-Path $path)) {
        Write-Host "🛠️ Creating $name" -ForegroundColor Yellow
        Set-Content -Path $path -Value $content -Encoding UTF8
        $checklist[$name] = "⚠️ Created"
    } else {
        $checklist[$name] = "✅ Found"
    }
}

# ---------- Required files ----------
$envLocal = @"
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=file:./dev.db
"@
$tsConfig = @"
{
  ""compilerOptions"": {
    ""target"": ""ES6"",
    ""module"": ""CommonJS"",
    ""strict"": true,
    ""esModuleInterop"": true,
    ""forceConsistentCasingInFileNames"": true,
    ""skipLibCheck"": true
  }
}
"@
$nextConfig = @"
module.exports = {
  reactStrictMode: true,
  swcMinify: true
};
"@
$pkgJson = @"
{
  ""name"": ""ahkstrategies-project"",
  ""version"": ""1.0.0"",
  ""scripts"": {
    ""dev"": ""next dev"",
    ""build"": ""next build"",
    ""start"": ""next start""
  },
  ""dependencies"": {
    ""next"": ""^13.5.6"",
    ""react"": ""^18.2.0"",
    ""react-dom"": ""^18.2.0"",
    ""typescript"": ""^5.0.0""
  }
}
"@

Ensure-File ".env.local"   $envLocal
Ensure-File "tsconfig.json" $tsConfig
Ensure-File "next.config.js" $nextConfig
Ensure-File "package.json"  $pkgJson

# ---------- Tools check ----------
function Try-Run($cmd, $desc) {
    try { & $cmd | Out-Null; $true } catch { Write-Host "$desc missing." -ForegroundColor Red; $false }
}

if (Try-Run {node -v} "Node.js")   { $checklist["Node.js"] = "✅ $(node -v)" } else { $checklist["Node.js"] = "❌" }
if (Try-Run {npm -v} "npm")        { $checklist["npm"]     = "✅ $(npm -v)"   } else { $checklist["npm"]     = "❌" }
if (Try-Run {git --version} "Git") { $checklist["Git"]     = "✅ $(git --version)" } else { $checklist["Git"] = "❌" }

if (!(Get-Command tsc -ErrorAction SilentlyContinue)) {
    Write-Host "Installing TypeScript globally..." -ForegroundColor Yellow
    npm install -g typescript
}
$checklist["TypeScript"] = "✅ $(tsc -v)"

# ---------- npm install ----------
Write-Host "📦 Running npm install..." -ForegroundColor Green
npm install | Out-Null

# ---------- Summary ----------
Write-Host "`n📋 Final Environment Checklist:" -ForegroundColor Cyan
foreach ($i in $checklist.GetEnumerator()) {
    Write-Host ("{0,-18}: {1}" -f $i.Key, $i.Value)
}

# ---------- Launch ----------
if ($checklist.Values -notcontains "❌") {
    Write-Host "`n🚀 All good! Launching project..." -ForegroundColor Green
    npm run dev
} else {
    Write-Host "`n⚠️ Please fix the issues above then re-run." -ForegroundColor Red
}
