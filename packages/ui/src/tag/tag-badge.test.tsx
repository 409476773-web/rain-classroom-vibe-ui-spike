import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DensityProvider } from "../../../foundations/src/density";
import { Badge } from "../badge/badge";
import { Tag } from "./tag";
import { TagIcon } from "../icons/tag";

describe("Tag", () => {
  it("keeps the root static across its bounded appearance and tone", () => {
    const { container } = render(
      <Tag appearance="outlined" tone="brand">
        课堂资料
      </Tag>,
    );
    const tag = container.querySelector('[data-rain-id="ui-tag"]');
    expect(tag).toHaveAttribute("data-slot", "root");
    expect(tag).toHaveAttribute("data-appearance", "outlined");
    expect(tag).toHaveAttribute("data-tone", "brand");
    expect(tag).toHaveAttribute("data-state", "static");
    expect(tag?.tagName).toBe("SPAN");
    expect(tag).not.toHaveAttribute("tabindex");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("uses an independently named native button for removal", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>专业必修</Tag>);
    const remove = screen.getByRole("button", { name: "移除标签 专业必修" });
    expect(remove.querySelector('[data-icon="icon/close"]')).not.toBeNull();
    expect(remove).not.toHaveTextContent("移除");
    await user.tab();
    expect(remove).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("keeps disabled and vertical tags free from an active remove control", () => {
    const { rerender } = render(
      <Tag disabled onRemove={() => undefined}>
        已锁定
      </Tag>,
    );
    expect(screen.getByRole("button", { name: "移除标签 已锁定" })).toBeDisabled();

    rerender(
      <Tag layout="vertical" onRemove={() => undefined}>
        竖排标签
      </Tag>,
    );
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("uses a complete size recipe with explicit size winning over density", () => {
    const { container } = render(
      <DensityProvider density="compact">
        <Tag>紧凑标签</Tag>
      </DensityProvider>,
    );
    expect(container.querySelector('[data-rain-id="ui-tag"]')).toHaveAttribute(
      "data-density",
      "compact",
    );
    expect(container.querySelector('[data-rain-id="ui-tag"]')).toHaveAttribute("data-size", "20");
    const { container: explicit } = render(<DensityProvider density="compact"><Tag size={28}>显式尺寸</Tag></DensityProvider>);
    expect(explicit.querySelector('[data-rain-id="ui-tag"]')).toHaveAttribute("data-size", "28");
  });

  it("keeps the full color identity, icon and removal action separate from the static text", async () => {
    const user = userEvent.setup(), remove = vi.fn();
    const { container } = render(<Tag color="self-test" tone="brand" leadingIcon={<TagIcon />} onRemove={remove}>期末复习</Tag>);
    const tag = container.querySelector('[data-rain-id="ui-tag"]')!;
    expect(tag).toHaveAttribute("data-color", "self-test");
    expect(tag).toHaveAttribute("data-size", "24");
    expect(tag.querySelector('[data-slot="leading-icon"] [data-icon="icon/tag"]')).not.toBeNull();
    await user.click(screen.getByText("期末复习"));
    expect(remove).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "移除标签 期末复习" }));
    expect(remove).toHaveBeenCalledTimes(1);
    expect(screen.getByText("期末复习")).toBeVisible();
  });

  it("requires a meaningful remove name for non-text content", () => {
    expect(() => render(<Tag onRemove={() => undefined}><span>复杂标签</span></Tag>)).toThrow(/removeLabel/);
    render(<Tag onRemove={() => undefined} removeLabel="移除标签 复杂标签"><span>复杂标签</span></Tag>);
    expect(screen.getByRole("button", { name: "移除标签 复杂标签" })).toBeVisible();
  });
});

describe("Badge", () => {
  it.each([
    ["dot", "top-end"],
    ["dot", "bottom-end"],
    ["dot", "inline-end"],
    ["count", "top-end"],
    ["count", "inline-end"],
    ["count", "standalone"],
    ["label", "top-end"],
    ["label", "inline-end"],
    ["label", "standalone"],
  ] as const)("allows the audited %s / %s combination", (type, placement) => {
    const { container } = render(
      <Badge count={3} label="新" placement={placement} type={type}>
        <span>课程资源</span>
      </Badge>,
    );
    const badge = container.querySelector('[data-rain-id="ui-badge"]');
    expect(badge).toHaveAttribute("data-type", type);
    expect(badge).toHaveAttribute("data-placement", placement);
    expect(badge).toHaveAttribute("data-state", "visible");
    expect(badge).not.toHaveAttribute("tabindex");
    expect(within(badge as HTMLElement).queryByRole("button")).toBeNull();
  });

  it("falls back from a disallowed combination instead of accepting arbitrary placement", () => {
    const { container } = render(
      <Badge placement="bottom-end" type="label" label="NEW" />,
    );
    const badge = container.querySelector('[data-rain-id="ui-badge"]');
    expect(badge).toHaveAttribute("data-placement", "top-end");
  });

  it("hides zero by default, shows zero on request and formats overflow", () => {
    const { container, rerender } = render(
      <Badge count={0} placement="standalone" type="count" />,
    );
    expect(container.querySelector('[data-rain-id="ui-badge"]')).toHaveAttribute(
      "data-state",
      "hidden",
    );
    expect(container.querySelector('[data-slot="indicator"]')).toBeNull();

    rerender(<Badge count={0} placement="standalone" showZero type="count" />);
    expect(screen.getByText("0")).toBeVisible();

    rerender(<Badge count={120} max={99} placement="standalone" type="count" />);
    expect(screen.getByText("99+")).toBeVisible();
  });

  it("accepts only audited short labels", () => {
    const { container, rerender } = render(
      <Badge label="NEW" placement="standalone" type="label" />,
    );
    expect(screen.getByText("NEW")).toBeVisible();

    rerender(<Badge label="TOOLONG" placement="standalone" type="label" />);
    expect(container.querySelector('[data-rain-id="ui-badge"]')).toHaveAttribute(
      "data-state",
      "invalid",
    );
    expect(screen.queryByText("TOOLONG")).toBeNull();
  });

  it.each(["neutral", "info", "success", "warning", "error", "processing"] as const)(
    "keeps %s as a bounded indicator tone, not an interaction",
    (tone) => {
      const { container } = render(
        <Badge count={2} placement="standalone" tone={tone} type="count" />,
      );
      const badge = container.querySelector('[data-rain-id="ui-badge"]');
      expect(badge).toHaveAttribute("data-tone", tone);
      expect(badge?.tagName).toBe("SPAN");
      expect(badge).not.toHaveAttribute("role", "button");
    },
  );
});
