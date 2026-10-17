import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { ListComposition, type Material } from "./list";

const records: Material[] = [
  { id: "a", name: "课堂讨论案例", course: "教学设计", kind: "课堂实录", status: "draft", updated: "2026-09-15", locked: false },
  { id: "b", name: "课堂讨论量表", course: "教育评价", kind: "评价工具", status: "draft", updated: "2026-09-14", locked: false },
  { id: "c", name: "只读观察案例", course: "教学设计", kind: "课堂实录", status: "ready", updated: "2026-09-13", locked: true },
];

it("combines committed search and case type, clearing selection when the query changes", async () => {
  const user = userEvent.setup();
  render(<ListComposition initialRecords={records} transfer title="教学案例资料库" />);
  expect(screen.queryByRole("button", { name: "标为已发布" })).not.toBeInTheDocument();
  await user.click(screen.getByRole("checkbox", { name: "选择 课堂讨论量表" }));
  expect(screen.getByRole("button", { name: "标为已发布" })).toBeEnabled();
  await user.type(screen.getByRole("textbox", { name: "查找资料" }), "课堂讨论");
  expect(screen.getByText("只读观察案例")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "搜索" }));
  expect(screen.queryByText("只读观察案例")).not.toBeInTheDocument();
  await user.click(screen.getByRole("combobox", { name: "资料类型" }));
  await user.click(await screen.findByRole("option", { name: "课堂实录" }));
  expect(screen.queryByText("课堂讨论量表")).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "标为已发布" })).not.toBeInTheDocument();
  expect(within(screen.getByRole("row", { name: /课堂讨论案例/ })).getByText("教学设计")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "清空筛选" }));
  expect(screen.getByText("课堂讨论量表")).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "选择 只读观察案例" })).toBeDisabled();
});

it("publishes the selection and returns focus when contextual actions disappear", async () => {
  const user = userEvent.setup();
  render(<ListComposition initialRecords={records} transfer />);
  await user.click(screen.getByRole("checkbox", { name: "选择 课堂讨论案例" }));
  await user.click(screen.getByRole("button", { name: "标为已发布" }));
  expect(within(screen.getByRole("row", { name: /课堂讨论案例/ })).getByText("已发布")).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "标为已发布" })).not.toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "选择当前页可操作资料" })).toHaveFocus();
});

it("selects the whole card, preserves selection across views, and keeps information viewing independent", async () => {
  const user = userEvent.setup();
  render(<ListComposition initialRecords={records} transfer />);
  await user.click(screen.getByRole("button", { name: "卡片视图" }));
  const checkbox = screen.getByRole("checkbox", { name: "选择 课堂讨论案例" });
  const card = checkbox.closest('[data-rain-id="ui-card"]')!;
  expect(card).toHaveAttribute("data-selected", "false");
  await user.click(checkbox);
  expect(card).toHaveAttribute("data-selected", "true");
  expect(screen.getByRole("checkbox", { name: "选择 只读观察案例" })).toBeDisabled();
  expect(screen.queryByRole("button", { name: /更多操作/ })).not.toBeInTheDocument();
  const title = screen.getByRole("button", { name: "查看资料信息：课堂讨论案例" });
  await user.click(title);
  const dialog = await screen.findByRole("dialog", { name: "资料信息" });
  expect(within(dialog).getByText("课堂讨论案例")).toBeInTheDocument();
  expect(within(dialog).getByText("所属课程")).toBeInTheDocument();
  expect(within(dialog).getAllByRole("button")).toHaveLength(1);
  await user.click(within(dialog).getByRole("button", { name: "关闭资料信息" }));
  expect(title).toHaveFocus();
  expect(checkbox).toBeChecked();
  await user.click(screen.getByRole("button", { name: "表格视图" }));
  expect(screen.getByRole("checkbox", { name: "选择 课堂讨论案例" })).toBeChecked();
  await user.click(screen.getByRole("button", { name: "卡片视图" }));
  await user.click(screen.getByRole("checkbox", { name: "选择 课堂讨论案例" }));
  expect(screen.getByRole("checkbox", { name: "选择 课堂讨论案例" }).closest('[data-rain-id="ui-card"]')).toHaveAttribute("data-selected", "false");
  await user.click(screen.getByRole("button", { name: "查看资料信息：课堂讨论案例" }));
  await screen.findByRole("dialog", { name: "资料信息" });
  await user.keyboard("{Escape}");
  expect(screen.getByRole("checkbox", { name: "选择 课堂讨论案例" })).not.toBeChecked();
  expect(screen.queryByRole("button", { name: "标为已发布" })).not.toBeInTheDocument();
});
