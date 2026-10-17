import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { NavigationMenu } from "./navigation-menu";

it("opens a navigation branch and exposes its active link", async () => {
  const user = userEvent.setup();
  render(
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>课程</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#courses" active>课程列表</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>,
  );

  await user.click(screen.getByRole("button", { name: "课程" }));
  expect(screen.getByRole("link", { name: "课程列表" })).toHaveAttribute("aria-current", "page");
});
