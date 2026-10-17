# 最终完整单元运行：只读耗时诊断

本诊断没有修改源码或 binding，没有停止进程，也没有重跑完整测试。活动输入仍为 `a76b6acc6fe0d45808d1894bd58774ff117f8279b86b72d2532e5849aa27192a`。

## 已观察事实

- `verification-helpers.test.ts` 已完成：245 项、1 失败，整文件 521.111 秒。单例 `keeps v1.2 G0/G1 authorization separate from frozen history and ungranted Gates` 耗时 73.720 秒，超过原 60 秒用例预算。
- `verify-tailwind-b2.test.ts` 随后完成：182 项、4 失败、125 跳过，整文件 658.988 秒。四个失败用例耗时 65.391／71.502／71.967／99.974 秒。两个历史 fixture setup 需要在完整最终错误输出中单独核对，不能把跳过算作通过。
- 这同时包含大文件总工作量和单例重复验证，不能解释为“只有输出刷新慢”。同步计算期间，测试超时和 worker 输出可能延后。
- 进程 65417 的 2 秒采样，主线程 1451 样本中仅一个主要分支就有 1048 样本处于 `structuredClone`，约 72%；总 SHA 热点 19、lstat 热点 6。没有看到等待锁或正则的主要热点。样本见 `full-worker-65417-readonly-sample.txt`。
- 进程 65644 在采样请求时已经退出；没有根据不存在的进程补造第二份结果。

## 只读微测

`full-readonly-cache-profile.json` 在一个现有 traversal 中测得：首次验证读取 915ms；完整 G6 返回记录为 1,107,954 字节；100 次缓存整记录读取仍需 282ms，100 次仅取一个文件前驱仍需 265ms。`getG6PreviousSource` 每次经公开读取器复制整记录，再取一个字段。

`full-readonly-contract-scope-profile.json` 只执行一次现有完整合同验证，并显式置于已有 traversal 生命周期：8.320 秒，0 失败。完整测试中同一入口相关用例为 71.967 秒。环境不同，不能把该数字当严格性能倍数；它提供了可定向验证的范围收敛证据。

## 最小后续方案（尚未实施）

1. 把公开 `validateRegisteredRecipeColors` 的一次完整纯只读调用置于已有 `withSourceBindingTraversal` 内，验证参数中的 source／outputs 仍每次执行全部规则。
2. 把公开 `validateTailwindB2SystemContract` 的一次完整纯只读调用置于同样作用域。
3. `copyTask4GovernedFixture` 将“读取不变 workspace → 写另一个 target”的一次构造作为源工作区的只读 operation，避免其数百次单文件前驱读取各自重验完整图。

每次公开 API 或每次构造返回／抛错后释放。下一次文件突变、下一次独立 API 调用仍重新读取全部来源；保留全部 Gate、阈值、public 返回快照隔离、原 60 秒预算和 20 秒边界子进程预算。先不增加常驻 cache、全文件 test cache 或通用跳过。

如这三处定向验证后仍主要耗费缓存快照复制，再单独评估仅供内部只读标量 getter 使用的 record view；不能直接删除所有 nested clone，因为一些旧 owner reader 会修改它们拿到的记录。
