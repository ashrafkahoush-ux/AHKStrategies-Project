import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

type AssetItem = {
  filename: string;
  filetype: 'video'|'image'|'icon'|'background'|'other';
  path: string; // relative to /public
  lastModified: string; // ISO
  size: number;
};

type AssetsResponse = {
  generatedAt: string;
  total: number;
  page: number;
  limit: number;
  items: Record<string, AssetItem[]>; // grouped by subfolder under /assets
};

// Simple in-memory cache for production (invalidated in dev by NODE_ENV)
const CACHE_TTL = 15 * 1000; // 15s
let cache: { ts: number; data: AssetsResponse } | null = null;

function sanitizeSegment(s: string){
  // allow only simple filename chars, prevent directory traversal
  return s.replace(/[^a-zA-Z0-9._-]/g,'');
}

async function walkAssets(rootDir: string, rel = ''): Promise<Record<string, AssetItem[]>>{
  const dir = path.join(rootDir, rel);
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out: Record<string, AssetItem[]> = {};
  for(const e of entries){
    if(e.name.startsWith('.')) continue; // ignore dotfiles
    const seg = path.join(rel, e.name);
    const safeName = sanitizeSegment(e.name);
    if(e.isDirectory()){
      const sub = await walkAssets(rootDir, path.join(rel, safeName));
      // merge
      for(const k of Object.keys(sub)){
        out[k] = (out[k]||[]).concat(sub[k]);
      }
    } else if(e.isFile()){
      const p = path.join(dir, e.name);
      const stat = await fs.stat(p);
      const ext = path.extname(e.name).toLowerCase();
      let filetype: AssetItem['filetype'] = 'other';
      if(['.mp4','.webm','.mov','.m4v'].includes(ext)) filetype='video';
      else if(['.jpg','.jpeg','.png','.webp','.avif','.gif','.svg'].includes(ext)) filetype='image';
      else if(['.ico','.icns'].includes(ext)) filetype='icon';
      else if(['.jpg','.png','.svg'].includes(ext) && rel.includes('background')) filetype='background';

      const key = rel || '/';
      out[key] = out[key] || [];
      out[key].push({
        filename: e.name,
        filetype,
        path: path.join('assets', rel, e.name).replace(/\\/g,'/'),
        lastModified: new Date(stat.mtimeMs).toISOString(),
        size: stat.size
      });
    }
  }
  return out;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  // cache short-circuit
  const now = Date.now();
  if(cache && process.env.NODE_ENV === 'production'){
    if(now - cache.ts < CACHE_TTL){
      res.setHeader('x-assets-cache','HIT');
      return res.status(200).json(cache.data);
    }
  }

  try{
    const publicDir = path.join(process.cwd(), 'public', 'assets');
    // ensure exists
    try{ await fs.access(publicDir); } catch(err){
      return res.status(200).json({ generatedAt: new Date().toISOString(), total:0, page:1, limit:0, items:{} });
    }

    const groups = await walkAssets(publicDir, '');

    // optional filtering via query params
    const q = req.query || {};
    const type = (Array.isArray(q.type)? q.type[0] : q.type) as string | undefined;
    const latest = (q.latest === 'true' || q.latest === true);
    const page = parseInt((Array.isArray(q.page)? q.page[0] : (q.page||'1')),10) || 1;
    const limit = Math.min(200, Math.max(10, parseInt((Array.isArray(q.limit)? q.limit[0] : (q.limit||'50')),10) || 50));

    // flatten and filter
    let all: AssetItem[] = [];
    for(const k of Object.keys(groups)){
      all = all.concat(groups[k].map(it => ({ ...it })));
    }
    if(type){
      all = all.filter(a => a.filetype === type);
    }

    // sort by lastModified desc
    all.sort((a,b)=> new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    if(latest){
      const latestMap: Record<string, AssetItem> = {};
      for(const item of all){
        const key = item.filename.toLowerCase();
        if(!latestMap[key]) latestMap[key]=item;
      }
      all = Object.values(latestMap);
    }

    const total = all.length;
    const start = (page-1)*limit;
    const paged = all.slice(start, start+limit);

    // rebuild grouped result for the paged items
    const itemsGrouped: Record<string, AssetItem[]> = {};
    for(const it of paged){
      const folder = it.path.split('/')[1] || '/';
      itemsGrouped[folder] = itemsGrouped[folder] || [];
      itemsGrouped[folder].push(it);
    }

    const payload: AssetsResponse = {
      generatedAt: new Date().toISOString(),
      total,
      page,
      limit,
      items: itemsGrouped
    };

    // Cache in production
    if(process.env.NODE_ENV === 'production') cache = { ts: now, data: payload };

    res.setHeader('cache-control', 'no-cache');
    res.setHeader('x-assets-cache','MISS');
    return res.status(200).json(payload);
  }catch(err){
    console.error('assets API error', err);
    return res.status(500).json({ error: 'internal' });
  }
}
