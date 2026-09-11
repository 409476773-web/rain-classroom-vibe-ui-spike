import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { App } from "../../app";

describe("Button Token review", () => {
  beforeEach(() => window.history.replaceState(null, "", "#button-tokens"));
  afterEach(() => {
    cleanup();
    window.history.replaceState(null, "", "#overview");
  });

  it("routes to the local review and applies theme, surface and density to the real buttons", async () => {
    const user = userEvent.setup();
    render(<App />);
    const page = screen.getByRole("main");
    expect(page).toHaveAttribute("data-asset-identity", "local-experiment");
    expect(screen.getByRole("heading", { level: 1, name: "按钮 Token 对照" })).toHaveAttribute("id", "button-token-review-title");
    await user.selectOptions(screen.getByRole("combobox", { name: "主题" }), "dark");
    await user.selectOptions(screen.getByRole("combobox", { name: "按钮所在底色" }), "page");
    await user.selectOptions(screen.getByRole("combobox", { name: "默认密度" }), "compact");
    expect(page).toHaveAttribute("data-rain-theme", "dark");
    expect(page).toHaveAttribute("data-review-surface", "page");
    const states = screen.getByRole("region", { name: "九组外观与状态" });
    expect(states.querySelector('button[data-variant="primary"]')).toHaveAttribute("data-size", "small");
    expect(states.querySelector('button[data-variant="text"]')).toHaveAttribute("data-size", "compact");
    const geometry = screen.getByRole("region", { name: "八档完整尺寸" });
    const buttons = within(geometry).getAllByRole("button");
    expect(buttons.map((button) => button.getAttribute("data-size")))
      .toEqual(["mini", "small", "medium", "large", "xl", "small", "compact", "regular"]);
  });

  it("provides all nine appearances while disabled and loading examples reject actions", () => {
    render(<App />);
    const states = screen.getByRole("region", { name: "九组外观与状态" });
    const rows = within(states).getAllByRole("row").slice(1);
    expect(rows).toHaveLength(9);
    for (const row of rows) {
      const [active, disabled, loading] = within(row).getAllByRole("button");
      expect(active).toHaveAttribute("data-rain-id", "ui-button");
      expect(disabled).toBeDisabled();
      expect(loading).toHaveAttribute("aria-busy", "true");
      fireEvent.click(active!);
      fireEvent.click(disabled!);
      fireEvent.click(loading!);
    }
    expect(screen.getByRole("status")).toHaveTextContent("已触发 9 次，仅本地演示。");
  });

  it("switches the same four icon combinations through loading and restores disclosure behavior", async () => {
    const user = userEvent.setup();
    render(<App />);
    const region = screen.getByRole("region", { name: "图标与加载前后" });
    const buttons = within(region).getAllByRole("button");
    expect(buttons).toHaveLength(8);
    const trailing = buttons.find((button) => button.getAttribute("aria-controls"))!;
    await user.click(trailing);
    expect(trailing).toHaveAttribute("aria-expanded", "true");
    const geometry = screen.getByRole("region", { name: "八档完整尺寸" });
    expect(within(geometry).getAllByRole("button")[0]).toHaveAttribute("aria-expanded", "false");
    expect(within(region).getByText("编辑选项已展开；带后箭头的按钮可展开或收起本区域。")).toBeVisible();
    const toggle = within(region).getByRole("checkbox", { name: "切换加载状态" });
    await user.click(toggle);
    for (const button of buttons) {
      expect(button).toHaveAttribute("aria-busy", "true");
      fireEvent.click(button);
    }
    expect(screen.getByRole("status")).toHaveTextContent("已触发 1 次");
    await user.click(toggle);
    await user.click(trailing);
    expect(trailing).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("status")).toHaveTextContent("已触发 2 次");
  });

  it("focuses the review heading when navigating by hash", () => {
    window.history.replaceState(null, "", "#overview");
    render(<App />);
    act(() => {
      window.history.pushState(null, "", "#button-tokens");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(screen.getByRole("heading", { level: 1, name: "按钮 Token 对照" })).toHaveFocus();
  });
});
