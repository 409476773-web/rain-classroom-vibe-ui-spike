# 独立代码审阅：原件与历史证据守卫

2026-10-11，独立只读审阅 `getG4VisualRefinementSourceBindings` 及其反向测试，未修改源码或操作浏览器。

原实现仅将原 G4 证据的当前字节和 before 副本与可重生的绑定 SHA 对比。除已硬锁的原 source-bindings 外，六项历史证据不在不可变 G4 sourceFiles／retainedRecords 中；同时改写当前文件、before 副本和新绑定 SHA 可以穿透。实际 RED 见 `governance-baseline-rewrite-red.log`。

最小修补在解析前硬锁原 `baseline.json` 的完整字节 SHA，再验证其中全部 58 个实际 before 文件 SHA。因此 before 字节有独立锚点，三向改写无法通过；重采基线或改写其说明也被拒绝。9 项既有守卫中加入了对应反向覆盖。

两项 E2E 的独立前身重建继续对照不可变原 G4 after SHA；实际采集原件仍由 58 项循环验证，没有混淆这两种来源。

终稿补丁未发现阻塞问题。完整字节硬锁已固定文件清单与所有 SHA，不需要额外扩展 schema／数量守卫。代码审阅不构成人工视觉、颜色、发布或迁移接受。
