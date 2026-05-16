'use client';

import { X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TradeoffItem } from '@/lib/types';

interface TradeoffPanelProps {
  tradeoff: TradeoffItem | null;
  onClose: () => void;
}

export function TradeoffPanel({ tradeoff, onClose }: TradeoffPanelProps) {
  return (
    <AnimatePresence>
      {tradeoff && (
        <motion.aside
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-full w-[340px] bg-bg-surface border-l border-border-subtle z-40 flex flex-col shadow-2xl"
          role="complementary"
          aria-label="Trade-off explanations panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border-subtle">
            <h2 className="text-base font-semibold text-text-primary">
              Trade-off Explanations
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
              aria-label="Close panel"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <div>
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Selected Node
              </span>
              <h3 className="text-lg font-bold text-text-primary mt-1">
                {tradeoff.nodeLabel}
              </h3>
            </div>

            {/* Pros */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ThumbsUp size={14} className="text-success" />
                <span className="text-sm font-semibold text-success">Keuntungan</span>
              </div>
              <ul className="space-y-2">
                {tradeoff.pros.map((pro, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="text-success font-bold mt-0.5">+</span>
                    <span>{pro}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ThumbsDown size={14} className="text-danger" />
                <span className="text-sm font-semibold text-danger">Risiko</span>
              </div>
              <ul className="space-y-2">
                {tradeoff.cons.map((con, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="text-danger font-bold mt-0.5">−</span>
                    <span>{con}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-border-subtle">
            <p className="text-[10px] text-text-muted leading-relaxed">
              Trade-off analysis didasarkan pada aggregate data dari framework kompetensi industri dan historical career transition patterns.
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
