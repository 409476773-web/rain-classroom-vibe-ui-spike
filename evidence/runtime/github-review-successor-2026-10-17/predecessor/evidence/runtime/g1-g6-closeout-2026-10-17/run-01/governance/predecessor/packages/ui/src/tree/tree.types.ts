import type { ReactNode } from "react";

export type TreeKey = string | number;
export interface TreeRenderContext {
  readonly node: TreeNodeRecord;
  readonly depth: number;
  readonly expanded: boolean;
  readonly selected: boolean;
  readonly checked: boolean;
  readonly indeterminate: boolean;
  readonly focused: boolean;
  readonly disabledReasons: {
    readonly expand?: "not-expandable";
    readonly select?: "selection-disabled" | "not-selectable";
    readonly check?: "checking-disabled" | "not-checkable" | "check-disabled";
    readonly drag?: "dragging-disabled" | "filter-search" | "not-draggable";
  };
  readonly actions: {
    readonly toggleExpanded: () => void;
    readonly select: () => void;
    readonly toggleChecked: () => void;
    readonly focus: () => void;
  };
}
export type TreeRenderer = (node: TreeNodeRecord, context: TreeRenderContext) => ReactNode;
export interface TreeEmptyContext { readonly reason: "empty" | "no-results"; readonly query: string }
export interface TreeNodeRecord {
  key: TreeKey;
  title: string;
  children?: readonly TreeNodeRecord[];
  canHaveChildren?: boolean;
  childrenComplete?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  checkDisabled?: boolean;
  draggable?: boolean;
  description?: string;
  leading?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  source?: unknown;
}
export interface TreeAccessors<T> {
  getKey(node: T): TreeKey;
  getTitle(node: T): string;
  getChildren(node: T): readonly T[] | undefined;
  getCanHaveChildren?(node: T): boolean | undefined;
  getChildrenComplete?(node: T): boolean | undefined;
  getSelectable?(node: T): boolean | undefined;
  getCheckable?(node: T): boolean | undefined;
  getCheckDisabled?(node: T): boolean | undefined;
  getDraggable?(node: T): boolean | undefined;
}
export interface TreeEntry {
  key: TreeKey;
  node: TreeNodeRecord;
  parentKey: TreeKey | null;
  depth: number;
  children: readonly TreeKey[];
  canHaveChildren: boolean;
  childrenComplete: boolean;
}
export interface TreeIndex {
  roots: readonly TreeKey[];
  entries: Map<TreeKey, TreeEntry>;
}
export interface VisibleTreeRow extends TreeEntry {
  lastSibling: boolean;
  positionInSet: number;
  setSize: number;
  continuingAncestors: readonly number[];
}
export type CheckMode = "cascade" | "independent";
export type CheckScope = "all" | "leaf" | "branch" | ((node: TreeNodeRecord) => boolean);
export interface CheckIntent { key: TreeKey; scope: "node" | "subtree"; action: "include" | "exclude" }
export interface CheckState { directCheckedKeys: readonly TreeKey[]; intents: readonly CheckIntent[] }
export interface CheckResult {
  checkedKeys: TreeKey[];
  halfCheckedKeys: TreeKey[];
  incomplete: boolean;
  intents: readonly CheckIntent[];
}
export type MovePlacement = "before" | "inside" | "after";
export interface MoveProposal {
  sourceKey: TreeKey;
  targetKey: TreeKey;
  placement: MovePlacement;
  nextParentKey: TreeKey | null;
  nextIndex: number;
}
