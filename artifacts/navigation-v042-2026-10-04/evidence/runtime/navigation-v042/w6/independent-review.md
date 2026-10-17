# W6 bounded independent review

2026-10-04. Read-only review of new E1–E6 consumers and their tests; no browser, dependency, Git, Figma or publication actions. Final result: **passed scoped read-only review after local fixes; no open P0/P1/P2 in reviewed source scope**. Initial findings are retained below.

## Final verification

Independent actual-consumer entry harness passed at 17:19:21, exit 0, 1 test, 2.94s: `./node_modules/.bin/vitest run --config /private/tmp/w6-independent-review-20261004/vitest-fixed.config.ts`.

Both findings are resolved by local consumer changes. `consumer-app.tsx` forwards activation to E1–E6. `active-session-guard.tsx` ends inactive temporary/focus sessions with outside intent. E1 remounts only its `ScopeNavigation` on deactivation, while scope and drafts remain in `CourseResources`. Shared accepted implementation and Tokens were preserved.

The independent harness verifies temporary cleanup, visible-nav Escape focus, replay note and 02:10 playback retention, focus exit on deactivation, portal removal, restored E1 draft, independent IDs/drafts for same-label classes 199/200, and disabled class 238 refusal. The new durable `consumer-lifecycle.test.tsx` is present and reviewed. Reviewer browser actions remain not-run. Root’s current `browser-final.log` and `browser-results.json` were inspected: 13 passed, zero failed/skipped/flaky, 10.9s, start `2026-10-04T09:20:08.289Z`; root reports exit 0. The final browser spec covers compiled shared control styles (primary RGB 21/97/248, 36px), E4 hash-session cleanup, and E1 portal removal with draft retention. The original E3 locator failure remains preserved; its final operation clicks visible segmented labels then asserts the radio checked state. This supplements the independent harness without claiming a reviewer browser run or a visual Human Gate.

## Initial reproduced findings (resolved)

**[P2] Clear the old workspace session when the consumer scene changes** — `apps/playground/src/recipes/navigation-w6/consumer.tsx:19–23`.

All six scenes remain mounted under `hidden/inert`, with unchanged Workspace keys. Open E4’s temporary knowledge index, then select E1 using keyboard or change the hash without a pointer event. E4 becomes hidden but retains `session.temporary` and the global Escape owner. Escape is still routed to the hidden workspace; it dismisses that layer and attempts focus restoration to E4’s hidden trigger. Returning to E4 without Escape presents the stale temporary layer. The host should clear temporary/focus state on deactivation while preserving application drafts. This is the workpack’s explicit SWITCH_CONTEXT and hidden-focus requirement (`06-VISIBILITY-AND-STATE.md:7,28,46,50,54`; `09-VALIDATION.md:49,60`).

A temporary harness imports the actual consumer and reproduces the sequence: one test passed, exit 0, 17:08:42, 4.22s. Command: `./node_modules/.bin/vitest run --config /private/tmp/w6-independent-review-20261004/vitest.config.ts`. Assertions demonstrate stale temporary state, hidden-workspace Escape handling, and a focus attempt to its hidden trigger. jsdom permits hidden focus; real browser inert focus behavior remains for root to verify.

**[P2] Close the portaled scope selector when E1 is deactivated** — `apps/playground/src/recipes/navigation-w6/consumer.tsx:19–23`.

E1’s `ScopeNavigation` remains mounted and retains its More open state while E1 becomes `hidden/inert`. The popup is rendered in a portal outside that subtree, so opening More and switching to E2 by keyboard/hash leaves the scope search visibly over the new scene. Clearing WorkspaceLayout sessions alone does not close this popover. Keep CourseResources business state and close/remount only its selector on deactivation. An added actual-consumer harness assertion passed, exit 0, 17:12:04, 2.94s: E1 is hidden, yet `搜索范围` remains visible and has no `data-scene` ancestor. Root still owns the real browser confirmation.

## Other reviewed boundaries

- Business identities and drafts remain application-owned. Grading score/comment save and resource review save require explicit actions; layout operations do not perform those saves.
- E1 duplicate labels use unique IDs and descriptions; disabled class 238 reaches native disabled controls. No concrete defect found in source. The independent actual-consumer harness now confirms both cases; durable W6 tests have no duplicate-label/disabled-entry consumer assertions yet.
- E5’s compact CSS names only instance A; E6 CSS maps existing semantic Tokens under local workbench selectors. Root separately identified and added the consumer’s shared utility/theme style loader; its root browser rendering check passed and was inspected in the final 13-test evidence.
- A fresh check covered 2,134 snapshot-protected files in UI, Layouts, Foundations and accepted recipes. No implementation or Token diff; only `packages/ui/src/navigation/README-W3.md` and `packages/layouts/src/README-workspace.md` changed as documentation.

Review hashes, exact assertions and limits are in `independent-review.json`. This review does not close a visual Human Gate, W6/W7/W8, broad accessibility, or publication.
