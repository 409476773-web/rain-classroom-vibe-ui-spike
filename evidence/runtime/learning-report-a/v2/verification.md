# 学习报告 V2 实施与验证记录

日期：2026-09-20。范围：Prototype Mode / 页面私有实现。用户已确认第二版设计方向、留白修订与蓝色提交缺口图，并明确授权使用 frontend-design 开始实施。

预览：[学习报告](http://127.0.0.1:5369/#learning-report)。依据：[确认稿](../../../../docs/design-reviews/learning-report-v2/visual-proposal-refined.png)、[实施计划](../../../../docs/plans/2026-09-20-learning-report-v2.md)。本记录证明本地实现及定向验证，不代表整页 Human Gate、无障碍验收或共享资产发布通过。

## 本次落地

- 三个连续章节：本期学习概览、班级与提交分析、周度明细。概览以蓝色成绩卡、浅紫完成卡和整体趋势组成；班级颜色在比较与明细中保持一致。
- 班级平均分与提交率同时显示，趋势指标切换只影响趋势。全局班级及周期筛选同步三个章节；单班不显示双班差异结论。
- 提交缺口使用蓝色柱图，默认六周为 15、13、11、9、7、5 份。图旁解释 60 份缺口、前两周 28 / 60 份占 46.7%，核查建议融入同一卡片。
- 周度明细保留全部 12 行，合并已交 / 应交，强调已交数字，增加未提交数，提交率配微型条形。无数据与观测零值分别处理。
- 复用 Rain UI、图标、字体、Token 及已安装 Recharts；宿主继续管理筛选与加载状态。原 `#bm-d` 保留原有展示与固定周读数。

实现位于 `apps/prototype/src/scenarios/bm-d/{page.tsx,report-sections.tsx,trend-chart.tsx,report-a.css}`，状态合同及定向检查同步更新。共享组件、全局 Token、Figma、依赖及 Git 历史未修改。

## 构建与定向检查

| 检查 | 结果 |
| --- | --- |
| `pnpm --filter @rain-next/prototype build` | 通过，含 TypeScript 检查；存在产物体积提示 |
| `pnpm exec vitest run apps/prototype/src/scenarios/bm-d/state.test.tsx` | 8 / 8 通过；新增状态行为先确认失败，再完成实现 |
| `pnpm exec playwright test --config tests/e2e/learning-report.config.ts` | 2 / 2 通过，最终样式修订后重跑通过 |
| 页面 CSS Token 名称核对 | 57 个引用均有定义；仅证明引用存在，不等于全库颜色治理通过 |

浏览器检查包含趋势与缺口键盘读数、帮助浮层 Escape / 焦点恢复、全局筛选、趋势开关隔离、失败重试、空数据恢复、原路由、字体及控件尺寸、四种宽度无整页横向溢出。手机表格保留局部横向滚动。

## 布局与视觉证据

已逐张查看桌面、平板、手机和深色整页截图；修正了手机解读区额外间距和深色背景透明叠加问题。章节间距 24px，桌面内边距 32px，窄桌面 24px，手机 20px × 16px。内容最大宽度 1200px。

内容驱动断点：900px 及以下缺口图与解读堆叠，解读可横向分三列；760px 及以下概览和双指标比较也堆叠，解读改纵向；640px 及以下收紧外边距。未把评论的 1115px 视口写成专用规则。班级比较值统一 16px，趋势按钮组高 32px。

- [桌面 1440](1440.png) · [桌面 1115](1115.png) · [平板 900](900.png) · [手机 390](390.png)
- [深色](dark.png) · [强制颜色](forced-colors.png) · [布局读数](geometry.json)
- [Token 引用](token-references.json) · [构建输出](build.log)

## 未通过及未覆盖项

1. **全库颜色治理未通过**：`pnpm verify:tokens` 仍基于早期报告 A 的固定消费者登记和校验值，本次 V2 的新选择器、渐变及颜色消费尚未纳入该登记；输出也包含其他页面的问题。不能全部归为既有问题，也没有修改检查器来绕过结果。详见 [tokens.log](tokens.log)。
2. **全库边界检查未通过**：`pnpm verify:boundaries` 报告页面私有 `report-sections.tsx` 的图表导入不在旧授权清单，以及完整 Day 3 文件清单不匹配；新增专用浏览器配置也不在该清单。保留既有治理边界，不在本次页面实现中扩张共享范围。详见 [boundaries.log](boundaries.log)。
3. **浅色辅助文字对比度未验收**：浅色模式中范围说明约 3.13:1，白底坐标刻度、分母、备注约 3.71:1，低于普通小字 4.5:1；主要比较数值约 15.46:1。保留用户要求的浅色层级并明确记录，`contrastAcceptance: not-granted`。详见 [contrast.json](contrast.json)。渐变表面及深色模式没有完成逐像素、逐状态的完整对比度审计。
4. 屏幕阅读器实机、真实触摸设备及全站回归未覆盖。截图和定向测试不代替用户整页视觉评审；当前 `humanGate: awaiting-browser-visual-review`。
