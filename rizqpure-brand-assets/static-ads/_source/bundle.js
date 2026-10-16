// RizqPure 3-Pack bundle ads across every proven format. usage: node bundle.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const { cartoon, avatar } = require('./cartoon.js');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, w = 'normal', s = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/ttf;base64,${b64(F(f))});font-weight:${w};font-style:${s}}`;
const FONTS = face('DM Sans', 'DMSans%5Bopsz,wght%5D.ttf', '100 1000') + face('Playfair', 'PlayfairDisplay%5Bwght%5D.ttf', '400 900') +
  face('Playfair', 'PlayfairDisplay-Italic%5Bwght%5D.ttf', '400 900', 'italic') + face('Archivo Black', 'ArchivoBlack-Regular.ttf') +
  face('Anton', 'Anton-Regular.ttf') + face('Mono', 'SpaceMono-Bold.ttf', 700) + face('Hand', 'ArchitectsDaughter-Regular.ttf');
const POUCH = 'data:image/png;base64,' + b64(path.join(__dirname, '..', 'call', 'pouch.png'));
const NAVY = '#1F2457', INK = '#2B2540', GOLD = '#C9A35E', RED = '#C8202F';
const CLAIM = 'Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.';
const page = (bg, body, W = 1080, H = 1350) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box} body{width:${W}px;height:${H}px;overflow:hidden;position:relative;font-family:'DM Sans';background:${bg}}
.a{position:absolute}</style></head><body>${body}</body></html>`;
const pouch = (x, y, h, rot = 0, sh = .3, z = 1) => `<img class="a" src="${POUCH}" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg);z-index:${z};
  filter:drop-shadow(0 ${h * .05}px ${h * .05}px rgba(30,25,60,${sh})) drop-shadow(0 ${h * .012}px ${h * .015}px rgba(30,25,60,${sh}))">`;
// three pouches fanned; (cx, top, h) centre/top/height of the middle pouch
const trio = (cx, top, h, sh = .32) => { const w = h * .7; return pouch(cx - w * 1.18, top + h * .08, h * .88, -9, sh, 1) + pouch(cx + w * .3, top + h * .08, h * .88, 9, sh, 1) + pouch(cx - w / 2, top, h, 0, sh, 2); };
const foot = (t, c = '#6C6680', bg = '') => `<div class="a" style="left:0;right:0;bottom:0;padding:16px 80px 24px;text-align:center;font-size:16px;color:${c};${bg}">*${t}</div>`;
const pill = (t, top, bg = '#111', fg = '#fff', fs = 34) => `<div class="a" style="left:50%;top:${top}px;transform:translateX(-50%);white-space:nowrap;padding:22px 56px;border-radius:60px;background:${bg};color:${fg};font-weight:800;font-size:${fs}px">${t}</div>`;
const tag = (t, x, y, rot, dark) => `<div class="a" style="left:${x}px;top:${y}px;z-index:5;padding:12px 26px;border-radius:18px;transform:rotate(${rot}deg);font-weight:800;font-size:42px;
  background:${dark ? '#16172E' : '#fff'};color:${dark ? '#fff' : '#16172E'};box-shadow:0 8px 20px rgba(0,0,0,.15)">${t}</div>`;

const ADS = {
  // Hismile shock word → consistency
  'stop-buying-one': page('linear-gradient(180deg,#FBF6EE,#F2E7D6)', `
    <div class="a" style="top:60px;width:100%;text-align:center;font-family:Playfair;font-weight:700;font-size:44px;color:${NAVY}">RizqPure</div>
    <div class="a" style="top:128px;width:100%;text-align:center;font-family:Playfair;font-weight:500;font-size:104px;letter-spacing:-2px;color:#16172E;transform:scaleY(1.12)">Stop Buying</div>
    <div class="a" style="top:220px;width:100%;text-align:center;font-family:Playfair;font-weight:900;font-size:320px;line-height:1;letter-spacing:-6px;color:${RED};transform:scale(.92,1.28);transform-origin:50% 0">ONE.</div>
    <div class="a" style="top:660px;left:120px;right:120px;text-align:center;font-weight:500;font-size:44px;line-height:1.3;color:#4A4A55">Fine lines, shedding and stiff joints need consistency, not a one-off.</div>
    ${pill('Get the 3-pack: 15% off →', 820)}
    ${trio(540, 950, 330)}
    ${tag('buy 3', 110, 930, -8, false)}${tag('save 15%', 780, 990, 7, true)}`),

  // Shifah big number → 15% OFF
  'big-15-percent': page('radial-gradient(90% 80% at 70% 55%,#FFFFFF 0%,#F4F2F8 70%,#E9E6F1 100%)', `
    <div class="a" style="left:60px;top:40px;font-family:Anton;font-size:330px;line-height:1;letter-spacing:-4px;background:linear-gradient(90deg,${NAVY},#6B6FB0 60%,#C9B6D9);-webkit-background-clip:text;color:transparent">15%</div>
    <div class="a" style="left:66px;top:390px;font-family:Anton;font-size:80px;color:${NAVY}">OFF THE <span style="color:#9C8FBF">3-PACK.</span></div>
    ${[['FINE LINES? SUPPORTS<br>YOUNGER-LOOKING SKIN*', 560], ['SHEDDING? SUPPORTS<br>FULLER-LOOKING HAIR*', 730], ['STIFF KNEES? SUPPORTS<br>JOINTS FOR PRAYER*', 900]].map(([t, y]) =>
      `<div class="a" style="left:66px;top:${y}px;display:flex;gap:22px;align-items:flex-start"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="15" height="15" rx="1.5"/><path d="M7 12.5l3.5 3.5L21 4.5"/></svg>
       <div style="font-family:Anton;font-size:44px;line-height:1.08;color:${INK}">${t}</div></div>`).join('')}
    ${trio(830, 960, 290)}
    <div class="a" style="left:66px;top:1100px;padding:20px 48px;border-radius:40px;background:#CDBFE3;font-family:Anton;font-size:32px;letter-spacing:1px;color:${INK}">SHOP THE BUNDLE!</div>
    ${foot(CLAIM)}`),

  // Sunbase / Venn → three pains, one bundle
  'one-bundle-three-concerns': page('#F3E6A8', (() => {
    const c = NAVY, R = 215, circ = (x, y) => `<div class="a" style="left:${x - R}px;top:${y - R}px;width:${2 * R}px;height:${2 * R}px;border:2.5px solid ${c};border-radius:50%"></div>`;
    const lab = (x, y, t) => `<div class="a" style="left:${x - 140}px;top:${y}px;width:280px;text-align:center;font-family:Mono;font-size:22px;line-height:1.25;color:${c}">${t}</div>`;
    return `<div class="a" style="top:70px;width:100%;text-align:center;font-family:Mono;font-size:62px;line-height:1.05;color:${c}">ONE BUNDLE.<br>THREE CONCERNS.</div>
      <div class="a" style="top:228px;width:100%;text-align:center;font-family:Mono;font-size:26px;color:${c}">[ SKIN · HAIR · JOINTS ]</div>
      ${circ(540, 520)}${circ(390, 770)}${circ(690, 770)}
      ${lab(540, 330, 'FINE LINES &amp;<br>DULL SKIN*')}${lab(250, 840, 'HAIR SHEDDING<br>&amp; THINNING*')}${lab(830, 840, 'STIFF KNEES<br>IN SUJOOD*')}
      ${trio(540, 520, 260, .25)}
      <div class="a" style="top:1060px;width:100%;text-align:center;font-family:Mono;font-size:44px;color:${c}">THE 3-PACK · 15% OFF</div>
      <div class="a" style="left:60px;bottom:90px;font-family:Mono;font-size:20px;line-height:1.3;color:${c}">100% HALAL<br>BOVINE COLLAGEN</div>
      <div class="a" style="left:0;right:0;bottom:104px;text-align:center;font-family:Mono;font-size:20px;line-height:1.3;color:${c}">A RITUAL,<br>NOT A TASTER.</div>
      <div class="a" style="right:60px;bottom:90px;text-align:right;font-family:Mono;font-size:20px;line-height:1.3;color:${c}">PART OF EVERY<br>ORDER TO CHARITY</div>
      ${foot(CLAIM, c)}`;
  })()),

  // Concealer → taster vs ritual
  'taster-vs-ritual': page('radial-gradient(90% 70% at 50% 40%,#FFFFFF 0%,#F6F3F6 60%,#ECE8EE 100%)', `
    <div class="a" style="top:140px;width:100%;text-align:center;font-family:Playfair;font-weight:500;font-size:76px;letter-spacing:-2.5px;line-height:1.08;color:${INK};transform:scaleY(1.12)">One pouch is a taster.</div>
    <div class="a" style="top:236px;width:100%;text-align:center;font-family:Playfair;font-weight:500;font-size:76px;letter-spacing:-2.5px;line-height:1.08;color:#B49BB8;transform:scaleY(1.12)">The 3-pack is a ritual.</div>
    <div class="a" style="left:360px;top:362px;width:360px;height:3px;background:linear-gradient(90deg,rgba(201,163,180,0),#D6B9CB,rgba(201,163,180,0))"></div>
    ${pouch(70, 580, 380, 0, .25)}
    <div class="a" style="left:60px;top:990px;width:280px;text-align:center;font-weight:700;font-size:30px;color:#8A8296">Full price.<br>Runs out.</div>
    <div class="a" style="left:380px;top:700px;font-size:90px;color:#C9BFD6">→</div>
    ${trio(745, 560, 380)}
    <div class="a" style="left:590px;top:990px;width:330px;text-align:center;font-weight:800;font-size:30px;color:${INK}">15% off.<br>Ritual sorted.</div>
    <div class="a" style="top:1130px;width:100%;text-align:center;font-size:36px;line-height:1.4;color:#5A4E60">For younger-looking skin, fuller-looking hair &amp; joints*</div>
    ${foot(CLAIM)}`),

  // Split cartoon ×3 pains, bundle highlight
  ...Object.fromEntries([
    ['skin', 'FINE LINES &amp;', 'DULL, TIRED SKIN?', 'Fine lines,<br>breakouts,<br>dullness', 'Glowing,<br>younger-looking<br>skin*'],
    ['hair', 'HAIR SHEDDING', 'EVERY WASH?', 'Shedding,<br>thinning,<br>breakage', 'Thicker,<br>fuller-looking<br>hair*'],
    ['joints', 'STIFF KNEES', 'IN SUJOOD?', 'Stiffness,<br>aching,<br>creaky knees', 'Joints that<br>keep up with<br>your prayers*'],
  ].map(([k, l1, l2, bad, good]) => [`split-${k}-bundle`, page('#fff', `
    <div class="a" style="top:56px;width:100%;text-align:center;font-family:'Archivo Black';font-size:74px;line-height:1.06;color:#121212">${l1}<br>${l2}</div>
    <div class="a" style="top:222px;left:0;right:0;text-align:center"><span style="font-family:'Archivo Black';font-size:50px;color:#121212;background:#F2C462;padding:4px 18px;white-space:nowrap">BUNDLE 3 &amp; SAVE 15%.</span></div>
    <div class="a" style="top:310px;left:110px;right:110px;text-align:center;font-size:32px;line-height:1.35;color:#222">Real change takes consistency. The 3-pack keeps your ritual going.*</div>
    <div class="a" style="left:210px;top:410px">${cartoon({ id: 'b' + k, variant: k, w: 660, h: 880 })}</div>
    <div class="a" style="left:40px;top:560px;font-weight:800;font-size:30px;line-height:1.15;color:#6B4E33">${bad}</div>
    <div class="a" style="right:40px;top:560px;text-align:right;font-weight:800;font-size:30px;line-height:1.15;color:#2C2F66">${good}</div>
    ${trio(540, 1010, 250, .4)}
    ${foot(CLAIM, '#6C6680', 'background:rgba(255,255,255,.92)')}`)])),

  // Myths vs facts (cartoon background)
  'myths-one-pouch': page('#2A2238', `
    <div class="a" style="left:-270px;top:-40px;opacity:.9">${cartoon({ id: 'bm', variant: 'skin', w: 1620, h: 2160 })}</div>
    <div class="a" style="left:0;top:0;width:540px;height:1350px;background:rgba(30,22,40,.55)"></div>
    <div class="a" style="left:540px;top:0;width:540px;height:1350px;background:rgba(60,40,70,.30)"></div>
    <div class="a" style="left:0;right:0;top:150px;text-align:center"><span style="display:inline-block;padding:12px 40px;border-radius:22px;background:rgba(232,210,224,.85);font-family:'Archivo Black';font-size:80px;color:#fff">MYTHS VS FACTS</span></div>
    ${[['✕', '#E5363C', 'One pouch is enough to try collagen properly', 'left:30px'], ['✓', '#2DB742', 'Collagen is about daily consistency. The 3-pack keeps you going, and saves 15%', 'right:30px']].map(([i, c, t, side]) =>
      `<div class="a" style="${side};top:500px;width:380px;height:420px;border-radius:30px;background:rgba(98,56,86,.9);border:3px solid rgba(255,255,255,.35);padding:40px 30px;text-align:center;color:#fff">
       <div style="width:70px;height:70px;border-radius:50%;background:${c};margin:0 auto 24px;display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:800">${i}</div>
       <div style="font-weight:700;font-size:32px;line-height:1.24">${t}</div></div>`).join('')}
    ${trio(540, 960, 200, .5)}
    <div class="a" style="left:0;right:0;top:1200px;text-align:center"><span style="display:inline-block;padding:20px 50px;border-radius:24px;background:rgba(232,210,224,.9);font-weight:800;font-size:34px;color:#3A2A40">GET THE 3-PACK →</span></div>
    ${foot(CLAIM, 'rgba(255,255,255,.7)')}`),

  // Tier list: ways to buy
  'ways-to-buy-tier-list': page('#14141A', (() => {
    const rows = [['S', '#F07C7C'], ['A', '#F5B57A'], ['B', '#F6E27A'], ['C', '#9BDA7C'], ['D', '#7CB6E8'], ['E', '#8E86D8'], ['F', '#D88AC9']];
    const items = { A: ['RizqPure 2-pack', 'save 10%'], B: ['RizqPure single pouch', 'full price, runs out fast'], C: ['"I\'ll reorder later"', 'forgets, ritual broken'],
      D: ['Pricey marine sachets', 'premium price, tiny dose'], E: ['Clumpy bulk tubs', 'gritty &amp; uncertified'], F: ['Mystery-source collagen', 'cow? pig? who knows'] };
    const rh = 126, top = 86;
    return `<div class="a" style="top:20px;width:100%;text-align:center;font-family:'Archivo Black';font-size:40px;color:#fff">HOW TO BUY COLLAGEN: <span style="color:${GOLD}">TIER LIST</span></div>
      ${rows.map(([r, c], i) => `<div class="a" style="left:30px;right:30px;top:${top + i * (rh + 10) - 4}px;height:${rh}px;display:flex;gap:10px">
        <div style="width:150px;background:${c};border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'Archivo Black';font-size:58px;color:#1A1A22">${r}</div>
        <div style="flex:1;background:#1E1E26;border-radius:6px;display:flex;align-items:center;padding:0 10px">
        ${r === 'S' ? `<div style="height:${rh - 14}px;padding:0 24px 0 10px;border-radius:8px;background:linear-gradient(90deg,#2C2F66,#3D4290);border:2px solid ${GOLD};display:flex;align-items:center;gap:6px;color:#fff">
            ${[-8, 0, 8].map(rt => `<img src="${POUCH}" style="height:${rh - 26}px;transform:rotate(${rt}deg);margin-right:-18px;filter:drop-shadow(0 4px 6px rgba(0,0,0,.5))">`).join('')}
            <div style="margin-left:34px"><div style="font-weight:800;font-size:34px">RizqPure 3-Pack</div><div style="font-size:22px;color:#E8D3A6;margin-top:4px">15% off · never run out · gives back</div></div></div>`
          : `<div style="height:${rh - 16}px;min-width:300px;padding:0 26px;border-radius:8px;background:#2A2A33;border:2px solid #3A3A46;display:flex;flex-direction:column;justify-content:center;color:#fff">
            <div style="font-weight:800;font-size:32px">${items[r][0]}</div><div style="font-size:22px;color:#B9B9C6;margin-top:6px">${items[r][1]}</div></div>`}
        </div></div>`).join('')}
      <div class="a" style="right:34px;bottom:6px;font-weight:600;font-size:22px;color:#fff;opacity:.85">@rizqpure</div>`;
  })(), 1080, 1080),

  // Bestie chat
  'chat-bought-three': page('#fff', (() => {
    const bub = (me, t) => `<div style="display:flex;justify-content:${me ? 'flex-end' : 'flex-start'};margin:0 0 16px"><div style="max-width:660px;padding:15px 26px;border-radius:30px;
      ${me ? 'border-bottom-right-radius:8px;background:#1E7CF6;color:#fff' : 'border-bottom-left-radius:8px;background:#E9E9EB;color:#111'};font-family:Inter,'DM Sans';font-size:28px;line-height:1.28">${t}</div></div>`;
    const photo = `<div style="display:flex;justify-content:flex-end;margin:0 0 16px"><div style="width:520px;height:330px;border-radius:30px;overflow:hidden;position:relative;
      background:linear-gradient(180deg,#E6DCD0 0%,#D8CBBB 62%,#F1ECE6 62%,#E4DDD5 100%)">
      <div style="position:absolute;right:-20px;top:-20px;width:220px;height:300px;border-radius:50%;border:16px solid #C9A35E;filter:blur(6px);opacity:.6"></div>
      ${[[70, -8, 230], [290, 8, 230], [175, 0, 260]].map(([x, r, h]) => `<img src="${POUCH}" style="position:absolute;left:${x}px;top:${300 - h}px;height:${h}px;transform:rotate(${r}deg);filter:drop-shadow(0 12px 12px rgba(0,0,0,.35))">`).join('')}</div></div>`;
    return `<div class="a" style="left:60px;top:28px;font-family:Inter;font-weight:600;font-size:34px">3:30</div>
      <div class="a" style="left:0;right:0;top:80px;height:170px;border-bottom:1px solid #DDD;background:#F7F7F8">
        <div style="position:absolute;left:50px;top:50px;font-size:60px;font-family:Inter">‹</div>
        <div style="position:absolute;left:480px;top:10px;width:120px;height:120px;border-radius:50%;overflow:hidden;background:linear-gradient(135deg,#F4E3EC,#DCD3F0)">${avatar('bav', 120)}</div>
        <div style="position:absolute;left:0;right:0;top:132px;text-align:center;font-family:Inter;font-size:26px">Bestie</div></div>
      <div class="a" style="left:44px;right:44px;top:276px">
        ${bub(false, 'Wait, you bought THREE?? 😂')}
        ${bub(true, 'The 3-pack is 15% off and I never run out. My hair has never felt fuller')}
        ${bub(false, 'Okay my shedding is still driving me mad...')}${photo}
        ${bub(true, 'Get the 3-pack. Skin, hair AND my knees in sujood feel the love 🤍')}
        ${bub(false, 'Wow. Okay. Bet. Ordering right now.')}${bub(true, 'You\'re going to love it.')}</div>
      <div class="a" style="left:40px;right:40px;bottom:46px;height:76px;border:2px solid #D0D0D5;border-radius:40px;display:flex;align-items:center;padding:0 30px;font-family:Inter;font-size:30px;color:#A0A0A6">iMessage</div>`;
  })()),

  // Whiteboard maths
  'whiteboard-bundle-maths': page('radial-gradient(120% 90% at 40% 30%,#FAFAF8 0%,#ECECEA 70%,#DCDCDA 100%)', `
    <div class="a" style="left:90px;top:110px;font-family:Hand;font-size:64px;line-height:1.5;color:#1A1A1A">
      ONE POUCH = FULL PRICE<br>THE 3-PACK = <span style="color:${RED}">15% OFF</span><br>
      SKIN + HAIR + JOINTS* =<br><span style="display:inline-block;border:5px solid #1A1A1A;border-radius:50% 46% 52% 44%;padding:0 34px;transform:rotate(-3deg)">SORTED.</span></div>
    <svg class="a" style="left:520px;top:700px" width="200" height="120" viewBox="0 0 200 120" fill="none" stroke="#1A1A1A" stroke-width="5" stroke-linecap="round"><path d="M10 20 C70 10 130 40 170 95"/><path d="M140 92 L172 98 L168 66"/></svg>
    <div class="a" style="left:640px;top:820px;width:400px;height:200px;border-radius:50%;background:rgba(0,0,0,.18);filter:blur(30px)"></div>
    ${trio(790, 780, 280, .25)}
    <div class="a" style="left:90px;right:60px;bottom:40px;font-family:Hand;font-size:22px;color:#444">*${CLAIM}</div>`),

  // Search bar
  'search-bundle': page('radial-gradient(90% 80% at 75% 55%,#E8E9F7 0%,#D3D5EE 60%,#C3C6E6 100%)', `
    <div class="a" style="left:80px;right:80px;top:150px;height:116px;border-radius:60px;background:#fff;border:3px solid #1B1D3A;display:flex;align-items:center;gap:22px;padding:0 40px;white-space:nowrap">
      <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#1B1D3A" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>
      <div style="font-weight:500;font-size:37px;color:#1B1D3A">best value halal collagen bundle</div></div>
    <div class="a" style="top:292px;width:100%;text-align:center;font-weight:500;font-size:30px;color:#3A3D5C">RizqPure 3-Pack: the smarter way to stock up.</div>
    ${[['15% off, every time', 420], ['Skin, hair &amp; joints*', 590], ['Never run out', 760]].map(([t, y], i) => `<div class="a" style="left:70px;top:${y}px;display:flex;align-items:center;gap:30px">
      <div style="width:116px;height:116px;border-radius:50%;background:#2C2F66;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:${i ? 50 : 36}px">${['%', '✦', '∞'][i]}</div>
      <div style="font-weight:500;font-size:42px;color:#1B1D3A">${t}</div></div>`).join('')}
    ${trio(830, 560, 290)}
    <div class="a" style="left:70px;top:1000px;font-weight:600;font-size:56px;color:#1B1D3A">rizqpure.com</div>
    ${foot(CLAIM, '#3A3D5C')}`),

  // Calling
  'calling-15-off': page('linear-gradient(160deg,#8C4A97 0%,#C46A9E 28%,#EE97AA 55%,#F6B7B4 75%,#D886A9 100%)', `
    <div class="a" style="top:60px;width:100%;text-align:center;color:#fff;font-weight:700;font-size:84px;letter-spacing:-1px;text-shadow:0 2px 24px rgba(90,20,70,.25)">Your 15% off</div>
    <div class="a" style="top:162px;width:100%;text-align:center;color:#fff;font-weight:500;font-size:44px">is calling...</div>
    <div class="a" style="left:0;right:0;top:270px;height:440px;transform:rotate(-6deg)">${trio(540, 0, 350, .4)}</div>
    <div class="a" style="left:0;right:0;bottom:46px;display:flex;justify-content:center;gap:300px">
      ${[['#EE1F2D', 'Decline', '<path d="M12 9.2c-3.3 0-6.3.9-8.7 2.5-.6.4-.9 1-.9 1.7v2.2c0 .7.7 1.2 1.4 1l3.2-1c.5-.2.9-.7.9-1.2v-1.6a12.5 12.5 0 0 1 8.2 0v1.6c0 .5.4 1 .9 1.2l3.2 1c.7.2 1.4-.3 1.4-1v-2.2c0-.7-.3-1.3-.9-1.7C18.3 10.1 15.3 9.2 12 9.2z"/>'],
         ['#2DB742', 'Accept', '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/>']].map(([c, t, d]) =>
        `<div style="display:flex;flex-direction:column;align-items:center;gap:20px;color:#fff;font-weight:500;font-size:44px"><div style="width:176px;height:176px;border-radius:50%;background:${c};display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(60,10,40,.25)"><svg width="80" height="80" viewBox="0 0 24 24" fill="#fff">${d}</svg></div>${t}</div>`).join('')}</div>`, 1080, 1080),

  // Ritual brand mood
  'ritual-stocked': page('radial-gradient(90% 70% at 50% 40%,#FFFFFF 0%,#F2F1F4 60%,#E8E6EC 100%)', `
    <div class="a" style="top:140px;width:100%;text-align:center;font-weight:800;font-size:100px;line-height:1.05;letter-spacing:-2px;background:linear-gradient(90deg,#3A3E6E,#8F93B8);-webkit-background-clip:text;color:transparent">a daily ritual.<br>fully stocked.</div>
    <div class="a" style="top:400px;width:100%;text-align:center;font-weight:500;font-size:34px;color:#4D4A5E">the 3-pack · 15% off · no fillers no clumps just halal collagen</div>
    ${trio(540, 560, 680, .3)}`),
};

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage();
  for (const [name, html] of Object.entries(ADS)) {
    const W = +html.match(/width:(\d+)px;height:(\d+)px;overflow/)[1], H = +html.match(/width:(\d+)px;height:(\d+)px;overflow/)[2];
    await p.setViewportSize({ width: W, height: H }); await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    const f = path.join(out, `ad-3pack-${name}-${W}x${H}.png`); await p.screenshot({ path: f }); console.log(f);
  }
  await b.close();
})();
