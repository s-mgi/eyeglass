import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
const R = await import(pathToFileURL(path.resolve('src/lib/render.js')).href);
const REG = await import(pathToFileURL(path.resolve('src/lib/register.js')).href);
let fail = 0; const bad = (m) => { fail++; console.log('FAIL', m); };
const noLd = (h) => h.replace(/<!--cms-jsonld-->[\s\S]*?<!--\/cms-jsonld-->/, '');
const txt = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const imgs = (h) => [...h.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<img[^>]*?src="([^"]+)"[^>]*?alt="([^"]*)"/g)]
  .map((m) => m[1] + '|' + m[2].replace(/&amp;/g, '&').replace(/&#39;/g, "'")).join('\n');

for (const f of ['robots.txt', 'sitemap.xml']) if (fs.existsSync(f)) bad(`${f}: delete the static file; the Worker generates it`);
const all = {};
for (const p of R.PAGES) {
  const html = fs.readFileSync(p.file, 'utf8');
  for (const m of ['<!--cms:head_tags-->', '<!--cms:body_start_tags-->', '<!--cms:body_end_tags-->']) if (!html.includes(m)) bad(`${p.file}: missing ${m}`);
  if (/googletagmanager\.com\/gtag\/js|fbevents\.js|gtm\.js\?id=|hs-scripts|cloudflareinsights/.test(html)) bad(`${p.file}: hardcoded tracking tag`);
  const f = R.extractFields(html);
  for (const [k, v] of Object.entries(f)) { if (k in all && all[k] !== v.value) bad(`${k}: different values on different pages`); all[k] = v.value; }
  if (noLd(R.fillPage(html, {})) !== noLd(html)) bad(`${p.file}: empty DB output differs from the static file`);
  const probe = {}; const mark = (k) => (f[k].kind === 'image' ? 'probe' + k.replace(/\W/g, '') + '.jpg' : f[k].kind === 'url' ? 'https://probe/' + k : 'PROBE[' + k + ']');
  for (const k of Object.keys(f)) probe[k] = mark(k);
  const out = R.fillPage(html, probe);
  const miss = Object.keys(f).filter((k) => !out.includes(mark(k)));
  if (miss.length) bad(`${p.file}: fields that don't change the page: ${miss.join(', ')}`);
}
for (const k of Object.keys(R.DEFAULT_LISTS)) all[k] = JSON.stringify(R.DEFAULT_LISTS[k]);
for (const p of R.PAGES) {
  const html = fs.readFileSync(p.file, 'utf8'); const out = R.fillPage(html, all);
  if (txt(html) !== txt(out)) bad(`${p.file}: seeded values change the visible text`);
  if (imgs(html) !== imgs(out)) bad(`${p.file}: seeded values change images`);
}
const sql = fs.readFileSync('migrations/0001_init.sql', 'utf8');
const seed = new Set([...sql.slice(sql.indexOf('INSERT OR IGNORE')).matchAll(/^\s*\('([^']+)',/gm)].map((m) => m[1]));
const want = new Set([...Object.keys(all), ...Object.keys(R.SITE_PLAIN)]);
const missSeed = [...want].filter((k) => !seed.has(k)); const extraSeed = [...seed].filter((k) => !want.has(k));
if (missSeed.length) bad('fields with no seed row (run dev-tools/genseed.mjs): ' + missSeed.join(', '));
if (extraSeed.length) bad('seed rows no page uses: ' + extraSeed.join(', '));
const js = fs.readFileSync('script.js', 'utf8');
const v = (js.match(/FORM_VERSION='([^']+)'/) || [])[1];
if (v !== REG.FORM_VERSION) bad(`FORM_VERSION: script.js has ${v}, register.js has ${REG.FORM_VERSION}`);
const lens = fs.readFileSync('contact-lenses.html', 'utf8');
const opts = [...(lens.match(/<select name="supply"[\s\S]*?<\/select>/) || [''])[0].matchAll(/<option>([^<]+)<\/option>/g)].map((m) => m[1]);
if (opts.join('|') !== REG.SUPPLY_OPTIONS.join('|')) bad(`supply options differ: page ${opts.join(', ')} vs register.js ${REG.SUPPLY_OPTIONS.join(', ')}`);
if (!/<form[^>]*id="contactForm"/.test(fs.readFileSync('contact.html', 'utf8'))) bad('contact.html: #contactForm missing');
if (!/<form[^>]*id="orderForm"/.test(lens)) bad('contact-lenses.html: #orderForm missing');
console.log(fail ? `${fail} problem(s)` : `OK: ${R.PAGES.length} pages, ${Object.keys(all).length} fields, ${seed.size} seed rows, forms match`);
process.exit(fail ? 1 : 0);
