import React from 'react';
import { Clock, BookOpen } from 'lucide-react';
import { Course } from '../types';
import { DifficultyBadge } from './DifficultyBadge';

interface CourseCardProps {
  course: Course;
  onOpenSyllabus: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onOpenSyllabus }) => {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-within:ring-2 focus-within:ring-[#069871]">
      {/* Clean image container: Unobstructed artwork */}
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
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight line-clamp-1 group-hover:text-[#069871] transition-colors">
          {course.title}
        </h3>

        {/* Tagline with fixed 2-line box (42px) to prevent height jumping across cards */}
        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed line-clamp-2 min-h-[2.625rem]">
          {course.tagline}
        </p>

        {/* Metadata row with Cellular Signal Badge, Clock, and BookOpen icons - anchored to exact same baseline */}
        <div className="mt-auto pt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500">
          <DifficultyBadge level={course.level} />
          <span className="inline-flex items-center gap-1 font-mono text-slate-500">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{course.durationText}</span>
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-slate-500">
            <BookOpen className="h-3.5 w-3.5 text-slate-400" />
            <span>{course.lessonCount} lesson</span>
          </span>
        </div>

        {/* Action Buttons: Aligned on the exact same baseline */}
        <div className="mt-4 flex items-center gap-2.5 border-t border-slate-100 pt-4">
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
