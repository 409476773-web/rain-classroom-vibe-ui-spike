import { createRef, useState } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AttachmentList } from "./attachment-list";
import type { AttachmentRecord } from "./types";

const photo: AttachmentRecord = { id: "photo", name: "课堂观察.jpg", type: "image/jpeg", size: 2048, url: "/photo.jpg" };
const paper: AttachmentRecord = { id: "paper", name: "需要完整查看的很长很长的课程资料文件名.pdf", type: "application/pdf", size: 1024, url: "/paper.pdf" };
beforeEach(() => {
  vi.stubGlobal("URL", class extends URL {
    static override createObjectURL = vi.fn(() => "blob:http://localhost/local");
    static override revokeObjectURL = vi.fn();
  });
});
async function menuAction(user: ReturnType<typeof userEvent.setup>, name: string, action: string) {
  await user.click(screen.getByRole("button", { name: "更多操作 " + name }));
  return screen.findByRole("menuitem", { name: action });
}
function defer() {
  let resolve!: () => void, reject!: (error: Error) => void;
  const promise = new Promise<void>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

describe("AttachmentList", () => {
  it("previews the actual image and exposes the full filename separately", async () => {
    const user = userEvent.setup();
    render(<AttachmentList items={[photo, paper]} />);
    await user.click(await menuAction(user, paper.name, "文件信息"));
    expect(screen.getByText(paper.name, { selector: "p" })).toBeVisible();
    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("button", { name: "预览 " + photo.name }));
    expect(screen.getByRole("dialog")).toHaveTextContent(photo.name);
    expect(screen.getByRole("img", { name: photo.name })).toHaveAttribute("src", photo.url);
  });

  it("falls back to the file icon when the thumbnail fails", () => {
    const { container } = render(<AttachmentList items={[photo]} />);
    fireEvent.error(screen.getByRole("img", { name: "缩略图 " + photo.name }));
    expect(screen.queryByRole("img", { name: "缩略图 " + photo.name })).not.toBeInTheDocument();
    expect(container.querySelector('[data-icon="icon/file-format-image-jpeg"]')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "预览 " + photo.name })).toBeInTheDocument();
  });

  it("removes independently from preview and returns focus to the neighbor then add entry", async () => {
    const user = userEvent.setup();
    function Host() {
      const [items, setItems] = useState([photo, paper]);
      const add = createRef<HTMLButtonElement>();
      return <><button ref={add}>添加附件</button><AttachmentList items={items} restoreFocusRef={add} onRemove={item => setItems(current => current.filter(value => value.id !== item.id))} /></>;
    }
    render(<Host />);
    await user.click(await menuAction(user, photo.name, "移除"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: "预览 " + paper.name })).toHaveFocus());
    await user.click(await menuAction(user, paper.name, "移除"));
    await waitFor(() => expect(screen.getByRole("button", { name: "添加附件" })).toHaveFocus());
    expect(screen.getByText("暂无附件")).toBeVisible();
  });

  it("shows failure without dropping the item and prevents a duplicate in-flight removal", async () => {
    const pending = defer(), onRemove = vi.fn(() => pending.promise);
    const user = userEvent.setup();
    render(<AttachmentList items={[photo]} onRemove={onRemove} />);
    const remove = await menuAction(user, photo.name, "移除");
    await user.click(remove);
    await user.click(screen.getByRole("button", { name: "更多操作 " + photo.name }));
    await user.click(await screen.findByRole("menuitem", { name: "移除" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    await act(async () => pending.reject(new Error("暂时无法移除")));
    expect(screen.getByRole("alert")).toHaveTextContent("暂时无法移除");
    expect(screen.getByRole("button", { name: "预览 " + photo.name })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "移除" })).not.toHaveAttribute("aria-disabled", "true");
  });

  it("keeps read-only preview and download available while blocking editing", async () => {
    const download = vi.fn(), remove = vi.fn(), replace = vi.fn();
    const user = userEvent.setup();
    render(<AttachmentList items={[photo]} readOnly onDownload={download} onRemove={remove} onReplace={replace} />);
    expect(screen.queryByRole("button", { name: "移除 " + photo.name })).toBeNull();
    expect(screen.queryByRole("button", { name: "替换 " + photo.name })).toBeNull();
    await user.click(screen.getByRole("button", { name: "下载 " + photo.name }));
    expect(download).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveTextContent("已发起下载");
    expect(screen.getByRole("button", { name: "预览 " + photo.name })).toBeEnabled();
  });

  it("allows a host download adapter to resolve a resource id without a public URL", async () => {
    const download = vi.fn(), user = userEvent.setup();
    render(<AttachmentList items={[{ id: "private", remoteId: "resource-1", name: "私有资料.txt" }]} onDownload={download} />);
    await user.click(screen.getByRole("button", { name: "下载 私有资料.txt" }));
    expect(download).toHaveBeenCalledTimes(1);
  });

  it("uses independent permissions and explains expired resources", async () => {
    const user = userEvent.setup(), download = vi.fn();
    render(<AttachmentList items={[
      { ...photo, permissions: { download: false }, permissionReasons: { download: "提供者不允许下载" } },
      { ...paper, availability: "expired" },
    ]} onDownload={download} />);
    expect(screen.getByRole("button", { name: "预览 " + photo.name })).toBeEnabled();
    expect(screen.queryByRole("button", { name: "下载 " + photo.name })).toBeNull();
    expect(screen.getByText("提供者不允许下载")).toBeVisible();
    expect(screen.getByText(/文件链接已失效/)).toBeVisible();
    expect(screen.queryByRole("button", { name: "下载 " + paper.name })).toBeNull();
    expect(download).not.toHaveBeenCalled();
  });

  it("passes the selected replacement File and resets the picker for repeated choices", async () => {
    const user = userEvent.setup(), replace = vi.fn();
    render(<AttachmentList items={[paper]} onReplace={replace} />);
    const input = screen.getByLabelText("选择替换文件 " + paper.name);
    const selected = new File(["new"], "新版.pdf", { type: "application/pdf" });
    await user.upload(input, selected);
    await user.upload(input, selected);
    expect(replace).toHaveBeenCalledTimes(2);
    expect(replace.mock.calls[0]).toEqual([paper, selected]);
  });

  it("exposes known and unknown progress and the original during replacement", () => {
    render(<AttachmentList items={[
      { ...photo, status: "uploading", progress: 35 },
      { ...paper, replacement: { file: new File(["x"], "新课件.pdf"), status: "processing" } },
    ]} onCancel={vi.fn()} />);
    expect(screen.getByRole("progressbar", { name: "上传进度 " + photo.name })).toHaveAttribute("aria-valuenow", "35");
    expect(screen.getByRole("progressbar", { name: "替换进度 " + paper.name })).not.toHaveAttribute("aria-valuenow");
    expect(screen.getByRole("button", { name: "预览 " + paper.name })).toBeInTheDocument();
    expect(screen.getByText(/新课件.pdf/)).toBeVisible();
    expect(screen.getByRole("button", { name: "取消替换 " + paper.name })).toBeEnabled();
  });

  it("allows abandoning a failed or waiting replacement while preserving the original", async () => {
    const cancel = vi.fn(), user = userEvent.setup();
    const { rerender } = render(<AttachmentList items={[{ ...paper, replacement: { file: new File(["x"], "new.pdf"), status: "error", error: "失败" } }]} onCancel={cancel} />);
    await user.click(screen.getByRole("button", { name: "取消替换 " + paper.name }));
    expect(cancel).toHaveBeenCalledTimes(1);
    rerender(<AttachmentList items={[{ ...paper, replacement: { file: new File(["x"], "new.pdf"), status: "idle" } }]} onCancel={cancel} />);
    expect(screen.getByRole("button", { name: "取消替换 " + paper.name })).toBeEnabled();
  });

  it("aborts an ongoing download when permission is withdrawn", async () => {
    let signal: AbortSignal | undefined;
    const pending = defer(), user = userEvent.setup();
    const onDownload = vi.fn((_item: AttachmentRecord, context: { signal: AbortSignal }) => { signal = context.signal; return pending.promise; });
    const { rerender } = render(<AttachmentList items={[photo]} onDownload={onDownload} />);
    await user.click(screen.getByRole("button", { name: "下载 " + photo.name }));
    rerender(<AttachmentList items={[{ ...photo, permissions: { download: false } }]} onDownload={onDownload} />);
    expect(signal?.aborted).toBe(true);
    await act(async () => pending.resolve());
    expect(screen.queryByText("已发起下载")).toBeNull();
  });

  it("does not reopen an old preview when the same id is refilled after removal", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<AttachmentList items={[photo]} />);
    await user.click(screen.getByRole("button", { name: "预览 " + photo.name }));
    rerender(<AttachmentList items={[]} />);
    rerender(<AttachmentList items={[{ ...photo, url: "/new-photo.jpg" }]} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps the latest removal focus task when an earlier removal fails", async () => {
    const first = defer(), second = defer(), user = userEvent.setup();
    function Host() {
      const [items, setItems] = useState([photo, { ...paper, permissions: { preview: false } }]);
      return <AttachmentList items={items} onRemove={async item => { await (item.id === photo.id ? first.promise : second.promise); setItems(current => current.filter(value => value.id !== item.id)); }} />;
    }
    render(<Host />);
    await user.click(await menuAction(user, photo.name, "移除"));
    await user.click(await menuAction(user, paper.name, "移除"));
    await act(async () => first.reject(new Error("移除失败")));
    await act(async () => second.resolve());
    await waitFor(() => expect(screen.getByRole("button", { name: "预览 " + photo.name })).toHaveFocus());
  });
});

// These check observable action availability and keyboard recovery, not CSS structure.
describe("AttachmentList compact actions", () => {
  it("returns focus from file information to the persistent more button", async () => {
    const user = userEvent.setup();
    render(<AttachmentList items={[paper]} />);
    await user.click(await menuAction(user, paper.name, "文件信息"));
    expect(screen.getByRole("dialog", { name: "文件信息" })).toBeVisible();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.getByRole("button", { name: "更多操作 " + paper.name })).toHaveFocus());
  });

  it("shows upload recovery without offering a download until completion", async () => {
    const retry = vi.fn(), user = userEvent.setup();
    const { rerender } = render(<AttachmentList items={[{ ...photo, status: "error" }]} onRetry={retry} />);
    expect(screen.queryByRole("button", { name: "下载 " + photo.name })).toBeNull();
    await user.click(screen.getByRole("button", { name: "重试上传 " + photo.name }));
    expect(retry).toHaveBeenCalledWith(expect.objectContaining({ id: photo.id }));
    rerender(<AttachmentList items={[photo]} onRetry={retry} />);
    expect(screen.getByRole("button", { name: "下载 " + photo.name })).toBeEnabled();
    expect(screen.queryByText("已就绪")).toBeNull();
  });

  it("exposes only allowed edit commands through the keyboard menu", async () => {
    const user = userEvent.setup();
    render(<AttachmentList items={[{ ...paper, permissions: { remove: false } }]} onRemove={vi.fn()} onReplace={vi.fn()} />);
    screen.getByRole("button", { name: "更多操作 " + paper.name }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "文件信息" })).toBeVisible();
    expect(screen.getByRole("menuitem", { name: "替换" })).toBeVisible();
    expect(screen.queryByRole("menuitem", { name: "移除" })).toBeNull();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.getByRole("button", { name: "更多操作 " + paper.name })).toHaveFocus());
  });
});

it("keeps the surrounding dark theme when opening a preview", async () => {
  const user = userEvent.setup();
  render(<div data-rain-theme="dark"><AttachmentList items={[photo]} /></div>);
  await user.click(screen.getByRole("button", { name: "预览 " + photo.name }));
  expect(screen.getByRole("dialog")).toHaveAttribute("data-rain-theme", "dark");
});
