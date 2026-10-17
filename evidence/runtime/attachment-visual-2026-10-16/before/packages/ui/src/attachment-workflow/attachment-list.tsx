import { useEffect, useRef, useState, type RefObject } from "react";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "../attachment/attachment";
import { FileIcon } from "../icons/file";
import { FileFormatPdfOutlineIcon } from "../icons/file-format-pdf-outline";
import { FileFormatDocxOutlineIcon } from "../icons/file-format-docx-outline";
import { FileFormatXlsxOutlineIcon } from "../icons/file-format-xlsx-outline";
import { FileFormatPptOutlineIcon } from "../icons/file-format-ppt-outline";
import { FileFormatZipOutlineIcon } from "../icons/file-format-zip-outline";
import { FileFormatAudioOutlineIcon } from "../icons/file-format-audio-outline";
import { FileFormatVideoOutlineIcon } from "../icons/file-format-video-outline";
import { FileFormatTxtOutlineIcon } from "../icons/file-format-txt-outline";
import { ImageIcon } from "../icons/image";
import { Popover } from "../popover/popover";
import { Progress } from "../progress/progress";
import { rainCn } from "../utils/rain-class-names";
import { attachmentTypeLabel, formatAttachmentSize, getAttachmentKind, isSafeAttachmentUrl } from "./attachment-file-utils";
import { AttachmentPreview } from "./attachment-preview";
import { downloadAttachment, useAttachmentObjectUrl } from "./attachment-resources";
import type { AttachmentRecord } from "./types";
import "./attachment-list.css";

export type AttachmentListProps = {
  items: readonly AttachmentRecord[];
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  restoreFocusRef?: RefObject<HTMLElement | null>;
  onDownload?: (item: AttachmentRecord, context: { signal: AbortSignal }) => void | Promise<void>;
  onRemove?: (item: AttachmentRecord) => void | boolean | Promise<void | boolean>;
  onReplace?: (item: AttachmentRecord, file: File) => void | Promise<void>;
  onStart?: (item: AttachmentRecord) => void;
  onRetry?: (item: AttachmentRecord) => void;
  onCancel?: (item: AttachmentRecord) => void;
};
const icons = { image: ImageIcon, pdf: FileFormatPdfOutlineIcon, document: FileFormatDocxOutlineIcon,
  spreadsheet: FileFormatXlsxOutlineIcon, presentation: FileFormatPptOutlineIcon, archive: FileFormatZipOutlineIcon,
  audio: FileFormatAudioOutlineIcon, video: FileFormatVideoOutlineIcon, text: FileFormatTxtOutlineIcon, file: FileIcon };
const states = { idle: "等待上传", uploading: "正在上传", processing: "正在处理", error: "上传失败", canceled: "已取消上传", done: "已就绪" };
const unavailable = { processing: "文件仍在处理中", forbidden: "你没有访问此文件的权限", missing: "文件已被删除或不存在", expired: "文件链接已失效，请联系提供者更新" };

function AttachmentRow({ item, readOnly, disabled, onDownload, onRemove, onReplace, onStart, onRetry, onCancel, onPreview, triggerRef }: Omit<AttachmentListProps, "items"> & {
  item: AttachmentRecord;
  onPreview: (element: HTMLElement) => void;
  triggerRef: (element: HTMLButtonElement | null) => void;
}) {
  const [failedThumbnail, setFailedThumbnail] = useState<string>();
  const [busy, setBusy] = useState<string>();
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const operation = useRef<AbortController | null>(null), input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setError(""); setNotice(""); setBusy(undefined);
    return () => { operation.current?.abort(); operation.current = null; };
  }, [item.id, item.file, item.url, item.permissions?.download, item.availability, disabled]);
  const kind = getAttachmentKind(item), Icon = icons[kind];
  const blocked = item.availability && item.availability !== "available" ? item.availabilityMessage ?? unavailable[item.availability] : undefined;
  const canPreview = !disabled && !blocked && item.permissions?.preview !== false;
  const localImage = useAttachmentObjectUrl(canPreview && kind === "image" && !item.url && !item.previewUrl ? item.file : undefined);
  const thumbnail = canPreview && kind === "image" ? item.thumbnailUrl ?? item.previewUrl ?? item.url ?? localImage : undefined;
  const showThumbnail = isSafeAttachmentUrl(thumbnail) && failedThumbnail !== thumbnail;
  const editing = !readOnly && !disabled;
  const status = item.status ?? "done", replacement = item.replacement, currentStatus = replacement?.status ?? status;
  const active = currentStatus === "uploading" || currentStatus === "processing";
  const remoteOpen = item.url && !item.url.trim().toLowerCase().startsWith("blob:") && isSafeAttachmentUrl(item.url) ? item.url : undefined;
  const reasons = [...new Set(Object.entries(item.permissions ?? {}).filter(([, allowed]) => allowed === false).map(([key]) => item.permissionReasons?.[key as keyof NonNullable<AttachmentRecord["permissions"]>]).filter(Boolean))];
  async function perform(name: string, action: (signal: AbortSignal) => void | boolean | Promise<void | boolean>) {
    if (operation.current) return;
    const controller = new AbortController(); operation.current = controller;
    setBusy(name); setError(""); setNotice("");
    try {
      const result = await action(controller.signal);
      if (!controller.signal.aborted && result !== false && name === "download") setNotice("已发起下载");
    } catch (failure) {
      if (!controller.signal.aborted) setError(failure instanceof Error ? failure.message : "操作失败，请重试");
    } finally {
      if (operation.current === controller) { operation.current = null; setBusy(undefined); }
    }
  }
  return <div className="rain-attachment-list__item" data-attachment-id={item.id}>
    <Attachment state={status === "canceled" ? "idle" : status} className="rain-attachment-list__card">
      <AttachmentMedia variant={showThumbnail ? "image" : "icon"}>{showThumbnail ? <img src={thumbnail} alt={`缩略图 ${item.name}`} onError={() => setFailedThumbnail(thumbnail)} /> : <Icon />}</AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{item.name}</AttachmentTitle>
        <AttachmentDescription>{attachmentTypeLabel(item)} · {formatAttachmentSize(item.size ?? item.file?.size)} · {states[status]}</AttachmentDescription>
      </AttachmentContent>
      <AttachmentTrigger ref={triggerRef} aria-label={`预览 ${item.name}`} disabled={!canPreview} onClick={event => onPreview(event.currentTarget)} />
      <AttachmentActions>
        <Popover.Root><Popover.Trigger render={<AttachmentAction aria-label={`查看文件信息 ${item.name}`}>信息</AttachmentAction>} />
          <Popover.Content className="rain-attachment-list__details"><Popover.Title>文件信息</Popover.Title><Popover.Description>{item.name}</Popover.Description>
            <p>{attachmentTypeLabel(item)} · {formatAttachmentSize(item.size ?? item.file?.size)}</p>
            {item.type && <p>文件类型：{item.type}</p>}{item.uploadedBy && <p>上传者：{item.uploadedBy}</p>}{item.uploadedAt && <p>上传时间：{item.uploadedAt}</p>}{item.description && <p>{item.description}</p>}
          </Popover.Content></Popover.Root>
        <AttachmentAction aria-label={`下载 ${item.name}`} disabled={disabled || !!blocked || item.permissions?.download === false || !!busy || (!item.file && !item.url && !onDownload)} onClick={() => void perform("download", signal => (onDownload ?? downloadAttachment)(item, { signal }))}>{busy === "download" ? "下载中…" : "下载"}</AttachmentAction>
        {remoteOpen && !disabled && !blocked && item.permissions?.open !== false && <a className="rain-attachment-list__open" href={remoteOpen} target="_blank" rel="noopener noreferrer" aria-label={`在新窗口打开 ${item.name}`}>打开</a>}
        {editing && !active && (currentStatus === "idle" ? onStart : currentStatus === "error" || currentStatus === "canceled" ? onRetry : undefined) && <AttachmentAction aria-label={`${currentStatus === "idle" ? "上传" : "重试上传"} ${item.name}`} disabled={!!busy} onClick={() => currentStatus === "idle" ? onStart?.(item) : onRetry?.(item)}>{currentStatus === "idle" ? "上传" : "重试"}</AttachmentAction>}
        {editing && (active || replacement) && onCancel && <AttachmentAction aria-label={`${replacement ? "取消替换" : "取消上传"} ${item.name}`} onClick={() => onCancel(item)}>取消</AttachmentAction>}
        {editing && onReplace && item.permissions?.replace !== false && <><AttachmentAction aria-label={`替换 ${item.name}`} disabled={!!busy || active} onClick={() => input.current?.click()}>替换</AttachmentAction><input ref={input} className="rain-attachment-list__input" type="file" aria-label={`选择替换文件 ${item.name}`} disabled={!!busy || active} onChange={event => { const file = event.currentTarget.files?.[0]; event.currentTarget.value = ""; if (file) void perform("replace", () => onReplace(item, file)); }} /></>}
        {editing && onRemove && item.permissions?.remove !== false && <AttachmentAction aria-label={`移除 ${item.name}`} disabled={!!busy} onClick={() => void perform("remove", () => onRemove(item))}>{busy === "remove" ? "移除中…" : "移除"}</AttachmentAction>}
      </AttachmentActions>
    </Attachment>
    {replacement && <p className="rain-attachment-list__message">正在替换为 {replacement.file.name} · {states[replacement.status]}。替换成功前保留原附件。</p>}
    {active && <Progress aria-label={`${replacement ? "替换" : "上传"}进度 ${item.name}`} value={currentStatus === "processing" ? null : (replacement ? replacement.progress : item.progress) ?? null} />}
    {(error || item.error || replacement?.error) && <p className="rain-attachment-list__error" role="alert">{error || replacement?.error || item.error}</p>}
    {blocked && <p className="rain-attachment-list__message">{blocked}</p>}
    {reasons.map(reason => <p className="rain-attachment-list__message" key={reason}>{reason}</p>)}
    {notice && <p className="rain-attachment-list__message" role="status">{notice}</p>}
  </div>;
}

/** Controlled composition; callers own records, upload handlers and business persistence. */
export function AttachmentList({ items, restoreFocusRef, className, ...props }: AttachmentListProps) {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null), triggers = useRef(new Map<string, HTMLButtonElement>());
  const pendingFocus = useRef<{ id: string; index: number } | null>(null);
  useEffect(() => {
    if (props.disabled || (previewId && !items.some(item => item.id === previewId))) setPreviewId(null);
  }, [items, props.disabled, previewId]);
  useEffect(() => {
    const pending = pendingFocus.current;
    if (pending && !items.some(item => item.id === pending.id)) {
      const neighbor = items[Math.min(pending.index, items.length - 1)];
      const trigger = neighbor ? triggers.current.get(neighbor.id) : undefined;
      const target = trigger?.disabled ? trigger.closest(".rain-attachment-list__item")?.querySelector<HTMLElement>("button:not(:disabled), a[href]") : trigger;
      (target ?? restoreFocusRef?.current)?.focus();
      pendingFocus.current = null;
    }
  }, [items, restoreFocusRef]);
  const selected = props.disabled ? null : items.find(item => item.id === previewId) ?? null;
  return <div className={rainCn("rain-attachment-list", className)} data-rain-id="recipe-attachment-workflow">
    {items.length === 0 && <p className="rain-attachment-list__message">暂无附件</p>}
    {items.map((item, index) => <AttachmentRow {...props} key={item.id} item={item} triggerRef={element => { if (element) triggers.current.set(item.id, element); else triggers.current.delete(item.id); }} onPreview={element => { returnFocus.current = element; setPreviewId(item.id); }}
      onRemove={props.onRemove ? async record => {
        const task = { id: item.id, index }; pendingFocus.current = task;
        try { const result = await props.onRemove!(record); if (result === false && pendingFocus.current === task) pendingFocus.current = null; return result; }
        catch (error) { if (pendingFocus.current === task) pendingFocus.current = null; throw error; }
      } : undefined} />)}
    <AttachmentPreview attachment={selected} open={!!selected} onOpenChange={open => { if (!open) setPreviewId(null); }} onDownload={props.onDownload} returnFocus={returnFocus} />
  </div>;
}
