# Native reference comparison evidence

This run preserves native CSS artboard sizes, 100% scale, DPR 1, approved HTML SHA d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c. It records measurement evidence, not human visual acceptance. No masks or CSS injection were used.

| Case | Capture | Original first / second PNG identical |
|---|---|---|
| R4-grading-1440 | captured | false |
| R4-grading-1200 | captured | false |
| R4-grading-1600 | captured | false |
| R6-default-1440 | captured | true |
| R6-default-1200 | captured | true |
| R6-default-1600 | captured | true |
| R4-grading-selected-1440 | captured | true |
| R6-table-1440 | captured | true |
| R6-form-1440 | captured | true |
| R6-board-1440 | captured | false |
| R6-album-1440 | captured | true |

Source file SHA locks before and after capture are recorded in comparison-report.json. Both lock and immutable reference checks are true / true. Browser page and console error count: 0. Original stability flags are unchanged.

R4 grading context, three question cards, and six student queue rows now have zero x/y/width/height differences across 1200, 1440, 1600 and selected case. R6 table headers/rows, board columns/cards, and six album cards have zero rectangle differences. The album grid wrapper intentionally corresponds to the source formcanvas plus files-grid; its generic files-grid rectangle mapping is not a matching semantic layer. R6 formpaper retains +0.5px height. Official icon shapes and native/shared control glyphs still differ; this evidence does not assert pixel parity.

Source table last row and album fifth card are incidental hover after DOM action plus standalone reflow; neutral-pointer source evidence and separate comparisons are in ../../reference/2026-10-01T14-10-43-950Z-hover-diagnostic. These are not selected/current states.

Original R4 first pairs differ at nine corner pixels (max channel difference 1). Original board second PNG is unexpectedly all white; 685101 changed pixels / max channel difference 234, preserved as capture failure. Separate five-frame board diagnosis ../../stability/2026-10-01T14-13-55-376Z produces five identical full frames, exactly matching this run’s board first PNG; cause of the white capture is unproven. Stable natural pair is recorded separately and never changes this report’s original false flag.

Subsequent revision lineage: S5 current-tab activation and focused module-header hiding affect only S5. S3/S4 toolbar business-identity seam affects their identity text, not standalone R4/R5/R6 defaults. Workspace hoverPreview=false timer cleanup changes listener/timer behavior without changing these default renders. Unaffected screenshots retain their original SHA locks and are explicitly reused by scope; they are not relabeled with later file hashes.
