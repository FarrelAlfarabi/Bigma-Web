/* Form Kebutuhan Bigma. Plain JS, no framework. */

var WA="6281536096663";
var saved=null;
function srcName(){try{var q=new URLSearchParams(location.search);return (q.get("src")||q.get("utm_source")||"").toLowerCase().slice(0,40)}catch(e){return""}}
var IND=[
 {k:"fmcg",e:"🛒",t:"FMCG / distributor",s:"Sales, toko, stok"},
 {k:"retail",e:"🏪",t:"Toko / retail / F&B",s:"Jual produk atau makanan"},
 {k:"edu",e:"🎓",t:"Pendidikan / pelatihan",s:"Kursus, sekolah, training"},
 {k:"jasa",e:"💼",t:"Jasa / konsultan",s:"Klien, jadwal, laporan"},
 {k:"hr",e:"👥",t:"HR / kantor",s:"Absensi, cuti, karyawan"},
 {k:"logi",e:"🚚",t:"Logistik / daur ulang",s:"Jemput, kirim, limbah"},
 {k:"komu",e:"🤝",t:"Komunitas / asosiasi / alumni",s:"Anggota dan acara"},
 {k:"lain",e:"✨",t:"Lainnya",s:"Bidang lain"}
];
var PAIN=[
 {k:"manual",e:"📝",t:"Masih manual",s:"Kertas, Excel, chat WA"},
 {k:"online",e:"🌐",t:"Belum tampil online",s:"Tidak ada website"},
 {k:"lambat",e:"⏳",t:"Pekerjaan lambat",s:"Banyak input berulang"},
 {k:"data",e:"📊",t:"Data berantakan",s:"Sulit lihat laporan"},
 {k:"kontrol",e:"🔍",t:"Sulit memantau tim",s:"Tidak tahu progres"},
 {k:"pelanggan",e:"💬",t:"Pelanggan sulit dihubungi",s:"Banyak yang terlewat"},
 {k:"skill",e:"🧠",t:"Tim belum paham AI",s:"Ingin belajar"},
 {k:"tahu",e:"🤷",t:"Belum tahu pasti",s:"Ingin dibantu mencari"}
];
var GOAL=[
 {k:"hemat",e:"⏱️",t:"Hemat waktu"},
 {k:"biaya",e:"💰",t:"Kurangi biaya"},
 {k:"jual",e:"📈",t:"Tambah penjualan"},
 {k:"rapi",e:"🗂️",t:"Data rapi dan laporan otomatis"},
 {k:"citra",e:"⭐",t:"Tampil lebih profesional"},
 {k:"aman",e:"🔒",t:"Kurangi kesalahan dan kecurangan"}
];
var IDEAS={
 fmcg:[["📍","Aplikasi sales lapangan","Absen, kunjungan toko, foto rak, laporan ke manajer. Contoh: Zonein."],["🧾","Catat pesanan dari toko","Sales input order di HP, otomatis masuk rekap."],["📸","Baca nota dengan AI","Foto nota, data terbaca otomatis."],["📊","Dasbor penjualan","Lihat penjualan per area dan per sales."]],
 retail:[["🌐","Website toko dan katalog","Tampilkan produk, tombol pesan lewat WhatsApp. Contoh: Nomiko."],["🛍️","Pemesanan online","Pelanggan pesan lewat link, pesanan masuk rapi."],["📦","Pencatatan stok","Stok masuk dan keluar tidak lagi di buku."],["🤖","Balasan WhatsApp otomatis","Jawab pertanyaan yang sering muncul."]],
 edu:[["🎬","Platform pelatihan online","Video, kursus, dan ujian untuk peserta."],["📝","Ujian dan nilai online","Soal, penilaian, sertifikat."],["📅","Pendaftaran dan jadwal kelas","Peserta daftar sendiri, jadwal otomatis."],["🧠","Pelatihan AI untuk tim","Pakai AI untuk kerja sehari-hari."]],
 jasa:[["🌐","Website company profile","Tampil profesional, mudah dihubungi."],["📅","Booking janji temu","Klien pilih jadwal sendiri."],["📁","Portal klien","Klien lihat progres dan dokumen."],["⚙️","Otomatisasi laporan","Laporan rutin dibuat otomatis."]],
 hr:[["🕘","Absensi dan cuti","Karyawan absen dan ajukan cuti lewat HP."],["📂","Data karyawan","Semua dokumen di satu tempat."],["✅","Alur persetujuan","Pengajuan disetujui tanpa kertas."],["🧠","Pelatihan AI untuk staf","Kerja kantor lebih cepat."]],
 logi:[["🛢️","Pesan jemput barang","Pelanggan lapor, petugas menjemput, status terlihat. Contoh: minyak jelantah."],["🗺️","Direktori mitra","Cari mitra dan pesan ulang dengan cepat."],["📷","Bukti foto dan verifikasi","Foto, dokumen, dan persetujuan tersimpan."],["🔔","Notifikasi status","Pelanggan tahu kapan barang diambil."]],
 komu:[["🤝","Aplikasi jejaring anggota","Direktori anggota, permintaan koneksi, profil. Contoh: Lingkaran."],["🌐","Website organisasi","Profil, berita, daftar anggota. Contoh: KHN."],["🎟️","Pendaftaran acara","Peserta daftar dan konfirmasi online."],["📢","Pengumuman anggota","Kabar sampai ke semua anggota."]],
 lain:[["🌐","Website","Profil usaha dan tombol WhatsApp."],["📱","Aplikasi sesuai kebutuhan","Web atau HP, dibuat khusus untuk Anda."],["⚙️","Otomatisasi pekerjaan","Kurangi kerja berulang dengan AI."],["🧠","Pelatihan AI","Untuk Anda dan tim."]]
};
var TIME=[["🚀","Secepatnya","Dalam 1 bulan"],["📆","1 sampai 3 bulan",""],["🗓️","3 bulan lebih",""],["🧭","Belum pasti","Masih mencari tahu"]];
var BUDG=[["Di bawah Rp 5 juta"],["Rp 5 sampai 15 juta"],["Rp 15 sampai 50 juta"],["Rp 50 sampai 150 juta"],["Di atas Rp 150 juta"],["Belum tahu, mohon saran"]];
var USERS=[["Hanya saya"],["2 sampai 10 orang"],["11 sampai 50 orang"],["Lebih dari 50 orang"],["Pelanggan umum"]];
var DEV=[["📱","Aplikasi di HP"],["💻","Web di komputer"],["🌐","Keduanya"],["🤷","Belum tahu"]];
var S={ind:null,pain:[],goal:[],ideas:[],users:null,dev:null,time:null,budget:null,nama:"",usaha:"",wa:"",cat:"",consent:false,hp:""};
var step=0;
var STEPS=["welcome","usaha","pain","goal","ideas","skala","waktu","budget","kontak","hasil"];
var app=document.getElementById("app"),nextB=document.getElementById("next"),backB=document.getElementById("back");
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function lbl(list,k){for(var i=0;i<list.length;i++)if(list[i].k===k)return list[i].t;return""}
function cards(list,key,multi,cols){
 return '<div class="grid'+(cols===1?' one':'')+'">'+list.map(function(o){
  var sel=multi?S[key].indexOf(o.k)>-1:S[key]===o.k;
  return '<button type="button" class="opt'+(sel?' sel':'')+'" data-k="'+o.k+'" data-key="'+key+'" data-m="'+(multi?1:0)+'"><span class="e">'+o.e+'</span><b>'+o.t+'</b>'+(o.s?'<small>'+o.s+'</small>':'')+'</button>'}).join("")+'</div>'}
function simple(arr,key,emoji){
 return '<div class="grid one">'+arr.map(function(o){var v=o[o.length>2?1:0];var t=o.length>2?o[1]:o[0];var e=emoji?o[0]:"";var sub=o.length>2?o[2]:"";var val=t;
  return '<button type="button" class="opt'+(S[key]===val?' sel':'')+'" data-v="'+esc(val)+'" data-key="'+key+'" data-s="1">'+(e?'<span class="e" style="display:inline;margin-right:8px">'+e+'</span>':'')+'<b style="display:inline">'+t+'</b>'+(sub?'<small>'+sub+'</small>':'')+'</button>'}).join("")+'</div>'}
function ideaList(){
 var k=S.ind||"lain";var arr=IDEAS[k].slice();
 if(k!=="lain")arr=arr.concat(IDEAS.lain.slice(0,2));
 return '<div class="grid one">'+arr.map(function(o){var sel=S.ideas.indexOf(o[1])>-1;
  return '<button type="button" class="opt idea'+(sel?' sel':'')+'" data-idea="'+esc(o[1])+'"><span class="e">'+o[0]+'</span><span><b>'+o[1]+'</b><small>'+o[2]+'</small></span></button>'}).join("")+'</div>'}
function reco(){
 var r=[],p=S.pain,t=S.ideas.join(" ").toLowerCase();
 var web=/website|katalog|company profile|online/.test(t)||p.indexOf("online")>-1||S.ind==="jasa"&&!p.length;
 var app2=/aplikasi|platform|portal|absensi|stok|pemesanan|pesan|dasbor|booking|pendaftaran/.test(t)||p.indexOf("manual")>-1||p.indexOf("kontrol")>-1||p.indexOf("lambat")>-1;
 var ai=/ai|otomatis|baca nota|balasan/.test(t)||p.indexOf("data")>-1;
 var tr=/pelatihan ai/.test(t)||p.indexOf("skill")>-1;
 if(web)r.push("Website");if(app2)r.push("Aplikasi custom");if(ai)r.push("Otomatisasi AI");if(tr)r.push("Pelatihan AI");
 if(!r.length)r.push("Sesi konsultasi gratis untuk mencari yang paling cocok");
 return r}
function summaryText(){
 var L=[];
 L.push("Halo Bigma, saya mengisi form kebutuhan di bigma.id. Ringkasannya:");
 L.push("");
 L.push("Nama: "+(S.nama||"-"));L.push("WhatsApp: "+(S.wa||"-"));
 L.push("Usaha: "+(S.usaha||"-"));
 L.push("Bidang: "+(S.ind?lbl(IND,S.ind):"-"));
 L.push("Masalah: "+(S.pain.length?S.pain.map(function(k){return lbl(PAIN,k)}).join(", "):"-"));
 L.push("Tujuan: "+(S.goal.length?S.goal.map(function(k){return lbl(GOAL,k)}).join(", "):"-"));
 L.push("Ide yang menarik: "+(S.ideas.length?S.ideas.join("; "):"-"));
 L.push("Pengguna: "+(S.users||"-")+" | Perangkat: "+(S.dev||"-"));
 L.push("Waktu: "+(S.time||"-"));
 L.push("Kisaran dana: "+(S.budget||"-"));
 if(S.cat)L.push("Catatan: "+S.cat);
 L.push("Saran awal: "+reco().join(", "));
 return L.join("\n")}
function render(){
 var id=STEPS[step],h="";
 backB.style.visibility=(step===0)?"hidden":"visible";
 document.getElementById("pb").style.width=Math.round(step/(STEPS.length-1)*100)+"%";
 nextB.disabled=false;nextB.textContent="Lanjut";
 if(id==="welcome"){
  h='<div class="hero"><img alt="Bigma" src="/brand/icon.svg" width="96" height="96"></div><h1>Ceritakan kebutuhan Anda</h1><p class="sub">Tidak perlu tahu istilah teknis. Cukup ketuk pilihan yang paling mirip dengan situasi Anda.</p><ul class="pts"><li>Sekitar 3 menit, 8 pertanyaan singkat</li><li>Tidak perlu login atau pasang aplikasi</li><li>Belum yakin mau apa? Kami tunjukkan contoh idenya</li></ul>';
  nextB.textContent="Mulai"}
 if(id==="usaha"){
  h='<p class="eyebrow">1 dari 8</p><h2>Usaha Anda di bidang apa?</h2><p class="sub">Pilih yang paling dekat.</p>'+cards(IND,"ind",false)+'<label class="f" for="usaha">Nama usaha (boleh dikosongkan)</label><input id="usaha" type="text" placeholder="Contoh: Toko Maju Jaya" value="'+esc(S.usaha)+'">';
  nextB.disabled=!S.ind}
 if(id==="pain"){
  h='<p class="eyebrow">2 dari 8</p><h2>Apa yang paling merepotkan sekarang?</h2><p class="sub">Boleh pilih lebih dari satu.</p>'+cards(PAIN,"pain",true);
  nextB.disabled=!S.pain.length}
 if(id==="goal"){
  h='<p class="eyebrow">3 dari 8</p><h2>Kalau berhasil, apa yang Anda harapkan?</h2><p class="sub">Boleh pilih lebih dari satu.</p>'+cards(GOAL,"goal",true);
  nextB.disabled=!S.goal.length}
 if(id==="ideas"){
  h='<p class="eyebrow">4 dari 8</p><h2>Mungkin ini cocok untuk Anda</h2><p class="sub">Ketuk yang menarik. Tidak ada yang salah, ini hanya gambaran awal. Boleh dilewati.</p>'+ideaList();
  nextB.textContent=S.ideas.length?"Lanjut":"Lewati"}
 if(id==="skala"){
  h='<p class="eyebrow">5 dari 8</p><h2>Siapa yang akan memakainya?</h2>'+simple(USERS.map(function(u){return[u[0]]}),"users",false)+'<h2 style="margin-top:22px">Lebih enak dipakai di mana?</h2>'+simple(DEV.map(function(d){return[d[0],d[1],""]}),"dev",true);
  nextB.disabled=!(S.users&&S.dev)}
 if(id==="waktu"){
  h='<p class="eyebrow">6 dari 8</p><h2>Kapan Anda ingin mulai?</h2>'+simple(TIME.map(function(t){return[t[0],t[1],t[2]]}),"time",true);
  nextB.disabled=!S.time}
 if(id==="budget"){
  h='<p class="eyebrow">7 dari 8</p><h2>Kira-kira dana yang disiapkan?</h2><p class="sub">Ini hanya untuk menyesuaikan saran. Bukan harga final. Tidak tahu juga tidak apa-apa.</p>'+simple(BUDG,"budget",false);
  nextB.disabled=!S.budget}
 if(id==="kontak"){
  h='<p class="eyebrow">8 dari 8</p><h2>Terakhir, agar kami bisa membalas</h2><label class="f" for="nama">Nama Anda</label><input id="nama" type="text" autocomplete="name" value="'+esc(S.nama)+'" placeholder="Nama"><label class="f" for="wa">Nomor WhatsApp</label><input id="wa" type="tel" inputmode="tel" autocomplete="tel" value="'+esc(S.wa)+'" placeholder="08xxxxxxxxxx"><label class="f" for="cat">Ada hal lain yang ingin disampaikan? (boleh kosong)</label><textarea id="cat" placeholder="Contoh: kami punya 3 cabang">'+esc(S.cat)+'</textarea><div class="hpw" aria-hidden="true"><label for="website">Website</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off"></div><label class="chk"><input type="checkbox" id="consent"'+(S.consent?' checked':'')+'><span>Saya setuju jawaban dan nomor WhatsApp saya dikirim dan dicatat oleh Bigma untuk menyiapkan penawaran dan menghubungi saya. Data tidak dibagikan ke pihak lain.</span></label><div class="err" id="err">Isi nama, nomor WhatsApp, dan centang persetujuan dulu ya.</div>';
  nextB.textContent="Kirim"}
 if(id==="hasil"){
  var r=reco();var txt=summaryText();
  h='<div style="text-align:center;font-size:40px">🎉</div><h2 style="text-align:center">Terima kasih, '+esc(S.nama||"")+'!</h2><p class="sub" style="text-align:center">'+(saved?'Jawaban Anda sudah kami terima. Kami akan menghubungi Anda lewat WhatsApp. Mau lebih cepat? Kirim ringkasan ini juga lewat WhatsApp.':'Jawaban Anda belum terkirim otomatis. Tidak apa-apa, kirim ringkasan ini lewat WhatsApp dan kami balas dengan saran dan estimasi.')+'</p><div class="reco"><b>Saran awal kami</b>'+r.map(function(x){return'<span class="tag">'+x+'</span>'}).join("")+'<div class="hint">Ini baru perkiraan. Detailnya kita bahas bersama.</div></div><dl class="sum"><dt>Usaha</dt><dd>'+esc((S.usaha||"-")+" ("+lbl(IND,S.ind)+")")+'</dd><dt>Masalah</dt><dd>'+esc(S.pain.map(function(k){return lbl(PAIN,k)}).join(", "))+'</dd><dt>Tujuan</dt><dd>'+esc(S.goal.map(function(k){return lbl(GOAL,k)}).join(", "))+'</dd><dt>Ide yang menarik</dt><dd>'+esc(S.ideas.join("; ")||"-")+'</dd><dt>Pengguna dan perangkat</dt><dd>'+esc(S.users+" | "+S.dev)+'</dd><dt>Waktu dan dana</dt><dd>'+esc(S.time+" | "+S.budget)+'</dd></dl><a class="btn wa" id="wal" href="https://wa.me/'+WA+'?text='+encodeURIComponent(txt)+'" target="_blank" rel="noopener">Kirim lewat WhatsApp</a><button class="btn c" id="copy" type="button">Salin ringkasan</button><a class="btn home" href="/">Kembali ke beranda Bigma</a><div class="hint" style="text-align:center">'+(saved?'Jawaban Anda dikirim ke Bigma hanya untuk menyiapkan penawaran.':'Tidak ada data yang terkirim ke kami. Data terkirim hanya saat Anda menekan tombol WhatsApp.')+'</div><p class="foot">Bigma, Jakarta<br>businessbigma@gmail.com · WhatsApp 081536096663</p>';
  document.getElementById("nav").style.display="none";document.title="Terima kasih | Bigma"}
 app.innerHTML='<section class="step on">'+h+'</section>';
 window.scrollTo(0,0);
 var c=document.getElementById("copy");
 if(c)c.onclick=function(){var t=summaryText();if(navigator.clipboard)navigator.clipboard.writeText(t).then(function(){c.textContent="Tersalin ✓"},function(){c.textContent="Tidak bisa menyalin"});else{c.textContent="Tekan lama teks lalu salin"}}}
function read(){var u=document.getElementById("usaha");if(u)S.usaha=u.value.trim();var n=document.getElementById("nama");if(n)S.nama=n.value.trim();var w=document.getElementById("wa");if(w)S.wa=w.value.trim();var c=document.getElementById("cat");if(c)S.cat=c.value.trim();var h=document.getElementById("website");if(h)S.hp=h.value;var k=document.getElementById("consent");if(k)S.consent=k.checked}
app.addEventListener("click",function(e){
 var b=e.target.closest("button.opt");if(!b)return;read();
 if(b.dataset.idea!==undefined){var i=S.ideas.indexOf(b.dataset.idea);if(i>-1)S.ideas.splice(i,1);else S.ideas.push(b.dataset.idea);b.classList.toggle("sel");nextB.textContent=S.ideas.length?"Lanjut":"Lewati";return}
 var key=b.dataset.key;
 if(b.dataset.s){S[key]=b.dataset.v;[].forEach.call(b.parentNode.children,function(c){c.classList.remove("sel")});b.classList.add("sel");nextB.disabled=!(STEPS[step]==="skala"?(S.users&&S.dev):true);return}
 if(b.dataset.m==="1"){var a=S[key],j=a.indexOf(b.dataset.k);if(j>-1)a.splice(j,1);else a.push(b.dataset.k);b.classList.toggle("sel");nextB.disabled=!a.length;return}
 S[key]=b.dataset.k;if(key==="ind")S.ideas=[];[].forEach.call(b.parentNode.children,function(c){c.classList.remove("sel")});b.classList.add("sel");nextB.disabled=false});
nextB.onclick=function(){read();
 if(STEPS[step]==="kontak"){if(!S.nama||S.wa.replace(/\D/g,"").length<8||!S.consent){document.getElementById("err").style.display="block";return}
  nextB.disabled=true;nextB.textContent="Mengirim...";
  submit().then(function(ok){saved=ok;step++;render()});return}
 step++;render()};
function submit(){
 var ctl=new AbortController(),t=setTimeout(function(){ctl.abort()},8000);
 var body={nama:S.nama,whatsapp:S.wa,usaha:S.usaha,bidang:S.ind?lbl(IND,S.ind):"",
  masalah:S.pain.map(function(k){return lbl(PAIN,k)}),tujuan:S.goal.map(function(k){return lbl(GOAL,k)}),
  ide:S.ideas,pengguna:S.users||"",perangkat:S.dev||"",waktu:S.time||"",dana:S.budget||"",catatan:S.cat,
  saran:reco(),sumber:srcName(),persetujuan:S.consent,website:S.hp};
 return fetch("/api/kebutuhan",{method:"POST",signal:ctl.signal,headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}).then(function(r){clearTimeout(t);return r.ok},function(){clearTimeout(t);return false})}
backB.onclick=function(){read();if(step>0){step--;render()}};
render();
