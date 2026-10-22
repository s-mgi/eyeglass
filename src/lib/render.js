import { injectTags } from './tags.js';

export const IMG_DIR = 'assets/';
export function imgSrc(v) { v = String(v || ''); return /^(\/|https?:)/i.test(v) ? v : IMG_DIR + v; }

export const PAGES = [
  { id: 'home', file: 'index.html', path: '/', title: 'Home' },
  { id: 'brands', file: 'brands.html', path: '/brands.html', title: 'Eyewear Brands' },
  { id: 'contactlenses', file: 'contact-lenses.html', path: '/contact-lenses.html', title: 'Contact Lenses' },
  { id: 'lenses', file: 'shamir-lenses.html', path: '/shamir-lenses.html', title: 'Lenses' },
  { id: 'eyecare', file: 'eyecare.html', path: '/eyecare.html', title: 'Eye Exams' },
  { id: 'specialty', file: 'specialty-eyecare.html', path: '/specialty-eyecare.html', title: 'Specialty Eyecare' },
  { id: 'technology', file: 'our-technology.html', path: '/our-technology.html', title: 'Our Technology' },
  { id: 'billing', file: 'direct-billing.html', path: '/direct-billing.html', title: 'Direct Billing' },
  { id: 'doctor', file: 'optometrist.html', path: '/optometrist.html', title: 'Doctor' },
  { id: 'about', file: 'about.html', path: '/about.html', title: 'About' },
  { id: 'contact', file: 'contact.html', path: '/contact.html', title: 'Contact' },
  { id: 'privacy', file: 'privacy-policy.html', path: '/privacy-policy.html', title: 'Privacy Policy' },
  { id: 'terms', file: 'terms-conditions.html', path: '/terms-conditions.html', title: 'Terms & Conditions' },
];
export const NOT_FOUND_FILE = '404.html';
export const REDIRECTS = {
  '/index.html': '/', '/index': '/',
  '/services.html': '/eyecare.html', '/services': '/eyecare.html',
  '/order-contacts.html': '/contact-lenses.html#order', '/order-contacts': '/contact-lenses.html#order',
  '/direct-billing-info.html': '/direct-billing.html', '/direct-billing-info': '/direct-billing.html',
};
export const SITEMAP_PATHS = PAGES.map((p) => p.path);

export const SITE_PLAIN = {
  canonical_url: 'https://eyeglassgallery.ca/',
  og_image: 'assets/storefront.jpg',
  favicon_href: 'favicon.ico',
};
export const isDraftKey = (k) => /\.hdr_/.test(k) || /^seo_(title|description)(__|$)/.test(k);

export const DEFAULT_LISTS = {
  'home.hero_slides': [
    { file: 'hero-1.jpg', alt: 'Model wearing premium eyewear' },
    { file: 'hero-2.jpg', alt: 'Model wearing designer eyewear' },
    { file: 'hero-3.jpg', alt: 'Model wearing optical frames' },
  ],
  'home.care_list': ['Comprehensive Eye Exams', 'Digital Retinal Imaging', 'Glaucoma Screening', 'Cataract Monitoring', "Children's Eye Exams", 'Contact Lens Fittings', 'Diabetic Eye Care'],
  'brands.logos': [
    { file: 'brand-1.png', name: 'Dior' }, { file: 'brand-2.png', name: 'Marc Jacobs' }, { file: 'brand-3.png', name: 'Gucci' },
    { file: 'brand-4.png', name: 'Kate Spade' }, { file: 'brand-5.png', name: 'David Beckham' }, { file: 'brand-6.png', name: 'Carolina Herrera' },
    { file: 'brand-7.png', name: 'Etnia Barcelona' }, { file: 'brand-8.png', name: 'Matttew' },
    { file: 'brand-logos/tom-ford.svg', name: 'Tom Ford' }, { file: 'brand-logos/ray-ban.svg', name: 'Ray-Ban' }, { file: 'brand-logos/persol.svg', name: 'Persol' },
    { file: 'brand-logos/oliver-peoples.svg', name: 'Oliver Peoples' }, { file: 'brand-logos/prada.svg', name: 'Prada' }, { file: 'brand-logos/versace.svg', name: 'Versace' },
    { file: 'brand-logos/oakley.svg', name: 'Oakley' }, { file: 'brand-logos/maui-jim.svg', name: 'Maui Jim' }, { file: 'brand-logos/tiffany.svg', name: 'Tiffany & Co.' },
    { file: 'brand-logos/michael-kors.svg', name: 'Michael Kors' }, { file: 'brand-logos/burberry.svg', name: 'Burberry' },
  ],
  'brands.names': ['Lindberg'],
  'brands.showcase': [
    { brand: 'Ray-Ban', file: 'brands/rayban-1.jpg', alt: 'Ray-Ban tortoiseshell and silver browline optical frames' }, { brand: 'Ray-Ban', file: 'brands/rayban-2.jpg', alt: 'Ray-Ban grey to blue gradient round optical frames' }, { brand: 'Ray-Ban', file: 'brands/rayban-3.jpg', alt: 'Ray-Ban gold rectangular metal sunglasses with grey lenses' }, { brand: 'Ray-Ban', file: 'brands/rayban-4.jpg', alt: 'Ray-Ban black double-bridge aviator sunglasses with green lenses' }, { brand: 'Ray-Ban', file: 'brands/rayban-5.jpg', alt: 'Ray-Ban tortoiseshell pilot-style optical frames' },
    { brand: 'Prada', file: 'brands/prada-1.jpg', alt: 'Prada tortoiseshell geometric optical frames' }, { brand: 'Prada', file: 'brands/prada-2.jpg', alt: 'Prada tortoiseshell oval sunglasses with brown lenses' }, { brand: 'Prada', file: 'brands/prada-3.jpg', alt: 'Prada black square sunglasses with grey lenses' },
    { brand: 'Tiffany & Co.', file: 'brands/tiffany-1.jpg', alt: 'Tiffany & Co. black square sunglasses with Tiffany blue accents' }, { brand: 'Tiffany & Co.', file: 'brands/tiffany-2.jpg', alt: 'Tiffany & Co. black square sunglasses with rose gold link detail' }, { brand: 'Tiffany & Co.', file: 'brands/tiffany-3.jpg', alt: 'Tiffany & Co. translucent grey optical frames' }, { brand: 'Tiffany & Co.', file: 'brands/tiffany-4.jpg', alt: 'Tiffany & Co. tortoiseshell and Tiffany blue optical frames' },
    { brand: 'Burberry', file: 'brands/burberry-1.jpg', alt: 'Burberry check pattern cat-eye sunglasses with amber lenses' }, { brand: 'Burberry', file: 'brands/burberry-2.jpg', alt: 'Burberry black oversized sunglasses with gold monogram temples' }, { brand: 'Burberry', file: 'brands/burberry-3.jpg', alt: 'Burberry check pattern optical frames' }, { brand: 'Burberry', file: 'brands/burberry-4.jpg', alt: 'Burberry burgundy square optical frames' },
    { brand: 'Swarovski', file: 'brands/swarovski-1.jpg', alt: 'Swarovski black square sunglasses with crystal trim' }, { brand: 'Swarovski', file: 'brands/swarovski-2.jpg', alt: 'Swarovski gold metal sunglasses with crystal temples' }, { brand: 'Swarovski', file: 'brands/swarovski-3.jpg', alt: 'Swarovski black cat-eye optical frames with crystal accents' }, { brand: 'Swarovski', file: 'brands/swarovski-4.jpg', alt: 'Swarovski burgundy and gold cat-eye optical frames' },
    { brand: 'Coach', file: 'brands/coach-1.jpg', alt: 'Coach black square sunglasses with brown gradient lenses' }, { brand: 'Coach', file: 'brands/coach-2.jpg', alt: 'Coach rose gold metal sunglasses with pink gradient lenses' }, { brand: 'Coach', file: 'brands/coach-3.jpg', alt: 'Coach purple and blue tortoiseshell optical frames' }, { brand: 'Coach', file: 'brands/coach-4.jpg', alt: 'Coach black and blush cat-eye optical frames' },
    { brand: 'Oakley', file: 'brands/oakley-1.jpg', alt: 'Oakley black sport sunglasses with blue mirror lenses' }, { brand: 'Oakley', file: 'brands/oakley-2.jpg', alt: 'Oakley half-rim sport sunglasses with green mirror lenses' }, { brand: 'Oakley', file: 'brands/oakley-3.jpg', alt: 'Oakley grey and red rectangular optical frames' }, { brand: 'Oakley', file: 'brands/oakley-4.jpg', alt: 'Oakley clear rectangular optical frames' },
  ],
  'about.team': [
    { file: 'head-parviz.jpg', name: 'Parviz', role: 'Founder & Partner' },
    { file: 'head-matt.jpg', name: 'Dr. Matt Chavoustie', role: 'Full-time Onsite Optometrist' },
    { file: 'head-mary.jpg', name: 'Mary', role: 'Licensed Optician' },
    { file: 'head-michael.jpg', name: 'Michael', role: 'Store Manager & Frame Stylist' },
    { file: 'head-jessica.jpg', name: 'Jessica', role: 'Frame Stylist' },
    { file: 'head-veronica.jpg', name: 'Veronica', role: 'Frame Stylist' },
  ],
};
export const LIST_SHAPES = {
  'home.hero_slides': { page: 'home', label: 'Hero slideshow', draft: true, item: [['file', 'image'], ['alt', 'Image description']] },
  'home.care_list': { page: 'home', label: '"We care for your eyes" list', item: 'text' },
  'brands.logos': { page: 'brands', label: 'Brand logos (Brands page and the homepage strip)', item: [['file', 'image'], ['name', 'Brand name']] },
  'brands.names': { page: 'brands', label: 'Brands without a logo', item: 'text' },
  'brands.showcase': { page: 'brands', label: 'Frames by brand (pop-up gallery)', hint: 'Photos are grouped by brand name. The first photo of each brand is its cover. To add a brand, add a photo and type the new brand name.', copy: ['brand'], item: [['brand', 'Brand name'], ['file', 'image'], ['alt', 'Image description']] },
  'about.team': { page: 'about', label: 'Team members', item: [['file', 'image'], ['name', 'Name'], ['role', 'Role']] },
};
const delay = (i) => (i % 4 ? ` d${i % 4}` : '');
const CHECK = '<svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6"/></svg>';
function brandGroups(l) {
  const g = new Map();
  for (const p of l) {
    const name = String(p.brand || '').trim(); const k = name.toLowerCase();
    if (!name || !p.file) continue;
    if (!g.has(k)) g.set(k, { name, photos: [] });
    g.get(k).photos.push(p);
  }
  return [...g.values()];
}
export const LIST_RENDER = {
  'home.hero_slides': ['home.hero_slides', (l) => l.map((s, i) => `\n    <img class="slide${i ? '' : ' on'}" src="${esc(imgSrc(s.file))}" alt="${esc(s.alt || '')}">`).join('')],
  'home.hero_dots': ['home.hero_slides', (l) => l.map((_, i) => (i ? '<i></i>' : '<i class="on"></i>')).join('')],
  'home.care_list': ['home.care_list', (l) => l.map((t) => `\n      <li>${CHECK}${esc(t)}</li>`).join('')],
  'brands.marquee': ['brands.logos', (l) => l.map((b) => `\n      <a href="brands.html"><img src="${esc(imgSrc(b.file))}" alt="${esc(b.name || '')}"></a>`).join('') +
    l.map((b) => `\n      <a href="brands.html" aria-hidden="true"><img src="${esc(imgSrc(b.file))}" alt=""></a>`).join('')],
  'brands.logos': ['brands.logos', (l) => l.map((b, i) => `\n      <div class="brand-tile${delay(i)}" data-reveal><img loading="lazy" decoding="async" src="${esc(imgSrc(b.file))}" alt="${esc(b.name || '')}"></div>`).join('')],
  'brands.names': ['brands.names', (l, f) => { const off = listOf(f, 'brands.logos').length; return l.map((t, i) => `\n      <div class="brand-tile txt${delay(i + off)}" data-reveal>${esc(t)}</div>`).join(''); }],
  'brands.showcase': ['brands.showcase', (l) => brandGroups(l).map((b, i) => `\n      <div class="sc-card${delay(i)}" data-reveal data-brand="${esc(b.name)}"><button type="button" class="sc-open" aria-haspopup="dialog"><span class="sc-ph"><img loading="lazy" decoding="async" src="${esc(imgSrc(b.photos[0].file))}" alt="${esc(b.photos[0].alt || '')}"></span><span class="sc-meta"><span class="sc-name">${esc(b.name)}</span><span class="sc-count">${b.photos.length} ${b.photos.length === 1 ? 'photo' : 'photos'}</span></span></button><ul class="sc-photos" hidden>${b.photos.map((p) => `<li data-src="${esc(imgSrc(p.file))}" data-alt="${esc(p.alt || '')}"></li>`).join('')}</ul></div>`).join('')],
  'about.team': ['about.team', (l) => l.map((m, i) => `\n      <div class="member${delay(i)}" data-reveal><div class="ph"><img${i ? ' loading="lazy" decoding="async"' : ''} src="${esc(imgSrc(m.file))}" alt="${esc(m.name || '')}"></div><h4>${esc(m.name || '')}</h4><span>${esc(m.role || '')}</span></div>`).join('')],
};
export function listOf(fields, key) {
  const v = safeParse(fields[key], null);
  return Array.isArray(v) && v.length ? v : DEFAULT_LISTS[key];
}

const OPENING_HOURS = [
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '19:00' },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '17:00' },
];
function jsonLd(v, origin) {
  const city = String(v['site.address2'] || '').match(/^\s*([^,]+),\s*([A-Z]{2})\s*([A-Z]\d[A-Z]\s?\d[A-Z]\d)?/i) || [];
  const data = {
    '@context': 'https://schema.org', '@type': 'Optician', name: 'Eyeglass Gallery',
    url: origin + '/', image: absolutize(origin, v.og_image || SITE_PLAIN.og_image), logo: origin + '/assets/logo.png',
    telephone: v['site.phone'], email: v['site.email'],
    address: { '@type': 'PostalAddress', streetAddress: v['site.address1'], addressLocality: city[1] || 'Burlington', addressRegion: city[2] || 'ON', postalCode: city[3] || '', addressCountry: 'CA' },
    openingHoursSpecification: OPENING_HOURS,
    sameAs: [v['site.instagram_url'], v['site.facebook_url']].filter(Boolean),
  };
  return '<script type="application/ld+json">' + JSON.stringify(data).replace(/</g, '\\u003c') + '</script>';
}

const TEXT_RE = /<([a-z0-9]+)\b([^>]*?)\sdata-cms="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g;
const ATTR_RE = /<([a-z0-9]+)\b[^>]*\sdata-cms-(img|href|tel|mailto|content)="([^"]+)"[^>]*>/g;
const getAttr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`)); return m ? unesc(m[1]) : null; };
function setAttr(tag, name, value) {
  const re = new RegExp(`(\\s${name}=)"[^"]*"`);
  return re.test(tag) ? tag.replace(re, (_, a) => `${a}"${esc(value)}"`) : tag.replace(/^<([a-z0-9]+)/, `<$1 ${name}="${esc(value)}"`);
}
export function kindOf(tag, inner) { return tag === 'p' || /<(em|strong|b|i|a)\b/i.test(inner) ? 'lite' : 'lines'; }

export function htmlToText(inner, kind) {
  let s = String(inner).replace(/\s+/g, ' ').replace(/\s*<br\s*\/?>\s*/gi, '\n');
  if (kind === 'lite') {
    s = s.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
      .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*')
      .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
  }
  return unesc(s.replace(/<[^>]+>/g, '')).split('\n').map((l) => l.trim()).join('\n').trim();
}

export function extractFields(html) {
  const out = {};
  for (const m of html.matchAll(TEXT_RE)) {
    const [, tag, , key, , inner] = m;
    const kind = kindOf(tag, inner);
    if (!(key in out)) out[key] = { value: htmlToText(inner, kind), kind, tag };
  }
  for (const m of html.matchAll(ATTR_RE)) {
    const [whole, , type, key] = m;
    if (type === 'img') {
      if (!(key in out)) out[key] = { value: String(getAttr(whole, 'src') || '').replace(IMG_DIR, ''), kind: 'image' };
      if (!(key + '_alt' in out)) out[key + '_alt'] = { value: getAttr(whole, 'alt') || '', kind: 'alt' };
    } else if (type === 'href') {
      if (!(key in out)) out[key] = { value: getAttr(whole, 'href') || '', kind: key === 'favicon_href' ? 'image' : 'url' };
    } else if (type === 'content') {
      if (!(key in out)) out[key] = { value: getAttr(whole, 'content') || '', kind: 'lines' };
    }
  }
  return out;
}

async function loadFields(env) {
  const fields = {};
  try {
    const { results } = await env.DB.prepare('SELECT key, value FROM content_fields').all();
    for (const row of results) fields[row.key] = row.value;
  } catch (err) {
    console.error('CMS content_fields read failed:', err);
  }
  return fields;
}
const filled = (v) => v !== undefined && v !== null && String(v).trim() !== '';
function absolutize(origin, path) { return /^https?:\/\//i.test(path) ? path : `${origin}/${String(path).replace(/^\//, '')}`; }
export const telHref = (phone) => { const d = String(phone).replace(/\D/g, ''); return 'tel:+' + (d.length === 10 ? '1' + d : d); };
export function textToHtml(value, kind) {
  return kind === 'lite' ? liteToHtml(value) : esc(String(value).trim()).replace(/\s*\r?\n\s*/g, '<br>');
}

export function fillPage(html, fields) {
  const defaults = extractFields(html);
  const val = (k) => (filled(fields[k]) ? String(fields[k]) : (defaults[k] ? defaults[k].value : SITE_PLAIN[k] ?? ''));
  const origin = val('canonical_url').trim().replace(/\/+$/, '');

  html = html.replace(TEXT_RE, (whole, tag, a1, key, a2, inner) => {
    if (!filled(fields[key])) return whole;
    return `<${tag}${a1} data-cms="${key}"${a2}>${textToHtml(fields[key], kindOf(tag, inner))}</${tag}>`;
  });
  html = html.replace(ATTR_RE, (tag, name, type, key) => {
    if (type === 'img') {
      if (filled(fields[key])) tag = setAttr(tag, 'src', imgSrc(fields[key])).replace(/\s(width|height)="\d+"/g, '');
      if (fields[key + '_alt'] !== undefined && fields[key + '_alt'] !== null) tag = setAttr(tag, 'alt', fields[key + '_alt']);
      return tag;
    }
    if (!filled(fields[key])) return tag;
    if (type === 'href') return setAttr(tag, 'href', String(fields[key]).trim());
    if (type === 'tel') return setAttr(tag, 'href', telHref(fields[key]));
    if (type === 'mailto') return setAttr(tag, 'href', 'mailto:' + String(fields[key]).trim());
    if (type === 'content') return setAttr(tag, 'content', String(fields[key]).replace(/\s+/g, ' ').trim());
    return tag;
  });
  html = html.replace(/<(link|meta)\b[^>]*\sdata-cms-abs="([^"]*)"[^>]*>/g, (tag, t, path) => setAttr(tag, t === 'link' ? 'href' : 'content', origin + path));
  html = html.replace(/<meta\b[^>]*\sdata-cms-ogimg[^>]*>/g, (tag) => setAttr(tag, 'content', absolutize(origin, val('og_image'))));
  html = html.replace(/<!--cms-list:([a-z0-9_.]+)-->[\s\S]*?<!--\/cms-list:\1-->/g, (whole, name) => {
    const r = LIST_RENDER[name];
    if (!r || !filled(fields[r[0]])) return whole;
    return `<!--cms-list:${name}-->${r[1](listOf(fields, r[0]), fields)}\n<!--/cms-list:${name}-->`;
  });
  html = html.replace(/<!--cms-jsonld-->[\s\S]*?<!--\/cms-jsonld-->/, () => {
    const v = {};
    for (const k of ['site.phone', 'site.email', 'site.address1', 'site.address2', 'site.instagram_url', 'site.facebook_url', 'og_image']) v[k] = val(k);
    return `<!--cms-jsonld-->${jsonLd(v, origin)}<!--/cms-jsonld-->`;
  });
  return html;
}

async function assetHtml(request, env, file) {
  const res = await env.ASSETS.fetch(new Request(new URL('/' + file, request.url)));
  const type = res.headers.get('content-type') || '';
  return res.ok && type.includes('text/html') ? res.text() : null;
}

export async function renderPage(request, env, page, status = 200) {
  const html = await assetHtml(request, env, page.file);
  if (html === null) return new Response('Not found', { status: 404 });
  const scope = page.id === 'home' ? 'home' : page.id === 'privacy' ? 'privacy' : 'page';
  const out = await injectTags(fillPage(html, await loadFields(env)), request, env, scope);
  return new Response(out, { status, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
}
export async function renderNotFound(request, env) {
  return renderPage(request, env, { id: '404', file: NOT_FOUND_FILE }, 404);
}
export async function renderHome(request, env) { return renderPage(request, env, PAGES[0]); }
export function pageForPath(path) {
  if (path === '/') return PAGES[0];
  return PAGES.find((p) => p.path === path || p.path === path + '.html') || null;
}

export async function pageDefaults(request, env) {
  const pages = [];
  for (const p of PAGES) {
    const html = await assetHtml(request, env, p.file);
    const fields = html ? extractFields(html) : {};
    pages.push({ ...p, fields: Object.entries(fields).map(([key, f]) => ({ key, ...f, draft: isDraftKey(key) })) });
  }
  const lists = Object.entries(LIST_SHAPES).map(([key, s]) => ({ key, ...s, value: DEFAULT_LISTS[key] }));
  return { ok: true, pages, lists, site: SITE_PLAIN, imgDir: IMG_DIR };
}

export function liteToHtml(text) {
  return esc(String(text ?? '').replace(/\r\n/g, '\n').trim())
    .replace(/\[([^\]\n]+)\]\(([^)\s]+)\)/g, (m, label, url) => {
      if (!/^(https?:|mailto:|tel:|\/|#|[a-z0-9_-]+\.html)/i.test(url)) return label;
      const outside = /^https?:/i.test(url) ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${url}"${outside}>${label}</a>`;
    })
    .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

export async function siteUrlOf(env) {
  try {
    const row = await env.DB.prepare('SELECT value FROM content_fields WHERE key = ?').bind('canonical_url').first();
    if (row && row.value && row.value.trim()) return row.value.trim().replace(/\/+$/, '');
  } catch (err) { console.error('canonical_url read failed:', err); }
  return SITE_PLAIN.canonical_url.replace(/\/+$/, '');
}
export function robotsTxt(siteUrl) {
  return ['User-agent: *', 'Allow: /', 'Disallow: /admin', 'Disallow: /admin.html', 'Disallow: /login.html', 'Disallow: /api/', 'Disallow: /register', '', `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n');
}
export function sitemapXml(siteUrl) {
  const urls = SITEMAP_PATHS.map((p) => `  <url><loc>${esc(siteUrl + p)}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}
export async function renderRobots(env) {
  return new Response(robotsTxt(await siteUrlOf(env)), { headers: { 'Content-Type': 'text/plain; charset=UTF-8', 'Cache-Control': 'public, max-age=3600' } });
}
export async function renderSitemap(env) {
  return new Response(sitemapXml(await siteUrlOf(env)), { headers: { 'Content-Type': 'application/xml; charset=UTF-8', 'Cache-Control': 'public, max-age=3600' } });
}

function safeParse(str, fallback) {
  if (!str) return fallback;
  try { return JSON.parse(str); } catch { return fallback; }
}
function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', mdash: '-', ndash: '–', hellip: '…', middot: '·', copy: '©', rarr: '→' };
function unesc(s) {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENT[e.toLowerCase()] ?? m;
  });
}
