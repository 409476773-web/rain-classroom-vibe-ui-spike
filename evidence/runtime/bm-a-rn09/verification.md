# RN-09 BM-A 验证

2026-09-15。RN-09 本地原型建设完成；自动验证、独立技术复核通过，当前页面及密度切换的人工确认已登记。授权为用户在资料库页面视觉确认后明确“继续按计划建设”；本批计划见[实施计划](../../../docs/plans/2026-09-15-bm-a-rn09.md)。原 V2 路线图冻结快照保持不变。

## 交付

- 独立 Prototype `#bm-a` 入口复用已有 DataTableRecipe，保留已确认的表格/卡片、两行工具栏、分页器、空状态和字段视觉层级。
- [场景状态合同](../../../apps/prototype/src/scenarios/bm-a/state-contract.md)明确搜索草稿与应用、筛选清空选择、跨页/跨视图 ID 选择、当前页全选、只读排除、批量发布和空状态恢复。
- 刷新改为可中止的异步读取；旧内容在加载或失败时保留，失败可重试。卸载或更换读取函数后，旧请求即使忽略中止，其成功/失败也不覆盖新结果或清除新请求的加载状态。
- 新完整资料集按稳定 ID 保留仍可操作的选择，清理不存在或变为只读的选择，并修正失效页码；重复 ID 返回按失败处理，不应用部分数据。
- 发布只改变已选且可操作的本地记录。默认刷新读取当前快照，保留本地发布结果。当前数据全部虚构，不连接真实接口或持久化。
- 修复生产预览发现的刷新提示遮挡重试按钮问题：局部提示增加 `pointer-events: none`，视觉与 Escape 关闭行为不变。

## 验证结果

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 当前配方、异步状态、权限验证、RN-08/RN-06 历史回归 | 5 文件，258/258 通过 | `/tmp/rain-bm-a-rn09/final-unit.log` |
| 原 Table 三浏览器回归 | 27/27 通过 | `/tmp/rain-bm-a-rn09/table-regression.log` |
| BM-A 生产构建预览，Chromium / Firefox / WebKit | 6/6 通过，15.4 秒 | `/tmp/rain-bm-a-rn09/final-browser.log` |
| 全工作区类型检查 | 通过 | `/tmp/rain-bm-a-rn09/typecheck.log` |
| Playground 与 Prototype 生产构建 | 通过；原有包体积提示仍在 | `/tmp/rain-bm-a-rn09/build.log` |
| 更新完成状态后的治理检查 | 通过；原有对比度待处理记录保留 | `/tmp/rain-bm-a-rn09/governance.log` |
| 公共包基线与差异格式 | 1963 个文件哈希不变；`git diff --check` 通过 | `before-hashes.json` |

BM-A 生产测试覆盖跨页/跨视图选择、只读排除、发布目标范围、刷新保留已发布状态、失败与重试、查询与清空、键盘打开排序菜单、390px 深色布局及两种空状态恢复；页面错误和控制台错误会使测试失败。无横向溢出检查通过。已查看 Chromium 1440px 浅色表格与 390px 深色卡片截图，当前排布可用；这不代替人工场景验收或正式对比度验收。

截图：`/tmp/rain-bm-a-rn09/final-browser/{chromium,firefox,webkit}/bm-a-table.png` 与 `bm-a-dark-cards.png`。首次生产测试发现 Chromium 重试被提示遮挡，修复并重新构建后完整重跑三浏览器通过。

复跑：

```sh
pnpm exec vitest run apps/prototype/src/data-table-recipe.test.tsx apps/prototype/src/scenarios/bm-a/state.test.tsx scripts/verification-helpers.test.ts scripts/table-rn08.test.ts scripts/layouts-v1.test.ts
pnpm typecheck
pnpm --filter @rain-next/playground --filter @rain-next/prototype build
RAIN_BMA_EVIDENCE_DIR=/tmp/rain-bm-a-rn09/final-browser pnpm exec playwright test -c tests/e2e/bm-a.config.ts
RAIN_TABLE_EVIDENCE_DIR=/tmp/rain-bm-a-rn09/table-regression pnpm exec playwright test -c tests/e2e/table.config.ts
pnpm verify:governance
```

## 来源、范围与登记

视觉依据继续使用已登记 VE-001 / VE-009 和[当前页面视觉确认](../table-two-row-toolbar/visual-acceptance.md)。本批没有重新选择视觉来源，也没有把 Classic 样式提升为 Rain Next 标准。

开始前保存 phase、Benchmark 登记、页面入口及配方基线于 `before/`，全部 1963 个公共包文件 SHA-256 基线见 `before-hashes.json`；收尾核对全部保持不变。没有新增依赖或公共组件 API。

仅更新 BM-A 当前实现、自动验证及范围内人工验收状态；其余三个 Benchmark 的原登记与 V2 原规划保持不变。边界验证只接纳本批精确文件与完整授权记录；历史检查先验证再剥离新记录，非法扩权仍失败。B2 临时测试仓库使用本批之前的 Benchmark 登记；RN-06 历史导出检查同步已授权的 Empty refinement 精确导出行，不重写快照或降低任意新增导出的拦截。

## 验收状态

RN-09 本地原型建设已结项：实现完成、自动验证通过、独立技术复核通过；BM-A 当前页面及默认/紧凑密度切换的人工确认已同步到 phase、Benchmark 登记与 Playground 索引。技术异常路径由自动测试与独立复核验证，不声称逐项人工测试，也不关闭 Card、Layout、Table 的其他父级 Gate。正式对比度、辅助技术与物理设备验收仍未授予；未发布、未迁移、未执行 Git 写入。

## 2026-09-15 密度入口修复

用户先回复“确认”，随后指出新页面缺少默认/紧凑切换；保留该场景确认记录；修复交付时新增密度入口待查看，后续确认见下节。原因是 Prototype 资料宿主写死 compact，未带入原组件页的密度控件。修复仅在宿主复用 Checkbox、Inline 和已有 DensityProvider；#bm-a 与共用宿主的 #materials 均可切换，不修改共享组件、样式规则或新建密度体系。

新增的浏览器回归先在原生产预览失败（找不到“紧凑密度”），修复并构建后 BM-A 全部 9/9 通过（Chromium / Firefox / WebKit，18.9秒）。两入口实测表头/普通行紧凑32/44px、默认44/50px，切换时当前表格/卡片与选择保留，支持键盘切换。额外实际几何检查确认同组四个查询控件分别统一28px、32px，默认390px无横向溢出；查看了390px深色紧凑及默认截图。

本次 Prototype 生产构建、全工作区类型检查、治理检查通过。日志：`/tmp/rain-bm-a-rn09/density-{red,browser,build,typecheck,governance}.log`；几何记录：`density-geometry.json`；截图：同目录 `density-default-1440.png`、`density-default-390.png` 及 `density-browser/`。原258项单元和27项表格检查为上一批结果，本次未重复运行。无独立审查、发布或Git写入。


## 2026-09-15 范围内人工确认

- 决策来源：用户在默认/紧凑密度切换修复交付后明确回复“确认。”。
- 确认入口：`http://127.0.0.1:5200/#bm-a`。
- 状态：accepted；范围：`bm-a-page-and-density-switching-only`。
- 覆盖当前 BM-A 页面及顶部“紧凑密度”切换：勾选为紧凑，取消为默认；默认表头/普通行44/50px，紧凑32/44px。当前场景沿用此前确认的两行工具栏与表格/卡片呈现。
- 本次仅更新确认记录，不改运行代码，不把 scoped acceptance 提升为公共组件、所有异步异常、对比度、辅助技术、物理设备或发布/迁移/Git 授权。父级状态继续单独管理。

确认时源码 SHA-256：

- `apps/prototype/src/main.tsx`：`5c33ce3735506a82bdf9cfbfae1ab718a5be2b8055b5318ebf0e0c63c146c8c6`
- `apps/prototype/src/data-table-recipe.tsx`：`2d7f8af95edaf51caff6c02c6626432961065b099d964aa2dea5dcb6cd6b8dd7`
- `apps/prototype/src/data-table-recipe.css`：`0d563bbc468d24fe8fccc9873214202b882959c40efa227f7ecc8ea240e848a0`


## 2026-09-15 独立技术复核与结项

授权：用户明确“继续完成独立技术复核和验收记录收尾”。独立审查代理 `/root/rn09_closeout_review` 只读审阅本批计划、状态合同、应用实现与检查，未修改运行源码。最终结论为通过，无剩余阻塞问题。

复核发现并关闭一项 P2：刷新后资料改名或改变状态而离开当前查询结果时，旧选择仍保留，可能出现零结果却仍能批量操作。根代理和审查代理均独立复现。现统一使用 TanStack 完整筛选结果与可选状态清理选择；不存在、只读、离开查询的数量合并反馈，其他页仍匹配的已选 ID 保留。修复不增加第二套筛选规则，也不改变已确认视觉。

独立验证记录：

- 原复现测试修复前失败，修复后1/1通过，日志 `/tmp/rain-rn09-independent-query-scope-fixed.log`。
- 修复后状态、选择交互与验收授权检查11/11通过（240项未选中未计入）；混合移除及跨页保留另1/1通过。日志 `/tmp/rain-rn09-independent-final.log`、`/tmp/rain-rn09-independent-mixed.log`。
- 审查代理还跑过修复前生产包的三浏览器组合检查3/3，未用于冒充最终生产验证。
- 复核通过的配方 SHA-256 为 `deee3f8ae1807af026e4c56f3a705138816f380f23504b54dcef491b522773f6`，根代理收尾再次核对。

根代理最终验证：

- 5个相关单元测试文件262/262通过：`/tmp/rain-bm-a-rn09/closeout-unit.log`。
- 修复后 BM-A 生产包三浏览器9/9通过（18.6秒）：`/tmp/rain-bm-a-rn09/closeout-browser.log`。
- 原 Table 与卡片三浏览器回归27/27通过（1.3分钟）：`/tmp/rain-bm-a-rn09/closeout-table.log`。
- 类型检查通过：`/tmp/rain-bm-a-rn09/closeout-typecheck.log`；生产构建记录位于 `closeout-prototype-build.log` 和 `closeout-playground-build.log`。包体积提示仍属现有记录。
- 完成状态下的治理检查通过：`/tmp/rain-bm-a-rn09/closeout-governance.log`；1963个公共包文件基线哈希不变，复核配方哈希匹配，`git diff --check`通过。原有对比度检查的已登记待处理项和例外保留，不伪报为阅读性通过。

登记只将 RN-09 的 `independentReview` 设为 passed，将 `humanGate` 设为带精确 `humanGateDecision` 的 scoped accepted。校验要求实现完成、自动检查与独立复核通过，拒绝缺少确认依据、扩大确认范围、跳过技术检查或夹带发布权限；此前冻结历史不重写，BM-B/C/D不改变。原计划要求均已有实现或明确状态合同，本轮不再追加功能；下一建设项为 RN-10，尚未开始。
