'use client';

import { TIMELINES } from '@/lib/mock-data';
import { ChevronDown } from 'lucide-react';

interface TimelineSelectProps {
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
}

export function TimelineSelect({ value, onChange, hasError }: TimelineSelectProps) {
  return (
    <div>
      <label htmlFor="timeline-select" className="block text-sm font-medium text-text-secondary mb-2">
        Target Timeline
      </label>
      <div className="relative">
        <select
          id="timeline-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full px-4 py-3 rounded-xl bg-bg-elevated border text-sm text-text-primary
            appearance-none cursor-pointer transition-all duration-200
            ${hasError ? 'border-warning ring-1 ring-warning/40' : 'border-border-subtle focus:border-accent'}
          `}
          aria-label="Select target timeline"
        >
          {TIMELINES.map(({ value: v, label }) => (
            <option key={v} value={v}>
              {label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
      </div>
    </div>
  );
}
