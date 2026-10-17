# Rain 图表候选库

2026-10-11 图表收尾的当前工程、质量及安装边界见[收尾记录](../../../../evidence/runtime/chart-closeout-2026-10-11/verification.md)，已有确认与待审范围统一见[当前审阅入口](../../../../evidence/runtime/chart-closeout-2026-10-11/human-review.md)。记录中的浏览器、安装与SSR结论仅适用于实际检查的配置；候选／未发布身份保持。

保留 Bklit 的 Compound API、图形结构、默认动效和交互，通过独立样式接入 Rain 配色、字体、辅助文字层级与留白。原17个Bklit入口与Rain本地Matrix、Network共19个图型；`@rain-next/ui`主入口不转导出图表，170官网变体身份保持。

当前身份为 `registry-candidate`，本地 Registry 未发布。技术检查与最终视觉审阅分别记录，最新状态见[本任务 phase](../../../../status/current-phase.yaml)、[逐图 Manifest](../../../../manifests/ui/chart-area.yaml)和[来源核对记录](../../../../evidence/runtime/bklit-rain-catalog/p0/source-audit.md)。最终全目录视觉 Gate 为 `awaiting-user-review`；已认可的四样本基础不自动扩为 19 入口验收。

默认从[按业务问题选图](../../../../docs/ai/charts.md#按业务关系选图)进入，再按[AI 与开发接入指引](../../../../docs/ai/charts.md#ai-与开发接入指引)查样式、数据、宿主责任、示例与完整文件；[能力清单](../../../../docs/ai/chart-capabilities.md)保留19入口、170变体、10配方、业务覆盖与分范围确认。本 README 提供技术细节。2026-10-11 第三批具名密集／重叠、近零／连续零、密集／平盘与实时生命周期的当前证据见[第三批技术记录](../../../../evidence/runtime/chart-experience-third-batch-2026-10-11/verification.md)与[当前体验审阅](../../../../evidence/runtime/chart-experience-third-batch-2026-10-11/human-review.md)。最新图例约定见[图例与读数规则](../../../../docs/ai/chart-legend-rules.md)，第二批实现及工程检查见[本轮技术记录](../../../../evidence/runtime/chart-experience-second-batch-2026-10-11/verification.md)，当前确认与待审范围见[合并人工审阅](../../../../evidence/runtime/chart-experience-second-batch-2026-10-11/human-review.md)。[第一批记录](../../../../evidence/runtime/chart-experience-first-batch/run-7ccz8fjn/verification.md)保留为当时证据，不代表最新工程诊断。技术检查不改变发布或人工Gate。

## 导入与容器

```tsx
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/charts/styles.css";
import {
  AreaChart, Area, Grid, XAxis, YAxis, ChartTooltip, TooltipContent,
} from "@rain-next/ui/charts";

const data = [
  { date: new Date(2026, 8, 1), students: 120 },
  { date: new Date(2026, 8, 2), students: 168 },
  { date: new Date(2026, 8, 3), students: 142 },
];

export function StudentTrend() {
  return <figure className="rain-chart" data-recipe="trend-soft" style={{ margin: 0 }}>
    <figcaption>每日参与人数 · 人</figcaption>
    <AreaChart data={data} className="rain-chart-plot" aspectRatio=""
      margin={{ top: 24, right: 24, bottom: 38, left: 58 }}>
      <Grid horizontal numTicksRows={4} />
      <Area dataKey="students" fill="var(--chart-1)" fillOpacity={.24} />
      <YAxis numTicks={4} /><XAxis numTicks={4} />
      <ChartTooltip content={({ point }) => <TooltipContent
        title={(point.date as Date).toLocaleDateString("zh-CN")}
        rows={[{ label: "参与人数", value: `${point.students} 人`, color: "var(--chart-1)" }]} />}
      />
    </AreaChart>
    <details><summary>精确数据</summary><table>
      <caption>每日参与人数</caption><thead><tr><th scope="col">日期</th><th scope="col">人数</th></tr></thead>
      <tbody>{data.map(item => <tr key={item.date.getTime()}>
        <th scope="row">{item.date.toLocaleDateString("zh-CN")}</th><td>{item.students}</td>
      </tr>)}</tbody>
    </table></details>
  </figure>;
}
```

`.rain-chart` 是样式作用域。图表需要可测量的宽度和高度；`rain-chart-plot` 默认高 320px，窄屏高 280px。也可自行提供容器尺寸，使用 `aspectRatio=""` 让坐标图遵从高度。图例、精确表、标题、业务筛选及请求由宿主组合。示例尺寸是使用起点，长标签、双轴和首尾柱需要按实际图形边缘检查。

完整下载示例以浏览器CSR运行：入口调用`createRoot`，响应式图形需要DOM测量，默认Live宿主初始化读取`document.hidden`。无DOM的Node预检中，公共DataBar可输出语义读数；公共Line/Live只输出未测量shell，默认Line示例保留精确表，默认Live示例无法直接server render。这不是完整SSR或hydration合同，不应在服务器直接执行整份示例。实际安装、打包与有限SSR复验见[收尾消费记录](../../../../evidence/runtime/chart-closeout-2026-10-11/install-consumption/verification.md)。

样式已包含作用域内的原生 utility 闭包，消费者不需要扫描 vendor 或加载 Bklit 的全局 reset。只使用原生图表时无需导入整个 `@rain-next/ui/styles.css`；Network直接组合Rain Button/Table，需UI根样式与既有Tailwind/Foundations桥接。其它宿主使用Rain组件时也按各自合同加载样式。

## 图型与数据合同

| ID / 公共入口 | 数据与语义 | 组合 Parts 与边界 |
| --- | --- | --- |
| area / `AreaChart` | 有序 `Date` 或显式 `xMode="category"`；透明叠加面积 | `Area`、坐标、提示；null保留断口，不自动等于累计堆叠 |
| line / `LineChart` | 有序 `Date` 或显式分类ID与输入顺序；有限数值 | `Line`、坐标、提示；null断线，缺测插值和通用固定提示未提供 |
| bar / `BarChart` | 唯一类别键 `xDataKey` 与非负有限值 | `Bar`、`BarXAxis`、`BarYAxis`；分组或互斥类别堆叠，原生以 0 为下界 |
| composed / `ComposedChart` | 同一时间／分类行的多个系列；数量与比率分别读轴 | `Area`、`SeriesBar`、`Line`按yAxisId绑定；`yDomains`固定各轴域，同组堆叠同轴；分母归宿主 |
| pie / `PieChart` | `PieData[] = {label,value,color?}`；互斥类别的非负构成 | `PieSlice`、`PieCenter`；`innerRadius` 表达环饼，零总量不造占比 |
| ring / `RingChart` | `RingData[] = {label,value,maxValue,color?}`，`0≤value≤maxValue`、`maxValue>0` | `Ring`、`RingCenter`；每环独立分母，不将所有目标求总量 |
| radar / `RadarChart` | `metrics: {key,label}[]`、系列 `{label,values,color?}`；每维归一到 0—100 | `RadarGrid`、`RadarAxis`、`RadarArea`、`RadarLabels`；量纲转换由宿主说明 |
| scatter / `ScatterChart` | 有序 `Date`、非负 Y；同一时刻多个系列 | `Scatter`、坐标、提示；当前为时间散点，不提供任意 XY 或负 Y |
| funnel / `FunnelChart` | `FunnelStage[] = {label,value,color?,gradient?}`；固定阶段、非负值 | 原生标签和光感层；示例百分比相对第一阶段，阶段增长不直接是流失 |
| gauge / `Gauge` | `value: 0—100`；业务量程先归一 | 原生弧形或线形刻度、中心读数、激活渐变与底轨；任意量程/告警未实现 |
| sankey / `SankeyChart` | `{nodes:[{name,...}],links:[{source:number,target:number,value:number}]}`；索引引用有效节点、非负权重 | `SankeyNode`、`SankeyLink`、`SankeyTooltip`；宿主维持 ID 到索引映射和节点配色，不当作关系网络 |
| sunburst / `SunburstChart` | `SunburstNode = {name,value?,children?,color?}`；父值来自叶项求和 | `buildArcs`、`SunburstSegment`、`SunburstLabels`、`SunburstCenter`、面包屑/提示；父项不重复记账 |
| heatmap / `HeatmapChart` | `HeatmapColumn[] = {bin,bins:[{bin,date:Date,count}]}`；每列 7 天，与 `weekStartDay` 对齐 | `HeatmapCells`、坐标、图例、提示；0 有效，-1 为缺测，本版按日历验证 |
| choropleth / `ChoroplethChart` | GeoJSON `FeatureCollection`；稳定地区 ID 与值关联、缺值单独表示 | `ChoroplethFeatureComponent`、`ChoroplethTooltip`；地图几何由宿主提供；示例使用固定Natural Earth世界几何与演示数值 |
| candlestick / `CandlestickChart` | `OHLCDataPoint[] = {date:Date,open,high,low,close}`；`low≤min(open,close)`、`high≥max(open,close)` | `Candlestick`、坐标、提示；颜色指开收方向，平盘与业务好坏分别判断 |
| profit-loss / `ProfitLossLine` | 有序 `Date` 与有限正负值；0 为基准 | 与 `LineChart` 和同 dataKey 的 `Line` 配合注册值域，再绘制 `ProfitLossLine`，不能单独挂在普通 div |
| live-line / `LiveLineChart` | `LiveLinePoint[] = {time: Unix秒,value}`、`value` 为最新值；时间单调递增 | `LiveLine`、`LiveXAxis`、`LiveYAxis`、提示；生产者、暂停、有界缓冲及卸载清理由宿主拥有 |
| matrix / `MatrixChart` | 稳定行列ID、唯一坐标；`value/missing/not-applicable` | heat（含离散steps）／bubble／level；语义表格、同源图例、格内读数与键盘巡读；[完整合同](matrix/README.md) |
| network / `NetworkChart` | 稳定节点／边ID、类别、关系、方向与可选成对坐标 | glow／structured、邻接预览、固定详情、完整列表和精确表；有限布局范围；[完整合同](network/README.md) |

具体调用和交互示例见[唯一示例实现](../../../../apps/playground/src/docs/components/chart-examples.tsx)与[示例数据/校验](../../../../apps/playground/src/docs/components/chart-data.ts)。组件目录路由为 `/#chart-<id>`；独立原型目录为 `/bklit-catalog.html`，保留 `/bklit-validation.html` 原生/Rain 对照和 `/chart-validation.html` G2 实验。

`ProfitLossLine` 在精确观测值 0 处跨越正负时共享该零点作为色段边界；连续零平台沿用进入平台的符号，离开时若变号，在最后一个零点分段。原始日期、读数和无零点跨越时的插值保持不变。

默认Line／Area／Composed“缺测”样本保留Date与null断口，0为有效观测，计数为0且分母为0时完成率不适用；全部缺测仅提供同源状态与精确表，mini保留96×32或128×48槽和缺测末值。默认Sunburst使用当前层级Rain Button及Breadcrumb共享原生zoomTo，Enter／Space下钻，返回恢复对应焦点；“长标签”提供真实额外层级。以上属于示例宿主接线，公共输入合同和共享几何未改。

Rain 本地 [MatrixChart](matrix/README.md) 提供原生表格分类交叉矩阵：稳定行列 ID，显式热度值域、非负面积气泡值域或等级映射，保留有效0、缺测与不适用。热度数字按实际填色选择深色或反白，气泡数字反白，两者均无读数背板；气泡文字按实际bbox和当前半径判断是否容纳，小圆保留真实面积并通过提示／表格提供精确值。等级只画圆点，文字在图例与可访问读数。首次进入视野后有限入场，排序、数值和颜色按稳定ID连续更新，reduce即时；细节以Matrix专属README为准。该增量不计入170官网集合，日历与分类合同分开。

Rain本地[NetworkChart](network/README.md)提供glow／structured两种关系视图：节点类别、关系类型、箭头、同节点对多关系、临时邻接预览与固定详情。节点列表、关系文字和精确Table提供等价读取；有效坐标优先，无坐标采用确定布局，不启动力导。相同完整布局的子集保留幸存路径；可见几何切换等待连线退场、节点移动完成后重接，快速输入接续最新目标，reduce即时。当前四组Mock为8—11节点、10—19边，宽度不超过620px时改用完整关系列表；有限曲线避让不能保证任意密集输入的布局。组件直接复用Button/Table，加载UI根样式和既有桥接；业务入口为`/#chart-network`，不计入170官网集合。当前样本交互／动效的限定用户确认见[最新证据](../../../../evidence/runtime/chart-network-experience-2026-10-10/verification.md)。

国内地图配方在 `/#chart-china`：固定399项真实几何（34省、333地级、32省直管县级），全国→省内→Mock详情，具名地区选择器与地图提供对应操作。`ChoroplethChart fitToData`按当前geometry取景，`ChoroplethFeatureComponent onFeatureActivate/selectedFeatureId`使用稳定ID；默认世界投影不变。数据、父级、统计校验和下钻归App所有；不同层各自量程，缺测不填0，未匹配ID明确列出，加载失败可重试。直辖市直接详情；港澳台固定源只有省级面，不造同名城市。

几何不进入UI或Registry文件集。下载本配方时包含3份GeoJSON（约8.1MB）、399项清单及[独立数据来源和许可说明](../../../../apps/playground/src/docs/components/chart-business/data/china/README.md)。HDX历史与OSM不同固定快照分别保存；不保证精确接边或最新边界，不用于面积统计。共享API只接受GeoJSON，不内置中国专用业务。

## 组合报告的轴与分母

组合图的原生柱使用 `SeriesBar`，分类柱图使用 `Bar`。比率绑定右轴，人数绑定左轴；`rate` 在数据层计算为 `completed / enrolled * 100`。参与人数为0时，宿主将该项比例设为null并明确“不适用”；共享Line/Area支持静态与更新中的缺测断口，全系列缺测不造0线。不能过滤掉null后把两端连起来；原始分子、分母和精确状态应保留。

```tsx
import { ComposedChart, Area, SeriesBar, Line, Grid, XAxis, YAxis, ChartTooltip, TooltipContent } from "@rain-next/ui/charts";

const report = [
  { date: new Date(2026, 8, 1), enrolled: 100, completed: 60, rate: 60 },
  { date: new Date(2026, 8, 2), enrolled: 200, completed: 150, rate: 75 },
];

export function CompletionReport() {
  return <div className="rain-chart" data-recipe="category-near">
    <ComposedChart data={report} className="rain-chart-plot" aspectRatio=""
      margin={{ top: 24, right: 70, bottom: 38, left: 70 }}>
      <Grid horizontal />
      <Area dataKey="enrolled" fill="var(--chart-1)" fillOpacity={.2} />
      <SeriesBar dataKey="completed" fill="var(--chart-2)" stroke="var(--chart-2)" />
      <Line dataKey="rate" yAxisId="right" stroke="var(--chart-3)" fadeEdges={false} />
      <YAxis /><YAxis yAxisId="right" orientation="right" formatValue={value => `${value}%`} /><XAxis />
      <ChartTooltip content={({ point }) => <TooltipContent rows={[
        { label: "参与人数", value: `${point.enrolled} 人`, color: "var(--chart-1)" },
        { label: "完成人数", value: `${point.completed} 人`, color: "var(--chart-2)" },
        { label: "完成率", value: `${point.rate}%`, color: "var(--chart-3)" },
      ]} />} />
    </ComposedChart>
  </div>;
}
```

地区概览先用 `ChoroplethChart` 读取自己的 GeoJSON，以稳定地区 ID 关联数值；`getFeatureColor`、提示、色条必须使用同一值域和缺测规则。`ChoroplethFeature` 是数据类型，渲染组件公共名为 `ChoroplethFeatureComponent`，可在 import 时别名。多目标进度另用 `RingChart`，每项保留原始 `value/maxValue` 和单位；默认中心不显示无意义的跨目标总和。

## 雷达图的同尺度比较

`RadarGrid`顶点与每个维度的100分端点对齐，三、五、六维示例保持固定维度次序和共同0–100量程。`RadarArea`保留原生系列聚焦、面积、描边与顶点变化，悬停光晕为6px、25%系列色；`showGlow={false}`仍关闭光晕，`animate={false}`也使系列悬停过渡即时响应。维度标签使用既有Regular字重。

`RadarArea` 在系统减少动效、`animate={false}` 或零入场时长下直接呈现终态，取消系列等待；运行中开启减少动效也立即保留当前图例聚焦状态。正常模式的入场次序、时长与样式保持不变。

Playground默认入口与六个雷达变体复用同一示例图例：13px、Regular和相同文字角色；鼠标指向、按钮焦点与点击通过既有受控`hoveredIndex` / `onHoverChange`联动系列，离开/失焦恢复，实例状态独立。图例表示系列身份，不合计各维分数；精确值仍读取数据表。[本轮验证](../../../../evidence/runtime/chart-radar-feedback-2026-10-09/verification.md)单独记录技术检查与待用户视觉审阅状态。

## 横条与嵌入小图

`BarChart orientation="horizontal"` 支持普通、分组和互斥堆叠横条。`valueDomain={[0,100]}` 固定主数值轴，不加自动留白或 nice；上界必须有限且大于0，省略时维持原自动域。需要比较的多实例由宿主传入同一域，筛选与排序不重算它。全零配方使用非零绘图域但值仍为0，不生成假正长度。`xDataKey="id"` 负责稳定身份；`BarXAxis` / `BarYAxis` 的 `formatLabel(id,datum)` 显示名称，同名项不合并。提示通过已有 `content` 回调读取 `datum.label`。

`DataBar` 是 bar 家族的轻量数量条，不增加图型入口，也不推断任务进度。它要求 `value: number|null`、`maxValue: number`、`label`；`valueText` 可补单位。多个数量条共用宿主给出的 maxValue，评分用真实满分，相对位置说明方向。0保持空轨，null为缺测；value/max均为0时是无尺度全零状态，其他非法值和超域保留不可绘制状态，不静默截成满条。填充以真实宽度连续过渡，保持两端圆弧；减少动效即时完成。`decorative` 隐藏重复图形语义，此时宿主必须提供具名、精确读数。

```tsx
import { DataBar } from "@rain-next/ui/charts";
// 表格这一列的完整比较组共用100，筛选不改变它。
<div className="rain-chart"><span>参与人数 25 人</span>
  <DataBar value={25} maxValue={100} label="参与人数" decorative />
</div>
```

可组合的小图配方见[实际示例](../../../../apps/playground/src/docs/components/chart-business/mini-examples.tsx)，几何统一来自[局部尺寸表](../../../../apps/playground/src/docs/components/chart-business/mini-layout.ts)。`MiniSize`属于可下载应用配方，公共Parts不新增size枚举：

| 图形 | compact（紧凑选型） | comfortable（舒展选型） |
| --- | --- | --- |
| 柱 / 折线 / 面积 | 96×32 | 128×48 |
| 饼 / 环饼 | 32×32 | 56×56 |
| 完整进度环 | 32×32 | 64×64 |
| 底部开口进度弧 | 40×30 | 72×54 |
| 数量条 / 分段条可见厚度 | 6 | 8 |
| 图与外置读数间距 | 8 | 12 |

分段条使用10 / 12px画布及上下2px安全区；不能把画布缩到BarChart保护阈值以下。两档共用数据、类别颜色和分母。人数条与每日柱分别从完整比较集合求量程，再筛选排序；折线与面积按自身范围表示走势，不用于跨行比绝对高度。卡片与表格的趋势优先使用compact面积96×32，构成和进度卡仍按阅读密度选择comfortable；画廊保留两档折线与面积。紧凑圆图外置读数，舒展进度弧中心显示真实`value/maxValue`百分比与短说明；文字放大超出内区时移到图外并允许宿主重排。正常、缺测、无效及离屏占位保留同型号槽，0不伪造最小柱长。构成具名“已完成、进行中、待开始”；零构成不生成假扇区，零目标显示不适用。`RingChart padding`默认8，可在小尺寸显式减小，须有限、非负且小于半径；内径与环带要同时显式配置，保持圆形及225°底部开口，不能整体CSS缩放。

2026-10-09 最新迷你反馈统一普通标签、数值、百分比、单位和状态为13px / 20px，指标卡重点数字保持28px / 36px，标题保留层级。表格参与人数 `DataBar` 为80×6，画廊紧凑条和列表评分条仍120×6、画廊舒展条仍160×8；端点圆弧不随比例横向缩放。卡片与表格趋势改用紧凑面积，见[本轮验证](../../../../evidence/runtime/chart-mini-typography-feedback-2026-10-09/verification.md)。旧[首轮反馈](../../../../evidence/runtime/chart-visual-feedback-2026-10-09/verification.md)、[迷你证据](../../../../evidence/runtime/chart-mini-refinement/verification.md)与[矩阵证据](../../../../evidence/runtime/chart-business-expansion/p2-agent/verification.md)保留；对比度 Gate 仍为 `not-granted`，未发布边界不变。

同日名称反馈限定于业务示例：横条轴名称与排名名称的默认色使用Text/Neutral/3，与表格名称按钮同层；轴标签取消重复透明淡化，仍保留原生悬停文字过渡。排名名称列按最长内容占宽并在长名称时封顶，条形共享起点，数值右齐；窄屏保留名称上移的两行关系。公共图表的辅助坐标默认不变，见[名称与列宽验证](../../../../evidence/runtime/chart-business-label-color-layout-2026-10-09/verification.md)。

2D条柱的数据更新和重排保留同一图形并连续过渡；Pie grow 配方与进度弧保留正常动效，减少动效即时变化。650ms为本地SVG入场起点；Ring更新保留原生弹簧，实际稳定时间另测，不能把固定等待650ms当终态证明。响应式Ring在短暂测得直径不足以容纳padding时等待下一次有效测量；显式非法size / padding仍拒绝。现有3D深度柱保留原有入场及更新路径；持续更新需先统一正面、深度、顶盖三层几何与时间。真实卡片、滚动表格、列表与完整下载入口为 `/#chart-business`；准确读数通过文本和学院按钮详情读取，基础 Tooltip 的 portal 避免表格裁切。首次视觉审阅仍单独等待用户确认。

## 配色与可选配方

`rainChartRecipes` / `RainChartRecipe` 是具名配方元信息。`data-recipe` 选择本地图表色组；几何、渐变 `<defs>`、透明度、圆角和原生 Parts 仍由调用代码提供，元信息不会自动变成另一个图形。当前[配方源](recipes.ts)与示例调用一起构成合同。

| 配方 ID | 适用图型与颜色规则 | 原生配置 / 来源 |
| --- | --- | --- |
| trend-soft | 面积、折线、漏斗、仪表、实时折线；单一趋势主色 | 清晰描边 + 轻面积，面积示例 .24，迷你 .2；P03。漏斗/仪表使用各自原生渐变 |
| category-near | 类别/系列图、桑基；蓝紫近邻 5 色 | `#5074ff #895aff #8a7cfc #509cff #30b3ff`；P01/P03 的色组提炼 |
| category-wide | 类别/系列图、桑基；5 类之间加大色差 | `#236eff #675fff #01adc3 #ff6cc4 #f57e58`；参考样本色组 |
| category-solid | 类别/系列图、漏斗；协调实色 | `#4661fe #8848ff #37b5ce #658cff #bfa5ff`；P04 |
| monochrome-blue | 蓝灰单色；除K线、盈亏线外的15类图表，按图型取色 | 用户确认色阶；`--chart-1…5` 为 `#6288C7 #3F5D91 #91B0E1 #BFD3F2 #E5EEFC`，主体为 `#6288C7`；适用于浅色背景 |
| bar-gradient | 分类柱图；每系列同色从浓到浅 | 原生 fill 引用唯一 SVG gradient，顶到底，opacity .95→.4；P01 |
| bar-fade | 分类柱图；圆头渐隐柱 | 原生 `lineCap="round"` + 同色顶到底 opacity 1→0；P02。短柱须保留基线与精确值 |
| intensity | 日历热图、分区地图；数值强弱 5 级 | `--chart-scale-01…05`：`#f5f4ff #dfe1ff #a1a9ff #7c7dfd #4a31d1`；P05。有效 0 用最浅色，缺值用 `--chart-no-data` |
| flow | 桑基；节点身份稳定、来源到目标过渡 | 原生连线双色渐变；路径宽度表达权重，聚焦保持来源/目标颜色；P07 |
| sign | K线、盈亏线、实时折线动量 | 非负/上涨 `--chart-positive`，负值/下跌 `--chart-negative`，平态 `--chart-neutral`；绿色 `#30a87b`、红色 `#ed6b70` 为局部配方，不默认表示好/坏 |

并非每个 ID 适用于每个图型，逐图候选见 Manifest 与目录。P06 继承原生仪表/环的可配置能力，业务进度弧另由Ring局部配方实现；P08关系表达已由Rain本地Network的柔光／结构化样本承接，不再作为完全缺失的图型。迷你双尺寸属于局部组合配方，不增加图型身份。

颜色按稳定 series/node/region 身份绑定，不能在筛选或排序后用当前下标重新派色。默认提供 5 个类别角色；更多类别需要标签、线型或新的可审阅局部配方，不循环少量颜色冒充无限可辨。

`monochrome-blue` 的五档是取色资源，不承诺五个并列系列在所有图型中均清楚可辨；浅色填充不直接承担细线、小点或必要文字。类别颜色保持身份稳定，强度色阶按 `--chart-5 → 4 → 3 → 1 → 2` 从浅到深映射，0与缺测仍分开。漏斗按阶段使用同色相过渡；旭日使用浅色区块与深色标签；仪表沿用原生渐变。切换配方后检查明度区分、重叠边界、末端可见性及悬停读数。

2026-10-08，用户已完成 `monochrome-blue / 蓝灰单色` 配方的视觉审核，记录为通过；确认范围与技术证据见[蓝灰单色验证记录](../../../../evidence/runtime/chart-monochrome-blue/verification.md)。

## Rain 共同规则与动效

- 坐标、日期和普通图例使用 `Text/Neutral/4`，桑基节点与漏斗人数同样使用 `Text/Neutral/4`，Regular 400。原Neutral5在实际白底普通文字中低于4.5:1，收尾仅调整必要文字的现有Token引用，系列配色与图形不变。图例和通用小号标签为 13px，横向BarYAxis类别标签为13px / 20px；图例列间距 24px、行间距 8px，其他原生更小的坐标和扇区文字保留。旭日示例反白标签使用现有深色色阶`--chart-scale-05`及原生`strokeWidth={2}`，`paintOrder="stroke"`保留白色字面与约1px外缘；默认蓝灰单色示例仍用深色无描边文字。没有标签的变体不新增标签，扇区配色、几何与数据不变。主读数/提示的精确值保持清楚；不整体降低图表 opacity。
- 仪表主读数为 24px，弧形读数对齐几何中心，线形标题保留实际宽度、距刻度 8px。互斥堆叠柱的纵轴、柱段与提示共用累计值域，不能按单个系列最大值缩放。
- 表面、网格、提示、指示器、Marker/Badge、局部高亮和未激活底轨映射现有 Rain Token。数据类别色、强度色和正负色是 `.rain-chart` 内具名 Local Recipe，不修改品牌蓝或新增全局 Token。
- 正式 UI 文字与普通数字使用 PingFang SC 角色；关键中心数值遵从 Rain 数据字体职责，中文单位保留 UI 字体。字体文件不随图表 Registry 分发。
- 保留默认原生展示强度。减少动效时保留最终读数，示例关闭入场、位移及实时自动生产者；`useReducedMotion` 已由共享运动辅助函数处理弹簧跟随。完整消费须同时检查原生组件和宿主生产者，不能仅设置一次 `MotionConfig`。

`XAxis` 的响应式位置随容器即时变化；同尺寸的普通数据更新保留原有位置过渡，系统减少动效或 `animationDuration={0}` 则即时定位。2026-10-11 三处行为修复的首帧、真实读数、稳定画面与独立消费记录见[专项验证](../../../../evidence/runtime/chart-behavior-fixes-2026-10-11/verification.md)，其技术通过不代替视觉确认。

## 数据状态、可访问性与消费责任

宿主在信任边界校验日期、有限数值、量程、引用关系和业务分母；原生 Parts 不是通用数据校验器。空数据以具名状态呈现，无效数据拒绝绘制，0 与缺测分别保留。Line/Area及组合中的对应系列保留null断口，DataBar区分null状态，Matrix显式missing／not-applicable，日历／地图按各自no-data合同处理；其余图按逐图合同呈现状态，不泛化为全库支持null或隐式补零。饼、漏斗、桑基、旭日总量为0时提供说明和零值表，不生成误导比例。

每图提供清楚的标题、单位、读数解释和可访问精确数据表。`ChartLegend` 传入 `onHover` 时，默认条目就是按钮，支持指向、Tab、点击／Enter／Space读取及清除临时聚焦；不传回调则保留静态图例，无需为默认键盘操作额外提供 `renderItem`。`ChartLegend` 与compound `Legend` 以唯一、稳定的 `label` 保持身份，数值放在 `value`；同名对象由宿主提供可区分标签。自定义 `renderItem` 和compound children仍由宿主提供按钮语义，完整清除、更新与重排规则见[图例规则](../../../../docs/ai/chart-legend-rules.md)。图例聚焦不隐藏系列或改变量程、分母。

`HeatmapCells` 已提供逐日键盘入口：方向键巡读，Home／End读取周首尾，Ctrl+Home／End读取首尾日期，Escape清除；提示重读当前日期，窄容器仅滚动最近的横向容器。Matrix仍按稳定行列ID键盘巡读，Sunburst层级按钮、Network对象详情和中国地图选择器分别保留自己的操作。以上不代表所有图形已具备逐点键盘导航。颜色之外保留标签、正负号、位置/形状或文本状态；触屏保留精确表与显式控件。真实读屏、物理触屏、完整对比度验收和完整深色主题分别未授权为通过。

实时示例只模拟数据：1 秒追加一次、60 秒窗口、最多 120 点；暂停/减少动效改为手动追加，切换和卸载清理定时器。Native `paused` 冻结图表时钟，手动追加同步`frozenNow`而保留图表节点，重播仅重播线条。默认与来源变体都观察实际plot的可见性并响应后台状态；长精确表仍在屏内不能保持plot循环。默认下载捕获当前有界点集、用户暂停与冻结时间，来源变体继续在暂停／手动时捕获；生产接入需明确自己的订阅、窗口及销毁责任。

默认与来源示例的时间散点、盈亏线及K线有私有按日期精确读取和具名边界样本；日期使用稳定真实Date，更新后读当前值，日期移除清除读取。散点仍是非负Y／日期轴，重叠不隐藏系列；近零数值保留正负原值，平盘保持开收精确相等。原生菜单键选择、实机辅助技术与完整对比度单独验证，不由焦点或selectOption检查推导通过。

## 来源、Registry 与升级

- 固定源码：`bklit/bklit-ui@5d699897b2dde26374cf15501dbaadbc52cea982`，保留[MIT LICENSE](vendor/LICENSE)、[逐文件源码锁](vendor/source-lock.json)及相对导入调整记录。
- 本地补丁以源码锁的 `change` 和验证记录为准，含轴距、多实例ID、减少动效、尺寸守卫、分类定位、缺测与分轴等实际增量；Matrix/Network位于vendor外，来源为Rain本地扩展。
- [本地 Registry](../../../../registry/charts.json) 的 `shared.files + items[].files` 提供完整源码/样式闭包；React、React DOM、Foundations、实际 npm/类型依赖分别登记。直接版本固定，传递依赖由工作区锁文件复现；不把 alpha 依赖写成稳定版本。
- 世界地图示例使用固定Natural Earth v5.1.2的177地区几何；中国业务配方使用HDX/OSM的399地区固定几何，统计和详情均为Mock。数据在应用目录，来源、许可、快照与修改说明随下载保留；几何不进入通用UI包，不能用其证明最新行政边界或进行精确面积统计。
- 升级固定commit后比较上游与本地补丁、更新哈希及依赖，再验证受影响图型、样式隔离和独立消费。候选API可变化；SSR、任意XY、超出Matrix编码或Network规模／布局合同的能力、生产数据服务和在线分发按实际需求另行处理。

按业务问题选图见[AI 图表使用指南](../../../../docs/ai/charts.md)。完整 API 以[显式导出](index.ts)和各 native Props 类型为准；示例页面和模拟数据不是 UI 包依赖。


## 170 个展示变体 · 未发布增量

Playground 和原型目录在原有17默认预览后，按四组一页展示对应官网的170条稳定示例；line-profit-loss只映射盈亏线入口一次。App侧六个小型家族模块组合公开Compound Parts，未新增170个公共组件或配置引擎。参考与映射见`apps/playground/src/docs/components/chart-variants/reference.json`；点击每卡“查看本卡代码”获取正在渲染的完整家族文件与数据闭包，当前配方、更新次数、曲线选择写入调用源码。

新增公开能力：Background、ReferenceArea、BarDepthProvider/Back/Front/Pulse、BarSquares/ColumnTrack、ChartBrush/Layout/Overlays、ProjectionLine/EndMarker、LineSeriesTerminalMarker、ChartMarkers/MarkerGroup，以及临时拖选Segment三件。支持6种真实曲线。Projection与持久Brush分开；面积透明叠加不视为累计堆叠。Bar双轴仅纵向非堆叠。

时间Brush固定使用`@visx/brush@4.0.1-alpha.0`，与现有Visx 4及React19匹配；3.12.0的严格peer安装在React19下失败。Registry与锁文件同步固定版本，类型从上游公共入口读取。拖选回传以实际像素选区反解时间，避免上游命中容差在受控回写时扩大范围；平移保持选区宽度。兼容结论限定于当前API、真实Brush拖选／键盘／重置及独立消费，不承诺所有上游变体或未来版本。

LiveLineChart的paused会停止RAF并保留内部窗口；running=false停止帧工作，frozenNow（Unix毫秒）仅供主动手动推进暂停窗口。模拟生产者归宿主；离屏、后台、减少动效和用户暂停优先停止定时器与pulse，恢复不重置暂停快照。新示例最多120条；旧默认60秒窗口保持不变，各官网示例的20—30秒窗口在卡片文字中明确。

热图0是有效值，负数/非有限/缺值按no-data绘制与悬浮分组；纹理及图例ID按实例隔离。滚动、地图缩放与旭日下钻离屏后保留。世界地图是Natural Earth v5.1.2固定177地区Mock，不运行时请求；几何来源、许可与哈希见示例data/README.md。需要的JSON与说明文件包含于下载。

语义色卡固定sign；材质/渐变示例明确拥有独立配色，热图渐变图例固定intensity。它们不会被页面蓝灰选择无声覆盖。170卡的技术证据与新视觉Human Gate分开；本增量未发布、未迁移到生产，Safari/VoiceOver与全部对比度仍待人工检查。

当前卡片下载入口将配色、revision、replay、曲线，以及已选择的0值/长文案/加载/Brush范围/层级焦点/实时暂停快照初始化为宿主状态；继续操作仍通过onSettingsChange和onCurveChange更新。仅正常实时生产不向源码面板每帧推送快照；用户暂停或手动追加时捕获当前有界点集与冻结时钟。悬停、日历滚动位置和地图视角是临时阅读状态，不写入数据配置。暂停后的实时Tooltip由鼠标事件读取静态窗口，不恢复RAF。

## 分类坐标、缺测与分轴组合 · P3

`LineChart`、`AreaChart`、`ComposedChart`默认仍按时间绘图。显式`xMode="category"`使用稳定非空字符串ID与输入顺序；`xLabel(datum)`负责文案，同名不同ID保留。分类定位独立于时间scale，不解析假日期，不降采样类别。分类不支持时间Brush/Projection、日期标记/ReferenceArea、LiveXAxis以及其它时间专属图形；这些组合明确报错。普通Grid、XAxis、YAxis、Line/Area/SeriesBar、PatternArea、终端标记、Tooltip支持分类定位。

`null`/缺失字段表示缺测，Line/Area与PatternArea的静态和动画路径保留断口；0有效。NaN/Infinity拒绝。纯缺测系列不绘制假0线，markers和默认提示不生成假0点；准确状态由宿主的等价读数表达。缺测时间序列保留完整数据以避免降采样跨缺口。更新与中断重排沿当前几何、稳定ID接续。

```tsx
const rows = [{ id: "spring", label: "春学期", count: 40, rate: 40 },
  { id: "autumn", label: "秋学期", count: 60, rate: null }];
<div className="rain-chart" data-recipe="monochrome-blue">
  <ComposedChart data={rows} xMode="category" xDataKey="id"
    xLabel={datum => String(datum.label)} yDomains={{ right: [0, 100] }}>
    <SeriesBar dataKey="count" yAxisId="left" fill="var(--chart-1)" />
    <Line dataKey="rate" yAxisId="right" stroke="var(--chart-2)" />
    <XAxis /><YAxis /><YAxis yAxisId="right" orientation="right" formatValue={value => `${value}%`} />
    <ChartTooltip />
  </ComposedChart>
</div>
```

`yDomains`首版仅对Composed公开，格式为`{axisId:[0,upper]}`，upper有限且为正；固定域不加留白、不nice。超域读数由宿主保留并解释；共享几何不会偷偷clamp。自动域仍兼容；堆叠总量按轴计算，同组SeriesBar必须同轴。SeriesBar图形和提示的分组中心、堆叠段顶部使用同一几何，分项读数不变成累计高度。

六个Mock业务配方在`/#chart-category`，真实实现与周期slot对齐见`apps/playground/src/docs/components/chart-business/category-examples.tsx`和`comparison-data.ts`。周期口径留宿主：按相对天序/星期/教学周自行提供slotId，保留每期真实日期，不同长度尾部为null。下载仅含分类图形、fixture与CSS，不依赖Playground私有运行时或世界geometry。当前为registry-candidate/unpublished，视觉与硬件覆盖见`evidence/runtime/chart-business-expansion/p3/verification.md`；P4/P5未由本批完成推导。
