# 当前曲线修复源码的独立下载消费

既有验证器直接生成当前导出的 170 份下载源码，覆盖 16 个图表家族，并在新宿主 `/private/tmp/rain-chart-variants-consumer-vLkNyD` 完成独立类型检查与构建。全部相对导入闭包通过，170 份源码均包含当前 `shared.tsx` 及新增 `trendCurve` 导出。未增添依赖、别名或指向工作区的模块链接。

实际构建读取的 3218 个模块均位于新宿主内部。依赖采用 139 份已安装的本地缓存副本，源码采用当前完整 UI / Foundations 包；这不构成干净安装或最小 Registry 单项安装验证。

原样复用此前通过的代表页面脚本，SHA-256 为 `0c0b59046658fc7d65730987739aeadbccceef0086fa8d27b7dea87ea763ec46`，通过调用参数读取本轮新证据与新宿主。十二页浏览器检查全部通过：Line、Area、Scatter、Composed、ProfitLoss、Radar 六组，分别在 1440px 减少动效与 390px 普通动效下检查。十次真实鼠标 Tooltip 与精确表格读数一致，Radar 两次图例交互及多边形可见性通过。普通动效另外六份源码也在同一独立宿主通过类型检查与构建，1343 个实际模块均在宿主内。

当前页面没有脚本错误、失败请求、400 以上响应或外部浏览器请求。页面宽度在视口内，所有路径有限。实际预览返回的 HTML 与新宿主构建输出哈希相同；未使用旧页面或旧 facts 代替本轮结果。已人工查看本轮桌面面积与窄屏组合截图，图形、读数和表格均可见。

运行结束再次核对完整来源、下载源码、包清单、Registry 和导出器：源码变化、下载变化、清单变化均为空，Registry 与导出器保持原始哈希。`freeze-verification.json`、`source-and-download.sha256` 与 `summary.json` 保存本轮核对结果。若运行时重新打开修改，须基于新的最终源码重做受影响消费。

证据包括 `run.log`、`facts.json`、`typecheck.log`、`build.log`、`browser-run.log`、`browser-facts.json`、十二张截图及普通动效类型/构建记录。浏览器抽样范围小于 170 份类型/构建范围；不宣称 Safari / VoiceOver、全面可访问性、用户视觉验收或发布完成。
