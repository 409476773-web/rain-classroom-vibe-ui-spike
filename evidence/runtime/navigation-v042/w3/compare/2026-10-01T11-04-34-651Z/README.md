# W3 comparison: implementation refinement in progress

This run supersedes 2026-10-01T10-49-17-522Z for collection geometry only. It captured 25 native candidate/reference pairs: 13 family crops at 1440 plus R1/R3 plan/industry/files/errors at 1200/1440/1600. Exit code 0; no page or console errors; all tracked candidate files remained unchanged during capture; frozen reference SHA stayed unchanged. This is measurement evidence, not a Human Gate approval.

Canonical source: ../reference/2026-10-01T10-40-10-888Z (20 twice-stable captures). The comparison script trims only a copied canonical screenshot edge to rounded native CSS dimensions; original evidence is unchanged. Unequal images are top-left aligned and white-padded for a separate native-size-review image; no image is scaled. Padded review metrics are not exact parity.

## Current geometry

| Case | Reference CSS | Candidate CSS | Status |
|---|---:|---:|---|
| A2-default / 1440 | 391.328 × 360 | 390 × 354 | incomparable-size |
| A2-queue / 1440 | 391.328 × 366 | 390 × 367 | incomparable-size |
| A3-default / 1440 | 612 × 267 | 613 × 270 | incomparable-size |
| A3-inverse / 1440 | 612 × 255.797 | 613 × 258.797 | incomparable-size |
| A5-default / 1440 | 1320 × 350 | 1320 × 350 | measurement-only |
| contents-default / 1440 | 612 × 116 | 613 × 104 | incomparable-size |
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

## Opened and inspected

Actual side-by-side images opened: A3-default, A5-default, C3-identity, C5-preview, W3-outlined. Standalone native source/candidate images opened: R1-plan, R3-files, R3-errors; R1-industry candidate also opened. The dominant prior A3 +20px option width defect is resolved (76/63 ×26 native DOM measurement). A5 stage, C3/C4/C5 total height, W3 stage/host, and all recipe frame dimensions now match their source measurements.

## Known differences, in progress

- C3 total height is 230, but source row is64 vs candidate72; source panel padding20 vs candidate0. The candidate tab panel text still touches its top/left edge. Root is correcting feature-scoped selectors. C1 remains104h vs source116h; A2-default354h vs360h; queue367h vs366h. Family columns remain+1px native width.
- A5 body typography is lighter, source title weight600; C5 preview shape for item3 and icon optical shapes still differ. W3 outlined geometry is aligned; icon shapes/typographic weight differ.
- R1/R3 sheet frames align; recipe sheet radius8 vs source10 and inset shadow is absent. Module header natural widths align but centering differs due missing source workspace identity/member cluster.
- R1 stat row y349 vs source345; graphbox y569 vs source536. R3-files toolbar y253 vs source239, rows48 vs source57 and file/status cells do not yet render the source file-type tiles/Tags. Column sizes differ.
- R3-errors directory still uses the Tree narrow-container mobile metadata layout and branch guide lines; source has single-row metadata and 40px rows. Root is correcting a feature-scoped override and showLine. Main action buttons still use text variants vs source full outlined/brand controls.

Root received precise geometry and selector findings. These known differences were actively being corrected after this capture. A later immutable run must verify any resulting changes; this report does not assert those fixes passed.

## Scope limits

No source HTML mutation, global Token reset, Classic modification, dependency installation, publication, Git or Figma write occurred in this capture. No broad accessibility, browser matrix or W4 state regression completion is implied.
