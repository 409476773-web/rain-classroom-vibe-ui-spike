import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { RadialVariant, RADIAL_VARIANT_IDS } from "./radial";
import reference from "./reference.json";

// Keep native geometry; JSDOM only supplies the missing measurement boundary.
beforeEach(() => vi.stubGlobal("ResizeObserver", class {
  constructor(private callback: ResizeObserverCallback) {}
  observe(target: Element) { this.callback([{ target, contentRect: { width: 320, height: 320, top: 0, left: 0 } } as ResizeObserverEntry], this as unknown as ResizeObserver); }
  unobserve() {}
  disconnect() {}
}));
afterEach(() => vi.unstubAllGlobals());
const props = { recipe: "category-near" as const, revision: 0, replay: 0, reduced: true, active: true };

test("all 21 frozen radial variants draw finite geometry and expose exact data", async () => {
  const expected = reference.filter(row => ["pie", "ring", "radar"].includes(row.family)).map(row => row.id);
  expect([...RADIAL_VARIANT_IDS]).toEqual(expected);
  for (const variantId of expected) {
    const view = render(<RadialVariant variantId={variantId} {...props} />);
    await waitFor(() => expect(view.container.querySelector('path[d]:not([d=""])'), variantId).not.toBeNull());
    for (const path of view.container.querySelectorAll("path[d]")) expect(path.getAttribute("d"), variantId).not.toMatch(/NaN|Infinity/);
    expect(within(view.container).getByRole("table", { hidden: true }), variantId).toBeInTheDocument();
    view.unmount();
  }
});

test("pie legend keyboard focus uses the same category value and color as its slice", async () => {
  const view = render(<RadialVariant variantId="pie-legend" {...props} />);
  await waitFor(() => expect(view.container.querySelector('path[fill="var(--chart-1)"]')).not.toBeNull());
  const button = screen.getByRole("button", { name: /^讲授课\s*186 人$/ });
  fireEvent.focus(button);
  expect(screen.getByRole("status")).toHaveTextContent("讲授课：186 人，占 37.2%");
  expect(button.querySelector(".rain-chart-legend-dot")).toHaveStyle({ background: "var(--chart-1)" });
  fireEvent.blur(button);
  expect(screen.getByRole("status")).toHaveTextContent("分母为全部类别合计 500 人");
});

test("zero-total Pie preserves zero rows without a false percentage or ratio plot", () => {
  const view = render(<RadialVariant variantId="pie-default" {...props} />);
  fireEvent.change(screen.getByRole("combobox", { name: "饼图示例状态" }), { target: { value: "zero" } });
  expect(screen.getByRole("status")).toHaveTextContent("总量为0");
  expect(screen.getByRole("table", { hidden: true })).toHaveTextContent("不适用");
  expect(view.container.querySelector('[data-rain-id="ui-chart-pie"]')).toBeNull();
  expect(view.container).not.toHaveTextContent("NaN");
  view.rerender(<RadialVariant variantId="pie-default" {...props} active={false} />);
  view.rerender(<RadialVariant variantId="pie-default" {...props} />);
  expect(screen.getByRole("combobox", { name: "饼图示例状态" })).toHaveValue("zero");
});

test("restored Pie and Ring states reproduce their readings and report editable settings", async () => {
  const changed = vi.fn();
  const pie = render(<RadialVariant variantId="pie-default" {...props} settings={{ state: "zero" }} onSettingsChange={changed} />);
  expect(screen.getByRole("combobox", { name: "饼图示例状态" })).toHaveValue("zero");
  expect(screen.getByRole("status")).toHaveTextContent("总量为0");
  fireEvent.change(screen.getByRole("combobox", { name: "饼图示例状态" }), { target: { value: "long" } });
  expect(changed).toHaveBeenLastCalledWith({ state: "long" });
  pie.unmount();
  render(<RadialVariant variantId="ring-default" {...props} settings={{ state: "long" }} onSettingsChange={changed} />);
  expect(screen.getByRole("combobox", { name: "进度环示例状态" })).toHaveValue("long");
  await waitFor(() => expect(screen.getByText("阅读进度 · 综合课程学习情况")).toBeInTheDocument());
});

test("custom donut keeps long center labels readable and retains its selected state", async () => {
  const view = render(<RadialVariant variantId="pie-custom-center" {...props} />);
  fireEvent.change(screen.getByRole("combobox", { name: "饼图示例状态" }), { target: { value: "long" } });
  await waitFor(() => expect(screen.getByText("综合课程学习情况总人数")).toBeInTheDocument());
  expect(screen.getByRole("table", { hidden: true })).toHaveTextContent("讲授课 · 综合课程学习情况");
  view.rerender(<RadialVariant variantId="pie-custom-center" {...props} active={false} />);
  expect(screen.getByRole("combobox", { name: "饼图示例状态" })).toHaveValue("long");
});

test("ring legend keeps independent denominators and reports each progress on focus", async () => {
  const view = render(<RadialVariant variantId="ring-legend" {...props} />);
  const button = screen.getByRole("button", { name: /^练习进度\s*8\/12 · 66.7%/ });
  fireEvent.focus(button);
  expect(screen.getByRole("status")).toHaveTextContent("练习进度：8/12 项，66.7%");
  expect(screen.getByRole("progressbar", { name: "练习进度进度" })).toHaveAttribute("aria-valuemax", "12");
  expect(screen.getByRole("table", { hidden: true })).toHaveTextContent("当前 · 项");
  expect(screen.getByRole("table", { hidden: true })).toHaveTextContent("目标 · 项");
  await waitFor(() => expect(view.container.querySelector(".rain-chart-center-reading")).toHaveTextContent(/^66\.7%练习进度$/));
});

test("ring center defaults to the first independent target and returns there after hover", async () => {
  const view = render(<RadialVariant variantId="ring-default" {...props} />);
  await waitFor(() => expect(view.container.querySelector(".rain-chart-center-reading")).toHaveTextContent(/^70\.0%阅读进度$/));
  const hits = view.container.querySelectorAll("svg g[style*='cursor']");
  fireEvent.mouseEnter(hits[1]!);
  await waitFor(() => expect(view.container.querySelector(".rain-chart-center-reading")).toHaveTextContent(/^66\.7%练习进度$/));
  fireEvent.mouseLeave(hits[1]!);
  await waitFor(() => expect(view.container.querySelector(".rain-chart-center-reading")).toHaveTextContent(/^70\.0%阅读进度$/));
  expect(view.container).not.toHaveTextContent("41%");
});

test("radar really uses three, five, and six dimensions and single-series data", () => {
  for (const [variantId, dimensions, series] of [["radar-triangle", 3, 2], ["radar-default", 5, 2], ["radar-hexagon", 6, 2], ["radar-single-series", 5, 1]] as const) {
    const view = render(<RadialVariant variantId={variantId} {...props} />);
    expect(view.container.querySelectorAll("thead th")).toHaveLength(dimensions + 1);
    expect(view.container.querySelectorAll("tbody tr")).toHaveLength(series);
    for (const cell of view.container.querySelectorAll("tbody td")) expect(Number(cell.textContent)).toBeGreaterThanOrEqual(0);
    view.unmount();
  }
});

test("multiple texture and gradient pies never share SVG definition IDs", async () => {
  const view = render(<>{["pie-patterns", "pie-donut-patterns", "pie-gradients"].map(variantId => <RadialVariant key={variantId} variantId={variantId} {...props} />)}</>);
  await waitFor(() => expect(view.container.querySelectorAll("pattern, radialGradient")).toHaveLength(11));
  const ids = [...view.container.querySelectorAll("[id]")].map(node => node.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test("each pie gradient stays within its own series hue and patterned hover has no glow", async () => {
  const view = render(<RadialVariant variantId="pie-gradients" {...props} />);
  await waitFor(() => expect(view.container.querySelectorAll("radialGradient")).toHaveLength(3));
  for (const gradient of view.container.querySelectorAll("radialGradient")) {
    const stops = [...gradient.querySelectorAll("stop")];
    expect(new Set(stops.map(stop => stop.getAttribute("stop-color"))).size).toBe(1);
    expect(stops[0]).toHaveAttribute("stop-opacity", "0.45");
  }
  view.rerender(<RadialVariant variantId="pie-donut-patterns" {...props} />);
  await waitFor(() => expect(view.container.querySelector("svg g[style] path[fill='transparent']")).not.toBeNull());
  const hit = view.container.querySelector("svg g[style] path[fill='transparent']");
  fireEvent.mouseEnter(hit!);
  await waitFor(() => {
    for (const path of view.container.querySelectorAll<SVGPathElement>("svg path")) expect(path.style.filter).not.toContain("drop-shadow");
  });
});
