import { useState } from 'react'
import { site, services, steps, projects } from './content.js'

const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  'Halo Bigma, saya ingin berdiskusi tentang proyek.',
)}`

const icons = {
  'Website Bisnis': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></svg>
  ),
  'Aplikasi Web': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></svg>
  ),
  'Sistem Internal': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Z" /><path d="M4 7v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5" /></svg>
  ),
}

function Wordmark() {
  return (
    <>
      <span className="hl">b</span>
      <span className="dim">i</span>
      <span className="hl">g</span>
      <span className="hl">m</span>
      <span className="dim">a</span>
    </>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const hero = projects.filter((p) => p.image.startsWith('/previews/'))

  return (
    <>
      <a className="skip" href="#portofolio">Lewati ke konten</a>
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="logo" aria-label="Bigma" onClick={close}>
            <Wordmark />
          </a>
          <button
            className="menu-btn"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(!open)}
          >
            {open ? 'Tutup' : 'Menu'}
          </button>
          <nav id="menu" className={open ? 'open' : ''}>
            <a href="#portofolio" className="nav-work" onClick={close}>Contoh Karya</a>
            <a href="#layanan" onClick={close}>Layanan</a>
            <a href="#proses" onClick={close}>Proses</a>
            <a href="#tentang" onClick={close}>Tentang</a>
            <a href="#kontak" className="btn btn-small" onClick={close}>Kontak</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Pengembangan software</p>
              <h1>{site.tagline}</h1>
              <p className="lead">{site.intro}</p>
              <div className="actions">
                <a className="btn" href={waLink} target="_blank" rel="noreferrer">Chat WhatsApp</a>
                <a className="btn btn-ghost" href="#portofolio">Lihat Contoh Karya</a>
              </div>
            </div>
            <div className="hero-art" aria-hidden="true">
              {hero.slice(0, 3).map((p, i) => (
                <div className={`frame f${i + 1}`} key={p.title}>
                  <div className="bar"><i /><i /><i /></div>
                  <img src={p.image} alt="" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="portofolio" className="section">
          <div className="container">
            <div className="head">
              <p className="eyebrow dark">Contoh Karya</p>
              <h2>Website dan aplikasi yang sudah kami buat</h2>
              <p className="sub">Klik kartu untuk membuka websitenya.</p>
            </div>
            <div className="work-grid">
              {projects.map((p) => (
                <a className="work" key={p.url} href={p.url} target="_blank" rel="noreferrer">
                  <div className="thumb">
                    <div className="bar"><i /><i /><i /></div>
                    <img
                      src={p.image}
                      alt={`Tampilan ${p.title}`}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  </div>
                  <div className="work-body">
                    <span className="kind">{p.kind}</span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <span className="visit">Buka website <span aria-hidden="true">→</span></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="layanan" className="section alt">
          <div className="container">
            <div className="head">
              <p className="eyebrow dark">Layanan</p>
              <h2>Apa yang bisa kami buat</h2>
            </div>
            <div className="svc-grid">
              {services.map((s) => (
                <div className="svc" key={s.title}>
                  <span className="icon">{icons[s.title]}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proses" className="section">
          <div className="container">
            <div className="head">
              <p className="eyebrow dark">Proses</p>
              <h2>Dari ide sampai siap dipakai</h2>
            </div>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="num">{i + 1}</span>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="tentang" className="section alt">
          <div className="container about">
            <div>
              <p className="eyebrow dark">Tentang Bigma</p>
              <h2>Hasil yang jelas dan bisa dipakai</h2>
            </div>
            <p className="about-text">
              Bigma adalah perusahaan software dari {site.city}. Kami fokus pada hasil yang jelas
              dan bisa dipakai, bukan sekadar tampilan.
            </p>
          </div>
        </section>

        <section id="kontak" className="cta">
          <div className="container cta-inner">
            <div>
              <h2>Punya proyek? Ceritakan kebutuhan Anda.</h2>
              <p>Kami balas secepatnya.</p>
            </div>
            <div className="cta-side">
              <div className="actions">
                <a className="btn btn-light" href={waLink} target="_blank" rel="noreferrer">Chat WhatsApp</a>
                <a className="btn btn-ghost" href={`mailto:${site.email}`}>Kirim Email</a>
              </div>
              <ul className="contact">
                <li>Email: <a href={`mailto:${site.email}`}>{site.email}</a></li>
                <li>WhatsApp: <a href={waLink} target="_blank" rel="noreferrer">{site.whatsappLabel}</a></li>
                <li>Lokasi: {site.city}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container foot">
          <span className="logo small" aria-label="Bigma"><Wordmark /></span>
          <span>© {new Date().getFullYear()} Bigma. bigma.id</span>
        </div>
      </footer>
    </>
  )
}
