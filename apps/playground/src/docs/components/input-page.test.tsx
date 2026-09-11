import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { InputPage } from "./input-page";

afterEach(() => vi.useRealTimers());

it("switches one complete Input family appearance without resetting edits, sizes or supporting actions", () => {
  const { container } = render(<InputPage />);
  const plain = screen.getByRole("textbox", { name: "32 常规" });
  const credit = screen.getByRole("textbox", { name: "课程学分" });
  const search = screen.getByRole("textbox", { name: "课程搜索" });
  fireEvent.change(plain, { target: { value: "原有草稿" } });
  fireEvent.change(credit, { target: { value: "12" } });
  fireEvent.change(search, { target: { value: "搜索草稿" } });
  const frames = [...container.querySelectorAll('[data-rain-id="ui-input"]')];
  const sizes = frames.map((frame) => frame.getAttribute("data-size"));
  const controls = within(screen.getByRole("group", { name: "输入框外观" }));

  for (const [label, appearance] of [["填充", "filled"], ["底线", "underlined"], ["描边", "outlined"]] as const) {
    fireEvent.click(controls.getByRole("button", { name: label }));
    expect(controls.getByRole("button", { name: label })).toHaveAttribute("aria-pressed", "true");
    frames.forEach((frame, index) => {
      expect(frame).toHaveAttribute("data-appearance", appearance);
      expect(frame).toHaveAttribute("data-size", sizes[index]);
    });
    expect(plain).toHaveValue("原有草稿");
    expect(credit).toHaveValue("12");
    expect(search).toHaveValue("搜索草稿");
  }

  const creditRoot = credit.closest('[data-rain-id="ui-input"]')!;
  expect(creditRoot.querySelector('[data-slot="suffix-text"]')).toHaveTextContent("学分");
  expect(creditRoot.querySelector('[data-slot="count"]')).toHaveTextContent("2/3");
  fireEvent.click(screen.getByRole("button", { name: "清除课程学分" }));
  expect(credit).toHaveValue("");
  expect(creditRoot.querySelector('[data-slot="count"]')).toHaveTextContent("0/3");
  fireEvent.click(screen.getByRole("button", { name: "查看" }));
  expect(screen.getByRole("textbox", { name: "只读课程编号" })).toHaveAccessibleDescription("已读取：AI-2026");
  expect(screen.getByRole("textbox", { name: "32 禁用" })).toBeDisabled();
});

it("shows four complete sizes and leaves query results under the latest request", () => {
  vi.useFakeTimers();
  render(<InputPage />);
  for (const size of [24, 28, 32, 36]) expect(screen.getByRole("textbox", { name: `${size} 常规` }).closest('[data-rain-id="ui-input"]')).toHaveAttribute("data-size", String(size));
  const control = screen.getByRole("textbox", { name: "课程搜索" });
  fireEvent.change(control, { target: { value: "旧查询" } });
  fireEvent.keyDown(control, { key: "Enter" });
  fireEvent.click(screen.getByRole("button", { name: "清除课程搜索" }));
  act(() => vi.advanceTimersByTime(200));
  expect(screen.getByTestId("input-query-result")).toHaveTextContent("全部课程（必修课）");
  fireEvent.change(control, { target: { value: "新草稿" } });
  act(() => vi.advanceTimersByTime(1000));
  expect(screen.getByTestId("input-query-result")).toHaveTextContent("全部课程（必修课）");
  expect(control).toHaveValue("新草稿");
});
