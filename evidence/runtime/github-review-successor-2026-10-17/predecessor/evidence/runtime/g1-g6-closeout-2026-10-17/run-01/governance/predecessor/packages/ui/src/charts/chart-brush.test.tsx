import { fireEvent, render, waitFor } from "@testing-library/react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { ChartBrush, type ChartBrushSelection } from "./vendor/charts/chart-brush";
import { ChartBrushLayout } from "./vendor/charts/chart-brush-layout";
import { ChartProvider, type ChartContextValue } from "./vendor/charts/chart-context";

const dateAt = (pixel: number) => new Date(Date.UTC(2026, 0, 1) + pixel * 86_400_000);
const range = (start: number, end: number): ChartBrushSelection => ({ start: dateAt(start), end: dateAt(end) });
const context = {
  xScale: scaleTime({ domain: [dateAt(0), dateAt(400)], range: [0, 400] }),
  yScale: scaleLinear({ domain: [0, 100], range: [80, 0] }),
  innerWidth: 400, innerHeight: 80, margin: { top: 0, left: 0, right: 0, bottom: 0 },
  isLoaded: true, containerRef: { current: null },
} as unknown as ChartContextValue;

function GeometryHost({ children }: { children: React.ReactNode }) {
  return <svg><ChartProvider value={context}>{children}</ChartProvider></svg>;
}

function expectNativeExtent(container: HTMLElement, start: number, end: number) {
  const box = container.querySelector(".visx-brush-selection");
  expect(Number(box?.getAttribute("x"))).toBeCloseTo(start);
  expect(Number(box?.getAttribute("width"))).toBeCloseTo(end - start);
  expect(Number(container.querySelector(".visx-brush-handle-left")?.getAttribute("x"))).toBeCloseTo(start - 4);
  expect(Number(container.querySelector(".visx-brush-handle-right")?.getAttribute("x"))).toBeCloseTo(end - 4);
}

test("controlled range changes and reset move the native selection and hit targets without notifying or remounting", () => {
  const changed = vi.fn();
  const example = (selection: ChartBrushSelection | null) => <GeometryHost>
    <ChartBrush initialSelection={range(0, 400)} selection={selection} onSelectionChange={changed} />
  </GeometryHost>;
  const view = render(example(range(100, 300)));
  expectNativeExtent(view.container, 100, 300);
  const native = view.container.querySelector(".visx-brush");
  view.rerender(example(range(120, 240)));
  expectNativeExtent(view.container, 120, 240);
  view.rerender(example(range(0, 400)));
  expectNativeExtent(view.container, 0, 400);
  expect(view.container.querySelector(".visx-brush")).toBe(native);
  expect(changed).not.toHaveBeenCalled();
  view.rerender(example(null));
  expect(view.container.querySelector(".visx-brush-selection")).toHaveAttribute("width", "0");
  expect(view.container.querySelector(".visx-brush-selection")).toHaveAttribute("x", "-1");
  expect(changed).not.toHaveBeenCalled();
});

test("controlled preview echoes preserve the native drag anchor across consecutive pointer moves", async () => {
  vi.stubGlobal("PointerEvent", MouseEvent);
  const changed = vi.fn();
  function ControlledBrush() {
    const [selection, setSelection] = useState<ChartBrushSelection | null>(range(100, 300));
    return <GeometryHost><ChartBrush initialSelection={range(100, 300)} selection={selection}
      onSelectionChange={next => { changed(next); setSelection(next); }} /></GeometryHost>;
  }
  try {
    const view = render(<ControlledBrush />);
    const native = view.container.querySelector(".visx-brush");
    fireEvent.pointerDown(view.container.querySelector(".visx-brush-handle-right")!, { clientX: 300, clientY: 40 });
    fireEvent.mouseMove(window, { clientX: 320, clientY: 40 });
    await waitFor(() => expectNativeExtent(view.container, 100, 320));
    fireEvent.mouseMove(window, { clientX: 350, clientY: 40 });
    await waitFor(() => expectNativeExtent(view.container, 100, 350));
    fireEvent.mouseUp(window, { clientX: 350, clientY: 40 });
    await waitFor(() => expectNativeExtent(view.container, 100, 350));
    expect(changed).toHaveBeenLastCalledWith(range(100, 350));
    expect(view.container.querySelector(".visx-brush")).toBe(native);
  } finally { vi.unstubAllGlobals(); }
});

test("layout restores an external date range and reports user changes without external-update feedback", () => {
  const changed = vi.fn();
  const data = [{ date: dateAt(0) }, { date: dateAt(400) }];
  const example = (selection: ChartBrushSelection) => <ChartBrushLayout data={data} enabled height={80}
    selection={selection} onSelectionChange={changed}
    brushStrip={layout => <GeometryHost><ChartBrush selection={layout.brushSelection} onSelectionChange={layout.onBrushSelectionChange} /></GeometryHost>}>
    {layout => <button onClick={() => layout.onBrushSelectionChange(range(100, 300))}>更新范围</button>}
  </ChartBrushLayout>;
  const view = render(example(range(50, 250)));
  expectNativeExtent(view.container, 50, 250);
  view.rerender(example(range(70, 200)));
  expectNativeExtent(view.container, 70, 200);
  expect(changed).not.toHaveBeenCalled();
  fireEvent.click(view.getByRole("button", { name: "更新范围" }));
  expect(changed).toHaveBeenLastCalledWith(range(100, 300));
  expectNativeExtent(view.container, 70, 200);
});
