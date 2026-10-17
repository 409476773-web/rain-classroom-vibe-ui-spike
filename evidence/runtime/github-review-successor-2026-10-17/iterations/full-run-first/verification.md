# GitHub 审查快照的有限后继

本记录仅证明用户在 2026-10-17 明确授权的送审副本接续。原 `card-v2` 与原 `db36f041dc9326c15ad0d6d4c9858e3db9e0db0b0a11191621ca956c267525d0` proof 保留，不把本次结果回填旧 Human Gate，也不授权包、Registry、Figma 或业务发布。

## 已复现的阻挡

- `regression-red.json`：新后继缺失时的测试失败。
- `precise-baseline-rejections.json`：仅加入已接受的 Input Group 两行文案便触发旧 retained-source 拒绝；当前 `cf911c8…` HEAD 也被旧 Card V2 的 `321e1a0…` 恒等规则拒绝。
- `baseline-source-proof.json`、`restored-required-files.json`：普通复制排除了被固定 proof 引用的两份历史 `node_modules` 内 JSON。仅恢复这些精确 regular-file 输入，不将本机依赖目录整体入库。

## 接续方式

- 当前源差额固定为 22 个文件，见 `source-bindings.json`；固定源码集合由独立 module seal 保护。
- 完整旧校验闭包为 5,640 个 regular-file 输入，保存在 `predecessor/`；每个文件均按摘要验证，并检查当前根中未授权变更的对应输入。
- 新读取器调用原 `readG1G6CloseoutBindings` 及原 G6 链，原 binding 与原模块字节保持不变。
- 当前阶段仅新增 `githubReview20261017`；用户此前确认范围登记为所阅本地 P5/P6 页面，不改变既有资产的独立 Gate、对比度或发布状态。
- 返回的历史来源保持最早 before/beforeSnapshot 语义；公开 getter 返回隔离副本；只读 traversal 仍执行每个 callback，后续调用重新读取被变更的 fixture。
- Git 只允许原精确 origin 的获取/推送地址，HEAD 必须是明确授权 `cf911c86078783df1fcd4228707873cfd6df2066` 的后继；禁止把旧 HEAD 恒等约束静默删除或允许任意远程。

## 最终检查

- 新后继规范化 binding seal：`6128b52de2737ecf9e8c7d7d1469fb8641994edf4d292c9046ad22d54c277003`。
- `source-bindings.json` 完整文件字节 SHA256：`cde0bf92655f1e71cf97dd06e248c482b9f002d1c62512e594452021759e23c1`。两者口径不同：前者将新模块自身 after 摘要规范化为 self，避免递归；后者用于整库运行前后源字节比较。
- `final-scoped.json`：三个相关测试文件 **16/16 通过，0 失败**。覆盖旧 proof 不变、旧 Gate/未知 phase 拒绝、无关源和 proof 改写拒绝、regular-file/目录软链接拒绝、迁移后的完整源视图、只读隔离与最早 before 语义，以及 Git 精确 origin 和授权提交后继。
- `final-types.log`：测试源码类型检查通过。
- `final-governance-second.log`：`pnpm verify:governance` **完整退出 0**，包括锁文件、工作区、证据、边界、Tailwind 和 Token 检查。109 个消费文件的登记检查通过；旧颜色不足和未证明组合继续单独报告，不转为对比度通过。
- P5 全局 hash 路由集成修复已纳入本次绑定，page.tsx SHA256：`6300157044c431c0e9e1f88a32d7e6f738123913ebd2ade044227f545caf563a`。本轮正式接入的 P5 CSS 已新增唯一 authored-paint 观测条目，仍为 `runtime-unproved`，`acceptedException=false`，未修改公共颜色合同。
- 全库检查由 root 在上述源稳定后独立执行；本子任务不替代那份全库结果。

此前 `scoped-third.json`、`scoped-fourth.json` 的 14/15 是导出遗漏的历史 dist 尚未恢复时的中间结果；`paint-regression-red.json` 证明新 P5 CSS 初始没有登记条目。旧 dist 和两份封存 node_modules JSON 已精确恢复，未绕过原检查。

`verification.json` 保存本次摘要、精确哈希和命令结果；`iterations/` 保留新后继自身的迭代。旧封存证据从未重签。固定历史 node_modules JSON 的 Git 白名单见 `required-historical-node-modules.json`。本子任务未执行 commit、push 或发布；用户授权的送审上传由 root 处理。
