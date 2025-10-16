const fs = require('fs');
const path = require('path');

const inPath = path.resolve(process.cwd(), 'cypress/results/a11y.json');
if(!fs.existsSync(inPath)){
  console.log('No a11y results found');
  process.exit(0);
}
try{
  const parsed = JSON.parse(fs.readFileSync(inPath,'utf8'));
  const violations = parsed.violations || [];
  const counts = violations.reduce((acc, v) => { const k = v.impact || 'unknown'; acc[k] = (acc[k]||0)+1; return acc; }, {});
  console.log('Accessibility violations summary:');
  console.log('| impact | count |');
  console.log('|--------|-------|');
  console.log(`| critical | ${counts.critical||0} |`);
  console.log(`| moderate | ${counts.moderate||0} |`);
  console.log(`| serious | ${counts.serious||0} |`);
  console.log(`Total violations: ${violations.length}`);

  // If running inside GitHub Actions, append a concise markdown table to the job summary
  const ghSummary = process.env.GITHUB_STEP_SUMMARY;
  if(ghSummary){
    try{
      const md = [];
      md.push('### Accessibility summary');
      md.push('');
      md.push('| impact | count |');
      md.push('|--------|-------|');
      md.push(`| critical | ${counts.critical||0} |`);
      md.push(`| moderate | ${counts.moderate||0} |`);
      md.push(`| serious | ${counts.serious||0} |`);
      md.push('');
      md.push(`Total violations: **${violations.length}**`);
      md.push('');
      fs.appendFileSync(ghSummary, md.join('\n'));
      console.log('Wrote summary to GITHUB_STEP_SUMMARY');
    }catch(err){ console.warn('Failed to write GITHUB_STEP_SUMMARY', err); }
  }

  if(violations.length > 0) process.exitCode = 2;
}catch(err){ console.error('Failed to read/parse a11y JSON', err); process.exit(1);} 
