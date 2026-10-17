# Per-variant Human Gate review images

All 170 frozen variant IDs have an individual card screenshot at 1440px and 390px viewport widths: 340 PNGs. [index.json](./index.json) maps every ID to both actual image paths, dimensions, hashes, recipe and data state. [human-review.csv](./human-review.csv) holds the per-variant review status and notes; all statuses remain `pending`.

Each card was scrolled into view and verified active/ready with finite, visibly painted native geometry before capture. Loading cards were switched to their real data. Static screenshots use the system reduced-motion setting; they do not replace the separate motion or interaction evidence, and their creation does not pass visual acceptance.

[width1440.json](./width1440.json) and [width390.json](./width390.json) each record 170 unique IDs, no browser errors, and matching source hashes before/after capture. Both widths used the same frozen runtime sources. The capture browsers were closed; the original 5173 preview service remains available.

Reproduction from the workspace root:

```sh
node scripts/capture-chart-variant-review.mjs 1440 evidence/runtime/chart-variants/run-_tv8jhva/per-variant-review
node scripts/capture-chart-variant-review.mjs 390 evidence/runtime/chart-variants/run-_tv8jhva/per-variant-review
```

Use a new output directory for another review batch so existing images and human review notes remain preserved. Publication remains `unpublished`.
