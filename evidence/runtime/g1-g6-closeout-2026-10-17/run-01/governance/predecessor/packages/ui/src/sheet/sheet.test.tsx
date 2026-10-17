import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { Sheet } from "./sheet";

it("opens as a modal side panel and restores focus to its trigger", async () => {
  const user = userEvent.setup();
  render(
    <Sheet.Root>
      <Sheet.Trigger>打开任务面板</Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.Backdrop />
        <Sheet.Content side="right" aria-label="任务面板">
          <Sheet.Title>任务面板</Sheet.Title>
          <Sheet.Close>关闭</Sheet.Close>
        </Sheet.Content>
      </Sheet.Portal>
    </Sheet.Root>,
  );

  const trigger = screen.getByRole("button", { name: "打开任务面板" });
  await user.click(trigger);
  expect(screen.getByRole("dialog", { name: "任务面板" })).toBeVisible();
  expect(screen.getByRole("dialog")).toHaveAttribute("data-side", "right");
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

it("composes a named header, keyboard scroll body and persistent footer", async () => {
  const user = userEvent.setup();
  render(<Sheet.Root><Sheet.Trigger>编辑资料</Sheet.Trigger><Sheet.Portal>
    <Sheet.Backdrop /><Sheet.Content>
      <Sheet.Header><Sheet.Title>编辑资料</Sheet.Title><Sheet.Description>补充阅读说明。</Sheet.Description><Sheet.Close>关闭面板</Sheet.Close></Sheet.Header>
      <Sheet.Body aria-label="资料表单"><label>资料名称<input defaultValue="阅读资料" /></label></Sheet.Body>
      <Sheet.Footer><Sheet.Close>取消编辑</Sheet.Close><button>保存修改</button></Sheet.Footer>
    </Sheet.Content>
  </Sheet.Portal></Sheet.Root>);
  const trigger = screen.getByRole("button", { name: "编辑资料" });
  await user.click(trigger);
  const dialog = screen.getByRole("dialog", { name: "编辑资料" });
  expect(dialog).toHaveAccessibleDescription("补充阅读说明。");
  expect(dialog.querySelector('[data-slot="header"]')).toContainElement(screen.getByRole("heading", { name: "编辑资料" }));
  expect(dialog.querySelector('[data-slot="body"]')).toHaveAttribute("tabindex", "0");
  expect(dialog.querySelector('[data-slot="footer"]')).toContainElement(screen.getByRole("button", { name: "保存修改" }));
  await user.click(screen.getByRole("button", { name: "取消编辑" }));
  expect(trigger).toHaveFocus();
});
