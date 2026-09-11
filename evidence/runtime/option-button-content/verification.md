# OptionButton 32: results and content verification

2026-09-08. User accepted the base selection visuals with “视觉没问题。推进下一步” and authorized the next [planned batch](../../../docs/plans/2026-09-08-option-button-content-implementation.md). The first batch is accepted only for `option-button-32-selection-visual-only`; this batch has its own review, now accepted on 2026-09-08 as recorded below.

## Final requested behavior

- Reuse native OptionButton/OptionGroup for readonly answer review, hidden/published results, judgment options and image/chart cards. Radio/checkbox values remain controlled, independently grouped and submittable. Readonly prevents changes while allowing focus; disabled retains its separate behavior.
- Show evaluation only for selected options with explicitly visible feedback. No unselected correct answer or unanswered-answer inference. Feedback does not set aria-invalid.
- The user subsequently corrected: “选项按钮，回顾时，不显示下方的小字。并且颜色应该是，对应色系的fill + 反白文字或icon”. This replaces the first draft's pale fills, colored letters and visible captions for option review only. Final bodies use existing Green/Red Solid/2 + OnColor/1, selected weight 700, no border; normal themes have no result caption or additional result icon. Meaning remains in an accessible description.
- Judgment content uses the user's explicitly selected library `icon/check-bold` and `icon/close-bold` (available catalog nodes `71:48` and `71:51`), never a substitute Unicode character. The body glyph remains the chosen option's meaning. Only selected color changes for published evaluation.
- System forced-colors maps checked controls to Highlight. Only in this mode, the normally hidden result description becomes system-colored text, so results remain visually distinguishable without reintroducing captions in Light/Dark.
- Image/chart content is local authored documentation material; the two SVGs use the established Light paper/token values and UI font stack. They are not library icons. Image, letter and text share exactly one native input. Following the user's hierarchy correction, the 32 px identity stays in the left column, while text and media share the right content column with the same left edge. Media-only options use that same content column; plain text rows preserve their original layout. Adaptive card columns use existing Space/32 × 8, no new token.

## Verification log

- New behavior tests initially failed: 3 failures / 6 existing passes, `/tmp/option-content-red.log`. Shared implementation then passed 9 tests. Readonly checkbox click exposed a double rollback when canceling click alongside React controlled restoration; the final change handler restores checked state without canceling click, and readonly forms remain correct.
- Component + page checks passed 21 tests (9 + 12), `/tmp/option-content-focused.log`.
- Scoped Chromium matrix passed 11 tests after the requested visual correction, `/tmp/option-content-browser.log`; it checks original geometry, grouping/keyboard, readonly forms, no disclosure, meaningful images and narrow layout. Final rerun also covers the forced-colors correction below.
- Independent review found mixed-caption vertical misalignment (11 px), reproduced by `/tmp/option-content-alignment-red.log`; caption removal restores the original 44 px geometry, and group items now align at the top.
- Card layout initially referred to nonexistent Space/128; live-browser failure led to using actual Space/32 × 8. SVG naturalWidth is browser-resolved when only viewBox is supplied, so the image check verifies loading and the actual 480/260 aspect ratio instead of assuming a fixed naturalWidth.
- Forced-color result visibility has a failing regression at `/tmp/option-content-forced-red.log`; a narrow system-color-only CSS rule restores its distinguishability. Keyboard focus checks use keyboard modality, not a pointer-focused element.

## Recorded contrast review — accepted exceptions as of 2026-09-08

The requested Solid/2 + OnColor/1 pairing has these actual ratios: Light Green 2.683, Light Red 3.601; Dark Green 6.318, Dark Red 6.363. Text requires 4.5; meaningful judgment glyphs require 3. The new content scope therefore contains **9 accepted exception combinations**: Light Green text and glyph on each of three standard host surfaces, and Light Red text on those surfaces. Opaque control fills make these host ratios equal, but each actual registered context remains explicit. They are user-accepted exceptions, not passing contrast measurements. Earlier pale-fill/caption findings were removed when that implementation was replaced. QuestionNumber's 93 combinations are accepted separately; both sets retain their original measured values.

Implementation, automated checks, independent review findings and visual acceptance remain separate. No new token, dependency, business migration, publication, Figma write or Git action occurred.

## Final checks and review materials

- Full governance passed: `/tmp/option-content-governance.log`. Icon integrity passed for all 899 existing assets: `/tmp/option-content-icons.log`.
- Type checking and production build passed: `/tmp/option-content-types.log`, `/tmp/option-content-build.log`.
- Full unit/integration regression: **46 files, 953 tests passed** with `pnpm test --maxWorkers=2`, `/tmp/option-content-tests.log`. No test or contrast threshold was loosened.
- Full Chromium regression: **72 tests passed**, including all 11 OptionButton checks and the final system-contrast fallback, `/tmp/option-content-e2e.log`. The earlier scoped final matrix also passed 11/11. Normal-theme assertions explicitly require 44 px standalone roots, white identity content, no body border, and the result description outside visible layout.
- Runtime materials: [Light](light.png), [Dark](dark.png), [390 px narrow layout](compact.png), captured from the real documentation route. The final rendered Light/Dark/narrow layouts were visually inspected; this is implementation verification, not the user's visual acceptance.
- Phase/manifest/registry keep the base selection Human Gate accepted, and separately record this batch as automated passed / findings / awaiting_human. The 9 contrast findings prevent a fully closed implementation status; no outstanding visual or contrast review is silently promoted to accepted.
- Final independent review found no remaining functional issue after the alignment and forced-colors fixes; an independent run of component/page checks passed 21/21. The 9 color-contrast findings remain open. Governance passed again after the final metadata synchronization: `/tmp/option-content-final-governance.log`.

## Follow-up: specified judgment icons and media hierarchy

The later user screenshots explicitly identify check-bold/close-bold and require the image to visually belong to its option like the text. The corresponding shared-component changes are described above, and Registry/icon mappings and documentation were synchronized without changing global icon rules.

- Updated icon regression first failed against the old asset: `/tmp/option-content-icons-media-red.log`.
- Latest scoped component/page tests passed **21/21**, with the page independently rechecked **12/12**. Logs: `/tmp/option-content-icons-media-tests.log`. The media test clicks B's image, then A's text, and verifies single selection transfers to A.
- Type checking and production build passed again: `/tmp/option-content-icons-media-types.log`, `/tmp/option-content-icons-media-build.log`.
- Latest OptionButton browser matrix passed **11/11**, `/tmp/option-content-icons-media-browser.log`. It verifies exact requested icon assets, text/image left alignment and their offset beyond the 32 px identity, native choice behavior and 390 px layout. The Light/Dark/narrow screenshots were refreshed for this revision.
- Independent structural review found no remaining issue: text+media and media-only paths share one native input and label, while plain text rows preserve their original path. The earlier full 953/72 regression belongs to the immediately preceding revision; this follow-up ran the affected checks above.
- Governance passed again on this revision: `/tmp/option-content-icons-media-governance.log`. The 9 result-color pending combinations remain unchanged.

## Follow-up: Playground entry displays the overview

- Reproduced in the user's existing 5173 tab: clicking “体验 OptionButton 选项按钮” changed the URL to `#option-button`, but displayed `overview-title`. The link itself was correct.
- The running server used this checkout and served an App module containing the OptionButton route. A full reload of the same tab displayed `option-button-title`; returning to Components and clicking the real entry then worked. This identifies stale browser runtime as the immediate cause; the precise missed-update mechanism was not established. No production routing or component change was necessary.
- Updated the existing browser matrix to enter through the actual Components link on every test, rather than navigating directly to the target hash. Added keyboard entry, focus, back/forward and reload coverage. **12/12 Chromium checks passed**, `/tmp/option-entry-browser.log`.
- This repairs the local preview session and adds navigation regression coverage. Existing visual acceptance and pending contrast findings remain unchanged.


## Content and contrast acceptance · 2026-09-08

The user confirmed “选项按钮：基础选择和六档尺寸已验收；结果、只读、判断、图文已实现，对比度完成验收。” This closes the current results, readonly, judgment and media batch with its disclosed contrast exceptions. `contentRefinement` is now implementation completed / automated passed / independent review passed / Human Gate accepted; the earlier pending-stage log above is retained as history. The independent implementation review had no functional finding remaining before this contrast acceptance.

`contrastAcceptance` is limited to `option-button-content-declared-contrast-combinations-only`: 9 combinations, fingerprint `93eec9a4677e563320da4ffc5ded2111baadd2c25c7d3556709a8c39548a2d33`. Validation matches the exact reported measurements, roles, themes and parents, then returns the same records as user-accepted exceptions with their unrounded values. The normal 4.5:1 text and 3:1 meaningful-icon thresholds remain active; this acceptance cannot apply to base selection, Input or future pairings. Colors, sizes, native behavior and media alignment are unchanged. Nothing is published, migrated to business, written to Figma or committed.
