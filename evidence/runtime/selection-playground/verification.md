# Selection Playground SC-04 verification

2026-09-10 · System Mode · new local Playground, existing unpublished source candidates. The user authorized SC-04 with “推进下一步” after explicitly accepting the SC-03 runtime visual/interaction scope. The [plan](../../../docs/plans/2026-09-10-selection-playground-sc04-implementation.md) and current phase record that exact authorization. Implementation, automated checks and independent review are complete. On 2026-09-12 the user accepted the limited editing, classification, preview and close scope, including the shared preview-heading repair; the decision below does not accept the full 38-case ledger or source lookup. The dated technical checks below remain historical evidence.

## Delivered scope

The [classified Playground](http://127.0.0.1:4173/#selection-playground) has four categories: basic controls, descriptive selection items, four complete card recipes, and combined preview/dependent-fields/page-selection patterns. Its owner can replace the first item's title and description, choose approved error/disabled states, clear or restore selection, switch theme/density, and choose a 296 / 320 / 564 / 612px preview container. Width is a review-container setting, not a new public component size.

The page separately exposes group value, preview target, active fields and the last submitted payload. Drafts survive category/selection changes; inactive or disabled fields are excluded from the current payload. Disabled choices retain their values and an available independent preview. Blank titles fall back to a visible label; omitted descriptions do not create empty description associations. Fictional content never becomes the stable value or trace identity.

Source lookup directly reads the four existing local registries. All 13 entries have real exports, source/recipe files, manifests and dependencies. The details preserve each prior Gate scope and keep candidate maturity, publication and the separately scoped preview repair separate. No installer, new public component, package or dependency was introduced. Stale “future Radio” and “preview callback only” descriptions were corrected in the existing manifests.

## Actual executed checks

Execution output is retained in [checks.log](checks.log), with the browser environment and layout facts in [browser-facts.json](browser-facts.json). The new page was tested in Chromium 151.0.7922.34 on macOS, using the installed Base UI 1.8.0 and existing Vitest/jsdom setup. Actual native font evidence remains in the unchanged Checkbox/Radio runtime records; the new page's computed family is PingFang SC / Microsoft YaHei / ui-sans-serif / sans-serif.

| Check | Actual result and boundary |
| --- | --- |
| Initial new checks | Expected missing-page/export failures were observed before implementation. A test-only unsupported matcher and ByRole option were corrected; implementation was not claimed passing at that point. |
| Final focused unit/component/governance | 67 / 67 across 11 files: new page and ledger/source checks, existing core page, Checkbox, Radio, Cards, Patterns and scoped governance. Includes actual React reordering with duplicate-label groups and stable label associations. |
| Related browser regression | 32 / 32 before the preview-heading repair: SC-04 4, Checkbox 7, Radio 6, Cards 7, Patterns 8. Old captures were redirected to temporary folders. |
| Final affected browser regression | 20 / 20 after the header repair and additional identity checks: SC-04 5, Cards 7, Patterns 8. Checkbox/Radio source is byte-identical to its preceding 13 passing browser checks. |
| Typecheck/build | Both passed after all runtime changes. The build retains the existing large-chunk warning. |
| Repository governance | `pnpm verify:governance` passed: offline lockfile, workspace, evidence, exact source/phase boundaries, Tailwind and Token checks. Existing contrast/eligibility findings remain reported; a green governance command does not resolve them. |
| Independent review | Current code, real-source lookup, original 38 requirements, preservation, screenshots and independent browser probes reviewed. One P2 was reproduced, fixed and independently closed as described below. Final evidence-record review passed; no unresolved code/evidence finding remains. The reviewer independently reran 7 focused checks. |

The first new browser run had one test-locator failure: opening the modal correctly hid background inputs from the accessibility tree. The assertion was corrected to inspect the real native input in the background DOM, without changing modal behavior; the subsequent full run passed. The first attempt to bind the local browser-test server was blocked by the sandbox; the actual browser runs above completed with local execution permission. No failed run is counted as a pass.

After implementation and independent-review status were recorded as complete/passed, the 20 scoped governance tests and the full governance command passed again. Removing only the new SC-04 entry still reproduces the complete prior phase record. These final outputs are appended to checks.log.

The unrelated whole-repository unit/browser suites and icon suite were not rerun for this stage. Source/artwork/token preservation and focused affected regressions define the verified scope.

## Visual and layout evidence

[Light](light.png), [Dark](dark.png), [compact](compact.png), [320px viewport with expanded source details](narrow.png), [forced colors](forced-colors.png), [very long preview title](long-preview.png).

At a 1600px viewport, the preview containers measured exactly 296 / 320 / 564 / 612px. All eight rendered card examples fit each container without horizontal overflow. At a 320px viewport, the document remains 320px wide even with long content and expanded source/dependency paths. The editor panel sizes to its own content. Theme/density, native selection, forced colors, reduced motion, touch and modal close/focus return were exercised. The actual in-app page on port 4173 was also opened and its live controls/results inspected. The implementing agent and independent reviewer inspected the captures; this technical review remains separate from the user's limited decision recorded below.

## Independent finding and repair

A long unbroken title was horizontally clipped in IndependentPreview. A very tall Chinese title could also make its non-shrinking header push the close action outside the viewport. This was reproduced on the real 320px page. The new regression failed before the repair with title scrollWidth 16854px versus clientWidth 246px.

One shared header rule now allows wrapping, shrinking and vertical scrolling. It applies to all existing preview callers, without changing colors, typography values or ordinary title geometry. The regression passes with the complete untruncated title, keyboard PageDown scrolling, a visible close action and focus return. Independent probes also verified Tab / Shift+Tab between the header, body and close button; at 320×640 the close button bottom was 603px. The independent reviewer closed this P2.

At the 2026-09-10 technical close, the repair was recorded as `awaiting_human`. Its limited acceptance is now recorded in the SC-04 decision and the IndependentPreview manifest/registry. The prior SC-03 acceptance remains unchanged.

## All 38 acceptance cases

The [execution ledger](acceptance.json) preserves the uploaded plan's IDs, titles, original stages, priorities, Given/When/Then and required methods. Its source hash matches the original ZIP member. All 38 cases are accounted for: **30 verified within the recorded evidence scope; 8 explicitly blocked**. Every entry links both its source checks and this execution record/log.

| Open cases | Reason |
| --- | --- |
| SEL-009, 012, 013, 014, 016, 020 | Chromium keyboard checks passed, but a separately recorded human `keyboard-manual` execution is outstanding. Prior general visual/interaction acceptance is not substituted for that record. |
| SEL-033 | Dark selected-card Focus remains **2.361:1**, below the unchanged **3:1** control requirement. Light is 3.410:1. Manual keyboard evidence and applicable contrast closure remain outstanding. Text remains subject to **4.5:1**. |
| SEL-034 | Actual target assistive technology/browser/version and a complete operation record are not yet established. DOM names/descriptions and automated keyboard checks cannot stand in for this. |

SC-00's split cases SEL-006 / 015 / 028 now link the later SC-03 integration evidence as well as their earlier native/layout checks. SC-00 source-audit cases retain their prior source evidence and do not claim a fresh Figma read. `visual-review` / code / DOM review by agents is identified separately from human design acceptance. Consequently, the whole 38-case acceptance remains blocked even though the SC-04 implementation and ledger can be reviewed.

## Preservation and remaining states

All 1018 files in the SC-04 protected snapshot are byte-identical: the captured UI/Foundation files, previous selection evidence and original card artwork. That snapshot does not include the application Pattern CSS; its one shared header repair is explicitly described above. Every pre-existing phase field is unchanged after removing the newly authorized SC-04 entry. Existing acceptance records and screenshots were preserved.

The new page remains `local-experiment` / `prototype-ready`; the 13 source assets remain unpublished `registry-candidate`. Figma changes, publication, production adoption and all Git actions were not performed. The repository has no HEAD, so no source commit was invented. No contrast waiver or full WCAG/assistive-technology pass is claimed.

## 2026-09-12 limited Human Gate acceptance

The user's exact statement was “基础页通过； 综合页通过”. Within the stated review boundary, the accepted SC-04 scope is editing, classification, preview and closing, including the overlong-heading wrapping/scrolling repair. [Current phase](../../../status/current-phase.yaml) records `selection-playground-sc04-edit-classify-preview-close-runtime-visual-interaction-only` under `componentRefinements.selectionPlaygroundSc04.humanGateDecision` with the date and explicit user confirmation.

This does not accept source lookup, all 38 requirements, color/contrast, remaining manual keyboard records, actual assistive technology or real-device checks. The ledger still has **30 verified in their recorded scope and 8 blocked**; SEL-033 still records **2.361:1 < 3:1** and SEL-034 still requires actual AT evidence. All case requirements, methods, recorded environments and case results remain unchanged. Publication, migration, Figma and Git remain unchanged.

The manifest and registry agree on the separate repair acceptance and point to this record. The registry retains the existing `pendingRefinement` field name for compatibility; its explicit `humanGate`, `humanGateScope` and `acceptedAt` values carry the current limited decision. This does not expand the historical SC-03 parent acceptance or the assets' unpublished candidate identity. The new page still has its original local-experiment/prototype-ready identity.

This update changes decision metadata and visible status copy only. The technical runs above were not rerun as part of recording the decision; current registration validation is recorded in the [existing-assets closure plan](../../../docs/plans/2026-09-12-existing-assets-closure.md).
