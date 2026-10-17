import type { FeatureCollection, Geometry } from "geojson";
import worldJson from "./chart-variants/data/world.geojson?raw";

export type ChartState = "normal" | "empty" | "zero" | "long" | "single" | "missing" | "invalid";
export type TimelinePoint = Record<string, unknown> & { date: Date; enrolled: number; completed: number; rate: number | null };
export const SERIES = [
  { key: "enrolled", label: "参与人数", color: "var(--chart-1)" },
  { key: "completed", label: "完成人数", color: "var(--chart-2)" },
  { key: "returned", label: "复习人数", color: "var(--chart-3)" },
  { key: "answered", label: "答题人数", color: "var(--chart-4)" },
  { key: "reviewed", label: "讨论人数", color: "var(--chart-5)" },
] as const;

export function dateLabel(value: Date) {
  return `${value.getMonth() + 1}月${value.getDate()}日`;
}

export function exampleLabel(label: string, state: ChartState) {
  return state === "long" ? `${label} · 综合课程学习情况` : label;
}

export function makeTimeline(revision = 0, state: ChartState = "normal"): TimelinePoint[] {
  if (state === "empty") return [];
  return Array.from({ length: state === "single" ? 1 : 24 }, (_, i) => {
    const enrolled = state === "zero" ? 0 : Math.round(190 + i * 6 + Math.sin(i * .58) * 44 + revision * (12 + i % 4 * 8));
    const completed = Math.round(enrolled * (.56 + (i % 6) * .055));
    const date = new Date(2026, 8, i + 1);
    assertValidDate(date);
    assertNonNegativeCount(enrolled); assertNonNegativeCount(completed);
    return {
      date, enrolled, completed,
      rate: enrolled ? Math.round(completed / enrolled * 100) : null,
      returned: Math.round(enrolled * .42), answered: Math.round(enrolled * .34), reviewed: Math.round(enrolled * .2),
    };
  });
}

export function makeMissingTimeline(revision = 0) {
  return makeTimeline(revision).map((point, index) => {
    const missing = revision % 3 === 2 || index % 6 === 1 || index === 23;
    const enrolled = missing ? null : index === 2 ? 0 : point.enrolled;
    const completed = missing ? null : index === 2 ? 0 : point.completed;
    return { ...point, enrolled, completed,
      rate: enrolled == null || enrolled === 0 || revision % 3 === 1 ? null : Math.round(completed! / enrolled * 100),
      returned: enrolled == null ? null : Math.round(enrolled * .42),
      answered: enrolled == null ? null : Math.round(enrolled * .34),
      reviewed: enrolled == null ? null : Math.round(enrolled * .2),
    };
  });
}

export function makeCategories(revision = 0, state: ChartState = "normal", count = 3) {
  if (state === "empty") return [];
  return ["课程一", "课程二", "课程三", "课程四", "课程五"].slice(0, state === "single" ? 1 : count).map((label, i) => ({
    label: exampleLabel(label, state), value: state === "zero" ? 0 : [320, 248, 196, 142, 96][i]! + revision * (i + 1) * 12,
    color: SERIES[i]!.color,
  }));
}

export function makeBars(revision = 0, state: ChartState = "normal") {
  if (state === "empty") return [];
  return ["课程一", "课程二", "课程三", "课程四", "课程五", "课程六"].slice(0, state === "single" ? 1 : 6).map((label, i) => ({
    label: exampleLabel(label, state), enrolled: state === "zero" ? 0 : 160 + i * 28 + revision * 16,
    completed: state === "zero" ? 0 : 104 + i * 22 + revision * 12,
    returned: state === "zero" ? 0 : 64 + i * 14 + revision * 8,
    answered: state === "zero" ? 0 : 48 + i * 10 + revision * 4,
    reviewed: state === "zero" ? 0 : 28 + i * 6 + revision * 2,
  }));
}

export function makeRings(revision = 0, state: ChartState = "normal", count = 3) {
  return makeCategories(revision, state, count).map((item, i) => {
    const ring = { ...item, value: state === "zero" ? 0 : [76, 58, 82, 64, 45][i]! + revision % 2 * 3, maxValue: 100,
      label: exampleLabel(["课程完成", "作业完成", "复习目标", "答题目标", "讨论目标"][i]!, state) };
    assertRingData(ring);
    return ring;
  });
}

export const RADAR_METRICS = [
  { key: "knowledge", label: "知识掌握", max: 100 }, { key: "attendance", label: "到课情况", max: 100 },
  { key: "practice", label: "练习表现", max: 100 }, { key: "engagement", label: "学习参与", max: 100 },
  { key: "review", label: "复习完成", max: 100 },
];

export function makeRadar(revision = 0, state: ChartState = "normal", count = 3) {
  return makeCategories(revision, state, count).map((item, i) => ({
    label: item.label, color: item.color,
    values: Object.fromEntries(RADAR_METRICS.map((metric, j) => [metric.key, state === "zero" ? 0 : 46 + (i * 11 + j * 13) % 46 + revision % 2 * 3])),
  }));
}

export function makeFunnel(revision = 0, state: ChartState = "normal") {
  if (state === "empty") return [];
  return ["进入课程", "观看视频", "完成练习", "完成学习"].slice(0, state === "single" ? 1 : 4).map((label, i) => ({
    label: exampleLabel(label, state), value: state === "zero" ? 0 : [1000, 780, 560, 420][i]! + revision * [40, 32, 26, 24][i]!,
  }));
}

export function makeFlow(revision = 0, state: ChartState = "normal") {
  if (state === "empty") return { nodes: [], links: [] };
  if (state === "single") return { nodes: [{ name: "课程入口", key: "课程入口" }, { name: "完成学习", key: "完成学习" }], links: [{ source: 0, target: 1, value: 420 + revision * 42 }] };
  const nodes = ["课程入口", "学习提醒", "观看视频", "阅读资料", "完成学习", "继续学习"].map(name => ({
    name: exampleLabel(name, state), key: name,
  }));
  const links = [[0, 2, 260], [0, 3, 140], [1, 2, 120], [1, 3, 80], [2, 4, 280], [2, 5, 100], [3, 4, 140], [3, 5, 80]].map(([source, target, value]) => ({
    source: source!, target: target!, value: state === "zero" ? 0 : Math.round(value! * (1 + revision * .1)),
  }));
  return { nodes, links };
}

export function flowColor(node: { name: string; key?: string }) {
  const key = node.key ?? node.name.split(" · ")[0];
  const palette: Record<string, string> = { "课程入口": "var(--chart-1)", "学习提醒": "var(--chart-3)", "观看视频": "var(--chart-2)", "阅读资料": "var(--chart-1)", "完成学习": "var(--chart-3)", "继续学习": "var(--chart-2)" };
  return palette[key!] ?? "var(--chart-4)";
}

export type HierarchyNode = { name: string; value?: number; color?: string; children?: HierarchyNode[] };
export function makeHierarchy(revision = 0, state: ChartState = "normal"): HierarchyNode {
  return { name: "学习内容", children: state === "empty" ? [] : ["基础课程", "进阶课程", "应用课程"].slice(0, state === "single" ? 1 : 3).map((name, i) => ({
    name: exampleLabel(name, state), color: SERIES[i]!.color,
    children: ["视频", "阅读", "练习"].map((leaf, j) => {
      const value = state === "zero" ? 0 : [120, 90, 60][j]! + i * 28 + revision * 12;
      return state === "long" ? { name: leaf, children: [{ name: "学习内容", value: Math.round(value * .6) }, { name: "巩固内容", value: value - Math.round(value * .6) }] } : { name: leaf, value };
    }),
  })) };
}

export function hierarchyLeaves(node: HierarchyNode, path = ""): { label: string; value: number }[] {
  const label = path ? `${path} / ${node.name}` : node.name;
  return node.children?.length ? node.children.flatMap(child => hierarchyLeaves(child, label)) : [{ label, value: node.value ?? 0 }];
}

export function makeHeatmap(revision = 0, state: ChartState = "normal") {
  if (state === "empty") return [];
  return Array.from({ length: state === "single" ? 1 : 18 }, (_, week) => ({
    bin: week,
    bins: Array.from({ length: 7 }, (_, day) => ({
      bin: day, date: new Date(2026, 5, 7 + week * 7 + day),
      // -1 follows the native ghost/no-data contract; zero remains a valid reading.
      count: state === "missing" && day === 3 && week % 4 === 0 ? -1 : state === "zero" ? 0 : (week * 7 + day * 3 + revision) % 5,
    })),
  }));
}

export type RegionProperties = { id: string; name: string; region: string; value?: number | null };
const world = JSON.parse(worldJson) as FeatureCollection<Geometry, RegionProperties>;
/** Natural Earth outlines with simulated readings; zero and missing remain distinct. */
export function makeRegions(revision = 0, state: ChartState = "normal"): FeatureCollection<Geometry, RegionProperties> {
  return { ...world, features: state === "empty" ? [] : world.features.slice(0, state === "single" ? 1 : undefined).map((feature, index) => {
    const key = Number(feature.properties.id);
    const value = state === "zero" ? 0 : key % 7 === 0 || state === "missing" && index % 4 === 0 ? null : key % 11 === 0 ? 0 : (key % 93 + revision * 3) % 100;
    return { ...feature, properties: { ...feature.properties, name: exampleLabel(feature.properties.name, state), value } };
  }) };
}

export function intensityColor(value: number | null | undefined, max = 100) {
  if (value == null || value < 0 || !Number.isFinite(value)) return "var(--chart-no-data)";
  const level = value === 0 ? 0 : Math.min(4, Math.ceil(value / max * 4));
  return `var(--chart-scale-0${level + 1})`;
}

export function makeCandles(revision = 0, state: ChartState = "normal") {
  if (state === "empty") return [];
  return Array.from({ length: state === "single" ? 1 : 20 }, (_, i) => {
    const open = state === "zero" ? 0 : 110 + Math.round(Math.sin(i * .68) * 16) + revision * 3;
    const close = state === "zero" ? 0 : open + [9, -7, 5, -11, 0][i % 5]!;
    const candle = { date: new Date(2026, 8, i + 1), open, close,
      high: state === "zero" ? 0 : Math.max(open, close) + 5 + i % 4,
      low: state === "zero" ? 0 : Math.min(open, close) - 5 - i % 3,
    };
    assertOHLC(candle);
    return candle;
  });
}

export function makeProfitLoss(revision = 0, state: ChartState = "normal") {
  if (state === "empty") return [];
  return Array.from({ length: state === "single" ? 1 : 24 }, (_, i) => ({
    date: new Date(2026, 8, i + 1), value: state === "zero" ? 0 : Math.round(Math.sin(i * .55) * 64 + i * 1.8 - 20 + revision * 12),
  }));
}

export function makeLivePoints(now = Math.floor(Date.now() / 1000), revision = 0, state: ChartState = "normal") {
  if (state === "empty") return [];
  const length = state === "single" ? 1 : 60;
  return Array.from({ length }, (_, i) => ({
    time: now - length + 1 + i, value: state === "zero" ? 0 : Math.round(90 + Math.sin(i * .31) * 22 + revision * 8),
  }));
}

export function assertValidDate(date: Date) {
  if (!(date instanceof Date) || !Number.isFinite(date.getTime())) throw new Error("日期必须为有效Date，不能使用Invalid Date。");
}

export function assertNonNegativeCount(value: number) {
  if (!Number.isFinite(value) || value < 0) throw new Error("人数或数量必须是有限的非负数。");
}

export function assertRingData(item: { value: number; maxValue: number }) {
  if (!Number.isFinite(item.maxValue) || item.maxValue <= 0) throw new Error("进度环目标值maxValue必须大于0且有限。");
  if (!Number.isFinite(item.value) || item.value < 0 || item.value > item.maxValue) throw new Error("进度环当前值必须有限，且在0至自身目标值之间。");
}

export function assertOHLC(point: { date: Date; open: number; high: number; low: number; close: number }) {
  assertValidDate(point.date);
  if (![point.open, point.high, point.low, point.close].every(Number.isFinite)) throw new Error("开高低收必须全部是有限数值。");
  if (point.high < Math.max(point.open, point.close) || point.low > Math.min(point.open, point.close)) throw new Error("OHLC关系错误：最高值不能低于开收，最低值不能高于开收。");
}

export function assertGaugeValue(value: number) {
  if (!Number.isFinite(value) || value < 0 || value > 100) throw new Error("仪表值必须有限，且在0至100之间。");
}

/** Builds a deliberately invalid input and returns the actual validator failure. */
export function invalidExampleError(id: string): string | null {
  try {
    if (id === "ring") assertRingData({ ...makeRings()[0]!, maxValue: 0 });
    else if (id === "candlestick") assertOHLC({ ...makeCandles()[0]!, high: -1 });
    else if (id === "gauge") assertGaugeValue(101);
    else if (["area", "line", "composed", "scatter", "heatmap", "profit-loss", "live-line"].includes(id)) assertValidDate(new Date("invalid-date"));
    else assertNonNegativeCount(Number.NaN);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}

export function runCatalogDataChecks() {
  const rejected: [string, () => void][] = [
    ["Invalid Date", () => assertValidDate(new Date("invalid-date"))],
    ["Ring maxValue=0", () => assertRingData({ value: 10, maxValue: 0 })],
    ["Ring value exceeds maximum", () => assertRingData({ value: 101, maxValue: 100 })],
    ["Ring negative value", () => assertRingData({ value: -1, maxValue: 100 })],
    ["OHLC high below open/close", () => assertOHLC({ date: new Date(2026, 8, 1), open: 100, high: 90, low: 80, close: 110 })],
    ["OHLC low above open/close", () => assertOHLC({ date: new Date(2026, 8, 1), open: 100, high: 120, low: 105, close: 110 })],
    ...[-1, 101, Number.NaN].map((value): [string, () => void] => [`Gauge ${value}`, () => assertGaugeValue(value)]),
  ];
  for (const [label, check] of rejected) {
    let failed = false;
    try { check(); } catch { failed = true; }
    if (!failed) throw new Error(`Invalid input was accepted: ${label}`);
  }
  for (const value of [0, 50, 100]) assertGaugeValue(value);
  for (const id of ["ring", "candlestick", "gauge", "area", "bar", "pie", "radar", "funnel", "sankey", "sunburst", "choropleth", "heatmap", "line", "composed", "scatter", "profit-loss", "live-line"]) {
    if (!invalidExampleError(id)) throw new Error(`Invalid example did not fail construction: ${id}`);
  }
  const points = makeTimeline();
  if (points.length !== 24) throw new Error("Daily example must contain 24 ordered readings");
  for (const point of points) {
    if (point.completed > point.enrolled || point.rate !== Math.round(point.completed / point.enrolled * 100)) {
      throw new Error("Completed count and percentage disagree");
    }
  }
  if (makeTimeline(0, "zero").some(point => point.rate !== null)) throw new Error("Zero participants must have no applicable rate");
  for (const ring of makeRings()) if (ring.maxValue <= 0 || ring.value > ring.maxValue || ring.value < 0) throw new Error("Invalid progress range");
  for (const candle of makeCandles()) if (candle.high < Math.max(candle.open, candle.close) || candle.low > Math.min(candle.open, candle.close)) throw new Error("Invalid OHLC relation");
  const flow = makeFlow();
  for (const middle of [2, 3]) {
    const input = flow.links.filter(link => link.target === middle).reduce((total, link) => total + link.value, 0);
    const output = flow.links.filter(link => link.source === middle).reduce((total, link) => total + link.value, 0);
    if (input !== output) throw new Error("Flow example must conserve intermediate totals");
  }
  for (const [week, column] of makeHeatmap().entries()) for (const [day, bin] of column.bins.entries()) {
    if (bin.date.getDay() !== day || bin.date.getDate() !== new Date(2026, 5, 7 + week * 7 + day).getDate()) throw new Error("Calendar position and date disagree");
  }
  const regions = makeRegions().features;
  if (regions.length !== 177 || new Set(regions.map(feature => feature.properties.id)).size !== regions.length || !regions.some(feature => feature.properties.value == null) || !regions.some(feature => feature.properties.value === 0)) throw new Error("Map keys or no-data example are wrong");
  const live = makeLivePoints(1_791_324_000);
  if (live.some((point, i) => point.time > 10_000_000_000 || i > 0 && point.time <= live[i - 1]!.time)) throw new Error("Live timestamps must be ordered Unix seconds");
  return "catalog-data checks passed";
}
