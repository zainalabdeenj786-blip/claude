// RizqPure remixes, round 2. usage: node remix2.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, w = 'normal', s = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/ttf;base64,${b64(F(f))});font-weight:${w};font-style:${s}}`;
const FONTS = face('DM Sans', 'DMSans%5Bopsz,wght%5D.ttf', '100 1000') + face('Mono', 'SpaceMono-Bold.ttf', 700) +
  face('Hand', 'ArchitectsDaughter-Regular.ttf') + face('Playfair', 'PlayfairDisplay%5Bwght%5D.ttf', '400 900') +
  face('Playfair', 'PlayfairDisplay-Italic%5Bwght%5D.ttf', '400 900', 'italic') + face('Archivo Black', 'ArchivoBlack-Regular.ttf');
const POUCH = 'data:image/png;base64,' + b64(path.join(__dirname, '..', 'call', 'pouch.png'));
const NAVY = '#1F2457', INDIGO = '#2C2F66', GOLD = '#C9A35E';
const page = (W, H, bg, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box} body{width:${W}px;height:${H}px;overflow:hidden;position:relative;font-family:'DM Sans';background:${bg}}
.a{position:absolute}</style></head><body>${body}</body></html>`;
const pouch = (x, y, h, rot = 0, sh = .35) => `<img class="a" src="${POUCH}" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg);
  filter:drop-shadow(0 ${h * .05}px ${h * .05}px rgba(20,20,50,${sh})) drop-shadow(0 ${h * .01}px ${h * .015}px rgba(20,20,50,${sh}))">`;
const CLAIM = 'Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.';

const ADS = {
  // 1 ── Sunbase: editorial 4-circle "system"
  'what-your-body-needs-daily-1080x1350': [1080, 1350, (() => {
    const c = NAVY, R = 232, cx = 540, cy = 700, off = 190;
    const circ = (x, y) => `<div class="a" style="left:${x - R}px;top:${y - R}px;width:${2 * R}px;height:${2 * R}px;border:2.5px solid ${c};border-radius:50%"></div>`;
    const lab = (x, y, t) => `<div class="a" style="left:${x - 130}px;top:${y}px;width:260px;text-align:center;font-family:Mono;font-size:21px;line-height:1.25;color:${c}">${t}</div>`;
    return page(1080, 1350, '#F3E6A8', `
      <div class="a" style="top:70px;width:100%;text-align:center;font-family:Mono;font-size:66px;line-height:1.05;color:${c}">WHAT YOUR BODY<br>NEEDS DAILY</div>
      <div class="a" style="top:236px;width:100%;text-align:center;font-family:Mono;font-size:26px;color:${c}">[ NOURISH, EVERY DAY ]</div>
      ${circ(cx, cy - off)}${circ(cx - off, cy)}${circ(cx + off, cy)}${circ(cx, cy + off)}
      ${lab(cx, cy - off - R + 30, 'HALAL YOU CAN<br>TRUST')}${lab(cx - off - R + 120, cy - 22, 'ONE SCOOP,<br>NOT TEN PILLS')}
      ${lab(cx + off + R - 120, cy - 22, 'JOINTS FOR<br>PRAYER*')}${lab(cx, cy + off + R - 80, 'SKIN THAT<br>GLOWS*')}
      ${pouch(cx - 150, cy - 222, 430, 0, .25)}
      <div class="a" style="left:60px;bottom:96px;font-family:Mono;font-size:20px;line-height:1.3;color:${c}">HALAL COLLAGEN<br>PURE PEPTIDES<br>+ VITAMIN C</div>
      <div class="a" style="left:0;right:0;bottom:118px;text-align:center;font-family:Mono;font-size:20px;line-height:1.3;color:${c}">NOURISHMENT,<br>MADE SIMPLE.</div>
      <div class="a" style="right:60px;bottom:96px;text-align:right;font-family:Mono;font-size:20px;line-height:1.3;color:${c}">KEEP YOUR<br>DAILY ROUTINE<br>MINIMAL</div>
      <div class="a" style="left:60px;right:60px;bottom:34px;text-align:center;font-size:17px;color:${c};opacity:.75">*${CLAIM}</div>`);
  })()],

  // 2 ── Goodnight Tape: "5 signs you bought the wrong…"
  '5-signs-wrong-collagen-1080x1350': [1080, 1350, (() => {
    const dots = Array.from({ length: 140 }, (_, i) => {
      const t = i / 140, a = -1.0 + t * 1.6 + Math.sin(i * 7.3) * .25, r = 120 + (i * 37 % 330);
      const x = 300 + Math.cos(a) * r * .9, y = 860 + Math.sin(a) * r, s = 3 + (i * 13 % 14);
      return `<div class="a" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;border-radius:50%;background:#fff;opacity:${.25 + (i % 5) * .12};filter:blur(${i % 3}px)"></div>`;
    }).join('');
    const items = ["It doesn't name its halal certifier", 'It clumps the second it hits your drink', "You're paying premium prices for a tiny dose", "It's full of sweeteners and fillers", "You're not sure if it's cow, fish… or pig"];
    return page(1080, 1350, 'linear-gradient(160deg,#C9D6F5 0%,#7F95DE 45%,#4B5BB8 100%)', `
      <div class="a" style="left:-80px;top:520px;width:760px;height:700px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.55),rgba(255,255,255,0));filter:blur(10px)"></div>
      ${dots}
      <div class="a" style="top:60px;width:100%;text-align:center;font-family:'Playfair';font-weight:700;font-size:46px;color:#fff;letter-spacing:1px">RizqPure</div>
      <div class="a" style="top:150px;width:100%;text-align:center;font-family:'Archivo Black';font-size:72px;line-height:1.12;color:#111633">5 SIGNS YOU<br>BOUGHT THE WRONG<br>COLLAGEN</div>
      ${pouch(70, 520, 620, -16, .35)}
      <div class="a" style="left:560px;right:56px;top:560px">
        ${items.map((t, i) => `<div style="display:flex;gap:22px;align-items:flex-start;margin-bottom:38px">
          <div style="flex:none;width:52px;height:52px;border-radius:50%;background:#111633;color:#fff;font-weight:800;font-size:28px;display:flex;align-items:center;justify-content:center">${i + 1}</div>
          <div style="font-weight:600;font-size:32px;line-height:1.22;color:#fff;text-shadow:0 1px 10px rgba(20,25,70,.25)">${t}</div></div>`).join('')}
      </div>
      <div class="a" style="left:0;right:0;bottom:56px;text-align:center;font-weight:700;font-size:34px;color:#fff">Switch to certified halal collagen →</div>`);
  })()],

  // 3 ── Altiva: search bar + icon benefits
  'search-bar-1080x1080': [1080, 1080, (() => {
    const ic = {
      halal: '<path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/><path d="M8.5 12l2.4 2.4 4.6-4.8"/>',
      drop: '<path d="M12 3c3.5 4.3 6 7.6 6 10.8A6 6 0 0 1 6 13.8C6 10.6 8.5 7.3 12 3z"/><path d="M9.2 14.5a2.9 2.9 0 0 0 2.8 2.6"/>',
      hair: '<path d="M8 21c-1-5 1.5-8 1-12S7 4 8.5 3"/><path d="M12 21c-.5-5 2-8 1.5-12S12 4 13.5 3"/><path d="M16 21c0-5 2.5-7.5 2-11.5S17 4 18.5 3.5"/>',
      cup: '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M9 3c-1 1.3 1 2 0 3.3M12.5 3c-1 1.3 1 2 0 3.3"/>',
    };
    const row = (k, t, y) => `<div class="a" style="left:70px;top:${y}px;display:flex;align-items:center;gap:30px">
      <div style="width:116px;height:116px;border-radius:50%;background:${INDIGO};display:flex;align-items:center;justify-content:center">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ic[k]}</svg></div>
      <div style="font-weight:500;font-size:44px;color:#1B1D3A">${t}</div></div>`;
    return page(1080, 1080, 'radial-gradient(90% 80% at 75% 55%,#E8E9F7 0%,#D3D5EE 60%,#C3C6E6 100%)', `
      <div class="a" style="left:80px;right:80px;top:150px;height:116px;border-radius:60px;background:#fff;border:3px solid #1B1D3A;display:flex;align-items:center;gap:22px;padding:0 40px;white-space:nowrap">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#1B1D3A" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>
        <div style="font-weight:500;font-size:37px;color:#1B1D3A">halal collagen for glowing skin and fuller hair</div></div>
      <div class="a" style="top:292px;width:100%;text-align:center;font-weight:500;font-size:30px;color:#3A3D5C">RizqPure: one scoop, a world of good.</div>
      ${row('halal', '100% Halal', 420)}${row('drop', 'Glowing Skin*', 590)}${row('hair', 'Fuller Hair*', 760)}
      ${pouch(600, 380, 560, 8, .3)}
      <div class="a" style="left:70px;bottom:56px;font-weight:600;font-size:56px;color:#1B1D3A">rizqpure.com</div>
      <div class="a" style="right:50px;bottom:30px;width:430px;text-align:right;font-size:16px;color:#3A3D5C;opacity:.8">*Supports skin &amp; hair vitality. Vitamin C contributes to normal collagen formation for the normal function of skin.</div>`);
  })()],

  // 4 ── AgeMate: whiteboard lesson
  'whiteboard-collagen-decline-1080x1080': [1080, 1080, page(1080, 1080, 'radial-gradient(120% 90% at 40% 30%,#FAFAF8 0%,#ECECEA 70%,#DCDCDA 100%)', `
    <div class="a" style="left:96px;top:104px;font-family:Hand;font-size:62px;line-height:1.2;color:#1A1A1A">COLLAGEN PRODUCTION<br>DROPS ABOUT 1% A YEAR<br>FROM YOUR MID-20s</div>
    <svg class="a" style="left:60px;top:400px" width="560" height="520" viewBox="0 0 560 520" fill="none" stroke="#1A1A1A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M118 30 C117 160 119 300 118 410 C230 412 380 409 520 411"/>
      <path d="M122 70 C190 64 240 72 290 104 C340 136 372 190 418 250 C452 292 480 318 512 330"/>
      ${[[180, 25], [270, 35], [360, 45], [450, 55]].map(([x, a]) => `<path d="M${x} 404 L${x} 422"/>`).join('')}
    </svg>
    ${[[180, 25], [270, 35], [360, 45], [450, 55]].map(([x, a]) => `<div class="a" style="left:${60 + x - 30}px;top:836px;width:60px;text-align:center;font-family:Hand;font-size:32px;color:#1A1A1A">${a}</div>`).join('')}
    <div class="a" style="left:${60 + 270}px;top:884px;font-family:Hand;font-size:30px;color:#1A1A1A">AGE</div>
    <div class="a" style="left:24px;top:540px;font-family:Hand;font-size:24px;line-height:1.1;color:#1A1A1A;transform:rotate(-2deg)">COLLAGEN<br>LEVELS</div>
    <div class="a" style="left:610px;top:400px;font-family:Hand;font-size:42px;line-height:1.25;color:#1A1A1A">SUPPORT YOUR<br>COLLAGEN FORMATION<br>WITH RIZQPURE*</div>
    <div class="a" style="left:830px;top:720px;width:200px;height:260px;border-radius:50%;background:rgba(0,0,0,.18);filter:blur(28px)"></div>
    ${pouch(800, 690, 270, 3, .25)}
    <div class="a" style="left:96px;right:60px;bottom:40px;font-family:Hand;font-size:22px;color:#444">*${CLAIM}</div>`)],

  // 5 ── "Same smell, different receipt"
  'same-collagen-different-receipt-1080x1350': [1080, 1350, (() => {
    const receipt = (x, label, price, strike, tag) => `
      <div class="a" style="left:${x - 30}px;top:470px;width:420px;height:46px;border-radius:23px;background:linear-gradient(180deg,#D7D7D7,#A9A9A9 60%,#8E8E8E);box-shadow:0 6px 12px rgba(0,0,0,.18)"></div>
      <div class="a" style="left:${x}px;top:500px;width:360px;height:640px;background:#fff;box-shadow:0 18px 30px rgba(0,0,0,.10);
        clip-path:polygon(0 0,100% 0,100% 97%,95% 100%,90% 97%,85% 100%,80% 97%,75% 100%,70% 97%,65% 100%,60% 97%,55% 100%,50% 97%,45% 100%,40% 97%,35% 100%,30% 97%,25% 100%,20% 97%,15% 100%,10% 97%,5% 100%,0 97%)">
        <div style="position:absolute;top:0;left:0;right:0;height:40px;background:linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,0))"></div>
        <div style="position:absolute;top:56px;left:0;right:0;display:flex;justify-content:center">
          ${[-14, 0, 14].map((r, i) => `<img src="${POUCH}" style="height:${i === 1 ? 240 : 200}px;margin:${i === 1 ? 0 : 30}px -26px 0;transform:rotate(${r}deg);z-index:${i === 1 ? 2 : 1};filter:drop-shadow(0 8px 8px rgba(0,0,0,.25))">`).join('')}
        </div>
        <div style="position:absolute;top:322px;left:28px;right:28px;text-align:center;font-family:Mono;font-size:22px;color:#333">${label}</div>
        <div style="position:absolute;top:366px;left:28px;right:28px;border-top:3px solid #222"></div>
        <div style="position:absolute;top:378px;left:0;right:0;text-align:center;font-weight:700;font-size:54px;color:#111">${price}${strike ? ` <s style="font-size:34px;color:#999">${strike}</s>` : ''}</div>
        <div style="position:absolute;top:470px;left:30px;right:30px;font-family:Mono;font-size:12px;line-height:1.3;color:#777;text-align:center">${tag}</div>
        <div style="position:absolute;top:510px;left:40px;right:40px;height:60px;background:repeating-linear-gradient(90deg,#111 0 3px,#fff 3px 5px,#111 5px 6px,#fff 6px 10px,#111 10px 14px,#fff 14px 16px)"></div>
        <div style="position:absolute;top:586px;left:0;right:0;text-align:center;font-family:Mono;font-size:16px;color:#333">THANK YOU!</div>
      </div>`;
    return page(1080, 1350, 'linear-gradient(180deg,#F7F6F3,#EFEDE8)', `
      <div class="a" style="top:96px;width:100%;text-align:center;font-size:24px;color:#555;letter-spacing:1px">100% HALAL · PART OF EVERY ORDER GOES TO CHARITY</div>
      <div class="a" style="top:150px;width:100%;text-align:center;font-family:'Playfair';font-weight:500;font-size:112px;letter-spacing:-3px;color:#16172E;transform:scaleY(1.08)">Same collagen.</div>
      <div class="a" style="top:288px;width:100%;text-align:center;font-family:'Playfair';font-style:italic;font-weight:500;font-size:112px;letter-spacing:-3px;color:#7A5530;transform:scaleY(1.08)">Different receipt.</div>
      ${receipt(120, '3 × SINGLE POUCH', 'FULL PRICE', '', '3 X RIZQPURE HALAL COLLAGEN · PAID IN FULL')}
      ${receipt(600, 'THE 3-PACK', '15% OFF', '', '1 X RIZQPURE 3-PACK · YOU SAVED 15%')}
      <div class="a" style="left:0;right:0;bottom:56px;text-align:center;font-weight:700;font-size:36px;color:#16172E">Same 3 pouches. 15% back in your pocket.</div>`);
  })()],
  // 6 ── Charity: glow up, give back
  'glow-up-give-back-1080x1350': [1080, 1350, page(1080, 1350, 'radial-gradient(90% 70% at 50% 62%,#FFF8EC 0%,#F6EBD8 55%,#EADBC0 100%)', `
    <div class="a" style="top:84px;width:100%;text-align:center;font-family:'Playfair';font-weight:700;font-size:40px;color:${NAVY}">RizqPure</div>
    <div class="a" style="top:160px;width:100%;text-align:center;font-family:'Playfair';font-weight:600;font-size:150px;line-height:1;letter-spacing:-4px;color:${NAVY}">Glow up.</div>
    <div class="a" style="top:318px;width:100%;text-align:center;font-family:'Playfair';font-style:italic;font-weight:500;font-size:150px;line-height:1;letter-spacing:-4px;color:#9A6B2E">Give back.</div>
    <div class="a" style="top:500px;left:150px;right:150px;text-align:center;font-weight:500;font-size:34px;line-height:1.4;color:#3B3A4A">Every scoop supports your skin, hair &amp; joints*.<br>Every order helps families in need.</div>
    <div class="a" style="left:300px;top:700px;width:480px;height:480px;border-radius:50%;background:radial-gradient(closest-side,rgba(201,163,94,.35),rgba(201,163,94,0))"></div>
    ${pouch(372, 660, 520, -5, .3)}
    <div class="a" style="left:0;right:0;bottom:92px;text-align:center;font-weight:700;font-size:30px;letter-spacing:3px;color:${NAVY}">A PORTION OF EVERY ORDER GOES TO CHARITY</div>
    <div class="a" style="left:120px;right:120px;bottom:36px;text-align:center;font-size:17px;color:#5A5868">*${CLAIM}</div>`)],
};

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage();
  for (const [name, [W, H, html]] of Object.entries(ADS)) {
    await p.setViewportSize({ width: W, height: H }); await p.setContent(html);
    await p.evaluate(() => document.fonts.ready);
    const f = path.join(out, `ad-${name}.png`); await p.screenshot({ path: f }); console.log(f);
  }
  await b.close();
})();
