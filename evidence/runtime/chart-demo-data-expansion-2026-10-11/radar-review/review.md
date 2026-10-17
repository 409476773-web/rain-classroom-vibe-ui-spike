# Default radar terminal-state review

The current default radar opens correctly in both normal motion and reduced motion at widths 1440 and 390. All three nondegenerate data polygons reach the five metric values in the exact table. The collapsed central points in the original before/after captures are an early screenshot state, not the final data shape. This review changed no application source.

The live service was verified as PID 75834, serving this worktree's `apps/playground` at `http://127.0.0.1:5173/#chart-radar`. Each fresh page used normal state, revision zero, the `monochrome-blue` recipe, Asia/Shanghai timezone and the same fixed wall-clock time as the main capture. The target was `[data-rain-id="chart-radar"]`.

| Mode and viewport | First two-RAF sample | Stable confirmation after that sample | Terminal polygon bounding boxes, in local SVG units |
| --- | --- | --- | --- |
| Normal, 1440 | All three boxes 0 × 0 | 2271 ms | 174.61 × 176.52; 182.60 × 168.74; 149.51 × 181.49 |
| Reduced, 1440 | All three boxes 0 × 0 | 1197 ms | 174.61 × 176.52; 182.60 × 168.74; 149.51 × 181.49 |
| Normal, 390 | All three boxes 0 × 0 | 2261 ms | 162.97 × 164.76; 170.43 × 157.50; 139.54 × 169.39 |
| Reduced, 390 | All three boxes 0 × 0 | 660 ms | 162.97 × 164.76; 170.43 × 157.50; 139.54 × 169.39 |

The reported times are relative to each page's first sample and include three consecutive 100-ms stable confirmations; they are not animation-duration or performance claims. The 390 reduced page had spent more time loading before its first sample. Each terminal coordinate differed from its expected value by at most `1.43e-14`; all coordinates were finite. Normal and reduced modes reached identical terminal paths at each viewport. No page errors occurred.

The existing default caller passes `animate=false` and a zero-duration enter transition in reduced mode but retains the default radar enter budget and stagger. `RadarArea` consequently computes delays of approximately 0.60, 0.75 and 0.90 seconds; `useMountProgress` applies those delays even when the supplied duration is zero. The official variants separately set a zero enter budget and zero stagger. The default `RadialExample` function is byte unchanged from this round's baseline (function SHA-256 `3aebcb09eeffcfb19691b855256ebe071c005948e667382caa5ff7927691aaef`), and all nine radar/animation renderer and hook files retain their baseline hashes. This explains the early reduced-mode snapshot without attributing it to the new demo values. Reduced-mode immediacy was not changed or newly certified here.

All fourteen recorded input/caller/renderer source hashes were unchanged during the browser review. `facts.json` contains before/current source hashes, caller-function hashes, initial and terminal geometry, exact table values, intermediate samples and media-query state. `run.log` records the four successful terminal checks. The browser process was closed at completion.

Use `normal-1440-stable.png`, `reduced-1440-stable.png`, `normal-390-stable.png` and `reduced-390-stable.png` as the current radar visual evidence. The matching `*-two-raf.png` files preserve the early collapsed state for diagnosis. The original collapsed before screenshot does not establish the old data's final visual shape, so it should not be used to score the radar's before/after data improvement.
