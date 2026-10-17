# G6 第六轮 · 连续消息的视觉分组

日期：2026-10-15。用户要求继续对比成熟产品和优秀组件库，按优先级修正剩余视觉问题。沿用五页页面私有试改；本轮实际增量仅 `g6-conversation-pages.tsx/css`，不修改公共组件或验收身份。

## 比较对象与判断

本轮实际查看 Message、Bubble、Marker、Message Scroller、Questionnaire 的首屏，并查看问卷的条件补充、多选、文本补充和提交摘要，以及窄屏的长消息、连续消息和会话标记。

外部核查 [Ant Design X Bubble](https://ant-design-x.antgroup.com/components/bubble) 的 avatar/header/content/footer 独立组织，[Slack 消息显示](https://slack.com/help/articles/213893898-Change-how-messages-are-displayed) 对身份辨识和密度的区分，[shadcn Field](https://ui.shadcn.com/docs/components/base/field) 对字段、说明及错误的归组。它们用于理解信息关系，不证明本页必须采用某个像素值；实际取舍仍依据 Rain Designer v0.5 和 Rain Token。

## 本轮优先处理

Message“连续同发送者”首条有真实头像和身份，第二、三条原先没有头像内容，却仍绘制 32×32 的浅圆点；三条之间均留 24px，和上方不同发送者的轮次间距一致。正文虽然同列，空圆点和大间隔仍让续条像缺少身份的独立消息。

仅给该连续组增加私有类，组内使用既有 8px Token；空头像占位保留 32px 横向空间，改为不可见且高度 0。没有删除真实首条头像，也没有给文字增加手工位移。其余不同发送者仍使用 24px 轮次间距，公共默认对照不位于新选择器范围内。

## 前后及变化条件

- **390×844 浅色、默认密度**：三条正文左缘均保持 73px。组内 gap 24→8px，第二、三条高度 32→26px；首条仍高 54px、头像仍 32×32。整个连续组约减少 44px 空间，来自组间距和无内容占位，不是缩小阅读字号。见 `continuation-before.json`、`continuation-after.json` 及 `screenshots/message-group-narrow-before.jpg` / `message-group-narrow-after.jpg`。
- **320×568 深色、紧凑密度**：第一条真实头像可见，图片已加载；第二、三条空头像宽 32、高 0 且 hidden。三条正文均为 15/26、左缘 73 / 右缘 287；第三条自然换为两行、高 52px，未被空头像或固定行高裁切，文档宽为 320px。见 `continuation-dark-compact-320.json` 与对应截图。
- **1280×900 浅色、默认密度**：连续组三条保持共同阅读起点，首条身份只出现一次，续条没有圆点。实测主样板不同发送者 gap 24px，连续组 gap 8px；公共默认对照不匹配新私有类。见 `screenshots/message-group-wide-after.jpg`。
- **其他已查看对象**：Marker 的日期分隔、系统说明、失败状态仍各自关联相应位置，390px 未见新增裁切。Questionnaire 条件题、短多选、补充输入及完成摘要没有出现旧表单与成功摘要并存，本轮未为改变外观而重做流程。截图覆盖所述显示状态，不推论所有交互均通过。

## 检查与边界

- 三个相关页面测试文件 **41/41 通过**；纯样式修正未添加实现镜像断言，见 `page-tests.json`。
- Playground 构建含类型检查，退出码 0；既有大资源块提示保留，见 `build.log`。
- 36 个冻结公共源文件哈希一致；11 个页面基线中仅上述 tsx/css 两个变化，见前后哈希。
- 临时视口覆盖会恢复，交互预览保留。当前实现没有新增交互、依赖、全局规则、发布或 Git 操作。

这是 AI 局部复查，未代表人工视觉接受。实体触屏、Safari/VoiceOver、真实浏览器缩放与完整对比度验收仍未覆盖。外部资料是结构和使用指导的比较，不是本轮完成了这些产品的全界面实测。
