import { useEffect, useState } from "react";
import { isSafeAttachmentUrl } from "./attachment-file-utils";
import type { AttachmentRecord } from "./types";

/** Allocations belong to the committed effect, including StrictMode's setup/cleanup replay. */
export function useAttachmentObjectUrl(file?: File): string | undefined {
  const [resource, setResource] = useState<{ file: File; url: string }>();
  useEffect(() => {
    if (!file) { setResource(undefined); return; }
    const url = URL.createObjectURL(file);
    setResource({ file, url });
    return () => URL.revokeObjectURL(url);
  }, [file]);
  return resource?.file === file ? resource?.url : undefined;
}

/** Resolves when the browser download has been initiated, not when it has been saved. */
export async function downloadAttachment(attachment: AttachmentRecord, options: { signal?: AbortSignal } = {}): Promise<void> {
  const { signal } = options;
  signal?.throwIfAborted();
  if (attachment.permissions?.download === false) throw new Error(attachment.permissionReasons?.download || "不允许下载此文件");
  if (attachment.availability && attachment.availability !== "available") throw new Error(attachment.availabilityMessage || "此文件当前不可用");
  let blob: Blob;
  if (attachment.url) {
    if (!isSafeAttachmentUrl(attachment.url)) throw new Error("文件地址不安全，无法下载");
    const response = await fetch(attachment.url, { signal });
    if (signal?.aborted) {
      await response.body?.cancel().catch(() => {});
      signal.throwIfAborted();
    }
    if (!response.ok) throw new Error(`下载失败（${response.status}）`);
    blob = await response.blob();
  } else if (attachment.file) {
    blob = attachment.file;
  } else {
    throw new Error("此文件没有可下载的内容");
  }
  signal?.throwIfAborted();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  let initiated = false;
  try {
    anchor.href = url;
    anchor.download = attachment.name;
    anchor.hidden = true;
    document.body.append(anchor);
    anchor.click();
    initiated = true;
  } finally {
    anchor.remove();
    // The browser consumes the URL asynchronously. Bound its lifetime without revoking during the click.
    if (initiated) setTimeout(() => URL.revokeObjectURL(url), 1000);
    else URL.revokeObjectURL(url);
  }
}
