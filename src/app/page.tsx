import { TrackingCards, SavedPathsPreview } from '@/components/dashboard/tracking-cards';
import { ScenarioStarters } from '@/components/dashboard/scenario-starters';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Career Sandbox
        </h1>
        <p className="text-text-secondary text-base">
          Eksplorasi dan simulasi jalur pengembangan karir alternatif dengan bantuan AI.
        </p>
      </header>

      {/* Top: Tracking Cards */}
      <TrackingCards />

      {/* Saved Paths Preview */}
      <SavedPathsPreview />

      {/* Bottom: Scenario Starters */}
      <ScenarioStarters />
    </div>
  );
}
