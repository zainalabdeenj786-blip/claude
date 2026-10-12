// Renders RizqPure static ads. usage: node ads.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const HERE = __dirname, SP = path.join(HERE, '..');
const b64 = f => fs.readFileSync(f).toString('base64');
const font = (name, file, style = 'normal', weight = 400) =>
  `@font-face{font-family:'${name}';src:url(data:font/ttf;base64,${b64(path.join(HERE, 'fonts', file))});font-style:${style};font-weight:${weight};}`;
const FONTS = font('Barlow Condensed', 'BarlowCondensed-ExtraBoldItalic.ttf', 'italic', 800) +
  font('Barlow Condensed', 'BarlowCondensed-SemiBold.ttf', 'normal', 600) +
  font('DM Sans', 'DMSans%5Bopsz,wght%5D.ttf', 'normal', '100 1000');
const POUCH = 'data:image/png;base64,' + b64(path.join(SP, 'warp', 'front-embed.png'));
const LOGO = fs.readFileSync(path.join(SP, 'out3', 'svg', 'logo-metallic-as-printed-transparent.svg'), 'utf8').replace(/<\?xml[^>]*>/, '');

// line icons, drawn in the spirit of the reference's eye-slash
const ICONS = {
  search: `<svg viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="16" y="10" width="44" height="58" rx="5"/><path d="M26 26h24M26 37h24M26 48h12"/>
    <circle cx="62" cy="62" r="17" fill="rgba(255,255,255,0)"/><path d="M74.5 74.5 90 90"/>
    <path d="M57 57.5a5.5 5.5 0 1 1 7.5 5c-1.6.7-2.5 1.8-2.5 3.3v1"/><circle cx="62" cy="71.5" r=".6" fill="#fff"/></svg>`,
  crack: `<svg viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M30 92V40c0-14 9-26 20-26s20 12 20 26v52"/><path d="M36 40c0-8 6-15 14-15s14 7 14 15"/>
    <path d="M50 25l-5 14 9 8-7 12 6 9"/><path d="M14 30 8 24M86 30l6-6M20 14l-4-7M80 14l4-7"/></svg>`,
  hair: `<svg viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M30 90c-4-22 6-34 4-52s-8-24-2-30"/><path d="M46 92c-2-20 8-34 6-54s-6-24 0-30"/><path d="M62 90c0-20 10-32 8-52s-4-22 2-28"/>
    <path d="M14 26l-6-4M86 26l6-4M18 12l-4-6M82 12l4-6"/></svg>`,
  cup: `<svg viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 34h48v30c0 12-9 20-20 20h-8c-11 0-20-8-20-20z"/><path d="M70 42h6a10 10 0 0 1 0 20h-6"/>
    <path d="M36 14c-4 5 4 8 0 13M48 12c-4 5 4 8 0 13M60 14c-4 5 4 8 0 13"/><path d="M14 90 88 16"/></svg>`,
};

const ADS = [
  { key: 'halal-label', icon: 'search', head: 'Still checking<br>every label?',
    sub: 'Not every collagen tells you where it comes from. Ours is 100% hydrolysed <b>halal bovine</b> collagen peptides. Nothing to second-guess.',
    cta: 'Shop halal collagen', foot: 'Supports skin · hair · nails' },
  { key: 'brittle-nails', icon: 'crack', head: 'Brittle nails?<br>Dull skin?',
    sub: 'One scoop of halal collagen a day to support <b>skin, hair &amp; nail vitality</b>, from the inside out.',
    cta: 'Start your routine', foot: '100% halal bovine collagen' },
  { key: 'fuller-hair', icon: 'hair', head: 'Flat, thin<br>hair days?',
    sub: 'One scoop of halal collagen a day to support <b>fuller-looking hair</b> and glowing skin. Stirs straight into your morning drink.',
    cta: 'Start your routine', foot: 'Part of every order goes to charity' },
];

function html(ad, W, H, mode) {
  const story = H / W > 1.5;
  const u = W / 1080; // scale unit
  const pouchW = (mode === 'product' ? (story ? 450 : 420) : (story ? 1500 : 1300)) * u;
  const top = story ? 250 * u : 70 * u;           // stay clear of story UI
  const bottomSafe = story ? 330 * u : 60 * u;
  const blurPouch = `<img src="${POUCH}" style="position:absolute;left:50%;top:${story ? 46 : 52}%;width:${(story ? 1500 : 1250) * u}px;
      transform:translate(-50%,-50%) rotate(-4deg);filter:blur(${30 * u}px) saturate(1.15);opacity:.62">`;
  const sharpPouch = mode === 'product' ? `
    <div style="position:absolute;left:50%;bottom:${bottomSafe + (story ? 40 : -10) * u}px;transform:translateX(-50%);width:${pouchW}px">
      <div style="position:absolute;left:8%;right:8%;bottom:-${14 * u}px;height:${40 * u}px;border-radius:50%;background:rgba(5,6,30,.55);filter:blur(${14 * u}px)"></div>
      <img src="${POUCH}" style="position:relative;display:block;width:100%">
    </div>` : '';
  const prod = mode === 'product';
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;overflow:hidden;position:relative;font-family:'DM Sans';color:#fff;
    background:radial-gradient(120% 80% at 75% 20%,#8E9BE6 0%,#5A63C2 32%,#353A8E 62%,#1E2160 100%)}
  .veil{position:absolute;inset:0;background:radial-gradient(70% 55% at 50% ${prod ? 30 : 48}%,rgba(28,31,90,.10),rgba(18,20,60,.45))}
  .grain{position:absolute;inset:0;opacity:.07;mix-blend-mode:overlay;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
  .col{position:absolute;left:0;right:0;top:${top}px;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 ${90 * u}px}
  .logo svg{display:block;width:${(prod ? 230 : 250) * u}px;height:auto}
  .icon{width:${(prod ? 86 : 120) * u}px;height:${(prod ? 86 : 120) * u}px;margin-top:${(prod ? 34 : (story ? 230 : 150)) * u}px}
  h1{font-family:'Barlow Condensed';font-style:italic;font-weight:800;text-transform:uppercase;
     font-size:${(prod ? 104 : 118) * u}px;line-height:.92;letter-spacing:${1 * u}px;margin-top:${(prod ? (story ? 60 : 40) : 34) * u}px;
     text-shadow:0 ${2 * u}px ${24 * u}px rgba(10,12,50,.35)}
  p{font-size:${(prod ? 31 : 34) * u}px;line-height:1.38;font-weight:500;margin-top:${(prod ? 22 : 30) * u}px;max-width:${820 * u}px;
    text-shadow:0 ${1 * u}px ${12 * u}px rgba(10,12,50,.35)}
  p b{font-weight:700;color:#F3D79B}
  .pill{margin-top:${(prod ? 30 : 56) * u}px;border:${2.5 * u}px solid #fff;border-radius:999px;padding:${(prod ? 15 : 20) * u}px ${(prod ? 46 : 60) * u}px;
    font-family:'Barlow Condensed';font-weight:600;font-size:${(prod ? 30 : 34) * u}px;letter-spacing:${3 * u}px;text-transform:uppercase;
    background:rgba(255,255,255,.08);backdrop-filter:blur(4px)}
  .foot{position:absolute;left:0;right:0;bottom:${bottomSafe}px;text-align:center;font-family:'Barlow Condensed';font-weight:600;
    font-size:${32 * u}px;letter-spacing:${5 * u}px;text-transform:uppercase;color:#F3D79B}
  </style></head><body>
  ${blurPouch}<div class="veil"></div>${sharpPouch}<div class="grain"></div>
  <div class="col">
    <div class="logo">${LOGO}</div>
    ${prod ? '' : `<div class="icon">${ICONS[ad.icon]}</div>`}
    <h1>${ad.head}</h1>
    <p>${ad.sub}</p>
    <div class="pill">${ad.cta}</div>
  </div>
  ${prod ? '' : `<div class="foot">${ad.foot}</div>`}
  </body></html>`;
}

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage();
  const sizes = [['feed-1080x1350', 1080, 1350], ['story-1080x1920', 1080, 1920]];
  for (const ad of ADS) for (const mode of ['teaser', 'product']) for (const [sz, W, H] of sizes) {
    await p.setViewportSize({ width: W, height: H });
    await p.setContent(html(ad, W, H, mode)); await p.evaluate(() => document.fonts.ready);
    const f = path.join(out, `ad-${ad.key}-${mode}-${sz}.png`);
    await p.screenshot({ path: f }); console.log(f);
  }
  await b.close();
})();
