import { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as UI from "../index";

describe("Switch", () => {
  it("is a named native switch with controlled and uncontrolled state", async () => {
    expect(UI.Switch, "Switch must be a public native control").toBeDefined();
    const user = userEvent.setup();
    const change = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    const { rerender } = render(<UI.Switch aria-label="接收通知" ref={ref} onCheckedChange={change} />);
    const control = screen.getByRole("switch", { name: "接收通知" });

    expect(control).toHaveAttribute("type", "button");
    expect(control).toHaveAttribute("aria-checked", "false");
    expect(ref.current).toBe(control);
    await user.click(control);
    expect(control).toHaveAttribute("aria-checked", "true");
    expect(change.mock.calls.map(([checked]) => checked)).toEqual([true]);

    rerender(<UI.Switch aria-label="接收通知" checked={false} onCheckedChange={change} />);
    await user.keyboard(" ");
    expect(screen.getByRole("switch", { name: "接收通知" })).toHaveAttribute("aria-checked", "false");
    expect(change.mock.calls.map(([checked]) => checked)).toEqual([true, true]);
  });

  it("supports Enter and Space while preserving the switch role", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(<UI.Switch aria-label="自动发布" onCheckedChange={change} />);
    const control = screen.getByRole("switch", { name: "自动发布" });
    control.focus();
    await user.keyboard("{Enter} ");
    expect(change.mock.calls.map(([checked]) => checked)).toEqual([true, false]);
    expect(control).toHaveAttribute("role", "switch");
  });

  it("keeps the switch role and lets public click cancellation stop toggling", async () => {
    const change = vi.fn();
    // @ts-expect-error Switch owns its semantic role.
    render(<UI.Switch aria-label="锁定" role="button" aria-pressed onClick={(event) => event.preventDefault()} onCheckedChange={change} />);
    const control = screen.getByRole("switch", { name: "锁定" });
    expect(control).not.toHaveAttribute("aria-pressed");
    await userEvent.click(control);
    expect(control).toHaveAttribute("aria-checked", "false");
    expect(change).not.toHaveBeenCalled();
  });

  it("uses an external label and submits through the owning form", async () => {
    render(
      <form aria-label="通知设置">
        <label htmlFor="email-notice">邮件通知</label>
        <UI.Switch id="email-notice" name="email" value="enabled" defaultChecked required />
      </form>,
    );
    const control = screen.getByRole("switch", { name: "邮件通知" });
    const form = screen.getByRole("form") as HTMLFormElement;
    expect(control).toHaveAttribute("aria-required", "true");
    expect(new FormData(form).getAll("email")).toEqual(["enabled"]);

    await userEvent.click(control);
    expect(new FormData(form).has("email")).toBe(false);
  });

  it("follows an external form owner through the form prop", async () => {
    render(
      <>
        <form id="external-switch-form" aria-label="外部表单" />
        <UI.Switch aria-label="外部设置" name="external" value="on" form="external-switch-form" defaultChecked />
      </>,
    );
    const form = screen.getByRole("form") as HTMLFormElement;
    expect(new FormData(form).getAll("external")).toEqual(["on"]);
    await userEvent.click(screen.getByRole("switch", { name: "外部设置" }));
    expect(new FormData(form).has("external")).toBe(false);
  });

  it("restores the default value on form reset without notifying the owner", async () => {
    const change = vi.fn();
    render(
      <form aria-label="默认设置">
        <UI.Switch aria-label="课堂提醒" name="class" defaultChecked onCheckedChange={change} />
      </form>,
    );
    const control = screen.getByRole("switch", { name: "课堂提醒" });
    const form = screen.getByRole("form") as HTMLFormElement;
    await userEvent.click(control);
    expect(control).toHaveAttribute("aria-checked", "false");
    await act(async () => { form.reset(); });
    expect(control).toHaveAttribute("aria-checked", "true");
    expect(change.mock.calls.map(([checked]) => checked)).toEqual([false]);
  });

  it("keeps disabled native and loading focusable, with disabled winning when combined", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const click = vi.fn();
    const { rerender } = render(<UI.Switch aria-label="同步" disabled onCheckedChange={change} />);
    const control = screen.getByRole("switch", { name: "同步" });
    expect(control).toBeDisabled();
    await user.click(control);
    expect(change).not.toHaveBeenCalled();

    rerender(<UI.Switch aria-label="同步" loading onCheckedChange={change} onClick={click} />);
    expect(control).not.toBeDisabled();
    expect(control).toHaveAttribute("aria-disabled", "true");
    expect(control).toHaveAttribute("aria-busy", "true");
    expect(control).toHaveAttribute("data-state", "unchecked");
    expect(control.querySelector('[data-slot="loading-indicator"]')).toBeInTheDocument();
    expect(control.querySelector('[data-icon="icon/button-loading"]')).toBeInTheDocument();
    control.focus();
    await user.keyboard("{Enter}{Space}");
    await user.click(control);
    expect(change).not.toHaveBeenCalled();
    expect(click).not.toHaveBeenCalled();

    rerender(<UI.Switch aria-label="同步" disabled loading onCheckedChange={change} />);
    expect(control).toBeDisabled();
    expect(control).toHaveAttribute("aria-busy", "true");
    expect(control.querySelector('[data-slot="loading-indicator"]')).toBeInTheDocument();
    expect(control.querySelector('[data-icon="icon/button-loading"]')).toBeInTheDocument();
  });

  it.each(["small", "medium", "large"] as const)("exposes the %s size and Rain slots", (size) => {
    render(<UI.Switch aria-label={`${size}开关`} size={size} defaultChecked />);
    const control = screen.getByRole("switch", { name: `${size}开关` });
    expect(control).toHaveAttribute("data-rain-id", "ui-switch");
    expect(control).toHaveAttribute("data-slot", "root");
    expect(control).toHaveAttribute("data-size", size);
    expect(control).toHaveAttribute("data-state", "checked");
    expect(control.querySelector('[data-slot="track"]')).toBeInTheDocument();
    expect(control.querySelector('[data-slot="indicator"]')).toBeInTheDocument();
  });
});
