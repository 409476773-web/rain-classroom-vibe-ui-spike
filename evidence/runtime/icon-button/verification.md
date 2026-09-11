# IconButton implementation and verification

Date: 2026-09-07. Mode: System Mode. Authorization: the user's explicit “开始实现”, recorded in `status/current-phase.yaml` → `componentRefinements.iconButton`, followed by “开始修改” for the confirmed semantic supplement in the linked implementation plan.

## Delivery state

| Track | Result |
| --- | --- |
| Implementation | Completed in the current workspace |
| Automated verification | Passed; latest complete `pnpm verify` exited 0 with 881 unit tests and 55 browser tests |
| Independent review | Passed; initial P2 fixes rechecked, semantic supplement and examples reviewed separately |
| Human visual gate | Accepted on 2026-09-07; explicit user statement “确认视觉验收” |
| Asset | Unpublished Registry Candidate; review page remains a Local Experiment |
| Tooltip, existing component migration, Figma, publication, Git | Not performed |

## Implemented contract

- Public Icon Size: 4 / 6 / 8 / 10 / 11 / 12 / 14 / 16 / 18 / 20 / 22 / 24 / 28 / 32 / 36 px. 4 and 6 are micro-symbol sizes; glyph suitability remains independent. Square classes are `size-rain-icon-N`.
- IconButton: 18 complete control/icon recipes; compact/default resolve to 32/18 and 36/20, explicit size wins. Control sizes through 32 use radius 6; 36 uses radius 8.
- Host-supplied current icon and ARIA. `highlight=none/icon/surface` does not infer business state or choose assets. Favorites and filter results can keep only icon emphasis; open panels keep their light blue surface.
- Fill is the default; Emphasis is a feature-scoped Local Recipe. Danger only supports `highlight=none`.
- Loading keeps focus and current surface, blocks pointer/click/activation keys, and shows the canonical PNG. Popup triggers also block ArrowDown/ArrowUp while unavailable. Ordinary focus navigation, Tab and Escape remain available. Disabled uses native disabled and its current token color, including disabled+loading.
- Category colors, Focus, motion and dimensions use the current Rain Next Foundation. No source icon asset or existing Button/Input recipe was migrated.

## Files and integration

- `packages/foundations/src/icon-size-contract.ts`: public scale and component dimension aliases; `scripts/token-foundation-outputs.mjs` remains the source for generated variables, Tailwind utilities, class metadata and contracts.
- `packages/ui/src/icon-button/`: component, complete recipes and behavior tests. `packages/ui/src/styles.css` contains registered Loading/forced-color/reduced-motion exceptions. Moving only the generic Icon's 1em dimensions into the base layer makes direct public size classes effective.
- `apps/playground/src/docs/components/icon-button-page.*`: interactive review; Components and Foundations link to it. It includes filter four-state examples, favorites/panels, async states, table/input embedding, density and all sizes.
- `manifests/ui/icon-button.yaml`, `registry/icon-button.json`: current-workspace candidate contract and existing local Registry format; no standalone publication is claimed.
- Governance accepts only the explicitly authorized files and finite utility/source additions; prior historical hashes and Human Gates remain protected.

## Initial implementation verification

`pnpm verify` passed governance, icon integrity, complete type checking, **867/867 Vitest tests across 42 files**, and the production build. Its browser-stage server launch was blocked by the sandbox (`listen EPERM 127.0.0.1:4173`), so that orchestration invocation exited 1. The same complete browser stage was then run with the approved local-server permission: **`pnpm test:e2e` passed 54/54 Chromium tests**. No test was skipped or relaxed to resolve the environment failure.

`pnpm verify:reuse-audit` passed (75 assets; snapshot mode). `verify:icons` verified all 897 current assets and the single-icon import boundary. Existing Button, Input, typography, icon masks, themes and focus browser regressions passed alongside the 7 new IconButton browser tests.

The IconButton tests measure all 15 direct public icon boxes and all 18 control/slot/inner-icon pairs and radii; Light/Dark resting, hover and pressed colors; disabled+loading paint; retained focus and repeated activation blocking; forced colors; reduced motion; independent filter and panel states; keyboard and embedded host isolation. A separate compilation check builds the shared theme with no scanned consumers and confirms all 21 public/control dimension classes are emitted.

All newly registered non-disabled IconButton glyph colors retain meaningful-icon 3:1 checks, with no new contrast exception. The token verifier still reports the 8 previously user-accepted ordinary Button danger-text contrast exceptions; those are not newly passing readability checks. The build retains its existing large full-icon-catalog chunk warning.

## Initial independent review

Reviewers separately inspected UI/Foundations, governance, and the page they did not implement. Two P2 findings were fixed:

1. Standalone size emission initially depended on Playground scanning. The Foundation generator now emits exactly the finite 21-class inline source list; the reviewer compiled the real generated CSS with zero candidates and zero external sources.
2. A loading popup trigger initially allowed ArrowDown/ArrowUp handlers. The regression first failed with two leaked calls, then passed with conditional popup activation blocking. Tab/Escape and ordinary arrow navigation are retained.

The UI reviewer independently reran 18 relevant tests successfully. No unresolved P1/P2 finding remains. This review does not replace the user's visual gate.

## Confirmed semantic supplement and current verification

The user's Figma Frame 12 confirmation covers 9 groups and 17 existing assets: star collection, heart collection, thumbs up, thumbs down, applause, move-to-top, pin, filter, and sidebar/directory expand/collapse. The public source `packages/foundations/src/icons/semantic-rules.json` and its existing generated documentation/catalog now cover **58 assets and 40 rules**. The original 42 asset records remain identical; among the original 31 rules, only filter adds the confirmed filled variant and source references. General arrow and labeled text-button rules remain intact.

The existing resolver and IconButton public APIs are unchanged. Vague favorite/like requests require context. The host chooses current assets and owns ARIA: marks use icon emphasis, panel expansion uses surface emphasis, and filter applied/expanded states stay independent. Move-to-top keeps its single arrow, pin preserves its direction change, and applause preserves the rear-hand fill. The updated page demonstrates all 9 groups with current Foundation colors and existing static imports.

SHA-256 comparison against the pre-supplement snapshot confirms **897/897 runtime assets unchanged**. The protected 2,693-file icon source/runtime tree also retains its frozen hash. The B2 check accepts only the exact 16 authorized usage-status changes, then compares the normalized manifest to its original hash; negative checks reject additional assets, wrong statuses, source/color/Gate changes and missing authorization.

The first full `pnpm verify` invocation stopped at an existing FIFO guard test: **880 passed, 1 timed out** under its unchanged 1,000ms child-process budget. Three isolated reruns passed in 397/341/349ms. A temporary diagnostic fixture confirmed zero FIFO reads and a 326ms child-process exit; the new normalization plus hash had a 3.19ms median. These results are consistent with a transient load-related timeout, but the failed invocation did not capture scheduling data. No source guard, test assertion, timeout or concurrency setting was changed to obtain a pass.

The subsequent **complete `pnpm verify` exited 0**: governance, generated icon integrity, all type checks, **881/881 Vitest tests in 42 files**, production build, and **55/55 Chromium tests**. The browser stage includes 8 IconButton tests. `pnpm verify:reuse-audit` also passed for the existing 75-asset snapshot. Existing build and previously accepted contrast warnings remain as described above.

Independent reviewers inspected the semantic/generation changes and the interactive page they did not implement. They verified original-rule preservation, ambiguous selection, formal asset identity, host-owned state, keyboard behavior, and filter/panel independence. No blocking finding remains. The primary agent inspected actual Light/Dark rendering and exercised star, applause, move-to-top, pin and directory controls; marks retained transparent backgrounds, and an open directory retained its current blue surface. The preview was restored to its initial Light state before the user's acceptance below.

## Human visual acceptance

On 2026-09-07, the user explicitly stated **“确认视觉验收”** for the current IconButton review. `status/current-phase.yaml` records the exact statement, date, visual-only scope and this evidence path under `componentRefinements.iconButton.humanGateDecision`. The IconButton manifest and local Registry now record `humanGate: accepted`; the preview notice reads “视觉验收已通过”. Component styles, behavior, tokens and icon assets are unchanged by this acceptance record.

The earlier 881-unit/55-browser verification remains the implementation evidence from the preceding run, not a claim that this acceptance-only update reran the whole suite. Publication, Figma, business migration, Git and all other Human Gates retain their prior state.

Acceptance-record checks passed: `pnpm verify:governance`; all 222 tests in `scripts/verification-helpers.test.ts` and `icon-button-page.test.tsx`; and the selected B2 Gate synchronization regression (1 passed, the other 160 deliberately outside that targeted run). These checks preserve the pending state, require the exact user decision and completed technical checks for acceptance, reject mismatched Phase/Manifest/Registry states, and retain the publication boundary. A separate read-only review confirmed other Gates and frozen history remain unchanged; the live preview displays the updated acceptance notice.

## Browser evidence

The latest browser suite wrote actual 1440px-wide full-page screenshots, with CSS animations paused for capture. They include the semantic supplement and preserve the pre-acceptance review snapshot; the banner still says pending in these captures. No automated screenshot comparison baseline is registered.

- [Light](light.png), SHA-256 `1d96e39049cc7c6c811bd838919d5a381494b814323be00b7df0e554f9896d0f`.
- [Dark](dark.png), SHA-256 `0e65a11616c69d66228263b536eef190521583907b0b978841e597a5f728c49f`.

The initial implementation review also checked a 390px viewport: document width remained 390px. That temporary viewport override was reset; this supplement retains the same responsive layout rules.

Preview: `http://127.0.0.1:5173/#icon-button`; public-size entry: `#icon-sizes`. Pin and move-to-top use the confirmed distinct assets. Tooltip composition remains deferred.
