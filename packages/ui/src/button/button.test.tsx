import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DensityProvider } from "../../../foundations/src/density";
import { Button } from "./button";

const buttonVariants = [
  { focus: "control", variant: "primary" },
  { focus: "control", variant: "secondary" },
  { focus: "control", variant: "ghost" },
  { focus: "danger", variant: "danger" },
] as const;

describe("Button", () => {
  it.each(buttonVariants)(
    "exposes stable trace attributes for the $variant variant",
    ({ focus, variant }) => {
      render(<Button variant={variant}>保存</Button>);

      const button = screen.getByRole("button", { name: "保存" });
      expect(button).toHaveAttribute("data-rain-id", "ui-button");
      expect(button).toHaveAttribute("data-slot", "button");
      expect(button).toHaveAttribute("data-variant", variant);
      expect(button).toHaveAttribute("data-state", "default");
      expect(button).toHaveAttribute("data-density", "default");
      expect(button).toHaveAttribute("data-focus", focus);
    },
  );

  it("inherits Compact density from the nearest DensityProvider", () => {
    render(
      <DensityProvider density="compact">
        <Button variant="secondary">筛选</Button>
      </DensityProvider>,
    );

    expect(screen.getByRole("button", { name: "筛选" })).toHaveAttribute(
      "data-density",
      "compact",
    );
  });

  it("lets an explicit density override the surrounding context", () => {
    render(
      <DensityProvider density="compact">
        <Button density="default" variant="secondary">
          新建课程
        </Button>
      </DensityProvider>,
    );

    const button = screen.getByRole("button", { name: "新建课程" });
    expect(button).toHaveAttribute("data-density", "default");
    expect(
      button.style.getPropertyValue("--rain-density-control-height"),
    ).toBe("36px");
    expect(
      button.style.getPropertyValue("--rain-density-control-padding-inline"),
    ).toBe("14px");
  });

  it("applies a standalone Compact override to the actual geometry variables", () => {
    render(
      <Button density="compact" variant="secondary">
        紧凑新建
      </Button>,
    );

    const button = screen.getByRole("button", { name: "紧凑新建" });
    expect(button).toHaveAttribute("data-density", "compact");
    expect(
      button.style.getPropertyValue("--rain-density-control-height"),
    ).toBe("30px");
    expect(
      button.style.getPropertyValue("--rain-density-control-padding-inline"),
    ).toBe("10px");
  });

  it("exposes loading as a busy state and prevents repeated activation", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick} variant="primary">
        保存教材
      </Button>,
    );

    const button = screen.getByRole("button", { name: "保存教材" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-state", "loading");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("保存教材");

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("uses the native disabled state and prevents activation", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick} variant="secondary">
        已停用
      </Button>,
    );

    const button = screen.getByRole("button", { name: "已停用" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-state", "disabled");
    expect(button).not.toHaveAttribute("aria-busy", "true");

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("keeps native button semantics and a visible keyboard focus target", async () => {
    const user = userEvent.setup();
    render(
      <>
        <p id="save-help">保存当前编辑内容</p>
        <Button aria-describedby="save-help" variant="primary">
          保存
        </Button>
      </>,
    );

    const button = screen.getByRole("button", { name: "保存" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-describedby", "save-help");
    expect(button).toHaveAttribute("data-focus", "control");

    await user.tab();
    expect(button).toHaveFocus();
  });
});
