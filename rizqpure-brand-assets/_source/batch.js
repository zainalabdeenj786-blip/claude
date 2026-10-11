// usage: node batch.js outdir width file.svg...   (width<=0 => use svg's own width attr * |width|)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'), path=require('path');
(async()=>{
  const [outdir,wArg,...files]=process.argv.slice(2);
  const b=await chromium.launch(); const p=await b.newPage();
  for(const f of files){
    const svg=fs.readFileSync(f,'utf8');
    const vb=svg.match(/viewBox="([^"]+)"/)[1].split(/[ ,]+/).map(Number);
    let W=+wArg; if(W<=0) W=Math.round(+svg.match(/<svg[^>]*?width="([\d.]+)"/)[1]*(-W||1));
    const H=Math.round(W*vb[3]/vb[2]);
    await p.setViewportSize({width:W,height:H});
    await p.setContent(`<html><body style="margin:0;background:transparent">${svg.replace(/<\?xml[^>]*>/,'').replace(/<svg /,`<svg style="display:block;width:${W}px;height:${H}px" `)}</body></html>`);
    const out=path.join(outdir,path.basename(f).replace('.svg','.png'));
    await p.screenshot({path:out,omitBackground:true,clip:{x:0,y:0,width:W,height:H}});
    console.log(out,W,H);
  }
  await b.close();
})();
