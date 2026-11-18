// Vercel serverless function: forwards a "Form Kebutuhan" submission to a Google Apps Script web app
// owned by Bigma. The script adds a row to Bigma's Google Sheet and emails businessbigma@gmail.com.
// Env: KEBUTUHAN_WEBHOOK_URL (the Apps Script web app URL) and KEBUTUHAN_TOKEN (shared secret).
// Nothing is stored here and nothing personal is logged. If it fails the page falls back to WhatsApp.
const WEBHOOK = process.env.KEBUTUHAN_WEBHOOK_URL || ''
const TOKEN = process.env.KEBUTUHAN_TOKEN || ''

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
  if (!WEBHOOK || !TOKEN) return res.status(503).json({ ok: false })

  const data = {
    token: TOKEN, nama, whatsapp: wa, usaha: cut(b.usaha, 160), bidang: cut(b.bidang, 120),
    masalah: list(b.masalah).join(', '), tujuan: list(b.tujuan).join(', '), ide: list(b.ide).join('; '),
    pengguna: cut(b.pengguna, 120), perangkat: cut(b.perangkat, 120), waktu: cut(b.waktu, 120),
    dana: cut(b.dana, 120), catatan: cut(b.catatan, 1000), saran: list(b.saran).join(', '), sumber: cut(b.sumber, 40),
  }
  try {
    const r = await fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data), redirect: 'follow' })
    const j = await r.json().catch(() => ({}))
    const ok = r.ok && j.ok === true
    return res.status(ok ? 200 : 502).json({ ok })
  } catch {
    return res.status(502).json({ ok: false })
  }
}
