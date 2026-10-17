import { useEffect, useRef, useState, type FormEvent } from "react";
import { Avatar, avatarAssets, assignAvatarAssets, Button, Checkbox, Empty, EmptyTitle, EmptyDescription, FormItem, IconButton, Input, Popover, Tabs, Select, SystemStatusTag, Tag, Textarea, defineRainLocalRecipe, type ButtonPart } from "@rain-next/ui";
import { ArrowLeftIcon } from "@rain-next/ui/icons/arrow-left";
import { ArrowRightIcon } from "@rain-next/ui/icons/arrow-right";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { EditorHighlightIcon } from "@rain-next/ui/icons/editor-highlight";
import { SearchIcon } from "@rain-next/ui/icons/search";
import { CollapseIcon } from "@rain-next/ui/icons/collapse";
import { CourseIcon } from "@rain-next/ui/icons/course";
import { AddIcon } from "@rain-next/ui/icons/add";
import { simulateTask } from "../bm-b/state";
import { answers, groupSequence, initialGrades, scoreError, type Answer, type AnswerFilter, type Draft, type Order, type Paper } from "../bm-c/state";
import "./page.css";

const names = ["林知夏", "陈一鸣", "许嘉宁", "周以安", "沈星禾", "陆景行"];
const displayName = (answer: Answer) => names[Number(answer.id.split("-")[1]) - 1]!;
const avatars = assignAvatarAssets(names, "student");
const quickScoreRecipe = defineRainLocalRecipe<ButtonPart, "ui-button">({ id: "teacher-grading-quick-score", scope: "feature", origin: "ui-button", classes: { root: "tg-quick-score-button" }, modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed" });
const reference = [
  ["明确惯性的含义，区分惯性与力。", "说明脚部减速与上身保持原运动状态。", "受力分析准确，表达清晰。"],
  ["说明重力势能减小、动能增加。", "给出能量关系，并说明守恒成立的条件。", "讨论阻力做功时机械能的变化。"],
  ["控制同一弹簧，并在弹性限度内实验。", "记录力与伸长量，利用图线斜率求劲度系数。", "重复测量，分析并减小实验误差。"],
];

/** Local prototype. BM-C owns source data and validation; no public component is forked. */
export function TeacherGradingPage() {
  const [paper, setPaper] = useState<Paper>("A"), [order, setOrder] = useState<Order>("question");
  const [filter, setFilter] = useState<AnswerFilter>("all"), [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>("A-1-2"), [grades, setGrades] = useState(initialGrades);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [invalidScore, setInvalidScore] = useState("");
  const readingRef = useRef<HTMLDivElement>(null), errorRef = useRef<HTMLParagraphElement>(null);
  const positions = useRef<Record<string, string>>({});
  const [saving, setSaving] = useState(false), [error, setError] = useState(""), [notice, setNotice] = useState("");
  const [failSave, setFailSave] = useState(false), [focusMode, setFocusMode] = useState(false);
  const [expanded, setExpanded] = useState("2"), [showOverview, setShowOverview] = useState(false);
  const scoreRef = useRef<HTMLInputElement>(null), headingRef = useRef<HTMLHeadingElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  useEffect(() => { const title = document.title; document.title = "主观题批改 · 雨课堂"; return () => { requestRef.current?.abort(); document.title = title; }; }, []);
  useEffect(() => { readingRef.current?.scrollTo?.({ top: 0 }); }, [selected]);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  const visibleFor = (p: Paper, f: AnswerFilter, q: string) => answers.filter(a => a.paper === p && `${displayName(a)} ${a.title} 第${a.question}题`.includes(q.trim()) && (f === "all" || (f === "graded" ? Boolean(grades[a.id]) : f === "unanswered" ? !a.text : Boolean(a.text) && !grades[a.id])));
  const visible = visibleFor(paper, filter, query);
  const current = answers.find(a => a.id === selected && a.paper === paper);
  const draft = current ? drafts[current.id] ?? { score: grades[current.id]?.score.toString() ?? "", comment: grades[current.id]?.comment ?? "" } : { score: "", comment: "" };
  const sequence = current ? groupSequence(current, order, visible) : [];
  const position = sequence.findIndex(a => a.id === selected);
  const previous = position > 0 ? sequence[position - 1] : undefined, next = position >= 0 ? sequence[position + 1] : undefined;
  const unit = order === "question" ? "位" : "题";
  const groupKey = (a: Answer, mode = order) => mode === "question" ? String(a.question) : a.student;
  const groups = [...new Set(visible.map(a => groupKey(a)))];
  const total = answers.filter(a => a.paper === paper).length;
  const graded = answers.filter(a => a.paper === paper && grades[a.id]).length;
  const dirty = Boolean(current && (draft.score !== (grades[current.id]?.score.toString() ?? "") || draft.comment !== (grades[current.id]?.comment ?? "")));
  useEffect(() => { if (current) positions.current[`${paper}-${order}-${groupKey(current)}`] = current.id; }, [selected, paper, order]);
  function choose(answer?: Answer, focus = false) {
    if (requestRef.current) return;
    setSelected(answer?.id ?? null); setInvalidScore(""); setError(""); setNotice("");
    if (answer) setExpanded(groupKey(answer));
    if (focus) requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  }
  function scope(p: Paper, f: AnswerFilter, q: string) {
    if (requestRef.current) return;
    setPaper(p); setFilter(f); setQuery(q);
    const matches = visibleFor(p, f, q);
    choose(matches.find(a => a.id === selected) ?? matches[0]);
  }
  function changeDraft(value: Partial<Draft>) {
    if (!current || requestRef.current) return;
    setDrafts(old => ({ ...old, [current.id]: { ...draft, ...value } })); setInvalidScore(""); setError(""); setNotice("");
  }
  async function save(advance: boolean, event?: FormEvent) {
    event?.preventDefault();
    if (!current || requestRef.current) return;
    const invalid = scoreError(draft.score, current.maxScore);
    if (invalid) { setInvalidScore(invalid); scoreRef.current?.focus(); return; }
    const id = current.id, submitted = { score: Number(draft.score), comment: draft.comment }, destination = advance ? next : undefined;
    const request = new AbortController(); requestRef.current = request; setSaving(true); setInvalidScore(""); setError(""); setFailSave(false);
    try {
      await simulateTask(request.signal, failSave);
      if (request.signal.aborted) return;
      setGrades(old => ({ ...old, [id]: submitted }));
      if (destination) { setSelected(destination.id); requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true })); }
      setNotice(destination ? `评分已保存，已进入下一${unit}` : "评分已保存");
    } catch {
      if (!request.signal.aborted) setError("保存失败，评分和评语已保留，请重试。");
    } finally { if (!request.signal.aborted) { requestRef.current = null; setSaving(false); } }
  }

  const directoryContent = <>
        <div className="tg-compact-picker"><Select size={36} aria-label="选择批改对象" placeholder="选择批改对象" clearable={false} disabled={saving} value={visible.some(a => a.id === selected) ? selected : null} onValueChange={v => choose(visible.find(a => a.id === v), true)} options={groups.flatMap(key => visible.filter(a => groupKey(a) === key).map(a => ({ value:a.id, label:`${order === "question" ? `第 ${a.question} 题 · ${displayName(a)}` : `${displayName(a)} · 第 ${a.question} 题`} · ${grades[a.id] ? `${grades[a.id]!.score} 分` : a.text ? "待批改" : "未作答"}` })))} /></div>
        <nav className="tg-directory-list" aria-label="学生与题目">{groups.map(key => {
          const children = visible.filter(a => groupKey(a) === key), first = children[0]!;
          const count = children.filter(a => grades[a.id]).length;
          return <section className="tg-group" key={key}>
            <button className="tg-group-trigger" data-focus="item" disabled={saving} aria-expanded={expanded === key} onClick={() => { if (expanded === key) setExpanded(""); else choose(children.find(a => a.id === positions.current[`${paper}-${order}-${key}`]) ?? children.find(a => !grades[a.id] && a.text) ?? first); }}>
              {order === "question" ? <span className="tg-question-number">{String(first.question).padStart(2, "0")}</span> : <Avatar size={24} alt="" src={avatarAssets[avatars[displayName(first)]!]} />}
              <span className="tg-group-title"><strong>{order === "question" ? first.title : displayName(first)}</strong><small>{order === "question" ? `第 ${first.question} 题 · ${first.maxScore} 分` : "3 道主观题"}</small></span>
              <span className="tg-group-count" aria-label={`已批 ${count} 份，共 ${children.length} 份`}>{count}/{children.length}</span><ArrowDownIcon className={expanded === key ? "tg-rotated" : ""} />
            </button>
            {expanded === key && <ul>{children.map(a => {
              const edited = drafts[a.id] && (drafts[a.id]!.score !== (grades[a.id]?.score.toString() ?? "") || drafts[a.id]!.comment !== (grades[a.id]?.comment ?? ""));
              return <li key={a.id}><button data-focus="item" disabled={saving} aria-current={a.id === selected ? "true" : undefined} aria-label={`选择 ${displayName(a)} 第 ${a.question} 题`} onClick={() => choose(a, true)}>
                <span className="tg-person">{order === "question" && <Avatar size={24} alt="" src={avatarAssets[avatars[displayName(a)]!]} />}<span>{order === "question" ? displayName(a) : `第 ${a.question} 题 · ${a.title}`}</span></span>
                {edited ? <span className="tg-list-status">草稿</span> : grades[a.id] ? <span className="tg-list-score">{grades[a.id]!.score}<small> 分</small></span> : <span className="tg-list-status">{a.text ? "待批改" : "未作答"}</span>}
              </button></li>;
            })}</ul>}
          </section>;
        })}{!visible.length && <p className="tg-no-results">没有符合条件的作答</p>}</nav>
        <div className="tg-directory-foot">{paper} 卷 · {total - graded} 份待完成</div>
  </>;
  const workspace = showOverview ? <section className="tg-overview"><p>大学物理 A · 2026 秋季学期</p><h2>力学基础 · 第三次作业</h2><div className="tg-overview-stats"><div><strong>2</strong><span>套试卷</span></div><div><strong>3</strong><span>道主观题 / 卷</span></div><div><strong>{graded} / {total}</strong><span>{paper} 卷已批改</span></div></div><Button variant="primary" onClick={() => setShowOverview(false)}>继续批改</Button></section> : <div className="tg-workspace">
      <aside className="tg-directory" aria-label="批改目录" hidden={focusMode} data-slot="directory">
        <Tabs.Root className="tg-order-tabs" aria-label="批改顺序" size={28} appearance="contained" widthMode="equal" panelMount="unmount" value={order} onValueChange={v => { if (v !== "question" && v !== "student") return; setOrder(v); if (current) setExpanded(groupKey(current, v)); }} items={[{ value: "question", label: "按题批改", disabled: saving, content: directoryContent }, { value: "student", label: "按人批改", disabled: saving, content: directoryContent }]}>
        <div className="tg-directory-head">
          <Tabs.Nav />
          <Input size={32} leadingIcon={<SearchIcon />} aria-label="搜索学生或题目" placeholder="搜索学生或题目" value={query} disabled={saving} onValueChange={v => scope(paper, filter, v)} />
          <div className="tg-directory-filter"><span>{visible.length} 份作答</span><Select size={28} aria-label="批改状态筛选" clearable={false} disabled={saving} value={filter} onValueChange={v => { if (["all", "pending", "graded", "unanswered"].includes(String(v))) scope(paper, v as AnswerFilter, query); }} options={[{ value: "all", label: "全部状态" }, { value: "pending", label: "待批改" }, { value: "graded", label: "已批改" }, { value: "unanswered", label: "未作答" }]} /></div>
        </div>
        <Tabs.Panels />
        </Tabs.Root>
      </aside>
      <div className="tg-review">
      <section className="tg-reader" aria-label="答卷阅读区" data-slot="answer">
        {current ? <>
          <header className="tg-reader-head"><div className="tg-person"><Avatar size={32} alt="" src={avatarAssets[avatars[displayName(current)]!]} /><div><h2 ref={headingRef} tabIndex={-1}>{displayName(current)}<span>的作答</span></h2><p><span>2026010{current.id.split("-")[1]}</span><span className="tg-student-divider" aria-hidden="true" /><span>物理学 01 班</span></p></div></div><SystemStatusTag status={dirty ? "warning" : grades[current.id] ? "success" : "neutral"}>{dirty ? "草稿待保存" : grades[current.id] ? "已批改" : "待批改"}</SystemStatusTag></header>
          <div className="tg-reading-scroll" ref={readingRef}>
            <details className="tg-question" key={`${paper}-${current.question}`}><summary className="tg-question-title" data-focus="item" aria-label="展开或收起题目"><h3>第 {current.question} 题<span>{current.title}</span></h3><Tag color="neutral">简答题 · {current.maxScore} 分</Tag><ArrowDownIcon /></summary><p>{current.prompt}</p><details className="tg-reference-inline" key={current.question}><summary data-focus="item">查看参考答案<ArrowDownIcon /></summary><ol>{reference[current.question - 1]!.map(line => <li key={line}>{line}</li>)}</ol></details></details>
            <section className="tg-answer-area"><div className="tg-answer-label"><h3>学生作答</h3><span>09 月 15 日 20:36 提交</span></div>
              <article className="tg-paper" data-slot="student-answer">{current.text ? current.text.split("\n\n").map((paragraph, index) => <p key={index} className={index === 1 && marked[current.id] ? "tg-highlighted" : undefined}>{paragraph}</p>) : <Empty><EmptyTitle>该题未作答</EmptyTitle><EmptyDescription>可根据评分要求给分。</EmptyDescription></Empty>}</article>
              <div className="tg-answer-tools"><Button variant="text" leadingIcon={<EditorHighlightIcon />} disabled={!current.text || saving} aria-pressed={Boolean(marked[current.id])} onClick={() => setMarked(old => ({ ...old, [current.id]: !old[current.id] }))}>{marked[current.id] ? "取消重点标记" : "标记核心分析段"}</Button><span>仅教师可见</span></div>
            </section>
          </div>
          <footer className="tg-reader-footer"><span>{order === "question" ? `第 ${current.question} 题` : displayName(current)}<span className="tg-muted"> · </span>{position >= 0 ? `${position + 1} / ${sequence.length} ${order === "question" ? "份作答" : "题"}` : "当前作答已离开筛选结果"}</span><div><IconButton icon={<ArrowLeftIcon />} aria-label={`上一${unit}`} disabled={!previous || saving} onClick={() => choose(previous, true)} /><IconButton icon={<ArrowRightIcon />} aria-label={`下一${unit}`} disabled={!next || saving} onClick={() => choose(next, true)} /></div></footer>
        </> : <div className="tg-empty"><Empty><EmptyTitle>没有匹配的作答</EmptyTitle><EmptyDescription>调整搜索或状态筛选后继续批改。</EmptyDescription></Empty><Button onClick={() => scope(paper, "all", "")}>清空筛选</Button></div>}
      </section>
      <aside className="tg-inspector" aria-label="评分面板" data-slot="grading"><form onSubmit={event => void save(false, event)} aria-label="评分表单" aria-busy={saving}>
        <header className="tg-inspector-heading"><h2>评分与反馈</h2><span>{current ? `第 ${current.question} 题` : "未选择作答"}</span></header>
        <div className="tg-score-fixed">
          <section className="tg-score-section" data-slot="score-emphasis"><FormItem label="本题得分" required disabled={!current || saving} status={invalidScore ? "error" : "default"} message={invalidScore || undefined}><div className="tg-score-row"><Input className="tg-score-input" size={36} ref={scoreRef} aria-label="本题得分" appearance="outlined" clearable={false} inputMode="decimal" value={draft.score} onValueChange={score => changeDraft({ score })} placeholder="—" /><span>/ {current?.maxScore ?? "—"} 分</span></div></FormItem>
          <div className="tg-quick-scores" aria-label="快捷评分">{current && [0, current.maxScore * 0.6, current.maxScore * 0.8, current.maxScore].map(score => <Button key={score} localRecipe={quickScoreRecipe} size="small" variant={draft.score === String(score) ? "secondary" : "tertiary"} disabled={saving} aria-pressed={draft.score === String(score)} onClick={() => changeDraft({ score: String(score) })}>{score === current.maxScore ? "满分" : `${score} 分`}</Button>)}</div><div className="tg-score-help"><p className="tg-hint">支持 0.5 分步长</p><Popover.Root key={current?.id}><Popover.Trigger render={<Button variant="text" size="small" disabled={!current || saving}>评分细则</Button>} /><Popover.Content className="tg-criteria" positionerProps={{ align: "end" }}><Popover.Title>评分细则</Popover.Title><Popover.Description>第 {current?.question} 题 · 3 个得分点</Popover.Description>{current && reference[current.question - 1]!.map((text, index) => <div className="tg-criterion" key={text}><span>{index + 1}</span><p>{text}</p><strong>{current.maxScore * [0.4, 0.4, 0.2][index]!}<small> 分</small></strong></div>)}</Popover.Content></Popover.Root></div></section>
        </div><div className="tg-inspector-body">

          <section className="tg-feedback"><FormItem label="评语" disabled={!current || saving}><Textarea aria-label="评语" appearance="filled" rows={4} maxLength={1000} value={draft.comment} onValueChange={comment => changeDraft({ comment })} placeholder="指出亮点，给出具体的改进建议" /></FormItem><div className="tg-comment-count">{draft.comment.length} / 1000</div><details className="tg-comment-presets"><summary data-focus="item">添加常用评语<ArrowDownIcon /></summary><div className="tg-comments">{["思路清晰，分析完整", "请补充适用条件", "注意公式与单位"].map(comment => <Button variant="text" key={comment} leadingIcon={<AddIcon />} aria-label={`添加评语：${comment}`} disabled={!current || saving} onClick={() => changeDraft({ comment: `${draft.comment}${draft.comment ? "\n" : ""}${comment}。`.slice(0, 1000) })}>{comment}</Button>)}</div></details></section>
        </div>
        <footer className="tg-submit"><div className="tg-save-status" role="status"><SystemStatusTag status={error ? "error" : saving ? "processing" : dirty ? "warning" : current && grades[current.id] ? "success" : "neutral"}>{error ? "保存失败" : saving ? "正在保存" : dirty ? "草稿待保存" : current && grades[current.id] ? "已保存" : "尚未评分"}</SystemStatusTag><span>切换作答保留草稿</span></div>{error && <p ref={errorRef} tabIndex={-1} role="alert" className="tg-error">{error}</p>}<span className="sr-only" role="status">{notice}</span><div className="tg-submit-buttons"><Button type="submit" size="large" variant="tertiary" disabled={!current || saving}>保存</Button><Button size="large" variant="primary" trailingIcon={<ArrowRightIcon />} loading={saving} disabled={!current || saving} onClick={() => void save(true)}>{next ? `保存并下一${unit}` : "保存本题"}</Button></div></footer>
      </form></aside>
      </div>
    </div>;

  return <main className="tg" data-rain-id="teacher-grading-prototype" data-asset-identity="local-experiment" data-rain-theme="light" data-focus-mode={focusMode}>
    <Tabs.Root className="tg-paper-tabs" aria-label="选择试卷" size={32} appearance="line" panelMount="unmount" value={paper} onValueChange={v => { if (v === "A" || v === "B") scope(v, filter, query); }} items={[{ value: "A", label: "A 卷", disabled: saving, content: workspace }, { value: "B", label: "B 卷", disabled: saving, content: workspace }]}>
    <header className="tg-header" data-slot="taskbar">
      <div className="tg-header-left">
        <IconButton icon={<ArrowLeftIcon />} aria-label={showOverview ? "继续批改" : "返回作业概览"} disabled={saving} onClick={() => setShowOverview(!showOverview)} />
        <span className="tg-divider" />
        <div><h1>主观题批改<span className="tg-title-context">力学基础 · 第三次作业</span></h1><p className="tg-breadcrumb"><span className="tg-course"><CourseIcon />大学物理 A</span><span>物理学 01 班</span></p></div>
      </div>
      <div className="tg-paper-nav"><Tabs.Nav /></div>
      <div className="tg-header-right"><div className="tg-progress"><div className="tg-progress-label"><span>{paper} 卷批改进度</span><strong>{graded}<span> / {total}</span></strong></div><progress aria-label="本卷批改进度" value={graded} max={total} /></div>
        <Button variant="tertiary" size="mini" leadingIcon={<CollapseIcon />} aria-pressed={focusMode} onClick={() => setFocusMode(!focusMode)}>{focusMode ? "展开目录" : "专注阅卷"}</Button>
      </div>
    </header>
    <Tabs.Panels />
    </Tabs.Root>
    <footer className="tg-prototype-note"><span>交互原型 · 虚构数据 · 刷新后重置</span><details><summary data-focus="item">演示设置</summary><div className="tg-demo-panel"><Checkbox label="下次保存失败" disabled={saving} checked={failSave} onCheckedChange={setFailSave} /></div></details></footer>
  </main>;
}
