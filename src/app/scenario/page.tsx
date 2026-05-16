'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { useCareerStore } from '@/store/career-store';
import { validateScenarioForm } from '@/lib/validation';
import { useScenario } from '@/hooks/use-scenario';

import { CareerTarget } from '@/components/scenario-form/career-target';
import { TimelineSelect } from '@/components/scenario-form/timeline-select';
import { IndustrySelect } from '@/components/scenario-form/industry-select';
import { SkillsTagger } from '@/components/scenario-form/skills-tagger';
import { ExperienceLevelControl } from '@/components/scenario-form/experience-level';
import { EffortSliders } from '@/components/scenario-form/effort-sliders';
import { ConstraintToggles } from '@/components/scenario-form/constraint-toggles';
import { ValidationEngine } from '@/components/scenario-form/validation-engine';

function ScenarioFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isTemplate = searchParams.get('template') === 'career-switch';

  const { formData, setFormField } = useCareerStore();
  const { generate, isGenerating } = useScenario();

  const validation = useMemo(() => validateScenarioForm(formData), [formData]);

  const errorFields = useMemo(() => {
    const fields = new Set<string>();
    validation.errors.forEach((e) => fields.add(e.field));
    return fields;
  }, [validation.errors]);

  const handleSubmit = useCallback(async () => {
    if (!validation.isValid) return;
    await generate();
    router.push('/visualizer');
  }, [validation.isValid, generate, router]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors mb-4"
        >
          <ArrowLeft size={14} />
          Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-text-primary mb-1">
          {isTemplate ? 'Career Switch Scenario' : 'New Scenario'}
        </h1>
        <p className="text-sm text-text-secondary">
          Tentukan target, skill, timeline, dan constraint untuk memulai simulasi jalur karir.
        </p>
      </motion.header>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Career Target */}
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-base font-semibold text-text-primary">Target & Domain</h2>

          <CareerTarget
            value={formData.careerTarget}
            onChange={(v) => setFormField('careerTarget', v)}
            hasError={errorFields.has('careerTarget')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TimelineSelect
              value={formData.targetTimeline}
              onChange={(v) => setFormField('targetTimeline', v)}
              hasError={errorFields.has('targetTimeline')}
            />
            <IndustrySelect
              value={formData.industry}
              onChange={(v) => setFormField('industry', v)}
              hasError={errorFields.has('industry')}
            />
          </div>
        </div>

        {/* Skills & Experience */}
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-base font-semibold text-text-primary">Skills & Experience</h2>

          <SkillsTagger
            value={formData.currentSkills}
            onChange={(v) => setFormField('currentSkills', v)}
            hasError={errorFields.has('currentSkills')}
          />

          <ExperienceLevelControl
            value={formData.experienceLevel}
            onChange={(v) => setFormField('experienceLevel', v)}
            hasError={errorFields.has('experienceLevel')}
          />
        </div>

        {/* Effort & Constraints */}
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-base font-semibold text-text-primary">Effort & Constraints</h2>

          <EffortSliders
            hoursPerWeek={formData.hoursPerWeek}
            monthsDuration={formData.monthsDuration}
            onHoursChange={(v) => setFormField('hoursPerWeek', v)}
            onMonthsChange={(v) => setFormField('monthsDuration', v)}
            hoursError={errorFields.has('hoursPerWeek')}
          />

          <ConstraintToggles
            fullTimeOnly={formData.fullTimeOnly}
            remoteOnly={formData.remoteOnly}
            includeCertifications={formData.includeCertifications}
            onFullTimeChange={(v) => setFormField('fullTimeOnly', v)}
            onRemoteChange={(v) => setFormField('remoteOnly', v)}
            onCertChange={(v) => setFormField('includeCertifications', v)}
            certError={errorFields.has('includeCertifications')}
          />
        </div>

        {/* Validation Errors */}
        <ValidationEngine errors={validation.errors} />

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={!validation.isValid || isGenerating}
          whileHover={validation.isValid ? { scale: 1.01 } : {}}
          whileTap={validation.isValid ? { scale: 0.99 } : {}}
          className={`
            w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5
            transition-all duration-300
            ${validation.isValid && !isGenerating
              ? 'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20 cursor-pointer'
              : 'bg-bg-elevated text-text-muted cursor-not-allowed'
            }
          `}
          id="generate-scenario-btn"
        >
          {isGenerating ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Generating Scenario...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Scenario
            </>
          )}
        </motion.button>
      </motion.form>
    </div>
  );
}

export default function ScenarioPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    }>
      <ScenarioFormContent />
    </Suspense>
  );
}
