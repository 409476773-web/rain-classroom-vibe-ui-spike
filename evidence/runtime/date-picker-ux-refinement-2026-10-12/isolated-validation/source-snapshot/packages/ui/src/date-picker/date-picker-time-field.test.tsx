import { useState } from "react";
import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { FormItem } from "../input/form-item";
import { TimeField, type TimeFieldProps, type TimeText } from "./date-picker-time-field";

function Harness(props: Partial<TimeFieldProps> & { initial?: TimeText }) {
  const [value, setValue] = useState(props.initial ?? { hour: "09", minute: "05" });
  return <TimeField label="结束" {...props} value={value} onValueChange={next => { setValue(next); props.onValueChange?.(next); }} />;
}
const time = () => screen.getByRole("textbox", { name: "结束时间" });

it("provides one HH:mm input without duplicate time controls or a suggestion list", () => {
  render(<Harness />);
  expect(screen.getAllByRole("textbox")).toHaveLength(1);
  expect(time()).toHaveValue("09:05");
  expect(time()).toHaveAttribute("placeholder", "HH:mm");
  expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});

it("keeps partial and invalid text untouched and only pads a valid time on blur", () => {
  render(<Harness />);
  fireEvent.change(time(), { target: { value: "9:7" } });
  expect(time()).toHaveValue("9:7");
  fireEvent.blur(time()); expect(time()).toHaveValue("09:07");
  for (const raw of ["25:00", "09:", "09:60", "09:05:30", "9", ""]) {
    fireEvent.change(time(), { target: { value: raw } });
    fireEvent.blur(time());
    expect(time()).toHaveValue(raw);
  }
});

it("accepts character-by-character editing and keeps an entirely cleared draft empty", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<Harness onValueChange={changed} />);
  await user.clear(time());
  expect(time()).toHaveValue("");
  expect(changed).toHaveBeenLastCalledWith({ hour: "", minute: "" });
  await user.type(time(), "9"); expect(time()).toHaveValue("9");
  await user.type(time(), ":"); expect(time()).toHaveValue("9:");
  await user.type(time(), "07"); expect(time()).toHaveValue("9:07");
  expect(changed).toHaveBeenLastCalledWith({ hour: "9", minute: "07" });
  await user.tab(); expect(time()).toHaveValue("09:07");
});

it("reports raw text presence for a lone colon and its deletion", async () => {
  const user = userEvent.setup(), presenceChanged = vi.fn();
  render(<Harness initial={{ hour: "", minute: "" }} onTextPresenceChange={presenceChanged} />);
  await user.type(time(), ":");
  expect(time()).toHaveValue(":");
  expect(presenceChanged).toHaveBeenCalledExactlyOnceWith(true);
  await user.clear(time());
  expect(time()).toHaveValue("");
  expect(presenceChanged).toHaveBeenLastCalledWith(false);
  expect(presenceChanged).toHaveBeenCalledTimes(2);
});

it("pastes a complete time atomically and preserves malformed pasted text", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<Harness onValueChange={changed} />);
  await user.click(time()); await user.keyboard("{Control>}a{/Control}");
  await user.paste("23:59");
  expect(time()).toHaveValue("23:59");
  expect(changed).toHaveBeenCalledExactlyOnceWith({ hour: "23", minute: "59" });
  await user.keyboard("{Control>}a{/Control}"); await user.paste("25:00");
  fireEvent.blur(time()); expect(time()).toHaveValue("25:00");
});

it("adjusts by one minute across hours without wrapping the day or repairing invalid input", () => {
  render(<Harness initial={{ hour: "09", minute: "59" }} />);
  fireEvent.keyDown(time(), { key: "ArrowUp" }); expect(time()).toHaveValue("10:00");
  fireEvent.keyDown(time(), { key: "ArrowDown" }); expect(time()).toHaveValue("09:59");
  fireEvent.change(time(), { target: { value: "23:59" } });
  fireEvent.keyDown(time(), { key: "ArrowUp" }); expect(time()).toHaveValue("23:59");
  fireEvent.change(time(), { target: { value: "00:00" } });
  fireEvent.keyDown(time(), { key: "ArrowDown" }); expect(time()).toHaveValue("00:00");
  fireEvent.change(time(), { target: { value: "25:00" } });
  fireEvent.keyDown(time(), { key: "ArrowDown" }); expect(time()).toHaveValue("25:00");
});

it.each([5, 15, 30] as const)("retains step %i compatibility while allowing every minute", step => {
  render(<Harness step={step} initial={{ hour: "09", minute: "07" }} />);
  expect(time()).toHaveValue("09:07");
  fireEvent.keyDown(time(), { key: "ArrowUp" }); expect(time()).toHaveValue("09:08");
  expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
});

it("preserves composition text and prevents ordinary Enter from submitting the parent form", () => {
  const parentEnter = vi.fn(), blur = vi.fn(), compositionChanged = vi.fn(), changed = vi.fn();
  render(<form onKeyDown={parentEnter}><Harness onBlur={blur} onCompositionChange={compositionChanged} onValueChange={changed} /></form>);
  fireEvent.compositionStart(time());
  fireEvent.change(time(), { target: { value: "9:7" } });
  const composingEnter = createEvent.keyDown(time(), { key: "Enter", isComposing: true, keyCode: 229 });
  fireEvent(time(), composingEnter);
  expect(composingEnter.defaultPrevented).toBe(false);
  expect(parentEnter).not.toHaveBeenCalled();
  fireEvent.keyDown(time(), { key: "ArrowUp", isComposing: true });
  fireEvent.blur(time());
  expect(time()).toHaveValue("9:7"); expect(blur).not.toHaveBeenCalled();
  expect(compositionChanged).toHaveBeenLastCalledWith(true);
  fireEvent.compositionEnd(time(), { target: { value: "9:8" } });
  expect(changed).toHaveBeenLastCalledWith({ hour: "9", minute: "8" });
  expect(time()).toHaveValue("9:8");
  expect(compositionChanged).toHaveBeenLastCalledWith(false);
  expect(compositionChanged).toHaveBeenCalledTimes(2);
  parentEnter.mockClear();
  const enter = createEvent.keyDown(time(), { key: "Enter" });
  fireEvent(time(), enter);
  expect(enter.defaultPrevented).toBe(true);
  expect(time()).toHaveValue("09:08"); expect(blur).toHaveBeenCalledOnce();
  expect(parentEnter).not.toHaveBeenCalled();
});

it("links to the parent error once and isolates its ID from a surrounding FormItem", () => {
  render(<><FormItem id="outer-time" label="开放窗口" help="外层说明">
    <Harness error="分钟不完整" errorId="parent-time-error" />
  </FormItem>
    <span id="parent-time-error">分钟不完整</span>
  </>);
  expect(time()).toHaveAccessibleDescription("分钟不完整");
  expect(time()).toHaveAttribute("aria-invalid", "true");
  expect(time().id).not.toBe("outer-time");
  expect(screen.getAllByText("分钟不完整")).toHaveLength(1);
});

it("updates external preset values and clears even a lone-colon draft with empty time segments", () => {
  const changed = vi.fn();
  function ExternalResetHarness() {
    const [value, setValue] = useState({ hour: "09", minute: "05" });
    return <>
      <TimeField label="结束" value={value} onValueChange={next => { setValue(next); changed(next); }} />
      <button type="button" onClick={() => setValue({ hour: "23", minute: "59" })}>恢复外部时间</button>
      <button type="button" onClick={() => setValue({ hour: "", minute: "" })}>外部清空</button>
    </>;
  }
  render(<ExternalResetHarness />);
  fireEvent.click(screen.getByRole("button", { name: "恢复外部时间" }));
  expect(time()).toHaveValue("23:59");
  fireEvent.click(screen.getByRole("button", { name: "外部清空" }));
  expect(time()).toHaveValue("");
  expect(changed).not.toHaveBeenCalled();
  fireEvent.change(time(), { target: { value: ":" } });
  expect(time()).toHaveValue(":");
  expect(changed).toHaveBeenLastCalledWith({ hour: "", minute: "" });
  fireEvent.click(screen.getByRole("button", { name: "外部清空" }));
  expect(time()).toHaveValue("");
  fireEvent.click(screen.getByRole("button", { name: "恢复外部时间" }));
  expect(time()).toHaveValue("23:59");
  expect(changed).toHaveBeenCalledOnce();
});

it("disables the input and rejects unsupported compatibility steps", () => {
  const changed = vi.fn(), view = render(<Harness disabled onValueChange={changed} />);
  expect(time()).toBeDisabled();
  fireEvent.keyDown(time(), { key: "ArrowUp" });
  fireEvent.blur(time());
  expect(changed).not.toHaveBeenCalled();
  view.unmount();
  for (const step of [0, 7, Number.NaN, Infinity]) {
    expect(() => render(<Harness step={step as 15} />)).toThrow(/step/);
  }
});
