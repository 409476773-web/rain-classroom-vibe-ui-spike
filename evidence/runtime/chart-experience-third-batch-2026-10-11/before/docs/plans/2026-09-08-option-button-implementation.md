# OptionButton 32 Implementation Plan

**Goal:** Build the next approved question/option family batch: 32 px standalone letter options and full text rows, single and multiple selection.

**Architecture:** One native input and associated label per option. A controlled OptionGroup composes the same OptionButton, supplies an isolated native name and updates a single value or value array. No public Radio/Checkbox prerequisite, context framework or new dependency.

**Tech Stack:** Existing React, TypeScript, Rain Foundations/Tailwind, Vitest and Playwright. System Mode; current workspace; no Git actions.

## Authorization and boundaries

On 2026-09-08 the user authorized “继续推进下一批” after the [family roadmap](2026-09-08-question-and-option-family-roadmap.md). Only its next batch is opened. The accepted QuestionNumber 32 visual and its 93 pending contrast combinations remain separate and unchanged.

Included: independent A/B/C/D and entire text rows; single/multiple selection; filled/outlined unselected appearance; default/hover/pressed/checked/focus-visible/disabled; themes, native form participation, group isolation and long text wrapping. Both densities retain this size.

Deferred: answer results, readonly review, judgment icons, media cards, other sizes, corner markers, teacher progress/appeals, new dependencies, Figma writes, publication and Git. These remain in the roadmap; no correct-answer inference or preselected answer is introduced.

## Contract and anatomy

- `OptionButton`: native input attributes/ref, `type: radio | checkbox`, non-empty `value`, `label`, optional plain `text`, controlled `checked`, `onCheckedChange`, `appearance: filled | outlined` (filled default), layout-only `className`, named Local Recipe. Radio requires a group name. Input change is the only selection event; clicking an already checked radio does not clear it.
- Parts: root (label), input (native control), control (32 px visual), label (identity), content (optional text). No nested button or arbitrary interactive text child.
- `OptionGroup`: options `{value,label,text?,disabled?}[]`, visible `legend`, optional name/disabled/appearance/localRecipe, `mode: single | multiple`; single uses `string | null`, multiple uses a readonly string array; `onValueChange` supplies the corresponding value. It is controlled and has no automatic initial selection. Option identity and values must be unique and valid.
- Group is a native fieldset/legend, exposing radiogroup for single and group semantics for multiple. Missing names receive a React useId name, isolating repeated groups. Disabled groups and options block selection; checked disabled values remain checked.
- Radio is round, checkbox uses Radius/6 within this component family. Standalone target is 44 px (Space/32 plus 6 px each side). Text rows add Space/12 padding and gap, with Radius/8 outer boundary; text wraps without shrinking the identifier.
- Label uses UI 15/22, weight 600; selected label weight 700. Row text remains regular. Selected control has no persistent border; selected text row keeps a weak blue boundary and subtle blue fill. Keyboard focus remains independently visible.

## Token and state mapping

| Part/state | Existing public tokens |
| --- | --- |
| Filled unselected control | Fill/Neutral/Alpha/4, Text/Neutral/2, no border |
| Outlined unselected control | transparent Action/Ghost, Text/Neutral/2, Border/Neutral/3 |
| Unselected hover / pressed | corresponding Fill/Neutral/Alpha/3 or 2 for filled; Alpha/6 or 4 for outlined |
| Checked control | Fill/Brand/Solid/2, OnColor/1, no border; hover/pressed Fill/Brand/Alpha/1, matching the existing Button interaction mapping |
| Checked row | Fill/Brand/Alpha/4, Border/Brand/3, Text/Neutral/1 |
| Row hover / pressed | neutral Alpha/6 or 4; checked row Alpha/3; body identity remains independently selected |
| Disabled | Text/Neutral/5 and neutral fills; native disabled behavior; selected identity keeps weight and checked state |
| Keyboard / forced colors | existing Focus variables bridged to the visible label; system colors retain native selection and disability |

All color classes live in reviewed static definitions in `option-button.styles.ts`; the local page consumes only existing public tokens. Exact scopes and CSS focus/forced-color exceptions are registered. Contrast is tested as actual text, with no automatic pending-review or exception inherited from QuestionNumber. If a pairing fails, resolve within the approved family and report the decision.

The initial Solid/1 hover candidate failed the dark small-text contrast check. Use existing Fill/Brand/Alpha/1 for hover and pressed instead; the default selected fill remains unchanged. Disabled visual selectors follow the native input's actual `:disabled` state, including disabled ancestor fieldsets. The user explicitly reiterated multiple-choice outlined appearance; the independent examples therefore show the full single/multiple × filled/outlined matrix.

## Implementation steps and verification

1. Add meaningful failing tests in `packages/ui/src/option-button/option-button.test.tsx`: radio persistence and group isolation, checkbox addition/removal, full-row selection, disabled behavior, native form values, validation, local recipe/ref semantics. Implement `option-button.tsx` and `.styles.ts`; export both components and types from `packages/ui/src/index.ts`.
2. Add `apps/playground/src/docs/components/option-button-page.{tsx,css,test.tsx}` and `#option-button` routing. Show filled/outlined independent single, multiple, long text single/multiple rows, disabled and theme previews. Product examples contain no implementation details; API explanations remain in documentation.
3. Register `manifests/ui/option-button.yaml`, `registry/option-button.json`, exact authorization and scan/source/color scope through existing governance. Tests reject enlarged authorization and changes to prior accepted assets. Keep publication and Human Gate pending.
4. Add `tests/e2e/option-button.spec.ts`: actual 32/44 geometry, no border on checked controls, weak border on checked row, normal/checked font weights, real pointer and native arrow/space keyboard selection, disabled and form values, theme colors, narrow layout and forced colors. Save light/dark/compact screenshots under `evidence/runtime/option-button/`.
5. Run scoped tests, governance, type checks/build, then the normal full verification batch. Review spec and code quality independently; fix actual findings and rerun affected checks. Record evidence and present the real page for visual review, without declaring Human Gate passed.

## Read-only comparison evidence

Old Vue has no separately located letter-option contract. [RadioGroup](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Radio/RadioGroup.vue) and [CheckboxGroup](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Checkbox/CheckboxGroup.vue) establish single values versus arrays; [Radio](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Radio/Radio.vue) wraps native input and text in one label. CircularCheckbox also exists there, so the present shape mapping is not a global icon/shape law.

Primary references reviewed: [shadcn Radio Group/Choice Card](https://ui.shadcn.com/docs/components/radix/radio-group), [Ant Design Radio](https://ant.design/components/radio/), [Ant Design Checkbox](https://ant.design/components/checkbox/), [MUI Radio](https://mui.com/material-ui/react-radio-button/), [MUI Checkbox](https://mui.com/material-ui/react-checkbox/). We retain group semantics and label association, not foreign colors, library dependencies or generic form recommendations to preselect an answer.
