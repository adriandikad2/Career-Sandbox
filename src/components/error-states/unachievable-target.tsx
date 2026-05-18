'use client';

import { useCallback } from 'react';
import { AlertOctagon, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { useCareerStore } from '@/store/career-store';
import type { ErrorContext, RecoverySuggestion } from '@/lib/error-handling';

interface UnachievableTargetProps {
  error: ErrorContext;
  onRetry?: () => void;
}

export function UnachievableTargetError({
  error,
  onRetry,
}: UnachievableTargetProps) {
  const { setFormField } = useCareerStore();

  const handleApplySuggestion = useCallback(
    (suggestion: RecoverySuggestion) => {
      // Apply each parameter adjustment
      Object.entries(suggestion.adjustedParams).forEach(([key, value]) => {
        setFormField(key as any, value);
      });
    },
    [setFormField]
  );

  const getSeverityColor = () => {
    switch (error.severity) {
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'critical':
        return 'border-red-300 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getSeverityIconColor = () => {
    switch (error.severity) {
      case 'warning':
        return 'text-yellow-600';
      case 'error':
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border-2 p-6 ${getSeverityColor()}`}
    >
      {/* Header */}
      <div className="mb-4 flex items-start gap-3">
        <AlertOctagon size={24} className={`flex-shrink-0 ${getSeverityIconColor()}`} />
        <div className="flex-1">
          <h2 className="text-lg font-bold text-text-primary">{error.title}</h2>
          <p className="mt-1 text-sm text-text-secondary">{error.message}</p>
        </div>
      </div>

      {/* Recovery Suggestions */}
      {error.suggestions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-yellow-600" />
            <h3 className="font-semibold text-text-primary">Saran Perbaikan</h3>
          </div>

          <div className="space-y-2">
            {error.suggestions.map((suggestion) => (
              <motion.button
                key={suggestion.id}
                onClick={() => handleApplySuggestion(suggestion)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full rounded-lg border border-border-subtle bg-white p-4 text-left transition-all hover:border-accent hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">
                      {suggestion.title}
                    </h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      {suggestion.description}
                    </p>

                    {/* Difficulty & Impact badges */}
                    <div className="mt-2 flex gap-2">
                      <span
                        className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                          suggestion.difficulty === 'easy'
                            ? 'bg-green-100 text-green-700'
                            : suggestion.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {suggestion.difficulty === 'easy'
                          ? '✓ Mudah'
                          : suggestion.difficulty === 'medium'
                            ? '⚡ Sedang'
                            : '⚠️ Sulit'}
                      </span>
                      <span
                        className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                          suggestion.estimatedImpact === 'high'
                            ? 'bg-blue-100 text-blue-700'
                            : suggestion.estimatedImpact === 'medium'
                              ? 'bg-blue-50 text-blue-600'
                              : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        Impact:{' '}
                        {suggestion.estimatedImpact === 'high'
                          ? 'Tinggi'
                          : suggestion.estimatedImpact === 'medium'
                            ? 'Sedang'
                            : 'Rendah'}
                      </span>
                    </div>
                  </div>

                  <ArrowRight size={16} className="mt-1 flex-shrink-0 text-accent" />
                </div>
              </motion.button>
            ))}
          </div>

          <p className="mt-3 text-xs text-text-muted">
            💡 Tip: Klik salah satu saran untuk menyesuaikan parameter. Anda dapat combine
            beberapa saran.
          </p>
        </div>
      )}

      {/* Retry Button */}
      {onRetry && (
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full rounded-lg bg-accent px-4 py-2 font-semibold text-white transition-all hover:bg-accent-hover"
        >
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 size={16} />
            Coba Lagi dengan Penyesuaian
          </span>
        </motion.button>
      )}

      {/* Technical Details (if available) */}
      {error.technicalDetails && (
        <details className="mt-4 text-xs text-text-muted">
          <summary className="cursor-pointer font-semibold">Detail Teknis</summary>
          <pre className="mt-2 overflow-auto rounded bg-black/5 p-2">
            {error.technicalDetails}
          </pre>
        </details>
      )}
    </motion.div>
  );
}

/**
 * Compact error display for inline errors
 */
export function InlineErrorMessage({
  error,
  onDismiss,
}: {
  error: ErrorContext;
  onDismiss?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`rounded-lg border-l-4 ${
        error.severity === 'warning'
          ? 'border-yellow-400 bg-yellow-50'
          : 'border-red-400 bg-red-50'
      } p-3`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertOctagon size={16} className={
            error.severity === 'warning' ? 'text-yellow-600' : 'text-red-600'
          } />
          <p className="text-sm font-medium text-text-primary">{error.title}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-text-muted hover:text-text-primary"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
}
