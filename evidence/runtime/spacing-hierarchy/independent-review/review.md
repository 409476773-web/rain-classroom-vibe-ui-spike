# Independent review: spacing hierarchy

Reviewed 2026-09-13 in the existing `card-v2` worktree. Comparison is current source against `evidence/runtime/spacing-hierarchy/before/*.txt`; HEAD is unchanged at `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`. This is a bounded source and local runtime review, not a review of all uncommitted Card/Dialog work.

No new P1 or P2 findings in the reviewed implementation.

- Public increment is the pure `defineLayoutSpacing` value validator and read-only `LayoutSpacing`. Existing Space keys only; equal values, zero, and arbitrary ordered selections are accepted; invalid values or either ordering inversion throw; values are copied and frozen. Existing four primitives and their public behavior are unchanged.
- Host page/Card/panel recipes own selection and application. Existing Card inset/part geometry, FormItem/control internals, focus tokens, and UI/Foundation code remain protected. Independently recomputed all 1,925 protected baseline hashes: no changes.
- Production Chromium: seven geometry cases across 1280, 375, and 320 px; light and dark; values 24/20/12, 20/20/12, 16/12/12, 16/16/16, 0/0/0, 40/40/40, and 16/12/8. Verified actual panel edge insets, direct group gaps, information gaps, list article boundary distances, removed list border/padding accumulation, and no horizontal overflow.
- Invalid 8/16/8 and 16/8/12 preserve the last applied visual triple and business draft. Valid change, collapse, and reopen preserve the same draft input DOM. A passive application while the business input is focused preserves focus and both independent scrollTop values. Real apply button remains focused after normal apply. Existing Select closing/focus return is awaited before testing the separate passive change.
- Independent prototype consumer at port 5196 uses the default panel inset and opens its existing Course Dialog. No pageerror was emitted.
- Independently ran the layout package unit file: 5/5 passed.

Artifacts: `review.mjs`, `results.json`, `run.log`, `unit.log`, `reviewed-source-sha256.json`, and seven screenshots in this temporary directory. Representative wide and 320px maximum-equality screenshots were visually inspected for clipping/overflow, not accepted as a Human Gate.

Limits: docs/manifests/registry were being finalized by the author when this report was prepared and require a later consistency read. These checks do not prove every possible consumer, arbitrary host CSS, all layout combinations, assistive technology, or full business Benchmarks. The existing dark Focus contrast finding, human visual acceptance, publication, and migration remain open.

## Final documentation and registry consistency closeout

Completed the same independent review after the author finished documentation and evidence. No additional runtime tests were repeated, and no new P1 or P2 finding was identified.

Read the updated usage guide, composition rules, spacing design/authorization record, ADR 0009, README entry, four layout manifests, source Registry, current spacing phase fields, and the scoped verification report. Cross-checked the final E2E source and archived geometric output against the report, and checked the actual production/unit/type/build/governance logs. Their stated 24/24 production tests (Layout 9 + Dialog 9 + Card 6, 21.7 s) and 8/8 scoped units (Layout 5 + contract 3) agree with the artifacts. The separately reported independent 11 records and 5 unit tests are not added to these suite counts.

The docs accurately distinguish the checked value triple from actual host CSS: no automatic DOM hierarchy, padding, global ratio, or control-size scaling is claimed. Page vertical values and responsive horizontal insets are distinct; Card owns its unchanged 20 px inset and parts. The actual new list spacing, equality/zero behavior, invalid retention, limited production matrix, and source protection statements match the implementation and evidence. Historical RN-06 and Dialog evidence remain historical rather than being rewritten as current global acceptance.

Checked 98 local Markdown link targets and 25 Registry path references: no missing targets. All 44 entries in `source-sha256.json` match the current files; all 44 before snapshots exist. The seven runtime source files from the first independent review are unchanged, so those live browser observations still correspond to the finalized implementation. Recomputed all 1,925 protected baseline hashes again: unchanged.

Final assessment: the requested implementation plus documentation/registry consistency review is passed within the recorded scope. At this read, `layoutsV1.spacingHierarchy.independentReview` was intentionally still `not-run` pending this conclusion; the author may now record this review result as `passed` and refresh the final phase hash. No Human Gate, contrast acceptance, asset maturity, publication, or migration decision is inferred. Existing dark Focus and the previously listed platform/accessibility/business Benchmark limits remain open.

Additional artifact: `closeout.json`. Documentation and evidence reviewed-file hashes were added to `reviewed-source-sha256.json` at this closeout snapshot; a later phase status update necessarily changes the phase hash.
