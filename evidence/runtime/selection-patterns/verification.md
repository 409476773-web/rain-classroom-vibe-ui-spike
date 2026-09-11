# Selection Patterns SC-03 verification

Verified on 2026-09-10 in System Mode. Implementation, automated checks and independent review are complete. The three Patterns remain unpublished `registry-candidate` assets; their runtime visual and interaction Human Gate is `accepted` following the user's confirmation below, and contrast acceptance remains `not-granted`. SC-01/02 visual decisions remain separate.

## Scope and implementation

The user authorized the proposed independent preview, dependent fields and current-page selection with “继续推进” after accepting SC-02. See the [implementation plan](../../../docs/plans/2026-09-10-selection-patterns-sc03-implementation.md), [SC-00 source audit](../../../docs/audits/2026-09-09-selection-sc00-preflight.md) and [Headless Base ADR](../../../docs/adr/0005-headless-base.md). The source handoff sections 01 / 03 / 04 / 06 supplied the interaction and acceptance cases; its V0.3 scene nodes are composition references, not a new pixel-match or production-domain contract.

| Delivered Pattern | Observed behavior |
| --- | --- |
| IndependentPreview | Its target is independent of the selected value. Unselected items and disabled-selection help can open a modal. Existing Base UI 1.8.0 provides focus containment, Escape/backdrop closing and scroll management. Closing returns to the actual trigger; a removed trigger uses the provided heading fallback. Opening, closing and canceling do not submit or change selection. |
| DependentFields | Conditional fields sit outside the selection label. Switching options does not force focus; ordinary Tab and editable-field arrow keys remain available. Inactive fields are hidden and disabled, session drafts are retained, and the owner validates/builds a payload only for the active branch. Explicit reset restores the original option and draft. |
| PageSelection | The host derives eligible IDs from the current filtered page. The master is unchecked, mixed or checked from the known eligible intersection; empty/loading is disabled and unchecked. Selecting adds eligible IDs; clearing removes only those IDs, preserving locked and other-page selections. The master has no submission name. The example separately shows the business model and successful native FormData entries. |

The [Pattern source](../../../apps/playground/src/patterns/selection-patterns.tsx) and [styles](../../../apps/playground/src/patterns/selection-patterns.css) are copyable compositions above UI, without a new package or generic state engine. The [review page](../../../apps/playground/src/docs/components/selection-patterns-page.tsx) owns fictional content, drafts, filtering, pagination, validation and serialization. `#selection-patterns` is linked from the component page. The existing `#selection-cards` preview buttons now use this same presenter; their callback forwards the actual click event. This supersedes the SC-02 report's historical status-message-only behavior without rewriting that accepted evidence.

Three manifests and the [local source catalog](../../../registry/selection-patterns.json) record real sources and the scoped user acceptance. Exact source scanning, CSS exceptions, color consumers and phase boundaries are registered. Token generation changed consumer metadata only; public Token values, standard Checkbox/Radio implementations, card geometry, source artwork and original evidence remain intact.

## Executed verification

| Check | Result |
| --- | --- |
| Initial behavior checks | Six expected missing/placeholder implementation failures, followed by six passing Pattern tests. |
| Focused component and governance checks | 51 passed across eight files: the new Patterns and scoped governance, plus existing Checkbox, Radio and Card coverage. |
| Existing governance regression tests | 409 passed across the two existing helper/B2 suites. |
| Full governance command | `pnpm verify:governance` passed, including offline lockfile, workspace, evidence, exact source/phase boundaries, CSS contracts and 30 Token consumer files. Existing unrelated contrast findings remain reported. |
| Type check and build | `pnpm typecheck` and `pnpm build` passed. The build retains its existing large-chunk warning. |
| SC-03 browser checks | Final 8 / 8 Chromium tests passed, covering SEL-010–014, 016, 020–025 and 035, shared scope/form cases, the Card composition fix, themes, density, narrow view, forced colors, reduced motion and touch. |
| Existing browser regression | 20 / 20 passed: Card 7, Checkbox 7, Radio 6. Captures were redirected to temporary folders to preserve accepted evidence. |
| Independent review | Passed after the one P2 finding below was fixed. The reviewer ran 12 additional boundary probes and checked the current source and captures. |
| Preservation | Of 44 protected baseline files, 43 have identical hashes. The only difference is shared Card CSS; removing the new direct-input selector anchors reproduces its exact prior hash. Colors, dimensions and every other CSS declaration are unchanged. |

After the implementation/review states were recorded, all 16 scoped governance tests and the full governance command passed again. Every phase record outside the new SC-03 entry matches the pre-SC-03 snapshot, including the frozen history and accepted control/Card Gates.

The final browser run followed a test synchronization correction: one earlier focus-containment assertion sampled Base UI's boundary guard before its documented-in-source animation-frame focus return. The assertion now waits for the actual contained-focus condition instead of taking an immediate boolean snapshot. The popup implementation was unchanged; the full eight-test run then passed. This is recorded as an earlier failed run and a passing corrected run, not an uninterrupted pass.

The full repository unit/browser suites and icon integrity suite were not rerun for this stage. The scoped regressions above cover the affected native controls, Cards, Patterns and governance; icon sources were not changed.

## Visual and browser evidence

[Light page](light.png), [Dark page](dark.png), [Light preview](preview-light.png), [Dark preview](preview-dark.png), [compact density](compact.png), [320px viewport](narrow.png), [forced colors](forced-colors.png), [measured browser facts](browser-facts.json).

The wide review viewport is 1600×1100. The portal is 560×590 in both captured themes and explicitly inherits the current theme and density. Its title receives initial focus, its body scrolls, and its close action remains reachable at 320×720. At that narrow viewport the main content is 272px wide and the document remains exactly 320px wide, with no horizontal overflow. The root reviewer inspected all seven captures; the live in-app preview was also checked for the unselected-template modal and preserved selection.

| Measured role | Light | Dark | Threshold and interpretation |
| --- | --- | --- | --- |
| New preview title, description and body text, minimum | 6.565:1 | 8.549:1 | At least 4.5:1 for these actual captured samples. |
| Existing shared Focus against a selected Card surface | 3.410:1 | 2.361:1 | The existing Dark result remains below 3:1; no exception or pass is granted. |

Preview text uses the actual computed colors and opaque popup background with the existing Foundations contrast calculation. Existing Card measurements come from the preserved [SC-02 verification](../selection-cards/verification.md); its paint declarations are unchanged and the current Card browser regression passed. These results are not a whole-component WCAG, screen-reader or assistive-technology certification. Safari/Firefox and full assistive-technology testing remain unverified.

## Independent review finding and correction

The shared Card originally used descendant-wide `:has(input:checked)`, Checkbox `:indeterminate` and `input:disabled` selectors. A retained checked draft inside its independent fields slot could therefore falsely select the outer shell; the real hidden/disabled attempt field also made an enabled Card use GrayText in forced colors.

All three states now anchor to `> .rain-selection-card__selection > input`. Two browser assertions were observed failing before that change and pass after it. The reviewer independently matched the real CSS rules against actual component DOM and closed the P2 after all 12 probes passed. No paint value, layout declaration, new state API or competing event handler was introduced.

## Runtime visual and interaction acceptance — 2026-09-10

After requesting the Playground be opened and inspecting [the live SC-03 page](http://127.0.0.1:4173/#selection-patterns), the user explicitly confirmed “没问题，完成验收”. This accepts only the delivered IndependentPreview, DependentFields and PageSelection runtime visual and interaction scope (`selection-patterns-sc03-runtime-visual-interaction-only`).

The current phase, three manifests and local source catalog record this decision. Implementation, automated verification and independent review retain their separate results. This record-only update preserves runtime source, styles, Tokens and captured evidence. The existing Dark selected-Card Focus remains 2.361:1 against 3:1; visual/interaction acceptance does not grant a contrast exception or establish a WCAG pass.

Acceptance-record checks: 17 scoped governance tests and `pnpm verify:governance` passed. All 54 protected runtime/evidence hashes match the pre-acceptance snapshot, and every phase field outside this SC-03 Human Gate decision is unchanged. Runtime/browser tests were not repeated for this record-only update.

Server-wide selection, a public general-purpose Dialog, SC-04 completion, publication, Figma changes, business migration and all Git actions remain outside this delivery. No new dependency was added.
