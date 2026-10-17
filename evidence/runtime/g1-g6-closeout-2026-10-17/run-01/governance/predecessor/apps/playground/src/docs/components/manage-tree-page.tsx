import { useRef, useState } from "react";
import type { TreeKey, TreeNodeRecord } from "@rain-next/ui";
import { ManageTree, type SaveResponse } from "../../patterns/manage-tree/manage-tree";
import "./tree-page.css";
import { ManageTreeDomainExamples } from "./manage-tree-domain-examples";

const initial: TreeNodeRecord[] = [
  { key: "chapter-1", title: "第一章　随机事件与概率", children: [
    { key: "learning", title: "课前学习", description: "观看视频后，结合实际场景思考概率。", children: [
      { key: "video", title: "生活中的随机现象", description: "12 分 30 秒 · 已发布" },
      { key: "discussion", title: "分享一个你观察到的随机事件", description: "请尝试描述样本空间。" },
    ] },
    { key: "practice", title: "课后练习", children: [{ key: "quiz", title: "古典概型练习" }] },
  ] },
  { key: "chapter-2", title: "第二章　随机变量", children: [{ key: "section", title: "2.1　离散型随机变量" }] },
];

export function ManageTreePage() {
  const [record, setRecord] = useState<{ data: readonly TreeNodeRecord[]; revision: string }>({ data: initial, revision: "1" });
  const [message, setMessage] = useState("");
  const version = useRef(1), nextKey = useRef(100);
  async function save({ draft, baseRevision }: { draft: readonly TreeNodeRecord[]; baseRevision: string; signal: AbortSignal }): Promise<SaveResponse> {
    await new Promise((resolve) => setTimeout(resolve, 350));
    if (baseRevision !== String(version.current)) return { status: "conflict" };
    const keyMap = new Map<TreeKey, TreeKey>();
    function canonical(nodes: readonly TreeNodeRecord[]): TreeNodeRecord[] {
      return nodes.map((node) => {
        const key = typeof node.key === "string" && node.key.startsWith("tmp-") ? `node-${++nextKey.current}` : node.key;
        if (key !== node.key) keyMap.set(node.key, key);
        return { ...node, key, children: node.children ? canonical(node.children) : undefined };
      });
    }
    const treeData = canonical(draft), revision = String(++version.current);
    setRecord({ data: treeData, revision });
    return { status: "success", treeData, revision, keyMap };
  }
  return <main className="tree-page" data-rain-id="manage-tree-page" data-asset-identity="local-candidate">
    <header className="tree-page__header"><a href="#components">返回 Components</a><h1 id="manage-tree-title" tabIndex={-1}>ManageTree 管理树</h1>
      <p>标题原位编辑、草稿增删移动与完整保存流程。此页使用本地模拟数据。</p></header>
    <section className="tree-page__panel" style={{ marginTop: 28 }}>
      <ManageTree data={record.data} revision={record.revision} defaultMode="edit" defaultExpandedKeys={["chapter-1", "learning", "practice", "chapter-2"]}
        onSave={save} loadLatest={async () => ({ treeData: record.data, revision: record.revision })}
        onFeedback={({ message: text }) => setMessage(text)}
        adapter={{
          createNode: (key, parentKey) => ({ key, title: "新节点", canHaveChildren: parentKey === null }),
          validateTitle: (node, title, draft) => {
            if (!title.trim()) return "标题不能为空";
            if (title.length > 100) return "标题不能超过 100 个字符";
            const siblingNames = draft.flatMap((item) => item.key === node.key ? [] : [item.title]);
            if (siblingNames.includes(title)) return "同级标题不能重复";
          },
        }} />
    </section>
    <p role="status" aria-live="polite">{message}</p>
    <ManageTreeDomainExamples />
  </main>;
}
