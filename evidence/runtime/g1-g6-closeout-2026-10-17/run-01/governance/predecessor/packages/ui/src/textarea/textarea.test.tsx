import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { FormItem } from "../input/form-item";
import { Textarea } from "./textarea";

describe("Textarea block additions", () => {
  it("focuses the existing textarea from decorative additions without taking a button's focus", async () => {
    const user = userEvent.setup();
    const action = vi.fn();
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} aria-label="评语" blockStart={<span>书写建议</span>}
      blockEnd={<button type="button" onClick={action}>插入短语</button>} />);
    const textarea = screen.getByRole("textbox", { name: "评语" });
    expect(screen.getAllByRole("textbox")).toHaveLength(1);
    expect(ref.current).toBe(textarea);
    await user.click(screen.getByText("书写建议"));
    expect(textarea).toHaveFocus();
    const button = screen.getByRole("button", { name: "插入短语" });
    await user.click(button);
    expect(action).toHaveBeenCalledOnce();
    expect(button).toHaveFocus();
  });

  it("preserves native form data, reset, maxlength, rows and one labelled field", async () => {
    const user = userEvent.setup();
    render(<><form id="feedback" aria-label="反馈表单" /><FormItem id="feedback-comment" label="评语" help="写明原因" message="请补充依据" status="error" required>
      <Textarea name="comment" form="feedback" rows={6} maxLength={6} defaultValue="初稿" blockEnd={<span>最多六字</span>} />
    </FormItem></>);
    const textarea = screen.getByRole("textbox", { name: "评语" }) as HTMLTextAreaElement;
    expect(screen.getByText("最多六字")).toBeVisible();
    expect(textarea).toHaveAttribute("rows", "6");
    expect(textarea).toHaveAttribute("maxlength", "6");
    expect(textarea).toBeRequired();
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("写明原因 请补充依据");
    await user.click(screen.getByText("评语"));
    expect(textarea).toHaveFocus();
    await user.type(textarea, "1234567");
    const form = screen.getByRole("form", { name: "反馈表单" }) as HTMLFormElement;
    expect(new FormData(form).get("comment")).toBe("初稿1234");
    form.reset();
    expect(textarea).toHaveValue("初稿");
  });

  it.each(["disabled", "readOnly"] as const)("blocks nested addition actions and edits when %s", async (permission) => {
    const action = vi.fn();
    const changed = vi.fn();
    render(<Textarea aria-label="评语" defaultValue="原文" {...{ [permission]: true }} onValueChange={changed}
      blockStart={<span>提示</span>} blockEnd={<span><button onClick={action}>添加</button></span>} />);
    const textarea = screen.getByRole("textbox", { name: "评语" });
    const button = screen.getByRole("button", { name: "添加" });
    fireEvent.click(button);
    fireEvent.change(textarea, { target: { value: "被修改" } });
    expect(action).not.toHaveBeenCalled();
    expect(changed).not.toHaveBeenCalled();
    expect(button.closest("[inert]")).not.toBeNull();
    if (permission === "readOnly") {
      textarea.focus();
      expect(textarea).toHaveFocus();
      expect(textarea).toHaveAttribute("readonly");
    } else expect(textarea).toBeDisabled();
  });

  it("keeps the host's controlled value and multiline change events", async () => {
    const user = userEvent.setup();
    const nativeChange = vi.fn();
    function Example() {
      const [value, setValue] = useState("");
      return <Textarea aria-label="评语" value={value} onValueChange={setValue} onChange={nativeChange}
        blockEnd={<span>{value.length} 字</span>} />;
    }
    render(<Example />);
    await user.type(screen.getByRole("textbox"), "一{Enter}二");
    expect(screen.getByRole("textbox")).toHaveValue("一\n二");
    expect(screen.getByText("3 字")).toBeVisible();
    expect(nativeChange).toHaveBeenCalledTimes(3);
  });

  it("permits explicitly nonmutating actions in read-only additions, but never when disabled", async () => {
    const user = userEvent.setup();
    function Example({ disabled = false }: { disabled?: boolean }) {
      const [viewed, setViewed] = useState(false);
      const ref = createRef<HTMLTextAreaElement>();
      return <><Textarea ref={ref} aria-label="评语" defaultValue="原文" readOnly disabled={disabled}
        blockStart={<button type="button" onClick={() => setViewed(!viewed)}>查看要求</button>} blockStartChangesValue={false}
        blockEnd={<button type="button" onClick={() => navigator.clipboard.writeText(ref.current!.value)}>复制正文</button>} blockEndChangesValue={false} />
        {viewed && <p>说明评分依据</p>}</>;
    }
    const { rerender } = render(<Example />);
    await user.click(screen.getByRole("button", { name: "查看要求" }));
    await user.click(screen.getByRole("button", { name: "复制正文" }));
    expect(screen.getByText("说明评分依据")).toBeVisible();
    expect(await navigator.clipboard.readText()).toBe("原文");
    expect(screen.getByRole("textbox")).toHaveValue("原文");
    await navigator.clipboard.writeText("未覆盖");
    rerender(<Example disabled />);
    fireEvent.click(screen.getByRole("button", { name: "查看要求" }));
    fireEvent.click(screen.getByRole("button", { name: "复制正文" }));
    expect(screen.getByText("说明评分依据")).toBeVisible();
    expect(await navigator.clipboard.readText()).toBe("未覆盖");
  });

  it("inherits disabled state from FormItem and retains existing fields without additions", () => {
    render(<><FormItem label="禁用评语" disabled><Textarea blockEnd={<button>添加</button>} /></FormItem>
      <Textarea aria-label="原有评语" rows={3} defaultValue="保留正文" /></>);
    expect(screen.getByRole("textbox", { name: "禁用评语" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "添加" }).closest("[inert]")).not.toBeNull();
    expect(screen.getByRole("textbox", { name: "原有评语" })).toHaveValue("保留正文");
    expect(screen.getByRole("textbox", { name: "原有评语" })).toHaveAttribute("rows", "3");
  });
});
