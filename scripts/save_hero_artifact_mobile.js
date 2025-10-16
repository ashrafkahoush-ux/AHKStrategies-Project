const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', 'cypress', 'screenshots', 'hero_screenshot_mobile.cy.js', 'home-hero-mobile.png');
const dstDir = path.join(__dirname, '..', 'artifacts');
const dst = path.join(dstDir, 'home-hero-mobile.png');
if (!fs.existsSync(src)) { console.error('Source mobile screenshot not found:', src); process.exit(2); }
if (!fs.existsSync(dstDir)) fs.mkdirSync(dstDir);
fs.copyFileSync(src, dst);
console.log('Saved mobile artifact to', dst);
