import { createRef, StrictMode, useState } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AttachmentPreview } from "./attachment-preview";
import type { AttachmentRecord } from "./types";

const createObjectURL = vi.fn((_: Blob) => `blob:http://localhost/preview-${Math.random()}`);
const revokeObjectURL = vi.fn();
const image: AttachmentRecord = { id: "image", name: "课堂照片.png", type: "image/png", url: "/image.png" };
function props(attachment: AttachmentRecord = image) { return { attachment, open: true, onOpenChange: vi.fn() }; }
function pdfResponse(content = "%PDF-1.7\ncontent") {
  return { ok: true, headers: new Headers({ "content-type": "application/pdf" }), body: new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode(content)); controller.close(); } }) };
}
beforeEach(() => {
  createObjectURL.mockClear(); revokeObjectURL.mockClear();
  vi.stubGlobal("URL", Object.assign(URL, { createObjectURL, revokeObjectURL }));
  Object.defineProperty(navigator, "pdfViewerEnabled", { configurable: true, get: () => true });
  // jsdom does not implement the native media runtime; retain observable cleanup calls.
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); Reflect.deleteProperty(navigator, "pdfViewerEnabled"); });

describe("AttachmentPreview", () => {
  it("shows the actual image and filename, with an error fallback that keeps usable actions", async () => {
    render(<AttachmentPreview {...props()} />);
    const img = await screen.findByRole("img", { name: image.name });
    expect(img).toHaveAttribute("src", image.url);
    fireEvent.error(img);
    expect(screen.getByRole("alert")).toHaveTextContent("图片预览失败");
    expect(screen.getByRole("link", { name: `在新窗口打开 ${image.name}` })).toHaveAttribute("href", image.url);
    expect(screen.getByRole("button", { name: `下载 ${image.name}` })).toBeEnabled();
  });

  it("can preview a retained local image after upload failure and releases it on closing", async () => {
    const file = new File(["photo"], "local.png", { type: "image/png" });
    const initial = props({ id: "local", name: file.name, file, type: file.type, status: "error" });
    const view = render(<AttachmentPreview {...initial} />);
    const img = await screen.findByRole("img", { name: file.name });
    expect(img).toHaveAttribute("src", createObjectURL.mock.results[0]!.value);
    view.rerender(<AttachmentPreview {...initial} open={false} />);
    expect(revokeObjectURL).toHaveBeenCalledWith(createObjectURL.mock.results[0]!.value);
  });

  it.each([
    ["page.html", "text/html", "<script>localStorage.getItem('token')</script>"],
    ["drawing.svg", "image/svg+xml", "<svg xmlns='http://www.w3.org/2000/svg' onload='alert(1)'/>"],
    ["photo.png", "image/png", "<html><script>bad()</script></html>"],
  ])("never exposes an unverified local %s as a navigable Blob URL", async (name, type, bytes) => {
    render(<AttachmentPreview {...props({ id: "local-active", name, type, file: new File([bytes], name, { type }) })} />);
    await screen.findByRole("dialog", { name });
    expect(screen.queryByRole("link", { name: `在新窗口打开 ${name}` })).toBeNull();
    expect(screen.getByRole("button", { name: `下载 ${name}` })).toBeInTheDocument();
  });

  it("opens a local PDF only through the validated PDF-typed preview URL", async () => {
    const file = new File(["%PDF-1.7\ncontent"], "讲义.pdf", { type: "application/octet-stream" });
    render(<AttachmentPreview {...props({ id: "local-pdf", name: file.name, file })} />);
    expect(screen.queryByRole("link", { name: "在新窗口打开 讲义.pdf" })).toBeNull();
    const frame = await screen.findByTitle("预览 讲义.pdf");
    expect(screen.getByRole("link", { name: "在新窗口打开 讲义.pdf" })).toHaveAttribute("href", frame.getAttribute("src"));
    expect(createObjectURL.mock.calls).toHaveLength(1);
    expect(createObjectURL.mock.calls[0]![0].type).toBe("application/pdf");
  });

  it("rejects a disguised local PDF without exposing its original File for opening", async () => {
    const file = new File(["<html><script>bad()</script></html>"], "假文件.pdf", { type: "text/html" });
    render(<AttachmentPreview {...props({ id: "local-fake-pdf", name: file.name, type: "application/pdf", file })} />);
    expect(await screen.findByRole("alert")).toHaveTextContent("文件内容不是有效的 PDF");
    expect(screen.queryByRole("link")).toBeNull(); expect(createObjectURL).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "下载 假文件.pdf" })).toBeInTheDocument();
  });

  it("validates local PDF opening independently of the preview permission", async () => {
    const file = new File(["%PDF-1.7\ncontent"], "本地.pdf", { type: "application/pdf" });
    render(<AttachmentPreview {...props({ id: "open-only", name: file.name, file, permissions: { preview: false, open: true } })} />);
    expect(await screen.findByRole("link", { name: "在新窗口打开 本地.pdf" })).toBeInTheDocument();
    expect(document.querySelector("iframe")).toBeNull();
    expect(createObjectURL.mock.calls[0]![0].type).toBe("application/pdf");
    expect(createObjectURL.mock.calls[0]![0]).not.toBe(file);
  });

  it("shows local open-validation errors even when preview permission is disabled", async () => {
    const file = new File(["<html>not a pdf</html>"], "本地.pdf", { type: "application/pdf" });
    render(<AttachmentPreview {...props({ id: "open-only-invalid", name: file.name, file, permissions: { preview: false, open: true } })} />);
    expect(await screen.findByRole("alert")).toHaveTextContent("文件内容不是有效的 PDF");
    expect(screen.queryByRole("link")).toBeNull(); expect(document.querySelector("iframe")).toBeNull();
  });

  it("removes stale verified local URLs immediately on same-id replacement or a stricter byte limit", async () => {
    const first = new File(["%PDF-1.7\nfirst"], "讲义.pdf", { type: "application/pdf" });
    const second = new File(["%PDF-1.7\nsecond"], "讲义.pdf", { type: "application/pdf" });
    const initial = props({ id: "same", name: first.name, file: first });
    const view = render(<AttachmentPreview {...initial} />);
    const firstUrl = (await screen.findByRole("link", { name: "在新窗口打开 讲义.pdf" })).getAttribute("href");
    view.rerender(<AttachmentPreview {...props({ ...initial.attachment, file: second })} />);
    expect(screen.queryByRole("link")).toBeNull();
    expect(revokeObjectURL).toHaveBeenCalledWith(firstUrl);
    const secondUrl = (await screen.findByRole("link", { name: "在新窗口打开 讲义.pdf" })).getAttribute("href");
    expect(secondUrl).not.toBe(firstUrl);
    view.rerender(<AttachmentPreview {...props({ ...initial.attachment, file: second })} maxPreviewBytes={4} />);
    expect(screen.queryByRole("link")).toBeNull();
    expect(revokeObjectURL).toHaveBeenCalledWith(secondUrl);
    expect(await screen.findByRole("alert")).toHaveTextContent("文件超过预览大小限制");
  });

  it("does not treat a caller-supplied unverified Blob URL as a remote safe opening service", async () => {
    render(<AttachmentPreview {...props({ id: "blob-html", name: "page.html", type: "text/html", url: "blob:https://example.test/active-content" })} />);
    await screen.findByRole("dialog", { name: "page.html" });
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("keeps preview, download and open permissions independent", async () => {
    const view = render(<AttachmentPreview {...props({ ...image, permissions: { preview: false, download: true, open: false }, permissionReasons: { preview: "仅可下载原文件" } })} />);
    expect(await screen.findByText("仅可下载原文件")).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByRole("button", { name: `下载 ${image.name}` })).toBeEnabled();
    view.rerender(<AttachmentPreview {...props({ ...image, permissions: { preview: true, download: false, open: false } })} />);
    expect(await screen.findByRole("img")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: `下载 ${image.name}` })).toBeNull();
  });

  it.each(["processing", "forbidden", "missing", "expired"] as const)("does not access %s resources even when a local file remains", async availability => {
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    render(<AttachmentPreview {...props({ ...image, availability, availabilityMessage: `不可用：${availability}`, file: new File(["x"], "x.png") })} />);
    expect(await screen.findByText(`不可用：${availability}`)).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.queryByRole("button", { name: `下载 ${image.name}` })).toBeNull();
    expect(createObjectURL).not.toHaveBeenCalled(); expect(fetcher).not.toHaveBeenCalled();
  });

  it("reads and validates PDF bytes before embedding a PDF-typed object URL, retaining fallback controls", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(pdfResponse()));
    const pdf = { id: "pdf", name: "讲义.pdf", type: "application/pdf", url: "/pdf" };
    const view = render(<AttachmentPreview {...props(pdf)} />);
    const frame = await screen.findByTitle("预览 讲义.pdf");
    expect(frame).toHaveAttribute("src", createObjectURL.mock.results[0]!.value);
    expect(frame).not.toHaveAttribute("sandbox");
    expect(createObjectURL.mock.calls[0]![0].type).toBe("application/pdf");
    expect(screen.getByRole("link", { name: "在新窗口打开 讲义.pdf" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "下载 讲义.pdf" })).toBeInTheDocument();
    view.unmount();
    expect(revokeObjectURL).toHaveBeenCalledWith(createObjectURL.mock.results[0]!.value);
  });

  it("rejects HTML disguised as PDF without putting a remote URL into an iframe", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(pdfResponse("<html><script>bad()</script></html>")));
    render(<AttachmentPreview {...props({ id: "bad", name: "伪装.pdf", url: "/disguised" })} />);
    expect(await screen.findByRole("alert")).toHaveTextContent("文件内容不是有效的 PDF");
    expect(document.querySelector("iframe")).toBeNull(); expect(createObjectURL).not.toHaveBeenCalled();
  });

  it("bounds preview reads and keeps oversized PDFs available for explicit open or download", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(pdfResponse("%PDF-1.7\nmore than limit")));
    render(<AttachmentPreview {...props({ id: "big", name: "大文件.pdf", url: "/large.pdf" })} maxPreviewBytes={8} />);
    expect(await screen.findByRole("alert")).toHaveTextContent("文件超过预览大小限制");
    expect(document.querySelector("iframe")).toBeNull(); expect(createObjectURL).not.toHaveBeenCalled();
    expect(screen.getByRole("link", { name: "在新窗口打开 大文件.pdf" })).toBeInTheDocument();
  });

  it("does not embed a native PDF viewer when download is forbidden", async () => {
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    render(<AttachmentPreview {...props({ id: "pdf", name: "受限.pdf", url: "/limited.pdf", permissions: { download: false } })} />);
    expect(await screen.findByText("当前预览方式不支持此文件的下载限制")).toBeInTheDocument();
    expect(document.querySelector("iframe")).toBeNull(); expect(fetcher).not.toHaveBeenCalled();
    expect(screen.getByRole("link", { name: "在新窗口打开 受限.pdf" })).toBeInTheDocument();
  });

  it("avoids fetching a PDF when the browser explicitly lacks a native viewer", async () => {
    vi.spyOn(navigator, "pdfViewerEnabled", "get").mockReturnValue(false);
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    render(<AttachmentPreview {...props({ id: "pdf", name: "讲义.pdf", url: "/notes.pdf" })} />);
    expect(await screen.findByText("当前浏览器不支持 PDF 预览，请打开或下载查看")).toBeInTheDocument();
    expect(fetcher).not.toHaveBeenCalled(); expect(document.querySelector("iframe")).toBeNull();
  });

  it("cancels a pending PDF stream and discards its data when switching attachments", async () => {
    const cancel = vi.fn();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, headers: new Headers(), body: new ReadableStream({ cancel }) }));
    const initial = props({ id: "pdf", name: "讲义.pdf", url: "/slow.pdf" });
    const view = render(<AttachmentPreview {...initial} />);
    await screen.findByRole("progressbar");
    await act(async () => {});
    view.rerender(<AttachmentPreview {...props()} />);
    await waitFor(() => expect(cancel).toHaveBeenCalledTimes(1));
    expect(await screen.findByRole("img", { name: image.name })).toHaveAttribute("src", image.url);
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it("cancels a late PDF response body when the attachment was already closed", async () => {
    const cancel = vi.fn();
    let resolve!: (response: ReturnType<typeof pdfResponse>) => void;
    vi.stubGlobal("fetch", vi.fn(() => new Promise(done => { resolve = done; })));
    const initial = props({ id: "pdf", name: "讲义.pdf", url: "/late.pdf" });
    const view = render(<AttachmentPreview {...initial} />);
    await screen.findByRole("progressbar");
    view.rerender(<AttachmentPreview {...initial} open={false} />);
    await act(async () => resolve({ ok: true, headers: new Headers(), body: new ReadableStream({ cancel }) }));
    expect(cancel).toHaveBeenCalledTimes(1); expect(createObjectURL).not.toHaveBeenCalled();
  });

  it("provides actionable fallback for unsupported files and rejects dangerous addresses", async () => {
    const view = render(<AttachmentPreview {...props({ id: "zip", name: "资料.zip", url: "/archive.zip" })} />);
    expect(await screen.findByText("此文件类型暂不支持在线预览")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "在新窗口打开 资料.zip" })).toHaveAttribute("rel", "noopener noreferrer");
    view.rerender(<AttachmentPreview {...props({ id: "unsafe", name: "危险.pdf", url: "javascript:alert(1)" })} />);
    expect(await screen.findByRole("alert")).toHaveTextContent("文件地址不安全");
    expect(screen.queryByRole("link")).toBeNull(); expect(document.querySelector("iframe")).toBeNull();
  });

  it("prevents duplicate async downloads, exposes errors and allows retry", async () => {
    let reject!: (error: Error) => void;
    const download = vi.fn().mockImplementationOnce(() => new Promise<void>((_, fail) => { reject = fail; })).mockResolvedValue(undefined);
    render(<AttachmentPreview {...props()} onDownload={download} />);
    const user = userEvent.setup(), button = await screen.findByRole("button", { name: `下载 ${image.name}` });
    await user.click(button); await user.click(button);
    expect(download).toHaveBeenCalledTimes(1); expect(button).toHaveAttribute("aria-busy", "true");
    await act(async () => reject(new Error("网络断开")));
    expect(screen.getByRole("alert")).toHaveTextContent("网络断开");
    await user.click(button);
    expect(download).toHaveBeenCalledTimes(2);
    expect(await screen.findByText("已发起下载")).toBeInTheDocument();
  });

  it("aborts pending work when the preview closes and ignores late completion", async () => {
    let resolve!: () => void;
    const download = vi.fn((_item: AttachmentRecord, _context: { signal: AbortSignal }) => new Promise<void>(done => { resolve = done; }));
    const view = render(<AttachmentPreview {...props()} onDownload={download} />);
    await userEvent.setup().click(await screen.findByRole("button", { name: `下载 ${image.name}` }));
    const signal = download.mock.calls[0]![1].signal;
    view.rerender(<AttachmentPreview {...props()} open={false} onDownload={download} />);
    expect(signal.aborted).toBe(true);
    await act(async () => resolve());
    view.rerender(<AttachmentPreview {...props()} onDownload={download} />);
    expect(screen.queryByText("已发起下载")).toBeNull();
  });

  it("revokes a pending download independently when its permission changes", async () => {
    let resolve!: () => void;
    const download = vi.fn((_item: AttachmentRecord, _context: { signal: AbortSignal }) => new Promise<void>(done => { resolve = done; }));
    const view = render(<AttachmentPreview {...props()} onDownload={download} />);
    await userEvent.setup().click(await screen.findByRole("button", { name: `下载 ${image.name}` }));
    const signal = download.mock.calls[0]![1].signal;
    view.rerender(<AttachmentPreview {...props({ ...image, permissions: { download: false, preview: true, open: true } })} onDownload={download} />);
    expect(signal.aborted).toBe(true); expect(screen.queryByRole("button", { name: `下载 ${image.name}` })).toBeNull();
    expect(screen.getByRole("img", { name: image.name })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: `在新窗口打开 ${image.name}` })).toBeInTheDocument();
    await act(async () => resolve());
    expect(screen.queryByText("已发起下载")).toBeNull();
  });

  it("closes with Escape and returns focus to the caller's control", async () => {
    const trigger = createRef<HTMLButtonElement>();
    function Host() {
      const [open, setOpen] = useState(false);
      return <><button ref={trigger} onClick={() => setOpen(true)}>看附件</button><AttachmentPreview attachment={image} open={open} onOpenChange={setOpen} returnFocus={trigger} /></>;
    }
    render(<Host />); const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "看附件" }));
    expect(await screen.findByRole("dialog", { name: image.name })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(trigger.current).toHaveFocus();
  });
});

describe("AttachmentPreview video", () => {
  const video: AttachmentRecord = { id: "video", name: "实验录像.mp4", type: "video/mp4", status: "done", url: "/recording.mp4" };
  const videoLabel = (item: AttachmentRecord = video) => `视频预览 ${item.name}`;

  it.each([
    ["课堂.mp4", "video/mp4"], ["课堂.webm", "video/webm"],
    ["课堂.ogg", "video/ogg"], ["课堂.ogv", "video/ogg"],
    ["课堂.MP4", ' Video/MP4; codecs="avc1.42E01E"'],
  ])("previews matching %s with native controls and no automatic playback", async (name, type) => {
    const item = { ...video, name, type };
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    render(<AttachmentPreview {...props(item)} />);
    const player = await screen.findByLabelText(videoLabel(item), { selector: "video" });
    expect(player).toHaveAttribute("src", video.url);
    expect(player).toHaveAttribute("controls");
    expect(player).toHaveAttribute("playsinline");
    expect(player).toHaveAttribute("preload", "metadata");
    expect(player).not.toHaveAttribute("autoplay");
    expect(fetcher).not.toHaveBeenCalled();
  });

  it.each([
    { name: "片段.mov", type: "video/quicktime" },
    { name: "片段.mp4", type: "video/webm" },
    { name: "片段.webm", type: "video/mp4" },
    { name: "片段.mp4", type: "text/html" },
    { name: "页面.html", type: "video/mp4" },
    { name: "未知.mp4", type: undefined },
    { file: new File(["bad"], "片段.mp4", { type: "text/html" }), url: undefined },
    { file: new File(["bad"], "页面.html", { type: "video/mp4" }), url: undefined },
  ])("keeps unsupported or conflicting video metadata out of native playback: %j", async override => {
    render(<AttachmentPreview {...props({ ...video, ...override })} />);
    await screen.findByRole("dialog");
    expect(document.querySelector("video")).toBeNull();
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it.each(["javascript:alert(1)", "data:video/mp4;base64,AAAA", "//other.test/movie.mp4", "https:\\other.test/movie.mp4"])("rejects unsafe video addresses: %s", async url => {
    render(<AttachmentPreview {...props({ ...video, url })} />);
    expect(await screen.findByRole("alert")).toHaveTextContent("文件地址不安全");
    expect(document.querySelector("video")).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it.each(["idle", "uploading", "processing", "error", "canceled"] as const)("does not play a %s video even if source bytes remain", async status => {
    render(<AttachmentPreview {...props({ ...video, status, url: undefined, file: new File(["video"], video.name, { type: video.type }) })} />);
    await screen.findByRole("dialog");
    expect(document.querySelector("video")).toBeNull();
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it.each(["processing", "forbidden", "missing", "expired"] as const)("does not allocate unavailable %s video bytes", async availability => {
    render(<AttachmentPreview {...props({ ...video, availability, url: undefined, file: new File(["video"], video.name, { type: video.type }) })} />);
    await screen.findByRole("dialog");
    expect(document.querySelector("video")).toBeNull();
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it("does not embed native playback when download is forbidden", async () => {
    render(<AttachmentPreview {...props({ ...video, permissions: { preview: true, download: false, open: false } })} />);
    expect(await screen.findByText("当前预览方式不支持此文件的下载限制")).toBeInTheDocument();
    expect(document.querySelector("video")).toBeNull();
    expect(screen.queryByRole("button", { name: `下载 ${video.name}` })).toBeNull();
  });

  it("retains allowed fallback actions after media errors and resets for a different source", async () => {
    const initial = props(video), view = render(<AttachmentPreview {...initial} />);
    const player = await screen.findByLabelText(videoLabel(), { selector: "video" });
    fireEvent.error(player);
    expect(screen.getByRole("alert")).toHaveTextContent("视频预览失败");
    expect(document.querySelector("video")).toBeNull();
    expect(screen.getByRole("button", { name: `下载 ${video.name}` })).toBeEnabled();
    expect(screen.getByRole("link", { name: `在新窗口打开 ${video.name}` })).toBeInTheDocument();
    view.rerender(<AttachmentPreview {...props({ ...video, previewUrl: "/new-preview.mp4" })} />);
    const replacement = await screen.findByLabelText(videoLabel(), { selector: "video" });
    expect(replacement).toHaveAttribute("src", "/new-preview.mp4");
    expect(replacement).not.toBe(player);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("releases local video URLs on replacement, permission revocation, availability change and closing", async () => {
    const first = new File(["first"], video.name, { type: video.type });
    const second = new File(["second"], video.name, { type: video.type });
    const local = { ...video, type: undefined, url: undefined, file: first };
    const view = render(<AttachmentPreview {...props(local)} />);
    const firstPlayer = await screen.findByLabelText(videoLabel(), { selector: "video" });
    const firstUrl = firstPlayer.getAttribute("src");
    expect(firstUrl).toMatch(/^blob:/);
    expect(screen.queryByRole("link")).toBeNull();
    view.rerender(<AttachmentPreview {...props({ ...local, file: second })} />);
    const secondPlayer = await screen.findByLabelText(videoLabel(), { selector: "video" });
    const secondUrl = secondPlayer.getAttribute("src");
    expect(secondUrl).not.toBe(firstUrl);
    expect(revokeObjectURL).toHaveBeenCalledWith(firstUrl);
    view.rerender(<AttachmentPreview {...props({ ...local, file: second, permissions: { preview: false } })} />);
    expect(document.querySelector("video")).toBeNull();
    expect(revokeObjectURL).toHaveBeenCalledWith(secondUrl);
    view.rerender(<AttachmentPreview {...props(local)} />);
    const thirdUrl = (await screen.findByLabelText(videoLabel(), { selector: "video" })).getAttribute("src");
    view.rerender(<AttachmentPreview {...props({ ...local, availability: "expired" })} />);
    expect(document.querySelector("video")).toBeNull();
    expect(revokeObjectURL).toHaveBeenCalledWith(thirdUrl);
    view.rerender(<AttachmentPreview {...props(local)} />);
    const fourthUrl = (await screen.findByLabelText(videoLabel(), { selector: "video" })).getAttribute("src");
    view.rerender(<AttachmentPreview {...props(local)} open={false} />);
    expect(revokeObjectURL).toHaveBeenCalledWith(fourthUrl);
  });

  it("restores playback after permissions change and creates a new native element when the source changes", async () => {
    const view = render(<AttachmentPreview {...props(video)} />);
    const first = await screen.findByLabelText(videoLabel(), { selector: "video" });
    fireEvent.error(first);
    view.rerender(<AttachmentPreview {...props({ ...video, permissions: { preview: false } })} />);
    expect(document.querySelector("video")).toBeNull();
    view.rerender(<AttachmentPreview {...props(video)} />);
    const restored = await screen.findByLabelText(videoLabel(), { selector: "video" });
    view.rerender(<AttachmentPreview {...props({ ...video, url: "/replacement.mp4" })} />);
    const next = await screen.findByLabelText(videoLabel(), { selector: "video" });
    expect(next).not.toBe(restored);
    expect(next).toHaveAttribute("src", "/replacement.mp4");
  });

  it("retries a previously failed address after switching away and back", async () => {
    const view = render(<AttachmentPreview {...props(video)} />);
    fireEvent.error(await screen.findByLabelText(videoLabel(), { selector: "video" }));
    view.rerender(<AttachmentPreview {...props({ ...video, url: "/second.mp4" })} />);
    expect(await screen.findByLabelText(videoLabel(), { selector: "video" })).toHaveAttribute("src", "/second.mp4");
    view.rerender(<AttachmentPreview {...props(video)} />);
    expect(await screen.findByLabelText(videoLabel(), { selector: "video" })).toHaveAttribute("src", video.url);
  });

  it.each(["preview", "download"] as const)("stops and unloads media when %s permission is revoked", async permission => {
    const local = { ...video, url: undefined, file: new File(["video"], video.name, { type: video.type }) };
    const view = render(<AttachmentPreview {...props(local)} />);
    const player = await screen.findByLabelText<HTMLVideoElement>(videoLabel(), { selector: "video" });
    const url = player.getAttribute("src");
    view.rerender(<AttachmentPreview {...props({ ...local, permissions: { [permission]: false } })} />);
    expect(player.pause).toHaveBeenCalled();
    expect(player).not.toHaveAttribute("src");
    expect(player.load).toHaveBeenCalled();
    expect(document.querySelector("video")).toBeNull();
    expect(revokeObjectURL).toHaveBeenCalledWith(url);
  });

  it("stops media and preserves only allowed fallback actions after a playback error", async () => {
    render(<AttachmentPreview {...props({ ...video, permissions: { open: false } })} />);
    const player = await screen.findByLabelText<HTMLVideoElement>(videoLabel(), { selector: "video" });
    fireEvent.error(player);
    expect(player.pause).toHaveBeenCalled();
    expect(player).not.toHaveAttribute("src");
    expect(player.load).toHaveBeenCalled();
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByRole("button", { name: `下载 ${video.name}` })).toBeEnabled();
  });

  it("keeps the media source available through StrictMode effect replay", async () => {
    render(<StrictMode><AttachmentPreview {...props(video)} /></StrictMode>);
    expect(await screen.findByLabelText(videoLabel(), { selector: "video" })).toHaveAttribute("src", video.url);
  });
});
