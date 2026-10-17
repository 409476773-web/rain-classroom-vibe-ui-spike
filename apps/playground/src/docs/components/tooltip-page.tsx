import { useState } from "react";
import { Button, Dialog, IconButton, Tooltip, type TooltipPlacement } from "@rain-next/ui";
import { HelpIcon } from "@rain-next/ui/icons/help";
import { ComponentDoc, DocExample } from "./component-doc";
import "./g1-component-pages.css";

const explanation = "仅统计已提交的作答，未作答不计入平均分。";
const code = `import { Tooltip, IconButton } from "@rain-next/ui";
import { HelpIcon } from "@rain-next/ui/icons/help";

<Tooltip text="仅统计已提交的作答。" portal>
  <IconButton aria-label="成绩口径" icon={<HelpIcon />} />
</Tooltip>`;

export function TooltipPage() {
  const [open, setOpen] = useState(false);
  return <ComponentDoc id="tooltip" title="Tooltip 文字提示" description="就近提供简短的补充解释，鼠标悬停或键盘聚焦时显示。"
    status="共享候选 · 当前视觉与默认下方交互已确认 · 尚未发布"
    useWhen={["解释邻近按钮或术语，内容为纯文字。", "保持原操作名称与点击事件。"]}
    avoidWhen={["富内容、按钮或固定查看使用 Popover。", "必须阅读的说明、错误和状态留正文。", "children 必须是单个真实可聚焦元素，不能是 Fragment；自定义组件转发 ref 和事件。"]}
    props={[
      { name: "text", type: "string", description: "只支持纯文字；空白文本不打开。" },
      { name: "children", type: "ReactElement", description: "单个可聚焦触发元素，保留名称、事件与已有描述。" },
      { name: "placement", type: "TooltipPlacement（12 方位）", default: '"bottom"', description: "四边及 start/end；空间不足时翻转或位移。" },
      { name: "showArrow", type: "boolean", default: "true", description: "是否显示三角箭头。" },
      { name: "open / defaultOpen / onOpenChange", type: "boolean / boolean / callback", default: "defaultOpen=false", description: "受控状态或非受控初值。" },
      { name: "disabled", type: "boolean", default: "false", description: "仅禁用提示，不禁用业务按钮。" },
      { name: "openDelay / closeDelay", type: "number", default: "100 / 100ms", description: "有限非负数；键盘焦点立即打开。" },
      { name: "portal / portalTarget", type: "boolean / HTMLElement | (() => HTMLElement | null)", default: "false", description: "默认就近挂载；避开裁切时用 Portal，空目标回退 body。" },
    ]} slots={["单个触发元素", "纯文字提示", "可选箭头"]} source="packages/ui/src/tooltip/tooltip.tsx" code={code}>
    <DocExample title="默认、长文本与关闭" description="默认在下方；移入提示保持显示，Escape、Tab 或失焦关闭。亮暗主题都沿用 Classic 的固定深底白字。">
      <div className="g1-doc-row"><Tooltip text={explanation}><IconButton aria-label="成绩口径" icon={<HelpIcon />} /></Tooltip>
        <Tooltip text={`${explanation} 切换班级后，统计结果会按当前班级重新计算。`} portal><Button variant="secondary">长文本换行</Button></Tooltip>
        <Tooltip text={explanation} showArrow={false}><Button variant="secondary">无箭头</Button></Tooltip></div>
    </DocExample>
    <DocExample title="十二方位" description="方位是首选位置，靠近视口边缘时仍由引擎处理碰撞。">
      <div className="g1-doc-row">{(["top", "top-start", "top-end", "right", "right-start", "right-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end"] as const).map((placement: TooltipPlacement) =>
        <Tooltip key={placement} text={explanation} placement={placement} portal><Button variant="secondary">{placement}</Button></Tooltip>)}</div>
    </DocExample>
    <DocExample title="受控与禁用" description="受控模式由宿主保存打开状态；disabled 只禁止提示，触发按钮仍可操作。" code={`const [open, setOpen] = useState(false);
<Tooltip text="成绩口径" open={open} onOpenChange={setOpen}>…</Tooltip>`}>
      <div className="g1-doc-row"><Button variant="secondary" aria-pressed={open} onClick={() => setOpen(value => !value)}>{open ? "关闭受控提示" : "打开受控提示"}</Button>
        <Tooltip text={explanation} open={open} onOpenChange={setOpen} portal><Button variant="secondary">受控触发器</Button></Tooltip>
        <Tooltip text={explanation} disabled><Button variant="secondary">提示已禁用</Button></Tooltip>
        <Tooltip text="   "><Button variant="secondary">空白内容</Button></Tooltip></div>
    </DocExample>
    <DocExample title="对话框中的 Portal" description="提示继承触发器的主题与密度，并显示在当前对话框之上。">
      <Dialog.Root><Dialog.Trigger render={<Button variant="secondary">打开对话框示例</Button>} /><Dialog.Content>
        <Dialog.Header><Dialog.Title>成绩说明</Dialog.Title><Dialog.Description>这是本地展示，不会发布成绩。</Dialog.Description></Dialog.Header>
        <Dialog.Body><div className="g1-doc-row"><span>平均分口径</span><Tooltip text={explanation} portal><IconButton aria-label="对话框中的成绩口径" icon={<HelpIcon />} /></Tooltip></div></Dialog.Body>
        <Dialog.Footer><Dialog.Close render={<Button variant="secondary">关闭</Button>} /></Dialog.Footer>
      </Dialog.Content></Dialog.Root>
    </DocExample>
  </ComponentDoc>;
}
