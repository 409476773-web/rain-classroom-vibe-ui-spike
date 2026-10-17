# Review09 R4–R6 局部审查交付

范围仅为 R4 课堂互动/教师批改、R5 回放、R6 反馈表单/表格/状态分组/画册。保留 Review08 的 32/14 图标、14px 文案、Neutral6/regular400 与 BrandAlpha3；本轮不修改共享组件或全局 Token。

## 已修复

1. **R4 批改搜索计数不对应结果**：搜索无结果时，原队列仍显示「6 人」，现显示「0 / 6 人」，清除后恢复「6 人」。
2. **R4 搜索反馈不表达当前情境**：原组件已有「暂无可用对象」空状态，本轮复用 `ObjectNavigator.emptyLabel` 区分「未找到匹配的小组/学生」。未添加重复状态或新增清除按钮。
3. **R6 搜索重复泛化空状态**：原三个导航各显示「暂无可用导航」，同时保留栏目名。全零匹配现合并为已有 `Empty/EmptyTitle` 的单一文本反馈，部分匹配仅保留命中组，默认内容不变。沿用 Input 既有清除动作，草稿和当前内容不重置。

## Token 消费决定

方法采用信息设计 V01：按表面、文字层级与状态职责选择现有颜色家族，通过实际颜色与几何比较检查；尚未经人工确认，不升级全库默认。

R5/R6 的主要阅读表面、画布、主次文字、时间轴选中态、分隔线、表单输入、表格/看板/画册、既有按钮状态接入现有 Category Tokens。几何、字号、行高、数据、定制课件图案和交互状态保持原样；R4 Review08 规则完整保留。原生回放条的 16px 命中区和 4px Token 轨道沿用 Review07。

`palette-before.json` / `palette-after.json` / `palette-comparison.json` 记录六个场景，63 个节点的颜色变化、0 个尺寸/字号/行高/内边距变化。实际 S6 深色外框的平台 theme 为 dark，正文仍消费浅色 Neutral1（rgb20/35/70）。R6 没有 GUI inverse 开关，不声称实际验证该 prop 的浏览器组合。

## 验证证据

- `empty-unit-red.log` → `empty-unit-green.log`：3 个新测试先失败，13 个 owner 单元测试随后通过。
- `after-results.json` / `after-browser.log`：29 个场景通过；其中七种视图 ×1200/1440/1600 为21个，另4个业务交互与4个480px短窗口场景；0 pageerror。
- `empty-after-results.json` / `empty-after-browser.log`：三种空搜索 ×三宽度，9 个场景通过；0 pageerror。Input 清除搜索后保留草稿/过滤/当前对象。
- `palette-*.json` / `palette-*-browser.log`：6组实测，包括R5、S6 inverse、R6四视图；0 pageerror。
- `before/` 与 `after/`：三宽完整页、扩展交互、空搜索与调色前后截图；关键见 R4-grading-search-empty-1200、R6-workspace-search-empty-1200、R5-replay-light-palette-1440、R6-form-light-palette-1440。
- `owner-report.json`：真实问题、原因、修复、最终3个source SHA、检查范围和未验证项。

初次审查 driver 的诊断保留于 `before-results.json` 和 `before-browser-interactions.log`：材料 Tabs 使用手动激活，ArrowRight 仅移动焦点，Enter 才选择。初次期待自动选择为测试错误，后续按原合同操作通过，未修改产品。首次默认截图阶段完成21张后中断，未冒称该旧进程完整通过。

## 范围边界

本轮 owner 没有重新运行完整42页审查、跨浏览器、VoiceOver或对比度检查，没有扩展 Mock 服务。认可原稿及已有测量仍为几何依据；本轮只提供 candidate 的前后测量，不声称新增一轮原稿操作。完整 S1–S6 与其他 R 场景由其他 owner 汇总。G2 人工评审保持待确认，没有全局 Token、Classic、Figma、Git、依赖或发布变更。
