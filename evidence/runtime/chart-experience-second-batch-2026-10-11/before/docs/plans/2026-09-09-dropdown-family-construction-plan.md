# Dropdown 家族建设稿

> **For Codex:** 本稿是设计与建设顺序草案。获得对应实施范围后，使用 executing-plans 与 verification-before-completion 执行；复用仓库测试体系。本稿不自动创建工作树、提交或安装依赖。

**Goal:** 建立能直接使用、也能按业务高度改造的雨课堂下拉能力：标准菜单有完整默认 Recipe，混合组件与复杂布局有正式组合入口。

**Architecture:** 公开标准 `DropdownMenu` 与开放内容 `Popover`，分别保持菜单和内容面板的语义；共用选定 Headless 的浮层机械能力及 Rain 视觉来源。默认整套使用，需要时替换局部或重组内容，不穷举业务方案。

**Tech Stack:** 当前 React、TypeScript、Tailwind、CVA、Rain Token、`rainCn`、Local Recipe、Vitest 和 Playwright。第一批已通过同条件实验选择 Base UI 1.8.0，见 [ADR 0005](../adr/0005-headless-base.md)；文中的公共组件及文件名仍为后续建设提案，不代表现有导出。

日期：2026-09-09。工作模式：第一批局部实验建设。**用户已授权视觉样本与 Headless 对照，执行范围见第 10 节；公共组件实现及既有 Gate 保持独立。**

**2026-09-10 接续：** 用户要求读取 HANDOFF 后继续建设，按交接第 7 节进入 Task 3–5。System Mode，新增 `componentRefinements.dropdownFamily` 精确记录公共 DropdownMenu / Popover、三份说明页 Recipe、一次组合改造及检查；第一批实验身份和 Gate 独立保留。使用已安装的 Base UI 1.8.0，无新增依赖。

本批公共 API 为 `DropdownMenu.Root / Trigger / Content / Item / LinkItem / CheckboxItem / RadioGroup / RadioItem / SubmenuRoot / SubmenuTrigger / Group / GroupLabel / Separator / ItemContent`，以及 `Popover.Root / Trigger / Content / Title / Description / Close`。Root 保留 Base UI 受控/默认打开和原因回调；菜单 `closeOnAction` 统一默认策略，四种可激活条目用 `closeOnClick` 覆盖。条目默认渲染 label、description、leading、meta、shortcut，可由 children 替换内容；底座拥有选择/键盘状态，公开选择控件不嵌入菜单项。Popover 内容保留正常表单语义，复用现有 Checkbox / RadioGroup。

视觉继续作为候选：公共实现先取现有 Space/6、8（单行自然高 34/58）、中性 Hover/Pressed Alpha/6、5、Border/Neutral/3 和 Shadow/overlay，不新增全局值；15/22、13/18、600/400、已选主题色与圆形勾标16/10保留。Content 的 width 为软性起点（菜单280、面板320，Recipe可设200/360或更宽），按底座可用视口收敛。共享私有文件仅传递触发器所在主题/密度和表面样式，不拥有打开、定位或焦点控制器。

验证采用现有 Vitest / Playwright、Token/边界/Tailwind 检查及批末完整质量门。需检查关闭策略、按项覆盖、选中禁用、两级菜单、焦点交接、主题更新、320px 视口和失败重试。真实系统读屏、真实 IME、设备触屏及颜色例外仍待实测/人工决定。实施前边界及 Tailwind 基线通过；来源保留在本批 evidence。旧 Vue Popup/Popover 合同及 shadcn、Ant Design、Base UI 文档已复核：保留内容/定位职责分离和具名交互面板；旧固定白底、私有 Token、禁止蓝色光环、hover pin及尺寸限制不继承。MUI 官方 Menu 页面本次读取失败，不据此新增行为决定。

## 1. 来源与当前事实

优先级为：本任务最新用户决定 → 当前有效的专项合同与阶段记录 → 用户修改后的 Figma → 会话研究及交接快照。观察到的设计值不自动获得公共 Token 身份；本任务确认也不等于整套设计已通过 Human Gate。

- [研究与设计会话](https://chatgpt.com/g/g-p-6a94e99106608191a167431c5916d66d/c/6aa012c0-8fb0-83ec-a620-a55cf190f89f)：已读全部 8 轮对话，包括两份研究、设计生成过程、用户修改及后续补全。
- 同会话附件《雨课堂_Dropdown_视觉交接_v0.2.md》与 `.json` 均已全文读取。JSON 的 `0.2.0-draft` 是设计快照，不是运行合同、Registry Manifest 或可执行组件。
- 同会话引用的《雨课堂-vibe coding组件库改造计划.md》已读；其原型优先、品牌统一与局部改造自由的目标继续适用。
- 已对下列 7 个画板逐一看图并核对属性。新增的 25 个状态是候选，20 个原始 Master 与补充候选之间没有自动继承关系；画板没有原型交互证据。

| Figma 来源 | 已核对内容 |
| --- | --- |
| [01 完整菜单](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2255-26) | 紧凑操作、双行描述、复选/单选设置、分组级联 |
| [02 方向对比](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2255-27) | 原样及 A/B/C 探索；后续以用户修改稿为准 |
| [03 内容与状态](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2255-28) | 9 个内容组合、8 个状态；不等于 9 个公共组件 |
| [04 原始 Master](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2255-29) | 20 个独立组件，不是一个已完备的交互状态集合 |
| [05 当前规格](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2280-618) | Label 15/22、Description 13/18 等观察值 |
| [06 状态补全](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2280-619) | Checkbox 8、Radio 8、Danger 5、Description 4，共 25 个候选 |
| [07 内容边界](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2280-620) | 3 个组合 Master；长标题、长说明、当前值及状态组合 |

仓库依据：[AGENTS](../../AGENTS.md)、[当前阶段](../../status/current-phase.yaml)、[Spike 的 Headless 实验](../../SPIKE_BRIEF.md#8-select--dialog-headless-决策实验)、[开放组合与 Local Recipe](../adr/0002-tailwind-b2-local-fork.md)、[Size/Density 职责](../adr/0003-size-and-density-responsibilities.md)、[Token Foundations](../adr/0004-token-foundations-v1.md)、[Classic 复用审计中的内部 Popup / Popover](../audits/2026-09-01-rain-classic-reuse-audit.md)。

`currentPhase` 保持 Token Foundations V1。规划开始时尚无菜单实施授权、Headless 选型 ADR 或运行时 Popup；第一批现已单独登记局部实验授权，并完成 [Base UI 决策](../adr/0005-headless-base.md)，公共组件实施仍独立。旧 Brief 的部分颜色、主题和 Focus 描述已经被专项决定更新；本稿使用当前公共 Category 和已确认的全局双层 Focus。

## 2. 本任务已确认的决定

| 决定 | 建设时必须保留的结果 |
| --- | --- |
| 高度改造是核心能力 | 允许融合不同功能、组件与样式；组件库提供组合方法和示例，不承诺穷举所有业务方案 |
| 默认完整 Recipe | 常规需求直接用完整方案，有明确需求时才拆开需要改变的部分 |
| 宽度建议（2026-09-09 确认） | 简短操作 / 常规内容 / 轻量组合的默认起点为 200 / 280 / 320px；建议区间及调整规则见[第 12 节](#12-宽度与体量建议)。业务允许超出，不能机械转为硬性限宽或全局尺寸 Token |
| 轻盈的内容结构（2026-09-09 确认） | 默认 Recipe 的样式、状态和交互规则完整，具体功能按任务组合；当前模板面板已按 360px 方案修订，保留搜索、分类、收藏、选择后创建及失败重试，视觉 Human Gate 待用户检查 |
| 已选项文字（2026-09-09 修订） | 所有已选项的主文字及解释文字进入主题色系；主文字加粗，解释小字保持原字重。不因头像、图标、纯文字、复选或单选等呈现方式漏用此规则 |
| 圆形已选勾标（2026-09-09 23:32 修订） | 根据用户截图，所有相同圆形确认标记统一缩小 2px：外圈 18 → 16px，内部勾号 12 → 10px，使用现有 Icon Size Token |
| 大字 + 小字层次（2026-09-09 修订） | 主文字允许加粗，解释小字保持常规字重；完整默认 Recipe 采用现有 600/400 字重组合，保留 15/22 与 13/18 字号行高 |
| 长操作名称 | 窄菜单默认最多两行，保留 15/22，条目随内容增高；关键对象及危险范围不能因裁切而无法识别 |
| 说明与不可用原因 | 普通说明最多两行；不可用原因和重要限制完整展示，并随内容增长 |
| 当前值与右侧信息 | 长当前值或状态移入说明区；短数量、快捷键、短 Meta 留在右侧，子菜单箭头最右；48px 仅是试验样本，不是全局 Meta 宽度 |
| 危险项 | 未选中时红色文字/图标，浅红 Hover、较强的 Pressed；若业务组合已选状态，文字优先遵循本次选中主题色规则，选中图标也遵循主题色；危险意图由明确文案、状态背景或独立危险提示保留。键盘 Focus 沿用全局品牌双层规则，不另用红色焦点框。具体危险色值及 Alpha 尚未确认 |
| 自动关闭 | 由业务配置；不根据 Action / Checkbox / Radio 身份写死。完整 Recipe 带明确策略，并允许按项调整；鼠标和键盘遵守同一策略 |

“自动关闭”指操作后的关闭策略；Escape、Tab、外部点击、进入子菜单和转交 Dialog 各有独立的退出与焦点规则，不能被一个选项一并关闭。

本次文字修订以用户提供的“王老师 / 工业设计系 · 教师账号”已选项截图为具体例子：名称使用主题色与 600，解释使用主题色与 400；其他已选项遵循同一规则。600 是在现有 Rain Token 内落实“加粗”的映射，不是新增基础字重。大字 + 小字组合未选中时也可采用 600/400 建立层次，选中时再切主题色；已是 600 的标题不继续叠加字重。

2026-09-09，用户以“确定。”确认上述选中主题色、主文字600/解释400，以及大字 + 小字默认600/400的规则。后续样本据此制作和检查；本次确认范围为文字设计规则，未推进公共实现或整体视觉 Gate。

## 3. 对外使用方式与首批范围提案

### 3.1 两类入口，共用底层能力

| 入口 | 默认职责 | 可改造部分 |
| --- | --- | --- |
| `DropdownMenu` | 操作、链接、复选、单选、子菜单，包含分组、分隔线、状态和键盘导航 | 内容呈现、图标/头像/缩略图、说明/Meta、分组布局、尺寸 Recipe、触发器、业务关闭策略 |
| `Popover` | 有明确名称的开放内容面板，负责相应的焦点进入、Tab 顺序与退出 | 搜索、筛选、分类切换、预览、卡片、独立按钮、固定操作区及其他业务内容的组合 |

这里的 Dropdown 是家族称呼，不额外导出一个包揽所有模式的万能 `Dropdown` 或 `Popup`。

当前 Figma 菜单稿是标准菜单默认 Recipe 的视觉来源，不是所有开放面板的固定布局模板；面板可以按任务改变宽度、分区、内容和密度，同时消费 Rain Token。

默认宽度及体量遵循[第 12 节的已确认建议](#12-宽度与体量建议)。完整 Recipe 不要求每个面板同时展示搜索、分类、预览和底部操作；面板与内容所需的语义、状态和交互仍须完整。

一个浮层只有一个打开状态来源，以及一套定位、外部交互、Escape、挂载和焦点回落处理。优先直接组合最终选定的 Headless 原语；`_InternalPopup` 保留私有机械身份，不在成熟底座外再套一份竞争的事件和焦点控制器，也不为一个调用强行造抽象。

公开 `children` 和有明确职责的 Parts 即可完成的重组，属于正常使用。标准 `MenuItem` 的整行仍是一个交互目标；行内有独立收藏、删除、输入等动作时，改用开放面板中的正常控件布局或适当集合语义，不能通过多塞一个按钮让它继续冒充单一菜单项。此限制只属于标准菜单条目，不限制整个下拉家族的组合能力。

Popover 仍服务当前位置的轻量任务。是否转向 Dialog、Sheet 或页面区域，按任务时长、保存事务和可用空间判断，不按控件数量机械判断；“高度改造”也不意味着需要把任何完整工作流缩进小浮层。

### 3.2 三种改造路径

1. **完整使用：** 选一份完整业务 Recipe，填数据、事件及关闭策略。
2. **局部组合：** 替换触发器、条目前导视觉、说明或面板区域；通过公开 Parts、`children` 和具名 Local Recipe 调整本功能。
3. **整体重组：** 用 Popover 组合现有组件；仅当确实改变共享组件内部结构或行为时使用 Local Fork，保留来源与作用域。

不增加 `withSearch / withTabs / withFavorite / templateMode / courseMode` 等业务组合大开关。局部需求不自动增加全局 Variant；也不要求每次正常组合都重新申请公共组件修改。Rain Token、可访问名称、必要键盘行为和焦点归属随组合一起保留。

### 3.3 标准菜单的内容职责

以下是 6 类内容职责，不要求导出 6 个任意插槽或建立另一套配置语言：

| 职责 | 内容与规则 |
| --- | --- |
| Indicator | 复选、单选、选中标记由真实状态驱动；组内需要时保留对齐列 |
| Leading visual | 图标、头像、状态点、色块、缩略图；默认不增加第二个交互目标 |
| Content | Label、紧邻 Label 的 Badge、Description；长内容规则见第 2 节 |
| Meta | 短当前值、数量、附加信息；不与 Label Badge 混为同一个右侧插槽 |
| Shortcut | 真实可用快捷键的提示；展示文字不自动注册全局快捷键 |
| Submenu indicator | 子菜单结构决定，使用线形右箭头；默认不与 Shortcut 抢最右位置 |

Action、Link、Checkbox、Radio、SubmenuTrigger 是行为类别，不是 5 个不同的 ARIA role。危险意图、Highlighted、Pressed、Checked、Open、Disabled、Pending 分开建模；Checked + Disabled 仍保留已选标记、主题色文字与主文字加粗，不用整行禁用灰覆盖这些事实；不可用通过禁止激活和状态说明表达。不要为每个组合建一份独立实现。

### 3.4 首批交付与示例

- 标准菜单：上述五类条目、分组/分隔线、说明、危险态、长内容、可配置关闭、完整键盘与焦点处理。
- 开放面板：Trigger / Content 及适合其语义的名称、说明、关闭入口；内容区可直接组合现有组件，不把 Header / Footer 固化为每个面板都要有的结构。
- 三个业务 Recipe：课程卡片“更多”、表格“视图设置”、新建学习单元。第三个同时提供“类型菜单 → 模板面板”组合示例，证明复杂内容可以重组。
- 一次实际改造验证：在原有示例中加入搜索、分类、缩略图、独立收藏和底部确认，检查能否主要通过组合与局部样式完成，而不修改公共 Master。

这些示例不是新增 3 个公共业务组件。不在本批同时建设完整 Tabs、GridList、模板库、远程请求框架、命令中心或所有 ContextMenu / Menubar / 移动端变体；有实际需要时按同一边界扩展。开放组合能力必须在首批被验证，不能以“以后做复杂版”为由留下封闭 API。

## 4. 状态、关闭与业务所有权提案

| 场景 | 组件/底座职责 | 业务职责 |
| --- | --- | --- |
| 操作后关闭 | 执行当前 Recipe/条目的策略，统一鼠标与键盘路径 | 决定立即关闭、保持打开或成功后关闭；策略 API 名称在 Headless 对照后收口 |
| 受控打开状态 | 提出打开/关闭请求并附可判别原因，不偷偷形成第二份真实状态 | 接受状态变化，执行保存、确认或导航 |
| 异步操作 | 展示传入的 Pending/失败反馈，防止该动作重复触发 | 持有请求、结果、错误和权限；组件不建通用命令/事务平台 |
| 子菜单 | 指向父项；Escape 先关闭当前层并回到相应父项 | 决定子项内容、权限和具体动作 |
| Tab / 外部点击 | 根据内容模式正确退出，让焦点跟随用户下一目标 | 提供需保护草稿的明确交互流程，不能依靠焦点抢回阻止离开 |
| 转入 Dialog | 避免旧浮层的自动回焦抢走新 Dialog 初始焦点 | 决定新任务以及其完成/取消后的回落位置 |
| Trigger 被移除 | 不聚焦不存在的节点，使用约定的可用回落目标 | 提供删除对象后合理的邻项或上级位置 |
| 不可用项与原因 | 禁止激活；菜单导航中的可达性由最终键盘合同确定；原因可见、可关联 | 提供准确原因与恢复动作；不能把关键原因一起淡化到无法读取 |

选中、活动高亮和键盘 Focus 必须可区分。Typeahead 仅服务菜单定位，不等于搜索框；开放面板中的中文输入不能被菜单键盘处理截获。搜索、空结果、加载失败是内容状态，不用一排伪造 Disabled 菜单项代替。

## 5. Figma → 当前 Rain Token 的映射与缺口

依据：[Typography](../../packages/foundations/src/typography-contract.ts)、[Space](../../packages/foundations/src/composition-contract.ts)、[Radius/Line/Shadow](../../packages/foundations/src/token-contract.ts)、[Color Registry](../../packages/foundations/src/color-registry.ts)、[Focus](../../packages/foundations/src/focus.css)。本表区分精确映射与候选，候选颜色没有获得本任务的视觉验收。

| Figma 观察 | 现有公共来源 / utility | 处理结论 |
| --- | --- | --- |
| 普通单行 Label 15/22、400；已选 Label / 大字 + 小字中的 Label 为 600 | `font-rain-ui text-rain-size-15 leading-rain-22 tracking-rain-default`，字重分别用 `font-rain-regular` / `font-rain-semibold` | 原子精确存在；按最新决定形成完整菜单排版 Recipe，不需新增基础字号或字重 |
| Description / 常规 Meta 13/18、400 | `text-rain-size-13 leading-rain-18 font-rain-regular` | 解释文字在选中时仍为 400，不能从加粗父级继承 600；`ui-supporting` 是 13/20，不能直接套用 |
| Figma 多数 Noto Sans SC | `font-rain-ui` 的正式 PingFang SC 及已登记回退 | 实现使用正式字体；由字体变化产生的换行差异需实测 |
| 原稿 Selected 字重 500 | 公共 UI 字重为 400/600；本次主文字加粗映射到 `font-rain-semibold` 600 | 500 不再作为待新增值；此前“Selected 保持 400 + 标记/颜色”的建议已被最新决定替代 |
| 横向12、gap10、文字间gap2、面板padding8/gap2 | `px-rain-12 gap-rain-10 gap-rain-2 p-rain-8` | 精确存在 |
| 行圆角6、面板圆角10、边框1 | `rounded-rain-6 rounded-rain-10 border-rain-line-1 border-solid` | 精确存在；边框颜色单独选择 |
| 竖向padding7/9、短项36/描述项60 | 没有 Space 7/9，也没有 Menu 高度合同 | 几何需一起收口，不能写不存在的 `py-rain-7/9`，不能借 Input 高度或同值 Space 冒充条目高度 |
| Label `#495D87` | `Text/Neutral/3` → `text-rain-category-text-neutral-3` | 精确；图标用独立 `Icon/Neutral/2` 身份 |
| Selected `#0F55DF` | 已选主文字用 `Text/Brand/1`，普通解释用浅一档 `Text/Brand/2`；图标与标记用 `Icon/Brand/1` | 分别声明文字/图标与 selected 用途；解释保留 400，层次由字号和字重表达，不再保留已选项的中性色解释 |
| 未选中 Description `#79869E` | 最新局部修订交互行说明用 `Text/Neutral/4`，重要限制仍用 `/3` | 均不等值；按真实交互文字登记，弱色用途问题保留待评审。层次保留 13/18、400；重要限制/禁用原因用 `/3` 并完整展示，选中后按主题色规则处理 |
| 未选中 Disabled `#B2BBCC` | 候选 `Text/Neutral/6`、`Icon/Neutral/5` | 均非原色；文字和图标分别映射，不能把整块原因一起减淡；已选 + Disabled 不用这组灰色覆盖已选文字 |
| 白色面板 | `Background/Neutral/1` → `bg-rain-category-background-neutral-1` | Light 精确，Dark 自动切换；不用 OnColor 充当背景 |
| 边框 `#E4E9F2` | 候选 `Border/Neutral/3` → `border-rain-category-border-neutral-3` | 为 Alpha 色，白底约 `#D9E0F3`，不等值；按实际边界用途评审 |
| 普通 Hover `#F0F4FF` / Pressed `#E5EDFF` | 候选 `Fill/Neutral/Alpha/6`、`/5`；需蓝色活动反馈时对照 `Fill/Brand/Alpha/4`、`/3` | 都不等值。只选一套经评审的默认映射，不永久保留两套含糊的普通状态 |
| 未选中 Danger `#C3444B` | 候选 `Text/Red/1`、`Icon/Red/1`，Light 为 `#CA2732` | 不等值；与已选状态组合时，文字优先使用 `Text/Brand/1`，选中图标同样切主题色，危险意图由文案、状态背景或独立提示保留 |
| Danger Hover6% / Pressed12% | 现成 `Fill/Red/Alpha/2` 10%、`/1` 18% 为候选 | 6/12 只是设计候选，不是用户已确认值。若保留须登记明确来源与 Alpha 操作，不能叠乘已有 Alpha |
| 低阴影 0/6/18、约8.5% | `shadow-rain-overlay` 实际为 0/12/32、12% | 明显不等值；先对照评审，不为贴图直接覆盖全局 overlay |
| Focus 内描边 / Danger 红描边 | `data-focus="item"`：品牌1px outline + 3px halo；Forced Colors 2px CanvasText、offset2、无shadow | 使用已确认的全局规则。单独适配底座的真实活动项焦点模型；`data-highlighted` 不能冒充键盘 Focus |

`Text/Neutral/4…6` 的用途资格不只取决于对比度。非 Disabled/Decorative 的弱色还需要满足 non-critical、non-interactive 等当前校验；不得为了通过检查把关键信息改名成装饰。Alpha 色必须在 Light、Dark 与嵌套主题的真实父面上核验。

几何关系为：短项 `22 + 7×2 = 36`，单行说明项 `22 + 18 + 2 + 9×2 = 60`。保留这套观察值时，应形成登记的菜单几何 Recipe/组件用途，而不是补一套散落的裸值；改用现有 Space 也会改变总高度，必须显式比较。长内容用增长规则，不能把 36/60 都写成固定高度。

220/282/340 宽度中的长标题样本分别为 58/58/36 高，324 宽的双行说明样本为 78 高；这些仅是源稿验算值，正式字体和 Token 映射后需要重新验证。面板宽度现按[第 12 节](#12-宽度与体量建议)提供已确认的使用建议，旧宽度样本继续作为来源对照，不自动升级为公共尺寸 Token。Meta 48px、组标题11/12、个别 Meta12/13、触发器实心/线形箭头仍是局部差异，不由本稿自动统一为公共档位。

## 6. 规划时的复用清单与未来文件落点

现有能力先用；以下路径是实施时的最小起点，允许因最终底座减少文件，不提前创建空架子。

| 现有文件 / 能力 | 菜单建设如何使用 |
| --- | --- |
| `packages/ui/src/button/`、`icon-button/`、`link/` | 触发器、普通操作与链接；按实际语义选用，菜单项不简单套普通 Button role |
| `packages/ui/src/input/`、FormItem | 开放面板的查询和字段；即时过滤用 Input，按钮/Enter 提交搜索才用 SearchInput；业务持有查询/保存，避免误继承外层字段校验。FormItem 不承担完整表单状态 |
| `packages/ui/src/tag/`、`badge/`、`card/`、`surface/` | 按真实信息用途组合；不以复用名义把所有条目包成卡片；并行建设中的能力先核验状态 |
| `packages/ui/src/icons/` | 使用已登记的图标，不重新描制箭头、复选标记或图标库 |
| `packages/ui/src/utils/rain-class-names.ts`、`recipes/local-recipe.ts` | 复用 `rainCn`、`defineRainLocalRecipe` 与 Parts 接入方式，不创建新样式配置平台 |
| `packages/foundations/src/` 与 `scripts/generate-token-foundations.mjs` | 复用公共 Token；确需增加的组件合同通过现有单源生成链输出 |

[Select 实施计划](2026-09-09-select-implementation.md)当前把候选区域留为 Select 私有的简单展开内容。未来统一浮层只替换机械承载：Select 的 value、query、selectedOptions、single/multiple、searchable、FormItem 和共享字段外观继续由 Select 拥有；选择器不改成操作菜单，关闭默认也按它自己的业务合同处理。本稿不启动或重写 Select、Dialog 的公共实现。

拟新增的主体：`packages/ui/src/dropdown-menu/dropdown-menu.tsx`、`dropdown-menu.styles.ts`、`dropdown-menu.test.tsx`，以及对应 `popover/` 下的同名主体、样式和测试。仅出现确实需要共用的适配逻辑时新增私有 `packages/ui/src/_internal/popup.tsx`。无需为每个内容组合、业务 Recipe 或状态组合各建组件文件。

真实说明页拟放在 `apps/playground/src/docs/components/dropdown-page.tsx`；业务示例先留在该页，CSS 仅在既有桥接不能表达且有登记理由时增加。浏览器测试拟为 `tests/e2e/dropdown.spec.ts`。公共出口、路由及来源登记在实现时分别接入 `packages/ui/src/index.ts`、`apps/playground/src/routes/route-registry.ts`、`apps/playground/src/app.tsx`、`manifests/ui/` 和 `registry/`，不在本轮占位。

## 7. 建设顺序与检查点

下列是后续工作顺序，不是本轮已执行项目。所有命令从仓库 `rain-classroom-vibe-ui-spike` 内运行。每次进入实施前重读当前状态和相关并行文件，保留其增量；当前无可用 HEAD，不通过提交制造工作基线。

### Task 1：先完成可对照的 Token 与视觉样本

**本稿内收口：** 以已明确的 600/400 与选中主题色为基线，核验实际字体、换行与层次；继续收口第 5 节的几何、状态背景、边框、阴影及未统一细节。

获得样本制作范围后，先按实际范围增量登记 `status/current-phase.yaml`、`scripts/verification-helpers.mjs`、`scripts/verify-boundaries.mjs` 及样本涉及的现有 Token/Tailwind 扫描；保存将修改文件的来源基线，不覆盖并行任务。只放行明确的样本入口、局部候选及其检查，不顺带放行公共 UI 或依赖。开始样本工作时先运行 `pnpm verify:boundaries` 和涉及的 `pnpm verify:tailwind-b2`，让范围错误在入口处暴露。

使用现有 Foundations/Token 展示机制建立原稿与候选映射的真实对照，至少包括普通短项、两行标题、说明、Disabled + 原因、Checked + Disabled/Hover/Focus、Danger + Pressed/Focus。加入用户截图所示的头像身份项及普通大字 + 小字组合，分别核对未选中/选中的 600/400、主题色和解释不加粗；实际加粗后的换行重新测量。增加一个两行仍放不下关键对象或危险范围的样本：候选处理为在视口内加宽面板，或在说明区完整补充范围；不能只加省略号。确认后将所选处理写入完整 Recipe，常规标题的两行默认保持不变。

先验证候选而不是直接修改全部 Figma Master 或公共基础值。若需要局部候选，沿用已有 `--rain-local-<feature>-<role>` 登记，待确认后再决定组件合同的最小新增。

通过条件：每个数值与用途有唯一来源；接受的差异有明确记录；没有未登记裸值、私有 Token 或借用其他控件专属高度。此检查点不选择 Headless，也不扩大为全库视觉验收。

### Task 2：完成 Headless 同条件对照与短 ADR

获得对应实验及依赖范围后，沿用 Spike 要求以相同 Select / Dialog 合同比较候选，额外验证菜单子级、混合内容、业务关闭策略和局部主题。最终只选择一套底座，不只凭 API 文档或静态图片决定。

实验开始前，同步该范围的阶段记录、`scripts/verification-helpers.mjs`、`scripts/verify-boundaries.mjs` 及实际涉及的来源/扫描入口，精确登记实验文件与 ADR 路径。按实验归属更新相应 `package.json` 和 `pnpm-lock.yaml`，不把候选依赖提前加入公共 UI；运行 `pnpm verify:lockfile`、`pnpm verify:boundaries` 及受影响的扫描后再进入实验。授权记录、实际依赖和质量门保持一致，不等到整批收口才处理冻结边界。

复用已有 `apps/playground/src/experiments/headless/` 实验目录，不进入 `packages/ui` 公共出口；行为小样不要求先完成 Select / Dialog 全家族。结果在一个新的 `docs/adr/` 文档记录候选、相同条件下的结果、选择、缺口及最小适配；编号在落盘时取下一个可用编号，避免与并行任务冲突。标准菜单的禁用项导航、Menu Focus 模型、Popover 模态性及关闭 API 在此收口。

通过条件：Select 和 Dialog 的核心键盘/焦点条件均满足；一个底座能承载 Menu 与开放面板，不需要两份互相抢夺的浮层控制。选型不等于授权立即迁移现有或正在建设的组件。

### Task 3：实现两个入口及共享视觉 Recipe

按第 6 节落点实现。先用一个行为测试证明关闭策略独立于条目类型：同一种动作在两份业务 Recipe 中可分别保持/关闭，Checkbox/Radio 也可显式覆盖；再补必要的受控状态、键盘导航、子菜单、禁用及焦点交接测试。

按已确认映射实现菜单 Parts 与面板表面。只为真实缺口新增菜单用途合同，复用生成器；不得手改 `tokens.css`、`tailwind-theme.css` 或另复制类名/颜色清单。输入、请求与业务保存继续由内容组件和调用方管理。

Run（文件创建后）：

```sh
pnpm exec vitest run packages/ui/src/dropdown-menu/dropdown-menu.test.tsx packages/ui/src/popover/popover.test.tsx --maxWorkers=2
pnpm typecheck
```

只有 Token 合同确有变化时运行 `pnpm generate:tokens`，随后运行 `pnpm verify:tokens` 与 `pnpm verify:tailwind-b2`。治理放行必须精确登记本批范围，不放宽全局校验，也不套用 Input/Tag 的旧授权。

### Task 4：三个 Recipe、真实改造与浏览器验证

说明页消费真实公共组件，覆盖第 3.4 节的三个业务任务；用新建学习单元面板验证复杂组合。搜索 Input、分类 Button、缩略图和收藏 Button 可以组成示例，不以此提前建设完整 Tabs、GridList 或模板公共家族。

改造验证应保存实际修改范围与一次前后对照：哪些公开区域被替换、用了哪些现有组件和 Token、是否触碰 Master、哪些行为检查受到影响。操作数据使用本地示例；失败后保留选择和查询。运行一次真实业务改造才可填写“组合能力已验证”，仅展示预先写好的复杂示例不够。

Run（路由和测试创建后）：

```sh
pnpm exec playwright test tests/e2e/dropdown.spec.ts
pnpm verify
```

完整质量门在批次收口运行一次；只复跑修复涉及的检查。其他并行任务的失败分别归属，不能修改无关组件制造全绿。

### Task 5：独立审阅与 Human Gate 材料

技术审阅检查 API 是否封闭、是否重复造浮层控制、是否误用 Token、正常组合是否被迫 Fork，以及菜单与混合内容的语义。浏览器证据呈现接受后的视觉和真实交互，并与原稿差异对应。审阅产生的修复仍属于本批实施范围；视觉确认、自动检查和独立审阅分开记录。

拟在 `evidence/runtime/dropdown/verification.md` 集中保存结果及精确截图索引，随后更新本批 Manifest/Registry 的实际状态。自动验证或独立审阅不能代替 Human Gate；本计划和未来本地实现均不自动授权 Figma 写入、发布、业务迁移或 Git 操作。

## 8. 验收矩阵

| 检查面 | 可判定结果 |
| --- | --- |
| 完整默认方案 | 三个业务任务有可直接使用的 Recipe，调用方不必从低层拼出普通菜单 |
| 高度改造 | 搜索、分类、缩略图、独立收藏、底部确认可加入同一个面板；通过公开组合完成，不增加业务大 Props、不复制整套控制器 |
| 标准条目 | 五类行为用正确语义；辅助内容与状态可组合；独立按钮不藏进单一菜单项 |
| 关闭策略 | 菜单默认与按项覆盖可验证；同项鼠标/键盘一致；成功后关闭、失败保留由业务演示证明 |
| 焦点 | 键盘打开、方向键、Home/End、确认、逐层 Escape、Tab/外部点击、Dialog 交接、Trigger 卸载均有合理目标 |
| 文字层次 | 所有已选项的主文字与解释使用主题色，主文字600、解释400；普通大字 + 小字 Recipe 为600/400；原本600的标题不继续加重；头像/图标/纯文字等呈现方式不漏用规则 |
| 状态 | Checked + Disabled/Hover/Focus、Danger + Pressed/Focus、Submenu Open、Pending、失败及无可用项可理解；叠加样式不覆盖已选标记、主题色文字及主文字加粗，危险语气保留且 Focus 仍为全局规则；在叠加后的真实背景上核验文字/图标可读性；无法重复触发 |
| 长内容 | 常规标题最多两行、普通说明最多两行、重要原因完整显示；长当前值下移；关键范围仍放不下时按已确认 Recipe 加宽或完整补充说明，不只截断；不挤掉箭头 |
| 真实几何 | 窄视口、长内容、滚动容器及屏幕边缘不裁切；一轴一处合理滚动；键盘 Focus 光环在首末条目可见 |
| 宽度与体量 | 从对应 Recipe 的建议宽度开始，业务扩展有具体内容收益；搜索、加载与错误状态不导致无必要的横向跳动；缩窄后内容仍能读清、必要操作可达、周围任务上下文可辨。不以超出建议区间判定失败 |
| 主题与样式 | Light、Dark、嵌套 Light、两类真实父面下 Token 用途正确；Portal 不丢失主题；Forced Colors 可辨；Reduced Motion 得到尊重 |
| 组合控件 | 中文输入不误触菜单快捷处理；面板各控件可正常 Tab；查询、草稿与保存归业务；未顺带改变 Select 字段合同 |
| 来源与隔离 | Rain Token 为唯一视觉来源；Local Recipe/Fork 有现成登记；局部修改不污染其他页面或 Global Master |
| 验证真实性 | 真实浏览器键鼠证据和合成事件分开；未做的读屏、真实 IME/触屏检查标记尚未验证，不由单元测试推定通过 |

## 9. 规划阶段记录与当前检查点

| 状态轴 | 本轮结果 |
| --- | --- |
| 来源阅读 / Figma 现场复核 | 已完成会话、两份交接文件、引用计划及 7 个画板的读取与核对 |
| 设计决定 | 第 2 节为用户已确认；第 12 节宽度指导与 360px 模板面板修订方案也已确认，局部页面已按后续“继续推进”完成修订及浏览器检查，修订后的 Human Gate 待用户检查。其余架构/API/映射及建设顺序按各自记录 |
| 建设文档 | 已整理本稿；本地引用、标题锚点、表格列数和代码围栏检查通过 |
| 公共实现 / 运行验证 | 规划阶段未启动、未运行；第一批局部实验现已实现并验证，详见第 10 节。公共组件仍未启动 |
| Headless / Token 缺口 | 规划阶段尚未收口；第一批已通过实测选择 Base UI。几何与颜色视觉取舍继续待用户检查 |
| 独立审阅 / Human Gate | 初稿经两位独立审阅者检查，范围登记、关键范围展示和叠加状态验收问题已补入；后续文字修订单独记录，不沿用初稿审阅推定通过。公共实现的独立审阅与整体视觉 Gate 尚未开展 |
| 资产与阶段 | 规划阶段未创建运行时资产；第一批已精确登记 Local Experiment。公共 Registry、项目阶段与既有 Gate 保持独立 |
| 发布 / 迁移 / Git / Figma 写入 | 本轮未执行，也未由继续规划获得授权 |

当前检查点为 **第一批局部样本的宽度与体量视觉检查、Token 对照**：运行页面已采用 360px 模板面板、15/22 标题、16px 横向留白、40px 缩略图和平铺列表；常规交互菜单采用 280px。选中主题色与 600/400 已落实。样本保留 7/9px 对 6/8px、36/60 对 34/58、普通/危险状态背景、边框及阴影差异，相关视觉取舍继续待检查。500 字重和“选中是否加粗”不再保留为未决问题。公共运行实现仍需对应实施范围后进入 Task 3。

## 10. 第一批执行记录

2026-09-09，用户明确指令“开始进入第一批”。本批执行 Task 1/2：视觉与 Token 对照样本、Base UI / Radix 同条件行为验证，以及有证据的底座决策。公开 DropdownMenu / Popover 与 Select / Dialog 实现不在本批。

实验复用 `apps/playground/src/experiments/headless/`，入口为 `/dropdown-review.html`。仅在 Playground 登记 Base UI 1.8.0，以及 Radix Dropdown Menu 2.1.24、Popover 1.1.23、Select 2.3.7、Dialog 1.1.23；两组适配文件共用同一视觉和任务内容，公共 UI 包不引入候选依赖。

样本使用已确认字体、选中主题色及 600/400；原稿 7/9px、观察色与低阴影仅作为具名局部对照来源，不能进入公共 Token。边界处加宽、补充关键范围及主题/状态叠加均需真实浏览器检查。

执行前边界与 Tailwind B2 检查通过；8 个计划修改文件的基线及日志位于 `evidence/runtime/dropdown-batch-one/`。本批实施、自动验证、独立审阅、Headless 决策和视觉 Human Gate 分别记录；视觉 Human Gate 当前为待用户检查。

第一批已交付 [本地样本页](http://127.0.0.1:5190/dropdown-review.html)、[局部 Manifest](../../apps/playground/src/experiments/headless/manifest.json)、[ADR 0005](../adr/0005-headless-base.md) 和[验证证据](../../evidence/runtime/dropdown-batch-one/verification.md)。后续新增的两份验证脚本修改也保存了修改前基线。

本批浏览器合同 27 项：25 项正常通过，Radix 子菜单 Escape 与非模态 Menu Tab 为 2 项明确的原生预期失败；Base UI 无合同缺口。已修复独立审阅中的异步模板选择、链接关闭差异及颜色消费登记问题。颜色仍有 12 项对比度和 4 项用途资格 finding，原稿观察色也不等于已验收；整体视觉 Human Gate 待用户检查。

类型检查和生产构建通过。本批范围检查通过，但当前共享工作区的完整验证仍受并行 Select / Field / Input 变更影响；具体失败及日志见验证证据，不把局部结果写成全库通过。Task 3–5 的公共组件、完整业务 Recipe、迁移、发布与 Figma 写入未由本批推进。

## 11. 13:17 视觉修订：说明层次与选中图标

用户通过两张截图明确要求“小字颜色浅一点”和“选中时 icon 也变成主题色系”。在第一批局部页内落实：普通说明 `Text/Neutral/4`，选中普通说明 `Text/Brand/2`；主文字保持选中 `Text/Brand/1` 与 600，说明保持 400。重要限制、禁用原因继续完整展示并使用较强文字色。前导图标和子菜单箭头选中时使用 `Icon/Brand/1`，取消选中恢复原色；选中危险项也遵循此规则。

该修订替代第 10 节之前的普通说明 `/3`、选中说明与主文字同色、选中危险图标保留红色的处理。交互文字按真实用途登记，颜色资格及对比度仍记录为待评审，不由本次外观调整推定接受例外。公共组件、其他视觉 Gate 与发布范围保持独立。最新验证见[修订记录](../../evidence/runtime/dropdown-batch-one/verification.md#1317-视觉修订)。

## 12. 宽度与体量建议

2026-09-09，用户要求先讨论下拉菜单的宽度建议，以减轻复杂 B 端页面中的体量和视觉负担，同时保留业务高度改造能力；在继续梳理后以“确定”确认本节规则和模板面板修订方案，随后以“继续推进”授权本例局部页面修订。修订及验证见第 12.4 节；方案确认与实施不等于修订后的视觉验收，也不推进公共组件、全局 Token 或已有颜色 Gate。

### 12.1 默认宽度与调整规则

下表是桌面端面板外宽，单位为 CSS px。默认值是 AI 选择完整 Recipe 时的起点，区间是设计建议；暂不升级为全局 Token 或新的公共组件尺寸体系。

| 内容用途 | 建议区间 | 默认起点 |
| --- | --- | --- |
| 简短操作：编辑、复制、删除 | 160–240px | 200px |
| 常规内容：图标、头像、双行说明、当前值 | 240–320px | 280px |
| 轻量组合：搜索、分类、缩略图、独立操作 | 320–360px | 320px；缩略图或较丰富内容可从 360px 开始 |

1. **按内容选择，允许业务扩展。** 可以使用 400px、440px 或更宽的面板，增加的空间应帮助辨认内容、看清预览或减少有害换行。不能把建议区间机械转换为硬性 `min-width` / `max-width`，也不能因超出区间就裁切内容；避免跟随宽工具栏或整个容器自动铺开。视口内的可用空间仍是实际布局约束。
2. **一次打开期间宽度尽量稳定。** 搜索结果减少、出现加载或错误状态时，避免无必要的横向伸缩；视口变化时仍允许必要的适配。
3. **宽度与排版、密度分开。** 条目保留 15/22、说明保留 13/18，字重沿用第 2 节的状态和内容规则；已有大字 + 小字组合及已选状态保留 600/400。不能靠缩字、减弱必要层次或裁切关键原因来达成较窄宽度，加宽也不自动放大字号、行高和留白。
4. **高度随内容增长。** 空间不足时优先让列表区域滚动，保证必要操作可达；重要限制、不可用原因及关键对象完整展示，不先规定新的固定总高度。
5. **任务决定浮层形态。** 持续编辑、多步骤配置、大量阅读与比较应评估 Dialog、Sheet 或页面区域；宽度是判断信号之一，不以某个宽度或控件数量机械切换。

### 12.2 当前模板面板的 360px 修订方案

研究时已在实际浏览器读到修订前面板为 440 × 495px：模板卡片高 74px、顶部区高 80px、底部区高 69px。该读数仅对应当时内容、主题和视口，不是新的固定高度合同。

| 部分 | 已确认的修订方向 |
| --- | --- |
| 面板宽度 | 以 360px 作为本例候选，结合可用视口适配 |
| 面板标题 | 从 18px 改为 15/22，保留清晰名称；不改变条目既有排版规则 |
| 左右留白 | 从 20px 收到 16px |
| 模板呈现 | 改为平铺列表，减少逐项常驻边框，保留悬停、选中与键盘焦点反馈 |
| 缩略图 | 先比较 40px，检查内容仍能辨认；不能因目标宽度而强制牺牲必要预览 |
| 底部操作区 | 收紧留白，保留创建按钮和必要状态提示；具体高度由实际排版决定 |
| 功能与流程 | 保留搜索、分类、收藏、选择后创建，以及失败后保留选择和查询并重试 |

模板列表继续使用开放 Popover 组合。收藏和选择是独立操作，保留各自的语义与键盘路径，不因外观变为平铺列表就将收藏塞进单一 MenuItem。“选择后创建”仅定义这份业务 Recipe，不成为家族统一关闭策略。

完整默认 Recipe 包含完整的样式、状态和交互规则；具体组合哪些功能由业务任务决定。常见任务示例应体现合理体量，更复杂的组合另有示例，同时保留第 3.4 节的完整改造验证。

后续视觉比较检查：内容是否读清、周围页面的任务上下文是否仍可辨认、各项操作是否同样容易完成。总高度、缩略图辨认度和组合后的视觉效果均需实际排版验证，未由本次确认推定通过。

### 12.3 研究依据与适用边界

- [Fluent 2 Menu](https://fluent2.microsoft.design/components/web/react/core/menu/usage)：操作菜单给出 300px 最大宽度，并建议保持标签简短。该库的上限不直接成为 Rain 的硬限制。
- [GitHub Primer Overlay](https://primer.style/product/components/overlay/#props)：通用浮层默认按内容自适应，并提供 256 / 320 / 480px 等可选档位；涵盖菜单与弹窗，不代表所有 GitHub 菜单采用同一默认宽度。
- [GitLab Pajamas Popover](https://design.gitlab.com/components/popover/#appearance)：补充信息浮层默认 280px，允许按内容调整，建议避免铺满容器；其语义不覆盖全部复杂选择面板。
- [GitLab Pajamas Combobox](https://design.gitlab.com/components/dropdown-combobox/#size)：支持内容驱动宽度；与大字段触发器等宽适用于特定表单场景，筛选、排序等次要控件应慎用该方式。
- [Radix Themes Popover](https://www.radix-ui.com/themes/docs/components/popover)：富内容示例使用 360px；API 默认最大宽度为 480px 且可覆盖。示例宽度与组件最大默认值承担不同职责。

这些资料支持紧凑默认、内容适配和可扩展的使用方式；第 12.1 节的具体数值是本任务已确认的 Rain 使用建议，不是外部库的统一行业标准。

### 12.4 局部实现与验证记录

已在两个候选底座共用的局部样式中落实第 12.2 节。三项模板完整展示时，Base UI 面板实测由 440 × 495px 收到 360 × 409px；顶部区 80 → 68px、条目 74 → 60px、底部区 69 → 61px。高度随内容与可用空间适配，不登记为固定总高度。40px 缩略图中的曲线和折线仍可辨认；正式业务若需要更多预览细节，仍按第 12.1 节评估内容收益。

搜索框通过已有 Input 的 `className` 占满内容宽度；未选模板取消常驻边框，悬停使用既有中性填充，选中边框与主题色、独立收藏、键盘 Focus 均保留。菜单默认宽度为 280px，220/282/340px 原稿边界样本继续保留。共享 Dialog 的 560px 宽度与 18/26 标题未被面板样式覆盖。

本批 5 项登记检查通过；28 项浏览器合同符合预期，其中 26 项正常通过、2 项仍为已记录的 Radix 原生预期失败。已检查浅/深色、搜索空结果、失败保留与重试，以及 360px 和 320px 窄视口下的滚动、末项焦点和底部操作。构建、Token、边界与 Tailwind 检查通过；全工作区类型检查报告一处 Checkbox 治理测试类型错误，单独记录且未改动该家族。详见[宽度与体量修订证据](../../evidence/runtime/dropdown-batch-one/verification.md#宽度与体量修订)。

## 13. 2026-09-10 公共初版与真实组合接续

用户读取 HANDOFF 后继续建设的指令已执行，精确范围为 `componentRefinements.dropdownFamily`。Task 3 的公共 DropdownMenu / Popover 已有实现、公共出口、候选 Manifest 和未发布 Registry；Task 4 的三个业务 Recipe 已可运行，真实模板改造的前后源码、公开接口和修改边界见 [composition.md](../../evidence/runtime/dropdown/composition.md)。此前章节的“公共尚未开始”仅记录各自历史批次。

公共实现保留已确认的排版、主题选中层次和 16/10 确认标记。表面、6/8px 留白与 34/58px 典型行高是公共 Token 映射候选；Human Gate 未通过。新开放面板和旧实验的关闭策略设置已按正确语义复用公共 Checkbox/Radio，菜单选择行继续由 Menu 原语持有单一交互目标。

Task 5 已完成独立技术复核及其发现修复，未留下可复现 P1/P2。公共组件与治理小集 22/22、全库单元 1212/1212、公共 Chromium 9/9 通过；首轮全量检查、修复和浏览器复测的精确口径见 [验证记录](../../evidence/runtime/dropdown/verification.md)。受影响浏览器复测共 41 项：39 正常通过、2 项旧 Radix 预期失败，0 意外失败/跳过/重试。全工作区类型、构建及治理检查通过，未宣称首轮 `pnpm verify` 整条一次通过。

公共颜色登记 38 项无错误，仍有 19 项对比度和 30 项用途资格 finding；完整实测及 4.5/3.0 门槛已保留，全部未接受例外。整体阶段保持 `in-progress / findings / awaiting_human / not-granted`，自动检查单独为 passed。下一步为本批视觉审阅和颜色方案决定，以及需要时补真实辅助技术/设备证据。既有家族迁移、Figma 写入、发布、业务接入及 Git 未执行。

本修订未开展新的独立审阅；Human Gate 待用户检查。既有 22 项对比度与 22 项用途资格 finding 保持待评审，不接受颜色例外，不变更公共组件或发布状态。

## 14. 2026-09-10 菜单选择标记复用

用户指令：“需要统一复用视觉”。System Mode；将公共菜单私有标记改为复用 Checkbox / Radio 的被动视觉层和同一套 CSS 状态规则。Checkbox 16/10、Radio 18/6，画布均为 24；原生输入、卡片组合、菜单的选择与键盘行为继续由各自现有实现管理。内部视觉函数不进入公共入口。仅在现有两个控件源文件抽出绘制层；菜单把 Base UI checked/disabled/highlighted 状态接入该绘制层。

验证：先建立失败检查，再核对原生控件与菜单的图形结构、Light/Dark 默认/选中/禁用/悬停/按下/强制色，以及原生表单、SelectionCard 和菜单行为回归。菜单实际背景上的对比度另行保留测量；不把已有 Checkbox/Radio 验收扩展为菜单验收。Human Gate、颜色接受、发布和 Git 均维持原边界。

第 14 节实施结果：共享被动绘制与状态 CSS 已完成，删除菜单私有 14/12 标记；UI 出口未扩展。全库 1214 单元、39 项相关 Chromium、独立技术复核通过。普通菜单实际背景 24 组必要图形测量最低 3.714:1；公共自有色彩仍 9/26 项 finding，Human Gate 未关闭。具体数据和复现见 [selection-visual-reuse.md](../../evidence/runtime/dropdown/selection-visual-reuse.md)。
