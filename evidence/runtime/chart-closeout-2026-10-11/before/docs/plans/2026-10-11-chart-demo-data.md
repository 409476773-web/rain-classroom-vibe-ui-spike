# Chart demo data implementation plan

**Goal:** 按用户“开始修改演示数据，先做三线趋势、分组柱、迷你构成和进度这四组，放到实时页面里让我看一下效果”授权，编排舒展、流畅、有节奏的正常展示数据和三个固定更新状态。

**Architecture:** 只修改 playground 演示数据与直接消费调用，沿用现有图形、交互、配色、尺寸、图例、Tooltip 和精确表。System Mode；未发布候选。本轮设计方法采用 I01 信息角色与表达对应、I02 按信息关系选择图形并保留精确读数，按真实数值表达趋势、比较、构成和进度；不以渲染平滑掩盖数据。

**Tech Stack:** 现有 React / TypeScript / Rain Charts；Vitest 与 Playwright。无新依赖。

## Scope and boundaries

- 三线趋势：`chart-variants/trend.tsx` 的 line-trio-brush，30 天 × 3 条访问系列，三个有界快照；沿用日期、Brush 与曲线参数。
- 分组柱：`chart-data.ts` 增加仅默认分组使用的固定数据，`chart-examples.tsx` 切换调用；`chart-variants/bar.tsx` 仅 bar-multiple-series 使用它。原 makeBars 与其余变体保留。
- 迷你构成与进度：`chart-business/mini-data.ts` 的 parts/completed，沿用 count/goal/trend/ID。新增比例与进度使用三个快照，数量沿用原四步循环，完整行十二步重复；同源卡片、表格、列表和业务横向堆叠的构成同步。
- 原 zero/missing/invalid 保持；long/single 继续保留标签与数量边界，只呈现相同精选正常值。
- graph、Tooltip、精确表、下载源码共用真实数据；不更改公共 charts、Tokens、CSS、渲染参数、依赖、其他图型。

## Tasks

1. 保存本轮当前文件、1440/390 的五个目标修改前画面、配方与服务身份。
2. 在目标单元增加三个更新状态循环、稳定身份、非负计数、构成与进度合同检查，先确认旧代码失败，再修改数据。
3. 定向验证单元、playground 类型与构建；真实浏览器验证默认与减少动画、更新循环、Brush、读数和下载源一致性；同条件复拍。
4. 核对冻结文件哈希，记录本轮证据及限制，在实时页面展示。视觉 Human Gate 待用户查看；无发布、Figma、迁移或 Git 提交。

## Evidence

`evidence/runtime/chart-demo-data-2026-10-11/`，保存本次独立基线和验证结果，不覆盖前轮。
