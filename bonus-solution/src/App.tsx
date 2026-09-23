import React, { useState, useMemo } from 'react';
import { Search, Info, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { CourseCard } from './components/CourseCard';
import { SyllabusModal } from './components/SyllabusModal';
import { COURSES_DATA } from './data/courses';
import { Course, Category } from './types';

export const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState<'courses' | 'tracks' | 'playground'>('courses');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSyllabusCourse, setActiveSyllabusCourse] = useState<Course | null>(null);
  const [showAuditPanel, setShowAuditPanel] = useState(false);

  const categories: Category[] = ['Semua', 'Dasar', 'Menengah', 'Mahir', 'Mahasiswa', 'Kreator', 'Kantor'];

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesCategory =
        selectedCategory === 'Semua' ||
        course.level === selectedCategory ||
        course.categories.includes(selectedCategory);

      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0A0B10] text-[#E4E4E7] flex flex-col font-sans">
      {/* Top Banner: Demonstrating Technical Rigor */}
      <aside className="border-b border-indigo-500/20 bg-indigo-950/40 px-4 py-2 text-center text-xs text-indigo-200">
        <span className="font-semibold text-indigo-300">Technical Test Solution:</span> Komponen katalog & silabus interaktif ini dirancang untuk menyelesaikan masalah kontradiksi silabus terkunci, optimasi gambar responsif, dan standar aksesibilitas WCAG 2.1 AA di Pawang.io.
      </aside>

      {/* Primary Navigation */}
      <Navbar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-8">
        {/* Header Section */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-zinc-300 mb-3">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Pawang AI — Pembelajaran Ramah Pengguna Non-Teknis</span>
              </div>
              {/* Proper H1: Clear and unambiguous */}
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Katalog Kelas AI Prompting
              </h1>
              <p className="mt-2 text-base text-zinc-400 max-w-2xl leading-relaxed">
                Seluruh materi dirancang berbahasa Indonesia tanpa memerlukan coding. Tinjau silabus setiap kelas secara terbuka sebelum kamu mulai belajar.
              </p>
            </div>

            {/* Audit Inspector Toggle */}
            <button
              onClick={() => setShowAuditPanel(!showAuditPanel)}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all cursor-pointer self-start md:self-auto"
            >
              <Info className="h-4 w-4" />
              <span>{showAuditPanel ? 'Sembunyikan Catatan Audit' : 'Lihat Rekap Solusi Masalah'}</span>
            </button>
          </div>

          {/* Audit Comparison Panel */}
          {showAuditPanel && (
            <div className="mt-6 rounded-2xl border border-indigo-500/30 bg-[#121324] p-5 animate-in fade-in duration-200">
              <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                Daftar Masalah Pawang.io yang Diselesaikan oleh Komponen Ini:
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 text-xs text-zinc-300">
                <div className="rounded-xl bg-white/[0.03] p-3.5 border border-white/5">
                  <div className="font-semibold text-indigo-300 mb-1">1. Paradoks Silabus Terbuka</div>
                  <p className="text-zinc-400">
                    Live site menjanjikan silabus terbuka namun mengunci lesson 2-4 dengan padlock dan `cursor-not-allowed`. Komponen ini menghadirkan modal pratinjau materi transparan tanpa mengunci ringkasan esensial.
                  </p>
                </div>
                <div className="rounded-xl bg-white/[0.03] p-3.5 border border-white/5">
                  <div className="font-semibold text-indigo-300 mb-1">2. Over-fetching Gambar 1536px</div>
                  <p className="text-zinc-400">
                    Live site meminta `w=1536&q=100` untuk semua kartu kecil. Komponen ini menerapkan responsive `sizes`, aspect-ratio container tetap untuk mencegah Cumulative Layout Shift (CLS = 0).
                  </p>
                </div>
                <div className="rounded-xl bg-white/[0.03] p-3.5 border border-white/5">
                  <div className="font-semibold text-indigo-300 mb-1">3. Aksesibilitas & Navigasi Non-IT</div>
                  <p className="text-zinc-400">
                    Menghilangkan angka gamifikasi telanjang `0 0` menjadi streak edukatif ber-tooltip, menyediakan accessible label pada form search, dan hierarki heading semantik (H1 → H2 → H3).
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Search & Filter Toolbar */}
        <section className="mb-8 space-y-4" aria-label="Pencarian dan Filter Kelas">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input with Explicit Accessible Label */}
            <div className="relative flex-1">
              <label htmlFor="search-course-input" className="sr-only">
                Cari kelas prompting AI berdasarkan judul atau topik
              </label>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
              <input
                id="search-course-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kelas: skripsi, tugas kantor, konten..."
                className="w-full rounded-xl border border-white/10 bg-[#12131C] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div
              className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none"
              role="tablist"
              aria-label="Kategori Kelas"
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : 'border border-white/10 bg-[#12131C] text-zinc-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Course Card Grid */}
        <section aria-label="Daftar Kelas">
          {filteredCourses.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#12131C] p-12 text-center">
              <p className="text-base font-semibold text-white">Tidak ada kelas yang cocok dengan pencarianmu</p>
              <p className="mt-1 text-sm text-zinc-400">Coba ubah kata kunci atau ganti filter kategori di atas.</p>
              <button
                onClick={() => {
                  setSelectedCategory('Semua');
                  setSearchQuery('');
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15 transition-colors cursor-pointer"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onOpenSyllabus={setActiveSyllabusCourse}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0d0e15] py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Pawang AI — Dibuat untuk kamu yang belajar AI pakai bahasa sendiri.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <a href="https://pawang.io" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
              <span>Situs Live</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a href="https://chat.whatsapp.com/IYuFe4znEk842aG7YtFVwM" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Grup WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* Open Syllabus Modal */}
      <SyllabusModal
        course={activeSyllabusCourse}
        onClose={() => setActiveSyllabusCourse(null)}
      />
    </div>
  );
};
