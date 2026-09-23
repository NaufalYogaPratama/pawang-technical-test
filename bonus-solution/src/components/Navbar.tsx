import React, { useState } from 'react';
import { Flame, Star, BookOpen, Compass, Terminal, LogIn } from 'lucide-react';

interface NavbarProps {
  activeNav: 'courses' | 'tracks' | 'playground';
  onNavChange: (nav: 'courses' | 'tracks' | 'playground') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeNav, onNavChange }) => {
  const [showStreakTooltip, setShowStreakTooltip] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <a
            href="/"
            className="flex items-center gap-2.5 rounded-lg p-1 outline-none focus-visible:ring-2 focus-visible:ring-[#069871]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#069871] to-[#0bb184] text-white font-bold text-lg shadow-sm">
              P
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Pawang <span className="text-[#069871]">AI</span>
            </span>
          </a>

          {/* Primary Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi Utama">
            <button
              onClick={() => onNavChange('courses')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeNav === 'courses'
                  ? 'bg-slate-100 text-[#069871] font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Katalog Kelas
            </button>
            <button
              onClick={() => onNavChange('tracks')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeNav === 'tracks'
                  ? 'bg-slate-100 text-[#069871] font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="h-4 w-4" />
              Jalur Belajar
            </button>
            <button
              onClick={() => onNavChange('playground')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeNav === 'playground'
                  ? 'bg-slate-100 text-[#069871] font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Terminal className="h-4 w-4" />
              Playground
            </button>
          </nav>
        </div>

        {/* User Status & Login */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 hover:border-slate-300 transition-colors cursor-pointer"
              onMouseEnter={() => setShowStreakTooltip(true)}
              onMouseLeave={() => setShowStreakTooltip(false)}
              onFocus={() => setShowStreakTooltip(true)}
              onBlur={() => setShowStreakTooltip(false)}
              tabIndex={0}
              role="button"
              aria-label="Status progres belajar: 0 hari beruntun dan 0 poin"
            >
              <span className="flex items-center gap-1 font-semibold text-[#ea580c]">
                <Flame className="h-3.5 w-3.5 fill-[#ea580c]" />
                <span>0</span>
              </span>
              <span className="h-3 w-px bg-slate-200" />
              <span className="flex items-center gap-1 font-semibold text-[#069871]">
                <Star className="h-3.5 w-3.5 fill-[#069871]" />
                <span>0</span>
              </span>
            </div>

            {/* Contextual tooltip */}
            {showStreakTooltip && (
              <div
                role="tooltip"
                className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="font-semibold text-slate-900 mb-1">Rekor Belajar Harian</div>
                <p className="text-slate-500 leading-relaxed">
                  Selesaikan minimal 1 materi setiap hari untuk membangun rekor belajar dan mengumpulkan poin latihan.
                </p>
              </div>
            )}
          </div>

          <a
            href="/login"
            className="flex items-center gap-1.5 rounded-lg bg-[#069871] px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-[#057a5b] focus-visible:ring-2 focus-visible:ring-[#069871] transition-colors"
          >
            <LogIn className="h-4 w-4" />
            <span>Masuk</span>
          </a>
        </div>
      </div>
    </header>
  );
};
