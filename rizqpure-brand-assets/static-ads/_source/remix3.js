// RizqPure remixes, round 3 (Shifah-style beauty formats). usage: node remix3.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, w = 'normal', s = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/ttf;base64,${b64(F(f))});font-weight:${w};font-style:${s}}`;
const FONTS = face('DM Sans', 'DMSans%5Bopsz,wght%5D.ttf', '100 1000') + face('Anton', 'Anton-Regular.ttf') +
  face('Playfair', 'PlayfairDisplay%5Bwght%5D.ttf', '400 900') + face('Playfair', 'PlayfairDisplay-Italic%5Bwght%5D.ttf', '400 900', 'italic') +
  face('DM Serif', 'DMSerifDisplay-Regular.ttf') + face('Archivo Black', 'ArchivoBlack-Regular.ttf');
const POUCH = 'data:image/png;base64,' + b64(path.join(__dirname, '..', 'call', 'pouch.png'));
const NAVY = '#1F2457', INK = '#2B2540', GOLD = '#C9A35E';
const CLAIM = 'Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.';
const page = (bg, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box} body{width:1080px;height:1350px;overflow:hidden;position:relative;font-family:'DM Sans';background:${bg}}
.a{position:absolute}</style></head><body>${body}</body></html>`;
const pouch = (x, y, h, rot = 0, sh = .3) => `<img class="a" src="${POUCH}" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg);
  filter:drop-shadow(0 ${h * .05}px ${h * .05}px rgba(30,25,60,${sh})) drop-shadow(0 ${h * .012}px ${h * .015}px rgba(30,25,60,${sh}))">`;
const tick = (c) => `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="15" height="15" rx="1.5"/><path d="M7 12.5l3.5 3.5L21 4.5"/></svg>`;
const circTick = (c) => `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>`;
const ICON = {
  sparkle: '<path d="M12 3l1.6 4.6L18 9.2l-4.4 1.6L12 15.4l-1.6-4.6L6 9.2l4.4-1.6z"/><path d="M18.5 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/><path d="M5.5 15l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z"/>',
  hair: '<path d="M8 21c-1-5 1.5-8 1-12S7 4 8.5 3"/><path d="M12 21c-.5-5 2-8 1.5-12S12 4 13.5 3"/><path d="M16 21c0-5 2.5-7.5 2-11.5S17 4 18.5 3.5"/>',
  joint: '<circle cx="12" cy="4.5" r="2"/><path d="M12 7v6l-4 3v5M12 13l4 3h3"/><path d="M5 21h15"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M4 21h4l2-2M20 21h-4l-2-2"/>',
  mug: '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M9 3c-1 1.3 1 2 0 3.3M12.5 3c-1 1.3 1 2 0 3.3"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8.5 15l2 2 4.5-4.5"/>',
};
const icon = (k, c, s = 90, w = 1.3) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</svg>`;

const ADS = {
  // 1 ── "90% OF PEOPLE AGREED" → truthful "100% HALAL"
  'big-percent-100-halal': page('radial-gradient(90% 80% at 70% 55%,#FFFFFF 0%,#F4F2F8 70%,#E9E6F1 100%)', `
    <div class="a" style="left:60px;top:40px;font-family:Anton;font-size:330px;line-height:1;letter-spacing:-4px;
      background:linear-gradient(90deg,${NAVY} 0%,#6B6FB0 60%,#C9B6D9 100%);-webkit-background-clip:text;color:transparent">100%</div>
    <div class="a" style="left:66px;top:390px;font-family:Anton;font-size:80px;letter-spacing:-.5px;color:${NAVY}">HALAL. <span style="color:#9C8FBF">NO GUESSWORK.</span></div>
    ${[['SUPPORTS GLOWING,<br>YOUNGER-LOOKING SKIN*', 560], ['SUPPORTS THICKER,<br>FULLER-LOOKING HAIR*', 730], ['ONE SCOOP,<br>NEVER CLUMPY', 900]].map(([t, y]) =>
      `<div class="a" style="left:66px;top:${y}px;display:flex;gap:22px;align-items:flex-start">${tick(INK)}
       <div style="font-family:Anton;font-size:46px;line-height:1.08;color:${INK};letter-spacing:.3px">${t}</div></div>`).join('')}
    <div class="a" style="left:600px;top:640px;width:480px;height:480px;border-radius:50%;background:radial-gradient(closest-side,rgba(201,163,94,.22),rgba(201,163,94,0))"></div>
    ${pouch(620, 560, 620, 12, .32)}
    <div class="a" style="right:60px;top:60px;text-align:center;font-family:'DM Serif';font-size:34px;color:${NAVY}">RizqPure</div>
    <div class="a" style="left:66px;top:1090px;font-weight:800;font-size:56px;color:${INK}">RIZQPURE</div>
    <div class="a" style="left:68px;top:1158px;font-size:26px;letter-spacing:1px;color:#5A5468">HALAL COLLAGEN PROTEIN</div>
    <div class="a" style="left:66px;top:1220px;padding:20px 48px;border-radius:40px;background:#CDBFE3;font-family:Anton;font-size:32px;letter-spacing:1px;color:${INK}">SHOP NOW!</div>
    <div class="a" style="left:520px;right:40px;bottom:30px;text-align:right;font-size:15px;color:#6C6680">*${CLAIM}</div>`),

  // 2 ── "Glowing skin by this time next week" → honest habit urgency
  'glow-up-starts-this-week': page('linear-gradient(160deg,#FBF8F3 0%,#F4EEF4 55%,#EDE7F1 100%)', `
    <div class="a" style="left:-200px;top:-100px;width:900px;height:420px;transform:rotate(-18deg);background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.7),rgba(255,255,255,0));filter:blur(30px)"></div>
    <div class="a" style="top:70px;width:100%;text-align:center;font-family:'Playfair';font-weight:500;font-size:86px;line-height:1.02;letter-spacing:-2px;color:${INK}">
      YOUR <span style="color:#8E86BE">GLOW-UP</span> STARTS<br>THIS WEEK</div>
    <div class="a" style="top:282px;width:100%;text-align:center;font-weight:500;font-size:36px;color:${INK}">If you start today</div>
    ${pouch(170, 430, 500, -4, .25)}${pouch(630, 430, 500, 4, .25)}${pouch(360, 380, 600, 0, .32)}
    <div class="a" style="left:60px;right:60px;top:1060px;display:flex;gap:12px">
      ${['Start today', 'M', 'T', 'W', 'T', 'F', 'Daily ritual ✓'].map((t, i) => {
        const end = i === 0 || i === 6;
        return `<div style="flex:1;text-align:center"><div style="font-weight:800;font-size:24px;color:${INK};margin-bottom:12px">DAY ${i + 1}</div>
          <div style="height:136px;border:2px solid #D9CFE6;background:${end ? '#CDBFE3' : '#fff'};display:flex;align-items:center;justify-content:center;
            font-weight:800;font-size:${end ? 26 : 44}px;line-height:1.12;color:${INK};padding:0 6px">${t}</div></div>`;
      }).join('')}
    </div>
    <div class="a" style="left:0;right:0;bottom:30px;text-align:center;font-size:16px;color:#6C6680">Supports skin vitality. ${CLAIM}</div>`),

  // 3 ── Testimonial headline + stars + ticks
  'testimonial-finally-glowing': page('linear-gradient(135deg,#FFFFFF 0%,#F2F0F5 60%,#E8E5EE 100%)', `
    <div class="a" style="top:80px;width:100%;text-align:center;font-family:'Playfair';font-weight:500;font-size:92px;line-height:1.05;letter-spacing:-2px;color:${INK}">
      MY SKIN IS<br>FINALLY <span style="background:#D8CCEA;padding:0 14px">GLOWING</span></div>
    <div class="a" style="top:318px;width:100%;text-align:center;font-size:60px;letter-spacing:10px;color:#F2B92E">★★★★★</div>
    <div class="a" style="top:410px;left:110px;right:110px;text-align:center;font-family:'Playfair';font-style:italic;font-size:44px;line-height:1.3;color:#3A3446">
      “My skin is glowing like never before. I wish I'd found this sooner.”</div>
    <div class="a" style="top:560px;width:100%;text-align:center;font-weight:800;font-size:22px;letter-spacing:2px;color:#4A4458">VERIFIED CUSTOMER</div>
    ${[['100% HALAL BOVINE<br>COLLAGEN PEPTIDES', 700], ['SUPPORTS SKIN, HAIR<br>&amp; JOINTS*', 850], ['PART OF EVERY ORDER<br>GOES TO CHARITY', 1000]].map(([t, y]) =>
      `<div class="a" style="left:80px;top:${y}px;display:flex;gap:24px;align-items:center">${circTick(INK)}
       <div style="font-weight:800;font-size:38px;line-height:1.15;color:${INK}">${t}</div></div>`).join('')}
    ${pouch(590, 640, 620, 14, .3)}
    <div class="a" style="left:80px;top:1180px;font-family:'DM Serif';font-size:44px;color:${NAVY}">RizqPure</div>
    <div class="a" style="left:80px;right:60px;bottom:30px;font-size:15px;color:#6C6680">*${CLAIM}</div>`),

  // 4 ── Problem + routine equation + offer
  'thin-flat-hair-routine': page('radial-gradient(100% 80% at 50% 45%,#FAFAF7 0%,#EFEEEA 70%,#E5E3DE 100%)', `
    <div class="a" style="top:110px;width:100%;text-align:center;font-family:'Archivo Black';font-size:92px;line-height:1.05;
      background:linear-gradient(90deg,#3E3B48,#8C88A0);-webkit-background-clip:text;color:transparent">THIN, FLAT,<br>LIFELESS HAIR?</div>
    <div class="a" style="top:340px;width:100%;text-align:center;font-weight:700;font-size:34px;letter-spacing:.5px;color:#55525E">THE RIZQPURE RITUAL SUPPORTS IT FROM WITHIN*</div>
    <div class="a" style="left:0;right:0;top:470px;display:flex;justify-content:center;align-items:center;gap:30px">
      <div style="text-align:center"><img src="${POUCH}" style="height:360px;filter:drop-shadow(0 18px 18px rgba(0,0,0,.25))"><div style="font-style:italic;font-weight:700;font-size:32px;color:#6A6773;margin-top:16px">RizqPure</div></div>
      <div style="font-weight:900;font-size:90px;color:#A9A6B2;margin-bottom:60px">+</div>
      <div style="text-align:center"><div style="width:240px;height:330px;display:flex;align-items:center;justify-content:center">${icon('mug', '#4A4758', 210, 1.1)}</div><div style="font-style:italic;font-weight:700;font-size:32px;color:#6A6773;margin-top:16px">Your morning drink</div></div>
      <div style="font-weight:900;font-size:90px;color:#A9A6B2;margin-bottom:60px">+</div>
      <div style="text-align:center"><div style="width:240px;height:330px;display:flex;align-items:center;justify-content:center">${icon('cal', '#4A4758', 200, 1.1)}</div><div style="font-style:italic;font-weight:700;font-size:32px;color:#6A6773;margin-top:16px">Every day</div></div>
    </div>
    <div class="a" style="top:960px;width:100%;text-align:center;font-family:'Archivo Black';font-size:150px;line-height:1;
      background:linear-gradient(90deg,#3E3B48,#8C88A0);-webkit-background-clip:text;color:transparent">15% OFF</div>
    <div class="a" style="top:1125px;width:100%;text-align:center;font-weight:700;font-size:34px;letter-spacing:3px;color:#55525E">WHEN YOU BUNDLE</div>
    <div class="a" style="left:80px;right:80px;bottom:34px;text-align:center;font-size:16px;color:#6C6680">*Supports hair vitality. ${CLAIM}</div>`),

  // 5 ── Four icon benefits around the product
  'made-easier-halal-collagen': page('radial-gradient(90% 70% at 50% 45%,#FAFAFE 0%,#EEF0FB 60%,#E3E6F7 100%)', `
    <div class="a" style="top:80px;width:100%;text-align:center;font-weight:600;font-size:42px;letter-spacing:.5px;color:#5B5675">YOUR GLOW-UP MADE EASIER WITH</div>
    <div class="a" style="top:140px;width:100%;text-align:center;font-weight:900;font-style:italic;font-size:104px;line-height:1.02;letter-spacing:-2px;
      background:linear-gradient(90deg,#3B3F86,#8B7FB8);-webkit-background-clip:text;color:transparent">CERTIFIED HALAL<br>COLLAGEN</div>
    <div class="a" style="top:370px;width:100%;text-align:center;font-style:italic;font-size:32px;color:#4A4660">100% halal, clean formula</div>
    ${pouch(372, 480, 480, 0, .28)}
    ${[['sparkle', 'Supports glowing,<br>younger-looking skin*', 50, 520], ['hair', 'Supports thicker,<br>fuller-looking hair*', 750, 520],
       ['joint', 'Supports joints for<br>prayer &amp; movement*', 50, 820], ['heart', 'Part of every order<br>goes to charity', 750, 820]].map(([k, t, x, y]) =>
      `<div class="a" style="left:${x}px;top:${y}px;width:280px;text-align:center">${icon(k, '#2F2B45', 96)}
        <div style="font-style:italic;font-size:31px;line-height:1.25;color:#3A3550;margin-top:14px">${t}</div></div>`).join('')}
    <div class="a" style="left:0;right:0;bottom:70px;text-align:center;font-style:italic;font-size:22px;color:#4A4660">Results may vary based on individual use</div>
    <div class="a" style="left:80px;right:80px;bottom:30px;text-align:center;font-size:15px;color:#6C6680">*${CLAIM}</div>`),
};

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [name, html] of Object.entries(ADS)) {
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    const f = path.join(out, `ad-${name}-1080x1350.png`); await p.screenshot({ path: f }); console.log(f);
  }
  await b.close();
})();
