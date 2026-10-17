import { act, fireEvent, render, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { ChartExample, type LiveExampleSettings } from "./chart-examples";
import { ChartPage } from "./chart-page";
import { makeLivePoints } from "./chart-data";

vi.mock("@visx/responsive", () => ({ ParentSize: ({ children }: { children: (size: { width: number; height: number }) => ReactNode }) => children({ width: 640, height: 300 }) }));
vi.mock("./chart-variant-gallery", () => ({ ChartVariantGallery: () => null }));
vi.mock("./chart-example-source", () => ({ chartExampleCode: () => "", ChartExampleSource: ({ state, revision, liveSettings }: { state: string; revision: number; liveSettings: LiveExampleSettings }) => <pre data-live-download-state="">{JSON.stringify({ state, revision, liveSettings })}</pre> }));
const frames = new Map<number, FrameRequestCallback>();
const producers = new Set<number>();
const observers: { callback: IntersectionObserverCallback; targets: Set<Element>; disconnected: boolean }[] = [];
let nextFrame = 0;
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date", "setInterval", "clearInterval"] });
  vi.setSystemTime(1_800_000_000_000);
  frames.clear(); producers.clear(); observers.length = 0;
  const startInterval = window.setInterval.bind(window), stopInterval = window.clearInterval.bind(window);
  vi.spyOn(window, "setInterval").mockImplementation((handler, delay, ...args) => {
    const timer = startInterval(handler, delay, ...args);
    if (delay === 1000) producers.add(timer);
    return timer;
  });
  vi.spyOn(window, "clearInterval").mockImplementation(timer => { if (timer !== undefined) producers.delete(timer); stopInterval(timer); });
  vi.stubGlobal("requestAnimationFrame", vi.fn((callback: FrameRequestCallback) => { frames.set(++nextFrame, callback); return nextFrame; }));
  vi.stubGlobal("cancelAnimationFrame", vi.fn((frame: number) => frames.delete(frame)));
  vi.stubGlobal("ResizeObserver", class {
    constructor(private callback: ResizeObserverCallback) {}
    observe(target: Element) { this.callback([{ target, contentRect: { width: 640, height: 300 } } as ResizeObserverEntry], this as unknown as ResizeObserver); }
    unobserve() {}
    disconnect() {}
  });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ x: 0, y: 0, width: 640, height: 300, top: 0, right: 640, bottom: 300, left: 0, toJSON: () => ({}) });
  vi.stubGlobal("IntersectionObserver", class {
    record: typeof observers[number];
    constructor(callback: IntersectionObserverCallback) { this.record = { callback, targets: new Set(), disconnected: false }; observers.push(this.record); }
    observe(target: Element) { this.record.targets.add(target); }
    unobserve(target: Element) { this.record.targets.delete(target); }
    disconnect() { this.record.targets.clear(); this.record.disconnected = true; }
  });
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
});
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
const clockFrames = () => [...frames.values()].filter(callback => callback.name === "tick").length;
const plot = (replay = 0, revision = 0) => <ChartExample id="live-line" recipe="trend-soft" replay={replay} revision={revision} />;
const path = (container: HTMLElement) => container.querySelector("path.visx-linepath")!.getAttribute("d");
const rows = (container: HTMLElement) => container.querySelector("tbody")!.textContent;
async function visibility(visible: boolean) {
  for (const observer of observers) for (const target of observer.targets) observer.callback([{ target, isIntersecting: visible } as IntersectionObserverEntry], {} as IntersectionObserver);
}
async function mountLive() {
  await act(async () => { await visibility(true); });
  for (let pass = 0; pass < 3; pass++) await act(async () => {
    for (const [frame, callback] of [...frames.entries()]) { frames.delete(frame); callback(performance.now()); }
    await new Promise(resolve => setTimeout(resolve, 20));
  });
}

test("default live pause and replay preserve the same chart, points and frozen window", async () => {
  const view = render(plot());
  await mountLive();
  await act(async () => { vi.advanceTimersByTime(1000); });
  fireEvent.click(within(view.container).getByRole("button", { name: "暂停实时" }));
  const chart = view.container.querySelector('[data-rain-id="ui-chart-live-line"]');
  const priorRows = rows(view.container), priorPath = path(view.container);
  await act(async () => { vi.advanceTimersByTime(120_000); });
  view.rerender(plot(1));
  expect(view.container.querySelector('[data-rain-id="ui-chart-live-line"]')).toBe(chart);
  expect(rows(view.container)).toBe(priorRows);
  expect(path(view.container)).toBe(priorPath);
  expect(producers.size).toBe(0);
  expect(clockFrames()).toBe(0);
  fireEvent.click(within(view.container).getByRole("button", { name: "追加一次" }));
  expect(view.container.querySelector('[data-rain-id="ui-chart-live-line"]')).toBe(chart);
  expect(Number(view.container.querySelector("tbody tr:last-child th")!.textContent)).toBe(Date.now() / 1000);
  expect(path(view.container)).not.toBe(priorPath);
  view.unmount();
});

test("default live automatic offscreen and background stopping cleans only its own producer and native clock", async () => {
  const hidden = vi.spyOn(document, "hidden", "get");
  const view = render(plot());
  await mountLive();
  await act(async () => { await visibility(true); vi.advanceTimersByTime(1000); });
  expect(producers.size).toBe(1);
  expect(clockFrames()).toBe(1);
  expect(observers.length).toBeGreaterThan(0);
  const prior = rows(view.container);
  await act(async () => { await visibility(false); });
  expect(producers.size).toBe(0);
  expect(clockFrames()).toBe(0);
  await act(async () => { vi.advanceTimersByTime(120_000); });
  expect(rows(view.container)).toBe(prior);
  await act(async () => { await visibility(true); });
  expect(producers.size).toBe(1);
  expect(clockFrames()).toBe(1);
  hidden.mockReturnValue(true);
  fireEvent(document, new Event("visibilitychange"));
  expect(producers.size).toBe(0);
  expect(clockFrames()).toBe(0);
  hidden.mockReturnValue(false);
  fireEvent(document, new Event("visibilitychange"));
  expect(producers.size).toBe(1);
  view.rerender(plot(0, 1));
  expect(producers.size).toBe(1);
  const removeListener = vi.spyOn(document, "removeEventListener");
  view.unmount();
  expect(producers.size).toBe(0);
  expect(clockFrames()).toBe(0);
  expect(observers.every(observer => observer.disconnected)).toBe(true);
  expect(removeListener.mock.calls.some(([name]) => name === "visibilitychange")).toBe(true);
});

test("default live restores and republishes the actual paused points and manual clock", async () => {
  const now = Date.now(), points = [{ time: (now - 1000) / 1000, value: 31 }, { time: now / 1000, value: 77 }];
  const change = vi.fn();
  const view = render(<ChartExample id="live-line" liveSettings={{ points, paused: true, frozenNow: now }} onLiveSettingsChange={change} />);
  await mountLive();
  expect(view.container.querySelectorAll("tbody tr")).toHaveLength(2);
  expect(rows(view.container)).toContain("77");
  expect(producers.size).toBe(0);
  vi.setSystemTime(now + 1000);
  fireEvent.click(within(view.container).getByRole("button", { name: "追加一次" }));
  const snapshot = change.mock.calls.at(-1)?.[0];
  expect(snapshot.points).toHaveLength(3);
  expect(snapshot.points.slice(0, 2)).toEqual(points);
  expect(snapshot.points.at(-1).time).toBe((now + 1000) / 1000);
  expect(snapshot.paused).toBe(true);
  expect(snapshot.frozenNow).toBe(now + 1000);
  view.unmount();
});

test("default live page invalidates old points across notice states and revision updates while preserving pause", async () => {
  const view = render(<ChartPage id="live-line" />);
  await mountLive();
  fireEvent.click(view.getByRole("button", { name: "暂停实时" }));
  const state = view.getByRole("combobox", { name: "示例状态" });
  const values = () => [...view.container.querySelectorAll('[data-rain-id="chart-live-line"] tbody tr')].map(row => Number(row.querySelectorAll("td")[1]!.textContent));
  const snapshot = () => JSON.parse(view.container.querySelector("[data-live-download-state]")!.textContent!);
  for (const next of ["zero", "single"] as const) {
    fireEvent.change(state, { target: { value: "empty" } });
    expect(view.container.querySelector('[data-rain-id="chart-live-line"] tbody')).toBeNull();
    fireEvent.change(state, { target: { value: next } });
    await mountLive();
    expect(values()).toEqual(makeLivePoints(undefined, 0, next).map(point => point.value));
    expect(snapshot().state).toBe(next);
    expect(snapshot().liveSettings.points.map((point: { value: number }) => point.value)).toEqual(values());
    expect(snapshot().liveSettings.paused).toBe(true);
    expect(producers.size).toBe(0);
  }
  fireEvent.change(state, { target: { value: "empty" } });
  fireEvent.click(view.getByRole("button", { name: "更新数据" }));
  fireEvent.change(state, { target: { value: "normal" } });
  await mountLive();
  expect(values()).toEqual(makeLivePoints(undefined, 1).map(point => point.value));
  expect(snapshot().revision).toBe(1);
  expect(snapshot().liveSettings.points.map((point: { value: number }) => point.value)).toEqual(values());
  expect(snapshot().liveSettings.paused).toBe(true);
  view.unmount();
});
