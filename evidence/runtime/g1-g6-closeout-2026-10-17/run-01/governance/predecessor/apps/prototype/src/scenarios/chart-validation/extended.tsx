import { useMemo, useState } from "react";
import type { G2Spec } from "@antv/g2";
import { Button } from "@rain-next/ui";
import { type Appearance, DataDisclosure, G2Plot, chartTheme, paletteColors } from "./shared";

// Local P05 / P07 / P08 experiments. These values are source recipes, not Tokens.
const MATRIX_COLORS = ["#F5F4FF", "#DFE1FF", "#C4C9FF", "#A1A9FF", "#7C7DFD", "#5F55F7", "#4A31D1"];
const MATRIX_STOPS = [0, 0.9, 1.8, 3, 4.2, 5.1, 6];
const MATRIX_TITLES = ["概念辨识", "原理理解", "方法应用", "问题分析", "方案评价", "综合创造", "数据读取", "推理论证", "协作表达", "迁移应用", "实验探究", "自主反思"];
type MatrixDatum = { id: string; course: string; outcome: string; value: number | null; radius: number };

const FLOW_NODES = [
  { id: "source-0", name: "课堂讲授", category: 0 },
  { id: "source-1", name: "课前预习", category: 1 },
  { id: "source-2", name: "互动讨论", category: 2 },
  { id: "source-3", name: "课后练习", category: 3 },
  { id: "target-0", name: "概念理解", category: 0 },
  { id: "target-1", name: "方法应用", category: 1 },
  { id: "target-2", name: "分析推理", category: 2 },
  { id: "target-3", name: "迁移创造", category: 3 },
];
const FLOW_LINKS = [
  { source: "source-0", target: "target-0", value: 24 },
  { source: "source-0", target: "target-1", value: 12 },
  { source: "source-1", target: "target-0", value: 16 },
  { source: "source-1", target: "target-2", value: 8 },
  { source: "source-2", target: "target-1", value: 11 },
  { source: "source-2", target: "target-2", value: 18 },
  { source: "source-2", target: "target-3", value: 7 },
  { source: "source-3", target: "target-1", value: 10 },
  { source: "source-3", target: "target-3", value: 20 },
];
type FlowNode = (typeof FLOW_NODES)[number];
type LaidOutLink = { source: FlowNode; target: FlowNode; value: number };
const flowId = (link: { source: string; target: string }) => `${link.source}>${link.target}`;
const flowName = (id: string) => FLOW_NODES.find(node => node.id === id)?.name ?? id;

const NETWORK_NODES = [
  { id: "concept", name: "基础概念", category: 0, x: 0.16, y: 0.78 },
  { id: "principle", name: "核心原理", category: 0, x: 0.49, y: 0.86 },
  { id: "model", name: "概念模型", category: 0, x: 0.82, y: 0.75 },
  { id: "method", name: "研究方法", category: 1, x: 0.31, y: 0.53 },
  { id: "analysis", name: "数据分析", category: 1, x: 0.65, y: 0.49 },
  { id: "experiment", name: "实验设计", category: 1, x: 0.14, y: 0.23 },
  { id: "case", name: "案例应用", category: 2, x: 0.49, y: 0.19 },
  { id: "transfer", name: "迁移应用", category: 2, x: 0.84, y: 0.24 },
  { id: "project", name: "综合项目", category: 2, x: 0.83, y: 0.49 },
];
type NetworkNode = (typeof NETWORK_NODES)[number];
type Relation = "prerequisite" | "similar" | "application";
const RELATIONS: { kind: Relation; label: string; color: string; dash: number[] }[] = [
  { kind: "prerequisite", label: "先修关系", color: "#923FFF", dash: [] },
  { kind: "similar", label: "相似概念", color: "#2554FE", dash: [4, 4] },
  { kind: "application", label: "应用关系", color: "#F59A1A", dash: [4, 4] },
];
const NETWORK_LINKS: { source: string; target: string; kind: Relation }[] = [
  { source: "concept", target: "principle", kind: "prerequisite" },
  { source: "principle", target: "model", kind: "prerequisite" },
  { source: "concept", target: "method", kind: "prerequisite" },
  { source: "method", target: "analysis", kind: "prerequisite" },
  { source: "method", target: "experiment", kind: "application" },
  { source: "analysis", target: "case", kind: "application" },
  { source: "model", target: "project", kind: "application" },
  { source: "case", target: "transfer", kind: "similar" },
  { source: "transfer", target: "project", kind: "similar" },
  { source: "principle", target: "analysis", kind: "similar" },
];

function MatrixSample({ appearance }: { appearance: Appearance }) {
  const [mode, setMode] = useState<"heat" | "bubble">("heat");
  const [dimension, setDimension] = useState<6 | 12>(6);
  const courses = useMemo(() => Array.from({ length: dimension }, (_, index) => `课程 ${String(index + 1).padStart(2, "0")}`), [dimension]);
  const outcomes = MATRIX_TITLES.slice(0, dimension);
  const data = useMemo<MatrixDatum[]>(() => courses.flatMap((course, row) => MATRIX_TITLES.slice(0, dimension).map((outcome, column) => {
    const missing = (row === 1 && column === 3) || (row === 4 && column === 1);
    const value = missing ? null : row === 0 && column === 1 ? 0 : (row * 3 + column * 5 + (row * column) % 4 + appearance.revision) % 7;
    return { id: `course-${row}:outcome-${column}`, course, outcome, value, radius: value === null ? 0 : (dimension === 6 ? 17 : 15) * Math.sqrt(value / 6) };
  })), [courses, dimension, appearance.revision]);
  const options = useMemo<G2Spec>(() => {
    const present = data.filter(datum => datum.value !== null);
    const missing = data.filter(datum => datum.value === null);
    return {
      type: "view", theme: chartTheme(), paddingLeft: 72, paddingRight: 18, paddingTop: 16, paddingBottom: 62,
      scale: {
        x: { type: "band", domain: MATRIX_TITLES.slice(0, dimension), padding: 0.06 },
        y: { type: "band", domain: courses, padding: 0.06 },
        color: { type: "linear", domain: MATRIX_STOPS, range: MATRIX_COLORS },
        size: { type: "identity" },
      },
      axis: { x: { title: false, labelAutoHide: false, labelFontSize: 11, labelTransform: [{ type: "rotate", optionalAngles: [0] }] }, y: { title: false, labelAutoHide: false } },
      legend: false,
      interaction: { tooltip: { shared: false }, elementHighlight: { background: true } },
      children: [
        { type: "cell", data: mode === "heat" ? present : data, encode: { x: "outcome", y: "course", ...(mode === "heat" ? { color: "value" } : {}) },
          style: { ...(mode === "bubble" ? { fill: "#F5F7FC" } : {}), stroke: "white", lineWidth: 2, radius: 2 },
          tooltip: { title: "course", items: [{ field: "outcome", name: "目标" }, { field: "value", name: "强度" }] }, animate: appearance.motion ? undefined : false },
        ...(mode === "bubble" ? [
          { type: "point" as const, data: present.filter(datum => Number(datum.value) > 0), encode: { x: "outcome", y: "course", color: "value", size: "radius", shape: "point" },
            style: { stroke: "white", lineWidth: 1 }, tooltip: { title: "course", items: [{ field: "outcome", name: "目标" }, { field: "value", name: "强度" }] }, animate: appearance.motion ? undefined : false },
          { type: "point" as const, data: present.filter(datum => datum.value === 0), encode: { x: "outcome", y: "course", size: 3.5, shape: "point" },
            style: { fill: "#CCD2E1", r: 3.5 }, tooltip: { title: "course", items: [{ field: "outcome", name: "目标" }, { field: "value", name: "强度" }] }, animate: false as const },
        ] : [
          { type: "text" as const, data: present, encode: { x: "outcome", y: "course", text: "value" },
            style: { fill: (datum: MatrixDatum) => Number(datum.value) >= 4 ? "#FFFFFF" : "#4C4B69", fontSize: dimension === 6 ? 12 : 10, textAlign: "center", textBaseline: "middle" }, tooltip: false as const, animate: false as const },
        ]),
        { type: "cell", data: missing, encode: { x: "outcome", y: "course" }, style: { fill: "#EEF0F4", stroke: "white", lineWidth: 2, radius: 2 }, tooltip: false, animate: false },
        { type: "text", data: missing, encode: { x: "outcome", y: "course", text: () => "—" }, style: { fill: "#7E8595", fontSize: 13, textAlign: "center", textBaseline: "middle" }, tooltip: false, animate: false },
      ],
    };
  }, [data, mode, dimension, courses, appearance.motion]);
  return <section className="chart-sample sample-wide" aria-labelledby="matrix-sample-title">
    <header className="chart-sample-heading"><div><p className="chart-eyebrow">05 · 强度与分布</p><h2 id="matrix-sample-title">课程与学习目标</h2></div><span className="chart-recipe">P05 · 连续色阶</span></header>
    <div className="chart-controls">
      <div><Button variant={mode === "heat" ? "secondary" : "text"} size="small" aria-pressed={mode === "heat"} onClick={() => setMode("heat")}>热力矩阵</Button><Button variant={mode === "bubble" ? "secondary" : "text"} size="small" aria-pressed={mode === "bubble"} onClick={() => setMode("bubble")}>气泡矩阵</Button></div>
      <div><Button variant={dimension === 6 ? "secondary" : "text"} size="small" aria-pressed={dimension === 6} onClick={() => setDimension(6)}>6 × 6</Button><Button variant={dimension === 12 ? "secondary" : "text"} size="small" aria-pressed={dimension === 12} onClick={() => setDimension(12)}>12 × 12</Button></div>
      <span className="chart-caption">低 {MATRIX_COLORS.map((color, index) => <span key={color} title={`强度 ${MATRIX_STOPS[index]}`} aria-hidden="true" style={{ display: "inline-block", background: color, width: 18, height: 8, marginInline: 1 }} />)} 高 · 0–6</span>
    </div>
    <div style={{ overflowX: "auto", maxWidth: "100%" }} tabIndex={0} aria-label="矩阵横向滚动区域">
      <div style={{ minWidth: dimension === 6 ? 610 : 890 }}><G2Plot id="matrix" label={`${dimension} 行、${dimension} 列的${mode === "heat" ? "热力" : "气泡"}矩阵。数值从 0 到 6，灰色破折号表示缺测。`} options={options} height={dimension === 6 ? 350 : 570} /></div>
    </div>
    <p className="chart-note">{mode === "heat" ? "每格保留精确数值。" : "气泡面积与数值成正比；小灰点单独表示零值。"}灰色「—」为缺测。连续色阶保持固定，窄屏可横向滚动。</p>
    <DataDisclosure headers={["课程", ...outcomes]} rows={courses.map(course => [course, ...data.filter(datum => datum.course === course).map(datum => datum.value ?? "缺测")])} />
  </section>;
}

function SankeySample({ appearance }: { appearance: Appearance }) {
  const [selected, setSelected] = useState("source-2>target-2");
  const colors = paletteColors(appearance);
  const data = useMemo(() => ({ nodes: FLOW_NODES, links: FLOW_LINKS.map((link, index) => ({ ...link, value: link.value + (index === 5 ? appearance.revision * 2 : 0) })) }), [appearance.revision]);
  const current = data.links.find(link => flowId(link) === selected);
  const options = useMemo<G2Spec>(() => ({
    type: "sankey", theme: chartTheme(), data: { type: "inline", value: data }, paddingLeft: 8, paddingRight: 8, paddingTop: 24, paddingBottom: 16,
    layout: { nodeSort: null, nodeAlign: "justify", nodeWidth: 0.018, nodePadding: 0.09 },
    encode: { nodeKey: "id", nodeColor: "id", linkKey: (link: LaidOutLink) => `${link.source.id}>${link.target.id}` },
    scale: { color: { domain: FLOW_NODES.map(node => node.id), range: FLOW_NODES.map(node => colors[node.category]!) } },
    style: {
      nodeFill: (node: FlowNode) => colors[node.category]!, nodeStroke: "transparent", nodeLineWidth: 0,
      labelText: "name", labelFontSize: 12, labelFill: "#51566B", labelSpacing: 8,
      linkFill: (link: LaidOutLink) => {
        const focused = !selected || `${link.source.id}>${link.target.id}` === selected;
        if (!focused) return "#103FB7";
        // G-lite's 0deg runs left to right (its angle convention differs from CSS).
        return appearance.gradient ? "linear-gradient(0deg, #50D69A 0%, #5FC6FF 100%)" : colors[link.source.category]!;
      },
      linkFillOpacity: (link: LaidOutLink) => !selected || `${link.source.id}>${link.target.id}` === selected ? 0.85 : 0.09,
      linkStroke: "transparent", linkLineWidth: 0,
    },
    tooltip: { nodeTitle: "name", nodeItems: [{ field: "value", name: "学习人次" }], linkTitle: (link: LaidOutLink) => `${link.source.name} → ${link.target.name}`, linkItems: [{ field: "value", name: "学习人次" }] },
    animate: appearance.motion ? undefined : false,
  }), [data, colors, selected, appearance.gradient, appearance.motion]);
  return <section className="chart-sample" aria-labelledby="sankey-sample-title">
    <header className="chart-sample-heading"><div><p className="chart-eyebrow">06 · 流向与追踪</p><h2 id="sankey-sample-title">学习活动的去向</h2></div><span className="chart-recipe">P07 · 轻流带</span></header>
    <div className="chart-readout"><label>追踪路径 <select aria-label="追踪路径" value={selected} onChange={event => setSelected(event.target.value)}><option value="">全部路径</option>{data.links.map(link => <option key={flowId(link)} value={flowId(link)}>{flowName(link.source)} → {flowName(link.target)}</option>)}</select></label></div>
    <G2Plot id="sankey" label="学习活动流向学习目标的桑基图，流带宽度表示学习人次，可从上方选择追踪路径。" options={options} height={350} />
    <output className="chart-caption" data-testid="sankey-readout" aria-live="polite">{current ? `${flowName(current.source)} → ${flowName(current.target)}：${current.value} 人次` : "已显示全部路径"}</output>
    <p className="chart-note">流带宽度对应真实权重。节点高度随数据变化，尚未复现参考图中的等高列表布局。</p>
    <DataDisclosure headers={["学习活动", "学习目标", "人次"]} rows={data.links.map(link => [flowName(link.source), flowName(link.target), link.value])} />
  </section>;
}

function NetworkSample({ appearance }: { appearance: Appearance }) {
  const [selected, setSelected] = useState("");
  const palette = paletteColors(appearance);
  const colors = appearance.palette === "near" ? ["#2554FE", "#B53FFF", "#46B6C5"] : [palette[0]!, palette[1]!, palette[2]!];
  const options = useMemo<G2Spec>(() => {
    const edges = NETWORK_LINKS.map(link => {
      const source = NETWORK_NODES.find(node => node.id === link.source)!;
      const target = NETWORK_NODES.find(node => node.id === link.target)!;
      const length = Math.hypot(target.x - source.x, target.y - source.y);
      const inset = 0.062;
      const dx = (target.x - source.x) / length * inset;
      const dy = (target.y - source.y) / length * inset;
      return { ...link, id: `${link.source}>${link.target}:${link.kind}`, x0: source.x + dx, y0: source.y + dy, x1: target.x - dx, y1: target.y - dy, sourceName: source.name, targetName: target.name, highlighted: !selected || link.source === selected || link.target === selected };
    });
    const connected = new Set(edges.filter(link => link.highlighted).flatMap(link => [link.source, link.target]));
    return {
      type: "view", theme: chartTheme(), padding: 4, scale: { x: { domain: [0, 1] }, y: { domain: [0, 1] }, size: { type: "identity" } }, axis: false, legend: false,
      children: [
        ...RELATIONS.map(relation => ({
          type: "link" as const, data: edges.filter(link => link.kind === relation.kind), encode: { key: "id", x: ["x0", "x1"], y: ["y0", "y1"] },
          style: { shape: relation.kind === "similar" ? "smooth" : "link", stroke: relation.color, lineWidth: 1.5, lineDash: relation.dash, strokeOpacity: (link: (typeof edges)[number]) => link.highlighted ? 0.7 : 0.12, arrow: relation.kind !== "similar", arrowSize: 5 },
          tooltip: { title: relation.label, items: [{ field: "sourceName", name: "起点" }, { field: "targetName", name: "终点" }] }, animate: false as const,
        })),
        { type: "point", data: NETWORK_NODES, encode: { key: "id", x: "x", y: "y", size: 23, shape: "point" },
          style: { r: 23, fill: (node: NetworkNode) => appearance.gradient ? `radial-gradient(circle closest-side at center, ${colors[node.category]} 10%, rgba(255,255,255,0.8) 100%)` : colors[node.category]!, fillOpacity: (node: NetworkNode) => !selected || node.id === selected || connected.has(node.id) ? 1 : 0.22, stroke: (node: NetworkNode) => node.id === selected ? colors[node.category]! : "transparent", lineWidth: 1.5 },
          labels: [{ text: "name", position: "bottom", dy: 15, fontSize: 11, fill: "#555B70" }],
          tooltip: { title: "name", items: [(node: NetworkNode) => ({ name: "类型", value: ["概念", "方法", "应用"][node.category] })] }, animate: appearance.motion ? undefined : false },
      ],
    };
  }, [selected, colors.join("|"), appearance.gradient, appearance.motion]);
  return <section className="chart-sample" aria-labelledby="network-sample-title">
    <header className="chart-sample-heading"><div><p className="chart-eyebrow">07 · 知识与连接</p><h2 id="network-sample-title">知识关系网络</h2></div><span className="chart-recipe">P08 · 径向节点</span></header>
    <div className="chart-readout"><label>聚焦节点 <select aria-label="聚焦节点" value={selected} onChange={event => setSelected(event.target.value)}><option value="">全部节点</option>{NETWORK_NODES.map(node => <option key={node.id} value={node.id}>{node.name}</option>)}</select></label></div>
    <G2Plot id="network" label="九个知识节点的关系网络。紫色箭头为先修，橙色虚线箭头为应用，蓝色虚线为相似关系。" options={options} height={350} />
    <div className="chart-legend">{RELATIONS.map(relation => <span key={relation.kind} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginRight: 14 }}><i aria-hidden="true" style={{ width: 22, borderTop: `1.5px ${relation.dash.length ? "dashed" : "solid"} ${relation.color}` }} />{relation.label}{relation.kind !== "similar" ? " →" : ""}</span>)}</div>
    <p className="chart-note">节点采用径向渐变，无模糊阴影。当前使用固定示例位置；有向关系暂用直线箭头，曲线箭头仍需专门适配。</p>
    <DataDisclosure headers={["起点", "终点", "关系", "方向"]} rows={NETWORK_LINKS.map(link => [NETWORK_NODES.find(node => node.id === link.source)!.name, NETWORK_NODES.find(node => node.id === link.target)!.name, RELATIONS.find(relation => relation.kind === link.kind)!.label, link.kind === "similar" ? "无方向" : "起点 → 终点"])} />
  </section>;
}

export function ExtendedSamples({ appearance }: { appearance: Appearance }) {
  return <><MatrixSample appearance={appearance} /><SankeySample appearance={appearance} /><NetworkSample appearance={appearance} /></>;
}
