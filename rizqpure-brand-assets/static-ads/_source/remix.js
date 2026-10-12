// RizqPure remixes of proven static-ad formats. usage: node remix.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, w = 'normal', s = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/ttf;base64,${b64(F(f))});font-weight:${w};font-style:${s}}`;
const FONTS = face('DM Sans', 'DMSans%5Bopsz,wght%5D.ttf', '100 1000') + face('Playfair', 'PlayfairDisplay%5Bwght%5D.ttf', '400 900') +
  face('Archivo Black', 'ArchivoBlack-Regular.ttf') + face('DM Serif', 'DMSerifDisplay-Regular.ttf');
const POUCH = 'data:image/png;base64,' + b64(path.join(__dirname, '..', 'call', 'pouch.png'));
const NAVY = '#1F2457', INDIGO = '#2C2F66', GOLD = '#C9A35E';
const base = (W, H, bg, body, css = '') => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box} body{width:${W}px;height:${H}px;overflow:hidden;position:relative;font-family:'DM Sans';background:${bg}}
.pouch{position:absolute;display:block} ${css}</style></head><body>${body}</body></html>`;
const shadowed = (x, y, h, rot = 0, z = 1) => `<img class="pouch" src="${POUCH}" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg);z-index:${z};
  filter:drop-shadow(0 ${h * .05}px ${h * .05}px rgba(30,25,60,.35)) drop-shadow(0 ${h * .01}px ${h * .015}px rgba(30,25,60,.3))">`;

const ADS = {
  // 1 ── Hismile: shock word + "don't pay full price" + bundle visual
  'dont-be-a-mug-1080x1350': [1080, 1350, base(1080, 1350, 'linear-gradient(180deg,#FBF6EE 0%,#F4EADB 100%)', `
    <div style="position:absolute;top:58px;width:100%;text-align:center;font-family:'DM Serif';font-size:44px;color:${NAVY};letter-spacing:.5px">RizqPure</div>
    <div style="position:absolute;top:130px;width:100%;text-align:center;font-family:'Playfair';font-weight:500;font-size:108px;letter-spacing:-2px;color:#16172E;transform:scaleY(1.12)">Don't Be A</div>
    <div style="position:absolute;top:226px;width:100%;text-align:center;font-family:'Playfair';font-weight:900;font-size:330px;line-height:1;letter-spacing:-6px;color:#C8202F;transform:scale(.92,1.28);transform-origin:50% 0">MUG.</div>
    <div style="position:absolute;top:668px;width:100%;text-align:center;font-weight:500;font-size:58px;color:#4A4A55;letter-spacing:-.5px">don't pay full price!</div>
    <div style="position:absolute;top:772px;left:200px;right:200px;height:96px;border-radius:60px;background:#111;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:34px">Shop the 3-pack →</div>
    ${shadowed(118, 958, 330, -14, 1)}${shadowed(300, 912, 360, -3, 3)}${shadowed(500, 960, 330, 10, 2)}
    <div style="position:absolute;left:92px;top:902px;z-index:5;background:#fff;border-radius:18px;padding:12px 26px;font-weight:700;font-size:44px;color:#16172E;transform:rotate(-8deg);box-shadow:0 8px 20px rgba(0,0,0,.12)">buy 3</div>
    <div style="position:absolute;right:86px;top:1010px;z-index:5;background:#16172E;color:#fff;border-radius:18px;padding:12px 26px;font-weight:700;font-size:46px;transform:rotate(7deg);box-shadow:0 8px 20px rgba(0,0,0,.2)">save £9</div>
    <div style="position:absolute;right:96px;top:1100px;z-index:5;text-align:right;font-weight:600;font-size:30px;color:#4A4A55;line-height:1.3">3 pouches<br><b style="font-size:46px;color:#C8202F">£51</b> <s style="opacity:.6">£60</s></div>
  `)],

  // 2 ── Squatch: FACE THE FACTS + big numbers + "Enough said…"
  'face-the-facts-1080x1080': [1080, 1080, base(1080, 1080, '#F3F1EC', `
    <div style="position:absolute;top:56px;width:100%;text-align:center;font-family:'Archivo Black';font-size:96px;letter-spacing:-1px;line-height:1">
      <span style="color:#6E7BA6">FACE</span> <span style="color:${INDIGO}">THE FACTS</span></div>
    <div style="position:absolute;top:168px;width:100%;text-align:center;font-weight:700;font-size:52px;color:#3A3A44">Enough said...</div>
    <div style="position:absolute;left:300px;right:44px;top:262px;bottom:44px;background:#E6E4DF;border-radius:20px"></div>
    ${shadowed(56, 300, 660, -4, 2)}
    <div style="position:absolute;right:84px;top:288px;width:480px;text-align:right;color:${INDIGO};z-index:3">
      ${[['100%', 'halal bovine collagen peptides. Nothing to second-guess'], ['10g', 'of collagen in every scoop, for skin, hair, nails &amp; joints*'], ['1', 'scoop a day. No pills, no clumps, no fuss'], ['80p', 'a day. Less than your morning coffee']]
      .map(([n, t]) => `<div style="margin-bottom:22px"><div style="font-family:'Archivo Black';font-size:74px;line-height:1">${n}</div>
        <div style="font-weight:500;font-size:26px;line-height:1.22;color:#3A3A44;margin-top:4px">${t}</div></div>`).join('')}
    </div>
    <div style="position:absolute;right:84px;bottom:66px;width:470px;text-align:right;font-size:18px;color:#6B6B75;z-index:3;line-height:1.35">*Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.<br>80p/day based on a £20, 25-serving pouch. Part of every order goes to charity.</div>
  `)],

  // 3 ── Tier list meme
  'collagen-tier-list-1080x1080': [1080, 1080, (() => {
    const rows = [['S', '#F07C7C'], ['A', '#F5B57A'], ['B', '#F6E27A'], ['C', '#9BDA7C'], ['D', '#7CB6E8'], ['E', '#8E86D8'], ['F', '#D88AC9']];
    const items = {
      A: [['Halal marine collagen', 'good, but pricey for a small dose']],
      B: [['"Halal" label', 'no certifier named']],
      C: [['Collagen gummies', 'sugar + tiny dose']],
      D: [['Cheap bulk tubs', 'clumpy, gritty, uncertified']],
      E: [['Mystery-source collagen', 'cow? pig? who knows']],
      F: [['Porcine collagen', 'not for us']],
    };
    const rh = 126, top = 86;
    const tile = ([a, b]) => `<div style="height:${rh - 16}px;min-width:280px;padding:0 26px;border-radius:8px;background:#2A2A33;border:2px solid #3A3A46;display:flex;flex-direction:column;justify-content:center;color:#fff">
      <div style="font-weight:800;font-size:32px;line-height:1.05">${a}</div><div style="font-size:22px;color:#B9B9C6;margin-top:6px">${b}</div></div>`;
    return base(1080, 1080, '#14141A', `
      <div style="position:absolute;top:20px;width:100%;text-align:center;font-family:'Archivo Black';font-size:40px;color:#fff;letter-spacing:.5px">COLLAGEN TIER LIST <span style="color:${GOLD}">(halal edition)</span></div>
      ${rows.map(([r, c], i) => `<div style="position:absolute;left:30px;right:30px;top:${top + i * (rh + 10) - 4}px;height:${rh}px;display:flex;gap:10px">
        <div style="width:150px;height:100%;background:${c};border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'Archivo Black';font-size:58px;color:#1A1A22">${r}</div>
        <div style="flex:1;background:#1E1E26;border-radius:6px;display:flex;align-items:center;gap:12px;padding:0 10px">
          ${r === 'S' ? `<div style="height:${rh - 16}px;padding:0 22px 0 6px;border-radius:8px;background:linear-gradient(90deg,#2C2F66,#3D4290);border:2px solid ${GOLD};display:flex;align-items:center;gap:18px;color:#fff">
              <img src="${POUCH}" style="height:${rh - 22}px;transform:rotate(-8deg);filter:drop-shadow(0 6px 10px rgba(0,0,0,.5))">
              <div><div style="font-weight:800;font-size:34px">RizqPure Halal Collagen</div><div style="font-size:22px;color:#E8D3A6;margin-top:4px">certified halal · no clumps · gives back</div></div></div>`
            : (items[r] || []).map(tile).join('')}
        </div></div>`).join('')}
      <div style="position:absolute;right:34px;bottom:6px;font-weight:600;font-size:22px;color:#fff;opacity:.85">@rizqpure</div>
    `);
  })()],

  // 4 ── Venn: 1 scoop that does both
  '1-scoop-does-both-1080x1350': [1080, 1350, base(1080, 1350, 'linear-gradient(180deg,#3F4AB8 0%,#6E7BDB 55%,#A9B4F0 100%)', `
    <div style="position:absolute;top:120px;width:100%;text-align:center;color:#fff;font-family:'DM Sans';font-weight:500;font-size:104px;line-height:1.02;letter-spacing:-1px">
      1 SCOOP<br>THAT DOES <i style="font-family:'Playfair';font-weight:500;font-style:italic">BOTH</i></div>
    <div style="position:absolute;left:84px;top:470px;width:560px;height:560px;border:5px solid #fff;border-radius:50%"></div>
    <div style="position:absolute;right:84px;top:470px;width:560px;height:560px;border:5px solid #fff;border-radius:50%"></div>
    <div style="position:absolute;left:120px;top:690px;width:230px;text-align:center;color:#fff;font-weight:600;font-size:44px;line-height:1.08">SUPPORTS<br>GLOWING<br>SKIN</div>
    <div style="position:absolute;right:110px;top:668px;width:250px;text-align:center;color:#fff;font-weight:600;font-size:44px;line-height:1.08">SUPPORTS<br>JOINTS FOR<br>PRAYER</div>
    ${shadowed(428, 572, 350, 0, 2)}
    <div style="position:absolute;bottom:110px;width:100%;text-align:center;color:#fff;font-weight:600;font-size:36px;letter-spacing:1px">RizqPure Halal Collagen</div>
    <div style="position:absolute;bottom:52px;left:120px;right:120px;text-align:center;color:#fff;opacity:.8;font-size:20px;line-height:1.35">Vitamin C contributes to normal collagen formation for the normal function of skin and cartilage.</div>
  `)],

  // 5 ── Inverted review: "Zero stars"
  'zero-stars-1080x1350': [1080, 1350, base(1080, 1350, '#0B0B0D', `
    <div style="position:absolute;inset:0;background:radial-gradient(90% 70% at 30% 25%,#26262B 0%,#0B0B0D 70%)"></div>
    <div style="position:absolute;left:110px;top:250px;color:#fff;font-weight:700;font-size:150px;letter-spacing:-4px;line-height:1">Zero stars.</div>
    <div style="position:absolute;left:112px;top:430px;display:flex;gap:26px">${'<svg width="104" height="104" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>'.repeat(5)}</div>
    <div style="position:absolute;left:112px;top:620px;color:#fff;font-weight:500;font-size:66px;line-height:1.2">Would not recommend.</div>
    <div style="position:absolute;left:112px;top:715px;color:#fff;font-weight:500;font-size:66px">- Your fine lines</div>
    <div style="position:absolute;left:112px;bottom:130px;display:flex;align-items:center;gap:28px">
      <div style="width:132px;height:132px;border-radius:30px;background:${INDIGO};overflow:hidden;display:flex;align-items:flex-start;justify-content:center;border:2px solid #3A3D7A">
        <img src="${POUCH}" style="height:190px;margin-top:6px"></div>
      <div style="color:#fff;font-weight:600;font-size:60px">RizqPure</div>
    </div>
    <div style="position:absolute;left:0;right:0;bottom:44px;text-align:center;color:#8C8C96;font-size:22px">Halal collagen for skin that glows. Vitamin C contributes to normal collagen formation for the normal function of skin.</div>
  `)],
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
