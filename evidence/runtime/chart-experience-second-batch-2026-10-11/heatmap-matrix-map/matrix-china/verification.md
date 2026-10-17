# Matrix / China 第二批实际浏览器验证

工作区：`.worktrees/card-v2`，`codex/card-v2`；当前同工作区的 `http://127.0.0.1:5173` Playground。System Mode，现有未发布候选的必要私有修复；本记录不关闭 Human Gate、完整对比度、发布、迁移或 Git 状态。

## 当前结果

独立 `tests/e2e/chart-second-batch-matrix-china.spec.ts` 与本目录 `playwright.config.ts` 没有 webServer，未运行会覆盖历史证据的旧 spec。最终 Chromium：**4 passed / 0 failed / 0 skipped，34.332 秒**，见 `playwright-report.json`。四项均无浏览器 pageerror / console error；每项的 `*-browser-errors.json` 为 `[]`。本次 Playground 类型检查及 `tsconfig.tests.json` 类型检查均 exit 0。

- Matrix 390px：12×12 相似度、7×24 星期/小时；原生单一键盘入口、Ctrl+End 实际行/列/读数、内层滚动与 sticky 行标题遮挡边界、邻格稳定 DOM/焦点下数值更新、Escape、真实 0 / 缺测标签、长标题宽不超过容器 40%、等宽数字列、页面无横向溢出。细节见 `matrix-course-similarity.json`、`matrix-weekday-hour.json` 及同名 390px 截图。
- China 390px，normal / reduce：实际34个全国地区→选择器键盘广东21个地区→深圳440300详情；158→162 人更新保持选择身份，精确表相同值，返回全国；实际轻触选择、双指 pinch、放大后 touch drag、保存视图返回、模拟加载失败保留全国旧图34个地区并重试进入广东。未替换真实边界资源。
- 单指页面滚动：CDP touchStart→8次真实 touchMove→touchEnd，页面分别滚动98 / 96px，地图保持 `matrix(1, 0, 0, 1, 0, 0)`，无残留 tooltip；放大后同类拖移改变本地 transform，页面不滚动。
- 精确表：内容600px保留，scroll area390px；键盘 ArrowRight 到 `scrollLeft=210`，参与人数列 right=390px；全国/省内原有四列及值保持，页面 width=390px。见 `china-{no-preference,reduce}.json`、`china-exact-table-*-390.png`。

## 真实 RED 与最小修复

触摸 RED 在 normal / reduce 均复现：原生页面 pan-y 在 `pointercancel` 给出 clientX/Y=0/0，visx 将终止事件继续计算拖移；从 identity 跳为 `matrix(1,0,0,1,-355.8634948730469,-566.0374755859375)`。`red-pointercancel-*.json` 记录取消前已出现 -12.5px 移动、取消后的完整位移。`pre-fix-touch-report.json` 与 `pre-fix-touch-results/` 保留失败报告、截图和 trace。

唯一触摸实现拥有者为 `apps/playground/src/docs/components/chart-business/china-region-map.tsx` 的现有私有 MapBindings：capture 阶段阻止scale1单触点 pointermove / pointercancel 进入visx拖移；不 preventDefault，页面仍可原生 pan-y；cancel 使用既有 dragEnd 并清理指针集合。多触点及 scale>1 保持原处理。主题、图形、默认运动、共享 Choropleth 未修改。

精确表 RED：页面600px；TableScrollArea已有 maxWidth100% / overflowX auto，但 `.rain-china-data` 作为 grid item 的 auto min-width 被600px表的 min-content撑开。`red-exact-table-layout-*.json` 和 `pre-containment-report.json` 保留实际值。唯一结构修复为私有 `china-region-page.css` 的既有 `.rain-china-data` 增加 `min-width:0`，未改共享 Table / API、原值、列、颜色或用全局 overflow隐藏内容。

修前两个文件另存 `china-region-map.before.tsx`、`china-region-page.before.css`；两个 `*.diff` 记录精确变更。`source-red.json`→`source-after.json` 比较25个 Matrix/China源码、测试与真实边界文件，只有上述两处私有拥有者改变，其余23个文件一致。最终浏览器运行前后25文件全部hash一致，见 `source-parity.json`；没有扩大为共享资产、发布、迁移或 Git 操作。

尚未测试：200%浏览器缩放、实机 Safari / VoiceOver、物理触屏、生产性能与完整对比度。用户体验审阅保持独立；当前证据只覆盖所列数据、尺寸、输入与状态。
