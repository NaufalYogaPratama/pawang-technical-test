# Technical Test Full Stack Engineer (Frontend) — Perfect10 / Pawang.io

Repositori ini memuat hasil pengerjaan Technical Test untuk posisi **Full Stack Engineer (Frontend-leaning)** di **Perfect10** (pawang.io) oleh **Naufal Yoga Pratama**.

---

## 📑 Struktur Repositori

```
pawang-technical-test/
├── AUDIT-PAWANG-IO.md         # Laporan Audit Lengkap (Wajib Bagian 1 & 3)
├── MAP.md                     # Wayfinder Map (Perencanaan & Pelacakan Keputusan)
├── tickets/                   # Child Tickets Wayfinder
│   ├── 001-audit-fact-checking.md
│   ├── 002-priority-selection-tradeoffs.md
│   ├── 003-bonus-code-implementation.md
│   └── 004-final-submission-assembly.md
├── bonus-solution/            # Implementasi Kode Solusi (Bonus Bagian 2)
│   ├── src/
│   │   ├── components/        # CourseCard, SyllabusModal, Navbar
│   │   ├── data/              # Data kelas & silabus terverifikasi
│   │   ├── App.tsx            # Katalog Kelas Interaktif & Panel Audit
│   │   └── App.test.tsx       # 6 Unit Tests Otomatis (Vitest + Testing Library)
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## 🚀 Ringkasan Temuan Audit (Diurutkan dari Paling Berdampak)

1. **[Kritis] SEO & Social Share Domain Error (`pawang.ai` NXDOMAIN):** `robots.txt`, `sitemap.xml`, canonical tag, dan `og:image` mengarah ke domain mati `pawang.ai`, menyebabkan risiko de-indexing Google dan hilangnya thumbnail preview di WhatsApp/media sosial.
2. **[Sangat Tinggi] Paradoks Silabus Terbuka vs Gembok Buntu:** Landing page menjanjikan *"Seluruh silabus terbuka sejak awal"*, namun pada detail kelas, Lesson 2–4 dikunci dengan gembok `cursor-not-allowed` tanpa hyperlink, memicu drop-off pengguna non-IT dan memutus crawl path Googlebot.
3. **[Tinggi] Disorientasi Navigasi & Jargon:** Campur aduk istilah ("Jalur Belajar" vs "Learning Path"), tag H1 `/courses` bertuliskan *"Pilih jalur belajar kamu"*, tombol kembali yang mengulang judul lesson, dan angka gamifikasi `0 0` tanpa teks penjelas.
4. **[Sedang-Tinggi] Latihan Drag-and-Drop Ambigu:** Placeholder slot ganda identik (`konteks` & `konteks`), properti `touch-none` yang mengunci scroll vertikal layar smartphone, dan ketiadaan ARIA accessibility tags.
5. **[Sedang] Over-fetching Gambar 1536px:** Thumbnail kartu berukuran 350px meminta gambar 1536px dengan kualitas 100% (`w=1536&q=100`), memboroskan kuota pengguna mobile dan batas optimasi CDN Vercel.

*Catatan: Meskipun briefing menyebutkan Next.js, inspeksi teknis live site membuktikan produk saat ini berjalan di atas Nuxt 3 (Vue 3).*

---

## 🛠️ Cara Menjalankan Kode Solusi (Bonus)

```bash
cd bonus-solution

# Install dependencies
npm install

# Jalankan pengujian unit otomatis (100% Passed)
npm test

# Jalankan live development server
npm run dev

# Jalankan verifikasi build produksi
npm run build
```

---

## 📬 Draf Balasan Email
Draf lengkap balasan email yang siap dikirimkan ke Alif tersedia di dalam dokumen [AUDIT-PAWANG-IO.md](./AUDIT-PAWANG-IO.md) dan rangkuman ticket [tickets/004-final-submission-assembly.md](./tickets/004-final-submission-assembly.md).
