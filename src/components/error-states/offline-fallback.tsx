'use client';

import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
  return (
    <div
      className="w-full px-5 py-3 bg-danger/15 border-b border-danger/30 flex items-center gap-3"
      role="alert"
      aria-live="assertive"
    >
      <WifiOff size={18} className="text-danger flex-shrink-0" />
      <p className="text-xs text-danger font-medium">
        <span className="font-bold">Sistem Generatif AI Offline.</span>{' '}
        Menampilkan blueprint jalur karir standar. Koneksi diperlukan untuk skenario yang dipersonalisasi.
      </p>
    </div>
  );
}
