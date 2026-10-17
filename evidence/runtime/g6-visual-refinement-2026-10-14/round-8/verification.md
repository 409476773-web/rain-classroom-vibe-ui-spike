# G6 视觉精修 · 第八轮 · 2026-10-15

本轮继续五页 Prototype Mode / local-experiment；落实课程空态与两种会话返回入口的页面私有修正。服务仍是 card-v2 的 Playground，`http://127.0.0.1:5216/#message-scroller`。未改公共默认、Token、依赖或 Gate 状态；未执行 Git 提交、切换或清理操作，既有脏工作区保留。

## 比较与取舍

[Carbon Empty states](https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states) 建议空态替换无内容的列表及其附属结构，并把下一步行动讲清楚。本页沿用现有文案与示例问题，将关注点留给首次提问。Rain 仍决定字号、间距和颜色；不引入外部默认样式或装饰插图。

修改前已只读核对本地固定版本 @shadcn/react 0.3.1：Content 将其直接子项纳入阅读几何，管理自己的 spacer；Button 自行设置 data-active/inert/tabindex。页面不增加另一套滚动控制。

## 已复现问题及修正

1. **空态的多余滚动及无关操作。** 390×844 浅色标准密度，没有任何消息，阅读区仍为 290px / scrollHeight 396px，多余 106px；空态自身 240px，旧 spacer 86px、历史入口 26px。改为页面私有空态替换 Viewport/Content/历史/返回操作，首问时重新挂载原列表；Provider 与输入区保持实例。移除固定最小高度，按 720px 阅读栏与 Rain 间距排版。修改后可用空态区为 322px / scrollHeight 322px，无多余内滚动。
2. **失效的返回操作仍显示。** 实测 data-active=false、tabindex=-1 的按钮仍 opacity1，公共 Button utility 覆盖组件层透明样式。本轮仅给课程和讨论页面的 inactive 返回按钮设置 visibility:hidden，保持有消息时 32px 操作栏，避免显隐改变阅读高度；active 状态及事件仍由原生引擎管理。

## 验证结果

- 新增宿主生命周期回归先失败于旧空态仍在 log 中；实现后连同既有三文件检查，**42/42 通过**。覆盖 CTA 仅填草稿、焦点交给原输入框、尚未发送、首问唯一、原 log 挂载、停止后焦点恢复。
- 真实页面点击 CTA：完整问题填入且输入聚焦，消息仍为0；发送后恰有1条问题与对应回答，正常生成。
- 课程返回最新：scrollTop 26→931，阅读区高度始终290，操作栏始终32；active true/visible→false/hidden。键盘 Home 向上阅读后，active/visible 恢复。讨论返回后为 scrollTop312、active=false/hidden、阅读区290、操作栏32。
- 1280×900 浅色标准：空态栏宽720，342px / scrollHeight342，零横向溢出。
- 320×600 深色紧凑：空态区326px / scrollHeight326，宽286 / scrollWidth286，正文自然换行，零横向溢出。
- 320×256 深色紧凑：空态内部仍无溢出，输入可通过页面滚动正常到达并聚焦；不声称整个540px样板能同时装入256px窗口。
- 两次重复“清空→首问→立即停止”：问题顶缘距阅读区20px、scrollTop26、状态stopped，焦点均回到输入。随后第二问仍唯一追加、可停止；停止后的顶缘52px、spacer高度0，作为既有滚动/状态组合观察保留，未证实为本轮回归。限定源码复查也未发现需阻断的问题，不据推测修改引擎。
- Playground 类型检查及生产构建通过；保留既有较大 bundle 提示，不扩展本轮范围。
- `public-source-before/after.json`：**36/36 公共源哈希一致**。`page-source-before/after.json`：13文件中只改同名课程 tsx、css、test 三文件。
- 浏览器窗口临时覆盖已 reset，交付 tab3 保留在课程空态。最终观察到实际视口390×844。

## 证据与范围

- `empty-before.json` / `empty-after.json`：空态前后几何。
- `course-latest.json`：课程返回入口状态及布局前后。
- `short-window.json`、`repeat-empty-first-question.json`、`repeat-second-question.json`：短窗口及重复会话观察。
- `screenshots/empty-narrow-before.jpg` / `empty-narrow-after.jpg`：同尺寸空态比较。
- `screenshots/empty-wide-after.jpg`：完整宽屏结果。
- `screenshots/empty-320-dark-compact.jpg`、`empty-short-composer.jpg`：深色/紧凑/短窗口。
- `screenshots/course-latest-hidden.jpg`、`empty-default-final.jpg`：返回后与最终状态。

本轮证据限于页面私有实现、定向测试和当前 IAB/Chromium 实际浏览器，不代表全库回归、Safari/辅助技术覆盖、公共组件验收或 Human Gate。
