import { FileFormat7zIcon } from "../icons/file-format-7z";
import { FileFormatAudioIcon } from "../icons/file-format-audio";
import { FileFormatAudioAacIcon } from "../icons/file-format-audio-aac";
import { FileFormatAudioAiffIcon } from "../icons/file-format-audio-aiff";
import { FileFormatAudioAmrIcon } from "../icons/file-format-audio-amr";
import { FileFormatAudioFlacIcon } from "../icons/file-format-audio-flac";
import { FileFormatAudioM4aIcon } from "../icons/file-format-audio-m4a";
import { FileFormatAudioMp3Icon } from "../icons/file-format-audio-mp3";
import { FileFormatAudioOggIcon } from "../icons/file-format-audio-ogg";
import { FileFormatAudioWavIcon } from "../icons/file-format-audio-wav";
import { FileFormatAudioWmaIcon } from "../icons/file-format-audio-wma";
import { FileFormatCsvIcon } from "../icons/file-format-csv";
import { FileFormatDocxIcon } from "../icons/file-format-docx";
import { FileFormatDpsIcon } from "../icons/file-format-dps";
import { FileFormatEtIcon } from "../icons/file-format-et";
import { FileFormatGenericIcon } from "../icons/file-format-generic";
import { FileFormatImageBmpIcon } from "../icons/file-format-image-bmp";
import { FileFormatImageGifIcon } from "../icons/file-format-image-gif";
import { FileFormatImageJpegIcon } from "../icons/file-format-image-jpeg";
import { FileFormatImagePngIcon } from "../icons/file-format-image-png";
import { FileFormatImageTifIcon } from "../icons/file-format-image-tif";
import { FileFormatJsonlIcon } from "../icons/file-format-jsonl";
import { FileFormatKeyIcon } from "../icons/file-format-key";
import { FileFormatMarkdownIcon } from "../icons/file-format-markdown";
import { FileFormatNumIcon } from "../icons/file-format-num";
import { FileFormatPdfIcon } from "../icons/file-format-pdf";
import { FileFormatPgsIcon } from "../icons/file-format-pgs";
import { FileFormatPptIcon } from "../icons/file-format-ppt";
import { FileFormatRarIcon } from "../icons/file-format-rar";
import { FileFormatRtfIcon } from "../icons/file-format-rtf";
import { FileFormatTarIcon } from "../icons/file-format-tar";
import { FileFormatTxtIcon } from "../icons/file-format-txt";
import { FileFormatVideoIcon } from "../icons/file-format-video";
import { FileFormatVideo3gpIcon } from "../icons/file-format-video-3gp";
import { FileFormatVideoAviIcon } from "../icons/file-format-video-avi";
import { FileFormatVideoAvoIcon } from "../icons/file-format-video-avo";
import { FileFormatVideoFlvIcon } from "../icons/file-format-video-flv";
import { FileFormatVideoM4vIcon } from "../icons/file-format-video-m4v";
import { FileFormatVideoMkvIcon } from "../icons/file-format-video-mkv";
import { FileFormatVideoMovIcon } from "../icons/file-format-video-mov";
import { FileFormatVideoMp4Icon } from "../icons/file-format-video-mp4";
import { FileFormatVideoMpegIcon } from "../icons/file-format-video-mpeg";
import { FileFormatVideoMpgIcon } from "../icons/file-format-video-mpg";
import { FileFormatVideoRmvbIcon } from "../icons/file-format-video-rmvb";
import { FileFormatVideoWebmIcon } from "../icons/file-format-video-webm";
import { FileFormatVideoWmvIcon } from "../icons/file-format-video-wmv";
import { FileFormatWpsIcon } from "../icons/file-format-wps";
import { FileFormatXlsxIcon } from "../icons/file-format-xlsx";
import { FileFormatZipIcon } from "../icons/file-format-zip";
import type { AttachmentRecord } from "./types";

// Display identity only; this mapping does not allow previews or change upload validation.
const byExtension: Readonly<Record<string, typeof FileFormatPdfIcon>> = {
  "pdf": FileFormatPdfIcon,
  "docx": FileFormatDocxIcon,
  "rtf": FileFormatRtfIcon,
  "wps": FileFormatWpsIcon,
  "xlsx": FileFormatXlsxIcon,
  "csv": FileFormatCsvIcon,
  "et": FileFormatEtIcon,
  "ppt": FileFormatPptIcon,
  "dps": FileFormatDpsIcon,
  "txt": FileFormatTxtIcon,
  "jsonl": FileFormatJsonlIcon,
  "md": FileFormatMarkdownIcon,
  "key": FileFormatKeyIcon,
  "num": FileFormatNumIcon,
  "pgs": FileFormatPgsIcon,
  "zip": FileFormatZipIcon,
  "rar": FileFormatRarIcon,
  "7z": FileFormat7zIcon,
  "tar": FileFormatTarIcon,
  "bmp": FileFormatImageBmpIcon,
  "gif": FileFormatImageGifIcon,
  "jpeg": FileFormatImageJpegIcon,
  "png": FileFormatImagePngIcon,
  "tif": FileFormatImageTifIcon,
  "aac": FileFormatAudioAacIcon,
  "aiff": FileFormatAudioAiffIcon,
  "amr": FileFormatAudioAmrIcon,
  "flac": FileFormatAudioFlacIcon,
  "m4a": FileFormatAudioM4aIcon,
  "mp3": FileFormatAudioMp3Icon,
  "ogg": FileFormatAudioOggIcon,
  "wav": FileFormatAudioWavIcon,
  "wma": FileFormatAudioWmaIcon,
  "3gp": FileFormatVideo3gpIcon,
  "avi": FileFormatVideoAviIcon,
  "avo": FileFormatVideoAvoIcon,
  "flv": FileFormatVideoFlvIcon,
  "m4v": FileFormatVideoM4vIcon,
  "mkv": FileFormatVideoMkvIcon,
  "mov": FileFormatVideoMovIcon,
  "mp4": FileFormatVideoMp4Icon,
  "mpeg": FileFormatVideoMpegIcon,
  "mpg": FileFormatVideoMpgIcon,
  "rmvb": FileFormatVideoRmvbIcon,
  "webm": FileFormatVideoWebmIcon,
  "wmv": FileFormatVideoWmvIcon,
  // Recipe-local family/filename aliases; not global catalog semantic rules.
  "doc": FileFormatDocxIcon,
  "xls": FileFormatXlsxIcon,
  "pptx": FileFormatPptIcon,
  "markdown": FileFormatMarkdownIcon,
  "jpg": FileFormatImageJpegIcon,
  "tiff": FileFormatImageTifIcon,
  "numbers": FileFormatNumIcon,
  "pages": FileFormatPgsIcon,
};

const byMime: Readonly<Record<string, typeof FileFormatPdfIcon>> = {
  "application/pdf": FileFormatPdfIcon,
  "application/msword": FileFormatDocxIcon,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": FileFormatDocxIcon,
  "application/rtf": FileFormatRtfIcon,
  "application/vnd.ms-excel": FileFormatXlsxIcon,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": FileFormatXlsxIcon,
  "text/csv": FileFormatCsvIcon,
  "application/vnd.ms-powerpoint": FileFormatPptIcon,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": FileFormatPptIcon,
  "text/plain": FileFormatTxtIcon,
  "text/markdown": FileFormatMarkdownIcon,
  "application/zip": FileFormatZipIcon,
  "application/x-7z-compressed": FileFormat7zIcon,
  "application/vnd.rar": FileFormatRarIcon,
  "application/x-tar": FileFormatTarIcon,
  "audio/mpeg": FileFormatAudioMp3Icon,
  "audio/mp4": FileFormatAudioM4aIcon,
  "audio/wav": FileFormatAudioWavIcon,
  "audio/ogg": FileFormatAudioOggIcon,
  "audio/aac": FileFormatAudioAacIcon,
  "audio/flac": FileFormatAudioFlacIcon,
  "video/mp4": FileFormatVideoMp4Icon,
  "video/webm": FileFormatVideoWebmIcon,
  "video/quicktime": FileFormatVideoMovIcon,
  "image/png": FileFormatImagePngIcon,
  "image/jpeg": FileFormatImageJpegIcon,
  "image/gif": FileFormatImageGifIcon,
  "image/bmp": FileFormatImageBmpIcon,
  "image/tiff": FileFormatImageTifIcon,
};

/** Prefer a registered exact format; unknown formats retain a generic file identity. */
export function getAttachmentFileIcon(item: Pick<AttachmentRecord, "name" | "type">) {
  const dot = item.name.lastIndexOf(".");
  const extension = dot > 0 ? item.name.slice(dot + 1).toLowerCase() : "";
  if (Object.hasOwn(byExtension, extension)) return byExtension[extension]!;
  const mime = item.type?.split(";", 1)[0]?.trim().toLowerCase() ?? "";
  if (Object.hasOwn(byMime, mime)) return byMime[mime]!;
  if (mime.startsWith("audio/")) return FileFormatAudioIcon;
  if (mime.startsWith("video/")) return FileFormatVideoIcon;
  return FileFormatGenericIcon;
}
