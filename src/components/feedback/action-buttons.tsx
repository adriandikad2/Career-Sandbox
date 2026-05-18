'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, RefreshCw, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useCareerStore } from '@/store/career-store';
import { useScenario } from '@/hooks/use-scenario';

export function ActionButtons() {
  const router = useRouter();
  const { savePath, scenario, annotations, feedbackTags } = useCareerStore();
  const { generate, isGenerating } = useScenario();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    savePath();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleRegenerate = async () => {
    // Regenerate with feedback if any feedback was provided
    const hasFeedback = annotations.trim().length > 0 || feedbackTags.length > 0;
    await generate(hasFeedback);
    router.push('/visualizer');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Save Path */}
      <motion.button
        type="button"
        onClick={handleSave}
        disabled={!scenario || saved}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`
          flex-1 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 transition-all duration-300
          ${saved
            ? 'bg-success/20 text-success border border-success/30'
            : scenario
              ? 'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20'
              : 'bg-bg-elevated text-text-muted cursor-not-allowed'
          }
        `}
        id="save-path-btn"
      >
        <AnimatePresence mode="wait">
          {saved ? (
            <motion.span
              key="saved"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <Check size={16} />
              Path Saved!
            </motion.span>
          ) : (
            <motion.span
              key="save"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              Save Path
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Regenerate */}
      <motion.button
        type="button"
        onClick={handleRegenerate}
        disabled={isGenerating}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="flex-1 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 bg-bg-elevated text-text-secondary border border-border-subtle hover:border-accent/30 hover:text-text-primary transition-all duration-300"
        id="regenerate-btn"
      >
        {isGenerating ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Regenerating...
          </>
        ) : (
          <>
            <RefreshCw size={16} />
            Regenerate Scenario
          </>
        )}
      </motion.button>
    </div>
  );
}

