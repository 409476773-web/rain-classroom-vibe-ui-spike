import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CoreUiPage } from "./core-ui-page";

describe("CoreUiPage", () => {
  it("documents eight families with field previews and Alert and Tabs detail entries", () => {
    const { container } = render(<CoreUiPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Core UI，把高频动作先做准" })).toHaveAttribute(
      "id",
      "core-ui-title",
    );
    const page = container.querySelector('[data-rain-id="core-ui-page"]');
    expect(page).toHaveAttribute("data-asset-identity", "local-experiment");
    expect(page).toHaveAttribute("data-maturity", "prototype-ready");
    expect(container.querySelectorAll('[data-slot="component-family"]')).toHaveLength(8);
    expect(screen.getByRole("link", { name: "查看 Alert 全部用法" })).toHaveAttribute("href", "#alert");
    expect(screen.getByRole("link", { name: "查看 InputNumber 全部用法" })).toHaveAttribute("href", "#input-number");
    expect(screen.getByRole('link', { name: '查看 Tabs 全部用法' })).toHaveAttribute('href', '#tabs');
    expect(container.querySelectorAll('[data-slot="family-contract"]')).toHaveLength(3);
    expect(screen.getAllByText("prototype-ready")).toHaveLength(4);
    expect(screen.getAllByText("registry-candidate")).toHaveLength(1);
  });

  it("uses plain-language contracts for every family", () => {
    render(<CoreUiPage />);
    for (const label of [
      "适合用在",
      "不适合",
      "外观与状态",
      "密度",
      "结构",
      "无障碍",
      "参考成熟库",
      "Rain 来源",
      "修改边界",
    ]) {
      expect(screen.getAllByText(label)).toHaveLength(3);
    }
  });

  it("shows the complete confirmed Button matrix for designer review", () => {
    const { container } = render(<CoreUiPage />);
    const buttonFamily = container.querySelector('[data-rain-id="core-ui-button"]');
    expect(buttonFamily).not.toBeNull();

    for (const demo of [
      "hierarchy",
      "sizes",
      "danger",
      "loading",
      "disabled",
      "focus-states",
      "width-and-label",
    ]) {
      expect(
        buttonFamily?.querySelector(`[data-button-demo="${demo}"]`),
      ).toBeInTheDocument();
    }

    for (const size of ["mini", "small", "medium", "large", "xl"]) {
      expect(
        buttonFamily?.querySelector(`[data-rain-id="ui-button"][data-size="${size}"]`),
      ).toBeInTheDocument();
    }

    expect(within(buttonFamily as HTMLElement).getByRole("button", { name: "保存草稿" }))
      .toHaveAttribute("data-variant", "tertiary");
    expect(within(buttonFamily as HTMLElement).getByRole("button", { name: "删除课程" }))
      .toHaveAttribute("data-variant", "tertiary");
    expect(within(buttonFamily as HTMLElement).getByRole("button", { name: "确认永久删除" }))
      .toHaveAttribute("data-variant", "primary");
    expect(
      buttonFamily?.querySelector('[data-rain-id="ui-button"][data-block="true"]'),
    ).toBeInTheDocument();
  });

  it("provides one live preview and one detail entry for each field family", async () => {
    const user = userEvent.setup();
    const { container } = render(<CoreUiPage />);
    const inputFamily = container.querySelector('[data-rain-id="core-ui-input"]') as HTMLElement;
    const selectFamily = container.querySelector('[data-rain-id="core-ui-select"]') as HTMLElement;
    expect(inputFamily.querySelectorAll('[data-rain-id="ui-input"]')).toHaveLength(1);
    expect(selectFamily).not.toBeNull();
    expect(selectFamily.querySelectorAll('[data-rain-id="ui-select"]')).toHaveLength(1);
    expect(within(inputFamily).getAllByRole("link")).toHaveLength(1);
    expect(within(inputFamily).getByRole("link")).toHaveAttribute("href", "#input");
    expect(within(selectFamily).getAllByRole("link")).toHaveLength(1);
    expect(within(selectFamily).getByRole("link")).toHaveAttribute("href", "#select");
    const input = within(inputFamily).getByRole("textbox", { name: "课程名称" });
    const root = input.closest('[data-rain-id="ui-input"]');
    expect(root?.querySelector("label")).toBeNull();
    expect(root?.querySelector('[data-slot="message"]')).toBeNull();
    await user.clear(input);
    await user.type(input, "更新课程");
    expect(input).toHaveValue("更新课程");
    const select = within(selectFamily).getByRole("combobox", { name: "课程教学班" });
    await user.click(select);
    await user.click(await screen.findByRole("option", { name: "数媒 2401" }));
    expect(select).toHaveTextContent("数媒 2401");
  });

  it("shows Badge attachments without calling them status badges", () => {
    const { container } = render(<CoreUiPage />);
    expect(container.querySelectorAll('[data-rain-id="ui-badge"]')).toHaveLength(4);
    expect(container.querySelector('[data-type="dot"]')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-type="count"]')).toHaveLength(2);
    expect(container.querySelector('[data-type="label"]')).toBeInTheDocument();
    expect(screen.queryByText("STATUS BADGES")).toBeNull();
    expect(screen.getByText(/命名状态不由普通 Badge 承担/)).toBeVisible();
    expect(screen.getByText("资源更新")).toHaveAccessibleName(
      "资源更新，3 条更新",
    );
  });

  it("keeps the removable Tag interaction real with an independently named close icon", async () => {
    const user = userEvent.setup();
    render(<CoreUiPage />);
    const fixture = screen.getByTestId("removable-tag-fixture");
    const remove = within(fixture).getByRole("button", { name: "移除标签 重点" });
    expect(remove.querySelector('[data-icon="icon/close"]')).not.toBeNull();
    expect(screen.getByRole("link", { name: "查看 Tag 全配色、尺寸与交互" })).toHaveAttribute("href", "#tag");
    await user.click(remove);
    expect(screen.queryByTestId("removable-tag-fixture")).toBeNull();
  });

  it("keeps the preview free of unregistered icon substitutes", () => {
    const { container } = render(<CoreUiPage />);
    expect(container.querySelectorAll("svg")).toHaveLength(0);
    expect(container.textContent).not.toMatch(/[\u00d7✕✖✗✘]/u);
  });

  it("separates accepted visual scopes from pending families and color review", () => {
    render(<CoreUiPage />);
    expect(screen.getByText("分批验收")).toBeInTheDocument();
    expect(screen.getByText("截至 2026-09-12 的验收摘要")).toBeInTheDocument();
    const summary = screen.getByText(/Button \/ TextButton、Tag 分批外观、Tabs/);
    expect(summary).toHaveTextContent("已完成各自视觉验收");
    expect(summary).toHaveTextContent("Badge / Surface / Card 仍按各自记录待验收");
    expect(summary).toHaveTextContent("对比度与颜色用途问题单独保留，组件均未发布");
  });
});
