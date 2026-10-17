# ADR 0008：Tabs 使用 Base UI 与有限原生适配

- 日期：2026-09-10
- 状态：accepted-for-current-workspace-implementation
- 授权：用户在实施计划交付后明确“开始实施”。
- 依据：[实施计划 TB-01](../plans/2026-09-10-tabs-implementation.md)、[技术预验证](../../evidence/runtime/tabs/preflight.md)。

选择已安装的 `@base-ui/react` 1.8.0 Tabs，More 复用 Rain `DropdownMenu`，完整名称使用 Tabs 私有 Tooltip。没有新增依赖；公共导入仅限 `packages/ui/src/tabs/tabs.tsx` 的 `@base-ui/react/tabs` 和 `packages/ui/src/tabs/tabs-full-label.tsx` 的 `@base-ui/react/tooltip`。小样许可在迁移正式断言后撤回。

Base UI 拥有正常可见项的 roving focus、方向键、Home/End、循环、manual/automatic 激活及 Panel 关联。Rain 只拥有公开 items 的接受值、Panel 子树访问记录、连续溢出区间，以及以下有限适配：

1. Base Tabs 把禁用项设计为可聚焦；`useButton` 会移除按钮本身的 disabled。每项使用 `fieldset role="presentation" disabled`、`display:contents` 包含唯一实际 button，继承原生 `:disabled`，使 Base 自己跳过禁用项。不修改依赖、私有属性或注册器。
2. Base 的初始 selected+disabled / 动态禁用可能没有可用 Tab stop。布局提交后读取实际可见启用元素，仅在没有可用入口时临时给首项 `tabIndex=0`；布局变化或 Tab 获得焦点时撤销临时入口，由 Base 接回。只有一个临时元素 ref，没有第二套 roving index，也不主动抢外部焦点。
3. More 边界仅显露全原序中的隐藏目标，再于本次布局更新完成后聚焦。隐藏 Tab 继续注册，Panel 外壳稳定；业务子树仅在实际接受选择后创建。
4. Tooltip Trigger 与 Tab 合成一个 button，测量真实截断后启用；Popup 显式声明 `role="tooltip"`。显露后的聚焦排在截断测量提交之后，避免首次聚焦漏提示。可访问名称已提供全文，数量描述独立保留。
5. 禁用全文通过列表外原生“分区说明”入口读取；不为每个普通 Tab 增加另一个键盘停靠点。

14 项 Chromium 小样检查已通过，含初始/动态禁用、恢复时单一入口、More 窗口入口、受控延迟、取消按压、Tooltip、三档点击区域和四向 Focus。该结果只选择实施路线；公共 Tabs、完整尺寸/外观矩阵、颜色消费者和真实辅助技术仍需按后续任务验证。当前未验证其他浏览器或真实屏幕阅读器，不构成运行视觉 Human Gate。
