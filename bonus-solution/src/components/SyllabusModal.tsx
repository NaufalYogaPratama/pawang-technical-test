import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Lock, Eye, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Course, Lesson } from '../types';

interface SyllabusModalProps {
  course: Course | null;
  onClose: () => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({ course, onClose }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Set default selected lesson to the first lesson
  useEffect(() => {
    if (course && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      setSelectedLesson(course.modules[0].lessons[0]);
    } else {
      setSelectedLesson(null);
    }
  }, [course]);

  if (!course) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#12131D] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 p-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Silabus Terbuka (Tinjau Sebelum Mulai)</span>
            </div>
            <h2 id="modal-title" className="text-xl font-bold text-white tracking-tight">
              {course.title}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">{course.tagline}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup jendela silabus"
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body: Split View (Syllabus List on Left, Lesson Preview on Right) */}
        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
          {/* Left Column: Modules & Lessons */}
          <div className="w-full md:w-1/2 overflow-y-auto border-r border-white/10 p-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Daftar Modul & Materi
            </p>

            {course.modules.length === 0 ? (
              <p className="text-sm text-zinc-500 italic py-4">Silabus kelas ini sedang disiapkan.</p>
            ) : (
              course.modules.map((module) => (
                <div key={module.id} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/20 font-mono text-xs font-bold text-indigo-400">
                      {module.moduleNumber}
                    </span>
                    <h3 className="text-sm font-bold text-zinc-200">{module.title}</h3>
                  </div>

                  <div className="space-y-1.5 pl-2">
                    {module.lessons.map((lesson) => {
                      const isSelected = selectedLesson?.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => setSelectedLesson(lesson)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                              : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {lesson.isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Eye className="h-4 w-4 text-indigo-400/80 shrink-0" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className="font-mono text-[11px] text-zinc-500 shrink-0">
                            {lesson.durationMinutes} mnt
                          </span>
                        </button>
                      );
                    })}

                    {module.hasQuiz && (
                      <div className="flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-500 font-medium">
                        <Lock className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                        <span className="truncate">{module.quizTitle || 'Quiz Akhir Modul'}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Transparent Lesson Preview */}
          <div className="w-full md:w-1/2 overflow-y-auto p-6 bg-[#0E0F17] flex flex-col justify-between">
            {selectedLesson ? (
              <div className="space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-400 border border-indigo-500/20 mb-2">
                    <Eye className="h-3 w-3" />
                    Pratinjau Materi Terbuka
                  </div>
                  <h4 className="text-lg font-bold text-white">{selectedLesson.title}</h4>
                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Estimasi durasi baca & latihan: {selectedLesson.durationMinutes} menit</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Ringkasan Materi
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {selectedLesson.summary}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5">
                    Yang Akan Kamu Kuasai:
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-400">
                    {selectedLesson.keyTakeaways.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-center p-6 text-zinc-500 text-sm">
                Pilih salah satu lesson di sebelah kiri untuk melihat ringkasan materi.
              </div>
            )}

            {/* Footer Action */}
            <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between gap-3">
              <div className="text-[11px] text-zinc-400">
                <span className="font-semibold text-zinc-300">100% Gratis:</span> Tidak perlu kartu kredit atau keahlian coding.
              </div>
              <a
                href={`/courses/${course.slug}`}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 transition-colors"
              >
                <span>Buka Pelajaran</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
