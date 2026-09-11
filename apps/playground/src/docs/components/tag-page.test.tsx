import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { tagColorProfileNames } from "@rain-next/foundations";
import { TagPage } from "./tag-page";

afterEach(() => vi.useRealTimers());
it("returns focus after removing and restoring the independent link example", () => {
  render(<TagPage />);
  const link = screen.getByRole("link", { name: "第三章课件" });
  const close = within(link.parentElement!).getByRole("button");
  close.focus(); fireEvent.click(close);
  const restore = screen.getByRole("button", { name: "恢复链接标签" });
  expect(restore).toHaveFocus(); fireEvent.click(restore);
  expect(screen.getByRole("link", { name: "第三章课件" })).toHaveFocus();
});

it("shows every original profile, complete sizes and live theme controls", () => {
  const { container } = render(<TagPage />);
  expect(screen.getByRole("heading", { name: "Tag 标签" })).toBeVisible();
  for (const color of tagColorProfileNames) expect(container.querySelector(`[data-profile="${color}"]`)?.querySelectorAll('[data-rain-id="ui-tag"]')).toHaveLength(3);
  for (const size of [20, 24, 28]) expect(container.querySelector(`[data-tag-size="${size}"] [data-rain-id="ui-tag"]`)).toHaveAttribute("data-size", String(size));
  fireEvent.change(screen.getByRole("combobox", { name: "主题" }), { target: { value: "dark" } });
  expect(container.querySelector("main")).toHaveAttribute("data-rain-theme", "dark");
  expect(screen.getByText("查看完整名称")).toBeVisible();
});

it("keeps removal, rollback, undo and empty-collection focus in the collection owner", () => {
  vi.useFakeTimers();
  render(<TagPage />);
  const collection = screen.getByRole("region", { name: "管理标签" });
  const remove = (text: string) => within(collection).getByRole("button", { name: `移除标签 ${text}` });
  fireEvent.click(remove("期末复习"));
  act(() => vi.advanceTimersByTime(400));
  expect(within(collection).queryByText("期末复习")).toBeNull();
  expect(remove("第三章课件")).toHaveFocus();
  fireEvent.click(within(collection).getByRole("button", { name: "撤销移除" }));
  expect(remove("期末复习")).toHaveFocus();
  fireEvent.click(within(collection).getByRole("checkbox", { name: "模拟移除失败" }));
  fireEvent.click(remove("期末复习"));
  act(() => vi.advanceTimersByTime(400));
  expect(remove("期末复习")).toHaveFocus();
  expect(within(collection).getByRole("status")).toHaveTextContent("移除失败");
  fireEvent.click(within(collection).getByRole("checkbox", { name: "模拟移除失败" }));
  for (const text of ["期末复习", "第三章课件", "个人笔记"]) { fireEvent.click(remove(text)); act(() => vi.advanceTimersByTime(400)); }
  expect(within(collection).getByRole("button", { name: "添加示例标签" })).toHaveFocus();
});

it("does not steal focus after the user leaves an asynchronous removal", () => {
  vi.useFakeTimers(); render(<TagPage />);
  const collection = screen.getByRole("region", { name: "管理标签" });
  const close = within(collection).getByRole("button", { name: "移除标签 期末复习" });
  close.focus(); fireEvent.click(close);
  const theme = screen.getByRole("combobox", { name: "主题" });
  theme.focus(); act(() => vi.advanceTimersByTime(400));
  expect(theme).toHaveFocus();
});
