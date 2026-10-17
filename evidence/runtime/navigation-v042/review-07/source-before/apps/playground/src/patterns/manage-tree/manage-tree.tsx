import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { AlertDialog, Button, IconButton, Input, Popover, Tree, applyTreeMove, validateTreeData, validateTreeMove, type CheckState, type MoveProposal, type TreeHandle, type TreeKey, type TreeNodeRecord, type TreeProps, type TreeRenderContext, type TreeScrollAnchor } from "@rain-next/ui";
import { CheckBoldIcon } from "@rain-next/ui/icons/check-bold";
import { CloseIcon } from "@rain-next/ui/icons/close";
import { DeleteIcon } from "@rain-next/ui/icons/delete";
import { EditPencilIcon } from "@rain-next/ui/icons/edit-pencil";
import { GraphChildNodeAddIcon } from "@rain-next/ui/icons/graph-child-node-add";
import { GraphNodeAddIcon } from "@rain-next/ui/icons/graph-node-add";
import { addTreeNode, removeTreeNode, updateTreeNode, sameNodeFields, syncTreeChildren, treeChanges, type TreeChange, type TreeFieldWriters } from "./manage-tree.model";
import { assertSaveSuccess, mapViewState } from "./manage-tree.save";
import "./manage-tree.css";

type Feedback = { intent: "success" | "error" | "warning" | "info"; message: string };
export type ManageTreeViewState = { expandedKeys: readonly TreeKey[]; selectedKeys: readonly TreeKey[]; focusedKey: TreeKey | null; checkState?: CheckState; scrollAnchor?: TreeScrollAnchor | null };
export type SaveResponse = { status: "success"; treeData: readonly TreeNodeRecord[]; revision: string; keyMap?: ReadonlyMap<TreeKey, TreeKey> | Record<string, TreeKey> } | { status: "conflict" };
const emptyChecks: CheckState = { directCheckedKeys: [], intents: [] };
export interface ManageTreeEditorContext {
  node: TreeNodeRecord;
  value: TreeNodeRecord;
  onChange: (next: TreeNodeRecord) => void;
  confirm: () => Promise<void>;
  cancel: () => void;
  validating: boolean;
  error: string | null;
}
export type ManageTreeOptions = Pick<TreeProps, "aria-label" | "variant" | "density" | "richSpacing" | "selectionAppearance" | "showLine" | "lineStyle" | "selectionMode" | "checkable" | "checkMode" | "nodeCheckable" | "checkedStrategy" | "search" | "renderLeading" | "renderDescription" | "renderMeta" | "renderEmpty" | "className"> & {
  moveOptions?: Omit<NonNullable<TreeProps["dragAndDrop"]>, "onMove">;
};
const optionKeys = new Set(["aria-label", "variant", "density", "richSpacing", "selectionAppearance", "showLine", "lineStyle", "selectionMode", "checkable", "checkMode", "nodeCheckable", "checkedStrategy", "search", "renderLeading", "renderDescription", "renderMeta", "renderEmpty", "className", "moveOptions"]);
export interface ManageTreeProps {
  data: readonly TreeNodeRecord[];
  revision: string;
  mode?: "view" | "edit";
  defaultMode?: "view" | "edit";
  defaultExpandedKeys?: readonly TreeKey[];
  viewState?: ManageTreeViewState;
  onViewStateChange?: (next: ManageTreeViewState) => void;
  onModeChange?: (mode: "view" | "edit") => void;
  onSave: (request: { draft: readonly TreeNodeRecord[]; changeset: readonly TreeChange[]; baseRevision: string; idempotencyKey: string; signal: AbortSignal }) => Promise<SaveResponse>;
  loadLatest?: () => Promise<{ treeData: readonly TreeNodeRecord[]; revision: string }>;
  onFeedback: (feedback: Feedback) => void;
  treeOptions?: ManageTreeOptions;
  renderEditor?: (context: ManageTreeEditorContext) => ReactNode;
  renderActions?: (node: TreeNodeRecord, context: { defaultActions: ReactNode; edit: () => void; tree: TreeRenderContext }) => ReactNode;
  adapter?: TreeFieldWriters & {
    createNode?: (key: TreeKey, parentKey: TreeKey | null) => TreeNodeRecord;
    canEdit?: (node: TreeNodeRecord) => boolean;
    canAdd?: (node: TreeNodeRecord | null) => boolean;
    canDelete?: (node: TreeNodeRecord) => boolean;
    planDelete?: (node: TreeNodeRecord, draft: readonly TreeNodeRecord[]) => true | string | false | readonly Pick<MoveProposal, "sourceKey" | "targetKey" | "placement">[];
    canMove?: (proposal: MoveProposal) => boolean | string;
    validateField?: (node: TreeNodeRecord, next: TreeNodeRecord, draft: readonly TreeNodeRecord[]) => string | void | Promise<string | void>;
    validateTitle?: (node: TreeNodeRecord, title: string, draft: readonly TreeNodeRecord[]) => string | void | Promise<string | void>;
    validateTree?: (draft: readonly TreeNodeRecord[], baseRevision: string, signal: AbortSignal) => string | void | Promise<string | void>;
  };
  className?: string;
}

function findNode(data: readonly TreeNodeRecord[], key: TreeKey): TreeNodeRecord | undefined {
  for (const node of data) {
    if (node.key === key) return node;
    const child = findNode(node.children ?? [], key);
    if (child) return child;
  }
}
function siblingsOf(data: readonly TreeNodeRecord[], key: TreeKey): readonly TreeNodeRecord[] {
  if (data.some((node) => node.key === key)) return data;
  for (const node of data) {
    const siblings = siblingsOf(node.children ?? [], key);
    if (siblings.length) return siblings;
  }
  return [];
}
function parentKeyOf(data: readonly TreeNodeRecord[], key: TreeKey): TreeKey | null {
  for (const node of data) {
    if (node.children?.some((child) => child.key === key)) return node.key;
    const nested = parentKeyOf(node.children ?? [], key);
    if (nested !== null) return nested;
  }
  return null;
}
function incompleteSubtree(node: TreeNodeRecord): boolean {
  return node.childrenComplete === false || Boolean(node.children?.some(incompleteSubtree));
}

export function ManageTree(props: ManageTreeProps) {
  if ((props.adapter?.withTitle || props.adapter?.withChildren) && !props.adapter.isSameNode) throw new Error("ManageTree field writers require isSameNode to compare editable fields independently of children");
  for (const key of Object.keys(props.treeOptions ?? {})) if (!optionKeys.has(key)) throw new Error(`ManageTree treeOptions cannot own ${key}`);
  const { moveOptions, ...treeOptions } = props.treeOptions ?? {};
  if (props.viewState && !props.onViewStateChange) throw new Error("Controlled ManageTree viewState requires onViewStateChange");
  if (props.mode && !props.onModeChange) throw new Error("Controlled ManageTree mode requires onModeChange");
  const [ownMode, setOwnMode] = useState<"view" | "edit">(props.defaultMode ?? "view");
  const mode = props.mode ?? ownMode;
  const [committed, setCommitted] = useState<readonly TreeNodeRecord[]>(props.data);
  const [draft, setDraft] = useState<readonly TreeNodeRecord[]>(props.data);
  const live = useRef({ props, draft });
  live.current = { props, draft };
  const [baseRevision, setBaseRevision] = useState(props.revision);
  const [ownViewState, setOwnViewState] = useState<ManageTreeViewState>(() => ({ expandedKeys: [...(props.defaultExpandedKeys ?? [])], selectedKeys: [], focusedKey: null }));
  const viewState = props.viewState ?? ownViewState;
  const viewStateRef = useRef(viewState);
  viewStateRef.current = viewState;
  const { expandedKeys: expanded, selectedKeys: selected, focusedKey: focused } = viewState;
  const [editor, setEditor] = useState<{ key: TreeKey; value: TreeNodeRecord; original: TreeNodeRecord; fresh?: boolean; previousView?: ManageTreeViewState; returnKey?: TreeKey | null } | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);
  const [status, setStatus] = useState<"ready" | "saving" | "loading-latest" | "error" | "conflict">("ready");
  const [confirm, setConfirm] = useState<"discard" | "latest" | null>(null);
  const [deleteMigrationCount, setDeleteMigrationCount] = useState(0);
  const [deleteKey, setDeleteKey] = useState<TreeKey | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const incomingRevision = useRef(props.revision);
  const lastPropRevision = useRef(props.revision);
  const attempt = useRef<{ draft: readonly TreeNodeRecord[]; revision: string; key: string } | null>(null);
  const tempCounter = useRef(0), validationCounter = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const safeActionRef = useRef<HTMLButtonElement>(null);
  const addRootRef = useRef<HTMLButtonElement>(null);
  const pendingAnchor = useRef<TreeScrollAnchor | null>(null);
  const pendingFocus = useRef<TreeKey | null | undefined>(undefined);
  const treeRef = useRef<TreeHandle>(null);
  const dirty = treeChanges(committed, draft, props.adapter?.isSameNode).length > 0 || Boolean(editor && !sameNodeFields(editor.value, editor.original, props.adapter?.isSameNode));
  const locked = status === "saving" || status === "loading-latest" || requestRef.current !== null;
  const pendingEditor = Boolean(editor && (validating || editor.fresh || !sameNodeFields(editor.value, editor.original, props.adapter?.isSameNode)));

  useLayoutEffect(() => {
    if (pendingFocus.current === undefined) return;
    const key = pendingFocus.current;
    pendingFocus.current = undefined;
    if (key === null) addRootRef.current?.focus();
    else {
      const anchor = pendingAnchor.current, version = validationCounter.current;
      pendingAnchor.current = null;
      void treeRef.current?.reveal(key).then(() => { if (anchor && version === validationCounter.current) treeRef.current?.restoreScrollAnchor(anchor); });
    }
    if (key === null && pendingAnchor.current) { treeRef.current?.restoreScrollAnchor(pendingAnchor.current); pendingAnchor.current = null; }
  });

  function changeViewState(next: ManageTreeViewState) {
    viewStateRef.current = next;
    if (!props.viewState) setOwnViewState(next);
    props.onViewStateChange?.(next);
  }

  function changeMode(next: "view" | "edit") {
    if (props.mode === undefined) setOwnMode(next);
    props.onModeChange?.(next);
  }
  useEffect(() => {
    if (props.revision === lastPropRevision.current) return;
    lastPropRevision.current = props.revision;
    incomingRevision.current = props.revision;
    if (mode === "view") { setCommitted(props.data); setDraft(props.data); setBaseRevision(props.revision); }
    else if (props.revision !== baseRevision) setStatus("conflict");
  }, [props.data, props.revision, mode, baseRevision]);
  useEffect(() => () => { requestRef.current?.abort(); validationCounter.current++; }, []);

  function enter() {
    validationCounter.current++; setValidating(false); setFieldError(null);
    setDraft(committed);
    attempt.current = null;
    setStatus("ready"); setEditor(null); changeMode("edit");
  }
  function leave() {
    validationCounter.current++; setValidating(false); setFieldError(null);
    const latest = props.revision !== baseRevision && props.revision === incomingRevision.current;
    if (latest) { setCommitted(props.data); setBaseRevision(props.revision); }
    changeViewState(mapViewState(viewStateRef.current, latest ? props.data : committed));
    setEditor(null); setDraft(latest ? props.data : committed); setStatus("ready"); setConfirm(null); setDeleteKey(null); changeMode("view");
  }
  function askLeave() { if (locked) return; if (dirty) setConfirm("discard"); else leave(); }
  const editAction = useRef(startEdit);
  editAction.current = startEdit;
  function startEdit(key: TreeKey) {
    if (!treeRef.current || mode !== "edit" || locked) return;
    const node = findNode(draft, key);
    if (!node) return;
    try { if (props.adapter?.canEdit?.(node) === false) return; }
    catch { props.onFeedback({ intent: "error", message: "编辑权限校验失败" }); return; }
    if (pendingEditor) { props.onFeedback({ intent: "warning", message: "请先确认或取消当前标题修改" }); inputRef.current?.focus(); return; }
    validationCounter.current++;
    setFieldError(null); setValidating(false);
    setEditor({ key: node.key, value: node, original: node });
    requestAnimationFrame(() => inputRef.current?.focus());
  }
  function reportFieldError(message: string) { setFieldError(message); props.onFeedback({ intent: "error", message }); inputRef.current?.focus(); }
  async function confirmTitle() {
    if (!editor) return;
    const node = findNode(draft, editor.key);
    if (!node) return;
    if (locked) return;
    const value = editor.value.title.trim();
    if (!value) { reportFieldError("标题不能为空"); return; }
    if (value.length > 100) { reportFieldError("标题不能超过 100 个字符"); return; }
    if (siblingsOf(draft, editor.key).some((sibling) => sibling.key !== editor.key && sibling.title.trim() === value)) {
      reportFieldError("同级标题不能重复"); return;
    }
    const current = ++validationCounter.current;
    setValidating(true); setFieldError(null);
    try {
      if (props.adapter?.canEdit?.(node) === false) throw new Error("当前节点不允许编辑");
      const candidate = props.adapter?.withTitle?.(editor.value, value) ?? { ...editor.value, title: value };
      if (candidate.key !== node.key || candidate.title !== value || candidate.children !== node.children) throw new Error("字段编辑不能修改节点身份或子树");
      const error = await props.adapter?.validateTitle?.(node, value, draft) || await props.adapter?.validateField?.(node, candidate, draft);
      if (current !== validationCounter.current) return;
      if (error) { reportFieldError(error); return; }
      if (live.current.draft !== draft) throw new Error("结构已变化，请重新确认字段修改");
      if (live.current.props.adapter?.canEdit?.(node) === false) throw new Error("编辑权限已变化，输入已保留");
      const next = updateTreeNode(draft, editor.key, candidate, props.adapter);
      validateTreeData(next);
      setDraft(next);
      pendingFocus.current = editor.key;
      setEditor(null);
    } catch (error) { if (current === validationCounter.current) { reportFieldError(error instanceof Error ? error.message : "字段校验失败，请重试"); } }
    finally { if (current === validationCounter.current) setValidating(false); }
  }
  function changeEditor(next: TreeNodeRecord) {
    if (!editor || locked) return;
    if (next.key !== editor.original.key || next.children !== editor.original.children) { props.onFeedback({ intent: "error", message: "字段编辑不能修改节点身份或子树" }); return; }
    validationCounter.current++; setValidating(false); setFieldError(null);
    setEditor({ ...editor, value: next });
  }
  function cancelTitle() {
    if (locked) return;
    validationCounter.current++; setValidating(false);
    if (editor?.fresh) {
      setDraft((previous) => removeTreeNode(previous, editor.key, props.adapter));
      if (editor.previousView) changeViewState(editor.previousView);
      pendingFocus.current = editor.returnKey ?? null;
    } else if (editor) pendingFocus.current = editor.key;
    setEditor(null);
  }
  function add(anchor: TreeKey | null, placement: "after" | "inside") {
    if (locked || pendingEditor) { props.onFeedback({ intent: "warning", message: "请先确认或取消当前标题修改" }); return; }
    const parentKey = placement === "inside" ? anchor : anchor === null ? null : parentKeyOf(draft, anchor);
    const parent = parentKey === null ? null : findNode(draft, parentKey) ?? null;
    try {
      if (props.adapter?.canAdd?.(parent) === false) throw new Error("当前节点不允许新增");
      if (parent?.childrenComplete === false) throw new Error("目标子树尚未完整加载，无法确定新增位置");
      let key: TreeKey;
      do { key = `tmp-${++tempCounter.current}`; } while (findNode(draft, key));
      const node = props.adapter?.createNode?.(key, parentKey) ?? { key, title: "新节点", canHaveChildren: false };
      const nextDraft = addTreeNode(draft, anchor, placement, node, props.adapter);
      validateTreeData(nextDraft);
      const previousView = viewStateRef.current;
      validationCounter.current++;
      setDraft(nextDraft);
      changeViewState({ ...previousView, expandedKeys: placement === "inside" && anchor !== null ? [...new Set([...expanded, anchor])] : expanded,
        selectedKeys: [node.key], focusedKey: node.key });
      setFieldError(null); setValidating(false);
      setEditor({ key: node.key, value: node, original: node, fresh: true, previousView, returnKey: anchor });
      requestAnimationFrame(() => inputRef.current?.focus());
    } catch (error) { props.onFeedback({ intent: "error", message: error instanceof Error ? error.message : "新增失败" }); }
  }
  function canDelete(node: TreeNodeRecord): boolean {
    if (locked) return false;
    try { if (props.adapter?.canDelete?.(node) === false) return false; }
    catch { props.onFeedback({ intent: "error", message: "删除权限校验失败" }); return false; }
    if (pendingEditor) { props.onFeedback({ intent: "warning", message: "请先确认或取消当前标题修改" }); return false; }
    return true;
  }
  function askDelete(node: TreeNodeRecord) {
    if (!canDelete(node)) return;
    try {
      const plan = props.adapter?.planDelete?.(node, draft) ?? (incompleteSubtree(node) ? false : true);
      if (typeof plan === "string" || plan === false || incompleteSubtree(node) && plan !== true) throw new Error(typeof plan === "string" ? plan : "子树尚未完整加载，无法确认删除范围");
      setDeleteMigrationCount(Array.isArray(plan) ? plan.length : 0);
    } catch (error) { props.onFeedback({ intent: "error", message: error instanceof Error ? error.message : "删除范围校验失败" }); return; }
    setDeleteKey(node.key);
  }
  function remove() {
    if (deleteKey === null) return;
    const node = findNode(draft, deleteKey);
    if (!node || !canDelete(node)) { setDeleteKey(null); return; }
    let next: readonly TreeNodeRecord[] = draft;
    try {
      const plan = props.adapter?.planDelete?.(node, draft) ?? (incompleteSubtree(node) ? false : true);
      if (typeof plan === "string" || plan === false) throw new Error(typeof plan === "string" ? plan : "无法确认删除范围");
      if (Array.isArray(plan)) {
        if (incompleteSubtree(node)) throw new Error("迁移前必须完整加载子树");
        for (const step of plan) {
          const proposal = validateTreeMove(next, step.sourceKey, step.targetKey, step.placement, { ...moveOptions, canDrop: canMove });
          if (!proposal.ok) throw new Error(proposal.reason);
          next = applyTreeMove(next, proposal.proposal);
        }
      }
      next = removeTreeNode(syncTreeChildren(next, props.adapter), deleteKey, props.adapter);
      validateTreeData(next);
    } catch (error) { props.onFeedback({ intent: "error", message: error instanceof Error ? error.message : "迁移删除失败，草稿未改变" }); return; }
    const siblings = siblingsOf(draft, deleteKey), position = siblings.findIndex((item) => item.key === deleteKey);
    const fallback = siblings[position + 1]?.key ?? siblings[position - 1]?.key ?? parentKeyOf(draft, deleteKey) ?? next[0]?.key ?? null;
    setDraft(next);
    if (editor && !findNode(next, editor.key)) { validationCounter.current++; setEditor(null); }
    changeViewState({ ...viewStateRef.current, expandedKeys: expanded.filter((key) => findNode(next, key)), selectedKeys: selected.filter((key) => findNode(next, key)), focusedKey: fallback });
    pendingFocus.current = fallback;
    setDeleteKey(null);
  }
  function canMove(proposal: MoveProposal): boolean | string {
    const result = props.adapter?.canMove?.(proposal);
    return result === false || typeof result === "string" ? result : moveOptions?.canDrop?.(proposal) ?? true;
  }
  function move(proposal: MoveProposal) {
    if (locked || pendingEditor) { props.onFeedback({ intent: "warning", message: "请先确认或取消当前标题修改" }); return; }
    const validation = validateTreeMove(draft, proposal.sourceKey, proposal.targetKey, proposal.placement, { ...moveOptions, canDrop: canMove });
    if (!validation.ok) { props.onFeedback({ intent: "error", message: validation.reason }); return; }
    try { setDraft(syncTreeChildren(applyTreeMove(draft, validation.proposal), props.adapter)); }
    catch { props.onFeedback({ intent: "error", message: "移动目标已变化，请重试" }); }
  }
  async function save() {
    if (locked || requestRef.current) return;
    if (status === "conflict") { props.onFeedback({ intent: "warning", message: "数据版本已变化，请先处理冲突" }); return; }
    if (editor) { props.onFeedback({ intent: "warning", message: "请先确认或取消当前标题修改" }); inputRef.current?.focus(); return; }
    const changeset = treeChanges(committed, draft, props.adapter?.isSameNode);
    if (!changeset.length) { leave(); return; }
    const abort = new AbortController();
    requestRef.current = abort;
    const submitted = draft, submittedRevision = baseRevision;
    if (!attempt.current || attempt.current.draft !== submitted || attempt.current.revision !== submittedRevision)
      attempt.current = { draft: submitted, revision: submittedRevision, key: globalThis.crypto?.randomUUID?.() ?? `tree-${Date.now()}-${Math.random()}` };
    const idempotencyKey = attempt.current.key;
    setStatus("saving");
    try {
      validateTreeData(submitted);
      const validationError = await props.adapter?.validateTree?.(submitted, submittedRevision, abort.signal);
      if (abort.signal.aborted || requestRef.current !== abort) return;
      if (incomingRevision.current !== submittedRevision) {
        setStatus("conflict"); props.onFeedback({ intent: "warning", message: "校验期间数据版本变化，本地草稿已保留" }); return;
      }
      if (validationError) throw new Error(validationError);
      const result = await props.onSave({ draft: submitted, changeset, baseRevision: submittedRevision, idempotencyKey, signal: abort.signal });
      if (abort.signal.aborted || requestRef.current !== abort) return;
      if (incomingRevision.current !== submittedRevision && (result.status !== "success" || incomingRevision.current !== result.revision)) {
        setStatus("conflict"); props.onFeedback({ intent: "warning", message: "保存期间数据版本变化，本地草稿已保留" }); return;
      }
      if (result.status === "conflict") { setStatus("conflict"); props.onFeedback({ intent: "warning", message: "保存冲突，本地草稿已保留" }); return; }
      assertSaveSuccess(submitted, result);
      const currentView = viewStateRef.current;
      const nextView = mapViewState({ ...currentView, scrollAnchor: treeRef.current?.getScrollAnchor() ?? currentView.scrollAnchor }, result.treeData, result.keyMap);
      const nextFocused = nextView.focusedKey;
      changeViewState(nextView);
      pendingAnchor.current = nextView.scrollAnchor ?? null;
      setCommitted(result.treeData); setDraft(result.treeData); setBaseRevision(result.revision);
      incomingRevision.current = result.revision;
      attempt.current = null;
      setStatus("ready"); changeMode("view");
      props.onFeedback({ intent: "success", message: "保存成功" });
      pendingFocus.current = nextFocused;
    } catch (error) {
      if (abort.signal.aborted) return;
      setStatus(incomingRevision.current !== submittedRevision ? "conflict" : "error");
      props.onFeedback({ intent: "error", message: error instanceof Error ? error.message : "保存失败" });
    } finally { if (requestRef.current === abort) requestRef.current = null; }
  }
  async function loadLatest() {
    if (!props.loadLatest || requestRef.current) return;
    const abort = new AbortController(), revision = incomingRevision.current;
    requestRef.current = abort;
    setStatus("loading-latest");
    try {
      const latest = await props.loadLatest();
      if (abort.signal.aborted || requestRef.current !== abort) return;
      if (incomingRevision.current !== revision && latest.revision !== incomingRevision.current) throw new Error("最新版本已变化");
      if (!Array.isArray(latest.treeData) || !latest.revision) throw new Error("最新数据无效");
      validateTreeData(latest.treeData);
      changeViewState(mapViewState(viewStateRef.current, latest.treeData));
      setCommitted(latest.treeData); setDraft(latest.treeData); setBaseRevision(latest.revision);
      incomingRevision.current = latest.revision;
      validationCounter.current++;
      setValidating(false); setFieldError(null);
      attempt.current = null;
      setEditor(null); setStatus("ready"); setConfirm(null); changeMode("view");
      props.onFeedback({ intent: "info", message: "已加载最新版" });
    } catch {
      if (!abort.signal.aborted) { setStatus("conflict"); props.onFeedback({ intent: "error", message: "加载最新版失败，本地草稿已保留" }); }
    } finally { if (requestRef.current === abort) requestRef.current = null; }
  }

  return <section data-rain-id="pattern-manage-tree" data-slot="root" data-mode={mode} data-status={status} className={`rain-manage-tree ${props.className ?? ""}`}>
    <div data-slot="toolbar">
      {mode === "view" ? <Button onClick={enter}>进入编辑</Button> : <>
        <Button variant="secondary" onClick={askLeave} disabled={locked}>退出编辑</Button>
        <Button ref={addRootRef} variant="secondary" onClick={() => add(null, "after")} disabled={locked}>添加根节点</Button>
        <Button onClick={() => void save()} loading={locked} disabled={locked}>保存草稿</Button>
      </>}
    </div>
    {status === "conflict" && <div data-slot="conflict" role="status">数据版本冲突，本地草稿已保留。{props.loadLatest && <Button disabled={locked} variant="text" onClick={() => setConfirm("latest")}>加载最新版</Button>}</div>}
    <Tree variant="rich" showLine {...treeOptions} ref={treeRef} data={mode === "edit" ? draft : committed} dataRevision={baseRevision}
      checkState={viewState.checkState ?? emptyChecks} onCheckStateChange={(checkState) => changeViewState({ ...viewStateRef.current, checkState })}
      onScrollAnchorChange={(scrollAnchor) => changeViewState({ ...viewStateRef.current, scrollAnchor })}
      expandedKeys={expanded} onExpandedKeysChange={(keys) => changeViewState({ ...viewStateRef.current, expandedKeys: keys })}
      selectedKeys={selected} onSelectedKeysChange={(keys) => changeViewState({ ...viewStateRef.current, selectedKeys: keys })}
      focusedKey={focused} onFocusedKeyChange={(key) => changeViewState({ ...viewStateRef.current, focusedKey: key })}
      onEditRequest={mode === "edit" ? (key) => editAction.current(key) : undefined}
      dragAndDrop={mode === "edit" && !locked && !pendingEditor ? { ...moveOptions, onMove: move, canDrop: canMove } : undefined}
      renderTitle={(node) => !props.renderEditor && editor?.key === node.key ? <span data-slot="editor" onClick={(event) => event.stopPropagation()}>
        <span hidden data-testid={`draft-title-${String(node.key)}`}>{node.title}</span>
        <Input ref={inputRef} aria-label="标题" clearable={false} size={28} value={editor.value.title} onValueChange={(title) => changeEditor({ ...editor.value, title })}
          onKeyDown={(event) => { event.stopPropagation(); if (event.nativeEvent.isComposing) return; if (event.key === "Enter") void confirmTitle(); if (event.key === "Escape") cancelTitle(); }} />
      </span> : <span data-testid={`draft-title-${String(node.key)}`}>{node.title}</span>}
      renderActions={(node, tree) => {
        const actions = mode === "edit" && !locked ? editor?.key === node.key ? props.renderEditor ? null : <>
        <IconButton size="24/14" icon={<CheckBoldIcon />} highlight="icon" aria-label="确认标题" onClick={() => void confirmTitle()} />
        <IconButton size="24/14" icon={<CloseIcon />} aria-label="取消标题" onClick={cancelTitle} />
      </> : <>
        <IconButton size="24/14" icon={<EditPencilIcon />} aria-label={`编辑${node.title}`} onClick={() => editAction.current(node.key)} />
        <IconButton size="24/14" icon={<GraphNodeAddIcon />} aria-label={`在${node.title}之后添加同级`} onClick={() => add(node.key, "after")} />
        {(node.canHaveChildren === true || Boolean(node.children?.length)) && <IconButton size="24/14" icon={<GraphChildNodeAddIcon />} aria-label={`在${node.title}下添加子级`} onClick={() => add(node.key, "inside")} />}
        <Popover.Root open={deleteKey === node.key} onOpenChange={(open) => { if (open) askDelete(node); else if (deleteKey === node.key) setDeleteKey(null); }}>
          <Popover.Trigger render={<IconButton size="24/14" icon={<DeleteIcon />} aria-label={`删除${node.title}`} tone="danger" />} />
          <Popover.Content width={256} className="rain-manage-tree-delete-popover" positionerProps={{ side: "bottom", align: "end" }}>
            <Popover.Title>{deleteMigrationCount ? `确认迁移 ${deleteMigrationCount} 个节点并删除当前节点？` : "确认删除当前节点及其子节点？"}</Popover.Title>
            <div data-slot="delete-actions">
              <Button size="small" variant="secondary" onClick={() => setDeleteKey(null)}>继续编辑</Button>
              <Button size="small" tone="danger" onClick={remove}>确认删除</Button>
            </div>
          </Popover.Content>
        </Popover.Root>
      </> : null;
        return mode === "edit" && !locked && !editor && props.renderActions ? props.renderActions(node, { defaultActions: actions, edit: () => editAction.current(node.key), tree }) : actions;
      }} />
    {editor && props.renderEditor?.({ node: editor.original, value: editor.value, onChange: changeEditor, confirm: confirmTitle, cancel: cancelTitle, validating, error: fieldError })}
    <AlertDialog.Root open={confirm !== null} onOpenChange={(open) => { if (!open && !locked) setConfirm(null); }}>
      {confirm && <AlertDialog.Content initialFocus={safeActionRef}>
        <AlertDialog.Header><AlertDialog.Title>确认操作</AlertDialog.Title>
          <AlertDialog.Description>{confirm === "latest" ? "放弃本地草稿并加载最新版？" : "放弃未保存的修改？"}</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <Button ref={safeActionRef} variant="secondary" disabled={locked} onClick={() => setConfirm(null)}>继续编辑</Button>
          <Button tone="danger" disabled={locked} onClick={() => { if (confirm === "latest") void loadLatest(); else leave(); }}>{confirm === "latest" ? "放弃并加载" : "放弃修改"}</Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>}
    </AlertDialog.Root>
  </section>;
}
