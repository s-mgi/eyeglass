import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
const R = await import(pathToFileURL(path.resolve('src/lib/render.js')).href);
const q = (v) => "'" + String(v).replace(/'/g, "''").split('\n').join("' || char(10) || '")
  .split(';').join("' || char(59) || '").split('--').join("-' || '-") + "'";
const seen = new Map();
for (const p of R.PAGES) {
  const fields = R.extractFields(fs.readFileSync(p.file, 'utf8'));
  for (const [k, f] of Object.entries(fields)) if (!seen.has(k)) seen.set(k, f.value);
}
for (const [k, v] of Object.entries(R.SITE_PLAIN)) if (!seen.has(k)) seen.set(k, v);
for (const k of Object.keys(R.LIST_SHAPES)) seen.set(k, JSON.stringify(R.DEFAULT_LISTS[k]));
console.log([...seen].map(([k, v]) => `  (${q(k)}, ${q(v)})`).join(',\n'));
