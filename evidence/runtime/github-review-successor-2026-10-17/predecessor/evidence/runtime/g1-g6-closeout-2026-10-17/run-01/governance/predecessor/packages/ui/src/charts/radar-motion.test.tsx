import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import type { Transition } from "motion/react";
import { RadarArea } from "./vendor/charts/radar-area";
import { RadarChart, type RadarChartProps } from "./vendor/charts/radar-chart";

const motionState = vi.hoisted(() => ({ reduced: false, listeners: new Set<() => void>(), enters: [] as Transition[] }));
vi.mock("motion/react", async importOriginal => {
  const original = await importOriginal<typeof import("motion/react")>();
  return {
    ...original,
    animate: (...args: Parameters<typeof original.animate>) => {
      motionState.enters.push(args[2] as Transition);
      return original.animate(...args);
    },
  };
});

const metrics = ["knowledge", "attendance", "practice", "engagement", "review"].map(key => ({ key, label: key }));
const scores = [[84, 92, 68, 78, 61], [67, 78, 91, 64, 82], [76, 61, 73, 93, 70]];
const data = scores.map((values, index) => ({ label: `Series ${index + 1}`, color: `var(--chart-${index + 1})`, values: Object.fromEntries(metrics.map((metric, metricIndex) => [metric.key, values[metricIndex]!])) }));
type MotionProps = Pick<RadarChartProps, "animate" | "enterDurationMs" | "enterTransition" | "staggerScale" | "hoveredIndex">;
const chart = (props: MotionProps = {}) => <RadarChart size={340} margin={50} data={data} metrics={metrics} {...props}>
  {data.map((item, index) => <RadarArea key={item.label} index={index} showPoints />)}
</RadarChart>;

beforeEach(() => {
  motionState.reduced = false;
  motionState.enters.length = 0;
  motionState.listeners.clear();
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    get matches() { return motionState.reduced; },
    addListener: (listener: () => void) => motionState.listeners.add(listener),
    removeListener: (listener: () => void) => motionState.listeners.delete(listener),
    addEventListener: (_name: string, listener: () => void) => motionState.listeners.add(listener),
    removeEventListener: (_name: string, listener: () => void) => motionState.listeners.delete(listener),
  })));
});
afterEach(() => vi.unstubAllGlobals());

function expectTargetGeometry(container: HTMLElement, hoveredIndex: number | null = null) {
  const groups = [...container.querySelectorAll('svg g[style*="cursor"]')];
  expect(groups).toHaveLength(3);
  groups.forEach((group, seriesIndex) => {
    const path = group.querySelector("path")!;
    const coordinates = (path.getAttribute("d")?.match(/-?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
    const expected = scores[seriesIndex]!.flatMap((value, metricIndex) => {
      const angle = metricIndex * Math.PI * 2 / metrics.length - Math.PI / 2;
      return [120 * value / 100 * Math.cos(angle), 120 * value / 100 * Math.sin(angle)];
    });
    expect(coordinates).toHaveLength(expected.length);
    coordinates.forEach((coordinate, index) => expect(coordinate).toBeCloseTo(expected[index]!, 8));
    const points = [...group.querySelectorAll("circle")];
    expect(points).toHaveLength(metrics.length);
    points.forEach((point, index) => {
      expect(Number(point.getAttribute("cx"))).toBeCloseTo(expected[index * 2]!, 8);
      expect(Number(point.getAttribute("cy"))).toBeCloseTo(expected[index * 2 + 1]!, 8);
    });
    expect(getComputedStyle(group).opacity).toBe(hoveredIndex !== null && hoveredIndex !== seriesIndex ? "0.3" : "1");
  });
}

test.each([
  { name: "animate=false", props: { animate: false } },
  { name: "a zero enter budget", props: { enterDurationMs: 0 } },
  { name: "a zero enter transition", props: { enterTransition: { type: "tween" as const, duration: 0 } } },
])("radar with $name paints all series at their final coordinates without waiting", ({ props }) => {
  const view = render(chart(props));
  expectTargetGeometry(view.container);
  expect(motionState.enters).toHaveLength(3);
  for (const enter of motionState.enters) expect(enter).toMatchObject({ duration: 0, delay: 0 });
});

test("system reduced motion bypasses the radar's normal area stagger", () => {
  motionState.reduced = true;
  const view = render(chart());
  expectTargetGeometry(view.container);
  for (const enter of motionState.enters) expect(enter).toMatchObject({ duration: 0, delay: 0 });
});

test("disabling radar animation during entry immediately replaces the collapsed geometry", () => {
  const view = render(chart());
  expect(view.container.querySelector("circle")?.getAttribute("cy")).toBe("0");
  view.rerender(chart({ animate: false }));
  expectTargetGeometry(view.container);
  for (const enter of motionState.enters.slice(-3)) expect(enter).toMatchObject({ duration: 0, delay: 0 });
});

test("a system reduced-motion change during entry immediately reveals all final coordinates", () => {
  const view = render(chart());
  expect(view.container.querySelector("circle")?.getAttribute("cy")).toBe("0");
  act(() => {
    motionState.reduced = true;
    for (const listener of motionState.listeners) listener();
  });
  expectTargetGeometry(view.container);
  for (const enter of motionState.enters.slice(-3)) expect(enter).toMatchObject({ duration: 0, delay: 0 });
});

test("disabling entry immediately preserves the active hover styles", () => {
  const view = render(chart({ hoveredIndex: 0 }));
  view.rerender(chart({ animate: false, hoveredIndex: 0 }));
  expectTargetGeometry(view.container, 0);
  const groups = [...view.container.querySelectorAll<SVGGElement>('svg g[style*="cursor"]')];
  groups.forEach((group, index) => {
    const path = group.querySelector("path")!;
    expect(path.getAttribute("fill-opacity")).toBe(index === 0 ? "0.35" : "0.15");
    expect(path.getAttribute("stroke-width")).toBe(index === 0 ? "3" : "2");
    expect(group.style.transform).toBe(index === 0 ? "scale(1.05)" : "");
    expect(group.style.transformOrigin).toBe("50% 50%");
    expect(group.style.transformBox).toBe("fill-box");
    expect([...group.querySelectorAll("circle")].every(point => point.getAttribute("r") === (index === 0 ? "6" : "4"))).toBe(true);
  });
});

test("ordinary radar retains the existing stagger and enter transition", () => {
  const view = render(chart());
  expect(motionState.enters).toHaveLength(3);
  motionState.enters.forEach((enter, index) => {
    expect(enter.duration).toBe(1.1);
    expect(enter.delay).toBeCloseTo(.6 + index * .15, 10);
    expect(enter.ease).toEqual([.85, 0, .15, 1]);
  });
  expect(view.container.querySelector("circle")?.getAttribute("cy")).toBe("0");
});
