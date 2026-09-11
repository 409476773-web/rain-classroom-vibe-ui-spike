import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SelectPage } from "./select-page";

afterEach(() => vi.useRealTimers());

it("keeps the latest remote response and selected metadata through slow results, failure and retry", () => {
  vi.useFakeTimers();
  render(<SelectPage />);
  const remote = screen.getByTestId("select-remote");
  const trigger = within(remote).getByRole("combobox", { name: "远程教学班" });
  expect(trigger).toHaveTextContent("视传 2401");
  fireEvent.keyDown(trigger, { key: "ArrowDown" });
  act(() => vi.advanceTimersByTime(0));
  const search = screen.getByRole("combobox", { name: "搜索选项" });
  fireEvent.change(search, { target: { value: "A" } });
  fireEvent.change(search, { target: { value: "B" } });
  act(() => vi.advanceTimersByTime(200));
  expect(screen.getByRole("option", { name: "B 班" })).toBeInTheDocument();
  act(() => vi.advanceTimersByTime(1000));
  expect(screen.queryByRole("option", { name: "A 班" })).not.toBeInTheDocument();
  expect(trigger).toHaveTextContent("视传 2401");
  fireEvent.change(search, { target: { value: "失败" } });
  act(() => vi.advanceTimersByTime(200));
  expect(screen.getByRole("alert")).toHaveTextContent("加载失败");
  fireEvent.click(screen.getByRole("button", { name: "重试" }));
  act(() => vi.advanceTimersByTime(200));
  expect(screen.getByRole("option", { name: "恢复后的班级" })).toBeInTheDocument();
});

it("leaves saving and cancelling the draft with the page", () => {
  render(<SelectPage />);
  const draft = screen.getByTestId("select-draft");
  fireEvent.click(within(draft).getByRole("button", { name: "清除课程教学班" }));
  expect(within(draft).getByTestId("select-saved")).toHaveTextContent("视传 2401");
  fireEvent.click(within(draft).getByRole("button", { name: "取消修改" }));
  expect(within(draft).getByRole("combobox", { name: "课程教学班" })).toHaveTextContent("视传 2401");
  fireEvent.click(within(draft).getByRole("button", { name: "清除课程教学班" }));
  fireEvent.click(within(draft).getByRole("button", { name: "保存修改" }));
  expect(within(draft).getByTestId("select-saved")).toHaveTextContent("未选择");
});
