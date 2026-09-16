# 框内固定标题调浅验证

2026-09-14；用户20:18截图反馈“颜色可以更浅一些（跟正文进一步拉开差距）”。System Mode。共享 FormItem 的 inside 标题由 Text/Neutral/3 调为 Text/Neutral/4；既有 Input、SearchInput、Select 及表格筛选栏同步继承。正文 Neutral1、占位 Neutral5、禁用 Neutral6 与上方标题保留。无新增 Token、尺寸、交互或依赖。

## 运行验证

- 当前三浏览器 × Light/Dark 共6/6通过、零重试，26.0s；[日志](browser.log)。覆盖三种外观、两档尺寸、实际颜色、长标题及原有标签/编辑/清空/选择/键盘行为。
- 真实 Input 与 Select 文档页分别核对两个框内标题：浅色 `rgb(86,104,143)`，正文 `rgb(20,35,70)`。截图目视复核填写值及选择值的层级；运行无 pageerror。[实际测量](docs-measurements.json)。截图在 `/tmp/rain-inside-label-color-docs/{input,select}-light.png`。
- 深色标题 `rgb(148,156,184)`，正文 `rgb(239,241,245)`；已目视复核 `/tmp/rain-inside-label-color-browser/chromium/dark-matrix.png`。三引擎矩阵与窄屏截图保存在该目录各引擎子目录。
- 独立代理运行 Table/RN06 历史保护与颜色治理测试10/10通过，20:22:19开始、2.88s；仅改颜色治理的实际预期，旧基线保护不变。
- Token单源生成、完整治理检查和差异空白检查通过；[治理日志](governance.log)。此颜色续调未重跑全量单元、类型或生产构建，不沿用首批结果作为本次实测。

## 颜色测量与独立复核

[96项测量](color-measurements.json)覆盖24字段外观/状态 × 浅深主题 × 两父表面。其中84启用项保持 `critical:true` / `interactive` 与4.5阈值，12禁用项保留原语义。

- 最低启用对比度 **4.4968521474338745:1**。仅1项低于4.5：浅色、底线外观、错误态、Background/Neutral/3上的Fill/Red/Alpha/2。不得将显示舍入后的4.50视为通过。
- Neutral4属于现有弱文字色；84项启用组合的适用性保持待复核。颜色治理精确登记84项eligibility与1项contrast pending，**接受例外0项**。未降级标题语义、阈值或内容角色。
- 独立复核确认层级为正文Neutral1 → 框内标题Neutral4 → 占位Neutral5，且核算结果与当前执行一致。治理会要求本批保持 findings，并与旧Input颜色批次分开统计。

实施 completed；自动运行检查 passed；独立审阅 findings（上述颜色发现仍在）；Human Gate accepted（2026-09-14用户“确定，没问题。”，[限定视觉确认](../visual-acceptance.md)）；contrastAcceptance not-granted。未推导发布、迁移或Git授权。
