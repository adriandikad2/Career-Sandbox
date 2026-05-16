'use client';

import { ShieldAlert } from 'lucide-react';

export function TrustBanner() {
  return (
    <div
      className="w-full px-5 py-3 bg-warning/10 border-b border-warning/20 flex items-center gap-3"
      role="alert"
      aria-label="Uncertainty awareness notice"
    >
      <ShieldAlert size={18} className="text-warning flex-shrink-0" />
      <p className="text-xs text-warning font-medium">
        <span className="font-bold">Uncertainty Awareness</span> — projections are estimated, not guarantees. Confidence scores reflect historical data patterns, not certainties.
      </p>
    </div>
  );
}
