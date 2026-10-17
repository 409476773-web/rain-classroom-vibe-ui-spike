# W7 browser failure recheck — 2026-10-06

This record preserves the original full run and attributes later results by exact project, file, suite and title. The latest 737-identity view combines results from three runs; it is not a new passing full-suite run.

## Preserved runs

| Run | Scope / workers | Actual results | Exit | Raw |
| --- | --- | --- | --- | --- |
| Initial full | 737 discovered / default 6 | 712 passed; 21 unexpected failures; 2 expected failures; 2 capture skips | 1 | [full-browser.json](full-browser.json) |
| Exact failure recheck plus G1 | 34 unique identities / default 6 | 33 passed; 1 timeout | 1 | [browser-recheck.json](browser-recheck.json) |
| One remaining identity | 1 identity / explicitly requested 1 worker | 1 passed in 20.840s | 0 | [browser-recheck-single.json](browser-recheck-single.json) |

All counts above use each test result actual status. Playwright `stats.expected` is retained as raw and does not define the passed count.

## Coverage

The installed Playwright 1.62.1 `--test-list` implementation matches project, relative file and title path. Each selected entry includes the entire title path. The list run confirmed exactly 34 unique identities: all 21 initial unexpected identities plus all 14 G1 identities, with one overlap. There were zero missing and zero extra identities. All 14 G1 cases passed in the default six-worker recheck, including brand motion, real hover, disabled invariance and ManageTree interactions.

- [Selection](browser-recheck-test-list.txt), [exact list coverage](browser-recheck-list-coverage.json), [list raw](browser-recheck-list.json)
- [Default recheck log](browser-recheck.log), [single-case log](browser-recheck-single.log)
- [Complete identity attribution](browser-recheck-attribution.json), [source and execution verification](browser-recheck-execution.json)

## Latest result for each of the original 21 unexpected identities

All identities below are in project `chromium`, with no nested suite. Full titles and row-by-row raw provenance are preserved in the attribution JSON.

| File : line | Exact title | Default 6-worker recheck | Latest |
| --- | --- | --- | --- |
| bm-b.spec.ts:10 | visual: Dialog spacing and surfaces across form presentations | passed (26.970s) | passed (26.970s; 6 workers) |
| card.spec.ts:112 | Card inset presets keep effective gaps within insets without changing drafts or controls | passed (27.320s) | passed (27.320s; 6 workers) |
| icon-rendering.spec.ts:218 | the nine Figma PNG references retain their shapes in actual CSS masks | passed (8.945s) | passed (8.945s; 6 workers) |
| icon-rendering.spec.ts:228 | the same icon paints the actual default, blue, red and inverse host colors | passed (4.125s) | passed (4.125s; 6 workers) |
| icon-rendering.spec.ts:247 | luminance masks remain isolated across repeated blue and red icons | passed (3.744s) | passed (3.744s; 6 workers) |
| icons.spec.ts:18 | the directory has discoverable entry points and restores route heading focus | passed (6.082s) | passed (6.082s; 6 workers) |
| inside-labels.spec.ts:8 | inside labels retain geometry, native naming and actions in dark | passed (14.734s) | passed (14.734s; 6 workers) |
| navigation-v042-w4.spec.ts:57 | accepted R2 brand remains mounted through full, compact and reverse motion | passed (5.188s) | passed (5.188s; 6 workers) |
| navigation-v042-w7.spec.ts:89 | N17 R2 brand stays mounted through real expand collapse motion with accepted slot widths | passed (3.576s) | passed (3.576s; 6 workers) |
| navigation-v042.spec.ts:3 | G1 review-08 rail transitions retain brand nodes and use standard Avatar | passed (5.850s) | passed (5.850s; 6 workers) |
| select.spec.ts:9 | implemented Select placeholders and option descriptions preserve real permissions in light | passed (55.976s) | passed (55.976s; 6 workers) |
| select.spec.ts:9 | implemented Select placeholders and option descriptions preserve real permissions in dark | passed (26.799s) | passed (26.799s; 6 workers) |
| select.spec.ts:119 | formal popups escape clipping, inherit themes and retain keyboard focus within viewport bounds | passed (1.882s) | passed (1.882s; 6 workers) |
| table.spec.ts:304 | cards share fields and menus while only checkboxes select records | passed (5.312s) | passed (5.312s; 6 workers) |
| table.spec.ts:457 | two toolbar rows keep the primary action fixed across views, filters and selection | passed (18.235s) | passed (18.235s; 6 workers) |
| tabs-visual-refinement.spec.ts:14 | default capped indicators cover every size, theme and position with short and long natural or equal content | timedOut (31.057s) | passed (20.840s; 1 workers) |
| tabs-visual-refinement.spec.ts:50 | the preview switches between capped and original stretch geometry without losing the selected panel | passed (22.567s) | passed (22.567s; 6 workers) |
| tabs-visual-refinement.spec.ts:131 | responsive orientation preserves Root identity, selection, panel drafts and direction keys on either side | passed (5.495s) | passed (5.495s; 6 workers) |
| tabs.spec.ts:280 | all 36 public recipes share exact heights, typography, count weight, paints and panel-facing indicators | passed (18.749s) | passed (18.749s; 6 workers) |
| tag-batch-three.spec.ts:51 | all complete size and appearance recipes retain geometry and popup paint in both themes | passed (9.433s) | passed (9.433s; 6 workers) |
| tag.spec.ts:9 | Tag compound paint matches real browser pixels across appearances and action states | passed (13.506s) | passed (13.506s; 6 workers) |

## Remaining default-run timeout and load attribution

`chromium › tabs-visual-refinement.spec.ts:14 › default capped indicators cover every size, theme and position with short and long natural or equal content` timed out in the six-worker recheck after 31.057s at `locator.evaluate`, line 25, against its unchanged 30000ms total budget. The test retains all 96 real click / geometry combinations across both themes, all sizes, four positions, natural/equal widths and short/long labels. There was no reported geometry assertion mismatch before the total-budget failure.

One explicitly requested isolated execution with one worker then completed the unchanged test in 20.840s under the original 30000ms deadline. This demonstrates sensitivity to execution load. It does not erase the full/default failures or establish the root cause of the other 20 initial failures that passed the selected recheck. No further retry chain was run.

- [Failure analysis and SHA-verified attachment paths](browser-recheck-failure-analysis.json)
- [Failure screenshot](browser-recheck-artifacts/tabs-visual-refinement-def-791b8-ng-natural-or-equal-content-chromium/test-failed-1.png)
- [Error context](browser-recheck-artifacts/tabs-visual-refinement-def-791b8-ng-natural-or-equal-content-chromium/error-context.md)
- [Trace](browser-recheck-artifacts/tabs-visual-refinement-def-791b8-ng-natural-or-equal-content-chromium/trace.zip)

## 737 original identities — source-aware latest view

| View | Actual passed | Unexpected failures | Expected failures | Capture skips |
| --- | ---: | ---: | ---: | ---: |
| Default recheck combined with untouched initial identities | 732 | 1 | 2 | 2 |
| Latest, including the explicitly requested one-worker final case | 733 | 0 | 2 | 2 |

The latest view takes 703 untouched identities from the full raw, 33 from the default recheck, and one from the single-worker run. It must be reported together with that provenance; full-suite execution at default parallelism still has preserved unexpected failures.

## Source and service boundaries

Tests ran only from `/private/tmp/rain-nav-w7-browser-20261006`, using its existing config and local 4173 / 4174 web servers. No product, test, assertion, deadline, tolerance, animation or config edits were made during these rechecks. The only run-setting override was the expressly requested final `--workers=1`. Both original retries values remained zero. The selected test files match source and clone. The config, G1 spec and adopted R2 CSS hashes match the run-start record afterward.

- R2 CSS: `6c3145aa2efafcbe0f10414b9de69989d7e5aad09823b4b646c02715424d6ee1`
- G1 spec: `78857cb453c90bfee7bd528352c7d3a32613c417446d94c82ef828e2f6f3011e`
- Config: `6d53f169b479de15aff9035c76377585540cb2620d8bf4067656dd3c94274678`

After each run, the managed services stopped; final listener inspection found no listener on 4173 or 4174. The accepted 5368 preview and actual source runtime were not used. Raw full JSON SHA stayed `32577fbf7585eaa84457d1413e269c5ac842360811ad0cfa40e0e7d1b72fdb26`.
