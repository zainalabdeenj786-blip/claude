// Export the 3-pack pouch arrangements used in the ads as transparent PNGs. usage: node export-trio.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const POUCH = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'pouch.png')).toString('base64');
const H = 926; // pouch.png native height: centre pouch is rendered 1:1, never upscaled
const p = (x, y, h, rot, z, sh) => `<img src="${POUCH}" style="position:absolute;left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg);z-index:${z};
  ${sh ? `filter:drop-shadow(0 ${h * .04}px ${h * .04}px rgba(20,15,40,.35)) drop-shadow(0 ${h * .01}px ${h * .012}px rgba(20,15,40,.3))` : ''}">`;
const W = H * .697, CX = 1200, TOP = 150;
const layouts = {
  // fanned, as in the 3-pack ads
  'fanned': sh => p(CX - W * 1.15, TOP + H * .1, H * .86, -7, 1, sh) + p(CX + W * .29, TOP + H * .1, H * .86, 7, 1, sh) + p(CX - W / 2, TOP, H, 0, 2, sh),
  // straight, as in the bundle price ad
  'straight': sh => p(CX - W * 1.05, TOP + H * .07, H * .86, 0, 1, sh) + p(CX + W * .32, TOP + H * .07, H * .86, 0, 1, sh) + p(CX - W / 2, TOP, H, 0, 2, sh),
  // three in a row, same size
  'row': sh => [0, 1, 2].map(i => p(CX - W * 1.55 + i * W * 1.05, TOP, H, 0, 1, sh)).join(''),
};
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 2400, height: 1300 } });
  for (const [name, f] of Object.entries(layouts)) for (const sh of [true, false]) {
    await pg.setContent(`<html><body style="margin:0;background:transparent">${f(sh)}</body></html>`);
    await pg.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
    const file = path.join(out, `rizqpure-3-pack-${name}${sh ? '' : '-no-shadow'}.png`);
    await pg.screenshot({ path: file, omitBackground: true }); console.log(file);
  }
  await b.close();
})();
