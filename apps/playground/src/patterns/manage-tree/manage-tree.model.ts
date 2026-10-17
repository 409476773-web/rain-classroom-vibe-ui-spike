import type { TreeKey, TreeNodeRecord } from "@rain-next/ui";

export type TreeChange =
  | { type: "add"; key: TreeKey; parentKey: TreeKey | null; index: number }
  | { type: "delete"; key: TreeKey }
  | { type: "rename"; key: TreeKey; title: string }
  | { type: "update"; key: TreeKey }
  | { type: "move"; key: TreeKey; parentKey: TreeKey | null; index: number };

export interface TreeFieldWriters {
  withTitle?: (node: TreeNodeRecord, title: string) => TreeNodeRecord;
  withChildren?: (node: TreeNodeRecord, children: readonly TreeNodeRecord[]) => TreeNodeRecord;
  isSameNode?: (a: TreeNodeRecord, b: TreeNodeRecord) => boolean;
}
export function sameNodeFields(a: TreeNodeRecord, b: TreeNodeRecord, equal?: TreeFieldWriters["isSameNode"]): boolean {
  if (a.title !== b.title) return false;
  if (equal) return equal(a, b);
  const fields = new Set([...Object.keys(a), ...Object.keys(b)]);
  fields.delete("children");
  return [...fields].every((key) => Object.is(a[key as keyof TreeNodeRecord], b[key as keyof TreeNodeRecord]));
}
function writeChildren(node: TreeNodeRecord, children: readonly TreeNodeRecord[], writers?: TreeFieldWriters): TreeNodeRecord {
  const next = writers?.withChildren?.(node, children) ?? { ...node, children };
  if (next.key !== node.key || next.title !== node.title || next.children !== children) throw new Error("withChildren 必须保留节点身份并写入给定子节点列表");
  return next;
}
export function syncTreeChildren(data: readonly TreeNodeRecord[], writers?: TreeFieldWriters): TreeNodeRecord[] {
  return data.map((node) => node.children ? writeChildren(node, syncTreeChildren(node.children, writers), writers) : node);
}
export function updateTreeNode(data: readonly TreeNodeRecord[], key: TreeKey, value: TreeNodeRecord, writers?: TreeFieldWriters): TreeNodeRecord[] {
  return data.map((node) => node.key === key ? value : node.children ? writeChildren(node, updateTreeNode(node.children, key, value, writers), writers) : node);
}

export function addTreeNode(data: readonly TreeNodeRecord[], anchor: TreeKey | null, placement: "after" | "inside", node: TreeNodeRecord, writers?: TreeFieldWriters): TreeNodeRecord[] {
  if (anchor === null) return [...data, node];
  let inserted = false;
  function visit(nodes: readonly TreeNodeRecord[]): TreeNodeRecord[] {
    const result: TreeNodeRecord[] = [];
    for (const current of nodes) {
      if (placement === "inside" && current.key === anchor) {
        if (current.canHaveChildren === false) throw new Error("叶子节点不能新增子节点");
        result.push(writeChildren({ ...current, canHaveChildren: true }, [...(current.children ?? []), node], writers));
        inserted = true;
      } else {
        result.push(current.children ? writeChildren(current, visit(current.children), writers) : current);
        if (placement === "after" && current.key === anchor) { result.push(node); inserted = true; }
      }
    }
    return result;
  }
  const result = visit(data);
  if (!inserted) throw new Error("新增位置不存在");
  return result;
}

export function renameTreeNode(data: readonly TreeNodeRecord[], key: TreeKey, title: string, writers?: TreeFieldWriters): TreeNodeRecord[] {
  return data.map((node) => node.key === key ? writers?.withTitle?.(node, title) ?? { ...node, title } : node.children ? writeChildren(node, renameTreeNode(node.children, key, title, writers), writers) : node);
}

export function removeTreeNode(data: readonly TreeNodeRecord[], key: TreeKey, writers?: TreeFieldWriters): TreeNodeRecord[] {
  return data.filter((node) => node.key !== key).map((node) => node.children ? writeChildren(node, removeTreeNode(node.children, key, writers), writers) : node);
}

export function treeChanges(committed: readonly TreeNodeRecord[], draft: readonly TreeNodeRecord[], equal?: TreeFieldWriters["isSameNode"]): TreeChange[] {
  const flatten = (data: readonly TreeNodeRecord[]) => {
    const map = new Map<TreeKey, { node: TreeNodeRecord; parentKey: TreeKey | null; index: number }>();
    function visit(nodes: readonly TreeNodeRecord[], parentKey: TreeKey | null) {
      nodes.forEach((node, index) => { map.set(node.key, { node, parentKey, index }); visit(node.children ?? [], node.key); });
    }
    visit(data, null);
    return map;
  };
  const before = flatten(committed), after = flatten(draft), changes: TreeChange[] = [];
  // ponytail: scan each changed parent once; pre-index sibling groups if very large management drafts become common.
  const orderCache = new Map<TreeKey | null, boolean>();
  const unchangedOrder = (parentKey: TreeKey | null) => {
    const cached = orderCache.get(parentKey);
    if (cached !== undefined) return cached;
    const oldKeys = [...before].filter(([key, item]) => item.parentKey === parentKey && after.get(key)?.parentKey === parentKey).sort((a, b) => a[1].index - b[1].index).map(([key]) => key);
    const newKeys = [...after].filter(([key, item]) => item.parentKey === parentKey && before.get(key)?.parentKey === parentKey).sort((a, b) => a[1].index - b[1].index).map(([key]) => key);
    const same = oldKeys.length === newKeys.length && oldKeys.every((key, index) => key === newKeys[index]);
    orderCache.set(parentKey, same);
    return same;
  };
  for (const [key, previous] of before) {
    const current = after.get(key);
    if (!current) { if (previous.parentKey === null || after.has(previous.parentKey)) changes.push({ type: "delete", key }); }
    else {
      if (previous.node.title !== current.node.title) changes.push({ type: "rename", key, title: current.node.title });
      if (!sameNodeFields({ ...previous.node, title: current.node.title }, current.node, equal)) changes.push({ type: "update", key });
      if (previous.parentKey !== current.parentKey || previous.index !== current.index && !unchangedOrder(current.parentKey))
        changes.push({ type: "move", key, parentKey: current.parentKey, index: current.index });
    }
  }
  for (const [key, current] of after) if (!before.has(key)) changes.push({ type: "add", key, parentKey: current.parentKey, index: current.index });
  return changes;
}
