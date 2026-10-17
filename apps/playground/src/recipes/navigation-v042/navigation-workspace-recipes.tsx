import { useId, useState } from "react";
import { Avatar, Button, FormItem, IconButton, Input, NavigationList, Popover, Select, Textarea, Tree, defineRainLocalRecipe } from "@rain-next/ui";
import { PaneSplitter, RecoverableRegion, RegionRestoreTrigger, WorkspaceLayout, useWorkspaceLayout, type WorkspaceSpec } from "@rain-next/layouts";
import { HomeIcon } from "@rain-next/ui/icons/home";
import { CourseIcon } from "@rain-next/ui/icons/course";
import { CourseFilledIcon } from "@rain-next/ui/icons/course-filled";
import { FolderIcon } from "@rain-next/ui/icons/folder";
import { RainClassroomIcon } from "@rain-next/ui/icons/rain-classroom";
import { ExpandIcon } from "@rain-next/ui/icons/expand";
import { CollapseIcon } from "@rain-next/ui/icons/collapse";
import { CloseIcon } from "@rain-next/ui/icons/close";
import { readDemoQuery } from "../../docs/components/g3-demo-location";
import "./navigation-workspace-recipes.css";

export const navigationListRecipe = defineRainLocalRecipe({
  id: "navigation-playground-destinations", scope: "feature", origin: "ui-navigation-list",
  classes: { root: "navigation-list-recipe" }, modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
} as const);
const destinations = [
  { id: "overview", label: "工作台", href: "#navigation-list?view=overview", icon: <HomeIcon /> },
  { id: "courses", label: "我的课程", href: "#navigation-list?view=courses", icon: <CourseIcon /> },
  { id: "resources", label: "资源库", href: "#navigation-list?view=resources", icon: <FolderIcon /> },
];
const courses = [
  { name: "高等数学 A", classes: 3, resources: 48 }, { name: "线性代数", classes: 2, resources: 32 }, { name: "大学物理", classes: 4, resources: 56 },
];

export function NavigationListRecommendedScene() {
  const navigationId = useId(), [collapsed, setCollapsed] = useState(false);
  const active = readDemoQuery("view", destinations.map(item => item.id), "courses");
  return <section className="destination-recipe" aria-label="教师课程导航" data-asset-identity="local-experiment" data-collapsed={collapsed}>
    <aside className="destination-recipe__sidebar">
      <header><span className="destination-recipe__brand"><RainClassroomIcon size={22} /><strong>{collapsed ? <span className="sr-only">雨课堂</span> : "雨课堂"}</strong></span>
        <IconButton size="28/16" icon={collapsed ? <ExpandIcon /> : <CollapseIcon />} aria-label={collapsed ? "展开教学导航" : "收起教学导航"} aria-expanded={!collapsed} aria-controls={navigationId} onClick={() => setCollapsed(!collapsed)} />
      </header>
      <div id={navigationId} className="destination-recipe__links"><NavigationList className={navigationListRecipe.classes.root} appearance={collapsed ? "icons" : "inset"} items={destinations} activeId={active} aria-label="教师工作区目的地" /></div>
      <footer><Popover.Root><Popover.Trigger className="destination-recipe__account" aria-label="当前账户：林老师"><Avatar size={32} alt="" />{!collapsed && <span>林老师<small>教师工作区</small></span>}</Popover.Trigger><Popover.Content width={220}><strong>林老师</strong><p>教师工作区 · 仅本地演示</p></Popover.Content></Popover.Root></footer>
    </aside>
    <div className="destination-recipe__page"><header><div><h3>{destinations.find(item => item.id === active)!.label}</h3><p>2026 秋季学期 · {active === "courses" ? "3 门课程" : "教师工作区"}</p></div><a href="?sample=A2#navigation-v042">完整建设页 ↗</a></header>
      {active === "courses" ? <ul className="destination-recipe__courses" aria-label="本学期课程">{courses.map(course => <li key={course.name}><span aria-hidden="true"><CourseFilledIcon size={24} /></span><div><strong>{course.name}</strong><p>{course.classes} 个教学班 · <span>{course.resources} 项资料</span></p></div></li>)}</ul>
        : active === "overview" ? <div className="destination-recipe__summary"><h4>今天的教学安排</h4><p>09:00　高等数学 A · 函数与极限</p><p>14:00　线性代数 · 矩阵运算</p><h4>待处理</h4><p>第一章随堂练习 · 2 份待批阅</p></div>
          : <div className="destination-recipe__summary"><h4>公共教学资源</h4><ul><li>函数的定义与表示 <span>讲义 · PDF</span></li><li>极限的直观理解 <span>视频 · 18 分钟</span></li><li>第一章随堂练习 <span>练习 · 3 道题</span></li></ul><p>本地示例资料，可在课程资料工作台继续查看。</p></div>}
    </div>
  </section>;
}

const resources = [
  { id: "function", number: "1.1", title: "函数的定义与表示", pages: 8, note: "课堂上补充生活中的函数关系示例。" },
  { id: "limit", number: "1.2", title: "极限的直观理解", pages: 6, note: "" },
  { id: "operations", number: "1.3", title: "极限的基本运算", pages: 10, note: "" },
];
const scopes = [{ value: "public", label: "公共资源包" }, { value: "class-1", label: "高等数学 1 班" }, { value: "class-2", label: "高等数学 2 班" }];
type ResourceDraft = { title: string; note: string; scope: string; saved: boolean };
const workspaceSpec: WorkspaceSpec = {
  workspaceKey: "playground/navigation/course-resources", minMainWidth: 340, stableRestoreOwnerIds: ["course-toolbar"],
  regions: [
    { id: "directory", label: "课程目录", side: "start", allowedModes: ["expanded", "hidden"], minWidth: 180, defaultWidth: 220, maxWidth: 300, boundaryWidth: 5, adaptationPriority: 1, restoreOwnerId: "course-toolbar" },
    { id: "inspector", label: "资料属性", side: "end", allowedModes: ["expanded", "hidden"], minWidth: 180, defaultWidth: 220, maxWidth: 300, boundaryWidth: 5, adaptationPriority: 0, restoreOwnerId: "course-toolbar" },
  ],
};

function CourseToolbar() {
  const { state, effective, dispatch } = useWorkspaceLayout();
  return <div className="workspace-recipe__toolbar" data-restore-owner="course-toolbar"><strong>高等数学 A · 课程内容</strong><div><RegionRestoreTrigger regionId="directory">{state.session.temporary?.regionId === "directory" ? "关闭课程目录" : effective.regions.directory!.mode === "hidden" ? "显示课程目录" : "课程目录"}</RegionRestoreTrigger><RegionRestoreTrigger regionId="inspector">{state.session.temporary?.regionId === "inspector" ? "关闭资料属性" : effective.regions.inspector!.mode === "hidden" ? "显示资料属性" : "资料属性"}</RegionRestoreTrigger></div>
    <Button type="button" variant="tertiary" size="small" aria-pressed={state.session.focused} onClick={() => dispatch({ type: state.session.focused ? "EXIT_FOCUS" : "ENTER_FOCUS" })}>{state.session.focused ? "退出专注资料" : "专注资料"}</Button>
  </div>;
}

function ResourceRegionHeader({ regionId, title }: { regionId: string; title: string }) {
  const { state, effective, dispatch, viewportWidth } = useWorkspaceLayout();
  const temporary = state.session.temporary?.regionId === regionId;
  const pinned = !temporary && effective.regions[regionId]!.mode === "expanded" && state.session.pinnedBaseModes[regionId] !== undefined;
  return <header className="workspace-recipe__region-heading"><h3>{title}</h3>{temporary && <span>临时查看</span>}
    {temporary && <Button type="button" variant="text" size="compact" onClick={() => dispatch({ type: "PIN_TEMP", regionId, viewportWidth })}>固定{title}</Button>}
    {pinned && <Button type="button" variant="text" size="compact" onClick={() => dispatch({ type: "UNPIN", regionId, viewportWidth })}>取消固定{title}</Button>}
    <IconButton size="28/16" icon={temporary ? <CloseIcon /> : regionId === "directory" ? <CollapseIcon /> : <ExpandIcon />} aria-label={`${temporary ? "关闭临时" : "隐藏"}${title}`} onClick={() => dispatch(temporary ? { type: "DISMISS_TEMP", reason: "close" } : { type: "HIDE_REGION", regionId, viewportWidth })} />
  </header>;
}

function LectureExcerpt({ resourceId }: { resourceId: string }) {
  return <article className="workspace-recipe__lecture" aria-label="讲义内容示例"><p>高等数学 A</p><h4>{resourceId === "function" ? "1.1 函数的定义与表示" : resourceId === "limit" ? "1.2 极限的直观理解" : "1.3 极限的基本运算"}</h4>
    <h5>学习目标</h5><p>{resourceId === "function" ? "理解函数的概念，区分定义域与值域，并掌握常见表示方式。" : resourceId === "limit" ? "观察自变量趋近某一点时函数值的变化，区分极限与该点的函数值。" : "在两个极限都存在的前提下，运用和、差、积与商的运算法则。"}</p>
    {resourceId === "function" ? <><h5>例：用图像理解对应关系</h5><svg role="img" aria-label="函数 y = x + 1 的图像，直线通过零与一和负一与零" viewBox="0 0 420 240" className="workspace-recipe__graph">
      <path d="M60 175H390 M180 215V25" fill="none" stroke="currentColor" /><path d="M100 215V30 M260 215V30 M340 215V30 M60 95H380 M60 55H380" fill="none" stroke="var(--rain-category-border-neutral-3)" strokeDasharray="3 3" />
      <path d="M100 175L340 55" fill="none" stroke="var(--rain-category-fill-brand-solid-2)" strokeWidth="2" />
      <g fill="currentColor" fontSize="12"><text x="170" y="192">0</text><text x="94" y="192">−1</text><text x="256" y="192">1</text><text x="336" y="192">2</text><text x="164" y="138">1</text><text x="164" y="98">2</text><text x="390" y="179">x</text><text x="184" y="24">y</text><text x="285" y="49" fill="var(--rain-category-text-brand-1)">y = x + 1</text></g>
    </svg><p>每一个 x，都对应唯一的函数值。这里 x = 0 时，y = 1。</p></>
      : <div className="workspace-recipe__formula">{resourceId === "limit" ? <><strong>limₓ→₁ (x + 1) = 2</strong><p>当 x 从两侧趋近 1，函数值都趋近 2。</p></> : <><strong>lim(f + g) = lim f + lim g</strong><p>商的运算法则还要求分母的极限不为 0。</p></>}</div>}
  </article>;
}

export function WorkspaceRecommendedScene() {
  const instance = useId(), [resourceId, setResourceId] = useState("function"), [drafts, setDrafts] = useState<Record<string, ResourceDraft>>({});
  const resource = resources.find(item => item.id === resourceId)!;
  const initial: ResourceDraft = { title: resource.title, note: resource.note, scope: "public", saved: false };
  const draft = drafts[resourceId] ?? initial;
  const update = (patch: Partial<ResourceDraft>) => setDrafts(previous => ({ ...previous, [resourceId]: { ...(previous[resourceId] ?? initial), ...patch } }));
  const spec = { ...workspaceSpec, workspaceKey: `${workspaceSpec.workspaceKey}/${instance}` };
  return <section className="workspace-recipe" aria-label="课程资料编辑" data-asset-identity="local-experiment"><div className="workspace-recipe__entry"><span>目录、资料与属性，各得其所。</span><a href="?sample=R2#navigation-v042">完整建设页 ↗</a></div>
    <form onSubmit={event => { event.preventDefault(); if (event.currentTarget.checkValidity() && draft.title.trim()) update({ title: draft.title.trim(), saved: true }); }}>
      <WorkspaceLayout spec={spec} toolbar={<CourseToolbar />} className="workspace-recipe__layout">
        <RecoverableRegion regionId="directory" className="workspace-recipe__region" header={<ResourceRegionHeader regionId="directory" title="课程目录" />}>
          <Tree aria-label="高等数学课程目录" density="compact" selectionAppearance="inset" defaultExpandedKeys={["chapter-1"]} selectedKeys={[resourceId]} onSelectedKeysChange={keys => { const key = keys[0]; if (typeof key === "string" && resources.some(item => item.id === key)) setResourceId(key); }}
            data={[{ key: "chapter-1", title: "第一章 · 函数与极限", selectable: false, children: resources.map(item => ({ key: item.id, title: `${item.number} ${drafts[item.id]?.title ?? item.title}` })) }, { key: "chapter-2", title: "第二章 · 导数与微分", selectable: false, children: [{ key: "upcoming", title: "课程内容待完善", selectable: false }] }]} />
          <p className="workspace-recipe__directory-note"><FolderIcon size={16} />公共资源包 · 3 项资料</p>
        </RecoverableRegion>
        <PaneSplitter regionId="directory" />
        <section className="workspace-recipe__main" aria-label="当前资料"><div className="workspace-recipe__path">第一章 / {resource.number}</div><header><div><h3>{draft.title}</h3><p>讲义 · PDF · {resource.pages} 页</p></div><Button type="submit" variant="primary" size="small" disabled={!draft.title.trim()}>保存草稿</Button></header>
          <LectureExcerpt resourceId={resourceId} /><FormItem label="教学备注"><Textarea rows={2} value={draft.note} onValueChange={note => update({ note, saved: false })} /></FormItem><p role="status">{draft.saved ? "草稿已在本地保存" : "草稿未保存"}</p>
        </section>
        <PaneSplitter regionId="inspector" />
        <RecoverableRegion regionId="inspector" className="workspace-recipe__region" header={<ResourceRegionHeader regionId="inspector" title="资料属性" />}>
          <div className="workspace-recipe__properties"><FormItem label="资料名称"><Input value={draft.title} required maxLength={80} autoComplete="off" onValueChange={title => update({ title, saved: false })} /></FormItem>
            <dl><dt>所属章节</dt><dd>第一章 · 函数与极限</dd><dt>文件类型</dt><dd>PDF</dd><dt>页数</dt><dd>{resource.pages} 页</dd></dl>
            <FormItem label="使用范围"><Select value={draft.scope} options={scopes} onValueChange={scope => { if (typeof scope === "string") update({ scope, saved: false }); }} /></FormItem><dl><dt>负责人</dt><dd>林老师</dd></dl><p>示例数据 · 仅本地编辑</p>
          </div>
        </RecoverableRegion>
      </WorkspaceLayout>
    </form>
  </section>;
}
