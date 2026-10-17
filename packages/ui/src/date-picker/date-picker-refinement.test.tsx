import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "./date-picker";

afterEach(cleanup);
const october = new Date(2026, 9, 1);
const day = (n: number) => screen.getAllByRole("button", { name: new RegExp(`2026年10月${n}日`) })[0]!;

it("keeps two-click date ranges available after focusing a date input", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<DatePicker mode="range" defaultMonth={october} aria-label="范围" onValueChange={changed} />);
  await user.click(screen.getByRole("button", { name: "范围" }));
  await user.click(screen.getByRole("textbox", { name: "开始日期" }));
  await user.click(day(12)); await user.click(day(14));
  await user.click(screen.getByRole("button", { name: "确定" }));
  expect(changed).toHaveBeenCalledExactlyOnceWith({ from: new Date(2026, 9, 12), to: new Date(2026, 9, 14) });
});

it("puts endpoint titles inside existing fields and edits a date endpoint once", async () => {
  const user = userEvent.setup();
  render(<DatePicker mode="range" aria-label="范围" defaultValue={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 14) }} />);
  await user.click(screen.getByRole("button", { name: "范围" }));
  expect(screen.getByRole("textbox", { name: "开始日期" }).closest('[data-rain-id="ui-input"]')?.querySelector('[data-label-position="inside"]')).toHaveTextContent("开始");
  await user.click(screen.getByRole("button", { name: "在日历中修改结束日期" }));
  await user.click(day(15));
  expect(screen.getByRole("textbox", { name: "结束日期" })).toHaveValue("2026-10-15");
  await user.click(day(17)); await user.click(day(18));
  expect(screen.getByRole("textbox", { name: "开始日期" })).toHaveValue("2026-10-17");
  expect(screen.getByRole("textbox", { name: "结束日期" })).toHaveValue("2026-10-18");
});

it("keeps timed ranges on one calendar with duration collapsed until requested", async () => {
  const user = userEvent.setup();
  render(<DatePicker mode="range" showTime durationPresets={[30, 60]} defaultValue={{ from: new Date(2026, 9, 12, 9), to: new Date(2026, 9, 12, 10) }} aria-label="窗口" />);
  await user.click(screen.getByRole("button", { name: "窗口" }));
  expect(screen.getAllByRole("grid")).toHaveLength(1);
  expect(screen.queryByRole("button", { name: "30分钟" })).toBeNull();
  await user.click(screen.getByRole("button", { name: "按时长设置结束" }));
  expect(screen.getByRole("button", { name: "30分钟" })).toBeVisible();
});

it("renders an ordered-window conflict once without marking its date as malformed", async () => {
  const user = userEvent.setup();
  render(<DatePicker mode="range" showTime defaultValue={{ from: new Date(2026, 9, 12, 23), to: new Date(2026, 9, 12, 1) }} aria-label="窗口" />);
  await user.click(screen.getByRole("button", { name: "窗口" }));
  expect(screen.getAllByText("结束时间不能早于开始时间")).toHaveLength(1);
  expect(screen.getByRole("textbox", { name: "结束日期" })).not.toHaveAttribute("aria-invalid", "true");
});

it("validates duration constraints in minutes rather than milliseconds", async () => {
  const user = userEvent.setup();
  render(<DatePicker mode="range" showTime minDurationMinutes={30} defaultValue={{ from: new Date(2026, 9, 12, 9), to: new Date(2026, 9, 12, 9, 15) }} aria-label="窗口" />);
  await user.click(screen.getByRole("button", { name: "窗口" }));
  expect(screen.getByRole("button", { name: "确定" })).toBeDisabled();
  expect(screen.getByRole("status", { name: "日期选择提示" })).toHaveTextContent("至少30分钟");
});

it.each([":", "09:00"])("does not submit null while an optional empty picker still contains time text %s", async text => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<DatePicker showTime aria-label="可选日期" onValueChange={changed} />);
  await user.click(screen.getByRole("button", { name: "可选日期" }));
  fireEvent.change(screen.getByRole("textbox", { name: "日期时间" }), { target: { value: text } });
  expect(screen.getByRole("button", { name: "确定" })).toBeDisabled();
  expect(changed).not.toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: "清空" }));
  expect(screen.getByRole("button", { name: "确定" })).toBeEnabled();
});
