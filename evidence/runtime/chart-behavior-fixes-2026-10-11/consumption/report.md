# 独立消费验证：Radar hover 中心复核前快照

此目录保存 RadarArea SHA-256 `ab0b379bed54bea06db82f52b65e9dbf2a08a59e236c6a167e640acfad12244e` 时的实际通过结果。根代理正核对减少动效下的 hover 变换中心，若 owner 再变更，应在新的 `consumption-final` 目录验证最终冻结源；不得把本目录当作后续修改后的通过证据。

执行入口：

```sh
node scripts/verify-chart-variant-consumption.mjs evidence/runtime/chart-behavior-fixes-2026-10-11/consumption
node evidence/runtime/chart-behavior-fixes-2026-10-11/consumption/browser-check.mjs
```

实际独立宿主为 `/private/tmp/rain-chart-variants-consumer-vOrFFC`。现有校验器从真实下载导出函数生成 170 个下载闭包，覆盖 16 家族；复制 139 个已有依赖缓存，并在此宿主完成严格类型检查和 170 个 HTML 入口构建。类型与构建退出码均为 0。模块审计记录 3218 个宿主内模块，外部模块路径、外部依赖链接、workspace aliases 均为 0；执行期间 canonicalChanges 为空。

复用既有消费浏览器检查方式，在独立构建的实际 preview `http://127.0.0.1:5191` 检查真实 reference IDs：`line-x-axis`、`area-default`、`scatter-default`、`composed-default`、`line-profit-loss`、`radar-default`。每个入口各检查 1440px reduce 和 390px 普通动效，共 12 项。普通动效的 6 个实际导出入口额外在同一独立宿主完成类型与构建，并审计 1343 个模块均未离开宿主。

12 项均通过非空实际图形、有限精确表读数和可用交互检查；其中 10 项真实鼠标 Tooltip 与对应表格行一致，Radar 的 2 项使用其原生交互图例和精确表，未添加不存在的 Tooltip。浏览器 pageerror、失败请求、400以上响应、外部 HTTP origin 均为 0，sourceChanges 和 downloadChanges 均为空。12 张本轮截图保存在此目录，已目视组成图桌面、盈亏窄屏及 Radar 窄屏代表截图。preview 已正常关闭。

通过浏览器脚本的 SHA-256 为 `0c0b59046658fc7d65730987739aeadbccceef0086fa8d27b7dea87ea763ec46`，与 `browser-facts.json` 一致；保留同字节备份 `browser-check-verified-before-minimal.mjs`。先前辅助断言把 Scatter 当作 path、把 Motion 的 rect 样式当作属性，失败证据保存在 `attempt-01` / `attempt-02` / `attempt-03`。最终以原生 circles 和实际 rect getBBox 校验通过，未修改运行时。

边界：这是复制已有缓存和完整 UI / Foundations 源包的隔离消费验证，不是 clean install、最小 Registry 项安装或已发布版本验证。浏览器只抽样上述 12 入口，详细首帧/动画/精确零点/变换中心使用各 owner 专测；没有扩大为 170 入口的浏览器验收，也不宣称 Safari、VoiceOver、完整可访问性、Human Gate 或生产发布完成。
