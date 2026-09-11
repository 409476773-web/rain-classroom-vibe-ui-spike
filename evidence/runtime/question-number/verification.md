# QuestionNumber 32 — implementation evidence

Date: 2026-09-08. Scope: local, unpublished registry candidate. Human Gate: **current agreed component scope accepted**. The six public sizes are accepted separately; the 93 declared contrast findings are now user-accepted exceptions. Top-right feedback is deferred by the user.

## Source and retained design

[Figma reference](https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e?node-id=2761-19654), read directly before implementation. The user accepted the token-mapped 32 px reference and authorized construction with “继续”. This source-preview decision does not accept the completed component or any contrast exception.

Body 32 × 32, square radius 6 or circular child shape, 1 px weak family border. Bottom marker is 12 × 12 at body offset (10, 26); its 6 px protrusion sits within a 44 × 44 native button target. Solid marker glyph is IconSize/8; grading rings use IconSize/12 and preserve the source path thickness. Label is UI 15/22, weight 600; current weight 700 uses the existing bold token and implements the user's explicit selected-weight increase.

Current location is host-controlled and independent of feedback. Current is solid brand fill, on-color text and no border; keyboard focus is shown only when appropriate. None is distinct from unanswered. Native disabled suppresses activation. Parent and child question identities can carry contextual names.

Existing close-bold, check-bold and warning-bold are used through the Icon renderer. New grading-pending/reviewed sources and derivations are recorded in [source additions](../../icons/source-additions.json). Neither ring is a published Figma Component; no Component Key was invented. The original 897 identities and sources remain unchanged.

## Runtime evidence

- [Light](light.png), [Dark](dark.png), [390 px viewport](compact.png), captured by the real component's Playwright tests.
- `packages/ui/src/question-number/question-number.test.tsx`: 5 behavior/semantics tests passed.
- `tests/e2e/question-number.spec.ts`: 6 Chromium tests passed, including real geometry, weak border tokens, label weights, current/result independence, native hover/disabled behavior, keyboard operation, child marker visibility and forced colors.
- Initial implementation `pnpm verify` completed with exit code 0: 44 test files / 906 tests, 61 Chromium tests, type checking, production build, workspace/evidence/boundary/B2/token-source checks and 899 icon identities. The Token report separately retains 93 pending contrast combinations; the successful process exit is **not** a contrast pass. Full execution log: `/tmp/question-number-final-verify.log`.
- Geometry/state specification review found no implementation mismatch. A separate source review confirmed the two additions match the captured SVG geometry and original sources byte-for-byte.
- Review found a stale all-icons-accepted claim in the library page. It was corrected to distinguish the original 897 accepted assets from the two additions awaiting review; the updated icon page unit and browser checks passed.
- Independent code-quality review retains one P2 finding: the text and glyph contrast conflicts below. No other implementation defect was found. The component phase deliberately remains `in-progress` and independent review `findings`; the 32 px visual Human Gate is now separately `accepted`. Automated verification is recorded separately as `passed`; pending findings prevent an accidental completed/passed review claim.

## Recorded contrast measurements — accepted exceptions as of 2026-09-08

The accepted reference uses some colors whose small-text contrast is below the normal 4.5:1 benchmark. Meaningful glyphs are checked against 3:1. These are the [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) criteria. Source fidelity and correct token consumption do **not** imply WCAG conformity. The unrelated Button contrast exception does not apply.

Measured from Chromium computed foreground and composited ancestor backgrounds at `#question-number`, normal enabled state. Displayed ratios below are rounded for reporting; no threshold decision is rounded. Light parent is Background/Neutral/1; dark uses the corresponding existing theme values.

| Body state | Light text | Dark text |
| --- | ---: | ---: |
| Current | 5.125 | 4.536 |
| Answered / Pending / Reviewed | 4.558 | 4.228 |
| Correct | 2.423 | 3.397 |
| Wrong | 3.173 | 3.219 |
| Unanswered | 2.400 | 3.488 |

| Bottom glyph | Light | Dark |
| --- | ---: | ---: |
| Correct | 2.683 | 6.318 |
| Wrong | 3.601 | 6.363 |
| Unanswered | 2.510 | 2.731 |
| Pending / Reviewed | 5.125 | 4.607 |

The user has accepted the existing 93 declared contrast combinations. Their actual colors, measurements and 4.5:1 text / 3:1 meaningful-icon thresholds are unchanged; accepted exceptions do not establish WCAG conformity. New colors, contexts or measurements cannot inherit this acceptance.

## Current accepted scope

The first 32 px visual and later six-size public implementation are accepted. The user has now accepted the component including the previously disclosed contrast findings. Top-right feedback is explicitly deferred and excluded from the current completion criteria. OptionButton retains its own records. Progress and appeals are local host compositions, not new business fields in the public button. No dependency installation, Git action, publication or Figma edit was performed.

## Business-example removal — 2026-09-08

The user clarified that progress often sits visually inside the question button and business compositions vary. Removed the teacher progress/appeal section, its private implementation/styles and its four color-consumer declarations. Updated the page, manifest and plan so no fixed placement is prescribed. Static information may be visually integrated inside the button; the native prohibition on nesting interactive controls remains an accessibility rule, not a visual-placement rule.

Verification after removal: 11 targeted page/color-consumer tests and 6 QuestionNumber Chromium tests passed; governance checks and production build passed. The three screenshots above were regenerated from the updated page. Independent read-only review checked the remaining placement language. Existing contrast findings and Human Gate status are unchanged.

## 32 px visual acceptance — 2026-09-08

User statement: “首版32px的题号按钮，已可以视觉验收”. Decision source: explicit user confirmation. Scope: `question-number-32-visual-only`, including square/circular bodies and their bottom feedback at this size. The phase, manifest, local registry and page label now record this visual acceptance.

The 93 pending contrast combinations remain findings, with no accepted contrast exception. Independent review and implementation remain open. Other sizes, top-right markers, OptionButton, the two new icons' use outside this component and publication are not accepted by this decision.

Verification after recording acceptance: 4 targeted QuestionNumber governance tests, 4 page tests and 6 Chromium tests passed; `pnpm verify:governance` passed with the same 93 pending contrast combinations. The three screenshots were refreshed with the scoped accepted label. No component styling or interaction changed.


## Component and contrast acceptance · 2026-09-08

After the outstanding items were summarized, the user stated “题号按钮：完成验收。题号右上角反馈方案暂时先不建设了。” The current component is now recorded as implementation completed / automated passed / independent review passed; the sole remaining review finding is resolved through this explicit acceptance of the retained contrast exceptions. Earlier paragraphs describing pending review document the implementation-stage checkpoint.

`contrastAcceptance` is limited to `question-number-declared-contrast-combinations-only`: 93 combinations, fingerprint `df163ed1e0011b628f0549421c27575929209f3cd5012994b9d6f69e2044ade8`. The validator requires the exact existing recipe, role, theme, parent, reported ratio and threshold set, and returns them as `acceptedComponentContrastExceptions`. Original two-decimal reported values remain, with `unroundedActual` also exposed; values rounding to 4.50 still use the unrounded comparison. No global threshold or role eligibility was relaxed. No component paint, behavior, icon or Token value changed. Publication, Figma, business migration and Git remain separate and unperformed.
