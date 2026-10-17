# P2 MatrixChart scoped technical verification

Implementation delivered in System Mode as an unpublished registry candidate. Root retains catalog / public-index / registry / source-download / source-lock / status ownership and performs integration/browser checks. No Git commit/push, Figma mutation, dependency installation or production migration was performed.

## Files

- Shared module: `packages/ui/src/charts/matrix/matrix-data.ts`, `matrix-chart.tsx`, `matrix.css`, `matrix.css.d.ts`, `README.md`.
- Shared behavior tests: `matrix-data.test.ts` (44) and `matrix-chart.test.tsx` (11).
- Private application fixtures/examples: `apps/playground/src/docs/components/chart-business/matrix-data.ts`, `matrix-examples.tsx`.
- Private application tests: `matrix-data.test.ts` (12), `matrix-examples.test.tsx` (7). App imports were removed from shared tests after checking the repository dependency boundary; private tests consume the public chart export.
- Candidate manifest: `manifests/ui/chart-matrix.yaml`.

## Actual checks

- Four target test files: **74 tests passed**, exit 0; `unit-final.log` (2026-10-08 local time).
- UI production typecheck: exit 0; `types-ui-final.log`.
- Playground typecheck, including the public MatrixExamples imports and private tests: exit 0; `types-playground-final.log`.
- Whole test TypeScript project: exit 1, **four errors outside Matrix scope** in `packages/ui/src/toast/toast.test.tsx` (two unsupported `exact` options), `tests/e2e/chart-feedback-legend-tooltip.config.ts` and `tests/e2e/chart-feedback.config.ts` (unsupported `reducedMotion` options). No Matrix diagnostic appeared. See `types-tests-final.log`.
- Scoped whitespace check: exit 0. Shared tests no longer reference `apps/playground`.

RED/GREEN logs preserve failed behavior assertions for coordinates/domains/encodings, table semantics, semester endpoint legends, five fixture families, public example rendering/filtering, heat readout separation and recipe/size source settings. Initial module imports were followed by minimal exported stubs so missing behavior produced ordinary failing assertions before implementation. Test argument wrapping was corrected for invalid level-array cases; the initial failed green log is retained as `data-first-green-failure.log`.

## Verified behavior

- Axis IDs and coordinates are unique; unknown references are rejected; missing coordinates stay missing; axis reordering preserves their values.
- Heat domain is explicit, finite, strictly increasing and has finite width; out-of-domain and non-finite values are rejected. `[1,8]` semester legends only show the endpoints.
- Bubble area is proportional to quantity, and the all-zero maximum performs no division and draws no positive-radius zero marker.
- Level mappings are explicit; unknown levels are rejected; CH145 has exactly three named support grades.
- Native table cells have local unique header associations, always-visible exact readings and no cell Tab stops. Decorative heat color is separate from text contrast.
- All five private Mock fixtures render; 7×24 and 12×12 produce 168 and 144 native cells respectively. Similarity fixtures include absent diagonals and nonsymmetric values.
- Private fixture selection, explicit recipe propagation, size-button interaction, saved initial size and size callback work. Invalid/empty/single/update/sorted states are exercised.

## Not verified here

No browser layout, actual CSS color/radius timing, independent source download, real screen-reader, physical touch or complete contrast certification was run by this subagent. Root continues those checks before claiming integration complete. No visual Human Gate or publication is granted. Native table performance above 12×12 / 7×24 remains unverified.

UI and application source writes are paused after this scoped delivery so root can copy a stable independent-consumption snapshot.
