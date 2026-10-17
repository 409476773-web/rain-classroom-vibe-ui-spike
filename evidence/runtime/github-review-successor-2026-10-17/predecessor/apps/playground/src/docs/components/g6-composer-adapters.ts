import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAttachmentUpload } from "../../../../../packages/ui/src/attachment-workflow/use-attachment-upload";
import type { AttachmentConstraints, AttachmentRecord, AttachmentRemoveHandler, AttachmentUploadHandler } from "../../../../../packages/ui/src/attachment-workflow/types";
import type { ComposerAttachments, ComposerDraft, ComposerReference, ComposerReferenceService, ComposerSubmission, ComposerTranscribe } from "../../../../../packages/ui/src/conversation-composer/types";

export type G6ComposerSnapshot = { draft: ComposerDraft; attachments: AttachmentRecord[]; clientMessageId: string };
export type G6ComposerOptions = {
  submit: (snapshot: G6ComposerSnapshot, context: { signal: AbortSignal }) => Promise<void>;
  upload?: AttachmentUploadHandler;
  constraints?: AttachmentConstraints;
  onRemove?: AttachmentRemoveHandler;
  allowAttachmentsOnly?: boolean;
  submitBlockedReason?: string;
};
type Attempt = { revision: number; clientMessageId: string; controller: AbortController };
type ConversationDraft = {
  draft: ComposerDraft;
  revision: number;
  attachments: AttachmentRecord[];
  submission: ComposerSubmission;
  pending?: Attempt;
  failure?: { revision: number; clientMessageId: string };
  removing: Map<string, symbol>;
};

const emptyDraft = (): ComposerDraft => ({ text: "", references: [] });
const copyDraft = (draft: ComposerDraft): ComposerDraft => ({ ...draft, references: draft.references.map(item => ({ ...item })), reply: draft.reply ? { ...draft.reply } : undefined });
const copyAttachment = (item: AttachmentRecord): AttachmentRecord => ({ ...item, permissions: item.permissions ? { ...item.permissions } : undefined, permissionReasons: item.permissionReasons ? { ...item.permissionReasons } : undefined, replacement: item.replacement ? { ...item.replacement } : undefined });
const inFlight = (status?: AttachmentRecord["status"]) => status === "uploading" || status === "processing";
const freezeUploads = (items: AttachmentRecord[]) => items.map(item => ({
  ...item,
  ...(inFlight(item.status) ? { status: "canceled" as const, progress: undefined, error: undefined } : {}),
  ...(item.replacement && inFlight(item.replacement.status) ? { replacement: { ...item.replacement, status: "canceled" as const, progress: undefined, error: undefined } } : {}),
}));

function sameDraft(a: ComposerDraft, b: ComposerDraft) {
  return a.text === b.text && a.sourceScope === b.sourceScope
    && a.reply?.messageId === b.reply?.messageId && a.reply?.author === b.reply?.author && a.reply?.excerpt === b.reply?.excerpt
    && a.references.length === b.references.length && a.references.every((item, index) => {
      const other = b.references[index];
      return item.id === other?.id && item.name === other.name && item.availability === other.availability && item.unavailableReason === other.unavailableReason;
    });
}

function hasMessageContent(state: ConversationDraft, options: G6ComposerOptions) {
  return Boolean(state.draft.text.trim() || (options.allowAttachmentsOnly && state.attachments.length));
}

function blockReason(state: ConversationDraft, options: G6ComposerOptions) {
  if (options.submitBlockedReason) return options.submitBlockedReason;
  if (state.pending) return "正在发送，请稍候";
  if (state.removing.size) return "正在移除附件，请稍候";
  const unfinished = state.attachments.find(item => item.replacement || (item.status !== undefined && item.status !== "done"));
  if (unfinished) {
    const subject = unfinished.replacement ? "替换附件" : "附件";
    const recovery = unfinished.replacement ? "请重试或取消替换" : "请重试或移除";
    switch (unfinished.replacement?.status ?? unfinished.status) {
      case "error": return `${subject}上传失败，${recovery}`;
      case "canceled": return `${subject}上传已取消，${recovery}`;
      case "uploading": return `${subject}正在上传，请稍候`;
      case "processing": return `${subject}正在处理，请稍候`;
      default: return `${subject}等待上传，${recovery}`;
    }
  }
  if (state.attachments.some(item => !item.remoteId || item.availability !== "available")) return "部分附件不可用，请移除或重新上传";
  if (state.draft.references.some(item => item.availability !== "available")) return "部分课程资料不可用，请重新选择";
  if (state.draft.sourceScope === "references" && !state.draft.references.length && hasMessageContent(state, options)) return "请添加引用资料或更改范围。";
  if (state.attachments.length && !hasMessageContent(state, options)) return "请补充问题正文后再发送附件。";
  return undefined;
}

function feedbackReason(state: ConversationDraft, options: G6ComposerOptions) {
  const reason = blockReason(state, options);
  if (!reason || options.submitBlockedReason) return reason;
  if (state.pending || state.removing.size || state.attachments.some(item => item.replacement || (item.status !== undefined && item.status !== "done"))) return undefined;
  // Missing remote identity or availability has no local file-state explanation.
  if (state.attachments.some(item => item.availability === undefined || (item.availability === "available" && !item.remoteId))) return reason;
  if (state.attachments.some(item => item.availability !== "available") || state.draft.references.some(item => item.availability !== "available")) return undefined;
  return reason;
}

/** Page-local demonstration state. Reloading does not persist File, Blob, or drafts. */
export function useG6Composer(conversationId: string, options: G6ComposerOptions) {
  const sessions = useRef(new Map<string, ConversationDraft>());
  const owner = useRef(conversationId);
  const latestAttachments = useRef<AttachmentRecord[]>([]);
  const opts = useRef(options);
  opts.current = options;
  const mounted = useRef(true);
  const sequence = useRef(0);
  const identity = useRef<string | undefined>(undefined);
  const [, render] = useState(0);
  const refresh = useCallback(() => { if (mounted.current) render(value => value + 1); }, []);
  const getSession = useCallback((id: string) => {
    let state = sessions.current.get(id);
    if (!state) {
      state = { draft: emptyDraft(), revision: 0, attachments: [], submission: { status: "idle" }, removing: new Map() };
      sessions.current.set(id, state);
    }
    return state;
  }, []);
  const current = getSession(conversationId);
  const changed = useCallback((state: ConversationDraft) => {
    state.revision += 1;
    state.failure = undefined;
    state.submission = { status: "idle" };
    refresh();
  }, [refresh]);
  const upload = useAttachmentUpload({
    autoUpload: true,
    upload: options.upload,
    constraints: options.constraints,
    onRemove: options.onRemove,
    disabled: !!current.pending,
    onChange: items => {
      // The ref is the current engine snapshot, even before React renders progress.
      latestAttachments.current = items;
      getSession(owner.current).attachments = items;
    },
  });

  useLayoutEffect(() => {
    if (owner.current === conversationId) return;
    // Save A before reset publishes B. reset aborts even if A was disabled.
    const previous = getSession(owner.current);
    previous.attachments = freezeUploads(latestAttachments.current);
    previous.removing.clear();
    owner.current = conversationId;
    latestAttachments.current = getSession(conversationId).attachments;
    upload.reset(latestAttachments.current);
  }, [conversationId, getSession, upload.reset]);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      for (const state of sessions.current.values()) state.pending?.controller.abort();
    };
  }, []);

  const writable = () => owner.current === conversationId && !getSession(conversationId).pending;
  const setDraft = (next: ComposerDraft) => {
    const state = getSession(conversationId);
    if (!writable() || sameDraft(state.draft, next)) return;
    state.draft = copyDraft(next);
    changed(state);
  };
  const attachments: ComposerAttachments = {
    items: owner.current === conversationId ? upload.items : current.attachments,
    constraints: options.constraints,
    rejections: upload.rejections,
    removingIds: upload.removingIds,
    onClearRejections: upload.clearRejections,
    onFiles: files => {
      if (!writable()) return;
      const result = upload.addFiles(files);
      if (result.accepted.length) changed(getSession(conversationId));
    },
    onRetry: id => {
      if (!writable()) return;
      const item = latestAttachments.current.find(value => value.id === id);
      if (!item || (!item.replacement && (item.status === "done" || item.status === undefined)) || getSession(conversationId).removing.has(id)) return;
      changed(getSession(conversationId));
      void upload.retry(id);
    },
    onCancel: id => {
      if (!writable()) return;
      const item = latestAttachments.current.find(value => value.id === id);
      if (!item || (!item.replacement && (item.status === "done" || item.status === undefined)) || getSession(conversationId).removing.has(id)) return;
      changed(getSession(conversationId));
      upload.cancel(id);
    },
    onRemove: async id => {
      if (!writable()) return false;
      const state = getSession(conversationId);
      const item = latestAttachments.current.find(value => value.id === id);
      if (!item || item.permissions?.remove === false || state.removing.has(id)) return false;
      const removal = Symbol();
      state.removing.set(id, removal);
      changed(state);
      try { return await upload.remove(id); }
      finally { if (state.removing.get(id) === removal) state.removing.delete(id); refresh(); }
    },
  };
  const onSubmit = async () => {
    const state = getSession(conversationId);
    if (!writable() || !hasMessageContent(state, opts.current) || blockReason(state, opts.current)) return;
    identity.current ??= globalThis.crypto?.randomUUID?.() ?? `page-${Date.now()}`;
    const attempt: Attempt = {
      revision: state.revision,
      clientMessageId: state.failure?.revision === state.revision ? state.failure.clientMessageId : `g6-${identity.current}-${++sequence.current}`,
      controller: new AbortController(),
    };
    const snapshot: G6ComposerSnapshot = { draft: copyDraft(state.draft), attachments: state.attachments.map(copyAttachment), clientMessageId: attempt.clientMessageId };
    // This synchronous lock also protects a second click before React renders.
    state.pending = attempt;
    state.submission = { status: "pending" };
    refresh();
    try {
      await opts.current.submit(snapshot, { signal: attempt.controller.signal });
      if (!mounted.current || state.pending !== attempt || attempt.controller.signal.aborted) return;
      state.pending = undefined;
      state.failure = undefined;
      state.submission = { status: "idle" };
      if (state.revision === attempt.revision) {
        state.draft = { ...emptyDraft(), sourceScope: state.draft.sourceScope };
        state.attachments = [];
        if (owner.current === conversationId) {
          latestAttachments.current = [];
          upload.reset([]);
        }
      }
    } catch (error) {
      if (!mounted.current || state.pending !== attempt || attempt.controller.signal.aborted) return;
      state.pending = undefined;
      state.failure = { revision: attempt.revision, clientMessageId: attempt.clientMessageId };
      state.submission = { status: "failed", message: error instanceof Error ? error.message : "发送未成功，内容已保留，请重试" };
    } finally { refresh(); }
  };
  const resetDraft = () => {
    if (owner.current !== conversationId) return;
    const state = getSession(conversationId);
    state.pending?.controller.abort();
    state.pending = undefined;
    state.draft = emptyDraft();
    state.attachments = [];
    state.removing.clear();
    latestAttachments.current = [];
    changed(state);
    upload.reset([]);
  };

  return { draft: current.draft, draftRevision: current.revision, setDraft, attachments, submission: current.submission, submitBlockedReason: blockReason(current, options), submitFeedbackReason: feedbackReason(current, options), onSubmit, resetDraft };
}

const localReferences: ComposerReference[] = [
  { id: "course-observation", name: "课堂观察记录与同伴反馈说明.pdf", availability: "available" },
  { id: "course-evidence", name: "从课堂证据到学习判断.pdf", availability: "available" },
  { id: "course-feedback", name: "课堂提问与反馈案例.pdf", availability: "available" },
];

const abortError = () => new DOMException("本地演示操作已取消", "AbortError");
function checkAbort(signal: AbortSignal) { if (signal.aborted) throw abortError(); }
function demoDelay(duration: number, signal: AbortSignal) {
  checkAbort(signal);
  return new Promise<void>((resolve, reject) => {
    const cancel = () => { clearTimeout(timer); signal.removeEventListener("abort", cancel); reject(abortError()); };
    const timer = setTimeout(() => { signal.removeEventListener("abort", cancel); resolve(); }, duration);
    signal.addEventListener("abort", cancel, { once: true });
  });
}

/** Three fixed course materials for this local demo; no remote search or permission check. */
export function createG6ReferenceService(): ComposerReferenceService {
  return {
    query: async (query, { signal }) => {
      checkAbort(signal);
      const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
      return localReferences.filter(item => words.every(word => item.name.toLocaleLowerCase().includes(word))).map(item => ({ ...item }));
    },
    resolve: async (ids, { signal }) => {
      checkAbort(signal);
      return ids.map(id => {
        const found = localReferences.find(item => item.id === id);
        return found ? { ...found } : { id, name: "不可用的课程资料", availability: "unavailable", unavailableReason: "此资料不在本地演示课程中" };
      });
    },
  };
}

/** Simulates upload and processing locally; local-demo IDs are not server resources. */
export const mockG6Upload: AttachmentUploadHandler = async (_file, context) => {
  await demoDelay(180, context.signal);
  context.onProgress(35);
  await demoDelay(220, context.signal);
  context.onProgress(100);
  context.onProcessing();
  await demoDelay(180, context.signal);
  return { remoteId: `local-demo:${context.id}`, availability: "available" };
};

/** A fixed simulated transcript. It does not recognize audio or contact an ASR service. */
export const mockG6Transcribe: ComposerTranscribe = async (_blob, { signal }) => {
  await demoDelay(600, signal);
  return "【模拟转写】请结合课堂观察记录，再举一个事实与解释的例子。";
};
