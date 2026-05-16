'use client';

import { motion } from 'framer-motion';
import { AlertOctagon, RotateCcw, Search, Home } from 'lucide-react';
import Link from 'next/link';
import { useCareerStore } from '@/store/career-store';
import { getRelaxedConstraints } from '@/lib/validation';

export function HighUncertaintyState() {
  const { formData, setFormField, setErrorState } = useCareerStore();
  const relaxed = getRelaxedConstraints(formData);

  const handleRelax = () => {
    if (relaxed.hoursPerWeek !== undefined) setFormField('hoursPerWeek', relaxed.hoursPerWeek);
    if (relaxed.targetTimeline) setFormField('targetTimeline', relaxed.targetTimeline);
    if (relaxed.monthsDuration !== undefined) setFormField('monthsDuration', relaxed.monthsDuration);
    setErrorState('none');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[500px] text-center px-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className="w-20 h-20 rounded-3xl bg-danger/15 flex items-center justify-center mb-6"
      >
        <AlertOctagon size={36} className="text-danger" />
      </motion.div>

      <h2 className="text-xl font-bold text-text-primary mb-3 max-w-md">
        Gagal Memetakan Jalur
      </h2>
      <p className="text-sm text-text-secondary max-w-lg mb-8 leading-relaxed">
        Kombinasi target dan constraint ini menghasilkan tingkat ketidakpastian yang terlalu tinggi.
        Sistem tidak dapat menghasilkan proyeksi yang bermakna tanpa menghasilkan data yang menyesatkan.
      </p>

      {/* Before/After contrast for relaxation */}
      <div className="glass-card p-4 mb-8 max-w-sm w-full">
        <p className="text-xs text-text-muted mb-3 font-medium">Suggested Adjustments:</p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-text-muted">Jam/minggu:</span>
            <span>
              <span className="text-danger line-through">{formData.hoursPerWeek}</span>
              {' → '}
              <span className="text-success font-semibold">{relaxed.hoursPerWeek}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Timeline:</span>
            <span>
              <span className="text-danger line-through">{formData.targetTimeline}</span>
              {' → '}
              <span className="text-success font-semibold">{relaxed.targetTimeline}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleRelax}
          className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors flex items-center gap-2"
        >
          <RotateCcw size={14} />
          Relaksasi Constraint
        </button>
        <button
          onClick={() => setErrorState('none')}
          className="px-5 py-2.5 rounded-xl bg-bg-elevated text-text-secondary text-sm font-medium hover:text-text-primary transition-colors flex items-center gap-2 border border-border-subtle"
        >
          <Search size={14} />
          Lihat Skenario Serupa
        </button>
        <Link
          href="/scenario"
          className="px-5 py-2.5 rounded-xl bg-bg-elevated text-text-secondary text-sm font-medium hover:text-text-primary transition-colors flex items-center gap-2 border border-border-subtle"
        >
          <Home size={14} />
          Mulai dari Awal
        </Link>
      </div>
    </motion.div>
  );
}
