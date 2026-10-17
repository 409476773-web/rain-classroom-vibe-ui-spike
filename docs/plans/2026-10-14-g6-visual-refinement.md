# G6 文档视觉精修 · 第二轮

授权：用户在五页视觉审查后指示“开始按顺序处理”。沿用 card-v2 的页面私有试改，不调整公共组件默认、验收 Gate、依赖或 Git 提交状态。

工作模式：Prototype Mode / local-experiment。依据本轮实际截图、Rain Designer 和已确认字体/语义 Token；保持 16/24 标题与 15/26 长阅读。

## 执行顺序

1. 修复实际正文段距为 0 的局部 CSS 冲突；把返回最新移出正文覆盖区，复查窄屏。
2. 减少组件展示页的重复场景标题与分隔；完整答疑/讨论保留业务标题。回答来源与动作组成紧凑尾部。
3. 讨论分组续条保留连续阅读；逐条动作变成轻量、按需显示的工具区，键盘与触屏仍可访问。
4. 会话面板使用随视口调整的高度，空输入器从较紧凑面积开始增长；120 字反馈改用真正的多行输入并保留原引擎的 name、校验、状态和 FormData。
5. 统一试改 Message 示例的身份起点，单独明确标识公共默认对照；七气泡表面使用同尺寸内容与外置名称，保留公共样式与变体。

## 文件与分工

- 主代理：g6-message-showcase.tsx/css、g6-conversation-pages.tsx/css/test。
- 会话场景：g6-course-conversation.tsx/css/test；先修遮挡，再调整密度与输入区。
- 反馈场景：g6-feedback-scenario.tsx/css/test；先补多行数据回归，再实施。
- 只读复核在整合后进行。

## 验证

纯样式/排版通过当前浏览器的实际计算值及宽窄屏截图验证，不添加镜像样式断言。多行字段、动作入口和输入增长等行为变化使用有意义的定向回归。最终运行三个相关测试文件与 Playground build，检查公共源哈希。本轮基线与证据存入 evidence/runtime/g6-visual-refinement-2026-10-14。

不将浏览器抽查或自动测试升级为人工视觉接受、全库或无障碍验收。

## 执行结果

五项按顺序完成，并补齐资料展开后的阅读位置回归。三个相关测试文件 38/38 通过，Playground 类型检查与构建成功，24 个 G6 公共源文件哈希保持不变。宽窄屏预览、实际操作和独立源码复核已记录；具体结果与未覆盖项见 `evidence/runtime/g6-visual-refinement-2026-10-14/verification.md`。本轮保持页面私有试改，未迁入公共组件或修改验收状态。

## 第三轮 · 授权与优先级

用户进一步授权“继续自行对比成熟产品和优秀组件库，复查这一轮调整后的页面，把剩余的视觉问题按优先级继续处理”。沿用五页 Prototype Mode / local-experiment。基线和增量验证沿用原证据目录下 `round-3/`，不创建公共视觉规则。

实际复查：767×797 的 Message/Bubble/Marker、课程与讨论，以及反馈浅/深色；正文已是 15/26，段距 12px，无需重复改。比较依据为 Rain Designer v0.5 §§1–6、当前原型设计入口和 G6 合同；外部核对 Ant Design X Bubble Footer 实际示例、Sender 官方文档、shadcn Field，以及 Slack Threads、ChatGPT Sources、Intercom CSAT 的官方信息关系。参考默认视觉不替代 Rain Token。

按优先级处理：

1. **P1 阅读空间**：讨论正文当前因隐藏工具固定少 108px。首作者行将紧凑动作归入身份行的右端，仅身份行预留位置；连续作者条保留正文之后的轻量动作。宽屏保留 hover/focus-within，窄屏保留可见动作，不改变每条消息的回复/赞同含义。
2. **P1 状态归属**：提交失败提示现在位于草稿操作之后。将提交失败归入提交动作区，普通草稿提示仍跟随草稿操作。用行为回归检查提示位置、唯一 alert、答案保留和重试。
3. **P2 可读性与辨识**：附件两行文字当前均为 12/15，局部改为标题 13/20、说明 12/20；首次作者使用公开导出的既有教师/学生头像资产，续条不重复头像。Feedback 未选中指示在浅/深色中较弱，局部加强指示边界；短标签多选题采用更轻表面，与带说明的单选卡保持语义差异。
4. **P2 回复上下文**：复查回复加资料和多行输入的组合；仅在实际发现拥挤/错归组时修改。

验证：纯视觉变化使用相同窗口前后观察、实际计算值及必要窄屏/深色状态；提示归属等行为变化补有意义的回归。最终复查相关测试、Playground build、公共源哈希。字体/资产加载与视觉观察分开核对，不将自查表述为人工视觉接受。

### 第三轮执行结果

完成上述精修，并将实际复查发现的“窄屏长回复＋附件导致输入区超宽裁切”提前作为 P1 修复。三个相关页面测试文件 39/39 通过，Playground 类型检查与构建成功，36 个公共源文件哈希保持不变；实际检查了宽窄屏、反馈深色/焦点/失败/完成，以及回复加资料的真实发送和来源展开保位。具体对照、截图与未覆盖项见 `evidence/runtime/g6-visual-refinement-2026-10-14/round-3/verification.md`。

## 第四轮 · 状态与长内容

用户指示“继续下一步”，沿用页面私有试改和此前视觉精修授权。优先补查深色、紧凑密度、长文件名、四行草稿及生成/停止/重试状态，基线存入同一证据目录 `round-4/`。

已观察：767px 深色紧凑下 Message/Bubble 的正文仍为 15/26，头像和变体无新遮挡；390px 长回复＋长文件名表单宽/scrollWidth 均为 356px，移除操作仍在屏内，但 628px 的名称被压到 194px 单行，完整版本/后缀缺少可视查看入口。Message 失败样本尚沿用公共默认 Footer 字重及普通重试按钮，与本页其他动作的轻量排版不同。

实施范围：仅为课程/讨论私有 Material 的名称复用公共 Tooltip，支持悬停和键盘焦点查看原名称，保持单行资料卡、移除和发送合同；Message 失败样本沿用本页 Recipe，重试采用已有 compact 配方与 Refresh 图标。标题查看增加一个有明确阅读目的的焦点位置，不改变文件读取或请求逻辑。其余状态以实际复查决定，不为补齐数量而增加样式。

验证：先补完整名称查看及原文件名保留的行为回归，再实施；实际检查窄屏长文件名、Tooltip 焦点/关闭、移除与发送，以及停止/重试和四行输入的纵向布局。保留原阅读字号、公共组件、36 个公共源文件哈希和验收状态；最终运行定向测试与 Playground 构建。

### 第四轮执行结果

完成完整资料名称的 Tooltip 入口与 Message 重试排版；实际复查深色、紧凑、长文件名、回复加资料和四行输入、生成/停止/重新生成与重试成功。40/40 定向检查、Playground 构建及最终类型检查通过，36 个公共源文件哈希保持一致。扩展上下文允许场景增高、页面纵向滚动，阅读区不被压缩至不可用；具体实测与边界见 `evidence/runtime/g6-visual-refinement-2026-10-14/round-4/verification.md`。

## 第五轮 · 短窗口与名称阅读

用户要求“继续下一轮”，沿用五页私有试改授权。320×568 下长字串草稿、回复的表单未见横向超宽；320×256 的短窗口中，合法 244 字节 ASCII 文件名提示实测高 334px，top 148 / bottom 482，后半名称落在屏外。保留失败截图与计算值于 `round-5/`。

本轮仅将 Material 的完整名称入口从 Tooltip 改为已有 Popover：名称继续单行省略，点击或键盘激活打开可聚焦、可滚动的完整名称，Escape/外部点击关闭。直接复用公共 Popover 的 available-height、portal、overflow 与焦点管理，不添加第二套浮层或修改公共默认。标题入口采用明确 button 语义和 type=button，避免表单误提交；按当前 Rain Token 维持资料文字层级。

判断依据：Rain Designer v0.5 的可操作暗示、关闭恢复与长内容复查；[Base UI Tooltip](https://base-ui.com/react/components/tooltip) 对空间有限的重要说明建议内联或 Popover，[Popover](https://base-ui.com/react/components/popover) 提供按钮锚定的可访问浮层。本库真实源码已有纵向可用空间与滚动约束，样式仍由 Rain 决定。

先补课程和讨论两种表单的键盘打开、不误提交、Escape 焦点恢复、移除时清理回归；实际核对短窗口滚至后缀、窄屏深色及原文件名发送。未复现问题不为迭代数量增加修改。

### 第五轮执行结果

完成名称查看层、焦点框防裁切与移除资料后输入恢复。320×256 实际键盘可在视口内滚至文件后缀，深色/紧凑/窄屏及已发送资料名称保持正常。三个相关页面文件 41/41 通过；另补一行其他抽屉测试的 this 类型以解除最终构建阻断，7/7 辅助回归通过。最终 Playground 类型检查和构建成功，36 个公共源文件哈希一致。范围、参照、失败与完成证据见 `evidence/runtime/g6-visual-refinement-2026-10-14/round-5/verification.md`。

## 第六轮 · 2026-10-15 · 消息连续性

用户要求继续对比成熟产品和优秀组件库，按优先级处理剩余视觉问题。继续五页 Prototype Mode / local-experiment，页面源和 36 个公共源在 `round-6/` 固定基线；公共资产与验收状态不变。

已实际查看五页首屏、Questionnaire 条件题/多选/补充/提交摘要，以及 390px Message 与 Marker。Questionnaire 完成后已替换原表单，没有重复的成功卡和旧编辑表单；本轮没有为换外观重做这些流程。

**优先修复连续消息的错误视觉线索**：390px 下 Message“连续同发送者”第二、三条无头像内容，但仍画出 32×32 的浅色空圆点；组间距为 24px，与不同发送者的消息轮次相同。它们正文虽同列，整体仍像缺少头像的独立消息，削弱了同一发送者的连续关系。

范围：仅给该连续回答组增加页面私有类；空头像占位保持横向 32px 但不绘制、不撑高，组内间距采用已有 8px Token。首条头像、身份、15/26 正文与 40px 正文缩进保留；不同发送者仍使用原轮次间距。纯排版通过同尺寸截图和实际计算值验证，不新增镜像 CSS 断言。继续运行三个相关页面测试与 Playground 构建。

外部依据：[Ant Design X Bubble](https://ant-design-x.antgroup.com/components/bubble) 的身份/内容/尾部独立组织，[Slack 消息显示](https://slack.com/help/articles/213893898-Change-how-messages-are-displayed) 对发送者辨识与密度的区分，[shadcn Field](https://ui.shadcn.com/docs/components/base/field) 的字段/说明/错误归组。由这些信息关系和 Rain Designer v0.5 推导本页取舍，不照搬外部头像尺寸、颜色或消息间距。

### 第六轮执行结果

完成连续回答组的空头像防误认与组内节奏修正。390px 前后正文左缘保持 73px，续条高度由 32 降至正文自然的 26px；320px 深色紧凑下第三条自然换为两行 52px，字号/行高仍 15/26，无横向增宽。41/41 定向检查与 Playground 构建通过，36 个公共源文件哈希一致。具体比较和边界见 `evidence/runtime/g6-visual-refinement-2026-10-14/round-6/verification.md`。

## 第七轮 · 2026-10-15 · 持续反馈的可见性

用户继续授权五页视觉精修。沿用 Rain Designer 和 Prototype Mode；`round-7/` 固定页面/公共源基线，修改前已查看宽屏讨论、引用、赞同与两处有帮助。

**优先问题**：1280px 下王同学消息已 `aria-pressed=true`、文本“已赞同”，但鼠标/焦点离开消息后 Footer opacity 为 0，选中反馈整体消失。Bubble 的已选按钮根节点虽为品牌色，实际 label/icon 仍为中性色，移出后背景透明；课程“已反馈有帮助”也只改变文字，缺少与 Bubble 对应的选中外观。

处理范围：给上述三处按钮复用页面私有 Button Local Recipe，按已存在 pressed 状态，以 Rain 品牌文字和轻背景表达选中，明确覆盖 label/leading-icon Part；不改变事件、计数或状态归属。桌面讨论动作的按需显隐从整个 Footer 调整为单个按钮；已选反馈保留，其他动作仍随行 hover/focus 出现。窄屏及粗指针保持全部动作可见。保留焦点、取消选中及恢复后普通外观。

比较依据：[Base UI Toggle](https://base-ui.com/react/components/toggle) 对持续 on/off 状态的表达；[Discord Replies](https://support.discord.com/hc/en-us/articles/360057382374-Replies-FAQ) 保留回复上下文；[Carbon Inline loading](https://www.carbondesignsystem.com/building-blocks/core/components/inline-loading/guidelines) 对就地状态与操作归属的指导。具体颜色、字体、层级由 Rain 决定。引用与请求状态继续复查，不因研究列出参考而强制修改。

验证：实际执行选中、移开鼠标/焦点、键盘取消、不同消息独立状态，以及窄屏/深色；确认布局不跳动，普通动作可达。纯样式不增加镜像断言；运行既有三个相关页面测试与 Playground 构建，核对公共源哈希。

### 第七轮执行结果

已选赞同在失去行悬停/焦点后持续可见，普通动作仍按需出现；三处消息反馈共享页面私有 Button Recipe，实际文字和图标均消费选中色。已验证键盘进入/取消、历史载入后的状态归属、390px 深色与 320px 深色紧凑，未改变原布局尺寸或事件。41/41 定向检查与 Playground 构建通过，36 个公共源文件哈希一致。具体前后比较见 `evidence/runtime/g6-visual-refinement-2026-10-14/round-7/verification.md`。

## 第八轮 · 2026-10-15 · 空会话与返回入口

沿用五页 Prototype Mode 和 Rain Designer，`round-8/` 已固定 13 个页面文件与 36 个公共源文件基线。实际复查课程空会话：390×844 下没有消息，但 290px 阅读区有 396px 内容（106px 多余滚动），由空态被当作列表子项及旧锚点 spacer 共同造成；历史入口仍占 26px。返回按钮已是引擎 `data-active=false` / inert / tabindex=-1，但公共 Button 的 opacity utility 覆盖了公共组件层隐藏样式，视觉仍显示“返回最新”。

优先处理这两个已复现问题：空会话作为页面私有空态替换阅读列表及其历史/返回操作；首问出现时挂载原有 Viewport/Content/Item，不重建 Provider、输入区或第二套滚动机制。空态继续使用现有文案和示例问题，按阅读栏宽度和 Rain 间距排版，取消固定 240px 最小高度。课程和讨论的返回操作按原生 `data-active=false` 隐藏，保留有消息时的 32px 操作栏以免阅读高度随显隐改变。

依据：[Carbon Empty states](https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states) 对空态替换原列表、移除无内容表头/页尾、明确下一步的指导；颜色、字号、间距仍由 Rain 决定。已只读核对安装的 @shadcn/react 0.3.1：引擎将 Content 直接子元素计入列表并生成 spacer，Button 自行管理 active/inert。仅修正页面组织与私有 CSS，不改公共组件或依赖。

验证：先补空态到首问的真实宿主生命周期回归（示例填入、焦点、未自动发送、首问唯一、可停止）；实测空态无多余内滚动，正常消息仍可返回最新、回到底后操作隐藏；覆盖窄屏、短窗口、深色及默认视口。运行三个相关页面测试和 Playground 构建，核对公共源哈希。

### 第八轮执行结果

课程空态改为独立呈现，390px 下原106px多余内部滚动已消除，历史及返回入口不再出现在空会话。课程/讨论返回到底后隐藏无效操作，阅读区和32px操作栏高度稳定，向上阅读后入口恢复。已实际验证首问与两次重复清空/停止、宽屏、320px深色紧凑和短窗口输入可达；42/42定向检查、Playground类型检查及构建通过，36个公共源哈希一致。新增的源码复查未发现阻断项；第二问停止后的原生滚动组合观察不据推测改引擎。具体证据与边界见 `evidence/runtime/g6-visual-refinement-2026-10-14/round-8/verification.md`。
