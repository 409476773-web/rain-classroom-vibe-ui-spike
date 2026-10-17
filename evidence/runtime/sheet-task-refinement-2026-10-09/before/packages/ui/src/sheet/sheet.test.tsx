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
