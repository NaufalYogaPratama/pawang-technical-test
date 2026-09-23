import React from 'react';
import { Clock, BookOpen, Layers, Sparkles } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onOpenSyllabus: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onOpenSyllabus }) => {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12131C] transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-indigo-950/30 focus-within:ring-2 focus-within:ring-indigo-500">
      {/* Aspect ratio container preventing CLS */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
        <img
          src={course.image.src}
          alt={course.image.alt}
          width={course.image.width}
          height={course.image.height}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12131C] via-transparent to-transparent opacity-90" />

        {/* Level Badge */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white">
          <Sparkles className="h-3 w-3 text-indigo-400" />
          {course.level}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Proper heading hierarchy: h3 inside course list */}
          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
            {course.title}
          </h3>

          <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-2">
            {course.tagline}
          </p>

          {/* Metadata badges */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="h-3.5 w-3.5 text-zinc-500" />
              {course.durationText}
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen className="h-3.5 w-3.5 text-zinc-500" />
              {course.lessonCount} Lesson
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="flex items-center gap-1.5 font-medium">
              <Layers className="h-3.5 w-3.5 text-zinc-500" />
              {course.moduleCount} Modul
            </span>
          </div>
        </div>

        {/* Action Buttons: Dual Action UX solving the 'Silabus Terbuka' paradox */}
        <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => onOpenSyllabus(course)}
            aria-label={`Tinjau silabus dan materi kelas ${course.title}`}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2 px-3 text-xs font-semibold text-zinc-200 transition-all hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
          >
            Tinjau Silabus
          </button>

          <a
            href={`/courses/${course.slug}`}
            className="flex-1 rounded-xl bg-indigo-600 py-2 px-3 text-center text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Mulai Belajar
          </a>
        </div>
      </div>
    </article>
  );
};
