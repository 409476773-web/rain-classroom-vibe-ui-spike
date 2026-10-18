import { useRef, useState, type FormEvent } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { Stack } from "@rain-next/layouts";
import { Button, FormItem, InputNumber, Textarea } from "@rain-next/ui";

type Draft = { score: number | null; comment: string };
const tasks = [
  { studentId: "student-01", questionId: "question-01", name: "学生甲", question: "案例分析题", maxScore: 20 },
  { studentId: "student-02", questionId: "question-01", name: "学生乙", question: "案例分析题", maxScore: 20 },
] as const;
const taskId = (task: typeof tasks[number]) => `${task.studentId}:${task.questionId}`;
const emptyDraft: Draft = { score: null, comment: "" };

/** Local host owns task identity, drafts, saved records and navigation. No automatic save on navigation. */
export function GradingActionsExample() {
  const [index, setIndex] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [records, setRecords] = useState<Record<string, Draft>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const scoreRef = useRef<HTMLInputElement>(null);
  const task = tasks[index]!;
  const id = taskId(task), draft = drafts[id] ?? emptyDraft;
  const saved = records[id];
  const dirty = !saved || saved.score !== draft.score || saved.comment !== draft.comment;
  function update(patch: Partial<Draft>) {
    setDrafts(current => ({ ...current, [id]: { ...(current[id] ?? emptyDraft), ...patch } }));
    setErrors(current => ({ ...current, [id]: "" })); setNotice("");
  }
  function saveAndContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (draft.score === null || !Number.isInteger(draft.score) || draft.score < 0 || draft.score > task.maxScore || !scoreRef.current?.validity.valid) {
      setErrors(current => ({ ...current, [id]: `请输入 0–${task.maxScore} 之间的整数得分。` }));
      scoreRef.current?.focus(); return;
    }
    // Capture identity and payload before changing the active object.
    const savedId = id, payload = { ...draft };
    setRecords(current => ({ ...current, [savedId]: payload }));
    setErrors(current => ({ ...current, [savedId]: "" }));
    setNotice(`${task.name}的评分已保存到当前页面。`);
    if (index < tasks.length - 1) setIndex(index + 1);
  }
  return <DensityProvider density="default">
    <section aria-label="连续批改操作组合">
      <Stack gap={16}>
        <p style={{ margin: 0 }}>本地模拟批改；切换对象保留草稿，保存只影响当前学生的当前题目。</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--rain-space-12)", flexWrap: "wrap" }}>
          <h3 style={{ margin: 0, fontSize: "var(--rain-font-size-16)" }}>{task.name} · {task.question}</h3>
          <span>{index + 1} / {tasks.length}</span>
        </div>
        <form aria-label={`${task.name}评分`} noValidate onSubmit={saveAndContinue}>
          <Stack gap={16} key={id}>
            <FormItem label="得分" required status={errors[id] ? "error" : "default"} message={errors[id] || undefined} help={`满分 ${task.maxScore} 分`}>
              <InputNumber ref={scoreRef} size={36} value={draft.score} min={0} max={task.maxScore} precision={0} suffixText="分"
                onChange={() => setNotice("")} onValueChange={score => update({ score })} />
            </FormItem>
            <FormItem label="评语"><Textarea rows={3} value={draft.comment} onValueChange={comment => update({ comment })} /></FormItem>
            <p role="status" style={{ margin: 0 }}>{dirty ? "当前草稿尚未保存。" : "当前评分已保存到本地示例。"}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--rain-space-8)" }}>
              <Button type="button" size="medium" variant="secondary" disabled={index === 0} onClick={() => { setIndex(index - 1); setNotice(""); }}>上一份</Button>
              <Button type="button" size="medium" variant="secondary" disabled={index === tasks.length - 1} onClick={() => { setIndex(index + 1); setNotice(""); }}>下一份</Button>
              <Button type="submit" size="medium" variant="primary">{index < tasks.length - 1 ? "保存并继续" : "保存评分"}</Button>
            </div>
          </Stack>
        </form>
        <p role="status" aria-label="批改保存结果" style={{ margin: 0 }}>{notice || `已保存 ${Object.keys(records).length} / ${tasks.length} 份评分。`}</p>
      </Stack>
    </section>
  </DensityProvider>;
}
