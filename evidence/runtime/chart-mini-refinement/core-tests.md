# Mini geometry and data checks

Implemented in the authorized `card-v2` worktree as page-local recipes. No shared chart engine, public package API, dependency, Foundation token, commit, push, publication or Figma write was changed by this core task.

## Scope and source

- `mini-layout.ts` is the single geometry source for compact/comfortable plot, pie, ring, arc and bar dimensions, plot padding, line width and reading gap.
- `mini-data.ts` owns `getTrendComparisonMax(original)` and `getProgressReading(value, maxValue)`; total-people and daily-people domains stay independent.
- Mini roots expose `data-mini-kind`, `data-size` and `data-mini-state`. `.rain-business-mini-slot` is the fixed geometry slot; readable state and overflowed center text remain outside the decorative layer.
- Gallery has nine kinds × two sizes = 18 figures. The quantity kind is `quantity`; the underlying quantity component remains DataBar. Each composition category keeps a named color identity.

The implementation applies V01 stable color, V02 common structures, V04 number/label roles, V05 behavior and appearance, D02 grouping, D05 state containers and I02 true geometry plus precise readings from the approved plan. The existing Rain chart components remain the owning renderers. Responsive alignment, real font baselines and visual acceptance require separate browser evidence.

## TDD evidence

1. `core-data-red.log`: new daily-domain and progress-reading checks first failed because the two helpers did not exist (22 failed, 10 passed).
2. `core-ui-red.log`: corrected declaration-based sizing substitutes first reproduced the old geometry/state/gallery behavior (16 failed, 4 passed; no unhandled errors).
3. `core-sum-red.log`: finite individual composition values whose sum overflowed first failed the invalid-state check (1 failed, 32 passed).
4. `core-green.log`: the fresh run passed **57 tests in 2 files**, exit 0.

The fresh `pnpm --filter @rain-next/playground typecheck` run also exited 0 after the test-helper type fixes.

## Center readability review repair

The initial diameter check covered the group rectangle only. The review exposed a circular-boundary gap: the 100% group can be 52.65×38px (both dimensions below the 56px inner diameter), while the numeric glyph's corner overlaps the arc band. `core-ink-red.log` first reproduced that defect as one failed test with the old `data-placement="center"` result; the other 24 UI checks passed and there were no JSDOM Canvas errors.

The local repair measures each row's actual glyph ink with Canvas TextMetrics and a zero-size DOM baseline probe. It checks the four ink-boundary corners against the inner circle. The calculation uses line offsets relative to the group and its hypothetical centered position, so moving the node outside does not prevent it from returning when it fits. It leaves graph geometry and font size unchanged. When text measurement is unavailable, the reading safely remains in the ordinary document flow outside the circle.

`core-ink-green.log` records the center repair result: **58 tests in 2 files passed**, exit 0. A subsequent playground typecheck also exited 0. Fixtures use the parent browser's measured 18px LINE and 12px PingFang glyph metrics: 20% remains centered, text doubled to 200% moves the same node outside, restoring 100% text size moves it back, and the corner-overlapping 100% case stays readable outside. Canvas/TextMetrics and actual row/probe bounds are explicitly substituted in JSDOM; real-font browser verification remains separate.

## Reduced-motion pie update repair

Browser evidence found that the vendor PieSlice `animate=false` branch still interpolated `d` with a motion spring during data updates. The page-local MiniPie now selects PieChart's existing direct SVG geometry mode only when `reduced` is true. That existing branch computes the same arcs and fills, preserves named slice keys, and emits plain SVG paths. The normal MiniPie branch keeps its existing entry and hover-grow behavior. No shared component API or source was changed for this pie repair.

`core-reduced-pie-red.log` reproduced the stale immediately-updated paths in all four compact/comfortable × pie/donut cases: 4 failed, 25 passed. Each test compares the update's actual path with a separately rendered final dataset, and verifies the sector node remains mounted. `core-reduced-pie-green.log` is the latest core result: **62 tests in 2 files passed**, exit 0. The fresh playground typecheck also exited 0. Browser fresh-reduced update and normal hover verification are recorded by the browser task separately.

Command:

```text
pnpm exec vitest run apps/playground/src/docs/components/chart-business/mini-data.test.ts apps/playground/src/docs/components/chart-business/mini-examples.test.tsx
```

The checks cover a total-person maximum of 100 with a daily maximum of 22, original-set ordering, empty/all-null/all-zero domains, NaN/Infinity/negative rejection, 20/80 = 25%, 0/80 = 0%, 0/0 inapplicability, invalid/overflow progress, both plot sizes and true zero baselines, both 6/8px segment tracks with zero/subpixel parts, fixed state slots, finite normal/zero/single-point paths, actual line widths, pie/donut dimensions, ring radii and 0/50/100% bottom-opening arc geometry. The enlarged reading check verifies one node moves outside and returns inside without resizing the slot or hiding the reading.

ParentSize and ResizeObserver substitutes resolve the nearest explicit width and height from the actual rendered element tree. They no longer return a constant 96×40. JSDOM does not implement SVG path length, so a local path-length substitute supports the chart effects; these tests make no claim about actual SVG length, real font layout or motion timing.

## Verification boundaries

This record contains unit/data evidence only. Browser appearance, path/hover/round-cap crop bounds, text-only 200% growth, real baselines, scrolling/reduced motion, theme/responsive checks, source download consumption and standard chart regressions are handled by the parent task and browser evidence. They are not claimed as verified here. No user visual gate is closed by these checks.
