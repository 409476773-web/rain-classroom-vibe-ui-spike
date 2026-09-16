# 表格 Pagination 替换验证

2026-09-14，用户明确要求现有表格统一使用新建分页器。工作目录为 `.worktrees/card-v2`；主目录的新 Pagination 作为只读来源。System Mode；组件仍为 registry-candidate，本地资料配方仍为 local-experiment。

## 结果与范围

已删除旧 `pageCount/onPageChange` 分页实现及表格底部独立的每页数量 Select；按原字节接入主目录已确认 Pagination 的六个源码/测试文件。来源哈希见 [source-lock.json](source-lock.json)，原组件限定视觉确认见 [upstream-verification.md](upstream-verification.md)。该文件为上游记录快照，其中历史相对链接以 source-lock 的 sourceRoot 为根解析。

`DataTableRecipe` 使用 `variant=data`、真实筛选总数、受控 page/pageSize、inline 容量入口、loading 和一个原子 onChange；页码转换只在宿主边界进行。保留初始 5 条及 5/10/20 选项，改容量遵循新组件合同，保留原首条所在的新页。查询仍回首页并清空选择，翻页/容量/表格卡片切换保留稳定 ID 选择。TableCaption 删除重复页码/总数；示例代码同步新 API。

本次共同覆盖 Playground [#table](http://127.0.0.1:5198/#table) 的表格和卡片，以及 prototype `#materials`。代码盘点确认其他原生表格是没有分页的规范/属性展示；图标图库和选择组合不属于本次表格范围。没有为其增加分页。

精确更新公共导出、Pagination Manifest、现有 table Registry 的完整源码及依赖、颜色和几何登记，并在 `componentRefinements.tableRn08.paginationReplacement` 独立记账。原 RN-08、RN-06 和其他历史验收保持不变；未改主目录、其他公共组件或 Foundation 值，未增加依赖。

## 实测

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 修改前完整治理 | passed | [baseline-governance.log](logs/baseline-governance.log) |
| 消费回归先失败 | 新组件总数不在旧分页中；1 failed / 2 passed | [red.log](logs/red.log) |
| Pagination 原组件、Table/Empty、资料消费 | 33/33 | [unit.log](logs/unit.log) |
| 来源哈希、精确授权、RN-06 历史保护与治理负例 | 241/241 | [governance-unit.log](logs/governance-unit.log) |
| 完整治理 | passed | [governance.log](logs/governance.log) |
| 全工作区类型与测试类型 | passed | [typecheck.log](logs/typecheck.log) |
| 生产构建 | passed，保留大 chunk 提示 | [build.log](logs/build.log) |
| Chromium / Firefox / WebKit | 15/15，零重试，35.1s | [browser.log](logs/browser.log) |
| diff 空白检查 | passed | `git diff --check` |

新消费检查实测：第 3 页、每页 5 条改为 10 条后在第 2 页，首行仍为“课堂活动设计”；选中资料保留；设置内 Enter 跳到首页；卡片视图保留容量；320px 浮层在屏幕边界内；加载中合成点击也不推进页码；无筛选结果共 0 条，前后翻页禁用。

既有 RN-08 浏览器流程同时复跑：排序/过滤/分页、只读项、跨视图/跨页选择、隐藏列、批量操作、刷新失败保留与重试、两种空态、两种密度、浅深主题、320/390 窄屏、键盘横向滚动、强制色彩和独立消费入口。测试检查 pageerror、console error 和框架遮罩。

截图和测量在 `/tmp/rain-table-pagination-browser/{chromium,firefox,webkit}`。已查看 Chromium light-compact、Firefox dark-default 和 WebKit narrow-320；单行分页正常，窄屏自动精简，表格滚动不带动页码区域。测试在 Vite 开发服务执行；生产构建另行通过，未部署。

修复过程中出现的检查问题均已解决：测试文字查询误命中组件的隐藏测量副本，改为可见 total Part；测试使用了不适用于 Testing Library 的 exact 选项，改用精确正则；新增颜色登记文件补入本批精确授权清单及历史夹具排除集合。没有改动分页器源码来绕过检查。

运行命令：

```sh
pnpm exec vitest run apps/prototype/src/data-table-recipe.test.tsx packages/ui/src/pagination/pagination.test.tsx packages/ui/src/table/table.test.tsx
pnpm exec vitest run scripts/table-rn08.test.ts scripts/layouts-v1.test.ts scripts/verification-helpers.test.ts
pnpm verify:governance
pnpm typecheck
pnpm build
RAIN_TABLE_EVIDENCE_DIR=/tmp/rain-table-pagination-browser pnpm exec playwright test --config tests/e2e/table.config.ts
```

## 状态边界

独立只读审阅：`/root/rn08_contract_review` 按本轮修改前副本复核，未发现可复现 P1/P2；独立检查六个文件与主目录/哈希一致、旧分页调用清除和原子更新，运行 36/36 定向检查通过，三类颜色/几何篡改负例均被拒绝。实施 completed、自动验证 passed、独立技术审阅 passed。

组件本身继承原 `pagination-current-runtime-visual-only` 确认，本次表格组合 Human Gate 保留 awaiting_human；Contrast Acceptance 未授予。Token 治理保留原有未接受 findings 与历史例外，不代表整体颜色通过。未运行全仓所有单元/浏览器测试；未进行真实读屏器或物理触屏验证。未提交、推送、发布、写 Figma 或迁移真实业务。
