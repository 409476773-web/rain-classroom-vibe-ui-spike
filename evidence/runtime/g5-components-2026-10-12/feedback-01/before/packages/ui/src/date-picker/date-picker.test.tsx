import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { FormItem } from "../input/form-item";
import { DatePicker } from "./date-picker";

const october = new Date(2026, 9, 1);
const day = (date: number) => screen.getAllByRole("button", { name: new RegExp(`^2026年10月${date}日`) })[0]!;
const confirm = () => screen.getByRole("button", { name: "确定" });

it("commits only on Confirm, restores trigger focus, and does not emit unchanged values", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<DatePicker aria-label="上课日期" defaultValue={new Date(2026, 9, 12)} onValueChange={changed} />);
  const trigger = screen.getByRole("button", { name: "上课日期" });
  await user.click(trigger);
  await user.click(day(13));
  expect(changed).not.toHaveBeenCalled();
  expect(trigger).toHaveTextContent("2026-10-12");
  await user.click(confirm());
  expect(changed).toHaveBeenCalledExactlyOnceWith(new Date(2026, 9, 13));
  await waitFor(() => expect(trigger).toHaveFocus());
  await user.click(trigger);
  await user.click(confirm());
  expect(changed).toHaveBeenCalledTimes(1);
});

it("discards selection and draft clearing on Cancel, Escape, and outside click", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<><DatePicker aria-label="日期" defaultValue={new Date(2026, 9, 12)} onValueChange={changed} /><button>外部操作</button></>);
  const trigger = screen.getByRole("button", { name: "日期" });
  await user.click(trigger); await user.click(day(13)); await user.click(screen.getByRole("button", { name: "取消" }));
  await user.click(trigger); await user.click(screen.getByRole("button", { name: "清空" })); await user.keyboard("{Escape}");
  await user.click(trigger); await user.click(day(14)); await user.click(screen.getByRole("button", { name: "外部操作" }));
  expect(screen.getByRole("button", { name: "外部操作" })).toHaveFocus();
  expect(trigger).toHaveTextContent("2026-10-12");
  expect(changed).not.toHaveBeenCalled();
});

it("selects start then end, sorts reverse dates, and starts a fresh range on the third click", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<DatePicker mode="range" aria-label="日期范围" defaultMonth={october} onValueChange={changed} />);
  await user.click(screen.getByRole("button", { name: "日期范围" }));
  await user.click(day(15)); expect(confirm()).toBeDisabled();
  await user.click(day(12)); expect(confirm()).toBeEnabled();
  await user.click(day(20)); expect(confirm()).toBeDisabled();
  await user.click(day(20)); await user.click(confirm());
  expect(changed).toHaveBeenCalledExactlyOnceWith({ from: new Date(2026, 9, 20), to: new Date(2026, 9, 20) });
});

it("rejects a range crossing a disabled day", async () => {
  const user = userEvent.setup();
  render(<DatePicker mode="range" aria-label="日期范围" defaultMonth={october} disabledDates={new Date(2026, 9, 13)} />);
  await user.click(screen.getByRole("button", { name: "日期范围" }));
  await user.click(day(12)); await user.click(day(14));
  expect(confirm()).toBeDisabled();
  expect(screen.getByRole("status", { name: "日期选择提示" })).toHaveTextContent("范围包含不可选日期");
});

it("keeps time as draft, formats two digits, and prevents reverse same-day times", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<DatePicker mode="range" showTime aria-label="上课时间" defaultValue={{ from: new Date(2026, 9, 12, 9, 5), to: new Date(2026, 9, 12, 10, 0) }} onValueChange={changed} />);
  const trigger = screen.getByRole("button", { name: "上课时间" });
  expect(trigger).toHaveTextContent("09:05");
  await user.click(trigger);
  fireEvent.change(screen.getByRole("spinbutton", { name: "结束小时" }), { target: { value: "8" } });
  expect(confirm()).toBeDisabled();
  expect(screen.getByRole("status", { name: "日期选择提示" })).toHaveTextContent("结束时间不能早于开始时间");
  fireEvent.change(screen.getByRole("spinbutton", { name: "结束小时" }), { target: { value: "25" } });
  expect(confirm()).toBeDisabled();
  fireEvent.change(screen.getByRole("spinbutton", { name: "结束小时" }), { target: { value: "11" } });
  await user.click(confirm());
  expect(changed).toHaveBeenCalledExactlyOnceWith({ from: new Date(2026, 9, 12, 9, 5), to: new Date(2026, 9, 12, 11, 0) });
});

it("isolates nested field IDs and closes a month Select before the picker on Escape", async () => {
  const user = userEvent.setup();
  render(<FormItem label="上课时间" id="lesson-date" help="选择上课日期"><DatePicker showTime defaultValue={new Date(2026, 9, 12)} /></FormItem>);
  const trigger = screen.getByRole("button", { name: "上课时间" });
  await user.click(trigger);
  expect(document.querySelectorAll('[id="lesson-date"]')).toHaveLength(1);
  expect(trigger).toHaveAccessibleDescription("选择上课日期");
  await user.click(screen.getByRole("combobox", { name: "选择月份" }));
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("listbox")).toBeNull();
  expect(screen.getByRole("dialog")).toBeVisible();
});

it("keeps controlled values authoritative and resets drafts when a controlled panel reopens", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  const value = new Date(2026, 9, 12);
  const view = render(<DatePicker open value={value} aria-label="日期" onValueChange={changed} />);
  await user.click(day(13));
  view.rerender(<DatePicker open={false} value={value} aria-label="日期" onValueChange={changed} />);
  view.rerender(<DatePicker open value={value} aria-label="日期" onValueChange={changed} />);
  await user.click(confirm());
  expect(changed).not.toHaveBeenCalled();
});

it("commits a reverse-picked range in chronological order", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<DatePicker mode="range" aria-label="范围" defaultMonth={october} onValueChange={changed} />);
  await user.click(screen.getByRole("button", { name: "范围" }));
  await user.click(day(15)); await user.click(day(12)); await user.click(confirm());
  expect(changed).toHaveBeenCalledExactlyOnceWith({ from: new Date(2026, 9, 12), to: new Date(2026, 9, 15) });
});

it("validates minute bounds on selectable boundary days and permits clearing optional values", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<DatePicker showTime aria-label="时间" defaultValue={new Date(2026, 9, 12, 9, 5)} minDate={new Date(2026, 9, 12, 9, 5)} maxDate={new Date(2026, 9, 12, 10, 30)} onValueChange={changed} />);
  await user.click(screen.getByRole("button", { name: "时间" }));
  expect(day(12)).toBeEnabled();
  fireEvent.change(screen.getByRole("spinbutton", { name: "日期分钟" }), { target: { value: "4" } });
  expect(confirm()).toBeDisabled();
  expect(screen.getByRole("status", { name: "日期选择提示" })).toHaveTextContent("超出允许范围");
  await user.click(screen.getByRole("button", { name: "清空" }));
  expect(changed).not.toHaveBeenCalled();
  await user.click(confirm());
  expect(changed).toHaveBeenCalledExactlyOnceWith(null);
});

it("retains a partial range through viewport narrowing", async () => {
  const user = userEvent.setup(), changed = vi.fn(), original = window.innerWidth;
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 1000 });
  const view = render(<DatePicker mode="range" aria-label="范围" defaultMonth={october} onValueChange={changed} />);
  await user.click(screen.getByRole("button", { name: "范围" }));
  expect(screen.getAllByRole("grid")).toHaveLength(2);
  await user.click(day(12));
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 375 });
  fireEvent(window, new Event("resize"));
  expect(screen.getAllByRole("grid")).toHaveLength(1);
  await user.click(day(14)); await user.click(confirm());
  expect(changed).toHaveBeenCalledExactlyOnceWith({ from: new Date(2026, 9, 12), to: new Date(2026, 9, 14) });
  view.unmount(); Object.defineProperty(window, "innerWidth", { configurable: true, value: original });
});

it("does not submit required empty dates, or open a disabled/read-only picker", async () => {
  const user = userEvent.setup();
  const view = render(<DatePicker required aria-label="日期" defaultMonth={october} />);
  await user.click(screen.getByRole("button", { name: "日期" }));
  expect(confirm()).toBeDisabled();
  await user.keyboard("{Escape}");
  view.rerender(<DatePicker disabled aria-label="日期" />);
  expect(screen.getByRole("button", { name: "日期" })).toBeDisabled();
  view.rerender(<DatePicker readOnly aria-label="日期" />);
  await user.click(screen.getByRole("button", { name: "日期" }));
  expect(screen.queryByRole("dialog")).toBeNull();
});

it("keeps a controlled open panel unavailable when the field becomes read-only", async () => {
  const view = render(<DatePicker open aria-label="日期" defaultMonth={october} />);
  await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
  view.rerender(<DatePicker open readOnly aria-label="日期" defaultMonth={october} />);
  expect(screen.queryByRole("dialog")).toBeNull();
});

it("keeps the outer panel open when clicking out of a nested year Select", async () => {
  const user = userEvent.setup();
  render(<DatePicker defaultValue={new Date(2026, 9, 12)} aria-label="日期" />);
  await user.click(screen.getByRole("button", { name: "日期" }));
  await user.click(screen.getByRole("combobox", { name: "选择年份" }));
  await user.click(day(13));
  expect(screen.queryByRole("listbox")).toBeNull();
  expect(screen.getByRole("dialog")).toBeVisible();
  expect(day(13)).toHaveAttribute("data-selected-single", "true");
});

it("keeps incomplete time invalid after clearing and choosing another date", async () => {
  const user = userEvent.setup();
  render(<DatePicker showTime defaultValue={new Date(2026, 9, 12, 9, 5)} aria-label="日期" />);
  await user.click(screen.getByRole("button", { name: "日期" }));
  fireEvent.change(screen.getByRole("spinbutton", { name: "日期小时" }), { target: { value: "-" } });
  expect(confirm()).toBeDisabled();
  await user.click(screen.getByRole("button", { name: "清空" }));
  await user.click(day(13));
  expect(screen.getByRole("spinbutton", { name: "日期小时" })).toHaveValue("-");
  expect(confirm()).toBeDisabled();
});

it("shows invalid imported dates without crashing and requires a valid replacement", async () => {
  const user = userEvent.setup();
  render(<DatePicker defaultValue={new Date(NaN)} defaultMonth={october} aria-label="日期" />);
  await user.click(screen.getByRole("button", { name: "日期" }));
  expect(confirm()).toBeDisabled();
  expect(screen.getByRole("status", { name: "日期选择提示" })).toHaveTextContent("日期无效");
  await user.click(day(12));
  expect(confirm()).toBeEnabled();
});

it("rejects invalid date bounds without passing them to the engine", async () => {
  const user = userEvent.setup();
  render(<DatePicker minDate={new Date(NaN)} defaultValue={new Date(2026, 9, 12)} aria-label="日期" />);
  await user.click(screen.getByRole("button", { name: "日期" }));
  expect(confirm()).toBeDisabled();
  expect(screen.getByRole("status", { name: "日期选择提示" })).toHaveTextContent("边界无效");
});

it("connects its appearance, validation and keyboard focus to the shared field frame", () => {
  render(<DatePicker appearance="underlined" status="error" readOnly aria-label="日期" />);
  const control = screen.getByRole("button", { name: "日期" });
  const frame = control.closest(".rain-field-frame");
  expect(frame).toHaveAttribute("data-appearance", "underlined");
  expect(frame).toHaveAttribute("data-status", "error");
  expect(frame).toHaveAttribute("data-permission", "readonly");
  expect(control).toHaveAttribute("data-slot", "control");
  expect(control).not.toHaveAttribute("data-focus");
});

it("does not roll an invalid hour into the next calendar day in the summary", async () => {
  const user = userEvent.setup();
  render(<DatePicker showTime defaultValue={new Date(2026, 9, 12, 9, 5)} aria-label="日期" />);
  await user.click(screen.getByRole("button", { name: "日期" }));
  fireEvent.change(screen.getByRole("spinbutton", { name: "日期小时" }), { target: { value: "25" } });
  expect(screen.getByRole("dialog").querySelector('[data-slot="summary"]')).toHaveTextContent("2026-10-12 --:--");
  expect(confirm()).toBeDisabled();
});
