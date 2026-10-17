# Reference pointer diagnosis

Approved original HTML was actually opened and its table/album controls clicked. Switching to standalone native layout relocated the content under the pointer: table last row and album fifth card had :hover. Moving the pointer to (0,0) removed that state. Album background changed from #f7faff to #fff; neutral PNG pairs are byte-identical in both cases. Frozen HTML SHA stayed unchanged. No implementation styling was modified.

The canonical original captures remain unchanged. Neutral comparisons against candidate14-01 first PNG are separate in R6-table-neutral-comparison and R6-album-neutral-comparison. The grey/tinted cell/card is incidental hover, not fixed current/selection state.
