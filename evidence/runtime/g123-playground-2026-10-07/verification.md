# G1–G3 组件沉淀与 Playground

日期：2026-10-07。用户授权「补齐这批已有成果的组件沉淀与 Playground 展示」。本批实现完成，限定范围自动检查通过；新共享候选与独立展示页仍待人工检阅，未发布。

## 检阅入口与成果

本轮构建目录：[组件与工作区](http://127.0.0.1:5376/#components)。原 `5368/#R1` 导航审阅服务保留。

| 范围 | 已完成 |
| --- | --- |
| G1 六项 | Alert、Switch、Collapsible、Accordion、Tooltip、Resizable 各有独立入口；后三项中的 Collapsible、Accordion、Resizable 从局部适配进入共享 UI 候选。 |
| G2 六项 | Button Group、Toggle、Toggle Group、Spinner、Skeleton、Toast 全部进入共享候选与独立展示。 |
| G3 十项 | Breadcrumb、Scroll Area、Sheet、Sidebar、Command、Kbd、Context Menu、Hover Card、Menubar、Navigation Menu 全部有独立展示。 |
| 导航与布局八项 | Navigation Tabs、Navigation Bar、Scope Navigation、Navigation List、Object Navigator、Segmented Control、ConnectedSurface、WorkspaceLayout 独立展示；原组合样板保留。 |

共九项新共享候选、三十项展示入口。统一页面提供真实组件示例、关键状态、使用边界、API/Parts、来源和可复制调用代码；新页提供浅/深主题与默认/紧凑密度预览。保留原 Alert/Breadcrumb 示例，补上接口与调用区。

UI 具名出口、九份 Manifest、G1/G2 Registry、AI 资产索引、十五个精确 Playground 扫描入口与本轮授权已同步。旧 G1/G2 TSX 入口转为共享源码的 re-export，原场景业务状态仍在 Prototype。依赖只将已使用的 `react-resizable-panels@4.12.4` 登记到实际消费方 UI 包，没有升级版本。

## 实际验证

| 检查 | 结果 / 可读证据 |
| --- | --- |
| 全 workspace 与测试源码类型检查 | 退出码 0：[typecheck-final.log](typecheck-final.log)。最终目录文本调整后 Playground 类型检查再次退出码 0：[playground-typecheck-final.log](playground-typecheck-final.log)。 |
| 全 workspace 构建 | 退出码 0：[build-final.log](build-final.log)；最终 Playground 产物见 [playground-build.log](playground-build.log)。保留已有大体积 chunk 提示。 |
| 相关行为 | 14 文件、50 项通过，退出码 0：[behavior-final.log](behavior-final.log)。包含原 G1/G2 入口、Toast、Tooltip、G3 浮层、菜单、深链接与文档路由。 |
| 原 Core UI 目录回归 | 8 项通过，退出码 0：[catalog-existing-regression.log](catalog-existing-regression.log)。 |
| 授权、源绑定与 Token 回归 | 269 项通过；本轮受影响 B2 三项另外通过：[governance-scoped-tests.log](governance-scoped-tests.log)。不把独立运行的重叠用例累加为新覆盖数量。 |
| 真实 Chromium 构建产物 | 六项通过，退出码 0：[browser.log](browser.log)、[报告](browser/report.json)。覆盖全部三十入口的标题/API/代码、390px 不溢出、目录异步加载焦点与复制、页签/工作区草稿、ContextMenu 键盘与关闭焦点、深色 Sheet。 |
| 源索引闭合 | 退出码 0：[asset-index-check.log](asset-index-check.log)。核对真实 Manifest、Registry 引用、具名出口及生成内容。 |
| Workspace / Evidence / Tailwind B2 | 退出码 0：[Workspace](verify-workspace.log)、[Evidence](verify-evidence.log)、[B2](verify-tailwind-b2.log)。 |

实际截图在 [browser/](browser/)，包括三十项桌面页、目录、窄屏 Workspace 和深色 Sheet。已人工查看 G1/G2 示例、目录、工作区和浮层的实际渲染；这属于实施者检查，不代替用户 Human Gate。

独立审阅发现并修复了浮层局部主题/密度继承、带查询参数的文档目标和 ContextMenu 键盘入口；使用已有 Popup 桥与 Base UI 引擎，没有新建状态机。源码差额、修复前失败/修复后通过及真实键盘证据见 [G3 与导航来源差额](g3-navigation-source-delta.md)、[运行审阅](read-only-g3-runtime-review-after.json)、[键盘审阅](read-only-keyboard-route-review-after.json)。Breadcrumb Parts 已按真实出口修正；共用加载提示改为「正在打开页面…」。G1 与文档壳独立静态审阅见 [审阅记录](g1-doc-shell-independent-review.md)。

首次真实窄屏检查曾发现 Alert API 表格撑宽；共用 Grid 子项的默认最小内容宽度是根因。现在共用文档容器使用零最小宽度列，表格/代码只在自身内部滚动；没有隐藏页面溢出或缩小控件。失败日志、报告和 trace 保留于 `browser-first-runtime.log`、`browser/report-first-runtime.json`、`browser/results-first-runtime/`。最初沙箱禁止浏览器启动的环境失败另外保留为 `browser-sandbox-launch.log`，不算行为失败或通过。

## 当前全库边界

本次限定范围通过不等于整库全绿：Boundary 检查仍有原 `react-day-picker` 两项；Token 检查保留原 210 项，本轮新增文档为零，未降级必需边界角色或降低阈值。见 [Boundary](verify-boundaries.log)、[Token](verify-token-foundations.log)、[当前 Token 结果](token-current-result.json)；本轮早期十项文档颜色问题及修正前记录保留在 [初始发现](token-initial-new-doc-findings.json)。G1 的既有颜色发现与 G2 Skeleton 既有 shimmer 资格问题仍如实保留，未自动豁免。

新文档未重新验证真实 Safari/VoiceOver；此前导航 W7 的完成决定与 Safari 人工检查选择保持原状。共享候选及新展示未自动获得视觉/对比度或完整无障碍验收；没有进行 Figma 写入、发布、业务迁移或 Git 操作。

## 保护与来源

原工作区、公共文件和八份导航 ZIP 的原 SHA-256 在 [before.json](before.json)，原文在 `before/`。最终校验确认 HEAD、旧 phase（仅去掉本轮新增节点后）、导航 Registry 与八份旧 ZIP 全部相同：[保护结果](preservation-final.json)。锁文件相对本轮开始只新增 UI importer 的三行 Resizable 所有权记录。

G1/G2 Registry 保留本轮创建时的冻结字节与 SHA；其中初始验证状态属于创建快照，当前结果取本文件、Manifest 和 `componentRefinements.g123PlaygroundAssetization`。旧样板的来源接受范围不转为新共享候选的系统批准。最终文件散列与范围摘要见 [summary.json](summary.json)。
