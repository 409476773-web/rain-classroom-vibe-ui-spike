import { act, createEvent, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, type ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { AttachmentIntake } from "./attachment-intake";

const label = "添加课程附件";
type IntakeProps = Omit<ComponentProps<typeof AttachmentIntake>, "children">;
function Intake({ variant = "list", count = 2, onFiles = vi.fn(), ...props }: Partial<IntakeProps>) {
  return <AttachmentIntake variant={variant} count={count} label={label} onFiles={onFiles} {...props}>
    {({ trigger, empty }) => <>{variant === "composer" || count > 0 ? trigger : empty}</>}
  </AttachmentIntake>;
}
const file = (name = "课堂资料.pdf") => new File(["actual lesson contents"], name, { type: "application/pdf" });
const area = (name = label) => screen.getByRole("group", { name });
const input = (name = label) => screen.getByLabelText(name, { selector: "input" }) as HTMLInputElement;
const data = (files: File[] = [], types = ["Files"]) => ({ files, types, items: files.map(item => ({ kind: "file", type: item.type, getAsFile: () => item })) });
function drop(target: HTMLElement, files: File[], types = ["Files"]) {
  const event = createEvent.drop(target, { dataTransfer: data(files, types), bubbles: true, cancelable: true });
  fireEvent(target, event); return event;
}
function leave(target: HTMLElement, relatedTarget: EventTarget | null) {
  const event = createEvent.dragLeave(target, { dataTransfer: data(), bubbles: true });
  Object.defineProperty(event, "relatedTarget", { value: relatedTarget });
  fireEvent(target, event);
}

describe("local AttachmentIntake", () => {
  it.each([
    ["list", 0, "选择文件"], ["media", 0, "选择文件"],
    ["list", 2, "添加文件"], ["media", 2, "添加图片或视频"],
    ["composer", 0, "添加附件"], ["composer", 2, "添加附件"],
  ] as const)("renders one named %s entry for count %i", (variant, count, text) => {
    const buttonRef = createRef<HTMLButtonElement>();
    render(<Intake variant={variant} count={count} accept=".pdf,image/*" buttonRef={buttonRef} />);
    const button = within(area()).getByRole("button", { name: label });
    expect(button).toHaveTextContent(text);
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
    expect(buttonRef.current).toBe(button);
    expect(within(area()).getAllByRole("button")).toHaveLength(1);
    expect(area()).toHaveAttribute("data-rain-id", "local-attachment-intake");
    expect(area()).toHaveAttribute("data-state", "idle");
    expect(input()).toHaveAttribute("type", "file");
    expect(input()).toHaveAttribute("accept", ".pdf,image/*");
  });

  it("keeps the visible trigger reference current as an empty collection gains and loses a file", () => {
    const buttonRef = createRef<HTMLButtonElement>();
    const view = render(<Intake count={0} buttonRef={buttonRef} />);
    expect(buttonRef.current).toHaveTextContent("选择文件");
    view.rerender(<Intake count={1} buttonRef={buttonRef} />);
    expect(buttonRef.current).toBe(within(area()).getByRole("button", { name: label }));
    expect(buttonRef.current).toHaveTextContent("添加文件");
    view.rerender(<Intake count={0} buttonRef={buttonRef} />);
    expect(buttonRef.current).toBe(within(area()).getByRole("button", { name: label }));
    expect(buttonRef.current).toHaveTextContent("选择文件");
  });

  it.each([0, 2])("opens the native chooser by keyboard without submitting its form at count %i", async count => {
    const user = userEvent.setup(), submit = vi.fn(event => event.preventDefault());
    render(<form onSubmit={submit}><Intake count={count} /></form>);
    const open = vi.spyOn(input(), "click"), button = screen.getByRole("button", { name: label });
    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(open).toHaveBeenCalledTimes(2);
    expect(submit).not.toHaveBeenCalled();
  });

  it("resets native selection so the same actual File can be chosen again", async () => {
    const user = userEvent.setup(), onFiles = vi.fn(), selected = file();
    render(<Intake onFiles={onFiles} />);
    await user.upload(input(), selected);
    expect(onFiles).toHaveBeenNthCalledWith(1, [selected]);
    expect(input()).toHaveValue("");
    await user.upload(input(), selected);
    expect(onFiles).toHaveBeenNthCalledWith(2, [selected]);
    fireEvent.change(input(), { target: { files: [] } });
    expect(onFiles).toHaveBeenCalledTimes(2);
  });

  it.each(["dragEnter", "dragOver"] as const)("activates a file drag on %s and clears only after leaving the whole area", eventName => {
    render(<Intake />);
    const root = area(), button = within(root).getByRole("button", { name: label });
    fireEvent[eventName](root, { dataTransfer: data() });
    expect(root).toHaveAttribute("data-state", "dragging");
    leave(button, root);
    expect(root).toHaveAttribute("data-state", "dragging");
    leave(root, null);
    expect(root).toHaveAttribute("data-state", "idle");
  });

  it("accepts a bubbled multi-file drop exactly once and prevents browser navigation", async () => {
    const onFiles = vi.fn(), files = [file(), file("实验记录.pdf")];
    render(<Intake onFiles={onFiles} />);
    fireEvent.dragEnter(area(), { dataTransfer: data() });
    const event = drop(within(area()).getByRole("button", { name: label }), files);
    expect(event.defaultPrevented).toBe(true);
    expect(onFiles).toHaveBeenCalledExactlyOnceWith(files);
    expect(onFiles.mock.calls[0]?.[0][0]).toBe(files[0]);
    expect(onFiles.mock.calls[0]?.[0][1]).toBe(files[1]);
    await act(async () => Promise.resolve());
    expect(area()).toHaveAttribute("data-state", "idle");
  });

  it("preserves text drag behavior and never announces file acceptance for it", () => {
    const onFiles = vi.fn(); render(<Intake onFiles={onFiles} />);
    fireEvent.dragEnter(area(), { dataTransfer: data([], ["text/plain"]) });
    const over = createEvent.dragOver(area(), { dataTransfer: data([], ["text/plain"]), cancelable: true });
    fireEvent(area(), over);
    expect(over.defaultPrevented).toBe(false);
    expect(drop(area(), [], ["text/plain"]).defaultPrevented).toBe(false);
    expect(area()).toHaveAttribute("data-state", "idle");
    expect(onFiles).not.toHaveBeenCalled();
  });

  it.each(["disabled", "readOnly"] as const)("blocks selection and file drops while %s but preserves text drops", async mode => {
    const user = userEvent.setup(), onFiles = vi.fn();
    render(<Intake {...{ [mode]: true }} onFiles={onFiles} />);
    const button = within(area()).getByRole("button", { name: label }), open = vi.spyOn(input(), "click");
    expect(button).toBeDisabled();
    expect(input()).toBeDisabled();
    await user.click(button);
    expect(open).not.toHaveBeenCalled();
    fireEvent.dragEnter(area(), { dataTransfer: data() });
    expect(area()).toHaveAttribute("data-state", "idle");
    expect(drop(area(), [file()]).defaultPrevented).toBe(true);
    expect(drop(area(), [], ["text/plain"]).defaultPrevented).toBe(false);
    fireEvent.change(input(), { target: { files: [file()] } });
    expect(onFiles).not.toHaveBeenCalled();
  });

  it("guards duplicate intake across drop and native selection until the caller settles", async () => {
    let resolve!: () => void;
    const pending = new Promise<void>(yes => { resolve = yes; }), onFiles = vi.fn(() => pending), first = file();
    render(<Intake onFiles={onFiles} />);
    drop(area(), [first]);
    expect(area()).toHaveAttribute("data-state", "pending");
    expect(input()).toBeDisabled();
    expect(within(area()).getByRole("button", { name: label })).toBeDisabled();
    expect(drop(area(), [file("重复投放.pdf")]).defaultPrevented).toBe(true);
    fireEvent.change(input(), { target: { files: [file("重复选择.pdf")] } });
    fireEvent.dragOver(area(), { dataTransfer: data() });
    expect(area()).toHaveAttribute("data-state", "pending");
    expect(onFiles).toHaveBeenCalledExactlyOnceWith([first]);
    await act(async () => resolve());
    expect(area()).toHaveAttribute("data-state", "idle");
    expect(input()).not.toBeDisabled();
    drop(area(), [first]);
    await act(async () => Promise.resolve());
    expect(onFiles).toHaveBeenCalledTimes(2);
  });

  it("guards duplicate drops dispatched before React can render the pending state", async () => {
    let resolve!: () => void;
    const pending = new Promise<void>(yes => { resolve = yes; }), onFiles = vi.fn(() => pending), first = file();
    render(<Intake onFiles={onFiles} />);
    const root = area();
    act(() => {
      root.dispatchEvent(createEvent.drop(root, { dataTransfer: data([first]), bubbles: true, cancelable: true }));
      root.dispatchEvent(createEvent.drop(root, { dataTransfer: data([file("第二次事件.pdf")]), bubbles: true, cancelable: true }));
    });
    expect(onFiles).toHaveBeenCalledExactlyOnceWith([first]);
    await act(async () => resolve());
    expect(root).toHaveAttribute("data-state", "idle");
  });

  it("exposes asynchronous rejection locally and allows a fresh attempt", async () => {
    let reject!: (error: Error) => void;
    const pending = new Promise<void>((_, no) => { reject = no; });
    const onFiles = vi.fn().mockImplementationOnce(() => pending).mockImplementationOnce(() => undefined);
    render(<><Intake onFiles={onFiles} /><Intake label="添加讨论附件" /></>);
    drop(area(), [file()]);
    await act(async () => reject(new Error("附件数量已达到上限，请移除后重试。")));
    expect(within(area()).getByRole("alert")).toHaveTextContent("附件数量已达到上限，请移除后重试。");
    expect(within(area("添加讨论附件")).queryByRole("alert")).toBeNull();
    expect(area()).toHaveAttribute("data-state", "idle");
    expect(input()).not.toBeDisabled();
    drop(area(), [file("再次添加.pdf")]);
    await act(async () => Promise.resolve());
    expect(onFiles).toHaveBeenCalledTimes(2);
    expect(within(area()).queryByRole("alert")).toBeNull();
  });

  it("reports synchronous caller errors without leaving the entry pending", async () => {
    render(<Intake onFiles={() => { throw new Error("当前课程不可添加附件。"); }} />);
    fireEvent.change(input(), { target: { files: [file()] } });
    await act(async () => Promise.resolve());
    expect(within(area()).getByRole("alert")).toHaveTextContent("当前课程不可添加附件。");
    expect(area()).toHaveAttribute("data-state", "idle");
    expect(input()).toHaveValue("");
  });

  it.each(["escape", "blur"] as const)("clears the transient drop target on %s", eventName => {
    render(<><button type="button">其他操作</button><Intake /></>);
    const outside = screen.getByRole("button", { name: "其他操作" });
    outside.focus();
    fireEvent.dragEnter(area(), { dataTransfer: data() });
    expect(area()).toHaveAttribute("data-state", "dragging");
    if (eventName === "escape") fireEvent.keyDown(outside, { key: "Escape" });
    else fireEvent.blur(window);
    expect(area()).toHaveAttribute("data-state", "idle");
    fireEvent.dragEnter(area(), { dataTransfer: data() });
    expect(area()).toHaveAttribute("data-state", "dragging");
  });
});
