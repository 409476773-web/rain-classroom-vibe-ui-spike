// Page-private local-experiment. The task data and selection belong to this host.
// Reuses the unpublished Rain Drawer/Parts; this example does not edit or publish tasks.
import { useEffect, useId, useRef, useState } from "react";
import {
  Button, Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, IconButton,
} from "@rain-next/ui";
import { ArrowLeftIcon } from "@rain-next/ui/icons/arrow-left";
import { ArrowRightIcon } from "@rain-next/ui/icons/arrow-right";
import { CloseIcon } from "@rain-next/ui/icons/close";
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

export function TaskDetailsDrawer() {
  const [open, setOpen] = useState(false), [current, setCurrent] = useState(0);
  const id = useId(), popupId = `${id}-details`, task = tasks[current] ?? tasks[0];
  const entries = useRef<(HTMLButtonElement | null)[]>([]);
  const close = useRef<HTMLButtonElement>(null), body = useRef<HTMLDivElement>(null);
  const previous = useRef<HTMLButtonElement>(null), next = useRef<HTMLButtonElement>(null);
  const navigation = useRef<"previous" | "next" | null>(null);

  useEffect(() => {
    if (body.current) body.current.scrollTop = 0;
    if (navigation.current === "next" && current === tasks.length - 1) previous.current?.focus();
    if (navigation.current === "previous" && current === 0) next.current?.focus();
    navigation.current = null;
  }, [current]);

  function showTask(index: number) {
    navigation.current = null;
    setCurrent(index);
    setOpen(true);
  }

  function step(direction: "previous" | "next") {
    const destination = current + (direction === "previous" ? -1 : 1);
    if (destination < 0 || destination >= tasks.length) return;
    navigation.current = direction;
    setCurrent(destination);
  }

  return <section className="g6-task-details-example" data-rain-id="prototype-task-details-drawer"
    data-asset-identity="local-experiment" data-open={open} aria-label="课前任务列表">
    <div className="g6-task-details-list-heading"><h3>课前任务</h3><span>{tasks.length}项</span></div>
    <ul className="g6-task-details-list">
      {tasks.map((entry, index) => <li key={entry.id} className="g6-task-details-row" data-current={open && index === current}>
        <span className="g6-task-details-meta">{entry.lesson}</span>
        <Button ref={element => { entries.current[index] = element; }} id={`${id}-${entry.id}`} className="g6-task-details-entry"
          variant="text" size="regular" aria-label={`查看任务：${entry.title}`} aria-haspopup="dialog"
          aria-controls={open ? popupId : undefined} aria-expanded={open && index === current}
          aria-current={open && index === current ? "true" : undefined} onClick={() => showTask(index)}>
          {entry.title}
        </Button>
        <p className="g6-task-details-summary">{entry.summary}</p>
        <div className="g6-task-details-row-footer"><span>{entry.format} · {entry.status}</span>
          {open && index === current && <span className="g6-task-details-current">正在查看</span>}
        </div>
      </li>)}
    </ul>
    <Drawer open={open} modal={false} disablePointerDismissal swipeDirection="right"
      triggerId={`${id}-${task.id}`} onOpenChange={setOpen}>
      <DrawerContent id={popupId} className="g6-task-details-panel" initialFocus={close}
        finalFocus={() => entries.current[current]}>
        <DrawerHeader className="g6-task-details-header"><div className="g6-task-details-heading">
          <DrawerTitle>{task.title}</DrawerTitle><DrawerDescription>{task.lesson}</DrawerDescription>
        </div><DrawerClose render={<IconButton ref={close} size="36/20" icon={<CloseIcon />} aria-label="关闭任务详情" />} /></DrawerHeader>
        <DrawerBody ref={body} className="g6-task-details-body" data-base-ui-swipe-ignore="">
          <dl className="g6-task-details-facts">
            <div><dt>完成方式</dt><dd>{task.format}</dd></div><div><dt>任务状态</dt><dd>{task.status}</dd></div>
            <div><dt>完成时间</dt><dd>{task.due}</dd></div><div><dt>预计用时</dt><dd>{task.duration}</dd></div>
          </dl>
          <article className="g6-task-details-reading"><h3>任务要求</h3>
            {task.instructions.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <h3>准备清单</h3><ul>{task.checklist.map(item => <li key={item}>{item}</li>)}</ul>
            <h3>带来课堂的内容</h3><p>{task.deliverable}</p>
          </article>
        </DrawerBody>
        <DrawerFooter className="g6-task-details-footer">
          <Button ref={previous} variant="secondary" size="medium" leadingIcon={<ArrowLeftIcon />}
            disabled={current === 0} onClick={() => step("previous")}>前一项</Button>
          <span className="g6-task-details-position" role="status" aria-label={`第${current + 1}项，共${tasks.length}项`}>{current + 1} / {tasks.length}</span>
          <Button ref={next} variant="secondary" size="medium" trailingIcon={<ArrowRightIcon />}
            disabled={current === tasks.length - 1} onClick={() => step("next")}>后一项</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </section>;
}
