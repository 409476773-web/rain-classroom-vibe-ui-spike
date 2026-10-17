import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tree } from "./tree";
import type { TreeNodeRecord, TreeRenderContext, TreeEmptyContext } from "./tree.types";

const data: TreeNodeRecord[] = [{ key: "parent", title: "章节", children: [
  { key: "a", title: "任务甲" }, { key: "b", title: "任务乙" },
] }];

describe("Tree rendering contracts", () => {
  it("shares live state with all renderers and keeps custom actions independent", async () => {
    const user = userEvent.setup(), contexts = new Map<string, TreeRenderContext>();
    const capture = (slot: string) => (node: TreeNodeRecord, context: TreeRenderContext) => { contexts.set(`${node.key}:${slot}`, context); return undefined; };
    render(<Tree data={data} checkable defaultExpandedKeys={["parent"]}
      renderTitle={(node, context) => { contexts.set(`${node.key}:title`, context); return node.title; }}
      renderDescription={capture("description")} renderLeading={capture("leading")} renderMeta={capture("meta")}
      renderActions={(node, context) => { contexts.set(`${node.key}:actions`, context); return <button onClick={() => context.actions.toggleChecked()}>切换{node.title}勾选</button>; }} />);
    const parent = screen.getByRole("treeitem", { name: "章节" });
    expect(contexts.get("parent:title")).toMatchObject({ node: data[0], depth: 0, expanded: true, checked: false, indeterminate: false, selected: false });
    for (const slot of ["description", "leading", "meta", "actions"]) expect(contexts.get(`parent:${slot}`)).toBe(contexts.get("parent:title"));
    await user.click(within(screen.getByRole("treeitem", { name: "任务甲" })).getByRole("button", { name: "切换任务甲勾选" }));
    expect(contexts.get("parent:title")).toMatchObject({ indeterminate: true, selected: false });
    expect(contexts.get("a:title")).toMatchObject({ depth: 1, checked: true, selected: false, disabledReasons: { expand: "not-expandable" } });
    act(() => contexts.get("a:title")!.actions.select());
    expect(screen.getByRole("treeitem", { name: "任务甲" })).toHaveAttribute("aria-selected", "true");
    act(() => contexts.get("parent:title")!.actions.focus());
    expect(parent).toHaveFocus();
    act(() => contexts.get("parent:title")!.actions.toggleExpanded());
    expect(screen.queryByRole("treeitem", { name: "任务甲" })).not.toBeInTheDocument();
  });

  it("keeps controlled ownership and rechecks permissions for previously captured actions", () => {
    const onChecks = vi.fn(), onSelected = vi.fn(), onExpanded = vi.fn();
    let context: TreeRenderContext;
    const capture = (node: TreeNodeRecord, state: TreeRenderContext) => { context = state; return node.title; };
    const common = { checkable: true, checkState: { directCheckedKeys: [], intents: [] }, onCheckStateChange: onChecks,
      selectedKeys: [], onSelectedKeysChange: onSelected, expandedKeys: [], onExpandedKeysChange: onExpanded, renderTitle: capture };
    const { rerender } = render(<Tree {...common} data={data} />);
    act(() => { context.actions.toggleChecked(); context.actions.select(); context.actions.toggleExpanded(); });
    expect(onChecks).toHaveBeenCalledTimes(1); expect(onSelected).toHaveBeenCalledTimes(1); expect(onExpanded).toHaveBeenCalledTimes(1);
    expect(context!).toMatchObject({ checked: false, selected: false, expanded: false });
    const old = context!;
    rerender(<Tree {...common} data={[{ key: "parent", title: "章节", checkDisabled: true, selectable: false }]} />);
    expect(context!).toMatchObject({ disabledReasons: { expand: "not-expandable", check: "check-disabled", select: "not-selectable", drag: "dragging-disabled" } });
    onChecks.mockClear(); onSelected.mockClear(); onExpanded.mockClear();
    act(() => { old.actions.toggleChecked(); old.actions.select(); old.actions.toggleExpanded(); });
    expect(onChecks).not.toHaveBeenCalled(); expect(onSelected).not.toHaveBeenCalled(); expect(onExpanded).not.toHaveBeenCalled();
    rerender(<Tree {...common} data={[]} />);
    onChecks.mockClear(); onSelected.mockClear();
    act(() => { old.actions.toggleChecked(); old.actions.select(); old.actions.focus(); });
    expect(onChecks).not.toHaveBeenCalled(); expect(onSelected).not.toHaveBeenCalled();
  });

  it("distinguishes data-empty and search-empty content without replacing defaults", async () => {
    const user = userEvent.setup(), retry = vi.fn();
    const empty = vi.fn(({ reason, query }: TreeEmptyContext) => <button onClick={retry}>{reason === "empty" ? "创建目录" : `清除搜索：${query}`}</button>);
    const { rerender } = render(<Tree data={[]} renderEmpty={empty} search={{ query: "测试" }} />);
    expect(empty).toHaveBeenLastCalledWith({ reason: "empty", query: "测试" });
    await user.tab(); await user.tab(); await user.keyboard("{Enter}");
    expect(retry).toHaveBeenCalledTimes(1);
    rerender(<Tree data={data} renderEmpty={empty} search={{ query: "不存在" }} />);
    expect(screen.getByRole("button", { name: "清除搜索：不存在" })).toBeInTheDocument();
    expect(empty).toHaveBeenLastCalledWith({ reason: "no-results", query: "不存在" });
    rerender(<Tree data={data} renderEmpty={empty} />);
    expect(screen.queryByRole("button", { name: /清除搜索/ })).not.toBeInTheDocument();
    rerender(<Tree data={[]} />);
    expect(screen.getByText("暂无内容")).toBeInTheDocument();
    rerender(<Tree data={data} search={{ query: "不存在" }} />);
    expect(screen.getByText("没有搜索结果")).toBeInTheDocument();
  });
});
