import { render } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { ChartExample } from "./chart-examples";

beforeEach(() => vi.stubGlobal("ResizeObserver", class {
  constructor(private callback: ResizeObserverCallback) {}
  observe(target: HTMLElement) {
    let node: HTMLElement | null = target;
    while (node && !(node.style.width && node.style.height)) node = node.parentElement;
    this.callback([{ target, contentRect: { width: parseFloat(node?.style.width || "600"), height: parseFloat(node?.style.height || "320") } } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver);
  }
  unobserve() {} disconnect() {}
}));
afterEach(() => vi.unstubAllGlobals());

test.each(["line", "area", "bar", "pie", "ring"] as const)("%s keeps a mini slot when its data is missing", id => {
  const view = render(<ChartExample id={id} size="mini" miniSize="comfortable" state="missing" reduced />);
  const slot = view.container.querySelector('[data-mini-state="missing"]');
  expect(slot).not.toBeNull();
  expect(slot).toHaveAttribute("data-size", "comfortable");
  expect(view.container.querySelector(".rain-chart-empty")).toBeNull();
  expect(id === "line" || id === "area" ? view.container.querySelector(".rain-chart-metric strong") : view.getByRole("status")).toHaveTextContent("缺测");
});

test.each(["line", "area"] as const)("%s retains real dated data while changing the mini frame", id => {
  const view = render(<ChartExample id={id} size="mini" miniSize="compact" state="single" reduced />);
  const firstDate = view.container.querySelector("tbody th")?.textContent;
  expect(firstDate).toBeTruthy();
  expect(view.container.querySelector(`[data-mini-kind="${id}"][data-size="compact"]`)).not.toBeNull();
  expect(view.container.querySelector(".rain-chart-mini-plot")).toHaveStyle({ width: "96px", height: "32px" });
  view.rerender(<ChartExample id={id} size="mini" miniSize="comfortable" state="single" reduced />);
  expect(view.container.querySelector(".rain-chart-mini-plot")).toHaveStyle({ width: "128px", height: "48px" });
  expect(view.container.querySelector("tbody th")?.textContent).toBe(firstDate);
  view.rerender(<ChartExample id={id} size="standard" miniSize="comfortable" state="single" reduced />);
  expect(view.container.querySelector(".rain-chart-plot")).not.toHaveStyle({ width: "128px", height: "48px" });
});
