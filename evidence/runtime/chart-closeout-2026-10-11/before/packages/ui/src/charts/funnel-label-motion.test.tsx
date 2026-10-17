import { render, within } from "@testing-library/react";
import { afterAll, beforeAll, expect, test, vi } from "vitest";
import { FunnelChart } from "./vendor/charts/funnel-chart";

beforeAll(() => {
  vi.stubGlobal("ResizeObserver", class {
    constructor(private callback: ResizeObserverCallback) {}
    observe(target: Element) { this.callback([{ target, contentRect: target.getBoundingClientRect() } as ResizeObserverEntry], this as unknown as ResizeObserver); }
    disconnect() {}
    unobserve() {}
  });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ x: 0, y: 0, width: 640, height: 280, top: 0, right: 640, bottom: 280, left: 0, toJSON: () => ({}) });
});
afterAll(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

test.each(["spread", "grouped"] as const)("zero-duration %s funnel labels are readable in their first real Motion DOM frame", layout => {
  const view = render(<FunnelChart data={[{ label: "进入课程", value: 1000 }, { label: "完成学习", value: 420 }]} labelLayout={layout} staggerDelay={0} enterTransition={{ type: "tween", duration: 0 }} />);
  for (const label of ["进入课程", "完成学习"]) {
    const overlay = within(view.container).getByText(label).closest<HTMLDivElement>(".absolute.inset-0")!;
    expect(overlay.style.opacity, label).toBe("1");
  }
});

test("normal funnel labels retain their delayed entrance", () => {
  const view = render(<FunnelChart data={[{ label: "进入课程", value: 1000 }]} />);
  const overlay = within(view.container).getByText("进入课程").closest<HTMLDivElement>(".absolute.inset-0")!;
  expect(overlay.style.opacity).toBe("0");
});
