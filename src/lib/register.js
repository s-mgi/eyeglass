import { sendAutoReply } from './autoreply.js';
import { SITE } from '../site.config.js';
import { logError } from './errors.js';

export const FORM_VERSION = '2026-10-21';

export const SUPPLY_OPTIONS = ['3 months', '6 months', '1 year'];
export const FORM_TYPES = { contact: 'Contact form', lens: 'Contact lens order' };

export async function handleRegister(request, env, ctx) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
    }

    if (data.company) return json({ ok: true });

    const clip = (v, n) => String(v || '').trim().slice(0, n);
    const formType = data.formType === 'lens' ? 'lens' : 'contact';
    let firstName = clip(data.firstName, 100);
    let lastName = clip(data.lastName, 100);
    if (!firstName && !lastName && data.fullName) {
      const parts = clip(data.fullName, 200).split(/\s+/);
      firstName = parts.shift() || '';
      lastName = parts.join(' ');
    }
    const email = clip(data.email, 254);
    const phone = clip(data.phone, 40);
    const message = clip(data.message, 4000);
    const supply = clip(data.supply, 40);
    const brand = clip(data.brand, 120);
    const address = clip(data.address, 200);
    const unit = clip(data.unit, 40);
    const city = clip(data.city, 100);
    const province = clip(data.province, 40);
    const postal = clip(data.postal, 20);
    const optIn = data.optIn === true || ['yes', 'on', 'true', '1'].includes(String(data.optIn || '').toLowerCase()) ? 'yes' : 'no';
    const sourcePath = clip(data.sourcePath, 255);
    const utmSource = clip(data.utmSource, 255);
    const utmMedium = clip(data.utmMedium, 255);
    const utmCampaign = clip(data.utmCampaign, 255);

    const required = formType === 'lens' ? { firstName, lastName, email, phone } : { firstName, email, message };
    const missing = Object.keys(required).filter((k) => !required[k]);
    const badOptions = [];
    if (supply && !SUPPLY_OPTIONS.includes(supply)) badOptions.push(`supply "${supply}" is not one of the dropdown options`);
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const sentVersion = clip(data.formVersion, 40);

    if (missing.length || badOptions.length) {
      return json({ ok: false, error: 'Please complete the highlighted fields.', missing, badOptions, formVersion: FORM_VERSION }, 400);
    }
    if (!emailOk) {
      return json({ ok: false, error: 'Please enter a valid email address.', missing: ['email'], formVersion: FORM_VERSION }, 400);
    }

    const issues = [];
    if (sentVersion !== FORM_VERSION) {
      issues.push(sentVersion
        ? `Site files are on form version ${sentVersion} but the Worker is on ${FORM_VERSION}. Re-upload the site files and the Worker together.`
        : `The site didn't send a form version (Worker is on ${FORM_VERSION}). The site JS may be out of date.`);
    }
    const status = issues.length ? 'needs_review' : 'new';
    const leadName = `${firstName} ${lastName}`.trim() || email;
    const bg = (p) => { if (ctx && ctx.waitUntil) ctx.waitUntil(p); return p; };
    if (issues.length) bg(logError(env, { area: 'form', level: 'warning', message: 'A form submission came in with a form version mismatch', detail: `${leadName}\n${issues.join('\n')}`, path: sourcePath }));
    const note = issues.length ? `Form check: ${issues.join(' | ')}` : null;

    if (env.DB) {
      try {
        await env.DB.prepare(
          `INSERT INTO inquiries (first_name, last_name, email, phone, form_type, message, supply, brand, address, unit, city, province, postal, opt_in, source_path, utm_source, utm_medium, utm_campaign, status, note)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(firstName, lastName, email.toLowerCase(), phone || null, formType, message || null, supply || null, brand || null,
          address || null, unit || null, city || null, province || null, postal || null, optIn,
          sourcePath || null, utmSource || null, utmMedium || null, utmCampaign || null, status, note).run();
      } catch (dbErr) {
        console.error('D1 insert failed (submission still emailed if Resend is configured):', dbErr);
        await logError(env, { area: 'form', message: 'A form submission could not be saved to the CMS', detail: `${leadName} <${email}>\n${dbErr && dbErr.message ? dbErr.message : dbErr}`, path: sourcePath });
      }
    } else {
      console.error('No DB binding: submission was not stored, only emailed (if configured).');
      await logError(env, { area: 'form', message: 'A form submission could not be saved: the Worker has no database connected', detail: `${leadName} <${email}>\nCheck the D1 binding "DB" in wrangler.toml.` });
    }

    bg(sendAutoReply(env, new URL(request.url).origin, { firstName, email }));

    const apiKey = env.RESEND_API_KEY;
    const fromEmail = env.FROM_EMAIL;
    const toEmail = env.TO_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      console.error('Resend is not configured: missing RESEND_API_KEY, FROM_EMAIL, or TO_EMAIL.');
      await logError(env, { area: 'email', message: 'New-submission emails are not being sent: Resend is not set up', detail: 'Add RESEND_API_KEY, FROM_EMAIL and TO_EMAIL in Cloudflare > Workers & Pages > this Worker > Settings > Variables and secrets.' });
      return json({ ok: true, warning: 'stored_without_email', formVersion: FORM_VERSION, issues });
    }

    const dash = '-';
    const val = (v) => (v ? escapeHtml(v) : dash);
    const lensRows = formType === 'lens' ? [
      row('Supply', val(supply)),
      row('Brand', val(brand)),
      row('Address', [address, unit].filter(Boolean).map(escapeHtml).join(', ') || dash),
      row('City', val(city)),
      row('Province', val(province)),
      row('Postal code', val(postal)),
    ] : [];
    const label = FORM_TYPES[formType];
    const html = [
      issues.length ? `<p style="font-family:sans-serif;font-size:14px;background:#fdecea;color:#8a1c12;padding:10px 12px;border-radius:4px;margin:0 0 14px;"><strong>Check this one.</strong><br>${issues.map(escapeHtml).join('<br>')}</p>` : '',
      `<h2 style="margin:0 0 12px;font-family:sans-serif;">New ${label.toLowerCase()} &middot; ${escapeHtml(SITE.name)}</h2>`,
      '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">',
      row('Form', escapeHtml(label)),
      row('Name', `${escapeHtml(firstName)} ${escapeHtml(lastName)}`),
      row('Email', escapeHtml(email)),
      row('Phone', val(phone)),
      ...lensRows,
      row('Message', message ? escapeHtml(message).replace(/\n/g, '<br>') : dash),
      row('News and offers', optIn === 'yes' ? 'Yes' : 'No'),
      row('Source', val(sourcePath)),
      row('UTM', [utmSource, utmMedium, utmCampaign].filter(Boolean).map(escapeHtml).join(' / ') || dash),
      '</table>',
    ].join('');

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: email,
        subject: `${issues.length ? '[Check] ' : ''}${label}: ${firstName} ${lastName}`.trim(),
        html,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      console.error('Resend API error:', resendRes.status, detail);
      await logError(env, { area: 'email', message: 'A new-submission email was rejected by Resend', detail: `From: ${leadName} <${email}> (saved in the CMS)\nResend said (${resendRes.status}): ${detail}` });
      return json({ ok: true, warning: 'stored_without_email', formVersion: FORM_VERSION, issues });
    }

    return json({ ok: true, formVersion: FORM_VERSION, issues });
  } catch (err) {
    console.error('register.js error:', err);
    await logError(env, { area: 'form', message: 'The form handler crashed', detail: err });
    return json({ ok: false, error: 'Unexpected error. Please try again.' }, 500);
  }
}

function row(label, value) {
  return `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top;">${label}</td><td style="padding:4px 0;"><b>${value}</b></td></tr>`;
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
