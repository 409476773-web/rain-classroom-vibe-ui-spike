import { afterAll, beforeAll, expect, test, vi } from "vitest";
import { act, fireEvent, render, waitFor, within } from "@testing-library/react";
import reference from "./reference.json";

beforeAll(() => {
  vi.stubGlobal("ResizeObserver", class {
    constructor(private callback: ResizeObserverCallback) {}
    observe(target: Element) { this.callback([{ target, contentRect: target.getBoundingClientRect() } as ResizeObserverEntry], this as unknown as ResizeObserver); }
    disconnect() {}
    unobserve() {}
  });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ x: 0, y: 0, width: 640, height: 320, top: 0, right: 640, bottom: 320, left: 0, toJSON: () => ({}) });
});
afterAll(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

const expected = reference.filter(row => ["candlestick", "live-line"].includes(row.family)).map(row => row.id);
const props = { recipe: "sign" as const, revision: 0, replay: 0, reduced: true, active: true };

test("all 20 frozen special examples have native geometry and exact data", async () => {
  const { SPECIAL_VARIANT_IDS, SpecialVariant } = await import("./special");
  expect([...SPECIAL_VARIANT_IDS]).toEqual(expected);
  for (const variantId of expected) {
    const view = render(<SpecialVariant {...props} variantId={variantId} />);
    await waitFor(() => expect(view.container.querySelector('path[d]:not([d=""]), rect[rx="1"]'), variantId).not.toBeNull());
    expect(within(view.container).getByRole("table", { hidden: true }), variantId).toBeInTheDocument();
    view.unmount();
  }
}, 20_000);

test("candles expose ordered valid OHLC values and instance-safe material definitions", async () => {
  const { SpecialVariant } = await import("./special");
  const view = render(<><SpecialVariant {...props} variantId="candlestick-pattern" /><SpecialVariant {...props} variantId="candlestick-pattern" /></>);
  await waitFor(() => expect(view.container.querySelectorAll("pattern").length).toBeGreaterThan(0));
  const ids = [...view.container.querySelectorAll("pattern")].map(node => node.id);
  expect(new Set(ids).size).toBe(ids.length);
  const table = within(view.container).getAllByRole("table", { hidden: true })[0]!;
  expect(table.querySelectorAll("tbody tr")).toHaveLength(20);
  for (const row of table.querySelectorAll("tbody tr")) {
    const [open, high, low, close] = [...row.querySelectorAll("td")].slice(0, 4).map(cell => Number(cell.textContent));
    expect(low).toBeLessThanOrEqual(Math.min(open!, close!));
    expect(high).toBeGreaterThanOrEqual(Math.max(open!, close!));
  }
});

test("a downloaded paused live snapshot restores exact points and publishes only user steps", async () => {
  const { SpecialVariant } = await import("./special");
  let now = 1_800_000_000_000;
  const spy = vi.spyOn(Date, "now").mockImplementation(() => now);
  const points = [{ time: (now - 1000) / 1000, value: 66 }, { time: now / 1000, value: 77 }];
  const change = vi.fn();
  const view = render(<SpecialVariant {...props} reduced={false} variantId="live-line-default" settings={{ paused: true, points, frozenNow: now }} onSettingsChange={change} />);
  expect(view.container.querySelectorAll("tbody tr")).toHaveLength(2);
  expect(within(view.container).getByRole("button", { name: "恢复实时" })).toBeEnabled();
  expect(view.container.querySelector("tbody")!.textContent).toContain("77");
  expect(change).not.toHaveBeenCalled();
  now += 1000;
  fireEvent.click(within(view.container).getByRole("button", { name: "追加一次" }));
  expect(view.container.querySelectorAll("tbody tr")).toHaveLength(3);
  const snapshot = change.mock.calls.at(-1)![0];
  expect(snapshot.points).toHaveLength(3);
  expect(snapshot.frozenNow).toBe(now);
  expect(snapshot.points.at(-1).time).toBe(now / 1000);
  view.unmount();
  spy.mockRestore();
});

test("manual live appends keep strictly increasing Unix seconds and a 120-point bound", async () => {
  const { SpecialVariant } = await import("./special");
  const dateSpy = vi.spyOn(Date, "now");
  let now = 1_800_000_000_000;
  dateSpy.mockImplementation(() => now);
  const view = render(<SpecialVariant {...props} variantId="live-line-default" />);
  expect(view.container.querySelectorAll("tbody tr")).toHaveLength(60);
  await waitFor(() => expect(view.container.querySelector("path[d]")).not.toBeNull());
  const chart = view.container.querySelector('[data-rain-id="ui-chart-live-line"]')!;
  const geometry = [...chart.querySelectorAll("path[d]")].map(path => path.getAttribute("d"));
  for (let index = 0; index < 75; index++) {
    now += 1000;
    fireEvent.click(within(view.container).getByRole("button", { name: "追加一次" }));
  }
  expect(view.container.querySelectorAll("tbody tr")).toHaveLength(120);
  const times = [...view.container.querySelectorAll("tbody th")].map(cell => Number(cell.textContent));
  expect(times.every((time, index) => index === 0 || time > times[index - 1]!)).toBe(true);
  expect(times.at(-1)).toBe(now / 1000);
  await waitFor(() => expect(chart.textContent).toContain(new Date(now).toLocaleTimeString("zh-CN", { hour12: false, minute: "2-digit", second: "2-digit" })));
  expect(view.container.querySelector('[data-rain-id="ui-chart-live-line"]')).toBe(chart);
  expect([...chart.querySelectorAll("path[d]")].map(path => path.getAttribute("d"))).not.toEqual(geometry);
  expect(view.container.querySelectorAll('animate[repeatCount="indefinite"]')).toHaveLength(0);
  dateSpy.mockRestore();
});

test("live producers stop offscreen and user pause survives a visit longer than the viewing window", async () => {
  const { SpecialVariant } = await import("./special");
  vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "Date"] });
  try {
    const change = vi.fn();
    const view = render(<SpecialVariant {...props} variantId="live-line-interactive" reduced={false} onSettingsChange={change} />);
    await waitFor(() => expect(view.container.querySelector("path[d]")).not.toBeNull());
    await act(async () => { vi.advanceTimersByTime(1800); });
    expect(view.container.querySelectorAll("tbody tr")).toHaveLength(63);
    expect(change).not.toHaveBeenCalled();
    await act(async () => { fireEvent.click(within(view.container).getByRole("button", { name: "暂停实时" })); });
    expect(change.mock.calls.find(([patch]) => patch.points)?.[0].points).toHaveLength(63);
    const snapshot = view.container.querySelector("tbody")!.textContent;
    const chart = view.container.querySelector('[data-rain-id="ui-chart-live-line"]');
    const geometry = [...view.container.querySelectorAll("path[d]")].map(path => path.getAttribute("d"));
    view.rerender(<SpecialVariant {...props} variantId="live-line-interactive" reduced={false} active={false} />);
    await act(async () => { vi.advanceTimersByTime(120_000); });
    view.rerender(<SpecialVariant {...props} variantId="live-line-interactive" reduced={false} />);
    await act(async () => { vi.advanceTimersByTime(1800); });
    expect(view.container.querySelector("tbody")!.textContent).toBe(snapshot);
    expect(view.container.querySelector('[data-rain-id="ui-chart-live-line"]')).toBe(chart);
    expect([...view.container.querySelectorAll("path[d]")].map(path => path.getAttribute("d"))).toEqual(geometry);
    expect(within(view.container).getByRole("button", { name: "恢复实时" })).toBeEnabled();
    expect(view.container.querySelectorAll('animate[repeatCount="indefinite"]')).toHaveLength(0);
    fireEvent.click(within(view.container).getByRole("button", { name: "恢复实时" }));
    await act(async () => { vi.advanceTimersByTime(600); });
    expect(view.container.querySelectorAll("tbody tr")).toHaveLength(64);
    view.unmount();
  } finally { vi.useRealTimers(); }
});

test("replaying a paused live series preserves its exact points, clock and snapshot", async () => {
  const { SpecialVariant } = await import("./special");
  const spy = vi.spyOn(Date, "now").mockReturnValue(1_800_000_000_000);
  const settings = { paused: true, points: [{ time: 1_799_999_999, value: 31 }, { time: 1_800_000_000, value: 77 }], frozenNow: 1_800_000_000_000 };
  const change = vi.fn();
  const view = render(<SpecialVariant {...props} variantId="live-line-default" settings={settings} onSettingsChange={change} />);
  const rows = view.container.querySelector("tbody")!.textContent;
  const chart = view.container.querySelector('[data-rain-id="ui-chart-live-line"]');
  spy.mockReturnValue(1_800_000_120_000);
  view.rerender(<SpecialVariant {...props} replay={1} variantId="live-line-default" settings={settings} onSettingsChange={change} />);
  expect(view.container.querySelector("tbody")!.textContent).toBe(rows);
  expect(view.container.querySelector('[data-rain-id="ui-chart-live-line"]')).toBe(chart);
  expect(change).not.toHaveBeenCalled();
  view.unmount(); spy.mockRestore();
});
