export type AssetItem = {
  filename: string;
  filetype: string;
  path: string;
  lastModified: string;
  size: number;
};

export async function fetchAssets(query=''){ 
  const res = await fetch('/api/assets'+(query?('?'+query):''));
  if(!res.ok) throw new Error('failed to fetch assets');
  return res.json();
}

export async function fetchLatestVideo(){
  try{
    const data = await fetchAssets('type=video&latest=true&limit=20');
    const groups = data.items || {};
    const all = Object.values(groups).flat();
    if(all && all.length) return all[0].path.startsWith('/') ? all[0].path : '/'+all[0].path;
  }catch(e){ console.warn('fetchLatestVideo failed', e); }
  return null;
}
