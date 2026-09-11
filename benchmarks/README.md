# Visual Evidence 与 Benchmark 登记说明

本目录把 Spike 的评测切片与 Figma 来源节点建立可检查的关系。登记仅保存 Figma file key 和 node ID，不保存完整来源 URL。

## 文件与关系

- `../evidence/visual-evidence.yaml` 是 Visual Evidence 主登记表，每个 Figma 节点只有一个 `VE-*` ID。
- `benchmark-registry.yaml` 是四个 Spike Benchmark 的登记表，通过 `evidenceId` 和 `nodeId` 双重指向 Visual Evidence。
- Visual Evidence 中的 `benchmarkRefs` 必须与 Benchmark 中的 `visualEvidenceRefs` 反向一致。同一条证据可以支持多个 Benchmark，例如 `VE-009`。

## 状态语义

| 状态 | 含义 | 不代表 |
| --- | --- | --- |
| `registered` | 节点或 Benchmark 已获得稳定 ID 并写入对应登记表 | 本次已打开 Figma 节点并重新检查 |
| `conversation-confirmed` | 登记内容来自已确认的项目会话；它是 `registrationBasis`，不是生命周期状态 | 实现或视觉质量已确认 |
| `not-live-reinspected` | 本次登记没有现场读取或视觉复核 Figma | 证据失效，但后续实施前应先复核 |
| `live-reinspected` | 已打开精确节点并检查内容；安全截图入库，含身份字段的画面按隐私规则不入库 | 已实现、自动验证或通过人工 Gate |
| `not-started` | 登记表没有声明已完成代码实现 | 组件、布局或页面已可交付 |
| `not-run` | 未声明已完成未来组件或运行时的自动验证 | Day 0 登记文件本身不可做语法/引用检查 |
| `not-evaluated` | 未记录人工设计 Gate 结果 | 视觉质量已通过人工确认 |

因此，“已登记”、“已现场复核”、“已实现”、“自动验证”和“已通过人工 Gate”是独立状态，不得相互替代。两个 YAML 的 `projectLifecycle` 还分别记录 Figma 材料写入、Figma Component 发布、代码包/Registry 发布、业务迁移、本地 commit 与远程 Git；Day 0 均保持未授权、未创建或未配置。

## 增补 Visual Evidence

1. 先确认 Figma file key 和 node ID，并检查二者组合在主登记表中尚未存在。
2. 按现有顺序分配下一个唯一 `VE-*` ID。页面名称未经确认时，使用 `Reference page <nodeId>`，不猜测业务名称。
3. 初始登记状态为 `registered`，依据为 `conversation-confirmed`；其余状态保持 `not-live-reinspected` / `not-started` / `not-run` / `not-evaluated`，直到对应活动真正发生。
4. 如果证据加入 Benchmark，同时更新 Visual Evidence 的 `benchmarkRefs` 和 Benchmark 的 `visualEvidenceRefs`。

## 复核与状态升级

1. 使用登记的 file key 和 node ID 打开精确节点，核对内容、布局、密度、字体、色彩和交互状态。
2. 只有完成现场复核后，才能把 `liveInspection` 改为明确的已复核状态，并应同时记录复核日期与证据产物位置。
3. 实现状态只能根据代码与运行验证证据更新。
4. 人工 Gate 状态只能由人工设计审核结果更新，自动化测试或截图不能代替它。

## 2026-09-01 现场复核

14 个登记节点已逐一完成只读现场复核。12 张不含明显身份字段的截图保存在 `../evidence/screenshots/`；VE-005 与 VE-010 因包含疑似学生/教师身份信息不进入仓库。跨节点结论、差异与保留截图的 SHA-256 见 `../docs/audits/2026-09-01-visual-asset-audit.md`。四个 Benchmark 的全部正式来源节点均已复核，因此其 `liveInspection` 同步为 `live-reinspected`；“已复核”不要求将含敏感内容的截图入库。

这次状态升级只覆盖来源复核。Implementation 仍为 `not-started`，自动验证仍为 `not-run`，Human Gate 仍为 `not-evaluated`；Figma 写入、Figma Component/Variant、包/Registry 发布、业务迁移、本地 commit 和远程 Git 也没有由此获得授权。

## 一致性检查

每次变更后至少检查：

- Visual Evidence ID 唯一；
- `(fileKey, nodeId)` 组合唯一；
- Benchmark ID 唯一；
- Benchmark 中每个 `evidenceId` 都存在，且其 `nodeId` 与主登记表一致；
- 两个登记表中的双向 Benchmark 引用完全对称；
- registration、registrationBasis、live inspection、implementation、automated verification 与 human Gate 没有被合并为单一状态。
