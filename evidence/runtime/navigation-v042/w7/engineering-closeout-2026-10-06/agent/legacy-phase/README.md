# Legacy phase tests — narrow engineering repair

Fresh targeted result: **17/17 passed**, exit 0, 3.46 seconds. Direct typecheck for the same three tests passed, exit 0. The original baseline remains **7 passed / 7 failed of 14** in `baseline.log` and `baseline-results.json`; the intermediate 15/17 run is also retained.

Only `scripts/m2.test.ts`, `scripts/rn15-delivery.test.ts`, and `scripts/table-rn08.test.ts` changed. `task-only.diff` compares their saved before copies with the actual final bytes; per-file hashes and commands/results are in `summary.json` and the raw logs. No production, Token, matcher, helper, phase, frozen-input, or browser changes were made.

## Root cause and fix

The tests compared historical before phases to the current phase after deleting a stale subset of successors. They now compare five SHA-locked **actual adjacent before/after records**, remove only the named increment, and keep complete live-phase validation. New negative tests reject unknown top-level/component successors and changes to frozen B2 history; original authorization, Human Gate, scope, lifecycle and publication counterexamples remain.

RN15's protected source checks now use the real RN14 sealed starter and all 16 fixed transition records. Its two named excluded host files retain their original exact transition SHA checks. RN08 checks all **1932** original protected package entries: 1931 from that archive and the original empty `packages/layouts/.gitkeep` under its original strict checksum. No current-hash whitelist or failure-dependent fallback was introduced. Unrecorded bytes, missing transitions and broad authorization still fail.

The M2 source entrance check uses the SHA-locked actual later G1 input, removes six exact named later entries, and proves the resulting bytes equal the independently recorded original M2 source input hash. Its original route, placement, hidden mutation, invalid gate and unknown-file negatives remain.

The original immutable M2 color metadata (`cf356b...`) contains **four** meaningful-icon paints (two series, each stroke/fill). The former count of three was an incorrect test expectation, including against genuine historical input. The test now checks that original exact four-entry collection and separately the current five-entry collection, with every entry still critical meaningful-icon at 3:1. All actual current source, surface, role, SVG, scope and threshold counterexamples remain. The existing Table label finding **4.4968521474338745 < 4.5** remains explicitly asserted; no color threshold or finding was waived.

## Validation boundary

These targeted tests and their typecheck are distinct from the root-owned final full quality run. Historical starter source checks preserve the historical checkpoint; current accepted navigation bytes and complete live authorization remain subject to their existing separate source locks and full validators. No browser was run.
