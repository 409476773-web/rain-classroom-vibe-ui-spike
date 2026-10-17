# Remaining chart demo data implementation plan

**Goal:** 用户确认“这四组的方向可以”，授权“继续按这个思路优化其他图表的演示数据，仍然只改数据，保留现有配色和图形参数”。按图表原有语义改善普通演示数据与更新状态，保持可读、可比较、可复现。

**Architecture:** System Mode；既有未发布候选的playground演示数据。只改本地fixture、数据生成式和必要期望值测试，沿用公共charts与现有图形/交互。I01保留身份、单位、数据角色；I02按趋势/比较/构成/关系的真实数值安排宽峰谷、差异与合理比例，并核对Tooltip和精确读数。本轮沿用已有方法，不新增共享视觉规范。

**Tech Stack:** 现有React/TypeScript/Rain Charts/Vitest/Playwright，无新依赖、包装或通用生成框架。

## Authorized slice

1. 核心数据：`chart-data.ts` 的时间序列、类别、进度、雷达、漏斗、流向、层级、热图、地图统计、OHLC、盈亏与实时序列；以少量固定快照或原有公式的有界revision取代机械无界增长。`chart-examples.tsx`仅堆叠分段、仪表读数与实时追加的数据表达；`trend.tsx`仅预测目标值，三线已确认样本冻结。
2. 官方变体：普通六班柱形、饼/环、雷达、仪表、日历活动簇、简单桑基与实时数据。保留本身已清楚的Pie/Radar初始材料示例，只改善更新；密集90/60日期压力数据与bar-multiple-series冻结。
3. 业务数据：分类对照、5类矩阵、全国/省内示例统计、mini的8日走势；网络数据已具合理业务拓扑和有界变化，整文件保留。
4. 上轮四组保护：trioSamples/TrioBrushVariant、groupedBarSnapshots/makeGroupedBars及官方grouped分支、mini parts/completed/count/goal/ID原样；mini本轮仅trend，构成与进度不变。

## Invariants

- 不改CSS、Tokens、字体、颜色、图形参数、曲线、坐标轴、半径、间距、动画时长、缩放、物理布局、交互、公开接口、Registry、依赖。
- 类别/日期/ID/顺序稳定；GeoJSON身份、边界、行政层级原样。缺测、零、不适用、无效以及空/单项/长名保留相应合同与mask。
- 计数非负；完成不超过参与；互斥构成求和正确；百分比由同源分母计算；Sankey内部守恒；层级叶项求和；OHLC遵守高低开收；实时初始化与追加共用绝对时间相位，保留原timer、buffer和snapshot恢复机制。
- 已有特意的材料、密集、真实时间、极值及异常样本不为美化而失真；无需改的样本记录保留理由。

## Execution and checks

1. 保存当前328文件基线、Git状态、实时服务身份、代表默认/官方/业务页的1440/390正常态画面；沿用原目录，不覆盖前轮证据。
2. 三路按文件分工，只在基线完成后编辑。新增有界/语义行为先小合同RED再GREEN；查全调用与旧数值断言，使用同源真实数据。
3. 运行所有受影响chart单元、playground类型与构建；必要旧E2E读数期望最小适配。默认19入口与170变体采用已有渲染/合同检查；重点浏览器测试更新、normal/reduce、窄屏、Tooltip/表与下载源码。
4. 对照画面，逐图记录改动/保留；用源文件/JSX/样式哈希保护图形参数与先前四组。最终只记录本轮实际验证，视觉结果留给用户看实时页。

## Scope status

用户确认前四组方向，仅记录该局部方向接受，不推导完整图表Human Gate、对比度、发布、Figma、迁移或Git授权。
证据：`evidence/runtime/chart-demo-data-expansion-2026-10-11/`。不做全库T22、不改其他并行工作。
