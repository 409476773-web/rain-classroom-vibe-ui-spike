import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Alert, AlertDescription, AlertDialog, AlertTitle, Attachment, AttachmentContent, AttachmentDescription,
  AttachmentMedia, AttachmentTitle, Button, Dialog, FormItem, IconButton, Input, RadioGroup, Textarea,
} from "@rain-next/ui";
import { CloseBoldIcon } from "@rain-next/ui/icons/close-bold";
import { FileIcon } from "@rain-next/ui/icons/file";
import "./g6-task-drawer.css";

const taskSeed = { title: "找一个值得追问的问题", instructions: "阅读课程导读，记录一个尚未得到解释的现象。带着问题来课堂讨论。", format: "个人记录" };
const longParagraphs = [
  "先从课程导读中的真实案例开始，写下你观察到的现象。把看见的事实和自己的解释分开，保留暂时没有答案的部分。",
  "选择一个值得继续追问的问题。问题可以具体到某个细节：同样的条件下为什么会出现不同的结果？已有解释是否遗漏了重要信息？",
  "整理现有证据，说明它支持了什么，又有哪些限制。引用材料时保留来源，避免只摘取支持自己观点的片段。",
  "带着记录进入课堂，与同伴交换问题和证据。先理解对方的判断，再提出一个能帮助讨论继续进行的追问。",
  "讨论结束后，记录自己的看法发生了什么变化。仍然没有解决的问题可以成为下一次观察的起点。",
  "复核记录时，检查每个判断是否有相应材料支持。如果只有个人感受，尝试补充一次观察或一个可以验证的例子，并说明新的证据可能如何改变你的结论。",
  "比较小组中不同的解释，寻找共同认可的事实。对暂时存在分歧的地方，分别写明各自依据，保留问题本身，避免为了快速达成一致而遗漏有价值的线索。",
  "准备一段简短的课堂分享，介绍最初的问题、收集证据的方法以及目前的判断。把仍需验证的部分明确列出，让同伴能够根据具体信息提供反馈。",
];

export function TaskDraftDialog() {
  const [saved, setSaved] = useState(taskSeed), [draft, setDraft] = useState(taskSeed);
  const [open, setOpen] = useState(false), [guard, setGuard] = useState(false), [view, setView] = useState<"edit" | "preview">("edit");
  const [scenario, setScenario] = useState("success"), [content, setContent] = useState("short");
  const [pending, setPending] = useState(false), [failed, setFailed] = useState(false), [titleError, setTitleError] = useState(false);
  const [notice, setNotice] = useState(""), [guardTheme, setGuardTheme] = useState<"light" | "dark">("light");
  const pendingRef = useRef(false), attempted = useRef(false), leaving = useRef(false), resumeEditing = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trigger = useRef<HTMLButtonElement>(null), close = useRef<HTMLButtonElement>(null), preview = useRef<HTMLButtonElement>(null), save = useRef<HTMLButtonElement>(null);
  const titleInput = useRef<HTMLInputElement>(null), safe = useRef<HTMLButtonElement>(null), restore = useRef<HTMLElement | null>(null), body = useRef<HTMLDivElement>(null);
  const reading = useRef<HTMLElement>(null), previousView = useRef(view);
  const dirty = draft.title !== saved.title || draft.instructions !== saved.instructions || draft.format !== saved.format;
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => { if (failed) save.current?.focus(); }, [failed]);
  useEffect(() => { body.current?.scrollTo?.({ top: 0 }); }, [view, content]);
  useEffect(() => {
    if (view === "preview") reading.current?.focus();
    else if (previousView.current === "preview") preview.current?.focus();
    previousView.current = view;
  }, [view]);

  function askToClose() {
    if (pendingRef.current) return;
    if (!dirty) { setOpen(false); return; }
    const active = document.activeElement;
    restore.current = active instanceof HTMLElement && close.current?.closest('[data-rain-id="ui-dialog"][data-slot="content"]')?.contains(active) ? active : close.current;
    setGuardTheme(close.current?.closest('[data-rain-theme]')?.getAttribute("data-rain-theme") === "dark" ? "dark" : "light");
    leaving.current = false; resumeEditing.current = false; setGuard(true);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRef.current) return;
    if (!draft.title.trim()) { setTitleError(true); titleInput.current?.focus(); return; }
    const submitted = { ...draft, title: draft.title.trim() };
    pendingRef.current = true; setPending(true); setTitleError(false);
    const reject = scenario === "failure" && !attempted.current;
    attempted.current = true;
    timer.current = setTimeout(() => {
      timer.current = null; pendingRef.current = false; setPending(false);
      if (reject) { setFailed(true); return; }
      setSaved(submitted); setDraft(submitted); setFailed(false); setOpen(false); setNotice("已保存任务草稿，仅更新本页。");
    }, 500);
  }
  function showPreview() { setView("preview"); }
  function returnToEdit() { setView("edit"); }

  return <div className="g6-task-example">
    <div className="g6-task-demo-options">
      <RadioGroup legend="保存演示" name="dialogSaveScenario" orientation="horizontal" value={scenario} onValueChange={setScenario}
        options={[{ value: "success", label: "正常保存" }, { value: "failure", label: "首次保存失败" }]} />
      <RadioGroup legend="预览内容" name="dialogContentScenario" orientation="horizontal" value={content} onValueChange={setContent}
        options={[{ value: "short", label: "默认内容" }, { value: "long", label: "长内容" }]} />
    </div>
    <p className="g6-task-demo-note">本地交互演示：保存等待500ms，不连接课程服务；附件只展示信息。</p>
    <Dialog.Root open={open}
      onOpenChange={(next, details) => {
        if (!next && (pendingRef.current || dirty)) { details.cancel(); if (!pendingRef.current) askToClose(); return; }
        if (next) { setDraft(saved); setView("edit"); setFailed(false); setTitleError(false); attempted.current = false; }
        setOpen(next);
      }}>
      <div className="g6-interaction-task"><div><span className="g6-interaction-eyebrow">课前准备 · 草稿</span><h3 data-testid="dialog-saved-title">{saved.title}</h3><p>{saved.instructions}</p><span className="g6-interaction-meta">完成方式：{saved.format}</span></div>
        <Dialog.Trigger ref={trigger} render={<Button variant="primary">编辑课前任务</Button>} />
      </div>
      <p className="g6-interaction-feedback" role="status">{notice || "任务尚未发布。"}</p>
      <Dialog.Content width={616} className="g6-task-dialog" data-view={view}
        initialFocus={titleInput} finalFocus={trigger}>
        <form className="g6-task-layout" noValidate onSubmit={submit} aria-busy={pending || undefined}>
          <Dialog.Header className="g6-task-header flex-row items-start justify-between gap-rain-16"><div className="g6-task-heading min-w-0 flex-1">
            <Dialog.Title>{view === "edit" ? "编辑课前任务" : draft.title.trim() || "尚未填写任务标题"}</Dialog.Title>
            <Dialog.Description>{view === "edit" ? "修改任务要求，保存后继续准备课堂。" : `课前准备 · ${draft.format}`}</Dialog.Description>
          </div><div className="g6-task-header-actions">
            {view === "edit" ? <Button ref={preview} variant="text" size="small" disabled={pending} onClick={showPreview}>预览任务</Button>
              : <Button variant="text" size="small" onClick={returnToEdit}>返回编辑</Button>}
            <IconButton ref={close} size="28/20" icon={<CloseBoldIcon />} aria-label={view === "edit" ? "关闭编辑" : "关闭预览"} disabled={pending} onClick={askToClose} />
          </div></Dialog.Header>
          <Dialog.Body ref={body} className="g6-task-body">
            {view === "edit" ? <div className="g6-task-fields">
              <FormItem label="任务标题" required disabled={pending} status={titleError ? "error" : "default"} message={titleError ? "请填写任务标题。" : undefined}>
                <Input ref={titleInput} name="taskTitle" size={36} value={draft.title} clearable={false} onValueChange={title => { setDraft(current => ({ ...current, title })); setTitleError(false); }} />
              </FormItem>
              <FormItem label="任务要求" disabled={pending} help="写清楚学生需要观察什么、带来什么。"><Textarea name="taskInstructions" rows={5} value={draft.instructions} onValueChange={instructions => setDraft(current => ({ ...current, instructions }))} /></FormItem>
              <RadioGroup legend="完成方式" name="taskFormat" orientation="horizontal" disabled={pending} value={draft.format} onValueChange={format => setDraft(current => ({ ...current, format }))}
                options={[{ value: "个人记录", label: "个人记录" }, { value: "小组讨论", label: "小组讨论" }]} />
            </div> : <article className="g6-task-reading" tabIndex={-1} ref={reading}>
              <p className="g6-task-instructions">{draft.instructions || "尚未填写任务要求"}</p>
              {content === "long" && longParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              <Attachment><AttachmentMedia><FileIcon size={24} /></AttachmentMedia><AttachmentContent><AttachmentTitle>课程导读.pdf</AttachmentTitle><AttachmentDescription>PDF · 6页 · 示例附件</AttachmentDescription></AttachmentContent></Attachment>
            </article>}
          </Dialog.Body>
          {view === "edit" && <Dialog.Footer divider className="g6-task-footer flex-col items-stretch gap-rain-12">
            {failed && <Alert tone="error" role="alert"><AlertTitle>保存失败</AlertTitle><AlertDescription>草稿仍然保留，可以继续修改后重试。</AlertDescription></Alert>}
            <div className="g6-task-footer-actions"><Button variant="secondary" disabled={pending} onClick={askToClose}>取消</Button><Button ref={save} variant="primary" type="submit" loading={pending} disabled={pending}>{failed ? "重试保存" : "保存草稿"}</Button></div>
          </Dialog.Footer>}
        </form>
      </Dialog.Content>
      <AlertDialog.Root open={guard} onOpenChange={setGuard}>
        <AlertDialog.Content width={416} theme={guardTheme} initialFocus={safe} finalFocus={() => leaving.current ? false : resumeEditing.current ? preview.current : restore.current?.isConnected ? restore.current : close.current}>
          <AlertDialog.Header className="g6-task-discard-header flex-row items-start justify-between"><AlertDialog.Title>放弃未保存的修改？</AlertDialog.Title><AlertDialog.Close render={<IconButton size="28/20" icon={<CloseBoldIcon />} aria-label="关闭退出确认" />} /></AlertDialog.Header>
          <AlertDialog.Body><AlertDialog.Description>本次修改尚未保存。放弃后将恢复原任务。</AlertDialog.Description></AlertDialog.Body>
          <AlertDialog.Footer><AlertDialog.Close render={<Button ref={safe} variant="secondary" onClick={() => { if (view === "preview") { resumeEditing.current = true; returnToEdit(); } }}>继续编辑</Button>} /><Button variant="primary" tone="danger" onClick={() => { leaving.current = true; setDraft(saved); setGuard(false); setOpen(false); setNotice("已放弃修改，原任务保留。"); }}>放弃修改</Button></AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Dialog.Root>
  </div>;
}
