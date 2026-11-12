import { site } from './content.js'

// Google Tag Manager container (public ID). Override with VITE_GTM_ID; set it to "off" to disable.
const GTM_ID = ((import.meta.env.VITE_GTM_ID || 'GTM-NBVKZHXJ') + '').trim().replace(/^off$/i, '')

// Optional direct GA4 ID, set in Vercel as VITE_GA_ID (looks like G-XXXXXXXXXX). Empty = no tracking.
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
  if (typeof window === 'undefined') return
  // GTM trigger: Custom Event named like the event, e.g. whatsapp_click.
  if (GTM_ID) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: name, ...params })
  }
  // Direct GA4 (only if VITE_GA_ID is set).
  if (GA_ID && typeof window.gtag === 'function') window.gtag('event', name, params)
}

function loadScript(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

export function initAnalytics() {
  if (typeof window === 'undefined' || (!GTM_ID && !GA_ID)) return
  window.dataLayer = window.dataLayer || []
  if (GTM_ID) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`)
  }
  // Direct GA4 is optional. Do not set it if the same GA4 tag already runs inside GTM (double count).
  if (GA_ID) {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID)
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`)
  }
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
