const fs = require('fs');
const path = require('path');

const inPath = path.resolve(process.cwd(), 'cypress/results/a11y.json');
const outHtml = path.resolve(process.cwd(), 'cypress/results/a11y.html');

function summarize(violations){
  const counts = { critical:0, serious:0, moderate:0, minor:0 };
  violations.forEach(v => {
    const impact = v.impact || 'unknown';
    if(counts[impact] !== undefined) counts[impact]++;
  });
  return counts;
}

try{
  if(!fs.existsSync(inPath)){
    console.log('No a11y JSON found at', inPath);
    process.exit(0);
  }
  const raw = fs.readFileSync(inPath, 'utf8');
  const parsed = JSON.parse(raw);
  const violations = parsed.violations || [];
  const counts = summarize(violations);

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>A11Y Report</title><style>body{font-family:Arial,Helvetica,sans-serif;background:#0b0b0b;color:#eee;padding:20px}pre{background:#111;padding:10px;border-radius:6px;overflow:auto}table{border-collapse:collapse;width:100%;margin-bottom:16px}td,th{border:1px solid #222;padding:8px;text-align:left}</style></head><body><h1>Accessibility report</h1><p>Violations: ${violations.length}</p><ul><li>critical: ${counts.critical}</li><li>serious: ${counts.serious}</li><li>moderate: ${counts.moderate}</li><li>minor: ${counts.minor}</li></ul><h2>Raw JSON</h2><pre>${JSON.stringify(parsed, null, 2)}</pre></body></html>`;

  fs.mkdirSync(path.dirname(outHtml), { recursive: true });
  fs.writeFileSync(outHtml, html, 'utf8');

  // Print a concise summary for CI logs
  console.log('A11Y summary:', counts);
  if(violations.length > 0){
    // exit non-zero so the CI job can be marked failed by a later step if desired
    process.exitCode = 2;
  }
} catch (err){
  console.error('Error generating a11y report', err);
  process.exit(1);
}
