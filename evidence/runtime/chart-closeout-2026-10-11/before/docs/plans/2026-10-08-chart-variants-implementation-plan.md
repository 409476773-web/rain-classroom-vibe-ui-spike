# Bklit → Rain 全变体与状态补齐 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> 执行授权更新：用户随后明确“开始按照计划实施修改”，并要求“继续完成”。本计划已进入完整运行实现与验收；保留历史规划记录，当前进度见末尾执行记录。

**Goal:** 在现有17个Rain图型入口内，完整对应2026-10-08核准的Bklit官网16类、170个展示条目，提供一页浏览全部变体、可反复体验的状态与交互、可独立消费的源码，以及逐项可追踪的验证结果。

**Architecture:** 继续使用唯一共享来源 `@rain-next/ui/charts`、原生Compound API、Rain主题及现有10个配方。官网条目用少量按图族组织的真实示例模块表达；同图型页面共享一个展示外壳，卡片拥有独立状态。从当前固定commit补入16个原生源码文件（原计划15件，加上临时范围选择所需segment.tsx），不另建图表引擎、配置解释器或170个公共组件。

**Tech Stack:** React 19、TypeScript、Vite、现有Rain组件与Token、Bklit固定源码、Motion、已安装的Visx／D3、现有Vitest与Playwright；Brush阶段预计仅新增上游已固定的 `@visx/brush@3.12.0`。

---

## 1. 状态、依据与授权边界

- 计划日期：2026-10-08，Asia/Shanghai；状态：**运行实现已完成，最终验收进行中**。
- 本轮用户明确要求：“继续梳理，并且开始写详细的实施方案”。此前明确“先不动代码”，并选择“一页浏览所有变体”；这次新增的是文档写入授权。
- 工作目录：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`。所有后续命令从该目录执行；不要到外层旧主仓实现。
- 初始阶段只新增本文件与[逐项覆盖台账](2026-10-08-chart-variants-coverage.md)；当前执行按后续明确授权修改运行代码、依赖及本地登记，历史证据保留；未创建Git提交。
- 后续执行属于System Mode下的**未发布候选增量**，因为涉及共享源码、公开入口、合同和Registry。收到执行本方案的明确指令后，按完整授权范围连续推进；不逐卡重复询问。用户视觉判定与技术检查仍分开记录。
- 既有基础不是空白：17图型已接入，10个配方存在；整体视觉／交互基线已获用户认可。最新登记中 `monochrome-blue` 已于2026-10-08通过现有15个适用图型的用户视觉审核；不把它重置为待审，也不外推为新增3D、纹理或全部对比度已通过。
- 既有依据：[原基础实施计划](2026-10-07-bklit-rain-catalog-plan.md)、[配方设计](2026-10-07-chart-reference-recipes-design.md)、[当前状态](../../status/current-phase.yaml)、[消费入口](../ai/charts.md)、[共享README](../../packages/ui/src/charts/README.md)。本计划补充这些成果，不重新执行旧计划的迁移工作。
- 视觉遵循设计方法V01／V03／V05／D05／I02：稳定颜色身份；保留材质；内容与行为一起适配；按真实容器调整；保持数据语义和精确读数。方法出处为[设计方法库](../ai/information-design.md)。

### 1.1 完整范围如何计数

| 官网家族 | 条目数 | 执行任务 |
| --- | ---: | --- |
| Bar | 21 | T04—T06 |
| Area | 19 | T07—T08 |
| Line | 19 | T07—T08 |
| Composed | 14 | T08 |
| Pie／Donut | 9 | T09 |
| Ring | 6 | T09 |
| Radar | 6 | T09 |
| Scatter | 10 | T10 |
| Funnel | 9 | T10 |
| Gauge | 13 | T10 |
| Heatmap | 11 | T11 |
| Choropleth | 5 | T11 |
| Sankey | 5 | T11 |
| Sunburst | 3 | T11 |
| Candlestick | 11 | T12 |
| Live Line | 9 | T12 |
| **合计** | **170** | **16个官网家族** |

1. 数量包括顶部主示例和同能力的不同配色／组合卡；按官网展示条目计数，不按独立组件数计数。Area核准值为19。
2. Rain保留17个入口，因为 `profit-loss` 独立成页；官网Line的Profit/Loss条目映射到同一实现，在折线页保留对应卡／入口，不再算一个新图表组件。
3. 已有Rain默认示例、96×40迷你趋势、配方和数据边界仍保留；它们不挤占170项来源覆盖。首屏默认与某个官网条目效果重合时允许复用一个真实实例，但映射必须明确，不能漏掉官网条目。
4. 一页浏览所有变体不等于 `170 × 10种配色 × 7种数据状态` 全排列。保留有效组合，使用每变体明确的配色适用规则；状态示例集中展示，专项风险另做针对验证。
5. 官网更新后的新增条目另记差异，不能在实施中静默扩大或减少本次170项基线。

### 1.2 不借本计划扩大图表能力

沿用浅色验收基线。任意数值XY散点、通用分类矩阵、关系网络、生产数据请求／权限／断连流程、完整深色主题、SSR及公开发布不是本计划新增交付。官网和已有合同明确包含的交互、样式与状态不得以“非常用”为由删去。Git、Figma、生产接入及发布仍需各自明确授权，不作为本计划步骤。

## 2. 调查结论与实施起点

| 起点 | 已核实内容 | 执行原则 |
| --- | --- | --- |
| 已有相近样本 | 分组／堆叠柱、渐变柱、饼／环饼、弧形／线性仪表、旭日下钻、实时追加等 | 复用真实示例与已认可样式，补精确对应关系 |
| 有完整底层、未独立展示 | 横向柱、Loading、纹理、双轴、环形角度、漏斗方向、热图分隔等 | 增加调用组合和样本，不重新造基础组件 |
| 有辅助代码、缺渲染部件 | 背景、参考带、Brush、预测线、事件标记、3D柱、方块柱 | 按第4节引入固定源码，补公开入口和闭包 |
| 需运行确认 | 所有新增组合的动效、窄屏、读数、复制消费与实例隔离 | 源码存在不能登记成运行／视觉通过 |

柱图21项的初始分类为5项相近样本、8项可复用底层、8项缺件，逐条见覆盖台账。其它图族逐项状态以台账及实际执行证据更新，不能根据总数倒推完成比例。

本轮完成逐族源码对照后，170项起点为**38项相近样本、97项可复用底层、35项缺件或扩展**。这只是实现路径分类；地图数据准备、滚动宿主、层级图例接线、特定角度等仍按各任务完成，不能把“可复用底层”解释为示例无需工作。

已确认的特殊边界：

- 面积多系列当前各自从同一基线绘制，**没有累计面积堆叠API**。官网标题Stacked须核对其叠层视觉和数据说明，不把重叠面积描述为可相加总量。
- Area／Line的拖选是拖动时范围高亮，鼠标松开会清除；不等同于Brush控制的持久可视范围。
- Bar双轴目前用于纵向非堆叠路径；横向或堆叠分支不能无依据宣称双独立尺度。
- 固定版本官方明确不支持Projection与Brush同时使用，分别提供示例，不承诺任意组合。
- 热图是日期日历；地图现有几何是自创示意区域。世界地图示例必须另备来源、许可和版本明确的数据，不在演示运行时请求可变远程分支。
- Live的 `paused` 仅冻结时钟，仍会调度rAF；Loading骨架含无限Motion循环。离屏停止工作不能只看“已暂停”文字或隐藏CSS。

## 3. 页面与消费设计合同

### 3.1 每个图型的一页结构

1. 图型名称、用途、返回目录；保留17个现有 `#chart-<id>` 路由和进入后的标题焦点。
2. 当前Rain默认推荐示例，继续支持已有配方和状态检查；首屏不被整页功能控件淹没。
3. 页级配色选择与分组跳转：基础结构、图形材质、坐标与辅助读数、交互与状态。跳转仅定位，不过滤或隐藏其它变体。
4. 全部变体按组连续出现。普通卡按实际容器排为多列；密集、双轴、Brush、主交互示例用宽卡；390px为单列。不得缩小文字来硬塞三列。
5. 数据与状态区域：已有无数据、零值、单项／单点、长标签、缺测、无效数据集中展示；正常状态由默认／变体样本承担。适用图型另展示官方Loading及往返过程。不把所有错误工作流虚构为官网能力。
6. 使用边界、独立调用、来源和相关图型；代码与精确表按需展开，不把技术登记信息混进业务图形。

每张卡至少有名称、简短用途、真实图表、必要操作、查看代码与精确数据入口；不适用的操作不出现。需要重播／重置的交互在本卡内提供。卡片标题可加入“来自官网的对应变体”链接，具体来源ID留在可追踪属性和台账中。

### 3.2 配色、材质与数据分离

- 保持 `rainChartRecipes` 的10个既有身份，不把3D、横向、Brush等塞进颜色配方表。
- 页级配色只作用于允许跟随的卡。正负／涨跌、强度等级、专门展示渐变差异的卡保留相应语义或演示目的；用简短说明解释其配色规则。
- 颜色绑定系列身份，不依数组排序随机换色；图形、图例、Tooltip和精确表的色标一致。
- 纹理、渐变方向、透明度、3D侧面明暗属于变体表现，切到蓝灰时仍保留这些区别。
- 不为纯色值组合复制整套页面，也不强行令两个官网配色变体变成完全一样的卡。需要本地配方常量时放在图表／示例作用域，不改变品牌主蓝和全局Token。

### 3.3 独立状态与可见性

使用原生IntersectionObserver管理示例附近的可见范围，不引入虚拟列表库。所有卡片标题、说明、锚点、稳定尺寸和操作容器留在文档中；需要时才启动昂贵图形和持续动画。

- 页级配色之外，更新次数、加载阶段、重播、用户暂停、Brush范围、旭日当前层级及源码展开状态按卡片保存。
- 纯悬停状态可在离开后清除；明确的用户选择不因滚动出屏自动重置。
- 循环Loading／实时图离开活动范围时停止模拟生产者并卸载实际循环子树，卡片状态与高度保留；重新进入时恢复一次。需要保留内部选择时提升为卡片受控状态，不保存整个动态图DOM的私有快照。
- 用户手动暂停优先于自动恢复；系统减少动效优先于自动播放；浏览器页面不可见时也停止持续生产者。
- 实时图的暂停快照包含数据和暂停时的窗口终点，不能只保存布尔标志。当前原生图重挂载会以当前时间初始化窗口；若卸载后返回，必须恢复原观察窗口，必要时给原生循环补最小受控时间入口，或停止循环但保留内部时钟。不得平移原始时间戳来掩盖窗口丢失。
- 焦点仍在图形／控件内时不得突然卸载该操作区域。重置或卸载前保留可理解的焦点归宿。
- 无IntersectionObserver时使用可用的同步展示降级，不让内容永远停在占位；生命周期测试覆盖降级和卸载。
- 一次性入场动画是否保留静态最终DOM，以最少状态为原则；不得仅为“暂停全部动画”建立第二套动画引擎。

### 3.4 一个轻量目录，不做配置平台

计划新增 `apps/playground/src/docs/components/chart-variants.ts`，只保存稳定元信息并引用真实示例。覆盖台账始终保留170项完整目标；运行目录按批只注册已能渲染的子集，最终再要求与170项精确对应。未实现项只留在规划记录，不用空白卡伪装可用变体。初始类型可按下列最小形态实施，不预留插件系统：

```ts
type ChartVariant = {
  id: string;                 // 与覆盖台账相同，稳定且唯一
  chartId: ChartId;
  title: string;
  description: string;
  group: "structure" | "appearance" | "reading" | "interaction";
  layout: "standard" | "wide";
  paletteMode: "page" | "semantic" | "example";
  sourceId: string;           // 对应真实示例文件和调用，不能填伪源码
};
```

实现状态与用户验收状态放在覆盖／证据记录，不作为产品里的大量调试开关。渲染用普通React组合及有限图族分支；能直接传现有Props就不造新接口。

卡片外层使用稳定的 `data-chart-variant` 和具名section；同变体两实例另加实例标识。保留原生 `data-rain-id="ui-chart-*"` 与Parts；现有默认预览的 `data-rain-id="chart-*"` 继续明确定位。测试先按卡片缩小范围，再读内部控件；不靠追加 `.first()` 掩盖多个实例。

### 3.5 预览与代码同源

现有源码区一次导出含17图的6文件套餐，不足以证明新增单卡可复用。后续在 `chart-example-source.tsx` 上扩展变体模式，保留旧默认示例消费能力。

- 每卡导出当前变体真实调用、当前配色／关键参数、可复核的示例数据，以及确实需要的辅助文件；加载和实时示例包含正确的清理逻辑。
- 预览和代码区读取同一真实源码模块；允许按图族打包少量示例函数，不为裁出几行代码引入AST代码生成平台。
- 简单示例尽量单文件；需多个文件时清楚列出并能全部下载。不得把依赖隐藏在原应用路由、目录组件或私有vendor路径中。
- 独立消费从 `@rain-next/ui/charts` 导入，加载图表styles与Foundations的tokens／typography／focus，提供实际容器尺寸。
- 无论是否提供复制按钮，下载闭包必须能在干净宿主编译；复制失败时给出可操作的下载路径，不静默表示已复制。

## 4. 源码、依赖和文件边界

### 4.1 固定来源补件

当前固定commit为 `5d699897b2dde26374cf15501dbaadbc52cea982`。下列15文件已确认全部存在于[该固定源码目录](https://github.com/bklit/bklit-ui/tree/5d699897b2dde26374cf15501dbaadbc52cea982/packages/ui/src/charts)，无需为了本清单整体升级Bklit。

上游根：`packages/ui/src/charts/`；本地目标根：`packages/ui/src/charts/vendor/charts/`。以下路径均相对这两个根：

| 能力码／任务 | 新增文件 | 说明 |
| --- | --- | --- |
| BG / T04 | `background.tsx` | 纹理／点阵背景 |
| BAND / T04 | `reference-area.tsx` | 区间实际渲染，复用已存在的配置和几何工具 |
| DEPTH / T05 | `bar-depth.tsx` | Provider、Back、Front、Pulse，继续配合现有Bar |
| SQUARE / T05 | `bar-squares.tsx` | BarSquares与BarColumnTrack |
| BRUSH / T07 | `chart-brush.tsx` | Brush主体 |
| BRUSH / T07 | `chart-brush-handle.tsx` | 操作柄 |
| BRUSH / T07 | `chart-brush-layout.tsx` | 布局 |
| BRUSH / T07 | `chart-brush-selection-overlay.tsx` | 选区覆盖层 |
| BRUSH / T07 | `chart-brush-track-overlay.tsx` | 轨道覆盖层 |
| PROJ / T07 | `projection-line.tsx` | 预测线主体 |
| PROJ / T07 | `projection-line-end-marker.tsx` | 远端圆点 |
| PROJ / T07 | `line-series-terminal-marker.tsx` | 历史序列末点空心环 |
| EVENT / T07 | `markers/index.ts` | 事件标记部件入口 |
| EVENT / T07 | `markers/chart-markers.tsx` | ChartMarkers |
| EVENT / T07 | `markers/marker-group.tsx` | MarkerGroup |

只引入实际依赖闭包，保留MIT许可。`chart-brush-layout.tsx` 的 `@/lib/utils` 改为 `../lib/utils`，`markers/marker-group.tsx` 对应改为 `../../lib/utils`；逐项记录路径适配。不要复制上游 `index.ts`、全站CSS、Studio或图标包。

Brush唯一已确认的新运行依赖为 **`@visx/brush: "3.12.0"`**，来自[固定上游package.json](https://github.com/bklit/bklit-ui/blob/5d699897b2dde26374cf15501dbaadbc52cea982/packages/ui/package.json)。其它Visx为4.0.1-alpha.0也不能据此擅自改Brush版本；执行时验证React／类型和实际交互兼容，再更新实际所属的UI包及锁文件。若确有兼容问题，记录最小解决方案，不顺带升级全部Visx。

Projection端点须按三个部件实际装配，不能只见 `showEndMarker` 就认为端点已绘制。Brush与Projection分开提供，依据[固定版本投射说明](https://github.com/bklit/bklit-ui/blob/5d699897b2dde26374cf15501dbaadbc52cea982/apps/web/content/docs/utility/projection-line.mdx#L76)。

### 4.2 后续计划触及的本地文件

| 动作 | 精确路径／集合 | 职责 |
| --- | --- | --- |
| 新增 | `apps/playground/src/docs/components/chart-variants.ts` | 已接入条目的来源映射和轻量元信息，最终覆盖170项 |
| 新增 | `apps/playground/src/docs/components/chart-variant-gallery.tsx` | 分组、卡片、独立状态与可见性；只在职责变复杂时再拆小文件 |
| 按批新增 | `apps/playground/src/docs/components/chart-variants/bar.tsx` | 21个柱图组合及数据 |
| 按批新增 | `apps/playground/src/docs/components/chart-variants/trend.tsx` | Area／Line／Composed组合 |
| 按批新增 | `apps/playground/src/docs/components/chart-variants/radial.tsx` | Pie／Ring／Radar组合 |
| 按批新增 | `apps/playground/src/docs/components/chart-variants/comparison.tsx` | Scatter／Funnel／Gauge组合 |
| 按批新增 | `apps/playground/src/docs/components/chart-variants/structure.tsx` | Heatmap／Choropleth／Sankey／Sunburst组合 |
| 按批新增 | `apps/playground/src/docs/components/chart-variants/special.tsx` | Live／Candlestick及现有盈亏线对应 |
| 修改 | `apps/playground/src/docs/components/chart-page.tsx`、`chart-page.css` | 现有文档页接入完整分组，不新建一套路由 |
| 修改 | `apps/playground/src/docs/components/chart-example-source.tsx` | 变体调用和真实源文件闭包 |
| 按需修改 | `apps/playground/src/docs/components/chart-catalog.ts`、`chart-examples.tsx`、`chart-data.ts`、`chart-examples.css` | 保留默认基线，提取确有重复的小帮助函数；不复制17份旧示例 |
| 修改 | `apps/prototype/src/scenarios/bklit-validation/catalog.tsx`、`catalog.css` | 原型图库复用同一变体页内容；不另养第二套配方实现 |
| 修改 | `packages/ui/src/charts/index.ts`、`vendor/source-lock.json`、`styles.css` | 公开新增Parts、来源锁、必要作用域样式 |
| 生成 | `packages/ui/src/charts/utilities.generated.css` | 仅由 `scripts/generate-chart-styles.mjs` 产生 |
| 条件修改 | `packages/ui/package.json`、`pnpm-lock.yaml` | 仅Brush所需依赖和真实闭包变化 |
| 新增测试 | `tests/e2e/chart-variants.spec.ts`、`tests/e2e/chart-variants.config.ts` | 全目录、多实例、生命周期与新交互 |
| 扩展测试 | `scripts/charts.test.ts`、`scripts/chart-color-consumers.test.ts`、`tests/e2e/charts-playground.spec.ts`、`tests/e2e/bklit-catalog.spec.ts` | 元信息／闭包、颜色、默认基线与多卡定位 |
| 同步合同 | `manifests/ui/chart-<id>.yaml`、`registry/charts.json`、`packages/ui/src/charts/README.md`、`docs/ai/charts.md` | 17个既有资产的新增变体与实际边界 |
| 新证据 | `evidence/runtime/chart-variants/` | 每次独立运行目录、覆盖结果、截图、动效和消费 |

不提前创建空图族文件。若某个图族文件实际过长再按职责拆分，拆分需同步源码下载闭包。公共包不反向依赖App。旧四样本原生对照、G2实验与历史证据保持独立。

## 5. 任务拆解与完成条件

依赖顺序：`T00 → T01 → T02/T03 → T04/T05 → T06 → T07 → T08 → T09/T10/T11/T12 → T13 → T14`。分图族可并行；`index.ts`、来源锁、目录映射、公共样式和Registry由同一整合任务顺序合并，不让多个执行者同时覆盖。

任务中的文件路径沿用第4.2节精确路径；凡涉及新增图形算法、边界或生命周期，先增加一个能捕获真实错误的检查、确认失败，再实现并运行到通过。纯颜色／布局调整使用已有浏览器和视觉证据，不写镜像测试。下列步骤是未来执行清单，本轮均未执行。

### T00：冻结来源、保护现有成果

**文件：**覆盖台账；`vendor/source-lock.json`；新 `evidence/runtime/chart-variants/<run>/baseline.md`；执行授权后才登记 `status/current-phase.yaml` 的本次独立范围。

1. 核对工作区、Git状态、用户并行修改、5173／5387服务身份，保存本任务将触及文件的当前哈希。
2. 校验当前来源锁的本地哈希；有漂移先解释来源，不能用上游覆盖修复。
3. 固定170条来源ID／原名／页面链接；核对17本地入口映射。新增／移除官网条目只记差异。
4. 对15个待引入文件核对固定提交内容、依赖、许可及本地已有帮助函数；保留现有堆叠比例、实例ID、轴距、字体、Gauge布局补丁。
5. 将已有自动检查与视觉确认作为历史基线引用，不重新冒充本轮结果。保留最新蓝灰审核状态。

**完成条件：**台账170项唯一、17入口保留；来源与改动边界明确；无运行源码或已确认样式被重置。

### T01：建立一页浏览的最小展示外壳

**文件：**新增 `chart-variants.ts`、`chart-variant-gallery.tsx`；修改 `chart-page.tsx`、`chart-page.css`、原型 `catalog.tsx`／`catalog.css`；新增E2E配置与spec。

1. 先用3个已有柱图样本接入普通卡、宽卡与分组锚点，复用现有文档和控件，不一次迁移全部图型。
2. 在 `scripts/charts.test.ts` 增加台账170项及家族计数、17入口保留、运行ID属于来源集合、已注册项都有真实渲染和源码的检查。批内只检查已接入子集的完整性；T14再断言运行ID集合等于完整来源集合，不把占位算完成，也不为了分批临时删减170项基线。
   同步将163文件的硬编码数量断言改为固定清单、磁盘与Registry三方完整性检查，保留固定commit和逐文件哈希；T04／T05／T07每次补件都同时更新来源锁、公开入口、Registry闭包及真实依赖，不把已知不一致推迟到T13。
3. 实现页级配色和每卡操作作用域；给卡片具名section、稳定身份及可聚焦标题。
4. 保留默认推荐预览与旧的返回／焦点逻辑；分组跳转使用现有路由内定位，不能破坏 `#chart-<id>` 解析。
5. 在1440／900／390px检查普通卡、宽卡、长标题和代码展开；原型与文档站消费同一实现。

**检查：**新增 `[T01]` 浏览器检查验证3卡同页、互不隐藏、锚点可达、返回焦点、页面无横溢出。旧默认示例仍可更新和查看数据。

### T02：实现多卡独立状态与生命周期

**文件：**`chart-variant-gallery.tsx`；按需新增同目录 `chart-variant-gallery.test.tsx`；`tests/e2e/chart-variants.spec.ts`；仅在宿主无法停止循环时对原生循环做最小补丁并登记。

1. 用一个Loading卡和一个实时卡编写“离屏停止回调／数据增加、返回只恢复一次、卸载清理”的检查，先证实当前方案的失败。
2. 状态放在卡片宿主；图形子树按可见性启动。停止真实生产者与循环层，不能只改CSS或 `paused`。
3. 明确手动暂停、减少动效、页面后台、滚动离屏的优先级；保留用户操作及焦点。
4. 验证加载中途更新、快速来回滚动、换图型和卸载，不出现多重计时器、过期状态回写或累计数据增长。
   另用受控测试时钟覆盖“手动暂停→离屏超过实时窗口长度→返回”：原窗口及读数保持，用户主动恢复后才按明确规则追到当前时刻；不只断言暂停按钮状态。
5. 无观察器时回退为可用展示；记录活动实例数和浏览器错误，性能数值实测后记录，不预先承诺固定帧率。

**检查：**`[T02]` 同时观察实际回调／数据增量和可见结果；不得只断言暂停文案。加载Ready往返和Reduced Motion静态结果正确。

### T03：让每卡代码可独立消费

**文件：**`chart-example-source.tsx`、各图族真实示例模块、`tests/e2e/chart-variants.spec.ts`、独立消费目录。

1. 选默认柱和加载柱两个样本，定义真实调用文件、数据和辅助文件清单；简单卡先做到最小闭包。
2. 代码区读取预览同源文件；当前配色及关键参数通过明确主调用传入，不拼接第二份渲染实现。
3. 限定图表导入来自公共入口；下载包含全部必需文件与样式／依赖说明，不依赖目录路由或应用祖先CSS。
4. 在新的干净React／Vite宿主编译并运行两个样本；替换数据、加载往返、两个实例同时显示。
5. 验证代码区、复制／下载和当前卡一致；当前卡的源码切换不改变其他卡。

**检查：**`[T03]` 加实际消费编译；已渲染但复制代码不可运行的卡不得登记交付。

### T04：补共有背景与参考区间

**文件：**新增 `vendor/charts/background.tsx`、`reference-area.tsx`；修改公开 `index.ts`、来源锁、`registry/charts.json`、必要样式；`bar.tsx`／`trend.tsx`示例模块。

1. 从固定commit引入两文件，登记上下游哈希；只追加实际公开Parts。
2. 为纹理／点阵背景提供同尺寸对照，背景低于数据层，保留Tooltip事件命中。
3. 为参考区间提供轴值可手算的小数据：上下边界、虚线、标记、纹理、Y轴对应颜色；核对裁切／超出值域规则。
4. 用同页两个不同区间／纹理实例检查定义ID及引用不串；复用已有pattern，不另建纹理引擎。
5. 生成作用域utilities并运行检查；在Bar和Line各验证一例，再扩展到其它适用图族。

**检查：**`[T04]` 验证真实坐标映射、层级、提示读取及实例隔离，不以“存在SVG”作为区间正确的证据。

### T05：补3D与方块柱

**文件：**新增 `vendor/charts/bar-depth.tsx`、`bar-squares.tsx`；公开入口、来源锁、`registry/charts.json`；`chart-variants/bar.tsx`。

1. 接入现有Bar的背面→柱体→前面→可选脉冲顺序；不建立第二套柱尺度。
2. 3D堆叠用逐段侧面，数据选择互斥类别；检查每段Tooltip、累计轴与侧面高度。
3. 方块柱接入已有方块布局和吸附参数，搭配轨道、渐变和圆角方环指示器。
4. 检查0值、单柱、长类别、窄容器及两实例；零柱最小高度与柱主体规则一致。
5. 记录上游密集柱背面省略等表现边界，检查层叠、透视方向和交互遮挡；不因顶部立体面改变读数。

**检查：**`[T05]` 覆盖层／值对应和同页隔离；3D材质与形状比例另做真实动态视觉审阅。

### T06：完成Bar整页21项并形成页面样板

**文件：**`chart-variants/bar.tsx`、`chart-variants.ts`、图库样式、Bar合同、E2E及新证据。

1. 按台账补齐单系列、两系列、横向、密集、无间距、纹理、Tooltip、单／双轴及Loading；复用已完成的分组、堆叠、渐变样本。
2. 官网90日主交互和60日密集样本使用明确日期与足够宽卡；有限标签不能导致Tooltip指向错柱。
3. 既有七类数据状态集中呈现；分组与堆叠的数据语义保持分离。
4. 每项有自己的代码、数据读取和必要操作；全部21来源ID唯一可访问。
5. 运行桌面／中等／窄屏、正常／减少动效检查，保留逐卡效果与关键动效证据。
6. 汇总Bar视觉对照供用户审阅；技术与数据问题修复后继续可并行的其他任务，不能自行登记用户已通过。

**完成条件：**21/21有实际渲染与可复用源，5+8+8初始分类均有对应结果；样板页面结构可用于其它图族。

### T07：补Brush、预测线、事件标记

**文件：**第4.1节BRUSH／PROJ／EVENT共11文件；`packages/ui/package.json`、锁文件、公开入口、来源锁、`registry/charts.json`；`chart-variants/trend.tsx`。

1. 声明固定版本 `@visx/brush@3.12.0`，用现有工作区工具更新锁文件；检查React与Visx类型／运行兼容，不笼统升级依赖。
2. 接入Brush五文件，用可手算时间窗口检查左右柄、移动、边缘、重置、坐标与Tooltip；提供键盘可达的等价范围控件或原生支持路径，不能只给鼠标操作。
3. 接入预测线及两个端点部件，区分已观测与预测数据，核对锚点、远端圆点、范围与提示含义。
4. 事件注释用ChartMarkers／MarkerGroup和现有图标来源，不引入上游图标库；长标记和靠边标记需可读。
5. Brush与Projection单独展示；源代码、合同和选项中均不制造不支持的组合。

**检查：**`[T07]` 校验范围筛选／轴／Tooltip一致、事件标记关联、预测端点；最小新增逻辑检查覆盖边界而非复刻源码。

### T08：完成Area、Line、Composed的52项

**文件：**`chart-variants/trend.tsx`、目录映射、三份图型Manifest；从现有依赖公开实际需要的 `curveStep`、`curveCatmullRom` 及菜单曲线最小集合；E2E。

1. Area按19项补曲线、材质、标记、虚线尾、双Loading、临时拖选、轴及共有背景／参考带；Stacked名称保留来源映射，中文说明准确表达叠层。
2. Line按19项补直线／标记／多线／轴／加载／拖选，并装配三线Brush主示例、独立预测、事件标记；盈亏卡复用既有实现。
3. Composed按14项补柱线、柱双线、分组无间隔、互斥堆叠、纹理、标记与虚线尾、单／双轴和共有读数层。
   Area／Composed首屏保留官网曲线选择交互，同组面积／折线同步切换；Line Trio保留其Catmull–Rom等实际曲线设定。检查切换后的几何、提示定位、范围状态和当前复制源码一致，不能用静态曲线替代菜单后仅按卡片数量验收。
4. 各组使用稳定日期和单位；双轴说明归属，不用两条接近的曲线暗示数值相等。
5. 保留现有96×40迷你趋势，不强行塞入复杂标记／双轴；验证原默认趋势、端点、轴距及更新未退化。

**完成条件：**19+19+14项逐条对应；虚线尾、预测、拖选与范围缩放含义明确；所有可见组合可独立消费。

### T09：完成Pie、Ring、Radar的21项

**文件：**`chart-variants/radial.tsx`、目录、三份Manifest、E2E；底层仅在真实缺陷需要时补丁。

1. Pie／Donut的9项分别显示纹理、渐变、图例、悬停伸长和自定义中心；同色标贯穿扇区、图例与提示。
2. Ring的6项用已有端帽、厚度、起止角和图例组合完成；半圆与270°重新核对中心读数位置。
3. Radar的6项用3／5／6维真实小数据完成，单系列／极简／仅网格不新建组件。
4. 针对零总量、独立进度分母、长中心文案、雷达归一化分别检查；悬停伸长不能被卡片裁切。

**完成条件：**9+6+6项齐全，构成环饼与独立目标进度环的数据合同没有混用。

### T10：完成Scatter、Funnel、Gauge的32项

**文件：**`chart-variants/comparison.tsx`、目录、三份Manifest、E2E。

1. Scatter的10项复用点／环参数和双轴，接入共有背景／参考带；保留Date横轴与非负Y的范围说明。
2. Funnel的9项覆盖横竖、曲直、颜色／渐变／纹理、标签及网格，核对竖向长标签与固定阶段分母。
3. Gauge的13项覆盖角度、刻度密度／长短／圆角／深度、前后景材质和线形标签。按实际角度核对，不凭官网标题quarter推断弧长。
4. 检查0／中值／100、独立读数与几何，保持既有中心和线性标签布局修正；新形态调整不污染默认样本。

**完成条件：**10+9+13项齐全；单图小卡宽度足够，复杂示例提升宽卡而非缩字。

### T11：完成Heatmap、Choropleth、Sankey、Sunburst的24项

**文件：**`chart-variants/structure.tsx`、目录、四份Manifest；如需世界地图新增 `chart-variants/data/world.geojson` 与 `chart-variants/data/README.md`；E2E。

1. Heatmap的11项用既有加载、分隔、纹理等级、渐变图例、星期配置、悬停放大组合；固定格宽加局部横滚宿主，不另造热图布局引擎。
2. 检查跨月／季度、周一起始与星期标签、0与缺测、滚动后的Tooltip定位；不能只换轴文字而不重排日期。
3. Choropleth的5项增加分析配色、纹理、经纬网和交互示例；世界数据固定来源／版本／许可、稳定地区ID，保留现有示意地图样本及说明。
4. Sankey的5项复用图形与节点／流线样式，核对无标签、简化网络和纯色流线；不因缺少标签丢失精确读取路径。
5. Sunburst的3项补纹理与当前层级图例；使用现有受控focus／hover和通用图例组合，不必新增专用图例框架。
6. 检查下钻／返回后图例索引同步、总量只由叶项求和、地图无值不填零、流量单位和守恒解释。

**完成条件：**11+5+5+3项齐全；地图若来源数据未解决仍记缺口，不能用空图充数。

### T12：完成Candlestick、Live Line的20项并保留盈亏入口

**文件：**`chart-variants/special.tsx`、目录、相关Manifest、E2E；复用已有盈亏样本。

1. K线11项补不同方向色／渐变／纹理、仅提示框、指示器及共有背景／参考带；开高低收和指示线共用数据身份。
2. Live9项补不同前沿偏移、动量色、纯折线及共有读数层；每卡使用有界生产者，单位为Unix秒。
3. 应用T02的离屏和后台停止规则，验证多个实时实例互不覆盖、手动暂停优先、恢复不积累循环。
4. 盈亏独立页继续保留零线、正负分段、过零读数；与Line来源条目共用实现，避免两份维护。

**完成条件：**11+9项齐全，17个Rain入口都可达；静态截图之外有持续更新／停止／恢复证据。

### T13：同步候选合同、Registry和独立消费

**文件：**17份 `manifests/ui/chart-<id>.yaml`；`registry/charts.json`；`docs/ai/charts.md`；共享README；来源锁；由现有生成器产生的资产索引；新消费目录。

1. 将每个变体的真实调用、适用范围和限制写入对应图型合同；仍保持17个候选资产，不创建170个Registry项目。
2. 汇总核对T04／T05／T07已按批登记的15文件、必要本地补丁与真实哈希；Registry共享及逐图文件闭包覆盖全部新增公开入口所需依赖。
3. 运行T01建立的固定清单／磁盘／Registry三方检查，核对所有增量均已入账；不能简单删掉commit、数量来源或哈希约束以求通过。
4. 更新精确颜色消费登记：只有确实新增颜色／文件时扩展本次范围，保留旧授权记录，不把白名单放宽成任意CSS。
5. 在全新的隔离消费宿主编译所有已交付卡片的源码闭包；依赖解析不得依赖Playground的软链接、别名或父项目node_modules。
6. 保留两个新的实际组合验证：①密集柱／3D堆叠＋参考区间；②Brush趋势＋独立预测或日历／层级分析。包含替换数据、两实例、配色切换、窄屏和必要状态。
7. 使用现有资产索引生成／校验流程；不手改生成索引。完成公开导入、样式隔离、来源与下载一致性检查。

**完成条件：**展示代码可迁移、Registry闭包真实完整、17份合同不夸大能力；发布仍为unpublished。

### T14：全目录验收与交接

**文件：**覆盖台账、本计划状态、新 `evidence/runtime/chart-variants/<run>/verification.md`、逐项结果与用户反馈记录。

1. 在最终源码上核对170项都有来源映射、真实实例、操作说明和可编译源码；17入口无遗漏。
2. 跑最小逻辑／合同检查、类型检查、构建与新增浏览器检查；按照影响范围回归默认17图、原型图库和原四样本／旧G2。
3. 逐卡滚入视口后检查并截图；含虚拟启动的全页截图只记录排版，不当成所有图形已渲染的证据。
4. 按共享动效和独有交互采集动态片段／测量，其它卡逐项实际操作记录；零浏览器异常、实例引用正确、无资源累积。
5. 分批提交给用户视觉审阅，保留每项待审／已确认／需修正；不自动通过用户Gate，也不把旧蓝灰确认重复归零。
6. 若存在缺项或实质缺陷，报告准确ID、原因及剩余工作；不得以“170个卡片DOM”代替完整交付。

**完成条件：**技术交付与用户视觉状态分别可查；已完成项、待用户决定项和范围外边界清晰，未授权发布状态保持独立。

## 6. 验证组织与执行命令

### 6.1 保持小而有效的检查集合

| 组 | 覆盖内容 | 通过依据 |
| --- | --- | --- |
| 目录／复制合同 | 170来源唯一、17入口、卡片及源码映射、当前配色 | 实际元信息与源码编译，无幽灵条目 |
| 新部件和数据 | 3D／方块柱、参考区间、双轴、Brush、预测和日期布局 | 可手算数据对应真实几何与提示 |
| 同页隔离 | 局部更新、图例、源码面板、所有defs引用 | gradient／pattern／mask／clipPath ID唯一且引用存在 |
| 生命周期 | Loading往返、中断、离屏／返回、后台／恢复、卸载 | 实际回调和数据停止／恢复，焦点和用户选择保留 |
| 消费与回归 | 公共入口、干净宿主、样式隔离、原默认效果 | 编译／运行证据与相应视觉比较 |

对170项都检查实际渲染、错误和可读数据；不要求每一项执行同一套不适用交互。共享实现验证可复用，但每项仍有适用性和执行结果。宽度覆盖1440／900／390及卡片实际宽度；正常／减少动效分别检查。每变体先用其默认适用配方，关键材质再与已确认蓝灰配方对照；不做无意义全排列。

### 6.2 旧测试必须调整的假设

- 页面不再只有一个图；源码区、状态、更新按钮、系列数、仪表形态等都先限定到当前具名卡。
- 不能用 `svg.first()` 假定找到主绘图区；图标、背景也可能是SVG。使用本卡主图Part。
- 懒启动卡先滚到可见范围，再等待真实就绪；不把尚未激活的卡判为渲染通过。
- 多实例检查基于指定变体的两个实例；defs重复检测仍对全页进行。
- 保留原默认17图和蓝灰配方回归，将定位限定到默认预览，不因新增卡导致旧检查悄悄指向另一卡。

### 6.3 服务与静态检查

现有Playwright配置没有 `webServer`，不会自动启动应用。`charts-playground.spec.ts` 还包含对5387原型图库的访问，因此完整回归需要两个服务。执行前确认服务属于本工作区；空闲时才启动，不关闭其他任务的服务：

```sh
pnpm --filter @rain-next/playground dev --port 5173 --strictPort
pnpm --filter @rain-next/prototype dev --port 5387 --strictPort
```

新增 `chart-variants.config.ts` 沿用当前配置风格、单worker、零重试和5173，使用 `RAIN_CHART_VARIANTS_EVIDENCE_DIR` 保存截图／事实。不同服务地址应明确可配置；若端口被占用，配置与命令一起调整，不能运行到错误工作区。

```sh
# 新增源码带来utilities时先生成；其它时候只检查
node scripts/generate-chart-styles.mjs
node scripts/generate-chart-styles.mjs --check

# 合同、逻辑和公共样式相关检查
pnpm exec vitest run scripts/charts.test.ts scripts/chart-color-consumers.test.ts packages/ui/src/charts/chart-motion.test.tsx
node scripts/asset-index.mjs --check
pnpm --filter @rain-next/ui typecheck
pnpm --filter @rain-next/playground typecheck
pnpm --filter @rain-next/prototype typecheck
pnpm exec tsc --noEmit --project tsconfig.tests.json
pnpm --filter @rain-next/playground build
pnpm --filter @rain-next/prototype exec vite build --config vite.bklit-catalog.config.ts
```

若T02新增 `chart-variant-gallery.test.tsx`，按该精确路径运行后加入本批清单；不存在的测试不能记通过。安装依赖和上述生成／运行操作全部属于未来实施，不在本轮执行。

### 6.4 每轮独立证据目录

截图目录与Playwright `--output` 是两套设置，必须同时指定。以下为未来执行命令；新增配置／spec建好后才可运行：

```sh
mkdir -p evidence/runtime/chart-variants
CHART_RUN_DIR="$(mktemp -d "$PWD/evidence/runtime/chart-variants/run-XXXXXX")"
mkdir -p "$CHART_RUN_DIR/variants-batch" "$CHART_RUN_DIR/variants-final" "$CHART_RUN_DIR/catalog" "$CHART_RUN_DIR/playground" "$CHART_RUN_DIR/native" "$CHART_RUN_DIR/g2"

# 单批：将T06替换成当前任务；实际匹配测试数必须大于0
RAIN_CHART_VARIANTS_EVIDENCE_DIR="$CHART_RUN_DIR/variants-batch" pnpm exec playwright test --config tests/e2e/chart-variants.config.ts --grep '\[T06\]' --output "$CHART_RUN_DIR/variants-batch-results"

# 最终全量新增示例
RAIN_CHART_VARIANTS_EVIDENCE_DIR="$CHART_RUN_DIR/variants-final" pnpm exec playwright test --config tests/e2e/chart-variants.config.ts --output "$CHART_RUN_DIR/variants-final-results"

# 原图库与文档默认基线
RAIN_BKLIT_CATALOG_EVIDENCE_DIR="$CHART_RUN_DIR/catalog" pnpm exec playwright test --config tests/e2e/bklit-catalog.config.ts --output "$CHART_RUN_DIR/catalog-results"
RAIN_CHART_PLAYGROUND_EVIDENCE_DIR="$CHART_RUN_DIR/playground" pnpm exec playwright test --config tests/e2e/charts-playground.config.ts --output "$CHART_RUN_DIR/playground-results"

# 共享底座变化／最终节点才扩展到历史对照与G2，不逐卡重复
RAIN_BKLIT_EVIDENCE_DIR="$CHART_RUN_DIR/native" pnpm exec playwright test --config tests/e2e/bklit-rain-validation.config.ts --output "$CHART_RUN_DIR/native-results"
RAIN_CHART_EVIDENCE_DIR="$CHART_RUN_DIR/g2" pnpm exec playwright test --config tests/e2e/chart-library-validation.config.ts --output "$CHART_RUN_DIR/g2-results"
```

新截图名包含图型、变体ID、配方、状态、尺寸、动效模式；重复运行使用新的目录。旧 `chart-trend-motion.spec.ts` 截图目录写死，本任务不直接重跑它覆盖历史；确实需要时先给它独立证据目录输入。独立消费也使用新目录／新临时宿主／新fixture版本，不在旧归档内重建。

每轮记录实际命令、退出码、匹配测试数、源码与来源锁哈希、浏览器错误、失败原因及修复结果。失败不能通过删除断言、缩窄测量或扩大容差隐去。

## 7. 逐项交付与人工审阅

实施时的结果记录至少包含：

`来源ID | 本地页/卡 | 实现 | 数据/交互检查 | 代码消费 | 视觉审阅 | 证据链接 | 限制`

- 实现：待做／进行中／已实现。
- 自动与消费：未运行／通过／失败；不适用需理由。
- 视觉：待用户审阅／用户已确认／需修正，保留确认时间与具体范围。
- 170来源项和额外Rain状态项分别计数，不能混在一个分母里。

人工关注：3D前后层与材质、方块比例、纹理密度、背景和数据主次、参考带读数、双轴解释、密集图可读性、入场／随动／更新／恢复、窄屏和长标签。自动截图／类型检查不替代这些判断。

以下阻止对应项完成：无真实图形；错误数值／尺度／分母；提示与图不一致；必要信息裁切；实例串色；复制代码缺依赖；离屏／卸载持续生产数据；减少动效仍强制持续脉冲；键盘无法到达必要控件且没有可用等价路径。

整体技术交付要求170/170来源映射与可运行示例、17/17入口、所有公开导出源码可编译且干净消费成立。用户视觉状态独立结算；未确认的项明确保留待审，不能由技术通过推导发布、系统认可或生产采用。

## 8. 原规划阶段文档检查记录

原规划阶段只进行来源／文件／接口调查及文档完整性检查；没有启动应用、安装依赖或运行应用测试。已完成两次独立只读审阅，并补入批次与最终证据分目录、登记和闭包逐批同步、实时暂停窗口跨卸载恢复、曲线菜单与源码同步等修订。最终文档校验覆盖170项计数与ID唯一、15个补件、15个任务、统计一致性及本地链接；这些检查只证明方案文档一致，不证明任何新增图表已实现或通过运行验收。


## 执行记录 · 2026-10-08

已完成 T00—T14 的本地实现、技术验收与交接，170 个稳定 ID 精确对应冻结参考，分布于17入口、6个示例模块；T13/T14已完成最终闭包、浏览器验收及逐项待审记录。所有新增卡独立拥有更新、重播与交互选择；240px预加载与真实0px可见范围分开；离屏/后台停止持续工作，普通原生子树保持挂载以保留缩放和滚动。

源码补件为16文件、179个vendor源码闭包，保持固定上游commit。新增部件还需要segment.tsx，原始15件清单为规划快照。共享修复包括方块柱与3D柱实例标识、热图零值/缺测与纹理标识、实时暂停和手动时钟推进、饼图首次Motion路径初始化；每项均登记在source-lock并用真实原生回归检查。

基线与最终证据从 [run-_tv8jhva](../../evidence/runtime/chart-variants/run-_tv8jhva/baseline.md) 追踪。源码消费使用隔离的完整本地候选包与复制的既有安装缓存，不宣称干净安装；170份源码独立构建并检查所有模块路径没有逃逸。旧17默认入口、原型目录和独立G2实验仍分开记录。

新增视觉Human Gate待用户审阅；既有15图型蓝灰配方认可保留。无Figma修改、发布、生产迁移或Git提交。

### T00—T14完成依据

| 任务 | 本地完成依据 |
| --- | --- |
| T00 | baseline.md冻结工作区、默认17入口、旧163文件及服务 |
| T01 | 固定170ID/16家族/17入口，运行集合精确相等 |
| T02 | 两级观察器、状态保留、离屏/后台/减少动效停止与清理 |
| T03 | 当前参数和可继续交互下载入口，170份独立源码编译 |
| T04—T05 | 16补件含segment，179锁/磁盘/Registry闭合；背景/参考带 |
| T06 | Bar21、90/60日期、3D/方块柱/双轴与读数 |
| T07—T08 | 趋势52、Brush鼠标键盘/受控复现、预测/事件/六曲线/拖选 |
| T09 | 径向21，0值/长文案/真实路径 |
| T10 | Scatter/Funnel/Gauge32，日期/图层标签/0与百分比 |
| T11 | 结构24，日历/世界几何/流量/层级及离屏状态 |
| T12 | Special20，实时冻结/hover/手动追加/重播、盈亏独立页 |
| T13 | 17合同/186Registry源文件、170源码与2新组合，索引生成校验 |
| T14 | 81单测、3类型/2构建、340动作/340宽窄审计/340截图与pending清单 |

命令、退出码、初始失败及修后证据见[本轮验收](../../evidence/runtime/chart-variants/run-_tv8jhva/verification.md)。技术完成不通过新增视觉Human Gate，也不改变既有蓝灰配方认可范围。
