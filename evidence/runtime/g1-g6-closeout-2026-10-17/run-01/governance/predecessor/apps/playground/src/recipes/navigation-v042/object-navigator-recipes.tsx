import { useId, useState } from "react";
import { Avatar, avatarAssets, Button, FormItem, InputNumber, ObjectNavigator, Textarea, defineRainLocalRecipe } from "@rain-next/ui";
import { DataBar } from "@rain-next/ui/charts";
import { MINI_LAYOUT } from "../../docs/components/chart-business/mini-layout";
import { getProgressReading } from "../../docs/components/chart-business/mini-data";
import "@rain-next/ui/charts/styles.css";
import "./object-navigator-recipes.css";

export const objectNavigatorRecipe = defineRainLocalRecipe({
  id: "navigation-playground-object", scope: "feature", origin: "ui-object-navigator",
  classes: { root: "object-recipe__navigator" }, modifiedParts: ["root"],
  candidateTokens: [], promotionStatus: "not-proposed",
} as const);

const percent = new Intl.NumberFormat("zh-CN", { style: "percent", maximumFractionDigits: 1 });

/** Passive metadata: selection and business operations remain outside the chart. */
export function ActivityProgress({ label, completed, total, minutes }: { label: string; completed: number | null; total: number; minutes: number }) {
  const reading = getProgressReading(completed, total);
  const valid = reading.fraction !== null;
  const text = valid ? percent.format(reading.fraction!) : reading.percentText;
  return <span className="object-recipe__activity-meta">
    <span>{completed ?? "—"} / {total} 组完成 · {minutes} 分钟</span>
    <span className="rain-chart object-recipe__activity-progress" data-progress-state={reading.state}
      role={valid ? "progressbar" : undefined} aria-label={`${label}完成进度`}
      aria-valuemin={valid ? 0 : undefined} aria-valuemax={valid ? 100 : undefined}
      aria-valuenow={valid ? reading.fraction! * 100 : undefined} aria-valuetext={valid ? `${completed} / ${total} 组完成，${text}` : undefined}>
      {valid && <DataBar decorative label="完成组数" value={completed} maxValue={total}
        style={{ height: MINI_LAYOUT.compact.bar.thickness }} />}
      <span className="object-recipe__percent">{text}</span>
    </span>
  </span>;
}

export const classroomActivities = [
  { id: "debate", label: "辩论赛：大学校园是否应该免费开放", completed: 6, total: 8, minutes: 21, participants: 24 },
  { id: "presentation", label: "小组汇报：从概念到真实应用", completed: 8, total: 8, minutes: 36, participants: 32 },
  { id: "practice", label: "随堂练习：极限的直观理解", completed: 3, total: 8, minutes: 12, participants: 12 },
] as const;
export const classroomActivityItems = classroomActivities.map(activity => ({
  id: activity.id, label: activity.label, meta: <ActivityProgress {...activity} />,
}));

export const students = [
  { id: "s1", name: "李梦", number: "20263001", avatar: "student-01", score: 8.5, status: "已批阅", submitted: true },
  { id: "s2", name: "欧阳小明", number: "20263002", avatar: "student-02", score: 7, status: "待复核", submitted: true },
  { id: "s3", name: "林晓", number: "20263003", avatar: "student-03", score: null, status: "待批阅", submitted: true },
  { id: "s4", name: "顾晓梦", number: "20263004", avatar: "student-04", score: 9, status: "已批阅", submitted: true },
  { id: "s5", name: "陈一诺", number: "20263005", avatar: "student-05", score: null, status: "未提交", submitted: false },
] as const;
type GradingDraft = { score: number | null; note: string; saved: boolean };

function StudentQueueScene() {
  const [studentId, setStudentId] = useState("s2"), [marked, setMarked] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, GradingDraft>>({});
  const student = students.find(item => item.id === studentId)!;
  const key = `${student.id}/q3`;
  const initial: GradingDraft = { score: student.score, note: student.id === "s2" ? "请补充左右极限相等且等于函数值。" : "", saved: student.status === "已批阅" };
  const draft = drafts[key] ?? initial;
  const update = (patch: Partial<GradingDraft>) => setDrafts(previous => ({ ...previous, [key]: { ...(previous[key] ?? initial), ...patch } }));
  return <section className="object-recipe object-recipe__queue-scene" aria-label="学生批阅" data-rain-id="recipe-object-student-queue" data-asset-identity="local-experiment">
    <div className="object-recipe__student-rail"><div className="object-recipe__rail-title"><strong>学生</strong><span>{students.length} 人</span></div>
      <ObjectNavigator className={objectNavigatorRecipe.classes.root} appearance="queue" content="identity" aria-label="学生批阅队列" value={studentId} onValueChange={setStudentId}
        items={students.map(item => {
          const itemDraft = drafts[`${item.id}/q3`];
          const score = itemDraft ? itemDraft.score : item.score;
          const saved = itemDraft ? itemDraft.saved : item.status === "已批阅";
          return { id: item.id, label: item.name, description: item.number,
          icon: <Avatar src={avatarAssets[item.avatar]} alt="" size={32} />,
          status: <span className={saved && score !== null ? "object-recipe__reviewed" : "object-recipe__status"}>{!item.submitted ? "未提交" : score !== null ? `${score.toFixed(1)} 分` : "待批阅"}</span>,
          actions: <Button variant="text" size="compact" aria-label={`标记 ${item.name}`} aria-pressed={marked === item.id}
            onClick={() => setMarked(marked === item.id ? null : item.id)}>{marked === item.id ? "已标记" : "标记"}</Button>,
        }; })} />
    </div>
    <div className="object-recipe__student-detail"><header className="object-recipe__person"><Avatar src={avatarAssets[student.avatar]} alt="" size={40} /><div><h3>{student.name}</h3><span>{student.number}</span></div></header>
      <div className="object-recipe__answer"><h4>第 3 题 · 极限与连续</h4><p>说明函数在一点连续的条件。</p>
        <blockquote><span>学生答案</span><p>{student.submitted ? "函数在该点有定义，且左右极限都存在。" : "该学生尚未提交答案，可查看当前身份与批阅状态。"}</p></blockquote>
      </div>
      <form className="object-recipe__grading" onSubmit={event => { event.preventDefault(); if (student.submitted && event.currentTarget.checkValidity()) update({ saved: true }); }}>
        <div className="object-recipe__fields"><FormItem label="得分"><InputNumber min={0} max={10} precision={1} step={0.5} controls={false} required appearance="outlined" value={draft.score}
          disabled={!student.submitted} suffixText="/ 10" onValueChange={score => update({ score, saved: false })} /></FormItem>
          <FormItem label="批阅备注"><Textarea rows={2} value={draft.note} onValueChange={note => update({ note, saved: false })} /></FormItem></div>
        <footer><span role="status">{!student.submitted ? "未提交，暂不能评分" : draft.saved ? "评分已在本地保存" : "未保存"}</span><Button type="submit" variant="primary" size="small" disabled={!student.submitted || draft.score === null}>保存评分</Button></footer>
      </form>
    </div>
  </section>;
}

function ActivityCardsScene() {
  const [activityId, setActivityId] = useState("debate"), [resultsOpen, setResultsOpen] = useState(false);
  const activity = classroomActivities.find(item => item.id === activityId)!;
  const resultsId = useId();
  return <section className="object-recipe object-recipe__activities" aria-label="课堂活动" data-rain-id="recipe-object-activity-cards" data-asset-identity="local-experiment">
    <ObjectNavigator className={objectNavigatorRecipe.classes.root} appearance="cards" content="summary" aria-label="选择课堂活动" items={classroomActivityItems} value={activityId}
      onValueChange={id => { setActivityId(id); setResultsOpen(false); }} />
    <div className="object-recipe__activity-result"><div><h3>{activity.label}</h3><p>{activity.participants} 人参与 · {activity.completed} 组已完成</p></div>
      <Button variant="text" size="small" aria-expanded={resultsOpen} aria-controls={resultsId} onClick={() => setResultsOpen(!resultsOpen)}>{resultsOpen ? "收起小组结果" : "查看小组结果"}</Button>
      {resultsOpen && <ul id={resultsId} className="object-recipe__results">{Array.from({ length: activity.completed }, (_, index) => <li key={index}>第 {index + 1} 组<span>已完成{activity.id === "debate" ? "讨论" : activity.id === "presentation" ? "汇报" : "练习"}</span></li>)}</ul>}
    </div>
  </section>;
}

export const lecturePages = [
  { id: "p1", label: "课程导入", src: new URL("./assets/lecture-01.png", import.meta.url).href },
  { id: "p2", label: "极限的直观理解", src: new URL("./assets/lecture-02.png", import.meta.url).href },
  { id: "p3", label: "从数列变化理解趋近过程", src: new URL("./assets/lecture-03.png", import.meta.url).href },
  { id: "p4", label: "课堂小结", src: new URL("./assets/lecture-04.png", import.meta.url).href },
];

function LecturePreviewScene() {
  const [pageId, setPageId] = useState("p2");
  const current = lecturePages.find(item => item.id === pageId)!;
  const number = String(lecturePages.indexOf(current) + 1).padStart(2, "0");
  return <section className="object-recipe object-recipe__preview-scene" aria-label="讲稿预览" data-rain-id="recipe-object-lecture-preview" data-asset-identity="local-experiment">
    <ObjectNavigator className={objectNavigatorRecipe.classes.root} aria-label="讲稿页码导航" appearance="preview" content="preview" value={pageId} onValueChange={setPageId}
      items={lecturePages.map((item, index) => ({ id: item.id, label: item.label, description: `第 ${index + 1} 页`, preview: <img src={item.src} alt="" draggable={false} /> }))} />
    <figure className="object-recipe__current-slide"><img src={current.src} alt={`当前讲稿：${current.label}`} /><figcaption><strong>{current.label}</strong><span>{number} / 04</span></figcaption></figure>
  </section>;
}

export function ObjectNavigatorRecommendedScenes() {
  return <div className="object-recipe__examples">
    <div><header className="object-recipe__example-heading"><div><h2>学生批阅队列</h2><p>选择学生，查看答案并继续批阅。</p></div><a href="?sample=A2#navigation-v042">完整建设页 ↗</a></header><StudentQueueScene /></div>
    <div><header className="object-recipe__example-heading"><div><h2>课堂活动卡片</h2><p>以卡片选择活动，完成组数与结果保持对应。</p></div><a href="?sample=A5#navigation-v042">完整建设页 ↗</a></header><ActivityCardsScene /></div>
    <div><header className="object-recipe__example-heading"><div><h2>讲稿缩略导航</h2><p>选择讲稿页，在当前工作面继续阅读。</p></div><a href="?sample=Contents#navigation-v042">完整建设页 ↗</a></header><LecturePreviewScene /><p className="object-recipe__sample-note">本页为模拟学生、活动和合成讲稿；评分仅在当前演示中保存。</p></div>
  </div>;
}
