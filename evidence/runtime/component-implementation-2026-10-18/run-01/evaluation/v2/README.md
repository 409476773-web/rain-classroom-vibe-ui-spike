# A01 评估侧材料

先读 evaluation-protocol.md。本目录不可整体交给独立消费代理。

- 校准：calibration/prompts.json；答案仅在 calibration/evaluator-rubric.json。
- 首稿：每例只派发 independent/EVAL-XX/E0.md、data.json 与同一最终冻结 M1 Starter。
- 改造：E1.md、E2.md 按阶段单独派发；evaluator/ 下内容始终留在评估侧。
- 当前状态：协议与题目冻结；评测未执行，最终 Starter 尚未绑定，人工门未接受。
- 核验：在此目录执行 node verify-a01.mjs。
