import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import {
  PROFIT_LOSS_NEGATIVE_COLOR,
  PROFIT_LOSS_POSITIVE_COLOR,
  ProfitLossLine,
} from "./vendor/charts/profit-loss-line";
import { splitProfitLossSegments } from "./vendor/charts/profit-loss-segments";
import { StaticChartPreviewProvider } from "./vendor/charts/static-chart-preview-context";
import { TimeSeriesChartInner } from "./vendor/charts/time-series-chart-shell";

const dateAccessor = (point: Record<string, unknown>) => point.date as Date;
const makeRows = (values: number[]) => values.map((value, index) => ({
  date: new Date(Date.UTC(2026, 8, index + 1)),
  value,
}));

test.each([
  { values: [-1, 0, 1], expected: [[false, [-1, 0]], [true, [0, 1]]] },
  { values: [1, 0, -1], expected: [[true, [1, 0]], [false, [0, -1]]] },
  { values: [-2, 0, 0, 3], expected: [[false, [-2, 0, 0]], [true, [0, 3]]] },
  { values: [2, 0, 0, -3], expected: [[true, [2, 0, 0]], [false, [0, -3]]] },
  { values: [-1, 0, 1, 0, -2], expected: [[false, [-1, 0]], [true, [0, 1, 0]], [false, [0, -2]]] },
  { values: [1, 0, -1, 0, 2], expected: [[true, [1, 0]], [false, [0, -1, 0]], [true, [0, 2]]] },
])("exact-zero sign changes retain every observation in correctly signed contiguous segments: $values", ({ values, expected }) => {
  const segments = splitProfitLossSegments({ data: makeRows(values), dataKey: "value", xAccessor: dateAccessor });
  expect(segments.map(segment => [segment.isPositive, segment.data.map(point => point.value)])).toEqual(expected);
});

test.each([
  [-2, 0, -3],
  [2, 0, 3],
  [-2, 0, 0, -3],
  [2, 0, 0, 3],
])("touching zero without changing sign does not fragment the original series: %s", (...values) => {
  const data = makeRows(values);
  expect(splitProfitLossSegments({ data, dataKey: "value", xAccessor: dateAccessor })).toEqual([
    { data, isPositive: values[0]! > 0 },
  ]);
});

test.each([
  { values: [0, 0, -3, 0, 0], positive: false },
  { values: [0, 0, 3, 0, 0], positive: true },
  { values: [0, 0, 0], positive: true },
  { values: [-1], positive: false },
  { values: [0], positive: true },
  { values: [1], positive: true },
])("leading, trailing and all-zero observations retain the existing initial-sign rule: $values", ({ values, positive }) => {
  const data = makeRows(values);
  expect(splitProfitLossSegments({ data, dataKey: "value", xAccessor: dateAccessor })).toEqual([
    { data, isPositive: positive },
  ]);
});

test("empty observations produce no signed segment", () => {
  expect(splitProfitLossSegments({ data: [], dataKey: "value", xAccessor: dateAccessor })).toEqual([]);
});

test("an exact-zero boundary shares the original row without mutating dates or observations", () => {
  const data = makeRows([-2, 0, 3]);
  const before = data.map(point => ({ date: point.date.getTime(), value: point.value }));
  data.forEach(Object.freeze);
  const segments = splitProfitLossSegments({ data, dataKey: "value", xAccessor: dateAccessor });
  expect(segments).toHaveLength(2);
  expect(segments[0]!.data[0]).toBe(data[0]);
  expect(segments[0]!.data.at(-1)).toBe(data[1]);
  expect(segments[1]!.data[0]).toBe(data[1]);
  expect(segments[1]!.data.at(-1)).toBe(data[2]);
  expect(data.map(point => ({ date: point.date.getTime(), value: point.value }))).toEqual(before);
});

test.each([
  { kind: "Date", data: [{ date: new Date(1000), value: -2, label: "first" }, { date: new Date(9000), value: 6, label: "last" }], accessor: dateAccessor },
  { kind: "numeric timestamp", data: [{ date: 1000, value: -2, label: "first" }, { date: 9000, value: 6, label: "last" }], accessor: (point: Record<string, unknown>) => new Date(point.date as number) },
  { kind: "ISO timestamp", data: [{ date: new Date(1000).toISOString(), value: -2, label: "first" }, { date: new Date(9000).toISOString(), value: 6, label: "last" }], accessor: (point: Record<string, unknown>) => new Date(point.date as string) },
])("nonzero crossings preserve the original Date interpolation contract for $kind input", ({ data, accessor }) => {
  const segments = splitProfitLossSegments({ data, dataKey: "value", xAccessor: accessor });
  expect(segments.map(segment => segment.isPositive)).toEqual([false, true]);
  const crossing = segments[0]!.data.at(-1);
  expect(crossing).toEqual({ date: new Date(3000), value: 0, label: "first" });
  expect(segments[1]!.data[0]).toBe(crossing);
  expect(segments[0]!.data[0]).toBe(data[0]);
  expect(segments[1]!.data.at(-1)).toBe(data[1]);
});

test("custom x/data keys retain numeric zero-boundary identity without inventing a Date", () => {
  const data = [{ observedAt: 1000, net: 1 }, { observedAt: 2000, net: 0 }, { observedAt: 3000, net: -1 }];
  const segments = splitProfitLossSegments({ data, dataKey: "net", xDataKey: "observedAt", xAccessor: point => new Date(point.observedAt as number) });
  expect(segments.map(segment => segment.isPositive)).toEqual([true, false]);
  expect(segments[0]!.data.at(-1)).toBe(data[1]);
  expect(segments[1]!.data[0]).toBe(data[1]);
  expect(segments[1]!.data[0]!.observedAt).toBe(2000);
});

function chart(data: Record<string, unknown>[], xMode: "time" | "category" = "time", xDataKey = "date") {
  return <StaticChartPreviewProvider><TimeSeriesChartInner
    width={380} height={200} data={data} xDataKey={xDataKey} xMode={xMode}
    margin={{ left: 40, right: 40, top: 20, bottom: 30 }}
    animationDuration={0} yDomainTween={false} clipPathId="profit-loss-boundary-test"
    containerRef={{ current: null }}
    lines={[{ dataKey: "value", stroke: "currentColor", strokeWidth: 2 }]}
  ><ProfitLossLine dataKey="value" xDataKey={xDataKey} /></TimeSeriesChartInner></StaticChartPreviewProvider>;
}

test("the real profit/loss renderer uses both existing sign colors across an exact zero", () => {
  const view = render(chart(makeRows([-1, 0, 1])));
  const paths = [...view.container.querySelectorAll('[data-slot="profit-loss-line"] path')];
  expect(paths.map(path => path.getAttribute("stroke"))).toEqual([PROFIT_LOSS_NEGATIVE_COLOR, PROFIT_LOSS_POSITIVE_COLOR]);
  expect(paths.every(path => !/NaN|Infinity/.test(path.getAttribute("d") ?? ""))).toBe(true);
});

test("categorical profit/loss remains explicitly unsupported by the actual chart API", () => {
  const data = [{ id: "spring", value: -1 }, { id: "autumn", value: 0 }, { id: "next", value: 1 }];
  expect(() => render(chart(data, "category", "id"))).toThrow(/Category charts do not support time-only ProfitLossLine/);
});
