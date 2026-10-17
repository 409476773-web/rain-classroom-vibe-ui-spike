"use client";

import { useEffect, useId, useMemo, useRef, useState, type HTMLAttributes } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "../../button/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableScrollArea } from "../../table/table";
import { DEFAULT_CHART_ENTER_TRANSITION } from "../vendor/charts/animation";
import { layoutNetwork, type NetworkNode, type NetworkEdge } from "./network-layout";
import { networkGeometry } from "./network-geometry";

export type NetworkCategory = { id: string; label: string; color?: string };
export type NetworkRelation = NetworkCategory & { lineStyle?: "solid" | "dashed" | "dotted" };
export type NetworkChartVariant = "glow" | "structured";
export interface NetworkChartProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  nodes: readonly NetworkNode[];
  edges: readonly NetworkEdge[];
  categories: readonly NetworkCategory[];
  relations: readonly NetworkRelation[];
  caption: string;
  variant?: NetworkChartVariant;
  reducedMotion?: boolean;
  onNodeSelect?: (node: NetworkNode | null) => void;
}

const color = (entry: NetworkCategory, index: number) => entry.color ?? `var(--chart-${index + 1})`;
const dash = (entry: NetworkRelation, index: number) => ({ solid: undefined, dashed: "5 4", dotted: "1 4" })[entry.lineStyle ?? (["solid", "dashed", "dotted"] as const)[index % 3]!];

export function NetworkChart({ nodes, edges, categories, relations, caption, variant = "glow", reducedMotion = false, onNodeSelect, className = "", ...attributes }: NetworkChartProps) {
  const instanceId = useId();
  const prefersReduced = useReducedMotion();
  const reduced = reducedMotion || !!prefersReduced;
  const model = useMemo(() => layoutNetwork(nodes, edges), [nodes, edges]);
  const geometry = useMemo(() => networkGeometry(model, variant), [model, variant]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const [narrow, setNarrow] = useState(false);
  const categoryIndex = new Map(categories.map((entry, index) => [entry.id, index]));
  const relationIndex = new Map(relations.map((entry, index) => [entry.id, index]));
  if (variant !== "glow" && variant !== "structured") throw new Error("网络图样式无效");
  if (categoryIndex.size !== categories.length || categories.some(entry => !entry.id.trim() || !entry.label.trim()) || nodes.some(node => !categoryIndex.has(node.category))) throw new Error("网络节点类别配置缺失或重复");
  if (relationIndex.size !== relations.length || relations.some(entry => !entry.id.trim() || !entry.label.trim() || entry.lineStyle !== undefined && !["solid", "dashed", "dotted"].includes(entry.lineStyle)) || edges.some(edge => !relationIndex.has(edge.relation))) throw new Error("网络边关系配置缺失、重复或线型无效");
  const selected = nodes.find(node => node.id === selectedId);
  const activeId = [hoveredId, focusedId, selectedId].find(id => id && nodes.some(node => node.id === id));
  const adjacent = new Set(activeId ? [activeId, ...edges.filter(edge => edge.source === activeId || edge.target === activeId).flatMap(edge => [edge.source, edge.target])] : []);
  const transition = { ...DEFAULT_CHART_ENTER_TRANSITION, duration: reduced ? 0 : .24 };
  // Card-face changes cannot safely interpolate through the card interior.
  const geometryTransition = variant === "structured" ? { duration: 0 } : transition;
  useEffect(() => {
    if (!container.current) return;
    setNarrow(container.current.clientWidth <= 620);
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(entries => setNarrow(entries[0]!.contentRect.width <= 620));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (selectedId && !selected) { setSelectedId(null); onNodeSelect?.(null); }
  }, [selectedId, selected, onNodeSelect]);

  function select(node: NetworkNode | null) {
    setSelectedId(node?.id ?? null);
    onNodeSelect?.(node ? nodes.find(entry => entry.id === node.id)! : null);
  }
  const nodeName = (id: string) => nodes.find(node => node.id === id)!.label;
  return <div {...attributes} ref={container} className={`rain-chart rain-network ${className}`} data-rain-id="ui-chart-network" data-variant={variant} data-slot="root" data-state={nodes.length ? "ready" : "empty"} data-narrow={narrow} data-reduced-motion={reduced}>
    <h3>{caption}</h3>
    {!nodes.length ? <p role="status">暂无关系数据</p> : <>
      <div className="rain-network__legends">
        <div role="group" aria-label="节点类别">{categories.map((entry, index) => <span key={entry.id}><svg width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="5" fill={color(entry, index)} /></svg>{entry.label}</span>)}</div>
        <div role="group" aria-label="关系类型">{relations.map((entry, index) => <span key={entry.id}><svg width="28" height="16" aria-hidden="true"><path d="M1,8 H27" stroke={color(entry, index)} strokeWidth="2" strokeDasharray={dash(entry, index)} /></svg>{entry.label}</span>)}</div>
      </div>
      <div className="rain-network__scroll" role="region" aria-label={`${caption}关系图`}>
        <svg className="rain-network__svg" viewBox={`0 0 ${geometry.width} ${geometry.height}`} aria-hidden="true">
          <defs>
            {categories.map((entry, index) => <radialGradient key={entry.id} id={`${instanceId}-node-${index}`}><stop offset="0%" stopColor={color(entry, index)} stopOpacity="1" /><stop offset="25%" stopColor={color(entry, index)} stopOpacity=".85" /><stop offset="70%" stopColor={color(entry, index)} stopOpacity=".28" /><stop offset="100%" stopColor={color(entry, index)} stopOpacity="0" /></radialGradient>)}
            {relations.map((entry, index) => <marker key={entry.id} id={`${instanceId}-arrow-${index}`} viewBox="0 0 5 5.7735" refX="5" refY="2.88675" markerWidth="5" markerHeight="5.7735" markerUnits="strokeWidth" orient="auto"><path d="M0,0 L5,2.88675 L0,5.7735 Z" fill={color(entry, index)} /></marker>)}
          </defs>
          {geometry.edges.map(edge => {
            const index = relationIndex.get(edge.relation)!, entry = relations[index]!;
            const highlighted = !activeId || edge.source === activeId || edge.target === activeId;
            return <motion.path key={`${variant}-${edge.id}`} data-network-edge={edge.id} data-highlighted={highlighted} fill="none" stroke={color(entry, index)} strokeWidth={activeId && highlighted ? 1.55 : 1.15} strokeDasharray={dash(entry, index)} strokeLinecap="round" markerEnd={edge.directed ? `url(#${instanceId}-arrow-${index})` : undefined} initial={false} animate={{ d: edge.d, opacity: highlighted ? .85 : .13 }} transition={{ ...transition, d: geometryTransition }} />;
          })}
          {geometry.nodes.map(node => {
            const index = categoryIndex.get(node.category)!, entry = categories[index]!;
            return <motion.g key={`${variant}-${node.id}`} data-network-node={node.id} data-x={node.x} data-y={node.y} data-highlighted={!activeId || adjacent.has(node.id)} data-selected={selectedId === node.id} initial={false} animate={{ x: node.x, y: node.y, opacity: !activeId || adjacent.has(node.id) ? 1 : .3 }} transition={{ ...transition, x: geometryTransition, y: geometryTransition }} onMouseEnter={() => setHoveredId(node.id)} onMouseLeave={() => setHoveredId(null)} onClick={() => select(node)}>
              <title>{nodes.find(entry => entry.id === node.id)!.label}，{entry.label}</title>
              {variant === "structured" ? <>
                <rect data-slot="node-core" x={node.body.x - node.x} y={node.body.y - node.y} width={node.body.width} height={node.body.height} rx="6" fill="var(--chart-tooltip-background)" stroke={selectedId === node.id ? color(entry, index) : "var(--chart-marker-border)"} />
                <circle cx={node.body.x - node.x + 16} r="4" fill={color(entry, index)} />
              </> : <>
                <circle data-slot="node-core" r={geometry.radius} fill={`url(#${instanceId}-node-${index})`} />
                {selectedId === node.id && <circle r={geometry.radius + 4} fill="none" stroke={color(entry, index)} strokeOpacity=".6" />}
              </>}
              <text data-slot="node-label" x={node.textX - node.x} y={node.textY - node.y} textAnchor="middle" fill="currentColor">{node.lines.map((line, index) => <tspan key={index} x={node.textX - node.x} dy={index ? 20 : 0}>{line}</tspan>)}</text>
            </motion.g>;
          })}
        </svg>
      </div>
      <ol className="rain-network__relations" aria-label={`${caption}全部关系`}>{edges.map(edge => <li key={edge.id} data-network-relation={edge.id} data-highlighted={!activeId || edge.source === activeId || edge.target === activeId}>{nodeName(edge.source)} {edge.directed ? "→" : "↔"} {nodeName(edge.target)} · {relations[relationIndex.get(edge.relation)!]!.label}</li>)}</ol>
      <div className="rain-network__nodes" role="group" aria-label="选择节点">{nodes.map(node => <Button key={node.id} size="small" variant="secondary" data-network-select={node.id} aria-label={`${node.label}，${categories[categoryIndex.get(node.category)!]!.label}`} aria-pressed={selectedId === node.id} onFocus={() => { setHoveredId(null); setFocusedId(node.id); }} onBlur={() => setFocusedId(null)} onClick={() => select(node)}>{node.label}</Button>)}</div>
      {selected && <div className="rain-network__detail" role="region" aria-label="节点详情" data-selected-node={selected.id}>
        <h4>{selected.label}</h4><p>{categories[categoryIndex.get(selected.category)!]!.label}</p>
        {edges.some(edge => edge.source === selected.id || edge.target === selected.id) ? <ul>{edges.filter(edge => edge.source === selected.id || edge.target === selected.id).map(edge => <li key={edge.id}>{nodeName(edge.source)} {edge.directed ? "→" : "↔"} {nodeName(edge.target)} · {relations[relationIndex.get(edge.relation)!]!.label}{edge.value !== undefined ? ` · ${edge.value}` : ""}</li>)}</ul> : <p>暂无相邻关系</p>}
        <Button size="small" variant="secondary" onClick={() => select(null)}>清除节点选择</Button>
      </div>}
      <details className="rain-network__data"><summary>查看精确数据 · {caption}</summary>
        <TableScrollArea aria-label={`${caption}节点数据，可横向滚动`}><Table aria-label={`${caption} · 节点精确数据`}><TableCaption>{caption} · 节点精确数据</TableCaption><TableHeader><TableRow><TableHead>节点</TableHead><TableHead>类别</TableHead><TableHead>ID</TableHead></TableRow></TableHeader><TableBody>{nodes.map(node => <TableRow key={node.id} data-network-node-row={node.id}><TableHead scope="row">{node.label}</TableHead><TableCell>{categories[categoryIndex.get(node.category)!]!.label}</TableCell><TableCell>{node.id}</TableCell></TableRow>)}</TableBody></Table></TableScrollArea>
        <TableScrollArea aria-label={`${caption}关系数据，可横向滚动`}><Table aria-label={`${caption} · 关系精确数据`}><TableCaption>{caption} · 关系精确数据</TableCaption><TableHeader><TableRow><TableHead>来源</TableHead><TableHead>目标</TableHead><TableHead>关系</TableHead><TableHead>方向</TableHead><TableHead>读数</TableHead></TableRow></TableHeader><TableBody>{edges.map(edge => <TableRow key={edge.id} data-network-edge-row={edge.id}><TableHead scope="row">{nodeName(edge.source)}</TableHead><TableCell>{nodeName(edge.target)}</TableCell><TableCell>{relations[relationIndex.get(edge.relation)!]!.label}</TableCell><TableCell>{edge.directed ? "有向" : "无向"}</TableCell><TableCell>{edge.value ?? "未提供"}</TableCell></TableRow>)}</TableBody></Table></TableScrollArea>
      </details>
    </>}
  </div>;
}
