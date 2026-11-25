// Remake of the best-performing "3 month bundle set" ad at the new price. usage: node bundle-remake.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, fmt, w = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/${fmt};base64,${b64(F(f))});font-weight:${w}}`;
const FONTS = face('Mont', 'Montserrat-latin.woff2', 'woff2', '100 900') + face('Vibes', 'GreatVibes-latin.woff2', 'woff2');
const img = f => 'data:image/png;base64,' + b64(path.join(__dirname, f));
const POUCH = img('pouch.png'), LOGO = img('logo-light.png');
const NAVY = '#13183F', GOLD = '#B8924F', GREEN = '#2E9B3E';
const PRICE = '£45', WAS = '£60', EACH = '£15', SAVE = '£15', PCT = '25%';

// thin gold line icons
const ico = {
  skin: '<circle cx="32" cy="26" r="11"/><path d="M21 26c0-9 5-14 11-14s11 5 11 14M18 52c2-8 7-12 14-12s12 4 14 12"/><path d="M27 27h.01M37 27h.01M28 32c2 2 6 2 8 0"/><path d="M46 12l1.5 3 3 1.5-3 1.5L46 21l-1.5-3-3-1.5 3-1.5z"/>',
  hair: '<path d="M14 40c6-3 12-3 18 0s12 3 18 0"/><path d="M14 48c6-3 12-3 18 0s12 3 18 0"/><path d="M24 38V18M32 38V14M40 38V18"/><path d="M24 18c0-3 2-5 4-5M32 14c0-3 2-5 4-5M40 18c0-3 2-5 4-5"/>',
  nails: '<path d="M22 54V26c0-6 4-12 10-12s10 6 10 12v28"/><path d="M26 30c0-5 3-9 6-9s6 4 6 9v6H26z"/><path d="M46 12l1.5 3 3 1.5-3 1.5L46 21l-1.5-3-3-1.5 3-1.5z"/>',
  joints: '<path d="M24 10v16c0 4 3 6 6 6"/><path d="M40 54V38c0-4-3-6-6-6"/><circle cx="32" cy="32" r="7"/><path d="M18 14c3-2 8-2 12 0M34 50c4 2 9 2 12 0"/>',
};
const icon = (k, label) => `<div style="width:118px;text-align:center">
  <div style="width:96px;height:96px;margin:0 auto;border-radius:50%;border:2.5px solid ${GOLD};background:rgba(255,255,255,.55);display:flex;align-items:center;justify-content:center">
    <svg width="58" height="58" viewBox="0 0 64 64" fill="none" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${ico[k]}</svg></div>
  <div style="margin-top:14px;font-weight:800;font-size:16px;line-height:1.25;color:${NAVY}">${label}</div></div>`;
const trust = (svg, t) => `<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:22px">
  <div style="width:96px;height:96px;border-radius:50%;background:#F1E7D6;display:flex;align-items:center;justify-content:center">${svg}</div>
  <div style="font-weight:800;font-size:22px;line-height:1.3;color:${NAVY}">${t}</div></div>`;
const truck = `<svg width="54" height="54" viewBox="0 0 24 24" fill="${NAVY}"><path d="M2 6h11v9H2z"/><path d="M13 9h4l3 3v3h-7z"/><circle cx="6" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><path d="M0 8h3M0 11h3" stroke="${NAVY}" stroke-width="1"/></svg>`;
const ret = `<svg width="58" height="58" viewBox="0 0 48 48" fill="none" stroke="${NAVY}" stroke-width="3"><path d="M40 24a16 16 0 1 1-5-11.6"/><path d="M36 6v7h-7"/><text x="24" y="30" text-anchor="middle" font-family="Mont" font-weight="800" font-size="15" fill="${NAVY}" stroke="none">30</text></svg>`;
const shield = `<svg width="54" height="54" viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z" fill="${GOLD}"/><path d="M8 12l3 3 5-6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`;

// pouches: centre front, two behind
const pouch = (x, y, h, z, sh = .35) => `<img style="position:absolute;left:${x}px;top:${y}px;height:${h}px;z-index:${z};filter:drop-shadow(0 ${h * .04}px ${h * .05}px rgba(60,40,20,${sh}))" src="${POUCH}">`;
// soft leaf shadows + plant, drawn in SVG
const leaf = (x, y, r, s, c, o) => `<ellipse cx="0" cy="0" rx="${s}" ry="${s * .38}" fill="${c}" opacity="${o}" transform="translate(${x} ${y}) rotate(${r})"/>`;
const plant = `<svg style="position:absolute;right:-40px;top:20px;z-index:0" width="420" height="560" viewBox="0 0 420 560">
  <g stroke="#5E7A3E" stroke-width="3" fill="none" opacity=".8"><path d="M300 560C290 420 250 300 160 160M300 560C320 400 360 300 400 220M300 560C280 460 200 400 90 360"/></g>
  ${[[160, 160, -40, 70], [210, 230, -30, 64], [240, 300, 30, 60], [120, 280, -20, 66], [90, 360, -10, 62], [380, 230, 50, 66], [350, 310, 35, 60], [200, 400, 15, 56], [330, 160, -60, 60], [260, 120, -50, 58]].map(([x, y, r, s]) => leaf(x, y, r, s, '#6E8F48', .92)).join('')}
  ${[[175, 175, -40, 50], [235, 290, 30, 40], [375, 240, 50, 46]].map(([x, y, r, s]) => leaf(x, y, r, s, '#89AA5E', .7)).join('')}</svg>`;
const shadows = `<svg style="position:absolute;left:300px;top:0;z-index:0;filter:blur(14px)" width="500" height="700" viewBox="0 0 500 700">
  ${Array.from({ length: 14 }, (_, i) => leaf(100 + (i * 73) % 360, 80 + (i * 97) % 500, (i * 37) % 180 - 90, 50 + (i % 4) * 10, '#7A6448', .08)).join('')}</svg>`;
// scoop of powder
const scoop = `<svg style="position:absolute;left:800px;top:715px;z-index:6" width="290" height="150" viewBox="0 0 290 150">
  <ellipse cx="90" cy="128" rx="85" ry="14" fill="rgba(90,70,40,.12)"/>
  <path d="M10 118c18-30 120-32 160-6-30 14-120 18-160 6z" fill="#F3EBDC"/><path d="M30 112c25-16 85-18 120-4" stroke="#E4D8C2" stroke-width="3" fill="none"/>
  ${Array.from({ length: 40 }, (_, i) => `<circle cx="${6 + (i * 37) % 190}" cy="${116 + (i * 13) % 20}" r="${1 + i % 3 * .7}" fill="#EFE5D2"/>`).join('')}
  <path d="M170 60h90c10 0 14 10 6 14l-80 10" fill="#EEF0F2" stroke="#D5D9DE" stroke-width="2"/>
  <ellipse cx="190" cy="82" rx="58" ry="22" fill="#F7F8F9" stroke="#D5D9DE" stroke-width="2"/>
  <path d="M136 82c4 30 104 30 108 0" fill="#ECEEF1" stroke="#D5D9DE" stroke-width="2"/>
  <path d="M144 80c10-26 80-28 92-2-20 10-72 12-92 2z" fill="#F3EBDC"/></svg>`;

const ad = (bf) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box} body{width:1080px;height:1080px;overflow:hidden;position:relative;font-family:Mont;
  background:radial-gradient(70% 60% at 70% 30%,#FFFDF9 0%,#F6EDE1 55%,#EBDDC9 100%)}</style></head><body>
  ${shadows}${plant}
  <div style="position:absolute;left:0;right:0;top:700px;height:200px;background:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,.55));z-index:0"></div>
  <img src="${LOGO}" style="position:absolute;left:150px;top:40px;width:250px;z-index:5">
  <div style="position:absolute;left:38px;top:205px;z-index:5;font-weight:800;font-size:64px;letter-spacing:-.5px;color:${NAVY};line-height:1">HALAL COLLAGEN</div>
  <div style="position:absolute;left:38px;top:285px;z-index:5;font-weight:500;font-size:40px;letter-spacing:1px;color:${NAVY}">THAT BENEFITS YOU</div>
  <div style="position:absolute;left:96px;top:328px;z-index:5;font-family:Vibes;font-size:66px;color:${GOLD}">and others
    <svg width="40" height="36" viewBox="0 0 24 22" fill="none" stroke="${GOLD}" stroke-width="1.8" style="vertical-align:middle;margin-left:4px"><path d="M12 20S2 14 2 7.5A5 5 0 0 1 12 5a5 5 0 0 1 10 2.5C22 14 12 20 12 20z"/></svg></div>
  <div style="position:absolute;left:38px;top:432px;width:420px;height:56px;z-index:5;background:${NAVY};clip-path:polygon(4% 0,96% 0,100% 50%,96% 100%,4% 100%,0 50%);
    display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:23px;letter-spacing:1.5px">3 MONTH BUNDLE SET</div>
  <div style="position:absolute;left:30px;top:520px;z-index:5;display:flex;gap:2px">${icon('skin', 'SUPPORTS<br>SKIN')}${icon('hair', 'STRONGER<br>HAIR')}${icon('nails', 'HEALTHY<br>NAILS')}${icon('joints', 'SUPPORTS<br>JOINTS')}</div>
  ${pouch(530, 330, 450, 1)}${pouch(850, 330, 450, 1)}${pouch(670, 280, 530, 3, .45)}
  ${scoop}
  ${bf ? `<div style="position:absolute;right:40px;top:40px;z-index:8;transform:rotate(6deg);background:#0B0B12;color:#fff;border:3px solid ${GOLD};border-radius:14px;padding:12px 26px;text-align:center">
     <div style="font-weight:900;font-size:28px;letter-spacing:3px">BLACK FRIDAY</div><div style="font-weight:700;font-size:18px;letter-spacing:2px;color:#F2C462">BACK IN STOCK</div></div>` : ''}
  <div style="position:absolute;left:38px;top:735px;width:480px;height:160px;z-index:7;background:#fff;border:2.5px solid ${GOLD};border-radius:22px;box-shadow:0 10px 30px rgba(90,70,40,.12)">
    <div style="position:absolute;left:22px;top:-20px;background:${GREEN};color:#fff;font-weight:800;font-size:24px;padding:6px 18px;border-radius:6px;clip-path:polygon(0 0,92% 0,100% 50%,92% 100%,0 100%)">SAVE ${PCT}&nbsp;&nbsp;</div>
    <div style="position:absolute;left:26px;top:20px;display:flex;align-items:baseline;gap:24px">
      <span style="font-weight:800;font-size:96px;letter-spacing:-2px;color:${NAVY};line-height:1">${PRICE}</span>
      <span style="font-weight:600;font-size:44px;color:#8C8577;text-decoration:line-through;text-decoration-thickness:3px">${WAS}</span></div>
    <div style="position:absolute;left:26px;top:114px;font-weight:700;font-size:25px;color:${GREEN}">Just ${EACH} each &nbsp;•&nbsp; Save ${SAVE}</div></div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:150px;z-index:7;background:rgba(255,255,255,.92);border-top:1px solid #E6DAC6;display:flex;align-items:center;padding:0 30px">
    ${trust(truck, 'FREE<br>STANDARD<br>SHIPPING')}<div style="width:1.5px;height:90px;background:#E1D3BC"></div>
    ${trust(ret, '30 DAYS<br>HASSLE-FREE<br>RETURNS')}<div style="width:1.5px;height:90px;background:#E1D3BC"></div>
    ${trust(shield, '100%<br>SATISFACTION<br>GUARANTEE')}</div>
</body></html>`;

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  for (const [name, bf] of [['ad-3-month-bundle-45-1080x1080', false], ['ad-3-month-bundle-45-black-friday-1080x1080', true]]) {
    await p.setContent(ad(bf)); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name + '.png') }); console.log(name);
  }
  await b.close();
})();
