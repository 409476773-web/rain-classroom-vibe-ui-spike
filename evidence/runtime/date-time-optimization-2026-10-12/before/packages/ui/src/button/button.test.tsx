import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { DensityProvider } from "../../../foundations/src/density";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { Button } from "./button";
import type { ButtonPart } from "./button";
import { buttonPartClassName } from "./button.styles";

const buttonDirectory = dirname(fileURLToPath(import.meta.url));
const buttonStyles = readFileSync(resolve(buttonDirectory, "../styles.css"), "utf8");
const foundationTokens = readFileSync(
  resolve(buttonDirectory, "../../../foundations/src/tokens.css"),
  "utf8",
);

function buttonWithoutVisibleLabelIsNotAValidPublicExample() {
  // @ts-expect-error Ordinary Button requires visible children; icon-only actions use IconButton.
  return <Button aria-label="纯图标动作" />;
}

void buttonWithoutVisibleLabelIsNotAValidPublicExample;

describe("Button", () => {
  it("uses a quieter trailing icon only when a leading icon is also present", () => {
    const { rerender } = render(<Button leadingIcon={<span>前</span>} trailingIcon={<span>后</span>}>编辑选项</Button>);
    const button = screen.getByRole("button", { name: "编辑选项" });
    expect(button.querySelector('[data-slot="leading-icon"]')).toHaveClass("text-rain-button-brand-icon");
    expect(button.querySelector('[data-slot="trailing-icon"]')).toHaveClass("text-rain-button-trailing-brand-icon");
    rerender(<Button trailingIcon={<span>后</span>}>编辑选项</Button>);
    expect(button.querySelector('[data-slot="trailing-icon"]')).toHaveClass("text-rain-button-brand-icon");
    expect(button.querySelector('[data-slot="trailing-icon"]')).not.toHaveClass("text-rain-button-trailing-brand-icon");
  });

  it.each([
    ["primary", "default"],
    ["secondary", "default"],
    ["tertiary", "default"],
    ["primary", "danger"],
    ["secondary", "danger"],
    ["tertiary", "danger"],
  ] as const)("keeps %s hierarchy separate from %s intent", (variant, tone) => {
    render(
      <Button tone={tone} variant={variant}>
        保存
      </Button>,
    );

    const button = screen.getByRole("button", { name: "保存" });
    expect(button).toHaveAttribute("data-rain-id", "ui-button");
    expect(button).toHaveAttribute("data-slot", "root");
    expect(button).toHaveAttribute("data-variant", variant);
    expect(button).toHaveAttribute("data-tone", tone);
    expect(button).toHaveAttribute("data-focus", "control");
  });

  it.each([
    ["mini", "28"],
    ["small", "32"],
    ["medium", "36"],
    ["large", "40"],
    ["xl", "48"],
  ] as const)("exposes the %s size as the %spx contract", (size, height) => {
    render(<Button size={size}>{height} 高度</Button>);

    const button = screen.getByRole("button", { name: `${height} 高度` });
    expect(button).toHaveAttribute("data-size", size);
  });

  it("preserves native button attributes, type and ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button aria-describedby="save-help" name="save" ref={ref}>
        保存
      </Button>,
    );

    const button = screen.getByRole("button", { name: "保存" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("name", "save");
    expect(button).toHaveAttribute("aria-describedby", "save-help");
    expect(ref.current).toBe(button);
  });

  it("maps shared density to the 32px and 36px defaults", () => {
    const { rerender } = render(
      <DensityProvider density="compact">
        <Button>筛选</Button>
      </DensityProvider>,
    );
    expect(screen.getByRole("button", { name: "筛选" })).toHaveAttribute(
      "data-density",
      "compact",
    );
    expect(screen.getByRole("button", { name: "筛选" })).toHaveAttribute(
      "data-size",
      "small",
    );

    rerender(
      <DensityProvider density="default">
        <Button>筛选</Button>
      </DensityProvider>,
    );
    expect(screen.getByRole("button", { name: "筛选" })).toHaveAttribute(
      "data-density",
      "default",
    );
    expect(screen.getByRole("button", { name: "筛选" })).toHaveAttribute(
      "data-size",
      "medium",
    );
  });

  it("lets an explicit size override the density default", () => {
    render(
      <DensityProvider density="compact">
        <Button size="large">页面操作</Button>
      </DensityProvider>,
    );

    const button = screen.getByRole("button", { name: "页面操作" });
    expect(button).toHaveAttribute("data-density", "compact");
    expect(button).toHaveAttribute("data-size", "large");
  });

  it("only becomes full width through the explicit block capability", () => {
    render(
      <>
        <Button>自然宽度</Button>
        <Button block>整行操作</Button>
      </>,
    );

    expect(screen.getByRole("button", { name: "自然宽度" })).not.toHaveAttribute(
      "data-block",
    );
    expect(screen.getByRole("button", { name: "整行操作" })).toHaveAttribute(
      "data-block",
      "true",
    );
  });

  it("keeps external className layout-only and composes it after the Master", () => {
    render(<Button className="w-full">布局扩展</Button>);

    const button = screen.getByRole("button", { name: "布局扩展" });
    expect(button).toHaveClass("rain-button", "w-full");
    expect(button.className).toContain("bg-rain-button-secondary");
  });

  it("applies a named Local Recipe only to declared Parts without mutating the Master", () => {
    const localRecipe = defineRainLocalRecipe<ButtonPart, "ui-button">({
      id: "search-operation-button",
      scope: "feature",
      origin: "ui-button",
      classes: {
        root: "bg-rain-surface-subtle",
        label: "text-rain-text-primary",
      },
      modifiedParts: ["root", "label"],
      candidateTokens: [],
      promotionStatus: "not-proposed",
    });
    const recipeSnapshot = JSON.stringify(localRecipe);

    render(
      <Button localRecipe={localRecipe} leadingIcon={<span>前</span>}>
        局部搜索
      </Button>,
    );

    const button = screen.getByRole("button", { name: "局部搜索" });
    expect(button).toHaveAttribute("data-local-recipe", "search-operation-button");
    expect(button).toHaveClass("bg-rain-surface-subtle");
    expect(button).not.toHaveClass("bg-rain-button-secondary");
    expect(button.querySelector('[data-slot="label"]')).toHaveClass(
      "text-rain-text-primary",
    );
    expect(button.querySelector('[data-slot="leading-icon"]')).not.toHaveClass(
      "text-rain-text-primary",
    );
    expect(JSON.stringify(localRecipe)).toBe(recipeSnapshot);
  });

  it("keeps loading focusable while blocking repeated activation", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        保存教材
      </Button>,
    );

    const button = screen.getByRole("button", { name: "保存教材" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("data-state", "loading");
    expect(button).not.toBeDisabled();
    expect(button.querySelector('[data-slot="loading-indicator"]')).toBeInTheDocument();
    expect(button.querySelector('[data-slot="loading-overlay"]')).not.toBeInTheDocument();
    expect(button).toHaveTextContent("保存教材");

    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("keeps the original label by default and accepts an explicit loading label", () => {
    const { rerender } = render(
      <Button loading variant="primary">
        保存课程
      </Button>,
    );
    expect(screen.getByRole("button", { name: "保存课程" })).toHaveTextContent(
      "保存课程",
    );

    rerender(
      <Button loading loadingLabel="保存中…" variant="primary">
        保存课程
      </Button>,
    );
    expect(screen.getByRole("button", { name: "保存中…" })).toHaveTextContent(
      "保存中…",
    );
  });

  it("gives native disabled precedence over loading", () => {
    render(
      <Button disabled loading>
        不可保存
      </Button>,
    );
    const button = screen.getByRole("button", { name: "不可保存" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-state", "disabled");
  });

  it("keeps leading, label and trailing content in a stable order", () => {
    const { container } = render(
      <Button
        leadingIcon={<span data-testid="leading">前</span>}
        trailingIcon={<span data-testid="trailing">后</span>}
      >
        查看
      </Button>,
    );
    const slots = [...container.querySelectorAll("[data-slot]")].map((node) =>
      node.getAttribute("data-slot"),
    );
    expect(slots).toEqual(["root", "leading-icon", "label", "trailing-icon"]);
  });

  it("pins the canonical Rain loading asset and currentColor mask recipe", () => {
    const loadingAsset = readFileSync(
      resolve(buttonDirectory, "../icons/assets/button-loading.png"),
    );

    expect(createHash("sha256").update(loadingAsset).digest("hex")).toBe(
      "48eb44ae2822e9f82d119a423f4a78909b55ce6e4a3917540c9ba13413582915",
    );
    expect(loadingAsset.readUInt32BE(16)).toBe(72);
    expect(loadingAsset.readUInt32BE(20)).toBe(72);
    expect(buttonStyles).toContain(
      'mask: url("./icons/assets/button-loading.png") center / var(--rain-button-loading-mask-size) no-repeat;',
    );
    expect(buttonStyles).toMatch(
      /\[data-slot="loading-indicator"\][\s\S]*?background: currentColor;/,
    );
    expect(buttonStyles).toContain("@rain-css-exception button-loading-mask");
    expect(buttonStyles).toContain(
      "animation: rain-button-loading-spin var(--rain-button-loading-duration) var(--rain-button-loading-timing-function) infinite;",
    );
    expect(foundationTokens).toContain("--rain-button-loading-mask-size: 120%;");
    expect(foundationTokens).toContain("--rain-button-loading-duration: 800ms;");
    expect(foundationTokens).toContain(
      "--rain-button-loading-timing-function: linear;",
    );
    expect(buttonStyles).not.toContain('data-slot="loading-overlay"');
  });

  it.each([
    ["mini", "14px", "10px"],
    ["small", "16px", "12px"],
    ["medium", "16px", "12px"],
    ["large", "16px", "12px"],
    ["xl", "22px", "16px"],
  ] as const)(
    "keeps the %s leading/loading and trailing icon geometry",
    (size, leadingSize, trailingSize) => {
      expect(
        buttonPartClassName({
          part: "leading-icon",
          size,
          state: "default",
          variant: "secondary",
        }),
      ).toContain(`size-rain-button-${size}-leading-icon`);
      expect(
        buttonPartClassName({
          part: "trailing-icon",
          size,
          state: "default",
          variant: "secondary",
        }),
      ).toContain(`size-rain-button-${size}-trailing-icon`);
      expect(foundationTokens).toContain(
        `--rain-button-${size}-leading-icon-size: ${leadingSize};`,
      );
      expect(foundationTokens).toContain(
        `--rain-button-${size}-trailing-icon-size: ${trailingSize};`,
      );
    },
  );
});
