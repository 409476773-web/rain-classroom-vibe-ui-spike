import { useRef, useState } from "react";
import { Button, Dialog, FormItem, Input, Select, type TreeKey, type TreeNodeRecord } from "@rain-next/ui";
import { ManageTree, type ManageTreeEditorContext, type ManageTreeProps, type ManageTreeViewState } from "../../patterns/manage-tree/manage-tree";

type DomainNode = { id: TreeKey; name: string; kind: "chapter" | "knowledge" | "task"; note: string; taskType?: string; items?: readonly DomainNode[] };
const source = (node: TreeNodeRecord) => node.source as DomainNode;
function record(node: DomainNode): TreeNodeRecord {
  return { key: node.id, title: node.name, source: node, description: node.note, canHaveChildren: node.kind === "chapter", children: node.items?.map(record) };
}
function DomainEditor({ value, onChange, confirm, cancel, validating, error }: ManageTreeEditorContext) {
  const info = source(value);
  return <Dialog.Root open onOpenChange={(open) => { if (!open) cancel(); }}>
    <Dialog.Content width={416} finalFocus={false}>
      <Dialog.Header><Dialog.Title>编辑{info.kind === "chapter" ? "章节" : info.kind === "task" ? "学习任务" : "知识点"}</Dialog.Title>
        <Dialog.Description>确认后写入草稿，保存草稿后统一提交。</Dialog.Description></Dialog.Header>
      <Dialog.Body className="manage-tree-domain-fields">
        <FormItem label="名称"><Input size={36} clearable={false} value={value.title} onValueChange={(title) => onChange({ ...value, title })} /></FormItem>
        <FormItem label="说明"><Input size={36} value={info.note} onValueChange={(note) => onChange({ ...value, description: note, source: { ...info, note } })} /></FormItem>
        {info.kind === "task" && <FormItem label="任务类型"><Select size={36} placeholder="请选择任务类型" value={info.taskType ?? null}
          options={[{ value: "video", label: "视频" }, { value: "discussion", label: "讨论" }, { value: "quiz", label: "自测" }]}
          onValueChange={(taskType) => onChange({ ...value, source: { ...info, taskType: taskType ?? undefined } })} /></FormItem>}
        {error && <p role="alert">{error}</p>}
      </Dialog.Body>
      <Dialog.Footer><Button variant="secondary" onClick={cancel}>取消编辑</Button><Button loading={validating} disabled={validating} onClick={() => void confirm()}>确认编辑</Button></Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>;
}

function DomainExample({ kind }: { kind: "knowledge" | "task" }) {
  const [initial] = useState(() => [record({ id: "chapter-a", name: "第一章　随机事件", kind: "chapter", note: "删除本章时，将子节点迁移到第二章。", items: Array.from({ length: 8 }, (_, index) => ({
    id: `item-${index}`, name: `${kind === "knowledge" ? "知识点" : "学习任务"} ${index + 1} · ${["样本空间", "事件的关系", "古典概型", "条件概率"][index % 4]}`,
    kind, note: kind === "knowledge" ? "理解概念，并用生活中的例子解释。" : "完成本节学习后，记录你的思考。", ...(kind === "task" ? { taskType: "video" } : {}),
  })) }), record({ id: "chapter-b", name: "第二章　随机变量", kind: "chapter", note: "接收迁移后的内容。", items: [] })]);
  const [snapshot, setSnapshot] = useState({ data: initial, revision: "1" });
  const server = useRef(snapshot), failNext = useRef(false), nextKey = useRef(100);
  const [failureEnabled, setFailureEnabled] = useState(false), [message, setMessage] = useState("");
  const [view, setView] = useState<ManageTreeViewState>({ expandedKeys: ["chapter-a", "chapter-b"], selectedKeys: [], focusedKey: null });
  const adapter: NonNullable<ManageTreeProps["adapter"]> = {
    createNode: (key, parent) => record({ id: key, name: parent === null ? "新章节" : kind === "task" ? "新学习任务" : "新知识点", kind: parent === null ? "chapter" : kind, note: "", ...(parent === null ? { items: [] } : {}) }),
    withTitle: (node, title) => ({ ...node, title, source: { ...source(node), name: title } }),
    withChildren: (node, children) => ({ ...node, children, source: { ...source(node), items: children.map(source) } }),
    isSameNode: (a, b) => a.title === b.title && source(a).note === source(b).note && source(a).taskType === source(b).taskType,
    canAdd: (node) => node === null || source(node).kind === "chapter",
    validateField: (_, next) => source(next).kind === "task" && !source(next).taskType ? "请选择任务类型" : undefined,
    validateTree: (data) => {
      const invalid = (nodes: readonly TreeNodeRecord[]): boolean => nodes.some((node) => source(node).kind === "task" && !source(node).taskType || invalid(node.children ?? []));
      return invalid(data) ? "学习任务必须选择任务类型" : undefined;
    },
    planDelete: (node, draft) => {
      if (source(node).kind !== "chapter" || !node.children?.length) return true;
      const target = draft.find((other) => other.key !== node.key && source(other).kind === "chapter");
      return target ? node.children.map((child) => ({ sourceKey: child.key, targetKey: target.key, placement: "inside" as const })) : "请先保留一个可接收内容的章节";
    },
  };
  const save: ManageTreeProps["onSave"] = async ({ draft, baseRevision, signal }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (signal.aborted) throw new Error("保存已取消");
    if (failNext.current) { failNext.current = false; setFailureEnabled(false); throw new Error("模拟保存失败，草稿已保留，服务端内容未改变"); }
    if (baseRevision !== server.current.revision) return { status: "conflict" };
    const keyMap = new Map<TreeKey, TreeKey>();
    function canonical(nodes: readonly TreeNodeRecord[]): TreeNodeRecord[] {
      return nodes.map((node) => {
        const key = String(node.key).startsWith("tmp-") ? `saved-${++nextKey.current}` : node.key;
        if (key !== node.key) keyMap.set(node.key, key);
        const children = node.children ? canonical(node.children) : undefined;
        return { ...node, key, children, source: { ...source(node), id: key, ...(children ? { items: children.map(source) } : {}) } };
      });
    }
    const treeData = canonical(draft), revision = String(Number(server.current.revision) + 1);
    server.current = { data: treeData, revision }; setSnapshot(server.current);
    return { status: "success", treeData, revision, keyMap };
  };
  return <div data-slot="domain-example" data-domain={kind}>
    <p>本地模拟保存。字段编辑、勾选、迁移删除都保留在同一份草稿中。</p>
    <Button variant="text" aria-pressed={failureEnabled} onClick={() => { failNext.current = !failureEnabled; setFailureEnabled(!failureEnabled); }}>下次保存失败：{failureEnabled ? "开启" : "关闭"}</Button>
    <ManageTree data={snapshot.data} revision={snapshot.revision} defaultMode="edit" treeOptions={{ checkable: true, "aria-label": kind === "knowledge" ? "章节知识点树" : "章节学习任务树" }}
      viewState={view} onViewStateChange={setView} adapter={adapter} renderEditor={(context) => <DomainEditor {...context} />} onSave={save} onFeedback={({ message }) => setMessage(message)} />
    <p role="status">{message}</p>
    <p data-slot="server-state">已提交版本 {snapshot.revision} · {snapshot.data.length} 个章节</p>
  </div>;
}

export function ManageTreeDomainExamples() {
  const [knowledgeOpen, setKnowledgeOpen] = useState(false), [taskOpen, setTaskOpen] = useState(false);
  return <div className="tree-page__behavior-examples">
    <details className="tree-page__panel" onToggle={(event) => setKnowledgeOpen(event.currentTarget.open)}><summary>章节与知识点 · 领域字段编辑</summary>{knowledgeOpen && <DomainExample kind="knowledge" />}</details>
    <details className="tree-page__panel" onToggle={(event) => setTaskOpen(event.currentTarget.open)}><summary>章节与学习任务 · 迁移删除与失败恢复</summary>{taskOpen && <DomainExample kind="task" />}</details>
  </div>;
}
