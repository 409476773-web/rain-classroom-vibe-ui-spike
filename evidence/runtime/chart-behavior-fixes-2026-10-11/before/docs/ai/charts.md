# Rain 图表：按业务问题选图与接入

先写清希望读者回答的问题，再确定数据口径、图表组合与必要操作。本页是默认选型入口；图表目前为本地未发布候选，能力与确认范围按 2026-10-10 的登记查阅。

- **我要选图：** 从下方[业务问题](#按业务关系选图)开始，选定后补齐[一份用法说明](#每个用法要说明什么)，再查看对应实例。
- **我要接入：** 直接到[AI 与开发接入指引](#ai-与开发接入指引)，查公开 API、基础样式、宿主责任、最短示例与完整源码。
- **我要查某种图的能力：** 读[完整能力清单](chart-capabilities.md)，覆盖 19 个入口、170 个来源展示变体、10 套具名配方及 5 类业务入口。
- **我要判断能用到什么程度：** 读[分范围状态](chart-capabilities.md#6-实现验证与用户确认)。已有实现、对应业务样本、技术验证、用户确认与发布各自记录。

2026-10-10 第一批已接通默认折线／面积／组合的缺测读数、条柱全零说明和旭日默认键盘下钻。选择默认趋势“缺测”可查看部分缺测、真实0与零分母；更新到第2次为全部缺测，随后循环恢复，mini末值缺测保留原槽。旭日“长标签”提供额外内容层级，Enter／Space进入下级，面包屑返回并保持可见焦点。实际入口、检查和独立体验确认见[本次审阅](../../evidence/runtime/chart-experience-first-batch/run-7ccz8fjn/human-review.md)与[技术记录](../../evidence/runtime/chart-experience-first-batch/run-7ccz8fjn/verification.md)。

## 按业务关系选图

以下推荐以当前 Rain 能力和已有业务样本为依据。仅需查一个精确值、阅读原文或核对明细时，先使用文字或表格；需要读取形态、差异或关系时再加入图形。

### 常见业务问题

| 业务问题 | 先选 | 选择条件与必要说明 |
| --- | --- | --- |
| 哪些学院／课程更多，排名或评分有何差异？ | [柱／横条、DataBar](../../manifests/ui/chart-bar.yaml) | 类别唯一、非负、零基线；同组共用量程，评分保留满分。只比较类别数值时用条柱；表格内用 DataBar 配精确数字。见 `/#chart-business`，版本评分见 `/#chart-category` |
| 随日期、学期或版本怎样变化？ | [折线](../../manifests/ui/chart-line.yaml)、[轻面积](../../manifests/ui/chart-area.yaml) | 日期用真实 Date；学期／版本用有序分类。少量趋势可用细线配轻面积，缺测保留断口；透明面积叠加不表示总和。分类实例见 `/#chart-category` |
| 本期和上期走势有何不同？ | 两条折线／轻面积，按需用[组合](../../manifests/ui/chart-composed.yaml) | 先确定按相对天序、星期或教学周对齐，保留各期真实日期；缺尾不补 0，两期面积不堆叠。见[周期对照](#分类趋势与周期对照) |
| 人数与完成率／覆盖率怎样一起比较？ | [组合](../../manifests/ui/chart-composed.yaml)或并列小图 | 同图时人数与比率分轴，完成率明确为 `completed/enrolled*100`，0 分母标不适用；覆盖率另说明自己的分子分母。两轴量纲明确，图形接近不表示数值相等。学院／知识点实例见 `/#chart-category` |
| 整体由哪些部分组成，各占多少？ | [饼／环饼](../../manifests/ui/chart-pie.yaml)、分段条或[堆叠条柱](../../manifests/ui/chart-bar.yaml) | 类别互斥、完整、非负；总和为 0 时不生成比例，缺项时不声称完整构成。参与人数与完成人数有重叠，不能相加堆叠 |
| 一个或多个目标完成了多少？ | [进度环／弧](../../manifests/ui/chart-ring.yaml)、单目标[仪表](../../manifests/ui/chart-gauge.yaml) | 每项保留自己的 `value/maxValue`，独立分母不合并；零目标不造进度，超目标明确解释。仪表先归一到 0—100；小环／弧见 `/#chart-business` |
| 多个能力维度的轮廓有什么差异？ | [雷达](../../manifests/ui/chart-radar.yaml) | 固定维度顺序，统一到 0—100并说明归一方法；需要精确排名时补条形或表格；缺测不当成 0 |
| 哪些具体日期更活跃？ | [日历热图](../../manifests/ui/chart-heatmap.yaml) | 保留真实日期、每周 7 天及周起始；0 与缺测分开，不能按数值重新排列日期 |
| 哪些时段、课程组合、相似度或支撑关系更集中？ | [分类矩阵](../../manifests/ui/chart-matrix.yaml) | 两条轴均为明确类别；强度／相似度用热度，数量可用面积气泡，支撑等级用等级点，学期步值显式列出。0、缺测、不适用分开；五组实例见 `/#chart-matrix` |
| 哪些知识点／课程相互连接，连接是什么关系？ | [关系网络](../../manifests/ui/chart-network.yaml) | 节点类别、关系类型和方向分别说明；位置、距离、圆面积与线宽不表示权重。通过列表、邻接预览与固定详情读取，当前范围见 `/#chart-network` |
| 人次或数量从哪里来，流向哪里？ | [桑基](../../manifests/ui/chart-sankey.yaml) | 节点引用有效、权重非负，单位和流量守恒由业务核对；人次不等于去重人数 |
| 固定流程在哪个阶段转化或流失？ | [漏斗](../../manifests/ui/chart-funnel.yaml) | 明确阶段顺序、入口分母和是否为同一批对象；阶段增长不直接解释为流失，零入口不造比例 |
| 层级结构各占多少，需要逐层查看吗？ | [旭日](../../manifests/ui/chart-sunburst.yaml) | 父值由叶项求和，不重复累加父项；保留面包屑返回和叶项精确表；零总量不生成假构成 |
| 地区之间有什么差异，需要下钻查看吗？ | [分区地图](../../manifests/ui/chart-choropleth.yaml) | 明确比较总量还是归一后的强度，按稳定地区 ID 关联几何与值；同层共用色阶，无值不补 0。全国／省内量程分别解释，见 `/#chart-china` |

### 更多数据形态

| 业务问题 | 先选 | 当前使用边界 |
| --- | --- | --- |
| 不同日期分别观测到了什么数值？ | [时间散点](../../manifests/ui/chart-scatter.yaml) | X 为 Date、Y 非负；任意数值 X/Y 相关性尚未支持 |
| 相对 0 基准出现了哪些正负变化？ | [盈亏线](../../manifests/ui/chart-profit-loss.yaml) | 与 LineChart 和注册值域的 Line 配合，说明零基准、正负号和单位；正负不自动表示好坏 |
| 即时观测正在怎样变化？ | [实时折线](../../manifests/ui/chart-live-line.yaml) | 时间戳为 Unix 秒；业务页面承担订阅、有界缓冲、暂停和卸载清理；不是按固定间隔重播静态趋势 |
| 每个时间段的开、最高、最低、收值是什么？ | [K 线](../../manifests/ui/chart-candlestick.yaml) | 需真实且合法的 OHLC 数据；不以普通均值／最大最小值拼造开收；方向色不自动表示业务好坏 |

任意 XY、箱线图、真正累计堆叠面积、图编辑等未覆盖需求，先查[明确缺口](chart-capabilities.md#7-明确缺口与后续工作)。不能根据相似外观或变体名称推导当前已经支持。

### 选定问题后再选展示方式

1. **确定数据与读数：** 明确对象、时间范围、单位、分母、同组量程和缺测含义；图形、图例、提示及明细使用同一口径。
2. **确定放置位置：** 独立图、表格、指标卡或列表沿用相同业务语义，再选择尺寸、标签和横滚方式。迷你是一种嵌入配方，见[迷你双尺寸与宿主选择](#迷你双尺寸与宿主选择)。
3. **确定表现与操作：** 按系列身份和数值编码选择[Rain 配方](#统一基础选择配方)，再确认逐图实际支持的图例、提示、筛选、范围选择和下钻。配色、尺寸与170展示变体不作为首页的业务问题分类。

## 每个用法要说明什么

以下是用法文档的组织方式，不新增公共组件或配置格式。已有业务实例与今后接入的页面，都按同一顺序把选型依据和使用条件讲清楚。

| 说明项 | 必须回答的问题 |
| --- | --- |
| 业务问题与建议组合 | 读者要判断什么？推荐哪种图，什么条件下换成另一种？ |
| 数据口径 | 对象、粒度、单位、分母、排序和量程是什么？是否缺测或不适用？ |
| 必要读数 | 标题、主要数值、图例、提示和精确明细各自承载什么信息？ |
| 操作与反馈 | 可以预览、选择、筛选、缩放或下钻什么？临时状态、固定选择和返回怎样区分？ |
| 嵌入方式 | 放入独立区域、表格、卡片还是列表？长名称、窄容器与迷你尺寸怎样处理？ |
| 状态与限制 | loading、empty、error、0、缺测、无效值、超域分别由谁处理？当前规模和交互有哪些边界？ |
| 实例与接入 | 从哪个实例、公共 API 和完整文件集开始？业务页面还要提供哪些数据与状态？ |
| 已有证据 | 已有实现、业务样本、技术检查和用户确认分别覆盖什么？引用对应记录，不合并成一个“已完成”标签 |

以下七类核心用法把业务问题接到现有实例、完整源码与状态说明。全部以当前 Mock 示例为起点；特殊图型继续按上方“更多数据形态”和逐图合同接入。

### 数量比较与两期趋势

| 说明项 | 课程列表：比较参与人数 | 趋势报告：比较本期与上期 |
| --- | --- | --- |
| 问题与选型 | 看谁更多，用人数文字＋DataBar；目标完成度有独立分母时另选进度图 | 看走势与同期差异，用两条轻面积／折线并保留独立值；只比较某一时点时可用条柱 |
| 数据口径 | 在声明的比较集合上求共同 maxValue；筛选不暗改尺度 | 声明对齐方式及每期真实日期；同量纲共域，尾部缺测保留 null |
| 读数与操作 | 人数始终可读；排序／筛选属于列表，图形不新增未定义的点击动作 | 图例保持两期身份，提示和精确表保留各期日期与值；分类模式不套用时间 Brush |
| 嵌入与状态 | 表格沿用紧凑条配方；0 与未获取数据不同，loading／失败由列表承接 | 独立趋势区域；缺测留断口，无数据或请求失败由报告页面说明 |
| 接入入口 | `/#chart-business`、[DataBar 最短示例](#最短可复用示例)、[embedding-examples](../../apps/playground/src/docs/components/chart-business/embedding-examples.tsx) | `/#chart-category` 的 CH-049、[分类趋势与周期对照](#分类趋势与周期对照)、[comparison-data](../../apps/playground/src/docs/components/chart-business/comparison-data.ts) |
| 证据边界 | 现有嵌入与尺寸记录可查；新列表数据与页面仍需检查 | CH-049 已有限定视觉确认；新周期口径和新数据不自动继承确认 |

### 完整构成：课程学习状态各占多少

| 说明项 | 使用方式 |
| --- | --- |
| 业务问题与建议组合 | 查看“已完成／进行中／待开始”的完整构成，用 Pie 饼／环饼或 MiniSegments 分段条；需要精确比较类别大小时选条柱 |
| 数据口径 | 同一对象集合、同一时点，类别互斥且完整；先核对非负数量，再以各项总和为分母；参与人数与完成人数不能相加成构成 |
| 必要读数 | 保留分类名称、数量、总量与比例；中心数字说明是总量还是当前分类，图例与扇区颜色对应 |
| 操作与反馈 | 独立饼沿用扇区／图例聚焦；表格和卡片中的小图配外置精确文字，不为图形附加未定义的筛选或跳转 |
| 嵌入方式 | 独立构成见 /#chart-pie；表格、卡片和列表见 /#chart-business，小饼／环饼按 compact／comfortable 配方选择 |
| 状态与限制 | 总和为0时说明零总量，不生成假扇区；任一构成项缺测时不能声称完整占比；负数、非有限值拒绝。请求失败与数据缺测按下方宿主规则区分 |
| 实例与接入 | 从 [MiniPie／MiniSegments](../../apps/playground/src/docs/components/chart-business/mini-examples.tsx) 和 [构成数据](../../apps/playground/src/docs/components/chart-business/mini-data.ts) 开始；在 /#chart-business 保存全部下载文件，独立 Pie 则保存本页默认源码文件集；不要只复制图形函数 |
| 已有证据 | [双尺寸记录](../../evidence/runtime/chart-mini-refinement/verification.md)和[排版记录](../../evidence/runtime/chart-mini-typography-feedback-2026-10-09/verification.md)提供技术依据；当前迷你细节视觉仍待确认，新业务分母重新检查 |

### 独立目标：课程完成了多少

| 说明项 | 使用方式 |
| --- | --- |
| 业务问题与建议组合 | 比较一个或多个目标的达成程度，用 Ring／MiniProgress；需要单目标刻度表达时用 Gauge |
| 数据口径 | 每项独立保留 value 与 maxValue；20/80为25%，不同目标不合并分母。Gauge 接收归一后的0—100，原始目标和单位留在宿主读数中 |
| 必要读数 | 目标名称、当前完成量、目标总量与百分比；紧凑环外置读数，舒展弧可用中心百分比，原始分母仍可查 |
| 操作与反馈 | Ring 沿用当前环／图例联动；Gauge 以数值展示和更新为主，业务操作由具名控件承担 |
| 嵌入方式 | /#chart-ring、/#chart-gauge 查看独立图；/#chart-business 查看卡片、表格和列表中的小环／开口弧 |
| 状态与限制 | 正目标下0与100%有效；0/0标不适用，正值/0及负数／非有限值非法；缺测标缺测。现有迷你配方把超目标标为“超出范围”，宿主解释原因，不静默截为100% |
| 实例与接入 | 从 [MiniProgress](../../apps/playground/src/docs/components/chart-business/mini-examples.tsx) 和 [getProgressReading](../../apps/playground/src/docs/components/chart-business/mini-data.ts) 开始；业务页保存完整文件集，公开 Ring API 见 [图表 README](../../packages/ui/src/charts/README.md) |
| 已有证据 | [迷你尺寸与状态](../../evidence/runtime/chart-mini-refinement/verification.md)、[排版与更新](../../evidence/runtime/chart-mini-typography-feedback-2026-10-09/verification.md)为已有技术记录；不等于所有目标口径、小尺寸视觉和设备体验已通过 |

### 二维关系：哪些时段或课程组合更集中

| 说明项 | 使用方式 |
| --- | --- |
| 业务问题与建议组合 | 星期×小时强度、课程相似度用热度；分类×学院数量用面积气泡；离散支撑关系用等级点；真实日期全年分布另选日历热图 |
| 数据口径 | 行列稳定 ID、唯一单元格坐标、明确顺序；数量按面积映射，相似度保留0—1固定域，课程版本学期显式使用1—8步值；不伪造 Date |
| 必要读数 | 行名、列名、值及单位、色阶／面积／等级图例；0、缺测、不适用各自可读，相似度不自动补齐对称值 |
| 操作与反馈 | 沿用单一键盘入口、方向键、Home／End／Escape、指向提示与图例联动；重排后仍按行列 ID 读取同一对象 |
| 嵌入方式 | /#chart-matrix 提供5组样本，宽矩阵在自身容器内滚动并保留行标题；当前覆盖12×12与7×24，更大规模另测 |
| 状态与限制 | 空轴与非法重复坐标分别说明；缺测和不适用不绘制成0。请求状态由宿主承担，交互区域缩窄后仍需检查键盘与精确表 |
| 实例与接入 | 使用 [matrix-examples](../../apps/playground/src/docs/components/chart-business/matrix-examples.tsx) 和 [matrix-data](../../apps/playground/src/docs/components/chart-business/matrix-data.ts)；在矩阵页“调用配置、完整源码与示例数据”保存全部文件，不从迷你业务页复制矩阵 |
| 已有证据 | [矩阵交互](../../evidence/runtime/chart-matrix-refinement-2026-10-09/verification.md)与[独立页面](../../evidence/runtime/chart-matrix-page-separation-2026-10-09/verification.md)有技术记录；最新视觉／交互仍待确认 |

### 关系浏览：哪些课程或知识点相互连接

| 说明项 | 使用方式 |
| --- | --- |
| 业务问题与建议组合 | 查看先修、相似、支撑或反馈关系，用 Network；数量流向用 Sankey，层级构成用 Sunburst，三者按问题区分 |
| 数据口径 | 节点／边稳定 ID、有效端点；节点类别、关系类型、方向分别编码。权重只供读数，位置、距离、圆面积与线宽不表示权重 |
| 必要读数 | 当前节点完整名称、类别、关联节点、关系类型和方向；固定详情与临时预览分开，节点／关系精确表保留完整信息 |
| 操作与反馈 | 指向或键盘聚焦临时预览，点击／Enter固定节点详情；Escape、空白或清除按钮解除。筛选先作用于完整布局，过滤选中节点时清除选择 |
| 嵌入方式 | /#chart-network 的4组样本提供 glow／structured；当前组件宽度不超过620px时使用完整关系列表，选择和详情继续可用 |
| 状态与限制 | 空图、单节点、非法端点、重复 ID 等按现有合同处理；未提供权重与权重0分开。当前样本8—11节点、10—19边，不承诺任意密集布局或图编辑 |
| 实例与接入 | 使用 [network-examples](../../apps/playground/src/docs/components/chart-business/network-examples.tsx) 和 [Network 接入说明](../../packages/ui/src/charts/network/README.md)；业务页保存当前场景／筛选／样式的完整文件集，并加载 Rain UI 根样式与既有样式桥接 |
| 已有证据 | [体验与用户确认](../../evidence/runtime/chart-network-experience-2026-10-10/verification.md)覆盖当前4组本地样本；新布局、完整对比度及实体设备继续单独验证 |

### 地域比较：哪些地区不同并可逐层查看

| 说明项 | 使用方式 |
| --- | --- |
| 业务问题与建议组合 | 比较地区总量或归一强度，用 Choropleth；只需精确排名时可配横条／列表。国内下钻使用中国地区宿主 |
| 数据口径 | 以稳定地区 ID 关联 geometry 与统计；先说明总量或强度、时点、单位与分母。同层共用量程，全国和省内分别标定，不直接比较跨层颜色 |
| 必要读数 | 当前地域层级与范围、地区名称、精确值、单位、图例和数据时间；无值不补0，统计与详情标明 Mock 或真实来源 |
| 操作与反馈 | 地区选择、可用省内层下钻、详情、面包屑返回、按层视角恢复；固定来源无子层的地区直接查看同级详情，不造同名城市 |
| 嵌入方式 | /#chart-china 提供全国到27个省内层与地区详情；默认世界图在 /#chart-choropleth，沿用其独立体验 |
| 状态与限制 | 国内边界为399项固定地区，不含通用市辖区县下钻；请求失败可保留原范围的旧地图并重试。3份GeoJSON约8.1MB，几何及HDX／OSM许可随宿主提供，不放入通用UI包 |
| 实例与接入 | 使用 [china-region-examples](../../apps/playground/src/docs/components/chart-business/china-region-examples.tsx) 与 [固定数据说明](../../apps/playground/src/docs/components/chart-business/data/china/README.md)；保存中国地图页12份完整文件，保留许可与修改说明，再接自己的统计／详情 |
| 已有证据 | [全国层级验证](../../evidence/runtime/chart-business-expansion/p5/verification.md)和[地图体验](../../evidence/runtime/chart-china-experience-2026-10-10/verification.md)提供限定技术记录；最新地区选择器与实际体验仍需按当前源码验收 |

### 宿主请求过程的展示建议

以下是本轮确认的接入指导方向，仍需在真实业务宿主中验证；不是图表新增的统一状态 API，也不表示现有 Mock 示例已经接入请求流程。

| 请求过程 | 页面呈现与操作 | 数据与读数要求 |
| --- | --- | --- |
| 首次加载、尚无结果 | 在预定图表位置显示加载说明或占位，保留合理布局 | 不把未取得数据的数值显示成0 |
| 首次请求失败 | 显示错误说明与明确的重试操作 | 不绘制虚构结果，不将错误标成“无数据” |
| 请求成功但集合为空 | 显示暂无数据及当前范围；有合理业务动作时提供 | 与全部缺测、合法全零分别表达 |
| 同一查询刷新中 | 保留旧图与精确读数，提示更新中及旧数据时间 | 图形、摘要、提示、明细使用同一份已完成的数据结果 |
| 同一查询刷新失败 | 保留旧结果及其时间，提示更新失败并允许重试 | 不把旧值标成已刷新，也不覆盖为0；继续读取旧值时说明范围 |
| 刷新成功 | 同步替换图形与全部读数，按现有更新方式过渡 | 最新结果为空时进入空态，不能继续假装旧数据仍是当前结果 |
| 对象、筛选或层级改变 | 按新范围发起请求；若保留旧图，连同原范围和时间一起保留 | 不在新标题下冒充旧结果；只采用仍对应当前请求范围的响应 |

数据到达后继续遵守逐图合同：0是有效值，部分缺测保留其位置，全部缺测提供明确说明；比率零分母与源数据缺失分别说明，非法数据拒绝绘制。普通请求失败不属于业务值的“缺测”。中国地图的旧图保留是已有局部参考，不能据此宣称其他图表已实现同一请求流程。

图例操作的后续方向见[体验优化计划](../plans/2026-10-10-chart-experience-refinement-plan.md#2-逐图优化顺序)：普通趋势／比较默认临时聚焦，固定详情用于明确对象浏览；具体事件与清除行为在第二批前细化。使用现有图表时仍核对各自已实现合同。

## AI 与开发接入指引

接入前先用上面的说明写清业务问题、数据口径和必须具备的操作。影响选型的单位、分母、时间粒度或关系含义不明确时先补充，不能根据字段名或图表外观猜测。

| 接入步骤 | 查阅入口与交付要求 |
| --- | --- |
| 1. 找到真实能力 | 从业务问题定位逐图 Manifest，再核对[能力清单](chart-capabilities.md)和[公开 API](../../packages/ui/src/charts/index.ts)；部分候选尚不能通过资产索引查到 |
| 2. 选择消费方式 | 已有 Rain 工作区使用公开 charts 子入口；独立宿主按本地 Registry 保存完整依赖文件，见下方“找到实现和依赖”。当前没有已发布 npm 包或在线安装服务 |
| 3. 接好样式与容器 | 按[导入与容器](../../packages/ui/src/charts/README.md#导入与容器)准备 Foundations、charts 样式与可测量尺寸；组合 Rain UI 时补其样式，Network 还需既有桥接 |
| 4. 准备数据和页面状态 | 按[宿主责任](#嵌入时由谁提供什么)处理请求、校验、量程、分母、缺测、空／错／重试及生命周期，不把这些假定为通用图表 Prop |
| 5. 从示例接入 | [最短可复用示例](#最短可复用示例)解释最小组合；需要完整页面时保存对应业务入口的全部文件；170 变体按[全变体源码消费](#全变体源码消费)获取，不拼接不同下载包的私有文件 |
| 6. 检查自己的使用范围 | 按[最小验收路径](#最小验收路径)检查真实数据和宿主组合；记录本次验证与遗留项，不将历史样本的通过状态推广到新页面 |

### 找到实现和依赖

1. 查询用途：`node scripts/asset-index.mjs --find 组合`、`--find 进度`、`--find 地区`。索引只收录实际登记为 passed/scoped-passed 的资产；执行中项先读上述 Manifest。
2. 打开命中合同，核对 `sourcePath`、`props`、Parts、数据范围和 `verification`。组件目录为 `/#chart-<id>`，如 `/#chart-composed`。
3. 从 `@rain-next/ui/charts` 导入真实 Compound API，加载 `@rain-next/ui/charts/styles.css` 与 Foundations 的 tokens/typography/focus。作用域容器为 `.rain-chart`，需要实际可测量尺寸。
4. 直接换成自己的字段、中文标签、单位和数据校验。可参考[示例实现](../../apps/playground/src/docs/components/chart-examples.tsx)与[数据](../../apps/playground/src/docs/components/chart-data.ts)，但新消费不可依赖 Playground App 或原型 `page.tsx`。
5. 复制源码消费时使用[Registry](../../registry/charts.json) 的 `shared.files + item.files` 完整闭包，保留 LICENSE、source-lock 和 npm/类型依赖。当前是本地源码登记，没有在线安装服务。

图表独立子入口避免 `Grid` 等与 Layout 命名混淆。`ChoroplethFeature` 是类型，渲染用 `ChoroplethFeatureComponent`；盈亏序列不单独承担值域注册。不要从私有 vendor 路径拼接未公开 Parts。当前没有已发布 npm 图表包或在线 Registry 安装服务，下面示例用于已有 Rain 工作区／按本地 Registry 准备好的消费宿主。

### 嵌入时由谁提供什么

| 项目 | 图表／已有配方提供 | 新宿主必须提供 |
| --- | --- | --- |
| 布局 | 可测量容器内的图形、已定义 Parts；迷你局部尺寸表 | Table / Card / List、标题、单位、容器宽高与必要横滚；不把默认 320px 图高搬进表格 |
| 数据 | 各图类型与明确的数据边界 | 请求、权限、可信数据校验、稳定 ID、日期／分类顺序、缺测与不适用原因 |
| 比较口径 | 显式固定域和分轴能力 | 同组量程、评分满分、完成率分母、周期对齐方式；筛选不暗改尺度 |
| 状态 | 图型已有加载／交互／运动能力 | 请求 loading/error/retry、empty/invalid、超域说明；不假定所有图都有同一 status Prop |
| 可读性 | Tooltip、图例／中心 Parts，Matrix/Network 的等价读取 | 其余图的具名精确文本／表、键盘与触屏操作、长标签和字体检查 |
| 实时／下钻 | 实时图窗口与暂停；地图激活／投影 | 订阅、定时器和缓冲清理；地区加载、业务详情、返回状态与数据许可 |
| 源码复用 | 当前配置与实际依赖文件的下载 | 保存全部文件、保留目录／样式／LICENSE／来源说明；替换 Mock 后重新检查 |

默认图形、170 变体和业务配方使用各自源码入口。170 卡点击“查看本卡代码”；业务页保存当前设置的完整文件集，矩阵在矩阵页单独下载。只复制示例外壳、只复制 main.tsx 或只复制某个家族文件均不足以复用。

横条可用 `valueDomain={[0,upper]}` 固定主轴；省略时保留自动尺度。`xDataKey="id"` 与 `formatLabel(id,datum)` 分开身份和文案，提示用现有 content 回调显示 label。同列 DataBar 使用完整比较组的 maxValue，过滤后保持同域。0/null/非法/超域/无尺度全零分别处理，不补零或静默截断。`decorative` 只在宿主已有具名读数时使用。Ring小图通过可选padding调整留白，默认8保持兼容。

业务入口 `/#chart-business` 可保存当前状态、更新版本、排序、筛选与全部局部文件；下载包含实际图形、数据和CSS。2D条柱持续更新，3D深度柱保留原有兼容路径；准确读数不依赖hover。业务增量的技术与视觉状态见[分阶段记录](../../evidence/runtime/chart-business-expansion/baseline.md)，没有把新配方计入170官网集合。

## 分类矩阵与日期热图

分类矩阵组件与五组业务实例统一位于 `/#chart-matrix`：星期×小时、课程×方案版本、课程相似度、分类×学院数量气泡、课程支撑等级。状态、更新、重播、行列顺序和4/6/12规模由该页控制，矩阵下载保留当前配置和全部五组实例。迷你图表页及其下载专注条形和迷你嵌入组合，移除矩阵实例与文件。页面归属验证见[本轮记录](../../evidence/runtime/chart-matrix-page-separation-2026-10-09/verification.md)。

分类矩阵和日历热图属于同一网格图表家族。矩阵描述行列布局，热力描述颜色编码，日历描述日期位置；星期×小时表达周期内的统计，日历格表达具体日期。两入口共用 Rain 五档色阶、Bklit 单元格入场节奏和 TooltipBox 基础，分类轴可按业务重排，日期轴保留周起始、月份边界及连续日期。不能为分类数据制造 Date，也不能按数量任意重排日历。

矩阵数据列等宽；行标题按文字和实际字体自适应，字体/容器变化后重算，窄屏长标题换行，横滚时固定列保留不透明底层。矩阵气泡面积按数量成比例，颜色从浅、低饱和到深、较高饱和；比较时保持共同量程。用户本轮明确数量图例仅需大小提示：以紧凑小中大圆配合同源色阶和数值，不用图例校准真实面积。热度图例使用细渐变条并随行标题宽度对齐，等级图例使用等大点与真实等级名。悬停/聚焦以轮廓与联动反馈强调，不改数值填色；滚动区方向键查看、Escape关闭浮层。首次进入可视区域后入场，排序/数据更新持续过渡，减少运动直接呈现终态。新视觉与交互仍待用户审阅，局部自动检查不授予对比度或发布状态。

开课学期等离散顺序值通过热度编码的`steps`明确声明完整步值，例如1至8。图例对应分段颜色和真实步值，单元格拒绝未声明的中间值；连续相似度及次数仍使用其连续值域。

## 分类趋势与周期对照

`/#chart-category`集中六个独立Mock业务样本：CH-060学期轻面积、CH-005学院数量/覆盖率、CH-067知识点堆叠/覆盖率、CH-049两期轻面积对照、CH-073版本面积、CH-112固定0—10分版本评分柱状图。它们复用已有Line/Area/Composed，不增加官网图型或改变170项身份；迷你与矩阵仍在各自页面。

2026-10-09选型反馈按阅读目的应用：只有1—2条折线且需要走势或趋势对照时优先轻面积，两期面积不堆叠，保留独立值与缺测；没有趋势对照需求、仅比较类别数值时可用柱状图，版本评分保持固定满分尺度。用户本次明确确认CH-060学期轻面积、CH-049两期面积对照、CH-112固定0—10分评分柱状图。该确认仅限这三例，不作全局强制或按系列数自动切换，不覆盖其他场景、总体对比度或无障碍Gate。

LineChart、AreaChart与ComposedChart可显式传`xMode="category"`，以`xDataKey="id"`读取稳定非空字符串ID，`xLabel={datum => String(datum.label)}`显示名称。按输入顺序等距定位，同名不同ID不合并；长分类通过宿主宽图横滚，分类不使用Date、时间降采样、Brush/Projection、日期标记/参考区域或LiveXAxis。

`null`保留静态及更新中的缺口，0为有效点；NaN/Infinity在共享边界拒绝。SeriesBar可绑定`yAxisId`，Composed的`yDomains={{right:[0,100]}}`固定逐轴零基线域，不nice；上界须有限、为正。堆叠同组必须同轴，按对应轴求总量；提示仍显示原始分项值。

周期对齐由宿主`alignComparisonSlots`明确关联slotId，保留本期/上期原始日期与不同长度的null尾；不自动猜星期或教学周。每例有精确表，下载保存当前场景、状态、更新、顺序与配色，包含实际图形、数据和样式。共享候选仍未发布，技术记录见[本批证据](../../evidence/runtime/chart-business-expansion/p3/verification.md)，视觉待用户审阅。

## 关系网络与节点选择

`/#chart-network`展示CH-065元素/知识点、CH-070知识点关联、CH-083课程先修/相似和CH-086理论实践反馈四组Mock，复用vendor外[NetworkChart](../../packages/ui/src/charts/network/README.md)。类别和关系配置按稳定ID保持身份；directed独立决定箭头，关系实/虚/点线配合名称，多个相同节点对保留独立弧线。权重有限非负，0与“未提供”分开，只在原始读数中呈现，圆面积/线宽/距离不代表权重。

成对有效坐标优先；无坐标由`layoutNetwork`生成确定的自然环绕位置，符合条件时把一个连接较多的节点放在内部，不启动力导循环。宿主先校验、准备完整图布局再筛选；未知端点、自环、重复ID或非法坐标拒绝。过滤/更新保留节点和边key；隐藏选中节点时清除选择。指向或按钮聚焦是临时预览，点击/Enter固定节点详情；经过其它节点／连线不会覆盖固定详情。Escape、空白区或清除按钮解除选择。SVG为装饰，按钮列表与节点/边精确Table保留完整名称和操作。

网络组件直接复用Rain Button/Table，除charts样式还需UI根样式，以及现有Tailwind/Foundations桥接和源码扫描。按Registry的`shared.files + item.files`复制实际闭包，包含按钮/表格helper、CSS及根样式资源，不依赖Playground运行时。业务下载保留当前场景、状态、关系筛选、更新次数与配方，仅附实际网络fixture和宿主CSS。

当前四组样本为8—11节点、10—19边。`variant="glow" | "structured"`选择柔光节点或结构化名称卡；宽度不超过620px时改用完整关系列表，选择、详情与精确表仍可用。有限候选路径会避让节点／名称，但没有任意密集布局最优保证、拖拽缩放、图编辑或千节点性能承诺。

首次进入视野播放入场；相同布局的子集筛选保留幸存路径。可见几何／样式切换先让连线退场，再移动节点，等待实际完成后重接路径；快速更新采用最新目标，reduce即时。2026-10-10用户已确认当前四组样本的交互与动效，详见[最新体验与确认](../../evidence/runtime/chart-network-experience-2026-10-10/verification.md)。完整对比度、实机Safari/VoiceOver、实体触屏和任意新布局仍单独验证。

## 最短可复用示例

以下使用固定 Mock 说明最小正确组合；公共 Parts 不是通用业务数据清洗器。真实输入先按各图合同校验。应用入口一次性加载基础样式：

```tsx
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/charts/styles.css";
```

### 比较数量：共享量程的 DataBar

同列从完整比较组确定量程，再筛选／排序。已有精确文字时使用`decorative`，避免每格重复朗读；数量条不标成任务进度。

```tsx
import { DataBar } from "@rain-next/ui/charts";

const rows = [{ id: "a", label: "计算机学院", count: 25 },
  { id: "b", label: "数学学院", count: 50 },
  { id: "c", label: "物理学院", count: 100 }];
const comparisonMax = 100;

export function EnrollmentBars() {
  return <ul className="rain-chart" data-recipe="monochrome-blue">
    {rows.map(row => <li key={row.id}>
      <span>{row.label}：{row.count} 人</span>
      <DataBar label={row.label} value={row.count} maxValue={comparisonMax}
        decorative style={{ width: 120, height: 6 }} />
    </li>)}
  </ul>;
}
```

需要轴、分组或堆叠时换`BarChart`＋`Bar`，显式`orientation="horizontal"`及`valueDomain={[0, comparisonMax]}`；完整接线见[横条示例](../../apps/playground/src/docs/components/chart-business/bar-examples.tsx)。全零域的 DataBar 保留准确0和空轨；null、非法与超域分别显示状态，不能截成满条。

### 构成与进度：分别选择 Pie 和 Ring

左侧的两项必须互斥且完整；右侧是一个独立目标。两者都提供无需悬停的精确读数。将`innerRadius`设为0可得到实心饼；Ring 的开口弧按[MiniProgress](../../apps/playground/src/docs/components/chart-business/mini-examples.tsx)成套配置角度和画布。

```tsx
import { PieChart, PieSlice, RingChart, Ring } from "@rain-next/ui/charts";

const parts = [{ label: "已完成", value: 20 }, { label: "未完成", value: 60 }];

export function CompositionAndTarget() {
  return <section className="rain-chart" data-recipe="category-near">
    <figure>
      <figcaption>课程构成：已完成20门，未完成60门，共80门</figcaption>
      <div aria-hidden="true"><PieChart data={parts} size={128} innerRadius={40} hoverOffset={2}>
        {parts.map((part, index) => <PieSlice key={part.label} index={index}
          showGlow={false} hoverEffect="grow" />)}
      </PieChart></div>
    </figure>
    <figure>
      <figcaption>学习目标：20 / 80 小时（25%）</figcaption>
      <div aria-hidden="true"><RingChart data={[{ label: "学习目标", value: 20, maxValue: 80 }]}
        size={64} padding={2} baseInnerRadius={25} strokeWidth={5}>
        <Ring index={0} showGlow={false} />
      </RingChart></div>
    </figure>
  </section>;
}
```

构成总量为0时显示零总量状态；目标为0时显示“不适用”。输入缺测、超目标或非法时先呈现业务说明，不将它们当作正常比例传入。多目标 Ring 的每一项保留自己的分母；中心不显示跨目标总和。

### 趋势与分类组合：明确横轴、分母和分轴

真实日期趋势直接使用[README 中的完整 AreaChart 示例](../../packages/ui/src/charts/README.md#导入与容器)。下例的学院是分类，使用稳定字符串ID；数量与比例分别读轴。第二项没有目标分母，比例为null，保留断口和“不适用”说明。

```tsx
import { ComposedChart, SeriesBar, Line, XAxis, YAxis,
  ChartTooltip, TooltipContent } from "@rain-next/ui/charts";

const rows = [
  { id: "a", label: "计算机学院", count: 40, target: 100, rate: 40 },
  { id: "b", label: "数学学院", count: 60, target: 0, rate: null },
];

export function CountAndRate() {
  return <figure className="rain-chart" data-recipe="category-near">
    <figcaption>参与人数与目标覆盖率</figcaption>
    <ComposedChart data={rows} xMode="category" xDataKey="id"
      xLabel={row => String(row.label)} yDomains={{ right: [0, 100] }}
      className="rain-chart-plot" aspectRatio="">
      <SeriesBar dataKey="count" yAxisId="left" fill="var(--chart-1)" />
      <Line dataKey="rate" yAxisId="right" stroke="var(--chart-2)" />
      <XAxis /><YAxis formatValue={value => `${value}人`} />
      <YAxis yAxisId="right" orientation="right" formatValue={value => `${value}%`} />
      <ChartTooltip content={({ point }) => <TooltipContent title={String(point.label)} rows={[
        { label: "参与人数", value: `${point.count}人`, color: "var(--chart-1)" },
        { label: "覆盖率", value: point.rate == null ? "不适用" : `${point.rate}%`, color: "var(--chart-2)" },
      ]} />} />
    </ComposedChart>
    <ul>{rows.map(row => <li key={row.id}>{row.label}：{row.count}人；目标{row.target}人；
      覆盖率{row.rate === null ? "不适用（目标为0）" : `${row.rate}%`}</li>)}</ul>
  </figure>;
}
```

类别很多时由宿主提供足够宽度并局部横滚。分类不使用时间Brush、预测线、日期事件或参考区域。周期比较先在宿主按slotId对齐，保留各期原日期与null尾；完整做法见[comparison-data](../../apps/playground/src/docs/components/chart-business/comparison-data.ts)。趋势只有1—2条且需要比较走势时可优先轻面积；仅比较类别数值时可用柱。它们是按阅读目的选择的局部经验，不是按系列数自动换图。

### 矩阵：先选数值编码，再提供稳定行列

```tsx
import { MatrixChart, type MatrixCell } from "@rain-next/ui/charts";

const cells: MatrixCell[] = [
  { rowId: "math", columnId: "v1", kind: "value", value: 0.8 },
  { rowId: "math", columnId: "v2", kind: "missing", label: "尚未测量" },
  { rowId: "physics", columnId: "v1", kind: "value", value: 0 },
  { rowId: "physics", columnId: "v2", kind: "not-applicable", label: "无该课程" },
];

export function CourseMatrix() {
  return <MatrixChart caption="课程评价 · 比例0—1" rowHeaderLabel="课程"
    rows={[{ id: "math", label: "高等数学" }, { id: "physics", label: "大学物理" }]}
    columns={[{ id: "v1", label: "2025版" }, { id: "v2", label: "2026版" }]}
    cells={cells} encoding={{ kind: "heat", domain: [0, 1] }} data-recipe="intensity" />;
}
```

数量气泡改用`{ kind: "bubble", domainMax: 100 }`；等级使用显式`level`映射，完整格式见[Matrix README](../../packages/ui/src/charts/matrix/README.md)。开课学期采用heat的`steps:[1,2,3,4,5,6,7,8]`；不要把离散学期插值成小数。矩阵自身已含语义表格和精确读数，不必为每格再建一张隐藏表。

### 关系网络：类别、关系与方向分别配置

Network 内部使用 Rain Button/Table，因此除上面的图表样式，还需 UI 根样式及已有 Tailwind/Foundations 桥接和源码扫描配置。

```tsx
import "@rain-next/ui/styles.css";
import { NetworkChart } from "@rain-next/ui/charts";

export function PrerequisiteNetwork() {
  return <NetworkChart caption="课程先修关系" variant="glow" data-recipe="monochrome-blue"
    categories={[{ id: "course", label: "课程", color: "var(--chart-1)" }]}
    relations={[{ id: "before", label: "先修", color: "var(--chart-2)", lineStyle: "solid" }]}
    nodes={[{ id: "math", label: "高等数学", category: "course" },
      { id: "probability", label: "概率统计", category: "course" }]}
    edges={[{ id: "math-probability", source: "math", target: "probability",
      relation: "before", directed: true }]} />;
}
```

组件自带可操作节点列表、选择详情和精确表；业务操作用`onNodeSelect(node|null)`接出。需要筛选或样式专用布局时复制[完整网络宿主](../../apps/playground/src/docs/components/chart-business/network-examples.tsx)，先准备完整图的稳定位置，不用每次筛选的结果重新布局。

### 地域下钻：复用完整宿主

通用地图使用`ChoroplethChart`及`ChoroplethFeatureComponent`，自己提供geometry和读数。全国→省内→地区详情直接从`/#chart-china`下载当前完整配方，保留其12份文件和相对路径；不要杜撰公共`ChinaChart`或只复制地图SVG。数据加载与投影环方向适配、统计ID核对、地区切换／重试和视角保存都在[现有宿主与数据说明](../../apps/playground/src/docs/components/chart-business/data/china/README.md)中。

同层使用共同量程，不同层分别说明；0、缺值和未匹配统计ID分开。固定边界是真实来源，统计和详情是Mock；HDX与OSM署名、许可链接、来源版本及修改说明随数据保留。地图体验的具体范围见[中国地区与省市下钻](#中国地区与省市下钻)。

## 统一基础，选择配方

共同基础是 Rain 表面、辅助文字、UI 字体、精确读数、Focus 和轴距；默认保留 Bklit 的原生运动与展示强度。数据色是图表作用域内的 Local Recipe，不重定义品牌主蓝。

| 数据语义 | 配方 | 选择方法 |
| --- | --- | --- |
| 单趋势 | `trend-soft` | 一主色、清晰线、轻面积；迷你图仍保持真实端点 |
| 类别 | `category-near` / `category-wide` / `category-solid` | 近邻蓝紫、较宽色差、实色家族；按稳定系列身份绑定最多 5 色 |
| 蓝灰单色 | `monochrome-blue` | 克制的柔和蓝色，以 `#6288C7` 为主体，按明度区分；除K线、盈亏线外的15类图表可选，逐图取色 |
| 柱的视觉样式 | `bar-gradient` / `bar-fade` | P01 同色 .95→.4 渐变；P02 圆头 1→0 渐隐，原生柱 Props + 唯一 gradient defs |
| 强度 | `intensity` | 同源有序 5 级色阶，0 与缺测分别表达；地图和日历用自己的明确值域 |
| 来源到去向 | `flow` | 桑基双色路径渐变，权重仍由宽度表达 |
| 正负/涨跌/动量 | `sign` | 明确 0 或开收分界，标签与正负号保留；不能默认解释红绿为错误/成功 |

`rainChartRecipes`提供元信息，`data-recipe`选择色组；透明度、形态与渐变定义由真实调用Props实现。适用配方以逐图Manifest为准。P06仪表参考只覆盖原生可配置部分，P08关系表达在Rain本地NetworkChart中借鉴径向柔光与关系线型；不将参考全貌或未经实现的行为视为可调用配方。

`monochrome-blue` 的五档色阶是取色资源，不承诺五个并列系列均可清楚区分。浅色用于合适面积的填充，细线、小点和文字另查可辨性。类别颜色保持身份稳定；热图与地图使用同组颜色从浅到深映射，0与缺测分开。漏斗按阶段渐变，旭日采用浅色区块与深色标签；同数据、同尺寸下检查明度区分、重叠边界及末端可见性。

`monochrome-blue / 蓝灰单色` 已于2026-10-08通过用户视觉审核，可作为已确认的可选视觉配方使用；范围与证据见[验证记录](../../evidence/runtime/chart-monochrome-blue/verification.md)。

## 最小验收路径

对新宿主替换数据后检查：精确数值/单位/比率、空/零/缺测/无效数据、正常/长标签、3/5 系列、正常尺寸/窄屏/适用迷你尺寸、悬停及图例焦点、更新/重播/减少动效。渐变 ID 在多实例中唯一；轴数字与首尾图形保持间距；样式导入前后其他 Rain 控件不改变。精确表和具名按钮为键盘与触屏提供稳定读数路径。

原生图形 hover 不等于全部数据点键盘可达。真实读屏、物理触屏、对比度、完整深色主题、SSR 和生产数据接入按实际证据单独记录；自动检查通过不能代替视觉 Gate。当前候选未发布，未迁移 Rain Classic、未写回 Figma。

实施来源与升级方式见[图表 README](../../packages/ui/src/charts/README.md#来源registry-与升级)。当前全批任务见[业务图表建设计划 T22](../plans/2026-10-08-chart-business-expansion-implementation-plan.md#t22全批收口与复用指导)，原始目录计划保留为[历史建设记录](../plans/2026-10-07-bklit-rain-catalog-plan.md)。


## 迷你双尺寸与宿主选择

表格显式选择compact；指标卡趋势优先compact面积96×32，构成和进度卡选择comfortable；列表按信息密度选型。柱 / 折线 / 面积为96×32 / 128×48，饼 / 环饼32 / 56，完整环32 / 64，底部开口弧40×30 / 72×54，细条实际厚6 / 8。画廊保留两档折线与面积。局部尺寸事实源为`chart-business/mini-layout.ts`；几何、状态槽和图文间距随档位一起变化，数据与颜色身份不变。

人数条和每日柱分别从原比较集合求域；折线与面积的自动域只表达自身走势。进度读数按`value/maxValue`计算；20/80为25%，零目标不生成0%假进度。缺测/无效/离屏与正常保留同型号槽；舒展中心文字放大后装不下时移外并允许宿主重排。表格主数字与圆图外读数同层，数值右齐；列表评分与完成读数各自紧邻对应图形。

2026-10-09 最新迷你反馈：横向图左侧标签和普通迷你标签、数值、百分比、单位、状态统一13px / 20px；指标卡重点数字保持28px / 36px，标题保留层级。表格参与人数 `DataBar` 保持80×6，画廊紧凑条与列表评分条仍120×6，画廊舒展条保持160×8；填充通过真实宽度过渡，保持端点圆弧，不改量程或公共尺寸默认。卡片与表格优先紧凑面积走势，见[本轮验证](../../evidence/runtime/chart-mini-typography-feedback-2026-10-09/verification.md)。[首轮读数与矩阵反馈](../../evidence/runtime/chart-visual-feedback-2026-10-09/verification.md)和[原迷你验证](../../evidence/runtime/chart-mini-refinement/verification.md)作为历史保留；分类矩阵后续变化在其页面记录中单独登记，对比度 Gate 仍为 `not-granted`。

业务横条、排名与表格中的同类名称默认Text/Neutral/3；交互仍通过原有悬停、Focus及查看动作反馈。轴名称局部取消重复淡化，不改其他图表辅助文字默认。排名名称列随最长内容占宽，长名称封顶，数量条起点和读数右端逐行对齐；600px以下保留名称上移。局部经验与验证见[名称列宽反馈](../../evidence/runtime/chart-business-label-color-layout-2026-10-09/verification.md)。

图表库的`size="mini"`与`miniSize="compact" | "comfortable"`是应用示例参数，不是公共Parts新增枚举。默认日期折线/面积仍使用真实Date、Tooltip、单点marker和重播。下载保存当前模式、型号、系列数与数据修订，并包含尺寸表；完整文件集合离开Playground后仍可构建消费。两档视觉接受、物理Safari/VoiceOver与发布分别登记，不能从尺寸实现自动推导通过。

## 全变体源码消费

每个图型页默认预览后提供全部对应变体：16官网家族170条，Rain17入口；盈亏线独立映射line-profit-loss。按稳定ID从`apps/playground/src/docs/components/chart-variants/reference.json`追踪，不用组件名猜数量。每卡展开“查看本卡代码”，按下载路径保存所有文件，包括各卡共用的世界几何及其来源README（chart-data会导入）、以及trend共享盈亏文件；使用公共`@rain-next/ui/charts`及实际Rain按钮/图标入口，不复制私有vendor路径。当前配方、revision、replay、curveName与调用同步；宿主监听减少动效和document visibility，并在卸载清理。

公共Parts和数据边界见共享README。持续生产者属于宿主；paused保持窗口，手动更新用frozenNow显式推进，单纯离屏返回不得重挂载或平移Unix时间。渐变、纹理与语义卡的paletteMode明确；热图连续图例与0/缺测边界不能泛化为类别色。

隔离消费脚本`node scripts/verify-chart-variant-consumption.mjs`验证170份独立文件集、候选包导出、类型与生产构建及宿主内解析路径。它复制既有依赖缓存，使用完整本地候选UI/Foundation包；不是干净安装或最小单项Registry安装，仍保持unpublished。

变体下载的main.tsx初始化当前卡内选择（含0/长文案/加载、Brush、层级焦点、暂停快照），并保留后续交互setter。需要复用已选状态时保存main.tsx与它列出的全部文件；不要只复制单个family模块。170项归属原17个入口；加上Rain本地Matrix/Network，当前共19个未发布候选入口。自动检查与用户视觉审阅分别登记。


## 已有样式反馈与适用范围

普通分类默认使用蓝紫邻近配色；纹理与渐变材质卡也使用协调色组，同一个饼图扇区内只改变本色透明度。保留手动多色配方以及正负/涨跌语义配方，已认可的蓝灰色值不变。数据纹理略淡，参考区间的辅助斜线更淡。

独立示例的图例文字保持横排；进度图例使用原生Compound Parts，逐项纵排且轨道等宽。中心单位小于主数字；独立目标环默认显示首项目标，不把独立分母合为总进度。旭日图根节点为15px标题，下钻路径复用已有Breadcrumb。图表静态工具样式同时包含该Breadcrumb实际所需的Rain类，下载全部文件即可保持字体及布局。

默认地图及变体共用Natural Earth世界几何与演示数值。日历月份/季度分别占据独立轨道，密集全年星期标签显示周一/周三/周五，窄屏在图内横滚。修复与验证见[本轮记录](../../evidence/runtime/chart-variants/feedback-2026-10-08/verification.md)，本轮视觉仍待用户审阅。

同日第二轮反馈后，Pie/Donut取消悬浮光晕；Ring中心只显示百分比和名称，独立分母在图例与精确表读取；参考区间虚线进一步减淡。日历图例增加16px间距，默认图例在图外保持交互；旭日图根标题和下钻路径都居中。具体范围见[第二轮验证](../../evidence/runtime/chart-variants/feedback-2026-10-08-round2/verification.md)，不扩大为全库新Token或视觉通过。

2026-10-09 雷达反馈：默认入口与六变体复用13px/Regular图例按钮，焦点与指向联动本实例；维度标签也用Regular。网格顶点对准100分轴端点，轻光晕保持6px/25%系列色；关闭动画时系列聚焦即时响应。见[本轮验证](../../evidence/runtime/chart-radar-feedback-2026-10-09/verification.md)，不推导发布或完整设备接受。

## 中国地区与省市下钻

国内地区下钻复用 `/#chart-china` 宿主与[来源数据](../../apps/playground/src/docs/components/chart-business/data/china/README.md)。2026-10-10 的整体体验样本使用私有配方 `china-map-experience-2026-10-10`，复用共享 Choropleth 的投影、缩放和上下文，局部绘制层提供保留填色的边界强调、就近提示与连续切换。地图下方固定读数，地区集中到选择器中；层级导航可点，按层保存视角，返回恢复视角和上次省份。同层量程稳定，仅超出时扩大；失败保留旧地图，减少动效响应实时系统设置。三枚视图工具为28px按钮/14px正式图标，仅属本样本局部选择。默认世界地图与其他图型保持自己的原体验，未推广本轮配方。全国和省内分别标定量程，不直接比较颜色；399项真实边界、直辖市/来源无子层与省直管县级身份保持不变。下载12份完整文件并保留HDX、OSM许可与修改说明。见[地图体验验证](../../evidence/runtime/chart-china-experience-2026-10-10/verification.md)，视觉与实机体验待用户确认。T22文档核对期间该选择器源码仍有范围外调整，本轮只核对能力，不复用旧记录证明新细节已经验收。
