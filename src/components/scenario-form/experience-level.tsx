'use client';

import type { ExperienceLevel } from '@/lib/types';

const LEVELS: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

interface ExperienceLevelProps {
  value: ExperienceLevel;
  onChange: (val: ExperienceLevel) => void;
  hasError?: boolean;
}

export function ExperienceLevelControl({ value, onChange, hasError }: ExperienceLevelProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-2">
        Experience Level
      </label>
      <div
        role="radiogroup"
        aria-label="Experience level selection"
        className={`
          flex rounded-xl border overflow-hidden transition-all duration-200
          ${hasError ? 'border-warning ring-1 ring-warning/40' : 'border-border-subtle'}
        `}
      >
        {LEVELS.map((level) => {
          const isActive = value === level;
          return (
            <button
              key={level}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(level)}
              className={`
                flex-1 py-3 text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'bg-bg-elevated text-text-muted hover:text-text-primary hover:bg-bg-surface'
                }
                ${level !== LEVELS[0] ? 'border-l border-border-subtle' : ''}
              `}
            >
              {level}
            </button>
          );
        })}
      </div>
    </div>
  );
}
