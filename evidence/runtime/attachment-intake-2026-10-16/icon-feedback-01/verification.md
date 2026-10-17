# 添加图标反馈

2026-10-16 用户要求截图所示添加图标统一使用图1 `icon/add-bold`。Prototype Mode，当前附件预览局部选择。

只修改 attachment-intake.tsx：单图标导入与两个实例从 AddCircleOutlineIcon 改为 AddBoldIcon。普通列表、弹窗、详细工作流共用同一按钮实例；媒体添加位共用另一实例。用户本轮明确指定覆盖当前入口的默认集合添加选型，不改全库图标目录、来源或语义规则。

实际运行 Playground 类型检查，退出0；独立只读核对当前附件页无其他圆圈加号遗漏。原生浏览器查看列表按钮及媒体添加位，DOM确认三处已渲染添加入口使用 icon/add-bold。截图为 list-entry.png、media-entry.png 与 list-context.png。未为此图标替换新增测试或重跑上一轮286单元/30浏览器检查。

当前源文件仅3行变化，修改前内容经反向补丁还原并匹配前轮绑定的SHA256。当前 Human Gate、发布等状态沿用此前独立状态。
