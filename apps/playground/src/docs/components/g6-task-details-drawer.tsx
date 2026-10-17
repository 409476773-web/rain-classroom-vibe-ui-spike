// Page-private local-experiment. The task data and selection belong to this host.
// Reuses the unpublished Rain Drawer/Parts; this example does not edit or publish tasks.
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import {
  Button, defineRainLocalRecipe, Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, IconButton, Table, TableBody, TableCaption,
  TableCell, TableHead, TableHeader, TableRow, TableScrollArea,
} from "@rain-next/ui";
import { ArrowLeftIcon } from "@rain-next/ui/icons/arrow-left";
import { ArrowRightIcon } from "@rain-next/ui/icons/arrow-right";
import { CloseIcon } from "@rain-next/ui/icons/close";
import { DrawerWidthControl, type DrawerWidthControlHandle } from "./g6-drawer-width-control";
import "./g6-task-details-drawer.css";

// Arrow left/right are available catalog assets chosen for this local sequence;
// their use here does not establish a new global semantic icon rule.
const tasks = [
  {
    id: "observe-question", title: "找一个值得追问的问题", lesson: "第04讲 · 观察与追问",
    format: "个人记录", status: "待开始", due: "10月15日 09:00 前", duration: "约15分钟",
    summary: "从课程导读中选择一个尚未得到解释的现象。",
    instructions: [
      "阅读课程导读，记录一个尚未得到解释的现象。先写清楚看见的事实，再写下你想继续追问的问题。",
      "问题可以具体到一个细节，例如：同样的条件下，为什么会出现不同的结果？带着记录来课堂，与同伴交换观察。",
    ],
    checklist: ["写下一条具体观察。", "提出一个可以继续讨论的问题。", "注明观察或材料的来源。"],
    deliverable: "一段观察记录和一个问题，课堂上分享。",
  },
  {
    id: "compare-explanations", title: "比较两种解释", lesson: "第05讲 · 证据与解释",
    format: "小组讨论", status: "进行中", due: "10月16日 09:00 前", duration: "约25分钟",
    summary: "对照两份材料，找出解释的共同点与分歧。",
    instructions: [
      "与小组同伴阅读两份针对同一现象的解释。先分别概括它们的判断，避免直接把自己的结论当作材料中的原意。",
      "列出两种解释共同认可的事实，区分观点与证据。遇到意见不一致的地方，说明分歧来自观察不同、材料不同，还是对同一证据作出了不同理解。",
      "核对证据的来源和收集条件。一份材料中的结论不一定适用于另一个情境，讨论时要保留时间、样本和观察方法等背景。",
      "寻找每种解释尚不能回答的问题。不要只选取支持自己观点的片段；如果有相反材料，也要把它列入比较，并讨论它会怎样影响原来的判断。",
      "提出一个能够帮助区分两种解释的新观察。写清楚需要观察什么、怎样记录，以及什么样的结果会支持其中一种解释。",
      "整理小组的讨论过程。保留大家共同认可的事实，也保留尚未达成一致的判断，并分别注明依据，让课堂讨论可以从这些具体线索继续。",
      "最后检查比较表是否表达了两份材料的完整意思。暂时无法确认的部分可以写成待验证的问题，不必为了快速得到结论而省略分歧。",
    ],
    checklist: ["分别概括两种解释。", "标出共同事实与不同判断。", "提出一项新的观察方法。"],
    deliverable: "一份比较记录，包含证据来源和仍需验证的问题。",
  },
  {
    id: "share-evidence", title: "带着证据分享你的判断", lesson: "第06讲 · 表达与回应",
    format: "课堂分享", status: "已完成", due: "10月17日 09:00 前", duration: "约10分钟",
    summary: "用具体证据说明判断，并准备回应同伴的追问。",
    instructions: [
      "回看前两次任务中的观察与比较记录，选择一个目前最有把握的判断。用一段简短的分享说明问题、证据和结论之间的关系。",
      "同时介绍这份证据的限制，以及出现什么新信息时你会调整结论。为同伴准备一个讨论问题，记录他们的回应。",
    ],
    checklist: ["选择一条有证据支持的判断。", "说明证据的限制。", "准备一个向同伴提问的问题。"],
    deliverable: "两分钟课堂分享提纲。",
  },
] as const;

const groupRecords = [
  ["第1组", "4人", "4 / 4", "100%", "3条追问", "10-14 17:06", "课程导读、观察记录", "已反馈"],
  ["第2组", "5人", "4 / 5", "80%", "2条追问", "10-14 17:18", "课程导读、案例材料", "待反馈"],
  ["第3组", "4人", "3 / 4", "75%", "1条追问", "10-14 17:32", "观察记录、访谈", "待反馈"],
  ["第4组", "4人", "4 / 4", "100%", "4条追问", "10-14 18:03", "课程导读、观察记录", "已反馈"],
  ["第5组", "5人", "5 / 5", "100%", "2条追问", "10-14 18:16", "案例材料、观察记录", "已反馈"],
  ["第6组", "4人", "2 / 4", "50%", "1条追问", "10-14 18:25", "课程导读", "待反馈"],
  ["第7组", "4人", "4 / 4", "100%", "3条追问", "10-14 18:40", "课程导读、访谈", "已反馈"],
  ["第8组", "5人", "3 / 5", "60%", "2条追问", "10-14 18:52", "案例材料、访谈", "待反馈"],
] as const;
const tableColumns = ["小组", "成员", "已提交", "完成率", "课堂参与", "提交时间", "证据来源", "教师反馈"];

const taskRowRecipe = defineRainLocalRecipe({
  id: "task-details-row", scope: "feature", origin: "ui-button",
  classes: { root: "g6-task-details-entry", label: "g6-task-details-entry-label" },
  modifiedParts: ["root", "label"], candidateTokens: [], promotionStatus: "not-proposed",
} as const);

export function TaskDetailsDrawer() {
  const [open, setOpen] = useState(false), [current, setCurrent] = useState(0);
  const [fullByTask, setFullByTask] = useState<Record<number, boolean>>({});
  const [allGroups, setAllGroups] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const narrow = viewportWidth <= 768;
  const [maximumWidth, setMaximumWidth] = useState(() => Math.max(360, Math.min(960, window.innerWidth - 304)));
  const [width, setWidth] = useState(() => Math.min(480, Math.max(360, window.innerWidth - 304)));
  const [reserved, setReserved] = useState(0);
  const id = useId(), popupId = id + "-details", listId = id + "-list", task = tasks[current] ?? tasks[0];
  const full = Boolean(fullByTask[current]);
  const widthControl = useRef<DrawerWidthControlHandle>(null);
  const host = useRef<HTMLElement>(null);
  const entries = useRef<(HTMLButtonElement | null)[]>([]);
  const close = useRef<HTMLButtonElement>(null), body = useRef<HTMLDivElement>(null);
  const previous = useRef<HTMLButtonElement>(null), next = useRef<HTMLButtonElement>(null);
  const navigation = useRef<"previous" | "next" | null>(null);
  const scrollByTask = useRef<Record<number, number>>({});
  const tableScrollLeft = useRef(0);
  const normalWidth = Math.min(480, maximumWidth);
  const expanded = width > normalWidth + 1;

  useLayoutEffect(() => {
    const node = host.current;
    if (!node || !open || narrow) { setReserved(0); return; }
    const sync = () => {
      const rect = node.getBoundingClientRect();
      // Keep 280px of readable list and a 24px gutter, measured from the real host.
      const maximum = Math.max(360, Math.min(960, window.innerWidth - rect.left - 280 - 24));
      setMaximumWidth(maximum);
      const actualWidth = Math.max(360, Math.min(width, maximum));
      setWidth(value => Math.abs(value - actualWidth) > 0.5 ? actualWidth : value);
      const overlap = open ? Math.max(0, rect.right - (window.innerWidth - actualWidth)) : 0;
      const reserve = Math.min(overlap > 0 ? overlap + 24 : 0, Math.max(0, rect.width - 280));
      setReserved(value => Math.abs(value - reserve) > 0.5 ? reserve : value);
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(node);
    return () => observer.disconnect();
  }, [open, narrow, width, viewportWidth]);

  useEffect(() => {
    const sync = () => {
      if (window.innerWidth <= 768 && document.activeElement instanceof HTMLElement &&
        document.activeElement.closest('[data-rain-id="prototype-drawer-width-control"]')) close.current?.focus();
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    if (body.current) body.current.scrollTop = scrollByTask.current[current] ?? 0;
    if (navigation.current === "next" && current === tasks.length - 1) previous.current?.focus();
    if (navigation.current === "previous" && current === 0) next.current?.focus();
    navigation.current = null;
  }, [current, open]);

  function rememberScroll() {
    if (body.current) scrollByTask.current[current] = body.current.scrollTop;
  }

  function showTask(index: number) {
    if (open && index === current) return;
    rememberScroll();
    navigation.current = null;
    if (!open && !narrow) setWidth(normalWidth);
    setCurrent(index);
    setOpen(true);
  }

  const changeWidth = useCallback((pixels: number) => {
    if (!Number.isFinite(pixels) || pixels <= 0) return;
    setWidth(value => Math.abs(value - pixels) > 0.5 ? pixels : value);
  }, []);

  function toggleWidth() {
    const target = expanded ? normalWidth : maximumWidth;
    setWidth(target);
    widthControl.current?.setWidth(target);
  }

  function step(direction: "previous" | "next") {
    const destination = current + (direction === "previous" ? -1 : 1);
    if (destination < 0 || destination >= tasks.length) return;
    rememberScroll();
    navigation.current = direction;
    setCurrent(destination);
  }

  return <section ref={host} id={listId} className="g6-task-details-example" data-rain-id="prototype-task-details-drawer"
    data-asset-identity="local-experiment" data-open={open} aria-label="课前任务列表"
    style={{ "--rain-local-task-details-reserve": reserved + "px" } as CSSProperties}>
    <div className="g6-task-details-list-heading"><h3>课前任务</h3><span>{tasks.length}项</span></div>
    <p className="g6-task-details-note">选择任务查看详情，可连续切换。任务及小组完成数据均为示例。</p>
    <ul className="g6-task-details-list">
      {tasks.map((entry, index) => <li key={entry.id} className="g6-task-details-row" data-current={open && index === current}>
        <Button ref={element => { entries.current[index] = element; }} id={id + "-" + entry.id}
          localRecipe={taskRowRecipe} variant="text" tone="default" size="regular"
          aria-label={"查看任务：" + entry.title} aria-haspopup="dialog"
          aria-controls={open ? popupId : undefined} aria-expanded={open && index === current}
          aria-current={open && index === current ? "true" : undefined} onClick={() => showTask(index)}>
          <span className="g6-task-details-meta">{entry.lesson}</span>
          <span className="g6-task-details-entry-title">{entry.title}</span>
          <span className="g6-task-details-summary">{entry.summary}</span>
          <span className="g6-task-details-row-footer">{entry.format} · {entry.status}</span>
        </Button>
      </li>)}
    </ul>
    <Drawer open={open} modal={narrow} disablePointerDismissal swipeDirection="right" showSwipeHandle={false}
      triggerId={id + "-" + task.id} onOpenChange={value => { if (!value) rememberScroll(); setOpen(value); }}>
      <DrawerContent id={popupId} className="g6-task-details-panel" initialFocus={close}
        style={{ "--drawer-content-width": narrow ? "100vw" : width + "px" } as CSSProperties}
        finalFocus={() => entries.current[current]}>
        <DrawerHeader className="g6-task-details-header" data-base-ui-swipe-ignore="">
          <div className="g6-task-details-title-row">
            <DrawerTitle>{task.title}</DrawerTitle>
            <div className="g6-task-details-actions">
              {!narrow && maximumWidth > normalWidth + 1 &&
                <Button variant="text" tone="default" size="regular" aria-label={expanded ? "收起宽度" : "展开宽度"}
                  aria-pressed={expanded} onClick={toggleWidth}>{expanded ? "标准宽度" : "加宽"}</Button>}
              <DrawerClose render={<IconButton ref={close} size="36/20" icon={<CloseIcon />} aria-label="关闭任务详情" />} />
            </div>
          </div>
          <DrawerDescription>{task.lesson}</DrawerDescription>
        </DrawerHeader>
        <DrawerBody ref={body} className="g6-task-details-body" data-base-ui-swipe-ignore="">
          <dl className="g6-task-details-facts">
            <div><dt>完成方式</dt><dd>{task.format}</dd></div><div><dt>任务状态</dt><dd>{task.status}</dd></div>
            <div><dt>完成时间</dt><dd>{task.due}</dd></div><div><dt>预计用时</dt><dd>{task.duration}</dd></div>
          </dl>
          <article className="g6-task-details-reading">
            <div className="g6-task-details-section-heading"><h3>任务要求</h3>
              <Button variant="text" tone="default" size="regular" aria-expanded={full} aria-controls={id + "-requirements"}
                onClick={() => setFullByTask(value => ({ ...value, [current]: !value[current] }))}>{full ? "收起要求" : "展开完整要求"}</Button>
            </div>
            <div id={id + "-requirements"} className="g6-task-details-content">
              {(full ? task.instructions : task.instructions.slice(0, 1)).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {full && <><h3>准备清单</h3><ul>{task.checklist.map(item => <li key={item}>{item}</li>)}</ul>
                <h3>带来课堂的内容</h3><p>{task.deliverable}</p></>}
            </div>
          </article>
          {current === 1 && <TaskCompletionTable allGroups={allGroups} onToggle={() => setAllGroups(value => !value)}
            initialScrollLeft={tableScrollLeft.current} onScrollLeftChange={value => { tableScrollLeft.current = value; }} />}
        </DrawerBody>
        <DrawerFooter className="g6-task-details-footer">
          <nav className="g6-task-details-navigation" aria-label="切换任务">
            <Button ref={previous} variant="text" tone="default" size="regular" leadingIcon={<ArrowLeftIcon />}
              disabled={current === 0} onClick={() => step("previous")}>前一项</Button>
            <span className="g6-task-details-position" role="status" aria-label={"第" + (current + 1) + "项，共" + tasks.length + "项"}>{current + 1} / {tasks.length}</span>
            <Button ref={next} variant="text" tone="default" size="regular" trailingIcon={<ArrowRightIcon />}
              disabled={current === tasks.length - 1} onClick={() => step("next")}>后一项</Button>
          </nav>
        </DrawerFooter>
      </DrawerContent>
      <DrawerWidthControl open={open && !narrow} width={width} maxWidth={maximumWidth} onWidthChange={changeWidth}
        listId={listId} popupId={popupId} controlRef={widthControl} />
    </Drawer>
  </section>;
}

function TaskCompletionTable({ allGroups, onToggle, initialScrollLeft, onScrollLeftChange }: {
  allGroups: boolean; onToggle: () => void; initialScrollLeft: number; onScrollLeftChange: (value: number) => void;
}) {
  const scroll = useRef<HTMLDivElement>(null);
  const table = useRef<HTMLTableElement>(null);
  const id = useId();
  const [overflow, setOverflow] = useState({ wide: false, start: true, end: true });
  useLayoutEffect(() => {
    if (scroll.current) scroll.current.scrollLeft = initialScrollLeft;
  }, [initialScrollLeft]);
  const syncOverflow = useCallback(() => {
    const node = scroll.current;
    if (!node) return;
    const next = { wide: node.scrollWidth > node.clientWidth + 1, start: node.scrollLeft < 1,
      end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 1 };
    setOverflow(value => value.wide === next.wide && value.start === next.start && value.end === next.end ? value : next);
  }, []);
  useLayoutEffect(() => {
    syncOverflow();
    const observer = new ResizeObserver(syncOverflow);
    if (scroll.current) observer.observe(scroll.current);
    if (table.current) observer.observe(table.current);
    return () => observer.disconnect();
  }, [syncOverflow, allGroups]);
  return <section className="g6-task-details-completion" aria-labelledby={id + "-heading"}>
    <div className="g6-task-details-section-heading"><h3 id={id + "-heading"}>小组完成明细</h3>
      <Button variant="text" tone="default" size="regular" aria-expanded={allGroups} aria-controls={id + "-rows"}
        onClick={onToggle}>{allGroups ? "返回3组预览" : "查看全部8组"}</Button>
    </div>
    <p className="g6-task-details-table-help" id={id + "-help"}>
      {allGroups ? "全部8组" : "预览3组，共8组"} · 8列 · 示例数据
      {overflow.wide && <span> · 左右滚动查看更多列</span>}
    </p>
    <div className="g6-task-details-table-frame" data-overflow-start={overflow.wide && !overflow.start}
      data-overflow-end={overflow.wide && !overflow.end}>
      <TableScrollArea ref={scroll} aria-label="小组完成明细横向滚动区" aria-describedby={id + "-help"}
        onScroll={() => { syncOverflow(); if (scroll.current) onScrollLeftChange(scroll.current.scrollLeft); }} className="g6-task-details-table-scroll">
        <Table ref={table} className="g6-task-details-table" aria-label="小组完成明细">
          <TableCaption className="g6-task-details-sr-only">小组完成数据（示例）</TableCaption>
          <TableHeader><TableRow>{tableColumns.map(column => <TableHead key={column}>{column}</TableHead>)}</TableRow></TableHeader>
          <TableBody id={id + "-rows"}>{(allGroups ? groupRecords : groupRecords.slice(0, 3)).map(row => <TableRow key={row[0]}>{row.map((value, index) => <TableCell key={index}>{value}</TableCell>)}</TableRow>)}</TableBody>
        </Table>
      </TableScrollArea>
    </div>
  </section>;
}
