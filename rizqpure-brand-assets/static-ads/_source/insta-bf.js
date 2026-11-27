// Black Friday Instagram post (feed 4:5) and story (9:16). usage: node insta-bf.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, fmt, w = 'normal', st = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/${fmt};base64,${b64(F(f))});font-weight:${w};font-style:${st}}`;
const FONTS = face('Mont', 'Montserrat-latin.woff2', 'woff2', '100 900') + face('Anton', 'Anton-Regular.ttf', 'ttf') +
  face('Playfair', 'PlayfairDisplay-Italic%5Bwght%5D.ttf', 'ttf', '400 900', 'italic');
const TRIO = 'data:image/png;base64,' + b64(path.join(__dirname, '..', '..', 'png-transparent', '3-pack', 'rizqpure-3-pack-fanned.png'));
const LOGO = 'data:image/png;base64,' + b64(path.join(__dirname, 'logo-light.png'));
const NAVY = '#13183F', GOLD = '#B8924F', GOLDL = '#E9C77E', BLACK = '#0B0B12', CREAM = '#F7EFE3';
const PRICE = '£45', WAS = '£60', PCT = '25%';
const CLAIM = 'Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.';

// H is 1350 (feed) or 1920 (story); the story adds room top and bottom for Instagram's UI
const post = H => {
  const st = H > 1500, o = st ? 200 : 0;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
  *{margin:0;padding:0;box-sizing:border-box} body{width:1080px;height:${H}px;overflow:hidden;position:relative;font-family:Mont;background:${CREAM}}
  .a{position:absolute}</style></head><body>
  <div class="a" style="left:0;right:0;top:0;height:${o + 560}px;background:${BLACK}"></div>
  <svg class="a" style="left:0;top:${o + 520}px" width="1080" height="80" viewBox="0 0 1080 80" preserveAspectRatio="none"><path d="M0 40 Q540 100 1080 40 V0 H0Z" fill="${BLACK}"/></svg>
  <div class="a" style="top:${o + 60}px;width:100%;text-align:center;font-weight:700;font-size:24px;letter-spacing:10px;color:${GOLDL}">IT'S HERE</div>
  <div class="a" style="top:${o + 100}px;width:100%;text-align:center;font-family:Anton;font-size:200px;line-height:.95;letter-spacing:3px;color:#fff">BLACK<br>FRIDAY</div>
  <div class="a" style="top:${o + 495}px;left:50%;transform:translateX(-50%);white-space:nowrap;background:${GOLD};color:${BLACK};font-weight:800;font-size:28px;letter-spacing:4px;padding:12px 30px;border-radius:40px;z-index:3">BACK IN STOCK</div>
  <img class="a" src="${TRIO}" style="left:${st ? 115 : 160}px;top:${o + 560}px;width:${st ? 850 : 760}px;z-index:2">
  <div class="a" style="top:${o + (st ? 1130 : 1060)}px;width:100%;text-align:center;font-weight:800;font-size:30px;letter-spacing:3px;color:${NAVY}">THE 3 MONTH BUNDLE</div>
  <div class="a" style="top:${o + (st ? 1170 : 1100)}px;width:100%;display:flex;justify-content:center;align-items:center;gap:26px">
    <div style="background:#2E9B3E;color:#fff;font-weight:800;font-size:28px;padding:8px 18px;border-radius:8px">SAVE ${PCT}</div>
    <div style="font-weight:900;font-size:110px;letter-spacing:-3px;color:${NAVY};line-height:1">${PRICE}</div>
    <div style="font-weight:600;font-size:48px;color:#8C8577;text-decoration:line-through;text-decoration-thickness:4px">${WAS}</div></div>
  ${st ? `<div class="a" style="top:${o + 1330}px;left:80px;right:80px;background:${BLACK};border-radius:16px;padding:26px 0;text-align:center;font-family:Anton;font-size:64px;letter-spacing:2px;color:${GOLDL}">DON'T MISS IT TWICE.</div>
     <div class="a" style="top:${o + 1480}px;width:100%;text-align:center;font-weight:700;font-size:26px;letter-spacing:3px;color:#3A3650">ENDS CYBER MONDAY · WHILE STOCK LASTS</div>`
    : `<div class="a" style="top:1232px;width:100%;text-align:center;font-weight:800;font-size:26px;letter-spacing:3px;color:${BLACK}">ENDS CYBER MONDAY · WHILE STOCK LASTS</div>
     <div class="a" style="top:1300px;width:100%;text-align:center;font-size:15px;color:#8A8270">*${CLAIM}</div>`}
  ${st ? `<div class="a" style="bottom:120px;width:100%;text-align:center;font-size:14px;color:#8A8270">*${CLAIM}</div>` : ''}
  </body></html>`;
};

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const [name, H] of [['instagram-black-friday-post-1080x1350', 1350], ['instagram-black-friday-story-1080x1920', 1920]]) {
    const p = await b.newPage({ viewport: { width: 1080, height: H } });
    await p.setContent(post(H)); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name + '.png') }); console.log(name); await p.close();
  }
  await b.close();
})();
