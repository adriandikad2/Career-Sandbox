'use client';

import { AlertCircle, ShieldAlert, Info, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrustBannerProps {
  confidence: number;
  isOffline?: boolean;
}

export function TrustBanner({ confidence, isOffline }: TrustBannerProps) {
  if (isOffline) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border-l-4 border-orange-400 bg-orange-50 p-4"
      >
        <div className="flex gap-3">
          <AlertCircle size={20} className="mt-0.5 flex-shrink-0 text-orange-600" />
          <div>
            <h3 className="font-semibold text-orange-900">Offline Mode Active</h3>
            <p className="mt-1 text-sm text-orange-800">
              Sistem Generatif AI sedang offline. Menampilkan blueprint jalur karir standar berdasarkan
              template. Koneksi akan digunakan jika tersedia.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const confidenceLevel: { label: string; color: 'green' | 'blue' | 'yellow' | 'red'; icon: string } =
    confidence >= 80
      ? { label: 'High', color: 'green', icon: '✓' }
      : confidence >= 60
        ? { label: 'Moderate', color: 'blue', icon: '⚡' }
        : confidence >= 40
          ? { label: 'Medium', color: 'yellow', icon: '⚠️' }
          : { label: 'Low', color: 'red', icon: '⚠️' };

  const colorClasses = {
    green: 'bg-green-50 border-green-200 text-green-900',
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    red: 'bg-red-50 border-red-200 text-red-900',
  } as const;

  const iconClasses = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border-l-4 p-4 ${colorClasses[confidenceLevel.color]}`}
    >
      <div className="flex items-start gap-3">
        <ShieldAlert size={20} className={`mt-0.5 flex-shrink-0 ${iconClasses[confidenceLevel.color]}`} />

        <div className="flex-1">
          {/* Main Message */}
          <h3 className="font-semibold">
            {confidenceLevel.label} Confidence Path ({confidence}%)
          </h3>

          {/* Description */}
          <p className="mt-1 text-sm">
            {confidence >= 80
              ? '✓ Jalur ini memiliki dasar yang kuat dengan milestone yang well-defined dan market validation yang jelas.'
              : confidence >= 60
                ? '⚡ Jalur ini achievable dengan effort yang consistent. Beberapa steps mungkin memerlukan flexibility.'
                : confidence >= 40
                  ? '⚠️ Jalur ini challenging dan memerlukan commitment tinggi. Pertimbangkan untuk relaksasi constraint.'
                  : '⚠️ Jalur ini sangat uncertain. Sangat disarankan untuk menyesuaikan target, timeline, atau effort.'}
          </p>

          {/* Key Points */}
          <div className="mt-3 grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="flex-shrink-0" />
              <span>
                <strong>Data Source:</strong> Knowledge base dengan{' '}
                {confidence >= 70 ? '80%+' : confidence >= 50 ? '60%+' : '40%+'} role coverage
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Info size={14} className="flex-shrink-0" />
              <span>
                <strong>Factors:</strong>{' '}
                {confidence >= 70
                  ? 'Realistis timeline, effort memadai, skill gap manageable'
                  : confidence >= 50
                    ? 'Beberapa faktor constraint saling bertentangan'
                    : 'Timeline aggressive, effort insufficient, atau skill gap besar'}
              </span>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-3 text-xs opacity-80">
            💡 Catatan: Confidence score berbasis historical data patterns dan industry benchmarks,
            bukan garansi kepastian. Path ini adalah rekomendasi, bukan keputusan final. Anda
            memiliki autonomi penuh untuk memilih trajectory Anda sendiri.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
