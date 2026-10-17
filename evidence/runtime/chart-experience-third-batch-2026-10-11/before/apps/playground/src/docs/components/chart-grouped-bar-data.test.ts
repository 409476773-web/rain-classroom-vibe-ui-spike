import { expect, test } from "vitest";
import * as chartData from "./chart-data";

const makeGroupedBars = (chartData as unknown as Record<string, typeof chartData.makeBars>).makeGroupedBars!;
const metrics = ["enrolled", "completed", "returned", "answered", "reviewed"] as const;

test("grouped bar demos cycle three bounded snapshots with stable category identity", () => {
  expect(makeGroupedBars).toBeTypeOf("function");
  const snapshots = [0, 1, 2].map(revision => makeGroupedBars(revision));
  expect(new Set(snapshots.map(snapshot => JSON.stringify(snapshot))).size).toBe(3);
  expect(snapshots.every(snapshot => snapshot.length === 6)).toBe(true);
  for (const snapshot of snapshots) {
    expect(snapshot.map(row => row.label)).toEqual(chartData.makeBars().map(row => row.label));
    for (const row of snapshot) for (const metric of metrics) {
      expect(Number.isInteger(row[metric])).toBe(true);
      expect(row[metric]).toBeGreaterThanOrEqual(0);
      expect(row[metric]).toBeLessThanOrEqual(row.enrolled);
      expect(row.enrolled).toBeLessThanOrEqual(320);
    }
  }
  expect(makeGroupedBars(3)).toEqual(snapshots[0]);
  expect(makeGroupedBars(10000)).toEqual(snapshots[1]);
});

test("each grouped snapshot has category highs and lows, near pairs and distinct gaps", () => {
  expect(makeGroupedBars).toBeTypeOf("function");
  for (const revision of [0, 1, 2]) {
    const rows = makeGroupedBars(revision);
    const changes = rows.slice(1).map((row, index) => row.enrolled - rows[index]!.enrolled);
    expect(changes.some(change => change > 0)).toBe(true);
    expect(changes.some(change => change < 0)).toBe(true);
    expect(rows.some(row => row.enrolled - row.completed <= row.enrolled * .1)).toBe(true);
    expect(rows.some(row => row.enrolled - row.completed >= row.enrolled * .4)).toBe(true);
  }
});

test("curated grouped samples preserve the established empty, zero, single and long states", () => {
  expect(makeGroupedBars).toBeTypeOf("function");
  expect(makeGroupedBars(1, "empty")).toEqual([]);
  expect(makeGroupedBars(1, "zero")).toHaveLength(6);
  expect(makeGroupedBars(1, "zero").every(row => metrics.every(metric => row[metric] === 0))).toBe(true);
  expect(makeGroupedBars(1, "single")).toEqual(makeGroupedBars(1).slice(0, 1));
  expect(makeGroupedBars(1, "long").map(row => row.label)).toEqual(chartData.makeBars(1, "long").map(row => row.label));
});

test("legacy bar data stays unchanged for default mini and mutually exclusive stacked examples", () => {
  expect(chartData.makeBars(2).map(row => row.enrolled)).toEqual([192, 220, 248, 276, 304, 332]);
  expect(chartData.makeBars(2)[0]).toEqual({ label: "课程一", enrolled: 192, completed: 128, returned: 80, answered: 56, reviewed: 32 });
});
