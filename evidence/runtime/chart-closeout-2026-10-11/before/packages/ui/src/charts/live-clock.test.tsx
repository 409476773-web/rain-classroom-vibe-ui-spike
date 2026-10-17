import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { LiveLineChart, useChart } from "./index";

const callbacks = new Map<number, FrameRequestCallback>();
let frameId = 0;
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-10-08T00:00:00Z"));
  callbacks.clear();
  vi.stubGlobal("requestAnimationFrame", vi.fn((callback: FrameRequestCallback) => { const id = ++frameId; callbacks.set(id, callback); return id; }));
  vi.stubGlobal("cancelAnimationFrame", vi.fn((id: number) => callbacks.delete(id)));
  vi.stubGlobal("ResizeObserver", class {
    constructor(private callback: ResizeObserverCallback) {}
    observe(target: Element) { this.callback([{ target, contentRect: { width: 640, height: 320, top: 0, left: 0 } } as ResizeObserverEntry], this as unknown as ResizeObserver); }
    disconnect() {}
    unobserve() {}
  });
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
function ClockProbe() {
  const { xScale } = useChart();
  return <text data-testid="live-clock">{xScale.domain().map(value => Number(value)).join(",")}</text>;
}
const points = [{ time: 1791417600, value: 40 }];

test("stopping the live loop cancels RAF and retains the paused time window across a long wait", async () => {
  const view = render(<LiveLineChart data={points} value={40}><ClockProbe /></LiveLineChart>);
  for (let pass = 0; pass < 3 && !view.queryByTestId("live-clock"); pass++) await act(async () => {
    const pending = [...callbacks.entries()];
    for (const [id, callback] of pending) { callbacks.delete(id); callback(performance.now()); }
    await new Promise(resolve => setTimeout(resolve, 20));
  });
  expect(callbacks.size).toBe(1);
  const before = view.getByTestId("live-clock").textContent;
  view.rerender(<LiveLineChart data={points} value={40} paused running={false}><ClockProbe /></LiveLineChart>);
  expect(callbacks.size).toBe(0);
  vi.setSystemTime(new Date("2026-10-08T00:02:00Z"));
  view.rerender(<LiveLineChart data={[...points, { time: 1791417720, value: 50 }]} value={50} paused running={false}><ClockProbe /></LiveLineChart>);
  expect(view.getByTestId("live-clock").textContent).toBe(before);
  expect(callbacks.size).toBe(0);
  view.rerender(<LiveLineChart data={points} value={50} paused running={false} frozenNow={Date.now()}><ClockProbe /></LiveLineChart>);
  expect(view.getByTestId("live-clock").textContent).not.toBe(before);
  expect(callbacks.size).toBe(0);
});
