import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { DensityProvider } from "../../../foundations/src/density";
import { Input } from "./input";
import { Button } from "../button/button";

function inputRoot(control: HTMLElement) {
  const root = control.closest('[data-rain-id="ui-input"]');
  expect(root).not.toBeNull();
  return root as HTMLElement;
}

describe("Input", () => {
  it.each(["outlined", "filled", "underlined"] as const)("preserves editing and validation when using the %s field appearance", (appearance) => {
    const changed = vi.fn();
    const { rerender } = render(<Input aria-label="外观切换" appearance="outlined" defaultValue="原名称" onValueChange={changed} status="warning" />);
    rerender(<Input aria-label="外观切换" appearance={appearance} defaultValue="原名称" onValueChange={changed} status="warning" />);
    const control = screen.getByRole("textbox", { name: "外观切换" });
    expect(inputRoot(control)).toHaveAttribute("data-appearance", appearance);
    expect(inputRoot(control)).toHaveAttribute("data-permission", "editable");
    expect(control).toHaveValue("原名称");
    fireEvent.change(control, { target: { value: "新名称" } });
    expect(changed).toHaveBeenCalledExactlyOnceWith("新名称");
    fireEvent.click(screen.getByRole("button", { name: "清除外观切换" }));
    expect(control).toHaveValue("");
    expect(inputRoot(control)).toHaveAttribute("data-status", "warning");
  });

  it("lets an external field owner provide label and feedback associations", () => {
    render(
      <div>
        <label htmlFor="course-name">课程名称</label>
        <Input
          aria-describedby="course-name-help course-name-error"
          id="course-name"
          status="error"
        />
        <p id="course-name-help">最多 30 个字</p>
        <p id="course-name-error">名称已存在</p>
      </div>,
    );

    const control = screen.getByRole("textbox", { name: "课程名称" });
    expect(control).toHaveAttribute(
      "aria-describedby",
      "course-name-help course-name-error",
    );
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(inputRoot(control)).toHaveAttribute("data-status", "error");
    expect(inputRoot(control)).toHaveAttribute("data-slot", "root");
  });

  it.each(["default", "warning", "error"] as const)(
    "exposes the %s visual status without owning a message",
    (status) => {
      const { container } = render(<Input aria-label="编号" status={status} />);
      const control = screen.getByRole("textbox", { name: "编号" });
      expect(inputRoot(control)).toHaveAttribute("data-status", status);
      expect(container.querySelector('[data-slot="message"]')).toBeNull();
      expect(container.querySelector('[data-slot="feedback"]')).toBeNull();
    },
  );

  it("keeps controlled and uncontrolled values on standard React paths", async () => {
    const user = userEvent.setup();
    function ControlledFixture() {
      const [value, setValue] = useState("旧名称");
      return (
        <Input
          aria-label="受控名称"
          onChange={(event) => setValue(event.currentTarget.value)}
          value={value}
        />
      );
    }

    render(
      <>
        <Input aria-label="非受控名称" defaultValue="草稿" />
        <ControlledFixture />
      </>,
    );
    await user.type(screen.getByRole("textbox", { name: "非受控名称" }), "一");
    await user.type(screen.getByRole("textbox", { name: "受控名称" }), "一");
    expect(screen.getByRole("textbox", { name: "非受控名称" })).toHaveValue(
      "草稿一",
    );
    expect(screen.getByRole("textbox", { name: "受控名称" })).toHaveValue(
      "旧名称一",
    );
  });

  it.each(["原值", ""])("resets an uncontrolled field to %j with matching count, clear state and FormData", async (defaultValue) => {
    const user = userEvent.setup(), changed = vi.fn(), cleared = vi.fn();
    render(<form aria-label="编辑表单">
      <Input aria-label="重置名称" name="title" defaultValue={defaultValue} showCount onValueChange={changed} onClear={cleared} />
      <button type="reset">重置</button>
    </form>);
    const control = screen.getByRole("textbox", { name: "重置名称" });
    const form = screen.getByRole("form", { name: "编辑表单" }) as HTMLFormElement;
    await user.clear(control);
    await user.type(control, "修改后的名称");
    changed.mockClear();
    await user.click(screen.getByRole("button", { name: "重置" }));
    expect(control).toHaveValue(defaultValue);
    expect(inputRoot(control).querySelector('[data-slot="count"]')).toHaveTextContent(String(defaultValue.length));
    expect(inputRoot(control)).toHaveAttribute("data-state", defaultValue ? "filled" : "empty");
    expect(Boolean(screen.queryByRole("button", { name: "清除重置名称" }))).toBe(Boolean(defaultValue));
    expect(new FormData(form).get("title")).toBe(defaultValue);
    expect(changed).not.toHaveBeenCalled();
    expect(cleared).not.toHaveBeenCalled();
  });

  it("restores native FormData immediately for a field associated with an external form", async () => {
    const user = userEvent.setup();
    render(<><form id="external-form" aria-label="外部表单" /><Input aria-label="外部名称" form="external-form" name="title" defaultValue="原值" /></>);
    const control = screen.getByRole("textbox", { name: "外部名称" });
    const form = screen.getByRole("form", { name: "外部表单" }) as HTMLFormElement;
    await user.clear(control);
    await user.type(control, "新值");
    await act(async () => {
      form.reset();
      expect(control).toHaveValue("原值");
      expect(new FormData(form).get("title")).toBe("原值");
    });
    expect(control).toHaveValue("原值");
    await user.type(control, "二");
    expect(control).toHaveValue("原值二");
  });

  it("preserves the edited value when the owner cancels reset", async () => {
    const user = userEvent.setup();
    render(<form onReset={(event) => event.preventDefault()}><Input aria-label="取消重置" defaultValue="原值" showCount /><button type="reset">取消的重置</button></form>);
    const control = screen.getByRole("textbox", { name: "取消重置" });
    await user.type(control, "新");
    await user.click(screen.getByRole("button", { name: "取消的重置" }));
    expect(control).toHaveValue("原值新");
    expect(inputRoot(control).querySelector('[data-slot="count"]')).toHaveTextContent("3");
  });

  it("leaves controlled values to their owner during native reset", async () => {
    const user = userEvent.setup(), changed = vi.fn();
    const view = render(<form aria-label="受控表单"><Input aria-label="受控重置" name="title" value="当前值" onValueChange={changed} /><button type="reset">受控重置</button></form>);
    await user.click(screen.getByRole("button", { name: "受控重置" }));
    expect(screen.getByRole("textbox", { name: "受控重置" })).toHaveValue("当前值");
    expect(new FormData(screen.getByRole("form", { name: "受控表单" }) as HTMLFormElement).get("title")).toBe("当前值");
    expect(changed).not.toHaveBeenCalled();
    view.rerender(<form><Input aria-label="受控重置" name="title" value="宿主重置值" onValueChange={changed} /></form>);
    expect(screen.getByRole("textbox", { name: "受控重置" })).toHaveValue("宿主重置值");
  });

  it("keeps the documented mounted reset baseline while a native defaultValue follows later props", async () => {
    const user = userEvent.setup();
    const fixture = (defaultValue: string) => <form aria-label="默认值对照">
      <Input aria-label="Rain 默认值" name="rain" defaultValue={defaultValue} showCount />
      <input aria-label="原生默认值" name="native" defaultValue={defaultValue}/>
      <button type="reset">对照重置</button>
    </form>;
    const view = render(fixture("挂载值"));
    await user.clear(screen.getByRole("textbox", { name: "Rain 默认值" }));
    await user.type(screen.getByRole("textbox", { name: "Rain 默认值" }), "用户草稿");
    await user.clear(screen.getByRole("textbox", { name: "原生默认值" }));
    await user.type(screen.getByRole("textbox", { name: "原生默认值" }), "用户草稿");
    view.rerender(fixture("后续默认值"));
    expect(screen.getByRole("textbox", { name: "Rain 默认值" })).toHaveValue("用户草稿");
    expect(screen.getByRole("textbox", { name: "原生默认值" })).toHaveValue("用户草稿");
    const form = screen.getByRole("form", { name: "默认值对照" }) as HTMLFormElement;
    await act(async () => {
      form.reset();
      expect(Object.fromEntries(new FormData(form))).toEqual({ rain: "挂载值", native: "后续默认值" });
    });
    await waitFor(() => expect(screen.getByRole("textbox", { name: "Rain 默认值" })).toHaveValue("挂载值"));
    expect(inputRoot(screen.getByRole("textbox", { name: "Rain 默认值" })).querySelector('[data-slot="count"]')).toHaveTextContent("3");
  });

  it("isolates owner forms and respects a native reset cancellation", async () => {
    const user = userEvent.setup();
    render(<><form id="owner-one" aria-label="表单一"><Input aria-label="字段一" name="one" defaultValue="一"/></form>
      <form id="owner-two" aria-label="表单二"><Input aria-label="字段二" name="two" defaultValue="二"/></form>
      <Input aria-label="外置字段一" name="external" form="owner-one" defaultValue="外置一"/>
    </>);
    const one = screen.getByRole("form", { name: "表单一" }) as HTMLFormElement, two = screen.getByRole("form", { name: "表单二" }) as HTMLFormElement;
    for (const label of ["字段一", "字段二", "外置字段一"]) await user.type(screen.getByRole("textbox", { name: label }), "草稿");
    const cancel = (event: Event) => event.preventDefault(); two.addEventListener("reset", cancel);
    await act(async () => { one.reset(); two.reset(); });
    await waitFor(() => expect(screen.getByRole("textbox", { name: "字段一" })).toHaveValue("一"));
    expect(screen.getByRole("textbox", { name: "外置字段一" })).toHaveValue("外置一");
    expect(screen.getByRole("textbox", { name: "字段二" })).toHaveValue("二草稿");
    expect(Object.fromEntries(new FormData(one))).toEqual({ one: "一", external: "外置一" });
    expect(Object.fromEntries(new FormData(two))).toEqual({ two: "二草稿" });
    two.removeEventListener("reset", cancel);
    await act(async () => two.reset());
    await waitFor(() => expect(screen.getByRole("textbox", { name: "字段二" })).toHaveValue("二"));
  });

  it("accepts a controlled owner's reset update without emitting text change callbacks", async () => {
    const changed = vi.fn();
    function Fixture() {
      const [value, setValue] = useState("宿主草稿");
      return <form onReset={() => setValue("宿主决定的初值")}><Input aria-label="宿主重置" value={value} onValueChange={changed}/><button type="reset">宿主复位</button></form>;
    }
    render(<Fixture/>);
    await userEvent.click(screen.getByRole("button", { name: "宿主复位" }));
    expect(screen.getByRole("textbox", { name: "宿主重置" })).toHaveValue("宿主决定的初值");
    expect(changed).not.toHaveBeenCalled();
  });

  it("clears an interrupted composition baseline on reset and permits subsequent editing and clearing", async () => {
    const changed = vi.fn(), cleared = vi.fn();
    render(<form aria-label="组字重置"><Input aria-label="组字字段" defaultValue="AB" maxLength={3} showCount onValueChange={changed} onClear={cleared}/></form>);
    const field = screen.getByRole("textbox", { name: "组字字段" });
    fireEvent.compositionStart(field); fireEvent.change(field, { target: { value: "A课程B" } });
    expect(field).toHaveValue("A课程B"); changed.mockClear();
    await act(async () => (screen.getByRole("form", { name: "组字重置" }) as HTMLFormElement).reset());
    await waitFor(() => expect(field).toHaveValue("AB"));
    await waitFor(() => expect(inputRoot(field).querySelector('[data-slot="count"]')).toHaveTextContent("2/3"));
    expect(changed).not.toHaveBeenCalled(); expect(cleared).not.toHaveBeenCalled();
    fireEvent.compositionEnd(field);
    fireEvent.change(field, { target: { value: "AXB" } });
    expect(field).toHaveValue("AXB"); expect(changed).toHaveBeenLastCalledWith("AXB");
    await userEvent.click(screen.getByRole("button", { name: "清除组字字段" }));
    expect(field).toHaveValue(""); expect(cleared).toHaveBeenCalledTimes(1);
  });

  it("restores an over-limit mounted value without truncating its count or overflow feedback", async () => {
    render(<form aria-label="超限复位"><Input aria-label="超限字段" defaultValue="原始长标题" maxLength={3} showCount/><button type="reset">恢复超限初值</button></form>);
    const field = screen.getByRole("textbox", { name: "超限字段" });
    fireEvent.change(field, { target: { value: "短" } });
    await userEvent.click(screen.getByRole("button", { name: "恢复超限初值" }));
    await waitFor(() => expect(field).toHaveValue("原始长标题"));
    expect(inputRoot(field).querySelector('[data-slot="count"]')).toHaveTextContent("5/3");
    expect(field).toHaveAccessibleDescription(/超过/);
  });

  it("removes owner-reset listeners on unmount and ignores a queued reset completion", async () => {
    vi.useFakeTimers();
    const added = vi.spyOn(document, "addEventListener"), removed = vi.spyOn(document, "removeEventListener"), changed = vi.fn();
    try {
      const view = render(<form aria-label="待卸载"><Input aria-label="卸载字段" defaultValue="原值" onValueChange={changed}/></form>);
      fireEvent.change(screen.getByRole("textbox"), { target: { value: "修改值" } }); changed.mockClear();
      act(() => (screen.getByRole("form", { name: "待卸载" }) as HTMLFormElement).reset());
      view.unmount(); await act(async () => vi.runAllTimers());
      const registrations = added.mock.calls.filter(([type]) => type === "reset");
      expect(registrations.length).toBeGreaterThan(0);
      for (const [, listener] of registrations) expect(removed).toHaveBeenCalledWith("reset", listener, true);
      expect(changed).not.toHaveBeenCalled();
    } finally { added.mockRestore(); removed.mockRestore(); vi.useRealTimers(); }
  });

  it("clears an editable default-status value and returns focus", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const onClear = vi.fn();
    render(
      <Input
        aria-label="课程名称"
        clearable
        defaultValue="人工智能导论"
        onClear={onClear}
        onValueChange={onValueChange}
      />,
    );

    const control = screen.getByRole("textbox", { name: "课程名称" });
    const clear = screen.getByRole("button", { name: "清除课程名称" });
    expect(clear).toHaveAttribute("data-slot", "clear-action");
    expect(clear.querySelector('[data-icon="icon/circle-close-filled"]')).not.toBeNull();
    await user.click(clear);
    expect(control).toHaveValue("");
    expect(control).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith("");
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it.each([
    { props: { disabled: true }, name: "禁用" },
    { props: { readOnly: true }, name: "只读" },
  ])("hides clear for $name state", ({ props, name }) => {
    render(
      <Input
        {...props}
        aria-label={`${name}输入`}
        clearable
        defaultValue="已有内容"
      />,
    );
    expect(screen.queryByRole("button", { name: `清除${name}输入` })).toBeNull();
  });

  it.each(["warning", "error"] as const)("clears %s by default without dismissing validation", async (status) => {
    const user = userEvent.setup();
    render(<Input aria-label="验证字段" defaultValue="旧值" status={status} />);
    const control = screen.getByRole("textbox", { name: "验证字段" });
    await user.click(screen.getByRole("button", { name: "清除验证字段" }));
    expect(control).toHaveValue("");
    expect(control).toHaveFocus();
    expect(inputRoot(control)).toHaveAttribute("data-status", status);
  });

  it("preserves overflow on initial load and max changes and describes hidden count overflow", () => {
    const { rerender } = render(<Input aria-label="回填" defaultValue="abcdef" maxLength={4} showCount={false} />);
    const control = screen.getByRole("textbox", { name: "回填" });
    expect(control).toHaveValue("abcdef");
    expect(control).toHaveAccessibleDescription("已超过 4 字上限");
    fireEvent.change(control, { target: { value: "abcde" } });
    expect(control).toHaveValue("abcde");
    fireEvent.change(control, { target: { value: "abXcde" } });
    expect(control).toHaveValue("abcde");
    rerender(<Input aria-label="回填" defaultValue="abcdef" maxLength={2} showCount={false} />);
    expect(control).toHaveValue("abcde");
    expect(control).toHaveAccessibleDescription("已超过 2 字上限");
  });

  it("shows count automatically with a limit and explicit size wins over density", () => {
    render(<DensityProvider density="compact"><Input aria-label="明确尺寸" size={28} maxLength={5} /></DensityProvider>);
    expect(screen.getByText("0/5")).toBeInTheDocument();
    expect(inputRoot(screen.getByRole("textbox"))).toHaveAttribute("data-size", "28");
  });

  it("blocks custom activation in disabled and read-only value-changing action slots", () => {
    const activate = vi.fn();
    const { rerender } = render(<Input aria-label="只读动作" readOnly trailingAction={<a href="#test" onClick={activate} onPointerDown={activate}>修改</a>} />);
    fireEvent.click(screen.getByText("修改"));
    fireEvent.pointerDown(screen.getByText("修改"));
    expect(activate).not.toHaveBeenCalled();
    rerender(<Input aria-label="只读动作" readOnly trailingActionChangesValue={false} trailingAction={<button onClick={activate}>复制</button>} />);
    fireEvent.click(screen.getByText("复制"));
    expect(activate).toHaveBeenCalledTimes(1);
    rerender(<Input aria-label="只读动作" disabled trailingActionChangesValue={false} trailingAction={<button onClick={activate}>复制</button>} />);
    fireEvent.click(screen.getByText("复制"));
    expect(activate).toHaveBeenCalledTimes(1);
  });

  it("applies a hard grapheme limit without splitting emoji", () => {
    render(
      <Input
        aria-label="课程简称"
        countMode="hard"
        defaultValue="A"
        maxLength={2}
        showCount
      />,
    );
    const control = screen.getByRole("textbox", { name: "课程简称" });
    fireEvent.change(control, { target: { value: "A👨‍👩‍👧‍👦B" } });
    expect(control).toHaveValue("A👨‍👩‍👧‍👦");
    expect(screen.getByText("2/2")).toHaveAttribute("data-slot", "count");
  });

  it("allows soft overflow while exposing a non-color cue", async () => {
    const user = userEvent.setup();
    render(
      <Input
        aria-label="课程简称"
        countMode="soft"
        maxLength={2}
        showCount
      />,
    );
    await user.type(screen.getByRole("textbox", { name: "课程简称" }), "课程名");
    expect(screen.getByText("3/2")).toHaveAttribute("data-overflow", "true");
  });

  it("does not submit Enter during Chinese IME composition", () => {
    const onPressEnter = vi.fn();
    render(<Input aria-label="课程搜索词" onPressEnter={onPressEnter} />);
    const control = screen.getByRole("textbox", { name: "课程搜索词" });

    fireEvent.compositionStart(control);
    fireEvent.keyDown(control, { key: "Enter", isComposing: true });
    expect(onPressEnter).not.toHaveBeenCalled();
    fireEvent.compositionEnd(control);
    fireEvent.keyDown(control, { key: "Enter" });
    expect(onPressEnter).toHaveBeenCalledTimes(1);
  });

  it("commits a hard grapheme limit to a controlled value after Chinese IME composition", () => {
    function ControlledImeFixture() {
      const [value, setValue] = useState("");
      return (
        <>
          <Input
            aria-label="受控中文简称"
            countMode="hard"
            maxLength={2}
            onChange={(event) => setValue(event.currentTarget.value)}
            value={value}
          />
          <output data-testid="controlled-ime-value">{value}</output>
        </>
      );
    }

    render(<ControlledImeFixture />);
    const control = screen.getByRole("textbox", { name: "受控中文简称" });
    fireEvent.compositionStart(control);
    fireEvent.change(control, { target: { value: "课程名称" } });
    expect(screen.getByTestId("controlled-ime-value")).toHaveTextContent(
      "课程名称",
    );

    fireEvent.compositionEnd(control);
    expect(screen.getByTestId("controlled-ime-value")).toHaveTextContent("课程");
    expect(control).toHaveValue("课程");
  });

  it("renders prefix, suffix and one trailing action in a stable order", () => {
    const { container } = render(
      <Input
        aria-label="学分"
        prefix={<span>建议</span>}
        suffixText="学分"
        suffix={<span>含实践</span>}
        maxLength={3}
        trailingAction={<button type="button">换算</button>}
      />,
    );
    expect(
      [...container.querySelectorAll('[data-rain-id="ui-input"] > [data-slot]')]
        .map((node) => node.getAttribute("data-slot")),
    ).toEqual(["prefix", "control", "clear-slot", "suffix-text", "suffix", "count", "trailing-action"]);
  });

  it("defaults embedded TextButtons to brand while preserving explicit tone and disabled behavior", () => {
    const { rerender } = render(<Input aria-label="学分" trailingAction={<Button variant="text">换算</Button>} />);
    expect(screen.getByRole("button", { name: "换算" })).toHaveAttribute("data-tone", "brand");
    rerender(<Input aria-label="学分" trailingAction={<Button variant="text" tone="danger">删除</Button>} />);
    expect(screen.getByRole("button", { name: "删除" })).toHaveAttribute("data-tone", "danger");
    rerender(<Input aria-label="学分" disabled trailingAction={<Button variant="text">换算</Button>} />);
    expect(screen.getByRole("button", { name: "换算" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "换算" })).toHaveAttribute("data-tone", "brand");
  });

  it("inherits the shared compact density", () => {
    render(
      <DensityProvider density="compact">
        <Input aria-label="紧凑输入" />
      </DensityProvider>,
    );
    expect(inputRoot(screen.getByRole("textbox", { name: "紧凑输入" }))).toHaveAttribute(
      "data-density",
      "compact",
    );
  });
});
