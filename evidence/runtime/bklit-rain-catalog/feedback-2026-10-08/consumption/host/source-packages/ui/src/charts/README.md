# Rain 图表候选库

保留 Bklit 的 Compound API、图形结构、默认动效和交互，通过独立样式接入 Rain 配色、字体、辅助文字层级与留白。17 个入口共享这一份源码；`@rain-next/ui` 主入口不转导出图表。

当前身份为 `registry-candidate`，本地 Registry 未发布。技术检查与最终视觉审阅分别记录，最新状态见[本任务 phase](../../../../status/current-phase.yaml)、[逐图 Manifest](../../../../manifests/ui/chart-area.yaml)和[来源核对记录](../../../../evidence/runtime/bklit-rain-catalog/p0/source-audit.md)。最终全目录视觉 Gate 为 `awaiting-user-review`；已认可的四样本基础不自动扩为 17 图验收。

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

样式已包含作用域内的原生 utility 闭包，消费者不需要扫描 vendor 或加载 Bklit 的全局 reset。只用图表时无需导入整个 `@rain-next/ui/styles.css`；同时使用其他 Rain 组件时按各自合同加载其样式。

## 图型与数据合同

| ID / 公共入口 | 数据与语义 | 组合 Parts 与边界 |
| --- | --- | --- |
| area / `AreaChart` | 有序 `Date` 行与同量纲有限数值；透明叠加面积 | `Area`、`Grid`、`XAxis`、`YAxis`、`ChartTooltip`；不自动等于堆叠 |
| line / `LineChart` | 有序 `Date` 行与有限数值 | `Line`、坐标、提示；缺测插值和固定提示未纳入首版 |
| bar / `BarChart` | 唯一类别键 `xDataKey` 与非负有限值 | `Bar`、`BarXAxis`、`BarYAxis`；分组或互斥类别堆叠，原生以 0 为下界 |
| composed / `ComposedChart` | 同一日期行的多个系列；人数与 0—100 比率分别读轴 | `Area`、`SeriesBar`、`Line yAxisId="right"`、双 `YAxis`；完成率分母为参与人数 |
| pie / `PieChart` | `PieData[] = {label,value,color?}`；互斥类别的非负构成 | `PieSlice`、`PieCenter`；`innerRadius` 表达环饼，零总量不造占比 |
| ring / `RingChart` | `RingData[] = {label,value,maxValue,color?}`，`0≤value≤maxValue`、`maxValue>0` | `Ring`、`RingCenter`；每环独立分母，不将所有目标求总量 |
| radar / `RadarChart` | `metrics: {key,label}[]`、系列 `{label,values,color?}`；每维归一到 0—100 | `RadarGrid`、`RadarAxis`、`RadarArea`、`RadarLabels`；量纲转换由宿主说明 |
| scatter / `ScatterChart` | 有序 `Date`、非负 Y；同一时刻多个系列 | `Scatter`、坐标、提示；当前为时间散点，不提供任意 XY 或负 Y |
| funnel / `FunnelChart` | `FunnelStage[] = {label,value,color?,gradient?}`；固定阶段、非负值 | 原生标签和光感层；示例百分比相对第一阶段，阶段增长不直接是流失 |
| gauge / `Gauge` | `value: 0—100`；业务量程先归一 | 原生弧形或线形刻度、中心读数、激活渐变与底轨；任意量程/告警未实现 |
| sankey / `SankeyChart` | `{nodes:[{name,...}],links:[{source:number,target:number,value:number}]}`；索引引用有效节点、非负权重 | `SankeyNode`、`SankeyLink`、`SankeyTooltip`；宿主维持 ID 到索引映射和节点配色，不当作关系网络 |
| sunburst / `SunburstChart` | `SunburstNode = {name,value?,children?,color?}`；父值来自叶项求和 | `buildArcs`、`SunburstSegment`、`SunburstLabels`、`SunburstCenter`、面包屑/提示；父项不重复记账 |
| heatmap / `HeatmapChart` | `HeatmapColumn[] = {bin,bins:[{bin,date:Date,count}]}`；每列 7 天，与 `weekStartDay` 对齐 | `HeatmapCells`、坐标、图例、提示；0 有效，-1 为缺测，本版按日历验证 |
| choropleth / `ChoroplethChart` | GeoJSON `FeatureCollection`；稳定地区 ID 与值关联、缺值单独表示 | `ChoroplethFeatureComponent`、`ChoroplethTooltip`；地图几何由宿主提供，示例是自创示意区域 |
| candlestick / `CandlestickChart` | `OHLCDataPoint[] = {date:Date,open,high,low,close}`；`low≤min(open,close)`、`high≥max(open,close)` | `Candlestick`、坐标、提示；颜色指开收方向，平盘与业务好坏分别判断 |
| profit-loss / `ProfitLossLine` | 有序 `Date` 与有限正负值；0 为基准 | 与 `LineChart` 和同 dataKey 的 `Line` 配合注册值域，再绘制 `ProfitLossLine`，不能单独挂在普通 div |
| live-line / `LiveLineChart` | `LiveLinePoint[] = {time: Unix秒,value}`、`value` 为最新值；时间单调递增 | `LiveLine`、`LiveXAxis`、`LiveYAxis`、提示；生产者、暂停、有界缓冲及卸载清理由宿主拥有 |

具体调用和交互示例见[唯一示例实现](../../../../apps/playground/src/docs/components/chart-examples.tsx)与[示例数据/校验](../../../../apps/playground/src/docs/components/chart-data.ts)。组件目录路由为 `/#chart-<id>`；独立原型目录为 `/bklit-catalog.html`，保留 `/bklit-validation.html` 原生/Rain 对照和 `/chart-validation.html` G2 实验。

## 组合报告的轴与分母

组合图的原生柱使用 `SeriesBar`，分类柱图使用 `Bar`。比率绑定右轴，人数绑定左轴；`rate` 在数据层计算为 `completed / enrolled * 100`。有任一参与人数为 0 时，需显式处理该日期的“不适用”；当前示例全零时移除比率曲线，混合缺测场景停止绘制而非自动连线。

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

## 配色与可选配方

`rainChartRecipes` / `RainChartRecipe` 是具名配方元信息。`data-recipe` 选择本地图表色组；几何、渐变 `<defs>`、透明度、圆角和原生 Parts 仍由调用代码提供，元信息不会自动变成另一个图形。当前[配方源](recipes.ts)与示例调用一起构成合同。

| 配方 ID | 适用图型与颜色规则 | 原生配置 / 来源 |
| --- | --- | --- |
| trend-soft | 面积、折线、漏斗、仪表、实时折线；单一趋势主色 | 清晰描边 + 轻面积，面积示例 .24，迷你 .2；P03。漏斗/仪表使用各自原生渐变 |
| category-near | 类别/系列图、桑基；蓝紫近邻 5 色 | `#5074ff #895aff #8a7cfc #509cff #30b3ff`；P01/P03 的色组提炼 |
| category-wide | 类别/系列图、桑基；5 类之间加大色差 | `#236eff #675fff #01adc3 #ff6cc4 #f57e58`；参考样本色组 |
| category-solid | 类别/系列图、漏斗；协调实色 | `#4661fe #8848ff #37b5ce #658cff #bfa5ff`；P04 |
| bar-gradient | 分类柱图；每系列同色从浓到浅 | 原生 fill 引用唯一 SVG gradient，顶到底，opacity .95→.4；P01 |
| bar-fade | 分类柱图；圆头渐隐柱 | 原生 `lineCap="round"` + 同色顶到底 opacity 1→0；P02。短柱须保留基线与精确值 |
| intensity | 日历热图、分区地图；数值强弱 5 级 | `--chart-scale-01…05`：`#f5f4ff #dfe1ff #a1a9ff #7c7dfd #4a31d1`；P05。有效 0 用最浅色，缺值用 `--chart-no-data` |
| flow | 桑基；节点身份稳定、来源到目标过渡 | 原生连线双色渐变；路径宽度表达权重，聚焦保持来源/目标颜色；P07 |
| sign | K线、盈亏线、实时折线动量 | 非负/上涨 `--chart-positive`，负值/下跌 `--chart-negative`，平态 `--chart-neutral`；绿色 `#30a87b`、红色 `#ed6b70` 为局部配方，不默认表示好/坏 |

并非每个 ID 适用于每个图型，逐图候选见 Manifest 与目录。P06 只继承原生仪表/环的可配置渐变及底轨，未重画参考弧形；P08 柔光关系网络作为缺口保留。96×40 迷你趋势是面积/折线尺寸配方，不增加图型身份。

颜色按稳定 series/node/region 身份绑定，不能在筛选或排序后用当前下标重新派色。默认提供 5 个类别角色；更多类别需要标签、线型或新的可审阅局部配方，不循环少量颜色冒充无限可辨。

## Rain 共同规则与动效

- 辅助坐标、日期和图例使用 `Text/Neutral/5`，桑基节点与漏斗人数使用 `Text/Neutral/4`，Regular 400。图例和通用小号标签为 13px，图例列间距 24px、行间距 8px；原生更小的坐标和扇区文字保留。旭日扇区标签使用 `OnColor/1` 反白文字，不添加描边。主读数/提示的精确值保持清楚；不整体降低图表 opacity。
- 仪表主读数为 24px，弧形读数对齐几何中心，线形标题保留实际宽度、距刻度 8px。互斥堆叠柱的纵轴、柱段与提示共用累计值域，不能按单个系列最大值缩放。
- 表面、网格、提示、指示器、Marker/Badge、局部高亮和未激活底轨映射现有 Rain Token。数据类别色、强度色和正负色是 `.rain-chart` 内具名 Local Recipe，不修改品牌蓝或新增全局 Token。
- 正式 UI 文字与普通数字使用 PingFang SC 角色；关键中心数值遵从 Rain 数据字体职责，中文单位保留 UI 字体。字体文件不随图表 Registry 分发。
- 保留默认原生展示强度。减少动效时保留最终读数，示例关闭入场、位移及实时自动生产者；`useReducedMotion` 已由共享运动辅助函数处理弹簧跟随。完整消费须同时检查原生组件和宿主生产者，不能仅设置一次 `MotionConfig`。

## 数据状态、可访问性与消费责任

宿主在信任边界校验日期、有限数值、量程、引用关系和业务分母；原生 Parts 不是通用数据校验器。空数据以具名状态呈现，无效数据拒绝绘制，0 与缺测分别保留。当前示例仅日历热图/地图显示已定义缺测，其他缺测停止绘图并说明原因；不隐式补零。饼、漏斗、桑基、旭日总量为 0 时提供说明和零值表，不生成误导比例。

每图提供清楚的标题、单位、读数解释和可访问精确数据表。图例可由 `ChartLegend.renderItem` 渲染为可聚焦按钮，把 focus/blur 接入受控 hover；默认图形悬停不代表所有数据点已具备键盘导航。颜色之外保留标签、正负号、位置/形状或文本状态。触屏依靠精确表与显式控件，不依赖只在 hover 出现的值。真实读屏、物理触屏、完整对比度验收和完整深色主题分别未授权为通过。

实时示例只模拟数据：1 秒追加一次、60 秒窗口、最多 120 点；暂停/减少动效改为手动追加，切换和卸载清理定时器。Native `paused` 冻结图表时钟，手动追加后需同步时钟基准；生产接入需明确自己的订阅、窗口及销毁责任。

## 来源、Registry 与升级

- 固定源码：`bklit/bklit-ui@5d699897b2dde26374cf15501dbaadbc52cea982`，保留[MIT LICENSE](vendor/LICENSE)、[逐文件源码锁](vendor/source-lock.json)及相对导入调整记录。
- 本地补丁以源码锁的 `change` 和验证记录为准：必要的轴距、多实例 ID、减少动效及尺寸守卫，不改为另一套引擎或统一数据适配层。
- [本地 Registry](../../../../registry/charts.json) 的 `shared.files + items[].files` 提供完整源码/样式闭包；React、React DOM、Foundations、实际 npm/类型依赖分别登记。直接版本固定，传递依赖由工作区锁文件复现；不把 alpha 依赖写成稳定版本。
- 示意地图几何在 `chart-data.ts` 中自行编写，没有第三方行政边界资产，无法用于真实地域判断；真实地图的数据来源和使用许可由消费者核实。
- 升级固定 commit 后比较上游与本地补丁、更新哈希及依赖，再验证受影响图型、样式隔离和独立消费。候选 API 可变化；SSR、通用分类矩阵、关系网络、生产数据服务和在线分发另按实际需求处理。

按业务问题选图见[AI 图表使用指南](../../../../docs/ai/charts.md)。完整 API 以[显式导出](index.ts)和各 native Props 类型为准；示例页面和模拟数据不是 UI 包依赖。
