/**
 * Error Handling & Recovery System
 * Provides intelligent error classification and recovery strategies
 */

import type { ScenarioFormData } from './types';
import { validateScenarioForm } from './validation';
import { CAREER_KNOWLEDGE_BASE, getAllRoles } from './career-knowledge-base';

export type ErrorSeverity = 'warning' | 'error' | 'critical';

export interface RecoverySuggestion {
  id: string;
  title: string;
  description: string;
  adjustedParams: Partial<ScenarioFormData>;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedImpact: 'high' | 'medium' | 'low';
}

export interface ErrorContext {
  code: string;
  title: string;
  message: string;
  severity: ErrorSeverity;
  category: string;
  suggestions: RecoverySuggestion[];
  technicalDetails?: string;
}

export enum ErrorCode {
  // Input Validation Errors
  MISSING_CAREER_TARGET = 'MISSING_CAREER_TARGET',
  INVALID_CAREER_TARGET = 'INVALID_CAREER_TARGET',
  MISSING_INDUSTRY = 'MISSING_INDUSTRY',
  MISSING_SKILLS = 'MISSING_SKILLS',
  INSUFFICIENT_EFFORT = 'INSUFFICIENT_EFFORT',

  // Constraint Conflict Errors
  UNREALISTIC_TIMELINE = 'UNREALISTIC_TIMELINE',
  CONFLICTING_CONSTRAINTS = 'CONFLICTING_CONSTRAINTS',
  INSUFFICIENT_EFFORT_FOR_GOAL = 'INSUFFICIENT_EFFORT_FOR_GOAL',

  // Career Path Errors
  UNREACHABLE_TARGET = 'UNREACHABLE_TARGET',
  MASSIVE_SKILL_GAP = 'MASSIVE_SKILL_GAP',
  NO_LEARNING_PATH = 'NO_LEARNING_PATH',
  INSUFFICIENT_MARKET_DATA = 'INSUFFICIENT_MARKET_DATA',

  // System Errors
  GENERATION_FAILED = 'GENERATION_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  INVALID_RESPONSE = 'INVALID_RESPONSE',
}

/**
 * Main error handler class
 */
export class ErrorHandler {
  /**
   * Classify and handle errors with recovery suggestions
   */
  static classifyError(
    error: Error | string,
    formData?: ScenarioFormData
  ): ErrorContext {
    // Input validation errors
    if (formData) {
      const validation = validateScenarioForm(formData);
      if (!validation.isValid) {
        return this.handleValidationError(validation.errors[0].message, formData);
      }

      // Career-specific errors
      return this.handleCareerError(formData);
    }

    // Generic errors
    if (error instanceof Error) {
      return this.handleGenericError(error.message);
    }

    return this.handleGenericError(String(error));
  }

  /**
   * Handle validation errors
   */
  private static handleValidationError(
    message: string,
    formData: ScenarioFormData
  ): ErrorContext {
    if (message.includes('Career target')) {
      return {
        code: ErrorCode.MISSING_CAREER_TARGET,
        title: 'Target Karir Tidak Ditentukan',
        message: 'Silakan masukkan target karir yang ingin Anda capai.',
        severity: 'error',
        category: 'input_validation',
        suggestions: [
          {
            id: 'suggest-common-roles',
            title: 'Pilih dari Peran Populer',
            description: 'Lihat daftar peran teknologi yang paling dicari saat ini.',
            adjustedParams: { careerTarget: 'Data Analyst' },
            difficulty: 'easy',
            estimatedImpact: 'high',
          },
          {
            id: 'explore-industry',
            title: 'Jelajahi Industri',
            description: 'Pilih industri terlebih dahulu untuk melihat peran yang tersedia.',
            adjustedParams: { industry: 'technology' },
            difficulty: 'easy',
            estimatedImpact: 'medium',
          },
        ],
      };
    }

    if (message.includes('Industry')) {
      return {
        code: ErrorCode.MISSING_INDUSTRY,
        title: 'Industri Tidak Ditentukan',
        message: 'Silakan pilih industri untuk mengarahkan pencarian peran.',
        severity: 'error',
        category: 'input_validation',
        suggestions: [
          {
            id: 'select-tech-industry',
            title: 'Teknologi (Paling Banyak Data)',
            description: 'Industri teknologi memiliki data terlengkap dan peluang terbaik.',
            adjustedParams: { industry: 'technology' },
            difficulty: 'easy',
            estimatedImpact: 'high',
          },
          {
            id: 'select-finance-industry',
            title: 'Keuangan',
            description: 'Industri keuangan dengan fokus pada data dan analytics.',
            adjustedParams: { industry: 'finance' },
            difficulty: 'easy',
            estimatedImpact: 'high',
          },
        ],
      };
    }

    if (message.includes('Skills')) {
      return {
        code: ErrorCode.MISSING_SKILLS,
        title: 'Skill Saat Ini Tidak Ditentukan',
        message: 'Tambahkan setidaknya satu skill yang Anda miliki saat ini.',
        severity: 'error',
        category: 'input_validation',
        suggestions: [
          {
            id: 'add-basic-skills',
            title: 'Tambah Skill Dasar',
            description: 'Mulai dengan skill fundamental seperti SQL atau Excel.',
            adjustedParams: { currentSkills: ['sql', 'excel-advanced'] },
            difficulty: 'easy',
            estimatedImpact: 'high',
          },
          {
            id: 'add-programming',
            title: 'Tambah Skill Programming',
            description: 'Jika Anda sudah bisa programming, tambahkan Python atau JavaScript.',
            adjustedParams: { currentSkills: ['python'] },
            difficulty: 'easy',
            estimatedImpact: 'high',
          },
        ],
      };
    }

    return {
      code: ErrorCode.INSUFFICIENT_EFFORT,
      title: 'Effort Tidak Cukup',
      message: `${message} Tingkatkan jam per minggu untuk mencapai goal yang lebih ambisius.`,
      severity: 'warning',
      category: 'input_validation',
      suggestions: [
        {
          id: 'increase-hours',
          title: 'Tingkatkan Effort',
          description: 'Dari ${formData.hoursPerWeek} jam/minggu menjadi minimal 15 jam/minggu.',
          adjustedParams: { hoursPerWeek: 15 },
          difficulty: 'medium',
          estimatedImpact: 'high',
        },
      ],
    };
  }

  /**
   * Handle career-specific errors
   */
  private static handleCareerError(formData: ScenarioFormData): ErrorContext {
    // Check if career target exists
    const targetExists = getAllRoles().some(
      (r) => r.name.toLowerCase().includes(formData.careerTarget.toLowerCase())
    );

    if (!targetExists) {
      return {
        code: ErrorCode.INVALID_CAREER_TARGET,
        title: 'Target Karir Tidak Ditemukan',
        message: `"${formData.careerTarget}" tidak ditemukan dalam database. Coba cari peran serupa.`,
        severity: 'error',
        category: 'career_path',
        suggestions: this.suggestSimilarRoles(formData.careerTarget, formData.industry),
      };
    }

    // Check for unrealistic timelines
    if (formData.targetTimeline === '3months' && formData.experienceLevel === 'Beginner') {
      return {
        code: ErrorCode.UNREALISTIC_TIMELINE,
        title: 'Timeline Terlalu Agresif',
        message: 'Mencapai target baru dalam 3 bulan sebagai Beginner memiliki kesuksesan <10%.',
        severity: 'warning',
        category: 'constraint_conflict',
        suggestions: [
          {
            id: 'extend-timeline-6m',
            title: 'Perpanjang ke 6 Bulan',
            description: 'Timeline realistis dengan kesuksesan 40-50%.',
            adjustedParams: { targetTimeline: '6months' },
            difficulty: 'easy',
            estimatedImpact: 'high',
          },
          {
            id: 'extend-timeline-1y',
            title: 'Perpanjang ke 1 Tahun',
            description: 'Timeline nyaman dengan kesuksesan 70%+.',
            adjustedParams: { targetTimeline: '1year' },
            difficulty: 'easy',
            estimatedImpact: 'high',
          },
        ],
      };
    }

    // Check for conflicting constraints
    if (
      formData.hoursPerWeek < 10 &&
      formData.monthsDuration < 12 &&
      (formData.targetTimeline === '3months' || formData.targetTimeline === '6months')
    ) {
      return {
        code: ErrorCode.CONFLICTING_CONSTRAINTS,
        title: 'Constraint Saling Bertentangan',
        message: 'Kombinasi: short timeline + low effort + ambitious target = kesuksesan <15%.',
        severity: 'critical',
        category: 'constraint_conflict',
        suggestions: [
          {
            id: 'increase-effort',
            title: 'Tingkatkan Effort',
            description: `Dari ${formData.hoursPerWeek} jam/minggu ke 20+ jam/minggu.`,
            adjustedParams: { hoursPerWeek: 20 },
            difficulty: 'hard',
            estimatedImpact: 'high',
          },
          {
            id: 'extend-timeline',
            title: 'Perpanjang Timeline',
            description: `Dari ${formData.targetTimeline} ke 1 atau 2 tahun.`,
            adjustedParams: { targetTimeline: '2years' },
            difficulty: 'easy',
            estimatedImpact: 'high',
          },
          {
            id: 'adjust-target',
            title: 'Sesuaikan Target',
            description: 'Pilih target intermediate terlebih dahulu sebelum final target.',
            adjustedParams: { careerTarget: 'Mid-Level ' + formData.careerTarget },
            difficulty: 'medium',
            estimatedImpact: 'high',
          },
        ],
      };
    }

    // Check for massive skill gaps for beginners
    const skillGapSize = formData.currentSkills.length === 0 ? 'massive' : 'medium';
    if (skillGapSize === 'massive' && formData.experienceLevel === 'Beginner') {
      return {
        code: ErrorCode.MASSIVE_SKILL_GAP,
        title: 'Kesenjangan Skill Terlalu Besar',
        message: 'Tanpa skill awal dan sebagai Beginner, path ini sangat challenging.',
        severity: 'warning',
        category: 'career_path',
        suggestions: [
          {
            id: 'add-foundation-skills',
            title: 'Mulai dengan Skill Foundation',
            description: 'Tambahkan skill dasar untuk membangun fondasi yang solid.',
            adjustedParams: { currentSkills: ['python', 'statistics-basics'] },
            difficulty: 'easy',
            estimatedImpact: 'high',
          },
          {
            id: 'extend-timeline-massive',
            title: 'Perpanjang Timeline Significantly',
            description: 'Berikan diri Anda 2+ tahun untuk pembelajaran yang serius.',
            adjustedParams: { targetTimeline: '2years', monthsDuration: 24, hoursPerWeek: 15 },
            difficulty: 'medium',
            estimatedImpact: 'high',
          },
        ],
      };
    }

    // Default: No errors found
    return {
      code: 'NO_ERROR',
      title: 'Valid Input',
      message: 'Input Anda valid. Siap untuk generate scenario.',
      severity: 'warning',
      category: 'validation',
      suggestions: [],
    };
  }

  /**
   * Suggest similar roles if target not found
   */
  private static suggestSimilarRoles(target: string, industry: string): RecoverySuggestion[] {
    const allRoles = getAllRoles();
    const keywords = target.toLowerCase().split(' ');

    // Find roles with matching keywords
    const matches = allRoles
      .filter(
        (r) =>
          keywords.some((kw) => r.name.toLowerCase().includes(kw)) &&
          r.industry === industry
      )
      .slice(0, 3);

    if (matches.length === 0) {
      // Return popular roles if no match
      return allRoles
        .filter((r) => r.industry === industry)
        .slice(0, 3)
        .map((role, idx) => ({
          id: `suggest-role-${idx}`,
          title: `Coba: ${role.name}`,
          description: `${role.description} (Level: ${role.level})`,
          adjustedParams: { careerTarget: role.name },
          difficulty: 'easy',
          estimatedImpact: 'high',
        }));
    }

    return matches.map((role, idx) => ({
      id: `suggest-role-${idx}`,
      title: `Coba: ${role.name}`,
      description: `${role.description} (Level: ${role.level})`,
      adjustedParams: { careerTarget: role.name },
      difficulty: 'easy',
      estimatedImpact: 'high',
    }));
  }

  /**
   * Handle generic/system errors
   */
  private static handleGenericError(message: string): ErrorContext {
    if (message.includes('network') || message.includes('fetch')) {
      return {
        code: ErrorCode.NETWORK_ERROR,
        title: 'Koneksi Jaringan Error',
        message: 'Terjadi masalah koneksi. Sistem akan menggunakan offline mode dengan template standar.',
        severity: 'warning',
        category: 'system',
        suggestions: [
          {
            id: 'retry-connection',
            title: 'Coba Lagi',
            description: 'Periksa koneksi internet dan coba generate ulang.',
            adjustedParams: {},
            difficulty: 'easy',
            estimatedImpact: 'high',
          },
        ],
      };
    }

    return {
      code: ErrorCode.GENERATION_FAILED,
      title: 'Gagal Generate Scenario',
      message: 'Terjadi kesalahan saat generate scenario. Silakan coba lagi dengan parameter berbeda.',
      severity: 'error',
      category: 'system',
      suggestions: [
        {
          id: 'adjust-params',
          title: 'Sesuaikan Parameter',
          description: 'Coba dengan target, timeline, atau effort yang berbeda.',
          adjustedParams: { hoursPerWeek: 15, monthsDuration: 12 },
          difficulty: 'easy',
          estimatedImpact: 'medium',
        },
      ],
    };
  }

  /**
   * Generate comprehensive error report
   */
  static generateErrorReport(error: ErrorContext): {
    userFriendly: string;
    suggestions: string[];
    technicalInfo: string | null;
  } {
    return {
      userFriendly: `${error.title}: ${error.message}`,
      suggestions: error.suggestions.map((s) => s.title),
      technicalInfo: error.technicalDetails || null,
    };
  }

  /**
   * Check if error is recoverable
   */
  static isRecoverable(errorCode: string): boolean {
    const nonRecoverableErrors = [
      ErrorCode.GENERATION_FAILED,
      ErrorCode.NETWORK_ERROR,
    ];
    return !nonRecoverableErrors.includes(errorCode as ErrorCode);
  }

  /**
   * Get severity color for UI
   */
  static getSeverityColor(severity: ErrorSeverity): string {
    switch (severity) {
      case 'warning':
        return 'yellow';
      case 'error':
        return 'red';
      case 'critical':
        return 'red';
      default:
        return 'gray';
    }
  }

  /**
   * Get severity icon
   */
  static getSeverityIcon(
    severity: ErrorSeverity
  ): 'AlertCircle' | 'AlertOctagon' | 'AlertTriangle' {
    switch (severity) {
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertOctagon';
      case 'critical':
        return 'AlertOctagon';
      default:
        return 'AlertCircle';
    }
  }
}

export default ErrorHandler;
