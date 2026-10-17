import React from "react";
import { afterAll, expect, test, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import {
  buildHeatmapColorScaleFromStyles, buildHeatmapFillScale,
  HeatmapChart, HeatmapCells, HeatmapLegend,
  type HeatmapLevelStyles,
} from "./index";
import { formatHeatmapContributionLabel, getHeatmapContributionLevel } from "./vendor/charts/heatmap/heatmap-utils";

const levels = [
  { color: "var(--chart-scale-01)" }, { color: "var(--chart-scale-02)" },
  { color: "var(--chart-scale-03)", fillMode: "pattern", pattern: "diagonal" },
  { color: "var(--chart-scale-04)" }, { color: "var(--chart-scale-05)" },
] as const satisfies HeatmapLevelStyles;

test("zero uses the valid lowest color, while missing and non-finite readings use no-data", () => {
  const color = buildHeatmapColorScaleFromStyles(levels);
  const fill = buildHeatmapFillScale(levels);
  for (const scale of [color, fill]) {
    expect(scale(0)).toBe(levels[0].color);
    for (const value of [null, undefined, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(scale(value), `missing reading ${value}`).toBe("var(--chart-no-data)");
    }
  }
});

test("the shared hover level never matches missing readings to the zero legend swatch", () => {
  expect(getHeatmapContributionLevel(0)).toBe(0);
  for (const count of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
    expect(getHeatmapContributionLevel(count)).toBe(-1);
  }
});

test("the default contribution label reads missing data separately from valid zero", () => {
  expect(formatHeatmapContributionLabel(0)).toBe("0 contributions");
  expect(formatHeatmapContributionLabel(1)).toBe("1 contribution");
  for (const count of [-1, Number.NaN, Number.POSITIVE_INFINITY]) expect(formatHeatmapContributionLabel(count)).toBe("No data");
});

// JSDOM has no ResizeObserver; measurements belong to the browser, not chart logic.
vi.stubGlobal("ResizeObserver", class {
  constructor(private callback: ResizeObserverCallback) {}
  observe(target: Element) { this.callback([{ target, contentRect: { width: 640, height: 320 } } as ResizeObserverEntry], this as unknown as ResizeObserver); }
  unobserve() {}
  disconnect() {}
});
afterAll(() => vi.unstubAllGlobals());

test("two charts and their legends give every pattern a unique, local fill reference", async () => {
  const data = [{ bin: 0, bins: [{ bin: 0, count: 2, date: new Date(2026, 8, 6) }] }];
  const view = render(<>{[0, 1].map(index => <div key={index}>
    <HeatmapChart data={data} levelStyles={levels} animate={false}><HeatmapCells /></HeatmapChart>
    <HeatmapLegend levelStyles={levels} />
  </div>)}</>);
  await waitFor(() => expect(view.container.querySelectorAll("pattern[id]")).toHaveLength(4));
  const ids = [...view.container.querySelectorAll("pattern[id]")].map(pattern => pattern.id);
  expect(new Set(ids).size).toBe(4);
  await waitFor(() => expect(view.container.querySelectorAll('[fill*="heatmap-level-"]').length).toBeGreaterThanOrEqual(4));
  const references = [...view.container.querySelectorAll('[fill*="heatmap-level-"]')];
  for (const node of references) {
    const id = node.getAttribute("fill")!.slice(5, -1);
    expect([...node.closest("svg")!.querySelectorAll("pattern[id]")].some(pattern => pattern.id === id)).toBe(true);
  }
});
