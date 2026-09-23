---
id: 003-bonus-code-implementation
title: Implementasi Kode Solusi (Bonus) - Course Card & Syllabus Preview Component
type: wayfinder:task
status: closed
assignee: naufal
---

## Question

Komponen apa yang dapat dibuat untuk membuktikan kapabilitas Frontend & sense UI/UX sesuai standar industri, menyelesaikan kontradiksi silabus terkunci, mengoptimalkan performa gambar, dan memenuhi standar aksesibilitas?

## Resolution

Telah diimplementasikan komponen **Accessible Catalog & Transparent Syllabus Component** di folder `bonus-solution/`:
1. **Solusi UX Silabus Terbuka:** Menggantikan gembok mati dengan modal pratinjau materi transparan ("Tinjau Silabus"). Calon peserta non-IT dapat membaca ringkasan materi, durasi, dan poin kunci sebelum belajar.
2. **Solusi Performa Gambar:** Menggunakan aspect-ratio container tetap `aspect-[16/10]`, responsive `sizes`, WebP, lazy loading, dan async decoding. Meniadakan CLS (Cumulative Layout Shift = 0) dan mengeliminasi over-fetching 1536px.
3. **Aksesibilitas WCAG 2.1 AA:** Navigasi keyboard penuh (menutup modal dengan Escape, fokus trap), semantic headings (H1 → H2 → H3 → H4), label formulir pencarian eksplisit (`role="search"`, `<label className="sr-only">`), dan tooltip kontekstual pada streak gamifikasi.
4. **Unit Test Otomatis:** Dilengkapi 6 unit test di `src/App.test.tsx` (Vitest + React Testing Library). Seluruh pengujian lulus 100% (`6 passed`), build produksi bersih dalam 1.5 detik.
