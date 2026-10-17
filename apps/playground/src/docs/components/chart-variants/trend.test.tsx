import React from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import reference from "./reference.json";

// JSDOM has no layout. Keep the real chart code and give its measurement boundary a size.
beforeEach(() => {
  vi.stubGlobal("ResizeObserver", class {
    constructor(private callback: ResizeObserverCallback) {}
    observe(target: Element) { this.callback([{ target, contentRect: { width: 640, height: 320, top: 0, left: 0 } } as ResizeObserverEntry], this as unknown as ResizeObserver); }
    unobserve() {}
    disconnect() {}
  });
  Object.defineProperties(SVGElement.prototype, {
    getTotalLength: { configurable: true, value: () => 640 },
    getPointAtLength: { configurable: true, value: (length: number) => ({ x: length, y: 0 }) },
  });
});
afterEach(() => {
  vi.unstubAllGlobals();
  delete (SVGElement.prototype as unknown as Record<string, unknown>).getTotalLength;
  delete (SVGElement.prototype as unknown as Record<string, unknown>).getPointAtLength;
});

async function renderMeasured(node: React.ReactNode) {
  const view = render(node);
  await waitFor(() => expect(view.container.querySelector("svg")).not.toBeNull());
  return view;
}

const expected = reference.filter(row => ["area", "line", "composed"].includes(row.family)).map(row => row.id);
const props = { recipe: "category-near" as const, revision: 0, replay: 0, reduced: true, active: true };
async function moduleUnderTest() {
  return import("./trend");
}

test("all 52 frozen trend variants have a real plot and precise readable data", async () => {
  const { TrendVariant, TREND_VARIANT_IDS } = await moduleUnderTest();
  expect([...TREND_VARIANT_IDS]).toEqual(expected);
  for (const variantId of expected) {
    const view = await renderMeasured(<TrendVariant variantId={variantId} {...props} />);
    expect(view.container.querySelector('path[d]:not([d=""])'), variantId).not.toBeNull();
    expect(within(view.container).getByRole("table", { hidden: true }), variantId).toBeInTheDocument();
    view.unmount();
  }
});

test("the six curve choices change the path and survive an inactive visit", async () => {
  const { TrendVariant } = await moduleUnderTest();
  for (const variantId of ["area-interactive", "composed-default"]) {
    const view = await renderMeasured(<TrendVariant variantId={variantId} {...props} />);
    const select = screen.getByRole("combobox", { name: "图表曲线" });
    expect(within(select).getAllByRole("option")).toHaveLength(6);
    const before = [...view.container.querySelectorAll("path[d]")].map(path => path.getAttribute("d")).join("|");
    fireEvent.change(select, { target: { value: "linear" } });
    const after = [...view.container.querySelectorAll("path[d]")].map(path => path.getAttribute("d")).join("|");
    expect(after).not.toBe(before);
    view.rerender(<TrendVariant variantId={variantId} {...props} active={false} />);
    view.rerender(<TrendVariant variantId={variantId} {...props} />);
    expect(screen.getByRole("combobox", { name: "图表曲线" })).toHaveValue("linear");
    view.unmount();
  }
});

test("Brush has keyboard range equivalents and reset restores the precise window", async () => {
  const { TrendVariant } = await moduleUnderTest();
  await renderMeasured(<TrendVariant variantId="line-trio-brush" {...props} />);
  const from = screen.getByRole("slider", { name: "范围开始日期" });
  const to = screen.getByRole("slider", { name: "范围结束日期" });
  expect(from).toHaveValue("0");
  expect(to).toHaveValue("29");
  fireEvent.change(from, { target: { value: "6" } });
  expect(from).toHaveValue("6");
  expect(screen.getByRole("status", { name: "当前查看范围" }).textContent).toContain("9月7日");
  fireEvent.click(screen.getByRole("button", { name: "重置范围" }));
  expect(from).toHaveValue("0");
  expect(to).toHaveValue("29");
});

test("trio updates cycle through three finite datasets with stable dates and changing relative values", async () => {
  const { TrendVariant } = await moduleUnderTest();
  const view = await renderMeasured(<TrendVariant variantId="line-trio-brush" {...props} />);
  const rows = () => [...view.container.querySelectorAll("tbody tr")].map(row => [...row.querySelectorAll("th, td")].map(cell => cell.textContent));
  const snapshots: ReturnType<typeof rows>[] = [];
  for (let revision = 0; revision < 3; revision++) {
    view.rerender(<TrendVariant variantId="line-trio-brush" {...props} revision={revision} />);
    const data = rows();
    expect(data).toHaveLength(30);
    expect(data.every(row => row.length === 4 && row.slice(1).every(value => Number.isInteger(Number(value)) && Number(value) >= 0))).toBe(true);
    snapshots.push(data);
  }
  expect(snapshots[1]!.map(row => row[0])).toEqual(snapshots[0]!.map(row => row[0]));
  expect(new Set(snapshots.map(data => JSON.stringify(data))).size).toBe(3);
  view.rerender(<TrendVariant variantId="line-trio-brush" {...props} revision={3} />);
  expect(rows()).toEqual(snapshots[0]);
  view.rerender(<TrendVariant variantId="line-trio-brush" {...props} revision={61} />);
  expect(rows()).toEqual(snapshots[1]);
  const desktopChanges = snapshots[1]!.map((row, index) => Number(row[1]) - Number(snapshots[0]![index]![1]));
  expect(new Set(desktopChanges).size).toBeGreaterThan(1);
});

test("restored loading and Brush settings reproduce the selected state and report subsequent edits", async () => {
  const { TrendVariant } = await moduleUnderTest();
  const changed = vi.fn();
  const loading = await renderMeasured(<TrendVariant variantId="area-loading" {...props} reduced={false} settings={{ loading: false }} onSettingsChange={changed} />);
  expect(screen.getByRole("button", { name: "显示加载" })).toBeVisible();
  expect(loading.container.querySelector('linearGradient[id^="grid-shimmer-"]')).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "显示加载" }));
  expect(changed).toHaveBeenLastCalledWith({ loading: true });
  loading.unmount();
  const brush = [new Date(2026, 8, 7).toISOString(), new Date(2026, 8, 17).toISOString()] as [string, string];
  await renderMeasured(<TrendVariant variantId="line-trio-brush" {...props} settings={{ brush }} onSettingsChange={changed} />);
  expect(screen.getByRole("slider", { name: "范围开始日期" })).toHaveValue("6");
  expect(screen.getByRole("slider", { name: "范围结束日期" })).toHaveValue("16");
  expect(document.querySelectorAll("tbody tr")).toHaveLength(11);
  fireEvent.change(screen.getByRole("slider", { name: "范围结束日期" }), { target: { value: "20" } });
  expect(changed).toHaveBeenLastCalledWith({ brush: [brush[0], new Date(2026, 8, 21).toISOString()] });
});

test("projection is separate from Brush and records observed and forecast values", async () => {
  const { TrendVariant } = await moduleUnderTest();
  await renderMeasured(<TrendVariant variantId="line-projection" {...props} />);
  expect(screen.queryByRole("slider")).toBeNull();
  const table = screen.getByRole("table", { hidden: true });
  expect(table).toHaveTextContent("目标预测");
  expect(table).toHaveTextContent("自动预测");
  expect(table).toHaveTextContent("已观测");
  await waitFor(() => expect(document.querySelectorAll('circle[r="4.25"]')).toHaveLength(2));
});

test("projection target updates cycle through bounded endpoint readings without changing observed dates", async () => {
  const { TrendVariant } = await moduleUnderTest();
  const view = await renderMeasured(<TrendVariant variantId="line-projection" {...props} />);
  const readings = () => [...view.container.querySelectorAll("tbody tr")].map(row => [...row.querySelectorAll("th, td")].map(cell => cell.textContent));
  const observedDates = readings().filter(row => row[1] === "已观测").map(row => row[0]);
  for (const [revision, expected] of [[0, 420], [1, 448], [2, 396], [3, 420]] as const) {
    view.rerender(<TrendVariant variantId="line-projection" {...props} revision={revision} />);
    expect(readings().filter(row => row[1] === "目标预测").map(row => Number(row[2]))).toEqual([expected]);
    expect(readings().filter(row => row[1] === "已观测").map(row => row[0])).toEqual(observedDates);
  }
});

test("both loading styles mount native loading parts only while visible and retain the ready choice", async () => {
  const { TrendVariant } = await moduleUnderTest();
  for (const variantId of ["area-loading", "area-loading-sweep", "line-loading", "line-loading-sweep"]) {
    const loadingSelector = variantId.endsWith("-sweep") ? 'pattern[id^="line-sweep-"]' : 'linearGradient[id^="grid-shimmer-"]';
    const view = await renderMeasured(<TrendVariant variantId={variantId} {...props} reduced={false} />);
    await waitFor(() => expect(view.container.querySelector(loadingSelector)).not.toBeNull());
    view.rerender(<TrendVariant variantId={variantId} {...props} active={false} reduced={false} />);
    expect(view.container.querySelector(loadingSelector)).toBeNull();
    view.rerender(<TrendVariant variantId={variantId} {...props} reduced={false} />);
    fireEvent.click(screen.getByRole("button", { name: "显示数据" }));
    view.rerender(<TrendVariant variantId={variantId} {...props} active={false} reduced={false} />);
    view.rerender(<TrendVariant variantId={variantId} {...props} />);
    expect(screen.getByRole("button", { name: "显示加载" })).toBeVisible();
    view.unmount();
  }
});

test("composed markers share the run-rate area and line without an extra observed line", async () => {
  const { TrendVariant } = await moduleUnderTest();
  await renderMeasured(<TrendVariant variantId="composed-markers-dashed-tail" {...props} />);
  const table = screen.getByRole("table", { hidden: true });
  expect(table).toHaveTextContent("参与人数 · 人");
  expect(table).toHaveTextContent("复习人数 · 人");
  expect(table).not.toHaveTextContent("完成人数 · 人");
});

test("dual-axis variants and mutually exclusive stacks expose their units", async () => {
  const { TrendVariant } = await moduleUnderTest();
  for (const variantId of ["area-dual-y-axis", "line-dual-y-axis", "composed-dual-y-axis"]) {
    const view = await renderMeasured(<TrendVariant variantId={variantId} {...props} />);
    expect(view.container).toHaveTextContent("左轴");
    expect(view.container).toHaveTextContent("右轴");
    expect(screen.getByRole("table", { hidden: true })).toHaveTextContent("完成率 · %");
    expect(view.container.querySelectorAll("tbody tr")[7]).toHaveTextContent("72.7");
    view.unmount();
  }
  await renderMeasured(<TrendVariant variantId="composed-stacked-bar-line" {...props} />);
  expect(screen.getByRole("table", { hidden: true })).toHaveTextContent("已完成 · 人");
  expect(screen.getByRole("table", { hidden: true })).toHaveTextContent("未完成 · 人");
});
