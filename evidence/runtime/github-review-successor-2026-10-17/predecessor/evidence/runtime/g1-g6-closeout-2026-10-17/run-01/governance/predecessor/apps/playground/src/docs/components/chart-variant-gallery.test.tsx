import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { ChartVariantCard } from "./chart-variant-gallery";
import { CHART_VARIANTS, CHART_VARIANT_REFERENCE } from "./chart-variants";
import type { VariantExampleProps } from "./chart-variants/shared";

afterEach(() => vi.unstubAllGlobals());

test("the complete source reference stays frozen while registered previews are a real subset", () => {
  expect(CHART_VARIANT_REFERENCE).toHaveLength(170);
  expect(new Set(CHART_VARIANT_REFERENCE.map(item => item.id)).size).toBe(170);
  expect(new Set(CHART_VARIANT_REFERENCE.map(item => item.family)).size).toBe(16);
  expect(CHART_VARIANTS).toHaveLength(170);
  expect(CHART_VARIANTS.map(item => item.id)).toEqual(CHART_VARIANT_REFERENCE.map(item => item.id));
  for (const item of CHART_VARIANTS) expect(CHART_VARIANT_REFERENCE.find(row => row.id === item.id)).toBeDefined();
});

test("two cards keep local controls and mounted user choices through visibility changes", () => {
  const observations: IntersectionObserverCallback[] = [];
  const disconnect = vi.fn();
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { observations.push(callback); }
    observe() {} disconnect = disconnect;
  });
  function Example({ revision, active }: VariantExampleProps) {
    return <div><output>{revision}:{String(active)}</output><input aria-label="保留选择" defaultValue="初始" /></div>;
  }
  const variants = CHART_VARIANTS.slice(0, 2);
  const view = render(<>{variants.map(variant => <ChartVariantCard key={variant.id} variant={variant} recipe="category-wide" reduced={false} Example={Example} />)}</>);
  const first = screen.getByRole("region", { name: variants[0]!.title });
  const second = screen.getByRole("region", { name: variants[1]!.title });
  expect(first.querySelector("output")).toBeNull();
  act(() => observations.forEach((callback, index) => callback([{ isIntersecting: true, target: index ? second : first } as unknown as IntersectionObserverEntry], {} as IntersectionObserver)));
  fireEvent.click(first.querySelector('button[data-action="update"]')!);
  expect(first.querySelector("output")).toHaveTextContent("1:true");
  expect(second.querySelector("output")).toHaveTextContent("0:true");
  fireEvent.change(first.querySelector("input")!, { target: { value: "用户选择" } });
  fireEvent.focus(first.querySelector("input")!);
  act(() => observations[0]!([{ isIntersecting: false, target: first } as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(first.querySelector("output")).toHaveTextContent("1:false");
  act(() => observations[0]!([{ isIntersecting: true, target: first } as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(first.querySelector("input")).toHaveValue("用户选择");
  view.unmount();
  expect(disconnect).toHaveBeenCalledTimes(4);
});

test("browsers without IntersectionObserver display the example immediately", () => {
  vi.stubGlobal("IntersectionObserver", undefined);
  render(<ChartVariantCard variant={CHART_VARIANTS[0]!} recipe="category-wide" reduced={true} Example={({ active }) => <output>{String(active)}</output>} />);
  expect(screen.getByText("true")).toBeVisible();
});

test("each card exports its selected state without changing a sibling", () => {
  vi.stubGlobal("IntersectionObserver", undefined);
  const variants = CHART_VARIANTS.slice(0, 2);
  const Example = ({ settings, onSettingsChange }: VariantExampleProps) => <button onClick={() => onSettingsChange?.({ value: 0, loading: false })}>选择零值 {String(settings?.value)}</button>;
  render(<>{variants.map(variant => <ChartVariantCard key={variant.id} variant={variant} recipe="category-wide" reduced={true} Example={Example} />)}</>);
  const first = screen.getByRole("region", { name: variants[0]!.title });
  const second = screen.getByRole("region", { name: variants[1]!.title });
  const choice = [...first.querySelectorAll("button")].find(button => button.textContent?.startsWith("选择零值"))!;
  fireEvent.click(choice);
  expect(first.querySelector("pre")).toHaveTextContent('useState<VariantSettings>({"value":0,"loading":false})');
  expect(second.querySelector("pre")).toHaveTextContent("useState<VariantSettings>({})");
});
