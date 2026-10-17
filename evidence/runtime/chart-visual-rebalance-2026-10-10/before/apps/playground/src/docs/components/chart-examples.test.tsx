import { fireEvent, render, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { ChartExample } from "./chart-examples";
import { arcPath, buildArcs, defaultSunburstGrowPadding, transitionGeometry } from "@rain-next/ui/charts";
import { hierarchyLeaves, makeHierarchy } from "./chart-data";

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
