import { useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  Command,
  type CommandGroupData,
  type CommandOption,
  ContextMenu,
  HoverCard,
  Kbd,
  Menubar,
  NavigationMenu,
  ScrollArea,
  Sheet,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  SidebarTrigger,
  Tooltip,
} from "@rain-next/ui";
import "./page.css";
import { CommandTaskIcon } from "@rain-next/ui/icons/command-task";
import { CourseFilledIcon } from "@rain-next/ui/icons/course-filled";
import { GroupIcon } from "@rain-next/ui/icons/group";
import { HomeIcon } from "@rain-next/ui/icons/home";
import { InstructionTaskIcon } from "@rain-next/ui/icons/instruction-task";
import { Settings3Icon } from "@rain-next/ui/icons/settings-3";

type VisualDirection = "hierarchy" | "density";
type Section = "overview" | "tasks" | "courses" | "pending" | "team" | "commands" | "settings";
const sections: Record<Section, string> = { overview: "工作台总览", tasks: "我的任务", courses: "课程空间", pending: "待我处理", team: "团队动态", commands: "命令中心", settings: "工作台设置" };
const sectionHref = (section: Section) => `#token-first-g3?section=${section}`;
function readSection(): Section {
  const value = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("section");
  return value && value in sections ? value as Section : "overview";
}
const commandGroups: CommandGroupData[] = [{ value: "工作台", items: [
  { value: "open-inspector", label: "打开任务详情" },
  { value: "focus-grading", label: "定位主观题批阅" },
  { value: "refresh", label: "刷新当前工作台" },
] }];

const tasks = [
  { id: "grading", title: "第 4 周主观题批阅", status: "进行中", owner: "林老师", progress: "68%", due: "今天 18:00", tone: "brand" },
  { id: "lesson", title: "课堂互动数据复盘", status: "待处理", owner: "周老师", progress: "32%", due: "明天 12:00", tone: "warning" },
  { id: "material", title: "补充课程阅读材料", status: "已完成", owner: "陈老师", progress: "100%", due: "周一", tone: "success" },
  { id: "report", title: "生成班级学习报告", status: "待处理", owner: "王老师", progress: "12%", due: "周三", tone: "neutral" },
  { id: "attendance", title: "核对本周课堂出勤与请假记录", status: "待处理", owner: "刘老师", progress: "24%", due: "周三 17:00", tone: "warning" },
  { id: "quiz", title: "整理随堂测验错题反馈", status: "待处理", owner: "赵老师", progress: "42%", due: "周四", tone: "neutral" },
  { id: "homework", title: "发布下一单元课前学习任务", status: "待处理", owner: "林老师", progress: "0%", due: "周五", tone: "neutral" },
  { id: "resource", title: "检查跨班级共享资料的访问权限与过期链接", status: "待处理", owner: "陈老师", progress: "16%", due: "周五", tone: "warning" },
];

function SidebarNavigation({ activeSection, collapsed = false, onNavigate }: { activeSection: Section; collapsed?: boolean; onNavigate?: () => void }) {
  return (
    <>
      <SidebarHeader className="g3-sidebar-header">
        <div className="g3-mark" aria-hidden="true">雨</div>
        <div className="g3-sidebar-title"><strong>教学工作台</strong><span>Rain Next · G3</span></div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSection label="工作区">
          <SidebarItem href={sectionHref("overview")} active={activeSection === "overview"} icon={<HomeIcon aria-hidden="true" />} onClick={onNavigate}>总览</SidebarItem>
          <SidebarItem href={sectionHref("tasks")} active={activeSection === "tasks"} icon={<InstructionTaskIcon aria-hidden="true" />} onClick={onNavigate}>我的任务</SidebarItem>
          <SidebarItem href={sectionHref("courses")} active={activeSection === "courses"} icon={<CourseFilledIcon aria-hidden="true" />} onClick={onNavigate}>课程空间</SidebarItem>
        </SidebarSection>
        <SidebarSection label="协作">
          <SidebarItem href={sectionHref("pending")} active={activeSection === "pending"} icon={<InstructionTaskIcon aria-hidden="true" />} onClick={onNavigate}>待我处理 <span className="g3-sidebar-count">6</span></SidebarItem>
          <SidebarItem href={sectionHref("team")} active={activeSection === "team"} icon={<GroupIcon aria-hidden="true" />} onClick={onNavigate}>团队动态</SidebarItem>
        </SidebarSection>
        <SidebarSection label="工具">
          <SidebarItem href={sectionHref("commands")} active={activeSection === "commands"} icon={<CommandTaskIcon aria-hidden="true" />} onClick={onNavigate}>命令中心</SidebarItem>
          <SidebarItem href={sectionHref("settings")} active={activeSection === "settings"} icon={<Settings3Icon aria-hidden="true" />} onClick={onNavigate}>工作台设置</SidebarItem>
        </SidebarSection>
      </SidebarContent>
      <SidebarFooter className="g3-sidebar-footer">
        <SidebarTrigger aria-label={collapsed ? "展开导航" : "折叠导航"}><span aria-hidden="true">‹</span><span className="g3-trigger-label">{collapsed ? "展开导航" : "收起导航"}</span></SidebarTrigger>
        <div className="g3-sidebar-profile"><span className="g3-avatar">林</span><span className="g3-sidebar-profile-name">林老师</span></div>
      </SidebarFooter>
    </>
  );
}

export function TokenFirstG3Page() {
  const [activeSection, setActiveSection] = useState<Section>(readSection);
  const commandInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const syncSection = () => setActiveSection(readSection());
    window.addEventListener("hashchange", syncSection);
    return () => window.removeEventListener("hashchange", syncSection);
  }, []);
  useEffect(() => {
    const focusCommand = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        commandInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focusCommand);
    return () => window.removeEventListener("keydown", focusCommand);
  }, []);
  const [direction, setDirection] = useState<VisualDirection>("hierarchy");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("grading");
  const [markedTaskId, setMarkedTaskId] = useState<string | null>(null);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [lastAction, setLastAction] = useState("等待操作");
  const selectedTask = tasks.find(task => task.id === selectedTaskId) ?? tasks[0]!;

  const runCommand = (action: string) => {
    if (action === "open-inspector") {
      setInspectorOpen(true);
      setLastAction("已打开任务详情");
    } else if (action === "focus-grading") {
      setSelectedTaskId("grading");
      setLastAction("已定位到主观题批阅");
    } else {
      setLastAction("已刷新工作台数据");
    }
  };

  return (
    <main className="g3-page" data-direction={direction} data-rain-id="token-first-g3">
      <Sheet.Root open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <Sheet.Portal>
          <Sheet.Backdrop />
          <Sheet.Content side="left" className="g3-mobile-sheet" data-direction={direction} aria-label="移动端导航">
            <Sheet.Title>教学工作台</Sheet.Title>
            <Sheet.Description>选择工作区，快速回到正在处理的任务。</Sheet.Description>
            <div className="g3-mobile-sheet-body">
              <Sidebar className="g3-mobile-sidebar"><SidebarNavigation activeSection={activeSection} onNavigate={() => setMobileNavOpen(false)} /></Sidebar>
            </div>
            <div className="g3-sheet-tools" aria-label="面板内浮层检查">
              <Menubar.Root aria-label="面板操作"><Menubar.Menu><Menubar.Trigger>面板操作</Menubar.Trigger><Menubar.Positioner><Menubar.Popup><Menubar.Item onClick={() => setLastAction("已执行面板操作")}>检查任务</Menubar.Item></Menubar.Popup></Menubar.Positioner></Menubar.Menu></Menubar.Root>
              <Tooltip text="当前导航范围" portal><button type="button">导航说明</button></Tooltip>
              <HoverCard.Root><HoverCard.Trigger href={sectionHref("team")}>协作成员</HoverCard.Trigger><HoverCard.Portal><HoverCard.Positioner><HoverCard.Popup>林老师 · 负责当前任务</HoverCard.Popup></HoverCard.Positioner></HoverCard.Portal></HoverCard.Root>
            </div>
            <Sheet.Close className="g3-sheet-close" aria-label="关闭导航">关闭导航</Sheet.Close>
          </Sheet.Content>
        </Sheet.Portal>

      <div className="g3-shell">
        <aside className="g3-sidebar-desktop" aria-label="主导航">
          <Sidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed}>
            <SidebarNavigation activeSection={activeSection} collapsed={sidebarCollapsed} />
          </Sidebar>
        </aside>

        <section className="g3-workspace">
          <header className="g3-header">
            <Sheet.Trigger className="g3-mobile-menu-trigger" aria-label="打开导航">☰</Sheet.Trigger>
            <div className="g3-header-heading">
              <span className="g3-eyebrow">课程 · 2026 春季学期</span>
              <h1>{sections[activeSection]}</h1>
            </div>
            <div className="g3-header-actions">
              <span className="g3-direction-label">视觉方向</span>
              <div className="g3-direction-switch" role="group" aria-label="视觉方向">
                <button type="button" className={direction === "hierarchy" ? "is-active" : ""} aria-pressed={direction === "hierarchy"} onClick={() => setDirection("hierarchy")}>层级型</button>
                <button type="button" className={direction === "density" ? "is-active" : ""} aria-pressed={direction === "density"} onClick={() => setDirection("density")}>密度型</button>
              </div>
            </div>
          </header>

          <div className="g3-navigation-strip">
            <Breadcrumb>
              <Breadcrumb.List>
                <Breadcrumb.Item><Breadcrumb.Link href={sectionHref("overview")}>教学工作台</Breadcrumb.Link></Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item><Breadcrumb.Link href={sectionHref("courses")}>2026 春季学期 · 课程空间</Breadcrumb.Link></Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item><Breadcrumb.Page>{sections[activeSection]}</Breadcrumb.Page></Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb>
            <NavigationMenu.Root aria-label="工作台导航">
              <NavigationMenu.List>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>查看</NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <NavigationMenu.Link href={sectionHref("overview")} active={activeSection === "overview"}>任务总览</NavigationMenu.Link>
                    <NavigationMenu.Link href={sectionHref("team")} active={activeSection === "team"}>团队动态</NavigationMenu.Link>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item><NavigationMenu.Link href={sectionHref("tasks")} active={activeSection === "tasks"}>工作流</NavigationMenu.Link></NavigationMenu.Item>
              </NavigationMenu.List>
              <NavigationMenu.Viewport />
            </NavigationMenu.Root>
            <Menubar.Root aria-label="工作台操作">
              <Menubar.Menu>
                <Menubar.Trigger>操作</Menubar.Trigger>
                <Menubar.Positioner><Menubar.Popup>
                  <Menubar.Item onClick={() => { setLastAction("已创建跟进任务"); }}>创建跟进任务</Menubar.Item>
                  <Menubar.Item onClick={() => { setInspectorOpen(!inspectorOpen); setLastAction(inspectorOpen ? "已收起任务详情" : "已打开任务详情"); }}>切换详情面板</Menubar.Item>
                </Menubar.Popup></Menubar.Positioner>
              </Menubar.Menu>
            </Menubar.Root>
          </div>

          <div className="g3-content-grid">
            <section className="g3-main-column" aria-label="任务工作区">
              <div className="g3-panel g3-command-panel">
                <div className="g3-panel-heading"><div><span className="g3-eyebrow">本地命令注册表</span><h2>快速找到下一步</h2></div><Kbd aria-label="打开命令中心" keys={["⌘", "K"]} /></div>
                <Command aria-label="命令中心" items={commandGroups}>
                  <Command.Input ref={commandInputRef} placeholder="搜索命令，例如：打开任务详情" />
                  <Command.Empty>没有匹配的本地命令</Command.Empty>
                  <Command.List>
                    {(group: CommandGroupData) => <Command.Group key={group.value} items={group.items}>
                      <Command.GroupLabel>{group.value}</Command.GroupLabel>
                      <Command.Collection>{(item: CommandOption) => <Command.Item key={item.value} value={item} onSelect={() => runCommand(item.value)}>{item.label}</Command.Item>}</Command.Collection>
                    </Command.Group>}
                  </Command.List>
                </Command>
              </div>

              <div className="g3-panel g3-task-panel">
                <div className="g3-panel-heading"><div><span className="g3-eyebrow">我的任务 · {tasks.length} 项</span><h2>需要关注的工作</h2></div><button type="button" className="g3-link-button" onClick={() => setLastAction("已准备新建任务")}>新建任务</button></div>
                <ScrollArea.Root className="g3-task-scroll-area">
                  <ScrollArea.Viewport aria-label="任务列表">
                    <ScrollArea.Content>
                      <div className="g3-task-list">
                        {tasks.map(task => (
                          <ContextMenu.Root key={task.id}>
                            <ContextMenu.Trigger className="g3-context-trigger" tabIndex={0}>
                              <div className={`g3-task-row ${selectedTaskId === task.id ? "is-selected" : ""}`}>
                                <button type="button" className="g3-task-select" onClick={() => { setSelectedTaskId(task.id); setLastAction(`已选中：${task.title}`); }}>
                                  <span className={`g3-status-dot tone-${task.tone}`} aria-hidden="true" />
                                  <span className="g3-task-copy"><strong>{task.title}</strong><span>{task.due} · {task.progress} 完成</span></span>
                                </button>
                                <HoverCard.Root>
                                  <HoverCard.Trigger href={sectionHref("team")}>{task.owner}</HoverCard.Trigger>
                                  <HoverCard.Portal><HoverCard.Positioner><HoverCard.Popup><strong>{task.owner}</strong><p>负责跟进这项教学工作，最近一次更新在 12 分钟前。</p></HoverCard.Popup></HoverCard.Positioner></HoverCard.Portal>
                                </HoverCard.Root>
                                <span className={`g3-task-status tone-${task.tone}`}>{task.status}</span>
                              </div>
                            </ContextMenu.Trigger>
                            <ContextMenu.Portal><ContextMenu.Positioner><ContextMenu.Popup>
                              <ContextMenu.Item onClick={() => { setMarkedTaskId(task.id); setLastAction(`已标记：${task.title}`); }}>标记为重点</ContextMenu.Item>
                              <ContextMenu.Item onClick={() => { setSelectedTaskId(task.id); setInspectorOpen(true); setLastAction("已在详情面板打开"); }}>打开详情</ContextMenu.Item>
                              <ContextMenu.Separator />
                              <ContextMenu.Item onClick={() => setLastAction("已复制任务链接")}>复制任务链接</ContextMenu.Item>
                            </ContextMenu.Popup></ContextMenu.Positioner></ContextMenu.Portal>
                            {markedTaskId === task.id ? <span className="g3-marked-label">重点</span> : null}
                          </ContextMenu.Root>
                        ))}
                      </div>
                    </ScrollArea.Content>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar><ScrollArea.Thumb /></ScrollArea.Scrollbar>
                </ScrollArea.Root>
              </div>
            </section>

            {inspectorOpen ? <aside className="g3-inspector" aria-label="任务详情">
              <div className="g3-inspector-heading"><span className={`g3-status-dot tone-${selectedTask.tone}`} aria-hidden="true" /><div><span className="g3-eyebrow">当前选中任务</span><h2>{selectedTask.title}</h2></div><button type="button" className="g3-icon-button" aria-label="关闭任务详情" onClick={() => setInspectorOpen(false)}>×</button></div>
              <dl className="g3-detail-list"><div><dt>负责人</dt><dd>{selectedTask.owner}</dd></div><div><dt>进度</dt><dd>{selectedTask.progress}</dd></div><div><dt>截止时间</dt><dd>{selectedTask.due}</dd></div><div><dt>状态</dt><dd><span className={`g3-task-status tone-${selectedTask.tone}`}>{selectedTask.status}</span></dd></div></dl>
              <div className="g3-inspector-note"><span className="g3-eyebrow">下一步建议</span><p>先处理待批阅答案，再回看班级趋势。保持当前任务的上下文，减少来回切换。</p></div>
            </aside> : <button type="button" className="g3-open-inspector" onClick={() => setInspectorOpen(true)}>打开任务详情</button>}
          </div>

          <div className="g3-live-status" role="status" aria-live="polite">{lastAction}</div>
        </section>
      </div>
      </Sheet.Root>
    </main>
  );
}
