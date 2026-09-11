# Day 3 Core UI 实施计划

> 执行方式：按 `executing-plans` 和测试先行推进。每个家族先看到目标测试失败，再写最小实现。

## Task 1：登记 Day 3

- 修改 `scripts/verification-helpers.test.ts`，先断言 Day 3 授权、CP3 保留和未授权边界。
- 修改 `status/current-phase.yaml`，将当前实施状态登记为 Day 3 `in-progress / not-run`。
- 修改 `scripts/verify-boundaries.mjs`，增加 Day 3 白名单，同时完整保留 reuse-audit 的文件、脚本与 CP3 记录。
- 修改 `scripts/verify-workspace.mjs`，加入 `@rain-next/ui`、Core UI 页面与浏览器测试的必需文件。

验证：定向 Vitest 先 RED；状态和规则落地后进入 GREEN。

## Task 2：Button 与 Input

- 新建 `packages/ui` 包及样式入口。
- 先写 `button.test.tsx`、`input.test.tsx` 和 Input 字符工具测试。
- 实现 Button 的层级 × 意图、Loading/Disabled、Density 和原生语义。
- 实现 Input 的状态、组合位、清除、字素限制、IME 和外部字段关联边界。

验证：`pnpm test -- button input`。

### Task 2.1：2026-09-03 Button 实现 Gate 修订

- 决策来源：设计师逐项确认 Button 的层级、Danger、Loading、Disabled、Focus、五档尺寸、全宽与长文案规则。
- 先扩充现有 Button 单元测试与 Core UI 浏览器测试并确认 RED，再修改公共实现。
- 将 `ghost` 收口为 `tertiary`；增加 `size`、`block`、`loadingLabel`，同时保留 Density 的 32 / 36 默认映射。
- 复用 Rain Classic 的 canonical loading PNG；只复制该单一只读来源资产，不修改 Classic。
- 只在 Button 组件层登记 Classic 血缘色和实测候选，避免本轮把未经核查的红色扩散到 Input、Tag、Badge 或其他组件。
- 扩充真实说明页，覆盖三级层级、三级 Danger、五档尺寸、Loading、Disabled、Hover / Pressed / Focus、全宽和长文案。
- `#EF5353` Danger、20% 蓝色柔光、40px 高度档位及其留白和 0.82 Loading 透明度已于 2026-09-03 通过 Button 真实页面视觉验收；该结论只属于 Button，不扩展到其他组件或整个 Day 3 Human Gate。

验证：Button 单测 RED / GREEN、UI 与测试 TypeScript、`tests/e2e/core-ui.spec.ts`、`pnpm verify`、`pnpm verify:reuse-audit`。

## Task 3：Tag/Badge 与 Surface/Card

- 先写 Tag/Badge 九种合法组合、计数、Label、移除和非交互测试。
- 先写 Surface/Card 表面层级、组合部件、标题语义和非交互测试。
- 实现最小公共 API；不实现 Domain 标签、BadgeStatus 或 StatusIndicator。

验证：`pnpm test -- tag-badge surface-card`。

## Task 4：组件说明页与真实运行检查

- 新建 `core-ui-page.tsx` 及页面测试。
- 更新路由、Overview、样式和 Playground 依赖。
- 新建 `tests/e2e/core-ui.spec.ts`，覆盖真实键盘、Focus、密度、清除、Loading、表面和无障碍边界。
- 保存 Day 3 截图和 RED/GREEN 说明。

## Task 5：完整验证与状态收口

- 运行 `pnpm verify` 和 `pnpm verify:reuse-audit`。
- 只有全部通过后，才把 Day 3 实施改为 `completed`、自动验证改为 `passed`。
- Human Gate、Figma、发布、业务迁移和 Git 均保持未通过或未授权。

## 现场注意事项

- 项目没有初始 Git commit，不能把 commit 当作检查点。
- 发现的旧 `day-3-core-ui` worktree 早于最终复用审核，缺少 reuse-audit 链且 API 已过时；本计划不覆盖主项目、不复制其治理文件，也不把其历史测试数当成本轮证据。
