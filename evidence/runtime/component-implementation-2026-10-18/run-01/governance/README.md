# 本批有限来源后继

此目录是 G01/G02 的来源绑定基础设施，不是旧证据替换区。当前实现时根候选尚未封存；只有整合者在固定候选上显式执行 sealing 后，才会出现 source-bindings.json。

## 整合点

`getG6SourceBindingView` 优先调用 `readComponentImplementationBindings(root, status, parseYamlSubset, previous)`；`previous` 必须完整执行旧 deepReview → GitHub → closeout → G6，不能回调到当前入口造成递归。不存在本批 active binding 时返回 null，让旧流程继续；存在但不合法必须抛错，不能 fallback 掩盖失败。

返回值保留旧 sourceFiles、deepReviewSuccessor、githubReviewSuccessor、closeoutSuccessor，并增加 componentImplementationSuccessor。重复源只更新最终 after；旧 before 与证据保持。新增 phase 只进入 componentImplementation20261018；删除该记录后必须与开工前解析数据完全一致，旧人工 Gate、playgroundDeliverySummary 和所有历史授权均保持。

本批 phase 可带 `deliverySummary`，只能恰好包含 updatedAt、title、scope、currentWork、acceptance、limitations 六个字符串字段；不能夹带 accepted、publication 或 humanGate 字段。该摘要是当前工作说明，不改变固定 authority 中的人工 Gate 未授予、未发布和未执行 Git/Figma/业务迁移状态。

迁移测试使用 componentImplementationFixtureFiles(root)，它包含旧 GitHub/deepReview 闭包、本批 active binding、当前源、before/after 快照及保留版本。没有本批 binding 时仍返回旧闭包。

## 显式封存

先由整合者准备有限 JSON 文件映射：每个文件对应 taskIds（只允许 25 个必做任务）与不少于 12 字符的具体 reason。工具不会按 Git changed 自动生成白名单。清单必须包括 verifier、它的测试、sealing 工具和 status；其他条目只应是本批相对 B00 真正改变的源文件。

```
node scripts/seal-component-implementation.mjs --seal /absolute/reviewed-scope.json --revision candidate-01
```

revision 目录必须尚不存在。开工时已有修改从 B00 受哈希保护的 68 文件 archive 取精确字节；其他已跟踪源从固定计划提交读取；开工前不存在才 before=null。与开工前相同的用户源文件会被拒绝纳入，仍由原绑定负责。禁止符号链接、目录穿越、旧证据路径、旧后继模块、设计方法正文、条件任务与不在范围内的文件。

写出前先在临时只读投影中恢复旧闭包并运行原链。每版保存当前 before/after 与 binding；后续显式封存保存所有前版记录与字节并验证哈希。active 仅指向新版本，旧证据不会被改写。绑定文件和 verifier 常量相互绑定；源变化后需要新的明确版本，不能只改记录中的 after。

## 验证边界

专项测试使用临时复制的真实 11,377 文件来源闭包，依赖使用仓库锁定测试环境；这不是独立 Starter 的安装或可移植性证明。夹具仅执行 Git 对象读取，没有修改共享 Git 元数据。

必要负例覆盖当前源、before/after、旧 proof、有限清单、旧阶段和 Human Gate、六字段摘要的缺字段/错类型/越权字段、源/父目录 symlink、输出父目录及悬空 symlink、未变化用户源、候选覆盖以及前版历史改写。根候选的最终来源核验及完整质量门仍由整合者在显式封存后执行。
