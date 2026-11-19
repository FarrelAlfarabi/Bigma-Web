/* Form Kebutuhan Bigma. Plain JS, no framework. Indonesian (default) and English.
   Everything sent to Bigma (the Sheet, email, WhatsApp text) uses the Indonesian labels,
   whichever language the visitor sees. */
import { currentLang, saveLang } from '../lang.js'

var WA = "6281536096663";
var lang = currentLang();
var saved = null;
function srcName() { try { var q = new URLSearchParams(location.search); return (q.get("src") || q.get("utm_source") || "").toLowerCase().slice(0, 40) } catch (e) { return "" } }

/* ---------- text ---------- */
var TX = {
  id: {
    title: "Ceritakan Kebutuhan | Bigma", thanksTitle: "Terima kasih | Bigma",
    back: "Kembali", start: "Mulai", next: "Lanjut", skip: "Lewati", send: "Kirim", sending: "Mengirim...",
    stepOf: function (n) { return n + " dari 8" }, whyLabel: "Kenapa kami tanya ini?",
    wTitle: "Ceritakan kebutuhan Anda",
    wSub: "Ini formulir singkat untuk mengenalkan usaha dan masalah Anda ke tim Bigma. Dari jawaban Anda, kami menyiapkan saran awal software yang cocok, lalu membalas lewat WhatsApp.",
    wPts: ["Sekitar 3 menit, 8 pertanyaan singkat", "Cukup ketuk pilihan. Tidak perlu istilah teknis, login, atau pasang aplikasi", "Belum yakin mau apa? Kami tunjukkan contoh idenya", "Setelah dikirim, kami baca dan balas lewat WhatsApp, tanpa kewajiban"],
    s1: "Usaha Anda di bidang apa?", s1why: "Agar kami tahu contoh dan fitur yang relevan dengan bidang Anda.", s1sub: "Pilih yang paling dekat.",
    usahaLbl: "Nama usaha (boleh dikosongkan)", usahaPh: "Contoh: Toko Maju Jaya",
    s2: "Apa yang paling merepotkan sekarang?", s2why: "Ini inti masalah yang ingin kami bantu selesaikan.", s2sub: "Boleh pilih lebih dari satu.",
    s3: "Kalau berhasil, apa yang Anda harapkan?", s3why: "Supaya solusi yang kami sarankan mengejar hasil yang Anda mau, bukan sekadar menambah fitur.", s3sub: "Boleh pilih lebih dari satu.",
    s4: "Mungkin ini cocok untuk Anda", s4why: "Hanya gambaran awal supaya lebih mudah membayangkan. Tidak ada jawaban yang salah dan langkah ini boleh dilewati.", s4sub: "Ketuk yang menarik.",
    s5a: "Siapa yang akan memakainya?", s5awhy: "Jumlah dan jenis pengguna memengaruhi ukuran dan biaya sistem.",
    s5b: "Lebih enak dipakai di mana?", s5bwhy: "Menentukan apakah perlu aplikasi HP, web di komputer, atau keduanya.",
    s6: "Kapan Anda ingin mulai?", s6why: "Untuk mengatur jadwal kerja dan menyiapkan rencana yang realistis.",
    s7: "Kira-kira dana yang disiapkan?", s7why: "Hanya untuk menyesuaikan saran dengan kemampuan Anda. Ini bukan harga final dan tidak mengikat. Tidak tahu juga tidak apa-apa.",
    s8: "Terakhir, agar kami bisa membalas", s8why: "Nomor WhatsApp dipakai hanya untuk membalas jawaban Anda.",
    nama: "Nama Anda", namaPh: "Nama", wa: "Nomor WhatsApp", cat: "Ada hal lain yang ingin disampaikan? (boleh kosong)", catPh: "Contoh: kami punya 3 cabang",
    consent: "Saya setuju jawaban dan nomor WhatsApp saya dikirim dan dicatat oleh Bigma untuk menyiapkan penawaran dan menghubungi saya. Data tidak dibagikan ke pihak lain.",
    err: "Isi nama, nomor WhatsApp, dan centang persetujuan dulu ya.",
    thanks: function (n) { return "Terima kasih, " + n + "!" },
    okSub: "Jawaban Anda sudah kami terima. Kami akan menghubungi Anda lewat WhatsApp. Mau lebih cepat? Kirim ringkasan ini juga lewat WhatsApp.",
    failSub: "Jawaban Anda belum terkirim otomatis. Tidak apa-apa, kirim ringkasan ini lewat WhatsApp dan kami balas dengan saran dan estimasi.",
    reco: "Saran awal kami", recoHint: "Ini baru perkiraan. Detailnya kita bahas bersama.",
    rUsaha: "Usaha", rMasalah: "Masalah", rTujuan: "Tujuan", rIde: "Ide yang menarik", rPD: "Pengguna dan perangkat", rWD: "Waktu dan dana",
    waBtn: "Kirim lewat WhatsApp", copy: "Salin ringkasan", copied: "Tersalin ✓", copyFail: "Tidak bisa menyalin", copyHold: "Tekan lama teks lalu salin",
    home: "Kembali ke beranda Bigma",
    okHint: "Jawaban Anda dikirim ke Bigma hanya untuk menyiapkan penawaran.",
    failHint: "Tidak ada data yang terkirim ke kami. Data terkirim hanya saat Anda menekan tombol WhatsApp.",
    noscript: "Halaman ini perlu JavaScript. Silakan chat kami di WhatsApp 081536096663.",
    greet: "Halo Bigma, saya mengisi form kebutuhan di bigma.id. Ringkasannya:"
  },
  en: {
    title: "Tell Us What You Need | Bigma", thanksTitle: "Thank you | Bigma",
    back: "Back", start: "Start", next: "Next", skip: "Skip", send: "Send", sending: "Sending...",
    stepOf: function (n) { return n + " of 8" }, whyLabel: "Why do we ask?",
    wTitle: "Tell us what you need",
    wSub: "This is a short form to introduce your business and your problem to the Bigma team. From your answers we prepare a first suggestion of software that fits, then reply on WhatsApp.",
    wPts: ["About 3 minutes, 8 short questions", "Just tap the options. No technical terms, login, or app to install", "Not sure what you want? We will show example ideas", "After you send it, we read it and reply on WhatsApp, with no obligation"],
    s1: "What field is your business in?", s1why: "So we know which examples and features are relevant to your field.", s1sub: "Pick the closest one.",
    usahaLbl: "Business name (optional)", usahaPh: "Example: Maju Jaya Store",
    s2: "What is the most troublesome part right now?", s2why: "This is the core problem we want to help solve.", s2sub: "You can pick more than one.",
    s3: "If it works, what do you hope for?", s3why: "So the solution we suggest aims at the result you want, not just more features.", s3sub: "You can pick more than one.",
    s4: "These might suit you", s4why: "Only a first picture to make it easier to imagine. There are no wrong answers and you can skip this step.", s4sub: "Tap the ones that interest you.",
    s5a: "Who will use it?", s5awhy: "The number and type of users affect the size and cost of the system.",
    s5b: "Where would it be easiest to use?", s5bwhy: "Decides whether you need a phone app, a web app on a computer, or both.",
    s6: "When do you want to start?", s6why: "To plan our schedule and prepare a realistic plan.",
    s7: "Roughly what budget do you have in mind?", s7why: "Only to match our suggestion to what you can afford. This is not a final price and is not binding. Not knowing is fine too.",
    s8: "Last, so we can reply to you", s8why: "Your WhatsApp number is used only to reply to your answers.",
    nama: "Your name", namaPh: "Name", wa: "WhatsApp number", cat: "Anything else you would like to tell us? (optional)", catPh: "Example: we have 3 branches",
    consent: "I agree that my answers and WhatsApp number are sent to and recorded by Bigma to prepare an offer and contact me. The data is not shared with anyone else.",
    err: "Please fill in your name and WhatsApp number, and tick the consent box.",
    thanks: function (n) { return "Thank you, " + n + "!" },
    okSub: "We have received your answers. We will contact you on WhatsApp. Want it faster? Send this summary on WhatsApp too.",
    failSub: "Your answers were not sent automatically. That is fine, send this summary on WhatsApp and we will reply with a suggestion and an estimate.",
    reco: "Our first suggestion", recoHint: "This is only a rough idea. We will go through the details together.",
    rUsaha: "Business", rMasalah: "Problem", rTujuan: "Goal", rIde: "Ideas of interest", rPD: "Users and device", rWD: "Timing and budget",
    waBtn: "Send via WhatsApp", copy: "Copy summary", copied: "Copied ✓", copyFail: "Could not copy", copyHold: "Long press the text, then copy",
    home: "Back to Bigma home page",
    okHint: "Your answers are sent to Bigma only to prepare an offer.",
    failHint: "No data was sent to us. Data is sent only when you press the WhatsApp button.",
    noscript: "This page needs JavaScript. Please chat with us on WhatsApp 081536096663.",
    greet: "Hello Bigma, I filled in the needs form on bigma.id. Here is the summary:"
  }
};
function T() { return TX[lang] }

/* ---------- options: k or v is the stable value, id/en are [title, subtitle] ---------- */
var IND = [
  { k: "fmcg", e: "🛒", id: ["FMCG / distributor", "Sales, toko, stok"], en: ["FMCG / distributor", "Sales, stores, stock"] },
  { k: "retail", e: "🏪", id: ["Toko / retail / F&B", "Jual produk atau makanan"], en: ["Shop / retail / F&B", "Selling products or food"] },
  { k: "edu", e: "🎓", id: ["Pendidikan / pelatihan", "Kursus, sekolah, training"], en: ["Education / training", "Courses, schools, training"] },
  { k: "jasa", e: "💼", id: ["Jasa / konsultan", "Klien, jadwal, laporan"], en: ["Services / consulting", "Clients, schedules, reports"] },
  { k: "hr", e: "👥", id: ["HR / kantor", "Absensi, cuti, karyawan"], en: ["HR / office", "Attendance, leave, staff"] },
  { k: "logi", e: "🚚", id: ["Logistik / daur ulang", "Jemput, kirim, limbah"], en: ["Logistics / recycling", "Pickup, delivery, waste"] },
  { k: "komu", e: "🤝", id: ["Komunitas / asosiasi / alumni", "Anggota dan acara"], en: ["Community / association / alumni", "Members and events"] },
  { k: "lain", e: "✨", id: ["Lainnya", "Bidang lain"], en: ["Other", "Another field"] }
];
var PAIN = [
  { k: "manual", e: "📝", id: ["Masih manual", "Kertas, Excel, chat WA"], en: ["Still manual", "Paper, Excel, WhatsApp chats"] },
  { k: "online", e: "🌐", id: ["Belum tampil online", "Tidak ada website"], en: ["Not online yet", "No website"] },
  { k: "lambat", e: "⏳", id: ["Pekerjaan lambat", "Banyak input berulang"], en: ["Work is slow", "Lots of repeated input"] },
  { k: "data", e: "📊", id: ["Data berantakan", "Sulit lihat laporan"], en: ["Messy data", "Hard to see reports"] },
  { k: "kontrol", e: "🔍", id: ["Sulit memantau tim", "Tidak tahu progres"], en: ["Hard to track the team", "No view of progress"] },
  { k: "pelanggan", e: "💬", id: ["Pelanggan sulit dihubungi", "Banyak yang terlewat"], en: ["Customers are hard to reach", "Many are missed"] },
  { k: "skill", e: "🧠", id: ["Tim belum paham AI", "Ingin belajar"], en: ["Team does not know AI yet", "Want to learn"] },
  { k: "tahu", e: "🤷", id: ["Belum tahu pasti", "Ingin dibantu mencari"], en: ["Not sure yet", "Want help finding out"] }
];
var GOAL = [
  { k: "hemat", e: "⏱️", id: ["Hemat waktu", ""], en: ["Save time", ""] },
  { k: "biaya", e: "💰", id: ["Kurangi biaya", ""], en: ["Reduce costs", ""] },
  { k: "jual", e: "📈", id: ["Tambah penjualan", ""], en: ["Increase sales", ""] },
  { k: "rapi", e: "🗂️", id: ["Data rapi dan laporan otomatis", ""], en: ["Tidy data and automatic reports", ""] },
  { k: "citra", e: "⭐", id: ["Tampil lebih profesional", ""], en: ["Look more professional", ""] },
  { k: "aman", e: "🔒", id: ["Kurangi kesalahan dan kecurangan", ""], en: ["Reduce mistakes and fraud", ""] }
];
/* ideas: [emoji, idTitle, idText, enTitle, enText]; the Indonesian title is what gets stored */
var IDEAS = {
  fmcg: [["📍", "Aplikasi sales lapangan", "Absen, kunjungan toko, foto rak, laporan ke manajer. Contoh: Zonein.", "Field sales app", "Check-in, store visits, shelf photos, reports to the manager. Example: Zonein."], ["🧾", "Catat pesanan dari toko", "Sales input order di HP, otomatis masuk rekap.", "Record orders from stores", "Sales enter orders on a phone and they go straight into the summary."], ["📸", "Baca nota dengan AI", "Foto nota, data terbaca otomatis.", "Read receipts with AI", "Take a photo of a receipt and the data is read automatically."], ["📊", "Dasbor penjualan", "Lihat penjualan per area dan per sales.", "Sales dashboard", "See sales by area and by salesperson."]],
  retail: [["🌐", "Website toko dan katalog", "Tampilkan produk, tombol pesan lewat WhatsApp. Contoh: Nomiko.", "Shop website and catalogue", "Show products with an order button on WhatsApp. Example: Nomiko."], ["🛍️", "Pemesanan online", "Pelanggan pesan lewat link, pesanan masuk rapi.", "Online ordering", "Customers order through a link and orders arrive neatly."], ["📦", "Pencatatan stok", "Stok masuk dan keluar tidak lagi di buku.", "Stock records", "Stock in and out no longer lives in a notebook."], ["🤖", "Balasan WhatsApp otomatis", "Jawab pertanyaan yang sering muncul.", "Automatic WhatsApp replies", "Answer the questions that come up often."]],
  edu: [["🎬", "Platform pelatihan online", "Video, kursus, dan ujian untuk peserta.", "Online training platform", "Videos, courses, and tests for participants."], ["📝", "Ujian dan nilai online", "Soal, penilaian, sertifikat.", "Online tests and grades", "Questions, grading, certificates."], ["📅", "Pendaftaran dan jadwal kelas", "Peserta daftar sendiri, jadwal otomatis.", "Class sign-up and schedule", "Participants sign up themselves and the schedule is automatic."], ["🧠", "Pelatihan AI untuk tim", "Pakai AI untuk kerja sehari-hari.", "AI training for the team", "Use AI in everyday work."]],
  jasa: [["🌐", "Website company profile", "Tampil profesional, mudah dihubungi.", "Company profile website", "Look professional and be easy to reach."], ["📅", "Booking janji temu", "Klien pilih jadwal sendiri.", "Appointment booking", "Clients choose their own time."], ["📁", "Portal klien", "Klien lihat progres dan dokumen.", "Client portal", "Clients see progress and documents."], ["⚙️", "Otomatisasi laporan", "Laporan rutin dibuat otomatis.", "Report automation", "Routine reports are made automatically."]],
  hr: [["🕘", "Absensi dan cuti", "Karyawan absen dan ajukan cuti lewat HP.", "Attendance and leave", "Staff check in and request leave on their phones."], ["📂", "Data karyawan", "Semua dokumen di satu tempat.", "Employee records", "All documents in one place."], ["✅", "Alur persetujuan", "Pengajuan disetujui tanpa kertas.", "Approval flow", "Requests are approved without paper."], ["🧠", "Pelatihan AI untuk staf", "Kerja kantor lebih cepat.", "AI training for staff", "Faster office work."]],
  logi: [["🛢️", "Pesan jemput barang", "Pelanggan lapor, petugas menjemput, status terlihat. Contoh: minyak jelantah.", "Pickup requests", "Customers report, staff collect, and the status is visible. Example: used cooking oil."], ["🗺️", "Direktori mitra", "Cari mitra dan pesan ulang dengan cepat.", "Partner directory", "Find partners and reorder quickly."], ["📷", "Bukti foto dan verifikasi", "Foto, dokumen, dan persetujuan tersimpan.", "Photo proof and verification", "Photos, documents, and approvals are saved."], ["🔔", "Notifikasi status", "Pelanggan tahu kapan barang diambil.", "Status notifications", "Customers know when the goods are collected."]],
  komu: [["🤝", "Aplikasi jejaring anggota", "Direktori anggota, permintaan koneksi, profil. Contoh: Lingkaran.", "Member network app", "Member directory, connection requests, profiles. Example: Lingkaran."], ["🌐", "Website organisasi", "Profil, berita, daftar anggota. Contoh: KHN.", "Organisation website", "Profile, news, member list. Example: KHN."], ["🎟️", "Pendaftaran acara", "Peserta daftar dan konfirmasi online.", "Event registration", "Participants register and confirm online."], ["📢", "Pengumuman anggota", "Kabar sampai ke semua anggota.", "Member announcements", "News reaches every member."]],
  lain: [["🌐", "Website", "Profil usaha dan tombol WhatsApp.", "Website", "Business profile and a WhatsApp button."], ["📱", "Aplikasi sesuai kebutuhan", "Web atau HP, dibuat khusus untuk Anda.", "App made to fit", "Web or phone, built just for you."], ["⚙️", "Otomatisasi pekerjaan", "Kurangi kerja berulang dengan AI.", "Work automation", "Cut repeated work with AI."], ["🧠", "Pelatihan AI", "Untuk Anda dan tim.", "AI training", "For you and your team."]]
};
var TIME = [{ v: "Secepatnya", e: "🚀", id: ["Secepatnya", "Dalam 1 bulan"], en: ["As soon as possible", "Within 1 month"] }, { v: "1 sampai 3 bulan", e: "📆", id: ["1 sampai 3 bulan", ""], en: ["1 to 3 months", ""] }, { v: "3 bulan lebih", e: "🗓️", id: ["3 bulan lebih", ""], en: ["More than 3 months", ""] }, { v: "Belum pasti", e: "🧭", id: ["Belum pasti", "Masih mencari tahu"], en: ["Not sure yet", "Still figuring it out"] }];
var BUDG = [{ v: "Di bawah Rp 5 juta", id: ["Di bawah Rp 5 juta", ""], en: ["Under Rp 5 million", ""] }, { v: "Rp 5 sampai 15 juta", id: ["Rp 5 sampai 15 juta", ""], en: ["Rp 5 to 15 million", ""] }, { v: "Rp 15 sampai 50 juta", id: ["Rp 15 sampai 50 juta", ""], en: ["Rp 15 to 50 million", ""] }, { v: "Rp 50 sampai 150 juta", id: ["Rp 50 sampai 150 juta", ""], en: ["Rp 50 to 150 million", ""] }, { v: "Di atas Rp 150 juta", id: ["Di atas Rp 150 juta", ""], en: ["Over Rp 150 million", ""] }, { v: "Belum tahu, mohon saran", id: ["Belum tahu, mohon saran", ""], en: ["Not sure, please advise", ""] }];
var USERS = [{ v: "Hanya saya", id: ["Hanya saya", ""], en: ["Only me", ""] }, { v: "2 sampai 10 orang", id: ["2 sampai 10 orang", ""], en: ["2 to 10 people", ""] }, { v: "11 sampai 50 orang", id: ["11 sampai 50 orang", ""], en: ["11 to 50 people", ""] }, { v: "Lebih dari 50 orang", id: ["Lebih dari 50 orang", ""], en: ["More than 50 people", ""] }, { v: "Pelanggan umum", id: ["Pelanggan umum", ""], en: ["The general public", ""] }];
var DEV = [{ v: "Aplikasi di HP", e: "📱", id: ["Aplikasi di HP", ""], en: ["App on a phone", ""] }, { v: "Web di komputer", e: "💻", id: ["Web di komputer", ""], en: ["Web on a computer", ""] }, { v: "Keduanya", e: "🌐", id: ["Keduanya", ""], en: ["Both", ""] }, { v: "Belum tahu", e: "🤷", id: ["Belum tahu", ""], en: ["Not sure", ""] }];
var RECO_EN = { "Website": "Website", "Aplikasi custom": "Custom app", "Otomatisasi AI": "AI automation", "Pelatihan AI": "AI training", "Sesi konsultasi untuk mencari yang paling cocok": "A consultation session to find what fits best" };

var S = { ind: null, pain: [], goal: [], ideas: [], users: null, dev: null, time: null, budget: null, nama: "", usaha: "", wa: "", cat: "", consent: false, hp: "" };
var step = 0;
var STEPS = ["welcome", "usaha", "pain", "goal", "ideas", "skala", "waktu", "budget", "kontak", "hasil"];
var app = document.getElementById("app"), nextB = document.getElementById("next"), backB = document.getElementById("back");

function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] }) }
function idLbl(list, k) { for (var i = 0; i < list.length; i++) if (list[i].k === k) return list[i].id[0]; return "" }
function lbl(list, k) { for (var i = 0; i < list.length; i++) if (list[i].k === k) return list[i][lang][0]; return "" }
function why(txt) { return '<p class="why"><b>' + T().whyLabel + '</b> ' + txt + '</p>' }
function cards(list, key, multi) {
  return '<div class="grid">' + list.map(function (o) {
    var sel = multi ? S[key].indexOf(o.k) > -1 : S[key] === o.k, x = o[lang];
    return '<button type="button" class="opt' + (sel ? ' sel' : '') + '" data-k="' + o.k + '" data-key="' + key + '" data-m="' + (multi ? 1 : 0) + '"><span class="e">' + o.e + '</span><b>' + x[0] + '</b>' + (x[1] ? '<small>' + x[1] + '</small>' : '') + '</button>'
  }).join("") + '</div>'
}
function simple(arr, key) {
  return '<div class="grid one">' + arr.map(function (o) {
    var x = o[lang];
    return '<button type="button" class="opt' + (S[key] === o.v ? ' sel' : '') + '" data-v="' + esc(o.v) + '" data-key="' + key + '" data-s="1">' + (o.e ? '<span class="e" style="display:inline;margin-right:8px">' + o.e + '</span>' : '') + '<b style="display:inline">' + x[0] + '</b>' + (x[1] ? '<small>' + x[1] + '</small>' : '') + '</button>'
  }).join("") + '</div>'
}
function ideaList() {
  var k = S.ind || "lain", arr = IDEAS[k].slice();
  if (k !== "lain") arr = arr.concat(IDEAS.lain.slice(0, 2));
  return '<div class="grid one">' + arr.map(function (o) {
    var sel = S.ideas.indexOf(o[1]) > -1, en = lang === "en";
    return '<button type="button" class="opt idea' + (sel ? ' sel' : '') + '" data-idea="' + esc(o[1]) + '"><span class="e">' + o[0] + '</span><span><b>' + (en ? o[3] : o[1]) + '</b><small>' + (en ? o[4] : o[2]) + '</small></span></button>'
  }).join("") + '</div>'
}
function ideaShown(idTitle) { if (lang !== "en") return idTitle; for (var k in IDEAS) for (var i = 0; i < IDEAS[k].length; i++) if (IDEAS[k][i][1] === idTitle) return IDEAS[k][i][3]; return idTitle }
function reco() {
  var r = [], p = S.pain, t = S.ideas.join(" ").toLowerCase();
  var web = /website|katalog|company profile|online/.test(t) || p.indexOf("online") > -1 || S.ind === "jasa" && !p.length;
  var app2 = /aplikasi|platform|portal|absensi|stok|pemesanan|pesan|dasbor|booking|pendaftaran/.test(t) || p.indexOf("manual") > -1 || p.indexOf("kontrol") > -1 || p.indexOf("lambat") > -1;
  var ai = /ai|otomatis|baca nota|balasan/.test(t) || p.indexOf("data") > -1;
  var tr = /pelatihan ai/.test(t) || p.indexOf("skill") > -1;
  if (web) r.push("Website"); if (app2) r.push("Aplikasi custom"); if (ai) r.push("Otomatisasi AI"); if (tr) r.push("Pelatihan AI");
  if (!r.length) r.push("Sesi konsultasi untuk mencari yang paling cocok");
  return r
}
function recoShown(r) { return lang === "en" ? RECO_EN[r] || r : r }
function summaryText() {
  var L = [];
  L.push(TX[lang].greet);
  L.push("");
  L.push("Nama: " + (S.nama || "-")); L.push("WhatsApp: " + (S.wa || "-"));
  L.push("Usaha: " + (S.usaha || "-"));
  L.push("Bidang: " + (S.ind ? idLbl(IND, S.ind) : "-"));
  L.push("Masalah: " + (S.pain.length ? S.pain.map(function (k) { return idLbl(PAIN, k) }).join(", ") : "-"));
  L.push("Tujuan: " + (S.goal.length ? S.goal.map(function (k) { return idLbl(GOAL, k) }).join(", ") : "-"));
  L.push("Ide yang menarik: " + (S.ideas.length ? S.ideas.join("; ") : "-"));
  L.push("Pengguna: " + (S.users || "-") + " | Perangkat: " + (S.dev || "-"));
  L.push("Waktu: " + (S.time || "-"));
  L.push("Kisaran dana: " + (S.budget || "-"));
  if (S.cat) L.push("Catatan: " + S.cat);
  L.push("Saran awal: " + reco().join(", "));
  L.push("Bahasa: " + (lang === "en" ? "English" : "Indonesia"));
  return L.join("\n")
}
function optLabel(arr, v) { for (var i = 0; i < arr.length; i++) if (arr[i].v === v) return arr[i][lang][0]; return v || "" }

function render() {
  var id = STEPS[step], h = "", t = T();
  document.documentElement.lang = lang;
  document.title = id === "hasil" ? t.thanksTitle : t.title;
  document.getElementById("nav").style.display = id === "hasil" ? "none" : "";
  [].forEach.call(document.querySelectorAll(".lang button"), function (b) { b.setAttribute("aria-pressed", b.getAttribute("lang") === lang ? "true" : "false") });
  backB.textContent = t.back;
  backB.style.visibility = (step === 0) ? "hidden" : "visible";
  document.getElementById("pb").style.width = Math.round(step / (STEPS.length - 1) * 100) + "%";
  nextB.disabled = false; nextB.textContent = t.next;
  if (id === "welcome") {
    h = '<div class="hero"><img alt="Bigma" src="/brand/icon.svg" width="96" height="96"></div><h1>' + t.wTitle + '</h1><p class="sub">' + t.wSub + '</p><ul class="pts">' + t.wPts.map(function (x) { return '<li>' + x + '</li>' }).join("") + '</ul>';
    nextB.textContent = t.start
  }
  if (id === "usaha") {
    h = '<p class="eyebrow">' + t.stepOf(1) + '</p><h2>' + t.s1 + '</h2>' + why(t.s1why) + '<p class="sub">' + t.s1sub + '</p>' + cards(IND, "ind", false) + '<label class="f" for="usaha">' + t.usahaLbl + '</label><input id="usaha" type="text" placeholder="' + esc(t.usahaPh) + '" value="' + esc(S.usaha) + '">';
    nextB.disabled = !S.ind
  }
  if (id === "pain") { h = '<p class="eyebrow">' + t.stepOf(2) + '</p><h2>' + t.s2 + '</h2>' + why(t.s2why) + '<p class="sub">' + t.s2sub + '</p>' + cards(PAIN, "pain", true); nextB.disabled = !S.pain.length }
  if (id === "goal") { h = '<p class="eyebrow">' + t.stepOf(3) + '</p><h2>' + t.s3 + '</h2>' + why(t.s3why) + '<p class="sub">' + t.s3sub + '</p>' + cards(GOAL, "goal", true); nextB.disabled = !S.goal.length }
  if (id === "ideas") { h = '<p class="eyebrow">' + t.stepOf(4) + '</p><h2>' + t.s4 + '</h2>' + why(t.s4why) + '<p class="sub">' + t.s4sub + '</p>' + ideaList(); nextB.textContent = S.ideas.length ? t.next : t.skip }
  if (id === "skala") {
    h = '<p class="eyebrow">' + t.stepOf(5) + '</p><h2>' + t.s5a + '</h2>' + why(t.s5awhy) + simple(USERS, "users") + '<h2 style="margin-top:22px">' + t.s5b + '</h2>' + why(t.s5bwhy) + simple(DEV, "dev");
    nextB.disabled = !(S.users && S.dev)
  }
  if (id === "waktu") { h = '<p class="eyebrow">' + t.stepOf(6) + '</p><h2>' + t.s6 + '</h2>' + why(t.s6why) + simple(TIME, "time"); nextB.disabled = !S.time }
  if (id === "budget") { h = '<p class="eyebrow">' + t.stepOf(7) + '</p><h2>' + t.s7 + '</h2>' + why(t.s7why) + simple(BUDG, "budget"); nextB.disabled = !S.budget }
  if (id === "kontak") {
    h = '<p class="eyebrow">' + t.stepOf(8) + '</p><h2>' + t.s8 + '</h2>' + why(t.s8why) + '<label class="f" for="nama">' + t.nama + '</label><input id="nama" type="text" autocomplete="name" value="' + esc(S.nama) + '" placeholder="' + esc(t.namaPh) + '"><label class="f" for="wa">' + t.wa + '</label><input id="wa" type="tel" inputmode="tel" autocomplete="tel" value="' + esc(S.wa) + '" placeholder="08xxxxxxxxxx"><label class="f" for="cat">' + t.cat + '</label><textarea id="cat" placeholder="' + esc(t.catPh) + '">' + esc(S.cat) + '</textarea><div class="hpw" aria-hidden="true"><label for="website">Website</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off"></div><label class="chk"><input type="checkbox" id="consent"' + (S.consent ? ' checked' : '') + '><span>' + t.consent + '</span></label><div class="err" id="err">' + t.err + '</div>';
    nextB.textContent = t.send
  }
  if (id === "hasil") {
    var r = reco(), txt = summaryText();
    h = '<div style="text-align:center;font-size:40px">🎉</div><h2 style="text-align:center">' + t.thanks(esc(S.nama || "")) + '</h2><p class="sub" style="text-align:center">' + (saved ? t.okSub : t.failSub) + '</p><div class="reco"><b>' + t.reco + '</b>' + r.map(function (x) { return '<span class="tag">' + recoShown(x) + '</span>' }).join("") + '<div class="hint">' + t.recoHint + '</div></div><dl class="sum"><dt>' + t.rUsaha + '</dt><dd>' + esc((S.usaha || "-") + " (" + lbl(IND, S.ind) + ")") + '</dd><dt>' + t.rMasalah + '</dt><dd>' + esc(S.pain.map(function (k) { return lbl(PAIN, k) }).join(", ")) + '</dd><dt>' + t.rTujuan + '</dt><dd>' + esc(S.goal.map(function (k) { return lbl(GOAL, k) }).join(", ")) + '</dd><dt>' + t.rIde + '</dt><dd>' + esc(S.ideas.map(ideaShown).join("; ") || "-") + '</dd><dt>' + t.rPD + '</dt><dd>' + esc(optLabel(USERS, S.users) + " | " + optLabel(DEV, S.dev)) + '</dd><dt>' + t.rWD + '</dt><dd>' + esc(optLabel(TIME, S.time) + " | " + optLabel(BUDG, S.budget)) + '</dd></dl><a class="btn wa" id="wal" href="https://wa.me/' + WA + '?text=' + encodeURIComponent(txt) + '" target="_blank" rel="noopener">' + t.waBtn + '</a><button class="btn c" id="copy" type="button">' + t.copy + '</button><a class="btn home" href="/">' + t.home + '</a><div class="hint" style="text-align:center">' + (saved ? t.okHint : t.failHint) + '</div><p class="foot">Bigma, Jakarta<br>businessbigma@gmail.com · WhatsApp 081536096663</p>'
  }
  app.innerHTML = '<section class="step on">' + h + '</section>';
  window.scrollTo(0, 0);
  var c = document.getElementById("copy");
  if (c) c.onclick = function () { var tx = summaryText(); if (navigator.clipboard) navigator.clipboard.writeText(tx).then(function () { c.textContent = t.copied }, function () { c.textContent = t.copyFail }); else { c.textContent = t.copyHold } }
}
function read() { var u = document.getElementById("usaha"); if (u) S.usaha = u.value.trim(); var n = document.getElementById("nama"); if (n) S.nama = n.value.trim(); var w = document.getElementById("wa"); if (w) S.wa = w.value.trim(); var c = document.getElementById("cat"); if (c) S.cat = c.value.trim(); var h = document.getElementById("website"); if (h) S.hp = h.value; var k = document.getElementById("consent"); if (k) S.consent = k.checked }
app.addEventListener("click", function (e) {
  var b = e.target.closest("button.opt"); if (!b) return; read();
  if (b.dataset.idea !== undefined) { var i = S.ideas.indexOf(b.dataset.idea); if (i > -1) S.ideas.splice(i, 1); else S.ideas.push(b.dataset.idea); b.classList.toggle("sel"); nextB.textContent = S.ideas.length ? T().next : T().skip; return }
  var key = b.dataset.key;
  if (b.dataset.s) { S[key] = b.dataset.v;[].forEach.call(b.parentNode.children, function (c) { c.classList.remove("sel") }); b.classList.add("sel"); nextB.disabled = !(STEPS[step] === "skala" ? (S.users && S.dev) : true); return }
  if (b.dataset.m === "1") { var a = S[key], j = a.indexOf(b.dataset.k); if (j > -1) a.splice(j, 1); else a.push(b.dataset.k); b.classList.toggle("sel"); nextB.disabled = !a.length; return }
  S[key] = b.dataset.k; if (key === "ind") S.ideas = [];[].forEach.call(b.parentNode.children, function (c) { c.classList.remove("sel") }); b.classList.add("sel"); nextB.disabled = false
});
nextB.onclick = function () {
  read();
  if (STEPS[step] === "kontak") {
    if (!S.nama || S.wa.replace(/\D/g, "").length < 8 || !S.consent) { document.getElementById("err").style.display = "block"; return }
    nextB.disabled = true; nextB.textContent = T().sending;
    submit().then(function (ok) { saved = ok; step++; render() }); return
  }
  step++; render()
};
function submit() {
  var ctl = new AbortController(), t = setTimeout(function () { ctl.abort() }, 8000);
  var body = {
    nama: S.nama, whatsapp: S.wa, usaha: S.usaha, bidang: S.ind ? idLbl(IND, S.ind) : "",
    masalah: S.pain.map(function (k) { return idLbl(PAIN, k) }), tujuan: S.goal.map(function (k) { return idLbl(GOAL, k) }),
    ide: S.ideas, pengguna: S.users || "", perangkat: S.dev || "", waktu: S.time || "", dana: S.budget || "", catatan: S.cat,
    saran: reco(), sumber: srcName() + (lang === "en" ? " (en)" : ""), persetujuan: S.consent, website: S.hp
  };
  return fetch("/api/kebutuhan", { method: "POST", signal: ctl.signal, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(function (r) { clearTimeout(t); return r.ok }, function () { clearTimeout(t); return false })
}
backB.onclick = function () { read(); if (step > 0) { step--; render() } };
[].forEach.call(document.querySelectorAll(".lang button"), function (b) {
  b.onclick = function () { read(); lang = b.getAttribute("lang"); saveLang(lang); render() }
});
render();
