import { ListComposition, type Material } from "./list";

export const caseRecords: Material[] = [
  ["从‘不愿发言’到主动讨论：大班课堂中的提问与等待", "课堂实录", "大学物理"],
  ["项目式学习中的小组分工与过程评价", "教学设计", "工程设计导论"],
  ["一份可以用于课堂观察的学生参与度记录表", "评价工具", "教育研究方法"],
  ["用真实数据解释概念：一次统计学课堂的探究活动", "教学设计", "概率论与数理统计"],
  ["同伴互评怎样给出具体反馈", "课堂实录", "学术写作"],
  ["关于运动与受力的典型错误作答及讨论记录", "课堂实录", "大学物理"],
  ["课程项目成果展示评价量表", "评价工具", "工程设计导论"],
  ["让不同基础的学生都能参与的分层课堂任务：设计、实施与复盘", "教学设计", "大学物理"],
  ["课堂小测之后的反馈与二次学习", "课堂实录", "高等数学"],
  ["研究问题与证据之间的对应关系", "评价工具", "教育研究方法"],
  ["实验报告中的数据解释与证据表达", "教学设计", "大学物理实验"],
  ["结课展示中的自评与同伴反馈", "评价工具", "学术写作"],
].map(([name, kind, course], index) => ({ id: `case-${index + 1}`, name: name!, kind: kind!, course,
  status: index % 3 === 0 ? "draft" : "ready", updated: `2026-09-${String(16 - index).padStart(2, "0")}`, locked: index === 2 }));

export function ListCompositionPreview() {
  const transfer = new URLSearchParams(window.location.search).get("sample") === "cases";
  return <main className="list-study" data-rain-id="list-composition-pilot" data-rain-theme="light">
    <ListComposition key={transfer ? "cases" : "materials"} transfer={transfer} initialRecords={transfer ? caseRecords : undefined}
      title={transfer ? "教学案例资料库" : "课程资料库"} context={transfer ? "教学研讨课 · 2026 秋季" : "教学设计 · 2026 秋季"} />
    <nav className="lc-review-nav" aria-label="组合试验预览"><span>本地组合试验</span>
      <a href="/#list-composition" aria-current={!transfer ? "page" : undefined}>列表校准</a>
      <a href="/?sample=cases#list-composition" aria-current={transfer ? "page" : undefined}>迁移样例</a>
      <a href="/#bm-a">原 BM-A</a><a href="/#bm-d">教学报告</a>
    </nav>
  </main>;
}
