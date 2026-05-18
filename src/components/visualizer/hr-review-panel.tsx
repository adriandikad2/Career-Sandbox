'use client';

import { useState } from 'react';
import { useCareerStore } from '@/store/career-store';
import { Check, X, MessageSquare, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function HRReviewPanel() {
  const router = useRouter();
  const { activeSavedPathId, updatePathStatus, savedPaths } = useCareerStore();
  const currentPath = savedPaths.find((p) => p.id === activeSavedPathId);
  const [feedback, setFeedback] = useState(currentPath?.hrFeedback || '');

  if (!activeSavedPathId || !currentPath) return null;

  const handleAction = (status: 'approved' | 'rejected' | 'needs_revision') => {
    if (!feedback.trim()) {
      window.alert("Silakan berikan alasan atau komentar Anda!");
      return;
    }
    updatePathStatus(activeSavedPathId, status, feedback);
    router.push('/');
  };

  const isCompleted = currentPath.status === 'approved' || currentPath.status === 'rejected';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bg-surface border border-border-subtle rounded-xl p-4 mt-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare size={16} className="text-accent" />
        <h3 className="text-sm font-semibold text-text-primary">HR Review</h3>
        {currentPath.status !== 'pending' && (
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-border-subtle text-text-secondary capitalize">
            {currentPath.status?.replace('_', ' ')}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-text-secondary mb-1">
          Review Feedback {isCompleted ? '' : '(Required)'}
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          readOnly={isCompleted}
          placeholder="Provide feedback on why this path is approved, rejected, or needs revision..."
          className={`w-full h-24 p-2.5 text-sm rounded-lg border border-border-subtle outline-none resize-none ${
            isCompleted 
              ? 'bg-bg-muted/50 text-text-secondary cursor-not-allowed' 
              : 'bg-bg-elevated text-text-primary focus:border-accent'
          }`}
        />
      </div>
      {!isCompleted && (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleAction('approved')}
            className="flex items-center justify-center gap-2 w-full py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg text-sm font-medium transition-colors border border-green-500/20"
          >
            <Check size={16} /> Approve Path
          </button>
          <button
            onClick={() => handleAction('needs_revision')}
            className="flex items-center justify-center gap-2 w-full py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-lg text-sm font-medium transition-colors border border-yellow-500/20"
          >
            <MessageSquare size={16} /> Recommend Revision
          </button>
          <button
            onClick={() => handleAction('rejected')}
            className="flex items-center justify-center gap-2 w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors border border-red-500/20"
          >
            <X size={16} /> Reject Path
          </button>
        </div>
      )}
    </motion.div>
  );
}
