# G2–G3 剩余家族样式精修 · Verification

日期：2026-10-08。授权原文：`继续优化g2、g3下，其他组件的样式`。

本轮本地实现和专项自动检查完成。真实视觉人审为 `awaiting-user-review`；没有授予完整对比度、正式发布或业务迁移验收。

## 实现与范围

- 共享候选：Spinner、Skeleton、Toast、Context Menu、Menubar、Navigation Menu、Hover Card、Scroll Area、Sheet。
- 现有展示组合：Kbd、Breadcrumb。Breadcrumb 已接受的共享组件保留。
- 已精修方向保留并检查：Button Group、Toggle、Toggle Group、Command、Sidebar。
- 使用既有 Rain Tokens、字体、正式图标、Input/Textarea 和 Base UI 行为；没有公共 API/导出/依赖/路由增量。
- 菜单 14/22、弱禁用、中性临时高亮、单线边界；导航浮层与实际宽度；对象预览层级；资料侧面板与内部滚动；加载几何与通知主题。详情见根目录 `design-qa.md` 和本轮计划。

## 验证结果

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 相关单测 | 19 文件 / 53 项通过，含 6 项精确范围与来源治理测试 | `unit-final.log` |
| 真实浏览器专项 | 16 场景通过：本批 10 + 首批 6 | `browser-final.log`、`playwright.config.ts`、`browser/` |
| 应用/包类型 | 五个 workspace 项目通过 | `workspace-typecheck-final.log` |
| 专项测试类型 | 通过，含两批浏览器及两组治理测试 | `scoped-test-typecheck-final.log`、`tsconfig.scoped-tests.json` |
| Playground 构建 | 通过，最后一次 built in 1.20s；原有大包提示仍存在 | `build-final.log` |
| Asset Index | 引用、导出及生成内容一致 | `asset-index-final.log` |
| 当前页控制台 | Sheet 捕获为空；最终 Navigation Menu 明确重载后 warn/error 为 0，6 条中断历史保留 | `browser/iab-console-final.json`、`browser/navigation-recovery.json` |
| 本批源码与历史绑定 | 9 个文档后继、7 个原生类来源、18 条保留记录哈希一致 | `source-bindings.json`、`final-file-check.json` |
| 文档颜色声明 | 81 条按实际角色登记，保持原角色/边界阈值 | `doc-color-consumers.json`、专项治理测试 |
| 本批格式 | 与修改前副本比较，无新增空白错误；包括已有未跟踪源码 | `final-file-check.json` |

浏览器覆盖 Navigation Menu 展开前后工具行几何、当前项/链接目的地；Context Menu 键盘与禁用；Menubar；Hover Card；Skeleton 可见性/reduced-motion/加载同几何；Toast 主题和撤销；深色紧凑 390px 弹层；内部及横向滚动；Kbd 真快捷键；Sheet 四方向、内部滚动与可见底部、草稿/焦点；13 页无横向页面溢出及首批回归。

## 视觉证据

根目录 `design-qa.md` 记录两次同一输入的来源/实现比较与五类 fidelity surfaces。共同方向来源为首批批准示意图和真实 Command/Sidebar 样板；本轮作为 System Mode 延续视觉关系，不声称新组件逐像素复制生成图。

`browser/` 包含各页 1440×1000 的真实 IAB JPEG、390×844 深色 Sheet，以及 Chromium 暗色紧凑浮层、四方向 Sheet、加载/滚动/通知截图。`sheet-live-final-iab.jpg` 为服务恢复后默认视口 1280×720 的真实运行截图。最新当前菜单 `navigation-menu-live-final-iab.jpg` 为 701×796px，重新加载与展开已确认。

## 整库限制与并行状态

- 整库测试类型检查仍在两个范围外图表配置失败：`tests/e2e/chart-feedback-legend-tooltip.config.ts` 和 `tests/e2e/chart-feedback.config.ts` 的 `reducedMotion` 不属于当前 `UseOptions`。本批相关类型检查通过。完整日志：`typecheck.log`。
- 旧 G123 治理运行 18 项中 17 项通过、1 项既有阶段失败：`Invalid Token Foundations V1 phase contract: unknown status fields`。本轮前副本与当前阶段验证都产生相同错误；未弱化或删除该断言。完整日志：`governance-final.log`。
- 移除本批精确新记录后，与修改前状态比较发现范围外并行新增 `chartVariants.visualFeedback20261008`；其余原记录一致。该图表记录已保留，不将整份阶段文件描述为字节未变。证据：`baseline-phase-comparison.json`。
- 首批绑定、颜色清单、原 G123 来源登记及父阶段冻结证据按原来源保留；只登记本批合法后继。新绑定 SHA-256：`dea5ca215723a2f512d1b17bd7f1248bfd9c371698c181bc22c36134919cb507`。
- 工作区原本有大量其他脏文件/未跟踪文件。`baseline.json`、`before/`、`git-status-before.txt` 提供本批前事实，不把整个 Git diff 归因于本轮。

## 交付状态

- 实现：completed；自动化：passed-scoped；视觉自查：passed。
- 用户实际视觉验收：awaiting-user-review。
- Safari、VoiceOver、完整状态/主题对比度：未验证、未授予。
- 发布、业务迁移、Figma 写入、Git commit/push/PR：未执行。
- 分支 `codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`，与本批开始一致。
- 本地预览由同一 card-v2 checkout 提供，地址 `http://127.0.0.1:5173/`。
