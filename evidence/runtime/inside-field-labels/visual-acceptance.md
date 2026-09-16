# 框内固定标题视觉确认

- 日期：2026-09-14。
- 决策来源：用户在查看已调浅的 Input / SearchInput / Select 框内标题与表格筛选组合后，明确回复“确定，没问题。”。
- 范围：`input-search-input-select-inside-labels-runtime-visual-only`。接受本轮固定标题呈现、Text/Neutral/4 的视觉层级以及既有常规32px/紧凑28px的同排组合效果。
- 当前实施和实际测量见 [颜色续调验证](lighter-color/verification.md)；首批功能记录见 [验证记录](verification.md)。
- 本次仅登记 insideFieldLabels 子状态的 Human Gate accepted；不覆盖 Table、其他组件或全库的独立验收。
- 颜色测量继续保留1项临界对比度与84项弱色适用性 pending，independentReview findings、contrastAcceptance not-granted。未把视觉确认转为对比度例外接受。
- 无产品代码、Token值、尺寸或交互变更；无发布、业务迁移或Git操作。

登记后精确范围/旧基线测试10/10通过（2.69s，[日志](acceptance-unit.log)），完整治理核验通过（[日志](acceptance-governance.log)），差异空白检查通过。既有浏览器结果保留，不为纯验收记录重复运行界面测试。
