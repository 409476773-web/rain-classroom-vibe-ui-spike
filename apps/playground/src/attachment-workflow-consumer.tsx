// Isolated local verification consumer; no production endpoint or persistent storage.
import { StrictMode, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AttachmentList, AttachmentPicker, Button, createAttachmentXhrUploader, useAttachmentUpload, type AttachmentRecord } from "@rain-next/ui";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/motion.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "./styles.css";

const upload = createAttachmentXhrUploader({ url: "http://127.0.0.1:5472/upload", parseResponse: response => response as { url: string; remoteId: string } });
const initial: AttachmentRecord[] = [{ id: "original", name: "原始资料.txt", size: 16, type: "text/plain", url: "http://127.0.0.1:5472/original", status: "done" }];
function Consumer() {
  const [readOnly, setReadOnly] = useState(false), [dark, setDark] = useState(false);
  const add = useRef<HTMLButtonElement>(null);
  const workflow = useAttachmentUpload({ initialItems: initial, upload, autoUpload: true, readOnly, constraints: { maxFiles: 4, maxFileSize: 2 * 1024 * 1024, maxTotalSize: 4 * 1024 * 1024, accept: ".txt,.pdf,.png,.zip" } });
  return <main data-rain-theme={dark ? "dark" : "light"} style={{ maxWidth: 900, margin: "auto", padding: 16, background: "var(--rain-category-background-neutral-1)", color: "var(--rain-category-text-neutral-1)" }}>
    <h1>附件流程验证</h1><Button onClick={() => setReadOnly(value => !value)}>{readOnly ? "允许编辑" : "只读模式"}</Button><Button onClick={() => setDark(value => !value)}>切换主题</Button>
    <Button onClick={() => workflow.reset(initial)}>重新回填</Button>
    <AttachmentPicker buttonRef={add} readOnly={readOnly} accept=".txt,.pdf,.png,.zip" onFiles={files => { workflow.addFiles(files); }} />
    <AttachmentList items={workflow.items} readOnly={readOnly} restoreFocusRef={add} onRemove={item => workflow.remove(item.id)} onReplace={(item, file) => { workflow.replaceFile(item.id, file); }} onStart={item => { void workflow.start(item.id); }} onRetry={item => { void workflow.retry(item.id); }} onCancel={item => workflow.cancel(item.id)} />
    {workflow.rejections.map((entry, index) => <p role="alert" key={index}>{entry.file.name}：{entry.reason}</p>)}
    <output data-testid="summary" style={{ display: "block", overflowWrap: "anywhere" }}>{JSON.stringify(workflow.summary)}</output>
    <Button disabled={!workflow.summary.canSubmit}>提交表单</Button>
  </main>;
}
createRoot(document.getElementById("root")!).render(<StrictMode><Consumer /></StrictMode>);
