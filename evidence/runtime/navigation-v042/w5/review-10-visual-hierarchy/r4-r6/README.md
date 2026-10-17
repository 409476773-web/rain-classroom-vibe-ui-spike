# Review10 R4–R6 local hierarchy evidence

Auxiliary controls now use existing Rain IconNeutral4, with IconNeutral2 on hover and keyboard focus. Ordinary outline actions explicitly use the existing tertiary Button variant and 6px radius. R6 table headings use TextNeutral5, regular weight and BorderNeutral4. R4 interaction captions, grading material metadata, and R5 incidental text recede while their task content remains unchanged. R4 interaction and grading retain their different densities.

Production changes are limited to `r4-r6.tsx` and appended local rules in `r4-r6.css`. No shared defaults, global Tokens, event handlers, business state, icons/assets, target dimensions or test thresholds changed. The original CSS prefix is byte-identical; removing the declared visual TSX additions restores the protected before SHA exactly.

- [Closure and protection audit](2026-10-03-local-closure.json)
- [Before runtime, 29 passed](before-results.json) / [After runtime, 29 passed](after-results.json); zero browser page errors.
- [Before hierarchy, 9 cases](hierarchy-before-v3.json) / [After hierarchy, 9 cases](hierarchy-after-v2.json); actual rendered light and inverse caller styles, keyboard focus, hover and hit targets.
- [Existing focused tests, 13 passed](focused-tests.log). Tests were not edited.

Primary text, selected group, scores, grade-method geometry, document content/status, form heading/labels and primary save/share paint and geometry were compared across 27 available nodes: all unchanged. Auxiliary target rectangles were compared across 24 available nodes: all unchanged. Inverse platform icons inherit the local dark Token values; content stays on its original light theme.

Visual pairs at 1440px:

- R4 interaction: [before](before/R4-interaction-1440.png) / [after](after/R4-interaction-1440.png)
- R4 grading: [before](before/R4-grading-1440.png) / [after](after/R4-grading-1440.png)
- R5 replay: [before](before/R5-replay-1440.png) / [after](after/R5-replay-1440.png)
- R6 table: [before](before/R6-table-1440.png) / [after](after/R6-table-1440.png)
- R6 form: [before](before/R6-form-1440.png) / [after](after/R6-form-1440.png)

The runtime audit also captures 1200/1600px layouts, all four R6 views, real business interactions and 480px short-window popup/focus recovery. Earlier failed probe attempts are preserved in this directory. The final hierarchy run establishes keyboard modality before checking `:focus-visible`; this instrumentation correction retains the original assertions and does not change production code.

Human visual approval, full contrast/accessibility acceptance, publication, Figma and Git remain separate. Shared build/full QA is coordinated by the parent task.
