# 历史测试 fixture 分层修复

本次只修改 `scripts/slider-closeout.test.ts`、`scripts/date-picker-closeout.test.ts`、`scripts/library-governance-closeout.test.ts`。原件保存在 `../history-fixture-before/`。未修改共享 helper、治理规则、产品 UI、旧证明或 Gate。

## 修复内容

原 fixture 混入当前源与旧证明，导致新有限来源检查在旧负向检查之前拒绝输入。历史分支现恢复封存 predecessor 的原字节，并逐项校验原 SHA；当前分支仍消费真实新 binding。对提前拒绝的错误只接受本次变异的精确路径和明确旧拒绝类别，没有通配 `Error`。

DatePicker 的共享链正向还读取六个 owner。其原 baseline/intake/initialBaseline/priorSourceBindings、sourceBindings/protected inventory、before 与 retainedEvidence 已按明确清单一次补齐，随后由封存 source projection 覆盖真实源。`historical-dependencies.json` 记录实际调用图与有限复制清单。复制 fixture 文件不改变旧 reader 的 SHA、路径、字段和 Gate 校验。

## 鲜活验证及边界

| 验证 | binding | 结果 | 证据 |
| --- | --- | --- | --- |
| Slider 原11项 | `bb341242…` | 11/11通过 | `final.log` / `final.json` |
| Library 原12项 | `bb341242…` | 12/12通过 | `final.log` / `final.json` |
| DatePicker 原6项，含当前新链及完整历史正负向 | `a76b6acc…` | 6/6通过，40.81秒，exit0 | `date-picker-final-02.log` / `date-picker-final-02.json` |

此前 `final.json` 为28/29；失败项正是历史链 fixture 缺 intake，已由最后正式6项补跑覆盖。Slider/Library 测试源字节未再变化；没有把不同 binding 的结果写成“29项在同一最终 seal 一次全过”。隔离历史诊断 `date-picker-history-precheck-04.*` 只用于封存前排查，其他5项由命令选择过滤，不替代正式6项。

29个原测试与37个拒绝断言全部保留，拥有的源码没有增加 skip/todo；显式历史正向先通过再检查本次变异。`preservation-check.json`、`source-hashes.json`、`summary.json` 保留计数和最终源 SHA。最终 binding SHA：`a76b6acc6fe0d45808d1894bd58774ff117f8279b86b72d2532e5849aa27192a`。

未据此扩大整库、视觉、人审、对比度、无障碍、发布或业务迁移结论。
