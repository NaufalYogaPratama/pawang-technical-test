import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Lock, Eye, Clock, ArrowRight } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 p-6">
          <div>
            <span className="inline-block text-xs font-semibold text-[#069871] mb-1">
              Silabus Terbuka (Tinjau Sebelum Mulai)
            </span>
            <h2 id="modal-title" className="text-xl font-bold text-slate-900 tracking-tight">
              {course.title}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{course.tagline}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup jendela silabus"
            className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body: Split View */}
        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
          {/* Left Column: Modules & Lessons */}
          <div className="w-full md:w-1/2 overflow-y-auto border-r border-slate-100 p-5 space-y-4 bg-slate-50/50">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Daftar Modul & Materi
            </p>

            {course.modules.length === 0 ? (
              <p className="text-sm text-slate-500 italic py-4">Silabus kelas ini sedang disiapkan.</p>
            ) : (
              course.modules.map((module) => (
                <div key={module.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-50 font-mono text-xs font-bold text-[#069871]">
                      {module.moduleNumber}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{module.title}</h3>
                  </div>

                  <div className="space-y-1.5 pl-2">
                    {module.lessons.map((lesson) => {
                      const isSelected = selectedLesson?.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => setSelectedLesson(lesson)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50 text-[#069871] font-semibold border border-emerald-200'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {lesson.isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            ) : (
                              <Eye className="h-4 w-4 text-[#069871] shrink-0" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className="font-mono text-[11px] text-slate-400 shrink-0">
                            {lesson.durationMinutes} mnt
                          </span>
                        </button>
                      );
                    })}

                    {module.hasQuiz && (
                      <div className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-400 font-medium">
                        <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{module.quizTitle || 'Quiz Akhir Modul'}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Lesson Preview */}
          <div className="w-full md:w-1/2 overflow-y-auto p-6 bg-white flex flex-col justify-between">
            {selectedLesson ? (
              <div className="space-y-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-[#069871] border border-emerald-200 mb-2">
                    <Eye className="h-3 w-3" />
                    Pratinjau Materi Terbuka
                  </span>
                  <h4 className="text-lg font-bold text-slate-900">{selectedLesson.title}</h4>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Estimasi durasi baca: {selectedLesson.durationMinutes} menit</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Ringkasan Materi
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedLesson.summary}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                    Yang Akan Kamu Kuasai:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {selectedLesson.keyTakeaways.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#069871] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-center p-6 text-slate-400 text-sm">
                Pilih salah satu materi di sebelah kiri untuk melihat ringkasan.
              </div>
            )}

            {/* Footer Action */}
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">100% Gratis:</span> Tidak perlu kartu kredit atau keahlian coding.
              </div>
              <a
                href={`/courses/${course.slug}`}
                className="flex items-center gap-1.5 rounded-xl bg-[#069871] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#057a5b] transition-colors"
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
