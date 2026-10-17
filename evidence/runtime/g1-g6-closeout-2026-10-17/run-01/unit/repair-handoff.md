# Fixture 最小修复交接

已停写，下列四个文件可由治理后继 agent 纳入最终有限绑定：

- `scripts/verify-boundaries-navigation.test.ts`：临时 fixture 使用现有 node_modules 目录链接，恢复 vite 解析；保留所有 18 个正负用例。
- `scripts/g6-governance.test.ts`：原始 G6 fixture 根据已封存 binding/保护源/并发观察 SHA 选择精确保存字节；当前后继独立测试。原始 fixture 显式不复制 10/17 当前后继记录。
- `scripts/date-picker-visual-feedback-governance.test.ts`：为精确 SHA 匹配增加 G6 before；coherent fixture 恢复声明未变的有限旧源（包括 styles.css），不重签旧证据。
- `scripts/select-unification-test-fixture.ts`：当前 successor fixture 只复制 10/17 record 的 projectedFiles、retainedFiles、sourceFiles 与 beforeSnapshot；未复制整个后继目录。

验证：

- 初始全库红态：G6 6/10 失败、DatePicker visual 6/7 失败、boundary 18/18 失败。
- repair-01：上述 G6/DatePicker 两文件合计 9 通过/8 失败。
- repair-02：合计 11 通过/6 失败；其中 G6 原始 fixture 7/10 通过，剩 3 项涉及当前 root 治理源链；DatePicker 4/7 通过，后续 styles 精确恢复继续推进。
- repair-03：DatePicker visual 5/7 通过，2 失败。`updates only the two CSS ledgers...` 的下一层为 `G5 color source changed: packages/ui/src/slider/slider.css`；另一项是 `preserves the entire prior phase...` 的未知阶段负向回归：期望 `/Invalid Token/`，当前 root 链先报 Drawer 阶段保留错误，待最终治理绑定稳定后复测。coherent predecessor 正向读取已通过。
- 共享 helper 最后接入有限 10/17 清单后，尚未在最终绑定上复测。治理 agent 需先以这四个稳定文件重封新后继，root 再运行受影响范围。未跑第二次全库。
- 边界 fixture 的依赖修复尚未单独重跑；它依赖最终后继绑定稳定。所有原断言保留。

未修改：任何治理 .mjs、verification-helpers.mjs、产品 UI、phase 或旧 evidence。

快照：`repair-before/`；最终四文件 SHA：`repair-source-hashes.json`。并发治理与 root 文档/Starter 的修改不由以上定向结果证明最终通过。
