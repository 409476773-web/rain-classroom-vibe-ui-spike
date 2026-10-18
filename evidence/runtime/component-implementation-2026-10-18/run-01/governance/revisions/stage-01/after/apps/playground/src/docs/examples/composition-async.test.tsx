import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { FilterToolbarExample } from "./filter-toolbar";
import { GradingActionsExample } from "./grading-actions";

function pending() { let resolve!: () => void, reject!: (error: Error) => void; const promise = new Promise<void>((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }
it("keeps applied query and draft on failure, blocks duplicate requests, and retries the same input", async () => {
  const first = pending(); const search = vi.fn().mockReturnValueOnce(first.promise).mockResolvedValue(undefined);
  render(<FilterToolbarExample onSearch={search} />);
  const form = screen.getByRole("form", { name: "资源筛选" });
  const input = within(form).getByRole("textbox", { name: "资源名称" });
  fireEvent.change(input, { target: { value: "案例" } }); fireEvent.submit(form); fireEvent.submit(form);
  expect(search).toHaveBeenCalledTimes(1); expect(input).toBeDisabled();
  expect(screen.getByRole("status", { name: "资源筛选结果" })).toHaveTextContent("3 项");
  await act(async () => first.reject(new Error("offline")));
  expect(screen.getByRole("alert")).toHaveTextContent("查询失败"); expect(input).toHaveValue("案例");
  fireEvent.submit(form);
  await screen.findByText("找到 2 项资源"); expect(search).toHaveBeenLastCalledWith({ keyword: "案例", kind: "all" });
});
it("saves zero only after completion, keeps failed ID draft, and blocks navigation during save", async () => {
  const first = pending(); const save = vi.fn().mockReturnValueOnce(first.promise).mockResolvedValue(undefined);
  render(<GradingActionsExample onSave={save} />);
  const form = screen.getByRole("form", { name: "学生甲评分" });
  fireEvent.change(within(form).getByRole("spinbutton"), { target: { value: "0" } });
  fireEvent.change(within(form).getByRole("textbox"), { target: { value: "零分仍保留判断依据。" } });
  fireEvent.submit(form); fireEvent.submit(form);
  expect(save).toHaveBeenCalledTimes(1); expect(save).toHaveBeenCalledWith("student-01:question-01", { score: 0, comment: "零分仍保留判断依据。" });
  expect(screen.getByRole("button", { name: "下一份" })).toBeDisabled();
  await act(async () => first.reject(new Error("offline")));
  expect(screen.getByRole("alert")).toHaveTextContent("保存失败"); expect(within(form).getByRole("spinbutton")).toHaveValue("0");
  fireEvent.submit(form); await screen.findByRole("form", { name: "学生乙评分" });
  fireEvent.click(screen.getByRole("button", { name: "上一份" }));
  expect(screen.getByRole("spinbutton")).toHaveValue("0"); expect(screen.getByRole("textbox")).toHaveValue("零分仍保留判断依据。");
});
