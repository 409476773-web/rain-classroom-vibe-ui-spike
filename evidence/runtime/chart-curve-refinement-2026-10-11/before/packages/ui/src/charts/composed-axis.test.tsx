import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { scaleLinear, scaleTime } from "@visx/scale";
import type { ReactNode } from "react";
import { afterAll, beforeAll, expect, test, vi } from "vitest";
import { ChartProvider, useChart, type ChartContextValue } from "./vendor/charts/chart-context";
import { createCategoryScale } from "./vendor/charts/category-scale";
import { ComposedChart, type ComposedChartProps } from "./vendor/charts/composed-chart";
import { Line } from "./vendor/charts/line";
import { SeriesBar } from "./vendor/charts/series-bar";
import { StaticChartPreviewProvider } from "./vendor/charts/static-chart-preview-context";
import { TimeSeriesChartInner } from "./vendor/charts/time-series-chart-shell";

vi.mock("@visx/responsive", () => ({ ParentSize: ({ children }: { children: (size: { width: number; height: number }) => ReactNode }) => children({ width: 400, height: 200 }) }));
beforeAll(() => Object.defineProperty(SVGElement.prototype, "getTotalLength", { configurable: true, value: () => 100 }));
afterAll(() => Reflect.deleteProperty(SVGElement.prototype, "getTotalLength"));

const margin = { top: 0, right: 0, bottom: 0, left: 0 };
const rows = [{ date: "2026-01-01", first: 40, second: 60, rate: 40 }];

function DomainProbe() {
  const { yScales, yDomainTargetByAxis, tooltipData } = useChart();
  return <g data-testid="domains" data-domains={JSON.stringify(yDomainTargetByAxis)} data-right-position={yScales.right?.(40)} data-tooltip={JSON.stringify(tooltipData)} />;
}

function plot(props: Partial<ComposedChartProps> = {}, children: ReactNode = [<SeriesBar key="first" dataKey="first" animate={false} />, <SeriesBar key="second" dataKey="second" animate={false} />, <Line key="rate" dataKey="rate" yAxisId="right" animate={false} />]) {
  return <StaticChartPreviewProvider><ComposedChart data={rows} margin={margin} animationDuration={0} {...props}>{children}<DomainProbe /></ComposedChart></StaticChartPreviewProvider>;
}

const rects = (container: HTMLElement) => [...container.querySelectorAll("g.series-bar rect")];

async function hover(view: ReturnType<typeof render>, x: number) {
  fireEvent.mouseMove(view.container.querySelector("svg > g")!, { clientX: x, clientY: 100 });
  await waitFor(() => expect(view.getByTestId("domains")).not.toHaveAttribute("data-tooltip", "null"));
  return JSON.parse(view.getByTestId("domains").getAttribute("data-tooltip")!);
}

test.each(["time", "category"] as const)("%s left stack totals stay on the left axis while the percentage axis stays exact", xMode => {
  const view = render(plot({ data: [{ ...rows[0], id: "class-one" }], xDataKey: xMode === "time" ? "date" : "id", xMode, stacked: true, yDomains: { right: [0, 100] } }));
  const domains = JSON.parse(view.getByTestId("domains").getAttribute("data-domains")!);
  expect(domains.left[1]).toBeGreaterThanOrEqual(100);
  expect(domains.right).toEqual([0, 100]);
  const bars = rects(view.container);
  expect(Number(bars[0]!.getAttribute("y"))).toBeCloseTo(Number(bars[1]!.getAttribute("y")) + parseFloat(bars[1]!.getAttribute("height")!));
  expect(Number(bars[1]!.getAttribute("y"))).toBeGreaterThanOrEqual(0);
  expect(view.getByTestId("domains")).toHaveAttribute("data-right-position", "120");
});

test("stacked quantities do not replace automatic domains on another axis", () => {
  const view = render(plot({ data: [{ date: "2026-01-01", first: 40, second: 60, rate: -30 }, { date: "2026-01-02", first: 20, second: 30, rate: 40 }], stacked: true }));
  const domains = JSON.parse(view.getByTestId("domains").getAttribute("data-domains")!);
  expect(domains.right[0]).toBeLessThan(-30);
  expect(domains.right[1]).toBeGreaterThan(40);
});

test("SeriesBar uses its own axis for grouped geometry and tooltip anchors", async () => {
  const view = render(plot({ data: [{ date: "2026-01-01", first: 1000, rate: 40 }], yDomains: { left: [0, 1000], right: [0, 100] } }, [<SeriesBar key="first" dataKey="first" animate={false} />, <SeriesBar key="rate" dataKey="rate" yAxisId="right" animate={false} />]));
  expect(rects(view.container).map(rect => parseFloat(rect.getAttribute("height")!))).toEqual([200, 80]);
  expect(rects(view.container).map(rect => Number(rect.getAttribute("y")))).toEqual([0, 120]);
  const tooltip = await hover(view, 200);
  expect(tooltip.point.rate).toBe(40);
  expect(tooltip.yPositions.rate).toBe(120);
  const rightBar = rects(view.container)[1]!;
  expect(tooltip.xPositions.rate).toBeCloseTo(Number(rightBar.getAttribute("x")) + parseFloat(rightBar.getAttribute("width")!) / 2);
});

test.each(["time", "category"] as const)("%s stacked tooltip anchors use segment tops and preserve raw values", async xMode => {
  const view = render(plot({ data: [{ ...rows[0], id: "class-one" }, { date: "2026-01-02", id: "class-two", first: 20, second: 30, rate: 20 }], xMode, xDataKey: xMode === "time" ? "date" : "id", stacked: true, barSize: 20, yDomains: { left: [0, 100], right: [0, 100] } }));
  const tooltip = await hover(view, xMode === "time" ? 1 : 100);
  const secondSegment = view.container.querySelectorAll("g.series-bar")[1]!.querySelector("rect")!;
  expect(tooltip.point.second).toBe(60);
  expect(tooltip.yPositions.second).toBe(Number(secondSegment.getAttribute("y")));
  expect(tooltip.xPositions.second).toBeCloseTo(Number(secondSegment.getAttribute("x")) + parseFloat(secondSegment.getAttribute("width")!) / 2);
  expect(tooltip.yPositions.rate).toBe(120);
});

test("fixed domains retain exact endpoints without nice expansion", () => {
  const view = render(plot({ data: [{ date: "2026-01-01", first: 7 }], yDomains: { left: [0, 13] } }, <SeriesBar dataKey="first" animate={false} />));
  expect(JSON.parse(view.getByTestId("domains").getAttribute("data-domains")!).left).toEqual([0, 13]);
  expect(parseFloat(rects(view.container)[0]!.getAttribute("height")!)).toBeCloseTo(200 * 7 / 13);
});

test.each([[1, 100], [0, 0], [0, -1], [0, Infinity], [0, NaN]])("invalid fixed domain %j is rejected", (min, max) => {
  expect(() => render(plot({ yDomains: { right: [min, max] as [0, number] } }))).toThrow(/yDomains/);
});

test("a stacked bar group cannot mix quantities and percentages across axes", () => {
  expect(() => render(plot({ stacked: true }, [<SeriesBar key="first" dataKey="first" />, <SeriesBar key="rate" dataKey="rate" yAxisId="right" />]))).toThrow(/stack.*same.*axis/i);
});

test("null bars are omitted and zero bars remain valid", () => {
  const view = render(plot({ data: [{ date: "2026-01-01", first: null }, { date: "2026-01-02", first: 0 }], yDomains: { left: [0, 100] } }, <SeriesBar dataKey="first" animate={false} />));
  expect(rects(view.container)).toHaveLength(1);
  expect(parseFloat(rects(view.container)[0]!.getAttribute("height")!)).toBe(0);
});

test.each([NaN, Infinity, -Infinity])("non-finite values are rejected at the composed data boundary", value => {
  expect(() => render(plot({ data: [{ date: "2026-01-01", first: value }] }, <SeriesBar dataKey="first" animate={false} />))).toThrow(/finite/i);
});

test("overflowing finite stack segments are rejected", () => {
  expect(() => render(plot({ data: [{ date: "2026-01-01", first: Number.MAX_VALUE, second: Number.MAX_VALUE }], stacked: true }, [<SeriesBar key="first" dataKey="first" />, <SeriesBar key="second" dataKey="second" />]))).toThrow(/stack totals.*finite/i);
});

const nextPaint = () => act(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
const motionRows = [{ id: "a", first: 40 }, { id: "b", first: 60 }];
function SeriesMotionFixture({ data = motionRows, isLoaded = true, animate = true, revealEpoch = 0, barSize = 20 }: { data?: Record<string, unknown>[]; isLoaded?: boolean; animate?: boolean; revealEpoch?: number; barSize?: number }) {
  const scale = scaleLinear<number>({ domain: [0, 100], range: [200, 0] });
  const context: ChartContextValue = {
    data, renderData: data, xMode: "category", categoryAccessor: datum => String(datum.id),
    categoryScale: createCategoryScale(data, "id", 400),
    xScale: scaleTime<number>({ domain: [0, 1], range: [0, 400] }), xAccessor: () => { throw new Error("category entered time accessor"); },
    yScale: scale, yScales: { left: scale }, width: 400, height: 200, innerWidth: 400, innerHeight: 200, margin, columnWidth: 200,
    containerRef: { current: null }, lines: [{ dataKey: "first", stroke: "blue", strokeWidth: 0 }], referenceAreas: [],
    chartPhase: isLoaded ? "ready" : "revealing", chartStatus: "ready", yDomainTweenDuration: 250,
    yDomainSkeletonByAxis: { left: [0, 100] }, yDomainTargetByAxis: { left: [0, 100] },
    isLoaded, animationDuration: 250, enterTransition: { type: "tween", duration: .25, ease: "linear" }, revealEpoch,
    dateLabels: data.map(datum => String(datum.id)), tooltipData: null, setTooltipData: vi.fn(),
    composedBarDataKeys: ["first"], composedBarSize: barSize,
  };
  return <ChartProvider value={context}><svg><SeriesBar dataKey="first" animate={animate} /></svg></ChartProvider>;
}

test("SeriesBar keeps its rectangle when entry finishes and remounts only for replay", () => {
  const view = render(<SeriesMotionFixture isLoaded={false} />);
  const first = rects(view.container)[0]!;
  view.rerender(<SeriesMotionFixture isLoaded />);
  expect(rects(view.container)[0]).toBe(first);
  view.rerender(<SeriesMotionFixture revealEpoch={1} />);
  expect(rects(view.container)[0]).not.toBe(first);
});

test("SeriesBar interpolates geometry on stable category identity through update and reorder", async () => {
  const view = render(<SeriesMotionFixture />);
  const first = rects(view.container)[0]!;
  expect(parseFloat(first.getAttribute("height")!)).toBe(80);
  view.rerender(<SeriesMotionFixture data={[motionRows[1]!, { ...motionRows[0], first: 80 }]} barSize={40} />);
  expect(rects(view.container)[1]).toBe(first);
  expect(parseFloat(first.getAttribute("height")!)).toBeLessThan(160);
  expect(Number(first.getAttribute("x"))).toBeLessThan(280);
  await act(() => new Promise(resolve => setTimeout(resolve, 80)));
  expect(parseFloat(first.getAttribute("height")!)).toBeGreaterThan(80);
  expect(parseFloat(first.getAttribute("height")!)).toBeLessThan(160);
  expect(parseFloat(first.getAttribute("width")!)).toBeGreaterThan(20);
  expect(parseFloat(first.getAttribute("width")!)).toBeLessThan(40);
  await waitFor(() => {
    expect(parseFloat(first.getAttribute("height")!)).toBe(160);
    expect(parseFloat(first.getAttribute("width")!)).toBe(40);
    expect(first).toHaveAttribute("x", "280");
    expect(Number(first.getAttribute("y"))).toBeCloseTo(40);
  });
});

test("SeriesBar animate=false applies geometry by the next paint without replacing the rectangle", async () => {
  const view = render(<SeriesMotionFixture animate={false} />);
  const first = rects(view.container)[0]!;
  view.rerender(<SeriesMotionFixture animate={false} data={[motionRows[1]!, { ...motionRows[0], first: 80 }]} barSize={40} />);
  expect(rects(view.container)[1]).toBe(first);
  await nextPaint();
  expect(parseFloat(first.getAttribute("height")!)).toBe(160);
  expect(first).toHaveAttribute("x", "280");
});

test("SeriesBar disabling motion applies current geometry and retains it after the next frames", async () => {
  const view = render(<SeriesMotionFixture />);
  const first = rects(view.container)[0]!;
  view.rerender(<SeriesMotionFixture animate={false} data={[motionRows[1]!, { ...motionRows[0], first: 80 }]} barSize={40} />);
  expect(rects(view.container)[1]).toBe(first);
  await nextPaint();
  expect(parseFloat(first.getAttribute("height")!)).toBe(160);
  expect(Number(first.getAttribute("x"))).toBe(280);
  await nextPaint();
  expect(parseFloat(first.getAttribute("height")!)).toBe(160);
  expect(Number(first.getAttribute("x"))).toBe(280);
});

test("visible time subsets calculate stack offsets from the same rows as bars and tooltip", async () => {
  const view = render(<StaticChartPreviewProvider><TimeSeriesChartInner
    width={400} height={200} data={[{ date: "2026-01-01", first: 40, second: 60 }, { date: "2026-01-02", first: 20, second: 30 }]}
    xDataKey="date" xDomain={[new Date("2026-01-02"), new Date("2026-01-02")]}
    margin={margin} animationDuration={0} yDomainTween={false} clipPathId="subset-stack" containerRef={{ current: null }}
    lines={[{ dataKey: "first", stroke: "blue", strokeWidth: 0 }, { dataKey: "second", stroke: "red", strokeWidth: 0 }]}
    composedBarDataKeys={["first", "second"]} composedStacked yDomains={{ left: [0, 100] }}
  ><SeriesBar dataKey="first" animate={false} /><SeriesBar dataKey="second" animate={false} /><DomainProbe /></TimeSeriesChartInner></StaticChartPreviewProvider>);
  const bars = rects(view.container);
  expect(bars).toHaveLength(2);
  expect(bars.map(rect => parseFloat(rect.getAttribute("height")!))).toEqual([40, 60]);
  expect(Number(bars[0]!.getAttribute("y"))).toBeCloseTo(160);
  expect(Number(bars[1]!.getAttribute("y"))).toBeCloseTo(100);
  const tooltip = await hover(view, 200);
  expect(tooltip.point.first).toBe(20);
  expect(tooltip.yPositions.second).toBeCloseTo(100);
});

test("ComposedChart rejects negative selected bar quantities", () => {
  expect(() => render(plot({ data: [{ date: "2026-01-01", first: -1 }] }, <SeriesBar dataKey="first" animate={false} />))).toThrow(/ComposedChart.*non-negative/i);
});

test("direct SeriesBar contexts reject negative bar quantities", () => {
  expect(() => render(<SeriesMotionFixture data={[{ id: "a", first: -1 }]} animate={false} />)).toThrow(/SeriesBar.*non-negative/i);
});
