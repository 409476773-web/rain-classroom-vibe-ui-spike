import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AttachmentUploadContext } from "../../../../../packages/ui/src/attachment-workflow/types";
import { createG6ReferenceService, mockG6Transcribe, mockG6Upload, useG6Composer } from "./g6-composer-adapters";

afterEach(() => { cleanup(); vi.useRealTimers(); });

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

const draft = (text: string) => ({ text, references: [] });

describe("G6 composer submission", () => {
  it("locks synchronously, fixes its snapshot, and clears only after acceptance", async () => {
    const request = deferred<void>();
    const submit = vi.fn<Parameters<typeof useG6Composer>[1]["submit"]>(() => request.promise);
    const { result } = renderHook(() => useG6Composer("course", { submit }));
    const reference = { id: "course-notes", name: "课程笔记", availability: "available" as const };
    act(() => result.current.setDraft({ text: "一个问题", references: [reference], reply: { messageId: "teacher", author: "教师", excerpt: "原问题" }, sourceScope: "selected" }));
    let pending!: Promise<void>;
    act(() => { pending = result.current.onSubmit(); void result.current.onSubmit(); });
    expect(submit).toHaveBeenCalledTimes(1);
    expect(result.current.submission.status).toBe("pending");
    expect(result.current.draft.text).toBe("一个问题");
    act(() => {
      result.current.setDraft(draft("冻结时的输入"));
      result.current.attachments.onFiles([new File(["x"], "pending.txt")]);
    });
    reference.name = "外部对象被改动";
    expect(result.current.draft.text).toBe("一个问题");
    expect(submit.mock.calls[0]?.[0].draft.references[0]?.name).toBe("课程笔记");
    expect(result.current.attachments.items).toHaveLength(0);
    await act(async () => { request.resolve(); await pending; });
    expect(result.current.draft).toEqual({ ...draft(""), sourceScope: "selected" });
    expect(result.current.submission.status).toBe("idle");
    await act(async () => result.current.onSubmit());
    expect(submit).toHaveBeenCalledTimes(1);
  });

  it("keeps rejected content, reuses the retry identity, and makes edited content a new submission", async () => {
    const submit = vi.fn<Parameters<typeof useG6Composer>[1]["submit"]>()
      .mockRejectedValueOnce(new Error("本地演示：发送失败"))
      .mockRejectedValueOnce(new Error("仍然失败"))
      .mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useG6Composer("discussion", { submit }));
    act(() => result.current.setDraft(draft("保留这段文字")));
    await act(async () => result.current.onSubmit());
    expect(result.current.draft.text).toBe("保留这段文字");
    expect(result.current.submission).toEqual({ status: "failed", message: "本地演示：发送失败" });
    await act(async () => result.current.onSubmit());
    expect(submit.mock.calls[1]?.[0].clientMessageId).toBe(submit.mock.calls[0]?.[0].clientMessageId);
    const revision = result.current.draftRevision;
    act(() => result.current.setDraft({ ...result.current.draft, sourceScope: "course" }));
    expect(result.current.submission).toEqual({ status: "idle" });
    expect(result.current.draftRevision).toBe(revision + 1);
    await act(async () => result.current.onSubmit());
    expect(submit.mock.calls[2]?.[0].clientMessageId).not.toBe(submit.mock.calls[0]?.[0].clientMessageId);
  });

  it("keeps an accepted reference-scoped draft quiet until the next message has content", async () => {
    const submit = vi.fn(async () => {});
    const { result } = renderHook(() => useG6Composer("course", { submit }));
    act(() => result.current.setDraft({ text: "请解释引用中的观察记录。", references: [{ id: "course-observation", name: "课堂观察记录", availability: "available" }], sourceScope: "references" }));
    await act(async () => result.current.onSubmit());
    expect(result.current.draft).toEqual({ text: "", references: [], sourceScope: "references" });
    expect(result.current.submitBlockedReason).toBeUndefined();
    expect(result.current.submitFeedbackReason).toBeUndefined();
    await act(async () => result.current.onSubmit());
    act(() => result.current.setDraft({ ...result.current.draft, text: "  \n " }));
    expect(result.current.submitBlockedReason).toBeUndefined();
    await act(async () => result.current.onSubmit());
    expect(submit).toHaveBeenCalledTimes(1);
    act(() => result.current.setDraft({ ...result.current.draft, text: "继续解释" }));
    expect(result.current.submitBlockedReason).toBe("请添加引用资料或更改范围。");
    expect(result.current.submitFeedbackReason).toBe("请添加引用资料或更改范围。");
    await act(async () => result.current.onSubmit());
    expect(submit).toHaveBeenCalledTimes(1);
    expect(result.current.draft.sourceScope).toBe("references");
  });

  it("rechecks an empty reference scope in the host before submitting", async () => {
    const submit = vi.fn(async () => {});
    const { result } = renderHook(() => useG6Composer("course", { submit }));
    act(() => result.current.setDraft({ text: "请解释引用资料。", references: [], sourceScope: "references" }));
    await act(async () => result.current.onSubmit());
    expect(submit).not.toHaveBeenCalled();
    expect(result.current.submitBlockedReason).toBe("请添加引用资料或更改范围。");
    expect(result.current.draft.text).toBe("请解释引用资料。");
  });

  it.each(["accepted", "rejected"] as const)("keeps B intact when A later becomes %s", async outcome => {
    const request = deferred<void>();
    const submit = vi.fn(() => request.promise);
    const upload = vi.fn(async () => ({ remoteId: "local:B-file", availability: "available" as const }));
    const { result, rerender } = renderHook(({ id }) => useG6Composer(id, { submit, upload }), { initialProps: { id: "A" } });
    act(() => result.current.setDraft(draft("A 的消息")));
    let pending!: Promise<void>;
    act(() => { pending = result.current.onSubmit(); });
    rerender({ id: "B" });
    act(() => result.current.setDraft(draft("B 的下一稿")));
    await act(async () => result.current.attachments.onFiles([new File(["b"], "B.txt")]));
    const fileId = result.current.attachments.items[0]?.id;
    await act(async () => {
      if (outcome === "accepted") request.resolve();
      else request.reject(new Error("A 的失败"));
      await pending;
    });
    expect(result.current.draft.text).toBe("B 的下一稿");
    expect(result.current.attachments.items[0]?.id).toBe(fileId);
    expect(result.current.attachments.items[0]?.status).toBe("done");
    expect(result.current.submission.status).toBe("idle");
    rerender({ id: "A" });
    expect(result.current.draft.text).toBe(outcome === "accepted" ? "" : "A 的消息");
    expect(result.current.submission.status).toBe(outcome === "accepted" ? "idle" : "failed");
  });

  it("reset aborts the current attempt and discards all of that conversation's draft", async () => {
    const request = deferred<void>();
    const submit = vi.fn<Parameters<typeof useG6Composer>[1]["submit"]>(() => request.promise);
    const { result } = renderHook(() => useG6Composer("A", { submit }));
    act(() => result.current.setDraft({ ...draft("旧稿"), reply: { messageId: "old", author: "教师", excerpt: "回复" } }));
    let pending!: Promise<void>;
    act(() => { pending = result.current.onSubmit(); result.current.resetDraft(); });
    expect(submit.mock.calls[0]?.[1].signal.aborted).toBe(true);
    act(() => result.current.setDraft(draft("新稿")));
    await act(async () => { request.resolve(); await pending; });
    expect(result.current.draft).toEqual(draft("新稿"));
    expect(result.current.submission.status).toBe("idle");
  });
});

describe("G6 composer attachment ownership", () => {
  it("saves the latest upload state atomically on switch and never routes late progress to another conversation", async () => {
    const jobs: { context: AttachmentUploadContext; request: ReturnType<typeof deferred<{ remoteId: string }>> }[] = [];
    const upload = vi.fn((_file: File, context: AttachmentUploadContext) => {
      const request = deferred<{ remoteId: string }>();
      jobs.push({ context, request });
      return request.promise;
    });
    const { result, rerender } = renderHook(({ id }) => useG6Composer(id, { submit: async () => {}, upload }), { initialProps: { id: "A" } });
    const aFile = new File(["a"], "A.txt");
    act(() => result.current.attachments.onFiles([aFile]));
    const aId = result.current.attachments.items[0]!.id;
    const revision = result.current.draftRevision;
    act(() => { jobs[0]!.context.onProgress(72); jobs[0]!.context.onProcessing(); });
    expect(result.current.draftRevision).toBe(revision);
    rerender({ id: "B" });
    expect(jobs[0]!.context.signal.aborted).toBe(true);
    expect(result.current.attachments.items).toEqual([]);
    const bFile = new File(["b"], "B.txt");
    act(() => result.current.attachments.onFiles([bFile]));
    const bId = result.current.attachments.items[0]!.id;
    await act(async () => {
      jobs[0]!.context.onProgress(99);
      jobs[0]!.request.resolve({ remoteId: "late-A" });
      await jobs[0]!.request.promise;
    });
    expect(result.current.attachments.items[0]?.id).toBe(bId);
    expect(result.current.attachments.items[0]?.remoteId).toBeUndefined();
    rerender({ id: "A" });
    expect(result.current.attachments.items).toEqual([expect.objectContaining({ id: aId, file: aFile, status: "canceled", progress: undefined })]);
    expect(result.current.draftRevision).toBe(revision);
    rerender({ id: "B" });
    expect(result.current.attachments.items).toEqual([expect.objectContaining({ id: bId, file: bFile, status: "canceled" })]);
  });

  it("preserves asynchronous remove rejection and clears a sending error when the user removes a file", async () => {
    const remove = vi.fn(async () => { throw new Error("关联解除失败"); });
    const submit = vi.fn(async () => { throw new Error("发送失败"); });
    const { result } = renderHook(() => useG6Composer("A", { submit, onRemove: remove, upload: async () => ({ remoteId: "local:file", availability: "available" }) }));
    await act(async () => result.current.attachments.onFiles([new File(["x"], "notes.txt")]));
    act(() => result.current.setDraft(draft("带附件")));
    await act(async () => result.current.onSubmit());
    expect(result.current.submission.status).toBe("failed");
    const id = result.current.attachments.items[0]!.id;
    await act(async () => { await expect(result.current.attachments.onRemove(id)).rejects.toThrow("关联解除失败"); });
    expect(result.current.attachments.items[0]?.id).toBe(id);
    expect(result.current.submission.status).toBe("idle");
    expect(remove).toHaveBeenCalledTimes(1);
  });

  it("requires ready, available remote attachments and an explicit attachment-only capability", async () => {
    const request = deferred<{ remoteId: string; availability: "forbidden" }>();
    const submit = vi.fn(async () => {});
    const { result } = renderHook(() => useG6Composer("A", { submit, upload: () => request.promise, allowAttachmentsOnly: true }));
    act(() => result.current.attachments.onFiles([new File(["x"], "notes.txt")]));
    await act(async () => result.current.onSubmit());
    expect(submit).not.toHaveBeenCalled();
    await act(async () => { request.resolve({ remoteId: "local:forbidden", availability: "forbidden" }); await request.promise; });
    await act(async () => result.current.onSubmit());
    expect(submit).not.toHaveBeenCalled();
    expect(result.current.submitBlockedReason).toMatch(/不可用/);
    expect(result.current.submitFeedbackReason).toBeUndefined();
  });

  it("enables ready attachment-only messages only after the host explicitly opts in", async () => {
    const submit = vi.fn<Parameters<typeof useG6Composer>[1]["submit"]>(async () => {});
    const upload = vi.fn(async () => ({ remoteId: "local-demo:ready", availability: "available" as const }));
    const { result, rerender } = renderHook(({ allow }) => useG6Composer("A", { submit, upload, allowAttachmentsOnly: allow }), { initialProps: { allow: false } });
    await act(async () => result.current.attachments.onFiles([new File(["x"], "ready.txt")]));
    await act(async () => result.current.onSubmit());
    expect(submit).not.toHaveBeenCalled();
    expect(result.current.submitFeedbackReason).toBe("请补充问题正文后再发送附件。");
    rerender({ allow: true });
    await act(async () => result.current.onSubmit());
    expect(submit.mock.calls[0]?.[0].attachments).toEqual([expect.objectContaining({ name: "ready.txt", remoteId: "local-demo:ready", status: "done" })]);
    expect(result.current.attachments.items).toEqual([]);
  });

  it("rechecks missing references when the next message contains only an allowed attachment", async () => {
    const submit = vi.fn(async () => {});
    const { result } = renderHook(() => useG6Composer("A", {
      submit, allowAttachmentsOnly: true,
      upload: async () => ({ remoteId: "local:file", availability: "available" }),
    }));
    act(() => result.current.setDraft({ ...draft(""), sourceScope: "references" }));
    expect(result.current.submitBlockedReason).toBeUndefined();
    await act(async () => result.current.attachments.onFiles([new File(["x"], "notes.txt")]));
    expect(result.current.submitBlockedReason).toBe("请添加引用资料或更改范围。");
    await act(async () => result.current.onSubmit());
    expect(submit).not.toHaveBeenCalled();
    expect(result.current.attachments.items).toHaveLength(1);
  });

  it("changes an upload wait reason into an actionable failure or cancellation reason", async () => {
    const jobs: { context: AttachmentUploadContext; request: ReturnType<typeof deferred<{ remoteId: string; availability: "available" }>> }[] = [];
    const submit = vi.fn(async () => {});
    const { result } = renderHook(() => useG6Composer("A", {
      submit, allowAttachmentsOnly: true,
      upload: (_file, context) => {
        const request = deferred<{ remoteId: string; availability: "available" }>();
        jobs.push({ context, request });
        return request.promise;
      },
    }));
    act(() => result.current.attachments.onFiles([new File(["x"], "notes.txt")]));
    const id = result.current.attachments.items[0]!.id;
    expect(result.current.submitBlockedReason).toBe("附件正在上传，请稍候");
    expect(result.current.submitFeedbackReason).toBeUndefined();
    act(() => jobs[0]!.context.onProcessing());
    expect(result.current.submitBlockedReason).toBe("附件正在处理，请稍候");
    expect(result.current.submitFeedbackReason).toBeUndefined();
    await act(async () => { jobs[0]!.request.reject(new Error("连接中断")); await Promise.resolve(); });
    expect(result.current.submitBlockedReason).toBe("附件上传失败，请重试或移除");
    expect(result.current.submitFeedbackReason).toBeUndefined();
    await act(async () => result.current.onSubmit());
    expect(submit).not.toHaveBeenCalled();
    act(() => result.current.attachments.onRetry(id));
    expect(result.current.submitBlockedReason).toBe("附件正在上传，请稍候");
    act(() => result.current.attachments.onCancel(id));
    expect(result.current.submitBlockedReason).toBe("附件上传已取消，请重试或移除");
    expect(result.current.submitFeedbackReason).toBeUndefined();
    await act(async () => result.current.onSubmit());
    expect(submit).not.toHaveBeenCalled();
    act(() => result.current.attachments.onRetry(id));
    await act(async () => { jobs[2]!.request.resolve({ remoteId: "local:file", availability: "available" }); await jobs[2]!.request.promise; });
    expect(result.current.submitBlockedReason).toBeUndefined();
    await act(async () => result.current.onSubmit());
    expect(submit).toHaveBeenCalledTimes(1);
  });

  it("keeps an independent host restriction visible alongside a failed local upload", async () => {
    const submit = vi.fn(async () => {});
    const { result, rerender } = renderHook(({ reason }) => useG6Composer("A", {
      submit, allowAttachmentsOnly: true, submitBlockedReason: reason,
      upload: async () => { throw new Error("连接中断"); },
    }), { initialProps: { reason: "本课程已结束" as string | undefined } });
    await act(async () => result.current.attachments.onFiles([new File(["x"], "notes.txt")]));
    expect(result.current.attachments.items[0]?.status).toBe("error");
    expect(result.current.submitBlockedReason).toBe("本课程已结束");
    expect(result.current.submitFeedbackReason).toBe("本课程已结束");
    await act(async () => result.current.onSubmit());
    expect(submit).not.toHaveBeenCalled();
    rerender({ reason: undefined });
    expect(result.current.submitBlockedReason).toBe("附件上传失败，请重试或移除");
    expect(result.current.submitFeedbackReason).toBeUndefined();
  });

  it("still explains a ready-looking attachment whose upload returned no remote identity", async () => {
    const submit = vi.fn(async () => {});
    const { result } = renderHook(() => useG6Composer("A", {
      submit, allowAttachmentsOnly: true, upload: async () => ({ availability: "available" }),
    }));
    await act(async () => result.current.attachments.onFiles([new File(["x"], "notes.txt")]));
    expect(result.current.attachments.items[0]).toMatchObject({ status: "done", availability: "available" });
    expect(result.current.submitBlockedReason).toBe("部分附件不可用，请移除或重新上传");
    expect(result.current.submitFeedbackReason).toBe("部分附件不可用，请移除或重新上传");
    await act(async () => result.current.onSubmit());
    expect(submit).not.toHaveBeenCalled();
  });

  it("does not retain an aborted removal lock when returning to a conversation", async () => {
    const removal = deferred<void>();
    const { result, rerender } = renderHook(({ id }) => useG6Composer(id, {
      submit: async () => {},
      upload: async () => ({ remoteId: "local-demo:file", availability: "available" }),
      onRemove: () => removal.promise,
    }), { initialProps: { id: "A" } });
    await act(async () => result.current.attachments.onFiles([new File(["x"], "keep.txt")]));
    act(() => result.current.setDraft(draft("保留内容")));
    let removed!: Promise<boolean>;
    act(() => { removed = result.current.attachments.onRemove(result.current.attachments.items[0]!.id); });
    expect(result.current.submitBlockedReason).toMatch(/正在移除/);
    rerender({ id: "B" });
    rerender({ id: "A" });
    expect(result.current.submitBlockedReason).toBeUndefined();
    expect(result.current.attachments.removingIds).toEqual([]);
    await act(async () => { removal.resolve(); expect(await removed).toBe(false); });
    expect(result.current.attachments.items).toHaveLength(1);
  });

  it("keeps the new removal locked if an older aborted removal completes after a switch", async () => {
    const requests = [deferred<void>(), deferred<void>()];
    let index = 0;
    const { result, rerender } = renderHook(({ id }) => useG6Composer(id, {
      submit: async () => {},
      upload: async () => ({ remoteId: "local-demo:file", availability: "available" }),
      onRemove: () => requests[index++]!.promise,
    }), { initialProps: { id: "A" } });
    await act(async () => result.current.attachments.onFiles([new File(["x"], "keep.txt")]));
    act(() => result.current.setDraft(draft("保留内容")));
    const id = result.current.attachments.items[0]!.id;
    let first!: Promise<boolean>, second!: Promise<boolean>;
    act(() => { first = result.current.attachments.onRemove(id); });
    rerender({ id: "B" });
    rerender({ id: "A" });
    act(() => { second = result.current.attachments.onRemove(id); });
    await act(async () => { requests[0]!.resolve(); expect(await first).toBe(false); });
    expect(result.current.submitBlockedReason).toMatch(/正在移除/);
    await act(async () => { requests[1]!.resolve(); expect(await second).toBe(true); });
    expect(result.current.attachments.items).toEqual([]);
  });
});

describe("explicit local demonstration services", () => {
  it("searches and resolves three local references without silently losing unavailable ids", async () => {
    const service = createG6ReferenceService();
    const signal = new AbortController().signal;
    const items = await service.query("", { signal });
    expect(items).toHaveLength(3);
    expect(await service.query("课堂观察", { signal })).toContainEqual(items[0]);
    expect(await service.resolve([items[0]!.id, "deleted"], { signal })).toEqual([items[0], expect.objectContaining({ id: "deleted", availability: "unavailable" })]);
    const controller = new AbortController();
    controller.abort();
    await expect(service.resolve([], { signal: controller.signal })).rejects.toMatchObject({ name: "AbortError" });
  });

  it("marks upload results as local demonstration records, reports processing, and supports cancel", async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const onProcessing = vi.fn();
    const context = { id: "demo", signal: controller.signal, onProgress: vi.fn(), onProcessing };
    const uploaded = mockG6Upload(new File(["a"], "notes.txt"), context);
    await vi.runAllTimersAsync();
    expect(await uploaded).toMatchObject({ remoteId: expect.stringMatching(/^local-demo:/), availability: "available" });
    expect(onProcessing).toHaveBeenCalledTimes(1);
    const canceled = mockG6Upload(new File(["b"], "cancel.txt"), context);
    const rejection = expect(canceled).rejects.toMatchObject({ name: "AbortError" });
    controller.abort();
    await rejection;
  });

  it("labels simulated transcription and cancels a pending request", async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const result = mockG6Transcribe(new Blob(["audio"]), { signal: controller.signal, mimeType: "audio/webm" });
    await vi.runAllTimersAsync();
    expect(await result).toMatch(/模拟转写/);
    const canceled = mockG6Transcribe(new Blob(["audio"]), { signal: controller.signal, mimeType: "audio/webm" });
    const rejection = expect(canceled).rejects.toMatchObject({ name: "AbortError" });
    controller.abort();
    await rejection;
  });
});
