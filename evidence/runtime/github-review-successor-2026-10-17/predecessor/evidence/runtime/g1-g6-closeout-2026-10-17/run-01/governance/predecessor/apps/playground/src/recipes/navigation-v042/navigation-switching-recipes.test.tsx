import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { NavigationBarRecommendedScene, SegmentedControlRecommendedScene } from "./navigation-switching-recipes";

beforeEach(() => { vi.stubGlobal("requestAnimationFrame", () => 1); vi.stubGlobal("cancelAnimationFrame", () => undefined); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); window.location.hash = ""; });

it("uses separate native radio names and resets traversal without clearing the current answer draft", async () => {
  render(<><SegmentedControlRecommendedScene /><SegmentedControlRecommendedScene /></>);
  const regions = screen.getAllByRole("region", { name: "批阅顺序演示" });
  const first = within(regions[0]!), second = within(regions[1]!);
  fireEvent.change(first.getByRole("textbox", { name: "批阅备注" }), { target: { value: "保留这份成绩草稿" } });
  const question = first.getByRole("radio", { name: "按题" }) as HTMLInputElement;
  fireEvent.click(question);
  const secondStudent = second.getByRole("radio", { name: "按人" }) as HTMLInputElement;
  expect(question.name).not.toBe(secondStudent.name);
  expect(question).toBeChecked(); expect(secondStudent).toBeChecked();
  expect(new FormData(question.form!).get(question.name)).toBe("question");
  await act(async () => question.form!.reset());
  expect(first.getByRole("radio", { name: "按人" })).toBeChecked();
  expect(first.getByRole("textbox", { name: "批阅备注" })).toHaveValue("保留这份成绩草稿");
  expect(first.getByRole("button", { name: "欧阳小明" })).toHaveAttribute("aria-pressed", "true");
});

it("shows a cleared score as pending in the queue instead of restoring the original seven points", () => {
  render(<SegmentedControlRecommendedScene />);
  const scene = within(screen.getByRole("region", { name: "批阅顺序演示" }));
  const score = scene.getByRole("spinbutton", { name: "得分" });
  fireEvent.change(score, { target: { value: "" } }); fireEvent.blur(score);
  expect(scene.getByRole("button", { name: "保存评分" })).toBeDisabled();
  const entry = scene.getByRole("button", { name: "欧阳小明" });
  expect(entry.querySelector('[data-slot="status"]')).toHaveTextContent("待批阅");
});

it("adds a local course resource and retains it through native destination changes", () => {
  window.location.hash = "navigation-bar?view=resources";
  const view = render(<NavigationBarRecommendedScene />);
  fireEvent.click(screen.getByRole("button", { name: "添加资料" }));
  fireEvent.change(screen.getByRole("textbox", { name: "新增资料名称" }), { target: { value: "本周补充阅读" } });
  fireEvent.click(screen.getByRole("button", { name: "添加到课程" }));
  expect(screen.getByRole("list", { name: "课程教学资料" }).children).toHaveLength(4);
  window.location.hash = "navigation-bar?view=overview"; view.rerender(<NavigationBarRecommendedScene />);
  expect(screen.getByRole("heading", { name: "课程简介" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "课程总览" })).toHaveAttribute("aria-current", "page");
  window.location.hash = "navigation-bar?view=invalid"; view.rerender(<NavigationBarRecommendedScene />);
  expect(screen.getByRole("link", { name: "教学内容" })).toHaveAttribute("aria-current", "page");
  expect(screen.getByText("本周补充阅读")).toBeInTheDocument();
});
