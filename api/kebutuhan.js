// Vercel serverless function: emails a "Form Kebutuhan" submission to Bigma through Resend.
// Needs env RESEND_API_KEY. Optional: KEBUTUHAN_TO (default businessbigma@gmail.com), KEBUTUHAN_FROM.
// Nothing is stored and nothing personal is logged. If sending fails the page falls back to WhatsApp.
const TO = process.env.KEBUTUHAN_TO || 'businessbigma@gmail.com'
const FROM = process.env.KEBUTUHAN_FROM || 'Form Bigma <onboarding@resend.dev>'

// Best-effort rate limit per warm instance (the honeypot and length caps do the rest).
const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const list = (hits.get(ip) || []).filter((t) => now - t < 3600_000)
  list.push(now)
  hits.set(ip, list)
  if (hits.size > 500) hits.clear()
  return list.length > 5
}

const cut = (v, n) => String(v ?? '').replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, n)
const list = (v) => (Array.isArray(v) ? v.slice(0, 12).map((x) => cut(x, 160)) : [])
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false })
  const origin = req.headers.origin || ''
  if (origin && !/^https:\/\/(bigma\.id|www\.bigma\.id|[a-z0-9-]+\.vercel\.app)$/.test(origin)) return res.status(403).json({ ok: false })
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}

  if (cut(b.website, 50)) return res.status(200).json({ ok: true }) // honeypot: pretend success
  if (b.persetujuan !== true) return res.status(400).json({ ok: false })
  const nama = cut(b.nama, 120)
  const wa = cut(b.whatsapp, 25).replace(/[^0-9+]/g, '')
  if (!nama || wa.length < 8 || wa.length > 20) return res.status(400).json({ ok: false })
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'x'
  if (limited(ip)) return res.status(429).json({ ok: false })
  if (!process.env.RESEND_API_KEY) return res.status(503).json({ ok: false })

  const rows = [
    ['Nama', nama], ['WhatsApp', wa], ['Usaha', cut(b.usaha, 160)], ['Bidang', cut(b.bidang, 120)],
    ['Masalah', list(b.masalah).join(', ')], ['Tujuan', list(b.tujuan).join(', ')],
    ['Ide yang menarik', list(b.ide).join('; ')], ['Pengguna', cut(b.pengguna, 120)],
    ['Perangkat', cut(b.perangkat, 120)], ['Waktu', cut(b.waktu, 120)], ['Kisaran dana', cut(b.dana, 120)],
    ['Catatan', cut(b.catatan, 1000)], ['Saran awal', list(b.saran).join(', ')], ['Sumber', cut(b.sumber, 40)],
  ]
  const text = rows.map(([k, v]) => `${k}: ${v || '-'}`).join('\n')
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v || '-')}</td></tr>`)
    .join('')}</table>`

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [TO], subject: `Form Kebutuhan: ${nama} (${cut(b.bidang, 60) || 'baru'})`, text, html }),
    })
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok })
  } catch {
    return res.status(502).json({ ok: false })
  }
}
