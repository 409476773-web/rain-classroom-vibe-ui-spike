# Selection cards SC-02 verification

Verified on 2026-09-10 in System Mode. Implementation, automated checks and independent review are complete. The card runtime visual Human Gate is `accepted` following the user's confirmation below, contrast acceptance remains `not-granted`, and all six entries remain unpublished registry candidates. The accepted standard Checkbox / Radio checkpoints are separate.

## Scope and sources

[SC-02 implementation plan](../../../docs/plans/2026-09-10-selection-cards-sc02-implementation.md), [live Figma reference facts](figma-reference.json), [reference board](figma-reference.png). The user authorized SC-02 with “确定。推进下一步” after standard Radio delivery. That statement also records only the preceding Radio / RadioGroup runtime visual acceptance.

CheckboxCard / RadioCard reuse their existing native implementations through an internal content-rendering seam. The optional group `renderOption` slot passes the existing group-owned selection, form and accessibility props. Four stateless compositions cover image selection, object multiple selection, comparison, and selection with an independent preview button. The existing native [Checkbox ADR](../../../docs/adr/0006-native-checkbox.md) and [Radio ADR](../../../docs/adr/0007-native-radio.md) still govern behavior.

Preview buttons trigger a local status message in this review page. Preview presentation, conditional fields and page selection belong to SC-03 and have not been implemented here. There are no new dependencies, global Token values, Figma writes, business migrations, releases or Git actions.

## Executed checks

| Check | Observed result |
| --- | --- |
| Initial card tests | 7 failed before the card exports existed; subsequently passed. |
| Focused component and governance checks | 44 passed across card, standard Checkbox / Radio and their scoped governance suites. |
| Full unit run | 1,174 passed out of 1,175. The existing FIFO evidence guard hit its 1,000ms process timeout during the concurrent run. Its isolated rerun passed without a code or timeout change; the full suite was not rerun. |
| Governance | `pnpm verify:governance` passed, including exact phase/source boundaries, CSS exceptions and 29 Token consumer files. Existing contrast findings elsewhere remain reported. |
| Icon integrity | `pnpm verify:icons`: 899 usable / 899 source identities; no source failures. |
| Type check and build | Passed. Build retains the existing warning about large chunks. |
| Card browser checks | 7 / 7 Chromium tests passed: native pointer/keyboard, independent actions, native forms/reset, reference geometry, 320px wrapping, themed paint, density, forced colors and touch. |
| Standard control browser regression | 13 / 13 passed: Checkbox 7, Radio 6. Regression captures were directed to temporary folders to preserve accepted evidence. |
| Preservation | All 28 checked existing evidence/dependency hashes match the pre-SC-02 snapshot. The entire pre-SC-02 shared CSS prefix, Checkbox checkpoint and frozen phase history are unchanged. |

The full-suite timeout is recorded as a failed first run plus a passing isolated recheck, not as an uninterrupted full-suite pass. Current focused and browser checks include the review fixes below.

## Browser geometry and state evidence

The review viewport is 1600×1100. Each family capture is 1312×890. The narrow capture comes from a real 320px viewport; its main content is 272×5078 and the document has no horizontal overflow. Separate 320px card containers and 296px long-title references are also checked at the wide viewport.

| Recipe | Reference size | Confirmed content geometry |
| --- | --- | --- |
| RadioPreviewCard | 296×231.43 | Control x/y16; content x48; artwork 7:3; bottom padding 18. |
| CheckboxObjectCard | 612×108 | Control x/y16; content x48; trailing identity 40. |
| RadioComparisonCard | 296×208 | Summary, two-line description area, ordered attributes; long titles grow the card. |
| RadioCardWithPreview | 612×148 | Content x48, inner title x100, actions x48; recommendation 8px after actual short-title text. |

No public reference-width or fixed-height API was added. Titles use the established PingFang SC 15/24/600, with source Noto 500 intentionally mapped to the established font policy. Selection does not change card dimensions. The complete recipes remain the default composition.

[Light](light.png), [Dark](dark.png), [Light hover](light-hover.png), [Dark hover](dark-hover.png), [Light pressed](light-pressed.png), [Dark pressed](dark-pressed.png), [narrow viewport](narrow.png), [compact density](compact.png), [forced colors](forced-colors.png), [browser facts](browser-facts.json).

The facts contain 15 cards in each Light/Dark normal, hover, pressed and keyboard-focus capture. Accessible names use the visible title; descriptions are linked separately. Decorative artwork has an empty alt, and independent buttons are outside selection labels. Tab reaches preview buttons; their click, Enter and arrow keys do not change selection or submit. Disabled selection retains an available sibling preview action; a disabled fieldset follows native fieldset behavior.

## Contrast and known limits

Measurements use real computed text/control colors and the background stack, including the uniform Alpha/4 layer over opaque Background/Neutral/1. The existing Foundations contrast function computes the ratios. Theme-switch button transitions finish before the final-state samples are read. Disabled samples are excluded from contrast passes.

| Captured role | Light minimum | Dark minimum | Interpretation |
| --- | --- | --- | --- |
| Non-disabled text, 79 samples per captured state | 4.945:1 | 5.193:1 | At least 4.5:1 in this matrix, including identity text, recommendation and preview action. |
| Native selected mark or unselected boundary | 3.714:1 | 4.536:1 | At least 3:1 in this matrix. The explicit check/dot carries selection. |
| Selected card outer border against card surface | 3.410:1 | 2.361:1 | Redundant decorative cue; Dark is below 3:1 and is not recorded as a pass or accepted exception. |
| Shared keyboard Focus outline against selected card surface | 3.410:1 | 2.361:1 | Retains the existing Dark Focus limitation. This compares the outline to the card surface, not its additional shared halo. No Focus contrast exception is granted. |

These measurements cover the captured compositions and are not a whole-component WCAG or screen-reader certification. Full assistive-technology testing and Safari/Firefox coverage remain unverified. Forced-color keyboard Focus and meaningful controls were exercised in Chromium.

## Independent review and resolved findings

The independent reviewer reran the 31 native/card component tests and 8 additional probes for canceled activation/reset, fieldset disabling, defaults and option reorder, and independent actions. Three findings were corrected:

1. Selected Alpha/4 originally replaced the opaque base. It now paints above Background/Neutral/1. Both themes retain the same card color across Neutral/1, Neutral/2 and Neutral/3 hosts; forced colors removes the overlay.
2. CSS `:indeterminate` also matches radios in an empty native group. Mixed card paint is now restricted to `input[type="checkbox"]:indeterminate`. Empty RadioGroups remain visually unselected, including in forced colors; the browser suite checks both positive and negative shell states.
3. The WithPreview recommendation originally sat at the far right. The live Figma title line `2346:1769` confirms it follows the title at gap8. Only this recipe's title stops growing to fill the line. The regression compares the badge with the actual text range, while long titles still wrap. Comparison recommendations remain at the trailing edge.

The independent review passed after all three fixes and final evidence were rechecked on 2026-09-10. The user's separate card visual decision was accepted as recorded below; no SC-03 authorization or publication is inferred.

## Runtime visual acceptance — 2026-09-10

The user explicitly confirmed “完成视觉验收。” after reviewing the delivered SC-02 cards. This accepts only the runtime visual scope of CheckboxCard, RadioCard, RadioPreviewCard, CheckboxObjectCard, RadioComparisonCard and RadioCardWithPreview (`selection-cards-sc02-runtime-visual-only`).

The phase record, six manifests and local source Registry record this visual decision. Existing implementation, automated checks and independent review retain their separate completed results. The current Dark Focus measurement remains 2.361:1 against a 3:1 threshold; visual acceptance does not grant a contrast exception or establish a WCAG pass. All six entries remain unpublished registry candidates.

This acceptance update changes governance and documentation only. Component source, styles, Tokens and captured visual evidence are retained. SC-03 implementation, publication, Figma changes, business migration and Git actions are not authorized by this visual decision.

Acceptance-record verification: 14 focused governance tests passed, and `pnpm verify:governance` passed. All 21 checked runtime/source/evidence hashes and all phase records outside SC-02 are unchanged. The visual renderer was not modified or recaptured for this record-only update.
