import { useEffect, useState } from 'react'
import { site, services, steps, projects } from './content.js'
import { currentSource, waHref, whatsappClick } from './analytics.js'
import { ui } from './i18n.js'
import { currentLang, saveLang } from './lang.js'


const icons = {
  web: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></svg>
  ),
  webapp: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></svg>
  ),
  other: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></svg>
  ),
  internal: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Z" /><path d="M4 7v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5" /></svg>
  ),
}

function Logo({ small }) {
  // Official reverse logo from the Bigma brand kit (symbol + name, on navy). Do not retype or recolour.
  return <img src="/brand/logo-reverse.svg" alt="Bigma" width="635" height="210" style={{ aspectRatio: '635 / 210' }} className={small ? 'sm' : ''} />
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('id') // always 'id' on first render so it matches the pre-rendered HTML
  const close = () => setOpen(false)
  const t = ui[lang]

  useEffect(() => {
    setLang(currentLang())
  }, [])
  const pick = (l) => {
    setLang(l)
    saveLang(l)
  }

  // Pre-rendered HTML carries the default text. After load, give every WhatsApp link the text for
  // the visitor's channel (?src=google etc.), so it also works for middle-click and copy link.
  useEffect(() => {
    const href = waHref(currentSource(), lang)
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach((a) => {
      a.href = href
    })
  }, [lang])
  const hero = projects.filter((p) => p.image.startsWith('/previews/'))

  return (
    <>
      <a className="skip" href="#portofolio">{t.skip}</a>
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="logo" aria-label="Bigma" onClick={close}>
            <Logo />
          </a>
          <nav id="menu" className={open ? 'open' : ''}>
            <a href="#layanan" onClick={close}>{t.nav.services}</a>
            <a href="#portofolio" className="nav-work" onClick={close}>{t.nav.work}</a>
            <a href="#proses" onClick={close}>{t.nav.process}</a>
            <a href="#tentang" onClick={close}>{t.nav.about}</a>
            <a href="#kebutuhan" onClick={close}>{t.nav.needs}</a>
            <a href="#kontak" className="btn btn-small" onClick={close}>{t.nav.contact}</a>
          </nav>
          <div className="nav-tools">
            <div className="lang" role="group" aria-label={`${ui.id.langLabel} / ${ui.en.langLabel}`}>
              <button type="button" lang="id" aria-pressed={lang === 'id'} onClick={() => pick('id')}>ID</button>
              <button type="button" lang="en" aria-pressed={lang === 'en'} onClick={() => pick('en')}>EN</button>
            </div>
            <button
              className="menu-btn"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen(!open)}
            >
              {open ? t.close : t.menu}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>{t.hero.title}</h1>
              <p className="lead">{t.hero.intro}</p>
              <div className="actions">
                <a className="btn" href={waHref('website', lang)} onClick={whatsappClick('hero')} target="_blank" rel="noreferrer">{t.hero.whatsapp}</a>
                <a className="btn btn-ghost" href="#kebutuhan">{t.hero.needs}</a>
                <a className="btn btn-ghost" href="#portofolio">{t.hero.work}</a>
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

        <section id="layanan" className="section">
          <div className="container">
            <div className="head">
              <p className="eyebrow dark">{t.services.eyebrow}</p>
              <h2>{t.services.title}</h2>
              <p className="sub">{t.services.sub}</p>
            </div>
            <div className="svc-grid">
              {services.map((s) => (
                <div className="svc" key={s.key}>
                  <span className="icon">{icons[s.key]}</span>
                  <h3>{s[lang].title}</h3>
                  <p>{s[lang].text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="portofolio" className="section alt">
          <div className="container">
            <div className="head">
              <p className="eyebrow dark">{t.work.eyebrow}</p>
              <h2>{t.work.title}</h2>
              <p className="sub">{t.work.sub}</p>
            </div>
            <div className="work-grid">
              {projects.map((p) => (
                <a className="work" key={p.url} href={p.url} target="_blank" rel="noreferrer">
                  <div className="thumb">
                    <div className="bar"><i /><i /><i /></div>
                    <img
                      src={p.image}
                      alt={`${t.work.alt} ${p.title}`}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  </div>
                  <div className="work-body">
                    <span className="kind">{p[lang].kind}</span>
                    <h3>{p.title}</h3>
                    <p>{p[lang].text}</p>
                    <span className="visit">{t.work.visit} <span aria-hidden="true">→</span></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section id="proses" className="section">
          <div className="container">
            <div className="head">
              <p className="eyebrow dark">{t.process.eyebrow}</p>
              <h2>{t.process.title}</h2>
            </div>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.id.title}>
                  <span className="num">{i + 1}</span>
                  <strong>{s[lang].title}</strong>
                  <p>{s[lang].text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section id="tentang" className="section alt">
          <div className="container about">
            <div>
              <p className="eyebrow dark">{t.about.eyebrow}</p>
              <h2>{t.about.title}</h2>
            </div>
            <p className="about-text">{t.about.text(site.city)}</p>
          </div>
        </section>
        <section id="kebutuhan" className="section needs">
          <div className="container">
            <div className="head">
              <p className="eyebrow dark">{t.needs.eyebrow}</p>
              <h2>{t.needs.title}</h2>
              <p className="sub">{t.needs.sub}</p>
            </div>
            <div className="needs-grid">
              {t.needs.cards.map((c) => (
                <div className="needs-card" key={c.title}>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
            <div className="needs-flow">
              <h3>{t.needs.stepsTitle}</h3>
              <ol>
                {t.needs.steps.map((x, i) => (
                  <li key={i}><span className="num">{i + 1}</span><span>{x}</span></li>
                ))}
              </ol>
              <a className="btn needs-cta" href="/kebutuhan/">{t.needs.cta}</a>
              <p className="needs-note">{t.needs.note}</p>
            </div>
          </div>
        </section>
        <section id="kontak" className="cta">
          <div className="container cta-inner">
            <div>
              <h2>{t.contact.title}</h2>
              <p>{t.contact.sub}</p>
            </div>
            <div className="cta-side">
              <div className="actions">
                <a className="btn btn-light" href={waHref('website', lang)} onClick={whatsappClick('contact_button')} target="_blank" rel="noreferrer">{t.contact.whatsapp}</a>
                <a className="btn btn-ghost" href={`mailto:${site.email}`}>{t.contact.email}</a>
              </div>
              <ul className="contact">
                <li>Email: <a href={`mailto:${site.email}`}>{site.email}</a></li>
                <li>WhatsApp: <a href={waHref('website', lang)} onClick={whatsappClick('contact_list')} target="_blank" rel="noreferrer">{site.whatsappLabel}</a></li>
                <li>{t.contact.location}: {site.city}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container foot">
          <span className="logo small"><Logo small /></span>
          <span>© {new Date().getFullYear()} Bigma. bigma.id</span>
        </div>
      </footer>

      <a
        className="wa-float"
        href={waHref('website', lang)}
        onClick={whatsappClick('floating')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.floatAria}
      >
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M16.04 3C9.4 3 4 8.4 4 15.03c0 2.12.55 4.19 1.6 6.01L4 28l7.1-1.86a12 12 0 0 0 4.94 1.06h.01C22.68 27.2 28 21.8 28 15.17 28 8.4 22.68 3 16.04 3Zm0 21.9h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-4.21 1.1 1.12-4.1-.24-.38a9.9 9.9 0 0 1-1.52-5.3c0-5.47 4.46-9.92 9.95-9.92 5.47 0 9.92 4.45 9.92 9.92 0 5.5-4.45 9.27-9.61 9.27Zm5.44-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
        </svg>
        <span className="wa-float-label">{t.floatLabel}</span>
      </a>
    </>
  )
}
