# G6 视觉精修第三轮 · 对照与验证

授权：用户要求继续自行对比成熟产品和优秀组件库，复查上一轮页面并按优先级处理剩余问题。沿用五页的页面私有 Prototype Mode，实际工作区 `.worktrees/card-v2`。本轮开始固定 11 个页面文件，最终修改其中 8 个；没有修改公共默认、Token、依赖、验收状态或 Git 提交状态。

## 对照依据与实际取舍

读取 Rain Designer v0.5 的视觉、交互、分组、光学检查及交付条目，以及当前 `docs/ai/prototype-design.md`、G6 登记与上一轮证据。保持 Rain UI/Reading 字体、颜色、Focus 与公共组件合同。

| 对照对象 | 官方依据与本地可见问题 | 本轮结果 |
| --- | --- | --- |
| 讨论正文与动作 | 实际查看 [Ant Design X Footer 示例](https://ant-design-x.antgroup.com/~demos/bubble-demo-footer)：内容与外部动作是独立区域，动作可左右排列。[Slack Threads](https://slack.com/help/articles/115000769927-Use-threads-to-organize-discussions)说明 hover 回复归属于具体消息。本地 767px 下，无论动作是否显示，正文都预留 108px。 | 首作者行的动作归入身份行右端，仅身份行预留位置；续条动作留在正文后。正文端侧 padding 108→0px，恢复完整阅读空间。教师和王同学正文从两行变为一行。此排列是 Rain 当前场景的局部取舍，不声称照搬参考默认布局。 |
| 回复、资料与输入 | [Ant Design X Sender](https://ant-design-x.antgroup.com/components/sender)的 Header 组合支持输入上下文与编辑区分组。本地实测 390px 下，回复长消息并附资料后，输入表单宽约 680px，被外框裁切，发送按钮右缘超过屏幕。 | 限制本页 Grid 横向轨道为 minmax(0,1fr)，表单允许收缩，回复摘要采用 border-box。原生输入、回复取消、附件移除和发送均保留。表单回到 356px，发送按钮右缘为 344px。 |
| 题目、选择与错误 | [shadcn Field](https://ui.shadcn.com/docs/components/base/field)分别展示 Checkbox 行、带描述的 Choice Card 及对应字段错误。本地带说明的单选和纯短标签的多选原先使用相同卡片；提交失败显示在草稿操作之后。 | 单选保持说明卡，多选使用较轻表面和原 Checkbox 指示；未选中指示边界改用既有 neutral-2。提交错误移到提交动作下一行，题目切换清除旧提交错误；草稿提示仍归属草稿操作。 |
| 来源与补充反馈 | [ChatGPT Search](https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt)提供回答来源入口；[Intercom CSAT](https://www.intercom.com/help/en/articles/7872853-measure-customer-satisfaction-with-conversation-ratings)在选择后请求补充。这些来源支持归属和步骤关系，未作为本页像素参数来源。 | 保留现有回答来源和逐题补充流程。附件由标题/说明均为 12/15，调整为标题 13/20、说明 12/20。最终提交摘要仍保留换行。 |

其他视觉精修：首次作者使用公开 `avatarAssets` 中的已有教师/学生图片，实际确认载入成功；同作者续条不重复头像。窄屏短问题使用局部 text-wrap:balance，避免末行只有两个字。Message 公共默认对照仍独立保留。Bubble/Marker 本轮复查没有发现需要另加补偿的核心示例问题。

## 实际浏览器检查

使用本地 `5216` 预览和当前浏览器。主要条件：767×797 与 390×844；反馈增加深色和键盘焦点状态。没有使用浏览器外脚本模拟 UI。

- `discussion-before.jpg` / `discussion-after.jpg`：767px 下正文恢复完整空间，王同学工具在身份行末端；键盘焦点使隐藏动作显现，工具与引用/正文不重叠。before 为普通状态，after 含键盘焦点，不作为完全相同状态的像素差异图。
- `message-narrow-after.jpg` / `message-final.jpg`：短问题换行、既有头像、附件标题与说明。实际附件字号/行高为 13/20 和 12/20；窄屏页面宽 390px，无横向溢出。
- `reply-overflow-before.jpg` / `reply-after.jpg`、`reply-layout-facts.json`：修复前表单宽 679.93px、发送右缘 650.93px；修复后表单宽/scrollWidth 均 356px，发送右缘 344px。修复前页面根宽仍为 390px，问题是面板内部超宽后被裁切。回复、资料、两行草稿保留。
- `discussion-sent-narrow.jpg` / `reply-send-facts.json`：真实点击发送并等待新增消息可见。新增自己的消息仅一条，带原引用、资料名和两行正文；输入清空、回复上下文移除，消息右缘 357px，头像已载入。此前一次检查在 500ms 本地等待完成前切页，未将该中途状态作为发送成功证据。
- `feedback-dark-after.jpg` / `feedback-goals-dark.jpg`：单选卡与轻量多选的差别、选中指示和未选中边界。实际 Tab 进入 Checkbox 后 focus-visible 成立，显示品牌边框和原 3px halo。
- `feedback-failure-dark.jpg` / `feedback-completed-dark.jpg`、`feedback-facts.json`：失败 alert 仅一条，位于提交动作区；两行答案保留。返回前题后旧 alert 消失；关闭模拟失败并重新提交后，焦点在完成标题，摘要 pre-wrap 保留换行。表单宽/scrollWidth 均 324px。
- `source-expansion-facts.json`：390px 下展开来源前后触发器相对视口 top 均 242px，scrollTop 均 1003，焦点和 expanded 状态正确；上一轮阅读保位修复仍有效。

## 自动与独立检查

- 三个相关页面测试文件 **39/39** 通过，见 `page-tests.json`。反馈回归强化失败提示归属，新增返回前题后的旧错误清除回归，均确认失败后再修复。
- Playground 类型检查与构建成功，见 `build.log`；保留原有部分资源块大于 500 kB 的构建警告。
- **36 个公共源文件**（原 24 个 G6 文件及本轮涉及的 Avatar/Attachment 源文件）哈希前后一致，见两个 `public-source-*.json`。
- 独立有限源码复核未发现阻塞：正文动作、coarse/focus 入口、横向收缩、图片公开出口、局部附件样式和单一提交错误均保持原行为边界。该复核不替代浏览器检查。

本轮完成本地精修与实际抽查，不将结果升级为人工视觉接受或整个组件库完成。Safari/VoiceOver、实体触屏、真实中文输入法和完整对比度验收未在本轮完成。
