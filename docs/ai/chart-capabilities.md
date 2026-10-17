# Rain 图表能力清单

最新收尾结果见[工程与质量记录](../../evidence/runtime/chart-closeout-2026-10-11/verification.md)，待确认范围与真实业务／设备／发布条件见[当前审阅入口](../../evidence/runtime/chart-closeout-2026-10-11/human-review.md)。以下能力数量与历史确认范围保持。

核对日期：2026-10-11（Asia/Shanghai）。图表仍为 `registry-candidate / unpublished`。第三批的四族体验、当前工程与消费见[最新技术记录](../../evidence/runtime/chart-experience-third-batch-2026-10-11/verification.md)，实时入口与待审范围见[第三批人工审阅](../../evidence/runtime/chart-experience-third-batch-2026-10-11/human-review.md)。19入口的各自已有确认见[合并台账](../../evidence/runtime/chart-experience-second-batch-2026-10-11/human-review.md)，历史证据保留原范围。默认先从[按业务问题选图](charts.md#按业务关系选图)进入；接入见[AI 与开发指引](charts.md#ai-与开发接入指引)和[技术 API](../../packages/ui/src/charts/README.md)。

## 1. 统计口径与查阅入口

| 对象 | 当前数量 | 如何计数 |
| --- | ---: | --- |
| 可检索图表入口 | **19** | 原 17 个 Bklit 来源入口 + Rain 本地 Matrix、Network；与 [Registry](../../registry/charts.json)、19 份 Manifest、[目录](../../apps/playground/src/docs/components/chart-catalog.ts)对应 |
| 上游展示变体 | **170** | 固定来源快照的 16 个家族；盈亏线在 Rain 单独成页，属于来源 line 家族；不是 170 个公共组件 |
| 展示变体分组 | **4** | 基础结构 44、图形材质 45、坐标辅助 53、交互状态 28 |
| 具名配色／表现配方 | **10** | [rainChartRecipes](../../packages/ui/src/charts/recipes.ts) 的 10 个 ID；颜色与形态参数共同使用，不是万能换肤配置 |
| 业务查阅入口 | **5** | 迷你与嵌入、分类矩阵、分类与周期、关系网络、中国地区；与 19 个入口存在复用关系，不能相加成 24 个图型 |

`DataBar` 是条形家族的额外公共组件；环饼属于 Pie，进度弧属于 Ring，迷你是宿主尺寸配方，分类横轴是 Line/Area/Composed 的模式，中国地图是 Choropleth 的业务宿主。上述内容均不另增图型计数。

170 项的稳定 ID、来源标题与映射以 [reference.json](../../apps/playground/src/docs/components/chart-variants/reference.json) 为准；逐项名称可查[全变体台账](../plans/2026-10-08-chart-variants-coverage.md)。台账里的“相近样本／缺件”列描述最初建设起点；当前能力以本清单、公开类型与实际示例为准。

## 2. 完整图表目录

下表每个 ID 对应 Playground `/#chart-<id>`。图名链接进入 Manifest，可继续查 `sourcePath`、Props、Parts 和证据；公共导出统一来自 [charts/index.ts](../../packages/ui/src/charts/index.ts)。全部行表示“当前已有实现”，视觉确认范围在第 6 节单独列出。

| ID | 图表／公共 API | 当前能力 | 主要使用边界 | 170 集合内数量 |
| --- | --- | --- | --- | ---: |
| area | [面积](../../manifests/ui/chart-area.yaml) · `AreaChart` / `Area` | 时间或分类趋势、多系列透明叠加、曲线、渐变／纹理、缺测断口、迷你配方 | 叠加不是累计堆叠；分类模式不使用时间专属交互 | 19 |
| line | [折线](../../manifests/ui/chart-line.yaml) · `LineChart` / `Line` | 时间或分类趋势、多系列、点与末端标记、缺测断线；时间模式可组合 Brush、预测、事件 | 不承诺缺测插值、所有点键盘导航或通用点击固定提示 | 18 |
| bar | [柱／横条](../../manifests/ui/chart-bar.yaml) · `BarChart` / `Bar` / `DataBar` | 横纵、分组、互斥堆叠、固定量程、排名、评分／相对位置、渐变／渐隐、深度／方块、迷你 | 条柱非负、零基线；同组共用域；独立 Bar 双轴仅纵向非堆叠；3D 更新路径与 2D 不等同 | 21 |
| composed | [组合](../../manifests/ui/chart-composed.yaml) · `ComposedChart` | Line / Area / `SeriesBar` 同图、时间／分类、分轴、逐轴固定域、同轴堆叠、周期对照 | `Bar` 不替代 `SeriesBar`；比率分母由宿主计算；同堆叠组必须同轴 | 14 |
| pie | [饼／环饼](../../manifests/ui/chart-pie.yaml) · `PieChart` | 完整互斥构成、扇区强调、中心读数、纹理／渐变、小饼／环饼 | 非负；零总量不造比例；环饼不表示各自独立目标 | 9 |
| ring | [目标进度环](../../manifests/ui/chart-ring.yaml) · `RingChart` | 单／多目标环、连续进度弧、中心及图例读数、小环／弧 | 每项独立 `value/maxValue`；`maxValue>0`，超目标由宿主解释；不合并独立分母 | 6 |
| radar | [雷达](../../manifests/ui/chart-radar.yaml) · `RadarChart` | 多维同尺度比较、面积／描边／点、网格与轴、系列图例联动 | 固定维度顺序与 0—100 归一；归一方法归宿主，不把缺测当 0 | 6 |
| scatter | [时间散点](../../manifests/ui/chart-scatter.yaml) · `ScatterChart` | 日期上的多系列观测、点与提示、可组合辅助标记 | X 是 Date，Y 非负；任意数值 XY 与负 Y 未支持 | 10 |
| funnel | [漏斗](../../manifests/ui/chart-funnel.yaml) · `FunnelChart` | 有序阶段、阶段人数／比例、渐变层与聚焦 | 阶段与入口分母明确；阶段增长不直接解释为流失；零入口不造比例 | 9 |
| gauge | [仪表](../../manifests/ui/chart-gauge.yaml) · `Gauge` | 单目标、弧形／线形刻度、中心读数、底轨／渐变 | 先归一到 0—100；不是任意业务量程或阈值告警引擎 | 13 |
| sankey | [桑基](../../manifests/ui/chart-sankey.yaml) · `SankeyChart` | 节点、带宽流向、来源到目标渐变、节点／路径提示 | source/target 是有效节点索引；非负权重；守恒、去重和单位由宿主核对 | 5 |
| sunburst | [旭日](../../manifests/ui/chart-sunburst.yaml) · `SunburstChart` | 层级构成、扇区读数、下钻、中心标题与面包屑返回 | 父值来自叶项，不重复累加父项；零总量不绘制假构成 | 3 |
| heatmap | [日历热图](../../manifests/ui/chart-heatmap.yaml) · `HeatmapChart` | 日期网格、周起始、月份／季度分隔、色阶／纹理、图例、内部横滚、逐日键盘巡读与更新重读 | 每周 7 天；0 与 no-data 区分；不是任意分类矩阵 | 11 |
| choropleth | [分区地图](../../manifests/ui/chart-choropleth.yaml) · `ChoroplethChart` | GeoJSON、地区色阶与提示、可配置缩放、适配 geometry、地区激活；世界与国内宿主 | 几何和地区值归宿主；默认世界图不展示缩放；国内下钻不是内置中国数据 API | 5 |
| candlestick | [K 线](../../manifests/ui/chart-candlestick.yaml) · `CandlestickChart` | OHLC、方向色、坐标／提示及辅助标记 | 日期有效；low ≤ min(open,close)，high ≥ max(open,close)；红绿不默认表示业务好坏 | 11 |
| profit-loss | [盈亏线](../../manifests/ui/chart-profit-loss.yaml) · `ProfitLossLine` | 正负分段、过零、语义色／图例 | 与 `LineChart` 和同 dataKey 的 `Line` 配合注册域；不能单独挂在 div 内 | 1 |
| live-line | [实时折线](../../manifests/ui/chart-live-line.yaml) · `LiveLineChart` | 实时窗口、末端、动量色、暂停／恢复与手动推进 | 点时间 Unix 秒；`frozenNow` Unix 毫秒；生产者、窗口与清理归宿主，示例上限 120 点不是库的性能保证 | 9 |
| matrix | [分类矩阵](../../manifests/ui/chart-matrix.yaml) · `MatrixChart` | 连续／离散步值热度、数量面积气泡、离散等级；格内读数、联动图例、固定行标题、方向键巡读 | 行列稳定 ID；0／缺测／不适用独立；已覆盖 12×12 与 7×24，更大规模另测 | 0（本地新增） |
| network | [关系网络](../../manifests/ui/chart-network.yaml) · `NetworkChart` | glow／structured 两样式、类别／关系／方向、多关系、邻接预览、固定详情、筛选稳定路径、进出与切换动效 | 当前 4 组样本为 8—11 节点、10—19 边；位置／面积／线宽不编码权重；无图编辑或力导模拟 | 0（本地新增） |
| 合计 | 19 个入口 | 原有能力与 Rain 业务扩展共用公开子入口 | 不承诺任意参数组合均已验收 | **170** |

## 3. 可组合能力与责任边界

这些是公开部件或已实现组合，不是所有图型都支持的统一开关。

| 能力 | 可用部件／方式 | 范围与限制 |
| --- | --- | --- |
| 坐标与网格 | `Grid`、`XAxis/YAxis`、`BarXAxis/BarYAxis`、`LiveXAxis/LiveYAxis`、日历轴 | 按所属图型选择；分类模式不套用 Date 或 Live 轴 |
| 多轴与固定量程 | `yAxisId`、`ComposedChart.yDomains`、`BarChart.valueDomain` | 目前固定域为零基线；自动域与固定满分语义不同；排序／筛选不偷偷重设比较口径 |
| 曲线 | `curveBasis`、`curveCatmullRom`、`curveLinear`、`curveMonotoneX`、`curveNatural`、`curveStep` | 6 种公开曲线；平滑曲线是绘制选择，不是新增观测或缺测插值 |
| 材质与背景 | `Background`、`PatternArea`、图案 Parts、SVG defs、`BarDepth*`、`BarSquares/BarColumnTrack` | 渐变／clip／marker ID 每实例独立；3D、方块与普通柱分别选择，不自动叠加 |
| 读数与图例 | `ChartTooltip`、`TooltipContent`、`TooltipBox`、`ChartLegend`、`Legend`／`LegendItemComponent`等独立Parts、各图中心与标签 | `ChartLegend` 有 `onHover` 时默认按钮、无回调时静态；稳定唯一 `label` 维持身份，自定义 renderItem／children自带按钮语义；临时聚焦不隐藏系列或合计独立分母，见[图例规则](chart-legend-rules.md) |
| 加载与数值反馈 | `ChartConfigProvider`、`ChartLoadingLabel`、骨架／扫光 Parts、`ChartStatFlow` | 原生 loading/ready 不能代替宿主 error/empty/invalid；不是每图自动具备相同加载方式 |
| 临时拖选 | `SegmentBackground/LineFrom/LineTo`、交互回调 | 按下／拖动期间高亮，与持久范围选择分开 |
| 时间范围选择 | `ChartBrush`、`ChartBrushLayout`、轨道／选择覆盖层 | 用于已接线的时间系列，支持示例鼠标／键盘／重置；分类模式拒绝 |
| 预测与参考区 | `ProjectionLine/EndMarker`、`ReferenceArea` | 时间模式的显示／计算辅助；不是统计预测准确性承诺；分类模式拒绝时间专属组合 |
| 点、事件与末端 | `SeriesMarkers`、`SeriesPointMarker`、`LineSeriesTerminalMarker`、`ChartMarkers/MarkerGroup` | 序列点与事件注释不同；日期事件不能直接应用到分类模式 |
| 更新与运动 | 原生入场、2D 连续更新、稳定 ID 重排、有限网络／矩阵过渡、减少动效 | 重播、后台、离屏和生产者由实际组件与宿主共同处理；没有全库统一暂停／点击固定 API |
| 层级与返回 | 旭日 focus／Breadcrumb，Choropleth 激活＋中国地图宿主 | 地图层级请求、失败重试、返回与视角保存归宿主；不是通用业务路由 |
| 等价读取 | 原生表格、精确表、具名按钮、矩阵单一键盘入口、HeatmapCells逐日键盘入口 | 日历方向键／Home／End／Ctrl+Home／End／Escape已实现，不要求renderItem；hover 不代表全图键盘可达，物理设备与完整无障碍验收仍单独记录 |

## 4. 五类业务入口

路径相对正在运行的 Playground；独立图库为 `/bklit-catalog.html`。所有业务统计与详情均为 Mock。

| 入口 | 当前包含 | 复制入口与宿主责任 |
| --- | --- | --- |
| `/#chart-business` | 普通／分组／堆叠横条、排名、评分／相对位置；细条、分段条、迷你柱／折线／面积、小饼／环饼、目标环／弧；Table / Card / List 嵌入 | [bar-examples](../../apps/playground/src/docs/components/chart-business/bar-examples.tsx)、[mini-examples](../../apps/playground/src/docs/components/chart-business/mini-examples.tsx)、[embedding-examples](../../apps/playground/src/docs/components/chart-business/embedding-examples.tsx)；共用量程、单位、具名读数和宿主布局；该页不包含矩阵 |
| `/#chart-matrix` | 星期×小时、课程×版本、课程相似度、分类×学院数量、支撑等级 5 组 | [matrix-examples](../../apps/playground/src/docs/components/chart-business/matrix-examples.tsx)；行列 ID、编码与域、缺测／不适用、顺序、4/6/12 阶配置 |
| `/#chart-category` | 学期、学院数量／覆盖率、知识点堆叠／覆盖率、周期对照、版本面积、固定满分评分 6 组 | [category-examples](../../apps/playground/src/docs/components/chart-business/category-examples.tsx)、[comparison-data](../../apps/playground/src/docs/components/chart-business/comparison-data.ts)；分类顺序、分母、分轴域、周期 slot 与原始日期 |
| `/#chart-network` | CH-065 / 070 / 083 / 086 共 4 组，glow 与 structured、关系筛选、预览和固定详情 | [network-examples](../../apps/playground/src/docs/components/chart-business/network-examples.tsx)、[组件指南](../../packages/ui/src/charts/network/README.md)；先校验并布局完整数据再筛选，类别与关系身份保持稳定 |
| `/#chart-china` | 全国→27 个可用省内层→地区 Mock 详情；地区选择、面包屑返回、视角保存、错误重试与连续切换 | [china-region-examples](../../apps/playground/src/docs/components/chart-business/china-region-examples.tsx)、[固定数据](../../apps/playground/src/docs/components/chart-business/data/china/README.md)；加载、层级、统计关联、同层量程、许可说明与返回状态由宿主拥有 |

国内边界为 399 项：34 省级、333 地级、32 省直管县级。直辖市和固定来源无子层的港澳台直接查看同级详情，不造同名城市；不包含通用市辖区县下钻。3 份 GeoJSON 约 8.1 MB，HDX/OSM 固定来源及其说明随配方提供，geometry 不进入 UI 包。默认世界地图另用 Natural Earth v5.1.2 的 177 地区固定几何。

### 建设计划第 6 节的对应关系

“有对应样本”表示当前 fixture／组合确实存在；“可复用”表示底层能力已有、仍需换业务数据，不能算该 CH 原稿独立验收。完整计划见[T22 与验收矩阵](../plans/2026-10-08-chart-business-expansion-implementation-plan.md#6-业务覆盖与验收矩阵)。

| 计划参考／诉求 | 当前实现和样本 | 覆盖边界 |
| --- | --- | --- |
| CH-120 排名、CH-138 相对位置及大小横条 | P1 `RankingBars`、`RelativeBarExamples`、横条组合 | 有对应 Mock 组合；共享域、方向和精确读数由宿主提供 |
| 紧凑分段条、CH-127 迷你柱 | P1 `MiniSegments` / `MiniColumns` | 有对应形态；互斥构成、共同尺度与 0 基线 |
| 小饼／环饼、CH-109 完成率弧 | P1 `MiniPie` / `MiniProgress` | 有对应形态；构成总量和目标分母分别计算 |
| 迷你折线／面积 | P1 `MiniTrend` | 有两档局部尺寸；仍保留时间和缺测合同 |
| CH-026 / 033 / 044 / 054 | P2 `weekday-hour` | 7×24 周期矩阵，共用一份业务配方 |
| CH-076 / 115 | P2 `course-version` | 当前使用 heat + `steps` 表达 1—8 学期；“未设”与“无课程”独立。以当前编码为准，不沿用计划早期的 level 分类 |
| CH-084 / 087 / 089 / 090 | P2 `course-similarity` | 固定 0—1，相似度不自动补对称位置；4/6/12 阶 |
| CH-085 / 088 / 091 / 092 | P2 `course-count` | 面积＋顺序色共用数量域；0／缺测独立 |
| CH-145 | P2 `support-level` | 无直接／一般／核心支撑三级，固定面积等级点 |
| CH-005 / 006 / 025 / 056、CH-062 / 067 | P3 `colleges`（CH-005）、`knowledge`（CH-067） | 两个代表样本；其余参考可复用分轴、分组／堆叠能力，未逐稿建立独立 fixture |
| CH-060 / 061、CH-073 / 112 | P3 `semester`、`version`、`score` | CH-060 / 073 / 112 有样本；CH-061 可复用分类趋势，不另计图型 |
| CH-020 / 049 | P3 `period`（CH-049） | 相对 slot 对齐，真实日期保留、缺尾 null；CH-020 可复用，不自动猜对齐口径 |
| CH-011 / 078 / 142 | P1/P3 公共分组、双轴与固定域能力 | 能力可复用；未在业务目录登记这三个独立 CH fixture，不能声称逐图复刻完成 |
| CH-065 / 070 / 083 / 086 | P4 `elements/knowledge/courses/practice` | 4 组网络样本，技术与用户确认范围见下表 |
| CH-117 / 119 | P5 全国与广东等省内层 | 全部 27 个应有省内层有覆盖记录；统计／详情仍为 Mock |
| CH-116 / 139 | 既有卡片／概念表达 | 不是 Network 新缺口，也不计入新增图表 |
| 词云 7 例、CH-146 | T23 条件候选 | 未实现为新图表；词频／权重、层级与可加总用途成立后再立项 |

## 5. 配方与嵌入能力

| 配方 ID | 用途 | 注意事项 |
| --- | --- | --- |
| `trend-soft` | 单趋势、清晰描边与轻面积 | 形态／透明度由调用 Props 提供 |
| `category-near` | 蓝紫近邻类别 | 按稳定类别身份取色 |
| `category-wide` | 色差较大的类别对照 | 不循环少量颜色冒充无限可辨类别 |
| `category-solid` | 协调实色类别 | 适用图型查各 Manifest |
| `monochrome-blue` | 蓝灰单色 | 原 15 个适用入口的配方已确认；Matrix/Network 可使用，不自动继承那 15 项的视觉确认 |
| `bar-gradient` | 同色渐变柱 | 显式提供唯一 SVG gradient 与 fill |
| `bar-fade` | 圆头渐隐柱 | 小值须有可读基线和精确值 |
| `intensity` | 强度／热度 | 连续有序值域，0 与缺测分开 |
| `flow` | 桑基来源到目标 | 路径宽度仍表达权重 |
| `sign` | 正负／涨跌／动量 | 保持语义色，不默认表示成功／失败 |

迷你尺寸是 [mini-layout.ts](../../apps/playground/src/docs/components/chart-business/mini-layout.ts) 的局部组合，不是公共组件的统一 `size` API：柱／折线／面积 96×32 / 128×48；饼／环饼 32 / 56；整环 32 / 64；开口弧 40×30 / 72×54；细条厚 6 / 8。表格数量条当前 80×6，画廊／列表细条按场景使用 120×6 或 160×8。这些值是已实现的使用起点，未经单独确认不能升级成全库最小可读尺寸。

## 6. 实现、验证与用户确认

以下为历史记录与当前确认范围。最新四族增量以[第三批技术记录](../../evidence/runtime/chart-experience-third-batch-2026-10-11/verification.md)为准；[第二批](../../evidence/runtime/chart-experience-second-batch-2026-10-11/verification.md)、[第一批E01—E03／T22](../../evidence/runtime/chart-experience-first-batch/run-7ccz8fjn/verification.md)与[T22 文档核对](../../evidence/runtime/chart-business-expansion/verification.md)保留当时结果，不混算历史运行。逐入口历史检查路径见[19入口审阅表](../../evidence/runtime/chart-experience-second-batch-2026-10-11/human-review.md#19入口当前审阅表)。

| 范围 | 技术证据／当前实现 | 用户确认与未覆盖 |
| --- | --- | --- |
| 原 17 个入口 | [初始目录与独立消费](../../evidence/runtime/bklit-rain-catalog/verification.md)；已有总体视觉／交互肯定 | 未逐项关闭全目录 Gate；对比度仍未验收 |
| 170 变体 | [逐项技术记录](../../evidence/runtime/chart-variants/run-_tv8jhva/verification.md)、[后续反馈](../../evidence/runtime/chart-variants/feedback-2026-10-08-round2/verification.md) | 实现和限定范围检查有记录；170 项完整人工视觉未通过 |
| 蓝灰配方 | [15 项适用入口](../../evidence/runtime/chart-monochrome-blue/verification.md) | 2026-10-08 明确通过该配方的限定视觉审核；不等于全部对比度通过 |
| P1 迷你与嵌入 | [双尺寸](../../evidence/runtime/chart-mini-refinement/verification.md)、[排版](../../evidence/runtime/chart-mini-typography-feedback-2026-10-09/verification.md)、[标签与列宽](../../evidence/runtime/chart-business-label-color-layout-2026-10-09/verification.md) | 本地技术交付；当前细节视觉仍待确认 |
| P2 矩阵 | [交互修订](../../evidence/runtime/chart-matrix-refinement-2026-10-09/verification.md)及[独立页面](../../evidence/runtime/chart-matrix-page-separation-2026-10-09/verification.md) | 本地技术交付；最新视觉／交互待确认；更大规模未测 |
| P3 分类／周期 | [技术记录](../../evidence/runtime/chart-business-expansion/p3/verification.md)、[三例反馈](../../evidence/runtime/chart-business-expansion/p3/feedback-2026-10-09/verification.md) | CH-060 / 049 / 112 已获限定视觉确认；不覆盖另外三例或全部分类组合 |
| P4 网络 | [最新体验验证](../../evidence/runtime/chart-network-experience-2026-10-10/verification.md)、[用户确认](../../evidence/runtime/chart-network-experience-2026-10-10/confirmation/acceptance.json) | 当前四组本地样本的节点／边交互、入场、筛选／更新和样式／场景切换已确认；不保证任意密集布局 |
| P5 中国地图 | [全量边界与层级](../../evidence/runtime/chart-business-expansion/p5/verification.md)、[地图体验](../../evidence/runtime/chart-china-experience-2026-10-10/verification.md) | 本地技术交付；最新地图实际样式／交互／动效待用户确认 |
| 雷达反馈 | [图例、网格与光晕](../../evidence/runtime/chart-radar-feedback-2026-10-09/verification.md) | 有专项技术记录；用户视觉审阅待办 |
| 2026-10-11 三处行为修复 | [专项记录](../../evidence/runtime/chart-behavior-fixes-2026-10-11/verification.md)：盈亏精确零点、雷达减少动效、响应式横轴；计数和诊断为该次运行快照 | 配色、图形参数与演示数据保留；行为实际观感仍待用户确认，未发布 |
| 2026-10-11 演示数据 | [首四组](../../evidence/runtime/chart-demo-data-2026-10-11/verification.md)、[其余数据展开确认](../../evidence/runtime/chart-demo-data-expansion-2026-10-11/human-review.md) | 首四组方向与后续演示数据展开已确认；仅数据编排，不授予新交互、硬件或全目录Gate |
| 2026-10-11 曲线观感 | [专项记录](../../evidence/runtime/chart-curve-refinement-2026-10-11/verification.md)：完整绘图比率与一位小数显示分离；普通时序、Mini及三个业务面积样本采用现有工厂校准 | 后续用户已确认本次局部曲线交付，见[合并确认](../../evidence/runtime/chart-experience-second-batch-2026-10-11/human-review.md)；当前Mock数据替换后另验，公开默认与配色未改，未发布 |
| 历史源码消费 | 网络／地图既有记录含19 Registry闭包、170变体及66业务下载；矩阵独立下载另见P2 | 历史计数保留，当前结果以以下本次行及证据为准 |
| 第一批E01—E03／T22 | [历史运行](../../evidence/runtime/chart-experience-first-batch/run-7ccz8fjn/verification.md)与[消费快照](../../evidence/runtime/chart-experience-first-batch/run-7ccz8fjn/t22/consumption/final-facts.json) | 第一批体验仍待审；历史类型诊断和消费计数保留当时范围，不能证明最新源码 |
| 第二批／C01—C03 | [合并技术与消费](../../evidence/runtime/chart-experience-second-batch-2026-10-11/verification.md)、[工程专项](../../evidence/runtime/chart-experience-second-batch-2026-10-11/engineering/verification.md) | 临时图例、径向／流向状态、日历巡读、矩阵／地图窄屏修复已实现；此前呈现的本地交付已获用户确认，历史各自Gate保留；未发布 |
| 第三批 | [当前技术与消费](../../evidence/runtime/chart-experience-third-batch-2026-10-11/verification.md)、[四族实时审阅](../../evidence/runtime/chart-experience-third-batch-2026-10-11/human-review.md) | 散点密集／重叠、盈亏近零／连续零、K线密集／平盘与实时生命周期已实现；当前新增体验待用户确认；真实实时数据接入为条件项；未发布 |

全库仍未独立通过：完整对比度、真实 Safari/VoiceOver、实体触屏、完整深色／强制颜色覆盖、任意大数据性能、SSR 与真实生产数据接入。历史4处类型诊断（Toast两处、旧chart-feedback配置两处）已在本轮工程专项修正，workspace类型检查与Token／资产索引生成一致性检查通过；原有冻结B2／danger治理失败仍保留，见[工程实际记录](../../evidence/runtime/chart-experience-second-batch-2026-10-11/engineering/verification.md)。不能据此宣称全仓治理或人工Gate通过。

## 7. 明确缺口与后续工作

| 内容 | 当前判断 |
| --- | --- |
| 任意数值 XY 散点、箱线图 | 尚未建设；时间散点不能替代 |
| 真正累计堆叠面积、复杂 100% 分组堆叠 | 不在本批已承诺能力内；不能从示例标题推导支持 |
| 分类 Brush／预测／日期参考区域 | 当前显式不支持；分类模式不能伪造 Date |
| 词云、矩形树图 | T23 条件候选；标签组先复用 Tag，层级总量需先确认 |
| 图编辑、拖拽缩放、力导与大规模网络布局 | 当前 Network 不提供；关系浏览不能当作编辑器 |
| 国内更深区县、实时边界／真实地域统计服务 | 当前固定范围之外；不能从城市详情入口推导已接业务 |
| 统一点击固定 Tooltip、图例隐藏、跨图联动、图片／数据导出 | 无全库统一合同；个别图的选择、Brush 或源码下载不代表这些能力 |

使用指引已补齐[七类核心用法](charts.md#每个用法要说明什么)、[宿主请求过程建议](charts.md#宿主请求过程的展示建议)和[逐图图例事件规则](chart-legend-rules.md)。规则区分普通临时聚焦、层级导航与固定详情，不增加隐藏系列或跨图联动。

第一批E01—E03及T22已留下[技术运行](../../evidence/runtime/chart-experience-first-batch/run-7ccz8fjn/verification.md)和[待审包](../../evidence/runtime/chart-experience-first-batch/run-7ccz8fjn/human-review.md)；第二批此前呈现的本地交付已获确认，第三批四族增量结果见[当前记录](../../evidence/runtime/chart-experience-third-batch-2026-10-11/verification.md)。各自视觉Gate保持；实体设备、真实实时数据、生产性能与发布仍按各自条件推进。
