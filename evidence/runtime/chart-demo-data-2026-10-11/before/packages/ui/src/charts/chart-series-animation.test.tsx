import { curveLinear } from "@visx/curve";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import { useAnimatedSeriesPath } from "./vendor/charts/use-animated-series-path";

const controls = vi.hoisted(() => [] as { onUpdate: (value: number) => void; onComplete: () => void; stop: ReturnType<typeof vi.fn> }[]);
vi.mock("motion/react", async (importOriginal) => ({
  ...await importOriginal<typeof import("motion/react")>(),
  useReducedMotion: () => false,
  animate: (_from: number, _to: number, options: { onUpdate: (value: number) => void; onComplete: () => void }) => {
    const control = { ...options, stop: vi.fn() };
    controls.push(control);
    return control;
  },
}));

const getX = (datum: Record<string, unknown>) => Number(datum.x);
const getXKey = (datum: Record<string, unknown>) => String(datum.id);
const yScale = (value: number) => value;
const rows = (value: number, middle: number | null = null) => [{ id: "a", x: 0, value }, { id: "b", x: 100, value: middle }, { id: "c", x: 200, value }];
beforeEach(() => { controls.length = 0; });

test("series update interpolates from displayed geometry and resumes interrupted motion", () => {
  const hook = renderHook(({ data }) => useAnimatedSeriesPath({
    renderData: data, getX, getXKey, yScale, dataKey: "value", curve: curveLinear,
    chartPhase: "ready", durationMs: 500, innerWidth: 200, enabled: true,
  }), { initialProps: { data: rows(10) } });
  hook.rerender({ data: rows(30) });
  act(() => controls.at(-1)!.onUpdate(0.5));
  expect(hook.result.current.points[0]?.y).toBe(20);
  expect(hook.result.current.pathD.match(/M/g)).toHaveLength(2);
  hook.rerender({ data: rows(50) });
  expect(controls[0]!.stop).toHaveBeenCalled();
  act(() => controls.at(-1)!.onUpdate(0.5));
  expect(hook.result.current.points[0]?.y).toBe(35);
  expect(hook.result.current.pathD.match(/M/g)).toHaveLength(2);
  act(() => controls.at(-1)!.onComplete());
  expect(hook.result.current.points[0]?.y).toBe(50);
});

test("adding a missing value breaks the path before the first animation frame", () => {
  const hook = renderHook(({ data }) => useAnimatedSeriesPath({
    renderData: data, getX, getXKey, yScale, dataKey: "value", curve: curveLinear,
    chartPhase: "ready", durationMs: 500, innerWidth: 200, enabled: true,
  }), { initialProps: { data: rows(10, 10) } });
  hook.rerender({ data: rows(30, null) });
  expect(hook.result.current.pathD.match(/M/g)).toHaveLength(2);
  act(() => controls.at(-1)!.onUpdate(0.5));
  expect(hook.result.current.pathD.match(/M/g)).toHaveLength(2);
});

test("a concurrent Y-domain tween updates the destination without restarting series motion", () => {
  const initial = { data: rows(10), scale: yScale };
  const hook = renderHook(({ data, scale }) => useAnimatedSeriesPath({
    renderData: data, getX, getXKey, yScale: scale, dataKey: "value", curve: curveLinear,
    chartPhase: "ready", durationMs: 500, innerWidth: 200, enabled: true,
  }), { initialProps: initial });
  const data = rows(30);
  hook.rerender({ data, scale: yScale });
  act(() => controls.at(-1)!.onUpdate(0.25));
  hook.rerender({ data, scale: (value) => value / 2 });
  expect(controls).toHaveLength(1);
  act(() => controls.at(-1)!.onUpdate(0.5));
  expect(hook.result.current.points[0]?.y).toBe(12.5);
});

test("interrupted category reordering matches points by ID and keeps the missing category", () => {
  const data = rows(10);
  const hook = renderHook(({ data: renderData }) => useAnimatedSeriesPath({
    renderData, getX, getXKey, yScale, dataKey: "value", curve: curveLinear,
    chartPhase: "ready", durationMs: 500, innerWidth: 200, enabled: true,
  }), { initialProps: { data } });
  hook.rerender({ data: [{ id: "c", x: 0, value: 20 }, data[1]!, { id: "a", x: 200, value: 30 }] });
  act(() => controls.at(-1)!.onUpdate(0.5));
  expect(hook.result.current.points.map(({ key, x, y }) => [key, x, y])).toEqual([["c", 100, 15], ["b", 100, null], ["a", 100, 20]]);
  hook.rerender({ data: [{ id: "a", x: 0, value: 50 }, data[1]!, { id: "c", x: 200, value: 30 }] });
  act(() => controls.at(-1)!.onUpdate(0.5));
  expect(hook.result.current.points.map(({ key, x, y }) => [key, x, y])).toEqual([["a", 50, 35], ["b", 100, null], ["c", 150, 22.5]]);
  expect(hook.result.current.pathD.match(/M/g)).toHaveLength(2);
  hook.unmount();
  expect(controls.at(-1)!.stop).toHaveBeenCalled();
});
