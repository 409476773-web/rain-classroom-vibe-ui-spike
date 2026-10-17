# GitHub 审查快照的有限后继

本记录仅证明用户在 2026-10-17 明确授权的送审副本接续。原 `card-v2` 与原 `db36f041dc9326c15ad0d6d4c9858e3db9e0db0b0a11191621ca956c267525d0` proof 保留，不把本次结果回填旧 Human Gate，也不授权包、Registry、Figma 或业务发布。

## 已复现的阻挡

- `regression-red.json`：新后继缺失时的测试失败。
- `precise-baseline-rejections.json`：仅加入已接受的 Input Group 两行文案便触发旧 retained-source 拒绝；当前 `cf911c8…` HEAD 也被旧 Card V2 的 `321e1a0…` 恒等规则拒绝。
- `baseline-source-proof.json`、`restored-required-files.json`：普通复制排除了被固定 proof 引用的两份历史 `node_modules` 内 JSON。仅恢复这些精确 regular-file 输入，不将本机依赖目录整体入库。

## 接续方式

- 当前源差额固定为 25 个文件，见 `source-bindings.json`；固定源码集合由独立 module seal 保护。
- 完整旧校验闭包为 5,640 个 regular-file 输入，保存在 `predecessor/`；每个文件均按摘要验证，并检查当前根中未授权变更的对应输入。
- 新读取器调用原 `readG1G6CloseoutBindings` 及原 G6 链，原 binding 与原模块字节保持不变。
- 当前阶段仅新增 `githubReview20261017`；用户此前确认范围登记为所阅本地 P5/P6 页面，不改变既有资产的独立 Gate、对比度或发布状态。
- 返回的历史来源保持最早 before/beforeSnapshot 语义；公开 getter 返回隔离副本；只读 traversal 仍执行每个 callback，后续调用重新读取被变更的 fixture。
- Git 只允许原精确 origin 的获取/推送地址，HEAD 必须是明确授权 `cf911c86078783df1fcd4228707873cfd6df2066` 的后继；禁止把旧 HEAD 恒等约束静默删除或允许任意远程。

## 首轮全库结果与限定修复

首轮完整全库已结束且源字节稳定：319 个文件、3,576 项测试，3,561 通过、15 失败。完整原产物保留在 `../github-review-2026-10-17/checks/attempt-01/`，不覆盖为“通过”。分类为5项原预算超时、9项旧负例未识别新同路径 guard 提示，以及1项 G5 verifier 硬编码旧 before 位置。

本次后继只增加三个精确源差额，固定总数25：`scripts/verify-g5-components.mjs`、`scripts/verify-boundaries-navigation.test.ts`、`scripts/g123-playground-governance.test.ts`。其 before 字节与首轮 predecessor inventory 完全一致，记录在 `iterations/full-run-first/three-fix-before.json`。

- G5 通过已有前驱 getter 读取绑定声明的 beforeSnapshot，保留最早 before 语义。
- 原9项负例仍完整执行原变更、拒绝与路径匹配，仅认识新 verifier 的同文件精确错误前缀。
- 公开 phase API 的一次同步校验复用已有只读 traversal；每个 API 返回或抛错后仍释放，下一调用重新读取。
- 新 reader 只有 predecessor closure 的 view+root 纯读取循环复用父目录 stat；末端文件 lstat、读取、摘要、原 proof/phase/模块校验全部保留。缓存不跨 API、不跨 phase/parse/旧 verifier 回调。
- 新增独立“API通过→runtime父目录换成symlink拒绝→恢复后API通过”回归。旧叶子文件、阶段、proof、无关源和返回隔离负例继续保留。
- 定向复核曾在 IconButton 的 controlled Task4 fixture beforeAll 发现新 reader 合并丢掉既有 beforeSnapshot。`iterations/repair-25-before-snapshot-fix/red-before-semantics.json` 先复现 g123 路径字段缺失；现对既有 transition 仅更新 after，保留最早 before 与可选 beforeSnapshot。扩展原来源语义断言后17项通过，IconButton实际用例亦通过；没有新增第26个源或编造历史输入。
- 没有采用 phase fail-fast 排序、测试文件级缓存、预算增加或旧 proof 重签。

## 当前验证

- 新后继规范化 binding seal：`fee3e674b1696ddc15f1aaf626566e1b8eb1683d174c2a3b3a1142b9d23eb87f`。
- `source-bindings.json` 完整文件字节 SHA256：`67279f58081cbaedc9b36cf8fc223852febbc7c98d5f56b9e7197e0cbaf596ac`。前者将新模块自身 after 摘要规范化为 self；后者用于整库前后字节比较。
- `repair-scoped-final.json`：三个相关文件 **17/17 通过，0失败**，包括跨 API 父目录 symlink 新回归与全部旧源链负例。
- `repair-types-final.log`：测试源码类型检查退出0。
- `repair-governance-final.log`：`pnpm verify:governance` 完整退出0；109个消费文件登记检查通过，旧颜色不足及未证明组合继续单列。
- `repair-five-timeouts-final.json`：2worker、原预算下 **5/5通过**：Navigation 46.962秒、Tag 29.666秒、Focus 25.668秒、danger 26.008秒（各60秒），IconButton 17.198秒（20秒，余量约2.8秒）。未增加预算。
- 20项兼容负例专项已交独立 coverage agent 接手，完成后由 root 排程唯一第二轮全库。当前记录不声称第二轮全库通过。

P5 锚点集成修复保留，page.tsx SHA256：`6300157044c431c0e9e1f88a32d7e6f738123913ebd2ade044227f545caf563a`。唯一 P5 authored-paint 条目包含74项声明，仍为 `runtime-unproved` 且 `acceptedException=false`，未推导对比度接受。

`verification.json` 保存当前摘要；`iterations/full-run-first/` 保留首轮22文件版本的 module、helper、测试、binding及验证记录。`iterations/repair-25-before-snapshot-fix/` 保留修复前25源 module、test、binding与红例。原 `db36f041…` proof 与旧 Gate 不变。固定历史 node_modules JSON 的 Git 白名单见 `required-historical-node-modules.json`。本子任务未执行 commit、push 或发布。

## Root后续完整复验

20项兼容专项已全部通过。第二轮完整全库于2026-10-17 15:04:01结束，319文件/3,577项全部通过，0失败/跳过；3,703项受测源前后完全一致，binding完整字节仍为`67279f58081cbaedc9b36cf8fc223852febbc7c98d5f56b9e7197e0cbaf596ac`。原预算与负例保留。完整结果见[当前验证记录](../github-review-2026-10-17/verification.md)及[机器摘要](../github-review-2026-10-17/checks/full-test-summary.json)；上文“当前未声称第二轮通过”为子任务交接时点，保留其历史语境。
