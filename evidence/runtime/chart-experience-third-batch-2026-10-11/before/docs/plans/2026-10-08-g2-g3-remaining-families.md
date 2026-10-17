# G2–G3 剩余家族样式精修 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 按用户「继续优化g2、g3下，其他组件的样式」的授权，延续首批确认方向，完成其余组件的视觉校准与真实示例。

**Architecture:** 保留现有 Base UI 行为、公开 API 与 Rain Tokens。共享组件修正状态、尺寸与边界；真实内容、图标配搭、阅读层级留在 Playground 组合。已精修的 Button Group、Toggle 与 Breadcrumb 共享组件保留，检查展示一致性；首批三个样板不另换方向。

**Tech Stack:** React / TypeScript、现有 Rain UI / Base UI、Vitest、Chromium 专项回归、In-app Browser。

---

System Mode；源图为首批 `approved-visual-target.png`，配合首批实际样板作为共同的视觉关系参考。此次授权继续实施全部剩余家族，不另生成一个等待确认的方向。保留历史验收，不转移成新改动的人审或发布许可。

采用 V02、V04、V05、D02、D05：共同字号/边界/图标比例，保持选择、命令、对象预览、加载的不同语义；检查默认/紧凑、主题、展开、长文案、窄屏。

设计规则：G3 控件正文 14/22，分组/快捷键 12/18；复用 36/30px Density。持续选择使用浅品牌表面，临时展开/高亮用中性浅底；禁用是弱前景而非完整正常文字。浮层沿用已有白色/中性表面、细边界、阴影和正式 Rain 图标。Skeleton 用既有中性色阶保持可见，不新增公共 Token。

### Task 1: 基线与真实失败

保存本批前源码、状态、分支、HEAD 和脏状态。添加专项渲染断言：导航展开不推挤工具行且位于触发器下方、内容至少 192px；菜单最小宽度/字号/禁用颜色；Hover Card 上限 320px；Skeleton 背景可见且 reduced-motion 停止。先记录真实失败。

Files: `tests/e2e/g2-g3-remaining-families.spec.ts`，本批 `evidence/runtime/g2-g3-remaining-families-2026-10-08/`。

### Task 2: 菜单与导航家族

Files: `packages/ui/src/{context-menu/context-menu.tsx,menubar/menubar.tsx,navigation-menu/navigation-menu.tsx,hover-card/hover-card.tsx,styles.css}`，`apps/playground/src/docs/components/{g3-component-pages.tsx,g3-component-pages.css,component-doc.css}`。

1. 为已有 Root 内联 Viewport 设置默认绝对定位，保持所有当前调用组合与 Portal/Positioner 可选组合；修正无效尺寸 utility，保留当前项与原生链接。
2. Context Menu / Menubar 保持原引擎，恢复菜单禁用、轻分隔线、字号/尺寸，演示补充正式图标与文字对齐。
3. Kbd 展示真实按键组合和搜索操作；Hover Card 对象身份、辅助信息、尺寸与主题匹配。

### Task 3: 面板、滚动与反馈家族

Files: `packages/ui/src/{sheet/sheet.tsx,scroll-area/scroll-area.tsx,loading/loading.css,toast/toast.css}`；`apps/playground/src/docs/components/{g3-component-pages.tsx,g3-component-pages.css,spinner-page.tsx,skeleton-page.tsx,skeleton-page.css,toast-page.tsx,breadcrumb-page.css}`；必要的页面局部 CSS。

1. Sheet 使用清晰标题、关闭入口、结构化资料内容、已有 Textarea 与固定底部操作，保持焦点恢复/草稿。
2. Scroll Area 使用分组/图标/元信息，滚动条与长内容适配，滚动保持在内部。
3. Spinner 的图标与文字成组；Skeleton 轮廓可见且匹配真实记录/列表几何；Toast 保留队列、计时和动作，精修标题/描述/边界并使页面主题传至通知。
4. Breadcrumb 只协调展示页的标题与留白；已验收的共享路径组件及 Button Group 保留。

### Task 4: 记录与校准

接入精确本批授权和文档/原生类来源后继绑定，保留首批绑定/颜色 JSON 原字节；新文档颜色声明保持既有角色/阈值。旧原生输入示例改用共享 Input/Textarea 后，边界负例检查指向其真实共享字段合同。Files: `scripts/{verification-helpers.mjs,verify-token-foundations.mjs,g23-family-refinement-governance.test.ts,g123-playground-governance.test.ts}`、本批 bindings/颜色清单、相关 Manifest、`status/current-phase.yaml`、项目根 `design-qa.md`。

运行相关单测、渲染场景、类型、构建、Asset Index；实看余下每页和必要展开状态、深色与 390px。保存与首批共同视觉源的对照。整库既有图表阶段登记问题单独报告，不扩大授权来清除。UI/API/依赖/应用路由不新增；Git、Figma、发布、迁移未授权。

完成实现和自动检查后，实际视觉人审仍 awaiting-user-review；Safari、VoiceOver、完整对比度不从 Chromium 或样式自查推定。
