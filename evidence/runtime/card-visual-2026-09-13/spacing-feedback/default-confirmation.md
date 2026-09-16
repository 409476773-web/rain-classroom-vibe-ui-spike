# Card 默认内边距确认

2026-09-13，用户在20px候选交付后回复“确认”。本轮读取当前页面为20px，浅色、上图下文、普通宽度、同色Footer；记录本轮间距方案的局部视觉确认，并将公共default设为20px。

实现：公共Card根默认Space/20，sm仍Space/12；主要区块最多16，字段组12，字段内8，标题说明4。预览文字、嵌套隔离说明、Manifest与默认值检查同步。整体Card候选及未决验收状态不变，无Git提交或发布。

本次同步检查：类型、构建、治理通过；Card/Core UI生产浏览器10/10通过，包含五档80实例矩阵、嵌套默认20px与sm12px、5299独立原型默认20px，以及既有控件回归。当前5298页面已刷新并显示“间距已确认 · 组件候选”。

日志：`default-typecheck.log`、`default-build.log`、`default-governance.log`、`default-browser.log`；截图和矩阵见 `default-confirmed/`。命令沿用上一轮，浏览器输出改为本目录下default-confirmed，未覆盖先前证据。

本次没有重跑全库单元、追加独立代理审阅或扩大辅助技术/对比度验收；上一轮独立复核保留原批次身份。确认范围为当前间距方案及20px默认选择，其他Card未决项仍按原记录管理。
