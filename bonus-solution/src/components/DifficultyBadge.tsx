import React from 'react';
import { Level } from '../types';

interface DifficultyBadgeProps {
  level: Level;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ level }) => {
  const getBadgeConfig = () => {
    switch (level) {
      case 'Dasar':
        return {
          containerClass: 'border-purple-300/80 bg-purple-50/70 text-purple-700',
          bars: [1, 0.25, 0.25],
        };
      case 'Menengah':
        return {
          containerClass: 'border-fuchsia-300/80 bg-fuchsia-50/70 text-fuchsia-700',
          bars: [1, 1, 0.25],
        };
      case 'Mahir':
        return {
          containerClass: 'border-pink-300/80 bg-pink-50/70 text-pink-700',
          bars: [1, 1, 1],
        };
      default:
        return {
          containerClass: 'border-slate-300 bg-slate-50 text-slate-600',
          bars: [1, 0.25, 0.25],
        };
    }
  };

  const { containerClass, bars } = getBadgeConfig();

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap shrink-0 ${containerClass}`}
      aria-label={`Tingkat kesulitan: ${level}`}
    >
      {/* Cellular signal bars indicating difficulty level */}
      <svg
        viewBox="0 0 12 10"
        className="h-2.5 w-3 shrink-0"
        fill="currentColor"
        aria-hidden="true"
      >
        <rect x="0" y="7" width="2.6" height="3" rx="0.8" opacity={bars[0]} />
        <rect x="4.5" y="4" width="2.6" height="6" rx="0.8" opacity={bars[1]} />
        <rect x="9" y="1" width="2.6" height="9" rx="0.8" opacity={bars[2]} />
      </svg>
      <span>{level}</span>
    </span>
  );
};
