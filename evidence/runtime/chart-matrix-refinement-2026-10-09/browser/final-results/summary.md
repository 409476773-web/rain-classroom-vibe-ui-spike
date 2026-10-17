# Frozen-source final matrix browser regression

The unchanged 14-test suite passed in 38.9 seconds on the requested frozen renderer SHA-256 `b1a12de5bf827e281917038d96da829a539266637558e1401f71e3108250d9d3`.

`source-hashes.json` records hashes before and after the run for the renderer, matrix CSS, data encoding and test source. All four were identical. No source, test, cases or expectations changed during this run.

The suite confirms equal columns under normal/long titles at 6×6 and 12×12, narrow contained scrolling, shared bubble area and color scales, white plate-free labels, transparent heat readings, correct legends and legend linkage, one retained tooltip panel, direction-key inspection, viewport-triggered entry, continuous update/sort geometry and reduced motion.

The five independently reviewed regression cases also pass: clicked coordinates remain inspected; fresh keyboard inspection scrolls beyond the sticky heading into view; semester legend labels are exactly 1–8; growth waits until a glyph fits the actual painted circle; and heat text follows the better available tone throughout both fill-transition directions. The original 54-to-57 fitted label stays visible throughout update.

Painted-state changes and frame sampling occur inside one browser evaluation. The bubble capture includes the initial radius-zero/hidden-text frame, and both heat captures include their original endpoint fill/text before transitioning. No visible glyph overflows and no sampled heat frame chooses materially worse text contrast; numerical samples are in `painted-bubble-fit.json` and `painted-heat-tone.json`.

`playwright.log`, JSON facts and screenshots in this folder are from this frozen-source rerun. This is local Chromium evidence, not human visual acceptance, global contrast certification, real Safari/VoiceOver testing, sustained frame-rate validation, publication or business adoption.
