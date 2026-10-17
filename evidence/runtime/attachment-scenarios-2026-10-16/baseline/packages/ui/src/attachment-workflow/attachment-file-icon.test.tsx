import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getAttachmentFileIcon } from "./attachment-file-icon";
import { getAttachmentKind } from "./attachment-file-utils";

describe("attachment file identity icons", () => {
  it.each([
    ["课程.pdf", "application/pdf", "file-format-pdf"],
    ["数据.jsonl", "text/plain", "file-format-jsonl"],
    ["说明.MD", "text/plain", "file-format-markdown"],
    ["提纲.key", "", "file-format-key"],
    ["统计.numbers", "", "file-format-num"],
    ["讲义.pages", "", "file-format-pgs"],
    ["成绩.csv", "text/plain", "file-format-csv"],
    ["课件.pptx", "", "file-format-ppt"],
    ["录像.mp4", "video/mp4", "file-format-video-mp4"],
    ["录音.mp3", "audio/mpeg", "file-format-audio-mp3"],
    ["材料.rar", "", "file-format-rar"],
    ["截图.JPEG", "image/jpeg", "file-format-image-jpeg"],
    ["无扩展名", "application/pdf", "file-format-pdf"],
    ["未知", "video/custom", "file-format-video"],
    ["数据.json", "application/json", "file-format-generic"],
    ["未知.constructor", "", "file-format-generic"],
    ["未知.__proto__", "", "file-format-generic"],
  ])("uses the registered color asset for %s", (name, type, slug) => {
    const FileIcon = getAttachmentFileIcon({ name, type });
    const { container } = render(<FileIcon />);
    expect(container.querySelector("[data-icon]")).toHaveAttribute("data-icon", `icon/${slug}`);
    expect(container.querySelector("[data-icon]")).toHaveAttribute("data-icon-color-mode", "intrinsic");
  });

  it("keeps icon identity independent from preview classification", () => {
    const item = { name: "课堂扫描.tif", type: "image/tiff" };
    const FileIcon = getAttachmentFileIcon(item);
    const { container } = render(<FileIcon />);
    expect(container.querySelector("[data-icon]")).toHaveAttribute("data-icon", "icon/file-format-image-tif");
    expect(getAttachmentKind(item)).toBe("file");
  });
});
