import { expect, it } from "vitest";
import { allocateTabsOverflow } from "./tabs-overflow";
const base = { widths: [100, 100, 100, 100, 100, 100], availableWidth: 320, moreWidth: 20, gap: 0, frameInline: 0, anchorIndex: 1, previous: null } as const;
it("grows a retained interval with extra space, preserves its anchor and removes More when all fit", () => {
  expect(allocateTabsOverflow(base)).toEqual({ mode: "more", start: 0, end: 2 });
  expect(allocateTabsOverflow({ ...base, previous: [0, 2], availableWidth: 520 })).toEqual({ mode: "more", start: 0, end: 4 });
  expect(allocateTabsOverflow({ ...base, previous: [0, 4], availableWidth: 320 })).toEqual({ mode: "more", start: 0, end: 2 });
  expect(allocateTabsOverflow({ ...base, availableWidth: 600 })).toEqual({ mode: "all", start: 0, end: 5 });
});
it("shifts just enough to reveal the anchor, counts the final gap and frame, and falls back only for insufficient space", () => {
  expect(allocateTabsOverflow({ ...base, previous: [0, 2], anchorIndex: 4 })).toEqual({ mode: "more", start: 2, end: 4 });
  expect(allocateTabsOverflow({ ...base, widths: [80, 80, 80], availableWidth: 176, moreWidth: 80, gap: 8, frameInline: 4, anchorIndex: 0 })).toEqual({ mode: "more", start: 0, end: 0 });
  expect(allocateTabsOverflow({ ...base, availableWidth: 119 })).toEqual({ mode: "scroll", reason: "insufficient-width" });
  expect(allocateTabsOverflow({ ...base, widths: [], anchorIndex: 0 })).toEqual({ mode: "all", start: 0, end: -1 });
});
it("rejects invalid measurements and indexes without hiding all tabs", () => {
  for (const patch of [{ widths: [-1] }, { availableWidth: NaN }, { moreWidth: Infinity }, { gap: -2 }, { frameInline: -1 }, { anchorIndex: 6 }, { anchorIndex: 1.5 }, { previous: [-1, 2] }, { previous: [3, 1] }]) {
    expect(() => allocateTabsOverflow({ ...base, ...patch } as any)).toThrow();
  }
});
it("fits every unequal-width interval and keeps the anchor across a deterministic width sweep", () => {
  const widths = [40, 71, 103, 62, 121, 48];
  for (let anchorIndex = 0; anchorIndex < widths.length; anchorIndex++) {
    let previous: readonly [number, number] | null = null;
    for (let availableWidth = 150; availableWidth < 650; availableWidth += 7) {
      const result = allocateTabsOverflow({ ...base, widths, gap: 8, frameInline: 4, moreWidth: 46, anchorIndex, previous, availableWidth });
      if (result.mode === "scroll") { expect(widths[anchorIndex]! + 46 + 8 + 4).toBeGreaterThan(availableWidth); continue; }
      expect(result.start).toBeLessThanOrEqual(anchorIndex); expect(result.end).toBeGreaterThanOrEqual(anchorIndex);
      const cost = widths.slice(result.start, result.end + 1).reduce((a, b) => a + b, 0) + (result.end - result.start) * 8 + 4 + (result.mode === "more" ? 54 : 0);
      expect(cost).toBeLessThanOrEqual(availableWidth);
      previous = [result.start, result.end];
    }
  }
});
