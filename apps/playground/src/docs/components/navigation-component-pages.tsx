import { useId, useState, type ReactNode } from "react";
import {
  Button, Collapsible, CollapsibleTrigger, CollapsibleContent, NavigationBar, NavigationList, NavigationTabs, ObjectNavigator, ScopeNavigation, SegmentedControl,
  type NavigationContent, type ObjectNavigatorProps, type SegmentedControlProps,
} from "@rain-next/ui";
import {
  ConnectedSurface, WorkspaceLayout, RecoverableRegion, RegionRestoreTrigger, PaneSplitter, useWorkspaceLayout,
  type ConnectedSurfaceConnection, type ConnectedSurfaceMode, type WorkspaceSpec,
} from "@rain-next/layouts";
import { HomeIcon } from "@rain-next/ui/icons/home";
import { CourseFilledIcon } from "@rain-next/ui/icons/course-filled";
import { Settings3Icon } from "@rain-next/ui/icons/settings-3";
import { ComponentDoc, DocExample } from "./component-doc";
import { readDemoQuery } from "./g3-demo-location";
import { ObjectNavigatorRecommendedScenes } from "../../recipes/navigation-v042/object-navigator-recipes";
import { ScopeNavigationRecommendedScene, ConnectedSurfaceRecommendedScene } from "../../recipes/navigation-v042/scope-connected-recipes";
import { NavigationListRecommendedScene, WorkspaceRecommendedScene } from "../../recipes/navigation-v042/navigation-workspace-recipes";
import { NavigationTabsRecommendedScene, NavigationBarRecommendedScene, SegmentedControlRecommendedScene } from "../../recipes/navigation-v042/navigation-switching-recipes";
import "./navigation-doc-pages.css";

export type NavigationComponentId = "navigation-tabs" | "navigation-bar" | "scope-navigation" | "navigation-list" | "object-navigator" | "segmented-control" | "connected-surface" | "workspace";
type CollectionState = "normal" | "loading" | "error" | "empty" | "missing";
const collectionStates = [{ value: "normal", label: "正常" }, { value: "loading", label: "加载中" }, { value: "error", label: "加载失败" }, { value: "empty", label: "空集合" }, { value: "missing", label: "当前项已移除" }] as const;

function StateControl({ label, value, onChange, missing = true }: { label: string; value: CollectionState; onChange: (value: CollectionState) => void; missing?: boolean }) {
  return <label className="navigation-doc-control">{label}<select value={value} onChange={event => onChange(event.target.value as CollectionState)}>{collectionStates.filter(state => missing || state.value !== "missing").map(state => <option key={state.value} value={state.value}>{state.label}</option>)}</select></label>;
}

function NavigationTabsDemo() {
  const instance = useId(), [value, setValue] = useState<string | number | null>("materials"), [browser, setBrowser] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const labels = [{ value: "materials", label: "课程资料", count: 12 }, { value: "tasks", label: "课堂任务", count: 3 }, { value: "report", label: "学习报告", disabled: true, disabledReason: "报告尚未生成" }];
  return <div className="navigation-doc-stack">
    <Button variant="secondary" aria-pressed={browser} onClick={() => setBrowser(!browser)}>切换为{browser ? "下划线" : "连接工作面"}样式</Button>
    <NavigationTabs items={labels.map(item => ({ ...item, content: <div className="navigation-doc-panel"><h3>{item.label}</h3><label className="navigation-doc-stack">该内容面备注<textarea value={drafts[item.value] ?? ""} onChange={event => setDrafts(current => ({ ...current, [item.value]: event.target.value }))} placeholder="填写后切到另一页签，再返回" /></label></div> }))}
      value={value} onValueChange={setValue} aria-label="课程内内容面" visualPreset={browser ? "navigation-browser" : "navigation-line"}
      renderSurface={browser ? ({ track, panels }) => <ConnectedSurface instanceId={instance + "-tabs"} activeKey={value} track={track}>{panels}</ConnectedSurface> : undefined} />
    <p role="status">当前内容面：{value === "materials" ? "课程资料" : "课堂任务"}。备注按内容面 ID 由宿主保留。</p>
    <p>默认手动激活：左右方向键、Home / End 移动焦点，Enter / Space 激活。禁用项说明原因，每个页签都连接真实面板。</p>
  </div>;
}

function NavigationBarDemo() {
  const [active, setActive] = useState(() => readDemoQuery("view", ["overview", "resources", "report"], "overview"));
  const items = [{ id: "overview", label: "课程总览", href: "#navigation-bar?view=overview" }, { id: "resources", label: "教学资料", count: 12, href: "#navigation-bar?view=resources" }, { id: "report", label: "学习报告", href: "#navigation-bar?view=report" }];
  return <div className="navigation-doc-stack"><NavigationBar items={items} activeId={active} aria-label="课程页面" onNavigate={(id, event) => { event.preventDefault(); setActive(id); }} />
    <section className="navigation-doc-panel" aria-label="目的地内容"><h3>{items.find(item => item.id === active)?.label}</h3><p role="status">当前目的地：{active}</p><p>这里模拟应用路由，只响应普通主键点击；修饰键点击仍交给原生链接。</p></section>
  </div>;
}

const scopes = [{ id: "shared", label: "公共资源包", description: "全部班级共用" }, ...Array.from({ length: 6 }, (_, index) => ({ id: "class-" + (index + 1), label: "人工智能导论 " + (index + 1) + " 班", description: "班级编号 AI-2026-" + (index + 1), disabled: index === 5 }))];
function ScopeNavigationDemo() {
  const instance = useId(), [value, setValue] = useState<string | null>("shared"), [status, setStatus] = useState<CollectionState>("normal");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const current = status === "missing" ? "removed-class" : value, unavailable = status === "missing" || status === "empty";
  return <div className="navigation-doc-stack"><StateControl label="范围集合状态" value={status} onChange={setStatus} />
    <ScopeNavigation items={status === "empty" ? [] : scopes} value={current} onValueChange={next => { setValue(next); setStatus("normal"); }} visibleLimit={3} loading={status === "loading"} error={status === "error" ? "范围加载失败，请重试。" : undefined} aria-label="课程内容范围"
      renderSurface={({ track, panels }) => <ConnectedSurface instanceId={instance + "-scope"} track={track} activeKey={current}>{panels}</ConnectedSurface>}>
      <div className="navigation-doc-panel"><h3>{unavailable ? "请重新选择可用范围" : scopes.find(item => item.id === current)?.label}</h3><label className="navigation-doc-stack">范围备注<textarea disabled={unavailable || status === "loading"} value={unavailable ? "" : drafts[current ?? "none"] ?? ""} onChange={event => setDrafts(previous => ({ ...previous, [current ?? "none"]: event.target.value }))} placeholder="先填写，再切换范围" /></label><p>这份草稿归当前范围 ID 所有；选择范围不执行保存、同步或发布。</p></div>
    </ScopeNavigation>
    <p>公共资源包保持首位；更多班级检索全部范围。选择溢出班级后，它进入最后一个可见槽，焦点归还当前范围。</p>
  </div>;
}

const destinationItems = [
  { id: "overview", label: "教学总览", href: "#navigation-list?view=overview", icon: <HomeIcon aria-hidden="true" />, group: "工作区" },
  { id: "courses", label: "我的课程", href: "#navigation-list?view=courses", icon: <CourseFilledIcon aria-hidden="true" />, count: 6, group: "工作区" },
  { id: "settings", label: "工作台设置", href: "#navigation-list?view=settings", icon: <Settings3Icon aria-hidden="true" />, group: "工具", disabled: true },
];
function NavigationListDemo() {
  const [active, setActive] = useState(() => readDemoQuery("view", ["overview", "courses", "settings"], "overview")), [icons, setIcons] = useState(false), [status, setStatus] = useState<CollectionState>("normal");
  return <div className="navigation-doc-stack"><div className="navigation-doc-row"><Button variant="secondary" aria-pressed={icons} onClick={() => setIcons(!icons)}>切换{icons ? "文字导航" : "图标轨道"}</Button><StateControl label="导航集合状态" value={status} onChange={setStatus} missing={false} /></div>
    <div className="navigation-doc-destinations"><NavigationList items={status === "empty" ? [] : destinationItems} activeId={active} appearance={icons ? "icons" : "inset"} aria-label="教学工作区目的地" loading={status === "loading"} error={status === "error" ? "导航加载失败" : undefined} onNavigate={(id, event) => { event.preventDefault(); setActive(id); }} />
      <section className="navigation-doc-panel" aria-label="目的地内容"><h3>{destinationItems.find(item => item.id === active)?.label}</h3><p role="status">当前页面：{active}</p><p>设置目的地被禁用，仍保留明确名称。图标轨道保持完整可访问标签与焦点提示。</p></section>
    </div>
  </div>;
}

function ObjectNavigatorDemo() {
  const [value, setValue] = useState<string | null>("student-1"), [appearance, setAppearance] = useState<NonNullable<ObjectNavigatorProps["appearance"]>>("queue"), [content, setContent] = useState<NavigationContent>("identity"), [status, setStatus] = useState<CollectionState>("normal"), [flagged, setFlagged] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const current = status === "missing" ? "removed-student" : value, unavailable = status === "missing" || status === "empty";
  const items = [{ id: "student-1", label: "林晓", description: "20260001 · 第一题", meta: "已提交 · 10:30", status: "待批阅", progress: 50 }, { id: "student-2", label: "周雨", description: "20260002 · 第一题", meta: "已提交 · 10:42", status: "已批阅", progress: 100 }, { id: "student-3", label: "陈旭", description: "20260003 · 第一题", meta: "未提交", status: "不可批阅", disabled: true }];
  return <div className="navigation-doc-stack"><div className="navigation-doc-row">
    <label className="navigation-doc-control">对象形态<select value={appearance} onChange={event => setAppearance(event.target.value as NonNullable<ObjectNavigatorProps["appearance"]>)}><option value="queue">队列</option><option value="cards">卡片</option><option value="preview">缩略预览</option></select></label>
    <label className="navigation-doc-control">内容模板<select value={content} onChange={event => setContent(event.target.value as NavigationContent)}>{(["simple", "info", "identity", "summary", "preview"] as const).map(item => <option key={item}>{item}</option>)}</select></label>
    <StateControl label="对象集合状态" value={status} onChange={setStatus} />
  </div><div className="navigation-doc-object-frame"><ObjectNavigator items={status === "empty" ? [] : items.map(item => ({ ...item, preview: <span className="navigation-doc-thumbnail">第一题<br />答案预览</span>, actions: <Button variant="text" size="compact" disabled={item.disabled || status === "loading"} aria-label={"标记 " + item.label} onClick={() => setFlagged(item.id)}>标记</Button> }))} value={current} onValueChange={next => { setValue(next); setStatus("normal"); }} appearance={appearance} content={content} aria-label="待批阅学生" loading={status === "loading"} error={status === "error" ? "学生列表加载失败" : undefined} />
    <section className="navigation-doc-panel" aria-label="当前对象"><h3>{unavailable ? "请重新选择可用学生" : items.find(item => item.id === current)?.label + "的批阅备注"}</h3><label className="navigation-doc-stack">当前学生备注<textarea disabled={unavailable || status === "loading"} value={unavailable ? "" : notes[current ?? "none"] ?? ""} onChange={event => setNotes(previous => ({ ...previous, [current ?? "none"]: event.target.value }))} placeholder="按稳定学生 ID 保留" /></label><p role="status">已标记：{items.find(item => item.id === flagged)?.label ?? "无"}。标记按钮不会改变当前对象。</p></section>
  </div><p>主体按钮选择对象，尾部操作是独立兄弟控件。数据身份、备注与操作结果属于宿主；移除当前项时显示提示，组件不悄悄选择其他对象。</p></div>;
}

function SegmentedControlDemo() {
  const [value, setValue] = useState<string | null>("student"), [appearance, setAppearance] = useState<NonNullable<SegmentedControlProps["appearance"]>>("segmented"), [submitted, setSubmitted] = useState("尚未读取");
  const options = [{ value: "student", label: "按人", count: 24 }, { value: "question", label: "按题", count: 6 }, { value: "automatic", label: "自动批阅", disabled: true }];
  return <div className="navigation-doc-stack"><label className="navigation-doc-control">外观<select value={appearance} onChange={event => setAppearance(event.target.value as NonNullable<SegmentedControlProps["appearance"]>)}><option value="segmented">分段浅底</option><option value="white-line">白底下划线</option><option value="white-soft">白底浅填充</option></select></label>
    <SegmentedControl legend="批阅顺序" options={options} value={value} onValueChange={setValue} appearance={appearance} />
    <p role="status">按{value === "student" ? "学生" : "题目"}遍历。已有成绩与草稿归学生 ID + 题目 ID 所有，切换顺序不重新分配数据。</p>
    <form onSubmit={event => { event.preventDefault(); setSubmitted(String(new FormData(event.currentTarget).get("traversal") ?? "无")); }} className="navigation-doc-stack">
      <SegmentedControl legend="表单批阅顺序" options={options.slice(0, 2)} defaultValue="student" name="traversal" />
      <div className="navigation-doc-row"><Button type="submit" variant="secondary">读取表单值</Button><Button type="reset" variant="text">重置表单</Button></div><p role="status">表单值：{submitted}</p>
    </form><p>少量互斥条件复用原生 RadioGroup；没有关联内容面时，不使用空页签。可用左右方向键切换。</p>
  </div>;
}

function ConnectedSurfaceDemo() {
  const instance = useId(), [connection, setConnection] = useState<ConnectedSurfaceConnection>("inset"), [mode, setMode] = useState<ConnectedSurfaceMode>("tonal"), [value, setValue] = useState<string | number | null>("a"), [narrow, setNarrow] = useState(false);
  return <div className="navigation-doc-stack"><div className="navigation-doc-row">
    <label className="navigation-doc-control">连接方式<select value={connection} onChange={event => setConnection(event.target.value as ConnectedSurfaceConnection)}><option value="inset">inset 安全内衬</option><option value="merged">merged 贴边连接</option></select></label>
    <label className="navigation-doc-control">表面<select value={mode} onChange={event => setMode(event.target.value as ConnectedSurfaceMode)}>{(["tonal", "plain", "outlined"] as const).map(item => <option key={item}>{item}</option>)}</select></label>
    <Button variant="secondary" aria-pressed={narrow} onClick={() => setNarrow(!narrow)}>切换{narrow ? "宽容器" : "窄容器"}</Button>
  </div><div style={{ width: narrow ? "min(340px, 100%)" : "100%" }}>
    <NavigationTabs items={[{ value: "a", label: "课程资料", content: <div className="navigation-doc-panel">当前资料的实际内容面</div> }, { value: "b", label: "随堂任务与课堂讨论", content: <div className="navigation-doc-panel">当前任务的实际内容面</div> }, { value: "c", label: "学习报告", content: <div className="navigation-doc-panel">当前报告的实际内容面</div> }]} value={value} onValueChange={setValue} aria-label="连接工作面的内容" visualPreset="navigation-browser" renderSurface={({ track, panels }) => <ConnectedSurface instanceId={instance + "-surface"} connection={connection} surfaceMode={mode} activeKey={value} track={track}>{panels}</ConnectedSurface>} />
  </div><p>切换、缩窄或滚动轨道时，实例重新测量。布局只绘制一条联合轮廓，语义页签、焦点与内容仍由 NavigationTabs 和宿主拥有。</p></div>;
}

const workspaceSpec: WorkspaceSpec = {
  workspaceKey: "playground/components/workspace/recovery-demo", minMainWidth: 260, stableRestoreOwnerIds: ["demo-toolbar"],
  regions: [{ id: "directory", label: "课程目录", side: "start", allowedModes: ["expanded", "hidden"], minWidth: 150, defaultWidth: 180, maxWidth: 260, boundaryWidth: 5, adaptationPriority: 1, restoreOwnerId: "demo-toolbar" },
    { id: "inspector", label: "资料属性", side: "end", allowedModes: ["expanded", "hidden"], minWidth: 150, defaultWidth: 180, maxWidth: 260, boundaryWidth: 5, adaptationPriority: 0, restoreOwnerId: "demo-toolbar" }],
};
function WorkspaceToolbar() {
  const { state, dispatch } = useWorkspaceLayout();
  return <div className="navigation-doc-workspace-toolbar" data-restore-owner="demo-toolbar"><RegionRestoreTrigger regionId="directory" /><RegionRestoreTrigger regionId="inspector" /><Button size="small" variant="text" aria-pressed={state.session.focused} onClick={() => dispatch({ type: state.session.focused ? "EXIT_FOCUS" : "ENTER_FOCUS" })}>{state.session.focused ? "退出专注" : "专注主内容"}</Button></div>;
}
function WorkspaceRegionActions({ regionId }: { regionId: string }) {
  const { state, dispatch, viewportWidth } = useWorkspaceLayout();
  const temporary = state.session.temporary?.regionId === regionId, pinned = state.session.pinnedBaseModes[regionId] !== undefined;
  return <div className="navigation-doc-row"><Button variant="text" size="compact" onClick={() => dispatch({ type: "HIDE_REGION", regionId, viewportWidth })}>隐藏面板</Button>
    {temporary && <Button variant="secondary" size="mini" onClick={() => dispatch({ type: "PIN_TEMP", regionId, viewportWidth })}>固定面板</Button>}
    {pinned && <Button variant="text" size="compact" onClick={() => dispatch({ type: "UNPIN", regionId, viewportWidth })}>取消固定</Button>}
  </div>;
}
function WorkspaceModeStatus() {
  const { state, effective } = useWorkspaceLayout();
  return <p role="status" className="navigation-doc-workspace-status">目录：{effective.regions.directory?.mode}；属性：{effective.regions.inspector?.mode}；临时面板：{state.session.temporary?.regionId ?? "无"}；{state.session.focused ? "专注模式" : "普通模式"}。</p>;
}
function WorkspacePeekButtons() {
  const { dispatch, viewportWidth, effective } = useWorkspaceLayout();
  return <div className="navigation-doc-row"><Button variant="secondary" size="small" disabled={effective.regions.directory?.mode === "expanded"} onClick={() => dispatch({ type: "PEEK_REGION", regionId: "directory", viewportWidth })}>临时查看目录</Button><Button variant="secondary" size="small" disabled={effective.regions.inspector?.mode === "expanded"} onClick={() => dispatch({ type: "PEEK_REGION", regionId: "inspector", viewportWidth })}>临时查看属性</Button></div>;
}
function WorkspaceDemo() {
  const instance = useId(), [narrow, setNarrow] = useState(false), [chapter, setChapter] = useState(() => Number(readDemoQuery("chapter", Array.from({ length: 12 }, (_, index) => String(index + 1)), "1"))), [drafts, setDrafts] = useState<Record<number, string>>({});
  const spec = { ...workspaceSpec, workspaceKey: workspaceSpec.workspaceKey + "/" + instance };
  return <div className="navigation-doc-stack"><Button variant="secondary" aria-pressed={narrow} onClick={() => setNarrow(!narrow)}>切换{narrow ? "宽容器" : "窄容器"}</Button>
    <div className="navigation-doc-workspace-frame" style={{ width: narrow ? "min(460px, 100%)" : "100%" }}>
      <WorkspaceLayout spec={spec} toolbar={<WorkspaceToolbar />} className="navigation-doc-workspace">
        <RecoverableRegion regionId="directory" className="navigation-doc-workspace-region"><h3>课程目录</h3><WorkspaceRegionActions regionId="directory" /><div className="navigation-doc-stack">{Array.from({ length: 12 }, (_, index) => <a key={index} href={"#workspace?chapter=" + (index + 1)} aria-current={chapter === index + 1 ? "page" : undefined} onClick={event => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); setChapter(index + 1); } }}>第 {index + 1} 讲 · 课程材料</a>)}</div></RecoverableRegion>
        <PaneSplitter regionId="directory" />
        <section className="navigation-doc-workspace-main" aria-label="主内容"><h3>第 {chapter} 讲 · 课程材料</h3><WorkspacePeekButtons /><label className="navigation-doc-stack">宿主草稿<textarea value={drafts[chapter] ?? ""} onChange={event => setDrafts(current => ({ ...current, [chapter]: event.target.value }))} placeholder="按章节 ID 保留；隐藏、暂看或专注均不清空" /></label><WorkspaceModeStatus /></section>
        <PaneSplitter regionId="inspector" /><RecoverableRegion regionId="inspector" className="navigation-doc-workspace-region"><h3>资料属性</h3><WorkspaceRegionActions regionId="inspector" /><p>课程负责人：林老师</p><p>阅读范围：公共资源包</p><label className="navigation-doc-stack">临时属性备注<textarea defaultValue="属性面板自身内容保持挂载。" /></label></RecoverableRegion>
      </WorkspaceLayout>
    </div>
    <p>隐藏后使用始终可达的顶部入口恢复或临时查看；临时面板不挤动主内容，可固定或通过 Escape/外点关闭。拖边界，或聚焦分隔条使用左右键调宽、Enter 隐藏；专注退出还原原布局。容器变窄时派生有效布局，保留展开偏好与草稿。</p>
  </div>;
}

type NavigationDoc = { title: string; description: string; category: string; status: string; use: string; avoid: string; parts: string; source: string; props: { name: string; type: string; default?: string; description: string }[]; code: string; Demo: () => ReactNode };
const navigationDocs: Record<NavigationComponentId, NavigationDoc> = {
  "navigation-tabs": { title: "NavigationTabs 导航页签", description: "对象内部的内容面切换，复用 Tabs 选择、键盘与面板生命周期，并显式选择导航外观。", category: "UI · 导航", status: "共享候选 · A1/A4/R2 局部视觉已确认 · 未发布", use: "同一个对象或范围内切换真实内容面；需要下划线或连接工作面。", avoid: "页面目的地用 NavigationBar；少量互斥设置用 SegmentedControl；不提供空面板。", parts: "完整 NavigationTabs，或 Root / Nav / Panels；renderSurface({track,panels}) 可注入 ConnectedSurface。", source: "packages/ui/src/navigation/navigation.tsx", props: [
    { name: "items", type: "readonly TabsItem[]", description: "value 稳定，label 纯文本，content 是真实面板；可选 count、description、disabledReason。" },
    { name: "value / onValueChange", type: "string | number | null / (value, details) => void", description: "受控协议沿用 Tabs；支持 defaultValue 的非受控实例。" },
    { name: "visualPreset", type: "navigation-line | navigation-browser", default: "navigation-line", description: "只支持 top；browser 默认 scroll。" },
    { name: "panelMount", type: "lazy-retain | eager-retain | unmount", default: "lazy-retain", description: "面板生命周期来自 Tabs；业务草稿仍应有明确宿主 owner。" },
    { name: "renderSurface", type: "({track, panels}) => ReactNode", description: "UI 保持不依赖 Layout；由消费层组合连接工作面。" },
  ], code: '<NavigationTabs items={[\n  { value: "resources", label: "资料", content: <ResourcePanel /> },\n  { value: "tasks", label: "任务", content: <TaskPanel /> },\n]} value={value} onValueChange={setValue} aria-label="课程内内容"\n  visualPreset="navigation-line" />', Demo: NavigationTabsDemo },
  "navigation-bar": { title: "NavigationBar 横向导航", description: "页面目的地使用原生链接与 aria-current，让路由语义和导航外观同时清楚。", category: "UI · 导航", status: "共享候选 · A1 局部视觉已确认 · 未发布", use: "横向排列少量真实页面目的地。", avoid: "对象内内容面使用 NavigationTabs；无内容面的互斥设置使用 SegmentedControl。", parts: "nav → destination links；可选图标与被动计数。", source: "packages/ui/src/navigation/navigation.tsx", props: [
    { name: "items", type: "readonly NavigationBarItem[]", description: "每项 id、label、href 必填；可选 icon、count。" },
    { name: "activeId", type: "string | null", description: "当前目的地由应用路由决定。" },
    { name: "aria-label", type: "string", description: "必填，区分当前导航范围。" },
    { name: "onNavigate", type: "(id, MouseEvent<HTMLAnchorElement>) => void", description: "普通主键点击时交给路由适配；修饰键与新页行为保留原生语义。" },
  ], code: '<NavigationBar items={[\n  { id: "overview", label: "课程总览", href: "/course/overview" },\n  { id: "resources", label: "教学资料", href: "/course/resources", count: 12 },\n]} activeId={routeId} aria-label="课程页面"\n  onNavigate={(id, event) => { event.preventDefault(); navigate(id); }} />', Demo: NavigationBarDemo },
  "scope-navigation": { title: "ScopeNavigation 范围导航", description: "固定公共资源入口，并通过可见槽与完整搜索选择课程范围。", category: "UI · 导航", status: "共享候选 · A4/R2 局部视觉已确认 · 未发布", use: "公共资源包与多个班级范围，需要更多范围搜索和当前项稳定可见。", avoid: "不负责保存、同步、发布或业务身份服务；不要按标签或数组下标保存草稿。", parts: "Root → navigation track + More Popover/search/results + sharedContent panels；renderSurface 可提供联合工作面。", source: "packages/ui/src/navigation/navigation.tsx", props: [
    { name: "items", type: "readonly ScopeNavigationItem[]", description: "首项必须是公共资源范围；每项 id、label 必填，可带 description、icon、disabled。" },
    { name: "value / onValueChange", type: "string | null / (id) => void", description: "范围选择请求由宿主接受；当前项不存在时提示，不自动换范围。" },
    { name: "visibleLimit", type: "3 | 4 | 5", default: "4", description: "受真实宽度预算限制，当前溢出项替换最后可见槽。" },
    { name: "loading / error", type: "boolean / string", description: "宿主提供状态；组件不取数。" },
    { name: "children / renderSurface", type: "ReactNode / renderer", description: "共享编辑器内容保持实例；可组合 ConnectedSurface。" },
  ], code: '<ScopeNavigation items={scopes} value={scopeId} onValueChange={setScopeId}\n  visibleLimit={3} aria-label="课程内容范围"\n  renderSurface={({ track, panels }) => <ConnectedSurface\n    instanceId="course-resources" activeKey={scopeId} track={track}>\n    {panels}\n  </ConnectedSurface>}>\n  <ScopeEditor scopeId={scopeId} drafts={draftsByScopeId} />\n</ScopeNavigation>', Demo: ScopeNavigationDemo },
  "navigation-list": { title: "NavigationList 纵向导航", description: "用具名原生链接组织功能目的地，支持文本列表与图标轨道。", category: "UI · 导航", status: "共享候选 · W3–W5 局部视觉已确认 · 未发布", use: "纵向工作区或功能目的地，当前项由路由决定。", avoid: "选择当前业务对象用 ObjectNavigator；图标轨道不能缺少可辨认图标和完整名称。", parts: "root / track / item / entry / leading / content / label / description / metadata / count / status / progress / trailing-action。", source: "packages/ui/src/navigation/navigation-families.tsx", props: [
    { name: "items", type: "readonly NavigationListItem[]", description: "id、label、href 必填；group 分组；icon/meta/status 是被动槽，actions 是独立操作。" },
    { name: "activeId / onNavigate", type: "string | null / (id, event) => void", description: "保持原生目的地与修饰键；onNavigate 可适配应用路由。" },
    { name: "appearance", type: "inset | icons", default: "inset", description: "icons 要求每项具备图标；完整名称保留在可访问标签和提示中。" },
    { name: "aria-label / loading / error / emptyLabel", type: "string / boolean / string / string", description: "名称必填，集合反馈由宿主传入。" },
  ], code: '<NavigationList items={[\n  { id: "courses", label: "我的课程", href: "/courses", icon: <CourseFilledIcon /> },\n  { id: "settings", label: "设置", href: "/settings", icon: <Settings3Icon />, disabled: true },\n]} activeId={routeId} aria-label="工作区目的地" appearance="inset"\n  onNavigate={(id, event) => { event.preventDefault(); navigate(id); }} />', Demo: NavigationListDemo },
  "object-navigator": { title: "ObjectNavigator 对象导航", description: "在集合中选择当前业务对象，主体选择与尾部操作保持独立。", category: "UI · 导航", status: "共享候选 · W3–W5/E1–E6 局部审阅已确认 · 未发布", use: "学生、题目、资料等队列或卡片的当前对象选择。", avoid: "不是页面路由或带交互后代的 listbox；不要在被动 metadata/status/preview 槽里塞按钮。", parts: "group → list/item → entry button + sibling actions；content 为统一模板；业务详情由宿主接续。", source: "packages/ui/src/navigation/navigation-families.tsx", props: [
    { name: "items", type: "readonly NavigationContentItem[]", description: "稳定 id 与纯文本 label；可选 description、meta、status、preview、progress(0–100)、disabled、actions。" },
    { name: "value / onValueChange", type: "string | null / (id) => void", description: "必须受控；未找到当前项时提示，不自动选择替代对象。" },
    { name: "appearance", type: "queue | cards | preview", default: "cards", description: "集合容器的形态，不改变对象身份。" },
    { name: "content", type: "simple | info | identity | summary | preview", default: "由 appearance 决定", description: "queue 默认 identity、preview 默认 preview、cards 默认 summary。" },
    { name: "loading / error / emptyLabel", type: "boolean / string / string", description: "显式反馈由宿主提供，加载中禁止对象选择。" },
  ], code: '<ObjectNavigator aria-label="待批阅学生" items={students.map(student => ({\n  id: student.id, label: student.name, description: student.number,\n  status: student.status, actions: <Button onClick={() => flag(student.id)}>标记</Button>,\n}))} value={studentId} onValueChange={setStudentId}\n  appearance="queue" content="identity" />', Demo: ObjectNavigatorDemo },
  "segmented-control": { title: "SegmentedControl 分段条件", description: "少量互斥条件以原生 RadioGroup 表达，支持键盘、表单提交和重置。", category: "UI · 导航", status: "共享候选 · W3–W5 局部视觉已确认 · 未发布", use: "按人/按题、显示方式等设置，切换不承诺关联内容面。", avoid: "目的地使用链接；带真实内容面使用 NavigationTabs；不得因切换遍历顺序重新分配成绩或草稿。", parts: "root → RadioGroup → native radio + passive icon/label/count；legend 必填且视觉隐藏。", source: "packages/ui/src/navigation/navigation-families.tsx", props: [
    { name: "options / legend", type: "readonly SegmentedControlOption[] / string", description: "value、label 必填；可选 icon、count、description、disabled；legend 为组名称。" },
    { name: "value / onValueChange", type: "string | null / (value) => void", description: "受控选择；或使用 defaultValue，支持 name 和原生表单。" },
    { name: "appearance", type: "segmented | white-line | white-soft", default: "segmented", description: "只影响显式外观，不修改 RadioGroup 默认。" },
    { name: "tone / density / iconOnly", type: "neutral | inverse / regular | compact / boolean", default: "neutral / 上下文 / false", description: "iconOnly 时所有选项必须有图标，仍保留完整标签。" },
  ], code: '<SegmentedControl legend="批阅顺序" name="traversal"\n  options={[{ value: "student", label: "按人" }, { value: "question", label: "按题" }]}\n  value={traversal} onValueChange={setTraversal} appearance="segmented" />', Demo: SegmentedControlDemo },
  "connected-surface": { title: "ConnectedSurface 连接工作面", description: "只负责当前语义页签和内容面的联合轮廓、局部测量与边缘几何。", category: "Layout · 导航", status: "共享候选 · A4/R2 几何视觉已确认 · 未发布", use: "navigation-browser 的肩部、内衬或贴边轮廓需要连成同一个工作面。", avoid: "普通下划线、独立设置不需要连接布局；不在 Layout 中拥有范围、对象、文件或草稿状态。", parts: "frame / row(track) / decorative SVG layer(union) / panel(children)；唯一轮廓 owner。", source: "packages/layouts/src/connected-surface.tsx", props: [
    { name: "instanceId", type: "string", description: "必填且每实例唯一，测量和观察器只属于本实例。" },
    { name: "track / children", type: "ReactNode / ReactNode", description: "track 接语义 Tabs.Nav，children 接真实 panels；几何不创造页签语义。" },
    { name: "activeKey", type: "string | number | null", description: "受控选择后触发几何重测，不承担选择状态。" },
    { name: "connection / surfaceMode", type: "inset | merged / tonal | plain | outlined", default: "inset / tonal", description: "inset 保留安全内衬；merged 只处理真实触边的角。" },
    { name: "geometry", type: "ConnectedSurfaceGeometry", description: "有限 Rain 几何档位；不要再叠第二条轮廓或全局 CSS 肩部。" },
  ], code: '<NavigationTabs items={items} value={value} onValueChange={setValue}\n  aria-label="资料内容" visualPreset="navigation-browser"\n  renderSurface={({ track, panels }) => <ConnectedSurface\n    instanceId="resource-editor-1" activeKey={value} connection="inset"\n    surfaceMode="tonal" track={track}>{panels}</ConnectedSurface>} />', Demo: ConnectedSurfaceDemo },
  workspace: { title: "WorkspaceLayout 可恢复工作区", description: "管理可隐藏区域、恢复入口、暂态面板、调宽和专注；业务草稿与对象身份由应用保留。", category: "Layout · 导航", status: "共享候选 · 当前导航场景局部审阅已确认 · 未发布", use: "多个区域需独立隐藏、恢复与临时查看，并保留业务内容。", avoid: "固定两列优先已有 Split；不把学生、题目、评分、草稿或 session 写入布局偏好。", parts: "WorkspaceLayout → toolbar/ribbon + flow；RecoverableRegion 是单个持续挂载 body；RegionRestoreTrigger 在稳定外部 owner；PaneSplitter 每边界一个。", source: "packages/layouts/src/workspace.tsx", props: [
    { name: "spec", type: "WorkspaceSpec", description: "稳定 workspaceKey、regions、恢复图、宽度预算与 allowedModes；每个可隐藏区域都有外部恢复 owner。" },
    { name: "preferences / onPreferencesChange", type: "WorkspacePreferences / callback", description: "只保存 mode 与 expandedWidth；受控调用必须接纳请求，否则显示等待同步。" },
    { name: "viewportWidth", type: "number", default: "真实容器测量", description: "可用于确定性嵌入；空间不足只派生有效布局，保留展开请求。" },
    { name: "storage / storageKey", type: "WorkspaceStorage / string", description: "宿主注入存储；只保存布局偏好，不保存会话/业务数据。" },
    { name: "RecoverableRegion regionId / header / footer / children", type: "string / ReactNode / ReactNode / node | render", description: "单个 body 持续挂载；render 可读 effective、temporary、visible。" },
    { name: "RegionRestoreTrigger regionId / intent", type: "string / toggle | peek", default: "toggle", description: "稳定外部控制，恢复失去焦点的隐藏区域。" },
    { name: "PaneSplitter regionId", type: "string", description: "鼠标拖动、方向键/Shift/Home/End 调宽；Enter 隐藏并恢复焦点。" },
    { name: "useWorkspaceLayout()", type: "WorkspaceController", description: "提供 preferences/effective/session 与 dispatch；ENTER_FOCUS/EXIT_FOCUS、PEEK_REGION/PIN_TEMP/UNPIN 等只改变布局。" },
  ], code: '<WorkspaceLayout spec={spec} toolbar={<RecoveryToolbar />}>\n  <RecoverableRegion regionId="directory">{directory}</RecoverableRegion>\n  <PaneSplitter regionId="directory" />\n  <main>{hostOwnedEditor}</main>\n</WorkspaceLayout>\n\n// RecoveryToolbar 位于可隐藏区域外：\nfunction RecoveryToolbar() {\n  return <RegionRestoreTrigger regionId="directory" />;\n}', Demo: WorkspaceDemo },
};

export function NavigationComponentPage({ component }: { component: NavigationComponentId }) {
  const doc = navigationDocs[component], Demo = doc.Demo;
  const recommended = {
    "navigation-tabs": { Scene: NavigationTabsRecommendedScene, name: "NavigationTabsRecommendedScene", file: "navigation-switching-recipes" },
    "navigation-bar": { Scene: NavigationBarRecommendedScene, name: "NavigationBarRecommendedScene", file: "navigation-switching-recipes" },
    "segmented-control": { Scene: SegmentedControlRecommendedScene, name: "SegmentedControlRecommendedScene", file: "navigation-switching-recipes" },
    "object-navigator": { Scene: ObjectNavigatorRecommendedScenes, name: "ObjectNavigatorRecommendedScenes", file: "object-navigator-recipes" },
    "scope-navigation": { Scene: ScopeNavigationRecommendedScene, name: "ScopeNavigationRecommendedScene", file: "scope-connected-recipes" },
    "connected-surface": { Scene: ConnectedSurfaceRecommendedScene, name: "ConnectedSurfaceRecommendedScene", file: "scope-connected-recipes" },
    "navigation-list": { Scene: NavigationListRecommendedScene, name: "NavigationListRecommendedScene", file: "navigation-workspace-recipes" },
    workspace: { Scene: WorkspaceRecommendedScene, name: "WorkspaceRecommendedScene", file: "navigation-workspace-recipes" },
  };
  const recommendation = component in recommended ? recommended[component as keyof typeof recommended] : undefined;
  const Recommended = recommendation?.Scene;
  const recommendationCode = recommendation ? `import { ${recommendation.name} } from "./recipes/navigation-v042/${recommendation.file}";\n// 同时携带该文件声明的配方 CSS 与本地依赖。\n<${recommendation.name} />` : undefined;
  return <ComponentDoc id={component} title={doc.title} description={doc.description} category={doc.category} status={doc.status} useWhen={[doc.use]} avoidWhen={[doc.avoid]} props={doc.props} slots={[doc.parts]} source={doc.source} code={doc.code}>
    {Recommended ? <>
      <DocExample title="推荐场景" description="使用少量真实内容演示组件用途。局部配方复用已有组件；本次运行视觉待审阅。" code={recommendationCode}>
        <div className="navigation-doc-demo navigation-doc-demo--refined" data-demo-component={component}><Recommended /></div>
      </DocExample>
      <Collapsible variant="quiet" defaultOpen={component === "workspace" && window.location.hash.includes("chapter=")} className="navigation-doc-advanced"><CollapsibleTrigger>高级组合与异常状态</CollapsibleTrigger><CollapsibleContent keepMounted><div className="navigation-doc-demo" data-demo-component={`${component}-advanced`}><Demo /></div></CollapsibleContent></Collapsible>
    </> : <DocExample title="交互示例与关键状态" description="演示使用当前共享候选与局部文档容器；既有视觉确认范围保留，独立页仍待用户审阅。"><div className="navigation-doc-demo" data-demo-component={component}><Demo /></div></DocExample>}
  </ComponentDoc>;
}
