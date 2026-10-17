# MatrixChart

Rain 原生分类交叉矩阵，`registry-candidate` / `unpublished`。与日历 HeatmapChart 共用五档 Rain 色阶、Bklit 浮层与单元格入场基础；分类轴保留稳定 ID 和业务排序，日历轴保留日期、周起始与月份规则。

```tsx
import { MatrixChart, type MatrixCell } from "@rain-next/ui/charts";
import "@rain-next/ui/charts/styles.css";

const cells: MatrixCell[] = [
  { rowId: "course-a", columnId: "version-a", kind: "value", value: 0 },
  { rowId: "course-a", columnId: "version-b", kind: "missing", label: "未设学期" },
];

<MatrixChart caption="课程关系" rowHeaderLabel="课程"
  rows={[{ id: "course-a", label: "高等数学" }]}
  columns={[{ id: "version-a", label: "2023 版" }, { id: "version-b", label: "2024 版" }]}
  cells={cells} encoding={{ kind: "heat", domain: [0, 1] }} />;
```

Anatomy: `ui-chart-matrix` 根、可聚焦滚动区、原生 `caption` / 行列标题 / 数据格、精确读数、同源图例。`matrix.css` 由组件直接导入；沿用已有 chart 和 Foundation 角色。

| Props | 合同 |
| --- | --- |
| `rows`, `columns` | `MatrixAxisItem[]`，每轴 ID 唯一，顺序由宿主决定，标签可以换行 |
| `cells` | `MatrixCell[]`；重复坐标、未知引用拒绝；省略坐标视为缺测 |
| `caption` | 矩阵名称和必要单位；同时提供原生表格可访问名称 |
| `encoding` | 下列三个显式编码之一 |
| `rowHeaderLabel` | 行标题列名称，默认“项目” |
| `valueFormat` | 数值读数和数值图例共用格式；等级直接使用声明标签 |
| `reducedMotion` | 宿主主动减少运动；系统减少运动独立由 CSS 遵循 |

- `value` 必须是有限数字。`null` 不转为 0，缺测使用 `kind: "missing"`。
- `not-applicable` 表示不适用；例如“无该课程”。“未设学期”使用有明确标签的 missing。
- `heat` 需要有限、严格递增且宽度有限的 `[min,max]`；超出范围拒绝。数字居中色块内，使用现有五档色阶及相邻档位连续插值；细渐变图例与图中同域、同色阶，端点共用格式。开课学期等离散顺序值显式声明 `steps:[1,2,3,4,5,6,7,8]`：非空、有限、严格递增并包含域端点，未声明值拒绝；图例显示对应分段与真实步值，不产生小数学期。
- `bubble` 需要有限非负 `domainMax`；数量非负且不越界。`r=maxRadius×sqrt(value/domainMax)`，矩阵内面积与数量成比例；填色按同一数值比例映射五档顺序色阶，不能按行或列单独重算。默认 `maxRadius=14`，固定 40×40 SVG 支持 `0<maxRadius≤18`。数字反白、无底板，按真实文字 bbox 居中；装不下时隐藏格内数字，精确值通过表格和指向/键盘浮层读取。`domainMax=0` 只接受 0，半径为 0；独立中性小点标记零，不把它解释为数量面积。图例保留四分之一、二分之一、最大值及同源色阶，图形仅使用8/12/16px直径的小中大提示，不用它校准实际面积；数字在圆右侧，保持至少24px交互高度。全零域仅保留零样本。
- `level` 需要唯一有限数值到标签 / 颜色的显式列表；未知等级拒绝。格中只显示固定面积圆点，等级文字保留在图例与可访问读数。CH145 示例明确为无直接 / 一般 / 核心支撑三个等级。
- 相似度由宿主声明 `[0,1]`；不自动补全对称位置或对角线。重新排列轴时必须保留 ID。

`getMatrixDataIndex` 返回按 rowId / columnId 索引的只读 Map；`getMatrixEncoding` 返回 `encode(cell)` 与同函数产生的 `legend`。格子颜色、半径和读数消费同一结果。

数据格没有 Tab stop 或假按钮。每格通过 `headers` 关联本实例的行列标题，以 `aria-label` 保留精确读数；格内图形与重复数字是装饰内容。缺测用纹理、不适用用带虚线边界的横线，与有效 0 分开。滚动区为单一矩阵键盘入口：初次聚焦查看首格并滚至可见位置，已有指向坐标时保留该格；方向键移动，Home/End定位，Escape关闭浮层。活动格保持清晰轮廓，精确内容由提示与可访问描述提供。图例可聚焦查看联动范围/等级，不伪装成筛选或业务按钮；编码类型、值域或离散步值变化后清除失效的图例联动。

热力数字根据实际解析的填色选择现有深色或 OnColor 文字，两者都不附加背景。气泡数字使用 OnColor；白字可读性需要与实际填色及尺寸共同核查，不能再用白底板补救。forced-colors使用系统前景/背景以保持文字与圆的区分。字体加载完成后重测气泡文字；外部直接改CSS而不触发渲染不属于当前探色覆盖。自动核查不等于完整对比度Gate通过。

首次进入可视区域后播放有限入场，使用既有Bklit空间交错节奏；重播由宿主重新挂载。排序按稳定坐标平滑移动，半径与颜色在数据更新时持续过渡，快速更新从当前中间状态继续，格内读数不统一隐藏。过渡期间按实际绘制的半径判断文字容纳、按实际填色选择字色；仅在编码或解析色阶变化后采样500ms，卸载和再次更新时清理。指向/聚焦联动当前格、行列标题与图例；统一TooltipBox在相邻格之间连续移动，离开有短暂宽限，排序结束后对齐活动格。图例强调对应区间或等级，数值填色保持原映射。系统或显式减少运动直接显示终态；计时及观察器卸载清理，没有永久循环动画。

数据区所有列等宽，左侧行标题按本实例最长文字及实际UI字体测量，最小48px、最大240px且不超过可用宽度40%；超过边界的长标题换行。字体加载、标题和容器变化后重算；键盘避让和热度图例对齐共用实际列宽。空间不足时在图表内部横向滚动，行标题固定，气泡中心仍等距。活动固定列在不透明表面上叠加高亮，滚动数据不穿透。星期×小时是周期统计矩阵，具体日期热图使用独立日历入口；不为分类轴构造假日期。本轮修订见[固定列与图例验证](../../../../../evidence/runtime/chart-matrix-sticky-layout-2026-10-09/verification.md)。

应用私有 `MatrixExamples` 缺省显示五组 Mock，`fixtureId` 可选择一组。`recipe` 传给每个矩阵根以保留所选配方；相似度的 `initialSize` / `onSizeChange` 供宿主复现并保存当前 4/6/12 阶示例设置，不是公共 MatrixChart 数据 API。

组件文档与五组实例统一使用 Playground `/#chart-matrix`。该页保留状态、更新、重播、行列顺序和矩阵规模控制，下载包含全部矩阵实例和当前设置；`/#chart-business` 及其下载不再包含矩阵。私有源码位置保持兼容，页面归属见[调整验证](../../../../../evidence/runtime/chart-matrix-page-separation-2026-10-09/verification.md)。

课程数示例使用既有支持的 `maxRadius=18`、`domainMax=100`，在40×40画布边缘保留2单位余量；全部半径仍为 `18×sqrt(value/100)`，没有给小值增加最小半径。共享默认 `maxRadius=14` 不变。

旧验证与来源保留在 `evidence/runtime/chart-business-expansion/p2-agent/` 和 `evidence/runtime/chart-visual-feedback-2026-10-09/`；本轮规则取代旧读数底板与更新隐藏处理，验证见 [矩阵交互修订记录](../../../../../evidence/runtime/chart-matrix-refinement-2026-10-09/verification.md)。当前目标尺寸为12×12和7×24；更大规模、真实读屏、完整对比度与物理触屏尚未验证，`contrastAcceptance`保持`not-granted`，技术检查不授予视觉Gate或发布状态。
