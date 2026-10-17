import { useEffect, useRef, useState, type RefObject } from "react";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "../attachment/attachment";
import { FileIcon } from "../icons/file";
import { FileFormatPdfIcon } from "../icons/file-format-pdf";
import { FileFormatDocxIcon } from "../icons/file-format-docx";
import { FileFormatXlsxIcon } from "../icons/file-format-xlsx";
import { FileFormatPptIcon } from "../icons/file-format-ppt";
import { FileFormatZipIcon } from "../icons/file-format-zip";
import { FileFormatAudioIcon } from "../icons/file-format-audio";
import { FileFormatVideoIcon } from "../icons/file-format-video";
import { FileFormatTxtIcon } from "../icons/file-format-txt";
import { ImageIcon } from "../icons/image";
import { Dialog } from "../dialog/dialog";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu";
import { IconButton } from "../icon-button/icon-button";
import { DownloadIcon } from "../icons/download";
import { MoreHorizontalIcon } from "../icons/more-horizontal";
import { CircleCloseIcon } from "../icons/circle-close";
import { TimeFilledIcon } from "../icons/time-filled";
import { PasswordLockIcon } from "../icons/password-lock";
import { ButtonLoadingIcon } from "../icons/button-loading";
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
  surface?: "outlined" | "filled";
  restoreFocusRef?: RefObject<HTMLElement | null>;
  onDownload?: (item: AttachmentRecord, context: { signal: AbortSignal }) => void | Promise<void>;
  onRemove?: (item: AttachmentRecord) => void | boolean | Promise<void | boolean>;
  onReplace?: (item: AttachmentRecord, file: File) => void | Promise<void>;
  onStart?: (item: AttachmentRecord) => void;
  onRetry?: (item: AttachmentRecord) => void;
  onCancel?: (item: AttachmentRecord) => void;
};
const icons = { image: ImageIcon, pdf: FileFormatPdfIcon, document: FileFormatDocxIcon,
  spreadsheet: FileFormatXlsxIcon, presentation: FileFormatPptIcon, archive: FileFormatZipIcon,
  audio: FileFormatAudioIcon, video: FileFormatVideoIcon, text: FileFormatTxtIcon, file: FileIcon };
const states = { idle: "等待上传", uploading: "正在上传", processing: "正在处理", error: "上传失败", canceled: "已取消上传", done: "" };
const unavailable = { processing: "文件仍在处理中", forbidden: "你没有访问此文件的权限", missing: "文件已被删除或不存在", expired: "文件链接已失效，请联系提供者更新" };

function AttachmentRow({ item, surface = "outlined", readOnly, disabled, onDownload, onRemove, onReplace, onStart, onRetry, onCancel, onPreview, triggerRef }: Omit<AttachmentListProps, "items"> & {
  item: AttachmentRecord;
  onPreview: (element: HTMLElement) => void;
  triggerRef: (element: HTMLButtonElement | null) => void;
}) {
  const [failedThumbnail, setFailedThumbnail] = useState<string>();
  const [busy, setBusy] = useState<string>();
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsTheme, setDetailsTheme] = useState<"light" | "dark">("light");
  const more = useRef<HTMLButtonElement>(null);
  const menuReturnFocus = useRef(true);
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
  const hasDownload = status === "done" && !blocked && item.permissions?.download !== false && !!(item.file || item.url || onDownload);
  const permissionLabel = item.permissions?.download === false ? "禁止下载" : item.permissions?.preview === false ? "不支持预览" : "";
  const shortAvailability = item.availability === "forbidden" ? "访问受限" : item.availability === "expired" ? "链接失效" : item.availability === "missing" ? "文件不可用" : item.availability === "processing" ? "正在处理" : "";
  const progress = replacement ? replacement.progress : item.progress;
  const statusText = replacement ? "" : shortAvailability || (currentStatus === "uploading" && progress != null ? `上传中 ${Math.round(progress)}%` : states[status]) || permissionLabel;
  const StateIcon = active ? ButtonLoadingIcon : currentStatus === "error" ? CircleCloseIcon : blocked || permissionLabel ? PasswordLockIcon : currentStatus === "idle" || currentStatus === "canceled" ? TimeFilledIcon : null;
  const extensionAt = item.name.lastIndexOf(".");
  const splitTitle = extensionAt > 0 && extensionAt < item.name.length - 1;
  const baseName = splitTitle ? item.name.slice(0, extensionAt) : item.name;
  const extension = splitTitle ? item.name.slice(extensionAt) : "";
  const displayError = error || replacement?.error || item.error;
  return <div className="rain-attachment-list__item" data-attachment-id={item.id}>
    <Attachment state={status === "canceled" ? "idle" : status} data-surface={surface} data-replacement={!!replacement || undefined} className="rain-attachment-list__card">
      <AttachmentMedia variant={showThumbnail ? "image" : "icon"}>{showThumbnail ? <img src={thumbnail} alt={`缩略图 ${item.name}`} onError={() => setFailedThumbnail(thumbnail)} /> : <Icon />}</AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle title={item.name}><span className="rain-attachment-list__basename">{baseName}</span><span className="rain-attachment-list__extension">{extension}</span></AttachmentTitle>
        <AttachmentDescription>{formatAttachmentSize(item.size ?? item.file?.size)}{statusText && <> · <span data-tone={currentStatus === "error" ? "error" : undefined}>{statusText}</span></>}</AttachmentDescription>
      </AttachmentContent>
      <AttachmentTrigger ref={triggerRef} aria-label={`预览 ${item.name}`} disabled={!canPreview} onClick={event => onPreview(event.currentTarget)} />
      <AttachmentActions>
        <span className="rain-attachment-list__state" data-active={active || undefined} data-tone={currentStatus === "error" ? "error" : active ? "brand" : "neutral"} aria-hidden="true">{StateIcon && <StateIcon />}</span>
        {hasDownload && <IconButton size="32/16" highlight="icon" icon={<DownloadIcon />} aria-label={`下载 ${item.name}`} title="下载" loading={busy === "download"} disabled={disabled || !!busy} onClick={() => void perform("download", signal => (onDownload ?? downloadAttachment)(item, { signal }))} />}
        {!hasDownload && canPreview && status === "done" && !active && <AttachmentAction variant="text" tone="brand" aria-label={`打开预览 ${item.name}`} onClick={event => onPreview(event.currentTarget)}>预览</AttachmentAction>}
        {editing && !active && (currentStatus === "idle" ? onStart : currentStatus === "error" || currentStatus === "canceled" ? onRetry : undefined) && <AttachmentAction variant="text" tone="brand" aria-label={`${currentStatus === "idle" ? "上传" : "重试上传"} ${item.name}`} disabled={!!busy} onClick={() => currentStatus === "idle" ? onStart?.(item) : onRetry?.(item)}>{currentStatus === "idle" ? "上传" : "重试"}</AttachmentAction>}
        {editing && (active || replacement) && onCancel && <AttachmentAction variant="text" tone="brand" aria-label={`${replacement ? "取消替换" : "取消上传"} ${item.name}`} onClick={() => onCancel(item)}>取消</AttachmentAction>}
        {!active && <DropdownMenu.Root onOpenChange={open => { if (open) menuReturnFocus.current = true; }}>
          <DropdownMenu.Trigger render={<IconButton ref={more} size="32/16" highlight="icon" icon={<MoreHorizontalIcon />} aria-label={`更多操作 ${item.name}`} title="更多操作" disabled={disabled} />} />
          <DropdownMenu.Content finalFocus={() => menuReturnFocus.current ? more.current ?? false : false} positionerProps={{ align: "end" }}>
            <DropdownMenu.Item label="文件信息" onClick={() => {
              menuReturnFocus.current = false;
              setDetailsTheme(more.current?.closest("[data-rain-theme]")?.getAttribute("data-rain-theme") === "dark" ? "dark" : "light");
              setDetailsOpen(true);
            }} />
            {remoteOpen && !disabled && !blocked && item.permissions?.open !== false && <DropdownMenu.LinkItem label="在新窗口打开" href={remoteOpen} target="_blank" rel="noopener noreferrer" />}
            {editing && onReplace && item.permissions?.replace !== false && <DropdownMenu.Item label="替换" disabled={!!busy} onClick={() => input.current?.click()} />}
            {editing && onRemove && item.permissions?.remove !== false && <DropdownMenu.Item label="移除" tone="danger" pending={busy === "remove"} disabled={!!busy} onClick={() => void perform("remove", () => onRemove(item))} />}
          </DropdownMenu.Content>
        </DropdownMenu.Root>}
      </AttachmentActions>
      {replacement && <p className="rain-attachment-list__message rain-attachment-list__supplement">正在替换为 {replacement.file.name} · {states[replacement.status]}。替换成功前保留原附件。</p>}
      {active && <Progress className="rain-attachment-list__progress" aria-label={`${replacement ? "替换" : "上传"}进度 ${item.name}`} value={currentStatus === "processing" ? null : progress ?? null} />}
      {displayError && <p className="rain-attachment-list__error rain-attachment-list__supplement" role="alert">{displayError}</p>}
      {blocked && <p className="rain-attachment-list__message rain-attachment-list__supplement">{blocked}</p>}
      {reasons.map(reason => <p className="rain-attachment-list__message rain-attachment-list__supplement" key={reason}>{reason}</p>)}
      {notice && <p className="rain-attachment-list__message rain-attachment-list__supplement" role="status">{notice}</p>}
    </Attachment>
    {editing && onReplace && item.permissions?.replace !== false && <input ref={input} className="rain-attachment-list__input" type="file" aria-label={`选择替换文件 ${item.name}`} disabled={!!busy || active} onChange={event => { const file = event.currentTarget.files?.[0]; event.currentTarget.value = ""; if (file) void perform("replace", () => onReplace(item, file)); }} />}
    <Dialog.Root open={detailsOpen} onOpenChange={setDetailsOpen}>
      <Dialog.Content width={416} theme={detailsTheme} finalFocus={more} className="rain-attachment-list__details">
        <Dialog.Header><Dialog.Title>文件信息</Dialog.Title><Dialog.Description>{item.name}</Dialog.Description></Dialog.Header>
        <Dialog.Body><p>{attachmentTypeLabel(item)} · {formatAttachmentSize(item.size ?? item.file?.size)}</p>
          {item.type && <p>文件类型：{item.type}</p>}{item.uploadedBy && <p>上传者：{item.uploadedBy}</p>}{item.uploadedAt && <p>上传时间：{item.uploadedAt}</p>}{item.description && <p>{item.description}</p>}
        </Dialog.Body><Dialog.Footer><Dialog.Close render={<AttachmentAction>关闭</AttachmentAction>}>关闭</Dialog.Close></Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  </div>;
}

/** Controlled composition; callers own records, upload handlers and business persistence. */
export function AttachmentList({ items, restoreFocusRef, className, ...props }: AttachmentListProps) {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
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
    {items.map((item, index) => <AttachmentRow {...props} key={item.id} item={item} triggerRef={element => { if (element) triggers.current.set(item.id, element); else triggers.current.delete(item.id); }} onPreview={element => { returnFocus.current = element; setPreviewTheme(element.closest("[data-rain-theme]")?.getAttribute("data-rain-theme") === "dark" ? "dark" : "light"); setPreviewId(item.id); }}
      onRemove={props.onRemove ? async record => {
        const task = { id: item.id, index }; pendingFocus.current = task;
        try { const result = await props.onRemove!(record); if (result === false && pendingFocus.current === task) pendingFocus.current = null; return result; }
        catch (error) { if (pendingFocus.current === task) pendingFocus.current = null; throw error; }
      } : undefined} />)}
    <AttachmentPreview theme={previewTheme} attachment={selected} open={!!selected} onOpenChange={open => { if (!open) setPreviewId(null); }} onDownload={props.onDownload} returnFocus={returnFocus} />
  </div>;
}
