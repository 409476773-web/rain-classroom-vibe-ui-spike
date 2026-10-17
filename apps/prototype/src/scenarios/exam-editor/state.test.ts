import { expect, it } from "vitest";
import { moveQuestions } from "./state";

it("moves stable question objects before/after a target, preserves source order and rejects invalid/no-op moves", () => {
  const items = ["a", "b", "c", "d", "e"].map((id, i) => ({ id, score: i + 1 }));
  const cases: [string[], string, "before" | "after", string][] = [
    [["a"], "d", "after", "bcdae"],
    [["e"], "b", "before", "aebcd"],
    [["d", "b"], "e", "after", "acebd"],
    [["d", "b"], "a", "before", "bdace"],
    [["b", "c"], "d", "before", "abcde"],
    [["a"], "a", "after", "abcde"],
    [["a"], "missing", "before", "abcde"],
    [["missing"], "a", "before", "abcde"],
    [["a", "b", "c", "d", "e"], "c", "after", "abcde"],
    [[], "d", "after", "abcde"],
  ];
  for (const [ids, target, side, order] of cases) {
    const result = moveQuestions(items, ids, target, side);
    expect(result.map(q => q.id).join("")).toBe(order);
    expect(result).toHaveLength(items.length);
    result.forEach(q => expect(q).toBe(items.find(original => original.id === q.id)));
    if (order === "abcde") expect(result).toBe(items);
  }
  expect(items.map(q => q.id).join("")).toBe("abcde");
});

it("gathers scattered questions around a selected reference without changing their order or its position", () => {
  const items = ["a", "b", "c", "d", "e", "f", "g"].map(id => ({ id }));
  const cases: [string, string][] = [["b", "abdfceg"], ["d", "acbdfeg"], ["f", "acebdfg"]];
  for (const [target, order] of cases) {
    for (const side of ["before", "after"] as const) {
      const result = moveQuestions(items, ["f", "d", "b"], target, side);
      expect(result.map(q => q.id).join("")).toBe(order);
      expect(result.findIndex(q => q.id === target)).toBe(items.findIndex(q => q.id === target));
      expect(result).toHaveLength(items.length);
      result.forEach(q => expect(q).toBe(items.find(original => original.id === q.id)));
    }
  }
  expect(moveQuestions(items, ["b", "c", "d"], "c", "after")).toBe(items);
  expect(items.map(q => q.id).join("")).toBe("abcdefg");
});
