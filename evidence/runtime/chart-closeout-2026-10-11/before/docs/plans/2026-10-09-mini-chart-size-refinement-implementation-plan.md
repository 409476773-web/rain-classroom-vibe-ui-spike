# Rain 迷你图表双尺寸与图文排版改造 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> Codex 可按相同任务顺序执行。本文是实施方案：2026-10-09 本轮只新增方案与对照材料，不修改运行代码，不把方案确认写成实施或视觉验收通过。

> **执行记录：** 用户后续明确要求“按照方案开始实施”，已于2026-10-09在指定worktree启动T00—T11。当前技术与视觉状态见 `status/current-phase.yaml#chartBusinessExpansion.miniSizeRefinement` 及 `evidence/runtime/chart-mini-refinement/`；上面的“仅文档”描述保留为方案撰写时的历史边界。

**Goal:** 为现有迷你图表建立紧凑、舒展两档尺寸及一致的图文组合规则，修正有效图形比例、数据尺度、文字基线、信息分组和状态占位，并贯通业务页、图表库、原型目录及源码下载。

**Architecture:** 两档由现有业务配方选择，继续复用 Rain / Bklit 的 Bar、Line、Area、Pie、Ring 和 DataBar。新增一个局部尺寸事实源；数据口径留在现有数据模块，文字与布局由宿主拥有。默认不修改公共引擎、全局 Table / Card 或 Foundations，不新建万能 MiniChart。

**Tech Stack:** 现有 React、TypeScript、Motion、visx / D3、Rain UI / Foundations、Vitest、Playwright、pnpm workspace；不新增依赖。

---

## 1. 任务边界与确认记录

### 1.1 已确认设计

本次会话已依次确认：

1. 同一套迷你图表提供“紧凑 / compact”和“舒展 / comfortable”两档；由表格、指标卡等宿主选择，不拆成两套图表。
2. 表格默认紧凑，指标卡默认舒展；列表按阅读密度选型。
3. 紧凑档外置读数；舒展进度弧使用中心百分比与短说明。
4. 尺寸覆盖绘图区、线宽、柱宽与间隔、环带厚度、图文间距，不使用整体 CSS 缩放。
5. 数据含义、颜色身份、量程规则和交互能力不随档位变化。
6. 用户要求先分析讨论、不动代码；当前请求是“写出完整的改造实施方案”。本次不恢复此前中断的开发。

第 3 节数值是已确认的打样基准，尚不是经新画面验证的最终最小可读尺寸。描边、中心字级、对齐校正和宿主行高等补充数值，明确作为实施起点，在同一套方案内以真实渲染调整。

### 1.2 与既有计划的关系

本方案细化并更新[业务图表扩展计划](2026-10-08-chart-business-expansion-implementation-plan.md) P1 的迷你图表尺寸和宿主组合规则。旧 P1 中 96×40、小饼40、进度48等单档示例，以本方案替代；数据真实性、连续动效、源码下载和发布边界继续有效。

本次不推进 P2 矩阵、P3 分类坐标、P4 网络、P5 地图。现有矩阵和原有17类 / 170官网变体保留，不为了迷你图表改造改写其身份或完成状态。

**唯一工作目录：**

```text
/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2
```

下文文件路径均相对此目录。既有未提交及未跟踪文件是当前开发基线，不按 Git HEAD 还原，不清理其他任务修改。

### 1.3 实施身份与授权

- 本轮：仅文档方案。
- 后续业务配方实现：页面局部配方 / local-experiment；复用既有共享候选。
- 若确需修改共享组件、Registry、Manifest、生成器：按 System Mode 处理，逐项列明必要性和回归范围。
- Git commit / push / PR、Figma 写入、发布、正式业务采用不包含在本方案中。
- 设计规则确认、自动检查通过、视觉验收和发布授权分别记录。不得自动关闭 Human Gate。

## 2. 现状、证据与改造目标

### 2.1 对照来源

Figma 文件：`MbWg1ft5zk1JRQiQ6dS30e`。分类页：`2901:130074`。

| 来源 | 已核对的关系 | 本次保留 |
| --- | --- | --- |
| [CH-127 原指标卡](https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e/?node-id=2886-113088) | 约379×140；左侧26px主数字，右下80×40微柱 | 主数字与辅助图分工，标题、说明有固定位置 |
| [CH-109 原考试行](https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e/?node-id=2886-96888) | 弧槽80×60，底部开口；中心双行读数，旁侧具名状态 | 进度图与完成数据组成紧凑信息组 |
| [CH-120 排名](https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e/?node-id=2905-50930) | 固定文字区、52×8条形、右对齐数值区 | 条与数字拥有稳定的列，不随数字位数移动 |
| [CH-138 相对位置](https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e/?node-id=2905-51839) | 165×8轨道，文字同排，规律行距 | 细条与读数同行，保留指标的真实分母 |
| 本地标准饼 / 环、折线图 | 标准尺寸具有明确读数、图例、绘图区与原生动效 | 保留部件及运动品质，重新组织小尺寸文字 |

原稿中的部分填充长度 / 扫角与文字百分比并不一致。它们用于构图参考，不能作为数据计算结果复制。

以下图片来自本次会话上一轮实际视觉审阅，保留为改造前对照；并非2026-10-09重新采集的验证证据：

- [当前独立小图与指标卡](assets/2026-10-09-mini-chart/before-gallery-cards.jpg)
- [当前表格与列表](assets/2026-10-09-mini-chart/before-table-list.jpg)
- [原指标卡](assets/2026-10-09-mini-chart/reference-metric-card.png)
- [原考试行](assets/2026-10-09-mini-chart/reference-exam-row.png)

### 2.2 必须解决的问题

| 编号 | 当前问题 | 目标 |
| --- | --- | --- |
| F01 | 小柱96×40，但首行最高22配上限100，实际只有约8px；折线按自身数据展开约30px | 每种指标使用正确量程；比较组共域，避免把外框尺寸当有效图形高度 |
| F02 | 40px、48px图形决定卡片数字行高，主数字相差约4px | 主数字基线由宿主固定，图形独立定位 |
| F03 | 独立图整体居中导致说明基线相差约14px | 图形区与说明区分别对齐 |
| F04 | 表格数字上下组合与左右组合混用，主读数字号12 / 14混杂 | 主读数统一层级，数量条与数值同排、数值右对齐 |
| F05 | 完成弧缺口朝右，形成C形 | 底部对称开口；中心百分比使用真实分母 |
| F06 | 列表完成文字与最右侧环图分离，中间穿插评分 | 完成组、评分组各自完整，再跨行对齐 |
| F07 | 缺测 early return 和离屏占位脱离实际图形尺寸 | 正常、异常、离屏使用相同逻辑槽 |
| F08 | 业务 Mini 与图表库旧 Line / Area Mini 分别硬编码尺寸 | 共用尺寸事实源，保留旧路径的日期、提示、重播和单点能力 |
| F09 | 尺寸选择可能仅改变预览，下载不一致 | 预览、调用代码、下载和独立消费一致 |

源码核对另发现：单图下载目前未接收已有的3 / 5系列选择，且文件清单内嵌在React组件中。T07会补齐这两个直接影响下载一致性的缺口；不把它们扩大成新的导出系统。

适用设计方法：V01 稳定颜色、V02 共同结构、V04 数字与单位、V05 外观和行为一起检查、D02 信息分组、D05 容器与状态、I02 真实图形与精确读数。来源为 `docs/ai/information-design.md`。这些应用记录只属于本方案，不自动晋升全库默认。

## 3. 双尺寸规格

### 3.1 三层尺寸合同

分清三件事：

1. **逻辑槽**：宿主预留的宽高；正常、缺测和离屏占位一致。
2. **可见图形**：路径、描边、圆头及必要运动所占范围；单独测量。
3. **文字区域**：数字、单位、标题和说明的字号 / 行高 / 对齐；不参与图形缩放。

| 图形 | compact逻辑槽 | comfortable逻辑槽 | 初始细节 |
| --- | --- | --- | --- |
| 折线 / 面积 / 柱 | 96×32 | 128×48 | 图内上下安全留白2 / 3；线宽1.5 / 2 |
| 饼 / 环饼 | 32×32 | 56×56 | hoverOffset先用1；环饼内半径10 / 19，保留外扩安全区 |
| 完整进度环 | 32×32 | 64×64 | 环带3 / 5；完整环从12点方向顺时针 |
| 底部开口进度弧 | 40×30 | 72×54 | 保持圆形几何；225°轨道，底部135°开口 |
| 数量条 / 分段条 | 轨道厚6 | 轨道厚8 | 默认比较长度120 / 160，可随宿主调整；同列长度一致 |
| 图与外置读数 | 间距8 | 间距12，复杂分组可16 | 数值区保持稳定，不能由 space-between 任意拉开 |

条形6 / 8指可见轨道厚度，不要求底层 BarChart 画布也只有6 / 8px。当前 BarChart 在画布高小于10时不渲染；分段条保留10 / 12px画布和上下2px留白即可，不为本配方修改引擎阈值。

柱宽由实际数据项数量与可用宽度计算，先沿用现有间隔比例；不能把固定8根柱的像素宽度写成所有数据的合同。柱从真实0基线开始，不设置会伪造零值的小柱最小高度。

完整环先保留两档padding2，显式baseInnerRadius为11 / 25、strokeWidth为3 / 5，对应外半径14 / 30；不能让默认内半径触发比例缩放后把环带意外变细。最终留白同样接受hover边界验证。

### 3.2 文字与宿主起点

| 内容 | 起点 |
| --- | --- |
| 表格名称、主数量、百分比 | 14px / 22px，普通字重；主要数字用既有Data字体，等宽数字 |
| 表头 | 保留既有13px / 18px合同 |
| 中文单位、辅助说明 | 12px / 18—20px，UI字体；精确读数不能采用不可辨识的弱色 |
| 指标卡标题 | 既有16px / 24px |
| 卡片外置主数字 | 保留28px / 36px，单位单独按基线对齐 |
| 舒展进度弧中心百分比 | 初始18px / 22px；短说明12px / 16px |
| 舒展完整环中心内容 | 如需两行，先用16px / 20px＋12px / 16px，按实际内区验收 |
| 紧凑圆图 | 不放中心双行文字；图外保留具名读数 |

中心说明使用“完成率”等短标签；长业务标题放外面。不使用自动缩字、CSS scale、截断百分比来掩盖空间不足。中心初始支持整数百分比0—100，额外小数仅按业务格式明确加入，不能无意扩展当前格式。

同排卡片先确定进度中心读数的真实文字基线，再让其他主数字对齐该基线；不同字号允许有不同字框高度。标题线、说明起点和主要信息区保持一致。以真实字体测量，不能把 DOM 字框底边直接当文字基线。

文字单独放大后若中心两行超出环内可用区域，同一读数改为外置、进入正常文档流，宿主允许增高 / 换行，图槽保持原尺寸。采用局部实际文字尺寸检测或已有等价机制；不缩字、不隐藏、不重复朗读。这是可读性退让，不增加第三档图形尺寸。

### 3.3 弧形几何方案

首选业务层短占位，复用当前正方形 RingChart：

- 外层逻辑槽40×30 / 72×54，内层正方形画布40×40 / 72×72，显式定位，不允许 flex-shrink。
- compact先用padding2；comfortable弧先用padding4。显式同时设置baseInnerRadius为15 / 28、strokeWidth为3 / 4，才能在现有RingChart自动缩放规则下得到外半径18 / 32和预期的实际环带。
- D3角度从12点起算；局部配方使用 `startAngle=-5π/8`、`endAngle=5π/8`，总扫角225°。
- 静态轨道的最大Y约为 `center + outerRadius × cos(67.5°)`，分别约26.9 / 48.3，小于30 / 54。
- 外层若裁短，只能裁到画布的空白部分。必须把现有 hover scale、弹簧过冲、入场、更新、圆头纳入边界测量；有可见路径裁切就不通过。
- 舒展文字由宿主HTML层叠加，锚到圆心附近；初始上移约2px，实际以文字与环内区的关系校正。不能把72×54矩形中心误当圆心。
- 不用 scaleY，不挤成椭圆，不改回 SVG foreignObject。当前 RingCenter 默认 `innerRadius*2-16`的文字空间可能过小，宿主简单HTML层即可，不为此先修改全库中心字号规则。
- 鼠标命中只应影响当前图槽；不得让隐藏的正方形空白区域覆盖后面的文字或操作。装饰图无额外Tab停靠点。

若在真实浏览器中局部方案无法保全边界、命中和动效，先缩小该配方的外半径 / 调整安全留白并复核。确需共享短视口API时，单列必要补丁及默认行为回归，不直接把预设方案扩大为全库改造。

百分比与路径唯一公式：

```ts
const fraction = value / maxValue; // 仅在有限、非负、maxValue > 0且value <= maxValue后执行
const progressEnd = startAngle + (endAngle - startAngle) * fraction;
const percentText = `${Math.round(fraction * 100)}%`;
```

禁止把原始完成数量直接加百分号；20 / 80必须读作25%，不能读作20%。

## 4. 数据、状态、交互合同

### 4.1 比较域

- 人数数量条沿用 `getComparisonMax(original)`。
- 每日柱图新增 `getTrendComparisonMax(original)`，从同一比较集合的全部每日数据求上限；先求域，再排序 / 筛选 / 扩展40行。
- 排序、筛选、尺寸切换不能重新归一化每一行。数据修订改变完整集合后，可以整体更新该比较域，并保留连续过渡。
- 折线 / 面积继续表达走势；现有自动域保留，附近说明其用于观察变化，不暗示各行线高可直接比较绝对人数。不在本任务补全新的公共固定域API。
- 评分用满分，完成率用目标，构成用互斥项总和，各自保持独立。
- 当前卡片“参与人数”示例数值与趋势最后一点不相同。实施时明确为“本期参与人数”与“近8天每日人数”，不要把它标成“最新人数”；不伪造末点来对齐主值。
- 全零集合对外上限仍是0；为绘图构造非退化域时内部备用上限1，不显示“上限1人”，不生成假高度。
- null保留缺测；NaN / Infinity / 负值无效。显式上限0却有正值为无效；超过正数上限为超域，不静默clamp。
- 页面及下载入口保留既有invalid提示分支；invalid输入在调用比较域helper之前分流，不能在呈现提示前因helper抛错而白屏。helper本身仍拒绝非法值，不靠吞错生成正常图。

计划加入现有 mini-data.ts 的最小算法：

```ts
export function getTrendComparisonMax(rows: Pick<MiniRow, "trend">[]): number {
  let max = 0;
  for (const row of rows) {
    for (const value of row.trend) {
      if (value === null) continue;
      if (!Number.isFinite(value) || value < 0) {
        throw new Error("每日数量必须是有限非负值或null");
      }
      max = Math.max(max, value);
    }
  }
  return max;
}
```

### 4.2 固定槽与状态

| 输入 | 图形 | 等价读数 |
| --- | --- | --- |
| 0，且分母有效 | 零长条 / 零柱 / 进度底轨 | 0或0% |
| 构成总和0 | 不生成扇区 | 零总量 |
| null / 构成不完整 | 保留同型号占位，不补0 | — / 缺测 |
| 目标为0 | 不生成完成率 | 未设目标或不适用，按所在业务说明 |
| 非法 / 超域 | 不绘制误导性正常图 | 无效数据 / 超出范围，保留精确原值时避免显示NaN |
| 整组无数据 | 宿主空状态 | 暂无数据 |
| 离屏尚未挂载 | 与实际kind、size一致的空槽 | 宿主正常读数仍保留 |

单图从正常变成0 / 缺测 / 无效时不得改变逻辑槽。整页空 / 无效属于业务页的总体状态，允许保留现有总体提示，不能把这一规则误解为必须生成空表格。

检查 ChartExample 顶层状态分支：当 `size="mini"`时不能直接落入320px级标准空态；保留相应迷你布局和必要状态文字。状态文字可放在图槽旁的读数区，不强塞进32px圆框。

离屏占位不能继续统一为96×40。保留现有 useInView / lastVisible 的优化；档位或比较域改变时，清除不相符的缓存或同时保存匹配的行数据 / 域 / 尺寸，重新进入视口时先同步最新数据，避免旧图配新值。

### 4.3 运动与可访问性

- 沿用当前650ms级局部节奏和原生插值；本任务不新建动画系统，也不通过关闭所有动效解决排版。
- 更新保留稳定ID及挂载节点；普通更新不从0重播，只有“重播动效”显式触发重播。
- Hover / focus不改变行高、卡片尺寸或文字位置；小饼不恢复光晕。环的运动最大外扩必须落在图槽内。
- Reduced Motion到稳定终态，保留数字与操作。
- 宿主已有完整文字读数时图形可装饰；中心文字若承担唯一读数，必须在可访问树中出现，不能被整体aria-hidden误隐藏。
- 独立小图保留图名、单位、量程口径和精确数据入口；保留旧Line / Area的真实日期Tooltip、单点marker和重播。
- 构成至少具名“已完成 / 进行中 / 待开始”，颜色与文字对应；不能仅列“13 / 8 / 4”。
- 主要数字不省略、不随位数缩字；长数字允许扩展读数列或宿主重排。表格可局部横向滚动；200%文字缩放时允许增高，不用固定行高裁字。

## 5. 最小实现结构与改动范围

### 5.1 新增一个局部实现文件

新增 `apps/playground/src/docs/components/chart-business/mini-layout.ts`，只放类型与显式常量：

```ts
export type MiniSize = "compact" | "comfortable";

export const MINI_LAYOUT = {
  compact: {
    plot: { width: 96, height: 32 },
    pie: { width: 32, height: 32 },
    ring: { width: 32, height: 32 },
    arc: { width: 40, height: 30 },
    bar: { width: 120, thickness: 6, canvasHeight: 10 },
    lineWidth: 1.5,
    readingGap: 8,
  },
  comfortable: {
    plot: { width: 128, height: 48 },
    pie: { width: 56, height: 56 },
    ring: { width: 64, height: 64 },
    arc: { width: 72, height: 54 },
    bar: { width: 160, thickness: 8, canvasHeight: 12 },
    lineWidth: 2,
    readingGap: 12,
  },
} as const;
```

必要的半径和中心文字常量可留在这个文件。它不是公共Token，不新增映射器 / 解析器 / 通用图型配置引擎。几何以此为事实源；CSS通过当前根节点的局部属性 / CSS变量使用，不再复制第二份尺寸表。

### 5.2 调用合同

- `MiniColumns / MiniSegments / MiniPie / MiniProgress / MiniTrend`增加 `size?: MiniSize`，默认compact。
- 内部可复用一个不对外导出的固定槽小部件，用于图形、状态与离屏占位；它只负责尺寸 / 属性，不按图型分派业务。
- `ChartExample.size`继续是 `"standard" | "mini"`；新增 `miniSize?: MiniSize`，仅在mini时生效。既有标准调用不改变。
- 业务页表格显式compact、指标卡显式comfortable；课程列表默认compact，另保留一个舒展进度业务组用于验证组合。
- 独立尺寸对照固定同时展示两档，不新增影响整个页面的全局尺寸开关。
- 图表库 / 原型目录在mini模式下展示“紧凑 / 舒展”选择，沿用已有控件体系。
- 单图调用代码与下载同时传入既有seriesCount；它只影响支持系列数的图型，不成为业务组合页的新设置。
- DataBar使用已有HTML style / className设置局部高度和宽度，不新增公共size属性，不改它的全局8px默认值。
- 根节点记录 `data-mini-kind`、`data-size`、`data-mini-state`。宿主已有data-rain-id和语义slot保留。

### 5.3 文件影响表

| 操作 | 文件 | 用途 |
| --- | --- | --- |
| 新增 | apps/playground/src/docs/components/chart-business/mini-layout.ts | 两档尺寸唯一事实源 |
| 修改 | apps/playground/src/docs/components/chart-business/mini-data.ts | 每日比较域、必要的进度读数共用校验 |
| 修改 | apps/playground/src/docs/components/chart-business/mini-examples.tsx | 各图型选档、固定槽、中心文字、双档展示 |
| 修改 | apps/playground/src/docs/components/chart-business/embedding-examples.tsx | 表格 / 卡片 / 列表组合、离屏占位 |
| 修改 | apps/playground/src/docs/components/chart-business/bar-examples.tsx | 排名和相对位置细条选档，保留标准条形语义 |
| 修改 | apps/playground/src/docs/components/chart-business/chart-business-page.tsx | 两种比较域传递、说明与展示组织 |
| 修改 | apps/playground/src/docs/components/chart-business/chart-business.css | 局部布局、文字锚点、状态及响应式 |
| 修改 | apps/playground/src/docs/components/chart-examples.tsx | 新miniSize贯通；旧趋势路径共用尺寸，保留行为 |
| 修改 | apps/playground/src/docs/components/chart-examples.css | 仅相关mini选择器 |
| 修改 | apps/playground/src/docs/components/chart-page.tsx | 预览、调用示例与尺寸选择一致 |
| 修改 | apps/prototype/src/scenarios/bklit-validation/catalog.tsx | 原型目录相同合同，含compare分支 |
| 修改 | apps/playground/src/docs/components/chart-example-source.tsx | 两个下载文件集合、类型和当前参数；提取单图文件函数供UI / 验证器共用 |
| 修改 | docs/ai/charts.md、packages/ui/src/charts/README.md | 使用规则与边界 |
| 修改 | manifests/ui/chart-bar.yaml、chart-line.yaml、chart-area.yaml、chart-pie.yaml、chart-ring.yaml | 记录局部两档配方，不能写成原生公共size枚举 |
| 按实际修改 | scripts/token-foundation-outputs.mjs | 若业务选择器 / 颜色使用发生变化，同步原有登记 |
| 后续执行时更新 | status/current-phase.yaml | 新增本次子记录，保留旧阶段状态及pending Human Gate |

默认不修改 `packages/ui/src/charts/index.ts`、`registry/charts.json`、vendor、全局Table / Card / Tokens。现有公共能力足够时它们保持不变；若实施中证明共享补丁不可避免，补齐source-lock、单项Registry闭包与相关回归后再纳入完成范围。

## 6. 分步任务

执行依赖：`T00 → T01 → T02 → T03 → T04 → T05 → T06 → T07 → T08 → T09 → T10 → T11`。共享文件串行编辑；只读审阅可并行。新增非平凡数据逻辑先写一个有效失败用例；纯样式变更以浏览器测量和视觉检查为主，不写只复述CSS常量的测试。

### T00：冻结本次起点与继承问题

**读取：** 第5节文件、相关AGENTS / SPIKE_BRIEF / status、现有测试和配方文档。  
**输出（执行时新增）：** `evidence/runtime/chart-mini-refinement/baseline.md`及源码摘要。

1. 核对实际worktree和当前服务来源，记录相关文件hash / Git状态；不生成全仓噪音清单。
2. 记录原17类、170官方映射与当前新增Matrix分别的数量。
3. 执行第7节的最小单测 / 类型检查，保存输出。
4. 当前 `scripts/charts.test.ts`仍有17入口断言，而实际已含Matrix18项，是既有P2基线不一致；不能归因于双尺寸，也不能回退Matrix让它通过。其他旧错误按本次实际结果登记，不沿用旧日志当新证据。
5. 在同一视口补采改造前实际页面；与本方案的历史截图分别标记。
6. 只针对影响本次实现的阻塞处理；不顺便恢复整个P2—P5或改全仓类型错误。

**完成条件：** 当前可运行范围、继承失败和本次触达范围清楚，后续能按起点比对，而非按HEAD归因。

### T01：尺寸事实源、读取约定与共用尺度

**新增：** mini-layout.ts。  
**修改 / 测试：** mini-data.ts、mini-data.test.ts。

1. 在mini-data.test.ts补每日域测试：多行、全零、全null、空集合、NaN / Infinity / 负数。
2. 用人数最大100而每日最大22的专用fixture证明每日域得到22；用多行每日数据证明仍按完整集合取共同最大值。
3. 运行目标测试，确认新增逻辑测试确实失败。
4. 加入第5节常量与第4节helper；必要的进度状态 / 读数函数就近放mini-data，不引入通用数据模型。
5. 测20 / 80 → 25%、0 / 80 → 0%、0 / 0 → 未设目标；超目标与非法值不产生正常百分比。
6. 在测试中证明排序 / 筛选 / 档位改变不改变原比较集合的尺度或稳定ID。

**命令：** `pnpm exec vitest run apps/playground/src/docs/components/chart-business/mini-data.test.ts`。  
**预期：** 新逻辑由RED到GREEN；常量表只做必要类型检查。

### T02：固定图槽与两档基础图形

**修改：** mini-examples.tsx、chart-business.css、mini-examples.test.tsx。

1. 让Mini各入口接收size，从同一个尺寸表取得图槽；默认compact。
2. 统一正常图、Unavailable状态和占位的外框；将状态说明放到可读区域，保留准确可访问文字。
3. 柱 / 趋势接入对应宽高、边距和线宽；分段条确保画布不触发小于10px的渲染保护。
4. 饼 / 环饼接入尺寸、内半径、安全外扩和无光晕规则；维持类别稳定。
5. 分段条仅整体两端圆润；内部保留真实边界，不给0值或微小值强加最小宽度。
6. 修改当前写死96×40的ResizeObserver / ParentSize测试替身，使测试按被测元素声明尺寸返回；保留真实浏览器作为布局依据。
7. 断言缩放后比例仍正确、所有路径有限、缺测 / 零总量不产生假扇区、6px分段条可见。

**命令：** `pnpm exec vitest run apps/playground/src/docs/components/chart-business/mini-examples.test.tsx`。  
**预期：** 两档状态与语义测试通过；尚不声明光学比例已验收。

### T03：完整环、底部开口弧与中心读数

**修改：** mini-examples.tsx、mini-layout.ts、chart-business.css、mini-examples.test.tsx。

1. 为0 / 50 / 100%和20 / 80加入方向、比例、中心读数测试。
2. MiniProgress分别渲染完整环与225°弧；在固定短槽中保留圆形坐标，按第3.3节实现。
3. compact只外置读数；comfortable弧叠加HTML百分比与短说明；只隐藏装饰SVG，不隐藏唯一文字。
4. 目标为0 / null / 无效 / 超额保留同框和准确状态。中心内容不使用原始value加百分号。
5. 检查当前Ring hoverScale及弹簧过程，外扩与文字均不被裁切；尺寸参数来自当前槽，不能写全局内部SVG选择器。
6. 文字单独放大后测中心内容实际边界；超过内区时切到第3.2节的外置读数，恢复字号后可回到中心。图形槽、数据值和可访问读数身份保持一致。
7. 若局部叠层即可解决，公共RingChart / RingCenter不改；确需补丁时列出具体失效证据与新增验证范围。

**完成条件：** 正常、0、100与更新过程均几何正确；底部开口不随进度变化；文字不超出槽。

### T04：双档对照与条形配方

**修改：** MiniGallery、bar-examples.tsx、chart-business-page.tsx、chart-business.css。

1. 独立展示覆盖9种表达：数量条、分段条、柱、饼、环饼、完整环、弧、折线、面积。
2. 每种表达同时出现compact / comfortable，使用同一数据、颜色和指标分母，共18个对照项；不进入170官方变体计数。
3. 同行设独立图形区与说明区；图形区容纳64px最大圆图，说明从同一基线开始。窄屏按同一图型成对上下排列。
4. 标明单位和关键读数；构成使用具名色标，不用大量斜线数字挤满caption。
5. RankingBars和RelativeBarExamples选用compact细条；数值列固定右对齐。标准横条 / 分组 / 堆叠保持当前量程与行为。
6. 业务页分别计算人数域和每日域并传给正确调用者；invalid沿用既有提示分支并跳过域计算，展示模型说明不使用开发参数名。

**完成条件：** 18个对照项真实可见，正常图框与说明对齐；标准横条比例不回归。

### T05：表格、指标卡和列表组合

**修改：** embedding-examples.tsx、chart-business.css。

1. 表格默认compact：人数细条＋右侧固定读数；主要文字14 / 22；饼 / 环的外侧读数同级。
2. 使用本业务表格根作用域及足够精确的既有slot选择器处理行高，不能与公共50px规则靠偶然优先级竞争。起点可用56px最小行高；两行文字或200%文字缩放可自然增高。
3. 图槽不缩小，数字不截断；长名称使用既有可访问完整名称方式。横向滚动限于表格，避免整页溢出。
4. 指标卡默认comfortable，使用现有Card：标题、主数字基线、补充说明建立统一锚点，图形不再决定数字行高。
5. “课程构成”主卡选环饼＋具名读数，分段条保留在独立对照 / 另一种组合中，避免同一卡重复表达。
6. 列表采用标题信息区、评分组、完成组三个稳定区域；每张图紧邻自己的读数；窄屏按组换行，不能把图和对应数字拆开。
7. 更新离屏占位为对应kind / size的槽。保留40行优化；同一次数据 / 域更新不能混用旧图与新读数。
8. 全零、缺测、长名、大数状态不应产生随机高度变化或数字移位；同列读数宽度可按最长样本预留。

**完成条件：** 同排卡片文字锚点稳定；表格主数字基线一致；列表完成图无需跨过评分才能找到对应文字。

### T06：图表库与原型目录同步

**修改：** chart-examples.tsx、chart-examples.css、chart-page.tsx、apps/prototype/src/scenarios/bklit-validation/catalog.tsx。  
**新增测试（若现有文件未覆盖）：** apps/playground/src/docs/components/chart-mini-size.test.tsx。

1. 保留standard / mini模式，新增miniSize；在5个已有mini入口中生效：line、area、bar、pie、ring。
2. 旧TimeExample的Line / Area继续使用真实Date、原生Tooltip、单点marker、replay和当前数据更新。只共用尺寸 / 内边距 / 字号配方，不用固定2026-10日期的values helper直接替换。
3. bar / pie / ring Mini调用传入同一miniSize，环旁百分比按value / maxValue计算。
4. 顶层empty / invalid / missing / zero分支按mini模式保留对应固定区域及读数，不能沿用标准图巨大空态。
5. 文档页增加“迷你型号”选择；原型目录主视图及已有compare视图都贯通。普通standard视图忽略miniSize。
6. 更新DocReference中的调用代码，不能继续仅展示id / recipe而漏掉当前状态、模式、档位和系列数；已有matrixSize保持传递。

**完成条件：** 5个入口×2档均可操作；标准模式外观和原生功能保留；类型检查不漏掉原型目录。

### T07：源码下载与独立消费

**修改：** chart-example-source.tsx、scripts/verify-chart-business-consumption.test.ts、scripts/verify-chart-business-consumption.mjs。  
**修改：** scripts/verify-chart-variant-consumption.mjs中的下载函数提取支持及其现有单测。

1. 两个文件集合都加入mini-layout.ts的真实raw源码；business和单图下载均不能引用缺失文件。把ChartExampleSource当前内嵌文件map原样提为纯函数chartExampleFiles，UI与验证器直接共用，不复制第二份清单。
2. chartExampleCode前5个位置参数id / recipe / state / size / matrixSize保留，依次追加miniSize（默认compact）、seriesCount（默认3）、revision（默认0）；ChartExampleSource、DocReference、chartExampleFiles和两个页面都传当前选择，生成入口以该revision初始化数据修订。chartExampleFiles可接收与下载组件一致的具名参数，不另造通用配置模型。
3. business下载保留固定宿主选型：表格compact、卡片comfortable、独立对照双档；不为此新增全页统一尺寸参数。
4. business继续序列化recipe、state、revision、filter、descending、many、matrixSize，分别计算人数域和每日域，并在invalid状态下先分流提示、跳过域计算。单图序列化id、recipe、state、size、matrixSize、miniSize、seriesCount、revision；不把business和单图参数混成同一对象。
5. exportedDownloads当前仅提取指定导出函数。提取chartExampleFiles时同时装载其直接调用的chartExampleCode；用明确的这两个函数名处理，不新增任意依赖解析器。保留variant / business原路径，并测函数实际调用不会产生未定义依赖。
6. 单测验证删除mini-layout.ts会报闭包缺失；compact / comfortable源码均保留档位；3 / 5系列配置及非零revision都被保存；不只比较字符串，还运行实际下载。
7. 复用现有隔离消费脚本：7种业务状态＋5类单图×2档的正常样本，至少另包含5系列饼 / 环的两档样本；证明图形、字级、CSS和精确读数离开Playground仍可用。
8. 现有脚本会复制已安装依赖缓存并验证170官方示例，报告必须说明这不是全新联网安装。完整源文件稳定后运行一次；修改闭包或共享代码后才重跑相应检查。

**完成条件：** 下载与预览同源，独立构建 / 浏览器通过；不新增公共MiniChart出口。

### T08：更新文档与资产登记

**修改：** 第5.3节README / AI指南 / 5个Manifest；执行时的status子记录。

1. 替换旧的单档96×40 / 40 / 48描述，写明两档尺寸、宿主选择、真实量程、状态、中心读数及排版规则。
2. 指明MiniSize属于可下载局部配方，不能误写成PieChart.size或公共图表size枚举。
3. 保留原17类、170官网引用、已存在Matrix来源和已确认蓝灰配方；不扩充或稀释官方覆盖表。
4. 若CSS颜色选择器改变，更新现有颜色消费者事实源；沿用Rain角色，不新增裸色 / :root / !important。
5. 不修改既有授权plan / scope字段去绕过校验；执行时在原chartBusinessExpansion下新增本次refinement子记录，原状态保留。
6. 几何尺寸在mini-layout和本配方文档登记，排版 / 空间优先使用已有公开Token；必要局部候选限定作用域，不晋升全局Token。
7. 自动结果与humanVisualReview分别记录；原有对比度、Safari / VoiceOver未覆盖结论不能因本轮布局调整自动消失。

### T09：浏览器几何、状态与响应式验证

**修改：** tests/e2e/chart-business-embedding.spec.ts、tests/e2e/bklit-catalog.spec.ts。  
**新增：** tests/e2e/chart-business-sizes.spec.ts，沿用chart-business.config.ts。

1. 第7节运行目标浏览器检查；普通尺寸快照可reduce，但动效测试另行执行。
2. 测18个独立对照项的逻辑槽、可见图形边界；圆形不失真以SVG横纵缩放和半径检查，不能要求225°弧的可见包围框宽高比等于1。检查画布不被公共320px样式撑开。
3. 测表格同列文字基线、数值右边界、图文间距及同排卡片主值基线。测量使用专用基线标记 / Range等明确方法，几何误差建议≤1px；仍需人工光学检查。
4. 测正常→0→缺测的单组件槽稳定；整页empty / invalid则测总体提示和无误导图形。离屏挂载前后槽宽高误差≤1px。
5. 测表格排序、筛选、40行滚动、详情展开、Tooltip portal；保持原用例的真实数据断言。
6. 视口1440、916、390；卡片 / 列表分别用真实容器宽度检查。分别验证200%页面缩放和文字单独放大：文字用真实字体尺寸放大后测量，中心两行容纳不下时外置，主要读数不截断；仅测页面缩放不能声称文字单独放大也通过。
7. 测0、9、99、100%、20 / 80、长中文名、大整数、无目标、部分缺测。只有本方案支持的格式才声明通过。
8. 在Playground及prototype目录分别跑5个mini入口×2档；prototype主视图和compare分支都覆盖。切回standard后检查旧尺寸、Tooltip、日期和单点仍正常。
9. 截图保存到本次evidence目录；当前配置的旧输出路径若会覆盖历史证据，测试读取新的统一证据路径或使用新目录，不覆盖P1旧截图。

**完成条件：** 页面无横向外溢（表格自身除外）、无NaN路径、无可见裁边和定位漂移；失败有对应截图。

### T10：正常动效与批量性能复核

**修改：** tests/e2e/chart-business-motion.spec.ts。

1. 已有gallery选择器因双档变成多实例后，按data-size / data-mini-kind精确定位，不能用first偷偷只测一档。
2. compact / comfortable均检查入场、更新中间帧和终态；保持25→75→50接续，正常更新不更换key。
3. 两档进度弧检查0 / 50 / 100方向及正常hover最大边界；饼扇区不溢入文字，不恢复光晕。
4. 更新、重排与滚动交错时，读数与图形身份一致，Tooltip不滞留旧值。
5. reduce检查立即稳定、无循环动画；不能把reduce截图当普通运动证明。
6. 40行只保留现有可见区渲染策略，记录浏览器、视口、可见实例、RAF间隔及long task；与T00同环境对照，不能用固定svg数量阈值替代性能观察。
7. 本方案不承诺未经测量的60fps，也不增加虚拟表格引擎。

**完成条件：** 两档动效均实际可见且连续；普通hover / 动画不改变布局；批量回归有当前环境证据。

### T11：独立审阅、交付与视觉验收

**新增（执行时）：** evidence/runtime/chart-mini-refinement/verification.md、human-review.md。

1. 独立审阅数据真实性、状态分支、旧趋势路径、下载闭包与共享影响；闭合实际发现。
2. 按第7节执行必要类型 / 构建 / 测试，区分本轮通过、继承失败、未检查。
3. 提供三组视觉对象：同图两档；同表不同行 / 列；同排指标卡。附列表信息组与窄屏。
4. 显示实际本地页面，让用户评价比例、字号、图文距离、对齐和动效。自动几何通过不代替视觉接受。
5. 整理仅本次触达文件；不把整个dirty worktree作为本轮变更，不提交或发布。
6. 若还有裁切、缺失读数、尺度混用或下载缺件，不能把实现标成完成；若仅等待用户视觉判断，明确标为“技术验证完成、视觉待确认”。

## 7. 验证命令与成功含义

全部命令在上述worktree根目录执行。先确认5173的Playground和5387的prototype服务由本worktree提供；没有服务时分别启动下列命令，不能杀掉来源不明的用户服务。各自保留终端会话；后面的验证在另一个会话执行。

```bash
pnpm --filter @rain-next/playground dev --host 127.0.0.1 --port 5173 --strictPort
pnpm --filter @rain-next/prototype dev --host 127.0.0.1 --port 5387 --strictPort
```

### 7.1 数据与组件

```bash
pnpm exec vitest run apps/playground/src/docs/components/chart-business/mini-data.test.ts apps/playground/src/docs/components/chart-business/mini-examples.test.tsx packages/ui/src/charts/data-bar.test.tsx packages/ui/src/charts/ring-compact.test.tsx scripts/verify-chart-business-consumption.test.ts
pnpm exec vitest run apps/playground/src/docs/components/chart-mini-size.test.tsx
```

第二条在T06测试文件创建后运行。预期全部目标测试通过；不以改断言数值掩盖真实比例或原生行为退化。

### 7.2 真实页面

```bash
pnpm exec playwright test --config tests/e2e/chart-business.config.ts chart-business-sizes.spec.ts chart-business-embedding.spec.ts chart-business-motion.spec.ts
pnpm exec playwright test --config tests/e2e/charts-playground.config.ts
pnpm exec playwright test --config tests/e2e/bklit-catalog.config.ts
```

第一条覆盖新尺寸与业务组合；第二条检查Playground原图型入口回归；第三条验证5387的prototype目录主视图和compare双档，不能用typecheck / build替代。原入口数量与Matrix的继承不一致，必须按T00归因，不能删图或降低旧检查来制造通过。交互定位依据实际语义，不把按钮ARIA pressed的当前角色误判为普通静态文字。

### 7.3 类型、样式与构建

```bash
pnpm --filter @rain-next/playground typecheck
pnpm --filter @rain-next/prototype typecheck
pnpm exec tsc --noEmit --project tsconfig.tests.json
pnpm --filter @rain-next/playground build
pnpm --filter @rain-next/prototype build
node scripts/generate-chart-styles.mjs --check
pnpm exec vitest run scripts/chart-color-consumers.test.ts
```

若改共享包，再执行 `pnpm --filter @rain-next/ui typecheck` 与受影响共享测试。若调整颜色消费者，执行现有 `pnpm verify:tokens`并区分旧范围失败，不改全仓色彩规则。

### 7.4 下载与来源

```bash
node scripts/verify-chart-business-consumption.mjs evidence/runtime/chart-mini-refinement/consumption
pnpm exec vitest run scripts/charts.test.ts scripts/verify-chart-variant-consumption.test.ts
```

只有闭包、独立构建和浏览器实际输出都通过，才声明可独立消费。若vendor修改，更新source-lock的本地hash / 修改说明，保留上游hash；若未修改，不为了本任务重生成vendor或Registry。

## 8. 验收表与交付内容

| 编号 | 必验收项 | 证据 |
| --- | --- | --- |
| A01 | 9种表达各有两档，同数据不改变比例 | 18项对照截图＋数据断言 |
| A02 | 人数域、每日域、评分分母、完成目标分开 | 单测＋筛选 / 更新浏览器结果 |
| A03 | 图槽、有效图形和文字三层均正确 | DOM / SVG边界、文字基线测量＋视觉复核 |
| A04 | 表格紧凑、卡片舒展、列表成组 | 三宿主整景截图 |
| A05 | 底部开口、圆形几何、真实百分比 | 0 / 50 / 100＋20 / 80样本 |
| A06 | 状态与离屏挂载不造成定位跳动 | 状态前后与滚动测量 |
| A07 | 5个图表库入口和原型目录贯通 | 两档 / 标准切换操作记录 |
| A08 | 下载保存实际档位、文件和样式 | 隔离消费结果 |
| A09 | 两档普通动效及reduce均检查 | 中间帧 / 终态 / 同实例证据 |
| A10 | 40行与窄屏可用，长数字可读 | 环境参数、性能事实、窄屏与文字放大截图 |
| A11 | 没有回退原标准图、Matrix或170映射 | 基线比较与相关回归结果 |
| A12 | 技术结论和用户视觉结论分开 | verification.md / human-review.md |

最终交付应包含：两档图表及真实宿主页面、完整下载文件、更新后的使用文档与Manifest、当前验证结果、继承问题清单、用户视觉审阅材料。

本计划不建设第三档、自适应自动切档、万能图表配置器、全局密度重构、新主题、额外动态图例系统或新的批量渲染引擎。物理设备Safari / VoiceOver及未执行的交互、对比度检查按实际覆盖报告，不因本次尺寸改造宣称全局通过。
