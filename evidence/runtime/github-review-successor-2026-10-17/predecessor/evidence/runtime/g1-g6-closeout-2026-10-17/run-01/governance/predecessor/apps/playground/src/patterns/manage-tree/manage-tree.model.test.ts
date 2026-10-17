import { describe, expect, it } from "vitest";
import { addTreeNode, removeTreeNode, renameTreeNode, treeChanges } from "./manage-tree.model";

const baseline = [{ key: "chapter", title: "章节", children: [{ key: "a", title: "A" }] }, { key: "other", title: "其他" }];
describe("ManageTree draft", () => {
  it("includes a business field update when title and other fields change together", () => {
    const before = [{ key: "a", title: "旧名", source: { note: "旧说明" } }];
    const after = [{ key: "a", title: "新名", source: { note: "新说明" } }];
    expect(treeChanges(before, after, (a, b) => (a.source as { note: string }).note === (b.source as { note: string }).note))
      .toEqual([{ type: "rename", key: "a", title: "新名" }, { type: "update", key: "a" }]);
  });
  it("inserts siblings after the current node and children at the end without changing committed data", () => {
    const sibling = addTreeNode(baseline, "chapter", "after", { key: "new", title: "新" });
    expect(sibling.map((node) => node.key)).toEqual(["chapter", "new", "other"]);
    expect(treeChanges(baseline, sibling)).toEqual([{ type: "add", key: "new", parentKey: null, index: 1 }]);
    const child = addTreeNode(baseline, "chapter", "inside", { key: "new", title: "新" });
    expect(child[0]?.children?.map((node) => node.key)).toEqual(["a", "new"]);
    expect(baseline[0]?.children?.map((node) => node.key)).toEqual(["a"]);
  });
  it("removes from draft immediately and cancels a temporary add in changeset", () => {
    const added = addTreeNode(baseline, "chapter", "after", { key: "tmp-1", title: "新" });
    const removed = removeTreeNode(added, "tmp-1");
    expect(treeChanges(baseline, removed)).toEqual([]);
    expect(renameTreeNode(baseline, "a", "新版")[0]?.children?.[0]?.title).toBe("新版");
  });
  it("collapses a removed subtree to one delete after descendant edits", () => {
    const changed = renameTreeNode(baseline, "a", "改名");
    const removed = removeTreeNode(changed, "chapter");
    expect(treeChanges(baseline, removed)).toEqual([{ type: "delete", key: "chapter" }]);
  });
});
