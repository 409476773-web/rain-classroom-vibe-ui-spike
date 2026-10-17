function segment(value: string) {
  // Supported browsers must provide Intl.Segmenter; code-point fallback would split visible characters.
  return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(value)]
    .map((entry) => entry.segment);
}

/** Preserve untouched text when limiting a paste, replacement or IME commit. */
export function limitGraphemeEdit(previous: string, next: string, maxLength: number) {
  const before = segment(previous);
  const after = segment(next);
  const ceiling = Math.max(maxLength, before.length);
  if (after.length <= ceiling) return next;
  let prefix = 0;
  while (prefix < before.length && prefix < after.length && before[prefix] === after[prefix]) prefix++;
  let suffix = 0;
  while (suffix < before.length - prefix && suffix < after.length - prefix
    && before[before.length - 1 - suffix] === after[after.length - 1 - suffix]) suffix++;
  return [
    ...after.slice(0, prefix),
    ...after.slice(prefix, prefix + Math.max(0, ceiling - prefix - suffix)),
    ...after.slice(after.length - suffix),
  ].join("");
}

export function countGraphemes(value: string) {
  return segment(value).length;
}

export function limitGraphemes(value: string, maxLength: number) {
  if (!Number.isFinite(maxLength)) return value;
  return segment(value).slice(0, Math.max(0, Math.floor(maxLength))).join("");
}
