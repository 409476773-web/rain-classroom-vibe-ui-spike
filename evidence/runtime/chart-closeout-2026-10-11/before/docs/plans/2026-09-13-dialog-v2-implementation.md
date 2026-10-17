# RN-05 · Dialog 与 Separator

2026-09-13，用户要求根据 V2 工作包在 Card 初步完成后继续下一步建设。按 V2 的 M0-O 顺序落实 RN-05。此授权独立于 Card 原批次；Card 的限定间距决定、其余 Human Gate 与对比度记录保留。

## 目标与边界

System Mode：公共 Dialog / Separator 为 registry-candidate；编辑课程仅为 local-experiment。复用现有 `.worktrees/card-v2` / `codex/card-v2`，基线 321e1a0 及未提交 Card 成果见 `evidence/runtime/dialog-v2/baseline.json`。本批不新增依赖、不改 Card、Foundation 数值或既有字段行为。RN-06 及以后、BM-B 完整场景、发布、Figma、提交和远程操作均保持独立。

来源：分别核对 shadcn-ui/ui@3ba91b1cc83e1bbe4ab35a422ff2a694849c5048 的 base/ui/dialog.tsx、separator.tsx；仅采用作者结构思路，本地转译 Rain 样式，不声称 CLI 产物。行为由锁定 Base UI 1.8.0 承担，遵循 ADR 0005。视觉参考 VE-014 固定头尾、内容分组和白色任务表面；重设视口限制及滚动，不继承其页面 Card 嵌套样式。

## 最小合同

- Dialog.Root / Trigger / Content / Header / Body / Footer / Title / Description / Close。Root 保留 controlled/defaultOpen、取消事件及 triggerId；默认 modal。Content 合成 Portal、Backdrop 和 Popup，保留 ref、原生 ARIA、initialFocus/finalFocus。
- 标题18/28/600、正文及说明14/24、24px头尾和内容留白、Radius/10、Shadow/dialog；宽560px为可调整几何，窄屏限制在视口内。Header/Footer不滚动，Body独立滚动。所有视觉使用已存在 Rain Token。
- 复用 PopupProvider 的主题/密度桥接；Dialog 子控件继承实际密度，区别于 Popover 的 compact 默认。局部变量以 Content 的显式 style 和 localRecipe 进入 Portal，不隐式复制任意祖先变量。
- localRecipe 仅修改 content/header/body/footer/title/description；内嵌 Dialog Context 重置。Root 不持有业务草稿、保存与错误。
- Separator 使用现有 Base UI Separator 的横/纵方向及无障碍语义；decorative 显式隐藏，非交互，不获得 Tab 停点。
- 宿主编辑课程：Input+Select+FormItem；保存中防重复并阻止关闭；第一次 Mock 保存失败保留草稿，重试成功才提交；取消丢弃本轮编辑。字段标签、错误、禁用由已有 FormItem 连接，Select 值由 React 状态提交。

## 修改范围与验证

仅新增两个 UI 目录、类型出口、独立示例及文档路由、Manifest/本地 Registry、必要扫描与精确治理增量、本批证据。先写交互失败检查，再实现；使用现有测试设施，不新增框架。

RO-01 打开关闭/焦点恢复；RO-02 内嵌 Select 的 Escape/外点顺序；RO-03 Light/Dark/compact/局部变量；RO-04 保存中/失败/重试/取消；RO-05 标签/错误/禁用；RO-06 长内容、固定操作区、窄屏与键盘。另测嵌套 Dialog、取消打开、ref/属性、装饰分隔、非目标 Card 对照。

运行定向单元、类型、构建、治理与 Chromium；截图仅写本批输出。未验证假设：两层浮层实际堆叠、Portal 变量和动态主题、目标字体、真实辅助技术。必要文字/焦点对比度实测单独记录；已有全局深色 Focus finding 不能由本批豁免。技术完成后准备集中 Human Gate，后续 RN-06/07/08 另批。

## 实施结果与接续

RN-05 公共 Dialog / Separator、共享课程编辑消费示例、`#dialog` 文档入口、Manifest / 本地 Registry 及精确治理增量已落实。此前的堆叠、Portal、动态主题及本机字体假设已有浏览器证据；真实辅助技术仍未验证。

自动检查：88 个文件1279项单元通过；生产35项及依赖开发模块的4项旧状态矩阵分别通过；类型、构建、治理、899项图标完整性检查见[完整执行记录](../../evidence/runtime/dialog-v2/verification.md)。独立复核发现的滚动容器和样式层顺序问题已修复，并补足实际几何断言。

必要文字实测通过4.5:1；深色共享 Focus 的2.573:1保持待决。公共项仍是 `registry-candidate` / `awaiting_human` / `not-granted` / 未发布，没有扩大 Card 的原限定接受范围。

下一实施入口为 RN-06 的 Stack、Inline、Grid、Split / Sidebar，随后 RN-07 Textarea、RN-08 Table。原 V2 Roadmap JSON 继续作为提案快照；实际进度以 `status/current-phase.yaml` 的 `componentRefinements.dialogV2` 和本记录为准。

## 后续 Dialog 排布精修

RN-05 初版记录保留。用户后续明确授权精修当前 Dialog 并提炼组合规则，本轮变更与最新检查分别见[精修计划](2026-09-13-dialog-visual-refinement-plan.md)、[新证据](../../evidence/runtime/dialog-visual-2026-09-13/verification.md)和[组合规则](../audits/2026-09-13-composition-layout-rules.md)。不以初版通过替代最新验证，不扩展人工验收范围。
