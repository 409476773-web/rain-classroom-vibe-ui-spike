# Rain Next Semantic → Category 颜色映射记录

核对日期：2026-09-06。仓库根：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike`。

本轮按用户指定的层级和半透明弱背景方向接入下列 14 项；页面 /3、弱背景 Alpha/2（10%）及信息弱背景 Second 是本次具体默认选择，未把它们当作用户逐项指定的唯一档位。42 个旧 Semantic 入口身份保留。对应关系以 [token-contract.ts](../../packages/foundations/src/token-contract.ts) 为唯一登记，颜色值来自 [color-registry.ts](../../packages/foundations/src/color-registry.ts)，CSS 与页面显示值均由其派生，不另存一套色值。

本节记录当前选择与实施范围，不等于所有组件的可读性、状态或主题验收通过。下方历史盘点中的旧值、候选与当时建议保留用于追溯；与本节冲突时，以本轮已确认关系为准。精确授权见[本轮颜色实施计划](../plans/2026-09-06-foundations-color-alignment.md)，此前非颜色等值引用见[入口收口计划](../plans/2026-09-06-foundations-alignment.md)。

## 本轮接入的 14 项

| Semantic 入口 | Category 来源 | 当前选择与可选规则 |
| --- | --- | --- |
| text-secondary | Text/Neutral/3 | 常规次要文字 |
| text-muted | Text/Neutral/4 | 弱档仍须核对内容资格与实际对比度 |
| text-placeholder | Text/Neutral/5 | 已按指定来源接入；白底可读性问题见下文 |
| text-disabled | Text/Neutral/6 | 真实禁用内容 |
| surface-page | Background/Neutral/3 | 默认 /3，按页面层级可选 /4 |
| border-default | Border/Neutral/3 | 常规边界；少量轻强调边界可选 /2 |
| border-subtle | Border/Neutral/3 | 轻分隔线 |
| border-strong | Border/Neutral/2 | 默认 /2；极重要边界才用 /1 |
| action-primary | Fill/Brand/Solid/2 | 主操作填充；独立文字角色使用 Text/Brand/1 |
| action-disabled | Fill/Neutral/Solid/2 | 禁用操作填充 |
| semantic-success-surface | Fill/Green/Alpha/2 | 成功弱背景，10% Alpha |
| semantic-warning-surface | Fill/Orange/Alpha/2 | 警告弱背景，10% Alpha |
| semantic-error-surface | Fill/Red/Alpha/2 | 错误弱背景，10% Alpha |
| semantic-info-surface | Fill/Second/Alpha/2 | 本轮信息弱背景采用 Second，10% Alpha |

`action-primary` 的文字另由 `--rain-color-action-primary-text` 提供；它是同一个旧角色的必要职责拆分，不把 42 项改计为 43 项。原生主操作示例保留填充，边框改为透明；Native Link 默认文字改读独立文字角色，hover / pressed 仍保留各自旧状态定义。

Solid Neutral Tag 的背景与同色边框改读 `--rain-tag-neutral-fill`，Neutral Badge 改读 `--rain-badge-neutral-fill`。两者分别保留原填充值 #40506A、#596A82；相应头像示例与静态动效标记复用这两个变量。本轮未确认新的实心中性填充，不让 Text 映射带动这些填充换色。颜色层级编号是普通可读内容，改读 text-secondary，不再占用 placeholder。

## 未迁移范围与仍需解决的问题

其余 28 项保持原定义：Brand 三项；text-primary / inverse / link；surface-panel / raised / overlay / subtle；action-primary-hover / pressed、action-secondary / ghost / danger；Selection 三项；Focus 三项；success / warning / error / info 四种状态前景；Intelligence 三项。品牌主蓝和 Focus 继续遵守锁定合同；没有对应新 Token 的紫色、青色及 AI 色系等待用户补充，不用近似蓝色替代。

- **占位文字可读性待解决：** 当前指定的 Text/Neutral/5 在白底约 **3.708:1**，未达到普通文字 **4.5:1**。来源对应正确不能据此声称可读性验收通过；不放宽 `validateColorUse`，不将实际占位提示、输入单位或可点击入口说明改标为装饰。
- **真实用途仍需核对：** Text/Neutral/4 的弱档资格、Alpha 边界是否承担必要识别、四种状态旧前景与新弱背景的配对，均须检查实际 Part、State 与父背景。10% Alpha 不是单独的最终背景色。
- **主题验收仍独立：** 已迁移引用在既有主题边界读取对应 Category，未迁移项仍保留旧值。这是局部来源收口，不是全部组件的 Dark 配方验收；保留混合状态的说明，不把 Category 视觉确认推导为组件主题通过。
- Button 自身颜色状态配方、字号、尺寸与交互保持原边界。历史盘点里的 Secondary hover 4.333:1、TextButton 弱档资格、反白表面资格等问题仍需后续完整状态方案裁决。

实现验证与独立审阅结果由本轮实施计划和运行证据记录；用户尚需查看实际迁移效果与以上未决项。

## 历史盘点：实施前快照

以下 42 项旧值与候选来自本轮颜色选择之前，仅用于追溯，不能当作当前映射表。`UI` 指 `packages/ui/src/styles.css`，`Button` 指 `packages/ui/src/button/button.styles.ts`，`App` 指 `apps/playground/src/styles.css`，`Focus` 指 `packages/foundations/src/focus.css`，`Icons` 指 `apps/playground/src/docs/icons-page.css`；行号也是当时快照。没有固定业务消费者的项仍由 Foundations 色板展示，不等于可以删除。

### 当时的判定原则

- 先按实际 property / Part / State / Surface 选用途，绝不按最近 Hex 匹配。候选中的多 ID 表示旧项承载了多个角色，不能直接做一个全局 Alias。
- `validateColorUse` 要求 Category 与 role 一致；Text / Icon 只管前景，Fill / Background 只管承载，Border 可管 border、outline 或绘制线条的 background。Brand 需明确品牌用途；OnColor 需显式表面 Recipe；条件档需 Recipe 和来源证据；Weak Neutral 不接受关键交互文字。见 `color-registry.ts:222–225,289–340`。
- Light 同值不等于 Dark 同值，也不等于全部消费者资格通过。大部分下述同值项在 Dark 值不同，不能把新 Category 直接挂进全局旧 Semantic。
- 旧颜色只在 `:root, [data-rain-theme="light"]` 定义，并非已有完整 Dark 语义。若要声称“保旧视觉”，必须保留旧 Light 行为和作用域，包括根节点就是 Dark、嵌套 Light / Dark 两类情况。单纯 `:root { old: var(--category) }` 在根 Dark 下会读取新 Dark 值，不能称保视觉；不要为收口顺带新增一套旧色 Dark 主题。
- 表中的“候选”只说明职责可能对应，不批准视觉变化、配方、弱等级资格或主题映射。无已验证唯一对应时保留旧值并标记 legacy。

### 当时的全部 42 项旧值与候选

| # | 旧 Semantic 名 | 旧 Light 值 | 候选新 ID 与 Light 值 | 判定与待确认点 | 关键现有消费者 |
| --- | --- | --- | --- | --- | --- |
| 1 | brand-primary | #1561F8 | Text/Brand/2、Icon/Brand/2、Fill/Brand/Solid/2 均 #1561F8；Border 无同值项 | Light 同值但旧项跨前景、背景、边框，无法整项单 Alias；品牌锚点保留。以上三项 Dark 分别 #5188FF、#5188FF、#266BFF | UI:85、196、207–208、305、445；Button:83；App:67、73 |
| 2 | brand-primary-subtle | #EAF2FF | Fill/Brand/Solid/4 #E0EAFF | 低强调品牌承载职责对应，但有视觉变化；需声明品牌用途和实际承载面 | UI:84、190；App:488 |
| 3 | brand-primary-strong | #0B45B5 | 现有前景用法可候选 Text/Brand/1 #0F55DF | 有视觉变化；不能顺带把“按压”与强前景合并；状态配方独立裁决 | UI:189；App:484 |
| 4 | text-primary | #14233C | Text/Neutral/1 #142346 | 主信息职责可对应，实际视觉变化；普通 Icon 如独立设色需另选 Icon | UI:113、245、334、358；App:15 |
| 5 | text-secondary | #40506A | 文字候选 Text/Neutral/2 #3A4865；旧背景/边框用法无直接对应 | 有视觉变化且跨职责；不能整项 Alias | UI:62、171、201–202、406 |
| 6 | text-muted | #596A82 | 文字候选 Text/Neutral/3 #495D87；纯非交互且非关键辅助可另审 Text/Neutral/4 #56688F | 有视觉变化；/4 是弱档，不可统一承接；Badge 背景须另设 Fill Recipe | UI:132、258、392、400、413 |
| 7 | text-placeholder | #69778D | 候选 Text/Neutral/3 #495D87 | 有视觉变化；占位属于输入内容，不按数值相近映射到 Weak /4 或 /5；实际输入白底与可读性另核 | UI:121；App:991 |
| 8 | text-inverse | #FFFFFF | OnColor/1 #FFFFFF（Dark 也 #FFFFFF） | 唯一明确同值同类前景候选；每个消费者仍需 OnColor 表面 Recipe 和对比度，不等于可直接开放全局白色 | UI:200、206、257；Button:142、153；Icons:42 |
| 9 | text-link | #0F52DC | Text/Brand/1 #0F55DF | 同类链接前景但视觉变化；需品牌 action 用途；不能与新 /2 的品牌身份混称同值 | UI:146；App:854、1051；Icons:49 |
| 10 | text-disabled | #97A4B7 | Text/Neutral/6 #A0ACC5 | 真实 Disabled 文字可候选，视觉变化；不能据此用于 Placeholder 或可点击内容 | UI:99、125、216 |
| 11 | surface-page | #F3F7FC | Background/Neutral/3 #F2F4FF（层级确认时也应比较 /2 #F7F9FF） | 页面背景职责对应但视觉变化；新 Background 为前到后排序，不能靠近色直接确定层级 | UI:338；App:16、28 |
| 12 | surface-panel | #FFFFFF | 背景候选 Background/Neutral/1 #FFFFFF（Dark #1E243B）；旧白色边框无同用途同值 Category | 背景 Light 同值；整项因边框/分离线混用不能单 Alias；Dark 面板变化需独立设计 | UI:64、185、195、259、344、359；tokens.css |
| 13 | surface-raised | #FAFCFF | Background/Neutral/1 #FFFFFF 或 /2 #F7F9FF，需先确定与 panel 的层级关系 | 有视觉变化，无唯一映射；不能把 raised 标签机械映射到新 level 2 | UI:106、350、366；App:396 |
| 14 | surface-overlay | #FFFFFF | Background/Neutral/1 #FFFFFF（Dark #1E243B） | Light 同值同背景职责候选；尚无业务浮层消费，不为未来 Dark 自动选层级 | 未发现固定业务消费；旧色板与 Tailwind 输出 |
| 15 | surface-subtle | #EDF3FA | 局部承载候选 Fill/Neutral/Solid/5 #F2F4FF；整体分区则 Background/Neutral/3 #F2F4FF | 视觉变化；同值的 Fill 和 Background 身份不同，按实际区域角色拆分 | UI:101、156、174、217、415；App:112 |
| 16 | border-default | #D8E3F1 | Border/Neutral/2 #103FB7 /25% 或 /3 /16% | 固定不透明色变 Alpha，真实父面影响外观；输入必要边界与卡片装饰边界不能统一批准 | UI:65、102、175、218、345、360 |
| 17 | border-subtle | #E8EEF6 | Border/Neutral/3 #103FB7 /16% 或 /4 /10% | 视觉变化与 Alpha 合成变化；按分隔线用途确认，不承诺必要边界合格 | UI:416；App:36–37、407、411 |
| 18 | border-strong | #AEC2DD | Border/Neutral/1 #103FB7 /35% | 强边界职责可对应但视觉变化；需要实际底色和必要边界对比度判断 | UI:73、351、367；App:203、716 |
| 19 | action-primary | #1561F8 | 填充候选 Fill/Brand/Solid/2 #1561F8（Dark #266BFF）；Border 无同值项 | Light 填充同值，但实际同名用于边框；不能整项单 Alias | App:1264–1265；旧色板/Tailwind 输出 |
| 20 | action-primary-hover | #0F52DC | 当前 Link 前景候选 Text/Brand/1 #0F55DF；未来填充对应 Fill/Brand/Solid/1 #0F55DF | 视觉变化；Text 与 Fill 的 Dark 又不同，不以同 Hex 合并 hover 配方 | UI:446；tokens.css |
| 21 | action-primary-pressed | #0B45B5 | 无已有、已确认的独立 pressed 档；Link 可先审 Text/Brand/1 #0F55DF，但不能与 hover 自动同档 | 无直接状态映射；需完整 hover / pressed 区分方案，保留旧值 | UI:447；tokens.css |
| 22 | action-secondary | #EDF3FF | 低强调填充候选 Fill/Brand/Solid/4 #E0EAFF | 视觉变化；当前无固定业务消费，不代替 Button 自己的 secondary 配方 | 未发现固定业务消费；旧色板与 Tailwind 输出 |
| 23 | action-ghost | transparent | 无 Category；继续使用原生 transparent | 不需要为了收口制造透明色 Category，保留组件低强调透明状态 | Button:48、53、186、197、208、213、218 |
| 24 | action-danger | #C93842 | 当前图标预览候选 Icon/Red/1 #CA2732；文字需 Text/Red/1；填充需另审 Fill/Red | 视觉变化且旧名宽泛；危险操作填充不可由图标选色推导 | Icons:41；Button danger 使用自己组件色 |
| 25 | action-disabled | #C9D3E0 | Fill/Neutral/Solid/1 #CCD4ED | 视觉变化；此档属于 conditional，需明确 Disabled Recipe 与消费证据 | 未发现固定业务消费；旧色板与 Tailwind 输出 |
| 26 | selection-item | #EAF2FF | Fill/Brand/Solid/4 #E0EAFF | 视觉变化；需 selected 用途和完整选中配方，当前不提前指定默认 | 未发现固定业务消费；旧色板与 Tailwind 输出 |
| 27 | selection-item-hover | #DCE9FF | Fill/Brand/Solid/3 #C6D8FF | 视觉变化；仅作为比选中承载更强的候选，实际 hover/selected 关系待确认 | 未发现固定业务消费；旧色板与 Tailwind 输出 |
| 28 | selection-text | #CFE0FF | 选区背景候选 Fill/Brand/Solid/3 #C6D8FF；旧 border 用法需独立 Border | 视觉变化且跨用途；须与选中文字前景一起检查 | tokens.css；App:489 |
| 29 | focus-control | #1561F8 | Border/Brand 无同值项；若重设计可比较 Border/Brand/1 #3D7BFF | 无保视觉映射；不能为同 Hex 使用 Text/Brand/2 或 Fill/Brand/Solid/2；保留 Focus 合同 | Focus:2、15；UI:77 |
| 30 | focus-item | #1561F8 | Border/Brand 无同值项；若重设计可比较 Border/Brand/1 #3D7BFF | 无保视觉映射；与 control 同色不代表可删除 item 行为语义 | Focus:3、20 |
| 31 | focus-danger | #1561F8 | Border/Brand 无同值项；若重设计可比较 Border/Brand/1 #3D7BFF | 无保视觉映射；保持已确认的品牌焦点，不自动映射 Red | Focus:4、25 |
| 32 | semantic-success | #18794E | 文字 Text/Green/1、图标 Icon/Green/1 均 #058952；Badge 背景需另审 Fill/Green/Solid/1 #0E9954 | 视觉变化且跨职责；新 Green/1 普通文字对白约4.462，配 Green Solid/3 约4.09，均不足4.5；新强绿反白文字也有缺口 | Icons:72；UI:291 |
| 33 | semantic-success-surface | #EAF7F0 | Fill/Green/Solid/3 #E7F9F2 | 弱成功承载职责可对应，视觉变化；不能与 Text/Green/1 自动成为普通文字配对 | 未发现固定业务消费；旧色板与 Tailwind 输出 |
| 34 | semantic-warning | #A55B00 | 边框 Border/Orange/1 #F78600；前景候选 Text/Orange/1 或 Icon/Orange/1 #DD5C00 | 视觉变化且跨角色；Orange 是否承接旧 amber 警告语义需确认；同系弱底普通文字约3.42，不合格 | UI:90、297 |
| 35 | semantic-warning-surface | #FFF4D8 | Fill/Orange/Solid/3 #FFF2EB | 从浅黄转浅橙的视觉变化，警告色系身份与完整配对需确认 | UI:89、296 |
| 36 | semantic-error | #B52A36 | Text/Red/1、Icon/Red/1 #CA2732；Border/Red/1 #F34848；Fill/Red/Solid/1 #E13843 | 视觉变化且至少三种角色，必须拆 Recipe；强 Red 反白普通文字仍不足4.5 | UI:95、160、301；Icons:71；App:661、1324 |
| 37 | semantic-error-surface | #FDECEE | Fill/Red/Solid/3 #FCEDED | 弱错误承载职责对应但视觉变化；Text/Red/1 在该底约4.80，只对该声明配对成立 | UI:94；App:1323 |
| 38 | semantic-info | #1769AA | 无现成 Info Family；若业务决定用 Brand 或 Second，需分别选对应 Fill / Text / Icon | 无直接对应；不能把“都是蓝色”当 Info 与 Brand / Second 语义等价 | UI:287 |
| 39 | semantic-info-surface | #E9F4FC | 无已确认 Info 弱面；Brand Solid/4 #E0EAFF 或 Second Solid/3 #E3E9FC 只能做另行设计候选 | 无直接对应；保留旧值，先确定 Info 色系与用途 | 未发现固定业务消费；旧色板与 Tailwind 输出 |
| 40 | intelligence-foreground | #5644C2 | 无 Violet / Intelligence Category | 无直接对应；保留旧 AI 前景，不拿 Second 蓝色代替紫色 | 未发现固定业务消费；旧色板与 Tailwind 输出 |
| 41 | intelligence-surface | #F2F0FF | 无 Violet / Intelligence Category | 无直接对应；保留旧 AI 弱面，不扩充本批色表 | 未发现固定业务消费；旧色板与 Tailwind 输出 |
| 42 | intelligence-gradient | linear-gradient(110deg, #1561F8 0%, #6857E5 52%, #27A9E8 100%) | 无单一 Category；仍是背景图像 Recipe | 渐变不是颜色原子，保留独立背景图像入口；不能绑一个 Fill | tailwind-theme.css:218–219；旧色板动态展示 |

### 当时的 Component 同值候选

所有下列源定义位于 `packages/foundations/src/tokens.css`，新目标值见 `color-registry.ts:179–190`。下表的“可候选”也不代表已经通过新消费资格；其中 Link 默认文字来源已被本轮 Text/Brand/1 决定取代。

| 旧 Component 变量 | 旧 Light | 新候选 | Dark | 结论和实际消费者 |
| --- | --- | --- | --- | --- |
| --rain-button-secondary-hover-bg | #C6D8FF | Fill/Brand/Solid/3 | #273B7C | 同值同背景职责候选，Button:170；必须留在旧 Light 行为内。现有 hover 前景 #0F55DF 对此底约4.333:1，不足新普通文字4.5，不能据 alias 宣称该配方已合格 |
| --rain-button-secondary-border | #6495FF | Border/Brand/2 | #3054A4 | 同值同边框职责候选，Button:164；真实必要/装饰边界资格需声明 |
| --rain-button-secondary-text | #0F55DF | Text/Brand/1 | #7CA5FF | 同值同文字职责候选，Button:164；TextButton 品牌色由旧别名间接复用（tokens.css）；仍有上述 hover 配对问题 |
| --rain-button-tertiary-text | #495D87 | Text/Neutral/3 | #B7C1E0 | 同值同文字职责候选，Button:186；对白约6.565:1；比起其余项，最适合作为单个 Light 保视觉收口试点，仍需真实状态/表面核对 |
| --rain-button-tertiary-hover-bg | #5075FE /12% | Fill/Neutral/Alpha/4 | #566AB5 /15% | 同源RGB、同Alpha、同背景职责，但必须登记实际父面和Alpha Recipe，Button:192；不能因Light同值自动跟随Dark |
| --rain-link-color | 间接 #1561F8 | Text/Brand/2 | #5188FF | 链接前景同值候选；源不仅 tokens.css，还在 UI:445 的组件规则重新定义，不能只改一处便宣称收口；需完整Link状态关系 |
| --rain-button-primary-bg | 间接 #1561F8 | 仅背景部分与 Fill/Brand/Solid/2 同值 | #266BFF | 暂不整体 alias：Button:142 同一组件变量同时供 bg 和 border；现已引用 brand-primary，没有独立裸值需要删除 |
| --rain-button-primary-hover-bg | #0F55DF | 仅背景部分与 Fill/Brand/Solid/1 同值 | #3C7AFF | 暂不整体 alias：Button:148 同时供 bg 和 border，先处理部件职责 |
| --rain-button-text-default-color | #56688F | 数值相等 Text/Neutral/4 | #949CB8 | 不建议 alias：Button:208 为可点击文字，而该Category档是Weak Neutral；比值够用不能豁免用途资格 |

以下组件颜色无同值公共项，保留旧组件配方：primary-pressed #0E4ACB；secondary base #D3E1FF、pressed #B9CEFF；danger base #EF5353、hover #E24449、pressed/text #C9343F、border #F3BDC0；tertiary border #103FB7 /26%、pressed #5075FE /18%；danger Alpha 及 TextButton color-mix 结果也不按近色替换。`26→25` 或其他Alpha变化属于视觉变化，不算本批纯别名收口。Focus halo、阴影与color-mix仍属于状态/效果配方，不应折叠成普通颜色Category。
