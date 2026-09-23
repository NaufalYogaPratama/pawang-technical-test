---
id: 002-priority-selection-tradeoffs
title: Prioritas Pertama, Trade-off Arsitektur, dan Rencana Eksekusi
type: wayfinder:task
status: closed
assignee: naufal
---

## Question

Dari seluruh temuan audit, item mana yang wajib dikerjakan lebih dulu kalau memegang repositori pawang.io? Jelaskan kenapa itu yang dipilih, apa yang dikorbankan dengan mendahulukannya, dan kira-kira bagaimana mengerjakannya.

## Resolution

- Prioritas pertama: Masalah domain sitemap dan kanonikal yang mengarah ke `pawang.ai`.
- Alasan pemilihan: Jika Googlebot diarahkan ke domain mati, halaman materi baru tidak akan terindeks. Tautan yang dibagikan ke WhatsApp juga tidak memunculkan gambar pratinjau. Memperbaiki masalah ini berdampak langsung pada jumlah kunjungan, dengan waktu pengerjaan yang relatif singkat (sekitar 1 sampai 2 jam).
- Trade-off yang diambil:
  1. Perbaikan konfigurasi ini tidak langsung mengubah tampilan bagi siswa yang sedang belajar. Masalah silabus terkunci atau tombol navigasi belum tertangani pada hari pertama.
  2. Hasil pembaruan indeks Google dan pembersihan cache preview WhatsApp membutuhkan waktu beberapa hari hingga efeknya terlihat di metrik.
- Langkah pengerjaan konkret:
  1. Perbarui `siteUrl` pada file konfigurasi agar membaca environment variable `process.env.NUXT_PUBLIC_SITE_URL` atau fallback ke domain `pawang.io`.
  2. Perbaiki endpoint sitemap dan robots.txt agar menghasilkan URL dinamis yang valid.
  3. Standarisasi helper canonical dan Open Graph di seluruh halaman.
  4. Tambahkan pemeriksaan otomatis di CI untuk memastikan tidak ada URL domain mati yang masuk ke bundle produksi.
  5. Kirim ulang sitemap ke Google Search Console.
