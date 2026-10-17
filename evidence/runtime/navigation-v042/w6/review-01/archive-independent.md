# Review01 independent archive validation

Recorded 2026-10-04T16:12:14.917Z. Result: **passed-independent-archive-validation**. This reviewer wrote only these two evidence files. The archives, package contents and root archives index were not modified.

- Source ZIP: **2289 files**; SHA-256 `578617c2f6e03ee529f9103166c1822fad2f3a05327a08c3e26525cd441eaa02` matches the supplied frozen hash.
- Built-preview ZIP: **83 files**; SHA-256 `05084015b6b4fb79d06f9f0d712fcfa656fe13310ab0d860ae769f97e5526e52` matches the supplied frozen hash.
- Both ZIPs passed full-entry CRC inspection, with **0** symbolic links, special-file entries, duplicate names or unsafe/escaping paths. Inspection preceded extraction into the unique `/private/tmp/navigation-review01-independent-wndt5jk6` directory.
- Source has **0 node_modules or dist paths**. From the independent extraction, `node scripts/check-source.mjs --archive-ready` exited **0** and returned `navigation-v042-9c407f01596518eb`, matching the expected snapshot. The **2281** locked files agree. Of the broader 91-file checkout freeze, all **84 distributed files match**; seven non-runtime paths retain the original W8 exclusion policy (Gallery samples/metadata and the source generator recorded in provenance). They are absent from the runtime closure and export plan. No package files were written.
- All **83** preview HTML/assets are byte-identical to the current built-preview directory and compiled dist. The JSON records every preview file SHA-256.

## Browser evidence attribution

The existing `built-preview-results.json` was read without repeating the browser run. Its packaged copy is byte-identical; the packaged verification summary identifies the same archive snapshot. It records Chromium at `http://127.0.0.1:5371`, all **18 R/S/E routes**, E3 input/keyed draft, E4 chapter/temporary state, E6 restore/explicit save and reset-storage checks, with **0 page errors and 0 bad responses**. The reported 69 three-engine cases, 13 compatibility cases, 126 unit checks, four workspace type checks and build pass were inspected in the package summary, not rerun here. Human approval remains false/pending.

## Original W8 protection

- `artifacts/navigation-v042-2026-10-04.zip`: **unchanged**, SHA-256 `4f39ec4e0a37fbe551707d4676953d4eb026224e3dca0009ff88213e84c9c04f`.
- `artifacts/navigation-v042-2026-10-04-built-preview.zip`: **unchanged**, SHA-256 `1573e3f41d01d09f3476460ef1f59b21ac3c0182f9652e29c0e62aead1e835cc`.

No install, source change, export, browser action or Git mutation was performed. This archive check does not expand Human Gate, full-project quality, contrast or assistive-technology acceptance. Later authorized phase/progress documentation may change outside this frozen snapshot.

The supplementary freeze comparison uses package inventory scope: a checkout-wide freeze is not a requirement to distribute every Gallery/reference file. The JSON records all seven exclusions, their absence from runtime closure, and their unchanged original-W8 treatment. No package defect or archive rewrite was found.
