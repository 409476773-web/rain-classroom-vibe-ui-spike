import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { FormItem } from "../input/form-item";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

async function loadInputOTP(): Promise<typeof import("./input-otp")> {
  const path = "./input-otp.tsx";
  return import(/* @vite-ignore */ path);
}
const originalHitTest = Object.getOwnPropertyDescriptor(document, "elementFromPoint");

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
  // jsdom has no hit testing; password-manager detection needs the browser API to exist.
  Object.defineProperty(document, "elementFromPoint", { configurable: true, value: () => null });
});
afterEach(() => {
  vi.unstubAllGlobals();
  if (originalHitTest) Object.defineProperty(document, "elementFromPoint", originalHitTest);
  else Reflect.deleteProperty(document, "elementFromPoint");
});

describe("InputOTP real single input", () => {
  it("binds FormItem labeling, error and descriptions to its actual input/ref", async () => {
    const { InputOTP, InputOTPGroup, InputOTPSlot } = await loadInputOTP();
    const ref = createRef<HTMLInputElement>();
    const { container } = render(<FormItem label="课堂验证码" help="输入4位数字" status="error" message="验证码已过期">
      <InputOTP ref={ref} maxLength={4} name="code"><InputOTPGroup>
        {[0, 1, 2, 3].map(index => <InputOTPSlot key={index} index={index} />)}
      </InputOTPGroup></InputOTP>
    </FormItem>);
    const input = screen.getByRole("textbox", { name: "课堂验证码" });
    expect(ref.current).toBe(input);
    expect(container.querySelectorAll("input")).toHaveLength(1);
    expect(input).toHaveAccessibleDescription("输入4位数字 验证码已过期");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("autocomplete", "one-time-code");
    expect(input).toHaveAttribute("name", "code");
  });

  it("shows engine placeholder characters in visual slots", async () => {
    const { InputOTP, InputOTPGroup, InputOTPSlot } = await loadInputOTP();
    const { container } = render(<InputOTP aria-label="验证码" maxLength={4} placeholder="····"><InputOTPGroup>
      {[0, 1, 2, 3].map(index => <InputOTPSlot key={index} index={index} />)}
    </InputOTPGroup></InputOTP>);
    expect([...container.querySelectorAll('[data-slot="input-otp-slot"]')].map(slot => slot.textContent)).toEqual(["·", "·", "·", "·"]);
  });

  it("preserves native form values and only completes at the requested length", async () => {
    const { InputOTP, InputOTPGroup, InputOTPSlot } = await loadInputOTP();
    const complete = vi.fn();
    const { container } = render(<form><InputOTP aria-label="验证码" name="code" maxLength={4} onComplete={complete}>
      <InputOTPGroup>{[0, 1, 2, 3].map(index => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup>
    </InputOTP></form>);
    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox", { name: "验证码" }), "012");
    expect(complete).not.toHaveBeenCalled();
    await user.keyboard("3");
    expect(complete).toHaveBeenCalledTimes(1);
    expect(new FormData(container.querySelector("form")!).get("code")).toBe("0123");
  });

  it("lets the engine normalize an entire pasted code and reject invalid input", async () => {
    const { InputOTP, InputOTPGroup, InputOTPSlot } = await loadInputOTP();
    render(<InputOTP aria-label="验证码" maxLength={4} pattern="^\d+$" pasteTransformer={text => text.replaceAll("-", "")}>
      <InputOTPGroup>{[0, 1, 2, 3].map(index => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup>
    </InputOTP>);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox", { name: "验证码" });
    await user.click(input);
    await user.paste("01-23");
    expect(input).toHaveValue("0123");
    await user.clear(input);
    await user.type(input, "A7");
    expect(input).toHaveValue("7");
  });

  it("does not accept a controlled value when the host declines the change", async () => {
    const { InputOTP, InputOTPGroup, InputOTPSlot } = await loadInputOTP();
    const change = vi.fn();
    render(<InputOTP aria-label="验证码" value="" onChange={change} maxLength={1}>
      <InputOTPGroup><InputOTPSlot index={0} /></InputOTPGroup>
    </InputOTP>);
    await userEvent.setup().type(screen.getByRole("textbox", { name: "验证码" }), "7");
    expect(change).toHaveBeenCalledWith("7");
    expect(screen.getByRole("textbox", { name: "验证码" })).toHaveValue("");
  });

  it("preserves read-only values and inherits FormItem disabled and required", async () => {
    const { InputOTP, InputOTPGroup, InputOTPSlot } = await loadInputOTP();
    render(<><FormItem label="不可用验证码" disabled required><InputOTP maxLength={1}>
      <InputOTPGroup><InputOTPSlot index={0} /></InputOTPGroup>
    </InputOTP></FormItem><InputOTP aria-label="只读验证码" readOnly value="7" maxLength={1}>
      <InputOTPGroup><InputOTPSlot index={0} /></InputOTPGroup>
    </InputOTP></>);
    expect(screen.getByRole("textbox", { name: "不可用验证码" })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "不可用验证码" })).toBeRequired();
    await userEvent.setup().type(screen.getByRole("textbox", { name: "只读验证码" }), "8");
    expect(screen.getByRole("textbox", { name: "只读验证码" })).toHaveValue("7");
  });

  it("rejects unusable lengths and invalid slot composition clearly", async () => {
    const { InputOTP, InputOTPSlot } = await loadInputOTP();
    for (const maxLength of [0, -1, 1.5, NaN, Infinity]) {
      expect(() => renderToStaticMarkup(<InputOTP maxLength={maxLength}><InputOTPSlot index={0} /></InputOTP>))
        .toThrow("InputOTP maxLength must be a positive safe integer.");
    }
    expect(() => renderToStaticMarkup(<InputOTPSlot index={0} />)).toThrow("InputOTPSlot index must identify a slot inside InputOTP.");
    expect(() => renderToStaticMarkup(<InputOTP maxLength={1}><InputOTPSlot index={1} /></InputOTP>))
      .toThrow("InputOTPSlot index must identify a slot inside InputOTP.");
  });
});
