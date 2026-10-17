import { render, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { CategoryExamples, CategoryTooltip } from "./category-examples";
import { makeCategoryFixtures } from "./comparison-data";

// Host reading tests do not need a measured SVG; browser checks exercise real plots.
beforeEach(() => vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} }));
afterEach(() => vi.unstubAllGlobals());

test("six business references have equivalent exact readings", () => {
  const view = render(<CategoryExamples reduced />);
  expect(view.getAllByRole("table", { hidden: true })).toHaveLength(6);
  for (const reference of ["CH-060", "CH-005", "CH-067", "CH-049", "CH-073", "CH-112"]) expect(view.getByText(reference)).toBeInTheDocument();
  const college = view.getByRole("table", { name: "学院开课数量与覆盖率 · 精确数据", hidden: true });
  expect(within(college).getAllByText("计算机学院")).toHaveLength(2);
  expect(college).toHaveTextContent("东校区");
});

test("period tables preserve original dates and missing unequal tails", () => {
  const view = render(<CategoryExamples fixtureId="period" reduced />);
  const table = view.getByRole("table", { hidden: true });
  expect(table).toHaveTextContent("2027-01-01");
  expect(table).toHaveTextContent("2026-12-25");
  const last = within(table).getAllByRole("row", { hidden: true }).at(-1)!;
  expect(last).toHaveTextContent("第5天");
  expect(last).toHaveTextContent("缺测");
});

test("reordering and updates retain row identity and zero-denominator semantics", () => {
  const view = render(<CategoryExamples fixtureId="knowledge" reduced />);
  const first = view.container.querySelector('[data-category-row="level-0"]');
  view.rerender(<CategoryExamples fixtureId="knowledge" revision={1} descending reduced />);
  expect(view.container.querySelector('[data-category-row="level-0"]')).toBe(first);
  expect(view.container.querySelector('tbody tr')).toHaveAttribute("data-category-row", "level-2");
  view.rerender(<CategoryExamples fixtureId="knowledge" state="zero" reduced />);
  expect(view.getByRole("table", { hidden: true })).toHaveTextContent("不适用");
});

test("invalid and empty observations show explicit host states", () => {
  const view = render(<CategoryExamples state="invalid" />);
  expect(view.getAllByRole("alert")).toHaveLength(6);
  expect(view.queryByRole("table", { hidden: true })).toBeNull();
  view.rerender(<CategoryExamples state="empty" />);
  expect(view.getAllByRole("status")).toHaveLength(6);
  view.rerender(<CategoryExamples state="single" reduced />);
  expect(view.getAllByRole("table", { hidden: true }).every(table => within(table).getAllByRole("row", { hidden: true }).length === 2)).toBe(true);
});

test("a missing knowledge rate is distinguished from a zero denominator", () => {
  const view = render(<CategoryExamples fixtureId="knowledge" state="missing" reduced />);
  const missing = view.container.querySelector('[data-category-row="level-1"]')!;
  expect(missing).toHaveTextContent("缺测");
  expect(missing).not.toHaveTextContent("不适用");
});

test("same-name college tooltips identify their actual campus", () => {
  const fixture = makeCategoryFixtures().find(fixture => fixture.id === "colleges")!;
  const view = render(<CategoryTooltip fixture={fixture} point={fixture.rows[2]!} />);
  expect(view.getByText("计算机学院 · 东校区")).toBeInTheDocument();
});
