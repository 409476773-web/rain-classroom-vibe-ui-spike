import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { G5ComponentPage } from "./g5-component-pages";

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const thumb = this.classList.contains("rain-slider__thumb"), width = thumb ? 16 : 300;
    return { x: 0, y: 0, top: 0, left: 0, right: width, bottom: 36, width, height: 36, toJSON() {} };
  });
});
afterEach(() => vi.restoreAllMocks());

it("preserves cleared and out-of-range drafts while the slider keeps its last valid value", async () => {
  const user = userEvent.setup();
  render(<G5ComponentPage component="slider" />);
  const input = screen.getByRole("spinbutton", { name: "精确及格线" });
  const slider = await screen.findByRole("slider", { name: "及格线" });
  await user.clear(input);
  expect(input).toHaveValue("");
  expect(slider).toHaveValue("60");
  await user.type(input, "150");
  expect(input).toHaveValue("150");
  expect(slider).toHaveValue("15");
  await user.click(screen.getByRole("button", { name: "保存及格线" }));
  expect(screen.getByRole("status", { name: "及格线保存结果" })).toHaveTextContent("尚未保存");
  await user.clear(input); await user.type(input, "65");
  await user.click(screen.getByRole("button", { name: "保存及格线" }));
  expect(screen.getByRole("status", { name: "及格线保存结果" })).toHaveTextContent("65 分");
});

it("keeps decimal editing and validates the same playback step for precise input", async () => {
  render(<G5ComponentPage component="slider" />);
  const input = screen.getByRole("spinbutton", { name: "精确播放速度" });
  const slider = await screen.findByRole("slider", { name: "播放速度" });
  fireEvent.change(input, { target: { value: "1." } });
  expect(input).toHaveValue("1.");
  fireEvent.change(input, { target: { value: "1.23" } });
  expect(input).toHaveValue("1.23");
  expect(slider).toHaveValue("1");
  expect(screen.getByText("请按 0.05 的步长调整")).toBeVisible();
  fireEvent.change(input, { target: { value: "1.25" } });
  expect(slider).toHaveValue("1.25");
  expect(screen.queryByText("请按 0.05 的步长调整")).not.toBeInTheDocument();
});

it("retains conflicting endpoint drafts and filters only after a valid input completes", async () => {
  const user = userEvent.setup();
  render(<G5ComponentPage component="slider" />);
  const lower = screen.getByRole("spinbutton", { name: "成绩下限" });
  const upper = screen.getByRole("spinbutton", { name: "成绩上限" });
  const result = screen.getByRole("status", { name: "成绩筛选结果" });
  await screen.findByRole("slider", { name: "成绩下限滑钮" });
  fireEvent.change(lower, { target: { value: "95" } });
  expect(lower).toHaveValue("95");
  expect(screen.getByRole("slider", { name: "成绩下限滑钮" })).toHaveValue("40");
  expect(upper).toHaveValue("90");
  expect(result).toHaveTextContent("40–90 分");
  fireEvent.change(lower, { target: { value: "60" } });
  expect(screen.getByRole("slider", { name: "成绩下限滑钮" })).toHaveValue("60");
  expect(result).toHaveTextContent("40–90 分");
  lower.focus(); await user.keyboard("{Enter}");
  expect(result).toHaveTextContent("60–90 分");
  await user.click(screen.getByRole("button", { name: "加载相等范围" }));
  expect(screen.getByRole("spinbutton", { name: "成绩下限" })).toHaveValue("60");
  expect(screen.getByRole("spinbutton", { name: "成绩上限" })).toHaveValue("60");
  expect(screen.getByRole("slider", { name: "成绩上限滑钮" })).toHaveValue("60");
});

it("switches region density together and offers all four working forms", async () => {
  const user = userEvent.setup();
  render(<G5ComponentPage component="slider" />);
  for (const name of ["单值阈值与精确输入", "双端成绩范围", "连续参数即时反馈", "小数步长与单位"]) {
    expect(screen.getByRole("heading", { name })).toBeVisible();
  }
  const main = screen.getByRole("main");
  await user.click(screen.getByRole("button", { name: "紧凑密度" }));
  expect(main.closest('[data-density="compact"]')).not.toBeNull();
  for (const input of within(main).getAllByRole("spinbutton")) expect(input.closest('[data-density]')).toHaveAttribute("data-density", "compact");
});

it("syncs the slider when the other endpoint repairs a conflicting draft before confirmation", async () => {
  const user = userEvent.setup();
  render(<G5ComponentPage component="slider" />);
  const lower = screen.getByRole("spinbutton", { name: "成绩下限" });
  const upper = screen.getByRole("spinbutton", { name: "成绩上限" });
  const lowThumb = await screen.findByRole("slider", { name: "成绩下限滑钮" });
  const highThumb = screen.getByRole("slider", { name: "成绩上限滑钮" });
  const result = screen.getByRole("status", { name: "成绩筛选结果" });
  fireEvent.change(lower, { target: { value: "95" } });
  fireEvent.change(upper, { target: { value: "96" } });
  upper.focus(); await user.keyboard("{Enter}");
  expect(result).toHaveTextContent("40–90 分");
  lower.focus(); await user.keyboard("{Enter}");
  expect(lowThumb).toHaveValue("95");
  expect(highThumb).toHaveValue("96");
  expect(result).toHaveTextContent("95–96 分");
});

it("does not apply a range while the other endpoint retains an incomplete sign", async () => {
  const user = userEvent.setup();
  render(<G5ComponentPage component="slider" />);
  const lower = screen.getByRole("spinbutton", { name: "成绩下限" });
  const upper = screen.getByRole("spinbutton", { name: "成绩上限" });
  fireEvent.change(upper, { target: { value: "-" } });
  fireEvent.change(lower, { target: { value: "60" } });
  lower.focus(); await user.keyboard("{Enter}");
  expect(upper).toHaveValue("-");
  expect(screen.getByRole("status", { name: "成绩筛选结果" })).toHaveTextContent("40–90 分");
  const lowThumb = await screen.findByRole("slider", { name: "成绩下限滑钮" });
  lowThumb.focus(); await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("status", { name: "成绩筛选结果" })).toHaveTextContent("40–90 分");
  await user.click(screen.getByRole("button", { name: "恢复常用范围" }));
  expect(screen.getByRole("spinbutton", { name: "成绩上限" })).toHaveValue("90");
  fireEvent.change(screen.getByRole("spinbutton", { name: "成绩下限" }), { target: { value: "-" } });
  lowThumb.focus(); await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("spinbutton", { name: "成绩下限" })).toHaveValue("41");
  expect(screen.getByRole("status", { name: "成绩筛选结果" })).toHaveTextContent("41–90 分");
});
