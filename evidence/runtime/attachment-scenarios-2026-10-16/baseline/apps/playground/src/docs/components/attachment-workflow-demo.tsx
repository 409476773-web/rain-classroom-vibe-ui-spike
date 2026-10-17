import { useCallback, useRef, useState } from "react";
import { AttachmentList, AttachmentPicker, Button, Checkbox, formatAttachmentSize, useAttachmentUpload, type AttachmentRecord, type AttachmentUploadHandler } from "@rain-next/ui";
import "./attachment-workflow-demo.css";

const initialItems: AttachmentRecord[] = [
  { id: "guide", name: "课程导读：从问题到证据.pdf", type: "application/pdf", size: 965, url: "/attachment-demo/course-guide.pdf", status: "done", uploadedBy: "课程教学组", description: "课堂观察与证据记录的四个步骤。" },
  { id: "cover", name: "高等数学课程封面.png", type: "image/png", size: 1084837, url: "/attachment-demo/course-cover.png", status: "done", uploadedBy: "课程教学组", description: "可预览和下载的本地课程封面示例。" },
  { id: "notes", name: "课堂观察记录与同伴反馈说明.txt", type: "text/plain", size: 341, url: "/attachment-demo/observation-notes.txt", status: "done", uploadedBy: "课程教学组" },
];
const accessExamples: AttachmentRecord[] = [
  { ...initialItems[1]!, id: "preview-only", name: "仅可预览的课程封面.png", permissions: { download: false, open: false, remove: false, replace: false }, permissionReasons: { download: "此资料仅可预览。", open: "此资料仅可预览。", remove: "此资料由课程教学组维护。", replace: "此资料由课程教学组维护。" } },
  { ...initialItems[0]!, id: "expired", name: "已失效的课程讲义.pdf", availability: "expired", availabilityMessage: "此附件链接已失效，请联系课程教学组更新。" },
  { ...initialItems[2]!, id: "forbidden", name: "受限的课堂记录.txt", availability: "forbidden", availabilityMessage: "你没有访问此附件的权限。" },
];
const constraints = { accept: ".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip", maxFiles: 8, maxFileSize: 10 * 1024 * 1024, maxTotalSize: 25 * 1024 * 1024, duplicates: "reject" as const };
function waitForDemo(milliseconds: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    signal.throwIfAborted();
    const cancel = () => { clearTimeout(timer); reject(new DOMException("上传已取消", "AbortError")); };
    const timer = setTimeout(() => { signal.removeEventListener("abort", cancel); resolve(); }, milliseconds);
    signal.addEventListener("abort", cancel, { once: true });
  });
}

export function AttachmentWorkflowDemo() {
  const [filled, setFilled] = useState(false);
  const [readOnly, setReadOnly] = useState(false), [failNext, setFailNext] = useState(false), [unknownProgress, setUnknownProgress] = useState(false), [notice, setNotice] = useState("");
  const fail = useRef(false), unknown = useRef(false), addButton = useRef<HTMLButtonElement>(null);
  const upload = useCallback<AttachmentUploadHandler>(async (_file, context) => {
    const shouldFail = fail.current, showUnknown = unknown.current;
    fail.current = false; setFailNext(false);
    for (const progress of [20, 50, 80, 100]) {
      await waitForDemo(300, context.signal);
      if (shouldFail && progress === 50) throw new Error("模拟上传失败，文件已保留，请重试。");
      context.onProgress(showUnknown ? undefined : progress);
    }
    context.onProcessing(); await waitForDemo(500, context.signal);
    return { availability: "available", uploadedBy: "我", uploadedAt: "本页刚刚添加" };
  }, []);
  const workflow = useAttachmentUpload({ initialItems, constraints, upload, readOnly, onChange: () => setNotice("") });
  const summary = workflow.summary;
  return <div className="attachment-workflow-demo">
    <p className="attachment-workflow-demo__note">本地演示：选择、预览和下载使用真实文件；上传与保存仅在本页模拟，不向服务器传输。刷新后恢复示例。</p>
    <details className="attachment-workflow-demo__options"><summary>演示选项</summary><div>
      <Checkbox label="浅灰填充" checked={filled} onCheckedChange={setFilled} />
      <Checkbox label="只读查看" checked={readOnly} onCheckedChange={setReadOnly} />
      <Checkbox label="模拟下次上传失败" checked={failNext} disabled={readOnly} onCheckedChange={value => { fail.current = value; setFailNext(value); }} />
      <Checkbox label="未知上传进度" checked={unknownProgress} disabled={readOnly} onCheckedChange={value => { unknown.current = value; setUnknownProgress(value); }} />
    </div></details>
    <form aria-label="课程附件" onSubmit={event => { event.preventDefault(); if (!readOnly && summary.canSubmit) setNotice(`已在本页保存 ${summary.count} 个附件。刷新后恢复示例。`); }}>
      <AttachmentPicker onFiles={files => { workflow.addFiles(files); }} accept={constraints.accept} readOnly={readOnly} buttonRef={addButton}
        description="支持 PDF、常见图片、文档、表格、演示文稿、TXT 和 ZIP。最多 8 个，每个不超过 10 MB，合计不超过 25 MB；不接收空文件和重复文件。" />
      {workflow.rejections.length > 0 && <div className="attachment-workflow-demo__errors" role="alert"><p>以下文件未添加：</p><ul>{workflow.rejections.map((item, index) => <li key={`${item.file.name}-${index}`}>{item.file.name}：{item.reason}</li>)}</ul><Button variant="text" onClick={workflow.clearRejections}>清除提示</Button></div>}
      <div data-testid="attachment-live-list"><AttachmentList items={workflow.items} surface={filled ? "filled" : "outlined"} readOnly={readOnly} restoreFocusRef={addButton}
        onStart={item => { void workflow.start(item.id); }} onRetry={item => { void workflow.retry(item.id); }} onCancel={item => workflow.cancel(item.id)}
        onRemove={item => workflow.remove(item.id)} onReplace={(item, file) => { workflow.replaceFile(item.id, file); }} /></div>
      <div className="attachment-workflow-demo__summary"><p role="status">{summary.count} / 8 个附件 · 合计 {formatAttachmentSize(summary.totalSize)} / 25 MB。{summary.canSubmit ? "附件已就绪，可保存。" : `还有 ${summary.pendingCount} 个附件尚未完成，请上传、重试或移除。`}</p>
        <div><Button type="submit" disabled={readOnly || !summary.canSubmit}>保存附件</Button><Button variant="text" disabled={readOnly} onClick={() => { workflow.reset(initialItems); fail.current = false; setFailNext(false); }}>恢复示例</Button></div>
        {notice && <p role="status">{notice}</p>}
      </div>
    </form>
    <details className="attachment-workflow-demo__access"><summary>权限与失效示例</summary><AttachmentList items={accessExamples} surface={filled ? "filled" : "outlined"} readOnly /></details>
  </div>;
}
