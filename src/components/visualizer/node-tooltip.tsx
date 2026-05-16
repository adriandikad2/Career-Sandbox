'use client';

import { X, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NodeTooltipProps {
  isOpen: boolean;
  nodeLabel: string;
  reasoning: string;
  onClose: () => void;
  position?: { x: number; y: number };
}

export function NodeTooltip({ isOpen, nodeLabel, reasoning, onClose }: NodeTooltipProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[420px] max-w-[calc(100vw-2rem)]"
          role="tooltip"
          aria-describedby="node-reasoning"
        >
          <div className="glass-card p-5 shadow-2xl border-accent/20">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <HelpCircle size={16} className="text-accent" />
                <h4 className="text-sm font-semibold text-text-primary">
                  Kenapa AI merekomendasikan ini?
                </h4>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg bg-bg-elevated flex items-center justify-center text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
                aria-label="Close tooltip"
              >
                <X size={14} />
              </button>
            </div>

            <p className="text-xs text-accent font-medium mb-2">{nodeLabel}</p>
            <p id="node-reasoning" className="text-sm text-text-secondary leading-relaxed">
              {reasoning}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
