import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import { TablePage } from "./table-page";

it("keeps the materials table and supports cell editing from the existing Table entry", () => {
  render(<TablePage />);
  expect(screen.getByRole("heading", { name: "表格与数据管理" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "按资料名称排序" })).toBeInTheDocument();
  const tasks = within(screen.getByRole("table", { name: "学习任务交互评审" }));
  fireEvent.click(tasks.getByRole("button", { name: "编辑任务名称：课堂学习与实践" }));
  const input = tasks.getByRole("textbox", { name: "修改学习任务" });
  fireEvent.change(input, { target: { value: "课堂观察与实践" } });
  fireEvent.keyDown(input, { key: "Enter" });
  expect(tasks.getByRole("button", { name: "编辑任务名称：课堂观察与实践" })).toBeInTheDocument();
});
