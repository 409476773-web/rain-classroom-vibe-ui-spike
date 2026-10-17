# Tabs / Tooltip narrow engineering repair

Fresh targeted result: **10/10 passed** (Tabs 8, Tooltip 2), exit 0, 2.31 seconds. The same tests' direct typecheck and the verifier syntax check passed. Original **6 passed / 2 failed of 8** baseline and the intermediate 9/10 run remain in separate logs. Seven direct Node probes also matched expected outcomes; this separate invocation is not a separate human/model source review.

`task-only.diff` includes the two owned tests and only `validateTabsPaintRouting` within the shared verifier. Other verifier sections remain root-owned; no UI, Token, source97, accepted archive, phase, helper, export, browser or external state was changed.

## Tabs

The old immutable routing guard rejected accepted navigation metadata wrappers in TabParts. It now requires the complete requested-root phase to validate, the original navigation parent to be accepted, and W6–W8 to be authorized before projecting exactly **seven** accepted fragments to their old form. Every fragment must occur exactly once. `projection-lineage.json` proves all accepted fragments occur once in current source and all nonempty projected fragments occur once in the genuine archived before source. The original `afbba4...` routing hash remains unchanged; there is no new current AST/hash exception and no broadened color exemption.

Authentic RN14 archived Tabs source (`f48ff...` in SHA-locked `81ed...` starter) still passes the original guard. Real current source passes. Original paint-role/More-host/count/inert negatives remain, plus missing/duplicate/unknown wrappers, changed count rendering, wrong label paint, false measurement, added description paint, wrong navigation scope, unknown phase permission and missing phase at an explicitly selected root all reject.

## Tooltip

The actual current delta is **18 Switch declarations**: six authorized semantic aliases repeated in default/light/dark blocks. InputNumber/overlay values did not account for this delta. The test locks the original before CSS SHA, preserves every original **1348** nonTooltip value in order, and validates only these six exact successor alias/value pairs. Exact root/light/dark alias blocks are also checked with the existing CSS parser. Unknown, wrong, missing, wrongly scoped and unauthorized aliases fail; a changed old Token value remains unequal.

The actual Tooltip contract has **six** fixed variables: background, foreground, padding-block, arrow-width, arrow-height and max-width. Their exact original names and values, generated outputs and emitted declarations remain asserted. No value or threshold was changed to make the tests pass.

## Boundary

The root owns the final full-quality result. Its verifier main-flow caller now explicitly forwards the requested root (live source verified). These checks do not close browser, publication or migration. RN14 export was only read: replacing the one navigation guidance paragraph within the local M1/M2 exported guide is the narrow recommendation; the shared guide and dedicated navigation handoff remain unchanged.
