'use client';

import { AlertTriangle } from 'lucide-react';
import type { ValidationError } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface ValidationEngineProps {
  errors: ValidationError[];
}

export function ValidationEngine({ errors }: ValidationEngineProps) {
  if (errors.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="rounded-xl border border-warning/30 bg-warning/5 p-4 space-y-2"
        role="alert"
        aria-live="polite"
      >
        <div className="flex items-center gap-2 text-warning text-sm font-medium mb-2">
          <AlertTriangle size={16} />
          Validasi Constraint
        </div>
        {errors.map((error, i) => (
          <motion.p
            key={`${error.field}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-xs text-text-secondary pl-6"
          >
            <span className="text-warning font-medium">•</span>{' '}
            {error.message}
          </motion.p>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
