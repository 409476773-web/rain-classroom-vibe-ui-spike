# 最终冻结源的独立消费验证

最终消费验证通过。此目录对应 RadarArea `61769a70e807d06cc88abdf1f88bcabdb39ed6fc599868cd3b4edd8a14822740`；旧 `../consumption` 完整保留为 hover 变换中心修正前的快照。

执行命令：

```sh
node scripts/verify-chart-variant-consumption.mjs evidence/runtime/chart-behavior-fixes-2026-10-11/consumption-final
node evidence/runtime/chart-behavior-fixes-2026-10-11/consumption/browser-check.mjs evidence/runtime/chart-behavior-fixes-2026-10-11/consumption-final
```

新宿主为 `/private/tmp/rain-chart-variants-consumer-7oy3U7`，与旧快照宿主独立。现有校验器生成 170 个真实下载闭包，覆盖 16 家族，在新宿主完成严格类型检查和 170 个 HTML 入口构建，均退出 0。复制 139 个已安装依赖缓存，审计 3218 个模块全部在宿主内；外部依赖链接、外部模块路径和 workspace aliases 均为 0，canonicalChanges 为空。

浏览器复用完全相同的已通过脚本，其 SHA-256 为 `0c0b59046658fc7d65730987739aeadbccceef0086fa8d27b7dea87ea763ec46`，仅更换证据目录和由 facts 返回的新 host。实际独立 preview `http://127.0.0.1:5191` 服务的 HTML 已与此宿主构建文件逐项核对。真实 reference IDs 为 `line-x-axis`、`area-default`、`scatter-default`、`composed-default`、`line-profit-loss`、`radar-default`；1440px reduce 和 390px 普通动效各 6 项，共 12 项通过。普通模式的 6 个实际导出入口也额外通过此宿主类型和构建检查，1343 个模块没有离开宿主。

12 项确认实际 SVG 图形、精确表与交互可用；10 项真实鼠标 Tooltip 与所选表行一致，Radar 的 2 项使用其既有交互图例和精确表。pageerror、失败请求、400以上响应及外部 HTTP origin 均为 0；sourceChanges 和 downloadChanges 均为空。12 张截图保存在本目录，已目视最终 Radar 桌面 reduce 与组成图窄屏普通模式的代表截图。preview 已正常关闭。

消费快照包含当前 source-lock。再次实际核对其中 180 个 localSha256 均与当前源文件一致，锁文件和最终 Radar 源未漂移。汇总在 `summary.json`，完整来源和模块审计在 `facts.json`，浏览器记录在 `browser-facts.json`，通过脚本同字节快照及关键结果哈希由 `freeze.sha256` 保存。

边界：使用已有缓存与完整 UI / Foundations 源包，不是 clean install、最小 Registry 项安装或已发布版本安装。浏览器是上述 12 入口的抽样，170 的全覆盖仅指闭包、类型与构建。详细动效、精确零点和 hover 屏幕中心使用各 owner 专测；此结果不等同于 Safari、VoiceOver、完整可访问性、Human Gate 或生产发布验收。
