const fs = require('fs');
const path = require('path');

async function loadJimp(){
  // dynamic import to support ESM-only builds
  const mod = await import('jimp');
  return mod.default || mod;
}

const images = [
  'vision.png',
  'opening image.png',
  'MENA region export business.png'
];

function toHex(r,g,b){
  return '#' + [r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
}

function quantizeColor([r,g,b], factor=24){
  return [ Math.round(r/factor)*factor, Math.round(g/factor)*factor, Math.round(b/factor)*factor ];
}

async function extractImage(imgPath){
  try{
    const Jimp = await loadJimp();
    const img = await Jimp.read(imgPath);
    // downscale to speed up
    img.resize(64, Jimp.AUTO);
    const counts = new Map();
    for(let y=0;y<img.bitmap.height;y++){
      for(let x=0;x<img.bitmap.width;x++){
        const idx = (y*img.bitmap.width + x) * 4;
        const r = img.bitmap.data[idx];
        const g = img.bitmap.data[idx+1];
        const b = img.bitmap.data[idx+2];
        const q = quantizeColor([r,g,b], 16);
        const key = q.join(',');
        counts.set(key, (counts.get(key)||0)+1);
      }
    }
    const arr = Array.from(counts.entries()).map(([k,v])=>({ color:k.split(',').map(Number), count:v }));
    arr.sort((a,b)=>b.count - a.count);
    const top = arr.slice(0,6).map(a=> toHex(...a.color) );
    return { top };
  }catch(err){
    return { error: String(err) };
  }
}

(async ()=>{
  const result = {};
  for(const img of images){
    const p = path.join(process.cwd(), img);
    if(!fs.existsSync(p)){
      result[img] = { error: 'file not found' };
      continue;
    }
    result[img] = await extractImage(p);
  }
  const outPath = path.join('scripts','palettes.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log('Wrote', outPath);
  console.log(JSON.stringify(result, null, 2));
  // Apply a simple mapping into index.html :root variables
  try{
    const vision = result['vision.png'];
    const opening = result['opening image.png'];
    const mena = result['MENA region export business.png'];
    const primary = (vision && vision.top && vision.top[0]) || '#60a5fa';
    const secondary = (opening && opening.top && opening.top[0]) || '#7c3aed';
    const gold = (mena && mena.top && mena.top[1]) || '#d4af37';
    const htmlPath = path.join(process.cwd(),'index.html');
    if(fs.existsSync(htmlPath)){
      let html = fs.readFileSync(htmlPath,'utf8');
      html = html.replace(/(--accent:\s*)(#[0-9a-fA-F]{3,6}|[^;]+)(;)/, `$1${primary}$3`);
      html = html.replace(/(--accent-2:\s*)(#[0-9a-fA-F]{3,6}|[^;]+)(;)/, `$1${secondary}$3`);
      html = html.replace(/(--gold:\s*)(#[0-9a-fA-F]{3,6}|[^;]+)(;)/, `$1${gold}$3`);
      fs.writeFileSync(htmlPath, html, 'utf8');
      console.log('Patched index.html with primary/secondary/gold colors');
    }
  }catch(e){ console.error('Could not apply palette to index.html', e); }
})();
