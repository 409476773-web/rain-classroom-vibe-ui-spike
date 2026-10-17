# Selection cards SC-02 implementation plan

> **For Codex:** Use executing-plans to implement the authorized SC-02 slice.

**Goal:** Deliver CheckboxCard / RadioCard and the four V0.3 card compositions, preserving the accepted native controls.

**Architecture:** Two branded card entries reuse the existing Checkbox and Radio implementations. Each native implementation gains a private content-rendering seam; the existing public standard controls retain their API. CheckboxGroup / RadioGroup gain an optional `renderOption(props)` composition slot, passing the native controlled and accessibility props used by the default renderer. The standard-item localRecipe stays with the standard renderer; the card supplies its own named-part recipe. Four stateless, copyable recipes arrange the card parts; they never own selection.

**Tech stack:** Existing React, TypeScript, native inputs, Rain Tokens and constrained Tailwind. No dependencies added.

## Authorization and boundaries

System Mode. The user confirmed “确定。推进下一步” on 2026-09-10 after Radio delivery. Record the exact Radio runtime visual acceptance separately, then execute SC-02 from the supplied `rain-selection-handoff-v0.1 (1).zip` plan. Current phase and frozen history remain unchanged. New cards remain registry candidates and unpublished, with their own pending Human Gate and no contrast acceptance.

Read sources: live AGENTS / SPIKE_BRIEF / phase and Evidence / Benchmark indexes; SC-00 preflight; original handoff 01–04 / 06; live Figma `olqwu95QD6n4Y3IAwUdgF4` board `2346:1938` and four sets `2346:1683`, `2346:1702`, `2346:1723`, `2346:1762`. SC-01 native controls and their original source references already settle behavior. Card surface/layout only are new. The old generic Card provides a static article surface but no native selection or independent label/action anatomy, so it is not the selection entry.

SC-03 owns preview presentation, conditional fields and finite page selection. SC-02 exposes an independent preview button callback and demonstrates it through a local status message; no preview dialog, business state engine, global Token change, Figma write, migration, publication or Git action.

## Contract

- `CheckboxCard` keeps Checkbox controlled/default/mixed semantics; `RadioCard` keeps controlled Radio semantics. Both require a visible non-empty string label and forward native input attributes and ref.
- Cards expose non-interactive phrasing slots: `leadingVisual`, `trailingVisual`, `labelEnd`, `children`; `actions` is a sibling of the native selection label. It can contain real non-submit buttons. No whole-shell click handler, new key handler, nested button, or duplicated input/state.
- `localRecipe` changes declared card parts: root, selection, content, summary, label, description, supplementary, actions. Complete recipes remain the default. There is no public mode, fixed height, reference-width enum, or new Layout primitive.
- `renderOption` receives the existing group-owned item props. The slot excludes the standard-item localRecipe. The host spreads the selection / native / accessibility props into a card and adds content; it must not replace checked/name/form/callback ownership. Defaults and reset remain in the group.
- Root tracking identities are `ui-checkbox-card` / `ui-radio-card`; inner native identities remain. Recipe identities and stable slots are explicit. Accessible names use only the label; description links remain concise; artwork/identity visuals are decorative.

## Four recipes and Token mapping

| Recipe | Composition and retained geometry |
| --- | --- |
| RadioPreviewCard | Summary gap 6; 12 to original artwork, 12 to metadata; artwork 7:3; bottom padding 18. |
| CheckboxObjectCard | Title/status, description, supporting value at gap 4; trailing 40px identity visual, outer gap 8. |
| RadioComparisonCard | Summary gap 6; description minimum two 22px lines; 16 to attributes, rows gap 10; keys/values retain ordered meaning. |
| RadioCardWithPreview | Leading 40px visual inside content rail, text 12px after it; recommendation follows title with an 8px gap; supporting value gap 4; separate action rail 12 below selection content. |

All cards: radius 8, no shadow; control canvas 24, Checkbox 16 / Radio 18 as accepted; control x/y 16, outer content x48. A 1px inside stroke is accounted for in shell padding so it does not shift the approved content. Reference widths 296/612 and 320px stress examples are review containers, never component widths or global breakpoints. Height follows content.

| Role | Established Tokens / decision |
| --- | --- |
| Surface | Background/Neutral/1; selected Fill/Brand/Alpha/4 over it. |
| Border | Border/Neutral/3; selected Border/Brand/1 in the current theme, explicitly chosen by the user. Both decorative; existing dot/check retains meaningful selection. |
| Label / secondary / details | Text/Neutral/3 title; Text/Neutral/3 secondary; Text/Neutral/1 attribute values. PingFang SC, title 15/24/600, description/value 13/22/400; secondary 12/22 and keys/status 11/22. Noto Sans SC 500 is not inherited. |
| Identity / recommendation | Fill/Brand/Alpha/4 and Text/Brand/1; identity letters are source content, not substitute icons. Reuse Tag with a scoped 11/22 recommendation recipe and the existing 28px mini Button for preview. Any actual icon uses the existing library. |
| Interactions | Accepted control hover, pressed, disabled, mixed and shared Focus remain. Shell selected paint derives from checked inputs or indeterminate Checkboxes, including resets; an empty Radio group remains visually unselected. No new hover/press state engine. Forced colors retain an explicit system border and native control cues. |

The initial candidate Text/Brand/2 on the selected card reached only 4.228:1 in Dark; adding Alpha/3 identity/recommendation fill reduced it further. Use existing Text/Brand/1 and Alpha/4 for the accent/identity and existing Tag colors; the fully composited runtime is checked before completion. No source color matches for selected fill / border are silently copied. Actual Light/Dark text and selected cue contrast is measured; 4.5:1 text and 3:1 meaningful cues remain. Existing Dark Focus limitation is carried forward, not waived.

## Implementation and checks

1. Preserve accepted source/evidence snapshots. Add exact Radio visual acceptance and run its focused governance test and complete governance command.
2. Write failing tests in `packages/ui/src/selection-card/selection-card.test.tsx` for group composition ownership/reset/FormData, repeat Radio activation, distinct accessible names, independent actions/disabled selection, uncontrolled Checkbox and refs. Run the focused test to confirm missing entry failure.
3. Add `packages/ui/src/selection-card/selection-card.tsx`, private rendering seams in native files, group renderOption slots, and public exports. Add stateless compositions in `packages/ui/src/recipes/selection-card-recipes.tsx`; use original exported PNG artwork through props. Add only scoped layout/paint CSS and exact authorized declarations.
4. Add a dedicated `selection-cards-page.tsx` / CSS and `#selection-cards` review route with all four recipes, long/narrow text, form/reset, disabled/mixed and theme/density controls. Copy source artwork into `apps/playground/src/docs/components/assets/selection-cards/`.
5. Register two UI manifests, four recipe manifests, local source Registry and exact phase/file/color governance. Preserve existing tests and frozen phase state, adjusting only source inventories affected by this addition.
6. Run focused native/card/governance tests, governance, icon integrity, typecheck and build. Browser tests cover actual pointer/keyboard/form behavior, visual geometry at reference and 320px widths, Light/Dark, disabled/mixed, forced colors and touch. Store runtime screenshots/facts and contrast results under `evidence/runtime/selection-cards/`, keeping existing evidence intact.
7. Complete independent review, resolve findings, verify closure, then deliver the live review page. Record implementation / automatic / independent review separately from pending card visual Human Gate.

Commands run from the repository: `pnpm exec vitest run packages/ui/src/selection-card/selection-card.test.tsx packages/ui/src/checkbox/checkbox.test.tsx packages/ui/src/radio/radio.test.tsx scripts/selection-cards-governance.test.ts`; `pnpm verify:governance`; `pnpm verify:icons`; `pnpm typecheck`; `pnpm build`; isolated-port Playwright for `tests/e2e/selection-cards.spec.ts` plus existing Checkbox / Radio regression with captures directed to temporary folders.

Unverified before runtime: exact text reflow after font mapping, original artwork rounding, action/selection hit boundaries, group composition reset association, actual theme contrast and 320px overflow. These require evidence and cannot be inferred from the source board.

## Delivery checkpoint — 2026-09-10

SC-02 implementation, focused automated checks and independent review are complete. Two card entries and four recipes remain unpublished registry candidates with an accepted SC-02 runtime visual Gate and no contrast exception. The preceding Radio runtime visual acceptance has been recorded exactly; the Checkbox checkpoint and frozen phase history are unchanged.

The current result, measurements, resolved review findings and the full-unit timeout plus isolated recheck are recorded in [runtime verification](../../evidence/runtime/selection-cards/verification.md). The live review route is `/#selection-cards`. The user completed the card visual review with “完成视觉验收。” on 2026-09-10. Preview presentation, conditional fields and page selection remain SC-03 work requiring separate authorization; this decision does not start that work.
