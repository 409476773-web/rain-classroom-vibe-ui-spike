# OptionButton 32 — implementation evidence

Date: 2026-09-08. Scope: local, unpublished registry candidate. Human Gate: **accepted for base 32 px selection visuals only**; see the scoped user decision below.

## Authorization and implementation

The user authorized “继续推进下一批” after the [question/option family roadmap](../../../docs/plans/2026-09-08-question-and-option-family-roadmap.md). This batch implements the [OptionButton 32 contract](../../../docs/plans/2026-09-08-option-button-implementation.md), not the later result-review, media or size batches.

`OptionGroup` and `OptionButton` share one native input/label structure per choice. Single mode is a controlled single value; multiple mode is a controlled value list. Labels provide the complete standalone or text-row click area, without a nested button. Native names isolate groups and participate in forms. No answer is preselected by the component. Repeated single activation retains its answer; multiple activation toggles that value.

The visible identifier is 32 × 32. Standalone hit target is 44 × 44. Single-choice identity is circular; multiple is Radius/6. Text rows preserve the identifier, add Space/12 padding/gap and use Radius/8. Label is UI 15/22, weight 600 unchecked and 700 checked; row text remains 400. Checked identity is solid blue, OnColor text and border-free. Checked text row has a subtle blue fill and weak Brand/3 border. Public Rain tokens provide all colors/geometry; the Focus bridge and forced colors use narrow registered CSS exceptions.

## Runtime evidence

- [Light](light.png), [Dark](dark.png), [390 px viewport](compact.png), from the real `#option-button` page and its Playwright tests.
- Component tests were written before implementation and first failed for the missing module. Six current component tests pass: whole-row selection, persistent radio, multiple add/remove, isolated generated names, disabled values, native form submission, ref/local parts and input validation.
- Seven page tests passed after their initial missing-page failures: navigation/focus, isolated groups, rows, disabled examples, themes and the user-requested standalone multiple-choice outlined example. The independent matrix now includes single/multiple × filled/outlined.
- A specification reviewer found that the generated legend association overrode an explicit contextual group `aria-label`. A new test reproduced that bug; the fix preserves explicit `aria-labelledby` / `aria-label` precedence. The six component tests now include this regression.
- Seven Chromium tests passed: actual 32/44 dimensions, round/square geometry, label weights, border-free checked controls, weak selected-row boundary, native arrow/space and Tab behavior, pointer hover/pressed, disabled activation/focus, long text at 390 px, forced colors and inherited disabled fieldsets. Real unchecked/checked/hover text is checked against composited ancestor fills, including selected rows; these tested states meet 4.5:1 in both themes. Broader color-consumer verification is recorded separately below.
- The first browser run had five passes and one test-harness timeout: Playwright correctly refused to activate a disabled label. The check now uses a physical pointer click on its measured visible target and confirms its state cannot change; all six pass.
- A quality reviewer found that native ancestor-fieldset disabling blocked input behavior but initially retained the enabled appearance. A new browser regression reproduced the wrong cursor. Peer-disabled and native `:disabled` selectors now update the control, row and cursor; the regression passes for standalone and text-row combinations.

## Final verification

- Workspace governance, existing icon integrity (899 source identities) and type checking passed during the full verification run.
- The default-concurrency `pnpm verify` run stopped at two existing test timeouts (an icon-directory lazy route and a 1-second FIFO safety subprocess). It was not recorded as a successful command. No assertion, timeout or source behavior was loosened.
- Re-ran the entire unit/integration suite with fewer concurrent workers: `pnpm test --maxWorkers=2` — **46 files / 939 tests passed**. Both timed-out checks passed unchanged. Log: `/tmp/option-button-limited-tests.log`; first-run log: `/tmp/option-button-full-verify.log`.
- `pnpm build` passed, followed by `pnpm test:e2e` — **68 Chromium tests passed**, including the final seven OptionButton tests. Logs: `/tmp/option-button-build.log`, `/tmp/option-button-e2e.log`. The three screenshots above were refreshed by the final browser run and visually inspected.
- Exact color verification covers four static recipe objects (19 state pairings) and 12 page color declarations, both themes and their declared surfaces. OptionButton has **zero pending contrast findings and zero accepted contrast exceptions**. The initial selected-hover Solid/1 candidate failed dark text contrast; the existing Button mapping Fill/Brand/Alpha/1 now supplies hover/pressed with OnColor/1. No public color values were changed.
- After synchronizing the completed implementation, independent review and pending visual Gate across phase/manifest/registry, `pnpm verify:governance` passed again. Log: `/tmp/option-button-final-governance.log`.

## Review and scope

Independent specification review passed after the contextual-name fix; code-quality review passed after inherited-disabled styling was corrected. Implementation and automated verification are complete for this batch.

On 2026-09-08, the user confirmed “视觉没问题。推进下一步”. Phase, manifest and registry now record Human Gate `accepted` for **option-button-32-selection-visual-only**. The screenshots above preserve that accepted baseline. The subsequent results/readonly/judgment/media batch has [separate verification and pending visual review](../option-button-content/verification.md); it does not inherit this acceptance.

Existing QuestionNumber 32 visual acceptance and its 93 pending contrast combinations are unchanged. No new contrast exception is authorized for OptionButton. No new icon, dependency, token value, business progress example, Figma write, migration or Git action is included.
