import { useEffect, useId, useLayoutEffect, useRef, useState, type DragEvent, type ReactNode, type Ref } from "react";
import { Button, defineRainLocalRecipe, type ButtonPart } from "@rain-next/ui";
import { AddBoldIcon } from "@rain-next/ui/icons/add-bold";
import { AttachmentIcon } from "@rain-next/ui/icons/attachment";
import { UploadIcon } from "@rain-next/ui/icons/upload";
import { ImageIcon } from "@rain-next/ui/icons/image";
import "./attachment-intake.css";

// Page-private intake, derived from AttachmentPicker's native input/receive guards.
// File validation, upload state and persistence continue to belong to the controller.
const tileRecipe = defineRainLocalRecipe<ButtonPart, "ui-button">({
  id: "local-attachment-intake-media-tile", scope: "feature", origin: "ui-button",
  classes: { root: "attachment-intake__tile", label: "attachment-intake__tile-label" },
  modifiedParts: ["root", "label"], candidateTokens: [], promotionStatus: "not-proposed",
});
type Props = {
  variant: "list" | "media" | "composer";
  count: number;
  label: string;
  accept?: string;
  description?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  onFiles: (files: File[]) => void | Promise<void>;
  buttonRef?: Ref<HTMLButtonElement>;
  children: (parts: { trigger: ReactNode; empty: ReactNode }) => ReactNode;
};

export function AttachmentIntake({ variant, count, label, accept, description: extraDescription, disabled = false, readOnly = false, onFiles, buttonRef, children }: Props) {
  const id = useId(), input = useRef<HTMLInputElement>(null), root = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false), [pending, setPending] = useState(false), [error, setError] = useState("");
  const depth = useRef(0), accepting = useRef(false), alive = useRef(true);
  const focusOwned = useRef(false), wasEmpty = useRef(count === 0), restoreEntryFocus = useRef(false);
  const blocked = disabled || readOnly || pending;
  const clearDrag = () => { depth.current = 0; setDragging(false); };
  useEffect(() => {
    alive.current = true;
    const clear = () => { depth.current = 0; setDragging(false); };
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") clear(); };
    window.addEventListener("blur", clear); window.addEventListener("dragend", clear); window.addEventListener("drop", clear, true); window.addEventListener("keydown", key);
    return () => { alive.current = false; window.removeEventListener("blur", clear); window.removeEventListener("dragend", clear); window.removeEventListener("drop", clear, true); window.removeEventListener("keydown", key); };
  }, []);
  useEffect(() => { if (disabled || readOnly) clearDrag(); }, [disabled, readOnly]);
  useLayoutEffect(() => {
    const empty = count === 0;
    if (wasEmpty.current !== empty && focusOwned.current && document.activeElement === document.body) restoreEntryFocus.current = true;
    if (restoreEntryFocus.current && !blocked) {
      if (focusOwned.current && document.activeElement === document.body) root.current?.querySelector<HTMLButtonElement>("[data-intake-trigger]")?.focus();
      restoreEntryFocus.current = false;
    }
    wasEmpty.current = empty;
  }, [count, blocked]);
  async function receive(files: File[]) {
    if (disabled || readOnly || accepting.current || !files.length) return;
    accepting.current = true; setPending(true); setError(""); clearDrag();
    try { await onFiles(files); }
    catch (failure) { if (alive.current) setError(failure instanceof Error && failure.message ? failure.message : "无法添加附件，请重试。"); }
    finally { if (alive.current) { accepting.current = false; setPending(false); } }
  }
  const fileDrag = (event: DragEvent<HTMLDivElement>) => event.currentTarget.contains(event.target as Node) && (Array.from(event.dataTransfer.types).includes("Files") || event.dataTransfer.files.length > 0);
  const choose = () => { if (!blocked) input.current?.click(); };
  const description = `${id}-hint${extraDescription ? ` ${id}-description` : ""}${error ? ` ${id}-error` : ""}`;
  const entryProps = { ref: buttonRef, type: "button" as const, disabled: blocked, "data-intake-trigger": true, "aria-label": label, "aria-describedby": description, "aria-invalid": Boolean(error), onClick: choose };
  const trigger = variant === "composer"
    ? <Button {...entryProps} variant="text" leadingIcon={<AttachmentIcon />}>添加附件</Button>
    : variant === "media"
      ? <Button {...entryProps} variant="tertiary" localRecipe={tileRecipe}><AddBoldIcon aria-hidden="true" /><span>添加图片或视频</span><span className="attachment-intake__tile-hint">点击选择或拖入</span></Button>
      : <Button {...entryProps} variant="tertiary" size="medium" leadingIcon={<AddBoldIcon />}>添加文件</Button>;
  const empty = <div className="attachment-intake__empty" data-slot="empty">
    {variant === "media" ? <ImageIcon aria-hidden="true" /> : <UploadIcon aria-hidden="true" />}
    <div className="attachment-intake__empty-action"><span>{variant === "media" ? "拖入图片或视频，或" : "拖拽文件到这里，或"}</span><Button {...entryProps} variant="text" tone="brand">选择文件</Button></div>
    <p>{variant === "media" ? "添加课堂照片与演示视频" : "文件将添加到当前资料区"}</p>
  </div>;
  return <div ref={root} className="attachment-intake" data-rain-id="local-attachment-intake" data-slot="intake" data-local-experiment="attachment-intake" data-variant={variant} data-state={dragging && !blocked ? "dragging" : pending ? "pending" : "idle"} data-empty={count === 0 || undefined}
    role="group" aria-label={label} data-readonly={readOnly || undefined} data-disabled={disabled || undefined} aria-busy={pending || undefined}
    onFocusCapture={() => { focusOwned.current = true; }}
    onBlurCapture={event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) focusOwned.current = false; }}
    onDragEnter={event => { if (!fileDrag(event)) return; event.preventDefault(); event.stopPropagation(); if (!blocked) { depth.current += 1; setDragging(true); } }}
    onDragOver={event => { if (!fileDrag(event)) return; event.preventDefault(); event.stopPropagation(); event.dataTransfer.dropEffect = blocked ? "none" : "copy"; if (!blocked) setDragging(true); }}
    onDragLeave={event => {
      if (!dragging) return;
      depth.current = Math.max(0, depth.current - 1);
      if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget as Node)) return;
      if (depth.current === 0) clearDrag();
    }}
    onDrop={event => { if (!fileDrag(event)) return; event.preventDefault(); event.stopPropagation(); clearDrag(); void receive(Array.from(event.dataTransfer.files)); }}>
    {children({ trigger, empty })}
    {extraDescription && <p id={`${id}-description`} className="attachment-intake__description">{extraDescription}</p>}
    <input ref={input} type="file" hidden aria-label={label} aria-describedby={description} aria-invalid={Boolean(error)} disabled={blocked} accept={accept} multiple onChange={event => { const files = Array.from(event.currentTarget.files ?? []); event.currentTarget.value = ""; void receive(files); }} />
    <span id={`${id}-hint`} className="attachment-intake__sr" role="status">{readOnly ? "只读模式，无法添加附件。" : disabled ? "当前无法添加附件。" : pending ? "正在添加附件…" : "也可将文件拖入此区域。"}</span>
    {error && <p id={`${id}-error`} className="attachment-intake__error" role="alert">{error}</p>}
    {dragging && !blocked && <div className="attachment-intake__overlay" data-slot="drop-feedback" aria-hidden="true"><AttachmentIcon /><span>{variant === "composer" ? "松开以添加到这条消息" : variant === "media" ? "松开以添加图片或视频" : "松开以添加到当前资料区"}</span></div>}
  </div>;
}
