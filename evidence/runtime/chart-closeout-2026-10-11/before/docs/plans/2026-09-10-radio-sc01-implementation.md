# Radio / RadioGroup SC-01 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Deliver standard Radio and the complete RadioGroup recipe, with native single selection, all desktop interaction states and a reviewable Playground page.

**Architecture:** Native radio inputs own mutually exclusive selection, keyboard navigation and form participation. Radio is a controlled item; RadioGroup is the default complete recipe and owns either controlled or default single-value state. Reuse the existing Checkbox reset hook through one private utility; do not create a shared selection engine.

**Tech Stack:** Existing React, TypeScript, Tailwind B2 and Rain Foundations; Vitest and Playwright. No new dependency.

## Scope and authorization

2026-09-10 user: “开始建设标准单选框 `Radio + RadioGroup`”. System Mode, standard items with optional non-interactive descriptions and complete fieldset/legend group. This is the next SC-01 slice after accepted Checkbox / CheckboxGroup. Its implementation, automated checks, independent review and visual Human Gate are separate. Existing Checkbox visual acceptance remains intact; its reset hook may move without behavior changes.

No cards, rich/interactive children, preview, check-all, conditional fields, public shared field engine, new global Token values, dependencies, Figma writes, business migration, publication or Git work. The checkout has no initial commit, so use the current checkout and dated source/evidence rather than inventing a worktree base.

## Sources and approach

- [SC-00 preflight](../audits/2026-09-09-selection-sc00-preflight.md) and [family handoff review](../../../outputs/checkbox-radio-context-review-2026-09-09.md).
- Rain Classic `src/components/Radio/Radio.vue`, `RadioGroup.vue`, `radio.contract.js`, `radio.scss` were read directly. Retain separate public identities, native input/label, same-name grouping, no automatic first selection and repeated activation retaining the selection. Old mixed-type values and rich content are not copied into this string-ID standard slice.
- [Original Figma controls](https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e?node-id=1-7814): live design context, screenshot and read-only node inspection on 2026-09-10. Radio variants 1:7815, 1:7823, 1:7829, 1:7873, 1:7877, 1:7881 establish selected/unselected × normal/hover/disabled. The radio hover halo is 23px circular, not the Checkbox's 21px rounded rectangle.
- [shadcn/ui](https://ui.shadcn.com/docs/components/base/radio-group) supplies item/group composition, field naming, description and disabled/invalid examples; its headless implementation does not require us to add a dependency.
- [Ant Design](https://ant.design/components/radio/) supplies complete Radio/Group state, options, name and controlled/default-value comparison. Its default colors and dimensions are not adopted.
- [Material UI](https://mui.com/material-ui/react-radio-button/) supplies the Radio/RadioGroup split, row layout, labels and controlled/default examples. Its default-selection recommendation does not override Rain's explicit empty state.
- [HTML radio semantics](https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio)) govern native grouping and reset. Existing OptionButton/CheckableTag native patterns are references, not alternative branded Radio implementations.

Native input is the smallest suitable approach. Adapting the answer-option component would mix separate purposes; importing a headless Radio adds a dependency without a missing behavior in this slice.

## API and behavior

| Asset | Contract |
| --- | --- |
| Radio | Controlled `checked: boolean`, `onCheckedChange(boolean)`; required non-empty string `name` and `value`; optional string label/description, native accessible naming, input attributes and ref. This item only reports becoming checked. Hosts coordinate independent items; the complete RadioGroup provides default state. |
| RadioGroup | `options: readonly RadioOption[]`, non-empty legend, vertical or horizontal wrapping, help/message/invalid, required, disabled/aria-disabled, name/form and fieldset ref. `value: string|null` + callback or `defaultValue?: string|null` + optional callback; never both. |
| Value identity | Unique non-empty string option IDs, no coercion from number/boolean. Null means no selection. A temporarily absent selected ID is retained in group state with no checked input or submitted value; it does not auto-select another option. |
| Grouping | Explicit name is shared by native inputs; omitted name generates a stable unique native name so separate groups remain independent. In a form, supply the intended field name; a generated name is also a real native submission name. Equal explicit names within one form intentionally share native radio semantics and must not be used for separate groups. |
| Changes | Once per actual user selection; no callback on repeated selection, prop update, canceled activation or default reset. Clicking the description activates the same input. Disabled inputs and disabled fieldsets cannot activate. |
| Keyboard | Browser-native Tab, Space and arrow-key selection, skipping disabled inputs; no blanket key handler. Native same-form/name ownership stays authoritative. |
| Defaults/reset | Extract the existing `useDefaultReset` unchanged into `packages/ui/src/utils/use-default-reset.ts` and consume it from Checkbox and RadioGroup. Latest declared defaults are applied on reset, not on prop changes. Honor cancellation and external/replaced form ownership. Controlled reset remains the owner's responsibility. |
| Required | RadioGroup marks native same-name radios required and exposes group-level required/invalid/help semantics. Host owns validation timing and error text; native validity is checked in a real form. Disabled selected values can be replaced by selecting an enabled alternative; lock the whole group to lock the choice. |
| Composition | A label contains only its native input and non-interactive text/control; no readonly, indeterminate, cards, nested buttons, arbitrary rich children or business requests. Public Radio and RadioGroup identities remain separate. |

## Token and state matrix

| Part/state | Existing Token mapping | Source adaptation |
| --- | --- | --- |
| Canvas/control/mark | Space/24, Space/18, Space/6; Radius/full; Line/Thickness/1 | Original circle 17.6px and normal mark 6.705px; nearest existing dimensions 18 and 6. Original disabled mark is 8px; keep one stable mark size. Circular control and dot are native control geometry, not icons. |
| Halo | 23px within 24px; inset `Space/2 / 4`, Radius/full | Match original halo dimensions, no global size Token. |
| Text/layout | UI 15/24/600 title, 13/22/400 description; Space/8 control-content, Space/4 description, Space/12 group gap | Use the accepted Checkbox hierarchy and established Token weights. |
| Unchecked normal | Background/Neutral/1, local Border/Neutral/1 Alpha/65 | Same established essential-boundary recipe as Checkbox, with independent Radio scope. |
| Unchecked hover/pressed | Transparent control over halo; local Border/Neutral/1 Alpha/85 | Halo is Fill/Neutral/Alpha/3 on hover and Alpha/2 when pressed. Check actual composited surfaces 1–3 in both themes. |
| Checked normal/hover | Fill/Brand/Solid/2, decorative Border/Brand/1, OnColor/1 mark | Hover retains the source's selected fill; adds the circular Alpha/3 halo. |
| Checked pressed | Fill/Brand/Solid/1, OnColor/1 mark, Alpha/2 halo | Existing stronger press Token. |
| Disabled | Fill/Neutral/Solid/2, Border/Neutral/2, Icon/Neutral/4 mark, Text/Neutral/4 label | Use the current themed disabled recipe instead of copying old whole-control opacity. Description keeps Text/Neutral/3. No hover/pressed response. |
| Focus/system colors | Existing control outline and halo; forced colors Canvas/ButtonText/Highlight/HighlightText/GrayText and 2px CanvasText outline | Preserve shared Focus. Actual Dark contrast is reported, not waived. Hover requires hover capability and excludes forced colors. |

No animation or JavaScript hover/press state. Native held-touch feedback has the same known platform limitation documented in the Checkbox refinement; verify tap and non-sticky hover without claiming held-touch feedback.

## Implementation and verification

1. Add this plan and exact `radioSc01` phase/file authorization in `scripts/verification-helpers.mjs`; cover unauthorized scope/lifecycle/contrast escalation in `scripts/radio-governance.test.ts`. Update existing workspace boundary and B2 gates only for these exact files and source entries.
2. Write `packages/ui/src/radio/radio.test.tsx` first, importing public UI exports. Confirm the missing component assertion fails. Cover single selection/repeated activation, owner updates, default/reset cancellation/external forms, required/disabled/empty and invalid IDs; re-run Checkbox tests after the reset-hook extraction.
3. Implement `packages/ui/src/radio/radio.tsx`, shared private reset utility and public exports. Add Radio paint/Focus/system-color rules to `packages/ui/src/styles.css`, exact CSS exception registration in `manifests/contracts/tailwind-b2.yaml` and color consumers in `scripts/token-foundation-outputs.mjs`. Generate Token artifacts; never edit generated output by hand.
4. Add `manifests/ui/radio.yaml`, `radio-group.yaml`, `registry/radio.json`; include the reset utility in both Radio and Checkbox registry source sets. Add `apps/playground/src/docs/components/radio-page.tsx` and CSS, the `#radio` route in `App.tsx`, navigation in `core-ui-page.tsx`, and the explicit Tailwind source in `styles.css`.
5. Add `tests/e2e/radio.spec.ts`: native keyboard/group isolation, label clicks, reset/FormData/validation, Light/Dark unchecked/checked hover/pressed, disabled fieldsets, density, 320px wrapping, forced colors and touch tap. Record screenshots and computed facts under `evidence/runtime/radio/`; preserve existing Checkbox evidence.
6. Run focused tests, required governance/Token/icon integrity, typecheck and build. Run Radio E2E plus Checkbox regression after shared-hook extraction. Complete independent code review and resolve findings. Record precise results in `evidence/runtime/radio/verification.md`, update this slice to completed/passed/passed and leave its visual Human Gate awaiting_human.

Commands run from this repository: `pnpm exec vitest run packages/ui/src/radio/radio.test.tsx packages/ui/src/checkbox/checkbox.test.tsx scripts/radio-governance.test.ts`; `pnpm verify:governance`; `pnpm verify:icons`; `pnpm typecheck`; `pnpm build`; `pnpm exec playwright test tests/e2e/radio.spec.ts tests/e2e/checkbox.spec.ts` (use an isolated temporary port if the review preview is running).

Unverified assumptions before runtime: native canceled-radio activation and arrow-key behavior in the supported browser; selected/reset consistency when associated forms are replaced; actual 23px circular highlight and all meaningful contrast cues. These become browser checks, not assumed passes.

## Delivered checkpoint — 2026-09-10

Implementation, automated verification and independent review are complete for this standard Radio slice. The user accepted the standard Radio / RadioGroup runtime visual scope on 2026-09-10 (“确定。推进下一步”); contrast acceptance remains not-granted. See [verification evidence](../../evidence/runtime/radio/verification.md) for exact test snapshots, browser captures, retained limits and the next user checkpoint.
