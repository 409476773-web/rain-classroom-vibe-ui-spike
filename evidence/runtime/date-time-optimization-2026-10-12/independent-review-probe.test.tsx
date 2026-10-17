import { render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { DatePicker } from "../../../packages/ui/src/date-picker/date-picker";

it("does not repeatedly traverse a complete year for each time suggestion", () => {
  let matched = 0;
  render(<DatePicker aria-label="年度时段" defaultOpen mode="range" showTime
    defaultValue={{ from: new Date(2026, 0, 1, 9), to: new Date(2026, 11, 31, 18) }}
    disabledDates={() => { matched++; return false; }} />);
  console.info("Matcher invocations across one year:", matched);
  expect(matched).toBeLessThan(5000);
});

it("chooses an enabled day when today is disabled and there is no selected value", async () => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(2026, 9, 12, 9));
  try {
    render(<DatePicker aria-label="日期" defaultOpen defaultMonth={new Date(2026, 9)} disabledDates={new Date(2026, 9, 12)} />);
    await waitFor(() => expect(document.activeElement?.getAttribute("data-day")).toBeTruthy());
    expect(document.activeElement).not.toHaveAttribute("disabled");
    expect(document.activeElement).not.toBe(screen.getByRole("heading", { name: "选择日期" }));
  } finally { vi.useRealTimers(); }
});

it("compares a date-only range preset at local-day granularity", () => {
  render(<DatePicker aria-label="按日范围" defaultOpen mode="range" presets={[{
    label: "同一天", getValue: () => ({ from: new Date(2026, 9, 12, 18), to: new Date(2026, 9, 12, 9) }),
  }]} />);
  expect(screen.getByRole("button", { name: "同一天", exact: true })).toBeEnabled();
});
