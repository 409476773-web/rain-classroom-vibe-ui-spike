import { act, createEvent, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { AttachmentPicker } from "./attachment-picker";

const makeFile = (name = "课程资料.pdf") => new File(["lesson"], name, { type: "application/pdf" });
function nativeInput() { return screen.getByLabelText("添加附件", { selector: "input" }) as HTMLInputElement; }
function dropFiles(node: HTMLElement, files: File[], types = ["Files"]) {
  const event = createEvent.drop(node, { dataTransfer: { files, types } });
  fireEvent(node, event); return event;
}

describe("AttachmentPicker", () => {
  it("opens the named native chooser by keyboard without submitting its form", async () => {
    const user = userEvent.setup(), submit = vi.fn(event => event.preventDefault()), buttonRef = createRef<HTMLButtonElement>();
    render(<form onSubmit={submit}><AttachmentPicker onFiles={vi.fn()} accept=".pdf,image/*" buttonRef={buttonRef} description="支持 PDF 和图片。" /></form>);
    const input = nativeInput(), open = vi.spyOn(input, "click");
    const button = screen.getByRole("button", { name: "添加附件" });
    expect(buttonRef.current).toBe(button); expect(button).toHaveAttribute("type", "button");
    expect(input).toHaveAttribute("accept", ".pdf,image/*"); expect(input).toHaveAttribute("multiple");
    expect(button).toHaveAccessibleDescription(expect.stringContaining("支持 PDF 和图片。"));
    await user.tab(); expect(button).toHaveFocus();
    await user.keyboard("{Enter}"); expect(open).toHaveBeenCalledTimes(1);
    await user.keyboard(" "); expect(open).toHaveBeenCalledTimes(2); expect(submit).not.toHaveBeenCalled();
  });

  it("delivers selected files and allows the same file to be selected again", async () => {
    const user = userEvent.setup(), receive = vi.fn(), selected = makeFile();
    render(<AttachmentPicker onFiles={receive} />);
    await user.upload(nativeInput(), selected);
    expect(receive).toHaveBeenNthCalledWith(1, [selected]); expect(nativeInput()).toHaveValue("");
    await user.upload(nativeInput(), selected);
    expect(receive).toHaveBeenNthCalledWith(2, [selected]);
    fireEvent.change(nativeInput(), { target: { files: [] } });
    expect(receive).toHaveBeenCalledTimes(2);
  });

  it("routes file drops through onFiles and prevents the browser from opening them", async () => {
    const receive = vi.fn(), files = [makeFile(), makeFile("另一份.pdf")];
    render(<AttachmentPicker onFiles={receive} />);
    const area = screen.getByRole("group", { name: "添加附件" });
    const over = createEvent.dragOver(area, { dataTransfer: { files: [], types: ["Files"], dropEffect: "none" } });
    fireEvent(area, over); expect(over.defaultPrevented).toBe(true);
    const drop = dropFiles(area, files); expect(drop.defaultPrevented).toBe(true);
    expect(receive).toHaveBeenCalledExactlyOnceWith(files);
    await waitFor(() => expect(screen.getByRole("button", { name: "添加附件" })).not.toBeDisabled());
  });

  it("ignores text drags and drops without announcing file acceptance", () => {
    const receive = vi.fn(); render(<AttachmentPicker onFiles={receive} />);
    const area = screen.getByRole("group", { name: "添加附件" });
    const over = createEvent.dragOver(area, { dataTransfer: { files: [], types: ["text/plain"] } });
    fireEvent(area, over); expect(over.defaultPrevented).toBe(false);
    expect(dropFiles(area, [], ["text/plain"]).defaultPrevented).toBe(false);
    expect(receive).not.toHaveBeenCalled(); expect(screen.queryByText(/已接收|添加成功/)).not.toBeInTheDocument();
  });

  it.each(["disabled", "readOnly"] as const)("blocks native selection and file drops while %s", async mode => {
    const user = userEvent.setup(), receive = vi.fn();
    render(<AttachmentPicker onFiles={receive} {...{ [mode]: true }} />);
    const input = nativeInput(), open = vi.spyOn(input, "click"), button = screen.getByRole("button", { name: "添加附件" });
    expect(input).toBeDisabled(); expect(button).toBeDisabled();
    await user.click(button); expect(open).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { files: [makeFile()] } });
    expect(dropFiles(screen.getByRole("group", { name: "添加附件" }), [makeFile()]).defaultPrevented).toBe(true);
    expect(receive).not.toHaveBeenCalled();
  });

  it("rejects a multi-file drop in single-file mode and clears its readable error on the next valid selection", async () => {
    const receive = vi.fn(), selected = makeFile(); render(<AttachmentPicker onFiles={receive} multiple={false} />);
    expect(nativeInput()).not.toHaveAttribute("multiple");
    const area = screen.getByRole("group", { name: "添加附件" });
    dropFiles(area, [selected, makeFile("第二份.pdf")]);
    expect(receive).not.toHaveBeenCalled(); expect(screen.getByRole("alert")).toHaveTextContent("请选择一个文件");
    expect(screen.getByRole("button", { name: "添加附件" })).toHaveAccessibleDescription(expect.stringContaining("请选择一个文件"));
    expect(nativeInput()).toHaveAttribute("aria-invalid", "true");
    dropFiles(area, [selected]); expect(receive).toHaveBeenCalledExactlyOnceWith([selected]);
    await waitFor(() => expect(screen.queryByRole("alert")).not.toBeInTheDocument());
    expect(nativeInput()).not.toHaveAttribute("aria-invalid", "true");
  });

  it("reports a caller exception without claiming that files were accepted", async () => {
    const user = userEvent.setup();
    render(<AttachmentPicker onFiles={() => { throw new Error("附件数量已达到上限。"); }} />);
    await user.upload(nativeInput(), makeFile());
    expect(await screen.findByRole("alert")).toHaveTextContent("附件数量已达到上限。");
    expect(nativeInput()).toHaveValue(""); expect(screen.getByRole("button", { name: "添加附件" })).not.toBeDisabled();
    expect(screen.queryByText(/已接收|添加成功/)).not.toBeInTheDocument();
  });

  it("prevents duplicate intake while awaiting the caller and exposes asynchronous errors", async () => {
    let reject!: (error: Error) => void;
    const result = new Promise<void>((_, no) => { reject = no; }), receive = vi.fn(() => result);
    render(<AttachmentPicker onFiles={receive} />);
    const area = screen.getByRole("group", { name: "添加附件" });
    dropFiles(area, [makeFile()]); dropFiles(area, [makeFile("重复触发.pdf")]);
    expect(receive).toHaveBeenCalledTimes(1); expect(screen.getByRole("button", { name: "添加附件" })).toBeDisabled();
    await act(async () => reject(new Error("暂时无法添加，请重试。")));
    expect(screen.getByRole("alert")).toHaveTextContent("暂时无法添加，请重试。");
    expect(screen.getByRole("button", { name: "添加附件" })).not.toBeDisabled();
  });

  it("keeps labels and errors local when there are multiple pickers", () => {
    const receive = vi.fn(); render(<><AttachmentPicker onFiles={receive} multiple={false} /><AttachmentPicker onFiles={receive} label="替换课程封面" description="请选择新封面。" /></>);
    dropFiles(screen.getByRole("group", { name: "添加附件" }), [makeFile(), makeFile("第二份.pdf")]);
    expect(screen.getByRole("button", { name: "替换课程封面" })).toHaveAccessibleDescription(expect.stringContaining("请选择新封面。"));
    expect(screen.getByRole("button", { name: "替换课程封面" })).not.toHaveAccessibleDescription(expect.stringContaining("请选择一个文件"));
    expect(screen.getByLabelText("替换课程封面", { selector: "input" })).not.toHaveAttribute("aria-invalid", "true");
  });
});
