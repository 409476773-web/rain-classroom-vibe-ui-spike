# Dialog / BM-B 整体视觉独立复核

日期：2026-09-15。审阅者：独立代理 `dialog_visual_audit`。

## 结论

复核通过，当前审阅范围内无未解决的阻塞项。本轮由用户明确委托依据已建设的 Dialog 规则进行运行视觉验收，不表述为用户已经逐张查看全部截图。

范围为当前 Dialog / AlertDialog 与 BM-B 大表单的运行视觉，包括浅深色、桌面与窄屏、单/双列、固定操作栏及主要状态。代码、设计记录、Manifest、阶段状态与 Registry 均已交叉核对。

## 独立检查

- 独立启动 Chromium / Firefox，各检查浅色、深色 × 1440px、375px，共8组 BM-B；原始16张截图与几何数据保存在 [before](before/bm-b-geometry.json)。两引擎当前环境的滚动条占宽均为0；正文与主按钮右边线差0px，Footer滚动前后位置不变。未把其他操作系统的传统滚动条表现视为已实测。
- 实看本轮更新后的616单列、916单列、窄屏校验、保存中、保存失败与放弃确认截图，以及 Dialog 小确认和窄屏短表单截图；信息层次、按钮可达性、同色Footer与条件分割线正常。
- 复看 `state-final-results` 中 Chromium浅色、Firefox深色、WebKit浅深色上传失败截图：失败文案、重试、移除均完整进入正文可见区域。
- 当前实际 phase 两项授权守卫、冻结历史校验及 Manifest / Registry 范围断言通过；独立运行 `pnpm exec vitest run scripts/dialog-refinement.test.ts`，3/3通过。

## 发现与处理

| 发现 | 处理及复核 |
| --- | --- |
| BM-B标题与说明间距仍为4px，与当前Dialog的8px排布不一致 | 宿主局部样式改为Space/8，更新后的截图已复看。 |
| 初次窄屏上传失败截图只拍到文件名，失败状态与重试按钮在正文可见区域下方 | 属于证据取景问题；等待失败并滚动Body到底后重拍，最终截图已复看。 |
| 两项phase的humanGateDecision键顺序与守卫不一致，嵌套JSON比较导致实际授权判定失败 | 仅调整phase中scope/evidence顺序，未改共享exactRecord；实际phase守卫、历史校验与3项专项测试均重新通过。 |

BM-B文字“关闭”仍是规范允许的Rain Button组合，不受仅针对关闭IconButton的28/20规则强制替换；实测其中心与标题首行相差1px，无明显视觉偏差。已有完整字段间距16px保持层次清楚，20px在设计中是常规候选值；分割线两侧各24px留白分别服务两侧内容，不认定为重复累计缺陷。

## 状态边界

Dialog / AlertDialog Manifest与两项phase仅接受各自明确的runtime-visual-only范围。Registry中Dialog局部接受已登记，包含Separator的整体登记仍为awaiting_human；Separator、Textarea全组件验收未被顺带通过。对比度接受、真实屏幕阅读器、物理触屏、Figma、发布与业务迁移均不属于本轮通过结论。完整治理、类型与构建的最终运行结果由主代理记录。
