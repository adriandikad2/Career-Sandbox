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

export interface ReasoningExplanation {
  primary: string; // Why this is recommended
  dataSource: string; // Where did this recommendation come from
  confidence: 'high' | 'medium' | 'low';
  alternatives: string[]; // What else could be done
  risks: string[]; // What could go wrong
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
  detailedReasoning?: ReasoningExplanation;
  skillGaps?: { skill: string; difficulty: 1 | 2 | 3 | 4 | 5; estimatedHours: number }[];
  prerequisites?: string[]; // IDs of nodes that should come first
  alternativePaths?: string[]; // IDs of alternative approaches
  marketDemand?: 1 | 2 | 3 | 4 | 5; // How in-demand is this role/skill
  historicalSuccessRate?: number; // % of people who succeed in this transition
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

export interface FeedbackContext {
  timestamp: number;
  formData: ScenarioFormData;
  scenario: GeneratedScenario;
  annotations: string;
  feedbackTags: FeedbackTag[];
  status?: EvaluationStatus;
  hrFeedback?: string;
}

export type EvaluationStatus = 'pending' | 'approved' | 'rejected' | 'needs_revision';

export interface SavedPath {
  id: string;
  timestamp: number;
  formData: ScenarioFormData;
  scenario: GeneratedScenario;
  annotations: string;
  feedbackTags: FeedbackTag[];
  status?: EvaluationStatus;
  hrFeedback?: string;
}

// ─── API ─────────────────────────────────────────────────

export interface GenerateRequest {
  formData: ScenarioFormData;
  feedbackContext?: FeedbackContext;
}

export interface GenerateResponse {
  success: boolean;
  scenario?: GeneratedScenario;
  error?: string;
  uncertainty?: number;
}
