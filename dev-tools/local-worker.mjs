import http from 'http'; import fs from 'fs'; import path from 'path'; import { pathToFileURL } from 'url';
import { DatabaseSync } from 'node:sqlite';
const ROOT = process.cwd(); const PORT = Number(process.argv[2] || 8788);
const db = new DatabaseSync(':memory:');
for (const f of fs.readdirSync('migrations').sort()) db.exec(fs.readFileSync(path.join('migrations', f), 'utf8'));
const norm = (v) => (v === undefined ? null : typeof v === 'boolean' ? (v ? 1 : 0) : v);
function stmt(sql, args = []) {
  return {
    bind: (...a) => stmt(sql, a),
    first: async (col) => { const r = db.prepare(sql).get(...args.map(norm)); return r ? (col ? r[col] : { ...r }) : null; },
    all: async () => ({ results: db.prepare(sql).all(...args.map(norm)).map((r) => ({ ...r })) }),
    run: async () => { const r = db.prepare(sql).run(...args.map(norm)); return { meta: { last_row_id: Number(r.lastInsertRowid), changes: r.changes } }; },
  };
}
const DB = { prepare: (sql) => stmt(sql), batch: async (list) => Promise.all(list.map((s) => s.run())), exec: async (sql) => db.exec(sql) };
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.ico': 'image/x-icon' };
const ASSETS = { fetch: async (req) => { const p = decodeURIComponent(new URL(req.url).pathname); const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || p.endsWith('/') || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return new Response('Not found', { status: 404 });
  return new Response(fs.readFileSync(f), { headers: { 'content-type': types[path.extname(f)] || 'application/octet-stream' } }); } };
export const SENT = [];
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, opts) => {
  if (String(url).startsWith('https://api.resend.com/')) { const body = JSON.parse(opts.body); SENT.push(body); console.log('[resend]', body.subject, '->', body.to); fs.appendFileSync('/tmp/resend-log.jsonl', JSON.stringify(body) + '\n'); return new Response(JSON.stringify({ id: 'test' }), { status: 200 }); }
  return realFetch(url, opts);
};
const env = { DB, ASSETS, ADMIN_USER: 'test', ADMIN_PASSWORD: 'test', RESEND_API_KEY: 're_test', FROM_EMAIL: 'Eyeglass Gallery <hello@eyeglassgallery.ca>', TO_EMAIL: 'info@eyeglassgallery.ca' };
const worker = (await import(pathToFileURL(path.join(ROOT, 'src/worker.js')).href)).default;
http.createServer(async (req, res) => {
  const chunks = []; for await (const c of req) chunks.push(c);
  const headers = new Headers(); for (const [k, v] of Object.entries(req.headers)) headers.set(k, Array.isArray(v) ? v.join(', ') : v);
  const request = new Request(`http://localhost:${PORT}${req.url}`, { method: req.method, headers, body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks), redirect: 'manual' });
  const waits = []; const r = await worker.fetch(request, env, { waitUntil: (p) => waits.push(p) });
  const h = {}; r.headers.forEach((v, k) => { h[k] = k === 'set-cookie' ? v.replace(/;\s*Secure/i, '') : v; });
  res.writeHead(r.status, h); res.end(Buffer.from(await r.arrayBuffer()));
  await Promise.allSettled(waits);
}).listen(PORT, () => console.log(`worker on http://localhost:${PORT}/ (admin: test / test)`));
