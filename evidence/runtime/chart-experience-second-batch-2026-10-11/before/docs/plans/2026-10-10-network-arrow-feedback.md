# Network arrow feedback

Goal: restore the original arrow appearance in both NetworkChart views, following the user's 2026-10-10 feedback. System Mode, existing unpublished candidate; no layout, route, data, palette, public API or dependency change.

Source: live read-only Figma CH-083 `MbWg1ft5zk1JRQiQ6dS30e / 2905:47096`. Vector `2905:47150` has 1.5px stroke and `ARROW_EQUILATERAL`; its exported triangle is 7.5px long and 8.66021px high. Current code uses a fixed 5px hollow chevron, which differs in shape and proportion. Use the solid equilateral triangle with length 5× line width and height 5.7735× line width, automatically aligned to the curve's end. Reuse the relation color and path opacity; highlighted line width also scales the head. Keep the tip at the existing endpoint so clearance and layout remain unchanged.

Scope: shared marker markup, the existing marker-units expectation, browser evidence destination, README/Manifest/current phase, and separate evidence. Six targets copied before their respective edits to `/tmp/rain-network-arrow-20261010-before`; geometry/layout/example/fixture hashes protected. V05 keeps appearance with behavior; I02 preserves independent direction, relationship type, and exact data. This is a reversible marker-only visual change: update the broken existing expectation and use regression checks and real browser inspection, without adding tests that mirror marker literals.

Validate both views, solid/dashed/dotted relations, color, selection, normal/reduced motion, endpoint clearance and real browser appearance; run relevant unit, browser, UI typecheck and standard builds. Current visual feedback is not acceptance of the revised arrows or publication. No Git/Figma write/release/migration.
