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

function isAssetItem(obj: any): obj is AssetItem {
  return obj && typeof obj.path === 'string';
}

export async function fetchLatestVideo(){
  try{
    const data: any = await fetchAssets('type=video&latest=true&limit=20');
    const groups = data.items || data.videos || null;
    if(!groups) return null;
    // groups may be an object of arrays or a direct array
    const candidates: any[] = Array.isArray(groups) ? groups : Object.values(groups).flat();
    if(!candidates || candidates.length === 0) return null;
    const first = candidates[0];
    if(isAssetItem(first)) {
      return first.path.startsWith('/') ? first.path : '/'+first.path;
    }
    if(typeof first === 'string') {
      return first.startsWith('/') ? first : '/'+first;
    }
  }catch(e){ console.warn('fetchLatestVideo failed', e); }
  return null;
}


