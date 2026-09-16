# AGENTS.md

本文件是 `rain-classroom-vibe-ui-spike` 及后续 Rain Next 仓库演进的长期协作合同。它约束所有人类与 AI 贡献者。

Rain Next 的核心目标是：

> 优先帮助产品经理与设计师做出高质量、高保真、可交互的原型；只有被验证为优秀的原型或资产，才进入系统沉淀与后续生产硬化。

本仓库不是 Rain Classic 的 React 翻译版，也不是 shadcn 默认主题的雨课堂蓝色换肤版。任何实现都必须同时尊重已经确认的品牌锚点、现有雨课堂视觉血缘、原型探索自由度和验证边界。

---

## 1. 决策优先级

发生冲突时，按以下顺序处理：

1. 当前任务中用户给出的明确指令；
2. 本文件中的锁定不变量、安全边界和状态规则；
3. `SPIKE_BRIEF.md` 中的目标、范围、非目标和退出条件；
4. `status/current-phase.yaml` 中的当前阶段授权、阻塞项和检查点；
5. 与当前任务相关的 Benchmark、Visual Evidence、Manifest 和 ADR；
6. 既有实现、普通说明文档和历史记录。

补充规则：

- 不得用历史对话记忆代替仓库中的当前登记内容。
- 用户的新指令如果改变了锁定决策，必须指出变化并记录新的决策来源，不得静默覆盖。
- Visual Evidence 是设计来源，不自动等于像素级还原要求；是否要求视觉还原，由 Benchmark 或任务说明决定。
- 自动生成内容不得反向覆盖人工确认的设计决策。

---

## 2. 开始任务前

每次任务开始前必须：

1. 阅读 `SPIKE_BRIEF.md` 中与本任务相关的锁定决策、范围和非目标。
2. 阅读 `status/current-phase.yaml`，确认当前阶段允许和禁止的操作。
3. 阅读 Evidence 与 Benchmark 的索引，并仅加载与当前任务相关的条目：
   - `evidence/visual-evidence.yaml`
   - `benchmarks/benchmark-registry.yaml`
   - `benchmarks/README.md`
4. 检查当前工作区、Git 状态和用户已有修改，只处理本任务授权范围。
5. 根据修改对象和影响范围判定 Prototype Mode 或 System Mode。
6. 在实施前写明：
   - 本次任务目标；
   - 工作模式；
   - 预计修改范围；
   - 验证方法；
   - 尚未验证的假设。

不得为了节省上下文而跳过相关 Evidence、Benchmark、Manifest 或 ADR，也不得每次无差别加载全部资料。

生成或改造原型页面前，先读 [原型设计入口](docs/ai/prototype-design.md)，按主任务读取命中的组合、参考图与组件合同。用几行记录适用原因、保持关系和必要变化；交付前查看真实整页与必要状态。反馈按该入口回流到组件合同、组合指南或页面局部记录，不把单页数值升级为全库默认。独立 Starter 随附同一设计入口，避免只交付源码而丢失使用依据。

涉及图标时，先阅读 [图标选择规范](docs/ai/icon-selection.md)，再查询 `@rain-next/foundations/icons/catalog` 的身份、可用性与静态引用。按实际行为选择；唯一已确认规则直接使用。仅 `availability: available` 的资产可导入，未定义用途不等于不可用。使用 `@rain-next/ui/icons/<slug>` 单图标入口并加载已有 UI 样式；目录预览入口仅供完整图库页面使用。普通图标颜色由宿主提供，不在页面补写白色、重画 SVG 或用近似字符替代。来源与未解决项见 [图标来源记录](evidence/icons/README.md)。

### Bootstrap 规则

如果 `status/current-phase.yaml` 尚不存在，则视为 `bootstrap` 状态：

允许：

- 审阅现有文件；
- 创建或修订治理文档；
- 登记 Visual Evidence 与 Benchmark；
- 建立目录和空白 Schema；
- 输出实施计划与待确认项。

禁止：

- 安装依赖；
- 初始化完整运行时；
- 批量安装 shadcn 资产；
- 实现公共组件；
- 执行 Figma 写入；
- 创建远程仓库、push、PR、发布或业务迁移。

不得根据日期、文件名、提交记录或历史对话自行推断已进入后续阶段。

---

## 3. 产品与仓库边界

- 本仓库是独立的 **Rain Next** 原型与源码资产轨道。
- 固定技术方向为：
  - React；
  - TypeScript；
  - Vite；
  - Tailwind CSS；
  - shadcn-style source Registry。
- Rain Next 的定位是 **Prototype-first, Production-adjacent**：
  - 首先验证产品体验、信息架构、交互和视觉质量；
  - 不要求原型代码天然等于生产代码；
  - 被证明优秀的原型或资产，才进入独立的生产硬化流程。
- Rain Classic，即现有 Vue 2.7 组件库、Figma 资产和业务实现，保持独立。
- Rain Classic 可以作为只读的视觉、业务、布局和组件能力参考；未经单独授权，不得修改、搬迁、同步、发布或重构 Rain Classic 内容。
- Vue 与 React 不要求逐像素一致、API 一致、组件一一对应或同步发布；但必须共享已锁定的品牌锚点、视觉血缘、业务语义和无障碍原则。
- 不得为了未来可能生产化而过早平台化，或牺牲当前原型质量、探索速度和方案比较能力。
- 不得将“原型可运行”或“原型看起来完成”表述为“系统资产完成”“可发布”或“已生产化”。

---

## 4. 当前阶段与授权

Day、Phase、当前允许操作、阻塞项和用户检查点，只由：

```text
status/current-phase.yaml
```

记录。

根 `AGENTS.md` 不长期写死 Day 0、Day 1 等临时状态。

每次任务必须遵守当前阶段授权：

- 阶段未授权的工作不得提前实施；
- 测试通过不构成阶段自动推进；
- AI 不得自行关闭用户检查点；
- AI 可以准备 Human Gate 所需证据，但不得自行将 Human Gate 标记为“通过”；
- 需要扩大范围时，先报告收益、代价、风险与对当前 Spike 的影响，再等待明确授权。

---

## 5. 两种工作模式

模式不仅由任务文案决定，也由修改对象和影响范围决定。

### 5.1 Prototype Mode

默认适用于：

- `apps/prototype/**`；
- `benchmarks/**` 中的场景实现；
- 页面私有组件；
- 明确标记的 `local-experiment`；
- 视觉、信息架构和交互方案探索。

目标是快速、高保真地验证产品与架构假设。

允许：

- 创建页面私有组件；
- 创建局部 Recipe；
- 调整 Block 内部布局；
- 修改信息层级和区域组合；
- 尝试临时 Variant；
- 使用明确标记的 Mock 数据；
- 本地试用外部 Registry 资产；
- 对不成熟方案进行多版本比较。

仍然必须：

- 使用 Rain 语义 Token 和锁定品牌规则；
- 保留稳定的追踪属性；
- 标出实验性、假数据、未验证、来源和待迁移内容；
- 保持基本语义、键盘操作、Focus 和可访问性；
- 不将本地实验自动登记为公共系统资产；
- 不因原型可用推导系统可发布或可生产接入。

Prototype Mode 不要求每一个页面私有结构都先设计稳定公共 API，也不要求每一个实验都进入 Registry。

### 5.2 System Mode

自动适用于：

- `packages/foundations/**`；
- `registry/**`；
- `manifests/**`；
- 共享 UI、Layout、Pattern、Block、Template；
- Token、主题、字体、密度、Focus、图标和无障碍规则；
- Registry、生成器、文档基础设施、测试基础设施；
- 公共资产的成熟度、版本、来源或发布状态变更。

目标是建设可组合、可检索、可追踪、可验证的系统能力。

必须先明确：

- 资产层级；
- Anatomy 与 Parts；
- Props、Slots 或 Compound API；
- Variants、States 和 Density；
- Token 使用；
- Composition Rules；
- 修改等级；
- Accessibility；
- Visual Lineage；
- 来源与版本；
- Manifest、Registry 和验证证据。

同时涉及 Prototype 与 System 目录时，按 System Mode 执行。

无法判断一个资产是页面私有还是公共系统资产时，不得默认修改共享实现；应先明确其资产身份。

---

## 6. 架构分层、检索顺序与依赖方向

### 6.1 架构层级

- **Foundations**：Token、字体、密度、Focus、圆角、阴影、动效、图标、断点和无障碍规则。
- **Primitive**：无品牌或低视觉语义的底层行为，如 Overlay、Focus Management、Menu、Listbox、Dialog State。
- **UI**：用户可感知的 Rain Next 品牌组件，如 Button、Input、Select、Dialog、Table。
- **Layout**：空间关系、分区、滚动、固定区、响应式与容器规则。
- **Pattern**：可重复的交互或信息组织规则，如 Filter Bar、Table Toolbar、Form Section。
- **Block**：面向明确业务目标、具有较高设计完成度、预期可复制和改造的源码资产，可覆盖一个或多个区域。
- **Template**：完整页面或场景骨架，是生成页面的起点，不是不可修改的成品页面。
- **Local Prototype**：只服务当前原型的页面私有实现，不属于公共架构层。

### 6.2 AI 资产检索顺序

```text
Template → Block → Pattern → Layout → UI → Primitive
```

规则：

- Foundations 是所有层共享的基础，不属于页面资产检索链。
- AI 应优先选择语义匹配度足够的高层资产。
- “层级更高”不等于“必须使用”。当 Template 或 Block 与任务语义不匹配、改造成本过高或引入无关结构时，应退回较低层重新组合。
- 不得在已有合适 Template、Block 或 Pattern 时，无理由直接堆砌基础 UI。
- 每一层先检索 `@rain`；Rain 缺失时，再评估已批准的外部 Registry。

### 6.3 代码依赖方向

```text
Foundations → Primitive → UI / Layout → Pattern → Block → Template
```

规则：

- 禁止反向依赖和循环依赖。
- Layout 只承担空间和分区，不偷渡业务状态。
- UI 与 Primitive 不承载页面级业务流程。
- Pattern 与 Block 可以组合 UI 和 Layout，但不得复制 Foundations。
- 业务数据请求、权限、路由和生产领域逻辑优先留在应用层或显式 Domain Adapter 中。

---

## 7. 资产身份、修改等级与成熟度

### 7.1 资产身份

所有新增实现必须明确属于以下之一：

这里的 `assetIdentity` 描述治理归属；第 7.3 节的 `maturity` 独立记录。即使命名相近，也不得自动同步或互相推导。

#### `local-experiment`

- 仅当前原型使用；
- 不进入公共 Registry 搜索；
- 可以快速改造；
- 必须明确标记来源、假设和未验证状态；
- 不得伪装成公共系统资产。

#### `registry-candidate`

- 已证明可能被其他原型复用；
- 必须登记候选 Manifest、来源、Visual Lineage 和待验证项；
- 允许 API 和视觉继续变化；
- 不得表述为 System Approved。

#### `system-approved`

- 已完成系统级设计与验证；
- 必须同步 Registry、Manifest、文档、测试和证据；
- 只有 Human Gate 通过后才能获得该状态。

允许明确标记的本地实验，不允许身份不明的孤立实现。

### 7.2 修改等级

#### `managed`

适用于基础 UI、复杂 Headless 行为和受保护的 Foundation。

- 优先通过 Props、Variants、Parts、Slots 和组合扩展；
- 不得为单一页面直接污染公共 API；
- 不得在业务页面中直接修改共享内部行为；
- 需要特殊结构时，创建本地 Fork 或提交 System Mode 变更。

#### `forkable`

适用于 Pattern、Block 和 Template。

- 允许复制后改变布局、内容结构和局部组件；
- 必须保留来源、版本和本地修改状态；
- 本地 Fork 不自动回流公共 Registry。

#### `local`

适用于页面私有实验。

- 允许快速调整；
- 不进入公共检索；
- 不得被其他任务误认为正式 Rain 资产。

### 7.3 成熟度

成熟度只能使用：

```text
local-experiment
prototype-ready
registry-candidate
design-reviewed
system-approved
production-candidate
production-adopted
deprecated
```

必须保持：

```text
assetIdentity ≠ maturity
migrationLabel ≠ maturity
maturity ≠ publication
publication ≠ business adoption
```

不得通过测试通过、Figma 写入、发布或业务采用中的任意一项，自动推导其他状态。

---

## 8. Registry、Manifest、来源与迁移标签

### 8.1 Registry

Registry 是可获取的源码资产与安装关系，负责：

- 源码文件；
- 目标路径；
- npm 依赖；
- Registry 依赖；
- Token 或配置依赖；
- 安装和组合入口。

Registry 不等于：

- npm 已发布；
- 资产已设计审核；
- 资产已生产采用；
- 完整的 AI 使用知识。

### 8.2 Manifest

Manifest 是供人和 AI 检索的能力合同，至少应包含：

- `id`、`name`、`category`、`maturity`；
- `description`、`useWhen`、`doNotUseWhen`；
- `anatomy`、`parts`；
- `props`、`slots`、`variants`、`states`；
- `dependencies`、`tokens`、`layoutConstraints`；
- `compositionRules`；
- `modificationMode`；
- `allowedModifications`、`restrictedModifications`；
- `accessibility`；
- `examples`、`recipes`、`antiPatterns`；
- `relatedComponents`、`relatedBlocks`；
- `visualLineage`；
- `figmaMapping`；
- `sourcePath`、`sourceVersion`、`migrationNotes`。

Manifest 不得指向不存在、无法获取或未验证的实现。

### 8.3 Visual Lineage

每个正式或候选 Rain Next 系统资产必须记录：

- `rainClassicReferences`；
- `externalReferences`；
- `retainedTraits`；
- `redesignedTraits`；
- `intentionallyNotInherited`。

正式设计前必须核对相关 Rain Classic 页面、组件或 Token 证据。不得只把 shadcn 的 `primary` 替换为雨课堂蓝后称为 Rain Next。

### 8.4 外部资产

Prototype Mode 可以本地试用 `@shadcn` 或其他已批准来源的资产，但必须记录：

- Registry 与 Item；
- 上游版本、Commit 或可验证来源；
- 引入原因；
- 本地修改状态；
- 是否仅试用；
- 是否计划回收进 Rain Registry。

本地试用不代表 Rain 已采用，也不代表未来必须回收。

外部资产进入 Rain Registry 前，必须完成：

- Rain Token 转译；
- 视觉血缘说明；
- 键盘、Focus 与可访问性验证；
- 组合和 API 评审；
- Manifest 登记；
- Human Gate。

不得为所有 shadcn 组件统一增加无意义的 Rain Wrapper。优先拥有和改造源码，并保持清晰的 Parts 与组合结构。

### 8.5 来源与本地差异

已安装或复制的 Registry 资产应在仓库既定的来源记录中保存：

- Registry；
- Item；
- Source Version 或 Commit；
- Checksum；
- `modificationMode`；
- 本地状态，如 `clean` 或 `modified`。

如果当前仓库尚未建立来源锁定机制，应明确标记为未完成，不得宣称已具备完整追踪能力。

### 8.6 迁移标签

`migrationLabel` 只能使用：

```text
adopt-shadcn
adapt-shadcn
rewrite-from-rain
retain-vue-only
react-only
retire
```

迁移标签不是成熟度、优先级或发布时间。

任何改标必须记录：

- 依据；
- 比较对象；
- 收益；
- 代价；
- 风险；
- 决策人或决策来源。

---

## 9. 锁定的 Rain Next 视觉 DNA

### 9.1 总体方向

Rain Next 是 Rain Classic 的现代演进，不是无关的新视觉系统，也不是 shadcn 默认主题换色。

核心视觉关键词：

```text
深蓝锚定
浅蓝承载
白色聚焦
信息优先
局部点亮
```

必须：

- 使用偏冷的深蓝灰文字，而不是默认纯黑；
- 使用浅冷色工作区和白色任务表面；
- 通过位置、对齐、间距、背景和轻边框表达层级；
- 保持教育 SaaS 的高信息密度与清晰秩序；
- 使用克制圆角、轻边框和低阴影；
- 避免无必要的多层 Card 嵌套；
- 不直接采用 shadcn 默认灰阶、蓝色色板、圆角和阴影作为最终 Rain Next 设计。

### 9.2 品牌主蓝

品牌主蓝固定为：

```text
#1561F8
```

规则：

- 不得调色、替换、重新定义或在局部主题中覆盖；
- 不得使用“接近的蓝色”代替；
- 主品牌蓝用于主要操作、当前选中、核心链接和关键品牌状态；
- 不得把主品牌蓝作为普通装饰色大面积滥用；
- Hover、Pressed、Subtle、Selected、Focus 等派生色允许重新设计，但必须参考现有雨课堂色彩关系，保持品牌血缘；
- 所有派生色必须通过 Rain Token 提供，不得在组件或页面内临时硬编码。

### 9.3 字体

除关键数据数值字形外，全部正式 UI 文字统一使用：

```text
PingFang SC
```

包括：

- 中文；
- 英文；
- 普通数字；
- 日期；
- 单位；
- 控件文字；
- 表格内容；
- 导航；
- 标签；
- 辅助信息。

字重：

```text
Regular 400
Semibold 600
```

系统回退字体只用于开发环境容错，不构成正式视觉选择。

未经明确授权和字体分发许可，不得把字体文件纳入仓库、Registry 或交付物。

### 9.4 关键数据字体

`LINE Seed JP App_OTF Bold` 仅用于承担视觉锚点的关键数据，例如：

- 核心得分；
- 关键比例；
- KPI 总数；
- 重要排名；
- 报告首屏核心指标。

使用规则：

- 数字及紧邻数字的 `% . , : / K` 使用 LINE Seed；
- 中文单位如“分、次、万、小时、人、题、门、个、名、天”继续使用 PingFang SC；
- Value、Unit、Label 必须拆分为独立语义 Parts；
- 不得把整个 Statistic、Card、标题或容器切换为 LINE Seed；
- 普通表格数字、日期、分页、序号、表单值和普通元数据不得使用 LINE Seed；
- 未列出的西文单位或符号不得自行扩展为 LINE Seed 使用范围。

### 9.5 Typography

短文本、控件、表格和工具栏使用 UI Typography。

大段正文、答案解析、评语、报告结论、课程介绍和长篇说明使用 Reading Typography：

```text
14px / 24px
15px / 26px
16px / 26px
```

不得根据字符串长度临时修改行高；必须根据内容角色选择 Typography Token。

### 9.6 Density

密度由场景或父级 Context 控制，不是每个组件随意选择的局部装饰。

#### `compact`

默认用于：

- 表格；
- 资源管理；
- 题库；
- 知识树；
- 文件管理；
- 高频批量操作和高密度筛选。

#### `default`

默认用于：

- 表单；
- 报告；
- 复杂工作台；
- 长内容；
- 设置流程；
- 需要持续阅读与判断的页面。

允许复杂工作台局部组合：

```text
页面整体：default
列表或表格：compact
Inspector：default
工具栏：compact
```

同一局部组件组内不得混用密度。优先通过父级 Context 或 `data-density` 控制，而不是让 Button、Input、Select 各自独立决定。

### 9.7 圆角、表面和阴影

公共系统资产只使用：

```text
radius: 4 / 6 / 8 / 10 / full
shadow: none / overlay / dialog
```

建议语义：

- 4px：小标签、局部状态；
- 6px：Button、Input、Select；
- 8px：Card、Panel；
- 10px：Dialog、大型 Block；
- full：头像、计数和胶囊。

普通 Card 默认无阴影或极轻阴影。Popover、Dropdown、Dialog 可以使用柔和冷色阴影。

Prototype Mode 也默认遵守上述档位。只有当前任务明确授权探索圆角或阴影 Foundation 时，才可在标记的 `local-experiment` 中临时比较其他值；实验值不得进入公共 Token，也不得表述为 Rain Next Foundation。

### 9.8 平台壳与场景

- 平台型工作台默认使用深色一级导航作为品牌识别。
- 沉浸式任务页可以简化或隐藏平台导航，但必须保留返回路径和任务上下文。
- 独立原型不强制使用完整平台壳。
- 组件文档站不使用平台工作台的深色一级导航，但必须消费 Rain Next Token、字体、组件和 Focus 规则。

### 9.9 AI 与智能化视觉

蓝紫青色与渐变只表示 AI、智能生成、智能分析、洞察、预测或推荐。

允许的层级：

- `mark`：图标、小标签、局部文字；
- `surface`：智能建议、摘要和结果模块；
- `hero`：核心 AI 产品或重要智能洞察。

禁止：

- 普通主按钮使用 AI 渐变；
- 普通导航、Tab、Card 或表格行使用 AI 渐变；
- 为了“科技感”给非 AI 页面增加无业务含义的发光与渐变；
- 把整个 Rain Next 变成蓝紫渐变系统。

### 9.10 Focus Indicator

Focus 必须：

- 使用 `:focus-visible` 或等价键盘焦点机制；
- 清晰、稳定、键盘可见；
- 不得只复用 Hover；
- 不得只依赖轻微颜色变化；
- 在浅色、深色、品牌色和危险状态下都可识别；
- 在移除原生 Outline 后提供明确替代；
- 兼顾高对比度模式和 reduced-motion。

Foundation Spike 沿用已锁定的三类 Focus 语义 Token：

```text
control
item
danger
```

若后续要将目标类型与危险意图拆成二维模型，必须通过 ADR 明确迁移，并同步修订 `SPIKE_BRIEF.md` 与相关 Token 合同；在此之前不得静默改变语义。

可以参考 shadcn 的 ring/halo 设计思路，但必须转译为 Rain Next Token。Focus Ring/Halo 不属于 Elevation Shadow，因此不受 `none / overlay / dialog` 阴影档位限制。

---

## 10. 组件与组合规则

- 优先采用开放的 Compound Components、Parts、Slots 和清晰的 Variant，而不是不断增加配置型大 Props。
- UI 组件应提供稳定的品牌与行为边界；Block 和 Template 应保留更大的结构改造自由度。
- 不得为单一页面需求污染公共组件 API。
- 页面特殊结构优先通过组合、局部 Fork 或本地组件解决；只有重复验证后才升级为公共能力。
- `className` 可用于局部布局和组合，但不得绕过品牌、字体、密度、Focus 和语义 Token。
- 禁止在页面中硬编码品牌颜色、近义圆角、任意阴影和未经登记的字体。
- Card 只在表达独立对象、集合项或明确表面边界时使用，不得成为所有布局的默认容器。
- Layout 负责空间关系；Pattern 负责重复交互；Block 负责业务目标；不得用基础 UI 偷渡页面结构。
- Headless Primitive 只抽取复杂、跨组件复用的行为，不默认将所有组件 Headless 化。
- Foundation Spike 期间，Headless Base 必须通过 ADR 决定；未锁定前只允许受控对照实验，锁定后不得无理由混用多套 Base。

### 10.1 Tailwind B2：组合速度与局部隔离

按 [B2 ADR](docs/adr/0002-tailwind-b2-local-fork.md) 和当前阶段的精确范围执行，不以此条款授权全库迁移。

- Global Master 为 `managed`：采用 Tailwind-first，不追求 Tailwind-only；页面任务默认只读 Master，只有明确授权的 System Mode 才能修改共享源码。
- AI 默认静默使用最小改动层级：Existing Variant → 具名 Local Recipe → Local Fork。默认作用域是当前页面或功能，不是整个项目；仅高风险或真实意图不明时询问。
- Local Recipe / Local Fork 均为 `local-experiment`；登记 ID、来源、作用域、修改 Parts、Token 和晋升状态。Fork 另记来源文件、checksum、创建时版本及更新状态；不能因源码可编辑就丢失来源。
- Rain 公共语义 / 组件 / 组合 Token 是视觉唯一事实源，Tailwind 只映射。受 B2 合同保护的 Master 和 Local Fork 不消费 Tailwind 默认视觉体系、未登记任意视觉值、裸颜色、私有 `--rain-ref-*`、important 覆盖或动态拼接 utility；布局关系可以使用结构类。
- 缺少合适 Token 时，只能创建已登记的 `--rain-local-<feature>-<role>` 候选，限制在功能根节点内；不得写全局 `:root` 或自动进入 Foundations。
- CSS 例外按理由判断，不看 Tailwind 占比。必须有 Manifest ID、选择器、Token、作用域与测试；浏览器适配、复杂 Parts 联动和加载动画可构成理由，个人偏好不构成绕过合同的理由。
- 图标复用既有单图标入口和来源资产。宿主组合受 Rain Token 控制，原始多色图形保留来源配色，不重绘、不复制全库、不扩大语义默认；图标自身的来源/生成验证仍独立执行。
- Master 更新只报告差异，不自动覆盖 Local Fork；已登记的无障碍或核心行为修复标记 `required-review`，发布前必须处理。
- 局部结果不能自动晋升全局 Variant、Recipe、Token 或 Master。至少三个独立场景后才有主动提示资格；只在收尾、发布前或用户询问时集中提示，同一候选提示一次，暂缓后无新证据不重提。严重缺陷和无障碍问题不受静默限制。
- 小检查随局部修改执行；完整验证在批次或阶段节点执行。自动化通过不替代价值对照或独立 Human Gate，未实测指标必须写 `not-measured`。

### 10.2 Token Foundations V1：第 0/1 批独立建设

2026-09-05 用户在跨专题评估后授权开始第 0/1 批。以 [ADR 0004](docs/adr/0004-token-foundations-v1.md)、[实施计划](docs/plans/2026-09-05-token-foundations-v1-implementation.md)和当前阶段精确范围为准；旧 B2 完整状态保存在 `phaseHistory.tailwindB2`，不得把新阶段验证结果回填为旧 B2 完成。

- 新公共入口允许已登记的 Public Category Color、Typography 基础、Line Thickness、Radius 与 Spacing；“只有 Semantic / Component / Composition 可公开”的旧条款在本批新能力范围内由此明确扩展。颜色用途、Alpha、主题及消费者资格仍按最新颜色治理验证，私有 Reference 继续禁止公开。
- 公共 Radius 增量允许 `12 / 16`，其他值沿用既有档位；Spacing 和排版值以已确认合同为准。旧组件仍保留当前引用与验收，不能因增加公共值自动迁移。
- 单源生成只接管已登记的输出区；旧颜色、组件值、Focus、Density、Motion 与图标来源几何保持冻结。新的 Line 不替换 Focus，新的 Typography 预设不自动覆盖旧 UI / Reading / Data 角色。
- 默认使用完整 Typography / 组件方案；局部拆分需要检查关联几何、状态与可访问性。Size / Density 的来源和选择遵循 ADR 0003；公共控件高度表及组件映射未定稿，不在本批实现。
- 新演示入口为 `local-experiment`。新增静态 utility、扫描路径、合并规则、生成来源及验证范围精确登记；不开放全仓扫描、默认视觉值、任意值或动态类名，也不建立第二套 bridge / 白名单。
- 只开放第 0/1 批基础与独立演示验证；组件迁移、后续批次、Dark、Figma、发布、业务采用与 Git 保持各自未授权状态。自动检查、独立审阅与 Human Gate 分别记录。

---

## 11. 可追踪性合同

每个可消费资产的公共根节点必须保留：

```text
data-rain-id
```

语义子区域使用：

```text
data-slot
```

对外可观察的变体、尺寸、交互状态和密度分别使用：

```text
data-variant
data-size
data-state
data-density
```

规则：

- 值使用稳定的 kebab-case 语义名；
- 不使用随机 ID、业务文案、DOM 顺序或 CSS 类名作为长期识别；
- 包装、组合、复制和重构不得丢失追踪属性；
- 追踪属性只存语义标识，不存教师、学生、课程等私有数据；
- Headless Library 自带的状态属性可以与 Rain 属性并存，但不得产生冲突或重复事实源。

测试定位规则：

- 可访问性和真实用户交互测试优先使用 role、accessible name、label 和可见文本；
- 组件结构、Registry、视觉区域和迁移追踪测试使用 `data-rain-id` 与 `data-slot`；
- 不得为了测试方便牺牲真实语义。

---

## 12. 文档站要求

Rain Next 文档站的目标是类似优秀组件网站的查找、体验与修改指导，不是低代码拖拽工作台。

公共系统资产页面应根据成熟度逐步提供：

- Overview；
- `useWhen` 与 `doNotUseWhen`；
- 基础预览；
- Variants 与 States；
- Compact / Default；
- Anatomy 与 Parts；
- Props、Slots 或 Compound API；
- 可修改和禁止修改的边界；
- Accessibility；
- 示例与反例；
- 安装与代码；
- Visual Lineage；
- 来源、版本与本地修改说明；
- Figma Mapping；
- 相关 Layout、Pattern、Block 或 Template。

文档站不使用平台型深色一级导航作为默认壳，但必须保持 Rain Next 视觉 DNA。

---

## 13. Figma 协作与回流

代码导回 Figma 后，默认状态只是：

```text
可编辑设计材料
```

不自动等于：

- 正式 Figma Component；
- 正式 Variant；
- Design Reviewed；
- System Approved；
- 代码发布或业务采用。

推荐流程：

```text
React Prototype
→ Imported Sandbox
→ Candidate
→ 人工整理与设计审核
→ Reviewed
→ 正式 Component / Variant
→ 更新 Manifest 与代码映射
```

AI 可以：

- 准备可编辑图层；
- 保留清晰的 `data-rain-id` 和 `data-slot`；
- 输出组件结构与来源；
- 生成审核清单。

AI 不得：

- 自行把 Imported Sandbox 标记为正式组件；
- 自行通过设计 Gate；
- 在未授权时写入 Figma；
- 把代码与 Figma 的视觉相似度表述为正式映射完成。

---

## 14. 验证与可访问性

实现最低需覆盖：

- 语义 HTML 或合理 ARIA；
- 可读标签与 Accessible Name；
- 键盘全流程；
- 清晰可见的 Focus；
- 合理 Focus 顺序与恢复；
- 对比度；
- Disabled、Loading、Error 和 Empty 状态；
- Reduced Motion；
- 关键 Overlay、Portal、Scroll 和 Resize 行为。

工作规则：

1. 修改前先写明验证方法。
2. 完成前运行与风险相称的：
   - Type Check；
   - Unit Test；
   - Interaction Test；
   - Browser Test；
   - Accessibility Check；
   - Visual Check。
3. 只报告当前亲自运行且有输出的检查。
4. 不得把“应该通过”、代码审阅、自动分数或历史通过记录写成“本次已通过”。
5. 视觉相似不替代语义、键盘和辅助技术检查。
6. 自动化结果不替代人工设计 Gate。
7. AI 可以整理失败证据和建议，但不得隐瞒失败、降低门槛或伪造结果。

---

## 15. 独立状态，禁止串联推导

以下状态必须分别记录，任何一项完成都不会自动推进其他项：

1. Visual Evidence：未登记 / 已登记 / 已复核；
2. Benchmark：未登记 / 已登记 / 已实现 / 已比较；
3. Implementation：未开始 / 进行中 / 完成；
4. Automated Checks：未运行 / 通过 / 失败；
5. Human Gate：未评估 / 待确认 / 通过 / 退回；
6. Figma Editable Material：未写入 / 已写入；
7. Figma Component / Variant：未发布 / 已发布；
8. Registry 或代码包：未发布 / 已发布；
9. 业务迁移：未开始 / 进行中 / 已上线；
10. Local Git Commit：未创建 / 已创建；
11. Remote Repository、Push、PR、Merge：分别记录。

解释：

- Visual Evidence 登记只证明来源已被索引；
- Benchmark 关联只证明其被选为对照场景；
- Implementation 完成不等于验证通过；
- Automated Checks 通过不等于 Human Gate 通过；
- Human Gate 通过不构成发布授权；
- Figma 可编辑材料不等于正式 Component / Variant；
- Registry 发布不等于业务采用；
- 本地 Commit 不等于 Push、PR 或 Merge。

不得使用“已完成”作为覆盖所有状态的模糊结论。

---

## 16. 安全、发布与远程操作

- 不读取、复制、记录或输出密钥、OAuth、Keychain 数据、私有教师/学生数据或无必要的受限 URL。
- 在 Commit 或任何发布前，检查：
  - 敏感内容；
  - 路径；
  - 大文件；
  - 字体文件；
  - 生成物；
  - 实际 Diff；
  - 与任务无关的用户修改。
- 创建远程仓库、配置 Remote、Push、PR、Merge、Figma 写入、包发布、Registry 发布和业务迁移，都需要各自明确授权。
- “继续计划”、测试通过、人工 Gate 通过或本地 Commit 都不构成远程操作授权。
- 禁止未授权的破坏性 Git 或文件操作。
- 不覆盖、丢弃、重置或“清理”不属于当前任务的本地工作。
- 不因格式化、生成或依赖升级制造与任务无关的大面积 Diff。

---

## 17. 文件与命令约定

- 在仓库根目录执行命令。
- 搜索优先使用 `rg` 和 `rg --files`。
- 文件编辑使用最小、可审阅的 Patch。
- 保持 Markdown、YAML、JSON 和 Manifest：
  - 可读；
  - 稳定；
  - ID 唯一；
  - 引用完整；
  - 排序可预测。
- 不直接修改明确标记的生成文件；应修改其事实源并重新生成。
- 当 `package.json`、脚本和 CI 在授权阶段建立后，以仓库已定义命令为准，不自行发明“通过命令”。
- 新增公共 Token、组件、Layout、Pattern、Block、Template、Benchmark 或 Evidence 时，按其资产身份同步对应的 Registry、Manifest、登记表和验证证据。
- `local-experiment` 可以不进入公共 Registry，但必须明确标记，且不得被公共检索收录。
- 所有架构性决定应记录 ADR；不得只存在于聊天记录或 Commit Message 中。

---

## 18. 与用户沟通

用户主要以产品、设计和业务目标作出判断。

当需要用户决定时：

- 先用产品与设计语言说明影响；
- 明确给出推荐项；
- 同时说明收益、代价、风险和可逆性；
- 只询问会真实改变架构、视觉或范围的问题；
- 不重复询问已经锁定的决策，除非发现新证据与其冲突。

无法验证的内容必须标记为：

```text
尚未验证
```

不得把合理推断写成已确认事实。

---

## 19. 交付要求

每次交付必须明确列出：

1. 当前阶段与工作模式；
2. 实际修改的文件和内容；
3. 实际运行的验证及其结果；
4. 未运行、失败或尚未验证的项目；
5. 未获得授权的状态；
6. 是否产生 Local Experiment、Registry Candidate 或 System Asset；
7. 是否需要 Human Gate；
8. 下一个所需检查点。

不得使用以下模糊表达替代事实：

- “基本完成”；
- “应该没问题”；
- “已经可发布”；
- “已经生产可用”；
- “Figma 已同步”；
- “组件库已完成”。

除非对应状态已经被独立记录，并且有当前任务产生的证据支持。
