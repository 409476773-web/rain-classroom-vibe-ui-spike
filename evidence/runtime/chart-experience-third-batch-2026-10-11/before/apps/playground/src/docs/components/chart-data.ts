import type { FeatureCollection, Geometry } from "geojson";
import worldJson from "./chart-variants/data/world.geojson?raw";

export type ChartState = "normal" | "empty" | "zero" | "long" | "single" | "missing" | "invalid";
/** Named documentation boundaries; ordinary ChartState and normal mock arrays stay unchanged. */
export type ChartBoundaryScenario = "normal" | "pie-small" | "pie-remove" | "ring-zero" | "ring-full" | "ring-zero-goal" | "ring-over" | "funnel-missing" | "funnel-growth" | "funnel-zero-entry" | "funnel-above-entry" | "sankey-thin" | "sankey-zero-link";
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
  const step = revision % 3;
  const readings = [
    [184, 188, 198, 214, 235, 258, 282, 304, 322, 334, 338, 334, 323, 307, 290, 275, 265, 260, 264, 276, 295, 317, 339, 356],
    [218, 223, 232, 247, 266, 286, 304, 318, 327, 330, 325, 313, 297, 281, 267, 260, 263, 274, 292, 314, 335, 351, 359, 360],
    [162, 170, 186, 207, 230, 251, 268, 279, 283, 280, 269, 254, 238, 225, 219, 224, 238, 258, 282, 305, 322, 330, 329, 322],
  ] as const;
  return Array.from({ length: state === "single" ? 1 : 24 }, (_, i) => {
    const enrolled = state === "zero" ? 0 : readings[step]![i]!;
    const completed = Math.round(enrolled * (.64 + Math.sin(i * .18 + [0, .6, -.4][step]!) * .09));
    const date = new Date(2026, 8, i + 1);
    assertValidDate(date);
    assertNonNegativeCount(enrolled); assertNonNegativeCount(completed);
    return {
      date, enrolled, completed,
      rate: enrolled ? completed / enrolled * 100 : null,
      returned: Math.round(enrolled * (.39 + Math.cos(i * .17 + step * .5) * .08)),
      answered: Math.round(enrolled * (.31 + Math.sin(i * .16 + 1 + step * .4) * .07)),
      reviewed: Math.round(enrolled * (.18 + Math.cos(i * .14 + .7 + step * .6) * .05)),
    };
  });
}

export function makeMissingTimeline(revision = 0) {
  return makeTimeline(revision).map((point, index) => {
    const missing = revision % 3 === 2 || index % 6 === 1 || index === 23;
    const enrolled = missing ? null : index === 2 ? 0 : point.enrolled;
    const completed = missing ? null : index === 2 ? 0 : point.completed;
    return { ...point, enrolled, completed,
      rate: enrolled == null || enrolled === 0 || revision % 3 === 1 ? null : completed! / enrolled * 100,
      returned: enrolled == null ? null : Math.round(enrolled * .42),
      answered: enrolled == null ? null : Math.round(enrolled * .34),
      reviewed: enrolled == null ? null : Math.round(enrolled * .2),
    };
  });
}

export function makeCategories(revision = 0, state: ChartState = "normal", count = 3) {
  if (state === "empty") return [];
  const values = [[420, 260, 180, 110, 70], [310, 340, 220, 160, 100], [370, 230, 290, 125, 95]] as const;
  return ["课程一", "课程二", "课程三", "课程四", "课程五"].slice(0, state === "single" ? 1 : count).map((label, i) => ({
    label: exampleLabel(label, state), value: state === "zero" ? 0 : values[revision % 3]![i]!,
    color: SERIES[i]!.color,
  }));
}

export function makeBars(revision = 0, state: ChartState = "normal") {
  if (state === "empty") return [];
  const step = revision % 3;
  return ["课程一", "课程二", "课程三", "课程四", "课程五", "课程六"].slice(0, state === "single" ? 1 : 6).map((label, i) => ({
    label: exampleLabel(label, state), enrolled: state === "zero" ? 0 : 160 + i * 28 + step * 16,
    completed: state === "zero" ? 0 : 104 + i * 22 + step * 12,
    returned: state === "zero" ? 0 : 64 + i * 14 + step * 8,
    answered: state === "zero" ? 0 : 48 + i * 10 + step * 4,
    reviewed: state === "zero" ? 0 : 28 + i * 6 + step * 2,
  }));
}

const groupedBarSnapshots = [
  [[256, 228, 156, 118, 84], [184, 96, 88, 70, 52], [312, 128, 112, 96, 64], [228, 212, 106, 164, 72], [288, 156, 148, 116, 98], [204, 172, 94, 138, 60]],
  [[242, 148, 92, 116, 66], [216, 202, 124, 162, 88], [296, 172, 146, 132, 78], [198, 104, 96, 86, 58], [318, 284, 188, 214, 106], [226, 128, 112, 104, 74]],
  [[284, 196, 182, 144, 96], [176, 160, 102, 122, 66], [264, 134, 126, 112, 82], [238, 214, 148, 172, 96], [304, 156, 140, 124, 78], [212, 104, 98, 92, 62]],
] as const;

export function makeGroupedBars(revision = 0, state: ChartState = "normal") {
  const step = Number.isFinite(revision) ? ((Math.trunc(revision) % groupedBarSnapshots.length) + groupedBarSnapshots.length) % groupedBarSnapshots.length : 0;
  const snapshot = groupedBarSnapshots[step]!;
  return makeBars(0, state).map(({ label }, index) => ({
    label, enrolled: state === "zero" ? 0 : snapshot[index]![0],
    completed: state === "zero" ? 0 : snapshot[index]![1],
    returned: state === "zero" ? 0 : snapshot[index]![2],
    answered: state === "zero" ? 0 : snapshot[index]![3],
    reviewed: state === "zero" ? 0 : snapshot[index]![4],
  }));
}

export function makeRings(revision = 0, state: ChartState = "normal", count = 3) {
  const values = [[72, 48, 86, 63, 54], [84, 67, 78, 72, 61], [65, 82, 91, 58, 76]] as const;
  return makeCategories(revision, state, count).map((item, i) => {
    const ring = { ...item, value: state === "zero" ? 0 : values[revision % 3]![i]!, maxValue: 100,
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
  const values = [[84, 92, 68, 78, 61], [67, 78, 91, 64, 82], [76, 61, 73, 93, 70], [92, 70, 58, 76, 88], [61, 86, 82, 71, 95]] as const;
  const changes = [[0, 0, 0, 0, 0], [4, -3, 6, 3, 5], [-3, 3, 8, -5, 2]] as const;
  return makeCategories(revision, state, count).map((item, i) => ({
    label: item.label, color: item.color,
    values: Object.fromEntries(RADAR_METRICS.map((metric, j) => [metric.key, state === "zero" ? 0 : values[i]![j]! + changes[revision % 3]![j]!])),
  }));
}

export function makeFunnel(revision = 0, state: ChartState = "normal") {
  if (state === "empty") return [];
  const values = [[1000, 840, 650, 480], [1120, 930, 740, 560], [980, 800, 610, 430]] as const;
  return ["进入课程", "观看视频", "完成练习", "完成学习"].slice(0, state === "single" ? 1 : 4).map((label, i) => ({
    label: exampleLabel(label, state), value: state === "zero" ? 0 : values[revision % 3]![i]!,
  }));
}

export function makeFlow(revision = 0, state: ChartState = "normal") {
  if (state === "empty") return { nodes: [], links: [] };
  if (state === "single") return { nodes: [{ name: "课程入口", key: "课程入口" }, { name: "完成学习", key: "完成学习" }], links: [{ source: 0, target: 1, value: [420, 510, 460][revision % 3]! }] };
  const nodes = ["课程入口", "学习提醒", "观看视频", "阅读资料", "完成学习", "继续学习"].map(name => ({
    name: exampleLabel(name, state), key: name,
  }));
  const values = [[360, 180, 100, 140, 320, 140, 210, 110], [330, 210, 140, 90, 360, 110, 180, 120], [280, 240, 160, 110, 290, 150, 240, 110]] as const;
  const links = [[0, 2], [0, 3], [1, 2], [1, 3], [2, 4], [2, 5], [3, 4], [3, 5]].map(([source, target], index) => ({
    source: source!, target: target!, value: state === "zero" ? 0 : values[revision % 3]![index]!,
  }));
  return { nodes, links };
}

export function flowColor(node: { name: string; key?: string }) {
  const key = node.key ?? node.name.split(" · ")[0];
  const palette: Record<string, string> = { "课程入口": "var(--chart-1)", "学习提醒": "var(--chart-3)", "观看视频": "var(--chart-2)", "阅读资料": "var(--chart-1)", "完成学习": "var(--chart-3)", "继续学习": "var(--chart-2)" };
  return palette[key!] ?? "var(--chart-4)";
}

export function applyPieBoundary<T extends { label: string; value: number }>(data: T[], scenario: ChartBoundaryScenario): T[] {
  if (scenario === "pie-remove") return data.filter((_, index) => index !== 1);
  if (scenario !== "pie-small" || data.length < 2) return data;
  const middle = data.slice(1, -1).reduce((sum, item) => sum + item.value, 0);
  return data.map((item, index) => ({ ...item,
    value: index === 0 ? 999 - middle : index === data.length - 1 ? 1 : item.value,
    label: index === data.length - 1 ? `${item.label}·跨学科课程教学与实践研究小组` : item.label,
  }));
}

export function applyRingBoundary<T extends { value: number; maxValue: number }>(data: T[], scenario: ChartBoundaryScenario): T[] {
  if (!["ring-zero", "ring-full", "ring-zero-goal", "ring-over"].includes(scenario)) return data;
  return data.map((item, index) => index ? item : { ...item,
    value: scenario === "ring-full" ? 100 : scenario === "ring-over" ? 120 : 0,
    maxValue: scenario === "ring-zero-goal" ? 0 : 100,
  });
}

export function applyFunnelBoundary(data: { label: string; value: number }[], scenario: ChartBoundaryScenario): { label: string; value: number | null }[] {
  if (!scenario.startsWith("funnel-") || data.length < 3) return data;
  return data.map((stage, index) => ({ ...stage, value:
    scenario === "funnel-zero-entry" && index === 0 ? 0 :
    scenario === "funnel-missing" && index === 2 ? null :
    scenario === "funnel-growth" && index === 2 ? Math.round((data[0]!.value + data[1]!.value) / 2) :
    scenario === "funnel-above-entry" && index === 2 ? Math.round(data[0]!.value * 1.1) : stage.value,
  }));
}

export function applyFlowBoundary(data: ReturnType<typeof makeFlow>, scenario: ChartBoundaryScenario): ReturnType<typeof makeFlow> {
  if (scenario !== "sankey-thin" && scenario !== "sankey-zero-link") return data;
  const source = data.nodes.findIndex(node => node.key === "观看视频");
  const origin = source < 0 ? data.nodes.findIndex(node => node.key === "课程入口") : source;
  const completed = data.links.findIndex(link => link.source === origin && data.nodes[link.target]?.key === "完成学习");
  const continuing = data.links.findIndex(link => link.source === origin && data.nodes[link.target]?.key === "继续学习");
  if (completed < 0 || continuing < 0) return data;
  const total = data.links[completed]!.value + data.links[continuing]!.value;
  const thin = scenario === "sankey-thin" ? 1 : 0;
  return { ...data, links: data.links.map((link, index) => index === completed ? { ...link, value: total - thin } : index === continuing ? { ...link, value: thin } : link) };
}

export type HierarchyNode = { name: string; value?: number; color?: string; children?: HierarchyNode[] };
export function makeHierarchy(revision = 0, state: ChartState = "normal"): HierarchyNode {
  const values = [
    [[164, 90, 76], [118, 156, 92], [204, 122, 148]],
    [[138, 112, 84], [176, 104, 132], [162, 194, 116]],
    [[182, 96, 132], [124, 168, 108], [212, 142, 104]],
  ] as const;
  return { name: "学习内容", children: state === "empty" ? [] : ["基础课程", "进阶课程", "应用课程"].slice(0, state === "single" ? 1 : 3).map((name, i) => ({
    name: exampleLabel(name, state), color: SERIES[i]!.color,
    children: ["视频", "阅读", "练习"].map((leaf, j) => {
      const value = state === "zero" ? 0 : values[revision % 3]![i]![j]!;
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
  const levels = [[0, 1, 2, 3, 2, 0, 0], [0, 2, 3, 4, 3, 1, 0], [1, 2, 4, 3, 2, 1, 0]] as const;
  const weeks = [
    [0, 0, 1, 0, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 1, 0, 0],
    [0, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 0, 1, 0, 0],
  ] as const;
  return Array.from({ length: state === "single" ? 1 : 18 }, (_, week) => ({
    bin: week,
    bins: Array.from({ length: 7 }, (_, day) => ({
      bin: day, date: new Date(2026, 5, 7 + week * 7 + day),
      // -1 follows the native ghost/no-data contract; zero remains a valid reading.
      count: state === "missing" && day === 3 && week % 4 === 0 ? -1 : state === "zero" ? 0 : levels[weeks[revision % 3]![week]!]![day]!,
    })),
  }));
}

export type RegionProperties = { id: string; name: string; region: string; value?: number | null };
const world = JSON.parse(worldJson) as FeatureCollection<Geometry, RegionProperties>;
/** Natural Earth outlines with simulated readings; zero and missing remain distinct. */
export function makeRegions(revision = 0, state: ChartState = "normal"): FeatureCollection<Geometry, RegionProperties> {
  const regionalScores: Record<string, readonly [number, number, number]> = {
    Oceania: [62, 76, 54], Africa: [42, 56, 48], "North America": [78, 66, 84], Asia: [68, 82, 74],
    "South America": [55, 68, 61], Europe: [82, 74, 88], "Seven seas (open ocean)": [20, 26, 18], Antarctica: [12, 18, 10],
  };
  return { ...world, features: state === "empty" ? [] : world.features.slice(0, state === "single" ? 1 : undefined).map((feature, index) => {
    const key = Number(feature.properties.id);
    const regionalScore = (regionalScores[feature.properties.region] ?? [50, 58, 46])[revision % 3]!;
    const value = state === "zero" ? 0 : key % 7 === 0 || state === "missing" && index % 4 === 0 ? null : key % 11 === 0 ? 0 : regionalScore + key % 19 - 9;
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
  const closes = [
    [116, 121, 127, 134, 134, 137, 135, 130, 124, 124, 119, 116, 119, 124, 124, 130, 135, 137, 133, 133],
    [121, 125, 132, 137, 137, 135, 131, 125, 122, 122, 124, 129, 136, 141, 141, 140, 136, 131, 133, 133],
    [114, 121, 126, 128, 128, 125, 119, 114, 116, 116, 120, 127, 133, 136, 136, 134, 130, 124, 121, 121],
  ] as const;
  const step = revision % 3;
  return Array.from({ length: state === "single" ? 1 : 20 }, (_, i) => {
    const open = state === "zero" ? 0 : i === 0 ? [112, 118, 108][step]! : closes[step]![i - 1]!;
    const close = state === "zero" ? 0 : closes[step]![i]!;
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
  const values = [
    [-28, -19, -6, 10, 27, 43, 55, 61, 60, 52, 38, 21, 2, -17, -29, -35, -33, -24, -9, 9, 28, 45, 57, 62],
    [-12, 1, 16, 34, 51, 65, 73, 75, 70, 59, 43, 24, 4, -14, -29, -40, -44, -40, -29, -12, 8, 27, 42, 50],
    [-42, -34, -21, -5, 12, 29, 43, 51, 52, 45, 33, 16, 1, -15, -26, -31, -27, -15, 3, 24, 44, 60, 70, 73],
  ] as const;
  return Array.from({ length: state === "single" ? 1 : 24 }, (_, i) => ({
    date: new Date(2026, 8, i + 1), value: state === "zero" ? 0 : values[revision % 3]![i]!,
  }));
}

export function makeLivePoints(now = Math.floor(Date.now() / 1000), revision = 0, state: ChartState = "normal") {
  if (state === "empty") return [];
  const length = state === "single" ? 1 : 60;
  return Array.from({ length }, (_, i) => {
    const time = now - length + 1 + i;
    return { time, value: state === "zero" ? 0 : Math.round(90 + Math.sin(time * .075) * 22 + Math.cos(time * .035) * 6 + [0, 9, 4][revision % 3]!) };
  });
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
    if (point.completed > point.enrolled || point.rate !== point.completed / point.enrolled * 100) {
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
