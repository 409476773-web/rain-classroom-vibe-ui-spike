import { useState } from "react";
import { createEvent, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { CalendarOverlayContext } from "../calendar/calendar";
import { FormItem } from "../input/form-item";
import { TimeField, type TimeFieldProps, type TimeText } from "./date-picker-time-field";

function Harness(props: Partial<TimeFieldProps> & { initial?: TimeText }) {
  const [value, setValue] = useState(props.initial ?? { hour: "09", minute: "05" });
  return <TimeField label="结束" {...props} value={value} onValueChange={next => { setValue(next); props.onValueChange?.(next); }} />;
}
const hour = () => screen.getByRole("textbox", { name: "结束小时" });
const minute = () => screen.getByRole("textbox", { name: "结束分钟" });

it("keeps raw time text during editing and only pads valid segments on blur", () => {
  render(<Harness />);
  fireEvent.change(hour(), { target: { value: "9" } });
  fireEvent.change(minute(), { target: { value: "5" } });
  expect(hour()).toHaveValue("9"); expect(minute()).toHaveValue("5");
  fireEvent.blur(hour()); fireEvent.blur(minute());
  expect(hour()).toHaveValue("09"); expect(minute()).toHaveValue("05");
  fireEvent.change(hour(), { target: { value: "25" } }); fireEvent.blur(hour());
  fireEvent.change(minute(), { target: { value: "" } }); fireEvent.blur(minute());
  expect(hour()).toHaveValue("25"); expect(minute()).toHaveValue("");
});

it("pastes a complete time atomically and preserves malformed pasted text", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<Harness onValueChange={changed} />);
  await user.click(minute());
  await user.paste("23:59");
  expect(hour()).toHaveValue("23"); expect(minute()).toHaveValue("59");
  expect(changed).toHaveBeenCalledExactlyOnceWith({ hour: "23", minute: "59" });
  await user.click(hour()); await user.keyboard("{Control>}a{/Control}");
  await user.paste("25:00");
  expect(hour()).toHaveValue("25:00"); expect(minute()).toHaveValue("59");
  fireEvent.blur(hour()); expect(hour()).toHaveValue("25:00");
});

it("adjusts a valid segment with arrows without wrapping, touching the other segment or repairing invalid input", () => {
  render(<Harness initial={{ hour: "23", minute: "00" }} />);
  fireEvent.keyDown(hour(), { key: "ArrowUp" }); expect(hour()).toHaveValue("23");
  fireEvent.keyDown(minute(), { key: "ArrowDown" }); expect(minute()).toHaveValue("00");
  fireEvent.keyDown(hour(), { key: "ArrowDown" }); expect(hour()).toHaveValue("22");
  expect(minute()).toHaveValue("00");
  fireEvent.change(hour(), { target: { value: "25" } });
  fireEvent.keyDown(hour(), { key: "ArrowDown" }); expect(hour()).toHaveValue("25");
});

it("does not normalize composition text or let Enter reach the parent form", () => {
  const parentEnter = vi.fn(), blur = vi.fn();
  render(<form onKeyDown={parentEnter}><Harness onBlur={blur} /></form>);
  fireEvent.compositionStart(hour());
  fireEvent.change(hour(), { target: { value: "9" } });
  const composingEnter = createEvent.keyDown(hour(), { key: "Enter", isComposing: true, keyCode: 229 });
  fireEvent(hour(), composingEnter);
  expect(composingEnter.defaultPrevented).toBe(false);
  fireEvent.blur(hour());
  expect(hour()).toHaveValue("9"); expect(blur).not.toHaveBeenCalled();
  fireEvent.compositionEnd(hour());
  fireEvent.keyDown(hour(), { key: "Enter" });
  expect(hour()).toHaveValue("09"); expect(blur).toHaveBeenCalledOnce();
  expect(parentEnter).not.toHaveBeenCalled();
});

it("suspends parsed suggestions while composing and reports composition boundaries", () => {
  const compositionChanged = vi.fn();
  render(<Harness onCompositionChange={compositionChanged} />);
  const suggestions = screen.getByRole("combobox", { name: "结束常用时间" });
  expect(suggestions).toHaveTextContent("09:05");
  fireEvent.compositionStart(hour());
  expect(compositionChanged).toHaveBeenLastCalledWith(true);
  fireEvent.change(hour(), { target: { value: "9" } });
  expect(hour()).toHaveValue("9");
  expect(suggestions).toHaveTextContent("常用时间");
  expect(suggestions).not.toHaveTextContent("09:05");
  expect(suggestions).toBeDisabled();
  fireEvent.compositionEnd(hour());
  expect(compositionChanged).toHaveBeenLastCalledWith(false);
  expect(compositionChanged).toHaveBeenCalledTimes(2);
  expect(suggestions).toHaveTextContent("09:05");
  expect(suggestions).not.toBeDisabled();
});

it("keeps error descriptions and internal IDs separate from the surrounding field", () => {
  render(<FormItem id="outer-time" label="开放窗口" help="外层说明"><Harness error="分钟不完整" /></FormItem>);
  expect(hour()).toHaveAccessibleDescription("分钟不完整");
  expect(minute()).toHaveAccessibleDescription("分钟不完整");
  expect(hour()).toHaveAttribute("aria-invalid", "true");
  expect(hour().id).not.toBe(minute().id);
  expect(hour().id).not.toBe("outer-time");
  expect(screen.getByRole("group", { name: "结束时间" })).toHaveClass("rain-date-picker__time");
});

it("offers stepped suggestions and 23:59, blocks forbidden options and notifies the parent overlay", async () => {
  const user = userEvent.setup(), overlay = vi.fn();
  render(<CalendarOverlayContext.Provider value={overlay}><Harness
    suggestionDisabled={time => time.hour < 9} suggestionReason={time => time.hour < 9 ? "开放前不可选" : undefined}
  /></CalendarOverlayContext.Provider>);
  await user.click(screen.getByRole("combobox", { name: "结束常用时间" }));
  await screen.findByRole("option", { name: "09:15" });
  expect(overlay).toHaveBeenCalledWith(true);
  expect(screen.getByRole("option", { name: /00:00/ })).toHaveAttribute("aria-disabled", "true");
  expect(screen.getByRole("option", { name: /00:00/ })).toHaveTextContent("开放前不可选");
  expect(screen.queryByRole("option", { name: /^09:05$/ })).not.toBeInTheDocument();
  expect(screen.getByRole("option", { name: "09:15" })).toBeInTheDocument();
  await user.click(screen.getByRole("option", { name: "23:59" }));
  expect(hour()).toHaveValue("23"); expect(minute()).toHaveValue("59");
  await waitFor(() => expect(overlay).toHaveBeenLastCalledWith(false));
});

it.each([5, 30] as const)("supports a %i minute suggestion interval", async step => {
  const user = userEvent.setup();
  render(<Harness step={step} />);
  await user.click(screen.getByRole("combobox", { name: "结束常用时间" }));
  expect(await screen.findByRole("option", { name: step === 5 ? "09:05" : "09:30" })).toBeInTheDocument();
  expect(screen.getAllByRole("option")).toHaveLength(1440 / step + 1);
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
});

it("disables all time controls and rejects unsupported steps", () => {
  const view = render(<Harness disabled />);
  expect(hour()).toBeDisabled(); expect(minute()).toBeDisabled();
  expect(screen.getByRole("combobox", { name: "结束常用时间" })).toBeDisabled();
  view.unmount();
  for (const step of [0, 7, Number.NaN, Infinity]) {
    expect(() => render(<Harness step={step as 15} />)).toThrow(/step/);
  }
});
