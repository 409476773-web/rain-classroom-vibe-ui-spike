# GitHub 送审副本：第二轮完整单测

2026-10-17 · Asia/Shanghai · 本轮完整通过。

执行：`pnpm test --maxWorkers=2 --reporter=default --reporter=json --outputFile=evidence/runtime/github-review-2026-10-17/checks/full-test-vitest.json`。

14:39:47 开始，15:04:01 结束，耗时 1453.760 秒，退出码 0。319 个文件、3577 项测试全部通过，0 失败、0 跳过、0 todo。保持原两 worker 与时间预算，保留精确负例断言；没有重试或选择过滤。

3703 份受测源文件前后完全相同，综合 SHA-256 均为 `1bd71dd41b496cd0a1039518d70b2e11d7df64f0bdec5ff57858013a77a7b9f8`。25 个新后继绑定源路径全部包含在快照内，G5 验证器、导航边界负例与 G123 负例的修改字节均受测；它们原已在首次源路径集合中，故文件总数仍为 3703。

本轮 binding JSON 完整字节 SHA-256 为 `67279f58081cbaedc9b36cf8fc223852febbc7c98d5f56b9e7197e0cbaf596ac`；消除自身递归后的规范化 seal 为 `fee3e674b1696ddc15f1aaf626566e1b8eb1683d174c2a3b3a1142b9d23eb87f`。

## 与首次失败的关系

[首次完整运行](attempt-01/full-test-analysis.md)的 319 文件、3576 项中有 15 项失败；其七份原始产物已原字节归档，见[归档摘要](attempt-01/archive-manifest.json)。

本轮在修复后唯一完整重跑，前置条件为源链/正式治理/类型检查、五项原预算超时定向和二十项兼容定向分别通过且相关进程结束。所有受测源码随后保持停写。

- `verification-helpers.test.ts` 整个 245 项及 `verify-tailwind-b2.test.ts` 整个 182 项通过，包含首次五个预算失败项。
- `verify-boundaries-navigation.test.ts` 整个 18 项与 `g123-playground-governance.test.ts` 整个 12 项通过；精确修改路径的非法变更仍被拒绝。
- `g5-components-governance.test.ts` 整个 8 项通过，实际验证器按绑定的真实前代来源读取。
- 新增一项治理回归验证每次 API 调用重新核对父目录，测试总数由 3576 增至 3577；不计作新增组件。

## 原始证据

- [完整文本日志](full-test.log)与[完整 Vitest JSON](full-test-vitest.json)。
- [命令、起止、退出码与计数](full-test-summary.json)，[失败列表为空](full-test-failures.json)。
- [运行前源摘要](full-test-source-before.json)和[运行后源摘要](full-test-source-after.json)。

本轮工程通过不新增资产成熟度、视觉接受、真实设备、对比度、生产服务或发布结论。
