// "Missing from this receipt" ads (Grüns format) + printable receipts. usage: node receipt.js outdir
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const b64 = f => fs.readFileSync(f).toString('base64');
const F = f => path.join(__dirname, 'fonts', f);
const face = (n, f, w = 'normal', s = 'normal') => `@font-face{font-family:'${n}';src:url(data:font/ttf;base64,${b64(F(f))});font-weight:${w};font-style:${s}}`;
const FONTS = face('DM Sans', 'DMSans%5Bopsz,wght%5D.ttf', '100 1000') + face('Mono', 'SpaceMono-Bold.ttf', 700) +
  face('Cond', 'BarlowCondensed-SemiBold.ttf', 600) + face('Archivo Black', 'ArchivoBlack-Regular.ttf');
const POUCH = 'data:image/png;base64,' + b64(path.join(__dirname, '..', 'call', 'pouch.png'));

const RECEIPTS = {
  hair: {
    title: 'HAIR ROUTINE - YEAR TO DATE',
    items: [['Bond repair shampoo (x3)', '£££'], ['Hair growth serum (x2)', '£££'], ['Salon treatments', '££££'], ['Satin pillowcase', '££'], ['Silk-lined underscarf', '££'], ['Rosemary oil', '£']],
    thanks: 'Thank you for investing in you.<br>Your hair (and future self) appreciates it.',
    missing: 'Halal Collagen', sub: 'Fuller-looking hair starts from within too.<br>RizqPure helps fill the gap.*',
  },
  skin: {
    title: 'SKINCARE - YEAR TO DATE',
    items: [['Retinol serum (x2)', '£££'], ['Vitamin C serum', '£££'], ['Facials (x4)', '££££'], ['Eye cream', '££'], ['Hydrating moisturiser', '££'], ['Sheet masks', '£']],
    thanks: 'Thank you for investing in you.<br>Your skin (and future self) appreciates it.',
    missing: 'Halal Collagen', sub: 'Glowing, younger-looking skin starts from within too.<br>RizqPure helps fill the gap.*',
  },
};
const CLAIM = '*Supports skin &amp; hair vitality. Vitamin C contributes to normal collagen formation for the normal function of skin.';

function receiptHTML(r, w) {
  const u = w / 600;
  return `<div style="width:${w}px;background:#F7F6F2;padding:${42 * u}px ${40 * u}px ${36 * u}px;color:#2A2A2A;position:relative;
      background-image:radial-gradient(rgba(0,0,0,.035) 1px,transparent 1px);background-size:${3 * u}px ${3 * u}px">
    <div style="font-family:Cond;font-size:${40 * u}px;letter-spacing:${.5 * u}px;text-align:center;color:#222">${r.title}</div>
    <div style="font-family:Mono;font-size:${13 * u}px;text-align:center;margin-top:${8 * u}px;color:#999;filter:blur(${1.6 * u}px)">THE BEAUTY STORE, HIGH STREET</div>
    <div style="font-family:Mono;font-size:${15 * u}px;line-height:1.7;margin-top:${26 * u}px;color:#333">
      <div style="display:flex;justify-content:space-between"><span>Date: 15/10/2026</span><span>10:32 AM - 10:47 AM</span></div>
      <div>Transaction ID: 9027405828</div><div>Payment Method: **** 0000</div></div>
    <div style="border-top:${2 * u}px dashed #555;margin:${18 * u}px 0 ${16 * u}px"></div>
    ${r.items.map(([a, b]) => `<div style="display:flex;justify-content:space-between;font-family:Cond;font-size:${31 * u}px;line-height:1.55;color:#1F1F1F"><span>${a}</span><span>${b}</span></div>`).join('')}
    <div style="border-top:${2 * u}px dashed #555;margin:${16 * u}px 0 ${18 * u}px"></div>
    <div style="font-family:Cond;font-size:${36 * u}px;color:#1F1F1F">SUBTOTAL: <span style="font-size:${34 * u}px">Way too much.</span> <span style="font-size:${26 * u}px">And counting.</span></div>
    <div style="font-family:Mono;font-size:${14 * u}px;line-height:1.6;text-align:center;margin-top:${26 * u}px;color:#444">${r.thanks}</div>
  </div>`;
}

const page = (W, H, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box} body{width:${W}px;height:${H}px;overflow:hidden;position:relative;font-family:'DM Sans'}
.a{position:absolute}</style></head><body>${body}</body></html>`;

function ad(r, W, H) {
  const story = H > 1500;
  const tableY = story ? 1020 : 760;
  const rw = story ? 720 : 600;
  const rTop = story ? 250 : 70;
  const tY = story ? 1160 : 900;
  return page(W, H, `
    <!-- soft home scene: cream wall, blurred shelf + plant, dark wood table -->
    <div class="a" style="inset:0;background:linear-gradient(180deg,#E9E1D5 0%,#DCD2C4 ${tableY / H * 100 - 8}%,#CDBFAE ${tableY / H * 100}%)"></div>
    <div class="a" style="left:-60px;top:${tableY - 520}px;width:300px;height:420px;border-radius:50%;background:radial-gradient(closest-side,#8EA07A,rgba(142,160,122,0));filter:blur(30px);opacity:.8"></div>
    <div class="a" style="left:40px;top:${tableY - 220}px;width:150px;height:200px;border-radius:30px;background:#F3EFE8;filter:blur(14px)"></div>
    <div class="a" style="right:-40px;top:${tableY - 640}px;width:360px;height:30px;background:#F6F2EC;filter:blur(10px)"></div>
    <div class="a" style="right:30px;top:${tableY - 760}px;width:110px;height:240px;border-radius:20px;background:#7A5A3E;filter:blur(18px);opacity:.6"></div>
    <div class="a" style="right:150px;top:${tableY - 400}px;width:90px;height:180px;border-radius:14px;background:#B9A48A;filter:blur(16px);opacity:.7"></div>
    <div class="a" style="left:0;right:0;top:${tableY}px;bottom:0;background:
        linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.35) 45%,rgba(0,0,0,.85) 100%),
        repeating-linear-gradient(90deg,#5B3A24 0 7px,#4E3220 7px 11px,#63412A 11px 19px,#553623 19px 23px),#553623"></div>
    <div class="a" style="left:0;right:0;top:${tableY}px;height:6px;background:rgba(255,255,255,.12)"></div>
    <!-- receipt -->
    <div class="a" style="left:${(W - rw) / 2}px;top:${rTop}px;transform:rotate(-2.5deg);
        filter:drop-shadow(0 30px 40px rgba(40,25,10,.45)) drop-shadow(0 4px 6px rgba(40,25,10,.3))">
      ${receiptHTML(r, rw)}
      <div class="a" style="inset:0;background:linear-gradient(100deg,rgba(255,255,255,.18),rgba(0,0,0,0) 40%,rgba(0,0,0,.06))"></div>
    </div>
    <!-- copy -->
    <div class="a" style="left:0;right:0;top:${tY}px;text-align:center;color:#fff;text-shadow:0 2px 18px rgba(0,0,0,.45)">
      <div style="font-family:'Archivo Black';font-size:${story ? 62 : 56}px;letter-spacing:-1px;line-height:1.05">MISSING FROM THIS RECEIPT:</div>
      <div style="font-family:'Archivo Black';font-size:${story ? 86 : 74}px;line-height:1.1;color:#F2C462">${r.missing}</div>
      <div style="font-size:${story ? 40 : 34}px;line-height:1.3;margin-top:${story ? 18 : 10}px;font-weight:500">${r.sub}</div>
    </div>
    <div class="a" style="left:50%;transform:translateX(-50%);top:${story ? 1470 : 1196}px;white-space:nowrap;background:#C9A35E;color:#14163A;
        font-weight:800;font-size:${story ? 44 : 38}px;padding:${story ? 20 : 16}px ${story ? 48 : 42}px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.35)">Save up to 15% on bundles</div>
    ${story ? `<img class="a" src="${POUCH}" style="right:40px;top:905px;height:235px;transform:rotate(4deg);filter:drop-shadow(0 14px 16px rgba(0,0,0,.5))">` : ''}
    <div class="a" style="left:60px;right:60px;bottom:${story ? 268 : 22}px;text-align:center;color:#fff;opacity:.7;font-size:${story ? 18 : 15}px">${CLAIM}</div>
  `);
}

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage();
  for (const [k, r] of Object.entries(RECEIPTS)) {
    for (const [sz, W, H] of [['story-1080x1920', 1080, 1920], ['feed-1080x1350', 1080, 1350]]) {
      await p.setViewportSize({ width: W, height: H }); await p.setContent(ad(r, W, H)); await p.evaluate(() => document.fonts.ready);
      const f = path.join(out, `ad-missing-from-receipt-${k}-${sz}.png`); await p.screenshot({ path: f }); console.log(f);
    }
    // printable receipt for a real hand-held photo shoot (A6-ish, 1200 px wide)
    await p.setViewportSize({ width: 1200, height: 1800 }); await p.setContent(page(1200, 1800, `<div style="background:#F7F6F2">${receiptHTML(r, 1200)}</div>`));
    await p.evaluate(() => document.fonts.ready);
    const h = await p.evaluate(() => document.body.firstElementChild.getBoundingClientRect().height);
    const f = path.join(out, `printable-receipt-${k}.png`); await p.screenshot({ path: f, clip: { x: 0, y: 0, width: 1200, height: Math.ceil(h) } }); console.log(f);
  }
  await b.close();
})();
