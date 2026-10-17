import { buildTree, isDescendant } from "./tree.model";
import type { MovePlacement, MoveProposal, TreeIndex, TreeKey, TreeNodeRecord } from "./tree.types";

export type MoveValidation = { ok: true; proposal: MoveProposal } | { ok: false; reason: string };
export interface MoveOptions {
  maxDepth?: number;
  canDrop?: (proposal: MoveProposal) => boolean | string;
}

export function validateTreeMove(dataOrIndex: TreeIndex | readonly TreeNodeRecord[], sourceKey: TreeKey, targetKey: TreeKey, placement: MovePlacement, options: MoveOptions = {}): MoveValidation {
  const index = Array.isArray(dataOrIndex) ? buildTree(dataOrIndex) : dataOrIndex as TreeIndex;
  const source = index.entries.get(sourceKey), target = index.entries.get(targetKey);
  if (!source || !target) return { ok: false, reason: "节点不存在" };
  if (sourceKey === targetKey || isDescendant(index, targetKey, sourceKey)) return { ok: false, reason: "不能移动到自身或其后代" };
  if (source.node.draggable === false) return { ok: false, reason: "当前节点不可移动" };
  if (placement === "inside" && !target.canHaveChildren) return { ok: false, reason: "叶子节点不能接收子节点" };
  const subtree = [...index.entries.values()].filter((entry) => entry.key === sourceKey || isDescendant(index, entry.key, sourceKey));
  if (subtree.some((entry) => !entry.childrenComplete)) return { ok: false, reason: "源子树尚未完整加载" };
  const nextParentKey = placement === "inside" ? targetKey : target.parentKey;
  if (nextParentKey !== null && !index.entries.get(nextParentKey)!.childrenComplete) return { ok: false, reason: "目标子树尚未完整加载" };
  const siblings = nextParentKey === null ? index.roots : index.entries.get(nextParentKey)!.children;
  const afterRemoval = siblings.filter((key) => key !== sourceKey);
  const nextIndex = placement === "inside" ? afterRemoval.length : afterRemoval.indexOf(targetKey) + (placement === "after" ? 1 : 0);
  const proposal: MoveProposal = { sourceKey, targetKey, placement, nextParentKey, nextIndex };
  if (source.parentKey === nextParentKey && siblings.indexOf(sourceKey) === nextIndex) return { ok: false, reason: "位置没有变化" };
  if (options.maxDepth !== undefined) {
    const deepest = Math.max(...subtree.map((entry) => entry.depth - source.depth));
    const newDepth = nextParentKey === null ? 0 : index.entries.get(nextParentKey)!.depth + 1;
    if (newDepth + deepest > options.maxDepth) return { ok: false, reason: "超过最大层级" };
  }
  try {
    const allowed = options.canDrop?.(proposal);
    if (allowed === false || typeof allowed === "string") return { ok: false, reason: typeof allowed === "string" ? allowed : "没有移动权限" };
  } catch { return { ok: false, reason: "移动权限校验失败" }; }
  return { ok: true, proposal };
}

export function applyTreeMove(data: readonly TreeNodeRecord[], proposal: MoveProposal): TreeNodeRecord[] {
  const current = validateTreeMove(data, proposal.sourceKey, proposal.targetKey, proposal.placement);
  if (!current.ok || current.proposal.nextParentKey !== proposal.nextParentKey || current.proposal.nextIndex !== proposal.nextIndex)
    throw new Error("Tree move proposal is stale or invalid");
  let moved: TreeNodeRecord | undefined;
  function remove(nodes: readonly TreeNodeRecord[]): TreeNodeRecord[] {
    return nodes.flatMap((node) => {
      if (node.key === proposal.sourceKey) { moved = node; return []; }
      return [{ ...node, children: node.children ? remove(node.children) : undefined }];
    });
  }
  const without = remove(data);
  if (!moved) throw new Error("Tree move source is missing");
  const source = moved;
  function insert(nodes: readonly TreeNodeRecord[], parentKey: TreeKey | null): TreeNodeRecord[] {
    if (parentKey === proposal.nextParentKey) {
      const result = [...nodes];
      result.splice(proposal.nextIndex, 0, source);
      return result;
    }
    return nodes.map((node) => ({ ...node, children: node.children || node.key === proposal.nextParentKey ? insert(node.children ?? [], node.key) : undefined }));
  }
  return insert(without, null);
}
