import { useCallback, useEffect, useId, useRef, useState, type RefObject } from "react";
import {
  AttachmentList, Button, Dialog, Textarea, useAttachmentUpload,
  type AttachmentConstraints, type AttachmentListProps, type AttachmentRecord, type AttachmentUploadHandler,
} from "@rain-next/ui";
import { createDocumentFixtures, createMediaFixtures } from "./attachment-scenarios-fixtures";
import { AttachmentIntake } from "./attachment-intake";
import "./attachment-scenarios-demo.css";

const initialMessage = "这是一组本周课程资料，请结合课堂笔记阅读。";
const mediaConstraints: AttachmentConstraints = { accept: ".png,.jpg,.jpeg,.webp,.gif,.mp4,.webm" };
const uploadStatus = (item: AttachmentRecord) => item.replacement?.status ?? item.status ?? "done";

function wait(milliseconds: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    signal.throwIfAborted();
    const abort = () => { clearTimeout(timer); reject(new DOMException("上传已取消", "AbortError")); };
    const timer = setTimeout(() => { signal.removeEventListener("abort", abort); resolve(); }, milliseconds);
    signal.addEventListener("abort", abort, { once: true });
  });
}

/** Each scene owns one controller. Folding and closing only hide its views. */
function useDemoAttachments(createItems: () => AttachmentRecord[], constraints?: AttachmentConstraints) {
  const [initialItems] = useState(createItems);
  const failures = useRef(new Set<string>());
  const upload = useCallback<AttachmentUploadHandler>(async (_file, context) => {
    const fail = failures.current.delete(context.id);
    for (const percent of [20, 42, 70, 100]) {
      await wait(900, context.signal);
      if (fail && percent === 42) throw new Error("本地演示：连接中断，文件已保留。请重试。");
      context.onProgress(percent);
    }
    context.onProcessing();
    await wait(400, context.signal);
    return { availability: "available", uploadedBy: "我", uploadedAt: "本页刚刚添加" };
  }, []);
  const workflow = useAttachmentUpload({ initialItems, upload, constraints, autoUpload: true });
  const restore = () => { failures.current.clear(); workflow.reset(initialItems); };
  const demonstrate = () => {
    if (workflow.summary.pendingCount || workflow.removingIds.length) return;
    const selected = new Set([2, 3, 6, 10, 18, 22].map(index => initialItems[index]?.id).filter((id): id is string => !!id));
    const current = workflow.items.filter(item => selected.has(item.id) && item.file);
    failures.current = new Set([initialItems[3]?.id, initialItems[6]?.id].filter((id): id is string => !!id));
    workflow.reset(workflow.items.map(item => current.some(candidate => candidate.id === item.id) ? { ...item, status: "idle", progress: undefined, error: undefined } : item));
    current.forEach(item => { void workflow.start(item.id); });
  };
  const retryFailed = () => {
    const ids = workflow.items.filter(item => uploadStatus(item) === "error").map(item => item.id);
    ids.forEach(id => { void workflow.retry(id); });
  };
  return { ...workflow, restore, demonstrate, retryFailed };
}
type DemoAttachments = ReturnType<typeof useDemoAttachments>;

function handlers(workflow: DemoAttachments): Pick<AttachmentListProps, "onStart" | "onRetry" | "onCancel" | "onRemove" | "onReplace"> {
  return {
    onStart: item => { void workflow.start(item.id); }, onRetry: item => { void workflow.retry(item.id); },
    onCancel: item => workflow.cancel(item.id), onRemove: item => workflow.remove(item.id),
    onReplace: (item, file) => { workflow.replaceFile(item.id, file); },
  };
}

function Summary({ name, workflow, onShowErrors }: { name: string; workflow: DemoAttachments; onShowErrors: () => void }) {
  const counts = { done: 0, uploading: 0, processing: 0, idle: 0, canceled: 0, error: 0 };
  workflow.items.forEach(item => { counts[uploadStatus(item)] += 1; });
  return <div className="attachment-scenarios__summary" data-testid={`${name}-summary`} role="status">
    <span>共 {workflow.items.length} 个</span>
    {counts.done > 0 && <span>· {counts.done} 个已上传</span>}
    {counts.uploading > 0 && <span>· {counts.uploading} 个上传中</span>}
    {counts.processing > 0 && <span>· {counts.processing} 个处理中</span>}
    {counts.idle > 0 && <span>· {counts.idle} 个待上传</span>}
    {counts.canceled > 0 && <span>· {counts.canceled} 个已取消</span>}
    {counts.error > 0 && <><span>·</span><Button variant="text" tone="danger" aria-label={`查看 ${counts.error} 个失败附件`} onClick={onShowErrors}>{counts.error} 个失败</Button></>}
  </div>;
}

function Rejections({ workflow }: { workflow: DemoAttachments }) {
  if (!workflow.rejections.length) return null;
  return <div className="attachment-scenarios__rejections" role="alert"><p>以下文件未添加：</p><ul>{workflow.rejections.map((item, index) => <li key={`${item.file.name}-${index}`}>{item.file.name}：{item.reason}</li>)}</ul><Button variant="text" onClick={workflow.clearRejections}>清除提示</Button></div>;
}

function useFailureFocus(workflow: DemoAttachments, container: RefObject<HTMLDivElement | null>, reveal: () => void) {
  const [targetId, setTargetId] = useState<string>();
  useEffect(() => {
    if (!targetId) return;
    const row = Array.from(container.current?.querySelectorAll<HTMLElement>("[data-attachment-id]") ?? []).find(item => item.dataset.attachmentId === targetId);
    const target = row?.querySelector<HTMLElement>('button[aria-label^="重试上传 "]:not(:disabled)') ?? row?.querySelector<HTMLElement>("button:not(:disabled)");
    target?.focus({ preventScroll: true });
    row?.scrollIntoView?.({ block: "nearest" });
    setTargetId(undefined);
  }, [targetId, container]);
  return () => {
    const failed = workflow.items.find(item => uploadStatus(item) === "error");
    if (!failed) return;
    reveal(); setTargetId(failed.id);
  };
}

function Fold({ expanded, count, limit, onChange, label = "展开全部", controls }: { expanded: boolean; count: number; limit: number; onChange: (value: boolean) => void; label?: string; controls: string }) {
  return <div className="attachment-scenarios__fold"><span>当前显示 {Math.min(count, expanded ? count : limit)} / {count} 个附件</span>
    {count > limit && <Button variant="text" tone="brand" aria-expanded={expanded} aria-controls={controls} onClick={() => onChange(!expanded)}>{expanded ? "收起附件" : `${label} ${count} 个`}</Button>}
  </div>;
}

function OrdinaryScenario() {
  const workflow = useDemoAttachments(() => createDocumentFixtures("ordinary"));
  const [expanded, setExpanded] = useState(false);
  const addButton = useRef<HTMLButtonElement>(null), list = useRef<HTMLDivElement>(null), id = useId();
  const showErrors = useFailureFocus(workflow, list, () => setExpanded(true));
  return <section className="attachment-scenarios__scene" aria-label="普通附件列表" data-testid="attachment-scenario-ordinary">
    <AttachmentIntake variant="list" count={workflow.items.length} label="添加课程附件" onFiles={files => { workflow.addFiles(files); }} buttonRef={addButton}>{({ trigger, empty }) => <>
    <div className="attachment-scenarios__heading"><div><h3>课程资料</h3><p>普通列表 · 多文件与上传状态</p></div>{workflow.items.length > 0 && trigger}</div>
    <Rejections workflow={workflow} />
    {workflow.items.length === 0 ? empty : <>
    <div className="attachment-scenarios__summary-row"><Summary name="ordinary" workflow={workflow} onShowErrors={showErrors} /><span className="attachment-scenarios__note">也可将文件拖入此区域</span>
      {workflow.summary.errorCount > 0 && <Button variant="text" tone="brand" onClick={workflow.retryFailed}>重试失败项（{workflow.summary.errorCount}）</Button>}
    </div>
    <div ref={list} id={id}><AttachmentList items={expanded ? workflow.items : workflow.items.slice(0, 6)} {...handlers(workflow)} restoreFocusRef={addButton} /></div>
    <Fold expanded={expanded} count={workflow.items.length} limit={6} onChange={setExpanded} controls={id} />
    </>}
    </>}</AttachmentIntake>
    <div className="attachment-scenarios__demo-actions">
      <Button onClick={workflow.demonstrate} disabled={workflow.summary.pendingCount > 0 || workflow.removingIds.length > 0}>演示上传</Button>
      <Button variant="text" onClick={() => { workflow.reset(); setExpanded(false); }}>查看首次添加</Button>
      <Button variant="text" aria-label="恢复普通列表示例" onClick={() => { workflow.restore(); setExpanded(false); }}>恢复示例</Button>
    </div>
  </section>;
}

function ComposerScenario() {
  const workflow = useDemoAttachments(() => createDocumentFixtures("composer", 12));
  const [text, setText] = useState(initialMessage), [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<{ text: string; items: AttachmentRecord[] }[]>([]);
  const addButton = useRef<HTMLButtonElement>(null), editor = useRef<HTMLTextAreaElement>(null), list = useRef<HTMLDivElement>(null), id = useId();
  const showErrors = useFailureFocus(workflow, list, () => setExpanded(true));
  const canSend = workflow.summary.canSubmit && Boolean(text.trim() || workflow.items.length);
  const submit = () => {
    if (!canSend) return;
    setMessages(previous => [...previous, { text: text.trim(), items: [...workflow.items] }]);
    workflow.reset(); setText(""); setExpanded(false); editor.current?.focus();
  };
  return <section className="attachment-scenarios__scene" aria-label="紧凑草稿输入" data-testid="attachment-scenario-composer">
    <div className="attachment-scenarios__heading"><div><h3>发布课程消息</h3><p>紧凑附件 · 草稿中的文件可直接移除</p></div><div className="attachment-scenarios__demo-actions"><Button variant="text" onClick={() => { workflow.reset(); setExpanded(false); }}>查看首次添加</Button><Button variant="text" onClick={() => { workflow.restore(); setText(initialMessage); setMessages([]); setExpanded(false); }}>恢复草稿示例</Button></div></div>
    <form onSubmit={event => { event.preventDefault(); submit(); }}>
      <AttachmentIntake variant="composer" count={workflow.items.length} label="添加草稿附件" onFiles={files => { workflow.addFiles(files); }} buttonRef={addButton}>{({ trigger }) =>
      <Textarea ref={editor} className="attachment-scenarios__composer" aria-label="课程消息" aria-describedby={`${id}-hint`} value={text} onValueChange={setText} rows={4}
        blockStart={workflow.items.length > 0 ? <div className="attachment-scenarios__composer-files">
          <div className="attachment-scenarios__summary-row"><Summary name="composer" workflow={workflow} onShowErrors={showErrors} />
            {workflow.items.length > 2 && <Button className="attachment-scenarios__composer-fold" data-narrow-only={workflow.items.length <= 4 || undefined} variant="text" tone="brand" aria-controls={`${id}-files`} aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "收起附件" : `查看全部 ${workflow.items.length} 个`}</Button>}
          </div>
          <div ref={list} id={`${id}-files`} className="attachment-scenarios__draft-files" data-expanded={expanded || undefined}><AttachmentList items={expanded ? workflow.items : workflow.items.slice(0, 4)} size="sm" layout="wrap" actions="draft" surface="filled" {...handlers(workflow)} restoreFocusRef={addButton} /></div>
          {workflow.summary.errorCount > 0 && <Button variant="text" tone="brand" onClick={workflow.retryFailed}>重试失败项（{workflow.summary.errorCount}）</Button>}
          <Rejections workflow={workflow} />
        </div> : <><span className="attachment-intake__sr"><Summary name="composer" workflow={workflow} onShowErrors={showErrors} /></span><Rejections workflow={workflow} /></>}
        blockEnd={<div className="attachment-scenarios__composer-footer">{trigger}<Button variant="primary" type="submit" disabled={!canSend}>发送到本页</Button></div>}
      />}</AttachmentIntake>
      <p className="attachment-scenarios__note" id={`${id}-hint`}>仅在本页回显消息；此演示等待当前附件上传完成后发送，不提交真实课程消息。</p>
    </form>
    {messages.length > 0 && <div className="attachment-scenarios__messages" aria-live="polite">{messages.map((message, index) => <article key={index} aria-label={`本页消息 ${index + 1}`}><strong>本页消息 · 已回显</strong>{message.text && <p>{message.text}</p>}{message.items.length > 0 && <details><summary>{message.items.length} 个附件</summary><AttachmentList items={message.items} size="sm" layout="wrap" readOnly /></details>}</article>)}</div>}
  </section>;
}

function DialogScenario() {
  const workflow = useDemoAttachments(() => createDocumentFixtures("dialog"));
  const [open, setOpen] = useState(false);
  const addButton = useRef<HTMLButtonElement>(null), list = useRef<HTMLDivElement>(null);
  const showErrors = useFailureFocus(workflow, list, () => {});
  return <section className="attachment-scenarios__scene" aria-label="弹窗附件列表" data-testid="attachment-scenario-dialog">
    <div className="attachment-scenarios__heading"><div><h3>集中管理附件</h3><p>弹窗内滚动列表，底部操作保持可见。</p></div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger render={<Button variant="primary" aria-label="打开附件弹窗">打开附件弹窗</Button>}>打开附件弹窗</Dialog.Trigger>
        <Dialog.Content width={816} className="attachment-scenarios__dialog">
          <AttachmentIntake variant="list" count={workflow.items.length} label="添加弹窗附件" onFiles={files => { workflow.addFiles(files); }} buttonRef={addButton}>{({ trigger, empty }) => <>
          <Dialog.Header><div className="attachment-scenarios__heading attachment-scenarios__dialog-title"><Dialog.Title>本次附件</Dialog.Title>{workflow.items.length > 0 && trigger}</div><Dialog.Description>关闭视图后保留本页内容，上传可以继续。</Dialog.Description><Summary name="dialog" workflow={workflow} onShowErrors={showErrors} />
            <div className="attachment-scenarios__dialog-tools">
              <div className="attachment-scenarios__demo-actions"><Button onClick={workflow.demonstrate} disabled={workflow.summary.pendingCount > 0 || workflow.removingIds.length > 0}>演示上传</Button>
                <Button variant="text" onClick={() => workflow.reset()}>查看首次添加</Button>
                {workflow.summary.errorCount > 0 && <Button variant="text" tone="brand" onClick={workflow.retryFailed}>重试失败项（{workflow.summary.errorCount}）</Button>}
                <Button variant="text" onClick={workflow.restore}>恢复弹窗示例</Button>
              </div>
            </div>
          </Dialog.Header>
          <Dialog.Body><Rejections workflow={workflow} />{workflow.items.length === 0 ? empty : <div ref={list}><AttachmentList items={workflow.items} surface="filled" {...handlers(workflow)} restoreFocusRef={addButton} /></div>}</Dialog.Body>
          <Dialog.Footer divider className="attachment-scenarios__dialog-footer"><span>共 {workflow.items.length} 个附件</span><Dialog.Close render={<Button aria-label="关闭附件弹窗">关闭</Button>}>关闭</Dialog.Close></Dialog.Footer>
          </>}</AttachmentIntake>
        </Dialog.Content>
      </Dialog.Root>
    </div>
    <p className="attachment-scenarios__note">当前有 {workflow.items.length} 个附件。关闭和重新打开不会重置文件；上传结果只保留在本页。</p>
  </section>;
}

function MediaScenario() {
  const workflow = useDemoAttachments(createMediaFixtures, mediaConstraints);
  const [expanded, setExpanded] = useState(false);
  const addButton = useRef<HTMLButtonElement>(null), list = useRef<HTMLDivElement>(null), id = useId();
  const showErrors = useFailureFocus(workflow, list, () => setExpanded(true));
  return <section className="attachment-scenarios__scene" aria-label="图片与视频网格" data-testid="attachment-scenario-media">
    <div className="attachment-scenarios__heading"><div><h3>图片与视频</h3><p>内容缩略图 · 文件名和操作留在画面下方</p></div><div className="attachment-scenarios__demo-actions"><Button variant="text" onClick={() => { workflow.reset(); setExpanded(false); }}>查看首次添加</Button><Button variant="text" onClick={() => { workflow.restore(); setExpanded(false); }}>恢复媒体示例</Button></div></div>
    <AttachmentIntake variant="media" count={workflow.items.length} label="添加图片或视频" accept={mediaConstraints.accept} onFiles={files => { workflow.addFiles(files); }} buttonRef={addButton}>{({ trigger, empty }) => <>
    <Rejections workflow={workflow} />
    {workflow.items.length === 0 ? empty : <>
    <div className="attachment-scenarios__summary-row"><Summary name="media" workflow={workflow} onShowErrors={showErrors} />{workflow.summary.errorCount > 0 && <Button variant="text" tone="brand" onClick={workflow.retryFailed}>重试失败项（{workflow.summary.errorCount}）</Button>}</div>
    <div ref={list} id={id} className="attachment-scenarios__media-grid"><AttachmentList items={expanded ? workflow.items : workflow.items.slice(0, 8)} orientation="vertical" layout="grid" {...handlers(workflow)} restoreFocusRef={addButton} />{trigger}</div>
    <Fold expanded={expanded} count={workflow.items.length} limit={8} onChange={setExpanded} controls={id} />
    </>}
    </>}</AttachmentIntake>
    <p className="attachment-scenarios__note">图片为 AI 生成的教学情境示意；视频为实验室示意图制作的 4 秒无声合成短片，不是课堂现场实录。多个视频条目复用同一演示文件。</p>
  </section>;
}

export function AttachmentScenariosDemo() {
  return <div className="attachment-scenarios"><p className="attachment-scenarios__note">本地演示：选择、预览和下载使用真实文件；上传在本页模拟，不向服务器传输。四个场景独立，刷新后恢复示例。</p><OrdinaryScenario /><ComposerScenario /><DialogScenario /><MediaScenario /></div>;
}
