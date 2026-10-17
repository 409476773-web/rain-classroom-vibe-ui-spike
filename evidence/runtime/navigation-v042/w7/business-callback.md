# W7 N13 · Actual business callback counts

Final targeted run: 2/2 tests passed, exit 0, 2026-10-04 17:38:43, 2.69s, one worker. Test: `apps/playground/src/recipes/navigation-v042/w7-business.test.tsx`. Command: `./node_modules/.bin/vitest run apps/playground/src/recipes/navigation-v042/w7-business.test.tsx --maxWorkers=1 --reporter=default --reporter=json --outputFile=evidence/runtime/navigation-v042/w7/business-callback-results.json`.

## Trustworthy instrumentation

The actual accepted `R4Recipe` grading and `R6Recipe` render with real UI/Layout and application state. The test partially observes only the public Button save/complete boundary: all original exports are retained, props/ref and rendering delegate to actual Button, and the wrapped onClick increments a spy then calls the actual application callback. This is neither a replacement layout nor a mirrored business implementation.

R4's `save` is defined at `r4-r6.tsx:122` and only bound to its real Button at line 127. R6's local save/complete callback is inline at its real Button at line 162. There is no separate production-submit service to invent or fake. The test observes all provided local save/complete entry points in these consumers. Explicit save is a positive control: counter becomes exactly 1 and real saved status/notice changes, proving the observed handler and actual Button delegation work.

| Actual consumer | Operations before explicit save | Exact callback count | Retained business state | Positive control |
| --- | --- | --- | --- | --- |
| R4 grading | queue hide/show, review unpin→temporary→pin, real separator ArrowRight +10px, grading method, font/material display, AI/teacher view, enter/exit focus | 0 after every operation | Nondefault paper/question/student identity, 9.2 score and keyed feedback | Explicit local save → 1; actual saved draft status and notice |
| R6 feedback form | directory hide/show, real separator Shift+ArrowRight +32px, tools unpin→temporary→pin, enter/exit focus, edit/preview/edit, form/table/board/form | 0 after every operation | Learning-feedback page identity, form view, course name and feedback draft | Explicit local save → 1; actual saved example notice |

## Evidence and limits

`business-callback.log` and `business-callback-results.json` are final runtime artifacts. `business-callback.json` records exact asserted counts, source/test hashes and scope. `business-callback-typecheck.log` has only the existing Command test TS2322 at line 20; no new test diagnostic remains. The first root-path module-resolution failure (0 tests) and an intermediate 2-pass run are preserved. That authoring error is not claimed as a meaningful implementation regression/red phase.

Parent directed the final new test into Playground's normal dependency scope, so there is no extra helper/config/dependency change. This task edited no accepted source, Token, phase, Git, Figma or publication. N13's exact-callback remaining boundary can now be closed for these actual consumer paths; browser execution, production services and human visual acceptance remain separate. `w7_audit` owns the regression-map update and has been notified.
