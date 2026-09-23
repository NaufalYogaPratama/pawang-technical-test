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

- **Prioritas Pertama:** Peringkat 1 — Kerusakan Konfigurasi Domain SEO & Social Share Preview (`pawang.ai` NXDOMAIN → `pawang.io`).
- **Alasan Pemilihan:** Ini adalah kebocoran corong teratas (top-of-funnel). Seluruh materi dan latihan tidak ada artinya jika Google menolak mengindeks halaman akibat kanonikal mengarah ke domain mati, dan setiap link yang dishare ke WhatsApp/medsos tidak menampilkan preview gambar (CTR hancur). Perbaikan ini adalah *quick-win* dengan rasio dampak-ke-usaha tertinggi.
- **Trade-off yang Dikorbankan:**
  1. Pengalaman langsung pengguna di dalam aplikasi (in-app UX) seperti gembok silabus atau latihan drag-and-drop belum berubah pada hari pertama.
  2. Dampak metrik SEO membutuhkan waktu perayapan ulang oleh search engine (beberapa hari), tidak instan terlihat oleh user.
- **Langkah Pengerjaan Konkret:**
  1. Audit `siteUrl` pada file konfigurasi (`nuxt.config.ts` / Next config) untuk membaca environment variable `process.env.NUXT_PUBLIC_SITE_URL` atau fallback ke domain `pawang.io`.
  2. Perbaiki endpoint sitemap dan robots.txt agar menghasilkan URL dinamis yang valid.
  3. Perbaiki meta tag helper canonical dan Open Graph di seluruh halaman.
  4. Pasang CI check agar build output tidak memuat domain eksternal tidak terdaftar.
  5. Submit ulang sitemap di Google Search Console.
