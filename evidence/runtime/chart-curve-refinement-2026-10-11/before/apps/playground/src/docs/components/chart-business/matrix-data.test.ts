import { expect, test } from "vitest";
import { getMatrixDataIndex, getMatrixEncoding, type MatrixCell } from "@rain-next/ui/charts";
import { makeMatrixFixtures } from "./matrix-data";

test("business fixtures declare all five Mock matrix families and complete weekday-hour coverage", () => {
  const fixtures = makeMatrixFixtures();
  expect(fixtures.map(fixture => fixture.id)).toEqual(["weekday-hour", "course-version", "course-similarity", "course-count", "support-level"]);
  const weekdays = fixtures[0]!;
  expect(weekdays.rows).toHaveLength(7);
  expect(weekdays.columns).toHaveLength(24);
  const index = getMatrixDataIndex(weekdays.rows, weekdays.columns, weekdays.cells);
  expect([...index.values()].reduce((count, row) => count + row.size, 0)).toBe(168);
});

test("course-version fixtures keep unset semester and absent course distinct", () => {
  const courses = makeMatrixFixtures()[1]!;
  expect(courses).toBeDefined();
  expect(courses.cells).toContainEqual(expect.objectContaining({ kind: "missing", label: "未设学期" }));
  expect(courses.cells).toContainEqual(expect.objectContaining({ kind: "not-applicable", label: "无该课程" }));
  for (const cell of courses.cells) if (cell.kind === "value") {
    expect(Number.isInteger(cell.value)).toBe(true);
    expect(cell.value).toBeGreaterThanOrEqual(1);
    expect(cell.value).toBeLessThanOrEqual(8);
  }
  const unset = makeMatrixFixtures(0, "zero")[1]!;
  expect(unset.cells.some(cell => cell.kind === "value" && cell.value === 0)).toBe(false);
  expect(unset.cells).toContainEqual(expect.objectContaining({ kind: "missing", label: "未设学期" }));
});

test("semester cell formatting keeps only its number while caption supplies its meaning", () => {
  const fixture = makeMatrixFixtures()[1]!;
  expect(fixture.caption).toContain("开课学期");
  expect(fixture.encoding).toMatchObject({ kind: "heat", steps: [1, 2, 3, 4, 5, 6, 7, 8] });
  expect(getMatrixEncoding(fixture.encoding, fixture.valueFormat).legend.map(item => item.label)).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  expect(getMatrixEncoding(fixture.encoding, fixture.valueFormat).encode({rowId:"course-1",columnId:"version-1",kind:"value",value:8}).label).toBe("8");
});

test.each([4, 6, 12] as const)("%s-order similarity Mock keeps shared IDs, missing diagonals and directed readings", size => {
  const similarity = makeMatrixFixtures(0, "normal", size)[2]!;
  expect(similarity).toBeDefined();
  expect(similarity.rows).toHaveLength(size);
  expect(similarity.columns.map(item => item.id)).toEqual(similarity.rows.map(item => item.id));
  const index = getMatrixDataIndex(similarity.rows, similarity.columns, similarity.cells);
  expect(index.get(similarity.rows[0]!.id)?.get(similarity.rows[0]!.id)?.kind).toBe("missing");
  expect(index.get(similarity.rows[0]!.id)?.get(similarity.rows[1]!.id)).not.toHaveProperty("value", (index.get(similarity.rows[1]!.id)?.get(similarity.rows[0]!.id) as Extract<MatrixCell, { kind: "value" }>).value);
  expect(similarity.encoding).toEqual({ kind: "heat", domain: [0, 1] });
});

test("bubble and support fixtures share truthful scales while CH145 retains only three grades", () => {
  const fixtures = makeMatrixFixtures();
  const counts = fixtures[3]!;
  expect(counts).toBeDefined();
  const countModel = getMatrixEncoding(counts.encoding, counts.valueFormat);
  expect(counts.encoding.kind).toBe("bubble");
  expect(counts.encoding).toMatchObject({ maxRadius: 18 });
  for (const cell of counts.cells) expect(() => countModel.encode(cell)).not.toThrow();
  const support = fixtures[4]!;
  expect(support.sourceIds).toEqual(["CH145"]);
  expect(getMatrixEncoding(support.encoding).legend.map(item => item.label)).toEqual(["无直接支撑", "一般支撑", "核心支撑"]);
  const allZero = makeMatrixFixtures(0, "zero")[3]!;
  expect(allZero.encoding).toMatchObject({ kind: "bubble", domainMax: 0 });
  for (const cell of allZero.cells) if (cell.kind === "value") expect(getMatrixEncoding(allZero.encoding).encode(cell).radius).toBe(0);
});

test.each(["empty", "single", "long", "missing", "invalid"] as const)("five business fixtures support the %s state without changing axis IDs", state => {
  const base = makeMatrixFixtures();
  const fixtures = makeMatrixFixtures(0, state);
  expect(fixtures).toHaveLength(5);
  for (const [index, fixture] of fixtures.entries()) {
    if (state === "empty") expect(fixture.rows).toHaveLength(0);
    if (state === "single") { expect(fixture.rows).toHaveLength(1); expect(fixture.columns).toHaveLength(1); }
    if (state === "long") { expect(fixture.rows[0]!.label.length).toBeGreaterThan(base[index]!.rows[0]!.label.length); expect(fixture.rows.map(row => row.id)).toEqual(base[index]!.rows.map(row => row.id)); }
    if (state === "missing") expect(fixture.cells.some(cell => cell.kind === "missing")).toBe(true);
    if (state === "invalid") expect(fixture.cells.some(cell => cell.kind === "value" && Number.isNaN(cell.value))).toBe(true);
  }
});

test("Mock updates retain axis IDs and modify valid values inside each declared scale", () => {
  const base = makeMatrixFixtures();
  const updated = makeMatrixFixtures(1);
  expect(updated).toHaveLength(5);
  for (const [index, fixture] of updated.entries()) {
    expect(fixture.rows.map(row => row.id)).toEqual(base[index]!.rows.map(row => row.id));
    expect(fixture.columns.map(column => column.id)).toEqual(base[index]!.columns.map(column => column.id));
    expect(fixture.cells).not.toEqual(base[index]!.cells);
    const model = getMatrixEncoding(fixture.encoding, fixture.valueFormat);
    for (const cell of fixture.cells) expect(() => model.encode(cell)).not.toThrow();
  }
});

test("all matrix snapshots repeat after three updates while keeping semantic holes and scales", () => {
  for (const size of [4, 6, 12] as const) for (let revision = 0; revision < 12; revision++) {
    const fixtures = makeMatrixFixtures(revision, "normal", size), repeated = makeMatrixFixtures(revision + 3, "normal", size);
    expect(fixtures.map(fixture => fixture.cells)).toEqual(repeated.map(fixture => fixture.cells));
    for (const fixture of fixtures) {
      const model = getMatrixEncoding(fixture.encoding, fixture.valueFormat);
      for (const cell of fixture.cells) expect(() => model.encode(cell)).not.toThrow();
    }
    expect(fixtures[1]!.cells[2]!.kind).toBe("missing");
    expect(fixtures[1]!.cells[9]!.kind).toBe("not-applicable");
  }
});

test("weekday-hour data makes overnight activity distinct from visible study peaks", () => {
  const fixture = makeMatrixFixtures()[0]!;
  const night = fixture.cells.filter(cell => fixture.columns.slice(0, 6).some(column => column.id === cell.columnId));
  const daytime = fixture.cells.filter(cell => fixture.columns.slice(8, 22).some(column => column.id === cell.columnId));
  const values = (cells: MatrixCell[]) => cells.flatMap(cell => cell.kind === "value" ? [cell.value] : []);
  expect(Math.max(...values(night))).toBeLessThanOrEqual(4);
  expect(Math.max(...values(daytime))).toBeGreaterThanOrEqual(16);
  expect(values(fixture.cells).some(value => value === 0)).toBe(true);
});

test("available self-similarity is complete while missing diagonals remain absent", () => {
  for (const size of [4, 6, 12] as const) {
    const fixture = makeMatrixFixtures(0, "normal", size)[2]!;
    const diagonal = fixture.cells.filter(cell => cell.rowId === cell.columnId);
    expect(diagonal).toHaveLength(size - Math.ceil(size / 3));
    expect(diagonal.every(cell => cell.kind === "value" && cell.value === 1)).toBe(true);
  }
});
