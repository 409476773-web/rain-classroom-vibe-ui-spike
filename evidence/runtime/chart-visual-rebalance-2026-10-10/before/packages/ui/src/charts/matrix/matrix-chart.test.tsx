import { act, fireEvent, render, waitFor, within } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { MatrixChart } from "./matrix-chart";
import { getMatrixEncoding, type MatrixCell, type MatrixEncoding } from "./matrix-data";

const rows = [{ id: "course-a", label: "课程 A" }, { id: "course-b", label: "课程 B" }];
const columns = [{ id: "version-a", label: "2023 版本" }, { id: "version-b", label: "2024 版本" }];
const cells: MatrixCell[] = [
  { rowId: "course-a", columnId: "version-a", kind: "value", value: 0 },
  { rowId: "course-a", columnId: "version-b", kind: "missing", label: "未设学期" },
  { rowId: "course-b", columnId: "version-a", kind: "not-applicable", label: "无该课程" },
  { rowId: "course-b", columnId: "version-b", kind: "value", value: 1 },
];
const encodings: MatrixEncoding[] = [
  { kind: "heat", domain: [0, 1] },
  { kind: "bubble", domainMax: 1 },
  { kind: "level", levels: [{ value: 0, label: "无直接支撑", color: "var(--chart-scale-01)" }, { value: 1, label: "核心支撑", color: "var(--chart-scale-05)" }] },
];

afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); });

test.each(encodings)("$kind encoding is a native table with visible exact cell readings", encoding => {
  const view = render(<MatrixChart caption="课程关系" rows={rows} columns={columns} cells={cells} encoding={encoding} rowHeaderLabel="课程" />);
  const table = view.getByRole("table", { name: "课程关系" });
  expect(table.tagName).toBe("TABLE");
  expect(within(table).getAllByRole("columnheader")).toHaveLength(3);
  expect(within(table).getAllByRole("rowheader")).toHaveLength(2);
  expect(within(table).getAllByRole("cell")).toHaveLength(4);
  expect(within(table).getByRole("cell", { name: encoding.kind === "level" ? "无直接支撑" : "0" })).toBeVisible();
  expect(within(table).getByRole("cell", { name: "未设学期" })).toHaveAttribute("data-state", "missing");
  expect(within(table).getByRole("cell", { name: "无该课程" })).toHaveAttribute("data-state", "not-applicable");
  expect(view.container.querySelector("td[tabindex],td button")).toBeNull();
  expect(view.container.querySelector("canvas")).toBeNull();
});

test("two matrix instances associate every data cell with only their own unique headers", () => {
  const view = render(<>{[0, 1].map(instance => <MatrixChart key={instance} caption={`矩阵 ${instance + 1}`} rows={rows} columns={columns} cells={cells} encoding={encodings[0]!} />)}</>);
  const headers = [...view.container.querySelectorAll("th[id]")];
  expect(new Set(headers.map(header => header.id)).size).toBe(headers.length);
  for (const table of view.getAllByRole("table")) {
    const local = new Set([...table.querySelectorAll("th[id]")].map(header => header.id));
    for (const cell of table.querySelectorAll("td")) {
      const associations = cell.getAttribute("headers")!.split(" ");
      expect(associations).toHaveLength(2);
      expect(associations.every(id => local.has(id))).toBe(true);
    }
  }
});

test("sorting axes preserves each coordinate reading through stable data IDs", () => {
  const view = render(<MatrixChart caption="课程关系" rows={rows} columns={columns} cells={cells} encoding={encodings[0]!} />);
  view.rerender(<MatrixChart caption="课程关系" rows={[...rows].reverse()} columns={[...columns].reverse()} cells={cells} encoding={encodings[0]!} />);
  const orderedRows = within(view.getByRole("table")).getAllByRole("row").slice(1);
  expect(within(orderedRows[0]!).getByRole("rowheader")).toHaveTextContent("课程 B");
  expect(within(orderedRows[0]!).getAllByRole("cell").map(cell => cell.getAttribute("aria-label"))).toEqual(["1", "无该课程"]);
  expect(within(orderedRows[1]!).getAllByRole("cell").map(cell => cell.getAttribute("aria-label"))).toEqual(["未设学期", "0"]);
});

test("an absent similarity diagonal stays missing and nonsymmetric readings stay distinct", () => {
  const view = render(<MatrixChart caption="课程相似度" rows={rows} columns={rows} cells={[
    { rowId: "course-a", columnId: "course-b", kind: "value", value: .2 },
    { rowId: "course-b", columnId: "course-a", kind: "value", value: .8 },
  ]} encoding={encodings[0]!} valueFormat={value => `${value * 100}%`} />);
  const table = view.getByRole("table");
  expect(within(table).getAllByRole("cell", { name: "缺测" })).toHaveLength(2);
  expect(within(table).getByRole("cell", { name: "20%" })).toBeVisible();
  expect(within(table).getByRole("cell", { name: "80%" })).toBeVisible();
});

test("a zero quantity bubble keeps zero area and uses a separate zero marker", () => {
  const view = render(<MatrixChart caption="课程数量" rows={[rows[0]!]} columns={[columns[0]!]} cells={[cells[0]!]} encoding={{ kind: "bubble", domainMax: 0 }} />);
  const cell = view.getByRole("cell", { name: "0" });
  expect(cell.querySelector("circle")).toHaveAttribute("r", "0");
  expect(cell.querySelector('[data-slot="zero-mark"]')).not.toBeNull();
  expect(cell).toHaveAttribute("data-state", "zero");
  fireEvent.pointerEnter(cell);
  expect(view.getByRole("tooltip")).toHaveTextContent("课程 A · 2023 版本");
});

test("legend keeps encoded colors and values while using symbolic bubble sizes", () => {
  const encoding = { kind: "bubble", domainMax: 100 } as const;
  const view = render(<MatrixChart caption="数量" rows={[rows[0]!]} columns={[columns[0]!]} cells={[{ ...cells[0]!, kind: "value", value: 25 }]} encoding={encoding} />);
  const cell = view.getByRole("cell", { name: "25" });
  const legend = view.getByRole("list", { name: "数量图例" });
  const expected = getMatrixEncoding(encoding).encode({ ...cells[0]!, kind: "value", value: 25 });
  expect(cell.querySelector("circle")).toHaveAttribute("r", String(expected.radius));
  expect(cell.querySelector("circle")).toHaveAttribute("fill", expected.color);
  const legendItem = within(legend).getByText("25").closest("li")!;
  expect(legendItem.querySelector("circle")).toHaveAttribute("fill", expected.color);
});

test("empty and single matrices provide honest readable states", () => {
  const view = render(<MatrixChart caption="矩阵范围" rows={[]} columns={columns} cells={[]} encoding={encodings[0]!} />);
  expect(view.getByRole("status")).toHaveTextContent("暂无矩阵数据");
  expect(view.getByText("矩阵范围")).toBeVisible();
  view.rerender(<MatrixChart caption="矩阵范围" rows={[rows[0]!]} columns={[columns[0]!]} cells={[cells[0]!]} encoding={encodings[0]!} />);
  expect(view.getAllByRole("cell")).toHaveLength(1);
  expect(view.getByRole("cell", { name: "0" })).toBeVisible();
});

test("cell reading updates with its mark without creating hidden tab stops", () => {
  const view = render(<MatrixChart caption="数量" rows={[rows[0]!]} columns={[columns[0]!]} cells={[cells[0]!]} encoding={{ kind: "bubble", domainMax: 100 }} />);
  view.rerender(<MatrixChart caption="数量" rows={[rows[0]!]} columns={[columns[0]!]} cells={[{ ...cells[0]!, kind: "value", value: 100 }]} encoding={{ kind: "bubble", domainMax: 100 }} reducedMotion />);
  expect(view.getByRole("cell", { name: "100" }).querySelector("circle")).toHaveAttribute("r", "14");
  expect(view.container.querySelector("[data-rain-id='ui-chart-matrix']")).toHaveAttribute("data-reduced-motion", "true");
  expect(view.container.querySelector("td[tabindex]")).toBeNull();
});

test("heat readout is inside the color mark while its exact value remains available to the table", () => {
  const view = render(<MatrixChart caption="相似度" rows={[rows[0]!]} columns={[columns[0]!]} cells={[{ ...cells[0]!, kind: "value", value: .5 }]} encoding={encodings[0]!} valueFormat={value => `${value * 100}%`} reducedMotion />);
  const cell = view.getByRole("cell", { name: "50%" });
  const mark = cell.querySelector('[data-slot="cell-mark"]')!;
  expect(mark).toHaveAttribute("aria-hidden", "true");
  expect(mark.querySelector('[data-slot="reading"]')).toHaveTextContent("50%");
  expect(within(cell).getByText("50%")).toBeVisible();
});

test("level cells show only the dot and keep their complete labels in the legend and accessible name", () => {
  const view = render(<MatrixChart caption="课程支撑" rows={[rows[0]!]} columns={[columns[0]!]} cells={[cells[0]!]} encoding={encodings[2]!} />);
  const cell = view.getByRole("cell", { name: "无直接支撑" });
  expect(cell.querySelector('[data-slot="cell-mark"]')).not.toBeNull();
  expect(cell.textContent).toBe("");
  expect(within(view.getByRole("list", { name: "课程支撑图例" })).getByText("无直接支撑")).toBeVisible();
});

test("bubble readings fit at a fixed font size or stay hidden inside their mark, never below it", () => {
  Object.defineProperty(SVGElement.prototype, "getBBox", { configurable: true, value() { return { x: 11, y: 15, width: 18, height: 9 }; } });
  try {
    const view = render(<MatrixChart caption="课程数量" rows={[rows[0]!]} columns={columns} cells={[
      { rowId: rows[0]!.id, columnId: columns[0]!.id, kind: "value", value: 100 },
      { rowId: rows[0]!.id, columnId: columns[1]!.id, kind: "value", value: 1 },
    ]} encoding={{ kind: "bubble", domainMax: 100 }} reducedMotion />);
    const large = view.getByRole("cell", { name: "100" });
    const small = view.getByRole("cell", { name: "1" });
    expect(large.querySelector('[data-slot="cell-mark"] [data-slot="reading"]')).toHaveTextContent("100");
    expect(large.querySelector('[data-slot="reading-container"]')).toHaveAttribute("data-fit", "true");
    expect(small.querySelector('[data-slot="reading-container"]')).toHaveAttribute("data-fit", "false");
    expect(small.querySelector("circle")).toHaveAttribute("r", "1.4000000000000001");
    fireEvent.pointerEnter(small);
    expect(view.getByRole("tooltip")).toHaveTextContent("1");
    expect(small.querySelector(':scope > [data-slot="reading"]')).toBeNull();
  } finally { delete (SVGElement.prototype as SVGElement & { getBBox?: unknown }).getBBox; }
});

test("off-center glyph bounds are centered in the bubble without changing the text baseline or quantity area", () => {
  Object.defineProperty(SVGElement.prototype, "getBBox", { configurable: true, value() { return { x: 29, y: 17, width: 6, height: 6 }; } });
  try {
    const view = render(<MatrixChart caption="课程数量" rows={[rows[0]!]} columns={columns} cells={[
      { rowId: rows[0]!.id, columnId: columns[0]!.id, kind: "value", value: 100 },
      { rowId: rows[0]!.id, columnId: columns[1]!.id, kind: "value", value: 1 },
    ]} encoding={{ kind: "bubble", domainMax: 100 }} reducedMotion />);
    const large = view.getByRole("cell", { name: "100" });
    const small = view.getByRole("cell", { name: "1" });
    expect(large.querySelector('[data-slot="reading-container"]')).toHaveAttribute("transform", "translate(-12 0)");
    expect(large.querySelector('[data-slot="reading-container"]')).toHaveAttribute("data-fit", "true");
    expect(large.querySelector("text")).toHaveAttribute("x", "20");
    expect(large.querySelector("text")).toHaveAttribute("y", "20");
    expect(large.querySelector("circle")).toHaveAttribute("r", "14");
    expect(small.querySelector('[data-slot="reading-container"]')).toHaveAttribute("transform", "translate(-12 0)");
    expect(small.querySelector('[data-slot="reading-container"]')).toHaveAttribute("data-fit", "false");
  } finally { delete (SVGElement.prototype as SVGElement & { getBBox?: unknown }).getBBox; }
});

test("unavailable glyph measurements keep the reading hidden and its table value usable", () => {
  Object.defineProperty(SVGElement.prototype, "getBBox", { configurable: true, value() { throw new Error("unavailable SVG geometry"); } });
  try {
    let view: ReturnType<typeof render>;
    expect(() => { view = render(<MatrixChart caption="课程数量" rows={[rows[0]!]} columns={[columns[0]!]} cells={[{ ...cells[0]!, kind: "value", value: 100 }]} encoding={{ kind: "bubble", domainMax: 100 }} reducedMotion />); }).not.toThrow();
    expect(view!.getByRole("cell", { name: "100" }).querySelector('[data-slot="reading-container"]')).toHaveAttribute("data-fit", "false");
  } finally { delete (SVGElement.prototype as SVGElement & { getBBox?: unknown }).getBBox; }
});

test("normal entry starts from a faint small mark while reduced motion renders its final state", async () => {
  const view = render(<MatrixChart caption="相似度" rows={[rows[0]!]} columns={[columns[0]!]} cells={[cells[0]!]} encoding={encodings[0]!} />);
  const mark = view.getByRole("cell", { name: "0" }).querySelector('[data-slot="mark-container"]')!;
  expect(mark).toHaveStyle({ opacity: "0", transform: "scale(0.94)" });
  view.rerender(<MatrixChart caption="相似度" rows={[rows[0]!]} columns={[columns[0]!]} cells={[cells[0]!]} encoding={encodings[0]!} reducedMotion />);
  expect(view.container.querySelector('[data-rain-id="ui-chart-matrix"]')).toHaveAttribute("data-reduced-motion", "true");
  expect(view.getByRole("cell", { name: "0" }).querySelector('[data-slot="mark-container"]')).toBe(mark);
  await waitFor(() => expect(mark).toHaveStyle({ opacity: "1", transform: "none" }));
});

test.each([
  ["rgb(244, 244, 255)", "dark"],
  ["rgb(20, 34, 70)", "light"],
  ["color(srgb 0.5 0.5 0.5)", "light"],
  ["rgba(0, 0, 0, 0.5)", "dark"],
  ["unresolved-color", "dark"],
])("numeric reading uses resolved %s fill to choose %s", (background, tone) => {
  const original = getComputedStyle;
  vi.spyOn(globalThis, "getComputedStyle").mockImplementation(element => {
    if (element.classList.contains("rain-matrix__color-probe--dark")) return { color: "rgb(20, 34, 70)" } as CSSStyleDeclaration;
    if (element.classList.contains("rain-matrix__color-probe--light")) return { color: "rgb(255, 255, 255)" } as CSSStyleDeclaration;
    if (element.getAttribute("data-slot") === "fill-probe") return { backgroundColor: background } as CSSStyleDeclaration;
    return original(element);
  });
  const view = render(<MatrixChart caption="相似度" rows={[rows[0]!]} columns={[columns[0]!]} cells={[{ ...cells[0]!, kind: "value", value: .5 }]} encoding={encodings[0]!} reducedMotion />);
  expect(view.getByRole("cell", { name: "0.5" }).querySelector('[data-slot="reading-container"]')).toHaveAttribute("data-tone", tone);
});

test("ordinary and rapid value changes preserve the coordinate, exact reading and plate-free mark", () => {
  const props = { caption: "数量", rows: [rows[0]!], columns: [columns[0]!], encoding: { kind: "bubble", domainMax: 100 } as const };
  const view = render(<MatrixChart {...props} cells={[cells[0]!]} />);
  const circle = view.getByRole("cell", { name: "0" }).querySelector("circle");
  for (const value of [25, 50, 100]) {
    view.rerender(<MatrixChart {...props} cells={[{ ...cells[0]!, kind: "value", value }]} />);
    const cell = view.getByRole("cell", { name: String(value) });
    expect(cell.querySelector("circle")).toBe(circle);
    expect(cell.querySelector('[data-slot="reading"]')).toHaveTextContent(String(value));
    expect(view.container.querySelector('[data-slot="reading-plate"], [data-updating="true"]')).toBeNull();
  }
});

test("inspection grace survives movement between cells and ends after leaving", () => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  const view = render(<MatrixChart caption="相似度" rows={rows} columns={columns} cells={cells} encoding={encodings[0]!} reducedMotion />);
  const first = view.getByRole("cell", { name: "0" }), second = view.getByRole("cell", { name: "1" });
  fireEvent.pointerEnter(first);
  const tooltip = view.getByRole("tooltip");
  fireEvent.pointerLeave(first);
  act(() => vi.advanceTimersByTime(119));
  expect(view.getByRole("tooltip")).toBe(tooltip);
  fireEvent.pointerEnter(second);
  act(() => vi.advanceTimersByTime(500));
  expect(view.getByRole("tooltip")).toBe(tooltip);
  expect(tooltip).toHaveTextContent("1");
  fireEvent.pointerLeave(second);
  act(() => vi.advanceTimersByTime(120));
  expect(view.queryByRole("tooltip")).toBeNull();
});

test("heat to bubble with the same label measures the newly mounted numeric glyph", () => {
  Object.defineProperty(SVGElement.prototype, "getBBox", { configurable: true, value() { return { x: 11, y: 15, width: 18, height: 9 }; } });
  try {
    const props = { caption: "数量", rows: [rows[0]!], columns: [columns[0]!], cells: [{ ...cells[0]!, kind: "value", value: 100 }] as MatrixCell[], reducedMotion: true };
    const view = render(<MatrixChart {...props} encoding={{ kind: "heat", domain: [0, 100] }} />);
    view.rerender(<MatrixChart {...props} encoding={{ kind: "bubble", domainMax: 100 }} />);
    expect(view.getByRole("cell", { name: "100" }).querySelector('[data-slot="reading-container"]')).toHaveAttribute("data-fit", "true");
  } finally { delete (SVGElement.prototype as SVGElement & { getBBox?: unknown }).getBBox; }
});
