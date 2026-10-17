import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { BAR_VARIANT_IDS, BarVariant } from "./bar";
import reference from "./reference.json";
import type { VariantExampleProps } from "./shared";

const props: VariantExampleProps = { variantId: "bar-default", recipe: "category-wide", revision: 0, replay: 0, reduced: true, active: true };

beforeEach(() => vi.stubGlobal("ResizeObserver", class {
  observe() {}
  unobserve() {}
  disconnect() {}
}));
afterEach(() => vi.unstubAllGlobals());

test("bar registers the exact 21 required examples", () => {
  expect([...BAR_VARIANT_IDS].sort()).toEqual(reference.filter(item => item.family === "bar").map(item => item.id).sort());
});

test("the approved official grouped bar retains its curated complete and in-progress populations", () => {
  const view = render(<BarVariant {...props} variantId="bar-multiple-series" />);
  const firstValues = () => [...view.container.querySelectorAll("tbody tr:first-child td")].map(cell => cell.textContent);
  expect(firstValues()).toEqual(["228", "28"]);
  expect(view.container.querySelectorAll("tbody tr")).toHaveLength(6);
  expect(view.container.querySelector("tbody th")).toHaveTextContent("一班");
  view.rerender(<BarVariant {...props} variantId="bar-multiple-series" revision={1} />);
  expect(firstValues()).toEqual(["148", "94"]);
  view.rerender(<BarVariant {...props} variantId="bar-multiple-series" revision={3} />);
  expect(firstValues()).toEqual(["228", "28"]);
});

test.each(BAR_VARIANT_IDS.filter(id => id !== "bar-multiple-series"))("%s uses bounded ordinary populations while retaining category identity", variantId => {
  const view = render(<BarVariant {...props} variantId={variantId} />);
  const dense = variantId === "bar-dense-data" || variantId === "bar-interactive";
  expect(view.container.querySelectorAll("tbody tr")).toHaveLength(variantId === "bar-interactive" ? 90 : variantId === "bar-dense-data" ? 60 : 6);
  expect(view.container.querySelector("tbody th")).toHaveTextContent(dense ? "2026-07-01" : "一班");
  expect([...view.container.querySelectorAll("tbody tr:first-child td")].map(cell => cell.textContent)).toEqual(dense ? ["32", "18"] : [variantId === "bar-custom-tooltip" ? "5800" : "58", variantId === "bar-dual-y-axis" ? "81" : "14"]);
});

test("ordinary bars have peaks and dips, truthful dual-axis rates, and three bounded updates", () => {
  const view = render(<BarVariant {...props} variantId="bar-dual-y-axis" />);
  const rows = () => [...view.container.querySelectorAll("tbody tr")].map(row => [...row.querySelectorAll("td")].map(cell => Number(cell.textContent)));
  expect(rows()).toEqual([[58, 81], [31, 53], [72, 90], [44, 67], [23, 40], [64, 84]]);
  const initial = rows();
  for (const [revision, completed, rate] of [[1, 46, 66], [2, 63, 86], [3, 58, 81], [1002, 58, 81]] as const) {
    view.rerender(<BarVariant {...props} variantId="bar-dual-y-axis" revision={revision} />);
    expect(rows()[0]).toEqual([completed, rate]);
    expect(rows().every(([count, percentage]) => Number.isInteger(count) && count! > 0 && count! < 100 && percentage! >= 0 && percentage! <= 100)).toBe(true);
  }
  expect(rows()).toEqual(initial);
});

test("interactive and dense samples use all 90 and 60 stable dates", () => {
  const view = render(<BarVariant {...props} variantId="bar-interactive" />);
  expect(view.container.querySelectorAll("tbody tr")).toHaveLength(90);
  const labels = Array.from(view.container.querySelectorAll("tbody th")).map(node => node.textContent);
  expect(new Set(labels).size).toBe(90);
  view.rerender(<BarVariant {...props} variantId="bar-dense-data" />);
  expect(view.container.querySelectorAll("tbody tr")).toHaveLength(60);
});

test("loading has a real ready return path and preserves its choice offscreen", () => {
  const view = render(<BarVariant {...props} variantId="bar-loading" />);
  expect(screen.getByRole("button", { name: "显示数据" })).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "显示数据" }));
  expect(screen.getByRole("button", { name: "开始加载" })).toBeVisible();
  view.rerender(<BarVariant {...props} variantId="bar-loading" active={false} />);
  view.rerender(<BarVariant {...props} variantId="bar-loading" active={true} />);
  expect(screen.getByRole("button", { name: "开始加载" })).toBeVisible();
});
