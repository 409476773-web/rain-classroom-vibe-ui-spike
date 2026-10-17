# 首批组件 Token 接入与 Size / Density 完整方案

日期：2026-09-05；Button / TextButton 最新配方视觉验收更新：2026-09-08。工作模式：System Mode。

状态：Button / TextButton Token 配方与对照页已实现。用户最终指定危险 Primary 默认使用既有 `Fill/Red/Solid/2`、悬停加深、前景反白，并明确接受该文字对比度；不新增颜色 Token。红底反白修订已通过完整回归，证据见 12.6。最新授权已将 Border/Brand/1 细环与 Fill/Brand/Alpha/3 浅外圈推广到全局共享 Tab 焦点，覆盖 Input、Tag 移除操作和 Link，实施与验证见 12.8；最新配方 Human Gate 已于 2026-09-08 确认为 `accepted`，见 12.9。Input 的其他颜色状态、尺寸与行为，以及查询区新增接入仍为候选。

2026-09-06 按钮专项补充：用户要求普通按钮和文字按钮使用新 Tailwind Token，并补充“按钮高度、边距、间距也一起梳理”，随后明确要求继续推进。本批据此实施九组按钮外观的 Token 迁移，保留八档完整尺寸、现有 API 与 Density 默认；未启动本文其他 Input / 查询区行为改造，也未修改公共高度表。

## 1. 不再重新讨论的决定

- 2026-09-06 用户明确要求现有组件完整消费现有 Rain Token，先要求继续整理，后续单独授权推进 Button / TextButton。本稿保留 **Input、Button、TextButton 及查询区完整消费现有 Rain Token** 的总目标；按钮按本批授权实施。2026-09-07 用户进一步授权全局 Tab 焦点统一，Input 等现有焦点入口随共享规则接入；Input 其他状态、尺寸与行为及查询区继续保留候选边界。旧外观只作迁移前快照，不继续维护第二套组件色。
- Light / Dark 颜色 Token 的视觉确认已记录于[颜色验证记录](../../evidence/runtime/color-dark-theme/verification.md)。本稿继续确定具体部位、状态及父表面的搭配；不重开整套色值、圆角或字号刻度设计。
- [ADR 0003](../adr/0003-size-and-density-responsibilities.md)：Size 选择完整尺寸方案；Density 选择区域默认组件方案及间距；显式 Size 优先，不二次缩放；布局负责对齐、换行与区域关系。
- 最新来源纠正：高度、公共高度和间距以 Classic 已建设完成组件的设计确认、契约与实际 Parts 为主要依据。Next 现值只用于差异检查；同名 Size 不保证等高，同高不保证同方案。
- 早先 `28/32/36/40/48` 公共高度表建议已撤回；`Compact32/Default36` 是历史候选，不能自动成为本方案默认。
- [Classic 完整审计](../audits/2026-09-05-classic-size-spacing-recipes-audit.md)已经覆盖 44 项生命周期、8 个公开衍生及布局组合，不重复启动全库调查。所引数值是源码/契约事实；审计没有重做浏览器和 Figma 验收。
- 已确认的 [字号、行高、圆角、Space](2026-09-05-typography-and-layout-token-design.md)保持其公共身份。组件专属补偿值不为匹配公共表而取整，Density 不改变 `Space/16` 等固定数值。

## 2. 第一组单行控件完整候选

第一组围绕 Input、普通 Button、TextButton 和已有搜索操作区。下表保留来源候选；按钮本批实际采用的八档完整方案见第 12.3 节，不由本表覆盖 Next 已确认差异。数值单位 px；内边距为左右各值，前/后图标指宿主盒，不是矢量图形的实际边界。

| 对象与候选方案 | 高度 / 最小宽 | 左右内距 / 图文间距 | 排版 | 圆角 / 实体边框 | 图标盒与点击区 | 来源资格 |
| --- | --- | --- | --- | --- | --- | --- |
| Input Small | 固定 28；宽度仍由组件与父布局合同管理 | 16 / 内部 gap 8 | 14/22；字重按宿主核对 | 6 / 1 | 普通图标 16；Clear 点击盒 24、图形 14；清除与反馈为独立 Parts | Classic Input family 已确认 |
| Input Medium | 固定 32；Classic 默认 | 同上 | 同上 | 同上 | 同上 | 同上 |
| Input Large | 固定 36 | 同上 | 同上 | 同上 | 同上 | 同上 |
| Button Mini | 固定 28 / 最小宽 64 | 12 / gap 4 | 13/18/600 | 6 / 1 | 前及 Loading 14；后 10；点击区为根按钮 | Classic 整体验收仍候选；与 Next 的保留资格分开 |
| Button Small | 固定 32 / 最小宽 64 | 20 / gap 4 | 14/22/600 | 6 / 1 | 前及 Loading 16；后 12 | 同上 |
| Button Medium | 固定 36 / 最小宽 64；Classic 默认 | 20 / gap 4 | 14/22/600 | 6 / 1 | 前及 Loading 16；后 12 | 同上 |
| Button XL | 固定 48 / 最小宽 160 | 28 / gap 6 | 16/24/600 | 8 / 1 | 前及 Loading 22；后 16 | 同上 |
| TextButton Small | 固定 20 / 无组件级最小宽 | 6、上下各 3 / 前图标到文字 2 | 12/14/400 | 6 / 0 | 前及 Loading 14；后槽 11×12，子图形 12 | Classic 已确认；Next 有独立建设决定 |
| TextButton Compact | 固定 24 / 无组件级最小宽 | 6、上下各 3 / 前图标到文字 4 | 13/18/400 | 6 / 0 | 前及 Loading 16；后槽 9×12，子图形 12 | 同上 |
| TextButton Regular | 固定 26 / 无组件级最小宽；Classic 默认 | 6、上下各 3 / 前图标到文字 4 | 14/20/400 | 6 / 0 | 前及 Loading 16；后槽 11×12，子图形 12 | 同上 |

来源：[审计 2.A Button/TextButton 与 2.B Input](../audits/2026-09-05-classic-size-spacing-recipes-audit.md)、[TextButton 独立设计](2026-09-03-text-button-design.md)。本表不决定颜色、Clear 出现时机或 Loading 反馈；它们必须与目标组件的状态方案一起收口。

配套要求：

1. Input 的 28/32/36 是契约及既有 Demo 的 border-box 环境口径。Next 目标需要显式保证外框包含边框；不能把源组件的隐式 reset 依赖带过来。Input 当前没有公开 Size 入口，具体 API 留给组件批次决定。
2. Input 的 16/16 留白不能替换 SearchInput 或 InputNumber 的非对称布局。若后续扩展这两个组件，直接读取审计对应完整方案，而不是套本表 Input 内距。
3. Button 的透明边框仍占位；不因某状态看不到边框就删除 1px。本批经实际运行核对后，将普通按钮已有的纵向 padding 0 显式化；这一结果来自 Next 配方验证，不是从本来源表反推。
4. Next 的 Button Large40 按 [Spike Brief](../../SPIKE_BRIEF.md) 第 4.3 节保留。后续确定它在新完整配方中的归属与公共高度共享范围，不重新裁决是否保留，也不据此把 40 注册为通用控件高度。（2026-09-06 按上位合同纠正原待裁决口径。）
5. TextButton 的后槽与图形尺寸、Loading 与业务图标间距不能混成一张数值表；后续以 Next 专项设计与真实状态验证确定目标，不由 Classic 差异自动覆盖已确认新决定。

## 3. 第一组区域映射：先验证查询操作区

优先准备两个具名局部方案。它们只用于首批查询操作区的设计对照；本表尚不是全局 Density 注册表。

| 局部方案 | Input | 普通 Button | TextButton | 控件/动作间距 | 字段网格间距 | 查询到结果 | 状态与依据 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Query / Standard | Medium32 | Small32 | Regular26 | 8 | 12 | 20 | 优先来源候选：Classic QueryTable 已有实际对应组合 |
| Query / Compact | Small28 | Mini28 | Compact24 | 8 | 12 | 20 | 新组合候选：复用已有完整组件方案，先只比较控件尺度；周围节奏保持来源值，未做视觉验证 |

来源：[Classic QueryTable 的控件、动作和布局组合](../audits/2026-09-05-classic-size-spacing-recipes-audit.md)。推荐先把 Standard 作为该局部区域 `default` 的候选，把 Compact 作为该区域 `compact` 的候选；是否采用，取决于实际操作、长文案、图标、点击目标和视觉对照。这个推荐不自动推广到所有表单、导航、列表或工作台。

- 不先把紧凑区所有 gap 一起缩小。Density 可以选择完整默认及间距，但并不要求每个字段都必须变化；目前没有依据把 8/12/20 统一改成一套更小值。
- 同一区域的显式 Size 仍优先。例如显式 Medium36 的按钮保持其完整方案，区域 gap 不被取消；父布局决定中心对齐、换行或是否应另列。
- TextButton 保留 26/24 的自身几何。对齐的对象是交互组合及视觉基线，不是强迫每个根节点同高。
- 首轮不把 Select 纳入通过条件。它已有来源实现，但尾部 24×24 设计与当前源码存在冲突，采用前先裁决。也不把 Card、FormItem、页面分区高度写入此固定控件高度表。

## 4. IconButton：保留已有专项确认

已读取任务「梳理 IconButton 组件方案」（`01a06c9a-726e-7011-812a-13bf202dd19e`）的最终确认轮 `01a06cd3-a2c0-75c2-829c-a042706797c1`。用户回复“确认”后，真实 Rain 图标矩阵中的以下两组已升级为 **IconButton 组件尺寸设计基线**：

| 区域 Density | 点击盒 | 图标宿主盒 | 当前资格 |
| --- | --- | --- | --- |
| Compact | 32×32 | 18×18 | 专项尺寸已确认 |
| Default | 36×36 | 20×20 | 专项尺寸已确认 |

来源：[真实图标光学尺寸矩阵](/Users/wenchengkai/.codex/visualizations/2026/09/04/01a06c9a-726e-7011-812a-13bf202dd19e/rain-iconbutton-optical-matrix.png)。矩阵覆盖 discover、more-horizontal、arrow-down、edit-pencil-filled；本轮未重新进行视觉验收。

- 已确认独立 IconButton、两档密度、不继承 Classic 的 17 组公开尺寸枚举。首版按组件内部映射处理；不因图形差异追加公共 `iconSize` / `opticalSize` 入口。
- 这是组件专项确认，不是从 Next 当前实现推导的公共高度表。后续“尺寸来源以 Classic 为主”不自动撤销这项独立确认，也不能由此再反推全局 `Compact32/Default36`。
- 透明默认、Hover/Active 填充、不继承公共 feedback/selected 等完整反馈方向，在该任务最后仍是待确认建议，不能与尺寸确认合并成“完整组件方案已批准”。
- IconButton 未包含在本次高度运行改造中。未来加入查询区时，它与 Input 的根点击框可以不同；先验证视觉中心、命中区域、焦点及相邻间距。不得为了追求所有根节点等高直接覆盖 32/18 或 36/20。

## 5. 进入运行实施前的具体裁决

| 裁决对象 | 已有依据 | 还需要的结果 | 是否阻塞基础 Token |
| --- | --- | --- | --- |
| Query Standard/Compact | 上文完整候选与实际 Classic 组合 | 真实两组对照与该区域 Density 默认映射 | 否；阻塞该区域尺寸改造 |
| Button Large40 | Spike Brief 已明确保留，Classic 普通 Button 没有此档；本批已保留并实测 | 继续保持 Button 专属完整方案；公共高度共享范围仍未扩展 | 否 |
| Input Size 与 Clear | Classic 三档与完整内部关系、Next Clear 专项决定 | Next API 入口、Clear 颜色/出现时机/状态及宽度变化一起收口 | 否；阻塞对应 Input 改造 |
| 公共高度身份与共享范围 | 28/32/36 等在已论证的单行用途复用 | 从采用后的 Recipe 提炼所需子集；最终命名和用途限制 | 否；不需要先求全库高度并集 |
| IconButton | 独立组件与 32/18、36/20 已确认 | 反馈/状态、圆角与 Focus 完整方案及组件实施范围 | 否；不重新询问已确认尺寸 |

## 6. 最小验证与阶段边界

未来首批尺寸改造应同时检查：固定外框与 border-box；长文案和混排；图标/Loading/清除槽位；有值、空值、Hover、Focus、Disabled、Error 等真实状态；显式 Size 优先；区域默认继承；局部调整隔离；缩放及用户文字间距覆盖；点击区域和同排换行。几何差异以实际运行结果记录，不只比较 CSS 中的 height 数字。

涉及有自动高度或虚拟滚动的后续组件，样式与行为必须消费同一有效几何。TextArea、Tree、PaneGroup 等已知依赖仍按 [Classic 审计](../audits/2026-09-05-classic-size-spacing-recipes-audit.md) 路由，不在第一组单行控件中夹带修复。

Typography、Radius/Space、Line 与颜色基础已有第 0/1 批及后续颜色增量的实现记录；未完成的视觉项目可在首批组件组合中并行检查。本批按钮接入和验证见第 12.6 节，全局 Focus 接入见第 12.8 节；Input 其余配方与查询区仍按 [建设总览](../audits/2026-09-05-token-construction-readiness.md) 第 2 批独立推进。实施、自动验证、独立审阅、Human Gate 与发布分别登记。

## 7. 接入目标与现有入口

### 7.1 首批范围

以下是总目标范围；完整组件配方本批实施 Button / TextButton，并按后续授权统一现有全局 Tab 焦点。Input 其他状态、尺寸与行为及查询区仍是后续候选。

- Input：现有单行编辑、前后附加位、一个尾部操作、Clear、Count，以及 default / warning / error、disabled / read-only；不扩展成 SearchInput、InputNumber 或 TextArea。
- Button：现有 primary / secondary / tertiary × default / danger，五档 Size，以及 Loading / Disabled / Focus。
- TextButton：继续使用 Button 的 text 变体，覆盖 default / brand / danger、三档 Size 与已有加载能力。真实跳转仍由既有 Link recipe 负责，不另建同义组件。
- 查询区：Input + 查询主按钮 + 重置文字按钮的最小组合，对比第 3 节两组方案。其他动作、输入框内文字操作作为已有能力的组合检查，不以建设 Table 或 Select 为前提。

### 7.2 引用规则与当前差异

**已有完整组件方案优先；组件别名可以保留，已有公共基础能覆盖的值必须引用公共 Token。** 颜色身份、字号、行高、Space 的数字各有用途，不因数字相同就互相替代。合法组件专属几何继续由现有组件 Token 表达，不为“全部公共化”新增高度大全或把 3px 补偿取整。

| 对象 | 当前可复用入口 | 本批接入工作 |
| --- | --- | --- |
| 颜色 | [color-registry.ts](../../packages/foundations/src/color-registry.ts) 的 105 个双主题 Category 身份、既有验证和生成输出 | Foundations 的兼容语义色与 Button 的九组配方已接入同源；按钮按 Part / State 和两个真实父底登记、验证。全局 Focus 已接入 Border/Brand/1 与 Fill/Brand/Alpha/3；Input 其他颜色状态的新增配方仍待实施 |
| 排版 | [typography-contract.ts](../../packages/foundations/src/typography-contract.ts) 的完整预设及字号、行高、字距 | Input 优先使用完整 UI 预设；Button / TextButton 的专属完整排版引用已有基础，保留其字重和行高关系 |
| 圆角、实体线 | [token-contract.ts](../../packages/foundations/src/token-contract.ts) 的 Radius 与 Line | 已引用的圆角直接复用；实体 1px 边框引用 Line/Thickness/1。Focus 仍由完整 Focus 合同管理 |
| 内外间距 | [composition-contract.ts](../../packages/foundations/src/composition-contract.ts) 的 Space | 组件管理内部 padding / gap；查询区管理控件间距、字段网格及结果间距 |
| Button / TextButton Size | [tokens.css](../../packages/foundations/src/tokens.css) 与 [button.styles.ts](../../packages/ui/src/button/button.styles.ts) 的完整尺寸入口 | 复用现有五档普通按钮、三档文字按钮；将可复用字号、行高等别名接向已有基础 |
| Input Size | [Input](../../packages/ui/src/input/input.tsx) 当前只有 Density，没有公开 Size；[density.tsx](../../packages/foundations/src/density.tsx) 当前为 30/36px | 将第 9 节候选接入组件尺寸选择；不是重新设计公共刻度，也不能宣称 28/32px 已在当前 Input 生效 |

落实顺序为：已有基础 Token → 必要的组件语义别名 / 完整方案 → 现有 Tailwind 映射 → 组件及查询区。公共生成输出仍按现有单源流程产生，不手改生成段；不为此次接入建立第二套桥接。受控 CSS 例外继续引用同一 Token 源，保留必要的输入框父级焦点、加载动效和强制颜色模式适配。

## 8. 首批组件颜色接入：Input 候选与按钮本批记录

### 8.1 表的读法与实际表面

下表使用现有 Category ID；具体 Tailwind 输出由既有生成器提供。例如 `Text/Neutral/1` 对应 `text-rain-category-text-neutral-1`。同一个 ID 按实际主题解析，只有组合需要时才在组件方案内分别选择 Light / Dark 的 ID。

- 查询区首个比较面为 `Background/Neutral/1`，补充比较面为 `Background/Neutral/3`；两者均检查 Light / Dark。这是明确的首轮测试范围，不代表对任何页面背景都适用。
- 透明态使用已有 `action-ghost` 语义；透明不是新增色号。Alpha 填充必须记录实际不透明父底；嵌入 Input 后改用 Input 的真实表面计算，不能沿用查询区裸底结果。
- `Text`、`Icon`、`Border`、`Fill` 分别按用途选；图标通过宿主的图标颜色继承 `currentColor`，不直接让有意义图标绕过 Icon 资格。Token 的 `/1 /2 /3` 不等于默认 / 悬停 / 按下。
- 普通 TextButton 与 brand TextButton 的悬停、按下均保持已确认的浅灰蓝底；danger 使用浅红底。文字及图标在这三个状态中可保持同一颜色，不强制每个状态换色阶。
- 第 8.2 节除已接入的全局 Focus 外仍是 Input 候选；第 8.3 节是按钮已实现配方，第 8.4 节按组件范围记录缺口状态。数值筛查、声明资格、真实 DOM 验证及视觉验收分别判断。

### 8.2 Input 的部位与状态

| 部位 / 状态 | 目标 Token 或处理 | 需要一起检查 |
| --- | --- | --- |
| 输入值 | `Text/Neutral/1` | 空值、有值、混排、只读及状态变化后保持可读 |
| 标签、附加说明、正常 Count | 标签 `Text/Neutral/2`；附加说明与 Count `Text/Neutral/3` | 标签仍由宿主关联，不能靠 placeholder 代替 |
| Placeholder | 首轮用 `Text/Neutral/3`；更弱层级只作另列视觉候选 | 文案完整、能读懂；不按旧色的近似值自动迁移 |
| 普通附加图标 | `Icon/Neutral/2` | 与正文层级协调；纯装饰图标与必要操作分开声明 |
| Clear 图标 | 默认 `Icon/Neutral/3`；悬停 `/2`；按下 `/1` | 使用已确认 circle-close-filled；颜色针对实际 Input 表面检查，不新增可见“清除”文字 |
| 默认 / Hover 外框 | Neutral 表面与 `Border/Neutral/2` → `/1` 为视觉候选 | 必要控件边界存在 G3 缺口；不能将弱边框直接标为通过 |
| Focus | 已接入全局 Border/Brand/1 贴边细环与 Fill/Brand/Alpha/3 浅外圈；输入本体通过父框 `:has` 显示，Clear 使用共享 control 入口，见 12.8 | 鼠标输入激活与键盘 Focus 分开检查；保留 warning/error 状态色及既有 Clear 行为，不代表其他 Input 配方已迁移 |
| Warning | 值仍为 `Text/Neutral/1`；提示/反馈候选 `Text/Orange/1`、`Icon/Orange/1`、`Border/Orange/1`、`Fill/Orange/Solid/3` | 提示文字可读性见 G4；状态说明由宿主提供，不仅靠变橙 |
| Error / 计数超限 | 值仍为 `Text/Neutral/1`；提示/反馈候选 `Text/Red/1`、`Icon/Red/1`、`Border/Red/1`、`Fill/Red/Solid/3` | 红色表面及提示的实际搭配、错误与 Focus 同时存在；见 G3/G4 |
| Disabled | 前景候选 `Text/Neutral/6`、`Icon/Neutral/5`；填充候选 `Fill/Neutral/Solid/5`；边框 `Border/Neutral/3` | 真正 disabled 才消费弱前景；无 Hover / Pressed / Clear 操作反馈 |
| Read-only | 保持可读前景；表面候选 `Fill/Neutral/Solid/6`；无 Clear | 仍可聚焦、选择和复制，不套用 disabled 前景 |

Input 默认表面先比较 `Fill/Neutral/Solid/7` 与 `/6`；最终从二者中选择与查询区关系清楚的一组，并检查 Dark 实际明暗。默认/悬停边框、激活表面、错误表面是同一完整方案的关联项，不能只挑一个浅边框便关闭 G3。

### 8.3 Button 与 TextButton 状态映射

以下为本批九组默认 / Hover / Pressed 配方，事实源为 [button-token-contract.ts](../../packages/foundations/src/button-token-contract.ts)，由既有生成器输出组件别名，再由 [CVA 配方](../../packages/ui/src/button/button.styles.ts) 消费。普通按钮保留三个强调层级 API 和 danger 意图，危险 Primary 采用用户最终指定的红底反白。填充与边界各自使用对应角色，透明 1px 边框继续占位。Disabled / Loading 按下表最新决定实现，双图标的右侧前景另见 12.7。

| 对象 | 默认前景 / 填充 / 边框 | Hover / Pressed 实际配方 |
| --- | --- | --- |
| Primary / default | 文字与图标 `OnColor/1`；填充 `Fill/Brand/Solid/2`；透明边框 | Hover 与 Pressed 均用 `Fill/Brand/Alpha/1`；Pressed 边框用 `Border/Brand/1` |
| Secondary / default | 文字 `Text/Brand/1`、图标 `Icon/Brand/1`；填充 `Fill/Brand/Solid/4`；边框 `Border/Brand/2` | Hover 与 Pressed 均用 `Fill/Brand/Alpha/3`；Pressed 边框加强至 `Border/Brand/1` |
| Tertiary / default | 文字 `Text/Neutral/3`、图标 `Icon/Neutral/2`；透明底；边框 `Border/Neutral/3` | `Fill/Neutral/Alpha/4` → `/3`；边框保持默认 |
| Primary / danger | 文字与左图标 `OnColor/1`；填充 `Fill/Red/Solid/2`；透明边框 | Light Hover / Pressed 用更深的 `Fill/Red/Solid/1`；Dark 用 `Fill/Red/Solid/2` + 85% Alpha，合到当前深底后加深；Pressed 增加 `Border/Red/1` |
| Secondary / danger | 文字 `Text/Red/1`、图标 `Icon/Red/1`；填充为 `Fill/Red/Solid/3` 施加 35% Alpha；边框 `Border/Red/2` | 同源 65% → 90% Alpha；边框保持默认 |
| Tertiary / danger | 文字 `Text/Red/1`、图标 `Icon/Red/1`；透明底；边框 `Border/Red/2` | 填充为 `Fill/Red/Solid/3` 施加 65% → 90% Alpha；边框保持默认 |
| Text / default | 文字 `Text/Neutral/3`、图标 `Icon/Neutral/2`；透明底、无实体边框 | `Fill/Neutral/Alpha/6` → `/5`；前景保持原角色 |
| Text / brand | 文字 `Text/Brand/1`、图标 `Icon/Brand/1`；透明底、无实体边框 | 与 Text / default 共用 `Fill/Neutral/Alpha/6` → `/5`，不改为蓝色底 |
| Text / danger | 文字 `Text/Red/1`、图标 `Icon/Red/1`；透明底、无实体边框 | 填充为 `Fill/Red/Solid/3` 施加 35% → 65% Alpha；红色前景保持 |

上述红色弱底是已有 Solid/3 RGB 与合法 Alpha 的组件内派生，实际为半透明颜色，没有新增公共 RGB 或第二套色表。同一个 Category ID 在 Light / Dark 分别解析；组件别名在每个主题边界重新声明。以上配方已在两主题 × `Background/Neutral/1`、`/3` 检查，其他父面及嵌入 Input 后的实际表面不自动获得相同结论。

与上述九行共同组合的状态规则：

| 状态 | 当前决定 | 实施状态与边界 |
| --- | --- | --- |
| Keyboard Focus | 普通按钮与文字按钮共用全局 Border/Brand/1 的 1px 贴边细环与 Fill/Brand/Alpha/3 浅外圈 | 包含 danger 和 Loading；原生禁用不进入 Tab。共享 control / item / danger、Input 父框及内部操作、Tag 移除与 Link 已同步，见 12.8 |
| 普通 Button Disabled | 用户确认保留各按钮原色系，沿用原有禁用淡化：Primary 整体 0.3，Secondary / Tertiary 整体 0.4 | 已实现并通过专项浏览器回归；RGB 仍来自新 Token，关闭 Hover / Pressed |
| TextButton Disabled | 保留所属 Neutral / Brand / Red 前景，30% 透明度只作用于文字和图标 Part | 根节点保持透明度 1；禁用资格与可用文字门槛分开，视觉辨认仍进入 Human Gate |
| 普通 Button Loading | 用户最新选择：“背景和边框保留82%，文字与图标保持原色”。根节点透明度为 1，0.82 只作用于背景和边框；文字与图标沿用所属 Text / Icon / OnColor 来源及自身 Alpha。default Primary 的 Light 填充为 Brand Alpha/1 替换为 90% Alpha，Dark 为 Brand Alpha/2；危险 Primary 的 Light 为 Red Solid/1、Dark 为 Red Solid/2；其余采用对应外观默认底色与边框，之后分别施加 0.82 | 已实现并通过专项浏览器回归；0.82 引用既有 `--rain-button-loading-opacity`，不新增公共 Alpha 档位。这项决定覆盖旧整体 0.82 约束；Loading 资产、文案、焦点、busy 和防重复触发保留 |
| TextButton Loading | 根节点透明度保持 1；保留所属文字与图标颜色、透明默认底 | 复用已有 Loading 资产、文案和行为，不随普通按钮改为中性 label |
| Disabled + Loading | 沿用现有 Disabled 优先规则 | 同时核对 busy / disabled 语义，禁止出现可点击反馈 |
| Focus + Hover / Pressed / Error | 先保留完整语义状态，再叠加独立焦点 | 不用一条状态优先级让错误提示或键盘落点消失 |

已有 Link recipe 仍保持真实链接、正文常驻下划线、独立入口不铺底及已访问不变紫的决定。共享颜色发生变化时做回归；链接自己的 Hover / Pressed 选色另按其原合同验证，不把 TextButton 浅底套给链接。

### 8.4 颜色缺口及本批解决范围

保留原 G1–G5 编号以追踪迁移前问题。G2 按用户最终指定采用一个明确的危险 Primary 文字对比度例外，不能写成可读性达标；G3 的全局焦点来源已按后续用户选择迁移，实际轮廓验证范围见 12.8。其他配方仍执行既有资格和门槛；Input 必要边界与其他颜色状态、其他父表面和后续组件的同类问题没有随之关闭。

| 编号 | 迁移前问题 | Button / TextButton 本批结果与剩余范围 |
| --- | --- | --- |
| G1 | Brand 实心与浅底的双主题状态不能按色阶直接排列；Dark 不能直接沿用 Light 的 Solid/1 Hover | 已用第 8.3 节完整配方解决：Primary Alpha/1、Secondary Alpha/3 反馈，Pressed 独立加强边框；没有为三个状态补三个新色号 |
| G2 | Red Solid/1、/2 的 Light 小字反白不足 | 用户最终明确：“不满足文字对比度也没事。我认为能看清。normal状态使用fill-red-solid-2，hover时底色加深”。限定 Primary / danger 的 OnColor/1 label、四种可用状态、两主题与 N1/N3 表面，报告真实比值并标记用户接受。全局颜色验证器和其他变体不放宽；图标仍须达到 3 |
| G3 | 弱边框不能独立承担必要控件识别；Focus 需要合法来源和真实邻接面的轮廓验证 | Button 装饰边框已分离 Border 角色，不以其证明必要边界达标。全局 Focus 与 Input 父框已引用 Border/Brand/1 与 Fill/Brand/Alpha/3；不据此宣称所有邻接面对比度达标，见 12.8。Input 必要边界和其他颜色状态仍待组件配方确认 |
| G4 | Red / Orange 同系前景在部分 Alpha 或 Dark 父面上不足 | Button / TextButton 的 Red 前景与 Solid/3 合法 Alpha 已在本批四种环境下验证；TextButton danger 仍为红字。Input 的 Red / Orange 提示与其他表面尚未接入，不能复用本批通过结论 |
| G5 | 透明度的作用层级影响背景、文字与图标的真实合成 | Disabled 保留原色系整体 0.3 / 0.4；Loading 只将背景和边框设为 82%，文字与图标保持原色。新配方已通过双主题、双父面合成与专项交互检查；Focus 由 G3 单列 |

依据：[颜色治理的实际用途与门槛](2026-09-05-color-token-governance-design.md)、[四族配对缺口](2026-09-06-color-family-supplement-design.md)、[Dark 父底记录](../../evidence/runtime/color-dark-theme/verification.md)、[本批颜色合同与合成校验](../../packages/foundations/src/button-token-contract.ts)及 [浏览器回归](../../tests/e2e/core-ui.spec.ts)。最终红色配方的 45 组外观状态 × 2 主题 × 2 父面共 180 组浏览器检查通过，包含真实 Hover / Pressed、Loading 图标与实际透明度；8 项文字对比度按用户明确接受的例外报告，没有将其算作达标，也没有通过 Human Gate。

## 9. 查询区标准 / 紧凑完整尺寸接入表

以下是目标对照方案，单位 px；高度包含实体边框。Input 的 400 字重是 Next 推荐候选，不能冒充 Classic 根节点已显式锁定。TextButton 采用 Next 的现有后图标盒与完整间距候选，不覆盖第 2 节保留的 Classic 来源差异。

| 部位 | Query / Standard | Query / Compact | 现有 Token 的接入方式 |
| --- | --- | --- | --- |
| Input 高度 | Medium 32 | Small 28 | 首批组件 Size 映射；当前尚无这两档 Input 公开入口 |
| Input 左右内距 / 内部 gap | 16 / 8 | 16 / 8 | `Space/16`、`Space/8` |
| Input 排版 | 14/22/400 | 14/22/400 | 完整 `rain-type-ui-default`；紧凑高度不自动缩字 |
| Input 图标 / Clear | 普通 16；Clear 图形 14，点击盒 24×24 | 同 Standard | 复用现有 Rain 图标；按已登记的组件 Part 绑定尺寸，Clear 几何与实际图形一同接入 |
| Button 完整 Size | Small 32；最小宽 64 | Mini 28；最小宽 64 | 复用 `h-rain-button-small-height` / `h-rain-button-mini-height` 所在完整方案 |
| Button 左右内距 / 图文 gap | 20 / 4 | 12 / 4 | `Space/20` 或 `/12`、`Space/4`；保留现有组件别名 |
| Button 排版 | 14/22/600 | 13/18/600 | 现有 `text-rain-button-small` / `text-rain-button-mini` 的完整字号、行高与字重引用公共基础 |
| Button 前图标 / Loading / 后图标 | 16 / 16 / 12 | 14 / 14 / 10 | 复用各 Size 的现有组件图标 Token，不由页面临时调整 |
| TextButton 完整 Size | Regular 26；无最小宽 | Compact 24；无最小宽 | `h-rain-button-text-regular-height` / `h-rain-button-text-compact-height` |
| TextButton 内距 / 图文 gap | 左右 6、上下 3；gap 4 | 同 Standard | `Space/6`、`Space/4`；上下 3 继续用已有 `--rain-button-text-padding-block`，不造公共 Space/3 |
| TextButton 排版 | 14/20/400 | 13/18/400 | 现有 TextButton 完整方案引用公共字号、行高和字重；不套 14/22 改变 Regular 的几何 |
| TextButton 前图标 / Loading / 后图标 | 16 / 16 / 12 | 同 Standard | Next 已有 12×12 后图标盒；不照搬 Classic 不同尺寸的非对称槽 |
| 圆角 | 三者均 6 | 三者均 6 | `--rain-radius-6` / `rounded-rain-6`，或指向它的组件别名 |
| 实体边框 | Input / Button 1；TextButton 0 | 同 Standard | 1 使用 `Line/Thickness/1` / `border-rain-line-1`；TextButton 无边使用已有组件方案，不新增 Line/0 |
| 控件 / 动作之间 | 8 | 8 | `Space/8` / `gap-rain-8` |
| 字段网格之间 | 12 | 12 | `Space/12` / `gap-rain-12` |
| 查询区到结果区 | 20 | 20 | `Space/20`；由区域布局负责 |

补充约束：

1. 两组使用相同文案、图标、输入宽度策略与外部间距作比较。查询为 primary Button，重置为 default TextButton；“更多条件”等动作只在场景有需求时加入。
2. 显式 Size 选择完整方案，局部 Query Density 提供默认组合，不全局重写 Button 当前 Compact→Small32、Default→Medium36。Button Large40 保留既有专属方案。
3. Input、Button 与 TextButton 以组合视觉中心和文字关系对齐；TextButton 不额外套透明的 28/32px 高壳去伪造等高。清除的 24×24 点击盒仍保持组件内部身份，不套独立 IconButton 的尺寸。
4. Input 宽度由布局分配。首轮沿用既有最小可输入宽度作为比较起点，并把图标、Clear、Count 和尾部操作占用纳入实际测量；不新增全局输入宽度 Token。
5. 空间不足时按自然换行处理，字段与对应标签保持关联，操作文字优先完整显示；不临时缩字、挤压图标或扩大公共断点表。
6. 组件高度、图标盒与 Space 的用途分别登记。已有 `text-rain-size-28` 是字号入口，不能作为 28px 控件高度；即使 Space 中有 28，也不据此注册通用控件高度。

## 10. 首批交互建议与尚待体验确认的事项

沿用既有输入、中文输入和按钮行为；以下新增建议均为讨论候选，不因写入文档而改变运行行为。

| 对象 | 推荐方案 | 需要体验确认的差异 |
| --- | --- | --- |
| Clear 出现 | 已配置 clearable、有值且可编辑时显示；空值、只读、禁用时不显示 | 第一候选维持有值常驻，第二候选才是 Hover / Focus 显示；先不额外增加一套显示策略 API |
| Clear 与错误 | 推荐有值可编辑时仍能清除，错误信息独立保留；清除后由宿主重新判断校验状态 | 当前 Input 在 warning/error 会隐藏且阻止 Clear，这是明确的行为调整候选，不能藏在换色中 |
| Clear 宽度与焦点 | 配置 clearable 时预留 24px 槽；未显示时不保留空的可聚焦按钮；清除后焦点回输入区 | 避免文字在 Clear 出现/消失时横跳；验证同时有 Count / suffix / 尾部操作时剩余宽度 |
| Input 内文字操作 | 沿用已确认常驻、不可用时保留位置；最多一个尾部操作 | 操作后焦点归属按动作语义处理；Input 与内部按钮的可见 Focus 不互相遮挡 |
| 查询与重置 | Enter 与查询按钮执行同一个提交入口；中文组词中的 Enter 不触发查询；重置清空当前条件并把焦点放回首字段作为首轮候选 | 重置是否同时触发新查询由场景约定，本稿不把它内置进组件 |
| 查询 Loading | 首轮查询区候选为防重复提交并暂时禁止修改查询条件；当前查询按钮保持焦点与 busy，完成后恢复可编辑 | 这是查询区的组合策略，Button / Input 不内置请求或相互锁定；其他业务场景可明确采用不同策略 |
| Loading 布局 | 复用当前 Loading 图形、文字与右图标规则；首轮检查四种图文组合的宽度变化 | 有实际挤动再选择已有宽度/布局手段，不在讨论阶段新增测量器或通用防抖布局框架 |

其中 Clear 在错误态的可用性、24px 预留槽、查询期间是否可编辑，是本稿需要通过实际体验确认的三个行为建议。字体、内距、圆角等采用第 9 节完整方案一起看，不逐个数值重新投票。

## 11. 接入验收与推广条件

下表保留首批组件整体接入的验收要求。Button / TextButton 已有复用真实组件的 [Token 对照页](../../apps/playground/src/docs/components/button-token-review.tsx)，本批结果见第 12.6 节；Input / 查询区的完整迁移仍待形成对应材料，已实施的全局 Focus 单列于 12.8。测试与演示消费同一组映射，不另建演示专用按钮样式。

| 验收面 | 必须看到或验证的结果 |
| --- | --- |
| Token 引用 | 逐项追踪组件 Part → 组件别名 / 完整方案 → 现有公共 Token；保留合法专属几何；移除被替代的旧独立值，不只改类名 |
| 完整状态 | Input default / warning / error / disabled / read-only；九组按钮外观及 Hover / Pressed / Focus / Disabled / Loading；未解决变体明确可见 |
| 双主题与真实表面 | 两种背景、Alpha 合成、必要边界、嵌入 Input 的文字按钮、整体 Opacity；实际主题与声明一致，嵌套 Light 恢复正确 |
| 尺寸组合 | Standard 与 Compact 同内容并排；实际 border-box、内距、图标盒和可输入宽度；显式 Size 优先、不二次缩放 |
| 文案与布局 | 长中文、中英文混排、图标/Loading 切换、窄容器换行、缩放与用户文字间距覆盖；不因高度数字正确就认为完整方案正确 |
| 键盘与输入 | Tab / Shift+Tab、Enter / Space、中文组词、清除后焦点、错误与焦点并存、加载防重复、高对比度与减少动效 |
| 回归 | Button Large40、既有 Link recipe、Input Count / IME、局部 Recipe / Fork 隔离，以及各自原有行为合同 |

首批组件的完整接入仍需按各自范围解决 G1–G5，并完成上述实际检查。按钮本批结果不自动关闭 Input / 查询区问题；普通 Disabled / Loading 已按视觉反馈实现，全局 Focus 最新选择见 12.8，Human Gate 继续单列。Tag 等已有可聚焦入口已包含在本次全局 Focus 授权中；它们的其他颜色、尺寸和行为，以及 Badge、Surface/Card 和其他表单组件的完整迁移仍须按独立范围推进。Table、Tree、复杂布局按其依赖与独立范围推进。

## 12. Button / TextButton 专项迁移记录（2026-09-06）

### 12.1 目标与最小实现边界

本批已将九组按钮外观接向同一套基础来源，并保留八档完整尺寸。普通按钮和文字按钮继续共用 [Button](../../packages/ui/src/button/button.tsx) 与 [CVA Tailwind 配方](../../packages/ui/src/button/button.styles.ts)；文字按钮就是 `variant="text"`。现有 API、Parts、静态 Tailwind、`rainCn` 和 Local Recipe 均保留；本批修改已有配方，没有新建同义组件或第二套桥接。普通 Disabled / Loading 已按最新视觉反馈修订；Focus 来源已接入新 Token，并按后续授权推广到全局共享入口，见 12.8。

引用链为：公共基础 Token → 必要的组件别名 / 完整尺寸与状态方案 → 现有 Tailwind 类 → Button。已有别名可以继续使用，但能对应公共基础的值要引用它，不能复制一份 RGB 或 px。高度、图标盒等合法组件专属值保留其用途身份，不为了字面上的“全部 Token 化”强行改用同值 Space。

本批没有改变任何一档尺寸数字；第 12.3 节记录保留值及八档浏览器实测。普通按钮仅把已由 Preflight 清零的纵向 padding 用现有 `py-rain-0` 显式化。组件管理内部样式，页面用现成 Variant / Size / Recipe，外部布局负责排列；Input 尺寸与行为、查询区默认映射和公共高度均未改动。Input 仅按 12.8 接入统一焦点外观。

### 12.2 迁移前颜色快照与本批替换

本表的旧值是实施前读取 `tokens.css` 与 `button.styles.ts` 的 Light 快照，不能当作当前运行定义。当前事实源为 [button-token-contract.ts](../../packages/foundations/src/button-token-contract.ts)，双主题实际配方以第 8.3–8.4 节为准；不能从 Light 同值推导 Dark 等价。

| 项目 | 迁移前定义 / 冲突 | 本批实际处理 |
| --- | --- | --- |
| Primary 三态 | `#1561F8` → `#0F55DF` → `#0E4ACB`；最后一档不存在于现有公共色 | 默认引用 Brand Solid/2，文字、图标用 OnColor/1；Hover / Pressed 用 Brand Alpha/1，Pressed 独立用 Border/Brand/1 |
| Secondary 三态 | `#D3E1FF` → `#C6D8FF` → `#B9CEFF`；首尾缺对应；中间虽等于 Brand Solid/3，搭配 Brand 文字也未达门槛 | 默认 Brand Solid/4；Hover / Pressed 用 Brand Alpha/3；Pressed 边框加强至 Brand/1 |
| Tertiary | 边框 Neutral 来源 26%，新档位是 25% / 16%；按压填充 18%，新档位是 16% | 边框引用 Border/Neutral/3；Hover / Pressed 引用 Neutral Alpha/4 → /3，旧独立比例已替换 |
| Danger 全族 | `#EF5353`、`#E24449`、`#C9343F`、`#F3BDC0` 及由旧红派生的 10% / 18% / 24% 均是另一套来源 | Primary 默认 Red Solid/2 与 OnColor，其他危险变体保留 Red 前景和半透明弱底。实际配方及用户接受的文字例外见第 8.3–8.4 节 |
| Text default | `#56688F` 等于 Text/Neutral/4，但该弱层级不允许作为正常交互正文 | 已改 Text/Neutral/3 与 Icon/Neutral/2 |
| Text default / brand 反馈 | 品牌蓝与 panel 混合的 4% / 8% 浅底，不是现成 Alpha 色 | 已改为共享 Neutral Alpha/6 → /5，保留浅灰蓝反馈方向 |
| Text danger 反馈 | 旧危险红与 panel 混合 6% / 10%，不等价于新 Red Alpha | 已改 Fill/Red/Solid/3 施加 35% → 65% Alpha；四种主题与父面组合下已验证，红字保留 |
| 文字与图标 | 图标继承 root 的文字颜色；同色不等于同资格 | label 用 Text，图标 / Loading 用 Icon，强填充前景用 OnColor；内部 Part 已传递 tone，没有增加用户 Props |
| Primary 边框 | 背景和边框共用同一组件颜色 | 两种 Primary 的默认与 Hover 均保留透明 1px 边框占位，Pressed 分别使用 Border/Brand/1、Border/Red/1，不让 Fill 跨角色画边界 |
| Focus | 主蓝和 20% halo 等旧来源；同值不代表可以用 Text 或 Fill 身份画轮廓 | 已按 12.8 改用现有 Border/Brand/1 与 Fill/Brand/Alpha/3，并保留系统高对比度模式的原生轮廓 |

本轮已确认的 `action-primary` 文字用 Text/Brand/1、填充用 Fill/Brand/Solid/2，是按用途分别选择；不表示要把蓝字放在蓝色实心主按钮上。实心主按钮仍使用 OnColor 前景。

规划阶段对 registry 的关键配对筛查快照如下，主题表面均为各自 `Background/Neutral/1`。保留这些被排除或候选组合的原因；本表不表示它们都被实际采用，也不替代本批运行验证。

| 配对 | Light | Dark | 影响 |
| --- | --- | --- | --- |
| OnColor/1 + Brand Solid/2 | 5.13 | 4.54 | 主按钮默认色可进入实际组合验证 |
| OnColor/1 + Brand Solid/1 | 6.20 | 3.87 | Dark Hover 不能直接照搬 Light |
| Text/Brand/1 + Brand Solid/3 | 4.33 | 4.34 | 原 Secondary Hover 即使同值有 Token，也不能直接采用 |
| Text/Brand/1 + Brand Alpha/3 | 4.88 | 4.64 | 可作该父面上的浅底反馈候选 |
| OnColor/1 + Red Solid/1 | 4.33 | 3.60 | 不能覆盖普通小字反白 |
| OnColor/1 + Red Solid/2 | 3.60 | 6.36 | Light 普通小字反白仍有缺口 |
| Text/Red/1 + Red Alpha/2 | 4.81 | 4.26 | 不能作为跨主题通用配方 |
| Text/Red/1 + Red Alpha/1 | 4.34 | 3.88 | 加深弱底可能降低红字可读性 |

Red Alpha/2 放在页面底 Background/Neutral/3 时，上述红字比值变成 Light 4.41、Dark 4.84。普通字号文字按现有规则需 4.5；图标与必要边界另按各自资格检查。不得降低门槛，也不以装饰身份登记实际必要边界。

本批用户明确选择与落实状态：

1. 危险 Primary 最终使用 Red Solid/2 + OnColor，悬停加深；用户明确接受文字对比度，并撤回新增深红 Fill。早前浅红方案与新增身份方案均不采用。
2. 普通 Disabled“保留各按钮原色系，沿用原有禁用淡化”：Primary 整体 0.3，其余普通变体整体 0.4，RGB 来自新 Token。
3. 普通 Loading“背景和边框保留82%，文字与图标保持原色”：仅淡化背景与边框，前景保持所属 Text / Icon / OnColor。危险 Primary 的 Loading 在 Light 使用 Red Solid/1、Dark 使用 Solid/2 后再施加 82%，保持白色加载图标至少 3 的对比度。

TextButton 继续保持既有禁用前景 30%、Loading 前景原色及根节点透明度 1。最终红色配方已通过颜色与交互复核，见 12.6；自动通过不代表用户视觉确认。

所有配方继续使用现有 Category RGB 或合法 Alpha 派生，不新增公共色。G2 为用户接受的文字例外；Input 候选、Focus 的实际可见性检查和 Human Gate 状态各自独立。

### 12.3 八档尺寸：本批保留与实测

单位 px。高度为包含实体边框的外框；左右内距指每侧声明值。字体统一沿用 UI 字体；下表排版为字号 / 行高 / 字重。数据来自当前组件 Token 与真实配方；本批八档的高度、左右/上下 padding 与 gap 均已通过浏览器实测，保留组件专属身份，不新增公共高度表。

| 方案 | 高度 / 最小宽 | 左右内距 | 上下内距 | 图文 gap | 排版 | 前图标及 Loading / 后图标 | 圆角 / 边框 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 普通 Mini | 28 / 64 | 12 | 0 | 4 | 13 / 18 / 600 | 14 / 10 | 6 / 1 |
| 普通 Small | 32 / 64 | 20 | 0 | 4 | 14 / 22 / 600 | 16 / 12 | 6 / 1 |
| 普通 Medium | 36 / 64 | 20 | 0 | 4 | 14 / 22 / 600 | 16 / 12 | 6 / 1 |
| 普通 Large | 40 / 80 | 24 | 0 | 4 | 14 / 22 / 600 | 16 / 12 | 6 / 1 |
| 普通 XL | 48 / 160 | 28 | 0 | 6 | 16 / 24 / 600 | 22 / 16 | 8 / 1 |
| 文字 Small | 20 / 0 | 6 | 3 | 4 | 12 / 14 / 400 | 14 / 12 | 6 / 0 |
| 文字 Compact | 24 / 0 | 6 | 3 | 4 | 13 / 18 / 400 | 16 / 12 | 6 / 0 |
| 文字 Regular | 26 / 0 | 6 | 3 | 4 | 14 / 20 / 400 | 16 / 12 | 6 / 0 |

| 项目 | 当前来源与处理 |
| --- | --- |
| 字号、行高、字重 | 继续通过组件别名引用公共基础，保留每档字号、行高与字重；没有统一替换为一个 UI 预设 |
| 内部 padding / gap | 左右 6/12/20/24/28、gap 4/6 继续引用 Space；普通按钮纵向 padding 由既有 Preflight 清零改为显式 `py-rain-0`，浏览器确认仍为 0；TextButton 的专属 py3 不受该类覆盖 |
| 文字按钮上下 3 | 14+3+3=20、18+3+3=24、20+3+3=26；保留组件专属 3px。不能取整为 4，也不新增公共 Space/3 |
| 高度、最小宽、图标盒 | 继续通过已有组件尺寸 Token。现有 Space/28 或字号 Size/28 不能因同值就充当高度。Large40 按上位 Brief 保留 |
| 圆角与实体线 | 6/8 已引用 Radius；普通 1px 边框已引用 Line/Thickness/1；文字按钮无边框，不新增 Line/0 |
| 宽度 | 普通是最小宽而非固定宽；短文案被最小宽撑开后，可见左右留白可能大于声明 padding。文字按钮继续由内容决定宽度，不增加 block 或强制等宽 |

本批几何处理与视觉检查边界：

1. **通用排版不等于按钮完整排版。** Regular 文字按钮当前 14/20 加上下留白共 26；直接换 UI/Default 的 14/22 会需要 28。Small 的 12/14 也不能在 20 高内直接改成 UI/Caption 的 12/20。保留组件组合、共享基础值可以解决此冲突。
2. **Loading 宽度变化保留。** [文字按钮浏览器回归](../../tests/e2e/text-button.spec.ts)仍检查 Regular 无图 / 前图 / 后图 / 双图切加载的宽差 +20 / 0 / +4 / -16；本批普通与文字按钮专项回归通过。[对照页](../../apps/playground/src/docs/components/button-token-review.tsx)提供同一按钮的四种图文组合切换，没有新增预留槽、固定宽策略或 JS 测量器。
3. **对齐演示已修复。** 原 `.component-row--baseline` 被后写居中规则覆盖的问题，已通过更具体的 `.component-row.component-row--baseline` 恢复既定底对齐；新对照页的动作行明确使用中心对齐。两种演示目的分开，不改变组件几何。
4. **命中与视觉关系仍交由 Human Gate。** 八档数值与既有键盘、缩放等专项回归通过，不等于用户已接受紧凑行内按钮的整体体验。若需要调整，应整组检查高度、行高、内距、图标和相邻间距，不独立拉高一项。

### 12.4 边距、间距与 Density 的职责

| 关系 | 推荐方案 | 边界 |
| --- | --- | --- |
| 按钮内部 | 第 12.3 节每档完整 padding / gap | 由 Button 管理；页面不逐个修补 |
| 相邻操作按钮 | 查询 / 重置等首轮组合用 Space/8，即 `gap-rain-8` | 外层 flex / grid 管理，不在每个 Button 添加 margin-right |
| 演示矩阵 | 当前 `.component-row` 的 gap12 仅用于展示分组 | 不能当作所有业务按钮组的全局规范 |
| 字段网格 / 查询到结果 | 沿用局部方案的 Space/12 与 Space/20 | 属于区域布局，不进入 Button 的尺寸 Token |
| 混合高度 | 普通按钮与文字按钮优先比较视觉中心和文字关系 | 不给文字按钮增加透明高壳来伪造等高；长文案与空间不足时由父布局换行 |

当前全局普通 Density 是 compact→Small32、default→Medium36；文字是 compact→Compact24、default→Regular26。第 3 节查询区候选则是 Standard：Small32 + Regular26，Compact：Mini28 + Compact24。两套作用域不同，本次可一起对照，但不静默重写全局默认。显式 Size 始终优先，选完整组合，不重复缩放。

### 12.5 已实施内容与当前检查点

| 项目 | 本批工作与主要文件 | 当前结果与剩余检查 |
| --- | --- | --- |
| 1. 比较材料 | 已建立 `#button-tokens` 对照入口，复用真实 Button，展示九组外观、八档尺寸、两种父底、两种主题与四种图文组合；既有 Button / TextButton 页面相互链接 | 页面为 `local-experiment`，可操作与切换；用户已据此提出 Disabled / Loading 的视觉反馈 |
| 2. 同源与检查 | 新增 `button-token-contract.ts`，由 `token-contract.ts` 导出；沿用既有生成器和 Tailwind 桥接，登记静态配方与实际 CVA Part 消费，并为本批授权精确扩展校验 | 颜色 RGB 仍来自 registry，生成段由源产生；没有放开全 UI Category 使用或任意 `--rain-button-*`，历史 B2 比较基线保留 |
| 3. 普通与文字配方 | 已修改 `button.styles.ts` 和 `button.tsx` 内部 tone 传递，按 Text / Icon / OnColor 拆分前景；普通 py0 显式化，复用原 `rainCn` 和 Local Recipe | 五种状态与八档尺寸已接入；危险 Primary 的文字例外按用户最后指定精确登记，未新增公共颜色 |
| 4. 状态与尺寸 | 已完成四种环境颜色检查和八档几何实测；修复既有尺寸演示对齐，新页分别展示中心对齐及 8 / 12 外部间距 | 原色系 Disabled、Loading 背景/边框 82% 和双图标前后层级均已实现；全局 Focus 来源及入口同步见 12.8 |
| 5. 回归与说明 | 已扩展 Button 合同、样式与交互检查，以及既有 Core UI / TextButton 浏览器入口；本批 Manifest 与阶段增量独立记录 | 最新专项与独立审阅通过，最终完整回归结果见 12.6；Human Gate 保持 `awaiting_human` |

同源登记覆盖明确的 Button 事实源、组件及对照页；实际 CVA 状态和 Part 与颜色记录相互核对。跨角色、主题边界和父面资格继续由现有颜色治理约束，后续状态修订沿用这条链，不建立第二套消费解释器或全目录豁免。

回归继续使用现有入口，从仓库根目录运行：

```sh
pnpm exec vitest run packages/foundations/src/button-token-contract.test.ts packages/ui/src/button/button.styles.test.ts packages/ui/src/button/button.test.tsx packages/ui/src/button/button-text.test.tsx packages/ui/src/utils/rain-class-names.test.ts apps/playground/src/docs/components/button-token-review.test.tsx
pnpm exec playwright test tests/e2e/core-ui.spec.ts tests/e2e/text-button.spec.ts
pnpm verify
```

前两项分别检查颜色合同、组件组合和真实交互；最后一项覆盖生成 / 治理、类型、构建与项目规定检查。新状态须再次核对 Light / Dark 和嵌套 Light、Background/Neutral/1 与 /3、真实 Alpha 合成、禁用防触发、Loading 防重复及焦点保留，并回归显式 Size 优先、长文案、布局换行、Forced Colors 与 Reduced Motion。Input 内嵌场景仍按其组件配方范围验收；全局 Focus 已实现，其入口覆盖、真实双圈与主题回归见 12.8。Link 同步焦点并回归原合同，不顺带重设计其他外观。

### 12.6 本轮交付状态

本批已有 Button / TextButton Token 源、生成输出、CVA Part 颜色、八档尺寸保留及真实对照页的实现。普通 py0 已显式化，尺寸演示对齐已修复；Input 其他状态、尺寸与行为及查询区仍为候选，全局 Density 默认和公共高度身份没有改变。随后全局 Focus 授权及其检查独立记录于 12.8。

验证记录更新至 2026-09-07。最终危险 Primary 红底反白配方通过完整治理检查、类型检查、813 项单测、构建与 45 项 Chromium 回归；897 图标来源检查在本批此前通过，图标源未改变。浏览器覆盖 180 组状态 / 主题 / 父面颜色、Loading 图标、嵌套 Light、八档几何和双图标颜色区分。原无并发限制单测出现图标页与旧 FIFO 测试超时后，保持断言与超时值不变，以 `--maxWorkers=2` 完成完整单测，其余项目按原顺序完成。后续 Focus 修订的检查单列于 12.8。

最终实现为：Disabled 保留原色系的 Primary 0.3 / 其余普通变体 0.4；Loading 根节点为 1、背景与边框 82%、文字与图标保持原色；双图标按 12.7 降低右侧层级；危险 Primary 默认 Red Solid/2 + OnColor，悬停加深。这些修订及治理均经独立只读审阅，无阻塞发现。新增深红 Fill 方案已撤回，公共颜色仍为原 105 个 ID。

颜色检查明确报告 8 个 Light 危险 Primary 文字例外：default 在两个父底均为 3.601，hover / pressed 均为 4.331，loading 在 N1 / N3 分别为 3.448 / 3.532。它们是用户接受的低于 4.5 的结果，不能描述为达标；所有非 Disabled 图标仍满足 3，其他配方仍执行原门槛。全局验证器保持严格，缺少或篡改阶段中的精确例外授权会失败。

Human Gate 保持 `awaiting_human`。Focus 颜色来源已按 12.8 的用户选择统一；下一检查点是用户核对最终对照页，自动验证与视觉确认分开记录。本批没有 Figma 写入、发布、业务迁移或 Git 操作，不自动关闭旧组件或 B2 的历史 Gate。

### 12.7 双图标的前后层级

用户明确：同时出现两个图标时，左侧标识更重要，颜色保持；右侧表示下拉或跳转，使用更浅一级。实现只在实际存在前图标时降低后图标层级，单独后图标不变；不新增公共 Props。Loading 仍隐藏后图标，Local Recipe 保持最后合并。

| 场景 | 双图标中的右侧来源 |
| --- | --- |
| 品牌反白主按钮 | `OnColor/2` |
| 危险反白主按钮 | `OnColor/1` + 90% Alpha，避免 Light 默认底上的原 OnColor/2 低于图标门槛 |
| 普通 Secondary、品牌文字按钮 | `Icon/Brand/2` |
| 红色前景按钮 | `Icon/Red/2` |
| 普通文字按钮 | `Icon/Neutral/3` |
| 普通 Tertiary | `Icon/Neutral/2` + 80% Alpha，仅作用于该 Part |

普通 Tertiary 的直接下一档 Neutral/3 在浅色页面底按下时只有 2.824，因此采用上述同源 Alpha 配方，四种环境三态最低 3.398。除危险 Primary 的上述 90% 配方外，其他场景直接使用下一档；没有用 Text 身份代替 Icon，也没有把必要图标标成装饰来豁免对比度。45 组记录中的 36 组非 Loading 状态登记双图标的右侧 Part，继续执行有意义图标门槛；文字按钮 Disabled 的右侧仍叠加原前景 30%。


### 12.8 全局 Tab 双层光环（2026-09-07）

用户先要求所有按钮的键盘 Tab 状态接近 Token 统一前的“一圈重色光环 + 一圈浅色光环”，并指定细环可用 `Border/Brand/1`，浅外圈可用 `Fill/Brand/Alpha/3` 或 `/4`；随后明确将统一范围扩大到组件库所有已有 Tab 状态的组件。本次采用 Border/Brand/1 与 Alpha/3；Alpha/3 的 Light 20% 更接近原 20% Halo，Dark 按同一 Token 使用其 30%。没有新增颜色，也没有扩大公共 Fill 的角色资格。

共享 [focus.css](../../packages/foundations/src/focus.css) 的 control / item / danger 均使用 1px、offset 0 的贴边细环与 3px 浅外圈；[语义映射](../../packages/foundations/src/token-contract.ts) 中三个 Focus 来源统一引用 Border/Brand/1，光环引用 Fill/Brand/Alpha/3。危险意图继续由组件自身配色表达。共享外圈位于基础样式层，既有 Button Focus 桥仍可保留 Primary 的 4px 范围，其余普通与文字按钮为 3px。此处 4px / 3px 是从控件边缘计算的 shadow spread，细环覆盖其最内侧 1px；普通 Secondary / Tertiary 的 Focus 边框也用 Border/Brand/1。

| 实际入口 | 本次统一方式与保留边界 |
| --- | --- |
| 普通 Button / TextButton | 继续使用 Button 局部桥和共享 control 入口；Loading 保留双圈，填充与前景不由 Focus 改写。原生 disabled 不进入 Tab，Loading 及 TextButton 的 aria-disabled 仍保留原有可聚焦与防触发行为 |
| Input 输入本体 | 原生 input 保持内部无轮廓，由 `.rain-input:has(.rain-input__control:focus-visible)` 在父框显示同一细环与 3px 外圈；default 聚焦边框同步 Focus 来源。warning/error 背景与边框保留既有状态色，其他 Input 状态颜色、尺寸、Clear 出现逻辑、IME 和事件行为均未迁移 |
| Input Clear | 清除按钮继续使用共享 control 入口，保留清除后返回输入本体的焦点行为；不为未显示或禁用的操作新增 Tab 停靠 |
| Tag 移除操作 | 继续使用共享 control 入口；`:focus-visible` 与 Hover 一样将原整体 opacity 从 0.78 设为 1，避免焦点双圈被整体淡化。静态 Tag 与原生 disabled 移除操作的键盘行为不变 |
| Link standalone / inline | 继续使用共享 item 入口；文字、下划线、导航与新窗口行为不变 |
| Foundations 与其他现有共享入口 | 已标记 data-focus 的原生控件、链接和示例自动采用同一规则；Card / Surface 默认仍为非交互容器，不新增 tabindex。包内未实现的 Menu、ListItem、Tree、Tabs 不因此获得组件实施或完整颜色迁移资格 |

共享 Focus 变量在每个主题边界重新绑定，Button 的 Halo 与三个组合 shadow 也在主题边界重新解析，避免 Dark 或嵌套 Light 继承根节点已解析的旧色。共享规则及 Input 父框、Button、Link 的 Forced Colors 均保留 CanvasText 的 2px 轮廓、offset 2 和无阴影处理；键盘落点和既有事件不变。Foundations 总入口与 Token 页面同步说明当前统一来源。

比值按真实 Token 记录：Border/Brand/1 对 N1 / N3 的 Light 为 3.84 / 3.50，Dark 为 2.57 / 2.92；不宣称全主题或两圈邻接处均满足 3:1，也不扩大危险 Primary 的文字例外。该记录与颜色声明资格、实际双圈显示和 Human Gate 分开。2026-09-07 用户在全局落地说明后回复“确定。”，本次全局 Tab 双层光环的视觉确认已记录；该确认范围为 Focus，不自动关闭按钮其他外观的验收。

验证分阶段记录：Button Focus 阶段通过 52 项专项单测与 13 项 Chromium 回归；全局修订随后通过完整治理检查、类型检查、构建及完整 47 项 Chromium 回归，覆盖共享入口、Input 父框与 Clear、Tag 移除、Link、两主题、嵌套 Light、Forced Colors 和原 Button 状态。整库 816 项单测首轮有 4 项旧 Focus 锁定断言失败、812 项通过；同步这 4 项旧断言后，相关 369 项治理 / Token 测试及 18 项基础测试分别全部通过，未放宽超时或其他行为断言。独立只读复核未发现入口遗漏。实现与自动验证已完成，Focus Human Gate 已于 2026-09-07 标记 `accepted`，按钮其他外观仍为 `awaiting_human`；第 12.6 节另保留此前按钮颜色配方阶段的证据。


### 12.9 最新 Button / TextButton 配方视觉验收（2026-09-08）

用户明确“普通 Button：最新 Token 配方的整体验确认”与“TextButton：最新配方的视觉验收确认”。`tokenRefinements.buttonTokenMigration` 现为实施完成、自动验证通过、独立审阅通过、视觉验收 `accepted`；`componentRefinements.textButton` 及 Button Manifest 的文字与配方验收同步为 `accepted`。精确确认来源见阶段记录，B2 历史快照不回填。此前章节的待验收表述为对应阶段的历史状态。

八档完整尺寸、两主题现有颜色、状态、图标／加载组合及已确认 Focus 保持当前实现；8 项危险 Primary 文字对比度例外继续按原用户决定保留，本次不宣称其达到 4.5:1。未新增配方或 Token，未修改按钮组件行为，不推进 Figma、发布、业务接入或 Git。
