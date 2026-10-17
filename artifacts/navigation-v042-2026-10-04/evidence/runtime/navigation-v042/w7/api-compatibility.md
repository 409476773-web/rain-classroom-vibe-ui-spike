# W7 public API, Registry and compatibility audit

This read-only audit verifies the current local navigation candidate before the W7 N06 hover/Escape/re-entry repair. Public API closure, lifecycle declarations and the final accepted baseline pass the checks below. The behavior repair is pending with another W7 agent; root owns the after-repair lineage. This report does not assert that a repaired source is byte-identical to the historical G2 baseline.

Only this Markdown and its adjacent `api-compatibility.json` are audit outputs. The audit does not edit implementation, CSS, Tokens, Manifests, Registry, Git or Figma, and creates no W8 package. The JSON contains exact hashes, symbols, paths and validation records. This auditor previously authored E6; this is an independent inspection of the existing public API/baseline, not an independent E6 design review.

## Verified exports and import closure

| Package | Unique root names | Values / types | Export subpaths | Duplicate or dead entries |
| --- | ---: | ---: | ---: | ---: |
| `@rain-next/ui` | 358 | 116 / 242 | 903 | 0 |
| `@rain-next/layouts` | 49 | 19 / 30 | 2 | 0 |

All named re-export modules and declared source symbols resolve. All package export subpaths point to existing files. The navigation subset contains 55 root symbols: UI 6 values/14 types and Layout 14 values/21 types. Public UI values are `NavigationBar`, `NavigationTabs`, `ScopeNavigation`, `NavigationList`, `ObjectNavigator` and `SegmentedControl`. Layout exposes `ConnectedSurface`, the five Workspace component/hook values, and the eight Workspace state/key/preference values. Exact type names and source modules are in JSON.

The four navigation Registry files contain 16 unique items; their 31 unique payload source files, 21 unique Registry dependency references and 45 declared Icon dependencies resolve. Both singular `exportName` and grouped `exportNames` are checked against real package roots. Public style imports resolve: UI styles include both navigation families; Layout styles include Workspace, while ConnectedSurface imports its own CSS. The host must load Foundations/UI/Layout styles.

The existing `Tabs`, `RadioGroup`, `Sidebar`, `Stack`, `Inline`, `Grid`, `Split` and `defineLayoutSpacing` exports remain present. NavigationTabs uses the existing Tabs engine, SegmentedControl uses RadioGroup, destinations remain native links, and ObjectNavigator remains controlled stable-object buttons. Internal helpers that are not exported at the package root are not promoted into a public contract by this audit.

Validation ran `pnpm --filter @rain-next/ui typecheck` and `pnpm --filter @rain-next/layouts typecheck`; both returned exit 0. A declaration/re-export scanner checked names and paths. The installed TypeScript 7.0.2 JavaScript module provides version metadata without the previous AST API, so no AST-parsing claim is made and no dependency was installed. Package typecheck supplies a separate compiler check. Broader tests/browser evidence belongs to the W7 runtime report.

## Source lock and lifecycle boundaries

The authoritative post-status lock is `evidence/runtime/navigation-v042/g2-acceptance-13/current-source-final.json`: **43/43 files match, zero implementation differences before the N06 repair**. Across the four Registry current snapshots and current Gallery supplement, 69 hash entries covering the same 43 unique files also match.

`accepted-source-before-status.json` is intentionally historical. Its sole delta is Gallery acceptance-status wording; business sources and styles were unchanged. The final lock is therefore used for the current assertion. The earlier W6 initial false mismatch and corrected validation remain historical evidence rather than a reason to overwrite the pre-status lock.

The 16 navigation Manifests declare nine shared UI/Layout assets as `registry-candidate`, managed and unpublished, and seven Recipes as `local-experiment`, forkable and unpublished. Their actual root export ownership agrees with the Registry. G2 visual acceptance stays scoped to candidate13 runtime visual/composition; it does not publish the Registry, migrate production or grant new E6/G3 acceptance.

R2 has deliberate top-level historic source/style hashes. Its release notes explicitly retain accepted G1/W2 source history; `currentFeedbackSourceSnapshot` revision13 matches both current R2 files. These two historic differences are recorded in JSON and are not active validation errors. Future consumers must select the current snapshot rather than treating every preserved historical hash as a current lock.

## Application compatibility and migration

R2/R4/R5 are copyable app Recipes, absent from UI/Layout root exports. Their business Mock behavior is not a new shared asset:

- R2 injects an app editor. The app owns drafts; folder/resource save is a local example and explicitly does not publish or sync.
- R4 owns score/comment drafts by paper/question/student. Explicit save marks a local draft saved and says no grade was submitted. AI/PDF/report entries remain Mock.
- R5 owns event selection, time, playing and follow state. Its interval is a local simulation with effect cleanup; there is no real video or transcript service.

Workspace owns requested/effective/session layout and layout preferences. It does not own object identity, drafts, scores, playback or application save. Preferences write version 2 region mode/expanded width only. The reader accepts the previous version 1 width fields and normalizes them; unknown, malformed or refused storage falls back to defaults. These are local compatibility rules, not proof of a production migration.

## N06 repair: minimal current-lock refresh advice

The pre-repair Workspace hash is `1d8677dc534adf4a369ae3c4d380049f0e48a228d4660c3e6bdb35e37da86805`. After the repair is tested, only two of the four Registry current hash maps contain the implementation path:

| Registry | Current pointer needing Workspace refresh |
| --- | --- |
| `navigation-v042.json` | `currentSourceSnapshot.filesSha256["packages/layouts/src/workspace.tsx"]` |
| `navigation-v042-workspaces.json` | `sourceSnapshot.filesSha256["packages/layouts/src/workspace.tsx"]` |
| `navigation-v042-w3.json` | No Workspace source entry; no edit required |
| `navigation-v042-recipes.json` | No Workspace source entry; no edit required |

First preserve the complete former current snapshot in a named `priorW7PreRepair…` record. Then update the one implementation hash, timestamp and scoped N06 repair evidence in each current container. Preserve all `priorReview*`, `acceptedVisualSourceSnapshot12/13`, `g2VisualAcceptance`, `priorG2VisualAcceptance12`, and the G2 43-file locks. The JSON enumerates 20 historic Registry Workspace pointers that must stay unchanged. Do not globally replace the old hash.

`manifests/layouts/workspace.yaml` also has top-level current `sourceSha256`/`sourceSnapshotRecordedAt`. Preserve the old current fields and refresh them, or add an explicit current W7 repair snapshot that the validator consumes. Historical G2 hashes and old source version/provenance remain historical. A W7 overlay must identify the one implementation change, unchanged other 42 files and unchanged CSS/Tokens/public exports. Root will supply that after-lineage evidence; it is pending here.

## Figma boundary

The original workpack lists Figma file `MbWg1ft5zk1JRQiQ6dS30e`, page sources P01–P08 and their nodes; exact IDs and source-document hash are in JSON. `12-SOURCES-AND-DECISIONS.md` and `08-AI-READY.md` explicitly distinguish those page sources from public component bindings. All 16 live navigation Manifests still declare Figma mapping and Code Connect `not-established`, with Figma write `not-authorized`. A page node does not establish a component/variant binding. This audit checks the local declared mapping, without a new Figma inspection or write.

## W8 editable package proposal — not executed

Use a new empty output folder with a narrow navigation host, the existing three library source trees (`foundations`, `ui`, `layouts`), navigation R1–R6/S payloads and W6 consumers. Keep original package manifests and dependency declarations, frozen lockfile, workspace/TypeScript configs, required source assets, 16 navigation Manifests, four Registry records and used dependency records. Carry a source-lock with source/export hashes, the accepted43 baseline, later W7 overlay and explicit derived-host differences. Include README, local-experiment boundaries, selected evidence and a relative archive inventory.

Copying the complete three library sources preserves hundreds of existing public exports and their internal assets without inventing a pruning mechanism. Narrow the copied host/Vite inputs instead of copying the whole documentation Gallery and unrelated prototypes. The current `rn14-starter.mjs` exporter demonstrates source locking, complete library closure and empty-output protection; adapt those mechanisms only in the separately authorized W8 task. Editable source is primary; an optional built preview and zip support immediate review. Exclude cache, developer `node_modules`, and historical bulk logs from the archive.

The existing cache is present at `/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.pnpm-store/v10`; inspected runtime is Node `v24.13.0`, pnpm `10.28.1`. Proposed verification inside the exported folder:

```sh
pnpm install --frozen-lockfile --offline --ignore-scripts --package-import-method=copy --store-dir /Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.pnpm-store/v10
pnpm typecheck
pnpm test
pnpm build
pnpm dev --port 5357 --strictPort
```

Generate package-only typecheck and selected copied navigation tests in that host. An offline install in a fresh output has **not run** during this audit; W8 must record any missing cache rather than download or add dependencies. Use independent output `node_modules` with no links back to the original checkout. Verify copy/import/asset hashes, separate preview on a free port, real R/S/E interactions, editable-copy isolation and restore defaults. Extract the zip into a second empty folder and verify inventory and independent preview. Packaging does not close pending Human Gate, VoiceOver/contrast, production migration or publication.

## W7 final repair verification

Only the matching-region pointer-leave cleanup in `workspace.tsx` changed after this audit. Public exports, CSS and Tokens remain unchanged. Five package typechecks,119 focused units,232 browser cases and387 geometry captures passed. The current two Registry source entries and Workspace Manifest version are refreshed; historical G2 locks remain intact. See `repair-source-lineage.json` and `final-source.json`.
