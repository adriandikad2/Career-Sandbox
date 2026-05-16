'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquarePlus } from 'lucide-react';
import Link from 'next/link';

import { AnnotationBox } from '@/components/feedback/annotation-box';
import { FeedbackTags } from '@/components/feedback/feedback-tags';
import { ActionButtons } from '@/components/feedback/action-buttons';
import { useCareerStore } from '@/store/career-store';

export default function FeedbackPage() {
  const { scenario, formData } = useCareerStore();

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          href="/visualizer"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors mb-4"
        >
          <ArrowLeft size={14} />
          Back to Visualizer
        </Link>
        <div className="flex items-center gap-3 mb-1">
          <MessageSquarePlus size={24} className="text-accent" />
          <h1 className="text-2xl font-bold text-text-primary">
            Reflection & Feedback
          </h1>
        </div>
        <p className="text-sm text-text-secondary">
          Review, annotate, dan beri feedback pada jalur karir yang telah digenerate.
        </p>
      </motion.header>

      {/* Scenario summary */}
      {scenario && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5 mb-6"
        >
          <h2 className="text-sm font-semibold text-text-primary mb-3">Scenario Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-text-muted block mb-0.5">Target</span>
              <span className="text-text-primary font-medium">{formData.careerTarget || '—'}</span>
            </div>
            <div>
              <span className="text-text-muted block mb-0.5">Industry</span>
              <span className="text-text-primary font-medium">{formData.industry || '—'}</span>
            </div>
            <div>
              <span className="text-text-muted block mb-0.5">Timeline</span>
              <span className="text-text-primary font-medium">{formData.targetTimeline}</span>
            </div>
            <div>
              <span className="text-text-muted block mb-0.5">Confidence</span>
              <span className={`font-semibold ${scenario.overallConfidence >= 70 ? 'text-success' : 'text-warning'}`}>
                {scenario.overallConfidence}%
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Feedback form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-8"
      >
        {/* Annotations */}
        <div className="glass-card p-6">
          <AnnotationBox />
        </div>

        {/* Quick feedback */}
        <div className="glass-card p-6">
          <FeedbackTags />
        </div>

        {/* Actions */}
        <ActionButtons />

        {/* Footer note */}
        <p className="text-[11px] text-text-muted text-center leading-relaxed max-w-md mx-auto">
          Feedback Anda akan disimpan secara lokal dan digunakan untuk memperbaiki
          skenario berikutnya. Data tidak dikirim ke server eksternal.
        </p>
      </motion.div>
    </div>
  );
}
