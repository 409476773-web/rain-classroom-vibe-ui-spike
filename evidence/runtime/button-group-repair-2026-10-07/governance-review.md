# Button Group 有限治理审阅

2026-10-07。范围仅本轮独立授权、有限文件表、完成条件与冻结记录；组件实现和浏览器视觉尚未由本记录验收。

- 新授权使用 `buttonGroupRepair`，用户原句「继续修复」。必须保持已完成 G123 节点精确散列，完成还需 scoped 自动检查与独立审阅均通过。
- 新增合法／越权／Registry 身份伪造／接受转移拒绝测试通过；实际源绑定尚待 Root 实现完成后登记并验证篡改拒绝。
- G1/G2 Registry SHA 与修复前一致。旧 G123 `summary.json` 的 82 个源记录原文保留在本轮 `before/`，SHA 为 `8b47b915e794865e3a31f16eacd2d75687703172ed059112add1b10f624c4139`。
- 修复前已存在 lexical descriptor 绑定差额：实际 descriptor SHA `de87d10f8b2d373e195c43e4e82861036159ad31896fd00ecc08c9ac86e1aff7`，helper 原值 `9d11352daa27460cd8076e68f56e9833f511dcfaa2f78cfcf9551e4aeea71518`。差额来自上轮最终路由源修订；本轮会保留旧 descriptor，只以新的有限 successor 明确绑定 Button Group actual 源。
- 并行图表任务新加 `chartLibraryValidation` 顶层节点。全阶段检查报 `unknown status fields`；Workspace 的脚本集合错误由阶段读取失败后 workspacePhaseId=null 派生，并不能推断根脚本实际被改。本轮不修改图表记录、不增加全库豁免。以 Button Group before 加本轮节点进行 scoped phase 检查通过；当前全阶段结果不能宣称通过。
- 原有 210 项 Token 发现原文留存在 before。本轮不降低边界阈值，不把自动或原场景视觉检查转换成对比度接受或发布。

只读独立审阅来源：`/root/assetize_g2/repair_governance_review`；补充的「自动通过但独立审阅未通过仍拒绝完成」断言已落实。

## 实际源绑定复核

`source-bindings.json` 已冻结四个actual源与before散列；Workspace自动消费该绑定。4项有限治理检查通过，绑定字节、实际CSS和保留Registry篡改均被拒绝。独立只读复核确认lexical sourceFiles内存投影只改变ButtonGroup TSX一项；旧82源记录、descriptor、Registry、颜色登记和210诊断原文保持。B2 emits-only-Rain定向检查在外部phase未知字段处停止，不代表执行通过。

## 最终定向结果

最终 source-bindings 的 SHA 为 `8d497cc6315043155b478f0c48fd2a99004fb26a1c2c1e8a12de947615bc668b`，绑定5个实际产品／测试源与1个只读未变父CSS。修复初版4源绑定 `d4b42…` 原文保存在 `source-bindings-before-dark-fix.json`，并由新record检验保留。

局部深色四个paint声明保持精确选择器与角色，正文为text/critical:true，4.5阈值未变。正文在根/面板实际palette上的对比度为15.40/13.55，既有静态label读字为9.10；定向失败为空。Background行只登记背景，不修改既有Button、文档或G1 essential-boundary角色。暗色分支仅作用于该精确授权文档文件，其他消费者仍检查两主题。详情见 `doc-color-result.json`。

最终新治理5/5、测试类型、资产索引生成与check均exit0；Root浏览器7/7、相关行为113/113、UI/Playground类型和构建及独立实施审阅已核对日志。节点为completed/passed-scoped/passed-scoped，HumanGate仍awaiting_human。全库Workspace、Boundary、B2、Token仍exit1；并行chart未知phase及派生发现单列，当前Token217条、ButtonGroup新发现为空；旧210诊断原文和旧82/Registry/Gates保留。Evidence全库检查exit0。此记录不推导整体对比度接受、发布或迁移。
