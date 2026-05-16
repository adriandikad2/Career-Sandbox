'use client';

import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { CAREER_TARGETS } from '@/lib/mock-data';

interface CareerTargetProps {
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
}

export function CareerTarget({ value, onChange, hasError }: CareerTargetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const filtered = CAREER_TARGETS.filter((t) =>
    t.toLowerCase().includes((filter || value).toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label htmlFor="career-target" className="block text-sm font-medium text-text-secondary mb-2">
        Career Target
      </label>
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          id="career-target"
          type="text"
          value={filter || value}
          placeholder="e.g. AI Researcher, Product Manager..."
          onChange={(e) => {
            setFilter(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className={`
            w-full pl-10 pr-4 py-3 rounded-xl bg-bg-elevated border text-sm text-text-primary
            placeholder:text-text-muted transition-all duration-200
            ${hasError ? 'border-warning ring-1 ring-warning/40' : 'border-border-subtle focus:border-accent'}
          `}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="career-target-list"
        />
      </div>

      {isOpen && filtered.length > 0 && (
        <ul
          id="career-target-list"
          role="listbox"
          className="absolute z-40 mt-2 w-full max-h-48 overflow-y-auto rounded-xl bg-bg-elevated border border-border-subtle shadow-2xl"
        >
          {filtered.map((target) => (
            <li
              key={target}
              role="option"
              aria-selected={value === target}
              onClick={() => {
                onChange(target);
                setFilter('');
                setIsOpen(false);
              }}
              className={`
                px-4 py-2.5 text-sm cursor-pointer transition-colors
                ${value === target ? 'bg-accent/15 text-accent' : 'text-text-secondary hover:bg-bg-surface hover:text-text-primary'}
              `}
            >
              {target}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
