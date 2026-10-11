const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'), path=require('path');
(async()=>{
  const [outdir,...files]=process.argv.slice(2);
  const b=await chromium.launch(); const p=await b.newPage();
  for(const f of files){
    const svg=fs.readFileSync(f,'utf8');
    const vb=svg.match(/viewBox="([^"]+)"/)[1].split(/[ ,]+/).map(Number);
    const W=1000, H=W*vb[3]/vb[2];
    await p.setContent(`<html><head><style>@page{size:${W}px ${H}px;margin:0}html,body{margin:0}</style></head><body>${svg.replace(/<\?xml[^>]*>/,'').replace(/<svg /,`<svg style="display:block;width:${W}px;height:${H}px" `)}</body></html>`);
    await p.pdf({path:path.join(outdir,path.basename(f).replace('.svg','.pdf')),width:W+'px',height:Math.ceil(H)+'px',printBackground:true,pageRanges:'1'});
  }
  await b.close();
})();
