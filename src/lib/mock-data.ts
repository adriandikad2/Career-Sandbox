// ─── Career Targets ──────────────────────────────────────

export const CAREER_TARGETS = [
  'AI Researcher',
  'AI Engineer',
  'Machine Learning Engineer',
  'Data Scientist',
  'Data Engineer',
  'Data Analyst',
  'Backend Developer',
  'Frontend Developer',
  'Full-Stack Developer',
  'Mobile Developer',
  'DevOps Engineer',
  'Cloud Architect',
  'Cybersecurity Analyst',
  'Product Manager',
  'UX Designer',
  'UI/UX Engineer',
  'Blockchain Developer',
  'Game Developer',
  'QA Engineer',
  'Solutions Architect',
  'Technical Writer',
  'Engineering Manager',
  'CTO',
  'VP of Engineering',
  'Principal Engineer',
  'Staff Engineer',
];

// ─── Timelines ───────────────────────────────────────────

export const TIMELINES = [
  { value: '3months', label: '3 Bulan' },
  { value: '6months', label: '6 Bulan' },
  { value: '1year', label: '1 Tahun' },
  { value: '2years', label: '2 Tahun' },
  { value: '5years', label: '5 Tahun' },
];

// ─── Industries ──────────────────────────────────────────

export const INDUSTRIES = [
  'Fintech',
  'Healthcare',
  'E-Commerce',
  'EdTech',
  'Gaming',
  'Social Media',
  'Cybersecurity',
  'AI / Machine Learning',
  'Cloud Computing',
  'Enterprise SaaS',
  'Automotive',
  'Logistics',
  'Agriculture Tech',
  'Government / GovTech',
  'Media & Entertainment',
];

// ─── Skills ──────────────────────────────────────────────

export const SKILLS = [
  'Python',
  'JavaScript',
  'TypeScript',
  'Java',
  'C++',
  'Go',
  'Rust',
  'SQL',
  'R',
  'Kotlin',
  'Swift',
  'React',
  'Next.js',
  'Vue.js',
  'Angular',
  'Node.js',
  'Django',
  'Flask',
  'FastAPI',
  'Spring Boot',
  'TensorFlow',
  'PyTorch',
  'Scikit-learn',
  'Pandas',
  'NumPy',
  'Tableau',
  'Power BI',
  'Docker',
  'Kubernetes',
  'AWS',
  'GCP',
  'Azure',
  'Terraform',
  'Git',
  'CI/CD',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'GraphQL',
  'REST API',
  'Figma',
  'Adobe XD',
];

// ─── Feedback Tags ───────────────────────────────────────

export const FEEDBACK_TAGS = [
  'Too Theoretical',
  'Project-Based',
  'Too Fast',
  'Too Slow',
  'Meets Needs',
  'Unrealistic',
] as const;

// ─── Default Form Data ──────────────────────────────────

export const DEFAULT_FORM_DATA = {
  careerTarget: '',
  targetTimeline: '6months',
  industry: '',
  currentSkills: [] as string[],
  experienceLevel: 'Beginner' as const,
  hoursPerWeek: 10,
  monthsDuration: 6,
  fullTimeOnly: false,
  remoteOnly: false,
  includeCertifications: true,
};

// ─── Static Offline Blueprint ────────────────────────────

export const OFFLINE_BLUEPRINT_NODES = [
  {
    id: 'offline-1',
    label: 'Junior Developer',
    description: 'Memulai karir sebagai junior developer dengan fundamental programming yang kuat.',
    confidence: 100,
    timeframe: '0–12 bulan',
    skills: ['HTML/CSS', 'JavaScript', 'Git'],
    type: 'role' as const,
    reasoning: 'Blueprint standar berdasarkan jalur karir umum di industri teknologi.',
    position: { x: 0, y: 0 },
  },
  {
    id: 'offline-2',
    label: 'Mid-Level Developer',
    description: 'Mengembangkan keahlian domain spesifik dan kemampuan problem-solving yang lebih kompleks.',
    confidence: 100,
    timeframe: '1–3 tahun',
    skills: ['Framework', 'Database', 'API Design'],
    type: 'role' as const,
    reasoning: 'Blueprint standar berdasarkan jalur karir umum di industri teknologi.',
    position: { x: 0, y: 200 },
  },
  {
    id: 'offline-3',
    label: 'Senior Developer',
    description: 'Memimpin desain arsitektur sistem dan mentoring tim junior.',
    confidence: 100,
    timeframe: '3–5 tahun',
    skills: ['System Design', 'Mentoring', 'Code Review'],
    type: 'role' as const,
    reasoning: 'Blueprint standar berdasarkan jalur karir umum di industri teknologi.',
    position: { x: 0, y: 400 },
  },
  {
    id: 'offline-4',
    label: 'Tech Lead',
    description: 'Bertanggung jawab atas technical direction dan keputusan arsitektur tim.',
    confidence: 100,
    timeframe: '5+ tahun',
    skills: ['Leadership', 'Architecture', 'Strategy'],
    type: 'role' as const,
    reasoning: 'Blueprint standar berdasarkan jalur karir umum di industri teknologi.',
    position: { x: 0, y: 600 },
  },
];

export const OFFLINE_BLUEPRINT_EDGES = [
  { id: 'oe-1', source: 'offline-1', target: 'offline-2', confidence: 100 },
  { id: 'oe-2', source: 'offline-2', target: 'offline-3', confidence: 100 },
  { id: 'oe-3', source: 'offline-3', target: 'offline-4', confidence: 100 },
];
