// Render 4K stills of the 3D mockup with headless Chromium.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'url';
const out = process.argv[2] || '.';
const shots = (process.argv[3] || 'photo,front,run,end,open').split(',');
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
const LIB = process.env.LIBDIR;
await page.route(/three\.min\.js$|OrbitControls\.js$/, r => r.fulfill({ path: `${LIB}/${r.request().url().split('/').pop()}`, contentType: 'application/javascript' }));
await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
page.on('console', m => console.log('console:', m.text()));
page.on('pageerror', e => console.log('pageerror:', e.message));
const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>${(await import('fs')).readFileSync('mockup.html', 'utf8')}</body></html>`;
(await import('fs')).writeFileSync('/tmp/_mockup_full.html', html);
await page.goto(pathToFileURL('/tmp/_mockup_full.html').href + '#still');
await page.waitForFunction(() => window.mockup && window.mockup.ready(), null, { timeout: 120000, polling: 1000 });
for (const s of shots) {
  const open = s === 'open';
  await page.evaluate(([v, o]) => { mockup.setView(v); mockup.doors(o); mockup.render(); }, [open ? 'photo' : s, open]);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/3d_${s}.png`, timeout: 300000 });
  console.log('saved', s);
}
await browser.close();
