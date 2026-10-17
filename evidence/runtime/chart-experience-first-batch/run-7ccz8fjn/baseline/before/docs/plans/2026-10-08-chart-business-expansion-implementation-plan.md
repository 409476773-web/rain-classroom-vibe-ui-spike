# Rain 业务图表扩展 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> 也可由 Codex 按相同任务和验收顺序执行。本文是开发指导，不代表代码已实现、测试已通过或视觉已验收。

> **2026-10-09 补充方案：** P1 迷你图表的尺寸与图文组合，以[双尺寸与排版改造实施方案](2026-10-09-mini-chart-size-refinement-implementation-plan.md)为准。当前请求仅补齐方案，不恢复中断的开发，也不推进 P2—P5。

> **2026-10-09 继续执行：** 用户在P1迷你图表、P2分类矩阵补充后要求继续本计划，本次进入P3（T12—T15）。前一段“仅补齐方案”的文字保留为当时的范围记录；最新执行依据与验证见 `evidence/runtime/chart-business-expansion/p3/`。后续P4/P5与原Human Gate、Git及发布边界分别保留。

> **2026-10-09 P4执行：** 用户确认CH-060/049/112选型调整后明确“确定。继续按计划推进”，本批进入T16—T18关系网络图，记录见 `evidence/runtime/chart-business-expansion/p4/`。三例P3视觉确认不扩为全库或新网络视觉通过。

> **2026-10-09 P4技术交付：** T16—T18已完成本地实现及专项验证，四组Mock样本在 `/#chart-network` 可交互查看；[最终证据](../../evidence/runtime/chart-business-expansion/p4/verification.md)与[视觉待审记录](../../evidence/runtime/chart-business-expansion/p4/human-review.md)分开。P5目前仅完成来源预调查，尚未取得并验证完整省市geometry；本计划整体仍在实施中。

> **2026-10-10 P5技术交付：** 最新用户“继续下一阶段”对应T19—T21，固定399项真实地区geometry已完整取得并校验，27个应有省内层均可遍历；`/#chart-china`提供全国→省内→Mock详情、返回、键盘路径和异常重试。[专项证据](../../evidence/runtime/chart-business-expansion/p5/verification.md)与[视觉待审](../../evidence/runtime/chart-business-expansion/p5/human-review.md)分别记录；T22全批收口仍待后续，不关闭P4/P5视觉Gate或发布边界。

> **2026-10-10 T22文档整理：** 用户先要求做T22，随后明确“我们先来梳理、整理完整的能力清单与使用指引”。本轮限定为[能力清单](../ai/chart-capabilities.md)、[使用指引](../ai/charts.md)及README事实修订；图表实现和其他图表体验优化不在本轮修改范围。T22文档检查与尚待执行的全批验证分列于[收口记录](../../evidence/runtime/chart-business-expansion/verification.md)。网络当前样本已有独立体验确认，中国地图新体验仍待用户确认；不沿用上方历史段落推断当前局部Gate。

> **2026-10-10 后续体验方案确认：** 用户确认“先补状态与必要操作 → 再统一阅读体验 → 最后按业务处理专门图型”的三批顺序；第一批为折线／面积／组合、条柱与DataBar、旭日默认键盘路径。逐图清单、修改位置与验收标准见[体验优化计划](2026-10-10-chart-experience-refinement-plan.md)。当前只记录方案，沿用“先讨论方案，不改代码”；不关闭T22完整收口或新增体验Gate。

> **2026-10-10 验收与T22衔接补齐：** 用户要求“按你的建议补齐文档和计划，明确第一批验收与 T22 的衔接，先不改代码”。未来顺序为当前基线 → E01—E03实施及专项验收 → 固定版本执行T22 → 第二批；[验收矩阵与交接条件](2026-10-10-chart-experience-refinement-plan.md#6-第一批与-t22-的衔接)分别记录技术结果、体验确认和未覆盖项。同一版本的有效结果直接引用，测试输出须先改为新的运行目录；本次只补文档，不执行上述实施或运行检查。

**Goal:** 在现有 Rain / Bklit 图表库上，依次补齐标准条形与可嵌入迷你图表、通用矩阵、分类坐标业务组合、关系网络和国内省市地图，并保持现代设计、顺畅交互、连续动效与真实数据表达。

**Architecture:** 复用现有 `@rain-next/ui/charts` 公共部件、Rain 局部配方和 Bklit 运动能力。已有图型补参数与真实缺口；矩阵、网络放在 vendor 外；业务口径、数据对齐、地图下钻和 Table / Card / List 组合由宿主配方拥有。不新增统一图表引擎或按 `type` 分派所有图型的万能组件。

**Tech Stack:** React、TypeScript、现有 visx / D3 / Motion、Rain UI 与 Foundations、Vitest、Playwright、pnpm workspace；本计划不预设新依赖。

---

## 1. 执行结论与工作范围

**没有阻塞首批开发的设计问题，可以进入实施。** 用户已经确认优先级，以及标准图和迷你图都需要 Bklit 式设计与动效体验。尺寸、少量参数名和动效时长按本计划的起点做出可运行样本，再根据实际阅读与交互调整，不需要继续空谈后才动手。

本轮只交付计划；执行从 T00 开始。本地实施范围为共享候选与演示配方；Git 提交、推送、发布、Figma 写入、正式业务迁移和 system-approved 晋升各自保持原授权边界。不要把计划确认或技术通过代替用户视觉确认。

**唯一工作根目录：**

```text
/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2
```

下文代码路径均相对这个根目录，`新增` 指计划文件，不能误认为已存在。不要改外层旧 `rain-classroom-vibe-ui-spike`，不要清理当前 worktree 中与本任务无关的修改。共享源码按 System Mode 执行。

实施依据：

- [已确认设计与顺序](2026-10-07-chart-reference-recipes-design.md)第13节。更早的排序以该节为准。
- [Figma 147张业务图表](https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e/?node-id=2901-130074)：用于业务能力与关系参考，不要求逐像素复刻。
- `AGENTS.md`、`SPIKE_BRIEF.md`、`status/current-phase.yaml`、`docs/ai/prototype-design.md`、`docs/ai/information-design.md`、`docs/ai/charts.md`。
- 现有 `packages/ui/src/charts/README.md`、`registry/charts.json`、对应 `manifests/ui/chart-*.yaml` 与源码；本文的源码判断基于2026-10-08，执行前只复核将修改的部分。

## 2. 完成顺序与交付物

| 批次 | 必须交付 | 任务 | 本批结束的评审对象 |
| --- | --- | --- | --- |
| P1 | 标准横条、细条、分段条、迷你柱、小饼/环饼、进度环/弧、已有迷你折线/面积的统一嵌入 | T00—T08 | 独立图＋表格＋指标卡＋课程/考试列表，能更新、排序和连续交互 |
| P2 | 二维分类矩阵：连续热力、数量气泡、离散等级 | T09—T11 | 星期小时、课程版本、相似度、支撑关系样本 |
| P3 | 分类横轴、缺测处理、组合图多轴修正、周期对齐配方 | T12—T15 | 学期、学院、知识点层级、版本与周期比较 |
| P4 | 节点类别、关系类别、有向关系、邻接聚焦与详情 | T16—T18 | 四张真实网络样本的可复用实现 |
| P5 | 全国省级→省内城市→城市样本入口，返回和边界状态 | T19—T21 | CH-117 / CH-119、另一省份和特殊层级 |
| 收口 | 全批登记、独立消费、证据与未覆盖项 | T22 | 实际完成清单和逐批用户意见 |
| 条件候选 | 词云、矩形树图 | T23 | 先确认真实词频/层级用途，再决定是否单独实施 |

依赖顺序：`T00 → T01 → T02/T04 → T03/T05 → T06 → T07 → T08 → T09…T22`。同一共享文件的修改串行；不同 fixture、测试或只读审阅可并行。P5数据来源可提前只读调查，但不要抢占P1实现或以它阻塞P1—P4。

## 3. 已有能力、真实缺口与禁止重复建设

| 领域 | 已有起点 | 本计划补什么 |
| --- | --- | --- |
| 17入口 / 170变体 | 现有共享候选及官网映射；蓝灰配方已有单独视觉确认 | 业务配方独立编号；170项映射原样保留。P1不增加图型计数；Matrix / Network完成后另计 |
| 横条与柱 | BarChart有横纵方向、分组、堆叠；Bar有轴绑定 | 显式主数值域、ID和显示文案分离、细条使用、更新动效与水平堆叠动效修正 |
| 迷你趋势 | Line / Area已有96×40示例 | 扩展跨图型配方、真实宿主与完整下载；不用统一MiniChart配置引擎 |
| 饼 / 环 | Pie有size、角度、innerRadius、hoverOffset；Ring有角度和stroke | 小尺寸校准；必要的Ring padding；连续进度弧复用单目标Ring |
| 组合图 | 已有分组/堆叠；Line、Area已有yAxisId | SeriesBar轴绑定、分轴堆叠域与几何命中、分类X；不重造双轴或组合图 |
| 热图 | 当前Heatmap是日期日历 | 新增MatrixChart，保留旧日历合同 |
| 地图 | Choropleth已有GeoJSON、Mercator、缩放、悬停 | 国内geometry、适配当前区域、地区激活与宿主下钻；不声称现有地图不存在 |

源码风险必须落实到任务，而非只写体验愿望：

1. `vendor/charts/bar.tsx` 在入场结束后换成普通rect，更新不是持续几何过渡；水平动画目标使用 `x: 0`，会破坏堆叠段偏移。T03修根因。
2. 独立BarChart自动按自身最大值取域，单值小条可能几乎等长。T02/T04要求宿主共用尺度。
3. `chart-context.tsx`、路径动画、interaction、Brush和Projection大量依赖Date。T12按显式模式贯通，不能仅把类型改为string。
4. Line/Area缺测目前可能落到像素0而非断开；动画路径也须同步。T13覆盖静态与运动中的缺口。
5. SeriesBar缺少yAxisId，组合图混入右轴时堆叠总量域可能不足。T14按轴计算，tooltip共用真实几何。
6. `chart-page.tsx` 的源码路径和来源写死vendor；新增本地图型前必须改为真实元数据。T11处理。

## 4. 全批实现合同

### 4.1 数据与尺度

- ID表示身份，label表示文字，输入顺序表示默认顺序。两个ID可以同名；重复ID是错误，不能靠索引维持身份。
- `0`是有效值；`null`是缺测/不适用；NaN、Infinity与合同禁止的负值是非法输入。不能过滤null后跨缺口连线，不能将null补0。
- P1条/柱先支持非负值；固定域为 `[0, upper]` 且upper有限、正数。未传保留旧自动行为；显式域不能再乘1.1或nice。
- 同一列/比较组由宿主计算一次尺度。默认以当前比较集合的完整数据确定，筛选不悄悄改变；切换比较集合才显式更新并说明口径。评分保留满分，完成率保留目标分母。
- 数量条全零且max=0时显示“全部为0”的无尺度空轨与准确0值；零目标完成率为“不适用”。两者都不除以0，也不伪造百分比。
- 固定域外数据/超目标首版显示原始读数与“超出范围”，不暗中clamp。不在图形内部发明超额业务口径。
- 构成数据要求互斥、完整、非负；饼或分段条总和为0时显示零总量状态。含缺测不继续声称完整构成。
- 格式、单位、分母、颜色身份与几何使用同一原始数据。稳定颜色按类别/系列ID，不随排序重配。

### 4.2 视觉与动效

使用 `packages/ui/src/charts/styles.css` 的局部颜色和现有配方，不改全局品牌蓝、已确认蓝灰色阶或全局Tokens。不恢复已移除的饼图悬浮光晕。

| 行为 | 实现要求 | 验证办法 |
| --- | --- | --- |
| 入场 | 复用Bklit节奏，条柱从真实基线展开，分段保持偏移；mini减少位移而保留反馈 | 正常动效中间帧与终值，不只reduce截图 |
| 更新 | 同一个稳定keyed图形由当前几何过渡到新值；连续更新可接续 | 先25→75，再未完成时→50；不得反复归零 |
| 重排 | 图形跟随ID；宿主排序不remount整批、不串颜色/tooltip | 更新与排序同时执行，检查身份和读数 |
| hover/focus | 强调平顺，mini不撑开布局；连续跨项无残影 | 快速跨行移动、滚动中提示、键盘切换 |
| 多实例 | 每个SVG clip/gradient/marker ID唯一；不为每格开永久RAF | 同页多实例、卸载与后台观察 |
| reduce | 即时稳定终态，停止循环/脉冲；保留读数和操作 | 系统reduce与普通模式分别运行 |

先用已有 `vendor/charts/animation.ts` 曲线与时长；mini只在视觉实测后局部调节，不新增全库动效Token。参考起点为条高6—8px、趋势/柱96×40、小饼32—48px、圆环/弧40—64px；这些是原型起点，不是已通过的最小可读尺寸或强制宽度。

### 4.3 嵌入、输入方式与可访问性

- 图形不自带强制Card、标题、工具栏或固定320px高度；宿主使用现有Table、Card和列表结构。
- 精确值已在表格单元格或卡片旁时，可让小图为装饰；不要每格复制一张明细表、增加重复朗读或不必要的Tab停靠点。独立图必须有名称和等价读数。
- 数量比较不是任务进度，不默认使用progressbar。真正完成率才提供对应语义；不只靠颜色区分0、缺测和等级。
- 简单细条提示优先复用现有UI Tooltip的portal。多点图保留ChartTooltip；只有真实裁切复现后才补可选portal，并同时处理坐标、边界与主题作用域。
- 触屏与键盘通过精确文本、宿主按钮/选择器或图内等价操作读取必要信息；网络与地图的激活必须可键盘执行。无法测试的真实硬件行为单独列明。
- 按仓库既有对比度要求测量文字、数字、关键图形边界和Focus；本轮新图形/新状态分别记录。覆盖loading/error/empty，操作控件存在disabled状态时验证其语义与交互。保留已确认浅色基线，其他主题只报告实际验证范围。

### 4.4 来源、登记与消费闭包（每批必做）

1. 公开组件与类型从 `packages/ui/src/charts/index.ts` 导出，保留独立charts子入口；不塞进 `packages/ui/src/index.ts` 根导出。
2. 公共样式放 `packages/ui/src/charts/styles.css`，限定 `.rain-chart`。新自研代码优先局部CSS；已有utility改变时由 `scripts/generate-chart-styles.mjs` 生成，不手改生成文件。
3. 更新对应 `manifests/ui/chart-*.yaml`、`registry/charts.json` 的实际文件闭包；仅改已有文件时不要无故扩大登记。统一charts/index.ts在shared.files内，因此它新增导出的DataBar、Matrix、Network及必要本地依赖也必须进入shared.files，避免非bar等单项安装缺文件；不能仅登记到各自item。
4. vendor文件改变，更新 `packages/ui/src/charts/vendor/source-lock.json` 的本地hash与差异说明，保留上游commit和上游hash。DataBar、Matrix、Network自研文件在vendor外，来源标为Rain扩展。
5. `chart-example-source.tsx` 下载当前真实实现、样式、fixture及必要geometry；包含当前尺寸、尺度、状态和配置。不能只下载外层包装或依赖Playground私有路径。
6. `docs/ai/charts.md`、图表README记录适用场景、参数、最小示例和真实限制。状态只按实际证据更新，不覆盖历史human gate。
7. `chart-variants/reference.json` 的170项官网身份不改。业务示例单独编号；`scripts/charts.test.ts` 中17入口断言在新增Matrix/Network时改为“原17项精确保留＋本地新增项”，170覆盖保持精确校验。

## 5. 逐任务开发步骤

每项非平凡逻辑按“写一个能暴露问题的测试→运行确认失败→最小实现→重跑通过”执行；失败须来自目标行为，不是测试环境破损。下列任务是交付单元，内部编号是执行步骤。无需为纯文案和简单接线编写镜像测试；不要在此计划中自动执行Git提交。

### T00：复核范围与基线

**依赖：** 无。**文件：** 读取第1节治理文件、当前Git状态、涉及的源码；新增 `evidence/runtime/chart-business-expansion/baseline.md`。

1. 确认当前目录、服务端口及现有修改；记录本轮起点，不stash/reset他人工作。
2. 记录17入口/170变体和已确认蓝灰配方；选现有横条、Pie、Ring和Line作为同尺寸体验对照。
3. 执行V1、V2中相关基线；记录已有失败，不能把后续新增失败归为旧问题。
4. 确认新配方仍为registry-candidate/unpublished，建立按P1—P5分开的验证记录。

**完成：** 可以准确区分本批变更、旧问题和已接受视觉基线；没有运行时改动。

### T01：建立P1数据合同与代表fixture

**依赖：** T00。**新增：** `apps/playground/src/docs/components/chart-business/mini-data.ts`、`mini-data.test.ts`。

1. 建立同列数量25/50/100、排名、互斥分段、固定满分、独立目标、构成、时间趋势等明确标为Mock的数据。
2. 先写测试：相同比较组只产生一个max；排序/筛选保持ID与max；null、0、零分母、NaN/Infinity、溢出、同名不同ID各自可辨。
3. 实现最少fixture与配方层数据准备；只抽取实际重复的计算，避免万能数据清洗器。
4. 运行：`pnpm exec vitest run apps/playground/src/docs/components/chart-business/mini-data.test.ts`。

**完成：** 该测试PASS；25/50/100共用100，不能产生三个100%；构成缺测不产生假完整饼。

### T02：Bar固定域与类别文案

**依赖：** T01。**修改：** `packages/ui/src/charts/vendor/charts/bar-chart.tsx`、`bar-x-axis.tsx`、`bar-y-axis.tsx`。**新增测试：** `packages/ui/src/charts/bar-chart.test.tsx`。

1. 测试横向和纵向 `[0,100]` 下25/50/100的实际长度，误差≤1px；同域不同实例比例一致；不传域保持旧行为。
2. 增加 `valueDomain?: [0, number]`，仅覆盖主数值轴真实scale；验证finite、正上界与零下界，显式域不nice。保留现有右轴行为。
3. 复用 `xDataKey="id"`，不增加重复的categoryId系统；类别轴增加 `formatLabel?: (id, datum) => string`，根据实际方向生效。本批配方使用已有ChartTooltip content回调显示datum.label，避免轴显示名称、tooltip却显示内部ID；不为此另造提示框架。
4. 标签区域服从传入margin/容器，修正水平标签硬编码宽度；完整名称可读，长名不挤入图形。
5. 同名不同ID、输入重排、单项/空数据与固定域非法参数均有测试。
6. 运行：`pnpm exec vitest run packages/ui/src/charts/bar-chart.test.tsx`。

**完成：** 自动尺度兼容，固定域准确；ID/标签/顺序不混用。公共参数边界负责拒绝非法域，业务配方负责说明超域状态。

### T03：修正条柱持续动效

**依赖：** T02。**修改：** `packages/ui/src/charts/vendor/charts/bar.tsx`；仅必要时调整同目录 `animation.ts`。**新增：** `tests/e2e/chart-business.config.ts`、`chart-business-motion.spec.ts`；补充 `packages/ui/src/charts/chart-motion.test.tsx` 中相关断言。

1. 先复现水平堆叠入场时各段x被归零，以及入场后更新立即跳变；正常动效测试默认 `reducedMotion: "no-preference"`。先在现有 `#chart-bar` 的更新控制与组件测试验证；水平堆叠中间帧及25→75→50专项随T05/T06的业务样本落地后完成，不让本任务依赖尚不存在的业务页。
2. 让稳定keyed的运动图形承接入场、更新、位置变化；保留 `dataKey＋categoryValue` 身份，更新不换key或重播整图。
3. 水平动画终点使用计算后的段x；堆叠更新与重排同时考虑起点和长度。0值不绘制假正长度。
4. 给测试留可稳定查询的业务ID标记；采样起点、中间、终点，验证过渡与终值，而非只断言存在motion标签。
5. 运行新motion专项，再回归现有柱变体：V1柱相关＋V3现有交互；中断更新、减少动效与卸载均检查。

**本任务代码完成：** 共享运动路径修正且组件断言通过；T05/T06接入后，T08必须补齐25→75→50、水平堆叠中间帧的真实浏览器证据才算P1动效闭合。目标为堆叠段不重叠错位、更新不反复入场，只有显式“重播”重新入场。

### T04：可复用细数量条DataBar

**依赖：** T01/T02。**新增：** `packages/ui/src/charts/data-bar.tsx`、`data-bar.test.tsx`。**修改：** charts `index.ts`、`styles.css`，`registry/charts.json` 的shared.files文件闭包，`manifests/ui/chart-bar.yaml`记录bar家族能力归属。

首版作为bar家族的轻量公共部件，不增加第18个图型入口。它确实需要被表格、卡片和列表重复消费，避免每格启动完整坐标系统。

```ts
// 建议最小合同；以既有className/style惯例补齐，不添加预设集合。
type DataBarProps = {
  value: number | null;
  maxValue: number;
  label: string;
  valueText?: string;
  decorative?: boolean;
  className?: string;
};
// 有效几何：fraction = value / maxValue；不在这里推断百分比含义。
```

1. 先写25/100=25%、0、null、max0全零、负/非finite、超范围的状态测试；decorative必须隐藏重复图形语义。
2. 用简单轨道/填充和现有Motion完成；不引入visx坐标、自动订阅器、配置工厂或独立动画循环。
3. value为0且max为0时不除法，显示无尺度空轨；其他非法组合保留明确不可绘制状态及可读说明。任务进度语义由真实进度配方提供。
4. 尺度必须由宿主传入；颜色继承图表局部变量；缩放填充不带动旁侧文字和宿主行高。
5. 运行：`pnpm exec vitest run packages/ui/src/charts/data-bar.test.tsx`；完成4.4登记。

**完成：** 多个独立实例可比较，嵌入不需要大图外壳；无新依赖、无通用MiniChart。

### T05：补齐六类迷你配方

**依赖：** T02—T04。**新增：** `apps/playground/src/docs/components/chart-business/bar-examples.tsx`、`mini-examples.tsx`、`mini-examples.test.tsx`。**修改：** `chart-examples.tsx`、`chart-examples.css`；必要时 `packages/ui/src/charts/vendor/charts/ring-chart.tsx`。

1. 标准横条：排名、分组、普通互斥堆叠；细条：数量/评分/相对位置分别说明基准，不把位置解释为完成率。
2. mini柱使用BarChart无轴配方与显式小margin，保留共享基线；分段条用原生水平堆叠与确定总量。
3. Pie复用size/innerRadius/startAngle/endAngle/hoverOffset，mini降低位移；0或缺测构成不绘制假占比。饼与环饼都提供例子。
4. 连续完成率弧优先单目标Ring；增加可选 `padding` 仅在固定8px留白实际阻碍小尺寸时进行，默认8兼容旧图，检查半径/线宽有效性。Gauge仍负责原刻度形态。
5. Line / Area复用既有mini；不在这里提前泛化时间合同。
6. 共享图形层只渲染图形，独立例子由外层补标题/准确读数；表格不附逐格明细表。
7. 运行：`pnpm exec vitest run apps/playground/src/docs/components/chart-business/mini-examples.test.tsx packages/ui/src/charts/pie-slice.test.tsx`。

**完成：** 六类均有独立与嵌入用法；几何有效，无负半径/NaN path；320px标准高度和120pxmini示例行高不泄漏进单元格。

### T06：真实宿主展示、入口与提示

**依赖：** T05。**新增：** `apps/playground/src/docs/components/chart-business/chart-business-page.tsx`、`chart-business.css`、`embedding-examples.tsx`；`tests/e2e/chart-business-embedding.spec.ts`。**修改：** `component-catalog.tsx`、`component-asset-page.tsx`、`chart-page.tsx`、`chart-catalog.ts`、`apps/prototype/src/scenarios/bklit-validation/catalog.tsx`、`tests/e2e/charts-playground.spec.ts`。

1. 增加 `#chart-business`“迷你图表与业务组合”入口，复用现有文档壳；在 `component-asset-page.tsx` 的通用 `chart-`分支之前显式处理该入口，避免强转成ChartId后找不到entry。
2. 按图型入口继续可找小尺寸；chart-page的控件、文案与prototype目录同步，不再声称只有area/line有mini。业务入口不计入图型数；同步修改旧浏览器检查的G4链接总数假设，分别校验原17图型与新增业务导航，不把展示入口混入170官网集合。
3. 组合一个排名/细条列表、一个含数量条/小柱/小饼的Table、一组数值＋mini的Card、一个带进度弧的课程/考试列表；复用现有UI组件与密度合同。
4. 共用更新、排序、筛选、正常/零/缺测等演示数据；不让每个单元格自带一套工具栏。
5. 测滚动表格与overflow卡片里的tooltip。简单细条用现有 `packages/ui/src/tooltip/tooltip.tsx`；若多点图复现裁切，再修改 `vendor/charts/tooltip/{chart-tooltip,tooltip-box}.tsx` 增加可选portal目标，默认行为不变。
6. portal时统一局部→视口坐标、滚动/resize重算、触发器与浮层交互、`.rain-chart`样式继承；只移浮层，不移图中十字线/标记。
7. 运行：`pnpm exec playwright test --config tests/e2e/chart-business.config.ts chart-business-embedding.spec.ts`，并测试键盘读数与触摸模拟。

**完成：** 入口能导航且焦点正确；真实宿主无撑高、页面溢出、提示裁切、行点击冲突；精确读数不依赖hover。

### T07：P1源码下载与库内交付

**依赖：** T06。**修改：** `chart-example-source.tsx`、charts README、`docs/ai/charts.md`、`manifests/ui/chart-{bar,pie,ring,line,area}.yaml`、`registry/charts.json`、vendor source-lock。**新增：** `scripts/verify-chart-business-consumption.mjs`、`scripts/verify-chart-business-consumption.test.ts`。

1. 下载函数接收当前state/size/尺度/选择的业务例子，序列化实际渲染配置；独立与嵌入示例均可取得真实源码。
2. 下载包包含对应chart-business模块、fixture、CSS与公共charts导入；不能留仓库相对路径、私有vendor import或文档壳依赖。
3. 复用 `scripts/verify-chart-variant-consumption.mjs` 的 `assertDownloadClosure` 和现有消费模式，为业务集合加小型验证入口；不复制170样本工具，不改变原集合计数。
4. 测试故意缺失局部import时验证应失败；另对Registry声明的“shared.files＋一个非bar item.files”检查相对import/export闭包，只按声明文件集合解析，不能靠全仓文件存在掩盖漏登记。再运行最小独立宿主构建及浏览器检查。记录依赖缓存是否复用，不能据此声称干净安装通过。
5. 完成4.4各项；检查源码提示中的参数、默认值、状态与实际行为一致。
6. 运行：`pnpm exec vitest run scripts/verify-chart-business-consumption.test.ts`；`node scripts/verify-chart-business-consumption.mjs evidence/runtime/chart-business-expansion/p1/consumption`。

**完成：** 下载后可独立使用，无遗漏样式/fixture；公共API、Manifest和Registry闭合，170原变体不受污染。

### T08：P1技术与手感验收

**依赖：** T07。**新增证据目录：** `evidence/runtime/chart-business-expansion/p1/`；按结果写 `verification.md`。

1. 运行V1—V4受影响项；桌面1440、390窄屏，以及80/120/180px嵌入列宽逐项观察。窄屏允许表格局部滚动，不允许整页横向溢出。
2. 40行混合mini作为首个批量场景，记录实际可见实例、机器、浏览器、视口、长任务和更新/滚动表现；不把40当作公开上限或预先承诺帧率。
3. 正常动效下看入场、连续hover、批量更新、中断更新和排序；先消除重复渲染、离屏/后台工作和永久循环，保留可见图形动效。
4. reduce模式复验准确终态；不同实例SVG ID、focus/读数、空/0/缺测/非法值分别验收。
5. 提供四组真实宿主和现有Bklit对照，供用户看连续运行；截图证明布局，录屏/运行交互支持动效观察，二者不互相代替。

**完成：** 技术项有证据，用户意见单独记录为待审/通过/需调整；未确认的手感不能标为通过。P1问题未修完时不批量复制到P2。

### T09：矩阵数据与三种编码

**依赖：** T08。**新增：** `packages/ui/src/charts/matrix/matrix-data.ts`、`matrix-data.test.ts`；`apps/playground/src/docs/components/chart-business/matrix-data.ts`。

```ts
type MatrixAxisItem = { id: string; label: string };
type MatrixCell = { rowId: string; columnId: string } & (
  | { kind: "value"; value: number }
  | { kind: "missing"; label?: string }
  | { kind: "not-applicable"; label?: string }
);
type MatrixEncoding = "heat" | "bubble" | "level";
// bubble在有效正domainMax时：r = maxRadius * Math.sqrt(value / domainMax)，面积与数量成正比。
```

1. 先测重复行/列ID、重复坐标、未知引用、缺格、非finite、负气泡值；缺格解释为missing，不补0。
2. heat的有限domain严格递增，拒绝反向/退化域及超域值；bubble有正值时domainMax必须有限且为正，全零且domainMax=0只显示零标记、不执行除法。level按明确等级清单映射，未知等级报错，不能落到默认颜色或对序数连续插值。把这些边界全部加入测试。
3. 颜色、半径、legend与读数用同一编码结果。0气泡用零值标记/文本，不画具有正数量含义的圆面积。
4. 建立7×24、4/6/12方阵、非对称矩阵、课程版本和离散等级fixture；通用组件不补对称值。
5. CH-076“未设置”和“无此课程”分别表达；学期按有序类别解释，不求数值均值。CH-145默认三种明确等级，重复图例不据此发明第四等级。
6. 运行：`pnpm exec vitest run packages/ui/src/charts/matrix/matrix-data.test.ts`。

**完成：** heat/bubble/level语义分离，同一数据切换合法编码不改变数据身份或精确值。

### T10：MatrixChart渲染与读取

**依赖：** T09。**新增：** `packages/ui/src/charts/matrix/matrix-chart.tsx`、`matrix-chart.test.tsx`。**修改：** charts `styles.css`、`index.ts`。

1. 原生table组织行列头与单元格，单元格内用色块/圆/等级标记；当前规模不引入Canvas或虚拟化。
2. 标题、单位、legend由轻量props/宿主组合；精确单元格内容与行列头关联，tooltip是补充。若格子可操作，提供真实button及键盘行为；纯读数不让每格成为Tab停靠点。
3. 窄容器局部横滚、行标题保留可读；长中文名不强缩为不可读字。选择/聚焦outline不改变单元格布局。
4. 增量更新只对有效色值/圆面积做短过渡；离散等级/状态不经过伪造中间等级；reduce即时终态。
5. 验证排序后同一rowId/columnId的值仍正确，同名不同ID不合并。
6. 运行：`pnpm exec vitest run packages/ui/src/charts/matrix`。

**完成：** 三种编码可共用坐标合同，键盘和文本可读取；旧Heatmap的日期合同原样保留。

### T11：矩阵样本与新图型登记

**依赖：** T10。**新增：** `apps/playground/src/docs/components/chart-business/matrix-examples.tsx`、`manifests/ui/chart-matrix.yaml`、`tests/e2e/chart-business-matrix.spec.ts`。**修改：** `chart-catalog.ts`、`chart-page.tsx`、`chart-examples.tsx`、`chart-example-source.tsx`、`chart-variant-gallery.tsx`、prototype `catalog.tsx`、`scripts/charts.test.ts`、`tests/e2e/charts-playground.spec.ts`及4.4文件。

1. catalog增加真实sourcePath和来源说明，给原有入口填写真实路径；Matrix指向本地matrix目录，不生成不存在的vendor文件路径。
2. 为Matrix增加图型入口；没有官网变体时不进入固定family下载映射，显示本地业务样本。目录总数从真实入口计算，原17子集和170官网映射各自精确校验。旧playground检查对所有入口假设SVG、精确表开关及旧下载文件，应保留原17子集检查并为Matrix检查table/行列头/真实下载，不能为迁就测试塞假SVG。
3. 接入星期小时、课程版本、相似度、数量气泡、离散等级五组示例，覆盖第6节全部矩阵CH编号。
4. 扩展业务下载与消费集合，完成4.4；重跑旧日历代表，避免把新增矩阵当作旧日历替换。
5. 运行V1/V2、新matrix浏览器专项、V4业务独立消费；按P1格式记录P2证据和用户意见。

**完成：** 矩阵有真实公共API、可发现入口、下载和正确来源；五组业务可评审。

### T12：显式分类X合同与定位

**依赖：** T11。**修改：** `packages/ui/src/charts/vendor/charts/{line-chart,area-chart,composed-chart,time-series-chart-shell,chart-context,x-axis}.tsx`、`packages/ui/src/charts/vendor/charts/use-chart-interaction.ts`。**新增：** `packages/ui/src/charts/category-axis.test.tsx`；必要的单一辅助文件 `packages/ui/src/charts/vendor/charts/category-scale.ts`。

1. 在根组件增加显式time/category模式，默认time。分类输入字段为稳定ID，label formatter另给，顺序由输入决定；不解析假Date。
2. 写失败测试：重复label不合并、重复ID拒绝、顺序保持、空/单项与最近项命中，分类值不进入 `.getTime()` / Date格式化。
3. 按模式隔离X定位接口；分类用band/point中心定位，时间保留既有行为。不用 `as any` 强压共享Context。
4. 编译检查Scatter、Candlestick、LiveLine和其它Context消费者；其时间合同无需本批泛化。
5. Brush的Date范围与Projection时间间隔合同保持独立；分类组合在类型或明确运行边界拒绝不支持的Brush/Projection。密集分类不套用时间降采样丢类别，先使用宽图/滚动配方。
6. 运行：`pnpm exec vitest run packages/ui/src/charts/category-axis.test.tsx packages/ui/src/charts/chart-brush.test.tsx`，再运行V2类型检查。

**完成：** 分类定位/命中可复用；原时间行为和Brush合同不退化。

### T13：系列、动效、提示与缺测贯通

**依赖：** T12。**修改：** `packages/ui/src/charts/vendor/charts/` 下 `line.tsx`、`area.tsx`、`series-bar.tsx`、`series-path-utils.ts`、`use-animated-series-path.ts`、`series-markers.tsx`、`tooltip/chart-tooltip.tsx`、`generate-chart-skeleton-data.ts`、`bar.tsx`、`bar-chart.tsx`及共享壳相关域扫描。分类定位同时检查 `use-highlight-segment.ts`、`highlight-segment-bounds.ts`、`series-dash-tail-overlay.tsx`、`path-stroke-utils.ts`；可组合部件检查 `pattern-area.tsx`、`line-series-terminal-marker.tsx`。**新增：** `packages/ui/src/charts/chart-missing-data.test.tsx`。

1. 先测 `[1,null,3]`不跨缺口连线、`[0,0,0]`是有效数据、全null为空、NaN/Infinity被拒绝、零分母保持null。
2. Line/Area静态与动画路径都采用一致的defined分段；保留Bar/SeriesBar已有null跳过行为，补足有限数校验；markers/tooltip不生成假0点。不要只在示例隐藏整条线来掩盖局部缺测。
3. 分类路径和柱key使用稳定ID；tooltip标题/ticker用分类label，时间模式继续原格式。默认hover高亮和虚线尾段同步使用分类定位；PatternArea、终端标记逐项支持或显式拒绝分类组合，不能依靠类型断言假装兼容。PatternArea若支持缺测分类，必须同步断开缺口。读数仍来自原始值。
4. 空分类loading使用明确骨架/空态，不生成假日期类别；loading→ready不串身份。
5. 重排与中断动画验收时同样保留缺口；类别增删不能把旧颜色和读数串到新项。
6. 运行：`pnpm exec vitest run packages/ui/src/charts/chart-missing-data.test.tsx packages/ui/src/charts/category-axis.test.tsx`；在正常动效浏览器专项追加缺口/分类更新场景。

**完成：** 分类模式全链可运行，缺测在静态与动效中一致；日期图代表回归通过。

### T14：组合图轴绑定、固定域与堆叠几何

**依赖：** T13。**修改：** `packages/ui/src/charts/vendor/charts/` 下 `series-bar.tsx`、`composed-chart.tsx`、`time-series-chart-shell.tsx`、`chart-context.tsx`、`use-chart-interaction.ts`、`y-domain-utils.ts`、`y-axis-scales.ts`；必要时 `y-axis.tsx`。**新增：** `packages/ui/src/charts/composed-axis.test.tsx`。首版分轴固定域只对ComposedChart公开；Bar沿用T02，Line/Area独立根组件不额外扩API。

1. 测试左轴柱40+60、右轴40%，左轴必须容纳100，右轴精确 `[0,100]`；另测右轴SeriesBar定位。
2. SeriesBar增加并贯通 `yAxisId`：Props→配置提取→正确scale→geometry→tooltip。复用Line/Area已有轴方案。
3. 增加最小“axisId→[0, upper]”固定域配置，upper有限且为正；显式域不乘1.1、不nice。保持YAxis从共享scale读取的职责；自动域继续兼容既有时间图。本批不增加任意/负下界，避免无需求扩展零基线几何。
4. 按轴计算堆叠总量。首版同组堆叠必须同轴，不能跨数量/%累加；不同轴可分组。
5. 分组柱中心、堆叠段偏移和tooltip落点使用同一几何结果；tooltip读数显示分项原值而非累计高度。
6. 运行：`pnpm exec vitest run packages/ui/src/charts/composed-axis.test.tsx`；回归原时间composed和bar双轴。

**完成：** 分类/时间组合均不因右轴加入截断堆叠；0—100百分比真实固定，图形与交互命中一致。

### T15：分类与周期业务配方交付

**依赖：** T14。**新增：** `apps/playground/src/docs/components/chart-business/category-examples.tsx`、`comparison-data.ts`、`comparison-data.test.ts`、`tests/e2e/chart-business-category.spec.ts`。**修改：** 业务页、下载集合、line/area/composed/bar Manifest与4.4文件。

1. 至少交付：CH-060学期面积、CH-005学院数量/占比、CH-067层级堆叠数量/覆盖率、CH-049周期面积对照；CH-073版本面积、CH-112固定0—10分版本柱状比较。2026-10-09用户视觉反馈调整选型：只有1—2条折线且需要看趋势时用轻面积；无需趋势对照时可用柱状比较，保留独立数值和缺测。
2. 周期数据用 `{slotId, slotLabel, currentDate, previousDate, currentValue, previousValue}`，由配方明确按天序/星期/教学周对齐；公共图表不猜业务周期。
3. 不同长度末端保留null；tooltip使用已有content回调显示各自原始日期。测试跨年、不同长度和闰日输入，不新增日期依赖。
4. 长学院名、同名不同ID、固定0—100与0—10评分示例证明语义正确；雷达等业务若“越小越好”，配方必须写清，不能复用越大越好解读。
5. 运行V1/V2、新category专项、V4；回归时间Line/Area/Composed、Brush控制/reset、Projection和LiveLine/Candlestick/Scatter代表。
6. 完成源码锁、下载、文档和P3审阅记录。

**完成：** 学院/课程/学期/版本不再伪造日期；业务周期与数值口径透明，现有时间功能兼容。

### T16：网络数据与确定性布局

**依赖：** T15。**新增：** `packages/ui/src/charts/network/network-layout.ts`、`network-data.test.ts`；`apps/playground/src/docs/components/chart-business/network-data.ts`。

```ts
type NetworkNode = { id: string; label: string; category: string; x?: number; y?: number };
type NetworkEdge = { id: string; source: string; target: string; relation: string; directed: boolean; value?: number };
```

1. 先测重复节点/边ID、未知端点、坐标只给一半/非finite、多关系、多节点环路、空/单节点；首版明确拒绝source===target自环，它尚无业务样本需要。
2. 优先使用成对有效坐标；没有时确定性环形布局，同数据同布局，不启动力导常驻模拟。
3. 节点category与edge relation分别配置；多边用轻微错位/弧线区分，多节点环路正常呈现。
4. 建立CH-065/070元素-知识点、CH-083/086课程关系Mock；不把CH-116产业卡片或CH-139概念示意算网络。
5. 运行：`pnpm exec vitest run packages/ui/src/charts/network/network-data.test.ts`。

**完成：** 图结构可信，身份与布局稳定；无图编辑器/物理引擎依赖。

### T17：NetworkChart与等价操作

**依赖：** T16。**新增：** `packages/ui/src/charts/network/network-chart.tsx`、`network-chart.test.tsx`。**修改：** charts `index.ts`、`styles.css`。

1. SVG渲染节点/连线，箭头marker使用useId隔离；类型用线型和颜色共同表示。
2. hover/focus突出邻接节点与边；click/Enter打开同一详情。关系筛选由宿主控制，隐藏选中节点时明确清除选择。
3. 提供可操作节点列表与节点/边精确表；若SVG aria-hidden，列表也必须能执行选择，不能只有只读表。
4. 布局/筛选变化沿稳定ID短过渡，禁止每次hover重算随机坐标；reduce即时变化。
5. 运行：`pnpm exec vitest run packages/ui/src/charts/network`；验证双实例marker与键盘选择。

**完成：** 有向、多类型关系可读，鼠标和键盘操作等价；支持规模以已验证样本为准。

### T18：网络样本、登记与验证

**依赖：** T17。**新增：** `apps/playground/src/docs/components/chart-business/network-examples.tsx`、`manifests/ui/chart-network.yaml`、`tests/e2e/chart-business-network.spec.ts`。**修改：** 图型catalog/example/source/gallery适配、prototype目录与4.4文件。

1. CH-065/070复用同组件切换数据；CH-083/086验证先修/理论实践/相似关系及图例。
2. 接真实sourcePath与新图型计数；业务下载包含fixture，不导入旧G2原型。
3. 桌面/窄容器、长名、多节点环路/多关系、过滤、键盘、reduce、两实例执行验证；超出已验证密度时明确说明并保留列表入口。
4. 运行V1/V2、新network专项、V4；记录P4技术与用户意见。

**完成：** 四张真实关系样本覆盖；不包含节点/边编辑、力导模拟或千节点性能承诺。

### T19：固定国内geometry与区划清单

**依赖：** T18；资料可提前只读调查。**新增：** `apps/playground/src/docs/components/chart-business/data/china/README.md`、`sources.json`、`regions.json`与实际GeoJSON文件；`china-region-data.ts`、`china-region-data.test.ts`。

1. 先找现有业务可使用/再分发的省市geometry；缺失再查可靠公开来源。检索当时核实来源，不在计划中虚构已取得的数据。
2. 固定版本、授权与再分发条件、行政范围、坐标约定、获取日期、hash；geometry与统计值分开，以稳定区划ID关联。
3. 元数据包含id/name/parentId/level/是否有下级；验证唯一ID、父子引用、各geometry完整性与统计未匹配记录。
4. 全国区划清单内每个应有城市层的省级地区，都必须具备对应城市geometry与有效父子引用；直辖市/特殊层级按实际清单分支，不虚构地级市。缺任何应有下级只能记P5部分完成，不能缩小声明范围后称“全国省市完成”。
5. 测试0/null、无效ID、缺少下级、geometry缺失/加载失败及重试数据状态。
6. 运行：`pnpm exec vitest run apps/playground/src/docs/components/chart-business/china-region-data.test.ts`。

**完成：** geometry来源与覆盖可验证。若此项缺失，P5不能宣告完成；P1—P4仍可独立交付。禁止世界底图换标签、手画省界或只交广东代替全国省市。

### T20：Choropleth激活、取景与键盘能力

**依赖：** T19。**修改：** `packages/ui/src/charts/vendor/charts/choropleth/{choropleth-chart,choropleth-feature,choropleth-context}.tsx`、该目录 `index.ts`。**新增：** `packages/ui/src/charts/choropleth-drilldown.test.tsx`。

1. 写测试地区ID点击回调、键盘等价激活、选中状态、geometry切换与旧世界视图兼容。
2. 增加可选按当前geometry取景能力，保留默认世界图行为；切层时重置或恢复视图由明确参数/宿主状态控制。
3. 静态、入场、高亮三条渲染路径都接同一激活回调；不能只修hover层。复用已有drag/zoom状态区分点击与拖拽，拖拽超过阈值或缩放后不得误激活；浏览器验证“拖动不下钻、单击/轻触/键盘可下钻”。
4. SVG继续aria-hidden时，宿主提供同等地区选择控件；若图内可聚焦则定义名称、focus和Enter行为，避免双重重复操作。
5. 复用现有配色/tooltip/zoom，不把下钻业务内置成全国专用组件。
6. 运行：`pnpm exec vitest run packages/ui/src/charts/choropleth-drilldown.test.tsx`，再回归原有5个地图变体、边缘tooltip和缩放。

**完成：** 通用地区图支持稳定激活与局部取景，原世界图不退化。

### T21：省市下钻宿主与样本入口

**依赖：** T20。**新增：** `apps/playground/src/docs/components/chart-business/china-region-examples.tsx`、`tests/e2e/chart-business-map.spec.ts`。**修改：** 业务页、源码下载、choropleth Manifest与4.4文件。

1. 全国选省→显示该省城市；城市选择触发样本详情回调/本地示例面板，不虚构已接真实企业服务；无下级地区进入相应说明或样本。
2. 返回全国/省级保留必要筛选与选择；单位、时段、色标口径随层级说明一致，不把不同量程颜色直接解释为跨层可比。
3. loading/error/retry与0/null分离；记录未匹配统计ID，不能静默消失。
4. CH-117全国、CH-119广东重点视觉；另测另一省、直辖市、无下级、无值、无效ID、加载失败和返回视图。全部geometry做结构与可遍历检查。
5. geometry不塞进通用UI包；与业务源码按依赖下载，说明体积和覆盖。运行V1/V2、新map专项、V4业务消费。
6. 记录P5证据和用户意见；全国清单的全部应有城市层结构和可遍历性检查通过后才写完成，广东及另一省的视觉抽样不能替代全量覆盖检查。

**完成：** 全国→省→城市样本流程可鼠标/键盘完成，来源、范围和失败恢复明确。

### T22：全批收口与复用指导

**依赖：** T08/T11/T15/T18/T21，以及后续确认的体验第一批E01—E03专项验收与固定版本；交接细则见[体验计划第6节](2026-10-10-chart-experience-refinement-plan.md#6-第一批与-t22-的衔接)。**修改：** `docs/ai/charts.md`、charts README、对应Manifest/Registry；`status/current-phase.yaml`仅按真实完成项更新。能力清单和七类核心用法继续维护在现有文档，不另建重复配方文档。**证据：** `evidence/runtime/chart-business-expansion/verification.md`汇总每次独立运行目录。

2026-10-10 当前进度按用户最新范围拆分：

- [x] 整理当前19入口、170变体、10配方、5类业务入口及计划第6节参考覆盖；完整清单放在`docs/ai/chart-capabilities.md`，业务最短用法保留在已有`docs/ai/charts.md`，不另建重复配方文档。
- [x] 核对并修订使用指南与README中的过时能力、计数、缺测、矩阵、网络和地图描述；保留真实限制与各批用户确认范围。
- [x] 补齐七类核心业务用法、宿主请求过程建议、第一批验收矩阵，以及第一批→T22→第二批的交接顺序；仅文档完成。
- [ ] 第一批目标检查、下载定向案例和实际浏览器证据完成；记录已有体验反馈并固定源码、下载配置、依赖和验证文件版本。
- [ ] V1/V2全图表相关收口、V3受影响浏览器场景、V4的170变体与业务下载两组结果齐备；直接引用同一固定版本的有效结果，补未覆盖或已变化的项。本轮文档专项检查不能代替这些项目。
- [ ] 全批用户意见汇总后，按实际确认范围评估方法回流；地图私有体验尚不推广至其他图表。

Manifest、Registry和运行源码本轮只核对；没有新资产、公共API或依赖文件变化，不为文档整理改写来源锁或扩大安装闭包。

1. 按第6节逐项填写实现路径、演示入口、测试和视觉状态；同一组件覆盖多个CH不重复计图型。
2. 按第一批验收矩阵核对已有结果，再补全V1/V2图表范围、V3受影响浏览器场景及V4消费覆盖；矩阵单页和新增默认缺测／旭日键盘流程必须能在本次下载清单中定位。相关源码、配置、依赖或用例未变的通过结果直接引用，无需重复跑同一170集合或全仓测试。
3. 指南回答“比较数量/构成/进度/趋势/矩阵/关系/地域应选什么”和“嵌入需要宿主提供什么”；附最短正确代码与边界。
4. 汇总用户确认后再评估可复用经验，按 `docs/ai/information-design.md` 方法回流；未经验证的最小尺寸不晋升全库规则。
5. 报告每批技术、视觉、交互、无障碍覆盖与未覆盖浏览器/硬件；保留候选/未发布身份。

**完成：** 可以准确判断哪些能力能用、如何复制、哪些仍待确认；无误导性“全库全部验收通过”。

T22技术范围满足后可记“技术收口完成、指定体验项待审”；第一批影响读数或必要操作的目标问题须先修正，不挪到第二批后仍写通过。矩阵、地图、雷达及迷你等已有局部Human Gate单独保留。第二批据T22结果和明确剩余项细化，实施仍按届时有效授权推进。

### T23：条件候选的进入规则

**依赖：** 真实业务需要，不作为T22必做前置。**只在需求成立后新增计划。**

- 词云：先区分真实词频权重布局与普通标签组。标签组复用Tag；只有词频/权重和空间表达有明确用途时再做WordCloud。
- 矩形树图：确认父子层级、可加总叶子值和总量关系；CH-146单张平铺课程参考不证明需要通用层级Treemap，原稿百分比也不能直接当数据。
- 任意XY散点、箱线图、图编辑器、堆叠面积、复杂100%分组堆叠、分类Brush/预测不自动并入本路线。

**完成：** 候选项有清楚进入条件；不为图型数量增加无人需要的能力。

## 6. 业务覆盖与验收矩阵

| 用户诉求 / 参考 | 实现归属 | 必查内容 |
| --- | --- | --- |
| 大小横向条、CH-120排名、CH-138相对位置 | P1 BarChart / DataBar | 共用域、排序身份、基准语义、完整标签 |
| 紧凑分段条 | P1 horizontal stacked | 互斥分项、偏移正确、总量/分母明确 |
| CH-127迷你柱 | P1 mini Bar | 同组尺度、0基线、小尺寸可读 |
| 小饼/环饼 | P1 Pie | 完整构成、零总量、无光晕、嵌入不位移撑开 |
| CH-109完成率弧及进度参考 | P1 Ring | 独立目标分母、连续角度、零目标与100% |
| 迷你折线/面积 | P1现有趋势 | 保留时间合同、当前终值、无布局外壳 |
| CH-026/033/044/054 | P2 Matrix heat | 7×24二维类别，不伪造Date |
| CH-076/115 | P2 Matrix level | 开课学期、未设置、方案无课程分离 |
| CH-084/087/089/090 | P2 Matrix heat | 4/6/12矩阵、固定0—1、重排对应身份 |
| CH-085/088/091/092 | P2 Matrix bubble | 面积映射数量、共享域、0/null区别 |
| CH-145 | P2 Matrix level | 三种明确等级、图例与文字一致 |
| CH-005/006/025/056、CH-062/067 | P3 category / composed | 数量与比率分轴，堆叠合计域与命中 |
| CH-060/061、CH-073/112 | P3 category Line/Area/Composed | 学期/版本有序类别、无假日期 |
| CH-020/049 | P3周期配方 | 相对位置对齐、各自日期、缺尾不补0 |
| CH-011、CH-078、CH-142 | P1/P3现有能力配方 | 分组双轴复用、固定0—100/0—10 |
| CH-065/070/083/086 | P4 Network | 节点/关系类型、有向、邻接、详情和键盘 |
| CH-117/119 | P5 Choropleth | 全国省市、样本入口、返回、特殊层级 |
| CH-116/139 | 现有卡片/概念表达 | 不误计为Network缺口 |
| 词云7例、CH-146 | 条件候选T23 | 先核对词频/层级用途，不承诺本批全部实现 |

## 7. 可执行验证命令与环境

以下均从第1节worktree执行；新文件命令在对应任务创建后才可运行。命令是实施时的检查清单，**本次写计划未运行这些测试**。每项先运行最小目标测试，批次收口再扩大；预期为退出码0且目标断言PASS。

### V1：相关单元、合同与生成样式

```sh
pnpm exec vitest run scripts/charts.test.ts scripts/chart-variant-parts.test.ts scripts/chart-color-consumers.test.ts scripts/verify-chart-variant-consumption.test.ts packages/ui/src/charts apps/playground/src/docs/components/chart-variants apps/playground/src/docs/components/chart-variant-gallery.test.tsx
node scripts/generate-chart-styles.mjs --check
```

新业务目录与消费测试建立后补：

```sh
pnpm exec vitest run apps/playground/src/docs/components/chart-business scripts/verify-chart-business-consumption.test.ts
```

预期：原17子集/170映射保持，全部vendor本地hash对应当前文件，CSS没有作用域外泄。若已有vendor utility变化，先运行生成器不带 `--check`，再检查；不要为自研几个class扩展生成框架。

### V2：编译和构建

```sh
pnpm --filter @rain-next/ui typecheck
pnpm --filter @rain-next/playground typecheck
pnpm --filter @rain-next/prototype typecheck
pnpm exec tsc --noEmit --project tsconfig.tests.json
pnpm --filter @rain-next/playground build
pnpm --filter @rain-next/prototype exec vite build --config vite.bklit-catalog.config.ts
```

预期：公共类型、两个现有消费者、测试类型和独立图库构建全部通过。三个包的typecheck不覆盖测试文件，Vitest默认也不做类型检查，因此新增测试需要单独tsconfig.tests检查；不能用页面渲染成功替代编译。

### V3：浏览器与运动

先按[第一批证据目录要求](2026-10-10-chart-experience-refinement-plan.md#51-实施前基线与证据目录)核对所选spec的截图、JSON和测试结果路径，创建本次独立运行目录。历史硬编码路径未完成输出接线时，不直接重跑下列命令；仅设置Playwright的`--output`不会重定向显式截图／JSON。基线、第一批与T22分别保留目录，当前文档没有修改这些测试。

先检查已有服务来自正确worktree。5173为Playground，部分旧图表检查还访问5387的独立目录；缺失才在独立终端启动，禁止为抢端口杀掉未知服务：

```sh
pnpm --filter @rain-next/playground dev --port 5173 --strictPort
pnpm --filter @rain-next/prototype exec vite --config vite.bklit-catalog.config.ts --host 127.0.0.1 --port 5387 --strictPort
```

上述两个命令分别保持运行。测试命令：

```sh
pnpm exec playwright test --config tests/e2e/chart-business.config.ts
pnpm exec playwright test --config tests/e2e/charts-playground.config.ts
pnpm exec playwright test --config tests/e2e/chart-variants-interactions.config.ts
pnpm exec playwright test --config tests/e2e/chart-feedback.config.ts
```

新 `chart-business.config.ts` 参考现有专用config，限制 `chart-business-*.spec.ts`、5173和独立evidence目录；在spec中覆盖正常/reduce两种模式。每批只启用已实现范围。共享Line/Area正常动效回归放在新的motion专项，访问实际 `#chart-line` / `#chart-area` 或业务mini宿主。现有截图/feedback默认reduce的结果不能证明正常运动流畅；`chart-trend-motion.config.ts`检查旧G2实验，不能作为共享Bklit回归证据。

### V4：源码下载与独立消费

先核对同一固定版本的第一批消费结果。当前业务脚本已内部调用170变体验证；两组结果分别汇总，不要求重复运行两个入口。需要本次新运行时使用独立目录：

```sh
mkdir -p evidence/runtime/chart-business-expansion/t22
chart_t22_evidence="$(mktemp -d "$PWD/evidence/runtime/chart-business-expansion/t22/run-XXXXXX")"
node scripts/verify-chart-business-consumption.mjs "$chart_t22_evidence/consumption"
```

业务结果在`consumption/facts.json`，170结果在`consumption/official-variants/facts.json`；核对实际宿主、源码hash、下载样本、类型、构建与浏览器断言。170项只验证源码闭包、类型与构建，不包含逐项浏览器交互；不能写成170项浏览器通过。`verify-chart-variant-consumption.mjs`保留为仅需验证该集合时的独立入口，同一版本的业务运行已有成功结果时不再重复调用。

当前脚本的业务／mini／分类／网络／中国地图集合尚未覆盖矩阵单页、默认Line／Area／Composed缺测和默认Sunburst键盘流程。第一批先补其目标消费案例，T22再核对矩阵单页等完整清单；复用已有`chartExampleFiles`导出、闭包检查和消费宿主，并同步实际类型／构建入口与浏览器断言，不能只加下载文件后声称可运行。上述用例接入仍待后续代码实施，本轮没有修改脚本。

入口数、170来源变体数与实际下载样本数分别统计。combinations脚本仅证明其实际组合，不能记为170项浏览器通过。沿用已安装依赖缓存的宿主只能证明该消费模式，不能声称干净网络安装通过。

现有 `scripts/verify-chart-consumer-combinations.mjs` 需要实际已生成宿主绝对路径作为第一个参数、证据目录为第二个参数、可选端口为第三个参数。先读取上一条消费输出里的真实host再调用，禁止无参运行或编造宿主路径。

## 8. 每批完成定义与交接

每批交接必须同时包含：

1. 本批实现清单、公共API和实际演示入口；原设计样本映射。
2. 代码/文档/Manifest/Registry/源码锁/下载的文件闭包。
3. 正常、0、缺测、非法、长名、窄容器、多实例的技术结果。
4. 普通运动、reduce、连续交互、真实宿主和批量表现的独立记录。
5. 用户视觉与手感意见；技术通过不替代这一项。
6. 未覆盖项及可复现风险；保留未发布候选身份。

建议实际启动指令：**“按此计划从T00开始实施P1，先完成条形和迷你图表，在真实表格、卡片、列表中交付运行效果与验证证据。”** 后续按已确认顺序逐批推进；只在新增范围、真实业务口径冲突或P5来源依赖确实无法自行解决时提出具体问题。

目前没有必须继续讨论才能开始P1的问题。需要后续实际验证的是最小可读尺寸、动效手感、多实例性能和真实硬件体验；需要P5前解决的是省市geometry的来源、完整性及再分发条件。
