import { scalePoint } from "@visx/scale";
import type { ChartStableContextValue } from "./chart-context";
import { shortDateFmt } from "./chart-formatters";

type Datum = Record<string, unknown>;
type XContext = Pick<ChartStableContextValue, "xMode" | "categoryScale" | "categoryAccessor" | "xLabel" | "xScale" | "xAccessor">;

export function categoryId(datum: Datum, key: string): string {
  const id = datum[key];
  if (typeof id !== "string" || id.trim() === "") {
    throw new Error("Category ID must be a non-empty string");
  }
  return id;
}

export function createCategoryScale(data: Datum[], key: string, width: number) {
  const ids = data.map(datum => categoryId(datum, key));
  if (new Set(ids).size !== ids.length) {
    throw new Error("Duplicate category IDs are not supported");
  }
  return scalePoint<string>({ domain: ids, range: [0, width], padding: 0.5 });
}

export function nearestCategoryIndex(pixel: number, scale: ReturnType<typeof createCategoryScale>): number {
  const ids = scale.domain();
  if (!ids.length) return -1;
  const first = scale(ids[0]!) ?? 0;
  const step = scale.step();
  return Math.max(0, Math.min(ids.length - 1, step ? Math.round((pixel - first) / step) : 0));
}

export function getChartX(context: XContext, datum: Datum): number {
  return context.xMode === "category"
    ? (context.categoryScale?.(context.categoryAccessor!(datum)) ?? 0)
    : (context.xScale(context.xAccessor(datum)) ?? 0);
}

export function getChartXKey(context: XContext, datum: Datum): string {
  return context.xMode === "category"
    ? context.categoryAccessor!(datum)
    : String(context.xAccessor(datum).getTime());
}

export function getChartXLabel(context: XContext, datum: Datum): string {
  return context.xLabel?.(datum) ?? (context.xMode === "category"
    ? context.categoryAccessor!(datum)
    : shortDateFmt.format(context.xAccessor(datum)));
}
