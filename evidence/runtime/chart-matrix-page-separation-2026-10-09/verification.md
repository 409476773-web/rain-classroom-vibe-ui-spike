# 分类矩阵页面归属调整 — 2026-10-09

Status: completed local technical delivery. This is a page organization change to the unpublished candidate; no new visual/contrast acceptance or publication.

User authorization: “把分类矩阵的组件和实例，从迷你小图表页面，统一都放到‘分类矩阵’页中（2者不要混在一起）”; interrupted work was explicitly resumed with “继续完成”. Worktree: existing dirty `codex/card-v2`, preserved unrelated changes.

Plan and method: `docs/plans/2026-10-09-matrix-page-separation.md`, System Mode. V05 preserves behavior during composition changes; I02 groups figures, legends and readings by their information relationship. Existing documentation surfaces and public MatrixChart are reused.

## Result

- `/#chart-matrix` owns component documentation and all five existing examples: weekday/hour intensity, course/version semesters, course similarity, category/college quantities, support levels.
- Existing state, recipe, update, replay and4/6/12 similarity scale controls remain on that page. A matrix-specific “反转行列顺序” action preserves the old reversal behavior with an accurate label.
- `/#chart-business` contains bar/mini/embedding examples only. Its state and source settings no longer contain matrix scale; its download files no longer include matrix examples/data.
- Matrix downloads render MatrixExamples directly, retain current state/revision/scale/order, include all five examples and contain no mini component/data files. State typing uses existing chart-data; its raw GeoJSON file is retained solely to close that shared source file's import, and does not create a map example. Shared CSS is reused.
- Private helper paths stay compatible. Shared renderer, motion, palette, typography and dependency declarations are unchanged. Documentation and manifest record the unique matrix page entry.

## Checks

| Check | Result | Evidence |
| --- | --- | --- |
| Download regression baseline |2 expected failures,6 passed before implementation |`download-baseline.log` |
| Fixtures, mini contracts and business/matrix download isolation |96 passed /6 files |`unit.log` |
| Exporter extraction and final manifest/source contracts |7 passed /2 files; includes5 repeated catalog checks |`source-contract.log` |
| Unique scoped unit total |98 |96 plus2 additional extractor checks |
| Playground typecheck/build |passed; existing large-chunk warnings retained |`playground-build.log` |
| Real Chromium page ownership and unchanged matrix interaction suite |15 passed in42.3s |`browser.log`, `browser/page-ownership.json` |
| Isolated downloaded entries |9 matrix states/scales,1 business,1 mini: closure/type/build passed |`consumption/facts.json`, `isolated-consumption.log` |
| Existing in-app browser |matrix heading and five fixtures with zero mini gallery; business heading, zero matrices and one mini gallery; business file selector has no matrix files; matrix preview restored |CUA observations, `browser/matrix-page.png` |

The prior14-case interaction suite moved from `#chart-business` to `#chart-matrix`, with only route/control names and evidence path updated. The added page-ownership case checks both page contents and visible download selectors. Original checks for equal columns, narrow contained scrolling, fit/tone during transitions, tooltip/keyboard behavior, legends, sorting, viewport entry and reduced motion remain intact and pass.

Isolation reused the earlier temporary dependency-cache host, recopied full current UI/Foundation sources and built11 new entry files. It is not a clean installation, minimum single-item installation or11 additional browser checks. Source and exporter drift assertions passed. Snapshot hashes are recorded in `final-source-hashes.json`; the temporary verifier is removed after verification.

## Boundaries

No public MatrixChart API or token change, dependency installation, Figma operation, production migration, publication, Git commit/push or PR. Shared worktree changes remain local. Real Safari/VoiceOver and global contrast were not rechecked; existing matrix visual Human Gate and contrastAcceptance remain pending/not-granted. No new reusable visual method was introduced.
