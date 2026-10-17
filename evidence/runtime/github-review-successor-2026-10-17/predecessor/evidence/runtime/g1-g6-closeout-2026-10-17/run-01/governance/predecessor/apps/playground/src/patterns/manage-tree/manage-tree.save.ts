import { validateTreeData, type TreeKey, type TreeNodeRecord } from "@rain-next/ui";
import type { ManageTreeViewState, SaveResponse } from "./manage-tree";

export function mapViewState(view: ManageTreeViewState, data: readonly TreeNodeRecord[], mapping?: Extract<SaveResponse, { status: "success" }>["keyMap"]): ManageTreeViewState {
  const existing = new Set<TreeKey>();
  function visit(nodes: readonly TreeNodeRecord[]) { for (const node of nodes) { existing.add(node.key); visit(node.children ?? []); } }
  visit(data);
  const mapKey = (key: TreeKey) => mapping instanceof Map ? mapping.get(key) ?? key : (mapping as Record<string, TreeKey> | undefined)?.[String(key)] ?? key;
  const mapKeys = (keys: readonly TreeKey[]) => keys.map(mapKey).filter((key) => existing.has(key));
  const focused = view.focusedKey === null ? null : mapKey(view.focusedKey);
  const anchor = view.scrollAnchor ? { ...view.scrollAnchor, key: mapKey(view.scrollAnchor.key) } : null;
  return { expandedKeys: mapKeys(view.expandedKeys), selectedKeys: mapKeys(view.selectedKeys),
    focusedKey: focused === null || existing.has(focused) ? focused : data[0]?.key ?? null,
    checkState: { directCheckedKeys: mapKeys(view.checkState?.directCheckedKeys ?? []), intents: (view.checkState?.intents ?? []).map((intent) => ({ ...intent, key: mapKey(intent.key) })).filter((intent) => existing.has(intent.key)) },
    scrollAnchor: anchor && existing.has(anchor.key) ? anchor : null };
}

export function assertSaveSuccess(submitted: readonly TreeNodeRecord[], result: Extract<SaveResponse, { status: "success" }>): void {
  if (result.status !== "success" || !Array.isArray(result.treeData) || !result.revision) throw new Error("Save success requires a complete tree and revision");
  validateTreeData(result.treeData);
  const canonical = new Set<TreeKey>();
  const temporary: TreeKey[] = [];
  function visit(nodes: readonly TreeNodeRecord[], output: Set<TreeKey> | TreeKey[]) {
    for (const node of nodes) {
      if (output instanceof Set) output.add(node.key);
      else if (typeof node.key === "string" && node.key.startsWith("tmp-")) output.push(node.key);
      visit(node.children ?? [], output);
    }
  }
  visit(result.treeData, canonical); visit(submitted, temporary);
  const mapped = new Set<TreeKey>();
  const keyMapping = new Map<TreeKey, TreeKey>();
  for (const key of temporary) {
    const next = result.keyMap instanceof Map ? result.keyMap.get(key) : (result.keyMap as Record<string, TreeKey> | undefined)?.[String(key)];
    if (next === undefined || next === key || !canonical.has(next)) throw new Error(`Save success requires keyMap for ${String(key)}`);
    if (mapped.has(next)) throw new Error("Save keyMap contains duplicate targets");
    mapped.add(next);
    keyMapping.set(key, next);
  }
  const submittedKeys = new Set<TreeKey>();
  visit(submitted, submittedKeys);
  for (const [key, target] of keyMapping) if (target !== key && submittedKeys.has(target)) throw new Error("Save keyMap has a collision with an existing node");
  for (const key of submittedKeys) if (!canonical.has(keyMapping.get(key) ?? key)) throw new Error(`Save response is missing node ${String(key)}`);
}
