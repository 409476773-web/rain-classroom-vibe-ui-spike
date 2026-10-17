import { fireEvent, render, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { ChartExample } from "./chart-examples";
import { arcPath, buildArcs, defaultSunburstGrowPadding, transitionGeometry } from "@rain-next/ui/charts";
import { hierarchyLeaves, makeBars, makeHierarchy } from "./chart-data";

beforeEach(() => vi.stubGlobal("ResizeObserver", class {
  constructor(private callback: ResizeObserverCallback) {}
  observe(target: HTMLElement) {
    let node: HTMLElement | null = target;
    while (node && !(node.style.width && node.style.height)) node = node.parentElement;
    this.callback([{ target, contentRect: { width: parseFloat(node?.style.width || "600"), height: parseFloat(node?.style.height || "320") } } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver);
  }
  unobserve() {} disconnect() {}
}));
afterEach(() => vi.unstubAllGlobals());

test("second-batch Pie exposes a named small category and clears a removed category without changing normal data", async () => {
  const view = render(<ChartExample id="pie" reduced />);
  const table = () => view.getByRole("table", { hidden:true });
  const original = table().textContent;
  fireEvent.change(view.getByRole("combobox", { name:"饼图边界样本" }), { target:{ value:"pie-small" } });
  expect(table()).toHaveTextContent("0.1%");
  expect(table()).toHaveTextContent("跨学科课程教学与实践研究小组");
  fireEvent.change(view.getByRole("combobox", { name:"饼图边界样本" }), { target:{ value:"normal" } });
  expect(table().textContent).toBe(original);
  const buttons = [...view.container.querySelectorAll<HTMLButtonElement>(".rain-chart-legend-button")];
  const removed = buttons[1]!.textContent!;
  fireEvent.focus(buttons[1]!);
  fireEvent.change(view.getByRole("combobox", { name:"饼图边界样本" }), { target:{ value:"pie-remove" } });
  expect(table()).not.toHaveTextContent(removed);
  expect(view.getByRole("status")).toHaveTextContent("合计");
});

test("second-batch Ring keeps raw zero, full, zero-goal and over-goal readings without invalid paths", () => {
  const view = render(<ChartExample id="ring" reduced />);
  for (const [scenario,reading,drawable] of [["ring-zero","0%",true],["ring-full","100%",true],["ring-zero-goal","不适用",false],["ring-over","120%",false]] as const) {
    fireEvent.change(view.getByRole("combobox", { name:"进度环边界样本" }), { target:{ value:scenario } });
    expect(view.getByRole("table", { hidden:true })).toHaveTextContent(reading);
    expect(Boolean(view.container.querySelector('[data-rain-id="ui-chart-ring"]'))).toBe(drawable);
    expect(view.container).not.toHaveTextContent(/NaN|Infinity/);
  }
  expect(view.getByRole("table", { hidden:true })).toHaveTextContent("120");
  expect(view.container).toHaveTextContent("超目标");
});

test("second-batch Funnel preserves missing stages and growth instead of inventing a conversion", () => {
  const view = render(<ChartExample id="funnel" reduced />);
  for (const [scenario,text,drawable] of [["funnel-missing","缺测",false],["funnel-growth","增长",true],["funnel-zero-entry","不适用",false],["funnel-above-entry","110.0%",false]] as const) {
    fireEvent.change(view.getByRole("combobox", { name:"漏斗边界样本" }), { target:{ value:scenario } });
    expect(view.container).toHaveTextContent(text);
    expect(view.container.querySelectorAll("tbody tr")).toHaveLength(4);
    expect(Boolean(view.container.querySelector('[data-rain-id="ui-chart-funnel"]'))).toBe(drawable);
    expect(view.container).not.toHaveTextContent(/NaN|Infinity/);
  }
});

test("second-batch long Funnel uses short plot labels and retains complete names in its exact reading", async () => {
  const view = render(<ChartExample id="funnel" state="long" reduced />);
  await waitFor(()=>expect(view.container.querySelector('[data-rain-id="ui-chart-funnel"]')).not.toBeNull());
  expect(view.container.querySelector('[data-rain-id="ui-chart-funnel"]')).not.toHaveTextContent("综合课程学习情况");
  expect(view.getByRole("table", { hidden:true })).toHaveTextContent("进入课程 · 综合课程学习情况");
  expect(view.container).toHaveTextContent("精确数据可读取完整阶段名称");
});

test.each(["compact", "comfortable"] as const)("second-batch %s mini retains the named Pie and Ring boundary readings", miniSize => {
  const view = render(<ChartExample id="pie" size="mini" miniSize={miniSize} boundaryScenario="pie-small" reduced />);
  expect(view.getByRole("table", { hidden:true })).toHaveTextContent("0.1%");
  expect(view.container.querySelectorAll('[data-mini-kind="pie"], [data-mini-kind="donut"]')).toHaveLength(2);
  view.rerender(<ChartExample id="ring" size="mini" miniSize={miniSize} boundaryScenario="ring-zero-goal" reduced />);
  expect(view.getByRole("table", { hidden:true })).toHaveTextContent("不适用");
  view.rerender(<ChartExample id="ring" size="mini" miniSize={miniSize} boundaryScenario="ring-over" reduced />);
  expect(view.getByRole("table", { hidden:true })).toHaveTextContent("120%");
  expect(view.container).toHaveTextContent("超目标");
  expect([...view.container.querySelectorAll("path[d]")].every(path=>!path.getAttribute("d")!.match(/NaN|Infinity/))).toBe(true);
});

test.each([
  ["pie","饼图边界样本","pie-small","pie-remove","0.1%"],
  ["ring","进度环边界样本","ring-over","ring-zero-goal","120%"],
  ["funnel","漏斗边界样本","funnel-missing","funnel-growth","缺测"],
] as const)("second-batch downloaded %s restores its scenario and publishes a later choice", (id,label,initial,next,reading) => {
  const changed = vi.fn();
  const view = render(<ChartExample id={id} boundaryScenario={initial} onBoundaryScenarioChange={changed} reduced />);
  expect(view.getByRole("table", { hidden:true })).toHaveTextContent(reading);
  expect(view.getByRole("combobox", { name:label })).toHaveValue(initial);
  fireEvent.change(view.getByRole("combobox", { name:label }), { target:{ value:next } });
  expect(changed).toHaveBeenCalledWith(next);
  view.rerender(<ChartExample id={id} boundaryScenario={next} onBoundaryScenarioChange={changed} revision={1} reduced />);
  expect(view.getByRole("combobox", { name:label })).toHaveValue(next);
});

test("composed percentage readings round for display without quantizing the plotted data", () => {
  const view = render(<ChartExample id="composed" reduced />);
  expect(view.container.querySelectorAll("tbody tr")[7]).toHaveTextContent("72.7%");
  expect(view.container.querySelectorAll("tbody tr")[8]).toHaveTextContent("73.0%");
});

test.each(["line", "composed"] as const)("%s ordinary curves join with continuous curvature", async id => {
  const view = render(<ChartExample id={id} reduced />);
  const stroke = id === "composed" ? "var(--chart-3)" : "var(--chart-1)";
  const path = () => [...view.container.querySelectorAll("path")].find(node => node.getAttribute("stroke") === stroke && node.getAttribute("d")?.includes("C"));
  await waitFor(() => expect(path()).toBeDefined());
  const d = path()!.getAttribute("d")!;
  let startY = Number(d.match(/^M[-\d.]+,([-\d.]+)/)![1]);
  const segments = [...d.matchAll(/C([^C]+)/g)].map(match => {
    const values = match[1]!.split(",").map(Number);
    const segment = { start:startY, first:values[1]!, second:values[3]!, end:values[5]! };
    startY = segment.end;
    return segment;
  });
  expect(segments).toHaveLength(23);
  segments.slice(1).forEach((right, index) => {
    const left = segments[index]!;
    expect(6 * (left.end - 2 * left.second + left.first)).toBeCloseTo(6 * (right.start - 2 * right.first + right.second), 1);
  });
});

test.each(["line", "area", "composed"] as const)("%s default missing data retains dates, real zero and gaps", async id => {
  const view = render(<ChartExample id={id} state="missing" reduced />);
  const rows = view.container.querySelectorAll("tbody tr");
  expect(rows).toHaveLength(24);
  expect(rows[1]).toHaveTextContent("缺测");
  expect(rows[2]?.querySelector("td")).toHaveTextContent("0");
  if (id === "composed") expect(rows[2]).toHaveTextContent("不适用");
  await waitFor(() => expect(view.container.querySelector("svg")).not.toBeNull());
  view.rerender(<ChartExample id={id} state="missing" revision={2} reduced />);
  expect(view.getByRole("status")).toHaveTextContent("全部缺测");
  expect(view.container.querySelector("svg")).toBeNull();
  expect(view.container.querySelectorAll("tbody tr")).toHaveLength(24);
  expect([...view.container.querySelectorAll("tbody td")].every(cell => cell.textContent === "缺测")).toBe(true);
  view.rerender(<ChartExample id={id} state="zero" reduced />);
  await waitFor(() => expect(view.container.querySelector("svg")).not.toBeNull());
  expect(view.container.querySelector("tbody td")).toHaveTextContent("0");
  if (id === "composed") expect(view.container.querySelector("tbody tr")).toHaveTextContent("不适用");
});

test.each(["line", "area"] as const)("%s missing mini keeps its frame and never turns the missing latest value into zero", async id => {
  const view = render(<ChartExample id={id} state="missing" size="mini" miniSize="compact" reduced />);
  expect(view.container.querySelector(".rain-chart-metric strong")).toHaveTextContent("缺测");
  expect(view.container.querySelector(".rain-business-mini-slot")).toHaveStyle({ width: "96px", height: "32px" });
  await waitFor(() => expect(view.container.querySelector("svg")).not.toBeNull());
  view.rerender(<ChartExample id={id} state="missing" revision={2} size="mini" miniSize="comfortable" reduced />);
  expect(view.container.querySelector(".rain-chart-metric strong")).toHaveTextContent("缺测");
  expect(view.getByRole("status")).toHaveTextContent("全部缺测");
  expect(view.container.querySelector(".rain-business-mini-slot")).toHaveStyle({ width: "128px", height: "48px" });
  expect(view.container.querySelector("svg")).toBeNull();
  view.rerender(<ChartExample id={id} state="single" size="mini" miniSize="comfortable" reduced />);
  expect(view.container.querySelectorAll("tbody tr")).toHaveLength(1);
  expect(view.container.querySelector(".rain-chart-metric strong")).not.toHaveTextContent("缺测");
});

test.each(["standard", "mini"] as const)("default %s bar explains its all-zero reference range beside the plot", size => {
  const view = render(<ChartExample id="bar" state="zero" size={size} reduced />);
  expect(view.getByText(/全零.*量程.*1/)).toBeVisible();
  view.rerender(<ChartExample id="bar" state="normal" size={size} reduced />);
  expect(view.queryByText(/全零.*量程.*1/)).toBeNull();
});

test("default grouped exact readings follow the curated data while stacked and mini samples retain their own counts", () => {
  const view = render(<ChartExample id="bar" seriesCount={5} reduced />);
  const firstValues = () => [...view.container.querySelectorAll("tbody tr:first-child td")].map(cell => cell.textContent);
  expect(firstValues()).toEqual(["256", "228", "156", "118", "84"]);
  view.rerender(<ChartExample id="bar" seriesCount={5} revision={1} reduced />);
  expect(firstValues()).toEqual(["242", "148", "92", "116", "66"]);
  fireEvent.change(view.getByRole("combobox", { name: "柱形配方" }), { target: { value: "stacked" } });
  expect(firstValues()).toEqual(["76", "46", "28", "18", "8"]);
  view.rerender(<ChartExample id="bar" size="mini" revision={1} reduced />);
  expect(firstValues()).toEqual(["176"]);
});

test("exclusive grade samples vary by course and retain the original participant totals", () => {
  const view = render(<ChartExample id="bar" seriesCount={5} reduced />);
  fireEvent.change(view.getByRole("combobox", { name: "柱形配方" }), { target: { value: "stacked" } });
  const readings = () => [...view.container.querySelectorAll("tbody tr")].map(row => [...row.querySelectorAll("td")].map(cell => Number(cell.textContent)));
  const original = readings();
  for (const revision of [0, 1, 2, 3]) {
    view.rerender(<ChartExample id="bar" seriesCount={5} revision={revision} reduced />);
    const rows = readings();
    expect(new Set(rows.map(row => JSON.stringify(row))).size).toBe(6);
    rows.forEach((row, index) => {
      expect(row.every(value => Number.isInteger(value) && value >= 0)).toBe(true);
      expect(row.reduce((sum, value) => sum + value, 0)).toBe(makeBars(revision)[index]!.enrolled);
    });
    if (revision === 3) expect(rows).toEqual(original);
  }
});

test("gauge sample readings cycle while explicit endpoints and zero remain truthful", () => {
  const view = render(<ChartExample id="gauge" reduced />);
  const reading = () => view.container.querySelector("tbody tr td")?.textContent;
  for (const [revision, value] of [[0, "76%"], [1, "88%"], [2, "64%"], [3, "76%"]] as const) {
    view.rerender(<ChartExample id="gauge" revision={revision} reduced />);
    expect(reading()).toBe(value);
  }
  fireEvent.change(view.getByRole("combobox", { name: "仪表读数" }), { target: { value: "50" } });
  expect(reading()).toBe("50%");
  fireEvent.change(view.getByRole("combobox", { name: "仪表读数" }), { target: { value: "100" } });
  expect(reading()).toBe("100%");
  view.rerender(<ChartExample id="gauge" state="zero" reduced />);
  expect(reading()).toBe("0%");
});

test("sunburst keyboard drill and return restore focus, retain valid focus and reset invalid data paths", () => {
  const view = render(<ChartExample id="sunburst" reduced />);
  const drill = view.getByRole("button", { name: "查看基础课程" });
  drill.focus(); fireEvent.click(drill, { detail: 0 });
  const back = view.getByRole("link", { name: "返回学习内容" });
  expect(back).toHaveFocus();
  expect(view.queryByRole("button", { name: "查看视频" })).toBeNull();
  expect(view.getByRole("group", { name: /当前层级/ })).toHaveTextContent("视频");
  view.rerender(<ChartExample id="sunburst" revision={1} replay={1} reduced />);
  expect(view.getByRole("link", { name: "返回学习内容" })).toHaveFocus();
  fireEvent.click(back, { detail: 0 });
  expect(view.getByRole("button", { name: "查看基础课程" })).toHaveFocus();
  fireEvent.click(view.getByRole("button", { name: "查看基础课程" }), { detail: 0 });
  view.rerender(<ChartExample id="sunburst" state="long" reduced />);
  expect(view.getByRole("heading", { name: "学习内容" })).toBeVisible();
  expect(view.getByRole("button", { name: /查看基础课程/ })).toHaveFocus();
  const course = view.getByRole("button", { name: /查看基础课程/ });
  course.focus(); fireEvent.click(course, { detail: 0 });
  const video = view.getByRole("button", { name: "查看视频" });
  video.focus(); fireEvent.click(video, { detail: 0 });
  expect(within(view.getByRole("navigation", { name: "学习内容层级" })).getAllByRole("link")).toHaveLength(2);
  fireEvent.click(view.getByRole("link", { name: "返回学习内容" }), { detail: 0 });
  expect(view.getByRole("button", { name: /查看基础课程/ })).toHaveFocus();
});

test("the long sunburst supplies a real extra drill level with conserved totals", () => {
  const normal = makeHierarchy(), long = makeHierarchy(0, "long");
  expect(long.children![0]!.children![0]!.children).toHaveLength(2);
  expect(hierarchyLeaves(long).reduce((sum, leaf) => sum + leaf.value, 0)).toBe(hierarchyLeaves(normal).reduce((sum, leaf) => sum + leaf.value, 0));
});

test("sunburst data path reset does not steal focus from an external control", () => {
  const view = render(<><button>外部状态</button><ChartExample id="sunburst" reduced /></>);
  const drill = view.getByRole("button", { name: "查看基础课程" });
  drill.focus(); fireEvent.click(drill, { detail: 0 });
  const external = view.getByRole("button", { name: "外部状态" });
  external.focus();
  view.rerender(<><button>外部状态</button><ChartExample id="sunburst" state="long" reduced /></>);
  expect(external).toHaveFocus();
  expect(view.getByRole("heading", { name: "学习内容" })).toBeVisible();
});

test("sunburst repairs a focused root child removed by a data update", () => {
  const view = render(<ChartExample id="sunburst" reduced />);
  view.getByRole("button", { name: "查看进阶课程" }).focus();
  view.rerender(<ChartExample id="sunburst" state="single" reduced />);
  expect(view.getByRole("button", { name: "查看基础课程" })).toHaveFocus();
});

test("sunburst clears the old hovered reading when a data update changes arc indexes", async () => {
  const view = render(<ChartExample id="sunburst" reduced />);
  const { arcs, maxDepth, focusById, rootId } = buildArcs(makeHierarchy());
  const reading = arcs.find(arc => arc.id === `${rootId} / 基础课程 / 阅读`)!;
  const root = focusById.get(rootId)!;
  const radius = 180 - defaultSunburstGrowPadding(maxDepth, 360, 0);
  const readingPath = arcPath(transitionGeometry(reading, root, root, maxDepth, radius, 1)!, 1, 1);
  let segment: Element | undefined;
  await waitFor(() => {
    segment = [...view.container.querySelectorAll("svg > g")].find(group => group.querySelector('path[fill="transparent"]')?.getAttribute("d") === readingPath);
    expect(segment).toBeDefined();
  });
  const hint = view.container.querySelector('[data-rain-id="ui-chart-sunburst"] > [aria-live="polite"]')!;
  fireEvent.pointerEnter(segment!);
  expect(hint).toHaveTextContent("学习内容 › 基础课程 › 阅读 · 90 人次");
  view.rerender(<ChartExample id="sunburst" state="long" reduced />);
  expect(hint).toHaveTextContent("悬停读取");
  expect(hint).not.toHaveTextContent("视频 › 学习内容");
});
