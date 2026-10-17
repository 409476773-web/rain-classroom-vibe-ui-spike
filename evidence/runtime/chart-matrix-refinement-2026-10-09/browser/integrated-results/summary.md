# Integrated matrix browser checks

The first integrated run passed all nine tests in 24.3 seconds. No renderer repair or weakened assertion was needed.

- 6×6 normal-column width spread: 0.03125 px; 12×12 spread: 0.125 px. Long headers preserve the same widths.
- At a 390 px viewport, each data column is 72 px. Internal scroll content is 584 px (6×6) or 1022 px (12×12), with no document overflow.
- Bubble encoding has 35 distinct computed fills. Larger values are darker and have greater RGB chroma; radius squared divided by value varies by less than 0.000001. Nineteen fitted numeric labels are white and have transparent backgrounds.
- Heat readout backgrounds are transparent, and the continuous gradient legend is 8 px high. Quantity legend radii are 9, 12.728 and 18, with matching pale/mid/deep fills; level legend marks have equal radii.
- Gradient and grade legend focus emphasize corresponding cells while preserving encoded fills.
- Adjacent cell inspection retains the same tooltip node. Arrow keys inspect both axes through the focusable scrolling region.
- An offscreen matrix still shows intermediate entry geometry when brought into view.
- Data updates preserve the coordinate node, include intermediate radius values, and keep fitted labels visible. Sorting includes intermediate circle-center positions measured relative to the matrix root.
- Reduced motion commits new geometry and visible readings directly.

`playwright.log`, JSON facts and three screenshots are stored in this folder. `bubble-matrix.png` was also visually inspected: data centers are evenly spaced, plates are absent, fill depth progresses, and quantity legend labels sit below bottom-aligned circles.

These checks establish local Chromium behavior. They do not establish human visual acceptance, universal white-label contrast, real Safari/VoiceOver behavior, sustained frame rate, publication or business adoption.
