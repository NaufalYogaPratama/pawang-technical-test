import React from 'react';
import { Clock, BookOpen, Layers } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onOpenSyllabus: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onOpenSyllabus }) => {
  // Brand level badge color matching pawang.io
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Dasar':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Menengah':
        return 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200';
      case 'Mahir':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-[#069871]">
      {/* Aspect ratio container preventing CLS */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={course.image.src}
          alt={course.image.alt}
          width={course.image.width}
          height={course.image.height}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />

        {/* Level Badge */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm ${getLevelBadge(
            course.level
          )}`}
        >
          {course.level}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#069871] transition-colors">
            {course.title}
          </h3>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
            {course.tagline}
          </p>

          {/* Metadata badges */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {course.durationText}
            </span>
            <span className="h-3 w-px bg-slate-200" />
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen className="h-3.5 w-3.5 text-slate-400" />
              {course.lessonCount} Lesson
            </span>
            <span className="h-3 w-px bg-slate-200" />
            <span className="flex items-center gap-1.5 font-medium">
              <Layers className="h-3.5 w-3.5 text-slate-400" />
              {course.moduleCount} Modul
            </span>
          </div>
        </div>

        {/* Action Buttons: Fulfills open syllabus promise */}
        <div className="mt-6 flex items-center gap-2.5 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => onOpenSyllabus(course)}
            aria-label={`Tinjau silabus dan materi kelas ${course.title}`}
            className="flex-1 rounded-xl border border-slate-200 bg-white py-2 px-3 text-center text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#069871] cursor-pointer"
          >
            Tinjau Silabus
          </button>

          <a
            href={`/courses/${course.slug}`}
            className="flex-1 rounded-xl bg-[#069871] py-2 px-3 text-center text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#057a5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#069871]"
          >
            Mulai Belajar
          </a>
        </div>
      </div>
    </article>
  );
};
