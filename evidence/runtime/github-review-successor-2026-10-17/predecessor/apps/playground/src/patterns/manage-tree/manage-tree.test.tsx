import { act, render, screen, waitFor, within } from "@testing-library/react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import type { TreeNodeRecord } from "@rain-next/ui";
import { describe, expect, it, vi } from "vitest";
import { ManageTree, type ManageTreeViewState, type SaveResponse } from "./manage-tree";

const data = [{ key: "chapter", title: "第一章", children: [{ key: "lesson", title: "课前学习" }] }];
const base = { data, revision: "1", onFeedback: vi.fn(), onSave: vi.fn(async () => ({ status: "success" as const, treeData: data, revision: "2" })) };
describe("ManageTree", () => {
  it("only writes a title after Enter, keeps the buffer on blur, and cancels it with Escape", async () => {
    const user = userEvent.setup();
    render(<ManageTree {...base} />);
    await user.click(screen.getByRole("button", { name: "进入编辑" }));
    const row = screen.getByRole("treeitem", { name: "第一章" });
    await user.click(within(row).getByRole("button", { name: "编辑第一章" }));
    const input = screen.getByRole("textbox", { name: "标题" });
    await user.clear(input); await user.type(input, "修改中");
    await user.tab();
    expect(screen.getByRole("textbox", { name: "标题" })).toHaveValue("修改中");
    expect(screen.getByTestId("draft-title-chapter")).toHaveTextContent("第一章");
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    expect(base.onSave).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    expect(screen.getByTestId("draft-title-chapter")).toHaveTextContent("修改中");
  });

  it("opens the focused title editor with F2", async () => {
    const user = userEvent.setup();
    render(<ManageTree {...base} defaultMode="edit" />);
    screen.getByRole("treeitem", { name: "第一章" }).focus();
    await user.keyboard("{F2}");
    expect(screen.getByRole("textbox", { name: "标题" })).toHaveValue("第一章");
  });

  it("ignores a late title validation after the editor changes or closes", async () => {
    const user = userEvent.setup();
    const pending: Array<(value?: string) => void> = [];
    render(<ManageTree {...base} defaultMode="edit" adapter={{ validateTitle: () => new Promise((resolve) => pending.push(resolve)) }} />);
    await user.click(within(screen.getByRole("treeitem", { name: "第一章" })).getByRole("button", { name: "编辑第一章" }));
    const input = screen.getByRole("textbox", { name: "标题" });
    await user.clear(input); await user.type(input, "旧值");
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    await user.clear(input); await user.type(input, "新值");
    await act(async () => pending[0]?.());
    expect(screen.getByRole("textbox", { name: "标题" })).toHaveValue("新值");
    expect(screen.getByTestId("draft-title-chapter")).toHaveTextContent("第一章");
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    await user.click(screen.getByRole("button", { name: "取消标题" }));
    await act(async () => pending[1]?.());
    expect(screen.queryByRole("textbox", { name: "标题" })).not.toBeInTheDocument();
    expect(screen.getByTestId("draft-title-chapter")).toHaveTextContent("第一章");
  });

  it("rejects a duplicate sibling title without changing the draft", async () => {
    const user = userEvent.setup();
    const feedback = vi.fn();
    render(<ManageTree {...base} defaultMode="edit" onFeedback={feedback} />);
    await user.click(screen.getByRole("button", { name: "添加根节点" }));
    const input = screen.getByRole("textbox", { name: "标题" });
    await user.clear(input); await user.type(input, "第一章");
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    expect(screen.getByRole("textbox", { name: "标题" })).toHaveValue("第一章");
    expect(feedback).toHaveBeenCalledWith(expect.objectContaining({ intent: "error" }));
  });

  it("passes the real parent to sibling creation and its permission check", async () => {
    const user = userEvent.setup(), createNode = vi.fn((key: string | number, parentKey: string | number | null) => ({ key, title: "新节点", parentKey }));
    const canAdd = vi.fn(() => true);
    render(<ManageTree {...base} defaultMode="edit" defaultExpandedKeys={["chapter"]} adapter={{ createNode, canAdd }} />);
    await user.click(within(screen.getByRole("treeitem", { name: "课前学习" })).getByRole("button", { name: "在课前学习之后添加同级" }));
    expect(canAdd).toHaveBeenCalledWith(expect.objectContaining({ key: "chapter" }));
    expect(createNode).toHaveBeenCalledWith("tmp-1", "chapter");
  });

  it("keeps draft after a save failure and requires confirmation to discard", async () => {
    const user = userEvent.setup(), save = vi.fn(async () => { throw new Error("网络失败"); });
    render(<ManageTree {...base} onSave={save} />);
    await user.click(screen.getByRole("button", { name: "进入编辑" }));
    await user.click(screen.getByRole("button", { name: "添加根节点" }));
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    expect(await screen.findByRole("button", { name: "保存草稿" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "退出编辑" }));
    expect(screen.getByText("放弃未保存的修改？")).toBeInTheDocument();
    await waitFor(() => expect(within(screen.getByRole("alertdialog")).getByRole("button", { name: "继续编辑" })).toHaveFocus());
  });

  it("retries the same draft with the same idempotency key", async () => {
    const user = userEvent.setup(), keys: string[] = [];
    const save = vi.fn(async ({ idempotencyKey }: { idempotencyKey: string }) => { keys.push(idempotencyKey); throw new Error("网络失败"); });
    render(<ManageTree {...base} onSave={save} defaultMode="edit" />);
    await user.click(screen.getByRole("button", { name: "添加根节点" }));
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    await screen.findByRole("button", { name: "保存草稿" });
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    expect(keys).toHaveLength(2);
    expect(keys[0]).toBe(keys[1]);
  });

  it("remaps a controlled view snapshot after saving a new node", async () => {
    const user = userEvent.setup(), snapshots: ManageTreeViewState[] = [];
    function Host() {
      const [viewState, setViewState] = useState<ManageTreeViewState>({ expandedKeys: ["chapter"], selectedKeys: [], focusedKey: null });
      return <ManageTree {...base} defaultMode="edit" viewState={viewState} onViewStateChange={(next) => { snapshots.push(next); setViewState(next); }}
        onSave={async ({ draft }) => ({ status: "success", treeData: draft.map((node) => node.key === "tmp-1" ? { ...node, key: "real" } : node), revision: "2", keyMap: { "tmp-1": "real" } })} />;
    }
    render(<Host />);
    await user.click(screen.getByRole("button", { name: "添加根节点" }));
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    expect(await screen.findByRole("treeitem", { name: "新节点" })).toHaveAttribute("data-selected", "true");
    expect(snapshots.at(-1)).toEqual({ expandedKeys: ["chapter"], selectedKeys: ["real"], focusedKey: "real", checkState: { directCheckedKeys: [], intents: [] }, scrollAnchor: null });
  });

  it("keeps a conflicting draft until the user confirms loading the latest version", async () => {
    const user = userEvent.setup(), loadLatest = vi.fn(async () => ({ treeData: [{ key: "latest", title: "最新版" }], revision: "3" }));
    render(<ManageTree {...base} onSave={async () => ({ status: "conflict" })} loadLatest={loadLatest} />);
    await user.click(screen.getByRole("button", { name: "进入编辑" }));
    await user.click(screen.getByRole("button", { name: "添加根节点" }));
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    expect(await screen.findByText(/本地草稿已保留/)).toBeInTheDocument();
    expect(screen.getByTestId("draft-title-tmp-1")).toHaveTextContent("新节点");
    await user.click(screen.getByRole("button", { name: "加载最新版" }));
    expect(loadLatest).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "放弃并加载" }));
    expect(await screen.findByRole("treeitem", { name: "最新版" })).toBeInTheDocument();
    expect(screen.queryByRole("treeitem", { name: "新节点" })).not.toBeInTheDocument();
  });

  it("keeps the draft if the latest conflict response has invalid data", async () => {
    const user = userEvent.setup(), feedback = vi.fn();
    render(<ManageTree {...base} defaultMode="edit" onFeedback={feedback} onSave={async () => ({ status: "conflict" })}
      loadLatest={async () => ({ treeData: [{ key: "bad", title: "A" }, { key: "bad", title: "B" }], revision: "3" })} />);
    await user.click(screen.getByRole("button", { name: "添加根节点" }));
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    await user.click(await screen.findByRole("button", { name: "加载最新版" }));
    await user.click(screen.getByRole("button", { name: "放弃并加载" }));
    await waitFor(() => expect(feedback).toHaveBeenCalledWith(expect.objectContaining({ intent: "error", message: expect.stringContaining("本地草稿已保留") })));
    expect(screen.getByTestId("draft-title-tmp-1")).toHaveTextContent("新节点");
  });

  it("requires an explicit domain deletion plan for an incomplete subtree", async () => {
    const user = userEvent.setup(), feedback = vi.fn(), onSave = vi.fn(async () => ({ status: "success" as const, treeData: [], revision: "2" }));
    const incomplete = [{ key: "remote", title: "远程分支", canHaveChildren: true, childrenComplete: false }];
    const view = render(<ManageTree data={incomplete} revision="1" defaultMode="edit" onFeedback={feedback} onSave={onSave} />);
    await user.click(within(screen.getByRole("treeitem", { name: "远程分支" })).getByRole("button", { name: "删除远程分支" }));
    expect(feedback).toHaveBeenCalledWith(expect.objectContaining({ intent: "error" }));
    expect(screen.getByRole("treeitem", { name: "远程分支" })).toBeInTheDocument();
    const planDelete = vi.fn(() => true);
    view.rerender(<ManageTree data={incomplete} revision="1" defaultMode="edit" onFeedback={feedback} onSave={onSave} adapter={{ planDelete }} />);
    await user.click(within(screen.getByRole("treeitem", { name: "远程分支" })).getByRole("button", { name: "删除远程分支" }));
    expect(planDelete).toHaveBeenCalledWith(expect.objectContaining({ key: "remote" }), incomplete);
    await user.click(screen.getByRole("button", { name: "确认删除" }));
    expect(screen.queryByRole("treeitem", { name: "远程分支" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ changeset: [{ type: "delete", key: "remote" }] }));
  });

  it("validates the locked draft before saving and rejects an external revision change", async () => {
    const user = userEvent.setup(), onSave = vi.fn(async () => ({ status: "success" as const, treeData: data, revision: "2" }));
    let release!: (message?: string) => void;
    const validateTree = vi.fn(() => new Promise<string | void>((resolve) => { release = resolve; }));
    const view = render(<ManageTree {...base} defaultMode="edit" onSave={onSave} adapter={{ validateTree }} />);
    await user.click(screen.getByRole("button", { name: "添加根节点" }));
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    expect(validateTree).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "添加根节点" })).toBeDisabled();
    view.rerender(<ManageTree {...base} data={[...data, { key: "external", title: "外部变化" }]} revision="2" defaultMode="edit" onSave={onSave} adapter={{ validateTree }} />);
    await act(async () => release());
    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByTestId("draft-title-tmp-1")).toHaveTextContent("新节点");
  });

  it("keeps the latest row selection made while save is pending", async () => {
    const user = userEvent.setup();
    let finish!: (response: SaveResponse) => void;
    let submitted!: readonly TreeNodeRecord[];
    const onSave = vi.fn(({ draft }: { draft: readonly TreeNodeRecord[] }) => { submitted = draft; return new Promise<SaveResponse>((resolve) => { finish = resolve; }); });
    render(<ManageTree {...base} defaultMode="edit" onSave={onSave} />);
    await user.click(screen.getByRole("button", { name: "添加根节点" }));
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    await user.click(screen.getByRole("treeitem", { name: "第一章" }));
    await act(async () => finish({ status: "success", treeData: submitted.map((node) => node.key === "tmp-1" ? { ...node, key: "real" } : node), revision: "2", keyMap: { "tmp-1": "real" } }));
    expect(screen.getByRole("treeitem", { name: "第一章" })).toHaveAttribute("data-selected", "true");
    expect(screen.getByRole("treeitem", { name: "新节点" })).toHaveAttribute("data-selected", "false");
  });
  it("cancels a fresh node, clears its view keys and returns focus to the add action", async () => {
    const user = userEvent.setup(), snapshots: ManageTreeViewState[] = [];
    render(<ManageTree {...base} defaultMode="edit" onViewStateChange={(next) => snapshots.push(next)} />);
    const add = screen.getByRole("button", { name: "添加根节点" });
    await user.click(add);
    await user.click(screen.getByRole("button", { name: "取消标题" }));
    expect(screen.queryByRole("treeitem", { name: "新节点" })).not.toBeInTheDocument();
    expect(snapshots.at(-1)?.selectedKeys).toEqual([]);
    await waitFor(() => expect(add).toHaveFocus());
    await user.click(screen.getByRole("button", { name: "退出编辑" }));
    expect(screen.getByRole("button", { name: "进入编辑" })).toBeInTheDocument();
  });
  it("requires a deletion plan when an incomplete branch is nested under the deleted parent", async () => {
    const user = userEvent.setup(), feedback = vi.fn();
    render(<ManageTree {...base} data={[{ key: "root", title: "父章节", children: [{ key: "lazy", title: "远程", canHaveChildren: true, childrenComplete: false }] }]}
      defaultMode="edit" onFeedback={feedback} />);
    await user.click(screen.getByRole("button", { name: "删除父章节" }));
    expect(screen.queryByRole("button", { name: "确认删除" })).not.toBeInTheDocument();
    expect(feedback).toHaveBeenCalledWith(expect.objectContaining({ intent: "error" }));
  });
  it("uses the accepted revision for the next save before the host echoes it", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn(async ({ draft, baseRevision }: { draft: readonly TreeNodeRecord[]; baseRevision: string }) => ({ status: "success" as const, treeData: draft, revision: String(Number(baseRevision) + 1) }));
    render(<ManageTree {...base} onSave={onSave} defaultMode="edit" />);
    for (const title of ["更新一", "更新二"]) {
      await user.click(screen.getByRole("button", { name: /^编辑/ }));
      const input = screen.getByRole("textbox", { name: "标题" });
      await user.clear(input); await user.type(input, title); await user.keyboard("{Enter}");
      await user.click(screen.getByRole("button", { name: "保存草稿" }));
      await user.click(await screen.findByRole("button", { name: "进入编辑" }));
    }
    expect(onSave.mock.calls.map(([request]) => request.baseRevision)).toEqual(["1", "2"]);
  });
  it("keeps the draft locked while a confirmed latest-version request is pending", async () => {
    const user = userEvent.setup();
    let finish!: (latest: { treeData: readonly TreeNodeRecord[]; revision: string }) => void;
    const loadLatest = vi.fn(() => new Promise<{ treeData: readonly TreeNodeRecord[]; revision: string }>((resolve) => { finish = resolve; }));
    render(<ManageTree {...base} defaultMode="edit" onSave={async () => ({ status: "conflict" })} loadLatest={loadLatest} />);
    await user.click(screen.getByRole("button", { name: "添加根节点" }));
    await user.click(screen.getByRole("button", { name: "确认标题" }));
    await user.click(screen.getByRole("button", { name: "保存草稿" }));
    await user.click(await screen.findByRole("button", { name: "加载最新版" }));
    await user.click(screen.getByRole("button", { name: "放弃并加载" }));
    expect(screen.getByRole("button", { name: "放弃并加载" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "继续编辑" })).toBeDisabled();
    await act(async () => finish({ treeData: data, revision: "3" }));
    expect(await screen.findByRole("button", { name: "进入编辑" })).toBeInTheDocument();
  });
  it("shows the received authoritative revision after leaving an unchanged conflicted draft", async () => {
    const user = userEvent.setup();
    const view = render(<ManageTree {...base} defaultMode="edit" />);
    view.rerender(<ManageTree {...base} defaultMode="edit" data={[{ key: "chapter", title: "新版章节" }]} revision="2" />);
    await user.click(screen.getByRole("button", { name: "退出编辑" }));
    expect(screen.getByRole("treeitem", { name: "新版章节" })).toBeInTheDocument();
    expect(screen.queryByRole("treeitem", { name: "第一章" })).not.toBeInTheDocument();
  });
});
