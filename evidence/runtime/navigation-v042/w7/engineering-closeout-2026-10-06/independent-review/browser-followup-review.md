# Independent browser-driver follow-up · 2026-10-06

Only test-driver/source mapping was reviewed. No canonical work-package document, product source, Token, browser/native settings or accepted archive was edited. This directory stores the explicitly requested review evidence.

## Coordinate repair: passed

[nested-scroll-coordinate-probe.mjs](nested-scroll-coordinate-probe.mjs) extracts the actual W5 and W7 `shape` evaluation callbacks, then invokes them against deterministic window/document/gallery geometry. Both current callbacks preserve x340/y760/width938/height538 across root and nested scroll. Both exclude `document.scrollingElement`, which would otherwise double count root scrolling (incorrect x390/y960). Both add all ancestor `scrollLeft`/`scrollTop`; window-only correction would incorrectly yield x280/y580 after gallery scrollLeft60/scrollTop180.

A genuine7px/11px layout movement still changes the corrected result to x347/y771; the original complete `toEqual` position assertions remain and still reject genuine movement. No position tolerance was widened and no coordinate was dropped. [Probe output](nested-scroll-coordinate-probe.json) records both current source hashes and before/after/moved values. From the worktree root, run:

```sh
node evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/independent-review/nested-scroll-coordinate-probe.mjs
```

W4's width-owner repair preserves exact64/208 and intermediate-width assertions and changes the reduced-motion target to the actual transitioning global slot. It does not weaken N05's existing221px layout shift and full restored-position equality.

## Source mappings: passed, browser execution remains separate

The current E3 review01 successor addresses the real accepted review02 NavigationTabs composition. Default-density size38 is asserted as its recipe height; the accepted browser44px minimum is checked separately. Selected tab/visible labelled panel/aria-controls, permanent InputNumber ownership, student/question keyed drafts and explicit-save semantics remain. Queue student selection stays the ObjectNavigator button; only the answer's complementary axis uses tablist/tab.

Review08 now identifies each control's owning region. R5 events uses shared32/18, knowledge explicitly32/14; every target remains32×32 and both glyph dimensions remain18 or14. This fixes the earlier sample-wide R5=14 assumption without changing product source or weakening geometry checks.

G1's Radio labels, accepted14px/400/18px palette, region64/208 owner, actual transitioning slot and source-based compact display:none versus expanded opacity1 changes have documented Review11/12 sources. PointerTree target pre-scroll and bottom-quarter after-placement retain the pointer/keyboard/business assertions. Current final runtime verification is owned by the root.

## One unresolved source-coverage issue at review time

G1 tests/e2e/navigation-v042.spec.ts:36 replaces the old per-frame Logo-Y motion check with glyph23×23 only. The old threshold is superseded by accepted Review11 stacking, but the new check does not assert any sampled logoX/logoY position. [Deterministic counterexample](g1-position-coverage-finding.json) invokes the extracted current frame assertions with logoX9999 and alternating logoY±9999; every current assertion passes. Suggested minimum correction: precise compact/expanded Logo position assertions derived from accepted source geometry, preserving the deliberate Review11 reordering without a widened jump threshold. This is a test-coverage finding, not a claim that the frozen product has misplaced graphics.

## Canonical synchronization checklist — prepared, not edited

1. `reports/progress.json`: move W7/currentW7Closeout evidence pointers to the current2026-10-06 record; close only actually verified type/unit items. Retain Token governance/native/current-browser limits. Its current contrast.status saying no-human-acceptance conflicts with the separately completed human review; update current status while retaining old23-case counts as historical evidence.
2. `tasks/W7-regression.md` and `tasks/work-items.json` W7.2/W7.4: current unit1763/1763 and final browser source; original147 failures/5 failures516 not-run remain dated history. Safari is deferred to human by user; VoiceOver attempted but no valid spoken result. Keep overallW7 quality open while Token/native requirements remain.
3. `reports/W7-regression.md`: prepend current dated per-check results and exact final test hashes/commands/exit codes; preserve earlier119 unit/232 browser/387 matrix and raw failures. The full737 discovered raw run was721 passed/14 failed/2 capture-only skips; later corrected reruns are reported by identity and source version, not summed as new full-project cases. Current changed W5 and Treefixture follow-ups require their own result.
4. `11-设计师验收表.md`: separate completed human contrast/readability review from automatic Token conformance unproved, VoiceOver no valid speech, and user-manual Safari. Keep G3's scoped acceptance and publication/Git/Figma/migration boundary intact.

The latest Token evidence remains210 diagnostics (18 finite-navigation registration scan branches and192 other scopes), plus810 navigation paint occurrences with unresolved automatic evidence. Human navigation readability approval does not erase those results or independent Tree/G1/Report-A findings. Actual Safari's user deferral and VoiceOver's missing valid speech stay separately visible. Frozen runtime sources and accepted ZIPs remain outside this test-driver/documentation closeout.
