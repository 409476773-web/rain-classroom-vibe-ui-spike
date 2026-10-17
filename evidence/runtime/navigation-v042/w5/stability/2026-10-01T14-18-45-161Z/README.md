# Natural consecutive-frame diagnosis

Five untouched native artboard screenshots per case, separated by250ms. No mask, CSS injection, tolerance change, or forced style mutation. Original first/second instability remains false in the original comparison report.

| Case | Frames1/2 same | Separate final natural pair | Computed/geometry/focus/hover/animation fingerprint stable |
|---|---|---|---|
| S4-grading-1440 | false | [4, 5] | true |
| R4-grading-1200 | false | [4, 5] | true |
| R4-grading-1440 | false | [4, 5] | true |
| R4-grading-1600 | false | [4, 5] | true |
| R6-board-1440 | true | [4, 5] | true |

Source SHA locks unchanged during this run: true. Page/console errors0. R4/S4 first-frame corner raster may differ by1 channel at9 pixels; frames2 through5 naturally match. R6-board five frames naturally match, exactly matching original14-01 first PNG; the original all-white second capture is preserved as unproven capture anomaly.

Later S recovery-label/icon CSS affects only S matrices; standalone R4/R5/R6 geometry and rendering are unchanged by it. S4 final recovery-bar appearance is recaptured in the later complete W4 matrix and its stability separately diagnosed.
