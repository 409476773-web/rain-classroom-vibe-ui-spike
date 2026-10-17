# Tooltip 文字提示

`registry-candidate`，未发布；继承 Rain Classic 已确认视觉，当前视觉与默认下方交互已获用户确认（2026-09-20）。

```tsx
import { Tooltip, IconButton } from "@rain-next/ui";
import { HelpIcon } from "@rain-next/ui/icons/help";
<Tooltip text="仅统计已提交的作答。" portal>
  <IconButton aria-label="成绩口径" icon={<HelpIcon />} />
</Tooltip>
```

text 只允许纯文本。children 必须是单个真实可聚焦元素，自定义组件转发 ref 和事件。原名称、点击事件与已有 aria-describedby 保留。默认100ms悬停开关延时；键盘焦点立即打开，Escape/Tab/失焦关闭，移入内容保持。

默认下方，顺应从上到下、从左到右的阅读顺序；下方空间不足时才自动换位。placement 支持显式选择四边与 start/end 共12方位，保留碰撞翻转/位移；showArrow=false 隐藏箭头。open/onOpenChange 为宿主受控模式，defaultOpen 为非受控初值。disabled 只禁止提示，不禁用业务按钮；空白 text 不打开。延时必须是有限非负数。

默认就近挂载；Base UI 需要Portal上下文，因此挂载到触发元素后的 display:contents 容器，无可见包装或额外Tab Stop。需要避开裁切时用 portal；portalTarget 接受元素或返回元素的函数，空目标回退到 body。全部定位及交互状态由Base UI管理。

固定 #2F3545 / 白字在 Light/Dark 一致，14/20、左右16/上下7、圆角6、250px上限、14×6三角箭头，无边框/阴影。强制颜色模式服从系统颜色。富内容或点击固定使用Popover，必须阅读的内容留正文。

Token源：packages/foundations/src/tooltip-token-contract.ts。来源、验证及范围：evidence/runtime/tooltip-classic/verification.md。
