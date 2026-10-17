# Candidate snapshot, 2026-09-27T19:45:42Z

Command: `node scripts/navigation-v042-compare.mjs`. The route is the real React Playground at `http://127.0.0.1:5198/#navigation-v042`; sample buttons, width selection, global navigation, and tabs are operated through real DOM inputs. Candidate state is never set through evaluation.

No browser console errors or page errors occurred. Three R2 sizes and Connections produced comparisons with the immutable reference. The overall command exited **1** because A1 and A4 still had different screenshot heights; comparison correctly refused resizing. This is a review snapshot, not visual approval.

| Sample | Reference PNG | Candidate PNG | Comparison |
| --- | --- | --- | --- |
| R2 1440 | 1440 × 800 | 1440 × 800 | Mean channel difference 3.5849; pixels differing by more than 16: 4.3341% |
| R2 1200 | 1200 × 800 | 1200 × 800 | See `R2-default-1200-comparison/metrics.json` |
| R2 1600 | 1600 × 800 | 1600 × 800 | See `R2-default-1600-comparison/metrics.json` |
| A1 | 1320 × 355 | 1320 × 361 | Different heights; no resized comparison |
| A4 | 1320 × 377 | 1320 × 382 | Different heights; no resized comparison |
| Connections | 1320 × 396 | 1320 × 396 | Mean channel difference 3.0885; pixels differing by more than 16: 8.5543% |

R2 screenshots snap the crop origin to an integer pixel to preserve exactly 800 output rows. The candidate has a fractional studio offset y=189.1875; no image is resized. Crop and real element rectangles are recorded separately. The 1600-wide candidate uses an 1800-wide browser viewport so the studio gutter does not clip the artboard; its recipe remains exactly 1600 × 800. Reference and candidate use the same installed Chromium 151, DPR 1, zh-CN locale, and reduced motion.

Earlier snapshots remain intact: `19-42-22-073Z` exposed the ignored navigation stylesheet import and content overflow; `19-44-05-445Z` confirmed the stylesheet fix but retained the overflowing bottom notice. The current snapshot includes the later content-height correction. It is normal for current live source to be newer than any snapshot; inspect source hashes in `comparison-report.json`.

Remaining sample geometry was traced to local styles: reference `.sub` is 12/18; candidate paragraph was 13/19.5. Reference mini-list margin-top is 11px; candidate was 15px. Reference final mini-list row has no bottom border and no forced 41px minimum. These are evidence for the owner's next correction, not a license to crop content or alter the frozen reference.

Every case has candidate DOM/computed/geometry data and selected-control records. `*.geometry-difference.json` compares rectangles relative to their own artboard; matching positions do not imply matching icons, colors, glyphs, or design acceptance. View side-by-side, overlay, and difference images at 100% before G1.
