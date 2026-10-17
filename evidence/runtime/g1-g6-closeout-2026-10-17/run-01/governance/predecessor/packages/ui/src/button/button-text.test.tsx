import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { DensityProvider } from "../../../foundations/src/density";
import { Button, type ButtonTextSize, type ButtonTextTone } from "../index";
import { buttonPartClassName, buttonRootRecipe } from "./button.styles";

const buttonDirectory = dirname(fileURLToPath(import.meta.url));
const styles = readFileSync(resolve(buttonDirectory, "../styles.css"), "utf8");
const foundationTokens = readFileSync(
  resolve(buttonDirectory, "../../../foundations/src/tokens.css"),
  "utf8",
);
const typographyTokens = readFileSync(resolve(buttonDirectory, "../../../foundations/src/typography.css"), "utf8");

function textButtonTypeContract() {
  const size: ButtonTextSize = "compact";
  const tone: ButtonTextTone = "brand";
  const validText = <Button variant="text" size={size} tone={tone}>编辑</Button>;
  const validOrdinary = <Button block size="large" tone="danger">删除</Button>;
  // @ts-expect-error Text actions only use small, compact or regular sizes.
  const tooLarge = <Button variant="text" size="large">编辑</Button>;
  // @ts-expect-error Brand is specific to the text variant.
  const ordinaryBrand = <Button variant="secondary" tone="brand">编辑</Button>;
  // @ts-expect-error Omitting variant still selects an ordinary Button.
  const implicitBrand = <Button tone="brand">编辑</Button>;
  // @ts-expect-error Text controls never accept the ordinary block capability.
  const textBlock = <Button variant="text" block>编辑</Button>;
  // @ts-expect-error Explicit false does not turn block into a text capability.
  const textBlockFalse = <Button variant="text" block={false}>编辑</Button>;
  // @ts-expect-error Compact is a text size, not an ordinary Button size.
  const ordinaryCompact = <Button size="compact">编辑</Button>;
  // @ts-expect-error Text actions require visible children; icon-only belongs elsewhere.
  const withoutText = <Button variant="text" aria-label="编辑" />;
  return { validText, validOrdinary, tooLarge, ordinaryBrand, implicitBrand, textBlock, textBlockFalse, ordinaryCompact, withoutText };
}

void textButtonTypeContract;

describe("Button text variant", () => {
  it.each(["default", "brand", "danger"] as const)(
    "retains Button identity and the %s text intent",
    (tone) => {
      render(<Button variant="text" tone={tone}>编辑</Button>);
      const button = screen.getByRole("button", { name: "编辑" });
      expect(button.tagName).toBe("BUTTON");
      expect(button).toHaveAttribute("data-rain-id", "ui-button");
      expect(button).toHaveAttribute("data-slot", "root");
      expect(button).toHaveAttribute("data-variant", "text");
      expect(button).toHaveAttribute("data-tone", tone);
      expect(button).toHaveAttribute("data-focus", "control");
      expect(button).not.toHaveAttribute("data-block");
    },
  );

  it.each(["small", "compact", "regular"] as const)(
    "allows an explicit %s text size",
    (size) => {
      render(<Button variant="text" size={size}>重试</Button>);
      expect(screen.getByRole("button", { name: "重试" })).toHaveAttribute("data-size", size);
    },
  );

  it.each([
    ["compact", "compact"],
    ["default", "regular"],
  ] as const)("maps %s density to the %s text default", (density, size) => {
    render(
      <DensityProvider density={density}>
        <Button variant="text">重试</Button>
      </DensityProvider>,
    );
    const button = screen.getByRole("button", { name: "重试" });
    expect(button).toHaveAttribute("data-density", density);
    expect(button).toHaveAttribute("data-size", size);
    expect(button).toHaveAttribute("data-tone", "default");
  });

  it("preserves native attributes, submit semantics and forwarded ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button variant="text" type="submit" form="editor" name="save" value="draft" ref={ref}>
        保存草稿
      </Button>,
    );
    const button = screen.getByRole("button", { name: "保存草稿" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("form", "editor");
    expect(button).toHaveAttribute("name", "save");
    expect(button).toHaveAttribute("value", "draft");
    expect(ref.current).toBe(button);
  });

  it("activates its one native target with Enter and Space", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button variant="text" onClick={onClick} leadingIcon={<span>前</span>} trailingIcon={<span>后</span>}>
        编辑
      </Button>,
    );
    const button = screen.getByRole("button", { name: "编辑" });
    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard("{Enter} ");
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect([...button.children].map((child) => child.getAttribute("data-slot"))).toEqual([
      "leading-icon", "label", "trailing-icon",
    ]);
  });

  it.each([
    [false, false], [true, false], [false, true], [true, true],
  ])("switches loading without losing focus for leading=%s trailing=%s", async (leading, trailing) => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const icons = {
      leadingIcon: leading ? <span>前</span> : undefined,
      trailingIcon: trailing ? <span>后</span> : undefined,
    };
    const { rerender } = render(<Button variant="text" onClick={onClick} {...icons}>导出</Button>);
    const button = screen.getByRole("button", { name: "导出" });
    await user.tab();
    expect(button).toHaveFocus();
    rerender(<Button variant="text" loading onClick={onClick} {...icons}>导出</Button>);
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).not.toBeDisabled();
    expect([...button.children].map((child) => child.getAttribute("data-slot"))).toEqual([
      "loading-indicator", "label",
    ]);
    expect(button.firstElementChild).toHaveAttribute("aria-hidden", "true");
    await user.keyboard("{Enter} ");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
    rerender(<Button variant="text" onClick={onClick} {...icons}>导出</Button>);
    expect(button).toHaveFocus();
    expect(button.querySelector('[data-slot="leading-icon"]') !== null).toBe(leading);
    expect(button.querySelector('[data-slot="trailing-icon"]') !== null).toBe(trailing);
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("uses an explicit loading label only when loading", () => {
    const { rerender } = render(<Button variant="text" loading loadingLabel="导出中">导出</Button>);
    expect(screen.getByRole("button", { name: "导出中" })).toHaveAttribute("data-state", "loading");
    rerender(<Button variant="text" loadingLabel="导出中">导出</Button>);
    expect(screen.getByRole("button", { name: "导出" })).toHaveAttribute("data-state", "default");
  });

  it("keeps native disabled precedence and cannot be activated", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button variant="text" disabled loading onClick={onClick}>删除</Button>);
    const button = screen.getByRole("button", { name: "删除" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-state", "disabled");
    await user.tab();
    expect(button).not.toHaveFocus();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it.each([true, "true"] as const)(
    "keeps aria-disabled=%s text actions focusable but inactive",
    async (ariaDisabled) => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const { rerender } = render(
        <Button variant="text" aria-disabled={ariaDisabled} onClick={onClick}>
          编辑
        </Button>,
      );
      const button = screen.getByRole("button", { name: "编辑" });
      expect(button).not.toBeDisabled();
      await user.tab();
      expect(button).toHaveFocus();
      await user.keyboard("{Enter} ");
      await user.click(button);
      expect(onClick).not.toHaveBeenCalled();
      expect(button).toHaveAttribute("data-state", "disabled");

      rerender(
        <Button variant="text" aria-disabled={ariaDisabled} loading onClick={onClick}>
          编辑
        </Button>,
      );
      expect(button).toHaveAttribute("data-state", "disabled");
      expect(button).toHaveFocus();
    },
  );

  it.each([false, "false"] as const)(
    "keeps aria-disabled=%s text actions available",
    async (ariaDisabled) => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button variant="text" aria-disabled={ariaDisabled} onClick={onClick}>编辑</Button>);
      const button = screen.getByRole("button", { name: "编辑" });
      expect(button).toHaveAttribute("data-state", "default");
      await user.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    },
  );

  it("isolates text geometry from the ordinary Button baseline", () => {
    const root = buttonRootRecipe({
      block: false,
      size: "regular",
      state: "default",
      tone: "default",
      variant: "text",
    });
    expect(root).toContain("min-w-rain-button-text-min-width");
    expect(root).toContain("px-rain-button-text-padding-inline");
    expect(root).toContain("py-rain-button-text-padding-block");
    expect(root).toContain("gap-rain-button-text-gap");
    expect(root).toContain("rounded-rain-button-text");
    expect(root).toContain("font-rain-button-text");
    expect(root).toContain("border-rain-button-text");
    const label = buttonPartClassName({
      part: "label",
      size: "regular",
      state: "default",
      variant: "text",
    });
    expect(label).toContain("flex-none");
    expect(label).toContain("overflow-visible");
    expect(label).toContain("text-clip");
    expect(label).toContain("whitespace-nowrap");
    expect(foundationTokens).toContain("--rain-button-text-min-width: 0px;");
    expect(foundationTokens).toContain(
      "--rain-button-text-padding-inline: var(--rain-space-6);",
    );
    expect(foundationTokens).toContain("--rain-button-text-padding-block: 3px;");
    expect(foundationTokens).toContain(
      "--rain-button-text-font-weight: var(--rain-font-weight-regular);",
    );
  });

  it.each([
    ["small", "20px", "12px", "14px", "14px"],
    ["compact", "24px", "13px", "18px", "16px"],
    ["regular", "26px", "14px", "20px", "16px"],
  ] as const)("gives %s its candidate geometry", (size, height, font, line, icon) => {
    const root = buttonRootRecipe({
      block: false,
      size,
      state: "default",
      tone: "default",
      variant: "text",
    });
    const leading = buttonPartClassName({
      part: "leading-icon",
      size,
      state: "default",
      variant: "text",
    });
    const trailing = buttonPartClassName({
      part: "trailing-icon",
      size,
      state: "default",
      variant: "text",
    });
    expect(root).toContain(`h-rain-button-text-${size}-height`);
    expect(root).toContain(`text-rain-button-text-${size}`);
    expect(leading).toContain(`size-rain-button-text-${size}-leading-icon`);
    expect(trailing).toContain(`size-rain-button-text-${size}-trailing-icon`);
    expect(foundationTokens).toContain(
      `--rain-button-text-${size}-height: ${height};`,
    );
    expect(foundationTokens).toContain(
      `--rain-button-text-${size}-font-size: var(--rain-font-size-${font.slice(0, -2)});`,
    );
    expect(foundationTokens).toContain(
      `--rain-button-text-${size}-line-height: var(--rain-line-height-${line.slice(0, -2)});`,
    );
    expect(typographyTokens).toContain(`--rain-font-size-${font.slice(0, -2)}: ${font};`);
    expect(typographyTokens).toContain(`--rain-line-height-${line.slice(0, -2)}: ${line};`);
    expect(foundationTokens).toContain(
      `--rain-button-text-${size}-leading-icon-size: ${icon};`,
    );
    expect(foundationTokens).toContain(
      `--rain-button-text-${size}-trailing-icon-size: 12px;`,
    );
  });

  it("keeps loading fully opaque and dims only disabled foreground parts", () => {
    const disabled = buttonRootRecipe({
      block: false,
      size: "regular",
      state: "disabled",
      tone: "default",
      variant: "text",
    });
    const loading = buttonRootRecipe({
      block: false,
      size: "regular",
      state: "loading",
      tone: "default",
      variant: "text",
    });
    expect(disabled).toContain("opacity-rain-button-text-loading");
    expect(loading).toContain("opacity-rain-button-text-loading");
    expect(foundationTokens).toContain(
      "--rain-button-text-disabled-foreground-opacity: 0.3;",
    );
    expect(foundationTokens).toContain("--rain-button-text-loading-opacity: 1;");
    for (const slot of ["label", "leading-icon", "trailing-icon", "loading-indicator"]) {
      expect(
        buttonPartClassName({
          part: slot as "label" | "leading-icon" | "trailing-icon" | "loading-indicator",
          size: "regular",
          state: "disabled",
          variant: "text",
        }),
      ).toContain("opacity-rain-button-text-disabled");
    }
  });

  it("uses shared Category aliases and genuinely translucent interaction surfaces", () => {
    expect(foundationTokens).toContain("--rain-button-text-default-color: var(--rain-category-text-neutral-3);");
    expect(foundationTokens).toContain(
      "--rain-button-text-brand-color: var(--rain-category-text-brand-1);",
    );
    expect(foundationTokens).toContain(
      "--rain-button-text-danger-color: var(--rain-category-text-red-1);",
    );
    expect(foundationTokens).toMatch(
      /--rain-button-text-hover-bg:\s*var\(--rain-category-fill-neutral-alpha-6\)/,
    );
    expect(foundationTokens).toMatch(
      /--rain-button-text-pressed-bg:\s*var\(--rain-category-fill-neutral-alpha-5\)/,
    );
    const defaultRecipe = buttonRootRecipe({
      block: false,
      size: "regular",
      state: "default",
      tone: "default",
      variant: "text",
    });
    const dangerRecipe = buttonRootRecipe({
      block: false,
      size: "regular",
      state: "default",
      tone: "danger",
      variant: "text",
    });
    expect(defaultRecipe).toContain("hover:bg-rain-button-text-hover");
    expect(defaultRecipe).toContain("active:bg-rain-button-text-pressed");
    expect(dangerRecipe).toContain("hover:bg-rain-button-text-danger-hover");
    expect(dangerRecipe).toContain("active:bg-rain-button-text-danger-pressed");
    expect(defaultRecipe).not.toMatch(/(?:hover|active):text-/);
    expect(dangerRecipe).not.toMatch(/(?:hover|active):text-/);
  });

  it("defines a visible outline as well as a halo, with forced-colors support", () => {
    const focus = buttonRootRecipe({
      block: false,
      size: "regular",
      state: "default",
      tone: "default",
      variant: "text",
    });
    expect(focus).toContain("focus-visible:outline-solid");
    expect(focus).toContain("focus-visible:outline-rain-button-text-focus");
    expect(focus).toContain(
      "focus-visible:outline-rain-button-text-focus-outline",
    );
    expect(focus).toContain(
      "focus-visible:outline-offset-rain-button-text-focus",
    );
    expect(focus).toContain("focus-visible:shadow-rain-button-text-focus");
    expect(styles).toMatch(/@media \(forced-colors: active\) \{[\s\S]*?@rain-css-exception button-forced-colors[\s\S]*?\.rain-button:focus-visible[\s\S]*?outline: 2px solid CanvasText;/);
    expect(styles).toMatch(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.rain-button \[data-slot="loading-indicator"\] \{\s*animation: none;/);
  });
});
