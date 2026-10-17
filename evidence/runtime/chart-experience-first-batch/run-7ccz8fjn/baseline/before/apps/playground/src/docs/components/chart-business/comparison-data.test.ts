import { expect, test } from "vitest";
import { alignComparisonSlots, makeCategoryFixtures, type PeriodPoint } from "./comparison-data";

const point = (slotId: string, date: string, value: number | null): PeriodPoint => ({ slotId, slotLabel: `第${slotId}天`, date, value });

test("declared period slots align across years and keep each original date", () => {
  expect(alignComparisonSlots([point("1", "2027-01-01", 10), point("2", "2027-01-02", 0)], [point("1", "2026-12-24", 8)]))
    .toEqual([
      { slotId: "1", slotLabel: "第1天", currentDate: "2027-01-01", previousDate: "2026-12-24", currentValue: 10, previousValue: 8 },
      { slotId: "2", slotLabel: "第2天", currentDate: "2027-01-02", previousDate: null, currentValue: 0, previousValue: null },
    ]);
});

test("a leap day remains a real observation and unequal tails stay null", () => {
  const aligned = alignComparisonSlots([point("1", "2024-02-28", 1), point("2", "2024-02-29", null), point("3", "2024-03-01", 3)], [point("1", "2023-02-28", 4), point("2", "2023-03-01", 5)]);
  expect(aligned.map(row => [row.currentDate, row.previousDate])).toEqual([["2024-02-28", "2023-02-28"], ["2024-02-29", "2023-03-01"], ["2024-03-01", null]]);
  expect(aligned[1]?.currentValue).toBeNull();
  expect(aligned[2]?.previousValue).toBeNull();
});

test("previous-only slots are retained with an absent current reading", () => {
  const rows = alignComparisonSlots([point("1", "2026-01-01", 0)], [point("1", "2025-01-01", 2), point("2", "2025-01-02", 3)]);
  expect(rows[1]).toMatchObject({ slotId: "2", currentDate: null, currentValue: null, previousValue: 3 });
  expect(alignComparisonSlots([], [])).toEqual([]);
});

test.each([
  [point("1", "2025-02-29", 1)], [point("1", "2026-13-01", 1)], [point("1", "bad-date", 1)],
  [point("1", "2026-01-01", NaN)], [point("1", "2026-01-01", Infinity)], [point("1", "2026-01-01", -1)],
  [point("1", "2026-01-01", 1), point("1", "2026-01-02", 2)],
])("invalid period observations are rejected", (...points) => {
  expect(() => alignComparisonSlots(points, [])).toThrow();
});

test("the same alignment slot cannot quietly mean two different labels", () => {
  expect(() => alignComparisonSlots([point("1", "2026-01-01", 1)], [{ ...point("1", "2025-01-01", 1), slotLabel: "第二教学周" }])).toThrow(/label|名称/);
});

test("six business fixtures preserve stable IDs, duplicate names and fixed percent/score axes", () => {
  const fixtures = makeCategoryFixtures();
  expect(fixtures.map(fixture => fixture.id)).toEqual(["semester", "colleges", "knowledge", "period", "version", "score"]);
  const colleges = fixtures.find(fixture => fixture.id === "colleges")!;
  expect(colleges.rows[0]?.label).toBe(colleges.rows[2]?.label);
  expect(colleges.rows[0]?.id).not.toBe(colleges.rows[2]?.id);
  expect(colleges.yDomains).toEqual({ right: [0, 100] });
  expect(fixtures.find(fixture => fixture.id === "score")?.yDomains).toEqual({ left: [0, 10] });
  for (const fixture of fixtures) expect(new Set(fixture.rows.map(row => row.id)).size).toBe(fixture.rows.length);
});

test("state fixtures retain zero, missing, empty, single and updated identities", () => {
  const normal = makeCategoryFixtures(), updated = makeCategoryFixtures(1);
  expect(updated[0]?.rows.map(row => row.id)).toEqual(normal[0]?.rows.map(row => row.id));
  expect(updated[0]?.rows[0]?.students).not.toBe(normal[0]?.rows[0]?.students);
  expect(makeCategoryFixtures(0, "empty").every(fixture => fixture.rows.length === 0)).toBe(true);
  expect(makeCategoryFixtures(0, "single").every(fixture => fixture.rows.length === 1)).toBe(true);
  for (const fixture of makeCategoryFixtures(0, "zero")) for (const series of fixture.series) expect(fixture.rows.every(row => row[series.key] === 0 || row[series.key] === null)).toBe(true);
  for (const fixture of makeCategoryFixtures(0, "missing")) for (const series of fixture.series) expect(fixture.rows[1]?.[series.key]).toBeNull();
});

test("zero-total knowledge layers keep their coverage rate not applicable", () => {
  expect(makeCategoryFixtures(0, "zero").find(fixture => fixture.id === "knowledge")!.rows.every(row => row.covered === 0 && row.uncovered === 0 && row.rate === null)).toBe(true);
});
