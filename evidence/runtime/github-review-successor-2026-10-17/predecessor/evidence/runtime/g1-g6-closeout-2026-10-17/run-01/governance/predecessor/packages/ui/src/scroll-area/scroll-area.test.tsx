import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ScrollArea } from "./scroll-area";

it("renders a focusable viewport and an explicit scrollbar", () => {
  render(
    <ScrollArea.Root data-testid="root">
      <ScrollArea.Viewport data-testid="viewport">
        <ScrollArea.Content><p>任务列表</p></ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar data-testid="scrollbar" orientation="vertical" keepMounted><ScrollArea.Thumb /></ScrollArea.Scrollbar>
    </ScrollArea.Root>,
  );

  expect(screen.getByTestId("root")).toHaveAttribute("data-rain-id", "ui-scroll-area");
  expect(screen.getByTestId("viewport")).toHaveAttribute("tabindex", "0");
  expect(screen.getByTestId("viewport")).toHaveTextContent("任务列表");
  expect(screen.getByTestId("scrollbar")).toHaveAttribute("data-orientation", "vertical");
});
