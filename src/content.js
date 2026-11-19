// Site content in Indonesian (default) and English. Each text item holds { id, en }.
export const site = {
  name: 'Bigma',
  email: 'businessbigma@gmail.com',
  whatsapp: '6281536096663', // country code, no + or spaces
  whatsappLabel: '+62 815-3609-6663',
  city: 'Jakarta',
}

export const services = [
  {
    key: 'web',
    id: { title: 'Website', text: 'Website yang cepat, rapi, dan mudah ditemukan di Google, untuk bisnis, organisasi, atau pribadi.' },
    en: { title: 'Website', text: 'Fast, clean websites that are easy to find on Google, for businesses, organisations, or individuals.' },
  },
  {
    key: 'webapp',
    id: { title: 'Aplikasi Web', text: 'Aplikasi khusus untuk kebutuhan Anda, seperti dashboard, booking, atau katalog.' },
    en: { title: 'Web Apps', text: 'Custom apps for your needs, such as dashboards, bookings, or catalogues.' },
  },
  {
    key: 'mobile',
    id: { title: 'Aplikasi Mobile', text: 'Aplikasi untuk Android dan iPhone, dari aplikasi lapangan sampai aplikasi untuk pelanggan Anda.' },
    en: { title: 'Mobile Apps', text: 'Apps for Android and iPhone, from field apps to apps for your customers.' },
  },
  {
    key: 'internal',
    id: { title: 'Sistem Internal', text: 'Gantikan spreadsheet dan catatan manual dengan sistem yang rapi dan aman.' },
    en: { title: 'Internal Systems', text: 'Replace spreadsheets and manual notes with a tidy, secure system.' },
  },
  {
    key: 'other',
    id: { title: 'Software Lainnya', text: 'Punya kebutuhan lain? Ceritakan, kami buatkan software yang sesuai.' },
    en: { title: 'Other Software', text: 'Something else in mind? Tell us and we will build software that fits.' },
  },
]

export const steps = [
  { id: { title: 'Diskusi', text: 'Kami dengar masalah dan target bisnis Anda.' }, en: { title: 'Discuss', text: 'We listen to your problem and business goals.' } },
  { id: { title: 'Rancang', text: 'Kami buat rencana, tampilan, dan harga yang jelas.' }, en: { title: 'Design', text: 'We prepare a clear plan, design, and price.' } },
  { id: { title: 'Bangun', text: 'Anda bisa lihat progres secara berkala.' }, en: { title: 'Build', text: 'You can see progress at regular points.' } },
  { id: { title: 'Rilis', text: 'Kami luncurkan dan tetap bantu setelahnya.' }, en: { title: 'Launch', text: 'We go live and keep helping afterwards.' } },
]

export const projects = [
  {
    title: 'Nomiko',
    image: '/previews/nomiko.jpg',
    url: 'https://nomiko-web.vercel.app',
    id: { kind: 'Website brand produk (contoh desain)', text: 'Website brand untuk produk makanan anak, lengkap dengan halaman produk dan cerita brand.' },
    en: { kind: 'Product brand website (design example)', text: 'Brand website for a kids food product, with product pages and a brand story.' },
  },
  {
    title: 'KHN',
    image: '/previews/khn.jpg',
    url: 'https://khn-web.vercel.app',
    id: { kind: 'Website asosiasi profesi (contoh desain)', text: 'Website asosiasi dengan profil, kegiatan, pustaka, toko, dan data anggota.' },
    en: { kind: 'Professional association website (design example)', text: 'Association website with profile, activities, library, shop, and member data.' },
  },
  {
    title: 'Lumenify',
    image: '/previews/lumenify.jpg',
    url: 'https://lumenify.id',
    id: { kind: 'Website portofolio dan tim', text: 'Website profesional untuk menampilkan portofolio dan tim.' },
    en: { kind: 'Portfolio and team website', text: 'Professional website to show a portfolio and team.' },
  },
  {
    title: 'Farrel Alfarabi Saleh',
    image: '/previews/farrelsaleh.jpg',
    url: 'https://www.farrelalfarabisaleh.my.id',
    id: { kind: 'Website portofolio pribadi', text: 'Portofolio strategi pemasaran dan business intelligence.' },
    en: { kind: 'Personal portfolio website', text: 'Portfolio on marketing strategy and business intelligence.' },
  },
  {
    title: 'Farrel Alfarabi (Creative Developer)',
    image: '/previews/farrelcreative.jpg',
    url: 'https://farrelportfolio.netlify.app',
    id: { kind: 'Website portofolio dengan animasi', text: 'Portofolio dengan adegan WebGL, grafis real-time, dan studi kasus.' },
    en: { kind: 'Portfolio website with animation', text: 'Portfolio with WebGL scenes, real-time graphics, and case studies.' },
  },
  {
    title: 'Nabila Siregar',
    image: '/previews/nabila.jpg',
    url: 'https://nabila-site-drab.vercel.app',
    id: { kind: 'Website portofolio', text: 'Portofolio brand dan pemasaran.' },
    en: { kind: 'Portfolio website', text: 'Brand and marketing portfolio.' },
  },
  {
    title: 'Faishal Zuhair',
    image: '/previews/faishal.jpg',
    url: 'https://faishal-portofolio-five.vercel.app',
    id: { kind: 'Website portofolio', text: 'Portofolio konsultan bisnis dan strategi pemasaran.' },
    en: { kind: 'Portfolio website', text: 'Portfolio of a business consultant and marketing strategist.' },
  },
  {
    title: 'Thomas Raditya',
    image: '/previews/thomas.jpg',
    url: 'https://thomas-portfolio-five.vercel.app',
    id: { kind: 'Website portofolio', text: 'Portofolio pemasaran dan branding.' },
    en: { kind: 'Portfolio website', text: 'Marketing and branding portfolio.' },
  },
  {
    title: 'Zonein',
    image: '/previews/zonein.jpg',
    url: 'https://zonein-preview.vercel.app',
    id: { kind: 'Aplikasi sales lapangan (pratinjau desain)', text: 'Absensi dengan selfie dan GPS, kunjungan toko, dan cek rak dengan AI. Ada tampilan ponsel dan dasbor manajer.' },
    en: { kind: 'Field sales app (design preview)', text: 'Selfie and GPS check-in, store visits, and AI shelf checks. Includes a phone view and a manager dashboard.' },
  },
  {
    title: 'Lingkaran',
    image: '/previews/lingkaran.jpg',
    url: 'https://lingkaran-preview.vercel.app',
    id: { kind: 'Aplikasi jejaring alumni (pratinjau desain)', text: 'Direktori alumni, lowongan, usaha dan produk alumni, permintaan kontak, dan alat admin. Tur 117 layar desain terbaru dengan data contoh.' },
    en: { kind: 'Alumni network app (design preview)', text: 'Alumni directory, job posts, alumni businesses and products, contact requests, and admin tools. A tour of 117 latest design screens with sample data.' },
  },
]
