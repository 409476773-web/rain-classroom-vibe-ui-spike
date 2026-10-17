# Frozen v0.4.2 reference capture

This is reference-only evidence, not candidate verification or Human Gate approval.

- Final run: `2026-09-27T19-36-55-642Z/capture-report.json`.
- Reproduce from the `card-v2` worktree: `node scripts/navigation-v042-reference.mjs`.
- Exit code: **0**. Chromium **151.0.7922.34**, macOS Darwin **25.6.0 arm64**, DPR **1**, locale `zh-CN`, reduced motion.
- Source SHA-256 before and after: `d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`.
- The script opens the immutable HTML through a real browser, uses reference diagnostics only to configure artboards, then performs clicks, typing, and key presses through real DOM controls. It installs nothing and writes each run to a new timestamped directory.
- Eight initial cases, each captured twice from a fresh browser context: A1-default, A1-workpage, A4-default, connections-default, W3-outlined, and R2-default at 1200/1440/1600 CSS px. All eight PNG pairs are byte-identical; all page-error arrays are empty. Initial PNGs are also identical across the three retained runs.
- Every captured state includes PNG, DOM fragment, geometry, computed styles, CSS variables, pseudo-elements, SVG paths, and source state. The last two runs strip script/style nodes from saved DOM fragments without changing the live source.
- Nine real interaction steps: A1 global/workpage switching; A4 click, ArrowRight, Enter; R2 visible-class selection, opening the full list, searching 200, selecting class 200. Eight action checkpoints (nine assertions) cover the expected selected state, list size, and dialog close. ArrowRight records focused element and selected state separately.

## Implementation facts

| Surface | Measured final rendering |
| --- | --- |
| A1 | 40px tabs, 14/20 text, item gap 24px, label/count gap 4px; workpage track inset 20px and 1px bottom border. Final visible marker is `.tab-label::after`, **24 × 2px**, centered on the label, bottom -1px, brand #1561f8, radius 2px. The older `.tab::after` has 3px computed height but `display:none`. |
| A1 color | Selected label #202631/600; idle #525b6a/400. Counts 12/18/400, selected #596477, idle #667080. |
| A4 | Identity tabs 224 × 64px, padding 10px 16px, icon gap 10px, top radii 10px. Title 14/20, secondary 12/18, 3px gap; final flex order places title above secondary despite the source DOM order. Track padding 8px 24px 0, gap 2px. |
| A4 behavior | ArrowRight moves focus without selection. Enter activates the focused tab. |
| ConnectedSurface | Final shared geometry functions are `resolveConnection` line 1211, `registerConnections` 1221, `paintConnections` 1241. No later overrides of those functions. Final source fragments include the computed union SVG path. |
| W3 | 1px #dce2eb outline, white fill; active `::before` 2px brand top line at top 1px, left/right 14px, radius 2px. |
| R2 initial | Global region preference compact at 64px, context expanded at 216px; neither is a forced responsive fallback. Top identity bar 48px. Workbody starts x285 relative to the prototype. |
| R2 at 1440 | Connected host x297/y62, 1131 × 726px; tab row 72px, viewport 1023px; four 242 × 64px tabs; panel 1131 × 654px. |
| R2 at 1200/1600 | Host widths 891/1291px; three 243px / four 255px tabs respectively. Context and global widths stay 216/64px. |
| R2 content | Page header padding 23px 26px 20px; content padding 0 26px 24px; table toolbar 32px high and margin-bottom 14px; tree 7px vertical padding; first row 46px, other rows 44px; bottom notice 42px high. |
| R2 full list | **Modal dialog**, not popover: 500px wide, 13px radius, #fff; head padding 22px 24px, body 20px 24px. Full-list height 611.390625px, result scroller 380px. Search wrapper 452 × 38px, input 412 × 36px. One search result makes the dialog 296.390625px high. |
| R2 actual selection | Full list has 201 entries (public resource plus 200 classes). Search `200` yields one. Selecting it closes the dialog, updates `scope=200`, changes the content identity, and makes class 200 visible in the scope track. |

## Source structure and limitations

R2's original `coursesRecipe` at line 1044 is transformed by `upgradeLegacyConnections` at line 1292 into `section.cs-r2.cs-host > svg.cs-layer + .cs-row(.cs-viewport > .cs-track, .cs-controls) + .work-sheet.cs-panel`. `vUpdateScope` at line 1657 rebuilds the visible tabs. The final v0.4.2 wrapper at line 1764 computes width as `max(170, min(255, floor((viewport - trackPadding - gap * (count - 1)) / count)))`.

Reference font stack is system-first (`-apple-system, system-ui, Segoe UI, PingFang SC, …`). A PingFang-first candidate may differ for Latin/numeric glyph widths and must register that difference. No font files were distributed. Reference modal radius 13px also needs a scoped mapping/exception if the public radius set lacks that value.

The prototype screenshot is exactly 1440 × 800 (or the specified width), cropped from the reference studio. A1/A4 sample widths follow the reference studio at a 1600 × 1100 browser viewport, not an invented 1440px wrapper. The source studio/toolbars are excluded from component screenshots. Modal screenshots include the viewport backdrop.

This capture does not verify candidate parity, contrast, assistive technology, all R/S scenarios, production behavior, publication, or design acceptance. Earlier capture directories remain intact.
