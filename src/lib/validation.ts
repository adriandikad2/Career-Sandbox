import type { ScenarioFormData, ValidationResult, ValidationError } from './types';

/**
 * Validates scenario form inputs for contradictory or unrealistic constraints.
 * Returns a ValidationResult with detailed errors per field.
 */
export function validateScenarioForm(data: ScenarioFormData): ValidationResult {
  const errors: ValidationError[] = [];

  // ─── Required fields ─────────────────────────────────
  if (!data.careerTarget.trim()) {
    errors.push({ field: 'careerTarget', message: 'Target karir harus diisi.' });
  }

  if (!data.industry.trim()) {
    errors.push({ field: 'industry', message: 'Industri / domain harus diisi.' });
  }

  if (data.currentSkills.length === 0) {
    errors.push({ field: 'currentSkills', message: 'Pilih minimal satu skill yang dimiliki.' });
  }

  // ─── Minimum effort threshold ────────────────────────
  if (data.hoursPerWeek < 2) {
    errors.push({
      field: 'hoursPerWeek',
      message: 'Minimum 2 jam/minggu diperlukan untuk progress bermakna.',
    });
  }

  // ─── Contradictory constraint detection ──────────────
  const isAggressiveTimeline = ['3months', '6months'].includes(data.targetTimeline);
  const isHighTarget = data.careerTarget.toLowerCase().includes('senior') ||
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
      message: 'Kombinasi level Beginner dengan target senior+ dalam timeline pendek memerlukan minimal 15 jam/minggu.',
    });
    errors.push({
      field: 'targetTimeline',
      message: 'Pertimbangkan timeline yang lebih panjang (1–2 tahun) untuk transisi dari Beginner ke posisi senior.',
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
      message: 'Sertifikasi sangat disarankan untuk Beginner dengan timeline pendek sebagai validasi kompetensi.',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Returns the minimum viable slider values to make a scenario generation feasible.
 * Used by the "Relaksasi Constraint" recovery action.
 */
export function getRelaxedConstraints(data: ScenarioFormData): Partial<ScenarioFormData> {
  return {
    hoursPerWeek: Math.max(data.hoursPerWeek, 10),
    targetTimeline: data.experienceLevel === 'Beginner' ? '2years' : '1year',
    monthsDuration: data.experienceLevel === 'Beginner' ? 24 : 12,
  };
}
