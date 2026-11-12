// RizqPure Black Friday + back-in-stock 3-pack ads. usage: node blackfriday.js outdir
// Offer lives in OFF / GIFT below: change once, re-render all.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const { cartoon } = require('./cartoon.js');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, w = 'normal', s = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/ttf;base64,${b64(F(f))});font-weight:${w};font-style:${s}}`;
const FONTS = face('DM Sans', 'DMSans%5Bopsz,wght%5D.ttf', '100 1000') + face('Playfair', 'PlayfairDisplay%5Bwght%5D.ttf', '400 900') +
  face('Playfair', 'PlayfairDisplay-Italic%5Bwght%5D.ttf', '400 900', 'italic') + face('Archivo Black', 'ArchivoBlack-Regular.ttf') +
  face('Anton', 'Anton-Regular.ttf') + face('Hand', 'ArchitectsDaughter-Regular.ttf') + face('Marker', 'PermanentMarker-Regular.ttf') +
  face('Mono', 'SpaceMono-Bold.ttf');
const POUCH = 'data:image/png;base64,' + b64(path.join(__dirname, 'pouch.png'));
const NAVY = '#1F2457', INK = '#211D33', GOLD = '#C9A35E', GOLDL = '#F2C462', CREAM = '#FBF6EE', BLACK = '#0E0E14';
const OFF = '25%', GIFT = 'FREE Maximise Guide';
const CLAIM = 'Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.';
const page = (bg, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box} body{width:1080px;height:1350px;overflow:hidden;position:relative;font-family:'DM Sans';background:${bg}}
.a{position:absolute} .mk{background:linear-gradient(transparent 58%,${GOLDL} 58%,${GOLDL} 92%,transparent 92%);padding:0 6px}</style></head><body>${body}</body></html>`;
const pouch = (x, y, h, rot = 0, sh = .3, z = 1) => `<img class="a" src="${POUCH}" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg);z-index:${z};
  filter:drop-shadow(0 ${h * .05}px ${h * .05}px rgba(0,0,0,${sh})) drop-shadow(0 ${h * .012}px ${h * .015}px rgba(0,0,0,${sh}))">`;
const trio = (cx, top, h, sh = .32) => { const w = h * .7; return pouch(cx - w * 1.18, top + h * .08, h * .88, -9, sh, 1) + pouch(cx + w * .3, top + h * .08, h * .88, 9, sh, 1) + pouch(cx - w / 2, top, h, 0, sh, 2); };
const foot = (t, c = '#6C6680') => `<div class="a" style="left:0;right:0;bottom:0;padding:14px 80px 24px;text-align:center;font-size:16px;color:${c}">*${t}</div>`;
const btn = (t, top, bg = INK, fg = '#fff') => `<div class="a" style="left:50%;top:${top}px;transform:translateX(-50%);white-space:nowrap;padding:24px 60px;border-radius:60px;background:${bg};color:${fg};font-weight:800;font-size:34px;box-shadow:0 10px 24px rgba(0,0,0,.25)">${t}</div>`;
const logo = (top, c = NAVY, left) => `<div class="a" style="top:${top}px;${left != null ? `left:${left}px` : 'width:100%;text-align:center'};font-family:Playfair;font-weight:700;font-size:40px;color:${c}">RizqPure</div>`;
const bfTag = (x, y, rot = -6) => `<div class="a" style="left:${x}px;top:${y}px;transform:rotate(${rot}deg);background:${BLACK};color:#fff;border:3px solid ${GOLD};border-radius:14px;padding:12px 24px;text-align:center;z-index:5">
  <div style="font-family:Anton;font-size:34px;letter-spacing:3px;line-height:1">BLACK FRIDAY</div><div style="font-family:Anton;font-size:64px;color:${GOLDL};line-height:1.05">${OFF} OFF</div></div>`;
const giftBadge = (x, y, dark) => `<div class="a" style="left:${x}px;top:${y}px;display:flex;align-items:center;gap:14px;padding:14px 26px;border-radius:40px;
  background:${dark ? 'rgba(255,255,255,.1)' : '#fff'};border:2px dashed ${GOLD};color:${dark ? '#fff' : INK};font-weight:700;font-size:28px;white-space:nowrap">🎁 + ${GIFT}</div>`;
const darkBg = `radial-gradient(90% 70% at 50% 45%,#22243F 0%,#14152A 55%,${BLACK} 100%)`;

const ADS = {
  // 1 — Sold out → back in stock (stamp)
  'its-back-sold-out-stamp': page(darkBg, `
    ${logo(70, '#fff')}
    <div class="a" style="top:170px;width:100%;text-align:center">
      <span style="display:inline-block;font-family:Anton;font-size:110px;letter-spacing:6px;color:rgba(255,255,255,.28);border:8px solid rgba(255,255,255,.28);padding:0 40px;transform:rotate(-4deg);position:relative">SOLD OUT
        <svg style="position:absolute;left:-30px;top:30px" width="560" height="120" viewBox="0 0 560 120"><path d="M10 90 C150 40 380 70 550 20" stroke="#E0475A" stroke-width="16" fill="none" stroke-linecap="round"/></svg></span></div>
    <div class="a" style="top:370px;width:100%;text-align:center;font-family:Playfair;font-weight:600;font-size:120px;line-height:1;letter-spacing:-2px;color:#fff">It's <i style="color:${GOLDL}">back.</i></div>
    <div class="a" style="top:530px;left:130px;right:130px;text-align:center;color:#D9D7EA;font-size:36px;line-height:1.4">The halal collagen you waited for is back in stock, just in time for Black Friday.</div>
    ${trio(540, 700, 380, .6)}
    ${bfTag(760, 690, 8)}
    ${btn(`Get ${OFF} off your 3-pack →`, 1140, GOLD, INK)}
    ${foot(CLAIM, 'rgba(255,255,255,.55)')}`),

  // 2 — "…is calling" format
  'black-friday-calling': page('linear-gradient(180deg,#1A1B2E,#0B0B14)', `
    <div class="a" style="top:60px;width:100%;text-align:center;color:rgba(255,255,255,.7);font-size:30px;letter-spacing:4px">INCOMING CALL</div>
    <div class="a" style="top:120px;width:100%;text-align:center;color:#fff;font-family:Playfair;font-weight:600;font-size:96px;line-height:1.05;letter-spacing:-1px">Your glow<br>is <i style="color:${GOLDL}">calling.</i></div>
    <div class="a" style="top:370px;width:100%;text-align:center;color:#C9C7DC;font-size:34px">RizqPure · back in stock · Black Friday</div>
    <div class="a" style="left:340px;top:460px;width:400px;height:400px;border-radius:50%;background:radial-gradient(closest-side,rgba(242,196,98,.3),rgba(242,196,98,0))"></div>
    ${[0, 1, 2].map(i => `<div class="a" style="left:${300 - i * 50}px;top:${420 - i * 50}px;width:${480 + i * 100}px;height:${480 + i * 100}px;border-radius:50%;border:2px solid rgba(242,196,98,${.35 - i * .1})"></div>`).join('')}
    ${trio(540, 500, 340, .6)}
    <div class="a" style="top:930px;width:100%;text-align:center;color:#fff;font-weight:800;font-size:44px">${OFF} off the 3-pack <span style="color:${GOLDL}">+ ${GIFT}</span></div>
    <div class="a" style="left:180px;top:1050px;text-align:center;color:#fff;font-size:26px"><div style="width:120px;height:120px;border-radius:50%;background:#E0475A;display:flex;align-items:center;justify-content:center;margin-bottom:10px">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="#fff" style="transform:rotate(135deg)"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg></div>Miss out again</div>
    <div class="a" style="left:780px;top:1050px;text-align:center;color:#fff;font-size:26px"><div style="width:120px;height:120px;border-radius:50%;background:#33B864;display:flex;align-items:center;justify-content:center;margin-bottom:10px">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="#fff"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg></div>Answer</div>
    ${foot(CLAIM, 'rgba(255,255,255,.5)')}`),

  // 3 — Black Friday receipt (percentages only)
  'black-friday-receipt': page('linear-gradient(160deg,#2A2B45,#121322)', `
    <div class="a" style="left:70px;top:70px;width:660px;height:1120px;background:#FDFCF8;transform:rotate(-1.2deg);box-shadow:0 30px 60px rgba(0,0,0,.5);font-family:Mono;color:#222;padding:60px 64px;
      clip-path:polygon(0 0,100% 0,100% 98%,95% 100%,90% 98%,85% 100%,80% 98%,75% 100%,70% 98%,65% 100%,60% 98%,55% 100%,50% 98%,45% 100%,40% 98%,35% 100%,30% 98%,25% 100%,20% 98%,15% 100%,10% 98%,5% 100%,0 98%)">
      <div style="text-align:center;font-family:Playfair;font-weight:700;font-size:48px;color:${NAVY}">RizqPure</div>
      <div style="text-align:center;font-size:22px;margin-top:6px">BLACK FRIDAY WEEK · ORDER FOR: YOU</div>
      <div style="border-top:3px dashed #999;margin:28px 0"></div>
      ${[['HALAL COLLAGEN x3', '3-PACK'], ['STATUS', 'BACK IN STOCK'], ['BLACK FRIDAY', `-${OFF}`], ['MAXIMISE GUIDE', 'FREE'], ['HALAL CERTIFIED', '100%'], ['FILLERS', '0%']].map(([a, b]) =>
        `<div style="display:flex;justify-content:space-between;font-size:28px;line-height:2.1"><span>${a}</span><span>${b}</span></div>`).join('')}
      <div style="border-top:3px dashed #999;margin:28px 0"></div>
      ${[['FINE LINES', 'SUPPORTED*'], ['HAIR', 'FULLER-LOOKING'], ['KNEES IN SUJOOD', 'SUPPORTED*'], ['CHARITY', 'INCLUDED']].map(([a, b]) =>
        `<div style="display:flex;justify-content:space-between;font-size:26px;line-height:2"><span>${a}</span><span>${b}</span></div>`).join('')}
      <div style="border-top:3px dashed #999;margin:28px 0"></div>
      <div style="display:flex;justify-content:space-between;font-size:38px"><span>YOU SAVE</span><span>${OFF}</span></div>
      <div style="text-align:center;font-size:22px;margin-top:40px;line-height:1.5">WHILE STOCK LASTS<br>THANK YOU FOR SHOPPING HALAL</div>
      <svg style="display:block;margin:24px auto 0" width="420" height="70">${Array.from({ length: 60 }, (_, i) => `<rect x="${i * 7}" y="0" width="${[2, 4, 3, 1][i % 4]}" height="70" fill="#222"/>`).join('')}</svg></div>
    ${trio(855, 1030, 240, .6)}
    ${foot(CLAIM, 'rgba(255,255,255,.5)')}`),

  // 4 — Lock-screen notifications
  'back-in-stock-notifications': page('linear-gradient(170deg,#3A2E5E 0%,#1B1C38 60%,#0D0D18 100%)', `
    <div class="a" style="top:90px;width:100%;text-align:center;color:#fff;font-size:34px;font-weight:600">Friday</div>
    <div class="a" style="top:120px;width:100%;text-align:center;color:#fff;font-family:'DM Sans';font-weight:300;font-size:190px;letter-spacing:-6px">it's back.</div>
    ${[['RizqPure', 'now', 'Back in stock ✨', 'The one you missed last time is back.'], ['RizqPure', 'now', `Black Friday: ${OFF} off your 3-pack`, 'Your skin, hair and joints*, fully stocked.'],
      ['RizqPure', '1m ago', '🎁 A gift for you', `${GIFT} with every 3-pack.`], ['RizqPure', '3m ago', 'Heads up', 'Last restock sold out. Don\'t wait this time.']].map(([a, t, h, s], i) =>
      `<div class="a" style="left:70px;right:70px;top:${400 + i * 160}px;height:140px;border-radius:32px;background:rgba(255,255,255,.82);backdrop-filter:blur(10px);display:flex;align-items:center;gap:24px;padding:0 30px">
        <div style="width:84px;height:84px;border-radius:20px;background:${NAVY};display:flex;align-items:center;justify-content:center;color:#fff;font-family:Playfair;font-weight:700;font-size:44px;flex:none">R</div>
        <div style="flex:1"><div style="display:flex;justify-content:space-between;font-size:24px;color:#555"><b style="color:#111">${a}</b><span>${t}</span></div>
        <div style="font-weight:800;font-size:31px;color:#111;margin-top:4px">${h}</div><div style="font-size:26px;color:#333">${s}</div></div></div>`).join('')}
    ${trio(540, 1035, 250, .6)}
    ${foot(CLAIM, 'rgba(255,255,255,.55)')}`),

  // 5 — Group chat
  'chat-its-back': page('#ECE5DD', `
    <div class="a" style="left:0;right:0;top:0;height:150px;background:#075E54;display:flex;align-items:center;gap:22px;padding:30px 40px 0">
      <div style="width:76px;height:76px;border-radius:50%;background:#D6C3E8;display:flex;align-items:center;justify-content:center;font-size:40px">🧕🏽</div>
      <div style="color:#fff"><div style="font-weight:700;font-size:34px">Sisters 💕</div><div style="font-size:24px;opacity:.8">Aisha, Maryam, You</div></div></div>
    <div class="a" style="left:40px;right:40px;top:180px;display:flex;flex-direction:column;gap:18px">${[['l', 'Aisha', 'RIZQPURE IS BACK IN STOCK 😭😭'], ['l', 'Aisha', `and it's ${OFF} off for black friday??`], ['r', '', 'nooo way, I missed it last time'],
      ['l', 'Maryam', 'getting the 3-pack this time. my hair needs consistency fr'], ['l', 'Maryam', `you get the ${GIFT.replace('FREE ', 'free ')} with it too 🎁`], ['r', '', 'ordering mine now. not missing it twice 🙌']].map(([s, who, t], i) =>
      `<div style="align-self:${s === 'r' ? 'flex-end;background:#DCF8C6' : 'flex-start;background:#fff'};max-width:760px;border-radius:22px;padding:14px 24px;box-shadow:0 2px 2px rgba(0,0,0,.08)">
        ${who ? `<div style="font-weight:700;font-size:22px;color:${who === 'Aisha' ? '#C0507A' : '#3C7FC0'}">${who}</div>` : ''}<div style="font-size:31px;color:#111">${t}</div></div>`).join('')}</div>
    <div class="a" style="left:40px;right:40px;top:880px;height:300px;border-radius:30px;background:${BLACK};overflow:hidden">
      <div style="position:absolute;left:44px;top:40px;color:#fff;font-family:Playfair;font-size:52px;line-height:1.1">Back in stock.<br><i style="color:${GOLDL}">Not for long.</i></div>
      <div style="position:absolute;left:44px;top:190px;color:#fff;font-weight:800;font-size:30px">${OFF} off the 3-pack + free gift</div></div>
    ${trio(800, 880, 280, .6)}
    ${foot(CLAIM)}`),

  // 6 — Search bar
  'search-back-in-stock': page(`linear-gradient(180deg,#FFFFFF,#F2EEF6)`, `
    ${logo(70)}
    <div class="a" style="left:80px;right:80px;top:180px;height:110px;border-radius:60px;background:#fff;box-shadow:0 8px 30px rgba(30,25,60,.15);display:flex;align-items:center;gap:24px;padding:0 40px;font-size:38px;color:#222">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>is rizqpure back in stock<span style="width:3px;height:46px;background:#222"></span></div>
    ${['is rizqpure back in stock black friday', 'halal collagen black friday deal', 'collagen for thinning hair under hijab'].map((t, i) =>
      `<div class="a" style="left:150px;top:${320 + i * 64}px;font-size:30px;color:#777">🔍 ${t}</div>`).join('')}
    <div class="a" style="left:80px;right:80px;top:540px;font-family:'Archivo Black';font-size:110px;line-height:1;color:${INK}">Yes. <span class="mk">And</span><br>it's Black<br>Friday.</div>
    ${trio(800, 900, 290, .35)}
    <div class="a" style="left:80px;top:960px;width:470px;font-size:32px;line-height:1.4;color:#45405A">${OFF} off your 3-pack, plus a ${GIFT.replace('FREE ', 'free ')}. While stock lasts.</div>
    <div class="a" style="left:80px;top:1140px;padding:24px 56px;border-radius:60px;background:${INK};color:#fff;font-weight:800;font-size:34px">Shop the restock →</div>
    ${foot(CLAIM)}`),

  // 7 — Black Friday tier list
  'black-friday-tier-list': page('#16161F', `
    <div class="a" style="top:60px;width:100%;text-align:center;color:#fff;font-family:Anton;font-size:96px;letter-spacing:2px">BLACK FRIDAY BUYS</div>
    <div class="a" style="top:175px;width:100%;text-align:center;color:#B9B7CC;font-size:30px">ranked by how much you'll thank yourself in a month</div>
    ${[['S', '#E0475A', 'RizqPure 3-pack, back in stock', true], ['A', '#F08A3E', 'Something for Mum'], ['B', '#E8C547', 'A new abaya'], ['C', '#7BC86C', 'Another serum you\'ll forget'], ['D', '#5DA9E9', 'A gadget for the drawer']].map(([l, c, t, hl], i) =>
      `<div class="a" style="left:60px;right:60px;top:${250 + i * 168}px;height:150px;display:flex;background:#24243A;border-radius:14px;overflow:hidden">
        <div style="width:150px;background:${c};display:flex;align-items:center;justify-content:center;font-family:Anton;font-size:90px;color:#111;flex:none">${l}</div>
        <div style="flex:1;display:flex;align-items:center;padding:0 34px;color:#fff;font-size:${hl ? 38 : 34}px;font-weight:${hl ? 800 : 500}">${t}</div>
        ${hl ? `<div style="width:300px;position:relative;flex:none">${trio(150, 8, 140, .6)}</div>` : ''}</div>`).join('')}
    <div class="a" style="top:1100px;width:100%;text-align:center;color:#fff;font-weight:800;font-size:40px">${OFF} off the 3-pack <span style="color:${GOLDL}">+ ${GIFT}</span></div>
    ${foot(CLAIM, 'rgba(255,255,255,.5)')}`),

  // 8 — Cartoon split before/after
  'you-missed-it-cartoon': page(`linear-gradient(180deg,${CREAM},#EFE3CF)`, `
    <div class="a" style="top:60px;left:60px;right:60px;text-align:center;font-family:Playfair;font-weight:700;font-size:78px;line-height:1.05;color:${INK}">You missed it last time.<br><i style="color:#9A6B2E">Not this time.</i></div>
    <div class="a" style="left:190px;top:280px;width:700px;height:560px;overflow:hidden;border-radius:30px;background:#fff;box-shadow:0 20px 40px rgba(60,40,20,.15)">
      <div style="position:absolute;left:50px;top:-40px">${cartoon({ id: 'bf', variant: 'skin', w: 600, h: 800 })}</div>
      <div style="position:absolute;left:350px;top:0;bottom:0;width:4px;background:#fff"></div>
      <div style="position:absolute;left:24px;top:22px;background:#6A5E50;color:#fff;font-weight:800;font-size:22px;padding:8px 16px;border-radius:20px">SOLD OUT</div>
      <div style="position:absolute;right:24px;top:22px;background:${NAVY};color:#fff;font-weight:800;font-size:22px;padding:8px 16px;border-radius:20px">RESTOCKED</div></div>
    ${trio(540, 860, 240, .35)}
    ${bfTag(760, 860, 8)}
    ${btn(`Get ${OFF} off your 3-pack →`, 1140)}
    ${foot(CLAIM)}`),

  // 9 — Highlighter headline, "you" once
  'only-haul-you-need': page(darkBg, `
    ${logo(70, '#fff', 80)}
    <div class="a" style="top:180px;left:80px;right:80px;color:#fff;font-family:Playfair;font-weight:600;font-size:96px;line-height:1.1;letter-spacing:-1px">The only Black Friday <span style="background:linear-gradient(transparent 62%,${GOLD} 62%,${GOLD} 90%,transparent 90%)">haul</span> your skin will thank you for.</div>
    <div class="a" style="top:560px;left:80px;width:410px;color:#D9D7EA;font-size:34px;line-height:1.45">Fine lines, shedding, stiff knees. Support all three from within* with one daily halal scoop, now back in stock.</div>
    ${giftBadge(80, 900, true)}
    ${trio(830, 600, 360, .6)}
    ${bfTag(80, 1010, -4)}
    ${btn('Shop the 3-pack →', 1140, GOLD, INK).replace('left:50%;', 'left:72%;')}
    ${foot(CLAIM, 'rgba(255,255,255,.55)')}`),

  // 10 — Give back (no figures)
  'black-friday-gives-back': page(`linear-gradient(180deg,#F7F2EA,#EDE2D0)`, `
    ${logo(70)}
    <div class="a" style="top:170px;left:70px;right:70px;text-align:center;font-family:'Archivo Black';font-size:84px;line-height:1.05;color:${INK}">THIS BLACK FRIDAY,<br>YOUR ORDER<br><span style="color:#9A6B2E">GIVES BACK.</span></div>
    <div class="a" style="top:520px;left:140px;right:140px;text-align:center;font-size:34px;line-height:1.45;color:#45405A">A portion of every order goes to charity. So while you're glowing, someone else is getting help.</div>
    ${trio(540, 700, 340, .35)}
    <div class="a" style="top:1060px;width:100%;display:flex;justify-content:center;gap:18px">${['BACK IN STOCK', `${OFF} OFF 3-PACK`, 'FREE GUIDE'].map(t => `<div style="padding:12px 24px;border-radius:30px;border:2px solid ${INK};font-weight:800;font-size:24px;letter-spacing:1px;color:${INK}">${t}</div>`).join('')}</div>
    ${btn('Shop &amp; give →', 1150)}
    ${foot(CLAIM)}`),

  // 11 — Restock checklist "This is for you if…"
  'restock-for-you-if': page(`linear-gradient(180deg,${CREAM},#F1E6D6)`, `
    ${logo(70, NAVY, 80)}
    ${bfTag(740, 60, 6)}
    <div class="a" style="top:200px;left:80px;font-family:'Archivo Black';font-size:92px;line-height:1;color:${INK}">BACK IN STOCK<br>FOR YOU IF...</div>
    ${['You tried to order and it was sold out', 'You\'ve been watching more hair go down the drain', 'Your fine lines have been bothering you', 'You\'ve been waiting for the right deal'].map((t, i) =>
      `<div class="a" style="left:80px;top:${440 + i * 115}px;width:920px;display:flex;gap:22px;align-items:flex-start">
        <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><rect x="3" y="4" width="16" height="16" rx="2"/><path d="M7 12l3.5 3.5L22 4"/></svg>
        <div style="font-weight:700;font-size:36px;line-height:1.2;color:${INK}">${t}</div></div>`).join('')}
    ${trio(828, 900, 290)}
    <div class="a" style="left:80px;width:490px;top:930px;font-family:Playfair;font-style:italic;font-size:46px;line-height:1.2;color:${NAVY}">...the wait is over, and it's ${OFF} off.</div>
    <div class="a" style="left:80px;top:1120px;padding:24px 56px;border-radius:60px;background:${INK};color:#fff;font-weight:800;font-size:34px">Get your 3-pack →</div>
    ${foot(CLAIM)}`),
};

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  const only = process.argv[3];
  for (const [name, html] of Object.entries(ADS)) {
    if (only && !name.includes(only)) continue;
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    const f = path.join(out, `ad-bf-${name}-1080x1350.png`); await p.screenshot({ path: f }); console.log(f);
  }
  await b.close();
})();
