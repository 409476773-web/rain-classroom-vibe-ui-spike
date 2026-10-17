import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Kbd } from "./kbd";

it("renders shortcut keys as assistive-friendly presentation", () => {
  render(<Kbd keys={["⌘", "K"]} aria-label="打开命令面板" />);
  expect(screen.getByRole("group", { name: "打开命令面板" })).toHaveTextContent("⌘K");
  expect(screen.getByText("⌘")).toHaveAttribute("data-key", "⌘");
});
