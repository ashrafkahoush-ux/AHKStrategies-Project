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

module.exports = async function handler(req, res){
  try{
    const publicDir = path.join(process.cwd(), 'public', 'assets');
    try{ await fs.access(publicDir); }catch(e){ return res.status(200).json({ generatedAt: new Date().toISOString(), total:0, page:1, limit:0, items:{} }); }
    const groups = await walkAssets(publicDir, '');
    const q = (req && req.query) || {};
    const type = q.type;
    const latest = q.latest === 'true' || q.latest === true;
    const page = parseInt(q.page||1,10) || 1;
    const limit = Math.min(200, Math.max(10, parseInt(q.limit||50,10) || 50));

    let all = [];
    for(const k of Object.keys(groups)) all = all.concat(groups[k]);
    if(type) all = all.filter(a=>a.filetype===type);
    all.sort((a,b)=> new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
    if(latest){ const latestMap = {}; for(const item of all){ const key = item.filename.toLowerCase(); if(!latestMap[key]) latestMap[key]=item; } all = Object.values(latestMap); }
    const total = all.length; const start = (page-1)*limit; const paged = all.slice(start, start+limit);
    const itemsGrouped = {}; for(const it of paged){ const folder = it.path.split('/')[1] || '/'; itemsGrouped[folder]=itemsGrouped[folder]||[]; itemsGrouped[folder].push(it); }
    const payload = { generatedAt: new Date().toISOString(), total, page, limit, items: itemsGrouped };
    res.setHeader('cache-control','no-cache'); res.setHeader('x-assets-cache','MISS'); return res.status(200).json(payload);
  }catch(err){ console.error('assets api js error', err); return res.status(500).json({ error: 'internal' }); }
};
