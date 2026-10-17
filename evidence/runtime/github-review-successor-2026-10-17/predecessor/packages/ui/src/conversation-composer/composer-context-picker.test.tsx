import { useRef, useState } from "react";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ComposerContextPicker } from "./composer-context-picker";
import type { ComposerReference, ComposerReferenceService } from "./types";

const first: ComposerReference = { id: "first", name: "课程介绍.pdf", availability: "available" };
const second: ComposerReference = { id: "second", name: "实验说明.docx", availability: "available" };
const third: ComposerReference = { id: "third", name: "课堂讲义.pptx", availability: "available" };

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function referenceService(overrides: Partial<ComposerReferenceService> = {}): ComposerReferenceService {
  return {
    query: vi.fn(async () => [first, second]),
    resolve: vi.fn(async (ids) => [first, second, third].filter(item => ids.includes(item.id))),
    ...overrides,
  };
}

function Harness({ service, selected = [first], onConfirm = vi.fn(), onApplied = vi.fn() }: {
  service: ComposerReferenceService;
  selected?: ComposerReference[];
  onConfirm?: (items: ComposerReference[]) => void;
  onApplied?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(selected);
  const trigger = useRef<HTMLButtonElement>(null);
  return <>
    <button ref={trigger} onClick={() => setOpen(true)}>添加内容</button>
    <button>外部操作</button>
    <output aria-label="草稿引用">{draft.map(item => item.name).join("、")}</output>
    <ComposerContextPicker open={open} onOpenChange={setOpen} selected={draft} service={service}
      onConfirm={items => { setDraft(items); onConfirm(items); }} returnFocus={trigger} onApplied={onApplied} />
  </>;
}

async function openPicker(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: "添加内容" }));
  return screen.findByRole("dialog", { name: "引用课程资料" });
}

describe("ComposerContextPicker", () => {
  it("prevents confirming an empty picker until a material is selected", async () => {
    const user = userEvent.setup();
    const service = referenceService();
    const onConfirm = vi.fn();
    render(<Harness service={service} selected={[]} onConfirm={onConfirm} />);
    await openPicker(user);
    const choice = await screen.findByRole("checkbox", { name: first.name });
    const confirm = screen.getByRole("button", { name: "添加引用" });

    expect(confirm).toBeDisabled();
    await user.click(confirm);
    expect(service.resolve).not.toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();

    await user.click(choice);
    expect(confirm).toBeEnabled();
    await user.click(choice);
    expect(confirm).toBeDisabled();
    await user.click(choice);
    await user.click(confirm);
    await waitFor(() => expect(onConfirm).toHaveBeenCalledWith([first]));
  });

  it("allows clearing all existing references without changing the draft before confirmation", async () => {
    const user = userEvent.setup();
    const unavailable = { ...first, availability: "unavailable" as const, unavailableReason: "资料已删除" };
    const service = referenceService({ query: vi.fn(async () => [unavailable]) });
    const onConfirm = vi.fn();
    const onApplied = vi.fn();
    render(<Harness service={service} onConfirm={onConfirm} onApplied={onApplied} />);
    await openPicker(user);
    await user.click(await screen.findByRole("checkbox", { name: first.name }));

    expect(screen.getByText("已选 0 项")).toBeInTheDocument();
    expect(screen.getByLabelText("草稿引用")).toHaveTextContent(first.name);
    const confirm = screen.getByRole("button", { name: "添加引用" });
    expect(confirm).toBeEnabled();
    await user.click(confirm);

    await waitFor(() => expect(onConfirm).toHaveBeenCalledWith([]));
    expect(service.resolve).toHaveBeenCalledWith([], { signal: expect.any(AbortSignal) });
    expect(screen.getByLabelText("草稿引用")).toBeEmptyDOMElement();
    expect(onApplied).toHaveBeenCalledOnce();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await openPicker(user);
    expect(screen.getByRole("button", { name: "添加引用" })).toBeDisabled();
  });

  it("copies a temporary selection and only applies it after resolving every selected ID", async () => {
    const user = userEvent.setup();
    const service = referenceService();
    const onConfirm = vi.fn();
    const onApplied = vi.fn();
    render(<Harness service={service} onConfirm={onConfirm} onApplied={onApplied} />);
    await openPicker(user);
    expect(await screen.findByRole("checkbox", { name: first.name })).toBeChecked();
    await user.click(screen.getByRole("checkbox", { name: second.name }));
    expect(screen.getByLabelText("草稿引用")).toHaveTextContent(first.name);
    expect(screen.getByLabelText("草稿引用")).not.toHaveTextContent(second.name);
    await user.click(screen.getByRole("button", { name: "添加引用" }));
    await waitFor(() => expect(onConfirm).toHaveBeenCalledWith([first, second]));
    expect(service.resolve).toHaveBeenCalledWith([first.id, second.id], { signal: expect.any(AbortSignal) });
    expect(onApplied).toHaveBeenCalledOnce();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByLabelText("草稿引用")).toHaveTextContent(second.name);
  });

  it("discards temporary changes on cancel, Escape and outside dismissal and returns focus", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<Harness service={referenceService()} onConfirm={onConfirm} />);
    for (const close of ["cancel", "escape", "outside"]) {
      await openPicker(user);
      await user.click(await screen.findByRole("checkbox", { name: second.name }));
      if (close === "cancel") await user.click(screen.getByRole("button", { name: "取消" }));
      if (close === "escape") await user.keyboard("{Escape}");
      if (close === "outside") await user.click(screen.getByRole("button", { name: "外部操作" }));
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
      await waitFor(() => expect(screen.getByRole("button", { name: close === "outside" ? "外部操作" : "添加内容" })).toHaveFocus());
    }
    expect(onConfirm).not.toHaveBeenCalled();
    await openPicker(user);
    expect(await screen.findByRole("checkbox", { name: second.name })).not.toBeChecked();
  });

  it("keeps selected resources across searches and resolves IDs absent from the visible results", async () => {
    const user = userEvent.setup();
    const service = referenceService({ query: vi.fn(async query => query ? [third] : [first, second]) });
    const onConfirm = vi.fn();
    render(<Harness service={service} onConfirm={onConfirm} />);
    await openPicker(user);
    await user.click(await screen.findByRole("checkbox", { name: second.name }));
    await user.type(screen.getByRole("textbox", { name: "搜索课程资料" }), "讲义");
    await user.click(await screen.findByRole("checkbox", { name: third.name }));
    expect(screen.getByText("已选 3 项")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "添加引用" }));
    await waitFor(() => expect(onConfirm).toHaveBeenCalledWith([first, second, third]));
    expect(service.resolve).toHaveBeenCalledWith([first.id, second.id, third.id], { signal: expect.any(AbortSignal) });
  });

  it("separates unmatched selected materials from empty search results without duplicating choices", async () => {
    const user = userEvent.setup();
    const service = referenceService({ query: vi.fn(async query => query ? [] : [first, second]) });
    render(<Harness service={service} />);
    await openPicker(user);
    await screen.findByRole("checkbox", { name: first.name });
    expect(screen.getAllByRole("checkbox", { name: first.name })).toHaveLength(1);
    await user.type(screen.getByRole("textbox", { name: "搜索课程资料" }), "无匹配");

    const results = await screen.findByRole("group", { name: "搜索结果" });
    expect(await within(results).findByText("未找到匹配的资料。")).toBeInTheDocument();
    expect(within(results).queryByRole("checkbox")).not.toBeInTheDocument();
    const selected = screen.getByRole("group", { name: "已选资料" });
    expect(within(selected).getByRole("checkbox", { name: first.name })).toBeChecked();
    expect(within(selected).queryByText("未找到匹配的资料。")).not.toBeInTheDocument();
    await user.click(within(selected).getByRole("checkbox", { name: first.name }));
    expect(screen.getByText("已选 0 项")).toBeInTheDocument();
    expect(screen.queryByRole("group", { name: "已选资料" })).not.toBeInTheDocument();
  });

  it("keeps freshly queried availability when a selected material moves outside the search results", async () => {
    const user = userEvent.setup();
    const unavailableFirst = { ...first, availability: "unavailable" as const, unavailableReason: "暂无查看权限" };
    const query = vi.fn<ComposerReferenceService["query"]>(async value => value ? [] : [unavailableFirst]);
    render(<Harness service={referenceService({ query })} />);
    await openPicker(user);
    await waitFor(() => expect(screen.getByRole("checkbox", { name: first.name })).toHaveAccessibleDescription("暂无查看权限"));
    await user.type(screen.getByRole("textbox", { name: "搜索课程资料" }), "其他");
    await screen.findByText("未找到匹配的资料。");
    const retained = screen.getByRole("checkbox", { name: first.name });
    expect(retained).toBeChecked();
    expect(retained).toHaveAccessibleDescription("暂无查看权限");
    expect(retained).toBeEnabled();
  });

  it("ignores out-of-order search results even when the service ignores cancellation", async () => {
    const user = userEvent.setup();
    const slow = deferred<ComposerReference[]>();
    const fast = deferred<ComposerReference[]>();
    const query = vi.fn<ComposerReferenceService["query"]>((value) => value === "a" ? slow.promise : value === "ab" ? fast.promise : Promise.resolve([first]));
    render(<Harness service={referenceService({ query })} selected={[]} />);
    await openPicker(user);
    await screen.findByRole("checkbox", { name: first.name });
    await user.type(screen.getByRole("textbox", { name: "搜索课程资料" }), "ab");
    await act(async () => { fast.resolve([third]); });
    expect(await screen.findByRole("checkbox", { name: third.name })).toBeInTheDocument();
    await act(async () => { slow.resolve([second]); });
    expect(screen.queryByRole("checkbox", { name: second.name })).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: third.name })).toBeInTheDocument();
    const options = query.mock.calls.find(([value]) => value === "a")?.[1] as { signal: AbortSignal } | undefined;
    expect(options?.signal.aborted).toBe(true);
  });

  it("retains names for missing or unavailable selected IDs and lets users uncheck them before applying", async () => {
    const user = userEvent.setup();
    const unavailable = { ...second, availability: "unavailable" as const, unavailableReason: "暂无查看权限" };
    const service = referenceService({
      query: vi.fn(async () => [third]),
      resolve: vi.fn(async ids => ids.includes(second.id) ? [unavailable] : [third]),
    });
    const onConfirm = vi.fn();
    render(<Harness service={service} selected={[first, second]} onConfirm={onConfirm} />);
    await openPicker(user);
    await user.click(await screen.findByRole("checkbox", { name: third.name }));
    await user.click(screen.getByRole("button", { name: "添加引用" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("部分资料已不可用，请取消勾选后重试。");
    expect(screen.getByRole("checkbox", { name: first.name })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: second.name })).toBeChecked();
    expect(screen.getByText("暂无查看权限")).toBeInTheDocument();
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByLabelText("草稿引用")).toHaveTextContent(first.name);
    await user.click(screen.getByRole("checkbox", { name: first.name }));
    await user.click(screen.getByRole("checkbox", { name: second.name }));
    await user.click(screen.getByRole("button", { name: "添加引用" }));
    await waitFor(() => expect(onConfirm).toHaveBeenCalledWith([third]));
  });

  it("freezes selection while checking but lets cancel invalidate a late resolve across reopening", async () => {
    const user = userEvent.setup();
    const pending = deferred<ComposerReference[]>();
    const resolve = vi.fn((_ids: string[], _context: { signal: AbortSignal }) => pending.promise);
    const onConfirm = vi.fn();
    render(<Harness service={referenceService({ resolve })} onConfirm={onConfirm} />);
    await openPicker(user);
    await screen.findByRole("checkbox", { name: second.name });
    await user.click(screen.getByRole("button", { name: "添加引用" }));
    expect(screen.getByRole("checkbox", { name: second.name })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "搜索课程资料" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "取消" }));
    expect(resolve.mock.calls.at(0)?.[1].signal.aborted).toBe(true);
    await openPicker(user);
    await act(async () => { pending.resolve([first]); });
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog", { name: "引用课程资料" })).toBeInTheDocument();
    expect(await screen.findByRole("checkbox", { name: first.name })).toBeChecked();
  });

  it("shows loading, separate empty states and a retry for failed searches", async () => {
    const user = userEvent.setup();
    const initial = deferred<ComposerReference[]>();
    const query = vi.fn<ComposerReferenceService["query"]>()
      .mockImplementationOnce(() => initial.promise)
      .mockResolvedValueOnce([])
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce([]);
    render(<Harness service={referenceService({ query })} selected={[]} />);
    const panel = await openPicker(user);
    expect(within(panel).getByRole("status")).toHaveTextContent("正在加载资料…");
    await act(async () => { initial.resolve([]); });
    expect(await screen.findByText("暂无可引用的课程资料。")).toBeInTheDocument();
    await user.type(screen.getByRole("textbox", { name: "搜索课程资料" }), "a");
    expect(await screen.findByText("未找到匹配的资料。")).toBeInTheDocument();
    await user.type(screen.getByRole("textbox", { name: "搜索课程资料" }), "b");
    expect(await screen.findByRole("alert")).toHaveTextContent("资料加载失败，请重试。");
    await user.click(screen.getByRole("button", { name: "重试" }));
    expect(await screen.findByText("未找到匹配的资料。")).toBeInTheDocument();
  });

  it("retains temporary choices when resolve fails and retries without altering the draft", async () => {
    const user = userEvent.setup();
    const resolve = vi.fn<ComposerReferenceService["resolve"]>()
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce([first, second]);
    const onConfirm = vi.fn();
    render(<Harness service={referenceService({ resolve })} onConfirm={onConfirm} />);
    await openPicker(user);
    await user.click(await screen.findByRole("checkbox", { name: second.name }));
    await user.click(screen.getByRole("button", { name: "添加引用" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("资料校验失败，请重试。");
    expect(screen.getByRole("checkbox", { name: second.name })).toBeChecked();
    expect(onConfirm).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "添加引用" }));
    await waitFor(() => expect(onConfirm).toHaveBeenCalledWith([first, second]));
  });

  it("shows queried unavailability for existing choices and allows removing an unavailable selection", async () => {
    const user = userEvent.setup();
    const unavailableFirst = { ...first, availability: "unavailable" as const, unavailableReason: "资料已删除" };
    const unavailableSecond = { ...second, availability: "unavailable" as const, unavailableReason: "暂无权限" };
    render(<Harness service={referenceService({ query: vi.fn(async () => [unavailableFirst, unavailableSecond]) })} />);
    await openPicker(user);
    const selected = await screen.findByRole("checkbox", { name: first.name });
    expect(selected).toHaveAccessibleDescription("资料已删除");
    expect(selected).toBeEnabled();
    expect(screen.getByRole("checkbox", { name: second.name })).toBeDisabled();
    await user.click(selected);
    expect(screen.getByText("已选 0 项")).toBeInTheDocument();
    expect(selected).toBeDisabled();
  });

  it("allows reselecting a previously unavailable resource after a fresh search reports it available", async () => {
    const user = userEvent.setup();
    const unavailable = { ...first, availability: "unavailable" as const, unavailableReason: "暂无查看权限" };
    const resolve = vi.fn<ComposerReferenceService["resolve"]>()
      .mockResolvedValueOnce([unavailable])
      .mockResolvedValueOnce([first]);
    const query = vi.fn<ComposerReferenceService["query"]>(async () => [first]);
    const onConfirm = vi.fn();
    render(<Harness service={referenceService({ query, resolve })} onConfirm={onConfirm} />);
    await openPicker(user);
    await screen.findByRole("checkbox", { name: first.name });
    await user.click(screen.getByRole("button", { name: "添加引用" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("部分资料已不可用");
    await user.click(screen.getByRole("checkbox", { name: first.name }));
    expect(screen.getByRole("checkbox", { name: first.name })).toBeDisabled();

    await user.type(screen.getByRole("textbox", { name: "搜索课程资料" }), "课程");
    await waitFor(() => expect(query).toHaveBeenLastCalledWith("课程", { signal: expect.any(AbortSignal) }));
    await waitFor(() => expect(screen.getByRole("checkbox", { name: first.name })).toBeEnabled());
    expect(screen.queryByText("暂无查看权限")).not.toBeInTheDocument();
    await user.click(screen.getByRole("checkbox", { name: first.name }));
    await user.click(screen.getByRole("button", { name: "添加引用" }));
    await waitFor(() => expect(onConfirm).toHaveBeenCalledWith([first]));
  });

  it("preserves the selected name snapshot when unavailable resolution returns a placeholder name", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const service = referenceService({
      query: async () => [],
      resolve: async () => [{ id: first.id, name: "不可用的课程资料", availability: "unavailable", unavailableReason: "资料已移除" }],
    });
    render(<Harness service={service} onConfirm={onConfirm} />);
    await openPicker(user);
    await user.click(screen.getByRole("button", { name: "添加引用" }));
    await screen.findByRole("alert");
    const unavailable = screen.getByRole("checkbox", { name: first.name });
    expect(unavailable).toHaveAccessibleDescription("资料已移除");
    expect(unavailable).toBeChecked();
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByLabelText("草稿引用")).toHaveTextContent(first.name);
  });
});
