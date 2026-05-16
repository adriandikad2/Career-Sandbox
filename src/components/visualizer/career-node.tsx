'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Info } from 'lucide-react';
import type { CareerNode } from '@/lib/types';

type CareerNodeData = CareerNode & { onInfoClick?: (id: string) => void };

function CareerNodeComponent({ data }: NodeProps) {
  const nodeData = data as unknown as CareerNodeData;
  const isHighConfidence = nodeData.confidence >= 70;
  const confidencePercent = `${nodeData.confidence}%`;

  return (
    <div
      className={`
        relative min-w-[200px] max-w-[260px] rounded-2xl p-4 transition-all duration-300
        ${isHighConfidence
          ? 'bg-confidence-high border-2 border-accent/30 shadow-lg shadow-accent/10'
          : 'bg-confidence-low border-2 border-dashed border-confidence-low-border opacity-80'
        }
        hover:scale-105 hover:shadow-xl hover:shadow-accent/15 cursor-pointer
      `}
      role="button"
      aria-label={`Career node: ${nodeData.label}, confidence ${confidencePercent}`}
      tabIndex={0}
    >
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-accent !border-2 !border-bg-primary"
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-text-primary leading-tight">
            {nodeData.label}
          </h3>
          {!isHighConfidence && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-warning/20 text-warning">
              {nodeData.label} ({confidencePercent})
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nodeData.onInfoClick?.(nodeData.id);
          }}
          className="w-7 h-7 rounded-lg bg-bg-elevated/80 flex items-center justify-center text-text-muted hover:text-accent hover:bg-accent/15 transition-all flex-shrink-0"
          aria-label={`Info: Kenapa AI merekomendasikan ${nodeData.label}?`}
        >
          <Info size={14} />
        </button>
      </div>

      {/* Description */}
      <p className="text-xs text-text-secondary leading-relaxed mb-2 line-clamp-2">
        {nodeData.description}
      </p>

      {/* Timeframe */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-text-muted font-medium px-2 py-0.5 rounded-md bg-bg-elevated">
          {nodeData.timeframe}
        </span>
        {isHighConfidence && (
          <span className="text-[10px] text-success font-semibold">
            {confidencePercent}
          </span>
        )}
      </div>

      {/* Skills chips */}
      {nodeData.skills && nodeData.skills.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {nodeData.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[9px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-accent !border-2 !border-bg-primary"
      />
    </div>
  );
}

export const CareerNodeType = memo(CareerNodeComponent);
