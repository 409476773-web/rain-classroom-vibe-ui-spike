import { createRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { TagSelect, type TagSelectProps } from "./tag-select";

const options = [
  { value: 0, label: "课前", color: "purple" as const },
  { value: "locked", label: "暂不可选", color: "slate" as const, disabled: true },
  { value: "", label: "课中", color: "paper" as const },
  { value: 1, label: "数字一", color: "gold" as const },
  { value: "1", label: "文字一", color: "assignment" as const },
];
const trigger = () => screen.getByRole("combobox", { name: "学习环节" });
async function openMenu(user: ReturnType<typeof userEvent.setup>) { await user.click(trigger()); await screen.findByRole("listbox"); }

it("preserves typed identities, reselects without notifying, and closes after a new choice", async () => {
  const user = userEvent.setup(), changed = vi.fn(), ref = createRef<HTMLButtonElement>();
  render(<TagSelect ref={ref} aria-label="学习环节" options={options} defaultValue={0} onValueChange={changed} />);
  expect(ref.current).toBe(trigger());
  expect(trigger()).toHaveTextContent("课前");
  await openMenu(user);
  await user.click(screen.getByRole("option", { name: "课前" }));
  expect(changed).not.toHaveBeenCalled();
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
  for (const [label, value] of [["课中", ""], ["数字一", 1], ["文字一", "1"]] as const) {
    await openMenu(user);
    await user.click(screen.getByRole("option", { name: label }));
    expect(changed).toHaveBeenLastCalledWith(value);
    await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
    expect(trigger()).toHaveTextContent(label);
  }
  expect(changed).toHaveBeenCalledTimes(3);
});

it("keeps controlled selection and open as independent axes", async () => {
  const user = userEvent.setup(), changed = vi.fn(), opened = vi.fn();
  const { rerender } = render(<TagSelect aria-label="学习环节" options={options} value={0} onValueChange={changed} />);
  await openMenu(user); await user.click(screen.getByRole("option", { name: "课中" }));
  expect(changed).toHaveBeenCalledExactlyOnceWith("");
  expect(trigger()).toHaveTextContent("课前");
  rerender(<TagSelect aria-label="学习环节" options={options} value="" onValueChange={changed} />);
  expect(trigger()).toHaveTextContent("课中");
  const other = render(<TagSelect aria-label="固定展开" options={options} defaultValue={0} open onOpenChange={opened} />);
  await user.click(await screen.findByRole("option", { name: "课中" }));
  expect(opened).toHaveBeenCalledWith(false);
  expect(screen.getByRole("combobox", { name: "固定展开" })).toHaveTextContent("课中");
  expect(screen.getByRole("combobox", { name: "固定展开" })).toHaveAttribute("aria-expanded", "true");
  other.unmount();
});

it("skips disabled choices and suppresses composing Enter before Base UI handles it", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<TagSelect aria-label="学习环节" options={options} defaultValue={0} onValueChange={changed} />);
  trigger().focus();
  fireEvent.keyDown(trigger(), { key: "Enter", isComposing: true });
  expect(trigger()).toHaveAttribute("aria-expanded", "false");
  await user.keyboard("{ArrowDown}");
  const blocked = await screen.findByRole("option", { name: "暂不可选" });
  expect(blocked).toHaveAttribute("aria-disabled", "true");
  fireEvent.click(blocked);
  expect(changed).not.toHaveBeenCalled();
  fireEvent.keyDown(screen.getByRole("listbox"), { key: "Enter", keyCode: 229 });
  expect(changed).not.toHaveBeenCalled();
  await user.keyboard("{Escape}");
  await waitFor(() => expect(trigger()).toHaveFocus());
});

it("retains the complete Tag geometry and inherits a nested theme in the portal", async () => {
  const user = userEvent.setup();
  const { rerender } = render(<div data-rain-theme="dark"><TagSelect aria-label="学习环节" options={options} defaultValue={0} size={28} appearance="solid" /></div>);
  expect(trigger()).toHaveAttribute("data-size", "28");
  expect(trigger()).toHaveClass("bg-rain-category-fill-tagpurple-solid-1", "font-rain-bold", "px-rain-12");
  await openMenu(user);
  expect(screen.getByRole("listbox").closest("[data-rain-theme]")).toHaveAttribute("data-rain-theme", "dark");
  rerender(<div data-rain-theme="light"><TagSelect aria-label="学习环节" options={options} defaultValue={0} size={28} appearance="solid" /></div>);
  await waitFor(() => expect(screen.getByRole("listbox").closest("[data-rain-theme]")).toHaveAttribute("data-rain-theme", "light"));
});

it("does not open a disabled TagSelect", async () => {
  const user = userEvent.setup();
  render(<TagSelect aria-label="学习环节" options={options} defaultValue={0} disabled defaultOpen />);
  expect(trigger()).toBeDisabled();
  await user.click(trigger());
  expect(screen.queryByRole("listbox")).toBeNull();
});

it("skips disabled rows in both arrow directions while keeping them visible", async () => {
  const user = userEvent.setup();
  render(<TagSelect aria-label="学习环节" options={options} defaultValue={0} />);
  trigger().focus(); await user.keyboard("{ArrowDown}"); await screen.findByRole("listbox");
  await user.keyboard("{Home}{ArrowDown}");
  expect(screen.getByRole("option", { name: "课中" })).toHaveFocus();
  expect(screen.getByRole("option", { name: "暂不可选" })).not.toHaveAttribute("data-highlighted");
  await user.keyboard("{ArrowUp}");
  expect(screen.getByRole("option", { name: "课前" })).toHaveFocus();
});

it.each(["disable", "remove", "all-disabled"])("restores keyboard focus when an open option becomes unavailable: %s", async (change) => {
  const user = userEvent.setup();
  const view = render(<TagSelect aria-label="学习环节" options={options} defaultValue={0} />);
  trigger().focus(); await user.keyboard("{ArrowDown}"); await screen.findByRole("listbox");
  await user.keyboard("{Home}{ArrowDown}");
  expect(screen.getByRole("option", { name: "课中" })).toHaveFocus();
  const next = change === "remove" ? options.filter((option) => option.value !== "")
    : options.map((option) => ({ ...option, disabled: change === "all-disabled" || option.value === "" || option.disabled }));
  view.rerender(<TagSelect aria-label="学习环节" options={next} defaultValue={0} />);
  await waitFor(() => expect(document.activeElement).not.toBe(document.body));
  if (change === "all-disabled") expect(trigger()).toHaveFocus();
  else {
    expect(screen.getByRole("option", { name: "课前" })).toHaveFocus();
    await user.keyboard("{ArrowDown}{Enter}");
    await waitFor(() => expect(trigger()).toHaveTextContent("数字一"));
  }
  await user.keyboard("{Escape}");
  await waitFor(() => expect(trigger()).toHaveFocus());
});

it.each([
  { defaultValue: "missing" }, { defaultValue: null }, { defaultValue: undefined },
  { defaultValue: NaN }, { defaultValue: Infinity }, { value: 0, defaultValue: 0, onValueChange: () => {} },
  { value: 0 }, { defaultValue: 0, open: true }, { defaultValue: 0, open: true, defaultOpen: false, onOpenChange: () => {} },
  { defaultValue: 0, options: [...options, options[0]] },
  { defaultValue: 0, options: [{ ...options[0], label: " " }] },
  { defaultValue: 0, options: [{ ...options[0], color: "not-a-color" }] },
  { defaultValue: 0, "aria-label": "" },
])("rejects an invalid contract instead of silently substituting a selection: %j", (override) => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  try { expect(() => render(<TagSelect {...{ "aria-label": "学习环节", options, ...override } as TagSelectProps} />)).toThrow(/TagSelect|Tag requires/); }
  finally { error.mockRestore(); }
});

it("rejects mode switching and an uncontrolled current value removed from the finite options", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  const view = render(<TagSelect aria-label="学习环节" options={options} defaultValue={0} />);
  try { expect(() => view.rerender(<TagSelect aria-label="学习环节" options={options.slice(1)} defaultValue={0} />)).toThrow(/TagSelect/); }
  finally { error.mockRestore(); }
});
