# Independent review: outer Card spacing controls

Scope: the user-reported gap between panel spacing controls and the two outer Cards in the existing `card-v2` worktree, 2026-09-13. Compare with `evidence/runtime/spacing-hierarchy/outer-cards/before/`; no repository edits by this reviewer.

## Diagnosis and resolved issues

The original production page reproduced the report: applying panel 24/20/12 changed only the two panes; both outer Cards stayed at 20 px insets, 16 px part/body gaps, and 4 px header detail spacing. The original implementation had only `panelSpacing` state and an applied prop; Card read fixed local defaults. The public Card already supported local native style and its existing root spacing aliases, so no public component change was needed.

A separate temporary DOM alias probe showed that root spacing aliases could coordinate root top/bottom padding and Header/Content side padding while leaving Pane values independent. That probe also exposed a narrow-content issue: at a 320 px viewport with a 40 px outer inset, 206 px were available but the query buttons occupied 232 px and intruded 26 px into the intended right inset. The document still had no horizontal scroll, so a document scrollWidth check alone would miss it.

The finalized implementation fixes both issues. Two explicitly named local control groups independently validate and apply Card/Pane values. Each outer Card sets its existing `--rain-card-spacing` and `--rain-card-section-gap` once on the root; Header and Content consume the existing parts rather than descendant CSS. Header row spacing uses min(item,4); action spacing uses min(item,8). Action groups can wrap when they cannot fit, preserving the actual content edges. The original global Card default20/sm12, UI master, and controls remain unchanged.

## Independent final implementation checks

No new unresolved P1/P2 findings in the final implementation.

Twelve records in `final-results.json` / `final-run.log` were obtained through actual controls on the updated production at 5195 and the prototype at 5196:

- Independent panel application while Card values stay unchanged.
- Six Card combinations: 32/24/16, 20/20/12, 16/16/16, 0/0/0, 40/40/40, and 24/20/2, across 1280/375/320 and light/dark.
- For both Cards: real top/bottom and left/right insets; Header-to-Content and body group gaps; Grid/Inline/Split information values; header/action fine spacing no larger than the selected item spacing; 32 px action control heights.
- At 320 px, zero and maximum equal Card values: no document overflow and every outer Card action stays inside the actual content left/right edge. The maximum-value query group now wraps as needed. Representative screenshots were visually inspected for clipping, not accepted as a Human Gate.
- Both Card ordering inversions preserve the last effective geometry; error insertion may move the page content vertically and is not treated as a geometry reset. A subsequent valid application clears the error.
- Course and material draft input DOM identities and values persist through changes; a passive valid application preserves draft focus, and collapse/reopen retains the material draft and correct focus return.
- Panel reset remains independent of Card values; prototype still starts with Card20/16/12 and Pane16/12/8. No pageerror.

Independently recomputed all 1,925 protected baseline file hashes: unchanged. No original Card/Dialog full suite was rerun by this reviewer. The author's full suite and final governance are reported separately.

## Evidence and limits

Final implementation evidence: `review.mjs`, `final-results.json`, `final-run.log`, `final-*.png`, and `reviewed-source-sha256.json`. The earlier `diagnose.mjs`, `results.json`, and `run.log` are labeled diagnosis/temporary probe evidence and do not count as completed implementation verification.

Documentation/registration closeout is pending the author's completion notification. This is explicit local recipe application, not recursive automatic spacing or proof for arbitrary CSS/consumers. The new outer Card controls remain a candidate awaiting the user's visual judgment. Previous Card default20/sm12 confirmation is preserved only in its prior scope; the new feedback does not create acceptance for this repair. Existing dark Focus, full device/accessibility/business Benchmarks, publication, and migration remain independent and open.

## Final documentation and registration closeout

Completed after the author prepared the outer-card evidence and updated the entry points. No additional runtime checks were repeated. Final implementation and documentation review is passed in the recorded scope, with no new unresolved P1/P2 findings.

Reviewed the changed README, layout usage guide, appended design feedback/authorization record, all four Manifest evidence references, Registry evidence reference, the parent verification handoff, and `outer-cards/verification.md`. Cross-checked the new E2E source, archived four-combination geometry, and logs. The report correctly states 25/25 production checks (Layout 10 + Dialog 9 + Card 6, 24.3 s) and 8/8 scoped units. The reviewer's 12 supplementary records are separate and are not added to those suite counts. The original 24-test report is explicitly retained as the panel-stage history.

The documents now describe both independent apply controls, explicit use of existing Card root aliases and local native style, unchanged public default20/sm12, header/action upper bounds of 4/8 that reduce with tighter item values, and necessary action-group wrapping. They do not claim recursive automatic application or all-consumer coverage. The measured 26 px narrow inset intrusion is described as the earlier diagnosis, and the temporary alias probe is not counted as completed implementation evidence.

The user's initial affirmative feedback followed by the outer-Card issue is recorded accurately: the earlier affirmation is retained only for then-shown behavior and does not accept this added outer-Card capability. The extended candidate is still awaiting user visual judgment. Existing dark Focus and other acceptance/publication/migration limits remain open.

Checked 110 local Markdown link targets and 25 Registry references: no missing targets. All 44 final source hashes match; 44 before snapshots exist. All eight runtime source/test files captured for this independent final implementation review remain unchanged. Recomputed all 1,925 protected files again: unchanged. Details are in `closeout.json`.

At this snapshot, the spacing phase's independentReview intentionally remains `not-run` pending this conclusion. The author may now record `passed`, copy this finalized report, and refresh the affected phase source hash. The archive uses `review.mjs.txt` for the review script; the live temporary file is `review.mjs`. No full regression repetition is needed for the report/status-only closeout.
