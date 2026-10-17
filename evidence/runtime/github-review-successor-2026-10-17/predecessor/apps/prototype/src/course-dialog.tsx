import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Button, Dialog, AlertDialog, FormItem, IconButton, Input, Select, Separator, defineRainLocalRecipe, type DialogLocalRecipe } from "@rain-next/ui";
import { CloseBoldIcon } from "@rain-next/ui/icons/close-bold";
import "./course-dialog.css";

const teachingModes = [{ value: "seminar", label: "研讨课" }, { value: "practice", label: "实践课" }, { value: "lecture", label: "讲授课" }];
const initialCourse = { name: "设计方法与实践", mode: "seminar" };
const courseRecipe: DialogLocalRecipe = defineRainLocalRecipe({
  id: "course-edit-dialog", origin: "ui-dialog", scope: "feature",
  classes: { body: "course-dialog-body", header: "course-dialog-header" },
  modifiedParts: ["body", "header"], candidateTokens: ["--rain-local-course-dialog-gap"], promotionStatus: "not-proposed",
});

/** Mock consumer: the host owns draft, validation, async failure and committed values. */
export function CourseDialogExample({ longContent = false, actionGap = 8 }: { longContent?: boolean; actionGap?: 8 | 12 }) {
  const [course, setCourse] = useState(initialCourse), [draft, setDraft] = useState(initialCourse);
  const [open, setOpen] = useState(false), [saving, setSaving] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false), safeAction = useRef<HTMLButtonElement>(null);
  const dirty = draft.name !== course.name || draft.mode !== course.mode;
  const [invalid, setInvalid] = useState(false), [error, setError] = useState("");
  const [notice, setNotice] = useState(""), pending = useRef(false), attempt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const input = useRef<HTMLInputElement>(null), formId = useId();
  useEffect(() => () => clearTimeout(timer.current), []);
  function save(event: FormEvent) {
    event.preventDefault();
    if (pending.current) return;
    if (!draft.name.trim()) { setInvalid(true); input.current?.focus(); return; }
    pending.current = true; setSaving(true); setError("");
    const submitted = { ...draft, name: draft.name.trim() };
    timer.current = setTimeout(() => {
      pending.current = false; setSaving(false);
      if (attempt.current++ === 0) { setError("保存失败，当前内容已保留。请重试。"); return; }
      setCourse(submitted); setOpen(false); setNotice("课程资料已更新");
    }, 700);
  }
  return <section className="course-dialog-example" aria-label="课程资料编辑" data-rain-id="recipe-course-dialog">
    <div><h2>课程资料</h2><p data-slot="committed-name">{course.name}</p><p data-slot="committed-mode">{teachingModes.find(mode => mode.value === course.mode)?.label}</p></div>
    <Dialog.Root open={open} onOpenChange={(next, details) => {
      if (pending.current) { details.cancel(); return; }
      if (!next && dirty) { details.cancel(); setConfirmDiscard(true); return; }
      if (next) { setDraft(course); setError(""); setInvalid(false); setNotice(""); attempt.current = 0; }
      setOpen(next);
    }}>
      <Dialog.Trigger render={<Button variant="secondary">编辑课程资料</Button>} />
      <Dialog.Content width={longContent ? 616 : 516} initialFocus={input} localRecipe={courseRecipe} aria-busy={saving}
        style={{ "--rain-local-course-dialog-gap": "var(--rain-space-24)" } as CSSProperties}>
        <Dialog.Header>
          <div><Dialog.Title>编辑课程资料</Dialog.Title><Dialog.Description>调整课程名称与教学方式，保存后更新课程信息。</Dialog.Description></div>
          <Dialog.Close render={<IconButton aria-label="关闭编辑" size="28/20" icon={<CloseBoldIcon />} disabled={saving} />} />
        </Dialog.Header>
        <Dialog.Body>
          <form id={formId} onSubmit={save} noValidate className="course-dialog-fields">
            <FormItem label="课程名称" required disabled={saving} status={invalid ? "error" : "default"} message={invalid ? "请输入课程名称" : undefined}>
              <Input ref={input} value={draft.name} onValueChange={name => { setDraft({ ...draft, name }); setInvalid(false); }} />
            </FormItem>
            <FormItem label="教学方式" required disabled={saving} help="根据本学期的主要教学方式选择。">
              <Select value={draft.mode} onValueChange={value => setDraft({ ...draft, mode: String(value) })} options={teachingModes} clearable={false} />
            </FormItem>
          </form>
          <section aria-label="调整说明" className="course-dialog-details"><Separator /><div className="course-dialog-explanation"><h3>调整后会发生什么</h3><p>课程名称将用于课程空间与学习提醒。修改教学方式不会改变已发布的学习任务。</p></div>
            {longContent && <ol>{Array.from({ length: 8 }, (_, index) => <li key={index}><h4>第 {index + 1} 周 · 教学安排</h4><p>围绕真实学习问题组织课堂讨论，结合阅读、实践与小组交流完成学习任务。课程资料调整后，保留已有讨论、学生作品和学习记录。</p></li>)}</ol>}
          </section>
          {error && <p role="alert" className="course-dialog-error">{error}</p>}
        </Dialog.Body>
        <Dialog.Footer divider={longContent}>
          <span role="status" className="course-dialog-progress">{saving ? "正在保存…" : ""}</span>
          <div className="course-dialog-actions" data-gap={actionGap}><Dialog.Close render={<Button variant="tertiary" size="small" disabled={saving}>取消</Button>} />
          <Button variant="primary" size="small" type="submit" form={formId} loading={saving}>{error ? "重试保存" : "保存更改"}</Button></div>
        </Dialog.Footer>
        <AlertDialog.Root open={confirmDiscard} onOpenChange={setConfirmDiscard}>
          <AlertDialog.Content initialFocus={safeAction}>
            <AlertDialog.Header><AlertDialog.Title>放弃课程修改？</AlertDialog.Title><AlertDialog.Description>尚未保存的课程名称和教学方式将丢失。</AlertDialog.Description></AlertDialog.Header>
            <AlertDialog.Footer><AlertDialog.Close render={<Button ref={safeAction} variant="secondary">继续编辑</Button>} />
              <Button variant="primary" tone="danger" onClick={() => { setConfirmDiscard(false); setOpen(false); }}>放弃修改</Button></AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Dialog.Content>
    </Dialog.Root>
    <p role="status">{notice}</p>
    <p className="course-dialog-note">虚构课程演示：每次打开后首次保存会模拟失败，重试可成功。有未保存修改时，取消会先请求确认。</p>
  </section>;
}
