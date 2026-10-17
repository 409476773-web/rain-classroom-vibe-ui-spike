import { StrictMode } from "react";
import { renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { downloadAttachment, useAttachmentObjectUrl } from "./attachment-resources";

const createObjectURL = vi.fn((_: Blob) => `blob:http://localhost/attachment-${Math.random()}`);
const revokeObjectURL = vi.fn();
beforeEach(() => {
  createObjectURL.mockClear(); revokeObjectURL.mockClear();
  vi.stubGlobal("URL", Object.assign(URL, { createObjectURL, revokeObjectURL }));
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers(); });

describe("attachment resource ownership", () => {
  it("creates object URLs only after commit, never during server render", () => {
    function Host() { return <span>{useAttachmentObjectUrl(new File(["x"], "x.txt"))}</span>; }
    expect(renderToString(<Host />)).toBe("<span></span>");
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it("releases replaced files and every StrictMode allocation on unmount", () => {
    const first = new File(["one"], "one.txt"), second = new File(["two"], "two.txt");
    const view = renderHook(({ file }: { file?: File }) => useAttachmentObjectUrl(file), {
      initialProps: { file: first }, wrapper: StrictMode,
    });
    const firstUrl = view.result.current;
    expect(firstUrl).toMatch(/^blob:/);
    view.rerender({ file: second });
    expect(view.result.current).not.toBe(firstUrl);
    expect(revokeObjectURL).toHaveBeenCalledWith(firstUrl);
    view.unmount();
    expect(revokeObjectURL.mock.calls.map(([url]) => url).sort()).toEqual(createObjectURL.mock.results.map(result => result.value).sort());
  });
});

describe("downloadAttachment", () => {
  it("downloads the actual local file with the record name and releases the temporary URL", async () => {
    vi.useFakeTimers();
    const file = new File(["实际内容"], "original.txt", { type: "text/plain" });
    let download: { href: string; name: string; connected: boolean } | undefined;
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      download = { href: this.href, name: this.download, connected: this.isConnected };
    });
    await downloadAttachment({ id: "one", name: "课程说明.txt", file, status: "error" });
    expect(createObjectURL).toHaveBeenCalledWith(file);
    expect(download).toEqual({ href: createObjectURL.mock.results[0]!.value, name: "课程说明.txt", connected: true });
    expect(document.querySelector("a[download]")).toBeNull();
    await vi.runAllTimersAsync();
    expect(revokeObjectURL).toHaveBeenCalledWith(download!.href);
  });

  it("prefers the official URL over a retained local file and forwards cancellation", async () => {
    vi.useFakeTimers();
    const blob = new Blob(["正式内容"]), signal = new AbortController().signal;
    const fetcher = vi.fn().mockResolvedValue({ ok: true, blob: async () => blob });
    vi.stubGlobal("fetch", fetcher);
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    await downloadAttachment({ id: "one", name: "最终版.txt", url: "/files/final", file: new File(["旧内容"], "old.txt") }, { signal });
    expect(fetcher).toHaveBeenCalledWith("/files/final", { signal });
    expect(createObjectURL).toHaveBeenCalledWith(blob);
    await vi.runAllTimersAsync();
    expect(revokeObjectURL).toHaveBeenCalledTimes(1);
  });

  it.each(["javascript:alert(1)", "data:text/html,hello", "file:///etc/passwd"])("rejects unsafe address %s without fetching", async url => {
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    await expect(downloadAttachment({ id: "one", name: "资料", url })).rejects.toThrow(/地址/);
    expect(fetcher).not.toHaveBeenCalled(); expect(createObjectURL).not.toHaveBeenCalled();
  });

  it("propagates server failure instead of downloading a stale retained file", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 403 }));
    await expect(downloadAttachment({ id: "one", name: "资料.txt", url: "/blocked", file: new File(["old"], "old.txt") })).rejects.toThrow(/403/);
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it("respects unavailable resources and independent download permission", async () => {
    const file = new File(["x"], "x.txt");
    await expect(downloadAttachment({ id: "one", name: file.name, file, permissions: { download: false }, permissionReasons: { download: "仅允许查看" } })).rejects.toThrow("仅允许查看");
    await expect(downloadAttachment({ id: "one", name: file.name, file, availability: "expired", availabilityMessage: "链接已到期" })).rejects.toThrow("链接已到期");
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it("does not initiate a download after a response arrives following abort", async () => {
    const controller = new AbortController();
    const blob = vi.fn(async () => new Blob(["x"])), cancel = vi.fn(async () => {});
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => { controller.abort(); return { ok: true, body: { cancel }, blob }; }));
    await expect(downloadAttachment({ id: "one", name: "资料", url: "/file" }, { signal: controller.signal })).rejects.toHaveProperty("name", "AbortError");
    expect(blob).not.toHaveBeenCalled(); expect(cancel).toHaveBeenCalledTimes(1);
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it("releases the object URL when browser initiation throws", async () => {
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => { throw new Error("浏览器阻止下载"); });
    await expect(downloadAttachment({ id: "one", name: "资料", file: new File(["x"], "x") })).rejects.toThrow("浏览器阻止下载");
    expect(document.querySelector("a[download]")).toBeNull();
    expect(revokeObjectURL).toHaveBeenCalledWith(createObjectURL.mock.results[0]!.value);
  });
});
