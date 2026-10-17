"use client";

import { useEffect, useId, useMemo, useRef, useState, type HTMLAttributes } from "react";
import { AnimatePresence, motion, useAnimationControls, useInView, useReducedMotion } from "motion/react";
import { Button } from "../../button/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableScrollArea } from "../../table/table";
import { TooltipBox } from "../vendor/charts/tooltip/tooltip-box";
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

export function NetworkChart({ nodes, edges, categories, relations, caption, variant = "glow", reducedMotion = false, onNodeSelect, onKeyDown, className = "", ...attributes }: NetworkChartProps) {
  const instanceId = useId();
  const prefersReduced = useReducedMotion();
  const reduced = reducedMotion || !!prefersReduced;
  const model = useMemo(() => layoutNetwork(nodes, edges), [nodes, edges]);
  const [routing, setRouting] = useState(() => ({ model, anchor: model, variant, geometry: networkGeometry(model, variant) }));
  let currentRouting = routing;
  if (routing.model !== model || routing.variant !== variant) {
    const retained = variant === routing.variant && model.nodes.every(node => routing.anchor.nodes.some(old => old.id === node.id && old.x === node.x && old.y === node.y && old.label === node.label && old.category === node.category)) && model.edges.every(edge => routing.anchor.edges.some(old => old.id === edge.id && old.source === edge.source && old.target === edge.target && old.directed === edge.directed));
    // Keep the full graph's label positions and ports when the host filters unchanged data.
    currentRouting = { model, variant, anchor: retained ? routing.anchor : model, geometry: retained ? routing.geometry : networkGeometry(model, variant) };
    setRouting(currentRouting);
  }
  const geometry = useMemo(() => ({ ...currentRouting.geometry, nodes: currentRouting.geometry.nodes.filter(node => model.nodes.some(entry => entry.id === node.id)), edges: model.edges.map(edge => ({ ...edge, d: currentRouting.geometry.edges.find(entry => entry.id === edge.id)!.d })) }), [currentRouting, model]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);
  const [previewPoint, setPreviewPoint] = useState({ x: 0, y: 0 });
  const container = useRef<HTMLDivElement>(null);
  const graph = useRef<HTMLDivElement>(null);
  const observable = typeof IntersectionObserver !== "undefined";
  const inView = useInView(observable ? graph : { current: null }, { once: true, amount: .2, initial: !observable });
  const [narrow, setNarrow] = useState(false);
  const entered = reduced || inView;
  const [presentation, setPresentation] = useState({ geometry, variant });
  const presented = useRef(presentation);
  const [transitioning, setTransitioning] = useState(false);
  const routes = useAnimationControls();
  const pendingNodes = useRef(new Set<string>());
  const moving = useRef(false);
  const reconnect = useRef(() => {});
  useEffect(() => {
    const previous = presented.current;
    const moved = previous.variant !== variant || geometry.nodes.some(node => { const old = previous.geometry.nodes.find(entry => entry.id === node.id); return old && (old.x !== node.x || old.y !== node.y); }) || geometry.edges.some(edge => { const old = previous.geometry.edges.find(entry => entry.id === edge.id); return old && old.d !== edge.d; });
    const commit = () => { presented.current = { geometry, variant }; setPresentation(presented.current); };
    let cancelled = false;
    moving.current = false;
    reconnect.current = () => { if (!cancelled) { moving.current = false; setTransitioning(false); void routes.start({ opacity: 1 }, { duration: reduced ? 0 : .18 }); } };
    setHoveredId(null); setHoveredEdgeId(null);
    if (reduced || !inView || narrow || !moved && !transitioning) { pendingNodes.current.clear(); commit(); routes.set({ opacity: 1 }); setTransitioning(false); return; }
    // Await the actual fade and node completion, so busy frames cannot reconnect early.
    setTransitioning(true);
    void routes.start({ opacity: 0 }, { duration: .12, ease: "easeOut" }).then(() => {
      if (cancelled) return;
      pendingNodes.current = new Set(geometry.nodes.filter(node => { const old = presented.current.geometry.nodes.find(entry => entry.id === node.id); return old && (old.x !== node.x || old.y !== node.y || pendingNodes.current.has(node.id)); }).map(node => node.id));
      moving.current = true;
      commit();
      if (!pendingNodes.current.size) reconnect.current();
    });
    return () => { cancelled = true; routes.stop(); };
  }, [geometry, variant, reduced, inView, narrow, routes]);
  const categoryIndex = new Map(categories.map((entry, index) => [entry.id, index]));
  const relationIndex = new Map(relations.map((entry, index) => [entry.id, index]));
  if (variant !== "glow" && variant !== "structured") throw new Error("网络图样式无效");
  if (categoryIndex.size !== categories.length || categories.some(entry => !entry.id.trim() || !entry.label.trim()) || nodes.some(node => !categoryIndex.has(node.category))) throw new Error("网络节点类别配置缺失或重复");
  if (relationIndex.size !== relations.length || relations.some(entry => !entry.id.trim() || !entry.label.trim() || entry.lineStyle !== undefined && !["solid", "dashed", "dotted"].includes(entry.lineStyle)) || edges.some(edge => !relationIndex.has(edge.relation))) throw new Error("网络边关系配置缺失、重复或线型无效");
  const selected = nodes.find(node => node.id === selectedId);
  const activeEdge = edges.find(edge => edge.id === hoveredEdgeId);
  const activeId = activeEdge ? undefined : [hoveredId, focusedId, selectedId].find(id => id && nodes.some(node => node.id === id));
  const adjacent = new Set(activeEdge ? [activeEdge.source, activeEdge.target] : activeId ? [activeId, ...edges.filter(edge => edge.source === activeId || edge.target === activeId).flatMap(edge => [edge.source, edge.target])] : []);
  const hasActive = !!activeId || !!activeEdge;
  const highlightedEdge = (edge: NetworkEdge) => activeEdge ? edge.id === activeEdge.id : !activeId || edge.source === activeId || edge.target === activeId;
  const previewNode = nodes.find(node => node.id === (hoveredId ?? focusedId));
  const preview = activeEdge ?? previewNode;
  const transition = { duration: reduced ? 0 : .18, ease: "easeOut" as const };
  const geometryTransition = { duration: reduced || !inView || narrow ? 0 : .3, ease: [.22, 1, .36, 1] as const };
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
  function clear() { setHoveredId(null); setHoveredEdgeId(null); setFocusedId(null); if (selectedId) select(null); }
  function pointAt(element: Element, clientX?: number, clientY?: number) {
    const root = container.current!.getBoundingClientRect(), target = element.getBoundingClientRect();
    setPreviewPoint({ x: (clientX || target.x + target.width / 2) - root.x, y: (clientY || target.y + target.height / 2) - root.y });
  }
  const nodeName = (id: string) => nodes.find(node => node.id === id)!.label;
  const shown = reduced ? { geometry, variant } : presentation;
  return <div {...attributes} ref={container} className={`rain-chart rain-network ${className}`} data-rain-id="ui-chart-network" data-variant={shown.variant} data-slot="root" data-state={nodes.length ? "ready" : "empty"} data-narrow={narrow} data-reduced-motion={reduced} data-entered={entered} data-transitioning={transitioning} onKeyDown={event => { onKeyDown?.(event); if (!event.defaultPrevented && event.key === "Escape") clear(); }}>
    <h3>{caption}</h3>
    {!nodes.length ? <p role="status">暂无关系数据</p> : <>
      <div className="rain-network__legends">
        <div role="group" aria-label="节点类别">{categories.map((entry, index) => <span key={entry.id}><svg width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="5" fill={color(entry, index)} /></svg>{entry.label}</span>)}</div>
        <div role="group" aria-label="关系类型">{relations.map((entry, index) => <span key={entry.id}><svg width="28" height="16" aria-hidden="true"><path d="M1,8 H27" stroke={color(entry, index)} strokeWidth="2" strokeDasharray={dash(entry, index)} /></svg>{entry.label}</span>)}</div>
      </div>
      <div ref={graph} className="rain-network__scroll" role="region" aria-label={`${caption}关系图`}>
        <svg className="rain-network__svg" viewBox={`0 0 ${geometry.width} ${geometry.height}`} aria-hidden="true" onClick={event => { if (event.target === event.currentTarget) clear(); }}>
          <defs>
            {categories.map((entry, index) => <radialGradient key={entry.id} id={`${instanceId}-node-${index}`}><stop offset="0%" stopColor={color(entry, index)} stopOpacity="1" /><stop offset="25%" stopColor={color(entry, index)} stopOpacity=".85" /><stop offset="70%" stopColor={color(entry, index)} stopOpacity=".28" /><stop offset="100%" stopColor={color(entry, index)} stopOpacity="0" /></radialGradient>)}
            {relations.map((entry, index) => <marker key={entry.id} id={`${instanceId}-arrow-${index}`} viewBox="0 0 5 5.7735" refX="5" refY="2.88675" markerWidth="5" markerHeight="5.7735" markerUnits="strokeWidth" orient="auto"><path d="M0,0 L5,2.88675 L0,5.7735 Z" fill={color(entry, index)} /></marker>)}
          </defs>
          <motion.g animate={routes} initial={{ opacity: 1 }}><AnimatePresence initial={false}>{shown.geometry.edges.map(edge => {
            const index = relationIndex.get(edge.relation)!, entry = relations[index]!;
            if (!entry) return null;
            const highlighted = highlightedEdge(edge);
            return <motion.g key={edge.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}>
              <motion.path data-network-edge={edge.id} data-highlighted={highlighted} d={edge.d} fill="none" stroke={color(entry, index)} strokeDasharray={dash(entry, index)} strokeLinecap="round" markerEnd={edge.directed ? `url(#${instanceId}-arrow-${index})` : undefined} initial={false} animate={{ opacity: !entered ? 0 : highlighted ? .85 : .13, strokeWidth: hasActive && highlighted ? 1.55 : 1.15 }} transition={{ ...transition, opacity: !inView && !reduced ? { duration: 0 } : { ...transition, delay: entered && !hasActive && !transitioning ? .16 : 0 } }} />
              <path data-network-edge-hit={edge.id} d={edge.d} fill="none" stroke="transparent" strokeWidth="14" pointerEvents={!transitioning && entered && edges.some(item => item.id === edge.id) ? "stroke" : "none"} onMouseEnter={event => { setHoveredId(null); setHoveredEdgeId(edge.id); pointAt(event.currentTarget, event.clientX, event.clientY); }} onMouseLeave={() => setHoveredEdgeId(null)} />
            </motion.g>;
          })}</AnimatePresence></motion.g>
          <AnimatePresence initial={false}>{shown.geometry.nodes.map((node, order) => {
            const index = categoryIndex.get(node.category)!, entry = categories[index]!;
            if (!entry) return null;
            const present = nodes.some(entry => entry.id === node.id), highlighted = !hasActive || adjacent.has(node.id);
            const hitX = Math.min(node.body.x, node.labelBox.x) - 6, hitY = Math.min(node.body.y, node.labelBox.y) - 6;
            return <motion.g key={node.id} data-network-node={node.id} data-x={node.x} data-y={node.y} data-highlighted={highlighted} data-selected={selectedId === node.id} initial={{ x: node.x, y: node.y, opacity: 0 }} animate={{ x: node.x, y: node.y, opacity: !entered ? 0 : highlighted ? 1 : .3 }} exit={{ opacity: 0 }} transition={{ ...transition, x: geometryTransition, y: geometryTransition, opacity: { ...transition, delay: !hasActive && !transitioning ? Math.min(order * .012, .1) : 0 } }} onAnimationComplete={() => { const target = presented.current.geometry.nodes.find(entry => entry.id === node.id); if (target?.x === node.x && target.y === node.y) pendingNodes.current.delete(node.id); if (moving.current && !pendingNodes.current.size) reconnect.current(); }} pointerEvents={present && entered && !transitioning ? "auto" : "none"} onMouseEnter={event => { setHoveredEdgeId(null); setHoveredId(node.id); pointAt(event.currentTarget); }} onMouseLeave={() => setHoveredId(null)} onClick={() => { if (present) select(node); }}>
              <rect data-slot="node-hit" x={hitX - node.x} y={hitY - node.y} width={Math.max(node.body.x + node.body.width, node.labelBox.x + node.labelBox.width) + 6 - hitX} height={Math.max(node.body.y + node.body.height, node.labelBox.y + node.labelBox.height) + 6 - hitY} fill="transparent" />
              {shown.variant === "structured" ? <>
                <motion.rect data-slot="node-core" x={node.body.x - node.x} y={node.body.y - node.y} width={node.body.width} height={node.body.height} rx="6" fill="var(--chart-tooltip-background)" animate={{ stroke: selectedId === node.id || hoveredId === node.id || focusedId === node.id ? color(entry, index) : "var(--chart-marker-border)" }} transition={transition} />
                <circle cx={node.body.x - node.x + 16} r="4" fill={color(entry, index)} />
              </> : <>
                <motion.circle data-slot="node-core" r={geometry.radius} fill={`url(#${instanceId}-node-${index})`} animate={{ scale: hoveredId === node.id || focusedId === node.id ? 1.08 : 1 }} transition={transition} />
                <motion.circle r={geometry.radius + 4} fill="none" stroke={color(entry, index)} initial={false} animate={{ opacity: selectedId === node.id ? .6 : 0 }} transition={transition} />
              </>}
              <text data-slot="node-label" x={node.textX - node.x} y={node.textY - node.y} textAnchor="middle" fill="currentColor">{node.lines.map((line, index) => <tspan key={index} x={node.textX - node.x} dy={index ? 20 : 0}>{line}</tspan>)}</text>
            </motion.g>;
          })}</AnimatePresence>
        </svg>
      </div>
      <ol className="rain-network__relations" aria-label={`${caption}全部关系`}>{edges.map(edge => <li key={edge.id} data-network-relation={edge.id} data-highlighted={highlightedEdge(edge)}>{nodeName(edge.source)} {edge.directed ? "→" : "↔"} {nodeName(edge.target)} · {relations[relationIndex.get(edge.relation)!]!.label}</li>)}</ol>
      <TooltipBox x={previewPoint.x} y={previewPoint.y} visible={!!preview && !transitioning} containerRef={container} containerWidth={container.current?.clientWidth ?? 960} containerHeight={container.current?.clientHeight ?? 560} animate={!reduced} entrance={!reduced}>
        <div id={`${instanceId}-preview`} role="tooltip" className="rain-network__preview">
          {activeEdge ? <><strong>{nodeName(activeEdge.source)} {activeEdge.directed ? "→" : "↔"} {nodeName(activeEdge.target)}</strong><p>{relations[relationIndex.get(activeEdge.relation)!]!.label} · {activeEdge.directed ? "有向关系" : "无向关系"}</p><p>读数：{activeEdge.value ?? "未提供"}</p></> : previewNode && <><strong>{previewNode.label}</strong><p>{categories[categoryIndex.get(previewNode.category)!]!.label} · {edges.filter(edge => edge.source === previewNode.id || edge.target === previewNode.id).length} 条关联</p><p>{selectedId === previewNode.id ? "已固定此节点详情" : "点击固定关联详情"}</p></>}
        </div>
      </TooltipBox>
      <div className="rain-network__detail-slot">{selected ? <div className="rain-network__detail" role="region" aria-label="节点详情" data-selected-node={selected.id}>
        <div><h4>{selected.label}</h4><p>{categories[categoryIndex.get(selected.category)!]!.label} · 已固定</p><Button size="small" variant="secondary" onClick={clear}>清除节点选择</Button></div>
        {edges.some(edge => edge.source === selected.id || edge.target === selected.id) ? <ul>{edges.filter(edge => edge.source === selected.id || edge.target === selected.id).map(edge => <li key={edge.id}>{nodeName(edge.source)} {edge.directed ? "→" : "↔"} {nodeName(edge.target)} · {relations[relationIndex.get(edge.relation)!]!.label}{edge.value !== undefined ? ` · ${edge.value}` : ""}</li>)}</ul> : <p>暂无相邻关系</p>}
      </div> : <p className="rain-network__detail-empty">选择节点，在此查看关联详情。</p>}</div>
      <div className="rain-network__nodes" role="group" aria-label="选择节点">{nodes.map(node => <Button key={node.id} size="small" variant="secondary" data-network-select={node.id} aria-label={`${node.label}，${categories[categoryIndex.get(node.category)!]!.label}`} aria-describedby={previewNode?.id === node.id && !activeEdge && !transitioning ? `${instanceId}-preview` : undefined} aria-pressed={selectedId === node.id} onFocus={event => { setHoveredId(null); setHoveredEdgeId(null); setFocusedId(node.id); pointAt(event.currentTarget); }} onBlur={() => setFocusedId(null)} onClick={() => select(node)}>{node.label}</Button>)}</div>
      <details className="rain-network__data"><summary>查看精确数据 · {caption}</summary>
        <TableScrollArea aria-label={`${caption}节点数据，可横向滚动`}><Table aria-label={`${caption} · 节点精确数据`}><TableCaption>{caption} · 节点精确数据</TableCaption><TableHeader><TableRow><TableHead>节点</TableHead><TableHead>类别</TableHead><TableHead>ID</TableHead></TableRow></TableHeader><TableBody>{nodes.map(node => <TableRow key={node.id} data-network-node-row={node.id}><TableHead scope="row">{node.label}</TableHead><TableCell>{categories[categoryIndex.get(node.category)!]!.label}</TableCell><TableCell>{node.id}</TableCell></TableRow>)}</TableBody></Table></TableScrollArea>
        <TableScrollArea aria-label={`${caption}关系数据，可横向滚动`}><Table aria-label={`${caption} · 关系精确数据`}><TableCaption>{caption} · 关系精确数据</TableCaption><TableHeader><TableRow><TableHead>来源</TableHead><TableHead>目标</TableHead><TableHead>关系</TableHead><TableHead>方向</TableHead><TableHead>读数</TableHead></TableRow></TableHeader><TableBody>{edges.map(edge => <TableRow key={edge.id} data-network-edge-row={edge.id}><TableHead scope="row">{nodeName(edge.source)}</TableHead><TableCell>{nodeName(edge.target)}</TableCell><TableCell>{relations[relationIndex.get(edge.relation)!]!.label}</TableCell><TableCell>{edge.directed ? "有向" : "无向"}</TableCell><TableCell>{edge.value ?? "未提供"}</TableCell></TableRow>)}</TableBody></Table></TableScrollArea>
      </details>
    </>}
  </div>;
}
