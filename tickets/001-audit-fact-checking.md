---
id: 001-audit-fact-checking
title: Audit Temuan dan Verifikasi Live Site Pawang.io
type: wayfinder:research
status: closed
assignee: naufal
---

## Question

Apa saja masalah di live pawang.io yang merugikan pengguna non-IT, SEO, dan performa halaman berdasarkan data nyata?

## Resolution

Inspeksi jaringan dan DOM menemukan lima masalah berurutan dari dampak terbesarnya:

1. SEO dan indeks halaman:
   - Lokasi: `robots.txt`, `sitemap.xml`, dan tag `<head>` di semua halaman (`canonical`, `og:url`, `og:image`, `twitter:image`).
   - Bukti: `robots.txt` mengarahkan perayap ke `https://pawang.ai/sitemap.xml`. Isi sitemap memuat lebih dari 50 URL dengan domain `pawang.ai`, yang saat ini tidak aktif (NXDOMAIN). Tag kanonikal dan Open Graph juga mengarah ke domain mati tersebut. Di browser, objek runtime menyimpan `window.__NUXT__.config.public.siteUrl = "https://pawang.ai"`.

2. Silabus terkunci di halaman kelas:
   - Lokasi: Bagian "Pilih kelas sesuai kebutuhan kamu" di beranda dibandingkan halaman detail silabus (`/courses/[slug]`).
   - Bukti: Beranda menyatakan silabus terbuka sejak awal, tetapi pada halaman kelas, materi setelah materi pertama ditandai gembok dengan kursor `cursor-not-allowed`. Materi terkunci berupa elemen `<div>` tanpa tag `<a>`, memutus perayapan Googlebot.

3. Inkonsistensi istilah dan navigasi:
   - Lokasi: Header, sidebar, dan navigasi breadcrumb.
   - Bukti: Istilah berganti antara "Jalur Belajar" di beranda dan "Learning Path" di sidebar. Halaman katalog `/courses` menggunakan judul H1 "Pilih jalur belajar kamu". Pada halaman materi, tombol kembali atas mengulang judul materi saat ini, sementara tombol bawah bertuliskan "Balik ke jalur belajar" meski mengarah ke halaman kelas. Sidebar juga memuat angka `0 0` tanpa teks penjelasan.

4. Latihan penyusunan prompt di layar ponsel:
   - Lokasi: Latihan "Giliran kamu" pada materi `/courses/.../lessons/apa-itu-chatgpt`.
   - Bukti: Kalimat latihan memiliki dua slot berlabel sama ("konteks" dan "format"). Tombol chip menggunakan `touch-none cursor-grab` yang rawan menahan gestur scroll layar ponsel. Komponen juga belum memiliki atribut aksesibilitas pembaca layar.

5. Ukuran gambar thumbnail kartu:
   - Lokasi: Kartu materi di beranda dan katalog.
   - Bukti: Gambar thumbnail dipanggil pada resolusi 1536px dengan kualitas 100% untuk kontainer berukuran 300 sampai 400px. Tag `<img>` tidak menyertakan atribut dimensi `width` dan `height` pada markup HTML.
