import { site, services, steps } from './content.js'

const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  'Halo Bigma, saya ingin berdiskusi tentang proyek.',
)}`

export default function App() {
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="logo">
            big<span>ma</span>
          </a>
          <nav>
            <a href="#layanan">Layanan</a>
            <a href="#tentang">Tentang</a>
            <a href="#kontak" className="btn btn-small">Kontak</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container">
            <h1>{site.tagline}</h1>
            <p className="lead">{site.intro}</p>
            <div className="actions">
              <a className="btn" href={waLink} target="_blank" rel="noreferrer">
                Chat WhatsApp
              </a>
              <a className="btn btn-ghost" href={`mailto:${site.email}`}>
                Kirim Email
              </a>
            </div>
          </div>
        </section>

        <section id="layanan" className="section">
          <div className="container">
            <h2>Layanan</h2>
            <div className="grid">
              {services.map((s) => (
                <div className="card" key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="tentang" className="section alt">
          <div className="container">
            <h2>Tentang Bigma</h2>
            <p className="lead dark">
              Bigma adalah perusahaan software dari {site.city}. Kami fokus pada hasil yang jelas
              dan bisa dipakai, bukan sekadar tampilan.
            </p>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="num">{i + 1}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="kontak" className="section">
          <div className="container">
            <h2>Hubungi Kami</h2>
            <p className="lead dark">Ceritakan kebutuhan Anda. Kami balas secepatnya.</p>
            <ul className="contact">
              <li>
                Email: <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                WhatsApp:{' '}
                <a href={waLink} target="_blank" rel="noreferrer">
                  {site.whatsappLabel}
                </a>
              </li>
              <li>Lokasi: {site.city}</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} Bigma. bigma.id</div>
      </footer>
    </>
  )
}
