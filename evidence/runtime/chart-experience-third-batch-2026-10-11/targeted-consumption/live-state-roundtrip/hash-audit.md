# Live state/revision roundtrip — independent hash audit

Result: PASS for the named file inventories at 2026-10-11T07:43:48.445Z. This audit writes only this report and `phase-scope-shas.json`; it does not edit runtime, tests, old facts or host files. System Mode evidence-only work; candidate/publication/Human Gate status remains separate.

The old `targeted-consumption/run-02/facts.json` canonical freeze has 2360 files and its host freeze has 2548. Neither list includes `chart-page.tsx`; the canonical list also omits the target lifecycle test. Zero changes in those lists therefore cannot prove the parent page’s state/revision roundtrip.

The preserved `merged-runtime-source-freeze-pre-peer-review.json` supplies the old 245-file runtime baseline. It differs from the current source in exactly one file; the old `candle-live/verification-summary.json` seven-file test/script baseline differs in exactly the target test. The current merged 245-file freeze matches every current file.

| Inventory checked fresh | Files / sets | Differences |
|---|---:|---:|
| Old run-02 canonical inputs | 2360 | 0 |
| Old run-02 recorded host inputs | 2548 | 0 |
| Pre-peer-review third-batch runtime | 245 | 1: chart-page.tsx |
| Current third-batch runtime freeze | 245 | 0 |
| Old candle/live runtime subset | 18 | 1: chart-page.tsx |
| Old candle/live tests and scripts | 7 | 1: chart-live-lifecycle.test.tsx |
| Full-170 package sources, canonical and copied host | 2335 each | 0 |
| Registry source files | 211 | 0 |
| Old targeted evidence scripts | 3 | 0 |
| Old 14 raw download sets and current exporter regeneration | 211 files / 14 sets | 0 |
| Old 170 raw download sets and current exporter regeneration | 1752 files / 170 sets | 0 |
| Registry closures reparsed | 19 closures | 0 |

The current implementation retains the user’s `paused` choice and clears prior `points`/`frozenNow` before a Live state or revision change. The target test exercises empty to zero/single and empty plus revision to normal. The current source explains the intended scope; old hashes alone do not prove a line-by-line diff.

| Expected increment | Previous SHA-256 | Current SHA-256 |
|---|---|---|
| apps/playground/src/docs/components/chart-page.tsx | 64314986945ccda59c1ce74c160d0a8e428cd0220043ad64421b19455795890d | 5f7e04f8cdc1903cff442ea40002c124b8325ff009abf40c18b990514fd497f5 |
| apps/playground/src/docs/components/chart-live-lifecycle.test.tsx | ec6dfc27764f14f9e43e897494e197d6421f30113049609bacd59892ebd504d9 | 5574d537edeb3fb2ce3632180e7450cbb7c3f7a35f6739e7a901a9e91e5175cd |

Exact shared source and host manifest hashes:

| File | Canonical SHA-256 | Copied host SHA-256 |
|---|---|---|
| packages/ui/package.json | 91b928b6331f2423bc2812b5c29dadea914b6259c6c7dfa920e43f4665bd43ab | 3e348726e61eeb23c66dd8ac1a671e5cf0b01794616f6c8f4d9786cecfb3599b |
| packages/foundations/package.json | 3861af2f741881994c7d77f7303cc6a199ff71405256d9390b78db072154c505 | 5b587db1b4062ef56907b78dd3633eca8201627037e45a640f7db9ee9132089c |
| registry/charts.json | 9e365005413149f0e8e16aabdbf971f7012b3d48436d245efa184b623c665175 | not a copied package manifest |
| chart-example-source.tsx exporter | 148335464880a677a0c00f5cab54a616b266b5c56148296e86b51fe997f33a6e | all 14/170 generated outputs match retained raw files |

Protected old evidence bytes remained unchanged throughout this audit:

- `evidence/runtime/chart-experience-third-batch-2026-10-11/targeted-consumption/run-02/facts.json`: `29cd27c4b3e3b87db285147d9a9e13a1b060bef969bb5c47e9cb651a4dc011e5`.
- `evidence/runtime/chart-experience-third-batch-2026-10-11/consumption-final/facts.json`: `ccc43c980b7d10c44c37aead21731c1494898ed878e9c452a1a19495791a9e80`.
- `evidence/runtime/chart-experience-third-batch-2026-10-11/merged-runtime-source-freeze-pre-peer-review.json`: `b58742911268b23d1711cfc7f471f879d6f91e5cbac7c760ba7daa10772eef32`.
- `evidence/runtime/chart-experience-third-batch-2026-10-11/candle-live/verification-summary.json`: `b9ebf123ce93fd5efaa72adba2cf5dbe57eabf6631013fb915143b108eb59565`.

The JSON includes all 245 exact current source hashes, all seven exact old/current test/script hashes, each download’s inventory digest and main/index hashes for the 14 targeted sets, the full-170 per-set digests, canonical/host scope digests, and package/Registry/exporter identities. Inventory digests preserve recorded path strings and use the algorithm stated in the JSON.

Limits: equality covers the recorded scopes, not all unrelated worktree changes or all host files. This auditor reran hash comparisons, current exporter generation and closure parsing; it did not rerun typecheck, build or browser checks. Keep old 32-check/170-entry facts intact. Record the new parent-page roundtrip as a separate four-mode increment; visual, device/accessibility, publication, migration and Git gates remain open.
