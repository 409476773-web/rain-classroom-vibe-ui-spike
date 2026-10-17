import { describe, expect, it } from "vitest";
import { buildTree } from "./tree.model";
import { projectChecks, reconcileChecks, toggleCheck } from "./tree.selection";
import type { CheckState } from "./tree.types";

const empty: CheckState = { directCheckedKeys: [], intents: [] };
describe("Tree checks", () => {
  it("retains an ordinary checked leaf when an asynchronous branch inherits new children", () => {
    const first = buildTree([{ key: "plain", title: "普通" }, { key: "lazy", title: "异步", canHaveChildren: true, childrenComplete: false }]);
    const leaf = toggleCheck(first, empty, "plain", "cascade");
    const withParent = toggleCheck(first, leaf, "lazy", "cascade");
    const loaded = buildTree([{ key: "plain", title: "普通" }, { key: "lazy", title: "异步", children: [{ key: "new", title: "新" }] }]);
    expect(projectChecks(loaded, withParent, "cascade").checkedKeys).toEqual(["plain", "lazy", "new"]);
  });

  it("passes a restricted parent to independently eligible descendants and honors exclusions", () => {
    const index = buildTree([{ key: "root", title: "根", children: [
      { key: "hidden", title: "不参与", checkable: false, children: [{ key: "child", title: "可参与" }] },
      { key: "locked", title: "受限", checkDisabled: true, children: [{ key: "grand", title: "可参与" }] },
    ] }]);
    const state = toggleCheck(index, empty, "root", "cascade");
    expect(projectChecks(index, state, "cascade").checkedKeys).toContain("child");
    expect(projectChecks(index, state, "cascade").checkedKeys).toContain("grand");
    expect(projectChecks(index, state, "cascade").checkedKeys).not.toContain("hidden");
    const excluded = toggleCheck(index, state, "child", "cascade");
    expect(projectChecks(index, excluded, "cascade").checkedKeys).not.toContain("child");
  });

  it("rejects a non-exact strategy in independent mode and stays in the selected scope", () => {
    const index = buildTree([{ key: "root", title: "根", children: [{ key: "leaf", title: "叶" }] }]);
    expect(() => projectChecks(index, empty, "independent", "all", "leaf")).toThrow(/exact/i);
    const checked = toggleCheck(index, empty, "leaf", "cascade", "leaf");
    expect(projectChecks(index, checked, "cascade", "exact", "leaf").checkedKeys).toEqual(["leaf"]);
  });

  it("does not revive an included child after its parent is excluded and later loaded", () => {
    const old = buildTree([{ key: "root", title: "根", children: [{ key: "child", title: "子", canHaveChildren: true, childrenComplete: false }] }]);
    const selected = toggleCheck(old, empty, "child", "cascade");
    const cleared = toggleCheck(old, selected, "root", "cascade", "all", false);
    const next = buildTree([{ key: "root", title: "根", children: [{ key: "child", title: "子", children: [{ key: "new", title: "新" }] }] }]);
    expect(projectChecks(next, cleared, "cascade").checkedKeys).toEqual([]);
  });

  it("keeps a previously checked node when it becomes locked while clearing writable descendants", () => {
    const open = buildTree([{ key: "root", title: "根", children: [{ key: "locked", title: "节点", children: [{ key: "grand", title: "孙" }] }] }]);
    const included = toggleCheck(open, empty, "root", "cascade");
    const restricted = buildTree([{ key: "root", title: "根", children: [{ key: "locked", title: "节点", checkDisabled: true, children: [{ key: "grand", title: "孙" }] }] }]);
    const excluded = toggleCheck(restricted, included, "root", "cascade", "all", false);
    expect(projectChecks(restricted, excluded).checkedKeys).toContain("locked");
    expect(projectChecks(restricted, excluded).checkedKeys).not.toContain("grand");
  });

  it("does not select an initially locked node when checking its parent", () => {
    const index = buildTree([{ key: "root", title: "根", children: [{ key: "locked", title: "锁", checkDisabled: true, children: [{ key: "grand", title: "孙" }] }] }]);
    const state = toggleCheck(index, empty, "root", "cascade");
    expect(projectChecks(index, state).checkedKeys).not.toContain("locked");
    expect(projectChecks(index, state).checkedKeys).toContain("grand");
  });

  it("never projects branch-only intent onto newly loaded leaves", () => {
    const old = buildTree([{ key: "root", title: "根", canHaveChildren: true, childrenComplete: false }]);
    const state = toggleCheck(old, empty, "root", "cascade", "branch");
    const loaded = buildTree([{ key: "root", title: "根", children: [
      { key: "branch", title: "支", canHaveChildren: true, children: [] }, { key: "leaf", title: "叶" },
    ] }]);
    expect(projectChecks(loaded, state, "cascade", "exact", "branch").checkedKeys).toEqual(["root", "branch"]);
  });
  it("does not propagate stale cascade intents in independent mode", () => {
    const index = buildTree([{ key: "root", title: "根", children: [{ key: "child", title: "子" }] }]);
    const state: CheckState = { directCheckedKeys: ["root"], intents: [{ key: "root", scope: "subtree", action: "include" }] };
    expect(projectChecks(index, state, "independent").checkedKeys).toEqual(["root"]);
    expect(projectChecks(index, toggleCheck(index, state, "root", "independent"), "independent").checkedKeys).toEqual([]);
  });
  it("lets newly loaded writable descendants inherit without checking their disabled parent", () => {
    const before = buildTree([{ key: "root", title: "根", canHaveChildren: true, childrenComplete: false }]);
    const checked = toggleCheck(before, empty, "root");
    const after = buildTree([{ key: "root", title: "根", children: [{ key: "locked", title: "受限", checkDisabled: true, children: [{ key: "free", title: "可勾" }] }] }]);
    expect(projectChecks(after, checked).checkedKeys).toEqual(["root", "free"]);
  });
  it("retains the source subtree check intent across a parent change", () => {
    const before = buildTree([{ key: "a", title: "A", children: [{ key: "child", title: "子" }] }, { key: "b", title: "B", canHaveChildren: true }]);
    const after = buildTree([{ key: "a", title: "A", canHaveChildren: true }, { key: "b", title: "B", children: [{ key: "child", title: "子" }] }]);
    for (const checkedParent of ["a", "b"]) {
      const state = toggleCheck(before, empty, checkedParent);
      const next = reconcileChecks(before, after, state);
      expect(projectChecks(after, next).checkedKeys.includes("child")).toBe(checkedParent === "a");
    }
  });
  it("preserves an inherited check when an already loaded node becomes disabled", () => {
    const lazy = buildTree([{ key: "root", title: "根", canHaveChildren: true, childrenComplete: false }]);
    const state = toggleCheck(lazy, empty, "root");
    const loaded = buildTree([{ key: "root", title: "根", children: [{ key: "child", title: "子" }] }]);
    const locked = buildTree([{ key: "root", title: "根", children: [{ key: "child", title: "子", checkDisabled: true }] }]);
    expect(projectChecks(locked, reconcileChecks(loaded, locked, state)).checkedKeys).toContain("child");
  });
  it("does not turn an aggregated moved parent into a future subtree inclusion", () => {
    const before = buildTree([{ key: "p", title: "P", children: [{ key: "a", title: "A" }] }, { key: "q", title: "Q", canHaveChildren: true }]);
    const selected = toggleCheck(before, empty, "a");
    const moved = buildTree([{ key: "q", title: "Q", children: [{ key: "p", title: "P", children: [{ key: "a", title: "A" }] }] }]);
    const state = reconcileChecks(before, moved, selected);
    const later = buildTree([{ key: "q", title: "Q", children: [{ key: "p", title: "P", children: [{ key: "a", title: "A" }, { key: "b", title: "B" }] }] }]);
    expect(projectChecks(later, state).checkedKeys).toEqual(["a"]);
  });
  it("moves inherited checks through a disabled branch without turning its node exclusion into a subtree exclusion", () => {
    const branch = { key: "locked", title: "受限", checkDisabled: true, children: [{ key: "child", title: "可勾" }] };
    const before = buildTree([{ key: "a", title: "A", children: [branch] }, { key: "q", title: "Q", canHaveChildren: true }]);
    const selected = toggleCheck(before, empty, "a");
    const moved = buildTree([{ key: "a", title: "A", canHaveChildren: true }, { key: "q", title: "Q", children: [branch] }]);
    const state = reconcileChecks(before, moved, selected);
    expect(projectChecks(moved, state).checkedKeys).toContain("child");
    expect(projectChecks(moved, state).checkedKeys).not.toContain("locked");
  });
});
