import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onOpenSyllabus: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onOpenSyllabus }) => {
  // Semantic level indicator dot matching pawang.io's brand palette
  const getLevelDot = (level: string) => {
    switch (level) {
      case 'Dasar':
        return 'bg-purple-500';
      case 'Menengah':
        return 'bg-fuchsia-500';
      case 'Mahir':
        return 'bg-pink-500';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-within:ring-2 focus-within:ring-[#069871]">
      {/* Clean image container: Unobstructed artwork, no floating AI pill badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
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
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#069871] transition-colors">
            {course.title}
          </h3>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
            {course.tagline}
          </p>

          {/* Clean typographic metadata row, letting typography do the work without icon clutter */}
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
              <span className={`h-2 w-2 rounded-full ${getLevelDot(course.level)}`} aria-hidden="true" />
              {course.level}
            </span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span>{course.durationText}</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span>{course.lessonCount} lesson</span>
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
            className="flex-1 rounded-xl bg-[#069871] py-2 px-3 text-center text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#057a5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#069871]"
          >
            Mulai Belajar
          </a>
        </div>
      </div>
    </article>
  );
};
