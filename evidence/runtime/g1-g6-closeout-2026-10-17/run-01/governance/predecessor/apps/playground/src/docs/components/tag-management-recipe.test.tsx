import { useState } from "react";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Tag } from "@rain-next/ui";
import { TagManagementRecipe, type TagDefinition, type TagDraft, type TagManagementRecipeProps } from "./tag-management-recipe";

const initial: TagDefinition[] = [
  { id: "review", name: "期末复习", color: "paper" },
  { id: "key", name: "重点内容", color: "purple" },
  { id: "english", name: "Review", color: "gold" },
];
function Harness({ create, update, changed = () => {} }: {
  create?: TagManagementRecipeProps["onCreate"]; update?: TagManagementRecipeProps["onUpdate"]; changed?: (value: string[]) => void;
}) {
  const [definitions, setDefinitions] = useState(initial), [value, setValue] = useState(["review"]);
  return <><TagManagementRecipe label="资料标签" theme="dark" definitions={definitions} value={value}
    onValueChange={(next) => { changed(next); setValue(next); }}
    onCreate={async (draft, signal) => {
      const result = create ? await create(draft, signal) : { id: "created", ...draft };
      if (!signal.aborted) setDefinitions((items) => [...items, result]);
      return result;
    }}
    onUpdate={async (draft, signal) => {
      const result = update ? await update(draft, signal) : draft;
      if (!signal.aborted) setDefinitions((items) => items.map((item) => item.id === result.id ? result : item));
      return result;
    }} />
    <section aria-label="另一份资料">{definitions.filter((item) => item.id === "review").map((item) => <Tag key={item.id} color={item.color}>{item.name}</Tag>)}</section>
    <button type="button">下一项操作</button></>;
}
const trigger = () => screen.getByRole("button", { name: "设置资料标签" });
const currentTags = () => screen.getByRole("group", { name: "当前资料标签" });
async function open(user: ReturnType<typeof userEvent.setup>) { await user.click(trigger()); return screen.findByRole("dialog"); }
async function createForm(user: ReturnType<typeof userEvent.setup>, name = "新知识点") {
  await open(user); await user.click(screen.getByRole("button", { name: "创建标签" }));
  await user.type(screen.getByRole("textbox", { name: "标签名称" }), name);
}

it("updates checked associations immediately, keeps hidden selections, and unlinks without deleting definitions", async () => {
  const user = userEvent.setup(); render(<Harness />);
  expect(trigger()).toHaveTextContent("设置标签");
  const panel = await open(user);
  expect(screen.getByRole("button", { name: "关闭标签面板" })).toHaveAttribute("data-rain-id", "ui-icon-button");
  expect(panel.closest("[data-rain-theme]")).toHaveAttribute("data-rain-theme", "dark");
  expect(screen.getByRole("textbox", { name: "搜索标签" })).toHaveFocus();
  await user.click(screen.getByRole("checkbox", { name: "重点内容" }));
  expect(currentTags()).toHaveTextContent("重点内容");
  await user.type(screen.getByRole("textbox", { name: "搜索标签" }), "重点");
  expect(screen.queryByRole("checkbox", { name: "期末复习" })).toBeNull();
  expect(currentTags()).toHaveTextContent("期末复习");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(trigger()).toHaveFocus());
  await user.click(within(currentTags()).getByRole("button", { name: "移除标签 期末复习" }));
  expect(trigger()).toHaveFocus();
  expect(currentTags()).not.toHaveTextContent("期末复习");
  await open(user); await user.clear(screen.getByRole("textbox", { name: "搜索标签" }));
  expect(screen.getByRole("checkbox", { name: "期末复习" })).not.toBeChecked();
  expect(screen.getByRole("region", { name: "另一份资料" })).toHaveTextContent("期末复习");
});

it("offers all twenty source colors and creates the trimmed name using the returned stable ID", async () => {
  const user = userEvent.setup(), create = vi.fn(async (draft: TagDraft) => ({ ...draft, id: "server-57" }));
  render(<Harness create={create} />); await createForm(user, "  新知识点  ");
  expect(screen.getAllByRole("radio")).toHaveLength(20);
  await user.click(screen.getByRole("radio", { name: "蓝紫" }));
  await user.click(screen.getByRole("button", { name: "创建并选中" }));
  await screen.findByRole("checkbox", { name: "新知识点" });
  expect(create).toHaveBeenCalledExactlyOnceWith({ name: "新知识点", color: "purple" }, expect.any(AbortSignal));
  expect(screen.getByRole("checkbox", { name: "新知识点" })).toBeChecked();
  expect(currentTags()).toHaveTextContent("新知识点");
  expect(screen.getByRole("textbox", { name: "搜索标签" })).toHaveFocus();
});

it("rejects empty and case-insensitive duplicate names and keeps composing Enter from submitting", async () => {
  const user = userEvent.setup(), create = vi.fn(); render(<Harness create={create} />); await createForm(user, " ");
  await user.click(screen.getByRole("button", { name: "创建并选中" }));
  expect(screen.getByRole("alert")).toHaveTextContent("请输入标签名称");
  const input = screen.getByRole("textbox", { name: "标签名称" });
  await user.clear(input); await user.type(input, " review ");
  await user.click(screen.getByRole("button", { name: "创建并选中" }));
  expect(screen.getByRole("alert")).toHaveTextContent("已有同名标签");
  await user.clear(input); await user.type(input, "中文输入");
  fireEvent.keyDown(input, { key: "Enter", isComposing: true });
  fireEvent.keyDown(input, { key: "Enter", keyCode: 229 });
  expect(create).not.toHaveBeenCalled();
});

it("retains failed input and color, locks duplicate submission, then retries", async () => {
  const user = userEvent.setup(); let reject!: (error: Error) => void;
  const create = vi.fn<TagManagementRecipeProps["onCreate"]>()
    .mockImplementationOnce(() => new Promise((_resolve, fail) => { reject = fail; }))
    .mockImplementationOnce(async (draft) => ({ id: "retry", ...draft }));
  render(<Harness create={create} />); await createForm(user, "错题整理");
  await user.click(screen.getByRole("radio", { name: "朱红" }));
  await user.click(screen.getByRole("button", { name: "创建并选中" }));
  fireEvent.submit(screen.getByRole("textbox", { name: "标签名称" }).closest("form")!);
  expect(create).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("textbox", { name: "标签名称" })).toBeDisabled();
  expect(screen.getByRole("radio", { name: "朱红" })).toBeDisabled();
  await act(async () => reject(new Error("暂时无法保存，请重试。")));
  expect(screen.getByRole("alert")).toHaveTextContent("暂时无法保存");
  expect(screen.getByRole("textbox", { name: "标签名称" })).toHaveValue("错题整理");
  expect(screen.getByRole("radio", { name: "朱红" })).toBeChecked();
  await user.click(screen.getByRole("button", { name: "创建并选中" }));
  expect(await screen.findByRole("checkbox", { name: "错题整理" })).toBeChecked();
  expect(create).toHaveBeenCalledTimes(2);
});

it("edits a definition by ID, updates every reference, and returns focus to its management action", async () => {
  const user = userEvent.setup(), update = vi.fn(async (definition: TagDefinition) => definition);
  render(<Harness update={update} />); await open(user);
  await user.click(screen.getByRole("button", { name: "管理标签" }));
  await user.click(screen.getByRole("button", { name: "编辑期末复习" }));
  const input = screen.getByRole("textbox", { name: "标签名称" });
  expect(input).toHaveFocus(); await user.clear(input); await user.type(input, "巩固复习");
  await user.click(screen.getByRole("radio", { name: "暖橙" }));
  await user.click(screen.getByRole("button", { name: "保存修改" }));
  await waitFor(() => expect(screen.getByRole("button", { name: "编辑巩固复习" })).toHaveFocus());
  expect(update).toHaveBeenCalledExactlyOnceWith({ id: "review", name: "巩固复习", color: "courseware" }, expect.any(AbortSignal));
  expect(currentTags()).toHaveTextContent("巩固复习");
  expect(screen.getByRole("region", { name: "另一份资料" })).toHaveTextContent("巩固复习");
  expect(within(currentTags()).getByText("巩固复习").closest("[data-color]")).toHaveAttribute("data-color", "courseware");
});

it("does not reopen or steal focus when saving completes after the panel closes", async () => {
  const user = userEvent.setup(); let finish!: (definition: TagDefinition) => void;
  render(<Harness create={() => new Promise((resolve) => { finish = resolve; })} />); await createForm(user);
  await user.click(screen.getByRole("button", { name: "创建并选中" }));
  await user.click(screen.getByRole("button", { name: "关闭标签面板" }));
  const next = screen.getByRole("button", { name: "下一项操作" }); await user.click(next);
  await act(async () => finish({ id: "late", name: "新知识点", color: "purple" }));
  expect(screen.queryByRole("dialog")).toBeNull(); expect(next).toHaveFocus();
  expect(currentTags()).toHaveTextContent("新知识点");
});

it("aborts an unmounted request and ignores its late association update", async () => {
  const user = userEvent.setup(), changed = vi.fn(); let finish!: (definition: TagDefinition) => void;
  const create = vi.fn<TagManagementRecipeProps["onCreate"]>(() => new Promise((resolve) => { finish = resolve; }));
  const view = render(<Harness create={create} changed={changed} />); await createForm(user);
  await user.click(screen.getByRole("button", { name: "创建并选中" })); view.unmount();
  expect(create.mock.calls[0]![1].aborted).toBe(true);
  await act(async () => finish({ id: "late", name: "新知识点", color: "purple" }));
  expect(changed).not.toHaveBeenCalled();
});
