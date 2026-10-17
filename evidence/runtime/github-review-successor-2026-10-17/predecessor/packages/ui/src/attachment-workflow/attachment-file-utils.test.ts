import { describe, expect, it } from "vitest";
import {
  attachmentTypeLabel,
  formatAttachmentSize,
  getAttachmentKind,
  isSafeAttachmentUrl,
  validateAttachmentFiles,
} from "./attachment-file-utils";
import type { AttachmentRecord } from "./types";

const file = (name: string, size = 4, type = "", lastModified = 1) =>
  new File([new Uint8Array(size)], name, { type, lastModified });
const record = (id: string, value: File): AttachmentRecord =>
  ({ id, name: value.name, size: value.size, type: value.type, file: value });

describe("attachment file information", () => {
  it.each([
    ["PHOTO.JPG", "", "image"],
    ["photo", "image/png", "image"],
    ["scan.PDF", "application/octet-stream", "pdf"],
    ["homework.docx", "", "document"],
    ["grades.xlsx", "", "spreadsheet"],
    ["lesson.pptx", "", "presentation"],
    ["materials.tar.gz", "", "archive"],
    ["recording", "audio/mpeg", "audio"],
    ["lesson", "video/mp4", "video"],
    ["notes.txt", "", "text"],
    ["no-extension", "", "file"],
    ["unknown.custom", "application/x-custom", "file"],
    ["unknown.custom", "constructor", "file"],
    ["unknown.custom", "__proto__", "file"],
    ["actually-pdf.jpg", "application/pdf", "pdf"],
    ["vector.svg", "image/png", "file"],
    ["misnamed.png", "image/svg+xml", "file"],
    ["unsupported.png", "image/x-unknown", "file"],
  ])("classifies %s (%s) as %s", (name, type, expected) => {
    expect(getAttachmentKind({ name, type })).toBe(expected);
  });

  it("labels unknown types explicitly and keeps SVG out of image preview", () => {
    expect(attachmentTypeLabel({ name: "unknown" })).toBe("未知类型");
    expect(attachmentTypeLabel({ name: "icon.svg" })).toBe("SVG 文件");
    expect(attachmentTypeLabel({ name: "lesson.pdf" })).toBe("PDF");
  });

  it.each([
    [undefined, "大小未知"], [NaN, "大小未知"], [Infinity, "大小未知"], [-1, "大小未知"],
    [0, "0 B"], [512, "512 B"], [1024, "1 KB"], [1536, "1.5 KB"],
    [1024 ** 2, "1 MB"], [1024 ** 3, "1 GB"],
  ])("formats size %s as %s", (bytes, expected) => {
    expect(formatAttachmentSize(bytes)).toBe(expected);
  });
});

describe("attachment resource URL safety", () => {
  it.each([
    "/files/lesson.pdf", "./lesson.pdf", "../lesson.pdf", "lesson.pdf?download=1", "?download=1", "#preview",
    "https://school.example/files/a.pdf", "http://localhost:8080/file", " HTTPS://school.example/a.pdf ",
    "blob:https://school.example/7f8d", "blob:http://localhost:8080/7f8d", "blob:null/7f8d",
  ])("allows %s", (url) => expect(isSafeAttachmentUrl(url)).toBe(true));

  it.each([
    undefined, "", " ", "javascript:alert(1)", "JaVaScRiPt:alert(1)", "java\nscript:alert(1)",
    "data:image/png;base64,AAAA", "file:///tmp/a.pdf", "ftp://files.example/a.pdf",
    "//external.example/a.pdf", "\\\\external.example\\a.pdf", "/\\external.example/a.pdf",
    "https://", "https:external.example", "blob:javascript:alert(1)", "blob:data:text/html,test",
  ])("rejects %s", (url) => expect(isSafeAttachmentUrl(url)).toBe(false));
});

describe("validateAttachmentFiles", () => {
  it("keeps valid files from a mixed batch and gives each rejected file a reason", () => {
    const good = file("good.pdf", 4, "application/pdf");
    const empty = file("empty.pdf", 0, "application/pdf");
    const wrongType = file("notes.txt", 4, "text/plain");
    const tooLarge = file("large.pdf", 9, "application/pdf");
    const result = validateAttachmentFiles([good, empty, wrongType, tooLarge], [], { accept: ".pdf", maxFileSize: 8 });
    expect(result.accepted).toEqual([good]);
    expect(result.rejected.map(({ file: rejected, code }) => [rejected, code])).toEqual([
      [empty, "empty"], [wrongType, "type"], [tooLarge, "size"],
    ]);
    expect(result.rejected.every(({ reason }) => reason.trim().length > 0)).toBe(true);
  });

  it("supports comma-separated extensions, MIME types and MIME groups", () => {
    const files = [file("REPORT.PDF"), file("image", 2, "image/webp"), file("note", 2, "text/plain"), file("data.zip")];
    const result = validateAttachmentFiles(files, [], { accept: " .PDF, image/* , text/plain " });
    expect(result.accepted).toEqual(files.slice(0, 3));
    expect(result.rejected[0]).toMatchObject({ file: files[3], code: "type" });
    expect(validateAttachmentFiles(files, [], { accept: " , " }).accepted).toEqual(files);
  });

  it("rejects a matching local metadata tuple but accepts same-name different files", () => {
    const original = file("work.pdf", 4, "application/pdf", 7);
    const duplicate = file("work.pdf", 4, "application/pdf", 7);
    const changedSize = file("work.pdf", 5, "application/pdf", 7);
    const changedTime = file("work.pdf", 4, "application/pdf", 8);
    const result = validateAttachmentFiles([duplicate, changedSize, changedTime], [record("original", original)]);
    expect(result.accepted).toEqual([changedSize, changedTime]);
    expect(result.rejected).toEqual([{ file: duplicate, code: "duplicate", reason: expect.any(String) }]);
  });

  it("deduplicates within a batch and supports explicit duplicate acceptance", () => {
    const a = file("a.pdf");
    const b = file("a.pdf");
    expect(validateAttachmentFiles([a, b], []).accepted).toEqual([a]);
    expect(validateAttachmentFiles([a, b], []).rejected[0]?.code).toBe("duplicate");
    expect(validateAttachmentFiles([a, b], [record("old", a)], { duplicates: "allow" }).accepted).toEqual([a, b]);
  });

  it("does not infer same content from remote name and size alone", () => {
    const next = file("work.pdf");
    const remote: AttachmentRecord = { id: "remote", name: next.name, size: next.size, url: "/work.pdf" };
    expect(validateAttachmentFiles([next], [remote]).accepted).toEqual([next]);
  });

  it("counts existing items and previously accepted files without charging rejected files", () => {
    const first = file("first.pdf");
    const second = file("second.pdf");
    const result = validateAttachmentFiles([file("empty.pdf", 0), first, second], [{ id: "old", name: "old.pdf" }], { maxFiles: 2 });
    expect(result.accepted).toEqual([first]);
    expect(result.rejected.map(({ code }) => code)).toEqual(["empty", "count"]);
  });

  it("fits subsequent smaller files when another file exceeds total capacity", () => {
    const tooBig = file("large.pdf", 7);
    const fits = file("small.pdf", 6);
    const noSpace = file("extra.pdf", 1);
    const result = validateAttachmentFiles([tooBig, fits, noSpace], [{ id: "old", name: "old.pdf", size: 4 }], { maxTotalSize: 10 });
    expect(result.accepted).toEqual([fits]);
    expect(result.rejected.map(({ code }) => code)).toEqual(["total-size", "total-size"]);
  });

  it("excludes the replacement target from count, size and duplicate checks", () => {
    const original = file("a.pdf", 9);
    const replacement = file("a.pdf", 9);
    expect(validateAttachmentFiles([replacement], [record("target", original)], { maxFiles: 1, maxTotalSize: 9 }, "target").accepted).toEqual([replacement]);
  });

  it.each([[4, 9], [9, 4]])("reserves the larger of original %s and pending replacement %s", (originalSize, replacementSize) => {
    const pending = file("pending.pdf", replacementSize);
    const existing: AttachmentRecord[] = [
      { ...record("other", file("old.pdf", originalSize)), replacement: { file: pending, status: "uploading" } },
      record("target", file("target.pdf", 5)),
    ];
    const result = validateAttachmentFiles([file("new.pdf", 2)], existing, { maxTotalSize: 10 }, "target");
    expect(result.rejected[0]?.code).toBe("total-size");
  });

  it("checks duplicates against another pending replacement", () => {
    const pending = file("pending.pdf");
    const existing = [{ ...record("old", file("old.pdf")), replacement: { file: pending, status: "error" as const } }];
    expect(validateAttachmentFiles([file("pending.pdf")], existing).rejected[0]?.code).toBe("duplicate");
  });

  it("uses actual local size when stale record metadata disagrees", () => {
    const existing = [{ ...record("old", file("old.pdf", 8)), size: 1 }];
    expect(validateAttachmentFiles([file("next.pdf", 3)], existing, { maxTotalSize: 10 }).rejected[0]?.code).toBe("total-size");
  });

  it("does not invent sizes for remote records with unknown or invalid metadata", () => {
    const existing = [{ id: "a", name: "a" }, { id: "b", name: "b", size: NaN }, { id: "c", name: "c", size: -5 }];
    const next = file("new.pdf", 4);
    expect(validateAttachmentFiles([next], existing, { maxTotalSize: 4 }).accepted).toEqual([next]);
  });

  it("applies custom validation without blocking later valid files", () => {
    const files = [file("denied.pdf"), file("throws.pdf"), file("allowed.pdf")];
    const result = validateAttachmentFiles(files, [], { validate: (value) => {
      if (value.name === "denied.pdf") return "仅限已审核的文件";
      if (value.name === "throws.pdf") throw new Error("validation failed");
      return undefined;
    } });
    expect(result.accepted).toEqual([files[2]]);
    expect(result.rejected.map(({ code }) => code)).toEqual(["custom", "custom"]);
    expect(result.rejected[0]?.reason).toBe("仅限已审核的文件");
  });

  it("normalizes invalid limits: NaN and positive infinity are unlimited, negative limits are zero, fractions floor", () => {
    const files = [file("a", 1), file("b", 1)];
    expect(validateAttachmentFiles(files, [], { maxFiles: NaN, maxFileSize: Infinity, maxTotalSize: Infinity }).accepted).toEqual(files);
    expect(validateAttachmentFiles(files, [], { maxFiles: -1 }).rejected.map(({ code }) => code)).toEqual(["count", "count"]);
    expect(validateAttachmentFiles(files, [], { maxFiles: 1.9 }).accepted).toEqual([files[0]]);
    expect(validateAttachmentFiles(files, [], { maxFileSize: -Infinity }).rejected[0]?.code).toBe("size");
    expect(validateAttachmentFiles(files, [], { maxTotalSize: 0.9 }).rejected[0]?.code).toBe("total-size");
  });
});
