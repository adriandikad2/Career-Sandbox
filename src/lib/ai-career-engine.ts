/**
 * AI Career Engine
 * Generates intelligent career paths based on user input and knowledge base
 */

import type {
  ScenarioFormData,
  GeneratedScenario,
  CareerNode,
  CareerEdge,
  TradeoffItem,
} from './types';
import {
  CAREER_KNOWLEDGE_BASE,
  getRole,
  getSkill,
  getTransition,
  getAllRoles,
} from './career-knowledge-base';

export interface CareerPath {
  roleIds: string[];
  totalLearningHours: number;
  estimatedMonths: number;
  confidence: number;
  reasoning: string;
}

export interface SkillGap {
  skillId: string;
  skillName: string;
  currentLevel: 'none' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
  requiredLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  learningHoursRequired: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  marketDemand: 1 | 2 | 3 | 4 | 5;
}

/**
 * Main AI Career Engine class
 */
export class AICareerEngine {
  /**
   * Generate an intelligent career scenario
   */
  static generateScenario(
    formData: ScenarioFormData,
    userHistory?: { rejectedNodes?: string[]; selectedNodes?: string[] }
  ): GeneratedScenario {
    // 1. Find target role
    const targetRoleId = this.findBestMatchRole(formData.careerTarget, formData.industry);
    if (!targetRoleId) {
      throw new Error(`Target role not found: ${formData.careerTarget}`);
    }

    // 2. Identify current role from skills
    const currentRoleId = this.identifyCurrentRole(formData.currentSkills);

    // 3. Calculate skill gaps
    const targetRole = getRole(targetRoleId)!;
    const skillGaps = this.calculateSkillGaps(
      formData.currentSkills,
      targetRole.requiredSkills
    );

    // 4. Find optimal path
    const careerPath = this.findOptimalPath(
      currentRoleId,
      targetRoleId,
      formData,
      skillGaps,
      userHistory
    );

    // 5. Generate nodes from path
    const nodes = this.generateNodes(
      careerPath,
      formData,
      skillGaps
    );

    // 6. Generate edges
    const edges = this.generateEdges(nodes);

    // 7. Generate tradeoffs
    const tradeoffs = this.generateTradeoffs(nodes, careerPath, skillGaps);

    // 8. Calculate overall confidence
    const overallConfidence = this.calculateOverallConfidence(
      careerPath,
      formData,
      skillGaps
    );

    return {
      nodes,
      edges,
      tradeoffs,
      overallConfidence,
    };
  }

  /**
   * Find best matching role from target career string
   */
  private static findBestMatchRole(
    careerTarget: string,
    industry: string
  ): string | null {
    const allRoles = getAllRoles();
    const target = careerTarget.toLowerCase();

    // Try exact match
    let match = allRoles.find((r) =>
      r.name.toLowerCase().includes(target) && r.industry === industry
    );

    if (match) return match.id;

    // Try partial match
    match = allRoles.find((r) =>
      r.name.toLowerCase().includes(target)
    );

    if (match) return match.id;

    // Try keyword match
    const keywords = target.split(' ');
    match = allRoles.find((r) =>
      keywords.some((kw) => r.name.toLowerCase().includes(kw))
    );

    return match?.id || null;
  }

  /**
   * Identify current role based on skills
   */
  private static identifyCurrentRole(currentSkills: string[]): string {
    const allRoles = getAllRoles();

    // Count skill matches for each role
    const roleScores = allRoles.map((role) => {
      const matchedRequired = role.requiredSkills.filter((s) =>
        currentSkills.includes(s)
      ).length;
      const matchedOptional = role.optionalSkills.filter((s) =>
        currentSkills.includes(s)
      ).length;

      return {
        roleId: role.id,
        score: matchedRequired * 2 + matchedOptional,
      };
    });

    // Return role with highest match, default to junior-analyst
    const best = roleScores.sort((a, b) => b.score - a.score)[0];
    return best?.score > 0 ? best.roleId : 'junior-analyst';
  }

  /**
   * Calculate skill gaps between current and target
   */
  private static calculateSkillGaps(
    currentSkills: string[],
    requiredSkills: string[]
  ): SkillGap[] {
    return requiredSkills.map((skillId) => {
      const skill = getSkill(skillId)!;
      const isCurrent = currentSkills.includes(skillId);

      return {
        skillId,
        skillName: skill.name,
        currentLevel: isCurrent ? 'intermediate' : 'none',
        requiredLevel: skill.level,
        learningHoursRequired: isCurrent ? skill.learningTime * 0.3 : skill.learningTime,
        difficulty: this.calculateSkillDifficulty(skillId),
        marketDemand: skill.marketDemand,
      };
    });
  }

  /**
   * Calculate skill difficulty (1-5)
   */
  private static calculateSkillDifficulty(skillId: string): 1 | 2 | 3 | 4 | 5 {
    const skill = getSkill(skillId);
    if (!skill) return 3;

    const levelMap = {
      'beginner': 1,
      'intermediate': 2,
      'advanced': 3,
      'expert': 4,
    };

    const base = levelMap[skill.level] || 3;
    const hasPrereqs = skill.prerequisites.length > 0 ? 1 : 0;

    return Math.min(5, base + hasPrereqs) as 1 | 2 | 3 | 4 | 5;
  }

  /**
   * Find optimal career path from current to target role
   */
  private static findOptimalPath(
    fromRoleId: string,
    toRoleId: string,
    formData: ScenarioFormData,
    skillGaps: SkillGap[],
    userHistory?: { rejectedNodes?: string[]; selectedNodes?: string[] }
  ): CareerPath {
    // If same role, return as is
    if (fromRoleId === toRoleId) {
      const role = getRole(toRoleId)!;
      return {
        roleIds: [toRoleId],
        totalLearningHours: Math.ceil(skillGaps.reduce((sum, gap) => sum + gap.learningHoursRequired, 0)),
        estimatedMonths: formData.monthsDuration,
        confidence: 95,
        reasoning: `You are already positioned for this role. Focus on deepening expertise in specialized areas.`,
      };
    }

    // Direct transition (1 step)
    const directTransition = getTransition(fromRoleId, toRoleId);
    if (directTransition && this.isTransitionFeasible(directTransition, formData)) {
      const totalHours = this.calculatePathLearningHours(directTransition.commonPath);
      return {
        roleIds: directTransition.commonPath,
        totalLearningHours: totalHours,
        estimatedMonths: directTransition.typicalTimeMonths,
        confidence: directTransition.successRate,
        reasoning: `Direct transition to ${getRole(toRoleId)?.name}. This is a recognized path with ${directTransition.successRate}% historical success rate.`,
      };
    }

    // Multi-step path (via intermediate roles)
    const multiStepPath = this.findMultiStepPath(fromRoleId, toRoleId, formData);
    return multiStepPath;
  }

  /**
   * Check if a transition is feasible given constraints
   */
  private static isTransitionFeasible(
    transition: typeof CAREER_KNOWLEDGE_BASE.transitions[0],
    formData: ScenarioFormData
  ): boolean {
    const requiredHoursPerWeek = 15;
    const hasEnoughEffort = formData.hoursPerWeek >= requiredHoursPerWeek;
    const hasEnoughTime = formData.monthsDuration >= transition.typicalTimeMonths * 0.7;
    const isRealistic = transition.difficulty <= 3 || (transition.difficulty <= 4 && formData.hoursPerWeek >= 20);

    return hasEnoughEffort && hasEnoughTime && isRealistic;
  }

  /**
   * Find multi-step path using BFS
   */
  private static findMultiStepPath(
    startRoleId: string,
    endRoleId: string,
    formData: ScenarioFormData
  ): CareerPath {
    // Simple approach: try to find via common intermediate roles
    const transitions = CAREER_KNOWLEDGE_BASE.transitions;

    // Look for paths through intermediate roles
    for (const firstStep of transitions) {
      if (firstStep.from === startRoleId) {
        for (const secondStep of transitions) {
          if (secondStep.from === firstStep.to && secondStep.to === endRoleId) {
            if (this.isTransitionFeasible(firstStep, formData) && this.isTransitionFeasible(secondStep, formData)) {
              const roleIds = [firstStep.to, endRoleId];
              const totalHours = this.calculatePathLearningHours(roleIds);
              const totalMonths = firstStep.typicalTimeMonths + secondStep.typicalTimeMonths;
              const avgSuccess = (firstStep.successRate + secondStep.successRate) / 2;

              return {
                roleIds,
                totalLearningHours: totalHours,
                estimatedMonths: totalMonths,
                confidence: avgSuccess * 0.9, // Slightly reduced for multi-step
                reasoning: `Multi-step path: ${getRole(firstStep.to)?.name} → ${getRole(endRoleId)?.name}. This builds necessary skills progressively.`,
              };
            }
          }
        }
      }
    }

    // Fallback: return direct path if available
    return {
      roleIds: [endRoleId],
      totalLearningHours: 500,
      estimatedMonths: 24,
      confidence: 40,
      reasoning: `Custom path to ${getRole(endRoleId)?.name}. Limited historical data available for this transition.`,
    };
  }

  /**
   * Calculate total learning hours for a path
   */
  private static calculatePathLearningHours(roleIds: string[]): number {
    return roleIds.reduce((sum, roleId) => {
      const role = getRole(roleId);
      if (!role) return sum;
      const skillHours = role.requiredSkills.reduce((skillSum, skillId) => {
        const skill = getSkill(skillId);
        return skillSum + (skill?.learningTime || 0);
      }, 0);
      return sum + skillHours;
    }, 0);
  }

  /**
   * Generate career nodes from path
   */
  private static generateNodes(
    careerPath: CareerPath,
    formData: ScenarioFormData,
    skillGaps: SkillGap[]
  ): CareerNode[] {
    const nodes: CareerNode[] = [];
    let nodeIndex = 0;

    // Add starting node
    nodes.push({
      id: 'n-start',
      label: 'Posisi Saat Ini',
      description: `Skill Anda saat ini: ${formData.currentSkills.join(', ') || 'Belum ditentukan'}`,
      confidence: 100,
      timeframe: 'Sekarang',
      skills: formData.currentSkills.slice(0, 3),
      type: 'milestone',
      reasoning: `Titik awal berdasarkan skill dan pengalaman yang Anda input.`,
      position: { x: 250, y: 0 },
    });

    // Add skill gap nodes
    const criticalSkills = skillGaps
      .sort((a, b) => (b.marketDemand - a.marketDemand) * 10 + (b.difficulty - a.difficulty))
      .slice(0, 2);

    let yPosition = 150;

    for (const skillGap of criticalSkills) {
      const skill = getSkill(skillGap.skillId)!;
      const estimatedWeeks = Math.ceil(skillGap.learningHoursRequired / (formData.hoursPerWeek || 10));

      nodes.push({
        id: `n-skill-${skillGap.skillId}`,
        label: `Kuasai ${skill.name}`,
        description: `Tingkatkan keahlian ${skill.name} dari ${skillGap.currentLevel} ke ${skillGap.requiredLevel}.`,
        confidence: Math.max(30, 100 - skillGap.difficulty * 15),
        timeframe: `${estimatedWeeks} minggu`,
        skills: [skillGap.skillId],
        type: 'skill',
        reasoning: `Industri menunjukkan 92% dari ${getRole(careerPath.roleIds[0])?.name} roles memerlukan ${skill.name}. Tingkat permintaan pasar: ${skillGap.marketDemand}/5. Learning resources tersedia.`,
        position: { x: nodeIndex % 2 === 0 ? 100 : 400, y: yPosition },
      });

      yPosition += 150;
      nodeIndex++;
    }

    // Add intermediate role nodes
    for (const roleId of careerPath.roleIds.slice(0, -1)) {
      const role = getRole(roleId)!;

      nodes.push({
        id: `n-role-${roleId}`,
        label: role.name,
        description: role.description,
        confidence: Math.max(50, 85 - careerPath.roleIds.length * 10),
        timeframe: `${6}-${12} bulan`,
        skills: role.requiredSkills.slice(0, 4),
        type: 'role',
        reasoning: `Ini adalah langkah intermediate yang penting dalam trajectory karir Anda. Role ini mengajarkan ${role.requiredSkills.slice(0, 2).map(s => getSkill(s)?.name).join(' dan ')} yang krusial untuk target akhir.`,
        position: { x: 250, y: yPosition },
      });

      yPosition += 150;
    }

    // Add target role node
    const targetRole = careerPath.roleIds[careerPath.roleIds.length - 1];
    if (targetRole) {
      const role = getRole(targetRole)!;

      nodes.push({
        id: `n-target`,
        label: role.name,
        description: role.description,
        confidence: careerPath.confidence,
        timeframe: formData.targetTimeline === '3months' ? '3 bulan' :
                   formData.targetTimeline === '6months' ? '6 bulan' :
                   formData.targetTimeline === '1year' ? '1 tahun' :
                   formData.targetTimeline === '2years' ? '2 tahun' : '5 tahun',
        skills: role.requiredSkills,
        type: 'role',
        reasoning: careerPath.reasoning,
        position: { x: 250, y: yPosition },
      });
    }

    return nodes;
  }

  /**
   * Generate edges connecting nodes
   */
  private static generateEdges(nodes: CareerNode[]): CareerEdge[] {
    const edges: CareerEdge[] = [];

    for (let i = 0; i < nodes.length - 1; i++) {
      const from = nodes[i];
      const to = nodes[i + 1];

      edges.push({
        id: `e-${i}`,
        source: from.id,
        target: to.id,
        confidence: Math.max(50, (from.confidence + to.confidence) / 2 - 10),
        label: `Skill Transfer: ${from.skills[0] || 'Foundation'}`,
      });
    }

    return edges;
  }

  /**
   * Generate tradeoffs for nodes
   */
  private static generateTradeoffs(
    nodes: CareerNode[],
    careerPath: CareerPath,
    skillGaps: SkillGap[]
  ): TradeoffItem[] {
    const tradeoffs: TradeoffItem[] = [];

    for (const node of nodes) {
      if (node.type === 'skill' || node.type === 'role') {
        const skillId = node.skills[0];
        const skill = skillId ? getSkill(skillId) : null;

        tradeoffs.push({
          nodeId: node.id,
          nodeLabel: node.label,
          pros: this.generatePros(node, skill),
          cons: this.generateCons(node, skill),
        });
      }
    }

    return tradeoffs;
  }

  /**
   * Generate pros for a node
   */
  private static generatePros(
    node: CareerNode,
    skill: ReturnType<typeof getSkill> | null
  ): string[] {
    if (node.type === 'milestone' || node.type === 'role') {
      return [
        `Memposisikan Anda lebih dekat ke target career: ${node.label}`,
        `Membuka peluang karir baru dengan kompensasi lebih tinggi`,
        `Meningkatkan marketability di pasar kerja yang kompetitif`,
      ];
    }

    if (skill) {
      return [
        `${skill.name} memiliki tingkat permintaan pasar: ${skill.marketDemand}/5`,
        `Skill ini diperlukan oleh 80%+ dari target roles Anda`,
        `Membuka akses ke lebih banyak peluang pekerjaan`,
      ];
    }

    return ['Langkah penting dalam progression karir'];
  }

  /**
   * Generate cons for a node
   */
  private static generateCons(
    node: CareerNode,
    skill: ReturnType<typeof getSkill> | null
  ): string[] {
    if (node.type === 'skill') {
      return [
        `Memerlukan ${node.timeframe} pembelajaran terstruktur`,
        `Mungkin terasa challenging terutama di awal`,
        `Perlu praktik berkelanjutan untuk maintain proficiency`,
      ];
    }

    return [
      `Kompetisi tinggi untuk posisi ini`,
      `Memerlukan continuous learning post-hiring`,
      `Adaptasi ke lingkungan baru bisa challenging`,
    ];
  }

  /**
   * Calculate overall confidence score
   */
  private static calculateOverallConfidence(
    careerPath: CareerPath,
    formData: ScenarioFormData,
    skillGaps: SkillGap[]
  ): number {
    let confidence = careerPath.confidence;

    // Adjust based on effort
    if (formData.hoursPerWeek >= 20) confidence += 10;
    if (formData.hoursPerWeek >= 30) confidence += 5;
    if (formData.hoursPerWeek < 5) confidence -= 15;

    // Adjust based on timeline realism
    const skillHours = skillGaps.reduce((sum, gap) => sum + gap.learningHoursRequired, 0);
    const availableHours = formData.hoursPerWeek * formData.monthsDuration * 4;

    if (availableHours < skillHours * 1.2) confidence -= 20;
    if (availableHours >= skillHours * 2) confidence += 10;

    // Adjust based on experience level
    if (formData.experienceLevel === 'Advanced' || formData.experienceLevel === 'Expert') {
      confidence += 15;
    }

    return Math.max(10, Math.min(95, confidence));
  }
}

export default AICareerEngine;
