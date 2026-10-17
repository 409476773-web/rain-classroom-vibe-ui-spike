# G3/W6 review-01 independent protection check

Recorded 2026-10-04T15:51:03.778Z. Result: **passed-scoped-protection-validation**. No unauthorized protected-source difference or addition found. Only these two evidence records were written; no tests, source edits, export or archive operation was performed.

- Start snapshot: **2269/2275** hashes unchanged. The **6** changes are authorized W6 consumer/test/CSS work. No file is missing.
- All packages **2105/2105**, Foundations **38/38**, shared CSS **25/25**, old R1–R6/S1–S6 folder **30/30**, Registry **33/33** and manifests **93/93** match the baseline. No new file appears in these protected roots.
- HEAD remains `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`.

## Authorized local differences

- `apps/playground/src/recipes/navigation-w6/review-workbench.test.tsx`: authorized-W6-review01-consumer-change.
- `apps/playground/src/recipes/navigation-w6/scenes.test.tsx`: authorized-W6-review01-consumer-change.
- `apps/playground/src/recipes/navigation-w6/scenes.tsx`: authorized-W6-review01-consumer-change.
- `apps/playground/src/recipes/navigation-w6/consumer.css`: authorized-W6-review01-consumer-change.
- `apps/playground/src/recipes/navigation-w6/review-workbench.css`: authorized-W6-review01-consumer-change.
- `apps/playground/src/recipes/navigation-w6/review-workbench.tsx`: authorized-W6-review01-consumer-change.

Eight new W6 module/CSS/type/test files are within the declared review01 scope; their paths and hashes are recorded in JSON. The exporter supports a named new destination without replacing its default. Its full prior bytes are outside the 2275-file baseline, so this review records the current script hash and destination inspection only.

## E5 byte preservation

The original W8 scene/CSS reference files match both the protection baseline and original source-lock. The whole `const directory` plus `IsolationPane` and `InstanceIsolation` tail is **2711 bytes, byte-identical**, preserving object choices and both drafts. Moved `sideRegion` and `workspaceSpec` signatures/bodies are identical; only export and location differ. The original consumer stylesheet (**7467 bytes**) remains the exact current-file prefix. All E5 selectors and the existing E5 test tail are byte-identical; appended stylesheet content adds no E5 selector.

## Original W8 archives

- `artifacts/navigation-v042-2026-10-04.zip`: **unchanged**, SHA-256 `4f39ec4e0a37fbe551707d4676953d4eb026224e3dca0009ff88213e84c9c04f`.
- `artifacts/navigation-v042-2026-10-04-built-preview.zip`: **unchanged**, SHA-256 `1573e3f41d01d09f3476460ef1f59b21ac3c0182f9652e29c0e62aead1e835cc`.

The new review01 candidate export/ZIP check remains pending root notification. This check does not grant G3 appearance or behavior acceptance, and treats later root phase/G3 report updates as authorized documentation.
