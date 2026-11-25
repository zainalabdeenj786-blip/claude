// 3-pack price ads, new layouts (same offer as bundle-remake.js). usage: node bundle2.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, fmt, w = 'normal', st = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/${fmt};base64,${b64(F(f))});font-weight:${w};font-style:${st}}`;
const FONTS = face('Mont', 'Montserrat-latin.woff2', 'woff2', '100 900') + face('Vibes', 'GreatVibes-latin.woff2', 'woff2') +
  face('Playfair', 'PlayfairDisplay%5Bwght%5D.ttf', 'ttf', '400 900') + face('Playfair', 'PlayfairDisplay-Italic%5Bwght%5D.ttf', 'ttf', '400 900', 'italic');
const img = f => 'data:image/png;base64,' + b64(path.join(__dirname, f));
const POUCH = img('pouch.png'), LOGO = img('logo-light.png');
const NAVY = '#13183F', GOLD = '#B8924F', GOLDL = '#E9C77E', CREAM = '#F7EFE3', GREEN = '#2E9B3E';
const PRICE = '£45', WAS = '£60', EACH = '£15', SAVE = '£15', PCT = '25%';

const page = (bg, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box} body{width:1080px;height:1080px;overflow:hidden;position:relative;font-family:Mont;color:${NAVY};background:${bg}}
.a{position:absolute}</style></head><body>${body}</body></html>`;
const pouch = (x, y, h, rot = 0, z = 1, sh = .35) => `<img class="a" src="${POUCH}" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg);z-index:${z};
  filter:drop-shadow(0 ${h * .05}px ${h * .05}px rgba(20,15,40,${sh}))">`;
const trio = (cx, top, h, sh) => { const w = h * .697; return pouch(cx - w * 1.15, top + h * .1, h * .86, -7, 1, sh) + pouch(cx + w * .29, top + h * .1, h * .86, 7, 1, sh) + pouch(cx - w / 2, top, h, 0, 2, sh); };
const tick = c => `<svg width="34" height="34" viewBox="0 0 24 24" style="flex:none"><circle cx="12" cy="12" r="11" fill="${c}"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ico = {
  ship: c => `<svg width="40" height="40" viewBox="0 0 24 24" fill="${c}"><path d="M2 6h11v9H2z"/><path d="M13 9h4l3 3v3h-7z"/><circle cx="6" cy="17" r="2"/><circle cx="16" cy="17" r="2"/></svg>`,
  ret: c => `<svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="${c}" stroke-width="3.2"><path d="M40 24a16 16 0 1 1-5-11.6"/><path d="M36 6v7h-7"/><text x="24" y="30" text-anchor="middle" font-family="Mont" font-weight="800" font-size="15" fill="${c}" stroke="none">30</text></svg>`,
  shield: c => `<svg width="40" height="40" viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z" fill="${c}"/><path d="M8 12l3 3 5-6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
};
const trustRow = (top, c, txt, line) => `<div class="a" style="left:40px;right:40px;top:${top}px;display:flex;justify-content:space-between;align-items:center">
  ${[['ship', 'FREE<br>SHIPPING'], ['ret', '30-DAY<br>RETURNS'], ['shield', '100%<br>GUARANTEE']].map(([k, t], i) =>
    `${i ? `<div style="width:1.5px;height:56px;background:${line}"></div>` : ''}<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:14px">${ico[k](c)}
     <div style="font-weight:800;font-size:19px;line-height:1.25;color:${txt}">${t}</div></div>`).join('')}</div>`;

const ADS = {
  // A — navy hero, gold price seal
  'navy-price-seal': page(`radial-gradient(75% 60% at 50% 48%,#2B3170 0%,#1A1E4A 55%,#0E112E 100%)`, `
    <div class="a" style="top:52px;width:100%;text-align:center;font-weight:700;font-size:22px;letter-spacing:8px;color:${GOLDL}">THE 3 MONTH BUNDLE</div>
    <div class="a" style="top:92px;width:100%;text-align:center;font-family:Playfair;font-weight:600;font-size:84px;line-height:1.05;color:#fff;letter-spacing:-1px">Three months to<br>your <i style="color:${GOLDL}">best skin, hair &amp; joints</i></div>
    <div class="a" style="left:290px;top:330px;width:500px;height:480px;border-radius:50%;background:radial-gradient(closest-side,rgba(233,199,126,.28),rgba(233,199,126,0))"></div>
    ${trio(540, 330, 440, .55)}
    <div class="a" style="left:770px;top:300px;width:250px;height:250px;border-radius:50%;z-index:5;background:radial-gradient(circle at 35% 30%,#F6DCA0,${GOLD} 70%);
      box-shadow:0 14px 34px rgba(0,0,0,.4);display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(8deg);color:${NAVY}">
      <div style="font-weight:800;font-size:22px;letter-spacing:2px">SAVE ${PCT}</div>
      <div style="font-weight:900;font-size:92px;line-height:.95;letter-spacing:-2px">${PRICE}</div>
      <div style="font-weight:600;font-size:22px"><s>${WAS}</s> · ${EACH} each</div></div>
    <div class="a" style="left:60px;right:60px;top:820px;display:flex;justify-content:center;gap:14px">
      ${['Younger-looking skin', 'Fuller hair', 'Stronger nails', 'Supple joints'].map(t => `<div style="padding:12px 20px;border-radius:40px;border:1.5px solid rgba(233,199,126,.6);color:#fff;font-weight:600;font-size:21px;white-space:nowrap">${t}</div>`).join('')}</div>
    <div class="a" style="left:0;right:0;bottom:0;height:150px;background:rgba(255,255,255,.06);border-top:1px solid rgba(233,199,126,.3)"></div>
    ${trustRow(965, GOLDL, '#fff', 'rgba(233,199,126,.35)')}`),

  // B — split: cream checklist + navy arch with pouches
  'arch-checklist': page(CREAM, `
    <div class="a" style="right:0;top:0;width:470px;height:1080px;background:${NAVY}"></div>
    <div class="a" style="left:560px;top:150px;width:470px;height:720px;border-radius:235px 235px 0 0;background:linear-gradient(180deg,#2B3170,#1A1E4A);border:3px solid ${GOLD}"></div>
    ${trio(795, 400, 320, .55)}
    <img class="a" src="${LOGO}" style="left:56px;top:56px;width:200px">
    <div class="a" style="left:56px;top:190px;width:480px;font-weight:800;font-size:60px;line-height:1.05;letter-spacing:-.5px">ONE BUNDLE.<br>THREE MONTHS.<br><span style="font-family:Vibes;font-weight:400;font-size:78px;color:${GOLD};letter-spacing:0">real results.</span></div>
    <div class="a" style="left:56px;top:470px;width:470px;display:flex;flex-direction:column;gap:20px">
      ${['Supports younger-looking skin*', 'Thicker, fuller-looking hair', 'Joints that keep up with prayer*', '100% halal, no fillers or clumps', 'Every order supports charity'].map(t =>
        `<div style="display:flex;gap:16px;align-items:center;font-weight:600;font-size:25px">${tick(GOLD)}${t}</div>`).join('')}</div>
    <div class="a" style="left:56px;top:810px;width:470px;height:150px;border-radius:20px;background:#fff;border:2px solid ${GOLD};box-shadow:0 10px 26px rgba(90,70,40,.12)">
      <div style="position:absolute;left:24px;top:-18px;background:${GREEN};color:#fff;font-weight:800;font-size:22px;padding:6px 16px;border-radius:6px">SAVE ${PCT}</div>
      <div style="position:absolute;left:24px;top:22px;display:flex;align-items:baseline;gap:18px"><span style="font-weight:900;font-size:88px;line-height:1;letter-spacing:-2px">${PRICE}</span>
        <span style="font-weight:600;font-size:38px;color:#8C8577;text-decoration:line-through">${WAS}</span></div>
      <div style="position:absolute;left:24px;top:110px;font-weight:700;font-size:22px;color:${GREEN}">Just ${EACH} each · Save ${SAVE}</div></div>
    <div class="a" style="left:560px;right:0;top:900px;display:flex;flex-direction:column;gap:22px;padding-left:60px">
      ${[['ship', 'FREE SHIPPING'], ['ret', '30-DAY RETURNS'], ['shield', '100% GUARANTEE']].map(([k, t]) => `<div style="display:flex;align-items:center;gap:16px;color:#fff;font-weight:800;font-size:20px">${ico[k](GOLDL).replace(/width="4\d" height="4\d"/, 'width="30" height="30"')}${t}</div>`).join('')}</div>
    <div class="a" style="left:56px;bottom:22px;width:480px;font-size:12px;color:#8A8270">*Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.</div>`),

  // C — month 1 / 2 / 3 journey
  'month-by-month': page(`linear-gradient(180deg,#FFFFFF 0%,${CREAM} 100%)`, `
    <img class="a" src="${LOGO}" style="left:440px;top:36px;width:200px">
    <div class="a" style="top:160px;width:100%;text-align:center;font-weight:800;font-size:58px;letter-spacing:-.5px">YOUR 3 MONTH <span style="color:${GOLD}">GLOW-UP</span></div>
    <div class="a" style="top:236px;width:100%;text-align:center;font-weight:500;font-size:26px;color:#5A5468">Collagen works with consistency. One pouch for every month.</div>
    <div class="a" style="left:150px;right:150px;top:690px;height:4px;background:linear-gradient(90deg,${GOLD}55,${GOLD})"></div>
    ${[['MONTH 1', 'Start', 'Build the daily habit'], ['MONTH 2', 'Build', 'Hair &amp; nails feel stronger'], ['MONTH 3', 'Glow', 'Skin, hair &amp; joints supported*']].map(([m, h, t], i) =>
      `${pouch(120 + i * 320, 320 + (2 - i) * 20, 330 - (2 - i) * 20, 0, 2)}
       <div class="a" style="left:${120 + i * 320 + 115 - 22 + (2 - i) * 7}px;top:678px;width:28px;height:28px;border-radius:50%;background:${GOLD};border:5px solid #fff;box-shadow:0 0 0 2px ${GOLD}"></div>
       <div class="a" style="left:${60 + i * 320}px;top:720px;width:340px;text-align:center">
         <div style="font-weight:800;font-size:20px;letter-spacing:4px;color:${GOLD}">${m}</div>
         <div style="font-family:Playfair;font-weight:600;font-size:46px;line-height:1.1">${h}</div>
         <div style="font-size:21px;color:#5A5468;margin-top:4px">${t}</div></div>`).join('')}
    <div class="a" style="left:40px;right:40px;top:880px;height:150px;border-radius:24px;background:${NAVY};display:flex;align-items:center;padding:0 40px;gap:30px">
      <div style="background:${GREEN};color:#fff;font-weight:800;font-size:24px;padding:10px 18px;border-radius:8px;white-space:nowrap">SAVE ${PCT}</div>
      <div style="color:#fff;display:flex;align-items:baseline;gap:16px"><span style="font-weight:900;font-size:86px;letter-spacing:-2px">${PRICE}</span><s style="font-weight:600;font-size:36px;opacity:.6">${WAS}</s></div>
      <div style="margin-left:auto;color:#fff;font-size:20px;line-height:1.6;text-align:right;font-weight:600">
        <div style="color:${GOLDL};font-weight:800;font-size:24px">Just ${EACH} each</div>Free shipping · 30-day returns<br>100% satisfaction guarantee</div></div>
    <div class="a" style="left:0;right:0;bottom:14px;text-align:center;font-size:12px;color:#8A8270">*Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.</div>`),
};

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  for (const [name, html] of Object.entries(ADS)) {
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, `ad-3pack-${name}-1080x1080.png`) }); console.log(name);
  }
  await b.close();
})();
