import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { App } from "../../app";

afterEach(() => { vi.useRealTimers(); window.location.hash = ""; });

it("validates long text, retains failed drafts, commits only on success and cancels to saved content", () => {
  vi.useFakeTimers();
  window.location.hash = "#textarea";
  render(<App />);
  const control = screen.getByRole("textbox", { name: "课程说明" });
  const save = screen.getByRole("button", { name: "保存说明" });
  fireEvent.click(save);
  expect(control).toHaveFocus();
  expect(control).toHaveAccessibleDescription(/请输入课程说明/);
  fireEvent.change(control, { target: { value: "第一段\n第二段" } });
  fireEvent.click(screen.getByRole("checkbox", { name: "模拟下次保存失败" }));
  fireEvent.click(save);
  expect(control).toBeDisabled();
  act(() => vi.runAllTimers());
  expect(screen.getByRole("status")).toHaveTextContent("保存失败，草稿已保留，请重试");
  expect(control).toHaveValue("第一段\n第二段");
  expect(screen.getByRole("region", { name: "已保存的说明" })).toHaveTextContent("尚未保存");
  fireEvent.click(save);
  act(() => vi.runAllTimers());
  expect(screen.getByRole("status")).toHaveTextContent("已保存到本地样例");
  expect(screen.getByRole("region", { name: "已保存的说明" })).toHaveTextContent("第一段 第二段");
  fireEvent.change(control, { target: { value: "未保存的修改" } });
  fireEvent.click(screen.getByRole("button", { name: "取消修改" }));
  expect(control).toHaveValue("第一段\n第二段");
});
