# 有限来源后继实现结果

- 工作范围：G01/G02 的 System 基础设施子任务；本记录不替代根任务结果或最终 Gate。
- 问题输入：本批已授权修改触及历史精确来源锁；直接改旧 after 或豁免 changed 文件会破坏旧来源证明，回退到 HEAD 又会丢失用户开工前已有修改。
- 真实原因：旧 deepReview → GitHub → closeout → G6 链精确绑定开工前文件字节与阶段记录，需要独立且有限的新后继保留旧链。
- 改动文件：scripts/component-implementation-successor.mjs、scripts/component-implementation-successor.test.ts、scripts/seal-component-implementation.mjs；本目录 README 与结果。
- 保留合同：旧 seal/assertion/phase/Human Gate 不修改；B00 的 68 文件 archive 与 index 固定哈希；其余 before 取固定 HEAD，新增才 before=null；未变化用户源不纳入本批。有限 scope 必须逐文件填写必做任务及原因；旧 proof、设计方法、条件任务、越界路径与 symlink 拒绝。新 phase 单独增加，deliverySummary 只能恰好六个字符串字段，authority 保持未授予人工接受与未发布。

## 实际检查

所有命令都由 `node scripts/run-component-check.mjs G01 <唯一检查ID> ...` 留存时间、输出、exit code 和输入 manifest。

| 检查 ID | 实际命令 | 结果 |
| --- | --- | --- |
| component-successor-red | pnpm exec vitest run scripts/component-implementation-successor.test.ts | exit 1；实现前导出不存在，预期红测 |
| component-successor-unit-01 | 同上 | exit 1；Vitest 动态 import 上下文限制，改为真实 Node 子进程验证 |
| component-successor-unit-02 | 同上 | exit 1；临时 fixture 缺仓库测试依赖和 symlink 清理方式问题，修正 fixture |
| component-successor-unit-03 | 同上 | exit 0，10 用例；过程中本子任务源有修改，不能视作固定候选证明 |
| component-successor-unit-final | 同上 | exit 0，10 用例；后继源稳定，全局 asset-catalog 并行变化 |
| component-successor-types | pnpm exec tsc --noEmit --project tsconfig.tests.json | exit 1；测试 stdio 数组与声明不匹配，移除可省参数 |
| component-successor-summary-unit | pnpm exec vitest run scripts/component-implementation-successor.test.ts | exit 0，11 用例；新增摘要字段与悬空 symlink 负例；后继 3 文件前后哈希一致，全局 verify-css-variables 并行变化 |
| component-successor-summary-types | pnpm exec tsc --noEmit --project tsconfig.tests.json | exit 1；后继文件已无错误，其他代理 CSS 测试类型未完成 |
| component-successor-types-after-integration | pnpm exec tsc --noEmit --project tsconfig.tests.json | exit 0；全体测试类型检查通过，输入 manifest 稳定 |

最新专项源哈希（component-successor-summary-unit 的 inputs-before/after 完全一致）：

- successor.mjs：d64467ce6ce96051259fb07350561c48a31760a598150c2a434a8b5df369d49b
- successor.test.ts：a677a97fe4dcc18bbd80ee067a44b510b6865ccdf833b72014528517c1e0479b
- seal-component-implementation.mjs：39b2bba38f7f9f4d54dd697abec09ad3e94223e6b09ce0312a09afeca402374c

测试以真实 11,377 文件历史闭包执行旧链、候选迁移、原始用户字节恢复、当前/历史篡改、合法路径与 symlink、仅新增 phase、Human Gate 守恒、候选覆盖拒绝和前版保留。日志中的预期 AssertionError 是负例被拒的输出，最终 11 个断言测试通过。测试 fixture 的 node_modules 使用仓库锁定测试运行时，不是独立消费环境证明。

## 边界与下一步

- 浏览器/视觉范围：无 UI 变化，未运行浏览器或视觉接受；不声称 Safari、VoiceOver、真实设备、对比度或 publication 已通过。
- 未测项：根实际候选尚需整合者显式 seal 后执行来源与完整必要 Gate；目前未创建 live source-bindings.json。本子任务单元检查不能替代最终同快照检查。
- 整合点：getG6SourceBindingView 优先 reader；旧链 callback 必须 deepReview → GitHub → closeout → G6；源迁移夹具包含完整旧 closure 及新 before/after/history。
- 回退点：B00 固定 archive/index 和计划 HEAD；回退必须同时恢复本批源到 B00 字节并移走本批 active 后继/新 phase，保留历史证据。不能只禁用后继而留下受锁源修改。三个新增实现文件和根整合入口由整合者成套回退。
- 下一任务：S01 模型派生 Starter 闭包和生成指南；最终 C01–C03 之后再由整合者统一导出与冻结 A02 包。
