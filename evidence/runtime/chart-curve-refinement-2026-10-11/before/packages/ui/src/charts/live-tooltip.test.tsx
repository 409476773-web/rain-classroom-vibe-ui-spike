import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { LiveLineChart, useChart } from "./index";

const callbacks = new Map<number, FrameRequestCallback>();
let id = 0;
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-10-08T00:00:00Z"));
  callbacks.clear();
  vi.stubGlobal("requestAnimationFrame", vi.fn((callback: FrameRequestCallback) => { callbacks.set(++id, callback); return id; }));
  vi.stubGlobal("cancelAnimationFrame", vi.fn((frame: number) => callbacks.delete(frame)));
  vi.stubGlobal("ResizeObserver", class {
    constructor(private callback: ResizeObserverCallback) {}
    observe(target: Element) { this.callback([{ target, contentRect: { width: 640, height: 320 } } as ResizeObserverEntry], this as unknown as ResizeObserver); }
    disconnect() {}
    unobserve() {}
  });
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

function TooltipProbe() {
  const { tooltipData } = useChart();
  return <text data-testid="live-tooltip">{tooltipData ? String(Math.round(Number(tooltipData.point.value))) : "none"}</text>;
}

test.each([{ paused: true, running: false }, { paused: true, running: true }, { paused: false, running: false }])("stopped live tooltip follows mouse and data without a RAF loop: %j", async state => {
  const now = Date.now();
  const points = [{ time: (now - 60_000) / 1000, value: 10 }, { time: now / 1000, value: 50 }];
  const example = (data = points) => <LiveLineChart {...state} data={data} value={data.at(-1)!.value} window={60} frozenNow={now} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}><TooltipProbe /></LiveLineChart>;
  const view = render(example());
  for (let pass = 0; pass < 4 && !view.queryByTestId("live-tooltip"); pass++) await act(async () => {
    for (const [frame, callback] of [...callbacks.entries()]) { callbacks.delete(frame); callback(performance.now()); }
    await new Promise(resolve => setTimeout(resolve, 20));
  });
  expect(view.getByTestId("live-tooltip")).toHaveTextContent("none");
  expect(callbacks.size).toBe(0);
  const surface = view.container.querySelector("svg > g")!;
  fireEvent.mouseMove(surface, { clientX: 320, clientY: 100 });
  expect(view.getByTestId("live-tooltip")).toHaveTextContent("30");
  fireEvent.mouseMove(surface, { clientX: 160, clientY: 100 });
  expect(view.getByTestId("live-tooltip")).toHaveTextContent("20");
  view.rerender(example([{ ...points[0]!, value: 30 }, { ...points[1]!, value: 90 }]));
  expect(view.getByTestId("live-tooltip")).toHaveTextContent("45");
  expect(callbacks.size).toBe(0);
  fireEvent.mouseLeave(surface);
  expect(view.getByTestId("live-tooltip")).toHaveTextContent("none");
  expect(callbacks.size).toBe(0);
});
