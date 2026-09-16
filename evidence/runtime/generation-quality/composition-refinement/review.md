# BM-D composition refinement · 2026-09-16

Authorization: 用户要求“按照我们发现的问题和讨论出的方法，自我修复一轮”。本轮落实于 BM-D；视觉效果待用户查看。

## Scope

收敛为 14px 正文、16px 标题/关键数字；统计口径集中到帮助入口，趋势临时读数与固定对照明确命名；观察与示例建议共用容器；全量展示最多 12 条筛选明细。保留正常尺寸控件、统计定义、缺测、请求锁与错误恢复。共享 UI/Foundation/Layout、BM-C 与数据源冻结，以 before.json 对照。

## Verification

Implementation completed for this local BM-D refinement. Automated verification and independent technical review passed. Human Gate awaiting_human; contrast acceptance not-granted; publication and business migration not-authorized.

- Targeted Vitest: 12/12. Workspace typecheck and prototype build passed.
- Final three-browser M2 regression: 30/30, no failed/skipped/flaky cases; see browser-report.json. Earlier two runs retained separately; final run includes inside-label color and narrow table wrapping corrections.
- Live 5341 review: desktop 1212×760 and narrow 390×844, final viewport reset. Help renders 14px/14px with 600/400 weight. Trend uses 14/16px and two neutral text colors plus the selected metric brand color; measurements in runtime-typography.json. No captured console errors.
- Protected shared UI/Foundation/Layout, BM-C and BM-D state source: 1965 SHA-256 comparisons unchanged. Before source copies live at /tmp/rain-bm-d-composition-before-20260916; before.json preserves protected file hashes.
- Color scope remains exact and frozen in the new snapshot; older snapshots unmodified. Independent review corrected Select label surface metadata to Fill/Neutral/Solid/7 and Fill/Brand/Alpha/4 over Background/Neutral/1 and /3, with existing active-field intent. The first final governance attempt correctly rejected the missing intent; the subsequent run passed. Text threshold stays 4.5 and meaningful chart marks stay 3. Shared pending contrast findings remain pending.
- Independent reviewer bm_d_feedback_review: no unresolved important regressions. Final supplemental review covered nonwrapping narrow table values and screenshot scroll reset.

## Visible changes

Body/controls are 14px, headings/key figures 16px; small help surfaces use one size. KPI explanations share one statistics help entry. Chart temporary readings and fixed comparison are named separately. Summary/advice share one neutral container, duplicate metrics and navigation were removed. All 12 filtered records are visible without pagination; short row values stay on one line in the scroll area. No dependency or shared-component changes.

## Review limit

These checks establish implementation and interaction integrity, not human visual acceptance or measured reading performance. Current appearance is ready for user review.
