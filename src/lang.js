// Language choice (Indonesian is the default). Shared by the main site and the /kebutuhan/ form
// through localStorage, and settable with ?lang=en or ?lang=id.
const KEY = 'bigma_lang'

export function currentLang() {
  if (typeof window === 'undefined') return 'id'
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (q === 'en' || q === 'id') {
      localStorage.setItem(KEY, q)
      return q
    }
    const s = localStorage.getItem(KEY)
    if (s === 'en' || s === 'id') return s
  } catch {
    /* storage blocked: stay on Indonesian */
  }
  return 'id'
}

export function saveLang(lang) {
  try {
    localStorage.setItem(KEY, lang)
  } catch {
    /* ignore */
  }
  if (typeof document !== 'undefined') document.documentElement.lang = lang
}
