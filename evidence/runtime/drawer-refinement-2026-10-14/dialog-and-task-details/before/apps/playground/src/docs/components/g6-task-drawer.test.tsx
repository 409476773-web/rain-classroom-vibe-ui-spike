import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { G6InteractionPage } from "./g6-interaction-pages";

async function openTask() {
  const user = userEvent.setup();
  render(<G6InteractionPage component="drawer" />);
  await user.click(screen.getByRole("button", { name: "编辑课前任务" }));
  return { user, field: await screen.findByRole("textbox", { name: "任务标题" }) };
}

it("shows two native value choices and previews the draft in the same dialog", async () => {
  const { user, field } = await openTask();
  await user.clear(field); await user.type(field, "保留在预览中的草稿");
  await user.click(screen.getByRole("radio", { name: "小组讨论" }));
  await user.click(screen.getByRole("button", { name: "预览任务" }));
  expect(screen.getAllByRole("dialog")).toHaveLength(1);
  expect(screen.getByRole("dialog")).toHaveAccessibleName("保留在预览中的草稿");
  expect(screen.getByText("课前准备 · 小组讨论")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "返回编辑" }));
  expect(screen.getByRole("textbox", { name: "任务标题" })).toHaveValue("保留在预览中的草稿");
  expect(screen.getByRole("radio", { name: "小组讨论" })).toBeChecked();
  await waitFor(() => expect(screen.getByRole("button", { name: "预览任务" })).toHaveFocus());
});

it("protects cancellation and returns safe confirmation focus to its invoker", async () => {
  const { user, field } = await openTask();
  await user.type(field, "（草稿）");
  const cancel = screen.getByRole("button", { name: "取消" });
  await user.click(cancel);
  const choice = await screen.findByRole("alertdialog", { name: "放弃未保存的修改？" });
  const keep = within(choice).getByRole("button", { name: "继续编辑" });
  await waitFor(() => expect(keep).toHaveFocus());
  await user.click(keep);
  await waitFor(() => expect(cancel).toHaveFocus());
  expect(field).toHaveValue("找一个值得追问的问题（草稿）");
  await user.click(cancel);
  await user.click(await screen.findByRole("button", { name: "放弃修改" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  await waitFor(() => expect(screen.getByRole("button", { name: "编辑课前任务" })).toHaveFocus());
});

it("opens the same discard decision for Escape and the header close", async () => {
  const { user, field } = await openTask();
  await user.type(field, "未保存");
  await user.keyboard("{Escape}");
  expect(await screen.findByRole("alertdialog")).toHaveAccessibleName("放弃未保存的修改？");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
  await user.click(screen.getByRole("button", { name: "关闭编辑" }));
  expect(await screen.findByRole("alertdialog")).toHaveAccessibleName("放弃未保存的修改？");
});

it("continues editing from a preview exit decision with the draft and editing focus restored", async () => {
  const { user, field } = await openTask();
  await user.clear(field); await user.type(field, "从预览继续编辑的草稿");
  await user.click(screen.getByRole("button", { name: "预览任务" }));
  await user.click(screen.getByRole("button", { name: "关闭预览" }));
  const choice = await screen.findByRole("alertdialog");
  await user.click(within(choice).getByRole("button", { name: "继续编辑" }));
  await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
  expect(screen.getByRole("textbox", { name: "任务标题" })).toHaveValue("从预览继续编辑的草稿");
  await waitFor(() => expect(screen.getByRole("button", { name: "预览任务" })).toHaveFocus());
});

it("dismisses only the exit decision when its close icon is used from preview", async () => {
  const { user, field } = await openTask();
  await user.type(field, "保留预览");
  await user.click(screen.getByRole("button", { name: "预览任务" }));
  const closePreview = screen.getByRole("button", { name: "关闭预览" });
  await user.click(closePreview);
  await user.click(await screen.findByRole("button", { name: "关闭退出确认" }));
  await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
  expect(screen.getByRole("button", { name: "返回编辑" })).toBeInTheDocument();
  expect(screen.queryByRole("textbox", { name: "任务标题" })).toBeNull();
  await waitFor(() => expect(closePreview).toHaveFocus());
});

it("validates an empty title before saving and focuses the related control", async () => {
  const { user, field } = await openTask();
  await user.clear(field);
  await user.click(screen.getByRole("button", { name: "保存草稿" }));
  expect(field).toHaveAttribute("aria-invalid", "true");
  expect(field).toHaveFocus();
  expect(screen.getByText("请填写任务标题。", { exact: true })).toBeInTheDocument();
});

it("keeps a failed draft, blocks pending exits and retries the latest submitted values", async () => {
  const user = userEvent.setup();
  render(<G6InteractionPage component="drawer" />);
  await user.click(screen.getByRole("radio", { name: "首次保存失败" }));
  await user.click(screen.getByRole("button", { name: "编辑课前任务" }));
  const field = await screen.findByRole("textbox", { name: "任务标题" });
  await user.clear(field); await user.type(field, "失败后保留");
  await user.click(screen.getByRole("button", { name: "保存草稿" }));
  expect(field).toBeDisabled();
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("alertdialog")).toBeNull();
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(await screen.findByRole("alert")).toHaveTextContent("保存失败");
  expect(field).toHaveValue("失败后保留");
  await user.type(field, "并修改");
  await user.click(screen.getByRole("button", { name: "重试保存" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull(), { timeout: 2000 });
  expect(screen.getByTestId("drawer-saved-title")).toHaveTextContent("失败后保留并修改");
});

it("puts directional and record close actions in the header as named icon buttons", async () => {
  const user = userEvent.setup();
  render(<G6InteractionPage component="drawer" />);
  for (const side of ["底部", "顶部", "左侧", "右侧"]) {
    await user.click(screen.getByRole("button", { name: `从${side}打开` }));
    const dialog = await screen.findByRole("dialog");
    const close = within(dialog).getByRole("button", { name: `关闭${side}抽屉` });
    expect(close).toHaveAttribute("data-rain-id", "ui-icon-button");
    expect(close.closest('[data-slot="drawer-header"]')).not.toBeNull();
    expect(dialog.querySelector('[data-slot="drawer-footer"]')).toBeNull();
    await user.click(close);
  }
  await user.click(screen.getByRole("button", { name: "打开非模态记录" }));
  const close = within(await screen.findByRole("dialog")).getByRole("button", { name: "关闭课堂记录" });
  expect(close).toHaveAttribute("data-rain-id", "ui-icon-button");
  expect(close.closest('[data-slot="drawer-header"]')).not.toBeNull();
});
