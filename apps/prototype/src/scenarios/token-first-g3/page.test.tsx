import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { TokenFirstG3Page } from "./page";

test("G3 workbench consumes all ten shared component contracts", () => {
  const { container } = render(<TokenFirstG3Page />);

  for (const id of ["ui-sidebar", "ui-breadcrumb", "ui-navigation-menu", "ui-menubar", "ui-command", "ui-scroll-area", "ui-hover-card", "ui-context-menu", "ui-kbd"]) {
    expect(container.querySelector(`[data-rain-id="${id}"]`)).toBeInTheDocument();
  }
  expect(container.querySelector('[data-rain-id="ui-sheet"]')).toBeInTheDocument();
});

test("G3 command execution and visual direction switch remain observable", async () => {
  const user = userEvent.setup();
  render(<TokenFirstG3Page />);

  await user.click(screen.getByRole("button", { name: "密度型" }));
  expect(screen.getByRole("main")).toHaveAttribute("data-direction", "density");
  const input = screen.getByRole("combobox", { name: "搜索命令，例如：打开任务详情" });
  await user.type(input, "打开任务详情");
  await user.keyboard("{Enter}");
  expect(screen.getByText("已打开任务详情", { selector: ".g3-live-status" })).toBeVisible();
});
