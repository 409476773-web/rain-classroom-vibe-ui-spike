import { line as d3Line } from "d3-shape";

// biome-ignore lint/suspicious/noExplicitAny: d3 curve factory type
type CurveFactory = any;

export interface SeriesPathPoint {
  x: number;
  y: number | null;
  key: string;
}

export function getSeriesValue(datum: Record<string, unknown>, dataKey: string): number | null {
  const value = datum[dataKey];
  if (typeof value !== "number") return null;
  if (!Number.isFinite(value)) throw new Error(`Chart series ${dataKey} requires finite values or null.`);
  return value;
}

export function computeSeriesPathPoints<X extends Date | string | number>(
  data: Record<string, unknown>[],
  xAccessor: (datum: Record<string, unknown>) => X,
  xScale: (value: X) => number | undefined,
  yScale: (value: number) => number | undefined,
  dataKey: string,
  keyAccessor?: (datum: Record<string, unknown>) => string
): SeriesPathPoint[] {
  return data.map((datum) => {
    const xValue = xAccessor(datum);
    const yValue = getSeriesValue(datum, dataKey);
    return {
      x: xScale(xValue) ?? 0,
      y: yValue === null ? null : (yScale(yValue) ?? 0),
      key: keyAccessor?.(datum) ?? String(xValue instanceof Date ? xValue.getTime() : xValue),
    };
  });
}

export function interpolateSeriesPathPoints(
  from: SeriesPathPoint[],
  to: SeriesPathPoint[],
  progress: number
): SeriesPathPoint[] {
  if (progress >= 1) {
    return to;
  }
  const fromByKey = new Map(from.map((point) => [point.key, point]));

  return to.map((target, index) => {
    if (target.y === null) return target;
    const source = fromByKey.get(target.key);
    if (source && source.y !== null) {
      return {
        key: target.key,
        x: source.x + (target.x - source.x) * progress,
        y: source.y + (target.y - source.y) * progress,
      };
    }

    const previousTarget = index > 0 ? to[index - 1] : undefined;
    const previousSource = previousTarget
      ? fromByKey.get(previousTarget.key)
      : undefined;
    const nextTarget = index < to.length - 1 ? to[index + 1] : undefined;
    const nextSource = nextTarget ? fromByKey.get(nextTarget.key) : undefined;
    const anchor = [previousSource, nextSource, from[0]].find((point) => point && point.y !== null) ?? target;

    return {
      key: target.key,
      x: anchor.x + (target.x - anchor.x) * progress,
      y: (anchor.y ?? target.y) + (target.y - (anchor.y ?? target.y)) * progress,
    };
  });
}

export function seriesPathFromPoints(
  points: SeriesPathPoint[],
  curve: CurveFactory
): string {
  if (points.length === 0) {
    return "";
  }

  const generator = d3Line<SeriesPathPoint>()
    .defined((point) => point.y !== null)
    .x((point) => point.x)
    .y((point) => point.y ?? 0)
    .curve(curve);

  return generator(points) ?? "";
}
