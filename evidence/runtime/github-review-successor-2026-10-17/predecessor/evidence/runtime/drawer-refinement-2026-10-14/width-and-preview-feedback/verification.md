# 中性色导航与调宽反馈 · 2026-10-15

用户10月14日23:39明确要求前后项使用中性色文字按钮，并询问拖动、尺寸展开、预览/查看完整，提出宽多列表格默认窄宽且可展开或拖宽。延续已授权的私有Web右侧详情演示；编辑Dialog保留。

## 实现

- 前后项使用既有Button的text/default配方；保留箭头、首尾禁用和焦点恢复。
- 私有调宽控制器组合现有Rain Resizable，实际尺寸由其onResize回传。默认min(480px,52vw)，有效下限360px，上限可分配视口80%；展开目标min(960px,80vw)，收起回有效默认。任务切换保留宽度，重新打开恢复默认。
- 左边缘拖动调宽与顶部把手向右关闭分开，阅读正文与表格保留swipe-ignore。控制器只在桌面挂载；断点前若焦点位于控制器则交还close。局部col-resize避免引擎全局cursor在卸载时残留；30层级让后开的Dialog覆盖它。
- 内容范围独立：预览为首段与3组；完整为全部段落、交付清单与8组。第2项8列表格用既有Table和原生横向滚动区。纵向snap能力仍在公共Drawer，本轮没有重新验证实际纵向触摸。

## 自动检查

先保留失败再修复：`red-tests.log`记录新增内容/宽度用例失败；`boundary-red-tests.log`记录641px错误展开状态及断点焦点遗失。`green-tests.log`和`green-observer-tests.log`保留JSDOM缺观察器/零几何的失败，不删除或替换。测试仅为当前页补观察器及separator几何，真实拖动/尺寸在浏览器复验。

`unit-tests.log`：三份相关测试共25项通过（详情9、编辑9、G6交互页7）。`typecheck.log`：Playground类型检查exit0。独立消费构建exit0，输出根目录`width-and-preview-build.log`保留既有大chunk提示。未重跑或重绑完整G6检查。

## 浏览器证据

当前实际消费地址：http://127.0.0.1:8768/interactive/。Codex内置Chromium，1440×900、641×844、390×844。实际读取记录在`browser-facts.json`。

- 默认480px和展开960px都保持3组预览；完整模式显示8组而宽度保持960px。
- 原生pointer拖动960→720px；方向键调整720→792px。Home/End得到约1150/360px边界。表格横向滚动后scrollLeft137，详情保持打开。
- 顶部实际把手向右拖动关闭，separator卸载，焦点回当前任务2入口。
- 390px详情/文档均390px，无调宽separator或展开按钮；表格可横向滚动（scrollLeft178.5）。
- 修正后641px默认360px、按钮“展开”；展开约511px、收起360px。持焦separator跨390px断点后，焦点为关闭详情按钮。
- 后打开编辑Dialog为30层，调宽frame同为30；重叠点命中Dialog的Textarea，AX仅呈现编辑弹窗，焦点进入标题Input。关闭后再关闭Drawer，body/root cursor都为auto且separator为0。
- 最终构建再次检查完整8组、任务切换保留960px并回内容预览。

根输出目录保存JPEG：`drawer-width-preview-current.jpg`和`drawer-width-expanded-current.jpg`（1440×900）、`drawer-width-narrow-current.jpg`（390×844）、`dialog-over-width-control-current.jpg`（1440×900）。已查看展开和弹窗覆盖画面；浏览器尺寸恢复，交付页保留。

## 范围与来源

`before-source-bindings.json`及before快照在改动前保存；五份已有文件的before与上轮dialog-and-task-details的after一致。两份调宽helper为本轮新私有文件。`source-bindings.json`绑定当前七份源文件和实际消费产物；OTP/Carousel正文与改动前相同，共享Drawer的tsx/css仍匹配封存来源。

原封存来源记录保留不变。共享Drawer/Dialog运行源码、依赖、Tokens、Manifest/Registry、phase、Figma及Git没有本轮写入；只更新私有示例、局部说明与此次独立记录。当前为本地mock交互演示，humanGate=awaiting_human、publication=unpublished；完整G6来源链not-passing-not-rebound。真实触摸、Safari/VoiceOver和人工视觉验收未在此次检查中完成。
