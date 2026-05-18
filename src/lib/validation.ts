import type { ScenarioFormData, ValidationResult, ValidationError } from './types';

/**
 * Validate scenario form data with detailed error messages
 */
export function validateScenarioForm(data: ScenarioFormData): ValidationResult {
  const errors: ValidationError[] = [];

  // ─── Required fields ─────────────────────────────────
  if (!data.careerTarget.trim()) {
    errors.push({
      field: 'careerTarget',
      message: 'Tentukan target karir yang ingin Anda capai (e.g., "Data Scientist", "Product Manager").',
    });
  }

  if (!data.industry.trim()) {
    errors.push({
      field: 'industry',
      message: 'Pilih industri untuk konteks yang lebih spesifik (Technology, Finance, Marketing, etc.).',
    });
  }

  if (data.currentSkills.length === 0) {
    errors.push({
      field: 'currentSkills',
      message: 'Tambahkan minimal 1 skill yang Anda miliki saat ini untuk baseline yang akurat.',
    });
  }

  // ─── Minimum effort threshold ────────────────────────
  if (data.hoursPerWeek < 2) {
    errors.push({
      field: 'hoursPerWeek',
      message: `Alokasikan minimal 2 jam/minggu (saat ini: ${data.hoursPerWeek}). Untuk hasil meaningful, minimal 10 jam/minggu direkomendasikan.`,
    });
  }

  // ─── Contradictory constraint detection ──────────────
  const isAggressiveTimeline = ['3months', '6months'].includes(data.targetTimeline);
  const isHighTarget =
    data.careerTarget.toLowerCase().includes('senior') ||
    data.careerTarget.toLowerCase().includes('principal') ||
    data.careerTarget.toLowerCase().includes('lead') ||
    data.careerTarget.toLowerCase().includes('architect') ||
    data.careerTarget.toLowerCase().includes('manager') ||
    data.careerTarget.toLowerCase().includes('cto') ||
    data.careerTarget.toLowerCase().includes('vp');

  // Beginner trying to reach senior+ in short timeline with low effort
  if (
    data.experienceLevel === 'Beginner' &&
    isHighTarget &&
    isAggressiveTimeline &&
    data.hoursPerWeek < 15
  ) {
    errors.push({
      field: 'experienceLevel',
      message:
        'Kombinasi level Beginner dengan target senior+ dalam timeline pendek memerlukan minimal 15 jam/minggu.',
    });
    errors.push({
      field: 'targetTimeline',
      message:
        'Pertimbangkan timeline yang lebih panjang (1–2 tahun) untuk transisi dari Beginner ke posisi senior.',
    });
  }

  // Short timeline with very low effort
  if (isAggressiveTimeline && data.hoursPerWeek < 5) {
    errors.push({
      field: 'hoursPerWeek',
      message: 'Timeline pendek memerlukan minimal 5 jam/minggu untuk menghasilkan progress.',
    });
  }

  // Beginner with no certifications on aggressive timeline
  if (
    data.experienceLevel === 'Beginner' &&
    !data.includeCertifications &&
    isAggressiveTimeline
  ) {
    errors.push({
      field: 'includeCertifications',
      message:
        'Sertifikasi sangat disarankan untuk Beginner dengan timeline pendek sebagai validasi kompetensi.',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Check if target career is realistic given constraints
 */
export function assessCareerRealism(formData: ScenarioFormData): {
  realism: 'achievable' | 'challenging' | 'unrealistic';
  confidence: number;
  reason: string;
} {
  let confidence = 70;
  let realism: 'achievable' | 'challenging' | 'unrealistic' = 'achievable';
  const reasons: string[] = [];

  // Experience level factor
  if (formData.experienceLevel === 'Beginner') {
    confidence -= 30;
    reasons.push('Starting from Beginner level');
  } else if (formData.experienceLevel === 'Intermediate') {
    confidence += 10;
  } else if (formData.experienceLevel === 'Advanced' || formData.experienceLevel === 'Expert') {
    confidence += 20;
  }

  // Skill count factor
  if (formData.currentSkills.length === 0) {
    confidence -= 20;
    reasons.push('No foundation skills');
  } else if (formData.currentSkills.length >= 3) {
    confidence += 15;
    reasons.push('Strong skill foundation');
  }

  // Timeline factor
  if (formData.targetTimeline === '3months') {
    confidence -= 25;
    reasons.push('Very aggressive 3-month timeline');
  } else if (formData.targetTimeline === '6months') {
    confidence -= 10;
  } else if (formData.targetTimeline === '2years' || formData.targetTimeline === '5years') {
    confidence += 20;
    reasons.push('Realistic long-term timeline');
  }

  // Effort factor
  if (formData.hoursPerWeek < 5) {
    confidence -= 30;
    reasons.push('Insufficient weekly hours');
  } else if (formData.hoursPerWeek >= 20) {
    confidence += 20;
    reasons.push('Strong time commitment');
  }

  // Target ambition
  if (
    formData.careerTarget.toLowerCase().includes('senior') &&
    formData.experienceLevel === 'Beginner'
  ) {
    confidence -= 30;
    reasons.push('Large jump: Beginner → Senior');
  }

  // Determine realism
  if (confidence >= 70) {
    realism = 'achievable';
  } else if (confidence >= 40) {
    realism = 'challenging';
  } else {
    realism = 'unrealistic';
  }

  return {
    realism,
    confidence: Math.max(10, Math.min(95, confidence)),
    reason: reasons.join(' • '),
  };
}

/**
 * Get relaxed constraints for unrealistic scenarios
 */
export function getRelaxedConstraints(data: ScenarioFormData): Partial<ScenarioFormData> {
  return {
    hoursPerWeek: Math.max(data.hoursPerWeek, 10),
    targetTimeline: data.experienceLevel === 'Beginner' ? '2years' : '1year',
    monthsDuration: data.experienceLevel === 'Beginner' ? 24 : 12,
  };
}

/**
 * Provide improvement suggestions based on validation
 */
export function getValidationSuggestions(formData: ScenarioFormData): string[] {
  const suggestions: string[] = [];
  const realism = assessCareerRealism(formData);

  if (realism.realism === 'unrealistic') {
    suggestions.push('Pertimbangkan target intermediate terlebih dahulu');
    suggestions.push('Perpanjang timeline untuk hasil lebih sustainable');
    suggestions.push('Tingkatkan alokasi waktu per minggu');
  }

  if (formData.currentSkills.length === 0) {
    suggestions.push('Identifikasi skill foundation yang relevan dengan target');
  }

  if (formData.hoursPerWeek < 10) {
    suggestions.push('Alokasikan 10+ jam/minggu untuk progress yang meaningful');
  }

  if (
    formData.experienceLevel === 'Beginner' &&
    formData.targetTimeline === '3months'
  ) {
    suggestions.push('Timeline 3 bulan untuk Beginner sangat aggressive - coba 6+ bulan');
  }

  return suggestions;
}
