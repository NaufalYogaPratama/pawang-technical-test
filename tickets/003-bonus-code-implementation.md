---
id: 003-bonus-code-implementation
title: Implementasi Kode Solusi (Bonus)
type: wayfinder:task
status: closed
assignee: naufal
---

## Question

Komponen apa yang dapat dibuat untuk menyelesaikan masalah silabus terkunci, mengoptimalkan pemanggilan gambar, dan memenuhi standar aksesibilitas?

## Resolution

Komponen katalog dan modal silabus terbuka diimplementasikan pada folder `bonus-solution/`:
1. Pratinjau silabus transparan: Setiap kartu kursus menyediakan tombol "Tinjau Silabus". Pengguna non-IT dapat membaca ringkasan materi, durasi, dan poin penting sebelum mulai belajar, tanpa terhalang gembok mati.
2. Optimasi gambar: Kontainer kartu menggunakan rasio aspek tetap `aspect-[16/10]`, atribut `sizes` responsif, dan lazy loading untuk mencegah pengunduhan gambar 1536px pada kontainer kecil serta meniadakan layout shift.
3. Aksesibilitas WCAG 2.1 AA: Navigasi keyboard penuh (menutup modal via tombol Escape), heading berurutan dari H1 sampai H4, label pencarian eksplisit untuk pembaca layar, dan tooltip penjelas pada indikator rekor belajar.
4. Pengujian unit: Enam pengujian otomatis di `src/App.test.tsx` (Vitest dan Testing Library) seluruhnya lulus tanpa error.
