# W7 N06 · Independent technical review

Scoped result: no open P0/P1/P2 in the one-condition repair and new regression test. Reviewed `packages/layouts/src/workspace.tsx:163` and `workspace.test.tsx:114–128` read-only. Current source/test SHA values match `n06-behavior-repair.json` after-hashes.

The added condition accepts a pointer leave from a region whose temporary panel already closed after Escape but whose matching hover suppression still remains. It routes through the existing `hoverLeave`, so the old suppression is cleared and one deliberate leave/reentry works. It does not alter ordinary permanent-region hover, `hoverEnter`, the 240ms delay, preference/focus ownership or listener cleanup. No new state branch or timer is introduced.

The new regression test complements the existing bridge/cleanup test: open and enter the panel, Escape with focus return, wait 500ms without rebound, leave the now hidden panel, reenter the trigger, assert closed at 239ms/open at 240ms, and unmount with zero pending timers. StrictMode remains exercised.

Fresh independent run: `./node_modules/.bin/vitest run packages/layouts/src/workspace.test.tsx --maxWorkers=1 -t 'N06|delays optional hover' --reporter=default`; 2 passed, 15 skipped, exit 0, 17:43:32, 905ms. Parent's full 17-pass unit and meaningful red record are referenced in `n06-behavior-repair.json`. Inspected browser JSON/log confirms 6 passed, zero failed/skipped/flaky, 16.1s: N06 and N17 each on Chromium, Firefox and WebKit. Original browser traces remain retained.

This review edited only its two evidence files. No reviewer browser execution, broad accessibility/visual Human Gate, W7/W8 completion or publication is implied.
