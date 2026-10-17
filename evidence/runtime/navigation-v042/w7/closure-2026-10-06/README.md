# W7 当前源码修复与验证 · 2026-10-06

本次按用户“继续完成 w7”推进。工作区为 `.worktrees/card-v2`，当前源码与已接受的 review02 冻结版本分别记录；原人工视觉、对比度与可读性验收保留。W7 整体质量门仍开放。

## 实际改动

- R2 账户按钮恢复已有浅色悬停填充，排除 disabled / aria-disabled。只在原 CSS 规则加一个 selector，未新增颜色、尺寸、断点或公共 API。[采用记录](account-hover-adoption.json)。
- Manifest / Registry 登记当前修复来源，同时保留上一版来源和原人工接受记录。[当前 97 文件来源](current-source.json)相对 review02 恰有五项差额：该 CSS、两份此前的使用指南、该 Manifest 与 Registry。
- 检查脚本只接纳可还原到原字节的精确后续版本；额外绘制、范围扩大、Token 改写等反例仍拒绝。原颜色登记的 810 项未证明用途完整保留，修复新引入的一个用途单列，合计 811 项待证明。
- 增加有界颜色审计和逐项用途核查。[颜色报告](colors/README.md)区分登记分类、覆盖关系及真实用途问题；不把静态合同冲突直接称作可读性缺陷。

## 当前实跑与复查

| 检查 | 实际结果 |
| --- | --- |
| 类型、构建、899 图标 | `pnpm typecheck`、`pnpm build`、`pnpm verify:icons` 均 exit 0 |
| 单元完整运行 | `pnpm test --maxWorkers=1`：167 文件 / 1767 项，1765 通过、2 失败、0 跳过，exit 1；[原结果](full-unit-final.json) |
| 两项登记失败修复复查 | 仅在原导航授权分支登记三份新审计脚本，相关两份完整测试文件共 200 项通过，exit 0；[原结果](boundary-registration-green.json) |
| 单元当前逐项汇总 | 1767 个原结果槽全部有通过记录；11 个同名参数化结果以原定义顺序区分并核对数量，不把重复运行加进总数。非单次全量绿色；[逐项汇总](unit-current-coverage.json) |
| 默认浏览器全量 | 737 项，712 实际通过、21 意外失败、2 旧预期失败、2 截图采集跳过，exit 1；[原结果](full-browser.json) |
| 浏览器失败复查 | 默认 34 项：33 通过、1 Tabs 总预算超时；最后该一项单 worker、原 30 秒时限中用 20.840 秒通过。当前 G1 全 14 项通过；[复查报告](browser-recheck-summary.md) |
| 浏览器当前逐身份汇总 | 733 实际通过、0 意外失败、2 旧预期失败、2 采集跳过；默认并发记录单列仍有一项超时。非单次全量绿色；[逐项汇总](browser-recheck-attribution.json) |
| 治理 | `pnpm verify:governance` 前五阶段通过，Token exit 1；18 导航一致性未证明 + 192 其他消费者诊断，仍 210 条；[完整日志](governance.log)、[归属](governance-attribution.json) |
| 有界颜色测量 | 原接受预览 E1–E6 的 88 个声明观测：37 低于原阈值、28 达到原阈值、23 待证明；正常执行完成、exit 1。不代表 37 个独特可读性缺陷或完整声明覆盖；[测量结果](colors/browser-audit.json) |

最早一轮完整单元 1766 项中的 16 个失败仍保留在 [原日志](full-unit-sequential.log)。元数据入口的精确后续版本投影由合并反例检查覆盖；未知来源、依赖、发布、人审、Manifest、额外 CSS 与权限变化继续拒绝。另一次失败检查的三项脚本漏登记保留在 [原结果](governance-other/metadata-boundaries-after.json)，不会作为通过证据。当前真正通过的边界/阶段复查为上表 200 项和治理日志。

[预览来源核对](preview-provenance.json)确认 5368 首页及 13 份直接引用资源匹配原接受构建。本轮浏览器验证的当前 R2 源码来自隔离副本，其配置与源码 SHA 在 [执行记录](browser-recheck-execution.json)中保留。

## 原验收与外部验证边界

[保护核对](preservation.json)重新校验了八份原交付 ZIP 与 review02 来源冻结，字节一致。本次不覆盖这些包，不把源码后续修复自动算作新的人工接受或 W8 包验证。用户当前 5368 预览继续提供原接受构建，不能作为本次 R2 源码修复的浏览器证据。

人工对比度与可读性按用户确认完成；自动颜色用途/背景/状态证明仍开放。[其他组件归属](governance-other/README.md)分开记录，不用导航人审关闭其他组件的问题。

Safari 按用户决定留人工检查。本次在真实 Chrome 前台尝试系统 VoiceOver 快捷键，但未取得稳定读屏进程或有效播报，E3/E6 案例仍 `not-run`。[实际执行记录](native-execution/README.md)明确工具调用超时未兑现，实验停止；[清理核对](native-execution/cleanup.json)确认自有测试标签已关闭、读屏进程未运行、开关恢复原值。Codex 前台恢复被工具安全规则拒绝，未绕过，前台恢复未确认。

历史完整浏览器曾在实际工作区执行，可能覆盖部分非导航旧截图/JSON；此前字节恢复未证明。本次浏览器均在隔离副本执行，原本轮附件已另存 [索引](retained-full-browser.json)。新证据不回填旧失败。

没有发布、迁移、Figma 写入、依赖变更或 Git 操作。
