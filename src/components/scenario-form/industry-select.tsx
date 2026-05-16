'use client';

import { useState, useRef, useEffect } from 'react';
import { INDUSTRIES } from '@/lib/mock-data';
import { Building2 } from 'lucide-react';

interface IndustrySelectProps {
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
}

export function IndustrySelect({ value, onChange, hasError }: IndustrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const filtered = INDUSTRIES.filter((i) =>
    i.toLowerCase().includes((filter || value).toLowerCase())
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
      <label htmlFor="industry-select" className="block text-sm font-medium text-text-secondary mb-2">
        Industry / Domain
      </label>
      <div className="relative">
        <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          id="industry-select"
          type="text"
          value={filter || value}
          placeholder="e.g. Fintech, Healthcare..."
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
          aria-controls="industry-list"
        />
      </div>

      {isOpen && filtered.length > 0 && (
        <ul
          id="industry-list"
          role="listbox"
          className="absolute z-40 mt-2 w-full max-h-48 overflow-y-auto rounded-xl bg-bg-elevated border border-border-subtle shadow-2xl"
        >
          {filtered.map((industry) => (
            <li
              key={industry}
              role="option"
              aria-selected={value === industry}
              onClick={() => {
                onChange(industry);
                setFilter('');
                setIsOpen(false);
              }}
              className={`
                px-4 py-2.5 text-sm cursor-pointer transition-colors
                ${value === industry ? 'bg-accent/15 text-accent' : 'text-text-secondary hover:bg-bg-surface hover:text-text-primary'}
              `}
            >
              {industry}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
