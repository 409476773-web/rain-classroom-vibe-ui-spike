# Independent-review regression baseline

Five focused review tests were added after the initial nine passed. Their first run failed and preserved the following facts:

- Clicking the hovered category-2 / college-3 coordinate reset inspection to category-1 / college-1.
- At 390 px after scrolling the 24-column matrix to the right edge, keyboard focus selected a first cell at x=-1362 px, behind/outside the sticky heading whose right edge was x=144 px.
- Semester legend labels were five fractional ranges (`1–2.4` through `6.6–8`) rather than eight discrete semesters.
- During zero-to-90 bubble growth, five frames displayed a glyph beyond the painted circle. The first sampled painted radius was 3.67 px and the farthest glyph corner was 10.37 px. Fit tolerance is 1 px.
- On the dark-to-light heat transition, four frames selected materially worse text tone. One frame had chosen contrast 2.96 versus the alternative 5.22. The contrast-choice tolerance is 0.1; this is not a universal 4.5 contrast claim.

The first heat forward capture started after that transition had completed, because change dispatch and frame sampling used separate browser evaluations. It was changed to dispatch and sample inside one evaluation, avoiding lost early frames. Bubble sampling was strengthened the same way.

The earlier hover-to-keyboard test had assumed focus resets inspection to the first coordinate. Independent review established that preserving a valid hovered coordinate is required, especially when a pointer click focuses the parent region. Its expectation was corrected to preserve that coordinate, then verify ArrowLeft, ArrowRight and ArrowDown navigation. Fresh first-coordinate focus and sticky-header visibility remain covered by the new dedicated test.

The subsequent focused heat run hit an in-progress Vite parse error (`&&` mixed with `??` without parentheses) before the page loaded, so that run is not behavioral evidence. The renderer owner was notified; no runtime source was mutated by this test task.
