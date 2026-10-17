---
snapshotDate: "2026-10-08"
scope: "authorized-runtime-implementation"
upstreamFamilyCount: 16
upstreamExampleCount: 170
rainEntryCount: 17
implementation: "implemented-170"
automatedVerification: "scoped-passed"
visualHumanGate: "awaiting-user-review"
---

# Chart 全变体覆盖台账

> 本台账保留2026-10-08的170项来源身份和建设起点；下文“当前起点”“缺件”、17入口及示意地图描述不是最新能力结论。170项已实现，Rain本地Matrix／Network另计后当前共19入口，世界地图采用固定Natural Earth真实几何，中国业务另有固定HDX／OSM边界，统计仍为Mock。当前能力见[能力清单](../ai/chart-capabilities.md)，图例合同见[图例规则](../ai/chart-legend-rules.md)，最新技术与消费见[第二批记录](../../evidence/runtime/chart-experience-second-batch-2026-10-11/verification.md)，已有确认与待审范围见[合并人工审阅](../../evidence/runtime/chart-experience-second-batch-2026-10-11/human-review.md)。历史正文、来源映射与旧运行状态不改写。

本台账是[详细实施方案](2026-10-08-chart-variants-implementation-plan.md)的覆盖附件。目标是在“每个图型一页浏览全部变体”的既定方向下，把官网展示项变成可追踪的实施范围；初始阶段编写文档；随后用户明确授权实施，170项已接入运行，本地技术验收已完成，未提交Git。

调查日期为 **2026-10-08（Asia/Shanghai）**。示例原名及数量来自 Bklit 各 `/charts/*` 页当日可读取的公开页面正文，按实际 `View Code` 展示卡计数；网页解析访问不稳定时使用同一官方 URL 的 HTTP 正文核对。页面首屏大示例（如有）也计入。未把侧边栏、工具文档、Studio 预设、标题说明或图例项目计作展示卡，也未以静态正文证明动效已验证。

**170 是 16 个官网家族的展示项数，不是 170 个独立组件。** Rain 当前有 17 个目录入口，因为 `profit-loss` 独立成页；本表保留 `line-profit-loss` 与该入口的映射，不重复计算新增组件，不因此额外增加第 171 个官网展示项。

本次工作模式由文档规划进入 **System Mode 的未发布候选实现**，沿用未发布候选图表子入口及现有 Rain 合同。本轮实施范围与执行顺序见主方案；本文不改写既有 17 图型基线、蓝灰配方验收或发布状态。

## 状态与计数规则

每一行当前继承扩展状态：**Implementation = implemented；Automated Checks = scoped-passed；Human Visual Gate = awaiting-user-review**。逐项运行定义见`apps/playground/src/docs/components/chart-variants/reference.json`，独立状态与浏览器证据从主方案执行记录追踪。下列“当前起点”只说明可从哪里开始，不能代替这三项状态。

| 当前起点 | 含义 | 不代表 |
| --- | --- | --- |
| 相近样本 | 当前目录已有相近组合或状态，可作为展示迁移起点 | 已经按这张官网卡片完成、逐项验收 |
| 可复用底层 | 已看到公开入口与实际渲染/交互接线，可通过参数和组合形成样例 | 参数的所有排列组合均支持、无需视觉验证 |
| 缺件或扩展 | 明确缺少必要部件、接线或公开能力，需要集中补齐 | 新建同数量的独立图表组件 |
| 待核对 | 本轮未取得足够实现证据，实施前须追到公开 API、源码与实际示例 | 推定不存在、推定已支持 |

稳定 ID 使用 `family-variant`，不依赖展示顺序或中文文案；更名不改 ID。每行只有一个主分组，便于页面组织和统计；复杂示例通过能力短码表达跨分组依赖。分组为 **基础结构 / 图形材质 / 坐标辅助 / 交互状态**；“坐标辅助”同时涵盖网格、参考带、图例读数和中心/外部标签。

## 共用能力短码

短码是复用和任务索引，不是待新增组件清单。已有部件优先复用，不为每张示例创建独立实现。

| 短码 | 能力 | 本轮已知边界 |
| --- | --- | --- |
| NATIVE | 既有图型、数据与参数组合 | 保留原生 Compound API；具体新组合逐项验证 |
| FILL | 透明度、渐变、图案填充 | 使用 Rain 配方与语义，不直接把上游演示色变成新全局色板 |
| AXIS | 轴、刻度、网格、双轴及日历分隔 | 不从图名推定支持任意 XY 或矩阵 |
| LEGEND | 图例联动、数值、进度条 | 现有普通图例不自动覆盖下钻层级图例 |
| POINT | 序列点/圆环标记 | 与事件注释 EVENT 分开 |
| LOAD | 加载生命周期、骨架、脉冲/扫光 | 原生 `loading/ready` 不等于 Empty/Error/缺测 |
| SELECT | 按下/拖动期间的临时范围高亮 | 本地松开即清除，不是持久筛选或 Brush |
| BRUSH | 可见范围选择与缩放控件 | 本地仅有 `xDomain` 等支撑，缺完整控件 |
| PROJ | 目标/自动预测线及终端视觉 | 预测工具函数不等于 ProjectionLine 渲染部件 |
| EVENT | 关键事件注释 Marker | 普通圆环点标记不覆盖事件标注 |
| BG | 图案/点阵背景与边缘处理 | 缺完整 Background 渲染部件 |
| BAND | 参考区域、边界、括号及相关轴标签 | 几何/注册辅助函数不等于 ReferenceArea |
| DEPTH | 3D 柱的顶面、侧面及堆叠接缝 | 几何辅助文件不等于 3DBar |
| SQUARE | 离散方块/方环柱及吸附指示 | 布局辅助文件不等于 BarSquares |
| LIVE | 实时窗口、追加、暂停与前沿 | 生产者及缓冲留宿主；新增组合另验 |
| LABEL | 提示内容、中心/外部标签与单位 | 保留精确数据与中文字体语义 |
| ZOOM | 地图缩放或层级下钻/返回 | 能力是否接齐按图型逐项核对，不与 BRUSH 混用 |

## 汇总

| 家族 ID | 官网家族 | 展示数 | 相近样本 | 可复用底层 | 缺件或扩展 | 待核对 |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| area | [Area](https://bklit.com/charts/area-chart) | 19 | 3 | 12 | 4 | 0 |
| bar | [Bar](https://bklit.com/charts/bar-chart) | 21 | 5 | 8 | 8 | 0 |
| line | [Line](https://bklit.com/charts/line-chart) | 19 | 4 | 8 | 7 | 0 |
| live-line | [Live Line](https://bklit.com/charts/live-line-chart) | 9 | 4 | 1 | 4 | 0 |
| pie | [Pie / Donut](https://bklit.com/charts/pie-chart) | 9 | 3 | 6 | 0 | 0 |
| radar | [Radar](https://bklit.com/charts/radar-chart) | 6 | 1 | 5 | 0 | 0 |
| ring | [Ring](https://bklit.com/charts/ring-chart) | 6 | 1 | 5 | 0 | 0 |
| scatter | [Scatter](https://bklit.com/charts/scatter-chart) | 10 | 2 | 4 | 4 | 0 |
| candlestick | [Candlestick](https://bklit.com/charts/candlestick-chart) | 11 | 2 | 5 | 4 | 0 |
| choropleth | [Choropleth](https://bklit.com/charts/choropleth-chart) | 5 | 2 | 3 | 0 | 0 |
| composed | [Composed](https://bklit.com/charts/composed-chart) | 14 | 2 | 8 | 4 | 0 |
| funnel | [Funnel](https://bklit.com/charts/funnel-chart) | 9 | 3 | 6 | 0 | 0 |
| gauge | [Gauge](https://bklit.com/charts/gauge-chart) | 13 | 2 | 11 | 0 | 0 |
| heatmap | [Heatmap](https://bklit.com/charts/heatmap-chart) | 11 | 1 | 10 | 0 | 0 |
| sankey | [Sankey](https://bklit.com/charts/sankey-chart) | 5 | 2 | 3 | 0 | 0 |
| sunburst | [Sunburst](https://bklit.com/charts/sunburst-chart) | 3 | 1 | 2 | 0 | 0 |
| **合计** | **16 家族** | **170** | **38** | **97** | **35** | **0** |

| 主分组 | 展示数 |
| --- | ---: |
| 基础结构 | 44 |
| 图形材质 | 45 |
| 坐标辅助 | 53 |
| 交互状态 | 28 |

**计数修正：** Area 为 19（顶部 Interactive 加 18 张后续卡），不是前次口头统计的 18；本台账以逐行明细为准。官网演示原名中的 `-`、`–`、`—` 及大小写保持来源写法。

## Area — 19 项

来源：[Bklit Area 展示页](https://bklit.com/charts/area-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| area-interactive | Area Chart - Interactive | 双面积趋势、曲线选择与临时拖选 | 交互状态 | 可复用底层 | NATIVE SELECT |
| area-default | Area Chart | 默认平滑渐变面积 | 基础结构 | 相近样本 | NATIVE FILL |
| area-step | Area Chart - Step | 阶梯插值表达离散变化 | 基础结构 | 可复用底层 | NATIVE |
| area-stacked | Area Chart - Stacked | 多面积叠加对比；不推定累计求和 | 基础结构 | 相近样本 | NATIVE |
| area-gradient | Area Chart - Gradient | 调整底部透明度的面积填充 | 图形材质 | 可复用底层 | FILL |
| area-no-stroke | Area Chart - No Stroke | 隐藏面积轮廓线 | 图形材质 | 可复用底层 | NATIVE |
| area-fade-edges | Area Chart - Fade Edges | 左右边缘渐隐 | 图形材质 | 可复用底层 | FILL |
| area-loading | Area Chart - Loading | 网格与前景脉冲加载 | 交互状态 | 可复用底层 | LOAD |
| area-loading-sweep | Area Chart - Loading (Sweep) | 斜向扫光骨架加载 | 交互状态 | 可复用底层 | LOAD |
| area-segment-selection | Area Chart - Segment Selection | 按下并拖动时高亮一段范围 | 交互状态 | 可复用底层 | SELECT |
| area-pattern | Area Chart - Pattern | 斜线图案面积填充 | 图形材质 | 可复用底层 | FILL |
| area-series-markers | Area Chart - Series Markers | 各数据点使用圆环标记 | 图形材质 | 可复用底层 | POINT |
| area-dashed-tail | Area Chart - Dashed Tail | 未完整时段使用虚线尾段 | 图形材质 | 可复用底层 | NATIVE |
| area-left-y-axis | Area Chart - Left Y axis | 同量纲系列共用左纵轴 | 坐标辅助 | 相近样本 | AXIS |
| area-dual-y-axis | Area Chart - Left and right Y axes | 左右独立纵轴与量纲 | 坐标辅助 | 可复用底层 | AXIS |
| area-pattern-background | Area Chart - Pattern Background | 图案背景替代网格 | 坐标辅助 | 缺件或扩展 | BG |
| area-dot-grid-background | Area Chart - Dot Grid Background | 带边缘渐隐的点阵背景 | 坐标辅助 | 缺件或扩展 | BG |
| area-reference-band | Area Chart - Reference Band | 带边界标识的水平参考区间 | 坐标辅助 | 缺件或扩展 | BAND |
| area-pattern-reference-band | Area Chart - Pattern Reference Band | 图案参考区间与相应轴标签 | 坐标辅助 | 缺件或扩展 | BAND FILL AXIS |

## Bar — 21 项

来源：[Bklit Bar 展示页](https://bklit.com/charts/bar-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| bar-interactive | Bar Chart - Interactive | 90天活动柱图与悬浮读数 | 交互状态 | 可复用底层 | NATIVE |
| bar-default | Bar Chart | 默认圆头纵向柱 | 基础结构 | 可复用底层 | NATIVE |
| bar-loading | Bar Chart - Loading | 占位柱斜向扫光加载 | 交互状态 | 可复用底层 | LOAD |
| bar-3d-depth | Bar Chart - 3D Depth | 顶面侧面构成立体柱及线指示器 | 图形材质 | 缺件或扩展 | DEPTH |
| bar-3d-stacked | Bar Chart - 3D Stacked | 分段侧面的立体堆叠柱 | 基础结构 | 缺件或扩展 | DEPTH NATIVE |
| bar-multiple-series | Bar Chart - Multiple Series | 按类别比较多系列分组柱 | 基础结构 | 相近样本 | NATIVE |
| bar-stacked | Bar Chart - Stacked | 互斥类别的分段间隔堆叠 | 基础结构 | 相近样本 | NATIVE |
| bar-horizontal | Bar Chart - Horizontal | 横向柱与纵向类别标签 | 基础结构 | 可复用底层 | NATIVE AXIS |
| bar-dense-data | Bar Chart - Dense Data | 60天密集柱与窄间隔 | 基础结构 | 可复用底层 | NATIVE AXIS |
| bar-gradient | Bar Chart - Gradient | 系列渐变柱填充 | 图形材质 | 相近样本 | FILL |
| bar-shape-gradient | Bar Chart - Shape & Gradient | 离散方块柱、渐变与吸附圆环指示 | 图形材质 | 缺件或扩展 | SQUARE FILL |
| bar-shape-squircle-ring | Bar Chart - Shape Squircle Ring | 圆角方块柱与吸附方环指示 | 图形材质 | 缺件或扩展 | SQUARE |
| bar-pattern | Bar Chart - Pattern | 斜线图案柱填充 | 图形材质 | 可复用底层 | FILL |
| bar-no-gap | Bar Chart - No Gap | 零间隙柱、渐变与线指示器 | 基础结构 | 可复用底层 | NATIVE FILL |
| bar-custom-tooltip | Bar Chart - Custom Tooltip | 提示内容与数值格式定制 | 交互状态 | 相近样本 | LABEL |
| bar-left-y-axis | Bar Chart - Left Y axis | 分组柱共用左侧数值轴 | 坐标辅助 | 相近样本 | AXIS |
| bar-dual-y-axis | Bar Chart - Left and right Y axes | 左右独立数值轴 | 坐标辅助 | 可复用底层 | AXIS |
| bar-pattern-background | Bar Chart - Pattern Background | 图案背景替代网格 | 坐标辅助 | 缺件或扩展 | BG |
| bar-dot-grid-background | Bar Chart - Dot Grid Background | 带边缘渐隐的点阵背景 | 坐标辅助 | 缺件或扩展 | BG |
| bar-reference-band | Bar Chart - Reference Band | 水平参考区间与边界标识 | 坐标辅助 | 缺件或扩展 | BAND |
| bar-pattern-reference-band | Bar Chart - Pattern Reference Band | 图案参考区间与相应轴标签 | 坐标辅助 | 缺件或扩展 | BAND FILL AXIS |

## Line — 19 项

来源：[Bklit Line 展示页](https://bklit.com/charts/line-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| line-trio-brush | Line Chart - Trio with Brush | 三条曲线、顶部图例、点阵与范围缩放 | 交互状态 | 缺件或扩展 | NATIVE LEGEND BG BRUSH |
| line-projection | Line Chart - Projection | 目标与自动预测曲线、终端标记 | 交互状态 | 缺件或扩展 | PROJ |
| line-linear | Line Chart - Linear | 数据点之间直线连接 | 基础结构 | 可复用底层 | NATIVE |
| line-event-markers | Line Chart - Markers | 标注关键事件 | 坐标辅助 | 缺件或扩展 | EVENT |
| line-segment-selection | Line Chart - Segment Selection | 按下并拖动时高亮一段范围 | 交互状态 | 可复用底层 | SELECT |
| line-multiple-lines | Line Chart - Multiple Lines | 多系列时间趋势对比 | 基础结构 | 相近样本 | NATIVE |
| line-x-axis | Line Chart - X Axis | 显示日期横轴 | 坐标辅助 | 可复用底层 | AXIS |
| line-x-y-axis | Line Chart - X & Y Axis | 横轴日期与水平参考网格 | 坐标辅助 | 相近样本 | AXIS |
| line-series-markers | Line Chart - Series Markers | 各观测点圆环标记 | 图形材质 | 可复用底层 | POINT |
| line-loading | Line Chart - Loading | 网格与前景脉冲加载 | 交互状态 | 可复用底层 | LOAD |
| line-loading-sweep | Line Chart - Loading (Sweep) | 斜向扫光折线骨架 | 交互状态 | 可复用底层 | LOAD |
| line-dashed-tail | Line Chart - Dashed Tail | 从指定索引开始绘制虚线尾段 | 图形材质 | 可复用底层 | NATIVE |
| line-left-y-axis | Line Chart - Left Y axis | 多个系列共用左纵轴 | 坐标辅助 | 相近样本 | AXIS |
| line-dual-y-axis | Line Chart - Left and right Y axes | 左右独立纵轴与量纲 | 坐标辅助 | 可复用底层 | AXIS |
| line-profit-loss | Line Chart - Profit/Loss | 正负分色、零基线与图例；映射独立盈亏页 | 基础结构 | 相近样本 | NATIVE LEGEND AXIS |
| line-pattern-background | Line Chart - Pattern Background | 图案背景替代网格 | 坐标辅助 | 缺件或扩展 | BG |
| line-dot-grid-background | Line Chart - Dot Grid Background | 带边缘渐隐的点阵背景 | 坐标辅助 | 缺件或扩展 | BG |
| line-reference-band | Line Chart - Reference Band | 水平参考区间与边界标识 | 坐标辅助 | 缺件或扩展 | BAND |
| line-pattern-reference-band | Line Chart - Pattern Reference Band | 图案参考区间与相应轴标签 | 坐标辅助 | 缺件或扩展 | BAND FILL AXIS |

## Live Line — 9 项

来源：[Bklit Live Line 展示页](https://bklit.com/charts/live-line-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| live-line-interactive | Live Line Chart - Interactive | 实时流、十字指示与动态轴 | 交互状态 | 相近样本 | LIVE AXIS |
| live-line-default | Live Line Chart | 平滑滚动、实时点与提示交互 | 基础结构 | 相近样本 | LIVE |
| live-line-now-offset | Live Line - Now Offset | 右侧保留前沿空间并渐隐 | 图形材质 | 相近样本 | LIVE |
| live-line-momentum-colors | Live Line - Momentum Colors | 随上升下降方向切换颜色 | 图形材质 | 相近样本 | LIVE |
| live-line-line-only | Live Line - Line Only | 仅折线与实时点，隐藏面积 | 基础结构 | 可复用底层 | LIVE |
| live-line-pattern-background | Live Line - Pattern Background | 图案背景替代网格 | 坐标辅助 | 缺件或扩展 | BG LIVE |
| live-line-dot-grid-background | Live Line - Dot Grid Background | 带边缘渐隐的点阵背景 | 坐标辅助 | 缺件或扩展 | BG LIVE |
| live-line-reference-band | Live Line - Reference Band | 随实时图显示目标参考区间 | 坐标辅助 | 缺件或扩展 | BAND LIVE |
| live-line-pattern-reference-band | Live Line - Pattern Reference Band | 图案参考区间与相应轴标签 | 坐标辅助 | 缺件或扩展 | BAND FILL AXIS LIVE |

## Pie / Donut — 9 项

来源：[Bklit Pie / Donut 展示页](https://bklit.com/charts/pie-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| pie-default | Pie Chart | 互斥类别的实心饼图 | 基础结构 | 相近样本 | NATIVE |
| pie-donut | Pie Chart - Donut | 空心环饼与动态中心读数 | 基础结构 | 相近样本 | NATIVE LABEL |
| pie-legend | Pie Chart - Legend | 图例与扇区悬浮联动 | 交互状态 | 相近样本 | LEGEND |
| pie-patterns | Pie Chart - Patterns | 每扇区的斜线图案 | 图形材质 | 可复用底层 | FILL |
| pie-gradients | Pie Chart - Gradients | 各扇区径向渐变 | 图形材质 | 可复用底层 | FILL |
| pie-grow-hover | Pie Chart - Grow Hover | 悬浮时增大外径 | 交互状态 | 可复用底层 | NATIVE |
| pie-custom-center | Pie Chart - Custom Center | 定制中心内容与读数 | 坐标辅助 | 可复用底层 | LABEL |
| pie-donut-patterns | Donut Chart - Patterns | 图案环饼与中心标签 | 图形材质 | 可复用底层 | FILL LABEL |
| pie-donut-grow-hover | Donut Chart - Grow Hover | 环饼悬浮增大外径并联动中心值 | 交互状态 | 可复用底层 | NATIVE LABEL |

## Radar — 6 项

来源：[Bklit Radar 展示页](https://bklit.com/charts/radar-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| radar-default | Radar Chart | 五维指标的多系列能力对比 | 基础结构 | 相近样本 | NATIVE |
| radar-triangle | Radar Chart - Triangle | 三维指标对比 | 基础结构 | 可复用底层 | NATIVE LABEL |
| radar-hexagon | Radar Chart - Hexagon | 六维填充图，隐藏描边与点 | 基础结构 | 可复用底层 | NATIVE LABEL |
| radar-single-series | Radar Chart - Single Series | 单一能力轮廓且隐藏角点 | 基础结构 | 可复用底层 | NATIVE |
| radar-minimal | Radar Chart - Minimal | 较少网格层并隐藏数值标签 | 坐标辅助 | 可复用底层 | NATIVE LABEL |
| radar-grid-only | Radar Chart - Grid Only | 保留环形网格，隐藏放射轴 | 坐标辅助 | 可复用底层 | NATIVE |

## Ring — 6 项

来源：[Bklit Ring 展示页](https://bklit.com/charts/ring-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| ring-default | Ring Chart | 多个独立目标的进度环与中心值 | 基础结构 | 相近样本 | NATIVE LABEL |
| ring-flat-caps | Ring Chart - Flat Caps | 平直环端替代圆头 | 图形材质 | 可复用底层 | NATIVE |
| ring-thick-rings | Ring Chart - Thick Rings | 加粗环并调整环间距 | 图形材质 | 可复用底层 | NATIVE |
| ring-three-quarter | Ring Chart - Three Quarter | 270度进度弧 | 基础结构 | 可复用底层 | NATIVE LABEL |
| ring-half-circle | Ring Chart - Half Circle | 180度上半圆进度弧 | 基础结构 | 可复用底层 | NATIVE LABEL |
| ring-legend | Ring Chart - Legend | 带进度条的交互图例 | 交互状态 | 可复用底层 | LEGEND |

## Scatter — 10 项

来源：[Bklit Scatter 展示页](https://bklit.com/charts/scatter-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| scatter-default | Scatter Chart | 多系列日期散点、外环与十字提示 | 基础结构 | 相近样本 | NATIVE POINT |
| scatter-no-rings | Scatter Chart - No Rings | 只保留实心点 | 图形材质 | 可复用底层 | POINT |
| scatter-small-dots | Scatter Chart - Small Dots | 更小半径与细外环 | 图形材质 | 可复用底层 | POINT |
| scatter-wide-ring-gap | Scatter Chart - Wide Ring Gap | 加大点与外环的间隙 | 图形材质 | 可复用底层 | POINT |
| scatter-left-y-axis | Scatter Chart - Left Y axis | 系列共用左侧数值轴 | 坐标辅助 | 相近样本 | AXIS |
| scatter-dual-y-axis | Scatter Chart - Left and right Y axes | 左右独立数值轴 | 坐标辅助 | 可复用底层 | AXIS |
| scatter-pattern-background | Scatter Chart - Pattern Background | 图案背景替代网格 | 坐标辅助 | 缺件或扩展 | BG |
| scatter-dot-grid-background | Scatter Chart - Dot Grid Background | 带边缘渐隐的点阵背景 | 坐标辅助 | 缺件或扩展 | BG |
| scatter-reference-band | Scatter Chart - Reference Band | 水平参考区间与边界标识 | 坐标辅助 | 缺件或扩展 | BAND |
| scatter-pattern-reference-band | Scatter Chart - Pattern Reference Band | 图案参考区间与相应轴标签 | 坐标辅助 | 缺件或扩展 | BAND FILL AXIS |

## Candlestick — 11 项

来源：[Bklit Candlestick 展示页](https://bklit.com/charts/candlestick-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| candlestick-tooltip-line-default | Candlestick Chart – Tooltip line matches candle | 默认色组，十字指示线随蜡烛方向变化且无圆点 | 交互状态 | 相近样本 | NATIVE LABEL |
| candlestick-tooltip-line-gradient | Candlestick – Tooltip line matches candle | 自定涨跌渐变并同步十字指示线 | 交互状态 | 可复用底层 | NATIVE FILL LABEL |
| candlestick-chart-1-3 | Candlestick – Chart 1 & 3 | 切换到对比更强的系列色组 | 图形材质 | 可复用底层 | NATIVE |
| candlestick-lime-emerald-yellow-red | Candlestick – Lime to emerald, yellow to red | 分别定制涨跌柱的渐变 | 图形材质 | 可复用底层 | FILL |
| candlestick-solid-colors | Candlestick – Solid colors | 涨跌实体使用纯色 | 图形材质 | 相近样本 | NATIVE |
| candlestick-pattern | Candlestick – Pattern | 蜡烛实体叠加斜线图案 | 图形材质 | 可复用底层 | FILL |
| candlestick-tooltip-only | Candlestick – Tooltip only | 只保留提示框，隐藏指示线和点 | 交互状态 | 可复用底层 | LABEL |
| candlestick-pattern-background | Candlestick - Pattern Background | 图案背景替代网格 | 坐标辅助 | 缺件或扩展 | BG |
| candlestick-dot-grid-background | Candlestick - Dot Grid Background | 带边缘渐隐的点阵背景 | 坐标辅助 | 缺件或扩展 | BG |
| candlestick-reference-band | Candlestick - Reference Band | 水平参考区间与边界标识 | 坐标辅助 | 缺件或扩展 | BAND |
| candlestick-pattern-reference-band | Candlestick - Pattern Reference Band | 图案参考区间与相应轴标签 | 坐标辅助 | 缺件或扩展 | BAND FILL AXIS |

## Choropleth — 5 项

来源：[Bklit Choropleth 展示页](https://bklit.com/charts/choropleth-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| choropleth-interactive | Choropleth Chart - Interactive | 分区地图交互读取访问量 | 交互状态 | 相近样本 | NATIVE ZOOM LABEL |
| choropleth-default | Choropleth Chart | 单色分区地图与经纬网 | 基础结构 | 可复用底层 | NATIVE AXIS |
| choropleth-analytics | Choropleth Chart - Analytics | 按数值映射地区色阶 | 图形材质 | 相近样本 | NATIVE LABEL |
| choropleth-graticule | Choropleth Chart - Graticule | 突出经纬参考线 | 坐标辅助 | 可复用底层 | AXIS |
| choropleth-patterns | Choropleth Chart - Patterns | 各地区使用带颜色的图案填充 | 图形材质 | 可复用底层 | FILL |

## Composed — 14 项

来源：[Bklit Composed 展示页](https://bklit.com/charts/composed-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| composed-default | Composed Chart | 共享时间轴组合面积、柱与折线 | 基础结构 | 相近样本 | NATIVE AXIS |
| composed-bar-line | Composed Chart — Bar + line | 每日柱与一条趋势线 | 基础结构 | 可复用底层 | NATIVE |
| composed-lime-amber-red | Composed Chart — Lime / amber / red | 多类型系列的独立强调色 | 图形材质 | 可复用底层 | NATIVE |
| composed-stacked-bar-line | Composed Chart — Stacked SeriesBar + line | 互斥分段堆叠柱与趋势线 | 基础结构 | 可复用底层 | NATIVE |
| composed-grouped-no-gap | Composed Chart — Grouped bars, no gap | 零间隙分组柱 | 基础结构 | 可复用底层 | NATIVE |
| composed-pattern-fills | Composed Chart — Pattern fills | 图案柱、纯色柱与趋势线 | 图形材质 | 可复用底层 | FILL |
| composed-bar-two-lines | Composed Chart — Bar + two lines | 每日柱与两条趋势线 | 基础结构 | 可复用底层 | NATIVE |
| composed-markers-dashed-tail | Composed Chart — Markers & dashed tail | 折线和面积的点标记及虚线尾段 | 图形材质 | 可复用底层 | POINT NATIVE |
| composed-left-y-axis | Composed Chart — Left Y axis | 柱和线共用左侧数值轴 | 坐标辅助 | 可复用底层 | AXIS |
| composed-dual-y-axis | Composed Chart — Left and right Y axes | 左轴数量、右轴独立量纲 | 坐标辅助 | 相近样本 | AXIS |
| composed-pattern-background | Composed Chart - Pattern Background | 图案背景替代网格 | 坐标辅助 | 缺件或扩展 | BG |
| composed-dot-grid-background | Composed Chart - Dot Grid Background | 带边缘渐隐的点阵背景 | 坐标辅助 | 缺件或扩展 | BG |
| composed-reference-band | Composed Chart - Reference Band | 水平参考区间与边界标识 | 坐标辅助 | 缺件或扩展 | BAND |
| composed-pattern-reference-band | Composed Chart - Pattern Reference Band | 图案参考区间与相应轴标签 | 坐标辅助 | 缺件或扩展 | BAND FILL AXIS |

## Funnel — 9 项

来源：[Bklit Funnel 展示页](https://bklit.com/charts/funnel-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| funnel-default | Funnel Chart | 多层光环漏斗与阶段悬浮读取 | 基础结构 | 相近样本 | NATIVE LEGEND |
| funnel-vertical | Vertical | 由上向下的纵向漏斗 | 基础结构 | 可复用底层 | NATIVE |
| funnel-vertical-straight-grid | Vertical Straight with Grid | 纵向直边漏斗加辅助网格 | 基础结构 | 可复用底层 | NATIVE AXIS |
| funnel-straight-edges | Straight Edges | 直线几何边替代曲边 | 基础结构 | 可复用底层 | NATIVE |
| funnel-segment-colors | Per-Segment Colors | 每阶段使用独立纯色 | 图形材质 | 相近样本 | NATIVE |
| funnel-gradient-segments | Gradient Segments | 阶段采用线性渐变 | 图形材质 | 相近样本 | FILL |
| funnel-pattern-fill | Pattern Fill | 最内层使用斜线图案 | 图形材质 | 可复用底层 | FILL |
| funnel-grouped-labels | Grouped Labels | 标签集中成组排列 | 坐标辅助 | 可复用底层 | LABEL |
| funnel-grid-background | Grid Background | 交替底带与网格辅助比较 | 坐标辅助 | 可复用底层 | NATIVE AXIS |

## Gauge — 13 项

来源：[Bklit Gauge 展示页](https://bklit.com/charts/gauge-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| gauge-default | Gauge | 刻度弧、主题填充与中心数值 | 基础结构 | 相近样本 | NATIVE LABEL |
| gauge-tight-arc-fillets | Gauge — tight arc, filleted corners | 无刻度间隙、圆角与自定弧段 | 图形材质 | 可复用底层 | NATIVE |
| gauge-dual-arc-gradients | Gauge — dual arc gradients | 激活及未激活弧段分别渐变 | 图形材质 | 可复用底层 | FILL |
| gauge-pattern-dim-track | Gauge — pattern foreground, dim solid track | 前景图案与低透明度实色轨道 | 图形材质 | 可复用底层 | FILL |
| gauge-sparse-quarter-sweep | Gauge — sparse ring, quarter sweep | 稀疏刻度的局部弧段；角度按源例复核 | 基础结构 | 可复用底层 | NATIVE |
| gauge-bottom-half-sweep | Gauge — same density, bottom half sweep | 保持稀疏刻度并转向下半圆 | 基础结构 | 可复用底层 | NATIVE |
| gauge-flipped-sweep | Gauge — flipped sweep (270° → 450°) | 旋转弧段，使缺口位于另一侧 | 基础结构 | 可复用底层 | NATIVE |
| gauge-soft-fillets-full-depth | Gauge — soft fillets, full depth | 保留刻度深度并柔化圆角 | 图形材质 | 可复用底层 | NATIVE |
| gauge-short-bold-notches | Gauge — short notches, bold corners | 缩短刻度径向深度并加大圆角 | 图形材质 | 可复用底层 | NATIVE |
| gauge-near-circular-notches | Gauge — near-circular notches | 几何约束下近圆形刻度 | 图形材质 | 可复用底层 | NATIVE |
| gauge-linear-track | Gauge — linear notch track | 响应容器宽度的横向刻度条 | 基础结构 | 相近样本 | NATIVE |
| gauge-linear-label-below | Gauge — linear with label below | 横向刻度条下方显示标签与值 | 坐标辅助 | 可复用底层 | NATIVE LABEL |
| gauge-linear-dual-gradients | Gauge — linear dual gradients | 横向激活及未激活刻度分别渐变 | 图形材质 | 可复用底层 | FILL |

## Heatmap — 11 项

来源：[Bklit Heatmap 展示页](https://bklit.com/charts/heatmap-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| heatmap-contributions | Heatmap Chart - Contributions | 圆形日历格、季度线与图例联动 | 交互状态 | 可复用底层 | NATIVE AXIS LEGEND |
| heatmap-default | Heatmap Chart | 半年贡献日历格、坐标与提示 | 基础结构 | 相近样本 | NATIVE AXIS LABEL |
| heatmap-pattern-levels | Heatmap Chart - Pattern Levels | 色阶图案同步用于格子与图例 | 图形材质 | 可复用底层 | FILL LEGEND |
| heatmap-solid-separators | Heatmap Chart - Solid Separators | 纯色实线季度分隔 | 坐标辅助 | 可复用底层 | AXIS |
| heatmap-compact-y-quarter | Heatmap Chart - Compact Y Axis & Quarter Separators | 紧凑星期标签与渐隐季度线 | 坐标辅助 | 可复用底层 | AXIS |
| heatmap-dashed-separators | Heatmap Chart - Dashed Separators | 隐藏纵轴并显示渐隐虚线季度分隔 | 坐标辅助 | 可复用底层 | AXIS |
| heatmap-loading | Heatmap Chart - Loading | 单元格扫光骨架加载 | 交互状态 | 可复用底层 | LOAD |
| heatmap-horizontal-scroll | Heatmap Chart - Horizontal Scroll | 半年窗口内横向浏览全年 | 交互状态 | 可复用底层 | NATIVE |
| heatmap-gradient-legend | Heatmap Chart - Gradient Legend | 连续渐变图例与定制两端文案 | 坐标辅助 | 可复用底层 | FILL LEGEND |
| heatmap-monday-start | Heatmap Chart - Monday Start | 周一起始并弱化周末行 | 基础结构 | 可复用底层 | NATIVE AXIS |
| heatmap-active-scale-hover | Heatmap Chart - Active Scale Hover | 增大悬浮单元格与格间距 | 交互状态 | 可复用底层 | NATIVE |

## Sankey — 5 项

来源：[Bklit Sankey 展示页](https://bklit.com/charts/sankey-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| sankey-interactive | Sankey Chart - Interactive | 从来源到结果的流向交互 | 交互状态 | 相近样本 | NATIVE LABEL |
| sankey-default | Sankey Chart | 带节点标签和提示的流向图 | 基础结构 | 相近样本 | NATIVE LABEL |
| sankey-no-labels | Sankey Chart - No Labels | 隐藏节点标签的紧凑流向图 | 坐标辅助 | 可复用底层 | LABEL |
| sankey-simple | Sankey Chart - Simple | 减少节点的最简流向 | 基础结构 | 可复用底层 | NATIVE |
| sankey-solid-links | Sankey Chart - Solid Links | 实色连接替代渐变 | 图形材质 | 可复用底层 | FILL |

## Sunburst — 3 项

来源：[Bklit Sunburst 展示页](https://bklit.com/charts/sunburst-chart)。

| 稳定 ID | 官网准确原名 | 中文意图 | 归属分组 | 当前起点 | 所需共用能力 |
| --- | --- | --- | --- | --- | --- |
| sunburst-interactive | Sunburst Chart - Interactive | 层级构成、下钻与返回 | 交互状态 | 相近样本 | NATIVE ZOOM LABEL |
| sunburst-patterns | Sunburst Chart - Patterns | 指定内环扇区使用斜线图案 | 图形材质 | 可复用底层 | FILL |
| sunburst-legend | Sunburst Chart - Legend | 图例随当前层级及悬浮同步 | 交互状态 | 可复用底层 | LEGEND ZOOM |

## 起点判断依据与实施前限制

本地源码引用均相对本文件目录，指向此次调查时的工作树。它们支持“当前起点”的判断，不是新增 170 展示项的完成证据。

- **当前样本**：[`chart-examples.tsx`](../../apps/playground/src/docs/components/chart-examples.tsx) 的 TimeExample、BarsExample、RadialExample、LiveExample 等；[目录/配方](../../apps/playground/src/docs/components/chart-catalog.ts)；[数据合同入口](../ai/charts.md)。当前样本包含图例联动、精确数据表及业务数据边界，扩展时保留。
- **Area / Line**：[`area.tsx`](../../packages/ui/src/charts/vendor/charts/area.tsx)、[`line.tsx`](../../packages/ui/src/charts/vendor/charts/line.tsx)、[`area-chart.tsx`](../../packages/ui/src/charts/vendor/charts/area-chart.tsx)、[`line-chart.tsx`](../../packages/ui/src/charts/vendor/charts/line-chart.tsx) 中已接 curve、填充、marker、虚线尾与加载；[`use-chart-interaction.ts`](../../packages/ui/src/charts/vendor/charts/use-chart-interaction.ts)、[`use-highlight-segment.ts`](../../packages/ui/src/charts/vendor/charts/use-highlight-segment.ts) 已接临时拖选高亮。Step 所需曲线来自已安装依赖，但 `curveStep` 尚未由当前 charts 入口导出；补公开导出与示例即可，不能让消费者走私有 vendor 路径。
- **Area 的 Stacked 语义**：官网说明为 “Layered areas comparing desktop and mobile”。本地多个 Area 各自绘制同一基线上的独立面积，没有累计 offset；既有合同明确“透明叠加不表示总和”。本行只是叠加对比样例映射，不授权累计堆叠，也不能把别处 SeriesBar 的堆叠能力借作 Area 已支持的证据。需要数学累计面积时另定数据和 API 合同。
- **Line 预测、Brush 与事件标记**：[`index.ts`](../../packages/ui/src/charts/index.ts) 可见预测算法及参考区域几何导出，但没有完整 ProjectionLine、Brush、Background、ReferenceArea、事件 Marker 渲染部件。`xDomain` 是支撑接口，不是缩放控件。官网 Projection 卡明确不支持与 brush zoom 一起使用；本范围不承诺把二者强行组合。
- **Pie / Ring / Radar / Scatter**：[`pie-slice.tsx`](../../packages/ui/src/charts/vendor/charts/pie-slice.tsx)、[`pie-center.tsx`](../../packages/ui/src/charts/vendor/charts/pie-center.tsx)、[`ring-chart.tsx`](../../packages/ui/src/charts/vendor/charts/ring-chart.tsx)、[`ring.tsx`](../../packages/ui/src/charts/vendor/charts/ring.tsx)、[`legend-progress.tsx`](../../packages/ui/src/charts/vendor/charts/legend/legend-progress.tsx)、[`radar-chart.tsx`](../../packages/ui/src/charts/vendor/charts/radar-chart.tsx)、[`radar-area.tsx`](../../packages/ui/src/charts/vendor/charts/radar-area.tsx)、[`scatter.tsx`](../../packages/ui/src/charts/vendor/charts/scatter.tsx) 和 [公共导出](../../packages/ui/src/charts/index.ts) 支持表中已标“可复用底层”的配置与组合。三/六维雷达仍要提供符合量纲与固定维度次序的新数据。
- **Bar**：同轮源码核查确认 5 项相近样本、8 项可复用底层、8 项缺件或扩展。DEPTH / SQUARE 必须补完整渲染，不能只凭已有几何函数标为完成；BG / BAND 是跨家族共用缺口。
- **Candlestick**：现有 [`CandleExample`](../../apps/playground/src/docs/components/chart-examples.tsx)（第255—265行）已有涨跌纯色、随当前蜡烛变色的指示线及无圆点提示；[`candlestick.tsx`](../../packages/ui/src/charts/vendor/charts/candlestick.tsx)（第14—30行）与 [`chart-tooltip.tsx`](../../packages/ui/src/charts/vendor/charts/tooltip/chart-tooltip.tsx)（第27—84行）已接渐变填充、实体纹理、指示线/圆点显隐及颜色回调。因此纯色卡归为相近样本，其余对应配置归为可复用底层；4张背景/参考带仍依赖共享 BG / BAND 补件。
- **Choropleth**：现有 [`MapExample`](../../apps/playground/src/docs/components/chart-examples.tsx)（第241—251行）已有地区色阶和提示；[`choropleth-feature.tsx`](../../packages/ui/src/charts/vendor/charts/choropleth/choropleth-feature.tsx)（第15—25行）、[`choropleth-graticule.tsx`](../../packages/ui/src/charts/vendor/charts/choropleth/choropleth-graticule.tsx)（第7—29行）、[`choropleth-chart.tsx`](../../packages/ui/src/charts/vendor/charts/choropleth/choropleth-chart.tsx)（第33—63行）及 [公开导出](../../packages/ui/src/charts/index.ts)（第97—116行）已具备单色、区域纹理、经纬网及缩放平移。**当前样本只有自创示意区域，缺官网世界地图的数据样本**；若展示真实世界地图，需另补可核查来源的几何数据、地区键与数值映射。此数据工作不因渲染能力可复用而视为完成；缩放和真实地图布局仍待运行验证。
- **Composed**：现有 [`TimeExample`](../../apps/playground/src/docs/components/chart-examples.tsx)（第69—75行）已有面积/柱/折线及左右双轴；[`composed-chart.tsx`](../../packages/ui/src/charts/vendor/charts/composed-chart.tsx)（第35—44行、第220—263行）与 [`series-bar.tsx`](../../packages/ui/src/charts/vendor/charts/series-bar.tsx)（第82—94行）已接分组、柱堆叠、间距、圆角和填充，配合 [`line.tsx`](../../packages/ui/src/charts/vendor/charts/line.tsx) / [`area.tsx`](../../packages/ui/src/charts/vendor/charts/area.tsx) 的点标记、虚线尾与曲线参数形成其余组合。堆叠当前为顺序累计，本批示例使用非负互斥分段，不据此承诺正负混合累计；4张 BG / BAND 卡仍缺共享部件。
- **Funnel**：现有 [`FunnelExample`](../../apps/playground/src/docs/components/chart-examples.tsx)（第165—181行）已有横向曲边、阶段色与渐变；[`funnel-chart.tsx`](../../packages/ui/src/charts/vendor/charts/funnel-chart.tsx)（第40—109行）已将 orientation、edges、renderPattern、labelLayout / labelOrientation / labelAlign 及 grid 接至实际渲染。竖向、直边、纹理、集中标签与网格均可复用底层，仍需各自展示配方、中文长标签与窄宽度验证。
- **Gauge**：现有 [`GaugeExample`](../../apps/playground/src/docs/components/chart-examples.tsx)（第184—195行）已有弧形/线性切换；[`gauge.tsx`](../../packages/ui/src/charts/vendor/charts/gauge.tsx)（第39—84行、第132—147行、第237—265行）已接弧度、数量/间距、刻度长度/宽度/圆角、前后景独立渐变、defs 图案和线性标签位置。其余11张卡可配置展示；实际弧形轮廓、密集大圆角及标签位置须逐卡目视核对，不以参数存在视为完成。
- **Heatmap**：现有 [`HeatmapExample`](../../apps/playground/src/docs/components/chart-examples.tsx)（第230—238行）已有日历格、图例、提示与缺测留白；[`heatmap-chart.tsx`](../../packages/ui/src/charts/vendor/charts/heatmap/heatmap-chart.tsx)（第64—128行）、[`heatmap-separator.tsx`](../../packages/ui/src/charts/vendor/charts/heatmap/heatmap-separator.tsx)（第19—74行）、[`heatmap-cells.tsx`](../../packages/ui/src/charts/vendor/charts/heatmap/heatmap-cells.tsx)（第155—171行）和 [`heatmap-legend.tsx`](../../packages/ui/src/charts/vendor/charts/heatmap/heatmap-legend.tsx)（第30—61行）已具备格形、季度线、分级纹理、渐变图例、周起始、行透明度与悬停放大；[`HeatmapChartLoading`](../../packages/ui/src/charts/vendor/charts/heatmap/heatmap-chart-loading.tsx) 已有实际骨架组合并公开导出。**Horizontal Scroll 是宿主的横向滚动容器＋固定格宽/全年数据组合，不是新内建 scroll 布局**；滚动时坐标/提示及加载到数据的切换仍待验证。
- **Sankey**：现有 [`FlowExample`](../../apps/playground/src/docs/components/chart-examples.tsx)（第198—208行）已有标签、渐变流线和节点/连接提示；[`sankey-node.tsx`](../../packages/ui/src/charts/vendor/charts/sankey/sankey-node.tsx)（第26—47行）与 [`sankey-link.tsx`](../../packages/ui/src/charts/vendor/charts/sankey/sankey-link.tsx)（第51—76行）已接标签显隐、颜色与渐变开关。No Labels / Solid Links 复用配置，Simple 更换符合合同的数据；仍须验证不同密度的布局，官网 pre-alpha 边界不因此消失。
- **Sunburst**：现有 [`SunburstExample`](../../apps/playground/src/docs/components/chart-examples.tsx)（第217—226行）已有下钻、面包屑返回和悬停；[`sunburst-segment.tsx`](../../packages/ui/src/charts/vendor/charts/sunburst-segment.tsx)（第16—23行）已有纹理/渐变 fill。[`sunburst-chart.tsx`](../../packages/ui/src/charts/vendor/charts/sunburst-chart.tsx)（第85—103行）的受控 focusId / onFocusChange / hoveredIndex / onHoverChange、[公开 hooks](../../packages/ui/src/charts/index.ts)（第443—449行）和既有 ChartLegend 足够组合层级图例，所以归为可复用底层。**层级图例尚未接线**：实施时仍须按当前焦点筛选图例、连接双向悬停并处理下钻后的索引同步；无专用 SunburstLegend 不等于需要新建底层组件，也不等于图例已完成。
- **本轮源码起点核对的边界**：后8家族原49条“待核对”现已逐项得到参数、渲染和公开入口证据，其中1条改为相近样本、48条改为可复用底层；这里只消除起点资料不足，不消除各卡实施、运行、视觉和数据准备工作。全表35条“缺件或扩展”继续集中处理共享缺口；没有把不存在的渲染部件用同名辅助函数代替。
- **主方案的新增执行状态**与 [当前阶段记录](../../status/current-phase.yaml)、[ADR 0012](../adr/0012-bklit-rain-charts.md)、[现有源码锁](../../packages/ui/src/charts/vendor/source-lock.json) 分开维护。新部件从可核查的上游提交取最小依赖闭包，不能把官网当日页面等同于本地已固定提交。
- **状态与组合边界**：本地 Empty、Invalid、Missing、Zero、Single、长标签、Reduced Motion 等按原合同保留；它们不计入这 170 张官网卡。Dark、密度、配方、状态、变体的全笛卡尔积尚未逐项验证，不承诺全部任意交叉组合。
- **有名不等于有确切几何**：Gauge 的 “quarter sweep” 原名与页面说明的角度用语需在执行该行时按实际代码/画面核准；原名保留，本文不据此宣称 90° 弧。任何网页名称/说明与示例行为冲突均记为该行待核对事实，不默默改动来源标题。

## 文档校验与后续回填

本轮允许的校验仅是文档结构、稳定 ID 唯一、16 家族计数、170 行总数、分组/起点枚举、能力短码及本地链接存在性；这些检查不改变任何图表的 Implementation、Automated Checks 或 Human Gate。

进入主方案的实施阶段后，以本表稳定 ID 对应展示入口与证据；先记录实现，再记录自动检查，再等待用户视觉结论，三者分开。若官网新增/删除/重命名卡片，应另记快照差异，不改写此次 2026-10-08 基线的历史数量。


本轮技术交付：[验收](../../evidence/runtime/chart-variants/run-_tv8jhva/verification.md)、[170项技术状态](../../evidence/runtime/chart-variants/run-_tv8jhva/per-variant-results.json)、[逐项视觉待审](../../evidence/runtime/chart-variants/run-_tv8jhva/per-variant-review/human-review.csv)。T00—T14本地技术实施完成，视觉仍逐项pending。
