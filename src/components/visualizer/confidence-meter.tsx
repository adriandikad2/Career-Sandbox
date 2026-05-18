'use client';

import { useMemo } from 'react';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import type { GeneratedScenario } from '@/lib/types';

interface ConfidenceMetrics {
  overallConfidence: number;
  highConfidenceNodes: number;
  mediumConfidenceNodes: number;
  lowConfidenceNodes: number;
  highConfidencePercentage: number;
  mediumConfidencePercentage: number;
  lowConfidencePercentage: number;
  riskScore: number;
  pathStability: 'stable' | 'moderate' | 'volatile';
  criticalNodes: string[];
  strongNodes: string[];
}

/**
 * Calculate comprehensive confidence metrics from scenario
 */
function calculateConfidenceMetrics(scenario: GeneratedScenario): ConfidenceMetrics {
  const nodes = scenario.nodes;

  const highConfidenceNodes = nodes.filter((n) => n.confidence >= 70).length;
  const mediumConfidenceNodes = nodes.filter((n) => n.confidence >= 40 && n.confidence < 70).length;
  const lowConfidenceNodes = nodes.filter((n) => n.confidence < 40).length;

  const total = nodes.length;
  const highConfidencePercentage = Math.round((highConfidenceNodes / total) * 100);
  const mediumConfidencePercentage = Math.round((mediumConfidenceNodes / total) * 100);
  const lowConfidencePercentage = Math.round((lowConfidenceNodes / total) * 100);

  // Risk score (inverse of confidence)
  const avgConfidence = scenario.nodes.reduce((sum, n) => sum + n.confidence, 0) / nodes.length;
  const riskScore = 100 - avgConfidence;

  // Path stability
  let pathStability: 'stable' | 'moderate' | 'volatile' = 'stable';
  if (riskScore > 40) pathStability = 'volatile';
  else if (riskScore > 20) pathStability = 'moderate';

  // Critical and strong nodes
  const criticalNodes = nodes
    .filter((n) => n.confidence < 40)
    .map((n) => n.label);

  const strongNodes = nodes
    .filter((n) => n.confidence >= 80)
    .map((n) => n.label);

  return {
    overallConfidence: scenario.overallConfidence,
    highConfidenceNodes,
    mediumConfidenceNodes,
    lowConfidenceNodes,
    highConfidencePercentage,
    mediumConfidencePercentage,
    lowConfidencePercentage,
    riskScore,
    pathStability,
    criticalNodes,
    strongNodes,
  };
}

/**
 * Main Confidence Meter Component
 */
export function ConfidenceMeter({ scenario }: { scenario: GeneratedScenario }) {
  const metrics = useMemo(() => calculateConfidenceMetrics(scenario), [scenario]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'from-green-500 to-green-600';
    if (confidence >= 60) return 'from-blue-500 to-blue-600';
    if (confidence >= 40) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getStabilityIcon = () => {
    switch (metrics.pathStability) {
      case 'stable':
        return '📊';
      case 'moderate':
        return '⚡';
      case 'volatile':
        return '⚠️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Confidence Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-gradient-to-br from-bg-elevated to-bg-elevated/50 border border-border-subtle p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-text-primary">Confidence Assessment</h3>
          <BarChart3 size={20} className="text-accent" />
        </div>

        {/* Large Circular Confidence Indicator */}
        <div className="flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="relative w-32 h-32"
          >
            {/* Background circle */}
            <svg className="w-full h-full" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-bg-muted"
              />
              {/* Progress circle */}
              <motion.circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="345.57"
                strokeDashoffset={345.57 * (1 - metrics.overallConfidence / 100)}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 345.57 }}
                animate={{
                  strokeDashoffset:
                    345.57 * (1 - metrics.overallConfidence / 100),
                }}
                transition={{ delay: 0.3, duration: 1 }}
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor={
                      metrics.overallConfidence >= 80
                        ? '#10b981'
                        : metrics.overallConfidence >= 60
                          ? '#3b82f6'
                          : metrics.overallConfidence >= 40
                            ? '#f59e0b'
                            : '#ef4444'
                    }
                  />
                  <stop
                    offset="100%"
                    stopColor={
                      metrics.overallConfidence >= 80
                        ? '#059669'
                        : metrics.overallConfidence >= 60
                          ? '#1d4ed8'
                          : metrics.overallConfidence >= 40
                            ? '#d97706'
                            : '#dc2626'
                    }
                  />
                </linearGradient>
              </defs>
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-bold text-text-primary"
              >
                {Math.round(metrics.overallConfidence)}%
              </motion.span>
              <span className="text-xs text-text-muted">Confident</span>
            </div>
          </motion.div>
        </div>

        {/* Confidence Description */}
        <div className="text-center mb-6">
          <p
            className={`text-sm font-medium ${
              metrics.overallConfidence >= 70
                ? 'text-green-600'
                : metrics.overallConfidence >= 50
                  ? 'text-blue-600'
                  : 'text-yellow-600'
            }`}
          >
            {metrics.overallConfidence >= 70
              ? '✓ High confidence path - Good balance of achievable milestones'
              : metrics.overallConfidence >= 50
                ? '⚡ Moderate confidence path - Some challenging steps ahead'
                : '⚠️ Low confidence path - Requires significant effort and commitment'}
          </p>
        </div>
      </motion.div>

      {/* Confidence Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-gradient-to-br from-bg-elevated to-bg-elevated/50 border border-border-subtle p-6"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-text-primary">
          <TrendingUp size={20} />
          Path Composition
        </h3>

        {/* Progress bars */}
        <div className="space-y-4">
          {/* High Confidence */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary">
                High Confidence ({metrics.highConfidenceNodes} nodes)
              </span>
              <span className="text-sm font-bold text-green-600">
                {metrics.highConfidencePercentage}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metrics.highConfidencePercentage}%` }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-green-400 to-green-600"
              />
            </div>
          </div>

          {/* Medium Confidence */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary">
                Medium Confidence ({metrics.mediumConfidenceNodes} nodes)
              </span>
              <span className="text-sm font-bold text-blue-600">
                {metrics.mediumConfidencePercentage}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metrics.mediumConfidencePercentage}%` }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
              />
            </div>
          </div>

          {/* Low Confidence */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary">
                Low Confidence ({metrics.lowConfidenceNodes} nodes)
              </span>
              <span className="text-sm font-bold text-red-600">
                {metrics.lowConfidencePercentage}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metrics.lowConfidencePercentage}%` }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-red-400 to-red-600"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Path Stability & Risk Analysis */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Path Stability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl bg-gradient-to-br from-bg-elevated to-bg-elevated/50 border border-border-subtle p-6"
        >
          <h3 className="mb-4 text-sm font-bold text-text-primary">Path Stability</h3>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{getStabilityIcon()}</span>
            <div>
              <p className="text-lg font-bold text-text-primary capitalize">
                {metrics.pathStability}
              </p>
              <p className="text-xs text-text-secondary">
                {metrics.pathStability === 'stable'
                  ? 'Most steps are well-defined'
                  : metrics.pathStability === 'moderate'
                    ? 'Some uncertainty in later steps'
                    : 'Significant uncertainty ahead'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Risk Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl bg-gradient-to-br from-bg-elevated to-bg-elevated/50 border border-border-subtle p-6"
        >
          <h3 className="mb-4 text-sm font-bold text-text-primary">Risk Score</h3>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-text-primary">
              {Math.round(metrics.riskScore)}
            </div>
            <div>
              <p className="text-xs text-text-secondary">
                {metrics.riskScore <= 20
                  ? '✓ Low risk - Achievable path'
                  : metrics.riskScore <= 40
                    ? '⚡ Moderate risk - Needs effort'
                    : '⚠️ High risk - Very challenging'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Critical & Strong Nodes */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Strong Nodes */}
        {metrics.strongNodes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl bg-gradient-to-br from-green-50 to-green-50/50 border border-green-200 p-6"
          >
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-green-900">
              <CheckCircle size={16} />
              Strong Foundations
            </h3>
            <ul className="space-y-2">
              {metrics.strongNodes.map((node, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="text-sm text-green-800 flex items-center gap-2"
                >
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  {node}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Critical Nodes */}
        {metrics.criticalNodes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-50/50 border border-yellow-200 p-6"
          >
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-yellow-900">
              <AlertCircle size={16} />
              Areas of Focus
            </h3>
            <ul className="space-y-2">
              {metrics.criticalNodes.map((node, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="text-sm text-yellow-800 flex items-center gap-2"
                >
                  <span className="h-2 w-2 rounded-full bg-yellow-600" />
                  {node}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Confidence Interpretation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl bg-blue-50 border border-blue-200 p-6"
      >
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-blue-900">
          <Info size={16} />
          Understanding These Metrics
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            <strong>Overall Confidence:</strong> Combined probability of successfully reaching your target through this path
          </li>
          <li>
            <strong>High Confidence Nodes:</strong> Well-established steps with clear learning paths and market validation
          </li>
          <li>
            <strong>Low Confidence Nodes:</strong> Steps requiring extra effort, research, or flexibility
          </li>
          <li>
            <strong>Path Stability:</strong> How consistent the confidence is across all steps
          </li>
          <li>
            <strong>Risk Score:</strong> Inverse of confidence - lower is better for achievability
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

export default ConfidenceMeter;
