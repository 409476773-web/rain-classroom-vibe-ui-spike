# ADR 0005：下拉家族的单一 Headless 底座

日期：2026-09-09。范围：用户授权的第一批局部实验；不推进 Spike 日程，不授权公共组件实现或现有 Select / Dialog 迁移。

## 决定

选择 **Base UI 1.8.0** 作为后续 DropdownMenu、Popover 以及共享 Select / Dialog 浮层行为的单一候选底座。公开组件仍按各自实施范围建设。本批两个适配器只存在于 Playground 的 `local-experiment`，Radix 保留为可复现的比较对象，不进入公共 UI。

直接组合成熟原语；不再建立竞争的打开、外部点击、Escape、定位或焦点控制器。`_InternalPopup` 是私有机械能力的归属，不要求现在另造一层包装。

## 相同条件与结果

Base UI 与 Radix Dropdown Menu 2.1.24、Popover 1.1.23、Select 2.3.7、Dialog 1.1.23 使用同一 Rain Token 样式、内容、字号、尺寸候选及业务策略。两个 Menu 和 Popover 都设置为非模态；Dialog 为模态。使用相同的受控单选 Select、含长内容和固定操作区的 Dialog、课程菜单及模板组合面板。

| 条件 | Base UI | Radix 原生行为 |
| --- | --- | --- |
| Menu 键盘打开、Home/End、Escape 返回触发器 | 满足 | 满足 |
| Action / Checkbox 按业务决定保持或关闭，支持条目覆盖 | 满足；`closeOnClick` | 满足；`onSelect` 取消默认关闭 |
| 子菜单 Escape 只关闭当前层 | 满足 | 关闭整棵菜单，未满足本项目合同 |
| 非模态 Menu 的 Tab 离开到后续页面控件 | 满足 | 阻止 Tab，未满足本项目合同 |
| Select 打开/方向键/选中/禁用/定位/焦点返回 | 满足 | 满足 |
| Menu → Dialog 焦点交接、初始焦点、Tab 约束、Escape、遮罩、固定操作区 | 满足 | 满足 |
| 混合内容中的搜索、分类、选择、独立收藏、无结果、失败重试 | 满足 | 满足 |
| 外部点击保持目标焦点；Portal 深色；360px 视口边界 | 满足 | 满足 |

原始失败材料及逐项测试结果见[第一批证据](../../evidence/runtime/dropdown-batch-one/verification.md)。两项 Radix 差异在同一测试合同中明确标为预期失败；不把它们解释成通过。Base UI 对应测试必须正常通过。没有为了补齐败方引入第二套键盘控制器。

## 成本与取舍

| 指标 | Base UI | Radix |
| --- | --- | --- |
| Playground 直接依赖 | 1 个包 | 4 个包 |
| 唯一生产依赖与 peer 组合数，包含直接包 | 14 | 51 |
| 完整适配样本的压缩前 JS | 300,539 B | 173,365 B |
| 同一样本 gzip JS | 78,018 B | 46,836 B |

包体测量采用 Vite 生产模式、最小化 ESM；React 和 Rain 包外置，相同任务内容各自打包。它不是整站首屏开销，也不是只测一个 Menu 的数字。依赖数量包含共享 React peers，不等同新增安装数。方法和结果保存在 [bundle-comparison.json](../../evidence/runtime/dropdown-batch-one/bundle-comparison.json) 与 [dependency-comparison.json](../../evidence/runtime/dropdown-batch-one/dependency-comparison.json)。

Base UI 的本次样本体积更大，但本项目两项键盘合同无需额外处理，业务关闭策略和焦点交接也有直接入口，因此优先选它。版本固定；升级时重跑当前合同，不从包版本或文档推定兼容。性能预算、首屏加载、触屏及屏幕阅读器实测尚未完成，不宣称已有结果。

## 最小接入规则

- Base UI 的 `render` 组合将内容放在 Rain Button 内；不能传 `children={null}` 再依赖 Trigger 覆盖，否则按钮没有名称。
- Menu 交接 Dialog 时暂停菜单的焦点返回，由 Dialog 持有初始焦点并回到原始菜单触发器；外部点击则保留目标焦点。
- Portal 明确承接局部主题和具名视觉候选。滚动容器消费底座的可用高度；Radix 对照也按其公开变量接入，不因漏接高度制造比较差异。
- 标准 MenuItem 一行一个动作；开放 Popover 使用正常输入、按钮和布局。搜索、收藏、异步业务状态均留在组合内容中。
- 操作后关闭由业务和条目策略决定；导航、Dialog 交接及异步成功关闭作为本例的具体策略，不写死到 Action / Checkbox / Radio 的身份上。

公开 API、视觉 Human Gate、Token 新增、组件发布、Figma 写入及 Git 均保持独立。后续组件授权时使用此底座决定，不同时把 Radix 带入公共组件。

依据：[Spike 同条件实验](../../SPIKE_BRIEF.md#8-select--dialog-headless-决策实验)、[建设计划](../plans/2026-09-09-dropdown-family-construction-plan.md)、[Base UI Menu](https://base-ui.com/react/components/menu)、[Radix Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)。运行时结论来自本仓库安装版本的实测。
