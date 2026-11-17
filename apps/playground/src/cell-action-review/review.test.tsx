import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { CellActionExample } from "./review";

it("connects the example density control to the shared Table density",async()=>{
  const user=userEvent.setup();render(<CellActionExample embedded/>);
  expect(screen.getByRole("table")).toHaveAttribute("data-density","default");
  await user.click(screen.getByRole("checkbox",{name:"紧凑行高"}));
  expect(screen.getByRole("table")).toHaveAttribute("data-density","compact");
});

it("keeps row selection separate from blank activation, direct editing and dirty state", async()=>{
  const user=userEvent.setup(); const {container}=render(<CellActionExample embedded/>);
  fireEvent.click(container.querySelector("#ca-b-name")!);
  expect(screen.getByRole("checkbox",{name:"选择任务：课堂观察记录"})).not.toBeChecked();
  await user.click(screen.getByRole("checkbox",{name:"选择任务：课堂学习与实践"}));
  expect(screen.getByRole("checkbox",{name:"选择任务：课堂观察记录"})).not.toBeChecked();
  expect(screen.getByRole("checkbox",{name:/选择当前页全部任务/})).toBePartiallyChecked();
  expect(screen.getByRole("button",{name:"保存修改"})).toBeDisabled();
  await user.click(screen.getByRole("button",{name:"编辑课堂观察记录成绩：88.50"}));
  const input=screen.getByRole("textbox",{name:"修改成绩"}); await user.clear(input);await user.type(input,"90");await user.keyboard("{Enter}");
  expect(screen.getByRole("button",{name:"编辑课堂观察记录成绩：90.00"})).toBeVisible();
  expect(screen.getByRole("checkbox",{name:"选择任务：课堂学习与实践"})).toBeChecked();
  expect(screen.getByRole("button",{name:"保存修改"})).toBeEnabled();
});

it("selects collapsed descendants only through explicit page-all selection and preserves their count", async()=>{
  const user=userEvent.setup();render(<CellActionExample embedded/>);
  await user.click(screen.getByRole("button",{name:"收起课堂学习与实践"}));
  expect(screen.queryByRole("checkbox",{name:"选择任务：课堂观察记录"})).toBeNull();
  await user.click(screen.getByRole("checkbox",{name:/选择当前页全部任务/}));
  expect(screen.getByRole("toolbar",{name:"批量操作"})).toHaveTextContent("已选 4 行，含 2 行已折叠");
  await user.click(screen.getByRole("button",{name:"展开课堂学习与实践"}));
  expect(screen.getByRole("checkbox",{name:"选择任务：课堂观察记录"})).toBeChecked();
  await user.click(screen.getByRole("checkbox",{name:"选择任务：课堂学习与实践"}));
  expect(screen.getByRole("checkbox",{name:"选择任务：课堂观察记录"})).toBeChecked();
});

it("retains invalid input when navigation or a checkbox attempts to leave it", async()=>{
  const user=userEvent.setup(),guard={current:()=>true}; render(<CellActionExample embedded navigationGuard={guard}/>);
  await user.click(screen.getByRole("button",{name:"编辑课堂学习与实践成绩：92.00"}));
  const input=screen.getByRole("textbox",{name:"修改成绩"});await user.clear(input);await user.type(input,"101");await user.keyboard("{Enter}");
  expect(guard.current()).toBe(false);
  await user.click(screen.getByRole("checkbox",{name:"选择任务：课堂学习与实践"}));
  expect(screen.getByRole("checkbox",{name:"选择任务：课堂学习与实践"})).not.toBeChecked();
  expect(input).toHaveValue("101");expect(input).toHaveFocus();
  await user.keyboard("{Escape}");expect(guard.current()).toBe(true);
});
