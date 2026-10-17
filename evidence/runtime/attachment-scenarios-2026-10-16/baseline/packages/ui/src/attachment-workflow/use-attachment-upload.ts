import { useCallback, useEffect, useId, useRef, useState } from "react";
import { validateAttachmentFiles } from "./attachment-file-utils";
import type { AttachmentConstraints, AttachmentRecord, AttachmentRejection, AttachmentRemoveHandler, AttachmentUploadHandler, AttachmentUploadStatus } from "./types";

export type UseAttachmentUploadOptions = {
  initialItems?: AttachmentRecord[];
  constraints?: AttachmentConstraints;
  upload?: AttachmentUploadHandler;
  onRemove?: AttachmentRemoveHandler;
  autoUpload?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (items: AttachmentRecord[]) => void;
};

type Task = { controller: AbortController; kind: "upload" | "remove" };
const inFlight = (status?: AttachmentUploadStatus) => status === "uploading" || status === "processing";
const errorMessage = (error: unknown) => error instanceof Error ? error.message : "操作未完成，请重试";

function checkIds(items: readonly AttachmentRecord[]) {
  if (items.some(item => !item.id) || new Set(items.map(item => item.id)).size !== items.length) {
    throw new Error("附件必须具有唯一且非空的 id");
  }
}

/** Owns a local draft; reset explicitly replaces it when the host loads another record. */
export function useAttachmentUpload(options: UseAttachmentUploadOptions = {}) {
  const opts = useRef(options);
  opts.current = options;
  const [items, setItems] = useState<AttachmentRecord[]>(() => {
    checkIds(options.initialItems ?? []);
    return [...options.initialItems ?? []];
  });
  const current = useRef(items);
  const [rejections, setRejections] = useState<AttachmentRejection[]>([]);
  const [removingIds, setRemovingIds] = useState<string[]>([]);
  const tasks = useRef(new Map<string, Task>());
  const mounted = useRef(true);
  const sequence = useRef(0);
  const prefix = useId();

  const abortAll = useCallback(() => {
    const previous = [...tasks.current.values()];
    tasks.current.clear();
    previous.forEach(task => task.controller.abort());
  }, []);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; abortAll(); };
  }, [abortAll]);

  const publish = useCallback((next: AttachmentRecord[]) => {
    if (!mounted.current) return;
    current.current = next;
    setItems(next);
    opts.current.onChange?.(next);
  }, []);
  const update = useCallback((id: string, change: (item: AttachmentRecord) => AttachmentRecord) => {
    publish(current.current.map(item => item.id === id ? change(item) : item));
  }, [publish]);
  const writable = useCallback(() => mounted.current && !opts.current.disabled && !opts.current.readOnly, []);

  const start = useCallback(async (id: string) => {
    if (!writable() || tasks.current.has(id)) return;
    const snapshot = current.current.find(item => item.id === id);
    if (!snapshot) return;
    const replacement = snapshot.replacement;
    const selected = replacement?.file ?? snapshot.file;
    if (!selected || (!replacement && (snapshot.status === undefined || snapshot.status === "done"))) return;
    if (replacement && snapshot.permissions?.replace === false) return;
    const patchUpload = (status: AttachmentUploadStatus, progress?: number, error?: string) => {
      update(id, item => replacement
        ? { ...item, replacement: { file: selected, status, progress, error } }
        : { ...item, status, progress, error });
    };
    const validation = validateAttachmentFiles([selected], current.current, opts.current.constraints, id);
    const rejection = validation.rejected[0];
    if (rejection) {
      setRejections(validation.rejected);
      patchUpload("error", undefined, rejection.reason);
      return;
    }
    const upload = opts.current.upload;
    if (!upload) { patchUpload("error", undefined, "尚未配置上传服务，文件仍保留在本页"); return; }
    const task: Task = { controller: new AbortController(), kind: "upload" };
    tasks.current.set(id, task);
    const active = () => mounted.current && tasks.current.get(id) === task && !task.controller.signal.aborted;
    patchUpload("uploading");
    try {
      const result = await upload(selected, {
        id, signal: task.controller.signal, replacing: replacement ? snapshot : undefined,
        onProgress: value => {
          if (!active()) return;
          const progress = value !== undefined && Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : undefined;
          update(id, item => replacement
            ? { ...item, replacement: { ...item.replacement!, progress } }
            : { ...item, progress });
        },
        onProcessing: () => {
          if (!active()) return;
          update(id, item => replacement
            ? { ...item, replacement: { ...item.replacement!, status: "processing" } }
            : { ...item, status: "processing" });
        },
      });
      if (!active()) return;
      update(id, item => replacement ? {
        ...item, name: selected.name, size: selected.size, type: selected.type, file: selected,
        url: undefined, previewUrl: undefined, thumbnailUrl: undefined, remoteId: undefined,
        uploadedBy: undefined, uploadedAt: undefined, availability: "available", availabilityMessage: undefined,
        ...result, status: "done", progress: 100, error: undefined, replacement: undefined,
      } : { ...item, ...result, status: "done", progress: 100, error: undefined });
    } catch (error) {
      if (active()) patchUpload("error", undefined, errorMessage(error));
    } finally {
      if (tasks.current.get(id) === task) tasks.current.delete(id);
    }
  }, [update, writable]);

  const addFiles = useCallback((files: readonly File[]) => {
    if (!writable()) return { accepted: [] as File[], rejected: [] as AttachmentRejection[] };
    const result = validateAttachmentFiles(files, current.current, opts.current.constraints);
    setRejections(result.rejected);
    const usedIds = new Set(current.current.map(item => item.id));
    const added: AttachmentRecord[] = result.accepted.map(file => {
      let id: string;
      do { id = "attachment-" + prefix + "-" + ++sequence.current; } while (usedIds.has(id));
      usedIds.add(id);
      return { id, name: file.name, size: file.size, type: file.type, file, status: "idle", availability: "available" };
    });
    if (added.length) {
      publish([...current.current, ...added]);
      if (opts.current.autoUpload) added.forEach(item => { void start(item.id); });
    }
    return result;
  }, [prefix, publish, start, writable]);

  const replaceFile = useCallback((id: string, file: File) => {
    const item = current.current.find(candidate => candidate.id === id);
    if (!writable() || !item || item.permissions?.replace === false || tasks.current.has(id)) {
      return { accepted: [] as File[], rejected: [] as AttachmentRejection[] };
    }
    const result = validateAttachmentFiles([file], current.current, opts.current.constraints, id);
    setRejections(result.rejected);
    if (result.accepted.length) {
      update(id, previous => ({ ...previous, replacement: { file, status: "idle" } }));
      if (opts.current.autoUpload) void start(id);
    }
    return result;
  }, [start, update, writable]);

  const cancel = useCallback((id: string) => {
    if (!writable()) return;
    const task = tasks.current.get(id);
    if (task?.kind === "remove") return;
    tasks.current.delete(id);
    task?.controller.abort();
    const item = current.current.find(candidate => candidate.id === id);
    if (!item) return;
    if (item.replacement) update(id, previous => ({ ...previous, replacement: undefined }));
    else if (item.status !== "done" && item.status !== undefined) {
      update(id, previous => ({ ...previous, status: "canceled", progress: undefined, error: undefined }));
    }
  }, [update, writable]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (!writable()) return false;
    const item = current.current.find(candidate => candidate.id === id);
    if (!item || item.permissions?.remove === false || tasks.current.get(id)?.kind === "remove") return false;
    const previous = tasks.current.get(id);
    tasks.current.delete(id);
    previous?.controller.abort();
    // A refused removal must leave a truthful canceled draft, not an abandoned "uploading" state.
    if (inFlight(item.replacement?.status)) update(id, value => ({ ...value, replacement: { ...value.replacement!, status: "canceled", progress: undefined } }));
    else if (inFlight(item.status)) update(id, value => ({ ...value, status: "canceled", progress: undefined }));
    const task: Task = { controller: new AbortController(), kind: "remove" };
    tasks.current.set(id, task);
    setRemovingIds(ids => [...ids, id]);
    try {
      await opts.current.onRemove?.(item, { signal: task.controller.signal });
      if (!mounted.current || tasks.current.get(id) !== task || task.controller.signal.aborted) return false;
      publish(current.current.filter(candidate => candidate.id !== id));
      return true;
    } catch (error) {
      if (mounted.current && tasks.current.get(id) === task && !task.controller.signal.aborted) throw error;
      return false;
    } finally {
      if (tasks.current.get(id) === task) {
        tasks.current.delete(id);
        if (mounted.current) setRemovingIds(ids => ids.filter(value => value !== id));
      }
    }
  }, [publish, update, writable]);

  const reset = useCallback((next: AttachmentRecord[] = []) => {
    checkIds(next);
    abortAll();
    if (!mounted.current) return;
    setRemovingIds([]);
    setRejections([]);
    publish([...next]);
  }, [abortAll, publish]);

  const pendingCount = items.filter(item => !!item.replacement || (item.status !== undefined && item.status !== "done")).length;
  const errorCount = items.filter(item => (item.replacement?.status ?? item.status) === "error").length;
  const uploadingCount = items.filter(item => inFlight(item.replacement?.status ?? item.status)).length;
  const totalSize = items.reduce((total, item) => {
    const value = item.replacement?.file.size ?? item.size ?? item.file?.size;
    return total + (value !== undefined && Number.isFinite(value) && value > 0 ? value : 0);
  }, 0);
  return {
    items, rejections, removingIds,
    summary: { count: items.length, totalSize, pendingCount, errorCount, uploadingCount, canSubmit: pendingCount === 0 && removingIds.length === 0 },
    addFiles, replaceFile, start, retry: start, cancel, remove, reset,
    clearRejections: useCallback(() => setRejections([]), []),
  };
}
