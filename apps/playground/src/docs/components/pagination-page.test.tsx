import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { PaginationPage } from "./pagination-page";

afterEach(() => { vi.useRealTimers(); window.history.replaceState(null, "", "/"); });

it("retains the accepted course page on failure and retries the original target", () => {
  vi.useFakeTimers();
  const { container } = render(<PaginationPage />);
  const nav = screen.getByRole("navigation", { name: "课程列表分页" });
  const records = screen.getByRole("region", { name: "当前课程列表" });
  const status = container.querySelector('[data-slot="data-status"]')!;
  fireEvent.click(screen.getByRole("checkbox", { name: "模拟下次加载失败" }));
  fireEvent.click(within(nav).getByRole("button", { name: "下一页" }));
  expect(records).toHaveAttribute("aria-busy", "true");
  expect(records).toHaveTextContent("课程 001");
  act(() => vi.advanceTimersByTime(600));
  expect(status).toHaveTextContent("第 2 页加载失败");
  expect(records).toHaveTextContent("课程 001");
  expect(records).not.toHaveTextContent("课程 021");
  const retry = screen.getByRole("button", { name: "重试" });
  retry.focus();
  fireEvent.click(retry);
  expect(retry).toHaveFocus();
  expect(retry).toHaveAttribute("aria-busy", "true");
  act(() => vi.advanceTimersByTime(600));
  expect(status).toHaveTextContent("已显示第 2 页，每页 20 条");
  expect(records).toHaveTextContent("课程 021");
  expect(records).not.toHaveTextContent("课程 001");
  expect(screen.getByRole("checkbox", { name: "模拟下次加载失败" })).not.toBeChecked();
  expect(screen.getByRole("heading", { name: "全部课程" })).toHaveFocus();

  fireEvent.click(screen.getByRole("checkbox", { name: "模拟下次加载失败" }));
  fireEvent.click(within(nav).getByRole("button", { name: "下一页" }));
  act(() => vi.advanceTimersByTime(600));
  fireEvent.click(screen.getByRole("button", { name: "重试" }));
  const outside = screen.getByRole("button", { name: "深色" });
  outside.focus();
  act(() => vi.advanceTimersByTime(600));
  expect(outside).toHaveFocus();
  expect(records).toHaveTextContent("课程 041");
});

it("ignores a slower earlier page result and cleans up pending loads on unmount", () => {
  vi.useFakeTimers();
  const { container, unmount } = render(<PaginationPage />);
  fireEvent.click(screen.getByRole("button", { name: "连续翻两页" }));
  act(() => vi.advanceTimersByTime(200));
  expect(container.querySelector('[data-slot="data-status"]')).toHaveTextContent("已显示第 3 页");
  act(() => vi.advanceTimersByTime(900));
  expect(screen.getByRole("region", { name: "当前课程列表" })).toHaveTextContent("课程 041");
  expect(container.querySelector('[data-slot="data-status"]')).toHaveTextContent("已显示第 3 页");
  fireEvent.click(screen.getByRole("button", { name: "连续翻两页" }));
  unmount();
  expect(vi.getTimerCount()).toBe(0);
});

it("changes preview geometry and appearance without resetting independent pages, and restores a real link page", () => {
  window.history.replaceState(null, "", "/?pagination-page=7#pagination");
  const { container } = render(<PaginationPage />);
  const basic = screen.getByRole("navigation", { name: "基础分页" });
  fireEvent.click(within(basic).getByRole("button", { name: "下一页" }));
  fireEvent.click(within(screen.getByRole("group", { name: "分页尺寸" })).getByRole("button", { name: "28px" }));
  fireEvent.click(within(screen.getByRole("group", { name: "预览主题" })).getByRole("button", { name: "深色" }));
  fireEvent.click(within(screen.getByRole("group", { name: "区域密度" })).getByRole("button", { name: "紧凑" }));
  fireEvent.change(screen.getByRole("slider", { name: /预览容器宽度/ }), { target: { value: "320" } });
  const root = container.querySelector('[data-rain-id="pagination-page"]') as HTMLElement;
  expect(root.style.getPropertyValue("--rain-local-pagination-preview-width")).toBe("320px");
  expect(root).toHaveAttribute("data-rain-theme", "dark");
  expect(basic).toHaveAttribute("data-size", "28");
  expect(container.querySelector('[data-rain-id="pagination-basic-example"] [data-slot="current-page"]')).toHaveTextContent("第 2 页");
  expect(container.querySelector('[data-rain-id="pagination-simple-example"] [data-slot="current-page"]')).toHaveTextContent("第 1 页");
  const links = screen.getByRole("navigation", { name: "链接分页" });
  expect(links.querySelector('[aria-current="page"]')).toHaveAttribute("href", "?pagination-page=7#pagination");
});
