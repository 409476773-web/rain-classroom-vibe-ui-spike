# 2026-10-08 图表样式反馈

本轮根据用户新提交的两张截图、六处浏览器注释实施，沿用此前认可的整体视觉与交互基线。实现和本轮技术检查完成；新增样式待用户审阅。候选保持 `registry-candidate / unpublished`，没有提交、推送、发布、部署、改权限或新增工具。

反馈冻结后，另一个已获授权的任务加入了蓝灰配方，修改共享 styles.css、recipes.ts 和 README。原始冻结证据完整保留；本任务随后对当前合并源码重新打包、安装并复验，2 项反馈检查、6 项文档页检查、23 项消费检查和 9 项合同检查通过，当前源码／快照／安装文件重新达到 173/173 一致。最终合并版证据见 [merged-current/README.md](merged-current/README.md)，没有覆盖另一任务的改动。

| 反馈 | 实施结果 |
| --- | --- |
| 互斥等级堆叠柱越出图表 | 原生 `BarChart` 已计算累计最大值，但纵轴另建的系列刻度覆盖了它。堆叠模式现在让纵轴、柱段与提示共用已有累计刻度；5 系列总量 132 对应最高刻度 150，未通过裁剪隐藏越界。 |
| 图例和很多标签太大 | 图例容器及通用 `text-sm / text-base` 标签为现有 Rain 13px Token；原生更小的坐标／扇区文字保留。主读数不作为标签压小，仪表读数为 24px。 |
| 图例项目太挤 | 列间距 24px，行间距 8px，窄屏继续自然换行。 |
| 弧形读数偏下 | 移除原生的向下 padding，读数块对齐弧形几何中心；880/390px 测得中心偏移均为 0px。 |
| 线形读数离刻度太远 | 间距从 12px 收紧为 8px；同时修复标题容器宽度为 0、颜色类误写成字号类造成的裁切。两种宽度的标题均宽 60px、高 17px、字号 12px。 |
| 旭日图黑字白描边 | 默认使用 Rain `OnColor/1` 反白文字，文字 stroke 为 none；仍保留原生显式配置能力。 |
| 漏斗人数颜色太深 | 人数改为 `Text/Neutral/4`、Regular 400、13px，图形、比例胶囊和渐变沿用原生方案。 |

库内只改动四份原生文件、样式、编译样式、来源锁和 README，共八份分发文件。163 份原生依赖闭包仍完整，固定上游 commit 未改变。精确颜色账本新增两个图表消费项，共 133 项；其他 Token 合同内容及三份 Foundation 样式未改变，见 [preservation.json](preservation.json)。

## 本轮验证

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 新增堆叠／样式回归 | 2 项通过；包括 880/390px、3/5 系列、实色／渐变／渐隐、数据更新及分组切换 | [完整图库日志](catalog-regression.log)、[堆叠事实](catalog/stacked-bars-facts.json)、[样式事实](catalog/style-facts.json) |
| 完整图库 | 62/62 通过，包含此前 60 项 | [catalog-regression.log](catalog-regression.log) |
| 文档页与样式隔离 | 4/4 通过；17 个入口、真实源码、焦点、窄屏及普通 Rain Switch | [playground-regression.log](playground-regression.log) |
| 来源闭包／颜色合同／动效 | 9/9 通过 | [contracts-final.log](contracts-final.log) |
| UI 类型检查与两应用构建 | 通过；构建仍有既有 bundle 大小诊断 | [UI 类型检查](ui-typecheck.log)、[Playground 构建](playground-build.log)、[图库构建](catalog-build.log)、[静态样式检查](styles-check.log) |
| 新干净宿主 | 离线安装、安装哈希、数据校验、类型检查、构建通过；两项消费任务 23/23 浏览器检查通过 | [commands.json](consumption/commands.json)、[浏览器日志](consumption/host/logs/browser.log)、[浏览器事实](consumption/host/logs/browser-facts.json) |
| 反馈冻结版一致性 | 当时的源码、快照、安装文件 173/173 哈希一致；当前合并版另行复验 | [preservation.json](preservation.json)、[安装事实](consumption/host/logs/clean-install-facts.json)、[当前合并版](merged-current/preservation.json) |

89 项浏览器检查和 9 项合同检查是本轮技术证据。本反馈批次未重新执行独立代码复核，不把之前的独立复核或用户整体认可自动升级为本批次的逐图视觉验收。本轮没有重跑全仓治理；此前基线失败仍按前版交付记录保留。

## 视觉证据与消费复现

主任务复核了 880px 折线及 390px 堆叠柱、两种仪表、旭日、漏斗六张重点图。共保存 [12 张正常动效结束后的截图](visual/snapshot-facts.json)：[折线](visual/line-880.png)、[堆叠柱](visual/bar-880.png)、[弧形仪表](visual/gauge-880-arc.png)、[线形仪表](visual/gauge-880-linear.png)、[旭日](visual/sunburst-880.png)、[漏斗](visual/funnel-880.png)。窄屏对应文件在同目录。

截图沿用已有独立消费检查的方法：先扩大真实视口高度、等待原生响应式 SVG 更新，再抓取视口，记录交互／捕获尺寸。普通 `fullPage` 抓图曾出现时间图临时缩小的绘制结果；这些原图保留在 before/catalog 等目录，不能作为视觉通过证据，视觉比较以 `visual/` 为准。未因此改动时间图源码。

[完整消费宿主](consumption/host)保存新私有包、源码快照、锁文件和自有配置，不包含 node_modules。宿主首次开发检查因 Vite 依赖预构建使用 classic JSX 发生 `React is not defined`；增加 automatic JSX 的预构建配置后，保持同一库源码重跑通过。失败证据保存在 [browser-attempt-1](consumption/host/logs/browser-attempt-1)，最终配置见 [vite.config.mjs](consumption/host/vite.config.mjs)。没有降低既有 23 项检查的条件。[生产构建归档](consumption/build-dist.tgz)也已刷新。

对比度继续为 `pending-review-not-granted`。[颜色账本检查](color-review.json)保留 27 项对比度及 17 项弱色使用待审项；[反白扇区实测](inverse-label-contrast.json)以真实绘制路径排除透明命中层，两个配方的 24 个标签中 21 个低于 4.5，最低约 2.12。初次错误选中透明命中层的 21:1 数值已标记 [rejected](inverse-label-contrast-rejected-attempt.json)，不作为证据。没有批准任何例外，也不把本次样式实现登记为对比度验收通过。
