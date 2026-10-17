import { expect, test } from "vitest";
import { getComparisonMax, getTrendComparisonMax, getProgressReading, compositionState, makeMiniRows, selectMiniRows } from "./mini-data";

test("comparing and sorting rows keeps stable identities and one shared scale", () => {
  const data = makeMiniRows();
  expect(data.slice(0,3).map(row => row.count)).toEqual([25,50,100]);
  const max = getComparisonMax(data);
  expect(max).toBe(100);
  const reversed = [...data].reverse();
  expect(getComparisonMax(reversed)).toBe(max);
  expect(makeMiniRows(1).map(row => row.id)).toEqual(data.map(row => row.id));
  expect(reversed.find(row => row.id === data[0]!.id)?.count).toBe(25);
});
test("missing, zero and invalid quantity inputs stay distinct", () => {
  expect(getComparisonMax(makeMiniRows(0,"zero"))).toBe(0);
  for (const row of makeMiniRows(0,"zero")) {
    expect(row.trend.every(value => value === 0)).toBe(true);
    expect(row.completed).toBe(0);
  }
  expect(getComparisonMax(makeMiniRows(0,"missing"))).toBe(100);
  expect(() => getComparisonMax([{ count: NaN }])).toThrow(/有限非负/);
});
test("the large-update fixture covers increase and decrease on the same scale", () => {
  const snapshots = [0,1,2].map(revision => makeMiniRows(revision));
  expect(snapshots.map(rows => rows[0]!.count)).toEqual([25,75,50]);
  expect(snapshots.map(rows => rows[0]!.id)).toEqual(["college-1","college-1","college-1"]);
  expect(snapshots.map(getComparisonMax)).toEqual([100,100,100]);
});
test("normal composition and progress show varied readable examples across display states", () => {
  for (const state of ["normal", "single", "long"] as const) {
    const rows = makeMiniRows(0, state);
    expect(rows[0]!.parts).toEqual([15, 6, 4]);
    expect(getProgressReading(rows[0]!.completed, rows[0]!.goal).percentText).toBe("68%");
  }
  const rows = makeMiniRows();
  expect(new Set(rows.map(row => row.parts[0]! / row.count!)).size).toBe(5);
  expect(new Set(rows.map(row => row.completed)).size).toBe(5);
});
test("curated composition and progress updates remain bounded while totals keep their shared scale", () => {
  const snapshots = [0, 1, 2].map(revision => makeMiniRows(revision));
  expect(snapshots.map(rows => rows[0]!.parts)).toEqual([[15, 6, 4], [33, 27, 15], [35, 9, 6]]);
  expect(snapshots.map(rows => rows[0]!.completed)).toEqual([68, 82, 61]);
  for (let revision = 0; revision < 12; revision++) {
    const rows = makeMiniRows(revision);
    expect(rows.map(row => row.completed)).toEqual(snapshots[revision % 3]!.map(row => row.completed));
    expect(getComparisonMax(rows)).toBe(100);
    for (const row of rows) {
      expect(row.parts.every(value => Number.isInteger(value) && value! > 0)).toBe(true);
      expect(row.parts.reduce<number>((sum, value) => sum + value!, 0)).toBe(row.count);
      expect(row.goal).toBe(100);
      expect(row.completed).toBeGreaterThan(0);
      expect(row.completed).toBeLessThan(row.goal);
    }
  }
});
test("curated display values leave missing, zero and invalid fixtures intact", () => {
  expect(makeMiniRows(2, "empty")).toEqual([]);
  const missing = makeMiniRows(2, "missing");
  expect(missing[0]).toMatchObject({ count: null, trend: Array(8).fill(null), parts: [null, 3, 2], completed: null, goal: 100 });
  expect(missing[1]).toMatchObject({ count: 56, parts: [28, 17, 11], completed: 43, goal: 100 });
  const invalid = makeMiniRows(2, "invalid");
  expect(invalid[0]).toMatchObject({ count: NaN, trend: Array(8).fill(NaN), parts: [NaN, NaN, NaN], completed: 28, goal: 100 });
  expect(invalid[1]).toMatchObject({ count: 56, parts: [28, 17, 11], completed: 43, goal: 100 });
  for (const row of makeMiniRows(2, "zero")) {
    expect(row).toMatchObject({ count: 0, trend: Array(8).fill(0), parts: [0, 0, 0], completed: 0, goal: 0 });
  }
});
test.each([
  [[0,0],"zero"], [[0,3],"normal"], [[null,3],"missing"], [[NaN,2],"invalid"], [[-1,2],"invalid"], [[Number.MAX_VALUE,Number.MAX_VALUE],"invalid"], [[],"empty"],
] as const)("composition %j keeps the %s state", (values,state) => expect(compositionState([...values])).toBe(state));
test("40-row entities keep the same identity and values through sorting and filtering", () => {
  const original = makeMiniRows();
  const full = selectMiniRows(original,{many:true});
  expect(full).toHaveLength(40);
  const sorted = selectMiniRows(original,{many:true,descending:true});
  expect(sorted.map(row=>row.id).sort()).toEqual(full.map(row=>row.id).sort());
  for (const row of full) expect(sorted.find(item=>item.id===row.id)).toEqual(row);
  const filtered=selectMiniRows(original,{many:true,filter:true});
  expect(filtered.every(row=>full.some(item=>item.id===row.id&&item.count===row.count))).toBe(true);
});

test("daily columns use the complete daily comparison set independently from total people", () => {
  const rows = [{ count: 100, trend: [4, 22, null] }, { count: 50, trend: [0, 10, 18] }];
  expect(getComparisonMax(rows)).toBe(100);
  expect(getTrendComparisonMax(rows)).toBe(22);
  expect(getTrendComparisonMax([...rows].reverse())).toBe(22);
  expect(getTrendComparisonMax(rows)).toBe(22); // Filtering a view must retain the original domain.
});

test.each([[], [{ trend: [] }], [{ trend: [null, null] }], [{ trend: [0, 0, null] }]].map(rows => ({ rows })))("empty or zero daily comparison $rows keeps an external zero maximum", ({ rows }) => {
  expect(getTrendComparisonMax(rows)).toBe(0);
});

test.each([NaN, Infinity, -Infinity, -1])("daily comparison rejects invalid value %s", value => {
  expect(() => getTrendComparisonMax([{ trend: [value] }])).toThrow(/有限非负/);
});

test.each([
  [20, 80, "normal", .25, "25%"], [0, 80, "zero", 0, "0%"], [80, 80, "normal", 1, "100%"],
  [0, 0, "inapplicable", null, "不适用"], [null, 80, "missing", null, "缺测"],
  [81, 80, "overflow", null, "超出范围"], [1, 0, "invalid", null, "无效数据"],
  [NaN, 80, "invalid", null, "无效数据"], [Infinity, 80, "invalid", null, "无效数据"], [-1, 80, "invalid", null, "无效数据"],
  [20, NaN, "invalid", null, "无效数据"], [20, Infinity, "invalid", null, "无效数据"], [20, -1, "invalid", null, "无效数据"],
] as const)("progress %s / %s preserves %s and the actual denominator", (value, maxValue, state, fraction, percentText) => {
  expect(getProgressReading(value, maxValue)).toEqual({ state, fraction, percentText });
});
