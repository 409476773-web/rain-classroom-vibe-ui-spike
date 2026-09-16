# RN-08 验证与接续

最新操作行调整：刷新/显示列居左，取消/发布居右，取消仅选中时显示；[验证记录](../table-action-order/verification.md)。

最新本地交互：查询/筛选生效后新增实心圆圈叉图标的“清空筛选”文字按钮，[验证记录](../table-clear-filters/verification.md)。该本地迭代不覆盖下文历史或扩大既有视觉验收。

最新更新：2026-09-14 已为 Input / SearchInput / Select 实施可选框内固定标题，并接入资料筛选栏。当前实现及验证见 [框内固定标题](../inside-field-labels/verification.md)；下文保留各批次历史。

此前更新：2026-09-14 按用户确认的四项视觉要求，完成浅色 hover、统一辅助表头、两种密度行高及本地组合尺寸，证据见 [表格视觉调整](../table-visual-refinement/verification.md)。

后续更新：2026-09-14 依用户要求，旧分页与独立容量选择器已替换为主目录新建、已确认的 Pagination。当前实现与证据见 [表格分页替换](../table-pagination-replacement/verification.md)；以下保留原 RN-08 批次历史。

日期：2026-09-14。结果：实施 completed / 自动验证 passed / 独立技术审阅 passed；Human Gate awaiting_human，对比度接受 not-granted。Table、Pagination、Empty 均为 unpublished registry-candidate，本地数据配方为 local-experiment。

## 实施范围与基线

用户“开始建设”接续 V2 RN-08；已核对主工作目录 RN-07 当日技术收口。工作位置：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`，现有分支 `codex/card-v2`，基线 HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。未创建分支或提交。

- 原生 Table 部件与具名横向滚动区；受控 Pagination；开放组合 Empty。
- 单一 TanStack v8 模型的本地资料配方：虚构数据、排序/查询/分页、稳定 ID 选择、列设置、表格/卡片、模拟刷新/失败重试、两种空态及本地批量操作。
- Playground `http://127.0.0.1:5198/#table`；prototype 独立入口 `http://127.0.0.1:5199/#materials`（需启动该应用）。
- 仅 prototype 增加精确依赖 `@tanstack/react-table@8.21.3`，精确传递依赖 `@tanstack/table-core@8.21.3`；来源、完整性与版本差异见 [source-lock.json](source-lock.json)。公共 UI 不依赖数据引擎。

[before-hashes.json](before-hashes.json) 保存实施前 2182 个文件的哈希；[before-phase.yaml.txt](before-phase.yaml.txt) 保存此前阶段。RN-08 与既有 RN-06 检查共同验证旧阶段全部保留、共享包原文件保持不变（公共 index 仅精确增加三项导出），原锁文件解析去除本次两项依赖的精确 package/snapshot 后一致。治理改动限定到新文件、依赖与 Token consumer；Foundation 值未变。

## 已执行验证

| 检查 | 结果 | 记录 |
| --- | --- | --- |
| 定向单元与治理负例 | 6 个文件，250/250 | [unit.log](logs/unit.log) |
| 最终空态修改后的受影响单元复跑 | 5 个文件，15/15 | [final-unit.log](logs/final-unit.log) |
| RN-08 Chromium / Firefox / WebKit | 12/12，零重试 | [browser.log](logs/browser.log) |
| 既有 Card / Dialog / Layout，Chromium | 25/25，零重试 | [regression.log](logs/regression.log) |
| 类型检查 | passed | 执行 `pnpm typecheck`，含 tests 类型检查 |
| 生产构建 | passed | [build.log](logs/build.log)，保留大 chunk 提示 |
| 完整治理 | passed | [governance.log](logs/governance.log) |
| 独立技术审阅 | passed | [independent-review.md](independent-review.md) |
| diff 空白检查 | passed | `git diff --check` |

单元检查命令：

```sh
pnpm exec vitest run scripts/table-rn08.test.ts scripts/layouts-v1.test.ts scripts/verification-helpers.test.ts packages/ui/src/table/table.test.tsx packages/ui/src/dialog/dialog.test.tsx apps/prototype/src/data-table-recipe.test.tsx
pnpm verify:governance
pnpm typecheck
pnpm build
pnpm exec playwright test --config tests/e2e/table.config.ts
```

250 项包含既有验证助手的 235 项负例/历史保护；15 项复跑是其余五个文件，二者不可累加为不同检查。未运行全仓所有单元或所有浏览器套件。Card / Dialog / Layout 回归使用同一 5198 入口和 5199 prototype，临时单引擎配置（card.spec.ts、dialog.spec.ts、layouts.spec.ts），不改既有测试或证据路径。

## 浏览器事实与修复

浏览器覆盖查询重置页码/选择、当前页可操作项全选、只读项禁用、跨页与跨视图保留选择、排序语义、隐藏列独立于卡片、加载禁用、失败保留/重试、本地批量操作、无数据/无筛选结果、独立消费入口。每次检查页面错误、控制台 error 和框架错误覆盖层。

三引擎分别采集浅/深 × compact/default 四种截图与测量，以及 390px / 320px 窄屏截图：

- [Chromium 测量](chromium/measurements.json)，[浅色紧凑](chromium/light-compact.png)，[深色默认](chromium/dark-default.png)，[320px](chromium/narrow-320.png)。
- [Firefox 测量](firefox/measurements.json)，[深色紧凑](firefox/dark-compact.png)。
- [WebKit 测量](webkit/measurements.json)，[390px](webkit/narrow-390.png)。

表格字形链含 PingFang SC；字号 14px / 行高 22px；单元格紧凑为 8px 16px，默认为 12px 16px。横向溢出留在表格区域，页面不横向溢出；320px 空态按钮实际左右边界在 16–304px 内。上述链接截图已逐张人工式查看；其余截图由自动化留存。

复现后修复：WebKit 原生左右键未滚动，TableScrollArea 仅在自身焦点、无修饰键且用户回调未阻止时滚动半屏，不拦截子控件；原空态位于宽表格内将操作推出屏幕，现移到滚动区外。强制色彩模式下选中行保留系统色轮廓，Tab 焦点可见。

选择色最初搭配不通过文字对比检查，改用现有 Fill/Brand/Alpha/4；Table 实际文字角色的声明色对检查通过。完整 Token 治理仍明确保留既有 Tag / Select 等对比度与色族资格待审项及历史接受例外，不能解释为整体对比度通过。

浏览器使用 Vite 开发服务；生产构建另行通过，未将开发截图冒充生产部署证据。初期测试点击 sr-only 原生 checkbox 被其可见绘制层拦截，已改为实际点击关联 label；未通过强制点击掩盖产品问题。

## 保留边界与下一步

人工视觉与对比度接受、真实 IME、屏幕阅读器、物理触屏、完整 BM-A 均未关闭。未接真实接口、未加入虚拟化或全结果全选；未发布 Registry/包、迁移业务、写 Figma、提交或推送 Git。

机器状态见 `status/current-phase.yaml#componentRefinements.tableRn08`，设计/接续见 [实施计划](../../../docs/plans/2026-09-14-table-rn08.md)。V2 roadmap 自声明为原始规划快照、不回填实施状态，因此原样保留。当前可进行本批人工视觉验收；后续建设 RN-09 前重读其依赖与当时阶段，不扩张本次范围。


## 当前资料库页面的视觉确认（2026-09-14）

用户明确“确定。该页面视觉确认”，当前`#table`页面组合的运行视觉已确认。最新两行工具栏、资料表格/卡片及14px数量修订的范围和版本见[页面视觉确认记录](../table-two-row-toolbar/visual-acceptance.md)。此局部页面确认不代替RN-08共享资产的父级Human Gate。
