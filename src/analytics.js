import { site } from './content.js'

// Optional GA4 ID, set in Vercel as VITE_GA_ID (looks like G-XXXXXXXXXX). Empty = no tracking.
const GA_ID = (import.meta.env.VITE_GA_ID || '').trim()

// Each channel gets its own prefilled WhatsApp text, so the first chat shows where it came from.
// Use links like https://bigma.id/?src=instagram in bios, posts and ads. No prices in these texts.
export const channelTexts = {
  website: 'Halo Bigma, saya ingin berdiskusi tentang proyek.',
  google: 'Halo Bigma, saya dari Google. Saya ingin berdiskusi tentang proyek.',
  instagram: 'Halo Bigma, saya dari Instagram. Saya ingin berdiskusi tentang proyek.',
  linkedin: 'Halo Bigma, saya dari LinkedIn. Saya ingin berdiskusi tentang proyek.',
  facebook: 'Halo Bigma, saya dari Facebook. Saya ingin berdiskusi tentang proyek.',
  tiktok: 'Halo Bigma, saya dari TikTok. Saya ingin berdiskusi tentang proyek.',
  whatsapp: 'Halo Bigma, saya melihat info Bigma di WhatsApp. Saya ingin berdiskusi tentang proyek.',
  referral: 'Halo Bigma, saya dapat info dari teman. Saya ingin berdiskusi tentang proyek.',
}

export const waHref = (source = 'website') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(channelTexts[source] || channelTexts.website)}`

const KEY = 'bigma_src'

// Reads ?src= (or ?utm_source=) once and remembers it for the visit. Browser only.
export function currentSource() {
  if (typeof window === 'undefined') return 'website'
  let src = ''
  try {
    const q = new URLSearchParams(window.location.search)
    src = (q.get('src') || q.get('utm_source') || '').toLowerCase()
    if (channelTexts[src]) sessionStorage.setItem(KEY, src)
    else src = sessionStorage.getItem(KEY) || ''
  } catch {
    /* storage blocked: fall through */
  }
  return channelTexts[src] ? src : 'website'
}

function track(name, params) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

export function initAnalytics() {
  if (typeof window === 'undefined' || !GA_ID) return
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(s)
}

// onClick for every WhatsApp link: sets the channel-specific text and fires the GA4 event.
export function whatsappClick(placement) {
  return (e) => {
    const source = currentSource()
    e.currentTarget.href = waHref(source)
    track('whatsapp_click', {
      placement,
      source,
      transport_type: 'beacon',
    })
  }
}
