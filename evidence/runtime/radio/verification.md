# Radio / RadioGroup SC-01 verification

Date: 2026-09-10. Current phase: Token Foundations V1, System Mode. User authorization: “开始建设标准单选框 Radio + RadioGroup”. Scope is the standard single-choice item and complete group recipe, following the [implementation plan](../../../docs/plans/2026-09-10-radio-sc01-implementation.md) and [native Radio decision](../../../docs/adr/0007-native-radio.md).

Current summary, aligned 2026-09-12: implementation **completed**; automated verification **passed for the recorded Radio slice and affected regressions**; independent review **passed**. Visual Human Gate: **accepted**, limited to `radio-radiogroup-sc01-runtime-visual-only` by the 2026-09-10 decision recorded below. Contrast acceptance: **not-granted**. Public asset identity/maturity: **registry-candidate**, unpublished. This summary correction did not rerun the historical checks or grant a new acceptance.

The build and review narrative below preserves its original execution chronology; statements awaiting visual review describe the period before the final human decision at the end of this record.

## Delivered behavior and files

- `packages/ui/src/radio/radio.tsx` exports controlled Radio and controlled/default RadioGroup through the public UI entry. The complete recipe includes fieldset/legend, optional descriptions, vertical or wrapping horizontal layout, help, invalid/required presentation and native form participation.
- Native same-name/form radios own mutual exclusion, Tab, Space and arrow navigation. Repeated selection does not notify again. Description clicks activate the same input. Canceled activation preserves committed selection and submitted data, including during a suspended React owner update.
- Values are unique non-empty string IDs; null means no selection. Missing selected IDs remain in the model and reappear checked if rendered later. Disabled items cannot activate or submit; selecting an enabled alternative can replace a disabled selected value. Disable the group to lock the whole choice.
- `packages/ui/src/utils/use-default-reset.ts` is the unchanged private Checkbox reset hook, now used by both families. Defaults update the next reset without immediately resetting selection. Reset follows current external/replaced forms, preserves immediate uncontrolled FormData and honors cancellation. Controlled form owners handle reset after it is accepted; immediate FormData before their commit is not promised.
- `packages/ui/src/styles.css` adds Radio-only Token paint, 23px circular interaction highlight, shared Focus and forced colors. Existing Checkbox styles are unchanged. Color metadata and exact CSS/source authorization are registered in the existing scripts and B2 contract.
- `manifests/ui/radio.yaml`, `radio-group.yaml` and `registry/radio.json` retain separate public identities. Both Checkbox and Radio Registry source sets include the moved reset utility.
- `apps/playground/src/docs/components/radio-page.tsx` / CSS, the `#radio` route, component navigation and explicit Tailwind source provide a working [preview](http://127.0.0.1:4173/#radio).

No cards, rich interactive children, preview actions, conditional panels, shared selection engine, new dependency or global Token value were added. No Figma write, publication, business migration or Git action was performed. Checkbox's two existing visual acceptances remain separate and unchanged.

## Verification results

| Check | Result and practical scope |
| --- | --- |
| Native and scoped governance tests | 34/34 passed: Radio 10, Checkbox 14, Radio governance 3, Checkbox governance 7. Includes controlled/default ownership, canceled activation/reset, Suspense, external/replaced forms, required/disabled/empty data and invalid IDs. |
| Full unit snapshot | 70 files / 1165 cases: 1161 passed; four historical fixture/source-inventory tests failed because their explicit inventories omitted the new authorized Radio files. Only the fixture copy/removal lists, CSS exception inventory and exact `@source` expectation were updated. All four affected cases then passed; a second whole-workspace run was not performed. |
| Radio browser checks | 6/6 passed on the final captures: native keyboard/group isolation, canceled activation/reset and immediate FormData, native required/controlled reset/disabled fieldsets, both themes and interaction states, 320px/density/system colors, touch taps without sticky hover. Chromium, one worker, no retries. |
| Checkbox browser regression | 7/7 passed after hook extraction. Its existing evidence environment override now also governs the interaction screenshot directory; all regression captures went to `/tmp/rain-radio-checkbox-regression`. |
| Governance | Lockfile, workspace, visual evidence, file boundaries, B2 and Token verification passed. Exact source/paint/state authorization and frozen history checks remain enforced. |
| Typecheck / build | Passed. Build retains the existing large-chunk warning; no dependencies changed. |
| Icon integrity | 899/899 source identities passed. Radio's circle and dot are native control geometry; no icon is redrawn or added. |
| Independent review | No remaining component findings. Reviewer independently passed 34 native/governance checks, 11 Radio boundary probes, 13 Checkbox supplement checks and 4 real-browser probes; verified real Chromium separation of same-name radios across different external forms. A P2 screenshot issue caused by test drag-selection was corrected and the reviewer confirmed clean recaptures. Final evidence confirmation passed. |

Initial browser failures were test-harness issues: disabled elements must be deliberately clicked when testing blocked activation; Radius/full resolves to 9999px; computed outline ordering differs from source declaration order; Chromium briefly retains native `:active` after a repeated touch tap. These were corrected without changing component behavior. Later visual inspection caught text selection introduced by test drag cancellation, so captures now clear the selection and restore keyboard Focus. All six Radio scenarios passed again after these corrections.

The scripts composing `pnpm verify` were run separately. The temporary browser configuration uses port 4187 because the user preview occupies 4173. No claim is made that the literal aggregate command or a second complete unit run passed.

## Browser visual evidence

The source Figma variants were inspected live and saved as [node facts](figma-reference.json) and [reference image](figma-reference.png). Original 17.6px circle and roughly 6.7px dot adapt to established 18px/6px Tokens. One dot size is retained for disabled state. The source's circular highlight remains 23px within the 24px canvas; its paint uses the lighter accepted family Token strength, independently awaiting Radio visual review.

| Property | Actual browser result |
| --- | --- |
| Canvas / control / dot | 24×24 / 18×18 / 6×6px |
| Hover / pressed highlight | 23×23px circle; 0.5px inset; Radius/full |
| Title | 15px / 24px / 600; actual platform font PingFang SC, PingFangSC-Semibold |
| Description | 13px / 22px / 400 |
| Light / Dark panel | Background/Neutral/1: rgb(255,255,255) / rgb(30,36,59) |
| Unchecked edge | Local Border/Neutral/1 Alpha/65 normally; Alpha/85 over the actual hover/pressed highlight |
| Selected fill / dot | Fill/Brand/Solid/2 and OnColor/1; selected hover retains the fill; pressed uses Solid/1 |
| Shared Focus | 1px outline and 3px halo; forced colors retain a 2px system outline and visible selected dot |
| Density and width | Same control geometry in compact/default; whole page and nested label text fit 320px, including unbroken text |

Final artifacts: [Light](light.png), [Dark](dark.png), [Light hover](light-hover.png), [Light pressed](light-pressed.png), [Dark hover](dark-hover.png), [Dark pressed](dark-pressed.png), [320px](narrow.png), [Compact](compact.png), [Forced colors](forced-colors.png), [computed browser facts](browser-facts.json). These are runtime review evidence, not visual acceptance. Screenshots were inspected after removing test-induced text selection.

Touch emulation verifies single-choice taps, no duplicate callback and no desktop hover. A frame-sampling diagnostic measured native `:active` clearing about 149ms after the second tap; the test allows up to 1s for that native feedback to end. Sustained held-touch feedback is not established by this result and remains outside the desktop state verification; no JavaScript press state is added.

## Contrast measurements and retained limits

Computed browser paints were composited on the actual panel using the existing Foundations contrast function. Disabled controls are not presented as passing meaningful-cue checks.

| Cue | Light | Dark | Threshold / status |
| --- | ---: | ---: | --- |
| Title / panel | 6.565 | 8.549 | 4.5:1 |
| Unchecked normal edge / panel | 3.714 | 5.222 | 3:1 |
| Unchecked hover edge / composited highlight | 5.238 | 6.579 | 3:1 |
| Unchecked pressed edge / composited highlight | 4.931 | 5.962 | 3:1 |
| Selected normal or hover dot / fill | 5.125 | 4.536 | 3:1 |
| Selected pressed dot / fill | 6.203 | 3.875 | 3:1 |
| Shared Focus line / plain panel | 3.835 | 2.573 | Dark remains below 3:1 |
| Shared Focus line / painted Focus halo | 3.019 | 1.886 | Dark remains below 3:1 |

All 12 unchecked hover/pressed layered combinations across Background/Neutral/1–3 and both themes were checked; the minimum is 4.621:1. Selected fill against the Dark hover/pressed highlight measures 2.760 / 2.894:1; the meaningful selected dot remains above 3:1. Selected border is decorative. Shared Dark Focus is an existing unresolved contrast finding, not a new accepted exception or a whole-component accessibility pass. No focus-area conformance audit was performed.

## Preservation and next checkpoint

19 preserved dependency/governance/Checkbox evidence files match the before-task hashes; phaseHistory and the accepted Checkbox checkpoint are identical. The reviewer also compared Checkbox CSS and confirmed that the reset helper was extracted without logic changes.

Next checkpoint: user review of the standard Radio / RadioGroup runtime appearance, including normal, hover, selected, selected-hover, pressed, disabled and keyboard Focus in both themes. This does not accept contrast exceptions, later card slices or publication.

Local logs: `/tmp/rain-radio-full-unit.log`, `/tmp/rain-radio-fixture-recheck.log`, `/tmp/rain-radio-browser-final.log`; contrast calculations: `/tmp/rain-radio-contrast.json`.

Closure verification after recording completed/passed/passed: the 34 focused tests and complete governance command passed again. Final test-file typecheck also passed. Logs: `/tmp/rain-radio-closure-tests.log`, `/tmp/rain-radio-closure-governance.log`, `/tmp/rain-radio-closure-typecheck.log`. The live 4173 preview was checked with the actual 24px canvas, 18px control, 6px dot and 23px halo and retained for user review.

## Human Gate decision — 2026-09-10

The user confirmed “确定。推进下一步”. This accepts only the standard Radio / RadioGroup runtime appearance above (`radio-radiogroup-sc01-runtime-visual-only`). Implementation, automated verification and independent review remain complete/passed/passed; both assets remain registry candidates and unpublished. Contrast acceptance remains not-granted, including the existing shared Dark Focus finding. The separate next SC-02 slice receives its own authorization and review.
