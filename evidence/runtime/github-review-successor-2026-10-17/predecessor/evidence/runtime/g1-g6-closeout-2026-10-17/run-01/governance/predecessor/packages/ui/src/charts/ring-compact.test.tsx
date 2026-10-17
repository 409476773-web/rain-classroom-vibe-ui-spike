import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { expect, test, vi } from "vitest";
import { RingChart } from "./vendor/charts/ring-chart";
import { useRingStable } from "./vendor/charts/ring-context";
const parentSize = vi.hoisted(() => ({ width: 48, height: 48 }));
vi.mock("@visx/responsive", () => ({ ParentSize: ({children}: {children:(size:typeof parentSize)=>ReactNode}) => children(parentSize) }));
function Radii() {
  const ring = useRingStable();
  return <text data-testid="radius">{ring.getRingRadii(0).outerRadius}</text>;
}
const data = [{ label: "完成", value: 50, maxValue: 100 }];
test("compact padding preserves readable ring geometry and defaults remain compatible", () => {
  const view = render(<RingChart data={data} size={48} baseInnerRadius={18} strokeWidth={4} padding={2}><Radii /></RingChart>);
  expect(view.getByTestId("radius")).toHaveTextContent("22");
  view.rerender(<RingChart data={data} size={48} baseInnerRadius={18} strokeWidth={4}><Radii /></RingChart>);
  expect(Number(view.getByTestId("radius").textContent)).toBeCloseTo(16);
});
test.each([-1, NaN, Infinity, 24])("invalid compact padding %s is rejected", padding => {
  expect(() => render(<RingChart data={data} size={48} padding={padding}><Radii /></RingChart>)).toThrow(/padding/);
});
test("responsive rings wait through small measurements while explicit invalid sizes remain rejected", () => {
  parentSize.width = parentSize.height = 12;
  const view = render(<RingChart data={data}><Radii /></RingChart>);
  expect(view.container.querySelector("svg")).toBeNull();
  parentSize.width = parentSize.height = 48;
  view.rerender(<RingChart data={data}><Radii /></RingChart>);
  expect(view.container.querySelector("svg")).not.toBeNull();
  expect(() => render(<RingChart data={data} size={12} padding={8}><Radii /></RingChart>)).toThrow(/padding/);
});
