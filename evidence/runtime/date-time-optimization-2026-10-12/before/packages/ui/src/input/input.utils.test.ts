import { describe, expect, it } from "vitest";

import { countGraphemes, limitGraphemes, limitGraphemeEdit } from "./input.utils";

describe("Input grapheme utilities", () => {
  it("counts visible characters instead of UTF-16 code units", () => {
    expect(countGraphemes("雨A👨‍👩‍👧‍👦e\u0301")).toBe(4);
  });

  it("does not split an emoji family or combining character", () => {
    expect(limitGraphemes("A👨‍👩‍👧‍👦e\u0301B", 3)).toBe("A👨‍👩‍👧‍👦e\u0301");
    expect(limitGraphemes("课程", 0)).toBe("");
  });

  it("limits only an insertion and never deletes an existing tail or backfilled overflow", () => {
    expect(limitGraphemeEdit("abcdef", "abcde", 4)).toBe("abcde");
    expect(limitGraphemeEdit("abcdef", "abXcdef", 4)).toBe("abcdef");
    expect(limitGraphemeEdit("abcdef", "abXYZef", 4)).toBe("abXYef");
    expect(limitGraphemeEdit("abcd", "abXcd", 4)).toBe("abcd");
    expect(limitGraphemeEdit("AB", "A👨‍👩‍👧‍👦e\u0301B", 3)).toBe("A👨‍👩‍👧‍👦B");
  });
});
