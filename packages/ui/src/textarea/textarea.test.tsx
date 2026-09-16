import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import * as UI from "../index";

it("exports Textarea with a native ref and complete FormItem linkage", async () => {
  expect(UI).toHaveProperty("Textarea");
  const ref = createRef<HTMLTextAreaElement>();
  render(<><span id="extra">额外说明</span><UI.FormItem id="course" label="课程说明" help="支持多段文字" message="请补充说明" status="error" required>
    <UI.Textarea ref={ref} id="ignored" name="description" aria-describedby="extra course-help extra" aria-invalid={false} />
  </UI.FormItem></>);
  const control = screen.getByRole("textbox", { name: "课程说明" });
  expect(control).toBe(ref.current);
  expect(control.tagName).toBe("TEXTAREA");
  expect(control).toHaveAttribute("id", "course");
  expect(control).toHaveAttribute("name", "description");
  expect(control).toBeRequired();
  expect(control).toHaveAttribute("aria-invalid", "true");
  expect(control).toHaveAttribute("aria-describedby", "extra course-help course-message");
  expect(control).toHaveAccessibleDescription("额外说明 支持多段文字 请补充说明");
  await userEvent.click(screen.getByText("课程说明"));
  expect(control).toHaveFocus();
});

it("keeps native uncontrolled edits, line breaks, FormData and reset", async () => {
  expect(UI).toHaveProperty("Textarea");
  const changed = vi.fn();
  const { container } = render(<form><UI.Textarea aria-label="说明" name="description" defaultValue="原文" onValueChange={changed} rows={5} maxLength={100} /><button type="reset">重置</button></form>);
  const control = screen.getByRole("textbox");
  await userEvent.type(control, "{Enter}第二段");
  expect(control).toHaveValue("原文\n第二段");
  expect(changed).toHaveBeenLastCalledWith("原文\n第二段");
  expect(new FormData(container.querySelector("form")!).get("description")).toBe("原文\n第二段");
  await userEvent.click(screen.getByText("重置"));
  expect(control).toHaveValue("原文");
  expect(control).toHaveAttribute("rows", "5");
  expect(control).toHaveAttribute("maxlength", "100");
});

it("leaves controlled values and IME events under the host", () => {
  expect(UI).toHaveProperty("Textarea");
  const onChange = vi.fn(), onCompositionEnd = vi.fn();
  function Host() {
    const [value, setValue] = useState("A\nB");
    return <UI.Textarea aria-label="受控" value={value} onValueChange={setValue} onChange={onChange} onCompositionEnd={onCompositionEnd} />;
  }
  const { rerender } = render(<Host />);
  const control = screen.getByRole("textbox");
  fireEvent.compositionStart(control);
  fireEvent.change(control, { target: { value: "A\n课程B" } });
  fireEvent.compositionEnd(control);
  expect(control).toHaveValue("A\n课程B");
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onCompositionEnd).toHaveBeenCalledTimes(1);
  rerender(<UI.Textarea aria-label="受控" value="固定值" onValueChange={vi.fn()} />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "替换" } });
  expect(screen.getByRole("textbox")).toHaveValue("固定值");
});

it("inherits disabled and required additively and preserves readonly and caller ARIA", async () => {
  expect(UI).toHaveProperty("Textarea");
  const changed = vi.fn();
  const { rerender } = render(<UI.FormItem label="禁用说明" disabled required><UI.Textarea disabled={false} required={false} defaultValue="保留" onValueChange={changed} /></UI.FormItem>);
  const control = screen.getByRole("textbox");
  expect(control).toBeDisabled();
  expect(control).toBeRequired();
  await userEvent.type(control, "修改");
  expect(changed).not.toHaveBeenCalled();
  rerender(<UI.FormItem label="只读说明"><UI.Textarea readOnly defaultValue="保留" aria-invalid="grammar" /></UI.FormItem>);
  expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "grammar");
  await userEvent.click(screen.getByText("只读说明"));
  expect(screen.getByRole("textbox")).toHaveFocus();
});
