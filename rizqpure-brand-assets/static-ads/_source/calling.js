// "…is calling" static ads for RizqPure. usage: node calling.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const b64 = f => fs.readFileSync(f).toString('base64');
const FONT = `@font-face{font-family:'DM Sans';src:url(data:font/ttf;base64,${b64(path.join(__dirname, '../ad/fonts/DMSans%5Bopsz,wght%5D.ttf'))});font-weight:100 1000;}`;
const POUCH = 'data:image/png;base64,' + b64(path.join(__dirname, 'pouch.png'));

const ADS = [
  { key: 'halal-glow-up', head: 'Your halal glow-up', sub: 'is calling...' },
  { key: 'stronger-hair-nails', head: 'Stronger hair &amp; nails', sub: 'are calling...' },
  { key: 'collagen-you-can-trust', head: 'Collagen you can trust', sub: 'is calling...' },
];
const SIZES = [['square-1080x1080', 1080, 1080], ['feed-1080x1350', 1080, 1350], ['story-1080x1920', 1080, 1920]];

const decline = `<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 9.2c-3.3 0-6.3.9-8.7 2.5-.6.4-.9 1-.9 1.7v2.2c0 .7.7 1.2 1.4 1l3.2-1c.5-.2.9-.7.9-1.2v-1.6a12.5 12.5 0 0 1 8.2 0v1.6c0 .5.4 1 .9 1.2l3.2 1c.7.2 1.4-.3 1.4-1v-2.2c0-.7-.3-1.3-.9-1.7C18.3 10.1 15.3 9.2 12 9.2z"/></svg>`;
const accept = `<svg viewBox="0 0 24 24" fill="#fff"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>`;

function html(ad, W, H) {
  const story = H / W > 1.5, tall = H > W;
  const top = story ? 300 : (tall ? 90 : 62);
  const btnBottom = story ? 360 : (tall ? 70 : 46);
  const pouchH = story ? 700 : (tall ? 670 : 525);
  const pouchTop = story ? 540 : (tall ? 300 : 232);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONT}
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;overflow:hidden;position:relative;font-family:'DM Sans';color:#fff;
    background:linear-gradient(160deg,#8C4A97 0%,#C46A9E 28%,#EE97AA 55%,#F6B7B4 75%,#D886A9 100%)}
  .silk{position:absolute;inset:-10%;filter:blur(${W * 0.018}px)}
  .grain{position:absolute;inset:0;opacity:.06;mix-blend-mode:overlay;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
  .text{position:absolute;left:0;right:0;top:${top}px;text-align:center}
  h1{font-weight:700;font-size:${story ? 92 : 84}px;letter-spacing:-1px;line-height:1.05;text-shadow:0 2px 24px rgba(90,20,70,.25)}
  h2{font-weight:500;font-size:${story ? 50 : 44}px;margin-top:${story ? 18 : 10}px;text-shadow:0 2px 18px rgba(90,20,70,.25)}
  .pouch{position:absolute;left:50%;top:${pouchTop}px;height:${pouchH}px;transform:translateX(-50%) rotate(-9deg);
    filter:drop-shadow(0 ${pouchH * 0.06}px ${pouchH * 0.06}px rgba(70,15,60,.40)) drop-shadow(0 ${pouchH * 0.015}px ${pouchH * 0.02}px rgba(40,10,40,.30))}
  .pouch img{height:100%;display:block}
  .btns{position:absolute;left:0;right:0;bottom:${btnBottom}px;display:flex;justify-content:center;gap:${story ? 300 : 300}px}
  .b{display:flex;flex-direction:column;align-items:center;gap:${story ? 26 : 20}px;font-size:${story ? 50 : 44}px;font-weight:500}
  .c{width:${story ? 196 : 176}px;height:${story ? 196 : 176}px;border-radius:50%;display:flex;align-items:center;justify-content:center;
     box-shadow:0 10px 30px rgba(60,10,40,.25)}
  .c svg{width:46%;height:46%}
  .red{background:#EE1F2D}.green{background:#2DB742}
  </style></head><body>
  <svg class="silk" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD3CC" stop-opacity=".85"/><stop offset="1" stop-color="#F08DAA" stop-opacity="0"/></linearGradient>
      <linearGradient id="g2" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#7A3E8F" stop-opacity=".9"/><stop offset="1" stop-color="#B85A9C" stop-opacity="0"/></linearGradient>
      <linearGradient id="g3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFE3DA" stop-opacity="0"/><stop offset=".5" stop-color="#FFE7DE" stop-opacity=".55"/><stop offset="1" stop-color="#FFE3DA" stop-opacity="0"/></linearGradient>
    </defs>
    <path d="M-5 72 C 20 55, 42 62, 58 74 S 92 98, 110 82 L110 110 L-5 110Z" fill="url(#g2)"/>
    <path d="M-5 62 C 18 48, 40 52, 60 66 S 95 86, 110 70" fill="none" stroke="url(#g3)" stroke-width="3.5"/>
    <path d="M40 -5 C 60 10, 70 20, 110 18 L110 -5Z" fill="url(#g1)"/>
    <path d="M-5 20 C 15 10, 30 30, 50 26" fill="none" stroke="url(#g3)" stroke-width="2.5" opacity=".7"/>
  </svg>
  <div class="grain"></div>
  <div class="text"><h1>${ad.head}</h1><h2>${ad.sub}</h2></div>
  <div class="pouch"><img src="${POUCH}"></div>
  <div class="btns">
    <div class="b"><div class="c red">${decline}</div>Decline</div>
    <div class="b"><div class="c green">${accept}</div>Accept</div>
  </div>
  </body></html>`;
}

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage();
  for (const ad of ADS) for (const [sz, W, H] of SIZES) {
    await p.setViewportSize({ width: W, height: H });
    await p.setContent(html(ad, W, H)); await p.evaluate(() => document.fonts.ready);
    const f = path.join(out, `ad-calling-${ad.key}-${sz}.png`);
    await p.screenshot({ path: f }); console.log(f);
  }
  await b.close();
})();
