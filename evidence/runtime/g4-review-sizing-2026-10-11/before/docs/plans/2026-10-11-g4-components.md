# G4 Typography、Item、Progress Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 按用户「确定，先补齐 G4：Typography 复用收口，建设 Item 和 Progress，并补齐 Playground 展示和使用说明。」完成三项可调用能力与独立文档。

**Architecture:** System Mode；复用 `card-v2` 当前 Foundations、Rain UI、Base UI 1.8.0 和文档壳。Typography 直接消费已登记预设；Item／Progress 从固定 shadcn Base UI 来源取得真实源码，保留 Parts 与引擎行为，最小转译为 Rain Token。两项共享候选保持未发布，业务数据、权限和任务生命周期留宿主。

**Tech Stack:** React 19、TypeScript、已有 Base UI／CVA／rainCn、Vitest、Playwright。没有新增依赖或公共 Token。

---

## 范围与设计依据

- Typography 保持 UI／Reading／Data 三角色和十种预设，使用原生语义 HTML；不新增同义 Typography 包装组件。文档说明中文单位与关键数字分离、普通数字的 UI 字体、Reading 用途。
- Item 提供媒体、标题、说明、内容、操作及分组结构，延续官方默认／边框／浅底组合；普通条目不自动成为点击或选择控件，链接与独立动作按实际 HTML 语义组合。长内容自然换行，不截断必要信息。
- Progress 保留已安装 Base UI 的数值和可访问性，提供标签、读数、轨道和指示 Parts；`null` 表示未知比例，不造百分比或假计时。错误、暂停、重试等业务状态由外部文字与按钮表达。
- 视觉采用 V02、V04、V05、D02、D05、I01：使用既有冷色文字、轻边界、16px 区块标题、14px 正文，内容／动作分组；检查浅深主题、两种密度、长内容与窄屏。参考当前 G1–G3 独立文档和导航对象条目的信息关系，不改变导航组件。
- `evidence/runtime/g4-components-2026-10-11/baseline.json` 及 `before/` 保存本批前公共出口、样式、治理与阶段记录。字体环境、真实 Safari／VoiceOver／触屏和新视觉 Human Gate 尚待验证。

## Task 1：固定来源与先行检查

保存 shadcn-ui/ui 既有固定 commit `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` 的 Item、Progress、代表例、MIT 和使用的样式，登记 URL 与 SHA-256。核对已安装 Base UI `progress`、`use-render`、`merge-props`，不升级依赖。记录来源到 Rain 的类、Parts、尺寸和样式差额。

新增组件与页面的必要行为测试，先运行以证实缺失：Item 原生链接／独立动作、长内容／密度／trace；Progress 正确读数、零与完成、未知值、非100最大值；目录三入口、语义字体示例。对于纯复用 Typography，复验既有排版合同，不改预设以制造失败。

## Task 2：共享 Item 与 Progress

文件：`packages/ui/src/item/{item.tsx,item.css,item.css.d.ts,item.test.tsx,README.md}`、`packages/ui/src/progress/{progress.tsx,progress.css,progress.css.d.ts,progress.test.tsx,README.md}`。

直接适配官方 Parts／render，使用 `rainCn` 与父级 Density。保持 `data-rain-id`、`data-slot`、实际 variant/state/density。绘制、焦点与 reduced-motion／forced-colors 使用现有 Foundation。数值验证与异常语义遵循实际 Base UI 合同，测试边界，不重写进度引擎。两项独立目录可以并行实施；共享出口、治理、扫描与索引由主代理串行修改。

## Task 3：Typography 收口与三项 Playground

文件：`apps/playground/src/docs/components/g4-component-pages.{tsx,css,test.tsx}`、现有 `component-catalog.tsx`、`component-asset-page.tsx`、`apps/playground/src/styles.css`。

增加 `#typography`、`#item`、`#progress`。每页沿用 `ComponentDoc`，有用途／避免、真实内容、常用 API／Parts、可复制代码、来源及浅深／密度设置。Typography 用现有类展示 UI、Reading、Data 和普通数字；Item 展示内容、带操作、原生链接与长文案；Progress 展示可操作的受控数值、未知比例、暂停／错误说明及非100最大值。演示数据明确是本地样例；操作给实际可见结果，组件不内置请求或假自动增长。

## Task 4：消费入口与候选登记

文件：UI 根出口与样式；`manifests/ui/{typography,item,progress}.yaml`、`registry/g4-assets.json`、`docs/ai/g4-components.md`、现有 AI 索引／原型入口；当前阶段及必要治理／源码扫描精确登记。

Typography Manifest 指向真实 Foundations 源码／导出，保持 Foundation 归属；Registry 指向可获取源码而不是虚构 Typography UI 导出。保留旧 G1–G3／图表阶段、验收和来源哈希。只为本批增加精确授权和消费者，旧全仓治理发现继续报告，不扩大白名单、降阈值或改冻结记录来通过。

## Task 5：验证与交付

运行两项组件、页面、治理和既有排版／目录／加载行为相关单测；workspace 与测试类型、Playground／Prototype 构建、生成索引检查、必要来源和 Token／扫描验证。浏览器以本批构建产物验证三页桌面／390px、浅深主题、密度、键盘链接和独立动作、真实进度读数、未知值、reduced-motion／forced-colors。实际查看截图，保留首版与修订证据。独立代理先核对规格再审阅实现，修复有效发现并复验。

交付记录：`evidence/runtime/g4-components-2026-10-11/verification.md`、来源锁、来源差异、当前文件哈希、截图和检查日志。实现与自动检查分别记录；新视觉 Human Gate 保持待用户检阅。Git、Figma、发布和业务迁移不在本次范围。
