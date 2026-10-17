// RizqPure 3-Pack results ads, round 2: calmer copy, one yellow-marked word. usage: node results4.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, w = 'normal', s = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/ttf;base64,${b64(F(f))});font-weight:${w};font-style:${s}}`;
const FONTS = face('DM Sans', 'DMSans%5Bopsz,wght%5D.ttf', '100 1000') + face('Playfair', 'PlayfairDisplay%5Bwght%5D.ttf', '400 900') +
  face('Playfair', 'PlayfairDisplay-Italic%5Bwght%5D.ttf', '400 900', 'italic') + face('Archivo Black', 'ArchivoBlack-Regular.ttf');
const POUCH = 'data:image/png;base64,' + b64(path.join(__dirname, '..', 'call', 'pouch.png'));
const INK = '#17162B', NAVY = '#1F2457', GOLD = '#C9A35E', YEL = '#F5D547';
const CLAIM = 'Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.';
const page = (bg, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box} body{width:1080px;height:1350px;overflow:hidden;position:relative;font-family:'DM Sans';background:${bg}}
.a{position:absolute}
.mk{background:linear-gradient(transparent 58%,${YEL} 58%,${YEL} 90%,transparent 90%);padding:0 .06em}
</style></head><body>${body}</body></html>`;
const M = t => `<span class="mk">${t}</span>`;
const pouch = (x, y, h, rot = 0, sh = .3, z = 1) => `<img class="a" src="${POUCH}" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg);z-index:${z};
  filter:drop-shadow(0 ${h * .05}px ${h * .05}px rgba(30,25,60,${sh})) drop-shadow(0 ${h * .012}px ${h * .015}px rgba(30,25,60,${sh}))">`;
const trio = (cx, top, h, sh = .32) => { const w = h * .7; return pouch(cx - w * 1.18, top + h * .08, h * .88, -9, sh, 1) + pouch(cx + w * .3, top + h * .08, h * .88, 9, sh, 1) + pouch(cx - w / 2, top, h, 0, sh, 2); };
const foot = (t, c = '#6C6680') => `<div class="a" style="left:0;right:0;bottom:0;padding:14px 80px 24px;text-align:center;font-size:16px;color:${c}">*${t}</div>`;
const btn = (t, top, bg = INK, fg = '#fff') => `<div class="a" style="left:50%;transform:translateX(-50%);top:${top}px;white-space:nowrap;padding:24px 60px;border-radius:60px;background:${bg};color:${fg};font-weight:800;font-size:33px;box-shadow:0 10px 24px rgba(20,20,50,.16)">${t}</div>`;
const logo = (c = NAVY) => `<div class="a" style="top:60px;width:100%;text-align:center;font-family:Playfair;font-weight:700;font-size:38px;color:${c}">RizqPure</div>`;
const ICON = {
  skin: '<circle cx="12" cy="12" r="9"/><path d="M8 10c.8-.6 1.8-.6 2.6 0M13.4 10c.8-.6 1.8-.6 2.6 0"/><path d="M8.5 15c2 1.8 5 1.8 7 0"/>',
  hair: '<path d="M8 21c-1-5 1.5-8 1-12S7 4 8.5 3"/><path d="M12 21c-.5-5 2-8 1.5-12S12 4 13.5 3"/><path d="M16 21c0-5 2.5-7.5 2-11.5S17 4 18.5 3.5"/>',
  joint: '<circle cx="9" cy="4.5" r="2"/><path d="M9 7v5l4 3-2 6M9 12l-4 2"/><path d="M3 21h18"/>',
};
const icon = (k, c = INK, s = 80) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</svg>`;


// layout templates
const T = {
  serif: (bg, h, sub, cta, dark = false) => page(bg, `
    ${logo(dark ? '#E9D9B0' : NAVY)}
    <div class="a" style="top:160px;left:80px;right:80px;text-align:center;font-family:Playfair;font-weight:${dark ? 500 : 600};font-size:96px;line-height:1.06;letter-spacing:-2px;color:${dark ? '#fff' : INK}">${h}</div>
    <div class="a" style="top:560px;left:140px;right:140px;text-align:center;font-size:34px;line-height:1.4;color:${dark ? '#E6E3F5' : '#45405A'}">${sub}</div>
    ${dark ? '<div class="a" style="left:240px;top:720px;width:600px;height:420px;border-radius:50%;background:radial-gradient(closest-side,rgba(242,196,98,.22),rgba(242,196,98,0))"></div>' : ''}
    ${trio(540, 750, 330, dark ? .55 : .32)}
    ${btn(cta, 1170, dark ? GOLD : INK, dark ? INK : '#fff')}
    ${foot(CLAIM, dark ? 'rgba(255,255,255,.6)' : '#6C6680')}`),
  bold: (bg, h, sub, cta) => page(bg, `
    ${logo()}
    <div class="a" style="top:165px;left:70px;right:70px;text-align:center;font-family:'Archivo Black';font-size:82px;line-height:1.1;color:${INK}">${h}</div>
    <div class="a" style="top:560px;left:140px;right:140px;text-align:center;font-size:34px;line-height:1.4;color:#45405A">${sub}</div>
    ${trio(540, 750, 330)}
    ${btn(cta, 1170)}
    ${foot(CLAIM)}`),
  left: (bg, h, sub, cta) => page(bg, `
    ${logo()}
    <div class="a" style="top:170px;left:90px;width:900px;font-family:'Archivo Black';font-size:86px;line-height:1.1;color:${INK}">${h}</div>
    <div class="a" style="top:620px;left:94px;width:430px;font-size:33px;line-height:1.4;color:#45405A">${sub}</div>
    ${trio(820, 620, 280)}
    ${btn(cta, 1170)}
    ${foot(CLAIM)}`),
};

const ADS = {
  'your-skin-full-ritual': T.serif('linear-gradient(180deg,#FBF6EE,#F1E7D8)',
    'Your skin is worth<br>the ' + M('full ritual') + '.', 'Fine lines and dullness don\'t change overnight. Daily collagen support for younger-looking skin, stocked with the 3-pack.*', 'Shop the 3-pack: 15% off'),
  'you-need-consistency': T.bold('#FFFFFF',
    "YOU DON'T NEED<br>MORE PRODUCTS.<br>JUST MORE " + M('CONSISTENCY') + '.', 'One scoop of halal collagen every day for skin, hair and joints*. The 3-pack keeps the habit going.', 'Get the 3-pack: 15% off'),
  'we-made-this-for-you': T.left('radial-gradient(90% 70% at 50% 45%,#FFFFFF 0%,#F3F0F8 65%,#E7E2F0 100%)',
    '<span style="font-size:70px;line-height:1.15">Fine lines? Shedding?<br>Stiff knees?<br>We made this for ' + M('you') + '.</span>', 'Halal collagen that supports skin, hair and joints from within*. Your 3-pack is 15% off.', 'Shop the 3-pack: 15% off'),
  'give-your-hair-time': T.serif('linear-gradient(180deg,#F5F4FB,#E3E5F6)',
    'Give your hair<br>the ' + M('time') + ' it deserves.', 'Shedding and thinning need patience and daily support. Stay consistent for fuller-looking hair with the 3-pack.*', 'Start the 3-pack: 15% off'),
  'your-knees-every-prayer': T.serif('radial-gradient(90% 70% at 50% 35%,#2E3170 0%,#1C1F4C 60%,#101233 100%)',
    'Your knees carry<br><i style="color:#F2C462">every prayer.</i>', 'Look after them. Daily halal collagen that supports your joints from within, so sujood feels as peaceful as it should.*', 'The 3-pack: 15% off', true),
  'ritual-youll-stick-to': T.bold('linear-gradient(180deg,#FBF8F4,#EFE7EC)',
    "THE RITUAL<br>YOU'LL ACTUALLY<br>" + M('STICK TO') + '.', 'No pills, no clumps. Just one scoop in your morning drink for skin, hair and joints*. Stocked with the 3-pack.', 'Get the 3-pack: 15% off'),
  'worth-more-than-quick-fix': T.serif('radial-gradient(90% 70% at 50% 40%,#2F3378 0%,#22265E 55%,#151837 100%)',
    "You're worth more<br>than a <i style=\"color:#F2C462\">quick fix.</i>", 'Real support for skin, hair and joints* takes daily consistency. Give yourself the full ritual with the 3-pack.', 'Shop the 3-pack: 15% off', true),
  'your-glow-up-fully-stocked': T.left('linear-gradient(180deg,#FBF6EE,#EFE4D3)',
    'Your glow-up,<br>' + M('fully stocked') + '.', 'Younger-looking skin, fuller-looking hair and joints for prayer*. One daily ritual, ready when you are.', 'Shop the 3-pack: 15% off'),
};

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [name, html] of Object.entries(ADS)) {
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    const f = path.join(out, `ad-3pack-${name}-1080x1350.png`); await p.screenshot({ path: f }); console.log(f);
  }
  await b.close();
})();
