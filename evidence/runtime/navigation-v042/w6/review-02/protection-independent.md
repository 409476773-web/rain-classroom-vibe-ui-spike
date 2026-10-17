# W6 review02 independent protection

Recorded 2026-10-04T17:11:08.520174+00:00. Result: **passed-scoped-protection-validation**. No unauthorized runtime-source change or addition found. This final checkout record includes the authorized placeholder correction and root closeout phase update.

- Start snapshot: **2275/2284** hashes match; **9** differences comprise the original **8** authorized E2/E3 source/CSS, E4 pin wiring, selector-role test and exporter files, plus authorized `status/current-phase.yaml` closeout metadata.
- Packages **2105/2105**, Foundations **38/38**, shared CSS **25/25**, old R1–R6/S1–S6 **30/30**, Registry **33/33**, manifests **93/93** remain exact; no new protected-root file.
- HEAD unchanged: `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`. Four older W8/review01 source/preview ZIP SHA values all match the start record.
- Current final source freeze **97/97** matches; new immutable source/preview ZIP checks passed. Full inventory and runtime mapping are recorded in `archive-independent.json/md`.

## Direct comparison with review01 ZIP entries

- E1 scope data, rows and resource function are byte-identical.
- E5 directory and both instance functions, including selected object and draft state, are byte-identical; shared local helper file remains unchanged.
- Original consumer CSS **11817 bytes** remains the exact current prefix. All **48** appended rule lines are scoped to E2 `.w6-interaction-workspace`.
- E4 differs only in `ReplayRecovery`: read `viewportWidth`, set `data-workspace-action="pin"`, and pass `viewportWidth` to `PIN_TEMP`. The remaining source and all E4 CSS/type files match.
- E6 source, CSS, type declaration and test are unchanged. Three new E2/E3/E4 unit files are authorized; no tests were rerun by this reviewer.

## Final placeholder and closeout lineage

The first protection observation recorded grading source SHA `fe2d4f0b5b68d8897e99df94f78bb399a86ed9d708dc18f705437281da952689`. Final SHA is `2f70ba3ba73c920c0a2ab4beb2d307c0a61fad53e54a25aad06d85904f307eee`: reversing only `placeholder="分数"` to `placeholder="输入分数"` reproduces the first SHA exactly. Current checkout, frozen ZIP and final independent source summary agree. The package's first protection snapshot is deliberately historical; its attached placeholder lineage and final summary establish the final source.

Root authorized the new `currentHumanReview02` phase child, G3-review-02 report, round README index, latest progress pointer and CHANGELOG as closeout metadata. Only the phase file intersects this protection baseline; it is classified explicitly. These records do not change frozen runtime bytes or ZIP hashes.

## Historical reporter integrity incident

The old config pointed to unavailable **5198** and overwrote canonical `w6/browser-results.json` with **0 passed /13 unexpected**. Its bytes exactly match preserved `review-02/compat-browser-wrong-config-results.json`; all thirteen failures are connection refusal, and the wrong log remains. No runtime-baseline or old-archive change resulted.

`browser-after-lifecycle-results.json` is **not** an exact historical final backup: start **09:18:52.023Z**, **12 passed /1 unexpected**, retaining the E3 locator failure. Historical `browser-final.log` and contemporaneous `independent-review.json` instead record **09:20:08.289Z**, **13 passed /0 unexpected**, **10.884966s**. Exact final JSON recovery is unproven, so the backup was not copied and historical JSON was not regenerated.

Correct current-round evidence is `review-02/compat-browser-results.json`, config `navigation-v042-w6-review02-compat.config.ts`, source **5204**: **13 passed /0 unexpected**, start **16:43:45.030Z**. This result was inspected, not rerun here.

Only assigned evidence files were written. Source/package/ZIP/Git and historical evidence were not changed. This scoped audit does not grant Human Gate, contrast, assistive-technology, Registry/publication or migration acceptance.
