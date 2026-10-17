# Rain Next 颜色 Token 建设、迁移与主题治理规范

## 0. 文档状态

- 文档类型：颜色 Token 的长期建设与治理设计。
- 决策状态：初版架构经逐层讨论确认；2026-09-05 用户授权根据审核修订身份与插级、Alpha 输出、组合校验、OnColor 资格、共享来源修改规则，以本版对应条款为准。
- 当前建设范围：Light Mode。
- 当前实现状态：`not-started`。本文不表示 Registry、代码、Figma、组件迁移或 Dark Mode 已经完成。
- 工作模式：System Mode；颜色 Token 属于 Foundations。
- 当前允许动作：修订设计与迁移依据；本次授权不启动颜色实现或组件迁移。
- 当前未授权动作：修改颜色实现、迁移组件、写入 Figma、发布 Registry 或包、业务接入、Git commit 或远端操作。

本文是当前颜色改造的治理依据。实施完成前，仓库中的现有 Token 合同仍然代表实际运行状态；实施完成后，结构化 Registry 成为数值与映射的唯一事实源，本文继续负责解释规则、边界和维护方法。

2026-09-06 补充：[Second、Orange、Green、Red 色值与 Fill 前景搭配](2026-09-06-color-family-supplement-design.md)。该补充保留本次四族 Solid 一级、二级仅反白，Solid 三级与 Alpha 使用普通深色或同系前景的用户决定，并列出具体配对缺口。本节上方的 `not-started` 与授权条目是本文初次修订时的记录；原第 0/1 批已有 57 个运行颜色，当前实现及授权以阶段文件和 Registry 为准，新增 48 项在补充文档中单独记录。

相关现状与历史依据：

- [项目长期协作合同](../../AGENTS.md)
- [当前阶段与授权边界](../../status/current-phase.yaml)
- [Day 2.1 Focus 与旧颜色体系设计](2026-09-01-day-2-1-focus-color-correction-design.md)
- [Tailwind B2 与 Local Recipe / Fork 设计](2026-09-03-tailwind-b2-local-fork-design.md)
- [Tailwind B2 实施计划](2026-09-03-tailwind-b2-local-fork-implementation.md)
- [ADR 0001：Icon 资产与宿主供色](../adr/0001-icon-assets-and-semantic-consumption.md)
- [ADR 0002：Tailwind B2 组合与局部隔离](../adr/0002-tailwind-b2-local-fork.md)
- [当前运行中的 Token 合同](../../packages/foundations/src/token-contract.ts)

### 0.1 本文解决什么问题

本文用于指导：

1. 当前 Light 颜色 Token 的登记与建设；
2. Rain Classic Vue 组件颜色向新体系的迁移；
3. AI 在 vibe coding 和 vibe design 中快速、稳定地选色；
4. 组件 Recipe、Local Recipe 与 Tailwind 组合；
5. 后续新增颜色类别、色阶和 Alpha；
6. 现有 Token 的改值、插级、别名、废弃与维护；
7. 用户未来提供 Dark 色值后的 Dark Mode 建设。

### 0.2 本文不解决什么问题

本文当前不定义：

- 完整的全局 Semantic Token 名单与具体映射；
- 全部组件的 Recipe、Part、State 与颜色映射；
- Dark Mode 的实际色值；
- Success、Warning、Error、Info、Intelligence 等尚未重新登记的完整色阶；
- Registry 的最终文件格式、生成器和平台序列化格式；
- Figma、代码包、Registry 或业务项目的发布计划。

这些未决项不得由 AI 根据相似色或外部组件库自动补齐。

### 0.3 与仓库既有决定的关系

本文保留以下既有原则：

- Rain Token 是最终视觉权威，Tailwind 只提供受约束的组合能力；
- Internal Source Color 不对页面和普通组件公开；
- 普通 Icon 使用宿主 `currentColor`，固有配色 Icon 保留来源颜色；
- Local Recipe、Local Fork、全局晋升与 Human Gate 相互独立；
- 对比度、键盘 Focus 与非颜色线索不能为了迁移便利而降低。

本文明确修订 2026-09-01 颜色设计中的一项边界：

> 旧设计只允许页面消费 Semantic / Component Token；新设计允许一级到 N 级的 Public Category Scale 直接消费。

因此，新长期结构不再是“Semantic 垄断所有公共选色”，而是：

```text
Internal Source Color（私有）
            ↓
Public Category Scale（公共、可直接使用）
  ├─→ 页面自有节点直接使用
  ├─→ Semantic Token（可选的稳定别名）─┐
  └─────────────────────────────────────┴─→ Component / Local Recipe
                                                   ↓
                                      组件、页面、Figma 与受约束 Tailwind
```

旧文档和旧实现保留为历史，不静默改写。正式实施时应通过独立 System Mode 检查点和 ADR 登记这次边界变化。

原 Spike 的 `30–45` 数量目标只约束 Semantic Token，不约束 Public Category Scale；Category Token 与 Semantic Token 必须分别计数。

`#1561F8` 继续是 Rain Next 已锁定的品牌锚点。`Text/Brand/1 = #0F55DF` 表示品牌前景色阶中的默认强档，不表示它自动替换品牌锚点或所有组件的 Primary 色；具体组件仍由 Recipe 决定。

---

## 1. 核心目标与基本原则

### 1.1 目标

颜色体系必须同时满足：

- 设计师可以直接选择精细的视觉等级；
- AI 不需要为每个元素执行复杂推理；
- 页面中相似含义不再产生近似但不同的裸色；
- 组件状态有稳定 Recipe，不把状态硬编码进色阶名称；
- 新类别可以复用相同建设方法；
- Light 与未来 Dark 使用同一身份体系；
- 原 Vue 组件可逐步迁移，不要求一次性重写。

### 1.2 不可变原则

1. 颜色先按视觉角色归类，再按色系和等级选择。
2. Category Scale 表达类别内部的视觉排序，不直接等于业务状态。
3. Semantic Token 只表达跨场景稳定且能唯一映射的含义。
4. Recipe 表达组件或局部情境中的 `Part + Variant + State + Surface` 组合。
5. 相同 Hex 可以出现在不同 Category Token 中，因为它们承担不同角色。
6. Internal Source Color 保持私有；共同变化的引用关系必须明确建立，不能只按相同 Hex 自动合并。
7. 页面不得写裸色，也不得把 Tailwind 默认色板变成第二套设计系统。
8. 无合适公共 Token 时先使用受控 Local Candidate，不自动污染全局 Registry。
9. 可访问性是硬约束；信息层级自由不能绕过必要对比度。
10. 外部成熟组件库提供架构参考，不提供 Rain 的最终视觉答案。

---

## 2. Token 分层与职责

### 2.1 Internal Source Color

Internal Source Color 是私有、无 Alpha 的底层颜色数据：

- 可以直接保存在 Token 的结构化颜色值中；不要求每一种 RGB 都单独注册一个私有 Token；
- 只有确实需要共同变化时，才提取共享来源，并记录引用关系及共享原因；相同 Hex 只触发重复提示；
- 为 Public Category 的解析和受控派生输出提供数据；Semantic 与 Recipe 通过公共 Token ID 引用，不直接引用私有来源；
- 不表达标题、Disabled、Hover 等使用语义；
- 页面、普通组件、Tailwind 公共 utility 和设计师日常面板不得直接消费。

它保存颜色构成与必要的共同变化关系，不建立另一套公共色板。单项改值与共享来源改值的影响边界见 §13.4。

### 2.2 Public Category Scale

Public Category Scale 是本体系的公共能力层：

- 以 `order = 1…N` 表达类别内部当前展示顺序；公共引用使用稳定 canonical ID；
- 页面、组件建设者和 AI 可以直接使用；
- 允许精细表达复杂页面的信息层级；
- 不要求每个等级预先拥有一个语义名称；
- 不把 Hover、Disabled、Selected 等状态写进基础等级名。

Category Scale 与 Semantic Token 并存。Semantic 是快捷路径，不垄断所有选色。

### 2.3 Global Semantic Token

Global Semantic Token 仅在同时满足以下条件时建立：

1. 含义跨多个组件或场景长期稳定；
2. 在每个已支持 Theme Mode 中都能确定映射到一个 Category Token；
3. 需要独立演进，而不是某个组件的局部状态；
4. 不产生新颜色值，只建立别名映射。

重复次数只是评审信号，不是自动晋升依据。

尚未完成 Vue 使用证据分析前，不批量建立 `Primary / Secondary / Helper / Disabled` 等全局名单。

### 2.4 Component Recipe

Component Recipe 描述一个组件情境中多个 Part 的颜色搭配：

```text
<Component>/<Variant>/<State?>
```

一个 Recipe 可以同时映射：

- Text；
- Icon；
- Border；
- Background 或 Fill；
- OnColor 上下文；
- 必要的 Color Alpha；
- 与 Color Alpha 独立的 Component Opacity。

Recipe 使用现有 Token，不创造裸色。

Recipe 可以一次描述多个 Part 的映射，不为每一个 CSS 属性机械创建一个新的 Component Token。

### 2.5 Local Recipe 与 Local Candidate

Local Recipe 服务一个页面或功能的稳定局部组合，不修改 Global Master。

新的“颜色 + Alpha”组合默认先属于 Local Recipe。只有组件内部已经形成稳定用法时，才进入 Component Recipe；只有跨独立场景且语义唯一时，才具备全局 Semantic 晋升资格。

明确的原型探索允许创建 Local Candidate Token，但必须：

- 有清楚的作用域；
- 有来源、原因和消费者记录；
- 不使用未登记 Alpha；
- 不写入全局根作用域；
- 不进入普通页面 AI 的公共检索；
- 局部方案删除时一并删除；
- 不因重复出现自动晋升。

---

## 3. 命名、排序与跨类别关系

### 3.1 Canonical ID

Category Token 的逻辑身份与展示顺序分开保存：

```text
canonical ID = <Category>/<Family?>/<Mode?>/<Key>
order        = 当前类别色阶内的展示等级，连续 1…N
```

`Key` 是分配后不随排序变化的身份键。当前 57 项保留初版数字路径，首次登记时 Key 与 order 相同；以后插级不能继续把两者视为同一个值。以下示例均为稳定 ID：

```text
Text/Neutral/1
Text/Brand/2
Icon/Neutral/3
Border/Brand/1
Background/Neutral/2
Background/Dark/1
Fill/Neutral/Solid/5
Fill/Brand/Alpha/3
OnColor/1
```

规则：

- `Family` 通常必需，只有共享前景类别 OnColor 可省略；
- `Mode` 只在确实存在 Solid / Alpha 两条色阶时出现；
- Border 当前不增加多余的 Alpha 路径，它的 Neutral 色阶本身就是完整 Alpha 预设；
- 使用 `Neutral / Brand`，不使用 `Gray / Blue` 作为 canonical family；
- `Primary / Secondary / Disabled / Hover` 不进入基础 Category Token 名；
- 新 Key 使用该路径下历史已分配数字的下一号，不回收废弃 Key；不按当前 order 生成新身份；
- 平台 CSS、TypeScript、Figma、Tailwind 的引用名由 canonical ID 生成；只改变 order 不重命名公共变量、utility 或 Figma 绑定；
- Semantic、Recipe、Alias 与 Category Profile 的选用名单引用稳定 ID；Quick View 的等级与区间由这些 ID 和当前 order 派生；
- Theme Mode 是值的维度，不进入 Token ID。

OnColor 是 Text 与 Icon 共用的前景色阶，因此不复制为 `Text/OnColor` 和 `Icon/OnColor`。

### 3.2 展示等级的含义

下表的 `1 → N` 只表示当前 order，不表示 canonical ID 尾部 Key 的大小。代码和 AI 不得通过比较或加减 Key 推算强弱。

| Category | `1 → N` 表达什么 | 是否与其他 Category 同级等强 |
| --- | --- | --- |
| Text | 从强到弱的文字视觉层级 | 与 Icon 同级承诺相近重要程度 |
| Icon | 从强到弱的独立 Icon 视觉层级 | 与 Text 同级承诺相近重要程度 |
| Border | 从显著到轻微的边界强度 | 不承诺与 Text / Icon 等强 |
| Background | 从更靠前到更靠后的表面空间层级 | 不表达文字重要程度 |
| Fill | 同一 Family 和 Mode 内从强到弱的局部外观 | Solid 与 Alpha 同级不承诺等效 |
| OnColor | 深色或品牌表面上从强到弱的前景层级 | Text 与 Icon 共用 |

Text 与 Icon 的同级关系只表示相近视觉重要程度，允许色值不同。

除 Text 与 Icon 外，各类别只保证自己的排序方向，不建立跨类别数字换算。不同类别相同 Key 没有“一样强”的承诺；Text 与 Icon 的配对展示也按 order，不按 Key。

### 3.3 插级与兼容性

- 拟插入的新档先在 Local Recipe 中验证；确认公共价值后分配新 Key，再将 order 排为连续 `1…N`；
- 既有 ID、值和消费者引用保持原样；插级本身不需要建立旧编号 Alias，也不自动改选 Semantic 或 Recipe；
- 新项的可用范围单独确认，不能因进入某个展示区间就自动获得原有名单的使用资格；
- Text / Icon 的插级还须复核同级配对；不能假定单侧插级后配对仍成立，也不能为凑齐等级自动新增或改值另一侧；
- Alias 只处理不同且无冲突的旧名与新名，不能让同一个名字同时表示新插入值和旧值；
- 不采用按当前顺序重编号公共 ID 的方案。若未来坚持该方案，必须另行定义破坏性版本迁移，不能承诺在同一命名空间用旧编号 Alias 保持兼容。

例如 Text/Neutral 已有 Key `1…6`，在原第 2、3 级之间插入新档：

| 稳定 ID | 原 order | 新 order |
| --- | --- | --- |
| `Text/Neutral/2` | 2 | 2 |
| `Text/Neutral/7`（新项） | — | 3 |
| `Text/Neutral/3` | 3 | 4 |

此表只演示身份与排序，实际插级仍须完成使用资格及配对复核。其他旧项只顺移展示位置；旧代码中的 `Text/Neutral/3` 仍解析到原值。新顺序由 Quick View 展示，不能根据“当前第 3 级”拼接出 `/3`。

---

## 4. Light Mode 当前登记基线

以下数值来自用户提供并逐项确认的现有视觉色阶。它们是本次 Light Registry 的输入基线，不代表已经写入代码、通过组件迁移、完成验证或发布。

当前汇总为 **57 个 Public Category Token 候选记录**。`57` 是现有清单的派生计数，不是 Semantic Token 数量。

本节 Level 和默认区间记录首次登记时的 order；当前它与 Key 相同。落库时将选用范围解析为稳定 ID 集合，后续排序或插级不自动改变既有资格和引用。

### 4.1 Text 与 Icon

| Level | Text/Neutral | Icon/Neutral | 关系说明 |
| --- | --- | --- | --- |
| 1 | `#142346` | `#3A4865` | 各自类别中的最强档 |
| 2 | `#3A4865` | `#495D87` | 相近重要程度，色值不同 |
| 3 | `#495D87` | `#7485A8` | 组件内次级内容常见区间 |
| 4 | `#56688F` | `#96A3C1` | 弱化档；必须检查内容必要性与对比度 |
| 5 | `#7485A8` | `#B8C2D8` | 低强调档；有意义小文字或功能 Icon 通常不合格 |
| 6 | `#A0ACC5` | — | 仅弱提示候选、Disabled 或 Decorative；仍受对比度规则约束 |

| Level | Text/Brand | Icon/Brand | 关系说明 |
| --- | --- | --- | --- |
| 1 | `#0F55DF` | `#0F55DF` | 符合 Brand 资格时的默认强档 |
| 2 | `#1561F8` | `#1561F8` | 次一级品牌前景候选 |
| 3 | `#3D7BFF` | — | 进一步弱化；普通小文字必须检查对比度 |

使用边界：

- Neutral 可以由 AI 主动用于信息层级；
- 弱 Neutral 只允许主动用于非关键、非交互信息，并且仍须满足适用的对比度要求；
- Brand 默认只用于操作、选中、激活、进行中和明确品牌强调；
- 普通非交互内容不能为了丰富层次而主动变蓝；
- Brand 的一级、二级、三级不是 Default、Hover、Pressed 或 Selected 状态；
- 状态由完整 Recipe 表达。

Icon 规则：

- 与文字配对的 Icon 默认使用 `currentColor` 继承文字颜色；
- 独立承担信息或操作的 Icon 使用 Icon Category Token；
- Icon 没有与 Text 完全对应的弱档时，使用最近的更强合法档，不向更弱档回退；
- 固有配色 Icon 属于来源资产例外，不强制重染为 Neutral 或 Brand。

### 4.2 Border

#### Border/Neutral

| Level | 私有源色 | Alpha（不透明度） | 默认定位 |
| --- | --- | --- | --- |
| 1 | `#103FB7` | `35%` | 强边界，少量使用 |
| 2 | `#103FB7` | `25%` | 常用结构边界 |
| 3 | `#103FB7` | `16%` | 常用轻边界或分隔 |
| 4 | `#103FB7` | `10%` | 非常轻微的辅助边界 |

#### Border/Brand

| Level | 值 |
| --- | --- |
| 1 | `#3D7BFF` |
| 2 | `#6495FF` |
| 3 | `#B5CCFC` |

规则：

- Border 等级只表达边界显著程度；
- Neutral 是默认结构色；
- Brand 必须满足蓝色使用资格；
- Hover、Focus、Selected、Error 等具体状态由 Recipe 映射；
- 对独立承担控件识别或状态识别的边界，最终组合必须满足非文本对比度要求。

### 4.3 Background

Background 数字表示表面空间层级。数字越小，表面越靠前；它不表示内容重要程度。

#### Background/Neutral

| Level | 值 | 空间方向 |
| --- | --- | --- |
| 1 | `#FFFFFF` | 最靠前的常规表面 |
| 2 | `#F7F9FF` | 次一级承载面 |
| 3 | `#F2F4FF` | 常用底层工作区 |
| 4 | `#EBEFFF` | 更深的复杂页面底层 |
| 5 | `#E3E9FD` | 当前最深的 Neutral 背景 |

默认优先使用 `1–3`。只有页面层级确实丰富、内容密集且需要更多表面区分时，才使用 `4–5`。

#### Background/Dark

| Level | 值 | 空间方向 |
| --- | --- | --- |
| 1 | `#15192B` | 最靠前、最深的局部深色表面 |
| 2 | `#32364B` | 常用局部深色表面 |
| 3 | `#535970` | 较浅的局部深色底层 |

默认优先使用 `2–3`。`Background/Dark` 是 Light 页面中的局部深色表面，不等于全局 Dark Mode。

### 4.4 Fill

Background 与 Fill 按职责区分，不按面积区分：

- Background：页面或区域的表面层级；
- Fill：组件局部外观与状态承载。

相同色值可以同时存在于 Background 和 Fill，因为类别职责不同。

Solid 与 Alpha 是两条独立色阶。同级不承诺视觉等效；选择依据是是否需要与父背景叠加，而不是组件面积。

#### Fill/Neutral/Solid

| Level | 值 |
| --- | --- |
| 1 | `#CCD4ED` |
| 2 | `#D7DEF5` |
| 3 | `#E3E9FD` |
| 4 | `#EBEFFF` |
| 5 | `#F2F4FF` |
| 6 | `#F5F7FE` |
| 7 | `#FFFFFF` |

默认可用区间为 `4–7`，其中 `5–7` 最常见；`1–3` 只在需要更强层次且有组件证据时使用。

#### Fill/Neutral/Alpha

| Level | 私有源色 | Alpha（不透明度） |
| --- | --- | --- |
| 1 | `#546CC6` | `28%` |
| 2 | `#4A66D1` | `20%` |
| 3 | `#5075FE` | `16%` |
| 4 | `#5075FE` | `12%` |
| 5 | `#5577F4` | `10%` |
| 6 | `#5570F4` | `06%` |

Neutral Alpha 正式色阶只保留 `1–6`。白色属于 `Fill/Neutral/Solid/7`；没有 Fill 时直接使用 `none`，不建立 Alpha/7。

默认可用区间为 `3–6`；`1–2` 作为更强的条件档。

#### Fill/Brand/Solid

| Level | 值 |
| --- | --- |
| 1 | `#0F55DF` |
| 2 | `#1561F8` |
| 3 | `#C6D8FF` |
| 4 | `#E0EAFF` |

#### Fill/Brand/Alpha

| Level | 私有源色 | Alpha（不透明度） |
| --- | --- | --- |
| 1 | `#003AAD` | `85%` |
| 2 | `#154DBE` | `65%` |
| 3 | `#3D7BFF` | `20%` |
| 4 | `#3D7BFF` | `10%` |

所有 Brand Fill 都必须满足 Brand 使用资格。等级不绑定 Hover、Pressed、Selected 或 Disabled。

### 4.5 OnColor

OnColor 是 Text 与 Icon 共用的反色前景色阶，只用于 §5.6 已确认的具体表面搭配，不因背景属于 Brand 就自动启用。

| Level | 私有源色 | Alpha（不透明度） | 使用范围 |
| --- | --- | --- | --- |
| 1 | `#FFFFFF` | `100%` | 已通过表面配对验证时，必要内容的默认档 |
| 2 | `#FFFFFF` | `85%` | 条件使用的次要内容 |
| 3 | `#E8F0FF` | `75%` | 条件使用的辅助内容 |
| 4 | `#D8E0FF` | `45%` | 默认仅 Decorative 或真实 Disabled；其他内容仍须满足可读性门槛 |
| 5 | `#D8E0FF` | `25%` | 默认仅 Decorative 或真实 Disabled；其他内容仍须满足可读性门槛 |

`OnColor/1` 是不透明颜色，不创建全局 Alpha 100。`OnColor/2–5` 是完整 Alpha Token，禁止再次叠加 Alpha。

---

## 5. 页面和组件的选色规则

### 5.1 页面日常快速路径

页面 AI 和普通设计使用者默认按以下顺序选择：

```text
现有 Variant → 相关 Recipe → Public Category Token
```

当作用域内已经存在明确的 Local Recipe 时，它在对应 `Part + State` 上优先于 Component Recipe；没有明确 Local 覆盖的部分继续使用 Component Recipe。

只要已有稳定路径，就不重新执行完整颜色推理，也不逐项比较 16 个 Alpha 值。

页面可以直接使用 Public Category Token，但应先建立当前区域所需的最小颜色工作集：

- 不设硬性的等级数量上限；
- 只保留真实信息差异所需要的等级；
- 同一局部角色保持一致；
- 复杂页面可以使用更多 Neutral 等级；
- 不为追求“丰富”增加 Brand 或新颜色。

### 5.2 建设期和异常路径

完整判断流程只用于：

- 建设新组件；
- 建立或修改 Recipe；
- 处理没有现成映射的异常场景；
- 迁移旧 Token；
- 创建新颜色 + Alpha 组合。

流程为：

1. 判断视觉角色：Text、Icon、Border、Background、Fill 或 OnColor；
2. 判断 Family：Neutral、Brand 或未来登记的其他合法 Family；
3. 判断交互、状态和 Surface 资格；
4. 从该 Category 的默认区间开始选择等级；
5. 在真实父背景上验证对比度、层级和相邻状态区别。

这五步是建设规则和异常路径，不是页面每个元素的日常执行步骤。

### 5.3 Neutral 与 Brand

Neutral：

- 是默认内容与结构颜色；
- AI 可以主动使用不同等级降低非关键信息；
- 弱等级只能用于非关键、非交互信息；
- 如果弱等级不满足必要内容对比度，优先提升到同色系更强等级；无合格项时按 §15.1 处理，不假定总能回退成功。

Brand：

- 允许用于操作、选中、激活、进行中和明确品牌强调；
- 普通非交互内容不能仅为了视觉层次变蓝；
- Brand 等级只表达该类别内部的视觉强弱；
- 状态必须由 `State + Category Token + 可选 Alpha` 的完整 Recipe 表达。

### 5.4 Disabled 与 Decorative

- Disabled 和 Decorative 默认使用弱色范围，不固定绑定某一个等级；
- AI 可以主动选用弱色压低它们，但必须由 Recipe 或内容身份证明它们确实非关键、非交互；
- 弱色偶尔可以承担其他非关键信息，不需要伪装成 Disabled 或 Decorative；
- 提示、说明、时间等只要仍需阅读，就适用文字对比度门槛；“非关键”本身不是豁免资格；
- 不能借 Disabled / Decorative 名义降低必要信息或操作线索的可读性。

### 5.5 Background、Fill 与父表面

- Background 决定页面或区域表面层级；
- Fill 决定组件局部外观；
- Alpha Fill 会与父表面叠加，不能承诺在所有背景上效果相同；
- Token 不为每个父背景复制一个版本；
- Category Profile 记录默认上下文，Recipe 对实际父表面负责。

### 5.6 Surface Context 与 OnColor

Theme Mode 与 Surface Context 是两个独立维度：

- Theme Mode 决定同一 Token 在 Light / Dark 下解析成什么值；
- Surface Context 决定内容使用普通 Text / Icon，还是 OnColor。

OnColor 由拥有 Background 或 Fill 的 Recipe 建立。Recipe 必须记录实际承载面、前景 Token、Part / State 和支持的 Theme Mode，并按 §15 验证需要阅读或识别的内容：

- 普通表面默认使用 Text / Icon；Brand Family、深色名称、等级或 Theme Mode 都不自动赋予 OnColor 资格；
- 浅品牌底通常仍使用普通深色或符合 Brand 资格的前景；只有实际配对合格、且 Recipe 已声明反色前景时才进入 OnColor；
- 只有在已建立的 OnColor 上下文内，没有独立表面的直接内容才默认使用 `OnColor/1`，且仍须满足对应门槛；
- 次要内容可以选择 `OnColor/2–3`；`OnColor/4–5` 默认仅用于 Decorative 或真实 Disabled，其他内容不得仅凭“非关键”豁免；
- 独立表面的嵌套组件重新判断；跨表面复用、状态或主题改变时重新核对配对资格，不盲目继承父上下文；
- 父背景不可确定时，使用适用环境明确的已有 Recipe 或先建立稳定承载面；仍无法验证则报告缺口，不自动选择白字；
- 不在运行时根据亮度自动猜测 OnColor；
- 页面和公共组件 API 不增加日常使用的 `onColor` 或 `darkPrimary` 属性。

反例：`OnColor/1` 在 `Fill/Brand/Solid/3`（`#C6D8FF`）与 `/4`（`#E0EAFF`）上的对比度约为 `1.43:1`、`1.21:1`，不能用于需要阅读的文字。只登记实际使用的表面搭配，不预建所有前景与背景的组合矩阵。

---

## 6. Alpha 体系

### 6.1 全局白名单

组件建设可使用的全局 Color Alpha 为：

```text
06  10  12  16  18  20  25  28
35  40  45  55  65  75  85  90
```

数字表示实际不透明度。例如 `28` 始终表示 `28% opacity`，不是 28% 透明。

`18 / 40 / 55 / 90` 当前只是合法能力；没有 Recipe 使用前，不获得默认语义。

### 6.2 四档快速搜索区间

| 搜索区间 | Alpha | 作用 |
| --- | --- | --- |
| 微弱 | `06 / 10 / 12 / 16` | 优先搜索非常轻的叠加 |
| 较弱 | `18 / 20 / 25 / 28` | 优先搜索较弱状态或层次 |
| 中等 | `35 / 40 / 45 / 55` | 优先搜索中等强调 |
| 较强 | `65 / 75 / 85 / 90` | 优先搜索较强叠加 |

这些区间只缩小 AI 搜索范围，不创建新 Token，也不自动等于 Hover、Disabled、Selected 等状态。

### 6.3 Alpha 与状态

Alpha 可以参与表达重要程度和状态，但语义属于完整 Recipe：

```text
State + Color Token + Alpha + Parent Surface
```

Alpha 数字只提供物理不透明度和有限的强弱倾向。只有基础颜色、父背景和视觉属性相同时，Alpha 大小才可直接比较强弱。

### 6.4 组合权限与 Alpha 输出

- 直接使用 `/Alpha` 时，公共 Rain Color 必须在该 Recipe 所有已声明支持的 Theme Mode 中都解析为不透明色；
- 已带 Alpha 的 Token 禁止二次叠加；
- 已确认的 Fill Alpha、Border Alpha、OnColor Alpha 继续作为一键完整预设；
- 页面 AI 默认使用完整预设，不直接发明 `/Alpha`；
- 组件建设与 Local Recipe 可以按 shadcn / Material 式组合合法实色与已登记 Alpha；
- Tailwind 默认 Alpha、任意 `[17%]`、裸色和动态类名仍然禁止。

需要替换一个完整 Alpha Token 的 Alpha 时，使用独立的派生操作，不给原预设追加 `/Alpha`：

1. Recipe 只登记“来源公共 Token ID、替换 Alpha 的动作、目标白名单 Alpha、Part / State 和作用域”；原 Token 保持不变。
2. 生成时按每个支持的 Theme Mode 解析来源的 RGB，丢弃原 Alpha，再应用目标 Alpha；来源缺失或无法解析时报错，不相乘、不取近似值。
3. Local Recipe 的结果生成到现有 `--rain-local-<feature>-<role>` 候选变量，按主题在对应 feature root 内赋值；稳定 Component Recipe 按同一规则生成组件作用域内的派生变量。
4. 派生变量通过现有 Tailwind bridge 生成或校验静态映射，静态 class 引用该变量。它不是新增全局 Category / Semantic，不开放私有源色入口，也不手写另一份色值。
5. 来源、生成文件、消费者和删除关系由 Recipe 派生登记；局部输出随局部资产删除。只有确实需要新派生颜色时才生成变量，不为每个 Part 机械创建 Token。

例如 `Fill/Neutral/Alpha/3` 是 `#5075FE + 16%`：替换为 20% 的结果为 `rgb(80 117 254 / 20%)`；给原预设追加 `/20` 得到的 3.2% 属于错误路径。上述数据是逻辑字段，不预先锁定新的 TypeScript API。

结构化来源或共享来源改变后，派生输出必须重新生成并检查其消费者；生成的 RGBA 是结果，不可反向作为另一份人工事实源。具体登记与校验职责见 §9、§10.3；此输出能力仍待独立颜色实施检查点建设。

### 6.5 端点与 Component Opacity

- `100%` 使用不透明颜色，不建立 Alpha 100；
- 完全无绘制按属性表达，不建立 Alpha 00；`none` 是绘制意图，不得直接输出为无效的 `background-color: none`；
- `transparent` 只允许 Recipe 用于结构占位或过渡，不用于信息层级；
- Color Alpha 只影响某一颜色；
- Component Opacity 影响整个元素或组件，是独立的 Recipe 参数；
- Component Opacity 不受 Color Alpha 白名单约束，例如既有 Loading `82%` 可以保留。

### 6.6 已确认的低风险 Alpha 迁移

```text
09 → 10
17 → 16
26 → 25
```

这三项会产生 1% 的实际视觉变化，因此属于低风险视觉迁移，不是纯重命名。用户已明确决定：后续迁移这三项时，不要求组件截图和对比度验证。

除此之外，历史上的白名单外 Alpha：

- 不自动映射到最近值；
- 不自动扩大全局白名单；
- 暂时登记为 Legacy Exception；
- 在真实组件 Recipe 评审时决定去留。

---

## 7. Semantic Token 与 Recipe 治理

### 7.1 Semantic 命名

Global Semantic Token 使用：

```text
<Category>/<StableRole>
```

它必须在每个 Theme Mode 内确定地映射到同类别的一个 Public Category Token；目标 Category 存在 Family 时，Semantic 必须保持同 Family。Semantic 不允许直接保存新的 Raw Color。

“单一映射”表示每个 Theme Mode 内只有一个确定结果，不要求 Light 与 Dark 指向相同等级。

### 7.2 Component Recipe 命名与主题

Component Recipe 使用：

```text
<Component>/<Variant>/<State?>
```

规则：

- Recipe 身份跨主题稳定；
- Theme Mode 不进入公共 Variant 名称；
- 不建立 `Button/DarkPrimary`；
- 默认共享映射；
- 只有实际证据要求不同 Token 的 Part + State 才增加 Light / Dark 覆盖；
- 如果 Semantic 已经正确跨主题解析，Recipe 只引用一次；
- Dark 未配置时明确写 `Unconfigured`，不得猜值。

### 7.3 Local Recipe 的主题规则

- 页面默认只选择一次 Token、Semantic 或 Variant；
- 普通主题切换由 Token 解析完成；
- 页面不日常编写大量 `dark:text-*`、`dark:bg-*`；
- 必要的页面级主题差异集中在同一个 Local Recipe 的主题映射中；
- Local Recipe 身份不增加 `/Dark`；
- 结构或产品语义变化不伪装成颜色主题覆盖。

### 7.4 覆盖优先级

颜色解析按以下顺序处理：

1. 可访问性、父表面和明确 Brand / OnColor 资格等硬约束；
2. 最具体的 Local Recipe `Part + State` 映射；
3. Component `Variant + State` Recipe；
4. 页面当前区域的最小颜色工作集；
5. Category Profile 的默认规则。

Local Recipe 只覆盖明确声明的 Part + State。只修改 Default 不表示 Hover、Focus、Disabled、Loading 自动跟随。

### 7.5 晋升规则

```text
新组合
→ Local Recipe
→ 稳定组件内用法
→ Component Recipe
→ 跨独立场景且语义唯一
→ Global Semantic Candidate
→ 人工确认后晋升
```

重复次数、相同 Hex 或相似命名都不能自动触发晋升。

---

## 8. AI 选色与文档视图

### 8.1 两种视图，一个事实源

Registry 只维护一套事实，由同一数据生成：

- Quick View：普通人、页面 AI 和 vibe design 使用；
- Detail View：组件建设、迁移、维护和异常排查使用。

禁止手工维护两套重复说明。

### 8.2 Quick View

Quick View 使用横向矩阵，以提高阅读和对比效率：

- 每个 Category 单独成表；
- Text 与 Icon 因同级关系明确，在同一矩阵配对展示；
- 其他 Category 不强行放入同一张数字对照表；
- 当前 order `1…N` 作为共享列；
- 单元格优先展示色块、展示等级、稳定公共 ID、最终值和 `常用 / 条件 / 限制`；复制或 AI 检索返回稳定 ID，不返回按等级拼接的引用名；
- 不显示 Internal Source ID、完整消费者清单或 16 个 Alpha 的逐项语义。

Theme 展示必须同时看到 Light 与 Dark：

- Light 行固定使用纯白比较画布；
- Dark 行固定使用纯黑比较画布；
- 白色与黑色只是标准比较画布，不是产品 Background Token；
- 当前 Dark 单元格统一显示 `Unconfigured`；
- 真实 Parent Surface 的渲染进入 Detail View。

各等级最终的 `常用 / 条件 / 限制` 标签，必须在 Vue 消费证据分析后确认；本文只记录已经明确的默认区间和硬限制。

### 8.3 Detail View

Detail View 至少提供：

- canonical ID；
- Theme Mode 与解析值；
- Category、Family、Mode、稳定 Key 与当前 order；
- Public / Internal；
- 结构化颜色的 RGB 与不透明度，以及存在时的共享来源引用；
- Category Profile；
- 默认和已验证 Parent Surface；
- Semantic 与 Recipe 引用；
- 当前消费者；
- Legacy Alias 与迁移状态；
- 可访问性结果；
- 来源和生命周期；
- Dark 的 `Unconfigured / Mapped / Validated` 状态。

### 8.4 AI 检索模式

页面模式只加载：

```text
相关 Variant → 相关 Recipe → 精简 Category Quick View
```

页面模式不加载：

- Internal Source Color；
- 完整 16 项 Alpha 建设列表；
- 全仓迁移记录；
- 无关组件的 Recipe。

组件建设和迁移模式按需加载：

- 相关 Category Profile；
- 相关完整色阶；
- Alpha 四档与白名单；
- 真实 Parent Surface；
- 组件 Part / State；
- 对比度与旧消费者证据。

找不到合法选项时必须 fail closed：使用已登记 Local Candidate 或报告 Token 缺口，不按最相近 Hex 自行补色。

### 8.5 Figma 与 Tailwind 的入口

Figma：

- 普通页面和日常设计入口只展示完整 Public Category、Semantic 与 Recipe；
- 组件建设入口才展示可组合的不透明公共 Rain Color 与 Alpha 白名单；
- 已带 Alpha 的完整 Token 仍作为一个选项，不暴露二次 Alpha；
- 两个入口由同一 Registry 生成，不手工维护两份 Token 说明。

Tailwind：

- 完整 Alpha Token 映射为完整 Rain utility；
- 组件建设和 Local Recipe 可以对所有已支持主题均合格的不透明 Rain Color 使用白名单 `/Alpha`；
- 替换完整预设的 Alpha 走 §6.4 的派生变量与静态映射，不在预设上追加 modifier；
- 页面 JSX 不直接发明 `/Alpha`；
- 默认 Tailwind 颜色、任意值、动态拼接和双重 Alpha 必须 fail closed。

---

## 9. Registry 事实模型

最终文件格式尚未确定，但职责必须保持分离。

### 9.1 Token Record

Token Record 保持精简，只记录：

- canonical identity、Category / Family / Mode / 稳定 Key 与独立 order；
- 各 Theme Mode 的权威颜色表达：结构化颜色值，或有明确引用目标的 Alias / 源色与 Alpha 表达；
- Public / Internal 可见性；
- 生命周期；
- 来源；
- Legacy Alias；
- 明确建立共享来源时的引用与共享原因。

每个主题值只有一个权威表达。最终 RGBA、可组合资格和影响关系由它解析生成，不同时手工维护“最终值”和“源色 + Alpha”两份事实。内嵌 RGB 属于 §2.1 的私有数据，不因存在该数据就必须增加一个私有 Token。引用缺失、循环或形态不合法时停止生成。

不得为每个 Token 重复复制 Category 的整套使用说明。

### 9.2 Category Profile

Category Profile 集中记录：

- 排序方向；
- 默认可用 Token ID 集合及其派生展示区间；
- `常用 / 条件 / 限制` 的 ID 名单；
- 允许的视觉用途与属性关系；例如 Text 用于文字供色，不能仅因能生成 `bg-*` 就用于背景；
- Neutral / Brand 资格；
- 默认 Parent Surface；
- 对比度和向强档回退规则；
- 页面模式和建设模式的可见范围；
- 对全局 Alpha 物理规则和使用层权限的引用。

Category Profile 不自行授权新的 Alpha 组合：物理资格由解析后的颜色和支持主题决定，使用层权限由对应合同决定。属性关系按实际 Part 用途检查；Icon 宿主的 `color` 与文字的 `color` 不能仅凭同名 CSS 属性混为一类，仍保留文字配对 Icon 继承 `currentColor` 的规则。

### 9.3 Recipe Record

Recipe Record 记录：

- 组件或 Local Recipe 身份；
- Variant、State、Part；
- 稳定 Category / Semantic ID 映射、对应视觉属性及用途；
- 实际承载面、普通前景或 OnColor 的明确配对及验证条件；
- Theme Mode 的共享映射和必要覆盖；
- Color Alpha 与 Component Opacity；
- 来源、消费者和成熟度。

发生 §6.4 的 Alpha 替换时，额外保存来源公共 ID、替换动作和目标 Alpha。派生变量、主题输出、静态映射、Candidate 与 manifest 引用由该记录生成或关联校验；复用现有 B2 字段，不手工重复登记同一映射。具体文件格式仍留待实施确定。

### 9.4 迁移数据不进入永久 Registry

迁移期间分别维护：

1. 可重新生成的 Usage Inventory：记录代码实际使用；
2. 轻量 Decision Matrix：保存人工确认的迁移结果。

这两类数据不与永久 Token Registry 混为一体。

### 9.5 跨平台关系

- Registry 是唯一事实源；
- 原 Vue 组件库是迁移证据和初始视觉来源；
- Figma、React、Vue、CSS 与 Tailwind 是受控输出或消费者；
- 当前不建设实时双向同步；
- 平台出现漂移时必须报告，不按“最后修改者”覆盖 Registry；
- Quick View、Detail View 和未来 AI 入口应由同一 Registry 生成。

---

## 10. 与 Tailwind B2 实施计划的衔接

### 10.1 两份文档各自决定什么

本文与 Tailwind B2 实施计划不是两套平行颜色系统：

| 文档 | 决定的核心问题 | 不负责决定 |
| --- | --- | --- |
| 本文 | Rain 允许出现哪些颜色、如何分层、怎样迁移、维护和进入 Dark Mode | Tailwind 试点的具体页面、Fork 生命周期和 B2 验收结果 |
| Tailwind B2 实施计划 | AI 如何通过受约束 Tailwind 使用 Rain Token、怎样建立 Local Recipe / Fork、怎样 fail closed | 新颜色值、Category 等级和新的全局颜色语义 |

二者合并后的关系是：

```text
Rain Color Registry
  ├─ Public Category Scale
  ├─ 少量 Semantic Alias
  └─ Component / Local Recipe
                 ↓ 生成或登记
受约束 Tailwind Bridge + Composition Contract
                 ↓
Existing Variant → Local Recipe → Local Fork
```

一句话原则：

> Rain Token 定义可用材料；Recipe 与使用合同定义合法搭配；Tailwind 负责静态表达和执行组合。

这里的 Registry 是逻辑事实模型，不预先限定必须落在一个文件中。每个字段只能有一个权威来源：Recipe Record 保存颜色与 Part / State 的规范映射；B2 manifest、静态 TypeScript class set 和文档视图要么由它生成，要么引用并校验它，不能手工重复维护同一映射。

通常由公共 Category、Semantic 或 Component Token 产生 color utility，Recipe 组合这些入口。只有 §6.4 无法用现成 utility 表达的 Alpha 替换，才允许从 Recipe 生成有作用域的派生变量及其静态映射；这是可追溯的输出，不是新登记的全局颜色或第二份事实源。两条路径都复用现有 bridge，不开放私有来源。

### 10.2 继续沿用的 B2 合同

颜色改造不得重建另一套 Tailwind 机制。以下 B2 合同继续有效：

| B2 合同 | 在颜色体系中的落实 |
| --- | --- |
| Rain Token 是唯一视觉事实源 | 当前 B2 只暴露既有 Semantic / Component / Composition Token；独立颜色 ADR 生效后增加 Public Category 与 §6.4 的受控派生输出，Recipe 不另行手写颜色事实 |
| 私有 Reference 不公开 | `Internal Source Color` 和现有 `--rain-ref-*` 都不得进入页面 utility |
| Rain 命名空间且默认视觉命名空间 fail closed | 不允许 Tailwind 默认 palette 成为第二套颜色系统 |
| 静态、可扫描的 class | 禁止动态拼接颜色 class；AI 输出必须能被静态校验器发现 |
| 禁止任意视觉值 | 禁止裸 Hex、任意颜色值、未登记 opacity modifier 和 `!important` 绕过合同 |
| Existing Variant → Local Recipe → Local Fork | 先复用已有组件和 Recipe，只有局部需求才新增有作用域记录的组合或 Fork |
| Local Recipe / Fork 保留来源 | 记录 ID、scope、origin、修改 Part、候选 Token 与晋升状态 |
| CSS 例外必须登记 | 只允许有原因、选择器、Token、作用域和验证的例外 |
| Icon 由宿主供色 | 普通 Icon 继续使用 `currentColor`；固有配色 Icon 使用已登记例外，不被公共前景色强行覆盖 |
| 验证、Human Gate、发布和业务迁移相互独立 | 任一 B2 或颜色检查通过，都不自动关闭其他边界 |

具体桥接仍沿用 Tailwind CSS v4 的受控链路：

```text
Color Registry
  → 公共 CSS variables / 已登记的有作用域派生变量
  → @theme inline 中的 --color-rain-*
  → 静态 Rain utility
```

实施时继续先重置 Tailwind 默认视觉 namespace，并保持 `source(none)` 与精确 `@source`。如果颜色 Registry 新增生成文件，只登记确切的生成文件或消费者路径；不得为了省事改成全仓扫描，也不得扫描文档、evidence、Registry placeholder 或其他非运行时来源。

这些机制控制默认主题与源码扫描范围，不自动限制颜色用途、数字 Alpha 或整体 Opacity。仅有 `--color-rain-*` 前缀、能编译或 B2 旧检查通过，都不表示满足新的颜色组合合同。

这里的 **Color Registry** 是颜色事实模型，不等于仓库中用于 shadcn-style 分发的 `registry/` 目录。未来是否向分发目录加入颜色资产，是独立的 Registry 发布边界，必须另行授权。

因此，实施颜色体系时应扩展现有：

- `packages/foundations/src/tailwind-theme.css`；
- `packages/foundations/src/composition-contract.ts`；
- `manifests/contracts/tailwind-b2.yaml`；
- 现有组件 manifest、校验脚本与测试。

不得另建第二个 Tailwind bridge、第二份允许列表或另一套 Local Recipe 数据源。

### 10.3 新颜色体系如何进入 Tailwind

未来由 Registry 生成或校验 Tailwind 入口，至少分成三种：

1. **Category utility**：公开一级到 N 级的直接选色能力，使用 Rain 命名空间；
2. **Semantic / Component utility**：保留高频稳定路径，并在迁移期承接旧 utility 的 Alias；
3. **Recipe class set**：一次表达 Variant、Part、State 和 Surface Context 的完整映射。

Tailwind 入口遵守以下边界：

- Category utility 可供页面和组件直接使用，但仍受 Category Profile 的资格限制；
- “Category 可直用”只适用于页面自有节点，或已经登记的 Component / Local Recipe；它不授权通过外部 `className` 覆盖 managed component 的内部视觉。普通外部 `className` 继续只负责布局；
- 页面 AI 默认只看 Existing Variant、Recipe 和精简 Category Quick View，不浏览全量 Alpha 组合；
- 已带 Alpha 的 Border、Fill、OnColor 等完整预设，作为一个终态 utility 使用；
- 只有在 Recipe 全部已支持主题中解析为不透明的公共 Rain Color，才可直接追加白名单 Alpha；其他情况使用 §6.4 的显式替换输出；
- `color + /alpha` 只允许出现在组件建设或已登记 Local Recipe 中；
- 新组合在 Recipe 中声明后，由既有通用规则检查，并生成或关联所需 manifest 与静态输出；不要求每个合法组合修改 validator 源码或新增一条重复数据的 class conflict 测试；
- 页面代码不得自行发明 `/17`、`/26`、任意方括号 opacity 或其他未登记 modifier；
- 已带 Alpha 的 Token 禁止再追加 opacity modifier；
- Component Opacity 仍由组件 Recipe 或已登记静态例外表达，不与 Color Alpha utility 混为一体；这不构成使用 `opacity-[…]` 的许可；
- 同一视觉属性上不得同时出现互相竞争的 Category、Semantic 和原始颜色 class。

校验依据从 Registry、Category Profile、Recipe 和既有 B2 合同取得，至少覆盖：

1. **身份与用途**：引用存在且对当前消费者可见；按稳定 ID 解析用途、属性和 Part，拦截未登记的跨类别使用，而非只匹配 Rain 前缀。
2. **组合资格**：检查使用层、Alpha 白名单、各支持主题的实际 Alpha、替换动作和 Component Opacity 声明；例如 `/17` 与未登记的 `opacity-50` 不能漏过。
3. **作用域与输出**：派生变量只在所属 feature / component root 的对应主题生效，静态 class 与生成映射可对应，普通 `className` 不得绕过 managed Part；私有来源 ID 不进入公共 utility，生成色值须可追溯到 Recipe 的公共引用。
4. **搭配与覆盖**：核对真实承载面、OnColor 资格与适用对比度；按属性和状态处理 class 冲突，字号与文字颜色保持不同冲突组。未知上下文不能被标记为已验证。
5. **消费者覆盖**：列出实际允许 AI 编辑的源码与生成入口并纳入检查；新入口须显式接入，不能用试点少数受保护文件的通过结果宣称全库覆盖。

新增组合数据运行上述既有检查和受影响 Recipe 验证即可；新增属性、modifier、冲突组或生成机制时，才扩展校验能力及其针对性测试。首次实施至少验证错误用途、非法 Alpha、二次 Alpha、主题差异、作用域泄漏会被拒绝，以及合法新 Recipe 无须改动校验器源码即可使用；不枚举完整 `color × alpha` 笛卡尔积。

经登记与验证的派生变量生成机制属于 Token 输出，不为其中每个合法组合再新增一项手写 CSS 例外；其来源、生成路径和作用域仍须检查。超出该机制的手写 CSS 继续遵守既有例外登记与验证合同。

不同公共 Token 仅在明确共享意图时引用同一个 Internal Source Color；bridge 保留各自公共变量身份。数值来自权威表达，生成输出可按平台需要重复字面值，但不得人工维护第二份颜色事实。

具体 utility 拼写、CSS 变量名和 class group 由实施阶段确定；本文只锁定可见能力与禁止路径，避免文档提前制造一套尚不存在的 API。

### 10.4 AI 的两条 Tailwind 路径

#### 页面搭建路径

```text
找已有 Variant
  → 找 Component / Local Recipe
  → 从 Quick View 选择必要的 Public Category 等级
  → 输出静态 Rain class
```

页面 AI 不执行以下工作：

- 枚举 16 个 Alpha 逐一比较；
- 读取或组合 Internal Source Color；
- 用 Tailwind 默认色或任意值补缺；
- 因为“看起来更丰富”而给普通内容增加 Brand 蓝；
- 把一次局部组合直接晋升为全局 Token。

#### 组件建设路径

```text
读取对应 Recipe、Category Profile 与真实 Parent Surface
  → 优先使用完整 Category 预设
  → 必要时选择实色 + 白名单 Alpha，或声明完整预设的 Alpha 替换
  → 登记为 Local Recipe 或稳定 Component Recipe
  → 通用校验、生成或关联静态输出与 manifest、验证受影响 Recipe
```

这样保留 shadcn / Material 式组合效率，同时避免让页面 AI 把 Alpha 白名单当成 16 级日常色阶。

Local Candidate 与 Local Recipe 继续采用 B2 的精确合同：

- 局部候选变量使用 `--rain-local-<feature>-<role>`；
- 只能作用于对应 feature root，不能写入全局 `:root`；
- Candidate 记录来源、原因、消费者和创建时间；
- Local Recipe 至少记录 `id`、`scope`、`origin`、`classes`、`modifiedParts`、`candidateTokens` 和 `promotionStatus`；
- Local Recipe 和 Local Fork 的 `assetIdentity` 固定为 `local-experiment`，`scope` 固定为 `feature`；
- Local Fork 另外记录 Global Master 的 origin paths、source checksum 与 `syncStatus`；`syncStatus` 只允许 `clean / update-available / required-review`，只提醒差异，不自动合并；
- 涉及未开放内部 Part、anatomy / DOM / 行为变化，或用 Recipe 表达已经明显别扭时才创建 Fork；单纯修改 Root 配色不是 Fork 理由。

### 10.5 B2 基线与颜色迁移不能混做

Tailwind B2 当前计划明确要求试点期间不改变既有 42 个 Semantic Role 和已锁定品牌基线。本文则定义了未来 Public Category Scale 与新迁移目标。两者时间边界如下：

1. B2 AI 可编辑性对照继续使用它自己的冻结视觉基线；
2. 本文不会追溯性修改 B2 已采集的 baseline、trial 或验收结论；
3. 颜色改造必须在用户明确授权后，开启独立的 Foundations / System Mode 检查点；
4. 新检查点先把 Category Scale 和迁移 Alias 接入现有 bridge，再按组件家族迁移；
5. 只有被批准的颜色变化才能更新相应 expected value 或视觉基线；
6. B2 通过、颜色迁移通过、Human Gate、发布和业务接入分别报告。

这避免了一个关键混淆：AI 编辑速度提升不能掩盖视觉值变化；视觉 Token 改造也不能被误记为 B2 组合能力的收益或回归。

正式进入颜色实施检查点时，新 ADR 必须明确修订 B2 中“只有 Semantic / Component / Composition Token 是公共视觉入口”的颜色源条款，使 Public Category Scale 成为合法公共输入，并登记 §6.4 的派生输出与 §10.3 的通用校验能力；B2 的 Master 隔离、命名空间、source detection、Local Recipe / Fork、Manifest、CSS 例外和验证合同不随之失效。

`09 → 10`、`17 → 16`、`26 → 25` 的既定豁免只表示不新增组件截图和对比度专项证据；它们仍需通过 B2 合同校验、既有回归、scope isolation 和相互独立的 Human Gate。

### 10.6 颜色实施时需要联动检查的现有位置

未来实施不预设必须修改全部文件，但至少要检查：

- `packages/foundations/src/token-contract.ts`：公共 Category、Alias 与可见性合同；
- `packages/foundations/src/tokens.css`：Light 最终值和私有来源；
- `packages/foundations/src/tailwind-theme.css`：Rain namespaced utility 映射；
- `packages/foundations/src/composition-contract.ts`：可组合属性、Alpha 白名单和禁止项；
- `packages/foundations/src/composition-contract.test.ts`：组合合同回归；
- `apps/playground/src/styles.css`：`source(none)`、精确 `@source` 与 Tailwind 入口；
- `manifests/contracts/tailwind-b2.yaml`：机器可读组合边界；
- `manifests/ui/*.yaml`：组件 Variant、Recipe、Local Recipe / Fork 来源；
- `packages/ui/src/utils/rain-class-names.ts` 及其测试：class 合并与冲突组；
- `scripts/verify-tailwind-b2.mjs` 与 `scripts/verify-tailwind-b2.test.ts`：namespace、source、静态类、Alpha 和例外校验；
- `scripts/verify-workspace.mjs`：新增受控文件或生成入口时的工作区合同；
- `scripts/verify-boundaries.mjs`：受保护路径和跨边界回归；
- Tailwind bridge、class conflict、arbitrary value、dynamic class 和 exact-value 相关验证；
- 被迁移组件的 Recipe 与消费者清单。

实施时还要同步更新 Tailwind class 合并规则，使同一属性下的新 Category、旧 Alias 与组件语义 class 能被正确识别为冲突组。此工作复用现有依赖与验证基础，不因颜色改造新增另一套 CSS 工具链。

所有保留的 CSS 例外必须具有 exception ID、理由、selector、所引用 Token、scope 和对应测试；浏览器机制、复杂 Part 或关键帧可以是理由，“Tailwind 写起来不方便”不能成为理由。验证器还必须排除 intrinsic / source-locked Icon 的原始配色，避免把合法资产颜色误判为页面裸色。

每一批颜色实施至少运行 `pnpm verify:tailwind-b2` 和完整 `pnpm verify`，并对受影响页面完成浏览器 computed-style 与 scope-isolation 回归。自动验证完成仍不等于 Human Gate、发布或业务迁移完成。

---

## 11. Light Token 建设顺序

当前确认的实施顺序为：

1. 登记已经确认的 Category Scale 与 Alpha 白名单；
2. 生成 Light Quick View；
3. 对照 Rain Classic Vue 的真实消费者，建立 Usage Inventory；
4. 形成迁移 Decision Matrix；
5. 从证据中提炼最少量的 Global Semantic 与 Component Recipe；
6. 建立旧 Token 迁移别名，并把 Category 与 Alias 接入现有公共 CSS / Tailwind bridge；
7. 同步扩展 B2 manifest、validator、class conflict 与边界测试；
8. 按组件家族逐批迁移；
9. 收紧新代码入口，并在消费者归零后移除旧别名；
10. 更新 Figma 和 AI 输出；
11. 完成自动验证与独立 Human Gate。

原则是：

> 先固定颜色事实和真实用法，再提炼语义，不预先批量创造语义名称。

---

## 12. 现有 Token 迁移规则

### 12.1 来源优先级

迁移判断顺序：

1. 实际视觉角色；
2. Brand / OnColor 使用资格；
3. 真实功能、交互状态和信息重要程度；
4. 实际 Parent Surface；
5. 旧名称；
6. 色值距离。

旧名称和相近色只能辅助判断，不能替代真实消费者语境。

### 12.2 四种迁移结果

| 结果 | 含义 |
| --- | --- |
| `Exact` | 旧值与新 Token 完全一致，且用途、属性和上下文兼容，可以直接映射 |
| `Normalized` | 迁移到已确认的近似标准值，存在明确且可接受的视觉变化 |
| `Recipe` | 同一个旧 Token 在不同消费者中含义不同，需要按组件或场景拆分 |
| `Legacy Exception` | 暂无合法映射且不能安全自动调整，临时保留并登记 |

### 12.3 别名策略

- 新 Category Token 成为唯一事实源；
- 旧名称暂时引用新 Token；
- 现有组件可以继续运行；
- 新组件禁止新增旧名称消费；
- 按组件家族逐步迁移；
- 消费者归零后移除旧别名；
- 一个旧 Token 混用多种含义时，不能建立错误的单一全局 Alias，必须按消费者迁移。

Alias 的旧名不得与仍在使用的 canonical ID 或其他 Alias 冲突。插级只改 order，不建立“旧编号 → 新编号”Alias；确需改名时须有单一兼容目标，且不得复用原名表达另一颜色。

### 12.4 迁移与重设计分离

- 迁移先恢复到新规则允许的最近合法结果；
- 不在同一批次顺便重做组件 API、结构或完整视觉；
- 迁移完成不等于重设计完成；
- 自动检查通过不等于 Human Gate；
- Human Gate 不授权发布或业务迁移。

### 12.5 当前实现的已知边界变化

当前 Rain Next 仍使用旧的内部 Reference → 42 个 Semantic → Component Token 合同。正式实施本文时至少需要单独评审：

- `packages/foundations/src/token-contract.ts`；
- `packages/foundations/src/tokens.css`；
- `packages/foundations/src/tailwind-theme.css`；
- Token、Tailwind 和精确数量相关测试；
- Button、Input、Link、TextButton 等现有 Component Token；
- Foundations 展示页和 AI 入口；
- B2 精确基线与验证脚本。

本文没有修改这些文件。不得把颜色系统改造偷渡进当前只授权 Button / Input / 搜索区的 B2 试点。

---

## 13. 新 Token 的登记与维护

### 13.1 设计者需要提供什么

新增一个类别或色阶时，设计者第一阶段只需提供：

1. Category；
2. Family，OnColor 可省略；
3. 必要时的 Solid / Alpha 等 Mode；
4. 从 `1…N` 的展示顺序；新增单项时也可指定插入位置；
5. 每一级最终颜色；
6. 如果颜色已带 Alpha，提供准确不透明度。

设计者不需要同时编写每一级的语义、组件状态或 Semantic 名称，也不需要为了插级重新编号现有 Token。

### 13.2 系统第一阶段处理

系统负责：

- 分配未使用的稳定 Key，生成 canonical ID，并单独更新 order；
- 统一 Hex 大小写和 Alpha 表达；
- 解析完整 Alpha Token 的 RGB 与白名单 Alpha，不强制为每个 RGB 提取共享私有 Token；
- 检查 Alpha 白名单；
- 提示重复值和已有来源；未经共同变化意图确认，不自动合并来源；
- 保留跨 Category 的合法重复 Token；
- 记录可能需要迁移的旧名关联，但不自动建立 Alias；
- 继承或新建 Category Profile 的类别规则；新项不因排序位置自动进入既有选用名单；
- 把 Dark 缺失标记为 `Unconfigured`；
- 不自动生成状态语义。

### 13.3 第二阶段语义整理

在实际消费者、Vue 证据和 Parent Surface 可用后，再整理：

- 常用、条件和限制区间；
- 对比度与回退；
- Component Recipe；
- Local Recipe；
- Global Semantic Candidate；
- 经 Usage Inventory 与 Decision Matrix 确认的旧名 Alias；
- Legacy Exception；
- 迁移批次。

### 13.4 修改已有 Token

修改前必须先判断变更类型：

- 仅 Alias 变化；
- 色值变化；
- 展示 order 变化或公共身份变化；
- 单个公共 Token 改指向，或共享来源改值；
- Alpha 变化；
- Semantic 映射变化；
- Recipe 状态变化；
- Theme Mode 映射变化。

单级色值变化必须独立确认，不能因为名称不变就视为无视觉变化。

共享来源按修改意图处理：

| 修改意图 | 数据操作 | 必须检查的影响 |
| --- | --- | --- |
| 只改一个公共 Token | 修改其内嵌颜色，或为它改指向独立来源；不修改其他 Token 仍共享的源色 | 该 Token 的 Alias、Recipe、派生输出与消费者 |
| 所有共享消费者共同改色 | 明确修改共享来源，先展示完整引用链和变更差异 | 所有受影响主题、公共 Token、Alpha 派生结果、Recipe 与消费者 |
| 合并或解除共享引用 | 保持未批准改变的解析值不变，记录未来是否共同变化的意图 | 当前值是否等效，以及后续修改范围是否符合意图 |

例如 `Background/Neutral/5` 与 `Fill/Neutral/Solid/3` 当前同为 `#E3E9FD`。只调整工作区背景时，前者可解除共享或改指向，后者不得随之改变。系统不能以“相同 Hex 去重”为由扩大修改范围。

修改来源后，重新解析影响链、生成输出并检查适用资格与表面配对；已有“已验证”结论在依赖变化后须复核。派生 RGBA、CSS 和 Figma 输出不得单独改值来掩盖来源差异。

插入中间等级时：

1. 先在 Local Recipe 验证；
2. 确认公共价值；
3. 分配新稳定 ID，为所有当前支持的 Theme Mode 建立值；
4. 只重排 order 为连续 `1…N`，保持旧 ID、值和引用不变；
5. 确认新项的使用资格，重新生成 Quick View 与 Detail View；
6. 只有明确选择采用新项的 Semantic、Recipe 或消费者才改映射；单纯插级不要求全库迁移或新增 Alias。

### 13.5 删除与废弃

删除公共 Token 前必须：

- 确认无新代码继续使用；
- 生成消费者清单；
- 提供替代 Token 或 Recipe；
- 完成旧 Alias 迁移；
- 分开记录实现、验证、Human Gate 和发布状态；
- 不因为数值重复直接删除不同类别或不同语义身份。
- 删除公共输出后保留 ID 的废弃登记，禁止将它重新分配给其他颜色身份。

---

## 14. Dark Mode 建设准备

### 14.1 当前范围

- 当前只建设 Light；
- Dark 不完整不阻塞 Light；
- Dark 值未来由用户人工提供；
- 不根据 Light 算法生成 Dark；
- Quick View 中仍保留黑底 Dark 行并显示 `Unconfigured`；
- `Background/Dark/*` 继续表示 Light 页面中的局部深色表面。

### 14.2 Token 身份与等级

- Light 与 Dark 使用相同 canonical ID；
- 两个 Mode 共享同一 Key 集合及 order 结构，不能各自重新编号；
- 值、私有源色和完整 Token 内含 Alpha 可以不同，但必须符合形态合同：`Solid` 在所有已支持主题中保持不透明，`Alpha` 系列使用已登记的非端点 Alpha；
- 同值也必须显式建立 Alias，不能靠空值继承；
- Dark 缺失不得回退到 Light；
- 一个公共新等级必须为所有当前已支持 Theme Mode 建立映射；当前 Dark 尚未成为支持模式，因此可以保持 `Unconfigured`。

### 14.3 Semantic 跨主题映射

Semantic 身份和作用跨主题稳定，但可以在不同主题中映射到同类别、同 Family 的不同等级：

```text
同一个 <Category>/<StableRole>
  Light → 某一个稳定 Category ID
  Dark  → 另一个稳定 Category ID
```

不能绕过 Category Scale 直接保存 Dark Raw Color。

### 14.4 Recipe 跨主题映射

- Component Recipe 只有一个身份；
- 默认使用共享映射；
- 只有必要的 Part + State 才增加 Theme 覆盖；
- Theme 名称不进入公共 Variant；
- 页面公共 API 不出现 `darkPrimary`；
- Local Recipe 采用相同方式处理真实页面例外。

### 14.5 Theme Mode 与 Surface Context

- Dark Mode 不代表所有内容都使用 OnColor；
- Light Mode 中的品牌按钮和深色导航，只有在具体表面配对合格时才可使用 OnColor；浅品牌底不自动使用白字；
- Theme Mode 负责 Token 解析；
- Surface Context 负责普通前景与 OnColor 的选择；
- 拥有独立表面的嵌套组件按自身 Recipe 重新判断。

### 14.6 Alpha 跨主题

- Public Category Token ID 保持稳定；展示 order 的调整遵守 §3.3，不改写引用；
- 完整 Alpha Token 的源色和 Alpha 可以按 Theme 显式变化；
- 变化后的 Alpha 仍必须属于白名单；
- 组件建设时直接写的 `/20` 永远表示物理 `20% opacity`；
- Recipe 可以按 Theme 显式选择不同 Alpha，但不能让同一个 Alpha 数字改变物理含义。

直接 `/Alpha` 的资格按每个已支持主题的解析值自动计算，不保存逐 Token 手工权限表。若 Light 解析为实色、Dark 解析为带 Alpha 的完整色，共享 `/20` 不合法：须改用完整预设、按主题明确映射，或使用 §6.4 的替换操作。替换操作逐主题取各自 RGB 后应用目标 Alpha，不能沿用 Light 的源色到 Dark。Dark 尚未支持时仍可为 `Unconfigured`；后续启用 Dark 必须重新检查全部依赖组合。

### 14.7 Ready 与 Validated

Token 的 Dark 状态：

```text
Unconfigured → Mapped → Validated
```

组件或页面的 Dark 支持由依赖自动计算：

- 所有必要 Token、Part、State、Recipe 及派生输出均有可解析、组合合法的 Dark 映射，才是 `Dark Ready`；
- 实际完成视觉和可访问性检查后，才是 `Dark Validated`；
- 状态不手工猜测；
- 缺失项在 Detail View 集中列出；
- Dark 不完整不阻塞 Light，但未 Ready 的页面不得宣称支持 Dark。

### 14.8 用户提供 Dark 值后的建设顺序

1. 按现有 canonical ID 与共享 order 登记 Dark 值；
2. 检查显式同值 Alias、形态约束、Alpha 白名单和派生组合资格；
3. 在真实 Dark Parent Surface 上检查排序和对比度；
4. 配置 Global Semantic 的 Dark 映射；
5. 配置必要的 Component / Local Recipe 覆盖；
6. 自动计算 Token、组件和页面 Dark Ready；
7. 进行组件状态、嵌套表面和可访问性验证；
8. 通过独立 Human Gate 后标记 Dark Validated。

---

## 15. 可访问性与验证

### 15.1 硬门槛

- 有意义的普通文字：至少 `4.5:1`；
- 大文字：按适用标准检查 `3:1`；
- 有意义 Icon、必要操作线索和独立承担控件识别的边界：至少 `3:1`；
- 不满足时优先在同一 Family 中提升到更强的已有等级；
- 已到最强档仍不合格时，采用适用且已验证的其他 Recipe / 承载面或非颜色识别方案；没有合法方案则报告缺口，不静默降低门槛；
- 不为通过对比度临时新增近似颜色；
- 交互和状态不能只依赖颜色表达。

Disabled、Decorative 和纯辅助视觉可以不进入相同硬门槛，但 Recipe 必须明确它们不承担必要信息或操作。

例如 `Border/Neutral/1` 合成在白底上约为 `1.90:1`。它不能独自承担要求 `3:1` 的控件识别；该系列内没有更强合格项时，必须走上述缺口路径。装饰分隔线不因此被统一要求达到 `3:1`。

### 15.2 白底快速风险提示

以下仅用于白色比较画布的快速筛查，不替代真实 Parent Surface 验证：

| Token | 白底对比度 | 快速判断 |
| --- | --- | --- |
| `Text/Neutral/1` | `15.46:1` | 普通文字通过 |
| `Text/Neutral/2` | `9.15:1` | 普通文字通过 |
| `Text/Neutral/3` | `6.56:1` | 普通文字通过 |
| `Text/Neutral/4` | `5.57:1` | 普通文字通过 |
| `Text/Neutral/5` | `3.71:1` | 普通小文字不通过 |
| `Text/Neutral/6` | `2.28:1` | 必要文字不通过 |
| `Text/Brand/1` | `6.20:1` | 普通文字通过 |
| `Text/Brand/2` | `5.13:1` | 普通文字通过 |
| `Text/Brand/3` | `3.84:1` | 普通小文字不通过 |
| `Icon/Neutral/3` | `3.71:1` | 有意义 Icon 通过 |
| `Icon/Neutral/4` | `2.53:1` | 有意义 Icon 不通过 |
| `Icon/Neutral/5` | `1.79:1` | 有意义 Icon 不通过 |

因此，“非关键”不自动等于“可以低对比”。只要文字仍需要被阅读、Icon 仍承担信息或操作，就必须满足相应门槛。

### 15.3 Alpha 验证

- 新 Alpha 组合必须先与真实父背景合成，再计算最终对比度；
- 父背景未知时，优先建立稳定承载面或采用已确认适用环境的 Recipe；只改成不透明前景并不能证明对比度合格；
- 已登记完整预设在其默认环境中不要求每次重复验证；
- 新公共组件、复杂透明、动态背景或 Human Gate 场景才要求截图；
- `09→10`、`17→16`、`26→25` 按用户决定免截图与对比度验证。

### 15.4 状态与交付分离

以下状态必须独立记录：

- Registry 已登记；
- 代码已实现；
- 自动检查已通过；
- 视觉与可访问性已验证；
- Human Gate 已接受；
- Figma 已写入或发布；
- Package / Registry 已发布；
- 业务已迁移；
- Git 已提交或推送。

任何一项都不能自动推导下一项。

---

## 16. 成熟组件库对标与 Rain 的取舍

Rain Next 采用“Public Category Scale + 少量 Semantic + Recipe”的 hybrid，不照搬任何单一外部体系。

| 体系 | 可借鉴内容 | Rain 的有意差异 |
| --- | --- | --- |
| [shadcn/ui Theming](https://ui.shadcn.com/docs/theming) | CSS 变量、简洁 Semantic、Background / Foreground 配对、同一 Token 在 `.dark` 下换值、源码可组合 | Rain 额外公开细粒度 Category Scale，以支持高密度教育后台；页面颜色仍受 Rain 白名单约束，不开放默认 Tailwind 色板 |
| [Material Web Theming](https://github.com/material-components/material-web/blob/main/docs/theming/README.md) 与 [Color](https://github.com/material-components/material-web/blob/main/docs/theming/color.md) | Reference → System → Component 分层，以及 Surface / On Color 关系 | Rain 不为每个 Surface × State × Content 组合批量建立全局角色，细节由 Category Scale 与 Recipe 承担 |
| [Ant Design Theme](https://ant.design/docs/react/customize-theme/) | Seed、Map、Alias、Component 的职责分层，以及全局与组件 Token 并存 | Rain 不使用算法自动生成当前色阶，也不把大量组件状态全部提升为全局 Alias |
| [IBM Carbon Color Tokens](https://carbondesignsystem.com/elements/color/tokens/) | 按 Background、Layer、Border、Text、Icon 等角色分组；Layer 和状态颜色可依赖上下文 | Rain 保留自身命名、色值和 Recipe 晋升门槛，不复制 Carbon 的完整产品规模 |
| [Adobe Spectrum Design Data](https://opensource.adobe.com/spectrum-design-data/) | 结构化 Token、组件数据、生命周期和机器可读入口 | Spectrum 的新 Design Data Specification 仍是 Draft；Rain 只吸收单一事实源与生成视图，不复制其全部 Schema |

对 shadcn/ui 的核心取舍是：

```text
借鉴：CSS Variables + Theme Override + Source Ownership + Recipe 组合效率
保留：Rain 固定色值、精细等级、视觉血缘、受约束 Tailwind 与人工晋升
拒绝：直接套用 shadcn 默认灰阶、蓝色、圆角、阴影和无限制页面 utilities
```

---

## 17. 实施前检查清单

### 17.1 建设新 Category Scale

- [ ] 用户已提供 Category、Family、Mode、`1…N` 和最终值；
- [ ] 稳定 ID 与 order 分离，数字方向在 Category Profile 中明确；插级不重用 ID 或改写既有引用；
- [ ] Alpha 已拆解且属于白名单；
- [ ] 重复源色已识别，共享引用由共同变化意图决定；单项改值不会意外影响其他公共 Token；
- [ ] 跨 Category 的合法重复没有被错误合并；
- [ ] Light 已登记；Dark 缺失明确为 `Unconfigured`；
- [ ] 未自动生成 Semantic 或状态；
- [ ] Quick View 和 Detail View 来自同一事实源。

### 17.2 建设或修改 Component Recipe

- [ ] 已明确 Component、Variant、State 和 Part；
- [ ] 已确认实际 Background / Fill、前景与 Surface Context，OnColor 资格不从 Brand 名称推断；
- [ ] 已优先复用现有 Semantic 或 Category Token；
- [ ] Brand 使用资格成立；
- [ ] 完整 Alpha 未被二次叠加；替换动作有可追踪的作用域输出，且原预设保持不变；
- [ ] Color Alpha 与 Component Opacity 没有混用；
- [ ] 在真实 Parent Surface 上检查必要对比度；
- [ ] 主题默认共享，只在必要 Part + State 上覆盖；
- [ ] Local 用法没有自动晋升全局。

### 17.3 迁移旧 Token

- [ ] 已生成真实消费者清单；
- [ ] 已按角色和父背景判断，不只按名称或 Hex；
- [ ] 已标记 Exact / Normalized / Recipe / Legacy Exception；
- [ ] 混用旧 Token 已按消费者拆分；
- [ ] 需要的临时别名具有单一兼容目标且无名称冲突；未因插级建立编号别名；
- [ ] 新代码已禁止继续使用旧名；
- [ ] 三项 1% Alpha 迁移按已确认豁免处理；
- [ ] 其他视觉变化使用相称验证；
- [ ] 组件迁移、自动验证、Human Gate、发布与业务迁移分别记录。

### 17.4 接入受约束 Tailwind

- [ ] 已开启独立颜色实施检查点，没有混入 B2 冻结基线；
- [ ] 已扩展现有 bridge、manifest 和 validator，没有建立第二套来源；
- [ ] `@theme inline` 只映射公共 Rain 变量和已登记的有作用域派生输出，Internal Source 未泄漏；
- [ ] 默认视觉 namespace、`source(none)` 与精确 `@source` 仍有效；
- [ ] Category 直用只发生在页面自有节点或已登记 Recipe；
- [ ] 新组合由 Recipe 声明并通过通用检查；合法数据无需逐项修改 validator 或重复编写测试；
- [ ] 非法用途、Alpha、整体 Opacity 和双重 Alpha 可被拒绝，未把 namespace reset 当作完整校验；
- [ ] 全部受支持主题的组合资格已检查，派生变量与映射可追踪且不泄漏作用域；
- [ ] 实际允许 AI 编辑的消费者入口已纳入检查，不以少数试点文件代表全库；
- [ ] Local Recipe / Fork、Candidate 和 CSS 例外字段完整；
- [ ] 已运行 B2、完整仓库和浏览器隔离验证；
- [ ] 自动验证、Human Gate、发布和业务迁移分别记录。

### 17.5 建设 Dark Mode

- [ ] Dark 值来自用户提供或新的明确设计决策；
- [ ] 没有算法生成或 Light 静默回退；
- [ ] canonical ID、Key 集合和 order 与 Light 一致，Solid / Alpha 形态约束仍成立；
- [ ] 同值使用显式 Alias；
- [ ] Semantic 每个 Mode 都有唯一映射；
- [ ] Component / Local Recipe 身份未复制；
- [ ] Theme Mode 与 Surface Context 独立，各主题 OnColor 配对及 Alpha 派生输出已验证；
- [ ] 所有依赖完成后才标记 Dark Ready；
- [ ] 视觉与可访问性检查后才标记 Dark Validated。

---

## 18. 当前未决事项

以下内容必须在后续阶段继续基于证据讨论：

1. 57 个 Light Category Token 的最终 Registry 文件格式和平台序列化；
2. Vue 真实消费者 Usage Inventory；
3. 每个等级最终的 `常用 / 条件 / 限制` 标签；
4. Global Semantic Token 的最小名单及每项映射；
5. Button、Input、TextButton、Link、Border、Surface 等 Component Recipe；
6. 当前 42 个 Semantic Token 的保留、别名、拆分或废弃结果；
7. 除三项 Alpha 归一化外的现有色值迁移及验证范围；
8. Success、Warning、Error、Info、Intelligence 等未来色阶；
9. Dark Mode 全部实际色值与真实父表面；
10. Registry、Figma、Tailwind 和 AI 文档的生成实现；
11. 独立实施计划、自动验证、Human Gate、发布与业务迁移。

在这些事项被确认前，本文不得被表述为“颜色 Token 改造已完成”。
