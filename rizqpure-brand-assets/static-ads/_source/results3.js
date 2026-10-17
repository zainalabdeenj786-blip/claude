// RizqPure 3-Pack "results" ads: direct YOU copy with yellow highlighter. usage: node results3.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const { portrait } = require('./cartoon.js');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, w = 'normal', s = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/ttf;base64,${b64(F(f))});font-weight:${w};font-style:${s}}`;
const FONTS = face('DM Sans', 'DMSans%5Bopsz,wght%5D.ttf', '100 1000') + face('Playfair', 'PlayfairDisplay%5Bwght%5D.ttf', '400 900') +
  face('Playfair', 'PlayfairDisplay-Italic%5Bwght%5D.ttf', '400 900', 'italic') + face('Archivo Black', 'ArchivoBlack-Regular.ttf') +
  face('Anton', 'Anton-Regular.ttf') + face('Marker', 'PermanentMarker-Regular.ttf');
const POUCH = 'data:image/png;base64,' + b64(path.join(__dirname, '..', 'call', 'pouch.png'));
const INK = '#17162B', NAVY = '#1F2457', GOLD = '#C9A35E', YEL = '#F7D84A', CREAM = '#FBF6EE';
const CLAIM = 'Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.';
const page = (bg, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box} body{width:1080px;height:1350px;overflow:hidden;position:relative;font-family:'DM Sans';background:${bg}}
.a{position:absolute}
/* yellow highlighter stroke behind a word */
.hl{position:relative;display:inline-block;z-index:0;padding:0 .08em}
.hl::before{content:'';position:absolute;left:-.06em;right:-.06em;top:.18em;bottom:.04em;z-index:-1;background:${YEL};border-radius:.12em .3em .14em .26em;transform:rotate(-1.6deg) skewX(-6deg)}
.ul{background:linear-gradient(transparent 62%,${YEL} 62%,${YEL} 92%,transparent 92%);padding:0 .05em}
</style></head><body>${body}</body></html>`;
const H = (t) => `<span class="hl">${t}</span>`;
const pouch = (x, y, h, rot = 0, sh = .3, z = 1) => `<img class="a" src="${POUCH}" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg);z-index:${z};
  filter:drop-shadow(0 ${h * .05}px ${h * .05}px rgba(30,25,60,${sh})) drop-shadow(0 ${h * .012}px ${h * .015}px rgba(30,25,60,${sh}))">`;
const trio = (cx, top, h, sh = .32) => { const w = h * .7; return pouch(cx - w * 1.18, top + h * .08, h * .88, -9, sh, 1) + pouch(cx + w * .3, top + h * .08, h * .88, 9, sh, 1) + pouch(cx - w / 2, top, h, 0, sh, 2); };
const foot = (t, c = '#6C6680') => `<div class="a" style="left:0;right:0;bottom:0;padding:14px 80px 24px;text-align:center;font-size:16px;color:${c}">*${t}</div>`;
const btn = (t, top, bg = INK, fg = '#fff', left = null) => `<div class="a" style="${left === null ? 'left:50%;transform:translateX(-50%)' : `left:${left}px`};top:${top}px;white-space:nowrap;padding:24px 60px;border-radius:60px;background:${bg};color:${fg};font-weight:800;font-size:34px;box-shadow:0 10px 24px rgba(20,20,50,.18)">${t}</div>`;
const logo = (c = NAVY, top = 60) => `<div class="a" style="top:${top}px;width:100%;text-align:center;font-family:Playfair;font-weight:700;font-size:38px;color:${c}">RizqPure</div>`;

const ADS = {
  // 1 — results need time
  'your-results-need-time': page(CREAM, `
    ${logo()}
    <div class="a" style="top:150px;left:70px;right:70px;text-align:center;font-family:'Archivo Black';font-size:86px;line-height:1.08;color:${INK}">
      ${H('YOUR')} RESULTS<br>NEED TIME.<br>${H('YOU')} DESERVE<br>THE FULL RITUAL.</div>
    <div class="a" style="top:690px;left:120px;right:120px;text-align:center;font-size:34px;line-height:1.4;color:#3E3A50">Collagen works with consistency. The 3-pack gives <b>you</b> the time your skin, hair and joints* need.</div>
    ${trio(540, 860, 280)}
    ${btn('Get your 3-pack: 15% off', 1170)}
    ${foot(CLAIM)}`),

  // 2 — outside vs inside
  'tried-everything-outside': page(`linear-gradient(180deg,#FFFFFF,#F1EEF7)`, `
    ${logo()}
    <div class="a" style="top:150px;left:70px;right:70px;text-align:center;font-family:'Archivo Black';font-size:84px;line-height:1.1;color:${INK}">
      ${H('YOU')}'VE TRIED<br>EVERYTHING ON<br>THE ${H('OUTSIDE')}.</div>
    <div class="a" style="top:470px;left:90px;right:90px;text-align:center;font-family:Playfair;font-style:italic;font-weight:500;font-size:62px;color:${NAVY}">Now give yourself the inside.</div>
    <div class="a" style="top:590px;left:130px;right:130px;text-align:center;font-size:34px;line-height:1.4;color:#3E3A50">Serums, masks, oils and shampoos can't reach where collagen works. Your 3-pack can.*</div>
    ${trio(540, 790, 320)}
    ${btn('Start your inside-out ritual →', 1170)}
    ${foot(CLAIM)}`),

  // 3 — this one's for you, pain list with highlights
  'this-ones-for-you': page('#17162B', `
    ${logo('#E9D9B0')}
    <div class="a" style="top:140px;left:70px;color:#fff;font-family:Anton;font-size:180px;line-height:.92">THIS ONE'S<br><span style="color:${YEL}">FOR YOU.</span></div>
    ${[['You', 'with the hair in the shower drain.'], ['You', 'noticing new fine lines in the mirror.'], ['You', 'whose knees ache in sujood.']].map(([y, t], i) =>
      `<div class="a" style="left:70px;top:${520 + i * 110}px;width:510px;color:#fff;font-weight:600;font-size:33px;line-height:1.2"><span style="color:${INK};background:${YEL};padding:0 12px;font-weight:900">${y}</span> ${t}</div>`).join('')}
    ${trio(828, 540, 290, .6)}
    <div class="a" style="left:70px;right:70px;top:900px;color:#E6E3F5;font-size:40px;line-height:1.35">Your 3-pack is made for <b style="color:#fff">you</b>: halal collagen that supports skin, hair &amp; joints*, every single day.</div>
    ${btn('Claim yours: 15% off', 1150, YEL, INK, 70)}
    ${foot(CLAIM, 'rgba(255,255,255,.55)')}`),

  // 4 — commit
  'dont-just-start-commit': page(YEL, `
    ${logo(INK)}
    <div class="a" style="top:150px;left:60px;right:60px;text-align:center;font-family:Anton;font-size:200px;line-height:.95;color:${INK}">DON'T JUST<br>START.</div>
    <div class="a" style="top:540px;left:0;right:0;text-align:center"><span style="display:inline-block;background:${INK};color:${YEL};font-family:Anton;font-size:190px;line-height:1.05;padding:0 40px;transform:rotate(-2deg)">COMMIT.</span></div>
    <div class="a" style="top:790px;left:120px;width:460px;font-weight:700;font-size:38px;line-height:1.3;color:${INK}">Your skin, your hair and your knees respond to what <u>you</u> do every day.*</div>
    ${trio(810, 760, 300, .35)}
    ${btn('Commit to you: 15% off', 1170)}
    ${foot(CLAIM, '#4A4020')}`),

  // 5 — future self
  'future-you-says-thank-you': page('radial-gradient(90% 70% at 50% 40%,#FFFFFF 0%,#F5F0F6 60%,#EADFEF 100%)', `
    ${logo()}
    <div class="a" style="top:140px;left:60px;right:60px;text-align:center;font-family:Playfair;font-weight:600;font-size:94px;line-height:1.05;letter-spacing:-2px;color:${INK}">
      <span class="hl">Future you</span><br>is already<br>saying thank you.</div>
    <div class="a" style="left:120px;top:520px">${portrait('fy', 260, {})}</div>
    <div class="a" style="left:380px;top:560px;width:600px;padding:30px 36px;border-radius:36px 36px 36px 8px;background:#fff;box-shadow:0 14px 30px rgba(40,30,60,.12);
      font-family:Playfair;font-style:italic;font-size:40px;line-height:1.3;color:${INK}">"Thank you for sticking with it. My skin, my hair, my knees: we feel it."</div>
    ${trio(560, 860, 280)}
    ${btn('Do it for future you: 15% off', 1180)}
    ${foot(CLAIM)}`),

  // 6 — hair habit
  'one-habit-fuller-hair': page(`linear-gradient(180deg,#F4F3FB,#DFE2F5)`, `
    ${logo()}
    <div class="a" style="top:150px;left:70px;right:70px;text-align:center;font-family:'Archivo Black';font-size:82px;line-height:1.12;color:${INK}">
      ${H('YOU')}'RE ONE<br>DAILY ${H('HABIT')} AWAY<br>FROM FULLER-<br>LOOKING HAIR*</div>
    <div class="a" style="top:590px;left:130px;right:130px;text-align:center;font-size:34px;line-height:1.4;color:#3E3A50">Less time counting hairs in the drain. More time loving your reflection. Your 3-pack keeps the habit going.</div>
    ${trio(540, 790, 320)}
    ${btn('Build your habit: 15% off', 1170)}
    ${foot('Supports hair vitality. ' + CLAIM)}`),

  // 7 — skin "undersupported"
  'skin-isnt-tired': page(`linear-gradient(180deg,#FFF7F2,#F6E4EA)`, `
    ${logo()}
    <div class="a" style="top:150px;left:70px;right:70px;text-align:center;font-family:'Archivo Black';font-size:88px;line-height:1.1;color:${INK}">
      ${H('YOUR')} SKIN<br>ISN'T TIRED.<br>IT'S ${H('UNDER-')}<br>${H('SUPPORTED.')}</div>
    <div class="a" style="top:640px;left:130px;right:130px;text-align:center;font-size:34px;line-height:1.4;color:#3E3A50">Fine lines and dullness? Give <b>your</b> skin the daily collagen support it's been missing, from within.*</div>
    ${trio(540, 820, 300)}
    ${btn('Support your skin: 15% off', 1170)}
    ${foot('Supports skin vitality. ' + CLAIM)}`),

  // 8 — joints / prayer
  'you-stand-bow-kneel': page(`radial-gradient(90% 70% at 50% 35%,#2E3170 0%,#1C1F4C 60%,#101233 100%)`, `
    ${logo('#E9D9B0')}
    <div class="a" style="top:150px;left:70px;right:70px;text-align:center;color:#fff;font-family:'Archivo Black';font-size:80px;line-height:1.12">
      ${H('<span style="color:' + INK + '">YOU</span>')} STAND.<br>${H('<span style="color:' + INK + '">YOU</span>')} BOW.<br>${H('<span style="color:' + INK + '">YOU</span>')} KNEEL.</div>
    <div class="a" style="top:480px;left:110px;right:110px;text-align:center;color:#F2C462;font-family:Playfair;font-style:italic;font-size:50px">Every day. Now look after your knees.</div>
    <div class="a" style="top:600px;left:140px;right:140px;text-align:center;color:#E6E3F5;font-size:32px;line-height:1.4">Halal collagen that supports your joints from within, so your prayers feel as peaceful as they should.*</div>
    ${trio(540, 790, 320, .6)}
    ${btn('For your joints: 15% off the 3-pack', 1170, YEL, INK)}
    ${foot('Supports joint vitality. ' + CLAIM, 'rgba(255,255,255,.55)')}`),

  // 9 — lock-screen notification
  'reminder-for-you': page('linear-gradient(160deg,#8C93D9 0%,#5A63C2 40%,#2E3378 100%)', `
    <div class="a" style="top:110px;width:100%;text-align:center;color:#fff;font-family:Inter;font-weight:300;font-size:200px;letter-spacing:-4px">7:00</div>
    <div class="a" style="top:330px;width:100%;text-align:center;color:#fff;font-family:Inter;font-size:38px;opacity:.9">Friday, your new routine</div>
    ${[['RizqPure', 'now', `Reminder for <b>you</b> 🤍`, `Your skin, hair &amp; joints* are waiting. Your 3-pack is 15% off today.`],
       ['RizqPure', '1m ago', `<span style="background:${YEL};color:${INK};padding:0 8px">You</span> deserve the full ritual`, 'One scoop with your morning chai, every day. Keep the glow going.']].map(([a, t, h, b], i) =>
      `<div class="a" style="left:60px;right:60px;top:${450 + i * 250}px;padding:30px 34px;border-radius:40px;background:rgba(255,255,255,.82);backdrop-filter:blur(20px);font-family:Inter;color:#111">
        <div style="display:flex;align-items:center;gap:18px;margin-bottom:12px"><div style="width:58px;height:58px;border-radius:14px;background:${NAVY};overflow:hidden;display:flex;justify-content:center"><img src="${POUCH}" style="height:84px;margin-top:4px"></div>
          <div style="font-weight:600;font-size:28px;letter-spacing:1px;flex:1">${a.toUpperCase()}</div><div style="font-size:26px;color:#666">${t}</div></div>
        <div style="font-weight:700;font-size:36px">${h}</div><div style="font-size:31px;line-height:1.3;margin-top:6px;color:#333">${b}</div></div>`).join('')}
    ${trio(540, 1000, 250, .5)}
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
