import { isSafeAttachmentUrl } from "./attachment-file-utils";
import type { AttachmentRecord } from "./types";

type VideoType = "video/mp4" | "video/webm" | "video/ogg";
const videoTypes: Record<string, VideoType> = {
  mp4: "video/mp4", webm: "video/webm", ogg: "video/ogg", ogv: "video/ogg",
};

function typeForName(name: string): VideoType | undefined {
  const extension = name.toLowerCase().match(/\.([^.]+)$/)?.[1] ?? "";
  return Object.hasOwn(videoTypes, extension) ? videoTypes[extension] : undefined;
}

function mimeType(type?: string): string {
  return type?.split(";", 1)[0]?.trim().toLowerCase() ?? "";
}

/** Metadata eligibility only; native media errors still determine actual browser/codec support. */
export function getAttachmentVideoType(item: AttachmentRecord): VideoType | undefined {
  const expected = typeForName(item.name);
  if (!expected || mimeType(item.type || item.file?.type) !== expected) return undefined;
  // Retained local bytes must not contradict the declared format or create a misleading playable file.
  if (item.file && (typeForName(item.file.name) !== expected || mimeType(item.file.type) !== expected || item.file.size === 0)) return undefined;
  return expected;
}

/** Native controls cannot enforce download denial. Only ready, permitted resources get a play affordance. */
export function canPreviewVideo(item: AttachmentRecord): boolean {
  if ((item.status ?? "done") !== "done" || (item.availability && item.availability !== "available")
    || item.permissions?.preview === false || item.permissions?.download === false || !getAttachmentVideoType(item)) return false;
  const source = item.previewUrl || item.url;
  return source ? isSafeAttachmentUrl(source) : !!item.file;
}
