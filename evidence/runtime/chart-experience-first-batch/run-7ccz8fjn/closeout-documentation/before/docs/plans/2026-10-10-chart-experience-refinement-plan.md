# Rain 图表体验优化 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> Codex 可按同一任务顺序执行。当前仅确认优先级、范围和验收标准；用户“先讨论方案，不改代码”的边界继续有效。本文不表示已经开始实施。

**Goal:** 先补齐既有图表的状态表达与必要操作，再统一阅读体验，最后按真实业务需要安排专门图型增强。

**Architecture:** 复用现有图表、示例、状态控件、精确数据表和旭日图键盘入口。先修正宿主接线、样本与读数，只有复现共享组件缺陷时才修改其拥有的实现；保持 Rain 视觉、公开接口与数据责任边界。

**Tech Stack:** 现有 React、TypeScript、Rain UI、Bklit / visx / Motion、Vitest、Playwright 和 pnpm workspace；不预设新依赖。

---

## 1. 决策来源、范围与状态

- 2026-10-10 用户要求：“接下来逐图梳理交互能力和状态覆盖，整理其他图表的体验优化清单与优先级，先讨论方案，不改代码。”随后确认三批顺序及第一批范围。确认对象为方案，不作为视觉通过、发布或业务迁移依据。
- 整体审核后用户明确：“确定，按你的建议补齐文档和计划，明确第一批验收与 T22 的衔接，先不改代码。”据此补齐核心用法、请求过程建议、验收落点与第 6 节交接顺序；本次仍只改文档和阶段说明。
- 本轮为 System Mode 的计划文档整理；工作区为 `.worktrees/card-v2`。本文已在方案确认时建立，本次补充使用指引、原建设计划、能力清单、阶段记录和文档核对记录。
- 实施尚未开始。第一批实施时的目标、预计修改文件和验收标准见第 4 节；第二、三批先保留问题清单，不提前扩展公共能力。
- 文档依据为当前源码、已有样本与前轮逐图审阅；本轮只做引用、范围、状态和源码未变检查，没有重跑浏览器或硬件验证。
- 待验证假设：底层缺测能力可直接服务默认示例；旭日已有键盘操作方式可复用；普通柱、DataBar 与迷你柱的问题主要位于示例表达。实施前用目标测试复现，不能把这些假设记为已修复。

入口：[按业务问题选图](../ai/charts.md) · [完整能力清单](../ai/chart-capabilities.md) · [原建设计划与 T22](2026-10-08-chart-business-expansion-implementation-plan.md#t22全批收口与复用指导) · [文档核对记录](../../evidence/runtime/chart-business-expansion/verification.md)。

现有 19 入口、170 来源变体、10 表现配方不变。本计划中的“第一／二／三批”为体验优化顺序，与原业务建设 P1—P5 编号分别记录；T22 完整技术收口仍待执行。

## 2. 逐图优化顺序

下表“已有”来自源码和样本，不等于本轮运行验证。各项实施、自动检查和用户体验确认独立填写。

| 入口 | 已有交互与状态基础 | 后续优化或复核重点 | 安排 |
| --- | --- | --- | --- |
| chart-line · 折线 | 指向／触摸读数、图例聚焦；时间变体有范围选择；底层保留缺测断线 | 默认缺测样本、提示、末端摘要与明细一致；零值保持有效 | 第一批 E01 |
| chart-area · 面积 | 图例聚焦、指向读数、时间范围选择；底层支持缺测断口 | 默认和迷你入口的缺测表达、末点缺测、更新时断口 | 第一批 E01 |
| chart-composed · 组合 | 同位置多系列读数、双轴；业务样本区分缺测与零分母 | 默认入口接齐缺测；区分比率缺测与不适用 | 第一批 E01 |
| chart-bar · 柱／横条、DataBar | 图例聚焦、排序／筛选样本；DataBar 已区分零、缺测、非法与超域 | 普通柱、迷你柱、数量条各自说明状态；保持尺度与对象身份 | 第一批 E02 |
| chart-sunburst · 旭日 | 点击下钻、面包屑返回；变体已有键盘查看下级 | 默认入口补等价操作，检查层级与焦点衔接 | 第一批 E03 |
| chart-pie · 饼／环饼 | 扇区与图例聚焦、中心读数；零总量说明与明细 | 小扇区、长名称、类别变化后的聚焦 | 第二批 |
| chart-ring · 进度环／弧 | 环与图例联动、独立目标；零与满目标可表达 | 多环、小尺寸、零目标与超目标的读数和说明 | 第二批 |
| chart-gauge · 仪表 | 数值更新、弧形／线形；0／50／100及非法范围样本 | 清晰读数与小尺寸排版，按需保持展示型交互 | 第二批 |
| chart-radar · 雷达 | 图形与图例聚焦、多维度与零值样本 | 先复核现有图例／网格调整，再处理密集标签和等价读数 | 第二批 |
| chart-matrix · 分类矩阵 | 方向键、Home／End／Escape、图例、滚动与重排；零／缺测／不适用分开 | 先审现有结果，再按反馈检查触屏和密集读取 | 现有验收／第二批 |
| chart-heatmap · 日历热图 | 单元格提示、色阶联动、横滚；零与缺测分开 | 逐格键盘读取和窄容器定位，不改变日期语义 | 第二批 |
| chart-funnel · 漏斗 | 阶段聚焦、常驻人数／比例、精确表；零入口不生成比例 | 长名称、阶段缺项或增长的说明，以及无需悬停的读取 | 第二批 |
| chart-sankey · 桑基 | 节点／连线提示、流向表；零流量说明 | 长名称、细流向和可达的等价读数 | 第二批 |
| chart-choropleth · 分区地图 | 世界图读数；中国宿主支持选择、下钻、返回、视角恢复和失败重试 | 最新中国地图先按原范围验收；不推广其私有控件和动效 | 现有验收／第二批 |
| chart-network · 关系网络 | 临时预览、固定详情、筛选、清除、键盘列表；空／单节点／非法结构处理 | 保留当前四组已确认体验，受影响时回归 | 回归 |
| chart-scatter · 时间散点 | 按时间读数、系列聚焦；零值与非法日期边界 | 密集／重叠点精确读取；任意 XY 另属新增能力 | 第三批 |
| chart-live-line · 实时折线 | 暂停／恢复、手动推进、离屏／后台控制 | 有真实数据接入需求后定义断流、重连和数据过期 | 第三批 |
| chart-profit-loss · 盈亏线 | 正负分段提示、聚焦、零基准；全零表达 | 过零附近的符号、颜色与精确值一致 | 第三批 |
| chart-candlestick · K 线 | OHLC 提示、方向图例聚焦；平盘与非法关系边界 | 密集烛形、方向语义和精确读取 | 第三批 |

图例的后续方向为：普通趋势／比较图默认临时聚焦，网络等明确对象浏览场景保留固定详情；隐藏系列需要独立业务理由，并定义量程、堆叠、构成分母与恢复行为。此处记录设计方向，不声称当前全部图例已统一。第二批前逐图列明指向、键盘聚焦、点击、离开、Escape及筛选／更新后目标消失的处理，再确认具体调整；第一批不提前改造共享图例。

请求状态继续由业务宿主负责。首次加载、首次失败、同条件刷新及刷新失败的呈现建议见[使用指引](../ai/charts.md#宿主请求过程的展示建议)；本批不在Mock示例中建设请求框架或增加全图型统一状态API。

## 3. 状态覆盖与设计依据

| 维度 | 覆盖内容 | 验收责任 |
| --- | --- | --- |
| 数据 | 空、零、单项、部分缺测、全部缺测、不适用、非法、超域 | 图型输入边界与宿主说明配合；只测试该图型有意义的状态 |
| 请求 | 首次加载、更新中、失败、重试、旧数据保留 | 业务宿主；加载变体不能代替完整请求流程 |
| 操作 | 指向、键盘聚焦、固定选择、清除、筛选后目标消失、下钻／返回 | 按已有或本批明确增加的操作检查 |
| 展示与运动 | 长名称、窄容器、局部横滚、多实例、更新中断、减少动效、离屏返回 | 图表与宿主一起验证；普通状态测试不代表正常动效通过 |

- [I02：精确读数](../ai/information-design.md#i02--按信息关系选择图形并保留精确读数)：适用于本批图形、摘要、提示、数据表的一致性；逐点对照源数据，保留单位、缺测和分母含义。
- [D05：真实内容与容器](../ai/information-design.md#d05--根据真实内容和容器调整表达)：适用于长名称、空／错误状态和窄容器；保持读数和操作可达，先重排与局部横滚。

本轮只引用现有方法，没有新体验验证，不追加全局经验或视觉默认值。

## 4. 第一批执行任务

### E01：折线、面积和组合图的缺测读数

**修改位置：** [chart-data.ts](../../apps/playground/src/docs/components/chart-data.ts) 的样本／类型与输入自检；[chart-examples.tsx](../../apps/playground/src/docs/components/chart-examples.tsx) 的 TimeExample、mini 摘要和缺测分派。先检索 makeTimeline 与 finiteValue 的所有调用，避免改变散点、K 线或实时示例的输入合同。

**测试位置：** 计划新增 `apps/playground/src/docs/components/chart-examples.test.tsx`，复用已有测试环境；回归 [chart-missing-data.test.tsx](../../packages/ui/src/charts/chart-missing-data.test.tsx)、[chart-mini-size.test.tsx](../../apps/playground/src/docs/components/chart-mini-size.test.tsx) 和 [charts-playground.spec.ts](../../tests/e2e/charts-playground.spec.ts)。

1. 添加能复现默认入口问题的小测试：有值→缺测→零→有值、末点缺测、全部缺测，以及参与人数为零时的完成率；先确认失败来自目标行为。
2. 补最少的缺测 fixture，保留日期与系列身份；避免统一放宽其他图型的输入类型。沿用现有状态控件，不为每个测试场景新增控制面板。
3. 只接通已支持的折线、面积、组合缺测路径；一起修正 Tooltip、图例摘要、mini 最新值和精确表。缺测显示“缺测”，零保留 0，零分母显示“不适用”；源数据缺失不误标为零分母。
4. 检查正常／零／单点、标准与 mini、部分与全部缺测之间的切换。全部缺测提供可读状态；缺测位置不补零，不画跨缺口连线，摘要不自动冒充最后一次有效观测。
5. 若目标测试暴露底层缺陷，再修改实际拥有该行为的共享文件，并补其现有测试、来源 hash 与消费检查；不预先重写几何或动效路径。

**完成标准：** 同一数据在图形、提示、摘要和表中含义一致；缺口静态与更新后均成立；正常值、零值及单点不回退。技术检查通过后仍需查看实际示例。

### E02：普通柱、横条与 DataBar 的状态表达

**修改位置：** [chart-examples.tsx](../../apps/playground/src/docs/components/chart-examples.tsx)、[bar-examples.tsx](../../apps/playground/src/docs/components/chart-business/bar-examples.tsx)、[mini-examples.tsx](../../apps/playground/src/docs/components/chart-business/mini-examples.tsx)。先核对宿主状态和文案，仅修改复现出的不一致；共享 [data-bar.tsx](../../packages/ui/src/charts/data-bar.tsx) 与 Bar 作为已有能力使用。

**测试位置：** [data-bar.test.tsx](../../packages/ui/src/charts/data-bar.test.tsx)、[bar-chart.test.tsx](../../packages/ui/src/charts/bar-chart.test.tsx)、[mini-examples.test.tsx](../../apps/playground/src/docs/components/chart-business/mini-examples.test.tsx)；默认状态复用 E01 的示例测试文件。

1. 分别列出普通柱、迷你柱和数量条支持的状态；确认每类的零、缺测、非法、超域及全零无尺度说明。普通柱不支持的组合保留明确说明，不用空条伪装有效观测。
2. 对实际不一致补目标断言，再做最小修正；若现有行为已符合标准，记录验证通过即可。
3. 检查同组共用尺度、排序／筛选后的稳定 ID、完整标签与提示；不因筛选自动变成每条各自 100%。
4. 检查正常动效与减少动效下的更新终值及多实例隔离。2D 与 3D 路径分别记录，2D 通过不代表 3D 更新通过。

**完成标准：** 各图型的状态表达与已有支持范围一致；正确值与正确对象对应，尺度有依据。DataBar 仍是数量表达，不升级为任务进度或独立图型。

### E03：旭日默认入口的键盘下钻与返回

**修改位置：** [chart-examples.tsx](../../apps/playground/src/docs/components/chart-examples.tsx) 的 SunburstExample／DrillBreadcrumb；复用 [structure.tsx](../../apps/playground/src/docs/components/chart-variants/structure.tsx) 已有的受控 focusId、当前层级按钮与 Breadcrumb 方式。

**测试位置：** E01 的示例测试文件、[charts-playground.spec.ts](../../tests/e2e/charts-playground.spec.ts)；回归 [structure.test.tsx](../../apps/playground/src/docs/components/chart-variants/structure.test.tsx) 与 [chart-feedback-structure.spec.ts](../../tests/e2e/chart-feedback-structure.spec.ts)。

1. 先用键盘测试复现默认入口无法进入下级的问题；测试默认示例，不以已有变体通过代替。
2. 使用现有 Rain Button 和 Breadcrumb 接通下钻、返回；层级状态同时服务鼠标和键盘，不增加第二套数据／几何计算。
3. 操作后焦点留在可见、可继续操作的位置；当前层级、可进入的子级和返回路径同步。叶节点不伪装成能继续下钻的按钮。
4. 检查多级返回、数据更新／重播后的有效层级与焦点；窄容器保留完整名称和可达路径，减少动效下同样可操作。

**完成标准：** 不依赖鼠标即可进入下级并返回；焦点无丢失或陷阱；指向提示、层级说明和精确数据保持一致。

## 5. 第一批验证与交付

### 5.1 实施前基线与证据目录

本节全部是未来实施步骤，**当前只记录方案，未运行这些检查或修改测试脚本**。

1. 在card-v2确认Git状态、服务所用工作区、E01—E03涉及文件和原有失败；记录源码、下载器、Registry及相关测试的文件清单与hash。只跑能反映本批起点的目标检查，保留实际失败输出。
2. 每次运行创建新的证据目录；日志、截图、JSON事实和Playwright结果都落到该目录。基线与修改后结果分别保存，不复用历史已确认路径。
3. 先完成现有测试的输出接线：charts-playground已有 `RAIN_CHART_PLAYGROUND_EVIDENCE_DIR`；chart-feedback-structure、chart-business-motion、chart-business-sizes、chart-business-embedding仍有固定历史截图／JSON路径，须在实施时改为读取本批输出根，并分别使用structure、motion、sizes、embedding子目录。下方 `RAIN_CHART_EXPERIENCE_EVIDENCE_DIR` 是**待接入**的输出参数，本轮未让它生效。
4. Playwright的 `--output` 只改测试结果目录，不能覆盖代码里显式的截图／JSON路径；核对两者后才运行对应命令。T22扩大到其他专项时同样逐项检查输出位置，不能只换一个命令行目录就认为历史已受保护。

预计仅为验证补接的文件为上述4份现有spec，以及按第5.2节需要补例的 [charts-playground.spec.ts](../../tests/e2e/charts-playground.spec.ts)、[业务消费脚本](../../scripts/verify-chart-business-consumption.mjs)及其[现有测试](../../scripts/verify-chart-business-consumption.test.ts)。沿用现有配置、导出助手与断言，不建设新的测试框架。

### 5.2 第一批验收矩阵

| 对象 | 必查场景与通过标准 | 验证落点 |
| --- | --- | --- |
| E01 默认趋势与组合 | 有值→缺测→零→有值、末点缺测、全部缺测、零分母；图形／Tooltip／摘要／表保持同义，标准与适用mini分别核对 | 新示例单测＋现有缺测／mini尺寸测试；在charts-playground补默认入口真实读数和状态切换用例 |
| E01 更新与运动 | 正常动效中断／更新后仍保留缺口；减少动效立即得到正确终值，0和单点不回退 | charts-playground中的新增目标场景显式分别使用no-preference与reduce；不能以现有reduce截图代替正常运动证据 |
| E02 条柱与真实宿主 | 共用尺度、排序／筛选身份、0／缺测／非法／超域、表格／卡片／列表读数、窄容器与多实例；对现有正确行为只记录通过 | DataBar／Bar／mini单测，加 [业务动效](../../tests/e2e/chart-business-motion.spec.ts)、[双尺寸](../../tests/e2e/chart-business-sizes.spec.ts)、[实际嵌入](../../tests/e2e/chart-business-embedding.spec.ts)专项 |
| E03 旭日默认入口 | 键盘进入下级、多级返回、叶节点、更新后的层级与焦点；当前层级、提示及精确数据一致 | 新示例单测＋charts-playground中的默认键盘流程；已有structure单测和sunburst反馈场景作为回归，不代替新流程 |
| 当前源码下载 | 默认Line／Area／Composed缺测、适用mini缺测与默认Sunburst键盘流程离开Playground后仍可构建和操作 | 在既有业务消费脚本中补最少的chartExampleFiles定向案例，并同步类型／构建入口与浏览器断言；当前脚本的mini正常态和170变体不能证明这些新增状态／流程 |
| 编译与登记 | 应用和测试类型、Playground构建、19入口／170映射、来源hash／文件闭包无新增问题 | 下方目标命令；共享UI或vendor实际变动时补UI类型、受影响分类组合、来源锁与样式生成检查 |

用户审阅包至少包含实际页面入口、代表数据、改前／改后对照、普通运动与减少动效结果、键盘完成路径、源码版本及未覆盖项。先按第一批范围审阅；矩阵、中国地图、雷达和迷你已有局部Gate分别保留，不借本批通过自动关闭。

### 5.3 目标命令与执行条件

从card-v2执行；E01新测试和上方待补用例落地后再运行相应命令。命令是计划，不是本轮通过记录。

~~~sh
pnpm exec vitest run apps/playground/src/docs/components/chart-examples.test.tsx packages/ui/src/charts/chart-missing-data.test.tsx apps/playground/src/docs/components/chart-mini-size.test.tsx
pnpm exec vitest run packages/ui/src/charts/data-bar.test.tsx packages/ui/src/charts/bar-chart.test.tsx apps/playground/src/docs/components/chart-business/mini-examples.test.tsx apps/playground/src/docs/components/chart-variants/structure.test.tsx
pnpm --filter @rain-next/playground typecheck
pnpm exec tsc --noEmit --project tsconfig.tests.json
pnpm --filter @rain-next/playground build
pnpm exec vitest run scripts/charts.test.ts
~~~

完成5.1的输出接线、确认5173服务身份后，创建本次目录并运行目标浏览器检查。下方目录变量仅用于本次运行；前后日志也保存到实际创建的目录中。

~~~sh
mkdir -p evidence/runtime/chart-experience-first-batch
chart_experience_evidence="$(mktemp -d "$PWD/evidence/runtime/chart-experience-first-batch/run-XXXXXX")"
RAIN_CHART_PLAYGROUND_EVIDENCE_DIR="$chart_experience_evidence/default" pnpm exec playwright test --config tests/e2e/charts-playground.config.ts --output "$chart_experience_evidence/default-results"
RAIN_CHART_EXPERIENCE_EVIDENCE_DIR="$chart_experience_evidence" pnpm exec playwright test --config tests/e2e/chart-business.config.ts tests/e2e/chart-business-motion.spec.ts tests/e2e/chart-business-sizes.spec.ts tests/e2e/chart-business-embedding.spec.ts --output "$chart_experience_evidence/business-results"
RAIN_CHART_EXPERIENCE_EVIDENCE_DIR="$chart_experience_evidence" pnpm exec playwright test --config tests/e2e/chart-feedback-structure.config.ts --grep sunburst --output "$chart_experience_evidence/structure-results"
~~~

按实际改动补充回归：共享Line／Area／Composed坐标、路径或轴绑定改变时，加入现有chart-business-category与chart-business-category-motion专项；只改默认fixture／提示时，不据此扩大到所有图型改造。3D路径有改动则单独给出中间与终值证据，没有实测就保留未验证。

源码消费在补齐5.2的定向案例后运行：

~~~sh
pnpm exec vitest run scripts/verify-chart-business-consumption.test.ts
node scripts/verify-chart-business-consumption.mjs "$chart_experience_evidence/consumption"
~~~

当前业务消费脚本已经内部运行170变体验证，结果在consumption/official-variants/facts.json；业务构建／浏览器结果在consumption/facts.json。两个结果分别核对，不能把170项类型／构建写成170项浏览器通过。同一源码版本进入T22时直接引用这组结果，除非源码、下载配置、依赖或验证用例后来改变，不再另跑一次170变体脚本。

预期为目标断言通过、类型与登记一致，浏览器无新增错误。保留已有范围外失败的实际输出与影响；目标失败、未运行和范围外失败分别列出，不把它们合并成通过。

浏览器至少查看标准与窄容器、正常与减少动效、键盘必要流程、缺测状态和多实例；正常动效要检查更新途中及终点。触摸处理存在不代表真实设备已验证，Safari／VoiceOver、实体触控与完整对比度按实际覆盖报告。

交付时同步 [使用指引](../ai/charts.md)、[能力清单](../ai/chart-capabilities.md) 与实际受影响的示例源码下载。优先沿用 [chart-example-source.tsx](../../apps/playground/src/docs/components/chart-example-source.tsx) 对真实源码的读取；仅文件依赖发生变化时扩展下载闭包。只有公共合同或文件清单确有变化才更新 Manifest／Registry；vendor 有变化才更新对应本地来源 hash。

## 6. 第一批与 T22 的衔接

确认顺序为：**当前基线 → E01—E03实施及第一批专项验收 → 固定版本执行T22 → 第二批**。这是一份未来执行顺序；本次文档补齐不启动代码工作。

| 检查点 | 必须交付的结果 | 后续关系 |
| --- | --- | --- |
| 当前基线 | 工作区／服务身份、相关源码与验证文件hash、已有失败、单独的基线证据目录 | 用于区分原有问题和第一批新增问题，不当成第一批修复结果 |
| 第一批专项验收 | E01—E03完成项及5.2逐项结果；源码下载定向案例；待用户审阅的实际页面与动效／键盘证据 | 目标技术检查通过后形成T22输入；收到的第一批体验反馈先修正再固定版本 |
| 固定版本 | 实际文件清单、hash、依赖版本与检查结果索引；已有人工确认范围单列 | 用文件快照识别版本即可，不要求新建Git提交或分支；相关文件变化后补跑受影响检查 |
| T22全批收口 | 按原计划V1／V2补全图表范围，V3补受影响场景，V4核对170变体与业务下载；矩阵单页和新增默认状态必须在本次消费清单中可追踪 | 同一固定版本的第一批结果直接引用；补未覆盖或已变化的项目，保留范围外失败与未验项；不以文档检查代替运行结果 |
| 第二批入口 | T22结果、明确剩余项、已有Gate清单，以及逐图图例事件／清除规则 | 本轮仅安排顺序；后续实施仍按届时有效授权推进，自动检查不授予视觉或发布通过 |

T22交接需带上：版本身份、逐项检查及证据路径、下载样本清单、未覆盖／失败项及影响、各图用户确认范围。当前业务消费集合尚未包含矩阵单页的本次验证；T22须复用既有chartExampleFiles导出和消费路径补齐明确样本，不能仅引用旧矩阵独立消费记录。入口数量、变体数量和下载样本数量分别统计。

T22技术检查满足范围后可记录“技术收口完成、指定体验项待审”；不写成全库视觉／设备验收完成。若第一批目标失败或仍有影响读数／必要操作的问题，不能把它留到第二批并将第一批记为通过。旧范围外问题保留实际结果，不默认为本批已解决。

- [x] 三批顺序及第一批范围已由用户确认，并整理为本文。
- [x] 补齐核心业务用法、请求过程建议、第一批验收矩阵与T22衔接方案。
- [ ] 实施前基线及测试输出目录接线。
- [ ] E01 缺测样本与读数实施、验证。
- [ ] E02 条柱／DataBar 状态实施或现状验证。
- [ ] E03 旭日默认键盘路径实施、验证。
- [ ] 第一批实际浏览器证据、用户体验确认与文档回写。
- [ ] 固定第一批版本，按上述交接表完成T22全批收口，保留独立体验Gate。
- [ ] 第二批前细化逐图图例事件与清除规则。

保持 registry-candidate / unpublished。本文没有引入新的公共资产、依赖或统一交互层；不执行 Git 提交／推送、Figma 写入、发布或业务迁移。第二、三批在各自进入时依据最新源码和真实反馈细化，不以本表声称其已实施。
