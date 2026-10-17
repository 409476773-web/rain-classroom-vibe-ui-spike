# Selection Patterns SC-03 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete independent preview, dependent fields and finite current-page selection after the user's “继续推进” on 2026-09-10.

**Architecture:** System Mode; three forkable, unpublished Pattern candidates compose the accepted native controls and card recipes. Copyable sources live in `apps/playground/src/patterns/selection-patterns.tsx`, above UI in the dependency direction; no new workspace package or selection engine. App-owned drafts, filters, pagination and payload policy stay in the review page.

**Tech Stack:** Existing React / TypeScript / Vite / Rain Tokens; installed Base UI Dialog 1.8.0 per ADR 0005; existing Vitest and Playwright.

---

## Scope and decisions

The user accepted SC-02 runtime visuals, then asked what was next and authorized the proposed three SC-03 patterns. This is a new scoped entry in `status/current-phase.yaml`; it does not overwrite the accepted SC-01/02 entries or frozen phase history. The repo has no HEAD and all baseline files are untracked; keep the working directory and use file snapshots, without creating a commit/worktree.

Sources: [SC-00 audit](../audits/2026-09-09-selection-sc00-preflight.md), [SC-02](2026-09-10-selection-cards-sc02-implementation.md), [ADR 0005](../adr/0005-headless-base.md), and the user's `rain-selection-handoff-v0.1 (1).zip` sections 01 / 03 / 04 / 06. Figma V0.3 nodes 2346:1980, 2346:2071 and 2346:2151 are interaction/composition references, not a new pixel-match requirement or a business PRD. No new Figma write or claim of a live reread.

| Pattern | Contract and reusable parts |
| --- | --- |
| IndependentPreview | Controlled preview target is independent of the selected value. Base UI owns modal focus trapping, Escape, backdrop and scroll behavior. Title / description / body / close are separate parts; initial focus goes to the title, close returns to the actual clicked trigger or a required fallback. Portal receives the current theme/density. Explicit `type=button` actions. Card callback forwards its native React click event so the actual trigger is available, with existing zero-argument callbacks still valid. |
| DependentFields | Named fieldset with explicit `active`; inactive means hidden and disabled, with drafts owned by the form. No automatic focus jump and no key interception. Form builds an explicit active-branch payload and only validates the active branch. Session draft is retained on branch switches; explicit reset restores initial draft and choice. |
| PageSelection | Receives a declared current-page scope label, eligible IDs, selected IDs, and the owner's change callback. Unique E; empty or loading is disabled/unchecked. Partial known intersection is mixed. Activation makes S union E or S minus E; locked and outside-page IDs remain. Header has no name/value submission entry. App filters and paginates data before deriving E, retaining selections across those changes. |

All public Pattern roots retain `data-rain-id` / parts `data-slot`. No extra UI variants, public Dialog, numeric-input component, dependency, brand value, source artwork change, publication, migration or Git action. Complete source recipes are the default; no new generic form/state/config framework. The conditional example uses the existing text Input for a clearly labeled positive integer attempt count, validated by a small app-owned rule.

Visuals reuse the accepted cards, Input, FormItem, Button, Checkbox and shared Focus. New Pattern surfaces use existing Background/Neutral/1, Text/Neutral/1 and 3, Border/Neutral/3, Fill/Neutral/Alpha/1; existing spacing, radius 10 and dialog shadow. Pattern-only CSS handles modal geometry/scrolling and fieldset layout. Independent review reproduced one shared Card composition defect: descendant draft fields could falsely style the shell as selected or disabled. The necessary SC-03 correction anchors the existing checked, indeterminate and disabled selectors to the card's own direct selection input, with exact color-consumer metadata regenerated; declarations and accepted geometry remain unchanged. The review page reuses the existing card-page surface and typography classes. Dark selected-card Focus remains 2.361:1 against the selected surface, below 3:1, without a waiver; text 4.5:1 and meaningful controls 3:1 stay unchanged.

## Task 1: Contracts and behavior checks

Create `apps/playground/src/patterns/selection-patterns.test.tsx` for finite-set selection, empty/unknown states, native FormData and inactive draft behavior; create `scripts/selection-patterns-governance.test.ts` for exact authorization and candidate identities. Run these tests before implementation and record the expected missing-export failure. Preserve protected files in `/tmp/rain-selection-sc03-before`.

## Task 2: Implement and connect

Create `apps/playground/src/patterns/selection-patterns.tsx` and `.css`; keep preview state, reset and payload examples in `apps/playground/src/docs/components/selection-patterns-page.tsx`. Add `#selection-patterns` to `app.tsx`, a link in the component page and the exact scan directive in `styles.css`. Connect the existing `selection-cards-page.tsx` preview callbacks to the same presenter. Only extend the callback event type in `packages/ui/src/recipes/selection-card-recipes.tsx`; keep the accepted card geometry and visuals unchanged.

Register the three truthful Pattern manifests under `manifests/patterns`, `registry/selection-patterns.json`, exact source/evidence inventories in existing boundary helpers, and scoped color-consumer metadata. Adjust only relevant inventories in existing governance tests. Do not treat source catalog registration as a published installer or SC-04 completion.

## Task 3: Runtime checks and delivery

Create `tests/e2e/selection-patterns.spec.ts` covering SEL-010–014, 016, 020–025 and 035, plus finite-set preservation/native submission checks shared with SEL-005/006/015/018. Verify real keyboard focus, normal Tab and arrows inside editable fields, independent preview of an unselected/disabled option, trigger removal fallback, close/cancel without submit, active validation/payload, preserved drafts, reset, filtering, paging, empty/loading and 320px overflow. Check Light/Dark, compact, forced colors, reduced motion, touch and modal scroll. Screenshots and measured facts go under `evidence/runtime/selection-patterns`; existing captures stay untouched.

Run focused Vitest, `pnpm verify:governance`, `pnpm typecheck`, `pnpm build`, the new browser suite and existing card/Checkbox/Radio regressions with captures redirected to temporary folders. Run an independent review under requesting-code-review, resolve findings, rerun affected checks, then mark implementation/automated/independent status from the actual results. Deliver the live review page with the new Human Gate still awaiting the user.

Unverified before implementation: Base UI final-focus fallback after trigger removal, real portal theme inheritance, fieldset disabling with current Input, active validation focus, data filtering edge cases, touch behavior and narrow modal scroll. Automated browser checks are not assistive-technology or human-design acceptance.
