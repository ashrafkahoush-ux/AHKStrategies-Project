const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', 'cypress', 'screenshots', 'hero_screenshot.cy.js', 'home-hero.png');
const dstDir = path.join(__dirname, '..', 'artifacts');
const dst = path.join(dstDir, 'home-hero.png');
if (!fs.existsSync(src)) {
  console.error('Source screenshot not found:', src);
  process.exit(2);
}
if (!fs.existsSync(dstDir)) fs.mkdirSync(dstDir);
fs.copyFileSync(src, dst);
console.log('Saved artifact to', dst);


