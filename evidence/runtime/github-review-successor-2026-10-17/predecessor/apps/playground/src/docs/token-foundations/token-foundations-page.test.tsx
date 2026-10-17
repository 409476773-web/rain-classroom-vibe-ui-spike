import { fireEvent, render, screen } from "@testing-library/react";
import { createElement } from "react";
import { expect, it } from "vitest";
import { TokenFoundationsPage } from "./token-foundations-page";

it("offers approved geometry without changing the divider Recipe", () => {
  const { container } = render(createElement(TokenFoundationsPage));
  expect(screen.getByRole("heading", { name: "Token 基础建设" })).toBeVisible();
  expect(screen.getByText(/排版、线条、圆角与间距的页面视觉已于 2026-09-12 确认/)).toHaveTextContent("本次确认不代表 Foundations 整体验收完成");
  expect(screen.getByRole("link", { name: "返回 Foundations" })).toHaveAttribute("href", "#foundations");
  fireEvent.change(screen.getByRole("combobox", { name: "线条粗细" }), { target: { value: "4" } });
  fireEvent.change(screen.getByRole("combobox", { name: "线型" }), { target: { value: "dashed" } });
  expect(container.querySelector('[data-slot="line-border-sample"]')).toHaveClass("border-rain-line-4", "border-dashed", "border-rain-border-default");
  const divider = container.querySelector('[data-local-recipe="line-v1-content-divider"]');
  expect(divider).toHaveClass("h-rain-line-1", "w-full", "flex-none", "bg-rain-border-subtle");
  expect(divider).toHaveAttribute("aria-hidden", "true");
  expect(screen.getByRole("list", { name: "圆角选择" }).children).toHaveLength(7);
  expect(screen.getByRole("list", { name: "间距选择" }).children).toHaveLength(16);
});
