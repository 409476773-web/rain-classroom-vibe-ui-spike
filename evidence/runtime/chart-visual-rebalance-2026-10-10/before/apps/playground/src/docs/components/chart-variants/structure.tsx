import { Fragment, useId, useMemo, useState } from "react";
import { Breadcrumb, Button } from "@rain-next/ui";
import {
  buildArcs, buildHeatmapRowOpacity,
  ChoroplethChart, ChoroplethFeatureComponent, ChoroplethGraticule, ChoroplethTooltip,
  HeatmapCells, HeatmapChart, HeatmapChartLoading, HeatmapInteractionBoundary, HeatmapInteractionProvider,
  HeatmapLegend, HeatmapSeparator, HeatmapTooltip, HeatmapXAxis, HeatmapYAxis,
  Legend, LegendItemComponent, LegendLabel, LegendMarker, LegendValue, PatternLines,
  SankeyChart, SankeyLink, SankeyNode, SankeyTooltip, TooltipContent,
  SunburstBreadcrumb, SunburstCenter, SunburstChart, SunburstHint, SunburstLabels, SunburstSegment,
  useChoroplethZoom, useLegendItem, useSunburstBreadcrumbItems,
  type ChoroplethFeature, type HeatmapColumn, type HeatmapLevelStyles,
} from "@rain-next/ui/charts";
import { flowColor, hierarchyLeaves, intensityColor, makeFlow, makeHierarchy, makeRegions } from "../chart-data";
import { VariantTable, immediate, seriesColors, useVariantSetting, type VariantExampleProps } from "./shared";

export const STRUCTURE_VARIANT_IDS = [
  "choropleth-interactive", "choropleth-default", "choropleth-analytics", "choropleth-graticule", "choropleth-patterns",
  "heatmap-contributions", "heatmap-default", "heatmap-pattern-levels", "heatmap-solid-separators", "heatmap-compact-y-quarter",
  "heatmap-dashed-separators", "heatmap-loading", "heatmap-horizontal-scroll", "heatmap-gradient-legend", "heatmap-monday-start", "heatmap-active-scale-hover",
  "sankey-interactive", "sankey-default", "sankey-no-labels", "sankey-simple", "sankey-solid-links",
  "sunburst-interactive", "sunburst-patterns", "sunburst-legend",
] as const;

/** Fixed calendar range makes snapshots and replay independent of the wall clock. */
function heatmapRange(months: number, weekStart: 0 | 1) {
  return { start: new Date(2026, 9 - months, 1), end: new Date(2026, 8, weekStart ? 27 : 26) };
}

export function structureHeatmapData(revision = 0, months = 6, weekStart: 0 | 1 = 0): HeatmapColumn[] {
  const { start, end } = heatmapRange(months, weekStart);
  const aligned = new Date(start);
  aligned.setDate(aligned.getDate() - (aligned.getDay() - weekStart + 7) % 7);
  const columns: HeatmapColumn[] = [];
  const cursor = new Date(aligned);
  while (cursor <= end) {
    const chronological = Array.from({ length: 7 }, (_, row) => {
      const date = new Date(cursor);
      cursor.setDate(cursor.getDate() + 1);
      const ordinal = Math.round((date.getTime() - aligned.getTime()) / 86_400_000);
      return { bin: date.getDay(), date, count: date < start || date > end || ordinal % 37 === 19 ? -1 : (ordinal * 3 + Math.floor(ordinal / 7) + revision) % 5 };
    });
    // Native weekStartDay rotates Sun-first bins; assign Sunday from this Monday week, not the previous week.
    columns.push({ bin: columns.length, bins: weekStart ? [chronological[6]!, ...chronological.slice(0, 6)] : chronological });
  }
  return columns;
}

export const structureWorldData = makeRegions;

export function structureSankeyData(revision = 0, simple = false) {
  if (!simple) return makeFlow(revision);
  const total = 400 + revision * 40;
  return {
    nodes: ["课程入口", "完成学习", "继续学习"].map(name => ({ name, key: name })),
    links: [{ source: 0, target: 1, value: total * .7 }, { source: 0, target: 2, value: total * .3 }],
  };
}

const weekendOpacity = buildHeatmapRowOpacity(row => row >= 5, .35);
const defaultLevels = [1, 2, 3, 4, 5].map(index => ({ color: `var(--chart-scale-0${index})`, fillMode: "solid", pattern: "none" })) as unknown as HeatmapLevelStyles;
const patternLevels = [defaultLevels[0], defaultLevels[1], { ...defaultLevels[2], fillMode: "pattern", pattern: "diagonal", patternColor: "var(--chart-scale-pattern-color)" }, defaultLevels[3], defaultLevels[4]] as const satisfies HeatmapLevelStyles;

function HeatmapVariant(props: VariantExampleProps) {
  const { variantId, revision, replay, reduced, active } = props;
  const [loading, setLoading] = useVariantSetting("loading", true, props);
  const still = reduced || !active;
  const scroll = variantId === "heatmap-horizontal-scroll";
  const monday = variantId === "heatmap-monday-start";
  const contribution = variantId === "heatmap-contributions";
  const scrollable = scroll || contribution;
  const plain = variantId === "heatmap-default";
  const enlarged = variantId === "heatmap-active-scale-hover";
  const gradient = variantId === "heatmap-gradient-legend";
  const months = scroll || contribution ? 12 : 6;
  const weekStart = monday ? 1 : 0;
  const { start, end } = heatmapRange(months, weekStart);
  const data = useMemo(() => structureHeatmapData(revision, months, weekStart), [revision, months, weekStart]);
  const separator = contribution || ["heatmap-solid-separators", "heatmap-compact-y-quarter", "heatmap-dashed-separators"].includes(variantId);
  const solidSeparator = variantId === "heatmap-solid-separators";
  const dashed = variantId === "heatmap-dashed-separators";
  const levels = variantId === "heatmap-pattern-levels" ? patternLevels : defaultLevels;
  const rowOpacity = monday ? weekendOpacity : undefined;
  const metric = gradient ? "耗时等级" : "活跃等级";
  const precise = data.flatMap(column => column.bins).filter(bin => bin.date >= start && bin.date <= end).sort((a, b) => a.date.getTime() - b.date.getTime()).map(bin => ({ 日期: bin.date, 星期: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][bin.date.getDay()], [`${metric} · 0–4`]: bin.count < 0 ? null : bin.count }));
  const rangeLabel = `${start.getFullYear()}年${start.getMonth() + 1}月${start.getDate()}日—${end.getFullYear()}年${end.getMonth() + 1}月${end.getDate()}日`;
  const isLoading = variantId === "heatmap-loading" && loading;
  const margin = { top: separator ? 44 : 28, right: 12, bottom: 8, left: dashed ? 8 : 40 };
  return <>
    {variantId === "heatmap-loading" && <Button size="small" onClick={() => setLoading(value => !value)}>{loading ? "显示数据" : "开始加载"}</Button>}
    <div className={gradient ? "rain-chart" : undefined} data-recipe={gradient ? "intensity" : undefined}><HeatmapInteractionProvider><HeatmapInteractionBoundary>
      <div className={scrollable ? "rain-chart-heatmap-scroll" : undefined} tabIndex={scrollable ? 0 : undefined} role={scrollable ? "region" : undefined} aria-label={scrollable ? "全年活动日历，可横向滚动" : undefined}>
        <div style={scroll ? { width: data.length * 14 + margin.left + margin.right } : contribution ? { minWidth: data.length * 8 + 3 * 12 + margin.left + margin.right } : undefined}>
          {isLoading && !still ? <HeatmapChartLoading data={data} gap={3} label="正在加载活动日历" margin={margin} /> : <HeatmapChart
            data={data} layout="fluid" binSize={scroll ? 14 : undefined} gap={enlarged ? 4 : 3} margin={margin}
            weekStartDay={monday ? 1 : 0} levelStyles={levels} animate={!still} status={isLoading ? "loading" : "ready"}
            animationDuration={still ? 0 : undefined} enterTransition={still ? immediate : undefined}
            revealSignature={`${variantId}-${revision}-${replay}`}
          >
            <HeatmapCells cornerRadius={contribution ? 999 : 2} activeScale={enlarged ? 1.1 : 1} inactiveScale={contribution ? .94 : 1} inactiveOpacity={plain ? 1 : enlarged ? .45 : contribution ? .8 : .3} rowOpacity={rowOpacity} />
            {separator && <HeatmapSeparator groupBy="quarter" spacing={12} showLabels startOffset={12} labelOffset={8} labelFormat={(quarter, date) => `Q${date < start ? Math.floor(start.getMonth() / 3) + 1 : quarter}`} stroke="var(--chart-grid)" strokeStyle={dashed ? "dashed" : "solid"} strokeDasharray={dashed ? "3,5" : undefined} gradient={solidSeparator ? undefined : { from: "var(--chart-grid)", via: "var(--chart-grid)", to: "var(--chart-grid)", fromOpacity: 0, viaOpacity: 1, toOpacity: 0 }} />}
            <HeatmapXAxis />
            {!dashed && <HeatmapYAxis tickFilter="odd" labelFormat={plain || scroll ? "full" : "initial"} rowOpacity={rowOpacity} />}
            <HeatmapTooltip className="rain-chart-tooltip" instant={plain || still} formatLabel={(count, date) => date < start || date > end ? "日历补位 · 不计数" : count < 0 ? "缺测" : `${metric} ${count} / 4`} />
          </HeatmapChart>}
        </div>
      </div>
      {isLoading && still && <p role="status" className="rain-chart-note">正在加载活动日历 · 静态占位</p>}
      <HeatmapLegend className="rain-chart-heatmap-legend" align="center" levelStyles={levels} variant={gradient ? "gradient" : "swatches"} lessLabel={gradient ? "低耗时" : "少"} moreLabel={gradient ? "高耗时" : "多"} gap={enlarged ? 4 : 3} cornerRadius={contribution ? 999 : 2} activeScale={enlarged ? 1.1 : 1} inactiveOpacity={plain ? 1 : enlarged ? .45 : contribution ? .8 : .3} inactiveScale={contribution ? .94 : 1} />
    </HeatmapInteractionBoundary></HeatmapInteractionProvider></div>
    <p className="rain-chart-note">{rangeLabel}，截至完整周。{scroll ? "全年窗口 · 固定格宽，可横向滚动。" : monday ? "周一至周日按日期连续排列；周末弱化。" : "0 是有效读数，缺测不计为 0。"}{gradient ? "颜色由低耗时递增至高耗时。" : ""}</p>
    <VariantTable data={precise} caption={`${rangeLabel}的日期、星期与精确等级；不含日历补位`} />
  </>;
}

function MapControls() {
  const { zoom } = useChoroplethZoom();
  if (!zoom) return null;
  return <div className="rain-chart-map-controls" style={{ position: "absolute", right: 8, bottom: 8 }}>
    <Button size="mini" aria-label="放大地图" onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>放大</Button>
    <Button size="mini" aria-label="缩小地图" onClick={() => zoom.scale({ scaleX: .8, scaleY: .8 })}>缩小</Button>
    <Button size="mini" aria-label="重置地图" onClick={() => zoom.reset()}>重置</Button>
  </div>;
}

const worldRegions = ["North America", "South America", "Europe", "Africa", "Asia", "Oceania", "Antarctica"];

function ChoroplethVariant({ variantId, revision, replay, reduced, active }: VariantExampleProps) {
  const instance = useId().replaceAll(":", "");
  const still = reduced || !active;
  const data = useMemo(() => structureWorldData(revision), [revision]);
  const analytical = variantId === "choropleth-analytics";
  const patterned = variantId === "choropleth-patterns";
  const interactive = variantId === "choropleth-interactive";
  const featureValue = (feature: ChoroplethFeature) => typeof feature.properties.value === "number" ? feature.properties.value : null;
  const rows = data.features.map(feature => ({ 地区ID: feature.properties.id, 地区: feature.properties.name, 分区: feature.properties.region, "参与量 · 人": feature.properties.value }));
  return <>
    <ChoroplethChart data={data} className="rain-chart-plot" aspectRatio="" margin={{ top: 8, right: 8, bottom: 32, left: 8 }} zoomEnabled={interactive} animationDuration={still ? 0 : undefined} enterTransition={still ? immediate : undefined} revealSignature={`${instance}-${revision}-${replay}`}>
      {(interactive || variantId === "choropleth-default" || variantId === "choropleth-graticule") && <ChoroplethGraticule stroke="var(--chart-grid)" strokeWidth={variantId === "choropleth-graticule" ? 1 : .5} step={variantId === "choropleth-graticule" ? [20, 20] : undefined} />}
      <ChoroplethFeatureComponent fill={analytical || patterned ? undefined : variantId === "choropleth-graticule" ? seriesColors[0] : seriesColors[2]} getFeatureColor={analytical ? feature => intensityColor(featureValue(feature)) : undefined} getFeaturePattern={patterned ? feature => `${instance}-region-${Math.max(0, worldRegions.indexOf(String(feature.properties.region)))}` : undefined} patterns={patterned ? worldRegions.map((region, index) => <PatternLines key={region} id={`${instance}-region-${index}`} width={6} height={6} orientation={["diagonal"]} stroke={seriesColors[index % 5]} strokeWidth={1} />) : undefined} />
      <ChoroplethTooltip className="rain-chart-tooltip" content={({ feature }) => <TooltipContent title={String(feature.properties.name)} rows={[{ label: "参与量", value: featureValue(feature) == null ? "缺测" : `${featureValue(feature)} 人`, color: analytical ? intensityColor(featureValue(feature)) : patterned ? seriesColors[Math.max(0, worldRegions.indexOf(String(feature.properties.region))) % 5]! : variantId === "choropleth-graticule" ? seriesColors[0]! : seriesColors[2]! }]} />} />
      {interactive && <MapControls />}
    </ChoroplethChart>
    <p className="rain-chart-note">{analytical ? "颜色按参与量递增；灰色为缺测，0 保留最低有效等级。" : patterned ? "按分区编码纹理颜色，参与量在提示和明细中读取。" : interactive ? "可拖动、滚轮缩放，也可使用放大、缩小、重置按钮。" : "世界地图 · 单色地区与经纬线。"} 示例参与量为模拟数据；底图为 Natural Earth 1:110m。</p>
    <VariantTable data={rows} caption="世界地图模拟参与量；缺测与零值分开读取" />
  </>;
}

function SankeyVariant({ variantId, revision, replay, reduced, active }: VariantExampleProps) {
  const instance = useId().replaceAll(":", "");
  const still = reduced || !active;
  const simple = variantId === "sankey-simple";
  const data = useMemo(() => structureSankeyData(revision, simple), [revision, simple]);
  const solid = variantId === "sankey-solid-links";
  const noLabels = variantId === "sankey-no-labels";
  const rows = data.links.map(link => ({ 来源: data.nodes[link.source]!.name, 去向: data.nodes[link.target]!.name, "流量 · 人": link.value }));
  return <>
    <SankeyChart data={data} className="rain-chart-plot" aspectRatio="" margin={{ top: 32, right: noLabels ? 12 : 48, bottom: 32, left: noLabels ? 12 : 48 }} nodeWidth={simple ? 12 : 16} nodePadding={simple ? 20 : 24} animationDuration={still ? 0 : undefined} enterTransition={still ? immediate : undefined} revealSignature={`${instance}-${revision}-${replay}`}>
      <SankeyLink stroke={solid ? seriesColors[2] : undefined} strokeOpacity={solid ? .3 : simple ? .5 : undefined} useGradient={!solid} getNodeColor={flowColor} />
      <SankeyNode lineCap={simple ? 3 : 4} labelOrientation="vertical" showLabels={!noLabels} getNodeColor={flowColor} />
      <SankeyTooltip formatValue={value => `${value} 人`} className="rain-chart-tooltip" />
    </SankeyChart>
    <p className="rain-chart-note">流量 · 人。中间节点流入量等于流出量；完成与继续学习是互斥结果。{noLabels ? "图上隐藏标签，可在提示和精确数据中读取来源与去向。" : ""}</p>
    <VariantTable data={rows} caption="每一条连接的来源、去向与流量" />
  </>;
}

function DrillBreadcrumb() {
  const { items, zoomTo } = useSunburstBreadcrumbItems();
  if (items.length === 1) return <h3 className="rain-chart-sunburst-title">{items[0]!.label}</h3>;
  return <Breadcrumb aria-label="学习内容层级"><Breadcrumb.List>{items.map((item, index) => <Fragment key={item.id}>
    {index > 0 && <Breadcrumb.Separator />}
    <Breadcrumb.Item>{item.isCurrent ? <Breadcrumb.Page>{item.label}</Breadcrumb.Page> : <Breadcrumb.Link href="#chart-sunburst" onClick={event => { event.preventDefault(); zoomTo(item.id); }} aria-label={`返回${item.label}`}>{item.label}</Breadcrumb.Link>}</Breadcrumb.Item>
  </Fragment>)}</Breadcrumb.List></Breadcrumb>;
}

function FocusLegendItem({ arcs, onFocus, onHover }: { arcs: ReturnType<typeof buildArcs>["arcs"]; onFocus: (id: string) => void; onHover: (index: number | null) => void }) {
  const { item, index } = useLegendItem();
  const arc = arcs[index]!;
  return <LegendItemComponent><Button variant="text" size="small" onFocus={() => onHover(arc.arcIndex)} onBlur={() => onHover(null)} onClick={() => { if (arc.hasChildren) onFocus(arc.id); }} aria-label={`${item.label}，${item.value} 人${arc.hasChildren ? "，查看下级" : ""}`}><LegendMarker /><LegendLabel /><LegendValue formatValue={value => `${value} 人`} showPercentage /></Button></LegendItemComponent>;
}

function SunburstVariant(props: VariantExampleProps) {
  const { variantId, revision, replay, reduced, active } = props;
  const instance = useId().replaceAll(":", "");
  const still = reduced || !active;
  const data = useMemo(() => makeHierarchy(revision), [revision]);
  const { arcs, rootId } = useMemo(() => buildArcs(data), [data]);
  const [focusId, setFocusId] = useVariantSetting("focusId", rootId, props);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const children = arcs.filter(arc => arc.parentId === focusId);
  const total = children.reduce((sum, arc) => sum + arc.value, 0);
  const items = children.map(arc => ({ label: arc.name, value: arc.value, color: arc.color ?? seriesColors[arc.categoryIndex % 5]!, maxValue: total }));
  const legendHovered = children.findIndex(arc => hoveredIndex != null && (arc.arcIndex === hoveredIndex || arcs[hoveredIndex]?.id.startsWith(`${arc.id} / `)));
  function focus(next: string) { setFocusId(next); setHoveredIndex(null); }
  const patterned = variantId === "sunburst-patterns";
  const legend = variantId === "sunburst-legend";
  return <>
    <div className="rain-chart-sunburst">
      <SunburstChart data={data} size={variantId === "sunburst-interactive" ? 400 : 280} focusId={focusId} onFocusChange={focus} hoveredIndex={hoveredIndex} onHoverChange={setHoveredIndex} playKey={replay} enterTransition={still ? immediate : undefined} enterStaggerScale={still ? 0 : 1} hoverPop={still ? 0 : undefined}>
        <SunburstBreadcrumb className="rain-chart-sunburst-heading"><DrillBreadcrumb /></SunburstBreadcrumb>
        {patterned && arcs.filter(arc => arc.depth === 1 && arc.categoryIndex % 2 === 0).map(arc => <PatternLines key={arc.id} id={`${instance}-sunburst-${arc.arcIndex}`} height={6} width={6} orientation={["diagonal"]} stroke={arc.color ?? seriesColors[arc.categoryIndex % 5]} strokeWidth={1} />)}
        {arcs.map(arc => <SunburstSegment key={arc.id} index={arc.arcIndex} fill={patterned && arc.depth === 1 && arc.categoryIndex % 2 === 0 ? `url(#${instance}-sunburst-${arc.arcIndex})` : undefined} />)}
        <SunburstCenter />
        {variantId === "sunburst-interactive" && <SunburstLabels />}
        <SunburstHint>{({ hoveredArc }) => hoveredArc ? `${hoveredArc.trail.join(" › ")} · ${hoveredArc.value} 人` : "点选内环查看下级；点中心或路径返回。"}</SunburstHint>
      </SunburstChart>
      {legend && <div role="group" aria-label="当前层级图例"><Legend className="rain-chart-sunburst-legend" items={items} hoveredIndex={legendHovered < 0 ? null : legendHovered} onHoverChange={index => setHoveredIndex(index == null ? null : children[index]!.arcIndex)}>
        <FocusLegendItem arcs={children} onFocus={focus} onHover={setHoveredIndex} />
      </Legend></div>}
      {!legend && <div className="rain-chart-map-controls" role="group" aria-label="当前层级，可用键盘查看下级">{children.filter(arc => arc.hasChildren).map(arc => <Button key={arc.id} variant="text" size="small" onClick={() => focus(arc.id)}>查看{arc.name}</Button>)}</div>}
    </div>
    <p className="rain-chart-note">学习内容构成 · 人。总量只累加叶项；{legend ? "图例与当前层级、悬浮扇区同步。" : "内环是课程分类，外环是学习内容。"}</p>
    <VariantTable data={hierarchyLeaves(data).map(leaf => ({ 内容路径: leaf.label, "数量 · 人": leaf.value }))} caption="旭日图叶项精确值；父级由叶项求和" />
  </>;
}

export function StructureVariant(props: VariantExampleProps) {
  if (props.variantId.startsWith("heatmap-")) return <HeatmapVariant {...props} />;
  if (props.variantId.startsWith("choropleth-")) return <ChoroplethVariant {...props} />;
  if (props.variantId.startsWith("sankey-")) return <SankeyVariant {...props} />;
  return <SunburstVariant {...props} />;
}
