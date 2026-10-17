import React from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterAll, expect, test, vi } from "vitest";
import reference from "./reference.json";

vi.mock("@visx/responsive", () => ({ ParentSize: ({ children }: { children: (size: { width: number; height: number }) => React.ReactNode }) => <div>{children({ width: 640, height: 320 })}</div> }));
vi.stubGlobal("ResizeObserver", class {
  constructor(private callback: ResizeObserverCallback) {}
  observe(target: Element) { this.callback([{ target, contentRect: { width: 640, height: 320 } } as ResizeObserverEntry], this as unknown as ResizeObserver); }
  unobserve() {}
  disconnect() {}
});
// JSDOM omits SVG path measurements used by the native Sankey reveal.
const pathLengthDescriptor = Object.getOwnPropertyDescriptor(SVGElement.prototype, "getTotalLength");
Object.defineProperty(SVGElement.prototype, "getTotalLength", { configurable: true, value: () => 100 });
afterAll(() => {
  vi.unstubAllGlobals();
  if (pathLengthDescriptor) Object.defineProperty(SVGElement.prototype, "getTotalLength", pathLengthDescriptor);
  else Reflect.deleteProperty(SVGElement.prototype, "getTotalLength");
});

const props = { recipe: "category-near" as const, revision: 0, replay: 0, reduced: true, active: true };
const expected = reference.filter(item => ["heatmap", "choropleth", "sankey", "sunburst"].includes(item.family)).map(item => item.id);
const getModule = () => import("./structure");

test("registers all 24 structure variants with a real plot and exact data", async () => {
  const module = await getModule().catch(() => null);
  expect(module?.StructureVariant, "structure family renderer is implemented").toBeTypeOf("function");
  if (!module?.StructureVariant) return;
  expect([...module.STRUCTURE_VARIANT_IDS]).toEqual(expected);
  for (const variantId of expected) {
    const view = render(<module.StructureVariant variantId={variantId} {...props} />);
    await waitFor(() => expect(view.container.querySelector("svg"), variantId).not.toBeNull());
    expect(within(view.container).getByRole("table", { hidden: true }), variantId).toBeInTheDocument();
    view.unmount();
  }
});

test("Monday weeks contain seven chronological dates and preserve zero separately from missing", async () => {
  const { structureHeatmapData } = await getModule();
  for (const weekStart of [0, 1] as const) {
    const data = structureHeatmapData(0, 6, weekStart);
    for (const column of data) {
      const displayed = weekStart ? [...column.bins.slice(1), column.bins[0]!] : column.bins;
      expect(displayed[0]!.date.getDay()).toBe(weekStart);
      for (let index = 1; index < displayed.length; index++) {
        const previous = new Date(displayed[index - 1]!.date);
        previous.setDate(previous.getDate() + 1);
        expect(displayed[index]!.date.getTime()).toBe(previous.getTime());
      }
    }
    const counts = data.flatMap(column => column.bins.map(bin => bin.count));
    expect(counts).toContain(0);
    expect(counts).toContain(-1);
  }
  expect(structureHeatmapData(0, 12, 0).length).toBeGreaterThan(structureHeatmapData(0, 6, 0).length);
});

test("world map keeps stable geometry IDs, true zero and missing readings", async () => {
  const { structureWorldData } = await getModule();
  const { makeRegions } = await import("../chart-data");
  const map = structureWorldData(0);
  expect(map.features).toHaveLength(177);
  expect(new Set(map.features.map(feature => feature.properties.id)).size).toBe(177);
  expect(map.features.every(feature => ["Polygon", "MultiPolygon"].includes(feature.geometry.type))).toBe(true);
  expect(map.features.some(feature => feature.properties.value === 0)).toBe(true);
  expect(map.features.some(feature => feature.properties.value === null)).toBe(true);
  expect(structureWorldData(1).features.map(feature => feature.properties.id)).toEqual(map.features.map(feature => feature.properties.id));
  expect(makeRegions(0)).toEqual(map);
  expect(makeRegions(0, "zero").features.every(feature => feature.properties.value === 0)).toBe(true);
  expect(makeRegions(0, "single").features).toHaveLength(1);
  expect(makeRegions(0, "empty").features).toHaveLength(0);
  expect(makeRegions(0, "missing").features.filter(feature => feature.properties.value == null).length).toBeGreaterThan(map.features.filter(feature => feature.properties.value == null).length);
});

test("flow data conserves the intermediate quantity, and simple flow has fewer nodes", async () => {
  const { structureSankeyData } = await getModule();
  const data = structureSankeyData(0, false);
  for (const middle of [2, 3]) {
    const input = data.links.filter(link => link.target === middle).reduce((sum, link) => sum + link.value, 0);
    const output = data.links.filter(link => link.source === middle).reduce((sum, link) => sum + link.value, 0);
    expect(output).toBe(input);
  }
  expect(structureSankeyData(0, true).nodes.length).toBeLessThan(data.nodes.length);
});

test("sunburst legend follows drill and return, retaining focus offscreen", async () => {
  const { StructureVariant } = await getModule();
  const view = render(<StructureVariant variantId="sunburst-legend" {...props} />);
  const legend = screen.getByRole("group", { name: "当前层级图例" });
  expect(within(legend).getByRole("button", { name: /基础课程/ })).toBeVisible();
  fireEvent.click(within(legend).getByRole("button", { name: /基础课程/ }));
  expect(within(legend).queryByRole("button", { name: /进阶课程/ })).toBeNull();
  expect(within(legend).getByRole("button", { name: /视频/ })).toBeVisible();
  view.rerender(<StructureVariant variantId="sunburst-legend" {...props} active={false} />);
  view.rerender(<StructureVariant variantId="sunburst-legend" {...props} />);
  expect(screen.getByRole("group", { name: "当前层级图例" })).toHaveTextContent("视频");
  expect(view.container.querySelector('[data-rain-id="ui-breadcrumb"]')).toBeInTheDocument();
  fireEvent.click(screen.getByRole("link", { name: "返回学习内容" }));
  expect(screen.getByRole("group", { name: "当前层级图例" })).toHaveTextContent("进阶课程");
});

test("the default sunburst title becomes one library Breadcrumb after drill", async () => {
  const { ChartExample } = await import("../chart-examples");
  const view = render(<ChartExample id="sunburst" reduced showData={false} />);
  expect(screen.getByRole("heading", { name: "学习内容" })).toBeVisible();
  expect(view.container.querySelector("nav")).toBeNull();
  const segment = view.container.querySelector('svg g[style*="cursor: pointer"]');
  expect(segment).not.toBeNull();
  fireEvent.click(segment!);
  const trail = screen.getByRole("navigation", { name: "学习内容层级" });
  expect(trail).toHaveAttribute("data-rain-id", "ui-breadcrumb");
  expect(trail.querySelector("nav")).toBeNull();
  fireEvent.click(within(trail).getByRole("link", { name: "返回学习内容" }));
  expect(screen.getByRole("heading", { name: "学习内容" })).toBeVisible();
});

test("loading switches to ready and remains ready after an inactive visit", async () => {
  const { StructureVariant } = await getModule();
  const view = render(<StructureVariant variantId="heatmap-loading" {...props} />);
  fireEvent.click(screen.getByRole("button", { name: "显示数据" }));
  expect(screen.getByRole("button", { name: "开始加载" })).toBeVisible();
  view.rerender(<StructureVariant variantId="heatmap-loading" {...props} active={false} />);
  view.rerender(<StructureVariant variantId="heatmap-loading" {...props} />);
  expect(screen.getByRole("button", { name: "开始加载" })).toBeVisible();
});

test("downloaded loading settings restore the same control and report its next choice", async () => {
  const { StructureVariant } = await getModule();
  const changed = vi.fn();
  const view = render(<StructureVariant variantId="heatmap-loading" {...props} settings={{ loading: false }} onSettingsChange={changed} />);
  fireEvent.click(screen.getByRole("button", { name: "开始加载" }));
  expect(changed).toHaveBeenCalledWith({ loading: true });
  view.rerender(<StructureVariant variantId="heatmap-loading" {...props} settings={{ loading: true }} onSettingsChange={changed} />);
  expect(screen.getByRole("status")).toHaveTextContent("静态占位");
});

test("downloaded sunburst focus restores the current legend and emits root navigation", async () => {
  const { StructureVariant } = await getModule();
  const { buildArcs } = await import("@rain-next/ui/charts");
  const { makeHierarchy } = await import("../chart-data");
  const { arcs, rootId } = buildArcs(makeHierarchy(0));
  const focusId = arcs.find(arc => arc.name === "基础课程")!.id;
  const changed = vi.fn();
  const view = render(<StructureVariant variantId="sunburst-legend" {...props} settings={{ focusId }} onSettingsChange={changed} />);
  expect(screen.getByRole("group", { name: "当前层级图例" })).toHaveTextContent("视频");
  fireEvent.click(screen.getByRole("link", { name: "返回学习内容" }));
  expect(changed).toHaveBeenCalledWith({ focusId: rootId });
  view.rerender(<StructureVariant variantId="sunburst-legend" {...props} settings={{ focusId: rootId }} onSettingsChange={changed} />);
  expect(screen.getByRole("group", { name: "当前层级图例" })).toHaveTextContent("进阶课程");
});

test("horizontal scroll retains the same viewport and scroll position while inactive", async () => {
  const { StructureVariant } = await getModule();
  const view = render(<StructureVariant variantId="heatmap-horizontal-scroll" {...props} />);
  const viewport = screen.getByRole("region", { name: "全年活动日历，可横向滚动" });
  viewport.scrollLeft = 280;
  view.rerender(<StructureVariant variantId="heatmap-horizontal-scroll" {...props} active={false} />);
  expect(viewport.isConnected).toBe(true);
  view.rerender(<StructureVariant variantId="heatmap-horizontal-scroll" {...props} />);
  expect(screen.getByRole("region", { name: "全年活动日历，可横向滚动" })).toBe(viewport);
  expect(viewport.scrollLeft).toBe(280);
});

test("world-map zoom retains its transform across an inactive visit", async () => {
  const { StructureVariant } = await getModule();
  const view = render(<StructureVariant variantId="choropleth-interactive" {...props} />);
  await waitFor(() => expect(screen.getByRole("button", { name: "放大地图" })).toBeVisible());
  fireEvent.click(screen.getByRole("button", { name: "放大地图" }));
  const group = view.container.querySelector('svg > g[transform^="matrix"]')!;
  const before = group.getAttribute("transform");
  expect(before).toContain("1.2");
  view.rerender(<StructureVariant variantId="choropleth-interactive" {...props} active={false} />);
  expect(group.isConnected).toBe(true);
  view.rerender(<StructureVariant variantId="choropleth-interactive" {...props} />);
  expect(view.container.querySelector('svg > g[transform^="matrix"]')?.getAttribute("transform")).toBe(before);
});

test("fixed calendars end on complete weeks and quarterly labels exclude outside ghost dates", async () => {
  const { StructureVariant, structureHeatmapData } = await getModule();
  expect(structureHeatmapData(0, 6, 0).at(-1)!.bins.at(-1)!.date.getDate()).toBe(26);
  const monday = structureHeatmapData(0, 6, 1).at(-1)!;
  expect(monday.bins[0]!.date.getDate()).toBe(27);
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-10-08T00:00:00Z"));
  try {
    for (const [variantId, expectedLabels] of [["heatmap-solid-separators", ["Q2", "Q3"]], ["heatmap-contributions", ["Q4", "Q1", "Q2", "Q3"]]] as const) {
      const view = render(<StructureVariant variantId={variantId} {...props} />);
      await waitFor(() => expect(view.container.querySelectorAll('[data-slot="chart-root"] span').length).toBeGreaterThan(0));
      const labels = [...view.container.querySelectorAll('[data-slot="chart-root"] span')].map(node => node.textContent).filter(label => /^Q\d$/.test(label ?? ""));
      expect(labels).toEqual(expectedLabels);
      view.unmount();
    }
  } finally { vi.useRealTimers(); }
});
