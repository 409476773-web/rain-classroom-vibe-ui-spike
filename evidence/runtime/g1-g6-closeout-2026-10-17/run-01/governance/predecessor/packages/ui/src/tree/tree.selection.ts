import { ancestorsOf, isDescendant } from "./tree.model";
import type { CheckIntent, CheckMode, CheckResult, CheckScope, CheckState, TreeEntry, TreeIndex, TreeKey } from "./tree.types";

export const EMPTY_CHECK_STATE: CheckState = { directCheckedKeys: [], intents: [] };

export function participates(entry: TreeEntry, scope: CheckScope = "all"): boolean {
  if (entry.node.checkable === false) return false;
  if (scope === "leaf") return !entry.canHaveChildren;
  if (scope === "branch") return entry.canHaveChildren;
  return scope === "all" || scope(entry.node);
}

function effective(index: TreeIndex, state: CheckState, key: TreeKey, direct = new Set(state.directCheckedKeys)): boolean {
  const path = [...ancestorsOf(index, key), key];
  let selected = direct.has(key);
  for (const member of path) {
    const intent = [...state.intents].reverse().find((item) => item.key === member && (member === key || item.scope === "subtree"));
    if (intent) selected = intent.action === "include";
  }
  return selected;
}

export function projectChecks(index: TreeIndex, state: CheckState, mode: CheckMode = "cascade", strategy: "exact" | "all" | "highest-parent" | "leaf" = "exact", scope: CheckScope = "all"): CheckResult {
  if (mode === "independent" && strategy !== "exact") throw new Error("Independent check mode only supports exact results");
  const checked = new Set<TreeKey>(), half = new Set<TreeKey>();
  const direct = new Set(state.directCheckedKeys);
  function visit(key: TreeKey): { total: number; selected: number } {
    const entry = index.entries.get(key)!;
    const children = entry.children.map(visit);
    const descendantTotal = children.reduce((sum, child) => sum + child.total, 0);
    const descendantSelected = children.reduce((sum, child) => sum + child.selected, 0);
    const eligible = participates(entry, scope);
    const locked = entry.node.checkDisabled === true;
    const ownIntent = locked ? [...state.intents].reverse().find((intent) => intent.key === key) : undefined;
    const own = eligible && (mode === "independent" ? direct.has(key) : locked ? ownIntent ? ownIntent.action === "include" : direct.has(key) : effective(index, state, key, direct));
    const allChildren = descendantTotal > 0 && descendantTotal === descendantSelected;
    const anyChildren = descendantSelected > 0;
    const chosen = eligible && (mode === "independent" || locked || descendantTotal === 0 ? own : allChildren);
    if (chosen) checked.add(key);
    else if (mode === "cascade" && eligible && anyChildren) half.add(key);
    return { total: descendantTotal + (eligible && !locked ? 1 : 0), selected: descendantSelected + (eligible && !locked && (mode === "cascade" && descendantTotal > 0 ? allChildren : own) ? 1 : 0) };
  }
  index.roots.forEach(visit);
  const ordered = [...index.entries.keys()];
  let resultKeys = ordered.filter((key) => checked.has(key));
  if (strategy === "leaf") resultKeys = resultKeys.filter((key) => !index.entries.get(key)!.canHaveChildren);
  if (strategy === "highest-parent") resultKeys = resultKeys.filter((key) => !ancestorsOf(index, key).some((ancestor) => checked.has(ancestor)));
  return {
    checkedKeys: resultKeys,
    halfCheckedKeys: ordered.filter((key) => half.has(key)),
    intents: state.intents,
    incomplete: mode === "cascade" && state.intents.some((intent) => intent.scope === "subtree" && intent.action === "include" && [...index.entries.values()].some((entry) => !entry.childrenComplete && (entry.key === intent.key || isDescendant(index, entry.key, intent.key)))),
  };
}

export function toggleCheck(index: TreeIndex, state: CheckState, key: TreeKey, mode: CheckMode = "cascade", scope: CheckScope = "all", force?: boolean): CheckState {
  const entry = index.entries.get(key);
  if (!entry || !participates(entry, scope) || entry.node.checkDisabled) return state;
  const result = projectChecks(index, state, mode, "exact", scope);
  const next = force ?? !result.checkedKeys.includes(key);
  if (mode === "independent") return {
    directCheckedKeys: next ? [...new Set([...state.directCheckedKeys, key])] : state.directCheckedKeys.filter((item) => item !== key),
    intents: state.intents,
  };
  const inSubtree = (candidate: TreeKey) => candidate === key || isDescendant(index, candidate, key);
  const directCheckedKeys = next ? state.directCheckedKeys : state.directCheckedKeys.filter((item) => !inSubtree(item) || index.entries.get(item)?.node.checkDisabled);
  const intents: CheckIntent[] = state.intents.filter((intent) => {
    if (!inSubtree(intent.key)) return true;
    if (next) return intent.key !== key && intent.action === "exclude";
    return false;
  });
  intents.push({ key, scope: "subtree", action: next ? "include" : "exclude" });
  for (const member of index.entries.values()) {
    if (!inSubtree(member.key) || member.key === key || !member.node.checkDisabled || !participates(member, scope)) continue;
    const wasChecked = result.checkedKeys.includes(member.key);
    if (next && !wasChecked) intents.push({ key: member.key, scope: "node", action: "exclude" });
    if (!next && wasChecked) intents.push({ key: member.key, scope: "node", action: "include" });
  }
  const nextState = { directCheckedKeys, intents };
  // Record known node values without turning aggregated parents into subtree intentions.
  return { directCheckedKeys: [...directCheckedKeys.filter((item) => !index.entries.has(item)), ...projectChecks(index, nextState, mode, "exact", scope).checkedKeys], intents };
}

export function reconcileChecks(previous: TreeIndex, current: TreeIndex, state: CheckState, mode: CheckMode = "cascade", scope: CheckScope = "all"): CheckState {
  if (previous === current || mode === "independent") return state;
  const intents = [...state.intents];
  const moved: TreeKey[] = [];
  let previousChecked: Set<TreeKey> | undefined;
  for (const entry of current.entries.values()) {
    const old = previous.entries.get(entry.key);
    if (!old) continue;
    if (old.parentKey !== entry.parentKey && !state.intents.some((intent) => intent.key === entry.key && intent.scope === "subtree")) {
      let action: CheckIntent["action"] = "exclude";
      for (const ancestor of [...ancestorsOf(previous, entry.key), entry.key]) {
        const inherited = [...state.intents].reverse().find((intent) => intent.key === ancestor && intent.scope === "subtree");
        if (inherited) action = inherited.action;
      }
      intents.push({ key: entry.key, scope: "subtree", action });
      moved.push(entry.key);
    }
    if (entry.node.checkDisabled && !old.node.checkDisabled) {
      previousChecked ??= new Set(projectChecks(previous, state, mode, "exact", scope).checkedKeys);
      intents.push({ key: entry.key, scope: "node", action: previousChecked.has(entry.key) ? "include" : "exclude" });
    }
  }
  if (moved.length) {
    previousChecked ??= new Set(projectChecks(previous, state, mode, "exact", scope).checkedKeys);
    const projected = new Set(projectChecks(current, { ...state, intents }, mode, "exact", scope).checkedKeys);
    for (const key of previous.entries.keys()) if (current.entries.has(key) && moved.some((root) => key === root || isDescendant(previous, key, root)) && previousChecked.has(key) !== projected.has(key))
      intents.push({ key, scope: "node", action: previousChecked.has(key) ? "include" : "exclude" });
  }
  return intents.length === state.intents.length ? state : { ...state, intents };
}
