import { act, fireEvent, render, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { expect, test, vi } from "vitest";
import { Candlestick, CandlestickChart, type OHLCDataPoint } from "./index";
import { useChart } from "./vendor/charts/chart-context";

vi.mock("@visx/responsive", () => ({ ParentSize: ({ children }: { children: (size: { width: number; height: number }) => ReactNode }) => children({ width: 400, height: 200 }) }));

function ReadingProbe() {
  const { data, tooltipData } = useChart();
  return <g data-testid="candle-reading" data-current={JSON.stringify(data[1])} data-tooltip={JSON.stringify(tooltipData)} />;
}

test("a stationary pointer reads current OHLC at the same date after a value-only candle update", async () => {
  const rows: OHLCDataPoint[] = [
    { date: new Date(2026, 8, 1), open: 10, high: 20, low: 0, close: 15 },
    { date: new Date(2026, 8, 2), open: 12, high: 20, low: 0, close: 17 },
    { date: new Date(2026, 8, 3), open: 10, high: 20, low: 0, close: 15 },
  ];
  const plot = (data: OHLCDataPoint[]) => <CandlestickChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} animationDuration={0}><Candlestick animate={false} /><ReadingProbe /></CandlestickChart>;
  const view = render(plot(rows));
  await act(async () => { await new Promise(resolve => setTimeout(resolve, 20)); });
  fireEvent.mouseMove(view.container.querySelector("svg > g")!, { clientX: 200, clientY: 100 });
  const probe = view.getByTestId("candle-reading");
  const reading = () => JSON.parse(probe.getAttribute("data-tooltip")!);
  await waitFor(() => expect(reading()?.point.close).toBe(17));
  const prior = reading();
  const updated = rows.map((point, index) => index === 1 ? { ...point, open: 16, close: 8 } : point);
  view.rerender(plot(updated));
  expect(JSON.parse(probe.getAttribute("data-current")!)).toEqual(JSON.parse(JSON.stringify(updated[1])));
  await waitFor(() => expect(reading().point).toEqual(JSON.parse(JSON.stringify(updated[1]))));
  expect(reading().index).toBe(prior.index);
  expect(reading().x).toBe(prior.x);
  fireEvent.mouseLeave(view.container.querySelector("svg > g")!);
  await waitFor(() => expect(reading()).toBeNull());
});
