import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useAttachmentUpload } from "./use-attachment-upload";
import type { AttachmentRecord, AttachmentUploadContext, AttachmentUploadResult } from "./types";

function deferred<T>() {
  let resolve!: (value: T) => void, reject!: (reason: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const file = (name = "观察记录.pdf", size = 4, lastModified = 1) => new File(["x".repeat(size)], name, { type: "application/pdf", lastModified });
const stored: AttachmentRecord = { id: "stored", name: "原课件.pdf", size: 12, type: "application/pdf", url: "/old.pdf", status: "done" };

describe("useAttachmentUpload", () => {
  it("avoids existing ids after reset and only removes the intended new record", async () => {
    const { result } = renderHook(() => useAttachmentUpload());
    act(() => { result.current.addFiles([file("first.pdf")]); });
    const prefix = result.current.items[0]!.id.replace(/-1$/, "-");
    const existing = [2, 3].map(number => ({ ...stored, id: prefix + number }));
    act(() => {
      result.current.reset(existing);
      result.current.addFiles([file("new-a.pdf"), file("new-b.pdf")]);
    });
    const ids = result.current.items.map(item => item.id);
    expect(new Set(ids).size).toBe(4);
    const addedId = result.current.items[2]!.id;
    await act(async () => { await result.current.remove(addedId); });
    expect(result.current.items).toHaveLength(3);
    expect(result.current.items.slice(0, 2)).toEqual(existing);
  });

  it("rechecks current constraints before manual upload and permits retry after correction", async () => {
    const upload = vi.fn(async () => ({ url: "/saved.pdf" }));
    const { result, rerender } = renderHook(({ maxFileSize }) => useAttachmentUpload({ constraints: { maxFileSize }, upload }), { initialProps: { maxFileSize: 10 } });
    const selected = file("large.pdf", 8);
    act(() => { result.current.addFiles([selected]); });
    const id = result.current.items[0]!.id;
    rerender({ maxFileSize: 4 });
    await act(async () => result.current.start(id));
    expect(upload).not.toHaveBeenCalled();
    expect(result.current.rejections).toEqual([{ file: selected, code: "size", reason: expect.any(String) }]);
    expect(result.current.items[0]).toMatchObject({ status: "error", file: selected });
    expect(result.current.summary.canSubmit).toBe(false);
    rerender({ maxFileSize: 10 });
    await act(async () => result.current.retry(id));
    expect(upload).toHaveBeenCalledTimes(1);
    expect(result.current.items[0]).toMatchObject({ status: "done", url: "/saved.pdf" });
  });

  it("rechecks total capacity against other pending replacements and preserves the original on rejection", async () => {
    const upload = vi.fn(async () => ({ url: "/replacement.pdf" }));
    const first = { ...stored, id: "first", size: 2 };
    const second = { ...stored, id: "second", size: 2 };
    const { result, rerender } = renderHook(({ maxTotalSize }) => useAttachmentUpload({ initialItems: [first, second], constraints: { maxTotalSize }, upload }), { initialProps: { maxTotalSize: 20 } });
    act(() => {
      result.current.replaceFile(first.id, file("first-new.pdf", 8));
      result.current.replaceFile(second.id, file("second-new.pdf", 8));
    });
    rerender({ maxTotalSize: 10 });
    await act(async () => result.current.retry(first.id));
    expect(upload).not.toHaveBeenCalled();
    expect(result.current.rejections[0]?.code).toBe("total-size");
    expect(result.current.items[0]).toMatchObject({ name: first.name, url: first.url, replacement: { status: "error" } });
    expect(result.current.items[1]?.replacement?.status).toBe("idle");
  });

  it("retains actual Files, accepts valid members and enforces count across rapid additions", () => {
    const { result } = renderHook(() => useAttachmentUpload({ constraints: { maxFiles: 2, maxFileSize: 8 } }));
    const first = file("第一份.pdf"), second = file("第二份.pdf");
    act(() => {
      result.current.addFiles([first, file("太大.pdf", 9)]);
      result.current.addFiles([second, file("第三份.pdf")]);
    });
    expect(result.current.items.map(item => item.file)).toEqual([first, second]);
    expect(result.current.rejections.map(item => item.code)).toEqual(["count"]);
    expect(result.current.summary.canSubmit).toBe(false);
    expect(result.current.summary.totalSize).toBe(8);
  });

  it("reports indeterminate progress and processing without declaring the transfer complete", async () => {
    const task = deferred<AttachmentUploadResult>();
    let context!: AttachmentUploadContext;
    const upload = vi.fn((_file: File, value: AttachmentUploadContext) => { context = value; return task.promise; });
    const onChange = vi.fn();
    const { result } = renderHook(() => useAttachmentUpload({ upload, autoUpload: true, onChange }));
    const selected = file();
    act(() => { result.current.addFiles([selected]); });
    expect(upload.mock.calls[0]![0]).toBe(selected);
    expect(result.current.items[0]!.status).toBe("uploading");
    expect(result.current.items[0]!.progress).toBeUndefined();
    act(() => context.onProgress(35));
    expect(result.current.items[0]!.progress).toBe(35);
    act(() => context.onProgress(undefined));
    expect(result.current.items[0]!.progress).toBeUndefined();
    act(() => { context.onProgress(100); context.onProcessing(); });
    expect(result.current.items[0]!.status).toBe("processing");
    expect(result.current.summary.canSubmit).toBe(false);
    await act(async () => { task.resolve({ url: "/saved.pdf", remoteId: "remote" }); });
    expect(result.current.items[0]).toMatchObject({ status: "done", url: "/saved.pdf", remoteId: "remote" });
    expect(result.current.summary.canSubmit).toBe(true);
    expect(onChange.mock.calls.at(-1)?.[0]).toEqual(result.current.items);
  });

  it("keeps successes and retries only the failed File", async () => {
    const upload = vi.fn(async (selected: File) => {
      if (selected.name === "失败.pdf" && upload.mock.calls.filter(([item]) => item === selected).length === 1) throw new Error("网络中断");
      return { url: "/saved/" + selected.name };
    });
    const { result } = renderHook(() => useAttachmentUpload({ upload, autoUpload: true }));
    const failedFile = file("失败.pdf");
    await act(async () => { result.current.addFiles([file("成功.pdf"), failedFile]); });
    expect(result.current.items.map(item => item.status)).toEqual(["done", "error"]);
    expect(result.current.items[1]!.error).toBe("网络中断");
    const failedId = result.current.items[1]!.id;
    await act(async () => result.current.retry(failedId));
    expect(result.current.items.map(item => item.status)).toEqual(["done", "done"]);
    expect(upload.mock.calls.at(-1)?.[0]).toBe(failedFile);
    expect(upload).toHaveBeenCalledTimes(3);
  });

  it("aborts canceled work and ignores its late progress and success after retry", async () => {
    const old = deferred<AttachmentUploadResult>(), fresh = deferred<AttachmentUploadResult>();
    const contexts: AttachmentUploadContext[] = [];
    const upload = vi.fn((_file: File, context: AttachmentUploadContext) => { contexts.push(context); return contexts.length === 1 ? old.promise : fresh.promise; });
    const { result } = renderHook(() => useAttachmentUpload({ upload, autoUpload: true }));
    act(() => { result.current.addFiles([file()]); });
    const id = result.current.items[0]!.id;
    act(() => result.current.cancel(id));
    expect(contexts[0]!.signal.aborted).toBe(true);
    expect(result.current.items[0]!.status).toBe("canceled");
    act(() => { void result.current.retry(id); });
    await act(async () => { contexts[0]!.onProgress(99); old.resolve({ url: "/stale" }); });
    expect(result.current.items[0]!.status).toBe("uploading");
    expect(result.current.items[0]!.url).toBeUndefined();
    await act(async () => fresh.resolve({ url: "/fresh" }));
    expect(result.current.items[0]!.url).toBe("/fresh");
  });

  it("prevents removed items from returning on late completion and permits choosing the same file again", async () => {
    const task = deferred<AttachmentUploadResult>();
    let signal!: AbortSignal;
    const { result } = renderHook(() => useAttachmentUpload({ autoUpload: true, upload: (_file, context) => { signal = context.signal; return task.promise; } }));
    const selected = file();
    act(() => { result.current.addFiles([selected]); });
    const oldId = result.current.items[0]!.id;
    await act(async () => { await result.current.remove(oldId); });
    expect(signal.aborted).toBe(true);
    await act(async () => task.resolve({ url: "/late" }));
    expect(result.current.items).toEqual([]);
    await act(async () => { result.current.addFiles([selected]); });
    expect(result.current.items[0]!.id).not.toBe(oldId);
  });

  it("keeps the original through replacement failure and atomically commits a successful retry", async () => {
    const first = deferred<AttachmentUploadResult>(), second = deferred<AttachmentUploadResult>();
    const upload = vi.fn((_file: File, _context: AttachmentUploadContext) => upload.mock.calls.length === 1 ? first.promise : second.promise);
    const { result } = renderHook(() => useAttachmentUpload({ initialItems: [stored], upload, autoUpload: true, constraints: { maxFiles: 1 } }));
    const replacement = file("新版.pdf");
    act(() => { result.current.replaceFile(stored.id, replacement); });
    expect(result.current.items[0]).toMatchObject({ name: stored.name, url: stored.url, replacement: { file: replacement, status: "uploading" } });
    expect(result.current.summary.canSubmit).toBe(false);
    expect(upload.mock.calls[0]![1]!.replacing?.url).toBe(stored.url);
    await act(async () => first.reject(new Error("替换失败")));
    expect(result.current.items[0]).toMatchObject({ name: stored.name, url: stored.url, replacement: { status: "error", error: "替换失败" } });
    act(() => { void result.current.retry(stored.id); });
    await act(async () => second.resolve({ url: "/new.pdf" }));
    expect(result.current.items[0]).toMatchObject({ id: stored.id, name: "新版.pdf", url: "/new.pdf", file: replacement, status: "done" });
    expect(result.current.items[0]!.replacement).toBeUndefined();
    expect(result.current.summary.canSubmit).toBe(true);
  });

  it("cancels a replacement without losing the original or committing its late result", async () => {
    const task = deferred<AttachmentUploadResult>();
    const { result } = renderHook(() => useAttachmentUpload({ initialItems: [stored], upload: () => task.promise, autoUpload: true }));
    act(() => { result.current.replaceFile(stored.id, file("新文件.pdf")); result.current.cancel(stored.id); });
    expect(result.current.items[0]).toMatchObject(stored);
    expect(result.current.items[0]!.replacement).toBeUndefined();
    await act(async () => task.resolve({ url: "/must-not-win" }));
    expect(result.current.items[0]!.url).toBe(stored.url);
  });

  it("keeps an attachment when its asynchronous removal fails and ignores stale removal after reset", async () => {
    const first = deferred<void>(), second = deferred<void>();
    const onRemove = vi.fn(() => onRemove.mock.calls.length === 1 ? first.promise : second.promise);
    const { result } = renderHook(() => useAttachmentUpload({ initialItems: [stored], onRemove }));
    let removal!: Promise<boolean>;
    act(() => { removal = result.current.remove(stored.id); });
    const failed = expect(removal).rejects.toThrow("没有移除权限");
    await act(async () => { first.reject(new Error("没有移除权限")); await failed; });
    expect(result.current.items).toEqual([stored]);
    act(() => { removal = result.current.remove(stored.id); result.current.reset([{ ...stored, name: "重新载入.pdf" }]); });
    await act(async () => { second.resolve(); await removal; });
    expect(result.current.items[0]!.name).toBe("重新载入.pdf");
  });

  it("aborts on unmount and reset, preserving the new snapshot against late errors", async () => {
    const tasks = [deferred<AttachmentUploadResult>(), deferred<AttachmentUploadResult>()];
    const contexts: AttachmentUploadContext[] = [];
    const onChange = vi.fn();
    const { result, unmount } = renderHook(() => useAttachmentUpload({ upload: (_file, context) => { contexts.push(context); return tasks[contexts.length - 1]!.promise; }, autoUpload: true, onChange }));
    act(() => { result.current.addFiles([file()]); result.current.reset([stored]); });
    expect(contexts[0]!.signal.aborted).toBe(true);
    await act(async () => tasks[0]!.reject(new Error("late")));
    expect(result.current.items).toEqual([stored]);
    act(() => { result.current.addFiles([file("另一份.pdf")]); });
    unmount();
    expect(contexts[1]!.signal.aborted).toBe(true);
    const count = onChange.mock.calls.length;
    await act(async () => tasks[1]!.resolve({ url: "/late-after-unmount" }));
    expect(onChange).toHaveBeenCalledTimes(count);
  });

  it("does not claim success without an upload adapter, and protects read-only records", async () => {
    const { result, rerender } = renderHook(({ readOnly }) => useAttachmentUpload({ initialItems: [stored], readOnly }), { initialProps: { readOnly: false } });
    act(() => { result.current.addFiles([file()]); });
    const id = result.current.items[1]!.id;
    await act(async () => result.current.start(id));
    expect(result.current.items[1]!.status).toBe("error");
    expect(result.current.items[1]!.error).toContain("上传");
    rerender({ readOnly: true });
    act(() => { result.current.addFiles([file("禁止.pdf")]); result.current.replaceFile(stored.id, file("禁止替换.pdf")); });
    await act(async () => { await result.current.remove(stored.id); });
    expect(result.current.items).toHaveLength(2);
    expect(result.current.items[0]).toEqual(stored);
  });
});
