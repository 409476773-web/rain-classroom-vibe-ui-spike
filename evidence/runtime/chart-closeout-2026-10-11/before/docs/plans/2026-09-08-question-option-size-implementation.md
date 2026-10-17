# 题号与选项六档尺寸实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将已获视觉确认的 20 / 24 / 28 / 32 / 36 / 40px 配方纳入公共题号与选项组件，默认 28px。

**Architecture:** System Mode，维持两个现有 registry-candidate 的行为和 Parts。共享一张静态尺寸配方表；密度只选择外围留白。对照页改用公共 size，不再覆盖组件几何。

**Tech Stack:** 现有 React、TypeScript、Rain Token / Tailwind、Vitest、Playwright；无新依赖或 Token。

2026-09-08 用户在本地视觉验收后明确“继续推进”，授权本批公共尺寸实施。设计依据为[六档设计记录](2026-09-08-question-option-size-design.md)。当前 Git 无提交且阶段禁止 Git 操作，继续在当前工作区完成必要修改；不建立 worktree 或提交。

## 1. 配方与组件

- 修改 `packages/ui/src/question-number/question-number.test.tsx` 和 `packages/ui/src/option-button/option-button.test.tsx`，先验证默认 28、六档 size 传递、密度不改变 size、非法 size 拒绝；运行两文件，确认现有 32px 实现失败。
- 新增 `packages/ui/src/recipes/question-option-size.ts` 静态类名表。扩展两组件及 OptionGroup 的 `size`，同步 `packages/ui/src/index.ts` 类型导出。控件字体独立于正文；原生选择、结果、禁用和 Focus 保持原行为。
- 题号底部反馈留白：20px 为 8px，24–32px 为 6px，36–40px 为 Space/14 的一半；标记底部与目标底部重合，等价于已确认的方案 A 和其他档位。只为最后的派生留白登记精确 CSS 例外。
- 再运行两组件测试，确认通过。

## 2. 示例与登记

- 原 `question-number-page.tsx` / `option-button-page.tsx` 示例显式使用 32px，并补充公共 size 说明及六档对照入口。
- `apps/playground/src/experiments/question-option-sizes/main.tsx` 改用公共尺寸；`review.css` 删除几何覆盖，保留页面布局。Manifest 保留原视觉确认来源，记录迁入公共组件后的实现状态。
- `apps/playground/vite.config.ts` 将已有尺寸 HTML 纳入本地构建，确保组件页的对照入口在构建后仍可用。
- `scripts/token-foundation-outputs.mjs` 登记对照页的 14 处既有颜色使用，再通过 `pnpm generate:tokens` 更新消费者元数据；公共 Token 的值和生成 CSS 不变。
- 同步两个 UI Manifest / Registry、`status/current-phase.yaml` 的独立尺寸授权、精确源码扫描和边界检查；冻结旧的 32px、结果内容、对比度和发布状态。

## 3. 验证与检查点

- 在现有 `tests/e2e/question-option-sizes.spec.ts` 中先断言真实公共 `data-size` 和无局部几何配方，再验证浅深色、两种密度、六档字体与图标、反馈完整占位、选择与键盘、390px 图文布局。保留已确认数值作为期望。
- 运行本批组件与页面测试、治理回归、类型检查、构建、题号／选项／尺寸浏览器矩阵。批次收尾运行仓库完整验证。
- 独立审阅本批实现，记录结果；既有 93 + 9 项对比度待审不因此关闭。
- 在本文登记实际验证结果与材料。设计视觉已确认；公共实现的验收单独保留，发布、Figma、业务迁移和 Git 未授权。

## 4. 实施结果与验证记录 · 2026-09-08

本批公共实现完成。QuestionNumber、OptionButton 与 OptionGroup 支持六档 `size`，两种密度均默认 28px；原组件页全部显式使用 32px。对照页直接使用公共组件，共用静态尺寸表，不再使用两套局部几何覆盖。图文正文保持 15 / 22，密度只改变外围留白与组合间距。

| 检查 | 实际结果 |
| --- | --- |
| 先失败再修复 | 两组件新增尺寸合同先因旧默认 32px 失败，实施后通过；尺寸页先因缺少公共 `data-size` 失败，接入后通过 |
| 完整仓库验证 `pnpm verify` | 退出码 0；46 个测试文件、958 项单元测试、76 项 Chromium 浏览器检查全部通过；治理、图标、类型与构建通过 |
| 公共尺寸浏览器矩阵 | 浅色／深色 × default／compact × 六档尺寸均匹配已确认几何；字体、标识、反馈包含范围、20px 方案 A、选择与键盘通过 |
| 内容与窄屏 | 390px 图文排列无横向溢出；每行一个原生输入，点击图片正确选择所属选项，正文与图片对齐 |
| 构建后实测 | `dist/index.html` 与 `dist/question-option-sizes.html` 均生成；本机 5174 构建预览中两组件页的尺寸链接可达，旧示例全为 32px；四种主题／密度组合的六档尺寸及窄屏图片选择通过，无页面错误或失败请求 |
| 独立审阅 | 独立审阅者检查公共组件、共享配方、文档调用、Registry、范围登记与构建配置，无未解决的新增 P1/P2；独立组件／页面测试 32/32、颜色消费者测试 14/14 及 Token 校验通过 |
| 状态收尾后复验 | 同步完成状态后 `pnpm verify:governance` 退出码 0，状态与授权回归测试 228/228 通过 |

完整验证日志为本次运行的 `/tmp/question-option-public-full-verify.log`；构建预览结果为 `/tmp/question-option-public-built-preview.json`，两者属于临时运行材料。可重复检查以仓库现有测试和下列源码为准。

- [共享六档配方](../../packages/ui/src/recipes/question-option-size.ts)、[浏览器尺寸与图文检查](../../tests/e2e/question-option-sizes.spec.ts)。
- 本次真实渲染：[浅色默认](../../test-results/question-option-sizes-six--2151b-feedback-inside-each-target-chromium/浅色-default.png)、[深色紧凑](../../test-results/question-option-sizes-six--2151b-feedback-inside-each-target-chromium/深色-compact.png)、[窄屏图文](../../test-results/question-option-sizes-text-67f20-and-single-selection-target-chromium/mobile-content.png)。这些运行截图由后续测试覆盖；已人工检查深色紧凑和窄屏图文布局。
- [交互评审页](http://127.0.0.1:5173/question-option-sizes.html)展示已确认的公共实现。

完整回归发现并修复三处既有验证假设：新增构建入口对应的测试样本补齐第二份 HTML；原 IconButton 检查的 `select` 禁令限定其所属 CSS；移除父布局已覆盖的多余 `self-start` 类。颜色检查补登对照页 14 处已有使用，没有放宽扫描、阈值或新增对比度豁免。

生命周期：`implementation: completed`、`automatedVerification: passed`、`independentReview: passed`；公共实现 `humanGate: accepted`，来源见下节。原六档局部视觉验收仍保留，不能替代本批实现验收。原题号 93 项与选项内容 9 项对比度待审、其他批次 Gate 不变。两个组件仍为 `registry-candidate`；未发布，未同步 Figma、迁移业务或执行 Git 操作。构建仍报告既有图标目录大包提示，不影响本批构建成功。

## 5. 公共实现视觉验收 · 2026-09-08

用户在本批交付后明确“视觉确认，”。本次确认登记为 `question-option-six-public-sizes-visual-only`：公共 QuestionNumber / OptionButton / OptionGroup 的六档尺寸、默认 28px、显式 32px 基准、已确认反馈比例与密度留白。`componentRefinements.questionOptionSizes.humanGate` 及两个组件 Manifest / Registry、对照页公共实现记录同步为 `accepted`。

本次仅登记视觉验收，不修改组件外观与行为；不覆盖其他批次视觉验收或原有 93 + 9 项对比度待审，不授权右上角反馈、发布、Figma、业务迁移或 Git。校验要求准确的用户确认、范围、证据及已完成的实施与检查，缺少或扩大确认信息均拒绝。

本次登记后验证：`pnpm verify:governance` 退出码 0；状态与授权测试 229/229 通过。新增的确认检查先在旧规则下失败，再经精确验收规则通过；组件源码未变，本轮不重跑组件构建与浏览器矩阵。日志为 `/tmp/question-option-size-acceptance-governance.log` 与 `/tmp/question-option-size-acceptance-tests.log`。

后续同日用户另行确认题号完整验收、选项内容与对比度验收，并将题号右上角反馈暂缓。上文“93 + 9 项仍待审”为尺寸单独验收时的历史状态；两组当前已登记为用户接受的对比度例外，原数值和阈值保留，见[题号记录](../../evidence/runtime/question-number/verification.md#component-and-contrast-acceptance--2026-09-08)与[选项内容记录](../../evidence/runtime/option-button-content/verification.md#content-and-contrast-acceptance--2026-09-08)。六档尺寸的确认范围保持原样。
