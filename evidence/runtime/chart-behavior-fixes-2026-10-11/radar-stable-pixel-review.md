# Radar stable pixel review

The two default Radar idle screenshots show small raster differences, not a measured data, color or SVG-coordinate regression. A separate reduced-motion hover transform-center regression was confirmed, repaired by the Radar owner, and independently verified as restored.

The same-condition browser A/B uses the preserved before RadarArea only in browser responses. It holds time, 1440/390 viewport, reduced motion, monochrome-blue recipe, normal state and revision 0 constant. Both sides are at target for three consecutive samples after at least 2200ms. Reviewed runtime is ab0b379bed54bea06db82f52b65e9dbf2a08a59e236c6a167e640acfad12244e; both probe runs checked it stayed frozen.

## Idle comparison

All three polygon d values, 15 circle cx/cy/r values, fill, stroke, widths, opacity, filters, CTM/screenCTM and boxes are identical. Numerical deviation from data-derived targets is at most 1.42e-14. Original captures differ by 1194/959 pixels, maximum channels 18/33. The unchanged before version itself differs by 716/733 pixels across two runs, maximum channels 26/33; current after output is exactly pixel-identical across the same runs. Differences are restricted to polygon/point regions, with unchanged labels, dimensions and exact tables. This supports Motion/SVG rasterization or antialias variability. The precise Chromium paint mechanism was not instrumented.

## Confirmed hover difference

Old Motion g effectively writes transform-origin:50% 50% and transform-box:fill-box. The new static branch keeps 0px 0px. At the same scale(1.05), the first focused area moves by a different screen translation: after minus before is (0.8844814300537109, -0.6268997192382812)px at 1440, and (0.8255157470703125, -0.5851058959960938)px at 390. Paths, point positions/radius and hover colors/glow are unchanged.

The Radar owner restored only those effective origin/box styles in the static branch, keeping geometry and normal Motion settings unchanged. Final runtime SHA256: 61769a70e807d06cc88abdf1f88bcabdb39ed6fc599868cd3b4edd8a14822740.

Facts: radar-stable-ab/facts.json and radar-stable-ab-hover/facts.json. Pixel metrics and all precise group styles/transforms are retained. The review added evidence only; runtime and original captures were not changed.

## Independent repair verification

Reused the original local A/B focus probe with only the final source guard updated, saving a separate radar-stable-ab-origin-fixed run. The four page contexts hold the same recipe, time, state, media preference and viewport conditions as above. In both widths, all three idle and focused polygon/point geometries, every measured computed color/opacity/filter/origin, CTM/screenCTM and box equal the preserved before version exactly. Focused translation delta is 0px in x and y. Differences remain only in inline style expression: Motion omits explicit opacity and writes transform:none; the static branch expresses the same computed properties directly.

The final hash was checked before the probe, at its end, and at report update. No runtime source was edited by this review. Original idle pixel metrics and the pre-repair ab0b hover facts remain preserved; they were not replaced by the repaired run.
