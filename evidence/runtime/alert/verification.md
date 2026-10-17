# Alert candidate verification — 2026-09-20

System Mode. User instruction: “开始建设”. User visual acceptance: “确定。完成视觉验收” on 2026-09-20. Public registry-candidate; unpublished; visual Human Gate accepted for `alert-current-runtime-visual-only`; contrastAcceptance not-granted. No Classic modification, Figma write, publication, migration or Git operation.

## Delivered scope

- Shared `Alert`, `AlertTitle`, `AlertDescription`, `AlertActions`; four tones, independent page/banner, optional native close, filled Rain icons and existing Tokens. No dependencies or global Tokens added.
- Plain text uses same-family body text without a default icon. Compound content uses a filled state icon; `icon={false}` remains an explicit short-message override. Info uses the existing Brand family for its shallow surface, border and text. Quiet static default; hosts opt into live feedback and own visibility, requests and focus recovery.
- Playground `http://127.0.0.1:5186/#alert`, linked from component overview: four-tone matrix, detailed warning, persistent announcement, A/B comparison, theme/density switches, 320px content, long filename and long action label. Mock retry fails once, then succeeds; closing does not cancel or lose access.
- Manifest, local source Registry, generated asset index, exact phase authorization and color-consumer registration. Source hashes and retained MIT reference are in `source-lock.json`; legacy YktAlert and the existing G1 adapter were not changed.

## G1 example-page follow-up — 2026-09-20

The user authorized replacing the G1 example-page Alert usages with the accepted shared contract. `apps/prototype/src/scenarios/token-first-g1/page.tsx` now imports `Alert`, `AlertTitle` and `AlertDescription` from `@rain-next/ui`, using `tone="warning"` and `tone="error"` for the two notice examples. The old `apps/prototype/src/scenarios/token-first-g1/alert.tsx` remains only as retained historical source for the scoped adapter test and is no longer rendered by the page. `apps/prototype/src/scenarios/token-first-g1/page.test.tsx` asserts the shared `ui-alert` identity, tone mapping and absence of `local-g1-alert` in the rendered samples page.

Focused follow-up verification passed: 9/9 Vitest assertions across the page, adapter, shared Alert and Alert governance tests; prototype typecheck and build; and 4/4 G1 Chromium scenarios. Warning/error foreground findings remain review-only because Alert contrast acceptance is still not granted.

## Actual verification

| Check | Result | Evidence |
| --- | --- | --- |
| Alert component and color governance tests | 7/7 passed across two files | `unit.log` |
| Chromium browser scenarios | 2/2 passed | `browser.log`, `browser-facts.json` |
| Workspace TypeScript | Passed, including test types | `types.log` |
| Workspace build | Passed; existing large-chunk warning remains | `build.log` |
| Tailwind contract | Passed | `tailwind.log` |
| Evidence and workspace checks | Passed | `evidence.log`, `workspace.log` |
| Asset references, exports and generated index | Passed after generation | `asset-index.log` |
| Full Token and boundaries checks | Failed on pre-existing unrelated entries; no new listed findings | `baseline-comparison.json`, baseline/current logs |
| Independent read-only review | Passed for current scoped implementation; no implementation blocker | Findings and disposition below |

Browser assertions cover four-tone same-family text and icon rendering in both themes, no icon for plain single-line alerts, 4px vertical padding for default and compact short alerts, filled icons for compound content, same-family tertiary-button labels, regular-weight banner titles, actual page/banner geometry, compact padding, A/B independence, 24px close buttons, long text/action containment, no page overflow, forced-colors rendering, keyboard closing/restoring, pending retry guarding, failure/success, closing during submission and focus recovery without stealing focus from the persistent entry. Preview navigation and the usage/details actions remain on `#alert`. Runtime errors: none observed in the last successful browser run.

Screenshots inspected as whole pages: `light.png`, `dark.png`, `compact.png`, `narrow.png` (390px viewport, including 320px component), `forced-colors.png`. Inspection caught and fixed a dark heading color inherited from the old page and a base-layer density/radius override. Long text-button labels also required allowing flex shrink, beyond simply setting white-space; `long-action-red.log` records the original 12px intrusion into content padding and the final browser check verifies actual label bounds.

## Review and limitations

- Independent review confirmed stateless closing, native button semantics, open composition, separated presentation/tone/density, host-owned async state and focus. The intro spacing specificity issue was corrected. Focus destinations use the existing `data-focus="item"` contract. Parent browser execution completed successfully despite the reviewer's restricted Chromium launch environment.
- State-family text and action text retain measured contrast findings where a token/surface pair is below the 4.5 text threshold; see `color-findings.json`. Info Brand text is registered against Brand Alpha4; the remaining findings are Green, Orange and Red pairs. Critical tasks should use a reviewed combination; retaining the candidate is not a waiver or contrast acceptance.
- Automatic text/icon measurement covers the Alert foreground and its actual state surface. It does not grant a new acceptance to existing shared Button, Link or focus recipes, nor constitute a full screen-reader audit.
- Runtime verification used Chromium. `:has()` and container queries require modern browsers; Safari, Firefox and older embedded WebViews have not been verified in this task.
- Full workspace Token/boundary failures remain in prior bm-d, exam-editor, teacher-grading and local G1 work. This delivery is scoped; those failures were neither suppressed nor claimed fixed.

## Lifecycle and next checkpoint

Implementation and scoped automation/review are complete for this candidate. The user accepted the current runtime visual on 2026-09-20 with scope `alert-current-runtime-visual-only`; contrast acceptance remains `not-granted`; publication remains `unpublished`. No Figma, publication, business migration or Git action was performed.
