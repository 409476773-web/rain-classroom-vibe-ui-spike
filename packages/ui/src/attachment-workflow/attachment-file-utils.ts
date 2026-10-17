import type { AttachmentConstraints, AttachmentRecord, AttachmentRejection } from "./types";

type AttachmentKind = "image" | "pdf" | "document" | "spreadsheet" | "presentation" | "archive" | "audio" | "video" | "text" | "file";
type FileInformation = Pick<AttachmentRecord, "name" | "type">;

const mimeKinds: Record<string, AttachmentKind> = {
  "application/pdf": "pdf",
  "application/msword": "document",
  "application/rtf": "document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "document",
  "application/vnd.oasis.opendocument.text": "document",
  "application/vnd.ms-excel": "spreadsheet",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "spreadsheet",
  "application/vnd.oasis.opendocument.spreadsheet": "spreadsheet",
  "text/csv": "spreadsheet",
  "application/vnd.ms-powerpoint": "presentation",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "presentation",
  "application/vnd.oasis.opendocument.presentation": "presentation",
  "application/zip": "archive",
  "application/x-zip-compressed": "archive",
  "application/gzip": "archive",
  "application/x-7z-compressed": "archive",
  "application/vnd.rar": "archive",
  "application/x-rar-compressed": "archive",
  "application/x-tar": "archive",
  "application/json": "text",
  "application/xml": "text",
};
const extensionKinds: [AttachmentKind, readonly string[]][] = [
  ["image", ["jpg", "jpeg", "png", "gif", "webp", "avif", "bmp", "ico"]],
  ["pdf", ["pdf"]],
  ["document", ["doc", "docx", "odt", "rtf"]],
  ["spreadsheet", ["xls", "xlsx", "ods", "csv"]],
  ["presentation", ["ppt", "pptx", "odp"]],
  ["archive", ["zip", "rar", "7z", "tar", "gz", "bz2", "xz"]],
  ["audio", ["mp3", "wav", "m4a", "aac", "ogg", "flac"]],
  ["video", ["mp4", "webm", "mov", "avi", "mkv", "m4v"]],
  ["text", ["txt", "md", "json", "xml", "yaml", "yml", "log"]],
];
const rasterMimeTypes = new Set([
  "image/jpeg", "image/png", "image/gif", "image/webp", "image/avif", "image/bmp",
  "image/x-icon", "image/vnd.microsoft.icon",
]);
const kindLabels: Record<AttachmentKind, string> = {
  image: "图片", pdf: "PDF", document: "文档", spreadsheet: "表格", presentation: "演示文稿",
  archive: "压缩包", audio: "音频", video: "视频", text: "文本", file: "未知类型",
};

function fileExtension(name: string): string {
  return name.toLowerCase().match(/\.([^.]+)$/)?.[1] ?? "";
}

function fileMimeType(type?: string): string {
  return type?.split(";", 1)[0]?.trim().toLowerCase() ?? "";
}

function isSvg(record: FileInformation): boolean {
  return fileMimeType(record.type) === "image/svg+xml" || /^(svg|svgz)$/.test(fileExtension(record.name));
}

/** Classification uses metadata, not content inspection. Only allowlisted raster formats become images. */
export function getAttachmentKind(record: FileInformation): AttachmentKind {
  if (isSvg(record)) return "file";
  const mime = fileMimeType(record.type);
  if (Object.hasOwn(mimeKinds, mime)) return mimeKinds[mime]!;
  if (mime.startsWith("image/")) return rasterMimeTypes.has(mime) ? "image" : "file";
  if (mime.startsWith("audio/")) return "audio";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("text/")) return "text";
  const extension = fileExtension(record.name);
  for (const [kind, extensions] of extensionKinds) {
    if (extensions.includes(extension)) return kind;
  }
  return "file";
}

export function attachmentTypeLabel(record: FileInformation): string {
  return isSvg(record) ? "SVG 文件" : kindLabels[getAttachmentKind(record)];
}

export function formatAttachmentSize(bytes?: number): string {
  if (bytes === undefined || !Number.isFinite(bytes) || bytes < 0) return "大小未知";
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
  let value = Math.floor(bytes);
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${Number(value.toFixed(1))} ${units[unit]}`;
}

/** Restricts protocols, not resource authorization or the server's returned content. */
export function isSafeAttachmentUrl(url?: string): boolean {
  if (!url || /[\u0000-\u001f\u007f\\]/.test(url)) return false;
  const value = url.trim();
  if (!value || value.startsWith("//")) return false;
  try {
    if (/^https?:\/\//i.test(value)) {
      const parsed = new URL(value);
      return (parsed.protocol === "https:" || parsed.protocol === "http:") && !!parsed.hostname;
    }
    if (/^blob:/i.test(value)) {
      const resource = value.slice(5);
      if (/^null\/[^/?#]+$/.test(resource)) return true;
      if (!/^https?:\/\//i.test(resource)) return false;
      const parsed = new URL(resource);
      return !!parsed.hostname && parsed.pathname.length > 1;
    }
    if (/^[a-z][a-z\d+.-]*:/i.test(value)) return false;
    const base = "https://attachment.invalid/";
    return new URL(value, base).origin === new URL(base).origin;
  } catch {
    return false;
  }
}

// Omitted, NaN and +Infinity mean no limit; negative limits prohibit additions; fractions round down.
function normalizeLimit(limit?: number): number {
  return limit === undefined || Number.isNaN(limit) ? Infinity : Math.max(0, Math.floor(limit));
}

function knownSize(size?: number): number {
  return size !== undefined && Number.isFinite(size) && size >= 0 ? size : 0;
}

function duplicateKey(file: File): string {
  return JSON.stringify([file.name, file.size, file.lastModified]);
}

function matchesAccept(file: File, rules: readonly string[]): boolean {
  const name = file.name.toLowerCase();
  const type = fileMimeType(file.type);
  return rules.length === 0 || rules.some((rule) => {
    if (rule.startsWith(".")) return name.endsWith(rule);
    if (/^[a-z\d!#$&^_.+-]+\/\*$/.test(rule)) return type.startsWith(rule.slice(0, -1));
    return type !== "" && type === rule;
  });
}

/** Client-side checks only. Unknown remote sizes are not invented; the host must enforce server quotas. */
export function validateAttachmentFiles(
  files: readonly File[],
  existing: readonly AttachmentRecord[],
  constraints: AttachmentConstraints = {},
  replacingId?: string,
): { accepted: File[]; rejected: AttachmentRejection[] } {
  const accepted: File[] = [];
  const rejected: AttachmentRejection[] = [];
  const retained = existing.filter((item) => replacingId === undefined || item.id !== replacingId);
  const keys = new Set<string>();
  let totalSize = 0;
  for (const item of retained) {
    const originalSize = knownSize(item.file?.size ?? item.size);
    // Keep enough room for either successful replacement or rollback to the original resource.
    totalSize += Math.max(originalSize, knownSize(item.replacement?.file.size));
    if (item.file) keys.add(duplicateKey(item.file));
    if (item.replacement) keys.add(duplicateKey(item.replacement.file));
  }
  const maxFiles = normalizeLimit(constraints.maxFiles);
  const maxFileSize = normalizeLimit(constraints.maxFileSize);
  const maxTotalSize = normalizeLimit(constraints.maxTotalSize);
  const rules = constraints.accept?.split(",").map((rule) => rule.trim().toLowerCase()).filter(Boolean) ?? [];

  for (const file of files) {
    const reject = (code: AttachmentRejection["code"], reason: string) => rejected.push({ file, code, reason });
    const key = duplicateKey(file);
    if (file.size === 0) {
      reject("empty", "文件为空，请选择有内容的文件");
    } else if (!matchesAccept(file, rules)) {
      reject("type", "不支持此文件类型");
    } else if (file.size > maxFileSize) {
      reject("size", `单个文件不能超过 ${formatAttachmentSize(maxFileSize)}`);
    } else if (constraints.duplicates !== "allow" && keys.has(key)) {
      reject("duplicate", "已存在名称、大小和修改时间相同的文件");
    } else if (retained.length + accepted.length >= maxFiles) {
      reject("count", `最多可添加 ${maxFiles} 个文件`);
    } else if (totalSize + file.size > maxTotalSize) {
      reject("total-size", `文件总大小不能超过 ${formatAttachmentSize(maxTotalSize)}`);
    } else {
      let customReason: string | undefined;
      try {
        customReason = constraints.validate?.(file)?.trim();
      } catch {
        customReason = "文件校验失败，请重试";
      }
      if (customReason) {
        reject("custom", customReason);
        continue;
      }
      accepted.push(file);
      keys.add(key);
      totalSize += file.size;
    }
  }
  return { accepted, rejected };
}
