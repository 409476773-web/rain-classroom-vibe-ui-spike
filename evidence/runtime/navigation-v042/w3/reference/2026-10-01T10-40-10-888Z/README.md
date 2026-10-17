# W3 immutable reference capture

Authoritative run: `2026-10-01T10-40-10-888Z`. Frozen source SHA-256: `d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`; checked before and after, unchanged.

Command from `.worktrees/card-v2`:

```sh
RAIN_REFERENCE_URL=http://127.0.0.1:5199/reference/approved-v0.4.2.html node scripts/navigation-v042-w3-reference.mjs
```

Exit 0. Existing installed Chromium/Playwright, macOS arm64, DPR 1, zh-CN, reduced motion. No dependency installation. `inspect=native`, `polish=refined`, browser contour/current connection. Recipe artboards are 1440×800. Component crops preserve their original CSS dimensions in the 1600px browser viewport; they are not stretched to 1440. Each JSON records its actual rectangle and viewport.

20 cases captured twice with identical SHA-256 screenshot hashes: A2-default, A2-queue, A3-default, A5-default, contents-default, C2-info, C3-identity, C4-summary, C5-preview, white-default, W2-soft, W3-outlined, R1-plan, R1-industry, R3-files, R3-errors, A3-inverse, A3-compact, A5-info, A5-summary. Zero page errors.

10 real DOM interactions captured and asserted: A2 function/student, A3 chart/paper, A5 activity/topic, R1 module/chart, R3 files/errors module. R1/R3 mode setup also uses actual recipe-mode buttons before switching to standalone capture, ensuring business mode and navigation selection agree. Diagnostics only configure artboard; source remains immutable.

Files: `*-pass1.png`/`*-pass2.png`, per-capture computed-style/geometry/pseudo-element/SVG-path JSON and DOM fragments, `capture-report.json`, focused `computed-summary.json`. A3-default/inverse, A5-default, A2-queue, C4-summary, R1-plan and R3-errors screenshots were actually opened for visual inspection.

Measured final styles:

| Part | Original geometry and styles |
| --- | --- |
| A2 function | 40px minimum row, padding 8px 10px, gap 10px, 14px/20px; list gap 3px |
| A2 full queue | 76px observed rows, padding 16px, gap 10px, zero list gap, straight edges; selected #edf1f7, 2px right brand marker |
| A3 regular | 32px outer, padding 3px, gap 2px, radius 6px; button 26px, padding 0 12px, radius 4px, 13px/18px |
| A3 compact | 30px outer / 24px button, unchanged padding/gap/font |
| A3 inverse | Outer white at 7.5% plus inset 1px white at 8.6%; current #2c6ced/white; normal #bdc7d8 |
| A5 strip | Padding 16px, gap 10px, #f5f6f8 |
| A5 object | 300px preferred basis, min180/max360, observed 300×89 main / 284×89 half sample; padding13px 16px, radius7, border1 #dfe4ec |
| A5 current | White, border #7ea4f2 plus .5px inset outline; no old side accent or floating shadow |
| A5 title/meta | Title14px/20px normal500 #303946/current600 #1f50b0, margin-bottom8; meta12px/18px #667180, gap8 |
| A5 progress | 3px height, margin-top12; track#e8edf3, fill#9baecb/current#6e94d8 |

Source observations: A3 uses radiogroup/radio; A5 uses group/button aria-pressed. Source label-key selection is only a reference behavior, not the required stable-ID component contract. C4 summary content and A5 default use the same two activities; source categorizes these current short titles as `data-content=compact`. No synthetic long titles or new summary design were inserted.

Earlier runs remain separate: `2026-10-01T10-36-58-694Z` records the initial incorrect URL timeout, and `2026-10-01T10-37-47-240Z` is a file capture before actual recipe-mode setup; R1-industry/R3-errors from that run are superseded because mode assignment alone preserved old seed navigation selection. Use this authoritative HTTP run for candidate comparisons.

These are source observations, not candidate parity, accessibility approval, or a Human Gate decision.
