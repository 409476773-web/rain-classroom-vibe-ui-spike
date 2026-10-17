import type { AttachmentUploadContext, AttachmentUploadHandler, AttachmentUploadResult } from "./types";

export type AttachmentXhrUploaderOptions = {
  url: string | ((file: File, context: AttachmentUploadContext) => string);
  /** Defaults to "file". The browser supplies the multipart Content-Type boundary. */
  fieldName?: string;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  /** Browser timeout in milliseconds; 0 (the default) disables the timeout. */
  timeoutMs?: number;
  data?: Record<string, string | Blob>;
  /** JSON Content-Types are decoded; other responses remain text, including an empty body. */
  parseResponse: (response: unknown, xhr: XMLHttpRequest) => AttachmentUploadResult | Promise<AttachmentUploadResult>;
};

function uploadEndpoint(value: string) {
  const endpoint = value.trim();
  try {
    const parsed = new URL(endpoint, "https://attachment.invalid/");
    if (endpoint && !/[\u0000-\u001f\u007f]/.test(endpoint) && (parsed.protocol === "http:" || parsed.protocol === "https:")) return endpoint;
  } catch { /* Report the same configuration error for malformed and unsafe URLs. */ }
  throw new Error("上传地址必须是 HTTP、HTTPS 或相对地址。");
}

/** Optional HTTP transport; it never creates a simulated success or owns a retry policy. */
export function createAttachmentXhrUploader(options: AttachmentXhrUploaderOptions): AttachmentUploadHandler {
  return async (file, context) => {
    const abortError = () => new DOMException("上传已取消。", "AbortError");
    if (context.signal.aborted) throw abortError();
    const endpoint = uploadEndpoint(typeof options.url === "function" ? options.url(file, context) : options.url);
    if (context.signal.aborted) throw abortError();
    return new Promise<AttachmentUploadResult>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let settled = false, processing = false, responseStarted = false;

      function cleanup() {
        context.signal.removeEventListener("abort", cancel);
        xhr.upload.removeEventListener("progress", progress);
        xhr.upload.removeEventListener("load", transferred);
        xhr.removeEventListener("load", loaded);
        xhr.removeEventListener("error", networkError);
        xhr.removeEventListener("timeout", timedOut);
        xhr.removeEventListener("abort", aborted);
      }
      function fail(error: unknown) {
        if (settled) return;
        settled = true; cleanup(); reject(error);
      }
      function cancel() { xhr.abort(); fail(abortError()); }
      function aborted() { fail(abortError()); }
      function networkError() { fail(new Error("网络连接失败，文件未能上传。")); }
      function timedOut() { fail(new Error("上传超时，请重试。")); }
      function transferred() {
        if (settled || processing) return;
        processing = true;
        try { context.onProcessing(); } catch (error) { fail(error); xhr.abort(); }
      }
      function progress(event: ProgressEvent) {
        if (settled) return;
        const percent = event.lengthComputable && event.total > 0 ? Math.max(0, Math.min(100, event.loaded / event.total * 100)) : undefined;
        try { context.onProgress(percent); } catch (error) { fail(error); xhr.abort(); return; }
        if (percent === 100) transferred();
      }
      async function loaded() {
        if (settled || responseStarted) return;
        responseStarted = true;
        if (xhr.status < 200 || xhr.status >= 300) { fail(new Error(`上传失败（HTTP ${xhr.status}）。`)); return; }
        try {
          const contentType = xhr.getResponseHeader("Content-Type")?.split(";", 1)[0]?.trim() ?? "";
          let response: unknown = xhr.responseText;
          if (/^(?:application|text)\/(?:[\w.-]+\+)?json$/i.test(contentType)) {
            try { response = JSON.parse(xhr.responseText); } catch { throw new Error("上传响应 JSON 无效。"); }
          }
          const result = await options.parseResponse(response, xhr);
          if (settled) return;
          settled = true; cleanup(); resolve(result);
        } catch (error) { fail(error); }
      }

      xhr.upload.addEventListener("progress", progress);
      xhr.upload.addEventListener("load", transferred);
      xhr.addEventListener("load", loaded);
      xhr.addEventListener("error", networkError);
      xhr.addEventListener("timeout", timedOut);
      xhr.addEventListener("abort", aborted);
      context.signal.addEventListener("abort", cancel, { once: true });
      try {
        xhr.open("POST", endpoint, true);
        xhr.withCredentials = options.withCredentials ?? false;
        xhr.timeout = options.timeoutMs ?? 0;
        for (const [name, value] of Object.entries(options.headers ?? {})) xhr.setRequestHeader(name, value);
        const body = new FormData();
        for (const [name, value] of Object.entries(options.data ?? {})) body.append(name, value);
        body.append(options.fieldName ?? "file", file);
        if (context.signal.aborted) { cancel(); return; }
        xhr.send(body);
      } catch (error) { fail(error); xhr.abort(); }
    });
  };
}
