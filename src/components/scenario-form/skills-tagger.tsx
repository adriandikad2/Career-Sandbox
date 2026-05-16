'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { SKILLS } from '@/lib/mock-data';

interface SkillsTaggerProps {
  value: string[];
  onChange: (val: string[]) => void;
  hasError?: boolean;
}

export function SkillsTagger({ value, onChange, hasError }: SkillsTaggerProps) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = SKILLS.filter(
    (s) =>
      s.toLowerCase().includes(input.toLowerCase()) &&
      !value.includes(s)
  );

  const addSkill = (skill: string) => {
    if (!value.includes(skill)) {
      onChange([...value, skill]);
    }
    setInput('');
    inputRef.current?.focus();
  };

  const removeSkill = (skill: string) => {
    onChange(value.filter((s) => s !== skill));
  };

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
      <label htmlFor="skills-input" className="block text-sm font-medium text-text-secondary mb-2">
        Current Skills
      </label>

      <div
        className={`
          w-full min-h-[48px] px-3 py-2 rounded-xl bg-bg-elevated border text-sm
          flex flex-wrap gap-2 items-center cursor-text transition-all duration-200
          ${hasError ? 'border-warning ring-1 ring-warning/40' : 'border-border-subtle focus-within:border-accent'}
        `}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent/15 text-accent text-xs font-medium"
          >
            {skill}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeSkill(skill);
              }}
              className="hover:text-white transition-colors"
              aria-label={`Remove ${skill}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          id="skills-input"
          type="text"
          value={input}
          placeholder={value.length === 0 ? 'Type to add skills...' : ''}
          onChange={(e) => {
            setInput(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              e.preventDefault();
              addSkill(input.trim());
            }
            if (e.key === 'Backspace' && !input && value.length > 0) {
              removeSkill(value[value.length - 1]);
            }
          }}
          className="flex-1 min-w-[120px] bg-transparent text-text-primary placeholder:text-text-muted outline-none text-sm"
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="skills-list"
        />
      </div>

      {isOpen && filtered.length > 0 && (
        <ul
          id="skills-list"
          role="listbox"
          className="absolute z-40 mt-2 w-full max-h-48 overflow-y-auto rounded-xl bg-bg-elevated border border-border-subtle shadow-2xl"
        >
          {filtered.slice(0, 15).map((skill) => (
            <li
              key={skill}
              role="option"
              aria-selected={false}
              onClick={() => {
                addSkill(skill);
                setIsOpen(false);
              }}
              className="px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-surface hover:text-text-primary cursor-pointer transition-colors flex items-center gap-2"
            >
              <Plus size={12} className="text-text-muted" />
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
