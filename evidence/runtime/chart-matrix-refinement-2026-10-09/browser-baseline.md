# Matrix refinement browser baseline

- Scope: local Chromium at `http://127.0.0.1:5173/#chart-business`; synthetic fixture data only.
- New suite: `tests/e2e/chart-business-matrix-refinement.spec.ts`.
- Implementation and human visual acceptance are independent of these checks.

The first run had four failures and four passes. It detected nonwhite bubble text/backing plates, opaque heat-readout backgrounds, the absence of the shared tooltip, and entry animation already completed before viewing an offscreen matrix. Its long-header-only width and mark-left-edge sorting checks were subsequently strengthened; these initial passes do not establish equal normal-header widths or sort animation.

The normal-header rerun failed at both sizes: the maximum/minimum data-column width difference was 107.67 px for 6×6 and 61.17 px for 12×12. The strict sorting rerun uses circle centers relative to the matrix root and requires a frame at least 10 percent away from both endpoints. It failed on the old renderer's direct position jump. Measuring circle centers excludes hover-scale recentering and page scroll anchoring from this assertion.

Existing area mapping, radius updates through intermediate sizes, keyed coordinate retention, and reduced-motion terminal geometry already worked in this baseline. The data encoding file was concurrently being refined; this is a live pre-renderer baseline, not a frozen original checkout.

Failure traces are under `browser/initial-results`, `browser/baseline-strengthened`, and `browser/baseline-sorting`.
