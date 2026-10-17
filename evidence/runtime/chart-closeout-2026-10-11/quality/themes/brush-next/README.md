# Brush dependency update: current private verification

Status: **12/12 passed in run-02**, covering Chromium, Firefox and WebKit at widths 1440 and 390. The original run-01 is preserved: six keyboard paths passed and six pointer paths exposed a real 4px controlled-window expansion. Root repaired the adapter and froze the updated source; the exact same private spec and strict assertions then passed all 12. Final private type check passed with exit 0 (`typecheck-final.log`). No runtime/public test file was written by this private evidence task.

The final spec SHA256 is `bb326087f96f7977ecf264884e00fcd33b770497677209c64b036f1b974eb550` in both RED and GREEN runs. `summary.json` gives per-case facts/screenshots, 246 before/after source hashes, unchanged installed dependency identities and source changes between the two runs. All current browser contexts/processes are closed.

The actual playground `ChartBrush` caller is `line-trio-brush` in `apps/playground/src/docs/components/chart-variants/trend.tsx:252-270`. Area's temporary segment selection uses other components; Composed has no current Brush caller. This task does not create new examples or claim those are already Brush consumers.

Two tests on Chromium, Firefox and WebKit at widths 1440 and 390 produce 12 independent browser tests (the minimum Chromium subset is four). They cover four critical action paths:

- Native range keyboard input changes both ends, moves the native SVG handles and preserves exact original row values/date labels in the displayed window.
- Real right-handle pointer resize makes two consecutive preview updates and commits the changed window without corrupting the controlled drag anchor.
- Dragging the selected interior window moves the range while retaining its pixel width and displaying the corresponding exact rows.
- Keyboard reset restores the full 30 rows, full native extent and captured full range; the native Brush DOM remains the same element through controlled updates.

Captured keyboard dates are exact day boundaries. Pointer selection keeps continuous date/time precision; captured values are checked against the inclusive displayed date subset rather than incorrectly rounded to slider indices. The existing per-card code panel is used to observe the saved range.

The runner records source hashes before/after, including current chart/foundation source support, manifests and lockfile. It records installed Brush and React manifests, Brush lib/esm files and resolved direct dependencies before/after. Tests also hash the actual Vite-served Brush module and require its package marker to identify 4.0.1-alpha.0, rejecting a stale served 3.12.0 module. These are existing-workspace installation identities; independent clean installation remains the parent's separate evidence.

Actual current served module SHA256 is `f2d7e03763283ed7d59d1a7a8e1d9e815435a489490d112ad19b82ca5e4f1d13`, with marker `@visx+brush@4.0.1-alpha.0_react@19.2.8/node_modules/@visx/brush` in every case. Installed Brush is 4.0.1-alpha.0 and React is 19.2.8. Source changes within run-02 are empty, and installed dependencies before/after are identical.

The retained RED and attribution are in `pan-domain-diagnostic.json`. Actual SVG width attributes, x0/x1, saved range ISO values and displayed exact row boundaries all show the pre-fix expansion; it was not just a CSS border or bounding-box difference. Brush's `SAFE_PIXEL=2` callback conversion expands both endpoints, and the previous adapter saved that padded callback domain, then fed it back as the controlled range. Cached Brush3 source contains the same padding algorithm. **Old Brush3 browser execution was not performed**; the isolated old-version host was never started after the parent prioritized the new current-source freeze.

Read-only fix review: `chart-brush.tsx:194-206` now maps the actual native pixel extent through the time scale before both preview (`211-216`) and commit (`219-223`) callbacks. Null stays null, the bounded fallback remains, and the existing brushing guard protects native drag anchors during preview echoes. That keeps hit tolerance out of the stored time range and its controlled pixel projection. The six current pan paths retain their width with maximum floating-point difference `5.684341886080802e-14` pixels; their saved duration remains 15 days. Keyboard dates, precise row values, continuous pointer dates, final full reset and native element identity are all asserted without changing the RED spec.

Four current Brush theme paths additionally passed in the parent directory's `run-07-brush-final` and replace the corresponding earlier observations, keeping the master theme total at 36. Their 242 chart/foundation/source-support hashes match the corresponding subset of this Brush12 run. The other 32 theme observations retain their older snapshots; no fresh full theme or every-variant claim is made here.

To reproduce after a new freeze notification, use a fresh output directory:

```sh
RAIN_BRUSH_FROZEN=1 node evidence/runtime/chart-closeout-2026-10-11/quality/themes/brush-next/run.mjs evidence/runtime/chart-closeout-2026-10-11/quality/themes/brush-next/FRESH-RUN
pnpm exec tsc --noEmit --project evidence/runtime/chart-closeout-2026-10-11/quality/themes/brush-next/tsconfig.json
```

No earlier run evidence or full 36-theme suite was overwritten or rerun. All browser activity uses ordinary Playwright mouse/keyboard APIs, with explicit reduced motion and Light theme, and requires no CDP. Browser WebKit does not prove real Safari, VoiceOver, operating-system native control behavior or physical touch. Failures are retained and classified from actual evidence; no runtime code or public API is modified here.
