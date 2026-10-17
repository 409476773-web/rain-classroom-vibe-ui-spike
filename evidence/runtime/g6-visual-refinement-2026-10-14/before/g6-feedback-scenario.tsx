import { useEffect, useRef, useState } from "react";
import {
  Button,
  Questionnaire, QuestionnaireActions, QuestionnaireChoice, QuestionnaireChoiceDescription,
  QuestionnaireChoices, QuestionnaireDescription, QuestionnaireError, QuestionnaireInput,
  QuestionnaireItem, QuestionnaireNext, QuestionnairePrevious, QuestionnaireProgress,
  QuestionnaireSkip, QuestionnaireSubmit, QuestionnaireTitle, defineRainLocalRecipe,
  type QuestionnaireItemDefinition, type QuestionnaireItemStatus, type QuestionnairePart,
} from "@rain-next/ui";
import "./g6-feedback-scenario.css";

const topics = { example: "希望多看示例", practice: "希望加强练习", other: "其他目标" } as const;
const goals = { observation: "观察记录", evidence: "证据判断", discussion: "讨论表达" } as const;
type FeedbackItem = "topic" | "detail" | "goals" | "note";
type Draft = {
  topic: string;
  detail: string;
  goals: string[];
  note: string;
  step: FeedbackItem;
  statuses: Record<FeedbackItem, QuestionnaireItemStatus>;
};
type FeedbackResult = Pick<Draft, "topic" | "detail" | "goals" | "note">;
type Notice = { text: string; failed?: boolean };

// Local experiment: task layout and group-level errors; the shared engine is unchanged.
const feedbackRecipe = defineRainLocalRecipe<QuestionnairePart, "ui-questionnaire">({
  id: "g6-feedback-task",
  scope: "feature",
  origin: "ui-questionnaire",
  classes: {
    root: "g6-feedback-form", progress: "g6-feedback-progress", item: "g6-feedback-item",
    title: "g6-feedback-title", description: "g6-feedback-description", choices: "g6-feedback-choices",
    choice: "g6-feedback-choice", "choice-description": "g6-feedback-choice-description",
    input: "g6-feedback-input", error: "g6-feedback-error", actions: "g6-feedback-actions",
    skip: "g6-feedback-submit-action",
  },
  modifiedParts: ["root", "progress", "item", "title", "description", "choices", "choice", "choice-description", "input", "error", "actions", "skip"],
  candidateTokens: [],
  promotionStatus: "not-proposed",
});

function emptyDraft(): Draft {
  return {
    topic: "", detail: "", goals: [], note: "", step: "topic",
    statuses: { topic: "unanswered", detail: "unanswered", goals: "unanswered", note: "unanswered" },
  };
}

function copyDraft(draft: Draft): Draft {
  const path: FeedbackItem[] = ["topic", ...(draft.topic === "other" ? ["detail" as const] : []), "goals", "note"];
  return { ...draft, goals: [...draft.goals], statuses: { ...draft.statuses }, step: path.includes(draft.step) ? draft.step : "topic" };
}

export function FeedbackScenario() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saved, setSaved] = useState<Draft | null>(null);
  const [submitted, setSubmitted] = useState<FeedbackResult | null>(null);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [notice, setNotice] = useState<Notice>({ text: "" });
  const [restoredSkip, setRestoredSkip] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const completedTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted) completedTitle.current?.focus();
  }, [submitted]);

  useEffect(() => {
    if (epoch) formRef.current?.querySelector<HTMLElement>("fieldset[data-active]")?.focus();
  }, [epoch]);

  const items: QuestionnaireItemDefinition[] = [
    { name: "topic", required: true, choices: Object.keys(topics).map(value => ({ value })) },
    ...(draft.topic === "other" ? [{ name: "detail", required: true }] : []),
    { name: "goals", required: true, choices: Object.keys(goals).map(value => ({ value })) },
    { name: "note" },
  ];

  function recordStatus(name: FeedbackItem, status: QuestionnaireItemStatus) {
    setDraft(previous => previous.statuses[name] === status ? previous : {
      ...previous, statuses: { ...previous.statuses, [name]: status },
    });
  }

  function replaceDraft(next: Draft, text: string) {
    setDraft(copyDraft(next));
    setSubmitted(null);
    setRestoredSkip(next.statuses.note === "skipped");
    setEpoch(value => value + 1);
    setNotice({ text });
  }

  return <div className="g6-feedback-scenario" data-rain-id="local-g6-feedback-scenario" data-state={submitted ? "completed" : "editing"}>
    <div className="g6-feedback-task-context" data-slot="context">
      <span>课堂观察与证据判断</span>
      <span>课后反馈 · 本地演示</span>
    </div>

    {submitted ? <section role="region" aria-label="反馈摘要" className="g6-feedback-result" data-slot="result">
      <div className="g6-feedback-result-intro">
        <h3 ref={completedTitle} tabIndex={-1}>反馈已提交</h3>
        <p>你的回答已汇总如下。本页演示没有向服务器发送数据。</p>
      </div>
      <dl>
        <div><dt>学习目标</dt><dd>{topics[submitted.topic as keyof typeof topics] ?? submitted.topic}{submitted.detail && <span className="g6-feedback-result-detail">{submitted.detail}</span>}</dd></div>
        <div><dt>练习内容</dt><dd>{submitted.goals.map(value => goals[value as keyof typeof goals] ?? value).join("、")}</dd></div>
        <div><dt>给老师的补充</dt><dd>{submitted.note || "未填写"}</dd></div>
      </dl>
    </section> : <>
      <Questionnaire key={epoch} ref={formRef} aria-label="课堂反馈" items={items} item={draft.step}
        localRecipe={feedbackRecipe} shortcuts="letters"
        onItemChange={step => setDraft(previous => ({ ...previous, step: step as FeedbackItem }))}
        onSubmit={event => {
          event.preventDefault();
          // Only the native form's currently applicable answers become a submission.
          const data = new FormData(event.currentTarget);
          const result: FeedbackResult = {
            topic: String(data.get("topic") ?? ""), detail: String(data.get("detail") ?? ""),
            goals: data.getAll("goals").map(String), note: String(data.get("note") ?? "").trim(),
          };
          if (simulateFailure) {
            setNotice({ text: "提交失败，回答已保留。关闭模拟失败后可以重试。", failed: true });
            return;
          }
          setSubmitted(result);
          setNotice({ text: "" });
        }}>
        <QuestionnaireProgress render={(props, state) => {
          const text = `第 ${state.current} 题 · 当前共 ${state.total} 题`;
          return <div {...props} aria-valuetext={text}>{text}</div>;
        }} />

        <QuestionnaireItem name="topic" required onStatusChange={status => recordStatus("topic", status)}>
          <QuestionnaireTitle>这节课，你最希望得到什么帮助？</QuestionnaireTitle>
          <QuestionnaireDescription>选择最需要的一项，帮助老师安排后续学习。</QuestionnaireDescription>
          <QuestionnaireChoices>{Object.entries(topics).map(([value, label]) =>
            <QuestionnaireChoice key={value} value={value} checked={draft.topic === value}
              onChange={() => setDraft(previous => ({ ...previous, topic: value }))}>
              {label}<QuestionnaireChoiceDescription>{value === "example" ? "通过例子理解事实和解释。" : value === "practice" ? "练习记录与判断。" : "接下来需要补充说明。"}</QuestionnaireChoiceDescription>
            </QuestionnaireChoice>)}</QuestionnaireChoices>
          <QuestionnaireError>请选择学习目标。</QuestionnaireError>
        </QuestionnaireItem>

        {draft.topic === "other" && <QuestionnaireItem name="detail" required
          invalid={draft.detail.trim().length > 0 && draft.detail.trim().length < 4}
          onStatusChange={status => recordStatus("detail", status)}>
          <QuestionnaireTitle>请补充你的学习目标</QuestionnaireTitle>
          <QuestionnaireDescription>用一句话说明你需要的帮助，至少填写 4 个字。</QuestionnaireDescription>
          <QuestionnaireInput aria-label="具体学习目标" value={draft.detail} minLength={4} required
            placeholder="例如：希望学习如何记录课堂观察"
            onChange={event => {
              const detail = event.currentTarget.value;
              setDraft(previous => ({ ...previous, detail }));
            }} />
          <QuestionnaireError>请至少填写 4 个字。</QuestionnaireError>
        </QuestionnaireItem>}

        <QuestionnaireItem name="goals" required multiple onStatusChange={status => recordStatus("goals", status)}>
          <QuestionnaireTitle>你希望重点练习哪些内容？</QuestionnaireTitle>
          <QuestionnaireDescription>可选择多项，至少选一项。</QuestionnaireDescription>
          <QuestionnaireChoices>{Object.entries(goals).map(([value, label]) =>
            <QuestionnaireChoice key={value} value={value} checked={draft.goals.includes(value)} onChange={event => {
              const checked = event.currentTarget.checked;
              setDraft(previous => ({ ...previous, goals: checked ? [...previous.goals, value] : previous.goals.filter(goal => goal !== value) }));
            }}>{label}</QuestionnaireChoice>)}</QuestionnaireChoices>
          <QuestionnaireError>请至少选择一项练习内容。</QuestionnaireError>
        </QuestionnaireItem>

        <QuestionnaireItem name="note" onStatusChange={status => recordStatus("note", status)}>
          <QuestionnaireTitle>还有想告诉老师的话吗？<span className="g6-feedback-optional">（可选）</span></QuestionnaireTitle>
          <QuestionnaireDescription>补充一句话，最多 120 个字；也可以直接跳过并提交。</QuestionnaireDescription>
          <QuestionnaireInput aria-label="给老师的补充" value={draft.note} maxLength={120} placeholder="写下你的想法"
            onChange={event => {
              const note = event.currentTarget.value;
              setDraft(previous => ({ ...previous, note }));
              setRestoredSkip(false);
            }} />
          <div className="g6-feedback-note-meta">
            <span>{restoredSkip ? "上次未填写，请确认填写或跳过后提交。" : ""}</span>
            <span aria-hidden="true">{draft.note.length}/120</span>
          </div>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireNext />
          {draft.note.trim() ? <QuestionnaireSubmit>提交反馈</QuestionnaireSubmit> : <QuestionnaireSkip variant="primary">跳过并提交</QuestionnaireSkip>}
        </QuestionnaireActions>
      </Questionnaire>

      <div className="g6-feedback-draft-tools" data-slot="draft-actions">
        <span>需要稍后继续？</span>
        <Button variant="text" onClick={() => { setSaved(copyDraft(draft)); setNotice({ text: "草稿已保存在本页，可恢复继续。" }); }}>保存本页草稿</Button>
        <Button variant="text" disabled={!saved} onClick={() => saved && replaceDraft(saved, "已恢复本页草稿，请继续填写。")}>恢复草稿</Button>
      </div>
    </>}

    {notice.text && <p className="g6-feedback-notice" role={notice.failed ? "alert" : "status"} data-state={notice.failed ? "error" : "info"}>{notice.text}</p>}

    <details className="g6-feedback-demo-controls" data-slot="demo-controls">
      <summary>演示控制</summary>
      <p>仅用于体验当前示例。草稿不会在刷新后保留。</p>
      <div>
        <Button variant="text" onClick={() => replaceDraft({ ...emptyDraft(), topic: "example", goals: ["observation"], step: "goals", statuses: { ...emptyDraft().statuses, topic: "answered", goals: "answered" } }, "已载入示例草稿。")}>载入示例草稿</Button>
        <Button variant="text" onClick={() => replaceDraft(emptyDraft(), "已重新开始本次演示。")}>重新填写</Button>
        <Button variant="text" aria-pressed={simulateFailure} onClick={() => setSimulateFailure(value => !value)}>模拟提交失败：{simulateFailure ? "开" : "关"}</Button>
      </div>
    </details>
  </div>;
}
