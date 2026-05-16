'use client';

import { Clock, Calendar } from 'lucide-react';

interface EffortSlidersProps {
  hoursPerWeek: number;
  monthsDuration: number;
  onHoursChange: (val: number) => void;
  onMonthsChange: (val: number) => void;
  hoursError?: boolean;
}

export function EffortSliders({
  hoursPerWeek,
  monthsDuration,
  onHoursChange,
  onMonthsChange,
  hoursError,
}: EffortSlidersProps) {
  return (
    <div className="space-y-6">
      {/* Hours per week */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="hours-slider" className="flex items-center gap-2 text-sm font-medium text-text-secondary">
            <Clock size={14} />
            Jam per Minggu
          </label>
          <span className={`text-sm font-semibold ${hoursError ? 'text-warning' : 'text-accent'}`}>
            {hoursPerWeek} jam
          </span>
        </div>
        <input
          id="hours-slider"
          type="range"
          min={0}
          max={40}
          step={1}
          value={hoursPerWeek}
          onChange={(e) => onHoursChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer
            bg-bg-elevated [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent
            [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-accent/30
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-125
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent
            [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
          aria-label={`Hours per week: ${hoursPerWeek}`}
          style={{
            background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${(hoursPerWeek / 40) * 100}%, var(--bg-elevated) ${(hoursPerWeek / 40) * 100}%, var(--bg-elevated) 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-text-muted mt-1.5">
          <span>0 jam</span>
          <span>20 jam</span>
          <span>40 jam</span>
        </div>
      </div>

      {/* Duration in months */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="months-slider" className="flex items-center gap-2 text-sm font-medium text-text-secondary">
            <Calendar size={14} />
            Durasi Komitmen
          </label>
          <span className="text-sm font-semibold text-accent">
            {monthsDuration} bulan
          </span>
        </div>
        <input
          id="months-slider"
          type="range"
          min={1}
          max={60}
          step={1}
          value={monthsDuration}
          onChange={(e) => onMonthsChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer
            bg-bg-elevated [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent
            [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-accent/30
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-125
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent
            [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
          aria-label={`Duration: ${monthsDuration} months`}
          style={{
            background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${(monthsDuration / 60) * 100}%, var(--bg-elevated) ${(monthsDuration / 60) * 100}%, var(--bg-elevated) 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-text-muted mt-1.5">
          <span>1 bulan</span>
          <span>30 bulan</span>
          <span>60 bulan</span>
        </div>
      </div>
    </div>
  );
}
