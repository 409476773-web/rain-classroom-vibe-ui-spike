# B06 可控 lazy Promise 补充证据

- 问题输入：任务卡要求慢首访、缓存、等待时离开、同文档 query 和首次直开焦点边界，不以浏览器偶然缓存代表慢加载。
- 真实原因/当前结论：生产 `ComponentAssetPage` 已把 `DocumentFocus` 放在相同 Suspense 提交内；本次验证没有发现额外生产缺陷。仅异步模块边界由可控 Promise 替代，生产 Suspense/focus owner 不变。
- 改动文件：新增 `apps/playground/src/routes/document-focus.test.tsx`；未改生产、现有 `component-assets.test.tsx` 或公共导出。
- 保留合同：root StrictMode；`navigationCount=0` 直开不主动聚焦；同一 navigation-list/navigation-bar query 不抢焦点；文档切换只由原 owner 聚焦。
- 实际命令：`node scripts/run-component-check.mjs B06 lazy-promise-unit-01 pnpm exec vitest run apps/playground/src/routes/document-focus.test.tsx apps/playground/src/routes/component-assets.test.tsx`。
- 结果：2 文件 7/7 passed，检查前后源输入一致。新增 3 用例覆盖：慢 G5 首访 resolve 前不聚焦/后聚焦、缓存 G5 下一文档即聚焦；pending Drawer 切至真实 Switch，旧模块 resolve 不抢焦点；慢 G6 首次直开默认 count=0 保持外部焦点。已有 4 用例保留导航与两类同文档 query 边界。
- 浏览器/视觉：本补充为 JSDOM 单元，不增加浏览器或人工视觉结论；浏览器范围仍由 B06 主结果记录。
- 未测：本单测不替代真实网络、辅助技术或跨浏览器 focus 审阅。
- 回退：删除这一新增测试；已封存日志保留。没有生产回退。
- 下一任务：C02 三组真实组合配方颜色/焦点矩阵。
