# Technical Test Full Stack Engineer (Frontend), Perfect10 / Pawang.io

Repository ini memuat hasil pengerjaan technical test untuk posisi Full Stack Engineer (Frontend-leaning) di Perfect10 (pawang.io) oleh Naufal Yoga Pratama.

---

## Struktur Direktori

```
pawang-technical-test/
├── AUDIT-PAWANG-IO.md         # Laporan audit lengkap (tugas wajib nomor 1 dan 3)
├── MAP.md                     # Peta perencanaan Wayfinder
├── tickets/                   # Dokumen keputusan dan tiket kerja
│   ├── 001-audit-fact-checking.md
│   ├── 002-priority-selection-tradeoffs.md
│   ├── 003-bonus-code-implementation.md
│   └── 004-final-submission-assembly.md
├── bonus-solution/            # Kode komponen perbaikan (tugas bonus nomor 2)
│   ├── src/
│   │   ├── components/        # CourseCard, SyllabusModal, Navbar, DifficultyBadge
│   │   ├── data/              # Data kelas dari live site
│   │   ├── App.tsx            # Katalog interaktif
│   │   └── App.test.tsx       # 6 unit test otomatis (Vitest dan Testing Library)
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## Ringkasan Temuan Audit

1. Kesalahan domain pada sitemap, kanonikal, dan preview sosial media: File `robots.txt`, `sitemap.xml`, tag kanonikal, dan `og:image` mengarah ke domain mati `pawang.ai`, sehingga situs berisiko tidak terindeks di Google dan tautan WhatsApp tidak memunculkan gambar preview.
2. Silabus terkunci di halaman kelas: Beranda menjanjikan silabus terbuka sejak awal, tetapi materi setelah materi pertama dikunci dengan kursor `cursor-not-allowed` tanpa tautan, menyulitkan calon siswa non-teknis melihat isi materi.
3. Inkonsistensi istilah dan navigasi: Penggunaan istilah bercampur antara Jalur Belajar dan Learning Path, tag H1 katalog kelas bertuliskan "Pilih jalur belajar kamu", tombol kembali mengulang judul materi yang sedang dibuka, serta angka `0 0` tanpa teks penjelasan.
4. Latihan penyusunan prompt membingungkan di layar sentuh: Ada dua placeholder dengan nama kembar ("konteks" dan "format") dalam satu kalimat, serta class CSS `touch-none` yang rawan menahan gestur scroll layar ponsel.
5. Gambar thumbnail di-fetch 1536px: Gambar kartu materi dipanggil pada resolusi 1536px kualitas 100% untuk kontainer selebar 350px tanpa atribut dimensi pada tag HTML.

Catatan arsitektur: Live site saat ini berjalan di atas Nuxt 3 (Vue 3) dan Nitro di Vercel. Kode solusi pada bagian bonus disediakan dalam React dan TypeScript sesuai preferensi stack JavaScript tim.

---

## Fitur pada Kode Solusi (Bonus)

Komponen di folder `bonus-solution/` mendemonstrasikan implementasi antarmuka yang menyelesaikan temuan audit di atas:
- Pratinjau silabus transparan: Tombol "Tinjau Silabus" membuka modal berisi ringkasan, durasi, dan poin penting setiap materi tanpa terhalang gembok mati, menyelaraskan fungsi kelas dengan janji di beranda.
- Indikator level non-warna (WCAG 1.4.1): Menggunakan ikon sinyal seluler tiga batang (Dasar 1 batang, Menengah 2 batang, Mahir 3 batang) agar tingkat kesulitan mudah dibedakan tanpa mengandalkan warna semata.
- Kerapian ritme vertikal kartu: Deskripsi materi memiliki kotak tinggi konsisten dua baris dan penataan baris metadata seimbang dengan proteksi anti-wrap, menjaga kartu tetap sejajar rapi bahkan untuk durasi panjang seperti "1 jam 2 menit".
- Optimasi gambar: Kontainer kartu menggunakan rasio aspek tetap `aspect-[16/10]`, `loading="lazy"`, dan `sizes` responsif untuk mencegah pergeseran tata letak (CLS = 0).
- Standar aksesibilitas WCAG 2.1 AA: Navigasi keyboard penuh, pembaca layar ramah dengan label formulir eksplisit, dan tooltip penjelas rekor belajar.

---

## Menjalankan Kode Solusi (Bonus)

```bash
cd bonus-solution

# Pasang dependensi
npm install

# Jalankan pengujian unit otomatis
npm test

# Jalankan development server lokal
npm run dev

# Jalankan build produksi
npm run build
```
