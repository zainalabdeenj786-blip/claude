// RizqPure Black Friday poster: A4 print (PNG 300dpi + vector PDF) and social sizes. usage: node poster.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, w = 'normal', s = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/ttf;base64,${b64(F(f))});font-weight:${w};font-style:${s}}`;
const FONTS = face('DM Sans', 'DMSans%5Bopsz,wght%5D.ttf', '100 1000') + face('Playfair', 'PlayfairDisplay%5Bwght%5D.ttf', '400 900') +
  face('Playfair', 'PlayfairDisplay-Italic%5Bwght%5D.ttf', '400 900', 'italic') + face('Anton', 'Anton-Regular.ttf');
const POUCH = 'data:image/png;base64,' + b64(path.join(__dirname, 'pouch.png'));

const GOLD = '#C9A35E', GOLDL = '#F2C462', BLACK = '#0B0B12';
const OFF = '25%', GIFT = 'FREE Maximise Guide';
const CLAIM = 'Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.';

// Everything is laid out on a 1240-wide canvas and scaled by `k` for other sizes.
const poster = (W, H, k) => {
  const pouch = (x, y, h, rot, z) => `<img class="a" src="${POUCH}" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg);z-index:${z};
    filter:drop-shadow(0 ${h * .06}px ${h * .06}px rgba(0,0,0,.6))">`;
  const trio = (cx, top, h) => { const w = h * .7; return pouch(cx - w * 1.18, top + h * .08, h * .88, -9, 1) + pouch(cx + w * .3, top + h * .08, h * .88, 9, 1) + pouch(cx - w / 2, top, h, 0, 2); };
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
  *{margin:0;padding:0;box-sizing:border-box} html,body{width:${W}px;height:${H}px;overflow:hidden;background:${BLACK}}
  .s{position:absolute;left:0;top:0;width:1240px;height:${H / k}px;zoom:${k};font-family:'DM Sans';color:#fff;
    background:radial-gradient(70% 45% at 50% 52%,#2A2C4E 0%,#15162A 55%,${BLACK} 100%)}
  .a{position:absolute}
  @page{size:${W}px ${H}px;margin:0}</style></head><body><div class="s">
  <div class="a" style="inset:28px;border:3px solid ${GOLD};border-radius:10px;opacity:.7"></div>
  <div class="a" style="top:84px;width:100%;text-align:center;font-family:Playfair;font-weight:700;font-size:56px">RizqPure</div>
  <div class="a" style="top:164px;width:100%;text-align:center;font-size:26px;letter-spacing:10px;color:${GOLDL};font-weight:700">HALAL COLLAGEN · BACK IN STOCK</div>
  <div class="a" style="top:210px;width:100%;text-align:center;font-family:Anton;font-size:250px;line-height:1;letter-spacing:4px">BLACK<br>FRIDAY</div>
  <div class="a" style="top:740px;width:100%;text-align:center;font-family:Anton;font-size:300px;line-height:1;color:${GOLDL};text-shadow:0 10px 40px rgba(242,196,98,.25)">${OFF} OFF</div>
  <div class="a" style="top:1060px;width:100%;text-align:center;font-weight:800;font-size:46px;letter-spacing:2px">THE 3-PACK <span style="color:${GOLDL}">+ ${GIFT.toUpperCase()}</span></div>
  <div class="a" style="left:420px;top:1140px;width:400px;height:300px;border-radius:50%;background:radial-gradient(closest-side,rgba(242,196,98,.28),rgba(242,196,98,0))"></div>
  ${trio(620, 1150, 330)}
  <div class="a" style="left:120px;right:120px;top:1505px;border-top:3px solid ${GOLD};border-bottom:3px solid ${GOLD};padding:18px 0;text-align:center;
    font-family:Anton;font-size:76px;line-height:1;letter-spacing:2px;color:${GOLDL}">DON'T MISS IT TWICE.</div>
  <div class="a" style="top:1645px;width:100%;text-align:center;font-size:28px;font-weight:700;letter-spacing:4px;color:#E6E3F5">ENDS CYBER MONDAY · WHILE STOCK LASTS</div>
  <div class="a" style="bottom:38px;left:100px;right:100px;text-align:center;font-size:15px;color:rgba(255,255,255,.5)">*${CLAIM}</div>
  </div></body></html>`;
};

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const jobs = [['poster-black-friday-A4-print', 1240, 1754, 1, null, 2], ['poster-black-friday-1080x1528', 1080, 1528, 1080 / 1240, null, 1]];
  for (const [name, W, H, k, , dpr] of jobs) {
    const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: dpr });
    await p.setContent(poster(W, H, k)); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name + '.png') });
    console.log(name); await p.close();
  }
  // vector PDF: lay out at A4's CSS size (794x1123) so nothing needs scaling at print time
  const p = await b.newPage({ viewport: { width: 794, height: 1123 } });
  await p.setContent(poster(794, 1122, 794 / 1240)); await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: path.join(out, 'poster-black-friday-A4-print.pdf'), width: '210mm', height: '297mm', printBackground: true, pageRanges: '1' });
  await b.close();
})();
