import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { Button, Input, Surface, Tag } from "@rain-next/ui";
import { EditPencilIcon } from "@rain-next/ui/icons/edit-pencil";
import { EditPencilFilledIcon } from "@rain-next/ui/icons/edit-pencil-filled";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { ArrowUpIcon } from "@rain-next/ui/icons/arrow-up";
import { DoubleArrowDownIcon } from "@rain-next/ui/icons/double-arrow-down";
import { DoubleArrowUpIcon } from "@rain-next/ui/icons/double-arrow-up";
import { AddBoldIcon } from "@rain-next/ui/icons/add-bold";
import { AddCircleOutlineIcon } from "@rain-next/ui/icons/add-circle-outline";
import { AddIcon } from "@rain-next/ui/icons/add";
import { DeleteIcon } from "@rain-next/ui/icons/delete";
import { MinusCircleOutlineIcon } from "@rain-next/ui/icons/minus-circle-outline";
import { MinusIcon } from "@rain-next/ui/icons/minus";
import { SearchIcon } from "@rain-next/ui/icons/search";
import { FilterIcon } from "@rain-next/ui/icons/filter";
import { Settings3Icon } from "@rain-next/ui/icons/settings-3";
import { MoreHorizontalIcon } from "@rain-next/ui/icons/more-horizontal";
import { CloseIcon } from "@rain-next/ui/icons/close";
import { CircleCloseIcon } from "@rain-next/ui/icons/circle-close";
import { CheckBoldIcon } from "@rain-next/ui/icons/check-bold";
import { CircleCheckIcon } from "@rain-next/ui/icons/circle-check";
import { AlertCircleIcon } from "@rain-next/ui/icons/alert-circle";
import { InfoIcon } from "@rain-next/ui/icons/info";
import { HelpIcon } from "@rain-next/ui/icons/help";
import { RefreshIcon } from "@rain-next/ui/icons/refresh";
import { PublishIcon } from "@rain-next/ui/icons/publish";
import { PublishedIcon } from "@rain-next/ui/icons/published";
import { ShareAltIcon } from "@rain-next/ui/icons/share-alt";
import { ButtonLoadingIcon } from "@rain-next/ui/icons/button-loading";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/motion.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";

// Local experiment. First selections are preserved in report.md.
// These documented static icon entry points were not generated on first inspection.
// A later catalog check found all 28 imports available; build/browser acceptance is still pending.
type Course = { id: number; title: string; quantity: number; published: boolean; inCollection: boolean };
type Filter = "all" | "collection" | "published";
type Panel = "edit" | "settings" | null;
type Busy = "refresh" | "retry" | "publish" | null;

const seedCourses: Course[] = [
  { id: 1, title: "教学设计入门", quantity: 2, published: false, inCollection: true },
  { id: 2, title: "课堂互动方法", quantity: 3, published: true, inCollection: true },
  { id: 3, title: "课程评价实践", quantity: 1, published: false, inCollection: false },
];
const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "全部课程" },
  { value: "collection", label: "当前集合" },
  { value: "published", label: "已发布" },
];

export function Consumer() {
  const [courses, setCourses] = useState(seedCourses);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [openMenu, setOpenMenu] = useState<"filter" | "more" | null>(null);
  const [panel, setPanel] = useState<Panel>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [editError, setEditError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [moreExpanded, setMoreExpanded] = useState(false);
  const [showSummary, setShowSummary] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [page, setPage] = useState<"list" | "detail">("list");
  const [busy, setBusy] = useState<Busy>(null);
  const [feedback, setFeedback] = useState("已载入三门演示课程。");
  const [coverFailed, setCoverFailed] = useState(true);
  const nextId = useRef(4);
  const timer = useRef<number | undefined>(undefined);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const settingsHeadingRef = useRef<HTMLHeadingElement>(null);
  const panelTriggerRef = useRef<HTMLButtonElement | null>(null);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const moreTriggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const selected = courses.find((course) => course.id === selectedId);
  const visible = courses.filter((course) =>
    course.title.includes(query.trim()) &&
    (filter !== "collection" || course.inCollection) &&
    (filter !== "published" || course.published),
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => { headingRef.current?.focus(); }, [page]);
  useEffect(() => {
    if (openMenu) menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, [openMenu]);
  useEffect(() => {
    if (panel === "edit") editInputRef.current?.focus();
    if (panel === "settings") settingsHeadingRef.current?.focus();
  }, [panel]);

  function updateSelected(patch: Partial<Course>) {
    setCourses((items) => items.map((course) => course.id === selectedId ? { ...course, ...patch } : course));
  }

  function openPanel(nextPanel: Exclude<Panel, null>, trigger: HTMLButtonElement) {
    panelTriggerRef.current = trigger;
    setDraftTitle(selected?.title ?? "");
    setEditError(false);
    setPanel(nextPanel);
    setOpenMenu(null);
  }

  function closePanel() {
    setPanel(null);
    panelTriggerRef.current?.focus();
  }

  function closeMenu() {
    (openMenu === "filter" ? filterTriggerRef : moreTriggerRef).current?.focus();
    setOpenMenu(null);
  }

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") { event.preventDefault(); closeMenu(); return; }
    if (event.key === "Tab") { closeMenu(); return; }
    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1
      : event.key === "ArrowDown" ? (index + 1) % buttons.length
      : event.key === "ArrowUp" ? (index + buttons.length - 1) % buttons.length : null;
    if (next !== null) { event.preventDefault(); buttons[next]?.focus(); }
  }

  function run(action: Exclude<Busy, null>) {
    if (busy) return;
    const courseId = selectedId;
    setBusy(action);
    timer.current = window.setTimeout(() => {
      if (action === "publish") {
        setCourses((items) => items.map((course) => course.id === courseId ? { ...course, published: true } : course));
        setFeedback("发布成功。课程当前已发布。");
      } else if (action === "retry") {
        setCoverFailed(false);
        setFeedback("重试成功，课程封面已准备完成。");
      } else {
        setFeedback("刷新完成，演示课程已是最新。");
      }
      setBusy(null);
    }, 900);
  }

  function createCourse() {
    const id = nextId.current++;
    setCourses((items) => [...items, { id, title: `新建课程 ${id - 3}`, quantity: 1, published: false, inCollection: false }]);
    setSelectedId(id);
    setQuery("");
    setFilter("all");
    setFeedback("已创建新的课程对象。可单独将它加入集合。");
  }

  return (
    <DensityProvider density="compact" rainId="local-icon-consumer-density">
      <main className="rain-icon-consumer rain-type-ui" data-rain-id="local-icon-consumer" data-state={page}>
        <style>{`
          .rain-icon-consumer { max-width: 1120px; margin: 0 auto; padding: 24px; color: var(--rain-color-text-primary); background: var(--rain-color-surface-page); }
          .rain-icon-consumer h1, .rain-icon-consumer h2, .rain-icon-consumer p { margin: 0; }
          .rain-icon-consumer h1 { font-size: 22px; line-height: 30px; font-weight: 600; }
          .rain-icon-consumer h2 { font-size: 16px; line-height: 24px; font-weight: 600; }
          .rain-icon-consumer .row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
          .rain-icon-consumer .between { justify-content: space-between; }
          .rain-icon-consumer .stack { display: grid; gap: 16px; }
          .rain-icon-consumer .section { padding: 16px; }
          .rain-icon-consumer .muted { color: var(--rain-color-text-secondary); }
          .rain-icon-consumer .workspace { display: grid; grid-template-columns: minmax(0, 1fr) minmax(260px, 320px); gap: 16px; margin-top: 16px; }
          .rain-icon-consumer .full { grid-column: 1 / -1; }
          .rain-icon-consumer .course-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
          .rain-icon-consumer .course { padding: 12px; border: 1px solid var(--rain-color-border-default); border-radius: var(--rain-radius-6); }
          .rain-icon-consumer .course[data-selected="true"] { background: var(--rain-color-selection-item); border-color: var(--rain-color-brand-primary); }
          .rain-icon-consumer .menu { display: grid; justify-items: start; gap: 4px; padding: 8px; border: 1px solid var(--rain-color-border-default); border-radius: var(--rain-radius-6); background: var(--rain-color-surface-panel); }
          .rain-icon-consumer .status { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; padding: 10px 12px; border-radius: var(--rain-radius-6); }
          .rain-icon-consumer .success { color: var(--rain-color-semantic-success); background: var(--rain-color-semantic-success-surface); }
          .rain-icon-consumer .warning { color: var(--rain-color-semantic-warning); background: var(--rain-color-semantic-warning-surface); }
          .rain-icon-consumer .error { color: var(--rain-color-semantic-error); background: var(--rain-color-semantic-error-surface); }
          .rain-icon-consumer .neutral { color: var(--rain-color-text-secondary); background: var(--rain-color-surface-subtle); }
          .rain-icon-consumer .loading-icon { animation: rain-consumer-spin var(--rain-button-loading-duration) linear infinite; }
          @keyframes rain-consumer-spin { to { transform: rotate(360deg); } }
          @media (prefers-reduced-motion: reduce) { .rain-icon-consumer .loading-icon { animation: none; } }
          @media (max-width: 760px) { .rain-icon-consumer { padding: 16px; } .rain-icon-consumer .workspace { grid-template-columns: minmax(0, 1fr); } }
        `}</style>

        <header className="stack">
          <div className="row between">
            <h1 ref={headingRef} tabIndex={-1} data-focus="item">{page === "list" ? "课程管理" : "课程详情"}</h1>
            <Tag>本地交互演示</Tag>
          </div>
          <p className="muted">演示数据仅在当前页面保留；可创建课程、管理集合并体验发布反馈。</p>
        </header>

        {page === "detail" ? (
          <Surface as="section" className="section stack" style={{ marginTop: 16 }} aria-label="课程详情页">
            <h2>{selected?.title ?? "课程已不存在"}</h2>
            {selected && <>
              <p>计划课时：{selected.quantity}；{selected.inCollection ? "在当前集合中" : "尚未加入集合"}。</p>
              {selected.published ? <Tag tone="brand"><PublishedIcon /> 已发布</Tag> : <Tag>草稿</Tag>}
              <p className="rain-type-reading">本页介绍课程的教学目标、课程安排与学习要求。</p>
            </>}
            <div><Button onClick={() => setPage("list")}>返回课程管理</Button></div>
          </Surface>
        ) : (
          <div className="workspace">
            <Surface as="section" className="section stack full" aria-label="课程工具栏">
              <div className="row">
                <Input ref={searchRef} aria-label="搜索课程" placeholder="搜索课程名称" value={query} onValueChange={setQuery} prefix={<SearchIcon />} trailingAction={query ? <Button variant="text" leadingIcon={<CircleCloseIcon />} onClick={() => { setQuery(""); searchRef.current?.focus(); }}>清空</Button> : undefined} />
                <Button ref={filterTriggerRef} leadingIcon={<FilterIcon />} aria-haspopup="menu" aria-expanded={openMenu === "filter"} aria-controls="consumer-filter-menu" onClick={() => setOpenMenu(openMenu === "filter" ? null : "filter")}>筛选</Button>
                <Button leadingIcon={<Settings3Icon />} aria-expanded={panel === "settings"} aria-controls="consumer-panel" onClick={(event) => openPanel("settings", event.currentTarget)}>设置</Button>
                <Button leadingIcon={<RefreshIcon />} loading={busy === "refresh"} loadingLabel="刷新中" disabled={busy !== null && busy !== "refresh"} onClick={() => run("refresh")}>刷新</Button>
                <Button leadingIcon={<AddBoldIcon />} disabled={busy !== null} onClick={createCourse}>创建新课程</Button>
                <Button ref={moreTriggerRef} leadingIcon={<MoreHorizontalIcon />} aria-haspopup="menu" aria-expanded={openMenu === "more"} aria-controls="consumer-more-menu" onClick={() => setOpenMenu(openMenu === "more" ? null : "more")}>更多操作</Button>
              </div>
              {openMenu === "filter" && (
                <div ref={menuRef} id="consumer-filter-menu" className="menu" role="menu" aria-label="筛选课程" onKeyDown={onMenuKeyDown}>
                  {filters.map((item) => <Button key={item.value} variant="text" tone={filter === item.value ? "brand" : "default"} role="menuitemradio" tabIndex={-1} aria-checked={filter === item.value} leadingIcon={filter === item.value ? <CheckBoldIcon /> : undefined} onClick={() => { setFilter(item.value); closeMenu(); }}>{item.label}</Button>)}
                </div>
              )}
              {openMenu === "more" && (
                <div ref={menuRef} id="consumer-more-menu" className="menu" role="menu" aria-label="更多课程操作" onKeyDown={onMenuKeyDown}>
                  <Button variant="text" role="menuitem" tabIndex={-1} leadingIcon={<HelpIcon />} onClick={() => { setShowHelp(true); closeMenu(); }}>课程管理帮助</Button>
                  <Button variant="text" role="menuitem" tabIndex={-1} leadingIcon={<RefreshIcon />} onClick={() => { setQuery(""); setFilter("all"); setShowSummary(true); setFeedback("已恢复默认设置。"); closeMenu(); }}>恢复默认设置</Button>
                </div>
              )}
              <p className="muted">{filters.find((item) => item.value === filter)?.label}，共 {visible.length} 门。</p>
            </Surface>

            <Surface as="section" className={`section stack ${panel ? "" : "full"}`} aria-label="课程列表与操作">
              <ul className="course-list" aria-label="课程列表">
                {visible.map((course) => (
                  <li key={course.id} className="course" data-selected={course.id === selectedId}>
                    <div className="row between">
                      <Button variant="text" tone={course.id === selectedId ? "brand" : "default"} aria-pressed={course.id === selectedId} disabled={busy !== null} onClick={() => { setSelectedId(course.id); setPanel(null); }}>{course.title}</Button>
                      <div className="row">
                        {course.inCollection && <Tag>当前集合</Tag>}
                        {course.published ? <Tag tone="brand"><PublishedIcon /> 已发布</Tag> : <Tag>草稿</Tag>}
                      </div>
                    </div>
                    {showSummary && <p className="muted">计划 {course.quantity} 课时；{course.inCollection ? "已加入教学课程集合" : "独立课程，可加入集合"}。</p>}
                  </li>
                ))}
              </ul>
              {visible.length === 0 && <p className="status neutral"><InfoIcon />没有匹配课程，可清空搜索或调整筛选。</p>}

              {selected ? <div className="stack" aria-label={`操作课程 ${selected.title}`}>
                <h2>当前课程：{selected.title}</h2>
                <div className="row">
                  <Button variant="primary" leadingIcon={<EditPencilIcon />} disabled={busy !== null} onClick={(event) => openPanel("edit", event.currentTarget)}>编辑课程</Button>
                  <Button leadingIcon={<EditPencilFilledIcon />} disabled={busy !== null} onClick={(event) => openPanel("edit", event.currentTarget)}>编辑课程（实心）</Button>
                  <Button leadingIcon={<EditPencilIcon />} disabled>编辑课程（禁用）</Button>
                  <Button variant="text" trailingIcon={<ShareAltIcon />} onClick={() => { setPanel(null); setPage("detail"); }}>查看详情</Button>
                </div>
                <div className="row">
                  <Button leadingIcon={<AddCircleOutlineIcon />} disabled={selected.inCollection || busy !== null} onClick={() => { updateSelected({ inCollection: true }); setFeedback("已有课程已加入当前集合。"); }}>加入集合</Button>
                  <Button leadingIcon={<MinusCircleOutlineIcon />} disabled={!selected.inCollection || busy !== null} onClick={() => { updateSelected({ inCollection: false }); setFeedback("已移出集合，课程对象仍保留。"); }}>从集合移出</Button>
                  <Button tone="danger" leadingIcon={<DeleteIcon />} disabled={busy !== null} onClick={() => { setCourses((items) => items.filter((course) => course.id !== selectedId)); setSelectedId(null); setPanel(null); setFeedback("已删除课程对象，请选择其他课程。"); }}>删除课程</Button>
                </div>
                <div className="row" aria-label="计划课时数量">
                  <span>计划课时</span>
                  <Button leadingIcon={<MinusIcon />} disabled={selected.quantity <= 1 || busy !== null} onClick={() => updateSelected({ quantity: selected.quantity - 1 })}>减少</Button>
                  <output aria-live="polite">{selected.quantity}</output>
                  <Button leadingIcon={<AddIcon />} disabled={selected.quantity >= 99 || busy !== null} onClick={() => updateSelected({ quantity: selected.quantity + 1 })}>增加</Button>
                  <Button variant="primary" leadingIcon={<PublishIcon />} loading={busy === "publish"} loadingLabel="发布中" disabled={selected.published || (busy !== null && busy !== "publish")} onClick={() => run("publish")}>发布课程</Button>
                </div>
                <div>
                  <Button variant="text" leadingIcon={expanded ? <ArrowUpIcon /> : <ArrowDownIcon />} aria-label={expanded ? "收起课程安排" : "展开课程安排"} aria-expanded={expanded} aria-controls="consumer-outline" onClick={() => setExpanded(!expanded)}>课程安排</Button>
                  {expanded && <p id="consumer-outline" className="rain-type-reading" data-motion="region">课程分为准备、课堂实践和课后反馈三个阶段。</p>}
                </div>
                <div>
                  <p className="rain-type-reading">课程说明：通过课堂实践掌握教学设计方法。</p>
                  {moreExpanded && <p id="consumer-more-description" className="rain-type-reading" data-motion="region">完成课程后，可整理教学方案，并与同伴交流改进建议。</p>}
                  <Button variant="text" trailingIcon={moreExpanded ? <DoubleArrowUpIcon /> : <DoubleArrowDownIcon />} aria-expanded={moreExpanded} aria-controls="consumer-more-description" onClick={() => setMoreExpanded(!moreExpanded)}>{moreExpanded ? "收起" : "展开更多"}</Button>
                </div>
              </div> : <p className="status neutral"><InfoIcon />选择一门课程以继续操作。</p>}
            </Surface>

            {panel && <DensityProvider density="default" rainId="local-icon-consumer-panel-density">
              <Surface as="aside" id="consumer-panel" className="section stack" aria-label={panel === "edit" ? "编辑课程面板" : "课程设置面板"} onKeyDown={(event) => { if (event.key === "Escape") closePanel(); }}>
                <div className="row between">
                  <h2 ref={settingsHeadingRef} tabIndex={-1} data-focus="item">{panel === "edit" ? "编辑课程" : "课程设置"}</h2>
                  <Button variant="text" leadingIcon={<CloseIcon />} onClick={closePanel}>关闭面板</Button>
                </div>
                {panel === "edit" ? <>
                  <label htmlFor="consumer-course-title">课程名称</label>
                  <Input ref={editInputRef} id="consumer-course-title" value={draftTitle} onValueChange={(value) => { setDraftTitle(value); setEditError(false); }} status={editError ? "error" : "default"} aria-describedby={editError ? "consumer-title-error" : undefined} />
                  {editError && <p id="consumer-title-error" role="alert" className="status error"><CircleCloseIcon />请输入课程名称。</p>}
                  <Button variant="primary" onClick={() => { if (!draftTitle.trim()) { setEditError(true); return; } updateSelected({ title: draftTitle.trim() }); setFeedback("课程修改成功。"); closePanel(); }}>保存修改</Button>
                </> : <>
                  <label className="row"><input type="checkbox" data-focus="control" checked={showSummary} onChange={(event) => setShowSummary(event.currentTarget.checked)} />显示课程说明</label>
                  <p className="muted">默认显示说明、全部课程，并清空搜索条件。</p>
                  <Button leadingIcon={<RefreshIcon />} onClick={() => { setShowSummary(true); setQuery(""); setFilter("all"); setFeedback("已恢复默认设置。"); }}>恢复默认设置</Button>
                </>}
              </Surface>
            </DensityProvider>}

            <Surface as="section" className="section stack full" aria-label="课程状态与反馈">
              <h2>课程状态与反馈</h2>
              <p className="status success" role="status"><CircleCheckIcon />{feedback}</p>
              {busy && <p className="status neutral" role="status"><ButtonLoadingIcon className="loading-icon" />{busy === "publish" ? "课程正在发布" : busy === "retry" ? "正在重新加载课程封面" : "正在刷新课程"}，请稍候。</p>}
              <div className="row">
                <p className="status success"><CircleCheckIcon />课程信息正确</p>
                <p className="status success"><CircleCheckIcon />教学目标已完成</p>
              </div>
              {coverFailed ? <div className="status error" role="alert"><CircleCloseIcon /><span>课程封面加载失败（演示）。</span><Button leadingIcon={<RefreshIcon />} loading={busy === "retry"} loadingLabel="重试中" disabled={busy !== null && busy !== "retry"} onClick={() => run("retry")}>重试</Button></div> : <p className="status success"><CircleCheckIcon />课程封面加载成功</p>}
              <p className="status warning"><AlertCircleIcon />发布前请检查课程信息是否完整。</p>
              <p className="status neutral"><InfoIcon />课程加入集合后，原课程内容保持独立。</p>
              <div><Button variant="text" leadingIcon={<HelpIcon />} aria-expanded={showHelp} aria-controls="consumer-help" onClick={() => setShowHelp(!showHelp)}>帮助</Button></div>
              {showHelp && <p id="consumer-help" className="rain-type-reading">创建新课程会增加课程对象；加入集合只改变成员关系；删除课程会移除对象，从集合移出会保留课程。</p>}
            </Surface>
          </div>
        )}
      </main>
    </DensityProvider>
  );
}

export default Consumer;
