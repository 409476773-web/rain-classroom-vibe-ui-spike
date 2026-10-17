import { act, render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { PieProvider, type PieContextValue } from "./vendor/charts/pie-context";
import { PieSlice } from "./vendor/charts/pie-slice";

test("static grow slices never send undefined paths during mount, resize or hover", async () => {
  const data = [{ label: "课程人数", value: 12 }];
  const context: PieContextValue = {
    data, arcs: [{ data: data[0]!, index: 0, value: 12, startAngle: 0, endAngle: Math.PI, padAngle: 0 }],
    size: 320, center: 160, innerRadius: 55, outerRadius: 150, padAngle: 0, cornerRadius: 0,
    hoverOffset: 10, animationKey: 0, isLoaded: true, enterStaggerScale: 0,
    containerRef: { current: null }, totalValue: 12, getColor: () => "var(--chart-1)", getFill: () => "var(--chart-1)",
    geometryScrubbing: false, scrubSlicePaths: null, hoveredIndex: null, setHoveredIndex: vi.fn(),
  };
  const invalid: string[] = [];
  const setAttribute = Element.prototype.setAttribute;
  const spy = vi.spyOn(Element.prototype, "setAttribute").mockImplementation(function (this: Element, name, value) {
    if (name === "d" && /undefined|NaN|Infinity/.test(String(value))) invalid.push(String(value));
    return setAttribute.call(this, name, value);
  });
  const frames = () => act(async () => { await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))); });
  const example = (value: PieContextValue) => <svg><PieProvider value={value}><PieSlice index={0} animate={false} hoverEffect="grow" /></PieProvider></svg>;
  try {
    const view = render(example(context));
    await frames();
    const initial = view.container.querySelector('path[pointer-events="none"]')!.getAttribute("d");
    view.rerender(example({ ...context, outerRadius: 100, hoveredIndex: 0 }));
    await frames();
    expect(invalid).toEqual([]);
    expect(view.container.querySelector('path[pointer-events="none"]')!.getAttribute("d")).not.toBe(initial);
    view.unmount();
  } finally { spy.mockRestore(); }
});
