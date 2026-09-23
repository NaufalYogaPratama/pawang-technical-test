import React, { useState } from 'react';
import { Flame, Star, BookOpen, Compass, Terminal, LogIn } from 'lucide-react';

interface NavbarProps {
  activeNav: 'courses' | 'tracks' | 'playground';
  onNavChange: (nav: 'courses' | 'tracks' | 'playground') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeNav, onNavChange }) => {
  const [showStreakTooltip, setShowStreakTooltip] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0d0e15]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <a
            href="/"
            className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-bold text-lg shadow-md shadow-indigo-500/20">
              P
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Pawang<span className="text-indigo-400">.ai</span>
            </span>
          </a>

          {/* Primary Navigation - Clear Indonesian terms */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi Utama">
            <button
              onClick={() => onNavChange('courses')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeNav === 'courses'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="h-4 w-4 text-indigo-400" />
              Katalog Kelas
            </button>
            <button
              onClick={() => onNavChange('tracks')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeNav === 'tracks'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="h-4 w-4 text-indigo-400" />
              Jalur Belajar
            </button>
            <button
              onClick={() => onNavChange('playground')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeNav === 'playground'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal className="h-4 w-4 text-indigo-400" />
              Playground
            </button>
          </nav>
        </div>

        {/* User Status & Login - Solving the unexplained '0 0' */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 hover:border-white/20 transition-colors cursor-pointer"
              onMouseEnter={() => setShowStreakTooltip(true)}
              onMouseLeave={() => setShowStreakTooltip(false)}
              onFocus={() => setShowStreakTooltip(true)}
              onBlur={() => setShowStreakTooltip(false)}
              tabIndex={0}
              role="button"
              aria-label="Status progres belajar: 0 hari beruntun dan 0 poin"
            >
              <span className="flex items-center gap-1 font-semibold text-amber-400">
                <Flame className="h-3.5 w-3.5 fill-amber-400" />
                <span>0</span>
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span className="flex items-center gap-1 font-semibold text-indigo-400">
                <Star className="h-3.5 w-3.5 fill-indigo-400" />
                <span>0</span>
              </span>
            </div>

            {/* Contextual tooltip for Non-IT learners */}
            {showStreakTooltip && (
              <div
                role="tooltip"
                className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-white/10 bg-[#161822] p-3 text-xs text-zinc-300 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="font-semibold text-white mb-1">Rekor Belajar Harian</div>
                <p className="text-zinc-400 leading-relaxed">
                  Selesaikan minimal 1 lesson setiap hari untuk membangun streak belajar dan mengumpulkan poin latihan.
                </p>
              </div>
            )}
          </div>

          <a
            href="/login"
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
          >
            <LogIn className="h-4 w-4" />
            <span>Masuk</span>
          </a>
        </div>
      </div>
    </header>
  );
};
