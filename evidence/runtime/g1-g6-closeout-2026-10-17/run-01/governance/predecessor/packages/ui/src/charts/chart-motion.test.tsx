import { expect, test, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useChartSpring } from "./vendor/charts/motion-utils";

test("reduced-motion chart positions update immediately without spring lag", () => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} })));
  const { result } = renderHook(() => useChartSpring(0, { stiffness: 100, damping: 20 }));
  act(() => result.current.set(80));
  expect(result.current.get()).toBe(80);
  vi.unstubAllGlobals();
});
