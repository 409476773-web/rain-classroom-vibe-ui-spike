"use client";

import { useEffect, useId, useRef, useState, type ReactNode, type Ref } from "react";
import { Button } from "../button/button";
import { AttachmentIcon } from "../icons/attachment";
import { rainCn } from "../utils/rain-class-names";
import "./attachment-picker.css";

export type AttachmentPickerProps = {
  /** Both entry points pass the actual Files here; the caller owns validation and upload. */
  onFiles: (files: File[]) => void | Promise<void>;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  description?: ReactNode;
  buttonRef?: Ref<HTMLButtonElement>;
  className?: string;
  /** Compact file intake for composer footers; retains the same picker and drop handling. */
  variant?: "dropzone" | "button";
};

export function AttachmentPicker({ onFiles, accept, multiple = true, disabled = false, readOnly = false, label = "添加附件", description, buttonRef, className, variant = "dropzone" }: AttachmentPickerProps) {
  const id = useId(), input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(""), [pending, setPending] = useState(false);
  const accepting = useRef(false), generation = useRef(0);
  useEffect(() => () => { generation.current += 1; }, []);
  const blocked = disabled || readOnly || pending;
  const describedBy = [`${id}-hint`, description ? `${id}-description` : undefined, error ? `${id}-error` : undefined].filter(Boolean).join(" ");
  const hint = readOnly ? "只读模式，无法添加附件。" : disabled ? "当前无法添加附件。" : pending ? "正在添加附件…" : multiple ? "或将文件拖到这里。" : "或将一个文件拖到这里。";

  async function receive(files: File[]) {
    if (disabled || readOnly || accepting.current || !files.length) return;
    if (!multiple && files.length > 1) { setError("请选择一个文件。"); return; }
    const request = ++generation.current;
    accepting.current = true; setPending(true); setError("");
    try { await onFiles(files); }
    catch (failure) {
      if (generation.current === request) setError(failure instanceof Error && failure.message ? failure.message : "无法添加附件，请重试。");
    } finally {
      if (generation.current === request) { accepting.current = false; setPending(false); }
    }
  }

  return <div className={rainCn("rain-attachment-picker", className)} data-rain-id="recipe-attachment-workflow" data-slot="picker" data-variant={variant} data-readonly={readOnly || undefined}
    role="group" aria-label={label} aria-disabled={blocked || undefined} aria-busy={pending || undefined}
    onDragOver={event => {
      if (!event.dataTransfer.types.includes("Files") && !event.dataTransfer.files.length) return;
      event.preventDefault(); event.stopPropagation(); event.dataTransfer.dropEffect = blocked ? "none" : "copy";
    }}
    onDrop={event => {
      if (!event.dataTransfer.types.includes("Files") && !event.dataTransfer.files.length) return;
      event.preventDefault(); event.stopPropagation(); void receive(Array.from(event.dataTransfer.files));
    }}>
    <div className="rain-attachment-picker__controls">
      <Button ref={buttonRef} type="button" variant={variant === "button" ? "text" : "primary"} leadingIcon={variant === "button" ? <AttachmentIcon /> : undefined} disabled={blocked} aria-describedby={describedBy} aria-invalid={Boolean(error)}
        onClick={() => { if (!blocked) input.current?.click(); }}>{label}</Button>
      <span id={`${id}-hint`} className="rain-attachment-picker__hint" role="status">{hint}</span>
    </div>
    <input ref={input} type="file" hidden aria-label={label} aria-describedby={describedBy} aria-invalid={Boolean(error)}
      accept={accept} multiple={multiple} disabled={blocked} onChange={event => {
        const files = Array.from(event.currentTarget.files ?? []);
        event.currentTarget.value = "";
        void receive(files);
      }} />
    {description && <div id={`${id}-description`} className="rain-attachment-picker__description">{description}</div>}
    {error && <p id={`${id}-error`} className="rain-attachment-picker__error" role="alert">{error}</p>}
  </div>;
}
