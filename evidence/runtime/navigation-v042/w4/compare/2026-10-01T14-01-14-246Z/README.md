# Native reference comparison evidence

This run preserves native CSS artboard sizes, 100% scale, DPR 1, approved HTML SHA d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c. It records measurement evidence, not human visual acceptance. No masks or CSS injection were used.

| Case | Capture | Original first / second PNG identical |
|---|---|---|
| S3-default-1440 | captured | true |
| S3-overlay-inverse-1440 | captured | true |
| S4-grading-1440 | captured | false |
| S3-inverse-1440 | captured | true |
| S3-overlay-light-1440 | captured | true |
| S3-global-overlay-inverse-1440 | captured | true |

Source file SHA locks before and after capture are recorded in comparison-report.json. Both lock and immutable reference checks are true / true. Browser page and console error count: 0. Original stability flags are unchanged.

S3 temporary global pane now has x/y/width/height delta zero and overlays keep main body geometry unchanged. Formpaper retains height+0.5px. S4 first PNG pair differs only nine corner pixels, channel maximum1; retain original false. S3/S4 business identity and S5 later local corrections are separately recaptured under the final revision, so this run is not the final business-identity evidence.

Subsequent revision lineage: S5 current-tab activation and focused module-header hiding affect only S5. S3/S4 toolbar business-identity seam affects their identity text, not standalone R4/R5/R6 defaults. Workspace hoverPreview=false timer cleanup changes listener/timer behavior without changing these default renders. Unaffected screenshots retain their original SHA locks and are explicitly reused by scope; they are not relabeled with later file hashes.
