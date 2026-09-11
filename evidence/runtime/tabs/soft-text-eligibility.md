# Tabs Soft 浅灰文字限定用途

- 授权来源：用户在尺寸/外观讨论中明确保留 C 当前浅灰，并在计划交付后“开始实施”。
- 决定类型：`scopedEligibilityDecision`；`contrastException: false`。
- 组件/source/symbol：`ui-tabs`、`packages/ui/src/tabs/tabs.styles.ts`、`tabsPaints`。
- 范围：Soft 普通态与 Focus，未选中、未禁用、非 Hover、非 Pressed；仅 Label / Count。
- 真实用途保持：text / color / component-recipe / interactive / critical，不改为装饰或非交互。
- 唯一组合：Text/Neutral/4 + Fill/Neutral/Alpha/6 + Background/Neutral/1；Light / Dark。
- 不允许额外 alpha、alphaOperation、componentOpacity；不放行 Icon、More 或其他组件、其他状态/底面。
- 原始对比度 5.181 / 5.309，普通文字门槛仍为 4.5。验证器先执行原有颜色校验，只承接精确 Weak Neutral 用途错误；任何低于门槛的组合保持失败。

本用途判断基于明确的完整 Tabs 配方，仍受实际样式 literal、元数据、作用域和当前阶段登记共同约束。全局 `validateColorUse` 对一般 N4 交互用途的拒绝规则不变。实际浏览器合成与运行视觉待 TB-08；此文不是整组件 WCAG / 对比度 / 视觉验收。

C 的浅色选中描边作为辅助装饰保留，既有对填充 1.436 / 1.296、对底面 1.614 / 1.412 低于必要边界 3.0 的事实不被本裁决覆盖。Line 的必要选中指示线另行验证 3.0。
