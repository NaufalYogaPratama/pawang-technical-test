---
id: 001-audit-fact-checking
title: Audit Temuan & Verifikasi Fakta Live Site Pawang.io
type: wayfinder:research
status: closed
assignee: naufal
---

## Question

Apa saja masalah nyata di live pawang.io yang paling merugikan pengguna non-IT, SEO, dan performa halaman, terverifikasi secara faktual tanpa asumsi atau halusinasi?

## Resolution

Investigasi mendalam dengan Firecrawl dan inspeksi network/DOM menemukan 5 masalah empiris berurutan berdasarkan dampak:

1. **SEO & Discovery (Dampak: Kritis / Rusak Total)**
   - **Lokasi:** `robots.txt`, `sitemap.xml`, `<head>` di seluruh halaman (`<link rel="canonical">`, `<meta property="og:url">`, `<meta property="og:image">`, `<meta name="twitter:image">`).
   - **Bukti Empiris:** 
     - `robots.txt` mengarahkan crawler ke `Sitemap: https://pawang.ai/sitemap.xml`.
     - `sitemap.xml` berisi 50+ tautan yang seluruhnya memakai prefix `https://pawang.ai/`.
     - Domain `pawang.ai` berstatus **NXDOMAIN** (tidak resolve / tidak aktif).
     - Tag canonical menunjuk `https://pawang.ai/`, memberi instruksi ke Google untuk mengabaikan `pawang.io`.
     - `og:image` menunjuk `https://pawang.ai/og-image.png`, menyebabkan share link di WhatsApp, Telegram, LinkedIn rusak tanpa gambar preview.
     - Di `window.__NUXT__.config.public`, konfigurasi `siteUrl` tertulis hardcoded `"https://pawang.ai"`.

2. **UX & Kepercayaan Non-IT: Kontradiksi "Silabus Terbuka" vs Locked Content (Dampak: Sangat Tinggi)**
   - **Lokasi:** Homepage section *"Pilih kelas sesuai kebutuhan kamu"* vs Detail Silabus Kelas (`/courses/[slug]`).
   - **Bukti Empiris:**
     - Homepage menjanjikan: *"Seluruh silabus terbuka sejak awal. Tinjau materinya lebih dulu sebelum memutuskan untuk mengikuti."*
     - Halaman silabus kelas (`/courses/chatgpt-buat-semua`) justru mengunci semua materi setelah Lesson 1 dengan icon gembok, cursor-not-allowed, dan tooltip *"Selesaikan lesson sebelumnya dulu buat buka ini"*. Materi yang terkunci dirender sebagai `<div>` bukan link `<a>`, memutus link crawlability dan membuat calon pengguna non-IT merasa "tertipu" atau terintimidasi.

3. **UX & Navigasi: Friksi Istilah & Navigasi Membingungkan (Dampak: Tinggi)**
   - **Lokasi:** Header, Sidebar, Breadcrumb (`/courses`, `/tracks`, `/courses/.../lessons/...`).
   - **Bukti Empiris:**
     - Campur aduk bahasa: Di homepage tertulis *"Jalur Belajar"*, di sidebar tertulis *"Learning Path"*.
     - Halaman `/courses` (Katalog Kelas) memiliki H1 *"Pilih jalur belajar kamu"* (membingungkan user karena mengira ini halaman jalur belajar).
     - Pada lesson page, tombol kembali atas bertuliskan `← Apa Itu ChatGPT` (nama lesson yang sedang dibuka, bukan nama kelas induk). Tombol kembali bawah bertuliskan `← Balik ke jalur belajar` tetapi tautannya ke course (`/courses/chatgpt-buat-semua`).
     - Sidebar menampilkan angka telanjang `0 0` dengan SVG streak/flame tanpa teks label atau tooltip sama sekali, membingungkan pengguna baru yang belum paham konsep gamifikasi.

4. **Interaksi & Aksesibilitas: Drag-and-Drop Prompt Builder yang Rentan Macet (Dampak: Sedang-Tinggi)**
   - **Lokasi:** Latihan interaktif lesson (`/courses/.../lessons/apa-itu-chatgpt` - "Giliran kamu").
   - **Bukti Empiris:**
     - Terdapat placeholder ganda yang identik: dua slot bernama `konteks` dan dua slot bernama `format`, tanpa penjelasan slot mana yang menerima chip mana.
     - Chip menggunakan atribut `touch-none cursor-grab` yang rentan mengunci scroll halaman pada layar smartphone non-IT user.
     - Tidak memiliki atribut ARIA (`aria-label`, `aria-describedby`, atau live region) sehingga tidak dapat diakses pengguna screen-reader / keyboard.

5. **Performa & Mobile Data: Over-fetching Gambar & Skrip Besar (Dampak: Sedang)**
   - **Lokasi:** Seluruh halaman katalog & homepage.
   - **Bukti Empiris:**
     - NuxtImg menyajikan gambar thumbnail card kartu berukuran 1536px dengan kualitas 100% (`w=1536&q=100`) untuk kontainer yang lebarnya hanya 300-400px.
     - Tag `<img>` tidak menyertakan atribut `width` dan `height` eksplisit, memicu Cumulative Layout Shift (CLS).
     - Homepage memuat 41 script chunk modulepreload (777.5 KB uncompressed payload) dan lebih dari 30 definisi `@font-face` (Space Mono, Space Grotesk, Plus Jakarta Sans).
