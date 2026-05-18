import type { ScenarioFormData, GeneratedScenario, FeedbackContext } from './types';
import AICareerEngine from './ai-career-engine';

/**
 * Main scenario generation function
 * Routes to AI Career Engine
 */
export function generateMockScenario(
  formData: ScenarioFormData,
  feedbackContext?: FeedbackContext
): GeneratedScenario {
  try {
    // Use AI Career Engine for intelligent path generation
    const scenario = AICareerEngine.generateScenario(
      formData,
      undefined // We removed the userHistory mapping
    );

    return scenario;
  } catch (error) {
    // Fallback to simple scenario if AI engine fails
    console.warn('AI Career Engine failed, using fallback generation:', error);
    return generateFallbackScenario(formData);
  }
}

/**
 * Fallback scenario generation for edge cases
 */
function generateFallbackScenario(formData: ScenarioFormData): GeneratedScenario {
  const target = formData.careerTarget || 'Career Target';

  return {
    nodes: [
      {
        id: 'n-start',
        label: 'Posisi Saat Ini',
        description: `Skill Anda: ${formData.currentSkills.join(', ') || 'Belum ditentukan'}`,
        confidence: 90,
        timeframe: 'Sekarang',
        skills: formData.currentSkills.slice(0, 3),
        type: 'milestone',
        reasoning: 'Titik awal perjalanan karir Anda.',
        position: { x: 250, y: 0 },
      },
      {
        id: 'n-transition',
        label: 'Persiapan Transisi',
        description: 'Bangun skill yang relevan untuk transisi karir.',
        confidence: 70,
        timeframe: `${formData.monthsDuration / 2} bulan`,
        skills: ['Learning', 'Skill Development'],
        type: 'skill',
        reasoning: 'Periode pembelajaran dan pengembangan skill yang diperlukan untuk mencapai target.',
        position: { x: 250, y: 300 },
      },
      {
        id: 'n-target',
        label: target,
        description: `Target karir: ${target} di industri ${formData.industry}`,
        confidence: Math.max(30, 100 - formData.hoursPerWeek),
        timeframe: formData.targetTimeline === '3months' ? '3 bulan' :
                   formData.targetTimeline === '6months' ? '6 bulan' :
                   formData.targetTimeline === '1year' ? '1 tahun' :
                   formData.targetTimeline === '2years' ? '2 tahun' : '5 tahun',
        skills: [],
        type: 'role',
        reasoning: 'Target akhir berdasarkan input Anda. Tingkat kepastian dipengaruhi oleh timeline dan effort yang dialokasikan.',
        position: { x: 250, y: 600 },
      },
    ],
    edges: [
      { id: 'e-1', source: 'n-start', target: 'n-transition', confidence: 85 },
      { id: 'e-2', source: 'n-transition', target: 'n-target', confidence: 65 },
    ],
    tradeoffs: [
      {
        nodeId: 'n-transition',
        nodeLabel: 'Persiapan Transisi',
        pros: [
          'Membangun fondasi skill yang solid',
          'Meningkatkan peluang sukses transisi karir',
          'Membuka jaringan profesional baru',
        ],
        cons: [
          'Memerlukan waktu dan effort yang signifikan',
          'Mungkin ada periode dengan kedua job atau unemployment',
          'Perlu adaptasi terhadap perubahan',
        ],
      },
      {
        nodeId: 'n-target',
        nodeLabel: target,
        pros: [
          `Mencapai target ${target}`,
          'Peningkatan kompensasi dan tanggung jawab',
          'Kepuasan karir yang lebih tinggi',
        ],
        cons: [
          'Kompetisi tinggi untuk posisi ini',
          'Kurva pembelajaran yang curam',
          'Memerlukan continuous improvement',
        ],
      },
    ],
    overallConfidence: Math.max(20, Math.min(85, 60 + (formData.hoursPerWeek / 2))),
  };
}
