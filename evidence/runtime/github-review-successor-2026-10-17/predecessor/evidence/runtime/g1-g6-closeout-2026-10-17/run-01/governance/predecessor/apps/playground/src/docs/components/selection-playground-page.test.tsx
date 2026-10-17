import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { CheckboxGroup, RadioGroup } from "@rain-next/ui";
import { SelectionPlaygroundPage } from "./selection-playground-page";

it("SEL-026 keeps selection and unique label associations across duplicate labels and React reordering", async () => {
  const user = userEvent.setup();
  const options = [{ value: "first", label: "同名课程" }, { value: "second", label: "同名课程" }];
  function Example({ reversed = false }: { reversed?: boolean }) {
    const items = reversed ? [...options].reverse() : options;
    return <><CheckboxGroup legend="多选课程" name="courses" options={items} defaultValue={["first"]} />
      <RadioGroup legend="第一组" options={items} /><RadioGroup legend="第二组" options={items} /></>;
  }
  const view = render(<Example />);
  await user.click(within(screen.getByRole("radiogroup", { name: "第一组" })).getAllByRole("radio")[0]!);
  await user.click(within(screen.getByRole("radiogroup", { name: "第二组" })).getAllByRole("radio")[1]!);
  const before = new Map([...view.container.querySelectorAll("input")].map((input) => [`${input.name}:${input.value}`, input.getAttribute("aria-labelledby")]));
  view.rerender(<Example reversed />);
  const inputs = [...view.container.querySelectorAll("input")];
  for (const input of inputs) expect(input.getAttribute("aria-labelledby")).toBe(before.get(`${input.name}:${input.value}`));
  expect(screen.getAllByRole("checkbox").map((input) => (input as HTMLInputElement).checked)).toEqual([false, true]);
  expect(within(screen.getByRole("radiogroup", { name: "第一组" })).getAllByRole("radio").map((input) => (input as HTMLInputElement).checked)).toEqual([false, true]);
  expect(within(screen.getByRole("radiogroup", { name: "第二组" })).getAllByRole("radio").map((input) => (input as HTMLInputElement).checked)).toEqual([true, false]);
  const ids = [...view.container.querySelectorAll("[id]")].map((node) => node.id); expect(new Set(ids).size).toBe(ids.length);
});

it("edits a complete recipe while retaining stable values, trace attributes and a valid empty-title fallback", async () => {
  const user = userEvent.setup();
  const { container } = render(<SelectionPlaygroundPage />);
  await user.click(screen.getByRole("button", { name: "选择卡片" }));
  const title = screen.getByRole("textbox", { name: "第一项标题" });
  await user.clear(title);
  expect(within(screen.getByRole("radiogroup", { name: "图文选择" })).getByRole("radio", { name: "未命名选项" })).toBeChecked();
  await user.type(title, "新的课程模板");
  await user.clear(screen.getByRole("textbox", { name: "第一项说明" }));
  const radio = within(screen.getByRole("radiogroup", { name: "图文选择" })).getByRole("radio", { name: "新的课程模板" });
  expect(radio).toHaveAttribute("value", "first");
  expect(container.querySelector('[data-rain-id="ui-radio-card"] [data-slot="media"]')).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "清空选择" }));
  expect(radio).not.toBeChecked();
});

it("retains inactive drafts but submits only active fields and preserves group state across categories", async () => {
  const user = userEvent.setup();
  render(<SelectionPlaygroundPage />);
  await user.click(screen.getByRole("button", { name: "组合模式" }));
  const note = screen.getByRole("textbox", { name: "关联备注" });
  await user.type(note, "保留这个草稿");
  const group = screen.getByRole("radiogroup", { name: "预览与关联设置" });
  await user.click(within(group).getByRole("radio", { name: "另一个选项" }));
  expect(note).toBeDisabled();
  await user.click(screen.getByRole("button", { name: "读取提交数据" }));
  expect(screen.getByTestId("workbench-payload")).not.toHaveTextContent("保留这个草稿");
  await user.click(within(group).getByRole("radio", { name: "课程项目方案" }));
  expect(note).toHaveValue("保留这个草稿");
  await user.click(screen.getByRole("button", { name: "读取提交数据" }));
  expect(screen.getByTestId("workbench-payload")).toHaveTextContent("保留这个草稿");
  await user.click(screen.getByRole("button", { name: "基础控件" }));
  expect(within(screen.getByRole("radiogroup", { name: "单项选择" })).getByRole("radio", { name: "课程项目方案" })).toBeChecked();
});

it("searches actual source entries and reports an empty result without inventing an installer", async () => {
  const user = userEvent.setup();
  render(<SelectionPlaygroundPage />);
  await user.click(screen.getByText("查找源码与使用边界", { exact: true }));
  const search = screen.getByRole("textbox", { name: "检索选择资产" });
  await user.type(search, "dependentfields");
  const catalog = screen.getByRole("region", { name: "源码检索" });
  expect(within(catalog).getByText("DependentFields", { exact: true })).toBeInTheDocument();
  expect(within(catalog).getByText("apps/playground/src/patterns/selection-patterns.tsx", { exact: true })).toBeInTheDocument();
  expect(within(catalog).queryByText("Checkbox", { exact: true })).toBeNull();
  await user.clear(search); await user.type(search, "nonexistent-choice");
  expect(within(catalog).getByText("没有符合条件的资产。")).toBeVisible();
});
