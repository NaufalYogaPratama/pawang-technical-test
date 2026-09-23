# Wayfinder Map: Perfect10 / Pawang.io Technical Test

## Destination

Menghasilkan submission technical test untuk posisi Full Stack Engineer (Frontend-leaning) di Perfect10 / pawang.io. Laporan mencakup audit masalah berdasar bukti live site, penetapan prioritas dan trade-off, implementasi kode solusi bonus yang teruji, serta draf balasan email.

## Notes

- Domain: Kursus AI prompting berbahasa Indonesia untuk pengguna umum (pawang.io).
- Prinsip kerja:
  - Setiap temuan berlandaskan data nyata live site (curl, firecrawl, dan inspeksi bundle).
  - Menyertakan analisis dampak bagi pengguna non-IT dan langkah perbaikan teknis.
  - Mencatat framework aktual yang berjalan di live site (Nuxt 3).
- Skills rujukan: grilling, domain-modeling, firecrawl, prototype

## Decisions so far

- [001-audit-fact-checking](tickets/001-audit-fact-checking.md): Terverifikasi lima temuan live site, yaitu domain sitemap/canonical mengarah ke pawang.ai (NXDOMAIN), silabus kelas terkunci, inkonsistensi navigasi, aksesibilitas latihan prompt, dan pemanggilan gambar 1536px.
- [002-priority-selection-tradeoffs](tickets/002-priority-selection-tradeoffs.md): Menetapkan masalah domain sitemap dan canonical sebagai prioritas pertama karena berkaitan dengan indeks Google dan pratinjau media sosial, dengan trade-off perbaikan antarmuka kelas belum tersentuh pada hari pertama.
- [003-bonus-code-implementation](tickets/003-bonus-code-implementation.md): Mengimplementasikan komponen katalog dan modal silabus terbuka di folder bonus-solution, mencakup gambar responsif, indikator level sinyal seluler (WCAG 1.4.1), kerapian ritme vertikal kartu anti-wrap, standar aksesibilitas WCAG, dan 6 unit test otomatis yang seluruhnya lulus.
- [004-final-submission-assembly](tickets/004-final-submission-assembly.md): Menyusun laporan akhir di AUDIT-PAWANG-IO.md, README.md, dan draf balasan email.

## Not yet specified

Semua kebutuhan tugas saat ini sudah dispesifikasikan dan dikerjakan.

## Out of scope

- Menulis ulang seluruh aplikasi pawang.io dari nol.
- Perubahan skema basis data backend.
