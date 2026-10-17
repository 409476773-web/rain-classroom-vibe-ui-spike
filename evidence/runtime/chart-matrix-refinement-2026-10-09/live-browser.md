# Existing in-app browser observations

Read and interacted with the user's existing tab4 at http://127.0.0.1:5173/#chart-business using CUA, after confirming this server serves card-v2. Observations after final renderer changes at viewport890px:

- Five matrix fixtures render. Normal cell counts:168,24,36,36,24. Bubble six-column widths:119px each.
- Visible bubble readings (19) use rgb(255,255,255) and rgba(0,0,0,0) background. Final screenshot visually confirms depth/size differences, contained white digits, equal centers and bottom-aligned25/50/100 legend.
- Semester legend text is exactly1–8. ArrowRight after dismissing inspection exposes exact category/college and7 in the stable TooltipBox.
- Normal, zero, missing, invalid, empty, single and long state selections were exercised and normal restored. Zero kept valid zeros and explicit missing semester states; missing added one missing coordinate per fixture. Invalid rendered an explicit error and no matrices; empty rendered no matrices. Single rendered one cell per fixture. Page width stayed890px equal to viewport for every state.
- The final user-facing tab remains open. Earlier immediate screenshot during viewport entry was transient; the settled view was separately inspected.

These manual observations complement the14 Chromium regression cases; they do not replace human visual acceptance or real-device testing.
