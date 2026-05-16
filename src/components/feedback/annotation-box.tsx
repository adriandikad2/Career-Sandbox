'use client';

import { useCareerStore } from '@/store/career-store';

export function AnnotationBox() {
  const { annotations, setAnnotations } = useCareerStore();

  return (
    <div>
      <label htmlFor="annotations" className="block text-sm font-medium text-text-secondary mb-2">
        Your Annotations
      </label>
      <p className="text-xs text-text-muted mb-3">
        Tulis catatan, kekhawatiran, atau feedback team alignment di sini.
      </p>
      <div className="relative">
        <textarea
          id="annotations"
          value={annotations}
          onChange={(e) => setAnnotations(e.target.value)}
          placeholder="e.g. Path ini cocok dengan OKR tim Q3, tapi perlu validasi dari manager tentang timeline sertifikasi..."
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border-subtle text-sm text-text-primary placeholder:text-text-muted resize-y transition-all duration-200 focus:border-accent leading-relaxed"
          aria-label="Write your annotations and feedback"
        />
        <span className="absolute bottom-3 right-3 text-[10px] text-text-muted">
          {annotations.length} characters
        </span>
      </div>
    </div>
  );
}
