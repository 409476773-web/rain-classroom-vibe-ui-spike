import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ButtonGroupPage } from "./button-group-page";

afterEach(cleanup);

it("exposes all five existing Button sizes in horizontal, vertical and text groups", () => {
  render(<ButtonGroupPage />);
  for (const size of ["mini", "small", "medium", "large", "xl"]) {
    for (const kind of ["横向", "竖向", "文字"]) {
      const group = screen.getByRole("group", { name: `${size} ${kind}按钮组` });
      for (const button of within(group).getAllByRole("button")) expect(button).toHaveAttribute("data-size", size);
    }
  }
});

it("shows normal and disabled positions together with code collapsed by default", () => {
  render(<ButtonGroupPage />);
  for (const [name, mask] of [["正常", [false, false, false]], ["首项禁用", [true, false, false]], ["中间禁用", [false, true, false]], ["末项禁用", [false, false, true]], ["全部禁用", [true, true, true]]] as const) {
    const buttons = within(screen.getByRole("group", { name: `${name}示例` })).getAllByRole("button");
    buttons.forEach((button, index) => expect(button.hasAttribute("disabled")).toBe(mask[index]));
  }
  const example = screen.getByRole("group", { name: "编辑操作" }).closest("section")!;
  const details = example.querySelector("details")!;
  expect(details).not.toBeNull();
  expect(details.open).toBe(false);
  expect(details.querySelector("summary")).toHaveTextContent("查看代码");
});

function exampleFor(name: string) {
  const group = screen.getByRole("group", { name });
  const example = group.closest("section");
  if (!example) throw new Error(`Missing example for ${name}`);
  return { group, example };
}

it("keeps chapter movement feedback separate from the editing example", () => {
  render(<ButtonGroupPage />);
  const edit = exampleFor("编辑操作");
  fireEvent.click(within(edit.group).getByRole("button", { name: "撤销" }));
  const editingResult = within(edit.example).getByRole("status", { name: "编辑操作反馈" }).textContent;
  const chapters = screen.getByRole("group", { name: "章节操作" });
  fireEvent.click(within(chapters).getByRole("button", { name: "上移" }));
  expect(within(edit.example).getByRole("status", { name: "编辑操作反馈" })).toHaveTextContent(editingResult!);
  expect(within(exampleFor("章节操作").example).getByRole("status", { name: "章节操作反馈" })).toHaveTextContent("已上移章节");
});

it("enables redo after undo and lets restore reset the editing cycle", () => {
  render(<ButtonGroupPage />);
  const { group, example } = exampleFor("编辑操作");
  const redo = within(group).getByRole("button", { name: "重做" });
  expect(redo).toBeDisabled();
  fireEvent.click(within(group).getByRole("button", { name: "撤销" }));
  expect(redo).toBeEnabled();
  fireEvent.click(redo);
  expect(within(example).getByRole("status", { name: "编辑操作反馈" })).toHaveTextContent("已重做当前示例更改");
  expect(redo).toBeDisabled();
  fireEvent.click(within(group).getByRole("button", { name: "撤销" }));
  fireEvent.click(within(group).getByRole("button", { name: "恢复" }));
  expect(redo).toBeDisabled();
  expect(within(example).getByRole("status", { name: "编辑操作反馈" })).toHaveTextContent("已恢复默认设置");
  fireEvent.click(within(group).getByRole("button", { name: "撤销" }));
  expect(redo).toBeEnabled();
});

it("shows the plain horizontal baseline separately from explicit separators", () => {
  render(<ButtonGroupPage />);
  const baseline = exampleFor("编辑操作");
  expect(baseline.group.querySelector('[data-slot="button-group-separator"]')).toBeNull();
  const separated = exampleFor("带分隔线的编辑操作");
  expect(separated.example).not.toBe(baseline.example);
  expect(separated.group.querySelector('[data-slot="button-group-separator"]')).not.toBeNull();
  fireEvent.click(within(separated.group).getByRole("button", { name: "撤销" }));
  expect(within(baseline.group).getByRole("button", { name: "重做" })).toBeDisabled();
  expect(within(separated.group).getByRole("button", { name: "重做" })).toBeEnabled();
});

it("gives all four visible combinations their own complete code and local status", () => {
  render(<ButtonGroupPage />);
  const names = ["编辑操作", "带分隔线的编辑操作", "章节操作", "提交操作"];
  const examples = names.map(name => exampleFor(name).example);
  expect(new Set(examples).size).toBe(4);
  for (const [index, example] of examples.entries()) {
    const code = example.querySelector("pre code")?.textContent;
    expect(code).toContain(`aria-label="${names[index]}"`);
    expect(code).toContain('from "@rain-next/ui"');
    expect(within(example).getByRole("status", { name: `${names[index]}反馈` })).toBeInTheDocument();
  }
  const submission = exampleFor("提交操作");
  expect(submission.example.querySelector("pre code")?.textContent).toContain("<ButtonGroupText>当前草稿</ButtonGroupText>");
  fireEvent.click(within(submission.group).getByRole("button", { name: "保存" }));
  expect(within(submission.example).getByRole("status", { name: "提交操作反馈" })).toHaveTextContent("已保存当前草稿");
  expect(within(exampleFor("编辑操作").example).getByRole("status", { name: "编辑操作反馈" })).toHaveTextContent("尚未执行操作");
});
