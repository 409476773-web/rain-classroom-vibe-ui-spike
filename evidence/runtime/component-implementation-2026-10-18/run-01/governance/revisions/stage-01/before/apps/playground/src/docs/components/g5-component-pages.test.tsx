import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { parseSync } from "vite";
import { App } from "../../app";
import { AssignmentSettingsExample } from "./g5-component-pages";
import { ComponentCatalog } from "./component-catalog";

afterEach(() => { window.location.hash = ""; });

it.each([
  ["label", "Label 字段标签"], ["field", "Field 字段与校验"], ["input-group", "Input Group 输入组合"],
  ["combobox", "Combobox 输入式选择"], ["slider", "Slider 数值滑块"],
  ["calendar", "Calendar 日历"], ["date-picker", "Date Picker 日期与时间"],
])("opens the %s documentation and offers complete copyable TSX", async (id, title) => {
  window.location.hash = `#${id}`;
  render(<App />);
  await screen.findByRole("heading", { name: title, level: 1 }, { timeout: 5000 });
  const code = [...document.querySelectorAll(".component-doc__code code")];
  expect(code.length).toBeGreaterThan(0);
  for (const block of code) expect(parseSync(`${id}-example.tsx`, block.textContent!).errors).toEqual([]);
}, 10000);

it("opens the existing Select for legacy native links and removes the duplicate catalogue entry", async () => {
  window.location.hash = "#native-select";
  const { unmount } = render(<App />);
  await screen.findByRole("heading", { name: "Select 选择器", level: 1 });
  expect(screen.getByRole("combobox", { name: "任务类型" }).tagName).toBe("BUTTON");
  expect(document.querySelector("select")).toBeNull();
  unmount();
  render(<ComponentCatalog />);
  expect(screen.queryByRole("link", { name: "Native Select 原生选择" })).not.toBeInTheDocument();
});

it("validates and saves the host form while preserving the edited fields", async () => {
  window.location.hash = "#field";
  render(<AssignmentSettingsExample />);
  const form = await screen.findByRole("form", { name: "作业发布设置" });
  expect(within(form).getByRole("combobox", { name: "作业类型" }).tagName).toBe("BUTTON");
  const title = within(form).getByRole("textbox", { name: "作业名称" });
  fireEvent.change(title, { target: { value: "" } });
  fireEvent.submit(form);
  expect(within(form).getByText("请输入作业名称。")).toBeVisible();
  expect(within(form).queryByText(/设置已保存/)).not.toBeInTheDocument();
  fireEvent.change(title, { target: { value: "第六讲课堂练习" } });
  fireEvent.submit(form);
  expect(within(form).getByRole("status", { name: "作业保存结果" })).toHaveTextContent("第六讲课堂练习");
  expect(title).toHaveValue("第六讲课堂练习");
});

it("associates course and points errors with each field and focuses the first invalid field", async () => {
  window.location.hash = "#field";
  render(<AssignmentSettingsExample />);
  const form = await screen.findByRole("form", { name: "作业发布设置" });
  const course = within(form).getByRole("combobox", { name: "所属课程" });
  const points = within(form).getByRole("spinbutton", { name: "满分" });
  fireEvent.click(within(form).getByRole("button", { name: "清除所属课程" }));
  fireEvent.change(points, { target: { value: "" } });
  fireEvent.submit(form);
  expect(course).toHaveAttribute("aria-invalid", "true");
  expect(course).toHaveAccessibleDescription("请选择所属课程。");
  expect(points).toHaveAttribute("aria-invalid", "true");
  expect(points).toHaveAccessibleDescription(/请输入 1–200 之间的整数满分。/);
  expect(course).toHaveFocus();
  const title = within(form).getByRole("textbox", { name: "作业名称" });
  fireEvent.change(title, { target: { value: "" } });
  fireEvent.submit(form);
  expect(title).toHaveFocus();
  expect(within(form).getByRole("status", { name: "作业保存结果" })).not.toHaveTextContent("设置已保存");
});

it("keeps unresolved field errors when another field is edited", () => {
  render(<AssignmentSettingsExample />);
  const form = screen.getByRole("form", { name: "作业发布设置" });
  const title = within(form).getByRole("textbox", { name: "作业名称" });
  const course = within(form).getByRole("combobox", { name: "所属课程" });
  const points = within(form).getByRole("spinbutton", { name: "满分" });
  fireEvent.change(title, { target: { value: "" } });
  fireEvent.click(within(form).getByRole("button", { name: "清除所属课程" }));
  fireEvent.change(points, { target: { value: "" } });
  fireEvent.submit(form);
  fireEvent.change(title, { target: { value: "修正后的作业名称" } });
  fireEvent.change(within(form).getByRole("textbox", { name: "作业说明" }), { target: { value: "补充说明" } });
  expect(title).not.toHaveAttribute("aria-invalid", "true");
  expect(course).toHaveAccessibleDescription("请选择所属课程。");
  expect(points).toHaveAccessibleDescription(/请输入 1–200 之间的整数满分。/);
  fireEvent.change(points, { target: { value: "80" } });
  expect(points).not.toHaveAttribute("aria-invalid", "true");
  expect(course).toHaveAttribute("aria-invalid", "true");
  fireEvent.submit(form);
  expect(course).toHaveFocus();
  expect(points).toHaveValue("80");
});

it.each(["", "0", "201"])("focuses the invalid points value %s before later fields", async value => {
  window.location.hash = "#field";
  render(<AssignmentSettingsExample />);
  const form = await screen.findByRole("form", { name: "作业发布设置" });
  const points = within(form).getByRole("spinbutton", { name: "满分" });
  fireEvent.change(points, { target: { value } });
  fireEvent.submit(form);
  expect(points).toHaveFocus();
  expect(points).toHaveAttribute("aria-invalid", "true");
  expect(points).toHaveAccessibleDescription(/请输入 1–200 之间的整数满分。/);
});

it("submits multiline feedback through the attached action and keeps a sibling unchanged", async () => {
  window.location.hash = "#input-group";
  render(<App />);
  const feedback = await screen.findByRole("textbox", { name: "评语" });
  fireEvent.change(feedback, { target: { value: "论证完整，补充一个反例会更有说服力。" } });
  fireEvent.click(screen.getByRole("button", { name: "提交评语" }));
  expect(screen.getByRole("status", { name: "评语提交结果" })).toHaveTextContent("论证完整");
  expect(screen.getByRole("textbox", { name: "未修改的输入组合" })).toHaveValue("请说明你的判断依据。");
});
