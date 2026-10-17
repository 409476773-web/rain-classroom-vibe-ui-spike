import { useState } from "react";
import { Button, Input, Tag, Tree, type TreeNodeRecord } from "@rain-next/ui";
import "./tree-page.css";
import { TreeBehaviorExamples } from "./tree-behavior-examples";

const basic: TreeNodeRecord[] = [
  { key: "chapter-1", title: "第一章　随机事件与概率", children: [
    { key: "section-1", title: "1.1　随机事件", children: [
      { key: "topic-1", title: "样本空间与随机事件" },
      { key: "topic-2", title: "事件之间的关系" },
    ] },
    { key: "section-2", title: "1.2　古典概型", children: [{ key: "topic-3", title: "概率的基本性质" }] },
  ] },
  { key: "chapter-2", title: "第二章　随机变量及其分布", children: [
    { key: "section-3", title: "2.1　离散型随机变量" },
  ] },
];
const checked: TreeNodeRecord[] = [
  { key: "course", title: "概率论与数理统计", children: [
    { key: "unit", title: "第一单元　随机事件", children: [
      { key: "video", title: "视频　生活中的随机现象" },
      { key: "quiz", title: "自测　认识样本空间" },
    ] },
    { key: "locked", title: "仅管理权限", checkDisabled: true, children: [{ key: "free", title: "学生可选任务" }] },
    { key: "hidden", title: "说明分组", checkable: false, children: [{ key: "free-2", title: "可参与讨论" }] },
  ] },
];
const rich: TreeNodeRecord[] = [
  { key: "rich-chapter", title: "第三章　离散型随机变量及其应用", description: "从生活中的随机现象出发，认识随机变量与分布规律。", children: [
    { key: "rich-section", title: "3.1　离散型随机变量", description: "从生活中的随机现象出发，讨论随机变量的定义与应用。", children: [
      { key: "rich-video", title: "离散型随机变量的定义与生活中的典型应用", description: "通过掷骰子的例子理解变量的可能取值。", meta: "已发布 · 12 分 30 秒", leading: <Tag color="purple" size={20}>视频</Tag> },
      { key: "rich-discuss", title: "寻找一个生活中的随机现象，说明随机变量的定义与取值范围", description: "结合观察，比较离散型与连续型随机变量。", meta: "进行中 · 28 人参与", leading: <Tag color="magenta" size={20}>讨论</Tag> },
    ] },
    { key: "rich-quiz", title: "分布律巩固练习", description: "完成 8 道题，检验本节学习成果。", meta: "未发布 · 共 8 题", leading: <Tag color="self-test" size={20}>自测</Tag> },
  ] },
];

export function TreePage() {
  const [query, setQuery] = useState("");
  const [showLine, setShowLine] = useState(true);
  const [density, setDensity] = useState<"compact" | "default">("compact");
  const [searchMode, setSearchMode] = useState<"filter" | "locate">("filter");
  return <main className="tree-page" data-asset-identity="local-candidate" data-rain-id="tree-page">
    <header className="tree-page__header"><a href="#components">返回 Components</a><h1 id="tree-title" tabIndex={-1}>Tree 树形组件</h1>
      <p>已审核的 A 版层级、浅关系线与独立交互，在真实组件中检验。</p></header>
    <div className="tree-page__controls">
      <Button variant="secondary" onClick={() => setShowLine(!showLine)}>{showLine ? "隐藏" : "显示"}关系线</Button>
      <Button variant="secondary" onClick={() => setDensity(density === "compact" ? "default" : "compact")}>{density === "compact" ? "标准" : "紧凑"}密度</Button>
      <Button variant="secondary" onClick={() => setSearchMode(searchMode === "filter" ? "locate" : "filter")}>{searchMode === "filter" ? "定位型" : "筛选型"}搜索</Button>
      <Input aria-label="搜索节点" value={query} onValueChange={setQuery} placeholder="搜索目录标题" />
    </div>
    <div className="tree-page__grid">
      <section className="tree-page__panel"><h2>01　细实线 · 深层目录</h2><p>整行选中、24px 缩进、叶子不留箭头空位</p>
        <Tree data={basic} showLine={showLine} density={density} defaultExpandedKeys={["chapter-1", "section-1", "section-2", "chapter-2"]} search={{ query, mode: searchMode }} />
      </section>
      <section className="tree-page__panel"><h2>02　浅点线 · 勾选树</h2><p>复选框与整行背景互不联动，受限节点的后代独立参与</p>
        <Tree data={checked} showLine={showLine} lineStyle="dotted" checkable density={density} defaultExpandedKeys={["course", "unit", "locked", "hidden"]} />
      </section>
      <section className="tree-page__panel tree-page__panel--wide"><h2>03　富内容 · 首行锚点</h2><p>说明信息后退，标题自然换行；空间不足时 Meta 下移</p>
        <Tree data={rich} variant="rich" showLine={showLine} defaultExpandedKeys={["rich-chapter", "rich-section"]} />
      </section>
    </div>
    <TreeBehaviorExamples />
    <a href="#manage-tree" className="tree-page__manage-link">查看 ManageTree 管理编辑 →</a>
  </main>;
}
