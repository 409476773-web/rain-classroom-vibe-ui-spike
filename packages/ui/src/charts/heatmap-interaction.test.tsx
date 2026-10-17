import React from "react";
import { fireEvent, render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, expect, test, vi } from "vitest";
import {
  HeatmapChart, HeatmapCells, HeatmapLegend, HeatmapInteractionBoundary,
  HeatmapInteractionProvider, type HeatmapColumn,
} from "./index";
import { useHeatmapInteraction } from "./vendor/charts/heatmap/heatmap-context";

vi.mock("@visx/responsive", () => ({ ParentSize: ({ children }: { children: (size: { width: number; height: number }) => React.ReactNode }) => <div>{children({ width: 420, height: 240 })}</div> }));
vi.stubGlobal("ResizeObserver", class {
  constructor(private callback: ResizeObserverCallback) {}
  observe(target: Element) { this.callback([{ target, contentRect: { width: 420, height: 240 } } as ResizeObserverEntry], this as unknown as ResizeObserver); }
  unobserve() {}
  disconnect() {}
});
afterAll(() => vi.unstubAllGlobals());

function calendar(revision = 0): HeatmapColumn[] {
  return Array.from({ length: 2 }, (_, column) => ({ bin: column, bins: Array.from({ length: 7 }, (_, row) => ({ bin: row, date: new Date(2026, 5, 7 + column * 7 + row), count: column === 0 && row === 3 ? -1 : column === 0 && row === 0 ? 0 : 1 + revision })) }));
}
function Reading() {
  const { tooltipData, hoveredLegendLevel } = useHeatmapInteraction();
  return <output data-testid="reading">{JSON.stringify({ date: tooltipData?.date.getDate(), count: tooltipData?.count, column: tooltipData?.column, row: tooltipData?.row, level: hoveredLegendLevel })}</output>;
}
function plot(data = calendar(), props: Partial<React.ComponentProps<typeof HeatmapChart>> = {}, interactive = true, gradient = false) {
  return <HeatmapInteractionProvider><HeatmapInteractionBoundary><HeatmapChart data={data} animate={false} {...props}><HeatmapCells interactive={interactive} /></HeatmapChart><HeatmapLegend variant={gradient ? "gradient" : "swatches"} /><Reading /></HeatmapInteractionBoundary></HeatmapInteractionProvider>;
}
const read = (container: HTMLElement) => JSON.parse(within(container).getByTestId("reading").textContent!);
const cell = (container: HTMLElement, index: number) => container.querySelectorAll<SVGRectElement>(".visx-heatmap-rects g > rect:first-child")[index]!;
async function entry(container: HTMLElement) {
  await waitFor(() => expect(within(container).getByRole("region", { name: "日历热图" })).toBeInTheDocument());
  return within(container).getByRole("region", { name: "日历热图" });
}

test("one HTML keyboard entry inspects actual rows, weeks and bounded Home/End corners", async () => {
  const view = render(plot());
  const grid = await entry(view.container);
  expect(grid.closest("svg")).toBeNull();
  expect(view.container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  expect(view.container.querySelectorAll("svg [tabindex]")).toHaveLength(0);
  expect(view.container.querySelectorAll('[aria-label="日历热图"][tabindex="0"]')).toHaveLength(1);
  fireEvent.focus(grid);
  expect(read(view.container)).toMatchObject({ date: 7, count: 0 });
  fireEvent.keyDown(grid, { key: "ArrowDown" });
  expect(read(view.container)).toMatchObject({ date: 8, row: 1 });
  fireEvent.keyDown(grid, { key: "ArrowRight" });
  expect(read(view.container)).toMatchObject({ date: 15, column: 1, row: 1 });
  fireEvent.keyDown(grid, { key: "End" });
  expect(read(view.container)).toMatchObject({ date: 20, row: 6 });
  fireEvent.keyDown(grid, { key: "Home", ctrlKey: true });
  expect(read(view.container)).toMatchObject({ date: 7, count: 0 });
  fireEvent.keyDown(grid, { key: "End", ctrlKey: true });
  expect(read(view.container)).toMatchObject({ date: 20 });
  fireEvent.keyDown(grid, { key: "ArrowRight" });
  expect(read(view.container)).toMatchObject({ date: 20 });
});

test("missing remains inspectable, Escape dismisses and blur clears the temporary preview", async () => {
  const view = render(plot());
  const grid = await entry(view.container);
  fireEvent.focus(grid);
  for (let index = 0; index < 3; index++) fireEvent.keyDown(grid, { key: "ArrowDown" });
  expect(read(view.container)).toMatchObject({ date: 10, count: -1 });
  expect(grid).toHaveTextContent("缺测");
  fireEvent.keyDown(grid, { key: "Escape" });
  expect(read(view.container).date).toBeUndefined();
  fireEvent.keyDown(grid, { key: "ArrowDown" });
  expect(read(view.container).date).toBeDefined();
  fireEvent.blur(grid);
  expect(read(view.container).date).toBeUndefined();
});

test("a pointer preview restores keyboard focus on leave, including the chart boundary", async () => {
  const view = render(plot());
  const grid = await entry(view.container);
  fireEvent.focus(grid);
  fireEvent.pointerEnter(cell(view.container, 10));
  expect(read(view.container)).toMatchObject({ date: 17 });
  fireEvent.pointerLeave(cell(view.container, 10));
  expect(read(view.container)).toMatchObject({ date: 7 });
  fireEvent.pointerLeave(view.container.querySelector('[data-heatmap-interaction-boundary]')!);
  expect(read(view.container)).toMatchObject({ date: 7 });
});

test("hover and focus follow the same stable date through value and coordinate updates, then clear when absent", async () => {
  const view = render(plot());
  await entry(view.container);
  fireEvent.pointerEnter(cell(view.container, 10));
  expect(read(view.container)).toMatchObject({ date: 17, count: 1 });
  view.rerender(plot(calendar(1)));
  await waitFor(() => expect(read(view.container)).toMatchObject({ date: 17, count: 2 }));
  const grid = await entry(view.container);
  fireEvent.focus(grid);
  expect(read(view.container)).toMatchObject({ date: 17 });
  view.rerender(plot(calendar(2).slice(1)));
  await waitFor(() => expect(read(view.container)).toMatchObject({ date: 17, count: 3, column: 0, row: 3 }));
  view.rerender(plot([calendar(2)[0]!]));
  await waitFor(() => expect(read(view.container).date).toBeUndefined());
});

test("Monday navigation uses the painted row order and an explicit domain excludes calendar padding", async () => {
  const view = render(plot(calendar(), { weekStartDay: 1, xDomain: [new Date(2026, 5, 8), new Date(2026, 5, 19)] }));
  const grid = await entry(view.container);
  fireEvent.focus(grid);
  expect(read(view.container)).toMatchObject({ date: 8, row: 0 });
  fireEvent.keyDown(grid, { key: "End", ctrlKey: true });
  expect(read(view.container)).toMatchObject({ date: 19 });
  expect(view.container.querySelectorAll(".visx-heatmap-rects g > rect:first-child")).toHaveLength(12);
});

test.each([false, true])("%s gradient legend reads the clicked level and clears only on Escape/blur/outside pointer", async gradient => {
  const view = render(plot(calendar(), {}, true, gradient));
  await entry(view.container);
  const level = within(view.container).getByRole("button", { name: "等级 2" });
  fireEvent.focus(level);
  expect(read(view.container).level).toBe(2);
  fireEvent.pointerEnter(cell(view.container, 0));
  expect(read(view.container)).toMatchObject({ date: 7, level: null });
  fireEvent.pointerLeave(cell(view.container, 0));
  expect(read(view.container).level).toBe(2);
  fireEvent.keyDown(level, { key: "Escape" });
  expect(read(view.container).level).toBeNull();
  fireEvent.click(level);
  expect(read(view.container).level).toBe(2);
  fireEvent.focus(level);
  fireEvent.pointerDown(document.body, { pointerType: "touch" });
  expect(read(view.container).level).toBeNull();
});

test.each([false, true])("%s gradient native button Enter and Space read the same level again after Escape", async gradient => {
  const user = userEvent.setup();
  const view = render(plot(calendar(), {}, true, gradient));
  await entry(view.container);
  const level = within(view.container).getByRole("button", { name: "等级 2" });
  await user.click(level);
  expect(read(view.container).level).toBe(2);
  for (const key of ["{Enter}", " "]) {
    await user.keyboard("{Escape}");
    expect(read(view.container).level).toBeNull();
    await user.keyboard(key);
    expect(read(view.container).level).toBe(2);
    expect(level).not.toHaveAttribute("aria-pressed");
  }
  fireEvent.blur(level);
  expect(read(view.container).level).toBeNull();
});

test.each([{ status: "loading" as const }, { data: [] }])("loading or empty %j has no keyboard cell entry", async props => {
  const view = render(plot(calendar(), props));
  expect(within(view.container).queryByRole("region", { name: "日历热图" })).toBeNull();
});

test("interactive=false retains the decorative cell contract without a keyboard entry", () => {
  const view = render(plot(calendar(), {}, false));
  expect(within(view.container).queryByRole("region", { name: "日历热图" })).toBeNull();
});

test.each([0, 1] as const)("a past short domain, weekStartDay=%s, preserves the missing cutoff day and clears only after it leaves", async weekStartDay => {
  const date = new Date(2026, 5, 10);
  const view = render(plot(calendar(), { weekStartDay, xDomain: [date, date] }));
  const grid = await entry(view.container);
  fireEvent.focus(grid);
  expect(read(view.container)).toMatchObject({ date: 10, count: -1 });
  expect(view.container.querySelectorAll(".visx-heatmap-rects g > rect:first-child")).toHaveLength(1);
  for (const key of ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"]) fireEvent.keyDown(grid, { key });
  expect(read(view.container)).toMatchObject({ date: 10, count: -1 });
  view.rerender(plot(calendar(1), { weekStartDay, xDomain: [new Date(2026, 5, 8), date] }));
  await waitFor(() => expect(read(view.container)).toMatchObject({ date: 10, count: -1 }));
  view.rerender(plot(calendar(1), { weekStartDay, xDomain: [new Date(2026, 5, 8), new Date(2026, 5, 9)] }));
  await waitFor(() => expect(read(view.container).date).toBeUndefined());
});

test("focus relookup preserves the date after changing week start and refreshes behind an active pointer preview", async () => {
  const view = render(plot());
  const grid = await entry(view.container);
  fireEvent.focus(grid);
  fireEvent.keyDown(grid, { key: "ArrowDown" });
  expect(read(view.container)).toMatchObject({ date: 8, count: 1, row: 1 });
  fireEvent.pointerEnter(cell(view.container, 10));
  view.rerender(plot(calendar(1), { weekStartDay: 1 }));
  await waitFor(() => expect(read(view.container)).toMatchObject({ date: 17, count: 2, row: 2 }));
  fireEvent.pointerLeave(cell(view.container, 0));
  expect(read(view.container)).toMatchObject({ date: 8, count: 2, row: 0 });
});

test("two native instances keep their portal entries, focus readings and level previews independent", async () => {
  const view = render(<><section data-testid="one">{plot()}</section><section data-testid="two">{plot(calendar(2))}</section></>);
  const first = within(view.container).getByTestId("one"), second = within(view.container).getByTestId("two");
  const firstGrid = await entry(first), secondGrid = await entry(second);
  fireEvent.focus(firstGrid);
  fireEvent.keyDown(firstGrid, { key: "ArrowDown" });
  expect(read(first)).toMatchObject({ date: 8, count: 1 });
  expect(read(second).date).toBeUndefined();
  fireEvent.focus(secondGrid);
  fireEvent.keyDown(secondGrid, { key: "ArrowDown" });
  expect(read(second)).toMatchObject({ date: 8, count: 3 });
  expect(read(first)).toMatchObject({ date: 8, count: 1 });
  fireEvent.focus(within(second).getByRole("button", { name: "等级 4" }));
  expect(read(second).level).toBe(4);
  expect(read(first).level).toBeNull();
});
