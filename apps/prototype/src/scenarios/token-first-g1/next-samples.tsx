import { useRef, useState } from "react";
import type { GroupImperativeHandle } from "react-resizable-panels";
import { Button, Dialog, IconButton, Tag, Tooltip, type TooltipPlacement } from "@rain-next/ui";
import { HelpIcon } from "@rain-next/ui/icons/help";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./resizable";

const explanation = "仅统计已提交的作答，未作答不计入平均分。";
function Help({ label = "成绩口径", long = false }: { label?: string; long?: boolean }) {
  return <Tooltip text={long ? `${explanation} 切换班级后，统计结果会重新计算。` : explanation} portal>
    <IconButton icon={<HelpIcon />} aria-label={label} size="32/18" />
  </Tooltip>;
}

function SplitSample({ kind, label, vertical = false }: { kind: "default" | "local" | "sibling" | "vertical"; label: string; vertical?: boolean }) {
  const groupRef = useRef<GroupImperativeHandle>(null);
  const first = `${kind}-answer`, second = `${kind}-rubric`;
  const initial = kind === "local" ? 65 : 55;
  return <section className="g1-next-split" aria-label={label}>
    <header><h3>{label}</h3><Button variant="text" size="regular" onClick={() => groupRef.current?.setLayout({ [first]: initial, [second]: 100 - initial })}>恢复比例</Button></header>
    <div className={vertical ? "g1-next-vertical" : "g1-next-horizontal"}><ResizablePanelGroup groupRef={groupRef} orientation={vertical ? "vertical" : "horizontal"}>
      <ResizablePanel id={first} defaultSize={`${initial}%`} minSize="25%" maxSize="75%">
        <div className="g1-next-pane"><div className="g1-next-pane-heading"><h3>示例作答</h3><Tag color="difficulty4">简答题</Tag></div>
          <p>物体保持静止或匀速直线运动，需要合外力为零。惯性是物体固有的属性，不能看作维持运动的力。</p>
          <p>判断运动状态是否变化，应分析合外力，而不是只看速度大小。</p>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle aria-label={vertical ? "调整上下内容高度" : "调整作答与评分依据宽度"} />
      <ResizablePanel id={second} minSize="25%">
        <div className="g1-next-pane"><h3>评分依据</h3><p>研究对象与现象说明</p><p>区分惯性与力</p><p>表达与适用条件</p></div>
      </ResizablePanel>
    </ResizablePanelGroup></div>
  </section>;
}

export function G1NextSamples({ changeTheme }: { changeTheme: () => void }) {
  return <>
    <section className="g1-section"><h2>就近解释，保持阅读连续</h2><p className="g1-support">悬停或聚焦帮助图标查看说明，按 Esc 关闭。重要规则仍保留在正文。</p>
      <div className="g1-next-tips">{["默认提示", "长文字换行", "未改兄弟提示"].map((label, index) =>
        <section className="g1-next-tip" aria-label={label} key={label}><h3>{label}</h3><div><span>平均成绩</span><Help long={index === 1} /></div><p>以当前筛选范围为准</p></section>
      )}</div>
      <Dialog.Root><Dialog.Trigger render={<Button variant="secondary" className="justify-self-start">弹窗内查看</Button>} /><Dialog.Content width={516}>
        <Dialog.Header><Dialog.Title>评分说明</Dialog.Title><Dialog.Description>查看成绩口径与评分依据。</Dialog.Description></Dialog.Header>
        <Dialog.Body><div className="g1-next-dialog-help"><span>平均成绩</span><Help label="弹窗成绩口径" /></div><Button variant="secondary" onClick={changeTheme}>切换主题</Button></Dialog.Body>
        <Dialog.Footer><Dialog.Close render={<Button>关闭说明</Button>} /></Dialog.Footer>
      </Dialog.Content></Dialog.Root>
      <TooltipExamples />
    </section>
    <section className="g1-section"><h2>把阅读空间留给当前任务</h2><p className="g1-support">拖动分隔条调整分区；也可聚焦分隔条，用方向键调整，Home / End 到达边界。</p>
      <SplitSample kind="default" label="默认分区" /><SplitSample kind="local" label="阅读优先局改" />
      <SplitSample kind="sibling" label="未改兄弟分区" /><SplitSample kind="vertical" label="上下分区" vertical />
    </section>
  </>;
}

const placements: TooltipPlacement[] = ["top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-start", "bottom", "bottom-end", "left-start", "left", "left-end"];
function TooltipExamples() {
  const [open, setOpen] = useState(false);
  return <details className="g1-next-tooltip-examples"><summary>查看方位与状态示例</summary>
    <div className="g1-next-tooltip-placements" aria-label="十二方位">{placements.map(placement =>
      <Tooltip text={`提示 · ${placement}`} placement={placement} key={placement}><Button variant="secondary">{placement}</Button></Tooltip>
    )}</div>
    <div className="g1-next-tooltip-options">
      <Tooltip text="没有箭头的短说明" showArrow={false}><Button variant="secondary">无箭头</Button></Tooltip>
      <Tooltip text=""><Button variant="secondary">空内容</Button></Tooltip>
      <Tooltip text="不会显示" disabled><Button variant="secondary">禁用提示</Button></Tooltip>
      <Tooltip text="由页面控制打开与关闭" open={open} onOpenChange={setOpen}><Button variant="secondary">受控提示</Button></Tooltip>
      <Button variant="text" onClick={() => setOpen(value => !value)}>切换受控提示</Button>
    </div>
  </details>;
}
