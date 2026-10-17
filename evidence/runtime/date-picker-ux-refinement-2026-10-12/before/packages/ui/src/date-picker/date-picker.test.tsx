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
  expect(screen.queryByText("点击确定后生效")).not.toBeInTheDocument();
  expect(screen.getByRole("dialog")).not.toHaveAttribute("aria-describedby");
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
  fireEvent.change(screen.getByRole("textbox", { name: "结束小时" }), { target: { value: "8" } });
  expect(confirm()).toBeDisabled();
  expect(screen.getByRole("status", { name: "日期选择提示" })).toHaveTextContent("结束时间不能早于开始时间");
  fireEvent.change(screen.getByRole("textbox", { name: "结束小时" }), { target: { value: "25" } });
  expect(confirm()).toBeDisabled();
  fireEvent.change(screen.getByRole("textbox", { name: "结束小时" }), { target: { value: "11" } });
  await user.click(confirm());
  expect(changed).toHaveBeenCalledExactlyOnceWith({ from: new Date(2026, 9, 12, 9, 5), to: new Date(2026, 9, 12, 11, 0) });
});

it("isolates nested field IDs and closes a month Select before the picker on Escape", async () => {
  const user = userEvent.setup();
  render(<FormItem label="上课时间" id="lesson-date" help="选择上课日期"><DatePicker showTime defaultValue={new Date(2026, 9, 12)} /></FormItem>);
  const trigger = screen.getByRole("button", { name: "上课时间" });
  await user.click(trigger);
  expect(document.querySelectorAll('[id="lesson-date"]')).toHaveLength(1);
  expect(trigger).toHaveAccessibleDescription("选择上课日期 2026-10-12 00:00");
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
  fireEvent.change(screen.getByRole("textbox", { name: "日期分钟" }), { target: { value: "4" } });
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
  fireEvent.change(screen.getByRole("textbox", { name: "日期小时" }), { target: { value: "-" } });
  expect(confirm()).toBeDisabled();
  await user.click(screen.getByRole("button", { name: "清空" }));
  await user.click(day(13));
  expect(screen.getByRole("textbox", { name: "日期小时" })).toHaveValue("-");
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
  fireEvent.change(screen.getByRole("textbox", { name: "日期小时" }), { target: { value: "25" } });
  expect(screen.getByRole("dialog").querySelector('[data-slot="summary"]')).toHaveTextContent("2026-10-12 --:--");
  expect(confirm()).toBeDisabled();
});

it("keeps incomplete range guidance neutral and describes the confirmed value", async () => {
  const user = userEvent.setup();
  render(<DatePicker required mode="range" aria-label="窗口" defaultMonth={october} />);
  const trigger = screen.getByRole("button", { name: "窗口" });
  await user.click(trigger);
  expect(screen.getByRole("status", { name: "日期选择提示" })).not.toHaveAttribute("data-invalid", "true");
  await user.click(day(12));
  expect(screen.getByRole("status", { name: "日期选择提示" })).toHaveTextContent("请选择结束日期");
  expect(screen.getByRole("status", { name: "日期选择提示" })).not.toHaveAttribute("data-invalid", "true");
  expect(confirm()).toBeDisabled();
  expect(trigger).toHaveAccessibleDescription("尚未选择日期");
});

it("edits only the active endpoint and retains conflicts without swapping endpoints", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<DatePicker mode="range" showTime aria-label="窗口" defaultValue={{ from: new Date(2026, 9, 12, 9, 5), to: new Date(2026, 9, 14, 10, 30) }} onValueChange={changed} />);
  await user.click(screen.getByRole("button", { name: "窗口" }));
  const end = screen.getByRole("textbox", { name: "结束日期" });
  await user.click(end); await user.click(day(15));
  expect(screen.getByRole("textbox", { name: "开始日期" })).toHaveValue("2026-10-12");
  expect(screen.getByRole("textbox", { name: "开始小时" })).toHaveValue("09");
  expect(screen.getByRole("textbox", { name: "结束小时" })).toHaveValue("10");
  fireEvent.change(screen.getByRole("textbox", { name: "开始日期" }), { target: { value: "2026-10-16" } });
  expect(end).toHaveValue("2026-10-15"); expect(confirm()).toBeDisabled();
  fireEvent.change(screen.getByRole("textbox", { name: "开始日期" }), { target: { value: "2026-10-12" } });
  await user.click(confirm());
  expect(changed).toHaveBeenCalledExactlyOnceWith({ from: new Date(2026, 9, 12, 9, 5), to: new Date(2026, 9, 15, 10, 30) });
});

it("retains invalid date text and locates a valid typed date without undoing navigation", async () => {
  const user = userEvent.setup();
  render(<DatePicker aria-label="日期" defaultValue={new Date(2026, 9, 12)} />);
  await user.click(screen.getByRole("button", { name: "日期" }));
  const input = screen.getByRole("textbox", { name: "日期" });
  fireEvent.change(input, { target: { value: "2026-02-30" } });
  expect(input).toHaveValue("2026-02-30"); expect(confirm()).toBeDisabled();
  expect(screen.getByRole("combobox", { name: "选择月份" })).toHaveTextContent("10月");
  fireEvent.change(input, { target: { value: "2028-02-29" } });
  expect(confirm()).toBeEnabled();
  expect(screen.getByRole("combobox", { name: "选择年份" })).toHaveTextContent("2028年");
  await user.click(screen.getByRole("button", { name: "下个月" }));
  expect(screen.getByRole("combobox", { name: "选择月份" })).toHaveTextContent("3月");
});

it("requires an explicit next-day change and never adds another day on repeated application", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<DatePicker mode="range" showTime minDurationMinutes={1} aria-label="跨日" defaultValue={{ from: new Date(2026, 9, 31, 23), to: new Date(2026, 9, 31, 1) }} onValueChange={changed} />);
  await user.click(screen.getByRole("button", { name: "跨日" }));
  expect(confirm()).toBeDisabled();
  await user.click(screen.getByRole("button", { name: "结束日期改为次日" }));
  expect(screen.getByRole("textbox", { name: "结束日期" })).toHaveValue("2026-11-01");
  expect(screen.getByText(/次日.*2\s*小时/)).toBeVisible();
  await user.click(confirm());
  expect(changed).toHaveBeenCalledExactlyOnceWith({ from: new Date(2026, 9, 31, 23), to: new Date(2026, 10, 1, 1) });
});

it("applies duration once, permits custom recovery and keeps an edited start independent", async () => {
  const user = userEvent.setup();
  render(<DatePicker mode="range" showTime durationPresets={[90]} aria-label="窗口" defaultValue={{ from: new Date(2026, 9, 12, 23), to: new Date(2026, 9, 13, 1) }} />);
  await user.click(screen.getByRole("button", { name: "窗口" }));
  await user.click(screen.getByRole("button", { name: "90分钟" }));
  expect(screen.getByRole("textbox", { name: "结束小时" })).toHaveValue("00");
  expect(screen.getByRole("textbox", { name: "结束分钟" })).toHaveValue("30");
  fireEvent.change(screen.getByRole("textbox", { name: "开始小时" }), { target: { value: "22" } });
  expect(screen.getByRole("textbox", { name: "结束小时" })).toHaveValue("00");
  const custom = screen.getByRole("textbox", { name: "自定义时长（分钟）" });
  fireEvent.change(custom, { target: { value: "-2" } });
  expect(screen.getByRole("button", { name: "应用时长" })).toBeDisabled();
  fireEvent.change(custom, { target: { value: "120" } });
  await user.click(screen.getByRole("button", { name: "应用时长" }));
  expect(screen.getByRole("textbox", { name: "结束日期" })).toHaveValue("2026-10-13");
  expect(screen.getByRole("textbox", { name: "结束小时" })).toHaveValue("00");
});

it("uses current constraints for presets, positive windows and disabled-date traversal", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  const value = { from: new Date(2026, 9, 12, 9), to: new Date(2026, 9, 14, 9) };
  const view = render(<DatePicker mode="range" showTime excludeDisabled={false} minDurationMinutes={1} disabledDates={new Date(2026, 9, 13)} defaultValue={value} aria-label="窗口" onValueChange={changed} />);
  await user.click(screen.getByRole("button", { name: "窗口" }));
  expect(confirm()).toBeEnabled();
  fireEvent.change(screen.getByRole("textbox", { name: "结束日期" }), { target: { value: "2026-10-13" } });
  expect(confirm()).toBeDisabled();
  view.rerender(<DatePicker mode="range" showTime minDurationMinutes={1} value={{ from: value.from, to: value.from }} aria-label="窗口" onValueChange={changed} />);
  expect(confirm()).toBeDisabled();
  expect(screen.getByRole("status", { name: "日期选择提示" })).toHaveTextContent("至少1分钟");
});

it("resets endpoint intent after clearing and prevents input Enter from submitting a parent form", async () => {
  const user = userEvent.setup(), submitted = vi.fn(), changed = vi.fn();
  render(<form onSubmit={event => { event.preventDefault(); submitted(); }}><DatePicker mode="range" defaultValue={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 14) }} aria-label="窗口" onValueChange={changed} /></form>);
  await user.click(screen.getByRole("button", { name: "窗口" }));
  await user.click(screen.getByRole("textbox", { name: "结束日期" }));
  await user.click(screen.getByRole("button", { name: "清空" }));
  await user.click(day(15)); await user.click(day(16));
  expect(screen.getByRole("textbox", { name: "开始日期" })).toHaveValue("2026-10-15");
  await user.click(screen.getByRole("textbox", { name: "结束日期" })); await user.keyboard("{Enter}");
  expect(submitted).not.toHaveBeenCalled(); expect(changed).not.toHaveBeenCalled();
  expect(screen.getByRole("dialog")).toBeVisible();
});

it("associates an ordered-window conflict with the endpoint fields", async () => {
  const user = userEvent.setup();
  render(<DatePicker mode="range" showTime aria-label="窗口" defaultValue={{ from: new Date(2026, 9, 12, 23), to: new Date(2026, 9, 12, 1) }} />);
  await user.click(screen.getByRole("button", { name: "窗口" }));
  expect(screen.getByRole("textbox", { name: "结束日期" })).toHaveAccessibleDescription("结束时间不能早于开始时间");
  expect(screen.getByRole("textbox", { name: "结束小时" })).toHaveAccessibleDescription("结束时间不能早于开始时间");
});

it("focuses the selected day or title when all dates are disabled", async () => {
  const user = userEvent.setup();
  const view = render(<DatePicker aria-label="日期" defaultValue={new Date(2026, 9, 12)} />);
  await user.click(screen.getByRole("button", { name: "日期" }));
  await waitFor(() => expect(day(12)).toHaveFocus());
  await user.keyboard("{Escape}");
  view.rerender(<DatePicker required aria-label="日期" disabledDates={true} defaultMonth={october} />);
  await user.click(screen.getByRole("button", { name: "日期" }));
  await waitFor(() => expect(screen.getByRole("heading", { name: "选择日期" })).toHaveFocus());
  expect(confirm()).toBeDisabled();
});

it("gives disabled duration shortcuts a visible and accessible reason", async () => {
  const user = userEvent.setup();
  render(<DatePicker mode="range" showTime maxDurationMinutes={30} durationPresets={[90]} aria-label="窗口" defaultValue={{ from: new Date(2026, 9, 12, 9), to: new Date(2026, 9, 12, 9, 30) }} />);
  await user.click(screen.getByRole("button", { name: "窗口" }));
  const shortcut = screen.getByRole("button", { name: "90分钟" });
  expect(shortcut).toBeDisabled();
  expect(shortcut).toHaveAccessibleDescription("时段长度最多30分钟，请调整结束时间");
  expect(screen.getByText("时段长度最多30分钟，请调整结束时间")).toBeVisible();
});

it("does not parse, navigate or commit complete intermediate text during composition", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<DatePicker showTime aria-label="日期" defaultValue={new Date(2026, 9, 12, 9, 5)} onValueChange={changed} />);
  await user.click(screen.getByRole("button", { name: "日期" }));
  const dateInput = screen.getByRole("textbox", { name: "日期" });
  fireEvent.compositionStart(dateInput);
  fireEvent.change(dateInput, { target: { value: "2028-02-29" } });
  expect(confirm()).toBeDisabled();
  expect(screen.getByRole("combobox", { name: "选择年份" })).toHaveTextContent("2026年");
  const imeEnter = new KeyboardEvent("keydown", { key: "Enter", keyCode: 229, bubbles: true, cancelable: true });
  fireEvent(dateInput, imeEnter);
  expect(imeEnter.defaultPrevented).toBe(false);
  fireEvent.compositionEnd(dateInput);
  expect(confirm()).toBeEnabled();
  expect(screen.getByRole("combobox", { name: "选择年份" })).toHaveTextContent("2028年");
  const hour = screen.getByRole("textbox", { name: "日期小时" });
  fireEvent.compositionStart(hour);
  fireEvent.change(hour, { target: { value: "10" } });
  expect(confirm()).toBeDisabled();
  fireEvent.compositionEnd(hour);
  expect(confirm()).toBeEnabled();
  expect(changed).not.toHaveBeenCalled();
});

it("previews range validity with endpoint times and duration constraints", async () => {
  const user = userEvent.setup();
  render(<DatePicker mode="range" showTime minDurationMinutes={90} aria-label="窗口" defaultValue={{ from: new Date(2026, 9, 12, 23), to: new Date(2026, 9, 13, 1) }} />);
  await user.click(screen.getByRole("button", { name: "窗口" }));
  await user.click(screen.getByRole("textbox", { name: "结束日期" }));
  fireEvent.mouseEnter(day(12));
  expect(day(12).closest("td")).toHaveClass("rain-calendar__preview-invalid");
  fireEvent.change(screen.getByRole("textbox", { name: "开始小时" }), { target: { value: "00" } });
  fireEvent.mouseEnter(day(12));
  expect(day(12).closest("td")).toHaveClass("rain-calendar__preview-invalid");
  fireEvent.mouseEnter(day(13));
  expect(day(13).closest("td")).not.toHaveClass("rain-calendar__preview-invalid");
});

it("waits for custom duration composition to finish without intercepting IME Enter", async () => {
  const user = userEvent.setup();
  render(<DatePicker mode="range" showTime durationPresets={[]} aria-label="窗口" defaultValue={{ from: new Date(2026, 9, 12, 9), to: new Date(2026, 9, 12, 10) }} />);
  await user.click(screen.getByRole("button", { name: "窗口" }));
  const input = screen.getByRole("textbox", { name: "自定义时长（分钟）" });
  fireEvent.compositionStart(input);
  fireEvent.change(input, { target: { value: "120" } });
  expect(screen.getByRole("button", { name: "应用时长" })).toBeDisabled();
  const imeEnter = new KeyboardEvent("keydown", { key: "Enter", keyCode: 229, bubbles: true, cancelable: true });
  fireEvent(input, imeEnter);
  expect(imeEnter.defaultPrevented).toBe(false);
  fireEvent.compositionEnd(input);
  expect(screen.getByRole("button", { name: "应用时长" })).toBeEnabled();
});

it("reuses the day-range disabled check across minute suggestions", () => {
  let matched = 0;
  render(<DatePicker aria-label="年度时段" defaultOpen mode="range" showTime
    defaultValue={{ from: new Date(2026, 0, 1, 9), to: new Date(2026, 11, 31, 18) }}
    disabledDates={() => { matched++; return false; }} />);
  // Calendar cells and endpoint candidates still check their own date; the
  // 365-day interior should not be traversed once per hour/minute suggestion.
  expect(matched).toBeLessThan(3000);
});

it("validates presets at the visible date or minute granularity and commits whole minutes", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  const view = render(<DatePicker aria-label="按日范围" defaultOpen mode="range" onValueChange={changed} presets={[{
    label: "同一天", getValue: () => ({ from: new Date(2026, 9, 12, 18), to: new Date(2026, 9, 12, 9) }),
  }]} />);
  const sameDay = screen.getByRole("button", { name: "同一天" });
  expect(sameDay).toBeEnabled();
  await user.click(sameDay); await user.click(confirm());
  expect(changed).toHaveBeenLastCalledWith({ from: new Date(2026, 9, 12), to: new Date(2026, 9, 12) });
  view.unmount(); changed.mockClear();

  render(<DatePicker aria-label="一分钟范围" defaultOpen mode="range" showTime minDurationMinutes={1} onValueChange={changed} presets={[{
    label: "一分钟", getValue: () => ({ from: new Date(2026, 9, 12, 9, 0, 59), to: new Date(2026, 9, 12, 9, 1) }),
  }]} />);
  const oneMinute = screen.getByRole("button", { name: "一分钟" });
  expect(oneMinute).toBeEnabled();
  await user.click(oneMinute); await user.click(confirm());
  expect(changed).toHaveBeenLastCalledWith({ from: new Date(2026, 9, 12, 9), to: new Date(2026, 9, 12, 9, 1) });
});
