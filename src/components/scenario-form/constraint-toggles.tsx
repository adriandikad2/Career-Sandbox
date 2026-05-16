'use client';

import { Briefcase, Wifi, Award } from 'lucide-react';

interface ConstraintTogglesProps {
  fullTimeOnly: boolean;
  remoteOnly: boolean;
  includeCertifications: boolean;
  onFullTimeChange: (val: boolean) => void;
  onRemoteChange: (val: boolean) => void;
  onCertChange: (val: boolean) => void;
  certError?: boolean;
}

interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  icon: React.ReactNode;
  id: string;
  hasError?: boolean;
}

function Toggle({ checked, onChange, label, icon, id, hasError }: ToggleProps) {
  return (
    <label
      htmlFor={id}
      className={`
        flex items-center gap-3 px-4 py-3.5 rounded-xl bg-bg-elevated border cursor-pointer
        transition-all duration-200 select-none
        ${hasError ? 'border-warning ring-1 ring-warning/40' : checked ? 'border-accent/40' : 'border-border-subtle hover:border-border-active'}
      `}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`
          w-9 h-5 rounded-full relative transition-colors duration-200 flex-shrink-0
          ${checked ? 'bg-accent' : 'bg-border-subtle'}
        `}
      >
        <div
          className={`
            absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow-sm
            ${checked ? 'translate-x-[18px]' : 'translate-x-0.5'}
          `}
        />
      </div>
      <span className="text-text-muted">{icon}</span>
      <span className="text-sm text-text-primary font-medium">{label}</span>
    </label>
  );
}

export function ConstraintToggles({
  fullTimeOnly,
  remoteOnly,
  includeCertifications,
  onFullTimeChange,
  onRemoteChange,
  onCertChange,
  certError,
}: ConstraintTogglesProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-3">
        External Constraints
      </label>
      <div className="space-y-3">
        <Toggle
          id="full-time-toggle"
          checked={fullTimeOnly}
          onChange={onFullTimeChange}
          label="Full-time roles only"
          icon={<Briefcase size={16} />}
        />
        <Toggle
          id="remote-toggle"
          checked={remoteOnly}
          onChange={onRemoteChange}
          label="Remote only"
          icon={<Wifi size={16} />}
        />
        <Toggle
          id="cert-toggle"
          checked={includeCertifications}
          onChange={onCertChange}
          label="Include certifications"
          icon={<Award size={16} />}
          hasError={certError}
        />
      </div>
    </div>
  );
}
