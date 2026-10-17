# Review12 independent runtime and source review

2026-10-04. Reviewer: `review12_splitter_verify`. Read-only production review; this agent created only new Review12 QA and evidence files.

Final reviewed source:

- `platform-navigation.css`: `985a19e081d7d639ca321017d15c18096deea5fe2e3f6e3100907a278b7d2596`
- `r4-r6.css`: `59598c99cf60628b5de155116e415335b404ca442c015682d1ac2eed7e9bb82f`
- `r2.tsx`: `57f08d739c56698fc12365715d74284ca3a5260dd677799adeb5dcc54e94694d`

## Conclusion

No unresolved findings in the reviewed scope. The latest user requests are implemented in the existing local consumers. The final current browser run passed 1,702 assertions with zero browser page/console errors and zero failures. All 43 registered/current source files remained stable across final QA. This is independent implementation/runtime evidence; Human Gate remains pending.

## What was reviewed

The exact before/current diff changes three production files. The other 40 current source files match the Review12 before snapshot. Both before CSS files and the R2 before source were independently hashed and match that snapshot. Shared PaneSplitter implementation, state reducer and CSS remain unchanged. No Foundation/shared UI default was changed by this patch.

`source.diff` contains the complete current patch: the existing 20px icon slot centers an 18px glyph, the normal splitter paint uses existing Neutral4 at opacity .4, and the R4/S4 discussion title consumes the existing Semibold Token. R2's four platform icons use the existing `size={18}` API. All secondary course icons retain their prior sizes.

Applied reading: current AGENTS.md, relevant Spike Brief, navigation continuation status, prototype design entry, V01/V05 methods, current source/evidence and prior Review11 contracts. Existing stronger interaction paint and focus behavior are retained; the latest direct user request supersedes only the prior normal-opacity-zero policy for these local consumers.

## Fresh browser checks

Final evidence: [measurements.json](run-2026-10-04T02-31-28-469Z/measurements.json). Local preview: port5198. Browser viewport1800×1100, DPR1, zh-CN, reduced-motion. Canvas widths1440 for all12 R/S;1200 for four interaction cases;1440 for R4 grading;1600 for R6 edit.

| Scope | Cases | Verified result |
| --- | ---: | --- |
| All12 R/S plus R4 grading and R6 edit, light/dark outer frames | 28 | All48 visible splitter occurrences: 1px line, existing `--rain-category-border-neutral-4`, opacity .4, effective alpha4%, normal handle0 |
| All12 R/S, light/dark × compact/expanded | 48 | All192 unit-glyph occurrences18×18; slot20×20; centered with1px offsets; expanded text origin42px; row40px; logo23px; helper glyphs16px |
| R2, R4, S3, S5, R4 grading end-side review pane, R6 edit fields pane | 6 | Hover and active drag paint1 with Brand1; pointer drag changes width; keyboard focus,2px outline and arrow resize; returning Normal restores the weak line/hidden handle;5px/10px hit widths preserved |
| R4/S4 discussion heading, both outer frames | Included above | Heading600 at14px/21px; count400 at12px/21px |
| R6 edit during pointer/keyboard resize | Included above | Existing course draft remains intact |

The splitters retain separator role, vertical ARIA orientation, controls identity, valid range, tabIndex0, col-resize cursor and touch-action:none. Normal weakness is a user-directed local visual policy; broad contrast, assistive-technology and cross-browser acceptance were not part of this patch review.

## Real finding and closure

The first run before the icon feedback passed838 assertions. It is retained at `run-2026-10-04T02-24-03-405Z` and applies only to that earlier two-CSS scope.

The next run, `run-2026-10-04T02-28-07-613Z`, detected that R2's four explicit `size={20}` props produced inline dimensions overriding the new18px CSS. This yielded32 failed assertions across the four theme/mode combinations; the other11 pages, splitter and discussion checks passed. The failure evidence is retained.

Root changed exactly those four existing size props to18. The final complete run at `run-2026-10-04T02-31-28-469Z` then passed all1,702 assertions on the final three-file source. No expectation was weakened to hide the defect.

## Images actually inspected

The reviewer opened the final R4 expanded full image and R3 compact rail image. The glyphs are centered, the Normal boundary is very faint, and business selection bars remain distinct. The initial successful two-CSS run's R4 full/boundary and R6 edit full images were also inspected; final matching CSS and the final fresh runtime measurements confirm the same splitter/heading behavior after the icon fix.

- [Final R4 compact full](run-2026-10-04T02-31-28-469Z/R4-1440-light-compact-full.png)
- [Final R4 expanded full](run-2026-10-04T02-31-28-469Z/R4-1440-light-expanded-full.png)
- [Final R3 compact rail](run-2026-10-04T02-31-28-469Z/R3-1440-light-compact-rail.png)
- [Final R3 expanded rail](run-2026-10-04T02-31-28-469Z/R3-1440-light-expanded-rail.png)
- [Final R4 Normal boundary](run-2026-10-04T02-31-28-469Z/R4-1440-normal-boundary.png)
- [Final R6 edit Normal full](run-2026-10-04T02-31-28-469Z/R6-1600-form-edit-normal-full.png)

`before-review11-R4-1440-light-compact-full.png` is an exact copy of the prior Review11 final screenshot, with source path/hash recorded in `before-image-provenance.json`. It is historical before evidence, not a fresh Review12 browser capture. Old evidence and old test contracts were not edited.
