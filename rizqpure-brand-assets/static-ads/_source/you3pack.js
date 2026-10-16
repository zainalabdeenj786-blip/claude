// RizqPure 3-Pack: direct "you" call-out ads. usage: node you3pack.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const { portrait } = require('./cartoon.js');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, w = 'normal', s = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/ttf;base64,${b64(F(f))});font-weight:${w};font-style:${s}}`;
const FONTS = face('DM Sans', 'DMSans%5Bopsz,wght%5D.ttf', '100 1000') + face('Playfair', 'PlayfairDisplay%5Bwght%5D.ttf', '400 900') +
  face('Playfair', 'PlayfairDisplay-Italic%5Bwght%5D.ttf', '400 900', 'italic') + face('Archivo Black', 'ArchivoBlack-Regular.ttf') +
  face('Anton', 'Anton-Regular.ttf') + face('Hand', 'ArchitectsDaughter-Regular.ttf') + face('Marker', 'PermanentMarker-Regular.ttf');
const POUCH = 'data:image/png;base64,' + b64(path.join(__dirname, '..', 'call', 'pouch.png'));
const NAVY = '#1F2457', INK = '#211D33', GOLD = '#C9A35E', CREAM = '#FBF6EE';
const CLAIM = 'Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.';
const page = (bg, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box} body{width:1080px;height:1350px;overflow:hidden;position:relative;font-family:'DM Sans';background:${bg}}
.a{position:absolute}</style></head><body>${body}</body></html>`;
const pouch = (x, y, h, rot = 0, sh = .3, z = 1) => `<img class="a" src="${POUCH}" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg);z-index:${z};
  filter:drop-shadow(0 ${h * .05}px ${h * .05}px rgba(30,25,60,${sh})) drop-shadow(0 ${h * .012}px ${h * .015}px rgba(30,25,60,${sh}))">`;
const trio = (cx, top, h, sh = .32) => { const w = h * .7; return pouch(cx - w * 1.18, top + h * .08, h * .88, -9, sh, 1) + pouch(cx + w * .3, top + h * .08, h * .88, 9, sh, 1) + pouch(cx - w / 2, top, h, 0, sh, 2); };
const foot = (t, c = '#6C6680') => `<div class="a" style="left:0;right:0;bottom:0;padding:14px 80px 24px;text-align:center;font-size:16px;color:${c}">*${t}</div>`;
const btn = (t, top, bg = INK, fg = '#fff') => `<div class="a" style="left:50%;top:${top}px;transform:translateX(-50%);white-space:nowrap;padding:24px 60px;border-radius:60px;background:${bg};color:${fg};font-weight:800;font-size:34px;box-shadow:0 10px 24px rgba(20,20,50,.18)">${t}</div>`;
const tick = `<svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="16" height="16" rx="2"/><path d="M7 12l3.5 3.5L22 4"/></svg>`;

// direct pain trio (shared template)
const youPain = (k, pre, big, sub, bg, accent) => page(bg, `
  <div class="a" style="top:70px;width:100%;text-align:center;font-family:Playfair;font-weight:700;font-size:40px;color:${NAVY}">RizqPure</div>
  <div class="a" style="top:170px;left:80px;right:80px;text-align:center;font-weight:700;font-size:46px;letter-spacing:4px;color:${accent}">${pre}</div>
  <div class="a" style="top:250px;left:60px;right:60px;text-align:center;font-family:'Archivo Black';font-size:88px;line-height:1.04;color:${INK}">${big}</div>
  <div class="a" style="top:${k === 'skin' ? 560 : 560}px;left:110px;right:110px;text-align:center;font-size:36px;line-height:1.4;color:#45405A">${sub}</div>
  ${trio(540, 760, 330)}
  ${btn('Commit to you: 15% off the 3-pack', 1150)}
  ${foot(CLAIM)}`);

const ADS = {
  // 1 — "This is for you if…" checklist
  'this-is-for-you-if': page(`linear-gradient(180deg,${CREAM},#F1E6D6)`, `
    <div class="a" style="top:70px;left:80px;font-family:Playfair;font-weight:700;font-size:40px;color:${NAVY}">RizqPure</div>
    <div class="a" style="top:150px;left:80px;font-family:'Archivo Black';font-size:96px;line-height:1;color:${INK}">THIS IS<br>FOR YOU IF...</div>
    ${["You found more hair in the drain this week", "You've spotted new fine lines in your selfie camera", "Your knees ache going into sujood", "You're tired of checking every collagen label"].map((t, i) =>
      `<div class="a" style="left:80px;top:${410 + i * 120}px;width:900px;display:flex;gap:22px;align-items:flex-start">${tick}<div style="font-weight:700;font-size:36px;line-height:1.2;color:${INK}">${t}</div></div>`).join('')}
    ${trio(828, 890, 290)}
    <div class="a" style="left:80px;width:490px;top:950px;font-family:Playfair;font-style:italic;font-size:48px;line-height:1.2;color:${NAVY}">...then you're ready for the RizqPure 3-pack.</div>
    <div class="a" style="left:80px;top:1110px;padding:24px 56px;border-radius:60px;background:${INK};color:#fff;font-weight:800;font-size:34px">Get yours: 15% off →</div>
    ${foot(CLAIM)}`),

  // 2 — Family share
  'one-for-you-mum-sister': page('radial-gradient(90% 70% at 50% 40%,#FFFFFF 0%,#F5F1F6 60%,#ECE5EF 100%)', `
    <div class="a" style="top:60px;width:100%;text-align:center;font-family:Playfair;font-weight:600;font-size:76px;line-height:1.1;letter-spacing:-1.5px;color:${INK}">
      One for you.<br>One for Mum.<br><i style="color:#9A6B2E">One for your sister.</i></div>
    ${[['you', 'YOU', 'those new fine lines', {}, 70], ['mum', 'MUM', 'her knees in sujood', { older: true }, 390], ['sis', 'YOUR SISTER', 'her postpartum shedding', { hijab: ['#CDB8E4', '#A991CC', '#B7A0D6'] }, 710]].map(([id, who, pain, opt, x]) =>
      `<div class="a" style="left:${x}px;top:420px;width:300px;text-align:center">
        <div style="height:330px;display:flex;justify-content:center;align-items:flex-end;overflow:hidden">${portrait('f' + id, 300, opt)}</div>
        <div style="margin-top:4px;position:relative;height:250px"><img src="${POUCH}" style="height:250px;filter:drop-shadow(0 12px 12px rgba(30,25,60,.3))"></div>
        <div style="font-weight:800;font-size:30px;letter-spacing:2px;color:${INK};margin-top:10px">${who}</div>
        <div style="font-size:26px;color:#5A5468;margin-top:4px">${pain}</div></div>`).join('')}
    <div class="a" style="top:1160px;width:100%;text-align:center;font-weight:800;font-size:40px;color:${INK}">The 3-pack: 15% off, shared with the women you love.</div>
    ${foot(CLAIM)}`),

  // 3 — Retarget single-pouch buyers
  'loved-your-first-pouch': page(`radial-gradient(90% 70% at 50% 45%,#2F3378 0%,#22265E 55%,#151837 100%)`, `
    <div class="a" style="top:110px;width:100%;text-align:center;color:#fff;font-family:Playfair;font-weight:500;font-size:96px;line-height:1.05;letter-spacing:-2px">You loved<br>your first pouch.</div>
    <div class="a" style="top:350px;width:100%;text-align:center;color:#F2C462;font-family:Playfair;font-style:italic;font-size:76px">Now keep the glow going.</div>
    <div class="a" style="top:500px;left:120px;right:120px;text-align:center;color:#E6E3F5;font-size:36px;line-height:1.4">You've started something good for your skin, hair and joints*. The 3-pack makes sure you never break the ritual.</div>
    <div class="a" style="left:240px;top:700px;width:600px;height:400px;border-radius:50%;background:radial-gradient(closest-side,rgba(242,196,98,.25),rgba(242,196,98,0))"></div>
    ${trio(540, 700, 360, .5)}
    ${btn('Stock up &amp; save 15%', 1150, GOLD, INK)}
    ${foot(CLAIM, 'rgba(255,255,255,.65)')}`),

  // 4 — "Yes, you."
  'yes-you': page('#F2C462', `
    <div class="a" style="top:80px;left:70px;font-family:Anton;font-size:250px;line-height:.9;color:${INK}">YES,<br>YOU.</div>
    <svg class="a" style="left:560px;top:120px" width="420" height="380" viewBox="0 0 420 380" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
      <path d="M380 40 C 300 60, 200 120, 140 300"/><path d="M95 250 L138 310 L200 270"/></svg>
    <div class="a" style="top:560px;left:70px;right:70px;font-weight:800;font-size:54px;line-height:1.18;color:${INK}">You've been "meaning to start" collagen for months.</div>
    <div class="a" style="top:780px;left:70px;width:500px;font-size:36px;line-height:1.4;color:#3A3226">Your skin, your hair and your knees have waited long enough. Start properly with the 3-pack, at 15% off.*</div>
    ${trio(828, 820, 290, .35)}
    <div class="a" style="left:70px;top:1140px;padding:24px 56px;border-radius:60px;background:${INK};color:#fff;font-weight:800;font-size:34px">Start today →</div>
    ${foot(CLAIM, '#5A4A2A')}`),

  // 5–7 — Direct pain trio
  'you-fine-lines': youPain('skin', 'YOU\'RE NOT IMAGINING IT.', 'THOSE FINE LINES<br>ARE REAL.', 'And you deserve more than another cream. Support younger-looking skin from within, every single day.*', 'linear-gradient(180deg,#FFF7F2,#F4E3EC)', '#B76E8E'),
  'you-hair-drain': youPain('hair', 'YOU DESERVE BETTER THAN', 'COUNTING HAIRS<br>IN THE DRAIN.', 'Shedding, thinning, postpartum hair loss: you\'ve felt it. Support thicker, fuller-looking hair from within.*', 'linear-gradient(180deg,#F5F4FB,#E3E5F6)', '#5B62B5'),
  'you-knees-sujood': youPain('joints', 'YOUR KNEES SHOULDN\'T', 'DREAD SUJOOD.', 'Stiff, aching joints shouldn\'t take the peace out of your prayer. Support your joints from within.*', 'linear-gradient(180deg,#FBF6EE,#EFE3CF)', '#9A6B2E'),

  // 8 — Choose your start (both positive)
  'choose-your-start': page(`linear-gradient(180deg,${CREAM},#EFE7DA)`, `
    <div class="a" style="top:80px;width:100%;text-align:center;font-family:'Archivo Black';font-size:92px;line-height:1.02;color:${INK}">HOW WILL<br>YOU START?</div>
    ${[['JUST CURIOUS?', 'Start with one pouch.', 'Perfect for trying your new daily ritual.', 'Try one →', 80, false], ['READY FOR REAL CHANGE?', 'Go for the 3-pack.', 'Your skin, hair &amp; joints*, fully stocked. Save 15%.', 'Get three →', 560, true]].map(([h, a, b, c, x, hl]) =>
      `<div class="a" style="left:${x}px;top:330px;width:440px;height:860px;border-radius:36px;background:${hl ? INK : '#fff'};color:${hl ? '#fff' : INK};
         box-shadow:0 20px 40px rgba(40,30,20,.12);${hl ? 'border:4px solid ' + GOLD : 'border:3px solid #E5DCCD'};text-align:center;padding:44px 30px">
        ${hl ? `<div style="position:absolute;left:50%;top:-24px;transform:translateX(-50%);background:${GOLD};color:${INK};font-weight:800;font-size:24px;letter-spacing:2px;padding:8px 22px;border-radius:30px;white-space:nowrap">SAVE 15%</div>` : ''}
        <div style="font-weight:800;font-size:28px;letter-spacing:2px;color:${hl ? '#F2C462' : '#9A6B2E'}">${h}</div>
        <div style="font-family:Playfair;font-weight:600;font-size:44px;line-height:1.1;margin-top:16px;white-space:nowrap">${a}</div>
        <div style="height:340px;position:relative;margin-top:30px">${hl ? trio(190, 10, 300, .45) : pouch(110, 0, 330, 0, .25)}</div>
        <div style="font-size:30px;line-height:1.35;margin-top:30px;opacity:.9">${b}</div>
        <div style="position:absolute;left:50%;bottom:44px;transform:translateX(-50%);white-space:nowrap;padding:18px 44px;border-radius:50px;font-weight:800;font-size:30px;
          background:${hl ? GOLD : INK};color:${hl ? INK : '#fff'}">${c}</div></div>`).join('')}
    ${foot(CLAIM)}`),

  // 9 — "Dear you," handwritten note
  'dear-you-letter': page('linear-gradient(160deg,#EDE6DA,#DCD0BE)', `
    <div class="a" style="left:110px;top:90px;width:860px;height:1050px;background:#FFFDF8;transform:rotate(-1.5deg);box-shadow:0 30px 50px rgba(60,40,20,.25);
      background-image:repeating-linear-gradient(180deg,transparent 0 63px,rgba(120,140,200,.25) 63px 65px);padding:80px 80px">
      <div style="font-family:Marker;font-size:58px;color:${NAVY};margin-bottom:20px">Dear you,</div>
      <div style="font-family:Hand;font-size:39px;line-height:65px;color:#2B2A40">
        You check every label.<br>You kneel in sujood five times a day.<br>You've watched your hair thin and<br>your skin lose its glow, and you<br>
        kept going anyway.<br><br>You deserve collagen you can trust,<br>and a ritual that doesn't run out.<br></div>
      <div style="font-family:Marker;font-size:46px;color:${NAVY};margin-top:30px">Love, RizqPure 🤍</div>
    </div>
    ${trio(800, 900, 300, .4)}
    <div class="a" style="left:110px;top:1190px;padding:24px 50px;border-radius:60px;background:${INK};color:#fff;font-weight:800;font-size:32px">The 3-pack: 15% off →</div>
    ${foot(CLAIM, '#5A4E40')}`),

  // 10 — Ramadan ritual
  'ramadan-ritual': page('radial-gradient(90% 70% at 50% 35%,#2E3170 0%,#1C1F4C 55%,#0F1130 100%)', `
    ${Array.from({ length: 40 }, (_, i) => `<div class="a" style="left:${(i * 131) % 1080}px;top:${(i * 71) % 560}px;width:${2 + i % 3}px;height:${2 + i % 3}px;border-radius:50%;background:#fff;opacity:${.3 + (i % 4) * .15}"></div>`).join('')}
    <svg class="a" style="left:800px;top:70px" width="180" height="180" viewBox="0 0 100 100"><path d="M62 10 A42 42 0 1 0 90 72 A34 34 0 1 1 62 10Z" fill="${GOLD}"/></svg>
    <div class="a" style="top:150px;left:80px;right:80px;color:#fff;font-family:Playfair;font-weight:500;font-size:92px;line-height:1.05;letter-spacing:-2px">Your Ramadan<br>ritual, <i style="color:#F2C462">sorted.</i></div>
    <div class="a" style="top:430px;left:80px;right:300px;color:#E6E3F5;font-size:36px;line-height:1.4">Long fasts can leave you looking and feeling drained. One scoop at suhoor for your skin, hair and joints*, all month long.</div>
    ${trio(540, 680, 380, .55)}
    ${btn('Your Ramadan 3-pack: 15% off', 1140, GOLD, INK)}
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
