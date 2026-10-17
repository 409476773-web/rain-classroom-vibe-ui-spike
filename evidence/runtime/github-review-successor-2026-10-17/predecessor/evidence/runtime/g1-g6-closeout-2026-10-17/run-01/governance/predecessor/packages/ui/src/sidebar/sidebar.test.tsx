import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { Sidebar, SidebarContent, SidebarItem, SidebarTrigger } from "./sidebar";

it("keeps navigation semantics while toggling its collapsed state", async () => {
  const user = userEvent.setup();
  render(
    <Sidebar defaultCollapsed={false} aria-label="课程导航">
      <SidebarTrigger aria-label="折叠导航" />
      <SidebarContent>
        <SidebarItem href="#overview" active>总览</SidebarItem>
      </SidebarContent>
    </Sidebar>,
  );

  const nav = screen.getByRole("navigation", { name: "课程导航" });
  expect(nav).toHaveAttribute("data-collapsed", "false");
  expect(screen.getByRole("link", { name: "总览" })).toHaveAttribute("aria-current", "page");
  await user.click(screen.getByRole("button", { name: "折叠导航" }));
  expect(nav).toHaveAttribute("data-collapsed", "true");
});
