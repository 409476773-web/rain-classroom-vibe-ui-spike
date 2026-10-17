import { useId, useMemo, useState } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { Button } from "@rain-next/ui";
import { AreaChart, Area } from "./vendor/charts/area-chart";
import { ComposedChart } from "./vendor/charts/composed-chart";
import { SeriesBar } from "./vendor/charts/series-bar";
import { Line } from "./vendor/charts/line";
import { Grid } from "./vendor/charts/grid";
import { XAxis } from "./vendor/charts/x-axis";
import { YAxis } from "./vendor/charts/y-axis";
import { ChartTooltip, TooltipContent } from "./vendor/charts/tooltip";
import { ChartLegend } from "./vendor/charts/chart-legend";
import { ChartLegendHoverProvider } from "./vendor/charts/chart-legend-hover";
import { SankeyChart, SankeyNode, SankeyLink, SankeyTooltip, type SankeyData } from "./vendor/charts/sankey";

type Theme = "native" | "rain";
type Sample = "area" | "composed" | "sankey" | "mini";
type Point = { date: Date; enrolled: number; completed: number; rate: number };
const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];
const formatDate = (date: Date) => `${date.getMonth() + 1}月${date.getDate()}日`;
const immediate = { type: "tween" as const, duration: 0 };

function makeData(revision: number): Point[] {
  return Array.from({ length: 30 }, (_, i) => {
    const enrolled = Math.round(190 + i * 4.6 + Math.sin(i * 1.35) * 23 + Math.cos(i * .44) * 32 + (revision ? Math.sin(i * .72) * 30 + 22 : 0));
    const rate = Math.round(62 + i * .65 + Math.sin(i * .6) * 7 + (revision ? Math.cos(i * .5) * 5 : 0));
    return { date: new Date(2026, 8, i + 1), enrolled, completed: Math.round(enrolled * rate / 100), rate };
  });
}

function makeFlow(revision: number): SankeyData {
  const scale = revision ? 1.16 : 1;
  return {
    nodes: [
      { name: "课程入口", category: "source" }, { name: "学习提醒", category: "source" },
      { name: "观看视频", category: "landing" }, { name: "阅读资料", category: "landing" },
      { name: "完成学习", category: "outcome" }, { name: "继续学习", category: "outcome" },
    ],
    links: [[0, 2, 260], [0, 3, 140], [1, 2, 120], [1, 3, 80], [2, 4, 280], [2, 5, 100], [3, 4, 140], [3, 5, 80]].map(([source, target, value]) => ({ source: source!, target: target!, value: Math.round(value! * scale) })),
  };
}

function ExactData({ data, flow }: { data: Point[]; flow?: SankeyData }) {
  return <details className="bklit-data"><summary>查看精确数据</summary><div tabIndex={0} aria-label="精确数据表，可横向滚动">
    <table><caption>{flow ? "学习流向 · 人次" : "每日学习 · 人数与完成率"}</caption>
      <thead><tr>{(flow ? ["来源", "去向", "人次"] : ["日期", "参与人数", "完成人数", "完成率"]).map(x => <th key={x} scope="col">{x}</th>)}</tr></thead>
      <tbody>{flow ? flow.links.map((x, i) => <tr key={i}><td>{flow.nodes[Number(x.source)]?.name}</td><td>{flow.nodes[Number(x.target)]?.name}</td><td>{x.value}</td></tr>) : data.map(x => <tr key={x.date.getTime()}><th scope="row">{formatDate(x.date)}</th><td>{x.enrolled}</td><td>{x.completed}</td><td>{x.rate}%</td></tr>)}</tbody>
    </table>
  </div></details>;
}

function Cartesian({ sample, theme, data, replay, reduced }: { sample: Exclude<Sample, "sankey">; theme: Theme; data: Point[]; replay: number; reduced: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const id = useId().replaceAll(":", "");
  const mini = sample === "mini";
  const combined = sample === "composed";
  const last = data[data.length - 1]!;
  const rows = (point: Record<string, unknown>) => combined ? [
    { label: "参与人数", value: `${point.enrolled} 人`, color: colors[0]! },
    { label: "完成人数", value: `${point.completed} 人`, color: colors[2]! },
    { label: "完成率", value: `${point.rate}%`, color: colors[1]! },
  ] : [
    { label: "参与人数", value: `${point.enrolled} 人`, color: colors[0]! },
    ...(!mini ? [{ label: "完成人数", value: `${point.completed} 人`, color: colors[1]! }] : []),
  ];
  const tooltip = <ChartTooltip className="sample-tooltip" showDatePill={!mini} damping={reduced ? 0 : undefined}
    content={({ point }) => <TooltipContent title={formatDate(point.date as Date)} rows={rows(point)} />} />;
  const motion = { animationDuration: reduced ? 0 : undefined, enterTransition: reduced ? immediate : undefined, revealSignature: String(replay) };
  return <ChartLegendHoverProvider hoveredIndex={hovered} onHoverChange={setHovered}>
    {mini ? <div className="bklit-mini-row"><div><span className="bklit-metric-label">今日参与</span><p className="bklit-metric"><strong>{last.enrolled}</strong><span>人</span></p></div>
      <div className="bklit-mini-plot" aria-label="近30天参与人数迷你趋势">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }} style={{ width: 96, height: 40 }} aspectRatio="96 / 40" yDomainTween={!reduced} {...motion}>
          <Area dataKey="enrolled" fill={colors[0]} fillOpacity={theme === "rain" ? .2 : .4} animate={!reduced} />{tooltip}
        </AreaChart>
      </div></div> : combined ? <ComposedChart data={data} className="bklit-plot" margin={{ top: 24, right: 46, bottom: 38, left: 42 }} {...motion}>
        <defs><linearGradient id={`bar-${id}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--rain-local-bklit-bar-top)" offset="0%" /><stop stopColor="var(--rain-local-bklit-bar-bottom)" offset="100%" /></linearGradient></defs>
        <Grid horizontal numTicksRows={4} />
        <Area dataKey="enrolled" fill={colors[0]} fillOpacity={theme === "rain" ? .24 : .4} animate={!reduced} />
        <SeriesBar dataKey="completed" fill={theme === "rain" ? `url(#bar-${id})` : colors[2]} stroke={colors[2]} animate={!reduced} />
        <Line dataKey="rate" yAxisId="right" stroke={colors[1]} fadeEdges={false} animate={!reduced} />
        <YAxis numTicks={4} /><YAxis yAxisId="right" orientation="right" numTicks={4} formatValue={x => `${x}%`} />
        <XAxis numTicks={4} />{tooltip}
      </ComposedChart> : <AreaChart data={data} className="bklit-plot" margin={{ top: 24, right: 24, bottom: 38, left: 42 }} yDomainTween={!reduced} {...motion}>
        <Grid horizontal numTicksRows={4} />
        <Area dataKey="enrolled" fill={colors[0]} fillOpacity={theme === "rain" ? .24 : .4} animate={!reduced} />
        <Area dataKey="completed" fill={colors[1]} fillOpacity={theme === "rain" ? .16 : .4} animate={!reduced} />
        <YAxis numTicks={4} /><XAxis numTicks={4} />{tooltip}
      </AreaChart>}
    {!mini && <ChartLegend className="bklit-series-legend" hoveredIndex={hovered} onHover={setHovered} showValue={false} items={combined ? [
      { label: "参与人数 · 人", value: last.enrolled, color: colors[0]! },
      { label: "完成人数 · 人", value: last.completed, color: colors[2]! },
      { label: "完成率 · %", value: last.rate, color: colors[1]! },
    ] : [{ label: "参与人数", value: last.enrolled, color: colors[0]! }, { label: "完成人数", value: last.completed, color: colors[1]! }]} />}
  </ChartLegendHoverProvider>;
}

function Flow({ data, replay, reduced }: { data: SankeyData; replay: number; reduced: boolean }) {
  const nodeColor = (_node: unknown, index: number) => colors[index % colors.length]!;
  return <SankeyChart data={data} className="bklit-plot bklit-flow" margin={{ top: 24, bottom: 24, left: 68, right: 68 }} nodePadding={30} revealSignature={String(replay)} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? immediate : undefined}>
    <SankeyLink getNodeColor={nodeColor} /><SankeyNode getNodeColor={nodeColor} showValueLabels={false} />
    <SankeyTooltip className="sample-tooltip" nodeContent={({ node, index }) => <TooltipContent title={node.name} rows={[{ label: "人次", value: node.value ?? 0, color: nodeColor(node, index) }]} />}
      linkContent={({ link, index }) => <TooltipContent title={`${data.nodes[data.links[index]!.source]!.name} → ${data.nodes[data.links[index]!.target]!.name}`} rows={[{ label: "人次", value: link.value, color: nodeColor(null, data.links[index]!.source) }]} />} />
  </SankeyChart>;
}

function Pair({ sample, index, title, description, data, flow, replay, reduced }: { sample: Sample; index: string; title: string; description: string; data: Point[]; flow: SankeyData; replay: number; reduced: boolean }) {
  return <section className="bklit-section" aria-labelledby={`heading-${sample}`} id={sample}>
    <div className="bklit-section-heading"><span>{index}</span><div><h2 id={`heading-${sample}`}>{title}</h2><p>{description}</p></div></div>
    <div className="bklit-pair">{(["native", "rain"] as const).map(theme => <article className="bklit-surface" key={theme} data-sample={sample} data-theme={theme} data-rain-id={`bklit-${sample}-${theme}`}>
      <header><span className="bklit-theme-dot" /><h3>{theme === "native" ? "Bklit 原生" : "Rain 主题"}</h3><span>{theme === "native" ? "原生配色与图形" : "Rain 配色与字体"}</span></header>
      <div className="bklit-chart-region" role="group" aria-label={`${theme === "native" ? "Bklit 原生" : "Rain 主题"}${title}`}>
        {sample === "sankey" ? <Flow data={flow} replay={replay} reduced={reduced} /> : <Cartesian sample={sample} theme={theme} data={data} replay={replay} reduced={reduced} />}
      </div>
    </article>)}</div>
    <ExactData data={data} flow={sample === "sankey" ? flow : undefined} />
  </section>;
}

export function BklitValidation() {
  const [revision, setRevision] = useState(0);
  const [replay, setReplay] = useState(0);
  const [palette, setPalette] = useState("near");
  const reduced = Boolean(useReducedMotion());
  const data = useMemo(() => makeData(revision), [revision]);
  const flow = useMemo(() => makeFlow(revision), [revision]);
  const shared = { data, flow, replay, reduced };
  return <MotionConfig reducedMotion="user"><main className="bklit-lab" data-palette={palette} data-reduced-motion={reduced} data-revision={revision}>
    <header className="bklit-page-heading"><div><p className="bklit-eyebrow">RAIN NEXT / CHART STUDY 02</p><h1>Bklit × Rain</h1><p>同一组数据，两种视觉语言。移动指针，感受原生交互与 Rain 配色。</p></div><a href="/chart-validation.html">查看 G2 实验 ↗</a></header>
    <div className="bklit-toolbar"><nav aria-label="图表样本"><a href="#area">趋势</a><a href="#composed">组合</a><a href="#sankey">流向</a><a href="#mini">迷你图</a></nav><div>
      <label>Rain 配色 <select value={palette} onChange={e => setPalette(e.target.value)} aria-label="Rain 配色"><option value="near">蓝紫近邻</option><option value="wide">多色类别</option><option value="solid">蓝紫青实色</option></select></label>
      <Button variant="secondary" size="small" onClick={() => setRevision(x => 1 - x)}>更新数据</Button>
      <Button variant="primary" size="small" onClick={() => setReplay(x => x + 1)}>重播入场</Button>
    </div></div>
    <p className="bklit-status" role="status">示例数据 · 2026年9月 · {revision ? "更新后" : "初始值"}{reduced ? " · 已跟随系统减少动效" : ""}</p>
    <Pair sample="area" index="01" title="趋势与面积" description="描边、渐变与聚焦层次；两条曲线使用同一人数尺度。" {...shared} />
    <Pair sample="composed" index="02" title="柱、线与面积组合" description="左轴为人数，右轴为完成率。面积、柱与曲线共享日期定位。" {...shared} />
    <Pair sample="sankey" index="03" title="学习流向" description="路径宽度表示人次；悬停节点或路径，查看来源与去向。" {...shared} />
    <Pair sample="mini" index="04" title="指标中的迷你趋势" description="96 × 40 的紧凑图形，保留细线、轻面积和精确读取。" {...shared} />
    <footer className="bklit-footer">本地验证样本 · 原生列沿用 Bklit 中性色主题，Geist 不可用时使用系统字体回退。<br />当前验证主题与原生行为；点击固定、图例点击隐藏、密集矩阵与关系网络另行验证。</footer>
  </main></MotionConfig>;
}
