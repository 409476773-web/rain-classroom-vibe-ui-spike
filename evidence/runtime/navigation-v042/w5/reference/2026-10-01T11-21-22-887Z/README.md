# W5 冻结原稿实测规格

仅为 `approved-v0.4.2.html` 的只读基线证据，不是候选实现验收。SHA-256 为 `d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`。原稿在捕获前后校验一致；未修改 HTML、Token、依赖或 Git。

本目录包含 R4 interaction / grading、R5、R6 的 1200/1440/1600 原尺寸画板，以及四个 1440 inverse 状态、R6 form/board/album，共 19 个状态。每个状态从新页面操作并捕获两次，截图 SHA 一致，无页面错误。采用 DPR 1、原生检查模式、字体加载完成后捕获；未 fit、缩放或重采样。完整数据见 `capture-report.json`、各 `*-pass1.json` / `*.fragment.html`；`layout-specification.json` 的坐标已换算为画板原点。截图后的原始 JSON 坐标包含页面展示偏移，不能直接与画板坐标混用。

补充目录：

- `../2026-10-01T11-23-03-349Z/`：R6-table，真实点击「课程任务」。冻结原稿的 R6 默认状态实际是「学习反馈 / 反馈表单」，不能将 default 当成 table。
- `../2026-10-01T11-25-05-492Z/`：R4 切换活动与小组、切换题目与学生；R5 点击第二个回放事件。每个状态两次稳定，断言见该目录 `action-verification.json`。

## 共用外框

所有画板为 width × 800。恢复条高度 48、内边距 `6px 14px`、gap 10，普通按钮高 32。平台 compact 为 64，模块间 Splitter 为 5。一般正文 14/21、字距 normal、前景 `#242833`；页面底色 `#eef1f7`。R4 interaction 和 R5 模块标题栏高 56、内边距 `0 22px`、gap 20；R6 标题栏高 64、内边距 `0 20px`。

## R4 interaction（1440）

- 平台 64；课堂功能 164（min 152）；小组队列 240（min 212）。标题栏从 x64/y48 开始，正文从 y104 开始。
- 完整活动对象卡为 390 × 87、padding `12px 16px`、radius 7、选中 border `#7ea4f2`，同色 0.5px inset；标题 14/20、选中 weight 600，metadata 12/18，字距 normal。
- 下方工作面 x245/y277、1183 × 511；队列 x245/y277、240 × 511；队列头 x245/y317、240 × 138、padding `15px 16px 14px`；队列列表 y455、高272。右侧详情标题 18/27、weight 600。
- 原始活动：辩论赛「大学校园是否应该免费开放」，6组 / 21分钟；小组汇报「从概念到真实应用」，8组 / 36分钟。默认活动第一项，小组第一项，默认小组得分9.0。
- 原稿 DOM 动作：`activity-select` index1 → `group-select` index1；两者分别表达活动身份与当前小组身份，未改变 visibility preferences。

## R4 grading（1440）

- 恢复条后是深色标题栏 x0/y48、1440 × 44、padding `0 21px`、gap18、背景 `#252d40`、文字 `#e1e6f0`。评分上下文 x0/y92、高141、padding `9px 16px 0`。
- 工作区 x0/y233、1440 × 567、padding `0 12px 12px`。只显示 queue240 与 review304，不沿用 interaction 的平台/课堂侧栏。
- 队列 x12/y233、240 × 555、border1/radius8；队列头 y274、高96、padding `15px 16px 14px`；身份对象行 padding `13px 16px`、高80。
- 题卡 260 × 72、padding `9px 13px`、radius7；标题13/20、选中weight600，metadata12/18。题目依次「第一题 · 概念辨析」「第二题 · 案例分析」「第三题 · 综合论述」，批改15/30、22/30、8/30。
- PDF pane x263/y304、850 × 483、padding12；ConnectedSurface x275/y316、826 × 459、radius8；工具条42高、padding `10px 12px`；模拟正文 x275/y400、826 × 375、padding `24px 28px`、13/25.35、`#344255`。
- 评分侧栏 x1123/y304、304 × 483、背景 `#eff2f7`；textarea x1141/y587、268 × 142、padding12、radius6、border `#dce2eb`、13/23.4。
- 六名学生：李梦、欧阳小明、林晓、顾晓梦、陈知行、王思齐；示例分数8.5、7.0、9.0、8.0、6.5、9.5。原稿 DOM 动作：`grade-question` index1 → `grade-student` index2；snapshot question1/student2 已断言。

## R5 replay（1440）

- events228 + Splitter5 + main842 + Splitter5 + knowledge296；三个内容区域从 y104 开始，高696。events min200；knowledge min264/max380。
- 主区 x297/y104、842 × 696、padding20、gap16、背景 `#eceff4`。媒体信息高18；slidecanvas高527、padding12；slide x329/y178.375、778 × 486.25（16:10）、padding36、白底。
- slide kicker 10/15、字距1.5px、`#6881a8`；footer10/15、字距normal。左侧预览行228 × 90、padding `12px 10px`；缩略图92 × 58、padding8、radius3、border `#dce4f1`。
- 控制区 x317/y701、802 × 79、padding `13px 16px`、radius6、白底、12/18、`#586c87`。
- 四事件：00:00课件、08:56课件、16:24习题、22:00课件。点击 `replay-seek` index1 后，两侧选中索引均1，时间08:56/25:00，幻灯片标题「戴维南定理与模型边界」。这是 seek 同步，未自动启动播放。

## R6 default form（1440）

- global64/context216/Splitter5 → header x285/y48、1155 × 64；directory190/Splitter5 → nestedmain x480/y112、960 × 688。
- ConnectedSurface track44；工具条 x480/y156、960 × 44、padding `0 16px`；fields188/Splitter5 → canvas x673/y200、767 × 600、padding24。
- paper x716.5/y224、680 × 653.09375、radius9、border `#e1e5ec`、shadow `0 3px 16px rgba(51,67,92,.02)`；cover678 × 72、padding `18px 30px`、背景 `#e9effb`；body678 × 579.09375、padding `28px 32px 32px`。
- 标题22/30、weight600、`#26344b`；正文14/21、字距normal。input614 × 40、padding `9px 11px`、13/20；textarea614 × 80、同padding/radius6/border `#d7dfe9`。radio14 × 14，选项竖向间隔32。
- 默认课程「高等数学A」，第二个单选「基本理解，需要更多练习」已选。页面和视图动作分别为 `r6-page`、`r6-view`；实现应使用稳定ID，不照搬中文值作为持久化身份。
- board/album 原稿通过视图真实点击打开；切换后 fields 不适用，主区恢复相应宽度。表格基线必须使用补充的 R6-table 捕获，不使用 default form 的截图。

## 实际打开与复核

浏览器地址：`http://127.0.0.1:5199/reference/approved-v0.4.2.html`。现有脚本以 `YKT_DEBUG.navigate(asset)` 选择资产、清理临时会话、配置 native 画板，然后点击真实 `[data-action="recipe-mode"][data-key="r4mode"]` 与上述真实 DOM 控件。需要复核时运行已有 `scripts/navigation-v042-w5-reference.mjs`；可用 `RAIN_REFERENCE_CASES` 筛选单项，所有输出自动写入新时间戳目录。不得修改冻结 HTML。

这些观测供组件化实施对照；候选交互、键盘、数据恢复、拖拽和 N01–N32 仍需在候选实现单独验证。
