// Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id
// Lisensi Nonkomersial Maliki Studio (kredit wajib, dilarang dijual) (lihat LICENSE): kredit wajib tetap ada, tidak untuk diperjualbelikan.
// ✏️ UBAH DI SINI: semua teks, warna, gambar (taruh di public/), dan audio opsional.
// Lama tiap adegan diatur di komponen (frame, 30 fps).
export const K = {
  warna: { hijau: "#43b862", merah: "#ef6b6b", biru: "#4f8cff" },
  pil1: { awal: "Ugh!", depan: "Bolos", sorot: "posting", belakang: "lagi" },
  kataBesar: "POST",
  ikon: "📉",
  tanya: "Lagi?",
  kalender: { judul: "November 2026", hari: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"] },
  log: { judul: "Log konten", item: ["Riset ide", "Tulis naskah", "Render & jadwal"], ikon: ["✎", "▤", "▶"] },
  target: { depan: "Taklukkan", sorot: "semua", belakang: "target" },
  ajakan: "Ayo mulai",
  ajakanIkon: "🏃",
  versi: "Versi terbaikmu",
  mulai: { depan: "Mulai", sorot: "hari ini" },
  avatar: "MM",
  akun: "@malikisaputra",
  // 🔊 Audio opsional. Taruh berkas di public/ lalu isi namanya, contoh: musik: "musik.mp3".
  // Paket ini sengaja TANPA musik/SFX/suara bawaan: pakai musik berlisensi bebas atau rekaman suaramu sendiri.
  audio: {
    musik: null as string | null, // backsound, diulang otomatis + fade masuk/keluar
    volumeMusik: 0.16,
    suara: null as string | null, // voice over / narasi milikmu (mp3/wav)
    volumeSuara: 1,
  },
};
