import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { FoundationsPage } from "./foundations-page";

describe("FoundationsPage", () => {
  it("provides one programmatically focusable page title and a plain-text return link", () => {
    render(createElement(FoundationsPage));

    const title = screen.getByRole("heading", {
      level: 1,
      name: "Foundations，先让系统说同一种语言",
    });
    const returnLink = screen.getByRole("link", { name: "返回 Playground" });
    expect(title).toHaveAttribute("id", "foundations-title");
    expect(title).toHaveAttribute("tabindex", "-1");
    expect(returnLink).toHaveAttribute("href", "#overview");
    expect(returnLink.textContent?.trim()).toBe("返回 Playground");
    expect(screen.getByRole("link", { name: "查看 Token 目录与完整排版方案" }))
      .toHaveAttribute("href", "#token-foundations");
  });

  it("keeps the key Data value and its Chinese unit in different font-role nodes", () => {
    render(createElement(FoundationsPage));

    const value = screen.getByText("98.6");
    const unit = screen.getByText("分");
    expect(value).not.toBe(unit);
    expect(value).toHaveAttribute("data-slot", "statistic-value");
    expect(value).toHaveClass("rain-type-data");
    expect(unit).toHaveAttribute("data-slot", "statistic-unit");
    expect(unit).toHaveClass("rain-type-ui");
  });

  it("renders all three focus semantics as keyboard-focusable fixtures", () => {
    render(createElement(FoundationsPage));

    for (const role of ["control", "item", "danger"] as const) {
      expect(screen.getByTestId(`focus-${role}`)).toHaveAttribute(
        "data-focus",
        role,
      );
      expect(screen.getByTestId(`focus-${role}`)).not.toHaveAttribute(
        "tabindex",
        "-1",
      );
    }
  });

  it("distinguishes public categories and semantic aliases from private color sources", () => {
    const { container } = render(createElement(FoundationsPage));
    const layers = [...container.querySelectorAll('[data-slot="color-layer"]')];

    expect(layers).toHaveLength(3);
    expect(layers.map((layer) => layer.textContent)).toEqual([
      expect.stringContaining("Reference Palette"),
      expect.stringContaining("Public Category"),
      expect.stringContaining("Semantic / Component"),
    ]);
    expect(container.innerHTML).not.toContain("--rain-ref-");
  });

  it("shows confirmed color sources and separates primary action text from fill", () => {
    const { container } = render(createElement(FoundationsPage));

    expect(container.querySelectorAll('[data-slot="semantic-token-source"]')).toHaveLength(17);
    for (const role of ["control", "item", "danger"]) {
      expect(container.querySelector(`[data-rain-id="foundation-token-focus-${role}"]`)).toHaveTextContent("Border/Brand/1");
    }
    expect(container.querySelector('[data-rain-id="foundation-token-action-primary"]'))
      .toHaveTextContent("填充：Fill/Brand/Solid/2 · 文字：Text/Brand/1");
    expect(screen.getByText("主要操作文字")).toHaveClass("text-rain-action-primary");
    expect(container.querySelector('[data-rain-id="foundation-token-text-primary"]'))
      .toHaveTextContent("保留原定义");
  });

  it("marks native Input and Button examples as fixture-only", () => {
    render(createElement(FoundationsPage));

    for (const density of ["Compact", "Default"] as const) {
      const input = screen.getByRole("textbox", {
        name: `${density} 课程名称`,
      });
      const button = screen.getAllByRole("button", { name: "保存草稿" })[
        density === "Compact" ? 0 : 1
      ];
      expect(input).toHaveAttribute("data-asset-identity", "fixture-only");
      expect(input).toHaveAttribute(
        "aria-describedby",
        "foundation-native-fixture-boundary",
      );
      expect(button).toHaveAttribute("data-asset-identity", "fixture-only");
      expect(button).toHaveAttribute(
        "aria-describedby",
        "foundation-native-fixture-boundary",
      );
    }
    expect(
      screen.getByText(
        "原生示例用于比较 Density 与 Focus；实际 Input / Button 的外观见组件目录。",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Input Focus 已接入统一品牌细环与浅色外圈，保留浅蓝表面；其他状态的完整 Token 迁移另行推进。",
      ),
    ).toBeVisible();
  });

  it("renders region, feedback and overlay motion fixtures", () => {
    render(createElement(FoundationsPage));

    for (const role of ["region", "feedback", "overlay"] as const) {
      expect(screen.getByTestId(`motion-${role}`)).toHaveAttribute(
        "data-motion",
        role,
      );
    }
  });

  it("makes the Feedback fixture keyboard-triggerable", () => {
    render(createElement(FoundationsPage));

    expect(screen.getByTestId("motion-feedback")).toHaveAttribute(
      "tabindex",
      "0",
    );
  });
});
