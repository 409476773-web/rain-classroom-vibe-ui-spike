import { useRef, useState, type KeyboardEvent } from "react";
import {
  Button, Command, ContextMenu, HoverCard, IconButton, Input, Kbd, Menubar, NavigationMenu, ScrollArea, Sheet, Textarea,
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem, SidebarSection, SidebarTrigger,
  type CommandGroupData, type CommandOption, type SheetSide,
} from "@rain-next/ui";
import { HomeIcon } from "@rain-next/ui/icons/home";
import { CourseIcon } from "@rain-next/ui/icons/course";
import { Settings3Icon } from "@rain-next/ui/icons/settings-3";
import { RainClassroomIcon } from "@rain-next/ui/icons/rain-classroom";
import { CollapseIcon } from "@rain-next/ui/icons/collapse";
import { ExpandIcon } from "@rain-next/ui/icons/expand";
import { SearchIcon } from "@rain-next/ui/icons/search";
import { FileIcon } from "@rain-next/ui/icons/file";
import { FolderIcon } from "@rain-next/ui/icons/folder";
import { UploadIcon } from "@rain-next/ui/icons/upload";
import { UndoIcon } from "@rain-next/ui/icons/undo";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { CloseIcon } from "@rain-next/ui/icons/close";
import { DeleteIcon } from "@rain-next/ui/icons/delete";
import { InfoIcon } from "@rain-next/ui/icons/info";
import { PinIcon } from "@rain-next/ui/icons/pin";
import { SaveIcon } from "@rain-next/ui/icons/save";
import { ComponentDoc, DocExample } from "./component-doc";
import { readDemoQuery } from "./g3-demo-location";
import "./g3-component-pages.css";

export type G3ComponentId = "scroll-area" | "sheet" | "sidebar" | "command" | "kbd" | "context-menu" | "hover-card" | "menubar" | "navigation-menu";

function ScrollAreaDemo() {
  const [wide, setWide] = useState(false);
  return <div className="g3-doc-stack">
    <div className="g3-doc-row"><Button variant="secondary" aria-pressed={wide} onClick={() => setWide(!wide)}>切换横向溢出</Button><span className="g3-doc-note">{wide ? "显示更多资料信息" : "标准列表"}</span></div>
    <div className="g3-doc-scroll-frame"><div className="g3-doc-scroll-header"><strong>课程资料</strong><span>18 份资料</span></div><ScrollArea.Root className="g3-doc-scroll">
      <ScrollArea.Viewport className="g3-doc-scroll-viewport" aria-label="课程资源滚动区">
        <ScrollArea.Content><div className="g3-doc-scroll-list" style={{ minWidth: wide ? 720 : undefined }}>
          {Array.from({ length: 18 }, (_, index) => <div key={index} className="g3-doc-resource"><FileIcon aria-hidden="true" /><div className="g3-doc-resource-name"><strong>第 {index + 1} 讲 · 人工智能导论</strong><span>林老师 · 课程讲义{wide ? " · 教学资料与阅读记录" : ""}</span></div><span className="g3-doc-resource-meta">12 页{wide ? " · 最近更新 10 月 8 日 · 已阅读" : ""}</span></div>)}
        </div></ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar><ScrollArea.Thumb /></ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root></div>
    <p className="g3-doc-note">Tab 进入后使用方向键或 Page Down，也可拖动滚动条；列表在固定高度内滚动。</p>
  </div>;
}

function SheetDemo() {
  const [side, setSide] = useState<SheetSide>("right"), [open, setOpen] = useState(false), [draft, setDraft] = useState("");
  return <div className="g3-doc-stack">
    <div className="g3-doc-row" role="group" aria-label="侧面板方向">{(["left", "right", "top", "bottom"] as const).map((value, index) => <Button key={value} variant={side === value ? "secondary" : "text"} aria-pressed={side === value} onClick={() => setSide(value)}>{["左侧", "右侧", "顶部", "底部"][index]}</Button>)}</div>
    <Sheet.Root open={open} onOpenChange={setOpen}>
      <Sheet.Trigger render={<Button>打开资料详情</Button>} />
      <Sheet.Portal><Sheet.Backdrop /><Sheet.Content side={side} className="g3-doc-sheet">
        <div className="g3-doc-sheet-heading"><div><Sheet.Title>课程资料详情</Sheet.Title><Sheet.Description>人工智能导论 · 第一讲</Sheet.Description></div><Sheet.Close render={<IconButton icon={<CloseIcon />} size="28/16" aria-label="关闭资料详情" />} /></div>
        <div className="g3-doc-sheet-body"><div className="g3-doc-file-summary"><FileIcon aria-hidden="true" /><div><strong>第一讲 · 课程阅读资料</strong><span>林老师整理 · PDF · 12 页</span></div></div>
          <div className="g3-doc-sheet-field"><label htmlFor="sheet-resource-note">资料备注</label><Textarea id="sheet-resource-note" value={draft} onValueChange={setDraft} placeholder="补充课程资料的阅读备注" rows={3} /><p>关闭后重新打开，本次备注仍会保留。</p></div>
          <section className="g3-doc-sheet-resources" aria-label="本讲阅读目录"><h3>阅读目录</h3>{["学习目标与课程概览", "人工智能的发展历程", "基础概念与关键术语", "课堂讨论与练习", "参考文献", "补充阅读", "课后思考", "下一讲预习"].map((label, index) => <div className="g3-doc-resource" key={label}><FileIcon aria-hidden="true" /><div className="g3-doc-resource-name"><strong>{label}</strong><span>资料条目 {index + 1} · 第一讲</span></div></div>)}</section>
        </div>
        <div className="g3-doc-sheet-footer"><span>{draft.length} 字备注</span><Sheet.Close render={<Button variant="secondary">关闭详情</Button>} /></div>
      </Sheet.Content></Sheet.Portal>
    </Sheet.Root>
    <p className="g3-doc-note" role="status">面板{open ? "已打开" : "已关闭"}；已填写 {draft.length} 字。Escape 或点击遮罩关闭后，焦点返回触发按钮。</p>
  </div>;
}

const sidebarEntries = [
  { id: "overview", label: "教学总览", icon: <HomeIcon aria-hidden="true" /> },
  { id: "courses", label: "我的课程", icon: <CourseIcon aria-hidden="true" /> },
  { id: "settings", label: "工作台设置", icon: <Settings3Icon aria-hidden="true" /> },
];
function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false), [active, setActive] = useState(() => readDemoQuery("view", ["overview", "courses", "settings"], "overview"));
  return <div className="g3-doc-sidebar-frame">
    <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} aria-label="示例工作台导航">
      <SidebarHeader>{collapsed ? <RainClassroomIcon aria-hidden="true" size={24} /> : "教学工作台"}</SidebarHeader>
      <SidebarContent><SidebarSection label={collapsed ? undefined : "工作区"}>{sidebarEntries.map(item => <SidebarItem key={item.id} href={"#sidebar?view=" + item.id} active={active === item.id} icon={item.icon} aria-label={item.label} title={item.label} onClick={event => {
        if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); setActive(item.id); }
      }}>{item.label}</SidebarItem>)}</SidebarSection></SidebarContent>
      <SidebarFooter><SidebarTrigger aria-label={collapsed ? "展开示例导航" : "收起示例导航"}>{collapsed ? <ExpandIcon aria-hidden="true" /> : <><CollapseIcon aria-hidden="true" /><span>收起导航</span></>}</SidebarTrigger></SidebarFooter>
    </Sidebar>
    <section className="g3-doc-sidebar-main" aria-label="当前页面"><h3>{sidebarEntries.find(item => item.id === active)?.label}</h3><p>教学工作台的当前页面。</p><p role="status">当前页面：{active}</p></section>
  </div>;
}

const commandGroups: CommandGroupData[] = [{ value: "资料", items: [
  { value: "new", label: "新建资料" }, { value: "preview", label: "打开资料预览" }, { value: "publish", label: "发布资料", disabled: true },
] }, { value: "工作台", items: [{ value: "reset", label: "恢复示例" }] }];
function CommandDemo() {
  const [created, setCreated] = useState(0), [preview, setPreview] = useState(false);
  function execute(id: string) { if (id === "new") setCreated(value => value + 1); if (id === "preview") setPreview(true); if (id === "reset") { setCreated(0); setPreview(false); } }
  function handleShortcut(event: KeyboardEvent<HTMLDivElement>) {
    const key = event.key.toLowerCase();
    if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey || (key !== "n" && key !== "p")) return;
    event.preventDefault(); execute(key === "n" ? "new" : "preview");
  }
  return <div className="g3-doc-stack" onKeyDown={handleShortcut}>
    <Command items={commandGroups} aria-label="课程资料命令" className="g3-doc-command shadow-rain-overlay">
      <div className="g3-doc-command-search"><SearchIcon aria-hidden="true" /><Command.Input placeholder="搜索命令…" aria-label="搜索课程资料命令" /></div><Command.Empty>没有匹配的命令</Command.Empty>
      <Command.List>{(group: CommandGroupData) => <Command.Group key={group.value} items={group.items}><Command.GroupLabel>{group.value}</Command.GroupLabel><Command.Collection>{(item: CommandOption) => <Command.Item key={item.value} value={item} disabled={item.disabled} onSelect={() => execute(item.value)}>
        <span className="g3-doc-command-icon" aria-hidden="true">{item.value === "new" ? <FileIcon /> : item.value === "preview" ? <FolderIcon /> : item.value === "publish" ? <UploadIcon /> : <UndoIcon />}</span><span className="g3-doc-command-label">{item.label}</span>
        <span className="g3-doc-command-meta" aria-hidden="true">{item.disabled ? "无权限" : item.value === "new" ? "⌘ N" : item.value === "preview" ? "⌘ P" : null}</span>
      </Command.Item>}</Command.Collection></Command.Group>}</Command.List>
      <div className="g3-doc-command-footer"><span><Kbd keys={["↑", "↓"]} />选择</span><span><Kbd keys={["Enter"]} />执行</span></div>
    </Command>
    <p role="status">已新建 {created} 份示例资料；预览{preview ? "已打开" : "未打开"}。</p>
    {preview && <div className="g3-doc-preview"><strong>资料预览</strong><p>人工智能导论 · 第一讲</p><Button variant="text" onClick={() => setPreview(false)}>关闭预览</Button></div>}
    <p className="g3-doc-note">输入筛选命令，方向键选择，Enter 执行。示例内支持 ⌘ / Ctrl + N、P。</p>
  </div>;
}

function KbdDemo() {
  const input = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);
  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey && event.key.toLowerCase() === "k") { event.preventDefault(); input.current?.focus(); setCount(value => value + 1); }
  }
  return <div className="g3-doc-stack g3-doc-shortcut" tabIndex={0} onKeyDown={handleKey} aria-label="快捷键演示区">
    <div className="g3-doc-row"><strong>定位资料搜索</strong><Kbd keys={["Alt", "K"]} separator="+" aria-label="Alt 加 K" /></div>
    <p className="g3-doc-note">先点击或 Tab 聚焦这个区域，再按 Alt + K。快捷键只在示例区域生效。</p>
    <label className="g3-doc-stack">资料搜索<Input ref={input} placeholder="输入资料名称" /></label>
    <Button variant="secondary" onClick={() => input.current?.focus()}>定位搜索（相同操作）</Button>
    <p role="status">已触发快捷键 {count} 次。</p>
  </div>;
}

function ContextMenuDemo() {
  const [marked, setMarked] = useState(false), [detail, setDetail] = useState(false);
  return <div className="g3-doc-stack">
    <ContextMenu.Root><ContextMenu.Trigger tabIndex={0} className="g3-doc-context-target" aria-label="第一讲资料，可打开上下文菜单"><div className="g3-doc-file-summary"><FileIcon aria-hidden="true" /><div><strong>第一讲 · 课程阅读资料</strong><span>林老师整理 · PDF · 12 页</span></div></div><span className="g3-doc-context-hint">{marked ? "已标记为重点" : "右键查看操作 · 或按 Shift + F10"}</span></ContextMenu.Trigger>
      <ContextMenu.Portal><ContextMenu.Positioner><ContextMenu.Popup>
        <ContextMenu.Item onClick={() => setMarked(!marked)}><PinIcon className="g3-doc-menu-icon" aria-hidden="true" />{marked ? "取消重点标记" : "标记为重点"}</ContextMenu.Item><ContextMenu.Item onClick={() => setDetail(true)}><InfoIcon className="g3-doc-menu-icon" aria-hidden="true" />查看资料详情</ContextMenu.Item><ContextMenu.Separator /><ContextMenu.Item disabled><DeleteIcon className="g3-doc-menu-icon" aria-hidden="true" />删除（无权限）</ContextMenu.Item>
      </ContextMenu.Popup></ContextMenu.Positioner></ContextMenu.Portal>
    </ContextMenu.Root>
    <div className="g3-doc-row"><Button variant="secondary" onClick={() => setMarked(!marked)}>{marked ? "取消重点标记" : "标记为重点"}</Button><Button variant="text" onClick={() => setDetail(!detail)}>{detail ? "关闭详情" : "查看资料详情"}</Button></div>
    <p role="status">资料{marked ? "已" : "未"}标记；详情{detail ? "已打开" : "已关闭"}。</p>{detail && <div className="g3-doc-preview">第一讲资料 · 由林老师整理，共 12 页。</div>}
    <p>常用操作同时提供可见入口；触屏用户也能完成相同任务。</p>
  </div>;
}

function HoverCardDemo() {
  const [details, setDetails] = useState(() => readDemoQuery("member", ["lin"], "") === "lin");
  return <div className="g3-doc-stack">
    <p>资料整理人：<HoverCard.Root><HoverCard.Trigger href="#hover-card?member=lin" onClick={event => {
      if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); setDetails(true); }
    }}>林老师</HoverCard.Trigger><HoverCard.Portal><HoverCard.Positioner><HoverCard.Popup className="g3-doc-hover-card"><div className="g3-doc-person"><span className="g3-doc-person-icon"><CourseIcon aria-hidden="true" /></span><div><strong>林老师</strong><span>课程负责人</span></div></div><p>负责人工智能导论的资料整理与课程答疑。</p><div className="g3-doc-hover-meta"><span>人工智能导论</span><span>周三下午答疑</span></div></HoverCard.Popup></HoverCard.Positioner></HoverCard.Portal></HoverCard.Root></p>
    <p>悬停或通过 Tab 聚焦姓名查看预览。点击姓名显示完整详情，预览不承载唯一的重要信息。</p>
    {details && <div className="g3-doc-preview"><h3>林老师</h3><p>人工智能导论课程负责人 · 答疑时间为周三下午。</p><Button variant="text" onClick={() => setDetails(false)}>关闭成员详情</Button></div>}
  </div>;
}

function MenubarDemo() {
  const [count, setCount] = useState(0), [preview, setPreview] = useState(false), [action, setAction] = useState("等待操作");
  return <div className="g3-doc-stack"><Menubar.Root aria-label="资料编辑命令">
    <Menubar.Menu><Menubar.Trigger>文件</Menubar.Trigger><Menubar.Positioner><Menubar.Popup><Menubar.Item onClick={() => { setCount(count + 1); setAction("已新建示例资料"); }}><FileIcon className="g3-doc-menu-icon" aria-hidden="true" />新建资料</Menubar.Item><Menubar.Item onClick={() => setAction("已保存到本次演示状态")}><SaveIcon className="g3-doc-menu-icon" aria-hidden="true" />保存演示</Menubar.Item><Menubar.Separator /><Menubar.Item disabled><UploadIcon className="g3-doc-menu-icon" aria-hidden="true" />发布到真实课程</Menubar.Item></Menubar.Popup></Menubar.Positioner></Menubar.Menu>
    <Menubar.Menu><Menubar.Trigger>查看</Menubar.Trigger><Menubar.Positioner><Menubar.Popup><Menubar.Item onClick={() => { setPreview(!preview); setAction(preview ? "已关闭预览" : "已打开预览"); }}><FolderIcon className="g3-doc-menu-icon" aria-hidden="true" />{preview ? "关闭预览" : "打开预览"}</Menubar.Item></Menubar.Popup></Menubar.Positioner></Menubar.Menu>
  </Menubar.Root><p role="status">{action}；新建数量 {count}。</p>{preview && <div className="g3-doc-preview">当前资料的预览内容</div>}<p>方向键在菜单入口间移动，Enter 或向下键打开，Escape 关闭。</p></div>;
}

function NavigationMenuDemo() {
  const [active, setActive] = useState(() => readDemoQuery("view", ["overview", "resources", "report"], "overview"));
  const destinations = [{ id: "overview", label: "课程总览", description: "查看课程进度与教学安排" }, { id: "resources", label: "课程资料", description: "管理讲义与课前阅读" }, { id: "report", label: "学习报告", description: "查看学习表现" }];
  const link = (item: typeof destinations[number]) => <NavigationMenu.Link key={item.id} aria-label={item.label} className={item.id === "report" ? undefined : "g3-doc-nav-link"} href={"#navigation-menu?view=" + item.id} active={active === item.id} onClick={event => {
    if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); setActive(item.id); }
  }}>{item.id === "report" ? item.label : <>{item.id === "overview" ? <CourseIcon className="g3-doc-menu-icon" aria-hidden="true" /> : <FileIcon className="g3-doc-menu-icon" aria-hidden="true" />}<span><strong>{item.label}</strong><span>{item.description}</span></span></>}</NavigationMenu.Link>;
  return <div className="g3-doc-stack"><NavigationMenu.Root aria-label="课程目的地"><NavigationMenu.List>
    <NavigationMenu.Item><NavigationMenu.Trigger>教学空间<ArrowDownIcon className="g3-doc-menu-icon" aria-hidden="true" /></NavigationMenu.Trigger><NavigationMenu.Content className="g3-doc-nav-content">{destinations.slice(0, 2).map(link)}</NavigationMenu.Content></NavigationMenu.Item>
    <NavigationMenu.Item>{link(destinations[2]!)}</NavigationMenu.Item>
  </NavigationMenu.List><NavigationMenu.Viewport /></NavigationMenu.Root><section className="g3-doc-preview" aria-label="目的地内容"><h3>{destinations.find(item => item.id === active)?.label}</h3><p role="status">当前目的地：{active}</p></section><p>带内容面板的目的地菜单；打开教学空间，选择一个真实链接。宿主在演示内显示目标内容，链接仍保留 href。</p></div>;
}

const g3Docs = {
  "scroll-area": { title: "Scroll Area 滚动区", description: "在有限容器中浏览长内容，保持键盘可达的视口和可拖动滚动条。", use: "需要面板内独立滚动，或显式的纵横向滚动条。", avoid: "普通页面滚动可以直接使用浏览器；不要给没有有限高度的容器套滚动区。", parts: "Root → Viewport → Content；Scrollbar → Thumb；双向滚动可加 Corner。", props: [
    { name: "Root / Viewport className", type: "string", description: "宿主设置有限高度与宽度；内容滚动边界在 Viewport。" },
    { name: "Viewport tabIndex", type: "number", default: "0", description: "允许键盘进入滚动区；aria-label 说明浏览范围。" },
    { name: "Scrollbar orientation", type: "vertical | horizontal", default: "vertical", description: "每个方向对应自己的 Thumb。" },
  ], code: '<ScrollArea.Root style={{ height: 240 }}>\n  <ScrollArea.Viewport style={{ height: "100%" }} aria-label="课程资源">\n    <ScrollArea.Content>{resources}</ScrollArea.Content>\n  </ScrollArea.Viewport>\n  <ScrollArea.Scrollbar><ScrollArea.Thumb /></ScrollArea.Scrollbar>\n</ScrollArea.Root>', Demo: ScrollAreaDemo },
  sheet: { title: "Sheet 侧面板", description: "暂时打开一项任务的详情，使用模态侧面板保留原页面上下文。", use: "需要从边缘进入的模态详情、补充表单或移动导航。", avoid: "常驻工作台侧栏应使用 Layout；不要把未保存草稿只放在关闭时卸载的面板里。", parts: "Root → Trigger + Portal；Portal → Backdrop + Content；Content → Title、Description、正文、Close。", props: [
    { name: "Root open / onOpenChange", type: "boolean / (open, details) => void", description: "可受控；关闭意图不等于业务保存或取消。" },
    { name: "Root modal", type: "boolean", default: "true", description: "默认模态，行为沿用 Base UI Drawer。" },
    { name: "Content side", type: "top | right | bottom | left", default: "right", description: "方向决定边缘；宽度与内容滚动由宿主组合。" },
    { name: "Title / Description", type: "ReactNode", description: "提供面板名称与说明；使用复合组件保持关联。" },
  ], code: '<Sheet.Root open={open} onOpenChange={setOpen}>\n  <Sheet.Trigger render={<Button>打开详情</Button>} />\n  <Sheet.Portal><Sheet.Backdrop /><Sheet.Content side="right">\n    <Sheet.Title>资料详情</Sheet.Title>\n    <Sheet.Description>查看并填写资料备注。</Sheet.Description>\n    {editor}\n    <Sheet.Close render={<Button>关闭详情</Button>} />\n  </Sheet.Content></Sheet.Portal>\n</Sheet.Root>', Demo: SheetDemo },
  sidebar: { title: "Sidebar 侧栏", description: "组织工作区目的地、当前项和辅助内容，支持受控或内部收起状态。", use: "需要有名称、有当前项的纵向工作区导航。", avoid: "Sidebar 是 UI 导航容器；复杂区域恢复、暂态面板与调宽由 WorkspaceLayout 等 Layout 处理。", parts: "Sidebar → Header、Content、Footer；Content → Section → Item；Trigger 必须在 Sidebar 内。", props: [
    { name: "collapsed / onCollapsedChange", type: "boolean / (collapsed) => void", description: "受控收起状态；或使用 defaultCollapsed。" },
    { name: "defaultCollapsed", type: "boolean", default: "false", description: "非受控实例的初始状态。" },
    { name: "side", type: "left | right", default: "left", description: "标注侧栏方向，不接管页面的区域预算。" },
    { name: "Item active / href / icon", type: "boolean / string / ReactNode", description: "当前目的地使用 aria-current；路径由应用提供。" },
  ], code: '<Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} aria-label="工作区">\n  <SidebarHeader>教学工作台</SidebarHeader>\n  <SidebarContent><SidebarSection label="课程">\n    <SidebarItem href="/courses" active icon={<CourseIcon />}>我的课程</SidebarItem>\n  </SidebarSection></SidebarContent>\n  <SidebarFooter><SidebarTrigger>收起导航</SidebarTrigger></SidebarFooter>\n</Sidebar>', Demo: SidebarDemo },
  command: { title: "Command 命令", description: "从宿主注册的命令中筛选并执行，保留分组、禁用项与空结果。", use: "已知命令集合的快速检索与执行。", avoid: "目的地导航用 NavigationList/NavigationMenu；组件不发请求、不自行注册全局快捷键。", parts: "Command → Input、Empty、List；List render group → Group、GroupLabel、Collection → Item。", props: [
    { name: "items", type: "readonly CommandGroupData[]", description: "分组为 value + items；每项为 value、label、disabled?。" },
    { name: "Input placeholder / aria-label", type: "string", description: "提供可访问的命令输入名称。" },
    { name: "Item value / disabled / onSelect", type: "CommandOption / boolean / () => void", description: "传入选项对象与禁用状态；宿主实际执行动作。" },
  ], code: '<Command items={groups} aria-label="资料命令">\n  <Command.Input placeholder="搜索命令" />\n  <Command.Empty>没有匹配命令</Command.Empty>\n  <Command.List>{group => <Command.Group key={group.value} items={group.items}>\n    <Command.GroupLabel>{group.value}</Command.GroupLabel>\n    <Command.Collection>{item => <Command.Item key={item.value} value={item}\n      disabled={item.disabled} onSelect={() => execute(item.value)}>{item.label}</Command.Item>}</Command.Collection>\n  </Command.Group>}</Command.List>\n</Command>', Demo: CommandDemo },
  kbd: { title: "Kbd 快捷键", description: "用清楚的按键组合提示已实现的快捷键；快捷键行为由宿主负责。", use: "标识真实可用的快捷键，且同时提供可发现的操作入口。", avoid: "不要仅展示尚未注册的按键，也不要依赖快捷键完成唯一的重要操作。", parts: "Kbd 为具名 group；keys 中每项输出原生 kbd；separator 仅作分隔。", props: [
    { name: "keys", type: "readonly ReactNode[]", description: "按顺序提供按键文字，如 [Alt, K]。" },
    { name: "separator", type: "ReactNode", default: '""', description: "可使用 + 等可见分隔符。" },
    { name: "aria-label", type: "string", description: "朗读完整按键组合，避免依赖符号猜测。" },
  ], code: '<div tabIndex={0} onKeyDown={event => {\n  if (event.altKey && event.key.toLowerCase() === "k") {\n    event.preventDefault(); searchRef.current?.focus();\n  }\n}}>\n  <Kbd keys={["Alt", "K"]} separator="+" aria-label="Alt 加 K" />\n  <input ref={searchRef} aria-label="资料搜索" />\n</div>', Demo: KbdDemo },
  "context-menu": { title: "Context Menu 上下文菜单", description: "在当前对象附近提供右键与键盘等价的操作菜单。", use: "高频对象列表需要就近操作，且关键动作有可见等价入口。", avoid: "不要把所有操作藏在右键内；触屏与不熟悉快捷键的用户也应能完成任务。", parts: "Root → Trigger + Portal；Positioner → Popup → Item/LinkItem/Separator；可组合 Group、CheckboxItem、RadioItem 与子菜单。", props: [
    { name: "Root open / onOpenChange", type: "boolean / callback", description: "继承 Base UI ContextMenu 的受控协议。" },
    { name: "Trigger tabIndex", type: "number", description: "对象需可聚焦；Shift + F10/ContextMenu 键可打开。" },
    { name: "Item disabled / onClick", type: "boolean / callback", description: "明确禁用状态；操作由宿主处理。" },
    { name: "LinkItem href", type: "string", description: "导航型菜单项保留真实链接语义。" },
  ], code: '<ContextMenu.Root>\n  <ContextMenu.Trigger tabIndex={0}>课程资料</ContextMenu.Trigger>\n  <ContextMenu.Portal><ContextMenu.Positioner><ContextMenu.Popup>\n    <ContextMenu.Item onClick={markResource}>标记为重点</ContextMenu.Item>\n    <ContextMenu.Item disabled>删除（无权限）</ContextMenu.Item>\n  </ContextMenu.Popup></ContextMenu.Positioner></ContextMenu.Portal>\n</ContextMenu.Root>\n<Button onClick={markResource}>标记为重点</Button>', Demo: ContextMenuDemo },
  "hover-card": { title: "Hover Card 悬停预览", description: "悬停或聚焦对象链接时就近预览补充信息，保持阅读连续性。", use: "成员、文件等对象的轻量预览，完整信息有独立查看入口。", avoid: "关键提示不能仅放在悬停内容；要求确认、编辑或持续操作时使用其他容器。", parts: "Root → Trigger + Portal；Positioner → Popup（可选 Arrow）。", props: [
    { name: "Root open / onOpenChange", type: "boolean / callback", description: "复用 Base UI PreviewCard 状态协议。" },
    { name: "Trigger href", type: "string", description: "保留完整详情链接，兼容键盘聚焦。" },
    { name: "Positioner side / align", type: "side / alignment", description: "由 Base UI 处理定位与视口碰撞；默认偏移 8。" },
    { name: "Popup children", type: "ReactNode", description: "只提供补充预览内容，不设置唯一关键动作。" },
  ], code: '<HoverCard.Root>\n  <HoverCard.Trigger href="/members/lin">林老师</HoverCard.Trigger>\n  <HoverCard.Portal><HoverCard.Positioner><HoverCard.Popup>\n    林老师 · 课程负责人\n  </HoverCard.Popup></HoverCard.Positioner></HoverCard.Portal>\n</HoverCard.Root>', Demo: HoverCardDemo },
  menubar: { title: "Menubar 菜单栏", description: "把同一工作表面的命令组织为可通过方向键切换的菜单。", use: "编辑器或工作台中稳定的文件、编辑、查看等命令分组。", avoid: "页面目的地使用导航组件；少量常用操作直接使用 Button。", parts: "Root → Menu → Trigger + Positioner（已含 Portal）→ Popup → Item/LinkItem/Separator/Group。", props: [
    { name: "Root aria-label / orientation", type: "string / horizontal | vertical", description: "给菜单栏命名；行为继承 Base UI Menubar。" },
    { name: "Menu open / onOpenChange", type: "boolean / callback", description: "每个菜单维护自己的打开状态。" },
    { name: "Item disabled / onClick", type: "boolean / callback", description: "执行宿主命令；跳转使用 LinkItem。" },
    { name: "Positioner children", type: "ReactNode", description: "已包含 Portal，无需重复套 Portal。" },
  ], code: '<Menubar.Root aria-label="资料编辑命令">\n  <Menubar.Menu><Menubar.Trigger>文件</Menubar.Trigger>\n    <Menubar.Positioner><Menubar.Popup>\n      <Menubar.Item onClick={createResource}>新建资料</Menubar.Item>\n      <Menubar.Item disabled>发布</Menubar.Item>\n    </Menubar.Popup></Menubar.Positioner>\n  </Menubar.Menu>\n</Menubar.Root>', Demo: MenubarDemo },
  "navigation-menu": { title: "Navigation Menu 导航菜单", description: "将目的地链接组织为导航入口与可展开的内容区域。", use: "导航目的地需要分组说明或展开内容；实际链接由应用提供。", avoid: "执行命令使用 Menubar；同对象内切换内容面使用 NavigationTabs。", parts: "Root → List → Item → Trigger + Content 或 Link；Root 中挂载 Viewport。", props: [
    { name: "Root aria-label / value / onValueChange", type: "string / string | null / callback", description: "给导航命名；可控制展开的项目。" },
    { name: "Item value", type: "string", description: "可提供稳定项目 ID；不使用业务显示名称作为身份。" },
    { name: "Link href / active", type: "string / boolean", description: "保持原生链接与当前目的地语义。" },
    { name: "Content / Viewport", type: "ReactNode / part", description: "展开内容与承载视口必须正确组合。" },
  ], code: '<NavigationMenu.Root aria-label="课程目的地">\n  <NavigationMenu.List><NavigationMenu.Item>\n    <NavigationMenu.Trigger>教学空间</NavigationMenu.Trigger>\n    <NavigationMenu.Content>\n      <NavigationMenu.Link href="/courses" active>课程总览</NavigationMenu.Link>\n      <NavigationMenu.Link href="/resources">课程资料</NavigationMenu.Link>\n    </NavigationMenu.Content>\n  </NavigationMenu.Item></NavigationMenu.List>\n  <NavigationMenu.Viewport />\n</NavigationMenu.Root>', Demo: NavigationMenuDemo },
} satisfies Record<G3ComponentId, unknown>;

export function G3ComponentPage({ component }: { component: G3ComponentId }) {
  const doc = g3Docs[component], Demo = doc.Demo;
  return <ComponentDoc id={component} title={doc.title} description={doc.description} category="UI · G3" status="共享候选 · 未发布" useWhen={[doc.use]} avoidWhen={[doc.avoid]} props={doc.props} slots={[doc.parts]} source={"packages/ui/src/" + component + "/" + component + ".tsx"} code={doc.code}>
    <DocExample title="交互示例与关键状态" description="演示数据仅保留在当前页面。使用真实共享组件，可直接操作并查看结果。"><div className="g3-doc-demo" data-demo-component={component}><Demo /></div></DocExample>
  </ComponentDoc>;
}
