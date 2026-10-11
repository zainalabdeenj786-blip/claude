const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
(async()=>{
  const [svgf,out,deg]=process.argv.slice(2);
  const svg=fs.readFileSync(svgf,'utf8').replace(/<\?xml[^>]*>/,'');
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1800,height:2300}});
  const shade = +deg>0 ? 'linear-gradient(90deg,rgba(0,0,0,0) 40%,rgba(0,0,0,.28))' : 'linear-gradient(270deg,rgba(0,0,0,0) 40%,rgba(0,0,0,.28))';
  await p.setContent(`<html><body style="margin:0;background:transparent"><div style="perspective:3400px;width:1800px;height:2300px;display:flex;align-items:center;justify-content:center">
   <div style="position:relative;transform:rotateY(${deg}deg);width:1400px">${svg.replace(/<svg /,'<svg style="display:block;width:1400px;height:auto" ')}
   </div></div></body></html>`);
  await p.screenshot({path:out,omitBackground:true});
  await b.close();
})();
