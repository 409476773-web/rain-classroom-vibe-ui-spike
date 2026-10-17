import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle, AttachmentTrigger, Button, Dialog, DropdownMenu, IconButton, Progress } from "@rain-next/ui";
import { FileFormatPdfIcon } from "@rain-next/ui/icons/file-format-pdf";
import { FileFormatVideoMp4Icon } from "@rain-next/ui/icons/file-format-video-mp4";
import { FileFormatAudioMp3Icon } from "@rain-next/ui/icons/file-format-audio-mp3";
import { DownloadIcon } from "@rain-next/ui/icons/download";
import { MoreHorizontalIcon } from "@rain-next/ui/icons/more-horizontal";
import { CircleCloseIcon } from "@rain-next/ui/icons/circle-close";
import { TimeFilledIcon } from "@rain-next/ui/icons/time-filled";
import { PasswordLockIcon } from "@rain-next/ui/icons/password-lock";
import { FileIcon } from "@rain-next/ui/icons/file";
import { CaptionsOnIcon } from "@rain-next/ui/icons/captions-on";
import { ButtonLoadingIcon } from "@rain-next/ui/icons/button-loading";
import "./attachment-states-demo.css";

// Page-private examples. These are independent presentation states, not an attachment API.
const examples = [
  { id: "guide", name: "课程导读：从问题到证据.pdf", size: "965 B", kind: "pdf" },
  { id: "recording", name: "课堂录像.mp4", size: "24 MB", kind: "video" },
  { id: "audio", name: "课堂录音.mp3", size: "4.6 MB", kind: "audio" },
  { id: "report", name: "研究论文.pdf", size: "1.8 MB", kind: "pdf" },
  { id: "subtitles", name: "授课录像.mp4", size: "64 MB", kind: "video" },
  { id: "review", name: "设备申请.pdf", size: "860 KB", kind: "pdf" },
  { id: "restricted", name: "课堂资料.pdf", size: "2.1 MB", kind: "pdf" },
] as const;
type Example = typeof examples[number];
type UploadState = "uploading" | "error" | "canceled" | "done";
type UploadId = "recording" | "audio";
type DemoDialog = { kind: "preview" | "download" | "info" | "report" | "review"; item: Example; theme: "light" | "dark" };
const fileIcons = { pdf: FileFormatPdfIcon, video: FileFormatVideoMp4Icon, audio: FileFormatAudioMp3Icon };
const initialUploads: Record<UploadId, UploadState> = { recording: "uploading", audio: "error" };
const uploadLabels = { uploading: "上传中 42%", error: "上传失败", canceled: "已取消上传", done: "上传完成（示例）" };

export function AttachmentStatesDemo() {
  const [uploads, setUploads] = useState(initialUploads);
  const [reportRead, setReportRead] = useState(false);
  const [subtitle, setSubtitle] = useState<"error" | "processing" | "done">("error");
  const [review, setReview] = useState<"pending" | "approved" | "returned">("pending");
  const [dialog, setDialog] = useState<DemoDialog | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const moreButtons = useRef(new Map<string, HTMLButtonElement>());
  const menuReturnFocus = useRef(true);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  useEffect(() => () => { timers.current.forEach(clearTimeout); timers.current.clear(); }, []);

  function open(kind: DemoDialog["kind"], item: Example, event: MouseEvent<HTMLElement>, menuKey?: string) {
    const anchor = menuKey ? moreButtons.current.get(menuKey) ?? event.currentTarget : event.currentTarget;
    if (menuKey) menuReturnFocus.current = false;
    returnFocus.current = anchor;
    if (kind === "report") setReportRead(true);
    setDialog({ kind, item, theme: anchor.closest<HTMLElement>("[data-rain-theme]")?.dataset.rainTheme === "dark" ? "dark" : "light" });
  }
  function cancelUpload(id: UploadId) {
    clearTimeout(timers.current.get(id)); timers.current.delete(id);
    setUploads(current => ({ ...current, [id]: "canceled" }));
  }
  function retryUpload(id: UploadId) {
    clearTimeout(timers.current.get(id));
    setUploads(current => ({ ...current, [id]: "uploading" }));
    timers.current.set(id, setTimeout(() => {
      timers.current.delete(id); setUploads(current => ({ ...current, [id]: "done" }));
    }, 900));
  }
  function retrySubtitle() {
    setSubtitle("processing");
    timers.current.set("subtitle", setTimeout(() => {
      timers.current.delete("subtitle"); setSubtitle("done");
    }, 900));
  }
  function reset() {
    timers.current.forEach(clearTimeout); timers.current.clear();
    setUploads(initialUploads); setReportRead(false); setSubtitle("error"); setReview("pending");
  }
  function downloadGuide() {
    const link = document.createElement("a");
    link.href = "/attachment-demo/course-guide.pdf"; link.download = examples[0].name; link.hidden = true;
    document.body.append(link);
    try { link.click(); } finally { link.remove(); }
  }
  function row(item: Example, surface: string) {
    const menuKey = `${surface}-${item.id}`;
    const FileTypeIcon = fileIcons[item.kind];
    const extensionAt = item.name.lastIndexOf(".");
    const basename = item.name.slice(0, extensionAt), extension = item.name.slice(extensionAt);
    const uploadId = item.id === "recording" || item.id === "audio" ? item.id : undefined;
    const transfer = uploadId ? uploads[uploadId] : undefined;
    const isUploading = transfer === "uploading";
    const canPreview = !transfer || transfer === "done";
    let status: ReactNode = transfer ? uploadLabels[transfer] : undefined;
    let indicator: ReactNode;
    let primary: ReactNode;
    let tone = "neutral";
    if (isUploading) {
      indicator = <ButtonLoadingIcon className="attachment-states-demo__loading" />;
      primary = <AttachmentAction variant="text" tone="brand" onClick={() => cancelUpload(uploadId!)} aria-label="取消上传">取消</AttachmentAction>;
      tone = "brand";
    } else if (transfer === "error" || transfer === "canceled") {
      indicator = transfer === "error" ? <CircleCloseIcon /> : <TimeFilledIcon />;
      primary = <AttachmentAction variant="text" tone="brand" onClick={() => retryUpload(uploadId!)} aria-label="重试上传">重试</AttachmentAction>;
      tone = transfer === "error" ? "error" : "neutral";
    } else if (item.id === "report") {
      status = reportRead ? "检测报告已读" : "检测报告未读";
      indicator = <span className="attachment-states-demo__report-icon"><FileIcon />{!reportRead && <span className="attachment-states-demo__unread" />}</span>;
      primary = <AttachmentAction variant="text" tone="brand" onClick={event => open("report", item, event)}>查看报告</AttachmentAction>;
      tone = reportRead ? "neutral" : "brand";
    } else if (item.id === "review") {
      status = review === "pending" ? "关联申请待你审核" : review === "approved" ? "关联申请已通过（示例）" : "关联申请已退回（示例）";
      indicator = review === "pending" ? <TimeFilledIcon /> : <FileIcon />;
      primary = <AttachmentAction variant="text" tone="brand" onClick={event => open("review", item, event)}>{review === "pending" ? "去审核" : "查看结果"}</AttachmentAction>;
      tone = review === "pending" ? "warning" : "neutral";
    } else if (item.id === "restricted") {
      status = "禁止下载"; indicator = <PasswordLockIcon />;
      primary = <AttachmentAction variant="text" tone="brand" onClick={event => open("preview", item, event)}>预览</AttachmentAction>;
    } else {
      primary = <IconButton size="28/18" highlight="icon" icon={<DownloadIcon />} aria-label={`${item.id === "guide" ? "下载示例" : "下载说明"} ${item.name}`} onClick={event => item.id === "guide" ? downloadGuide() : open("download", item, event)} />;
    }
    return <Attachment key={item.id} role="group" aria-label={`${item.name} 示例`} state={transfer === "canceled" ? "idle" : transfer ?? "done"} className="attachment-states-demo__card">
      <div className="attachment-states-demo__row">
        <AttachmentMedia className="attachment-states-demo__media"><FileTypeIcon /></AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle className="attachment-states-demo__title" title={item.name}><span className="attachment-states-demo__basename">{basename}</span><span className="attachment-states-demo__extension">{extension}</span></AttachmentTitle>
          <AttachmentDescription className="attachment-states-demo__description"><span>{item.size}</span>{status && <><span aria-hidden="true"> · </span><span className={transfer === "error" ? "attachment-states-demo__error" : undefined}>{status}</span></>}</AttachmentDescription>
        </AttachmentContent>
        <AttachmentTrigger aria-label={`预览示例 ${item.name}`} disabled={!canPreview} onClick={event => open("preview", item, event)} />
        <span className="attachment-states-demo__status" data-tone={tone} aria-hidden="true">{indicator}</span>
        <AttachmentActions className="attachment-states-demo__actions">
          {primary}
          {!isUploading && <DropdownMenu.Root onOpenChange={value => { if (value) menuReturnFocus.current = true; }}>
            <DropdownMenu.Trigger render={<IconButton ref={element => { if (element) moreButtons.current.set(menuKey, element); else moreButtons.current.delete(menuKey); }} size="28/18" highlight="icon" icon={<MoreHorizontalIcon />} aria-label={`更多操作 ${item.name}`} />} />
            <DropdownMenu.Content finalFocus={() => menuReturnFocus.current ? moreButtons.current.get(menuKey) ?? false : false} positionerProps={{ align: "end" }}>
              {canPreview && item.id !== "restricted" && <DropdownMenu.Item label="预览示例" onClick={event => open("preview", item, event, menuKey)} />}
              <DropdownMenu.Item label={item.id === "restricted" ? "权限说明" : "文件信息"} onClick={event => open("info", item, event, menuKey)} />
            </DropdownMenu.Content>
          </DropdownMenu.Root>}
        </AttachmentActions>
      </div>
      {isUploading && <Progress className="attachment-states-demo__progress" aria-label={`模拟上传进度 ${item.name}`} value={42} />}
      {item.id === "subtitles" && <div className="attachment-states-demo__subtitle">
        <span className="attachment-states-demo__caption-icon" aria-hidden="true"><CaptionsOnIcon />{subtitle === "error" && <CircleCloseIcon className="attachment-states-demo__caption-error" />}</span>
        <div className="attachment-states-demo__subtitle-copy"><span>{subtitle === "error" ? "字幕生成失败" : subtitle === "processing" ? "字幕生成中" : "字幕已生成（示例）"}</span><p>原视频状态正常 · 播放、下载为示例</p></div>
        {subtitle !== "done" && <Button variant="text" tone="brand" loading={subtitle === "processing"} loadingLabel="生成中" onClick={retrySubtitle}>重试字幕</Button>}
      </div>}
    </Attachment>;
  }
  const dialogTitle = dialog?.kind === "report" ? "检测报告（示例）" : dialog?.kind === "review" ? "关联申请审核（示例）" : dialog?.kind === "download" ? "下载说明" : dialog?.kind === "info" ? dialog.item.id === "restricted" ? "权限说明" : "文件信息" : dialog?.item.name;
  return <Dialog.Root open={dialog !== null} onOpenChange={value => { if (!value) setDialog(null); }}>
    <div className="attachment-states-demo">
      <div className="attachment-states-demo__intro"><p>两列共享同一组示例状态。除课程导读的真实 PDF 外，文件信息、上传、字幕、报告和审核均为本页演示。</p><Button variant="text" onClick={reset}>恢复示例</Button></div>
      <div className="attachment-states-demo__columns">
        {(["白底 · 浅描边", "浅灰底"] as const).map((name, index) => <section aria-label={name} className="attachment-states-demo__column" data-surface={index === 0 ? "outline" : "subtle"} key={name}>
          <h3>{name}</h3><div className="attachment-states-demo__list">{examples.map(item => row(item, name))}</div>
        </section>)}
      </div>
    </div>
    {dialog && <Dialog.Content width={616} theme={dialog.theme} finalFocus={returnFocus}>
      <Dialog.Header><Dialog.Title>{dialogTitle}</Dialog.Title><Dialog.Description>{dialog.item.name}</Dialog.Description></Dialog.Header>
      <Dialog.Body className="attachment-states-demo__dialog-body">
        {dialog.kind === "report" ? <><p>报告已在两列中标记为已读。</p><p>此内容仅演示查看检测报告，不代表真实检测结果；原附件状态保持不变。</p></>
          : dialog.kind === "review" ? <><p>此内容仅演示关联申请的审核入口。选择结果只更新本页两列，不会提交真实审核结果。</p><p>当前示例结果：{review === "pending" ? "待审核" : review === "approved" ? "已通过" : "已退回"}。</p></>
          : dialog.kind === "download" ? <p>此条目用于展示附件状态，未配置真实{dialog.item.kind === "audio" ? "音频" : "视频"}文件。本次只展示下载入口，不会发起文件下载。</p>
          : dialog.kind === "info" ? <><p>文件大小：{dialog.item.size}{dialog.item.id !== "guide" && "（示例值）"}。</p><p>{dialog.item.id === "restricted" ? "此示例只允许在本页预览，不提供下载；实际权限需要由业务系统控制。" : dialog.item.id === "guide" ? "本地提供真实课程导读 PDF，可预览与下载。" : "此条目没有配置真实原文件，所有操作仅用于展示交互。"}</p></>
          : dialog.item.id === "guide" ? <iframe className="attachment-states-demo__pdf" title="课程导读 PDF 预览" src="/attachment-demo/course-guide.pdf" />
          : dialog.item.id === "restricted" ? <div role="document" aria-label="课堂资料预览示例" className="attachment-states-demo__preview"><h4>课堂资料 · 预览示例</h4><p>观察现象，记录证据，再提出问题。</p><p>此处为本页生成的示例内容，未加载真实受限文件。</p></div>
          : <p>这是「{dialog.item.name}」的预览入口示例，尚未配置真实原文件。不会用其他格式的文件替代。</p>}
      </Dialog.Body>
      <Dialog.Footer>
        {dialog.kind === "review" && <><Button onClick={() => { setReview("returned"); setDialog(null); }}>模拟退回</Button><Button variant="primary" onClick={() => { setReview("approved"); setDialog(null); }}>模拟通过</Button></>}
        <Dialog.Close render={<Button>关闭</Button>} />
      </Dialog.Footer>
    </Dialog.Content>}
  </Dialog.Root>;
}
