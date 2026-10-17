import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { ContextMenu } from "./context-menu";

it("opens from the context-menu gesture and runs an item", async () => {
  const user = userEvent.setup();
  const onSelect = vi.fn();
  render(
    <ContextMenu.Root>
      <ContextMenu.Trigger data-testid="target">题目内容</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner>
          <ContextMenu.Popup>
            <ContextMenu.Item onClick={onSelect}>标记复核</ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>,
  );

  await user.pointer([{ target: screen.getByTestId("target"), keys: "[MouseRight]" }]);
  const item = await screen.findByRole("menuitem", { name: "标记复核" });
  await user.click(item);
  expect(onSelect).toHaveBeenCalledTimes(1);
});

it("opens from Shift+F10 and ContextMenu keys, preserves the host key handler, and restores focus", async () => {
  const user = userEvent.setup(), onKeyDown = vi.fn();
  render(<ContextMenu.Root><ContextMenu.Trigger tabIndex={0} onKeyDown={onKeyDown}>键盘目标</ContextMenu.Trigger><ContextMenu.Portal><ContextMenu.Positioner><ContextMenu.Popup><ContextMenu.Item>标记复核</ContextMenu.Item></ContextMenu.Popup></ContextMenu.Positioner></ContextMenu.Portal></ContextMenu.Root>);
  const trigger = screen.getByText("键盘目标");
  trigger.focus();
  await user.keyboard("{Shift>}{F10}{/Shift}");
  expect(await screen.findByRole("menuitem", { name: "标记复核" })).toBeVisible();
  expect(onKeyDown).toHaveBeenCalled();
  await user.keyboard("{Escape}");
  await waitFor(() => expect(trigger).toHaveFocus());
  await user.keyboard("{ContextMenu}");
  expect(await screen.findByRole("menuitem", { name: "标记复核" })).toBeVisible();
});

it("respects canceled host keys and disabled roots without opening a keyboard menu", async () => {
  const user = userEvent.setup();
  const menu = <ContextMenu.Portal><ContextMenu.Positioner><ContextMenu.Popup><ContextMenu.Item>标记复核</ContextMenu.Item></ContextMenu.Popup></ContextMenu.Positioner></ContextMenu.Portal>;
  const { rerender } = render(<ContextMenu.Root><ContextMenu.Trigger tabIndex={0} onKeyDown={event => event.preventDefault()}>键盘目标</ContextMenu.Trigger>{menu}</ContextMenu.Root>);
  screen.getByText("键盘目标").focus();
  await user.keyboard("{Shift>}{F10}{/Shift}");
  expect(screen.queryByRole("menuitem")).toBeNull();
  rerender(<ContextMenu.Root disabled><ContextMenu.Trigger tabIndex={0}>键盘目标</ContextMenu.Trigger>{menu}</ContextMenu.Root>);
  screen.getByText("键盘目标").focus();
  await user.keyboard("{ContextMenu}");
  expect(screen.queryByRole("menuitem")).toBeNull();
});
