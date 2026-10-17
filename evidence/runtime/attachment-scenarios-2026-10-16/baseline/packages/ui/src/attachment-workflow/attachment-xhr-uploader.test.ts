import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createAttachmentXhrUploader } from "./attachment-xhr-uploader";
import type { AttachmentUploadContext, AttachmentUploadResult } from "./types";

class UploadRequest extends EventTarget {
  static requests: UploadRequest[] = [];
  upload = new EventTarget();
  status = 0;
  responseText = "";
  withCredentials = false;
  timeout = 0;
  contentType = "application/json";
  open = vi.fn();
  send = vi.fn();
  setRequestHeader = vi.fn();
  getResponseHeader = vi.fn((name: string) => name.toLowerCase() === "content-type" ? this.contentType : null);
  abort = vi.fn(() => this.dispatchEvent(new Event("abort")));
  constructor() { super(); UploadRequest.requests.push(this); }
  respond(status: number, body: string, type = "application/json") {
    this.status = status; this.responseText = body; this.contentType = type;
    this.dispatchEvent(new Event("load"));
  }
}

const file = () => new File(["actual file content"], "lesson.pdf", { type: "application/pdf" });
const context = (controller = new AbortController()): AttachmentUploadContext => ({
  id: "lesson-1", signal: controller.signal, onProgress: vi.fn(), onProcessing: vi.fn(),
});
const currentRequest = () => UploadRequest.requests.at(-1)!;
const parseResponse = (value: unknown) => value as AttachmentUploadResult;

beforeEach(() => { UploadRequest.requests = []; vi.stubGlobal("XMLHttpRequest", UploadRequest); });
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("createAttachmentXhrUploader", () => {
  it("sends the actual file and configured fields to the resolved endpoint", async () => {
    const selected = file(), ctx = context(), extra = new Blob(["metadata"]);
    const url = vi.fn(() => "/files/upload");
    const uploader = createAttachmentXhrUploader({ url, fieldName: "material", data: { course: "42", metadata: extra }, headers: { "X-Course": "42" }, withCredentials: true, timeoutMs: 12000, parseResponse });
    const pending = uploader(selected, ctx), xhr = currentRequest();
    expect(url).toHaveBeenCalledWith(selected, ctx);
    expect(xhr.open).toHaveBeenCalledWith("POST", "/files/upload", true);
    expect(xhr.withCredentials).toBe(true);
    expect(xhr.timeout).toBe(12000);
    expect(xhr.setRequestHeader).toHaveBeenCalledWith("X-Course", "42");
    const body = xhr.send.mock.calls[0]![0] as FormData;
    expect(body.get("material")).toBe(selected);
    expect(body.get("course")).toBe("42");
    expect((body.get("metadata") as Blob).size).toBe(extra.size);
    xhr.respond(201, '{"remoteId":"remote-1","url":"/files/remote-1"}');
    await expect(pending).resolves.toEqual({ remoteId: "remote-1", url: "/files/remote-1" });
  });

  it("reports unknown and measured progress, then processing until the response is parsed", async () => {
    const ctx = context(), pending = createAttachmentXhrUploader({ url: "/upload", parseResponse })(file(), ctx);
    const xhr = currentRequest();
    xhr.upload.dispatchEvent(new ProgressEvent("progress", { loaded: 10, lengthComputable: false }));
    expect(ctx.onProgress).toHaveBeenLastCalledWith(undefined);
    xhr.upload.dispatchEvent(new ProgressEvent("progress", { loaded: 30, total: 120, lengthComputable: true }));
    expect(ctx.onProgress).toHaveBeenLastCalledWith(25);
    expect(ctx.onProcessing).not.toHaveBeenCalled();
    xhr.upload.dispatchEvent(new ProgressEvent("progress", { loaded: 120, total: 120, lengthComputable: true }));
    expect(ctx.onProgress).toHaveBeenLastCalledWith(100);
    xhr.upload.dispatchEvent(new Event("load"));
    expect(ctx.onProcessing).toHaveBeenCalledTimes(1);
    const settled = vi.fn(); void pending.then(settled);
    await Promise.resolve(); expect(settled).not.toHaveBeenCalled();
    xhr.respond(200, '{"remoteId":"done"}');
    await expect(pending).resolves.toEqual({ remoteId: "done" });
  });

  it("enters processing when an unknown-length transfer finishes", async () => {
    const ctx = context(), pending = createAttachmentXhrUploader({ url: "/upload", parseResponse })(file(), ctx);
    const xhr = currentRequest(); xhr.upload.dispatchEvent(new Event("load"));
    expect(ctx.onProcessing).toHaveBeenCalledTimes(1);
    xhr.respond(204, "", "text/plain"); await pending;
  });

  it.each([
    ["application/problem+json; charset=utf-8", '{"remoteId":"json"}', { remoteId: "json" }],
    ["text/plain", "/files/plain", "/files/plain"],
    ["", "", ""],
  ])("passes %s responses and the XHR to the caller's async parser", async (type, body, expected) => {
    const parser = vi.fn(async () => ({ remoteId: "parsed" }));
    const pending = createAttachmentXhrUploader({ url: "/upload", parseResponse: parser })(file(), context());
    const xhr = currentRequest(); xhr.respond(200, body as string, type as string);
    await expect(pending).resolves.toEqual({ remoteId: "parsed" });
    expect(parser).toHaveBeenCalledWith(expected, xhr);
  });

  it.each([400, 403, 500])("rejects HTTP %s without parsing success data", async status => {
    const parser = vi.fn(parseResponse), pending = createAttachmentXhrUploader({ url: "/upload", parseResponse: parser })(file(), context());
    currentRequest().respond(status, "{}");
    await expect(pending).rejects.toThrow(String(status)); expect(parser).not.toHaveBeenCalled();
  });

  it.each([["error", "网络"], ["timeout", "超时"]])("reports %s as a failure", async (event, message) => {
    const pending = createAttachmentXhrUploader({ url: "/upload", parseResponse })(file(), context());
    currentRequest().dispatchEvent(new Event(event!));
    await expect(pending).rejects.toThrow(message);
  });

  it("rejects malformed JSON and caller parsing errors", async () => {
    const uploader = createAttachmentXhrUploader({ url: "/upload", parseResponse });
    const malformed = uploader(file(), context()); currentRequest().respond(200, "not json");
    await expect(malformed).rejects.toThrow("JSON");
    const failed = createAttachmentXhrUploader({ url: "/upload", parseResponse: async () => { throw new Error("附件返回缺少资源ID"); } })(file(), context());
    currentRequest().respond(200, "{}"); await expect(failed).rejects.toThrow("附件返回缺少资源ID");
  });

  it("rejects an already aborted signal without constructing or sending a request", async () => {
    const controller = new AbortController(); controller.abort();
    await expect(createAttachmentXhrUploader({ url: "/upload", parseResponse })(file(), context(controller))).rejects.toMatchObject({ name: "AbortError" });
    expect(UploadRequest.requests).toHaveLength(0);
  });

  it("aborts the real request, rejects, and ignores late progress and success", async () => {
    const controller = new AbortController(), ctx = context(controller), parser = vi.fn(parseResponse);
    const pending = createAttachmentXhrUploader({ url: "/upload", parseResponse: parser })(file(), ctx);
    const xhr = currentRequest(); controller.abort();
    await expect(pending).rejects.toMatchObject({ name: "AbortError" }); expect(xhr.abort).toHaveBeenCalledTimes(1);
    xhr.upload.dispatchEvent(new ProgressEvent("progress", { loaded: 2, total: 2, lengthComputable: true }));
    xhr.respond(200, "{}"); expect(parser).not.toHaveBeenCalled(); expect(ctx.onProgress).not.toHaveBeenCalled();
  });

  it("can cancel during asynchronous parsing and releases abort listeners after completion", async () => {
    let resolve!: (value: AttachmentUploadResult) => void;
    const parsed = new Promise<AttachmentUploadResult>(yes => { resolve = yes; });
    const controller = new AbortController(), ctx = context(controller), remove = vi.spyOn(ctx.signal, "removeEventListener");
    const pending = createAttachmentXhrUploader({ url: "/upload", parseResponse: () => parsed })(file(), ctx);
    const xhr = currentRequest(); xhr.respond(200, "{}"); controller.abort();
    await expect(pending).rejects.toMatchObject({ name: "AbortError" }); resolve({ remoteId: "late" });
    expect(remove).toHaveBeenCalledWith("abort", expect.any(Function));
    const doneController = new AbortController(), done = createAttachmentXhrUploader({ url: "/upload", parseResponse })(file(), context(doneController));
    const doneXhr = currentRequest(); doneXhr.respond(200, "{}"); await done;
    doneController.abort(); expect(doneXhr.abort).not.toHaveBeenCalled();
  });

  it.each(["", "   ", "javascript:alert(1)", "data:text/plain,test", "blob:https://example.com/id", "file:///tmp/a", "ftp://example.com/upload"])("refuses unsafe or missing endpoint %s before sending", async url => {
    await expect(createAttachmentXhrUploader({ url, parseResponse })(file(), context())).rejects.toThrow("HTTP");
    expect(UploadRequest.requests).toHaveLength(0);
  });
});
