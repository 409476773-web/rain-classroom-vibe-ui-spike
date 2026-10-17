# Native reference comparison evidence

This run preserves native CSS artboard sizes, 100% scale, DPR 1, approved HTML SHA d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c. It records measurement evidence, not human visual acceptance. No masks or CSS injection were used.

| Case | Capture | Original first / second PNG identical |
|---|---|---|
| R5-default-1440 | captured | true |
| R5-default-1200 | captured | true |
| R5-default-1600 | captured | true |
| R5-seek-third-1440 | captured | true |

Source file SHA locks before and after capture are recorded in comparison-report.json. Both lock and immutable reference checks are true / true. Browser page and console error count: 0. Original stability flags are unchanged.

R5 actual event button click selects the third event, range984 and displayed16:24/25:00 asserted. New source golden: ../../reference/2026-10-01T14-09-24-852Z. Knowledge pane, player/slide, and all four timeline card rectangles match across widths and selected third event. At1200 heading linebox alone has y-0.0156px / height+0.0313px with equal computed font/line-height. Previous timeline per-card accumulation is closed. The older08:56 evidence remains historical; this run adds16:24 rather than relabeling it.

Subsequent revision lineage: S5 current-tab activation and focused module-header hiding affect only S5. S3/S4 toolbar business-identity seam affects their identity text, not standalone R4/R5/R6 defaults. Workspace hoverPreview=false timer cleanup changes listener/timer behavior without changing these default renders. Unaffected screenshots retain their original SHA locks and are explicitly reused by scope; they are not relabeled with later file hashes.
