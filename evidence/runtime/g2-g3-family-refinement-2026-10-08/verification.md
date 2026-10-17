# G2–G3 家族精修首批验证

用户选择「按家族精修」并确认具体视觉板后，实施 Toggle Group、Command、Sidebar 三个样板及共用文档表面。日期 2026-10-08，System Mode；实际工作区 `card-v2`，分支 `codex/card-v2`。设计确认只授权本批实现，实际页面仍待用户视觉审阅。

## 实现

- Toggle Group：连体单选、分离多选、真实 Rain 对齐图标组；选择、悬停、禁用与键盘 Focus 保留。Toggle 复用同一状态配色。
- Command：恢复 14px 输入，补齐搜索/命令图标、分组/快捷键与执行提示；中性色临时高亮、320px 列表上限、实际 36/30px Density；空结果容器没有内容时不占位。
- Sidebar：轻中性底、轻品牌当前项、12px 分组标题、正式 Rain 图标；收起图标居中，当前项保留；窄屏组合可阅读。
- 文档：去网格、限定标题与原生输入样式范围、修复整页主题生命周期、重建标题/正文/辅助内容层级；已有独立框架不再叠套预览边框。Kbd 边框显式使用既有中性边界。
- 未增加依赖、公共 Token、组件 Props 或应用路由。面板宽度与样例内容保留在本地组合。

## 自动化结果

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 文档、演示、Command/Sidebar/Kbd、旧 G2、旧 G3 命令/弹出行为与本批范围校验 | 9 文件 / 30 tests passed | `unit-final.log` |
| 本批范围、源码绑定与颜色声明；最终测试类型修复后重跑 | 4 tests passed | `scoped-governance-final.log` |
| Chromium 实际渲染与操作 | 6 scenarios passed | `browser-final.log`、`browser/` |
| UI / Playground / Prototype 类型检查 | passed | `typecheck-final.log` |
| 全测试代码 TypeScript 检查 | passed（exit 0） | `test-typecheck-final.log` |
| Playground 构建 | passed | `build-final.log`；已有大包提示保留 |
| Asset Index 引用与导出 | passed | `asset-index-final.log` |
| 旧 G123 治理回归 | 11 passed / 1 baseline failure | `governance-current.log` |
| 冻结 B2 历史与原阶段记录 | 保留；精确新范围识别通过 | `baseline-phase-comparison.json`、本批 4 tests |
| 全库 Tailwind B2 校验 | failed，存在基线阶段登记错误及其连锁检查 | `tailwind-check-final.log`；不作为本批全部通过 |

30 tests 已包含本批 4 个范围测试，不能把重跑 4 个相加成 34。专项 6 场景含 1440×1000 的默认展示、深色与 390×844 窄屏。相邻页面窄屏覆盖 Toggle、Skeleton、Sheet、Context Menu、Navigation Menu；不把它们的视觉优化计入本批。

红到绿证据：原有外层底板、16px 字号污染、无效列表尺寸、深色根节点、命令空容器与当前项文字覆盖先失败后修复。同一断言继续用于最终检查；红日志和早期失败截图保留，未把失败记录改写为成功。

## 原有校验失败的边界

修改前保存的 `status/current-phase.yaml` 与当时的 `verification-helpers.mjs` 一起执行 `validateTokenFoundationsV1Phase`，结果为 `unknown status fields`。当前也为同一结果。移除本批新增的 `g23FamilyVisualRefinement` 后，当前阶段对象与修改前完全一致；没有新增根键。既有五个图表根登记仍为 `chartLibraryValidation`、`chartTrendMotion`、`bklitRainValidation`、`bklitRainCharts`、`chartVariants`。

此失败没有通过宽泛放行或修改图表授权处理。修改共享文档导致的旧 source hash 错误已用精确后继记录解决：`source-bindings.json` 绑定四个当前文档文件、修改前副本、颜色声明与原 Registry/证据校验和。旧 G123/Button Group 证据 JSON 保持原字节；篡改新绑定、旧副本、当前源码或颜色角色会失败。

完整 Token/对比度体系未重新授予通过。文档颜色声明仅为本批角色/源码验证，不转移任何旧 Human Gate。

## 浏览器与视觉证据

设计真值：`approved-visual-target.png`。实际浏览器整页证据：`browser/toggle-group-iab-final.jpg`、`browser/command-iab-final.jpg`、`browser/sidebar-iab-final.jpg`；细节、深色、紧凑、收起与窄屏证据在同一目录。实时 IAB Console error/warn 列表为空。

命令筛选、空结果与键盘执行、侧栏目的地切换/收起均实操。旧导航 `#navigation-v042` 已加载并检查实际画面，保存 `browser/navigation-v042-adjacent-iab.jpg`；没有宣称旧导航全套像素回归。

项目根 `design-qa.md` 记录源图与实时截图的共同比较、三项展示修复与当前项颜色修复；final result 为 `passed`（本批自查）。真实组件人审保持 `awaiting-user-review`。

## 交付状态

| 项目 | 本批状态 |
| --- | --- |
| Implementation | completed |
| Scoped Automated Verification | passed-scoped |
| Runtime Visual Self Review | passed，见 Design QA |
| Human Gate | awaiting-user-review |
| Safari / VoiceOver | not-run |
| Full Contrast Acceptance | not-granted |
| 后续家族 | 未计为完成 |
| Publication / business migration / Figma write | 未执行 |
| Git commit / push / PR | 未执行，分支与 HEAD 保持原值 |

预览服务继续运行在 `http://127.0.0.1:5173/`。用户原 `#skeleton` 标签页保留；本批使用独立审阅标签页。
