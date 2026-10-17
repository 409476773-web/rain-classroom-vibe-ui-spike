# GitHub 送审副本：首次完整单测

2026-10-17 · Asia/Shanghai · 本节点保留失败结果，不声明整库通过。

执行：`pnpm test --maxWorkers=2 --reporter=default --reporter=json --outputFile=evidence/runtime/github-review-2026-10-17/checks/full-test-vitest.json`。

13:50:53 开始，14:21:31 结束，耗时 1838.362 秒，退出码 1。319 个文件中 314 个通过、5 个失败；3576 项测试中 3561 项通过、15 项失败，0 跳过、0 todo。

3703 份受测源文件前后 SHA-256 完全相同，综合摘要均为 `f83229b7e973ae8647d3c365f988150fd6484d6200074f23ffc3d37e0ae5e884`。新后继 binding JSON 完整字节摘要为 `cde0bf92655f1e71cf97dd06e248c482b9f002d1c62512e594452021759e23c1`；模块内 `6128b52d…` 是消除自身递归后的规范化 seal，两者不是同一计算。

## 失败分类

| 类别 | 数量 | 文件与定位 | 当前事实 |
| --- | ---: | --- | --- |
| 既有时间上限 | 5 | `scripts/verification-helpers.test.ts:30,260,749,794`；`scripts/verify-tailwind-b2.test.ts:3559` | 前四项报 `Test timed out in 60000ms`；IconButton 合同补充项报显式 `20000ms` 上限。未增加预算或跳过。 |
| 新守卫先行拒绝，旧负例不识别原因 | 9 | `scripts/g123-playground-governance.test.ts:195` 一项；`scripts/verify-boundaries-navigation.test.ts:43,169,185` 八项 | 当前实际返回 `GitHub review retained source or original proof changed: <精确修改路径>`；旧断言只接受先前 Closeout 文案或旧扫描器结果。原非法修改仍被拒绝。 |
| 前代来源路径硬编码 | 1 | `scripts/verify-g5-components.mjs:20–21`，由 `scripts/g5-components-governance.test.ts:112` 触发 | 依据 `g6.sourceFiles[file].before` 一律拼接旧 G6 `before/`；Input Group 的新绑定实际提供 `github-review-successor-2026-10-17/before/…`。旧 card-v2 也没有所报 G6 路径，不能把它当作打包漏文件补造旧证据。应读取绑定的真实前代路径。 |

本节点仅分类，没有修改任何实现、断言、预算或历史证明。修复和复测应建立后续节点，保留本轮失败日志。

## 原始证据

- [完整日志](full-test.log)，超时原文在日志末尾；Vitest JSON 对这些条目使用 `STACK_TRACE_ERROR`，具体限时以日志为准。
- [完整 Vitest JSON](full-test-vitest.json)与[失败提取](full-test-failures.json)。
- [命令、起止、退出码及计数](full-test-summary.json)。
- [执行前源摘要](full-test-source-before.json)与[执行后源摘要](full-test-source-after.json)。
