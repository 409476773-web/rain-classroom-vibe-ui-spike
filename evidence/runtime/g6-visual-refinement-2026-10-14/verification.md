# G6 文档视觉精修 · 第二轮验证

用户在五页视觉审查后授权“开始按顺序处理”。本轮完成计划中的五项页面私有试改，工作目录为 `.worktrees/card-v2`。工作区已有大量其他任务的改动，本轮用 `before/` 固定相关页面基线，未重置、提交或推送。

## 已完成的调整

1. Message/Bubble 正文段距由实际 0px 修复为 12px；“返回最新”移到正文之外的独立 32px 底栏，390px 宽度下不再覆盖回答。
2. 简化展示页重复场景标题、分隔和元信息。完整课程答疑、讨论保留业务标题。来源与回答动作合并为紧凑尾部；图标按钮使用公开 leadingIcon 接口。
3. 同作者续条沿同一正文起点阅读。讨论动作在宽屏细指针下通过 hover/focus-within 显示；窄屏和粗指针保持可见。回复、赞同及键盘入口仍保留。
4. 会话面板随视口调整高度；空输入框从单行开始，随内容增长至四行高度上限 112px，超出后内部滚动。普通 Enter 换行，清空后收缩。120 字反馈字段改为真实多行 textarea，保留引擎 ref/name/FormData、校验、草稿与提交行为。
5. Message 试改示例统一头像和身份起点；公共默认保留为明确标注的独立对照。七种 Bubble 表面使用相同示例尺寸，名称置于气泡外。

## 自动检查及源码复核

- 三个相关页面测试文件通过：38/38（页面组合 16、课程/讨论 11、反馈 11）。结果见 `page-tests.json`。
- 课程/讨论最终定向复查 11/11 通过。新增回归覆盖 textarea 增长/收缩和资料展开后的真实滚动引擎行为；反馈新增回归覆盖普通 Enter、多行 FormData 和草稿恢复。
- Playground 类型检查及构建成功，见 `build.log`。构建仍报告现有部分资源块大于 500 kB 的警告。
- 24 个 G6 公共源文件最终 SHA-256 与本轮开始前一致，见 `public-source-before.json` / `public-source-final.json`。本轮未修改公共默认、依赖或验收 Gate。
- 独立只读源码复核：资料展开使用公开 scrollToMessage；Content 顶部 padding 补偿与 @shadcn/react 0.3.1 的目标位置公式一致。历史 prepend、新轮定位和返回最新沿用原引擎。

## 浏览器证据

本轮实际操作了本地 `5216` 预览，截图位于 `screenshots/`：

- `01-message.jpg` / `11-message-final.jpg`：最终 Message 核心示例。最终 767×797 的计算值见 `message-final-facts.json`：P/DL/P 顶部间距为 0/12/12px；头像 align-self 为 flex-start，transform 为 none；页面无水平溢出。
- `02-course.jpg` / `03-course-narrow.jpg`：1013×797 与 390×844 的课程样板。桌面面板 530px、窄屏 540px；返回最新置于独立底栏，输入和发送操作在面板内。普通 Enter 未发送，输入由 40px 增为 64px，清空回到 40px。
- `04-discussion.jpg` / `05-discussion-narrow.jpg`：宽屏按需工具与窄屏可见工具。实际键盘焦点能显露动作；窄屏页面宽度为 390px，无横向溢出。
- `06-feedback-narrow.jpg` / `07-feedback-completed.jpg`：反馈真实多行输入、120 字限制、带换行的草稿保存/恢复，以及提交后的摘要和焦点。摘要使用 pre-wrap 保留换行。
- `08-bubble-variants.jpg`：七个表面在 1013px 视口下均为 212.75×64px，名称不再影响气泡尺寸。
- `09-marker.jpg`：简化场景上下文后的日期、系统信息与失败标记。
- `10-source-expanded.jpg`：来源展开后可继续阅读和返回最新。

资料展开额外回归：原底部跟随使触发器向上跳动约 240px。首次补偿遗漏 20px Content padding，补入真实几何后测试先失败（top 230→250），修正后通过。最终浏览器 767×797 下，点击展开前后触发器相对视口 top 均为 232px，scrollTop 均为 645，焦点仍在触发器；见 `source-expansion-facts.json`。键盘 Enter 可折叠和再次展开，返回最新恢复至 scrollTop 885=maxScrollTop。键盘折叠后的相对 top 224.5px 也如实保存在记录中，不将该样本表述为键盘路径零位移。

以上为本地实现、定向检查及浏览器抽查；不代表人工视觉接受、Safari/VoiceOver、实体触屏、真实中文输入法或完整对比度验收。
