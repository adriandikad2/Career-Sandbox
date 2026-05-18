'use client';

import { useCallback } from 'react';
import { useCareerStore } from '@/store/career-store';
import { useOnlineStatus } from './use-online-status';
import type { GenerateResponse, FeedbackContext } from '@/lib/types';
import { OFFLINE_BLUEPRINT_NODES, OFFLINE_BLUEPRINT_EDGES } from '@/lib/mock-data';
import FeedbackProcessor from '@/lib/feedback-processor';

/**
 * Custom hook encapsulating scenario generation with error handling,
 * offline fallback, and state management.
 */
export function useScenario() {
  const isOnline = useOnlineStatus();
  const {
    formData,
    annotations,
    feedbackTags,
    setScenario,
    setIsGenerating,
    setErrorState,
    setFormField,
    isGenerating,
    errorState,
    scenario,
  } = useCareerStore();

  /**
   * Generate scenario with optional feedback context
   */
  const generate = useCallback(
    async (useFeedback = false) => {
      // ─── Offline fallback ──────────────────────────────
      if (!isOnline) {
        setErrorState('offline');
        setScenario({
          nodes: OFFLINE_BLUEPRINT_NODES,
          edges: OFFLINE_BLUEPRINT_EDGES,
          tradeoffs: [],
          overallConfidence: 100,
        });
        return;
      }

      setIsGenerating(true);
      setErrorState('none');

      try {
        // Prepare feedback context if regenerating with feedback
        let feedbackContext: FeedbackContext | undefined;
        let adjustedFormData = formData;

        if (useFeedback && (annotations || feedbackTags.length > 0)) {
          feedbackContext = {
            annotations,
            feedbackTags,
            timestamp: Date.now(),
          };

          // Process feedback and adjust parameters
          const { formData: processed } = FeedbackProcessor.processAndAdjust(
            formData,
            feedbackContext,
            scenario?.nodes
          );
          adjustedFormData = processed;
        }

        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formData: adjustedFormData,
            feedbackContext,
          }),
          signal: AbortSignal.timeout(15000), // 15s timeout
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data: GenerateResponse = await res.json();

        if (!data.success || (data.uncertainty && data.uncertainty > 90)) {
          setErrorState('high-uncertainty');
          setScenario(null);
          return;
        }

        if (data.scenario) {
          setScenario(data.scenario);
          setErrorState('none');
        }
      } catch (err) {
        // Network error or timeout → offline fallback
        console.error('Scenario generation failed:', err);
        setErrorState('offline');
        setScenario({
          nodes: OFFLINE_BLUEPRINT_NODES,
          edges: OFFLINE_BLUEPRINT_EDGES,
          tradeoffs: [],
          overallConfidence: 100,
        });
      } finally {
        setIsGenerating(false);
      }
    },
    [
      formData,
      annotations,
      feedbackTags,
      isOnline,
      scenario,
      setScenario,
      setIsGenerating,
      setErrorState,
      setFormField,
    ]
  );

  return {
    generate,
    isGenerating,
    errorState,
    scenario,
    isOnline,
  };
}

