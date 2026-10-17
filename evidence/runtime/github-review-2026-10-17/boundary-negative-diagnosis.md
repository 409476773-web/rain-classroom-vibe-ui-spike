# Navigation boundary 八项负例只读诊断

结论：P2 测试适配遗漏。八项变异均被新的精确来源守卫正确拒绝；测试只识别旧 Closeout 名称，因此把准确拒绝判成失败。不是 Git 后继规则放行，也不是超时。

## 已复现证据

本轮全测日志703–722行：18项中 baseline 与9项负例通过，8项失败；失败项各约2–3秒。fixture 通过 copyCurrentGovernanceFixture 复制当前完整有限 proof，运行的是 fixture 中的当前 boundary CLI，使用20秒子进程预算与只读 Git 指针。

本人为避免再次复制整份工作树，在子进程内只替换 Foundations token-contract.ts 的内存读取，注入与既有测试完全相同的反向 UI import；磁盘字节不动。实际当前 boundary CLI4.29秒 exit1，首项为：

`G6 finite sources cannot be checked: GitHub review retained source or original proof changed: packages/foundations/src/token-contract.ts`

后续继续列出同一物理路径的来源拒绝；最终仍为 no explicit boundary policy。该探针不是新 Vitest 通过记录，但直接证实了当前 CLI 的拒绝类别。正常 fixture baseline 已在本轮全测通过。

## 共因与最小外部补丁

`expectBoundSourceFailure` 只接受两种 Closeout 前缀；新 reader 在原扫描器前检查相同文件，使用 GitHub review retained/source 两种前缀。六项失败（Headless、反向依赖、非法 package dependency、三个数据域 import）由此触发。

还必须同步两处独立判断：Manifest case 的 immutableManifest 分支只认识旧 retained 名称；invalid-parent case 的 OR 断言只认识旧 authorized-source 名称。只给公共 helper 加两行，最后两项仍可能失败。

外部建议补丁为 [boundary-negative-diagnosis.patch](boundary-negative-diagnosis.patch)，没有应用到当前源码：为 helper 增加两个新 header，但必须拼本次同一 file，并验证消息在文件路径后结束或换行；为 Manifest 和 phase 两个专用分支只增加其各自精确路径的对应新 header。保持全部原 legacy 类别、18项用例、变异内容、exit1、baseline exit0、unknown source、invalid-parent no-policy/not-pass 断言与20秒预算。没有接受任意 changed 或任意 Error，也没有伪造旧目录。

完整八项路径/前缀映射见 [boundary-negative-diagnosis.json](boundary-negative-diagnosis.json)。root 应在首轮全测捕获结束后统一纳入第24项有限差额，与G5 verifier第23项一起重新封存，再运行完整18项及其baseline。当前 source/binding/旧 proof 均保持不变。
