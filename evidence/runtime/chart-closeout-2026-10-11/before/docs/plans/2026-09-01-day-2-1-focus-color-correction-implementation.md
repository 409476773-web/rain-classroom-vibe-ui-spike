# Day 2.1 Focus And Color Correction Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 用可验证的最小变更完成 Focus 减重、Input 夹具收口和颜色分层补强，同时保持 Day 2 与 Day 3 的资产边界。

**Architecture:** `token-contract.ts` 作为 TypeScript 事实源，内部 Reference Palette 映射稳定 Semantic Tokens；`tokens.css` 使用同名内部 CSS 变量表达映射；页面只消费语义变量。Focus 保留三个语义入口，通用控件共用品牌蓝 `2px + 1px` recipe；Input 夹具作为 Day 3 视觉候选，用 1px 品牌边框、浅蓝表面和 14% 品牌色轻 halo 延续 VE-014 原稿。

**Tech Stack:** React 19, TypeScript, CSS custom properties, Vitest, Testing Library, Playwright/Chromium, Vite.

---

## Task 1: 锁定新合同（RED）

**Files:**

- Modify: `packages/foundations/src/token-contract.test.ts`
- Modify: `packages/foundations/src/density.test.tsx`
- Modify: `apps/playground/src/docs/foundations-page.test.tsx`
- Modify: `tests/e2e/foundations.spec.ts`

1. 增加 Reference Palette 和“语义色必须由参考色映射”合同。
2. 增加 42 个语义色、`text-placeholder`、文字表面对比度合同。
3. 锁定 Focus `2px` 宽、`1px` offset 和三角色统一品牌色。
4. 锁定 Input `fixture-only` 标记、可见边界说明和三层颜色模型说明。
5. 锁定真实 Input 的边框、ring 颜色/宽度/offset 和 ring 相对外部表面的对比度。
6. 运行定向测试，确认因缺失新合同而失败。

## Task 2: 实现 Foundations 颜色与 Focus（GREEN）

**Files:**

- Modify: `packages/foundations/src/token-contract.ts`
- Modify: `packages/foundations/src/tokens.css`
- Modify: `packages/foundations/src/focus.css`
- Modify: `packages/foundations/src/index.ts`

1. 实现内部 Reference Palette，语义 Token 只从其中映射。
2. 增加 `text-placeholder`，提高 `text-muted` 的跨表面可读性，保留 30–45 语义总量。
3. 将三类 Focus 语义映射到品牌蓝，实现 `2px + 1px` recipe。
4. 导出足以供页面和测试检查的 Reference 元数据，不将其定义为应用消费 API。

## Task 3: 收口 Playground 夹具

**Files:**

- Modify: `apps/playground/src/docs/foundations-page.tsx`
- Modify: `apps/playground/src/styles.css`

1. 展示“Reference → Semantic → Component”分层和小型 Reference 色阶。
2. 标记原生 Input/Button 为 `fixture-only`，添加可见说明与可访问关联。
3. 使 Input placeholder 消费 `text-placeholder`；键盘聚焦时切换 1px 品牌边框、浅蓝表面与轻量 halo，forced-colors 下恢复高对比 outline。
4. 保持页面在桌面与小屏幕上的稳定布局。

## Task 4: 治理与证据

**Files:**

- Modify: `scripts/verify-boundaries.mjs`
- Modify: `status/current-phase.yaml`
- Modify: `apps/playground/src/routes/overview-page.tsx`
- Modify: `evidence/runtime/day-2/README.md`
- Modify: `evidence/runtime/day-2/red-green-summary.md`
- Refresh: `evidence/runtime/day-2/foundations-page.png`

1. 继续限制 Reference CSS 变量为 Foundations 内部使用，阻止应用直接消费。
2. 把阶段决策源、实现与自动验证范围精确记录为 Day 2.1 修正；Human Gate 继续 `not-evaluated`。
3. 用显式证据开关刷新 canonical Chromium 截图，同步尺寸、字节数与 SHA-256。
4. 人工查看截图，确认焦点视觉重量、Input 身份说明、色彩层级和页面排版。

## Task 5: 完整验证与交付

1. 运行定向单元测试和 Foundations Chromium E2E。
2. 运行完整 `pnpm verify`，只报告当前运行产生的结果。
3. 确认未安装新依赖，未实现 Day 3 公共组件，未创建 commit/remote，未写入 Figma 或发布/迁移。
4. 请用户在真实页面中体验修正后的 Focus 和信息层级；这一步是 Human Gate 的输入，不由自动验证代替。
