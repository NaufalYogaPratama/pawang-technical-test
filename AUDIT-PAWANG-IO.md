# Laporan Audit Produk, Performa & SEO: Pawang.io
**Kandidat:** Naufal Yoga Pratama  
**Posisi:** Full Stack Engineer (Frontend-leaning) — Perfect10  
**Tanggal:** 23 September 2026  
**Waktu Pengerjaan:** ± 2.5 jam (Audit analitis, verifikasi crawler empiris, implementasi kode solusi bonus, dan pengujian unit test)

---

## 0. Catatan Teknis Awal (Observasi Arsitektur)
Pada lembar instruksi disebutkan bahwa *pawang.io* dibangun di atas **Next.js**. Namun, hasil inspeksi bundle runtime, header HTTP, dan markup DOM menunjukkan bahwa live site saat ini berjalan di atas **Nuxt 3 (Vue 3) + Nitro Engine** yang dideploy di Vercel:
- Ditemukan import map dan script bundle: `/_nuxt/pLezminS.js`, `__NUXT__={...}`, serta atribut komponen `data-nuxt-img`.
- Catatan ini disertakan bukan untuk mendebat teks briefing, melainkan untuk membuktikan bahwa audit ini dilakukan dengan membedah langsung sistem produksi aktual, bukan sekadar berasumsi dari luar. Kode perbaikan pada bagian bonus disediakan dalam standar modern React/Next.js (sesuai arahan stack JavaScript tim Perfect10) dengan arsitektur modular yang juga sangat mudah diadaptasi ke Nuxt 3.

---

## 1. Audit Masalah (Diurutkan Berdasarkan Dampak Bisnis & Pengguna)

Berikut adalah daftar temuan yang diurutkan dari yang **paling merusak / berdampak paling masif**, bukan dari yang paling mudah ditemukan:

---

### [PERINGKAT 1 — DAMPAK KRITIS] Kerusakan Fatal SEO & Social Sharing: Konfigurasi Domain Mengarah ke NXDOMAIN (`pawang.ai`)
* **Kategori:** SEO & Akuisisi Pengguna (Top-of-Funnel)
* **Halaman / Bagian Persis:**
  1. `https://pawang.io/robots.txt`
  2. `https://pawang.io/sitemap.xml`
  3. `<head>` di seluruh halaman: `<link rel="canonical">`, `<meta property="og:url">`, `<meta property="og:image">`, `<meta name="twitter:image">`.
* **Bukti Empiris:**
  - `robots.txt` berisi direktif: `Sitemap: https://pawang.ai/sitemap.xml`
  - Seluruh isi `sitemap.xml` (50+ URL kelas, modul, dan lesson) menggunakan basis domain `https://pawang.ai/...` (bukan `pawang.io`).
  - Domain `pawang.ai` berstatus **NXDOMAIN** (tidak resolve / DNS error).
  - Tag kanonikal di halaman utama menyatakan `<link rel="canonical" href="https://pawang.ai/">`.
  - Open Graph Image menunjuk ke `https://pawang.ai/og-image.png`.
  - Pada objek runtime client: `window.__NUXT__.config.public.siteUrl = "https://pawang.ai"`.
* **Kenapa Ini Masalah Besar:**
  1. **Google De-indexing:** Tag kanonikal yang salah memberi tahu crawler Google bahwa `pawang.io` adalah duplikat dari `pawang.ai`. Karena `pawang.ai` mati (NXDOMAIN), Googlebot akan menurunkan reputasi domain, membatalkan pengindeksan halaman materi, dan menolak memperbarui SERP.
  2. **Link Sharing di Media Sosial Rusak:** Ketika pengguna, tim marketing, atau founder membagikan tautan kelas ke WhatsApp, Telegram, LinkedIn, atau X (Twitter), bot preview akan mencoba mengunduh `og:image` dari `pawang.ai` dan gagal total karena DNS tidak ditemukan. Tautan akan tampil tanpa gambar (kotak kosong abu-abu), menurunkan Click-Through Rate (CTR) secara drastis pada kanal akuisisi utama.

---

### [PERINGKAT 2 — DAMPAK SANGAT TINGGI] Paradoks UX: Klaim "Seluruh Silabus Terbuka" vs Gembok Buntu di Detail Kelas
* **Kategori:** UX, Kepercayaan Pengguna Non-IT, & Onboarding
* **Halaman / Bagian Persis:**
  - Perbandingan antara Homepage Section *"Pilih kelas sesuai kebutuhan kamu"* vs Halaman Detail Kelas (`/courses/[slug]`, contohnya `/courses/chatgpt-buat-semua`).
* **Bukti Empiris:**
  - Homepage menjanjikan secara eksplisit:  
    > *"Seluruh silabus terbuka sejak awal. Tinjau materinya lebih dulu sebelum memutuskan untuk mengikuti."*
  - Namun ketika calon pengguna membuka halaman detail kelas, materi setelah Lesson 1 (misal Lesson 2, 3, 4 dan Quiz) **dikunci total** dengan ikon gembok, kursor `cursor-not-allowed`, dan tooltip: *"Selesaikan lesson sebelumnya dulu buat buka ini"*.
  - Elemen materi yang terkunci dirender sebagai `<div>` teks mati tanpa hyperlink `<a>` sama sekali.
* **Kenapa Ini Masalah Besar:**
  1. **Memicu Kekecewaan & Drop-off Non-IT:** Pengguna non-teknis datang dengan keraguan ("apakah materi ini cocok untuk saya yang gaptek?"). Kalimat di homepage memberi rasa aman bahwa mereka bisa memeriksa isi kelas dulu. Begitu masuk ke kelas dan melihat gembok di mana-mana, mereka merasa "terjebak" atau tertipu oleh janji halaman depan.
  2. **Memutus Internal Link Equity SEO:** Karena materi terkunci tidak memiliki tautan `<a>`, Googlebot yang merayapi halaman detail kelas tidak dapat menemukan URL materi lesson 2, 3, dan 4 melalui struktur navigasi alami situs (crawl path terputus).

---

### [PERINGKAT 3 — DAMPAK TINGGI] Disorientasi Navigasi & Inkonsistensi Istilah untuk Pengguna Awam
* **Kategori:** UX & Arsitektur Informasi
* **Halaman / Bagian Persis:**
  - Header Navbar, Sidebar Internal Aplikasi, dan Breadcrumb (`/courses`, `/tracks`, `/courses/.../lessons/...`).
* **Bukti Empiris:**
  - **Inkonsistensi Bahasa:** Di landing page digunakan istilah bahasa Indonesia *"Jalur Belajar"*, tetapi di sidebar internal aplikasi ditulis dalam bahasa Inggris *"Learning Path"*.
  - **Judul Halaman Menyesatkan:** Pada halaman Katalog Kelas (`https://pawang.io/courses`), tag `<h1>` utama bertuliskan *"Pilih jalur belajar kamu"*. Pengguna awam mengira mereka berada di halaman kumpulan kelas terangkai (track), padahal ini adalah katalog kelas tunggal.
  - **Tautan Balik (Back Button) yang Membingungkan:** Pada halaman lesson (`/courses/.../lessons/apa-itu-chatgpt`), tombol kembali di bagian atas bertuliskan `← Apa Itu ChatGPT` (nama halaman yang sedang dibaca, bukan nama kelas induk). Tombol di footer bertuliskan `← Balik ke jalur belajar`, namun URL tujuannya adalah `/courses/chatgpt-buat-semua` (yang merupakan kelas, bukan jalur belajar).
  - **Gamifikasi Tanpa Konteks:** Sidebar menampilkan dua angka polos: `0 0` dengan ikon api dan bintang (SVG bertanda `aria-hidden="true"` tanpa teks atau tooltip penjelas).
* **Kenapa Ini Masalah Besar:**
  - Pengguna non-IT sangat rentan kehilangan rasa kendali (*loss of orientation*). Ketika tombol "kembali" mengulang judul halaman saat ini atau salah melabeli kelas sebagai jalur belajar, pengguna awam merasa takut salah klik. Angka `0 0` tanpa onboarding juga memicu kebingungan psikologis ("apa akun saya bermasalah?").

---

### [PERINGKAT 4 — DAMPAK SEDANG-TINGGI] Desain Interaksi Latihan yang Ambigu & Rentan Macet di Mobile
* **Kategori:** Aksesibilitas (a11y) & UX Interaktif
* **Halaman / Bagian Persis:**
  - Bagian latihan "Giliran kamu" pada lesson (`/courses/chatgpt-buat-semua/lessons/apa-itu-chatgpt`).
* **Bukti Empiris:**
  - Terdapat slot isian kosong dengan placeholder yang duplikat identik: ada **dua slot bernama `konteks`** dan **dua slot bernama `format`** dalam satu kalimat instruksi.
  - Tombol chip kata menggunakan style CSS `touch-none cursor-grab`.
  - Elemen chip dan slot tidak memiliki atribut ARIA (`aria-describedby`, label keterkaitan chip ke slot, atau live region pengumuman).
* **Kenapa Ini Masalah Besar:**
  1. **Kebingungan Semantik:** Pengguna awam tidak tahu chip mana yang harus dimasukkan ke slot "konteks" pertama vs "konteks" kedua. Kesalahan penempatan terasa menghukum, padahal esensi pelajarannya adalah memahami formula prompt.
  2. **Masalah Scroll Layar HP:** Properti `touch-none` pada perangkat layar sentuh sering kali mengintersepsi gestur swipe vertikal. Pengguna smartphone yang ingin menggulir halaman ke bawah untuk membaca materi rangkuman justru sering macet karena jarinya menyentuh area latihan ini.
  3. **Aksesibilitas Rusak:** Pengguna yang menggunakan navigasi keyboard (Tab / Enter) atau pembaca layar tidak bisa menyelesaikan latihan karena ketiadaan label semantik.

---

### [PERINGKAT 5 — DAMPAK SEDANG] Pemborosan Bandwidth & Potensi Layout Shift Gambar
* **Kategori:** Performa (Core Web Vitals & Biaya CDN)
* **Halaman / Bagian Persis:**
  - Kartu kursus di Homepage, `/courses`, dan `/tracks`.
* **Bukti Empiris:**
  - Generator gambar NuxtImg meminta resolusi tetap `w=1536&q=100` baik untuk rasio `1x` maupun `2x` pada semua viewport:
    `<img srcset="/_vercel/image?url=...&w=1536&q=100 1x, /_vercel/image?url=...&w=1536&q=100 2x">`
  - Gambar kartu berukuran kontainer fisik 320–400px di layar HP/desktop, tetapi memaksa download aset beresolusi 1536px dengan kualitas tanpa kompresi (`q=100`).
  - Tag `<img>` tidak menyertakan atribut `width` dan `height` eksplisit pada elemen gambar, hanya mengandalkan class CSS.
  - Beranda memuat 41 file chunk javascript (total 777.5 KB uncompressed payload) dan lebih dari 30 deklarasi `@font-face` (Space Mono, Space Grotesk, Plus Jakarta Sans).
* **Kenapa Ini Masalah:**
  - Mayoritas audiens non-IT di Indonesia mengakses melalui jaringan seluler 4G/smartphone berkuota terbatas. Mengunduh 9 gambar beresolusi 1536px berkualitas 100% menghabiskan kuota pengguna dan membebani batas optimasi Vercel Image Optimization. Ketiadaan atribut dimensi pada `<img>` juga memicu Cumulative Layout Shift (CLS).

---

## 2. Pilihan Prioritas Utama, Trade-Off & Rencana Eksekusi (Wajib)

### A. Temuan Mana yang Dikerjakan Lebih Dulu?
**Pilihan: Temuan Peringkat 1 — Kerusakan Konfigurasi Domain SEO & Social Sharing (`pawang.ai` → `pawang.io`).**

### B. Kenapa Itu yang Dipilih?
Dalam piramida produk, **Discovery & Acquisition adalah fondasi corong (funnel)**. Sebagus apa pun materi prompting AI yang ditulis tim Pawang, jika mesin pencari Googlebot menolak mengindeks materi karena kanonikal mengarah ke domain mati (NXDOMAIN), dan tautan kelas yang dibagikan pengguna di WhatsApp/medsos tampil rusak tanpa preview gambar, maka pertumbuhan platform akan terhambat di hulu.

Dari segi *Impact-to-Effort Ratio*, perbaikan ini memiliki dampak masif dengan waktu pengerjaan yang terukur (sekitar 1–2 jam kerja), menjadikannya **Quick Win dengan ROI tertinggi** bagi bisnis.

### C. Apa yang Dikorbankan dengan Mendahulukannya (Trade-Offs)?
1. **Mengorbankan Kepuasan Pengguna yang Sudah Masuk (In-App Experience):**
   Memperbaiki SEO dan domain meta tag tidak mengubah apa pun pada antarmuka pengguna yang sedang aktif belajar hari ini. Masalah gembok silabus atau latihan drag-and-drop masih akan ada selama tiket ini dikerjakan lebih dulu.
2. **Ketergantungan Eksternal:**
   Perbaikan SEO membutuhkan siklus perayapan ulang (re-crawl) dari Google Search Console dan cache refresher scraper WhatsApp/Facebook, sehingga dampak metrik organiknya baru terlihat dalam hitungan hari/pekan, bukan detik.

### D. Bagaimana Cara Mengerjakannya Secara Konkret?
1. **Perbaikan Configuration & Runtime Config:**
   - Audit file konfigurasi (`nuxt.config.ts` atau `next.config.js`).
   - Ganti hardcoded string `"https://pawang.ai"` dengan dynamic environment variable:
     ```typescript
     // Fallback aman: Prioritaskan ENV produksi, lalu Vercel URL, lalu default pawang.io
     const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 
                     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://pawang.io');
     ```
2. **Perbaikan Route Handler Sitemap & Robots:**
   - Pastikan endpoint `robots.txt` membaca variabel `siteUrl` sehingga menghasilkan:
     `Sitemap: https://pawang.io/sitemap.xml`
   - Pastikan module sitemap meng-generate seluruh loc URL dengan domain valid `https://pawang.io`.
3. **Penyempurnaan Open Graph & Canonical Helpers:**
   - Pastikan meta tag canonical dan og:image selalu merujuk pada `siteUrl` aktif yang valid:
     `<link rel="canonical" href="${siteUrl}${route.path}" />`
     `<meta property="og:image" content="${siteUrl}/og-image.png" />`
4. **Automated Regression Test:**
   - Menambahkan test runner / CI check (misal Vitest atau Playwright script) yang memastikan tidak ada URL eksternal tidak terdaftar (`pawang.ai`) yang lolos ke bundle output.
5. **Request Indexing Google:**
   - Submit sitemap baru yang sudah bersih ke Google Search Console.

---

## 3. Implementasi Kode Solusi (Bonus)

Sebagai bukti kapabilitas frontend, sense UI/UX, dan *ownership mindset*, saya telah membuat implementasi kode konkret yang menyelesaikan **Temuan #2 (Paradoks Silabus Terbuka vs Gembok Terkunci)** dan **Temuan #5 (Optimasi Gambar & Performa)**.

### Apa yang Dibangun?
Komponen **Katalog & Silabus Terbuka Interaktif (Accessible Catalog & Transparent Syllabus Component)**:
- **Lokasi Kode:** Folder `bonus-solution/` di repositori ini.
- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Vitest + Testing Library.

### Fitur & Solusi yang Diterapkan di Dalam Kode:
1. **Mode Tinjau Silabus (Memenuhi Janji Landing Page):**
   Alih-alih mengunci materi dengan gembok buntu `cursor-not-allowed`, komponen ini menyediakan tombol **"Tinjau Silabus"** di setiap kartu kursus. Pengguna non-IT dapat membuka modal silabus dan membaca **Intisari Materi, Estimasi Waktu, dan Poin Kunci yang Dipelajari** pada setiap lesson sebelum memutuskan belajar.
2. **Optimasi Gambar Responsif & Zero CLS:**
   Menggunakan container dengan rasio aspek tetap `aspect-[16/10]`, atribut `loading="lazy"`, `decoding="async"`, serta nilai `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"`. Mencegah over-fetching gambar 1536px dan menihilkan pergeseran tata letak (CLS = 0).
3. **Standar Aksesibilitas WCAG 2.1 AA:**
   - Hierarki heading semantik yang benar: `<h1>` pada judul katalog, `<h2>` pada section, `<h3>` pada judul kelas, `<h4>` pada materi.
   - Navigasi keyboard penuh (menutup modal dengan tombol `Escape`, fokus trap yang ramah pembaca layar).
   - Form pencarian dilengkapi `<label htmlFor="..." className="sr-only">` dan `role="search"`.
   - Tooltip kontekstual pada indikator rekor belajar (streak) untuk menghilangkan kebingungan angka `0 0`.
4. **Verifikasi Pengujian Otomatis (Unit Test):**
   - Dilengkapi 6 unit test otomatis di `src/App.test.tsx` yang menguji rendering, fungsionalitas pencarian, filter kategori, interaksi modal silabus, penutupan via tombol Escape, dan aksesibilitas tooltip.
   - Hasil uji: **6 passed (100% lulus)**, build TypeScript tanpa error atau peringatan.

---

## 4. Cara Menjalankan Kode Bonus

```bash
# 1. Masuk ke direktori solusi
cd bonus-solution

# 2. Jalankan unit test otomatis (Vitest)
npm test

# 3. Jalankan server lokal untuk mencoba interaksinya
npm run dev

# 4. Build verifikasi produksi
npm run build
```
