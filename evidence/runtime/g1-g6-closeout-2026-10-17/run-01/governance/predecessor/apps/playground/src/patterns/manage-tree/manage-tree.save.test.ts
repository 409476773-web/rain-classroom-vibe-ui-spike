import { describe, expect, it } from "vitest";
import { assertSaveSuccess, mapViewState } from "./manage-tree.save";

describe("ManageTree save response", () => {
  it("maps all view keys and removes deleted keys from checks and scroll anchors", () => {
    const next = mapViewState({ expandedKeys: ["tmp-1", "gone"], selectedKeys: ["tmp-1"], focusedKey: "gone",
      checkState: { directCheckedKeys: ["tmp-1", "gone"], intents: [{ key: "tmp-1", scope: "subtree", action: "include" }, { key: "gone", scope: "node", action: "exclude" }] },
      scrollAnchor: { key: "tmp-1", offset: -7, scrollLeft: 12 } }, [{ key: "real", title: "新增" }], { "tmp-1": "real" });
    expect(next).toEqual({ expandedKeys: ["real"], selectedKeys: ["real"], focusedKey: "real", checkState: { directCheckedKeys: ["real"], intents: [{ key: "real", scope: "subtree", action: "include" }] }, scrollAnchor: { key: "real", offset: -7, scrollLeft: 12 } });
  });
  const submitted = [{ key: "tmp-1", title: "新增" }];
  it("requires a complete canonical tree and mapping for temporary keys", () => {
    expect(() => assertSaveSuccess(submitted, { status: "success", treeData: [{ key: "real", title: "新增" }], revision: "2" })).toThrow(/keyMap/i);
    expect(() => assertSaveSuccess(submitted, { status: "success", treeData: [{ key: "real", title: "新增" }], revision: "2", keyMap: { "tmp-1": "real" } })).not.toThrow();
    expect(() => assertSaveSuccess(submitted, { status: "success", treeData: [{ key: "real", title: "A" }, { key: "real", title: "B" }], revision: "2", keyMap: { "tmp-1": "real" } })).toThrow(/duplicate/i);
  });
  it("rejects a success response that silently drops an unchanged node", () => {
    expect(() => assertSaveSuccess([{ key: "keep", title: "保留" }, ...submitted],
      { status: "success", treeData: [{ key: "real", title: "新增" }], revision: "2", keyMap: { "tmp-1": "real" } })).toThrow(/missing/i);
  });
  it("rejects a temporary key mapped onto another submitted node", () => {
    expect(() => assertSaveSuccess([{ key: "keep", title: "保留" }, ...submitted],
      { status: "success", treeData: [{ key: "keep", title: "保留" }], revision: "2", keyMap: { "tmp-1": "keep" } })).toThrow(/duplicate|collision/i);
  });
});
