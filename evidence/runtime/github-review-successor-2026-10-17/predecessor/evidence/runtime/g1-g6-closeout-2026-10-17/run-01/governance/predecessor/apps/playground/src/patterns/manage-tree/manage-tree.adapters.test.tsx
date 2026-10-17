import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import type { TreeNodeRecord } from "@rain-next/ui";
import { ManageTree, type ManageTreeProps, type ManageTreeViewState } from "./manage-tree";

const nodes: TreeNodeRecord[] = [{ key: "chapter", title: "章节", source: { label: "章节", businessId: 42 }, children: [{ key: "task", title: "任务", source: { note: "原说明" } }] }, { key: "other", title: "保留章节", canHaveChildren: true }];
const feedback = vi.fn();
const success = async ({ draft }: { draft: readonly TreeNodeRecord[] }) => ({ status: "success" as const, treeData: draft, revision: "2" });
const editor: ManageTreeProps["renderEditor"] = ({ value, onChange, confirm, cancel }) => <div role="dialog" aria-label="业务编辑">
  <input aria-label="业务说明" value={(value.source as { note?: string })?.note ?? ""} onChange={(event) => onChange({ ...value, source: { ...value.source as object, note: event.target.value } })} />
  <button onClick={() => void confirm()}>确认业务编辑</button><button onClick={cancel}>取消业务编辑</button>
</div>;

describe("ManageTree domain editing", () => {
  it("passes Tree state to custom actions and allows a host empty view", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ManageTree data={nodes} revision="1" defaultMode="edit" onSave={success} onFeedback={feedback}
      treeOptions={{ checkable: true }} renderActions={(node, { defaultActions, tree }) => <>{defaultActions}<button onClick={() => tree.actions.toggleChecked()}>{tree.checked ? "取消" : "勾选"}{node.title}</button></>} />);
    await user.click(screen.getByRole("button", { name: "勾选章节" }));
    expect(screen.getByRole("button", { name: "取消章节" })).toBeInTheDocument();
    rerender(<ManageTree key="empty" data={[]} revision="1" onSave={success} onFeedback={feedback}
      treeOptions={{ renderEmpty: ({ reason }) => <p>{reason === "empty" ? "请添加第一个章节" : "没有匹配章节"}</p> }} />);
    expect(screen.getByText("请添加第一个章节")).toBeInTheDocument();
  });
  it("rechecks a retained custom edit action before replacing an editor", async () => {
    const user = userEvent.setup();
    const actions = new Map<string, () => void>();
    const renderActions: ManageTreeProps["renderActions"] = (node, { defaultActions, edit }) => { actions.set(String(node.key), edit); return defaultActions; };
    const props = { data: nodes, revision: "1", defaultMode: "edit" as const, onSave: success, onFeedback: feedback, renderActions };
    const { rerender } = render(<ManageTree {...props} />);
    const retainedEdit = actions.get("other")!;
    await user.click(screen.getByRole("button", { name: "编辑章节" }));
    const input = screen.getByRole("textbox", { name: "标题" });
    await user.clear(input); await user.type(input, "未确认章节");
    act(() => retainedEdit());
    expect(screen.getByRole("textbox", { name: "标题" })).toHaveValue("未确认章节");
    await user.click(screen.getByRole("button", { name: "取消标题" }));
    rerender(<ManageTree {...props} adapter={{ canEdit: () => false }} />);
    act(() => retainedEdit());
    expect(screen.queryByRole("textbox", { name: "标题" })).not.toBeInTheDocument();
    rerender(<ManageTree {...props} />);
    await user.click(screen.getByRole("button", { name: "退出编辑" }));
    act(() => retainedEdit());
    expect(screen.queryByRole("textbox", { name: "标题" })).not.toBeInTheDocument();
  });
  it("keeps the buffer if edit permission is revoked during field validation", async () => {
    const user = userEvent.setup(), onFeedback = vi.fn();
    let finish!: () => void;
    const validateField = () => new Promise<void>((resolve) => { finish = resolve; });
    const view = render(<ManageTree data={nodes} revision="1" defaultMode="edit" onFeedback={onFeedback} onSave={success} adapter={{ validateField }} />);
    await user.click(screen.getByRole("button", { name: "编辑章节" }));
    const input = screen.getByRole("textbox", { name: "标题" });
    await user.clear(input); await user.type(input, "不应提交");
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    view.rerender(<ManageTree data={nodes} revision="1" defaultMode="edit" onFeedback={onFeedback} onSave={success} adapter={{ validateField, canEdit: () => false }} />);
    await act(async () => finish());
    expect(screen.getByRole("textbox", { name: "标题" })).toHaveValue("不应提交");
    expect(screen.getByTestId("draft-title-chapter")).toHaveTextContent("章节");
    expect(onFeedback).toHaveBeenCalledWith(expect.objectContaining({ intent: "error" }));
  });
  it("requires business equality with custom field writers", () => {
    expect(() => render(<ManageTree data={nodes} revision="1" onFeedback={feedback} onSave={success}
      adapter={{ withChildren: (node, children) => ({ ...node, children }) }} />)).toThrow(/isSameNode/);
  });
  it("exits cleanly after adding then canceling a child through domain writers", async () => {
    const user = userEvent.setup();
    render(<ManageTree data={nodes} revision="1" defaultMode="edit" onFeedback={feedback} onSave={success}
      adapter={{ withChildren: (node, children) => ({ ...node, children, source: { ...node.source as object, items: children } }),
        isSameNode: (a, b) => (a.source as { note?: string })?.note === (b.source as { note?: string })?.note }} />);
    await user.click(screen.getByRole("button", { name: "在章节下添加子级" }));
    await user.click(screen.getByRole("button", { name: "取消标题" }));
    await user.click(screen.getByRole("button", { name: "退出编辑" }));
    expect(screen.getByRole("button", { name: "进入编辑" })).toBeInTheDocument();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
  it("blocks structural changes while an unchanged field awaits validation", async () => {
    const user = userEvent.setup();
    let finish!: () => void;
    render(<ManageTree data={nodes} revision="1" defaultMode="edit" onFeedback={feedback} onSave={success}
      adapter={{ validateTitle: () => new Promise<void>((resolve) => { finish = resolve; }) }} />);
    await user.click(screen.getByRole("button", { name: "编辑章节" }));
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    await user.click(screen.getByRole("button", { name: "删除保留章节" }));
    expect(screen.queryByRole("button", { name: "确认删除" })).not.toBeInTheDocument();
    await act(async () => finish());
    expect(screen.getByRole("treeitem", { name: "保留章节" })).toBeInTheDocument();
  });
  it("writes domain titles and parent child lists without losing business fields", async () => {
    const user = userEvent.setup(), save = vi.fn(success);
    render(<ManageTree data={nodes} revision="1" defaultMode="edit" defaultExpandedKeys={["chapter"]} onFeedback={feedback} onSave={save}
      adapter={{ isSameNode: (a, b) => a.title === b.title && (a.source as { note?: string })?.note === (b.source as { note?: string })?.note,
        withTitle: (node, title) => ({ ...node, title, source: { ...node.source as object, label: title } }),
        withChildren: (node, children) => ({ ...node, children, source: { ...node.source as object, items: children.map((child) => child.source) } }) }} />);
    await user.click(screen.getByRole("button", { name: "编辑任务" }));
    const input = screen.getByRole("textbox", { name: "标题" });
    await user.clear(input); await user.type(input, "新任务{Enter}");
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    await waitFor(() => expect(save).toHaveBeenCalled());
    expect(save.mock.calls[0]![0].draft[0]?.source).toEqual({ label: "章节", businessId: 42, items: [{ note: "原说明", label: "新任务" }] });
    expect(nodes[0]?.children?.[0]?.source).toEqual({ note: "原说明" });
  });
  it("keeps custom fields in one buffer, cancels them and only saves explicitly confirmed values", async () => {
    const user = userEvent.setup(), save = vi.fn(success);
    render(<ManageTree data={nodes} revision="1" defaultMode="edit" defaultExpandedKeys={["chapter"]} onFeedback={feedback} onSave={save} renderEditor={editor}
      adapter={{ isSameNode: (a, b) => (a.source as { note?: string })?.note === (b.source as { note?: string })?.note }} />);
    await user.click(screen.getByRole("button", { name: "编辑任务" }));
    const input = screen.getByRole("textbox", { name: "业务说明" });
    await user.clear(input); await user.type(input, "未确认");
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    expect(save).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "取消业务编辑" }));
    await user.click(screen.getByRole("button", { name: "编辑任务" }));
    expect(screen.getByRole("textbox", { name: "业务说明" })).toHaveValue("原说明");
    await user.clear(screen.getByRole("textbox", { name: "业务说明" }));
    await user.type(screen.getByRole("textbox", { name: "业务说明" }), "已确认");
    await user.click(screen.getByRole("button", { name: "确认业务编辑" }));
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    await waitFor(() => expect(save).toHaveBeenCalledWith(expect.objectContaining({ changeset: [{ type: "update", key: "task" }] })));
    expect(save.mock.calls[0]![0].draft[0]?.children?.[0]?.source).toEqual({ note: "已确认" });
  });
  it("rejects structural mutations from a custom field editor", async () => {
    const user = userEvent.setup(), onFeedback = vi.fn();
    render(<ManageTree data={nodes} revision="1" defaultMode="edit" onFeedback={onFeedback} onSave={success}
      renderEditor={({ value, onChange, confirm }) => <button onClick={() => { onChange({ ...value, children: [] }); void confirm(); }}>错误字段更新</button>} />);
    await user.click(screen.getByRole("button", { name: "编辑章节" }));
    await user.click(screen.getByRole("button", { name: "错误字段更新" }));
    expect(onFeedback).toHaveBeenCalledWith(expect.objectContaining({ intent: "error" }));
  });
  it("migrates then deletes in one draft update, with no partial migration on a rejected move", async () => {
    const user = userEvent.setup(), save = vi.fn(success);
    const planDelete = () => [{ sourceKey: "task", targetKey: "other", placement: "inside" as const }, { sourceKey: "absent", targetKey: "other", placement: "inside" as const }];
    const view = render(<ManageTree data={nodes} revision="1" defaultMode="edit" defaultExpandedKeys={["chapter", "other"]} onFeedback={feedback} onSave={save} adapter={{ planDelete }} />);
    await user.click(screen.getByRole("button", { name: "删除章节" }));
    await user.click(screen.getByRole("button", { name: "确认删除" }));
    expect(screen.getByRole("treeitem", { name: "章节" })).toBeInTheDocument();
    expect(screen.getByRole("treeitem", { name: "任务" })).toHaveAttribute("aria-level", "2");
    view.rerender(<ManageTree data={nodes} revision="1" defaultMode="edit" defaultExpandedKeys={["chapter", "other"]} onFeedback={feedback} onSave={save} adapter={{ planDelete: () => planDelete().slice(0, 1) }} />);
    await user.click(screen.getByRole("button", { name: "确认删除" }));
    expect(screen.queryByRole("treeitem", { name: "章节" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    await waitFor(() => expect(save).toHaveBeenCalled());
    expect(save.mock.calls[0]![0].draft[0]?.children?.[0]?.key).toBe("task");
  });
  it("maps controlled checked keys and subtree intents in the same canonical view snapshot", async () => {
    const user = userEvent.setup(), snapshots: ManageTreeViewState[] = [];
    function Host() {
      const [view, setView] = useState<ManageTreeViewState>({ expandedKeys: [], selectedKeys: [], focusedKey: null });
      return <ManageTree data={[]} revision="1" defaultMode="edit" viewState={view} onViewStateChange={(next) => { snapshots.push(next); setView(next); }} treeOptions={{ checkable: true }} onFeedback={feedback}
        adapter={{ createNode: (key) => ({ key, title: "新章节", canHaveChildren: true }) }}
        onSave={async ({ draft }) => ({ status: "success", treeData: draft.map((node) => ({ ...node, key: "saved" })), revision: "2", keyMap: { "tmp-1": "saved" } })} />;
    }
    render(<Host />);
    await user.click(screen.getByRole("button", { name: "添加根节点" }));
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    await user.click(screen.getByRole("checkbox", { name: "勾选新章节" }));
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "进入编辑" })).toBeInTheDocument());
    expect(snapshots.at(-1)?.checkState).toMatchObject({ directCheckedKeys: ["saved"], intents: [{ key: "saved", action: "include", scope: "subtree" }] });
    expect(screen.getByRole("checkbox", { name: "勾选新章节" })).toBeChecked();
  });
});
