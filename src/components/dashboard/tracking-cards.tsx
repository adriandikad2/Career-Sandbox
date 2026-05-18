'use client';

import { Bookmark, Check, X, TrendingUp, BookOpen, Wrench, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCareerStore } from '@/store/career-store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TrackingCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  progress: number;
  items: string[];
  color: string;
  delay: number;
}

function TrackingCard({ icon, title, subtitle, progress, items, color, delay }: TrackingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6 hover:border-accent/30 transition-all duration-300 group cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ background: `${color}20` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        <span className="text-xs font-medium text-text-muted px-2.5 py-1 rounded-full bg-bg-elevated">
          {subtitle}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full bg-bg-elevated mt-3 mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: color }}
            />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function TrackingCards() {
  const cards = [
    {
      icon: <BookOpen size={20} />,
      title: 'Learn',
      subtitle: 'Course Tracking',
      progress: 65,
      items: [
        '3 courses in progress',
        '12 modules completed',
        'Next: Advanced ML Concepts',
      ],
      color: '#6c5ce7',
      delay: 0.1,
    },
    {
      icon: <Wrench size={20} />,
      title: 'Practice',
      subtitle: 'Hands-on Milestones',
      progress: 40,
      items: [
        '2 projects deployed',
        '5 coding challenges done',
        'Next: Build REST API',
      ],
      color: '#00cec9',
      delay: 0.2,
    },
    {
      icon: <Rocket size={20} />,
      title: 'Apply',
      subtitle: 'Project Deployment',
      progress: 20,
      items: [
        '1 portfolio project live',
        '0 open-source contributions',
        'Next: Deploy ML Model',
      ],
      color: '#e94560',
      delay: 0.3,
    },
  ];

  return (
    <section aria-label="Progress tracking">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp size={20} className="text-accent" />
        <h2 className="text-lg font-semibold text-text-primary">Your Progress</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => (
          <TrackingCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}

export function SavedPathsPreview() {
  const router = useRouter();
  const { savedPaths, updatePathStatus, loadSavedPath, userRole } = useCareerStore();

  const visiblePaths = savedPaths;

  const handleViewDetails = (pathId: string) => {
    loadSavedPath(pathId);
    router.push('/visualizer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6 mt-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Bookmark size={18} className="text-accent" />
          <h3 className="text-base font-semibold text-text-primary">
            Saved Career Paths {userRole === 'hr' ? '(HR Review)' : ''}
          </h3>
        </div>
      </div>
      
      {visiblePaths.length === 0 ? (
        <p className="text-sm text-text-muted">
          Belum ada jalur yang disimpan. Buat skenario baru untuk memulai.
        </p>
      ) : (
        <div className="space-y-4">
          {visiblePaths.map((path) => (
            <div key={path.id} className="p-4 rounded-xl border border-border-subtle bg-bg-surface/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-text-primary">
                    Target: {path.formData.careerTarget || 'Not set'}
                  </h4>
                  {path.status === 'approved' && <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">Approved</span>}
                  {path.status === 'rejected' && <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-medium border border-red-500/20">Rejected</span>}
                  {path.status === 'pending' && <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-medium border border-yellow-500/20">Pending</span>}
                </div>
                <p className="text-xs text-text-secondary">
                  {new Date(path.timestamp).toLocaleDateString()} • {path.scenario.nodes.length} nodes
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleViewDetails(path.id)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-bg-elevated hover:bg-bg-elevated/80 text-text-primary transition-colors border border-border-subtle"
                >
                  View Details
                </button>
                
                {userRole === 'hr' && path.status === 'pending' && (
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={() => updatePathStatus(path.id, 'approved')}
                      className="p-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-500 transition-colors border border-green-500/20"
                      title="Approve Path"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => updatePathStatus(path.id, 'rejected')}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors border border-red-500/20"
                      title="Reject Path"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
