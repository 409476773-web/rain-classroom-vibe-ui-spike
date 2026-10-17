import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { expect, test, vi } from "vitest";
import { BarChart, type BarChartProps } from "./vendor/charts/bar-chart";
import { Bar } from "./vendor/charts/bar";
import { BarXAxis } from "./vendor/charts/bar-x-axis";
import { BarYAxis } from "./vendor/charts/bar-y-axis";

vi.mock("@visx/responsive", () => ({ ParentSize: ({ children }: { children: (size: { width: number; height: number }) => ReactNode }) => children({ width: 400, height: 200 }) }));
const rows = [{ id: "a", label: "同名学院", value: 25 }, { id: "b", label: "同名学院", value: 50 }, { id: "c", label: "另一学院", value: 100 }];
const margin = { top: 0, right: 0, bottom: 0, left: 0 };
function plot(props: Partial<BarChartProps> = {}) {
  return <BarChart data={rows} xDataKey="id" margin={margin} animationDuration={0} {...props}><Bar dataKey="value" animate={false} /></BarChart>;
}
const rects = (container: HTMLElement) => [...container.querySelectorAll('g[class^="bar-series-"] rect')];

test.each(["horizontal", "vertical"] as const)("explicit valueDomain keeps exact %s proportions without nice expansion", orientation => {
  const view = render(plot({ orientation, valueDomain: [0, 100] }));
  const key = orientation === "horizontal" ? "width" : "height";
  expect(rects(view.container).map(rect => Number(rect.getAttribute(key)))).toEqual(orientation === "horizontal" ? [100, 200, 400] : [50, 100, 200]);
});

test("independent rows use the same explicit domain and preserve automatic default", () => {
  const a = render(plot({ orientation: "horizontal", data: [rows[0]!], valueDomain: [0, 100] }));
  const b = render(plot({ orientation: "horizontal", data: [rows[1]!], valueDomain: [0, 100] }));
  expect(Number(rects(a.container)[0]!.getAttribute("width"))).toBe(100);
  expect(Number(rects(b.container)[0]!.getAttribute("width"))).toBe(200);
  const auto = render(plot({ orientation: "horizontal" }));
  expect(Number(rects(auto.container)[2]!.getAttribute("width"))).toBeLessThan(400);
});

test.each([[1, 100], [0, 0], [0, Infinity], [0, NaN]])("invalid explicit domain %j is rejected", (min, max) => {
  expect(() => render(plot({ valueDomain: [min, max] as [0, number] }))).toThrow(/valueDomain/);
});

test("category display names stay separate from identity on both axes", () => {
  const formatLabel = (_id: string, datum: Record<string, unknown>) => String(datum.label);
  const vertical = render(<BarChart data={rows} xDataKey="id" margin={{ bottom: 30 }} animationDuration={0}><Bar dataKey="value" animate={false} /><BarXAxis formatLabel={formatLabel} /></BarChart>);
  expect(vertical.getAllByText("同名学院")).toHaveLength(2);
  const horizontal = render(<BarChart data={rows} xDataKey="id" orientation="horizontal" margin={{ left: 160 }} animationDuration={0}><Bar dataKey="value" animate={false} /><BarYAxis formatLabel={formatLabel} /></BarChart>);
  expect(horizontal.getAllByText("同名学院")).toHaveLength(4);
  expect(horizontal.container.querySelector('span[title="同名学院"]')).toHaveStyle({ maxWidth: "152px" });
});

test("horizontal stacked segments start at the cumulative offset and keep their own length", () => {
  const view = render(<BarChart data={[{ id: "one", first: 30, second: 70 }]} xDataKey="id" orientation="horizontal" stacked margin={margin} valueDomain={[0, 100]} animationDuration={0}><Bar dataKey="first" animate={false} /><Bar dataKey="second" animate={false} /></BarChart>);
  expect(rects(view.container).map(rect => [Number(rect.getAttribute("x")), Number(rect.getAttribute("width"))])).toEqual([[0, 120], [120, 280]]);
});

test("null and non-finite values do not generate malformed bars", () => {
  const view = render(plot({ data: [{ id: "missing", value: null }, { id: "invalid", value: NaN }, { id: "infinite", value: Infinity }, { id: "zero", value: 0 }], valueDomain: [0, 100] }));
  expect(rects(view.container)).toHaveLength(1);
  expect(rects(view.container)[0]).toHaveAttribute("height", "0");
});
test("duplicate category IDs are rejected instead of merging geometry", () => {
  expect(() => render(plot({ data: [{ id:"one",value:25 },{ id:"one",value:50 }] }))).toThrow(/category.*unique/i);
});
