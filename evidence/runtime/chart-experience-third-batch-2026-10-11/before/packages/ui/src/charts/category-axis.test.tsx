import { fireEvent, render } from "@testing-library/react";
import { expect, test } from "vitest";
import { useChart, useChartStable } from "./vendor/charts/chart-context";
import { YAxis } from "./vendor/charts/y-axis";
import { XAxis } from "./vendor/charts/x-axis";
import { StaticChartPreviewProvider } from "./vendor/charts/static-chart-preview-context";
import { TimeSeriesChartInner } from "./vendor/charts/time-series-chart-shell";
import { ChartBrush } from "./vendor/charts/chart-brush";
import { createCategoryScale, nearestCategoryIndex } from "./vendor/charts/category-scale";

const data = [
  { id: "spring", label: "学期", value: 0 },
  { id: "autumn", label: "学期", value: 3 },
  { id: "next", label: "下一学期", value: null },
];

function Probe() {
  const context = useChartStable();
  return <text data-testid="positions">{JSON.stringify({
    mode: context.xMode,
    ids: context.categoryScale?.domain(),
    positions: context.data.map(datum => context.categoryScale?.(String(datum.id))),
    labels: context.dateLabels,
    renderCount: context.renderData.length,
  })}</text>;
}

function example(rows = data, extra = {}, children = <Probe />) {
  return <StaticChartPreviewProvider><TimeSeriesChartInner
    width={380} height={200} data={rows} xDataKey="id" xMode="category"
    xLabel={datum => String(datum.label)} margin={{ left: 40, right: 40, top: 20, bottom: 30 }}
    animationDuration={0} yDomainTween={false} clipPathId="category-test" containerRef={{ current: null }}
    lines={[{ dataKey: "value", stroke: "currentColor", strokeWidth: 2 }]} {...extra}
  >{children}</TimeSeriesChartInner></StaticChartPreviewProvider>;
}

test("categorical IDs retain input order, separate duplicate labels and use point centers", () => {
  const view = render(example());
  const result = JSON.parse(view.getByTestId("positions").textContent!);
  expect(result).toEqual({ mode: "category", ids: ["spring", "autumn", "next"], positions: [50, 150, 250], labels: ["学期", "学期", "下一学期"], renderCount: 3 });
  view.rerender(example([data[1]!, data[0]!]));
  expect(JSON.parse(view.getByTestId("positions").textContent!).ids).toEqual(["autumn", "spring"]);
});

test("single category is centered and empty loading invents no dated rows", () => {
  const view = render(example([data[0]!]));
  expect(JSON.parse(view.getByTestId("positions").textContent!).positions).toEqual([150]);
  view.rerender(example([], { chartStatus: "loading" }));
  expect(JSON.parse(view.getByTestId("positions").textContent!).ids).toEqual([]);
});

test("invalid or duplicate category IDs and time-only combinations fail explicitly", () => {
  expect(() => render(example([data[0]!, data[0]!]))).toThrow(/duplicate.*categor/i);
  expect(() => render(example([{ id: "", label: "空", value: 0 }]))).toThrow(/categor.*ID/i);
  expect(() => render(example(data, { xDomain: [new Date(), new Date()] }))).toThrow(/category.*time/i);
  expect(() => render(example(data, {}, <ChartBrush />))).toThrow(/category.*Brush/i);
});

test("dense categories are not time-decimated", () => {
  const rows = Array.from({ length: 900 }, (_, i) => ({ id: `course-${i}`, label: `课程${i}`, value: i }));
  const view = render(example(rows));
  expect(JSON.parse(view.getByTestId("positions").textContent!).renderCount).toBe(900);
});

test("nearest category hit keeps endpoint, single and empty behavior without parsing dates", () => {
  const scale = createCategoryScale(data, "id", 300);
  expect([-20, 50, 149, 249, 400].map(x => nearestCategoryIndex(x, scale))).toEqual([0, 0, 1, 2, 2]);
  expect(nearestCategoryIndex(20, createCategoryScale([], "id", 300))).toBe(-1);
  expect(nearestCategoryIndex(900, createCategoryScale([data[0]!], "id", 300))).toBe(0);
});

test("category column axes mount through their real portal without a date accessor", () => {
  const portal = document.createElement("div");
  document.body.append(portal);
  try {
    expect(() => render(example(data, { containerRef: { current: portal }, composedBarDataKeys: ["value"], composedBarSize: 20 }, <YAxis />))).not.toThrow();
    expect(portal.textContent).toContain("0");
  } finally { portal.remove(); }
});

function SelectFirst() {
  const context = useChart();
  return <g data-testid="hover-first" onClick={() => context.setTooltipData({ point: data[0]!, index: 0, x: 50, yPositions: { value: 0 } })} />;
}

test("hovering one category does not hide a distant category with the same label", () => {
  const portal = document.createElement("div");
  document.body.append(portal);
  try {
    const view = render(example(data, { containerRef: { current: portal } }, <><XAxis numTicks={3} /><SelectFirst /></>));
    fireEvent.click(view.getByTestId("hover-first"));
    const repeated = [...portal.querySelectorAll("span")].filter(node => node.textContent === "学期");
    expect(repeated).toHaveLength(2);
    expect(repeated[1]).toHaveStyle({ opacity: "1" });
  } finally { portal.remove(); }
});
