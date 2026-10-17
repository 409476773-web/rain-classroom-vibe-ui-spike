import { useEffect, useRef, useState, type RefObject } from "react";
import { Button } from "../button/button";
import { Dialog } from "../dialog/dialog";
import { Progress, ProgressLabel } from "../progress/progress";
import { getAttachmentKind, isSafeAttachmentUrl } from "./attachment-file-utils";
import { downloadAttachment, useAttachmentObjectUrl } from "./attachment-resources";
import { canPreviewVideo, getAttachmentVideoType } from "./attachment-media-utils";
import type { AttachmentRecord } from "./types";
import "./attachment-preview.css";

export type AttachmentPreviewProps = {
  attachment: AttachmentRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload?: (item: AttachmentRecord, context: { signal: AbortSignal }) => void | Promise<void>;
  returnFocus?: RefObject<HTMLElement | null>;
  theme?: "light" | "dark";
  /** Maximum PDF bytes read into memory. Defaults to 20 MiB; larger files retain download and trusted remote opening. */
  maxPreviewBytes?: number;
};
const availabilityText = {
  processing: "文件仍在处理中，请稍后再试",
  forbidden: "你没有访问此文件的权限",
  missing: "文件已被删除或不存在",
  expired: "文件链接已失效，请联系提供者更新",
} as const;
const defaultPreviewLimit = 20 * 1024 * 1024;

function pdfHeader(blob: Blob, signal: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const cancel = () => reader.abort();
    const finish = () => signal.removeEventListener("abort", cancel);
    reader.onload = () => { finish(); resolve(String(reader.result)); };
    reader.onerror = () => { finish(); reject(new Error("无法读取 PDF 内容")); };
    reader.onabort = () => { finish(); reject(new DOMException("预览已取消", "AbortError")); };
    signal.throwIfAborted();
    signal.addEventListener("abort", cancel, { once: true });
    reader.readAsText(blob.slice(0, 5));
  });
}

async function readPdf(source: string | undefined, file: File | undefined, signal: AbortSignal, limit: number): Promise<Blob> {
  let blob: Blob;
  if (source) {
    if (!isSafeAttachmentUrl(source)) throw new Error("文件地址不安全，无法预览");
    const response = await fetch(source, { signal });
    if (signal.aborted) {
      await response.body?.cancel().catch(() => {});
      signal.throwIfAborted();
    }
    if (!response.ok) throw new Error(`PDF 预览失败（${response.status}）`);
    if (Number(response.headers.get("content-length")) > limit) {
      await response.body?.cancel();
      throw new Error("文件超过预览大小限制，请打开或下载查看");
    }
    if (!response.body) throw new Error("无法读取 PDF 内容，请打开或下载查看");
    const reader = response.body.getReader();
    const cancel = () => { void reader.cancel().catch(() => {}); };
    const chunks: Uint8Array<ArrayBuffer>[] = [];
    let size = 0;
    signal.addEventListener("abort", cancel, { once: true });
    try {
      while (true) {
        signal.throwIfAborted();
        const { value, done } = await reader.read();
        signal.throwIfAborted();
        if (done) break;
        size += value.byteLength;
        if (size > limit) {
          await reader.cancel();
          throw new Error("文件超过预览大小限制，请打开或下载查看");
        }
        chunks.push(new Uint8Array(value));
      }
    } finally { signal.removeEventListener("abort", cancel); reader.releaseLock(); }
    blob = new Blob(chunks, { type: "application/pdf" });
  } else if (file) {
    if (file.size > limit) throw new Error("文件超过预览大小限制，请打开或下载查看");
    blob = file;
  } else throw new Error("没有可预览的文件内容");
  if (await pdfHeader(blob, signal) !== "%PDF-") throw new Error("文件内容不是有效的 PDF，请打开或下载核对");
  signal.throwIfAborted();
  return new Blob([blob], { type: "application/pdf" });
}

type PdfResource = { url?: string; error?: string };
function usePdfResource(source: string | undefined, file: File | undefined, limit: number, enabled: boolean): PdfResource | undefined {
  const [result, setResult] = useState<PdfResource & { source?: string; file?: File; limit: number }>();
  useEffect(() => {
    setResult(undefined);
    if (!enabled) return;
    const controller = new AbortController();
    let url: string | undefined;
    void readPdf(source, file, controller.signal, limit).then(blob => {
      if (controller.signal.aborted) return;
      url = URL.createObjectURL(blob);
      setResult({ source, file, limit, url });
    }).catch(error => {
      if (!controller.signal.aborted) setResult({ source, file, limit, error: error instanceof Error ? error.message : "PDF 预览失败，请打开或下载查看" });
    });
    return () => { controller.abort(); if (url) URL.revokeObjectURL(url); };
  }, [source, file, limit, enabled]);
  return enabled && result?.source === source && result?.file === file && result?.limit === limit ? result : undefined;
}

function PdfPreview({ resource, name }: { resource?: PdfResource; name: string }) {
  return <>
    {resource?.error ? <p role="alert" className="rain-attachment-preview__error">{resource.error}</p>
      // Only our validated PDF-typed Blob reaches this frame. A sandbox attribute can disable native PDF viewers.
      : resource?.url ? <iframe className="rain-attachment-preview__pdf" title={`预览 ${name}`} src={resource.url} referrerPolicy="no-referrer" />
        : <Progress value={null}><ProgressLabel>正在准备 PDF 预览</ProgressLabel></Progress>}
    <p className="rain-attachment-preview__hint">PDF 由浏览器显示；若未显示内容，可使用下方允许的打开或下载操作。</p>
  </>;
}

function VideoPreview({ source, file, name }: { source?: string; file?: File; name: string }) {
  const local = useAttachmentObjectUrl(!source ? file : undefined);
  const mediaSource = source || local;
  const [failedSource, setFailedSource] = useState<string>();
  const player = useRef<HTMLVideoElement>(null);
  const failed = !!mediaSource && failedSource === mediaSource;
  useEffect(() => {
    const element = player.current;
    // StrictMode replays cleanup/setup on the same node; restore the source released by cleanup.
    if (element && mediaSource && !failed && element.getAttribute("src") !== mediaSource) element.setAttribute("src", mediaSource);
    return () => {
      if (!element) return;
      element.pause();
      element.removeAttribute("src");
      element.load();
    };
  }, [mediaSource, failed]);
  if (failed) return <p role="alert" className="rain-attachment-preview__error">视频预览失败，当前浏览器可能不支持此视频，请打开或下载查看</p>;
  if (!mediaSource) return <p role="status">正在准备视频预览</p>;
  return <video key={mediaSource} ref={player} className="rain-attachment-preview__video" aria-label={`视频预览 ${name}`}
    src={mediaSource} controls playsInline preload="metadata" onError={() => setFailedSource(mediaSource)} />;
}

function PreviewContents({ attachment, onDownload, maxPreviewBytes = defaultPreviewLimit }: Pick<AttachmentPreviewProps, "onDownload" | "maxPreviewBytes"> & { attachment: AttachmentRecord }) {
  const [imageError, setImageError] = useState(false);
  const [downloadState, setDownloadState] = useState<"idle" | "busy" | "initiated">("idle");
  const [downloadError, setDownloadError] = useState<string>();
  const downloadRequest = useRef<AbortController | null>(null);
  const available = !attachment.availability || attachment.availability === "available";
  const previewAllowed = attachment.permissions?.preview !== false;
  const downloadAllowed = attachment.permissions?.download !== false;
  const openAllowed = attachment.permissions?.open !== false;
  const previewSource = attachment.previewUrl || attachment.url;
  const sourceSafe = !previewSource || isSafeAttachmentUrl(previewSource);
  const resourceSafe = !attachment.url || isSafeAttachmentUrl(attachment.url);
  const kind = getAttachmentKind(attachment);
  const isVideo = kind === "video" || !!getAttachmentVideoType(attachment);
  const local = useAttachmentObjectUrl(available && previewAllowed && kind === "image" && !previewSource ? attachment.file : undefined);
  const imageSource = previewSource || local;
  // A raw File/blob can contain active HTML or SVG, even with an image/PDF name. Only service URLs or our verified PDF may navigate.
  const remoteOpenSource = resourceSafe && attachment.url && !/^blob:/i.test(attachment.url.trim()) ? attachment.url : undefined;
  const supportsPdf = typeof navigator === "undefined" || navigator.pdfViewerEnabled !== false;
  const limit = Number.isFinite(maxPreviewBytes) && maxPreviewBytes > 0 ? maxPreviewBytes : defaultPreviewLimit;
  const pdf = usePdfResource(previewSource, attachment.file, limit, available && kind === "pdf" && sourceSafe
    && ((previewAllowed && downloadAllowed && supportsPdf) || (openAllowed && !remoteOpenSource)));
  const openSource = remoteOpenSource || (kind === "pdf" ? pdf?.url : undefined);
  useEffect(() => {
    setImageError(false); setDownloadState("idle"); setDownloadError(undefined);
    return () => { downloadRequest.current?.abort(); downloadRequest.current = null; };
  }, [attachment.id, attachment.url, attachment.previewUrl, attachment.file, attachment.availability, downloadAllowed]);

  async function startDownload() {
    if (downloadRequest.current || !downloadAllowed || !available || !resourceSafe) return;
    const controller = new AbortController();
    downloadRequest.current = controller;
    setDownloadState("busy"); setDownloadError(undefined);
    try {
      await (onDownload ?? downloadAttachment)(attachment, { signal: controller.signal });
      if (!controller.signal.aborted) setDownloadState("initiated");
    } catch (error) {
      if (!controller.signal.aborted) {
        setDownloadState("idle");
        setDownloadError(error instanceof Error ? error.message : "下载失败，请重试");
      }
    } finally { if (downloadRequest.current === controller) downloadRequest.current = null; }
  }

  let content;
  if (!available) content = <p role="status">{attachment.availabilityMessage || availabilityText[attachment.availability as keyof typeof availabilityText]}</p>;
  else if (!previewAllowed) content = <p role="status">{attachment.permissionReasons?.preview || "不允许预览此文件"}</p>;
  else if (!sourceSafe) content = <p role="alert" className="rain-attachment-preview__error">文件地址不安全，无法预览</p>;
  else if (kind === "image") content = imageError ? <p role="alert" className="rain-attachment-preview__error">图片预览失败，请打开或下载查看</p>
    : imageSource ? <img className="rain-attachment-preview__image" src={imageSource} alt={attachment.name} onError={() => setImageError(true)} />
      : <p role="status">没有可预览的文件内容</p>;
  else if (kind === "pdf" && !downloadAllowed) content = <p role="status">当前预览方式不支持此文件的下载限制</p>;
  else if (kind === "pdf" && !supportsPdf) content = <p role="status">当前浏览器不支持 PDF 预览，请打开或下载查看</p>;
  else if (kind === "pdf") content = <PdfPreview resource={pdf} name={attachment.name} />;
  else if (isVideo && !downloadAllowed) content = <p role="status">当前预览方式不支持此文件的下载限制</p>;
  else if (isVideo && (attachment.status ?? "done") !== "done") content = <p role="status">视频尚未上传完成，暂不能播放</p>;
  else if (canPreviewVideo(attachment)) content = <VideoPreview key={previewSource} source={previewSource} file={attachment.file} name={attachment.name} />;
  else content = <p role="status">此文件类型暂不支持在线预览</p>;

  return <>
    <Dialog.Body className="rain-attachment-preview__body">{content}
      {pdf?.error && !(previewAllowed && downloadAllowed && supportsPdf) && <p role="alert" className="rain-attachment-preview__error">{pdf.error}</p>}
      {downloadError && <p role="alert" className="rain-attachment-preview__error">{downloadError}</p>}
      {downloadState === "initiated" && <p role="status">已发起下载</p>}
    </Dialog.Body>
    <Dialog.Footer divider>
      {available && openAllowed && openSource && isSafeAttachmentUrl(openSource) && <a className="rain-attachment-preview__open" href={openSource} target="_blank" rel="noopener noreferrer" aria-label={`在新窗口打开 ${attachment.name}`}>在新窗口打开</a>}
      {available && downloadAllowed && resourceSafe && (attachment.url || attachment.file || onDownload) && <Button onClick={() => void startDownload()} loading={downloadState === "busy"} aria-label={`下载 ${attachment.name}`}>下载</Button>}
      <Dialog.Close render={<Button>关闭</Button>} />
    </Dialog.Footer>
  </>;
}

export function AttachmentPreview({ attachment, open, onOpenChange, onDownload, returnFocus, theme, maxPreviewBytes }: AttachmentPreviewProps) {
  const title = useRef<HTMLHeadingElement>(null);
  return <Dialog.Root open={open && !!attachment} onOpenChange={onOpenChange}>
    <Dialog.Content width={816} theme={theme} finalFocus={returnFocus} initialFocus={title} className="rain-attachment-preview">
      <Dialog.Header><Dialog.Title ref={title} tabIndex={-1} className="rain-attachment-preview__name">{attachment?.name || "附件预览"}</Dialog.Title><Dialog.Description>文件预览</Dialog.Description></Dialog.Header>
      {open && attachment && <PreviewContents key={attachment.id} attachment={attachment} onDownload={onDownload} maxPreviewBytes={maxPreviewBytes} />}
    </Dialog.Content>
  </Dialog.Root>;
}
