/**
 * Feedback Processor
 * Analyzes user feedback and adjusts scenario parameters for regeneration
 */

import type {
  ScenarioFormData,
  FeedbackTag,
  FeedbackContext,
  CareerNode,
} from './types';

export interface AdjustedParameters {
  formData: ScenarioFormData;
  strategy: string;
  explanation: string;
}

/**
 * Processes user feedback and suggests parameter adjustments
 */
export class FeedbackProcessor {
  /**
   * Analyze feedback and generate adjusted parameters for regeneration
   */
  static processAndAdjust(
    originalFormData: ScenarioFormData,
    feedbackContext: FeedbackContext,
    currentNodes?: CareerNode[]
  ): AdjustedParameters {
    const tags = feedbackContext.feedbackTags || [];
    const adjusted = { ...originalFormData };

    let strategy = '';
    let explanation = '';

    // Check for pace feedback
    if (tags.includes('Too Fast')) {
      adjusted.monthsDuration = Math.max(
        12,
        originalFormData.monthsDuration * 1.5
      );
      adjusted.hoursPerWeek = Math.max(5, originalFormData.hoursPerWeek * 0.8);
      strategy = 'Extended Timeline';
      explanation = 'Memperpanjang timeline pembelajaran dengan mengurangi beban jam per minggu untuk pembelajaran yang lebih mendalam.';
    }

    if (tags.includes('Too Slow')) {
      adjusted.monthsDuration = Math.max(3, originalFormData.monthsDuration * 0.7);
      adjusted.hoursPerWeek = Math.min(40, originalFormData.hoursPerWeek * 1.3);
      strategy = 'Accelerated Timeline';
      explanation = 'Mempercepat timeline dengan meningkatkan effort minggu untuk mencapai target lebih cepat.';
    }

    // Check for learning style feedback
    if (tags.includes('Too Theoretical')) {
      // This would be handled at node generation level
      strategy = strategy || 'Project-Based Learning';
      explanation = explanation || 'Fokus pada pembelajaran berbasis proyek praktis daripada teori abstrak.';
    }

    if (tags.includes('Project-Based')) {
      // Prefer project-based nodes
      strategy = strategy || 'Project-Based Learning';
      explanation = explanation || 'Prioritas pada milestone berbasis portofolio praktis dan real-world projects.';
    }

    // Check for realism feedback
    if (tags.includes('Unrealistic')) {
      // Extend timeline and reduce hours
      adjusted.monthsDuration = Math.max(
        adjusted.monthsDuration || 12,
        (adjusted.monthsDuration || 12) * 1.2
      );
      adjusted.hoursPerWeek = Math.max(5, (adjusted.hoursPerWeek || 10) * 0.9);

      // If it's a stretch goal, consider intermediate target
      if (originalFormData.experienceLevel === 'Beginner') {
        adjusted.careerTarget = this.findIntermediateTarget(
          originalFormData.careerTarget,
          originalFormData.industry
        );
      }

      strategy = strategy || 'Realistic Path';
      explanation = explanation || 'Menyesuaikan target dan constraint untuk menciptakan path yang lebih achievable dengan effort yang terukur.';
    }

    // If no specific feedback, provide default
    if (!strategy) {
      strategy = 'Alternative Path';
      explanation = 'Menghasilkan path alternatif berdasarkan preferensi yang Anda berikan.';
    }

    return {
      formData: adjusted,
      strategy,
      explanation,
    };
  }

  /**
   * Extract learning style preference from feedback
   */
  static extractLearningStyle(feedbackContext: FeedbackContext): 'theoretical' | 'practical' | 'mixed' {
    const tags = feedbackContext.feedbackTags || [];

    if (tags.includes('Too Theoretical')) return 'practical';
    if (tags.includes('Project-Based')) return 'practical';
    if (tags.includes('Too Theoretical') && tags.includes('Project-Based')) return 'mixed';

    return 'mixed';
  }

  /**
   * Find intermediate target for unrealistic transitions
   */
  private static findIntermediateTarget(
    originalTarget: string,
    industry: string
  ): string {
    // Map of stretch goals to intermediate targets
    const intermediateMap: Record<string, string> = {
      'AI Researcher': 'Machine Learning Engineer',
      'Senior Machine Learning Engineer': 'Mid-Level Machine Learning Engineer',
      'Principal Engineer': 'Senior Engineer',
      'CTO': 'Engineering Manager',
      'Founder': 'Product Manager',
    };

    return intermediateMap[originalTarget] || 'Mid-Level ' + originalTarget;
  }

  /**
   * Generate recovery suggestions for unrealistic scenarios
   */
  static generateRecoverySuggestions(
    originalFormData: ScenarioFormData,
    unreachableReason: string
  ): Array<{
    title: string;
    description: string;
    adjustedParams: Partial<ScenarioFormData>;
  }> {
    const suggestions: Array<{
      title: string;
      description: string;
      adjustedParams: Partial<ScenarioFormData>;
    }> = [];

    // Suggestion 1: Extended Timeline
    suggestions.push({
      title: 'Perpanjang Timeline',
      description: 'Berikan diri Anda lebih banyak waktu untuk pembelajaran mendalam.',
      adjustedParams: {
        monthsDuration: originalFormData.monthsDuration * 1.5,
        targetTimeline: '2years',
      },
    });

    // Suggestion 2: Increase Effort
    suggestions.push({
      title: 'Tingkatkan Effort',
      description: 'Alokasikan lebih banyak jam per minggu untuk pembelajaran terstruktur.',
      adjustedParams: {
        hoursPerWeek: Math.min(40, originalFormData.hoursPerWeek * 1.5),
      },
    });

    // Suggestion 3: Intermediate Target
    suggestions.push({
      title: 'Target Intermediate',
      description: 'Ambil target intermediate terlebih dahulu sebelum mencapai target final.',
      adjustedParams: {
        careerTarget: 'Mid-Level ' + originalFormData.careerTarget,
        monthsDuration: originalFormData.monthsDuration,
      },
    });

    return suggestions;
  }

  /**
   * Check if feedback suggests a completely different learning approach
   */
  static needsDifferentApproach(feedbackContext: FeedbackContext): boolean {
    const tags = feedbackContext.feedbackTags || [];
    const contradictoryTags = [
      tags.includes('Too Theoretical') && tags.includes('Project-Based'),
      tags.includes('Too Fast') && tags.includes('Too Slow'),
    ];

    return contradictoryTags.some((c) => c);
  }

  /**
   * Generate feedback summary for UI display
   */
  static generateFeedbackSummary(feedbackContext: FeedbackContext): {
    title: string;
    summary: string;
    adjustments: string[];
  } {
    const tags = feedbackContext.feedbackTags || [];
    let adjustments: string[] = [];

    if (tags.includes('Too Fast')) {
      adjustments.push('Timeline diperpanjang dengan effort per minggu dikurangi');
    }

    if (tags.includes('Too Slow')) {
      adjustments.push('Timeline dipercepat dengan effort per minggu ditingkatkan');
    }

    if (tags.includes('Too Theoretical')) {
      adjustments.push('Fokus pada project-based learning dan practical application');
    }

    if (tags.includes('Project-Based')) {
      adjustments.push('Milestone difokuskan pada portfolio dan real-world projects');
    }

    if (tags.includes('Unrealistic')) {
      adjustments.push('Target atau constraint disesuaikan untuk path yang lebih realistic');
    }

    if (adjustments.length === 0) {
      adjustments = ['Menghasilkan path alternatif dengan perspektif baru'];
    }

    return {
      title: 'Skenario Baru Dibuat',
      summary: `Berdasarkan feedback Anda, kami telah membuat skenario yang disesuaikan dengan preferensi dan constraints Anda.`,
      adjustments,
    };
  }
}

export default FeedbackProcessor;
