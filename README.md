# T05 UI Aplikasi Kaca · Template Video Reels (Remotion)

Template video vertikal 9:16 (1080×1920, 30 fps, ±13 detik) gaya UI aplikasi: pil yang tumbuh dan melebar, kartu kalender jatuh miring dengan kata raksasa, kartu log dengan centang berurutan, kalender terisi hijau, pil ajakan, garis bantu + kilau, dan avatar + handle penutup. Tanpa gambar, semua digambar kode.

Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id. Gratis dipakai dan diubah, kredit wajib tetap ada, tidak untuk diperjualbelikan.

## Cara pakai
1. Install [Node.js](https://nodejs.org) 18 ke atas.
2. Buka terminal di folder ini: `npm install`
3. Ubah teks, warna, gambar, dan audio di `src/konten.ts`. Gambar taruh di folder `public/` (contoh: `public/t05/`).
4. Pratinjau: `npm run studio`
5. Render: `npm run render` → hasil di `out/video.mp4`
6. Cek kode (opsional): `npm run cek`

## Isi `src/konten.ts`
- `warna`: `hijau`, `merah`, `biru`
- `pil1`: `awal`, `depan`, `sorot`, `belakang`
- `kataBesar`, `ikon`, `tanya`
- `kalender`: `judul` bulan, `hari` (7 nama hari)
- `log`: `judul`, `item` (3 langkah), `ikon`
- `target`: `depan`, `sorot`, `belakang`; `ajakan`, `ajakanIkon`, `versi`, `mulai`: `depan` + `sorot`
- `avatar` (inisial), `akun`
- `audio`: `musik` (backsound, diulang + fade) dan `suara` (voice over), keduanya `null` = tanpa suara. Taruh berkas mp3/wav di `public/` lalu isi namanya, misalnya `musik: "musik.mp3"`.

## Gambar pengganti (placeholder)
Tidak ada: semua visual (kalender, kartu, ikon emoji) digambar dengan kode.

## Audio
Versi ini sengaja dikirim **tanpa** musik, SFX, dan suara asli kreator. Isi slot `audio` di `src/konten.ts` dengan musik berlisensi bebas (misalnya dari YouTube Audio Library atau Pixabay Music) dan rekaman suaramu sendiri. Kalau mau efek bunyi per adegan, tambahkan `<Sequence from={frame}><Audio src={staticFile("bunyi.mp3")} /></Sequence>` di komponen.

## Struktur folder
```
proyek/
├── public/

├── src/
│   ├── index.ts          # titik masuk Remotion
│   ├── Root.tsx          # daftar komposisi: T05AppUI (1080×1920, 30 fps)
│   ├── T05AppUI.tsx  # animasi & tata letak
│   ├── SlotAudio.tsx     # slot musik + suara opsional
│   └── konten.ts         # ✏️ semua isi yang bisa diganti
├── package.json
├── remotion.config.ts
├── tsconfig.json
└── LICENSE
```

## Lisensi
MIT + syarat tambahan kredit-maliki (lihat `LICENSE`): kredit "Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id" wajib tetap ada, dan template ini tidak boleh dijual ulang tanpa izin.
