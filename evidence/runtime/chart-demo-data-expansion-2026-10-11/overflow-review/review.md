# T13 narrow viewport overflow review

The failures come from the existing native XAxis resize transition, rather than new demo-data values or permanently wide page elements. The diagnostic repeats the T13 path: update/replay every family card at1440, then resize390 and inspect the first card. No product source was edited.

| Family | Current immediate width | Current first recorded390 sample | Old-data immediate width | Old-data first recorded390 sample |
| --- | ---: | ---: | ---: | ---: |
| profit-loss | 993 | 757ms | 993 | 733ms |
| scatter | 982 | 502ms | 980 | 474ms |
| composed | 952 | 694ms | 952 | 678ms |

All three current and old-data cases remain390 at the later 1000ms observation. There are no browser page errors. Old-data module response interception was confirmed three times; the updated first rows differ as expected (ProfitLoss -8 instead of-12, Scatter202/113 instead of218/151, Composed113/202/85 instead of151/218/100). This makes the old-data reproduction concrete.

The actual overflowing element is the HTML date label from XAxisLabel, not a retained SVG width. For example, the immediate ProfitLoss main chart container is324px wide with right357, but its Sep24 label is still at right993.27. The same labels appear in the offscreen variant cards. The source applies a500ms CSS left tween (x-axis.tsx71–77, animatePosition=xDomain==null at662; chart-phase.ts25). The XAxis, phase, context, ProfitLoss renderer and chart CSS are byte-identical to before. Long code/table rectangles inside existing overflow containers are not the document-width cause: they remain wide after the document returns390.

The root agent applied expect.poll to the identical scrollWidth<=innerWidth+1 contract, without enlarging the threshold or changingCSS/rendering. The root-reported rerun of all three families at1440/390 with updates/replays passed in20.9s. The native position transition itself remains present.

Exact source hashes, full DOM/ancestor facts, timings, current/baseline PNGs, real interception details and exit outcomes are in review.json, facts-current.json, facts-baseline-data.json and the diagnostic logs. reproduce.mjs is the evidence-only reproducer. The old-data overlay is not a complete old-host deployment; that distinction and checkpoint timing limits are preserved in JSON.
