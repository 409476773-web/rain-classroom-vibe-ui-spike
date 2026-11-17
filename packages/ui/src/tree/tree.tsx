import { Fragment, forwardRef, useEffect, useId, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactElement, type ReactNode, type RefAttributes } from "react";
import { Checkbox } from "../checkbox/checkbox";
import { ArrowDownIcon } from "../icons/arrow-down";
import { ArrowRightIcon } from "../icons/arrow-right";
import { SortDragIcon } from "../icons/sort-drag";
import { ancestorsOf, buildTree, isDescendant, matchingKeys, normalizeTree, visibleTree } from "./tree.model";
import { validateTreeMove, type MoveOptions } from "./tree.move";
import { EMPTY_CHECK_STATE, participates, projectChecks, reconcileChecks, toggleCheck } from "./tree.selection";
import type { CheckMode, CheckResult, CheckScope, CheckState, MovePlacement, MoveProposal, TreeAccessors, TreeKey, TreeNodeRecord, TreeRenderer, TreeRenderContext, TreeEmptyContext } from "./tree.types";

export interface TreeScrollAnchor { key: TreeKey; offset: number; scrollLeft: number }
export interface TreeHandle {
  reveal(key: TreeKey): Promise<{ ok: true } | { ok: false; reason: "not-found" | "not-loaded" | "filtered-out" | "denied" }>;
  refresh(key: TreeKey): Promise<void>;
  getScrollAnchor(): TreeScrollAnchor | null;
  restoreScrollAnchor(anchor: TreeScrollAnchor): boolean;
}
export interface TreeProps<T = TreeNodeRecord> {
  data: readonly T[];
  accessors?: TreeAccessors<T>;
  dataRevision?: string | number;
  "aria-label"?: string;
  variant?: "basic" | "rich";
  density?: "compact" | "default";
  richSpacing?: 8 | 10 | 12;
  selectionAppearance?: "full" | "inset";
  showLine?: boolean;
  lineStyle?: "solid" | "dotted";
  expandedKeys?: readonly TreeKey[];
  defaultExpandedKeys?: readonly TreeKey[];
  onExpandedKeysChange?: (keys: TreeKey[], detail: { key: TreeKey; reason: string }) => void;
  selectionMode?: "none" | "single" | "multiple";
  selectedKeys?: readonly TreeKey[];
  defaultSelectedKeys?: readonly TreeKey[];
  onSelectedKeysChange?: (keys: TreeKey[], detail: { key: TreeKey; reason: string }) => void;
  focusedKey?: TreeKey | null;
  defaultFocusedKey?: TreeKey | null;
  onFocusedKeyChange?: (key: TreeKey | null) => void;
  checkable?: boolean;
  checkMode?: CheckMode;
  nodeCheckable?: CheckScope;
  checkedStrategy?: "exact" | "all" | "highest-parent" | "leaf";
  checkState?: CheckState;
  defaultCheckState?: CheckState;
  onCheckStateChange?: (state: CheckState, result: CheckResult) => void;
  search?: { query: string; mode?: "filter" | "locate"; matcher?: (node: TreeNodeRecord, query: string) => boolean; matches?: readonly TreeKey[] };
  loadChildren?: (key: TreeKey, context: { signal: AbortSignal; requestId: number; dataRevision?: string | number }) => Promise<{ children: readonly T[]; complete: true }>;
  onChildrenLoaded?: (key: TreeKey, result: { children: readonly T[]; complete: true }, context: { requestId: number; dataRevision?: string | number }) => void;
  dragAndDrop?: MoveOptions & { onMove: (proposal: MoveProposal) => void; autoExpand?: boolean; autoScroll?: boolean };
  renderTitle?: TreeRenderer;
  renderDescription?: TreeRenderer;
  renderLeading?: TreeRenderer;
  renderMeta?: TreeRenderer;
  renderActions?: TreeRenderer;
  renderEmpty?: (context: TreeEmptyContext) => ReactNode;
  onEditRequest?: (key: TreeKey) => void;
  virtual?: { height: number; overscan?: number };
  onScrollAnchorChange?: (anchor: TreeScrollAnchor | null) => void;
  className?: string;
}

const emptyKeys: readonly TreeKey[] = [];
const controlSelector = 'button:not(:disabled), input:not(:disabled):not([type="hidden"]), select:not(:disabled), textarea:not(:disabled), a[href], [contenteditable="true"]';
const keyId = (key: TreeKey) => JSON.stringify([typeof key, key]);
function markedTitle(title: string, query: string): ReactNode {
  const position = title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
  if (!query || position < 0) return title;
  return <>{title.slice(0, position)}<mark>{title.slice(position, position + query.length)}</mark>{title.slice(position + query.length)}</>;
}

const TreeRoot = forwardRef<TreeHandle, TreeProps<unknown>>(function TreeRoot(props, forwardedRef) {
  const {
    data, dataRevision, variant = "basic", density = "compact", richSpacing = 10, selectionAppearance = "full",
    showLine = false, lineStyle = "solid", selectionMode = "single", checkable = false, checkMode = "cascade", nodeCheckable = "all", checkedStrategy = "exact",
    search, loadChildren, onChildrenLoaded, dragAndDrop,
  } = props;
  if (props.expandedKeys !== undefined && (!props.onExpandedKeysChange || props.defaultExpandedKeys !== undefined)) throw new Error("Controlled Tree expansion requires a callback and no default");
  if (props.selectedKeys !== undefined && (!props.onSelectedKeysChange || props.defaultSelectedKeys !== undefined)) throw new Error("Controlled Tree selection requires a callback and no default");
  if (props.checkState !== undefined && (!props.onCheckStateChange || props.defaultCheckState !== undefined)) throw new Error("Controlled Tree checks require a callback and no default");
  if (props.focusedKey !== undefined && (!props.onFocusedKeyChange || props.defaultFocusedKey !== undefined)) throw new Error("Controlled Tree focus requires a callback and no default");
  if (Boolean(loadChildren) !== Boolean(onChildrenLoaded)) throw new Error("Tree loading requires loadChildren and onChildrenLoaded together");
  if (props.virtual && (variant !== "basic" || !Number.isFinite(props.virtual.height) || props.virtual.height <= 0)) throw new Error("Tree virtual mode requires Basic with a positive fixed viewport height");
  if (checkMode === "independent" && checkedStrategy !== "exact") throw new Error("Independent Tree checks require exact result strategy");
  const normalized = useMemo(() => props.accessors ? normalizeTree(data, props.accessors) : data as readonly TreeNodeRecord[], [data, props.accessors]);
  const index = useMemo(() => buildTree(normalized), [normalized]);
  const dynamicRows = useMemo(() => [...index.entries.values()].some(({ node, childrenComplete }) => !childrenComplete || node.description != null || node.meta != null || node.leading != null || node.actions != null), [index]);
  if (props.virtual && (dynamicRows || props.renderTitle || props.renderDescription || props.renderMeta || props.renderLeading || props.renderActions || loadChildren)) throw new Error("Tree virtual mode requires fixed rows without dynamic content or loading");
  const instance = useId().replace(/:/g, "");
  const nodeId = (key: TreeKey) => `${instance}-node-${encodeURIComponent(keyId(key))}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const focusWithin = useRef(false);
  const previousFocusIndex = useRef(index);
  const previousCheckIndex = useRef(index);
  const [ownExpanded, setOwnExpanded] = useState<readonly TreeKey[]>(props.defaultExpandedKeys ?? emptyKeys);
  const [ownSelected, setOwnSelected] = useState<readonly TreeKey[]>(props.defaultSelectedKeys ?? emptyKeys);
  const [ownChecks, setOwnChecks] = useState<CheckState>(props.defaultCheckState ?? EMPTY_CHECK_STATE);
  const expanded = props.expandedKeys ?? ownExpanded, selected = props.selectedKeys ?? ownSelected, checks = props.checkState ?? ownChecks;
  const [ownFocused, setOwnFocused] = useState<TreeKey | null>(props.defaultFocusedKey ?? null);
  const focused = props.focusedKey !== undefined ? props.focusedKey : ownFocused;
  const [scrollTop, setScrollTop] = useState(0);
  const [controlsKey, setControlsKey] = useState<TreeKey | null>(null);
  const controlTabIndices = useRef(new WeakMap<HTMLElement, number>());
  const [loadStates, setLoadStates] = useState<Map<TreeKey, "loading" | "awaiting-data" | "error">>(new Map());
  const [moving, setMoving] = useState<{ source: TreeKey; target: TreeKey; placement: MovePlacement } | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const requests = useRef(new Map<TreeKey, { id: number; abort: AbortController; revision?: string | number }>());
  const requestCounter = useRef(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverKey = useRef<TreeKey | null>(null);
  const dragSource = useRef<TreeKey | null>(null);
  const dragPointerY = useRef<number | null>(null);
  const scrollFrame = useRef<number | null>(null);
  const lastFrame = useRef<number | null>(null);
  const loadingRevision = useRef(dataRevision);
  const lastFocused = useRef<TreeKey | null>(null);
  const query = search?.query.trim() ?? "", searchMode = search?.mode ?? "filter";
  const checkedResult = useMemo(() => projectChecks(index, checks, checkMode, "exact", nodeCheckable), [index, checks, checkMode, nodeCheckable]);
  const rows = useMemo(() => visibleTree(index, new Set(expanded), query, searchMode, search?.matcher, search?.matches), [index, expanded, query, searchMode, search?.matcher, search?.matches]);
  const rowHeight = density === "compact" ? 36 : 44;
  const overscan = Math.max(0, Math.floor(props.virtual?.overscan ?? 4));
  const maxScroll = props.virtual ? Math.max(0, rows.length * rowHeight - props.virtual.height) : 0;
  const windowTop = Math.min(scrollTop, maxScroll);
  const windowStart = props.virtual ? Math.max(0, Math.floor(windowTop / rowHeight) - overscan) : 0;
  const windowEnd = props.virtual ? Math.min(rows.length, Math.ceil((windowTop + props.virtual.height) / rowHeight) + overscan) : rows.length;
  const focusedPosition = useMemo(() => rows.findIndex((row) => row.key === focused), [rows, focused]);
  const renderedRows = rows.slice(windowStart, windowEnd).map((row, offset) => ({ row, position: windowStart + offset }));
  // Keep one offscreen focus row mounted without pulling a user's scroll back to it.
  if (props.virtual && focusedPosition >= 0 && (focusedPosition < windowStart || focusedPosition >= windowEnd)) {
    renderedRows.push({ row: rows[focusedPosition]!, position: focusedPosition });
    renderedRows.sort((a, b) => a.position - b.position);
  }
  const tabbableKey = focused ?? selected.find((key) => renderedRows.some(({ row }) => row.key === key)) ?? renderedRows[0]?.row.key;
  const matches = useMemo(() => matchingKeys(index, query, search?.matcher, search?.matches), [index, query, search?.matcher, search?.matches]);
  const dragEnabled = Boolean(dragAndDrop) && !(query && searchMode === "filter");
  const moveValidation = useMemo(() => moving && dragEnabled ? validateTreeMove(index, moving.source, moving.target, moving.placement, dragAndDrop) : null, [index, moving, dragEnabled, dragAndDrop]);
  const currentData = useRef({ index, dataRevision });
  currentData.current = { index, dataRevision };
  const rendererAction = useRef<(key: TreeKey, action: "expand" | "select" | "check" | "focus") => void>(() => {});
  rendererAction.current = (key, action) => {
    const entry = index.entries.get(key);
    if (!rootRef.current || !entry || !rows.some((row) => row.key === key)) return;
    if (action === "expand" && entry.canHaveChildren && (entry.children.length > 0 || !entry.childrenComplete)) expand(key);
    else if (action === "select") select(key);
    else if (action === "check" && checkable && participates(entry, nodeCheckable) && !entry.node.checkDisabled) setChecks(toggleCheck(index, checks, key, checkMode, nodeCheckable));
    else if (action === "focus") focus(key);
  };
  function setFocused(key: TreeKey | null) {
    if (props.focusedKey === undefined) setOwnFocused(key);
    props.onFocusedKeyChange?.(key);
  }

  useEffect(() => {
    const previous = previousFocusIndex.current;
    previousFocusIndex.current = index;
    if (focused === null || rows.some((row) => row.key === focused)) return;
    const visible = new Set(rows.map((row) => row.key));
    const parent = previous.entries.get(focused)?.parentKey;
    const siblings = parent === null ? previous.roots : parent === undefined ? [] : previous.entries.get(parent)?.children ?? [];
    const position = siblings.indexOf(focused);
    const adjacent = index.entries.has(focused) ? [] : [...siblings.slice(position + 1), ...siblings.slice(0, position).reverse()];
    const fallback = [...adjacent, ...ancestorsOf(previous, focused).reverse()].find((key) => visible.has(key)) ?? rows[0]?.key ?? null;
    setFocused(fallback);
    if (!focusWithin.current) return;
    requestAnimationFrame(() => {
      if (fallback === null) rootRef.current?.focus();
      else document.getElementById(nodeId(fallback))?.focus();
    });
  }, [focused, rows, index, instance]);
  useLayoutEffect(() => {
    const next = reconcileChecks(previousCheckIndex.current, index, checks, checkMode, nodeCheckable);
    previousCheckIndex.current = index;
    if (next !== checks) setChecks(next);
  }, [index, checks, checkMode, nodeCheckable]);
  useLayoutEffect(() => {
    if (props.virtual && scrollTop > maxScroll) {
      if (rootRef.current) rootRef.current.scrollTop = maxScroll;
      setScrollTop(maxScroll);
    }
  }, [maxScroll, scrollTop, props.virtual]);
  useEffect(() => {
    if (lastFocused.current === focused) return;
    lastFocused.current = focused;
    if (!props.virtual || focused === null) return;
    const position = rows.findIndex((row) => row.key === focused);
    if (position < 0 || position >= windowStart && position < windowEnd) return;
    const nextTop = position * rowHeight;
    if (rootRef.current) rootRef.current.scrollTop = nextTop;
    setScrollTop(nextTop);
  }, [focused, rows, rowHeight, windowStart, windowEnd, props.virtual]);

  useLayoutEffect(() => {
    rootRef.current?.querySelectorAll<HTMLElement>('[role="treeitem"]').forEach((row) => {
      for (const control of row.querySelectorAll<HTMLElement>(controlSelector)) {
        if (!controlTabIndices.current.has(control)) controlTabIndices.current.set(control, control.tabIndex);
        control.tabIndex = controlsKey !== null && row.id === nodeId(controlsKey) ? controlTabIndices.current.get(control)! : -1;
      }
    });
  });

  function setExpanded(next: TreeKey[], key: TreeKey, reason: string) {
    if (props.expandedKeys === undefined) setOwnExpanded(next);
    props.onExpandedKeysChange?.(next, { key, reason });
  }
  function setSelected(next: TreeKey[], key: TreeKey, reason: string) {
    if (props.selectedKeys === undefined) setOwnSelected(next);
    props.onSelectedKeysChange?.(next, { key, reason });
  }
  function setChecks(next: CheckState) {
    if (props.checkState === undefined) setOwnChecks(next);
    props.onCheckStateChange?.(next, projectChecks(index, next, checkMode, checkedStrategy, nodeCheckable));
  }
  useEffect(() => {
    if (!query) return;
    const next = new Set(expanded);
    for (const key of matches) for (const parent of ancestorsOf(index, key)) next.add(parent);
    const first = [...matches][0] ?? index.roots[0];
    if (next.size !== expanded.length && first !== undefined) setExpanded([...next], first, "search");
    // Query changes auto-expand once; later user collapse must remain effective.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchMode]);
  useEffect(() => {
    const changedRevision = loadingRevision.current !== dataRevision;
    loadingRevision.current = dataRevision;
    const invalidated = new Set<TreeKey>();
    for (const [key, request] of requests.current) if (request.revision !== dataRevision || !index.entries.has(key)) {
      request.abort.abort(); requests.current.delete(key); invalidated.add(key);
    }
    setLoadStates((current) => {
      const next = new Map(current);
      for (const [key, state] of next) if (changedRevision || invalidated.has(key) || !index.entries.has(key) || (state === "awaiting-data" && index.entries.get(key)?.childrenComplete)) next.delete(key);
      return next.size === current.size ? current : next;
    });
  }, [dataRevision, index]);
  useEffect(() => {
    for (const row of rows) if (expanded.includes(row.key) && !row.childrenComplete && !loadStates.has(row.key)) void load(row.key);
  }, [rows, loadStates, loadChildren, onChildrenLoaded, dataRevision]);
  useEffect(() => {
    if (dragEnabled) return;
    setMoving(null); dragSource.current = null; stopDragEffects();
  }, [dragEnabled]);
  useEffect(() => {
    if (!moving || !moveValidation) return;
    const placement = { before: "之前", inside: "内部末尾", after: "之后" }[moving.placement];
    setAnnouncement(`移动${index.entries.get(moving.source)?.node.title ?? "节点"}到${index.entries.get(moving.target)?.node.title ?? "目标"}${placement}${moveValidation.ok ? "，按 Enter 确认，Escape 取消" : `：${moveValidation.reason}`}`);
    if (!moveValidation.ok && moveValidation.reason !== "目标子树尚未完整加载") stopDragEffects();
  }, [moving, moveValidation, index]);
  useEffect(() => () => {
    const pendingKeys = [...requests.current.keys()];
    requests.current.forEach((request) => request.abort.abort());
    requests.current.clear();
    // StrictMode replays setup after cleanup; release both tickets and their loading states.
    if (pendingKeys.length) setLoadStates((current) => {
      const next = new Map(current);
      for (const key of pendingKeys) next.delete(key);
      return next;
    });
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
  }, []);

  function stopDragEffects() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null; hoverKey.current = null; dragPointerY.current = null; lastFrame.current = null;
    if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = null;
  }
  function scrollNearEdge(now: number) {
    const root = rootRef.current, y = dragPointerY.current;
    if (!root || y === null) { scrollFrame.current = null; return; }
    const box = root.getBoundingClientRect(), top = y - box.top, bottom = box.bottom - y;
    const velocity = top < 32 ? -480 * (1 - Math.max(0, top) / 32) : bottom < 32 ? 480 * (1 - Math.max(0, bottom) / 32) : 0;
    if (lastFrame.current !== null) root.scrollTop += velocity * Math.min(0.05, (now - lastFrame.current) / 1000);
    lastFrame.current = now;
    scrollFrame.current = requestAnimationFrame(scrollNearEdge);
  }

  async function load(key: TreeKey, refresh = false) {
    const entry = index.entries.get(key);
    if (!entry || !entry.canHaveChildren || !refresh && (entry.childrenComplete || loadStates.get(key) === "awaiting-data") || !loadChildren || !onChildrenLoaded || requests.current.has(key)) return;
    const id = ++requestCounter.current, abort = new AbortController();
    requests.current.set(key, { id, abort, revision: dataRevision });
    setLoadStates((current) => new Map(current).set(key, "loading"));
    try {
      const result = await loadChildren(key, { signal: abort.signal, requestId: id, dataRevision });
      if (abort.signal.aborted || requests.current.get(key)?.id !== id || currentData.current.dataRevision !== dataRevision || !currentData.current.index.entries.has(key)) return;
      if (!result || result.complete !== true || !Array.isArray(result.children)) throw new Error("加载结果必须提供完整子节点");
      onChildrenLoaded(key, result, { requestId: id, dataRevision });
      setLoadStates((current) => new Map(current).set(key, "awaiting-data"));
      setAnnouncement(`${entry.node.title}子节点已获取`);
    } catch {
      if (!abort.signal.aborted && requests.current.get(key)?.id === id) {
        setLoadStates((current) => new Map(current).set(key, "error"));
        setAnnouncement(`${entry.node.title}加载失败，请重试`);
      }
    } finally { if (requests.current.get(key)?.id === id) requests.current.delete(key); }
  }
  function expand(key: TreeKey) {
    const next = new Set(expanded);
    if (next.has(key)) {
      next.delete(key);
      if (focused !== null && isDescendant(index, focused, key)) focus(key);
    } else { next.add(key); void load(key); }
    setExpanded([...next], key, "toggle");
  }
  function focus(key: TreeKey) {
    setFocused(key);
    if (props.virtual) {
      const position = rows.findIndex((row) => row.key === key);
      if (position >= 0 && (position < windowStart || position >= windowEnd)) {
        const nextTop = position * rowHeight;
        if (rootRef.current) rootRef.current.scrollTop = nextTop;
        setScrollTop(nextTop);
      }
    }
    const node = document.getElementById(nodeId(key));
    if (node) node.focus();
    else requestAnimationFrame(() => document.getElementById(nodeId(key))?.focus());
  }
  function getScrollAnchor(): TreeScrollAnchor | null {
    const root = rootRef.current;
    if (!root) return null;
    const top = root.getBoundingClientRect().top;
    for (const { row } of renderedRows) {
      const rect = document.getElementById(nodeId(row.key))?.getBoundingClientRect();
      if (rect && rect.bottom > top) return { key: row.key, offset: rect.top - top, scrollLeft: root.scrollLeft };
    }
    return null;
  }
  useImperativeHandle(forwardedRef, () => ({
    getScrollAnchor,
    restoreScrollAnchor(anchor) {
      const root = rootRef.current, position = rows.findIndex((row) => row.key === anchor.key);
      if (!root || position < 0 || !Number.isFinite(anchor.offset) || !Number.isFinite(anchor.scrollLeft)) return false;
      const node = document.getElementById(nodeId(anchor.key));
      if (!props.virtual && !node) return false;
      const top = props.virtual ? position * rowHeight : node!.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
      root.scrollTop = Math.max(0, top - anchor.offset);
      root.scrollLeft = anchor.scrollLeft;
      if (props.virtual) setScrollTop(root.scrollTop);
      return true;
    },
    async reveal(key) {
      if (!index.entries.has(key)) return { ok: false, reason: "not-found" };
      const ancestors = ancestorsOf(index, key);
      if (query && searchMode === "filter" && !matches.has(key) && ![...matches].some((match) => ancestorsOf(index, match).includes(key)))
        return { ok: false, reason: "filtered-out" };
      setExpanded([...new Set([...expanded, ...ancestors])], key, "reveal");
      focus(key);
      const mounted = document.getElementById(nodeId(key));
      if (mounted) { mounted.scrollIntoView?.({ block: "nearest" }); return { ok: true }; }
      return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => {
        const node = document.getElementById(nodeId(key));
        if (!node) { resolve({ ok: false, reason: "denied" }); return; }
        node.focus(); node.scrollIntoView?.({ block: "nearest" }); resolve({ ok: true });
      })));
    },
    async refresh(key) {
      requests.current.get(key)?.abort.abort(); requests.current.delete(key);
      await load(key, true);
    },
  }));
  function select(key: TreeKey) {
    const entry = index.entries.get(key);
    if (selectionMode === "none" || entry?.node.selectable === false) return;
    const next = selectionMode === "single" ? [key] : selected.includes(key) ? selected.filter((item) => item !== key) : [...selected, key];
    setSelected(next, key, "row");
  }
  function propose(source: TreeKey, target: TreeKey, placement: MovePlacement) {
    if (!dragEnabled || !dragAndDrop) return;
    const result = validateTreeMove(index, source, target, placement, dragAndDrop);
    if (result.ok) {
      dragAndDrop.onMove(result.proposal);
      if (placement === "inside") setExpanded([...new Set([...expanded, target])], target, "move");
      setAnnouncement("节点移动已提交");
    }
    else setAnnouncement(result.reason);
    setMoving(null);
    dragSource.current = null;
    stopDragEffects();
  }
  function rowKeyDown(event: KeyboardEvent<HTMLDivElement>, key: TreeKey, position: number) {
    if (event.nativeEvent.isComposing) return;
    if (moving) {
      if (event.key === "Escape") { event.preventDefault(); setMoving(null); dragSource.current = null; stopDragEffects(); setAnnouncement("已取消移动"); focus(moving.source); return; }
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const next = rows[Math.max(0, Math.min(rows.length - 1, rows.findIndex((row) => row.key === moving.target) + (event.key === "ArrowDown" ? 1 : -1)))];
        if (next) { setMoving({ ...moving, target: next.key }); focus(next.key); setAnnouncement(`目标${next.node.title}`); }
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const placements: MovePlacement[] = ["before", "inside", "after"];
        setMoving({ ...moving, placement: placements[(placements.indexOf(moving.placement) + (event.key === "ArrowRight" ? 1 : 2)) % 3]! });
        return;
      }
      if (event.key === "Enter") { event.preventDefault(); propose(moving.source, moving.target, moving.placement); focus(moving.source); }
      return;
    }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      const nextPosition = event.key === "Home" ? 0 : event.key === "End" ? rows.length - 1 : Math.max(0, Math.min(rows.length - 1, position + (event.key === "ArrowDown" ? 1 : -1)));
      const next = rows[nextPosition];
      if (next) focus(next.key);
    } else if (event.key === "ArrowRight" && index.entries.get(key)?.canHaveChildren) {
      event.preventDefault();
      if (!expanded.includes(key)) expand(key);
      else if (rows[position + 1]?.depth === rows[position]!.depth + 1) focus(rows[position + 1]!.key);
    }
    else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (expanded.includes(key)) expand(key); else { const parent = index.entries.get(key)?.parentKey; if (parent !== null && parent !== undefined) focus(parent); }
    } else if (event.key === "Enter") { event.preventDefault(); select(key); }
    else if (event.key === " ") {
      event.preventDefault();
      const entry = index.entries.get(key);
      if (checkable) {
        if (entry && participates(entry, nodeCheckable) && !entry.node.checkDisabled) setChecks(toggleCheck(index, checks, key, checkMode, nodeCheckable));
      } else select(key);
    } else if (event.key === "F2" && props.onEditRequest) {
      event.preventDefault(); props.onEditRequest(key);
    } else if (event.key === "F6") {
      event.preventDefault();
      const row = document.getElementById(nodeId(key));
      setControlsKey(key);
      row?.querySelector<HTMLElement>(controlSelector)?.focus();
    }
    else if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
      const next = [...rows.slice(position + 1), ...rows.slice(0, position + 1)].find((row) => row.node.title.toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()));
      if (next) focus(next.key);
    }
  }

  return <div ref={rootRef} role="tree" tabIndex={rows.length ? undefined : 0} aria-label={props["aria-label"] ?? "树"} aria-describedby={`${instance}-tree-help`} aria-multiselectable={selectionMode === "multiple" || undefined}
      data-rain-id="ui-tree" data-slot="root" data-variant={variant} data-density={density} data-line={showLine} data-line-style={lineStyle}
      data-selection-appearance={selectionAppearance} className={`rain-tree ${props.className ?? ""}`}
      style={{ "--rain-tree-rich-spacing": `${richSpacing}px`, height: props.virtual?.height } as React.CSSProperties}
      onFocus={() => { focusWithin.current = true; }}
      onBlur={(event) => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) { focusWithin.current = false; setControlsKey(null); } }}
      onScroll={(event) => { if (props.virtual) setScrollTop(event.currentTarget.scrollTop); props.onScrollAnchorChange?.(getScrollAnchor()); }}
      onDragLeave={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) {
          stopDragEffects(); setMoving(null);
        }
      }}>
    {renderedRows.map(({ row, position }, offset) => {
      const gap = position - (renderedRows[offset - 1]?.position ?? -1) - 1;
      const hasExpander = row.canHaveChildren && (row.children.length > 0 || !row.childrenComplete);
      const open = expanded.includes(row.key), checked = checkedResult.checkedKeys.includes(row.key), mixed = checkedResult.halfCheckedKeys.includes(row.key);
      const eligible = checkable && participates(row, nodeCheckable);
      const selectedRow = selected.includes(row.key);
      const checkboxGap = checkable && !eligible;
      const branchState = loadStates.get(row.key);
      const rowId = nodeId(row.key);
      const context: TreeRenderContext = {
        node: row.node, depth: row.depth, expanded: hasExpander && open, selected: selectedRow, checked, indeterminate: mixed, focused: focused === row.key,
        disabledReasons: {
          expand: hasExpander ? undefined : "not-expandable",
          select: selectionMode === "none" ? "selection-disabled" : row.node.selectable === false ? "not-selectable" : undefined,
          check: !checkable ? "checking-disabled" : !eligible ? "not-checkable" : row.node.checkDisabled ? "check-disabled" : undefined,
          drag: !dragAndDrop ? "dragging-disabled" : !dragEnabled ? "filter-search" : row.node.draggable === false ? "not-draggable" : undefined,
        },
        actions: {
          toggleExpanded: () => rendererAction.current(row.key, "expand"), select: () => rendererAction.current(row.key, "select"),
          toggleChecked: () => rendererAction.current(row.key, "check"), focus: () => rendererAction.current(row.key, "focus"),
        },
      };
      const leading = props.renderLeading?.(row.node, context) ?? row.node.leading;
      const description = props.renderDescription?.(row.node, context) ?? row.node.description;
      const meta = props.renderMeta?.(row.node, context) ?? row.node.meta;
      const actions = props.renderActions?.(row.node, context) ?? row.node.actions;
      const dropPlacement = moving?.target === row.key && moveValidation?.ok ? moving.placement : undefined;
      const nextDepth = rows[position + 1]?.depth ?? -1;
      return <Fragment key={keyId(row.key)}>{gap > 0 && <div data-slot="virtual-spacer" style={{ height: gap * rowHeight }} aria-hidden="true" />}<div id={rowId} role="treeitem" aria-label={row.node.title} aria-level={row.depth + 1}
          aria-posinset={row.positionInSet} aria-setsize={row.setSize}
          aria-expanded={hasExpander ? open : undefined} aria-selected={selectionMode === "none" || row.node.selectable === false ? undefined : selectedRow}
          tabIndex={tabbableKey === row.key ? 0 : -1}
          data-slot="node" data-depth={row.depth} data-selected={selectedRow} data-matched={query ? matches.has(row.key) : undefined}
          className="rain-tree-node" style={{ minWidth: 160 + 24 * row.depth, "--rain-tree-depth": row.depth, "--rain-tree-anchor": variant === "basic" ? density === "compact" ? "18px" : "22px" : `${richSpacing + 11}px` } as React.CSSProperties}
          onFocus={(event) => { setFocused(row.key); setControlsKey(event.target === event.currentTarget ? null : row.key); }} onKeyDown={(event) => {
            if (event.target === event.currentTarget) rowKeyDown(event, row.key, position);
            else if (event.key === "Escape" && !event.defaultPrevented) { event.preventDefault(); event.stopPropagation(); event.currentTarget.focus(); }
          }}
          onClick={(event) => {
            if (!(event.target as HTMLElement).closest("button,input,a,[data-slot='checkbox'],[data-slot='actions']")) select(row.key);
          }}
          onDragOver={(event) => {
            if (!dragEnabled || dragSource.current === null) return;
            event.preventDefault();
            const rect = event.currentTarget.getBoundingClientRect();
            const fraction = (event.clientY - rect.top) / rect.height;
            const placement: MovePlacement = fraction < .25 ? "before" : fraction > .75 ? "after" : "inside";
            setMoving({ source: dragSource.current, target: row.key, placement });
            const validation = validateTreeMove(index, dragSource.current, row.key, placement, dragAndDrop);
            event.dataTransfer.dropEffect = validation.ok ? "move" : "none";
            if (!validation.ok && validation.reason !== "目标子树尚未完整加载") { stopDragEffects(); return; }
            if (hoverKey.current !== row.key || placement !== "inside") {
              if (hoverTimer.current) clearTimeout(hoverTimer.current);
              hoverTimer.current = null; hoverKey.current = row.key;
              if (placement === "inside" && hasExpander && !open && dragAndDrop?.autoExpand !== false)
                hoverTimer.current = setTimeout(() => expand(row.key), 600);
            }
            if (dragAndDrop?.autoScroll !== false) {
              dragPointerY.current = event.clientY;
              if (scrollFrame.current === null) scrollFrame.current = requestAnimationFrame(scrollNearEdge);
            }
          }}
          onDragLeave={(event) => {
            const box = event.currentTarget.getBoundingClientRect();
            if (event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom) return;
            if (hoverTimer.current) clearTimeout(hoverTimer.current);
            hoverTimer.current = null; hoverKey.current = null;
          }}
          onDrop={(event) => { if (!dragEnabled || dragSource.current === null) return; event.preventDefault(); propose(dragSource.current, row.key, moving?.placement ?? "inside"); }}>
        <div data-slot="row" className="rain-tree-row" style={{ paddingInlineStart: `calc(var(--rain-tree-row-inset, 8px) + var(--rain-tree-row-indent, 24px) * ${row.depth})` }}>
          {dropPlacement === "inside" && <span data-slot="drop-indicator" data-placement="inside" aria-hidden="true" />}
          {showLine && row.depth > 0 && <span data-slot="connector" className={`rain-tree-connector ${nextDepth < row.depth ? "is-last" : ""}`} aria-hidden="true" style={{ left: `${8 + 24 * (row.depth - 1) + 8}px` }} />}
          {showLine && row.continuingAncestors.map((depth) => <span key={depth} data-slot="ancestor-line" className={`rain-tree-ancestor-line ${nextDepth <= depth ? "is-last" : ""}`} aria-hidden="true" style={{ left: `${8 + 24 * depth + 8}px` }} />)}
          {showLine && hasExpander && open && rows[position + 1] !== undefined && rows[position + 1]!.depth > row.depth && <span data-slot="outgoing-line" className="rain-tree-outgoing-line" aria-hidden="true" style={{ left: `${8 + 24 * row.depth + 8}px` }} />}
          {hasExpander && <button type="button" data-slot="expander" className="rain-tree-expander" aria-label={`${open ? "收起" : "展开"}${row.node.title}`} aria-expanded={open}
              onClick={(event) => { event.stopPropagation(); expand(row.key); }}>
            {open ? <ArrowDownIcon className="rain-tree-chevron" /> : <ArrowRightIcon className="rain-tree-chevron" />}
          </button>}
          {dragEnabled && row.node.draggable !== false && <button type="button" draggable data-slot="drag-handle" className="rain-tree-drag-handle" aria-label={`移动${row.node.title}`}
              onClick={(event) => event.stopPropagation()}
              onDragStart={(event) => { event.stopPropagation(); dragSource.current = row.key; event.dataTransfer.effectAllowed = "move"; }}
              onDragEnd={() => { dragSource.current = null; setMoving(null); stopDragEffects(); }}
              onKeyDown={(event) => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); event.stopPropagation(); setMoving({ source: row.key, target: row.key, placement: "after" }); setAnnouncement(`正在移动${row.node.title}`); focus(row.key); } }}>
            <SortDragIcon className="rain-tree-drag-icon" />
          </button>}
          {eligible ? <span data-slot="checkbox" onClick={(event) => event.stopPropagation()}><Checkbox aria-label={`勾选${row.node.title}`} checked={checked} indeterminate={mixed} disabled={row.node.checkDisabled}
            onCheckedChange={(next) => setChecks(toggleCheck(index, checks, row.key, checkMode, nodeCheckable, next))} /></span> : checkboxGap ? <span data-slot="checkbox-gap" aria-hidden="true" /> : null}
          {variant === "basic" && leading !== undefined && leading !== null && <span data-slot="leading">{leading}</span>}
          <span data-slot="content" className="rain-tree-content"><span className="rain-tree-layout"><span data-slot="body" className="rain-tree-body">
            <span data-slot="title" title={variant === "basic" ? row.node.title : undefined}>{variant === "rich" && leading !== undefined && leading !== null && <span data-slot="leading">{leading}</span>}{props.renderTitle?.(row.node, context) ?? markedTitle(row.node.title, query)}</span>
            {description !== undefined && description !== null && <span data-slot="description">{description}</span>}
            {variant === "basic" && meta !== undefined && meta !== null && <span data-slot="meta-mobile">{meta}</span>}
          </span>
            {variant === "rich" && meta !== undefined && meta !== null && <span data-slot="meta">{meta}</span>}
          </span>
          </span>
          {variant === "basic" && meta !== undefined && meta !== null && <span data-slot="meta">{meta}</span>}
          {actions !== undefined && actions !== null && <span data-slot="actions" onClick={(event) => event.stopPropagation()}>{actions}</span>}
        </div>
        {branchState === "loading" && <span data-slot="load-status">加载中…</span>}
        {branchState === "awaiting-data" && !row.childrenComplete && <span data-slot="load-status">等待数据更新…</span>}
        {branchState === "error" && <button type="button" data-slot="retry" onClick={() => void load(row.key)}>加载失败，重试</button>}
        {dropPlacement && dropPlacement !== "inside" && <span data-slot="drop-indicator" data-placement={dropPlacement} aria-hidden="true" />}
      </div></Fragment>;
    })}
    {props.virtual && (renderedRows.at(-1)?.position ?? -1) < rows.length - 1 && <div data-slot="virtual-spacer" style={{ height: (rows.length - (renderedRows.at(-1)?.position ?? -1) - 1) * rowHeight }} aria-hidden="true" />}
    {moving && moveValidation && !moveValidation.ok && <span data-slot="load-status">{moveValidation.reason}</span>}
    {!rows.length && <div data-slot="empty">{props.renderEmpty ? props.renderEmpty({ reason: index.entries.size ? "no-results" : "empty", query }) : query ? "没有搜索结果" : "暂无内容"}</div>}
    <span id={`${instance}-tree-help`} className="sr-only">方向键浏览节点，F6 进入行内控件，Escape 返回节点。</span>
    <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
  </div>;
});

export const Tree = TreeRoot as <T = TreeNodeRecord>(props: TreeProps<T> & RefAttributes<TreeHandle>) => ReactElement;
