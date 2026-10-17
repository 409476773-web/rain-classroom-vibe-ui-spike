# W3 native comparison after implementation fixes

25 source/candidate pairs captured: 13 family crops at1440 and R1/R3 four business scenes at1200/1440/1600. Exit0, no page/console errors, tracked candidate files unchanged during capture, frozen approved source unchanged. This local visual snapshot supports review; it does not grant visual approval or a Human Gate.

Compared against immutable W3 reference2026-10-01T10-40-10-888Z. Canonical screenshots are left unchanged; only copies in this run trim an extra native screenshot edge pixel to rounded CSS dimensions. Unequal sizes remain incomparable; separately padded side-by-side/overlay/diff images preserve original pixel size and are review-only. No image was scaled.

## Confirmed improvements

Actual latest C3 side-by-side and R1-plan/R3-files/R3-errors candidate PNGs were opened. C3 now uses64h track and20px content padding; C1/C3/C4/C5 overall height aligns with source. R1 module header positioning and identity/member clusters align with source x480-level layout. Tree metadata now stays in one line and guide lines are removed. Recipe frame geometry aligns at all three widths. A3 widths remain76/63×26 and A5/W3 stage geometry remains aligned.

## Remaining observed differences

- Family demo columns still differ by1 to1.33px. Queue+1h, A3+3h, C2/White+2h. Icon optical shapes and typography remain visibly different in some samples.
- R1 stat row and graph start remain slightly below the source; local typography differs.
- R3-files table selection header wraps “选择” into two lines vs source header checkbox; table starts lower than source. File type tiles and approval Tags use current shared components and remain optically different.
- R3-errors rows measured visually as57 vs source50, so the last pagination is below the first800px frame; root was notified to use recipe-specific row density.
- The comparison selector maps align controls by source order and are diagnostic, not approval thresholds. Structural source/candidate differences (for example ConnectedSurface track containing available whitespace vs inner tab list) must be read with fragment HTML rather than treated as automatic visual defects.

## Measurements

| Case / width | Source CSS | Candidate CSS | Image status |
|---|---:|---:|---|
| A2-default / 1440 | 391.328 × 360 | 390 × 360 | incomparable-size |
| A2-queue / 1440 | 391.328 × 366 | 390 × 367 | incomparable-size |
| A3-default / 1440 | 612 × 267 | 613 × 270 | incomparable-size |
| A3-inverse / 1440 | 612 × 255.797 | 613 × 258.797 | incomparable-size |
| A5-default / 1440 | 1320 × 350 | 1320 × 350 | measurement-only |
| contents-default / 1440 | 612 × 116 | 613 × 116 | incomparable-size |
| C2-info / 1440 | 612 × 168 | 613 × 170 | incomparable-size |
| C3-identity / 1440 | 612 × 230 | 613 × 230 | incomparable-size |
| C4-summary / 1440 | 612 × 223 | 613 × 223 | incomparable-size |
| C5-preview / 1440 | 612 × 298 | 613 × 298 | incomparable-size |
| white-default / 1440 | 1320 × 264 | 1320 × 266 | incomparable-size |
| W2-soft / 1440 | 650 × 264 | 651 × 266 | incomparable-size |
| W3-outlined / 1440 | 1320 × 375.391 | 1320 × 375.391 | measurement-only |
| R1-plan / 1440 | 1440 × 800 | 1440 × 800 | measurement-only |
| R1-plan / 1200 | 1200 × 800 | 1200 × 800 | measurement-only |
| R1-plan / 1600 | 1600 × 800 | 1600 × 800 | measurement-only |
| R1-industry / 1440 | 1440 × 800 | 1440 × 800 | measurement-only |
| R1-industry / 1200 | 1200 × 800 | 1200 × 800 | measurement-only |
| R1-industry / 1600 | 1600 × 800 | 1600 × 800 | measurement-only |
| R3-files / 1440 | 1440 × 800 | 1440 × 800 | measurement-only |
| R3-files / 1200 | 1200 × 800 | 1200 × 800 | measurement-only |
| R3-files / 1600 | 1600 × 800 | 1600 × 800 | measurement-only |
| R3-errors / 1440 | 1440 × 800 | 1440 × 800 | measurement-only |
| R3-errors / 1200 | 1200 × 800 | 1200 × 800 | measurement-only |
| R3-errors / 1600 | 1600 × 800 | 1600 × 800 | measurement-only |

Historical runs2026-10-01T10-49-17-522Z and2026-10-01T11-04-34-651Z remain preserved as earlier observations. Later code edits are not covered by this timestamp. No Token reset, Classic/Figma/Git/publication or dependency change is part of this evidence.
