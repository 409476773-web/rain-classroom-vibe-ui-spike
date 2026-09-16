import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DensityProvider } from "../../../foundations/src/density";

import { Badge } from "../badge/badge";
import { Tag } from "./tag";

describe("Tag", () => {
  it("renders a static managed category with stable trace attributes", () => {
    const { container } = render(<Tag variant="neutral">专业必修</Tag>);

    const tag = container.querySelector('[data-rain-id="ui-tag"]');
    expect(tag).toBeInTheDocument();
    expect(within(tag as HTMLElement).getByText("专业必修")).toBeVisible();
    expect(tag).toHaveAttribute("data-rain-id", "ui-tag");
    expect(tag).toHaveAttribute("data-slot", "tag");
    expect(tag).toHaveAttribute("data-variant", "neutral");
    expect(tag).toHaveAttribute("data-state", "static");
    expect(tag).toHaveAttribute("data-density", "default");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("inherits Compact density from the shared Foundation context", () => {
    const { container } = render(
      <DensityProvider density="compact">
        <Tag variant="info">课堂资料</Tag>
      </DensityProvider>,
    );

    expect(container.querySelector('[data-rain-id="ui-tag"]')).toHaveAttribute(
      "data-density",
      "compact",
    );
  });

  it("uses a real text button with an explicit accessible name for removal", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <Tag variant="neutral" onRemove={onRemove}>
        专业必修
      </Tag>,
    );

    const tag = screen.getByText("专业必修").closest('[data-rain-id="ui-tag"]');
    expect(tag).toHaveAttribute("data-state", "removable");

    const removeButton = screen.getByRole("button", {
      name: "移除标签 专业必修",
    });
    expect(removeButton).toHaveAttribute("data-slot", "remove-action");
    expect(removeButton).toHaveTextContent("移除");

    await user.tab();
    expect(removeButton).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("keeps a disabled removable Tag inoperable by pointer and keyboard", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <Tag variant="neutral" onRemove={onRemove} disabled>
        已锁定
      </Tag>,
    );

    const tag = screen.getByText("已锁定").closest('[data-rain-id="ui-tag"]');
    expect(tag).toHaveAttribute("data-state", "disabled");

    const removeButton = screen.getByRole("button", {
      name: "移除标签 已锁定",
    });
    expect(removeButton).toBeDisabled();

    await user.click(removeButton);
    await user.tab();
    await user.keyboard("{Enter}");
    expect(onRemove).not.toHaveBeenCalled();
  });
});

describe("Badge", () => {
  it.each([
    ["neutral", "待开始"],
    ["info", "进行中"],
    ["success", "已发布"],
    ["warning", "需复核"],
    ["error", "失败"],
  ] as const)(
    "renders the %s status as visible, non-interactive information",
    (variant, label) => {
      const { container } = render(<Badge variant={variant}>{label}</Badge>);

      const badge = container.querySelector<HTMLElement>(
        '[data-rain-id="ui-badge"]',
      );
      expect(badge).toBeInTheDocument();
      if (!badge) {
        throw new Error("Badge trace root is missing");
      }
      expect(within(badge).getByText(label)).toBeVisible();
      expect(badge).toHaveAttribute("data-rain-id", "ui-badge");
      expect(badge).toHaveAttribute("data-slot", "badge");
      expect(badge).toHaveAttribute("data-variant", variant);
      expect(badge).toHaveAttribute("data-state", "static");
      expect(badge).toHaveAttribute("data-density", "default");
      expect(badge.tagName).toBe("SPAN");
      expect(badge).not.toHaveAttribute("role", "button");
      expect(badge).not.toHaveAttribute("tabindex");
      expect(within(container).queryByRole("button")).not.toBeInTheDocument();
    },
  );

  it("inherits Compact density without becoming an action", () => {
    const { container } = render(
      <DensityProvider density="compact">
        <Badge variant="success">已完成</Badge>
      </DensityProvider>,
    );

    const badge = container.querySelector('[data-rain-id="ui-badge"]');
    expect(badge).toBeInTheDocument();
    expect(within(badge as HTMLElement).getByText("已完成")).toBeVisible();
    expect(badge).toHaveAttribute("data-density", "compact");
    expect(badge).not.toHaveAttribute("tabindex");
  });
});
