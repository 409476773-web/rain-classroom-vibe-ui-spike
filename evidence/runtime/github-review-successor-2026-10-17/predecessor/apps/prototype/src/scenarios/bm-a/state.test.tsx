import "@testing-library/jest-dom/vitest";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { DataTableRecipe, type Material } from "../../data-table-recipe";

const record = (name: string): Material => ({ id: "remote-1", name, kind: "阅读材料", status: "draft", updated: "2026-09-15", locked: false });
function deferred() {
  let resolve!: (value: Material[]) => void, reject!: (reason: Error) => void;
  const promise = new Promise<Material[]>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

it("preserves failed refresh state, retries, and publishes only the selected record", async () => {
  const user = userEvent.setup(); let attempts = 0;
  render(<DataTableRecipe loadRecords={async current => { if (++attempts === 1) throw new Error("Offline"); return [...current]; }} />);
  await user.click(screen.getByRole("checkbox", { name: "选择 教学案例研读" }));
  await user.click(screen.getByRole("button", { name: "刷新资料" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("刷新失败");
  expect(screen.getByRole("checkbox", { name: "选择 教学案例研读" })).toBeChecked();
  await user.click(screen.getByRole("button", { name: "重试" }));
  await waitFor(() => expect(screen.queryByRole("alert")).not.toBeInTheDocument());
  await user.click(screen.getByRole("button", { name: "标为已发布" }));
  expect(within(screen.getByRole("cell", { name: "教学案例研读" }).closest("tr")!).getByText("已发布")).toBeInTheDocument();
  expect(within(screen.getByRole("cell", { name: "课程阅读清单" }).closest("tr")!).getByText("草稿")).toBeInTheDocument();
  expect(within(screen.getByRole("checkbox", { name: "选择 课堂观察记录" }).closest("tr")!).getByText("草稿")).toBeInTheDocument();
});

for (const outcome of ["success", "failure"]) it(`ignores an obsolete ${outcome} after the reader is replaced`, async () => {
  const user = userEvent.setup(), old = deferred(), latest = deferred(); let oldSignal!: AbortSignal;
  const first = (_: readonly Material[], signal: AbortSignal) => { oldSignal = signal; return old.promise; };
  const { rerender } = render(<DataTableRecipe loadRecords={first} />);
  await user.click(screen.getByRole("button", { name: "刷新资料" }));
  expect(screen.getByRole("button", { name: "标为已发布" })).toBeDisabled();
  rerender(<DataTableRecipe loadRecords={() => latest.promise} />);
  expect(oldSignal.aborted).toBe(true);
  await user.click(screen.getByRole("button", { name: "刷新资料" }));
  if (outcome === "failure") {
    await act(async () => old.reject(new Error("Obsolete failure")));
    expect(screen.getByRole("button", { name: "刷新资料" })).toHaveAttribute("aria-busy", "true");
  }
  await act(async () => latest.resolve([record("最新资料")]));
  expect(screen.getByRole("cell", { name: "最新资料" })).toBeInTheDocument();
  if (outcome === "success") await act(async () => old.resolve([record("过期资料")]));
  expect(screen.queryByText("过期资料")).not.toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(screen.getByRole("cell", { name: "最新资料" })).toBeInTheDocument();
});

it("removes invalid selections and clamps pages when a full refresh changes the dataset", async () => {
  const user = userEvent.setup(), pending = deferred();
  render(<DataTableRecipe loadRecords={() => pending.promise} />);
  await user.click(screen.getByRole("checkbox", { name: "选择 教学案例研读" }));
  await user.click(screen.getByRole("checkbox", { name: "选择 设计方法导论" }));
  await user.click(screen.getByRole("button", { name: "第 3 页" }));
  await user.click(screen.getByRole("button", { name: "刷新资料" }));
  await act(async () => pending.resolve([{ ...record("变为只读的资料"), id: "material-03", locked: true }, record("仅剩的一份资料")]));
  expect(screen.getByRole("cell", { name: "仅剩的一份资料" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "上一页" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "标为已发布" })).toBeDisabled();
  expect(screen.getByRole("status")).toHaveTextContent("2 份已选资料已不存在、不符合筛选或不可操作");
});

for (const changedField of ["name", "status"]) it(`drops selected records that leave the current query after a refreshed ${changedField} change`, async () => {
  const user = userEvent.setup();
  render(<DataTableRecipe loadRecords={async current => current.map(material => material.id !== "material-03" ? material : {
    ...material, ...(changedField === "name" ? { name: "更名后的资料" } : { status: "ready" as const }),
  })} />);
  await user.type(screen.getByRole("textbox", { name: "查找资料" }), "教学");
  await user.click(screen.getByRole("button", { name: "搜索" }));
  await user.click(screen.getByText("发布状态", { exact: true }));
  await user.click(await screen.findByRole("option", { name: "草稿" }));
  await user.click(screen.getByRole("checkbox", { name: "选择 教学案例研读" }));
  await user.click(screen.getByRole("button", { name: "刷新资料" }));
  expect(await screen.findByRole("heading", { name: "没有找到相关资料" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "标为已发布" })).toBeDisabled();
  expect(screen.queryByText("已选 1 份资料")).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("1 份已选资料");
  await user.click(screen.getByRole("button", { name: "清空筛选" }));
  expect(screen.getByRole("checkbox", { name: changedField === "name" ? "选择 更名后的资料" : "选择 教学案例研读" })).not.toBeChecked();
});

it("counts all invalid selections together while retaining matching selections across pages", async () => {
  const user = userEvent.setup(); let reads = 0;
  const seed = Array.from({ length: 8 }, (_, index) => ({ ...record(`资料${index}`), id: `item-${index}` }));
  render(<DataTableRecipe loadRecords={async current => ++reads === 1 ? seed : current.filter(material => material.id !== "item-0").map(material => ({
    ...material, locked: material.id === "item-1", name: material.id === "item-2" ? "已更名" : material.name,
  }))} />);
  await user.click(screen.getByRole("button", { name: "刷新资料" }));
  await screen.findByRole("checkbox", { name: "选择 资料0" });
  await user.type(screen.getByRole("textbox", { name: "查找资料" }), "资料");
  await user.click(screen.getByRole("button", { name: "搜索" }));
  for (const index of [0, 1, 2, 3]) await user.click(screen.getByRole("checkbox", { name: `选择 资料${index}` }));
  await user.click(screen.getByRole("button", { name: "下一页" }));
  await user.click(screen.getByRole("checkbox", { name: "选择 资料7" }));
  await user.click(screen.getByRole("button", { name: "刷新资料" }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("3 份已选资料"));
  expect(screen.getByText("已选 2 份资料")).toBeInTheDocument();
  expect(screen.getByText("含其他页 1 份")).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "选择 资料7" })).toBeChecked();
  await user.click(screen.getByRole("button", { name: "上一页" }));
  expect(screen.getByRole("checkbox", { name: "选择 资料3" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "选择 资料1" })).not.toBeChecked();
});

it("aborts on unmount and rejects duplicate IDs without losing current rows", async () => {
  const user = userEvent.setup(), pending = deferred(); let signal!: AbortSignal;
  const mounted = render(<DataTableRecipe loadRecords={(_, nextSignal) => { signal = nextSignal; return pending.promise; }} />);
  await user.click(screen.getByRole("button", { name: "刷新资料" }));
  mounted.unmount(); expect(signal.aborted).toBe(true);
  await act(async () => pending.resolve([record("离开后的资料")]));
  render(<DataTableRecipe loadRecords={async () => [record("重复一"), record("重复二")]} />);
  await user.click(screen.getByRole("button", { name: "刷新资料" }));
  expect(await screen.findByRole("alert")).toBeInTheDocument();
  expect(screen.getByRole("cell", { name: "设计方法导论" })).toBeInTheDocument();
  expect(screen.queryByText("重复一")).not.toBeInTheDocument();
});
