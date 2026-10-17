# XAxis responsive position owner review

Status: verified. The three runtime files are frozen at the hashes recorded in x-axis-owner-review.json.

XAxis preserves fixed pixel margins through relative container coordinates, disables its position tween on geometry updates, and responds to system reduced-motion changes while mounted. Data changes at the same plot size keep the native 500ms easing. Brush policy and the 400ms hover-opacity fade are unchanged. TimeSeriesChartInner and ScatterChartInner root SVGs receive local maxWidth:100% so their old measured numeric widths cannot widen the document before ParentSize reports the new layout. Scatter keeps overflow-visible. No viewBox, colors, typography, global overflow, dependencies, or Candlestick change.

## Verification

- Final unit command: 3 files, 45 tests passed; x-axis-unit-green-final.log.
- Final browser run after-10: 13 passed in 24.7s. Six families (Line, Area, Composed, Scatter, Profit/Loss, category) in normal and reduced motion, plus one native consumer.
- The 12 family cases arm the recorder before resizing. Their 36 resize audits collect 288 rAF samples plus resize-event and ResizeObserver samples, 360 samples total. Every sample satisfies the unchanged documentWidth <= viewport + 1 predicate. Retained label nodes, colors, font sizes, and real pointer Tooltip behavior also pass. The viewport sequence is 1440 → 390 → 1440, followed by a data update during the final shrink to 390.
- The native consumer holds animationDuration=1100 and plot width=600. Its Sep 2 label moves from 300px to 170px with the normal 500ms tween, a mounted reduce preference makes the return to 300px immediate, and switching back restores the tween.
- Exact saved XAxis baseline injection fails both representative width and reduce checks (before-01, 2 failures). after-06 and after-08 locate a separate stale root SVG width: numeric width 966 inside parent width 324. The actual failures and diagnostics are retained.
- Visually inspected the final settled 390px screenshots for Line, Area, Composed, Scatter and Profit/Loss. Curves, points, grids, axes and legends fit the plots; no stable SVG edge-content loss was observed.

## Limits

The SVG outer viewport is limited immediately. Internal coordinates catch up on the next ParentSize measurement. Family frame data records real tick boxes and containers but does not independently compare every label against its corresponding SVG data x. Native-scale unit tests and the numerical native browser consumer cover representative alignment. No claim of synchronous full geometry recomputation, Safari, VoiceOver, actual touch, Human Gate, or publication is made.

Four existing unrelated test typecheck errors are recorded in x-axis-tests-typecheck-01.log: two toast ByRoleOptions exact errors and two feedback config reducedMotion errors. The new XAxis spec and unit test report no type error.

Non-product probe failures and the earlier mistaken unit filenames are documented in JSON. Final runtime hashes were checked at report creation.
