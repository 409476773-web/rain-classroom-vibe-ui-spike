# Tree 收尾记录 · 2026-09-28—29

范围：`.worktrees/card-v2` 的本地 Tree／ManageTree 候选。没有新增组件功能、全局 Token、依赖或发布；保留其他任务已有修改。相关源代码和浏览器测试可从工作区直接复跑。

## 当前结论：Web 高保真原型基础建设完成

2026-09-29，用户明确确认：“如果是这样的话，现在这个Tree视觉我已经人工检验通过，可以算作tree组件基础建设已完成。”当前 Tree 运行视觉人工验收通过，Tree 与配套 ManageTree 在 Web 高保真交互原型范围内完成基础建设，进入页面使用和按需维护。本阶段必补功能待办为空。

真实读屏验收、常态浅色对比度限制及全库既有校验问题作为独立后续事项保留，不阻塞本阶段结项；仍不代表完整无障碍、正式发布或生产接入通过。以下自动检查为之前实施轮的证据，本次只同步人工结论与记录，校验登记一致性，未重跑运行测试。

## 已完成

- 真实 Chrome 菜单确认 200% 缩放，实际操作展开、勾选、Rich 排布与原位编辑，随后恢复 100%。证据：[缩放值](native-zoom-200-indicator.png)、[勾选](native-zoom-200-checks.png)、[富内容](native-zoom-200-rich.png)、[编辑](native-zoom-200-editor.png)。覆盖 macOS Chrome 的代表性场景，不代表其他浏览器均已验证。
- 修复 Tree 品牌颜色用途缺失、拖拽指示填充的内容类型，以及第 06 例说明颜色的登记。实际颜色未变；必要文字和交互图标的弱色问题没有被改标成装饰内容。
- 资产索引恢复。为既有 9 个 G3 候选补充缺失的本地 Registry，验证引用和导出；索引明确纳入 `scoped-passed` 并原样显示验证、验收、对比度、发布状态，不将专项通过提升为全库通过。
- 增加 Tree 已授权范围的识别和负例检查，未修改冻结 B2 记录。其 SHA-256 仍为 `fb9b518f55944a74c8081d88a83d2385c8615e95887efe0cd1eae9b16ae186fe`。
- 用户于 2026-09-29 确认“两个示例都通过”：第 06 例节点状态／空态，与领域字段编辑／保存失败恢复的补充视觉验收通过。既有主视觉、拖拽目标、连续祖先关系线验收分别保持原有范围。

## 验证

| 检查 | 结果 |
| --- | --- |
| `pnpm exec vitest run scripts/tree-closeout.test.ts packages/ui/src/tree apps/playground/src/patterns/manage-tree` | 10 个文件，89 项通过 |
| `TREE_PREVIEW=1 pnpm exec playwright test --config tests/e2e/tree.config.ts` | 落实交互增强后完整 16 项重新通过 |
| `pnpm --filter @rain-next/ui typecheck` | 通过 |
| `pnpm --filter @rain-next/playground build` | 类型检查和构建通过，既有大包提示仍在 |
| `node scripts/asset-index.mjs --check`、`--find Tree` | 通过，能找到 Tree 和 ManageTree |
| `pnpm exec tsc --noEmit --project tsconfig.tests.json` | Tree 新增测试无类型错误；仍有其他任务的 Command 测试回调类型、navigation-v042 的 node:fs/promises 声明问题 |
| `pnpm verify:evidence` | 缺失 Registry 已修复；仍被其他阶段增量登记与冻结历史校验接口不匹配阻塞 |
| `pnpm verify:tokens` | Tree 颜色登记问题已修复；原浅色低对比度仍失败，另有 Breadcrumb／Navigation／BM-D 等既有未登记颜色 |
| `pnpm verify:boundaries` | 仍有其他增量授权未被识别、既有产物路径与当前阶段边界不匹配 |

专项检查先复现缺失登记与错误用途，修复后通过。全库失败保持真实失败，没有绕过检查、修改历史哈希或代填批准。全库历史校验的提示并不表示历史内容被篡改：冻结哈希一致，实际问题是后续增量授权识别尚未同步。Tree 的识别已补齐，其他条目包括 Breadcrumb、G2/G3 与相关上游授权，需要跨任务核对后分别修复。

## 可读性决定

用户选择“保留当前浅色，候选继续调整”。整体加深版本未采用，默认视觉与 Token 保持原样。

用户随后确认“确定。继续建设tree组件”，第二版已于 2026-09-29 写入共享 Tree，ManageTree 自动复用：当前行悬停、键盘聚焦或成为拖入目标时，说明和辅助信息为 Text/Neutral/4、操作图标为 Icon/Neutral/3，控件悬停／聚焦为 Icon/Neutral/2；常态仍是已审核颜色。两种主题、两种面板背景下，增强状态文字最低 4.69／4.61，图标最低 3.13／4.01；常态颜色与原版逐项相等。常态文字仍低于 4.5，浅色有效图标仍低于 3，因此没有宣称完整对比度达标，也未登记对比度例外。

本次浏览器检查取消了候选颜色注入，只切换宿主面板背景。先在旧组件复现聚焦箭头仅 2.53:1 的失败，再验证实际共享 CSS 的 112 条颜色测量；覆盖两种主题／背景、窄屏辅助信息、键盘聚焦、行与控件悬停、选中、拖入，以及其他行不受影响、离开后恢复、取消拖拽后恢复。89 项单测、UI 类型、Playground 类型／构建、16 个完整生产浏览器场景和 Token 生成一致性重新通过。实现为 3 条共享 CSS 规则，无新 API 或依赖。应用内浏览器也实际操作了 F6 聚焦和键盘拖入／取消：[聚焦截图](interaction-live-focus.png)、[拖入截图](interaction-live-drop.png)。

[集中审核页](../../../../docs/design-reviews/tree/closeout-review.html) · [实际组件测量](../interaction-readability-facts.json) · [历史候选测量](../readability-facts.json) · [对照说明](../readability-comparison.md)。实际截图以 `interaction-` 开头，历史候选截图保留，不冒充当前运行证据。

## 真实读屏仍未完成

系统设置曾确认 VoiceOver 已开启，也在 Chrome 中操作了节点；工具未能取得实际播报字幕，原生截图也不能可靠包含独立旁白浮层。因此本轮不把 AX 标签或键盘通过当作实际读屏通过。用户中断后于 2026-09-28 核实旁白开关为 off，未再开启。

最短人工检查（在本地 Tree／ManageTree 示例完成，不涉及真实业务数据）：

1. 开启 VoiceOver，将焦点移入树，用方向键检查节点名称、层级、展开／收起和选择状态是否准确播报。
2. 进入第 02 或 06 例，用 Space 勾选；核对未选／已选／部分选中与不可勾选状态。父节点受限时，子节点仍应可勾选。
3. 用 F6 进入行内动作，Escape 返回；在 ManageTree 中用 F2 编辑、取消，并用键盘拖动检查目标位置与确认／取消提示。结束后恢复旁白原状态。

上述实际播报需要一次有结果的人工记录才能关闭；这项和全库治理问题不能用本次视觉验收代替。
