// RizqPure remixes, round 4: pain-point-led beauty formats. usage: node remix4.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, w = 'normal', s = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/ttf;base64,${b64(F(f))});font-weight:${w};font-style:${s}}`;
const FONTS = face('DM Sans', 'DMSans%5Bopsz,wght%5D.ttf', '100 1000') + face('Playfair', 'PlayfairDisplay%5Bwght%5D.ttf', '400 900') +
  face('Playfair', 'PlayfairDisplay-Italic%5Bwght%5D.ttf', '400 900', 'italic') + face('Archivo Black', 'ArchivoBlack-Regular.ttf') + face('DM Serif', 'DMSerifDisplay-Regular.ttf');
const POUCH = 'data:image/png;base64,' + b64(path.join(__dirname, '..', 'call', 'pouch.png'));
const NAVY = '#1F2457', INK = '#2B2540', GOLD = '#C9A35E';
const SKIN = 'Vitamin C contributes to normal collagen formation for the normal function of skin.';
const CART = 'Vitamin C contributes to normal collagen formation for the normal function of cartilage.';
const page = (bg, body, W = 1080, H = 1350) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box} body{width:${W}px;height:${H}px;overflow:hidden;position:relative;font-family:'DM Sans';background:${bg}}
.a{position:absolute}</style></head><body>${body}</body></html>`;
const pouch = (x, y, h, rot = 0, sh = .3) => `<img class="a" src="${POUCH}" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg);
  filter:drop-shadow(0 ${h * .05}px ${h * .05}px rgba(30,25,60,${sh})) drop-shadow(0 ${h * .012}px ${h * .015}px rgba(30,25,60,${sh}))">`;
const foot = (t, c = '#6C6680') => `<div class="a" style="left:80px;right:80px;bottom:28px;text-align:center;font-size:16px;color:${c}">*${t}</div>`;

// ── 1. "Concealer hides…" ──────────────────────────────────────────────
const sponge = (x, y, rot) => `<div class="a" style="left:${x}px;top:${y}px;width:150px;height:430px;border-radius:50% 50% 50% 50% / 64% 64% 36% 36%;transform:rotate(${rot}deg);
  background:radial-gradient(40% 18% at 40% 30%,rgba(150,105,70,.75),rgba(150,105,70,0) 70%),radial-gradient(35% 14% at 60% 58%,rgba(140,98,64,.7),rgba(140,98,64,0) 70%),
  radial-gradient(30% 12% at 42% 78%,rgba(145,100,66,.6),rgba(145,100,66,0) 70%),radial-gradient(120% 90% at 30% 20%,#E7C8A4 0%,#CFA57B 55%,#B4875E 100%);
  box-shadow:inset -18px -10px 30px rgba(90,55,30,.35),0 26px 30px -10px rgba(80,50,30,.35)"></div>`;
const brush = (x, y) => `<svg class="a" style="left:${x}px;top:${y}px" width="380" height="520" viewBox="0 0 380 520">
  <defs><linearGradient id="bw" x1="0" x2="1"><stop offset="0" stop-color="#E9DCCB"/><stop offset="1" stop-color="#BFA88E"/></linearGradient></defs>
  <rect x="160" y="300" width="60" height="210" rx="28" fill="url(#bw)"/><ellipse cx="190" cy="170" rx="150" ry="170" fill="url(#bw)"/>
  <ellipse cx="190" cy="170" rx="118" ry="138" fill="#4A3B33"/>
  ${Array.from({ length: 60 }, (_, i) => { const a = i * 2.39, r = 12 + Math.sqrt(i) * 15; return `<circle cx="${190 + Math.cos(a) * r * .85}" cy="${170 + Math.sin(a) * r}" r="4" fill="#2A211C"/>`; }).join('')}
  ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${90 + i * 28} ${60 + (i % 3) * 30} C ${150 + i * 10} ${140 + i * 12}, ${80 + i * 20} ${220 + i * 6}, ${150 + i * 18} ${300 - i * 6}" fill="none" stroke="#5B4636" stroke-width="2.2" opacity=".85"/>`).join('')}
</svg>`;
const concealer = (head1, head2, prop, sub1, sub2, claim) => page('radial-gradient(90% 70% at 50% 40%,#FFFFFF 0%,#F6F3F6 60%,#ECE8EE 100%)', `
  <div class="a" style="left:-200px;top:-80px;width:900px;height:340px;transform:rotate(-16deg);background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.8),rgba(255,255,255,0));filter:blur(30px)"></div>
  <div class="a" style="top:150px;width:100%;text-align:center;font-family:Playfair;font-weight:500;font-size:72px;letter-spacing:-2.5px;line-height:1.08;color:${INK};transform:scaleY(1.12)">${head1}</div>
  <div class="a" style="top:240px;width:100%;text-align:center;font-family:Playfair;font-weight:500;font-size:72px;letter-spacing:-2.5px;line-height:1.08;color:#B49BB8;transform:scaleY(1.12)">${head2}</div>
  <div class="a" style="left:360px;top:362px;width:360px;height:3px;border-radius:2px;background:linear-gradient(90deg,rgba(201,163,180,0),#D6B9CB,rgba(201,163,180,0))"></div>
  ${prop}${pouch(570, 470, 470, 0, .28)}
  <div class="a" style="top:1060px;width:100%;text-align:center;font-size:38px;line-height:1.45;color:#5A4E60">${sub1}<br>${sub2}</div>
  ${foot(claim)}`);

// ── 3. Split "It's your…" ──────────────────────────────────────────────
const ICON = {
  hair: (bad) => bad ? '<path d="M8 21c-1-5 1.5-8 1-12" /><path d="M9 7.5 7.5 3"/><path d="M12 21c-.5-4 1-6 1-8"/><path d="M13.2 10l.8-3-1.5-4"/><path d="M16 21c0-5 2-7 1.6-9.5"/><path d="M18 9l-.5-5"/>'
    : '<path d="M8 21c-1-5 1.5-8 1-12S7 4 8.5 3"/><path d="M12 21c-.5-5 2-8 1.5-12S12 4 13.5 3"/><path d="M16 21c0-5 2.5-7.5 2-11.5S17 4 18.5 3.5"/><path d="M20.5 6l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5z"/>',
  skin: (bad) => bad ? '<circle cx="12" cy="12" r="9"/><path d="M7.5 9.5c1.5-.8 2.5-.8 4 0M12.5 9.5c1.5-.8 2.5-.8 4 0"/><path d="M6 14.5l2 .5M18 14.5l-2 .5"/><path d="M9.5 16.5c1.6.8 3.4.8 5 0"/><circle cx="16" cy="12.5" r=".6"/><circle cx="8.5" cy="12" r=".6"/>'
    : '<circle cx="12" cy="12" r="9"/><path d="M8 10c.8-.6 1.8-.6 2.6 0M13.4 10c.8-.6 1.8-.6 2.6 0"/><path d="M8.5 15c2 1.8 5 1.8 7 0"/><path d="M19.5 3l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5z"/>',
  joint: (bad) => bad ? '<circle cx="9" cy="4.5" r="2"/><path d="M9 7v5l4 3-2 6M9 12l-4 2"/><path d="M3 21h18"/><path d="M14.5 13.5l2-1.5 1 2 2-1.5"/>'
    : '<circle cx="9" cy="4.5" r="2"/><path d="M9 7v5l4 3-2 6M9 12l-4 2"/><path d="M3 21h18"/><path d="M17.5 9l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z"/>',
};
const ic = (k, bad, c, s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">${ICON[k](bad)}</svg>`;
const split = (k, l1, l2, hl, sub, lbadT, lgoodT, claim) => page('#fff', `
  <div class="a" style="top:70px;width:100%;text-align:center;font-family:'Archivo Black';font-size:76px;line-height:1.06;color:#121212">${l1}<br>${l2}</div>
  <div class="a" style="top:240px;left:0;right:0;text-align:center"><span style="font-family:'Archivo Black';font-size:50px;line-height:1.2;color:#121212;background:#F2C462;padding:4px 18px;white-space:nowrap">${hl}</span></div>
  <div class="a" style="top:336px;left:110px;right:110px;text-align:center;font-size:32px;line-height:1.35;color:#222">${sub}</div>
  <div class="a" style="left:60px;top:500px;width:480px;height:720px;border-radius:30px 0 0 30px;overflow:hidden;
     background:radial-gradient(120% 90% at 30% 30%,#C9BFB3 0%,#A99C8E 60%,#8E8174 100%)">
    <svg width="480" height="720" style="position:absolute;inset:0;opacity:.35">${Array.from({ length: 26 }, (_, i) => `<path d="M${(i * 53) % 480} ${(i * 97) % 720} l${18 - (i % 5) * 9} ${30 + (i % 4) * 8} l${12 - (i % 3) * 10} ${22}" stroke="#5C5045" stroke-width="2" fill="none"/>`).join('')}</svg>
    <div style="position:absolute;left:60px;top:70px;opacity:.85">${ic(k, true, '#3E352D', 230)}</div>
    <div style="position:absolute;left:40px;bottom:50px;font-weight:800;font-size:34px;line-height:1.15;color:#2E2721">${lbadT}</div></div>
  <div class="a" style="left:540px;top:500px;width:480px;height:720px;border-radius:0 30px 30px 0;overflow:hidden;
     background:radial-gradient(120% 90% at 70% 30%,#FFF7EE 0%,#F4E3EC 55%,#DCD3F0 100%)">
    <div style="position:absolute;right:60px;top:70px">${ic(k, false, '#3B3F86', 230)}</div>
    <div style="position:absolute;right:40px;bottom:50px;text-align:right;font-weight:800;font-size:34px;line-height:1.15;color:#2C2F66">${lgoodT}</div></div>
  <div class="a" style="left:539px;top:500px;width:2px;height:720px;background:rgba(255,255,255,.8)"></div>
  ${pouch(392, 690, 420, 0, .38)}
  ${foot(claim)}`);

// ── 4. iMessage chat ────────────────────────────────────────────────────
const bubble = (me, t) => `<div style="display:flex;justify-content:${me ? 'flex-end' : 'flex-start'};margin:0 0 16px">
  <div style="max-width:660px;padding:15px 26px;border-radius:30px;${me ? 'border-bottom-right-radius:8px;background:#1E7CF6;color:#fff' : 'border-bottom-left-radius:8px;background:#E9E9EB;color:#111'};
    font-family:Inter,'DM Sans';font-size:28px;line-height:1.28">${t}</div></div>`;
const photo = `<div style="display:flex;justify-content:flex-end;margin:0 0 16px"><div style="width:500px;height:330px;border-radius:30px;overflow:hidden;position:relative;
  background:linear-gradient(180deg,#E6DCD0 0%,#D8CBBB 62%,#F1ECE6 62%,#E4DDD5 100%)">
  <div style="position:absolute;left:-30px;top:30px;width:200px;height:250px;border-radius:40px;background:#B49478;filter:blur(18px);opacity:.7"></div>
  <div style="position:absolute;right:-20px;top:-20px;width:220px;height:300px;border-radius:50%;border:16px solid #C9A35E;filter:blur(6px);opacity:.6"></div>
  <div style="position:absolute;right:40px;top:200px;width:110px;height:130px;border-radius:20px;background:#F2E6DD;filter:blur(8px);opacity:.9"></div>
  <div style="position:absolute;left:40px;top:300px;width:140px;height:60px;border-radius:50%;background:#7C4E35;filter:blur(4px);opacity:.7"></div>
  <img src="${POUCH}" style="position:absolute;left:170px;top:28px;height:280px;transform:rotate(-3deg);filter:drop-shadow(0 16px 14px rgba(0,0,0,.35))">
</div></div>`;
const chat = (msgs) => page('#FFFFFF', `
  <div class="a" style="left:60px;top:28px;font-family:Inter;font-weight:600;font-size:34px">3:30</div>
  <div class="a" style="right:60px;top:30px;display:flex;gap:14px;align-items:center">
    <svg width="40" height="28" viewBox="0 0 20 14"><rect x="0" y="9" width="3" height="5" rx="1"/><rect x="5" y="6" width="3" height="8" rx="1"/><rect x="10" y="3" width="3" height="11" rx="1"/><rect x="15" y="0" width="3" height="14" rx="1"/></svg>
    <svg width="58" height="28" viewBox="0 0 29 14"><rect x=".5" y=".5" width="24" height="13" rx="3.5" fill="none" stroke="#000"/><rect x="2.5" y="2.5" width="20" height="9" rx="2"/><rect x="26" y="4.5" width="2" height="5" rx="1"/></svg></div>
  <div class="a" style="left:0;right:0;top:80px;height:170px;border-bottom:1px solid #DDD;background:#F7F7F8">
    <div style="position:absolute;left:50px;top:50px;font-size:60px;color:#111;font-family:Inter">‹</div>
    <div style="position:absolute;left:480px;top:10px;width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#C9A35E,#8E86BE);display:flex;align-items:center;justify-content:center;font-family:Inter;font-weight:700;font-size:44px;color:#fff">B</div>
    <div style="position:absolute;left:0;right:0;top:132px;text-align:center;font-family:Inter;font-size:26px;color:#111">Bestie</div>
    <svg style="position:absolute;right:56px;top:56px" width="58" height="40" viewBox="0 0 29 20" fill="none" stroke="#111" stroke-width="1.6"><rect x="1" y="3" width="18" height="14" rx="3"/><path d="M19 8l8-4v12l-8-4"/></svg></div>
  <div class="a" style="left:44px;right:44px;top:276px">${msgs}</div>
  <div class="a" style="left:40px;right:40px;bottom:46px;display:flex;align-items:center;gap:24px">
    <svg width="64" height="54" viewBox="0 0 24 20" fill="#8E8E93"><path d="M8 2h8l1.6 2.5H21a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2h3.4z"/><circle cx="12" cy="11.5" r="4.2" fill="#fff"/></svg>
    <div style="flex:1;height:76px;border:2px solid #D0D0D5;border-radius:40px;display:flex;align-items:center;padding:0 30px;font-family:Inter;font-size:30px;color:#A0A0A6">iMessage</div></div>`);

// ── 5. Myths vs facts ───────────────────────────────────────────────────
const myth = (m, f, claim) => page('#2A2238', `
  <div class="a" style="left:0;top:0;width:540px;height:1350px;background:radial-gradient(80% 60% at 50% 35%,#5B4E63 0%,#3A3044 60%,#241D2C 100%)"></div>
  <div class="a" style="left:540px;top:0;width:540px;height:1350px;background:radial-gradient(80% 60% at 50% 35%,#C9A9C0 0%,#8A6D8A 55%,#4E3D58 100%)"></div>
  <div class="a" style="left:0;top:0;width:540px;height:1350px;background:repeating-linear-gradient(115deg,rgba(0,0,0,.08) 0 3px,transparent 3px 9px);opacity:.7"></div>
  <div class="a" style="left:640px;top:180px;width:340px;height:340px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,240,230,.55),rgba(255,240,230,0))"></div>
  <div class="a" style="left:0;right:0;top:150px;text-align:center"><span style="display:inline-block;padding:12px 40px;border-radius:22px;background:rgba(232,210,224,.85);
    font-family:'Archivo Black';font-size:80px;color:#fff;text-shadow:0 2px 10px rgba(60,30,60,.4)">MYTHS VS FACTS</span></div>
  <div class="a" style="left:30px;top:520px;width:380px;height:400px;border-radius:30px;background:rgba(98,56,86,.9);border:3px solid rgba(255,255,255,.35);padding:40px 34px;text-align:center;color:#fff">
    <div style="width:70px;height:70px;border-radius:50%;background:#E5363C;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;font-size:44px;font-weight:800">✕</div>
    <div style="font-weight:700;font-size:34px;line-height:1.22">${m}</div></div>
  <div class="a" style="right:30px;top:520px;width:380px;height:400px;border-radius:30px;background:rgba(98,56,86,.9);border:3px solid rgba(255,255,255,.35);padding:40px 34px;text-align:center;color:#fff">
    <div style="width:70px;height:70px;border-radius:50%;background:#2DB742;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:800">✓</div>
    <div style="font-weight:700;font-size:30px;line-height:1.24">${f}</div></div>
  ${pouch(426, 540, 330, 0, .5)}
  <div class="a" style="left:0;right:0;top:1120px;text-align:center"><span style="display:inline-block;padding:24px 56px;border-radius:24px;background:rgba(232,210,224,.88);
    font-weight:800;font-size:38px;letter-spacing:1px;color:#3A2A40">TRY OUR FORMULA →</span></div>
  ${foot(claim, 'rgba(255,255,255,.7)')}`);

const ADS = {
  'concealer-fine-lines': concealer('Concealer covers your fine lines.', 'RizqPure works from within.', sponge(270, 520, -36) + sponge(270, 520, 36),
    'Halal collagen for younger-looking skin.', 'Real support, not just cover.*', 'Supports skin vitality. ' + SKIN),
  'concealer-hair-thinning': concealer('Hair fibres hide your thinning.', 'RizqPure works from within.', brush(140, 470),
    'Halal collagen for fuller-looking hair.', 'Real support, not just cover.*', 'Supports hair vitality. ' + SKIN),
  'timeless-ritual': page('radial-gradient(90% 70% at 50% 40%,#FFFFFF 0%,#F2F1F4 60%,#E8E6EC 100%)', `
    <div class="a" style="left:-120px;top:420px;width:1400px;height:900px;background:repeating-linear-gradient(100deg,rgba(255,255,255,0) 0 120px,rgba(255,255,255,.65) 120px 180px,rgba(255,255,255,0) 180px 300px);filter:blur(26px);opacity:.8"></div>
    <div class="a" style="top:140px;width:100%;text-align:center;font-weight:800;font-size:104px;line-height:1.05;letter-spacing:-2px;
      background:linear-gradient(90deg,#3A3E6E,#8F93B8);-webkit-background-clip:text;color:transparent">a timeless ritual.<br>a modern formula.</div>
    <div class="a" style="top:400px;width:100%;text-align:center;font-weight:500;font-size:34px;color:#4D4A5E">no fillers no clumps just halal collagen</div>
    ${pouch(245, 560, 1000, 0, .3)}`),
  'split-skin': split('skin', 'FINE LINES &amp;', 'DULL, TIRED SKIN?', "IT'S NOT JUST YOUR CREAM.", 'Creams work on the surface. Your skin\'s collagen is built from within.*', 'Fine lines,<br>breakouts,<br>dullness', 'Glowing,<br>younger-looking<br>skin*', 'Supports skin vitality. ' + SKIN),
  'split-hair': split('hair', 'HAIR SHEDDING', 'EVERY WASH?', "IT'S NOT JUST YOUR SHAMPOO.", 'Thinning hair needs support from within too. RizqPure helps.*', 'Shedding,<br>thinning,<br>breakage', 'Thicker,<br>fuller-looking<br>hair*', 'Supports hair vitality. ' + SKIN),
  'split-joints': split('joint', 'STIFF KNEES', 'IN SUJOOD?', "IT'S NOT JUST YOUR AGE.", 'Your joints rely on collagen. Support yours from within.*', 'Stiffness,<br>aching,<br>creaky knees', 'Joints that<br>keep up with<br>your prayers*', 'Supports joint vitality. ' + CART),
  'chat-hair-shedding': chat(
    bubble(false, 'Wait, what are you doing to your hair?? It looks so much fuller') +
    bubble(true, 'Honestly? Just RizqPure halal collagen in my morning coffee') +
    bubble(false, 'No way. I\'ve been shedding like crazy since the baby 😩') + photo +
    bubble(true, 'It supports hair from within, it\'s halal, and part of every order goes to charity 🤍') +
    bubble(false, 'Wow. Okay. Bet. Ordering right now.') + bubble(true, 'You\'re going to love it.')),
  'chat-fine-lines': chat(
    bubble(false, 'Okay your skin is GLOWING. What are you using??') +
    bubble(true, 'Just RizqPure halal collagen. One scoop in my chai every morning') +
    bubble(false, 'Stop. My fine lines have been driving me mad lately') + photo +
    bubble(true, 'Same. It\'s collagen for your skin from within, and it\'s actually halal 🤍') +
    bubble(false, 'Wow. Okay. Bet. Ordering right now.') + bubble(true, 'You\'re going to love it.')),
  'myths-skin': myth('Fine lines are only a skincare problem', 'Skin\'s collagen is built from within. RizqPure supports younger-looking skin*', 'Supports skin vitality. ' + SKIN),
  'myths-hair': myth('Hair shedding is just something you live with', 'Hair needs nourishment from within too. RizqPure supports fuller-looking hair*', 'Supports hair vitality. ' + SKIN),
  'myths-joints': myth('Stiff joints are just part of getting older', 'Your cartilage relies on collagen. RizqPure supports your joints from within*', 'Supports joint vitality. ' + CART),
  'myths-halal': myth('Halal collagen means compromising on quality', '100% hydrolysed halal bovine collagen peptides. No fillers, no clumps*', SKIN),
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
