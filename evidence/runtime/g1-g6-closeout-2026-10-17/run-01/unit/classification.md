# G1–G6 初始全库单元回归分类

本轮为收尾前的初始差额回归，属于 System Mode 只读验证。未修改源码，未启动浏览器测试，也未直接执行工作区 source-bind 生成器。Carousel 源测试内部调用只发生在临时 fixture 中；工作区测试相关源基线前后为 0 差异。

## 实际执行与数字

- 命令：`pnpm exec vitest run --maxWorkers=2`。
- 开始：2026-10-17 00:01:55（Asia/Shanghai）；耗时 450.24 秒；退出码 1。
- 文件：317 个，273 通过、44 失败。
- 用例：3,563 个，3,243 通过、195 失败、125 跳过。
- 另有 2 个 suite setup 失败；均属于 Tailwind B2 前驱 fixture，因此引起 125 个跳过。
- 全部失败段落均来自 `scripts/**`；本轮没有 `packages/**` 或 `apps/**` 测试文件失败。此结论只覆盖本轮自动单元测试，不构成视觉、辅助技术、真实设备或发布验收。

## 按实际错误分组

每条失败用例只归入一个主组；数字依据原始日志，组间无重复。共同前序源链会让多组出现次级症状，不能把它们视作 195 个独立产品缺陷。

| 主组 | 失败用例 | suite setup | 主要文件 |
| --- | ---: | ---: | --- |
| Drawer 旧阶段投影未接入后续 Attachment / ConversationComposer 等记录 | 57 | 2 | `scripts/checkbox-governance.test.ts`, `scripts/date-picker-closeout.test.ts`, `scripts/dropdown-family.test.ts` 等 |
| 旧冻结历史/授权读取器拒绝当前阶段，连带旧组件治理断言失败 | 70 | 0 | `scripts/checkbox-governance.test.ts`, `scripts/dialog-refinement.test.ts`, `scripts/dialog-v2.test.ts` 等 |
| 授权、CSS 解析或 Registry 清单的次级失败（需随公共源链修复复测） | 9 | 0 | `scripts/dropdown-batch-one.test.ts`, `scripts/dropdown-family.test.ts`, `scripts/g4-components-governance.test.ts` 等 |
| 边界测试临时副本缺少 vite 依赖，子进程未进入边界检查 | 18 | 0 | `scripts/verify-boundaries-navigation.test.ts` |
| 旧治理测试临时副本缺少 Drawer 后继证据目录 | 18 | 0 | `scripts/date-picker-closeout.test.ts`, `scripts/g5-components-governance.test.ts`, `scripts/library-governance-closeout.test.ts` 等 |
| DatePicker visual fixture 未找到 verify-g5-components.mjs 精确历史源 | 6 | 0 | `scripts/date-picker-visual-feedback-governance.test.ts` |
| DatePicker UX fixture 的 styles.css 与期望前驱不一致 | 3 | 0 | `scripts/g5-date-picker-refinement-governance.test.ts` |
| G6 fixture 混用了不同后继的详情页字节与源绑定 | 4 | 0 | `scripts/g6-governance.test.ts` |
| Drawer paint ledger 声明的 4 个新增项有 2 个未在比较差额中匹配 | 5 | 0 | `scripts/drawer-color-consumers.test.ts` |
| G6 paint inventory 未能精确覆盖当前 CSS 声明集合 | 2 | 0 | `scripts/g6-color-consumers.test.ts` |
| Drawer 指南前驱投影仍包含后续新增组合说明 | 1 | 0 | `scripts/drawer-refinement-governance.test.ts` |
| Carousel 原始 successor fixture 的资产索引夹带后续条目/DrawerBody | 1 | 0 | `scripts/carousel-upgrade-source.test.ts` |
| RN14 Starter 缺少新指南链接指向的 conversation-composer Manifest | 1 | 0 | `scripts/rn14-starter.test.ts` |

## 可直接定位的根因证据

1. `scripts/verify-boundaries-navigation.test.ts:59` 复制工作区时排除了 node_modules，但没有给临时目录提供依赖；后继 `scripts/drawer-refinement-governance.mjs` 导入 vite，18 次子进程均以 `ERR_MODULE_NOT_FOUND` 结束，未走到本应检验的 allowlist 逻辑。
2. `scripts/select-unification-test-fixture.ts` 的有限复制清单没有携带 Drawer 后继证据。18 次失败在临时目录读取 `evidence/runtime/drawer-refinement-2026-10-14` 时 ENOENT；主工作区并不缺少该证据。
3. `scripts/date-picker-visual-feedback-governance.test.ts:67` 仅检查有限旧前驱目录，6 个用例都在 `:75` 找不到 `scripts/verify-g5-components.mjs` 精确历史源。
4. `scripts/g6-governance.test.ts:36` 优先读取 Carousel before 文件，但相关 G6 binding 与 `component-asset-page.tsx` 的两个已记录 after hash 不一致（69928… / 5713d…），4 个 fixture 先失败。
5. `scripts/drawer-color-consumers.mjs:105` 检查剩余新增 paint 时得到 2，期望 0；该 5 失败是有限登记与实际差额的不一致，并非已经测得对比度失败。
6. `scripts/rn14-starter.test.ts:30` 导出的 Starter 不含指南链接 `../../manifests/recipes/conversation-composer.yaml` 指向文件。这是独立消费交付完整性失败。
7. Drawer phase projection 的 diff 明确显示后续 `attachmentFunctions` 与 ConversationComposer 等记录未被前驱读取器投影；Carousel / Drawer 的旧指南、索引比较同样混入后续独立新增条目。应为合法后继建立有限验证路径，不能改写旧验收或宽泛绕过检查。

## 范围、并发变化与待复测

- 保存了 3,584 个文件的源归档及 SHA-256 清单，另保留 Git 前态。快照范围详见 `source-baseline.json`，不包含一般 README/docs 文件。
- 中途与结束后对该清单复核均为 0 差异，见 `source-stability-midrun.json`、`source-stability-after.json`。
- 主 agent 在本轮运行中修改 `README.md` 和 `docs/ai/README.md` 的入口说明，并新增计划/本轮证据；另一个 agent 随后将修复治理脚本。因此本轮不声称最终修改后的全量源已通过；并发说明见 `concurrent-work-observation.json`。
- Canvas getContext 未实现提示单独留在原始日志中，不计作断言失败。
- 需要在治理与 fixture 修复后做必要定向复测；浏览器、Safari、VoiceOver、真实触摸、对比度人工验收、发布与业务迁移均不由本轮关闭。

## 证据入口

- `vitest.log`：完整原始日志。
- `exit-code.txt`：进程退出码。
- `summary.json`：本轮数字与主组。
- `failure-details.json`：197 个失败段落，含 195 个用例与 2 个 suite setup 的堆栈和分类。
- `source-baseline.tar.gz`、`source-baseline.json`：本轮测试相关源的初始快照。
- `vitest-cache-results.json`：累积缓存的原始诊断快照，含旧运行项目，不用于本轮数字与结论。
