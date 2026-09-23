import React, { useState, useMemo } from 'react';
import { Search, ExternalLink } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Primary Navigation */}
      <Navbar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
        {/* Header Section */}
        <section className="mb-10">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-[#069871] mb-3">
              Pawang AI · Kelas Praktik Bahasa Indonesia
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Katalog Kelas AI Prompting
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Seluruh silabus terbuka sejak awal. Tinjau materi lebih dulu sebelum memutuskan untuk mengikuti, gratis dan tanpa perlu keahlian coding.
            </p>
          </div>
        </section>

        {/* Search & Filter Toolbar */}
        <section className="mb-8 space-y-4" aria-label="Pencarian dan Filter Kelas">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input with Explicit Accessible Label */}
            <div className="relative flex-1">
              <label htmlFor="search-course-input" className="sr-only">
                Cari kelas prompting AI berdasarkan judul atau topik
              </label>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                id="search-course-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kelas: skripsi, tugas kantor, konten, draf..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:border-[#069871] focus:ring-2 focus:ring-[#069871]/20 transition-all"
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
                        ? 'bg-[#069871] text-white shadow-sm'
                        : 'border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <p className="text-base font-semibold text-slate-900">Tidak ada kelas yang cocok dengan pencarianmu</p>
              <p className="mt-1 text-sm text-slate-500">Coba ubah kata kunci atau ganti filter kategori di atas.</p>
              <button
                onClick={() => {
                  setSelectedCategory('Semua');
                  setSearchQuery('');
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
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
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 mt-12">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Pawang AI · Dibuat buat kamu yang belajar AI pakai bahasa sendiri.</p>
          <div className="flex items-center gap-4 text-slate-600">
            <a href="https://pawang.io" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 flex items-center gap-1">
              <span>Situs Live</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a href="https://chat.whatsapp.com/IYuFe4znEk842aG7YtFVwM" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
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
