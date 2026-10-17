# v1.2 G1 续批：Tooltip / Resizable

2026-09-20 用户“确定。继续按照 新版工作包 中的计划，开始推进下一步”授权接续。遵循主工作区 docs/rain-next-v1.2-token-first/01-CODEX-EXECUTION.md 的 G1 剩余两项；当前 card-v2 已有成果与旧 Gate 保留。本次确认只用于继续已规划的来源适配，不替代本批新组件视觉验收。Switch 组件建设另有已完成的共享实现，本次补做 G1 消费替换。

模式：Tooltip/Resizable 局部实现为 Prototype Mode / local-experiment；Switch 消费替换沿用已完成的 System Mode 组件实现，仅同步其公开入口与语义 Token，不重新设计共享契约。不进入公共 Registry，不改已确认工作台/报告。

## Switch 消费替换 · 2026-09-20

用户明确要求将示例页面中的 Switch 替换为已建设完成的规范组件。当前原型唯一的页面消费入口为 `token-first-g1`：工具栏三组筛选开关与底部禁用示例统一改用 `@rain-next/ui` 的 `Switch`，保留宿主标签与 4px 标签间距；旧 local adapter 仅保留给来源适配回归，不再由页面渲染。共享组件的视觉/对比度验收仍沿其自身 Gate 记录，不在本次页面替换中提前关闭。

目标和范围：复用固定 shadcn-ui/ui@3ba91b1 的 Base UI Tooltip 与 Resizable 作者源码、同提交 Nova 样式和 MIT。Tooltip 复用现有 Base UI 1.8.0 与内部 Popup 主题/密度桥；Resizable 沿上游依赖接入固定 react-resizable-panels 4.12.4（MIT，React 18/19，无额外运行依赖），仅原型应用声明，不升级既有依赖。取得原文和校验值后实施；无另写交互引擎。

1. 固定来源/基线；增加行为浏览器检查并确认尚无样例时失败。
2. 适配两个局部源码入口，加入 #token-first-g1-next 的默认/局改/兄弟实例，横向/纵向调节及恢复默认。为窄屏保留内容滚动/最小尺寸。
3. 检查 Tooltip hover/focus/Escape、描述关系、移入提示、动态主题、Dialog 内叠放；Resizable 拖动/键盘/上下限/恢复、实例隔离、窄屏和强制颜色。类型/构建/原样板回归，真实看截图，写回当前阶段和使用入口。

设计依据：现有 Tabs Tooltip 是截断文字专用，不替换；现有 Report/teacher-grading 不作为新组件试验面。采用设计方法 V04（提示与主体层级）、V05（保留行为的最小改造）、D01（同任务共享表面）；沿已确认组合样板的字号/表面关系。默认/局改仅比较提示宽度与分区比例，不重新开启工作台/报告布局选择。

未验证假设：新引擎在实际构建中满足键盘、窄屏与最小尺寸；完整读屏/物理触摸不以浏览器自动检查替代。F07 只记录本批消费者；不新增断点或 z-index 系统。验证结果与原有全库治理失败分开。

## 续批视觉反馈：2026-09-20

用户要求握柄调浅、整条分割线 hover 变色。Prototype Mode：只改本地 Resizable 样式与现有样例验证，同步精确颜色证据；保留约定的 12px 尺寸与拖动实现。采用 V04 降低握柄的阅读干扰、V05 保留行为并让完整命中区有反馈。默认 Icon/Neutral/3，悬停/键盘焦点/引擎 active 时整条背景 Background/Neutral/4；横向、纵向、双主题实测，保持现有 3:1 操作标记检查。新视觉待确认。

实测发现引擎 inline flex-basis:auto 覆盖了预期分割区尺寸，改用 width/height 恢复约定尺寸；端部命中和持续拖动检查均通过。

最新反馈覆盖此前 12px 视觉选择：分割线恢复之前实测的 2px 细度，保留较浅握柄、全长 hover/focus/active 反馈与引擎原拖动行为。横向、纵向均测量实际细度并验证端部悬停。
