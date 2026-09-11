# Token Foundations V1 第 0/1 批实施计划

日期：2026-09-05。模式：System Mode。授权：用户在[启动评估](../audits/2026-09-05-token-construction-readiness.md)后明确开始建设；本轮执行第 0/1 批，边界见 [ADR 0004](../adr/0004-token-foundations-v1.md)。

收口：2026-09-06。第 0/1 批实现、自动检查和独立技术审阅均已完成；Human Gate 为 awaiting_human。恢复入口是本批视觉验收及首组 Size/Density 候选裁决。

## 范围与并行顺序

先收口阶段、旧运行基线与共同消费合同；随后 Color、Typography、Line/Radius/Spacing 各自形成单源数据与针对性测试。它们可以并行准备，公共 CSS、Tailwind bridge、类名合并与扫描验证由同一个整合步骤顺序接入。最后统一演示、浏览器回归和独立审阅。

| 任务 | 工作与依赖 | 当前状态 |
| --- | --- | --- |
| T0 | 冻结旧运行和 B2 输入；登记独立阶段，保留完整 B2/Day 3/Gate 历史；迁移检查器视图 | completed；专项验证通过 |
| T1A | Color Registry、稳定身份、Light 值、Alpha/用途合同与测试 | completed；检查通过 |
| T1B | Typography 基础、Equal、字距、完整预设与组合测试 | completed；检查通过 |
| T1C | Line 1–6、Radius/Spacing 增量与不变身份验证 | completed；检查通过 |
| T1D | 单源生成、18 Line 入口、Typography/Color 映射、精确 Manifest、合并与非法入口检查；依赖 T1A–C | completed；检查通过 |
| T1E | 独立色表/排版/几何演示、AI 使用说明及局部组合验证；依赖 T1D | completed；检查通过 |
| T1F | 专项及完整回归、浏览器证据、独立技术审阅；依赖 T1E | completed；检查通过 |
| Human Gate | 提交本批可审阅材料，由用户决定；实现和自动验证不能替代 | awaiting_human |

本表保存恢复工作的位置；任务状态须按实际结果更新。单项完成不自动将整个阶段标记完成。

T0 检查点：阶段迁移和防篡改先取得失败测试，再完成实现；`scripts/verification-helpers.test.ts` 的 205 项测试通过，包含冻结 B2 输入的原 CLI 回归及新 Token 符号链接拒绝。`verify-evidence.mjs` 通过，四个治理脚本语法检查通过。以上为 T0 当时的专项证据；T1 完成后，完整 `pnpm verify` 已通过，含 760 项单元测试、40 项 Chromium 浏览器测试、897 个图标身份检查。独立技术复核另有 31 项专项通过，详见[最终验证记录](../../evidence/runtime/token-foundations-v1/verification.md)。

## 文件与事实来源

- 基础数据位于 `packages/foundations/src/color-registry.ts`、`typography-contract.ts` 及既有 `token-contract.ts`、`composition-contract.ts`；不增加第二套颜色或尺寸事实表。
- `scripts/token-foundation-outputs.mjs` 从事实源形成输出，`generate-token-foundations.mjs` 仅维护已登记标记区和派生产物；`verify-token-foundations.mjs` 验证来源、生成一致性和本批边界。
- CSS 输出复用 `tokens.css`、`typography.css`、`tailwind-theme.css`，并生成本地 `manifests/contracts/token-foundations-v1.json` 与演示的 `token-classes.generated.ts` 静态目录。
- 演示仅位于 `apps/playground/src/docs/token-foundations/` 的具名页面、面板与样式；既有 App/Foundations 入口只接入链接。具体文件由 `tokenFoundationsV1Files` 精确登记，不以整个目录通配授权。
- 原运行归档和索引保存在 `evidence/runtime/token-foundations-v1/pre-token-runtime.*`；验证说明、截图、日志及独立审阅使用同目录的已登记文件名。不得覆盖旧 B2 baseline、trial 或结论。

## 验证方法与本轮不作的假设

1. 先写能够暴露缺失能力的失败测试，再实现最小正确合同；阶段、冻结历史与越权变异必须有拒绝证据。
2. 数据与输出检查覆盖身份/值一致、公开与私有边界、生成漂移、非法属性/Alpha/用途、动态类名及同属性冲突；不只检查 Rain 前缀。
3. 新 Typography 不假定与旧角色视觉等价；Line 不假定能替换 Focus、SVG 或全部组件边框；新色表不假定已经适合所有承载面或控件状态。
4. 演示验证六档边框/横条/竖条、实际排版和局部调整隔离；装饰分隔不进入键盘顺序，字体缺失如实记录，不引入未授权字体文件。
5. 跑本批专项及既有 `pnpm verify:tailwind-b2`、完整 `pnpm verify`；保留旧组件/图标回归。必要浏览器证据完成后再独立审阅，并将 Human Gate 单独留给用户。

最终结果见[完整日志](../../evidence/runtime/token-foundations-v1/final-verify.log)、[独立审阅](../../evidence/runtime/token-foundations-v1/independent-review.md)及[阶段登记](../../status/current-phase.yaml)。人工视觉验收、后续组件迁移和发布没有由本批自动通过。

## 后续批次入口

Size/Density 当前只整理[首批完整方案裁决文档](2026-09-05-size-density-first-recipes.md)，优先沿 Classic 实际消费者选择 Input + Button + 搜索/筛选区域的完整方案。公共高度表和组件映射未定稿，第 2 批不在当前实现授权内。

Layer、ContentWidth、Container/Viewport Breakpoint、状态色补全、Dark、标题标记/Tabs 完整配方和精确图形仍按各自消费者触发。Figma、资产发布、业务迁移、新依赖与 Git 均不随本阶段启动开放。
