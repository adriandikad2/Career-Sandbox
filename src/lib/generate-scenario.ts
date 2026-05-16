import type { ScenarioFormData, GeneratedScenario, CareerNode, CareerEdge, TradeoffItem } from './types';

/**
 * Generates a mock career scenario based on user form input.
 * Simulates an AI model response with realistic nodes, edges, and tradeoffs.
 */
export function generateMockScenario(formData: ScenarioFormData): GeneratedScenario {
  const target = formData.careerTarget || 'Software Engineer';
  const level = formData.experienceLevel;
  const timeline = formData.targetTimeline;

  // Calculate overall confidence based on constraint realism
  const baseConfidence = getBaseConfidence(level, target, timeline, formData.hoursPerWeek);

  // Generate path nodes
  const nodes = generateNodes(formData, baseConfidence);
  const edges = generateEdges(nodes);
  const tradeoffs = generateTradeoffs(nodes, formData);

  return {
    nodes,
    edges,
    tradeoffs,
    overallConfidence: baseConfidence,
  };
}

function getBaseConfidence(
  level: string,
  target: string,
  timeline: string,
  hours: number
): number {
  let confidence = 75;

  // Higher confidence for realistic goals
  if (level === 'Intermediate' || level === 'Advanced') confidence += 10;
  if (['1year', '2years', '5years'].includes(timeline)) confidence += 5;
  if (hours >= 10) confidence += 5;
  if (hours >= 20) confidence += 5;

  // Lower confidence for stretch goals
  if (level === 'Beginner' && target.includes('Senior')) confidence -= 20;
  if (level === 'Beginner' && timeline === '3months') confidence -= 15;
  if (hours < 5) confidence -= 10;

  return Math.max(10, Math.min(95, confidence));
}

function generateNodes(formData: ScenarioFormData, baseConfidence: number): CareerNode[] {
  const target = formData.careerTarget || 'Software Engineer';
  const skills = formData.currentSkills;

  // Build a path from current state to target
  const pathTemplates: Record<string, CareerNode[]> = {
    default: [
      {
        id: 'n-start',
        label: 'Current Position',
        description: `Posisi saat ini dengan keahlian: ${skills.join(', ') || 'Belum ditentukan'}`,
        confidence: 95,
        timeframe: 'Sekarang',
        skills: skills.slice(0, 3),
        type: 'milestone',
        reasoning: 'Titik awal berdasarkan skill dan pengalaman yang Anda input.',
        position: { x: 250, y: 0 },
      },
      {
        id: 'n-foundation',
        label: 'Perkuat Fondasi',
        description: 'Perkuat kemampuan dasar dan tutup skill gap yang kritis.',
        confidence: Math.min(baseConfidence + 10, 95),
        timeframe: '1–2 bulan pertama',
        skills: ['Problem Solving', 'Core Concepts'],
        type: 'skill',
        reasoning: 'Data dari framework kompetensi menunjukkan fondasi yang kuat meningkatkan success rate transisi karir sebesar 40%.',
        position: { x: 100, y: 150 },
      },
      {
        id: 'n-cert',
        label: 'Sertifikasi Relevan',
        description: `Raih sertifikasi yang diakui industri ${formData.industry || 'teknologi'}.`,
        confidence: baseConfidence,
        timeframe: '2–4 bulan',
        skills: ['Certification Prep'],
        type: 'certification',
        reasoning: 'Sertifikasi meningkatkan credibility, terutama untuk career switch. Data pasar menunjukkan 35% peningkatan callback rate.',
        position: { x: 400, y: 150 },
      },
      {
        id: 'n-project',
        label: 'Proyek Portfolio',
        description: 'Bangun 2–3 proyek nyata yang relevan dengan target karir.',
        confidence: baseConfidence - 5,
        timeframe: '3–5 bulan',
        skills: ['Project Management', 'Applied Skills'],
        type: 'milestone',
        reasoning: 'Portfolio proyek memberikan bukti nyata kompetensi. Hiring managers 60% lebih likely meng-interview kandidat dengan portfolio.',
        position: { x: 250, y: 300 },
      },
      {
        id: 'n-network',
        label: 'Networking & Mentorship',
        description: 'Bangun koneksi profesional dan cari mentor di bidang target.',
        confidence: baseConfidence - 10,
        timeframe: 'Ongoing',
        skills: ['Communication', 'Networking'],
        type: 'skill',
        reasoning: 'Aggregate data menunjukkan 70% posisi senior diisi melalui referral dan networking.',
        position: { x: 0, y: 450 },
      },
      {
        id: 'n-apply',
        label: 'Tahap Aplikasi',
        description: 'Mulai apply ke posisi target dengan persiapan interview yang matang.',
        confidence: baseConfidence - 15,
        timeframe: '4–6 bulan',
        skills: ['Interview Prep', 'Resume Writing'],
        type: 'milestone',
        reasoning: 'Dengan fondasi, sertifikasi, dan portfolio, Anda memenuhi minimum requirement untuk posisi target.',
        position: { x: 500, y: 450 },
      },
      {
        id: 'n-target',
        label: target,
        description: `Posisi target: ${target} di industri ${formData.industry || 'teknologi'}.`,
        confidence: Math.max(baseConfidence - 25, 30),
        timeframe: formData.targetTimeline === '3months' ? '3 bulan' :
                   formData.targetTimeline === '6months' ? '6 bulan' :
                   formData.targetTimeline === '1year' ? '1 tahun' :
                   formData.targetTimeline === '2years' ? '2 tahun' : '5 tahun',
        skills: [],
        type: 'role',
        reasoning: `Proyeksi berdasarkan trajectory dari ${formData.experienceLevel} level dengan effort ${formData.hoursPerWeek} jam/minggu. Confidence dipengaruhi oleh gap antara posisi saat ini dan target.`,
        position: { x: 250, y: 620 },
      },
    ],
  };

  return pathTemplates.default;
}

function generateEdges(nodes: CareerNode[]): CareerEdge[] {
  return [
    { id: 'e-1', source: 'n-start', target: 'n-foundation', confidence: 95 },
    { id: 'e-2', source: 'n-start', target: 'n-cert', confidence: 85 },
    { id: 'e-3', source: 'n-foundation', target: 'n-project', confidence: 80 },
    { id: 'e-4', source: 'n-cert', target: 'n-project', confidence: 75 },
    { id: 'e-5', source: 'n-project', target: 'n-network', confidence: 70 },
    { id: 'e-6', source: 'n-project', target: 'n-apply', confidence: 65 },
    { id: 'e-7', source: 'n-network', target: 'n-target', confidence: 50 },
    { id: 'e-8', source: 'n-apply', target: 'n-target', confidence: 55 },
  ];
}

function generateTradeoffs(nodes: CareerNode[], formData: ScenarioFormData): TradeoffItem[] {
  const target = formData.careerTarget || 'Software Engineer';

  return [
    {
      nodeId: 'n-foundation',
      nodeLabel: 'Perkuat Fondasi',
      pros: [
        'Membangun base knowledge yang solid',
        'Mengurangi risiko knowledge gap di tahap lanjut',
      ],
      cons: [
        'Memerlukan waktu di awal tanpa hasil langsung',
        'Bisa terasa repetitif jika sudah familiar',
      ],
    },
    {
      nodeId: 'n-cert',
      nodeLabel: 'Sertifikasi Relevan',
      pros: [
        'Meningkatkan credibility di mata hiring manager',
        'Memberikan struktur pembelajaran yang jelas',
        'Industry-recognized validation',
      ],
      cons: [
        'Biaya sertifikasi bisa signifikan',
        'Tidak selalu mencerminkan kemampuan praktis',
      ],
    },
    {
      nodeId: 'n-project',
      nodeLabel: 'Proyek Portfolio',
      pros: [
        'Bukti nyata kemampuan teknis',
        'Melatih problem-solving dalam konteks real',
      ],
      cons: [
        'Time-intensive untuk proyek berkualitas',
        'Memerlukan self-direction yang tinggi',
      ],
    },
    {
      nodeId: 'n-network',
      nodeLabel: 'Networking & Mentorship',
      pros: [
        'Akses ke hidden job market',
        'Insight langsung dari praktisi',
        'Potensi referral yang meningkatkan chance',
      ],
      cons: [
        'Hasilnya tidak langsung dan sulit diukur',
        'Memerlukan soft skills dan konsistensi',
      ],
    },
    {
      nodeId: 'n-target',
      nodeLabel: target,
      pros: [
        `Mencapai target ${target}`,
        'Peningkatan kompensasi dan tanggung jawab',
        'Career growth jangka panjang',
      ],
      cons: [
        'Kompetisi tinggi untuk posisi ini',
        'Memerlukan continuous learning post-hiring',
        'Adaptasi ke lingkungan baru bisa challenging',
      ],
    },
  ];
}
