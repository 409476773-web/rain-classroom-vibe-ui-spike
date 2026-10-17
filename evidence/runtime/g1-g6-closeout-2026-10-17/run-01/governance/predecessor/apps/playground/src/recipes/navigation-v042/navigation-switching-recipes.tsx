import { useId, useLayoutEffect, useRef, useState } from "react";
import { Avatar, avatarAssets, Button, FormItem, Input, InputNumber, NavigationBar, NavigationTabs, ObjectNavigator, SegmentedControl, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableScrollArea, Textarea, defineRainLocalRecipe } from "@rain-next/ui";
import { CourseFilledIcon } from "@rain-next/ui/icons/course-filled";
import { FileIcon } from "@rain-next/ui/icons/file";
import { FileFormatPdfIcon } from "@rain-next/ui/icons/file-format-pdf";
import { ResourceIcon } from "@rain-next/ui/icons/resource";
import { ExamLibraryIcon } from "@rain-next/ui/icons/exam-library";
import { readDemoQuery } from "../../docs/components/g3-demo-location";
import { objectNavigatorRecipe, students } from "./object-navigator-recipes";
import "./navigation-switching-recipes.css";

export const navigationLineRecipe = defineRainLocalRecipe({
  id: "navigation-playground-line", scope: "feature", origin: "ui-navigation-tabs",
  classes: { root: "navigation-line-recipe" }, modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
} as const);
export const navigationSegmentRecipe = defineRainLocalRecipe({
  id: "navigation-playground-segment", scope: "feature", origin: "ui-segmented-control",
  classes: { root: "navigation-segment-recipe" }, modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
} as const);
const gradingStudents = students.slice(0, 3);
const questions = [
  { id: "q1", label: "第 1 题 · 函数的概念", prompt: "说明什么是函数，并举一个生活中的例子。" },
  { id: "q2", label: "第 2 题 · 定义域与值域", prompt: "求函数 y = x² 在区间 [−1, 2] 上的值域。" },
  { id: "q3", label: "第 3 题 · 极限与连续", prompt: "说明函数在一点连续的条件。" },
];
const submissions = gradingStudents.map((student, index) => ({ ...student, time: ["10-09 10:24", "10-09 10:28", "10-09 10:35"][index]!, reviewed: index === 0 }));
const exercisePanels = [{ value: "questions", label: "题目内容" }, { value: "submissions", label: "提交情况", count: submissions.length }, { value: "history", label: "批阅记录" }];

export function NavigationTabsRecommendedScene() {
  const [value, setValue] = useState<string | number | null>("submissions"), [notes, setNotes] = useState<Record<string, string>>({});
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null), previousValue = useRef<string | number | null | undefined>(undefined);
  const [marker, setMarker] = useState<{ x: number; y: number; animate: boolean } | null>(null);
  useLayoutEffect(() => {
    const element = root.current; if (!element) return;
    let alive = true;
    const viewport = element.querySelector<HTMLElement>(".rain-tabs__viewport"), list = element.querySelector<HTMLElement>(".rain-tabs__list");
    const measure = (animate = false) => {
      if (!alive) return;
      const label = element.querySelector<HTMLElement>('.rain-tabs__tab[aria-selected="true"]:not([hidden]) .rain-tabs__label');
      if (!label || !viewport) { setMarker(null); return; }
      const box = label.getBoundingClientRect(), frame = element.getBoundingClientRect(), clip = viewport.getBoundingClientRect();
      const center = box.left + box.width / 2;
      if (!box.width || !box.height || center < clip.left || center > clip.right) { setMarker(null); return; }
      const scaleX = frame.width / element.offsetWidth || 1, scaleY = frame.height / element.offsetHeight || 1;
      const x = (center - frame.left) / scaleX - 12, y = (box.bottom - frame.top) / scaleY - 3;
      setMarker(previous => previous && Math.abs(previous.x - x) < 0.25 && Math.abs(previous.y - y) < 0.25 ? previous : { x, y, animate });
    };
    measure(previousValue.current !== undefined && previousValue.current !== value);
    previousValue.current = value;
    const reposition = () => measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(reposition);
    observer?.observe(element); if (viewport) observer?.observe(viewport); if (list) observer?.observe(list);
    element.addEventListener("scroll", reposition, true);
    document.fonts?.ready.then(reposition); document.fonts?.addEventListener("loadingdone", reposition);
    return () => { alive = false; observer?.disconnect(); element.removeEventListener("scroll", reposition, true); document.fonts?.removeEventListener("loadingdone", reposition); };
  }, [value]);
  const selectedSubmission = submissions.find(item => item.id === submissionId);
  return <section className="switching-recipe switching-recipe__exercise" aria-label="第一章随堂练习" data-asset-identity="local-experiment"><header className="switching-recipe__heading"><div><p>高等数学 A · 2026 秋季学期</p><h3>第一章随堂练习</h3></div><a href="?sample=A1#navigation-v042">完整建设页 ↗</a></header>
    <div ref={root} className="switching-recipe__tabs" data-marker-ready={marker !== null}>
      <NavigationTabs className={navigationLineRecipe.classes.root} aria-label="练习内容面" value={value} onValueChange={setValue} activationMode="manual" panelMount="lazy-retain" overflow="scroll" items={exercisePanels.map(panel => ({ ...panel, content: <div className="switching-recipe__panel">
        {panel.value === "questions" ? <div className="switching-recipe__question"><h4>{questions[2]!.label}</h4><p>{questions[2]!.prompt}</p><p>满分 10 分。回答应说明函数值存在，极限存在，且极限等于该点的函数值。</p></div>
          : panel.value === "history" ? <ol className="switching-recipe__history"><li><strong>10-09 11:05</strong><p>林老师批阅了李梦的第 3 题。</p><span>评分 8.5 / 10 · 已在本地记录</span></li><li><strong>10-09 10:35</strong><p>全部 3 份提交已收齐。</p></li></ol>
            : <><div className="switching-recipe__submission-summary"><p>已提交 {submissions.length} 人 · 已批阅 {submissions.filter(item => item.reviewed).length} 人 · 待批阅 {submissions.filter(item => !item.reviewed).length} 人</p><Button variant="primary" size="small" onClick={() => { window.location.hash = "#segmented-control"; }}>开始批阅</Button></div>
              <TableScrollArea aria-label="浏览练习提交"><Table aria-label="练习提交情况" className="switching-recipe__submissions"><TableHeader><TableRow><TableHead>学生</TableHead><TableHead>学号</TableHead><TableHead>提交时间</TableHead><TableHead>批阅状态</TableHead><TableHead>操作</TableHead></TableRow></TableHeader><TableBody>{submissions.map(student => <TableRow key={student.id}><TableCell><span className="switching-recipe__student"><Avatar src={avatarAssets[student.avatar]} alt="" size={32} />{student.name}</span></TableCell><TableCell>{student.number}</TableCell><TableCell>{student.time}</TableCell><TableCell><span className={student.reviewed ? "switching-recipe__reviewed" : "switching-recipe__muted"}>{student.reviewed ? "已批阅" : "待批阅"}</span></TableCell><TableCell><Button variant="text" tone="brand" size="compact" aria-label={`查看${student.name}的提交`} onClick={() => setSubmissionId(student.id)}>查看提交</Button></TableCell></TableRow>)}</TableBody></Table></TableScrollArea>
              {selectedSubmission && <section className="switching-recipe__submission-detail" aria-label="提交详情"><h4>{selectedSubmission.name} · 第 3 题</h4><p>学生答案：函数在该点有定义，且左右极限都存在。</p><Button variant="tertiary" size="small" onClick={() => setSubmissionId(null)}>关闭提交详情</Button></section>}
              <footer className="switching-recipe__table-footer"><span>共 {submissions.length} 条提交</span><span>示例数据</span></footer></>}
        <FormItem label="内容面备注"><Textarea rows={2} value={notes[`exercise-1/${panel.value}`] ?? ""} placeholder="记录当前内容面的批阅要点" onValueChange={note => setNotes(previous => ({ ...previous, [`exercise-1/${panel.value}`]: note }))} /></FormItem>
      </div> }))} />
      {marker && <span className="switching-recipe__tab-marker" aria-hidden="true" data-move={marker.animate} style={{ top: marker.y, transform: `translateX(${marker.x}px)` }} />}
    </div>
  </section>;
}

const courseDestinations = [{ id: "overview", label: "课程总览", href: "#navigation-bar?view=overview" }, { id: "resources", label: "教学内容", href: "#navigation-bar?view=resources" }, { id: "report", label: "学习报告", href: "#navigation-bar?view=report" }];
const initialCourseResources = [
  { id: "lecture", title: "函数的定义与表示", kind: "讲义", detail: "PDF · 8 页", status: "已开放" },
  { id: "video", title: "极限的直观理解", kind: "视频", detail: "18 分钟", status: "已开放" },
  { id: "practice", title: "第一章随堂练习", kind: "练习", detail: "3 道题", status: "草稿" },
];
export function NavigationBarRecommendedScene() {
  const active = readDemoQuery("view", courseDestinations.map(item => item.id), "resources");
  const [resources, setResources] = useState(initialCourseResources), [newTitle, setNewTitle] = useState<string | null>(null);
  const icons = [<FileFormatPdfIcon size={24} />, <ResourceIcon size={24} />, <ExamLibraryIcon size={24} />];
  return <section className="switching-recipe switching-recipe__course" aria-label="课程目的地演示" data-asset-identity="local-experiment"><header className="switching-recipe__heading"><span className="switching-recipe__course-icon" aria-hidden="true"><CourseFilledIcon size={28} /></span><div><h3>高等数学 A</h3><p>2026 秋季学期</p></div><a href="#navigation-list?view=courses">返回我的课程</a></header>
    <NavigationBar className={navigationLineRecipe.classes.root} items={courseDestinations} activeId={active} aria-label="课程目的地" />
    <section className="switching-recipe__panel" aria-label="课程目的地内容"><div className="switching-recipe__path">高等数学 A / {courseDestinations.find(item => item.id === active)!.label}</div>
      <div className="switching-recipe__content-heading"><div><h3>{courseDestinations.find(item => item.id === active)!.label}</h3><p>{active === "resources" ? "组织课程资料，供各班教学使用。" : active === "overview" ? "函数、极限、微分与积分的入门课程。" : "本章资料的模拟学习情况。"}</p></div>{active === "resources" && <Button variant="primary" size="small" onClick={() => setNewTitle("")}>添加资料</Button>}</div>
      {active === "resources" ? <><h4 className="switching-recipe__chapter">第一章 · 函数、极限与连续<span>{resources.length} 项资料</span></h4><ul className="switching-recipe__resources" aria-label="课程教学资料">{resources.map((resource, index) => <li key={resource.id}><span className="switching-recipe__resource-icon" aria-hidden="true">{icons[index] ?? icons[0]}</span><div><strong>{resource.title}</strong><span>{resource.kind} · {resource.detail}</span></div><span className={resource.status === "草稿" ? "switching-recipe__muted" : "switching-recipe__reviewed"}>{resource.status}</span></li>)}</ul>
        {newTitle !== null && <form className="switching-recipe__add" onSubmit={event => { event.preventDefault(); const title = newTitle.trim(); if (!title) return; setResources(previous => [...previous, { id: `resource-${previous.length + 1}`, title, kind: "讲义", detail: "本地示例", status: "草稿" }]); setNewTitle(null); }}><FormItem label="新增资料名称"><Input required maxLength={80} autoComplete="off" value={newTitle} onValueChange={setNewTitle} /></FormItem><div><Button type="submit" variant="primary" size="small" disabled={!newTitle.trim()}>添加到课程</Button><Button type="button" variant="tertiary" size="small" onClick={() => setNewTitle(null)}>取消</Button></div></form>}</>
        : active === "overview" ? <div className="switching-recipe__overview"><h4>课程简介</h4><p>从函数的对应关系出发，理解变化率与累积量，并用数学语言描述简单实际问题。</p><h4>教学班概况</h4><ul><li>高等数学 1 班 <span>48 名学生</span></li><li>高等数学 2 班 <span>46 名学生</span></li><li>高等数学 3 班 <span>48 名学生</span></li></ul></div>
          : <ul className="switching-recipe__report" aria-label="资料学习情况">{resources.map((resource, index) => <li key={resource.id}><strong>{resource.title}</strong><span>{index < 2 ? `${[42, 31][index]} 人已查看` : index === 2 ? "3 份提交 · 1 份已批阅" : "暂无学习记录"}</span></li>)}</ul>}
    </section><footer className="switching-recipe__course-footer"><span>公共资源可供关联班级复用 · 仅本地演示</span><a href="?sample=A1#navigation-v042">完整建设页 ↗</a></footer>
  </section>;
}

type ScoreDraft = { score: number | null; note: string; saved: boolean };
export function SegmentedControlRecommendedScene() {
  const instance = useId(), [traversal, setTraversal] = useState("student"), [studentId, setStudentId] = useState("s2"), [questionId, setQuestionId] = useState("q3");
  const [drafts, setDrafts] = useState<Record<string, ScoreDraft>>({});
  const student = gradingStudents.find(item => item.id === studentId)!, question = questions.find(item => item.id === questionId)!;
  const key = `${studentId}/${questionId}`;
  const initial: ScoreDraft = { score: questionId === "q3" ? student.score : null, note: key === "s2/q3" ? "请补充左右极限相等且等于函数值。" : "", saved: false };
  const draft = drafts[key] ?? initial;
  const update = (patch: Partial<ScoreDraft>) => setDrafts(previous => ({ ...previous, [key]: { ...(previous[key] ?? initial), ...patch } }));
  const queue = traversal === "student" ? gradingStudents.map(item => {
    const savedDraft = drafts[`${item.id}/${questionId}`];
    const score = savedDraft ? savedDraft.score : questionId === "q3" ? item.score : null;
    return { id: item.id, label: item.name, description: item.number, icon: <Avatar src={avatarAssets[item.avatar]} alt="" size={32} />,
      status: <span>{score === null ? "待批阅" : `${score.toFixed(1)} 分`}</span> };
  }) : questions.map(item => ({ id: item.id, label: item.label, description: student.name, icon: <FileIcon size={20} /> }));
  return <section className="switching-recipe segmented-recipe" aria-label="批阅顺序演示" data-asset-identity="local-experiment"><form onReset={() => setTraversal("student")} onSubmit={event => { event.preventDefault(); if (event.currentTarget.checkValidity()) update({ saved: true }); }}>
    <header className="segmented-recipe__heading"><div><h3>{traversal === "student" ? "按人遍历" : "按题遍历"}</h3><p>第一章随堂练习</p></div><div className="segmented-recipe__axis" data-traversal={traversal}><SegmentedControl className={navigationSegmentRecipe.classes.root} legend="批阅顺序" name={`${instance}-traversal`} required options={[{ value: "student", label: "按人" }, { value: "question", label: "按题" }]} value={traversal} onValueChange={value => { if (value !== null) setTraversal(value); }} /></div><a href="?sample=A3#navigation-v042">完整建设页 ↗</a></header>
    <div className="object-recipe object-recipe__queue-scene segmented-recipe__work"><div className="object-recipe__student-rail"><div className="object-recipe__rail-title"><strong>{traversal === "student" ? "当前题目：" + question.label : "当前学生：" + student.name}</strong></div><ObjectNavigator className={objectNavigatorRecipe.classes.root} aria-label={traversal === "student" ? "按人批阅队列" : "按题批阅队列"} appearance="queue" content="identity" items={queue} value={traversal === "student" ? studentId : questionId} onValueChange={traversal === "student" ? setStudentId : setQuestionId} /></div>
      <div className="object-recipe__student-detail"><header className="object-recipe__person"><Avatar src={avatarAssets[student.avatar]} alt="" size={40} /><div><h3>{student.name}</h3><span>{student.number}</span></div></header><div className="object-recipe__answer"><h4>{question.label}</h4><p>{question.prompt}</p><blockquote><span>学生答案</span><p>{questionId === "q3" ? "函数在该点有定义，且左右极限都存在。" : questionId === "q1" ? "每一个自变量都有唯一的对应值。" : "当 x = 0，函数值为 0；当 x = 2，函数值为 4，所以值域为 [0, 4]。"}</p></blockquote></div>
        <div className="object-recipe__grading"><div className="object-recipe__fields"><FormItem label="得分"><InputNumber value={draft.score} min={0} max={10} precision={1} step={0.5} controls={false} required suffixText="/ 10" appearance="outlined" onValueChange={score => update({ score, saved: false })} /></FormItem><FormItem label="批阅备注"><Textarea rows={2} value={draft.note} onValueChange={note => update({ note, saved: false })} /></FormItem></div><footer><span role="status">{draft.saved ? "评分已在本地保存" : "草稿未保存"}</span><Button type="submit" variant="primary" size="small" disabled={draft.score === null}>保存评分</Button></footer></div>
      </div>
    </div>
  </form></section>;
}
