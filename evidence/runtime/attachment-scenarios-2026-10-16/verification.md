# Attachment confirmed-scene implementation verification — 2026-10-16

Implemented the confirmed ordinary upload, compact draft input, scrollable attachment dialog and media grid at `http://127.0.0.1:5473/#attachment` in `.worktrees/card-v2`. Candidate remains unpublished and awaiting_human; selecting the design did not accept the running implementation.

## Scope and behavior

- Shared List: default/sm density, horizontal/vertical card, list/wrap/grid collection, default/draft actions; outlined/filled surfaces remain independent. Wide compact drafts retain inline size; narrow ones prioritize identity/removal. Known progress uses a64px/4px short track and percentage under the name, replacing normal size; no extra spinner or bottom full-width bar.
- Media: inset16:9 real thumbnails without format corner badges; unavailable thumbnails retain file identity. Eligible ready video opens a native player; permission/type/source restrictions and media errors fall back explicitly. No media framework/dependency added.
- Page scenes:24 ordinary/dialog and12 draft/media examples, fold/view-all, full-state summaries, failed-only retry, state retention while folded/closed, local message echo and actual file picker/downloads. Counts are examples, not product caps.
- The primitive Attachment source/CSS, upload controller, resource helper, XHR adapter, file utility/types, formal file icon mapping and dependencies were preserved. Eight separate generated photos and one derived4-second H.264 clip have honest provenance and actual byte counts.

## Fresh checks

-263 targeted unit tests passed across13 files (`tests/final-unit.log`). RED/GREEN logs cover List behavior, video lifecycle, page controllers, short progress, wide draft size and the3/4-item narrow fold repair.
-26 distinct browser cases:24 main desktop/narrow cases plus2 narrow-fold boundary cases. Final8 affected cases were repeated after geometry/density fixes, including real MP4 playback and byte-correct download, thumbnail fallback, light/dark layout,40px compact rows, wide/narrow size visibility, and3/4-item access. Reports: `browser/report.json`, `browser-fold/report.json`, `browser-final-visual/report.json`. No failures/skips/flakes in these passing reports.
- UI, Playground and test-source TypeScript checks and Playground build passed (`tests/compile-results.json`). Existing broad Playground bundle-size warning remains; this is not a new whole-project performance acceptance.
- CUA inspected actual desktop and360px views, restored the normal browser viewport, and captured native context evidence. Final fresh reload had no warning/error entries (`screenshots/console-final.json`).
- Paired source/render QA is recorded in root `design-qa.md`; all scoped P1/P2 findings were repaired. Independent review confirmed closure; `independent-review.md` records its scope.

## Boundaries

The local Playground transport and draft sending are simulations/local echo. Real multipart integration is verified only by the existing local test fixture; production service, server permissions/quota/content scanning, persistence, Safari/codecs, VoiceOver, physical touch, zoom and formal contrast remain separate work. No Figma writeback, publication, migration, commit, push or PR was performed. Original G6 denominator remains12; no whole-G6 or whole-library acceptance is claimed.

The baseline, source bindings, standalone verifier, selected references, generated asset provenance, screenshots and comparison boards are local to this increment. Earlier functional, visual and icon-feedback evidence remains historical and unmodified.
