import type { RainChartRecipe } from "@rain-next/ui/charts";
export type ChartId = "area" | "line" | "bar" | "composed" | "pie" | "ring" | "radar" | "scatter" | "funnel" | "gauge" | "sankey" | "sunburst" | "heatmap" | "choropleth" | "candlestick" | "profit-loss" | "live-line" | "matrix" | "network";
export type ChartRecipe = RainChartRecipe;
type Entry = { id: ChartId; label: string; phase: "P1" | "P2" | "P3" | "P4"; summary: string; dataContract: string; limitation: string; recipes: ChartRecipe[]; defaultRecipe: ChartRecipe; sourcePath: string; origin: "bklit"|"rain" };
const categories: ChartRecipe[] = ["category-near", "category-wide", "category-solid", "monochrome-blue"];
const entries: Omit<Entry,"sourcePath"|"origin">[] = [
  { id: "area", label: "面积图", phase: "P1", summary: "时间趋势、轻渐变面积与原生聚焦。", dataContract: "按日期排序；各系列同量纲。本例为人数，透明叠加而非堆叠。", limitation: "缺测不能默认补零；迷你图是尺寸配方。", recipes: ["trend-soft", ...categories], defaultRecipe: "trend-soft" },
  { id: "line", label: "折线图", phase: "P1", summary: "连续趋势与多系列比较，保留真实端点。", dataContract: "Date日期与有限数值；本例按日记录人数。", limitation: "本例不宣称缺口插值、点击固定或图例隐藏。", recipes: ["trend-soft", ...categories], defaultRecipe: "category-near" },
  { id: "bar", label: "柱状图", phase: "P1", summary: "分组比较、互斥堆叠、同色渐变与圆头渐隐柱。", dataContract: "类别键唯一；分组人数不可相加，堆叠改用互斥等级人数。", limitation: "原生柱坐标以0为下界，本例拒绝负值。", recipes: [...categories, "bar-gradient", "bar-fade"], defaultRecipe: "category-near" },
  { id: "composed", label: "组合图", phase: "P1", summary: "面积、柱与线共享日期，人数和比率分别读取。", dataContract: "完成率=完成人数/参与人数；左轴人，右轴%。", limitation: "0参与时比率不适用，移除比率曲线而非显示0%。", recipes: categories, defaultRecipe: "category-near" },
  { id: "pie", label: "饼图 / 环饼", phase: "P2", summary: "类别构成与原生扇区聚焦，支持环饼形态。", dataContract: "互斥类别非负值，分母为所有类别总量。", limitation: "零总量不生成占比；较多小扇区需精确表辅助。", recipes: categories, defaultRecipe: "category-near" },
  { id: "ring", label: "多目标进度环", phase: "P2", summary: "每一环展示一个独立目标的达成进度。", dataContract: "每项value/maxValue，0≤value≤maxValue且maxValue>0。", limitation: "各项目标独立，不相加成总数；构成环饼属于饼图。", recipes: categories, defaultRecipe: "category-near" },
  { id: "radar", label: "雷达图", phase: "P2", summary: "同尺度维度的多系列能力比较。", dataContract: "指标顺序固定，原生数据归一到0—100。", limitation: "不同量纲必须先说明归一方式；本例为示例分数。", recipes: categories, defaultRecipe: "category-near" },
  { id: "scatter", label: "时间散点", phase: "P2", summary: "时间轴上的多系列观测值与点聚焦。", dataContract: "X为Date，Y为非负值；本例记录每天人数。", limitation: "当前不是任意XY散点，不支持负Y；同一时间的多值以系列表达。", recipes: categories, defaultRecipe: "category-near" },
  { id: "funnel", label: "漏斗图", phase: "P2", summary: "学习路径的阶段人数、层叠光感与原生悬停。", dataContract: "顺序固定且数值非负；阶段百分比以入口人数为分母。", limitation: "阶段增长不能直接解释为流失率；零入口不显示无意义比例。", recipes: ["trend-soft", "category-near", "category-solid", "monochrome-blue"], defaultRecipe: "trend-soft" },
  { id: "gauge", label: "仪表图", phase: "P2", summary: "单项达成率的弧形或线形刻度表达。", dataContract: "value限定0—100；业务量程需先归一，中心显示同一比率。", limitation: "本例不提供任意量程或阈值告警的语义。", recipes: ["trend-soft", "monochrome-blue"], defaultRecipe: "trend-soft" },
  { id: "sankey", label: "桑基图", phase: "P3", summary: "稳定节点身份、双色流向渐变和路径聚焦。", dataContract: "source/target引用有效节点，权重非负；本例中间节点守恒。", limitation: "显示的是人次流向，不等于去重人数。", recipes: ["flow", "category-near", "category-wide", "monochrome-blue"], defaultRecipe: "flow" },
  { id: "sunburst", label: "旭日图", phase: "P3", summary: "课程内容层级、扇区聚焦与逐层下钻。", dataContract: "父项由叶项求和，父项不重复提供value。", limitation: "小扇区和深层数据通过提示及精确表补充读取。", recipes: categories, defaultRecipe: "category-near" },
  { id: "heatmap", label: "日历热图", phase: "P3", summary: "每一天的学习强度、顺序色阶与单元格聚焦。", dataContract: "每列一个周日开始的星期，7个日期；0为有效读数，-1为缺测。", limitation: "原生是日历，不是任意分类矩阵。", recipes: ["intensity", "monochrome-blue"], defaultRecipe: "intensity" },
  { id: "choropleth", label: "分区地图", phase: "P3", summary: "地区值映射顺序色，区分低值与无数据。", dataContract: "GeoJSON地区id唯一，值按id关联；本例使用177个世界地区的Natural Earth几何，数值为示例数据。", limitation: "示例数值不代表实际统计；世界几何来自固定参考资产，默认视图不展示缩放。", recipes: ["intensity", "monochrome-blue"], defaultRecipe: "intensity" },
  { id: "candlestick", label: "K线图", phase: "P4", summary: "开高低收、涨跌方向与原生烛形交互。", dataContract: "low≤min(open,close)，high≥max(open,close)，日期有序。", limitation: "上涨、下跌、平盘只表示方向，不直接表示业务好坏。", recipes: ["sign"], defaultRecipe: "sign" },
  { id: "profit-loss", label: "盈亏线", phase: "P4", summary: "零线两侧的正负值、连续过零与分段渐变。", dataContract: "时间顺序与有限正负值；本例为相对基准的变化量。", limitation: "正负颜色与涨跌颜色保持各自语义，不泛化成成功或错误。", recipes: ["sign"], defaultRecipe: "sign" },
  { id: "live-line", label: "实时折线", phase: "P4", summary: "有界数据更新、实时读数、暂停恢复与原生光点。", dataContract: "time为Unix秒且单调递增；缓冲≤120条，窗口60秒。", limitation: "本例使用本地模拟生产者；减少动效时改为手动追加。", recipes: ["trend-soft", "sign", "monochrome-blue"], defaultRecipe: "trend-soft" },
  { id: "matrix", label: "分类矩阵", phase: "P3", summary: "任意分类行列的热度、数量气泡与离散支撑等级。", dataContract: "稳定rowId/columnId、唯一坐标；0、缺测与不适用分开，气泡面积正比于数量。", limitation: "独立分类矩阵，不复用日历合同；已验证12×12与7×24，较大范围先测量。", recipes: ["intensity", "monochrome-blue"], defaultRecipe: "intensity" },
  { id: "network", label: "网络关系图", phase: "P4", summary: "节点类别、关系线型、有向连接与邻接详情。", dataContract: "节点和边ID唯一；端点有效；坐标成对提供，类别和关系分别配置。", limitation: "四组样本各8节点、至多11条边；更密关系需另行验证，保留可操作列表与精确表。位置不表示相关度。", recipes: ["monochrome-blue", "category-near", "category-wide"], defaultRecipe: "monochrome-blue" },
];

const sourcePaths: Record<ChartId,string> = {
  "area": "packages/ui/src/charts/vendor/charts/area-chart.tsx",
  "line": "packages/ui/src/charts/vendor/charts/line-chart.tsx",
  "bar": "packages/ui/src/charts/vendor/charts/bar-chart.tsx",
  "composed": "packages/ui/src/charts/vendor/charts/composed-chart.tsx",
  "pie": "packages/ui/src/charts/vendor/charts/pie-chart.tsx",
  "ring": "packages/ui/src/charts/vendor/charts/ring-chart.tsx",
  "radar": "packages/ui/src/charts/vendor/charts/radar-chart.tsx",
  "scatter": "packages/ui/src/charts/vendor/charts/scatter-chart.tsx",
  "funnel": "packages/ui/src/charts/vendor/charts/funnel-chart.tsx",
  "gauge": "packages/ui/src/charts/vendor/charts/gauge.tsx",
  "sankey": "packages/ui/src/charts/vendor/charts/sankey/sankey-chart.tsx",
  "sunburst": "packages/ui/src/charts/vendor/charts/sunburst-chart.tsx",
  "heatmap": "packages/ui/src/charts/vendor/charts/heatmap/heatmap-chart.tsx",
  "choropleth": "packages/ui/src/charts/vendor/charts/choropleth/choropleth-chart.tsx",
  "candlestick": "packages/ui/src/charts/vendor/charts/candlestick-chart.tsx",
  "profit-loss": "packages/ui/src/charts/vendor/charts/profit-loss-line.tsx",
  "live-line": "packages/ui/src/charts/vendor/charts/live-line-chart.tsx",
  "matrix": "packages/ui/src/charts/matrix/matrix-chart.tsx",
  "network": "packages/ui/src/charts/network/network-chart.tsx"
};
export const CHART_ENTRIES: Entry[] = entries.map(entry => ({...entry, sourcePath:sourcePaths[entry.id], origin:["matrix", "network"].includes(entry.id) ? "rain" : "bklit"}));
