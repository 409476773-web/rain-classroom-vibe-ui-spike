export interface OverflowInput {
  widths: readonly number[]; availableWidth: number; moreWidth: number; gap: number; frameInline: number;
  anchorIndex: number; previous: readonly [start: number, end: number] | null;
}
export type OverflowResult = { mode: "all" | "more"; start: number; end: number } | { mode: "scroll"; reason: "insufficient-width" };

export function allocateTabsOverflow({ widths, availableWidth, moreWidth, gap, frameInline, anchorIndex, previous }: OverflowInput): OverflowResult {
  if (![...widths, availableWidth, moreWidth, gap, frameInline].every(value => Number.isFinite(value) && value >= 0)) throw new Error("Tabs overflow requires finite non-negative measurements");
  const length = widths.length;
  if (!length) return { mode: "all", start: 0, end: -1 };
  if (!Number.isInteger(anchorIndex) || anchorIndex < 0 || anchorIndex >= length) throw new Error("Invalid Tabs overflow anchor");
  if (previous && (!previous.every(Number.isInteger) || previous[0] < 0 || previous[0] > previous[1] || previous[1] >= length)) throw new Error("Invalid previous Tabs interval");
  const prefix = [0]; for (const width of widths) prefix.push(prefix.at(-1)! + width);
  const cost = (start: number, end: number) => prefix[end + 1]! - prefix[start]! + (end - start) * gap;
  if (cost(0, length - 1) + frameInline <= availableWidth) return { mode: "all", start: 0, end: length - 1 };
  const budget = availableWidth - frameInline - moreWidth - gap;
  if (widths[anchorIndex]! > budget) return { mode: "scroll", reason: "insufficient-width" };
  let [start, end] = previous ?? [anchorIndex, anchorIndex];
  if (anchorIndex < start) { end -= start - anchorIndex; start = anchorIndex; }
  if (anchorIndex > end) { start += anchorIndex - end; end = anchorIndex; }
  while (cost(start, end) > budget) {
    if (anchorIndex - start > end - anchorIndex) start++; else end--;
  }
  while (true) {
    let expanded = false;
    if (end + 1 < length && cost(start, end + 1) <= budget) { end++; expanded = true; }
    if (start > 0 && cost(start - 1, end) <= budget) { start--; expanded = true; }
    if (!expanded) break;
  }
  return { mode: "more", start, end };
}
