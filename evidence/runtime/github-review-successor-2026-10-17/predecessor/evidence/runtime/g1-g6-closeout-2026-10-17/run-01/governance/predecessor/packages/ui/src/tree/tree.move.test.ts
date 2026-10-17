import { describe, expect, it } from "vitest";
import { buildTree } from "./tree.model";
import { applyTreeMove, validateTreeMove } from "./tree.move";

describe("Tree move", () => {
  const data = [{ key: "a", title: "A", children: [{ key: "a1", title: "A1" }] }, { key: "b", title: "B", canHaveChildren: true, children: [] }, { key: "c", title: "C" }];
  it("rejects self, descendants and true leaf inside; allows loaded empty branches", () => {
    const index = buildTree(data);
    expect(validateTreeMove(index, "a", "a", "before").ok).toBe(false);
    expect(validateTreeMove(index, "a", "a1", "inside").ok).toBe(false);
    expect(validateTreeMove(index, "a", "c", "inside").ok).toBe(false);
    expect(validateTreeMove(index, "a1", "b", "inside").ok).toBe(true);
  });
  it("calculates sibling index after removal and immutably applies the source subtree", () => {
    const index = buildTree(data);
    const move = validateTreeMove(index, "a", "c", "after");
    expect(move).toMatchObject({ ok: true, proposal: { nextParentKey: null, nextIndex: 2 } });
    if (!move.ok) throw Error("expected move");
    expect(applyTreeMove(data, move.proposal).map((node) => node.key)).toEqual(["b", "c", "a"]);
    expect(data.map((node) => node.key)).toEqual(["a", "b", "c"]);
  });
  it("keeps the whole moved subtree when the empty destination has no children property", () => {
    const nodes = [data[0]!, { key: "empty", title: "空分支", canHaveChildren: true }];
    const move = validateTreeMove(nodes, "a", "empty", "inside");
    if (!move.ok) throw Error(move.reason);
    expect(applyTreeMove(nodes, move.proposal)).toEqual([{ ...nodes[1], children: [nodes[0]] }]);
    expect(nodes).toHaveLength(2);
  });
  it("does not invent an append index for an incomplete destination", () => {
    expect(validateTreeMove([{ key: "a", title: "A" }, { key: "remote", title: "远程", canHaveChildren: true, childrenComplete: false }], "a", "remote", "inside"))
      .toMatchObject({ ok: false, reason: expect.stringContaining("目标") });
  });
  it("refuses a stale proposal instead of dropping its source", () => {
    const current = buildTree(data);
    const valid = validateTreeMove(current, "a", "b", "inside");
    if (!valid.ok) throw Error("expected move");
    expect(() => applyTreeMove(data.filter((node) => node.key !== "b"), valid.proposal)).toThrow(/stale|invalid/i);
  });
  it("checks the deepest descendant and rejects incomplete source subtrees", () => {
    const index = buildTree([{ key: "deep", title: "深", children: [{ key: "child", title: "子", children: [{ key: "grand", title: "孙" }] }] },
      { key: "target", title: "目标", children: [{ key: "inside", title: "内", canHaveChildren: true, children: [] }] }]);
    expect(validateTreeMove(index, "deep", "inside", "inside", { maxDepth: 3 })).toMatchObject({ ok: false, reason: expect.stringContaining("层级") });
    const partial = buildTree([{ key: "part", title: "待加载", canHaveChildren: true, childrenComplete: false }, { key: "target", title: "目标", canHaveChildren: true, children: [] }]);
    expect(validateTreeMove(partial, "part", "target", "inside")).toMatchObject({ ok: false, reason: expect.stringContaining("完整") });
  });
});
