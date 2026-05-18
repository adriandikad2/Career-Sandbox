'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { useCareerStore } from '@/store/career-store';
import { TrustBanner } from '@/components/visualizer/trust-banner';
import { CareerCanvas } from '@/components/visualizer/career-canvas';
import { ConfidenceSummaryPanel } from '@/components/visualizer/confidence-summary-panel';
import { HighUncertaintyState } from '@/components/error-states/high-uncertainty';
import { OfflineBanner } from '@/components/error-states/offline-fallback';
import { HRReviewPanel } from '@/components/visualizer/hr-review-panel';

export default function VisualizerPage() {
  const router = useRouter();
  const { scenario, isGenerating, errorState, userRole, activeSavedPathId, savedPaths } = useCareerStore();
  const isHR = userRole === 'hr';
  const currentPath = savedPaths.find((p) => p.id === activeSavedPathId);

  // Redirect if no scenario data
  useEffect(() => {
    if (!scenario && !isGenerating && errorState === 'none') {
      // Give a moment for store hydration
      const timeout = setTimeout(() => {
        const state = useCareerStore.getState();
        if (!state.scenario && !state.isGenerating && state.errorState === 'none') {
          router.push('/scenario');
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [scenario, isGenerating, errorState, router]);

  // Loading state
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="relative">
          <Loader2 size={40} className="animate-spin text-accent" />
          <div className="absolute inset-0 animate-pulse-glow rounded-full" />
        </div>
        <p className="text-sm text-text-secondary">Generating career scenario...</p>
        <p className="text-xs text-text-muted">Analyzing constraints and mapping paths</p>
      </div>
    );
  }

  // High uncertainty error
  if (errorState === 'high-uncertainty') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HighUncertaintyState />
      </div>
    );
  }

  // No scenario
  if (!scenario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-sm text-text-secondary">No scenario generated yet.</p>
        <Link
          href="/scenario"
          className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          Create Scenario
        </Link>
      </div>
    );
  }

  const isOffline = errorState === 'offline';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex flex-col"
    >
      {/* Trust / Offline Banner */}
      {isOffline ? (
        <OfflineBanner />
      ) : (
        <TrustBanner confidence={scenario.overallConfidence} />
      )}

      {/* Navigation bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle bg-bg-surface/50">
        <Link
          href={isHR ? "/" : "/scenario"}
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          {isHR ? "Back to Dashboard" : "Edit Scenario"}
        </Link>

        <h1 className="text-sm font-semibold text-text-primary">
          Career Path Visualizer {isHR && <span className="text-xs ml-2 text-accent px-2 py-0.5 bg-accent/10 rounded-full">HR Review Mode</span>}
        </h1>

        {!isHR ? (
          <Link
            href="/feedback"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors font-medium"
          >
            Feedback & Save
            <ArrowRight size={14} />
          </Link>
        ) : (
          <div className="w-[100px]"></div> /* Placeholder for alignment */
        )}
      </div>

      {/* Canvas and Confidence Summary */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Main Canvas */}
        <div className="flex-1 min-w-0">
          <CareerCanvas
            careerNodes={scenario.nodes}
            careerEdges={scenario.edges}
            tradeoffs={scenario.tradeoffs}
            isOffline={isOffline}
          />
        </div>

        {/* Confidence Summary Sidebar */}
        <div className="w-80 flex-shrink-0 overflow-y-auto flex flex-col pt-1">
          <ConfidenceSummaryPanel scenario={scenario} />
          {isHR && <HRReviewPanel />}
          {!isHR && currentPath && currentPath.status !== 'pending' && (
            <div className="bg-bg-surface border border-border-subtle rounded-xl p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                  currentPath.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                  currentPath.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                  'bg-yellow-500/10 text-yellow-500'
                }`}>
                  HR {currentPath.status?.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-text-secondary whitespace-pre-wrap">
                {currentPath.hrFeedback || "No additional feedback provided."}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
