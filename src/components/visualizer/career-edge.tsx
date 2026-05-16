'use client';

import { memo } from 'react';
import { BaseEdge, getStraightPath, type EdgeProps } from '@xyflow/react';

function CareerEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps) {
  const confidence = (data?.confidence as number) ?? 100;
  const isHigh = confidence >= 70;

  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{
        stroke: isHigh ? '#e94560' : '#4a5568',
        strokeWidth: isHigh ? 2.5 : 1.5,
        strokeDasharray: isHigh ? 'none' : '6 4',
        opacity: isHigh ? 0.8 : 0.4,
      }}
    />
  );
}

export const CareerEdgeType = memo(CareerEdgeComponent);
