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

const ADS = {
  'real-change-is-a-ritual': page('linear-gradient(180deg,#FBF6EE,#F1E7D8)', `
    ${logo()}
    <div class="a" style="top:160px;left:80px;right:80px;text-align:center;font-family:Playfair;font-weight:600;font-size:100px;line-height:1.06;letter-spacing:-2px;color:${INK}">
      Real change isn't<br>a one-off.<br>It's a ${M('ritual')}.</div>
    <div class="a" style="top:540px;left:140px;right:140px;text-align:center;font-size:34px;line-height:1.4;color:#45405A">Skin, hair and joints* respond to what happens every day. The 3-pack keeps your ritual going.</div>
    ${trio(540, 740, 340)}
    ${btn('Shop the 3-pack: 15% off', 1170)}
    ${foot(CLAIM)}`),

  'consistency-secret-ingredient': page('#FFFFFF', `
    ${logo()}
    <div class="a" style="top:170px;left:80px;right:80px;text-align:center;font-family:'Archivo Black';font-size:84px;line-height:1.1;color:${INK}">
      ${M('CONSISTENCY')} IS<br>THE SECRET<br>INGREDIENT.</div>
    <div class="a" style="top:500px;left:150px;right:150px;text-align:center;font-size:34px;line-height:1.4;color:#45405A">Halal collagen works best as part of the everyday. Three pouches. One steady ritual.*</div>
    ${trio(540, 720, 360)}
    ${btn('Get the 3-pack: 15% off', 1170)}
    ${foot(CLAIM)}`),

  'skin-hair-joints-one-ritual': page('radial-gradient(90% 70% at 50% 45%,#FFFFFF 0%,#F3F0F8 65%,#E7E2F0 100%)', `
    ${logo()}
    <div class="a" style="top:150px;width:100%;text-align:center;font-family:Playfair;font-weight:600;font-size:92px;line-height:1.08;letter-spacing:-2px;color:${INK}">
      Skin. Hair. Joints.<br>${M('One')} daily ritual.</div>
    ${[['skin', 'Younger-looking<br>skin*', 170], ['hair', 'Fuller-looking<br>hair*', 540], ['joint', 'Joints for<br>prayer*', 910]].map(([k, t, cx]) =>
      `<div class="a" style="left:${cx - 150}px;top:420px;width:300px;text-align:center">
        <div style="width:150px;height:150px;margin:0 auto;border-radius:50%;background:#fff;box-shadow:0 10px 24px rgba(40,30,70,.1);display:flex;align-items:center;justify-content:center">${icon(k, '#2C2F66', 90)}</div>
        <div style="font-weight:700;font-size:32px;line-height:1.2;color:${INK};margin-top:18px">${t}</div></div>`).join('')}
    ${trio(540, 740, 330)}
    ${btn('The 3-pack: 15% off', 1170)}
    ${foot(CLAIM)}`),

  'the-glow-up-that-lasts': page('radial-gradient(90% 70% at 50% 40%,#2F3378 0%,#22265E 55%,#151837 100%)', `
    ${logo('#E9D9B0')}
    <div class="a" style="top:170px;width:100%;text-align:center;font-family:Playfair;font-weight:500;font-size:112px;line-height:1.02;letter-spacing:-3px;color:#fff">
      The glow-up<br>that <i style="color:#F2C462">lasts.</i></div>
    <div class="a" style="top:470px;left:150px;right:150px;text-align:center;font-size:34px;line-height:1.4;color:#E6E3F5">Not a quick fix. A daily halal ritual for skin, hair &amp; joints*, stocked for the long run.</div>
    <div class="a" style="left:240px;top:680px;width:600px;height:420px;border-radius:50%;background:radial-gradient(closest-side,rgba(242,196,98,.22),rgba(242,196,98,0))"></div>
    ${trio(540, 690, 380, .55)}
    ${btn('Shop the 3-pack: 15% off', 1170, GOLD, INK)}
    ${foot(CLAIM, 'rgba(255,255,255,.6)')}`),

  'fine-lines-shedding-stiff-knees': page('linear-gradient(180deg,#FBF8F4,#EFE7EC)', `
    ${logo()}
    <div class="a" style="top:160px;left:90px;font-family:'Archivo Black';font-size:94px;line-height:1.12;color:${INK}">
      Fine lines.<br>Shedding.<br>Stiff knees.</div>
    <div class="a" style="top:540px;left:94px;width:520px;font-family:Playfair;font-style:italic;font-size:54px;line-height:1.15;color:#7A5530">Support all three<br>from ${M('within')}.*</div>
    <div class="a" style="top:720px;left:94px;width:470px;font-size:32px;line-height:1.4;color:#45405A">One scoop of halal collagen in your morning drink, every day. The 3-pack keeps it that way.</div>
    ${trio(820, 600, 280)}
    ${btn('Start the 3-pack: 15% off', 1170)}
    ${foot(CLAIM)}`),

  'made-for-the-long-run': page('#FFFFFF', `
    ${logo()}
    <div class="a" style="top:160px;width:100%;text-align:center;font-family:'Archivo Black';font-size:96px;line-height:1.08;color:${INK}">MADE FOR<br>THE ${M('LONG RUN')}.</div>
    <div class="a" style="left:110px;right:110px;top:440px">
      <div style="display:flex;gap:14px">${['START', 'BUILD', 'GLOW'].map((t, i) => `<div style="flex:1">
        <div style="height:26px;border-radius:13px;background:${['#C9C3E6', '#8E86BE', '#2C2F66'][i]}"></div>
        <div style="margin-top:14px;text-align:center;font-weight:800;font-size:28px;letter-spacing:3px;color:${INK}">${t}</div></div>`).join('')}</div></div>
    <div class="a" style="top:590px;left:150px;right:150px;text-align:center;font-size:34px;line-height:1.4;color:#45405A">Three pouches to start, build and glow. A steady routine for skin, hair and joints*.</div>
    ${trio(540, 760, 320)}
    ${btn('Get the 3-pack: 15% off', 1170)}
    ${foot(CLAIM)}`),

  'every-morning-without-fail': page('radial-gradient(100% 80% at 50% 30%,#FFF9F1 0%,#F3E8DA 70%,#E9DCC8 100%)', `
    ${logo()}
    <div class="a" style="top:160px;width:100%;text-align:center;font-family:Playfair;font-weight:600;font-size:98px;line-height:1.05;letter-spacing:-2px;color:${INK}">
      ${M('Every')} morning.<br>Without fail.</div>
    <div class="a" style="top:420px;left:150px;right:150px;text-align:center;font-size:34px;line-height:1.4;color:#45405A">Stir one scoop into your coffee or chai and give your skin, hair and joints* daily support. Stocked up with the 3-pack.</div>
    <svg class="a" style="left:120px;top:780px" width="260" height="300" viewBox="0 0 24 26" fill="none" stroke="#3B3550" stroke-width=".9" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 11h13v7a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z" fill="#FFFDF8"/><path d="M17 13h1.6a3 3 0 0 1 0 6H17"/><path d="M8 3c-1.2 1.6 1.2 2.4 0 4M11.5 2.5c-1.2 1.6 1.2 2.4 0 4M15 3c-1.2 1.6 1.2 2.4 0 4"/></svg>
    ${trio(700, 700, 340)}
    ${btn('Shop the 3-pack: 15% off', 1170)}
    ${foot(CLAIM)}`),

  'suhoor-to-sujood': page('radial-gradient(90% 70% at 50% 35%,#2E3170 0%,#1C1F4C 60%,#101233 100%)', `
    ${Array.from({ length: 36 }, (_, i) => `<div class="a" style="left:${(i * 131) % 1080}px;top:${(i * 71) % 520}px;width:${2 + i % 3}px;height:${2 + i % 3}px;border-radius:50%;background:#fff;opacity:${.25 + (i % 4) * .15}"></div>`).join('')}
    ${logo('#E9D9B0')}
    <div class="a" style="top:170px;width:100%;text-align:center;font-family:Playfair;font-weight:500;font-size:104px;line-height:1.04;letter-spacing:-2px;color:#fff">
      From suhoor<br>to <i style="color:#F2C462">sujood.</i></div>
    <div class="a" style="top:460px;left:150px;right:150px;text-align:center;font-size:34px;line-height:1.4;color:#E6E3F5">A daily halal ritual for glowing skin, fuller-looking hair and joints that keep up with every prayer*.</div>
    ${trio(540, 700, 370, .55)}
    ${btn('The 3-pack: 15% off', 1170, GOLD, INK)}
    ${foot(CLAIM, 'rgba(255,255,255,.6)')}`),
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
