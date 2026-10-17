import { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FormItem } from "../input/form-item";
import { InputNumber } from "./input-number";

describe("InputNumber", () => {
  it("preserves out-of-range input and steps towards the range without clamping it", async () => {
    const change = vi.fn();
    render(<FormItem label="满分"><InputNumber min={0} max={100} onValueChange={change} /></FormItem>);
    const input = screen.getByRole("spinbutton", { name: "满分" });
    fireEvent.change(input, { target: { value: "120" } });
    fireEvent.blur(input);
    expect(input).toHaveValue("120");
    expect(change).toHaveBeenLastCalledWith(120);
    expect(input).toBeInvalid();
    expect(screen.getByText("不能超过 100")).toBeInTheDocument();
    expect(input).toHaveAccessibleDescription("不能超过 100");
    expect(screen.getByRole("button", { name: "增加满分" })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "减少满分" }));
    expect(input).toHaveValue("119");
    expect(change).toHaveBeenLastCalledWith(119);
    expect(input).toBeInvalid();
  });

  it.each(["-", ".", "-."])("keeps incomplete %s on blur and blocks native validation instead of submitting the old number", (draft) => {
    const change = vi.fn();
    render(<form aria-label="试卷"><InputNumber aria-label="分数" defaultValue={12} onValueChange={change} /></form>);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: draft } });
    fireEvent.blur(input);
    expect(input).toHaveValue(draft);
    expect(change).not.toHaveBeenCalled();
    expect((screen.getByRole("form") as HTMLFormElement).checkValidity()).toBe(false);
    expect(screen.getByText("请输入完整数字")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "增加分数" })).toBeDisabled();
  });

  it("normalizes a trailing dot on Enter without swallowing form submission", () => {
    const change = vi.fn();
    render(<InputNumber aria-label="分数" defaultValue={12} onValueChange={change} />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "1." } });
    expect(change).toHaveBeenCalledExactlyOnceWith(1);
    expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true);
    expect(input).toHaveValue("1");
    expect(input).toBeValid();
    expect(change).toHaveBeenLastCalledWith(1);
  });

  it("keeps controlled valid formatting, accepts external changes, and rejects unaccepted controlled edits", () => {
    function Controlled() {
      const [value, setValue] = useState<number | null>(1.5);
      return <><InputNumber aria-label="分数" value={value} onValueChange={setValue} /><button onClick={() => setValue(4)}>外部更新</button></>;
    }
    const { unmount } = render(<Controlled />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "001.50" } });
    fireEvent.blur(input);
    expect(input).toHaveValue("001.50");
    fireEvent.click(screen.getByRole("button", { name: "外部更新" }));
    expect(input).toHaveValue("4");
    unmount();
    render(<InputNumber aria-label="受控" value={3} />);
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "9" } });
    expect(screen.getByRole("spinbutton")).toHaveValue("3");
  });

  it("preserves excessive precision, reports the real number, and does not silently round through stepping", () => {
    const change = vi.fn();
    render(<InputNumber aria-label="分值" precision={2} step={0.1} onValueChange={change} />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "1.234" } });
    expect(input).toHaveValue("1.234");
    expect(change).toHaveBeenLastCalledWith(1.234);
    expect(input).toBeInvalid();
    expect(screen.getByRole("button", { name: "增加分值" })).toBeDisabled();
  });

  it("steps decimals exactly, keeps typed formatting, and does not snap input to step multiples", () => {
    render(<InputNumber aria-label="分值" step={0.1} />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "001.20" } });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("001.30");
    fireEvent.change(input, { target: { value: "0.2" } });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("0.3");
    fireEvent.wheel(input, { deltaY: -10 });
    expect(input).toHaveValue("0.3");
  });

  it("distinguishes optional emptiness, required emptiness and an explicit clear", async () => {
    const change = vi.fn();
    render(<FormItem label="人数" required><InputNumber defaultValue={3} clearable suffixText="人" onValueChange={change} /></FormItem>);
    const input = screen.getByRole("spinbutton", { name: "人数" });
    await userEvent.click(screen.getByRole("button", { name: "清除人数" }));
    expect(input).toHaveValue("");
    expect(change).toHaveBeenLastCalledWith(null);
    expect(input).toBeInvalid();
    expect(input).toHaveFocus();
    expect(screen.getByText("请填写数值")).toBeInTheDocument();
  });

  it("seeds empty stepping from zero while respecting the range", () => {
    const { rerender } = render(<InputNumber aria-label="数量" />);
    fireEvent.click(screen.getByRole("button", { name: "增加数量" }));
    expect(screen.getByRole("spinbutton")).toHaveValue("1");
    rerender(<InputNumber key="bounded" aria-label="数量" min={10} max={20} />);
    fireEvent.click(screen.getByRole("button", { name: "减少数量" }));
    expect(screen.getByRole("spinbutton")).toHaveValue("10");
  });

  it("inherits FormItem permissions and labels without hiding correctable warning controls", () => {
    const { rerender } = render(<FormItem label="名额" labelPosition="inside" help="每班人数" status="warning" message="请核对名额"><InputNumber defaultValue={3} /></FormItem>);
    const input = screen.getByRole("spinbutton", { name: "名额" });
    expect(input).toHaveAccessibleDescription("每班人数 请核对名额");
    fireEvent.click(screen.getByText("名额", { exact: true }));
    expect(screen.getByRole("button", { name: "增加名额" })).toBeEnabled();
    rerender(<FormItem label="名额" disabled><InputNumber defaultValue={3} clearable /></FormItem>);
    expect(input).toBeDisabled();
    expect(screen.getByRole("button", { name: "增加名额" })).toBeDisabled();
    rerender(<FormItem label="名额"><InputNumber readOnly defaultValue={3} /></FormItem>);
    expect(input).toHaveAttribute("readonly");
    expect(input).not.toBeDisabled();
    expect(screen.getByRole("button", { name: "减少名额" })).toBeDisabled();
  });

  it("resets an uncontrolled draft and its validity to the initial number", async () => {
    render(<form aria-label="试卷"><InputNumber aria-label="分数" defaultValue={12} /></form>);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "-" } });
    fireEvent.blur(input);
    await act(async () => { fireEvent.reset(screen.getByRole("form")); });
    expect(input).toHaveValue("12");
    expect(input).toBeValid();
    expect(screen.queryByText("请输入完整数字")).not.toBeInTheDocument();
  });

  it("rejects illegal characters as a whole and avoids unsafe numeric conversion", () => {
    const change = vi.fn();
    render(<InputNumber aria-label="数量" defaultValue={12} onValueChange={change} />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "12a" } });
    expect(input).toHaveValue("12");
    fireEvent.change(input, { target: { value: "9007199254740993" } });
    expect(input).toHaveValue("9007199254740993");
    expect(input).toBeInvalid();
    expect(change).not.toHaveBeenCalled();
  });

  it("accepts small external numbers without treating scientific notation as invalid input", () => {
    render(<InputNumber aria-label="比值" defaultValue={0.0000001} />);
    expect(screen.getByRole("spinbutton")).toHaveValue("0.0000001");
    expect(screen.getByRole("spinbutton")).toBeValid();
  });

  it("protects composition and keeps the final invalid attempt from corrupting the prior draft", () => {
    const change = vi.fn();
    render(<InputNumber aria-label="分数" defaultValue={12} onValueChange={change} />);
    const input = screen.getByRole("spinbutton");
    fireEvent.compositionStart(input);
    fireEvent.change(input, { target: { value: "12中" } });
    expect(change).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: "Enter", keyCode: 229, isComposing: true });
    fireEvent.compositionEnd(input);
    expect(input).toHaveValue("12");
    expect(change).not.toHaveBeenCalled();
  });

  it("revalidates dynamic limits without changing the host value", () => {
    const change = vi.fn();
    const { rerender } = render(<InputNumber aria-label="名额" value={12} max={20} onValueChange={change} />);
    rerender(<InputNumber aria-label="名额" value={12} max={10} onValueChange={change} />);
    expect(screen.getByRole("spinbutton")).toHaveValue("12");
    expect(screen.getByRole("spinbutton")).toBeInvalid();
    expect(change).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "增加名额" })).toBeDisabled();
  });

  it("publishes a valid completed composition exactly once", () => {
    const change = vi.fn();
    render(<InputNumber aria-label="输入法" defaultValue={1} onValueChange={change} />);
    const input = screen.getByRole("spinbutton");
    fireEvent.compositionStart(input);
    fireEvent.change(input, { target: { value: "12" } });
    fireEvent.compositionEnd(input);
    fireEvent.input(input, { target: { value: "12" } });
    expect(change).toHaveBeenCalledExactlyOnceWith(12);
  });

  it("allows an explicit external update to replace an unsafe draft", () => {
    const { rerender } = render(<InputNumber aria-label="外部" value={1} />);
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "9007199254740993" } });
    rerender(<InputNumber aria-label="外部" value={2} />);
    expect(screen.getByRole("spinbutton")).toHaveValue("2");
  });

  it("respects a canceled native reset", async () => {
    render(<form aria-label="表单" onReset={event => event.preventDefault()}><InputNumber aria-label="人数" defaultValue={3} /></form>);
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "8" } });
    await act(async () => { fireEvent.reset(screen.getByRole("form")); });
    expect(screen.getByRole("spinbutton")).toHaveValue("8");
  });
  it("does not commit changes refused by a controlled host", async () => {
    const commit = vi.fn();
    render(<InputNumber aria-label="受控" value={3} clearable onValueCommit={commit} />);
    await userEvent.click(screen.getByRole("button", { name: "增加受控" }));
    await userEvent.click(screen.getByRole("button", { name: "清除受控" }));
    expect(screen.getByRole("spinbutton")).toHaveValue("3");
    expect(commit).not.toHaveBeenCalled();
  });

  it("finishes a trailing dot before a programmatic native submission", () => {
    const saved = vi.fn();
    render(<form aria-label="提交表单" onSubmit={event => { event.preventDefault(); saved(new FormData(event.currentTarget).get("score")); }}>
      <InputNumber aria-label="提交分数" name="score" defaultValue={12} />
    </form>);
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "1." } });
    act(() => { (screen.getByRole("form") as HTMLFormElement).requestSubmit(); });
    expect(saved).toHaveBeenCalledWith("1");
    expect(screen.getByRole("spinbutton")).toHaveValue("1");
  });

  it("applies an external update after an incomplete composition ends", () => {
    const { rerender } = render(<InputNumber aria-label="输入法回填" value={12} />);
    const input = screen.getByRole("spinbutton");
    fireEvent.compositionStart(input);
    fireEvent.change(input, { target: { value: "-" } });
    rerender(<InputNumber aria-label="输入法回填" value={4} />);
    fireEvent.compositionEnd(input);
    expect(input).toHaveValue("4");
  });

  it.each([true, false])("submits the accepted controlled number with a trailing dot (accept=%s)", accept => {
    const saved = vi.fn();
    function Host() {
      const [value, setValue] = useState<number | null>(12);
      return <form aria-label="宿主" onSubmit={event => { event.preventDefault(); saved(value, new FormData(event.currentTarget).get("score")); }}>
        <InputNumber aria-label="分数" value={value} onValueChange={accept ? setValue : undefined} name="score" />
      </form>;
    }
    render(<Host />);
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "1." } });
    act(() => { (screen.getByRole("form") as HTMLFormElement).requestSubmit(); });
    expect(saved).toHaveBeenCalledExactlyOnceWith(accept ? 1 : 12, accept ? "1" : "12");
  });

  it("commits once when Enter also submits a native form", async () => {
    const commit = vi.fn(), submit = vi.fn(event => event.preventDefault());
    render(<form onSubmit={submit}><InputNumber aria-label="分数" defaultValue={1} onValueCommit={commit} /><button type="submit">提交</button></form>);
    const user = userEvent.setup();
    await user.click(screen.getByRole("spinbutton"));
    await user.keyboard("{Enter}");
    expect(submit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledExactlyOnceWith(1);
  });

  it.each(["-", "9007199254740993"])("clears an invalid %s draft and tells the controlled host it is empty", async draft => {
    const change = vi.fn();
    function Host() {
      const [value, setValue] = useState<number | null>(12);
      return <InputNumber aria-label="清空草稿" value={value} clearable onValueChange={next => { change(next); setValue(next); }} />;
    }
    render(<Host />);
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: draft } });
    await userEvent.click(screen.getByRole("button", { name: "清除清空草稿" }));
    expect(screen.getByRole("spinbutton")).toHaveValue("");
    expect(change).toHaveBeenCalledExactlyOnceWith(null);
  });

  it.each(["outlined", "filled", "underlined"] as const)("retains the Classic stacked controls with shared %s behavior", appearance => {
    const { container } = render(<InputNumber aria-label="嵌入分数" controlsLayout="stacked" appearance={appearance} defaultValue={120} max={100} />);
    const input = screen.getByRole("spinbutton");
    expect(input.closest('[data-rain-id="ui-input-number"]')).toHaveAttribute("data-controls-layout", "stacked");
    const controls = container.querySelector('[data-slot="controls"]');
    expect(controls).not.toBeNull();
    expect(controls!.querySelectorAll("button")[0]).toHaveAccessibleName("增加嵌入分数");
    expect(screen.getByRole("button", { name: "增加嵌入分数" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "减少嵌入分数" }));
    expect(input).toHaveValue("119");
    expect(input).toBeInvalid();
  });

  it("changes presentation without losing an incomplete draft or replacing its input", () => {
    const { rerender } = render(<InputNumber aria-label="切换形态" defaultValue={12} />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "-" } });
    rerender(<InputNumber aria-label="切换形态" defaultValue={12} controlsLayout="stacked" />);
    expect(screen.getByRole("spinbutton")).toBe(input);
    expect(input).toHaveValue("-");
    expect(input).toBeInvalid();
    expect(input.closest('[data-rain-id="ui-input-number"]')).toHaveAttribute("data-controls-layout", "stacked");
    rerender(<InputNumber aria-label="切换形态" controlsLayout="stacked" controls={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(input).toHaveValue("-");
  });

});
