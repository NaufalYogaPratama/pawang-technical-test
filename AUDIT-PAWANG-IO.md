# Laporan Audit Pawang.io: UX, SEO, dan Performa

Kandidat: Naufal Yoga Pratama  
Posisi: Full Stack Engineer (Frontend-leaning), Perfect10  
Tanggal: 23 September 2026  
Waktu pengerjaan: sekitar 2,5 jam  

---

## Catatan Arsitektur

Briefing menyebutkan pawang.io dibangun dengan Next.js. Dari pemeriksaan bundle JavaScript dan header HTTP di live site, aplikasi saat ini berjalan di atas Nuxt 3 (Vue 3) dan Nitro di Vercel. Tandanya terlihat pada bundle `/_nuxt/pLezminS.js`, objek `window.__NUXT__`, dan atribut `data-nuxt-img`.

Poin ini dicatat karena semua temuan di bawah bersumber dari inspeksi langsung pada sistem produksi tersebut. Untuk bagian bonus, kode solusi saya sediakan dalam React dan TypeScript sesuai preferensi stack JavaScript tim. Strukturnya tetap modular dan mudah dipindahkan ke Nuxt 3 jika dibutuhkan.

---

## 1. Daftar Temuan Audit

Urutan di bawah disusun berdasarkan dampak terbesarnya bagi produk, dari masalah pencarian dan indeks hingga detail visual halaman.

### 1. Domain sitemap, canonical, dan Open Graph mengarah ke pawang.ai (NXDOMAIN)

* Area: `robots.txt`, `sitemap.xml`, dan tag `<head>` di seluruh halaman (`canonical`, `og:url`, `og:image`, `twitter:image`).
* Bukti:
  - File `https://pawang.io/robots.txt` memuat baris `Sitemap: https://pawang.ai/sitemap.xml`.
  - File `https://pawang.io/sitemap.xml` memuat lebih dari 50 URL yang semuanya diawali `https://pawang.ai/`.
  - Domain `pawang.ai` saat ini tidak aktif (status DNS NXDOMAIN).
  - Tag kanonikal di halaman depan tertulis `<link rel="canonical" href="https://pawang.ai/">`.
  - Tag media sosial mengarah ke `https://pawang.ai/og-image.png`.
  - Pada objek browser, nilai runtime disetel `window.__NUXT__.config.public.siteUrl = "https://pawang.ai"`.
* Dampak:
  Googlebot membaca instruksi bahwa halaman resmi berada di `pawang.ai`. Karena domain itu mati, Google berisiko menghapus halaman dari indeks pencarian dan menahan pembaruan ranking pawang.io. Selain itu, saat tautan dibagikan ke WhatsApp, LinkedIn, atau Telegram, preview gambar gagal dimuat karena server gambar tidak bisa diakses. Tautan hanya muncul sebagai teks biasa, sehingga peluang orang mengklik tautan tersebut menurun drastis.

### 2. Silabus di halaman kelas terkunci, bertentangan dengan janji di beranda

* Area: Bagian "Pilih kelas sesuai kebutuhan kamu" di beranda dibandingkan dengan halaman silabus kelas (`/courses/[slug]`, seperti `/courses/chatgpt-buat-semua`).
* Bukti:
  - Beranda menuliskan: "Seluruh silabus terbuka sejak awal. Tinjau materinya lebih dulu sebelum memutuskan untuk mengikuti."
  - Di halaman kelas, materi setelah materi pertama (misalnya materi 2, 3, dan 4) ditandai ikon gembok dengan kursor `cursor-not-allowed` dan keterangan "Selesaikan lesson sebelumnya dulu buat buka ini".
  - Baris materi yang terkunci dirender sebagai elemen `<div>` polos tanpa tautan `<a>`.
* Dampak:
  Pengguna non-teknis umumnya membuka kelas dengan rasa ragu. Kalimat di beranda menjanjikan mereka bisa melihat isi materi terlebih dahulu, tetapi mereka langsung berhadapan dengan ikon gembok begitu masuk ke kelas. Ini menimbulkan kesan bahwa materi tidak benar-benar terbuka. Dari sisi SEO, ketiadaan tautan `<a>` pada materi terkunci juga memutus jalur perayapan Googlebot ke halaman materi berikutnya.

### 3. Istilah navigasi bercampur dan tombol kembali membingungkan

* Area: Bilah navigasi atas, sidebar internal, dan rekam jejak halaman (`/courses`, `/tracks`, serta halaman materi).
* Bukti:
  - Di beranda digunakan istilah "Jalur Belajar", sedangkan sidebar di dalam aplikasi menggunakan istilah bahasa Inggris "Learning Path".
  - Halaman katalog kelas (`https://pawang.io/courses`) menggunakan judul utama `<h1>` "Pilih jalur belajar kamu". Pengguna yang mencari kelas mandiri mengira mereka sedang melihat jalur bertahap.
  - Di halaman materi (`/courses/.../lessons/apa-itu-chatgpt`), tombol kembali di bagian atas bertuliskan `← Apa Itu ChatGPT`, yang merupakan nama materi itu sendiri dan bukan nama kelas induknya. Tombol di bagian bawah bertuliskan `← Balik ke jalur belajar`, padahal tautannya mengarah ke halaman kelas `/courses/chatgpt-buat-semua`.
  - Sidebar memuat dua angka polos `0 0` dengan ikon api dan bintang bertanda `aria-hidden="true"`, tanpa label teks atau tooltip.
* Dampak:
  Pengguna yang belum terbiasa dengan aplikasi web mudah merasa tersesat saat navigasi tidak konsisten. Tombol kembali yang mengulang nama materi membuat pengguna ragu untuk mengkliknya, dan angka `0 0` tanpa penjelasan menimbulkan pertanyaan apakah ada data yang belum termuat.

### 4. Latihan penyusunan prompt membingungkan dan rawan macet di layar sentuh

* Area: Kotak latihan "Giliran kamu" pada halaman materi `/courses/chatgpt-buat-semua/lessons/apa-itu-chatgpt`.
* Bukti:
  - Kalimat latihan memiliki dua slot kosong berlabel sama, yaitu dua slot "konteks" dan dua slot "format".
  - Pilihan kata menggunakan class CSS `touch-none cursor-grab`.
  - Komponen tidak memiliki atribut aksesibilitas penjelas (seperti `aria-label`, relasi antar slot, atau pengumuman pembaca layar).
* Dampak:
  Pengguna bingung membedakan pilihan kata yang harus diletakkan pada slot pertama atau kedua. Pada ponsel, properti `touch-none` kerap menahan gestur gulir layar. Pengguna yang menyentuh area latihan saat ingin membaca rangkuman di bagian bawah halaman sering mendapati layarnya tertahan.

### 5. Gambar thumbnail di-fetch pada ukuran 1536px tanpa atribut dimensi

* Area: Kartu kursus di beranda dan halaman katalog.
* Bukti:
  - NuxtImg memanggil gambar dengan parameter tetap `w=1536&q=100` untuk layar standar maupun retina:
    `<img srcset="/_vercel/image?url=...&w=1536&q=100 1x, /_vercel/image?url=...&w=1536&q=100 2x">`
  - Kontainer kartu di layar ponsel maupun desktop hanya selebar 320 hingga 400 piksel, tetapi tetap mengunduh gambar beresolusi 1536 piksel dengan kualitas penuh tanpa kompresi.
  - Tag `<img>` tidak menyertakan atribut `width` dan `height` eksplisit pada HTML.
  - Beranda memuat 41 chunk JavaScript (total 777,5 KB belum terkompresi) serta lebih dari 30 deklarasi font Space Mono, Space Grotesk, dan Plus Jakarta Sans.
* Dampak:
  Pengguna di Indonesia yang mengandalkan koneksi seluler menghabiskan kuota lebih banyak untuk mengunduh gambar yang sebenarnya ditampilkan kecil. Ketiadaan atribut dimensi pada tag gambar juga memicu pergeseran tata letak (Cumulative Layout Shift) saat gambar selesai dimuat.

---

## 2. Prioritas Pengerjaan, Trade-off, dan Rencana Eksekusi

### Pilihan prioritas pertama
Masalah nomor 1: Konfigurasi domain sitemap, kanonikal, dan preview media sosial (`pawang.ai` ke `pawang.io`).

### Alasan pemilihan
Akses awal adalah pintu masuk platform. Materi yang disusun dengan baik tidak akan menjangkau calon siswa jika Googlebot menolak mengindeksnya akibat kanonikal yang salah, atau jika tautan yang dibagikan pengguna ke WhatsApp tidak memunculkan gambar preview. Masalah ini berdampak langsung pada jumlah kunjungan, tetapi waktu perbaikannya relatif singkat (sekitar 1 sampai 2 jam kerja).

### Trade-off yang diambil
Perbaikan konfigurasi ini tidak mengubah tampilan yang dilihat siswa yang sedang belajar hari ini. Masalah silabus terkunci atau tombol navigasi yang membingungkan belum tersentuh selama perbaikan domain dikerjakan. Selain itu, hasil pembaruan indeks Google dan pembersihan cache preview WhatsApp membutuhkan waktu beberapa hari hingga efeknya terlihat di metrik kunjungan.

### Rencana pengerjaan konkret
1. Perbarui konfigurasi domain aplikasi (`nuxt.config.ts` atau `next.config.js`) agar membaca environment variable dinamis:
   ```typescript
   const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://pawang.io');
   ```
2. Pastikan rute generator `sitemap.xml` dan `robots.txt` membaca nilai `siteUrl` yang benar sehingga menghasilkan alamat `https://pawang.io`.
3. Standarisasi helper Open Graph dan canonical agar selalu menyertakan base URL aktif.
4. Tambahkan pemeriksaan otomatis pada pipeline CI untuk memastikan tidak ada URL dari domain luar yang lolos ke bundle produksi.
5. Kirimkan ulang sitemap yang sudah diperbaiki ke Google Search Console.

---

## 3. Implementasi Kode Perbaikan (Bagian Bonus)

Untuk bagian bonus, saya memilih menyelesaikan Temuan 2 (silabus terkunci) dan Temuan 5 (optimasi gambar serta aksesibilitas kartu materi).

Kode berada di direktori `bonus-solution/` dalam repository, dibangun dengan React 19, TypeScript, Tailwind CSS v4, dan Vitest.

Perbaikan yang diterapkan:
1. Pratinjau silabus transparan: Setiap kartu kursus memiliki tombol "Tinjau Silabus". Pengguna non-IT dapat membuka ringkasan materi, poin penting yang dipelajari, dan estimasi waktu belajar setiap materi tanpa harus menyelesaikan materi sebelumnya terlebih dahulu. Ini menyelaraskan fungsi kelas dengan janji di beranda.
2. Optimasi gambar: Kontainer kartu menggunakan rasio aspek tetap `aspect-[16/10]`, atribut `loading="lazy"`, `decoding="async"`, serta atribut `sizes` responsif untuk mencegah pengunduhan gambar 1536px pada kontainer kecil dan meniadakan pergeseran layout.
3. Indikator level non-warna (WCAG 1.4.1): Tingkat kesulitan tidak hanya dibedakan lewat warna teks, melainkan menggunakan ikon sinyal seluler tiga batang (Dasar 1 batang aktif, Menengah 2 batang, Mahir 3 batang) agar pengguna dengan keterbatasan persepsi warna tetap dapat membedakannya dengan jelas.
4. Kerapian ritme vertikal kartu: Deskripsi materi menggunakan kotak tinggi konsisten dua baris (`min-h-[2.625rem]`), dan baris metadata ditata dalam satu baris seimbang kiri-kanan dengan proteksi `whitespace-nowrap`. Hal ini mencegah kartu meleber atau melompat beda ketinggian saat teks durasi lebih panjang seperti "1 jam 2 menit".
5. Standar aksesibilitas WCAG 2.1 AA: Struktur heading rapi (H1 untuk halaman, H2 untuk bagian, H3 untuk kelas, H4 untuk materi), modal silabus dapat ditutup dengan tombol Escape, kolom pencarian memiliki label eksplisit untuk pembaca layar, dan indikator rekor belajar dilengkapi tooltip penjelas.
6. Pengujian otomatis: Disertai 6 unit test di `src/App.test.tsx` yang mencakup pencarian, filter kategori, dan interaksi silabus. Seluruh pengujian lulus tanpa error.

---

## 4. Cara Menjalankan Kode di Komputer Lokal

```bash
cd bonus-solution

# Pasang dependensi
npm install

# Jalankan 6 unit test otomatis
npm test

# Jalankan server lokal
npm run dev

# Jalankan build produksi
npm run build
```
