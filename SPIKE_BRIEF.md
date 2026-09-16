# Rain Classroom Vibe UI — Foundation Spike Brief

- 状态：Day 0 执行基线
- 周期：10 个工作日（Day 1–Day 10）；Day 0 为进入 Spike 前的建档检查点
- 对象：Rain Next 原型组件体系
- 决策属性：本文件锁定 Spike 的范围、验证方法和停止条件，不代表代码、设计 Gate、发布或业务迁移已经完成

## 1. 执行摘要

本 Spike 用 10 个工作日回答一个问题：**Rain Classroom 的既有视觉语言，能否在 React + TypeScript + Vite + Tailwind CSS + shadcn-style source Registry 的路径上，形成一套足以支撑高保真原型、并接近生产约束的最小 Foundation？**

本阶段不建设完整组件库。团队只实现最小 Foundations、8 个组件族、4 个 Layout 原语，并用 4 类真实业务切片验证。若这些切片能够共享语义规则、密度、字体、交互和焦点行为，而不依赖页面级硬编码，即可进入下一阶段；否则应在 Spike 结束时明确否决或修正架构假设。

## 2. 背景与定位

### 2.1 两条产品线保持独立

- **Rain Classic**：现有 Vue 2.7 设计系统及其业务资产继续独立演进。本 Spike 不迁移、不替换、不修改 Classic。
- **Rain Next**：独立的 React 原型轨道。优先目标是快速产出高质量、高保真的业务原型，同时让核心语义、可访问性和组合方式接近生产要求。
- Rain Classic 是视觉和业务证据来源，不是要被机械翻译的代码模板。
- Rain Next 不复制 shadcn 默认外观；shadcn 提供的是源码持有、组合和演进方式，最终外观必须继承雨课堂视觉语言。

### 2.2 Prototype-first，production-adjacent

“原型优先”表示本阶段优化验证速度和真实业务表达，不表示可以忽略结构、状态、键盘操作或可复用性。“生产邻近”表示：

- 组件源码由项目持有，可审阅、可修改；
- 页面由可组合的语义层构成，而不是截图式堆叠；
- 核心状态、焦点、密度和字体规则在 Spike 内被验证；
- 完整工程化、发布、迁移和跨框架同步仍留在后续阶段。

## 3. 目标与核心假设

### 3.1 Spike 目标

1. 建立一套 30–45 个语义 token 的最小 Foundations。
2. 验证 Compact 与 Default 两种密度可以共用组件语义，而不是形成两套组件。
3. 验证 UI、Reading、Data 三类字体角色能在真实中文业务页面中稳定协作。
4. 实现首批 8 个组件族和 4 个 Layout 原语，并让 4 类 Benchmark 主要通过组合完成。
5. 通过 Select 与 Dialog 的并行小样对比，选择**一个** headless 基础方案。
6. 形成可追溯的 Visual Evidence → Benchmark → 实现 → 验证 → Gate 链路。
7. 在 Day 10 给出继续、修正或停止的明确结论，而不是用“还需要更多组件”延迟决策。

### 3.2 待验证的核心假设

| 编号 | 假设 | 证伪信号 |
| --- | --- | --- |
| H1 | 少量语义 token 足以覆盖四类核心切片 | 反复新增页面专属色值、间距或状态 token 才能还原页面 |
| H2 | Compact / Default 可作为上下文密度，而非组件分叉 | 同一组件必须复制实现才能满足两种密度 |
| H3 | shadcn-style source ownership 能兼顾速度与雨课堂定制 | 为改造视觉而持续绕过组件 API 或大量覆盖内部样式 |
| H4 | 8 个组件族 + 4 个 Layout 足以搭建 Foundation 级 Benchmark | Benchmark 的核心结构必须依赖未计划的大量新组件 |
| H5 | 单一 headless 方案可覆盖 Select 与 Dialog 的关键交互 | 候选在键盘、焦点、定位或组合上出现不可接受的结构性缺口 |
| H6 | Visual Evidence 可转化为语义规则，而非页面复刻指令 | 实现只能逐节点抄样式，无法解释跨页面的一致规则 |

## 4. 不可变规则

以下规则在 Spike 内视为锁定项。任何偏离都必须进入差异记录，不能由页面实现者自行修改。

### 4.1 品牌与颜色

- 主品牌蓝固定为 `#1561F8`。
- 状态、选择、操作和焦点颜色必须从语义 token 使用，不允许在页面中散落裸色值。
- 蓝—紫—青渐变只用于明确的 AI / Intelligence 语义，不可用于普通主操作、装饰背景或品牌替色。

### 4.2 字体

- 中文 UI、正文、标签和中文单位默认使用 **PingFang SC**。
- **LINE Seed JP App_OTF Bold** 只用于关键数据中的数字，以及紧贴数字的西文符号：`%`、`.`、`,`、`:`、`/`、`K`。
- 中文单位继续使用 PingFang SC；Data 字体不得泄漏到中文标题、正文、表头或普通表单。
- 字体不可用时必须有可记录的回退策略，且视觉差异进入证据，不得静默替换。

### 4.3 密度

- **Compact**：表格、资源管理、题库、知识树等高信息密度场景。
- **Default**：表单、报告、复杂工作台等需要更清晰层级或更长操作路径的场景。
- 密度由容器上下文或明确属性传递；禁止靠页面内零散覆盖制造“更紧”或“更松”。

### 4.4 Focus 与键盘可用性

- 所有可交互控件必须有可见的 `focus-visible` 状态。
- 可使用 ring / halo 与 shadcn 常见模式，但颜色、粗细、偏移和危险态必须由 focus token 控制。
- 必须区分 control、item、danger 三类焦点语义。
- 鼠标 hover 不可替代键盘焦点；Dialog 的焦点进入、约束和返回必须可验证。

### 4.5 导航与主题边界

- 平台默认采用深色导航；沉浸式导航仅作为可选模式。
- 文档站导航在本 Spike 中禁用，不作为 Benchmark 范围。
- 本阶段不建设完整暗色主题。

## 5. 技术与层级架构

### 5.1 技术基线

- React + TypeScript；
- Vite 作为 Rain Next 的已锁定构建基线；
- Tailwind CSS 负责 token 映射和受约束的样式组合；
- 采用 shadcn-style 的源码持有模式，而非黑盒组件包；
- Registry 在本阶段只验证源码组织和可复制边界，不建设完整分发服务；
- headless 依赖通过 Select / Dialog 小样实测后决定，不在实测前预设胜者。

测试运行器和截图工具是实现层选择，只要能支持本 Brief 的自动验证和证据输出，不构成跨项目架构承诺。Vite 已属于本仓库技术基线，不在该可选范围内。

### 5.2 语义层级

系统构建层级固定为：

`Foundations → Headless Primitives → Rain UI → Layouts → Patterns → Blocks → Templates`

面向人和 AI 的检索顺序从高语义到低语义：

`Template → Block → Pattern → Layout → UI → Primitive`

- **Primitive**：最小交互与结构能力，不携带业务语义。
- **UI**：雨课堂视觉和状态规则的基础组件。
- **Layout**：只拥有空间、排列、区域和滚动边界，不接管业务语义。
- **Pattern**：可复用的交互组合，如搜索筛选、固定操作区、检查器区域。
- **Block**：围绕一段业务任务组织的组合，如资源表、指标区、AI 洞察区。
- **Template**：页面级区域编排，负责把多个 Block 组合成完整体验。

Foundations 支撑所有层；Registry 是源码交付机制，不是新的视觉层级。Benchmark 可以包含临时业务内容，但不得绕过 UI / Layout 直接复制 Figma 层级。

## 6. Spike 范围与产物

### 6.1 最小 Foundations

最终语义 token 总量控制在 **30–45 个**，覆盖：

- `brand`：固定品牌色及必要派生语义；
- `text`：primary、secondary、muted、inverse、link 等最小角色；
- `surface`：page、panel、raised、overlay 等层级；
- `border`：default、subtle、strong；
- `action`：primary、secondary、ghost、danger 的状态；
- `selection`：选中行、选中项和选区；
- `focus`：control、item、danger；
- `semantic`：success、warning、error、info；
- `intelligence`：AI 专用前景、表面和渐变入口。

除颜色外，还必须形成以下最小规则：

- Typography：UI / Reading / Data 三种角色及其字体回退；
- Density：Compact / Default 的组件上下文与覆盖规则；
- Radius：`4 / 6 / 8 / 10 / full`；
- Shadow：`none / overlay / dialog`；
- Focus：control / item / danger；
- Motion：只覆盖即时反馈、浮层进入退出、区域展开收起；尊重 reduced motion。

token 数量限制用于避免过拟合。若确需突破上限，必须说明哪些跨 Benchmark 语义无法合并，并在 Day 10 评审中作为架构风险处理。

### 6.2 首批 8 个组件族

| # | 组件族 | Spike 必验能力 |
| --- | --- | --- |
| 1 | Button | primary / secondary / ghost / danger、禁用、加载、键盘焦点、两种密度 |
| 2 | Input | 标签关联、占位、清空/附加位、错误/禁用、两种密度 |
| 3 | Select | 单选基础、键盘导航、弹层定位、选中/禁用、焦点返回 |
| 4 | Dialog | 打开关闭、初始焦点、焦点约束与返回、长内容、固定操作区 |
| 5 | Tag / Badge | 信息、状态、可移除/不可移除边界、紧凑表格场景 |
| 6 | Surface / Card | page / panel / raised 层级、边框与阴影规则、内容组合 |
| 7 | Table Primitives | 表头、行、单元格、选中、状态、批量选择、空态插槽；不建设完整 DataGrid |
| 8 | Statistic | Data 字体、中文单位、趋势/状态、紧凑与报告场景 |

“Tag / Badge”和“Surface / Card”各按一个语义家族计数；家族内部的命名须在实现时固定，避免产生同义重复组件。

### 6.3 4 个 Layout 原语

| Layout | 所有权 | 必验场景 |
| --- | --- | --- |
| Stack | 垂直节奏、间距、对齐 | 表单分区、报告区块、卡片内容 |
| Inline | 水平排列、换行、对齐、间距 | 工具栏、操作组、标签组 |
| Grid | 响应式列与区域分配的最小能力 | 两列表单、KPI 区、报告摘要 |
| Split / Sidebar | 主从区域、侧栏宽度、收起和独立滚动边界 | 题库预览、知识树、复杂工作台 |

Layout 只控制外部几何与区域关系；表格、树、表单或业务面板保留自己的语义和滚动行为。

## 7. Benchmark 登记与验收重点

节点编号来自 Day 0 已确认的项目上下文。登记只建立可追溯关系，**不表示本 Spike 已重新打开或视觉核验 Figma**。

### Benchmark A — Compact 数据管理

- Visual Evidence：`2526:33858`（资源包表格）、`2526:57267`（题库 + 右侧预览）
- 目标：证明 Compact 密度可覆盖高频管理任务，并与右侧预览共存。
- 范围：搜索/筛选工具栏、批量操作、紧凑表格、Tag/状态、选中行、分页。
- 验收重点：信息密度、行选中与批量选择不混淆；工具栏不靠页面级尺寸补丁；右侧预览不破坏表格滚动和焦点顺序。

### Benchmark B — Default 大表单

- Visual Evidence：`2672:55669`（新建教材）
- 目标：证明 Default 密度与基础表单组件可以承载长流程。
- 范围：Dialog / Sheet 形态、表单分区、单双列、上传占位、长文本、校验、固定底部操作。
- 验收重点：长内容滚动与底部操作区职责清晰；错误和焦点可定位；双列退化不要求新建另一套组件。
- 边界：Sheet 若用于页面构图，可作为 Benchmark 层组合，不自动进入首批 8 组件。

### Benchmark C — 复杂工作台

- Visual Evidence：`2671:46854`（课堂回顾）、`2671:48125`（课程知识树）、`2526:57267`（题库详情）
- 目标：证明 Layout 与组件密度可以在多区域任务中协同。
- 范围：任务栏、左侧上下文、主任务区、右侧检查器、独立滚动、Pane 收起。
- 验收重点：Split / Sidebar 只拥有区域几何；各 Pane 的滚动和业务状态独立；折叠后焦点不丢失；Default 外壳可容纳局部 Compact 内容。

### Benchmark D — 报告与关键数据

- Visual Evidence：`2572:68083`（教师画像）、`2526:59312`（智能专业申报）
- 目标：证明 Data 字体规则和 AI 专属语义可在报告中稳定工作。
- 范围：报告标题、4 个 KPI、趋势、摘要、AI 洞察。
- 验收重点：数字与附着西文符号使用 Data 字体，中文单位保持 PingFang SC；普通报告内容不滥用渐变；AI 洞察具有明确语义而非装饰效果。

同一节点可以服务多个 Benchmark；`2526:57267` 的复用是有意设计，分别验证 Compact 管理和复杂工作台两类问题，不应复制为两份证据。

## 8. Select / Dialog headless 决策实验

### 8.1 实验原则

Spike 可以比较多个候选，但最终只保留**一个** headless 基础方案。禁止 Select 使用一套、Dialog 使用另一套并把分裂带入 Foundation。

### 8.2 同条件对比

每个候选必须在相同 token、相同视觉要求和相同测试场景下实现：

- Select：键盘打开/关闭、方向键导航、选中、禁用项、弹层定位、焦点返回；
- Dialog：触发、Escape、遮罩关闭策略、初始焦点、Tab 约束、关闭后焦点返回、长内容与固定操作区；
- 两者共同检查：源码可读性、Tailwind/token 接入成本、状态暴露、组合 API、包体与依赖复杂度、维护风险。

### 8.3 决策产物

Day 4 前后产出一份短 ADR，记录：候选、同条件证据、已知缺口、选择与放弃理由。胜者进入后续组件实现；败者的小样不进入组件目录。若没有候选满足核心键盘和焦点要求，本假设判为失败，不以视觉接近作为替代。

## 9. 10 个工作日执行计划

Day 0 是进入条件，不计入以下 10 个工作日。

| 日程 | 主要任务 | 当日可检查产物 |
| --- | --- | --- |
| Day 1 | 建立 React / TypeScript / Tailwind 的最小运行骨架；固定层级与源码目录；审计 14 个 Visual Evidence 登记 | 可运行空壳、目录边界、证据审计记录 |
| Day 2 | 建立 30–45 个语义 token；Typography、Density、Radius、Shadow、Focus、Motion 最小规则 | Foundation 展示页或测试夹具、token 清单、字体回退说明 |
| Day 3 | 实现 Button、Input、Tag/Badge、Surface/Card | 状态矩阵、键盘/焦点检查、Compact/Default 对照 |
| Day 4 | 对 Select / Dialog 的 headless 候选做同条件小样并完成 ADR | 对比证据、单一方案决策 |
| Day 5 | 用胜者完成 Select、Dialog；实现 Table Primitives、Statistic | 8 个组件族齐备及基础测试 |
| Day 6 | 实现 Stack、Inline、Grid、Split/Sidebar；验证滚动与折叠所有权 | 4 个 Layout 夹具、滚动/焦点证据 |
| Day 7 | 完成 Benchmark A 与 B 的最小高保真切片 | Compact 管理、大表单运行证据与差异记录 |
| Day 8 | 完成 Benchmark C 与 D 的最小高保真切片 | 工作台、报告切片运行证据与差异记录 |
| Day 9 | 跨 Benchmark 回归；键盘、focus-visible、字体、密度、token 绕过和 reduced motion 检查 | 自动验证结果、截图/差异、未决问题清单 |
| Day 10 | 统一评审四类 Benchmark；完成假设结论、风险和下一阶段建议 | Spike 决策报告、`awaiting_human` Gate 材料 |

进度按“可运行证据”统计，不按文件数量或组件声明数量统计。任何一天发现结构性失败，应立即记录并缩小后续工作，优先保护 Day 10 的决策完整性。

## 10. 验证与 Gate 生命周期

### 10.1 证据链

每个 Benchmark 必须能追溯：

`Figma 节点登记 → Visual Evidence → Benchmark 范围 → 组件/Layout 消费 → 自动验证 → 视觉差异记录 → 人工 Gate`

最少证据包括：

- 来源节点 ID 与用途；
- 实现所消费的 token、组件和 Layout；
- 运行截图或等价的真实渲染证据；
- 键盘、焦点和关键状态检查结果；
- 与 Visual Evidence 的已知差异及原因；
- 当前生命周期状态和责任人/下一动作。

### 10.2 状态采用并行轴，不采用单一状态链

每个交付对象按适用范围分别记录以下状态轴，禁止把它们压成一个“总状态”或从前一项自动推导后一项：

| 状态轴 | 示例状态 | 含义边界 |
| --- | --- | --- |
| Visual Evidence registration | `registered` | 来源已登记，不表示本次已现场复核 |
| live inspection | `not-live-reinspected` / `live-reinspected` | 是否重新打开精确来源检查 |
| Benchmark registration | `registered` | 评测范围已登记，不表示切片已实现 |
| implementation | `not-started` / `in-progress` / `completed` | 代码或切片实现状态 |
| automated checks | `not-run` / `passed` / `failed` | 只反映亲自运行的自动检查 |
| human Gate | `not-evaluated` / `awaiting_human` / `accepted` / `rework` | 只反映人工设计判断 |
| Figma material write | `not-authorized` / `written` | 代码或视觉结果写回为可编辑材料 |
| Figma Component/Variant publication | `not-authorized` / `published` | 正式设计资产发布状态 |
| package / source Registry publication | `not-authorized` / `published` | 代码资产分发状态 |
| business migration | `not-authorized` / `in-progress` / `completed` | 业务项目接入状态 |
| local Git commit | `not-created` / `created` | 只反映本地提交 |
| remote Git | `not-configured` / `configured`，写入另行授权 | 远程仓库、push、PR、合并状态 |

`conversation-confirmed` 只表示登记内容的来源依据，不能替代 `registered`。Visual Evidence 登记不等于视觉确认；实现完成不等于自动验证；自动验证不等于人工 Gate。人工 Gate 也不自动授权 Figma 写入或发布、包发布、业务迁移、本地 commit、远端 Git 写入或合并。

## 11. 成功与失败标准

### 11.1 Spike 成功

只有以下条件同时成立，才建议进入下一阶段：

- 四类 Benchmark 都有可运行切片和完整证据链；
- 主要结构由已声明的 8 个组件族和 4 个 Layout 组合完成；
- Compact / Default 能通过统一机制工作，没有复制组件体系；
- 品牌、字体、AI 渐变和 focus 规则在四类 Benchmark 中一致；
- Select / Dialog 已选定一个 headless 方案并有 ADR；
- 键盘路径、Dialog 焦点、Pane 折叠/滚动及 reduced motion 等核心行为通过验证；
- 页面没有未经解释的裸色值、字体、阴影或密度补丁；
- 所有已知差异和失败项已登记，材料达到 `awaiting_human`，但不冒充人工已接受；
- 团队能根据证据明确回答：该架构值得继续、需带哪些修正继续。

### 11.2 Spike 失败或需要重设

出现任一结构性情形，应判为失败或要求重设，而不是扩 scope 掩盖：

- 四类 Benchmark 中有核心切片无法在周期内形成可运行证据；
- 还原主要依赖页面级硬编码、复制组件或大面积覆盖内部实现；
- 两种密度必须分叉为两套组件；
- Data 字体无法避免污染中文内容，或 AI 渐变无法保持专用语义；
- headless 候选无法满足核心键盘/焦点要求，或最终保留了多套基础方案；
- Layout 接管业务状态，造成 Pane 间滚动、折叠或焦点职责混乱；
- token 数量持续膨胀且无法用跨 Benchmark 语义解释；
- 只有静态截图，没有真实运行、交互或差异证据。

局部视觉差异不必自动判定整项失败，但必须能说明它是实现缺口、证据不确定、字体环境差异还是架构限制。

## 12. 风险与控制

| 风险 | 控制方式 |
| --- | --- |
| 把 shadcn 默认风格当成目标视觉 | 每个 UI 规则都回到雨课堂 token 与 Visual Evidence；默认样式只作为实现起点 |
| Figma 页面之间存在不一致 | 优先提炼跨节点语义；例外进入差异记录，不立即扩 token |
| 证据登记被误认为最新视觉核验 | 明确区分 `registered` 和人工确认；需要时在后续 Gate 重新打开来源核对 |
| Compact / Default 在页面层失控 | 由上下文或显式属性传递密度；审计局部尺寸覆盖 |
| Data 字体缺失、授权或渲染不稳定 | Day 2 验证可用性和回退；截图记录环境，不静默换字形 |
| headless 选择被个人偏好驱动 | Select / Dialog 使用同一测试矩阵，以证据和 ADR 决策 |
| 复杂工作台的滚动与焦点互相干扰 | Day 6 先做 Layout 夹具，Day 8 再接业务切片；明确每个 Pane 的所有权 |
| 为完成 Benchmark 不断新增组件 | 首先用 Pattern / Block 组合；新增 Foundation 组件必须记录不可替代的跨场景理由 |
| 高保真目标挤压验证时间 | Day 9–10 证据与决策不可挪用；必要时缩小切片内容，不删除关键状态 |
| Spike 被误解为发布前验收 | 生命周期报告始终单列代码、自动验证、人工 Gate、发布与迁移状态 |

## 13. 明确非目标

本 Spike 不包含：

- 完整 Registry 服务或 MCP；
- 完整暗色主题；
- 全量响应式适配；
- Vue / React 双向同步或 Rain Classic 迁移；
- npm / 私有包发布；
- 14 个 Figma 页面全部实现；
- 自动生成 Figma 组件或修改 Figma 文件；
- 生产业务接入、业务数据联调或线上迁移；
- 远端 Git 仓库创建、推送、PR 或合并；
- 以自动测试或截图替代人工设计 Gate。

这些事项只有在 Spike 结论通过并获得对应的独立授权后，才可进入后续计划。

## 14. Day 0 进入条件

Day 0 只完成建档，不实施组件：

- [x] 建立本地 `rain-classroom-vibe-ui-spike` Git 仓库；
- [x] 写入并评审 `SPIKE_BRIEF.md`；
- [x] 写入新的 `AGENTS.md`；
- [x] 将 14 个 Figma 节点登记为 Visual Evidence；
- [x] 将 4 个业务切片登记为 Benchmark，并建立与 Visual Evidence 的引用关系；
- [x] 确认不存在远端 Git、Figma、包发布或业务迁移的隐含动作。

以上复选框必须依据仓库中的实际文件和新鲜检查更新；本 Brief 的存在本身不自动勾选任何一项。

## 15. 下一检查点

Day 0 文件齐备后，先进行一次只读检查点，再进入 Day 1：

1. 核对 14 个节点是否恰好登记一次，节点 ID 无误；
2. 核对四个 Benchmark 的节点映射、范围和复用关系；
3. 核对 `AGENTS.md` 是否继承本 Brief 的锁定规则与授权边界；
4. 冻结 8 个组件族、4 个 Layout、30–45 token 和 10 日时间盒；
5. 将所有未确认事实标为待验证，不用推测补齐；
6. 通过检查后启动 Day 1 的运行骨架和证据审计。

下一检查点的结果应是“可进入 Day 1”或“需修正文档/登记”，不能提前宣称 Foundation、Benchmark 或人工 Gate 已完成。
