'use client';

import { useRouter } from 'next/navigation';
import { Plus, ArrowRightLeft, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCareerStore } from '@/store/career-store';

export function ScenarioStarters() {
  const router = useRouter();
  const { resetForm } = useCareerStore();

  const handleStartBlank = () => {
    resetForm();
    router.push('/scenario');
  };

  const handleCareerSwitch = () => {
    resetForm();
    router.push('/scenario?template=career-switch');
  };

  return (
    <section aria-label="Start new scenario" className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles size={20} className="text-accent" />
        <h2 className="text-lg font-semibold text-text-primary">Start New Scenario</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Start from Blank */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            onClick={handleStartBlank}
            id="start-blank"
            className="w-full text-left glass-card p-8 block group hover:border-accent/40 transition-all duration-300 relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-accent/25 transition-all duration-300">
                <Plus size={24} className="text-accent" />
              </div>

              <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                Start from Blank
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                Input parameter custom Anda sendiri — target karir, skill, timeline, dan constraint untuk mendapatkan skenario yang dipersonalisasi.
              </p>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent group-hover:gap-3 transition-all">
                Mulai Eksplorasi
                <ChevronRight size={14} />
              </span>
            </div>
          </button>
        </motion.div>

        {/* Career Switch */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={handleCareerSwitch}
            id="career-switch"
            className="w-full text-left glass-card p-8 block group hover:border-[#00cec9]/40 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00cec9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#00cec9]/15 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#00cec9]/25 transition-all duration-300">
                <ArrowRightLeft size={24} className="text-[#00cec9]" />
              </div>

              <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-[#00cec9] transition-colors">
                Career Switch
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                Template pra-konfigurasi untuk pivot karir cepat — dari developer ke PM, dari analyst ke data scientist, dan lainnya.
              </p>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#00cec9] group-hover:gap-3 transition-all">
                Lihat Template
                <ChevronRight size={14} />
              </span>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
