import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { XAxis } from "./vendor/charts/x-axis";
import { shortDateFmt } from "./vendor/charts/chart-formatters";
import { StaticChartPreviewProvider } from "./vendor/charts/static-chart-preview-context";
import { TimeSeriesChartInner, type TimeSeriesChartInnerProps } from "./vendor/charts/time-series-chart-shell";

const preference = { reduced: false };
const mediaListeners = new Set<(event: MediaQueryListEvent) => void>();

const dates = [1, 2, 3].map(day => new Date(`2026-09-0${day}T00:00:00Z`));
const rows = dates.map((date, index) => ({ date, value: 20 + index * 10 }));
const extendedRows = [rows[0]!, rows[1]!, { date: new Date("2026-09-05T00:00:00Z"), value: 45 }];
const categoryRows = [
  { id: "first", label: "学期", value: 20 },
  { id: "second", label: "学期", value: 30 },
  { id: "third", label: "下一学期", value: 40 },
];
const portals: HTMLDivElement[] = [];

// JSDOM does not lay out percentages. Resolve the CSS specified value at the
// known test-container width; real browser tests measure the painted position.
function left(node: HTMLDivElement, width: number) {
  const value = node.style.left;
  const calc = value.match(/^calc\(([-\d.]+)%\s*([+-])\s*([\d.]+)px\)$/);
  if (calc) return Number(calc[1]) * width / 100 + Number(calc[3]) * (calc[2] === "-" ? -1 : 1);
  if (value.endsWith("%")) return Number.parseFloat(value) * width / 100;
  return Number.parseFloat(value);
}

beforeEach(() => {
  preference.reduced = false;
  mediaListeners.clear();
  // Supply only the browser API missing from JSDOM; Motion and the chart remain real.
  const media = {
    get matches() { return preference.reduced; },
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => mediaListeners.add(listener),
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => mediaListeners.delete(listener),
    addListener: (listener: (event: MediaQueryListEvent) => void) => mediaListeners.add(listener),
    removeListener: (listener: (event: MediaQueryListEvent) => void) => mediaListeners.delete(listener),
  };
  vi.stubGlobal("matchMedia", () => media);
});
afterEach(() => {
  for (const portal of portals.splice(0)) portal.remove();
  vi.unstubAllGlobals();
});

function fixture(initial: Partial<TimeSeriesChartInnerProps> = {}) {
  const portal = document.createElement("div");
  document.body.append(portal);
  portals.push(portal);
  let options = initial;
  const element = () => <StaticChartPreviewProvider><TimeSeriesChartInner
    width={600} height={220} data={rows} xDataKey="date"
    margin={{ left: 40, right: 40, top: 20, bottom: 30 }}
    animationDuration={1100} yDomainTween={false} clipPathId="resize-axis"
    containerRef={{ current: portal }}
    lines={[{ dataKey: "value", stroke: "currentColor", strokeWidth: 2 }]}
    {...options}
  ><XAxis numTicks={3} /></TimeSeriesChartInner></StaticChartPreviewProvider>;
  const view = render(element());
  return {
    portal,
    svg: view.container.querySelector("svg")!,
    update(next: Partial<TimeSeriesChartInnerProps> = {}) {
      options = { ...options, ...next };
      view.rerender(element());
    },
    dateLabel(date = dates[1]!) {
      const span = [...portal.querySelectorAll("span")].find(node => node.textContent === shortDateFmt.format(date));
      expect(span).toBeDefined();
      return span!.parentElement as HTMLDivElement;
    },
  };
}

test("shrinking the plot places the existing date label at its new coordinate without a position tween", () => {
  const chart = fixture();
  const tick = chart.dateLabel();
  expect(left(tick, 600)).toBe(300);
  chart.update({ width: 390 });
  expect(chart.dateLabel()).toBe(tick);
  expect(left(tick, 390)).toBe(195);
  expect(tick.style.transition).toBe("");
  expect(tick).toHaveStyle({ bottom: "12px", width: "0px", display: "flex", justifyContent: "center" });
  expect(tick.firstElementChild).toHaveClass("whitespace-nowrap", "text-chart-label", "text-xs");
});

test("expanding the plot also keeps the date label in sync with the container", () => {
  const chart = fixture({ width: 390 });
  const tick = chart.dateLabel();
  chart.update({ width: 600 });
  expect(chart.dateLabel()).toBe(tick);
  expect(left(tick, 600)).toBe(300);
  expect(tick.style.transition).toBe("");
});

test("changing data at the same plot width preserves the original position animation", () => {
  const chart = fixture();
  const tick = chart.dateLabel();
  chart.update({ data: extendedRows });
  expect(chart.dateLabel()).toBe(tick);
  expect(left(tick, 600)).toBe(170);
  expect(tick.style.transition).toMatch(/^left 500ms cubic-bezier\(/);
});

test("resize interrupts an active data-position tween and the next data update can animate again", () => {
  const chart = fixture();
  const tick = chart.dateLabel();
  chart.update({ data: extendedRows });
  expect(tick.style.transition).toMatch(/^left 500ms /);
  chart.update({ width: 390 });
  expect(left(tick, 390)).toBe(117.5);
  expect(tick.style.transition).toBe("");
  chart.update({ data: rows });
  expect(left(tick, 390)).toBe(195);
  expect(tick.style.transition).toMatch(/^left 500ms /);
});

test("a margin change is a layout update rather than an animated data update", () => {
  const chart = fixture();
  const tick = chart.dateLabel();
  chart.update({ margin: { left: 60, right: 40, top: 20, bottom: 30 } });
  expect(left(tick, 600)).toBe(310);
  expect(tick.style.transition).toBe("");
});

test("system reduced motion makes data-position changes immediate even without a caller override", () => {
  preference.reduced = true;
  const chart = fixture();
  chart.update({ data: extendedRows });
  expect(left(chart.dateLabel(), 600)).toBe(170);
  expect(chart.dateLabel().style.transition).toBe("");
});

test("a caller disabling chart animation also disables the axis position tween", () => {
  const chart = fixture({ animationDuration: 0 });
  chart.update({ data: extendedRows });
  expect(left(chart.dateLabel(), 600)).toBe(170);
  expect(chart.dateLabel().style.transition).toBe("");
});

test("resizing one chart does not disable a different chart's data animation", () => {
  const resized = fixture();
  const updating = fixture();
  resized.update({ width: 390 });
  updating.update({ data: extendedRows });
  expect(resized.dateLabel().style.transition).toBe("");
  expect(updating.dateLabel().style.transition).toMatch(/^left 500ms /);
});

test("category labels retain duplicate-name identities and resize to their real point centers", () => {
  const chart = fixture({ data: categoryRows, xMode: "category", xDataKey: "id", xLabel: row => String(row.label) });
  const ticks = [...chart.portal.querySelectorAll("span")].map(node => node.parentElement as HTMLDivElement);
  expect(ticks.map(node => node.textContent)).toEqual(["学期", "学期", "下一学期"]);
  chart.update({ width: 390 });
  const current = [...chart.portal.querySelectorAll("span")].map(node => node.parentElement as HTMLDivElement);
  expect(current).toEqual(ticks);
  const expected = [40 + 310 / 6, 195, 40 + 310 * 5 / 6];
  // CSSOM serializes percentage calc terms with fewer decimals than the scale.
  current.forEach((node, index) => expect(left(node, 390)).toBeCloseTo(expected[index]!, 3));
  expect(current.every(node => node.style.transition === "")).toBe(true);
});

test("a brushed viewport retains its existing immediate position policy", () => {
  const chart = fixture({ xDomain: [dates[0]!, dates[2]!] });
  chart.update({ width: 390 });
  expect(left(chart.dateLabel(), 390)).toBe(195);
  expect(chart.dateLabel().style.transition).toBe("");
});

test("changing the system motion preference updates the mounted axis without a caller rerender", () => {
  const chart = fixture();
  const tick = chart.dateLabel();
  expect(tick.style.transition).toMatch(/^left 500ms /);
  act(() => {
    preference.reduced = true;
    for (const listener of mediaListeners) listener({ matches: true } as MediaQueryListEvent);
  });
  expect(chart.dateLabel()).toBe(tick);
  expect(tick.style.transition).toBe("");
  act(() => {
    preference.reduced = false;
    for (const listener of mediaListeners) listener({ matches: false } as MediaQueryListEvent);
  });
  expect(tick.style.transition).toMatch(/^left 500ms /);
});

test("date positions respond to the actual container before its debounced width reaches chart context", () => {
  const chart = fixture();
  const tick = chart.dateLabel();
  expect(tick.style.left).toContain("%");
  // Only the host shrinks: React still holds width=600 until ParentSize reports it.
  expect(left(tick, 390)).toBe(195);
  expect(left(chart.dateLabel(dates[0]!), 390)).toBe(40);
  expect(left(chart.dateLabel(dates[2]!), 390)).toBe(350);
});

test("the SVG viewport is limited by its actual container while measured coordinates catch up", () => {
  const chart = fixture();
  expect(chart.svg.getAttribute("width")).toBe("600");
  expect(chart.svg.style.maxWidth).toBe("100%");
  chart.update({ width: 390 });
  expect(chart.svg.getAttribute("width")).toBe("390");
  expect(chart.svg.style.maxWidth).toBe("100%");
});
