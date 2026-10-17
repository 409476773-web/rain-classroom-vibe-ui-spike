# W7 退出条件与真实读屏最小后续路径

2026-10-06，只读核对；未操作系统或浏览器，未改 phase、canonical 工作包、运行源码或交付包。文件路径与当时 SHA 见 [summary.json](summary.json)。

W7 的总退出条件是“技术与人工分别记录，全部阻塞项关闭”（[10-BATCHES 第14行](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack/docs/10-BATCHES.md:14)）。专项、全项目、独立消费、辅助技术和人审分别登记；局部通过不能替代完整质量门。

W7.4 又明确“实际环境未验证写明”（[W7 任务第19行](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack/tasks/W7-regression.md:19)）。验证合同要求实际 Safari/读屏器标明支持边界、无证据保持 not-run（[09-VALIDATION 第35行](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack/docs/09-VALIDATION.md:35)、[第70行](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack/docs/09-VALIDATION.md:70)）。因此可以诚实交付未验证环境的限制；不能自行把已登记的阻塞降为非阻塞，或改写为 pass。

| 项目 | 可以登记的当前结果 | 结项边界 |
| --- | --- | --- |
| 导航 N01–N38、旧消费者、全仓实际脚本 | 按实跑、原失败及归属分别记录 | 新导航缺陷须修复；全仓 Token 红项不能因导航窄项绿而隐藏 |
| E1–E6运行视觉、AI消费、本地交付 | 用户已接受 review02 的有限范围 | 不自行扩大为整体 G3 或生产验收 |
| 对比度与可读性人工检验 | 用户确认完成 | 不重问；不据此推导自动 Token 合规 |
| 实际 Safari | 用户明确留人工，行为 not-run | 保留此决定；不再开启自动化或认证 |
| VoiceOver E3/E6 | 尚无有效实际播报 | 无用户延期决定；先执行一次更小的正常字幕路径，仍失败则保留具体限制 |

## 上次失败的证据与未确定原因

[现有状态](../../actual-a11y-2026-10-06/current-status.json)显示，VoiceOver 的非提示 AppleEvent 许可探测为 -1744，正常点击脚本控制仍为0。读屏器短暂启动后，[System Events 字幕窗口读取](../../actual-a11y-2026-10-06/voiceover-caption-resume-panel-inventory.json)在5秒后返回 -1712，随后没有读屏器 PID。较早的 -1728 是当时读屏器已经不存在。

尚不能证明读屏器退出的原因。没有匹配崩溃报告文件名，不等于正常退出；System Events 超时，也不能证明字幕功能不可用。进程存在、浏览器 AX / DOM 或 `text under cursor` 都不作为实际播报。

## 最小重试

根代理决定执行时，沿用用户已授权的临时测试及恢复，不再重复询问。只做一次、总时限90秒：使用自有 Chromium 窗口打开既有5368预览，正常 Command-F5，并在实际欢迎界面按 Return；先连续两次确认读屏器存在且 `voiceOverOnOffKey=true`，再发送 E3/E6 原生键盘操作。每次动作后从实际字幕窗口记录文本或截图，以及窗口归属、当前页面、操作和时间。

优先使用 CUA 对已观察到的字幕窗口读取/截图；若需要系统 AX，则仅读取已确认 VoiceOver PID 的 `AXWindows` 及有限 `AXChildren`，不要重复 `entire contents` 全树请求。当前 CUA/直接 AX 是否可用尚未实测。任何已有权限不足、读屏不稳定或字幕不可读，都立即记原错误并恢复；不循环开关读屏器，不绕过认证，不请求新 TCC，也不读取剪贴板。

具体三项：E3题目页签的名称/角色/选中状态与正确学生题目；E6隐藏后“展开资源队列”的可达名称及恢复焦点；E6换资料后当前编号、预览与评审输入的对应。中文播报按本机实际输出记录，不预设英文串。

[Apple macOS26 文档](https://support.apple.com/en-euro/guide/voiceover/unac078/10/mac/26)确认字幕面板显示当前播报；[启动文档](https://support.apple.com/en-euro/guide/voiceover/vo2682/10/mac/26)说明欢迎界面的 Return继续、Escape退出。另有[原生保存上一句话音频](https://support.apple.com/en-euro/guide/voiceover/vo2725/10/mac/26)入口，但会在桌面保存音频及诊断日志，本方案未采用。

结束恢复当时实际初值：读屏器原先关闭就正常关闭并复核；尽量不改 caption/scripting/welcome，若必要修改须读取并恢复；只清理自有浏览器及临时 profile，保持用户标签与5368服务，返回原前台应用。Safari保持人工，旧失败记录不覆盖。
