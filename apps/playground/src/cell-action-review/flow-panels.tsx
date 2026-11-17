import { useRef } from "react";
import { TableCellPopover, TablePreviewDrawer } from "../patterns/table/table-cell-overlays";
import {
  Attachment, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription,
  AttachmentTrigger, AttachmentActions, Button, IconButton, Textarea, Tooltip,
} from "@rain-next/ui";
import { AddBoldIcon } from "@rain-next/ui/icons/add-bold";
import { CloseIcon } from "@rain-next/ui/icons/close";
import { DownloadIcon } from "@rain-next/ui/icons/download";
import { FileIcon } from "@rain-next/ui/icons/file";
import { FileFormatPdfOutlineIcon } from "@rain-next/ui/icons/file-format-pdf-outline";

export type { TableMediaItem as ReviewMedia } from "@rain-next/ui";
import type { TableMediaItem as ReviewMedia } from "@rain-next/ui";
export type CellPanel = { id: string; kind: "note" | "media" | "attachments" };
type MediaRow = { id: string; name: string; media: ReviewMedia[]; kind?: "media" | "attachments" };
function FileGlyph({ file }: { file: ReviewMedia }) {
  return /\.pdf$/i.test(file.name) ? <FileFormatPdfOutlineIcon /> : <FileIcon />;
}
function FileName({ name }: { name: string }) {
  const dot = name.lastIndexOf(".");
  return <span className="ca-flow-filename"><span>{dot > 0 ? name.slice(0, dot) : name}</span>{dot > 0 && <span>{name.slice(dot)}</span>}</span>;
}
function DownloadLink({ file, large = false }: { file: ReviewMedia; large?: boolean }) {
  return <Tooltip text="下载" portal><a className="ca-flow-download" data-large={large || undefined} href={file.url} download={file.name} aria-label={`下载${file.name}`}><DownloadIcon /></a></Tooltip>;
}
export function CellTaskPopover({ panel, row, note, anchor, finalFocus, onDismiss, onNoteChange, onFiles, onRemove, onPreview }: {
  panel: CellPanel | null; row?: MediaRow; note: string; anchor: HTMLElement | null;
  finalFocus: () => HTMLElement | false | null;
  onDismiss: (apply: boolean, restoreFocus: boolean) => void;
  onNoteChange: (value: string) => void; onFiles: (files: File[]) => void;
  onRemove: (file: ReviewMedia) => void; onPreview: (file: ReviewMedia) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null), uploadRef = useRef<HTMLInputElement>(null);
  const remembered = useRef<{ panel: CellPanel; row: MediaRow } | null>(null);
  if (panel && row) remembered.current = { panel, row };
  const context = panel && row ? { panel, row } : remembered.current;
  const isNote = context?.panel.kind === "note", isImages = context?.panel.kind === "media";
  const mediaLabel = isImages ? "图片" : "附件";
  function remove(file: ReviewMedia, index: number) {
    const neighbor = context?.row.media[index + 1] ?? context?.row.media[index - 1];
    const next = neighbor ? document.getElementById(`ca-file-preview-${neighbor.id}`) : null;
    // Move focus before removing its current owner, keeping the popup focus manager inside.
    (next ?? uploadRef.current)?.focus();
    onRemove(file);
  }
  return <TableCellPopover open={!!panel&&!!row} title={isNote?"任务说明":mediaLabel} description={context?.row.name}
    anchor={anchor} width={isNote?360:420} closeTip={isNote?"完成":"关闭"}
    onOpenChange={(open,details)=>{if(!open)onDismiss(details.reason!=="escape-key",!["outside-press","focus-out"].includes(details.reason));}}
    onClose={()=>onDismiss(true,true)} initialFocus={()=>contentRef.current?.querySelector<HTMLElement>(isNote?"textarea":"[data-slot=attachment-trigger],input[type=file]")??true} finalFocus={finalFocus}>
    <div ref={contentRef} className="ca-flow-task-body">
      {isNote ? <>
        <Textarea rows={4} aria-label="任务说明" value={note} onValueChange={onNoteChange} onKeyDown={event => {
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey) && !event.nativeEvent.isComposing) { event.preventDefault(); onDismiss(true, true); }
        }} />
        <div className="ca-flow-footer"><span>点空白处完成 · Esc 取消</span><div><Button variant="tertiary" size="small" onClick={() => onDismiss(false, true)}>取消</Button><Button variant="primary" size="small" onClick={() => onDismiss(true, true)}>完成</Button></div></div>
      </> : <>
        <div className="ca-flow-files" aria-label={`当前任务${mediaLabel}`}>{context?.row.media.map((file, index) =>
          <Attachment key={file.id} size="sm" className="ca-flow-attachment">
            <AttachmentMedia variant={isImages ? "image" : "icon"}>{isImages ? <img src={file.url} alt="" /> : <FileGlyph file={file} />}</AttachmentMedia>
            <AttachmentContent><AttachmentTitle title={file.name}><FileName name={file.name} /></AttachmentTitle><AttachmentDescription>{file.image ? "图片" : /\.pdf$/i.test(file.name) ? "PDF 文档" : "文件"}</AttachmentDescription></AttachmentContent>
            <AttachmentTrigger id={`ca-file-preview-${file.id}`} aria-label={`预览${file.name}`} onClick={() => onPreview(file)} />
            <AttachmentActions><DownloadLink file={file} /><Tooltip text="移除" portal><IconButton size="28/16" aria-label={`移除${file.name}`} icon={<CloseIcon />} onClick={() => remove(file, index)} /></Tooltip></AttachmentActions>
          </Attachment>)}
          {!context?.row.media.length && <p className="ca-flow-empty">暂无{mediaLabel}，添加后可在这里管理。</p>}
        </div>
        <label className="ca-flow-upload"><AddBoldIcon /><span>添加{mediaLabel}</span><input ref={uploadRef} aria-label={`添加${mediaLabel}`} type="file" accept={isImages ? "image/*" : undefined} multiple onChange={event => { onFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }} /></label>
        <p className="ca-flow-hint">更改进入表格草稿，统一保存。</p>
      </>}
    </div>
  </TableCellPopover>;
}
export function AttachmentDrawer({ row, file, finalFocus, onClose, onSelect }: {
  row?: MediaRow; file?: ReviewMedia; finalFocus: () => HTMLElement | false | null;
  onClose: () => void; onSelect: (file: ReviewMedia) => void;
}) {
  return <TablePreviewDrawer open={!!row&&!!file} items={row?.media??[]} selectedId={file?.id} collection={row?.kind==="media"?"images":"files"} description={row?.name} finalFocus={finalFocus} onClose={onClose} onSelect={onSelect}/>;
}
