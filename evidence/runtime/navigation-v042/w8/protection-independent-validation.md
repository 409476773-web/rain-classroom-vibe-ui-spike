# W8 independent protection validation

Recorded: 2026-10-04T10:15:39.871Z

Result: **passed-scoped-protection-validation**. No unauthorized difference was found within the protected scope. This review changed only these two validation records, and did not rerun tests or modify the artifact.

- W7 freeze: **81/81** current SHA-256 matches; missing/changed files **0**.
- G2 candidate13 visual source map: **42/43** matches. The only difference is `packages/layouts/src/workspace.tsx`, exactly the registered N06 event cleanup from `1d8677dc…` to `c74c1373…`; its prior visual hash remains historical.
- W6 start protection: **2384/2396** matches, **12** differences: one N06 behavior source, its existing regression test, and ten authorized consumption-documentation/current-metadata/phase records. No protected file is missing.
- Foundations: **38/38** matches. Shared package CSS: **25/25** matches. Added files under shared `src` roots: **0**. No new Token or shared CSS/default change.
- HEAD remains `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`, matching the W6 protection record.

## Actual difference classification

- `packages/ui/src/navigation/README-W3.md`: authorized-consumption-documentation.
- `packages/layouts/src/workspace.tsx`: registered-N06-behavior-repair.
- `packages/layouts/src/workspace.test.tsx`: registered-N06-regression-test.
- `packages/layouts/src/README-workspace.md`: authorized-consumption-documentation.
- `docs/ai/README.md`: authorized-consumption-documentation.
- `docs/ai/navigation-workspaces-v042.md`: authorized-consumption-documentation.
- `docs/ai/skills/rain-navigation-composition/SKILL.md`: authorized-consumption-documentation.
- `manifests/layouts/workspace.yaml`: authorized-current-lock-and-repair-metadata.
- `manifests/recipes/navigation-r2.yaml`: authorized-current-lock-and-repair-metadata.
- `registry/navigation-v042.json`: authorized-current-lock-and-repair-metadata.
- `registry/navigation-v042-workspaces.json`: authorized-current-lock-and-repair-metadata.
- `status/current-phase.yaml`: authorized-root-phase-record.

## Current and historical Registry locks

- `registry/navigation-v042.json`: current `currentSourceSnapshot` **24/24** agrees with actual files, including the N06 `c74c1373…` SHA. Its W7 freeze file SHA agrees. `priorW7PreRepairSourceSnapshot` and `acceptedVisualSourceSnapshot13` retain `1d8677dc…` and match the G2 map; the referenced G2 evidence file checksum also matches.
- `registry/navigation-v042-workspaces.json`: current `sourceSnapshot` **6/6** agrees with actual files, including the N06 `c74c1373…` SHA. Its W7 freeze file SHA agrees. `priorW7PreRepairSourceSnapshot` and `acceptedVisualSourceSnapshot13` retain `1d8677dc…` and match the G2 map; the referenced G2 evidence file checksum also matches.

## Read-only artifact metadata lineage

Observed artifact snapshot: `navigation-v042-d8d01be911e47a2f`, **2268** locked files; every actual file hash matches, and snapshot identity recomputes correctly. Both earlier source locks remain under `verification/`. Compared with each earlier lock, changes are confined to README, provenance and navigation evidence; runtime/host/style/dependency differences are **0**. The JSON records all paths and hashes. No cache-link, build, export, install or archive action was taken by this reviewer.

## Limits

This is the protected W6-start/G2/W7 scope, not a fresh comparison of all dirty files to Git HEAD. Existing dirty work predates these snapshots. Root workpack documentation, the new docs/ai handoff and phase updates are authorized. Current hash agreement does not convert the separate full-project quality failure, G3, contrast or assistive-technology work into acceptance.
