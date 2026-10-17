import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { parseSync } from "vite";
import { App } from "../../app";

afterEach(() => { window.location.hash = ""; });

it.each([
  ["label", "Label 字段标签"], ["field", "Field 字段与校验"], ["input-group", "Input Group 输入组合"],
  ["native-select", "Native Select 原生选择"], ["combobox", "Combobox 输入式选择"], ["slider", "Slider 数值滑块"],
  ["calendar", "Calendar 日历"], ["date-picker", "Date Picker 日期与时间"],
])("opens the %s documentation and offers complete copyable TSX", async (id, title) => {
  window.location.hash = `#${id}`;
  render(<App />);
  await screen.findByRole("heading", { name: title, level: 1 }, { timeout: 5000 });
  const code = [...document.querySelectorAll(".component-doc__code code")];
  expect(code.length).toBeGreaterThan(0);
  for (const block of code) expect(parseSync(`${id}-example.tsx`, block.textContent!).errors).toEqual([]);
}, 10000);

it("validates and saves the host form while preserving the edited fields", async () => {
  window.location.hash = "#field";
  render(<App />);
  const form = await screen.findByRole("form", { name: "作业发布设置" });
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

it("submits multiline feedback through the attached action and keeps a sibling unchanged", async () => {
  window.location.hash = "#input-group";
  render(<App />);
  const feedback = await screen.findByRole("textbox", { name: "评语" });
  fireEvent.change(feedback, { target: { value: "论证完整，补充一个反例会更有说服力。" } });
  fireEvent.click(screen.getByRole("button", { name: "提交评语" }));
  expect(screen.getByRole("status", { name: "评语提交结果" })).toHaveTextContent("论证完整");
  expect(screen.getByRole("textbox", { name: "未修改的输入组合" })).toHaveValue("请说明你的判断依据。");
});
