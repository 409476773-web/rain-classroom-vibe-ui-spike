# G6 第七轮 · 持续反馈的视觉状态

日期：2026-10-15。继续五页页面私有精修。本轮优先修正讨论赞同状态不可见，以及三处消息反馈的选中外观没有完整表达的问题。

## 对照与实际问题

- [Base UI Toggle](https://base-ui.com/react/components/toggle) 将按钮定义为持续 on/off 状态，示例用 pressed 状态切换可见图形。这里据此检查既有反馈是否在离开操作后仍可辨认，不更换本库按钮引擎。
- [Discord Replies](https://support.discord.com/hc/en-us/articles/360057382374-Replies-FAQ) 用回复保留原对话上下文；本轮讨论中的作者＋引用文字仍以较小字号、局部浅表面从属于当前正文，所查看状态无需另改。
- [Carbon Inline loading](https://www.carbondesignsystem.com/building-blocks/core/components/inline-loading/guidelines) 强调状态与原操作的就地关系。作为状态检查的参照，本轮没有重新制作所有生成/失败状态的视觉证据；不把先前检查改记为本轮完成。

**修改前，1280×900**：王同学消息的 aria-pressed=true、文本为“已赞同”，但行失去 hover 和 focus-within 后，Footer opacity=0；它与未赞同消息同样看不出反馈。见 `pressed-before.json`、`screenshots/discussion-liked-before.jpg`。

Bubble 已选“有帮助”仅根节点为品牌色，实际 label/icon 仍为 rgb(73,93,135)，鼠标移开后背景透明；课程“已反馈有帮助”也仍是普通中性色。仅检查按钮根节点颜色会漏掉实际文字和图标。见 `bubble-pressed-before.json`、`course-pressed-before.json`。

## 实现范围

1. 页面私有 `g6-feedback-toggle.ts/css` 定义一个 Button Local Recipe，登记 root、label、leading-icon 三个 Part，scope=feature、promotionStatus=not-proposed。仅给 Bubble 有帮助、课程回答有帮助、讨论赞同三处使用。颜色和轻背景来自现有 Rain 品牌语义 Token，标签/图标消费根节点的选中色；移除原先只改根颜色的重复规则。
2. 桌面讨论工具区从整个 Footer 隐藏改为单个按钮显隐：已选反馈持续显示；未选动作在行 hover/focus-within 后出现。粗指针规则作用于按钮，窄屏继续显示全部动作。
3. 不改事件、计数、消息 ID、请求生命周期、焦点引擎或布局尺寸。强制颜色模式使用系统 Highlight/HighlightText，保留公共焦点规则；该模式本轮未实测。

11 个既有页面源中修改 4 个：课程场景 tsx/css、消息样板 tsx/css；新增上述 2 个页面私有 Recipe 文件。没有公共导出、依赖、Token、Gate 或 Git 操作。

## 实际复查

- **宽屏失去焦点和悬停**：Footer opacity=1，王同学已选按钮 opacity=1、pointer-events=auto，背景为品牌浅填充、实际 label 为品牌色；同一行的普通回复按钮 opacity=0、pointer-events=none。已选按钮修正前后均为 51×24px，坐标一致。见 `pressed-after.json`、`screenshots/discussion-liked-after.jpg`。
- **键盘和取消**：从赞同 Shift+Tab 到回复时，回复按钮获得焦点且 opacity=1；Tab 回赞同、Space 取消，再离开该行后，aria-pressed=false，文字恢复“赞同”，普通中性色/透明背景，按需隐藏恢复。见 `feedback-keyboard-cancel.json`。
- **状态归属**：重新赞同王同学、载入更早讨论后，王同学仍 true，其他消息仍 false；课程回答的有帮助保持独立 true。见 `feedback-independent.json`。没有引入跨消息共享选中状态。
- **390×844 深色**：讨论的回复和赞同动作均可见；已选文字为该主题的品牌色，背景为既有浅品牌填充，按钮高 24px、右缘 166px，文档宽为 390px。见 `pressed-dark-narrow.json`、`screenshots/discussion-liked-dark-narrow.jpg`。
- **Bubble 文字与图标**：鼠标移开后，根、label、icon 均为品牌色，浅背景持续存在；字数仍为“有帮助 · 1”。320×568 深色紧凑状态下图标与文字颜色一致、焦点可见；Space 取消后，“有帮助 · 0”、中性图文、透明背景恢复，文档宽 320px。见 `bubble-pressed-after.json`、`bubble-dark-compact-cancel.json` 和对应截图。

上述检查覆盖实际操作和所述显示条件，不代表实体触屏、Safari/VoiceOver、真实缩放或完整对比度验收。引用的外部产品资料用于理解关系，没有将其默认视觉作为 Rain 目标。

## 自动检查

- 三个相关页面文件 **41/41 通过**，见 `page-tests.json`。本轮修正的是既有状态的呈现，未添加 CSS 镜像断言。
- Playground 构建含类型检查，退出码 0；既有大资源块提示保留，见 `build.log`。
- 36 个冻结公共源文件哈希一致；页面增量单列于前后哈希。
- 临时 viewport override 在交付前恢复，保留交互预览；AI 自查不升级为人工视觉接受或公共资产晋升。
