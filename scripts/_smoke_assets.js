const fs = require('fs').promises;
const path = require('path');

function sanitizeSegment(s){ return s.replace(/[^a-zA-Z0-9._-]/g,''); }

async function walkAssets(rootDir, rel=''){
  const dir = path.join(rootDir, rel);
  let entries = [];
  try{ entries = await fs.readdir(dir, { withFileTypes: true }); }catch(e){ return {}; }
  const out = {};
  for(const e of entries){
    if(e.name.startsWith('.')) continue;
    const safeName = sanitizeSegment(e.name);
    if(e.isDirectory()){
      const sub = await walkAssets(rootDir, path.join(rel, safeName));
      for(const k of Object.keys(sub)) out[k] = (out[k]||[]).concat(sub[k]);
    } else if(e.isFile()){
      const p = path.join(dir, e.name);
      const stat = await fs.stat(p);
      const ext = path.extname(e.name).toLowerCase();
      let filetype='other';
      if(['.mp4','.webm','.mov','.m4v'].includes(ext)) filetype='video';
      else if(['.jpg','.jpeg','.png','.webp','.avif','.gif','.svg'].includes(ext)) filetype='image';
      const key = rel || '/';
      out[key] = out[key] || [];
      out[key].push({ filename:e.name, filetype, path: path.join('assets', rel, e.name).replace(/\\/g,'/'), lastModified: new Date(stat.mtimeMs).toISOString(), size: stat.size });
    }
  }
  return out;
}

(async ()=>{
  const publicDir = path.join(process.cwd(),'public','assets');
  const groups = await walkAssets(publicDir,'');
  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), items: groups }, null, 2));
})();


