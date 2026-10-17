# ProfitLoss 精确零值分段：独立只读审阅

结论：未发现关键、重要或可选的实际代码问题。当前限定修复达到未发布的技术可交付状态；结论不代表组件库整体发布、迁移或生产就绪。审阅使用本轮 `before/` 文件快照，当前 owner SHA-256 为 `3370461b2726329ed3f1a64ca92b721141134cc9319c1e948136782c8d3be734`。本审阅没有编辑 runtime 或 tests。

## 范围与合同

用户授权仅修精确零值分段并保留演示数据和样式。`profit-loss-segments.ts:109` 新增分支只在前一点为真实数字 0、下一有限观测转为相反符号时结束旧段，并将同一原始零行用于两个段的边界。原函数签名、初始符号规则、普通非零过零插值和原始行数据均保留。

`packages/ui/src/charts/README.md:72` 约定有序 Date 和有限正负值，0 为基准。实际 renderer `profit-loss-line.tsx:89` 是 helper 的唯一运行时调用者，从共享时间图 context 读取 `renderData` 与 `xAccessor`。App 的 `ProfitLossExample` 使用同 dataKey 的透明 Line 注册值域，默认页与 `trend.tsx:307` 的 `line-profit-loss` 共用此实现。公共 index 仅导出该 helper；源码下载导出相同 App 实现，原型复用共享实现。分类轴由 `TimeSeriesChartInner:181` 明确拒绝 ProfitLossLine，没有因为此修复扩大支持范围。

不将非数字、NaN/Infinity、无效日期或乱序输入的既有表现扩展为本轮应修内容；这些不在上述输入合同中。

## 核对结果

- 连续零平台保留所有原始观测，平台沿用旧段符号，并在最后一个零观测与下一反向非零观测之间切换；未造日期、未丢零行。
- 双向 `[-1,0,1]` / `[1,0,-1]`、多次反向、同符号触零、头尾零、全零、单项和空数组均由新增 24 个 unit case 覆盖。全零继续归 positive，头部零采用首个非零观测的原规则。
- 普通非零过零保留原 `t=ya/(ya-yb)` Date 插值、元数据和共享边界对象；Date / numeric timestamp / ISO timestamp 的直接 helper accessor 检查及 custom keys 检查通过。
- `profit-loss-independent-probe.json`：独立读取并执行当前与 before helper，枚举 `[-2,-1,0,1,2]` 的长度 1–7 共 97,655 个有效序列，检查段数量、非零符号、观测身份保留、共享零边界和时间顺序。21,844 个无零序列与 before 结果逐项相同，原非零插值没有回归。
- `profit-loss-independent-unit.log`：独立复跑新增 helper/真实 renderer 测试与现有 chart-demo-data 测试，50/50 通过。owner 的 `profit-loss-green.log` 另记录 3 个文件 57/57 通过；`profit-loss-red-confirmed.log` 记录旧实现 9 个预期失败和 15 个保持通过的回归对照。
- `profit-loss-browser-verified.log`：4/4 Chromium 用例通过，1440/390 × normal/reduce。测试仅通过响应替换提供 exact-zero fixture；磁盘演示数据没有替换。三个实际 profiles 与全零状态的精确表、原始日期、SVG 顶点、正负路径/颜色及真实 Tooltip 一致，四份 `browser/profit-loss-verified/*.json` 各有 4 个完成快照、0 浏览器异常，受测 owner 哈希一致。
- `profit-loss-browser-red-verified.log`：同一最终 spec（SHA-256 `88cf13cea173fdc82033ee8d0d022bfea91213a4c09ba47fa2c85f0079b1f5b2`）仅通过响应替换复跑 before splitter；4 个用例均在真实 SVG 路径数处得到预期 2 / 实际 1 的失败。四份 RED JSON 记录受测 before SHA-256 `8ef6808285715cceba4e429eb77bdcaffd655b2382797343a03ed1740310af8b`、冻结当前 owner SHA-256 与 0 浏览器异常，证明 RED/GREEN 区别来自分段 owner。
- 先前浏览器失败来自测试未应用 native nice 值域，以及正常进场 ready 之前的一次 hover。最终 spec 保留 .1px 顶点/符号约束，使用实际 scale 的 nice 行为并重复真实 mouse move 等待可交互；没有以更改 renderer、减弱数值断言或替换演示数据通过检查。

## 样式与数据保护

`profit-loss-independent-scope.json` 确认 9 个 renderer/legend/公开 index、App caller 与 CSS 文件相对 before 字节相同。App `makeProfitLoss` 唯一文本变化是根代理移除已失效的 shortcut 注释，三个 24 点样本、日期、状态逻辑与数值均相同。新增 runtime 分支为单一 helper owner 改动，不引入 helper 模块或依赖。

## 问题分类

- 关键：无。
- 重要：无。
- 可选：无须另开范围处理的实际问题。

根代理仍负责统一当前 source-lock、类型检查、构建、消费验证及交付记录。本审阅建议保留当前最小 owner 改动，不追加非法输入处理或更换零平台的既有归属规则。
