import { fireEvent, render, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { MatrixChart } from "./matrix-chart";
import type { MatrixCell } from "./matrix-data";

const rows = [{ id: "a", label: "课程 A" }, { id: "b", label: "课程 B" }];
const columns = [{ id: "x", label: "学院 X" }, { id: "y", label: "学院 Y" }];
const cells: MatrixCell[] = rows.flatMap((row, r) => columns.map((column, c) => ({ rowId: row.id, columnId: column.id, kind: "value", value: (r * 2 + c + 1) * 25 })));

test("pointer inspection keeps one tooltip between cells and links its row and column", () => {
  const view = render(<MatrixChart caption="课程数量" rows={rows} columns={columns} cells={cells} encoding={{ kind: "bubble", domainMax: 100 }} reducedMotion />);
  const first = view.getByRole("cell", { name: "25" });
  fireEvent.pointerEnter(first);
  const tooltip = view.getByRole("tooltip");
  expect(tooltip).toHaveTextContent("课程 A");
  expect(tooltip).toHaveTextContent("学院 X");
  expect(tooltip).toHaveTextContent("25");
  expect(first).toHaveAttribute("data-active", "true");
  fireEvent.pointerLeave(first);
  fireEvent.pointerEnter(view.getByRole("cell", { name: "50" }));
  expect(view.getByRole("tooltip")).toBe(tooltip);
  expect(tooltip).toHaveTextContent("学院 Y");
  expect(view.getByRole("rowheader", { name: "课程 A" })).toHaveAttribute("data-active", "true");
  expect(view.getByRole("columnheader", { name: "学院 Y" })).toHaveAttribute("data-active", "true");
});

test("the single scroll-region keyboard entry inspects coordinates and Escape dismisses", () => {
  const view = render(<MatrixChart caption="课程数量" rows={rows} columns={columns} cells={cells} encoding={{ kind: "bubble", domainMax: 100 }} reducedMotion />);
  const region = view.getByRole("region");
  fireEvent.focus(region);
  expect(view.getByRole("cell", { name: "25" })).toHaveAttribute("data-active", "true");
  fireEvent.keyDown(region, { key: "ArrowRight" });
  expect(view.getByRole("cell", { name: "50" })).toHaveAttribute("data-active", "true");
  fireEvent.keyDown(region, { key: "ArrowDown" });
  expect(view.getByRole("cell", { name: "100" })).toHaveAttribute("data-active", "true");
  expect(view.getByRole("tooltip")).toHaveTextContent("100");
  expect(view.container.querySelector("td[tabindex],td button")).toBeNull();
  fireEvent.keyDown(region, { key: "Escape" });
  expect(view.queryByRole("tooltip")).toBeNull();
});

test("bubble legend inspection links matching quantities without changing their value colors", () => {
  const view = render(<MatrixChart caption="课程数量" rows={rows} columns={columns} cells={cells} encoding={{ kind: "bubble", domainMax: 100 }} reducedMotion />);
  const legend = view.getByRole("list", { name: "课程数量图例" });
  const item = within(legend).getByText("100").closest("li")!;
  const cell = view.getByRole("cell", { name: "100" });
  const fill = cell.querySelector("circle")!.getAttribute("fill");
  fireEvent.focus(item);
  expect(cell).toHaveAttribute("data-highlighted", "true");
  expect(view.getByRole("cell", { name: "25" })).toHaveAttribute("data-highlighted", "false");
  expect(cell.querySelector("circle")).toHaveAttribute("fill", fill);
});

test("updated bubble readings have no independent plate or blanket hidden updating state", () => {
  const props = { caption: "课程数量", rows, columns, encoding: { kind: "bubble", domainMax: 100 } as const, reducedMotion: true };
  const view = render(<MatrixChart {...props} cells={cells} />);
  view.rerender(<MatrixChart {...props} cells={cells.map(cell => cell.kind === "value" ? { ...cell, value: 100 } : cell)} />);
  expect(view.container.querySelector('[data-slot="reading-plate"]')).toBeNull();
  expect(view.container.querySelector('[data-updating="true"]')).toBeNull();
  expect(view.getAllByRole("cell", { name: "100" })).toHaveLength(4);
});

test("focusing the scroll region after pointing at a cell preserves that coordinate", () => {
  const view = render(<MatrixChart caption="课程数量" rows={rows} columns={columns} cells={cells} encoding={{ kind: "bubble", domainMax: 100 }} reducedMotion />);
  const selected = view.getByRole("cell", { name: "100" });
  fireEvent.pointerEnter(selected);
  fireEvent.focus(view.getByRole("region"));
  expect(selected).toHaveAttribute("data-active", "true");
  expect(view.getByRole("tooltip")).toHaveTextContent("100");
});

test("changing encoding clears an incompatible legend range without dimming all cells", () => {
  const view = render(<MatrixChart caption="课程数量" rows={rows} columns={columns} cells={cells} encoding={{ kind: "heat", domain: [0, 100] }} reducedMotion />);
  const ranges = view.container.querySelectorAll('[data-slot="legend-range"]');
  fireEvent.focus(ranges[4]!);
  expect(view.getByRole("cell", { name: "25" })).toHaveAttribute("data-highlighted", "false");
  view.rerender(<MatrixChart caption="课程数量" rows={rows} columns={columns} cells={cells} encoding={{ kind: "bubble", domainMax: 100 }} reducedMotion />);
  expect(view.container.querySelector('td[data-highlighted="false"]')).toBeNull();
});

test("removing the inspected coordinate closes its tooltip and restores remaining cells", () => {
  const props = { caption: "课程数量", rows, columns, cells, encoding: { kind: "bubble", domainMax: 100 } as const, reducedMotion: true };
  const view = render(<MatrixChart {...props} />);
  fireEvent.pointerEnter(view.getByRole("cell", { name: "100" }));
  view.rerender(<MatrixChart {...props} rows={[rows[0]!]} cells={cells.slice(0, 2)} />);
  expect(view.queryByRole("tooltip")).toBeNull();
  expect(view.container.querySelector('td[data-active="true"],td[data-highlighted="false"]')).toBeNull();
});
