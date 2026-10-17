import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { FormItem } from "../input/form-item";
import { Combobox } from "./combobox";

const options = [{ value: "a", label: "视传 2401", group: "设计学院" }, { value: "b", label: "数媒 2401", description: "周一" }, { value: "x", label: "停用班级", disabled: true }];
const input = () => screen.getByRole("combobox");

it("edits the query without committing and restores the selected label on Escape and blur", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<><Combobox options={options} defaultValue="a" aria-label="教学班" onValueChange={changed} /><button>外部操作</button></>);
  expect(input()).toHaveValue("视传 2401");
  await user.clear(input());
  await user.type(input(), "新班级");
  expect(changed).not.toHaveBeenCalled();
  await user.keyboard("{Escape}");
  expect(input()).toHaveValue("视传 2401");
  await user.clear(input());
  await user.type(input(), "未确认");
  await user.click(screen.getByText("外部操作"));
  expect(input()).toHaveValue("视传 2401");
  expect(changed).not.toHaveBeenCalled();
});

it("selects a filtered existing option and submits only its value", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<form aria-label="课程"><Combobox name="class" options={options} aria-label="教学班" onValueChange={changed} /></form>);
  await user.type(input(), "数媒");
  expect(await screen.findByRole("option", { name: "数媒 2401" })).toHaveAccessibleDescription("周一");
  await user.click(await screen.findByRole("option", { name: "数媒 2401" }));
  expect(changed).toHaveBeenCalledExactlyOnceWith("b", expect.objectContaining({ reason: "select", option: options[1] }));
  expect(input()).toHaveValue("数媒 2401");
  expect(new FormData(screen.getByRole("form") as HTMLFormElement).get("class")).toBe("b");
});

it("offers custom input only when enabled and commits it only through explicit selection", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  const { rerender } = render(<Combobox options={options} aria-label="教学班" onValueChange={changed} />);
  await user.type(input(), "新班级");
  expect(screen.queryByRole("option")).not.toBeInTheDocument();
  rerender(<Combobox options={options} allowCustomValue aria-label="教学班" onValueChange={changed} />);
  expect(changed).not.toHaveBeenCalled();
  await user.click(await screen.findByRole("option", { name: /使用此输入/ }));
  expect(changed).toHaveBeenCalledExactlyOnceWith("新班级", expect.objectContaining({ reason: "custom" }));
  expect(input()).toHaveValue("新班级");
});

it("does not select or submit when Enter finishes an IME composition", async () => {
  const user = userEvent.setup(), changed = vi.fn(), submitted = vi.fn(e => e.preventDefault());
  render(<form onSubmit={submitted}><Combobox options={options} allowCustomValue aria-label="教学班" onValueChange={changed} /></form>);
  await user.click(input());
  fireEvent.compositionStart(input());
  fireEvent.change(input(), { target: { value: "视传" } });
  fireEvent.keyDown(input(), { key: "Enter", code: "Enter", isComposing: true, keyCode: 229 });
  fireEvent.compositionEnd(input(), { data: "视传" });
  expect(changed).not.toHaveBeenCalled();
  expect(submitted).not.toHaveBeenCalled();
});

it("keeps controlled query, value and open independent and supports metadata backfills", async () => {
  const user = userEvent.setup(), query = vi.fn(), opened = vi.fn();
  const { rerender } = render(<Combobox options={options} value="remote" selectedOption={{ value: "remote", label: "远程班级" }} searchValue="服务器" filterOption={false} open onSearchValueChange={query} aria-label="教学班" />);
  expect(input()).toHaveValue("服务器");
  expect(screen.getAllByRole("option")).toHaveLength(3);
  await user.type(input(), "x");
  expect(query).toHaveBeenCalledWith("服务器x");
  expect(input()).toHaveValue("服务器");
  rerender(<Combobox options={options} value="remote" selectedOption={{ value: "remote", label: "远程班级" }} open={false} onOpenChange={opened} aria-label="教学班" />);
  expect(input()).toHaveValue("远程班级");
  await user.click(screen.getByRole("button", { name: "展开选项" }));
  await waitFor(() => expect(opened).toHaveBeenCalledWith(true));
  expect(input()).toHaveAttribute("aria-expanded", "false");
});

it("distinguishes numeric, string and empty-string option values", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<Combobox options={[{ value: 1, label: "数字" }, { value: "1", label: "字符串" }, { value: "", label: "空值选项" }]} onValueChange={changed} aria-label="类型" />);
  for (const [label, value] of [["数字", 1], ["字符串", "1"], ["空值选项", ""]] as const) {
    await user.click(input());
    await user.click(await screen.findByRole("option", { name: label }));
    expect(changed).toHaveBeenLastCalledWith(value, expect.objectContaining({ reason: "select" }));
    expect(input()).toHaveValue(label);
  }
});

it("keeps custom text distinct from an existing value with a different label", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<Combobox options={[{ value: "draft", label: "已有班级" }]} allowCustomValue filterOption={false} onValueChange={changed} aria-label="班级" />);
  await user.type(input(), "draft");
  expect(screen.getByRole("option", { name: "已有班级" })).toBeInTheDocument();
  await user.click(await screen.findByRole("option", { name: "使用此输入：draft" }));
  expect(changed).toHaveBeenLastCalledWith("draft", expect.objectContaining({ reason: "custom", option: { value: "draft", label: "draft" } }));
  expect(input()).toHaveValue("draft");
  await user.click(input());
  await user.click(await screen.findByRole("option", { name: "已有班级" }));
  expect(changed).toHaveBeenLastCalledWith("draft", expect.objectContaining({ reason: "select" }));
  expect(input()).toHaveValue("已有班级");
});

it("uses the FormItem label and status on the editable input, including inside labels", async () => {
  const user = userEvent.setup();
  render(<FormItem label="教学班" labelPosition="inside" required status="error" help="选择班级" message="请核对"><Combobox options={options} /></FormItem>);
  expect(input()).toHaveAccessibleName("教学班");
  expect(input()).toHaveAccessibleDescription("选择班级 请核对");
  expect(input()).toHaveAttribute("aria-invalid", "true");
  expect(input()).toBeRequired();
  await user.click(screen.getByText("教学班"));
  expect(input()).toHaveFocus();
  expect(document.querySelectorAll(`#${CSS.escape(input().id)}`)).toHaveLength(1);
});

it("preserves editing and clearing during loading or failure, with retry", async () => {
  const user = userEvent.setup(), changed = vi.fn(), retry = vi.fn();
  const { rerender } = render(<Combobox options={options} defaultValue="a" loading open aria-label="教学班" onValueChange={changed} />);
  expect(input()).toHaveValue("视传 2401");
  expect(screen.queryByRole("option")).not.toBeInTheDocument();
  rerender(<Combobox options={options} defaultValue="a" loadError="加载失败" onRetry={retry} open aria-label="教学班" onValueChange={changed} />);
  await user.click(screen.getByRole("button", { name: "重试" }));
  expect(retry).toHaveBeenCalledOnce();
  await user.click(screen.getByRole("button", { name: "清除教学班" }));
  expect(changed).toHaveBeenLastCalledWith(null, expect.objectContaining({ reason: "clear" }));
  expect(input()).toHaveValue("");
});

it.each(["readOnly", "disabled"] as const)("blocks mutation and closes the popup when %s", async permission => {
  const user = userEvent.setup(), changed = vi.fn(), opened = vi.fn();
  const { rerender } = render(<Combobox options={options} defaultValue="a" open onOpenChange={opened} aria-label="教学班" onValueChange={changed} />);
  rerender(<Combobox options={options} defaultValue="a" open onOpenChange={opened} aria-label="教学班" onValueChange={changed} {...{ [permission]: true }} />);
  await waitFor(() => expect(input()).toHaveAttribute("aria-expanded", "false"));
  expect(screen.queryByRole("button", { name: "清除教学班" })).not.toBeInTheDocument();
  await user.type(input(), "abc");
  expect(input()).toHaveValue("视传 2401");
  expect(changed).not.toHaveBeenCalled();
  expect(opened).toHaveBeenCalledWith(false);
});

it("navigates grouped results without selecting disabled options and commits only on Enter", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<Combobox options={[{ value: "a", label: "一", group: "组甲" }, { value: "b", label: "二", group: "组乙", disabled: true }, { value: "c", label: "三", group: "组甲" }]} aria-label="候选" onValueChange={changed} />);
  input().focus();
  await user.keyboard("{ArrowDown}{ArrowDown}");
  expect(changed).not.toHaveBeenCalled();
  await user.keyboard("{Enter}");
  expect(changed).toHaveBeenCalledExactlyOnceWith("c", expect.objectContaining({ reason: "select" }));
  expect(input()).toHaveValue("三");
  expect(input()).toHaveFocus();
});

it("keeps native required validation tied to selection and accepts a selected empty string", async () => {
  const user = userEvent.setup();
  render(<form aria-label="课程"><Combobox name="class" required aria-label="教学班" options={[{ value: "", label: "空值选项" }]} /></form>);
  const form = screen.getByRole("form") as HTMLFormElement;
  await user.type(input(), "没有匹配");
  expect(form.checkValidity()).toBe(false);
  await user.clear(input());
  await user.click(await screen.findByRole("option", { name: "空值选项" }));
  expect(form.checkValidity()).toBe(true);
  expect(new FormData(form).get("class")).toBe("");
});

it("restores an uncommitted query when the host closes the popup", async () => {
  const user = userEvent.setup();
  const { rerender } = render(<Combobox options={options} defaultValue="a" open aria-label="教学班" />);
  await user.clear(input());
  await user.type(input(), "未提交");
  rerender(<Combobox options={options} defaultValue="a" open={false} aria-label="教学班" />);
  expect(input()).toHaveValue("视传 2401");
});

it("emits the finished IME query once when a controlled host has not echoed it", async () => {
  const changed = vi.fn();
  render(<Combobox options={options} searchValue="" open aria-label="教学班" onSearchValueChange={changed} />);
  fireEvent.compositionStart(input());
  fireEvent.change(input(), { target: { value: "视传" } });
  fireEvent.compositionEnd(input(), { data: "视传" });
  fireEvent.change(input(), { target: { value: "视传" } });
  expect(changed).toHaveBeenCalledExactlyOnceWith("视传");
});

it("exposes clear to keyboard and assistive technology while open and honors rejected controlled clearing", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<Combobox options={options} value="a" open aria-label="教学班" onValueChange={changed} />);
  const clear = screen.getByRole("button", { name: "清除教学班" });
  input().focus();
  await user.tab();
  expect(clear).toHaveFocus();
  await user.keyboard("{Enter}");
  expect(changed).toHaveBeenCalledExactlyOnceWith(null, expect.objectContaining({ reason: "clear" }));
  expect(input()).toHaveValue("视传 2401");
});

it("reports one outside dismissal per interaction and leaves focus on the external control", async () => {
  const user = userEvent.setup(), opened = vi.fn();
  render(<><Combobox options={options} open onOpenChange={opened} aria-label="教学班" /><button>外部操作</button></>);
  await user.click(input());
  await user.click(screen.getByText("外部操作"));
  expect(opened).toHaveBeenCalledExactlyOnceWith(false);
  expect(screen.getByText("外部操作")).toHaveFocus();
});

it("backfills a custom selection without creating or committing another value", () => {
  const changed = vi.fn();
  const { rerender } = render(<Combobox options={[{ value: "draft", label: "已有班级" }]} value="draft" selectedOption={{ value: "draft", label: "draft" }} onValueChange={changed} aria-label="教学班" />);
  expect(input()).toHaveValue("draft");
  rerender(<Combobox options={[{ value: "saved", label: "新建班级" }]} value="saved" onValueChange={changed} aria-label="教学班" />);
  expect(input()).toHaveValue("新建班级");
  expect(changed).not.toHaveBeenCalled();
});

it("returns focus to the input when retry removes the error action", async () => {
  const user = userEvent.setup(), retry = vi.fn();
  const { rerender } = render(<Combobox options={options} loadError="暂时失败" onRetry={retry} aria-label="教学班" />);
  await user.click(input());
  await user.click(screen.getByRole("button", { name: "重试" }));
  rerender(<Combobox options={options} aria-label="教学班" />);
  expect(retry).toHaveBeenCalledOnce();
  expect(input()).toHaveFocus();
  await user.keyboard("{ArrowDown}{Enter}");
  expect(input()).toHaveValue("视传 2401");
});
