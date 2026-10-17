import { describe, expect, it } from "vitest";
import type { TreeNodeRecord } from "./tree.types";
import { buildTree, normalizeTree, visibleTree } from "./tree.model";

describe("Tree model", () => {
  it("keeps numeric and string keys distinct and rejects duplicate, cyclic and contradictory nodes", () => {
    const index = buildTree([{ key: 1, title: "数字" }, { key: "1", title: "文字" }]);
    expect(index.entries.size).toBe(2);
    expect(() => buildTree([{ key: 1, title: "a" }, { key: 1, title: "b" }])).toThrow(/duplicate/i);
    const loop: TreeNodeRecord = { key: "loop", title: "循环" };
    loop.children = [loop];
    expect(() => buildTree([loop])).toThrow(/cycle/i);
    expect(() => buildTree([{ key: "leaf", title: "叶", canHaveChildren: false, children: [{ key: "child", title: "子" }] }])).toThrow(/children/i);
    expect(buildTree([{ key: "unknown", title: "待加载", childrenComplete: false }]).entries.get("unknown")?.canHaveChildren).toBe(true);
  });

  it("uses visible structure for search and connector endings", () => {
    const index = buildTree([{ key: "root", title: "根", children: [
      { key: "a", title: "苹果" }, { key: "b", title: "香蕉" }, { key: "c", title: "草莓" },
    ] }]);
    expect(visibleTree(index, new Set(["root"]), "香").map((row) => [row.key, row.lastSibling]))
      .toEqual([["root", true], ["b", true]]);
    expect(visibleTree(index, new Set(["root"]), "remote", "filter", undefined, ["c"]).map((row) => row.key)).toEqual(["root", "c"]);
    expect(() => visibleTree(index, new Set(), "remote", "filter", undefined, ["missing"])).toThrow(/match/i);
  });

  it("adapts business fields without mutating or dropping the original object", () => {
    type RawNode = { id: string | number; name: string; items: RawNode[] };
    const raw: RawNode[] = [{ id: "unit", name: "单元", items: [{ id: 9, name: "任务", items: [] }] }];
    const normalized = normalizeTree(raw, { getKey: (node) => node.id, getTitle: (node) => node.name, getChildren: (node) => node.items });
    expect(normalized[0]?.children?.[0]?.key).toBe(9);
    expect(normalized[0]?.source).toBe(raw[0]);
    expect(raw[0]?.items[0]?.name).toBe("任务");
  });
  it("does not draw an ancestor continuation between separate roots", () => {
    const index = buildTree([{ key: "r1", title: "一", children: [{ key: "child", title: "子" }] }, { key: "r2", title: "二" }]);
    expect(visibleTree(index, new Set(["r1"]))[1]?.continuingAncestors).toEqual([]);
  });
  it("keeps every ancestor axis in a last-child chain through collapse and filtering", () => {
    const index = buildTree([{ key: "root", title: "根", children: [{ key: "branch", title: "分支", children: [
      { key: "inner", title: "内层", children: [{ key: "leaf", title: "目标" }] },
    ] }] }, { key: "other", title: "另一棵树" }]);
    const expanded = new Set(["root", "branch", "inner"]);
    expect(visibleTree(index, expanded).map(({ key, continuingAncestors }) => [key, continuingAncestors]))
      .toEqual([["root", []], ["branch", []], ["inner", [0]], ["leaf", [0, 1]], ["other", []]]);
    expect(visibleTree(index, expanded, "目标").at(-1)?.continuingAncestors).toEqual([0, 1]);
    expect(visibleTree(index, new Set(["root", "branch"])).map((row) => row.key)).toEqual(["root", "branch", "inner", "other"]);
  });
  it("continues the correct parent axis through a preceding sibling's descendants", () => {
    const index = buildTree([{ key: "root", title: "根", children: [
      { key: "a", title: "第一分支", children: [{ key: "deep", title: "深层", children: [{ key: "leaf", title: "叶" }] }] },
      { key: "b", title: "第二分支" },
    ] }]);
    const rows = visibleTree(index, new Set(["root", "a", "deep"]));
    expect(rows.find((row) => row.key === "deep")?.continuingAncestors).toEqual([0]);
    expect(rows.find((row) => row.key === "leaf")?.continuingAncestors).toEqual([0, 1]);
    expect(rows.find((row) => row.key === "b")?.continuingAncestors).toEqual([]);
  });
});
