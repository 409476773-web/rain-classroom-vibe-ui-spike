# IconButton and Public Icon Size Implementation Plan

> Execution: continue in this authorized task, using the existing workspace and bounded parallel implementation. No Git operation is part of this plan.

**Goal:** Build the confirmed shared Icon Size scale and Rain Next IconButton, with an interactive review page and verification.

**Architecture:** Foundations is the single source for public dimensions and Tailwind utilities. IconButton uses complete size recipes, host-supplied icons and externally controlled visual/semantic state. Existing components and source icon assets keep their current behavior.

**Tech Stack:** React, TypeScript, existing Tailwind v4/CVA, Vitest, Playwright.

## Authorization and boundaries

The user explicitly said “开始实现” after confirming the complete proposal. This supersedes the earlier discussion-only boundary and the historical exclusion of a public Icon Size scale. System Mode applies. The scope includes Foundations, IconButton, local examples, contracts and verification. Tooltip, existing-component migrations, new dependencies/headless selection, Figma, publication and Git remain outside this task. The repository has no HEAD, so implementation stays in the current workspace without inventing an initial commit.

## Confirmed contract

- Public `Icon/Size/N`: 4, 6, 8, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36 px. 4/6 are micro-symbol sizes; availability does not certify every glyph at every size. Variable `--rain-icon-size-N`; square utility `size-rain-icon-N`.
- Complete IconButton sizes: 18/11; 20/12,20/14; 24/12,24/14,24/16; 28/12,28/14,28/16,28/18,28/20; 32/12,32/14,32/16,32/18,32/20,32/24; 36/20. Controls through 32 have radius 6; 36 has radius 8. Explicit size wins; compact/default resolve to 32/18 and 36/20.
- `icon` is one required current formal icon. Host chooses outline/filled assets. No automatic asset pairing, internal business state, selectedIcon, defaultSelected or defaultOpen.
- `highlight`: none / icon / surface. It only controls persistent visual emphasis, not ARIA or glyph selection. Applied filters and open panels remain separate host states.
- `tone`: default with all highlights; danger only with none. Default feedback is Fill; Emphasis is a named Local Recipe.
- Default icon: Icon/Neutral/2; hovered/pressed backgrounds: Fill/Neutral/Alpha/3 and /2. Highlight foreground: Icon/Brand/1; surface background: Fill/Brand/Alpha/4; highlighted feedback: Fill/Brand/Alpha/3. Danger: Icon/Red/1, hover Fill/Red/Alpha/2, pressed /1. Disabled foreground: Icon/Neutral/5. All are current Rain Category Tokens.
- Loading replaces the icon with the canonical Loading asset, blocks activation and retains focus. Disabled uses native disabled. Both together show disabled-colored Loading and native disabled. Both preserve the highlight's normal background; neither receives hover/pressed feedback. Focus reuses current Foundations, including forced colors.
- Accessible name is required through aria-label or aria-labelledby. type defaults to button; refs, events and semantic attributes compose with host triggers. Pointer/keyboard blocking must not suppress unrelated host events during normal operation.
- Host owns layout, visibility, event isolation and focus return. Do not nest interactive controls. Tooltip is deferred.

## Task 1: Foundations

Create `packages/foundations/src/icon-size-contract.ts` and its test. Extend `scripts/token-foundation-outputs.mjs` and existing generation/verification paths. Export the finite public table, entries and class names through the existing index. Register independent IconButton control-box dimensions; do not expose Icon Size as spacing or font size. Preserve all old Button/Input values. Run failing dimension/output checks first, implement, generate, then rerun focused checks.

## Task 2: UI contract and behavior

Create `packages/ui/src/icon-button/icon-button.tsx`, `icon-button.styles.ts`, and meaningful tests. Export through `packages/ui/src/index.ts`. Extend existing UI CSS only for canonical Loading/compatibility exceptions. Verify required names, valid size/tone combinations, external icon/state changes, density, refs/events, loading click/keyboard blocking, disabled and composed semantics. Keep native button behavior and static Rain classes.

## Task 3: Review page

Create a dedicated IconButton page in `apps/playground/src/docs/components/`, linked from Components and Foundations. Show all 18 recipes, the 15 public icon sizes, both density defaults, normal/danger/highlights, async state combinations, favorites, independent filtering/panel states and embedded examples. Use existing assets and document local asset choices; do not create new global icon defaults. Keep the page a local experiment.

## Task 4: Registration and verification

Register `manifests/ui/icon-button.yaml`, local Registry installation data, CSS exceptions and the precise authorization in `status/current-phase.yaml`. Add browser tests in `tests/e2e/icon-button.spec.ts` for computed dimensions/paint, real keyboard/pointer input, focus, loading/disabled, themes and representative embedded behavior. Run focused tests then `pnpm verify` and reuse audit. Review independently and fix findings. Implementation, automation, independent review and Human Gate remain separate; never mark human acceptance automatically.

## Evidence

The initial implementation and verification are complete. Actual results, the sandbox/server retry, independent review fixes and browser screenshots are recorded in [verification evidence](../../evidence/runtime/icon-button/verification.md). The user's visual acceptance is recorded below; publication, migration and Git remain separate.

## Confirmed semantic supplement — 2026-09-07

After the read-only audit of [Figma Frame 12, node 2244:285](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2244-285), the user confirmed “确定”, then explicitly authorized “开始修改”. This authorizes updating the existing public icon semantic source, its generated documentation/catalog metadata and the IconButton examples. All 17 assets were matched to their current Figma components and available local source assets. System Mode applies. No new glyph, SVG edit, icon import migration, dependency, Figma write, publication or Git action is included.

| Meaning | Confirmed existing assets (icon/ prefix omitted) |
| --- | --- |
| Star collection | rating-star → rating-star-100 |
| Heart collection / favorite | favorite → favorite-filled |
| Like / approval | like → like-filled |
| Dislike | dislike → dislike-filled |
| Applause / encouragement / congratulations | like-alt-2 → like-alt; the rear hand becomes filled |
| Move to top | pin-top-alt-2; only one glyph is designated |
| Pin / fix | pin → pin-top-alt; retain the slanted-outline to upright-filled change |
| Filter | filter → filter-filled; applied and expanded stay independent |
| Sidebar / directory panel expand and collapse | expand / collapse; show the next action and retain the open surface |

Use the existing semantic resolver and explicit variants. A vague collection or liking intent must not silently choose among star, heart, approval and applause. General expand/collapse still uses arrow-down/up; text buttons with action labels still use double-arrow-down/up. Do not infer a filled or unpin asset for move-to-top. The semantic source documents the pair; the host still owns business state, icon choice and ARIA.

Implementation order: add focused semantic regression checks, extend the existing JSON/generator chain, update the existing interactive examples and their checks, then run generation integrity, full repository verification and an independent review. Validation must include unchanged source asset hashes, all prior arrow scenarios, new pair selections and unknown/ambiguous requests. Record results in the existing verification evidence and keep the Human Gate pending until explicit user acceptance.

Completed: the existing semantic source now covers 58 assets and 40 rules, and the review page demonstrates all 9 confirmed groups. All 897 runtime asset hashes remain unchanged. The complete `pnpm verify` retry passed (881 unit tests, 55 Chromium tests); the first run's isolated FIFO timeout and unchanged-threshold investigation are recorded in the [verification evidence](../../evidence/runtime/icon-button/verification.md). Independent semantic and page reviews found no blocking issue.

## Human visual acceptance — 2026-09-07

The user explicitly stated “确认视觉验收” for the current `#icon-button` review page. Record the IconButton Human Gate as `accepted`, with this exact statement and the verification evidence in `componentRefinements.iconButton.humanGateDecision`. The UI manifest, local Registry record and review-page notice reflect this acceptance. This closes the IconButton visual checkpoint, including its confirmed icon examples; it does not approve other components or change publication, business migration, Figma or Git status.
