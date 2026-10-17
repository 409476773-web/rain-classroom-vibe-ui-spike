# G5 当前送审副本失败只读诊断

结论：P2，`verifyG5Components()` 的前驱读取假设与新的合法来源绑定不兼容；不是耗时，也不是 P5 CSS 消费者问题。当前源码和 binding 保持冻结，没有修改旧证据。

## 实际复现

在本轮 github-review-20261017 工作树执行 `node scripts/verify-g5-components.mjs`，5.80秒后 exit1。错误为 ENOENT，试图读取：

`evidence/runtime/g6-components-2026-10-14/before/apps/playground/src/docs/components/g5-component-pages.tsx`

调用链为 verifier:20 的 read → verifier:45 的源循环 → G5 测试:111 的公开 verifier 调用。函数在返回前失败，CLI 末尾的证据写入未执行。

## 根因与最小修复

`scripts/verify-g5-components.mjs:20–21` 只检查 `g6.sourceFiles[file].before`，便硬编码拼接旧 G6/before。Input Group 的两行已接受文案使 G5 页面从旧 db36 的 retained file 变为本次 Github successor 的授权 source。它原本没有 G6 before 文件；真正快照位于新 binding 明确记录的 `evidence/runtime/github-review-successor-2026-10-17/before/apps/playground/src/docs/components/g5-component-pages.tsx`，SHA 为 `ae5523e29c0fd842fd28797b50dbd05d45198fc3e56648ca1f0d4767ed86a154`。

最小修复是使用已经验证来源及 beforeSnapshot 的公开 getter：

```js
const read = file => getG6PreviousSource(root, file)
  ?? readFileSync(resolve(root, file), "utf8");
```

补对应 import、移除无用 g6 局部变量即可。保留整个原 traversal 与 G5 校验 body，不改检查范围或对比度状态。不要在旧 G6 目录伪造快照、重签旧 proof、扩大 P5 白名单或增加超时。

## 独立内存验证

本人仅将当前 verifier 作为内存模块载入，替换上述读取块和 import；其余 body 不变，移除会写证据的 CLI 末尾。该诊断模块6.22秒 exit0，返回5 assets / 8 capabilities，仍为 awaiting_human、contrast not-granted、publication unpublished，保留4项 contrast 与24项 eligibility findings。

这说明读取适配足以处理本次失败；它不是当前磁盘 verifier 已修复或正式测试通过的声明。本轮 binding 完整 SHA 仍为 `cde0bf92655f1e71cf97dd06e248c482b9f002d1c62512e594452021759e23c1`。

root 应待首轮全库源捕获结束后统一实施，将 verifier 这一有限新差额纳入后继绑定；随后先执行既有 G5 governance 用例和鲜活 CLI/API，再进行相称回归。本诊断没有运行整库、浏览器或改写任何绑定源。
