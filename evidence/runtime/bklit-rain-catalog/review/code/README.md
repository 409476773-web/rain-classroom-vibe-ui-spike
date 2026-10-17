# Independent code review follow-up

Scope: only the two reduced-motion findings from the first code review. Chromium,
1440 × 1000, served from the card-v2 worktree on port 5387. No implementation,
Manifest, Registry, dependency or source-lock files were edited by this reviewer.

## Result

- **FIXED — DateTicker first-hover readout:** first hover at 65% of the area
  chart displays Tooltip `9月16日 / 309 人` and visible date pill `Sep 16` in
  both `reduce` and `no-preference` modes. Previously the reduced-motion pill
  displayed `Sep 1`. The day MotionValue is now initialized and updated from
  the actual offset rather than reset after an imperative render-time set.
- **FIXED — reduced-motion highlight following:** after moving from 22% to
  78% of the line chart, all three highlight clips have x=706.6086956521739
  at both 65ms and 915ms. Normal mode still follows a spring: x=229.60484671589944
  at 65ms, then x=706.4696727634906 at 915ms. The shared .ts hook now uses the
  reduced-motion helper with the actual bounds as input.
- Both browser runs had zero page errors. A fresh `pnpm --filter @rain-next/ui
  typecheck` finished with exit 0; output is in `ui-typecheck.log`.

## Evidence

- `before-reduced-area-date.png`: original reproduced incorrect first-hover pill.
- `reduce-first-hover-date.png`: corrected visible date and Tooltip.
- `no-preference-first-hover-date.png`: normal-motion readout.
- `reduce-continuous-hover-highlight.png`: reduced-motion destination.
- `no-preference-continuous-hover-highlight.png`: normal-motion destination.
- `reduced-fixes.facts.json`: visible clipped labels and timestamped position
  measurements for all three series in both motion modes.

The initial follow-up probe counted the normal chart's whole-plot reveal clip
as a highlight clip. Its count assertion failed. The successful probe excluded
that separate clip using its width; it then checked the three actual highlight
clips and completed all assertions with exit 0. This was a probe selection
correction, not another product change.

Not retested here: the previous 17-type multi-instance sweep, a cross-month
fixture, optional heatmap texture patterns, Safari, physical touch, or screen
readers. This follow-up does not close the user visual gate.
