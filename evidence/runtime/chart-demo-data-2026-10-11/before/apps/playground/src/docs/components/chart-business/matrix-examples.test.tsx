import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { MatrixExamples } from "./matrix-examples";

test("business examples render five public MatrixCharts and switch the similarity scale to 12 by 12", async () => {
  const user = userEvent.setup();
  const view = render(<MatrixExamples />);
  expect(view.getAllByRole("table")).toHaveLength(5);
  const week = view.getByRole("table", { name: "每周学习时段 · 次数" });
  expect(within(week).getAllByRole("rowheader")).toHaveLength(7);
  expect(within(week).getAllByRole("cell")).toHaveLength(168);
  await user.click(view.getByRole("button", { name: "12×12" }));
  const similarity = view.getByRole("table", { name: "课程相似度" });
  expect(within(similarity).getAllByRole("rowheader")).toHaveLength(12);
  expect(within(similarity).getAllByRole("cell")).toHaveLength(144);
  expect(view.getByRole("button", { name: "12×12" })).toHaveAttribute("aria-pressed", "true");
});

test("business examples explain invalid Mock data without rendering misleading matrices", () => {
  const view = render(<MatrixExamples state="invalid" />);
  expect(view.getAllByRole("alert")).toHaveLength(5);
  expect(view.queryByRole("table")).toBeNull();
});

test("empty, single, update and sorted business examples preserve readable states", () => {
  const view = render(<MatrixExamples state="empty" />);
  expect(view.getAllByRole("status")).toHaveLength(5);
  view.rerender(<MatrixExamples state="single" reduced />);
  expect(view.getAllByRole("cell")).toHaveLength(5);
  view.rerender(<MatrixExamples revision={1} descending />);
  const week = view.getByRole("table", { name: "每周学习时段 · 次数" });
  const first = within(week).getAllByRole("row")[1]!;
  expect(within(first).getByRole("rowheader")).toHaveTextContent("周日");
  expect(within(first).getAllByRole("cell")[1]).toHaveTextContent("5");
});

test("a selected fixture shows only its matrix and only relevant scale controls", () => {
  const view = render(<MatrixExamples fixtureId="course-similarity" />);
  expect(view.getAllByRole("table")).toHaveLength(1);
  expect(view.getByRole("table", { name: "课程相似度" })).toBeVisible();
  expect(view.getByRole("button", { name: "6×6" })).toHaveAttribute("aria-pressed", "true");
  view.rerender(<MatrixExamples fixtureId="support-level" />);
  expect(view.getAllByRole("table")).toHaveLength(1);
  expect(view.getByRole("table", { name: "课程支撑关系" })).toBeVisible();
  expect(view.queryByRole("button", { name: "6×6" })).toBeNull();
});

test("business examples put the selected recipe on each chart to preserve the requested colors", () => {
  const view = render(<MatrixExamples recipe="intensity" />);
  for (const table of view.getAllByRole("table")) expect(table.closest('[data-rain-id="ui-chart-matrix"]')).toHaveAttribute("data-recipe", "intensity");
  view.rerender(<MatrixExamples />);
  for (const table of view.getAllByRole("table")) expect(table.closest('[data-rain-id="ui-chart-matrix"]')).toHaveAttribute("data-recipe", "monochrome-blue");
});

test("the saved initial similarity size recreates the selected 12 by 12 matrix", () => {
  const view = render(<MatrixExamples fixtureId="course-similarity" initialSize={12} />);
  expect(within(view.getByRole("table")).getAllByRole("cell")).toHaveLength(144);
  expect(view.getByRole("button", { name: "12×12" })).toHaveAttribute("aria-pressed", "true");
});

test("a real scale change reports its new size so the parent can save current source settings", async () => {
  const user = userEvent.setup();
  let savedSize: 4 | 6 | 12 | undefined;
  const view = render(<MatrixExamples fixtureId="course-similarity" onSizeChange={size => { savedSize = size; }} />);
  await user.click(view.getByRole("button", { name: "4×4" }));
  expect(savedSize).toBe(4);
  expect(within(view.getByRole("table")).getAllByRole("cell")).toHaveLength(16);
});
