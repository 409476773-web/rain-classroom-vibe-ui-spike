# W6 review02 independent archive validation

Recorded 2026-10-04T17:11:08.520174+00:00. Result: **passed-independent-archive-validation**; no blocking archive or runtime-source difference found. Snapshot: `navigation-v042-f43719b448cf6043`.

| Archive | Bytes | Regular files | SHA-256 |
| --- | ---: | ---: | --- |
| Source | 8,921,634 | 2,299 | `b47ff2c4097c1c595fba445ea2df9ecaac2f7ac47c6e7eb926b53ea5773384b5` |
| Built preview | 6,358,329 | 84 | `8cc34af48a772664d09c1281b0e5901a09ad3a357b1f8313d073c1366c48af51` |

Both full CRC checks passed. Paths have no escape, absolute/drive/backslash path, duplicate or normalized alias; entries contain no symlink or special file. The source ZIP contains no `node_modules` or `dist`. Safe extraction used unique `/private/tmp/navigation-review02-independent-hr3_o657`; the actual extracted `node scripts/check-source.mjs --archive-ready` exited **0** and printed the expected snapshot.

## Frozen source and dependency closure

- Extracted checker verified **2,288** locked files. The **2,299** ZIP files additionally include generated verification/helper records; these are separate inventories.
- All **97/97** current checkout freeze hashes match. **90/90** distributed freeze inputs match extracted bytes. The **7** checkout-only inputs are the Gallery page CSS/TSX, old W3 sample CSS/type/TSX, `manifests/ui/navigation-menu.yaml`, and the original exporter. All were also excluded from original W8/review01, none belongs to this package's runtime closure; exporter provenance records its source hash.
- The closure has **370** source files and **795** local edges. All **370** runtime nodes match current export-plan bytes, extracted package bytes and locked SHA values; zero mapping discrepancy.
- Root dependency declarations, app manifest, original lockfile and all three package manifests match. No dependency installation was performed.

## Preview and final evidence attribution

All **84** preview files exactly match the current companion folder. **83** HTML/assets files exactly match the compiled `apps/playground/dist`; the only extra file is `README.md`. The package has no remaining dependency directory, cache-link marker or symlink. The retained package record reports all **38** temporary dependency links removed.

Packaged final source evidence is byte-identical to the root's final independent summary: **60/60**, twenty contracts per Chromium/Firefox/WebKit, **69** original-size screenshots, no runtime exception, zero source changes during the final run. All **17** local consumer hashes in that summary match the extracted source. The packaged built-preview result is likewise byte-identical to its root record, names this snapshot and reports all **18** R/S/E routes plus actual E2/E3/E4/E6 interactions with zero browser errors or failed responses. These browser and **133 unit / four-workspace type/build** results were inspected, not rerun here.

The final local placeholder correction `输入分数` → `分数` is proven as a single-field change by reversing that exact extracted field and recovering prior SHA `fe2d4f0b5b68d8897e99df94f78bb399a86ed9d708dc18f705437281da952689`. Current checkout, extracted source and final source summary agree on SHA `2f70ba3ba73c920c0a2ab4beb2d307c0a61fad53e54a25aad06d85904f307eee`. Packaged first protection evidence intentionally retains its earlier observation; the appended placeholder lineage and final summary cover the final version.

## Historical protection and limits

All four original W8/review01 ZIP SHA values remain unchanged, and HEAD remains `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`. The corrected checkout protection audit separately classifies only authorized review02 source/test/exporter changes and root closeout metadata; no public-package, Foundations, shared CSS, old R/S, Registry or manifest change was found.

Only the four assigned review02 evidence files were written. No package, ZIP, implementation, root archive index, historical reporter record or Git change was made; no browser or user **5368** UI was controlled. Human Gate remains open.
