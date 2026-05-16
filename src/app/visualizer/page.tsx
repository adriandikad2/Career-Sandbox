'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { useCareerStore } from '@/store/career-store';
import { TrustBanner } from '@/components/visualizer/trust-banner';
import { CareerCanvas } from '@/components/visualizer/career-canvas';
import { HighUncertaintyState } from '@/components/error-states/high-uncertainty';
import { OfflineBanner } from '@/components/error-states/offline-fallback';

export default function VisualizerPage() {
  const router = useRouter();
  const { scenario, isGenerating, errorState } = useCareerStore();

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
      {isOffline ? <OfflineBanner /> : <TrustBanner />}

      {/* Navigation bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle bg-bg-surface/50">
        <Link
          href="/scenario"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Edit Scenario
        </Link>

        <h1 className="text-sm font-semibold text-text-primary">
          Career Path Visualizer
        </h1>

        <Link
          href="/feedback"
          className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors font-medium"
        >
          Feedback & Save
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Canvas */}
      <div className="flex-1">
        <CareerCanvas
          careerNodes={scenario.nodes}
          careerEdges={scenario.edges}
          tradeoffs={scenario.tradeoffs}
          isOffline={isOffline}
        />
      </div>
    </motion.div>
  );
}
