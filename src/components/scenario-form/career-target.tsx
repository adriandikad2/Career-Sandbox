'use client';

import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { CAREER_TARGETS } from '@/lib/mock-data';

interface CareerTargetProps {
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
  errorMessage?: string;
}

export function CareerTarget({ value, onChange, hasError, errorMessage }: CareerTargetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = CAREER_TARGETS.filter((t) =>
    t.toLowerCase().includes((filter || value).toLowerCase())
  );

  const errorId = 'career-target-error';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0) {
          onChange(filtered[focusedIndex]);
          setFilter('');
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        inputRef.current?.focus();
        break;
    }
  };

  return (
    <div ref={ref} className="relative">
      <label htmlFor="career-target" className="block text-sm font-medium text-text-secondary mb-2">
        Career Target
      </label>
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" aria-hidden="true" />
        <input
          ref={inputRef}
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
          onKeyDown={handleKeyDown}
          className={`
            w-full pl-10 pr-4 py-3 rounded-xl bg-bg-elevated border text-sm text-text-primary
            placeholder:text-text-muted transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            ${hasError ? 'border-warning ring-1 ring-warning/40 focus-visible:ring-warning' : 'border-border-subtle focus-visible:ring-accent'}
          `}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="career-target-list"
          aria-describedby={hasError ? errorId : undefined}
        />
      </div>

      {hasError && errorMessage && (
        <p id={errorId} className="mt-2 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      {isOpen && filtered.length > 0 && (
        <ul
          id="career-target-list"
          role="listbox"
          className="absolute z-40 mt-2 w-full max-h-48 overflow-y-auto rounded-xl bg-bg-elevated border border-border-subtle shadow-2xl"
        >
          {filtered.map((target, index) => (
            <li
              key={target}
              role="option"
              aria-selected={value === target}
              onClick={() => {
                onChange(target);
                setFilter('');
                setIsOpen(false);
                setFocusedIndex(-1);
              }}
              className={`
                px-4 py-2.5 text-sm cursor-pointer transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent
                ${focusedIndex === index || value === target ? 'bg-accent/15 text-accent' : 'text-text-secondary hover:bg-bg-surface hover:text-text-primary'}
              `}
              onMouseEnter={() => setFocusedIndex(index)}
            >
              {target}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
