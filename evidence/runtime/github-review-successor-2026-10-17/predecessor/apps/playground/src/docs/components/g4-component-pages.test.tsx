import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { parseSync } from "vite";
import { App } from "../../app";
import { componentDocEntries } from "./component-catalog";

afterEach(() => { cleanup(); window.location.hash = ""; });

describe("G4 component documentation", () => {
  it.each(["typography", "item", "progress"])("makes %s discoverable through the existing catalog", id => {
    expect(componentDocEntries.some(entry => entry.id === id)).toBe(true);
  });

  it.each(["typography", "item", "progress"])("keeps copied %s examples valid TSX and separates CSS", async id => {
    window.location.hash = `#${id}`;
    render(<App />);
    await screen.findByRole("heading", { level: 1 }, { timeout: 5000 });
    const examples = [...document.querySelectorAll(".component-doc__code code")];
    expect(examples.length).toBeGreaterThan(1);
    for (const example of examples) {
      const code = example.textContent!;
      if (code.includes('.unknown-task > [data-slot="progress-track"]')) {
        expect(example.closest("details")?.querySelectorAll(".component-doc__code")).toHaveLength(2);
        continue;
      }
      expect(parseSync(`${id}-example.tsx`, code).errors).toEqual([]);
    }
  });

  it("keeps a content item action separate from navigation", async () => {
    window.location.hash = "#item";
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: "Item 内容条目" }, { timeout: 5000 });
    fireEvent.click(screen.getByRole("button", { name: "阅读课程导读" }));
    const dialog = screen.getByRole("dialog", { name: "课程导读：从问题到证据" });
    expect(window.location.hash).toBe("#item");
    fireEvent.click(within(dialog).getByRole("button", { name: "返回列表" }));
    expect(screen.getByRole("link", { name: /文字排版规范/ })).toHaveAttribute("href", "#typography");
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

  it("offers readable course materials, matching downloads and an unavailable item", async () => {
    window.location.hash = "#item";
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: "Item 内容条目" }, { timeout: 5000 });
    const list = screen.getByRole("list", { name: "本讲课程资料" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
    const download = within(list).getByRole("link", { name: "下载课程导读" });
    expect(download).toHaveAttribute("download", "课程导读.md");
    expect(decodeURIComponent(download.getAttribute("href")!)).toContain("从问题到证据");
    expect(within(list).getByRole("button", { name: "课堂讨论任务尚未开放" })).toBeDisabled();
    fireEvent.click(within(list).getByRole("button", { name: "阅读课程导读" }));
    const dialog = screen.getByRole("dialog", { name: "课程导读：从问题到证据" });
    expect(within(dialog).getByText(/先描述你观察到的现象/)).toBeVisible();
    fireEvent.click(within(dialog).getByRole("button", { name: "标记已读" }));
    expect(within(list).getByText("已读")).toBeVisible();
    expect(window.location.hash).toBe("#item");
  });

  it("promotes recovery inside a failed task while keeping demo controls outside", async () => {
    window.location.hash = "#progress";
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: "Progress 任务进度" }, { timeout: 5000 });
    const task = screen.getByRole("region", { name: "资料同步任务" });
    expect(within(task).queryByRole("button", { name: "模拟失败" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "模拟失败" }));
    expect(within(task).getByRole("button", { name: "重试同步" })).toBeVisible();
    expect(within(task).queryByRole("button", { name: "暂停同步" })).not.toBeInTheDocument();
    expect(within(task).getByRole("progressbar", { name: "资料同步" })).toHaveAttribute("aria-valuenow", "40");
    fireEvent.click(within(task).getByRole("button", { name: "重试同步" }));
    expect(within(task).getByRole("button", { name: "暂停同步" })).toBeVisible();
  });
});
