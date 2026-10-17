import { curveLinear } from "@visx/curve";
import { scaleLinear, scaleTime } from "@visx/scale";
import { render } from "@testing-library/react";
import { createRef, type ReactNode } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { Area } from "./vendor/charts/area";
import { ChartProvider, type ChartContextValue, type TooltipData } from "./vendor/charts/chart-context";
import { createCategoryScale } from "./vendor/charts/category-scale";
import { DashTailStroke } from "./vendor/charts/dash-tail-stroke";
import { Line } from "./vendor/charts/line";
import { LineSeriesTerminalMarker } from "./vendor/charts/line-series-terminal-marker";
import { PatternArea } from "./vendor/charts/pattern-area";
import { ChartTooltip } from "./vendor/charts/tooltip/chart-tooltip";
import {
  computeSeriesPathPoints,
  interpolateSeriesPathPoints,
  seriesPathFromPoints,
} from "./vendor/charts/series-path-utils";

const dates = [0, 1, 2].map((index) => new Date(2026, 0, index + 1));
const xAccessor = (row: Record<string, unknown>) => row.date as Date;
const xScale = scaleTime<number>({ domain: [dates[0]!, dates[2]!], range: [0, 200] });
const yScale = scaleLinear<number>({ domain: [0, 3], range: [100, 0] });
const rows = (values: (number | null)[]) => values.map((value, index) => ({ date: dates[index], value }));
const points = (values: (number | null)[]) => computeSeriesPathPoints(rows(values), xAccessor, xScale, yScale, "value");

beforeEach(() => {
  Object.defineProperty(SVGElement.prototype, "getTotalLength", { configurable: true, value: () => 200 });
});

test("static path preserves a missing middle value as two segments", () => {
  const path = seriesPathFromPoints(points([1, null, 3]), curveLinear);
  expect(path.match(/M/g)).toHaveLength(2);
  expect(path).not.toMatch(/NaN|Infinity/);
});

test("zero series remains drawable and all-missing series has no path", () => {
  expect(seriesPathFromPoints(points([0, 0, 0]), curveLinear)).toContain("L");
  expect(seriesPathFromPoints(points([null, null, null]), curveLinear)).toBe("");
});

test.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])("rejects invalid series value %s", (value) => {
  expect(() => points([1, value, 3])).toThrow(/finite/i);
});

test("interrupted updates and category reorder retain target gaps and stable identities", () => {
  const categoryPoints = (values: Record<string, unknown>[]) => computeSeriesPathPoints(
    values, (row) => String(row.id), (id) => ({ a: 0, b: 100, c: 200 })[id], yScale, "value"
  );
  const from = categoryPoints([{ id: "a", value: 1 }, { id: "b", value: 2 }, { id: "c", value: 3 }]);
  const to = categoryPoints([{ id: "c", value: 2 }, { id: "b", value: null }, { id: "a", value: 3 }]);
  const middle = interpolateSeriesPathPoints(from, to, 0.5);
  expect(middle.map((point) => point.key)).toEqual(["c", "b", "a"]);
  expect(seriesPathFromPoints(middle, curveLinear).match(/M/g)).toHaveLength(2);
  expect(seriesPathFromPoints(interpolateSeriesPathPoints(middle, to, 0.5), curveLinear).match(/M/g)).toHaveLength(2);
});

function ChartFixture({ children, values = [1, null, 3], category = false, hoveredIndex }: { children: ReactNode; values?: (number | null)[]; category?: boolean; hoveredIndex?: number }) {
  const data = rows(values).map((row, index) => ({ ...row, id: String(index), label: `分类 ${index}` }));
  const containerRef = createRef<HTMLDivElement>();
  const tooltipData: TooltipData | null = hoveredIndex === undefined ? null : { point: data[hoveredIndex]!, index: hoveredIndex, x: hoveredIndex * 100, yPositions: { value: 0 } };
  const value: ChartContextValue = {
    data, renderData: data, xScale, yScale, yScales: { left: yScale },
    width: 200, height: 100, innerWidth: 200, innerHeight: 100,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }, columnWidth: 100,
    containerRef, lines: [{ dataKey: "value", stroke: "blue", strokeWidth: 2 }], referenceAreas: [],
    chartPhase: "ready", chartStatus: "ready", yDomainTweenDuration: 0,
    yDomainSkeletonByAxis: { left: [0, 3] }, yDomainTargetByAxis: { left: [0, 3] },
    isLoaded: true, animationDuration: 0,
    xAccessor: category ? () => { throw new Error("category entered time accessor"); } : xAccessor,
    xMode: category ? "category" : "time",
    categoryScale: category ? createCategoryScale(data, "id", 200) : undefined,
    categoryAccessor: category ? (datum) => String(datum.id) : undefined,
    xLabel: category ? (datum) => String(datum.label) : undefined,
    dateLabels: [], tooltipData, setTooltipData: vi.fn(),
  };
  return <div ref={containerRef}><ChartProvider value={value}><svg>{children}</svg></ChartProvider></div>;
}

test.each([
  ["Line", <Line animate={false} curve={curveLinear} dataKey="value" fadeEdges={false} showHighlight={false} />],
  ["Area", <Area animate={false} curve={curveLinear} dataKey="value" showHighlight={false} />],
  ["PatternArea", <PatternArea curve={curveLinear} dataKey="value" fill="url(#pattern)" />],
])("%s renders missing data as disconnected geometry", (_name, child) => {
  const view = render(<ChartFixture>{child}</ChartFixture>);
  const paths = [...view.container.querySelectorAll("path[d]")];
  expect(paths.length).toBeGreaterThan(0);
  for (const path of paths) expect(path.getAttribute("d")?.match(/M/g)).toHaveLength(2);
});

test("category geometry, markers and terminal marker avoid time accessors", () => {
  const view = render(<ChartFixture category><Line animate={false} curve={curveLinear} dataKey="value" fadeEdges={false} showMarkers /><Area animate={false} dataKey="value" /><PatternArea dataKey="value" fill="url(#pattern)" /><LineSeriesTerminalMarker dataKey="value" /></ChartFixture>);
  const paths = [...view.container.querySelectorAll("path[d]")];
  expect(paths.length).toBeGreaterThan(2);
  for (const path of paths) expect(path.getAttribute("d")).not.toMatch(/NaN|Infinity/);
});

test("missing tooltip values create no fake zero rows or dots", () => {
  const view = render(<ChartFixture hoveredIndex={1}><ChartTooltip showCrosshair={false} showDatePill={false} /></ChartFixture>);
  expect(view.container.querySelectorAll("circle")).toHaveLength(0);
  expect(view.queryByText("value")).toBeNull();
});

test("category tooltip uses the category label", () => {
  const view = render(<ChartFixture category hoveredIndex={0}><ChartTooltip showCrosshair={false} showDatePill={false} /></ChartFixture>);
  expect(view.getByText("分类 0")).toBeInTheDocument();
  expect(view.getByText("1")).toBeInTheDocument();
});

test("a dashed tail clips the solid head before the boundary even across missing segments", () => {
  const view = render(<svg><DashTailStroke pathD="M0,80L40,70M140,30L200,20" pathLength={105} dashStartLength={70} dashStartX={150} innerWidth={200} innerHeight={100} stroke="blue" strokeWidth={2} dashArray="6,4" /></svg>);
  const head = view.container.querySelector("path");
  expect(head).toHaveAttribute("clip-path");
  const clipId = head!.getAttribute("clip-path")!.slice(5, -1);
  const clip = view.container.querySelector(`[id="${clipId}"] rect`);
  expect(clip).toHaveAttribute("width", "154");
});

test("series still renders when the host lacks SVG path measurements", () => {
  Reflect.deleteProperty(SVGElement.prototype, "getTotalLength");
  const view = render(<ChartFixture><Area dataKey="value" animate={false} showHighlight={false} /></ChartFixture>);
  expect(view.container.querySelector("path[d]")!.getAttribute("d")?.match(/M/g)).toHaveLength(2);
});
