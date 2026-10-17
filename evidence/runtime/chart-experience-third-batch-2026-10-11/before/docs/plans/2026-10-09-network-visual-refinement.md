# Network visual refinement implementation plan

> **For Codex:** use the approved design decisions below; execute in this chat with tests before production logic.

**Goal:** implement the approved original-style natural glow network and a switchable structured presentation, keeping palette, relations, filtering and selected-node identity independent.

**Architecture:** extend the existing unpublished NetworkChart candidate. Keep graph validation and ID-based selection; derive static geometry from the complete graph before host filtering. Use bounded deterministic curved routing around node/name bounds, with separate paths for parallel and reverse relations. Reuse React, SVG, Rain controls, Motion and chart colors; no new dependency, editor, live force loop or publication.

**Tech stack:** existing React/TypeScript/Vite, Motion, SVG, Vitest and browser tests.

## Scope and design contract

- User authorization: 2026-10-09 “开始实现”, following selection of “自然错位” and original Figma/course screenshot as visual reference. This supersedes discussion-only for this NetworkChart increment.
- Mode: System Mode; existing `ui-chart-network` remains `registry-candidate` / `unpublished`. The discussion direction is accepted; the implementation Human Gate remains awaiting review.
- Visual lineage: CH-065/070/083/086 from Figma `MbWg1ft5zk1JRQiQ6dS30e`, node page `2901:130074`, plus the user’s course-network screenshot. Preserve colored cores fading outward, thin curved links and small tangent arrows. Remove ordinary dark node outlines and repeated category abbreviations inside nodes.
- Methods: V01 (stable category identity across palette/filter), V03 (source glow), V05 (preserve operability while changing material), D02 (relation-based positions and readable names), D05 (narrow containers keep complete readable relations), I02 (categories, relation types and direction remain separate; exact tables stay available).
- Scope: network layout/geometry/component/tests, their export and Registry closure, four business fixtures/host, source download settings/tests, candidate README/Manifest, and this increment’s phase/evidence record. Preserve unrelated dirty files.
- Baseline: 20 existing target files copied with SHA-256 to `/tmp/rain-network-visual-20261009-before`; these were pre-existing local work, mostly untracked.
- Unverified assumptions: routing improves these small graphs but is not a proof of optimal layout for arbitrary dense graphs. Safari/VoiceOver, physical touch and complete contrast acceptance are independent checks. Distances, node size and line width do not encode edge weight.

## Task 1: stable natural positions and routing

Files: `packages/ui/src/charts/network/network-layout.ts`, new private `network-geometry.ts`, related unit tests; `registry/charts.json`.

1. Write failing checks for preserving supplied normalized positions under filtering and deterministic topology-based fallback positions.
2. Add bounded geometry checks for a representative 11-node/19-edge graph: finite paths, label/node avoidance, distinct parallel/reverse paths, original edge identity/direction and no caller mutation.
3. Implement static geometry, stopping paths at node boundaries and retaining independent parallel lanes. Avoid a live force loop and weight-based geometry.

## Task 2: render both styles without resetting state

Files: `network-chart.tsx`, `network-chart.test.tsx`, `packages/ui/src/charts/index.ts`, network-specific selectors in `styles.css`.

1. Write failing style-switch checks for default glow, independent palette, retained selection and exact relation data.
2. Render border-free radial glow by default; render label-shaped structured nodes using the same graph semantics. Use small arrows independent of stroke width.
3. Keep pointer, keyboard, focus, reduced-motion, empty/error, full-name controls and exact tables. At narrow widths keep the readable operable node/detail list rather than shrinking the graph’s text.

## Task 3: business examples and real source downloads

Files: `apps/playground/src/docs/components/chart-business/network-{data,examples,page}.*`, `chart-example-source.tsx`, consumption checks and `tests/e2e/chart-business-network.spec.ts`.

1. Use the approved natural positions in the teaching-elements example and an 11-node/19-edge course fixture, including cross-connections, parallel relations and feedback.
2. Compute complete positions before relation filtering; preserve selected identity across style/palette switches and data updates. Hidden selections still clear truthfully.
3. Add the two-style choice separately from palette and carry it through source downloads and isolated consumption.

## Task 4: verify and record candidate delivery

Files: `network/README.md`, `manifests/ui/chart-network.yaml`, `status/current-phase.yaml`, `evidence/runtime/chart-network-visual-refinement-2026-10-09/`.

1. Run the scoped Vitest files (layout/geometry/component/fixture/host/download/Registry/color consumers), package type checks and affected app builds.
2. Inspect the actual served checkout and desktop/narrow states in a browser; exercise both styles, all palettes, focus/selection, filtering, updates, invalid/empty/long data and reduced motion.
3. Verify source-download import closure and type/build for the current network settings. Update README/Manifest/phase with actual evidence; keep Human Gate, contrast acceptance, publication, Figma, migration and Git operations independent.
4. Review the actual change against the preserved baseline; do not claim the pre-existing chart implementation as this increment.

## Delivery record

Tasks 1–4 completed for the local unpublished candidate. See `evidence/runtime/chart-network-visual-refinement-2026-10-09/verification.md` for actual results and remaining gates. Latest Network-related checks pass; the shared Playground standard build and vendor map source-hash check have out-of-scope failures. Preserve those concurrent changes and keep implementation visual acceptance pending.
