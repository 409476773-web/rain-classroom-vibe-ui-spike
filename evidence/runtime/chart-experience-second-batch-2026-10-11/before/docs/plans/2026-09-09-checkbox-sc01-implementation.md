# Checkbox SC-01 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Deliver Checkbox and the complete CheckboxGroup recipe with standard descriptions and native form evidence.

**Architecture:** Native checkbox inputs own keyboard interaction and serialization; React owns controlled or default state. CheckboxGroup uses fieldset and legend, keeps stable string IDs including values outside the rendered options, and leaves business validation to its host. Reuse existing Rain Tokens, density, local recipes and library icons.

**Tech Stack:** React 19, TypeScript, Tailwind B2, Rain Foundations, Vitest and Playwright; no new dependency.

**Current checkpoint:** The first SC-01 Checkbox / CheckboxGroup slice is implemented and verified. On 2026-09-09 the user replied “确定” to its visual review, including the 600 title weight and current Dark focus appearance. The runtime visual Human Gate is accepted; the measured Dark focus contrast remains below 3:1 and no contrast exception is granted. See the [acceptance record](../../evidence/runtime/checkbox/verification.md). Later Radio/card slices retain their separate scope.

## Scope and authorization

- User: “选中卡片描边，使用当前token中的主题色系border。所有icon都要使用现有icon库的icon。继续推进下一步”.
- This checkpoint is SC-01's Checkbox / CheckboxGroup slice, standard descriptions and form integration. Radio, cards, previews, conditional panels and check-all patterns remain later slices.
- Future selected cards use current-theme Border/Brand/1. Its measured dark contrast remains an unresolved review item; this instruction does not grant a contrast exception.
- System Mode; current checkout has no initial commit. No Git, publication, migration or Figma edits are part of this work.
- Source audit: [SC-00 preflight](../audits/2026-09-09-selection-sc00-preflight.md), [measured evidence](../../evidence/selection/sc00-preflight.json).

## API and source comparison

| Source | Retained decision |
| --- | --- |
| Rain Classic Checkbox / CheckboxGroup | Native input and label, separate public identities, checked boolean, indeterminate visual state, stable group values. |
| [shadcn Checkbox](https://ui.shadcn.com/docs/components/base/checkbox) | Controlled/default state and explicit labeling; no imported visual defaults. |
| [Ant Design Checkbox](https://ant.design/components/checkbox/) | Complete options/group recipe with value, defaultValue, name and one change callback. |
| [MUI Checkbox](https://mui.com/material-ui/react-checkbox/) | Native semantics; indeterminate does not add a third serialized value. |

Checkbox accepts checked or defaultChecked, onCheckedChange, label, description, indeterminate, native name/value/form/required/disabled, aria attributes and an input ref. Controlled state requires its callback. CheckboxGroup accepts options, legend, value or defaultValue, onValueChange, name/form, orientation, help/message, invalid and required. Required is a group hint; the host validates at least one selection. No readonly, unrestricted ReactNode children or embedded independent actions.

## Visual mapping

| Part | Existing Token / asset | Review |
| --- | --- | --- |
| Canvas / control / corner / line | Space 24 / 16; Radius 4; Line 1 | Source 1.4px line becomes existing 1px. |
| Title | UI 15 / 24 / 600; Text/Neutral/3 | 500 is unavailable; 600 is visually accepted for this SC-01 slice. |
| Description | UI 13 / 22 / 400; Text/Neutral/3 | Source description color differs; record explicitly. |
| Unchecked essential boundary | Border/Neutral/1 with palette Alpha/65, scoped local recipe | Replaces alpha only; source RGB and themes remain authoritative. Visually accepted locally; actual-surface measurements remain in the evidence. |
| Checked / mixed | Fill/Brand/Solid/2, Border/Brand/1, OnColor/1 | Fill and mark are the state cue; border is decorative. |
| Disabled | Fill/Neutral/Solid/2, Border/Neutral/2, Icon/Neutral/4, Text/Neutral/4 | Keep the important description readable. |
| Check / mixed glyph | icon/check-bold / icon/minus-bold, 10px | Existing library assets, no drawn SVG or text substitutes. |
| Focus | Shared control outline and halo | Verify native keyboard Focus in both themes and forced colors. |

## Task 1: State and semantics

Create packages/ui/src/checkbox/checkbox.test.tsx before packages/ui/src/checkbox/checkbox.tsx; add exports in packages/ui/src/index.ts.

1. Write failing checks for native labels, callbacks, mixed state, FormData, default reset/cancellation, locked/outside group values, controlled owner behavior, invalid input and group ARIA.
2. Run `pnpm exec vitest run packages/ui/src/checkbox/checkbox.test.tsx`; confirm the missing exported component assertion fails.
3. Implement one component module. A shared private reset hook is justified by its two callers; it synchronizes native defaultChecked and default state without firing selection callbacks.
4. Re-run the focused checks until green.

## Task 2: Tokens and local registration

Add the scoped Checkbox rules to the existing packages/ui/src/styles.css. Register exact color use in scripts/token-foundation-outputs.mjs; extend the existing verifier only for the scoped alpha source link if needed, with a rejection check. Register CSS exceptions in manifests/contracts/tailwind-b2.yaml. Generate existing Token artifacts with `pnpm generate:tokens`.

Create manifests/ui/checkbox.yaml, manifests/ui/checkbox-group.yaml and registry/checkbox.json. Record the native choice in docs/adr/0006-native-checkbox.md. Preserve existing components, palette values and thresholds.

## Task 3: Review surface and verification

Create apps/playground/src/docs/components/checkbox-page.tsx and checkbox-page.css, plus tests/e2e/checkbox.spec.ts; wire #checkbox in App.tsx and the Core UI navigation. Show controlled selection, mixed state, default reset, locked items and host validation using complete recipes.

Run focused unit and browser tests, typecheck and required workspace guards. Inspect real screenshots at desktop and 320px widths, light/dark, forced colors and reduced motion. Complete independent review, resolve findings and record evidence in evidence/runtime/checkbox/verification.md. Update only this child checkpoint in status/current-phase.yaml. The implementation initially exits at awaiting_human; the dated human decision above records its subsequent visual acceptance.


## Interaction refinement — 2026-09-09

User request: “现在的这些选择框，它们没有 hover 上的样式。我们应该补全各种交互状态的样式。比如说 normal、hover、选中，以及选中以后的 hover......。” The follow-up supplies [this Figma state set](https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e?node-id=1-7814) and explicitly asks for stronger hover because a darker border alone is not visible enough.

System Mode, limited to Checkbox / CheckboxGroup interaction paint and its existing verification/registration. The earlier SC-01 normal geometry, fonts, icons and native behavior remain the accepted baseline. This refinement has its own visual Human Gate.

2026-09-10 checkpoint: implementation completed; automated verification and independent review passed. The user replied “确认” to the final interaction preview, accepting this refinement's runtime visual scope. The [verification record](../../evidence/runtime/checkbox/verification.md#interaction-refinement--2026-09-10) records the final 21px highlight, checks and limitations. Contrast acceptance remains not-granted.

Figma was read with get_design_context, get_screenshot and a read-only Plugin API inspection. The normal/hover/disabled variants of checkbox and mixed states are saved in [source facts](../../evidence/runtime/checkbox/interactions/figma-reference.json) and [source image](../../evidence/runtime/checkbox/interactions/figma-reference.png). Unchecked hover 1:7870, checked hover 1:7861 and mixed hover 1:7855 all contain a 21×21px, radius-4 background at (1.5, 1.5) inside the 24px canvas, using approximately #4A66D1 at 20%. This source color maps to current Fill/Neutral/Alpha/2. The user subsequently supplied a runtime crop and asked for the original area/radius and a lighter background; hover now uses existing Fill/Neutral/Alpha/3 (16% light / 20% dark), with Alpha/2 reserved for pressed feedback. Selected fill remains #1561F8 on hover in the source.

| Selection | Normal | Hover | Pressed (pointer or Space) |
| --- | --- | --- | --- |
| Unchecked | Background/Neutral/1 + local Border/Neutral/1 Alpha/65 | Highlight Fill/Neutral/Alpha/3; transparent control + local Border/Neutral/1 Alpha/85 | Highlight Fill/Neutral/Alpha/2; same transparent control and Alpha/85 boundary |
| Checked | Fill/Brand/Solid/2 + OnColor/1 | Same control and mark + highlight Fill/Neutral/Alpha/3 | Strong Fill/Brand/Solid/1 + OnColor/1 + highlight Fill/Neutral/Alpha/2 |
| Mixed | Same selected paint, existing minus mark | Same selected hover paint | Same selected pressed paint |
| Disabled, any selection | Existing disabled recipe | No response | No response |

The final highlight matches Figma's 21×21px area and Radius/4: an independent background layer sits 1.5px inside the unchanged 24px canvas. Its inset is calculated from existing Space/6 divided by 4; no global Token is added. A separate layer keeps the 16px control and its normal geometry unchanged. The Figma border uses old Cell/P2; Rain retains its stronger themed local Border/Neutral/1 Alpha/85 for the essential unchecked edge. The raw current dark Border/Brand/1 would weaken that edge below 3:1. These are recorded adaptations, not pixel-parity claims. All other normal geometry stays unchanged.

Focus composes with these states using the existing outline and halo. Hover requires hover capability; touch retains native tap selection without sticky hover. Forced colors retain the system palette and focus outline. No motion, JavaScript hover state, API or dependency is added. Border contrast checks include the actual hover/pressed canvas layer composited on Background/Neutral/1–3; selected glyphs are checked against their opaque fills.

Verification: reproduce the missing hover and then the missing background highlight in the real browser; check unchecked/checked/mixed × normal/hover/pressed in both themes, pointer leave, description hit area, disabled/disabled-fieldset behavior, Space/focus, touch tap, forced colors and unchanged geometry. Keep old SC-01 evidence intact; current interaction captures use their own directory. Run affected checks, required workspace guards and independent review before presenting the new states.

Touch observation: Chromium mobile emulation delivered a touch at the correct control with a focused visible document, but no native :active element appeared during a held touch. Setting touch-action: manipulation did not change that result. This desktop-state slice keeps native semantics and does not add a JavaScript press state; held-touch visual feedback is not claimed as verified.
