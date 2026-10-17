# 分类矩阵固定列与提示图例 — 2026-10-09

Status: completed local technical delivery, unpublished candidate. Explicit user feedback authorizes the hover/scroll defect, adaptive first column and symbolic compact quantity legend. Existing dirty `codex/card-v2` worktree and unrelated changes are preserved.

System Mode, plan `docs/plans/2026-10-09-matrix-sticky-layout.md`. V05 retains existing behavior; I02 keeps headings, readings and legends aligned. No new reusable method, public API, dependency or global token.

## Root cause and result

- The active heading selector replaced the sticky white background with a translucent chart tint. Real hover plus horizontal mouse wheel reproduced the data painting beneath the heading. Active headings now compose the same tint over the existing opaque surface.
- First-column width, native table minimum, keyboard reveal and heat legend offset previously assumed144px. Actual UI-font measurement now supplies the column width, with48px minimum,240px maximum and40% container cap; long labels wrap. Font completion and container resize remeasure, and keyboard reveal measures the actual sticky edge. Active-label bold width is accounted for before hover. Tooltip placement follows width changes.
- Quantity legend uses8/12/16px diameter hints, values at their right and24px interaction height. Values, colors and linked ranges still use the existing encoding. Actual matrix circles retain calibrated area and color. Zero retains its existing distinct marker. The legend describes its symbolic sizing accessibly.
- Five examples remain on `/#chart-matrix`; `/#chart-business` and mini downloads remain separate. Existing entry, sort/update, pointer/keyboard, tooltip and reduced-motion behavior remains intact.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| New regression baseline |3 expected failures before edits |`baseline.log`, `baseline-browser/`, `baseline-test-results/` |
| Isolated opacity repair |1 passed before sizing/legend edits |`sticky-fix.log` |
| Final scoped unit suite |191 passed /10 files in10.26s |`unit.log` |
| Real Chromium interaction suite |18 passed in44.4s:15 existing +3 new |`final-browser.log`, `browser/` |
| UI typecheck |passed |`ui-typecheck.log` |
| Playground and prototype typecheck/build scripts |passed; existing large-chunk warnings |`playground-build.log`, `prototype-build.log` |
| Token consumer generator |exact-source registration and generated outputs consistent |`token-generation.log`, `token-check.log` |
| Isolated current shared source |9 matrix +1 business +1 mini generated entries type/build passed |`consumption/facts.json`, `isolated-consumption.log` |
| In-app preview |URL `#chart-matrix`, short heading48px, active opaque surface and compact legend observed |CUA read-only observations; screenshot proof in `browser/` |

The final unit attempt made concurrently with builds/browser tests hit the existing5000ms timeout in one five-chart example test; the other190 passed. Preserved in `unit-concurrent-timeout.log`. The unchanged test passed on a targeted rerun (`unit-targeted.log`,7 passed), then the complete191-case suite passed after competing jobs ended. No assertion or timeout was weakened.

Measured browser facts: short heading48px; course heading120px; long heading231px. At390px viewport, container356px and heading142px; all24 data columns72px with no page-level overflow. Active heading background `rgb(255,255,255)` under the existing tint; hit testing returns the heading after real wheel scrolling. Quantity hints8/12/16px, each target24px high. Recorded in `heading-fit.json`, `sticky-hover-scroll.json`, `legend-hints.json`. Existing coverage checks equal6/12 columns, narrow scrolling, actual painted fit/tone, viewport entry, pointer/focus, tooltip, keyboard reveal, discrete semesters, sorting/updating and page ownership.

The isolated consumer run reused11 previously generated filesets and the installed dependency cache, verified unchanged exporter/fileset hashes, recopied full current UI/Foundations source and recorded renderer/CSS/README hashes. This is not a clean/minimum installation or11 additional browser checks. No exporter changes were required; the temporary verifier was removed after completion.

## Boundaries

No independent agent review this increment, public release, Figma operation, production migration, Git commit/push or PR. Real Safari/VoiceOver, physical touch and complete contrast acceptance were not rechecked. Existing visual Human Gate remains awaiting-user-review and contrastAcceptance remains not-granted. Technical checks do not grant visual acceptance. Final source snapshot is `final-source-hashes.json`.
