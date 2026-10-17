# W4 immutable reference evidence

24 fixed native 1440 ×800 CSS cases were actually opened, operated with DOM clicks/selects, measured and captured twice. Every pair has identical screenshot SHA-256, no page error was recorded and approved source SHA-256 stayed unchanged. This source-only capture does not test the new React state controller and does not pass candidate regressions N01–N32.

Command: `RAIN_REFERENCE_URL=http://127.0.0.1:5199/reference/approved-v0.4.2.html node scripts/navigation-v042-w4-reference.mjs` — exit 0. Chromium/macOS/DPR/locale metadata and setup actions are recorded in capture-report.json. No fit or image resizing was applied. The element capture may include one raster edge pixel for fractional stage origins; every original CSS rect is retained.

`computed-summary.json` contains source preferences/effective/session snapshots and key geometry/styles. Full JSON and immutable fragment HTML accompany each PNG. No draft text is included in captureSnapshot; frozen fixture fragment text is source material.

Actual images opened for visual inspection: S1-default, S1-hidden, S3-overlay-inverse, S3-global-overlay-inverse, S5-tabs-peek, S6-focus.

| Case | Regions or ribbon |
|---|---|
| S1-compact | global: compact / 208; context: expanded / 216; ribbon: full |
| S1-default | global: expanded / 208; context: expanded / 216; ribbon: full |
| S1-hidden | global: hidden / 208; context: hidden / 216; ribbon: full |
| S1-inverse | global: expanded / 208; context: expanded / 216; ribbon: full |
| S2-default | global: compact / 208; context: expanded / 260; ribbon: full |
| S2-inverse | global: compact / 208; context: expanded / 260; ribbon: full |
| S3-default | global: compact / 208; context: hidden / 216; directory: expanded / 190; fields: expanded / 188; ribbon: full |
| S3-global-overlay-inverse | global: compact / 208; context: hidden / 216; directory: expanded / 190; fields: expanded / 188; ribbon: full |
| S3-inverse | global: compact / 208; context: hidden / 216; directory: expanded / 190; fields: expanded / 188; ribbon: full |
| S3-overlay-inverse | global: compact / 208; context: hidden / 216; directory: expanded / 190; fields: expanded / 188; ribbon: full |
| S3-overlay-light | global: compact / 208; context: hidden / 216; directory: expanded / 190; fields: expanded / 188; ribbon: full |
| S4-default | global: compact / 208; context: expanded / 164; queue: expanded / 240; ribbon: full |
| S4-grading | queue: expanded / 240; review: expanded / 304; ribbon: full |
| S4-inverse | global: compact / 208; context: expanded / 164; queue: expanded / 240; ribbon: full |
| S5-default | global: compact / 208; context: expanded / 216; ribbon: full |
| S5-hidden | global: compact / 208; context: expanded / 216; ribbon: hidden |
| S5-hidden-peek | global: compact / 208; context: expanded / 216; ribbon: hidden |
| S5-icons | global: compact / 208; context: expanded / 216; ribbon: icons |
| S5-inverse | global: compact / 208; context: expanded / 216; ribbon: full |
| S5-tabs | global: compact / 208; context: expanded / 216; ribbon: tabs |
| S5-tabs-peek | global: compact / 208; context: expanded / 216; ribbon: tabs |
| S6-default | global: compact / 208; events: expanded / 228; knowledge: expanded / 296; ribbon: full |
| S6-focus | global: compact / 208; events: expanded / 228; knowledge: expanded / 296; ribbon: full |
| S6-inverse | global: compact / 208; events: expanded / 228; knowledge: expanded / 296; ribbon: full |

Observed geometry: identity/restore bar48h with padding6 14; normal restore controls32h. Global expanded208, compact64; context216 (S2 resource260). Standard splitter5. S3 context temporary overlay216×740 at native frame x68/y52, radius10, border#d6deea, shadow0 10 28 rgba(32,54,83,.10) plus0 2 6 rgba(...,.04). The compact rail occupies64 and main allocation remains unchanged. Source inverse styles darken global rail/overlay; context temporary overlay remains white. This is recorded source behavior, not a new design decision.

S4 grading uses only queue240 and review304; interaction additionally uses global64/context164/queue240. S6 uses events228/knowledge296; focus preserves preferences and hides layout regions while named persistent restoration controls stay visible.

S5 ribbon native modes: full111=40+70+1, icons83=40+42+1, tabs41, hidden0. Temporary tabs/hidden ribbon112h is positioned over the content with radius0 0 9 9 and shadow0 10 26 rgba(40,69,104,.15). Paper width760 and padding36 46 44; paper y173 (tabs) or132 (hidden) stays identical during temporary expansion, confirming native source occupancy behavior.

No source HTML, global Token, Classic, dependency, Git, Figma or publication change occurred. Candidate state regressions, broad accessibility and Human Gate remain separate.
