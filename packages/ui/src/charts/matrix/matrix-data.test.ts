import { expect, test } from "vitest";
import { getMatrixDataIndex, getMatrixEncoding, type MatrixCell, type MatrixEncoding } from "./matrix-data";

const rows = [{ id: "course-a", label: "课程 A" }, { id: "course-b", label: "课程 B" }];
const columns = [{ id: "version-a", label: "版本 A" }, { id: "version-b", label: "版本 B" }];
const value = (reading: number): MatrixCell => ({ rowId: "course-a", columnId: "version-a", kind: "value", value: reading });
const heat = { kind: "heat", domain: [0, 1] } as const;
const levels = [{ value: 0, label: "无直接支撑", color: "var(--chart-scale-01)" }, { value: 1, label: "一般支撑", color: "var(--chart-scale-03)" }, { value: 2, label: "核心支撑", color: "var(--chart-scale-05)" }];

test("index uses stable IDs after either axis is reordered and fills absent coordinates with missing", () => {
  const cells: MatrixCell[] = [value(0), { rowId: "course-b", columnId: "version-b", kind: "not-applicable", label: "无该课程" }];
  const index = getMatrixDataIndex([...rows].reverse(), [...columns].reverse(), cells);
  expect(index.get("course-a")?.get("version-a")).toEqual(value(0));
  expect(index.get("course-a")?.get("version-b")).toEqual({ rowId: "course-a", columnId: "version-b", kind: "missing" });
  expect(index.get("course-b")?.get("version-b")?.kind).toBe("not-applicable");
});

test("empty axes form an empty index without inventing readings", () => {
  expect(getMatrixDataIndex([], [], []).size).toBe(0);
});

test.each(["row", "column"])("duplicate %s IDs are rejected", axis => {
  expect(() => getMatrixDataIndex(axis === "row" ? [rows[0]!, rows[0]!] : rows, axis === "column" ? [columns[0]!, columns[0]!] : columns, [])).toThrow(/重复/);
});

test("duplicate coordinates are rejected", () => {
  expect(() => getMatrixDataIndex(rows, columns, [value(0), value(1)])).toThrow(/重复/);
});

test.each(["row", "column"])("unknown %s references are rejected", axis => {
  expect(() => getMatrixDataIndex(rows, columns, [{ ...value(0), ...(axis === "row" ? { rowId: "unknown" } : { columnId: "unknown" }) }])).toThrow(/未知/);
});

test("coordinates that contain a separator cannot collide", () => {
  const index = getMatrixDataIndex([{ id: "a|b", label: "一" }, { id: "a", label: "二" }], [{ id: "c", label: "一" }, { id: "b|c", label: "二" }], [
    { rowId: "a|b", columnId: "c", kind: "value", value: 3 }, { rowId: "a", columnId: "b|c", kind: "value", value: 5 },
  ]);
  expect(index.get("a|b")?.get("c")).toHaveProperty("value", 3);
  expect(index.get("a")?.get("b|c")).toHaveProperty("value", 5);
});

test.each([[0, 0], [1, 0], [NaN, 1], [0, Infinity], [-Number.MAX_VALUE, Number.MAX_VALUE]])("heat domain %s to %s is rejected", (min, max) => {
  expect(() => getMatrixEncoding({ kind: "heat", domain: [min, max] })).toThrow(/值域/);
});

test.each([-0.1, 1.1])("out-of-domain heat reading %s is rejected rather than clamped", reading => {
  expect(() => getMatrixEncoding(heat).encode(value(reading))).toThrow(/超出/);
});

test("heat color, fraction, exact reading and legend come from the same encoding", () => {
  const model = getMatrixEncoding(heat, reading => `${reading * 100}%`);
  const encoded = model.encode(value(.5));
  expect(encoded).toMatchObject({ kind: "value", value: .5, fraction: .5, label: "50%" });
  expect(encoded.color).toBe("var(--chart-scale-03)");
  expect(model.legend).toEqual([0, 1].map(reading => model.encode(value(reading))));
  expect(getMatrixEncoding({ kind: "heat", domain: [-1, 1] }).encode(value(0)).fraction).toBe(.5);
});

test("heat and bubble use the same sequential fill at the same normalized fraction", () => {
  const heatModel = getMatrixEncoding({ kind: "heat", domain: [-20, 80] });
  const bubbleModel = getMatrixEncoding({ kind: "bubble", domainMax: 100 });
  for (const reading of [0, 12.5, 25, 37.5, 50, 75, 100]) {
    expect(heatModel.encode(value(reading - 20)).color).toBe(bubbleModel.encode(value(reading)).color);
  }
});

test("a continuous heat legend labels the explicit domain endpoints", () => {
  expect(getMatrixEncoding({ kind: "heat", domain: [1, 8] }, semester => `第${semester}学期`).legend.map(item => item.label)).toEqual(["第1学期", "第8学期"]);
});

test("an ordinal heat legend contains exactly its declared steps and rejects intermediate readings", () => {
  const steps = [1, 2, 3, 4, 5, 6, 7, 8];
  const model = getMatrixEncoding({ kind: "heat", domain: [1, 8], steps }, semester => `第${semester}学期`);
  expect(model.legend.map(item => item.value)).toEqual(steps);
  expect(model.legend.map(item => item.label)).toEqual(steps.map(semester => `第${semester}学期`));
  for (const step of steps) expect(model.encode(value(step)).color).toBe(getMatrixEncoding({ kind: "heat", domain: [1, 8] }).encode(value(step)).color);
  expect(() => model.encode(value(2.4))).toThrow(/步值/);
  expect(() => getMatrixEncoding({ kind: "heat", domain: [1, 8], steps: [1, 4, 8] }).encode(value(2))).toThrow(/步值/);
});

test.each([
  [], [1], [8], [1, 2, 2, 8], [1, 4, 3, 8], [0, 1, 8], [1, 8, 9], [1, NaN, 8], [1, Infinity, 8], [2, 8], [1, 7],
].map(steps => ({ steps })))("invalid ordinal heat steps $steps are rejected", ({ steps }) => {
  expect(() => getMatrixEncoding({ kind: "heat", domain: [1, 8], steps })).toThrow(/步值/);
});

test("an explicit null step list is rejected rather than silently reverting to continuous heat", () => {
  expect(() => getMatrixEncoding({ kind: "heat", domain: [1, 8], steps: null as unknown as number[] })).toThrow(/步值/);
});

test.each([NaN, Infinity, -Infinity, null])("a value cell cannot silently encode %s as zero", reading => {
  expect(() => getMatrixEncoding(heat).encode(value(reading as number))).toThrow(/有限/);
});

test("bubble area is proportional to quantity and zero has no positive area", () => {
  const model = getMatrixEncoding({ kind: "bubble", domainMax: 100, maxRadius: 14 });
  const small = model.encode(value(25));
  const large = model.encode(value(100));
  expect(small.radius).toBe(7);
  expect(large.radius).toBe(14);
  expect(small.radius! ** 2 / large.radius! ** 2).toBe(.25);
  expect(model.encode(value(0))).toMatchObject({ label: "0", radius: 0 });
  expect(model.legend).toEqual([25, 50, 100].map(reading => model.encode(value(reading))));
});

test("bubble fill follows the declared quantity domain through all five sequential palette stops", () => {
  const model = getMatrixEncoding({ kind: "bubble", domainMax: 100 });
  expect([0, 25, 50, 75, 100].map(reading => model.encode(value(reading)).color)).toEqual([
    "var(--chart-scale-01)", "var(--chart-scale-02)", "var(--chart-scale-03)", "var(--chart-scale-04)", "var(--chart-scale-05)",
  ]);
  expect(model.encode(value(37.5)).color).toBe("color-mix(in srgb, var(--chart-scale-03) 50%, var(--chart-scale-02))");
});

test("bubble color and area use the same domain fraction regardless of value units or maximum radius", () => {
  const first = getMatrixEncoding({ kind: "bubble", domainMax: 100, maxRadius: 14 }).encode(value(25));
  const scaled = getMatrixEncoding({ kind: "bubble", domainMax: 200, maxRadius: 14 }).encode(value(50));
  expect(scaled).toMatchObject({ fraction: first.fraction, radius: first.radius, color: first.color });
  const smaller = getMatrixEncoding({ kind: "bubble", domainMax: 200, maxRadius: 14 }).encode(value(25));
  expect(smaller.fraction).toBeLessThan(first.fraction!);
  expect(smaller.radius).toBeLessThan(first.radius!);
  expect(smaller.color).not.toBe(first.color);
  expect(getMatrixEncoding({ kind: "bubble", domainMax: 100, maxRadius: 18 }).encode(value(25)).color).toBe(first.color);
});

test("all-zero bubble domain remains finite and contains only the zero legend", () => {
  const model = getMatrixEncoding({ kind: "bubble", domainMax: 0 });
  expect(model.encode(value(0))).toMatchObject({ radius: 0, fraction: 0, label: "0" });
  expect(model.legend).toHaveLength(1);
  expect(() => model.encode(value(1))).toThrow(/超出/);
});

test.each([-1, NaN, Infinity])("invalid bubble maximum %s is rejected", domainMax => {
  expect(() => getMatrixEncoding({ kind: "bubble", domainMax })).toThrow(/值域/);
});

test.each([-1, 101, NaN, Infinity])("invalid bubble reading %s is rejected", reading => {
  expect(() => getMatrixEncoding({ kind: "bubble", domainMax: 100 }).encode(value(reading))).toThrow();
});

test.each([0, -1, NaN, Infinity, Number.MAX_VALUE])("invalid bubble radius %s is rejected", maxRadius => {
  expect(() => getMatrixEncoding({ kind: "bubble", domainMax: 100, maxRadius })).toThrow(/半径/);
});

test("discrete support grades use exactly the explicit labels and colors", () => {
  const model = getMatrixEncoding({ kind: "level", levels });
  expect(model.legend).toHaveLength(3);
  for (const level of levels) {
    expect(model.encode(value(level.value))).toMatchObject({ label: level.label, color: level.color });
  }
  expect(() => model.encode(value(1.5))).toThrow(/等级/);
  expect(() => model.encode(value(3))).toThrow(/等级/);
});

test.each([
  [], [levels[0]!, levels[0]!], [{ value: NaN, label: "未知", color: "blue" }],
  [{ value: 1, label: "", color: "blue" }], [{ value: 1, label: "支撑", color: "" }],
].map(levels => ({ levels })))("invalid level mapping is rejected", ({ levels }) => {
  expect(() => getMatrixEncoding({ kind: "level", levels })).toThrow(/等级/);
});

test.each([heat, { kind: "bubble", domainMax: 100 }, { kind: "level", levels }] satisfies MatrixEncoding[])("missing and not-applicable are separate from numeric zero in $kind", encoding => {
  const model = getMatrixEncoding(encoding);
  expect(model.encode({ rowId: "course-a", columnId: "version-a", kind: "missing" })).toMatchObject({ kind: "missing", label: "缺测" });
  expect(model.encode({ rowId: "course-a", columnId: "version-a", kind: "missing", label: "未设学期" })).toMatchObject({ label: "未设学期" });
  expect(model.encode({ rowId: "course-a", columnId: "version-a", kind: "not-applicable", label: "无该课程" })).toMatchObject({ kind: "not-applicable", label: "无该课程" });
  expect(model.encode(value(0)).kind).toBe("value");
});
