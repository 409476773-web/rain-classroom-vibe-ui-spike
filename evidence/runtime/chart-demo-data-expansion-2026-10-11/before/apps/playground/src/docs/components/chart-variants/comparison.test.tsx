import { afterAll, beforeAll, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import reference from "./reference.json";

beforeAll(() => {
  // Give real native renderers a measured viewport instead of mocking chart parts.
  vi.stubGlobal("ResizeObserver", class {
    constructor(private callback: ResizeObserverCallback) {}
    observe(target: Element) { this.callback([{ target, contentRect: target.getBoundingClientRect() } as ResizeObserverEntry], this as unknown as ResizeObserver); }
    disconnect() {}
    unobserve() {}
  });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ x: 0, y: 0, width: 640, height: 320, top: 0, right: 640, bottom: 320, left: 0, toJSON: () => ({}) });
});
afterAll(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

const expected = reference.filter(row => ["scatter", "funnel", "gauge"].includes(row.family)).map(row => row.id);
const props = { recipe: "category-wide" as const, revision: 0, replay: 0, reduced: true, active: true };

test("all 32 frozen comparison variants render native geometry and their exact data", async () => {
  const { ComparisonVariant, COMPARISON_VARIANT_IDS } = await import("./comparison");
  expect([...COMPARISON_VARIANT_IDS]).toEqual(expected);
  for (const variantId of expected) {
    const view = render(<ComparisonVariant {...props} variantId={variantId} />);
    await waitFor(() => expect(view.container.querySelector('path[d]:not([d=""]), circle[r]'), variantId).not.toBeNull());
    expect(within(view.container).getByRole("table", { hidden: true }), variantId).toBeInTheDocument();
    view.unmount();
  }
}, 20_000);

test("gauge 0, 50, and 100 update actual active notches and keep the chosen value offscreen", async () => {
  const { ComparisonVariant } = await import("./comparison");
  for (const variantId of ["gauge-default", "gauge-linear-label-below"]) {
    const view = render(<ComparisonVariant {...props} variantId={variantId} />);
    await waitFor(() => expect(view.container.querySelector("svg path")).not.toBeNull());
    const counts: number[] = [];
    for (const value of [0, 50, 100]) {
      fireEvent.click(within(view.container).getByRole("button", { name: `${value}%` }));
      counts.push(view.container.querySelectorAll('svg path[fill-opacity="1"]').length);
      expect(within(view.container).getByRole("status", { name: "当前进度" })).toHaveTextContent(`${value}%`);
      expect(within(view.container).getByRole("table", { hidden: true })).toHaveTextContent(String(value));
    }
    expect(counts[0]).toBe(0);
    expect(counts[1]).toBeGreaterThan(0);
    expect(counts[2]).toBe(counts[1]! * 2);
    view.rerender(<ComparisonVariant {...props} variantId={variantId} active={false} />);
    view.rerender(<ComparisonVariant {...props} variantId={variantId} />);
    expect(within(view.container).getByRole("button", { name: "100%" })).toHaveAttribute("aria-pressed", "true");
    view.unmount();
  }
});

test("gauge gradients have unique IDs and theme token stops, and the quarter title keeps its actual 180° sweep", async () => {
  const { ComparisonVariant } = await import("./comparison");
  const view = render(<><ComparisonVariant {...props} variantId="gauge-dual-arc-gradients" /><ComparisonVariant {...props} variantId="gauge-dual-arc-gradients" /></>);
  await waitFor(() => expect(view.container.querySelectorAll("linearGradient")).toHaveLength(4));
  const gradients = [...view.container.querySelectorAll("linearGradient")];
  expect(gradients).toHaveLength(4);
  expect(new Set(gradients.map(node => node.id)).size).toBe(4);
  expect([...view.container.querySelectorAll("stop")].every(node => node.getAttribute("stop-color")?.startsWith("var(--chart-"))).toBe(true);
  view.unmount();
  render(<ComparisonVariant {...props} variantId="gauge-sparse-quarter-sweep" />);
  expect(screen.getByText(/90° → 270°，实际弧长 180°/)).toBeInTheDocument();
});

test("a downloaded gauge restores its chosen value and publishes later choices", async () => {
  const { ComparisonVariant } = await import("./comparison");
  const change = vi.fn();
  const view = render(<ComparisonVariant {...props} variantId="gauge-default" settings={{ value: 0 }} onSettingsChange={change} />);
  expect(within(view.container).getByRole("status", { name: "当前进度" })).toHaveTextContent("0%");
  fireEvent.click(within(view.container).getByRole("button", { name: "50%" }));
  expect(change).toHaveBeenCalledWith({ value: 50 });
  view.rerender(<ComparisonVariant {...props} variantId="gauge-default" settings={{ value: 50 }} onSettingsChange={change} />);
  expect(within(view.container).getByRole("status", { name: "当前进度" })).toHaveTextContent("50%");
});

test("scatter uses nonnegative dated data, different marker geometry, and readable dual-axis units", async () => {
  const { ComparisonVariant } = await import("./comparison");
  const view = render(<ComparisonVariant {...props} variantId="scatter-no-rings" />);
  await waitFor(() => expect(view.container.querySelector("circle")).not.toBeNull());
  const table = within(view.container).getByRole("table", { hidden: true });
  expect(table.querySelectorAll("tbody tr")).toHaveLength(24);
  expect(table).toHaveTextContent("日期");
  expect(view.container).toHaveTextContent("非负");
  const plain = view.container.querySelectorAll("circle").length;
  view.rerender(<ComparisonVariant {...props} variantId="scatter-wide-ring-gap" />);
  expect(view.container.querySelectorAll("circle").length).toBeGreaterThan(plain);
  view.rerender(<ComparisonVariant {...props} variantId="scatter-dual-y-axis" />);
  expect(view.container).toHaveTextContent("左轴");
  expect(view.container).toHaveTextContent("右轴");
  expect(within(view.container).getByRole("table", { hidden: true })).toHaveTextContent("完成率 · %");
});

test("funnel percentages use the first stage denominator and vertical straight edges have real line geometry", async () => {
  const { ComparisonVariant } = await import("./comparison");
  const view = render(<ComparisonVariant {...props} variantId="funnel-vertical-straight-grid" />);
  const table = within(view.container).getByRole("table", { hidden: true });
  expect(table).toHaveTextContent("首阶段人数");
  expect(table).toHaveTextContent("78%");
  expect(table).toHaveTextContent("42%");
  expect(view.container.querySelector('path[d*=" L "]')).not.toBeNull();
});
