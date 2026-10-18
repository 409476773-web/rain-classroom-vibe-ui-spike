import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { createRef, useState } from "react";
import { Tree, type TreeHandle } from "./tree";

const data = [{ key: "parent", title: "章节", children: [{ key: "leaf", title: "叶子" }] }];
describe("Tree", () => {
  it("ends each ancestor guide at its last visible descendant instead of the last sibling branch", () => {
    const nodes = [{ key: "root", title: "根", children: [{ key: "branch", title: "分支", children: [{ key: "leaf", title: "末叶" }] }] }, { key: "other", title: "其他根" }];
    const view = render(<Tree data={nodes} showLine defaultExpandedKeys={["root", "branch"]} />);
    const branch = screen.getByRole("treeitem", { name: "分支" });
    expect(branch.querySelector('[data-slot="connector"]')).not.toHaveClass("is-last");
    const leaf = screen.getByRole("treeitem", { name: "末叶" });
    expect(leaf.querySelector('[data-slot="ancestor-line"]')).toHaveClass("is-last");
    expect(leaf.querySelector('[data-slot="connector"]')).toHaveClass("is-last");
    expect(screen.getByRole("treeitem", { name: "其他根" }).querySelector('[data-slot="ancestor-line"]')).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "收起分支" }));
    expect(branch.querySelector('[data-slot="connector"]')).toHaveClass("is-last");
    view.rerender(<Tree data={nodes} showLine search={{ query: "末叶" }} />);
    expect(screen.getByRole("treeitem", { name: "末叶" }).querySelector('[data-slot="ancestor-line"]')).toHaveClass("is-last");
  });
  it("captures and restores scroll by stable key and relative offset", () => {
    const ref = createRef<TreeHandle>();
    render(<Tree ref={ref} data={[{ key: "a", title: "A" }, { key: "b", title: "B" }]} />);
    const root = screen.getByRole("tree"), first = screen.getByRole("treeitem", { name: "A" });
    vi.spyOn(root, "getBoundingClientRect").mockReturnValue({ top: 100, bottom: 200 } as DOMRect);
    const rect = vi.spyOn(first, "getBoundingClientRect").mockReturnValue({ top: 95, bottom: 131 } as DOMRect);
    const anchor = ref.current!.getScrollAnchor();
    expect(anchor).toEqual({ key: "a", offset: -5, scrollLeft: 0 });
    root.scrollTop = 10;
    rect.mockReturnValue({ top: 115, bottom: 151 } as DOMRect);
    expect(ref.current!.restoreScrollAnchor(anchor!)).toBe(true);
    expect(root.scrollTop).toBe(30);
  });
  it("keeps expand, row selection and checkbox selection independent", async () => {
    const user = userEvent.setup();
    render(<Tree data={data} checkable showLine />);
    const row = screen.getByRole("treeitem", { name: "章节" });
    await user.click(within(row).getByRole("button", { name: /展开/ }));
    expect(row).toHaveAttribute("aria-expanded", "true");
    expect(row).toHaveAttribute("aria-selected", "false");
    await user.click(within(row).getByRole("checkbox"));
    expect(row).toHaveAttribute("aria-selected", "false");
    expect(within(row).getByRole("checkbox")).toBeChecked();
    await user.click(within(row).getByText("章节"));
    expect(row).toHaveAttribute("aria-selected", "true");
  });

  it("filters with ancestors, retains the final expansion and does not leave duplicate IDs", async () => {
    const user = userEvent.setup();
    const view = render(<><Tree data={data} search={{ query: "叶子", mode: "filter" }} /><Tree data={data} /></>);
    expect(screen.getAllByRole("treeitem", { name: "叶子" })).toHaveLength(1);
    view.rerender(<><Tree data={data} search={{ query: "", mode: "filter" }} /><Tree data={data} /></>);
    expect(screen.getAllByRole("treeitem", { name: "叶子" })).toHaveLength(1);
    const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    await user.keyboard("{ArrowDown}");
  });

  it("only proposes a drag move and leaves source data unchanged", async () => {
    const onMove = vi.fn();
    render(<Tree data={[...data, { key: "other", title: "其他" }]} dragAndDrop={{ onMove }} />);
    expect(screen.getByRole("button", { name: /移动章节/ })).toBeInTheDocument();
    expect(onMove).not.toHaveBeenCalled();
  });

  it("moves one subtree through the keyboard proposal path", async () => {
    const user = userEvent.setup(), onMove = vi.fn();
    render(<Tree data={[...data, { key: "other", title: "其他" }]} defaultExpandedKeys={["parent"]} dragAndDrop={{ onMove }} />);
    screen.getByRole("button", { name: "移动章节" }).focus();
    await user.keyboard(" ");
    await act(async () => new Promise(requestAnimationFrame));
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onMove).toHaveBeenCalledWith(expect.objectContaining({ sourceKey: "parent", targetKey: "other", placement: "after", nextParentKey: null, nextIndex: 1 }));
    expect(screen.getByRole("treeitem", { name: "章节" })).toBeInTheDocument();
    expect(screen.getByRole("treeitem", { name: "叶子" })).toBeInTheDocument();
  });

  it("enters row controls with F6 and returns to the treeitem with Escape", async () => {
    const user = userEvent.setup();
    render(<Tree data={data} />);
    const row = screen.getByRole("treeitem", { name: "章节" });
    row.focus();
    await user.keyboard("{F6}");
    expect(within(row).getByRole("button", { name: "展开章节" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(row).toHaveFocus();
  });

  it("moves Right into the first visible child of an expanded branch", async () => {
    const user = userEvent.setup();
    render(<Tree data={data} defaultExpandedKeys={["parent"]} />);
    screen.getByRole("treeitem", { name: "章节" }).focus();
    await user.keyboard("{ArrowRight}");
    await act(async () => new Promise(requestAnimationFrame));
    expect(screen.getByRole("treeitem", { name: "叶子" })).toHaveFocus();
  });

  it("uses a selected row for initial Tab entry and mounts an offscreen focused virtual row", async () => {
    const view = render(<Tree data={[{ key: "first", title: "首项" }, { key: "chosen", title: "选中项" }]} defaultSelectedKeys={["chosen"]} />);
    expect(screen.getByRole("treeitem", { name: "选中项" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("treeitem", { name: "首项" })).toHaveAttribute("tabindex", "-1");
    const many = Array.from({ length: 200 }, (_, key) => ({ key, title: `节点 ${key}` }));
    view.unmount();
    render(<Tree data={many} virtual={{ height: 180 }} defaultFocusedKey={150} />);
    expect(await screen.findByRole("treeitem", { name: "节点 150" })).toHaveAttribute("tabindex", "0");
  });

  it("windows fixed Basic rows and refuses Rich virtualization", () => {
    const many = Array.from({ length: 10_000 }, (_, key) => ({ key, title: `节点 ${key}` }));
    const view = render(<Tree data={many} virtual={{ height: 360 }} />);
    expect(screen.getAllByRole("treeitem").length).toBeLessThan(40);
    expect(() => view.rerender(<Tree data={many} variant="rich" virtual={{ height: 360 }} />)).toThrow(/Basic/i);
  });

  it("deduplicates loading and ignores a result from an older data revision", async () => {
    const user = userEvent.setup();
    let resolve!: (value: { children: { key: string; title: string }[]; complete: true }) => void;
    const loadChildren = vi.fn(() => new Promise<{ children: { key: string; title: string }[]; complete: true }>((done) => { resolve = done; }));
    const onChildrenLoaded = vi.fn();
    const lazy = [{ key: "branch", title: "异步", canHaveChildren: true, childrenComplete: false }];
    const view = render(<Tree data={lazy} dataRevision="old" loadChildren={loadChildren} onChildrenLoaded={onChildrenLoaded} />);
    await user.click(screen.getByRole("button", { name: "展开异步" }));
    await user.click(screen.getByRole("button", { name: "收起异步" }));
    await user.click(screen.getByRole("button", { name: "展开异步" }));
    expect(loadChildren).toHaveBeenCalledTimes(1);
    const resolveOld = resolve;
    view.rerender(<Tree data={lazy} dataRevision="new" loadChildren={loadChildren} onChildrenLoaded={onChildrenLoaded} />);
    await act(async () => resolveOld({ children: [{ key: "late", title: "过期" }], complete: true }));
    expect(onChildrenLoaded).not.toHaveBeenCalled();
    expect(loadChildren).toHaveBeenCalledTimes(2);
    await act(async () => resolve({ children: [], complete: true }));
    expect(onChildrenLoaded).toHaveBeenCalledWith("branch", { children: [], complete: true }, expect.objectContaining({ dataRevision: "new" }));
  });

  it("retries a failed load and treats a completed empty branch as loaded", async () => {
    const user = userEvent.setup();
    const loadChildren = vi.fn().mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce({ children: [], complete: true });
    function Host() {
      const [nodes, setNodes] = useState([{ key: "branch", title: "空分支", canHaveChildren: true, childrenComplete: false }]);
      return <Tree data={nodes} loadChildren={loadChildren} onChildrenLoaded={() => setNodes([{ key: "branch", title: "空分支", canHaveChildren: true, childrenComplete: true }])} />;
    }
    render(<Host />);
    await user.click(screen.getByRole("button", { name: "展开空分支" }));
    await user.click(await screen.findByRole("button", { name: /加载失败，重试/ }));
    expect(await screen.findByRole("treeitem", { name: "空分支" })).not.toHaveAttribute("aria-expanded");
    expect(loadChildren).toHaveBeenCalledTimes(2);
  });
  it("renders adapted business records with their original source available to a renderer", () => {
    type Raw = { id: number; label: string; items?: Raw[]; note?: string };
    const raw: Raw[] = [{ id: 1, label: "章节", items: [{ id: 2, label: "任务", note: "原始说明" }] }];
    render(<Tree data={raw} accessors={{ getKey: (node) => node.id, getTitle: (node) => node.label, getChildren: (node) => node.items }}
      defaultExpandedKeys={[1]} renderDescription={(node) => (node.source as Raw).note} />);
    expect(screen.getByRole("treeitem", { name: "任务" })).toHaveTextContent("原始说明");
  });
  it("does not change row selection when Space reaches a disabled or hidden checkbox", async () => {
    const user = userEvent.setup(), onSelected = vi.fn();
    render(<Tree data={[{ key: "locked", title: "受限", checkDisabled: true }, { key: "hidden", title: "不参与", checkable: false }]} checkable onSelectedKeysChange={onSelected} />);
    for (const row of screen.getAllByRole("treeitem")) { row.focus(); await user.keyboard(" "); }
    expect(onSelected).not.toHaveBeenCalled();
  });
  it("loads initially expanded branches once and waits for the host to apply the response", async () => {
    const user = userEvent.setup();
    const loadChildren = vi.fn(async () => ({ children: [], complete: true as const }));
    render(<Tree data={[{ key: "lazy", title: "远程", canHaveChildren: true, childrenComplete: false }]} defaultExpandedKeys={["lazy"]}
      loadChildren={loadChildren} onChildrenLoaded={() => {}} />);
    await waitFor(() => expect(loadChildren).toHaveBeenCalledTimes(1));
    expect(await screen.findByText("等待数据更新…")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "收起远程" }));
    await user.click(screen.getByRole("button", { name: "展开远程" }));
    expect(loadChildren).toHaveBeenCalledTimes(1);
  });
  it("cancels keyboard movement when a filter becomes active", async () => {
    const user = userEvent.setup(), onMove = vi.fn();
    const nodes = [{ key: "a", title: "目录 A" }, { key: "b", title: "目录 B" }];
    const view = render(<Tree data={nodes} dragAndDrop={{ onMove }} />);
    screen.getByRole("button", { name: "移动目录 A" }).focus();
    await user.keyboard(" ");
    await waitFor(() => expect(screen.getByRole("treeitem", { name: "目录 A" })).toHaveFocus());
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(screen.getByRole("treeitem", { name: "目录 B" })).toHaveFocus());
    view.rerender(<Tree data={nodes} dragAndDrop={{ onMove }} search={{ query: "目录", mode: "filter" }} />);
    screen.getByRole("treeitem", { name: "目录 B" }).focus();
    await user.keyboard("{Enter}");
    expect(onMove).not.toHaveBeenCalled();
  });
  it("keeps virtual scroll and its focused node when the user scrolls the window", async () => {
    const many = Array.from({ length: 200 }, (_, key) => ({ key, title: `窗口 ${key}` }));
    render(<Tree data={many} virtual={{ height: 180 }} defaultFocusedKey={0} />);
    const row = screen.getByRole("treeitem", { name: "窗口 0" }), tree = screen.getByRole("tree");
    row.focus();
    fireEvent.scroll(tree, { target: { scrollTop: 3600 } });
    expect(tree.scrollTop).toBe(3600);
    expect(row).toHaveFocus();
    expect(screen.getByRole("treeitem", { name: "窗口 100" })).toBeInTheDocument();
    expect(screen.getAllByRole("treeitem").length).toBeLessThan(25);
  });
  it("uses one Tab entry until F6 opens only the current row controls", async () => {
    const user = userEvent.setup();
    render(<><Tree data={data} checkable defaultExpandedKeys={["parent"]} /><button>树外</button></>);
    const row = screen.getByRole("treeitem", { name: "章节" });
    row.focus();
    await user.tab();
    expect(screen.getByRole("button", { name: "树外" })).toHaveFocus();
    row.focus(); await user.keyboard("{F6}");
    expect(screen.getByRole("button", { name: "收起章节" })).toHaveFocus();
    await user.tab(); expect(within(row).getByRole("checkbox")).toHaveFocus();
    await user.tab(); expect(screen.getByRole("button", { name: "树外" })).toHaveFocus();
  });
  it("clamps a scrolled virtual window when filtering reduces its rows", () => {
    const many = Array.from({ length: 200 }, (_, key) => ({ key, title: `记录 ${key}` }));
    const view = render(<Tree data={many} virtual={{ height: 180 }} />);
    fireEvent.scroll(screen.getByRole("tree"), { target: { scrollTop: 3600 } });
    view.rerender(<Tree data={many} virtual={{ height: 180 }} search={{ query: "记录 1", matcher: (node, query) => node.title === query }} />);
    expect(screen.getByRole("treeitem", { name: "记录 1" })).toBeInTheDocument();
  });
  it("rejects dynamic content in fixed-height virtual rows", () => {
    expect(() => render(<Tree data={[{ key: "a", title: "A", description: "多行说明" }]} virtual={{ height: 180 }} />)).toThrow(/fixed|固定/i);
    expect(() => render(<Tree data={[{ key: "a", title: "A", leading: <div style={{ height: 80 }}>高图标</div> }]} virtual={{ height: 180 }} />)).toThrow(/fixed|固定/i);
    expect(() => render(<Tree data={data} renderActions={() => <button style={{ height: 80 }}>操作</button>} virtual={{ height: 180 }} />)).toThrow(/fixed|固定/i);
  });
  it("returns deleted focus to the next sibling without stealing a search input's focus", async () => {
    const nodes = [{ key: "root", title: "根", children: [{ key: "a", title: "A" }, { key: "b", title: "B" }, { key: "c", title: "C" }] }];
    const view = render(<><input aria-label="外部搜索" /><Tree data={nodes} defaultExpandedKeys={["root"]} /></>);
    screen.getByRole("treeitem", { name: "B" }).focus();
    const next = [{ ...nodes[0]!, children: nodes[0]!.children.filter((node) => node.key !== "b") }];
    view.rerender(<><input aria-label="外部搜索" /><Tree data={next} defaultExpandedKeys={["root"]} /></>);
    await waitFor(() => expect(screen.getByRole("treeitem", { name: "C" })).toHaveFocus());
    screen.getByRole("textbox", { name: "外部搜索" }).focus();
    view.rerender(<><input aria-label="外部搜索" /><Tree data={next} defaultExpandedKeys={["root"]} search={{ query: "A" }} /></>);
    await act(async () => new Promise(requestAnimationFrame));
    expect(screen.getByRole("textbox", { name: "外部搜索" })).toHaveFocus();
  });
});
