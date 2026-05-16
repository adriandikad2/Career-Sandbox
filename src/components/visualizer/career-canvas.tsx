'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CareerNodeType } from './career-node';
import { CareerEdgeType } from './career-edge';
import { TradeoffPanel } from './tradeoff-panel';
import { NodeTooltip } from './node-tooltip';
import type { CareerNode as CareerNodeData, TradeoffItem } from '@/lib/types';

// ─── Define node/edge types OUTSIDE the component ──────
const nodeTypes = { careerNode: CareerNodeType };
const edgeTypes = { careerEdge: CareerEdgeType };

interface CareerCanvasProps {
  careerNodes: CareerNodeData[];
  careerEdges: { id: string; source: string; target: string; confidence: number; label?: string }[];
  tradeoffs: TradeoffItem[];
  isOffline?: boolean;
}

export function CareerCanvas({
  careerNodes,
  careerEdges,
  tradeoffs,
  isOffline,
}: CareerCanvasProps) {
  const [selectedTradeoff, setSelectedTradeoff] = useState<TradeoffItem | null>(null);
  const [tooltipState, setTooltipState] = useState<{
    isOpen: boolean;
    label: string;
    reasoning: string;
  }>({ isOpen: false, label: '', reasoning: '' });

  // Transform career data into React Flow format
  const initialNodes: Node[] = useMemo(
    () =>
      careerNodes.map((n) => ({
        id: n.id,
        type: 'careerNode',
        position: n.position,
        data: {
          ...n,
          onInfoClick: (id: string) => {
            const node = careerNodes.find((cn) => cn.id === id);
            if (node) {
              setTooltipState({
                isOpen: true,
                label: node.label,
                reasoning: node.reasoning,
              });
            }
          },
        },
      })),
    [careerNodes]
  );

  const initialEdges: Edge[] = useMemo(
    () =>
      careerEdges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        type: 'careerEdge',
        data: { confidence: e.confidence },
        label: e.label,
      })),
    [careerEdges]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const tradeoff = tradeoffs.find((t) => t.nodeId === node.id);
      if (tradeoff) {
        setSelectedTradeoff(tradeoff);
      }
    },
    [tradeoffs]
  );

  return (
    <div
      className={`relative w-full h-full ${isOffline ? 'opacity-60' : ''}`}
      style={{ minHeight: '600px' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={2}
        attributionPosition="bottom-left"
        className="bg-bg-primary"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="rgba(255,255,255,0.04)"
        />
        <Controls
          showInteractive={false}
          position="bottom-left"
        />
        <MiniMap
          nodeColor={(node) => {
            const confidence = (node.data as unknown as CareerNodeData)?.confidence ?? 100;
            return confidence >= 70 ? '#e94560' : '#4a5568';
          }}
          maskColor="rgba(26, 26, 46, 0.85)"
          position="bottom-right"
          pannable
          zoomable
        />
      </ReactFlow>

      {/* Trade-off Panel */}
      <TradeoffPanel
        tradeoff={selectedTradeoff}
        onClose={() => setSelectedTradeoff(null)}
      />

      {/* Node Tooltip */}
      <NodeTooltip
        isOpen={tooltipState.isOpen}
        nodeLabel={tooltipState.label}
        reasoning={tooltipState.reasoning}
        onClose={() => setTooltipState((s) => ({ ...s, isOpen: false }))}
      />
    </div>
  );
}
