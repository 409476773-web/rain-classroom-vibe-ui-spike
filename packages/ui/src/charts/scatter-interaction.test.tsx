import { act, renderHook, waitFor } from "@testing-library/react";
import { bisector } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { useLayoutEffect, useMemo } from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { useScatterChartInteraction } from "./vendor/charts/use-scatter-chart-interaction";

type Point = Record<string, unknown> & { date: Date; value: number };
const point = (day: number, value: number): Point => ({ date: new Date(2026, 8, day), value });
const original = [point(1, 4), point(2, 0), point(3, 8)];
const lines = [{ dataKey: "value", stroke: "var(--chart-1)", strokeWidth: 5 }];
const margin = { top: 0, right: 0, bottom: 0, left: 0 };
const xAccessor = (entry: Record<string, unknown>) => entry.date as Date;
const bisectDate = bisector<Record<string, unknown>, Date>(xAccessor).left;

beforeEach(() => {
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => window.setTimeout(() => callback(performance.now()), 0));
  vi.stubGlobal("cancelAnimationFrame", (id: number) => window.clearTimeout(id));
});
afterEach(() => vi.unstubAllGlobals());

function useReadings(data: Point[], width = 300, canInteract = true) {
  const scales = useMemo(() => ({
    xScale: scaleTime<number>().domain([data.at(0)!.date, data.at(-1)!.date]).range([0, width]),
    yScale: scaleLinear<number>().domain([0, 10]).range([100, 0]),
  }), [data, width]);
  return useScatterChartInteraction({ ...scales, yScales: { left: scales.yScale }, data, lines, margin, xAccessor, bisectDate, canInteract });
}

function inspect(result: { current: ReturnType<typeof useReadings> }, entry = original[1]!, index = 1) {
  act(() => result.current.setTooltipData({ point: entry, index, x: 150, yPositions: { value: 100 } }));
}

test("Scatter refreshes the current date's point and axes when values change without another pointer event", async () => {
  const view = renderHook(({ data, width }) => useReadings(data, width), { initialProps: { data: original, width: 300 } });
  inspect(view.result);
  const updated = original.map(entry => ({ ...entry, date: new Date(entry.date), value: entry.value + 7 }));
  view.rerender({ data: updated, width: 600 });
  await waitFor(() => expect(view.result.current.tooltipData?.point).toBe(updated[1]));
  expect(view.result.current.tooltipData?.point.value).toBe(7);
  expect(view.result.current.tooltipData?.x).toBe(300);
  expect(view.result.current.tooltipData?.yPositions.value).toBeCloseTo(30);
});

test("Scatter preserves date identity when preceding dates are inserted", async () => {
  const view = renderHook(({ data }) => useReadings(data), { initialProps: { data: original } });
  inspect(view.result);
  const updated = [point(0, 1), ...original.map(entry => ({ ...entry, value: entry.value + 3 }))];
  view.rerender({ data: updated });
  await waitFor(() => expect(view.result.current.tooltipData?.point).toBe(updated[2]));
  expect(view.result.current.tooltipData?.index).toBe(2);
  expect(view.result.current.tooltipData?.x).toBe(200);
  expect(view.result.current.tooltipData?.point.date).toEqual(original[1]!.date);
});

test("Scatter clears an absent current date instead of binding its old index to another date", () => {
  const view = renderHook(({ data }) => useReadings(data), { initialProps: { data: original } });
  inspect(view.result);
  view.rerender({ data: [original[0]!, original[2]!] });
  expect(view.result.current.tooltipData).toBeNull();
});

test("Scatter does not restore a cleared reading after an ordinary data update", () => {
  const view = renderHook(({ data }) => useReadings(data), { initialProps: { data: original } });
  inspect(view.result);
  act(() => view.result.current.interactionHandlers.onMouseLeave?.());
  view.rerender({ data: original.map(entry => ({ ...entry, value: entry.value + 1 })) });
  expect(view.result.current.tooltipData).toBeNull();
});

function touchEvent(points: { clientX: number; clientY: number }[]) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  Object.assign(svg, {
    createSVGPoint: () => ({ x: 0, y: 0, matrixTransform() { return { x: this.x, y: this.y }; } }),
    getScreenCTM: () => ({ inverse: () => ({}) }),
  });
  const surface = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svg.append(surface);
  return { currentTarget: surface, touches: points, preventDefault: vi.fn() } as unknown as React.TouchEvent<SVGGElement>;
}

test("Scatter allows a single finger to scroll while retaining exact touch reading and cancellation", async () => {
  const view = renderHook(() => useReadings(original));
  const event = touchEvent([{ clientX: 150, clientY: 80 }]);
  act(() => view.result.current.interactionHandlers.onTouchStart?.(event));
  expect(event.preventDefault).not.toHaveBeenCalled();
  expect(view.result.current.interactionStyle.touchAction).toBe("pan-y");
  await waitFor(() => expect(view.result.current.tooltipData?.point).toBe(original[1]));
  act(() => view.result.current.interactionHandlers.onTouchCancel?.());
  expect(view.result.current.tooltipData).toBeNull();
});

test("Scatter retains the existing two-finger time selection and clears it after cancellation", () => {
  const view = renderHook(() => useReadings(original));
  const event = touchEvent([{ clientX: 0, clientY: 80 }, { clientX: 300, clientY: 80 }]);
  act(() => view.result.current.interactionHandlers.onTouchStart?.(event));
  expect(event.preventDefault).toHaveBeenCalledOnce();
  expect(view.result.current.selection).toMatchObject({ startX: 0, endX: 300, startIndex: 0, endIndex: 2, active: true });
  const moved = touchEvent([{ clientX: 0, clientY: 80 }, { clientX: 150, clientY: 80 }]);
  act(() => view.result.current.interactionHandlers.onTouchMove?.(moved));
  expect(moved.preventDefault).toHaveBeenCalledOnce();
  expect(view.result.current.selection).toMatchObject({ startIndex: 0, endIndex: 1 });
  act(() => view.result.current.interactionHandlers.onTouchCancel?.());
  expect(view.result.current.selection).toBeNull();
});

function controlledFrames() {
  const frames = new Map<number, FrameRequestCallback>();
  let id = 0;
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { frames.set(++id, callback); return id; });
  vi.stubGlobal("cancelAnimationFrame", (frame: number) => frames.delete(frame));
  return { frames, flush() { for (const [frame, callback] of [...frames]) { frames.delete(frame); callback(performance.now()); } } };
}

test("Scatter's first queued frame reads the current data instead of briefly committing the previous point", () => {
  const clock = controlledFrames();
  const view = renderHook(({ data }) => useReadings(data), { initialProps: { data: original } });
  act(() => view.result.current.interactionHandlers.onTouchStart?.(touchEvent([{ clientX: 150, clientY: 80 }])));
  expect(clock.frames.size).toBe(1);
  const updated = original.map(entry => ({ ...entry, value: entry.value + 7 }));
  view.rerender({ data: updated });
  act(() => clock.flush());
  expect(view.result.current.tooltipData?.point).toBe(updated[1]);
  expect(view.result.current.tooltipData?.point.value).toBe(7);
  expect(clock.frames.size).toBe(0);
});

test("Scatter never commits a queued point after interactions become unavailable", () => {
  const clock = controlledFrames(), commits: { canInteract: boolean; value: unknown }[] = [];
  const view = renderHook(({ canInteract }) => {
    const result = useReadings(original, 300, canInteract);
    useLayoutEffect(() => { commits.push({ canInteract, value: result.tooltipData?.point.value ?? null }); }, [canInteract, result.tooltipData]);
    return result;
  }, { initialProps: { canInteract: true } });
  act(() => view.result.current.interactionHandlers.onTouchStart?.(touchEvent([{ clientX: 150, clientY: 80 }])));
  expect(clock.frames.size).toBe(1);
  view.rerender({ canInteract: false });
  act(() => clock.flush());
  expect(commits.filter(commit => !commit.canInteract).every(commit => commit.value === null)).toBe(true);
  expect(view.result.current.tooltipData).toBeNull();
  expect(clock.frames.size).toBe(0);
});
