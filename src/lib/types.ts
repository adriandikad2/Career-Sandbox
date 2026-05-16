// ─── Form Data ───────────────────────────────────────────

export interface ScenarioFormData {
  careerTarget: string;
  targetTimeline: string;
  industry: string;
  currentSkills: string[];
  experienceLevel: ExperienceLevel;
  hoursPerWeek: number;
  monthsDuration: number;
  fullTimeOnly: boolean;
  remoteOnly: boolean;
  includeCertifications: boolean;
}

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

// ─── Validation ──────────────────────────────────────────

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

// ─── Generated Scenario ─────────────────────────────────

export interface GeneratedScenario {
  nodes: CareerNode[];
  edges: CareerEdge[];
  tradeoffs: TradeoffItem[];
  overallConfidence: number;
}

export interface CareerNode {
  id: string;
  label: string;
  description: string;
  confidence: number; // 0-100
  timeframe: string;
  skills: string[];
  type: 'milestone' | 'certification' | 'role' | 'skill';
  reasoning: string; // "Kenapa AI merekomendasikan ini?"
  position: { x: number; y: number };
}

export interface CareerEdge {
  id: string;
  source: string;
  target: string;
  confidence: number; // 0-100
  label?: string;
}

export interface TradeoffItem {
  nodeId: string;
  nodeLabel: string;
  pros: string[];
  cons: string[];
}

// ─── Feedback ────────────────────────────────────────────

export type FeedbackTag =
  | 'Too Theoretical'
  | 'Project-Based'
  | 'Too Fast'
  | 'Too Slow'
  | 'Meets Needs'
  | 'Unrealistic';

export interface SavedPath {
  id: string;
  timestamp: number;
  formData: ScenarioFormData;
  scenario: GeneratedScenario;
  annotations: string;
  feedbackTags: FeedbackTag[];
}

// ─── API ─────────────────────────────────────────────────

export interface GenerateRequest {
  formData: ScenarioFormData;
}

export interface GenerateResponse {
  success: boolean;
  scenario?: GeneratedScenario;
  error?: string;
  uncertainty?: number;
}
