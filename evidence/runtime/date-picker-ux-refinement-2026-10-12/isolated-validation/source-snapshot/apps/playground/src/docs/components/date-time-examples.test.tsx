import { act, fireEvent, render, renderHook, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { AssignmentSettingsExample, G5ComponentPage } from "./g5-component-pages";
import { homeworkDeadlinePresets, localTimeZoneText, useFutureMinute } from "./date-time-examples";

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(2026, 9, 20, 10, 0, 30));
});
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

it("keeps immediate opening as an intent and saves the explicit assignment deadline locally", () => {
  render(<AssignmentSettingsExample />);
  const form = screen.getByRole("form", { name: "作业发布设置" });
  expect(within(form).getByRole("radio", { name: "立即开放" })).toBeChecked();
  expect(within(form).queryByRole("button", { name: "定时开放时间" })).not.toBeInTheDocument();
  expect(within(form).getByRole("button", { name: "作业截止时间" })).toHaveTextContent("2026-10-21 23:59");
  fireEvent.submit(form);
  expect(within(form).getByRole("status", { name: "作业保存结果" })).toHaveTextContent("设置已保存");
  expect(within(form).getByRole("status", { name: "作业保存结果" })).toHaveTextContent("立即开放");
  expect(within(form).getByRole("status", { name: "作业保存结果" })).toHaveTextContent("2026-10-21 23:59");
});

it("rechecks the current time at save and preserves an expired deadline for repair", () => {
  render(<AssignmentSettingsExample />);
  const form = screen.getByRole("form", { name: "作业发布设置" });
  act(() => { vi.setSystemTime(new Date(2026, 9, 21, 23, 59)); });
  fireEvent.submit(form);
  expect(within(form).getByText("截止时间必须晚于当前时间，请重新选择。")).toBeVisible();
  expect(within(form).getByRole("button", { name: "作业截止时间" })).toHaveTextContent("2026-10-21 23:59");
  expect(within(form).getByRole("status", { name: "作业保存结果" })).not.toHaveTextContent("设置已保存");
});

it("does not let a stale scheduled opening leak into immediate opening validation", () => {
  render(<AssignmentSettingsExample />);
  const form = screen.getByRole("form", { name: "作业发布设置" });
  fireEvent.click(within(form).getByRole("radio", { name: "定时开放" }));
  expect(within(form).getByRole("button", { name: "定时开放时间" })).toHaveTextContent("2026-10-21 09:00");
  act(() => { vi.setSystemTime(new Date(2026, 9, 21, 10)); });
  fireEvent.submit(form);
  expect(within(form).getByText("开放时间已经过去，请重新选择。")).toBeVisible();
  fireEvent.click(within(form).getByRole("radio", { name: "立即开放" }));
  fireEvent.submit(form);
  expect(within(form).getByRole("status", { name: "作业保存结果" })).toHaveTextContent("立即开放");
  expect(within(form).getByRole("status", { name: "作业保存结果" })).toHaveTextContent("设置已保存");
});

it("accepts an opening exactly at save time while keeping the deadline strictly later", () => {
  render(<AssignmentSettingsExample />);
  const form = screen.getByRole("form", { name: "作业发布设置" });
  fireEvent.click(within(form).getByRole("radio", { name: "定时开放" }));
  act(() => { vi.setSystemTime(new Date(2026, 9, 21, 9)); });
  fireEvent.submit(form);
  expect(within(form).getByRole("status", { name: "作业保存结果" })).toHaveTextContent("设置已保存");
});

it("keeps the last confirmed deadline when a cleared panel is cancelled", async () => {
  const user = userEvent.setup();
  render(<AssignmentSettingsExample />);
  const form = screen.getByRole("form", { name: "作业发布设置" });
  const picker = within(form).getByRole("button", { name: "作业截止时间" });
  await user.click(picker);
  await user.click(screen.getByRole("button", { name: "清空" }));
  await user.click(screen.getByRole("button", { name: "取消" }));
  expect(picker).toHaveTextContent("2026-10-21 23:59");
  fireEvent.submit(form);
  expect(within(form).getByRole("status", { name: "作业保存结果" })).toHaveTextContent("2026-10-21 23:59");
});

it("separates the exam window from answer duration and explains a truncated late entry", () => {
  render(<G5ComponentPage component="date-picker" />);
  const form = screen.getByRole("form", { name: "考试开放设置" });
  expect(within(form).getByRole("button", { name: "考试开放窗口" })).toHaveTextContent("2026-10-21 09:00");
  expect(within(form).getByRole("spinbutton", { name: "答题时长" })).toHaveValue("60");
  expect(within(form).getByText("到达关闭时间统一结束。", { exact: false })).toBeVisible();
  expect(within(form).getByLabelText("模拟入场结果")).toHaveTextContent("可答题 30 分钟");
  fireEvent.submit(form);
  expect(within(form).getByRole("status", { name: "考试保存结果" })).toHaveTextContent("答题时长 60 分钟");
});

it("keeps window-duration tools out of the exam date panel", async () => {
  const user = userEvent.setup();
  render(<G5ComponentPage component="date-picker" />);
  const form = screen.getByRole("form", { name: "考试开放设置" });
  await user.click(within(form).getByRole("button", { name: "考试开放窗口" }));
  const panel = screen.getByRole("dialog");
  expect(within(panel).queryByText("按时长设置结束", { exact: true })).not.toBeInTheDocument();
  expect(within(panel).queryByRole("button", { name: "60分钟" })).not.toBeInTheDocument();
  expect(within(form).getByRole("spinbutton", { name: "答题时长" })).toHaveValue("60");
});

it("rejects a now-past exam opening without discarding the selected window", () => {
  render(<G5ComponentPage component="date-picker" />);
  const form = screen.getByRole("form", { name: "考试开放设置" });
  act(() => { vi.setSystemTime(new Date(2026, 9, 21, 9, 0, 1)); });
  fireEvent.submit(form);
  expect(within(form).getByText("开放时间已经过去，请重新选择。")).toBeVisible();
  expect(within(form).getByRole("button", { name: "考试开放窗口" })).toHaveTextContent("2026-10-21 09:00");
  expect(within(form).getByRole("spinbutton", { name: "答题时长" })).toHaveValue("60");
});

it("preserves an answer duration longer than the window and warns about truncation", () => {
  render(<G5ComponentPage component="date-picker" />);
  const form = screen.getByRole("form", { name: "考试开放设置" });
  const duration = within(form).getByRole("spinbutton", { name: "答题时长" });
  fireEvent.change(duration, { target: { value: "150" } });
  expect(within(form).getByText(/答题时长超过开放窗口/)).toBeVisible();
  expect(within(form).getByLabelText("模拟入场结果")).toHaveTextContent("可答题 30 分钟");
  fireEvent.submit(form);
  expect(within(form).getByRole("status", { name: "考试保存结果" })).toHaveTextContent("答题时长 150 分钟");
  expect(duration).toHaveValue("150");
});

it("does not use the previous valid answer duration while its input is incomplete", () => {
  render(<G5ComponentPage component="date-picker" />);
  const form = screen.getByRole("form", { name: "考试开放设置" });
  const duration = within(form).getByRole("spinbutton", { name: "答题时长" });
  fireEvent.change(duration, { target: { value: "-" } });
  expect(within(form).getByLabelText("模拟入场结果")).not.toHaveTextContent("可答题");
  fireEvent.submit(form);
  expect(within(form).getByRole("status", { name: "考试保存结果" })).not.toHaveTextContent("设置已保存");
  expect(duration).toHaveValue("-");
});

it("uses an inclusive opening and exclusive closing in the editable admission simulation", async () => {
  const user = userEvent.setup();
  render(<G5ComponentPage component="date-picker" />);
  const form = screen.getByRole("form", { name: "考试开放设置" });
  const entry = within(form).getByRole("button", { name: "模拟入场时间" });
  for (const [preset, expected] of [
    ["开放前 1 分钟", "尚未开放，不能开始作答。"],
    ["开放时刻", "可答题 1 小时"],
    ["关闭前 30 分钟", "可答题 30 分钟"],
    ["关闭时刻", "考试已关闭，不能开始作答。"],
  ]) {
    await user.click(entry);
    await user.click(screen.getByRole("button", { name: preset }));
    await user.click(screen.getByRole("button", { name: "确定" }));
    expect(within(form).getByLabelText("模拟入场结果")).toHaveTextContent(expected!);
  }
  expect(within(form).getByRole("button", { name: "考试开放窗口" })).toHaveTextContent("2026-10-21 09:00");
});

it("provides a separate editable cross-midnight range with full dates and a local save", () => {
  render(<G5ComponentPage component="date-picker" />);
  const form = screen.getByRole("form", { name: "时间段设置" });
  const picker = within(form).getByRole("button", { name: "活动时间段" });
  expect(picker).toHaveTextContent("2026-10-21 23:00");
  expect(picker).toHaveTextContent("2026-10-22 01:00");
  expect(within(form).getByLabelText("时间段摘要")).toHaveTextContent("次日");
  expect(within(form).getByLabelText("时间段摘要")).toHaveTextContent("2 小时");
  fireEvent.submit(form);
  expect(within(form).getByRole("status", { name: "时间段保存结果" })).toHaveTextContent("时间段已保存");
  expect(within(form).getByRole("status", { name: "时间段保存结果" })).toHaveTextContent("2026-10-22");
});

it("loads complete scenarios outside the picker without saving the form", async () => {
  const user = userEvent.setup();
  render(<G5ComponentPage component="date-picker" />);
  const form = screen.getByRole("form", { name: "时间段设置" });
  const picker = within(form).getByRole("button", { name: "活动时间段" });
  const scenarios = within(form).getByRole("group", { name: "加载示例" });
  fireEvent.submit(form);
  expect(within(form).getByRole("status", { name: "时间段保存结果" })).toHaveTextContent("时间段已保存");
  await user.click(within(scenarios).getByRole("button", { name: "同日 90 分钟" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(picker).toHaveTextContent("2026-10-21 09:00");
  expect(within(form).getByLabelText("时间段摘要")).toHaveTextContent("1 小时 30 分钟");
  expect(within(form).getByRole("status", { name: "时间段保存结果" })).not.toHaveTextContent("时间段已保存");
  await user.click(picker);
  expect(within(screen.getByRole("dialog")).queryByRole("button", { name: "同日 90 分钟" })).not.toBeInTheDocument();
  expect(within(screen.getByRole("dialog")).queryByRole("button", { name: "跨午夜" })).not.toBeInTheDocument();
  expect(within(screen.getByRole("dialog")).queryByRole("button", { name: "跨月时段" })).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "取消" }));
  await user.click(within(scenarios).getByRole("button", { name: "跨月时段" }));
  expect(picker).toHaveTextContent("2026-10-31 23:00 至 2026-11-01 01:00");
  fireEvent.submit(form);
  expect(within(form).getByRole("status", { name: "时间段保存结果" })).toHaveTextContent("2026-11-01 01:00（次日）");
});

it("resolves a loaded scenario at click time and clears the stale validation result", async () => {
  const user = userEvent.setup();
  render(<G5ComponentPage component="date-picker" />);
  const form = screen.getByRole("form", { name: "时间段设置" });
  act(() => { vi.setSystemTime(new Date(2026, 10, 1, 10)); });
  fireEvent.submit(form);
  expect(within(form).getByText("开放时间已经过去，请重新选择。")).toBeVisible();
  await user.click(within(form).getByRole("button", { name: "跨午夜" }));
  expect(within(form).queryByText("开放时间已经过去，请重新选择。")).not.toBeInTheDocument();
  expect(within(form).getByRole("button", { name: "活动时间段" })).toHaveTextContent("2026-11-02 23:00 至 2026-11-03 01:00");
  expect(within(form).getByRole("status", { name: "时间段保存结果" })).not.toHaveTextContent("时间段已保存");
});

it("refreshes an open picker after time advances without silently changing its draft", async () => {
  const user = userEvent.setup();
  render(<AssignmentSettingsExample />);
  await user.click(screen.getByRole("button", { name: "作业截止时间" }));
  fireEvent.change(screen.getByRole("textbox", { name: "日期" }), { target: { value: "2026-10-20" } });
  fireEvent.change(screen.getByRole("textbox", { name: "日期时间" }), { target: { value: "10:00" } });
  expect(screen.getByRole("button", { name: "确定" })).toBeDisabled();
  fireEvent.change(screen.getByRole("textbox", { name: "日期时间" }), { target: { value: "10:01" } });
  expect(screen.getByRole("button", { name: "确定" })).toBeEnabled();
  act(() => {
    vi.setSystemTime(new Date(2026, 9, 20, 10, 1, 1));
    document.dispatchEvent(new Event("visibilitychange"));
  });
  expect(screen.getByRole("button", { name: "确定" })).toBeDisabled();
  expect(screen.getByRole("textbox", { name: "日期时间" })).toHaveValue("10:01");
});

it("advances the minimum on the minute boundary, panel refresh, and foreground resume", () => {
  vi.useFakeTimers();
  const { result } = renderHook(() => useFutureMinute());
  expect(result.current.minimum).toEqual(new Date(2026, 9, 20, 10, 1));
  act(() => { vi.advanceTimersByTime(30_000); });
  expect(result.current.minimum).toEqual(new Date(2026, 9, 20, 10, 2));
  act(() => { vi.setSystemTime(new Date(2026, 9, 20, 12, 15, 30)); result.current.refresh(); });
  expect(result.current.minimum).toEqual(new Date(2026, 9, 20, 12, 16));
  act(() => {
    vi.setSystemTime(new Date(2026, 9, 21, 8, 0, 30));
    document.dispatchEvent(new Event("visibilitychange"));
  });
  expect(result.current.minimum).toEqual(new Date(2026, 9, 21, 8, 1));
});

it("resolves deadline shortcuts from the click time without adding hidden seconds", () => {
  const today = homeworkDeadlinePresets[0]!;
  expect(today.getValue(new Date(2026, 9, 20, 23, 59, 59))).toEqual(new Date(2026, 9, 20, 23, 59));
  expect(today.getValue(new Date(2026, 9, 21))).toEqual(new Date(2026, 9, 21, 23, 59));
});

it("labels UTC honestly instead of always claiming Beijing time", () => {
  const current = Intl.DateTimeFormat().resolvedOptions();
  vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockReturnValue({ ...current, timeZone: "UTC" });
  expect(localTimeZoneText()).toBe("本机时间（UTC）");
});
