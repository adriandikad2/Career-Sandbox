'use client';

import { useCareerStore } from '@/store/career-store';
import { FEEDBACK_TAGS } from '@/lib/mock-data';
import type { FeedbackTag } from '@/lib/types';

export function FeedbackTags() {
  const { feedbackTags, toggleTag } = useCareerStore();

  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-2">
        Quick Feedback
      </label>
      <p className="text-xs text-text-muted mb-3">
        Klik tag untuk memberi label cepat pada jalur karir yang digenerate.
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Feedback tags">
        {FEEDBACK_TAGS.map((tag) => {
          const isActive = feedbackTags.includes(tag as FeedbackTag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag as FeedbackTag)}
              aria-pressed={isActive}
              className={`
                px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200
                ${isActive
                  ? 'bg-accent text-white shadow-md shadow-accent/20'
                  : 'bg-bg-elevated text-text-muted border border-border-subtle hover:border-border-active hover:text-text-primary'
                }
              `}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
