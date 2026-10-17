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
