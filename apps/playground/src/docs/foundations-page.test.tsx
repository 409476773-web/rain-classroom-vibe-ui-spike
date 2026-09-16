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

  it("explains the three-layer color model without exposing reference tokens as app APIs", () => {
    const { container } = render(createElement(FoundationsPage));
    const layers = [...container.querySelectorAll('[data-slot="color-layer"]')];

    expect(layers).toHaveLength(3);
    expect(layers.map((layer) => layer.textContent)).toEqual([
      expect.stringContaining("Reference Palette"),
      expect.stringContaining("Semantic Roles"),
      expect.stringContaining("Component Tokens"),
    ]);
    expect(container.innerHTML).not.toContain("--rain-ref-");
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
        "原生夹具，仅验证 Density 与 Focus；不代表 Day 3 Input / Button 最终外观。",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Input Focus 候选延续原稿的 1px 品牌边框、浅蓝表面和轻量外环。",
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
