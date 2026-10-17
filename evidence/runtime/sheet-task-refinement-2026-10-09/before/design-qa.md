# Toast 文字操作与顶部位置 · Design QA

日期：2026-10-08。用户明确要求：撤回用弱色文字按钮，与关闭 IconButton 接近；通知移到顶部并留出顶边距离。System Mode，仅此 Toast 反馈修正，旧 G2/G3 实际视觉 Gate 不自动转移。

## Findings

本轮两个视觉问题已修复，所审范围没有遗留 P1/P2 视觉问题。此结果仅为视觉实现自查，用户实际人审仍 `awaiting-user-review`。

| 问题 | 修复与证据 |
| --- | --- |
| 撤回描边和高亮前景使次要动作过强 | 复用共享 `Button variant="text"`，通过 Base UI render callback 保持动态文案与事件。无描边，动作与关闭共享 .72 前景强度；实测二者 color 与 opacity 相同，label 继承实际前景。 |
| 右下提示容易被忽视 | Toast Viewport 改为顶部居中，24px 加 safe-area；保留 400px 上限及窄屏两侧 16px。队列、transform-origin 和入场方向同步调整，向下展开。 |

## Comparison target and evidence

用户原图 `evidence/runtime/toast-action-position-2026-10-08/user-reference.png` 与当前 `browser/light-iab.jpg`、`browser/dark-iab.jpg`、`browser/dark-narrow.png` 在同一次图像输入中共同查看。原图是旧视觉的问题截图，不是要求继续复制描边或旧位置的设计稿。当前浅/深 IAB 为 1280×720，自动化桌面 1440×1000，深色紧凑窄屏 390×844，无后期改图或缩放。

短截图路径均相对本轮 evidence 目录。根 QA 上一批内容已保存在本轮 `before/design-qa.md`，前批来源/颜色 JSON 保留原字节。

## Required fidelity surfaces

| 表面 | 检查 |
| --- | --- |
| 字体与层级 | 沿用 Rain 字体，标题/描述维持既有 14/22 与 13/20；操作使用现有 TextButton 默认/紧凑完整规格，弱化颜色而不让文案消失。 |
| 布局与边界 | 默认无描边，文字按钮点击区保留；桌面和 390px 均顶部居中且没有横向越界，队列展开无互相覆盖。 |
| 颜色与 Token | 保留既有反色反馈表面和语义图标；动作/关闭同一前景与 .72 比例，不新增 Token、不重定义公共按钮配方。键盘焦点保留可见描边与共享 Focus。完整对比度未授予。 |
| 图标与资产 | 原有正式成功及关闭图标保留，不重绘、不新增图标或依赖。 |
| 文案与行为 | 撤回仍实际更新示例状态，关闭仍针对指定通知；顶部位置写入现有展示说明。F6、普通焦点暂停、默认四秒和队列 API 保持。 |

## Runtime review

- 3 文件 / 16 项相关单测通过，覆盖共享 Toast、原 G2 兼容场景及精确范围/历史来源治理。
- 3 浏览器场景通过：浅色桌面；深色紧凑 390px；队列向下展开、正常 F6 暂停超过 4 秒与指定关闭。文字按钮真正经 F6、Tab、Enter 操作，并验证可见焦点。
- 五个应用/包类型、专项测试类型、Playground 构建及 Asset Index 通过。
- IAB 实际执行撤回、关闭和浅/深切换；默认顶边 24px、宽400px、动作/关闭前景一致；控制台捕获 warn/error 为空。

## Known runtime limit

已有 Base UI 1.8.0 在“先悬停通知 → F6 聚焦 → 鼠标移出”组合中恢复计时，导致仍聚焦的通知可能消失。失败保存在 `browser-green.log`；安装源码 `toast/viewport/ToastViewport.mjs` 的 `flushMouseLeave` 无条件恢复计时，而未检查 `focused`。本轮没有修改上游计时机制或添加独立计时控制器。最终正常 F6 暂停测试先移出指针再聚焦；此通过不覆盖上述混合路径，详情见本轮 verification。该限制仍开放，不被视觉自查通过或旧 Gate 关闭。

## Implementation Checklist

- [x] 按用户明确反馈修正两处默认视觉。
- [x] 同一输入比较问题截图与浅/深、窄屏实际效果。
- [x] 验证撤回、指定关闭、位置、队列、键盘和普通计时暂停。
- [x] 保留公开 Props、旧证据和精确后继来源，不引入新位置选项、Token、依赖或计时引擎。
- [ ] 用户对实际修正的视觉验收。
- [ ] Safari、VoiceOver、完整对比度及混合悬停/键盘计时限制。

无本轮额外可复用设计规律需要写入方法库，应用既有 V04/V05/D05。没有发布、迁移、Figma 或 Git 操作。

final result: passed
