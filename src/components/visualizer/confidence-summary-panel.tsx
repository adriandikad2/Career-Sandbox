'use client';

import { useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { GeneratedScenario } from '@/lib/types';
import { ConfidenceMeter } from './confidence-meter';

interface ConfidenceSummaryProps {
  scenario: GeneratedScenario;
  collapsed?: boolean;
}

/**
 * Collapsible confidence summary panel
 */
export function ConfidenceSummaryPanel({
  scenario,
  collapsed: initialCollapsed = false,
}: ConfidenceSummaryProps) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const stats = useMemo(() => {
    const avgConfidence =
      scenario.nodes.reduce((sum, n) => sum + n.confidence, 0) / scenario.nodes.length;
    const highConfidence = scenario.nodes.filter((n) => n.confidence >= 70).length;
    const lowConfidence = scenario.nodes.filter((n) => n.confidence < 40).length;

    return {
      avgConfidence: Math.round(avgConfidence),
      highConfidence,
      lowConfidence,
      total: scenario.nodes.length,
    };
  }, [scenario.nodes]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border-subtle bg-gradient-to-br from-bg-elevated to-bg-elevated/50 overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
              scenario.overallConfidence >= 70
                ? 'bg-gradient-to-br from-green-500 to-green-600'
                : scenario.overallConfidence >= 50
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                  : 'bg-gradient-to-br from-yellow-500 to-yellow-600'
            }`}
          >
            {scenario.overallConfidence}%
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-text-primary">Path Confidence</h3>
            <p className="text-xs text-text-secondary">
              {stats.highConfidence}/{stats.total} steps are high-confidence
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.2 }}
        >
          {isCollapsed ? (
            <ChevronDown size={20} className="text-text-muted" />
          ) : (
            <ChevronUp size={20} className="text-text-muted" />
          )}
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border-subtle px-6 py-4 overflow-hidden"
          >
            <ConfidenceMeter scenario={scenario} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats Footer */}
      {isCollapsed && (
        <div className="px-6 py-3 bg-bg-muted/30 border-t border-border-subtle flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-text-secondary">{stats.highConfidence} strong</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
            <span className="text-text-secondary">
              {stats.total - stats.highConfidence - stats.lowConfidence} medium
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-text-secondary">{stats.lowConfidence} focus</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ConfidenceSummaryPanel;
