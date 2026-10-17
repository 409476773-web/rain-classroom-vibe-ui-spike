import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { Menubar } from "./menubar";

it("opens a menu with keyboard-friendly menu items", async () => {
  const user = userEvent.setup();
  render(
    <Menubar.Root aria-label="任务菜单">
      <Menubar.Menu>
        <Menubar.Trigger>操作</Menubar.Trigger>
        <Menubar.Positioner>
          <Menubar.Popup>
            <Menubar.Item>保存</Menubar.Item>
          </Menubar.Popup>
        </Menubar.Positioner>
      </Menubar.Menu>
    </Menubar.Root>,
  );

  const trigger = screen.getByRole("menuitem", { name: "操作" });
  trigger.focus();
  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("menuitem", { name: "保存" })).toBeVisible();
});
