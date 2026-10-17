# W3 comparison: first implementation observation

This initial run captured 24 candidate/reference pairs and computed geometry/style differences. It is preserved as before-fix evidence, not approval. The reference stayed unchanged and no page errors were observed. Native comparison reviews preserve pixels, top-left align and white-pad unequal-size images; no image is scaled. Those padded metrics must not be reported as exact parity.

This run used element screenshots, whose fractional candidate y added one pixel to recipe PNG height. The script was subsequently corrected to snapshot integer native CSS dimensions and crop canonical source screenshots only within new comparison outputs; source screenshots remain unchanged. `white-default` also originally selected W1 alone while its canonical source case is the full W1/W2 two-column container. These are collection mismatches, not candidate design findings. A corrected run must supersede this initial run for final metrics.

Actual side-by-side images were opened for A3, A5, C3, C5, W3; standalone R1-plan and R3-errors candidate images were also inspected. Findings forwarded to the root: A3 option width +20px each; C3 missing content padding/min-height; C5 preview geometry/shape and trailing action; A5 lower-content spacing and passive content. R1/R3 fixed recipe frames match 1200/1440/1600 ×800 CSS sizes, while local platform/module/graph/table/metadata visuals still differ. See per-case geometry JSON and before-fix images.

Reference authority: `evidence/runtime/navigation-v042/w3/reference/2026-10-01T10-40-10-888Z`; source SHA `d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`. No baseline override, Human Gate or accessibility approval is implied.
