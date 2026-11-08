// Generates index.html for the Lingkaran preview. Run: node build.mjs
// Every name, number and place below is invented sample data.
import { writeFileSync } from 'node:fs'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')

/* ---------- mock building blocks ---------- */
const chip = (t, k = '') => `<span class="chip ${k}">${esc(t)}</span>`
const btn = (t, k = '') => `<div class="mbtn ${k}">${esc(t)}</div>`
const field = (l, v = '', ph = false) =>
  `<div class="field"><small>${esc(l)}</small><div class="${ph ? 'ph' : ''}">${esc(v) || '&nbsp;'}</div></div>`
const av = (s) => `<i class="av">${esc(s)}</i>`
const item = (a, t, s = '', right = '') =>
  `<div class="li">${av(a)}<div class="lt"><b>${esc(t)}</b>${s ? `<span>${esc(s)}</span>` : ''}</div>${right}</div>`
const head = (t) => `<h5>${esc(t)}</h5>`
const note = (t) => `<p class="mnote">${esc(t)}</p>`
const seg = (arr, on = 0) =>
  `<div class="seg">${arr.map((x, i) => `<span class="${i === on ? 'on' : ''}">${esc(x)}</span>`).join('')}</div>`
const search = (t) => `<div class="search">⌕ ${esc(t)}</div>`
const row = (t, s = '') => `<div class="row"><b>${esc(t)}</b>${s ? `<span>${esc(s)}</span>` : ''}<em>›</em></div>`
const card = (inner) => `<div class="mcard">${inner}</div>`
const tile = (g, t, s) => `<div class="tile"><i>${g}</i><b>${esc(t)}</b><span>${esc(s)}</span></div>`
const toggle = (t, on) => `<div class="tg"><span>${esc(t)}</span><u class="${on ? 'on' : ''}"></u></div>`

const NAV = ['Home', 'Members', 'Explore', 'Profile']
function phone(inner, { nav = null, title = null, back = false, plain = false } = {}) {
  const bar = title
    ? `<div class="abar">${back ? '<span>‹</span>' : ''}<b>${esc(title)}</b></div>`
    : ''
  const bottom = nav
    ? `<div class="bnav">${NAV.map((n) => `<span class="${n === nav ? 'on' : ''}"><i></i>${n}</span>`).join('')}</div>`
    : ''
  return `<div class="phone"><div class="status"><span>9:41</span><span>Data contoh</span></div>${bar}<div class="pbody ${plain ? 'plain' : ''}">${inner}</div>${bottom}</div>`
}

/* ---------- screens ---------- */
// role: Pengunjung | Anggota | Admin | Semua
const groups = []
const G = (id, name, intro, screens) => groups.push({ id, name, intro, screens })

G('masuk', 'Masuk dan awal pakai', 'Alur yang dilihat orang baru: dari layar sambutan sampai siap memakai aplikasi.', [
  {
    t: 'Welcome',
    role: 'Pengunjung',
    purpose: 'Layar pertama. Memperkenalkan Lingkaran sebagai jejaring alumni dan memberi satu tombol untuk mulai.',
    does: ['Membaca ringkasan aplikasi', 'Menekan Mulai untuk verifikasi', 'Melihat label beta dan versi aplikasi'],
    mock: phone(
      `<div class="center"><div class="logo-m">L</div><h3>Lingkaran</h3><small>by Ikafe Undip</small><p class="tag">Jejaring alumni untuk saling terhubung, berbagi peluang, dan tumbuh bersama.</p>${btn('Mulai', 'y')}<p class="mnote">Beta tertutup · data contoh</p><p class="mnote">Tampilan sementara, bukan identitas resmi.</p></div>`,
      { plain: true },
    ),
  },
  {
    t: 'Verifikasi Status Alumni: email',
    role: 'Pengunjung',
    purpose: 'Pintu masuk untuk alumni terdaftar. Pengguna mengisi email yang terdaftar.',
    does: ['Mengisi email alumni', 'Menekan kirim kode', 'Bila belum terdaftar: Hubungi tim admin'],
    mock: phone(
      `${field('Email', 'contoh@example.com')}${btn('Kirim kode', 'y')}<p class="link">Belum terdaftar? Hubungi tim admin</p>${note('Akun yang ditangguhkan melihat pesan khusus dan tombol Hubungi tim admin.')}`,
      { title: 'Verifikasi Status Alumni', back: true },
    ),
  },
  {
    t: 'Verifikasi Status Alumni: kode 6 digit',
    role: 'Pengunjung',
    purpose: 'Langkah kedua. Kode 6 digit dikirim ke email yang tadi diisi.',
    does: ['Mengisi kode 6 digit', 'Meminta kode baru', 'Memakai email lain bila salah'],
    mock: phone(
      `<p class="mnote">Kode dikirim ke contoh@example.com</p><div class="otp"><b>4</b><b>8</b><b>1</b><b></b><b></b><b></b></div>${btn('Verifikasi', 'y')}<p class="link">Kode tidak masuk atau email berubah?</p><p class="link">Pakai email lain</p>${note('Belum masuk? Cek folder spam.')}`,
      { title: 'Verifikasi Status Alumni', back: true },
    ),
  },
  {
    t: 'Syarat dan Ketentuan Aplikasi (consent)',
    role: 'Anggota',
    purpose: 'Ringkasan kebijakan privasi dan aturan pakai yang harus disetujui sebelum masuk.',
    does: ['Menggulir sampai bawah', 'Menekan Saya Setuju', 'Atau kembali dan keluar'],
    mock: phone(
      `${card('<b>Ringkasan</b><p class="mnote">Data apa yang disimpan, siapa yang bisa melihat, dan cara menghapus akun. (teks contoh)</p><p class="mnote">Aturan komunitas: sopan, tidak spam, tidak menjual barang terlarang.</p>')}${note('Gulir sampai bawah untuk melanjutkan.')}${btn('Saya Setuju', 'y')}${btn('Kembali dan keluar')}`,
      { title: 'Syarat dan Ketentuan', back: false },
    ),
  },
  {
    t: 'Atur PIN',
    role: 'Anggota',
    purpose: 'Opsional, hanya di aplikasi ponsel. PIN 6 digit (dan sidik jari atau wajah bila ada) agar tidak perlu verifikasi tiap buka.',
    does: ['Membuat PIN 6 digit', 'Mengaktifkan biometrik', 'Atau memilih Nanti saja'],
    mock: phone(
      `<div class="center"><p class="mnote">Buat PIN 6 digit</p><div class="otp dots"><b>•</b><b>•</b><b>•</b><b></b><b></b><b></b></div><div class="pad">${'123456789'.split('').map((n) => `<span>${n}</span>`).join('')}<span></span><span>0</span><span>⌫</span></div>${btn('Aktifkan', 'y')}<p class="link">Nanti saja</p></div>`,
      { title: 'Atur PIN', back: true },
    ),
  },
  {
    t: 'Layar kunci',
    role: 'Anggota',
    purpose: 'Muncul saat membuka lagi aplikasi di ponsel yang sudah dikenal. Masuk dengan PIN atau biometrik.',
    does: ['Memasukkan PIN', 'Lupa PIN: verifikasi ulang', 'Bukan kamu? Ganti akun'],
    mock: phone(
      `<div class="center"><div class="av big">A</div><b>Halo, Alumni A</b><small>a***@example.com</small><div class="otp dots"><b>•</b><b>•</b><b></b><b></b><b></b><b></b></div><p class="mnote">Sisa percobaan: 5</p><p class="link">Lupa PIN? Verifikasi ulang</p><p class="link">Bukan kamu? Ganti akun</p></div>`,
      { plain: true },
    ),
  },
  {
    t: 'Lengkapi profil pertama',
    role: 'Anggota',
    purpose: 'Muncul sekali setelah login pertama. Boleh dilewati. Mengisi foto dan kontak yang mau dibagikan.',
    does: ['Memilih foto', 'Mengatur kontak yang mau dibagikan', 'Lewati atau Lanjut'],
    mock: phone(
      `<div class="center"><div class="av big">A</div>${btn('Pilih foto')}</div>${field('Kontak yang mau dibagikan', 'WA: 08xx-xxxx-xxxx', true)}${btn('Lanjut', 'y')}<p class="link">Lewati</p>`,
      { title: 'Profil kamu' },
    ),
  },
  {
    t: 'Pengenalan fitur',
    role: 'Anggota',
    purpose: 'Tur singkat tiga halaman: Cari alumni, Marketplace dan Business, Jobs. Muncul sekali dan bisa dibuka lagi dari Pengaturan.',
    does: ['Menggeser tiga halaman', 'Lewati kapan saja'],
    mock: phone(
      `<div class="center"><div class="ic">⌕</div><h3>Cari alumni</h3><p class="tag">Temukan sesama alumni yang telah terdaftar.</p></div><ul class="pts"><li>Cari alumni di tab Members.</li><li>Kirim permintaan kontak.</li><li>Respon diterima di fitur Requests.</li></ul><div class="dotsrow"><u class="on"></u><u></u><u></u></div><p class="link">Lewati</p>`,
      { plain: true },
    ),
  },
])

G('home', 'Home dan kabar', 'Tab pertama setelah masuk, ditambah halaman kabar yang dibuka dari Home.', [
  {
    t: 'Home',
    role: 'Anggota',
    purpose: 'Pusat aplikasi. Menyapa, menampilkan pengumuman, jalan pintas ke fitur utama, dan konten terbaru.',
    does: ['Melihat banner pengumuman', 'Membuka Cari alumni, Jobs, Marketplace, Kontak Ikafe', 'Melihat lowongan dan produk terbaru', 'Membuka notifikasi dan Requests dari ikon atas'],
    mock: phone(
      `<div class="hi"><b>Halo, Alumni A</b><span>🔔 <u class="badge">2</u> &nbsp; ⇄ <u class="badge">1</u></span></div>${card('<b>Reuni angkatan contoh</b>')}<div class="tiles">${tile('⌕', 'Cari alumni', 'Members')}${tile('▤', 'Jobs', 'Lowongan')}${tile('◫', 'Marketplace', 'Produk dan usaha')}${tile('☎', 'Kontak Ikafe', 'Kontak resmi')}</div>${head('Lowongan baru')}${item('P', 'Staf Keuangan', 'PT Contoh Maju')}${head('Dukung Usaha Alumni')}${item('K', 'Kopi Contoh', 'Food & Drink')}${head('Upcoming')}<div class="chips">${chip('Events · Preview')}${chip('Mentoring · Preview')}</div>`,
      { nav: 'Home' },
    ),
  },
  {
    t: 'Pengumuman',
    role: 'Anggota',
    purpose: 'Daftar kabar satu arah dari admin untuk semua anggota.',
    does: ['Menggulir daftar pengumuman', 'Membuka satu pengumuman untuk membaca lengkap'],
    mock: phone(
      `${item('📢', 'Reuni angkatan contoh', '3 hari lalu')}${item('📢', 'Pembaruan aplikasi', '1 minggu lalu')}${item('📢', 'Aturan komunitas', '2 minggu lalu')}`,
      { title: 'Announcements', back: true },
    ),
  },
  {
    t: 'Detail pengumuman',
    role: 'Anggota',
    purpose: 'Isi lengkap satu pengumuman.',
    does: ['Membaca teks lengkap', 'Kembali ke daftar'],
    mock: phone(
      `<h3>Reuni angkatan contoh</h3><small>Diposting admin · 3 hari lalu</small><p class="mnote body">Ini teks contoh pengumuman. Isinya akan berbeda di aplikasi sebenarnya. Baris kedua contoh teks panjang agar terlihat seperti paragraf asli.</p>`,
      { title: 'Announcement', back: true },
    ),
  },
  {
    t: 'Kontak Ikafe',
    role: 'Anggota',
    purpose: 'Daftar kontak dan media sosial resmi yang diatur admin. Bisa disalin.',
    does: ['Melihat kontak dan akun sosial', 'Menyalin satu kontak'],
    mock: phone(
      `${item('✉', 'Email admin', 'kontak@example.com', '<em class="cp">Salin</em>')}${item('☎', 'WhatsApp', '08xx-xxxx-xxxx', '<em class="cp">Salin</em>')}${item('@', 'Instagram', '@akun.contoh', '<em class="cp">Salin</em>')}${note('Contoh data.')}`,
      { title: 'Kontak Ikafe', back: true },
    ),
  },
  {
    t: 'Notifications',
    role: 'Anggota',
    purpose: 'Pemberitahuan di dalam aplikasi (tidak ada notifikasi push): permintaan kontak, status usaha dan produk, lamaran.',
    does: ['Membuka notifikasi untuk menuju halamannya', 'Menghapus semua notifikasi'],
    mock: phone(
      `${item('⇄', 'Permintaan kontak baru', 'Alumni B ingin terhubung · 5 mnt', '<u class="dot"></u>')}${item('✓', 'Usaha disetujui', 'Kopi Contoh · 2 jam', '<u class="dot"></u>')}${item('▤', 'Lamaran baru', 'Staf Keuangan · kemarin')}<p class="link">Hapus semua</p>`,
      { title: 'Notifications', back: true },
    ),
  },
])

G('members', 'Members dan permintaan kontak', 'Mencari alumni lain dan meminta kontak. Tidak ada chat: pemilik kontak yang memutuskan.', [
  {
    t: 'Members (Directory)',
    role: 'Anggota',
    purpose: 'Direktori alumni terdaftar. Dicari berdasarkan nama atau perusahaan dan disaring.',
    does: ['Mencari nama atau perusahaan', 'Menyaring Major, Year, Industry, City', 'Menghapus filter', 'Membuka profil'],
    mock: phone(
      `${search('Cari nama atau perusahaan...')}<div class="chips">${chip('Major ▾')}${chip('Year ▾')}${chip('Industry ▾')}${chip('City ▾')}</div>${item('B', 'Alumni B', 'Manajemen · 2015 · PT Contoh Maju')}${item('C', 'Alumni C', 'Akuntansi · 2012 · Studio Contoh')}${item('D', 'Alumni D', 'Ilmu Ekonomi · 2018 · Kopi Contoh')}${item('E', 'Alumni E', 'Manajemen · 2010 · Bank Contoh')}`,
      { nav: 'Members' },
    ),
  },
  {
    t: 'Profil anggota',
    role: 'Anggota',
    purpose: 'Profil alumni lain: akademik, pekerjaan, kota, bio. Tombol Minta kontak menggantikan chat.',
    does: ['Membaca profil', 'Membuka LinkedIn (dengan konfirmasi)', 'Menekan Minta kontak', 'Lapor atau blokir lewat menu'],
    mock: phone(
      `<div class="center"><div class="av big">B</div><b>Alumni B</b><small>Manajemen · 2015</small></div>${head('Employment')}${field('Perusahaan', 'PT Contoh Maju')}${field('Peran', 'Manajer Contoh')}${head('Bio')}<p class="mnote">Bio contoh tentang diri sendiri.</p>${btn('Minta kontak', 'y')}`,
      { title: 'Profil', back: true },
    ),
  },
  {
    t: 'Minta kontak (sheet)',
    role: 'Anggota',
    purpose: 'Lembar kecil untuk mengirim permintaan kontak dengan pesan singkat.',
    does: ['Menulis pesan (disarankan)', 'Menekan Kirim permintaan'],
    mock: phone(
      `<div class="sheet">${head('Minta kontak Alumni B')}${field('Pesan (disarankan)', 'Contoh: kenapa kamu ingin terhubung', true)}${btn('Kirim permintaan', 'y')}</div>`,
      { nav: 'Members' },
    ),
  },
  {
    t: 'Requests',
    role: 'Anggota',
    purpose: 'Permintaan kontak yang dikirim dan diterima. Penerima memilih kontak mana yang dibagikan atau menolak.',
    does: ['Melihat Menunggu jawaban, Diterima, Ditolak', 'Terima dan bagikan kontak', 'Tolak', 'Batalkan permintaan sendiri'],
    mock: phone(
      `${seg(['Masuk', 'Terkirim'])}${card(`<b>Alumni C</b><p class="mnote">"Halo, saya ingin bertanya soal lowongan."</p><div class="two">${btn('Tolak')}${btn('Terima', 'y')}</div>`)}${card(`<b>Alumni D</b>${chip('Diterima', 'ok')}<p class="mnote">Lihat daftar kontak</p>`)}`,
      { title: 'Requests', back: true },
    ),
  },
])

G('explore', 'Explore: Marketplace, Business, Jobs', 'Tab Explore berisi tiga bagian. Produk hanya dari usaha yang sudah disetujui admin. Tidak ada pembayaran di aplikasi.', [
  {
    t: 'Marketplace',
    role: 'Anggota',
    purpose: 'Produk dari usaha alumni. Pembeli dan penjual bertransaksi di luar aplikasi.',
    does: ['Mencari judul', 'Menyaring kategori dan kota', 'Membuka detail produk', 'Tambah produk atau Produk saya'],
    mock: phone(
      `${seg(['Marketplace', 'Businesses', 'Jobs'])}${search('Cari judul...')}<div class="chips">${chip('Food & Drink')}${chip('Fashion')}${chip('Electronics')}${chip('Services')}</div><div class="grid2"><div class="pc"><i class="img"></i><b>Kopi Susu Contoh</b><span>Rp 25.000</span></div><div class="pc"><i class="img"></i><b>Kemeja Contoh</b><span>Rp 150.000</span></div></div>${btn('Tambah produk', 'y')}`,
      { nav: 'Explore', title: 'Explore' },
    ),
  },
  {
    t: 'Detail produk',
    role: 'Anggota',
    purpose: 'Foto, harga, deskripsi, penjual, dan cara menghubungi. Tidak ada checkout.',
    does: ['Menghubungi penjual', 'Mengunjungi link toko', 'Melihat profil penjual', 'Melaporkan produk'],
    mock: phone(
      `<i class="img wide"></i><h3>Kopi Susu Contoh</h3><b>Rp 25.000</b>${chip('Food & Drink')}<p class="mnote body">Deskripsi contoh produk. Pembayaran antara pembeli dan penjual.</p>${btn('Contact seller', 'y')}${btn('Visit shop')}<p class="link">Report listing</p>`,
      { title: 'Listing', back: true },
    ),
  },
  {
    t: 'Laporkan produk',
    role: 'Anggota',
    purpose: 'Siapa pun bisa melaporkan produk dengan alasan. Laporan dibaca admin.',
    does: ['Memilih alasan: Spam, Prohibited item, Misleading, Other', 'Menambah catatan', 'Send report'],
    mock: phone(
      `<div class="sheet">${head('Why are you reporting this listing?')}${toggle('Spam', 1)}${toggle('Prohibited item', 0)}${toggle('Misleading', 0)}${toggle('Other', 0)}${field('Note (optional)', '', true)}${btn('Send report', 'y')}</div>`,
      { nav: 'Explore' },
    ),
  },
  {
    t: 'Tambah produk (form)',
    role: 'Anggota',
    purpose: 'Pemilik usaha yang sudah disetujui memasang produk. Ada batas gratis sesuai skala usaha.',
    does: ['Memilih usaha', 'Mengisi judul, harga, kategori, deskripsi, kota', 'Menandai harga bisa nego', 'Mengunggah foto dan cara dihubungi'],
    mock: phone(
      `${field('Usaha', 'Kopi Contoh ▾')}${field('Title', 'Kopi Susu Contoh')}${field('Price (whole rupiah)', '25000')}${field('Category', 'Food & Drink ▾')}${toggle('Harga bisa nego', 0)}${field('Kota (opsional)', 'Jakarta')}${btn('Simpan', 'y')}`,
      { title: 'Tambah produk', back: true },
    ),
  },
  {
    t: 'Produk saya',
    role: 'Anggota',
    purpose: 'Mengelola produk sendiri: ubah, tandai terjual, hapus. Melihat alasan bila ditolak admin.',
    does: ['Mengubah produk (dikirim ulang untuk ditinjau)', 'Mark as sold', 'Menghapus produk'],
    mock: phone(
      `${card(`<b>Kopi Susu Contoh</b> ${chip('Live', 'ok')}<div class="two">${btn('Edit')}${btn('Mark as sold')}</div>`)}${card(`<b>Tas Contoh</b> ${chip('Rejected', 'bad')}<p class="mnote">Alasan dari admin: foto kurang jelas (contoh).</p>`)}`,
      { title: 'Produk saya', back: true },
    ),
  },
  {
    t: 'Business directory',
    role: 'Anggota',
    purpose: 'Daftar usaha alumni yang sudah disetujui, bisa dicari dan disaring kategori.',
    does: ['Mencari nama atau kategori', 'Membuka usaha dan link sosialnya', 'Register a business', 'My businesses'],
    mock: phone(
      `${seg(['Marketplace', 'Businesses', 'Jobs'], 1)}${search('Cari nama atau kategori...')}${item('K', 'Kopi Contoh', 'Food & Drink · Micro')}${item('B', 'Batik Contoh', 'Fashion · Small')}${item('S', 'Studio Contoh', 'Services · Micro')}${btn('Register a business', 'y')}`,
      { nav: 'Explore', title: 'Explore' },
    ),
  },
  {
    t: 'Daftarkan usaha (form)',
    role: 'Anggota',
    purpose: 'Setiap alumni boleh mendaftarkan satu atau beberapa usaha. Skala usaha dipilih dari penjualan tahunan (batas UMKM).',
    does: ['Mengisi nama, kategori, deskripsi singkat', 'Mengisi Instagram dan link opsional', 'Memilih Yearly sales: Micro, Small, Medium, Large', 'Mengirim untuk disetujui admin'],
    mock: phone(
      `${field('Business name *', 'Kopi Contoh')}${field('Category *', 'Food & Drink ▾')}${field('Short description *', 'Kopi susu rumahan (contoh)')}${field('Instagram *', '@kopicontoh')}${field('Yearly sales *', 'Micro: sampai Rp 2 miliar ▾')}${btn('Kirim', 'y')}`,
      { title: 'Register a business', back: true },
    ),
  },
  {
    t: 'Usaha saya',
    role: 'Anggota',
    purpose: 'Status tiap usaha: Pending, Approved, Rejected, atau Suspended, beserta alasan dari admin.',
    does: ['Memantau status persetujuan', 'Mengubah atau menghapus usaha', 'Mendaftar usaha baru'],
    mock: phone(
      `${card(`<b>Kopi Contoh</b> ${chip('Approved', 'ok')}`)}${card(`<b>Batik Contoh</b> ${chip('Pending')}<p class="mnote">Menunggu admin.</p>`)}${card(`<b>Toko Lama</b> ${chip('Suspended', 'bad')}<p class="mnote">Hubungi admin.</p>`)}`,
      { title: 'My businesses', back: true },
    ),
  },
  {
    t: 'Job Board',
    role: 'Anggota',
    purpose: 'Lowongan yang dipasang alumni untuk alumni.',
    does: ['Mencari judul, perusahaan, deskripsi', 'Menyaring Company dan Industry', 'Membuka lowongan', 'Post a Job atau My job postings'],
    mock: phone(
      `${seg(['Marketplace', 'Businesses', 'Jobs'], 2)}${search('Cari judul, perusahaan...')}${item('P', 'Staf Keuangan', 'PT Contoh Maju · Jakarta')}${item('S', 'Analis Data', 'Studio Contoh · Remote')}${item('B', 'Admin Penjualan', 'Kopi Contoh · Bogor')}${btn('Post a Job', 'y')}`,
      { nav: 'Explore', title: 'Explore' },
    ),
  },
  {
    t: 'Detail lowongan',
    role: 'Anggota',
    purpose: 'Isi lowongan dan tombol melamar. Pelamar bisa menarik lamaran. Pemasang melihat pelamar.',
    does: ['Membaca deskripsi', 'Apply to this Job', 'Menarik lamaran (Tarik lamaran)', 'Pemasang: View Applicants'],
    mock: phone(
      `<h3>Staf Keuangan</h3><small>PT Contoh Maju · Accounting and Consulting</small><p class="mnote body">Deskripsi lowongan contoh: tugas, syarat, dan cara menghubungi.</p>${btn('Apply to this Job', 'y')}${chip('Applied', 'ok')}`,
      { title: 'Job Details', back: true },
    ),
  },
  {
    t: 'Pasang lowongan (form)',
    role: 'Anggota',
    purpose: 'Setiap alumni terverifikasi boleh memasang lowongan. Pemasang menentukan data apa yang wajib dari pelamar.',
    does: ['Mengisi judul, perusahaan, industri, deskripsi, kontak', 'Memilih data wajib pelamar (LinkedIn, cover note, portofolio)', 'Mengaktifkan notifikasi lamaran'],
    mock: phone(
      `${field('Job Title', 'Staf Keuangan')}${field('Company', 'PT Contoh Maju')}${field('Industry', 'Accounting and Consulting ▾')}${field('Description', 'Deskripsi contoh...')}${head('Require applicants to provide')}${toggle('LinkedIn URL', 1)}${toggle('Cover note', 1)}${toggle('Portfolio / other link', 0)}${toggle('Notify me when someone applies', 1)}${btn('Post Job', 'y')}`,
      { title: 'Post a Job', back: true },
    ),
  },
  {
    t: 'Melamar (form dan konfirmasi)',
    role: 'Anggota',
    purpose: 'Formulir lamaran dengan langkah konfirmasi sebelum dikirim, lalu layar berhasil.',
    does: ['Mengisi nama, telepon, LinkedIn, cover note, tautan', 'Mengunggah CV bila diminta', 'Memeriksa ringkasan, lalu Confirm & Submit', 'Back to Edit bila perlu'],
    mock: phone(
      `${field('Full Name', 'Alumni A')}${field('Phone (optional)', '08xx-xxxx-xxxx')}${field('LinkedIn URL', 'linkedin.com/in/contoh')}${field('Cover note', 'Halo, saya tertarik (contoh).')}${btn('Review', 'y')}${note('Lalu: ringkasan Details › Confirm & Submit › Application submitted.')}`,
      { title: 'Apply', back: true },
    ),
  },
  {
    t: 'Pelamar lowongan',
    role: 'Anggota',
    purpose: 'Pemasang lowongan melihat siapa yang melamar beserta datanya.',
    does: ['Melihat daftar pelamar', 'Membuka data lamaran'],
    mock: phone(
      `${item('F', 'Alumni F', 'Melamar kemarin')}${item('G', 'Alumni G', 'Melamar 3 hari lalu')}${note('Bila belum ada: No applications yet.')}`,
      { title: 'Applicants', back: true },
    ),
  },
  {
    t: 'Lowongan saya',
    role: 'Anggota',
    purpose: 'Mengelola lowongan yang dipasang sendiri: ubah atau hapus.',
    does: ['Mengubah lowongan', 'Menghapus lowongan', 'Pasang lowongan baru'],
    mock: phone(
      `${card(`<b>Staf Keuangan</b>${chip('Aktif', 'ok')}<div class="two">${btn('Ubah')}${btn('Hapus')}</div>`)}${btn('Post a Job', 'y')}`,
      { title: 'My job postings', back: true },
    ),
  },
])

G('profile', 'Profil, pengaturan dan akun', 'Tab Profile: data diri, pengaturan, bantuan, dan kendali atas akun sendiri.', [
  {
    t: 'Profile',
    role: 'Anggota',
    purpose: 'Profil sendiri dan jalan masuk ke semua yang berkaitan dengan akun.',
    does: ['Melihat dan mengubah foto, bio, kota, LinkedIn', 'Membuka My business, My job postings', 'Pengaturan, Bantuan, Kebijakan', 'Sign out', 'Admin (hanya untuk admin)'],
    mock: phone(
      `<div class="center"><div class="av big">A</div><b>Alumni A</b><small>Manajemen · 2014</small></div>${row('Employment', 'PT Contoh Maju')}${row('My business')}${row('My job postings')}${row('Pengaturan', 'Kontak, PIN, pengguna terblokir')}${row('Bantuan')}${row('Kebijakan Privasi dan Ketentuan')}${btn('Sign out')}`,
      { nav: 'Profile' },
    ),
  },
  {
    t: 'Ubah profil: pekerjaan, bio, kota, foto, LinkedIn',
    role: 'Anggota',
    purpose: 'Layar-layar kecil untuk mengubah satu bagian profil. Foto bisa digeser dan dipotong sebelum disimpan.',
    does: ['Edit Employment Info (perusahaan, peran, industri)', 'Menulis bio singkat', 'Memilih kota', 'Mengatur foto (Atur foto)', 'Menambah LinkedIn (opsional)'],
    mock: phone(
      `${field('Company', 'PT Contoh Maju')}${field('Current Role', 'Manajer Contoh')}${field('Industry', 'Accounting and Consulting ▾')}${btn('Save', 'y')}${note('Bio, Kota, Foto profil dan LinkedIn memakai layar serupa dengan tombol Simpan.')}`,
      { title: 'Edit Employment Info', back: true },
    ),
  },
  {
    t: 'Pengaturan',
    role: 'Anggota',
    purpose: 'Satu tempat untuk bahasa, PIN, kontak yang dibagikan, pengguna terblokir, tur fitur, dan zona bahaya.',
    does: ['Memilih bahasa', 'Mengatur PIN', 'Default kontak untuk dibagikan', 'Pengguna terblokir', 'Pengenalan fitur', 'Hapus akun saya'],
    mock: phone(
      `${row('Bahasa', 'Pilih bahasa')}${row('PIN')}${row('Default kontak untuk dibagikan', 'Terisi ketika menerima request')}${row('Blokir pengguna', 'Pengguna terblokir, buka blokir')}${row('Pengenalan fitur')}${head('Zona bahaya')}${row('Hapus akun saya')}`,
      { title: 'Pengaturan', back: true },
    ),
  },
  {
    t: 'Default kontak untuk dibagikan',
    role: 'Anggota',
    purpose: 'Kontak yang otomatis dibagikan saat menerima permintaan kontak.',
    does: ['Mengisi satu kontak (misalnya WhatsApp)', 'Simpan'],
    mock: phone(`${field('Kontak', 'WA: 08xx-xxxx-xxxx', true)}${btn('Simpan', 'y')}`, { title: 'Default kontak', back: true }),
  },
  {
    t: 'PIN (ubah atau hapus)',
    role: 'Anggota',
    purpose: 'Mengatur, mengubah, atau menghapus PIN. Hanya di aplikasi ponsel.',
    does: ['Atur PIN', 'Ubah PIN setelah memasukkan PIN saat ini', 'Hapus PIN'],
    mock: phone(`${toggle('PIN aktif', 1)}${toggle('Sidik jari / wajah', 1)}${btn('Ubah PIN')}${btn('Hapus PIN')}`, { title: 'Atur PIN', back: true }),
  },
  {
    t: 'Pengguna terblokir',
    role: 'Anggota',
    purpose: 'Orang yang diblokir hilang dari semua daftar. Daftar ini untuk membuka blokir.',
    does: ['Melihat daftar terblokir', 'Buka blokir'],
    mock: phone(`${item('X', 'Alumni X', '', '<em class="cp">Buka blokir</em>')}${note('Bila kosong: Kamu belum memblokir siapa pun.')}`, { title: 'Pengguna terblokir', back: true }),
  },
  {
    t: 'Bantuan, kontak admin dan About',
    role: 'Anggota',
    purpose: 'Jalan keluar saat ada masalah: hubungi admin, kirim masukan, lihat info aplikasi dan penyelenggara.',
    does: ['Contact admin (salin email atau nomor)', 'Send feedback', 'Membaca About: versi, label BETA, siapa penyelenggara'],
    mock: phone(
      `${row('Contact admin')}${row('Send feedback', 'Something broken or confusing?')}${row('About', 'Lingkaran v0.0 BETA (contoh)')}${row('Who runs this app')}`,
      { title: 'Bantuan', back: true },
    ),
  },
  {
    t: 'Kirim masukan saat ada error',
    role: 'Semua',
    purpose: 'Bila daftar gagal dimuat, layar error memberi tombol Coba lagi dan Kirim masukan agar tim bisa melihat masalahnya.',
    does: ['Coba lagi', 'Kirim masukan dengan nama layar otomatis'],
    mock: phone(`<div class="center"><div class="ic">!</div><b>Terjadi Kesalahan</b><p class="mnote">Daftar tidak bisa dimuat.</p>${btn('Coba lagi', 'y')}${btn('Kirim masukan')}</div>`, { title: 'Home' }),
  },
  {
    t: 'Kebijakan Privasi dan Ketentuan',
    role: 'Semua',
    purpose: 'Teks kebijakan yang bisa dibaca kembali kapan saja.',
    does: ['Membaca kebijakan dan aturan'],
    mock: phone(`<p class="mnote body">Teks kebijakan contoh. Isi sebenarnya ada di aplikasi.</p><p class="mnote body">Bagian: data yang disimpan, hak pengguna, aturan komunitas.</p>`, { title: 'Privacy policy and rules', back: true }),
  },
  {
    t: 'Hapus akun',
    role: 'Anggota',
    purpose: 'Menjelaskan apa yang dihapus dan apa yang dipertahankan sebelum pengguna menghapus akunnya.',
    does: ['Membaca What is removed dan What is kept', 'Hapus akun saya, dengan konfirmasi'],
    mock: phone(
      `${card('<b>What is removed</b><p class="mnote">Isi contoh: profil dan data pribadi.</p>')}${card('<b>What is kept</b><p class="mnote">Isi contoh.</p>')}${note('This cannot be undone.')}${btn('Hapus akun saya', 'bad')}`,
      { title: 'Delete account', back: true },
    ),
  },
])

G('admin', 'Admin', 'Hanya terlihat oleh admin. Admin ditentukan lewat dashboard Supabase oleh pemilik aplikasi, bukan dari dalam aplikasi.', [
  {
    t: 'Admin (menu)',
    role: 'Admin',
    purpose: 'Pintu masuk semua alat admin, muncul di Profile hanya bagi admin.',
    does: ['Memilih salah satu dari sembilan alat'],
    mock: phone(
      `${row('Businesses')}${row('Marketplace review')}${row('Reports')}${row('Jobs')}${row('Announcements')}${row('Home order')}${row('Kontak Ikafe')}${row('Feedback')}${row('Riwayat')}`,
      { title: 'Admin', back: true },
    ),
  },
  {
    t: 'Admin: Businesses',
    role: 'Admin',
    purpose: 'Menyetujui, menolak, atau menangguhkan usaha yang didaftarkan anggota. Pemilik dapat notifikasi.',
    does: ['Mencari nama, pemilik, atau link', 'Approve atau Reject (dengan alasan)', 'Suspend usaha yang sudah disetujui'],
    mock: phone(
      `${search('Cari nama, pemilik atau link...')}${card(`<b>Batik Contoh</b> ${chip('Pending')}<p class="mnote">oleh Alumni D · Fashion · Small</p><div class="two">${btn('Reject')}${btn('Approve', 'y')}</div>`)}${card(`<b>Kopi Contoh</b> ${chip('Approved', 'ok')}${btn('Suspend')}`)}`,
      { title: 'Businesses', back: true },
    ),
  },
  {
    t: 'Admin: Marketplace review',
    role: 'Admin',
    purpose: 'Antrean produk untuk ditinjau dan jumlah laporan per produk. Admin bisa menolak atau menyembunyikan.',
    does: ['Approve atau Reject listing dengan alasan', 'Sembunyikan produk', 'Abaikan laporan atau buka lagi'],
    mock: phone(
      `${seg(['Review queue', 'Reports'])}${card(`<b>Tas Contoh</b><p class="mnote">oleh Alumni D · 2 laporan</p><div class="two">${btn('Reject')}${btn('Approve', 'y')}</div>`)}${note('Bila kosong: Nothing waiting for review.')}`,
      { title: 'Marketplace review', back: true },
    ),
  },
  {
    t: 'Admin: Reports',
    role: 'Admin',
    purpose: 'Konten yang dilaporkan anggota: abaikan, sembunyikan, atau pulihkan. Alasan bisa dikirim ke pemilik.',
    does: ['Mencari dan menyaring periode', 'Hide atau Restore konten', 'Menghapus bio yang melanggar'],
    mock: phone(
      `${seg(['Open', 'Hidden items'])}${card(`<b>Produk: Tas Contoh</b> ${chip('Misleading', 'bad')}<div class="two">${btn('Dismiss')}${btn('Hide', 'y')}</div>`)}${card(`<b>Bio: Alumni Y</b> ${chip('Spam', 'bad')}${btn('Hapus bio')}`)}`,
      { title: 'Reports', back: true },
    ),
  },
  {
    t: 'Admin: Jobs',
    role: 'Admin',
    purpose: 'Melihat semua lowongan; menangguhkan atau menampilkan lagi dengan alasan yang dikirim ke pemasang.',
    does: ['Mencari judul, perusahaan, pemasang', 'Tangguhkan', 'Tampilkan lagi'],
    mock: phone(
      `${search('Cari judul, perusahaan atau pemasang')}${card(`<b>Staf Keuangan</b> ${chip('Aktif', 'ok')}${btn('Tangguhkan')}`)}${card(`<b>Lowongan Contoh</b> ${chip('Ditangguhkan', 'bad')}${btn('Tampilkan lagi')}`)}`,
      { title: 'Jobs', back: true },
    ),
  },
  {
    t: 'Admin: Announcements',
    role: 'Admin',
    purpose: 'Menulis, mengubah, dan menghapus pengumuman yang tampil di banner Home.',
    does: ['New announcement (judul dan pesan)', 'Ubah atau Hapus', 'Mencari pengumuman lama'],
    mock: phone(
      `${search('Cari judul, pesan atau pemosting...')}${card(`<b>Reuni angkatan contoh</b><div class="two">${btn('Ubah')}${btn('Hapus')}</div>`)}${btn('New announcement', 'y')}`,
      { title: 'Announcements', back: true },
    ),
  },
  {
    t: 'Admin: Home order',
    role: 'Admin',
    purpose: 'Memilih produk dan lowongan yang disematkan agar tampil dulu di Home. Batasnya terbatas.',
    does: ['Pin dan lepas pin (Lepas)', 'Naikkan atau Turunkan urutan'],
    mock: phone(
      `${head('Dipin')}${item('K', 'Kopi Susu Contoh', 'Products', '<em class="cp">Naikkan</em>')}${item('P', 'Staf Keuangan', 'Jobs', '<em class="cp">Lepas</em>')}${head('Belum dipin')}${item('T', 'Tas Contoh', 'Products', '<em class="cp">Pin</em>')}${note('Bila kosong, Home menampilkan yang terbaru.')}`,
      { title: 'Home order', back: true },
    ),
  },
  {
    t: 'Admin: Kontak Ikafe',
    role: 'Admin',
    purpose: 'Mengelola kontak dan media sosial yang dilihat anggota di halaman Kontak Ikafe.',
    does: ['Tambah kontak (jenis, nama, nomor/email/akun)', 'Mengatur urutan', 'Menyembunyikan atau menghapus'],
    mock: phone(
      `${field('Jenis', 'WhatsApp ▾')}${field('Nama kontak', 'Admin Contoh')}${field('Nomor, email, @akun atau link', '08xx-xxxx-xxxx')}${toggle('Tampil di Kontak Ikafe', 1)}${btn('Simpan', 'y')}`,
      { title: 'Tambah kontak', back: true },
    ),
  },
  {
    t: 'Admin: Feedback',
    role: 'Admin',
    purpose: 'Membaca masukan yang dikirim anggota lewat tombol Send feedback.',
    does: ['Mencari pesan, nama, atau layar', 'Mark as seen', 'Mark as done'],
    mock: phone(
      `${search('Cari pesan, nama atau layar...')}${card(`<b>Layar: Home</b><p class="mnote">"Daftar tidak muncul" (contoh)</p><div class="two">${btn('Mark as seen')}${btn('Mark as done', 'y')}</div>`)}`,
      { title: 'Feedback', back: true },
    ),
  },
  {
    t: 'Admin: Riwayat',
    role: 'Admin',
    purpose: 'Catatan tindakan admin: siapa melakukan apa dan kapan.',
    does: ['Menelusuri riwayat tindakan'],
    mock: phone(
      `${item('✓', 'Admin 1 menyetujui usaha', 'Kopi Contoh · hari ini')}${item('⌫', 'Admin 2 menyembunyikan produk', 'Tas Contoh · kemarin')}${item('📢', 'Admin 1 memposting pengumuman', '3 hari lalu')}`,
      { title: 'Riwayat admin', back: true },
    ),
  },
])

/* ---------- roles ---------- */
const roleRows = [
  ['Verifikasi dengan email dan kode', 'ya', '-', '-'],
  ['Melihat direktori, Explore, Home', '-', 'ya', 'ya'],
  ['Minta kontak, menerima atau menolak', '-', 'ya', 'ya'],
  ['Mendaftarkan usaha', '-', 'ya', 'ya'],
  ['Memasang produk (usaha sudah disetujui)', '-', 'ya', 'ya'],
  ['Memasang lowongan dan melamar', '-', 'ya', 'ya'],
  ['Lapor dan blokir', '-', 'ya', 'ya'],
  ['Menyetujui usaha dan meninjau produk', '-', '-', 'ya'],
  ['Mengelola laporan, lowongan, pengumuman', '-', '-', 'ya'],
  ['Mengatur urutan Home dan Kontak Ikafe', '-', '-', 'ya'],
  ['Membaca masukan dan riwayat admin', '-', '-', 'ya'],
]

/* ---------- page ---------- */
let n = 0
const total = groups.reduce((a, g) => a + g.screens.length, 0)
const tour = groups
  .map(
    (g) => `<section class="sec ${g.id === 'masuk' || g.id === 'explore' || g.id === 'admin' ? 'alt' : ''}" id="${g.id}"><div class="wrap"><h2>${esc(g.name)}</h2><p class="lead2">${esc(g.intro)}</p>
${g.screens
  .map((s) => {
    n++
    return `<article class="scr"><div class="mockcol">${s.mock}<p class="cap">Tampilan ilustrasi dengan data contoh.</p></div><div class="txt"><span class="no">${n} dari ${total}</span><h3>${esc(s.t)}</h3><span class="role r-${s.role}">${esc(s.role)}</span><p>${esc(s.purpose)}</p><h4>Yang dilakukan pengguna</h4><ul>${s.does.map((d) => `<li>${esc(d)}</li>`).join('')}</ul></div></article>`
  })
  .join('\n')}
</div></section>`,
  )
  .join('\n')

const html = `<!doctype html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Lingkaran, pratinjau desain | Bigma</title>
<meta name="description" content="Pratinjau desain aplikasi jejaring alumni Lingkaran: tujuan, cara kerja, semua halaman, dan peran. Data contoh, bukan aplikasi sebenarnya.">
<meta name="robots" content="noindex">
<link rel="stylesheet" href="style.css"></head><body>
<header class="nav"><div class="wrap navin"><a class="brand" href="#top">Lingkaran <small>pratinjau</small></a><nav><a href="#masalah">Tujuan</a><a href="#cara">Cara kerja</a><a href="#tur">Halaman</a><a href="#peran">Peran</a><a class="cta" href="mailto:businessbigma@gmail.com?subject=Aplikasi%20seperti%20Lingkaran">Hubungi Bigma</a></nav></div></header>
<main id="top">
<section class="hero"><div class="wrap herogrid"><div><span class="eyebrow">Aplikasi jejaring alumni (pratinjau desain)</span><h1>Alumni saling kenal, saling bantu, saling maju.</h1><p class="lead">Lingkaran mempertemukan alumni terverifikasi dalam satu tempat: direktori, lowongan, usaha dan produk alumni, serta permintaan kontak tanpa chat. Gratis, tanpa pembayaran di aplikasi.</p><div class="tags"><span>Members</span><span>Marketplace</span><span>Business</span><span>Jobs</span><span>Admin</span></div><div class="actions"><a class="btn" href="#tur">Lihat semua halaman</a><a class="btn ghost" href="mailto:businessbigma@gmail.com?subject=Aplikasi%20seperti%20Lingkaran">Hubungi Bigma</a></div></div><div class="herophone">${groups[1].screens[0].mock}</div></div></section>

<section class="sec" id="masalah"><div class="wrap"><h2>Tujuan aplikasi</h2><div class="two-col"><div class="box"><h3>Tanpa Lingkaran</h3><ul><li>Data alumni tersebar di grup chat dan daftar yang cepat usang.</li><li>Lowongan dan usaha alumni sulit ditemukan.</li><li>Nomor pribadi dibagikan sembarangan.</li><li>Pengelola sulit memantau konten yang bermasalah.</li></ul></div><div class="box good"><h3>Dengan Lingkaran</h3><ul><li>Masuk dengan email terdaftar dan kode 6 digit.</li><li>Satu direktori yang bisa dicari dan disaring.</li><li>Lowongan dan usaha alumni dalam satu tab Explore.</li><li>Kontak dibagikan bila pemiliknya setuju.</li><li>Admin bisa menyetujui, menyembunyikan, dan menangguhkan.</li></ul></div></div></div></section>

<section class="sec alt" id="cara"><div class="wrap"><h2>Cara kerja</h2><ol class="steps"><li><b>1</b><div><h3>Verifikasi</h3><p>Isi email terdaftar, masukkan kode 6 digit, setujui kebijakan.</p></div></li><li><b>2</b><div><h3>Lengkapi profil</h3><p>Foto, pekerjaan, kota, dan kontak yang boleh dibagikan.</p></div></li><li><b>3</b><div><h3>Jelajahi</h3><p>Cari alumni, lowongan, usaha, dan produk.</p></div></li><li><b>4</b><div><h3>Terhubung</h3><p>Kirim permintaan kontak, melamar, atau hubungi penjual.</p></div></li></ol></div></section>

<section class="sec" id="tur"><div class="wrap"><h2>Tur halaman</h2><p class="lead2">${total} layar dalam ${groups.length} kelompok. Semua tampilan di bawah adalah gambar contoh, bukan aplikasi yang bisa dipakai.</p><div class="jump">${groups.map((g) => `<a href="#${g.id}">${esc(g.name)}</a>`).join('')}</div></div></section>
${tour}

<section class="sec" id="peran"><div class="wrap"><h2>Peran pengguna</h2><div class="roles"><div class="box"><h3>Pengunjung</h3><p>Belum terverifikasi. Hanya melihat Welcome dan Verifikasi.</p></div><div class="box"><h3>Anggota</h3><p>Alumni terverifikasi. Bisa juga menjadi pemilik usaha, pemasang lowongan, atau pelamar tanpa akun terpisah.</p></div><div class="box"><h3>Admin</h3><p>Anggota dengan alat tambahan untuk menjaga kualitas dan keamanan komunitas.</p></div></div>
<div class="tablewrap"><table><thead><tr><th>Kemampuan</th><th>Pengunjung</th><th>Anggota</th><th>Admin</th></tr></thead><tbody>${roleRows.map((r) => `<tr><td>${esc(r[0])}</td>${r.slice(1).map((c) => `<td>${c === 'ya' ? '✓' : '·'}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></section>

<section class="sec alt" id="manfaat"><div class="wrap"><h2>Prinsip rancangan</h2><div class="stats"><div><b>0</b><span>pembayaran di dalam aplikasi</span></div><div><b>1</b><span>pemilik kontak yang memutuskan berbagi</span></div><div><b>9</b><span>alat admin untuk menjaga komunitas</span></div></div></div></section>

<section class="sec dark" id="hubungi"><div class="wrap"><h2>Ingin aplikasi seperti ini untuk komunitas Anda?</h2><p class="lead">Bigma membuat aplikasi custom untuk komunitas, organisasi, dan bisnis. Ceritakan kebutuhan Anda.</p><a class="btn" href="mailto:businessbigma@gmail.com?subject=Aplikasi%20seperti%20Lingkaran">Hubungi Bigma</a></div></section>
</main>
<footer class="footer"><div class="wrap"><p>Pratinjau desain oleh Bigma. Ini bukan aplikasi yang sebenarnya dan tidak ada login. Semua nama, angka, usaha, dan lowongan adalah contoh yang dibuat sendiri; tidak ada data anggota asli. Bukan identitas resmi UNDIP atau Ikafe.</p></div></footer>
</body></html>`

writeFileSync(new URL('./index.html', import.meta.url), html)
console.log('screens:', total, 'bytes:', html.length)
