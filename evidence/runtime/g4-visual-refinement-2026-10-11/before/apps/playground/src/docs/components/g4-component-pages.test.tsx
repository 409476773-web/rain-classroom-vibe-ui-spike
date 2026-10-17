import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "../../app";
import { componentDocEntries } from "./component-catalog";

afterEach(() => { cleanup(); window.location.hash = ""; });

describe("G4 component documentation", () => {
  it.each(["typography", "item", "progress"])("makes %s discoverable through the existing catalog", id => {
    expect(componentDocEntries.some(entry => entry.id === id)).toBe(true);
  });

  it("keeps a content item action separate from navigation", async () => {
    window.location.hash = "#item";
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: "Item 内容条目" }, { timeout: 5000 });
    const button = screen.getByRole("button", { name: "设为重点" });
    fireEvent.click(button);
    expect(screen.getByRole("button", { name: "取消重点" })).toHaveAttribute("aria-pressed", "true");
    expect(window.location.hash).toBe("#item");
    expect(screen.getByRole("link", { name: /查看文字排版规范/ })).toHaveAttribute("href", "#typography");
  });

  it("updates progress only through a host action and leaves unknown progress without a percentage", async () => {
    window.location.hash = "#progress";
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: "Progress 任务进度" }, { timeout: 5000 });
    const bar = screen.getByRole("progressbar", { name: "资料同步" });
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    fireEvent.click(screen.getByRole("button", { name: "完成下一批" }));
    expect(bar).toHaveAttribute("aria-valuenow", "60");
    expect(screen.getByRole("progressbar", { name: "正在解析资料" })).not.toHaveAttribute("aria-valuenow");
    expect(screen.getByRole("progressbar", { name: "批改任务" })).toHaveAttribute("aria-valuemax", "24");
  });

  it("uses existing typography roles and keeps the Chinese unit outside the data font", async () => {
    window.location.hash = "#typography";
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: "Typography 文字排版" }, { timeout: 5000 });
    const statistic = document.querySelector('[data-slot="typography-data-example"]')!;
    expect(statistic.querySelector('[data-slot="value"]')).toHaveClass("rain-type-data-default");
    expect(statistic.querySelector('[data-slot="unit"]')).toHaveClass("rain-type-ui-default");
    expect(statistic.querySelector('[data-slot="unit"]')).toHaveTextContent("分");
    expect(screen.getByRole("article", { name: "课程导读示例" })).toHaveClass("rain-type-reading-default");
  });
});
