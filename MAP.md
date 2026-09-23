# Wayfinder Map: Perfect10 / Pawang.io Technical Test

## Destination

Menghasilkan submission Technical Test Full Stack Engineer (Frontend) untuk Perfect10 / pawang.io yang 100% akurat dan terverifikasi secara empiris di live site: Audit berdampak tinggi (UX non-IT, SEO, Performa), Pembahasan prioritas & trade-off arsitektural, Implementasi kode perbaikan (bonus) yang siap jalan tanpa cacat/TODO generator, dan draf balasan email profesional sebelum deadline 23:59 WIB.

## Notes

- Domain: Kursus AI prompting berbahasa Indonesia untuk pengguna non-teknis (pawang.io).
- Standing preferences: 
  - ZERO HALUSINASI: Setiap poin audit merujuk pada bukti nyata di live site (`curl`, `firecrawl`, bundle inspection).
  - High ownership mindset: Bukan sekadar komplain UI, melainkan analisis dampak bisnis, psikologi pengguna non-IT, serta solusi arsitektur teknis konkret.
  - Framework awareness: Catat secara elegan temuan arsitektur aktual (Nuxt 3 / Vue 3 vs briefing Next.js).
- Skills: `grilling`, `domain-modeling`, `firecrawl`, `prototype`

## Decisions so far

- [001-audit-fact-checking](tickets/001-audit-fact-checking.md): Terverifikasi 5 temuan empiris di live site: domain sitemap/canonical mati mengarah ke pawang.ai (NXDOMAIN), paradoks silabus terbuka vs materi terkunci, disorientasi navigasi dan istilah non-IT, aksesibilitas latihan prompt drag-and-drop, dan over-fetching aset 1536px.
- [002-priority-selection-tradeoffs](tickets/002-priority-selection-tradeoffs.md): Menetapkan Temuan #1 (SEO Domain Misconfiguration) sebagai prioritas utama yang harus diselesaikan pertama kali karena dampaknya di top-of-funnel (de-indexing Google dan hilangnya thumbnail preview media sosial), dengan trade-off mengorbankan pembenahan in-app UX pada hari pertama.
- [003-bonus-code-implementation](tickets/003-bonus-code-implementation.md): Mengimplementasikan komponen `CourseCard` dan `SyllabusModal` di folder `bonus-solution/` yang menyelesaikan kontradiksi silabus terbuka vs gembok mati, menerapkan responsive image & zero CLS, standar aksesibilitas WCAG 2.1 AA, dan 6 unit test otomatis (100% lulus).
- [004-final-submission-assembly](tickets/004-final-submission-assembly.md): Menyatukan seluruh laporan ke dalam `AUDIT-PAWANG-IO.md`, `README.md`, dan draf email balasan untuk Alif di Perfect10.

## Not yet specified

- (Frontier bersih: seluruh tiket telah selesai dispesifikasi dan dieksekusi).

## Out of scope

- Re-writing the entire pawang.io codebase from scratch.
- Backend database schema modification (fokus pada Full Stack leaning Frontend).
