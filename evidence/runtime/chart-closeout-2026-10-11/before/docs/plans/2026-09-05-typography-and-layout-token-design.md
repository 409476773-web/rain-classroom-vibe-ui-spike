# Rain Next Typography 与布局类 Token 设计

## 0. 状态与范围

- 日期：2026-09-05；工作模式：System Mode，设计整理。
- 用户已确认：字号表含补入的 9、11；圆角增加 12、16；公共间距增加 28、36、40；默认排版预设与局部组合并存；行高为字号的 1 至 2 倍，包含上下限；字间距采用最小方案。行高上限来自用户补充，取代此前仅限制下限的规则；用户随后回复“确定”，确认该上下限。
- 用户已确认默认使用原则：“默认直接使用完整方案；有明确需求时，才拆开其中需要改变的部分。”
- 用户已确认 Size / Density 的职责与选择顺序，见第 3.4 节。用户随后明确指出新版大多数组件尺寸不正确，要求高度（含公共高度）和间距优先对照旧版 Vue 已建设完成组件；此前 Compact 32px / Default 36px 候选保留为讨论记录，须依据旧库重新论证，不作为优先默认。
- 本轮交付：补齐首版行高选择，整理 10 个 Typography 预设，定义层级、响应式的作用范围与关系，补充有来源和消费范围的候选数值，并记录 Size / Density 决定。
- 本轮提出的完整行高表、预设身份与用途属于可审阅设计，不表示人工视觉验收已经完成。
- 实现状态：`not-started`。本轮只维护本文与 [Size / Density ADR](../adr/0003-size-and-density-responsibilities.md)，不修改 Token、组件、Tailwind、AGENTS、阶段状态、颜色规范、Figma 或发布内容。
- 层级、内容宽度及具名配方的容器阈值：`proposed`，见第 6、7 节；尚未确认或实测。公共视口断点：`deferred`，不把桌面验证宽度自动注册为公共断点。

本文承接 [颜色治理设计](2026-09-05-color-token-governance-design.md) 的稳定身份、明确依赖、局部组合和共享来源规则。当前执行合同仍见 [AGENTS](../../AGENTS.md)、[阶段状态](../../status/current-phase.yaml) 与 [Tailwind B2 ADR](../adr/0002-tailwind-b2-local-fork.md)。后续实施须显式同步旧档位和消费边界，不能仅凭本文认为运行中的限制已改变。

相对于既有合同，本次设计新增公共字号/行高组合能力，并扩展圆角和间距档位；Reading 的三个默认组合继续保留。用户允许按内容角色和局部设计需要调整排版，不采用根据字符串长度自动改变行高的规则。

## 1. 共同结构与已确认基础值

基础 Token 提供带类型的选择；Typography 预设提供常用完整组合；Component / Local Recipe 决定具体 Part 的使用和调整范围。

默认按用户确认的原则消费：**默认直接使用完整方案；有明确需求时，才拆开其中需要改变的部分。**

- 完整方案按当前任务所需的粒度选择，例如语义匹配的排版预设、组件变体或布局配方。
- 明确需求可来自用户任务或可验证的场景约束。AI 只调整与该需求相关的字段；必要的关联调整一并处理，并重新检查完整组合，例如改字号后检查行高范围和容器几何。普通合规的局部调整不要求逐项确认。
- 页面或功能的差异沿用 Local Recipe / Local Fork 登记原方案、修改部分和作用范围；其余配置保持原方案，本地差异不自动改写共享默认值。沿用现有来源更新规则，不因此自动覆盖 Local Fork。
- 没有语义合适的完整方案，或组件库建设阶段正在设计新方案时，允许直接组合基础 Token；仍遵守组合与行为规则，无须为了完成单个页面先新增全局预设。

| 类别 | 已确认值 |
| --- | --- |
| FontSize，px 设计基准 | `9 / 10 / 11 / 12 / 13 / 14 / 15 / 16 / 17 / 18 / 19 / 20 / 22 / 24 / 26 / 28 / 32 / 36 / 40` |
| Radius | `4 / 6 / 8 / 10 / 12 / 16 / full` |
| Space，px 设计基准 | `0 / 2 / 4 / 6 / 8 / 10 / 12 / 14 / 16 / 18 / 20 / 24 / 28 / 32 / 36 / 40` |
| UI 字体与字重 | PingFang SC；Regular 400、Semibold 600 |
| Data 字体与字重 | LINE Seed JP App_OTF Bold；700，仅规定的关键数据 Parts |
| 公共字间距默认值 | `LetterSpacing/Default = 0em` |

身份示例 `FontSize/14`、`LineHeight/22`、`Space/16` 表示固定设计基准，不是可重新编号的排序位置。变更用途的默认值时重指向用途别名或 Recipe；不把 `Space/16` 原地改成 20。单位输出调整与视觉尺度调整分别记录，不借本次整理统一改为 rem。

相同数值不自动建立共同变化关系。字体、圆角、间距等各有消费类型；共享不可变数值可以是实现细节，用途别名仍可独立维护。Theme、Density、Viewport 和 Container 条件分别管理，仅对实际受影响的配方建立映射，不为每个空间值复制 Light / Dark 数据。

## 2. 首版行高选择

### 2.1 固定长度档位

首版设计采用以下完整公共列表，单位为 px 设计基准：

`14 / 15 / 16 / 18 / 20 / 22 / 24 / 26 / 28 / 32 / 36 / 40 / 42 / 48`

| 档位 | 收录依据 |
| --- | --- |
| 14 | 现有 TextButton Small 等紧凑组件 |
| 15 | Classic 竖向 Tag 已有专门行高，作为来源兼容值收录，不推荐为通用正文默认 |
| 16 | 支持用户明确讨论的 16 / 16，以及小字局部组合 |
| 18 / 20 / 22 / 24 / 26 | 新旧 UI、说明、标题和 Reading 已有组合 |
| 28 / 36 / 40 / 48 | 本轮补充的大字号组合选项，例如 20 / 28、28 / 36、32 / 40、40 / 48；尚未视觉验收 |
| 32 | Classic 页面标题 24 / 32 |
| 42 | Next 关键数据 36 / 42 |

来源：[Next 字体](../../packages/foundations/src/typography.css)、[Next 组件尺寸](../../packages/foundations/src/tokens.css)、[Classic Token](../../../../雨课堂_ai设计系统_v3.0/src/styles/tokens.scss)。未收录的 30、34、44 等值不因数值相邻自动可用；有明确需求时进入局部候选或后续档位变更。

### 2.2 等于字号的选项

另保留一个有明确类型的关系值：`LineHeight/Equal = 1`，类型为无单位倍率，CSS 输出为 `line-height: 1`。

- 其实际长度等于作用元素自身的最终字号，适配现有 Badge 的 9 / 9、10 / 10。
- 它也能表达 11 / 11、17 / 17、19 / 19 等等值组合，无须把每个字号再复制进固定行高表。
- `Equal` 不等于固定 1px；固定档位 14 输出 14px，不能误输出为无单位 14。
- 允许用于局部组合，但只表达数值下限，不成为 Reading 或普通正文的推荐默认值。
- 本轮不开放 1.25、1.5、2 等另一整套公共倍率档位。

固定长度与倍率在数据、检索、设计工具映射中保留类型区别。需要数值行高的输出端按具体字号解析 Equal；派生结果不能反过来成为第二份人工维护的事实源。

### 2.3 组合规则

基础合法条件为：字号已登记、行高已登记或为 Equal、最终解析长度满足 `fontSize <= lineHeight <= 2 * fontSize`，包含上下限。该条件适用于公共预设、组件配方与局部组合；颜色与字号的命名空间分别判断。

范围合法不表示区间内每个值都自动成为公共 Token，也不要求给每个字号新增两倍行高。16px 字号当前可选固定行高为 `16 / 18 / 20 / 22 / 24 / 26 / 28 / 32`，Equal 也合法且实际为 16px；36px 等超出 32px 的行高不得与其组合。

| 字号 | 行高选择 | 基础数值判断 |
| --- | --- | --- |
| 16 | 14px | 不允许，行高小于字号 |
| 16 | 16px | 允许 |
| 16 | 32px | 允许，恰好为字号的两倍 |
| 16 | 36px | 不允许，超过字号的两倍 |
| 12 | 24px | 允许，恰好为字号的两倍 |
| 12 | 26px | 不允许，超过字号的两倍 |
| 17 | 18px | 允许 |
| 17 | Equal | 允许，实际 17px |
| 10 | Equal | 允许，实际 10px |
| 36 | 42px | 允许，保留现有组合 |
| 40 | 48px | 允许，本轮补充选项 |
| 40 | 36px | 不允许，行高小于字号 |
| 14 | 30px | 不允许，超过 28px 上限；未登记也不能作为普通局部候选绕过上限 |
| 16 | 30px | 满足数值范围，但未登记；按局部候选处理，通过范围检查不等于已获公共消费资格 |

基础合法后还须检查实际字体、换行、混排、上下标、容器裁切与图标对齐。数值检查不代替视觉验证；也不据此新增“所有正文必须使用某个固定倍率”的限制。

继承、响应式覆盖、Local Recipe 覆盖后仍须满足上下限。例如字号从 16 改为 20，遗留的固定 18px 行高低于下限；字号从 16 改为 12，遗留的固定 26px 行高超过上限。无法解析的继承或运行时值不得标记为已验证，应在实际消费节点检查。此处约束系统及 AI 设计的排版组合，不用运行时强制钳制阻止用户自己的辅助阅读样式；浏览器文本缩放及用户调整间距后的内容可用性另行验证。[WCAG 文本间距说明](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) 并不要求所有默认行高都设为 1.5 倍。

## 3. 第一批 Typography 预设

### 3.1 预设字段与来源状态

完整预设包含字体角色、字号、行高、字重、字间距，以及必要的数字排版规则。颜色、容器高度、段落间距、截断行为和 HTML 标题层级由使用场景或组件负责。

下表为首批 10 个逻辑身份；CSS、TypeScript、Figma 的具体命名与 Registry 文件格式留到实施时统一映射。`Next` / `Classic` 表示参数来源，不表示这些新的公共身份已经实现或通过 Human Gate。

| 逻辑身份 | 字号 | 行高 | 字重 | 字体角色 | 默认用途 | 来源 |
| --- | --- | --- | --- | --- | --- | --- |
| `Typography/UI/Default` | 14 | 22 | 400 | UI | 普通 UI 文本、表格正文和常规标签 | Next UI / Card Content |
| `Typography/UI/Compact` | 13 | 18 | 400 | UI | 紧凑标签、短提示和辅助字段 | Classic Segmented / Checkbox / FormItem |
| `Typography/UI/Caption` | 12 | 20 | 400 | UI | 次要元数据、图注与短辅助信息 | Classic Caption；400 按 UI 默认规则 |
| `Typography/UI/Supporting` | 13 | 20 | 400 | UI | 面板短说明、内容补充 | Next Card Description；400 按 UI 默认规则 |
| `Typography/Heading/Section` | 16 | 24 | 600 | UI | 卡片、区块标题、页面主标题 | Next Card Title / Classic Section |
| `Typography/Heading/Page` | 24 | 32 | 600 | UI | 页面主标题（极少使用）、重要数据 | Classic PageHeader |
| `Typography/Reading/Small` | 14 | 24 | 400 | Reading | 较紧凑的长内容阅读区 | Next Reading Small |
| `Typography/Reading/Default` | 15 | 26 | 400 | Reading | 答案解析、评语、报告结论 | Next Reading |
| `Typography/Reading/Large` | 16 | 26 | 400 | Reading | 更大字号的阅读区 | Next Reading Large |
| `Typography/Data/Default` | 36 | 42 | 700 | Data | 承担视觉锚点的关键数值（极少使用） | Next Data |

参数来源：[Next Typography](../../packages/foundations/src/typography.css)、[Next UI 样式](../../packages/ui/src/styles.css)、[Classic Typography Token](../../../../雨课堂_ai设计系统_v3.0/src/styles/tokens.scss)、[Classic 标题实现](../../../../雨课堂_ai设计系统_v3.0/src/layout/semantic-layout.scss)、[Classic Segmented](../../../../雨课堂_ai设计系统_v3.0/src/components/Segmented/segmented.scss)。将已有参数组织成上述用途预设是本轮设计选择，不能由来源相同推断所有消费者应共同变化。

所有预设的字间距设计默认值为 `LetterSpacing/Default`。Data 另保留现有 `tabular-nums lining-nums`。从未设置字距或继承值迁移到显式 0em 时，需要检查实际结果，不能直接当作已经验证的等价替换。

### 3.2 字体资格与使用方法

- UI、Reading 和 Heading 使用 PingFang SC；系统回退字体维持现有声明，不改变正式视觉选择或分发许可。
- **2026-09-06 用户确认：关键数据可以使用其他字号。** `Typography/Data/Default` 的 36 / 42 / 700 是默认组合，不限制 Data 只能使用 36px。可按场景选择其他已登记字号，例如 20 / 28、24 / 32、40 / 48；这些是局部组合示例，不新增全局预设。改变字号后同步检查行高、容器与数值/单位关系，保留 Data 字体、700 字重和数字规则。
- Data 只用于关键数据中的数字及紧邻的 `% . , : / K`。中文单位、Label、普通表格数字、日期、分页等继续使用 UI 字体；Value / Unit / Label 保持独立 Parts。
- 按第 1 节默认使用原则先选合适预设；有明确调整需求时，引用已有基础值或预设字段，只记录需要改变的部分。字号、行高和符合字体角色的字重仍可独立选择，调整后的完整组合须通过校验。
- 例如阅读说明使用 14 / 26、标题局部使用 20 / 28，不要求先增加全局 Typography 预设；字号调整后不得遗漏行高及容器检查。
- 公共字号可多于公共预设；本轮不为 19 个字号各造一个文本角色。9、10、11 保留小型标记等使用空间，不作为普通正文的优先推荐。
- 单个页面或功能的视觉调整沿用 Local Recipe / Local Fork 路径，公共组件根节点的外部布局入口不因此获得内部排版改写权限。组件设计阶段仍可直接组合基础值，无须为套用通用预设改变已确认的组件几何。

### 3.3 组件组合独立管理：现状与目标分开

下表记录现有实现，不能将 Next 的当前值直接当作正确尺寸或未来公共标准。表中的保留规则用于避免套用 Typography 预设时连带改写组件，不赋予当前 Next 几何保留资格；高度、间距及必要关联字段按第 3.4 节的 Classic 来源规则重新核对。本次来源纠正不自动撤销用户已确认的字号、行高范围等基础选择。

| 现有消费 | 当前字号 / 行高 | 处理规则 |
| --- | --- | --- |
| Button Mini | 13 / 18，600 | 保留组件字重与完整尺寸配方 |
| Button Small / Medium / Large | 14 / 22，600 | 不因 UI Default 为 400 而改为 400 |
| Button XL | 16 / 24，600 | 不因与 Section 标题参数相同而自动共享用途别名 |
| TextButton Small / Compact / Regular | 12 / 14、13 / 18、14 / 20，400 | 保留三个配套尺寸，不统一替换成 14 / 22 |
| Next Tag | 12 / 18 | 保留现有组合；移除文字 11px 的最终行高按继承检查 |
| Next Badge Small / Medium | 9 / Equal、10 / Equal，0.02em | 保留来源；当前 700 是组件事实，不因此开放通用 UI 700 |
| Next Input | 13px，根样式未显式设置行高 | 先检查实际继承结果，不自动归入 13 / 18 预设 |
| Classic 竖向 Tag | 已有 15px 专用行高 | 记录来源，不借迁移自动改成 16 或 18 |

组件高度、内边距、图标盒子和点击区域仍由组件配方管理。Size / Density 的已确认职责及来源纠正见下节；当前 Next Compact 下 Button 32px、Input 30px 仅用于差异对照，不在本轮修改运行高度。

### 3.4 Size / Density：职责已确认，尺寸来源以 Classic 为主

2026-09-05，用户在审阅 Size / Density 建议后回复“确定”，确认下述分工、选择顺序和当时的候选验证方向。用户随后纠正尺寸来源：“新版组件库大多数组件的尺寸都是不对的”，要求高度（包括公共高度）及间距优先对照旧版 Vue 已建设完成组件。该补充改变数值候选的依据，不改变已确认的职责分工；记录同时见 [ADR 0003](../adr/0003-size-and-density-responsibilities.md)。

本轮来源规则：

1. 以旧版 Vue 已建设完成组件的设计确认、契约和实际样式为主要依据，追踪到具体 Variant / Part 的高度、内边距、间距及关联排版；不能只抄全局 Token 表。来源存在冲突时单列，不静默选取。
2. 核对 [Classic 生命周期](../../../../雨课堂_ai设计系统_v3.0/src/component-lifecycle.js)及对应验收记录。已实现、局部设计确认、组件整体验收与发布分别标记；候选组件的源码可用于发现需求，不自动获得与已确认方案相同的推荐资格。
3. Next 的现有高度与间距只作为差异清单和后续修正对象；不因已经实现或自动测试通过而成为视觉标准。成熟库用于比较组织方式，数值仍优先来自 Rain Classic 和用户明确的新需求。
4. 先整理组件完整方案及实际重复用途，再决定哪些高度或间距值得共享、哪些保留组件专属、哪些需要局部组合。数值相同不自动绑定用途，旧库存在的每个数值也不自动升级为公共 Token。

| 对象 | 职责 |
| --- | --- |
| Size | 选择组件完整尺寸方案，包含高度、内边距、排版、图标盒子与圆角等配套字段；各字段不要求同比变化 |
| Density | 为所属区域选择默认组件方案和间距节奏，不对已选 Size 做第二次缩放 |
| 布局配方 | 管理同排控件的对齐、排列、换行及区域关系；响应式不因窗口变窄自动切换 Density |

消费顺序：

1. 组件已提供 Size 且显式选择时，使用对应完整方案。
2. 未指定 Size 时，由所属区域的 Density 提供默认方案。
3. 有进一步需求时，按现有 Local Recipe / Local Fork 规则调整必要字段及关联项，再检查完整组合；显式 Size 不取消周围布局的密度规则。

同一局部组件组保持同一 Density，但不要求所有组件使用相同 Size 或高度；TextButton、Badge 等保留自身角色和几何。此顺序不要求所有组件新增 Size，也不要求复制 Button 的完整档位集。当前 [Button](../../packages/ui/src/button/button.tsx)已经显式 Size 优先；当前 [Input](../../packages/ui/src/input/input.tsx)尚无 Size 入口，本次不修改其 API。

此前普通单行表单、搜索工具栏提出的 **Compact 32px / Default 36px** 仅保留为历史候选，须以旧版实际默认方案、组合场景及间距重新论证。上一轮讨论从 Next Button 推出的 `28 / 32 / 36 / 40 / 48px` 五档，不再作为本轮推荐的公共高度表；本轮尚未确定替代公共表。下表只是 Next 当前实现的差异对照，不是目标基线：

| 消费 | Compact | Default |
| --- | --- | --- |
| 普通 Button | 32px | 36px |
| Input | 30px | 36px |
| TextButton | 24px | 26px |

来源：[组件尺寸](../../packages/foundations/src/tokens.css)、[Density](../../packages/foundations/src/density.tsx)和上述 Button 选择逻辑。Input 的 30px 不因现有实现而获得公共或兼容档位资格，也不在本轮自动改为 32px。现行 [Spike Brief](../../SPIKE_BRIEF.md)的 Button 五档记录仍是既有实施合同记录，不能据此反推公共尺度；后续实际改造时再按明确方案同步相关合同与实现。

同类新控件的可比 Size 档位应尽量保持一致含义。历史同名不保证等高：Classic Button Medium 为 36px，Input Medium 为 32px，见 [Classic 尺寸](../../../../雨课堂_ai设计系统_v3.0/src/styles/tokens.scss)与 [Input 合同](../../../../雨课堂_ai设计系统_v3.0/src/components/Input/input.contract.js)。组合时查询实际方案，通过映射承接差异，不直接批量重命名；需要等高时选择各组件对应的完整方案，不仅覆盖高度属性。

高度按用途处理：单行标准控件使用确认后的固定高度方案；多行输入和复杂列表项按内容选择最小高度、行数或自适应方案；Card、页面模块和表单分区主要由内容与内边距决定。图标盒子和点击区域继续由对应 Part 分别核对。

未来公共高度值应保持固定身份，例如 `Control/Height/32` 若被登记，其数值不随 Density 变化；本次尚未确定公共高度表、正式命名或全部组件的 Size 映射。后续实施与视觉验证分别记录。

#### 3.4.1 Classic 高度与间距：完整来源审计

已完成 [Classic 尺寸、间距与完整方案来源审计](../audits/2026-09-05-classic-size-spacing-recipes-audit.md)，覆盖当前生命周期 44 项、另 8 个公开衍生，以及内部 Popup、Layout 与 Pattern；完整配套、来源冲突和覆盖映射以该审计为准。下表保留为常见组件速览。以下为 2026-09-05 只读核对的源码与契约定义，单位为 px；不是本轮浏览器实测或新的公共档位表。“已确认”指当前生命周期中的组件设计验收，不表示已经发布；“候选”仍有实际实现，不能据此称为尚未建设。

| Classic 组件 | 高度及测量对象 | 配套间距 | 来源状态 |
| --- | --- | --- | --- |
| [Input](../../../../雨课堂_ai设计系统_v3.0/src/components/Input/input.scss) | Small / Medium / Large：28 / 32 / 36；默认 Medium 32 | 左右各 16；内部 gap 8；三档均 14 / 22 排版 | Input family 已确认 |
| [InputNumber](../../../../雨课堂_ai设计系统_v3.0/src/components/InputNumber/input-number.scss) | Small / Medium / Large：28 / 32 / 36；默认 Medium 32 | 左 12、右 4；gap 8；加减区域宽 28、按钮间隔 2 | Input family 已确认 |
| [TextButton](../../../../雨课堂_ai设计系统_v3.0/src/components/TextButton/text-button.scss) | Small / Compact / Regular：固定 20 / 24 / 26 | 左右各 6、上下各 3；前图标到文字间距 2 / 4 / 4 | 已确认 |
| [Tabs](../../../../雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.scss) | Small / Medium / Large / XL 的 Tab item：固定 32 / 38 / 38 / 42 | 水平 item 左右各 8；相邻 item gap 小中 8、大 XL 24；内部内容 gap 2 / 4 | 已确认 |
| [Tag](../../../../雨课堂_ai设计系统_v3.0/src/components/Tag/tag.scss) | 基础横向 Small / Medium / Large：固定 20 / 24 / 28；竖向另为 36 / 40 / 44 | 基础横向左右各 6 / 8 / 12，内容 gap 4；竖向 padding 0 | 已确认；其他专用形态另查 |
| [Tree](../../../../雨课堂_ai设计系统_v3.0/src/components/Tree/tree.scss) | Compact / Default 行框：最小 36 / 44；富内容允许增高 | 普通内容 gap 4；起始 4 加每级缩进 24，末端 8；富内容另有配方 | 已确认 |
| [Button](../../../../雨课堂_ai设计系统_v3.0/src/components/Button/button.scss) | Mini / Small / Medium / XL：固定 28 / 32 / 36 / 48；默认 Medium 36；公开轴没有 Large 40 | 左右各 12 / 20 / 20 / 28；图文 gap 前三档 4、XL 6 | 组件整体验收仍为候选 |
| [Select](../../../../雨课堂_ai设计系统_v3.0/src/components/Select/select.scss) | Small / Medium / Large：最小 28 / 32 / 36；默认 Medium；多选内容可以增高 | 左 16、右 12；上下各 2 / 4 / 6；多选项 gap 4 | 组件整体验收仍为候选，有局部确认 |

数值引用解析见 [Classic Token](../../../../雨课堂_ai设计系统_v3.0/src/styles/tokens.scss)，状态见上述生命周期。Input 左右各 16、内部 gap 8 也在 [Input 设计说明](../../../../雨课堂_ai设计系统_v3.0/docs/components/Input.design.md)中明确要求；不能仅因 Next Density 当前提供另一组 padding，就反向改变此来源。

补充来源：[Segmented](../../../../雨课堂_ai设计系统_v3.0/src/components/Segmented/segmented.scss)的 Track 为 28 / 32 / 36；[Pagination](../../../../雨课堂_ai设计系统_v3.0/src/components/Pagination/pagination.scss)页码按钮为 24 / 28 / 30；[Badge](../../../../雨课堂_ai设计系统_v3.0/src/components/Badge/badge.scss)指示器为 16 / 20。三者生命周期仍为候选，先作为需求与差异证据。[ManageTree](../../../../雨课堂_ai设计系统_v3.0/src/components/Tree/manage-tree.scss)有局部 40px 行框变量和独立的 216px 高视口，但仍受 Tree 默认 Compact 最小 36、Rich 内容/内距及拖拽控件影响，不能写成所有节点固定或最小 40，条件详见完整审计。[Container](../../../../雨课堂_ai设计系统_v3.0/src/components/Container/container.scss)按内容决定高度，页面 padding 的 16 / 24 / 32 见 [布局基础合同](../../../../雨课堂_ai设计系统_v3.0/src/layout/layout-foundation.contract.js)。页面 padding 三档不等于组件 Density 三档。

由这些来源直接得到的约束：

- Size 是完整方案：Tabs Medium 与 Large 同为 38，但字号与相邻间距不同；共享高度不能替代完整 Size，也不能由高度自动计算全部 padding、字号或圆角。
- 本表区分固定高度、最小高度、行框、指示器与视口。Input / InputNumber 根样式未自带 `box-sizing: border-box`，旧 [Demo](../../../../雨课堂_ai设计系统_v3.0/demo/App.vue)提供全局设置；未来独立消费须核对实际外框口径。最小高度也不承诺所有内容和状态下最终高度等于该值。
- 修改几何还要检查行为依赖：[Tree](../../../../雨课堂_ai设计系统_v3.0/src/components/Tree/Tree.vue)的虚拟滚动计算另写了 36 / 44。后续若调整行框，须让样式与滚动计算使用一致几何来源；本轮仅登记风险，不宣称已发生错位或已修复。
- 当前已确认的 Space 表能表达速览中的普通正向间距；完整审计另发现 Tooltip 上下 7 等专用值，以及部分特殊字号、行高、字重和圆角超出当前公共表。负边距、边界补偿和图标光学位置单独检查，不为凑公共尺度改变旧组件，也不自动扩充已确认档位。公共高度表仍待按用途提炼，不把此处所有高度合并成任意组件都能使用的列表。

## 4. 字间距最小方案

公共只建立 `LetterSpacing/Default = 0em`，默认不额外压缩或加宽文字。Next Badge 已有的 0.02em 保持组件专属；负字间距或其他正值按明确的局部设计需求记录候选、验证，再决定是否晋升。

Chakra 提供独立档位，MUI 将字间距绑定字体和排版预设；MUI 默认字间距针对 Roboto，换字体时不会直接套用该组数值。Rain 采用可组合的管理方式，不照搬其他字体的调校值。参考：[Chakra Typography](https://chakra-ui.com/docs/theming/typography#letter-spacings)、[MUI 排版源码](https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/styles/createTypography.js)。

0em、0.02em 是有单位的间距；在字号为 10px 的目标节点上声明 0.02em，结果为 0.2px，不等同于固定 0.02px。固定值和相对值不得在数据输出时互换。继承的字距可能已解析为父级的长度，不能假设子节点改字号后会同比重算；完整预设应在实际目标节点落实字距。派生像素结果不再手工登记为新 Token。依据：[CSS 字间距的计算与继承](https://www.w3.org/TR/css-text-3/#letter-spacing-property)。

## 5. 圆角、间距及其他已确认分工

- 圆角采用第 1 节七档；10、12、16 是大页面模块的常用选择。同一家族中较大尺寸通常可选较大圆角，但内容变高不自动改变圆角；full 表示形状意图。既有 Button 的 6 / 8 配方不因新增档位而改变。
- Space 采用第 1 节十六档，共用于页面自有节点的 gap、padding、margin。用途别名按维护需要建立；组件特殊几何值不自动升级为公共间距。
- 边框宽度、样式、颜色可分别定义；默认边界和 Focus 按完整配方消费，保留键盘可见性与强制颜色模式等行为要求。
- 图标尺寸由宿主 Part 管理；图标盒子、实际图形和点击区域分别考虑，本轮不建全局 Icon 尺寸尺度。
- 阴影参数可拆分，业务默认用 none / overlay / dialog 完整预设；Focus 的阴影表达继续属于 Focus 配方。
- 动效复用时长与曲线，配方同时规定作用属性及 reduced-motion 行为，不将过渡时长与循环 Loading 时长自动合并。

## 6. 层级：先定义作用范围与关系

本节先规定职责与关系，再提出普通文档层方案的候选基准；不实施新的层级管理器。

| 作用范围 | 对象 | 负责方与约束 |
| --- | --- | --- |
| 组件内部 | Badge 标记、Table 固定列/表头、组件内部遮罩 | 组件管理相对顺序；需要隔离时由组件建立并验证层叠上下文，不让局部数字获得跨页面意义 |
| 页面结构 | 普通内容、局部 sticky、平台导航等 | 页面或 Layout 配方管理；局部 sticky 不自动成为全局最高层 |
| 浮层会话 | Popup、Dialog、Drawer 及其后代浮层 | 统一浮层基础设施管理归属、Portal 目标和活动顺序；Token 提供角色与基准 |

必须满足以下关系：

1. 组件内部各层保持在其所属页面或浮层的作用范围内，不能靠局部高值穿越整个应用的遮罩。
2. Dialog 内的 Select / Dropdown 弹层显示在所属 Dialog 内容之上；Portal 到其他 DOM 位置也不丢失逻辑归属。
3. 新模态层及其遮罩覆盖先前页面及其非活动浮层。背景 Tooltip / Dropdown 应关闭或受背景层约束，不使用“Tooltip 永远最高”绕过活动模态层。
4. 多个模态层按活动顺序与归属管理；只显示正确的最上层交互。Escape、焦点约束/返回、滚动锁等由行为层处理，z-index 不代表这些行为已经正确。
5. 同一元素的语义层级、实际层叠上下文与 Portal 目标要一致。若采用浏览器 top layer，还须独立核对它与普通文档层的关系，不能靠加大普通 z-index 排到其上方。参考：[CSS Top Layer 规范草案](https://drafts.csswg.org/css-position-4/#top-layer)。

应用级 Message / Toast 单列为全局消息角色，可以展示当前操作的反馈，但不抢夺焦点或解除模态交互约束；背景页面的普通 Tooltip / Dropdown 不得借用该角色。具体消息组件仍须验证模态期间的可感知性与交互规则。

可借鉴的依据：[MUI](https://mui.com/material-ui/customization/z-index/) 用语义角色维护整体顺序；[Ant Design](https://raw.githubusercontent.com/ant-design/ant-design/master/components/_util/hooks/useZIndex.ts) 结合父级 Context 计算子浮层层级；[Radix Themes](https://www.radix-ui.com/themes/docs/overview/styling#z-index-conflicts) 结合 Portal、根层叠上下文和打开顺序管理嵌套浮层。实施时选择与本仓库 Headless 方案匹配的单一落实路径，不叠加多套管理器。

### 6.1 候选基准与消费范围

推荐少量根层角色加浮层归属管理。按组件名固定一长列高低顺序较容易理解，但单靠它不能解决嵌套；完全依赖 Portal 顺序则要求所有参与组件遵守同一挂载规则。Rain 先保持角色合同，具体落实复用最终选定的 Headless 能力。

| 逻辑身份 | 候选 z-index | 消费对象 |
| --- | --- | --- |
| `Layer/PageRoot` | 0 | 页面内容所属的根层叠上下文，含导航、局部 sticky 和组件内部层 |
| `Layer/OverlayRoot` | 1000 | 承载 Popup、Dialog、Drawer 会话的根层叠上下文 |
| `Layer/FeedbackRoot` | 1100 | 应用级 Message / Toast 的根层叠上下文；不用于普通页面内容或背景 Popup |

0、1000 参考 [Classic Token](../../../../雨课堂_ai设计系统_v3.0/src/styles/tokens.scss) 的页面与 Popup 基准；1100 是本轮候选。1000 与 1100 的差值不提供隔离保障，也不表示更高视觉品质。三个宿主必须处于可比较的同级层叠上下文；Overlay 内部排序始终受其根上下文约束，不通过不断增加全局数值越过 Feedback。修改任一根层值时复核三者关系。

这些是基础设施角色，不向业务开放任意提升层级的入口。Dialog 内 Select 通过会话归属排在 Dialog 之上，不新增 `SelectAlwaysHighest` 或规定每次打开加 100。下一模态层覆盖上一会话及其普通子浮层；具体顺序由同一套行为与挂载机制管理。Portal 还要保留 Rain 主题、密度和字体作用域，数字正确不代表继承正确。

当前 Next Badge 的 z-index 1、Classic Table 的层级 Token 0 / 2 / 3 / 4 继续视为组件内部配方，不升级为公共层级尺度。若最终采用浏览器 top layer，上表的普通文档层数值不能直接统管它；Feedback 的挂载和模态期间的可感知性须随所选方案验证，不能再用更大的数字修补。

上述基准只有通过“页面 → Dialog → Select”“Dialog → 第二个 Dialog”以及模态期间的消息反馈场景后，才具备对应实现的采用依据；当前不声明运行验证通过。

## 7. 响应式：分别定义三类对象

| 对象 | 观察/约束对象 | 负责的行为 | 不自动决定 |
| --- | --- | --- | --- |
| ViewportBreakpoint | 整个布局视口宽度 | 平台导航折叠、页面级栏数或区域重排 | 某个局部面板内部布局 |
| ContainerBreakpoint | 明确指定的祖先容器可用宽度 | 面板内单/双列、工具栏换行、局部内容重排 | 整个页面的导航模式 |
| ContentWidth | 某类内容的最大铺展宽度 | Reading、Form、Report 等内容上限 | 页面或容器何时切换布局 |

关系规则：

- 布局所有者定义可查询容器和范围；嵌套场景明确查询哪个容器，避免内层新增容器后意外改变查询对象。
- 窗口宽度不变而 Inspector 变窄时，允许仅根据其容器宽度调整内部布局。视口、容器两个条件共同生效时明确属性覆盖顺序。
- 内容上限随可用空间收缩；正常内容不得因为固定上限产生溢出。Table 等需要横向滚动的内容由专门布局配方处理。
- Reading 页面容器的上限与正文行长分别考虑；Form 和 Reading 当前数值相同，也保留独立的用途身份与修改关系。
- Density 不因屏幕变窄自动切换；响应式可改变组合布局，需要改变密度时由场景显式决定。
- 同类断点使用一致单位，定义边界包含关系，并保证 CSS 与确有需要的 JS 消费来自同一权威定义。查询条件不能因无来源的局部数值形成第二套体系。

MUI 区分 [页面断点](https://mui.com/material-ui/customization/breakpoints/)、[容器查询](https://mui.com/material-ui/customization/container-queries/) 与 [Container 最大宽度](https://mui.com/material-ui/react-container/)；[Tailwind 容器查询](https://tailwindcss.com/docs/responsive-design#container-queries) 可用于实现局部宽度响应。

### 7.1 内容最大宽度候选

| 逻辑身份 | 候选值 | 范围 |
| --- | --- | --- |
| `ContentWidth/Reading` | 960px | 阅读页面的内容区域上限；不等于每段正文的推荐行长 |
| `ContentWidth/Form` | 960px | 表单内容区域上限；不强制 Dialog 外框也为此宽度 |
| `ContentWidth/Report` | 1120px | 报告内容区域上限 |
| `ContentWidth/Dashboard` | 1600px | 需要更大铺展范围的 Dashboard 内容上限 |

四项均参考 [Classic Layout Foundation](../../../../雨课堂_ai设计系统_v3.0/src/layout/layout-foundation.contract.js)。延续 [Classic Container](../../../../雨课堂_ai设计系统_v3.0/src/components/Container/container.scss) 的口径：上限作用于外层留白以内的内容区域，实际宽度取可用空间与该上限的较小者。fluid 使用原生无最大宽度约束，不伪造一个巨大尺寸 Token；留白另选 Space，不从宽度档位推导。

Reading 与 Form 保持独立身份。Classic 的 Dashboard 上限直接引用 `screenXXL`，这个共同变化关系不建议带入 Next：内容上限与视口断点可恰好同为 1600，但修改其中一个不应自动改变另一个。纯正文的行长仍由 Reading 配方结合字号、混排与阅读体验确定。

### 7.2 容器阈值先落在具名配方

| 候选逻辑身份 | 值与边界 | 查询对象及行为 |
| --- | --- | --- |
| `ContainerBreakpoint/Query/SingleColumnMax` | 520px，含等于 | 筛选区自身内容盒宽度不大于此值时，字段为单列 |
| `ContainerBreakpoint/Query/TwoColumnsMax` | 760px，含等于 | 大于 520 且不大于 760 时最多两列；超过 760 按该配方声明的列数和内容约束布局 |
| `ContainerBreakpoint/Workbench/InspectorRestoreMin` | 1400px，含等于 | 对应三栏工作台的 PaneGroup 内容盒达到该宽度，且所有几何约束满足时，才允许自动恢复 Inspector |

前两项参考 [Classic QueryTable](../../../../雨课堂_ai设计系统_v3.0/src/components/Table/query-table.scss)；第三项参考 [Classic Layout Recipes](../../../../雨课堂_ai设计系统_v3.0/src/layout/layout-recipes.contract.js) 与 [PaneGroup](../../../../雨课堂_ai设计系统_v3.0/src/components/PaneGroup/pane-group.contract.js)。这些是来源支持的配方候选，不是所有表单、工具栏或面板共用的三档尺寸；不得因进入候选表就修改当前组件。

PaneGroup 必须同时保护 Main 最小宽度、当前侧栏宽度、分隔/间隙与显式收起状态；达到 1400 不代表必然放得下。窗口为 1600 而工作区只有 1100 时，按工作区判断。CSS 与必要的 JS 几何计算采用相同测量口径，避免混用视口宽、容器内容宽和外框宽；收起动作还要保留焦点恢复与滚动归属。

优先用 Flex 换行、Grid 自适应等原生布局处理自然伸缩；确有行为切换时再使用断点。保留来源中的 `<= 520`、`<= 760` 边界，不能直接等同于 Tailwind 默认的 `<` 型 max variant。实现时按同一来源生成准确条件，并检查 520、760、1400 边界及相邻小数宽度，不用 1399 / 1400 这种整数拼接遗漏中间区间。

### 7.3 视口：验证宽度不自动变成断点

Classic 正式桌面验证宽度为 `1200 / 1400 / 1600 / 1920`，1440 是 QA 补点；其配方还列出 320、768 的健壮性检查。这些分类见 [Classic 视口策略](../../../../雨课堂_ai设计系统_v3.0/src/layout/layout-recipes.contract.js)，可作为 Next 对照入口，但不证明 Next 已支持对应场景。

当前 Next 尚无可作为基线的公共平台壳与 Layout 实现，Playground 的 680 / 760 / 980 等媒体查询属于演示页面。暂不把它们或 Classic 整张表注册成公共 `ViewportBreakpoint`。以后平台导航等明确在某个宽度切换，再登记该用途及阈值；不能因为常见屏幕恰好为 1440 就增加一档，也不能把 Classic 工作台的 1200 最小宽度扩成所有 Next 页面、表单和阅读内容的硬下限。

本轮复看了 [主从预览来源](../../evidence/screenshots/VE-009.png) 与 [长表单来源](../../evidence/screenshots/VE-014.png)：它们支持主区与侧栏分工、表单分区及独立滚动的需求，但单张静态图不能证明断点。候选仍须经过窗口缩放、容器单独调整、长内容及边界两侧的实际验证。

## 8. 与 Tailwind 的接入要求

沿用现有 [Rain bridge](../../packages/foundations/src/tailwind-theme.css)，不增加另一套主题事实源。本节是后续实现要求，当前 utility 尚未因此开放。

1. 基础字号、行高、字距分别映射到明确的 Rain 命名空间；完整预设还需落实字体家族、字重与数字特性，不能仅凭一个字号类宣称已应用整个 Typography。
2. 预设默认行高与局部行高覆盖建立确定优先关系。新增字号/行高类同步接入 [rainCn](../../packages/ui/src/utils/rain-class-names.ts) 冲突规则，并验证预设切换能正确移除旧的覆盖。
3. Tailwind 的 text 前缀既用于颜色也用于字号；字号类斜杠后可表示行高，不能一律用颜色 Alpha 白名单校验。检查解析后的属性和最终组合，并应用第 2.3 节的上下限，不枚举全部字号 × 行高 × 字重组合。
4. `--container-*` 同时生成容器查询与 max-width 工具类；Rain 的名称和消费校验必须区分查询阈值与内容上限，防止框架共用命名空间建立错误依赖。依据：[Tailwind 主题命名空间](https://tailwindcss.com/docs/theme#theme-variable-namespaces)。
5. 已登记组合使用静态可发现的工具类或既有 Recipe 路径；未知值进入具名局部候选。普通合规组合不要求每次新增全局 Token、修改校验器或申请公共组件变更。
6. 公共定义只有一份权威表达；CSS、桥接、检索清单与设计工具映射是派生输出。合法用途和类型规则复用，新增普通档位主要更新数据及受影响的配方验证。
7. 响应条件在构建阶段从权威定义生成，确有需要的 JS 消费同一来源；不把修改运行时 CSS 变量当成已经更新编译后的媒体条件。候选长度保持 px，同类条件不混入 Tailwind 默认 rem 档位。断点只开放查询用途；内容宽度可沿用现有桥接方式生成具名 max-width utility，避免同时生成同名查询入口。参考：[Tailwind 自定义断点与单位](https://tailwindcss.com/docs/responsive-design#using-custom-breakpoints)。

Tailwind 原生支持字号的默认行高与其他排版字段，相关能力见 [font-size](https://tailwindcss.com/docs/font-size)。已有支持不表示 Rain 的组合合同和实际消费已完成迁移。

## 9. 实施前需要核对的差异

| 当前事实 | 后续处理 |
| --- | --- |
| AGENTS 与旧 B2 合同仍记录旧圆角/间距档位 | 用本次用户决策显式更新合同、桥接及对应断言，保留变更来源 |
| Reading Small / Large、Card、Input 等仍有字面量或继承样式 | 核对真实消费，逐项连接到基础值/预设；不能仅新增 Token 表 |
| 现有组件组合不全等同于首批公共预设 | 不按“最接近预设”自动替换；尺寸以 Classic 已确认完整配方为主要依据，Next 现状不能反向成为标准 |
| 新的排版默认字距为 0em，来源可能未显式设置 | 核对继承与排版差异，不静默宣称像素等价 |
| Badge 当前有 UI 700 与 0.02em 组件细节 | 记录现状并保持组件范围，不误提升为通用 UI 字重或字距 |
| 层级、内容宽度和局部容器阈值已有候选，尚未采用 | 对应消费保持现状；逐项验证作用范围后再接入，不自动开放默认断点或任意 z-index |
| 当前 [B2 校验器](../../scripts/verify-tailwind-b2.mjs) 明确拒绝桥接层声明 `--breakpoint-*` | 后续若采用公共视口断点，须同步调整具体来源清单和校验规则；仅写设计文档不会使新类名合法 |

维护时区分改基础值、改用途映射、改组件配方、改局部组合；生成所有受影响的消费者清单。按“共同变化”的意图建立引用，避免因相同字号或宽度自动合并用途。

## 10. 验证边界

本轮文档检查：已确认清单完整且无重复；首批预设均引用登记字号/行高，且满足字号的 1 至 2 倍范围；Equal 按类型解析；本地来源链接可达；章节与状态一致；既有合同和运行文件保持原样。

后续实现的最小验证：

- 正反例：16 / 16、16 / 32、12 / 24、17 / Equal、36 / 42、40 / 48 合法；16 / 14、16 / 36、12 / 26、14 / 30 非法；覆盖到 20px 字号后遗留 18px 行高、覆盖到 12px 字号后遗留 26px 行高均非法。16 / 30 满足范围但未登记，走局部候选；候选不得绕过上下限。
- 行为/视觉：按重新核对的 Classic 来源与明确设计决定验证目标几何；不默认当前 Next 几何正确。检查中文、混排、长文本、缩放、用户间距覆盖，以及字体缺失时的既定回退。
- 组合：默认路径能直接使用完整方案；局部调整只改变相关字段及必要的关联项，不影响其他实例；字号类与颜色类不误合并；预设与独立行高覆盖、嵌套条件的最终结果正确。
- Size / Density：检查显式 Size 优先、默认方案继承、无二次缩放及周围间距保持；从 Classic 完整方案重新论证同排候选，将 Next Input 30px 等列为差异而非目标。检查固定高度、最小高度、内容增高、长内容、缩放、点击区域及依赖几何的行为。未进行视觉验证前，不把候选写成已验收默认。
- 层级：Dialog 内子浮层、背景浮层、新模态层、焦点返回与 Escape 归属正确；根层隔离、Portal 样式继承及模态期间的 Feedback 分别检查，数值大小检查不能代替浏览器验证。
- 响应式：窗口变化、容器单独变化、嵌套容器、内容上限与溢出分别验证；520 / 760 / 1400 的边界、相邻小数宽度、侧栏调整后仍不满足几何约束的情况均纳入；候选未经实测不报告通过。

文档数值检查不等同于运行时校验器实现、组件回归、人工视觉验收或发布。现有 Benchmark 继续作为未来验证入口：[登记说明](../../benchmarks/README.md)，本轮不启动 Benchmark 页面建设。
