export type BusinessChartState = "normal" | "empty" | "zero" | "single" | "long" | "missing" | "invalid";
export type MiniRow = { id: string; label: string; count: number | null; trend: (number | null)[]; parts: (number | null)[]; completed: number | null; goal: number };
export const MINI_PART_LABELS = ["已完成", "进行中", "待开始"];
const labels = ["计算机学院", "经济管理学院", "人文学院", "理学院", "外国语学院"];

export function makeMiniRows(revision = 0, state: BusinessChartState = "normal"): MiniRow[] {
  if (state === "empty") return [];
  const counts = [25, 50, 100, 75, 45];
  return labels.slice(0, state === "single" ? 1 : 5).map((label, index) => {
    const count = state === "zero" ? 0 : state === "missing" && index === 0 ? null : state === "invalid" && index === 0 ? NaN : index === 0 ? [25,75,50,25][revision % 4]! : counts[index]! + (index === 2 ? 0 : revision % 4 * 3);
    return { id: `college-${index + 1}`, label: state === "long" ? `${label}·跨学科创新与教学研究中心` : label, count,
      trend: Array.from({ length: 8 }, (_, slot) => count === null ? null : count === 0 ? 0 : Math.max(0, Math.round(count * (.35 + slot * .075) + (slot % 3 - 1) * 4))),
      parts: count === null ? [null, 3, 2] : [Math.round(count * .5), Math.round(count * .3), Math.max(0, count - Math.round(count * .5) - Math.round(count * .3))],
      completed: count === null ? null : state === "zero" ? 0 : Math.min(100, 20 + index * 15 + revision % 4 * 4), goal: state === "zero" ? 0 : 100 };
  });
}

export function getComparisonMax(rows: { count: number | null }[]): number {
  let max = 0;
  for (const { count } of rows) {
    if (count === null) continue;
    if (!Number.isFinite(count) || count < 0) throw new Error("数量必须是有限非负值或null");
    max = Math.max(max, count);
  }
  return max;
}

export function getTrendComparisonMax(rows: Pick<MiniRow, "trend">[]): number {
  let max = 0;
  for (const row of rows) {
    for (const value of row.trend) {
      if (value === null) continue;
      if (!Number.isFinite(value) || value < 0) throw new Error("每日数量必须是有限非负值或null");
      max = Math.max(max, value);
    }
  }
  return max;
}

export type MiniProgressState = "normal" | "zero" | "missing" | "invalid" | "inapplicable" | "overflow";
export function getProgressReading(value: number | null, maxValue: number): { state: MiniProgressState; fraction: number | null; percentText: string } {
  if (!Number.isFinite(maxValue) || maxValue < 0 || (value !== null && (!Number.isFinite(value) || value < 0 || (maxValue === 0 && value > 0)))) return { state: "invalid", fraction: null, percentText: "无效数据" };
  if (value === null) return { state: "missing", fraction: null, percentText: "缺测" };
  if (maxValue === 0) return { state: "inapplicable", fraction: null, percentText: "不适用" };
  if (value > maxValue) return { state: "overflow", fraction: null, percentText: "超出范围" };
  const fraction = value / maxValue;
  return { state: value === 0 ? "zero" : "normal", fraction, percentText: `${Math.round(fraction * 100)}%` };
}

export function selectMiniRows(original: MiniRow[], { many = false, descending = false, filter = false }: { many?: boolean; descending?: boolean; filter?: boolean }) {
  let rows = many && original.length ? Array.from({ length:40 },(_,index) => ({ ...original[index % original.length]!,id:`${original[index % original.length]!.id}-${index}`,label:`${original[index % original.length]!.label} ${index+1}` })) : original;
  if (filter) rows = rows.filter(row => (row.count ?? 0) >= 50);
  if (descending) rows = [...rows].sort((a,b) => (b.count ?? 0) - (a.count ?? 0));
  return rows;
}

export function compositionState(values: (number | null)[]) {
  if (!values.length) return "empty";
  if (values.some(value => value !== null && (!Number.isFinite(value) || value < 0))) return "invalid";
  if (values.includes(null)) return "missing";
  const total = values.reduce<number>((sum, value) => sum + (value ?? 0), 0);
  return !Number.isFinite(total) ? "invalid" : total === 0 ? "zero" : "normal";
}
