# Breadcrumb Implementation Plan

> 按 writing-plans / executing-plans / TDD 执行。用户已明确“确定。开始建设”，本会话直接推进，不重复请求实施许可。

**Goal:** 完成已确认的单尺寸面包屑、整项菜单交互、按容器折叠、截断提示及六组真实样例。

**Architecture:** 保留现有 Compound API，增加可选 `items` 数据入口以组合相同的 Parts、DropdownMenu 和 Tooltip。业务导航仍使用原生链接，路径由宿主提供。仅使用现有 Rain Token 和正式图标，不添加依赖。

**Tech Stack:** React / TypeScript / 既有 Base UI / Rain Tailwind 与组件 CSS / Vitest / Playwright。

## 范围与当前授权

- 工作目录：`.worktrees/card-v2`；System Mode 的共享候选完善，加组件文档样例。
- 本轮用户授权覆盖 Breadcrumb 共享实现、合同、文档入口、验证及本地 Registry 记录；不包含 Figma 写入、发布、Git 提交或其他组件视觉修改。
- 设计依据：`docs/plans/2026-09-24-breadcrumb-design.md`。V04 保留文字层级，V05 同步处理整项菜单外观与操作，D05 验证长文字与窄容器。
- 视觉基线为 13/18、22px 视觉底；将可操作项热区设为 24px，浅色底内收至22px，保持原稿轻量观感且增大命中范围。实际几何与对比度待浏览器验证。
- 既有消费者位于 `apps/prototype/src/scenarios/token-first-g3/page.tsx` 和 `rebuild/page.tsx`；保留调用方式并运行相关回归。

## 1. 行为检查与共享实现

文件：`packages/ui/src/breadcrumb/breadcrumb.tsx`、同目录 CSS/声明/测试；`packages/ui/src/index.ts`。

1. 补测试：原生导航与当前页、有序列表语义、禁用行为、箭头菜单与键盘关闭恢复。
2. 运行 `pnpm exec vitest run packages/ui/src/breadcrumb/breadcrumb.test.tsx`，确认新增行为先失败。
3. 实现单尺寸 Parts；复用 DropdownMenu / Tooltip；数据入口按实际容器宽度折叠中间祖先；当前页/静态文本仅在被截断时增加可聚焦提示入口。
4. 重跑该测试以及 DropdownMenu、Tooltip 和原 G3 消费测试。

## 2. 六组样例与真实浏览器

文件：`apps/playground/src/docs/components/breadcrumb-page.tsx`、页面 CSS、`apps/playground/src/app.tsx`、组件总览入口；`tests/e2e/breadcrumb.spec.ts` 与专项配置。

1. 增加 `#breadcrumb` 文档页：基础路径、同级菜单、交互状态、长名称、深路径、窄容器。示例导航用 URL 参数保留路径，可刷新和前进/后退。
2. 验证整项点击切换且不意外导航、鼠标/键盘、禁用、真实截断提示及与菜单互斥、折叠祖先菜单、窄屏无溢出、原稿字号/字重/颜色/几何。
3. 在独立本地端口运行 Playground；运行 `pnpm exec playwright test --config tests/e2e/breadcrumb.config.ts`，保留截图与事实。
4. 查看实际页面和截图；必要时修正后重验相关用例。

## 3. 合同、复核与交付

文件：`manifests/ui/breadcrumb.yaml`、`registry/breadcrumb.json`、`packages/ui/src/breadcrumb/README.md`、`status/current-phase.yaml` 的本轮独立记录；`evidence/runtime/breadcrumb/verification.md`。

1. 保持 `registry-candidate` / `unpublished` / 运行视觉待确认，不继承历史 G3 的通过状态。
2. 运行 UI、Playground 与 Prototype 的类型检查；运行 Playground 构建与定向测试，区分既存失败和本轮结果。
3. 根据 requesting-code-review 技能请求一次独立代码审阅，修复本轮重要问题；核对工作前快照，保留其他已有修改。
4. 给出可直接查看的本地入口、实际检查结果和仍待用户视觉确认的范围。

用户运行反馈接续：2026-09-24 新截图明确改为文字+箭头整项触发、统一 Hover；此决定覆盖原双入口方案，源码、示例、合同和回归同步更新。

## 完成记录

已完成共享实现、六组样例、组件合同、本地Registry与独立审阅。最终专项26项单测和2项浏览器用例通过，UI/Prototype类型检查与Playground构建通过。整项Hover已按用户第二张截图更新；完整结果、全库治理未通过项与边界见 evidence/runtime/breadcrumb/verification.md。用户于2026-09-24明确“确定。视觉完成验收”，本轮运行视觉已接受。
