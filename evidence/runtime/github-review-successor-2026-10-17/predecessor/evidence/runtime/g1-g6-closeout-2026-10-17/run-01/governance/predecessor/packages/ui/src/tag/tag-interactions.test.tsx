import { createRef, useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DensityProvider } from "@rain-next/foundations";
import { LinkTag } from "./link-tag";
import { CheckableTag, CheckableTagGroup } from "./checkable-tag";

const options = [{ value: "all", label: "全部" }, { value: "paper", label: "试卷", color: "paper" as const }, { value: "locked", label: "锁定", disabled: true }];

describe("LinkTag", () => {
  it("keeps link semantics and a separately named sibling remove action", async () => {
    const user = userEvent.setup(), navigate = vi.fn((event) => event.preventDefault()), remove = vi.fn(), ref = createRef<HTMLAnchorElement>();
    const { container } = render(<LinkTag href="/resources/42" target="_blank" rel="author" ref={ref} onClick={navigate} onRemove={remove}>第三章课件</LinkTag>);
    const link = screen.getByRole("link", { name: "第三章课件（新标签页打开）" });
    expect(ref.current).toBe(link);
    expect(link).toHaveAttribute("href", "/resources/42");
    expect(link).toHaveAttribute("rel", "author noopener noreferrer");
    const close = screen.getByRole("button", { name: "移除标签 第三章课件" });
    expect(close.parentElement).toBe(link.parentElement);
    expect(within(link).queryByRole("button")).toBeNull();
    await user.click(close);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(navigate).not.toHaveBeenCalled();
    await user.click(link);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(container.querySelector('[data-rain-id="ui-link-tag"]')).toHaveAttribute("data-size", "24");
  });

  it("removes navigation and clears the anchor ref when disabled", () => {
    const ref = createRef<HTMLAnchorElement>();
    const { rerender, container } = render(<LinkTag href="/course" ref={ref}>课程</LinkTag>);
    expect(ref.current).not.toBeNull();
    rerender(<LinkTag href="/course" ref={ref} disabled onRemove={() => undefined}>课程</LinkTag>);
    expect(ref.current).toBeNull();
    expect(container.querySelector("[href]")).toBeNull();
    expect(screen.getByRole("button", { name: "移除标签 课程" })).toBeDisabled();
    expect(screen.getByText("课程")).toBeVisible();
  });

  it("preserves disabled link identity and accessible context without activation", () => {
    const navigate = vi.fn();
    render(<><p id="reason">课程暂未开放</p><LinkTag href="/course" disabled id="course-link" title="课程" aria-label="第三章课程" aria-describedby="reason" tabIndex={0} onClick={navigate}>课程</LinkTag></>);
    const link = screen.getByRole("link", { name: "第三章课程" });
    expect(link).toHaveAttribute("id", "course-link");
    expect(link).toHaveAttribute("title", "课程");
    expect(link).toHaveAccessibleDescription("课程暂未开放");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).not.toHaveAttribute("href");
    expect(link).not.toHaveAttribute("tabindex");
    fireEvent.click(link); expect(navigate).not.toHaveBeenCalled();
  });
});

describe("CheckableTag and group", () => {
  it("uses a controlled native input and creates the trailing mark only after selection", async () => {
    const user = userEvent.setup(), ref = createRef<HTMLInputElement>();
    function Example() { const [checked, setChecked] = useState(false); return <DensityProvider density="compact"><CheckableTag ref={ref} value="paper" label="试卷" color="paper" checked={checked} onCheckedChange={setChecked} /></DensityProvider>; }
    const { container } = render(<Example />);
    const input = screen.getByRole("checkbox", { name: "试卷" });
    expect(ref.current).toBe(input);
    expect(container.querySelector('[data-slot="selection-mark"]')).toBeNull();
    expect(input.closest("label")).toHaveAttribute("data-size", "24");
    await user.tab(); await user.keyboard(" ");
    expect(input).toBeChecked();
    expect(container.querySelector('[data-slot="selection-mark"]')?.previousElementSibling).toHaveAttribute("data-slot", "label");
    expect(input.closest("label")).toHaveAttribute("data-color", "paper");
    await user.keyboard("{Enter}");
    expect(input).not.toBeChecked();
  });

  it("does not submit the form, repeat or activate an IME Enter or disabled input", () => {
    const change = vi.fn(), submit = vi.fn((event) => event.preventDefault());
    const { rerender } = render(<form onSubmit={submit}><CheckableTag value="a" label="条目" checked={false} onCheckedChange={change} /></form>);
    const input = screen.getByRole("checkbox");
    fireEvent.keyDown(input, { key: "Enter", repeat: true });
    fireEvent.keyDown(input, { key: "Enter", isComposing: true });
    expect(change).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: "Enter" });
    expect(change).toHaveBeenCalledOnce(); expect(submit).not.toHaveBeenCalled();
    rerender(<CheckableTag value="a" label="条目" checked={false} disabled onCheckedChange={change} />);
    fireEvent.keyDown(screen.getByRole("checkbox"), { key: "Enter" });
    expect(change).toHaveBeenCalledOnce();
  });

  it("shares radio names, skips disabled options and clears with focus returned inside the group", async () => {
    const user = userEvent.setup();
    function Example() { const [value, setValue] = useState<string | null>("all"); return <CheckableTagGroup legend="资源类型" options={options} value={value} onValueChange={setValue} clearable />; }
    render(<Example />);
    const group = screen.getByRole("radiogroup", { name: "资源类型" }), [all, paper, locked] = within(group).getAllByRole("radio");
    expect(all).toHaveAttribute("name", paper?.getAttribute("name"));
    expect(locked).toBeDisabled();
    await user.tab(); await user.keyboard("{ArrowRight}");
    expect(paper).toBeChecked();
    await user.keyboard("{Enter}"); expect(paper).toBeChecked();
    await user.click(screen.getByRole("button", { name: "清空资源类型" }));
    expect(all).not.toBeChecked(); expect(paper).not.toBeChecked(); expect(all).toHaveFocus();
  });

  it("appends and removes multiple values without reordering other selections", async () => {
    const user = userEvent.setup(), changes = vi.fn();
    function Example() { const [value, setValue] = useState<string[]>(["paper"]); return <CheckableTagGroup mode="multiple" legend="筛选" options={options} value={value} onValueChange={(next) => { changes(next); setValue(next); }} />; }
    render(<Example />);
    await user.click(screen.getByRole("checkbox", { name: "全部" })); expect(changes).toHaveBeenLastCalledWith(["paper", "all"]);
    await user.click(screen.getByRole("checkbox", { name: "试卷" })); expect(changes).toHaveBeenLastCalledWith(["all"]);
  });

  it("supports empty options and rejects mismatched values or ambiguous identities", () => {
    const base = { legend: "筛选", options, value: null, onValueChange: vi.fn() };
    const { container } = render(<CheckableTagGroup {...base} options={[]} clearable />);
    expect(container.querySelector("input")).toBeNull();
    expect(screen.getByRole("button", { name: "清空筛选" })).toBeDisabled();
    expect(() => render(<CheckableTagGroup {...base} options={[options[0]!, options[0]!]} />)).toThrow(/unique/);
    expect(() => render(<CheckableTagGroup {...base} value="missing" />)).toThrow(/value/);
    expect(() => render(<CheckableTag type="radio" value="a" label="条目" checked={false} onCheckedChange={vi.fn()} />)).toThrow(/name/);
  });
});
