import { expect, test } from "vitest";
import { splitProfitLossSegments } from "@rain-next/ui/charts";
import {
  makeTimeline, makeMissingTimeline, makeCategories, makeBars, makeRings, makeRadar,
  makeFunnel, makeFlow, makeHierarchy, hierarchyLeaves, makeHeatmap, makeRegions,
  makeCandles, makeProfitLoss, makeLivePoints, runCatalogDataChecks,
} from "./chart-data";

const fixedNow = 1_791_324_000;
const scenes: [string, (revision: number) => unknown][] = [
  ["timeline", revision => makeTimeline(revision)],
  ["categories", revision => makeCategories(revision, "normal", 5)],
  ["bars", revision => makeBars(revision)],
  ["rings", revision => makeRings(revision, "normal", 5)],
  ["radar", revision => makeRadar(revision, "normal", 5)],
  ["funnel", revision => makeFunnel(revision)],
  ["flow", revision => makeFlow(revision)],
  ["hierarchy", revision => makeHierarchy(revision)],
  ["heatmap", revision => makeHeatmap(revision)],
  ["regions", revision => makeRegions(revision)],
  ["candles", revision => makeCandles(revision)],
  ["profit and loss", revision => makeProfitLoss(revision)],
  ["live observations", revision => makeLivePoints(fixedNow, revision)],
];

test.each(scenes)("%s uses three distinct reproducible scenes and bounded updates", (_name, scene) => {
  const snapshots = [0, 1, 2].map(scene);
  expect(new Set(snapshots.map(snapshot => JSON.stringify(snapshot))).size).toBe(3);
  expect(scene(3)).toEqual(snapshots[0]);
  expect(scene(61)).toEqual(snapshots[1]);
});

test("timeline scenes retain 24 ordered dates and truthful count and completion readings", () => {
  const identities = makeTimeline().map(point => point.date.getTime());
  for (const revision of [0, 1, 2]) {
    const rows = makeTimeline(revision);
    expect(rows).toHaveLength(24);
    expect(rows.map(point => point.date.getTime())).toEqual(identities);
    for (const point of rows) {
      for (const key of ["enrolled", "completed", "returned", "answered", "reviewed"] as const) {
        expect(Number.isInteger(point[key])).toBe(true);
        expect(point[key]).toBeGreaterThanOrEqual(0);
        expect(point[key]).toBeLessThanOrEqual(point.enrolled);
      }
      expect(point.rate).toBe(point.completed / point.enrolled * 100);
    }
  }
  expect(makeTimeline(0, "zero").every(point => point.enrolled === 0 && point.completed === 0 && point.rate === null)).toBe(true);
  expect(makeTimeline(1, "single")).toEqual(makeTimeline(1).slice(0, 1));
});

test("the existing missing-data phases retain their mask, valid zero and unavailable rate", () => {
  for (const revision of [0, 1, 2, 3, 4, 5]) {
    const rows = makeMissingTimeline(revision);
    expect(rows).toHaveLength(24);
    rows.forEach((point, index) => {
      const missing = revision % 3 === 2 || index % 6 === 1 || index === 23;
      expect(point.enrolled === null).toBe(missing);
      expect(point.completed === null).toBe(missing);
      if (missing) expect([point.rate, point.returned, point.answered, point.reviewed]).toEqual([null, null, null, null]);
      else if (index === 2) expect([point.enrolled, point.completed, point.rate]).toEqual([0, 0, null]);
      else if (revision % 3 === 1) expect(point.rate).toBeNull();
      else expect(point.rate).toBe(point.completed! / point.enrolled! * 100);
    });
  }
});

test("composition, independent targets and radar readings retain their quantitative bounds", () => {
  for (const revision of [0, 1, 2]) {
    expect(makeCategories(revision, "normal", 5).every(item => Number.isInteger(item.value) && item.value > 0)).toBe(true);
    for (const ring of makeRings(revision, "normal", 5)) {
      expect(ring.maxValue).toBe(100);
      expect(ring.value).toBeGreaterThan(0);
      expect(ring.value).toBeLessThanOrEqual(ring.maxValue);
    }
    for (const item of makeRadar(revision, "normal", 5)) for (const value of Object.values(item.values)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    }
  }
});

test("funnel and flow scenes keep the entry denominator and conserve intermediate flows", () => {
  expect(makeFunnel().map(stage => stage.value)).toEqual([1000, 840, 650, 480]);
  for (const revision of [0, 1, 2]) {
    const funnel = makeFunnel(revision);
    expect(funnel.every((stage, index) => stage.value > 0 && (index === 0 || stage.value <= funnel[index - 1]!.value))).toBe(true);
    const flow = makeFlow(revision);
    expect(flow.nodes).toHaveLength(6);
    expect(flow.links).toHaveLength(8);
    for (const node of [2, 3]) {
      const input = flow.links.filter(link => link.target === node).reduce((sum, link) => sum + link.value, 0);
      const output = flow.links.filter(link => link.source === node).reduce((sum, link) => sum + link.value, 0);
      expect(output).toBe(input);
    }
  }
});

test("hierarchy scenes preserve paths and equal totals when long labels add one level", () => {
  const paths = hierarchyLeaves(makeHierarchy()).map(leaf => leaf.label);
  for (const revision of [0, 1, 2]) {
    const normal = hierarchyLeaves(makeHierarchy(revision));
    const long = hierarchyLeaves(makeHierarchy(revision, "long"));
    expect(normal.map(leaf => leaf.label)).toEqual(paths);
    expect(long.reduce((sum, leaf) => sum + leaf.value, 0)).toBe(normal.reduce((sum, leaf) => sum + leaf.value, 0));
  }
});

test("calendar activity keeps dates, level range and the existing no-data sentinel", () => {
  for (const revision of [0, 1, 2]) for (const [week, column] of makeHeatmap(revision, "missing").entries()) {
    expect(column.bins).toHaveLength(7);
    for (const [day, cell] of column.bins.entries()) {
      expect(cell.date.getTime()).toBe(new Date(2026, 5, 7 + week * 7 + day).getTime());
      expect(cell.count === -1).toBe(day === 3 && week % 4 === 0);
      if (cell.count !== -1) {
        expect(cell.count).toBeGreaterThanOrEqual(0);
        expect(cell.count).toBeLessThanOrEqual(4);
      }
    }
  }
});

test("regional samples retain geometry, stable identities and distinct zero and missing states", () => {
  const original = makeRegions();
  for (const revision of [0, 1, 2]) {
    const updated = makeRegions(revision);
    expect(updated.features.map(feature => feature.properties.id)).toEqual(original.features.map(feature => feature.properties.id));
    updated.features.forEach((feature, index) => {
      expect(feature.geometry).toBe(original.features[index]!.geometry);
      if (feature.properties.value != null) {
        expect(feature.properties.value).toBeGreaterThanOrEqual(0);
        expect(feature.properties.value).toBeLessThanOrEqual(100);
      }
    });
    expect(updated.features.map(feature => feature.properties.value == null)).toEqual(original.features.map(feature => feature.properties.value == null));
  }
  expect(makeRegions(1, "zero").features.every(feature => feature.properties.value === 0)).toBe(true);
});

test("financial scenes retain ordered dates, lawful OHLC and signed observations with a genuine zero state", () => {
  for (const revision of [0, 1, 2]) {
    const candles = makeCandles(revision);
    expect(candles).toHaveLength(20);
    candles.forEach((point, index) => {
      expect(point.date.getTime()).toBe(new Date(2026, 8, index + 1).getTime());
      expect([point.open, point.high, point.low, point.close].every(value => Number.isFinite(value) && value >= 0)).toBe(true);
      expect(point.high).toBeGreaterThanOrEqual(Math.max(point.open, point.close));
      expect(point.low).toBeLessThanOrEqual(Math.min(point.open, point.close));
    });
    expect(candles.some(point => point.close > point.open)).toBe(true);
    expect(candles.some(point => point.close < point.open)).toBe(true);
    expect(candles.some(point => point.close === point.open)).toBe(true);
    const signed = makeProfitLoss(revision);
    expect(signed).toHaveLength(24);
    expect(signed.some(point => point.value > 0)).toBe(true);
    expect(signed.some(point => point.value < 0)).toBe(true);
    expect(makeProfitLoss(revision, "zero")).toHaveLength(24);
    expect(makeProfitLoss(revision, "zero").every(point => point.value === 0)).toBe(true);
  }
});

test.each([0, 1, 2])("signed demo segments match every actual nonzero reading in scene %s", revision => {
  const segments = splitProfitLossSegments({ data: makeProfitLoss(revision), dataKey: "value", xAccessor: point => point.date as Date });
  expect(segments.length).toBeGreaterThan(1);
  for (const segment of segments) {
    expect(segment.data.every(point => point.value === 0 || ((point.value as number) > 0) === segment.isPositive)).toBe(true);
  }
});

test("live initialization and a single appended observation share the absolute Unix-second phase", () => {
  for (const revision of [0, 1, 2]) {
    const rows = makeLivePoints(fixedNow, revision);
    expect(rows).toHaveLength(60);
    expect(rows.at(-1)).toEqual(makeLivePoints(fixedNow, revision, "single")[0]);
    expect(rows.map(point => point.time)).toEqual(Array.from({ length: 60 }, (_, index) => fixedNow - 59 + index));
    expect(rows.every(point => Number.isInteger(point.value) && point.value >= 0)).toBe(true);
  }
});

test("catalog trust checks and special empty and zero states remain valid", () => {
  expect(runCatalogDataChecks()).toBe("catalog-data checks passed");
  expect(makeTimeline(1, "empty")).toEqual([]);
  expect(makeCategories(1, "empty")).toEqual([]);
  expect(makeCandles(1, "zero").every(point => [point.open, point.high, point.low, point.close].every(value => value === 0))).toBe(true);
  expect(makeLivePoints(fixedNow, 1, "zero").every(point => point.value === 0)).toBe(true);
});
