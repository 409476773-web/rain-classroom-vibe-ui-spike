# RN-08 Pagination Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 建设已确认的 Rain Next 分页器及基础、数据、精简三种示例。

**Architecture:** 公共 Pagination 是 Rain UI 候选，使用原生导航/按钮/链接、一个纯分页计算模块，以及现有 Input、Select、IconButton 和 Rain Token。页码与页容量可以受控或非受控；一个变更回调提出完整的新页码和页容量，数据请求、筛选和业务错误留在宿主。组件不引入新 Headless 库、数据缓存或全局分页状态。

**Tech Stack:** React 19、TypeScript、既有 Rain Foundations / Tailwind B2、Vitest、Playwright。

---

## 已确认方案和授权

用户先要求只讨论；随后逐次确认视觉、布局和尺寸/交互方案。在讨论收束、明确下一步为公共组件及三个示例之后，用户“继续”，本次按该上下文进入实施。System Mode，精确范围为 RN-08 Pagination 切片，不扩大为 Table、Empty 或完整 BM-A。

- 轻量无常驻边框页码、浅蓝当前页、条数下拉直接可见。
- 数据组合左侧总数/条数，右侧导航，快速跳页默认关闭。
- 高度 24/28/32；24 为 Compact 默认，32 为 Default 默认，28 显式选择。对应排版 13/18、14/22、14/22；页码圆角 6、相邻间距 4，长数字允许扩宽。
- 尺寸控制整套配方；实际容器变窄先减少页码再精简，辅助区换行，不缩放明确尺寸。
- 默认 20 条，选项 10/20/50/100，可配置；改条数保留原首条记录所在的新页。
- 省略区可快跳；保留首尾，单个缺页直接显示。跳转后原按钮不存在时焦点落到新当前页。
- 跳页支持回车及可见按钮，失焦不提交；空值不提交，非法/越界提示范围，兼容 IME。
- 单页可以隐藏导航但保留辅助区；零条显示共 0 条；未知总数只呈现真实当前页与是否还有下一页。
- 已确认的是设计方向，不代表运行视觉 Human Gate 或对比度已通过。

当前 checkout 已有 RN-07 等用户修改，保持原位、小范围增量，不创建/切换 Git 分支、不提交/推送。Classic 只读，Figma、发布和业务迁移不在本次范围。

## 来源与现有边界

- AGENTS.md、SPIKE_BRIEF.md、status/current-phase.yaml。
- evidence/rain-classic/reuse-matrix.yaml:133 的已接受完整分页能力/职责决定。
- Classic src/components/Pagination/Pagination.vue、pagination.scss、pagination.utils.js，以及 src/behaviors/pagination/usePaginationState.js（外部只读）。
- Classic 2026-07-30 arrow-size-fixed 截图为历史视觉来源；不当作当前运行验证。
- shadcn https://ui.shadcn.com/docs/components/base/pagination：部件组合和链接语义；Ant https://ant.design/components/pagination/：完整功能对照；MUI https://mui.com/material-ui/react-pagination/：页码窗口；Chakra https://www.chakra-ui.com/docs/components/pagination：精简呈现。只借鉴，不复制上游代码/视觉，不安装依赖。
- 当前 Input/Select 正式支持 24/28/32/36，分页使用前三档；Focus 使用当前 Foundations，不继承旧审计记录中的过时 ring 数值。

## 公共合同

`Pagination` 与 `PaginationProps`、`PaginationChangeDetails`、`PaginationSize`、`PaginationVariant`、`PaginationPart` 从 @rain-next/ui 导出。

- 已知总数：`total: number`；未知总数：`total` 缺省且显式 `hasNextPage: boolean`。
- `page/defaultPage`（1 起算）、`pageSize/defaultPageSize`（默认20）、`onChange({ page, pageSize, reason })`。reason 为 page / page-size / jump / ellipsis。同一次操作仅一份完整提议，宿主决定何时接受。
- `variant: basic | data | simple`（默认 basic）。data 默认显示总数和条数选择；其他模式可显式组合。
- `size: 24 | 28 | 32`、`showTotal: boolean | 'range'`、`showPageSize`、`pageSizeOptions`、`showJumper`、`hideOnSinglePage`、`align: start | center | end`、`responsive`、`showLessItems`、`disabled`、`loading`。
- `getPageHref(page)` 提供真实导航链接；`renderPage(page)` 只替换页码内容，组件保留交互语义。链接模式保留复制链接和修饰键行为。
- 根支持 className、ref、ARIA 名称；暴露稳定 data-slot / data-rain-id。需要局部改造时沿用已有具名 localRecipe 机制，不开放任意视觉值。
- 无效 API 数值给出明确错误，合法外部页码因总数缩减可夹到有效页；不在渲染中产生业务回调。
- 快跳默认一个五页窗口，showLessItems 三页窗口，提示实际目标页；焦点恢复只响应自身激活，不抢外部焦点。
- 未知总数不生成末页、总页数或虚构记录范围；跳页只在已知范围开放。

## Task 1: 状态和公共组件

Create: packages/ui/src/pagination/pagination.tsx、pagination.utils.ts、pagination.styles.ts、pagination.css（若需要）、pagination.css.d.ts、pagination.test.tsx。

1. 写分页窗口、变更原子性、受控拒绝、页容量保首项、未知总数与输入边界的必要测试。
2. 运行 `pnpm exec vitest run packages/ui/src/pagination/pagination.test.tsx --maxWorkers=2`，保留失败/通过事实。
3. 实现纯计算与公共组件，复用现有字段、图标与样式入口，独立实例不共享实时状态。
4. 复跑同一组测试并执行 UI 类型检查。

## Task 2: 三种组合与真实可交互示例

Create: apps/playground/src/docs/components/pagination-page.tsx、pagination-page.css（需要时）。
Modify: apps/playground/src/app.tsx、现有组件总览入口。

1. 基础、数据、精简示例；浅/深主题、密度/三档尺寸、零条/单页/大页码、未知总数、禁用/加载、可调窄容器。
2. 数据示例使用明确 Mock 的本地记录，单一宿主状态原子更新，展示失败保留及重试。避免创建正式 Table/Empty。
3. 用 #pagination 路由提供审阅入口，正常业务展示不混入实现信息；API/来源说明独立放在文档区。

## Task 3: 精确治理与资产登记

Modify: packages/ui/src/index.ts、status/current-phase.yaml、manifests/contracts/tailwind-b2.yaml、scripts/verification-helpers.mjs、scripts/verify-boundaries.mjs、scripts/verify-tailwind-b2.mjs。
Create: manifests/ui/pagination.yaml、registry/pagination.json、scripts/pagination-rn08.test.ts。

1. 增加 paginationRn08 精确授权记录及文件集合，沿用现有验证机制，不扩大其他阶段。
2. 登记局部 CSS 的容器适配/Parts/强制颜色例外及全部 Token 使用。
3. 运行专项治理测试、B2 与 Token 检查；既有四项边界问题单列，不通过降低门槛隐去。

## Task 4: 浏览器验证与独立审阅

Create: tests/e2e/pagination.spec.ts、tests/e2e/pagination.config.ts、evidence/runtime/pagination/verification.md、independent-review.md。

1. 运行全库 typecheck、unit、build；检查既有验证脚本的副作用，截图只写本批或临时目录。
2. 运行独立端口的分页 E2E，验证身份/非空/无框架遮罩/控制台、指针与键盘、输入法、选择浮层、焦点、异步失败、实例隔离和真实宽度几何。浏览器采用已安装 Playwright；本会话没有 browser skill 插件。
3. 浅/深主题 × 三档尺寸，桌面/窄屏截图，检查相邻控件与边缘空隙、长数字、重载和实际 CSS。
4. 使用 verification-before-completion、requesting-code-review 完成独立审阅，修复本次发现并回归。
5. 将 implementation、automatedVerification、independentReview、humanGate、contrastAcceptance、publication 分开记录，打开本地审阅入口。

## 起始检查

2026-09-14 修改前 `pnpm verify:boundaries` 已失败四项：V2 工作包两份 HTML 不在旧 allowlist；现有 HEAD 与历史 localGitCommit 不一致；现有 origin 与历史 remoteGit 不一致。这些不属于分页实现引入的问题。本次不改历史 Git 登记或删除已有文件。

## 执行记录

### 2026-09-14 运行视觉已确认

用户明确“没问题。视觉确认”。据此接受当前 #pagination 运行视觉，scope=`pagination-current-runtime-visual-only`：包括单行主栏、180px 设置浮层、主题色文字跳转、图标和常驻容量数字/单位层级。状态、Manifest、Registry 和颜色登记同步此限定 Human Gate；保持 registry-candidate，Contrast Acceptance=not-granted。没有据此授予真实读屏器/输入设备、发布、业务迁移、Git 或完整 RN-08/Table/Empty/BM-A 验收。以下保留确认前的迭代记录。

### 2026-09-14 16:14–16:16 截图反馈续批（当前）

用户明确要求进一步缩小设置浮层、改用主题色文字跳转按钮、删除重复总页数、减弱导航图标并突出常驻容量数字。System Mode，仅修改 Pagination 及其对应文档/配方/登记/验证。该反馈替代此前输入尾部箭头与共 N 页说明；保持单行、原子状态和现有弹层行为。

实施采用 180px Popover、既有 Button text/brand 作为 Input trailingAction。导航 Icon/Neutral/2 降至 Icon/Neutral/3，使用 Pagination 专属 Local Recipe，不改变共享 IconButton。容量数字提升为 Text/Neutral/1，单位仍用辅助 Text/Neutral/3 并采用 Compact 字号；不把交互标签伪装成装饰以放开弱色语义。删除总页数说明及其 ARIA 引用，非法输入继续提示合法范围。

验证：33/33 组件/示例/颜色/授权专项、类型和构建通过；三浏览器 18/18，通过浅/深 × 24/28/32 的真实浮层宽度、文字按钮与数字/图标层级、单行几何、Tab/Enter、禁用/加载。180px 可容纳默认四个容量选项和输入尾部文字动作。图标常态浅一级，交互时用 Icon/Neutral/2 保持反馈填充上的辨识度。运行视觉与人工颜色验收继续保留为未授予。

### 2026-09-14 轻量单行续批（最新授权）

用户在截图反馈后确认新方案，并明确“开始实施”。System Mode，本批仅修改 Pagination、示例、对应合同/颜色登记与验证。该决策替代初版“条数常驻、辅助区可换行、外置跳转按钮”：主栏固定单行，默认把条数和跳页收进末尾竖向更多（正式 more-vertical 图标，用户已确认）；横向省略号仍负责页范围。输入尾部使用已确认的右箭头提交，保留 Enter 与 IME 保护。错误只出现在浮层，不挤压主栏。

复用正式 Popover、Input trailingAction 和 IconButton；面板页容量用原生按钮组即时提出一次完整变更，宿主仍控制接受时间。新增 pageSizePlacement=settings|inline（默认 settings），inline 以紧凑的数字/弱单位作为同一设置浮层入口；窄时回到更多图标。showJumper 表示能力是否开放，默认开启但收纳。现有页码状态计算与请求职责保持。

主栏按导航、设置入口、总数整体测量：先减少页码，再精简为当前/总页数，空间仍不足才把总数移入浮层。保持高度和触点尺寸。输入/错误不参与主栏布局。浏览器已验证带内边距的真实窄容器、设置 Portal 的主题/焦点和异步接受后关闭；新草稿不会被旧提议的接受打断。

实施步骤：组件与设置面板 → 示例和精确登记 → 有效交互/响应式回归、类型、构建、浏览器截图 → 独立审阅与收尾记录。无新依赖、无 Foundation Token 值变更。上一轮四项历史边界问题单列；本次设计确认不自动通过运行视觉、人工颜色、发布或迁移。

轻量续批完成：条数数字使用 Text/Neutral/2，单位使用 Text/Neutral/3，常驻入口实测约 80px；不采用仅限非关键非交互文字的 Neutral4。33/33 专项、三浏览器 18/18 以及最终交互定向回归 3/3 通过。独立复核关闭了旧容量请求打断新草稿、组合输入禁用后无法提交两项 P2。Implementation / scoped Automated / Independent Review 均 completed / passed / passed，运行视觉与人工颜色仍待验收。完整证据与当前截图位于 evidence/runtime/pagination/verification.md。

### 初版完成记录（轻量续批之前）

2026-09-14 实施结束：公共组件、三种组合、文档入口、精确治理和颜色登记已落地。专项 31/31，生产构建、类型检查、B2 和 Token 登记检查通过；三浏览器 18/18、总览入口 1/1。独立审阅问题均已修复，包括链接跳页、内容盒适配、窄屏文档、链接前景色与按压对比度。完整证据见 evidence/runtime/pagination/verification.md 及 independent-review.md。

全库回归 1300 通过、5 失败；5 个失败均由修改前已有四项边界问题触发，详细保留在验证记录。Implementation=completed，Pagination 范围 Automated Verification=passed，Independent Review=passed；运行视觉 Human Gate=awaiting_human，Contrast Acceptance=not-granted，未发布或迁移。后续等待本地 #pagination 运行视觉检查，不自动启动 Table/Empty 或 BM-A。
