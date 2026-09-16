import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./input";
import { FormItem } from "./form-item";
import { SearchInput } from "./search-input";

describe("Input field recipes", () => {
  it("connects label, help, validation and native props through one field context", async () => {
    const ref = createRef<HTMLInputElement>();
    render(<FormItem label="课程名称" help="公开显示" message="名称已存在" status="error" required>
      <Input id="explicit-course" ref={ref} name="course" status="default" aria-describedby="extra" />
    </FormItem>);
    const control = screen.getByRole("textbox", { name: "课程名称" });
    expect(control).toBe(ref.current);
    expect(control).toHaveAttribute("id", "explicit-course");
    expect(control).toHaveAttribute("name", "course");
    expect(control).toBeRequired();
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control).toHaveAccessibleDescription("公开显示 名称已存在");
    await userEvent.click(screen.getByText("课程名称"));
    expect(control).toHaveFocus();
  });

  it("searches only on actions, suppresses IME Enter and permits clear during loading", async () => {
    const onSearch = vi.fn();
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<SearchInput aria-label="搜索课程" onSearch={onSearch} onValueChange={onChange} />);
    const control = screen.getByRole("textbox", { name: "搜索课程" });
    await user.type(control, "课程");
    expect(onSearch).not.toHaveBeenCalled();
    fireEvent.keyDown(control, { key: "Enter", keyCode: 229 });
    expect(onSearch).not.toHaveBeenCalled();
    await user.keyboard("{Enter}");
    expect(onSearch).toHaveBeenLastCalledWith("课程", { source: "enter" });
    await user.click(screen.getByRole("button", { name: "搜索" }));
    expect(onSearch).toHaveBeenLastCalledWith("课程", { source: "button" });
    rerender(<SearchInput aria-label="搜索课程" loading onSearch={onSearch} onValueChange={onChange} />);
    await user.type(control, "一");
    await user.keyboard("{Enter}");
    await user.click(screen.getByRole("button", { name: "搜索" }));
    expect(onSearch).toHaveBeenCalledTimes(2);
    await user.click(screen.getByRole("button", { name: "清除搜索课程" }));
    expect(onSearch).toHaveBeenLastCalledWith("", { source: "clear" });
    expect(onSearch).toHaveBeenCalledTimes(3);
    expect(control).toHaveFocus();
    expect(control).toHaveValue("");
  });

  it("submits literal empty query even when a controlled parent rejects the clear", async () => {
    const onSearch = vi.fn();
    render(<SearchInput aria-label="受控搜索" value="固定值" onSearch={onSearch} />);
    await userEvent.click(screen.getByRole("button", { name: "清除受控搜索" }));
    expect(onSearch).toHaveBeenCalledExactlyOnceWith("", { source: "clear" });
    expect(screen.getByRole("textbox")).toHaveValue("固定值");
  });

  it("allows readonly search while disabling the complete field", async () => {
    const onSearch = vi.fn();
    const { rerender } = render(<SearchInput aria-label="查询" readOnly defaultValue="已有值" onSearch={onSearch} />);
    await userEvent.click(screen.getByRole("button", { name: "搜索" }));
    expect(onSearch).toHaveBeenCalledExactlyOnceWith("已有值", { source: "button" });
    rerender(<FormItem label="查询" disabled><SearchInput defaultValue="已有值" onSearch={onSearch} /></FormItem>);
    expect(screen.getByRole("textbox")).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "搜索" }));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it("handles controlled IME in the middle without losing the original tail", () => {
    const changed = vi.fn();
    function Fixture() {
      const [value, setValue] = useState("AB");
      return <Input aria-label="组字" value={value} maxLength={3} onValueChange={(next) => { changed(next); setValue(next); }} />;
    }
    render(<Fixture />);
    const control = screen.getByRole("textbox");
    fireEvent.compositionStart(control);
    fireEvent.change(control, { target: { value: "A课程B" } });
    expect(control).toHaveValue("A课程B");
    (control as HTMLInputElement).setSelectionRange(3, 3);
    fireEvent.compositionEnd(control);
    expect(control).toHaveValue("A课B");
    expect((control as HTMLInputElement).selectionStart).toBe(2);
    fireEvent.input(control, { target: { value: "A课B" } });
    expect(changed.mock.calls).toEqual([["A课程B"], ["A课B"]]);
  });

  it("preserves native grammar validation inside FormItem", () => {
    render(<FormItem label="语法"><Input aria-invalid="grammar" /></FormItem>);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "grammar");
  });

  it.each([Input, SearchInput])("preserves React callback-ref cleanup without reconnecting on edits", (Component) => {
    const cleanup = vi.fn();
    const ref = vi.fn(() => cleanup);
    const { rerender, unmount } = render(<Component aria-label="ref" ref={ref} />);
    rerender(<Component aria-label="ref" ref={ref} value="新值" />);
    expect(ref).toHaveBeenCalledTimes(1);
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("does not allow actions inside decorative icon or text slots", () => {
    const action = vi.fn();
    render(<Input aria-label="装饰" leadingIcon={<button onClick={action}>图标</button>} />);
    fireEvent.click(screen.getByText("图标"));
    expect(action).not.toHaveBeenCalled();
    expect(() => render(<Input aria-label="文字" prefixText={<button>修改</button> as unknown as string} />)).toThrow("plain text");
  });
});
