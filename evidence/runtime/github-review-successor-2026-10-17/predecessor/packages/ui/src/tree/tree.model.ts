import type { TreeAccessors, TreeEntry, TreeIndex, TreeKey, TreeNodeRecord, VisibleTreeRow } from "./tree.types";

export function normalizeTree<T>(data: readonly T[], accessors: TreeAccessors<T>): TreeNodeRecord[] {
  if (!Array.isArray(data)) throw new Error("Tree data must be an array");
  const active = new Set<unknown>();
  function visit(nodes: readonly T[]): TreeNodeRecord[] {
    if (!Array.isArray(nodes)) throw new Error("Tree accessor children must be an array");
    return nodes.map((source) => {
      if (active.has(source)) throw new Error("Tree source contains a cycle");
      active.add(source);
      const children = accessors.getChildren(source);
      const node: TreeNodeRecord = {
        key: accessors.getKey(source), title: accessors.getTitle(source), source,
        children: children === undefined ? undefined : visit(children),
        canHaveChildren: accessors.getCanHaveChildren?.(source),
        childrenComplete: accessors.getChildrenComplete?.(source),
        selectable: accessors.getSelectable?.(source), checkable: accessors.getCheckable?.(source),
        checkDisabled: accessors.getCheckDisabled?.(source), draggable: accessors.getDraggable?.(source),
      };
      active.delete(source);
      return node;
    });
  }
  return visit(data);
}

export function buildTree(data: readonly TreeNodeRecord[]): TreeIndex {
  if (!Array.isArray(data)) throw new Error("Tree data must be an array");
  const entries = new Map<TreeKey, TreeEntry>();
  const active = new Set<object>();
  function visit(nodes: readonly TreeNodeRecord[], parentKey: TreeKey | null, depth: number): TreeKey[] {
    if (!Array.isArray(nodes)) throw new Error(`Tree children of ${String(parentKey)} must be an array`);
    return nodes.map((node) => {
      if (!node || typeof node !== "object") throw new Error("Tree node must be an object");
      if (active.has(node)) throw new Error(`Tree cycle at ${String(node.key)}`);
      if ((typeof node.key !== "string" && typeof node.key !== "number") || (typeof node.key === "number" && !Number.isFinite(node.key)))
        throw new Error("Tree node has an invalid key");
      if (entries.has(node.key)) throw new Error(`Tree duplicate key: ${String(node.key)}`);
      if (typeof node.title !== "string") throw new Error(`Tree node ${String(node.key)} has an invalid title`);
      const children = node.children ?? [];
      if (!Array.isArray(children)) throw new Error(`Tree children of ${String(node.key)} must be an array`);
      if (node.canHaveChildren === false && children.length) throw new Error(`Tree leaf ${String(node.key)} cannot contain children`);
      const canHaveChildren = node.canHaveChildren ?? (children.length > 0 || node.childrenComplete === false);
      const childrenComplete = node.childrenComplete ?? true;
      if (!canHaveChildren && !childrenComplete) throw new Error(`Tree leaf ${String(node.key)} must be complete`);
      active.add(node);
      const entry: TreeEntry = { key: node.key, node, parentKey, depth, children: [], canHaveChildren, childrenComplete };
      entries.set(node.key, entry);
      entry.children = visit(children, node.key, depth + 1);
      active.delete(node);
      return node.key;
    });
  }
  return { roots: visit(data, null, 0), entries };
}

export function validateTreeData(data: readonly TreeNodeRecord[]): void { buildTree(data); }

export function ancestorsOf(index: TreeIndex, key: TreeKey): TreeKey[] {
  const result: TreeKey[] = [];
  let parent = index.entries.get(key)?.parentKey;
  while (parent !== null && parent !== undefined) {
    result.unshift(parent);
    parent = index.entries.get(parent)?.parentKey;
  }
  return result;
}

export function isDescendant(index: TreeIndex, key: TreeKey, ancestor: TreeKey): boolean {
  return ancestorsOf(index, key).includes(ancestor);
}

export function matchingKeys(index: TreeIndex, query: string, matcher?: (node: TreeNodeRecord, query: string) => boolean, explicit?: readonly TreeKey[]): Set<TreeKey> {
  const matches = new Set<TreeKey>();
  const trimmed = query.trim();
  if (!trimmed) return matches;
  if (explicit) {
    for (const key of explicit) {
      if (!index.entries.has(key)) throw new Error(`Tree search match key is missing: ${String(key)}`);
      matches.add(key);
    }
    return matches;
  }
  for (const entry of index.entries.values()) if (matcher ? matcher(entry.node, trimmed) : entry.node.title.toLocaleLowerCase().includes(trimmed.toLocaleLowerCase())) matches.add(entry.key);
  return matches;
}

export function visibleTree(index: TreeIndex, expanded: ReadonlySet<TreeKey>, query = "", mode: "filter" | "locate" = "filter", matcher?: (node: TreeNodeRecord, query: string) => boolean, explicit?: readonly TreeKey[]): VisibleTreeRow[] {
  const matches = matchingKeys(index, query, matcher, explicit);
  const permitted = new Set<TreeKey>();
  if (query.trim() && mode === "filter") for (const key of matches) {
    permitted.add(key);
    for (const ancestor of ancestorsOf(index, key)) permitted.add(ancestor);
  }
  const result: VisibleTreeRow[] = [];
  function walk(keys: readonly TreeKey[], continuingAncestors: readonly number[]) {
    const visible = query.trim() && mode === "filter" ? keys.filter((key) => permitted.has(key)) : keys;
    visible.forEach((key, position) => {
      const entry = index.entries.get(key)!;
      const lastSibling = position === visible.length - 1;
      result.push({ ...entry, lastSibling, positionInSet: position + 1, setSize: visible.length, continuingAncestors });
      if (expanded.has(key)) walk(entry.children, entry.depth === 0 ? continuingAncestors : [...continuingAncestors, entry.depth - 1]);
    });
  }
  walk(index.roots, []);
  return result;
}
