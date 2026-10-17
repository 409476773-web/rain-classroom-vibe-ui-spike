import { useEffect, useRef, useState, type FormEvent } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { Inline, Split, Stack } from "@rain-next/layouts";
import { Avatar, avatarAssets, assignAvatarAssets, Button, Checkbox, Empty, EmptyActions, EmptyDescription, EmptyTitle, FormItem, IconButton, Input, Link, Popover, QuestionNumber, RadioGroup, Select, SystemStatusTag, Tag, Tabs, Textarea, defineRainLocalRecipe, type PopoverPart, type RadioPart } from "@rain-next/ui";
import { CollapseIcon } from "@rain-next/ui/icons/collapse";
import { ArrowLeftIcon } from "@rain-next/ui/icons/arrow-left";
import { ArrowRightIcon } from "@rain-next/ui/icons/arrow-right";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { ArrowUpIcon } from "@rain-next/ui/icons/arrow-up";
import { HelpIcon } from "@rain-next/ui/icons/help";
import { simulateTask } from "../bm-b/state";
import { answers, filterAnswers, groupSequence, initialGrades, scoreError, type Answer, type AnswerFilter, type Draft, type Order, type Paper } from "./state";
import "./page.css";

const studentAvatars = assignAvatarAssets([...new Set(answers.map(answer => answer.student))], "student");

function DisclosureIcon() {
  return <span className="bm-c-disclosure-icons" aria-hidden="true"><ArrowDownIcon className="bm-c-disclosure-closed" /><ArrowUpIcon className="bm-c-disclosure-open" /></span>;
}
const gradingHelp = defineRainLocalRecipe<PopoverPart, "ui-popover">({
  id: "bm-c-grading-help", scope: "feature", origin: "ui-popover", classes: { content: "bm-c-help" },
  modifiedParts: ["content"], candidateTokens: [], promotionStatus: "not-proposed",
});
const paperButtons = defineRainLocalRecipe<RadioPart, "ui-radio">({
  id: "bm-c-paper-buttons", scope: "feature", origin: "ui-radio",
  classes: { root: "bm-c-paper-option", input: "bm-c-paper-input", control: "bm-c-paper-indicator", label: "bm-c-paper-label" },
  modifiedParts: ["root", "input", "control", "label"], candidateTokens: [], promotionStatus: "not-proposed",
});

export function GradingWorkbenchScenario({ saveTask = simulateTask }: { saveTask?: (signal: AbortSignal, fail: boolean) => Promise<void> }) {
  const [paper, setPaper] = useState<Paper>("A"), [order, setOrder] = useState<Order>("question");
  const [filter, setFilter] = useState<AnswerFilter>("all"), [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(answers[0]!.id), [grades, setGrades] = useState(initialGrades);
  const [expandedGroup, setExpandedGroup] = useState("A-question-1"), positions = useRef<Record<string, string>>({});
  const [drafts, setDrafts] = useState<Record<string, Draft>>({}), [saving, setSaving] = useState(false);
  const [error, setError] = useState(""), [invalidScore, setInvalidScore] = useState(""), [notice, setNotice] = useState("");
  const [leftClosed, setLeftClosed] = useState(false), [rightClosed, setRightClosed] = useState(false), [wide, setWide] = useState(false);
  const [dark, setDark] = useState(false), [failSave, setFailSave] = useState(false);
  const leftToggle = useRef<HTMLButtonElement>(null), rightToggle = useRef<HTMLButtonElement>(null);
  const leftCollapse = useRef<HTMLButtonElement>(null), rightCollapse = useRef<HTMLButtonElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null), headingRef = useRef<HTMLHeadingElement>(null), errorRef = useRef<HTMLParagraphElement>(null);
  const requestRef = useRef<AbortController | null>(null), previousSelection = useRef(selected), selectionFocus = useRef(false);
  const visible = filterAnswers(paper, filter, query, grades);
  const current = answers.find(answer => answer.id === selected && answer.paper === paper);
  const draft = current ? drafts[current.id] ?? { score: grades[current.id]?.score.toString() ?? "", comment: grades[current.id]?.comment ?? "" } : { score: "", comment: "" };
  const sequence = current ? groupSequence(current, order, visible) : [], position = sequence.findIndex(answer => answer.id === selected);
  const previous = position > 0 ? sequence[position - 1] : undefined, next = position >= 0 ? sequence[position + 1] : undefined;
  const unit = order === "question" ? "位" : "题";
  const groups = [...new Set(visible.map(answer => order === "question" ? `第 ${answer.question} 题 · ${answer.title}` : answer.student))];
  const groupLabel = (answer: Answer) => order === "question" ? `第 ${answer.question} 题 · ${answer.title}` : answer.student;
  const groupId = (answer: Answer, traversal = order) => `${answer.paper}-${traversal}-${traversal === "question" ? answer.question : answer.student}`;
  const dirty = current && (draft.score !== (grades[current.id]?.score.toString() ?? "") || draft.comment !== (grades[current.id]?.comment ?? ""));
  const gradedCount = answers.filter(answer => answer.paper === paper && Object.hasOwn(grades, answer.id)).length;

  useEffect(() => () => requestRef.current?.abort(), []);
  useEffect(() => { if (current) positions.current[groupId(current)] = current.id; }, [selected, order]);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  useEffect(() => {
    if (previousSelection.current !== selected && selectionFocus.current) headingRef.current?.focus();
    previousSelection.current = selected; selectionFocus.current = false;
  }, [selected]);
  function choose(answer: Answer | undefined, focus = true) {
    if (requestRef.current) return;
    selectionFocus.current = focus;
    if (answer) setExpandedGroup(groupId(answer));
    setSelected(answer?.id ?? null); setError(""); setInvalidScore(""); setNotice("");
  }
  function changeScope(nextPaper: Paper, nextFilter: AnswerFilter, nextQuery: string, focus = false) {
    if (requestRef.current) return;
    const matches = filterAnswers(nextPaper, nextFilter, nextQuery, grades);
    setPaper(nextPaper); setFilter(nextFilter); setQuery(nextQuery);
    choose(matches.find(answer => answer.id === selected) ?? matches[0], focus);
  }
  function changeDraft(change: Partial<Draft>) {
    if (!current || requestRef.current) return;
    setDrafts(value => ({ ...value, [current.id]: { ...draft, ...change } })); setInvalidScore(""); setNotice("");
  }
  async function save(advance: boolean, event?: FormEvent) {
    event?.preventDefault();
    if (!current || requestRef.current) return;
    const validation = scoreError(draft.score, current.maxScore); setInvalidScore(validation); setError("");
    if (validation) { setRightClosed(false); scoreRef.current?.focus(); return; }
    const submitted = { score: Number(draft.score), comment: draft.comment }, id = current.id, destination = advance ? next : undefined;
    const request = new AbortController(); requestRef.current = request; setSaving(true); setFailSave(false);
    try {
      await saveTask(request.signal, failSave);
      if (request.signal.aborted || requestRef.current !== request) return;
      setGrades(value => ({ ...value, [id]: submitted }));
      setDrafts(value => ({ ...value, [id]: { score: String(submitted.score), comment: submitted.comment } }));
      if (destination) { selectionFocus.current = true; setSelected(destination.id); }
      setNotice(destination ? "评分已保存，已进入下一对象。" : advance ? "评分已保存，当前分组已到末尾。" : "本题评分已保存。");
    } catch {
      if (request.signal.aborted || requestRef.current !== request) return;
      setRightClosed(false); setError("保存失败，当前作答和评分草稿已保留。请重试。");
    } finally {
      if (requestRef.current === request && !request.signal.aborted) { requestRef.current = null; setSaving(false); }
    }
  }

  const directory = <nav aria-label="分层批改目录">{groups.map(group => {
            const children = visible.filter(answer => groupLabel(answer) === group), id = groupId(children[0]!);
            return <details key={id} open={expandedGroup === id}>
            <summary data-focus="item" aria-disabled={saving} onClick={event => {
              event.preventDefault(); if (requestRef.current) return;
              if (expandedGroup === id) { setExpandedGroup(""); return; }
              choose(children.find(answer => answer.id === positions.current[id]) ?? children.find(answer => answer.text && !Object.hasOwn(grades, answer.id)) ?? children[0]);
            }}><span className="bm-c-directory-person">{order === "student" && <Avatar size={24} alt="" src={avatarAssets[studentAvatars[group]!]} />}{group}</span><DisclosureIcon /></summary>
            <ul className={order === "student" ? "bm-c-question-grid" : undefined}>{children.map(answer => {
              const graded = Object.hasOwn(grades, answer.id), label = drafts[answer.id] && !graded ? "草稿" : answer.text ? "待批改" : "未作答";
              const score = graded ? <span className="bm-c-directory-score"><strong>{grades[answer.id]!.score}</strong> <span className="bm-c-score-unit">分</span></span> : null;
              return <li key={answer.id}>{order === "student" ? <>
                <QuestionNumber number={answer.question} size={32} current={answer.id === selected}
                  feedback={graded ? "reviewed" : answer.text ? "pending" : "unanswered"} disabled={saving}
                  aria-label={`选择 ${answer.student} 第 ${answer.question} 题`} aria-describedby={`bm-c-question-status-${answer.id}`}
                  title={`第 ${answer.question} 题 · ${answer.title}`} onClick={() => choose(answer)} />
                <span id={`bm-c-question-status-${answer.id}`} className="bm-c-question-status bm-c-muted">{score ?? label}</span>
              </> : <button className="bm-c-student-row" type="button" data-focus="item" aria-current={answer.id === selected ? "true" : undefined} disabled={saving} onClick={() => choose(answer)} aria-label={`选择 ${answer.student} 第 ${answer.question} 题`}>
                <span className="bm-c-directory-person"><Avatar size={24} alt="" src={avatarAssets[studentAvatars[answer.student]!]} />{answer.student}</span>
                <span className="bm-c-directory-state">{score ?? <Tag color={answer.text ? "brand" : "neutral"}>{label}</Tag>}</span>
              </button>}</li>;
            })}</ul>
          </details>; })}</nav>;

  return <main className="bm-c" data-rain-id="scenario-bm-c" data-asset-identity="local-experiment" data-rain-theme={dark ? "dark" : "light"}>
    <header className="bm-c-taskbar" data-slot="taskbar">
      <Inline gap={12}><Link href="#bm-d"><span className="bm-c-back"><ArrowLeftIcon aria-hidden="true" />返回</span></Link><span className="bm-c-taskbar-divider" aria-hidden="true" /><div><h1>大学物理 · 单元作业批改</h1><p>运动、能量与实验 · 手动批改</p></div></Inline>
      <span className="bm-c-muted">{paper} 卷已批改 {gradedCount} / 18</span>
    </header>
    <Tabs.Root className="bm-c-order" aria-label="批改顺序" appearance="contained" size={32} overflow="scroll" value={order}
      onValueChange={value => { if (!requestRef.current && (value === "question" || value === "student")) { setOrder(value); if (current) setExpandedGroup(groupId(current, value)); } }}
      items={(["question", "student"] as const).map(value => ({ value, label: value === "question" ? "按题批改" : "按人批改", disabled: saving, content: order === value ? directory : null }))}>
    <div className="bm-c-toolbar" data-slot="toolbar">
      <Inline gap={16}>
        <RadioGroup className="bm-c-paper-group" localRecipe={paperButtons} legend="试卷" legendHidden orientation="horizontal" disabled={saving} value={paper} onValueChange={value => { if (value === "A" || value === "B") changeScope(value, filter, query); }} options={[{ value: "A", label: "A 卷" }, { value: "B", label: "B 卷" }]} />
        <Tabs.Nav />
      </Inline>
      <Inline gap={8}>
        <Button hidden={!leftClosed} ref={leftToggle} variant="tertiary" aria-controls="bm-c-context" aria-expanded={false} onClick={() => { setLeftClosed(false); requestAnimationFrame(() => leftCollapse.current?.focus({ preventScroll: true })); }}>展开目录</Button>
        <Button hidden={!rightClosed} ref={rightToggle} variant="tertiary" aria-controls="bm-c-inspector" aria-expanded={false} onClick={() => { setRightClosed(false); requestAnimationFrame(() => rightCollapse.current?.focus({ preventScroll: true })); }}>展开评分</Button>
        <Checkbox label="加宽评分区" checked={wide} onCheckedChange={setWide} />
      </Inline>
    </div>
    <Split.Root className="bm-c-workspace" collapsed={leftClosed} sidebarWidth={320} minMainWidth={680} sidebarId="bm-c-context" collapseFocusRef={leftToggle} gap={12}>
      <Split.Sidebar className="bm-c-context" role="region" aria-label="批改目录">
        <DensityProvider density="default" className="flex min-h-0 flex-1 flex-col"><Stack gap={12} className="bm-c-directory-layout">
          <Stack gap={12}>
          <Inline justify="between"><Inline gap={8}><h2>批改目录</h2><span className="bm-c-muted">{visible.length} 份</span></Inline><IconButton size="32/16" ref={leftCollapse} aria-label="收起目录" title="收起目录" aria-controls="bm-c-context" aria-expanded={true} icon={<CollapseIcon />} onClick={event => { event.currentTarget.focus({ preventScroll: true }); setLeftClosed(true); }} /></Inline>
          <div className="bm-c-directory-filters"><Input aria-label="查找批改对象" disabled={saving} value={query} onValueChange={value => changeScope(paper, filter, value)} placeholder="搜索学生或题目" />
          <Select aria-label="目录状态" clearable={false} disabled={saving} value={filter} onValueChange={value => { if (["all", "pending", "graded", "unanswered"].includes(String(value))) changeScope(paper, value as AnswerFilter, query); }} options={[{ value: "all", label: "全部作答" }, { value: "pending", label: "待批改" }, { value: "graded", label: "已批改" }, { value: "unanswered", label: "未作答" }]} /></div>
          </Stack>
          <Tabs.Panels />
        </Stack></DensityProvider>
      </Split.Sidebar>
      <Split.Main className="bm-c-center">
        <Split.Root className="bm-c-detail" collapsed={rightClosed} sidebarWidth={wide ? 400 : 320} minMainWidth={340} sidebarId="bm-c-inspector" collapseFocusRef={rightToggle} gap={0}>
          <Split.Main className="bm-c-answer" scroll="auto" role="region" aria-label="当前作答">
            {current ? <Stack gap={24}>
              <header><h2 ref={headingRef} tabIndex={-1}>{current.student} · 第 {current.question} 题</h2></header>
              <section><h3>{current.title}</h3><p className="rain-type-reading">{current.prompt}</p></section>
              <section className="bm-c-answer-text" data-slot="answer-text"><Inline justify="between"><h3>学生作答</h3>{!current.text && <span className="bm-c-muted">未作答</span>}</Inline>
                {current.text ? current.text.split("\n\n").map((paragraph, index) => <p key={index} className="rain-type-reading">{paragraph}</p>) : <p>该题尚未提交作答，仍可按教学要求给分。</p>}
              </section>
            </Stack> : <Empty><EmptyTitle>没有匹配的批改对象</EmptyTitle><EmptyDescription>调整目录筛选后继续批改，原有草稿仍然保留。</EmptyDescription><EmptyActions><Button onClick={() => changeScope(paper, "all", "", true)}>清空筛选</Button></EmptyActions></Empty>}
          </Split.Main>
          <Split.Sidebar className="bm-c-inspector" role="region" aria-label="评分面板">
            <form onSubmit={event => void save(false, event)} className="bm-c-grade-form" aria-label="评分表单" aria-busy={saving}>
              <div className="bm-c-grade-body" data-slot="grading-body"><Stack gap={16}>
                <div className="bm-c-grade-heading"><Inline justify="between"><Inline gap={4}><h2>评分与评语</h2><Popover.Root><Popover.Trigger render={<IconButton size="28/16" aria-label="评分说明" icon={<HelpIcon />} />} /><Popover.Content localRecipe={gradingHelp}><Popover.Title>评分说明</Popover.Title><Popover.Description>切换对象会保留草稿，保存后计入已批改。评语无需必填。</Popover.Description></Popover.Content></Popover.Root></Inline><IconButton size="32/16" ref={rightCollapse} aria-label="收起评分" title="收起评分" aria-controls="bm-c-inspector" aria-expanded={true} icon={<CollapseIcon />} onClick={event => { event.currentTarget.focus({ preventScroll: true }); setRightClosed(true); }} /></Inline>
                </div>
                <details className="bm-c-reference"><summary data-focus="item">查看评分参考<DisclosureIcon /></summary><p className="rain-type-reading">概念准确占 40%，分析过程占 40%，条件与表达占 20%。请结合本题满分独立判断；此参考不会自动写入评分。</p></details>
                <FormItem label="本题得分" required disabled={!current || saving} status={invalidScore ? "error" : "default"} message={invalidScore || `满分 ${current?.maxScore ?? "—"} 分，支持 0.5 分`}>
                  <div className="bm-c-score-input"><Input appearance="filled" ref={scoreRef} inputMode="decimal" value={draft.score} onValueChange={score => changeDraft({ score })} placeholder="输入分数" /></div>
                </FormItem>
                <FormItem label="评语" disabled={!current || saving}><Textarea appearance="filled" rows={5} maxLength={1000} value={draft.comment} onValueChange={comment => changeDraft({ comment })} placeholder="记录值得肯定的思路，或给出改进建议" /></FormItem>
                <details><summary data-focus="item">演示设置<DisclosureIcon /></summary><Stack gap={12}><Button variant="tertiary" onClick={() => setDark(!dark)}>{dark ? "切换浅色" : "切换深色"}</Button><Checkbox label="下次保存失败" disabled={saving} checked={failSave} onCheckedChange={setFailSave} /></Stack></details>
              </Stack></div>
              <footer className="bm-c-grade-footer" data-slot="grading-footer"><Stack gap={12}>
                {error && <p role="alert" ref={errorRef} tabIndex={-1} className="bm-c-error">{error}</p>}
                <Inline justify="between" wrap={false}>
                  <div role="status"><SystemStatusTag status={error ? "error" : saving ? "processing" : dirty ? "warning" : current && grades[current.id] ? "success" : "neutral"}>{error ? "保存失败" : saving ? "正在保存" : dirty ? "草稿待保存" : current && grades[current.id] ? "已保存" : current ? "尚未评分" : "未选择对象"}</SystemStatusTag><span className="sr-only">{notice}</span></div>
                  <Inline gap={4} wrap={false}><IconButton size="32/16" aria-label={`上一${unit}`} title={`上一${unit}`} icon={<ArrowLeftIcon />} disabled={!previous || saving} onClick={() => choose(previous)} /><span className="bm-c-muted">{position < 0 ? "—" : position + 1} / {sequence.length}</span><IconButton size="32/16" aria-label={`下一${unit}`} title={`下一${unit}`} icon={<ArrowRightIcon />} disabled={!next || saving} onClick={() => choose(next)} /></Inline>
                </Inline>
                <Inline gap={8} wrap={false}><Button type="submit" variant="tertiary" tone="default" disabled={!current || saving}>保存</Button><Button className="flex-1" variant="primary" disabled={!current || saving} loading={saving} onClick={() => void save(true)}>{next ? error ? `重试并下一${unit}` : `保存并下一${unit}` : error ? "重试保存" : "保存本题"}</Button></Inline>
              </Stack></footer>
            </form>
          </Split.Sidebar>
        </Split.Root>
      </Split.Main>
    </Split.Root>
    </Tabs.Root>
    <p className="bm-c-footnote">虚构教学示例 · 评分仅保留在当前页面，刷新后恢复。</p>
  </main>;
}
